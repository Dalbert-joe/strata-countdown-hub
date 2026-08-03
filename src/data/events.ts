import wayneTech from "../waynetech.jpg";
import whySoSerious from "../WhySoSerious.jpg";
import rogueAi from "../rogueai.jpeg";
import gothamTimes from "../gothamtimes.jpeg";
import batmanRobin from "../BatmanRobin.jpg";
import riddlersEscape from "../Riddler.jpg";

/**
 * The STRATA '26 event lineup.
 *
 * This mirrors `context/events.md` — edit both together.
 *
 * `slug` is already unique and URL-safe, so moving from the current detail
 * dialog to real `/events/$slug` routes needs no data changes.
 */
export type StrataEvent = {
  slug: string;
  title: string;
  tag: string;
  /** e.g. "Solo Database Challenge" */
  category: string;
  /** e.g. "Individual", "2 Members", "3-4 Members" */
  participation: string;
  poster: string;
  /**
   * How the poster fills the card's 3:4 frame. Defaults to "cover", which
   * crops to fill. Use "contain" for artwork that must not be cropped — a wide
   * logo lockup in a portrait frame loses everything but its centre otherwise.
   */
  posterFit?: "cover" | "contain";
  /** `object-position` for "cover" posters whose subject isn't centred. */
  posterPosition?: string;
  /** One-liner for the card. Keep to ~2 lines at card width. */
  summary: string;
  /** Full rules, one string per paragraph. Shown in the detail view. */
  description: string[];
  /** Format facts rendered as a small key/value table. */
  highlights: { label: string; value: string }[];
  /** Student coordinators for this event. Empty array renders as "To be announced". */
  coordinators: { name: string; phone: string }[];
};

export const EVENTS: StrataEvent[] = [
  {
    slug: "waynetech-research-summit",
    title: "WayneTech Research Summit",
    tag: "Event 01",
    category: "Technical Paper Presentation",
    participation: "1-3 Members",
    poster: wayneTech,
    summary:
      "Submit your research paper ahead of the event, then defend it before a panel of department faculty.",
    description: [
      "WayneTech Research Summit is a technical paper presentation event where participants are required to submit their research paper prior to the competition (preferably one day before the event) for preliminary review.",
      "On the event day, participants present their research work before a panel of faculty members from the department. Each participant is allotted 5 minutes for the presentation, followed by a 2-minute viva and question-and-answer session.",
      "Evaluation is based on the quality of research, technical content, presentation skills, innovation, and the ability to answer questions effectively.",
      "LICET students can also participate in this event.",
      "Plagiarism or AI-generated content without proper understanding may lead to disqualification. Judges' decision will be final.",
    ],
    highlights: [
      { label: "Participation", value: "1-3 members" },
      { label: "Presentation", value: "5 minutes" },
      { label: "Viva / Q&A", value: "2 minutes" },
      { label: "Submission", value: "Paper due one day prior" },
      { label: "Timing", value: "9:30 AM – 11:00 AM" },
      { label: "Reporting", value: "15 minutes before the event" },
    ],
    coordinators: [
      { name: "Asmita", phone: "+91 63741 52260" },
      { name: "Bharath", phone: "+91 93902 05235" },
    ],
  },
  {
    slug: "why-so-serious",
    title: "Why So Serious?",
    tag: "Event 02",
    category: "Solo Technical Coding Challenge",
    participation: "Individual",
    poster: whySoSerious,
    summary:
      "Solve programming challenges to deal damage to the Joker, while he throws random hazards at your run.",
    description: [
      "Why So Serious? is an interactive coding competition where participants solve a series of programming challenges to inflict damage on the Joker.",
      "Throughout the competition, the Joker introduces random hazards that temporarily disrupt participants' progress. These may include temporary system freezes, reductions to a participant's solved problem count, or other distractions designed to simulate real-world pressure.",
      "The participant who successfully solves all coding challenges and defeats the Joker first is declared the winner. If no participant completes all challenges within the allotted time, the participant with the highest accumulated damage, based on solved problems, is declared the winner.",
    ],
    highlights: [
      { label: "Participation", value: "Individual" },
      { label: "Scoring", value: "Damage per solved problem" },
      { label: "Twist", value: "Random Joker hazards" },
      { label: "Win condition", value: "First to clear, else highest damage" },
      { label: "Timing", value: "11:00 AM – 12:30 PM" },
      { label: "Reporting", value: "10 minutes before the event" },
    ],
    coordinators: [
      { name: "Uwais", phone: "+91 95145 91215" },
      { name: "Preetha", phone: "+91 72009 98714" },
    ],
  },
  {
    slug: "rogue-ai",
    title: "Rogue AI",
    tag: "Event 03",
    category: "Team AI Development Challenge",
    participation: "3-4 Members",
    poster: rogueAi,
    summary:
      "Build an intelligent chatbot under randomly assigned constraints handed to you by rival teams.",
    description: [
      "Rogue AI is a competitive AI chatbot development event where each team, consisting of 3 to 4 members, must design and build an intelligent chatbot within the given time.",
      "Unlike conventional hackathons, every team randomly assigns another participating team a unique challenge or constraint through a randomized selection process. These constraints act as disadvantages that teams must overcome while continuing to improve their chatbot.",
      "Since challenges are assigned randomly, some teams may receive multiple constraints while others receive few or none. Success depends on a team's technical expertise, adaptability, and ability to deliver a robust chatbot despite unpredictable conditions.",
    ],
    highlights: [
      { label: "Team size", value: "3-4 members" },
      { label: "Build", value: "AI chatbot" },
      { label: "Twist", value: "Peer-assigned constraints" },
      { label: "Judged on", value: "Robustness and adaptability" },
    ],
    coordinators: [
      { name: "Sri Lekha", phone: "+91 99404 98266" },
      { name: "Nandhini", phone: "+91 88259 06825" },
    ],
  },
  {
    slug: "the-gotham-times",
    title: "The Gotham Times",
    tag: "Event 04",
    category: "Team AI Video Generation",
    participation: "2 Members",
    poster: gothamTimes,
    // Newspaper is more portrait than the 3:4 card frame — cover would
    // crop both masthead and footer. Contain shows the full front page
    // with dark gutters on the sides, which suits the noir aesthetic.
    posterFit: "contain",
    summary:
      "Turn a fictional Gotham news scenario into a short cinematic news video using Google Flow.",
    description: [
      "The Gotham Times is a two-member AI video generation competition inspired by Gotham City from the DC Universe.",
      "Each team receives a fictional news scenario and must create a short cinematic news video using Google Flow. Participants may generate multiple video clips and combine them through editing to improve storytelling and continuity.",
      "Judging focuses primarily on prompt quality, scenario accuracy, visual consistency, continuity, creativity, and how effectively the generated video represents the assigned news event. While editing is permitted, it does not guarantee additional evaluation points.",
      "Participants must bring their own laptop.",
    ],
    highlights: [
      { label: "Team size", value: "2 members" },
      { label: "Tool", value: "Google Flow" },
      { label: "Deliverable", value: "Short cinematic news video" },
      { label: "Judged on", value: "Prompt quality and continuity" },
      { label: "Timing", value: "12:45 PM – 1:50 PM" },
      { label: "Reporting", value: "10 minutes before the event" },
    ],
    coordinators: [
      { name: "Marie", phone: "+91 73059 43886" },
      { name: "Nisha", phone: "+91 63856 23861" },
    ],
  },
  {
    slug: "batman-and-robin",
    title: "Batman & Robin",
    tag: "Event 05",
    category: "Technical Duo Event - Prompt Engineering",
    participation: "2 Members",
    poster: batmanRobin,
    summary:
      "One teammate describes a hidden image. The other turns that description into an AI image prompt.",
    description: [
      "Batman & Robin is a two-member prompt engineering challenge designed to evaluate communication and AI prompting skills.",
      "One participant (Batman) is shown an image that remains hidden from their teammate. Batman must verbally describe the image without displaying it, while the second participant (Robin) converts the description into a detailed AI image-generation prompt.",
      "Only the generated prompt text is evaluated, not the generated image. The winning team is the one whose prompt is most capable of reproducing an image that closely resembles the original reference. Evaluation emphasizes prompt engineering technique, descriptive accuracy, AI knowledge, and responsible AI practices.",
    ],
    highlights: [
      { label: "Team size", value: "2 members" },
      { label: "Roles", value: "Batman describes, Robin prompts" },
      { label: "Evaluated", value: "Prompt text only" },
      { label: "Focus", value: "Prompt engineering, responsible AI" },
      { label: "Timing", value: "9:45 AM – 11:00 AM" },
      { label: "Reporting", value: "10 minutes before the event" },
    ],
    coordinators: [
      { name: "Ananya", phone: "+91 93420 40855" },
      { name: "Reny", phone: "+91 93636 24384" },
    ],
  },
  {
    slug: "riddlers-escape",
    title: "Riddler's Escape",
    tag: "Event 06",
    category: "Solo Database Challenge",
    participation: "Individual",
    poster: riddlersEscape,
    summary:
      "Escape five sequential rooms by querying your way out through SQL, NoSQL, PL/SQL and MongoDB.",
    description: [
      "Riddler's Escape is a gamified database problem-solving event where participants navigate through a virtual environment consisting of five sequential rooms.",
      "To unlock each room, participants must solve database-related challenges involving SQL, NoSQL, PL/SQL, and MongoDB. The output of each query serves as the key required to progress to the next room.",
      "The participant who successfully clears all five rooms and reaches the final treasure first is declared the winner. The event evaluates database querying skills, logical reasoning, problem-solving ability, and speed under pressure.",
    ],
    highlights: [
      { label: "Participation", value: "Individual" },
      { label: "Rooms", value: "5 sequential" },
      { label: "Tech", value: "SQL, NoSQL, PL/SQL, MongoDB" },
      { label: "Win condition", value: "First to escape" },
      { label: "Timing", value: "12:45 PM – 2:15 PM" },
      { label: "Reporting", value: "10 minutes before the event" },
    ],
    coordinators: [
      { name: "Anton", phone: "+91 93639 25369" },
      { name: "Sebrancia", phone: "+91 93426 18335" },
    ],
  },
];
