import { Link } from "@tanstack/react-router";
import { ImageIcon } from "lucide-react";
import type { SupabaseArtifact } from "../lib/supabase";

interface ArtifactCardProps {
  artifact: SupabaseArtifact;
  index?: number;
  className?: string;
}

/**
 * Computes a stable, per-artifact tilt in degrees based on UUID string.
 * Range: roughly –1.6° to +1.6°
 */
function polaroidTilt(id: string): number {
  const n = (id.charCodeAt(0) || 0) % 11; // 0–10
  return (n - 5) * 0.32; // –1.6 to +1.6
}

export function ArtifactPlaceholder({ name }: { name: string }) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-3"
      style={{ backgroundColor: "oklch(0.91 0.012 72)" }}
    >
      <ImageIcon
        className="w-7 h-7"
        style={{ color: "oklch(0.62 0.022 62)" }}
      />
      <span
        className="font-exhibit-label text-center px-4 leading-snug"
        style={{
          fontSize: "9px",
          color: "oklch(0.55 0.025 60)",
          letterSpacing: "0.1em",
        }}
      >
        {name}
      </span>
    </div>
  );
}

export function ArtifactCard({
  artifact,
  index,
  className = "",
}: ArtifactCardProps) {
  const ocidSuffix = index !== undefined ? `.${index}` : "";
  const tilt = polaroidTilt(artifact.id);

  return (
    <Link
      to="/exhibit/$id"
      params={{ id: artifact.id }}
      data-ocid={`gallery.artifact.item${ocidSuffix}`}
      className={`group block no-underline ${className}`}
      style={{ display: "block" }}
    >
      <div
        className="polaroid-frame"
        style={{ transform: `rotate(${tilt}deg)` }}
      >
        <div className="polaroid-photo aspect-square">
          {artifact.image_url ? (
            <img
              src={artifact.image_url}
              alt={artifact.object_name}
              className="w-full h-full object-cover block"
              loading="lazy"
            />
          ) : (
            <ArtifactPlaceholder name={artifact.object_name} />
          )}
        </div>

        <div className="polaroid-caption">
          <p
            className="font-display font-semibold leading-tight truncate"
            style={{ fontSize: "13px", color: "oklch(0.30 0.03 55)" }}
          >
            {artifact.object_name}
          </p>
          <p
            className="mt-1.5 font-body leading-snug line-clamp-2"
            style={{
              fontSize: "11.5px",
              color: "oklch(0.56 0.022 60)",
              fontStyle: "italic",
            }}
          >
            {artifact.story.slice(0, 90)}
            {artifact.story.length > 90 ? "\u2026" : ""}
          </p>
        </div>
      </div>
    </Link>
  );
}

export function ArtifactCardLarge({
  artifact,
}: { artifact: SupabaseArtifact }) {
  return (
    <Link
      to="/exhibit/$id"
      params={{ id: artifact.id }}
      data-ocid="home.artifact_of_day_card"
      className="block no-underline group"
    >
      <div className="polaroid-frame" style={{ paddingBottom: "64px" }}>
        <div className="polaroid-photo aspect-[4/3]">
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
          <div className="flex items-start justify-between gap-2">
            <h3
              className="font-display font-bold leading-tight"
              style={{ fontSize: "17px", color: "oklch(0.28 0.03 55)" }}
            >
              {artifact.object_name}
            </h3>
          </div>
          <p
            className="mt-1 font-exhibit-label"
            style={{
              fontSize: "9px",
              color: "oklch(0.58 0.022 60)",
              letterSpacing: "0.08em",
            }}
          >
            &#8212; {artifact.contributor_name || "Anonymous"}
          </p>
          <p
            className="mt-2.5 font-body leading-relaxed line-clamp-3"
            style={{
              fontSize: "13px",
              color: "oklch(0.36 0.028 55)",
              fontStyle: "italic",
            }}
          >
            {artifact.story}
          </p>
          <p
            className="mt-3 font-exhibit-label"
            style={{
              fontSize: "9px",
              color: "oklch(0.45 0.06 50)",
              letterSpacing: "0.12em",
            }}
          >
            View Exhibit &#8594;
          </p>
        </div>
      </div>
    </Link>
  );
}
