import { useRef, useState, type RefObject } from "react";
import { ArrowRight } from "lucide-react";
import bgAsset from "../Events.jpg";
import { EVENTS, type StrataEvent } from "../data/events";
import { REGISTER_URL } from "../data/site";
import { spawnCardBurst } from "./CardBurst";
import { PhoneNumber } from "./PhoneNumber";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const MODAL_OPEN_DELAY_MS = 250;

/**
 * The event lineup. `scroll-mt-24` offsets the anchor target so the fixed nav
 * doesn't cover the heading when jumping here from the nav.
 *
 * Background: `absolute` (not `fixed`, unlike the hero) so it scrolls away
 * with this section rather than pinning to the viewport — this section has
 * its own image instead of inheriting the hero's video once the hero is
 * scrolled out of view and its fixed layers are hidden.
 */
export function EventsSection() {
  const [active, setActive] = useState<StrataEvent | null>(null);
  // Dialog is fully controlled (no DialogTrigger), so Radix has no trigger to
  // return focus to on close — track it ourselves and refocus explicitly.
  const triggerRef = useRef<HTMLElement | null>(null);
  const burstRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const openEvent = (ev: StrataEvent, triggerEl: HTMLElement) => {
    triggerRef.current = triggerEl;
    const reduced = window.matchMedia(REDUCED_MOTION_QUERY).matches;
    const burstContainer = burstRefs.current[ev.slug];

    if (reduced || !burstContainer) {
      setActive(ev);
      return;
    }

    spawnCardBurst(burstContainer);
    // Modal starts its own scale-in partway through the burst so the two
    // read as one gesture rather than two sequential animations.
    window.setTimeout(() => setActive(ev), MODAL_OPEN_DELAY_MS);
  };

  return (
    <section id="events" className="relative scroll-mt-24 overflow-hidden bg-black px-6 py-20 md:px-12 md:py-24">
      {/* Background layer — sits behind everything in this section only */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 scale-110 bg-cover bg-center blur-[6px]"
        style={{ backgroundImage: `url(${bgAsset})` }}
      />
      <div aria-hidden className="absolute inset-0 z-0 bg-black/70" />
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-black/40 to-black"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Heading */}
        <div className="text-center">
          <p className="font-batman text-[0.65rem] font-semibold uppercase tracking-[0.5em] text-sodium-glow md:text-xs">
            The Lineup
          </p>
          {/* Warm halation rather than a red drop-shadow: the heading should
              look lit by the same sodium lamp as everything else in this
              section, not like it is emitting its own colour. */}
          <h2 className="font-batman mt-4 text-4xl uppercase tracking-[0.15em] text-white drop-shadow-[0_0_34px_rgba(238,178,44,0.3)] md:text-6xl">
            Events
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/70 md:text-base">
            Six events spanning research, coding, AI development, video generation, prompt
            engineering and databases. Step into Gotham and prove your skills.
          </p>
        </div>

        {/* Grid — 3 across on desktop so six events land as two clean rows */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EVENTS.map((ev, i) => {
            const coordinatorNames = ev.coordinators.map((c) => c.name).join(" & ");
            return (
              <div key={ev.slug} className="relative">
                {/* Burst layer: z-0, behind the card, above the section background */}
                <div
                  ref={(el) => {
                    burstRefs.current[ev.slug] = el;
                  }}
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-0 overflow-visible"
                />

                <article
                  role="button"
                  tabIndex={0}
                  aria-label={`View details for ${ev.title}`}
                  onClick={(e) => openEvent(ev, e.currentTarget)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      openEvent(ev, e.currentTarget);
                    } else if (e.key === " ") {
                      e.preventDefault();
                      openEvent(ev, e.currentTarget);
                    }
                  }}
                  style={{ animationDelay: `${i * 70}ms` }}
                  className="group relative z-10 flex h-full animate-[cardIn_0.7s_ease-out_both] cursor-pointer flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-sodium-glow/60 hover:shadow-[0_0_40px_-8px_rgba(238,178,44,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sodium-glow focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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
                    <span className="absolute left-3 top-3 rounded-full border border-sodium-deep/50 bg-black/40 px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-[0.2em] text-sodium-glow backdrop-blur-sm">
                      {ev.tag}
                    </span>
                    <span className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/50 px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-[0.15em] text-white/80 backdrop-blur-sm">
                      {ev.participation}
                    </span>
                  </div>

                  <div className="relative flex flex-1 flex-col p-4">
                    {/* Category sits one step further from the lamp than the
                        title does — deep amber reads as the dimmer falloff, so
                        the two warm elements have a hierarchy instead of
                        competing at the same brightness. */}
                    <p className="text-[0.55rem] font-semibold uppercase tracking-[0.25em] text-sodium-deep">
                      {ev.category}
                    </p>
                    <h3 className="font-batman mt-1.5 text-sm uppercase tracking-[0.15em] text-white transition-colors duration-300 group-hover:text-sodium-glow md:text-base">
                      {ev.title}
                    </h3>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-white/65">
                      {ev.summary}
                    </p>

                    <p
                      className={`mt-3 text-[0.6rem] font-semibold uppercase tracking-[0.15em] ${
                        coordinatorNames === "" ? "italic text-white/35" : "text-white/50"
                      }`}
                    >
                      Coordinators: {coordinatorNames === "" ? "To be announced" : coordinatorNames}
                    </p>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-sodium-glow transition-transform duration-300 group-hover:translate-x-1">
                        View Details
                        <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      </span>
                      {/* Gold, not crimson: below the hero there is no red at
                          all, so the CTA earns its prominence from being the
                          only *filled* warm block on a black card rather than
                          from being a different hue. Black text on gold also
                          out-contrasts the old white-on-red. */}
                      <a
                        href={REGISTER_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Register for ${ev.title}`}
                        className="rounded-md bg-sodium-glow px-5 py-2 text-center text-[0.6rem] font-bold uppercase tracking-[0.25em] text-black transition-colors duration-300 hover:bg-sodium-core focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sodium-glow"
                      >
                        Register
                      </a>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>

      <EventDialog
        event={active}
        onOpenChange={(open) => !open && setActive(null)}
        triggerRef={triggerRef}
      />

      <style>{`
        @keyframes cardIn { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </section>
  );
}

function EventDialog({
  event,
  onOpenChange,
  triggerRef,
}: {
  event: StrataEvent | null;
  onOpenChange: (open: boolean) => void;
  triggerRef: RefObject<HTMLElement | null>;
}) {
  return (
    <Dialog open={event !== null} onOpenChange={onOpenChange}>
      <DialogContent
        className="scrollbar-none max-h-[85vh] overflow-y-auto border-white/15 bg-neutral-950 sm:max-w-2xl"
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          triggerRef.current?.focus();
        }}
      >
        {event && (
          <>
            {/* 1. Event name */}
            <DialogHeader>
              <p className="font-batman text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-sodium-glow">
                {event.tag} · {event.category}
              </p>
              <DialogTitle className="font-batman mt-2 text-2xl uppercase tracking-[0.1em] text-white md:text-3xl">
                {event.title}
              </DialogTitle>
              <p className="text-sm text-white/70">{event.summary}</p>
            </DialogHeader>

            {/* 2. Team size badge */}
            <span className="inline-flex w-fit items-center rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/80">
              {event.participation}
            </span>

            <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2">
              {event.highlights.map((h) => (
                <div key={h.label} className="bg-neutral-950 px-4 py-3">
                  <dt className="text-[0.55rem] font-bold uppercase tracking-[0.25em] text-white/45">
                    {h.label}
                  </dt>
                  <dd className="mt-1 text-sm text-white">{h.value}</dd>
                </div>
              ))}
            </dl>

            {/* 3. Full description, preserved verbatim */}
            <div className="space-y-3">
              {event.description.map((para) => (
                <p key={para.slice(0, 40)} className="text-sm leading-relaxed text-white/75">
                  {para}
                </p>
              ))}
            </div>

            {/* 4. Coordinators — omitted entirely when not yet assigned */}
            {event.coordinators.length > 0 && (
              <div className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3">
                <p className="text-[0.55rem] font-bold uppercase tracking-[0.25em] text-white/45">
                  Coordinators
                </p>
                <div className="mt-2 space-y-1.5">
                  {event.coordinators.map((c) => (
                    <div key={c.name} className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-white">{c.name}</span>
                      <PhoneNumber phone={c.phone} className="text-white/60" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Register */}
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-md bg-sodium-glow px-4 py-3 text-[0.65rem] font-bold uppercase tracking-[0.3em] text-black transition-colors hover:bg-sodium-core"
            >
              Register
            </a>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default EventsSection;
