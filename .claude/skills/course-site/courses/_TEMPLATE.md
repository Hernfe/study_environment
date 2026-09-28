# <COURSE CODE> <Course title>

Copy this file to `courses/<slug>.md` and fill it before building
lecture 1. Ask the user about anything the course material does not
answer. Do not guess at assessment rules.

- Slug:
- Institution:
- Term and whether it is running now:
- Teacher and assistants:

## Shape of the course

- Number of lectures, day, time, room, first and last date, any gap
  weeks.
- Exercise or lab sessions: number, day, time, and how an assignment
  relates to its lecture.
- Anything answered live in class that counts toward the grade.

## Assessment

- Exam format: one final, midterms, or weekly mini-exams. Dates.
- Open or closed book. Cheat sheet allowed, and of what size. Calculator
  allowed.
- Written by hand on paper, or on a computer.
- Pass requirements and grade weighting.

Then state the consequences for the site, the way the reference course
files do. If a past paper exists, write the course's exam-format file
(`docs/exam-format-<slug>.md`, modelled on NBE-E4210's
`docs/exam-format.md`): the paper at a glance, each problem type with
its wording and site type, presentation, point weighting, difficulty
ceiling, and what this changes for the site. Then set the question mix
from it and give the lint per-course rules before lecture 1
(`reference/ARCHITECTURE.md`, Adding a course). Exam format decides
whether recap cards are cheat-sheet drafts or revision checklists;
calculator rules decide whether numbers in questions should be clean
or realistic.

## Sources

For each, say where it lives under `source/<slug>/` and what role it
plays.

- Slides: always scope.
- Exercise and homework sheets: scope, and the model for question
  wording.
- Official worked solutions, if any: the model for solution layout.
- Lecture notes: complementary, and the textbook filter (read only the
  pages they cite per section). Record whether their slide numbers
  match the deck or need a notes-to-deck mapping.
- Textbooks available locally: depth, and for which lectures.
- Textbooks cited but unavailable: list them, and note that the slides
  are authoritative where they are the only source.
- Past exams: the most recent paper by the current instructor sets
  format, wording, points and the difficulty ceiling; older papers by
  other teachers only inform hard stretch questions. Never scope.
- Any formula or key-equations sheet the course provides.

## Lecture schedule

A table: number, date, topic, assignment, cited chapters, exercise date.
Note that the most recent slide deck wins on any disagreement.

## Profile of this course

State where it sits on the spectrum from conceptual to quantitative, and
set the mix accordingly:

- Conceptual course: essays and compare questions carry the bank,
  calculations are occasional, figures are structural.
- Quantitative course: at least half the bank is calculation or
  multi-step calculation, every load-bearing formula gets an explorer
  and a drill, essays drop to one or two per lecture.
- Measurement or lab course: add `interpret` questions on real traces
  and plots from the course's own figures.

## Notation and conventions

List every sign convention, symbol choice and unit preference the course
fixes, and where it fixes them. These go in a `convention` block and in
every recap card. Mixing conventions is the most common source of wrong
answers in a quantitative course, and the most common source of
confusion between a textbook and a lecturer in a conceptual one.

## Formula inventory

Per lecture, filled during the scope step. Each entry: the formula, its
symbols and units, the slide it came from, whether the exercises require
it, and therefore load-bearing or reference-only.

## Constants and reference values

Everything the exercises need, with the values the course itself uses
even where they are rounded.

## Anything the site cannot do

Software the course requires that the site cannot run, lab work,
anything the student must do elsewhere. Say what to build instead, and
never fake the output.

## Site features this course needs

List any question or block type the course needs that the renderer
lacks (check `reference/CONTENT_SCHEMA.md`, Planned). They are built,
documented and linted before lecture 1.

## Open questions to confirm with the user
