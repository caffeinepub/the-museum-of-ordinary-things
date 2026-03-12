import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Shuffle } from "lucide-react";
import { useState } from "react";
import { ArtifactCard } from "../components/ArtifactCard";
import { Skeleton } from "../components/ui/skeleton";
import { type SupabaseArtifact, supabase } from "../lib/supabase";

const SKELETON_KEYS = ["a", "b", "c", "d", "e", "f", "g", "h"];

export function Gallery() {
  const navigate = useNavigate();
  const [randomizing, setRandomizing] = useState(false);

  const { data: artifacts, isLoading } = useQuery({
    queryKey: ["artifacts"],
    queryFn: async (): Promise<SupabaseArtifact[]> => {
      const { data, error } = await supabase
        .from("artifacts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const handleRandom = async () => {
    if (!artifacts || artifacts.length === 0 || randomizing) return;
    setRandomizing(true);
    try {
      const random = artifacts[Math.floor(Math.random() * artifacts.length)];
      if (random) {
        await navigate({
          to: "/exhibit/$id",
          params: { id: random.id },
        });
      }
    } finally {
      setRandomizing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="font-exhibit-label text-muted-foreground tracking-widest text-[10px]">
          — Permanent Collection —
        </p>
        <div className="flex items-end justify-between mt-2 flex-wrap gap-4">
          <h1 className="font-display text-foreground text-4xl font-bold">
            The Collection
          </h1>
          <button
            type="button"
            onClick={handleRandom}
            disabled={randomizing || !artifacts || artifacts.length === 0}
            data-ocid="gallery.random_button"
            className="font-exhibit-label text-[10px] tracking-widest flex items-center gap-2 border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors px-4 py-2 disabled:opacity-50"
          >
            <Shuffle className="w-3 h-3" />
            {randomizing ? "Finding…" : "Random Artifact"}
          </button>
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
          data-ocid="gallery.loading_state"
        >
          {SKELETON_KEYS.map((k) => (
            <div key={k}>
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="h-5 mt-3 w-2/3" />
            </div>
          ))}
        </div>
      ) : artifacts && artifacts.length > 0 ? (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
          data-ocid="gallery.artifact_grid"
        >
          {artifacts.map((artifact, i) => (
            <ArtifactCard key={artifact.id} artifact={artifact} index={i + 1} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24" data-ocid="gallery.empty_state">
          <p className="font-display text-foreground text-2xl font-bold mb-3">
            No artifacts yet
          </p>
          <p className="font-poetic text-muted-foreground italic">
            This room of the museum awaits its first donation.
          </p>
        </div>
      )}
    </div>
  );
}
