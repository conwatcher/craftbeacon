# CRAFTBEACON — PUBLIC PAGE PALETTE SPEC v1

**Decided:** 14 August 2026. Approved from `palette-comparison.html`.

**What this is:** the colour system for CraftBeacon's public-facing pages. The dark theme is not being replaced — it is being kept, unchanged, on the dashboard. This spec adds a light counterpart for everything a visitor sees before they sign in.

**Governing idea:** the light theme is the dark theme inverted, not a new palette. Nine of eleven variables are either unchanged or a direct swap between two values already in the set. One new value enters — a deepened amber — and it exists solely to solve a contrast failure.

---

## 1. WHICH PAGES GET WHICH

| Page | Theme |
|---|---|
| `index.html` | Light |
| `resources.html` | Light |
| `newsletter.html` | Light |
| `guide.html` | Light |
| `awareness.html` | Light |
| `craft.html` | Light |
| `privacy.html` | Light |
| `terms.html` | Light |
| `tools.html` (to be built) | Light |
| `dashboard.html` | **Dark — do not change** |

The reasoning, so it survives future decisions: public pages do the job of invitation, and a bright room invites. The dashboard is where an author works on their manuscript for an hour at a time, and a darker, quieter surface suits sustained focus. Visual grammar follows the emotional job of the page.

---

## 2. THE VARIABLE BLOCK

Replace the `:root` block on light-theme pages with this. Variable names are unchanged from the dark theme, so every existing `var(--cb-*)` reference in the markup continues to resolve — no class or markup changes are required to swap a page over.

```css
:root {
  /* Surfaces — inverted from the dark theme */
  --cb-dark:         #f7f2e8;   /* page background (was #110f0b) */
  --cb-surface:      #fffdf8;   /* cards, raised panels (was #1c1914) */
  --cb-surface2:     #f0e9db;   /* banded sections, subtle fills (was #221f18) */
  --cb-border:       rgba(28,25,20,0.12);

  /* Type */
  --cb-text:         #1c1914;   /* was --cb-surface in the dark theme */
  --cb-muted:        #6b6357;   /* darkened from #9a9080 for contrast */
  --cb-dim:          #7d7466;   /* darkened from #9a8f82 */

  /* Amber — split into two roles, see section 3 */
  --cb-amber:        #8a5a18;   /* text-safe: links, small text, labels */
  --cb-amber-light:  #c8903a;   /* decorative: your original amber */
  --cb-amber-dim:    rgba(200,144,58,0.14);

  /* Accent */
  --cb-red:          #8B1A2F;   /* unchanged */
}
```

### Retained for reference — the dark theme, unchanged on the dashboard

```css
:root {
  --cb-dark:        #110f0b;
  --cb-surface:     #1c1914;
  --cb-surface2:    #221f18;
  --cb-border:      rgba(255,255,255,0.08);
  --cb-amber:       #c8903a;
  --cb-amber-light: #e8b86a;
  --cb-amber-dim:   rgba(200,144,58,0.12);
  --cb-red:         #8B1A2F;
  --cb-text:        #ede6d8;
  --cb-muted:       #9a9080;
  --cb-dim:         #9a8f82;
}
```

---

## 3. THE AMBER RULE

This is the only part of the spec that requires judgment during the build, so it needs to be explicit.

`#c8903a` measures **6.84:1** against the dark background — comfortably readable. Against the light background it measures **2.51:1**, which fails WCAG AA for any text below 24px. It cannot carry small text on a light page.

So amber does two jobs, and which variable to reach for depends on whether the amber is being *read* or *seen*.

**Use `--cb-amber` (`#8a5a18`, 5.3:1) wherever amber is text:**
- Body links and inline links
- Eyebrow labels and small caps above headings
- Section heading colour where headings are under 24px
- Any amber text on a card or banded section
- Button label text where the button has a light fill

**Use `--cb-amber-light` (`#c8903a`) wherever amber is decoration:**
- Icons and icon fills
- Borders, rules, and dividers
- Display type at 28px and above, including the italic emphasis in the hero headline
- Solid button fills — with the label in `--cb-surface`, never in `--cb-text`
- The logo wordmark accent

The test when it's ambiguous: **if a visitor has to read the amber to get the meaning, it must be `--cb-amber`.** If removing the colour entirely would cost only warmth and not comprehension, `--cb-amber-light` is correct.

---

## 4. ELEVATION

On a dark background a lighter card separates from the page by itself. On a light background it does not, and a card with no shadow reads as a flat rectangle rather than a raised surface.

Every card, panel, and raised container on a light page carries:

```css
box-shadow: 0 1px 3px rgba(28,25,20,0.06);
```

For hover states on interactive cards, deepen rather than colour-shift:

```css
box-shadow: 0 4px 12px rgba(28,25,20,0.10);
```

Do not apply either to the dashboard.

---

## 5. CONTRAST — VERIFIED

Measured, not estimated. All pairings below meet WCAG AA (4.5:1) for normal text.

| Pairing | Ratio |
|---|---|
| `--cb-text` on `--cb-dark` | 15.70 : 1 |
| `--cb-text` on `--cb-surface` | 17.24 : 1 |
| `--cb-muted` on `--cb-dark` | 5.31 : 1 |
| `--cb-amber` on `--cb-dark` | 5.29 : 1 |
| `--cb-amber` on `--cb-surface` | 5.81 : 1 |
| `--cb-red` on `--cb-dark` | 8.23 : 1 |
| `--cb-amber-light` on `--cb-dark` | **2.51 : 1 — decorative only** |

Any new colour pairing introduced later must be measured before it ships. The failure mode is invisible to the person who chose the colours and obvious to the reader who can't read them.

---

## 6. TWO ITEMS THAT NEED A DECISION BEFORE THE BUILD

Neither is a palette question, but both surface the moment the background turns light, and both will stall the build pass if they aren't settled first.

**The logo.** `assets/Logo-NoBG.png` is a transparent PNG built to sit on a near-black background. If the wordmark is rendered in cream or a pale amber, it will disappear against `#f7f2e8`. Check it against the light background before the build. If it vanishes, a dark-ink variant of the same logo is needed — same artwork, different ink, exported alongside the original rather than replacing it, since the dashboard still needs the light version.

**The photography.** `hero-lighthouse.jpg`, `philosophy.jpg`, and `fresnel2.jpg` are dark, night-lit images chosen to blend into a black page. On a cream page they become heavy rectangles that fight the surrounding warmth. Three ways to handle it, in ascending order of effort: leave them and accept the contrast as deliberate drama; apply a warm overlay so they sit closer to the page; or replace them with lighter-key images. This is a taste decision, not a technical one.

---

## 7. WHAT THIS SPEC DOES NOT COVER

Typography, spacing, layout, and component structure are all unchanged. This is a colour swap and an elevation rule, nothing more. Any page can be converted by replacing its `:root` block and adding the card shadow — no markup edits, because the variable names did not change.
