import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
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
import { supabase } from "../lib/supabase";

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
  const queryClient = useQueryClient();
  const [story, setStory] = useState("");
  const [mood, setMood] = useState("");
  const [objectName, setObjectName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [contributorName, setContributorName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: insertError } = await supabase.from("artifacts").insert({
        object_name: objectName,
        story,
        image_url: imageUrl || null,
        contributor_name: contributorName || null,
      });

      if (insertError) throw insertError;

      await queryClient.invalidateQueries({ queryKey: ["artifacts"] });
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        className="max-w-2xl mx-auto px-6 py-16 text-center"
        data-ocid="donate.success_state"
      >
        <p
          className="font-exhibit-label tracking-widest"
          style={{
            fontSize: "9px",
            color: "oklch(0.60 0.022 62)",
            letterSpacing: "0.18em",
          }}
        >
          — Thank You —
        </p>
        <h2
          className="font-display font-bold mt-4 mb-4"
          style={{ fontSize: "2rem", color: "oklch(0.28 0.034 54)" }}
        >
          Artifact successfully donated to the museum.
        </h2>
        <p
          className="font-poetic text-muted-foreground italic"
          style={{ fontSize: "1.15rem" }}
        >
          It will find its place in the permanent collection.
        </p>
        <a
          href="/gallery"
          className="font-exhibit-label no-underline transition-colors mt-10 inline-block"
          style={{
            fontSize: "10px",
            letterSpacing: "0.14em",
            color: "oklch(0.52 0.025 60)",
            borderBottom: "1px solid oklch(0.72 0.02 65)",
            paddingBottom: "2px",
          }}
        >
          Browse the Collection &#8594;
        </a>
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

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Photo URL */}
        <div className="space-y-2">
          <Label
            htmlFor="imageUrl"
            className="font-exhibit-label tracking-widest text-[10px]"
          >
            Photo URL <span className="text-muted-foreground">(Optional)</span>
          </Label>
          <Input
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            data-ocid="donate.image_url_input"
            placeholder="https://example.com/photo.jpg"
            type="url"
            className="font-body text-foreground bg-background border-border focus:ring-museum-brown rounded-none"
          />
          <p className="font-exhibit-label text-[10px] tracking-widest text-muted-foreground">
            Paste a direct link to a photo of your artifact
          </p>
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
            value={objectName}
            onChange={(e) => setObjectName(e.target.value)}
            data-ocid="donate.name_input"
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
            value={contributorName}
            onChange={(e) => setContributorName(e.target.value)}
            data-ocid="donate.contributor_input"
            placeholder="Your name, or leave blank to remain Anonymous"
            className="font-body text-foreground bg-background border-border focus:ring-museum-brown rounded-none"
          />
        </div>

        {/* Error */}
        {error && (
          <p
            className="font-exhibit-label text-[10px] tracking-widest"
            style={{ color: "oklch(0.55 0.15 25)" }}
            data-ocid="donate.error_state"
          >
            {error}
          </p>
        )}

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting || story.length < MIN_STORY}
            data-ocid="donate.submit_button"
            className="w-full font-exhibit-label tracking-widest text-[11px] px-8 py-4 bg-museum-brown text-museum-paper hover:bg-museum-brown-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Donating…" : "Donate to the Museum"}
          </button>
        </div>
      </form>
    </div>
  );
}
