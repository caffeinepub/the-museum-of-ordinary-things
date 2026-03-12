import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Nav } from "./components/Nav";
import { Toaster } from "./components/ui/sonner";
import { Donate } from "./pages/Donate";
import { Exhibit } from "./pages/Exhibit";
import { Gallery } from "./pages/Gallery";
import { Home } from "./pages/Home";

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-border py-8 mt-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="font-exhibit-label text-muted-foreground text-[10px] tracking-widest">
            © {new Date().getFullYear()} · Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
      <Toaster />
    </div>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const galleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gallery",
  component: Gallery,
});

const exhibitRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/exhibit/$id",
  component: Exhibit,
});

const donateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/donate",
  component: Donate,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  galleryRoute,
  exhibitRoute,
  donateRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
