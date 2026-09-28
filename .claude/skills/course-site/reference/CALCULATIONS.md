# Formulas and calculation questions

This is the core of a quantitative course. Read it fully before writing
any content for one.

## Status in the repo

What exists today (`docs/CONTENT_SCHEMA.md`, Calculation):

- `calc` questions: `given: [{ symbol, value, unit }]` (symbols as
  inline maths), `answer: { value, tolerance, unit }` with an absolute
  tolerance in the answer's unit, `steps: [{ text, tex }]` revealed one
  by one, each `tex` typeset by KaTeX, and `modelAnswer`. Worth 1 point
  by default. Step style follows the course's homework (NBE-E4210: HW1,
  equation, substitution, intermediate values, final value with unit).
- `math` blocks and recap `equations: [{ name, tex, note }]`.
- Calculator widgets for specific formulas (`nernst-calc`,
  `ghk-explorer`), built per formula, not a generic explorer.

Everything else in this file is design for the first quantitative
course and is not implemented: the generic formula explorer, the drill,
the two hints, `commonErrors`, `sigfigs`, `multiStepCalc`, `derive`,
the `convention` block, recap constants and conventions,
`scripts/check_calcs.py`, and the hint-2 review bucket. Build each in
the renderer, `docs/CONTENT_SCHEMA.md`, the lint and `L00-example.js`
together before the lecture that needs it, and use the repo's naming
(`tex`, not `latex`; `steps`, not `solution`).

All maths in every field below goes through KaTeX, inline between
dollar signs or as display `tex`. The lint fails the build on
plain-text symbols and units.

## Which formulas get the full treatment

Not every formula is equal. Classify each one in the scope file:

- Load-bearing: the exercises require it, or a later formula is built
  from it. Gets a formula explorer, a drill, a recap line, and at least
  one question in the bank.
- Reference-only: stated on the slides for completeness, never used to
  compute anything. Gets a recap line and nothing else.

The test is the exercise sheets, not the slide count. A formula that
appears once on a slide but drives three exercise problems is
load-bearing. A formula covering half a slide that nothing uses is
reference-only. When the course provides a key-equations sheet, treat
everything on it as load-bearing, and check the exercise sheets for
load-bearing formulas the sheet omits.

## The formula explorer

A formula is a sentence. Most students can restate it and still not know
what it says. The explorer forces the reading.

Render the formula large, in its own card. Every symbol is a hover,
focus and tap target. Activating a symbol dims the rest of the
expression and shows a panel underneath with the symbol's name, its
units, what it physically is, and, where relevant, its sign convention.
Keyboard: arrow keys move between symbols, so it works without a mouse.

Under the formula, three fixed elements:

1. `reads`: one sentence stating in words what the formula tells you.
   Not a restatement of the algebra. "The equilibrium potential is set
   by the ratio of the concentrations, not their absolute values."
2. `assumes`: the conditions under which it holds. This is where most
   exam mistakes are born.
3. `variants`: the rearranged or simplified forms the course actually
   uses, including any numerical shortcut the slides give. Label each
   with when to use it.

Where a variable genuinely changes an outcome, add an interactive panel:
sliders for the inputs, live output, and a plot where the relationship
has a shape worth seeing. Keep it to one idea. The slider's job is to
show, for example, that the output depends on a ratio and is flat in
absolute concentration. Print the substituted equation under the output
so the arithmetic is visible, not just the result.

## The drill, immediately after

Every formula explorer is followed by exactly one drill exercise, in the
same card group, before the page moves on. This is deliberate: the
retrieval has to happen while the formula is still on screen.

Rules for a drill:

- Single-step. One substitution, one answer. Never two formulas.
- Numbers the student could check by hand.
- Uses the course's own notation and units.
- Numeric input with unit, checked against a tolerance.
- On a correct answer: confirm and show the substituted equation.
- On a wrong answer: no hints, no scolding, one line pointing at the
  likely slip (wrong direction of the ratio, wrong sign, unit not
  converted), then let them retry. Reveal the full solution only after a
  second attempt or on request.

The drill is always easy. Difficulty belongs in the question bank.

## Calculation questions in the bank

This is the type the student came for. Structure:

```js
{
  id: 'L02-q09',
  difficulty: 'medium',
  type: 'calc',
  prompt: 'A spherical cell has ... Calculate the membrane time constant.',
  given: [                                  // implemented
    { symbol: '$R_m$', value: 20, unit: 'kΩ·cm²' },
    { symbol: '$C_m$', value: 1,  unit: 'µF/cm²' }
  ],
  answer: { value: 20, unit: 'ms', tolerance: 0.5 },   // implemented; sigfigs planned
  hints: [                                  // planned
    { level: 1, body: '...' },
    { level: 2, body: '...' }
  ],
  steps: [                                  // implemented: { text, tex }
    { text: 'Identify what is asked: ...' },
    { text: 'Convert units.', tex: '...' },
    { text: 'Substitute.', tex: '...' },
    { text: 'Evaluate.', tex: '...' },
    { text: 'Sanity check: ...' }
  ],
  modelAnswer: ['...'],
  commonErrors: [                           // planned
    { wrongValue: 20000, why: 'Units left as µF and kΩ, so the answer came out in the wrong power of ten.' }
  ]
}
```

### The two hints

They are different in kind, not just in length. Getting this wrong
wastes the whole feature.

Hint 1, orientation. Names the physical situation and lists the formulas
in play, with nothing substituted. It answers "what kind of problem is
this and what do I reach for". It never says what to do first. Example
shape: "This is a passive charging problem. Two relations matter: the
membrane time constant, and the exponential approach to steady state.
Check your units before substituting."

Hint 2, the opening move plus the route. Shows explicitly how to start,
with the first substitution written out, and then outlines the remaining
steps in one line each without doing them. It answers "I am stuck at the
first line" and leaves the arithmetic to the student. Example shape:
"Start by converting R_m and C_m to base SI units, so R_m becomes
2.0 x 10^4 ohm cm squared and C_m becomes 1.0 x 10^-6 F per cm squared.
Then multiply them to get tau in seconds. Then convert to milliseconds
and compare with the typical range on the slides."

Both are collapsed. Opening hint 1 does not open hint 2. Track which
hints were opened in progress storage, because a question solved after
hint 2 is not mastered and should return in review.

### The solution

Collapsed, separate from the hints, revealed by its own control. Every
step is one `{ text, tex }`: a short lead and one or two lines of
reasoning in `text`, the expression for that step in `tex`. Rules:

- Show every algebraic step. Never jump two rearrangements in one line.
- Carry units through every line, not just the final answer.
- State the rearrangement before substituting numbers, then substitute,
  then evaluate. Three separate steps.
- End with a sanity check: order of magnitude, sign, or comparison with
  a typical value from the slides. This is the step that catches real
  exam errors and students skip it unless it is modelled.
- `commonErrors` entries are matched against the submitted answer. If
  the student types a listed wrong value, say what produced it. This is
  worth more than the correct solution, because it names their actual
  mistake.

### Multi-step problems

Course exercise sheets usually set parts a, b, c where b uses a's
answer. Mirror that with `multiStepCalc`. Each part has its own answer
check, its own two hints and its own solution. A wrong answer in part a
must not cascade: check part b against the correct value of a, and if
the student's a was wrong, say so rather than marking b wrong twice.

## Difficulty for calculation questions

- Easy: one formula, direct substitution, numbers given in the right
  units.
- Medium: unit conversion required, or the formula must be rearranged
  before use, or two formulas chain.
- Hard: the student must choose which relation applies, or work
  backwards from an outcome to a parameter, or combine three relations,
  or interpret a figure to get an input, or the problem is set the way
  the exercise sheet sets it with a physical scenario and no formula
  named.

For a calculation-heavy course, target roughly 4 easy, 5 medium, 5 hard
per lecture, with at least half of the bank being calculation or
multi-step calculation. Essays follow the course's exam format; on the
site they are always marked `beyondExam: true` unless the exam itself
has essays. Record the course's mix in its exam-format file and in the
lint's per-course rules (`ARCHITECTURE.md`, Adding a course).

## Verification, not estimation

Every number you publish is verified by running it.

`scripts/check_calcs.py` does not exist yet. Write it with the first
lecture that has a calculation beyond a single substitution, so that each lecture's content file has a
matching block of Python that recomputes: every drill answer, every
calculation answer, every intermediate value quoted in a solution step,
and every `commonErrors` wrong value from the error it claims to
represent. The script prints a table of expected against computed and
exits nonzero on any mismatch outside tolerance. Wire it into
`scripts/build_report.mjs` next to the lint so it gates the build the
same way.

Rules that catch most errors:

- Compute in base SI internally, convert for display.
- Tolerance is stated per question and is generous enough to absorb
  rounding at the number of significant figures the course uses, and
  tight enough that a method error fails.
- Accept the answer with or without the unit typed, and accept common
  equivalent units, but say which unit the answer is in.
- Where the course uses a rounded constant (58 mV or 61.5 mV rather than
  RT/F), use the course's value, not the exact one, and say in the
  solution which was used.
- Signs are a first-class concern. Record the sign convention in a
  `convention` block (planned; until it exists, a `definition` or
  `misconception` block titled as the convention), restate it in the recap, and make at least one
  question per lecture depend on getting it right.

## Writing questions that look like the course's

Read the course's own exercise sheets before writing any question, and
copy their surface features:

- How a problem is introduced: a scenario, a diagram, a table of values.
- Whether values are given in a list or embedded in the prose.
- Which units the course prefers and how it writes them.
- Whether the sheet asks for a number, a comparison, or a comment on the
  result at the end.
- How many parts a problem typically has.
- The register: terse and formal, or chatty.

Then write new problems in that mould with different numbers and
different scenarios. Never reproduce an exercise problem verbatim. The
aim is that a student who can do your bank can do their sheet.

If worked solutions to the course's exercises are available, also copy
their layout: how many steps they show, whether they carry units, and
where they stop. If they are not available, use the format in this file
and say so in the build report.
