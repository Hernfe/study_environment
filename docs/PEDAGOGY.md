# Pedagogy rules

How every lecture page teaches and tests. These rules are what the
content files must follow and what `render.js`, `conceptQuiz.js`,
`lectureQuiz.js` and `review.js` assume.

The student's target is a weekly one-hour paper mini-exam, one
handwritten A4 cheat sheet allowed. The real format is in
docs/exam-format.md (from Mini Exam 1 with solutions): single-answer
multiple choice, scenario multiple choice, classification of described
statements, ranking, matching and completion from a word bank, figure
labelling from a word bank, and true or false with a one-line
correction of each false statement. 1 point per single answer, 0.25 per
sub-item. No essays. So the page must (a) teach each mechanism well
enough to recognise it from a description and spot the one wrong link
in it, (b) give a recap the student can copy onto the cheat sheet, and
(c) make the student retrieve, not reread.

## 1. Concept blocks

A section is one concept block. Each block has, in this order:

1. Explanation. 5 to 10 lines of plain English. Short sentences. Key
   terms wrapped in `<dfn>` on first use (the renderer styles them; no
   bold or italic elsewhere). Terminology exactly as the slides use it.
2. One visual. Interactive widget when a variable changes an outcome
   (concentration and potential, stimulus and rate). Static SVG when the
   point is structure (a pathway, a cell, a layer diagram). Never both.
   Every visual has a caption and a `fallbackAlt` that describes what
   the picture shows for a reader who cannot see it.
3. Concept quiz. 1 to 4 multiple-choice questions, always easy tier.
   Each option carries one line of feedback that says why it is right
   or which misconception it reflects. The student can retry.

Scope: every block traces to a line in `docs/scope/L0X.md`. If a concept
is not on the slides for that lecture, it does not get a block.

Order: the notes' table of contents, unless the slides order differs,
in which case the slides win.

## 2. Difficulty tiers

| Tier | Colour | Cognitive demand | Typical forms |
|---|---|---|---|
| Easy | green | Recall or identify. One fact, one term, one structure. | Multiple choice, true or false, fill in the blank, label a figure from a word bank, match an area to a lobe. |
| Medium | yellow | The mini-exam's level: map a described function, lesion or finding to a structure or cell type in one step, spot the one wrong link in a mechanism, order a sequence, compare two things. | Classify described statements, true or false with corrections, scenario multiple choice, order the events, label the figure with a one-line explanation per label, interpret a figure, multiple choice where the distractors are near misses. |
| Hard | red | Above the exam, on purpose: apply to a new scenario over several steps, predict an outcome, compute. | Clinical case with a multi-step reveal, calculation with steps, interpret a recording and predict, scenario multiple choice ("what happens if"), a 6-point essay only if kept and labelled beyond the exam. |

The medium tier is anchored to the mini-exam's difficulty ceiling
(docs/exam-format.md, Difficulty ceiling): its hardest items are
one-step applications, a described lesion or finding mapped to a cell
type or structure. A student who gets the medium tier right is ready
for the paper. The hard tier sits deliberately above that ceiling:
multi-step scenarios, predictions and calculations the paper does not
ask for. It gives a margin of safety and builds the understanding that
makes the one-step items easy. Say so to the student: missing a hard
question does not mean missing the exam level.

Rules that follow from the tiers:

- Concept quizzes are always easy.
- The lecture quiz has 12 to 15 questions ordered easy, then medium,
  then hard. Target about 3 easy, 5 medium, 5 hard. The split is
  advisory: the tier of a question describes its cognitive demand as
  defined in the table above, and it is never adjusted to hit a target
  count. To move the split, write different questions; relabel only
  when the demand of the question itself changes.
- Question-bank mix, matched to the real paper (docs/exam-format.md),
  per lecture:
  - at least 2 `classify` (described statements into shared
    categories; area-to-lobe matching; directional-term completion);
  - at least 1 `label` with a word bank;
  - at least 2 `trueFalse` where a false statement needs a one-line
    correction (a single false statement, or a `statements` set with
    at least one false one);
  - at least 2 `clinicalCase`;
  - at least one each of `mc`, `order`, `fillBlank` and `interpret`;
  - `calc` where the lecture has a quantity to compute.
  Essays: zero by default, since the paper has none. An essay may be
  kept (at most one) only when it teaches something no other format
  can; it is labelled `beyondExam: true` and shown as beyond the exam
  format, for understanding only. The lint checks the mix. L01 and L02
  predate these rules, L03 and L04 were built before the mini-exam was
  available.
- Points follow the paper: 1 per single-answer question, 0.25 per
  sub-item of a multi-part question, shown on every question.
- Every question is answerable from the slides plus the textbook within
  slide scope. No textbook trivia the slides never touch.
- Rewrite the notes' self-check questions into these formats and include
  them; they are the closest signal of what the teacher expects.
- Multiple-choice distractors must be plausible misconceptions. A good
  distractor is something a student who half-understood would pick.
- Distractors match the correct answer in length, grammatical form and
  specificity. If the correct answer needs a qualifier ("mainly", "in
  the CNS", "at rest"), give the distractors qualifiers too. A student
  must not be able to pick the longest, most hedged or most specific
  option and be right. `scripts/lint_questions.py` flags a correct
  option that is the longest or shortest by more than 20 percent of the
  mean, and any distractor under half its length.
- Author options in any order; the renderer shows them in a stable
  shuffled order seeded by the question id, so the correct answer is
  not usually first. The lint also checks that positions come out
  near uniform across the lecture.
- Lectures are distributed as PDF only, so the student sees no clips
  and a clip does not need its own question. When a clip is available
  and a question depends on it, the question carries the clip so it
  also works in review.
- The most recent mini-exam in `source/exams/` sets format, wording,
  difficulty and points (docs/exam-format.md). The pre-2020 open-book
  papers only inform very hard stretch questions. Neither sets scope.

## 3. Question types

All types share: `id`, `difficulty`, `type`, `prompt`, and `modelAnswer`
(an array of steps shown by the reveal button). Scoring and self-scoring
are recorded per question by `progress.js`.

### Multiple choice (`mc`)

- 3 to 5 options, exactly one correct, matched in length and form.
- Every option has `feedback`, one line.
- Shown in a stable shuffled order (seed: lecture id and question id).
- Auto-scored. Correct on first attempt counts as correct; a later
  correct attempt after a wrong one counts as missed for review purposes.

### True or false (`trueFalse`)

- One statement, true or false for one examinable reason.
- The student must write a one-line justification before checking;
  the authored `justification` (one line) is then shown. Scored on the
  choice; the justification is for self-comparison, as on paper.
- Good false statements swap one term for its near neighbour (Schwann
  for oligodendrocyte, anterograde for retrograde), break one link in
  an otherwise correct chain ("calcium ... directly crosses the
  synaptic cleft"), or over-generalise ("two neurons cannot
  communicate in both directions"), never an absurdity. Good true
  statements carry a "because" clause that must also be right.
- The paper's form is a set of statements (`statements`), about half
  false, each false one corrected in one line; the correction is what
  a false statement is for. Each set is worth 0.25 per statement.

### Classify (`classify`)

- Two to four categories named in the stem ("Neuron / Astrocyte /
  Myelinating glial cell / Microglia"), four to six items.
- Items describe a function, a lesion, a mutation or an experimental
  finding in one or two sentences, never the category's name. The
  student maps the description to the category; that mapping is the
  exam's main applied item and sits in the medium tier.
- Categories may be used more than once or not at all, so the last
  item cannot be solved by elimination.
- The same type covers matching (areas to lobes) and completion with a
  shared list (directional terms, with the blank inline); these are
  easy.
- Auto-scored per item, 0.25 each.

### Fill in the blank (`fillBlank`)

- A sentence in slide wording with one to three blanks, each a key
  term or a number with its unit.
- Every accepted variant is listed (synonyms, singular and plural,
  British and American spelling). Matching ignores only case, spacing,
  dash forms and trailing punctuation.
- Auto-scored per blank; correct only if all match.
- With a `wordBank` the blanks become pickers over a closed list, as on
  the paper's completion problems. See Word banks below.

### Clinical case (`clinicalCase`)

- A scenario of two to four sentences: a patient, a lesion, a drug, a
  toxin, a mutation or an experiment. The student picks (options) or
  names (typed, matched against accepted variants) the structure,
  mechanism or lesion that explains it.
- The reveal is the reasoning, step by step: the key finding, what
  normally produces it, what must be broken or changed, the answer, and
  why the nearest alternative does not fit.
- Usually hard (apply to a new scenario); medium when it is a direct
  mapping taught on the slides.
- The scenario uses only mechanisms and structures within slide scope.

### Interpret (`interpret`)

- A figure, recording, plot or video clip, then a question that can
  only be answered by reading it (a trend, a phase, a structure).
- Pick mode (options) is auto-scored; mark-scheme mode is self-scored
  like an essay but does not count as the lecture's essay.

### Short essay (`essay`)

- Not part of the mini-exam. None by default; at most one per lecture,
  kept only when it teaches something no other format can, and always
  labelled `beyondExam: true` ("Beyond the exam, for understanding
  only").
- `points` is 2 or 3 for medium, 6 for hard.
- `markScheme` lists what earns each point (see section 4).
- Student writes in a textarea (optional, never stored), reveals the
  scheme, ticks the points they earned. Self-scored: full marks counts
  as correct, anything less counts as missed.

### Label the figure (`label`)

- At least one per lecture, and at least one with a `wordBank`, the
  paper's form ("Identify the six brain structures indicated in the
  figure below. Word bank: ...").
- An image-hotspots figure in quiz mode (or a legacy SVG with numbered
  markers at `regions`).
- Without a word bank the student picks from the region labels plus
  `labelPool` (1 to 3 distractor labels). With one, the bank is shown
  beside the figure and is the only pool.
- Each region has a `label` (the correct pick) and an `explanation`
  (one line, shown after checking). Medium-tier labelling requires the
  explanation to be read; the reveal shows all of them.
- Auto-scored per region; the question counts as correct only if all
  regions are right on the first check.

### Order the events (`order`)

- `items` is the list in correct order; the renderer shuffles it.
- The student moves items with Up and Down buttons, then checks.
- Auto-scored: correct only if the full sequence matches.
- `modelAnswer` walks the sequence and says why each step must follow
  the previous one.

### Calculation (`calc`)

- `given` lists the quantities with units.
- `answer` has `value`, `tolerance` (absolute) and `unit`.
- `steps` is an ordered list of `{ text, tex }`; the reveal shows them
  one by one, each `tex` typeset by KaTeX. Follows the HW1 style: state the equation, substitute,
  give intermediate values, give the final value with units.
- Auto-scored on the final value within tolerance.

### Word banks

- A closed list shown with a `fillBlank` or `label` question; the
  answer is then a picker, not free text. Each entry is usable once
  unless marked reusable.
- Distractors are course terms of the same kind and form as the
  answers, a term a half-prepared student would pick: another lobe,
  another layer, the neighbouring directional term. Never an invented
  or unrelated word. The lint checks form and that every distractor
  occurs in some lecture's text.
- The paper's banks often hold exactly the answers, once each, so the
  last pick is given by elimination. Accept that on easy items; on
  medium and hard ones add a distractor or make entries reusable.

## 4. Mark scheme format for 6-point essays

Only for an essay kept beyond the exam format (section 3), and for
`interpret` questions in mark-scheme mode.

Hard essays are worth 6 points. The mark scheme is a list of six
independent, checkable statements. Each line starts with the point value
and says exactly what earns it, so the student can grade a handwritten
answer honestly.

Shape:

```
markScheme: [
  { points: 1, text: 'Names the structure or process the question is about.' },
  { points: 1, text: 'States the trigger or input correctly.' },
  { points: 1, text: 'Describes the first step of the mechanism.' },
  { points: 1, text: 'Describes the second step and links it to the first.' },
  { points: 1, text: 'Gives the outcome or consequence.' },
  { points: 1, text: 'Applies it to the scenario in the prompt, or gives the correct prediction.' },
]
```

Rules:

- Points sum to `points` (6 for hard, 2 or 3 for medium).
- One idea per line. A line that needs two things to be true gets split.
- The last point is always the "apply to the scenario" or "prediction"
  point, since that is what separates hard from medium.
- `modelAnswer` for an essay is a 4 to 8 sentence model paragraph split
  into steps that map onto the mark scheme lines in order.
- Wording in the scheme uses slide terminology so the student learns
  the words the grader expects.

## 5. Cumulative review logic

Review mode on the home page pulls questions from every built lecture.
Implemented in `src/js/review.js` on top of `progress.js`.

Queue construction, in this order:

1. Missed first. Every question whose last recorded result is missed
   (wrong on first attempt, or self-scored below full marks), across all
   built lectures. These always come before anything else.
2. Never seen. Questions with no record, so the student meets every
   question at least once.
3. Previously correct. The remaining questions, for retrieval practice.
4. Every bucket is interleaved across lectures: questions are grouped by
   lecture and dealt round-robin, so the queue never shows two questions
   from the same lecture back to back when another lecture still has
   questions left in that bucket. Interleaving forces the student to
   identify which concept applies rather than riding the context of one
   chapter. It applies to the missed bucket too: a block of misses from
   one sitting of one lecture quiz must not arrive as a block.
5. Order within a lecture's stack: in the missed bucket, most recently
   missed first, so recency is only the tiebreak within a lecture, and
   the lecture holding the freshest miss deals first. In the other two
   buckets the stack is shuffled and the lecture order is shuffled.
6. Within each bucket, tiers are mixed rather than sorted, so the student
   cannot coast on easy ones at the start.

Session rules:

- A review session is a slice of the queue (default 15). The student
  can continue to the next slice.
- Results in review are recorded exactly like results in the lecture
  quiz, so a question answered correctly in review leaves the missed
  bucket, and one missed in review enters it.
- Concept-quiz questions are not part of review; they are practice
  inside the reading, not assessment.
- Review shows the source lecture number on each card so the student
  can go back to the section.

Why this shape: retrieval practice beats rereading for retention,
spacing and interleaving beat blocked practice for transfer, and
resurfacing errors first targets the questions with the most to gain
(Roediger and Karpicke 2006; Rohrer and Taylor 2007; Dunlosky et al.
2013).
