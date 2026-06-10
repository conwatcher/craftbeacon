# CraftBeacon — Re-Entry Brief

*This document is updated at the close of each session and read at the start of the next one. Last updated: June 9, 2026*

---

## Where We Stand

CraftBeacon launched June 15th. The full technical stack is live and functional end-to-end: GitHub Pages front end at thecraftbeacon.com, Val.town AI relay connected to the Anthropic API, Outseta handling memberships and payments via Stripe, and Supabase logging coaching sessions. The dashboard is working with streaming responses and a free-tier message counter. Several Premium beta testers have confirmed the platform is intuitive and that the content generation line holds. A 13-post Facebook social media schedule is live in Meta Business Suite running through July 1. The homepage is fully styled and live. The resources page sidebar contrast was improved this session based on user feedback.

---

## Last Session

Addressed readability feedback from a community member about the resources page. Changed the `--cb-dim` color variable from `#5a5448` to `#9a8f82` in both resources.html and index.html, improving contrast on the sidebar navigation and the homepage lane card bullet points. Both files committed and synced. Also cleaned up the Re-Entry Brief and Decisions Log to remove stale items.

---

## Upcoming

Patrick leaves for a writing retreat Friday morning, June 13th. Return date TBD. Resume CraftBeacon work after the retreat. Say "Bring me up to speed" at the start of the next session.

---

## Drinks in the Fridge

*Things that exist, are approved or started, but have not been finished yet.*

- **Outseta brand styling** — the Outseta account portal used by members has not been styled to match CraftBeacon's visual identity. Needs attention.
- **Email footer address** — current welcome email footer uses a placeholder address. Replace with PO Box or virtual address when available. Future item.
- **Adversarial prompt testing** — post-retreat task. Use Cowork to assign an agent to attempt content generation workarounds against the live CraftBeacon system. Goal is to surface gaps in the redirect protocol before broader user growth.
- **Analytics strategy** — Google Analytics is installed on both pages but no events are defined and no dashboard exists. Needs a dedicated session to define what early-signal metrics actually matter.
- **Two-piece marketing strategy** — resources page as a standalone community drop asset is working. Next step: identify the best recurring questions and communities where the resources page link is most natural. IngramSpark groups, debut author communities, and self-publishing process groups are the starting points.
- **Email and onboarding sequences** — no free tier onboarding email, no nurture sequence exists yet.
- **Author Decision Record** — downloadable PDF for Premium members showing coaching session history. Requires enriching Supabase session logging first. Future build item.
- **Model routing by tier** — Haiku for free tier, Sonnet for paid. Currently all tiers use the same model. Cost-management item, not urgent at current scale.

---

## Decisions Pending

*Questions that are blocking or will soon block forward progress.*

- **Lane stacking** — can members subscribe to multiple individual lanes without going Premium? Pricing decision needed.
- **Persistent user context architecture** — how will Premium tier memory across sessions be built? Not urgent yet.
- **Multilingual and localization strategy** — English-first confirmed for now; full localization decision deferred.
- **Paid ad boosting** — posts around June 27–29 are first boosting candidates. Budget decision needed around that time.

---

## Supabase Maintenance

To keep the free tier active, log into the Premium test account and run a coaching session for 10–15 minutes on the first day of each week. Calendar entries are set. If the project is ever paused, reactivation is manual. Upgrade to Supabase Pro at roughly $25 per month once consistent paying users exist.

---

*How to use this document: at the start of any new CraftBeacon session, say "Bring me up to speed" and Claude will read this file and orient you. At the close of any session, ask Claude to update this document before you leave.*
