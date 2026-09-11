# Pedagogy rules

How every lecture page teaches and tests. These rules are what the
content files must follow and what `render.js`, `conceptQuiz.js`,
`lectureQuiz.js` and `review.js` assume.

The student's target is a weekly one-hour paper mini-exam: multiple
choice plus short essays, one handwritten A4 cheat sheet allowed. So the
page must (a) teach the mechanism clearly enough to explain in writing,
(b) give a recap the student can copy onto the cheat sheet, and (c) make
the student retrieve, not reread.

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
| Easy | green | Recall or identify. One fact, one term, one structure. | Multiple choice, label a figure with the term only. |
| Medium | yellow | Explain a mechanism, compare two things, or put a sequence in order. | Short essay (2 to 3 points), order the events, label the figure with a one-line explanation per label, multiple choice where the distractors are near misses. |
| Hard | red | Apply to a new scenario, predict an outcome, compute, or write a 6-point essay. | 6-point essay, calculation with steps, scenario multiple choice ("what happens if"). |

Rules that follow from the tiers:

- Concept quizzes are always easy.
- The lecture quiz has 12 to 15 questions ordered easy, then medium,
  then hard. A reasonable split is 5 easy, 5 medium, 3 to 5 hard.
- Every question is answerable from the slides plus the textbook within
  slide scope. No textbook trivia the slides never touch.
- Rewrite the notes' self-check questions into these formats and include
  them; they are the closest signal of what the teacher expects.
- Multiple-choice distractors must be plausible misconceptions. A good
  distractor is something a student who half-understood would pick.
- Old exam papers set the depth and style of hard essays, never scope.

## 3. Question types

All types share: `id`, `difficulty`, `type`, `prompt`, and `modelAnswer`
(an array of steps shown by the reveal button). Scoring and self-scoring
are recorded per question by `progress.js`.

### Multiple choice (`mc`)

- 3 to 5 options, exactly one correct.
- Every option has `feedback`, one line.
- Auto-scored. Correct on first attempt counts as correct; a later
  correct attempt after a wrong one counts as missed for review purposes.

### Short essay (`essay`)

- `points` is 2 or 3 for medium, 6 for hard.
- `markScheme` lists what earns each point (see section 4).
- Student writes in a textarea (optional, never stored), reveals the
  scheme, ticks the points they earned. Self-scored: full marks counts
  as correct, anything less counts as missed.

### Label the figure (`label`)

- An SVG figure with numbered markers at `regions`.
- `labels` is the pool the student picks from, including 1 to 3
  distractor labels.
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
- `steps` is an ordered list of `{ text, math }`; the reveal shows them
  one by one. Follows the HW1 style: state the equation, substitute,
  give intermediate values, give the final value with units.
- Auto-scored on the final value within tolerance.

## 4. Mark scheme format for 6-point essays

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
   built lectures, sorted by most recently missed first. These always
   come before anything else.
2. Never seen. Questions with no record, so the student meets every
   question at least once.
3. Interleaved retrieval. The remaining questions (previously correct)
   are shuffled and interleaved across lectures: the queue never shows
   two questions from the same lecture back to back when another lecture
   has questions left. Interleaving forces the student to identify which
   concept applies rather than riding the context of one chapter.
4. Within each bucket, tiers are mixed rather than sorted, so the student
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
