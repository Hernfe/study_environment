# Design system

Calm, low-distraction reading surface. One column, generous whitespace,
one accent colour for anything interactive, semantic colour only where it
carries meaning (difficulty, correct/incorrect). Everything here is
implemented as CSS custom properties in `src/styles/tokens.css`.

Each choice has a one-line justification pointing at readability or
attention research. The references are listed at the end.

## 1. Colour

### 1.1 Light theme (default)

| Token | Value | Use | Why |
|---|---|---|---|
| `--c-bg` | `#F7F6F2` | Page background | Slightly warm off-white lowers luminance contrast glare versus pure white while keeping text contrast above 15:1 [1][2]. |
| `--c-surface` | `#FFFFFF` | Cards, quiz panels | A single lighter surface gives hierarchy without borders or shadows, keeping visual noise low [3]. |
| `--c-text` | `#1A1A1A` | Body text | Near-black rather than pure black avoids the harshest edge contrast yet stays far above the WCAG 7:1 AAA threshold [1]. |
| `--c-text-muted` | `#5B5A55` | Captions, metadata | 6.4:1 on `--c-bg`, so secondary text is still AA-readable while visibly subordinate [1]. |
| `--c-border` | `#DDDBD4` | Hairlines, dividers | Low-contrast rules separate blocks without competing with text for attention [3]. |
| `--c-accent` | `#2856C9` | Links, buttons, focus rings, active TOC item | One hue reserved for interaction: colour is a strong guiding attribute for visual search, so using it for exactly one meaning makes "what can I click" pre-attentive [4][5]. 5.9:1 on `--c-bg`. |
| `--c-accent-soft` | `#E4EBFB` | Hover and selected states | Same hue, low saturation, so state changes are visible but not loud [4]. |
| `--c-easy` / `--c-easy-bg` | `#1F6F3D` / `#E1F1E5` | Easy badge | Green text on tint: 5.3:1, colour plus a text label so the tier is never colour-only [1][6]. |
| `--c-medium` / `--c-medium-bg` | `#7A5A00` / `#FBF0C2` | Medium badge | Yellow is unreadable as text, so the badge uses a dark amber on a yellow tint (5.6:1) [1]. |
| `--c-hard` / `--c-hard-bg` | `#A8261E` / `#FBE3E0` | Hard badge | Red text on tint, 5.8:1; kept distinct from the incorrect-feedback red by hue and by never sharing a container [1][6]. |
| `--c-correct` / `--c-correct-bg` | `#0C6B4E` / `#D9F2E8` | Correct feedback | 5.5:1 on its tint. Blue-green rather than pure green: still reads as "good" and keeps a strong luminance and hue gap from `--c-incorrect` under deuteranopia and protanopia [6][7]. |
| `--c-incorrect` / `--c-incorrect-bg` | `#A03C05` / `#FCE6D8` | Incorrect feedback | 5.6:1 on its tint. Orange-red rather than pure red, the Okabe-Ito vermilion family, which stays separable from blue-green for the common colour deficiencies [6][7]. Always paired with the words "Correct" or "Not quite". |
| `--c-focus` | `#2856C9` | Keyboard focus outline | Same as accent, 3 px, offset 2 px, so focus is unmistakable for keyboard users [1]. |

Difficulty tints and feedback tints are deliberately different tint
families (yellow-green-red versus teal-orange) so a green badge is never
confused with a green "correct" state [6].

### 1.2 Dark theme (`prefers-color-scheme: dark`)

| Token | Value | Why |
|---|---|---|
| `--c-bg` | `#16171A` | Dark grey, not black, to avoid halation of light text on a pure black field [2]. |
| `--c-surface` | `#202126` | One step lighter than the page, same role as in light mode. |
| `--c-text` | `#ECEBE6` | Warm off-white, 15:1 on `--c-bg`, slightly below maximum to reduce glare [1][2]. |
| `--c-text-muted` | `#A6A59F` | 7.2:1, still AA. |
| `--c-border` | `#34363C` | Hairlines. |
| `--c-accent` / `--c-accent-soft` | `#8FB0FF` / `#232B44` | Lightened accent keeps 8.4:1 on the dark ground [1]. |
| `--c-easy` / `--c-easy-bg` | `#7FD59A` / `#1B3324` | |
| `--c-medium` / `--c-medium-bg` | `#F2C94C` / `#3A2F0E` | |
| `--c-hard` / `--c-hard-bg` | `#F4918A` / `#3D1E1C` | |
| `--c-correct` / `--c-correct-bg` | `#5FD3A6` / `#123528` | |
| `--c-incorrect` / `--c-incorrect-bg` | `#FFA36B` / `#40231A` | |

All dark-mode badge and feedback text tokens are between 6.6:1 and 8.3:1 on their tint backgrounds. Every ratio in this file was computed with the WCAG relative-luminance formula; recheck after any change.

## 2. Typography

| Token | Value | Why |
|---|---|---|
| `--font-body` | system sans stack (`-apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`) | No webfont download, no layout shift; well-hinted screen faces that readers already know [8]. |
| `--font-mono` | `ui-monospace, "Cascadia Mono", Consolas, Menlo, monospace` | Equations and calculation steps line up. |
| `--fs-base` | `1.125rem` (18 px) | Comfortable reading size for continuous text sits in the 0.2 to 0.4 degree x-height range, which on a desktop at normal distance is 16 to 20 px [9]. |
| `--lh-body` | `1.6` | Line spacing around 1.5 improves reading of long measures on screen [10]. |
| `--measure` | `64ch` | Text column of 60 to 75 characters: long enough to reduce return sweeps, short enough that the eye finds the next line reliably [11][12]. |
| Scale (ratio 1.25) | `--fs-sm 0.875rem`, `--fs-base 1.125rem`, `--fs-md 1.25rem`, `--fs-lg 1.5rem`, `--fs-xl 1.875rem`, `--fs-2xl 2.25rem` | A single modular ratio gives an obvious hierarchy with few distinct sizes, so the reader can tell heading levels apart at a glance [3]. |
| Headings | h1 `--fs-2xl`, h2 `--fs-xl`, h3 `--fs-lg`, h4 `--fs-md`, weight 600, line-height 1.2 | Tight leading and weight, not colour, carry heading emphasis, keeping colour free for meaning [4]. |
| Key terms | `font-weight: 600` in body text via `<dfn>` | Bold in running text is the least disruptive way to mark a term; italics reduce reading speed and colour would collide with the accent [4][10]. |
| Max heading width | `--measure` | Same column as body so headings do not create a second visual axis. |

## 3. Spacing

4 px base, doubling-ish scale. Whitespace between blocks is always larger
than whitespace inside a block so grouping is read by proximity alone [3][13].

| Token | Value | Typical use |
|---|---|---|
| `--sp-1` | `0.25rem` (4) | Icon gaps |
| `--sp-2` | `0.5rem` (8) | Inline padding, badge padding |
| `--sp-3` | `0.75rem` (12) | Button padding, list gaps |
| `--sp-4` | `1rem` (16) | Paragraph spacing, card padding on narrow screens |
| `--sp-5` | `1.5rem` (24) | Card padding, gap between question parts |
| `--sp-6` | `2rem` (32) | Gap between concept block parts (text, figure, quiz) |
| `--sp-7` | `3rem` (48) | Gap between sections |
| `--sp-8` | `4rem` (64) | Gap between theory, recap and lecture quiz |
| `--radius` | `8px` | Cards, buttons |
| `--radius-sm` | `4px` | Badges, inputs |

Page gutter is `--sp-4` at every width, `--sp-6` from 48 rem upwards.

## 4. Layout

- One column, `max-width: var(--measure)`, centred. A single reading
  path removes the decision of where to look next [3][11].
- Sticky in-page table of contents in the left margin from 72 rem width.
  It never overlaps the column and uses `--c-text-muted` with the accent
  only on the current section.
- No decorative imagery. Every figure is the one visual for its block.
- Motion: only `transition: background-color 120ms, border-color 120ms`
  on quiz feedback. `prefers-reduced-motion` turns it off. Motion in the
  periphery captures attention involuntarily, which is the opposite of
  what a study page wants [5].

## 5. Components

Class names are the contract between `render.js` and `components.css`.

| Component | Class | Notes |
|---|---|---|
| Page header | `.page-header` | Lecture number, title, chapters, exam date, page refs. |
| Table of contents | `.toc` | Sticky on wide screens, inline list on narrow. Current item gets `.is-current`. |
| Section | `.section` | `<section>` with `id` for TOC anchors. |
| Concept body | `.concept-body` | Paragraphs, `<dfn>` for key terms. |
| Figure | `.figure`, `.figure-caption` | Wraps static SVG or a mounted widget; has `role="img"` and `aria-label` from `fallbackAlt`. |
| Widget | `.widget`, `.widget-controls` | Interactive; controls are native `<input type=range>` or `<select>` so they are keyboard accessible by default. |
| Concept quiz | `.concept-quiz` | One or more `.question` cards, always easy. |
| Recap card | `.recap` | Terms as `<dl>`, equations in `.equation`. Print stylesheet strips everything else. |
| Lecture quiz | `.lecture-quiz` | Ordered list of `.question` cards. |
| Question | `.question`, `.question-prompt` | Header holds `.badge`. |
| Difficulty badge | `.badge.badge-easy` / `-medium` / `-hard` | Text label plus tint. |
| Option | `.option` | `<button>` with `aria-pressed`. `.is-selected`, `.is-correct`, `.is-incorrect`. |
| Feedback | `.feedback.is-correct` / `.is-incorrect` | Leads with the word, then one line. |
| Reveal | `.reveal` (`<details>`) | Step-by-step model answer as `<ol class="steps">`. |
| Mark scheme | `.mark-scheme` | Checklist of points; ticking counts toward the self-score. |
| Labelling | `.label-figure`, `.label-picker` | Numbered markers on the figure, one `<select>` per marker. |
| Ordering | `.order-list` | Items with Up and Down buttons. |
| Calculation | `.calc`, `.calc-input` | Numeric input with unit, tolerance check, then steps. |
| Score card | `.score-card` | Summary at the end of the lecture quiz. |
| Course map | `.course-map`, `.course-card` | Home page grid. `.status-built` / `.status-pending`. |
| Review | `.review` | Cumulative review mode on the home page. |
| Button | `.btn`, `.btn-primary`, `.btn-secondary` | Primary uses `--c-accent`; secondary is outlined. |
| Notice | `.notice` | Inline information such as "not yet built" or storage unavailable. |

## References

1. W3C, Web Content Accessibility Guidelines 2.2, success criteria 1.4.3 (contrast minimum), 1.4.6 (contrast enhanced), 2.4.7 (focus visible).
2. Buchner, A. and Baumgartner, N. (2007). Text-background polarity affects performance irrespective of ambient illumination and colour contrast. Ergonomics 50(7). Positive polarity with slightly reduced luminance keeps the legibility benefit while limiting glare.
3. Ware, C. (2012). Information Visualization: Perception for Design, 3rd ed. Chapters on Gestalt grouping (proximity, common region) and visual hierarchy.
4. Wolfe, J. M. and Horowitz, T. S. (2004). What attributes guide the deployment of visual attention and how do they do it? Nature Reviews Neuroscience 5. Colour is one of the few undoubted guiding attributes, so its use should be reserved.
5. Wolfe, J. M. and Horowitz, T. S. (2017). Five factors that guide attention in visual search. Nature Human Behaviour 1. Bottom-up salience, including motion and colour contrast, captures attention involuntarily.
6. Okabe, M. and Ito, K. (2008). Color Universal Design: how to make figures and presentations that are friendly to colorblind people. Blue-green and vermilion remain separable under the common deficiencies.
7. Brettel, H., Vienot, F. and Mollon, J. D. (1997). Computerized simulation of color appearance for dichromats. Journal of the Optical Society of America A 14(10). Used to check the correct/incorrect pair.
8. Bernard, M. et al. (2002). A comparison of popular online fonts: which size and type is best? Usability News. Common screen sans faces read equally well at 12 pt and above; familiarity matters more than face.
9. Legge, G. E. and Bigelow, C. A. (2011). Does print size matter for reading? A review of findings from vision science and typography. Journal of Vision 11(5). Fluent reading needs x-height between about 0.2 and 2 degrees.
10. Rello, L., Pielot, M. and Marcos, M.-C. (2016). Make it big! The effect of font size and line spacing on online readability. CHI 2016. Larger sizes and spacing improve readability without hurting comprehension.
11. Bringhurst, R. (2004). The Elements of Typographic Style. Measure of 45 to 75 characters, 66 as the ideal.
12. Dyson, M. C. and Haselgrove, M. (2001). The influence of reading speed and line length on the effectiveness of reading from screen. International Journal of Human-Computer Studies 54. Moderate lines of about 55 to 100 characters read effectively; very long or very short lines do not.
13. Lin, D.-Y. M. (2004). Evaluating older adults' retention in hypertext perusal: impacts of presentation media as a function of text topology. Computers in Human Behavior 20. Generous spacing and simple topology aid retention.
