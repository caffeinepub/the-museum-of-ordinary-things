import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArtifactCard, ArtifactCardLarge } from "../components/ArtifactCard";
import { Skeleton } from "../components/ui/skeleton";
import { useActor } from "../hooks/useActor";

export function Home() {
  const { actor, isFetching } = useActor();

  const { data: artifactOfDay, isLoading: aodLoading } = useQuery({
    queryKey: ["artifactOfDay"],
    queryFn: async () => {
      if (!actor) return null;
      const res = await actor.getArtifactOfTheDay();
      return res.length > 0 ? res[0] : null;
    },
    enabled: !!actor && !isFetching,
  });

  const { data: artifacts, isLoading: artifactsLoading } = useQuery({
    queryKey: ["artifacts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getArtifacts();
    },
    enabled: !!actor && !isFetching,
  });

  const { data: stats } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getStats();
    },
    enabled: !!actor && !isFetching,
  });

  const latestThree = artifacts ? artifacts.slice(0, 3) : [];

  return (
    <div className="max-w-5xl mx-auto px-6">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="pt-24 pb-20 text-center">
        {/* Provenance line */}
        <p
          className="font-exhibit-label text-muted-foreground tracking-widest mb-8"
          style={{ fontSize: "9px", letterSpacing: "0.18em" }}
        >
          Est.&#160;in&#160;Memory&#160;&#160;&#183;&#160;&#160;Open&#160;Always
        </p>

        {/*
         * Typographic split:
         * "The Museum of" — modest, regular weight, sets the stage
         * "Ordinary Things" — dramatically larger italic, the emotional payload
         * This two-speed contrast is the signature detail of the site.
         */}
        <h1 className="font-display leading-none tracking-tight mb-2">
          <span
            className="block font-medium"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              color: "oklch(0.46 0.04 56)",
              letterSpacing: "-0.01em",
            }}
          >
            The Museum of
          </span>
          <em
            className="font-poetic block not-italic"
            style={{
              fontSize: "clamp(3rem, 10vw, 6.5rem)",
              color: "oklch(0.27 0.035 54)",
              letterSpacing: "-0.025em",
              lineHeight: 1.0,
              fontStyle: "italic",
            }}
          >
            Ordinary Things
          </em>
        </h1>

        {/* Tagline */}
        <p
          className="font-poetic mt-6 mb-5"
          style={{
            fontSize: "1.5rem",
            color: "oklch(0.56 0.028 60)",
            fontStyle: "italic",
          }}
        >
          Every object remembers.
        </p>

        {/* Descriptor */}
        <p
          className="font-body max-w-lg mx-auto leading-relaxed"
          style={{ fontSize: "1.1rem", color: "oklch(0.50 0.024 58)" }}
        >
          Here lie the objects no one else would keep. Each one carries a
          story&#160;&#8212; ordinary things made sacred by the weight of
          memory.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Link
            to="/gallery"
            data-ocid="home.browse_button"
            className="font-exhibit-label tracking-widest no-underline transition-colors"
            style={{
              fontSize: "10px",
              letterSpacing: "0.14em",
              padding: "14px 36px",
              border: "1px solid oklch(0.46 0.04 56)",
              color: "oklch(0.46 0.04 56)",
            }}
          >
            Browse the Museum
          </Link>
          <Link
            to="/donate"
            data-ocid="home.donate_button"
            className="font-exhibit-label tracking-widest no-underline transition-colors"
            style={{
              fontSize: "10px",
              letterSpacing: "0.14em",
              padding: "14px 36px",
              backgroundColor: "oklch(0.45 0.06 50)",
              color: "oklch(0.97 0.01 80)",
            }}
          >
            Donate an Artifact
          </Link>
        </div>

        {/* Stats */}
        {stats && (
          <div className="mt-12 flex items-center justify-center gap-10">
            <div className="text-center">
              <p
                className="font-display font-bold"
                style={{ fontSize: "2rem", color: "oklch(0.30 0.032 55)" }}
              >
                {stats.total.toString()}
              </p>
              <p
                className="font-exhibit-label text-muted-foreground mt-1"
                style={{ fontSize: "9px", letterSpacing: "0.14em" }}
              >
                Objects Archived
              </p>
            </div>
            <div
              style={{
                width: "1px",
                height: "36px",
                backgroundColor: "oklch(0.82 0.02 72)",
              }}
            />
            <div className="text-center">
              <p
                className="font-display font-bold"
                style={{ fontSize: "2rem", color: "oklch(0.30 0.032 55)" }}
              >
                {stats.today.toString()}
              </p>
              <p
                className="font-exhibit-label text-muted-foreground mt-1"
                style={{ fontSize: "9px", letterSpacing: "0.14em" }}
              >
                Stories Shared Today
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Thin section rule */}
      <div style={{ height: "1px", backgroundColor: "oklch(0.84 0.018 74)" }} />

      {/* ── Artifact of the Day ──────────────────────────────────── */}
      <section className="py-20">
        <div className="text-center mb-12">
          <p
            className="font-exhibit-label text-muted-foreground"
            style={{ fontSize: "9px", letterSpacing: "0.18em" }}
          >
            &#8212;&#160;&#160;Featured Exhibit&#160;&#160;&#8212;
          </p>
          <h2
            className="font-display font-semibold mt-3"
            style={{ fontSize: "2rem", color: "oklch(0.30 0.032 55)" }}
          >
            Artifact of the Day
          </h2>
        </div>

        {aodLoading ? (
          <div className="max-w-xs mx-auto">
            <Skeleton className="aspect-[4/3] w-full" />
            <Skeleton className="h-5 mt-4 w-3/4" />
            <Skeleton className="h-3 mt-2 w-full" />
          </div>
        ) : artifactOfDay ? (
          <div className="max-w-xs mx-auto">
            <ArtifactCardLarge artifact={artifactOfDay} />
          </div>
        ) : (
          <p
            className="text-center font-poetic text-muted-foreground"
            style={{ fontSize: "1.15rem", fontStyle: "italic" }}
          >
            No exhibit selected for today. Return tomorrow.
          </p>
        )}
      </section>

      <div style={{ height: "1px", backgroundColor: "oklch(0.84 0.018 74)" }} />

      {/* ── Latest Exhibits ──────────────────────────────────────── */}
      <section className="py-20" data-ocid="home.latest_exhibits_section">
        <div className="text-center mb-14">
          <p
            className="font-exhibit-label text-muted-foreground"
            style={{ fontSize: "9px", letterSpacing: "0.18em" }}
          >
            &#8212;&#160;&#160;Recently Acquired&#160;&#160;&#8212;
          </p>
          <h2
            className="font-display font-semibold mt-3"
            style={{ fontSize: "2rem", color: "oklch(0.30 0.032 55)" }}
          >
            Latest Exhibits
          </h2>
        </div>

        {artifactsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {["s1", "s2", "s3"].map((k) => (
              <div key={k}>
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="h-4 mt-3 w-2/3" />
                <Skeleton className="h-3 mt-2 w-full" />
              </div>
            ))}
          </div>
        ) : latestThree.length > 0 ? (
          /*
           * Slight vertical stagger per card — the middle card sits a little
           * lower, as if casually placed on a table, not stacked on a shelf.
           */
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 items-start">
            {latestThree.map((artifact, i) => (
              <div
                key={artifact.id.toString()}
                style={{ marginTop: i === 1 ? "20px" : "0" }}
              >
                <ArtifactCard artifact={artifact} index={i + 1} />
              </div>
            ))}
          </div>
        ) : (
          <p
            className="text-center font-poetic text-muted-foreground"
            style={{ fontStyle: "italic", fontSize: "1.15rem" }}
          >
            The collection awaits its first artifact.
          </p>
        )}

        <div className="text-center mt-14">
          <Link
            to="/gallery"
            className="font-exhibit-label no-underline transition-colors"
            style={{
              fontSize: "10px",
              letterSpacing: "0.14em",
              color: "oklch(0.52 0.025 60)",
              borderBottom: "1px solid oklch(0.72 0.02 65)",
              paddingBottom: "2px",
            }}
          >
            Browse the Full Collection &#8594;
          </Link>
        </div>
      </section>
    </div>
  );
}
