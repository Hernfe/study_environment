# Pedagogy

The site exists to make the student able to answer the exam's questions
about the material the lectures selected. Not to store the textbook.
The repo's `docs/PEDAGOGY.md` is authoritative for the running course;
where this file and it disagree, the repo wins.

## Principles the structure encodes

- Chunking. A concept is a set of short cards, each one idea, not a
  paragraph. No prose run longer than five lines: a mechanism is a
  `steps` block, a contrast a `compare` block, secondary detail a
  collapsed `detail` block. The scan path down a section is the heading
  and the card kickers, never prose.
- Retrieval right after input. A concept quiz follows every section
  (and, once implemented, a drill follows every formula). Recognition
  alone does not produce recall.
- Dual coding. Every section carries a figure. Text plus picture beats
  text.
- Immediate explanatory feedback. Every option in every multiple choice
  has a line saying why, including the correct one.
- Worked examples before independent practice. The recap and the
  step-by-step `modelAnswer` model the answer style the course's
  homework uses.
- Practice in the exam's own format. The quiz uses the paper's question
  types, wording, word banks and point weighting, so the paper holds no
  surprises.
- Difficulty ladder inside each lecture, easy to hard, in that order.
- Interleaving and spacing in review: missed questions first, mixed
  across lectures.

## The exam decides the format

Each course has an exam-format file written from its most recent past
paper (NBE-E4210: `docs/exam-format.md`, from Mini Exam 1 with
solutions). It records the question types and their wording, word banks,
points per item, and the difficulty ceiling. The site's question types
map onto it; for NBE-E4210:

| Paper | Site type |
|---|---|
| Single-answer multiple choice | `mc` |
| Which statements are correct, count not given | `multiSelect` |
| Circle the right answer inside a sentence | `inlineChoice` |
| Scenario multiple choice | `clinicalCase` (pick) |
| Classify statements into shared categories, match items to a category | `classify` |
| Table of rows by columns, each cell from a small fixed set | `classify` with `columns` |
| Rank or sequence | `order` |
| Complete sentences from a word bank | `classify` with a blank in each item, or `fillBlank` with `wordBank` |
| Identify structures on a figure from a word bank | `label` with `wordBank` |
| True or false, each false one corrected in one line | `trueFalse` with `statements` |

Points as on the paper: 1 per single-answer question, 0.25 per sub-item,
0.1 per inline choice, shown on every question. Override only to match a comparable problem on
the paper.

Past papers by the current instructor set format, wording, difficulty
and points. Older papers by other teachers inform only hard stretch
questions. No paper ever sets scope.

## Difficulty tiers

Applies to the lecture quiz. Concept quizzes are always easy.

- Easy (green): recall or identify. One fact, one term, one structure.
- Medium (yellow): the paper's level, anchored to its difficulty
  ceiling. Map a described function, lesion or finding to a structure or
  cell type in one step, spot the one wrong link in a mechanism, order a
  sequence, compare two things.
- Hard (red): deliberately above the paper, as a margin of safety.
  Apply to a new multi-step scenario, predict an outcome, compute. Tell
  the student that missing a hard question does not mean missing the
  exam level.

The label describes the question's cognitive demand. Target about 3
easy, 5 medium, 5 hard, but never relabel to hit it; write different
questions instead. The lint reports the split as advisory only.

## Question mix

Set per course from its exam-format file and enforced by the lint. For
NBE-E4210, per lecture: 12 to 16 questions; at least 2 `classify`, 1
`label` with a word bank, 2 `trueFalse` with a false statement to
correct, 2 `clinicalCase`, 2 `multiSelect`, 1 `inlineChoice`, and at least one each of `mc`, `order`,
`fillBlank` and `interpret`; `calc` where the lecture has a quantity to
compute. Essays: zero by default, since the paper has none; at most one,
kept only when it teaches something no other format can, marked
`beyondExam: true`. Every question has a reveal with a step-by-step
model answer.

A course with a different exam (for example a final with calculations)
gets its own mix in its exam-format file and in the lint's per-course
rules before its first lecture is built.

## Writing questions

- Every question traces to a line in the scope file and is answerable
  from the slides plus the textbook within slide scope. No textbook
  trivia the slides never touch.
- Rewrite the notes' self-check questions into the exam's formats and
  include them; they are the closest signal of what the teacher expects.
- Distractors are misconceptions a student of this course would hold.
  The best source is a slide that exists to correct an error: turn the
  error into the distractor and the correction into the feedback.
  Never an obviously wrong option, a wrong unit as filler, or an answer
  from another topic.
- Distractors match the correct answer in length, grammatical form and
  specificity. If the correct answer needs a qualifier, give the
  distractors qualifiers too. The lint fails a correct option that is
  the longest or shortest by more than 20 percent of the mean, a
  distractor under half its length, and correct positions far from
  uniform across the lecture.
- Author options in any order: the renderer shows them in a stable
  shuffle seeded by lecture and question id. Never reorder or rename
  after publishing.
- Word banks are closed lists, entries once-only unless reusable. Every
  answer is in the bank, spelled exactly. Distractors are course terms of
  the same kind and form (another lobe, the neighbouring directional
  term) that occur in the course's text. A bank that gives the last pick
  by elimination is acceptable on easy items, not on medium or hard.
- `trueFalse`: write each statement so it is false for one specific,
  examinable reason, or true for a reason the student has to name. Every
  false statement carries its one-line correction.
- `clinicalCase`: the reveal is the reasoning in at least three steps:
  the key finding, what normally produces it, what must be broken, the
  answer.
- `classify`: describe a function, lesion or finding the way the paper
  does; never name the answer in the item.
- Essays and `interpret` in mark-scheme mode: points sum to the total,
  one checkable idea per line, the last line is the application or
  prediction, wording uses slide terminology.

## Review queue

Per course, on the course home, never across courses. Order:

1. Questions whose last result was missed, interleaved across lectures;
   within a lecture the most recent miss first, and the lecture with the
   freshest miss deals first.
2. Questions never seen, interleaved, shuffled.
3. Everything else, interleaved, shuffled.

Interleave by dealing round-robin across lectures, so a block of misses
from one sitting never arrives as a block. Tiers are mixed, not sorted.
Sessions are slices of 15. Review records results exactly like the
lecture quiz. Concept quizzes are not in review. Each card shows its
source lecture. (Planned with hints: questions solved only after hint 2
count as missed.)

## Progress

localStorage, one key per lecture, `nbe:<course-slug>:progress:<lectureId>`,
holding per question attempts, correct count, last result, time, score
and max, plus concept-quiz attempts. Every access in try/catch; the page
renders correctly with storage empty or blocked and says so.

## Recap cards

One per lecture. Terms with one-line definitions, every equation as
`tex` with a note on when it holds. Written so it can be copied by hand
onto the cheat sheet the exam allows (NBE-E4210: one handwritten A4),
and sized so one lecture is one or two handwritten sides. For a course
with no cheat sheet the recap is the revision checklist.
