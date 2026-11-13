# Lecture 3 source and assessment coverage

Scope and caveats: [L03 scope](scope/nbe-e4120/L03.md). All 23 PDF pages were read. Exercise 3 and its solution are absent. PDF and printed slide numbers agree. No supplementary textbook pages were required or read.

| Segment | Source | Canonical practice IDs | Formula/drill IDs |
|---|---|---|---|
| Overview: passive spread in a working neuron | L03 PDF 1–2 | L03-functions-recall, L03-functions-map |  |
| Two electrodes, passive responses and threshold | L03 PDF 3 | L03-responses-recall, L03-responses-interpret, L03-responses-protocol |  |
| A cable stores charge and loses signal | L03 PDF 4–5 | L03-analogy-compare |  |
| Temporal and frequency-domain filtering | L03 PDF 6 | L03-direct-tau, L03-direct-corner, L03-filter-compare | L03-f-tau, L03-f-corner |
| From a dendritic tree to cylindrical cables | L03 PDF 7 | L03-cylinders-model |  |
| The isopotential sphere | L03 PDF 8 | L03-direct-area, L03-direct-density | L03-f-area, L03-f-density |
| Input resistance and the lumped step | L03 PDF 8 | L03-direct-input, L03-direct-charging, L03-sphere-chain, L03-size-control | L03-f-input, L03-f-charging |
| Voltage differs along a real neuron | L03 PDF 9 | L03-distributed-recall |  |
| Choose a reference and state the assumptions | L03 PDF 10 | L03-assumptions-recall, L03-assumptions-fail |  |
| Current divides between membrane and axial paths | L03 PDF 11 | L03-compartment-balance |  |
| Specific parameters versus per-length parameters | L03 PDF 12 | L03-direct-axial, L03-direct-membrane, L03-direct-capacitance, L03-direct-segment-axial, L03-direct-segment-membrane, L03-geometry-derive | L03-f-axial, L03-f-membrane, L03-f-capacitance, L03-f-segment-axial, L03-f-segment-membrane |
| From voltage gradient to current conservation | L03 PDF 13 | L03-direct-gradient, L03-direct-conservation, L03-conservation-derive | L03-f-gradient, L03-f-conservation |
| Membrane balance and the linear cable equation | L03 PDF 14 | L03-direct-membrane-current, L03-direct-evolution, L03-equation-derive, L03-curvature-inference | L03-f-membrane-current, L03-f-evolution |
| Length constant and external resistance | L03 PDF 14 | L03-direct-length, L03-length-equality, L03-external-resistance | L03-f-length |
| Read attenuation and temporal broadening | L03 PDF 15 | L03-pulse-interpret, L03-forcing-units |  |
| Steady attenuation along an infinite cable | L03 PDF 16 | L03-direct-decay, L03-infer-length | L03-f-decay |
| Radius and resistivity control spatial spread | L03 PDF 17 | L03-direct-specific-length, L03-scaling-predict | L03-f-specific-length |
| Electrotonic distance is dimensionless | L03 PDF 18 | L03-direct-distance, L03-geometry-chain | L03-f-distance |
| Charging, discharging and geometry cancellation | L03 PDF 19 | L03-direct-discharge, L03-time-versus-distance | L03-f-discharge |
| Insulation: separate distance and time effects | L03 PDF 20 | L03-myelin-recall, L03-insulation-factors, L03-myelin-ambiguity |  |
| Boundary conditions and temporal resolution | L03 PDF 21 | L03-boundary-compare |  |
| Normalized variables and the transient reference | L03 PDF 22 | L03-direct-normalized-time, L03-erf-recognize, L03-transient-sign-audit | L03-f-normalized-time |
| Synthesis and what a cable simulation should demonstrate | L03 PDF 23 | L03-synthesis-exam |  |

## Mock appearances

Each mock covers lectures 1–3 and prominently uses lecture 3. Calculation copies share preparation tasks with the bank, but the three exams have distinct central reasoning. Practice rubrics are not official exam weights.

| Mock | Position | ID | Source/concepts |
|---|---|---|---|
| Mock A: measuring passive spread | 1 | L03-a1 | L03 PDF2,8–9,16; a) Define electrotonic spread. b) Distinguish isopotential from non-isopotential. c) Define input resistance. Answer each in 1–3 sentences. |
| Mock A: measuring passive spread | 2 | L03-a2 | L03 PDF2–3,6–7; Explain the five neuronal functions and sketch how passive spread connects reception and integration. Contrast small passive depolarization with a threshold-crossing active response. |
| Mock A: measuring passive spread | 3 | L03-a3 | L03 PDF 16; In an ideal infinite passive cable, steady increments at the injection site and $0.6\,\text{mm}$ away are $12$ and $4\,\text{mV}$. Infer the length constant, then predict the signed increment at $-1.2\,\text{mm}$. Explain the symmetry assumption. |
| Mock A: measuring passive spread | 4 | L03-a4 | L03 PDF 8; A passive sphere has radius $12\,\mu\text{m}$, $R_m=1.5\,\Omega\,\text{m}^2$, $C_m=0.01\,\text{F/m}^2$. Inject $8\,\text{pA}$ for a long time. Find area, input resistance, steady voltage increment and time constant. |
| Mock A: measuring passive spread | 5 | L03-a5 | L03 PDF3; Read the two-electrode source figure. Identify injection and recording, distinguish passive and active responses, and design an amplitude series to test linearity. |
| Mock B: insulation and the return path | 1 | L03-b1 | L03 PDF12,14,16,19; a) Define the length constant. b) Define the membrane time constant. c) Distinguish specific resistivity from resistance per length. |
| Mock B: insulation and the return path | 2 | L03-b2 | L03 PDF10–14; Derive the passive cable equation with a compartment sketch. Explain which terms disappear at steady state, and why an external return resistance changes spatial spread. |
| Mock B: insulation and the return path | 3 | L03-b3 | L03 PDF 20; An idealized insulating change multiplies specific membrane resistance by $9$ and capacitance by $1/18$, with geometry and intracellular resistivity fixed. Initially $\lambda=0.5\,\text{mm}$ and $\tau_m=24\,\text{ms}$. Find both new scales, then compare attenuation at $1\,\text{mm}$ for the same origin voltage. |
| Mock B: insulation and the return path | 4 | L03-b4 | L03 PDF 14; A cable has $r_m=8\times10^4\,\Omega\,\text{m}$ and $r_i=8\times10^{10}\,\Omega/\text{m}$. Compare its length constant with negligible external resistance and with $r_o=3r_i$. For a $0.5\,\text{mm}$ site find the fraction of the same steady origin response in both cases. |
| Mock B: insulation and the return path | 5 | L03-b5 | L03 PDF15,19,21; Use the source distance-labelled pulse traces. Explain which waveform is most distant and why fitting all traces with one lumped RC exponential is inadequate. Specify one controlled comparison and one inference the plot alone cannot establish. |
| Mock C: geometry and causal balance | 1 | L03-c1 | L03 PDF10,18,22; a) Define rest-relative voltage. b) List the uniform passive cable assumptions. c) Define normalized distance and time. |
| Mock C: geometry and causal balance | 2 | L03-c2 | L03 PDF17,19,21; Sketch spatial attenuation and temporal responses for two uniform cables differing only in radius. Explain why greater spread does not imply a different local membrane time constant, and why boundary conditions still matter. |
| Mock C: geometry and causal balance | 3 | L03-c3 | L03 PDF 18; A uniform dendrite has radius $1.5\,\mu\text{m}$, $R_m=3\,\Omega\,\text{m}^2$ and $R_i=1.5\,\Omega\,\text{m}$. External resistance is negligible. Find its per-length resistances, length constant and electrotonic distance for a site $1.2\,\text{mm}$ away; predict attenuation of a $9\,\text{mV}$ origin increment. |
| Mock C: geometry and causal balance | 4 | L03-c4 | L03 PDF 14; At a source-free cable location, $V=6\,\text{mV}$ is increasing at $0.15\,\text{V/s}$. The local time constant is $20\,\text{ms}$ and length constant $0.75\,\text{mm}$. Infer voltage curvature. Predict the instantaneous slope if axial redistribution were removed while the same local voltage remained. |
| Mock C: geometry and causal balance | 5 | L03-c5 | L03 PDF3,16–18; L01 controlled current injection; Design a passive cable experiment that distinguishes stronger supplied current from improved spatial spread. Use the source spatial profile, specify recordings and controls, and explain why a remote amplitude alone is insufficient. |

23 segments, 23 easy inline checks, 21 explorer/drill pairs, 54 bank questions, three five-question mocks.

Bank types: {"trueFalse":5,"multiStepCalc":28,"written":15,"derive":4,"predict":2}. Tiers: {"easy":26,"medium":16,"hard":12}.

## Easy-first progression, 12 November 2026 (L03-only)

All 23 sections now begin practice with two easy concept MCQs after the unchanged visible theory, source figures and formula explorers. Existing numeric drills follow these checks, then unchanged core bank practice progresses easy, medium, hard independently in each section. Optional work remains last and closed. No completion gate is imposed.

23 existing checks reused, 23 complementary recall checks added, 46 total. Each section has one reused `L03-<section>-check` and one new `L03-<section>-starter`, flagged `progressionAdded: true` and citing that section's slide pages. No section needs a fewer-than-two exception; two is sufficient for these narrowly divided segments. No numeric or applied task was relabelled. Existing two-option checks retain answer indices and option ordering; new checks have three balanced options. All options give brief explanatory feedback only after Check. The time-check wording was clarified without changing its key; the boundaries distractor was made plausible. Other existing option text is preserved.

Sources re-read: all 23 pages of the cable deck and all four official exam-guidance pages, with visual contact sheets. Source mapping follows the table above. New checks cover neuronal integration, passive stimulus recognition, insulation analogy, low-pass filtering, model application, ohmic resistance, lumped charging, spatial voltage differences, external-resistance assumption, branch conservation, core geometry, axial gradient, membrane current components, spatial scale, leakage, symmetric attenuation, membrane resistivity, electrotonic distance, local capacitance, insulation factors, temporal broadening, error-function complement and intracellular resistivity. Exercise3 remains absent; no assignment or simulated recording was invented. The error-function item is recognition of the existing reference, not additional derivation scope. Myelin timing remains conditional on the resistance–capacitance product.

Preserved exactly: 23 section IDs/order/titles, all theory/non-quiz section fields and figures, 21 formula/drill payloads, recap and equations, 48 core plus 6 optional bank questions with all IDs/keys/numeric answers/rubrics, and all 27 full lecture-mock payloads course-wide. Course bank remains 609 core/80 optional. No shared component or E4210 product change.

Authored correct positions across 46 mixed two-/three-option checks: 20/19/7; seeded displayed positions: 17/22/7. Expected under each item's option count: 19.167/19.167/7.667; authored p=0.9533, displayed p=0.6971. Zero length findings; mutation tests reject severe length cues and excessive position bias. New items alone use authored positions 8/8/7. Prompts are distinct from the existing L03 practice and mocks.

Build/strict lint, numerical verification (1,758 values), source transient checks, numeric input, content/preservation/quality and Playwright checks pass. Browser verifies all section openings, wrong/correct feedback, keyboard/retry/reload without duplicate attempts, saved optional numeric inputs/hints/review and mock draft/submission restoration. 184 section screenshots plus eight feedback screenshots cover 380/768/1280/1920 in both themes; representative mobile/desktop screenshots were visually inspected. Existing E4210 review fixture assertion at line 24 still exits 1 and was left unchanged. See `.codex-progression/L03-REPORT.md` and phase logs. LOCAL ONLY; other lectures and cumulative mocks are outside this phase.
