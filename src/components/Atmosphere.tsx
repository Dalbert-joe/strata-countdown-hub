/**
 * Film grain + night haze, laid over the entire page.
 *
 * Why this exists: a page made of flat #000 reads as "dark mode", not as a
 * place. Real Gotham imagery always carries grain, fog and light falloff, and
 * that texture is what separates "cinematic dark" from "digital dark".
 *
 * Sits above all content (z-60, above the z-50 nav and dialogs) because grain
 * belongs to the whole frame, not to individual elements — the same reason film
 * grain is on the negative rather than on the actors. `pointer-events-none`
 * means it can never intercept a click despite covering everything.
 *
 * The noise is an inline SVG feTurbulence data URI rather than an image asset:
 * no network request, no file to keep track of, and it resolves at any viewport
 * size. It is fully static, so there is nothing here to disable for
 * prefers-reduced-motion.
 */

const GRAIN_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function Atmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60]">
      {/* Cool night air pooling at the top — lifts flat black just enough to
          read as atmosphere with distance in it, rather than as empty space. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_130%_75%_at_50%_0%,rgba(56,78,110,0.11),transparent_62%)]" />

      {/* Low fog rolling up from the bottom of the frame. */}
      <div className="absolute inset-x-0 bottom-0 h-[45vh] bg-[linear-gradient(to_top,rgba(42,58,84,0.17),transparent)]" />

      {/* The grain itself. mix-blend-overlay lets it bite into both the dark
          areas and the lit ones instead of just greying everything out. */}
      <div
        className="absolute inset-0 opacity-[0.055] mix-blend-overlay"
        style={{ backgroundImage: GRAIN_URI, backgroundRepeat: "repeat" }}
      />
    </div>
  );
}

export default Atmosphere;
