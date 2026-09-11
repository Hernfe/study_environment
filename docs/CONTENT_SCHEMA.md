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

One concept block each, in teaching order.

```js
{
  id: 'neuron-parts',                 // unique in the lecture, used for anchors
  title: 'The parts of a neuron',
  body: [                             // string[] of paragraphs, or one HTML string
    'A neuron has four parts: the soma, the dendrites, the axon and the axon terminal.',
    'The soma holds the nucleus. ...',
  ],
  keyTerms: ['soma', 'dendrite', 'axon', 'axon terminal'],
  visual: {
    type: 'svg',                      // 'svg' for a static figure, 'widget' for interactive
    name: 'neuron-parts',             // key in figures/index.js (svg) or widgets/index.js (widget)
    props: {},                        // passed to the figure or widget function
    caption: 'A typical neuron. Information flows from dendrites to terminal.',
    fallbackAlt: 'Drawing of a neuron with the soma on the left, dendrites branching from it, and a long axon ending in a terminal on the right.',
  },
  conceptQuiz: [ /* ConceptQuestion[] , 1 to 4 items */ ],
}
```

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
|---|---|---|
| `slider-plot` | `sliderPlot.js` | Range inputs change parameters of a plotted curve. See L00. |
| `cortical-map`, `neuron-parts` | `regionMap.js` | Hover, tap, focus or pick from a select to read about a region of a figure. |
| `glia-compare`, `stain-compare` | `compareCards.js` | Radio buttons choose one item; shows its drawing and a definition list, plus an optional summary table. |
| `section-planes` | `sectionPlanes.js` | Radio buttons choose coronal, sagittal or horizontal; the plane is drawn on a lateral and a dorsal view with direction terms. |

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
      expression: 'E_ion = (61.5 mV / z) * log10([ion]out / [ion]in)   at 37 C',
      note: 'Equilibrium potential of one ion. z is the charge.',
    },
  ],
}
```

`expression` is plain text in a monospace block, so it can be copied
onto a cheat sheet exactly.

## lectureQuiz

12 to 15 questions ordered easy, medium, hard. Fields shared by every
type:

| Field | Type | Notes |
|---|---|---|
| `id` | string | Unique in the lecture. Progress and review key on `meta.id + ':' + id`, so never rename an id after the lecture is published. |
| `difficulty` | `'easy' \| 'medium' \| 'hard'` | Rendered as a badge. |
| `type` | `'mc' \| 'essay' \| 'label' \| 'order' \| 'calc'` | |
| `prompt` | string | Plain text or HTML. |
| `modelAnswer` | string[] | Step-by-step model answer for the reveal button. Optional for `calc` (steps are used). |

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

### Short essay (`essay`)

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

`figure` has the same shape as a section visual of type `svg` (no
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
unit. `math` is plain text shown in monospace.

```js
{
  id: 'q14',
  difficulty: 'hard',
  type: 'calc',
  prompt: 'Potassium is 100 mM inside and 5 mM outside a cell at 37 C. Calculate the potassium equilibrium potential.',
  given: [
    { symbol: '[K+]in', value: 100, unit: 'mM' },
    { symbol: '[K+]out', value: 5, unit: 'mM' },
    { symbol: 'T', value: 37, unit: 'C' },
    { symbol: 'z', value: 1, unit: '' },
  ],
  answer: { value: -80, tolerance: 1, unit: 'mV' },
  steps: [
    { text: 'Write the Nernst equation at 37 C.', math: 'E_K = (61.5 mV / z) * log10([K+]out / [K+]in)' },
    { text: 'Substitute the values.', math: 'E_K = 61.5 * log10(5 / 100)' },
    { text: 'Evaluate the ratio and the logarithm.', math: 'log10(0.05) = -1.301' },
    { text: 'Multiply.', math: 'E_K = 61.5 * (-1.301) = -80.0 mV' },
  ],
  modelAnswer: [
    'E_K is about -80 mV. It is negative because potassium is concentrated inside, so the inside must be negative to hold it in.',
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
