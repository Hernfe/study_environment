# Architecture

This file describes the repo as it is. Where it and the repo disagree,
the repo wins: fix this file. The repo's own contracts are
`docs/CONTENT_SCHEMA.md` (content files and the renderer),
`docs/PEDAGOGY.md`, `docs/DESIGN.md` and the course's exam-format file.

## Stack

Vite, vanilla JavaScript ES modules, plain CSS. d3 for quantitative
figures and demos, KaTeX for all maths (`src/js/math.js`), linkedom as a
dev dependency for the question lint only. No framework. Multi-page
build: one HTML entry per page. Deployed on Vercel (Vite preset,
output `dist/`); `vercel.json` holds only redirects. Keep the repo and
the deployment private: extracted slide and textbook figures are the
author's copyright and this is personal study use.

Reasons: pages are documents, not an app; a framework would add build
weight and a state layer for no gain. Vanilla modules also mean a new
lecture is one data file, not a component tree.

## Repo layout

```
<repo>/
  CLAUDE.md                     rules of the first course, read every session
  .claude/skills/course-site/   this skill, versioned with the repo
  package.json                  build = vite build, postbuild = build report + lint gate
  vite.config.js                one entry per page: hub, course home, lecture shells
  vercel.json                   redirects from pre-hub URLs
  .gitignore                    node_modules, dist, source/, assets/incoming/, assets/bioicons/, shots/
  source/                       course material, local only, never committed
    <course-slug>/
      slides/ notes/ textbook/ exams/ homework/
  scripts/
    extract_figures.py          PyMuPDF: list figures and video placeholders, crop to webp
    retouch_figure.py           paint, smear, erase (OpenCV inpaint), crop, compose
    video_asset.py              pull clips from a PPTX, add a clip plus poster frame
    find_asset.py               search the local Bioicons clone
    bioart_fetch.py             download from NIH BioArt
    servier_fetch.py            download from SMART Servier
    figures_<course>_L0X.py     reproducible recipe for one lecture's raster figures
    dump_questions.mjs          content files to JSON (linkedom DOM), keyed <course>/<id>
    lint_questions.py           question lint; the build gate
    build_report.mjs            postbuild: runs the lint with --strict
  docs/
    CONTENT_SCHEMA.md           the content contract; the skill's schema summarises it
    PEDAGOGY.md                 tiers, question mix, review logic
    DESIGN.md                   tokens, grid, components, figure rules
    exam-format.md              NBE-E4210's mini-exam format (a new course: exam-format-<slug>.md)
    scope/<course-slug>/L0X.md  per-lecture scope checklists
  src/
    index.html                  the hub: course cards only
    courses/
      <course-slug>/
        index.html              course home: <body data-course="<slug>">
        lectures/L0X/index.html thin shells: data-course plus data-lecture, no text
    content/
      courses.js                course registry, drives the hub and course headers
      <course-slug>/
        registry.js             lectures of this course: registry, exampleLecture
        L00-example.js          renderer test lecture (dev only on the course map)
        L0X.js                  all content for one lecture
        figures/                static SVG figure modules; figures/index.js registers them
    js/
      hub.js                    renders the hub
      courseHome.js             course map, next exam, course review
      lecture.js                entry for every lecture shell
      course.js                 currentCourse() from <body data-course>, URL helpers
      content.js                glob over content/<course>/L*.js and registry.js
      render.js                 content object to page; site nav, credits
      visuals.js                figure and widget resolution (per-course figure registry)
      conceptQuiz.js            inline easy multiple choice
      lectureQuiz.js            graded quiz: every question type, points, score card
      wordBank.js               closed-list pickers
      math.js                   KaTeX typesetting and watching
      progress.js               localStorage, nbe:<course>:progress:<lecture>
      review.js                 per-course review queue
      dom.js                    el(), seeded shuffle, dates
      widgets/                  imageHotspots.js and the interactive demos; index.js registers them
    assets/
      figures/<course-slug>/L0X/  webp figures, each with a sidecar JSON (source, page, crop)
      videos/<course-slug>/L0X/   clips, when a course provides them
    styles/
      tokens.css base.css components.css index.css
  CREDITS.md                    every asset: file, where used, source, URL, licence, attribution
```

Content files reference their pictures relative to themselves:
`new URL('../../assets/figures/<slug>/L0X/<name>.webp', import.meta.url).href`.

## The hub

`src/index.html` is a list of course cards and nothing else. Cards come
from `src/content/courses.js`:

```js
export const courses = [
  {
    slug: 'nbe-e4210',
    code: 'NBE-E4210',
    title: 'Structure and Operation of the Human Brain',
    term: 'Autumn 2026',
    status: 'active',          // active | upcoming | archived
    summary: 'One paragraph shown under the title on the course home.',
  },
];
```

The hub counts built lectures from the course's `registry.js`, so no
count is stored here and nothing changes in `courses.js` when a lecture
is built.

No cross-course review, no aggregated deadlines, no dashboard. The hub
exists to choose a course. Everything else lives inside the course.

Each course home (`/courses/<slug>/`) is what used to be the site root:
course map with one row per lecture, next exam, and the review entry
point for that course only. Pages know their course from
`<body data-course="<slug>">`; `course.js` reads it, and `progress.js`,
`content.js` and `visuals.js` use it. The renderer, shells and
`courseHome.js` contain no course or lecture text; course text lives in
`courses.js` and the registry.

Site nav on every course page is a breadcrumb: Study hub / course code /
current page.

## Progress storage

One key per lecture, namespaced by course:
`nbe:<course-slug>:progress:<lectureId>`, value
`{ version, questions, concept, lastQuizAt }` (full shape in
`docs/CONTENT_SCHEMA.md`). Every access in try/catch. The lecture quiz
and review write the same record, so review buckets follow the quiz.

## Migrating a single-course site to the hub

Done for NBE-E4210 on 2026-09-28. Kept as the record of what the
migration involves, in case another single-course site is folded in.

1. Move `src/index.html` to `src/courses/<slug>/index.html` with
   `data-course` on the body, and its script to a course-agnostic
   module (`courseHome.js`); course-specific header text moves into
   `courses.js`.
2. Move `src/lectures/` to `src/courses/<slug>/lectures/`; add
   `data-course` to every shell and point its no-JS back link at the
   course home.
3. Move `src/content/L0X.js`, `registry.js` and `figures/` into
   `src/content/<slug>/`. Content files' asset URLs gain one `../`.
4. Move `src/assets/figures/L0X/` into `src/assets/figures/<slug>/L0X/`,
   `docs/scope/L0X.md` into `docs/scope/<slug>/`, `source/*` into
   `source/<slug>/`, and rename `scripts/figures_L0X.py` to
   `figures_<slug>_L0X.py`. `extract_figures.py crop` and
   `video_asset.py add` take `--course`.
5. Write the new `src/index.html`, `src/js/hub.js`, `src/js/course.js`
   and `src/content/courses.js`.
6. Update every entry in `vite.config.js` to the new paths.
7. Namespace localStorage by course and migrate once. The old keys were
   `nbe4210:progress:<lecture>`; `migrateLegacyKeys()` in `progress.js`
   copies every `nbe4210:` key to `nbe:nbe-e4210:` unless the target
   exists, sets `nbe:migrated:nbe4210`, and keeps the old keys so an
   older deploy still works. It runs on every page that imports
   `progress.js`, the hub included.
8. Add `vercel.json` redirects from the old lecture URLs
   (`/lectures/:lecture`, with and without trailing slash or
   `index.html`) to `/courses/<slug>/lectures/:lecture/`. The old root
   is now the hub, one click from the course.
9. Key the lint by `<course>/<lecture>` (`dump_questions.mjs`,
   `LEGACY` in `lint_questions.py`) with a per-course word-bank corpus,
   and check the findings are unchanged.
10. Rebuild, walk every page in the browser (no console errors, no
    broken images, figures registered, stored progress shown), commit.

## Adding a course

1. Create `source/<slug>/` and drop the material in.
2. Copy `courses/_TEMPLATE.md` in this skill to `courses/<slug>.md`,
   fill it from the material, and ask the user about anything the
   material does not answer.
3. Write the course's exam-format file (`docs/exam-format-<slug>.md`)
   from its most recent past paper, or from what the user confirms.
4. Make the lint course-aware before the first lecture: the question
   mix, tier targets and essay rule in `lint_questions.py` (`MIN_MIX`,
   `TARGET`, the essay check) are NBE-E4210's mini-exam format. Key them
   by course slug, keep NBE-E4210's values, and add the new course's.
   Otherwise the build gate enforces the wrong exam.
5. If the course needs question or block types the renderer lacks (a
   quantitative course needs the planned calculation features in
   `CALCULATIONS.md`), implement them in the renderer,
   `docs/CONTENT_SCHEMA.md`, the lint and `L00-example.js` together
   before writing lecture 1.
6. Add the entry to `src/content/courses.js`, create
   `src/content/<slug>/registry.js` with every lecture marked not
   built, and `src/content/<slug>/figures/index.js` exporting
   `figures = {}`.
7. Copy `src/courses/nbe-e4210/index.html` to
   `src/courses/<slug>/index.html`, change `data-course` and the title,
   and add its vite entry.
8. Build lecture 1 with `reference/BUILD_WORKFLOW.md`.

## Adding a lecture

One content file, one shell copied from the course's L00 shell
(`data-course` kept, `data-lecture` and title changed), one vite entry
(`'<slug>-L0X': 'courses/<slug>/lectures/L0X/index.html'`), one registry
line flipped to built, plus any new widgets or figure modules. Nothing
in the renderer changes. If a lecture needs the renderer to change, the
schema was wrong: extend the renderer and `docs/CONTENT_SCHEMA.md`
together, update this skill's schema summary, and keep older content
files working.

## Build and gate

`npm run build` runs `vite build`, then `scripts/build_report.mjs`,
which runs `scripts/lint_questions.py --strict`. Any finding in a
lecture not listed in `LEGACY` fails the build, plain-text maths
included; advisory notes (`tiers`, `wordbank-note`) never do.
`LINT_GATE=0` reports without failing, for work in progress only, never
for a commit. Without Python on PATH the lint is skipped with a warning.
A new lecture is never added to `LEGACY`.

## Environment

Node 20 or newer. Python 3 with PyMuPDF, Pillow and
opencv-python-headless for the figure pipeline; ffmpeg on PATH only to
transcode clips. poppler's `pdftotext` for textbook page ranges. A
browser automation tool (Playwright MCP is the reference choice) so
figures and pages are seen and revised rather than guessed at.
