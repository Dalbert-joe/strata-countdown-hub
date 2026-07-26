import { createFileRoute, Link } from "@tanstack/react-router";
import bgAsset from "../assets/events-bg.jpg.asset.json";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — STRATA '26" },
      {
        name: "description",
        content:
          "Explore the STRATA '26 event lineup — Arkham Escape, League of Shadows, Operation Knightfall and more.",
      },
      { property: "og:title", content: "Events — STRATA '26" },
      {
        property: "og:description",
        content:
          "Explore the STRATA '26 event lineup — Arkham Escape, League of Shadows, Operation Knightfall and more.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EventsPage,
});

const NAV = [
  { label: "Home", to: "/" as const },
  { label: "Events", to: "/events" as const },
  { label: "Contact", to: "/" as const },
];

const EVENTS = [
  { title: "Arkham Escape", tag: "Event 01" },
  { title: "League of Shadows", tag: "Event 02" },
  { title: "Operation Knightfall", tag: "Event 03" },
  { title: "Gotham's Ledger", tag: "Event 04" },
  { title: "Riddler's Escape", tag: "Event 05" },
  { title: "Rouge AI", tag: "Event 06" },
  { title: "Why So Serious?", tag: "Event 07" },
  { title: "Batman & Robin", tag: "Event 08" },
];

function EventsPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Blurred background */}
      <div
        aria-hidden
        className="fixed inset-0 scale-110 bg-cover bg-center blur-[6px]"
        style={{ backgroundImage: `url(${bgAsset.url})` }}
      />
      <div aria-hidden className="fixed inset-0 bg-black/70" />
      <div
        aria-hidden
        className="fixed inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"
      />

      {/* Nav */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12">
        <Link
          to="/"
          className="text-xs font-extrabold uppercase tracking-[0.4em] text-red-600 transition-colors hover:text-red-400 md:text-sm"
        >
          Strata '26
        </Link>
        <nav className="flex items-center gap-6 md:gap-10">
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70 transition-colors duration-300 hover:text-red-500 md:text-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Title */}
      <section className="relative z-10 px-6 pb-12 pt-10 text-center md:px-12 md:pt-16">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.5em] text-red-600 md:text-xs">
          The Lineup
        </p>
        <h1 className="mt-4 text-4xl font-black uppercase tracking-[0.15em] text-white drop-shadow-[0_0_30px_rgba(220,38,38,0.4)] md:text-6xl">
          Events
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-white/60 md:text-base">
          Placeholder description — add your event details, rules and
          registration links here.
        </p>
      </section>

      {/* Grid */}
      <section className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 pb-24 sm:grid-cols-2 lg:grid-cols-4 md:px-12">
        {EVENTS.map((ev, i) => (
          <article
            key={ev.title}
            style={{ animationDelay: `${i * 70}ms` }}
            className="group relative animate-[cardIn_0.7s_ease-out_both] overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-red-600/60 hover:shadow-[0_0_40px_-8px_rgba(220,38,38,0.55)]"
          >
            {/* Poster placeholder */}
            <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden bg-gradient-to-b from-neutral-900 to-black">
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-white/25">
                Poster
              </span>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"
              />
              <span className="absolute left-3 top-3 rounded-full border border-red-600/50 px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-[0.2em] text-red-500">
                {ev.tag}
              </span>
            </div>

            <div className="relative p-4">
              <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-white transition-colors duration-300 group-hover:text-red-500 md:text-base">
                {ev.title}
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-white/45">
                Placeholder — event description goes here.
              </p>
              <button
                type="button"
                className="mt-4 w-full rounded-md border border-white/15 py-2 text-[0.6rem] font-bold uppercase tracking-[0.3em] text-white/70 transition-all duration-300 hover:border-red-600 hover:bg-red-600/10 hover:text-white"
              >
                Details
              </button>
            </div>
          </article>
        ))}
      </section>

      <footer className="relative z-10 border-t border-white/10 px-6 py-8 text-center text-[0.6rem] uppercase tracking-[0.3em] text-white/30 md:px-12">
        Strata '26 — Placeholder footer
      </footer>

      <style>{`
        @keyframes cardIn { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </main>
  );
}
