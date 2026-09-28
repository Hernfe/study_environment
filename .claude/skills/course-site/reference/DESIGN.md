# Design

Calm, aligned, low distraction. The student is here for an hour at a
time. Nothing may compete with the content. The repo's `docs/DESIGN.md`
holds the exact tokens with their contrast ratios and the research
behind each choice; where this file and it disagree, the repo wins.

## Colour

Every colour is a token on `:root` in `src/styles/tokens.css`, redefined
under `@media (prefers-color-scheme: dark)`. The site follows the system
theme; there is no manual theme switch. Body has an explicit background.

- Background off-white `#F7F6F2` (dark `#16171A`), surface `#FFFFFF`
  (dark `#202126`) for cards. Not pure white, not pure black.
- Text near-black `#1A1A1A` (dark `#ECEBE6`), muted `#5B5A55`.
- One accent for interaction, `#2856C9` (dark `#8FB0FF`): links,
  buttons, focus rings, the current contents item, and the element under
  discussion in a figure. Nothing else, not decorative labels.
- Semantic colours only for difficulty badges (green, amber on yellow,
  red) and for correct and incorrect feedback (blue-green and vermilion,
  a different tint family from the badges so a green badge never reads
  as "correct"). Always paired with a word; colour never carries meaning
  alone.
- Every text and background pair is checked against WCAG AA and the
  ratio recorded in `docs/DESIGN.md`. Recheck after any change.

## Type and rhythm

- System sans stack, no webfont. 18 px base, line height 1.6.
- Measure 68 ch, inside 60 to 75.
- One modular scale (ratio 1.25). Headings differ by size and weight,
  never by colour. Key terms are `<dfn>` at weight 600; no other bold or
  italic in content.
- 4 px spacing base; space between blocks always larger than space
  inside a block.

## Layout

One prose column at every width. Breakpoints in rem: 48 (768 px)
wider gutters, hotspot gutters, two-up blocks; 80 (1280 px) the page
grid. Nothing changes above 80 rem except the margins, so 1280 and 1920
show the same composition.

From 80 rem, a named grid:

```
margin | toc 14rem | gap 3rem | prose 68ch | bleed 12rem | margin
```

- Prose, blocks, quizzes and recap fill the prose track.
- Figures span prose plus bleed, so the left edge stays on the prose
  edge and every figure's right edge lands on one shared line.
- The sticky section contents sit in the toc track; below 80 rem the
  contents list is inline after the header.
- Two blocks share a row only when they are the same type (definition,
  example, whyItMatters, misconception, keyNumber), each at most 340
  characters, and the shorter is at least 55 percent of the longer. A
  run of three leaves the third full width. Never an orphan half-width
  block.

The result must read as an aligned grid, not as boxes filling gaps.

## Components

Class names are the contract between `render.js` and `components.css`;
the table is in `docs/DESIGN.md`.

- Cards: surface tint, hairline border, small kicker heading, no
  shadows.
- Collapsibles (detail blocks, reveals): native `<details>`, closed by
  default, keyboard operable. Separate reveals never open each other.
- Difficulty badge: a pill with the word and the colour. Points shown in
  every question head ("1 point", "1.5 points, 6 × 0.25").
- Word banks shown with the question; once-only entries struck through
  when used.
- Site nav: breadcrumb, Study hub / course code / current page.
- Hub and course map: `.course-map` of `.course-card`s; hub cards
  (`.hub-card`) have no number column.

## Motion

Only `transition: background-color 120ms, border-color 120ms` on quiz
feedback; `prefers-reduced-motion` turns it off. No entrance animations,
no parallax, no autoplay.

## Responsive and platform

- Viewport meta `width=device-width, initial-scale=1` and
  `color-scheme: light dark` on every page.
- Page gutter 16 px below 48 rem, 32 px above. The page body never
  scrolls sideways; plots scroll sideways inside `.plot` rather than
  shrinking below legibility.
- Test at 380, 768, 1280 and 1920 px in both themes, every time.

## Accessibility

- Every interactive element reachable and operable by keyboard, with a
  3 px focus ring in the accent, offset 2 px.
- Widgets use native inputs, render a static fallback first, and leave
  that picture in place if mounting fails. Every figure has a
  `fallbackAlt`.
- Hotspot regions are buttons with labels, not bare shapes; arrow keys
  and Home/End move between them.
- Never rely on colour alone.
