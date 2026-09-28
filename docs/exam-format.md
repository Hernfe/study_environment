# Mini-exam format

The model for question format, wording, difficulty and point weighting.
Sources, both by the current instructor, Matias Palva, with solutions:

- `source/nbe-e4210/exams/Mini_exam_1_Sol.pdf`, Mini Exam 1, on
  lecture 1 (the header says 2025-2026, a stale template; it was set
  this autumn).
- `source/nbe-e4210/exams/Mini exam 2 solution.pdf`, Mini Exam 2, on
  lecture 2, 2026-2027.

Together they replace the two pre-2020 open-book papers (`14468.pdf`,
`14701.pdf`) for everything except very hard stretch questions.

At the start of every lecture build, check `source/nbe-e4210/exams/` for new
mini-exams. The most recent one is the current format; update this file
when it differs from what is written here. Record what each new paper
adds, and keep what the earlier papers established unless the new one
contradicts it.

## Both papers at a glance

- One hour, paper, one A4 cheat sheet. Eight problems on three pages
  (Exam 1), ten on three pages (Exam 2).
- No essay questions in either paper. Nothing asks for a paragraph.
  The longest thing the student writes is a one-line correction of a
  false statement.
- Every answer is a tick, a circled option, a term picked from a list,
  a number in a ranking, an arrow or dash in a table, or a short label
  or term.
- Points run in 0.1 and 0.25 increments: 0.1 per circled inline choice
  (Exam 2), 0.25 per sub-item (statement, position, blank, label), 1
  for a question with one answer (Exam 1). Exam 1 totals 10 points.
  Exam 2 prints points only on Problems 1 to 3; the rest are scored on
  the site at 0.25 per sub-item by analogy.
- Exam 2 moves towards many small, separately scored decisions: ten
  inline choices, four "which are correct" sets of four statements, a
  table of eight cells. There is no single-answer multiple-choice
  question in Exam 2.

### Mini Exam 1 (lecture 1)

| # | Type | Items | Points | Site type |
|---|---|---|---|---|
| 1 | Single-answer multiple choice, 4 options | 1 | 1 | `mc` |
| 2 | Scenario multiple choice, 4 options | 1 | 1 | `clinicalCase` (pick) |
| 3 | Classify statements into 4 cell types | 6 | 6 × 0.25 | `classify` |
| 4 | Rank 4 research approaches by scale | 4 | 4 × 0.25 | `order` |
| 5 | Match 4 cortical areas to their lobe, word bank | 4 | 4 × 0.25 | `classify` |
| 6 | Complete 6 sentences with a directional term, word bank | 6 | 6 × 0.25 | `classify` (blank in the item) or `fillBlank` with `wordBank` |
| 7 | Identify 6 structures on a figure, word bank | 6 | 6 × 0.25 | `label` with `wordBank` |
| 8 | True or false, 6 statements; false ones are corrected | 6 | 6 × 0.25 | `trueFalse` with `statements` |

### Mini Exam 2 (lecture 2)

| # | Type | Items | Points | Site type |
|---|---|---|---|---|
| 1 | Circle the right answer: 4 sentences, 10 inline choices of 2 or 3 options | 10 | 10 × 0.1 | `inlineChoice` |
| 2 | True or false, 4 statements; the false ones are corrected | 4 | 4 × 0.25 | `trueFalse` with `statements` |
| 3 | Rank 4 events at a chemical synapse (1 = first) | 4 | 4 × 0.25 | `order` |
| 4 | Complete one sentence, 2 blanks, no word bank | 2 | not printed | `fillBlank` |
| 5 | Which statements about patch-clamp recording are correct? 4 statements | 4 | not printed | `multiSelect` |
| 6 | Which statements about action potential formation and propagation are correct? | 4 | not printed | `multiSelect` |
| 7 | Extracellular $\text{K}^+$ rises from $5$ to $20\,\text{mM}$; mark the correct statements | 4 | not printed | `multiSelect` |
| 8 | Which statements about the phospholipid bilayer are correct? | 4 | not printed | `multiSelect` |
| 9 | Table: dominant $\text{Na}^+$ and $\text{K}^+$ movement in 4 phases of the action potential, as into the cell, out of the cell, or none | 8 | not printed | `classify` with `columns` |
| 10 | Name 5 marked phases and periods on an action potential plot, no word bank | 5 | not printed | `label` (or `fillBlank`) |

## Problem types and wording

### Single-answer multiple choice (1 point; Exam 1)

- "Which one is not a part of the brainstem?" Four options in one row:
  Medulla, Pons, Cerebellum, Midbrain.
- Options are single terms of the same kind (all brain regions). The
  distractors are the true members of the set; the answer is the
  near-neighbour that is not.
- The question may be phrased in the negative ("not a part of").

### Scenario multiple choice (1 point; Exam 1)

- Two or three sentences of patient scenario, then one question: "A
  patient has suffered severe brain damage. They can breathe on their
  own and their heart is beating, but they do not wake up or show signs
  of consciousness. Which part of the brain is most likely to still be
  functioning relatively well?"
- Four one- or two-word options, one of them "All".
- The reasoning is one step: map the preserved functions (breathing,
  heartbeat) to the structure that controls them.

### Circle the right answer (0.1 per choice; Exam 2, Problem 1)

- "Circle the right answer (each 0.1)". Four numbered sentences, each
  with one to four bracketed choices written inline, options separated
  by slashes: "At rest, the neuronal membrane is more permeable to
  ($\text{Na}^+$ / $\text{K}^+$ / $\text{Ca}^{2+}$) and the resting
  membrane potential is about ($-65\,\text{mV}$ / $+62\,\text{mV}$ /
  $-80\,\text{mV}$)."
- Two or three options per bracket: ions, values, structures,
  directions (in / out, slower / faster), or a consequence
  (neurotransmitter release / repolarization / myelination). One
  sentence carries four brackets: "The sodium-potassium pump moves
  (3/2) $\text{Na}^+$ (in / out), (2/3) $\text{K}^+$ (in / out)."
- Each bracket is scored on its own. The options are printed in a fixed
  order, and the right one is not always first.
- The distractors are near-neighbours: another ion, another plausible
  resting value ($-80\,\text{mV}$, close to $E_{\text{K}}$), the
  opposite direction.

### Classification (0.25 per statement; Exam 1)

- "For each statement below, classify it as describing primarily a
  Neuron / Astrocyte / Myelinating glial cell / Microglia."
- The categories are named once in the stem, separated by slashes.
  Each is used at least once and may be used more than once (two
  statements each for myelinating glia and astrocytes).
- Statements are one or two sentences and describe a function, a
  lesion or an experimental finding, never the name: "Damage to a
  particular cell population leaves axons structurally present, but
  causes electrical signals to propagate more slowly and less
  reliably." The student has to map the description to the cell type.
- Several statements are small scenarios ("A mutation disrupts...", "A
  researcher finds that..."). This is the paper's main applied item.

### Classification in a table (Exam 2, Problem 9)

- "For each phase, indicate the direction of the dominant
  $\text{Na}^+$ and $\text{K}^+$ movement by drawing arrows. If there
  is little or no movement through a voltage-gated channel, indicate
  this with '–'." A membrane figure shows the channels in four phases
  (resting, depolarization, repolarization, hyperpolarization).
- The answer is a table: one row per phase, one column per ion, and
  every cell takes one of a small fixed set: into the cell, out of the
  cell, or none (–). Five of the eight cells are "–".
- The same few categories are applied across rows, so this is a
  classification with two answers per row. Each cell is a sub-item.

### Ranking (0.25 per position)

- Exam 1: "Arrange the following research approaches from the smallest
  to the largest scale of analysis (1 = smallest, 4 = largest)." Four
  described methods, not named levels.
- Exam 2: "Rank the following events at a chemical synapse in the order
  they occur (1 = first, 4 = last)." Four events, listed out of order.
  Two are close neighbours that must be split: "Voltage-gated
  $\text{Ca}^{2+}$ channels open" before "$\text{Ca}^{2+}$ enters the
  presynaptic terminal".
- The student writes a number beside each; scored per position.

### Which statements are correct (Exam 2, Problems 5 to 8)

- "Which statements about patch-clamp recording are correct?" Four
  statements, each with a tick box. The number of correct ones is not
  given, and it varies: three, two, two and two in Exam 2.
- Scored per statement: each tick box is a separate judgement.
- The incorrect statements are built like false true-or-false items:
  an over-generalisation ("can only be initiated at the axon hillock",
  "necessarily represents"), a wrong mechanism ("held together by
  hydrogen bonds"), or a reversed claim ("free passage of ions").
- Problem 7 is the reasoning variant: a concentration change is given
  ("Suppose extracellular $\text{K}^+$ rises from $5\,\text{mM}$ to
  $20\,\text{mM}$, while other ions stay the same") and the statements
  are the possible shifts in both directions: the resting potential
  hyperpolarizes or depolarizes, $E_{\text{K}}$ becomes more positive
  or more negative. The student predicts the direction, no number.

### Matching with a word bank (0.25 per item; Exam 1)

- "Match each cortical area to its lobe." Four areas, word bank of the
  four lobes. One answer per bank entry here, but the bank is not
  labelled as use-once.
- Form: "Visual cortex → ___".

### Completion (0.25 per blank)

- Exam 1, with a word bank: "Complete each statement using the correct
  anatomical directional term." Six sentences, one blank each,
  "Choices: Anterior Posterior Superior Inferior Medial Lateral". Each
  term is used once here, so the last blank is partly given by
  elimination.
- Exam 2, without a word bank: "The structure connecting cells at an
  electrical synapse is a ___, and ___ pass directly through it."
  Answers: gap junction, ions. The student writes the term.

### Figure labelling (0.25 per structure)

- Exam 1, with a word bank: "Identify the six brain structures
  indicated in the figure below." Six boxes and leader lines, "Word
  bank: Thalamus • Cerebellum • Olfactory bulb • Central sulcus •
  Visual cortex • Auditory cortex". Exactly the six answers, no
  distractors, each used once.
- Exam 2, without a word bank: "Write the name of the phases shown in
  the diagram." An action potential plot (membrane potential against
  time, threshold and resting lines marked) with five empty boxes:
  rising phase, falling phase, undershoot, and two shaded periods.
  Answers: depolarization, repolarization, hyperpolarization, absolute
  refractory period, relative refractory period.
- Structures and phases are the ones named on the slides, drawn in a
  textbook style picture the student has not necessarily seen before.

### True or false with correction (0.25 per statement)

- "Determine whether each statement is True (T) or False (F)." Six
  statements in Exam 1 (three false), four in Exam 2 (two false).
- A false statement requires a one-line correction. The Exam 2
  solution writes one out: "Backward propagation is mainly prevented
  because voltage-gated $\text{Na}^+$ channels immediately behind the
  action potential are inactivated." Exam 1: "Axon terminals do not
  contain ribosomes."
- False statements are built by one wrong link in an otherwise correct
  chain ("calcium ... directly crosses the synaptic cleft"; backward
  propagation blocked by slow $\text{K}^+$ channels instead of
  $\text{Na}^+$ inactivation), a wrong parameter ("The Nernst equation
  includes membrane permeability"), or an over-generalisation. True
  statements may carry a "because" clause that must also be right.

## Presentation

- Options of a single-answer question are shown in one row with tick
  boxes; statements of a "which are correct" question in a column,
  each with a tick box.
- Inline choices are written in brackets inside the sentence,
  separated by slashes.
- Categories for a classification are listed in the stem with slashes,
  or given by the instruction (arrows or "–").
- Word banks sit directly under the items ("Word bank:", "Choices:").
- Sub-items are lettered a), b), c) or numbered 1., 2., 3.
- Point values are printed with a problem when given: "(1 point)",
  "(Each 0.25 point)", "(each 0.25)", "(each 0.1)".

## Point weighting

- 1 point: a question with one answer (multiple choice, scenario).
- 0.25 point: each sub-item of a multi-part problem (a statement to
  classify, a table cell, a position to rank, a blank, a label, a
  true-or-false statement, a statement in a "which are correct" set).
- 0.1 point: each inline choice of a "circle the right answer" problem.
- Most of the paper's points sit in the multi-part problems.

The site uses the same convention (docs/CONTENT_SCHEMA.md, Points):
single-answer questions default to 1 point, `inlineChoice` choices to
0.1, every other sub-item to 0.25.

## Difficulty ceiling

- Recall and identification dominate: naming a structure or phase,
  picking an ion or value, matching an area to a lobe.
- The hardest items are one-step applications: map a described lesion,
  mutation or finding to a cell type (Exam 1, Problem 3), map preserved
  functions to the brainstem (Exam 1, Problem 2), spot the single wrong
  link in a mechanism (true or false in both papers), predict the
  direction of a shift after a concentration change (Exam 2,
  Problem 7), give the dominant ion flow in each phase (Exam 2,
  Problem 9).
- Changing a concentration and predicting the direction of the
  resulting shift (of the resting potential, of a Nernst potential) is
  in the instructor's repertoire. It is asked qualitatively: no
  number is computed, even though the Nernst equation is in scope.
- Nothing requires a calculation, a multi-step prediction, a written
  explanation beyond one line, or combining two lectures.
- This sets the site's medium tier. Easy questions sit below it (one
  fact, one term). Hard questions sit deliberately above it (multi-step
  scenarios, quantitative predictions, calculations), as a margin of
  safety and for understanding; see docs/PEDAGOGY.md section 2.

## What this changes for the site

- Essays are not part of the exam: none in either paper. The default is
  zero essays per lecture; a kept essay is labelled as beyond the exam
  format.
- Core types per lecture: at least 2 `classify` (one may be the table
  form), 1 `label` with a word bank, 2 `trueFalse` with a written
  correction, 2 `multiSelect`, 1 `inlineChoice` (added after Exam 2).
- Word banks are not always given: Exam 2 asks for labels and blanks
  from memory. Keep word banks on the lint's minimum, and write some
  `fillBlank` and `clinicalCase` (name form) items without one.
- Points are shown per question and per sub-item, 1, 0.25 and 0.1 by
  default, so the student practises with the paper's weighting.
- Where a lecture has a quantity with a concentration dependence, write
  at least one "raise or lower this, which way does it shift?" item,
  as a `multiSelect` offering both directions.
