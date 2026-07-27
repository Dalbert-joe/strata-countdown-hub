import batAsset from "../BAT.jpg";

/**
 * Full-screen loading indicator: your bat image, centered on a black
 * background, gently pulsing to signal activity.
 *
 * Usage: drop <LoadingScreen /> in as a route's pendingComponent, or
 * render it directly while some async data/resource is loading.
 */
export function LoadingScreen() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      role="status"
      aria-label="Loading"
    >
      <img
        src={batAsset}
        alt=""
        aria-hidden
        className="bat-pulse h-20 w-auto md:h-28"
      />

      <style>{`
        .bat-pulse {
          filter: drop-shadow(0 0 18px rgba(220, 38, 38, 0.65));
          animation: batPulse 1.6s ease-in-out infinite;
        }
        @keyframes batPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

export default LoadingScreen;  
