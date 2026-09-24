# NBE-E4210 study site

Interactive exam-prep site for the Aalto course NBE-E4210 Structure and Operation of the Human Brain. One study-guide page per lecture, with inline concept quizzes and a graded lecture quiz. Built with Vite, vanilla JS, and plain CSS. Deployed on Vercel. The student is preparing for weekly one-hour paper mini-exams (multiple choice plus short essays, one A4 handwritten cheat sheet allowed).

## Source hierarchy (never reverse these roles)

1. `source/slides/` lecture slides: define scope. If a concept is absent from the slides for that lecture, it is out of scope and must not appear in the study guide or questions.

2. `source/notes/` TA-written, teacher-reviewed lecture notes: complementary. They give a sectioned teaching order, learning objectives, key terms, self-check questions, and textbook page references. Use their structure and page refs. Where notes and slides disagree on emphasis, slides win. Where notes exist they are also the textbook filter: their per-section page citations decide which parts of the chapter to read (see Reading the material).

3. `source/textbook/` Bear, Connors, Paradiso, Neuroscience: Exploring the Brain (4th ed). Depth and mechanism only, within slide scope. File 1 is pages 1-509, file 2 the rest.

4. `source/exams/` two old open-book essay exams from an earlier teacher. Use only for question style and depth of the hard tier. Never for scope.

5. `source/homework/` HW1 shows the expected answer style: 3-5 sentence reasoning, equations with intermediate steps for numerical problems. Homework is course material: a concept that a homework exercise asks for is in scope even if the slides omit it (rostral and caudal in L01, from HW1 exercise 1). Note the source in the scope file.

When two slide decks disagree on schedule, scope or emphasis, the most recent deck wins.

## Reading the material

- Read slide PDFs and notes PDFs directly with the Read tool. If the Read tool cannot render PDF pages (no pdftoppm), render pages to PNG with PyMuPDF (`python -m pip install pymupdf`) into the scratchpad and Read the images; the slides carry most content in figures, so text extraction alone is not enough.

- Never read a whole textbook file. Extract only cited page ranges: `pdftotext -f <first> -l <last> "source/textbook/<file>.pdf" -` (page numbers in the notes are book page numbers; the PDFs have front matter, so book page N is PDF page N + 44 in file 1 and PDF page N - 465 in file 2; file 1 ends at book page 465). If pdftotext is missing, install poppler (`brew install poppler` or `apt install poppler-utils`).

- Notes narrow the chapter, slides confirm scope. Where notes exist, read only the textbook pages the notes cite for each section, not the whole chapter and not the chapter range alone. Then keep from those pages only what a slide of that lecture covers. A page range cited by the notes for a concept absent from the slides is not read for content (the concept is out of scope). A slide concept the notes give no page for is looked up in the chapter index and the pages recorded. Without notes, use the chapter and confirm every concept against the slides.

- Before writing a lecture content file, produce a scope list: every concept on the slides for that lecture, mapped to the notes section and the exact textbook pages the notes cite for it (the pages actually read). Save it to `docs/scope/L0X.md` and use it as the checklist. Everything in the content file must trace to that list.

## Lecture build workflow

1. Scope file: `docs/scope/L0X.md` as above.
2. Figures and videos: run `python scripts/extract_figures.py list "source/slides/<deck>.pdf" --preview` as the first step after the scope file. It ends with a video report: embedded videos that the PDF export renders as a black rectangle, media annotations, and links to online videos, each with its slide number. Stop and report every hit to the user with slide number and slide title, and ask for the original PPTX or the video file. With a PPTX, `python scripts/video_asset.py pptx <deck.pptx>` extracts the clips; `python scripts/video_asset.py add <clip> --lecture L0X --name <name> --at <seconds>` puts a clip in `src/assets/videos/L0X/` with a poster frame. Embed each clip as a `video` block in its section and write at least one lecture question that depends on watching it (what changes across the clip, what the recording shows); the question carries the same `video`. Videos are examinable course material. If the user cannot supply a clip, note the gap in the scope file and move on. Then pick every structural figure, and write `scripts/figures_L0X.py` (crop, paint out printed labels, inpaint their leader-line stubs with `retouch_figure.py erase` (needs `pip install opencv-python-headless`), compose panels, rasterise library SVGs with `scripts/retouch_figure.py`) so the asset set in `src/assets/figures/L0X/` is reproducible. Fall back to `scripts/bioart_fetch.py`, `scripts/servier_fetch.py` and `scripts/find_asset.py` for what the slides do not provide.
3. Content: `src/content/L0X.js` in blocks, with hotspot regions in percent of each image.
4. Visual loop: before committing, use Playwright MCP to screenshot every section at 380, 768, 1280 and 1920 px in both light and dark themes, look at every figure, and revise until each meets the style spec. Never present a figure you have not looked at.
5. `npm run build`. The build ends with the build report (`scripts/lint_questions.py`): fix every finding for the new lecture (option lengths, answer positions, question mix, required fields, video questions, plain-text maths). Update `CREDITS.md` (videos and posters too), commit.

## Content rules

- Lecture pages follow the notes' table-of-contents order unless the slides order differs, in which case follow the slides.

- Each section is written with the block vocabulary in `docs/CONTENT_SCHEMA.md` (text, definition, steps, compare, example, keyNumber, misconception, math, whyItMatters, detail, figure, video), key terms marked, then a concept quiz of 1-4 multiple choice questions with one-line feedback per option. Concept quizzes are always easy.

- No prose run longer than five lines. Mechanisms are steps blocks, contrasts are compare blocks, secondary in-scope detail goes in collapsed detail blocks. The scan path down a section must be the heading and short cards.

- Structural figures are sourced in this order: extraction from the slide deck, then NIH BioArt or Servier Medical Art, then Bioicons, then hand-drawn SVG as the last resort. Overlay the imageHotspots widget on every structural figure (at most seven regions, quiz mode off only when labels are burned into the picture). Reuse the same regions for the label-the-figure question.

- Hand-drawn SVG only for variable-driven demos. Build them with d3 for scales, axes and ticks, and check them against the figure style spec in `docs/DESIGN.md` section 6 and the Tufte skill.

- Record every new asset in `CREDITS.md` (file, where used, source, original URL, licence, attribution) before the lecture is committed.

- Maths: every formula, symbol and unit expression is rendered with KaTeX. Inline maths between `$...$` in any text, display maths in `math` blocks, recap `tex` and calc step `tex` (docs/CONTENT_SCHEMA.md, Maths). No plain-text symbols such as E_eq, g_Na, uV, Na+ or log10 in body text. L01 to L03 predate this; L03 is retrofitted in its own pass.

- End of theory: a recap card listing the key terms with one-line definitions, formatted to copy onto a cheat sheet. Include any equations, as `tex`.

- Lecture quiz: 12-15 questions ordered easy, then medium, then hard. Each labelled easy (green), medium (yellow), hard (red). Target about 3 easy, 5 medium, 5 hard (advisory; never relabel to hit it). Types: multiple choice (`mc`), true or false with a required one-line justification (`trueFalse`), fill in the blank with accepted variants (`fillBlank`), clinical case where the student picks or names the structure, mechanism or lesion that explains a scenario, with a step-by-step reveal of the reasoning (`clinicalCase`), label-the-figure with explanation (`label`), order-the-events (`order`), calculation with steps (`calc`), interpret a figure, recording or clip (`interpret`), and short essay with point-based mark scheme (`essay`). At most 1 essay per lecture, at least 2 clinicalCase, at least 1 label. Every question has a reveal button showing a step-by-step model answer. A hard essay is worth 6 points and the mark scheme lists what earns each point.

- Easy = recall or identify. Medium = explain a mechanism, compare two things, order a sequence. Hard = apply to a new scenario, predict an outcome, compute, or write a 6-point essay.

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

- Run `npm run build` before every commit and read the build report it prints (`scripts/build_report.mjs` runs `scripts/lint_questions.py`; it never fails the build, `LINT_STRICT=1` makes it). Commit with clear messages. Never commit `source/`.
