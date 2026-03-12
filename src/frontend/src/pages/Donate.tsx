import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { ImageIcon, Loader2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { useActor } from "../hooks/useActor";
import { useBlobStorage } from "../hooks/useBlobStorage";

const MOOD_OPTIONS = [
  { value: "nostalgic", label: "Nostalgic" },
  { value: "funny", label: "Funny" },
  { value: "bittersweet", label: "Bittersweet" },
  { value: "love", label: "Love" },
  { value: "childhood", label: "Childhood" },
];

const MIN_STORY = 100;
const MAX_STORY = 1500;

export function Donate() {
  const { actor } = useActor();
  const navigate = useNavigate();
  const { uploadBlob, isUploading, uploadProgress } = useBlobStorage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [objectName, setObjectName] = useState("");
  const [story, setStory] = useState("");
  const [mood, setMood] = useState("");
  const [contributorName, setContributorName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    setPhotoFile(file);
    const url = URL.createObjectURL(file);
    setPhotoPreview(url);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const mutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      if (!objectName.trim()) throw new Error("Object name is required");
      if (story.length < MIN_STORY)
        throw new Error(`Story must be at least ${MIN_STORY} characters`);

      let imageId = "";
      if (photoFile) {
        imageId = await uploadBlob(photoFile);
      }

      const moodArg: [] | [string] = mood ? [mood] : [];
      const nameArg: [] | [string] = contributorName.trim()
        ? [contributorName.trim()]
        : [];

      return actor.submitArtifact(
        imageId,
        objectName.trim(),
        story.trim(),
        moodArg,
        nameArg,
      );
    },
    onSuccess: () => {
      setSuccess(true);
      setTimeout(() => {
        navigate({ to: "/gallery" });
      }, 3000);
    },
    onError: (err: Error) => {
      toast.error(err.message || "Submission failed. Please try again.");
    },
  });

  if (success) {
    return (
      <div
        className="max-w-xl mx-auto px-6 py-24 text-center"
        data-ocid="donate.success_state"
      >
        <p className="font-exhibit-label text-muted-foreground tracking-widest text-[10px] mb-6">
          — Accepted into the Collection —
        </p>
        <h2 className="font-display text-foreground text-3xl font-bold mb-4">
          Thank You
        </h2>
        <p className="font-poetic text-muted-foreground italic text-xl leading-relaxed">
          Your artifact has been accepted into the collection. Thank you for
          your contribution.
        </p>
        <p className="font-exhibit-label text-muted-foreground text-[10px] tracking-widest mt-8">
          Returning to the collection…
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="mb-12">
        <p className="font-exhibit-label text-muted-foreground tracking-widest text-[10px]">
          — Submission Form —
        </p>
        <h1 className="font-display text-foreground text-4xl font-bold mt-2">
          Donate an Artifact
        </h1>
        <p className="font-poetic text-muted-foreground italic text-xl mt-3">
          Every object carries a story. We accept them all.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate();
        }}
        className="space-y-8"
      >
        {/* Photo upload */}
        <div className="space-y-2">
          <Label className="font-exhibit-label tracking-widest text-[10px]">
            Photograph of Your Artifact
          </Label>
          {/* Dropzone area */}
          <div
            data-ocid="donate.dropzone"
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed transition-colors ${
              isDragging ? "border-foreground bg-card" : "border-border"
            }`}
          >
            {photoPreview ? (
              <div className="relative">
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-full max-h-72 object-contain bg-stone-100"
                />
                <div className="absolute bottom-2 right-2">
                  <button
                    type="button"
                    data-ocid="donate.photo_upload_button"
                    onClick={() => fileInputRef.current?.click()}
                    className="font-exhibit-label text-[9px] tracking-widest bg-white border border-border px-3 py-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Replace Photo
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 gap-3 text-muted-foreground">
                <ImageIcon className="w-8 h-8 opacity-40" />
                <p className="font-exhibit-label text-[10px] tracking-widest text-center">
                  Drag & drop or click to upload
                </p>
                <button
                  type="button"
                  data-ocid="donate.photo_upload_button"
                  onClick={() => fileInputRef.current?.click()}
                  className="font-exhibit-label text-[9px] tracking-widest border border-border px-4 py-2 hover:border-foreground hover:text-foreground transition-colors mt-2"
                >
                  <Upload className="w-3 h-3 inline mr-1" />
                  Upload Photograph
                </button>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFileSelect(f);
            }}
          />
          {isUploading && (
            <p className="font-exhibit-label text-muted-foreground text-[10px] tracking-widest">
              Uploading photograph… {uploadProgress}%
            </p>
          )}
        </div>

        {/* Object name */}
        <div className="space-y-2">
          <Label
            htmlFor="objectName"
            className="font-exhibit-label tracking-widest text-[10px]"
          >
            Name of Object <span className="text-museum-brown">*</span>
          </Label>
          <Input
            id="objectName"
            data-ocid="donate.name_input"
            value={objectName}
            onChange={(e) => setObjectName(e.target.value)}
            placeholder="What is this object?"
            required
            className="font-body text-foreground bg-background border-border focus:ring-museum-brown rounded-none"
          />
        </div>

        {/* Story */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="story"
              className="font-exhibit-label tracking-widest text-[10px]"
            >
              Its Story <span className="text-museum-brown">*</span>
            </Label>
            <span
              className={`font-exhibit-label text-[10px] ${
                story.length < MIN_STORY
                  ? "text-muted-foreground"
                  : "text-foreground"
              }`}
            >
              {story.length} / {MAX_STORY}
            </span>
          </div>
          <Textarea
            id="story"
            data-ocid="donate.story_textarea"
            value={story}
            onChange={(e) => setStory(e.target.value.slice(0, MAX_STORY))}
            placeholder="Tell us its story — where it came from, what it witnessed, why it matters to you…"
            required
            rows={8}
            className="font-body text-foreground bg-background border-border focus:ring-museum-brown rounded-none resize-none"
          />
          {story.length > 0 && story.length < MIN_STORY && (
            <p className="font-exhibit-label text-[10px] tracking-widest text-museum-brown">
              At least {MIN_STORY - story.length} more characters needed
            </p>
          )}
        </div>

        {/* Mood */}
        <div className="space-y-2">
          <Label className="font-exhibit-label tracking-widest text-[10px]">
            Emotional Tag{" "}
            <span className="text-muted-foreground">(Optional)</span>
          </Label>
          <Select value={mood} onValueChange={setMood}>
            <SelectTrigger
              data-ocid="donate.mood_select"
              className="font-exhibit-label text-[10px] tracking-widest border-border rounded-none bg-background"
            >
              <SelectValue placeholder="Select a mood…" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              {MOOD_OPTIONS.map((opt) => (
                <SelectItem
                  key={opt.value}
                  value={opt.value}
                  className="font-exhibit-label text-[10px] tracking-widest"
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Contributor name */}
        <div className="space-y-2">
          <Label
            htmlFor="contributorName"
            className="font-exhibit-label tracking-widest text-[10px]"
          >
            Your Name <span className="text-muted-foreground">(Optional)</span>
          </Label>
          <Input
            id="contributorName"
            data-ocid="donate.contributor_input"
            value={contributorName}
            onChange={(e) => setContributorName(e.target.value)}
            placeholder="Your name, or leave blank to remain Anonymous"
            className="font-body text-foreground bg-background border-border focus:ring-museum-brown rounded-none"
          />
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            data-ocid="donate.submit_button"
            disabled={mutation.isPending || isUploading}
            className="w-full font-exhibit-label tracking-widest text-[11px] px-8 py-4 bg-museum-brown text-museum-paper hover:bg-museum-brown-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {mutation.isPending || isUploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {isUploading ? `Uploading… ${uploadProgress}%` : "Donating…"}
              </>
            ) : (
              "Donate to the Museum"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
