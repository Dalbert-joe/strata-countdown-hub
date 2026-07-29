import { SITE, hasContactInfo } from "../data/site";

/**
 * Closing section of the single-page site.
 *
 * Everything optional is driven by `src/data/site.ts` — unset fields render
 * nothing rather than showing a placeholder, so the section stays honest while
 * details are still being collected. Once contact info is filled in, the
 * "details coming soon" note disappears on its own.
 */
export function ContactSection() {
  const year = new Date().getFullYear();
  const hasWhen = SITE.date !== "" || SITE.venue !== "";

  return (
    <section id="contact" className="relative scroll-mt-24 px-6 pb-16 pt-24 md:px-12 md:pt-32">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="text-center">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.5em] text-red-600 md:text-xs">
            Get In Touch
          </p>
          <h2 className="mt-4 text-4xl font-black uppercase tracking-[0.15em] text-white drop-shadow-[0_0_30px_rgba(220,38,38,0.4)] md:text-6xl">
            Contact
          </h2>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {/* Identity */}
          <div>
            <p className="text-lg font-black uppercase tracking-[0.3em] text-red-600">
              {SITE.name}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">{SITE.tagline}</p>
            {SITE.department !== "" && (
              <p className="mt-2 text-xs leading-relaxed text-white/40">
                {SITE.department}
                {SITE.college !== "" && <>, {SITE.college}</>}
              </p>
            )}
          </div>

          {/* When & where */}
          {hasWhen && (
            <div>
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.35em] text-white/40">
                When &amp; Where
              </p>
              <div className="mt-4 space-y-1.5 text-sm text-white/70">
                {SITE.date !== "" && <p>{SITE.date}</p>}
                {SITE.venue !== "" && <p>{SITE.venue}</p>}
              </div>
            </div>
          )}

          {/* Reach us */}
          {hasContactInfo ? (
            <div>
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.35em] text-white/40">
                Reach Us
              </p>
              <div className="mt-4 space-y-3 text-sm">
                {SITE.contact.email !== "" && (
                  <a
                    href={`mailto:${SITE.contact.email}`}
                    className="block text-white/70 transition-colors hover:text-red-500"
                  >
                    {SITE.contact.email}
                  </a>
                )}
                {SITE.contact.coordinators.map((c) => (
                  <div key={c.name}>
                    <p className="text-white/70">{c.name}</p>
                    <p className="text-xs text-white/40">{c.role}</p>
                    {c.phone !== "" && (
                      <a
                        href={`tel:${c.phone.replace(/\s/g, "")}`}
                        className="text-xs text-white/50 transition-colors hover:text-red-500"
                      >
                        {c.phone}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.35em] text-white/40">
                Reach Us
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/50">
                Coordinator details will be announced shortly.
              </p>
            </div>
          )}
        </div>

        {/* Register CTA — appears the moment registrationUrl is filled in */}
        {SITE.registrationUrl !== "" && (
          <div className="mt-16 text-center">
            <a
              href={SITE.registrationUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-red-600 px-10 py-4 text-[0.7rem] font-bold uppercase tracking-[0.35em] text-white transition-all duration-300 hover:bg-red-500 hover:shadow-[0_0_40px_-8px_rgba(220,38,38,0.8)]"
            >
              Register Now
            </a>
          </div>
        )}

        {/* Footer bar */}
        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-[0.6rem] uppercase tracking-[0.3em] text-white/30">
            © {year} {SITE.name}
          </p>

          {(SITE.socials.instagram !== "" || SITE.socials.linkedin !== "") && (
            <div className="flex items-center gap-6">
              {SITE.socials.instagram !== "" && (
                <a
                  href={SITE.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[0.6rem] uppercase tracking-[0.3em] text-white/40 transition-colors hover:text-red-500"
                >
                  Instagram
                </a>
              )}
              {SITE.socials.linkedin !== "" && (
                <a
                  href={SITE.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[0.6rem] uppercase tracking-[0.3em] text-white/40 transition-colors hover:text-red-500"
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
