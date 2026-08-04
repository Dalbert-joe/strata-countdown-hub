import wayneTech from "../waynetech.jpg";
import whySoSerious from "../WhySoSerious.jpg";
import rogueAi from "../rogueai.jpeg";
import gothamTimes from "../gothamtimes.jpeg";
import batmanRobin from "../BatmanRobin.jpg";
import riddlersEscape from "../Riddler.jpg";

/**
 * The STRATA '26 event lineup.
 *
 * `slug` is already unique and URL-safe, so moving from the current detail
 * dialog to real `/events/$slug` routes needs no data changes.
 */

/**
 * A labelled group of points inside a section — "Task", "Challenge",
 * "Winning Criteria" and so on. `label` is optional so a section can also be a
 * plain bullet list (the guidelines block has no sub-headings).
 */
export type EventPoints = {
  label?: string;
  points: string[];
};

/**
 * One block of the rules: the guidelines, or a single round.
 *
 * Rules are modelled as structure rather than pre-formatted prose because the
 * shape is genuinely repetitive across all six events — every round is some
 * combination of task, constraints and how it is judged. Keeping it as data
 * means the dialog decides how a "Winning Criteria" list looks once, instead of
 * six descriptions each hard-coding their own layout.
 */
export type EventSection = {
  title: string;
  /** Prose shown under the title, before any points. */
  intro?: string[];
  items?: EventPoints[];
};

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
  /** The "Event Overview" paragraph, shown at the top of the detail view. */
  overview: string;
  /** Room / lab code. Shown as its own badge, not buried in the highlights table. */
  venue: string;
  /**
   * Accepted submission formats (e.g. Paper / Project / Poster), shown as
   * standalone callout badges. Omit for events with one fixed deliverable.
   */
  submissionFormats?: string[];
  /** Format facts rendered as a small key/value table. */
  highlights: { label: string; value: string }[];
  /** Guidelines and rounds, in display order. */
  sections: EventSection[];
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
      "Submit a paper, project, or poster ahead of the event, then present and defend it before a panel of department faculty.",
    overview:
      "Present your research work before a panel of faculty members through a technical presentation followed by a Q&A session. Showcase innovation, technical knowledge, and research excellence.",
    venue: "G32 (Third Floor)",
    submissionFormats: ["Paper", "Project", "Poster"],
    highlights: [
      { label: "Participation", value: "1-3 members" },
      { label: "Presentation", value: "5 minutes" },
      { label: "Viva / Q&A", value: "2 minutes" },
      { label: "Submission", value: "Due one day prior" },
      { label: "Timing", value: "9:30 AM – 11:00 AM" },
      { label: "Reporting", value: "15 minutes before the event" },
    ],
    sections: [
      {
        title: "Guidelines & General Instructions",
        items: [
          {
            points: [
              "Team size: 1 to 3 members.",
              "A paper, project, or poster may be submitted, preferably one day before the event, for preliminary review.",
              "Presentation time: 5 minutes.",
              "Viva and Q&A: 2 minutes.",
              "LICET students can also participate in this event.",
              "Plagiarism or AI-generated content without proper understanding may lead to disqualification.",
              "The judges' decision is final.",
            ],
          },
        ],
      },
      {
        title: "Round 1 – Research Presentation",
        items: [
          {
            label: "Task",
            points: ["Present your submitted work and defend it during the viva session."],
          },
          {
            label: "Challenge",
            points: [
              "Deliver a clear and concise technical presentation.",
              "Answer questions from the faculty panel confidently.",
            ],
          },
          {
            label: "Winning Criteria",
            points: [
              "Research quality.",
              "Technical content.",
              "Innovation.",
              "Presentation skills.",
              "Performance in the Q&A session.",
            ],
          },
        ],
      },
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
      "Solve coding problems to damage the Joker while he throws random hazards at your run.",
    overview:
      "Battle the Joker in a high-intensity coding challenge. Solve programming problems to deal damage while surviving unexpected Joker attacks. Defeat the Joker first, or finish with the most serious damage to win.",
    venue: "B22 (Second Floor)",
    highlights: [
      { label: "Participation", value: "Individual" },
      { label: "Problems", value: "10 + a final challenge" },
      { label: "Bring", value: "Your HackerRank ID" },
      { label: "Twist", value: "Random hazards, 2x damage window" },
      { label: "Timing", value: "11:00 AM – 12:30 PM" },
      { label: "Reporting", value: "10 minutes before the event" },
    ],
    sections: [
      {
        title: "Guidelines & General Instructions",
        items: [
          {
            points: [
              "Individual event.",
              "Use only the system provided by the organizers.",
              "No external help or AI tools are permitted.",
              "Participants must come with a HackerRank ID.",
              "The judges' decision is final.",
            ],
          },
        ],
      },
      {
        title: "Round 1 – Defeat the Joker",
        items: [
          { label: "Task", points: ["Solve coding challenges to damage the Joker."] },
          {
            label: "Challenge",
            points: [
              "Start with 10 coding problems.",
              "The 11th Final Challenge unlocks in the last 15 minutes.",
            ],
          },
          {
            label: "Joker Attacks",
            points: ["Random obstacles such as system freeze may occur."],
          },
          {
            label: "Double Damage",
            points: [
              "A surprise 10-minute Double Damage Window activates randomly.",
              "Every challenge solved during this period deals 2x damage.",
            ],
          },
          {
            label: "Winning Criteria",
            points: [
              "The first to solve all 10 challenges wins.",
              "If no one defeats the Joker, the participant with the highest damage score wins.",
            ],
          },
        ],
      },
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
      "Build a chatbot for a domain revealed on the day, under a constraint handed to you by a rival team.",
    overview:
      "Rogue AI is an AI chatbot development competition designed to test participants' creativity, technical skills, and ability to adapt under pressure. Teams will develop an AI chatbot based on a domain that is revealed only at the start of the event. Along the way, they must also overcome an unexpected challenge assigned by another team. The event encourages innovative thinking, teamwork, and problem-solving in a fun and competitive environment.",
    venue: "G31 (Third Floor)",
    highlights: [
      { label: "Team size", value: "3-4 members" },
      { label: "Domain", value: "Revealed at the start" },
      { label: "Twist", value: "Peer-assigned challenge" },
      { label: "Bring", value: "Your own laptop" },
      { label: "Timing", value: "11:00 AM – 12:15 PM" },
      { label: "Reporting", value: "10 minutes before the event" },
    ],
    sections: [
      {
        title: "Guidelines & General Instructions",
        items: [
          {
            points: [
              "Team size: 3 to 4 members.",
              "Participants must bring their own laptop.",
              "The chatbot domain is announced only when the event begins.",
              "Use only the tools and resources permitted by the organizers.",
              "Plagiarism and external assistance are strictly prohibited.",
              "Teams must complete their chatbot within the given time.",
              "The assigned challenge must be incorporated into the chatbot.",
              "The judges' decision is final.",
            ],
          },
        ],
      },
      {
        title: "Task",
        intro: ["At the beginning of the event, each team will pick two cards."],
        items: [
          {
            label: "Card 1 – Team & Domain Card",
            points: [
              "Contains the team's number and the chatbot domain they must work on.",
              "Teams should develop their chatbot according to the assigned domain.",
            ],
          },
          {
            label: "Card 2 – Challenge Assignment Card",
            points: [
              "The team number to which the challenge must be assigned.",
              "Two challenge options.",
              "The team must discuss and choose one of the two challenges to assign to the specified team. The selected challenge will then be communicated to that team and must be implemented as part of their chatbot.",
            ],
          },
        ],
      },
      {
        title: "Challenge Round",
        items: [
          {
            points: [
              "Every team will receive one challenge selected by another team.",
              "The assigned challenge is mandatory and must be included in the final chatbot.",
              "Teams should adapt their solution while maintaining the chatbot's functionality and user experience.",
              "The challenge adds an element of strategy and tests how well teams can work under unexpected conditions.",
            ],
          },
          {
            label: "Winning Criteria",
            points: [
              "Chatbot functionality.",
              "Innovation and creativity.",
              "Adaptability to assigned challenges.",
              "Overall performance and user experience.",
            ],
          },
        ],
      },
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
      "Turn a fictional Gotham news scenario into a cinematic AI news broadcast using Google Flow.",
    overview:
      "Create a cinematic AI-generated news video based on a fictional Gotham City news scenario using Google Flow. Transform your story into a compelling visual broadcast through effective prompt engineering and storytelling.",
    venue: "G32 (Third Floor)",
    highlights: [
      { label: "Team size", value: "2 members" },
      { label: "Tool", value: "Google Flow" },
      { label: "Editing", value: "Permitted" },
      { label: "Bring", value: "Your own laptop" },
      { label: "Timing", value: "12:45 PM – 1:50 PM" },
      { label: "Reporting", value: "10 minutes before the event" },
    ],
    sections: [
      {
        title: "Guidelines & General Instructions",
        items: [
          {
            points: [
              "Team size: 2 members.",
              "Participants must bring their own laptop.",
              "Use Google Flow for video generation.",
              "Editing and combining generated clips is permitted.",
              "No external AI tools unless approved by the organizers.",
              "The judges' decision is final.",
            ],
          },
        ],
      },
      {
        title: "Round 1 – Breaking News",
        items: [
          {
            label: "Task",
            points: ["Generate a cinematic news video from the assigned Gotham news scenario."],
          },
          {
            label: "Challenge",
            points: [
              "Each team receives a unique fictional news scenario.",
              "Generate multiple clips and edit them into one cohesive news report.",
              "Focus on storytelling, continuity, and visual consistency.",
            ],
          },
          {
            label: "Winning Criteria",
            points: [
              "Prompt engineering quality.",
              "Scenario accuracy.",
              "Visual consistency and continuity.",
              "Creativity and cinematic storytelling.",
            ],
          },
        ],
      },
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
      "Batman memorises a hidden image and describes it. Robin, who never sees it, prompts it back.",
    overview:
      "Work as the ultimate duo to recreate a hidden image using prompt engineering. Batman memorizes the image, Robin never sees it — only teamwork and precise prompts can recreate the original.",
    venue: "G33 (Third Floor)",
    highlights: [
      { label: "Team size", value: "2 members" },
      { label: "Duration", value: "10 minutes" },
      { label: "Generations", value: "Maximum 5" },
      { label: "Roles", value: "Batman describes, Robin prompts" },
      { label: "Timing", value: "9:45 AM – 11:00 AM" },
      { label: "Reporting", value: "10 minutes before the event" },
    ],
    sections: [
      {
        title: "Guidelines & General Instructions",
        items: [
          {
            points: [
              "Team size: 2 members.",
              "Duration: 10 minutes.",
              "Use only the AI platform provided.",
              "Maximum of 5 image generations.",
              "No mobile phones, external AI tools, or internet resources.",
              "The judges' decision is final.",
            ],
          },
        ],
      },
      {
        title: "Round 1 – Observe & Recreate",
        items: [
          {
            label: "Task",
            points: [
              "Batman observes a hidden image for 1 to 2 minutes, then describes it to Robin. Together, they engineer prompts to recreate the image.",
            ],
          },
          {
            label: "Challenge",
            points: [
              "1 to 2 minutes for image observation.",
              "8 minutes for discussion and prompt engineering.",
              "Maximum of 5 image generations.",
            ],
          },
          {
            label: "Rules",
            points: [
              "Robin must never view the reference image.",
              "Batman may rely only on memory after observation.",
              "The last generated image will be considered the final submission.",
            ],
          },
          {
            label: "Winning Criteria",
            points: [
              "Closest match to the reference image.",
              "Effective prompt engineering.",
              "Visual accuracy and teamwork.",
            ],
          },
        ],
      },
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
      "Every correct SQL query unlocks the next clue. Survive the eliminations to reach the final five.",
    overview:
      "Embark on a SQL-powered treasure hunt where every correct query unlocks the next clue. Survive each elimination round and be among the Top 5 finalists to uncover the hidden treasure.",
    venue: "B22 (Second Floor)",
    highlights: [
      { label: "Participation", value: "Individual" },
      { label: "Rounds", value: "6, with eliminations" },
      { label: "Tech", value: "SQL only" },
      { label: "Timing", value: "12:45 PM – 2:15 PM" },
      { label: "Reporting", value: "10 minutes before the event" },
    ],
    sections: [
      {
        title: "Guidelines & General Instructions",
        items: [
          {
            points: [
              "Individual event.",
              "Only SQL queries are permitted.",
              "No AI tools or external assistance are allowed.",
              "The judges' decision is final.",
            ],
          },
        ],
      },
      {
        title: "Round 1 – The First Clue",
        items: [
          { label: "Task", points: ["Solve SQL queries to reveal the first hidden clue."] },
          {
            label: "Challenge",
            points: ["Each correct query unlocks the next location on the virtual map."],
          },
          { label: "Winning Criteria", points: ["Top performers advance to Round 2."] },
        ],
      },
      {
        title: "Rounds 2–5 – The Treasure Trail",
        items: [
          { label: "Task", points: ["Solve increasingly difficult SQL challenges."] },
          {
            label: "Challenge",
            points: [
              "Every correct query reveals a new clue while participants face elimination after each round.",
            ],
          },
          {
            label: "Winning Criteria",
            points: ["Only the Top 5 participants qualify for the Final Round."],
          },
        ],
      },
      {
        title: "Round 6 – The Final Treasure",
        items: [
          { label: "Task", points: ["Solve the final SQL challenge to decode the last clue."] },
          { label: "Goal", points: ["Be the first to uncover the hidden treasure."] },
          {
            label: "Winning Criteria",
            points: [
              "First correct submission wins. In case of a tie, the fastest correct solution is declared the winner.",
            ],
          },
        ],
      },
    ],
    coordinators: [
      { name: "Anton", phone: "+91 93639 25369" },
      { name: "Sebrancia", phone: "+91 93426 18335" },
    ],
  },
];
