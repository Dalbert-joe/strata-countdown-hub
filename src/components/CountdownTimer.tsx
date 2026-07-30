import { useEffect, useState } from "react";
import { SITE } from "../data/site";

const TARGET = new Date(SITE.dateISO).getTime();

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

function computeRemaining(): Remaining | null {
  const diff = TARGET - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  };
}

const UNITS: { key: keyof Remaining; label: string }[] = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hrs" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Sec" },
];

/**
 * Countdown row for the hero — digits sit directly on the video with no
 * background card, so it doesn't read as its own separate section.
 *
 * `remaining === undefined` is the SSR-safe placeholder state: the server
 * and the client's first paint both render it identically (real numbers are
 * only ever computed client-side, in the effect below), so there's no
 * hydration mismatch from baking `Date.now()` into render output.
 */
export function CountdownTimer() {
  const [remaining, setRemaining] = useState<Remaining | null | undefined>(undefined);

  useEffect(() => {
    let id: ReturnType<typeof setInterval> | null = null;

    const tick = () => setRemaining(computeRemaining());
    const start = () => {
      tick();
      if (id === null) id = setInterval(tick, 1000);
    };
    const stop = () => {
      if (id !== null) {
        clearInterval(id);
        id = null;
      }
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  if (remaining === null) {
    return (
      <p className="text-sm font-bold uppercase tracking-[0.3em] text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.9)] sm:text-base">
        {SITE.name} · {SITE.date.toUpperCase()}
      </p>
    );
  }

  return (
    <div className="relative">
      {/* Scrim behind the digits only, fading out at both edges — never a hard-edged band */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-1/2 -z-10 w-[140%] -translate-x-1/2 bg-[radial-gradient(ellipse_60%_100%_at_50%_50%,rgba(0,0,0,0.55),transparent_75%)]"
      />

      <div className="grid grid-cols-2 items-end gap-x-6 gap-y-3 px-4 min-[480px]:flex min-[480px]:gap-x-0">
        {UNITS.map((u, i) => {
          const value = remaining ? remaining[u.key] : undefined;
          const display =
            value === undefined ? "--" : u.key === "days" ? String(value) : String(value).padStart(2, "0");
          return (
            <div key={u.key} className="flex items-end">
              <div className="flex flex-col items-center">
                <span
                  className="font-['Anton'] text-[2.75rem] leading-none text-white [font-variant-numeric:tabular-nums] [text-shadow:0_4px_20px_rgba(0,0,0,0.85)] sm:text-6xl md:text-7xl"
                >
                  {display}
                </span>
                <span className="mt-2 text-[0.6rem] font-bold uppercase tracking-[0.35em] text-red-500/80 [text-shadow:0_2px_8px_rgba(0,0,0,0.9)]">
                  {u.label}
                </span>
              </div>
              {i < UNITS.length - 1 && (
                <span
                  aria-hidden
                  className="mx-3 mb-3 hidden h-9 w-px shrink-0 bg-white/20 min-[480px]:block sm:h-12 md:h-14"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CountdownTimer;
