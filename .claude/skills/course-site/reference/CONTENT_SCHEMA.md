# Content schema

Quantitative extensions (7 November 2026): generic formula explorers,
one drill each, checked calculation stages, two progressive hints,
unit-aware answers, written/derive/predict rubrics, convention blocks,
recap constants, and persisted five-question mock attempts are initially
implemented on L00. Segmented practice and in-equation symbol targets are also supported. L02 adds GHK voltage/current density with a zero-voltage limit, weighted parallel voltage, reversal-ratio and spherical-area verification relations, plus permeability units. Written models require a typed response before opening. Their authoritative contract is the new quantitative
extensions section in `docs/CONTENT_SCHEMA.md`; it supersedes the old
“planned” sketches at the end of this reference.

The authoritative contract is `docs/CONTENT_SCHEMA.md` in the repo,
kept in sync with `render.js`, `lectureQuiz.js` and the lint. This file
summarises it so the skill can be read without the repo open. Where
they differ, the repo wins: fix this file. `L00-example.js` in each
course uses every block and question type and is the template.

One file per lecture: `src/content/<course-slug>/L0X.js`, default export
one object. The renderer walks it. No lecture-specific text goes
anywhere else.

```js
export default {
  meta: {
    id: 'L03',                     // matches registry id and shell folder
    number: 3,
    title: 'Synaptic transmission and neurotransmitter systems',  // plain text, no maths
    chapters: [5, 6],
    pages: [{ chapter: 5, from: 111, to: 140 }],                  // book page numbers
    lectureDate: '2026-09-11',
    examDate: '2026-10-02',        // the exam on this lecture, if any
  },
  objectives: ['...'],             // the notes' wording
  prerequisites: [
    { text: 'Resting membrane potential', lectureId: 'L02', sectionId: 'gradients' },
  ],
  sections: [ /* Section[] */ ],
  recap: { terms: [], equations: [] },
  lectureQuiz: [ /* Question[], 12 to 15 */ ],
};
```

Question and section ids are progress keys. Never rename one after the
lecture is published, and never reorder options: the displayed order is
a stable shuffle seeded by lecture id plus question id.

## Section

```js
{
  id: 'receptors',                 // anchor, unique in the lecture
  title: 'Transmitter receptors',
  keyTerms: ['ionotropic', 'metabotropic'],  // first use wrapped in <dfn>
  blocks: [ /* Block[] */ ],
  conceptQuiz: [ /* 1 to 4 easy multiple choice */ ],
}
```

`part` on the first section of a part is `{ id, number, title, intro? }`, with a positive integer number. A plain string is invalid and gated by the shared section lint.

## Blocks

Sections may instead set `mode: 'questions-only'`, omit theory fields,
and supply 1 to 6 easy `conceptQuiz` questions. Every option requires
feedback teaching the fact; all option feedback appears after checking.
Optional `figure` is a complete easy `label` question with a `wordBank`,
rendered as practice without lecture-quiz progress. See the repo schema
and L00 for the full contract.

Every block but `text` is a quiet card with a kicker. No body runs
longer than five lines (about 350 characters). Mechanisms are `steps`,
contrasts are `compare`, secondary in-scope detail is `detail`.

| type | fields |
|---|---|
| `text` | `body` (string or string[]); one or two opening sentences, no card |
| `definition` | `term`, `body` |
| `steps` | `title?`, `steps: (string \| { title, body })[]` |
| `compare` | `title?`, `columns: string[]`, `rows: [{ label, cells: string[] }]`, `rowLabel?` |
| `example` | `title?`, `body` |
| `keyNumber` | `title?`, `items: [{ value, label }]`, `note?` |
| `misconception` | `title?`, `wrong`, `right` |
| `math` | `title?`, `items: [{ tex, label }]`, `note?`; display maths by KaTeX |
| `whyItMatters` | `title?`, `body`; at most one per section |
| `detail` | `title`, `body` or `blocks`; collapsed |
| `figure` | `visual` (below) |
| `video` | `video` (below) |

Two neighbouring blocks pair side by side from 48 rem when they are the
same type (definition, example, whyItMatters, misconception, keyNumber),
each at most 340 characters, and the shorter is at least 55 percent of
the longer. A run of three leaves the third full width. `pair: false`
stops a pairing.

Legacy only, do not use in new lectures: section `body` and `visual`,
the `equation` block (plain monospace), recap `expression`, calc step
`math`.

## Maths

Every formula, symbol and unit goes through KaTeX. Inline maths between
single dollar signs anywhere in text; display maths in `math` blocks,
recap `tex` and calc step `tex`, written without dollars. Content files
use single-quoted strings, so TeX backslashes are doubled:
`'$E_{\\text{K}} = -80\\,\\text{mV}$'`. Units upright with a thin space,
ions as `$\\text{Ca}^{2+}$`. Where markup cannot go (select options,
`meta.title`, SVG widget props) use Unicode (Na⁺, µV). The lint counts
plain-text symbols (E_K, g_Na, 65 mV, Na+) and fails the build on them.

## Figures

A `visual` is `{ type: 'svg' | 'widget', name, props, caption, fallbackAlt }`.
`svg` names a function in `src/content/<slug>/figures/index.js`
returning SVG markup (or gives `markup`); `widget` names an engine in
`src/js/widgets/index.js`. `fallbackAlt` is required.

Real pictures use the `image-hotspots` widget:

```js
{ type: 'figure', visual: { type: 'widget', name: 'image-hotspots', caption, fallbackAlt, props: {
  src: fig('snare'),               // new URL('../../assets/figures/<slug>/L03/snare.webp', import.meta.url).href
  alt: '...',
  aspect: 1200 / 760,              // width / height
  regions: [
    { id: 'syb', label: 'Synaptobrevin', body: 'One line.', shape: 'ellipse',
      x: 42, y: 36, w: 6, h: 4,    // centre and size, percent of the picture
      mx: 40, my: 35,              // optional anchor dot
      side: 'left' },              // left | right | top | bottom | inline (then dir or bx, by)
  ],
  gutter: 'auto',                  // sides | ends | all | auto
  quiz: true,                      // false when labels are printed on the picture
  layout: 'side',                  // 'stack' for wide strips and charts
  labelPool: ['...'],              // extra distractors in quiz mode
} } }
```

At most seven regions. The same `regions` array feeds the label
question, so coordinates are never duplicated.

A video block or a question's `video`:
`{ src, poster, width?, height?, tracks?, caption, fallbackAlt }`, with
`src` and `poster` resolved like figures from `assets/videos/<slug>/`
and `assets/figures/<slug>/`.

## Concept quiz question

```js
{
  id: 'receptors-1',
  prompt: '...',
  options: [
    { text: '...', feedback: 'One line: why, or which misconception.' },
    { text: '...', feedback: 'Correct. One line why.' },
  ],
  correct: 1,                      // authored index; display order is shuffled
}
```

Always easy, one to four per section.

## Recap

```js
recap: {
  terms: [{ term: 'Ionotropic receptor', definition: 'One line, cheat-sheet ready.' }],
  equations: [{ name: 'Nernst equation', tex: '...', note: 'When it holds, what z is.' }],
}
```

## Lecture quiz

12 to 15 questions ordered easy, medium, hard. Shared fields: `id`,
`difficulty`, `type`, `prompt`, `modelAnswer` (string[], the step-by-step
reveal), and optional `points`, `itemPoints`, `beyondExam`, `video`.
Points follow the course's exam: for NBE-E4210, 1 per single-answer
question, 0.25 per sub-item and 0.1 per inline choice, shown on every
question.

| type | own fields | scoring |
|---|---|---|
| `mc` | `options` (`text`, `feedback`), `correct` | 1 point |
| `multiSelect` | `options: [{ text, correct, feedback }]`, any number correct (at least one), count hidden | 0.25 per option, judged ticked or not |
| `inlineChoice` | `sentences: [{ text with ___, choices: [{ options, answer }], explanation? }]`, options in authored order | 0.1 per choice |
| `trueFalse` | `answer`, `justification`; or `statements: [{ text, answer, correction (false ones), justification? }]` | 1, or 0.25 per statement; the student types a one-line correction for each False |
| `fillBlank` | `text` with `___`, `blanks: [{ accept: [...] }]`, `wordBank?` | 0.25 per blank |
| `classify` | `categories`, `categoriesTitle?`, `items: [{ text, answer, explanation? }]` | 0.25 per item; an item with `___` gets its picker inline. Table form: `columns`, `rowHeader?`, items with `answers` (one per column), 0.25 per cell |
| `clinicalCase` | `scenario`, then `options`/`correct` or `accept`/`answerLabel`; `modelAnswer` is the reasoning, at least three steps | 1 point |
| `interpret` | `figure` or `video`, then `options`/`correct`, or `points` plus `markScheme` | 1, or the mark scheme |
| `label` | `hotspots` (an image-hotspots props object, same regions), `wordBank?` or `labelPool?` | 0.25 per region |
| `order` | `items`, `correctOrder` (indices) | 0.25 per position |
| `calc` | `given: [{ symbol, value, unit }]`, `answer: { value, tolerance, unit }`, `steps: [{ text, tex }]` | 1 point, absolute tolerance |
| `essay` | `points`, `markScheme: [{ points, text }]`, `beyondExam: true` required | self-scored |

Word banks (`fillBlank`, `label`): a closed list shown with the question,
entries once-only unless `{ text, reusable: true }`, answer is a picker.
The bank holds every answer, spelled exactly; distractors are course
terms of the same kind and form; entries are not listed in answer order.

Option fairness, enforced by the lint: the correct option is neither
the longest nor the shortest by more than 20 percent of the mean
length, no distractor is under half its length, and correct positions
across the lecture are near uniform.

## Registry

`src/content/<slug>/registry.js` exports `registry`, one entry per
lecture, scheduling and status only:
`{ id, number, title, chapters, lectureDate, examDate, built }`. It also
exports `exampleLecture` (L00), shown on the course map in dev only.
The course itself is one entry in `src/content/courses.js`.

## Planned, not implemented

The first version of this skill specified the features below for
quantitative courses. The renderer does not have them yet. Build them
when a course needs them (NBE-E4120 does), in the renderer,
`docs/CONTENT_SCHEMA.md`, the lint and `L00-example.js` together, then
move them up into the tables above. Full design in `CALCULATIONS.md`.

- Formula explorer: a section's `formulas: [{ id, name, latex, symbols,
  reads, assumes, variants, interactive, drill }]`, each symbol a
  focusable target with name, unit and meaning. Today the nearest thing
  is a `math` block plus a calculator widget (`nernst-calc`,
  `ghk-explorer`). The field would be `tex`, not `latex`, to match the
  repo.
- Drill: one single-step numeric exercise after each explorer.
- `calc` extensions: `hints: [orientation, openingMove]` revealed
  separately and recorded in progress, `commonErrors: [{ wrongValue,
  why }]` matched against the answer, `sigfigs`. Solution steps stay
  `steps: [{ text, tex }]`.
- `multiStepCalc` (parts a, b, c with carried answers), `derive`
  (`steps: [{ tex, justification }]`), `predict`.
- A `convention` block for sign rules, and recap `constants` and
  `conventions`.
- A review bucket for questions solved only after the second hint.

L03 quantitative extension: `cableAxial`, `cableMembrane`, `cableCapacitance`, `cableLength` (optional external resistance), `cableDecay`, `cableInverse` and `cableEvolution` are registered independently in JS and Python. Evolution omits the source term when injection is absent. Cable units include length, specific resistance, resistivity/resistance-length, axial resistance per length, current per length and voltage curvature. Equivalent centimetre/millimetre inputs are supported.

L04 quantitative extension: independent JS/Python relations `passiveSpeed`, `passivePosition` (taught approximate half-rise contour), `powerRatio`, `infiniteCable`, `cableInput`, `finiteCable`, `endpointCable` and `annulus`. Finite-cable inputs are dimensionless `length`, `x`, nonnegative `load`, and optional `mode: "open"`; `v` is volts. `load: 0` means sealed and `load: 1` matched. Endpoint interpolation uses `v0`, `ve`, `length`, `x`. Valid finite positions satisfy zero through positive total length. Stable exponential forms avoid long-cable overflow. Velocity accepts metres/second, centimetres/second and micrometres/millisecond. Restored completed checked stages do not report a duplicate result until an input is edited; rechecking unchanged restored work preserves the existing review result.

L05 quantitative extension: `rallDiameter` takes positive SI `diameters` and returns the three-halves equivalent diameter. `rallConductance` takes positive `diameter`, specific `rm`, axial `ri`, and optional positive electrotonic `length`; it returns one-arm semi-infinite or finite sealed conductance. `sealedResistance` takes positive one-arm `resistance` and electrotonic `length`. `sealedLength` inverts a remaining terminal `fraction` in (0,1]. `pathLength` sums `segments: [{length, lambda}]` in SI with nonnegative physical lengths and positive local scales. `passiveDecay` uses signed `v`, nonnegative `time` and positive `tau`. `resistanceRetune` uses initial `resistance` and positive `old`/`new` characteristic speeds at unchanged geometry/capacitance. JS and independent Python implementations are tested against identities and the supplied Exercise 5.

### L06 quantitative relations (8 November 2026)

`exponentialRate { base, exponent }` computes a nonnegative baseline times the exponential of a finite dimensionless exponent. Used for either permeation coefficients or gating transition rates; their units differ and must be explicit. `gateDerivative { alpha, beta, y }` computes the first-order permissive-state derivative. `gateSteady { alpha, beta }` requires nonnegative rates and a positive sum. `gateRelax { y0, steady, time, tau }` requires probabilities in [0,1], nonnegative elapsed time and positive tau. `gatePower { y, count }` requires probability in [0,1] and positive integer count of independent all-required particles. Independent Python implementations validate these relations. Unit-aware input now accepts `1/s`, `s^-1`, `1/ms`, `ms^-1` as a rate dimension, separate from frequency and time.

The shared GHK current-density evaluator uses a negative-voltage exponential reversal to avoid overflow and retains its continuous zero-voltage limit. Python independently uses a hyperbolic form and local zero-voltage series. Source metadata must still distinguish current density from total current.

Quantitative model-answer entries consisting entirely of `$...$` render as focusable, horizontally scrollable display equations. Mixed prose and inline maths retain paragraph rendering. This applies to checked-stage, written and drill answer entries; long substitutions should be separate equation entries rather than unbreakable inline prose.

### L07 empirical HH rate relation

`hhRate { gate, voltage }` accepts `gate: "an"|"bn"|"am"|"bm"|"ah"|"bh"` and SI volts of depolarization relative to rest, not absolute membrane voltage. It returns inverse seconds. The source laws use numerical millivolts and inverse milliseconds at the squid fit temperature (6.3°C). No temperature scaling is implied. Alpha-n at 10mV relative to rest and alpha-m at 25mV use continuous removable-singularity limits (100/s and 1000/s). JS uses expm1 with a local series; independent Python uses a sinh form with a local series. L07 fixtures exercise the origin, conversion, limits and all authored numeric records.

### L08 current balance, charge and probability

`hhBalance {im, ionic, capacitance}` returns (applied minus outward ionic current)/positive capacitance in V/s. `axialSource {radius, rho, curvature}` returns radius times voltage curvature divided by twice positive bulk axial resistivity, in A/m². `boltzmann {bias, z, voltage, thermal}` returns normalized two-state probability from dimensionless zero-voltage bias plus z times voltage/positive thermal voltage, using stable logistic evaluation. `expCharge {current, tau, time}` integrates a stated ideal exponential to a nonnegative finite time with positive tau. JS and independent Python implementations reject invalid parameters. Units additionally include energy (J/aJ/zJ), charge density (C/m2, nC/cm2, uC/cm2), inverse-area channel density (1/m2, 1/cm2, 1/um2), specific conductance (S/m2, S/cm2, pS/um2), and current per capacitance (A/F, pA/pF). Source density and maximal conductance must share an area basis; these relations do not certify source assumptions.

L09 numeric correction: A/F and pA/pF are accepted as equivalent voltage-slope units to V/s and mV/ms, since A/F = V/s. Unit conversion rejects nonfinite results. No content-specific renderer was added.

`image-hotspots` optionally accepts `minWidth` (finite pixels, 200–2000). It wraps the entire figure stage in a focusable horizontal-scroll viewport, preserving percentage overlay coordinates and source plot/table labels. Omit it for default image sizing. Arrow keys pan the focused viewport; this applies to source rasters as well as SVG.
