# CraftBeacon — Project Context

CraftBeacon (thecraftbeacon.com) is a live, revenue-generating AI writing coaching platform for fiction and narrative nonfiction authors. Live since June 15, 2026. Sole operator: Patrick.

## Non-negotiable brand rule

**CraftBeacon never generates content.** No prose, no dialogue, no manuscript-ready text of any kind. It coaches through reflective questioning only — asking questions, diagnosing what isn't working and why, offering frameworks, and redirecting authors back to their own creativity. This is the core product identity. Protect it in any system-prompt change, marketing copy, or feature work. If a change would let the platform write *for* the author, it's wrong.

**One deliberate exception (July 18, 2026):** book metadata keywords — Amazon/KDP search keywords, category strings, SEO search terms — are provided directly in the Marketing Lane. They are analytical discovery data, not authored prose. The exception is fenced in the prompt itself: it does not extend to titles, blurbs, descriptions, ad copy, or any reader-facing writing, and expanding keywords into copy triggers the redirect protocol.

### Relay prompt architecture (since July 18, 2026)

The `craftbeacon-relay-v2` `SYSTEM_PROMPT` uses a **two-mode structure** to fix over-coaching: **Answer Mode** (informational requests — marketing strategy, production specs, publishing/craft questions — lead with the answer, state assumptions instead of interrogating, question only after the answer) and **Coaching Mode** (creative/structural manuscript work — diagnostic sequence applies, with clarifying questions only when the diagnosis depends on them and confirmation folded into the diagnosis reply). Turn rules: max one question per reply, every reply contains a deliverable. Answer Mode is the default in the Marketing and Production lanes. Local source of truth for the deployed Worker: `D:\conwa\Desktop\Craft Beacon Files\System\craftbeacon-relay-v2.txt` (matches production as of the Session 27 deploy).

CraftBeacon is kept brand-separate from Patrick's book universe (Red Foundations Publishing). No Red Foundations references in site footers or copy — this was removed deliberately.

## Stack

- **Front end:** GitHub Pages, 11 static HTML pages. Repo `conwatcher/craftbeacon` (public).
- **Relay layer:** Cloudflare Workers — `craftbeacon-relay-v2` (main API relay), `craftbeacon-report-request`, `craftbeacon-member-name`, `craftbeacon-signup-bridge`.
- **AI:** Anthropic API — Haiku for free tier, Sonnet for paid.
- **Auth/membership:** Outseta (subdomain `the-craft-beacon.outseta.com`).
- **Database:** Supabase, project `craftbeacon-sessions`.
- **Email:** MailerLite (newsletter "The Beacon Brief"), Resend (transactional alerts).
- **Analytics:** Google Analytics `G-FRZ967M5K9`, Meta Pixel `1659330215146600`.

Tiers: Free (Haiku, 5 msgs/session), Writing Lane, Marketing Lane, Production Lane, Premium (Sonnet, all lanes).

## Deploy rules — read before shipping

**Always deploy with a fresh `git push`.** The Re-run button on GitHub's built-in Pages workflow queues forever and cannot be cancelled. Never use it.

If deploys repeatedly fail with the generic error and githubstatus.com is green, the fix is the unpublish/republish environment reset in Settings → Pages.

Verify green in the Actions tab before live-testing.

**Cloudflare Workers:** `ctx.waitUntil()` is required for any background work — logging, memory updates, email sends. Workers terminate the instant the response returns and will kill un-awaited background tasks. Cloudflare has built-in rollback; deploy by editing in place.

**Supabase:** tables created via migration do NOT automatically get the `service_role` grants the Supabase UI adds silently. Apply grants explicitly in the migration and verify immediately with `information_schema.role_table_grants`. Skipping this causes silent 502s.

## Do not touch without checking first

**`newsletter.html` conversion machinery.** Three script blocks near the bottom were built and verified July 12, 2026 (commit `4ac759d`) to fix an ~85% bounce rate:

1. The floating-subscribe `IntersectionObserver` (hides the button when the signup section scrolls into view).
2. The MailerLite `MutationObserver` that watches for the success state and fires the Meta Pixel `Lead` + GA4 `newsletter_signup` events **exactly once, on genuine submission**.
3. The ad-blocker fallback timeout that reveals a hosted-form link if the embed fails to render.

Do not modify, reorder, or "clean up" these. The Lead event must fire only on real form submission — never on page load or button click. Use custom events for CTA clicks.

**Content Security Policy:** every page carries a CSP meta tag, scoped per-page. Allow a provider only on pages that actually load it — never apply broad permissions site-wide. `dashboard.html` deliberately has NO Google Analytics and NO Meta Pixel (removed on privacy grounds) and its CSP is tightened to match. Don't add them back.

**Escaping:** user-facing text passes through `escapeHtml()` inside `renderText()`. Keep it.

## Page-level design principles

- **Single-purpose landing pages** (newsletter, signup/pricing, ad landing pages): strip the global nav links. Keep the logo linking home as the one escape hatch, and keep Sign in / Start free — those are conversion actions, not distractions.
- **Content and SEO pages** (`journey.html`, `guide.html`, `resources.html`): keep full nav. These exist to build trust and rank organically; we *want* readers wandering deeper into the site.
- The rule: strip nav only where the page has a single transactional ask.

## Working with Patrick on this repo

- **Read the actual deployed file before writing changes.** Pull from `raw.githubusercontent.com/conwatcher/craftbeacon/main/[filename]` — that matches what's live, unlike a fetch of the rendered site.
- Deliver changes as find-and-replace operations. Patrick applies them in VS Code and reads through each edit to understand the logic — he'll flag anything that doesn't make sense rather than applying blind.
- One change at a time, confirm before the next.
- For significant relay changes, use the parallel-Worker pattern: deploy a new Worker first, update the dashboard `RELAY` constant, keep the original as instant rollback.
- For new Workers, mirror first — read the actual payload before writing logic against assumed field names.

## Authorship-distinction flag

Session summaries and the Author Decision Record must explicitly state that records reflect **coaching activity**, are not transcripts, and make no claim about manuscript authorship. This flag is deliberate architecture. Preserve it in all record-related work.
