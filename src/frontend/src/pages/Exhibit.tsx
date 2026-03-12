import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ArtifactPlaceholder } from "../components/ArtifactCard";
import { Skeleton } from "../components/ui/skeleton";
import { supabase } from "../lib/supabase";

export function Exhibit() {
  const { id } = useParams({ from: "/exhibit/$id" });

  const { data: artifact, isLoading } = useQuery({
    queryKey: ["artifact", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("artifacts")
        .select("*")
        .eq("id", id)
        .single();
      if (error) return null;
      return data;
    },
  });

  const formattedDate = artifact
    ? new Date(artifact.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  // Derive a short accession number from the last 4 chars of the UUID
  const exhibitNumber = id ? id.slice(-4).toUpperCase() : "0001";

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      {/* ── Back link ─────────────────────────────────────────────── */}
      <Link
        to="/gallery"
        data-ocid="exhibit.back_link"
        className="font-exhibit-label no-underline transition-colors flex items-center gap-2 mb-14"
        style={{
          fontSize: "9px",
          letterSpacing: "0.14em",
          color: "oklch(0.58 0.022 60)",
        }}
      >
        <ArrowLeft className="w-3 h-3" />
        Return to Collection
      </Link>

      {isLoading ? (
        <div className="text-center">
          <Skeleton className="aspect-square max-w-xs mx-auto w-full" />
          <Skeleton className="h-8 w-2/3 mx-auto mt-8" />
          <Skeleton className="h-4 w-1/3 mx-auto mt-3" />
          <Skeleton className="h-32 mt-8" />
        </div>
      ) : artifact ? (
        <div>
          <p
            className="font-exhibit-label text-center mb-10"
            style={{
              fontSize: "9px",
              color: "oklch(0.65 0.020 65)",
              letterSpacing: "0.2em",
            }}
          >
            Accession No.&#160;{exhibitNumber}
          </p>

          <div className="max-w-xs mx-auto">
            <div className="polaroid-frame" style={{ paddingBottom: "56px" }}>
              <div className="polaroid-photo aspect-square">
                {artifact.image_url ? (
                  <img
                    src={artifact.image_url}
                    alt={artifact.object_name}
                    className="w-full h-full object-cover block"
                  />
                ) : (
                  <ArtifactPlaceholder name={artifact.object_name} />
                )}
              </div>
              <div className="polaroid-caption">
                <p
                  className="font-display font-semibold leading-tight"
                  style={{ fontSize: "13px", color: "oklch(0.30 0.03 55)" }}
                >
                  {artifact.object_name}
                </p>
                <p
                  className="font-exhibit-label mt-1"
                  style={{
                    fontSize: "8.5px",
                    color: "oklch(0.60 0.020 62)",
                    letterSpacing: "0.08em",
                  }}
                >
                  &#8212;&#160;{artifact.contributor_name || "Anonymous"}
                </p>
              </div>
            </div>
          </div>

          <div
            className="exhibit-placard mt-12 mx-auto"
            style={{ maxWidth: "560px" }}
            data-ocid="exhibit.exhibit_panel"
          >
            <div className="flex items-center justify-between mb-6">
              <span
                className="font-exhibit-label"
                style={{
                  fontSize: "8.5px",
                  color: "oklch(0.65 0.018 64)",
                  letterSpacing: "0.18em",
                }}
              >
                Exhibit&#160;Label
              </span>
            </div>

            <h1
              className="font-display font-bold leading-tight"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                color: "oklch(0.26 0.034 54)",
              }}
            >
              {artifact.object_name}
            </h1>

            <div
              className="font-exhibit-label mt-4 flex flex-wrap gap-x-5 gap-y-1"
              style={{
                fontSize: "9px",
                color: "oklch(0.60 0.020 62)",
                letterSpacing: "0.12em",
              }}
            >
              <span>
                Contributed&#160;by&#160;
                <span style={{ color: "oklch(0.38 0.030 54)" }}>
                  {artifact.contributor_name || "Anonymous"}
                </span>
              </span>
              <span style={{ color: "oklch(0.78 0.018 72)" }}>&#183;</span>
              <span>
                Acquired:&#160;
                <span style={{ color: "oklch(0.38 0.030 54)" }}>
                  {formattedDate}
                </span>
              </span>
            </div>

            <div
              style={{
                margin: "1.75rem 0",
                height: "1px",
                backgroundColor: "oklch(0.80 0.020 70)",
              }}
            />

            <p
              className="font-body leading-loose whitespace-pre-wrap"
              style={{
                fontSize: "1.15rem",
                color: "oklch(0.32 0.030 55)",
                lineHeight: 1.85,
              }}
            >
              {artifact.story}
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-24">
          <p
            className="font-display font-bold mb-3"
            style={{ fontSize: "1.8rem", color: "oklch(0.30 0.032 55)" }}
          >
            Exhibit Not Found
          </p>
          <p
            className="font-poetic text-muted-foreground"
            style={{ fontStyle: "italic", fontSize: "1.15rem" }}
          >
            This artifact may have been moved or never existed.
          </p>
          <Link
            to="/gallery"
            className="font-exhibit-label no-underline transition-colors mt-8 inline-block"
            style={{
              fontSize: "9px",
              letterSpacing: "0.14em",
              color: "oklch(0.52 0.025 60)",
              borderBottom: "1px solid oklch(0.72 0.02 65)",
              paddingBottom: "2px",
            }}
          >
            Return to Collection
          </Link>
        </div>
      )}
    </div>
  );
}
