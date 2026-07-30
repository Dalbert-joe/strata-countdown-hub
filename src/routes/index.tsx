import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { SiteNav } from "../components/SiteNav";
import { HeroSection } from "../components/HeroSection";
import { EventsSection } from "../components/EventsSection";
import { ContactSection } from "../components/ContactSection";

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

      {/* The hero video sits fixed behind the whole page (see HeroSection), so
          it keeps playing under everything below rather than scrolling away
          with the hero. This wrapper is what makes it read as "background"
          again once the events content arrives: a frosted, darkened pane
          (backdrop-blur) over the still-playing video, instead of stopping
          it dead and swapping in a static image. */}
      <div className="relative z-10 overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-black/55 backdrop-blur-md" />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"
        />

        <div className="relative z-10">
          <EventsSection />
          <ContactSection />
        </div>
      </div>

      <Toaster theme="dark" />
    </main>
  );
}
