import { Link, useRouterState } from "@tanstack/react-router";

export function Nav() {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / home link */}
        <Link to="/" data-ocid="nav.home_link" className="no-underline group">
          <span className="font-display text-foreground text-base font-semibold tracking-tight group-hover:text-museum-brown transition-colors">
            The Museum
          </span>
          <span className="font-exhibit-label text-muted-foreground text-[9px] block mt-0.5 tracking-widest">
            of Ordinary Things
          </span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-6">
          <Link
            to="/gallery"
            data-ocid="nav.gallery_link"
            className={`font-exhibit-label text-[10px] tracking-widest no-underline transition-colors ${
              pathname === "/gallery"
                ? "text-foreground border-b border-foreground pb-0.5"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            The Collection
          </Link>
          <Link
            to="/donate"
            data-ocid="nav.donate_link"
            className={`font-exhibit-label text-[10px] tracking-widest no-underline transition-colors ${
              pathname === "/donate"
                ? "text-foreground border-b border-foreground pb-0.5"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Donate an Artifact
          </Link>
        </div>
      </nav>
    </header>
  );
}
