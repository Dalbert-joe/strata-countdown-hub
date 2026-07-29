import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { SiteNav } from "../components/SiteNav";
import { HeroSection } from "../components/HeroSection";
import { EventsSection } from "../components/EventsSection";
import { ContactSection } from "../components/ContactSection";
import bgAsset from "../Events.jpg";

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

      {/* Shared backdrop for everything below the hero. Absolute rather than
          fixed so it doesn't bleed through the hero video above it. */}
      <div className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 scale-110 bg-cover bg-center blur-[6px]"
          style={{ backgroundImage: `url(${bgAsset})` }}
        />
        <div aria-hidden className="absolute inset-0 bg-black/75" />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black"
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
