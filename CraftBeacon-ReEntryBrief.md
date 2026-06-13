# CraftBeacon — Re-Entry Brief
*Last updated: June 12, 2026*

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

## Current Platform Status (as of June 12, 2026)

**Launch date: June 15, 2026**

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
| Resources | thecraftbeacon.com/resources.html | Free resource library |
| Field Guide | thecraftbeacon.com/guide.html | Lead magnet page — NEW |

---

## Field Guide Page (NEW — built this session)

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
- Confirmation message: *"You're on the list. CraftBeacon sends periodic author intelligence..."*

Nav on guide.html: Home | Resources | Start Free (no Dashboard link)

---

## Open Items (Drinks in the Fridge)

- **Mobile Chrome login loop** — token stores but dashboard can't read it; deferred post-launch
- **B3 crisis false positive edge case** — post-launch smoothing item
- **Response length tuning** — monitor after real user sessions begin
- **Model routing by tier** — Haiku for free / Sonnet for paid; not yet implemented; future cost management
- **Author Decision Record feature** — requires Supabase session enrichment first
- **Instagram vertical video** — 9:16 version exported, not yet scheduled
- **Ad spend strategy** — boosting window using Launch Announcement variants
- **Custom pricing page** — individual Outseta plan signup links; future enhancement
- **Welcome email header logo** — location within Outseta Design/Email settings unresolved
- **Sections 4 and 5 of system prompt** — may already be in consolidated Val.town prompt; verify
- **NotebookLM slide deck** — beautiful visuals, inaccurate content; needs correction before any public use
- **Facebook post drafts** — Patrick has 5 drafts to review next session
- **Newsletter broadcast cadence** — bi-weekly or monthly; content strategy not yet defined

---

## Session Document Locations (GitHub)

- Re-Entry Brief: github.com/conwatcher/craftbeacon/blob/main/CraftBeacon-ReEntryBrief.md
- Decisions Log: github.com/conwatcher/craftbeacon/blob/main/CraftBeacon-DecisionsLog.md

---

## How to Start a Session

Patrick opens with a continuation prompt containing the GitHub Re-Entry Brief URL. Claude fetches it, reads the Decisions Log, and begins oriented. No re-explanation of known context needed.

