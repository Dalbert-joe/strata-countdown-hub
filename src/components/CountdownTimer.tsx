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
 * Countdown row for the hero, styled as a Batcomputer-style digital clock
 * panel: a bevelled dark housing and LCD-style digit cells with a red
 * backlight glow — rather than bare digits floating on the video.
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
    <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-neutral-900/90 to-black/95 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_25px_60px_-15px_rgba(0,0,0,0.85)] backdrop-blur-sm sm:px-8 sm:py-5">
      {/* Red backlight pooling behind the digits, like an LED panel lit from within */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-4 rounded-xl bg-[radial-gradient(ellipse_80%_65%_at_50%_40%,rgba(220,38,38,0.12),transparent_72%)]"
      />

      <div className="relative flex items-center justify-center">
        {UNITS.map((u, i) => {
          const value = remaining ? remaining[u.key] : undefined;
          const display =
            value === undefined ? "--" : u.key === "days" ? String(value) : String(value).padStart(2, "0");
          return (
            <div key={u.key} className="flex items-center">
              <div className="flex w-14 flex-col items-center overflow-hidden rounded-lg bg-black/50 py-2 ring-1 ring-white/5 sm:w-20 sm:py-2.5 md:w-24">
                <span className="font-['Orbitron'] text-3xl font-bold leading-none text-red-500 [font-variant-numeric:tabular-nums] [text-shadow:0_0_8px_rgba(239,68,68,0.85),0_0_22px_rgba(220,38,38,0.55),0_2px_10px_rgba(0,0,0,0.9)] sm:text-5xl md:text-6xl">
                  {display}
                </span>
                <span className="mt-2 text-[0.55rem] font-bold uppercase tracking-[0.3em] text-red-500/70 sm:mt-2.5">
                  {u.label}
                </span>
              </div>
              {/* Mirrors the digit cell's own digit/label rhythm (with an
                  invisible label) so the colon centres on the digits alone
                  instead of on the digit+label block beneath it. */}
              {i < UNITS.length - 1 && (
                <div aria-hidden className="flex flex-col items-center px-0.5 sm:px-1.5">
                  <span className="clock-colon font-['Orbitron'] text-2xl font-bold leading-none text-red-600/70 sm:text-4xl md:text-5xl">
                    :
                  </span>
                  <span className="mt-2 text-[0.55rem] opacity-0 sm:mt-2.5">0</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes clockBlink { 0%, 45% { opacity: 1; } 50%, 95% { opacity: 0.15; } 100% { opacity: 1; } }
        .clock-colon { animation: clockBlink 1s steps(1, end) infinite; }
      `}</style>
    </div>
  );
}

export default CountdownTimer;
