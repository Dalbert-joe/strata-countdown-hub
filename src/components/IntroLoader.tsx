import { useEffect, useRef, useState } from "react";
import introVideoAsset from "../BATMAN_26.mp4";

/**
 * Full-screen intro splash. Plays BATMAN_26.mp4 with audio if the browser
 * allows it (most browsers block autoplay-with-sound until the user has
 * interacted with the page at least once — there's no way around that from
 * script alone), and reveals the rest of the site the moment the video ends.
 *
 * A Skip button (bottom-right) lets the user bypass it early. Fades out
 * over ~500ms rather than cutting hard so the handoff into the Hero's own
 * video feels continuous instead of jarring.
 */
export function IntroLoader({ onFinish }: { onFinish: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [closing, setClosing] = useState(false);
  const [needsSoundTap, setNeedsSoundTap] = useState(false);

  // Attempt autoplay with sound on mount. If the browser rejects it
  // (NotAllowedError), fall back to muted playback and show a subtle
  // "tap for sound" affordance instead of failing silently forever.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = 1;

    video.play().catch(() => {
      video.muted = true;
      setNeedsSoundTap(true);
      video.play().catch(() => {});
    });
  }, []);

  const finish = () => {
    if (closing) return;
    setClosing(true);
    // Let the fade-out transition play before unmounting.
    window.setTimeout(onFinish, 500);
  };

  const enableSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.play().catch(() => {});
    setNeedsSoundTap(false);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-500 ${
        closing ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={introVideoAsset}
        onEnded={finish}
        autoPlay
        playsInline
        // Deliberately no `muted` attribute here — muting is only applied
        // imperatively in the effect above, after an autoplay-with-sound
        // attempt fails, so unmuted playback is always tried first.
      />

      {needsSoundTap && (
        <button
          type="button"
          onClick={enableSound}
          className="absolute bottom-6 left-6 rounded-full border border-white/30 bg-black/40 px-4 py-2 text-xs font-medium uppercase tracking-wider text-white/80 backdrop-blur-sm transition-colors hover:bg-black/60"
        >
          Tap for sound
        </button>
      )}

      <button
        type="button"
        onClick={finish}
        aria-label="Skip intro"
        className="absolute bottom-6 right-6 rounded-full border border-white/30 bg-black/40 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm transition-colors hover:bg-black/60"
      >
        Skip
      </button>
    </div>
  );
}

export default IntroLoader;
