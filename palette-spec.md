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
| `tools.html` | Light — **converted, live** |
| `journey.html` | Light |
| `marketing.html` | Light |
| `publishing.html` | Light |
| `ai-rights.html` | Light |
| `404.html` | Light |
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
  --cb-dim:          #7d7466;   /* darkened from #9a8f82 — DECORATIVE ONLY on light, see §3 */

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

### The same rule applies to `--cb-dim`

`--cb-dim` (`#7d7466`) was never measured for this spec — it was carried in as a darkened equivalent and assumed safe. It is not. On light surfaces it measures 4.13:1 on `--cb-dark`, 4.53:1 on `--cb-surface`, and 3.81:1 on `--cb-surface2`. Two of the three fail WCAG AA, and the one that passes clears it by 0.03.

**`--cb-dim` is decorative-only on light pages**, exactly as `--cb-amber-light` is. It may carry rules, separators, disabled-state fills, and non-essential ornament. Any text using it must move to `--cb-muted` (`#6b6357`, 5.31:1) when the page converts.

**This is site-wide, not one page.** Every page bound for light uses `--cb-dim`, between two and eight times each. Audited 16 August 2026 against `main`:

| Page | `var(--cb-dim)` uses |
|---|---|
| `resources.html` | 8 |
| `index.html` | 7 |
| `awareness.html` | 7 |
| `ai-rights.html` | 6 |
| `newsletter.html` | 5 |
| `journey.html` | 5 |
| `marketing.html` | 5 |
| `guide.html` | 4 |
| `craft.html` | 4 |
| `publishing.html` | 4 |
| `privacy.html` | 3 |
| `terms.html` | 3 |
| `404.html` | 2 |
| `tools.html` | 0 — built clean |

Each use must be inspected when its page converts. If it carries text, it moves to `--cb-muted`. If it is a rule, separator, or ornament, it stays.

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

`tools.html` ships these as named variables, and that is the pattern to follow on every converted page:

```css
--cb-card-shadow:       0 1px 3px rgba(28,25,20,0.06);
--cb-card-shadow-hover: 0 4px 12px rgba(28,25,20,0.10);
```

Do not apply either to the dashboard.

---

## 5. CONTRAST — VERIFIED

Measured, not estimated. Pairings marked **decorative only** fail WCAG AA (4.5:1) for normal text and must never carry text on a light page. Everything else passes.

| Pairing | Ratio |
|---|---|
| `--cb-text` on `--cb-dark` | 15.70 : 1 |
| `--cb-text` on `--cb-surface` | 17.24 : 1 |
| `--cb-muted` on `--cb-dark` | 5.31 : 1 |
| `--cb-amber` on `--cb-dark` | 5.29 : 1 |
| `--cb-amber` on `--cb-surface` | 5.81 : 1 |
| `--cb-red` on `--cb-dark` | 8.23 : 1 |
| `--cb-amber-light` on `--cb-dark` | **2.51 : 1 — decorative only** |
| `--cb-dim` on `--cb-dark` | **4.13 : 1 — decorative only** |
| `--cb-dim` on `--cb-surface` | **4.53 : 1 — decorative only** |
| `--cb-dim` on `--cb-surface2` | **3.81 : 1 — decorative only** |

Any new colour pairing introduced later must be measured before it ships. The failure mode is invisible to the person who chose the colours and obvious to the reader who can't read them.

---

## 6. TWO ITEMS THAT NEED A DECISION BEFORE THE BUILD

Neither is a palette question, but both surface the moment the background turns light, and both will stall the build pass if they aren't settled first.

**The logo.** `assets/Logo-NoBG.png` is a transparent PNG built to sit on a near-black background. If the wordmark is rendered in cream or a pale amber, it will disappear against `#f7f2e8`. Check it against the light background before the build. If it vanishes, a dark-ink variant of the same logo is needed — same artwork, different ink, exported alongside the original rather than replacing it, since the dashboard still needs the light version.

**The photography.** `hero-lighthouse.jpg`, `philosophy.jpg`, and `fresnel2.jpg` are dark, night-lit images chosen to blend into a black page. On a cream page they become heavy rectangles that fight the surrounding warmth. Three ways to handle it, in ascending order of effort: leave them and accept the contrast as deliberate drama; apply a warm overlay so they sit closer to the page; or replace them with lighter-key images. This is a taste decision, not a technical one.

---

## 7. WHAT THIS SPEC DOES NOT COVER

Typography, spacing, layout, and component structure are all unchanged. This is a colour swap and an elevation rule, nothing more. Converting a page takes three passes, not one. The variable names did not change, so no *class* or *structural* markup edits are needed — but a `:root` swap alone is not sufficient:

1. Replace the `:root` block.
2. **Hunt hardcoded dark hexes outside `:root`.** Every page has at least one. Audited 16 August 2026: `index.html` and `newsletter.html` carry five each; `resources.html`, `guide.html`, `awareness.html`, `craft.html`, `privacy.html`, `terms.html`, `journey.html`, `marketing.html`, `publishing.html`, and `ai-rights.html` carry one each; `tools.html` and `404.html` carry none. Search each page for `#110f0b`, `#1c1914`, and `#221f18` and route every hit through the matching variable.
3. Add the card shadow.

A page that passes step 1 and skips step 2 renders a light theme with dark bands cut through it.
