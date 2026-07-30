import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { SiteNav } from "../components/SiteNav";
import { HeroSection } from "../components/HeroSection";
import { EventsSection } from "../components/EventsSection";
import { ContactSection } from "../components/ContactSection";
import { Atmosphere } from "../components/Atmosphere";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "STRATA '26 — AI & DS Symposium" },
      {
        name: "description",
        content:
          "STRATA '26 — the Artificial Intelligence & Data Science symposium. Six events across research, coding, AI development, video generation, prompt engineering and databases.",
      },
      { property: "og:title", content: "STRATA '26 — AI & DS Symposium" },
      {
        property: "og:description",
        content:
          "STRATA '26 — the Artificial Intelligence & Data Science symposium. Six events across research, coding, AI development, video generation, prompt engineering and databases.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/**
 * Single-page site. Home / Events / Contact are sections on this one route,
 * reached by scrolling — the nav uses hash anchors rather than navigation.
 */
function Index() {
  return (
    <main className="relative w-full bg-black">
      <SiteNav />

      <HeroSection />

      {/* The hero video is `fixed` (see HeroSection), so it stays pinned to the
          viewport and keeps playing behind the whole page rather than scrolling
          away with the hero.

          This wrapper is fully OPAQUE on purpose. It used to be a translucent
          pane (bg-black/55 + backdrop-blur) which let 45% of the red-washed
          video bleed up through every section below the hero — so the events
          and contact sections read reddish-brown no matter what colour their
          own elements were. The palette below the fold is black + sodium
          amber, and amber cannot read as *light* on a surface that is already
          glowing red. The video is now a hero-only moment.

          --gotham-void rather than pure #000: it is a hair above black and
          very slightly cool, which is what lets the sodium gold below read as
          *warm* light rather than as a yellow shape on a neutral field. Grain
          and haze still sit over it via <Atmosphere />, so it is textured
          darkness rather than a dead flat rectangle. */}
      <div className="relative z-10 overflow-hidden bg-gotham-void">
        <div className="relative z-10">
          <EventsSection />
          <ContactSection />
        </div>
      </div>

      {/* Last child, but z-60 — grain and haze belong to the whole frame, so
          this lays over the nav and every section rather than sitting inside
          one of them. */}
      <Atmosphere />

      <Toaster theme="dark" />
    </main>
  );
}
