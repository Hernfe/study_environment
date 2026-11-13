# Lecture 4 source and assessment coverage

Scope and caveats: [L04 scope](scope/nbe-e4120/L04.md). All 19 PDF pages were read. Exercise 4 and worked solutions supplied and read. Printed slide number is PDF+1 after the title. No supplementary textbook pages were required or read.

| Segment | Source | Canonical practice IDs | Formula/drill IDs |
|---|---|---|---|
| Overview: speed, boundaries and integration | L04 PDF 1 | L04-overview-recall |  |
| A characteristic passive-wave velocity | L04 PDF 2 | L04-direct-speed, L04-direct-position, L04-speed-limits | L04-f-speed, L04-f-position |
| Geometry changes spread and input resistance | L04 PDF 3 | L04-direct-length, L04-direct-tau, L04-direct-size-ratio, L04-inverse-scaling, L04-geometry-chain | L04-f-length, L04-f-tau, L04-f-size-ratio |
| Choose the geometry and stimulus first | L04 PDF 4 | L04-boundary-compare |  |
| Normalize position, total length and time | L04 PDF 5 | L04-direct-distance, L04-direct-total-length, L04-direct-time, L04-normalized-derive | L04-f-distance, L04-f-total-length, L04-f-time |
| Steady response to localized injection | L04 PDF 6 | L04-direct-source-voltage, L04-source-sign | L04-f-source-voltage |
| Infinite and semi-infinite input resistance | L04 PDF 7 | L04-direct-input-infinite, L04-direct-input-semi, L04-direct-input-ratio, L04-input-inference | L04-f-input-infinite, L04-f-input-semi, L04-f-input-ratio |
| Read attenuation under matched origin voltage | L04 PDF 8 | L04-profiles-read |  |
| Open end means short circuit; sealed means no axial flow | L04 PDF 9 | L04-end-recall, L04-stimulus-compare |  |
| Steady solutions and hyperbolic functions | L04 PDF 10 | L04-steady-derive |  |
| Terminal conductance relative to a cable arm | L04 PDF 11 | L04-direct-conductance, L04-direct-load | L04-f-conductance, L04-f-load |
| The finite-cable load solution | L04 PDF 11 | L04-direct-finite, L04-load-chain | L04-f-finite |
| Sealed, matched and open endpoints | L04 PDF11 | L04-direct-sealed, L04-direct-open, L04-cases-recall, L04-boundary-design | L04-f-sealed, L04-f-open |
| When both endpoint voltages are specified | L04 PDF 11 | L04-direct-endpoint, L04-endpoint-conflict | L04-f-endpoint |
| Check limiting cases before trusting a profile | L04 PDF 12 | L04-limits-proof |  |
| Real dendrites have changing boundary loads | L04 PDF 13 | L04-neuron-map |  |
| Distributed weak inputs and low-pass filtering | L04 PDF 14 | L04-synapse-recall, L04-synapse-compare |  |
| Where and when inputs arrive both matter | L04 PDF 15 | L04-summation-compare |  |
| Linear superposition and its limits | L04 PDF 16 | L04-direct-sum, L04-linear-recall, L04-spatial-signed-sum | L04-f-sum |
| Read temporal integration at three recording sites | L04 PDF 17 | L04-temporal-read, L04-temporal-residual |  |
| Spatial integration must preserve causal timing | L04 PDF 18 | L04-spatial-read, L04-summation-method |  |
| Electrotonic distance changes the trigger-zone signal | L04 PDF 19 | L04-distance-read, L04-distance-causality |  |
| Exercise extension: a restricted extracellular return path | Exercise 4 p1–2; answers p1–2; L03 PDF12,14 | L04-direct-annulus, L04-direct-return-resistance, L04-direct-external-length, L04-return-interpret, L04-return-design | L04-f-annulus, L04-f-return-resistance, L04-f-external-length |

## Mock appearances

Each mock covers lectures 1–4 and prominently uses lecture 3. Calculation copies share preparation tasks with the bank, but the three exams have distinct central reasoning. Practice rubrics are not official exam weights.

| Mock | Position | ID | Source/concepts |
|---|---|---|---|
| Mock A: boundary loading and current division | 1 | L04-a1 | L04 PDF5,7,9; a) Define electrotonic length. b) Distinguish an open cable end from an electrical open circuit. c) Define input resistance. Answer each in 1–3 sentences. |
| Mock A: boundary loading and current division | 2 | L04-a2 | L04 PDF8–12; Sketch and explain steady sealed, matched and open profiles at equal origin voltage. Label axes and endpoint conditions. Explain why equal injected current is a different comparison. |
| Mock A: boundary loading and current division | 3 | L04-a3 | L04 PDF 7; An end-driven semi-infinite cable has $R_{semi}=90\,\text{M}\Omega$ and $\lambda=0.6\,\text{mm}$. Infer axial resistance per length. The same cable is then extended identically on both sides of the source. Find its new input resistance, source response to $-40\,\text{pA}$ and response one length constant away. |
| Mock A: boundary loading and current division | 4 | L04-a4 | L04 PDF 11–12; The same uniform segment has length $0.6\,\text{mm}$ and length constant $0.5\,\text{mm}$. An electrode holds its origin increment at $10\,\text{mV}$. Compare the increment at $x=0.4\,\text{mm}$ for sealed, matched and open terminals. State why this does not predict equal-current responses. |
| Mock A: boundary loading and current division | 5 | L04-a5 | L04 PDF7–13; L03 PDF3; Design a two-electrode steady recording test of a changed terminal load. Use the source profile to specify recordings, controls and one ambiguity if only a remote amplitude is available. |
| Mock B: geometry, return path and voltage control | 1 | L04-b1 | Exercise 4 p1–2; L04 PDF5,11; a) Distinguish axial material resistivity from axial resistance per length. b) State what makes a process approximately isopotential. c) Define the terminal load ratio. |
| Mock B: geometry, return path and voltage control | 2 | L04-b2 | Exercise 4 p1–2; Explain how channel opening and a restricted extracellular shell jointly change voltage uniformity. Sketch the two longitudinal paths and membrane leak. Explain why a physically tiny process is not automatically isopotential. |
| Mock B: geometry, return path and voltage control | 3 | L04-b3 | Exercise 4 p1–2; answers p1–2; L03 PDF12,14; A cylindrical sensory process has radius $40\,\text{nm}$ and length $6\,\mu\text{m}$. Both axial material resistivities are $150\,\Omega\,\text{cm}$. Its extracellular shell is $4\,\text{nm}$ thick and resting $R_m=8\,\text{k}\Omega\,\text{cm}^2$. Find the shell area, both axial parameters, length constants with and without the return resistance and loaded electrotonic length. Then open channels to reduce specific membrane resistance sixteenfold. Explain whether physical smallness guarantees uniform voltage. |
| Mock B: geometry, return path and voltage control | 4 | L04-b4 | L04 PDF 11; A finite cable has imposed increments $V_0=6\,\text{mV}$ and $V_e=-3\,\text{mV}$, with $L=1.6$. Calculate the midpoint increment. Could this negative end voltage also be a sealed end of a cable driven only by the positive origin? |
| Mock B: geometry, return path and voltage control | 5 | L04-b5 | L04 PDF7–13; A recording team compares two cables at the same injected current and finds different remote voltages. Explain how source geometry and endpoint loading confound an inference about radius. Use the source neuron and propose additional measurements. |
| Mock C: signed summation and causal traces | 1 | L04-c1 | L04 PDF2,15–16; a) Define the passive half-rise characteristic speed. b) Distinguish temporal from spatial summation. c) State the condition for linear waveform addition. |
| Mock C: signed summation and causal traces | 2 | L04-c2 | L04 PDF14–19; Sketch separate and summed somatic responses to two inputs. Explain how distance and relative input timing affect summation and why a threshold spike or conductance interaction defeats unrestricted linear addition. |
| Mock C: signed summation and causal traces | 3 | L04-c3 | L04 PDF 3; A uniform passive neurite has diameter $3.2\,\mu\text{m}$, $R_m=12\,\text{k}\Omega\,\text{cm}^2$, $R_i=150\,\Omega\,\text{cm}$ and $C_m=1\,\mu\text{F/cm}^2$. Find radius in SI, length constant, time constant and characteristic speed. Explain why this is not a measured spike speed. |
| Mock C: signed summation and causal traces | 4 | L04-c4 | L04 PDF 16; Two additive current inputs act in an ideal linear cable. Their separate steady local increments are $+8\,\text{mV}$ at $X=0.4$ and $-6\,\text{mV}$ at $X=1.1$ from the same recording site. Each individual transfer follows a matched exponential. Find both contributions at the recording site, their sum and the resulting absolute membrane voltage from a $-65\,\text{mV}$ baseline. State the current-source assumption. |
| Mock C: signed summation and causal traces | 5 | L04-c5 | L04 PDF18–19; Read the spatial-integration source. Map the input and target recording sites, describe separate versus combined responses, correct the timing warning and design a control that distinguishes peak compensation from equal waveforms. |

23 segments, 23 easy inline checks, 22 explorer/drill pairs, 53 bank questions, three five-question mocks.

Bank types: {"trueFalse":5,"multiStepCalc":31,"written":13,"derive":3,"predict":1}. Tiers: {"easy":27,"medium":16,"hard":10}.


## Easy-first progression, 12 November 2026 (L04-only)

All 23 sections now begin practice with two easy concept MCQs after the unchanged visible theory, source figures and formula explorers. Existing drills follow, then core easy application/numeric tasks, medium work and hard work independently within each section. Existing optional assignments stay last and closed by default. Learners can skip ahead without a completion gate.

23 existing checks reused and 23 complementary recall checks added, 46 total. Each new question has a stable `L04-<section>-starter` ID, `progressionAdded: true`, explicit easy/MCQ fields and a source citation. Existing checks retain IDs, correct indices, option positions, hints and model answers. Every option now has brief explanatory feedback, shown only after Check. Four reused distractors were narrowed without changing their keys or positions: endpoint removes an absolute “Always”; neuron contrasts membrane conductance with axial resistivity; spatial contrasts the causal input with the later response peak; distance-effect contrasts controlled cable properties with input-peak matching alone. New questions have three options; the original two-choice items remain compatible with saved selections.

Two starters are sufficient in each narrowly divided segment: the existing check and new check retrieve distinct definitions, physical roles, boundary conditions or recording sites. Existing drills and bank work supply the next application steps. No section falls below two, and no medium/hard question was relabelled. No prompts are duplicated within L04 starters or newly copied from its bank/mocks.

| Section | Source (PDF page unless noted) | Reused | Added | Total |
|---|---|---:|---:|---:|
| overview | 1–2 | 1 | 1 | 2 |
| speed | 2 | 1 | 1 | 2 |
| scaling | 3; Exercise 4 problem 2 | 1 | 1 | 2 |
| boundaries | 4 | 1 | 1 | 2 |
| coordinates | 5 | 1 | 1 | 2 |
| infinite | 6 | 1 | 1 | 2 |
| input | 7 | 1 | 1 | 2 |
| attenuation | 8 | 1 | 1 | 2 |
| ends | 9 | 1 | 1 | 2 |
| hyperbolic | 10 | 1 | 1 | 2 |
| load | 11 | 1 | 1 | 2 |
| finite | 10–11 | 1 | 1 | 2 |
| cases | 11 | 1 | 1 | 2 |
| endpoint | 11 | 1 | 1 | 2 |
| summary | 12 | 1 | 1 | 2 |
| neuron | 13 | 1 | 1 | 2 |
| synapses | 14 | 1 | 1 | 2 |
| summation | 15 | 1 | 1 | 2 |
| superposition | 16 | 1 | 1 | 2 |
| temporal | 17 | 1 | 1 | 2 |
| spatial | 18 | 1 | 1 | 2 |
| distance-effect | 19 | 1 | 1 | 2 |
| return | Exercise 4 pages 1–2; answers pages 1–2 | 1 | 1 | 2 |

Sources re-read: all 19 L04 PDF pages, both Exercise 4 pages, both supplied solution pages and all four official exam-guidance pages, with visual reading sheets. New checks cover graded passive responses, local half-rise criterion, square-root radius scaling, transient stimuli, time normalization, distant resting limit, input measurement site, sealed attenuation, open endpoint voltage, steady temporal derivative, matched load, origin prefactor, matched exponential, endpoint data, origin consistency, insulated tips, low-pass synaptic transformation, spatial integration, baseline counted once, residual depolarization and source recording-site identification, plus the isopotential criterion. No unavailable textbook, later active-channel/Rall mechanism, unsupported graph measurement or new source figure is introduced. Existing passive-speed, hyperbolic-sign, normalized-gradient, fixed-origin/load, causal-timing and return-path qualifications remain intact.

Preserved exactly: all 23 section IDs/order/titles and non-quiz section fields; all theory, visuals, formulas and 22 explorer/drill pairs; recap/equations; all 47 core + 6 optional bank objects, numerical answers, hints, rubrics and progress keys; all three L04 mocks and all 27 full lecture mocks course-wide. Course bank remains 609 core/80 optional. Other lectures, all shared source and E4210 product/test files are unchanged from this invocation's dirty-tree snapshot. No cumulative mocks belong to this L04-only phase.

Correct positions across 46 mixed two-/three-option checks: authored 20/19/7; deterministic displayed 22/14/10. Expected per-item uniform positions: 19.167/19.167/7.667. Authored p=0.9533, displayed p=0.2834; zero length-cue findings. The 23 new items alone use authored positions 8/8/7. Mutation tests reject severe length cues and excessive correct-position bias. Semantic review checked one best answer, parallel options and section/source relevance; statistical lint does not substitute for this review.

Build (including strict lint), independent numeric verification (1,758 values), L04 source/relation tests, numeric-input tests, all-question feedback/restore and compatibility checks pass. Playwright verifies every section's first practice, theory/explorer/drill order, keyboard, old/new concept reload/deduplication, optional numeric/hint/review preservation, formula keyboard and mock draft/submission restoration. 184 section captures plus eight feedback captures cover 380/768/1280/1920 in both themes; representative screenshots were visually inspected. Existing source raster labels remain as supplied. The documented E4210 fixture assertion remains a separate pre-existing failure. Exact commands, exits and preservation evidence are in `.codex-progression/L04/` and the phase/final reports. LOCAL ONLY; no Git writes, commit, push or deployment.
