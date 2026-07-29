/**
 * Site-wide identity and contact configuration.
 *
 * Every field below is rendered conditionally: an empty string renders nothing
 * at all rather than a visible placeholder. Fill values in as they are confirmed
 * and the corresponding UI appears on its own.
 *
 * Nothing here is invented — blanks mean "not yet supplied".
 */
type SiteConfig = {
  name: string;
  tagline: string;
  date: string;
  venue: string;
  department: string;
  college: string;
  registrationUrl: string;
  contact: {
    email: string;
    coordinators: { name: string; role: string; phone: string }[];
  };
  socials: { instagram: string; linkedin: string };
};

// Explicitly typed rather than `as const`: literal types would make every
// `SITE.x !== ""` emptiness check a TS error on the fields that are filled in.
export const SITE: SiteConfig = {
  name: "STRATA '26",
  tagline: "Artificial Intelligence & Data Science Symposium",

  /** e.g. "8 August 2026". Metadata currently claims this date but it is UNCONFIRMED. */
  date: "",
  /** e.g. "Main Auditorium" */
  venue: "",
  /** e.g. "Department of Artificial Intelligence and Data Science" */
  department: "Department of Artificial Intelligence & Data Science",
  /** College / institution name. */
  college: "",

  /** Fill this to activate every "Register" call to action across the site. */
  registrationUrl: "",

  contact: {
    email: "",
    /** [{ name: "...", role: "Student Coordinator", phone: "+91..." }] */
    coordinators: [],
  },

  socials: {
    instagram: "",
    linkedin: "",
  },
};

/** True when there is at least one real contact detail worth rendering. */
export const hasContactInfo = SITE.contact.email !== "" || SITE.contact.coordinators.length > 0;
