import { useState } from "react";
import { EVENTS, type StrataEvent } from "../data/events";
import { SITE } from "../data/site";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/**
 * The event lineup. `scroll-mt-24` offsets the anchor target so the fixed nav
 * doesn't cover the heading when jumping here from the nav.
 */
export function EventsSection() {
  const [active, setActive] = useState<StrataEvent | null>(null);

  return (
    <section id="events" className="relative scroll-mt-24 px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="text-center">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.5em] text-red-600 md:text-xs">
            The Lineup
          </p>
          <h2 className="mt-4 text-4xl font-black uppercase tracking-[0.15em] text-white drop-shadow-[0_0_30px_rgba(220,38,38,0.4)] md:text-6xl">
            Events
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/70 md:text-base">
            Six events spanning research, coding, AI development, video generation, prompt
            engineering and databases. Step into Gotham and prove your skills.
          </p>
        </div>

        {/* Grid — 3 across on desktop so six events land as two clean rows */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EVENTS.map((ev, i) => (
            <article
              key={ev.slug}
              style={{ animationDelay: `${i * 70}ms` }}
              className="group relative flex h-full animate-[cardIn_0.7s_ease-out_both] flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-red-600/60 hover:shadow-[0_0_40px_-8px_rgba(220,38,38,0.55)]"
            >
              {/* Fixed aspect ratio keeps every card identical regardless of source image dimensions */}
              <div className="relative aspect-[3/4] w-full shrink-0 overflow-hidden bg-gradient-to-b from-neutral-900 to-black">
                <img
                  src={ev.poster}
                  alt={ev.title}
                  loading={i < 3 ? "eager" : "lazy"}
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent"
                />
                <span className="absolute left-3 top-3 rounded-full border border-red-600/50 bg-black/40 px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-[0.2em] text-red-500 backdrop-blur-sm">
                  {ev.tag}
                </span>
                <span className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/50 px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-[0.15em] text-white/80 backdrop-blur-sm">
                  {ev.participation}
                </span>
              </div>

              <div className="relative flex flex-1 flex-col p-4">
                <p className="text-[0.55rem] font-semibold uppercase tracking-[0.25em] text-red-500/80">
                  {ev.category}
                </p>
                <h3 className="mt-1.5 text-sm font-bold uppercase tracking-[0.15em] text-white transition-colors duration-300 group-hover:text-red-500 md:text-base">
                  {ev.title}
                </h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-white/65">{ev.summary}</p>
                <button
                  type="button"
                  onClick={() => setActive(ev)}
                  aria-label={`View details for ${ev.title}`}
                  className="mt-4 w-full rounded-md border border-white/15 py-2 text-[0.6rem] font-bold uppercase tracking-[0.3em] text-white/70 transition-all duration-300 hover:border-red-600 hover:bg-red-600/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
                >
                  Details
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <EventDialog event={active} onOpenChange={(open) => !open && setActive(null)} />

      <style>{`
        @keyframes cardIn { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </section>
  );
}

function EventDialog({
  event,
  onOpenChange,
}: {
  event: StrataEvent | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={event !== null} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto border-white/15 bg-neutral-950 sm:max-w-2xl">
        {event && (
          <>
            <DialogHeader>
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-red-500">
                {event.tag} — {event.category}
              </p>
              <DialogTitle className="mt-2 text-2xl font-black uppercase tracking-[0.1em] text-white md:text-3xl">
                {event.title}
              </DialogTitle>
              <DialogDescription className="text-sm text-white/70">
                {event.summary}
              </DialogDescription>
            </DialogHeader>

            <dl className="mt-2 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2">
              {event.highlights.map((h) => (
                <div key={h.label} className="bg-neutral-950 px-4 py-3">
                  <dt className="text-[0.55rem] font-bold uppercase tracking-[0.25em] text-white/45">
                    {h.label}
                  </dt>
                  <dd className="mt-1 text-sm text-white">{h.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-2 space-y-3">
              {event.description.map((para) => (
                <p key={para.slice(0, 40)} className="text-sm leading-relaxed text-white/75">
                  {para}
                </p>
              ))}
            </div>

            {SITE.registrationUrl !== "" && (
              <a
                href={SITE.registrationUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-red-600 px-4 py-3 text-[0.65rem] font-bold uppercase tracking-[0.3em] text-white transition-colors hover:bg-red-500"
              >
                Register
              </a>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default EventsSection;
