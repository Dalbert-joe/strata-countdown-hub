import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";

const HOVER_QUERY = "(hover: hover) and (pointer: fine)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

// Fixed distance from the logo to the light source. Only the source's
// bearing (theta) ever changes — its distance never does. That's what keeps
// the beam from collapsing when the cursor is near the logo's center: a
// source pinned to the cursor has no distance left to travel at that point,
// a source pinned to a fixed large radius always does.
const SOURCE_RADIUS = 820;
const EASE_FACTOR = 0.13;

function shortestAngleDelta(target: number, current: number): number {
  return Math.atan2(Math.sin(target - current), Math.cos(target - current));
}

/**
 * Drives the hero's angular spotlight: a searchlight that sits at a fixed
 * radius from the logo and only rotates around it as the cursor moves,
 * rather than following cursor position directly.
 *
 * One rAF loop (started on hover, stopped on leave) and one mousemove
 * listener, per the "shared loop" performance requirement — there's nothing
 * else on this page driving per-frame updates yet, but this is where a
 * future cursor effect would plug into the same loop rather than adding a
 * second one.
 *
 * Only `transform`, `background-image`, and `filter` are written per frame;
 * opacity fades are CSS transitions toggled once on enter/leave, not
 * per-frame writes — the beam's blur must stay static so the browser can
 * rasterize it once and just re-transform the cached result.
 */
export function useHeroSpotlight() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const beamRef = useRef<HTMLDivElement | null>(null);
  const poolRef = useRef<HTMLDivElement | null>(null);
  const litRef = useRef<HTMLDivElement | null>(null);
  const shadowHostRef = useRef<HTMLDivElement | null>(null);

  const currentAngle = useRef(0);
  const targetAngle = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const hoverMql = window.matchMedia(HOVER_QUERY);
    const motionMql = window.matchMedia(REDUCED_MOTION_QUERY);
    const update = () => setEnabled(hoverMql.matches && !motionMql.matches);
    update();
    hoverMql.addEventListener("change", update);
    motionMql.addEventListener("change", update);
    return () => {
      hoverMql.removeEventListener("change", update);
      motionMql.removeEventListener("change", update);
    };
  }, []);

  function angleFromPointer(clientX: number, clientY: number): number | null {
    const targetEl = targetRef.current;
    if (!targetEl) return null;
    const rect = targetEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return Math.atan2(clientY - cy, clientX - cx);
  }

  function applyFrame() {
    const sectionEl = sectionRef.current;
    const targetEl = targetRef.current;
    if (!sectionEl || !targetEl) return;

    // Recomputed every frame (not cached at load) so scroll/resize can't
    // desync the overlay from the logo's actual position.
    const sectionRect = sectionEl.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();
    const centerX = targetRect.left + targetRect.width / 2 - sectionRect.left;
    const centerY = targetRect.top + targetRect.height / 2 - sectionRect.top;

    const theta = currentAngle.current;
    const cosT = Math.cos(theta);
    const sinT = Math.sin(theta);
    const thetaDeg = (theta * 180) / Math.PI;

    const sourceX = centerX + SOURCE_RADIUS * cosT;
    const sourceY = centerY + SOURCE_RADIUS * sinT;

    if (beamRef.current) {
      beamRef.current.style.transform = `translate(${sourceX}px, ${sourceY - 260}px) rotate(${thetaDeg + 180}deg)`;
    }
    if (poolRef.current) {
      const poolX = centerX - 330 + cosT * 105;
      const poolY = centerY - 220 + sinT * 105;
      poolRef.current.style.transform = `translate(${poolX}px, ${poolY}px)`;
    }
    if (litRef.current) {
      const px = 50 + cosT * 46;
      const py = 50 + sinT * 46;
      litRef.current.style.backgroundImage = `radial-gradient(circle at ${px}% ${py}%, rgba(255,244,228,0.98) 0%, rgba(255,186,134,0.66) 26%, rgba(255,124,64,0.12) 54%, rgba(0,0,0,0) 68%)`;
    }
    if (shadowHostRef.current) {
      const sx = cosT * -15;
      const sy = sinT * -15;
      shadowHostRef.current.style.filter = `drop-shadow(${sx}px ${sy}px 14px rgba(0,0,0,0.9))`;
    }
  }

  function loop() {
    const delta = shortestAngleDelta(targetAngle.current, currentAngle.current);
    currentAngle.current += delta * EASE_FACTOR;
    applyFrame();
    rafId.current = requestAnimationFrame(loop);
  }

  function startLoop() {
    if (rafId.current === null) rafId.current = requestAnimationFrame(loop);
  }
  function stopLoop() {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  }

  useEffect(() => stopLoop, []);

  const handlers = enabled
    ? {
        onMouseEnter: (e: ReactMouseEvent) => {
          const angle = angleFromPointer(e.clientX, e.clientY);
          if (angle === null) return;
          // Snap rather than ease from a stale angle, or the beam visibly
          // sweeps in from wherever it was left after the last hover.
          currentAngle.current = angle;
          targetAngle.current = angle;
          applyFrame();
          setActive(true);
          startLoop();
        },
        onMouseMove: (e: ReactMouseEvent) => {
          const angle = angleFromPointer(e.clientX, e.clientY);
          if (angle !== null) targetAngle.current = angle;
        },
        onMouseLeave: () => {
          setActive(false);
          stopLoop();
        },
      }
    : {};

  return { enabled, active, sectionRef, targetRef, beamRef, poolRef, litRef, shadowHostRef, handlers };
}
