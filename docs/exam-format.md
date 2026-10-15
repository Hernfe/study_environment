# Mini-exam format

The model for question format, wording, difficulty and point weighting.
Sources, all by the current instructor, Matias Palva:

- `source/nbe-e4210/exams/Mini_exam_1_Sol.pdf`, Mini Exam 1, on
  lecture 1, with solutions (the header says 2025-2026, a stale
  template; it was set this autumn).
- `source/nbe-e4210/exams/Mini exam 2 solution.pdf`, Mini Exam 2, on
  lecture 2, 2026-2027, with solutions.
- `source/nbe-e4210/exams/Mini Exam 3 questions.pdf`, Mini Exam 3, on
  lecture 3 (chapters 5 and 6). Despite the file name this is the
  answer key ("Mini Exam 3 – Answers"): it gives answers and points but
  not every question's full wording or figure.
- `source/nbe-e4210/exams/Mini exam 4-1.pdf` (questions) and
  `Mini exam 4 solution.pdf` (answer key), Mini Exam 4, on lecture 4
  (chapters 9 and 10), held 9.10.

Together they replace the two pre-2020 open-book papers (`14468.pdf`,
`14701.pdf`) for everything except very hard stretch questions. Mini
Exam 4 is the current format.

At the start of every lecture build, check `source/nbe-e4210/exams/` for new
mini-exams. The most recent one is the current format; update this file
when it differs from what is written here. Record what each new paper
adds, and keep what the earlier papers established unless the new one
contradicts it.

## All four papers at a glance

- One hour, paper, one A4 cheat sheet. Eight problems in Exam 1; ten
  problems in each of Exams 2, 3 and 4, on two to three pages.
- Every problem is worth exactly 1 point from Exam 2 on, so a paper is
  worth 10. Exams 3 and 4 print "(1 point)" on every problem, and the
  points Exam 2 prints (Problems 1 to 3) add up to 1 each. Exam 1 was
  the exception: 0.25 per sub-item regardless of count, so its six-item
  problems were worth 1.5.
- The sub-items of a problem divide its 1 point: 0.5 each for two, 0.33
  for three, 0.25 for four, 0.2 for five, 0.1 for ten inline choices.
- Sub-items can carry unequal weights. Exam 4 Problem 9 runs 0.3, 0.3,
  0.4 (the last, which V1 hemisphere, is the inference the first two
  set up). Exam 3 Problem 7 weights glutamate and GABA at 0.2 and the
  six other transmitters at 0.1. Exam 4 Problem 2 splits 0.33, 0.33,
  0.34.
- True or false weighting follows the count: 0.5 per statement with two
  statements (Exam 3, Problem 3), 0.25 with four (Exams 2 and 4).
- No essay questions in any of the four papers. Nothing asks for a
  paragraph. The longest thing the student writes is a one-line
  correction of a false statement or a short phrase in a blank.
- Every answer is a tick, a circled option, a term picked from a list,
  a number in a ranking, a letter in a box, an arrow or dash in a
  table, a mark and a shaded area on a diagram, or a short label or
  term.
- Exams 3 and 4 add three shapes the first two papers did not have:
  matching two lists (four times across the two papers, once picture to
  picture), sorting a flat list into two or three bins with per-item
  weights, and marking a lesion on a pathway diagram then shading the
  visual field it costs.
- Exam 4 Problem 4 is a mixed problem: four 0.25 sub-items of different
  kinds (name one of three cells, two blanks from a word bank, a
  four-option multiple choice, two inline choices). The site writes the
  parts as separate questions.
- Exam 3 Problem 6 repeats Exam 2 Problem 3 almost word for word (rank
  four events at a chemical synapse). Earlier papers are worth
  rehearsing.
- The L6 deck (slide 4) announced a "special type of miniexam about
  Lecture 4" with possible questions about an experiment video
  (YouTube 8VdFf3egwfg). The Exam 4 we have has no video question.

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

### Mini Exam 3 (lecture 3, chapters 5 and 6)

From the answer key; the figures are not in the file.

| # | Type | Items | Points | Site type |
|---|---|---|---|---|
| 1 | Gap junctions: name the parts marked (a) to (c) on a figure (connexin, connexon, gap-junction channel) and give the direction of net current in (d) | 4 | 4 × 0.25 | `matchPairs` (terms to descriptions) or `label` |
| 2 | Mark all the correct statements, 4 statements, 2 correct | 4 | 4 × 0.25 | `multiSelect` |
| 3 | True or false, 2 statements; replace the incorrect terms of the false one | 2 | 2 × 0.5 | `trueFalse` with `statements`, `points: 1` |
| 4 | Rank 5 events of the acetylcholine life cycle (synthesis to choline reuptake) | 5 | 5 × 0.2 | `order` |
| 5 | Fill the blanks, word bank of 5 (decreased, increased, temporal, spatial, shunting), 4 blanks | 4 | 4 × 0.25 | `fillBlank` with `wordBank` |
| 6 | Rank 4 events at a chemical synapse (as Exam 2, Problem 3) | 4 | 4 × 0.25 | `order` |
| 7 | Classify 8 neurotransmitters as inhibitory, excitatory or both | 8 | 2 × 0.2 (glutamate, GABA) + 6 × 0.1 | `groupItems` with item `points` |
| 8 | Circle the correct alternative: nicotinic or muscarinic, depolarization or hyperpolarization, the ion | 5 | 5 × 0.2 | `inlineChoice`, `itemPoints: 0.2` |
| 9 | Single best answer, 2 items: the receptor for fast depolarization (AMPA), the one blocked by $\text{Mg}^{2+}$ (NMDA) | 2 | 2 × 0.5 | two `mc` at `points: 0.5`, or `classify` with `points: 1` |
| 10 | G-protein sequence from a figure: GTP replaces GDP on G-alpha; the two branches are driven by G-alpha and G-beta-gamma | 2 | 2 × 0.5 | `fillBlank` with a `figure`, `points: 1` |

### Mini Exam 4 (lecture 4, chapters 9 and 10)

| # | Type | Items | Points | Site type |
|---|---|---|---|---|
| 1 | Match 4 visual functions to Rods or Cones; circle the number of photopigment types in rods (1/3) and cones (1/3) | 5 | 5 × 0.2 (the circles share one 0.2) | `inlineChoice` with `itemPoints` (0.2, 0.2, 0.2, 0.2, 0.1, 0.1), or `matchPairs` plus `inlineChoice` |
| 2 | For each lesion (right optic nerve, right optic tract, optic chiasm) mark its location on the pathway diagram and shade the lost visual field | 3 | 0.33 + 0.33 + 0.34 | `diagramAnnotate` |
| 3 | Rank 5 events after a light spot in an ON-center field (light absorbed to ganglion cell fires more) | 5 | 5 × 0.2 | `order` |
| 4 | Mixed: (a) which of three cells sends spikes to the brain; (b) ON and OFF pathways signal local brightening or darkening, word bank; (c) main function of center-surround fields, 4 options; (d) each LGN gets (one eye / both eyes) and represents the (ipsilateral / contralateral) hemifield | 4 | 4 × 0.25 | separate `mc`, `fillBlank` with `wordBank`, `inlineChoice` |
| 5 | True or false, 4 statements; correct the false ones (2 false: cortical magnification, V1 fields are not all center-surround) | 4 | 4 × 0.25 | `trueFalse` with `statements` |
| 6 | Label 5 eye structures on a figure from a list of exactly those 5 | 5 | 5 × 0.2 | `label` with `wordBank` |
| 7 | Match 4 stimulation conditions on an ON-center field (pictures) to 4 spike-response patterns (pictures) | 4 | 4 × 0.25 | `matchPairs` with figures |
| 8 | Complete 2 sentences on the dorsal and ventral streams, word bank of 6 with 2 distractors (Colour vision, Frontal) | 4 | 4 × 0.25 | `fillBlank` with `wordBank` |
| 9 | Trace a point in the right hemifield: nasal or temporal retina in each eye, which V1 hemisphere | 3 | 0.3 + 0.3 + 0.4 | `fillBlank` or `inlineChoice` with weights |
| 10 | Match 2 descriptions to Simple cell or Complex cell | 2 | 2 × 0.5 | `matchPairs` (`reusable`) or `classify`, `points: 1` |

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

### Matching two lists (Exams 3 and 4)

- "Match each description with the correct cell type: Simple cell or
  Complex cell" (Exam 4, Problem 10); "Match each visual function to
  the photoreceptor type that contributes most strongly. Write Rods or
  Cones" (Exam 4, Problem 1); the gap-junction parts (Exam 3,
  Problem 1).
- Exam 4 Problem 7 matches pictures to pictures: four patches of
  retina with a lit center, surround or both on top, four spike
  trains below, an empty box under each train for the condition's
  letter. Scored per box, 0.25 each.
- A target may answer several items (Rods answers two of four), or
  each one item (Problem 7). There is not always a spare target.

### Sorting into groups (Exam 3, Problem 7)

- "Classify the neurotransmitters according to their usual effect
  (inhibitory, excitatory, both)." A flat list of eight names, three
  bins: inhibitory (GABA, glycine, endocannabinoids), excitatory
  (glutamate), and "both inhibitory and excitatory, depending on the
  receptor and target cell" (acetylcholine, dopamine, serotonin,
  histamine).
- Unequal weights: the two headline transmitters 0.2, the rest 0.1.
- Bins can be very uneven (one item in "excitatory").

### Mark the diagram (Exam 4, Problem 2)

- "For each lesion, mark its location on the visual pathway diagram and
  shade the affected area of the visual field." Three copies of a
  greyscale Figure 10.5 (field above, eyes, nerves, chiasm, tracts,
  radiations to V1), one per lesion: the right optic nerve, the optic
  tract on the right side, the optic chiasm.
- Two steps per lesion: place the cut, then shade the lost field.
  Answers: right monocular blindness, left homonymous hemianopia,
  bitemporal hemianopia, each drawn in black on the field.
- Exam 4 Problem 9 is the same figure read the other way: a dot in the
  right hemifield, which hemiretina in each eye, which V1 hemisphere.

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

### True or false with correction (0.25 or 0.5 per statement)

- "Determine whether each statement is True (T) or False (F)." Six
  statements in Exam 1 (three false), four in Exams 2 and 4 (two
  false, 0.25 each), two in Exam 3 (one false, 0.5 each: "If false,
  replace the incorrect terms").
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

- Every problem is 1 point (Exams 2 to 4). Its sub-items divide it:
  0.5, 0.33, 0.25, 0.2 or 0.1 depending on how many there are.
- Sub-items are usually equal, but not always: 0.3, 0.3, 0.4 (Exam 4,
  Problem 9), 0.2 for the two key items and 0.1 for the rest (Exam 3,
  Problem 7), 0.33, 0.33, 0.34 (Exam 4, Problem 2), two circled numbers
  sharing one 0.2 sub-item (Exam 4, Problem 1e).
- Exam 1 counted 0.25 per sub-item whatever the problem size, and 1
  for a single-answer question.

The site (docs/CONTENT_SCHEMA.md, Points): single-answer questions
default to 1 point, `inlineChoice` choices to 0.1 and other sub-items
to 0.25, the convention of Exams 1 and 2, kept so built lectures keep
their scores. The types added for Exams 3 and 4 (`matchPairs`,
`groupItems`, `diagramAnnotate`) default to 1 point split over their
sub-items. Every type accepts `points` (the total, split evenly),
`itemPoints` (a number, or one value per sub-item) and `points` on a
single sub-item, so a question can carry the paper's exact weights.
New questions modelled on a paper problem should set `points: 1`
unless the problem itself is unusual.

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
- Exam 4 adds pathway reasoning at the same level: predict the field
  defect of a named lesion (Problem 2), trace a field point through
  hemiretina, chiasm and V1 (Problem 9), match stimulus to response on
  a center-surround field (Problem 7). Each is a known rule applied
  once, not a new multi-step scenario.
- Ranking grows from four events (Exams 1 to 3) to five (Exam 3
  Problem 4, Exam 4 Problem 3), still a sequence taught on the slides.
- Nothing requires a calculation, a multi-step prediction, a written
  explanation beyond one line, or combining two lectures.
- This sets the site's medium tier. Easy questions sit below it (one
  fact, one term). Hard questions sit deliberately above it (multi-step
  scenarios, quantitative predictions, calculations), as a margin of
  safety and for understanding; see docs/PEDAGOGY.md section 2.

## What this changes for the site

- Essays are not part of the exam: none in any of the four papers. The
  default is zero essays per lecture; a kept essay is labelled as
  beyond the exam format.
- Core types per lecture: at least 2 `classify` (one may be the table
  form), 1 `label` with a word bank, 2 `trueFalse` with a written
  correction, 2 `multiSelect`, 1 `inlineChoice` (added after Exam 2),
  1 `matchPairs` and 1 `groupItems` (added after Exams 3 and 4; L03 and
  L04 do not owe them yet, `pending` in the lint).
- `diagramAnnotate` where a lecture has a pathway with lesion logic
  (L04, and later the somatosensory and motor pathways); not a
  per-lecture minimum.
- Weight sub-items as the paper would: `points: 1` for a typical
  problem, per-item `points` where one item carries the inference.
- Word banks are not always given: Exam 2 asks for labels and blanks
  from memory. Keep word banks on the lint's minimum, and write some
  `fillBlank` and `clinicalCase` (name form) items without one.
- Points are shown per question and per sub-item, 1, 0.25 and 0.1 by
  default, so the student practises with the paper's weighting.
- Where a lecture has a quantity with a concentration dependence, write
  at least one "raise or lower this, which way does it shift?" item,
  as a `multiSelect` offering both directions.
