# CraftBeacon — Re-Entry Brief
*Last updated: June 14, 2026*

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

## Current Platform Status (as of June 14, 2026)

**Launched June 15, 2026. Live and active.**

Active beta tester: Stan (Australia) — assisting with security and bug testing.

All core systems confirmed working:
- Membership flow and tier gating
- Badge behavior and message limits
- File upload (paid tiers only — .txt and .md; DOCX removed)
- Supabase session logging
- Welcome email live in Outseta
- Pricing section rebuilt: three lane cards + Premium featured block
- Manage Account link in dashboard.html → Outseta billing portal
- Val.town max_tokens bumped to 4000
- All 13 pre-launch stress tests passed

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

## ACTIVE BUG — Needs immediate attention next session

**Free tier login broken after June 14 security changes.**
Stan reports free tier accounts spin indefinitely on the dashboard after the relay security changes were deployed. Paid tier accounts appear unaffected. Most likely cause: free tier Outseta tokens may not contain the `outseta:planUid` claim that the relay now uses for tier detection — or the claim has a different format for free accounts. The relay's token verification block may be rejecting free tokens as unauthorized. **This is the first thing to fix in the next session.**

---

## Open Items (Drinks in the Fridge)

- **FREE TIER LOGIN BUG** — broken after June 14 relay security changes; first priority next session
- **JWT signature verification** — relay checks expiry/email but not cryptographic signature; future hardening item
- **Mobile Chrome login loop** — token stores but dashboard can't read it; deferred post-launch
- **B3 crisis false positive edge case** — post-launch smoothing item
- **Response length tuning** — monitor after real user sessions begin
- **Model routing by tier** — Haiku for free / Sonnet for paid; not yet implemented; future cost management
- **Author Decision Record feature** — requires Supabase session enrichment first
- **Instagram vertical video** — 9:16 version exported, not yet scheduled
- **Ad spend strategy** — boosting window using Launch Announcement variants
- **Custom pricing page** — individual Outseta plan signup links; future enhancement
- **Welcome email header logo** — location within Outseta Design/Email settings unresolved
- **Google Workspace billing** — free trial ends; paid billing starts July 1, 2026; payment method confirmed on file

---

## Key Contacts

| Person | Role | Notes |
|---|---|---|
| Stan | Beta tester | Australia; developer-level; actively probing security |
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
