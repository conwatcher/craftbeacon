# CraftBeacon — Re-Entry Brief
*This document is updated at the close of each session and read at the start of the next one.*
*Last updated: June 9, 2026*

---

## Where We Stand

CraftBeacon launched June 15th. The full technical stack is live and functional end-to-end: GitHub Pages front end at thecraftbeacon.com, Val.town AI relay connected to the Anthropic API, Outseta handling memberships and payments via Stripe, and Supabase logging coaching sessions. The dashboard is working with streaming responses and a free-tier message counter. Approximately three Premium beta testers have confirmed the platform is intuitive and that the content generation line holds. A 13-post Facebook social media schedule is live in Meta Business Suite running through July 1.

The homepage (index.html) currently has no real styling — it is bare bones with two buttons. That is the most visible remaining build priority.

---

## Last Session

We built the complete session management system from scratch. This included the Re-Entry Brief (this document), the Decisions Log, and the Session Ritual — three documents now saved in the root of the CraftBeacon GitHub repository. We also updated the threaded handoff skill to include document updates as part of every session close-out. The opening phrase for new sessions is "Bring me up to speed." The save workflow is: download updated docs at session end, drag to the CraftBeacon folder on the D drive, commit and sync in VS Code.

---

## Drinks in the Fridge
*Things that exist, are approved or started, but have not been finished yet.*

- **Homepage styling** — index.html is bare bones. This is the most visible incomplete item on the entire platform. No work started yet.
- **Patrick's Outseta account** — needs to be set to Premium so all tier behaviors can be tested without charges. Not yet done.
- **Sections 4 and 5 of the system prompt** — drafted and approved in the section files but not yet integrated into the condensed live prompt running on Val.town.
- **Referral system text** — drafted and approved for Section 3.4 of the system prompt documents but not yet inserted into the file.
- **Model routing by tier** — Haiku for free tier, Sonnet for paid tiers in the Val.town relay. Currently all tiers route to the same model. Flagged as a cost-management item. Not urgent yet.
- **Instagram connection** — resolved. Instagram is now connected to Meta Business Suite and posts have been made through the account. Both Facebook and Instagram are active.
- **Author Decision Record** — a downloadable PDF report for Premium members showing coaching session summaries. Requires enriching Supabase session logging first. Future build item.
- **Adversarial prompt testing** — using Claude to systematically try to break CraftBeacon's content generation line before more testers see it. Identified this session as a high-value task never yet attempted.
- **Analytics strategy** — Google Analytics is installed on both pages but no one has defined what to measure, what events to track, or what a useful early-signal dashboard looks like.
- **Email/onboarding sequences** — no tester offboarding email, no free tier onboarding email, no nurture sequence exists yet.
- **Threaded handoff skill** — updated this session to include document updates as part of close-out. Confirmed saved.

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

Resume CraftBeacon product work — the most visible remaining build priority is the homepage (index.html), which currently has no styling. Say "Bring me up to speed" at the start of the next thread and we'll pick up from there.

---

*How to use this document: At the start of any new CraftBeacon session, tell Claude "read the Re-Entry Brief and orient me." Claude will read this file, brief you in plain language on where things stand, and you can move directly into work. At the close of any session, ask Claude to update this document before you leave.*
