---
name: course-site
description: Build and extend an interactive university study site, one page per lecture, with explained figures, inline concept checks, formula explorers, and a graded question bank including calculation problems with two-stage hints and step-by-step solutions. Use whenever the user asks to build a study environment, study guide, revision site, or practice questions from lecture slides, lecture notes, homework sheets, textbooks, or past exams, or to add a new lecture or a new course to an existing site.
---

# Course study site

You are building a static web study site. One page per lecture. The
student reads the theory, checks understanding as they scroll, and then
works a graded question bank. Everything is derived from the student's
own course material.

This file is the entry point. Read the reference files it points to
before writing any code or content. Read the course file before deciding
what is in scope.

The repo is the source of truth. Its `CLAUDE.md`, `docs/CONTENT_SCHEMA.md`,
`docs/PEDAGOGY.md`, `docs/DESIGN.md` and exam-format files describe what
the code actually does; the reference files here summarise them for
starting a new course. Where the two disagree, the repo wins: follow it,
then fix the reference file.

## Read in this order

1. `courses/<course-slug>.md` in this skill folder. This is the
   course-specific section: which course, what is examined, which
   sources exist, which formulas matter, what the exercises look like.
   If the course has no file yet, copy `courses/_TEMPLATE.md`, fill what
   you can from the material, and ask the user for the rest before
   building. Then the course's exam-format file in `docs/`, which sets
   question types, wording, points and the difficulty ceiling.
2. `reference/ARCHITECTURE.md`. Repo layout, the multi-course hub, the
   build system, deployment, and how to add a course or a lecture.
3. `reference/BUILD_WORKFLOW.md`. The exact order of operations for
   building one lecture. Follow it literally.
4. `reference/CONTENT_SCHEMA.md`. The shape of a lecture content file
   and every block and question type, and which planned types are not
   implemented yet.
5. `reference/CALCULATIONS.md`. The `calc` type as it exists, and the
   design for formula explorers, drills, two-stage hints and verified
   worked solutions, still to be built. Read this for any quantitative
   course.
6. `reference/FIGURES.md`. How to get good figures: extract from the
   slides, then open illustration libraries, then draw with d3, in that
   order.
7. `reference/PEDAGOGY.md` and `reference/DESIGN.md`. How to write the
   content and how it must look.

## The rule that governs everything

Lecture slides define scope. Everything else explains what the slides
already brought into scope.

- Slides: which topics, mechanisms, terms and formulas are examinable,
  and at what level of detail. The teacher's notation wins over any
  textbook's notation.
- Homework and exercise sheets: also define scope. An item that appears
  only on an exercise sheet is in scope; note the source in the scope
  file. They are also the model for answer style and for the wording
  of calculation questions.
- Lecture notes written by a teaching assistant: complementary. Good for
  section ordering, learning objectives, key terms, self-check
  questions and textbook page refs, and they filter the textbook: read
  only the pages the notes cite for a section. Where notes and slides
  disagree, slides win. Notes may be written against a longer deck, so
  map notes slides to deck slides explicitly before citing a slide
  number; notes content with no slide in our deck is out of scope.
- Textbook: depth and mechanism, only for topics the slides already
  cover. Never let the textbook expand scope.
- Past exams: the most recent paper by the current instructor sets
  question format, wording, point weighting and the difficulty ceiling
  (the course's exam-format file). Older papers by other teachers only
  inform hard stretch questions. Never scope.
- Where two slide decks disagree about schedule, scope or emphasis, the
  most recent deck wins.

Apply the filter before writing anything: is this concept covered or
clearly implied by the lecture material for this lecture? If not, it is
out of scope, and it must not appear in the study guide or in any
question. Record borderline calls in the scope file and report them to
the user at the end of the build.

## What a lecture page contains

In this order:

1. Header: chapters, textbook page ranges, lecture and exam dates,
   learning objectives, prerequisite links to earlier lectures.
2. Concept sections in teaching order. Each section is short blocks, not
   paragraphs: a definition, numbered steps for a mechanism, a compare
   card for a contrast, a `math` block for a formula, a collapsed detail
   block for secondary material. No prose run longer than five lines.
   All maths through KaTeX.
3. At least one figure per section, with hotspot labels in a gutter
   beside the picture.
4. For a quantitative course, once built: a formula explorer for every
   load-bearing formula, followed by a single drill (planned; see
   `reference/CALCULATIONS.md`).
5. A concept quiz after each section: one to four multiple choice
   questions, always easy, with a one-line explanation per option.
6. A recap card: key terms with one-line definitions and every equation
   as KaTeX, written so it can be copied onto a handwritten cheat sheet.
7. A lecture quiz: 12 to 15 questions easy, then medium, then hard,
   each labelled and colour coded, in the exam's own formats and point
   weighting, with the mix the course's exam-format file sets. Every
   question reveals a step-by-step model answer.

## Non-negotiables

- Never invent course content. Every claim, number and formula traces to
  a specific slide, exercise sheet, note or textbook page. If the
  material is silent, say so rather than filling the gap.
- Never read a whole textbook. Extract only the pages the slides or
  notes point at.
- Never present a figure you have not looked at. Use a browser tool to
  screenshot every figure and every section at 380, 768, 1280 and 1920
  pixels in light and dark, and revise until each meets
  `reference/DESIGN.md`.
- Every calculation you publish must be verified numerically by running
  it, not by eye. See `reference/CALCULATIONS.md`.
- `npm run build` ends with the question lint as a build gate. Every
  finding in a new lecture is fixed, never waived: no new lecture goes
  into `LEGACY`, and nothing is committed with `LINT_GATE=0`.
- Content lives only in the content file for that lecture. The renderer
  and the page shells contain no lecture-specific text.
- Keep the repo and the deployment private. Extracted slide and textbook
  figures are the author's copyright and this is personal study use.
