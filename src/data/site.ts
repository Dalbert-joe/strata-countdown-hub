/**
 * Site-wide identity and contact configuration.
 *
 * Every field below is rendered conditionally: an empty string renders nothing
 * at all rather than a visible placeholder. Fill values in as they are confirmed
 * and the corresponding UI appears on its own.
 */
type SiteConfig = {
  name: string;
  tagline: string;
  date: string;
  /** ISO 8601, timezone-explicit — the countdown target. IST is UTC+05:30. */
  dateISO: string;
  venue: string;
  venueShort: string;
  department: string;
  college: string;
  fee: string;
  contact: {
    email: string;
    coordinators: { name: string; role: string; phone: string }[];
  };
  socials: { instagram: string; linkedin: string };
};

export const SITE: SiteConfig = {
  name: "STRATA '26",
  tagline: "Artificial Intelligence & Data Science Symposium",

  date: "8 August 2026",
  dateISO: "2026-08-08T09:00:00+05:30",
  venue: "Loyola ICAM College of Engineering and Technology, Chennai",
  venueShort: "LICET, Chennai",
  department: "Department of Artificial Intelligence & Data Science",
  college: "Loyola ICAM College of Engineering and Technology",
  fee: "Free for all events, no registration fee",

  contact: {
    email: "",
    coordinators: [
      { name: "Thana Kishore", role: "Overall Coordinator", phone: "+91 93425 03004" },
      { name: "Dalbert Joe", role: "Overall Coordinator", phone: "+91 95666 87085" },
    ],
  },

  socials: {
    instagram: "",
    linkedin: "",
  },
};

/**
 * Single Google Form for all six events. Every register button on the site
 * imports this constant — there is exactly one place to change it later.
 */
export const REGISTER_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdSFCxeP2h-byIiTObXuUTT1BUbP8YmmiiaBLhiNY4YdbEe2Q/viewform?usp=publish-editor";

/**
 * Per-event coordinator phone numbers aren't supplied yet. Every event
 * coordinator uses this single placeholder so all six can be swapped for
 * real numbers in one pass later.
 */
export const PLACEHOLDER_PHONE = "00000 00000";
