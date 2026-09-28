# Content schema

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

## Blocks

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
question and 0.25 per sub-item, shown on every question.

| type | own fields | scoring |
|---|---|---|
| `mc` | `options` (`text`, `feedback`), `correct` | 1 point |
| `trueFalse` | `answer`, `justification`; or `statements: [{ text, answer, correction (false ones), justification? }]` | 1, or 0.25 per statement; the student types a one-line correction for each False |
| `fillBlank` | `text` with `___`, `blanks: [{ accept: [...] }]`, `wordBank?` | 0.25 per blank |
| `classify` | `categories`, `categoriesTitle?`, `items: [{ text, answer, explanation? }]` | 0.25 per item; an item with `___` gets its picker inline |
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
