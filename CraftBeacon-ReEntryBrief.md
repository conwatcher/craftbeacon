# CraftBeacon — Re-Entry Brief

*This document is updated at the close of each session and read at the start of the next one.*
*Last updated: June 16, 2026*

---

## Where We Stand

CraftBeacon is live and functional end-to-end. GitHub Pages front end at thecraftbeacon.com, Val.town AI relay connected to the Anthropic API, Outseta handling memberships and payments via Stripe, and Supabase logging coaching sessions. The dashboard is working with streaming responses and a free-tier message counter.

The platform has crossed launch and is actively acquiring users. Google Analytics for the first week shows healthy traction: 164 homepage views, 100 dashboard views (400% growth — meaning real signups, not just curiosity traffic), 24 Resources page views. Traffic is splitting cleanly across Direct (72), Organic Social (31), Paid Social (16), and Referral (14). US dominant, UK second.

First paid ads are live and running — video teaser at $2/day x 5 days and best-performing launch post at $5/day x 5 days. Don't touch them yet.

Organic growth signals are emerging: followers, shares, and 8 email subscribers and climbing.

---

## Last Session

We resolved the mobile Chrome login loop that had been blocking real users since launch. This had been an open item across multiple sessions with several failed fix attempts. It turned out to be four stacked problems, not one — JWT base64 padding stricter on mobile Chrome, Outseta script blocking page execution, a race condition between the old initAuth function and the new bootDashboard, and URL cleanup firing before dashboard render with no fallback. Combination of all four fixes resolved it. Tablet Chrome login now lands cleanly on the dashboard, faster than expected.

The temporary amber "mobile Chrome unsupported" banner has been removed from index.html. New visitors see a clean homepage.

We also resolved a workflow understanding issue: GitHub repository documents can only be reliably fetched at session start when working from a desktop browser. Mobile fetches frequently fail. Patrick's workflow adjusts — only update session documents from the laptop, never from phone or tablet.

---

## Drinks in the Fridge

*Things that exist, are approved or started, but have not been finished yet.*

- **Outseta welcome email** — needs verification that it's active and sending. Source of header logo not yet located in Outseta interface. Next priority.
- **Weekly tips newsletter** — structure and first issue not yet built. Strategy: lesser tip on Facebook pointing to full weekly newsletter, field guide as subscriber gift. Cross-posting approach confirmed.
- **Patrick's Outseta account** — needs to be set to Premium so all tier behaviors can be tested without charges. Not yet done.
- **Sections 4 and 5 of the system prompt** — drafted and approved in the section files but not yet integrated into the condensed live prompt running on Val.town.
- **Referral system text** — drafted and approved for Section 3.4 of the system prompt documents but not yet inserted into the file.
- **Model routing by tier** — Haiku for free tier, Sonnet for paid tiers in the Val.town relay. Currently all tiers route to the same model. Flagged as a cost-management item. Not urgent yet.
- **Author Decision Record** — a downloadable PDF report for Premium members showing coaching session summaries. Requires enriching Supabase session logging first. Future build item.
- **Supabase inactivity warning** — managed via Friday evening calendar reminder to use Premium test account for 15 minutes until real subscriber activity takes over. Long term: upgrade to Supabase Pro (~$25/month) once consistent paying users.
- **Adversarial prompt testing** — using Claude to systematically try to break CraftBeacon's content generation line before more testers see it. Patrick has compiled suggestions from other AI tools. Session not yet run.
- **Analytics strategy** — Google Analytics is installed and producing data, but no one has defined what to measure long-term, what events to track, or what a useful early-signal dashboard looks like.
- **Custom pricing page** — not yet built. Five individual Outseta plan signup URLs are saved in Patrick's Vault. Page should present tiers in Patrick's preferred order with full CraftBeacon brand styling rather than Outseta's alphabetically fixed display.
- **Email/onboarding sequences** — no tester offboarding email, no free tier onboarding email, no nurture sequence exists yet.
- **Organic marketing voice — lottery ticket framing** — Patrick's "lottery ticket" comment in a Facebook author group continues to resonate. Worth considering for future pain point posts, ad copy, and potentially homepage messaging.
- **Two-piece marketing strategy — resources page as standalone asset** — strategy identified to run two parallel marketing streams: (1) brand and service marketing via scheduled posts, (2) resources page promotion framed purely as a free tool for authors with no mention of subscriptions. Next: identify communities and question types where resources page drops are most natural.

---

## Decisions Pending

*Questions that are blocking or will soon block forward progress.*

- **Lane stacking** — can members subscribe to multiple individual lanes without going Premium? Pricing decision needed before this can be resolved in the system prompt.
- **Persistent user context architecture** — how will Premium tier memory across sessions be built? Architectural decision pending. Not urgent yet.
- **Multilingual/localization strategy** — English-first or built toward genuine localization from the start? Has downstream implications. No decision made.
- **Logo lighthouse concept** — three lane lights, one lit per subscribed lane, all rotating for Premium. Explore as brand identity and UI membership indicator. No decision made.

---

## Key Lessons Logged This Session

- **Mobile browsers cache JavaScript more aggressively than browsing data clearing handles.** When updates don't appear after deployment, appending a query parameter like `?v=2` forces a fresh fetch. Worth remembering for any future code changes that need to be tested on mobile.
- **GitHub document fetching is desktop-only in Patrick's workflow.** Mobile fetches fail. Update session documents from the laptop only.
- **The Actions tab is no longer live-updating in real time.** Refresh manually to see build status.

---

## Next Action

Verify the Outseta welcome email is active and sending. If active, locate the header logo source for branding consistency. After that, begin planning the weekly tips newsletter structure — first issue, format, and cadence.

Say "Bring me up to speed" at the start of the next thread.

---

*How to use this document: At the start of any new CraftBeacon session, tell Claude "read the Re-Entry Brief and orient me." Claude will read this file, brief you in plain language on where things stand, and you can move directly into work. At the close of any session, ask Claude to update this document before you leave.*
