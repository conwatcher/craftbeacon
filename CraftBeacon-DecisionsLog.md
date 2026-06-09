# CraftBeacon — Decisions Log

*A running record of every significant architectural, strategic, and product decision made during the build. Each entry captures what was decided, when, what the alternatives were, and why the chosen path won. Entries marked PERMANENT are locked. Entries marked FOR NOW are placeholder decisions that should be revisited when conditions change.*

*Last updated: June 9, 2026*

---

## Product Identity

---

**DECISION: CraftBeacon never generates content for authors.**
Date: Early build sessions, 2025
Status: PERMANENT — this is the non-negotiable foundation of the entire product.
Alternatives considered: A hybrid model where some content generation was permitted in limited circumstances.
Why this won: Human-authorship preservation is CraftBeacon's entire competitive position. The moment it generates prose, it becomes indistinguishable from every other AI writing tool on the market and loses its legal, ethical, and strategic defensibility. The copy-paste test is the enforcement standard — if it could land on the page, it should not have been produced.

---

**DECISION: CraftBeacon is positioned as "the writing coach that never writes for you."**
Date: Early build sessions, 2025
Status: PERMANENT
Alternatives considered: Various broader positioning statements about AI-assisted writing.
Why this won: It names the differentiator immediately and sets the expectation before the author even begins a session. It is the clearest single-sentence statement of what makes CraftBeacon distinct from every generative tool.

---

**DECISION: CraftBeacon serves fiction and narrative nonfiction authors specifically — not all writers.**
Date: Early build sessions, 2025
Status: PERMANENT
Alternatives considered: Serving all writers regardless of genre or format.
Why this won: Specificity makes the coaching more useful. The craft challenges, publishing landscape, and marketing needs of a literary fiction author are meaningfully different from those of a technical writer or copywriter. Serving a defined audience well is more valuable than serving everyone adequately.

---

## Technical Architecture

---

**DECISION: GitHub Pages for the front end, hosted at thecraftbeacon.com.**
Date: Early build, 2025
Status: PERMANENT unless traffic or feature needs outgrow it.
Alternatives considered: Other hosting platforms.
Why this won: Free, reliable, integrates cleanly with the GitHub repository workflow Patrick already uses. Appropriate for the current scale of the product.

---

**DECISION: Val.town as the AI relay connecting the front end to the Anthropic API.**
Date: Early build, 2025
Status: FOR NOW — adequate at current scale, revisit if relay limitations become a problem.
Alternatives considered: Direct API calls from the front end (ruled out because it would expose the API key).
Why this won: Keeps the Anthropic API key secure on the server side while allowing the front end to send and receive messages. Simple to maintain at current scale.

---

**DECISION: Outseta handles membership and payments, connected to Stripe.**
Date: Early build, 2025
Status: PERMANENT for the foreseeable build phase.
Alternatives considered: Building custom membership logic, using Stripe directly without a membership layer.
Why this won: Outseta handles the signup, login, plan management, and JWT token generation in a way that would have taken significant development time to build from scratch. Stripe handles the actual payment processing underneath it.

---

**DECISION: Supabase handles session logging.**
Date: Mid-build, 2025
Status: PERMANENT, with expansion planned.
Alternatives considered: Not logging sessions at all.
Why this won: Session logs are the foundation for the Author Decision Record feature — the downloadable PDF showing coaching session history and confirming no AI content generation occurred. Logging now, even simply, means the data will be there when that feature is built. Project: craftbeacon-sessions, East US Ohio region, table: coaching_sessions.

---

**DECISION: Tier detection uses Outseta JWT plan UIDs, not plan names.**
Date: Mid-build, 2025
Status: PERMANENT — this is how Outseta works.
Why this matters: The JWT token Outseta issues after login contains a plan UID rather than a readable plan name. The five known UIDs are: FREE: dQGgqpQ4 / Writing Lane: OW48a3Wg / Marketing Lane: XQYaGRQP / Production Lane: wQXNDaWK / Premium: L9P3lEQJ. Any tier detection logic must match against these UIDs.

---

**DECISION: DNS managed through GoDaddy.**
Date: Early build, 2025
Status: PERMANENT unless domain is moved.
Note: Custom domain thecraftbeacon.com points to GitHub Pages via GoDaddy DNS settings.

---

**DECISION: File upload supports Markdown only. DOCX support intentionally removed.**
Date: June 2026
Status: PERMANENT until a proper parsing library is implemented.
Alternatives considered: Keeping DOCX support, using a third-party parsing library.
Why this won: DOCX extraction was unreliable and caused CraftBeacon to hallucinate manuscript content rather than read the actual uploaded file. Markdown works cleanly and reliably. DOCX will be revisited when a proper parsing library can be integrated.

---

**DECISION: VS Code is the single development tool for both CraftBeacon and Red Foundations projects. GitHub Desktop was evaluated and removed.**
Date: June 9, 2026
Status: PERMANENT
Alternatives considered: Using GitHub Desktop for CraftBeacon and VS Code for Red Foundations as a separation strategy.
Why this won: GitHub Desktop is only a delivery tool — it has no code editor and would still require VS Code for actual file editing. Splitting tools across projects adds complexity without any functional benefit. The projects are already separated by folder and repository. GitHub Desktop was removed from the laptop.

---

## Membership and Pricing

---

**DECISION: Five-tier structure — Free, Writing Lane, Marketing Lane, Production Lane, Premium.**
Date: Early build, 2025
Status: PERMANENT in structure. Individual pricing may be revisited.
Alternatives considered: Fewer tiers, simpler flat pricing.
Why this won: The lane model allows authors to subscribe to only what they need, lowering the entry price while preserving a clear Premium upsell path. It also aligns the product structure with CraftBeacon's coaching philosophy — different aspects of the author's life require different kinds of support.

---

**DECISION: Free tier is permanent with no time limit and no credit card required.**
Date: Pre-launch, 2025–2026
Status: PERMANENT — this framing is a deliberate positioning choice, not a default.
Alternatives considered: Trial language ("free for 30 days"), requiring a credit card for signup.
Why this won: "Free to start, no time limit, no credit card required" signals trust and lowers the barrier to entry. Trial language implies the free experience will be taken away, which creates friction. The permanent free tier is part of the brand promise.

---

**DECISION: Individual lane pricing at approximately $10/month or $96/year. Premium at approximately $29/month or $276/year.**
Date: Pre-launch, 2025–2026
Status: FOR NOW — pricing benchmarked against competitive landscape. Revisit after first 90 days of revenue data.
Why this won: Competitive research dossier confirmed this range is consistent with comparable niche SaaS tools for authors. Premium at $29 positions it as accessible rather than enterprise-priced.

---

**DECISION: Outseta plan display order is alphabetically fixed and cannot be reordered in Outseta's native UI.**
Date: Discovered mid-build, 2026
Status: PERMANENT constraint — workaround is individual plan signup links on a future custom pricing page.
Why this matters: If you want plans displayed in a specific order on the website, you cannot rely on Outseta's embedded widget. Each plan has its own individual signup URL, enabling a custom-designed pricing page that presents plans in any preferred order.

---

## Email and Subscriber System

---

**DECISION: Outseta's built-in email system handles all CraftBeacon subscriber communications. MailerLite is not used for CraftBeacon.**
Date: June 9, 2026
Status: PERMANENT
Alternatives considered: MailerLite with Zapier integration to connect Outseta signups; MailerLite standalone with manual subscriber management.
Why this won: Outseta already handles memberships and payments — adding its built-in email system keeps everything in one platform, eliminates a third monthly subscription (MailerLite), and removes the need for a Zapier connector. The CraftBeacon MailerLite account that was created during this session should be deleted.

---

**DECISION: Welcome email is attached directly to the CraftBeacon Subscribers list in Outseta, not managed as a separate drip campaign.**
Date: June 9, 2026
Status: PERMANENT
Alternatives considered: Outseta drip campaign triggered by list join; MailerLite automation.
Why this won: Outseta's list-level welcome email fires automatically when a subscriber is added to the list, which is simpler and cleaner than a separate drip campaign for a single email. A drip campaign would only add value if multiple timed follow-up emails were needed.

---

**DECISION: New Outseta signups are automatically added to the CraftBeacon Subscribers list via the "Add opt-in to email list" checkbox in Auth > Sign up and login settings.**
Date: June 9, 2026
Status: PERMANENT
Why this matters: This is the connection that makes the whole system automatic. When someone creates a CraftBeacon account, they are added to the CraftBeacon Subscribers list, which triggers the welcome email. No manual steps required.

---

**DECISION: Newsletter frequency is monthly.**
Date: June 9, 2026
Status: FOR NOW — revisit after consistent monthly cadence is established.
Alternatives considered: Biweekly.
Why this won: Monthly is sustainable given Patrick's other commitments (platform build, writing retreat schedule, Red Foundations projects). Starting biweekly and pulling back feels like a retreat to subscribers; starting monthly and stepping up feels like a gift. Upgrade the frequency when it earns itself.

---

## Brand and Visual Identity

---

**DECISION: CraftBeacon brand is kept separate from Red Foundations Publishing.**
Date: Pre-launch, 2026
Status: PERMANENT
Why this won: The two products serve different audiences and different purposes. Mixing them creates brand confusion. The footer line referencing Red Foundations Publishing was intentionally removed from both index.html and dashboard.html.

---

**DECISION: Dark parchment and amber color palette as the primary brand aesthetic.**
Date: Early build, 2025
Status: PERMANENT unless significant tester feedback demands reconsideration.
Note: One beta tester suggested a lighter color scheme. Single-tester feedback is not sufficient to drive design changes — multiple independent signals required before acting on this.

---

**DECISION: Outseta brand color set to #8B1A2F.**
Date: Early build, 2025
Status: PERMANENT

---

**DECISION: Manus AI handles creative asset production. Claude handles strategy, structure, and code.**
Date: Established during build, 2025–2026
Status: PERMANENT as the working division of labor.
Why this won: Each tool is used for what it does best. Manus produces images and design assets aligned with CraftBeacon's visual aesthetic. Claude handles architecture, copy, code, and strategic thinking.

---

## Social and Marketing

---

**DECISION: Both Facebook and Instagram active through Meta Business Suite.**
Date: Resolved June 2026
Status: PERMANENT — both platforms connected and posting.

---

**DECISION: 13-post Facebook social media schedule built in Meta Business Suite, running June 7 through July 1, posting every other day at 8 AM Eastern.**
Date: Pre-launch, June 2026
Status: Active and running.
Note: Five asset types across the schedule — Launch Announcements, Positioning Quote Cards, Pain Point Awareness Posts, Lane Introduction Posts, and Pre-Launch Teasers.

---

**DECISION: First paid ad boosting candidates are posts around June 27–29.**
Date: Pre-launch, June 2026
Status: FOR NOW — timed to when budget is expected to be available.
Why this won: Use organic engagement data and early signup numbers from the first weeks to inform targeting before spending money.

---

## System Prompt

---

**DECISION: System prompt is structured in five sections, with a condensed version running live on the Val.town relay.**
Date: Mid-build, 2025–2026
Status: PERMANENT in structure. Content evolves.
Sections: 01-Identity, 02-Capabilities, 03-Tiers, 04-BannedBehavior, 05-EdgeCase.
Note: Sections 4 and 5 are drafted and approved in the section files but not yet fully integrated into the condensed live prompt. This is an open item.

---

**DECISION: Carry-forward notes at the bottom of individual section prompt files should be cleared out.**
Date: June 9, 2026
Status: FOR NOW — cleanup pending.
Why this matters: The notes were useful during active construction but now cause confusion in sessions and are easily misread as current instructions. The full prompt is the authoritative document. Before deleting, each file should be scanned to confirm nothing unresolved is hiding in the notes that never made it into the full prompt or orientation documents.

---

**DECISION: Normalization — explicitly telling authors their struggles are common — is a meaningful and intentional coaching move.**
Date: Mid-build, 2025–2026
Status: PERMANENT — built into the system prompt's emotional response handling.
Why this won: Telling an author "this is a challenge nearly every writer faces" is not just comfort — it is accurate information that removes shame from the coaching relationship and makes the author more receptive to working through the problem.

---

## Session Management

---

**DECISION: Three-document session management system adopted — Re-Entry Brief, Decisions Log, and Session Ritual.**
Date: June 9, 2026
Status: PERMANENT
Alternatives considered: Relying on handoff prompts alone, maintaining a single combined document.
Why this won: The fragmented memory problem Patrick experiences at re-entry into any context requires a dedicated orientation system. The three documents divide the work cleanly — the Brief covers current state, the Log covers reasoning behind past choices, and the Ritual covers how to use the system. All three live in the root of the CraftBeacon GitHub repository.

---

**DECISION: Session opening phrase is "Bring me up to speed."**
Date: June 9, 2026
Status: PERMANENT
Why this won: Natural to Patrick's speaking style and easy to recall instinctively.

---

**DECISION: Document save workflow is download, drag to D drive CraftBeacon folder, commit and sync in VS Code.**
Date: June 9, 2026
Status: PERMANENT
Why this won: Simple, consistent, uses tools and habits already in place.

---

**DECISION: Threaded handoff skill updated to include document updates as part of every session close-out.**
Date: June 9, 2026
Status: PERMANENT
Why this won: Folding the doc update into the existing handoff routine means it happens automatically as part of closing rather than being a separate thing to remember.

---

**DECISION: GitHub repository fetched via web_fetch tool using the public GitHub blob URL. Raw URL fetch requires a prior search result — use blob URL instead.**
Date: June 9, 2026
Status: PERMANENT — this is the correct access method.
Why this matters: The raw.githubusercontent.com URL requires a prior search result to be fetched. The github.com/blob URL works directly. When fetching Re-Entry Brief or Decisions Log at session start, use: https://github.com/conwatcher/craftbeacon/blob/main/CraftBeacon-ReEntryBrief.md and https://github.com/conwatcher/craftbeacon/blob/main/CraftBeacon-DecisionsLog.md

---

*How to use this document: When a significant decision is made in any session, ask Claude to add an entry to this log before closing the thread. When you can't remember why something was built a certain way, read the relevant entry here before re-examining the code or architecture.*
