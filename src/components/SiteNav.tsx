import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logoAsset from "../strata26Logo.png";
import { REGISTER_URL } from "../data/site";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "events", label: "Events" },
  { id: "contact", label: "Contact" },
];

/**
 * Fixed single-page nav.
 *
 * Transparent while sitting over the hero video, then picks up a blurred bar
 * once the page scrolls past ~80px so the links stay legible over the event
 * grid.
 *
 * Active section is derived from scroll position rather than an
 * IntersectionObserver: with a reference line the logic is easy to reason
 * about, and it handles the bottom-of-page case where a short final section
 * can never cover enough of the viewport to "win" an observer threshold.
 */
export function SiteNav() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 80);

      // Once the page is scrolled to the bottom the last section is active,
      // even if it is too short to reach the reference line.
      const atBottom = window.innerHeight + y >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActive(SECTIONS[SECTIONS.length - 1].id);
        return;
      }

      // Reference line sits 40% down the viewport: the last section whose top
      // has passed it is the one being read.
      //
      // Uses getBoundingClientRect + scrollY rather than offsetTop: the events
      // and contact sections live inside a `relative` wrapper, so offsetTop
      // would be measured from that wrapper instead of the document and both
      // would report 0.
      const line = window.innerHeight * 0.4;
      let current = SECTIONS[0].id;
      for (const { id } of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };

    // rAF-throttled so a fast scroll doesn't run the math every event.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Lock body scroll while the full-screen mobile menu is open; Escape closes it.
  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const registerLinkProps = {
    href: REGISTER_URL,
    target: "_blank",
    rel: "noopener noreferrer",
  } as const;

  // Zone rule (see the Gotham palette block in styles.css): the hero keeps its
  // red wash, everything past it is sodium gold. The nav is the one element
  // that crosses that boundary, because it is fixed. It used to re-colour at
  // the same 80px threshold that raises the scrolled bar, but that fired the
  // instant you nudged the page — before the hero had actually given way to
  // anything gold behind the nav. Gating on `active` instead means the swap
  // only happens once the events section (or beyond) has actually scrolled
  // into place, so the nav's colour always matches what's really behind it.
  const inGoldZone = active !== "home";
  const accentText = inGoldZone ? "text-sodium-glow" : "text-red-500";
  const accentHover = inGoldZone ? "hover:text-sodium-glow" : "hover:text-red-500";
  const accentUnderline = inGoldZone ? "bg-sodium-glow" : "bg-red-600";
  const accentRing = inGoldZone ? "focus-visible:ring-sodium-glow" : "focus-visible:ring-red-600";
  const ctaClasses = inGoldZone
    ? "bg-sodium-glow text-black shadow-[0_0_20px_-6px_rgba(238,178,44,0.8)] hover:bg-sodium-core"
    : "bg-red-600 text-white shadow-[0_0_20px_-6px_rgba(220,38,38,0.8)] hover:bg-red-500";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-sodium-ember/40 bg-[rgba(4,4,6,0.9)] py-3 backdrop-blur-[12px]"
            : "border-b border-transparent bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 md:px-12">
          <a
            href="#home"
            aria-label="STRATA '26 home"
            className={`transition-opacity duration-300 ${
              scrolled ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <img src={logoAsset} alt="STRATA '26" className="h-8 w-auto object-contain md:h-9" />
          </a>

          {/* Desktop links */}
          <nav className="ml-auto hidden items-center gap-6 md:flex md:gap-10">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-current={active === s.id ? "true" : undefined}
                className={`relative text-xs font-semibold uppercase tracking-[0.25em] transition-colors duration-300 md:text-sm ${accentHover} ${
                  active === s.id ? accentText : "text-white/70"
                }`}
              >
                {s.label}
                <span
                  aria-hidden
                  className={`absolute -bottom-1.5 left-0 h-px transition-all duration-300 ${accentUnderline} ${
                    active === s.id ? "w-full" : "w-0"
                  }`}
                />
              </a>
            ))}
            <a
              {...registerLinkProps}
              className={`rounded-md px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] transition-colors duration-300 md:text-sm ${ctaClasses}`}
            >
              Register
            </a>
          </nav>

          {/* Mobile: register stays visible in the collapsed bar, not hidden inside the menu.
              The nav register button is the only above-the-fold CTA now that the hero's own
              register button is gone, so it stays solid rather than outlined. */}
          <div className="ml-auto flex items-center gap-3 md:hidden">
            <a
              {...registerLinkProps}
              className={`rounded-md px-3.5 py-2.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${ctaClasses}`}
            >
              Register
            </a>
            {/* -m-2 p-2 keeps the icon the same size on screen while growing
                the hit area to 40px — a bare 24px icon is well under the
                ~44px minimum comfortable touch target. */}
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className={`-m-2 rounded-sm p-2 text-white/80 transition-colors focus-visible:outline-none focus-visible:ring-2 ${accentHover} ${accentRing}`}
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen overlay menu */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 bg-[rgba(4,4,6,0.98)] backdrop-blur-md md:hidden"
        >
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setMenuOpen(false)}
              className={`text-2xl font-bold uppercase tracking-[0.3em] transition-colors ${
                active === s.id ? accentText : "text-white/80"
              }`}
            >
              {s.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}

export default SiteNav;
