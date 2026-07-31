import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { SiteNav } from "../components/SiteNav";
import { HeroSection } from "../components/HeroSection";
import { EventsSection } from "../components/EventsSection";
import { ContactSection } from "../components/ContactSection";
import { Atmosphere } from "../components/Atmosphere";
import { FloatingBlobs } from "../components/FloatingBlobs";
import { REGISTER_URL } from "../data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "STRATA '26: AI & DS Symposium" },
      {
        name: "description",
        content:
          "STRATA '26 is the Artificial Intelligence & Data Science symposium. Six events across research, coding, AI development, video generation, prompt engineering and databases.",
      },
      { property: "og:title", content: "STRATA '26: AI & DS Symposium" },
      {
        property: "og:description",
        content:
          "STRATA '26 is the Artificial Intelligence & Data Science symposium. Six events across research, coding, AI development, video generation, prompt engineering and databases.",
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
        <FloatingBlobs />
        <div className="relative z-10">
          <EventsSection />

          {/* Register CTA — sits between Events and Contact rather than
              buried at the bottom of the page, so it's the thing a visitor
              hits right after browsing the lineup. */}
          <div className="px-6 py-16 text-center md:px-12">
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-sodium-glow px-14 py-5 text-sm font-bold uppercase tracking-[0.35em] text-black transition-all duration-300 hover:bg-sodium-core hover:shadow-[0_0_44px_-8px_rgba(238,178,44,0.75)]"
            >
              Register Now
            </a>
          </div>

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
