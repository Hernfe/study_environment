# Repository rules

Before doing any work, read `CLAUDE.md` fully, then
`.claude/skills/course-site/SKILL.md` and every file under
`.claude/skills/course-site/reference/`, then `docs/exam-format.md`,
`docs/CONTENT_SCHEMA.md` and `docs/PEDAGOGY.md`.

`CLAUDE.md` is the authoritative rule set. This file is only a pointer.

## Build and lint gate

`npm run build` ends by running `scripts/lint_questions.py --strict`
via `scripts/build_report.mjs`. The lint is a build gate: any
`[mix]`, `[options]`, `[maths]` or `[wordbank]` finding in a lecture
not marked legacy fails the build. `[tiers]` and `[wordbank-note]`
are advisory and do not fail the gate.

**Before reporting a build as passing:**

1. Confirm that the lint output appears in the build log. It begins
   with a line like `nbe-e4210/L07: N findings, ...`. If that line is
   absent the lint did not run; do not call the build passing.
2. Paste the full lint summary for the new lecture in your report
   (every finding line for that lecture, or "0 findings" if clean).
3. If Python is not available, stop immediately and say so. Do not
   run `npm run build` with `LINT_GATE=0` or any other bypass, and do
   not claim a passing build without the lint output.

## Lecture quiz ordering and tiers

The `lectureQuiz` array must be ordered easy, then medium, then hard.
This ordering is a **gate** for NBE-E4210 (the lint reports it as
`[mix]` and fails the build if violated). Never place a hard question
before a medium question in the array.

Difficulty tiers are defined in `docs/PEDAGOGY.md` section 2:

- **Easy** — single recall or identification step.
- **Medium** — the mini-exam's ceiling: one-step application, map a
  described lesion/finding to a structure, spot the wrong link, order
  a sequence, compare two things. Anchored to `docs/exam-format.md`.
- **Hard** — deliberately above the paper: multi-step novel scenario,
  outcome prediction, or calculation. Never relabel a question hard
  just to reach the advisory target; the question must genuinely
  require extra reasoning steps.

Target about 3 easy, 5 medium, 5 hard (advisory; the split describes
cognitive demand, not a quota). Do not relabel existing questions to
hit the target — write genuinely harder questions instead, or accept
the advisory note.
