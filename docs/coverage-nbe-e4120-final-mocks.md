# Five cumulative L01–L10 mock exams

The five cumulative papers supplement 30 lecture mocks. All five use the
official equation sheet. Existing exam IDs (`full-L01-L09-01` to
`full-L01-L09-05`) and question IDs were retained for saved attempts.

Each paper adds an L10 short-answer part. Papers 1–5 respectively cover
mEPP versus EPP, apparent somatic reversal, ionotropic versus metabotropic
receptors, rod transduction and the Poisson limit. Paper 1 also adds a
discontinuous-clamp and liquid-junction component to Q5. Paper 2 also asks how to measure apparent somatic reversal in Q5. L11–L12 materials
are pending.

Official authority: `source/nbe-e4120/Exam info Ephys_Oct_2026.pdf`, pp1–4.
Each paper preserves Q1 short concepts, Q2 explanation/sketch, Q3 calculation,
Q4 different calculation, Q5 methods/design/measurement limitation. The stated
180-minute workload and 20/40/45/45/30-minute allocations are practice estimates,
not official timings. The 50-point rubric is a site practice scheme, not an
instructor marking scheme.

| Mock | Q1 and Q2 | Q3 | Q4 | Q5 |
|---|---|---|---|---|
| 01 | Equilibrium/steady state, graded/AP, passive spatial/temporal effects (L01–L04) | Potassium concentration change, Nernst shift and clamped current (L01–L02) | Infer length constant from two voltages, remote response and passive speed (L03–L04) | TEVC ionic separation and instantaneous versus peak curves (L02,L07) |
| 02 | Rall conditions, boundaries, compartments and summation (L03–L05,L07) | Match a bifurcation, convert geometry and infer electrotonic parent length (L03,L05; Exercise5) | Infer forward/backward rates, relax a gate, apply independent-particle probability and driving force (L06–L07) | Local/somatic pulse comparison, filtering and stimulus controls (L03–L05), then a synaptic I–V protocol and space-clamp limitation (L10) |
| 03 | Capacitance/conductance, molecular gates and selectivity, stochastic events (L01,L07–L09) | Infer passive resistance/time/capacitance from steady and half-rise observations (L01–L02; Exercise1 P2) | Binomial occupancy and signed ensemble current (L09 9:1 p10) | Isolate sensor currents, integrate ON/OFF and state number-inference assumptions (L08 8:1 pp15–18; Exercise8 P3) |
| 04 | Gradients/GHK, geometry, accommodation and myelin; AP and propagation sketch (L01–L04,L07–L08) | GHK weighted concentrations, chloride orientation and permeability comparison (L02; Exercise2 P3) | Diameter scaling, two-sided input resistance, source response and characteristic-speed ratio (L03–L04; Exercise4 P2) | Paired pulse and ramp/step controls, history and nonunique mechanisms (L08 8:1) |
| 05 | Chord/slope, rectification, availability, current ambiguity and clamp modes (L02,L06–L09) | Chord conductance and inverse first-order relaxation from explicitly ideal numeric data (L06; Exercise6 P1–2) | HH gate products, signed species currents and instantaneous charge balance (L07–L08; Exercise8 P1–2) | Distinguish linear capacitance, sensor and ionic transients, subtraction and finite-window limits (L01,L07–L08) |

Sources follow the existing per-lecture scope and coverage maps, not new textbook
content. Direct source rechecks include the official four pages, Exercise1,
Exercise2, Exercise4, Exercise5, Exercise6 instructions and Exercise8, plus source
slide text and selected visual pages recorded in `.codex-progression/final-mocks/`.
No graph was digitized. The one synthetic relaxation observation is explicitly
labelled ideal model data and is not presented as an experimental recording.
Characteristic passive speed remains qualified as an estimate without a sharp
front. All exact calculation conditions and source citations are in the content.

All ten calculation prompts have SI-independent recomputation in
`scripts/check_final_mocks.mjs`, invoked by `scripts/check_calcs.py` during build.
45 numeric stages carry explicit units and absolute tolerances (0.5% relative,
with a 0.00001 absolute floor for rounding). Every stage accepts its supported
unit and equivalent dimensions. Full worked equations show relation,
rearrangement, substitution and result; final comments check signs/assumptions.
Every numeric question has a four-item partial-credit method checklist, and
all 15 written questions have explicit rubric criteria and written models.

All 30 lecture papers are available on their respective lecture pages. Exam-mode hints, stage checks and solutions are absent until
submission. Sketches and prose require self-review; typed prose earns no
semantic automatic credit. Numeric results are transferred to existing checked
stage fields after submission. Per-question/overall corrected-practice scores,
responses, method checks and previous attempts persist independently of lecture
mocks. Detailed verification and limitations: `.codex-progression/FINAL-REPORT.md`.
