# CraftBeacon — Re-Entry Brief
*Last updated: June 11, 2026*

---

## What CraftBeacon Is

An AI writing coach for fiction and narrative nonfiction authors at thecraftbeacon.com. Five membership tiers: Free, Writing Lane ($10/mo or $96/yr), Marketing Lane ($10/mo or $96/yr), Production Lane ($10/mo or $96/yr), Premium ($29/mo or $276/yr). The platform never generates content — it coaches only. GitHub Pages front end. Val.town relay to Anthropic API. Outseta for membership and payments. Supabase for session logging. Google Analytics (G-FRZ967M5K9).

**Launch date: June 15, 2026.**

---

## Current Platform State

The platform is live and functional at thecraftbeacon.com. All core systems confirmed working: tier gating, message limits, badge behavior, file upload (.txt and .md, paid tiers only, 50,000-character limit), Outseta authentication, Supabase session logging, Val.town AI relay, Google Analytics.

**Pricing section** has been fully rebuilt. The nav Start Free button is wired directly to the Free tier Outseta signup URL. The pricing grid shows three lane cards in a row (Writing, Marketing, Production) each with individual Outseta signup buttons and annual pricing displayed. Premium sits below as a featured centered card (~760px wide) with a 10-item outcome-oriented feature list and Go Premium button. SVG icons (quill, broadcast signal, gear, lighthouse) appear above each tier name. A "free tier available — no time limit" note sits in the section header.

**Dashboard** has a Manage Account link in the nav bar pointing to the-craft-beacon.outseta.com/profile — Outseta's native billing portal where members can change plan, update billing, or cancel.

**Val.town relay** is set to max_tokens: 4000. Model: claude-sonnet-4-20250514.

**Stress tests** — all 13 tests passed. No content generation failures, no security breaches, no scope violations. One known edge case: B3 (crisis false positive) — when a user presents self-harm language in an explicit fictional framing, the system leans toward caution and partially deploys the crisis protocol rather than treating it purely as a craft question. Acceptable behavior but worth smoothing post-launch.

**Mobile Chrome login loop** — still deferred. Token stores correctly but dashboard fails to read it. Needs a dedicated fix session. Browser notice banner is live on index.html directing Chrome mobile users to Safari or Firefox.

---

## Key URLs and Architecture

- **Live site:** https://thecraftbeacon.com
- **GitHub repo:** https://github.com/conwatcher/craftbeacon
- **Outseta admin:** https://the-craft-beacon.outseta.com
- **Val.town relay:** https://conwatcher--725351085ceb11f1822e1607ee4eb77e.web.val.run
- **Supabase project:** craftbeacon-sessions (East US Ohio) — coaching_sessions table
- **Google Analytics:** G-FRZ967M5K9

**Outseta Plan UIDs** (in Patrick's Vault):
- Free: dQGgqpQ4
- Writing Lane: OW48a3Wg
- Marketing Lane: XQYaGRQP
- Production Lane: wQXNDaWK
- Premium: L9P3lEQJ

---

## Session Management Documents (GitHub)

- Re-Entry Brief: https://github.com/conwatcher/craftbeacon/blob/main/CraftBeacon-ReEntryBrief.md
- Decisions Log: https://github.com/conwatcher/craftbeacon/blob/main/CraftBeacon-DecisionsLog.md
- Session Ritual: https://github.com/conwatcher/craftbeacon/blob/main/CraftBeacon-SessionRitual.md

*Note: Use github.com/blob/ URL format with web_fetch — raw.githubusercontent.com is blocked in this environment.*

---

## Open Items

- **Mobile Chrome login loop** — token stores but dashboard can't read it. Deferred. Fix in dedicated session.
- **B3 crisis false positive** — post-launch smoothing. Add clearer fictional context signal handling to system prompt.
- **Response length tuning** — monitor after launch. If coaching responses run consistently long, add concision guidance to prompt.
- **Model routing by tier** — Haiku for Free, Sonnet for paid — deferred cost-management item.
- **Persistent user context architecture** — deferred.
- **Custom pricing page** — completed this session (replaced existing section on index.html).

---

## How to Start a Session

Paste the continuation prompt from the last session handoff. If returning cold, read this document first, then check the Decisions Log for recent choices before touching any code.
