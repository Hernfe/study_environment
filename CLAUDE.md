# NBE-E4210 study site

Interactive exam-prep site for the Aalto course NBE-E4210 Structure and Operation of the Human Brain. One study-guide page per lecture, with inline concept quizzes and a graded lecture quiz. Built with Vite, vanilla JS, and plain CSS. Deployed on Vercel. The student is preparing for weekly one-hour paper mini-exams (one A4 handwritten cheat sheet allowed). The real format, from Mini Exam 1 with solutions, is in `docs/exam-format.md`: multiple choice, classification, ranking, matching and labelling from word banks, true or false with corrections, 1 point per single answer and 0.25 per sub-item, no essays.

## Source hierarchy (never reverse these roles)

1. `source/slides/` lecture slides: define scope. If a concept is absent from the slides for that lecture, it is out of scope and must not appear in the study guide or questions.

2. `source/notes/` TA-written, teacher-reviewed lecture notes: complementary. They give a sectioned teaching order, learning objectives, key terms, self-check questions, and textbook page references. Use their structure and page refs. Where notes and slides disagree on emphasis, slides win. Where notes exist they are also the textbook filter: their per-section page citations decide which parts of the chapter to read (see Reading the material).

3. `source/textbook/` Bear, Connors, Paradiso, Neuroscience: Exploring the Brain (4th ed). Depth and mechanism only, within slide scope. File 1 is pages 1-509, file 2 the rest.

4. `source/exams/` mini-exams by the current instructor, with solutions (`Mini_exam_1_Sol.pdf` so far), and two pre-2020 open-book essay exams from an earlier teacher (`14468.pdf`, `14701.pdf`). The most recent mini-exam is the authoritative model for question format, wording, difficulty and point weighting (`docs/exam-format.md`). The old papers are used only for very hard stretch questions. Never for scope.

5. `source/homework/` HW1 shows the expected answer style: 3-5 sentence reasoning, equations with intermediate steps for numerical problems. Homework is course material: a concept that a homework exercise asks for is in scope even if the slides omit it (rostral and caudal in L01, from HW1 exercise 1). Note the source in the scope file.

When two slide decks disagree on schedule, scope or emphasis, the most recent deck wins.

## Reading the material

- Read slide PDFs and notes PDFs directly with the Read tool. If the Read tool cannot render PDF pages (no pdftoppm), render pages to PNG with PyMuPDF (`python -m pip install pymupdf`) into the scratchpad and Read the images; the slides carry most content in figures, so text extraction alone is not enough.

- Never read a whole textbook file. Extract only cited page ranges: `pdftotext -f <first> -l <last> "source/textbook/<file>.pdf" -` (page numbers in the notes are book page numbers; the PDFs have front matter, so book page N is PDF page N + 44 in file 1 and PDF page N - 465 in file 2; file 1 ends at book page 465). If pdftotext is missing, install poppler (`brew install poppler` or `apt install poppler-utils`).

- Notes narrow the chapter, slides confirm scope. Where notes exist, read only the textbook pages the notes cite for each section, not the whole chapter and not the chapter range alone. Then keep from those pages only what a slide of that lecture covers. A page range cited by the notes for a concept absent from the slides is not read for content (the concept is out of scope). A slide concept the notes give no page for is looked up in the chapter index and the pages recorded. Without notes, use the chapter and confirm every concept against the slides.

- Before writing a lecture content file, produce a scope list: every concept on the slides for that lecture, mapped to the notes section and the exact textbook pages the notes cite for it (the pages actually read). Save it to `docs/scope/L0X.md` and use it as the checklist. Everything in the content file must trace to that list.

- TA notes are sometimes written against a longer version of the deck, so their slide numbers can diverge from ours. Before citing any slide number from the notes, map notes slides to deck slides explicitly and record the mapping in the scope file. Notes content with no corresponding slide in our deck is out of scope and gets at most one line.

## Lecture build workflow

0. Exam format: check `source/exams/` for new mini-exams. Treat the most recent one as the current format; if it differs from `docs/exam-format.md` (types, wording, word banks, points, difficulty ceiling), update that file, the question mix below and the lint before writing questions.
1. Scope file: `docs/scope/L0X.md` as above, including the notes-to-deck slide mapping.
2. Figures and videos: run `python scripts/extract_figures.py list "source/slides/<deck>.pdf" --preview` as the first step after the scope file. It ends with a video report: embedded videos that the PDF export renders as a black rectangle, media annotations, and links to online videos, each with its slide number. List every hit in the scope file with slide number and slide title and mention them to the user. Lectures are distributed as PDF only, so do not block on clips and do not write questions that need one. If a PPTX or clip does arrive, `python scripts/video_asset.py pptx <deck.pptx>` extracts the clips and `python scripts/video_asset.py add <clip> --lecture L0X --name <name> --at <seconds>` puts a clip in `src/assets/videos/L0X/` with a poster frame; embed it as a `video` block in its section, and a question that depends on it carries the same `video`. Then pick every structural figure, and write `scripts/figures_L0X.py` (crop, paint out printed labels, inpaint their leader-line stubs with `retouch_figure.py erase` (needs `pip install opencv-python-headless`), compose panels, rasterise library SVGs with `scripts/retouch_figure.py`) so the asset set in `src/assets/figures/L0X/` is reproducible. Fall back to `scripts/bioart_fetch.py`, `scripts/servier_fetch.py` and `scripts/find_asset.py` for what the slides do not provide.
3. Content: `src/content/L0X.js` in blocks, with hotspot regions in percent of each image.
4. Visual loop: before committing, use Playwright MCP to screenshot every section at 380, 768, 1280 and 1920 px in both light and dark themes, look at every figure, and revise until each meets the style spec. Never present a figure you have not looked at.
5. `npm run build`. The build ends with the build report and lint gate (`scripts/lint_questions.py`): fix every finding for the new lecture (option lengths, answer positions, question mix, required fields, word banks, plain-text maths). Update `CREDITS.md` (videos and posters too), commit.

## Content rules

- Lecture pages follow the notes' table-of-contents order unless the slides order differs, in which case follow the slides.

- Each section is written with the block vocabulary in `docs/CONTENT_SCHEMA.md` (text, definition, steps, compare, example, keyNumber, misconception, math, whyItMatters, detail, figure, video), key terms marked, then a concept quiz of 1-4 multiple choice questions with one-line feedback per option. Concept quizzes are always easy.

- No prose run longer than five lines. Mechanisms are steps blocks, contrasts are compare blocks, secondary in-scope detail goes in collapsed detail blocks. The scan path down a section must be the heading and short cards.

- Structural figures are sourced in this order: extraction from the slide deck, then NIH BioArt or Servier Medical Art, then Bioicons, then hand-drawn SVG as the last resort. Overlay the imageHotspots widget on every structural figure (at most seven regions, quiz mode off only when labels are burned into the picture). Reuse the same regions for the label-the-figure question.

- Hand-drawn SVG only for variable-driven demos. Build them with d3 for scales, axes and ticks, and check them against the figure style spec in `docs/DESIGN.md` section 6 and the Tufte skill.

- Record every new asset in `CREDITS.md` (file, where used, source, original URL, licence, attribution) before the lecture is committed.

- Maths: every formula, symbol and unit expression is rendered with KaTeX. Inline maths between `$...$` in any text, display maths in `math` blocks, recap `tex` and calc step `tex` (docs/CONTENT_SCHEMA.md, Maths). No plain-text symbols such as E_eq, g_Na, uV, Na+ or log10 in body text. L01 and L02 predate this; L03 was retrofitted on 2026-09-24.

- End of theory: a recap card listing the key terms with one-line definitions, formatted to copy onto a cheat sheet. Include any equations, as `tex`.

- Lecture quiz: 12-15 questions ordered easy, then medium, then hard, in the mini-exam's format (`docs/exam-format.md`). Each labelled easy (green), medium (yellow), hard (red). Target about 3 easy, 5 medium, 5 hard (advisory; never relabel to hit it). Types: multiple choice (`mc`), classification of several statements into shared categories, also used for matching and directional-term completion (`classify`), true or false, one statement or a set of statements, with a one-line correction of each false one (`trueFalse`), fill in the blank with accepted variants or a word bank (`fillBlank`), clinical case where the student picks or names the structure, mechanism or lesion that explains a scenario, with a step-by-step reveal of the reasoning (`clinicalCase`), label-the-figure with explanation, optionally from a word bank (`label`), order-the-events (`order`), calculation with steps (`calc`), interpret a figure or recording (`interpret`), and short essay with point-based mark scheme (`essay`).

- Question mix per lecture: at least 2 classify, at least 1 label with a word bank, at least 2 trueFalse where a false statement needs a one-line correction, at least 2 clinicalCase, and at least one each of mc, order, fillBlank and interpret. Essays: zero by default, since the paper has none; at most one may be kept, labelled `beyondExam: true` (beyond the exam format, for understanding only). Every question has a reveal button showing a step-by-step model answer.

- Points as on the paper: 1 point per single-answer question, 0.25 per sub-item (statement, blank, label, position), shown on every question. Override with `points` or `itemPoints` only to match a comparable problem on the paper.

- Word banks: a closed list shown with the question, each entry usable once unless marked reusable; the answer is a picker. Distractors are plausible course terms of the same kind and form as the answers.

- Easy = recall or identify. Medium = the mini-exam's level: map a described function, lesion or finding to a structure or cell type, spot the wrong link in a mechanism, order a sequence, compare two things. Hard = deliberately above the paper: apply to a new multi-step scenario, predict an outcome, compute. The medium tier is anchored to the mini-exam's difficulty ceiling; the hard tier is kept above it on purpose, as a margin of safety.

- Every question must be answerable from slides plus textbook within slide scope. No trivia from the textbook that the slides never touch.

- Include the notes' self-check questions, rewritten into the formats above.

- Distractors in multiple choice must be plausible misconceptions, never obviously wrong.

- Distractors must match the correct answer in length, grammatical form and specificity. If the correct answer needs a qualifier, give the distractors qualifiers too. Author options in any order: the renderer shuffles them with a stable per-question seed, so the correct answer is not usually first. The build report flags a correct option that is the longest or shortest by more than 20 percent of the mean option length, a distractor under half the correct answer's length, and correct-answer positions far from uniform.

## Writing style

- Plain, direct English. Short sentences. No em dashes, use commas or full stops. No emoji. No bold or italic inside content text; emphasis comes from layout.

- Symbols and units through KaTeX: `$E_{\\text{K}}$`, `$-65\\,\\text{mV}$`, `$\\text{Ca}^{2+}$` (backslashes doubled in the JS strings).

- Course terminology exactly as the slides use it.

## Design rules (see docs/DESIGN.md)

- Calm, low-distraction: off-white background, near-black text, one accent colour for interaction, semantic colours only for difficulty labels and correct/incorrect feedback. Dark mode via prefers-color-scheme.

- Line length 60-75 characters, generous spacing, clear hierarchy, one column. Sticky in-page table of contents on wide screens.

- No animations beyond short transitions on quiz feedback.

- Every widget must work with keyboard and degrade to a static picture if JS fails.

## Engineering rules

- Vanilla JS ES modules, no framework. Vite for dev and build. Multi-page: one entry per lecture in vite.config.js. Dependencies: d3 for plots, KaTeX for maths (`src/js/math.js`); linkedom (dev) only for the question lint.

- Content lives only in `src/content/L0X.js`. Shells and renderer contain no lecture-specific text.

- Keep `docs/CONTENT_SCHEMA.md` in sync with what render.js expects. A new lecture must be addable by following that document alone.

- localStorage keys prefixed `nbe4210:`. Wrap all storage access in try/catch.

- Run `npm run build` before every commit and read the build report it prints (`scripts/build_report.mjs` runs `scripts/lint_questions.py --strict`). The lint is a build gate: any finding in a lecture not marked legacy fails the build; L01 and L02 are legacy and report only. `LINT_GATE=0` reports without failing, never for a commit. Commit with clear messages. Never commit `source/`.
