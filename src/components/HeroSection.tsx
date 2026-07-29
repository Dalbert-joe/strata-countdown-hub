import logoAsset from "../strata26Logo.png";
import videoAsset from "../herobg.mp4";
import batAsset from "../button.png";
import posterAsset from "../Events.jpg";

/**
 * Full-viewport opening section. The bat button no longer navigates — it
 * scrolls down to the events section on the same page.
 */
export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black"
    >
      {/* preload="metadata" keeps the 5.3 MB file from blocking first paint;
          the poster covers the gap on slow connections. */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={videoAsset}
        poster={posterAsset}
        preload="metadata"
        aria-hidden
        autoPlay
        loop
        muted
        playsInline
      />
      <div aria-hidden className="absolute inset-0 bg-black/40" />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black"
      />

      <div className="relative z-10 flex flex-col items-center px-6">
        <h1 className="sr-only">STRATA '26 — AI &amp; DS Symposium</h1>
        <img
          src={logoAsset}
          alt="STRATA '26"
          className="w-[min(92vw,860px)] animate-[heroIn_1.1s_ease-out] object-contain drop-shadow-[0_0_60px_rgba(220,38,38,0.45)]"
        />

        {/* Bat-shaped scroll cue */}
        <a
          href="#events"
          aria-label="Jump to events"
          className="group mt-6 focus:outline-none md:mt-10"
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
        </a>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[0.55rem] font-semibold uppercase tracking-[0.4em] text-white/40">
          Scroll
        </span>
        <span className="h-10 w-px animate-[scrollCue_2s_ease-in-out_infinite] bg-gradient-to-b from-red-600 to-transparent" />
      </div>

      <style>{`
        @keyframes heroIn { from { opacity: 0; transform: scale(0.94); filter: blur(6px); } to { opacity: 1; transform: scale(1); filter: blur(0); } }
        @keyframes scrollCue { 0%, 100% { opacity: 0.3; transform: scaleY(0.6); transform-origin: top; } 50% { opacity: 1; transform: scaleY(1); transform-origin: top; } }
      `}</style>
    </section>
  );
}

export default HeroSection;
