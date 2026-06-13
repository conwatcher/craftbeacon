# CraftBeacon — Decisions Log
*Last updated: June 12, 2026*

A running record of decisions made, with rationale. Newest entries at top.

---

## June 12, 2026

**Field Guide page built and launched**
- Created guide.html as standalone lead magnet page
- URL: thecraftbeacon.com/guide.html
- Content: "What Nobody Tells Indie Authors" resource guide (6 sections)
- Rationale: Drive traffic to site ungated; let free tier do conversion work

**Newsletter signup approach: Outseta lead capture form**
- Form UID: Rm8rxY94 (Newsletter Signup)
- Fields: Email + First Name only (Last Name removed for reduced friction)
- Embed approach failed on GitHub Pages static site; resolved with direct Outseta form URL
- Post-submission redirects to guide.html (set in Outseta, not in code)
- Rationale: Stay in Outseta, keep everything under one roof, separate pipeline from member welcome email

**Floating "Stay Current" button added to guide.html**
- Fixed position bottom-right, amber pill style, envelope icon
- Opens same Outseta form URL as bottom-of-page button
- Rationale: Long scroll page — reader shouldn't have to reach the bottom to find signup

**guide.html nav simplified**
- Removed Dashboard link from guide.html nav
- Kept: Home | Resources | Start Free
- Rationale: Page audience is newcomers, not logged-in members; dashboard link would dead-end them

**Field Guide nav link added to index.html and dashboard.html**
- Label: "Field Guide"
- index.html: added to nav-links ul after Resources
- dashboard.html: added as header-nav-link after Resources

**NotebookLM slide deck — flagged, not deployed**
- Visual treatment is on-brand and high quality
- Content has accuracy problems: lane descriptions drift from spec, free tier claims incorrect, Marketing Lane implies content generation
- Decision: Do not use publicly until content is corrected

---

## Pre-June 12 (carried forward from previous log)

**DOCX file upload removed**
- Faulty extraction producing hallucination risk
- Deferred proper parsing to future phase
- Accepted file types: .txt and .md only

**Outseta replaces MailerLite for welcome email**
- No native integration existed; avoiding paid connectors (Zapier) was correct at this stage
- Welcome email built and live in Outseta subscriber system

**CSS contrast fix applied**
- --cb-dim changed from #5a5448 to #9a8f82 in resources.html and index.html
- Improved readability of sidebar nav text and lane card bullet points
- Fix was to underlying variable, not font size or layout

**Val.town max_tokens bumped to 4000**
- Previous limit of 2000 was causing mid-sentence cutoffs
- All 13 pre-launch stress tests passed after change

**Free tier framing locked**
- Language: "Free to start, no time limit, no credit card required"
- Never use trial-adjacent language

**Red Foundations Publishing footer removed**
- CraftBeacon intentionally brand-separate from Red Foundations Publishing
- Removed from index.html and dashboard.html

**Mobile Chrome login loop — deferred**
- Token stores but dashboard can't read it
- Not blocking launch; post-launch fix

**Model routing by tier — deferred**
- Haiku for free / Sonnet for paid not implemented
- All calls currently route to same model
- Future cost management item, not urgent at current scale

