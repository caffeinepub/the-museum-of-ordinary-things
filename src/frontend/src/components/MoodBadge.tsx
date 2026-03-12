import type { MoodTag } from "../../../backend/backend";

const moodConfig: Record<string, { label: string; color: string }> = {
  nostalgic: {
    label: "Nostalgic",
    color: "bg-amber-100 text-amber-800 border-amber-300",
  },
  funny: {
    label: "Funny",
    color: "bg-stone-100 text-stone-700 border-stone-300",
  },
  bittersweet: {
    label: "Bittersweet",
    color: "bg-rose-50 text-rose-800 border-rose-200",
  },
  love: { label: "Love", color: "bg-pink-50 text-pink-800 border-pink-200" },
  childhood: {
    label: "Childhood",
    color: "bg-orange-50 text-orange-800 border-orange-200",
  },
};

export function moodToString(tag: MoodTag): string {
  if ("nostalgic" in tag) return "nostalgic";
  if ("funny" in tag) return "funny";
  if ("bittersweet" in tag) return "bittersweet";
  if ("love" in tag) return "love";
  if ("childhood" in tag) return "childhood";
  return "";
}

interface MoodBadgeProps {
  mood: MoodTag;
}

export function MoodBadge({ mood }: MoodBadgeProps) {
  const key = moodToString(mood);
  const config = moodConfig[key];
  if (!config) return null;
  return (
    <span
      className={`font-exhibit-label inline-block border px-2 py-0.5 text-[10px] tracking-widest ${
        config.color
      }`}
    >
      {config.label}
    </span>
  );
}
