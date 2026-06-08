# CraftBeacon — Session Ritual
*The opening and closing routine for every CraftBeacon working session. Simple, consistent, and designed to work even on scattered days.*

*Last updated: June 9, 2026*

---

## Opening a Session

When starting any new CraftBeacon thread, say:

> **"Bring me up to speed."**

That phrase is the signal. Claude will immediately read the Re-Entry Brief and Decisions Log, then deliver a plain-language briefing covering:

- Where the project stands right now
- What the last session covered
- What's sitting in the fridge waiting to be finished
- The single next action
- Any decisions currently pending

After the briefing, Claude will ask if you're ready to move into that next action or if something else has come up that needs to move to the front first.

No re-explaining. No warmup. Straight into oriented, productive work.

---

## Closing a Session

At the end of any session where real work happened, the threaded handoff skill handles the close-out. As part of that skill's workflow, Claude will:

1. Update the Re-Entry Brief to reflect what was accomplished, what moved off the fridge, what new items were added, and what the next action is.
2. Add any new significant decisions to the Decisions Log, with the reasoning captured.
3. Deliver the updated documents for saving before the thread closes.

The handoff skill already asks: *"Before I close this out — is there anything open, unfinished, or half-formed that we haven't named yet?"* That question is the safety net for anything that almost slipped through.

---

## Saving the Documents

Claude cannot save directly to GitHub or Google Drive. The save step requires one manual action at the end of each session.

**The simplest reminder:** A Post-it note on your monitor that reads:

*End of session — paste the docs.*

When the updated files are handed to you at close, open the file in GitHub's web editor or your Google Doc, select all, paste, save. Under one minute. The Post-it makes sure you don't walk away without doing it.

---

## The Three Documents and Where They Live

All three documents live in the root directory of the CraftBeacon GitHub repository alongside index.html and dashboard.html.

**CraftBeacon-ReEntryBrief.md** — Current project state, last session summary, open loops, next action, pending decisions. Updated every session.

**CraftBeacon-DecisionsLog.md** — Every significant architectural and strategic decision made, with reasoning and PERMANENT vs FOR NOW status. Updated when decisions are made.

**CraftBeacon-SessionRitual.md** — This document. The operating instructions for the system. Rarely needs updating.

---

## Why This System Exists

Every new Claude thread starts without memory of previous sessions. Every new day Patrick starts with the disorientation that comes from re-entering a context cold. These two things compound each other.

The Re-Entry Brief solves the Claude side — it gives every new thread an instant, accurate picture of where things stand. The session ritual solves the Patrick side — it makes orientation automatic rather than something that has to be reconstructed from fragments.

The goal is simple: walk in, say four words, and be ready to work within sixty seconds.

---

*This system was designed on June 9, 2026, in a session dedicated to building workflow structure for CraftBeacon.*
