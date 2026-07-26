import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import logoAsset from "../strata26Logo.png";
import videoAsset from "../herobg.mp4";
import batAsset from "../button.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "STRATA '26 — Symposium Hero" },
      {
        name: "description",
        content:
          "STRATA '26 — the Artificial Intelligence and Data Science symposium. Explore the events lineup.",
      },
      { property: "og:title", content: "STRATA '26 — Symposium Hero" },
      {
        property: "og:description",
        content:
          "STRATA '26 — the Artificial Intelligence and Data Science symposium. Explore the events lineup.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});
const NAV = ["Home", "Events", "Contact"];
function Index() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={videoAsset}
        autoPlay
        loop
        muted
        playsInline
      />
      <div aria-hidden className="absolute inset-0 bg-black/60" />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black"
      />
      {/* Nav */}
      <header className="relative z-10 flex items-center justify-end px-6 py-6 md:px-12">
        <nav className="flex items-center gap-6 md:gap-10">
          {NAV.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70 transition-colors duration-300 hover:text-red-500 md:text-sm"
            >
              {item}
            </a>
          ))}
        </nav>
      </header>
      {/* Hero content */}
      <div className="relative z-10 flex h-[calc(100vh-5.5rem)] flex-col items-center justify-center px-6 pb-44 md:pb-52">
        <h1 className="sr-only">STRATA '26</h1>
        <img
          src={logoAsset}
          alt="STRATA '26"
          className="mt-32 w-[min(92vw,860px)] animate-[heroIn_1.1s_ease-out] object-contain drop-shadow-[0_0_60px_rgba(220,38,38,0.35)] md:mt-40"
        />
        {/* Bat-shaped Events button */}
        <button
          type="button"
          onClick={() => toast("EVENTS — lineup coming soon.")}
          aria-label="Events"
          className="group absolute bottom-0 left-1/2 -translate-x-1/2 focus:outline-none md:bottom-2"
        >
          <span className="relative block w-[min(64vw,280px)] transition-transform duration-500 ease-out group-hover:scale-105">
            <img
              src={batAsset}
              alt=""
              aria-hidden
              className="w-full drop-shadow-[0_0_28px_rgba(220,38,38,0.55)]"
            />
            <span className="pointer-events-none absolute inset-x-0 top-[38%] text-center text-[clamp(0.65rem,2vw,1rem)] font-extrabold uppercase tracking-[0.45em] text-white transition-colors duration-300 group-hover:text-white/90">
              Events
            </span>
          </span>
        </button>
      </div>
      <Toaster theme="dark" />
      <style>{`
        @keyframes heroIn { from { opacity: 0; transform: scale(0.94); filter: blur(6px); } to { opacity: 1; transform: scale(1); filter: blur(0); } }
      `}</style>
    </section>
  );
}
