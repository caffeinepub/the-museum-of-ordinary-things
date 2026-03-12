import { Link } from "@tanstack/react-router";
import { ImageIcon } from "lucide-react";
import type { Artifact } from "../../../backend/backend";
import { MoodBadge } from "./MoodBadge";

interface ArtifactCardProps {
  artifact: Artifact;
  index?: number;
  className?: string;
}

/**
 * Computes a stable, per-artifact tilt in degrees.
 * Range: roughly –1.6° to +1.6° — subtle enough to feel organic,
 * not so much that it looks like a bug.
 */
function polaroidTilt(id: bigint): number {
  const n = Number(id % 11n); // 0–10
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
  const moodTag = artifact.moodTag.length > 0 ? artifact.moodTag[0] : null;
  const tilt = polaroidTilt(artifact.id);

  return (
    <Link
      to="/exhibit/$id"
      params={{ id: artifact.id.toString() }}
      data-ocid={`gallery.artifact.item${ocidSuffix}`}
      className={`group block no-underline ${className}`}
      style={{ display: "block" }}
    >
      {/*
       * Polaroid frame — warm-white mount, thick bottom strip.
       * Base tilt is per-artifact; hover straightens + lifts.
       */}
      <div
        className="polaroid-frame"
        style={{ transform: `rotate(${tilt}deg)` }}
      >
        {/* Photo surface — inset shadow simulates print edge */}
        <div className="polaroid-photo aspect-square">
          {artifact.imageId ? (
            <img
              src={artifact.imageId}
              alt={artifact.objectName}
              className="w-full h-full object-cover block"
              loading="lazy"
            />
          ) : (
            <ArtifactPlaceholder name={artifact.objectName} />
          )}
        </div>

        {/* Caption strip */}
        <div className="polaroid-caption">
          <p
            className="font-display font-semibold leading-tight truncate"
            style={{ fontSize: "13px", color: "oklch(0.30 0.03 55)" }}
          >
            {artifact.objectName}
          </p>
          {moodTag && (
            <div className="mt-1.5">
              <MoodBadge mood={moodTag} />
            </div>
          )}
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

export function ArtifactCardLarge({ artifact }: { artifact: Artifact }) {
  const moodTag = artifact.moodTag.length > 0 ? artifact.moodTag[0] : null;

  return (
    <Link
      to="/exhibit/$id"
      params={{ id: artifact.id.toString() }}
      data-ocid="home.artifact_of_day_card"
      className="block no-underline group"
    >
      {/* Slightly more generous padding for the featured card */}
      <div className="polaroid-frame" style={{ paddingBottom: "64px" }}>
        <div className="polaroid-photo aspect-[4/3]">
          {artifact.imageId ? (
            <img
              src={artifact.imageId}
              alt={artifact.objectName}
              className="w-full h-full object-cover block"
            />
          ) : (
            <ArtifactPlaceholder name={artifact.objectName} />
          )}
        </div>

        <div className="polaroid-caption">
          <div className="flex items-start justify-between gap-2">
            <h3
              className="font-display font-bold leading-tight"
              style={{ fontSize: "17px", color: "oklch(0.28 0.03 55)" }}
            >
              {artifact.objectName}
            </h3>
            {moodTag && <MoodBadge mood={moodTag} />}
          </div>
          <p
            className="mt-1 font-exhibit-label"
            style={{
              fontSize: "9px",
              color: "oklch(0.58 0.022 60)",
              letterSpacing: "0.08em",
            }}
          >
            &#8212; {artifact.contributorName || "Anonymous"}
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
