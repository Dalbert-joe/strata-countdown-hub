import { SITE, REGISTER_URL } from "../data/site";
import { PhoneNumber } from "./PhoneNumber";

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.venue)}`;

function MapPinIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6 shrink-0 text-sodium-glow"
      fill="none"
    >
      <path
        d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

/**
 * Closing section: identity, when/where, overall coordinators, a location
 * card, and a final register CTA. Per-event coordinators now live on the
 * event cards and their modals instead of a footer grid here.
 */
export function ContactSection() {
  const year = new Date().getFullYear();

  return (
    <section id="contact" className="relative scroll-mt-24 px-6 pb-16 pt-20 md:px-12 md:pt-24">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="text-center">
          <p className="font-batman text-[0.65rem] font-semibold uppercase tracking-[0.5em] text-sodium-glow md:text-xs">
            Get In Touch
          </p>
          <h2 className="font-batman mt-4 text-4xl uppercase tracking-[0.15em] text-white drop-shadow-[0_0_34px_rgba(238,178,44,0.3)] md:text-6xl">
            Contact
          </h2>
        </div>

        <div className="mt-16 grid gap-10 text-center md:grid-cols-3">
          {/* 1. Brand block */}
          <div>
            <p className="font-batman text-lg uppercase tracking-[0.3em] text-sodium-glow">
              {SITE.name}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">{SITE.tagline}</p>
            <p className="mt-2 text-xs leading-relaxed text-white/40">{SITE.department}</p>
          </div>

          {/* 2. When & where */}
          <div>
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.35em] text-white/40">
              When &amp; Where
            </p>
            <div className="mt-4 space-y-1.5 text-sm text-white/70">
              <p>{SITE.date}</p>
              <p>{SITE.venue}</p>
              <p className="text-sodium-glow">{SITE.fee}</p>
            </div>
          </div>

          {/* 3. Overall coordinators */}
          <div>
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.35em] text-white/40">
              Overall Coordinators
            </p>
            <div className="mt-4 space-y-3 text-sm">
              {SITE.contact.coordinators.map((c) => (
                <div key={c.name}>
                  <p className="text-white/80">{c.name}</p>
                  <PhoneNumber phone={c.phone} className="mt-0.5 text-xs text-white/50" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Location box */}
        <div className="mx-auto mt-16 max-w-xl rounded-[20px] border border-sodium-ember/40 bg-white/[0.03] p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <MapPinIcon />
            <div>
              <p className="text-sm font-semibold text-white">{SITE.college}</p>
              <p className="mt-1 text-xs text-white/50">Chennai</p>
            </div>
          </div>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-sodium-glow px-6 py-3 text-[0.65rem] font-bold uppercase tracking-[0.3em] text-sodium-glow transition-colors duration-300 hover:bg-sodium-glow hover:text-black"
          >
            Open in Maps
          </a>
        </div>

        {/* 5. Register CTA */}
        <div className="mt-16 text-center">
          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-sodium-glow px-14 py-5 text-sm font-bold uppercase tracking-[0.35em] text-black transition-all duration-300 hover:bg-sodium-core hover:shadow-[0_0_44px_-8px_rgba(238,178,44,0.75)]"
          >
            Register Now
          </a>
        </div>

        {/* Footer bar — centred rather than spread edge-to-edge: with no
            social links filled in yet (see SITE.socials) a `justify-between`
            row leaves the copyright line stranded on the left with nothing
            to balance it. */}
        <div className="mt-20 flex flex-col items-center gap-4 border-t border-white/10 pt-6 text-center">
          <p className="text-[0.6rem] uppercase tracking-[0.3em] text-white/30">
            © {year} {SITE.name}. All rights reserved.
          </p>

          {(SITE.socials.instagram !== "" || SITE.socials.linkedin !== "") && (
            <div className="flex items-center gap-6">
              {SITE.socials.instagram !== "" && (
                <a
                  href={SITE.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[0.6rem] uppercase tracking-[0.3em] text-white/40 transition-colors hover:text-sodium-glow"
                >
                  Instagram
                </a>
              )}
              {SITE.socials.linkedin !== "" && (
                <a
                  href={SITE.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[0.6rem] uppercase tracking-[0.3em] text-white/40 transition-colors hover:text-sodium-glow"
                >
                  LinkedIn
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
