# Content schema

The shape of `src/content/L0X.js`. This document is the contract with
`src/js/render.js`, `conceptQuiz.js`, `lectureQuiz.js` and `review.js`.
A new lecture must be addable by following this file alone.

To add a lecture:

1. Write `src/content/L0X.js` exporting a default object of the shape
   below. Any figures it needs go in `src/content/figures/` and are
   registered in `src/content/figures/index.js`.
2. Copy `src/lectures/L00/index.html` to `src/lectures/L0X/index.html`
   and change `data-lecture="L0X"`.
3. Add `L0X: 'lectures/L0X/index.html'` to `pages` in `vite.config.js`.
4. Set `built: true` for that lecture in `src/content/registry.js`.
5. `npm run build`.

`src/content/L00-example.js` is a complete dummy lecture that uses every
section and question type. Use it as a template.

After `vite build`, npm runs the build report (`scripts/build_report.mjs`,
which runs `scripts/lint_questions.py`). Read it for the new lecture and
fix every finding before committing. See "Question lint" at the end.

## Top level

```js
export default {
  meta,            // required
  objectives,      // required, string[]
  prerequisites,   // required, may be []
  sections,        // required, Section[]
  recap,           // required
  lectureQuiz,     // required, Question[]
};
```

## meta

```js
meta: {
  id: 'L01',                       // matches registry id and folder name
  number: 1,                       // lecture number shown in the header
  title: 'Neurons, glia and the structure of the nervous system',
  chapters: [1, 2, 7],             // textbook chapters
  pages: [                         // textbook page ranges, book page numbers
    { chapter: 1, from: 3, to: 22 },
    { chapter: 2, from: 23, to: 54 },
  ],
  lectureDate: '2026-09-02',       // ISO date
  examDate: '2026-09-18',          // ISO date of the mini-exam on this lecture
}
```

## objectives

Plain strings, one per learning objective, in the notes' wording.

```js
objectives: [
  'Name the parts of a neuron and state the job of each.',
  'Explain the difference between grey and white matter.',
]
```

## prerequisites

What the student should already know. `lectureId` and `sectionId` are
optional; when present the renderer links to that section.

```js
prerequisites: [
  { text: 'Basic cell biology: membrane, nucleus, proteins.' },
  { text: 'Resting membrane potential', lectureId: 'L02', sectionId: 'resting-potential' },
]
```

## sections

One concept block each, in teaching order. A section is a sequence of
`blocks` (preferred) or a plain `body` of paragraphs (legacy, still
supported for L00). Figures are blocks too, so they sit where the
text needs them. Every section ends with its `conceptQuiz`.

```js
{
  id: 'neuron-parts',                 // unique in the lecture, used for anchors
  title: 'The parts of a neuron',
  keyTerms: ['soma', 'dendrite', 'axon', 'axon terminal'],
  blocks: [ /* Block[], see "Blocks" below */ ],
  body: [ /* legacy alternative: string[] of paragraphs, or one HTML string */ ],
  visual: {                           // optional; a figure placed after the blocks
    type: 'svg',                      // 'svg' for a static figure, 'widget' for interactive
    name: 'neuron-parts',             // key in figures/index.js (svg) or widgets/index.js (widget)
    props: {},                        // passed to the figure or widget function
    caption: 'A typical neuron. Information flows from dendrites to terminal.',
    fallbackAlt: 'Drawing of a neuron with the soma on the left, dendrites branching from it, and a long axon ending in a terminal on the right.',
  },
  conceptQuiz: [ /* ConceptQuestion[] , 1 to 4 items */ ],
}
```

### Blocks

Each block renders as its own quiet card with a small kicker heading,
so the scan path down a section is the h2, then kickers, then short
bodies. No prose body should run longer than five lines (about 350
characters at the site measure). Mechanisms are `steps`, contrasts are
`compare`, secondary in-scope detail goes in `detail` (collapsed).

| type | fields | Renders as |
|---|---|---|
| `text` | `body` (string or string[]) | Plain paragraph(s), no card. One or two sentences to open a section. |
| `definition` | `term`, `body` | Card, kicker "Definition · term". |
| `steps` | `title?`, `steps: (string \| { title, body })[]` | Card with a numbered list. Use for any mechanism or procedure. |
| `compare` | `title?`, `columns: string[]`, `rows: [{ label, cells: string[] }]`, `rowLabel?` | Card with a small table, one row per feature. |
| `example` | `title?`, `body` | Card, kicker "Example". A concrete case or worked instance. |
| `keyNumber` | `title?`, `items: [{ value, label }]` (or `value`, `label` directly), `note?` | Card with large tabular numbers and their meaning. |
| `misconception` | `title?`, `wrong`, `right` | Card with "Not this:" and "But this:" lines. |
| `math` | `title?`, `items: [{ tex, label }]` (or `tex`, `label` directly), `note?` | Card, kicker "Equation". Each `tex` is typeset by KaTeX in display mode, its meaning under it. Use for every formula. |
| `equation` | `title?`, `items: [{ expression, label }]`, `note?` | Legacy (L02): plain-text expression in monospace. Do not use in new lectures; use `math`. |
| `video` | `video: Video` (or the Video fields directly) | A lecture clip with a poster frame. See "Videos". |
| `whyItMatters` | `title?`, `body` | Card, kicker "Why it matters". One or two sentences. |
| `detail` | `title`, `body` or `blocks` | `<details>` collapsed by default. Optional depth within slide scope. |
| `figure` | `visual` | A figure, same shape as a section `visual`. |

`keyNumber` values may hold inline maths (`'$-65\\,\\text{mV}$'`).

```js
blocks: [
  { type: 'text', body: 'A neuron has three main regions.' },
  { type: 'definition', term: 'Soma', body: 'The cell body. Holds the nucleus.' },
  { type: 'steps', title: 'Chemical transmission', steps: ['An action potential arrives.', { title: 'Calcium enters:', body: 'voltage-gated channels open.' }] },
  { type: 'compare', title: 'Two kinds of glia', columns: ['Where', 'Job'], rows: [{ label: 'Astrocyte', cells: ['CNS', 'Environment'] }] },
  { type: 'keyNumber', items: [{ value: '86 billion', label: 'neurons in the human brain' }] },
  { type: 'math', title: 'Nernst equation', items: [{ tex: 'E_{\\text{ion}} = \\frac{61.5\\,\\text{mV}}{z}\\log_{10}\\frac{[\\text{ion}]_{\\text{out}}}{[\\text{ion}]_{\\text{in}}}', label: 'At $37\\,^{\\circ}\\text{C}$. $z$ is the charge.' }] },
  { type: 'misconception', wrong: 'More neurons means smarter.', right: 'Compare at the same anatomical level.' },
  { type: 'whyItMatters', body: 'A result applies to the scale that was measured.' },
  { type: 'detail', title: 'Cortical maps and atlases', body: ['...', '...'] },
  { type: 'figure', visual: { type: 'widget', name: 'image-hotspots', props: { /* see Widgets */ }, caption: '...', fallbackAlt: '...' } },
]
```

Key terms are marked with `<dfn>` in block text but never inside
figures, buttons or selects.

Two-up rows: the renderer puts two neighbouring blocks side by side
(from 48 rem) when they are the same type (definition, example,
whyItMatters, misconception or keyNumber), both at most 340 characters,
and within 55 percent of each other in length. A run of three leaves
the third full width. Add `pair: false` to a block to keep it full
width. See docs/DESIGN.md, Layout.

### Maths

Every formula, symbol and unit expression goes through KaTeX
(`src/js/math.js`). No plain-text symbols such as E_eq, g_Na, uV, Na+ or
log10 in any student-facing text. The build report counts leftovers.

- Display maths: a `math` block, a recap equation's `tex`, or a calc
  step's `tex`. Write the TeX without dollar signs.
- Inline maths: anywhere in text (block bodies, titles, captions,
  prompts, options, feedback, model answers, mark schemes, hotspot
  region bodies, calc `given` symbols) between single dollar signs:
  `'The equilibrium potential $E_{\\text{K}}$ is about $-80\\,\\text{mV}$.'`
- Content files use single-quoted JS strings, so every TeX backslash is
  doubled: `\\frac`, `\\text`, `\\,`. A literal dollar sign is `\\$`.
- Units: upright with a thin space, `$50\\,\\mu\\text{V}$`,
  `$2\\,\\text{ms}$`. Ions: `$\\text{Na}^+$`, `$\\text{Ca}^{2+}$`,
  `$\\text{Cl}^-$`. Named quantities: `$E_{\\text{Na}}$`, `$g_{\\text{K}}$`,
  `$V_m$`.
- Not in places that cannot hold markup: `<select>` options (hotspot
  `label`s used in a label question's picker and `labelPool`), widget
  props drawn into SVG, and `meta.title`. There `stripMath` shows a
  plain approximation, so prefer Unicode there (Na⁺, µV).
- The renderer typesets after rendering and keeps watching the page, so
  text added later (option feedback, check results, hotspot panels,
  review cards) is typeset too. Key terms are never marked inside maths.

### Videos

Slide decks embed clips that the PDF export shows as a black box.
`scripts/extract_figures.py videos <deck.pdf>` lists them by slide (the
`list` command prints the same report); ask for the PPTX or the clip,
then `scripts/video_asset.py pptx <deck.pptx>` extracts the media and
`scripts/video_asset.py add <clip> --lecture L0X --name <name> --at <s>`
copies or transcodes it to `src/assets/videos/L0X/` and writes a poster
frame to `src/assets/figures/L0X/<name>-poster.webp`.

```js
const v1Clip = {
  src: new URL('../assets/videos/L04/v1-neurons.mp4', import.meta.url).href,
  poster: new URL('../assets/figures/L04/v1-neurons-poster.webp', import.meta.url).href,
  width: 1280, height: 720,          // optional, avoids layout shift
  sources: [{ src, type }],          // optional, instead of src, for several encodings
  tracks: [{ src, srclang: 'en', label: 'English' }],   // optional captions (WebVTT)
  caption: 'Two-photon recording of V1 neurons ...',
  fallbackAlt: 'Still frame: a field of neurons, some brighter than others.',
};
blocks: [ ..., { type: 'video', video: v1Clip }, ... ]
```

The player has native controls (keyboard operable), `preload="none"`,
and shows the poster until played, so the figure degrades to the still.
Videos are examinable: every `video` block needs at least one lecture
question that carries the same object as `video` (the lint checks the
`src`), so the clip plays inside the question card in review too.

Rules for `body`:

- If it is an array, each element that does not start with `<` is
  wrapped in `<p>`. Elements that start with `<` are inserted as HTML.
- If it is a string, it is inserted as HTML as-is.
- The renderer wraps the first occurrence of each entry in `keyTerms`
  in `<dfn>` automatically (whole word, case-insensitive, text nodes
  only). You can also write `<dfn>` by hand; it will not be doubled.
- No bold, italic or emoji in the text. No em dashes.

Rules for `visual`:

- `type: 'svg'`: `name` must be exported from `src/content/figures/index.js`
  as a function `(props) => svgString`. Alternatively give `markup`
  (an inline SVG string) instead of `name`.
- `type: 'widget'`: `name` must be exported from `src/js/widgets/index.js`
  as an object `{ mount(container, props), fallback?(props) }`.
  `fallback` returns a static SVG string used before mount and if mount
  throws. Widgets must be operable by keyboard: use native inputs.
  Widgets hold no lecture text; everything they show comes from `props`.
  The registered engines and their props are listed under "Widgets".
- `fallbackAlt` is required. It becomes the `aria-label` of the figure.
- `visual` may be `null` for a section that has no sensible picture,
  but the content rules say every block should have one.

### Widgets

| Name | Engine | What it does |
| `image-hotspots` | `imageHotspots.js` | Picture (or SVG markup) with numbered hotspot regions, a region list, arrow-key navigation and a quiz mode. See below. |
|---|---|---|
| `slider-plot` | `sliderPlot.js` | Range inputs change parameters of a plotted curve. See L00. |
| `cortical-map`, `neuron-parts` | `regionMap.js` | Hover, tap, focus or pick from a select to read about a region of a figure. |
| `glia-compare`, `stain-compare` | `compareCards.js` | Radio buttons choose one item; shows its drawing and a definition list, plus an optional summary table. |
| `section-planes` | `sectionPlanes.js` | Radio buttons choose coronal, sagittal or horizontal; the plane is drawn on a lateral and a dorsal view with direction terms. |
| `nernst-calc` | `nernstCalc.js` | Nernst calculator: ion presets, log-spaced concentration sliders, charge, temperature; live E, worked equation, E-versus-ratio plot. Props: `{ ions: [{ key, label, z, inside, outside }], defaultIon, temperature, labels }`. |
| `ghk-explorer` | `ghkExplorer.js` | Permeability sliders move Vm along a voltage axis between the equilibrium potentials, worked GHK equation below. Props: `{ ions: [{ key, label, z, inside, outside, perm, max, step }], temperature, presets: [{ key, label, perms }], labels }`. |
| `ap-scrubber` | `apScrubber.js` | Hodgkin-Huxley spike with a time slider; read-out of phase, Na+ and K+ channel state, conductances and refractory period. Props: `{ phases, naStates, kStates, refractory: { key: { label, body } }, labels }`. |
| `voltage-clamp` | `voltageClamp.js` | Command step from -65 mV; total current with early inward and late outward components; checkboxes remove the Na+ or K+ current. Props: `{ labels }`. |
| `conduction-demo` | `conductionDemo.js` | Three axons with a time slider; active and refractory membrane; myelinated axon jumps node to node; stimulate at one end or in the middle. Props: `{ length, maxTime, axons: [{ key, label, sub, thickness, velocity, internode? }], labels }`. |
| `synapse-timeline` | `synapseTimeline.js` | Step slider through transmission at a schematic synapse with a delay counter. Props: `{ steps: [{ key, label, body, time, timeNote }], labels }`. |
| `synapse-compare` | `synapseCompare.js` | Chemical versus electrical synapse: spike in one cell, response in the other, delay marked; radios for type and which cell fires. Props: `{ types: { chemical, electrical: { label, delay, amplitude, bidirectional, ... } }, labels }`. |
| `driving-force` | `drivingForce.js` | Channel selectivity radios and a Vm slider; I-V line with the current at Vm, and the resulting PSP. Props: `{ channels: [{ key, label, erev, body }], threshold, labels }`. |
| `summation-shunt` | `summationShunt.js` | Passive RC membrane with spatial and temporal EPSP summation and a Cl- shunt toggle. Props: `{ threshold, labels }`. |
| `circuit-motifs` | `circuitMotifs.js` | Radios pick a wiring motif; cells and synapses are drawn from props. Props: `{ motifs: [{ key, label, body, steps, cells, links }], labels }`. |
| `ampa-nmda` | `ampaNmda.js` | Vm slider and glutamate toggle; AMPA and NMDA I-V curves with the Mg2+ block, a pore cartoon and the two time courses. Props: `{ labels }`. |

The five quantitative demos share `hhModel.js` (the membrane model)
and `d3util.js` (range-frame axes, sliders, radios, read-outs, worked
equation lines). Below 48 rem a demo plot scrolls sideways inside
`.plot` rather than shrinking, like chart hotspots.

`regionMap` props:

```js
{
  figure: ({ layer, labels, uid }) => svgString,   // every region element has data-region="<key>"
  layers: [{ key, label, regions: [{ key, name, info }] }],
  defaultLayer: 'lobes',      // optional
  labels: true,               // draw text labels on the figure
  intro: 'Hover or tap...',   // panel text before a choice
  layerLabel: 'Show',         // legend for the layer radios (only if > 1 layer)
  selectLabel: 'Region',      // label of the select
  placeholder: 'Choose a region',
}
```

Region elements in the figure must carry `data-region="<key>"` and the
class `map-region`. Figures in `src/content/figures/` export their
region key lists (for example `REGIONS` in `brain-lateral.js`) so the
content file can attach explanations without repeating geometry.

`compareCards` props:

```js
{
  chooseLabel: 'Cell type',
  fallback: () => svgString,   // optional static overview used before mount
  items: [{ key, label, figure: svgString, rows: [{ term, text }] }],
  table: { caption, columns: ['Cell', 'Where', 'Main job'], rows: [['Astrocyte', 'CNS', '...']] },  // optional
}
```

`sectionPlanes` props:

```js
{
  chooseLabel: 'Plane',
  defaultPlane: 'coronal',
  planes: [{ key: 'coronal' | 'sagittal' | 'horizontal', label, info }],
  directions: { anterior, posterior, dorsal, ventral, lateral, medial },  // optional label text
}
```

#### image-hotspots

```js
props: {
  src: figUrl,                    // URL of the picture (webp); or svg: '<svg ...>' markup
  alt: 'Lateral view of the brain ...',
  aspect: 936 / 454,              // width / height of the picture
  regions: [
    { id: 'frontal', label: 'Frontal lobe', body: 'Anterior to the central sulcus ...',
      shape: 'ellipse',           // 'ellipse' (default) | 'rect' | 'line'
      x: 25, y: 29, w: 26, h: 42, // centre and size, percent of the picture
      mx: 18, my: 24,             // optional anchor dot position (default: centre, or line start)
      side: 'left' },             // optional: 'left' | 'right' | 'top' | 'bottom' | 'inline'
    { id: 'cs', label: 'Central sulcus', body: '...', shape: 'line', x: 36, y: 9, x2: 44, y2: 46, side: 'top' },
    { id: 'aud', label: 'Auditory cortex', body: '...', x: 46, y: 53, w: 14, h: 8,
      side: 'inline', dir: 'down-right' },  // badge on the picture, edge touching the anchor
    { id: 'pt', label: 'Human, cortex', body: '...', x: 62, y: 20, w: 5, h: 8,
      side: 'inline', bx: 70, by: 20 },     // badge at a given spot (charts: after the value)
  ],
  gutter: 'auto',                 // 'sides' | 'ends' | 'all' | 'auto' (ends for strips wider than 2.2:1)
  quiz: true,                     // false for pictures with printed labels
  layout: 'side',                 // 'stack' puts the list under the picture (wide strips, charts)
  showShapes: false,              // true draws every outline at rest (planes, bands)
  intro: 'Hover, tap or use the arrow keys ...',
  labelPool: ['Cerebellum'],      // extra distractor labels for quiz mode
}
```

How a region is marked (docs/DESIGN.md, 6.3): a 5 px anchor dot on the
structure at `mx, my` (or the region centre), a 1 px leader, and an
18 px numbered badge in a gutter outside the picture. `side` picks the
gutter (default: the nearest one); `gutter` says which gutters the
stage has. `side: 'inline'` keeps the badge on the picture, touching
the anchor on the `dir` side (default `up-right`), or centred at
`bx, by`. Use inline only where the picture has clear empty space.
Below 48 rem every badge becomes inline and offset from its anchor.

At most seven regions per figure (docs/DESIGN.md, Figures). Reuse the
same `regions` array for the lecture-quiz label question. Picture
files live in `src/assets/figures/L0X/` and are referenced with
`new URL('../assets/figures/L0X/name.webp', import.meta.url).href`.
Slide crops with printed labels: paint the labels out and inpaint their
leader-line stubs (`scripts/retouch_figure.py paint` and `erase`), so
the widget draws the only leaders.

### ConceptQuestion

Always multiple choice, always easy. Same shape as a lecture `mc`
question but `difficulty` and `modelAnswer` are optional.

```js
{
  id: 'neuron-parts-1',               // unique in the lecture
  prompt: 'Which part of the neuron receives most synaptic input?',
  options: [
    { text: 'The axon', feedback: 'The axon carries output away from the soma.' },
    { text: 'The dendrites', feedback: 'Correct. Dendrites are the main input surface.' },
    { text: 'The axon terminal', feedback: 'The terminal releases transmitter onto the next cell.' },
  ],
  correct: 1,                         // index into options
}
```

## recap

Terms in the order they appeared. Equations are optional.

```js
recap: {
  terms: [
    { term: 'Soma', definition: 'Cell body. Holds the nucleus and most protein synthesis.' },
    { term: 'Axon', definition: 'Output fibre. One per neuron, carries action potentials.' },
  ],
  equations: [
    {
      name: 'Nernst equation',
      tex: 'E_{\\text{ion}} = \\frac{61.5\\,\\text{mV}}{z}\\log_{10}\\frac{[\\text{ion}]_{\\text{out}}}{[\\text{ion}]_{\\text{in}}}',
      note: 'Equilibrium potential of one ion at $37\\,^{\\circ}\\text{C}$. $z$ is the charge.',
    },
  ],
}
```

`tex` is typeset in display mode, exactly as it should be copied onto
the cheat sheet. Legacy lectures use `expression` (plain monospace)
instead; new lectures use `tex`.

## lectureQuiz

12 to 15 questions ordered easy, medium, hard. Target mix per lecture
(docs/PEDAGOGY.md section 2): about 3 easy, 5 medium, 5 hard; at most 1
`essay`; at least 2 `clinicalCase`; at least 1 `label`. Fields shared by
every type:

| Field | Type | Notes |
|---|---|---|
| `id` | string | Unique in the lecture. Progress and review key on `meta.id + ':' + id`, so never rename an id after the lecture is published. |
| `difficulty` | `'easy' \| 'medium' \| 'hard'` | Rendered as a badge. |
| `type` | `'mc' \| 'trueFalse' \| 'fillBlank' \| 'clinicalCase' \| 'interpret' \| 'label' \| 'order' \| 'calc' \| 'essay'` | |
| `prompt` | string | Plain text or HTML, may hold inline maths. |
| `modelAnswer` | string[] | Step-by-step model answer for the reveal button. Optional for `calc` (steps are used). For `clinicalCase` it is the reasoning, shown under "Show the reasoning". |
| `video` | Video | Optional. The clip the question depends on, shown above the answer area. See "Videos". |

Options of every question that has `options` (`mc`, concept questions,
`clinicalCase` and `interpret` in pick mode) are shown in a stable
shuffled order seeded by lecture id plus question id
(`seededOrder` in `src/js/dom.js`). Author them in any order; `correct`
is the authored index. The shuffle is stable, so never reorder or
rename after publishing.

Distractors must match the correct option in length, grammatical form
and specificity. If the correct answer needs a qualifier, give the
distractors qualifiers too. The lint flags a correct option that is the
longest or the shortest by more than 20 percent of the mean option
length, and any distractor under half its length.

### Multiple choice (`mc`)

```js
{
  id: 'q01',
  difficulty: 'easy',
  type: 'mc',
  prompt: 'Which glial cell makes myelin in the central nervous system?',
  options: [
    { text: 'Schwann cell', feedback: 'Schwann cells myelinate peripheral axons, not central ones.' },
    { text: 'Astrocyte', feedback: 'Astrocytes regulate the extracellular environment; they do not make myelin.' },
    { text: 'Oligodendrocyte', feedback: 'Correct. One oligodendrocyte myelinates several central axons.' },
    { text: 'Microglia', feedback: 'Microglia are the immune cells of the brain.' },
  ],
  correct: 2,
  modelAnswer: [
    'Myelin in the CNS is made by oligodendroglia.',
    'In the PNS the same job is done by Schwann cells.',
    'One oligodendrocyte wraps segments of several axons; one Schwann cell wraps one segment of one axon.',
  ],
}
```

### True or false (`trueFalse`)

The student picks True or False and must type a one-line justification
before Check is enabled. On check the authored `justification` is shown
under theirs. Auto-scored on the choice.

```js
{
  id: 'q02',
  difficulty: 'easy',
  type: 'trueFalse',
  prompt: 'True or false: Schwann cells myelinate axons in the spinal cord.',
  answer: false,
  justification: 'The spinal cord is CNS, where oligodendrocytes make myelin; Schwann cells work in the PNS.',
  modelAnswer: ['False. CNS myelin comes from oligodendrocytes.'],
}
```

`justification` is required and one line (under 200 characters). Write
the statement so that it is false for one specific, examinable reason,
or true for a reason the student has to name.

### Fill in the blank (`fillBlank`)

`text` holds one `___` per entry of `blanks`. Each blank lists every
accepted variant; the first is shown as the expected answer. Matching
ignores case, spacing, dash forms and trailing punctuation, nothing
else, so list synonyms and spellings (British and American, singular
and plural) explicitly. Scored per blank; correct only when all match.

```js
{
  id: 'q03',
  difficulty: 'easy',
  type: 'fillBlank',
  prompt: 'Fill in the blanks.',
  text: 'In the CNS, myelin is made by ___; in the PNS, by ___.',
  blanks: [
    { accept: ['oligodendrocytes', 'oligodendrocyte', 'oligodendroglia'] },
    { accept: ['Schwann cells', 'Schwann cell'] },
  ],
  modelAnswer: ['Oligodendrocytes myelinate central axons.', 'Schwann cells myelinate peripheral axons.'],
}
```

### Clinical case (`clinicalCase`)

A short scenario (patient, experiment or preparation), then the student
picks (`options` and `correct`, rendered like `mc`, shuffled) or names
(`accept`, matched like a fill-in blank) the structure, mechanism or
lesion that explains it. `scenario` is drawn in a "Case" box above the
prompt. `modelAnswer` is the step-by-step reasoning, at least three
steps: the key finding, what normally produces it, what must be broken,
the answer.

```js
{
  id: 'q11',
  difficulty: 'hard',
  type: 'clinicalCase',
  scenario: 'After a stroke, a patient understands speech but produces slow, effortful, telegraphic sentences.',
  prompt: 'Which area is most likely damaged?',
  options: [
    { text: 'Broca area in the left inferior frontal gyrus', feedback: 'Correct. Non-fluent speech with spared comprehension.' },
    { text: 'Wernicke area in the left superior temporal gyrus', feedback: 'Wernicke damage gives fluent speech with poor comprehension.' },
    { text: 'Primary auditory cortex in the left temporal lobe', feedback: 'Hearing loss would impair understanding, which is spared here.' },
  ],
  correct: 0,
  modelAnswer: ['Key finding: comprehension spared, production impaired.', '...'],
}
// Name form: replace options/correct with
//   accept: ['Broca area', "Broca's area", 'Broca'], answerLabel: 'Area:'
```

### Interpret (`interpret`)

Read a figure, recording or clip, then answer. `figure` is a visual
(same shape as a section `visual`, including `image-hotspots` with
`quiz: false`) or give `video`. Pick mode: `options` and `correct`
(auto-scored, shuffled). Self-scored mode: `points` and `markScheme`,
as for `essay` (this does not count as an essay).

```js
{
  id: 'q08',
  difficulty: 'medium',
  type: 'interpret',
  prompt: 'The trace shows a neuron under current clamp. What happens to spike frequency as the step grows?',
  figure: { type: 'svg', name: 'fi-steps', props: {}, caption: '...', fallbackAlt: '...' },
  options: [ /* ... */ ],
  correct: 2,
  modelAnswer: ['...'],
}
```

### Short essay (`essay`)

At most one per lecture.

`points` is 2 or 3 for medium, 6 for hard. `markScheme` points must sum
to `points`. See PEDAGOGY.md section 4 for the format.

```js
{
  id: 'q13',
  difficulty: 'hard',
  type: 'essay',
  prompt: 'A drug blocks axonal transport in both directions. Explain, step by step, what happens to synaptic transmission at the terminal over the next days and why.',
  points: 6,
  markScheme: [
    { points: 1, text: 'States that the soma is the site of protein synthesis and the terminal has no ribosomes for most proteins.' },
    { points: 1, text: 'Names anterograde transport along microtubules as the route by which vesicle and membrane proteins reach the terminal.' },
    { points: 1, text: 'Explains that without anterograde transport the supply of new synaptic vesicle components stops.' },
    { points: 1, text: 'Explains that retrograde transport normally returns used material and signals to the soma, so blocking it also stops recycling and feedback.' },
    { points: 1, text: 'Predicts that transmission continues briefly from existing vesicles, then declines as the pool is depleted.' },
    { points: 1, text: 'Applies this to the scenario: names a concrete consequence such as loss of synaptic strength or failure of the synapse within days.' },
  ],
  modelAnswer: [
    'Most proteins used at the axon terminal are made in the soma, because the terminal lacks the machinery to make them.',
    'They travel down the axon by anterograde axoplasmic transport along microtubules, carried by kinesin.',
    'If transport is blocked, the terminal receives no new vesicle proteins, membrane or enzymes.',
    'Retrograde transport, carried by dynein, normally returns old membrane and signalling molecules to the soma; blocking it removes that recycling and feedback.',
    'Existing vesicles keep transmission going for a while, so the effect is delayed rather than immediate.',
    'As the vesicle pool runs down over days, release per action potential falls and the synapse weakens and eventually fails.',
  ],
}
```

### Label the figure (`label`)

Preferred form: give `hotspots`, the same props object as an
`image-hotspots` figure (reuse the region array from the study figure).
The question renders the widget's quiz mode: numbered markers, one
select per marker, check button, per-marker explanation from each
region's `body`. `labelPool` adds distractors.

```js
{
  id: 'q06',
  difficulty: 'medium',
  type: 'label',
  prompt: 'Label the numbered markers on the lateral view of the brain.',
  hotspots: { src, alt, aspect, regions: LOBE_REGIONS, labelPool: ['Cerebellum', 'Brain stem'] },
  modelAnswer: ['1 is the frontal lobe ...'],
}
```

Legacy form (used by L00): `figure` has the same shape as a section visual of type `svg` (no
caption needed). `regions` place numbered markers on the figure using
percentages of its width and height, so they work on any figure size.
The figure is stretched to the width of its wrapper (up to 30 rem), so
compute the percentages from the SVG viewBox: `x = 100 * vx / viewBoxWidth`.
`labels` is the pool the student picks from and must contain every
region label plus 1 to 3 distractors. Each region has an `explanation`
shown after checking.

```js
{
  id: 'q07',
  difficulty: 'medium',
  type: 'label',
  prompt: 'Label the numbered parts of the neuron and read the explanation for each.',
  figure: {
    type: 'svg',
    name: 'neuron-parts',
    props: { labels: false },
    fallbackAlt: 'Neuron with four numbered markers on the cell body, dendrites, axon and terminal.',
  },
  regions: [
    { id: 'r1', x: 18, y: 50, label: 'Soma', explanation: 'Contains the nucleus; most proteins are made here.' },
    { id: 'r2', x: 8, y: 22, label: 'Dendrite', explanation: 'Receives synaptic input from other neurons.' },
    { id: 'r3', x: 55, y: 50, label: 'Axon', explanation: 'Conducts action potentials away from the soma.' },
    { id: 'r4', x: 90, y: 50, label: 'Axon terminal', explanation: 'Releases neurotransmitter onto the next cell.' },
  ],
  labels: ['Soma', 'Dendrite', 'Axon', 'Axon terminal', 'Node of Ranvier', 'Synaptic cleft'],
  modelAnswer: [
    '1 is the soma, the cell body with the nucleus.',
    '2 is a dendrite, the input surface.',
    '3 is the axon, the output fibre.',
    '4 is the axon terminal, where transmitter is released.',
  ],
}
```

### Order the events (`order`)

`items` are the events as written. `correctOrder` lists item indices in
the right sequence. The renderer shuffles the display order.

```js
{
  id: 'q09',
  difficulty: 'medium',
  type: 'order',
  prompt: 'Put the steps of chemical synaptic transmission in order.',
  items: [
    'Neurotransmitter binds receptors on the postsynaptic membrane',
    'Action potential arrives at the axon terminal',
    'Voltage-gated calcium channels open',
    'Vesicles fuse and release neurotransmitter',
  ],
  correctOrder: [1, 2, 3, 0],
  modelAnswer: [
    'The action potential depolarises the terminal membrane.',
    'Depolarisation opens voltage-gated calcium channels, so calcium enters.',
    'Calcium triggers vesicle fusion and transmitter release into the cleft.',
    'Transmitter diffuses across and binds postsynaptic receptors.',
  ],
}
```

### Calculation (`calc`)

`given` lists the data. `answer` is checked against the student's
number within `tolerance` (absolute, same unit). `steps` follow the HW1
style: equation, substitution, intermediate value, final value with
unit. Each step's `tex` is typeset in display mode (legacy lectures use
`math`, plain monospace). `given` symbols may be inline maths.

```js
{
  id: 'q14',
  difficulty: 'hard',
  type: 'calc',
  prompt: 'Potassium is 100 mM inside and 5 mM outside a cell at 37 C. Calculate the potassium equilibrium potential.',
  given: [
    { symbol: '$[\\text{K}^+]_{\\text{in}}$', value: 100, unit: 'mM' },
    { symbol: '$[\\text{K}^+]_{\\text{out}}$', value: 5, unit: 'mM' },
    { symbol: '$T$', value: 37, unit: '°C' },
    { symbol: '$z$', value: 1, unit: '' },
  ],
  answer: { value: -80, tolerance: 1, unit: 'mV' },
  steps: [
    { text: 'Write the Nernst equation at $37\\,^{\\circ}\\text{C}$.', tex: 'E_{\\text{K}} = \\frac{61.5\\,\\text{mV}}{z}\\log_{10}\\frac{[\\text{K}^+]_{\\text{out}}}{[\\text{K}^+]_{\\text{in}}}' },
    { text: 'Substitute the values.', tex: 'E_{\\text{K}} = 61.5\\,\\text{mV} \\times \\log_{10}(5/100)' },
    { text: 'Evaluate the logarithm.', tex: '\\log_{10}(0.05) = -1.301' },
    { text: 'Multiply.', tex: 'E_{\\text{K}} = 61.5 \\times (-1.301) = -80.0\\,\\text{mV}' },
  ],
  modelAnswer: [
    '$E_{\\text{K}}$ is about $-80\\,\\text{mV}$. It is negative because potassium is concentrated inside, so the inside must be negative to hold it in.',
  ],
}
```

## registry.js

`src/content/registry.js` lists every lecture for the home page. It has
no lecture text, only scheduling and status.

```js
{
  id: 'L01',
  number: 1,
  title: '...',
  chapters: [1, 2, 7],
  lectureDate: '2026-09-02',
  examDate: '2026-09-18',
  built: false,               // true once src/content/L01.js exists and the shell is wired
}
```

`review.js` imports content only for entries with `built: true`.

## Progress storage

`progress.js` stores one key per lecture: `nbe4210:progress:<lectureId>`.

```js
{
  version: 1,
  questions: {
    'q01': { attempts: 2, correct: 1, lastResult: 'correct' | 'missed', lastAt: 1726000000000, score: 6, max: 6 },
  },
  concept: {
    'neuron-parts-1': { attempts: 1, correct: 1 },
  },
  lastQuizAt: 1726000000000,
}
```

All storage access is wrapped in try/catch; when storage is unavailable
the site works but shows a notice and remembers nothing.

## Figure assets and credits

Every page ends with a fixed credits line (`renderCredits()` in
`render.js`) linking to `CREDITS.md`. Content files do not add credits
themselves; when a lecture starts using an external or extracted asset,
add a row to the "Assets in use" table in `CREDITS.md`.

Asset pipeline (see each script's docstring):

- `scripts/find_asset.py <keyword>`: search the local Bioicons clone
  (`assets/bioicons/`, ignored by git) and print paths with licence.
- `scripts/bioart_fetch.py`, `scripts/servier_fetch.py`: download from
  NIH BioArt and Servier Medical Art into `assets/incoming/` (ignored).
- `scripts/extract_figures.py`: list embedded images in a slide PDF and
  crop any rectangle at 300 DPI to `src/assets/figures/L0X/<name>.webp`
  (under 200 KB) with a sidecar JSON naming page and crop box.
- `d3` is available for quantitative plots (`import * as d3 from 'd3'`
  or named imports; import only the modules a figure needs).

## Question lint

`scripts/lint_questions.py` (run by `npm run build` as the build
report, or on its own with lecture ids) loads every content file through
`scripts/dump_questions.mjs` and reports:

- `longest`, `shortest`: the correct option is the longest or shortest
  by more than 20 percent of the mean option length.
- `short-distractor`: a distractor under half the correct option's length.
- `positions`: correct-answer positions across the lecture far from
  uniform (chi-square, p < 0.05), both as authored and as shown after
  the seeded shuffle.
- `mix`, `tiers`: 12 to 15 questions, easy to hard order, at most 1
  essay, at least 2 clinicalCase, at least 1 label; tier split against
  about 3, 5, 5 (advisory).
- `error`: a missing required field (justification, accepted answers,
  scenario, model answer, figure for interpret, and so on).
- `video`: a section video with no question that embeds it.
- `maths`: plain-text symbols and units outside `$...$`.

Lengths are measured on what the student reads (tags stripped, TeX
commands counted as one symbol). L00 to L02 predate these rules and are
summarised as legacy; `--verbose` lists every finding, `--strict` (or
`LINT_STRICT=1 npm run build`) exits non-zero on findings in any other
lecture. A new lecture is not done until its report is clean.
