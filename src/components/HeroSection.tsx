import { useEffect, useState } from "react";
import logoAsset from "../strata26Logo.png";
import videoAsset from "../herobg.mp4";
import posterAsset from "../Events.jpg";
import { CountdownTimer } from "./CountdownTimer";
import { useHeroSpotlight } from "../hooks/use-hero-spotlight";

const DESKTOP_QUERY = "(min-width: 768px)";

// Static per the "the blur must stay static" requirement — only `transform`
// is written per frame (see use-hero-spotlight), so the browser rasterizes
// this once and just re-transforms the cached bitmap.
const BEAM_GRADIENT =
  "radial-gradient(ellipse 118% 62% at 0% 50%, rgba(255,238,212,0.45) 0%, rgba(255,186,130,0.20) 30%, rgba(255,134,74,0.05) 60%, rgba(0,0,0,0) 84%)";
const POOL_GRADIENT =
  "radial-gradient(ellipse at 50% 50%, rgba(255,231,201,0.42) 0%, rgba(255,168,110,0.20) 34%, rgba(255,110,50,0.04) 62%, rgba(0,0,0,0) 78%)";

/**
 * Full-viewport opening section.
 *
 * The video/overlays are `fixed` rather than `absolute` so they stay put as
 * the background for the whole page, not just this section — the events and
 * contact sections below sit on top of it behind a frosted overlay instead
 * of stopping it dead when this section scrolls out of flow.
 *
 * Below 768px the `<video>` element is never mounted — only the poster image
 * is. Starting from `isDesktop = false` (rather than defaulting to "assume
 * desktop") means a real mobile visitor never triggers the video request,
 * even for a single frame: the safe default is "no video" until a resize
 * check proves otherwise.
 */
export function HeroSection() {
  const [isDesktop, setIsDesktop] = useState(false);
  const spotlight = useHeroSpotlight();

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return (
    <section
      id="home"
      ref={spotlight.sectionRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black px-6 py-20 md:py-24"
    >
      {isDesktop ? (
        // preload="metadata" keeps the file from blocking first paint; the
        // poster covers the gap on slow connections. Darkened + desaturated
        // so the logo separates from it and the spotlight below has
        // somewhere to land — at near-full brightness neither would read.
        <video
          className="fixed inset-0 z-0 h-screen w-full object-cover"
          style={{ filter: "brightness(0.45) saturate(0.9)" }}
          src={videoAsset}
          poster={posterAsset}
          preload="metadata"
          aria-hidden
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <img
          src={posterAsset}
          alt=""
          aria-hidden
          className="fixed inset-0 z-0 h-screen w-full object-cover"
        />
      )}
      {/* Slight blur instead of a dark tint — keeps the video bright and legible-under-text
          without flattening it to black. */}
      <div aria-hidden className="fixed inset-0 z-0 backdrop-blur-[2px]" />
      {/* Radial vignette: darkens the edges so the frame doesn't read as a flat rectangle */}
      <div
        aria-hidden
        className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.65)_100%)]"
      />
      <div
        aria-hidden
        className="fixed inset-0 z-0 bg-gradient-to-b from-black/25 via-transparent to-black/70"
      />

      {/* Spotlight beam + background pool — behind the logo (z-5), clipped to the hero */}
      {spotlight.enabled && (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
          <div
            ref={spotlight.beamRef}
            className="absolute left-0 top-0 h-[520px] w-[960px] origin-[0%_50%] blur-[14px] transition-opacity duration-300 mix-blend-screen will-change-transform"
            style={{ opacity: spotlight.active ? 1 : 0, background: BEAM_GRADIENT }}
          />
          <div
            ref={spotlight.poolRef}
            className="absolute left-0 top-0 h-[440px] w-[660px] transition-opacity duration-300 mix-blend-screen will-change-transform"
            style={{ opacity: spotlight.active ? 1 : 0, background: POOL_GRADIENT }}
          />
        </div>
      )}

      <h1 className="sr-only">STRATA '26 — AI &amp; DS Symposium</h1>

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
        {/* Generous padding: the hover target for the spotlight is the logo
            plus its surrounding space, not the whole hero section. */}
        <div
          ref={spotlight.targetRef}
          {...spotlight.handlers}
          className="relative w-[min(84vw,400px)] p-14 sm:w-[min(64vw,480px)] md:w-[min(40vw,520px)] md:p-20"
        >
          <div ref={spotlight.shadowHostRef}>
            <img
              src={logoAsset}
              alt="STRATA '26"
              className={`w-full animate-[heroIn_1.1s_ease-out] object-contain drop-shadow-[0_0_60px_rgba(220,38,38,0.45)] ${
                spotlight.enabled ? "brightness-[0.75]" : ""
              }`}
            />
            {/* Lit layer: a second copy masked to the logo's own shape, carrying the moving hotspot */}
            {spotlight.enabled && (
              <div
                ref={spotlight.litRef}
                aria-hidden
                className="pointer-events-none absolute inset-0 transition-opacity duration-300 mix-blend-screen"
                style={{
                  opacity: spotlight.active ? 1 : 0,
                  WebkitMaskImage: `url(${logoAsset})`,
                  maskImage: `url(${logoAsset})`,
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                }}
              />
            )}
          </div>
        </div>

        <div className="mt-8">
          <CountdownTimer />
        </div>

        {/* Scroll cue — clicking it jumps to the events section */}
        <a
          href="#events"
          aria-label="Jump to events"
          className="group mt-6 flex flex-col items-center gap-2 focus:outline-none"
        >
          <span className="text-[0.55rem] font-semibold uppercase tracking-[0.4em] text-white/40 transition-colors duration-300 group-hover:text-white/70">
            Scroll
          </span>
          <span className="h-10 w-px animate-[scrollCue_2s_ease-in-out_infinite] bg-gradient-to-b from-red-600 to-transparent" />
        </a>
      </div>

      <style>{`
        @keyframes heroIn { from { opacity: 0; transform: scale(0.94); filter: blur(6px); } to { opacity: 1; transform: scale(1); filter: blur(0); } }
        @keyframes scrollCue { 0%, 100% { opacity: 0.3; transform: scaleY(0.6); transform-origin: top; } 50% { opacity: 1; transform: scaleY(1); transform-origin: top; } }
      `}</style>
    </section>
  );
}

export default HeroSection;
