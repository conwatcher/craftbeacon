# CraftBeacon — Re-Entry Brief

*This document is updated at the close of each session and read at the start of the next one.*
*Last updated: June 9, 2026*

---

## Where We Stand

CraftBeacon launches June 15th. The full technical stack is live and functional end-to-end: GitHub Pages front end at thecraftbeacon.com, Val.town AI relay connected to the Anthropic API, Outseta handling memberships and payments via Stripe, and Supabase logging coaching sessions. The dashboard is working with streaming responses and a free-tier message counter. Approximately three Premium beta testers have confirmed the platform is intuitive and that the content generation line holds. A 13-post Facebook social media schedule is live in Meta Business Suite running through July 1.

The subscriber email system is now fully built and live. New signups are automatically added to the CraftBeacon Subscribers list in Outseta and receive the welcome email immediately. The welcome email was tested and confirmed delivered. The monthly newsletter infrastructure is ready in Outseta Broadcasts whenever the first issue is written.

The homepage (index.html) is complete and live. The most visible remaining item is Patrick's Outseta account still needing to be set to Premium for testing.

---

## Last Session

We built the complete subscriber email system from scratch in one session. This included writing the welcome email, creating the CraftBeacon Subscribers list in Outseta with the welcome email attached, and wiring Outseta signups to automatically add new members to that list and trigger the welcome email. The system was tested live — welcome email confirmed delivered to conwatcher@gmail.com. We decided to use Outseta's built-in email tools rather than MailerLite for CraftBeacon, keeping everything in one platform and eliminating an unnecessary third service. GitHub Desktop was also found on Patrick's laptop, discussed, and removed — VS Code remains the single development tool for both projects.

---

## Drinks in the Fridge

*Things that exist, are approved or started, but have not been finished yet.*

- **MailerLite CraftBeacon account** — needs to be deleted. We switched to Outseta for CraftBeacon email. The unused MailerLite API key in the vault should also be removed.
- **Outseta brand styling** — CraftBeacon brand colors and logo need to be configured in Outseta's Design section so the account avatar and email styling look on-brand rather than showing the default icon.
- **Email footer address** — Outseta's email footer currently shows Patrick's home address. Should be replaced with a PO Box or virtual mailbox address for privacy and professionalism. Not urgent.
- **Patrick's Outseta account** — needs to be set to Premium so all tier behaviors can be tested without charges. Not yet done.
- **Section prompt file cleanup** — the individual section files (CraftBeacon01 through 05) have carry-forward notes at the bottom that have caused confusion. These should be scanned and cleared. Scan each one before deleting to confirm nothing unresolved is hiding there that never made it into the full prompt or orientation documents.
- **Sections 4 and 5 of the system prompt** — drafted and approved in the section files but not yet integrated into the condensed live prompt running on Val.town.
- **Referral system text** — drafted and approved for Section 3.4 of the system prompt documents but not yet inserted into the file.
- **Model routing by tier** — Haiku for free tier, Sonnet for paid tiers in the Val.town relay. Currently all tiers route to the same model. Flagged as a cost-management item. Not urgent yet.
- **Author Decision Record** — a downloadable PDF report for Premium members showing coaching session summaries. Requires enriching Supabase session logging first. Future build item.
- **Supabase inactivity warning** — received email June 9, 2026 warning that craftbeacon-sessions project is scheduled to be paused due to insufficient activity. Short term fix: log into Premium test account and run a few coaching exchanges every few days to register activity. Long term fix: upgrade to Supabase Pro (~$25/month) once CraftBeacon has consistent paying users. Do not ignore — if paused, session logging stops working entirely.
- **Adversarial prompt testing** — using Claude to systematically try to break CraftBeacon's content generation line before more testers see it. Identified as a high-value task never yet attempted.
- **Analytics strategy** — Google Analytics is installed on both pages but no one has defined what to measure, what events to track, or what a useful early-signal dashboard looks like.
- **Organic marketing voice — capture for future copy** — Patrick's comment in a Facebook author group about the "lottery ticket" gap between debut author expectations and publishing reality got four likes and an unprompted endorsement from a community member who dropped the CraftBeacon link organically. The "expectation vs reality for debut authors" angle resonated authentically and should be considered for future pain point posts, ad copy, and potentially homepage messaging.
- **Two-piece marketing strategy — resources page as standalone asset** — the Author Resources page at thecraftbeacon.com/resources.html is proving effective as a no-friction community drop. Run two parallel marketing streams: (1) brand and service marketing via scheduled posts and launch content, and (2) resources page promotion framed purely as a free tool for authors with no mention of coaching or subscriptions.
- **Newsletter — first monthly issue** — infrastructure is ready in Outseta Broadcasts. Content not yet written. Monthly cadence confirmed.
- **Free tier opt-in checkbox** — a pre-checked newsletter opt-in should be added to the Outseta signup form so free tier users are automatically offered the newsletter at signup. This was discussed but not yet implemented.

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

Patrick is on a writing retreat through approximately June 13–14. Return to CraftBeacon work after the retreat — launch is June 15th. Say "Bring me up to speed" at the start of the next thread and we'll pick up from there. First priorities on return: Outseta brand styling, MailerLite cleanup, and confirming everything is ready for launch day.

---

*How to use this document: At the start of any new CraftBeacon session, tell Claude "read the Re-Entry Brief and orient me." Claude will read this file, brief you in plain language on where things stand, and you can move directly into work. At the close of any session, ask Claude to update this document before you leave.*
