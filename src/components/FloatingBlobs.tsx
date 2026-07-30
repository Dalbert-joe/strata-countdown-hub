const BLOBS = [
  {
    className: "left-[-10%] top-[8%] h-[420px] w-[420px] bg-sodium-glow/[0.16]",
    duration: "22s",
    delay: "0s",
  },
  {
    className: "right-[-8%] top-[42%] h-[380px] w-[380px] bg-sodium-deep/[0.14]",
    duration: "26s",
    delay: "-8s",
  },
  {
    className: "left-[18%] bottom-[-6%] h-[340px] w-[340px] bg-sodium-ember/[0.20]",
    duration: "30s",
    delay: "-15s",
  },
];

/**
 * Soft blurred shapes drifting slowly behind the events/contact content —
 * ambient texture in place of anything that reads as UI chrome. Purely
 * decorative and non-interactive; `prefers-reduced-motion` freezes them via
 * the global animation-duration override in styles.css, so there is nothing
 * motion-specific to handle here.
 */
export function FloatingBlobs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {BLOBS.map((blob, i) => (
        <span
          key={i}
          className={`absolute rounded-full blur-[80px] will-change-transform ${blob.className}`}
          style={{ animation: `blobFloat ${blob.duration} ease-in-out infinite`, animationDelay: blob.delay }}
        />
      ))}
      <style>{`
        @keyframes blobFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(4%, -6%) scale(1.08); }
          66% { transform: translate(-3%, 5%) scale(0.95); }
        }
      `}</style>
    </div>
  );
}

export default FloatingBlobs;
