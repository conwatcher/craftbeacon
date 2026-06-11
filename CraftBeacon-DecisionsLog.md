# CraftBeacon — Decisions Log
*Append-only. Most recent entries at the top.*

---

## Session: June 11, 2026

**Pricing section rebuilt — custom layout replacing 5-card grid**
Old layout had all five tiers in a single row with no signup buttons. New layout: three lane cards in a row (Writing, Marketing, Production) each with individual Outseta signup buttons wired to their specific plan UIDs. Premium sits below as a centered featured card (~760px wide) with a two-column layout (left: icon, name, price, description, button; right: 10-item feature list with amber divider). The Free tier card was removed from the grid entirely.

**Start Free nav button wired to Free tier Outseta URL**
Previously pointed to the generic Outseta register page where users saw the full plan selection screen. Now goes directly to Free tier signup (planUid: dQGgqpQ4). Rationale: the nav button's only job is getting someone into the platform — the plan selection screen was an unnecessary extra step.

**Free tier mention moved to pricing section header**
A small italic line reading "A free tier is also available — no time limit, no credit card required." added below the section header paragraph. Keeps the free tier visible without a card in the grid.

**Annual pricing displayed on all tier cards**
Each card now shows the annual equivalent below "per month" — $96/yr for each lane, $276/yr for Premium — in a small amber italic line. Gives comparison shoppers the information without cluttering the main price.

**SVG icons added to pricing cards**
Inline SVG icons in amber at 75% opacity above each tier name: quill (Writing Lane), broadcast signal arcs (Marketing Lane), radial gear (Production Lane), lighthouse with beam (Premium). No image files — all drawn in code.

**Premium feature list expanded from 4 category labels to 10 outcome-oriented items**
Previous list named lane categories generically. New list describes specific deliverables: scene diagnosis, character/motivation/voice coaching, structure/pacing/tension analysis, revision strategy, platform assessment, newsletter strategy, launch orientation, formatting specs, distribution guidance, and "more as your author journey grows." Description line updated to "All three coaching lanes in one membership. Craft, platform, and production support — wherever the work takes you."

**Account management added to dashboard nav**
"Manage account" link added to dashboard.html nav bar pointing to the-craft-beacon.outseta.com/profile. Outseta's native billing portal — members can change plan, update payment, or cancel from there. Confirmed working in testing (Profile, Account, Plan, and Billing tabs all functional).

**max_tokens bumped to 4000 in Val.town relay**
Was set at 2000. Responses were hitting the token ceiling mid-sentence on detailed framework-level coaching responses. 4000 doubles the ceiling without increasing cost on shorter responses (charged per token generated, not per max_tokens value).

**Stress tests completed — all 13 passed**
Ran full pre-launch security and behavior audit across four sections: content generation boundary (A1–A5), safety guardrails (B1–B3), system security (C1–C2), scope and tier (D1–D4). No failures. One edge case noted: B3 (crisis false positive) — system leans cautious when self-harm language appears even in explicit fictional framing. Logged as post-launch smoothing item, not a launch blocker. Results stored in Google Sheet "CraftBeacon Stress Test Results" in Patrick's Drive.

**Val.town idle polling — confirmed not an issue**
Patrick raised concern about API being called when no users are active. Confirmed Val.town uses serverless architecture — relay only activates on incoming requests. No idle polling, no background charges.

---

## Session: June 8–9, 2026

**Instagram promo video scheduled in Meta Business Suite**
1:1 ratio format. Caption written and scheduled.

**Mobile Chrome login fix — partial, deferred**
Auth mode changed to redirect, button handlers updated, dashboard token-reading expanded to check hash fragments and sessionStorage. Token confirmed storing correctly but dashboard still fails to read it. Browser notice banner added to index.html warning Chrome mobile users, directing to Safari or Firefox. Full fix deferred to dedicated session.

---

## Session: Pre-launch build (various dates, May–June 2026)

**DOCX support removed**
Simple XML tag stripping caused hallucination of manuscript content. Correct fix was removal of DOCX support entirely. .txt and .md only, 50,000-character limit.

**Outseta native email chosen over MailerLite**
MailerLite lacks native Outseta integration. CraftBeacon Subscribers list built in Outseta with welcome email attached and automatic opt-in wired through Auth settings.

**Red Foundations Publishing footer removed from index.html and dashboard.html**
Brand separation between CraftBeacon and RFU maintained. CraftBeacon is a standalone product identity.

**Free tier copy — "no time limit" preferred over "no credit card required"**
"No credit card required" tested poorly — triggers mild suspicion. "Free tier available — no time limit" is the approved phrasing across all assets.

**Model routing by tier deferred**
Haiku for Free / Sonnet for paid was considered for cost management. Not implemented — all calls currently route to claude-sonnet-4-20250514. Flagged for post-launch review.
