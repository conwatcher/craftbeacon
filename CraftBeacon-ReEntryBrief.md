# CraftBeacon — Re-Entry Brief
*This document is updated at the close of each session and read at the start of the next one.*
*Last updated: June 9, 2026*

---

## Where We Stand

CraftBeacon launched June 15th. The full technical stack is live and functional end-to-end: GitHub Pages front end at thecraftbeacon.com, Val.town AI relay connected to the Anthropic API, Outseta handling memberships and payments via Stripe, and Supabase logging coaching sessions. The dashboard is working with streaming responses and a free-tier message counter. Approximately three Premium beta testers have confirmed the platform is intuitive and that the content generation line holds. A 13-post Facebook social media schedule is live in Meta Business Suite running through July 1.

The homepage (index.html) currently has no real styling — it is bare bones with two buttons. That is the most visible remaining build priority.

---

## Last Session

We spent this session identifying structural gaps in how Patrick and Claude have been working together, specifically the fragmented memory problem that makes every re-entry disorienting. We identified that this is a real and consistent pattern across Patrick's daily life, not just Claude sessions. We designed the Re-Entry Brief as the first solution — a short living document that orients Patrick at the start of every session and surfaces open loops so nothing stays forgotten in the fridge. This document is the result of that session.

---

## Drinks in the Fridge
*Things that exist, are approved or started, but have not been finished yet.*

- **Homepage styling** — index.html is bare bones. This is the most visible incomplete item on the entire platform. No work started yet.
- **Patrick's Outseta account** — needs to be set to Premium so all tier behaviors can be tested without charges. Not yet done.
- **Sections 4 and 5 of the system prompt** — drafted and approved in the section files but not yet integrated into the condensed live prompt running on Val.town.
- **Referral system text** — drafted and approved for Section 3.4 of the system prompt documents but not yet inserted into the file.
- **Model routing by tier** — Haiku for free tier, Sonnet for paid tiers in the Val.town relay. Currently all tiers route to the same model. Flagged as a cost-management item. Not urgent yet.
- **Instagram connection** — Meta Business Suite connection unresolved. Deprioritized pending fix. Facebook running fine without it.
- **Author Decision Record** — a downloadable PDF report for Premium members showing coaching session summaries. Requires enriching Supabase session logging first. Future build item.
- **Adversarial prompt testing** — using Claude to systematically try to break CraftBeacon's content generation line before more testers see it. Identified this session as a high-value task never yet attempted.
- **Analytics strategy** — Google Analytics is installed on both pages but no one has defined what to measure, what events to track, or what a useful early-signal dashboard looks like.
- **Email/onboarding sequences** — no tester offboarding email, no free tier onboarding email, no nurture sequence exists yet.
- **Decisions log** — identified this session as a needed document. Not yet built. Next session item.

---

## Decisions Pending
*Questions that are blocking or will soon block forward progress.*

- **Lane stacking** — can members subscribe to multiple individual lanes without going Premium? Pricing decision needed before this can be resolved in the system prompt.
- **Persistent user context architecture** — how will Premium tier memory across sessions be built? Architectural decision pending. Not urgent yet.
- **Multilingual/localization strategy** — English-first or built toward genuine localization from the start? Has downstream implications. No decision made.
- **Logo lighthouse concept** — three lane lights, one lit per subscribed lane, all rotating for Premium. Explore as brand identity and UI membership indicator. No decision made.
- **Paid ad boosting** — posts around June 27–29 identified as first boosting candidates. Budget expected around that time. No action needed yet.

---

## Next Action

Build the Decisions Log — a companion document to this one that records every architectural and strategic choice already made, with the reasoning behind each decision, so nothing has to be re-figured out from scratch.

---

*How to use this document: At the start of any new CraftBeacon session, tell Claude "read the Re-Entry Brief and orient me." Claude will read this file, brief you in plain language on where things stand, and you can move directly into work. At the close of any session, ask Claude to update this document before you leave.*
