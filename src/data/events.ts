import paperPresentation from "../Paperpresentation.jpg";
import whySoSerious from "../WhySoSerious.jpg";
import rogueAi from "../RougeAI.jpg";
import gothamTimes from "../OperationKnightfall.jpg";
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
  /** One-liner for the card. Keep to ~2 lines at card width. */
  summary: string;
  /** Full rules, one string per paragraph. Shown in the detail view. */
  description: string[];
  /** Format facts rendered as a small key/value table. */
  highlights: { label: string; value: string }[];
};

export const EVENTS: StrataEvent[] = [
  {
    slug: "waynetech-research-summit",
    title: "WayneTech Research Summit",
    tag: "Event 01",
    category: "Technical Paper Presentation",
    participation: "Individual",
    poster: paperPresentation,
    summary:
      "Submit your research paper ahead of the event, then defend it before a panel of department faculty.",
    description: [
      "WayneTech Research Summit is a technical paper presentation event where participants are required to submit their research paper prior to the competition (preferably one day before the event) for preliminary review.",
      "On the event day, participants present their research work before a panel of faculty members from the department. Each participant is allotted 5 minutes for the presentation, followed by a 2-minute viva and question-and-answer session.",
      "Evaluation is based on the quality of research, technical content, presentation skills, innovation, and the ability to answer questions effectively.",
    ],
    highlights: [
      { label: "Participation", value: "Individual" },
      { label: "Presentation", value: "5 minutes" },
      { label: "Viva / Q&A", value: "2 minutes" },
      { label: "Submission", value: "Paper due one day prior" },
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
  },
  {
    slug: "the-gotham-times",
    title: "The Gotham Times",
    tag: "Event 04",
    category: "Team AI Video Generation",
    participation: "2 Members",
    poster: gothamTimes,
    summary:
      "Turn a fictional Gotham news scenario into a short cinematic news video using Google Flow.",
    description: [
      "The Gotham Times is a two-member AI video generation competition inspired by Gotham City from the DC Universe.",
      "Each team receives a fictional news scenario and must create a short cinematic news video using Google Flow. Participants may generate multiple video clips and combine them through editing to improve storytelling and continuity.",
      "Judging focuses primarily on prompt quality, scenario accuracy, visual consistency, continuity, creativity, and how effectively the generated video represents the assigned news event. While editing is permitted, it does not guarantee additional evaluation points.",
    ],
    highlights: [
      { label: "Team size", value: "2 members" },
      { label: "Tool", value: "Google Flow" },
      { label: "Deliverable", value: "Short cinematic news video" },
      { label: "Judged on", value: "Prompt quality and continuity" },
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
    ],
  },
];
