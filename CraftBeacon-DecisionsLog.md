# CraftBeacon — Decisions Log

*A running record of every significant architectural, strategic, and product decision made during the build. Each entry captures what was decided, when, what the alternatives were, and why the chosen path won. Entries marked PERMANENT are locked. Entries marked FOR NOW are placeholder decisions that should be revisited when conditions change.*

*Last updated: June 16, 2026*

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

**DECISION: Mobile Chrome dashboard auth requires four-part defensive handling.**
Date: June 16, 2026
Status: PERMANENT — this is the canonical fix for mobile Chrome login behavior.
Background: Mobile Chrome (particularly iPad) was looping on "Lighting the Beacon" after login. Desktop Chrome and Safari worked. Multiple single-fix attempts across previous sessions failed because the root cause was four stacked problems, not one.
The four required fixes:
1. JWT base64url decoding must include explicit padding (`=` characters) before atob() — mobile Chrome's stricter parser rejects unpadded base64 that desktop browsers tolerate.
2. The Outseta script must load with the `async` attribute. Synchronous loading was blocking page execution on mobile Chrome.
3. The legacy initAuth function had to be deleted entirely. It was racing against the new bootDashboard function and winning, calling resolve(null) and redirecting to index.html.
4. setupDashboard must be called BEFORE the URL history is cleaned, and Step 3 of bootDashboard (the no-token redirect) must check whether a token was in the URL — if so, retry once with a 1-second delay rather than immediately redirecting to index.
Why this matters: Any future auth refactor must preserve all four protections. Removing any one of them reintroduces the loop.

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
Why this won: Each tool is used for what it does best. Manus produces images and design assets aligned with CraftBeacon's visual aesthetic. Claude handles architecture, copy, code, and strategic thinking. Opus.ai was considered for video and ruled out — claymation and sketch styles don't fit CraftBeacon's brand.

---

## Social and Marketing

---

**DECISION: Both Facebook and Instagram active through Meta Business Suite.**
Date: Resolved June 2026
Status: PERMANENT — both platforms connected and posting.
Note: Instagram had an unresolved connection issue at launch time and was temporarily deprioritized. That issue has since been resolved. Both platforms are running.

---

**DECISION: 13-post Facebook social media schedule built in Meta Business Suite, running June 7 through July 1, posting every other day at 8 AM Eastern.**
Date: Pre-launch, June 2026
Status: Active and running.
Note: Five asset types across the schedule — Launch Announcements, Positioning Quote Cards, Pain Point Awareness Posts, Lane Introduction Posts, and Pre-Launch Teasers.

---

**DECISION: First paid ads launched at low daily spend for organic learning.**
Date: June 16, 2026
Status: Active and running.
Configuration: Video teaser boosted at $2/day for 5 days. Best-performing launch post boosted at $5/day for 5 days.
Why this configuration: Low spend allows real audience response data to accumulate before larger commitment. Don't touch the campaigns until they complete their runs.

---

## System Prompt

---

**DECISION: System prompt is structured in five sections, with a condensed version running live on the Val.town relay.**
Date: Mid-build, 2025–2026
Status: PERMANENT in structure. Content evolves.
Sections: 01-Identity, 02-Capabilities, 03-Tiers, 04-BannedBehavior, 05-EdgeCase.
Note: Sections 4 and 5 are drafted and approved in the section files but not yet fully integrated into the condensed live prompt. This is an open item.

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
Alternatives considered: Setting Chrome downloads folder to VS Code folder directly (ruled out — would send all downloads there including Canva and Manus files), Google Drive (ruled out in favor of keeping everything in GitHub where the project already lives).
Why this won: Simple, consistent, uses tools and habits already in place.

---

**DECISION: Session document updates are desktop-only.**
Date: June 16, 2026
Status: PERMANENT workflow rule.
Background: Multiple sessions ended without doc updates because Patrick tried to handle them from phone or tablet during off-hours. GitHub document fetching from mobile devices fails reliably — the connector is not available on mobile.
Resolution: Only update session documents from the laptop, as the first or last step of a working session. Never attempt from mobile.

---

**DECISION: Threaded handoff skill updated to include document updates as part of every session close-out.**
Date: June 9, 2026
Status: PERMANENT
Why this won: Folding the doc update into the existing handoff routine means it happens automatically as part of closing rather than being a separate thing to remember.

---

*How to use this document: When a significant decision is made in any session, ask Claude to add an entry to this log before closing the thread. When you can't remember why something was built a certain way, read the relevant entry here before re-examining the code or architecture.*
