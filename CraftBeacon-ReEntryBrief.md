# CraftBeacon — Re-Entry Brief

*This document is updated at the close of each session and read at the start of the next one.*
*Last updated: June 16, 2026*

---

## Where We Stand

CraftBeacon is live and functional end-to-end. GitHub Pages front end at thecraftbeacon.com, Val.town AI relay connected to the Anthropic API, Outseta handling memberships and payments via Stripe, and Supabase logging coaching sessions. The dashboard is working with streaming responses and a free-tier message counter. Mobile Chrome login is fully functional alongside desktop browsers and mobile Safari.

The platform has crossed launch and is actively acquiring users. Google Analytics for the first week shows healthy traction: 164 homepage views, 100 dashboard views (400% growth), 24 Resources page views. Traffic is splitting cleanly across Direct (72), Organic Social (31), Paid Social (16), and Referral (14). US dominant, UK second.

First paid ads are live and running — video teaser at $2/day x 5 days and best-performing launch post at $5/day x 5 days. Don't touch them yet.

Organic growth signals are emerging: followers, shares, and 8 email subscribers and climbing.

---

## Test Accounts

Two test accounts are maintained for edge case testing across tiers:

- **conwatcher@gmail.com** — Free tier
- **pjcereste@gmail.com** — Premium tier

Both confirmed working correctly as of this session.

---

## Last Session

We built and activated the CraftBeacon welcome email drip campaign in Outseta. This had been a gap since launch — new subscribers were receiving Outseta's system confirmation email but no CraftBeacon welcome. The drip is now live and running.

What was accomplished:
- Located the welcome email copy from the June 9 manual send
- Uploaded the CraftBeacon lighthouse logo to the Outseta organization profile, replacing the default circular placeholder icon
- Built a new drip campaign called "Welcome Email" triggered on subscription to the CraftBeacon Subscribers mailing list
- Set sender to Patrick (patrick@thecraftbeacon.com)
- Built the email using the Simple Text template with the lighthouse logo header and full welcome copy
- Activated the drip with the "Start drip to existing users" option checked — all existing subscribers received the email immediately upon activation
- Confirmed delivery: the email landed in inbox (not spam) within seconds of activation, with correct logo, subject line, and sender display

The Outseta welcome email header logo mystery is also resolved — it lives in the organization Profile accessible by clicking "The Craft Beacon" in the top left of the Outseta dashboard.

---

## Drinks in the Fridge

*Things that exist, are approved or started, but have not been finished yet.*

- **Newsletter infrastructure — standalone signup** — Next priority. Strategy confirmed: build a signup path for the newsletter that does not require a CraftBeacon account, so free users and casual visitors can subscribe without joining the service. This opens the list to a wider audience beyond paying and free-tier members. Outseta has a Lists feature that may support this; needs investigation.
- **Newsletter content — drip sequence** — Build a preset sequence of tips, craft observations, and author guidance emails that go out on a regular cadence (every two weeks discussed). This gives new subscribers ongoing value and keeps the list warm between major announcements. First issue and format not yet defined.
- **Weekly tips newsletter — first issue** — The welcome email promises a monthly newsletter. Format, cadence (monthly vs. every two weeks), and first issue content not yet built.
- **Model routing by tier** — Haiku for free tier, Sonnet for paid tiers in the Val.town relay. Currently all tiers route to the same model. Flagged as a cost-management item. Not urgent yet.
- **Author Decision Record** — a downloadable PDF report for Premium members showing coaching session summaries. Requires enriching Supabase session logging first. Future build item.
- **Supabase inactivity warning** — managed via Friday evening calendar reminder to use Premium test account for 15 minutes until real subscriber activity takes over.
- **Analytics strategy** — Google Analytics is installed and producing data, but no defined measurement plan, event tracking, or early-signal dashboard exists yet.
- **Email/onboarding sequences** — no free tier onboarding email, no nurture sequence exists yet beyond the welcome drip.
- **Organic marketing voice — lottery ticket framing** — Patrick's "lottery ticket" comment in a Facebook author group continues to resonate. Worth considering for future pain point posts, ad copy, and potentially homepage messaging.
- **Two-piece marketing strategy — resources page as standalone asset** — run two parallel marketing streams: (1) brand and service marketing via scheduled posts, (2) resources page promotion framed purely as a free tool for authors with no mention of subscriptions.

---

## Ongoing Disciplines

*Practices that continue across sessions, not pending tasks.*

- **Adversarial prompt testing** — Patrick is jumping on the platform at least a couple times per day to push its limits, try new angles, and stress-test the content generation line.

---

## Decisions Pending

*Questions that are blocking or will soon block forward progress.*

- **Newsletter platform decision** — can Outseta's Lists/drip system handle a standalone public signup for non-members, or does this require a separate tool? Needs investigation before building the signup path.
- **Newsletter cadence** — monthly (as promised in welcome email) or every two weeks (discussed this session)? Decision needed before building the drip sequence.
- **Lane stacking** — can members subscribe to multiple individual lanes without going Premium? Pricing decision needed.
- **Persistent user context architecture** — how will Premium tier memory across sessions be built? Not urgent yet.
- **Multilingual/localization strategy** — English-first or built toward genuine localization from the start?

---

## Key Lessons Logged This Session

- **Outseta drip campaigns are the correct mechanism for automated welcome emails** — not broadcasts (one-time manual sends) and not transactional emails (system-level account notifications).
- **The "Start drip to existing users" checkbox on activation** sends the drip immediately to everyone already on the list. This eliminated the need for a separate broadcast to existing subscribers.
- **The Outseta organization logo lives in the Profile modal** accessed by clicking the account name in the top left of the dashboard — not in the Design section, not in Email settings.
- **Outseta's email editor is capable but fiddly** — slight cursor misses select wrong elements. Work slowly and deliberately, especially when deleting placeholder content.
- **Welcome emails should send immediately** — not delayed. The orientation value is highest in the first minutes after signup.

---

## Next Action

Investigate whether Outseta's Lists feature supports a public-facing standalone newsletter signup that doesn't require a CraftBeacon account. If yes, build the signup path. If no, evaluate whether a lightweight external tool is needed. After that, begin planning the newsletter drip sequence — format, cadence, and first issue content.

Say "Bring me up to speed" at the start of the next thread.

---

*How to use this document: At the start of any new CraftBeacon session, tell Claude "read the Re-Entry Brief and orient me." Claude will read this file, brief you in plain language on where things stand, and you can move directly into work. At the close of any session, ask Claude to update this document before you leave.*
