# Build workflow for one lecture

Follow this order. Each step depends on the one before it. Do not start
writing content before the scope file exists. The course's `CLAUDE.md`
section or course file may add course-specific detail (page offsets,
source names); it never removes a step. `<slug>` is the course slug.

## Step 0: exam format

Check `source/<slug>/exams/` for a paper newer than the one the
course's exam-format file describes (`docs/exam-format.md` for
NBE-E4210, `docs/exam-format-<slug>.md` otherwise). The most recent
paper by the current instructor is the model for question types,
wording, word banks, point weighting and the difficulty ceiling. If it
differs, update the exam-format file, the question mix in
`docs/PEDAGOGY.md` and the lint's rules before writing any question.
Older papers by other teachers only inform hard stretch questions.

## Step 1: scope

Read the lecture's slide deck page by page. If the Read tool cannot
render PDF pages, render them to PNG with PyMuPDF into the scratchpad
and read the images: slides carry most content in figures, so text
extraction alone is not enough. Read the homework for the lecture and
the TA notes if they exist.

Write `docs/scope/<slug>/L0X.md` with:

- Every concept on the slides, with its slide number, mapped to the
  notes section and to the exact textbook pages read for it.
- The notes-to-deck slide mapping. Notes are sometimes written against
  a longer deck, so their slide numbers can differ from ours. Map notes
  slides to deck slides explicitly before citing any slide number from
  the notes. Notes content with no slide in our deck is out of scope and
  gets at most one line.
- Homework items: a concept a homework exercise asks for is in scope
  even if the slides omit it. Note the source.
- For a quantitative course, a formula inventory: every formula with
  symbols, units, sign conventions, slide, and load-bearing or
  reference-only (`CALCULATIONS.md`).
- An out-of-scope list: things in the notes or textbook the slides never
  touch. These must not be used.
- A doubts list, reported to the user verbatim at the end.
- The video report from step 2.

## Step 2: figures and videos

Run the lister as the first step after the scope file:

```
python scripts/extract_figures.py list "source/<slug>/slides/<deck>.pdf" --preview
```

It prints every placed image with page, pixel size and rectangle,
writes numbered preview pages, and ends with a video report: embedded
clips the PDF export shows as a black box, media annotations, and links
to online videos, each with its slide number. List every hit in the
scope file with slide number and title and tell the user. Lectures are
usually distributed as PDF only, so do not block on clips and do not
write questions that need one. If a PPTX or clip does arrive,
`scripts/video_asset.py pptx` extracts clips and
`scripts/video_asset.py add <clip> --course <slug> --lecture L0X --name <name> --at <s>`
places a clip and its poster frame.

Then pick every structural figure (source order in `FIGURES.md`) and
write `scripts/figures_<slug>_L0X.py`: crops via
`extract_figures.py crop ... --course <slug> --lecture L0X`, printed
labels painted out, leader stubs inpainted with `retouch_figure.py
erase`, panels composed, library SVGs rasterised. The whole set in
`src/assets/figures/<slug>/L0X/` must regenerate from that script.

## Step 3: depth

Notes narrow the chapter, slides confirm scope. Where notes exist, read
only the textbook pages the notes cite for each section, and from those
keep only what a slide covers. A range cited for a concept absent from
the slides is not read. A slide concept with no page in the notes is
looked up in the chapter index and the pages recorded. Without notes,
use the chapter and confirm every concept against the slides.

```
pdftotext -f <first> -l <last> "source/<slug>/textbook/<file>.pdf" -
```

Printed page numbers differ from PDF page numbers by the front matter.
Verify the offset on one known page and record it in the course's rules.
If a course has no accessible textbook, the slides plus homework are
authoritative; say in the report which sections had no depth source.

## Step 4: content

Write `src/content/<slug>/L0X.js` against `CONTENT_SCHEMA.md`. Section
order follows the notes' table of contents unless the slides order
differently, in which case the slides win. Per section: short blocks
(no prose run over five lines), figures as `figure` blocks with hotspot
regions in percent of each image, all maths through KaTeX, then the
concept quiz. Include the notes' self-check questions, rewritten into
the exam's formats. End with the recap card.

## Step 5: verify every number (quantitative lectures)

Every worked step, drill answer and calculation answer comes out of a
script, not out of your head (`CALCULATIONS.md`, Verification). A
content file with an unverified number is not finished.

## Step 6: lecture quiz

12 to 15 questions, easy then medium then hard, in the exam's format
and mix as recorded in the exam-format file and `PEDAGOGY.md`. Medium is
anchored to the paper's difficulty ceiling, hard sits above it on
purpose. Every question has a step-by-step `modelAnswer` and shows its
points.

## Step 7: wire it up

Copy the course's L00 shell to `src/courses/<slug>/lectures/L0X/index.html`
(keep `data-course`, set `data-lecture` and the title), add the vite
entry, flip the registry line to built, add prerequisite links to the
earlier lectures this one builds on.

## Step 8: look at it

Build, serve, and use the browser tool. Screenshot every section and
every figure at 380, 768, 1280 and 1920 px in light and dark. Look at
each one. Fix what is wrong and repeat until every figure meets
`DESIGN.md` and no layout breaks. Drive the interactive parts: hotspots
by keyboard, a label question, a word bank, a trueFalse correction box,
a wrong answer, and confirm progress survives a reload.

## Step 9: build, lint, commit, report

`npm run build`. The build report runs `scripts/lint_questions.py
--strict` and fails on any finding in the new lecture: option lengths,
answer positions, question mix, required fields, word banks, plain-text
maths. Fix every finding; never add a new lecture to `LEGACY` and never
commit with `LINT_GATE=0`. Update `CREDITS.md` for every new asset,
videos and posters included. Commit. Never commit `source/`.

Then report to the user:

- which figures came from slides, which from libraries, which were
  drawn, and why
- every video placeholder found, by slide
- the scope doubts list from step 1
- any formula the slides state without deriving, where you could not
  tell whether the derivation is examinable
- anything in the homework you could not reproduce, and what you did
  instead
