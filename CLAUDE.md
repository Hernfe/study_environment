# NBE-E4210 study site

Interactive exam-prep site for the Aalto course NBE-E4210 Structure and Operation of the Human Brain. One study-guide page per lecture, with inline concept quizzes and a graded lecture quiz. Built with Vite, vanilla JS, and plain CSS. Deployed on Vercel. The student is preparing for weekly one-hour paper mini-exams (multiple choice plus short essays, one A4 handwritten cheat sheet allowed).

## Source hierarchy (never reverse these roles)

1. `source/slides/` lecture slides: define scope. If a concept is absent from the slides for that lecture, it is out of scope and must not appear in the study guide or questions.

2. `source/notes/` TA-written, teacher-reviewed lecture notes: complementary. They give a sectioned teaching order, learning objectives, key terms, self-check questions, and textbook page references. Use their structure and page refs. Where notes and slides disagree on emphasis, slides win.

3. `source/textbook/` Bear, Connors, Paradiso, Neuroscience: Exploring the Brain (4th ed). Depth and mechanism only, within slide scope. File 1 is pages 1-509, file 2 the rest.

4. `source/exams/` two old open-book essay exams from an earlier teacher. Use only for question style and depth of the hard tier. Never for scope.

5. `source/homework/` HW1 shows the expected answer style: 3-5 sentence reasoning, equations with intermediate steps for numerical problems.

When two slide decks disagree on schedule, scope or emphasis, the most recent deck wins.

## Reading the material

- Read slide PDFs and notes PDFs directly with the Read tool.

- Never read a whole textbook file. Extract only cited page ranges: `pdftotext -f <first> -l <last> "source/textbook/<file>.pdf" -` (page numbers in the notes are book page numbers; file 1 page N is PDF page N, file 2 page N is PDF page N minus 509). If pdftotext is missing, install poppler (`brew install poppler` or `apt install poppler-utils`).

- Before writing a lecture content file, produce a scope list: every concept on the slides for that lecture, mapped to the notes section and textbook pages. Save it to `docs/scope/L0X.md` and use it as the checklist. Everything in the content file must trace to that list.

## Content rules

- Lecture pages follow the notes' table-of-contents order unless the slides order differs, in which case follow the slides.

- Each concept block: 5-10 lines of plain explanation in simple English, key terms marked, one visual (interactive where a variable changes an outcome, static SVG where the point is structure), then a concept quiz of 1-4 multiple choice questions with one-line feedback per option. Concept quizzes are always easy.

- End of theory: a recap card listing the key terms with one-line definitions, formatted to copy onto a cheat sheet. Include any equations.

- Lecture quiz: 12-15 questions ordered easy, then medium, then hard. Each labelled easy (green), medium (yellow), hard (red). Types: multiple choice, short essay with point-based mark scheme, label-the-figure with explanation, order-the-events, calculation with steps. Every question has a reveal button showing a step-by-step model answer. Hard essays are worth 6 points and the mark scheme lists what earns each point.

- Easy = recall or identify. Medium = explain a mechanism, compare two things, order a sequence. Hard = apply to a new scenario, predict an outcome, compute, or write a 6-point essay.

- Every question must be answerable from slides plus textbook within slide scope. No trivia from the textbook that the slides never touch.

- Include the notes' self-check questions, rewritten into the formats above.

- Distractors in multiple choice must be plausible misconceptions, never obviously wrong.

## Writing style

- Plain, direct English. Short sentences. No em dashes, use commas or full stops. No emoji. No bold or italic inside content text; emphasis comes from layout.

- Course terminology exactly as the slides use it.

## Design rules (see docs/DESIGN.md)

- Calm, low-distraction: off-white background, near-black text, one accent colour for interaction, semantic colours only for difficulty labels and correct/incorrect feedback. Dark mode via prefers-color-scheme.

- Line length 60-75 characters, generous spacing, clear hierarchy, one column. Sticky in-page table of contents on wide screens.

- No animations beyond short transitions on quiz feedback.

- Every widget must work with keyboard and degrade to a static picture if JS fails.

## Engineering rules

- Vanilla JS ES modules, no framework. Vite for dev and build. Multi-page: one entry per lecture in vite.config.js.

- Content lives only in `src/content/L0X.js`. Shells and renderer contain no lecture-specific text.

- Keep `docs/CONTENT_SCHEMA.md` in sync with what render.js expects. A new lecture must be addable by following that document alone.

- localStorage keys prefixed `nbe4210:`. Wrap all storage access in try/catch.

- Run `npm run build` before every commit. Commit with clear messages. Never commit `source/`.
