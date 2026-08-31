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
| `guide.html` | Light — **converted** (Tranche 2, header pending) |
| `awareness.html` | Light — **converted** (Tranche 2, header pending) |
| `craft.html` | Light — **converted** (Tranche 2, header pending) |
| `privacy.html` | Light — **converted** (Tranche 1) |
| `terms.html` | Light — **converted** (Tranche 0) |
| `tools.html` | Light — **converted, live** |
| `journey.html` | Light — **converted** (Tranche 2, header pending) |
| `marketing.html` | Light — **converted** (Tranche 2, header pending) |
| `publishing.html` | Light — **converted** (Tranche 2, header pending) |
| `ai-rights.html` | Light — **converted** (Tranche 2, header pending) |
| `404.html` | Light — **converted** (Tranche 1) |
| `dashboard.html` | **Dark — do not change** |

Converted pages no longer carry a private `:root`. They link `/assets/theme.css`,
which is the single source of truth for every light-palette value. Change a colour
there and it changes everywhere at once. `dashboard.html` is not linked to it and
keeps its own dark `:root` block.

The reasoning, so it survives future decisions: public pages do the job of invitation, and a bright room invites. The dashboard is where an author works on their manuscript for an hour at a time, and a darker, quieter surface suits sustained focus. Visual grammar follows the emotional job of the page.

---

## 2. THE VARIABLE BLOCK

This block is the light palette. **It now lives in one place — `/assets/theme.css` — and
converting a page means deleting the page's private `:root` and linking that file instead
of pasting these values in again.** It is reproduced here as documentation; `theme.css` is
the source of truth, and the two must not be allowed to drift.

Variable names are unchanged from the dark theme, so every existing `var(--cb-*)` reference
in the markup continues to resolve — no class or markup changes are required to swap a page
over.

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
- **Never a button fill — resting or hover. See the button rule below.**
- The logo wordmark accent

The test when it's ambiguous: **if a visitor has to read the amber to get the meaning, it must be `--cb-amber`.** If removing the colour entirely would cost only warmth and not comprehension, `--cb-amber-light` is correct.

### The amber-light text sweep — added 17 August 2026

The rule above was written as guidance for new work. It also has to be applied
*retroactively*, because the dark-theme pages use `--cb-amber-light` for text in
places where it was perfectly readable on `#110f0b` and is not readable on cream.

**The mechanical rule, per converting page:**

- Any **text** in `--cb-amber-light` whose computed size is **below 28px** moves to `--cb-amber`.
- Text at **28px or above** stays — this is the sanctioned display-type use. The hero
  `h1 em` is the canonical case and does not change. Check the mobile breakpoint too:
  `.doc-head h1` drops to `2rem` (32px) at ≤768px, which is still above the threshold.
- **Non-text** uses of `--cb-amber-light` are unaffected regardless of size — icons,
  borders, rules, ornament, and solid button fills all stay.

Resolve size through *computed* font-size, not the value written on the rule, since the
colour is often declared on a descendant (`h2 em`) that inherits its size from the parent.
If a rule's computed size cannot be determined confidently, leave it and report it —
the same posture as the `--cb-dim` sweep below.

### Solid buttons — resolved 31 August 2026

The earlier version of this section sanctioned `--cb-amber-light` as a solid button fill
"with the label in `--cb-surface`". **That pairing measures 2.51:1 and fails AA**, exactly
as amber-light text does — the fill is the same colour either way, so putting a near-white
label on it was never going to pass. `404.html`'s primary button hit this on hover: it
rested on `--cb-amber` at 5.29:1 and dropped to 2.51:1 the moment it was hovered.

**The rule: a solid button does not change fill colour between states.** `--cb-amber` is
the fill at rest and on hover, so contrast is constant and always 5.29:1 against a cream
label. Hover feedback comes from elevation instead of colour:

```css
a.btn-primary {
  background: var(--cb-amber);
  color: var(--cb-dark);
}
a.btn-primary:hover {
  box-shadow: var(--cb-card-shadow-hover);
  transform: translateY(-1px);
}
```

The shadow is the existing `--cb-card-shadow-hover` token rather than a new value — the
tool cards already use it for hover elevation, so buttons and cards now speak the same
language. Per §8, source the value, don't invent one.

**`--cb-amber-light` is never a button fill, resting or hover.** It stays reserved for
non-text, non-fill ornament: icons, borders, rules, dividers, display type at 28px and
above, and the logo wordmark accent.

**Outline buttons are unaffected.** `.btn-nav-signup`, `.btn-submit`, and `.btn-copy` are
transparent with an `--cb-amber` label and border, hovering to `--cb-amber-dim` — a 14%
amber tint over cream that leaves the label at 4.71:1. That pattern already passed and
needs no change. It is also why `tools.html` cleared its original contrast audit: it has
no solid-fill button at all.

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

Both now live in `/assets/theme.css`, so a converted page gets them by linking it.

Do not apply either to the dashboard.

### Callouts get a real surface — decided 17 August 2026

On the dark theme, `.doc-callout` was filled with `rgba(17,15,11,0.55)` — which is the
page colour, so the fill did nothing and the border carried the whole effect. That works
on dark. On cream it leaves the callout reading as flat page with a hairline round it.

**Callouts fill with `--cb-surface` and keep `--cb-card-shadow`.** Surface plus shadow is
the intended combination; that is what makes it read as a raised panel rather than a
faint outline. Apply this wherever the pattern appears, on every page.

`--cb-text` on `--cb-surface` measures 17.24:1, so callout body copy is unaffected by the
fill change. If a future callout's text does drop below AA against `--cb-surface`, report
it rather than adjusting the text colour to compensate.

**Not every bordered container is a card.** `privacy.html`'s `.svc-table` is a bordered
table with no fill, and tables read correctly flat — it was left without a shadow. The
shadow belongs on things that are meant to sit *above* the page, not on everything with
a border.

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
| `--cb-surface` on `--cb-amber-light` fill | **2.51 : 1 — why amber-light is banned as a fill, §3** |
| `--cb-dark` on `--cb-amber-light` fill | **2.51 : 1 — why amber-light is banned as a fill, §3** |
| `--cb-dark` on `--cb-amber` fill | 5.29 : 1 — the solid-button pairing, resting AND hover |
| `--cb-amber` on `--cb-amber-dim` over `--cb-dark` | 4.71 : 1 — outline-button hover |
| `--cb-text` on the hero photo wash | 6.50 : 1 — the only safe small text there, §10 |
| `--cb-muted` on the hero photo wash | **2.20 : 1 — why it was moved off, §10** |
| `--cb-amber` on the hero photo wash | **2.19 : 1 — why it was moved off, §10** |

Any new colour pairing introduced later must be measured before it ships. The failure mode is invisible to the person who chose the colours and obvious to the reader who can't read them.

---

## 6. TWO ITEMS THAT WERE PENDING — BOTH NOW SETTLED

Neither was a palette question, but both surfaced the moment the background turned light. Both have been tested against cream and resolved.

**A third photography question arose and was settled separately — see §10.** The item below settled three images on `index.html` that sit *beside* text. The seven Tranche 2 pages use photographs as a darkened background *behind* text, which §6 never covered; that treatment was resolved on 31 August 2026, with one residual contrast finding recorded there.

**The logo — RESOLVED, 14 August 2026.** `assets/Logo-NoBG.png` was checked against `#f7f2e8`. The deep red carries the wordmark and the amber lantern reads clearly. **No dark-ink variant is needed.** Use the existing asset unchanged on both themes.

**The photography — RESOLVED, 16 August 2026.** `hero-lighthouse.jpg`, `philosophy.jpg`, and `fresnel2.jpg` were reviewed against cream. There is a noticeable difference from the dark theme, but the images hold up. The darkest of the three sits beside a text block, where the contrast reads as natural rather than heavy. **Leave all three as they are — no warm overlay, no replacement, no lighter-key reshoot.**

**Standing rule this section now carries:** when a deferred decision is settled, close it here. A decision made in conversation and never written back becomes a phantom blocker — this one stalled the conversion pass across two sessions after it had already been answered.

---

## 7. WHAT THIS SPEC DOES NOT COVER

Typography, spacing, layout, and component structure are all unchanged. This is a colour swap and an elevation rule, nothing more. Converting a page takes three passes, not one. The variable names did not change, so no *class* or *structural* markup edits are needed — but a `:root` swap alone is not sufficient:

1. Replace the `:root` block — on a converting page this means *deleting* it and linking
   `/assets/theme.css` in `<head>`, positioned **before** the page's own `<style>` block
   so page-specific rules still win the cascade. Use the root-relative form, never
   `assets/theme.css` — see §9.
2. **Hunt hardcoded dark values outside `:root`.** See the widened search below.
3. Add the card shadow.

A page that passes step 1 and skips step 2 renders a light theme with dark bands cut through it.

### The widened Pass 2 search — corrected 17 August 2026

The original audit searched only for hex. **The same colours also appear as `rgba()`, and
that search could not see them.** `terms.html` was recorded as carrying one hardcoded dark
value; it actually carried four. Search all six forms, in both comma spacings, since both
are valid CSS and both occur:

```
#110f0b          #1c1914          #221f18
rgba(17,15,11    rgba(28,25,20    rgba(34,31,24
rgba(17, 15, 11  rgba(28, 25, 20  rgba(34, 31, 24
```

**The carve-out that matters: not every dark rgba is wrong on a light page.** Dark ink at
low alpha is exactly how a shadow or a hairline border is supposed to work on cream —
`--cb-card-shadow` is itself `rgba(28,25,20,0.06)`. A blind sweep would destroy the very
shadows step 3 just added. Decide by **role**, not by value:

| Role | Properties | Action |
|---|---|---|
| Background or surface fill | `background`, `background-color`, a fill inside a gradient | **Invert it** — this is a page or panel surface and must become light |
| Shadow, border, outline | `box-shadow`, `text-shadow`, `border-color`, `outline` | **Leave it** — dark ink at low alpha over cream is correct and intended |

If one shorthand declaration does both, split the decision by component rather than
converting the whole line.

**What to convert it to.** Prefer the variable: if the alpha is not actually doing work —
the value is opaque, or sits over an already-opaque surface — use the matching variable
from `theme.css` rather than a literal. Where alpha genuinely matters (translucent sticky
navs, overlay panels), keep the alpha and swap the colour for its light counterpart, taken
from `theme.css` or from `tools.html`. **Never invent an rgba value.** If you hit a dark
rgba whose light counterpart cannot be sourced from either file, stop and report it.

**The per-page counts in this spec and in the handoff tranche tables are hex-only and
therefore undercount.** Treat them as a floor, not a target, and report actual against
predicted per page. Recorded so far:

| Page | Predicted (hex-only) | Actual hex | Actual rgba | Total |
|---|---|---|---|---|
| `terms.html` | 1 | 1 | 3 | 4 |
| `privacy.html` | 1 | 1 | 3 | 4 |
| `404.html` | 0 | 0 | 0 | 0 |
| `awareness.html` | 1 | 1 | 3 | 4 |
| `journey.html` | 1 | 1 | 4 | 5 |
| `marketing.html` | 1 | 1 | 3 | 4 |
| `guide.html` | 1 | 1 | 3 | 4 |
| `craft.html` | 1 | 1 | 3 | 4 |
| `publishing.html` | 1 | 1 | 3 | 4 |
| `ai-rights.html` | 1 | 1 | 3 | 4 |

The three rgba sites on both document pages were the same three every time: the sticky
nav, the callout, and the footer. **Check those three rules explicitly on every page even
when the search comes back clean.**

---

## 8. COMPONENT PATTERNS DERIVED DURING THE CONVERSION

These were worked out on the first three pages and are now rules. They exist because a
mechanical variable swap can be individually correct on every line and still break a
component — usually by collapsing a hover state into its own base colour.

**Footer links.** Base moves `--cb-dim` → `--cb-muted` under the §3 rule. When it does,
**the hover state must move too.** Several pages set footer-link hover to `--cb-muted`
already, so swapping the base leaves hover and base identical and silently kills the
feedback. Set hover to `--cb-amber`, matching `tools.html`.

**Nav links.** Hover moves `--cb-amber-light` → `--cb-amber` under the amber-light rule
in §3. `tools.html` already does exactly this, so take the value from there.

**In-prose links.** Base is `--cb-amber` and hover was `--cb-amber-light`. The amber-light
rule pushes hover to `--cb-amber`, which makes it a no-op against its own base. These
links carry `text-decoration: underline`, so they remain identifiable without the colour
change, and AA compliance was treated as the higher obligation. `tools.html` has no
in-prose link to source a better answer from. **Open: in-prose links currently have no
visible hover response on converted pages.**

**Source values, never invent them.** `tools.html` is the reference implementation. If it
does not contain the pattern needed and `theme.css` does not define the value, stop and
report rather than choosing.

---


### Patterns added in Tranche 2 — 31 August 2026

**Page-local component tokens stay page-local.** `awareness.html`, `marketing.html` and
`ai-rights.html` define `--cb-caution` and `--cb-caution-border` in their `:root`. These
are *not* palette variables — they are amber tints (`rgba(200,144,58,0.08)` and `0.18`)
used for one caution panel, they need no inversion for the light theme, and `theme.css`
does not define them. Deleting the whole `:root` would have left them undefined and broken
those panels.

The rule: **delete the eleven palette variables, keep anything else the page declared**,
in a small `:root` sitting where the old one was, with a comment saying why it is there.
Do not promote page-local tokens into `theme.css` without asking — that widens the shared
contract. `publishing.html` declared both and used neither, so its block went entirely.

**If a third page needs the same component CSS, say so rather than copying it a fourth
time.** Right now `theme.css` holds only the `:root` block; shared *component* rules are a
separate decision that has not been taken.

**Decorative glyphs in pseudo-elements keep `--cb-dim`.** `.signpost-card::after` on
`awareness.html` and `guide.html` sets `content: '\2197'` — a ↗ arrow. It is a non-text
ornament under the §3 rule, so it stays `--cb-dim` while every other `--cb-dim` use on
those pages moved to `--cb-muted`. Check `content` before classifying a pseudo-element:
a `::after` carrying words is text, a `::after` carrying a glyph is not.

**Card shadows follow the surface fill.** Every rule with `background: var(--cb-surface)`
on a block container takes `--cb-card-shadow`; interactive cards that already restate a
background on `:hover` take `--cb-card-shadow-hover` there. Small chips filled with
`--cb-surface2` (`craft.html`'s `.word-tag`) do not — same limit as `privacy.html`'s
`.svc-table`.

---


## 9. ROOT-RELATIVE PATHS ARE MANDATORY, BECAUSE OF `404.html`

GitHub Pages serves the 404 page from whatever URL the visitor actually requested —
`thecraftbeacon.com/some/deep/path`. A relative `assets/theme.css` resolves against *that*
path, 404s, and the error page renders completely unstyled.

Verified 17 August 2026 by fetching both forms as a browser would resolve them from a deep
base URL:

| Form shipped | Resolves to (from `/some/deep/path`) | Status |
|---|---|---|
| `/assets/theme.css` | `/assets/theme.css` | **200** |
| `assets/theme.css` | `/some/deep/assets/theme.css` | **404** |

Use the root-relative form on **every** page, not just `404.html`, so there is one rule
and no exception to remember.

**CSP is the likeliest thing to break this pass, and it breaks silently.** Every page
carries a Content-Security-Policy `<meta>` tag. Until this conversion all styling was
inline, so a page's `style-src` may not include `'self'` — nothing needed it. Link an
external stylesheet to a page whose `style-src` omits `'self'` and the browser blocks it,
rendering the page unstyled with only a console warning. Check each page's CSP as part of
its conversion; if `style-src` lacks `'self'`, add it — that page only, minimal edit, never
rewrite the directive or copy another page's CSP across. All three pages converted so far
already permitted `'self'` and needed no change.

## 10. THE PHOTOGRAPHIC PAGE HEADER — RESOLVED 31 August 2026

Seven pages shared a hero built by *darkening* a photograph so light text could sit on it:
`filter: brightness(0.28) sepia(0.2)` over `#1c1914`, plus a dark vignette. That is a
dark-theme device and it does not survive the palette swap — the text colours invert to
near-black while the surface stays dark. Measured on `craft.html` before the fix, the
`h1` sat at **1.15:1**.

**Decision: lighten the photograph and keep dark text.** The hero is now a pale wash of
the image behind normal light-theme type, rather than dark type on a dark plate:

```css
.page-header-bg {
  background: var(--cb-dark);
  background-image: url("assets/quill-lane.jpg");
  filter: brightness(1.05) sepia(0.15);
  opacity: 0.35;
}
.page-header-vignette {
  background: radial-gradient(ellipse 80% 100% at 50% 0%,
              transparent 30%, rgba(247,242,232,0.65) 100%);
}
```

The vignette now fades to the page colour instead of to ink. `journey.html` had drifted to
`brightness(0.35) sepia(0.15)` over a different photograph (`resource-pg.jpg`); all seven
are now on the one treatment. `journey.html`'s `.page-header em` measures 16px and moved to
`--cb-amber` with every other sub-28px amber-light use.

### Small text over the wash — fixed 31 August 2026

The heading was fine from the start: `--cb-text` clears **6.50:1** against the darkest
pixel either photograph can produce. The two small-text roles were not, because
`--cb-muted` (5.31:1) and `--cb-amber` (5.29:1) clear AA on flat cream with almost no
headroom, so any texture behind them sank them to roughly 2.2:1. Lowering the wash could
not rescue them — even `opacity: 0.10` only reached 4.24:1.

**Both moved to `--cb-text`.** `.page-header p` and `.section-label` now use the same
value as the headline, which has the headroom to survive the texture:

| Header text | Was | Now | Worst case over the wash | AA needs |
|---|---|---|---|---|
| `.page-header h1` — 44.8px | `--cb-text` | `--cb-text` (unchanged) | **6.50 : 1** | 3 : 1 |
| `.page-header p` — 16px | `--cb-muted` — 2.20 : 1 | `--cb-text` | **6.50 : 1** | 4.5 : 1 |
| `.section-label` — 11.52px | `--cb-amber` — 2.19 : 1 | `--cb-text` | **6.50 : 1** | 4.5 : 1 |

Measured by running the full CSS pipeline — `brightness(1.05)`, then `sepia(0.15)`, then
`opacity: 0.35` composited over `--cb-dark` — against the darkest pixel in each photograph
sampled at 400px wide. Both images bottom out at effectively black (`quill-lane.jpg` at
`rgb(1,1,0)`, `resource-pg.jpg` at `rgb(3,4,6)`), so the worst case is the absolute floor
of `rgb(160,157,150)` and one number covers all seven pages: **6.50:1**, or 6.53 and 6.62
against each photograph's true darkest pixel. The vignette only ever lightens further, so
excluding it keeps the figure conservative.

`.section-label::before` — the short amber rule before the label — keeps `--cb-amber-light`
territory as ornament. It carries no text and no contrast requirement.

`awareness.html` has no paragraph in its header, only a label and an `h1`, so its
`.page-header p` rule is inert there. It was recoloured anyway to keep all seven identical.

**The general rule this establishes: in the light palette, small text over a photographic
texture must use `--cb-text`.** `--cb-muted` and `--cb-amber` are for flat cream only.
