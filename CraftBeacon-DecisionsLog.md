# CraftBeacon — Decisions Log
*Append new entries at the top. Most recent session first.*

---

## Session: June 14, 2026 (evening)

### Decisions Made

**1. Model routing by tier — IMPLEMENTED**
- Free tier routes to `claude-haiku-4-5`; all paid tiers route to `claude-sonnet-4-6`
- Rationale: Haiku is faster and significantly cheaper per message, protecting API budget as free tier grows. Sonnet's deeper reasoning serves the diagnostic and structural coaching paid members are paying for.
- Implementation: single ternary line in Val.town relay replacing the hardcoded model string.

**2. Dead system prompt removed from dashboard.html**
- Patrick performed the edit directly in VS Code — part of his developer training with Stan.
- Rationale: ~200 lines of proprietary coaching logic were publicly visible in page source despite no longer being used (prompt now lives server-side in the relay).
- Side effect: removal accidentally deleted `let currentUser = null;` which was adjacent to the SYSTEM block. Restored in the same session.

**3. Manual regression checklist created instead of automated testing**
- Stan recommended automated unit and regression tests via Claude Code.
- Decision: manual checklist is the right tool for CraftBeacon's current scale and Patrick's technical comfort level. Automated testing would require terminal-level operations and infrastructure setup that doesn't justify the overhead yet.
- File: `CraftBeacon-RegressionChecklist.md` — 20 tests across 5 sections, added to repo.

**4. Cache-busting parameter added to Re-Entry Brief fetch URL**
- GitHub's raw file CDN was serving stale cached versions of the brief.
- Solution: append `?nocache=1` to the raw.githubusercontent.com URL in continuation prompts.
- Documented at the bottom of the Re-Entry Brief itself.

### Bugs Resolved

- **Free tier login loop** — duplicate `initAuth()` function and missing URL token check; merged into single clean function.
- **Missing `currentUser` variable** — accidentally deleted during SYSTEM prompt removal; restored.
- **Outdated model string** — `claude-sonnet-4-20250514` retired by Anthropic; updated to `claude-sonnet-4-6` (with Haiku routing for free tier).

### Key Observations

- Stan is functioning as both beta tester and developer trainer — asking Patrick "what would you prompt Claude to achieve this?" rather than just doing the work himself. This is building Patrick's product ownership skills.
- CraftBeacon's coaching behavior confirmed working correctly: tier gating enforced, redirect protocol functional, conversation history maintained within sessions, free tier appropriately scoped.
- API credits at $3.01 with auto-reload turned off — needs attention before launch traffic.

---

## Session: June 14, 2026 (morning — with Stan)

### Decisions Made

- Relay secured with Bearer token authentication
- System prompt moved server-side into Val.town relay
- Tier detection moved server-side — relay reads planUid from JWT
- Three dashboard bugs fixed (duplicate getTokenFromUrl, missing findStoredToken, refresh-logout)
- Google Analytics added to resources.html and guide.html

---
