# CraftBeacon — Re-Entry Brief
*Last updated: June 14, 2026 (evening session)*

---

## What CraftBeacon Is

AI-powered writing coaching platform for fiction and narrative nonfiction authors. Core identity: **it never generates content**. It coaches through reflective questioning only. Tagline: *"The writing coach that never writes for you."*

Live at: thecraftbeacon.com
GitHub repo: github.com/conwatcher/craftbeacon
Local files: D:\CraftBeacon

---

## Platform Stack

| Layer | Tool |
|---|---|
| Front end | GitHub Pages (thecraftbeacon.com) |
| AI relay | Val.town → Anthropic API |
| Membership / payments | Outseta (the-craft-beacon.outseta.com) |
| Session logging | Supabase (craftbeacon-sessions, East US Ohio) |
| Email / comms | Google Workspace (patrick@thecraftbeacon.com) |
| Analytics | Google Analytics (G-FRZ967M5K9) |

---

## Membership Tiers

| Tier | Price | Notes |
|---|---|---|
| Free | $0 | Permanent, no time limit, no credit card |
| Writing Lane | Paid | Craft coaching |
| Marketing Lane | Paid | Platform and presence coaching |
| Production Lane | Paid | Technical publishing guidance |
| Premium | $29/mo | All three lanes |

Free tier framing: *"Free to start, no time limit, no credit card required"* — never "trial."

---

## Current Platform Status (as of June 14, 2026 evening)

**Launching June 15, 2026. All systems confirmed working.**

Active beta tester: Stan (Australia) — assisting with security and bug testing.

All core systems confirmed working:
- Membership flow and tier gating
- Badge behavior and message limits
- File upload (paid tiers only — .txt and .md; DOCX removed)
- Supabase session logging
- Welcome email live in Outseta
- Pricing section rebuilt: three lane cards + Premium featured block
- Manage Account link in dashboard.html → Outseta billing portal
- Val.town relay secured with Bearer token auth, server-side system prompt, server-side tier detection
- Model routing by tier implemented (Haiku for free, Sonnet for paid)
- All 13 pre-launch stress tests passed
- Manual regression checklist created and added to repo
- Full regression test run passed (June 14 evening)

---

## Site Pages

| Page | URL | Notes |
|---|---|---|
| Home | thecraftbeacon.com | Main marketing page |
| Dashboard | thecraftbeacon.com/dashboard.html | Member coaching interface |
| Resources | thecraftbeacon.com/resources.html | Free resource library — Analytics added June 14 |
| Field Guide | thecraftbeacon.com/guide.html | Lead magnet page — Analytics added June 14 |

---

## Security Hardening — June 14, 2026

Major security session completed with Stan's assistance. Three critical issues found and fixed:

**1. Duplicate getTokenFromUrl() function removed from dashboard.html**
- Two identical function definitions were causing unpredictable token reading behavior
- Removed the duplicate; single clean function remains

**2. findStoredToken() function was missing entirely**
- Called in three places inside initAuth() but never defined
- Fresh logins worked (URL token path); refresh/navigation broke (fell through to missing function)
- Function added above initAuth(); reads localStorage for valid JWT

**3. Token caching added for refresh resilience**
- On first login, token now saved to localStorage under key cb_token
- findStoredToken() checks cb_token first before scanning all localStorage
- Fixes dashboard logout-on-refresh behavior

**4. Val.town relay secured — system prompt moved server-side**
- Relay now requires valid Bearer token with every request (401 if missing or expired)
- System prompt moved entirely into relay — no longer transmitted from browser
- Tier detection moved server-side — relay reads plan UID from JWT, not from client payload
- Dashboard now sends only: messages array + user_id. Nothing sensitive travels over the wire.

**Known remaining gap:** JWT signature is not cryptographically verified at the relay — expiry and email claims are checked but Outseta's signing key is not used. Not urgent at current scale; flagged for future hardening.

---

## Bug Fixes — June 14, 2026 (evening session)

**1. Free tier login loop — RESOLVED**

Root cause: two problems in dashboard.html initAuth() function introduced during morning security session.
- A duplicate function initAuth() definition was nested inside the first one, making the inner resolve() function unreachable.
- The URL token check code was missing entirely — the comment existed but the actual getTokenFromUrl() call had been deleted. Outseta delivers tokens via URL on login, so free tier users had their token ignored. Dashboard fell through to localStorage retry, found nothing, spun indefinitely.

Fix: merged both broken definitions into one clean initAuth that reads URL token first, stores it to cb_token, then falls through to Outseta event listener and localStorage retry as fallbacks. Confirmed working.

**2. Dead system prompt removed from dashboard.html**

The full const SYSTEM block (~200 lines of proprietary coaching logic) was still in the dashboard JavaScript from before the relay security changes. No longer used — prompt lives server-side in the relay — but was publicly visible in page source. Removed by Patrick directly via VS Code.

**3. Missing currentUser variable — RESOLVED**

When the const SYSTEM block was removed, the let currentUser = null declaration was accidentally deleted along with it. The send() function referenced currentUser to pass user email to the relay, hit a ReferenceError before the fetch call fired, and fell into the catch block showing "Something went wrong." Network tab showed no requests because the error occurred before the fetch.

Fix: restored let currentUser = null in the state variables and added currentUser = user in setupDashboard(). Confirmed working.

**4. Model string outdated — RESOLVED**

Relay was using claude-sonnet-4-20250514, an old model identifier that Anthropic had retired. API rejected requests with no useful error. Updated to current model strings with tier-based routing (see below).

---

## Model Routing by Tier — Implemented June 14, 2026

Relay now routes to different models based on membership tier:
- **Free tier:** claude-haiku-4-5 (faster, lower cost)
- **All paid tiers:** claude-sonnet-4-6 (deeper reasoning for coaching)

Implementation: single line in Val.town relay:
```
model: membership_tier === "free" ? "claude-haiku-4-5" : "claude-sonnet-4-6",
```

---

## Open Items (Drinks in the Fridge)

- **Stan's final confirmation** — free tier login fix deployed; awaiting Stan's test result
- **API credits low** — $3.01 remaining; auto-reload turned off; re-enable or add funds before launch traffic arrives
- **JWT signature verification** — relay checks expiry/email but not cryptographic signature; future hardening item
- **Mobile Chrome login loop** — token stores but dashboard can't read it; deferred post-launch
- **B3 crisis false positive edge case** — post-launch smoothing item
- **Response length tuning** — monitor after real user sessions begin
- **Author Decision Record feature** — requires Supabase session enrichment first
- **Instagram vertical video** — 9:16 version exported, not yet scheduled
- **Ad spend strategy** — boosting window using Launch Announcement variants
- **Custom pricing page** — individual Outseta plan signup links; future enhancement
- **Welcome email header logo** — location within Outseta Design/Email settings unresolved
- **Google Workspace billing** — free trial ends; paid billing starts July 1, 2026; payment method confirmed on file
- **Prompt caching** — Anthropic console shows "Not enabled"; could reduce relay costs once traffic grows

---

## Key Contacts

| Person | Role | Notes |
|---|---|---|
| Stan | Beta tester | Australia; developer-level; actively probing security; also acting as Patrick's developer trainer |
| Elizabeth Sloan | Community member | Provided accessibility feedback |

---

## Field Guide Page

**File:** guide.html
**URL:** thecraftbeacon.com/guide.html
**Content:** "What Nobody Tells Indie Authors" — 6-section resource guide
**Purpose:** Lead magnet driving traffic to site; newsletter signup at bottom

Newsletter signup:
- Outseta lead capture form, UID: Rm8rxY94
- Form name: Newsletter Signup
- Fields: Email (required), First Name (required)
- Post-submission: redirects back to guide.html
- Trigger: "Stay Current" floating pill button (bottom-right, fixed) + inline button at bottom of page

---

## Regression Testing

Manual regression checklist added to repo: CraftBeacon-RegressionChecklist.md
- 20 tests across 5 sections: Authentication, Tier Behavior, Relay Function, Page Integrity, Known Issues
- Run after any significant change to dashboard.html, the relay, or Outseta settings
- All tests passed on initial run (June 14, 2026 evening)

---

*Fetch URL for Claude: `https://raw.githubusercontent.com/conwatcher/craftbeacon/main/CraftBeacon-ReEntryBrief.md?nocache=1` — the ?nocache=1 parameter prevents GitHub CDN from serving a cached version. Always use this URL in continuation prompts.*
