# CraftBeacon — Session Ritual

*The opening and closing routine for every CraftBeacon working session. Simple, consistent, and designed to work even on scattered days.*

*Last updated: June 9, 2026*

---

## Opening a Session

When starting any new CraftBeacon thread, say:
> **"Bring me up to speed."**

That phrase is the signal. Claude will immediately fetch and read the Re-Entry Brief and Decisions Log from GitHub, then deliver a plain-language briefing covering:

- Where the project stands right now
- What the last session covered
- What's sitting in the fridge waiting to be finished
- The single next action
- Any decisions currently pending

**How Claude fetches the documents — exact URLs to use:**

Re-Entry Brief:
https://github.com/conwatcher/craftbeacon/blob/main/CraftBeacon-ReEntryBrief.md

Decisions Log:
https://github.com/conwatcher/craftbeacon/blob/main/CraftBeacon-DecisionsLog.md

**Important technical note:** Use the github.com/blob URL shown above, not the raw.githubusercontent.com URL. The raw URL requires a prior web search result to be fetched and will fail otherwise. The blob URL works directly with web_fetch. Both files are in a public repository so no authentication is needed.

After the briefing, Claude will ask if you're ready to move into that next action or if something else has come up that needs to move to the front first.

No re-explaining. No warmup. Straight into oriented, productive work.

---

## Closing a Session

At the end of any session where real work happened, the threaded handoff skill handles the close-out. As part of that skill's workflow, Claude will:

1. Fetch the current Re-Entry Brief and Decisions Log from GitHub using the URLs above.
2. Update the Re-Entry Brief to reflect what was accomplished, what moved off the fridge, what new items were added, and what the next action is.
3. Add any new significant decisions to the Decisions Log, with the reasoning captured.
4. Deliver the updated documents as downloadable files before the thread closes.

The handoff skill already asks: *"Before I close this out — is there anything open, unfinished, or half-formed that we haven't named yet?"* That question is the safety net for anything that almost slipped through.

---

## Saving the Documents

The save workflow after every session close:

1. Download both updated files when Claude presents them.
2. Drag them to the CraftBeacon folder on the D drive (this replaces the previous versions).
3. In VS Code, commit and sync — this pushes the updated files to GitHub.

Under two minutes. The updated files on GitHub are what Claude reads at the next session open.

**Physical reminder:** A Post-it note on your monitor reading: *End of session — download, drag, sync.*

---

## The Three Documents and Where They Live

All three documents live in the root directory of the CraftBeacon GitHub repository alongside index.html and dashboard.html.

**CraftBeacon-ReEntryBrief.md** — Current project state, last session summary, open loops, next action, pending decisions. Updated every session.

**CraftBeacon-DecisionsLog.md** — Every significant architectural and strategic decision made, with reasoning and PERMANENT vs FOR NOW status. Updated when decisions are made.

**CraftBeacon-SessionRitual.md** — This document. The operating instructions for the system. Updated only when the ritual itself changes.

---

## Why This System Exists

Every new Claude thread starts without memory of previous sessions. Every new day Patrick starts with the disorientation that comes from re-entering a context cold. These two things compound each other.

The Re-Entry Brief solves the Claude side — it gives every new thread an instant, accurate picture of where things stand. The session ritual solves the Patrick side — it makes orientation automatic rather than something that has to be reconstructed from fragments.

The goal is simple: walk in, say four words, and be ready to work within sixty seconds.

---

*This system was designed on June 9, 2026. Fetch instructions added June 9, 2026 after discovering the missing link that caused Claude to default to a stale orientation document instead of fetching live GitHub files.*
