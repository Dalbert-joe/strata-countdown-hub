# STRATA '26 — Event Details

Source of truth for all event content on the site.
Provided by Jabin on 2026-07-29. Supersedes the original 8-event placeholder lineup.

The code mirrors this file at `src/data/events.ts`. **Edit both together** —
if you change an event here, update the data file, and vice versa.

---

## 1. WayneTech Research Summit

- **Slug:** `waynetech-research-summit`
- **Category:** Technical Paper Presentation
- **Participation:** Individual
- **Poster:** `src/Paperpresentation.jpg`
- **Coordinators:** Asmita & Bharath

WayneTech Research Summit is a technical paper presentation event where participants are
required to submit their research paper prior to the competition (preferably one day before
the event) for preliminary review.

On the event day, participants present their research work before a panel of faculty members
from the department. Each participant is allotted 5 minutes for the presentation, followed by
a 2-minute viva / question-and-answer session.

Evaluation is based on the quality of research, technical content, presentation skills,
innovation, and the ability to answer questions effectively.

**Format facts**

| | |
| --- | --- |
| Participation | Individual |
| Presentation | 5 minutes |
| Viva / Q&A | 2 minutes |
| Submission | Paper due one day prior |

> ⚠️ **Open question:** the source text says *"Each team will be allotted 5 minutes"* while the
> category is Individual. Site currently says "Each participant". Confirm which is right.

---

## 2. Why So Serious?

- **Slug:** `why-so-serious`
- **Category:** Solo Technical Coding Challenge
- **Participation:** Individual
- **Poster:** `src/WhySoSerious.jpg`
- **Coordinators:** Uwais & Preetha

Why So Serious? is an interactive coding competition where participants solve a series of
programming challenges to inflict "damage" on the Joker.

Throughout the competition, the Joker introduces random hazards that temporarily disrupt
participants' progress. These may include temporary system freezes, reductions to a
participant's solved problem count, or other distractions designed to simulate real-world
pressure.

The participant who successfully solves all coding challenges and defeats the Joker first is
declared the winner. If no participant completes all challenges within the allotted time, the
participant with the highest accumulated damage (based on solved problems) is declared the
winner.

**Format facts**

| | |
| --- | --- |
| Participation | Individual |
| Scoring | Damage per solved problem |
| Twist | Random Joker hazards |
| Win condition | First to clear, else highest damage |

---

## 3. Rogue AI

- **Slug:** `rogue-ai`
- **Category:** Team AI Development Challenge
- **Participation:** 3–4 Members
- **Poster:** `src/RougeAI.jpg`
- **Coordinators:** Sri Lekha & Nandhini

> Note: spelled **Rogue AI**. The old site said "Rouge AI" — that was a typo and is now fixed.
> The image filename is still `RougeAI.jpg`; renaming it is optional cleanup.

Rogue AI is a competitive AI chatbot development event where each team, consisting of 3 to 4
members, must design and build an intelligent chatbot within the given time.

Unlike conventional hackathons, every team randomly assigns another participating team a unique
challenge or constraint through a randomized selection process. These constraints act as
disadvantages that teams must overcome while continuing to improve their chatbot.

Since challenges are assigned randomly, some teams may receive multiple constraints while others
receive few or none. Success depends on a team's technical expertise, adaptability, and ability
to deliver a robust chatbot despite unpredictable conditions.

**Format facts**

| | |
| --- | --- |
| Team size | 3–4 members |
| Build | AI chatbot |
| Twist | Peer-assigned constraints |
| Judged on | Robustness and adaptability |

---

## 4. The Gotham Times

- **Slug:** `the-gotham-times`
- **Category:** Team AI Video Generation
- **Participation:** 2 Members
- **Poster:** ⚠️ **NONE — using `src/OperationKnightfall.jpg` as a temporary stand-in**
- **Coordinators:** Marie & Nisha

The Gotham Times is a two-member AI video generation competition inspired by Gotham City from
the DC Universe.

Each team receives a fictional news scenario and must create a short cinematic news video using
Google Flow. Participants may generate multiple video clips and combine them through editing to
improve storytelling and continuity.

Judging focuses primarily on prompt quality, scenario accuracy, visual consistency, continuity,
creativity, and how effectively the generated video represents the assigned news event. While
editing is permitted, it does not guarantee additional evaluation points.

**Format facts**

| | |
| --- | --- |
| Team size | 2 members |
| Tool | Google Flow |
| Deliverable | Short cinematic news video |
| Judged on | Prompt quality, continuity, creativity |

---

## 5. Batman & Robin

- **Slug:** `batman-and-robin`
- **Category:** Technical Duo Event — Prompt Engineering
- **Participation:** 2 Members
- **Poster:** `src/BatmanRobin.jpg`
- **Coordinators:** Ananya & Reny

Batman & Robin is a two-member prompt engineering challenge designed to evaluate communication
and AI prompting skills.

One participant (Batman) is shown an image that remains hidden from their teammate. Batman must
verbally describe the image without displaying it, while the second participant (Robin) converts
the description into a detailed AI image-generation prompt.

Only the generated prompt text is evaluated — not the generated image. The winning team is the
one whose prompt is most capable of reproducing an image that closely resembles the original
reference. Evaluation emphasizes prompt engineering technique, descriptive accuracy, AI
knowledge, and responsible AI practices.

**Format facts**

| | |
| --- | --- |
| Team size | 2 members |
| Roles | Batman describes, Robin prompts |
| Evaluated | Prompt text only |
| Focus | Prompt engineering, responsible AI |

---

## 6. Riddler's Escape

- **Slug:** `riddlers-escape`
- **Category:** Solo Database Challenge
- **Participation:** Individual
- **Poster:** `src/Riddler.jpg`
- **Coordinators:** To be announced

Riddler's Escape is a gamified database problem-solving event where participants navigate through
a virtual environment consisting of five sequential rooms.

To unlock each room, participants must solve database-related challenges involving SQL, NoSQL,
PL/SQL, and MongoDB. The output of each query serves as the key required to progress to the next
room.

The participant who successfully clears all five rooms and reaches the final treasure first is
declared the winner. The event evaluates database querying skills, logical reasoning,
problem-solving ability, and speed under pressure.

**Format facts**

| | |
| --- | --- |
| Participation | Individual |
| Rooms | 5 sequential |
| Tech | SQL, NoSQL, PL/SQL, MongoDB |
| Win condition | First to escape |

---

## Removed events

These were on the original placeholder site and are **no longer part of the lineup**:

| Event | Fate |
| --- | --- |
| Arkham Escape | Removed |
| League of Shadows | Removed |
| Operation Knightfall | Removed — poster reused as Gotham Times stand-in |
| Gotham's Ledger | Replaced by WayneTech Research Summit (same paper-presentation slot) |

Freed poster images still in the repo: `ArkhamEscape.jpg`, `LeagueOfShadows.jpg`.

---

## Still needed per event

- [ ] Duration / time slot for each event
- [ ] Venue or lab per event
- [ ] Prize details
- [x] Registration fee — confirmed free, all events (see `src/data/site.ts` `SITE.fee`)
- [x] Student coordinator name per event (see table above / `coordinators` field in `src/data/events.ts`) — phone numbers not supplied per-event, only for the two overall coordinators
- [ ] Registration link (Google Form or otherwise) — `REGISTER_URL` in `src/data/site.ts` is the single switch, currently `"#"`
- [ ] Custom poster for **The Gotham Times**
