export function DonateSuccess() {
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
        Artifact successfully donated to the museum.
      </p>
      <a
        href="/gallery"
        data-ocid="donate.success.gallery_link"
        className="inline-block mt-10 font-exhibit-label tracking-widest text-[10px] border border-border px-6 py-3 hover:border-foreground hover:text-foreground transition-colors"
      >
        View the Gallery
      </a>
    </div>
  );
}
