import { useEffect, useRef, useState } from "react";

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
 * the global animation-duration override in styles.css.
 *
 * The blur filter is one of the pricier things a phone GPU can be asked to
 * recomposite every frame, and this section is mounted (and animating) for
 * the entire life of the page — including the whole time a visitor is still
 * looking at the hero, well above these blobs. An IntersectionObserver pauses
 * the animation whenever the container is off screen, so the cost is only
 * ever paid while it's actually visible.
 */
export function FloatingBlobs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "200px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {BLOBS.map((blob, i) => (
        <span
          key={i}
          className={`absolute rounded-full blur-[80px] will-change-transform ${blob.className}`}
          style={{
            animation: `blobFloat ${blob.duration} ease-in-out infinite`,
            animationDelay: blob.delay,
            animationPlayState: visible ? "running" : "paused",
          }}
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
