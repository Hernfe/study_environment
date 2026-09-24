# Mini-exam format

The model for question format, wording, difficulty and point weighting.
Source: `source/exams/Mini_exam_1_Sol.pdf`, Mini Exam 1 with solutions,
NBE-E4210 2025-2026, instructor Matias Palva, on lecture 1. It replaces
the two pre-2020 open-book papers (`14468.pdf`, `14701.pdf`) for
everything except very hard stretch questions.

At the start of every lecture build, check `source/exams/` for new
mini-exams. The most recent one is the current format; update this file
when it differs from what is written here.

## The paper at a glance

- Eight problems on three pages, one hour, paper, one A4 cheat sheet.
- No essay questions. Nothing asks for a paragraph. The longest thing
  the student writes is a one-line correction of a false statement.
- Every answer is a tick, a term picked from a given list, a number
  in a ranking, or a short label. Most sub-items give their options.
- Total 11.5 points: two 1-point questions and 38 sub-items at 0.25.

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

## Problem types and wording

### Single-answer multiple choice (1 point)

- "Which one is not a part of the brainstem?" Four options in one row:
  Medulla, Pons, Cerebellum, Midbrain.
- Options are single terms of the same kind (all brain regions). The
  distractors are the true members of the set; the answer is the
  near-neighbour that is not.
- The question may be phrased in the negative ("not a part of").

### Scenario multiple choice (1 point)

- Two or three sentences of patient scenario, then one question: "A
  patient has suffered severe brain damage. They can breathe on their
  own and their heart is beating, but they do not wake up or show signs
  of consciousness. Which part of the brain is most likely to still be
  functioning relatively well?"
- Four one- or two-word options, one of them "All".
- The reasoning is one step: map the preserved functions (breathing,
  heartbeat) to the structure that controls them.

### Classification (0.25 per statement)

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

### Ranking (0.25 per position)

- "Arrange the following research approaches from the smallest to the
  largest scale of analysis (1 = smallest, 4 = largest)."
- Four items, each a described method, not a named level: "Using
  electron microscopy to study dendritic spines". The student writes a
  number beside each; scored per position.

### Matching with a word bank (0.25 per item)

- "Match each cortical area to its lobe." Four areas, word bank of the
  four lobes. One answer per bank entry here, but the bank is not
  labelled as use-once.
- Form: "Visual cortex → ___".

### Completion with a word bank (0.25 per blank)

- "Complete each statement using the correct anatomical directional
  term." Six sentences, one blank each, "Choices: Anterior Posterior
  Superior Inferior Medial Lateral". Each term is used once here.
- Sentences use pairs of structures from the lecture figures, not new
  anatomy. One is less obvious: the solutions complete "The left
  hemisphere is ___ to the right hemisphere" with lateral, the only
  term left once the other five are placed. With a use-once bank the
  last blank is partly given by elimination.

### Figure labelling with a word bank (0.25 per structure)

- "Identify the six brain structures indicated in the figure below."
  A lateral and a mid-sagittal drawing with six boxes and leader lines.
- "Word bank: Thalamus • Cerebellum • Olfactory bulb • Central sulcus •
  Visual cortex • Auditory cortex". Exactly the six answers, no
  distractors, each used once.
- Structures are the ones named on the slides, drawn in a textbook
  style picture the student has not necessarily seen before.

### True or false with correction (0.25 per statement)

- "Determine whether each statement is True (T) or False (F)." Six
  statements, three true and three false.
- The solution gives a one-line correction for each false statement
  only: "Axon terminals do not contain ribosomes." "Calcium enters the
  presynaptic terminal and triggers neurotransmitter release. The
  neurotransmitter crosses the synaptic cleft and binds to
  postsynaptic receptors."
- False statements are built by one wrong link in an otherwise correct
  chain ("calcium ... directly crosses the synaptic cleft") or an
  over-generalisation ("two neurons cannot communicate with each other
  in both directions"). True statements carry a "because" clause that
  must also be right ("useful ... because it stained only a small
  proportion of neurons").

## Presentation

- Options of a single-answer question are shown in one row with tick
  boxes.
- Categories for a classification are listed in the stem with slashes.
- Word banks sit directly under the items ("Word bank:", "Choices:"),
  separated by commas, bullets or wide spacing.
- Sub-items are lettered a), b), c).
- Point values are printed with every problem: "(1 point)", "(Each 0.25
  point)", "(0.25 point each)", "(each 0.25)".

## Point weighting

- 1 point: a question with one answer (multiple choice, scenario).
- 0.25 point: each sub-item of a multi-part problem (a statement to
  classify, a position to rank, a blank, a label, a true-or-false
  statement).
- A six-item problem is therefore worth 1.5 points, more than a single
  multiple-choice question. Most of the paper's points sit in the
  multi-part problems.

The site uses the same convention (docs/CONTENT_SCHEMA.md, Points):
single-answer questions default to 1 point, each sub-item to 0.25.

## Difficulty ceiling

- Recall and identification dominate: naming a structure, matching an
  area to a lobe, a directional term, a staining method.
- The hardest items are one-step applications: map a described lesion,
  mutation or finding to a cell type (Problem 3), map preserved
  functions to the brainstem (Problem 2), spot the single wrong link
  in a mechanism (Problem 8d).
- Nothing requires a calculation, a multi-step prediction, a written
  explanation, or combining two lectures.
- This sets the site's medium tier. Easy questions sit below it (one
  fact, one term). Hard questions sit deliberately above it (multi-step
  scenarios, predictions, calculations), as a margin of safety and for
  understanding; see docs/PEDAGOGY.md section 2.

## What this changes for the site

- Essays are not part of the exam. The default is zero essays per
  lecture; a kept essay is labelled as beyond the exam format.
- Classification, word-bank labelling and true-or-false with a written
  correction are core types, at least two, one and two per lecture.
- Points are shown per question and per sub-item, 1 and 0.25 by
  default, so the student practises with the paper's weighting.
