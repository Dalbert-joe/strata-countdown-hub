import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "events", label: "Events" },
  { id: "contact", label: "Contact" },
];

/**
 * Fixed single-page nav.
 *
 * Transparent while sitting over the hero video, then picks up a blurred bar
 * once the page scrolls so the links stay legible over the event grid.
 *
 * Active section is derived from scroll position rather than an
 * IntersectionObserver: with a reference line the logic is easy to reason
 * about, and it handles the bottom-of-page case where a short final section
 * can never cover enough of the viewport to "win" an observer threshold.
 */
export function SiteNav() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 40);

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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-black/70 py-4 backdrop-blur-md"
          : "border-b border-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 md:px-12">
        <a
          href="#home"
          className={`text-xs font-extrabold uppercase tracking-[0.4em] transition-all duration-500 hover:text-red-400 md:text-sm ${
            scrolled ? "text-red-600 opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          Strata '26
        </a>

        <nav className="ml-auto flex items-center gap-6 md:gap-10">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={active === s.id ? "true" : undefined}
              className={`relative text-xs font-semibold uppercase tracking-[0.25em] transition-colors duration-300 hover:text-red-500 md:text-sm ${
                active === s.id ? "text-red-500" : "text-white/70"
              }`}
            >
              {s.label}
              <span
                aria-hidden
                className={`absolute -bottom-1.5 left-0 h-px bg-red-600 transition-all duration-300 ${
                  active === s.id ? "w-full" : "w-0"
                }`}
              />
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default SiteNav;
