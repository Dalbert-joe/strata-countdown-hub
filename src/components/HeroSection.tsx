import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import logoAsset from "../strata26Logo.png";
import videoAsset from "../herobg.mp4";
import posterAsset from "../Events.jpg";
import introVideoAsset from "../BATMAN_26.mp4";
import { CountdownTimer } from "./CountdownTimer";
import { useHeroSpotlight } from "../hooks/use-hero-spotlight";

// Static per the "the blur must stay static" requirement — only `transform`
// is written per frame (see use-hero-spotlight), so the browser rasterizes
// this once and just re-transforms the cached bitmap.
const BEAM_GRADIENT =
  "radial-gradient(ellipse 118% 62% at 0% 50%, rgba(255,238,212,0.45) 0%, rgba(255,186,130,0.20) 30%, rgba(255,134,74,0.05) 60%, rgba(0,0,0,0) 84%)";
const POOL_GRADIENT =
  "radial-gradient(ellipse at 50% 50%, rgba(255,231,201,0.42) 0%, rgba(255,168,110,0.20) 34%, rgba(255,110,50,0.04) 62%, rgba(0,0,0,0) 78%)";

/**
 * Where the intro is cut, in seconds.
 *
 * BATMAN_26.mp4 is 7.13s long, but the STRATA '26 title lands at 4.50s and
 * holds steady only until 5.40s — after that the shot moves on to material we
 * don't want to show. Measured by sampling frames and tracking how much
 * saturated red is on screen: it sits at ~83 through 5.40s, then falls away
 * (78.7 at 5.45, 57.9 at 5.50, 16.6 by 5.65).
 *
 * At this mark the video is PAUSED rather than left running, so the last
 * thing on screen is the title held still while the overlay fades out — if it
 * kept playing, the 500ms fade would show exactly the tail we're cutting.
 */
const INTRO_CUT_SECONDS = 5.4;

/** How long the held title stays up while the overlay fades. The frame is
 *  frozen for this whole window, so the logo is the last thing on screen
 *  right up to the moment the site appears. */
const INTRO_FADE_MS = 700;

/** How often the cut mark is polled. `timeupdate` only fires ~4x/sec, which
 *  could overshoot into the decay; 40ms lands within a frame of the mark. */
const INTRO_POLL_MS = 40;

/**
 * Full-viewport opening section.
 *
 * The video/overlays are `fixed` rather than `absolute` so they stay put as
 * the background for the whole page, not just this section — the events and
 * contact sections below sit on top of it behind a frosted overlay instead
 * of stopping it dead when this section scrolls out of flow.
 *
 * The video plays on every viewport size, mobile included — there is no
 * static-poster fallback standing in for it below a breakpoint.
 *
 * Because the video and its overlay stack are `fixed`, they never leave the
 * DOM as the page scrolls — without this, a phone would keep decoding video
 * frames and recompositing the blur/gradient layers on top of it for as long
 * as the tab is open, even though the opaque events/contact wrapper is
 * covering all of it the moment the hero scrolls out of view. An
 * IntersectionObserver pauses the video and drops the overlay stack from
 * paint (via `invisible`, not `hidden`, so layout never has to recompute)
 * whenever the hero itself isn't on screen, which is where most of a visit's
 * scroll time is actually spent.
 *
 * Ahead of all of that sits an intro splash (BATMAN_26.mp4). It's rendered
 * as an opaque, full-screen overlay layered on top of everything else in
 * this section rather than gating the section's mount — the hero's own
 * video/logos/spotlight are already mounted and warming up underneath while
 * the intro plays, so there's no extra load-in delay once the intro clears.
 * The intro is cut at INTRO_CUT_SECONDS rather than played out (see that
 * constant for why), fading out from a held frame — or immediately if the
 * user hits Skip. `onEnded` stays wired as a backstop in case the cut is ever
 * moved past the end of the file.
 */
export function HeroSection() {
  const spotlight = useHeroSpotlight();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [heroVisible, setHeroVisible] = useState(true);

  // --- Intro splash state ---
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const [introDone, setIntroDone] = useState(false);
  const [introClosing, setIntroClosing] = useState(false);
  const [introMuted, setIntroMuted] = useState(false);
  // Mirrors introClosing for the poll below, which reads it from inside an
  // interval callback that would otherwise close over a stale value.
  const introClosingRef = useRef(false);

  useEffect(() => {
    const el = spotlight.sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (heroVisible) video.play().catch(() => {});
    else video.pause();
  }, [heroVisible]);

  const finishIntro = () => {
    if (introClosingRef.current) return;
    introClosingRef.current = true;
    // Hold the last frame. The overlay takes 500ms to fade, and the video
    // would otherwise keep rolling straight through it into the tail we're
    // deliberately cutting.
    introVideoRef.current?.pause();
    setIntroClosing(true);
    window.setTimeout(() => setIntroDone(true), INTRO_FADE_MS);
  };

  // Try the intro with sound first. Browsers that block autoplay-with-audio
  // reject the play() promise with NotAllowedError — fall back to muted
  // playback so the intro still runs, with the toggle reflecting that it
  // started silent.
  useEffect(() => {
    const video = introVideoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = 1;

    video.play().catch(() => {
      video.muted = true;
      setIntroMuted(true);
      video.play().catch(() => {});
    });

    // End the intro at the title rather than at the file's own `ended`.
    const id = window.setInterval(() => {
      if (video.currentTime >= INTRO_CUT_SECONDS) finishIntro();
    }, INTRO_POLL_MS);
    return () => window.clearInterval(id);
  }, []);

  const toggleIntroSound = () => {
    const video = introVideoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIntroMuted(nextMuted);
    // Unmuting counts as the user gesture browsers were waiting for, so a
    // playback attempt that was previously rejected can succeed now.
    if (!nextMuted) video.play().catch(() => {});
  };

  return (
    <section
      id="home"
      ref={spotlight.sectionRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black px-6 py-8 md:py-10"
    >
      {/* --- Part A: intro splash overlay --- */}
      {!introDone && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-700 ${
            introClosing ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <video
            ref={introVideoRef}
            className="h-full w-full object-cover"
            src={introVideoAsset}
            onEnded={finishIntro}
            autoPlay
            playsInline
          />

          {/* Always present, rather than only appearing when autoplay-with-
              sound was blocked: it doubles as a mute for people who did get
              audio and don't want it, and it states the current state instead
              of issuing an instruction. */}
          <button
            type="button"
            onClick={toggleIntroSound}
            aria-label={introMuted ? "Turn intro sound on" : "Turn intro sound off"}
            className="absolute bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] left-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white/85 backdrop-blur-sm transition-colors hover:bg-black/60"
          >
            {introMuted ? (
              <VolumeX className="h-4 w-4" aria-hidden />
            ) : (
              <Volume2 className="h-4 w-4" aria-hidden />
            )}
            {introMuted ? "Sound Off" : "Sound On"}
          </button>

          <button
            type="button"
            onClick={finishIntro}
            aria-label="Skip intro"
            className="absolute bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] right-6 rounded-full border border-white/30 bg-black/40 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm transition-colors hover:bg-black/60"
          >
            Skip
          </button>
        </div>
      )}

      {/* --- Part B: the existing hero, unchanged --- */}

      {/* preload="metadata" keeps the file from blocking first paint; the
          poster covers the gap on slow connections. Darkened + desaturated
          so the logo separates from it and the spotlight below has
          somewhere to land — at near-full brightness neither would read. */}
      <video
        ref={videoRef}
        className={`fixed inset-0 z-0 h-screen w-full object-cover ${heroVisible ? "" : "invisible"}`}
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
      {/* Slight blur instead of a dark tint — keeps the video bright and legible-under-text
          without flattening it to black. */}
      <div
        aria-hidden
        className={`fixed inset-0 z-0 backdrop-blur-[2px] ${heroVisible ? "" : "invisible"}`}
      />
      {/* Radial vignette: darkens the edges so the frame doesn't read as a flat rectangle */}
      <div
        aria-hidden
        className={`fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.65)_100%)] ${heroVisible ? "" : "invisible"}`}
      />
      <div
        aria-hidden
        className={`fixed inset-0 z-0 bg-gradient-to-b from-black/25 via-transparent to-black/70 ${heroVisible ? "" : "invisible"}`}
      />

      {/* Institution logos.
          `absolute`, not `fixed`: as fixed elements they were pinned to the
          viewport for the whole session, so they stayed on screen over the
          events and contact sections and poked out from under the nav bar on
          scroll. They belong to the hero, so they scroll away with it.

          Sitting BELOW the nav rather than level with it: the nav's own
          content is capped at max-w-6xl, so at any viewport narrower than
          ~1236px a top-corner logo runs into the nav — the mobile Register
          button and menu toggle on small screens, the desktop links on
          mid-size ones. Clearing the bar vertically is the one placement that
          holds at every width. */}

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

      <h1 className="sr-only">STRATA '26: AI &amp; DS Symposium</h1>

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
        {/* Generous padding: the hover target for the spotlight is the logo
            plus its surrounding space, not the whole hero section. */}
        <div
          ref={spotlight.targetRef}
          {...spotlight.handlers}
          className="relative w-[min(88vw,620px)] p-4 sm:w-[min(74vw,740px)] md:w-[min(54vw,800px)] md:p-6"
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

        <div className="mt-3">
          <CountdownTimer />
        </div>

        {/* Scroll cue — clicking it jumps to the events section */}
        <a
          href="#events"
          aria-label="Jump to events"
          className="group mt-2 flex flex-col items-center gap-2 focus:outline-none"
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
