/**
 * Themed silhouettes that emanate from a clicked event card, timed to overlap
 * with the modal's own opening animation. Spawns and animates plain DOM nodes
 * directly (Web Animations API) rather than React state — this is a
 * fire-and-forget visual effect with no lasting UI state, so keeping it out
 * of React avoids a render cycle per shape and per frame.
 */

const SHAPE_PATHS = [
  // Bat
  "M12 3c-.8 1.6-2 2.7-3.6 3.3.9.4 1.9.5 2.9.3-1 1.3-2.6 2.1-4.3 2.1.9 1 2.1 1.6 3.4 1.7-1.4.9-3.1 1.3-4.9 1 1.7 1.8 4 2.9 6.5 2.9s4.8-1.1 6.5-2.9c-1.8.3-3.5-.1-4.9-1 1.3-.1 2.5-.7 3.4-1.7-1.7 0-3.3-.8-4.3-2.1 1 .2 2 .1 2.9-.3C14 5.7 12.8 4.6 12 3z",
  // Joker / jester mask
  "M4 14c0-4 1-7 3-9-1 3 1 4 2 2 1-3 2-4 3-4s2 1 3 4c1 2 3 1 2-2 2 2 3 5 3 9-1 3-4 5-8 5s-7-2-8-5zM9 12a1 1 0 100-2 1 1 0 000 2zM15 12a1 1 0 100-2 1 1 0 000 2z",
  // Playing card with a spade pip
  "M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zM12 7c-1.5 2-3.5 3.2-3.5 5a3.5 3.5 0 007 0c0-1.8-2-3-3.5-5zM11 14h2l-.5 3h-1z",
  // Question mark
  "M12 2a10 10 0 100 20 10 10 0 000-20zM9.7 9.2a2.5 2.5 0 014.9.5c0 1.8-2.3 2.1-2.5 3.8M11.9 16.5v1.4",
];

const SHAPE_COUNT = 12;
const DURATION_MS = 700;
const STAGGER_MS = 25;
const MIN_DISTANCE = 140;
const MAX_DISTANCE = 260;
const MAX_ROTATION_DEG = 40;

function buildShape(): SVGSVGElement {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", "22");
  svg.setAttribute("height", "22");
  svg.setAttribute("fill", "currentColor");
  svg.setAttribute("aria-hidden", "true");
  svg.style.position = "absolute";
  svg.style.left = "50%";
  svg.style.top = "50%";
  // Sodium, not red. Below the hero the palette carries no red at all (see the
  // zoning rule in styles.css), and this burst is the one card animation every
  // visitor is guaranteed to see, since it fires on the primary interaction.
  svg.style.color = Math.random() > 0.5 ? "var(--sodium-glow)" : "var(--sodium-ember)";
  svg.style.willChange = "transform, opacity";

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", SHAPE_PATHS[Math.floor(Math.random() * SHAPE_PATHS.length)]);
  svg.appendChild(path);
  return svg;
}

/**
 * Spawns the burst inside `container`, which must be `position: relative`
 * (or similar) and sit behind the card in stacking order — see EventsSection,
 * where the burst layer is a z-0 sibling and the card itself is z-10.
 */
export function spawnCardBurst(container: HTMLElement): void {
  const angleStep = 360 / SHAPE_COUNT;

  for (let i = 0; i < SHAPE_COUNT; i++) {
    const shape = buildShape();
    container.appendChild(shape);

    // Stratified random angle: evenly spaced base angles with jitter, so the
    // burst reads as radiating in all directions without random clumping.
    const angle = angleStep * i + (Math.random() * angleStep - angleStep / 2);
    const rad = (angle * Math.PI) / 180;
    const distance = MIN_DISTANCE + Math.random() * (MAX_DISTANCE - MIN_DISTANCE);
    const dx = Math.cos(rad) * distance;
    const dy = Math.sin(rad) * distance;
    const rotation = (Math.random() * 2 - 1) * MAX_ROTATION_DEG;

    const animation = shape.animate(
      [
        { transform: "translate(-50%, -50%) scale(0) rotate(0deg)", opacity: 1 },
        {
          transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1) rotate(${rotation}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: DURATION_MS,
        delay: i * STAGGER_MS,
        easing: "ease-out",
        fill: "forwards",
      },
    );

    animation.onfinish = () => shape.remove();
    // Belt-and-braces: if onfinish never fires (tab backgrounded mid-animation,
    // etc.), guarantee cleanup so rapid repeated clicks can't accumulate DOM.
    setTimeout(() => shape.remove(), DURATION_MS + i * STAGGER_MS + 200);
  }
}
