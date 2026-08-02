import { useEffect, useRef, useState } from "react";

const HOVER_QUERY = "(hover: hover) and (pointer: fine)";

function PhoneIcon({ copied }: { copied: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-[14px] w-[14px] shrink-0 text-sodium-ember transition-colors duration-200 group-hover:text-sodium-glow"
      fill="none"
    >
      {copied ? (
        <path
          d="M3 8.5 6.5 12 13 4.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M4.2 2.2c.3-.3.8-.3 1.1 0l1.5 1.9c.2.3.2.6 0 .9L5.9 6.4c.5 1.1 1.3 2.1 2.2 3 .9.9 1.9 1.7 3 2.2l1.4-1c.3-.2.6-.2.9 0l1.9 1.6c.3.3.3.7 0 1l-1 .9c-.5.5-1.3.7-2 .5-2-.6-3.9-1.8-5.4-3.3-1.5-1.5-2.7-3.4-3.3-5.4-.2-.7 0-1.5.5-2l.9-.9Z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

async function copyText(text: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Non-HTTPS origins and some older browsers reject this — fall through.
    }
  }
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

/**
 * A phone number with a dim-red phone icon that brightens on hover.
 *
 * Desktop (hover + fine pointer): click copies the number, with a brief
 * "Copied" + checkmark confirmation. Touch devices get a plain `tel:` link
 * instead — copy-on-click doesn't make sense where tapping should just dial.
 *
 * Defaults to the touch/`tel:` rendering until the hover-capability check
 * runs client-side, so SSR and first paint never disagree with hydration,
 * and a real touch visitor always gets a working dial link immediately.
 */
export function PhoneNumber({ phone, className = "" }: { phone: string; className?: string }) {
  const [canHover, setCanHover] = useState(false);
  const [copied, setCopied] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mql = window.matchMedia(HOVER_QUERY);
    const update = () => setCanHover(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  // PhoneNumber only ever renders below the hero (contact block + event
  // modals), so it follows the below-the-fold rule: sodium, never red.
  // `py-1.5 -my-1.5` grows the touch target from a 16px line box to ~28px
  // without changing how the row sits in its container — on touch this is a
  // `tel:` link, and a bare text line is well under a comfortable tap size.
  const sharedClasses = `group inline-flex items-center gap-2 py-1.5 -my-1.5 underline decoration-sodium-ember/60 decoration-dotted underline-offset-4 transition-colors duration-200 hover:text-sodium-glow hover:decoration-sodium-glow ${className}`;

  if (!canHover) {
    return (
      <a href={`tel:${phone.replace(/\s/g, "")}`} className={sharedClasses}>
        <PhoneIcon copied={false} />
        {phone}
      </a>
    );
  }

  const handleCopy = async () => {
    const ok = await copyText(phone);
    if (!ok) return;
    setCopied(true);
    setAnnouncement("Phone number copied");
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCopied(false);
      setAnnouncement("");
    }, 1500);
  };

  return (
    <button type="button" onClick={handleCopy} className={`${sharedClasses} cursor-pointer`}>
      <PhoneIcon copied={copied} />
      {copied ? "Copied" : phone}
      <span className="sr-only" role="status" aria-live="polite">
        {announcement}
      </span>
    </button>
  );
}

export default PhoneNumber;
