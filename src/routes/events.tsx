import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * The site is now a single scrolling page, so /events is no longer its own
 * page. This redirect is kept so any link already shared out (posters, bios,
 * WhatsApp forwards) still lands on the events section instead of a 404.
 */
export const Route = createFileRoute("/events")({
  beforeLoad: () => {
    throw redirect({ to: "/", hash: "events" });
  },
});
