# NBE-E4120 implementation audit

Audit started 7 November 2026. Authority: kickoff and handoff section 0, official Exam info Ephys_Oct_2026.pdf, local decks and exercises. This is a plan and evidence record, not a completion report.

## Implementation sequence

1. Audit source identity and existing renderer. Record exam format, source map, topic matrix, and source discrepancies before changing product code.
2. Extend shared machinery on the existing L00 test page: accessible formula explorers and one drill each, unit-aware numerical checks, structured substitution and intermediate inputs, separate progressive hints, written self-assessment, hint-aware progress/review, and five-question mock attempts with locked solutions before submission. Add independent calculation checking and schema/lint support together.
3. Wire a separate NBE-E4120 shell and registry. Preserve NBE-E4210 content and its assessment wording. Expose the supplied equation sheet as a permanent reference.
4. Build L01 in actual slide order, cover all assessable slide and Exercise 1 concepts, add genuinely distinct practice questions and exactly three complete five-question mocks. Maintain source-to-question coverage.
5. Run full build with visible Python lint, independent numeric checks, and browser checks at 380, 768, 1280 and 1920 pixels in both themes. Commit completed increments locally only.
6. Pause after L01 for the student's actual Claude Code review. Resolve reported findings before L02. Continue in order only after that review; no claim that the supplied QA prompt is a completed review.

## Existing components and gaps

Existing: Vite multi-page shells, per-course content discovery and review, vanilla JS block renderer, KaTeX, numeric final-answer calc, essay/interpret rubric, reusable hotspot figures, localStorage progress, strict Python question lint. Existing L00 is the renderer test page. No new framework is needed.

Missing at audit: generic formula explorer/drill; editable checked calculation stages; equivalent-unit checking; two progressive hints and hint-aware review; multiStepCalc/derive/predict; convention block and recap constants; mock exam attempt lifecycle and separate automatic/self-review reporting; independent check_calcs.py; E4120 registry, shells, content and course-specific lint rules. Existing header and quiz text assumes mini-exams, so these need configurable wording without changing E4210 defaults.

## Source-to-lecture map

Paths are relative to source/nbe-e4120. Identity comes from PDF title pages, not the old schedule summary. Page numbers below are PDF pages; printed numbers can skip.

| Lecture | Actual deck(s), teaching sequence | Pages | Exercises/solutions available |
|---|---|---:|---|
| L01 | lectures/Ephys-Lecture-1-2026_Intro_4-9-26 (3).pdf; part 1 starts p7, part 2 p28 | 39 | Exercise1 (4).pdf; Exercise1_answers (1).pdf |
| L02 | lectures/Ephys-Lectures-2-2026_Potentials_11-9-26 (1).pdf | 28 | Exercise2_10-9-26 (3).pdf; Exercise2_answers2 (1).pdf |
| L03 | lectures/Ephys-Lectures-3_2026_Cable (1).pdf, Cable properties of dendrites | 23 | No Exercise 3 file located; software work excluded |
| L04 | lectures/Ephys-Lectures-4_2026_Cable (1).pdf, Linear cable theory (cont.) | 19 | Exercise4 Cable (3).pdf; Exercise4Cable_answers.pdf |
| L05 | lectures/Ephys-Lectures-5_2026_Rall.pdf, Cellular models (pp1-7), then Dendritic integration and Rall model (pp8-33) | 33 | Exercise5_2026.pdf; Exercise5_answers.pdf |
| L06 | lectures/Ephys-Lecture-6-2026_Nonlinearities_full (1).pdf | 21 | Exercise6 (2).pdf; Exercise6_instructions.pdf; software work excluded |
| L07 | lectures/Ephys-Lecture-7-2026_HHmodel1_full.pdf | 33 | No Exercise 7 file located; software work excluded |
| L08 | lectures/Ephys-Lecture-8-1-2026_HHmodel2 (1).pdf, then Ephys-Lecture-8-2-2026_Saltatory_v4 (1).pdf | 22 + 18 | Exercise8HH.pdf; no confirmed solution |
| L09 | lectures/Ephys-Lecture-9_1_2026-Ion_channels.pdf, then Ephys-Lecture-9_2-2026_Channelopathy_v2.pdf | 22 + 13 | No Exercise 9 file located |
| L10-L12 | No decks located | — | Pending materials |

Shorter L06 (18 pages) and L07 (30 pages) decks also exist. Full versions add pre-assignment material. Compare shared pages before treating one as superseding the other; full filename alone is not a publication date. Dates remain the L01 schedule dates unless newer evidence changes them. L05/Rall, L06/nonlinearities, L07/HH and L09/channelopathy differ from the old handoff summary.

## Source issues and unsupported assumptions

- Official exam p1 confirms 30 November 2026, 13:00-16:00, equations provided and own calculator. It does not confirm open-book status, a student cheat sheet, or per-question weights.
- Exam p3 marks channelopathy/therapeutic targets/pharmacological safety provisional. Local L09 part 2 already teaches them; retain the provisional exam flag rather than moving them to L12.
- Material folders are lectures/ and exercises/, not the handoff's slides/homework/solutions template. Do not move user files.
- Course skill incorrectly says no solutions or exam info are available. Actual local PDFs override that stale status.
- L01 p35 has apparent textual errors in the calcium-pump concentration label and bicarbonate/chloride directions. Do not assess the erroneous directions as facts. Keep transport categories and supported pump/exchanger examples; record unresolved wording explicitly.
- Exercise 1 solution p1 prints the charging response with a division by the exponential factor. L01 p24 has the physically consistent multiplication. Use slide p24.
- Exercise 1 problem 3 allows water permeability, but its solution computes a fixed-volume redistribution and then predicts osmosis. Explicitly distinguish constrained-volume ionic equilibrium from unconstrained osmotic equilibrium. Do not claim the supplied concentrations are the final unrestricted water equilibrium.
- Slide p8's approximate neuron counts are not needed for an assessable structural concept; do not turn questionable historical counts into trivia.
- Axon Guide is supplementary. No entire textbook was read. Other cited textbooks are not locally available.

## Validation status

Python 3.14.7 available. Local PyMuPDF 1.26.7 works with the existing .tmp-pdf path outside the restricted sandbox. Audit script extracted 25 non-textbook PDFs and generated visual reading sheets for the exam, L01 and Exercise 1. Initial quantitative component fixtures are implemented on L00; L01 and its mocks are pending.

Validation actually run for the initial component increment:

- Full build, strict Python lint and independent checker ran. Latest checker: 13 verified values, zero failures. Numeric equivalent-unit/dimension/sign/invalid-input tests passed. Targeted new-fixture lint: zero findings, independent of the old L00 legacy exemption. Four existing section-lint tests passed.
- Existing test_review_features.py passed: questions-only sections, explanatory feedback, word banks, progress, date-aware review and responsive behavior.
- Playwright MCP checks: correct and wrong numeric stages, equivalent units, specific wrong-sign diagnosis, reloaded inputs, independent hints, hint-2 storage, symbol arrow-key movement, partial written self-review, withheld checks/hints during exam attempts, blocked empty submissions, persisted responses, submission/review and restart. Overflow checks at all eight width/theme combinations passed. Formula and calculation screenshots were captured at all eight combinations and visually inspected. Written screenshots were captured, with further visual review still pending. These are implementer checks, not independent Claude Code review.
- L01 extractor: no video placeholders, media annotations or video links. No new slide figure assets published yet.

Current infrastructure limitations to resolve before declaring the full shared-feature milestone complete: expand independent verification coverage to course numbers; finish browser visual review of written and mock components; support formula/domain cases required by L01; author and validate the actual source-grounded content and three distinct mocks. Dummy fixtures must never count toward course question/mock totals.

Course-shell increment: hub card and separate home are wired, all 12 lectures honestly remain unbuilt. Actual deck titles populate L01-L09; later titles are explicitly pending materials. All entries use the one final exam date. The 16 display rows in `equation-sheet.js` transcribe every relation on official PDF p4, including both Nernst shortcuts, reversed chloride ratios in GHK, specific cable notation, maximum-conductance bars, gating charge and the binomial/Poisson relations. The reference is permanently accessible on the course home. Long equations have keyboard-focusable horizontal scrolling, tested at 380 px. No new raster assets or credits are needed for this TeX transcription.

Shell checks actually run: full build with lint and 13-value numeric checker passed; hub navigation, 12 pending cards, 16 rendered equation rows and zero math-render errors checked; shell screenshots captured and visually inspected at all four widths in both themes, with no body overflow. NBE-E4210 home retains its mini-exam wording; L07 renders 16 quiz questions and zero math errors. This is implementer QA only. L01 question count: zero. L01 mock count: zero. The next required content milestone is not complete and no Claude review is claimed.
