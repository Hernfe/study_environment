// Source audit: docs/scope/nbe-e4120/L05.md
import { equationSheet } from './equation-sheet.js';
const content = {
  "meta": {
    "id": "L05",
    "number": 5,
    "title": "Cellular models, dendritic integration and the Rall model",
    "chapters": [],
    "pages": [],
    "lectureDate": "2026-10-02",
    "examDate": "2026-11-30",
    "examLabel": "Final exam"
  },
  "objectives": [
    "Choose and test lumped, distributed and compartment representations.",
    "Explain graded integration, local dendritic spikes and backpropagation.",
    "Check diameter matching and equal electrotonic paths before reducing a tree.",
    "Use terminal conditions to infer attenuation and somatic load."
  ],
  "prerequisites": [
    {
      "text": "Passive cable geometry and spatial scales",
      "lectureId": "L03",
      "sectionId": "equation"
    },
    {
      "text": "Boundary conditions and characteristic passive timing",
      "lectureId": "L04",
      "sectionId": "speed"
    }
  ],
  "overview": {
    "estimate": "Core route: read the main sections and answer 24 core questions. Formula explorers, videos, extra practice and mocks are optional.",
    "equations": "$\\tau_m=R_m C_m$ · $\\lambda=\\sqrt{d R_m/(4R_i)}$ · $d_P^{3/2}=\\sum_j d_j^{3/2}$ · $G_N=G_\\infty\\tanh L$ · $\\theta=2\\lambda/\\tau_m$",
    "pitfalls": "Check complete electrotonic paths as well as diameters. A sealed tip has zero axial current and can retain a voltage increment."
  },
  "standardPractice": "mc-only",
  "collapseFormulaExplorers": true,
  "segmentedPractice": true,
  "sections": [
    {
      "id": "overview",
      "title": "Choosing a cell model",
      "keyTerms": [
        "dendritic"
      ],
      "source": "L05 PDF 1",
      "blocks": [
        {
          "type": "text",
          "body": ["Choose one voltage for an electrically compact cell. Use coupled compartments or a cable when voltage varies across the cell. In passive cable formulas, $V=V_m-V_{rest}$. Positive injected current depolarizes, and positive ionic current is outward."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 5, PDF page 3. Equivalent circuits and progressive simplification from branching dendrite to cylinder. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 5, PDF page 3. Equivalent circuits and progressive simplification from branching dendrite to cylinder. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L05/models.webp', import.meta.url).href,
              "alt": "Lecture 5, PDF page 3. Equivalent circuits and progressive simplification from branching dendrite to cylinder. Original labels, axes and scale bars retained.",
              "aspect": 0.5477741585233442,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [],
      "conceptQuiz": [
        {
          "id": "L05-overview-check",
          "practice": "extra",
          "prompt": "What does a useful cellular model preserve?",
          "correct": 0,
          "options": [
            {
              "text": "The electrical behavior under study",
              "feedback": "Correct. Model simplifications should retain the behavior being investigated."
            },
            {
              "text": "Every anatomical detail of the cell",
              "feedback": "Anatomical detail can be removed when it is unnecessary for the electrical question."
            }
          ],
          "hints": [
            {
              "body": "Recall the distinction illustrated in this source figure."
            },
            {
              "body": "Separate the controlled condition from the outcome in the prompt."
            }
          ],
          "modelAnswer": [
            "The electrical behavior under study."
          ]
        },
        {
          "id": "L05-overview-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L05 PDF 1",
          "prompt": "Which feature is discarded when a spatial cell model becomes one compartment?",
          "correct": 0,
          "options": [
            {
              "text": "Spatial voltage variation",
              "feedback": "Correct. One compartment assigns a single voltage to the cell."
            },
            {
              "text": "Membrane charge storage",
              "feedback": "A lumped RC model still represents membrane capacitance."
            },
            {
              "text": "Membrane leak currents",
              "feedback": "A lumped RC model still includes membrane resistance."
            }
          ],
          "hints": [{ "body": "Compare what the one-compartment model can describe across space and across time." }],
          "modelAnswer": [
            "One compartment assigns a single voltage to the cell."
          ]
        }
      ],
      "part": {
        "id": "models",
        "number": 1,
        "title": "Cellular models"
      }
    },
    {
      "id": "functional",
      "title": "Model functions",
      "keyTerms": [
        "conductance"
      ],
      "source": "L05 PDF 2",
      "blocks": [
        {
          "type": "text",
          "body": ["Use $I_i=g_i(V_m-E_i)$ for an Ohmic ionic current. Add capacitance for charging and axial resistance for spatial spread. GHK relates voltage and current to concentrations and permeabilities. HH adds voltage-dependent gating to explain spikes."]
        },
        {
          "type": "optionalInfo",
          "title": "Source figure and context",
          "blocks": [
            { "type": "text", "body": "A linear cable combines Ohmic membrane leak with axial current. The core conductor model also allows the extracellular path to contribute resistance." },
            {
              "type": "figure",
              "visual": {
                "type": "widget",
                "name": "image-hotspots",
                "caption": "Lecture 5, PDF page 3. Equivalent circuits and progressive simplification from branching dendrite to cylinder. Original labels, axes and scale bars retained.",
                "fallbackAlt": "Lecture 5, PDF page 3. Equivalent circuits and progressive simplification from branching dendrite to cylinder. Original labels, axes and scale bars retained.",
                "props": {
                  "src": new URL('../../assets/figures/nbe-e4120/L05/models.webp', import.meta.url).href,
                  "alt": "Lecture 5, PDF page 3. Equivalent circuits and progressive simplification from branching dendrite to cylinder. Original labels, axes and scale bars retained.",
                  "aspect": 0.5477741585233442,
                  "quiz": false,
                  "layout": "stack",
                  "regions": []
                }
              }
            }
          ]
        }
      ],
      "formulas": [
        {
          "id": "L05-f-ionic",
          "name": "Ionic driving-force current",
          "tex": "I_i=g_i(V_m-E_i)",
          "symbols": [
            {
              "tex": "I_i",
              "name": "Outward ionic current",
              "unit": "A",
              "meaning": "Outward ionic current in the stated model."
            },
            {
              "tex": "g_i",
              "name": "Ionic conductance",
              "unit": "S",
              "meaning": "Ionic conductance in the stated model."
            },
            {
              "tex": "V_m",
              "name": "Membrane voltage",
              "unit": "V",
              "meaning": "Membrane voltage in the stated model."
            },
            {
              "tex": "E_i",
              "name": "Reversal voltage",
              "unit": "V",
              "meaning": "Reversal voltage in the stated model."
            }
          ],
          "reads": "Current follows conductance times signed driving force.",
          "assumes": "Ohmic channel with fixed conductance and reversal.",
          "variants": [],
          "drill": {
            "prompt": "Use $g_i=2\\times10^{-9}\\,\\mathrm{S}$ and $V_m-E_i=-0.03\\,\\mathrm{V}$. Find outward current.",
            "answer": {
              "value": -6e-11,
              "unit": "A",
              "tolerance": 1.8e-13,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 2e-09,
                  "b": -0.03
                },
                "displayScale": 1
              }
            },
            "tex": "I_i=(2\\times10^{-9}\\,\\mathrm{S})(-0.03\\,\\mathrm{V})",
            "modelAnswer": [
              "Current follows conductance times signed driving force."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $I_i=g_i(V_m-E_i)$."
              },
              {
                "body": "Start with $I_i=(2\\times10^{-9}\\,\\mathrm{S})(-0.03\\,\\mathrm{V})$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{I_i}=\\htmlClass{formula-term-1}{g_i}(\\htmlClass{formula-term-2}{V_m}-\\htmlClass{formula-term-3}{E_i})"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L05-functional-check",
          "prompt": "Which model explicitly represents passive spatial spread?",
          "correct": 1,
          "options": [
            {
              "text": "The lumped RC model of a whole cell",
              "feedback": "One lumped RC compartment captures temporal charging, not spatial voltage variation."
            },
            {
              "text": "The cable model of dendrites and axons",
              "feedback": "Correct. A cable retains longitudinal current and voltage variation with position."
            }
          ],
          "hints": [
            {
              "body": "Recall the distinction illustrated in this source figure."
            },
            {
              "body": "Separate the controlled condition from the outcome in the prompt."
            }
          ],
          "modelAnswer": [
            "The cable model of dendrites and axons."
          ]
        },
        {
          "id": "L05-functional-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L05 PDF 2",
          "prompt": "Which model feature represents membrane charge storage?",
          "correct": 1,
          "options": [
            {
              "text": "An ionic reversal voltage",
              "feedback": "Reversal voltage sets the zero-current voltage for an ion."
            },
            {
              "text": "A membrane capacitance",
              "feedback": "Correct. Capacitance stores charge and introduces time dependence."
            },
            {
              "text": "An axial resistance",
              "feedback": "Axial resistance represents longitudinal current flow."
            }
          ],
          "hints": [{ "body": "Think of the circuit element whose charge depends on voltage." }],
          "modelAnswer": [
            "Capacitance stores charge and introduces time dependence."
          ]
        }
      ]
    },
    {
      "id": "structure",
      "title": "Model geometry",
      "keyTerms": [
        "isopotential",
        "compartment"
      ],
      "source": "L05 PDF 3",
      "blocks": [
        {
          "type": "text",
          "body": ["Ball-and-stick models separate soma and dendrite. A cable distributes membrane leak and capacitance along its length. Coupled isopotential compartments approximate that cable, allowing a separate voltage at each location."]
        },
        {
          "type": "optionalInfo",
          "title": "Source figure and context",
          "blocks": [
            { "type": "text", "body": "Source diagram for this model." },
            {
              "type": "figure",
              "visual": {
                "type": "widget",
                "name": "image-hotspots",
                "caption": "Lecture 5, PDF page 3. Equivalent circuits and progressive simplification from branching dendrite to cylinder. Original labels, axes and scale bars retained.",
                "fallbackAlt": "Lecture 5, PDF page 3. Equivalent circuits and progressive simplification from branching dendrite to cylinder. Original labels, axes and scale bars retained.",
                "props": {
                  "src": new URL('../../assets/figures/nbe-e4120/L05/models.webp', import.meta.url).href,
                  "alt": "Lecture 5, PDF page 3. Equivalent circuits and progressive simplification from branching dendrite to cylinder. Original labels, axes and scale bars retained.",
                  "aspect": 0.5477741585233442,
                  "quiz": false,
                  "layout": "stack",
                  "regions": []
                }
              }
            }
          ]
        }
      ],
      "formulas": [],
      "conceptQuiz": [
        {
          "id": "L05-structure-check",
          "practice": "extra",
          "prompt": "What couples adjacent electrical compartments?",
          "correct": 0,
          "options": [
            {
              "text": "A resistive path for longitudinal current",
              "feedback": "Correct. Axial resistance carries longitudinal current between compartment voltages."
            },
            {
              "text": "A capacitive path for longitudinal current",
              "feedback": "Membrane capacitance stores local charge; it is not the axial resistive connection."
            }
          ],
          "hints": [
            {
              "body": "Recall the distinction illustrated in this source figure."
            },
            {
              "body": "Separate the controlled condition from the outcome in the prompt."
            }
          ],
          "modelAnswer": [
            "A resistive path for longitudinal current."
          ]
        },
        {
          "id": "L05-structure-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L05 PDF 3",
          "prompt": "What does a ball-and-stick representation separate?",
          "correct": 2,
          "options": [
            {
              "text": "A soma and a transmitter vesicle",
              "feedback": "Vesicle release is not the structural division in ball-and-stick."
            },
            {
              "text": "A dendrite and a receptor molecule",
              "feedback": "Ball-and-stick separates cellular regions, not receptor components."
            },
            {
              "text": "A soma and an elongated dendrite",
              "feedback": "Correct. The ball represents soma and the stick represents dendrite."
            }
          ],
          "hints": [{ "body": "Relate the two geometric shapes to parts of a neuron." }],
          "modelAnswer": [
            "The ball represents soma and the stick represents dendrite."
          ]
        }
      ]
    },
    {
      "id": "lumped",
      "title": "Lumped cells",
      "keyTerms": [],
      "source": "L05 PDF 4",
      "blocks": [
        {
          "type": "text",
          "body": ["Inject current and record at two intracellular sites. Matching aligned traces support an isopotential approximation for that stimulus and timescale. Matching plateaus alone establish agreement only at steady state."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 5, PDF page 4. Paramecium injection and matching recordings at two intracellular sites. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 5, PDF page 4. Paramecium injection and matching recordings at two intracellular sites. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L05/lumped.webp', import.meta.url).href,
              "alt": "Lecture 5, PDF page 4. Paramecium injection and matching recordings at two intracellular sites. Original labels, axes and scale bars retained.",
              "aspect": 1.1317567567567568,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [],
      "conceptQuiz": [
        {
          "id": "L05-lumped-check",
          "prompt": "Which observation supports an isopotential approximation?",
          "correct": 1,
          "options": [
            {
              "text": "Two sites have different voltage responses",
              "feedback": "Different responses show that one voltage cannot describe both sites under these conditions."
            },
            {
              "text": "Two sites have matching voltage responses",
              "feedback": "Correct. Matching traces support the approximation for the tested sites and stimulus."
            }
          ],
          "hints": [
            {
              "body": "Recall the distinction illustrated in this source figure."
            },
            {
              "body": "Separate the controlled condition from the outcome in the prompt."
            }
          ],
          "modelAnswer": [
            "Two sites have matching voltage responses."
          ]
        },
        {
          "id": "L05-lumped-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L05 PDF 4",
          "prompt": "In a lumped electrical model, how many voltages describe the cell at one instant?",
          "correct": 0,
          "options": [
            {
              "text": "One voltage for the whole cell",
              "feedback": "Correct. The isopotential approximation uses one cell voltage."
            },
            {
              "text": "One voltage for each branch",
              "feedback": "Separate branch voltages require a spatial representation."
            },
            {
              "text": "One voltage for each membrane patch",
              "feedback": "Separate patch voltages belong to a distributed representation."
            }
          ],
          "hints": [{ "body": "Recall what an isopotential interior implies for two recording sites." }],
          "modelAnswer": [
            "The isopotential approximation uses one cell voltage."
          ]
        }
      ]
    },
    {
      "id": "distributed",
      "title": "Distributed cables",
      "keyTerms": [],
      "source": "L05 PDF 5",
      "blocks": [
        {
          "type": "text",
          "body": ["In the frog recording, greater stimulus-to-electrode distance gives a smaller, later response. A distributed cable preserves this spatial variation. Compare traces with the stimulus held fixed."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 5, PDF page 5. Frog muscle voltage traces at increasing distances from localized stimulation. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 5, PDF page 5. Frog muscle voltage traces at increasing distances from localized stimulation. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L05/distributed.webp', import.meta.url).href,
              "alt": "Lecture 5, PDF page 5. Frog muscle voltage traces at increasing distances from localized stimulation. Original labels, axes and scale bars retained.",
              "aspect": 1.6674259681093395,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [],
      "conceptQuiz": [
        {
          "id": "L05-distributed-check",
          "prompt": "What changes with increasing distance in this panel?",
          "correct": 0,
          "options": [
            {
              "text": "Amplitude falls while response delay grows",
              "feedback": "Correct. More distant source traces are smaller and later."
            },
            {
              "text": "Amplitude grows while response delay falls",
              "feedback": "Passive transfer attenuates and delays the response rather than enlarging and advancing it."
            }
          ],
          "hints": [
            {
              "body": "Recall the distinction illustrated in this source figure."
            },
            {
              "body": "Separate the controlled condition from the outcome in the prompt."
            }
          ],
          "modelAnswer": [
            "Amplitude falls while response delay grows."
          ]
        },
        {
          "id": "L05-distributed-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L05 PDF 5",
          "prompt": "Which feature distinguishes a distributed model from one lumped compartment?",
          "correct": 1,
          "options": [
            {
              "text": "Voltage stays equal at all sites",
              "feedback": "Equal voltage everywhere is the lumped approximation."
            },
            {
              "text": "Voltage varies along the cell",
              "feedback": "Correct. A distributed model retains spatial voltage variation."
            },
            {
              "text": "Voltage varies only with time",
              "feedback": "Time dependence alone is already possible in one RC compartment."
            }
          ],
          "hints": [{ "body": "Ask whether recordings at two positions can have different voltages." }],
          "modelAnswer": [
            "A distributed model retains spatial voltage variation."
          ]
        }
      ]
    },
    {
      "id": "one",
      "title": "One compartment",
      "keyTerms": [
        "compartment"
      ],
      "source": "L05 PDF 6",
      "blocks": [
        {
          "type": "text",
          "body": ["For a passive compartment, $I=C\\,dV/dt+V/R$, with whole-compartment $R$ and $C$. From rest a constant current step gives $V(t)=IR(1-e^{-t/(RC)})$. After switch-off, $V(t)=V_0e^{-t/(RC)}$, where $V_0$ is the increment at switch-off. One compartment filters in time and has a single voltage throughout."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 5, PDF page 6. Charging and discharging voltage, capacitive current and leak current versus normalized time. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 5, PDF page 6. Charging and discharging voltage, capacitive current and leak current versus normalized time. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L05/one.webp', import.meta.url).href,
              "alt": "Lecture 5, PDF page 6. Charging and discharging voltage, capacitive current and leak current versus normalized time. Original labels, axes and scale bars retained.",
              "aspect": 1.2762148337595909,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L05-f-balance",
          "name": "One-compartment current balance",
          "tex": "\\frac{dV}{dt}=\\frac{I-V/R}{C}",
          "symbols": [
            {
              "tex": "dV/dt",
              "name": "Voltage slope",
              "unit": "V/s",
              "meaning": "Voltage slope in the stated model."
            },
            {
              "tex": "I",
              "name": "Supplied current",
              "unit": "A",
              "meaning": "Supplied current in the stated model."
            },
            {
              "tex": "V",
              "name": "Rest-relative voltage",
              "unit": "V",
              "meaning": "Rest-relative voltage in the stated model."
            },
            {
              "tex": "R",
              "name": "Whole-compartment resistance",
              "unit": "ohm",
              "meaning": "Whole-compartment resistance in the stated model."
            },
            {
              "tex": "C",
              "name": "Whole-compartment capacitance",
              "unit": "F",
              "meaning": "Whole-compartment capacitance in the stated model."
            }
          ],
          "reads": "Supplied current not carried by leak charges the capacitance.",
          "assumes": "Passive isopotential compartment, rest-relative voltage.",
          "variants": [],
          "drill": {
            "prompt": "After subtracting leak from supplied current, $20\\,\\mathrm{pA}$ remains. With $C=10\\,\\mathrm{pF}$ find $dV/dt$.",
            "answer": {
              "value": 2.0,
              "unit": "V/s",
              "tolerance": 0.006,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 2e-11,
                  "b": 1e-11
                },
                "displayScale": 1
              }
            },
            "tex": "dV/dt=(20\\times10^{-12}\\,\\mathrm{A})/(10\\times10^{-12}\\,\\mathrm{F})",
            "modelAnswer": [
              "Supplied current not carried by leak charges the capacitance."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\frac{dV}{dt}=\\frac{I-V/R}{C}$."
              },
              {
                "body": "Start with $dV/dt=(20\\times10^{-12}\\,\\mathrm{A})/(10\\times10^{-12}\\,\\mathrm{F})$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\frac{d\\htmlClass{formula-term-2}{V}}{dt}=\\frac{\\htmlClass{formula-term-1}{I}-\\htmlClass{formula-term-2}{V}/\\htmlClass{formula-term-3}{R}}{\\htmlClass{formula-term-4}{C}}"
        },
        {
          "id": "L05-f-charging",
          "name": "Passive charging",
          "tex": "V(t)=IR(1-e^{-t/(RC)})",
          "symbols": [
            {
              "tex": "V(t)",
              "name": "Voltage increment",
              "unit": "V",
              "meaning": "Voltage increment in the stated model."
            },
            {
              "tex": "I",
              "name": "Step current",
              "unit": "A",
              "meaning": "Step current in the stated model."
            },
            {
              "tex": "R",
              "name": "Resistance",
              "unit": "ohm",
              "meaning": "Resistance in the stated model."
            },
            {
              "tex": "C",
              "name": "Capacitance",
              "unit": "F",
              "meaning": "Capacitance in the stated model."
            },
            {
              "tex": "t",
              "name": "Elapsed time",
              "unit": "s",
              "meaning": "Elapsed time in the stated model."
            }
          ],
          "reads": "Voltage approaches the steady current-resistance product.",
          "assumes": "Resting initial condition, constant passive step current.",
          "variants": [],
          "drill": {
            "prompt": "Use $I=5\\times10^{-11}\\,\\mathrm{A}$, $R=10^8\\,\\Omega$, $C=10^{-10}\\,\\mathrm{F}$ and $t=0.01\\,\\mathrm{s}$. Find voltage increment.",
            "answer": {
              "value": 0.003160602794142788,
              "unit": "V",
              "tolerance": 9.481808382428365e-06,
              "verification": {
                "relation": "charging",
                "inputs": {
                  "i": 5e-11,
                  "r": 100000000.0,
                  "c": 1e-10,
                  "t": 0.01
                },
                "displayScale": 1
              }
            },
            "tex": "V=(50\\times10^{-12}\\,\\mathrm{A})(10^8\\,\\Omega)(1-e^{-1})",
            "modelAnswer": [
              "Voltage approaches the steady current-resistance product."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $V(t)=IR(1-e^{-t/(RC)})$."
              },
              {
                "body": "Start with $V=(50\\times10^{-12}\\,\\mathrm{A})(10^8\\,\\Omega)(1-e^{-1})$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{V(t)}=\\htmlClass{formula-term-1}{I}\\htmlClass{formula-term-2}{R}(1-e^{-\\htmlClass{formula-term-4}{t}/(\\htmlClass{formula-term-2}{R}\\htmlClass{formula-term-3}{C})})"
        },
        {
          "id": "L05-f-decay",
          "name": "Passive discharge",
          "tex": "V(t)=V_0e^{-t/\\tau_m}",
          "symbols": [
            {
              "tex": "V(t)",
              "name": "Remaining voltage",
              "unit": "V",
              "meaning": "Remaining voltage in the stated model."
            },
            {
              "tex": "V_0",
              "name": "Initial voltage",
              "unit": "V",
              "meaning": "Initial voltage in the stated model."
            },
            {
              "tex": "t",
              "name": "Elapsed time",
              "unit": "s",
              "meaning": "Elapsed time in the stated model."
            },
            {
              "tex": "\\tau_m",
              "name": "Time constant",
              "unit": "s",
              "meaning": "Time constant in the stated model."
            }
          ],
          "reads": "After input ends, passive voltage relaxes toward rest.",
          "assumes": "Isopotential passive compartment; no continuing input.",
          "variants": [],
          "drill": {
            "prompt": "Use $V_0=-0.004\\,\\mathrm{V}$, $t=0.02\\,\\mathrm{s}$ and $\\tau_m=0.01\\,\\mathrm{s}$. Find the signed increment.",
            "answer": {
              "value": -0.0005413411329464508,
              "unit": "V",
              "tolerance": 1.6240233988393525e-06,
              "verification": {
                "relation": "passiveDecay",
                "inputs": {
                  "v": -0.004,
                  "time": 0.02,
                  "tau": 0.01
                },
                "displayScale": 1
              }
            },
            "tex": "V=(-0.004\\,\\mathrm{V})e^{-2}",
            "modelAnswer": [
              "After input ends, passive voltage relaxes toward rest."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $V(t)=V_0e^{-t/\\tau_m}$."
              },
              {
                "body": "Start with $V=(-0.004\\,\\mathrm{V})e^{-2}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{V(t)}=\\htmlClass{formula-term-1}{V_0}e^{-\\htmlClass{formula-term-2}{t}/\\htmlClass{formula-term-3}{\\tau_m}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L05-one-check",
          "practice": "extra",
          "prompt": "Which current vanishes at a constant voltage?",
          "correct": 1,
          "options": [
            {
              "text": "The current leaking through membrane resistance",
              "feedback": "A constant voltage increment can still drive steady leak through membrane resistance."
            },
            {
              "text": "The current charging membrane capacitance",
              "feedback": "Correct. Capacitive current depends on voltage changing with time."
            }
          ],
          "hints": [
            {
              "body": "Recall the distinction illustrated in this source figure."
            },
            {
              "body": "Separate the controlled condition from the outcome in the prompt."
            }
          ],
          "modelAnswer": [
            "The current charging membrane capacitance."
          ]
        },
        {
          "id": "L05-one-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L05 PDF 6",
          "prompt": "After a passive current pulse ends, where does the rest-relative voltage relax?",
          "correct": 2,
          "options": [
            {
              "text": "Toward its pulse plateau",
              "feedback": "The plateau requires continued supplied current."
            },
            {
              "text": "Toward its spike threshold",
              "feedback": "Passive relaxation returns toward rest, not toward an active threshold."
            },
            {
              "text": "Toward its zero baseline",
              "feedback": "Correct. The passive voltage increment decays toward zero after switch-off."
            }
          ],
          "hints": [{ "body": "The voltage in the question is measured relative to rest." }],
          "modelAnswer": [
            "The passive voltage increment decays toward zero after switch-off."
          ]
        }
      ]
    },
    {
      "id": "two",
      "title": "Two coupled compartments",
      "keyTerms": [
        "conductance",
        "compartment"
      ],
      "source": "L05 PDF 7",
      "blocks": [
        {
          "type": "text",
          "body": ["Current into A divides between charging, leak and flow to B, with $I_{A\\to B}=(V_A-V_B)/R_{axial}$. B also charges and leaks, broadening and delaying a transient. At steady state, capacitive current vanishes and axial current can persist. Keep conductances fixed for an ideal passive current step."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 5, PDF page 7. Adjacent membrane compartments linked by axial resistance, with local leak and capacitance. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 5, PDF page 7. Adjacent membrane compartments linked by axial resistance, with local leak and capacitance. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L05/two.webp', import.meta.url).href,
              "alt": "Lecture 5, PDF page 7. Adjacent membrane compartments linked by axial resistance, with local leak and capacitance. Original labels, axes and scale bars retained.",
              "aspect": 2.2556818181818183,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [],
      "conceptQuiz": [
        {
          "id": "L05-two-check",
          "prompt": "Which condition changes local membrane resistance?",
          "correct": 0,
          "options": [
            {
              "text": "A specified increase in channel conductance",
              "feedback": "Correct. Increasing conductance lowers the reciprocal membrane resistance."
            },
            {
              "text": "A prescribed current with channels unchanged",
              "feedback": "An ideal prescribed current does not itself change fixed passive channel conductances."
            }
          ],
          "hints": [
            {
              "body": "Recall the distinction illustrated in this source figure."
            },
            {
              "body": "Separate the controlled condition from the outcome in the prompt."
            }
          ],
          "modelAnswer": [
            "A specified increase in channel conductance."
          ]
        },
        {
          "id": "L05-two-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L05 PDF 7",
          "prompt": "What directly drives axial current between two compartments?",
          "correct": 0,
          "options": [
            {
              "text": "Their voltage difference",
              "feedback": "Correct. Axial current follows the voltage difference across axial resistance."
            },
            {
              "text": "Their capacitance difference",
              "feedback": "Capacitances shape voltage dynamics but their difference does not drive axial current."
            },
            {
              "text": "Their membrane area difference",
              "feedback": "Area affects electrical parameters; axial current is driven by voltage difference."
            }
          ],
          "hints": [{ "body": "Apply Ohm’s law to the resistor linking the compartments." }],
          "modelAnswer": [
            "Axial current follows the voltage difference across axial resistance."
          ]
        }
      ]
    },
    {
      "id": "chemical",
      "title": "Chemical transmission",
      "keyTerms": [],
      "source": "L05 PDF 9",
      "blocks": [
        {
          "type": "relevantVideo",
          "videoId": "XYwl7xpyu2o",
          "title": "Electrical vs Chemical Synapse Explained (Gap Junctions) | Clip",
          "topic": "Gap-junction current, vesicle release and postsynaptic receptors",
          "channel": "Science With Tal"
        },
        {
          "type": "text",
          "body": ["Electrical synapses pass current directly through gap junctions. In chemical transmission, a presynaptic spike opens calcium channels. Calcium entry triggers vesicle fusion, then transmitter crosses the cleft and binds postsynaptic receptors. Receptor activation changes postsynaptic current and produces a graded voltage response."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 5, PDF page 9. Sequence from presynaptic spike through release and receptor activation to postsynaptic response. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 5, PDF page 9. Sequence from presynaptic spike through release and receptor activation to postsynaptic response. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L05/transmission.webp', import.meta.url).href,
              "alt": "Lecture 5, PDF page 9. Sequence from presynaptic spike through release and receptor activation to postsynaptic response. Original labels, axes and scale bars retained.",
              "aspect": 0.35805626598465473,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [],
      "conceptQuiz": [
        {
          "id": "L05-chemical-check",
          "practice": "extra",
          "prompt": "What crosses the synaptic cleft in this sequence?",
          "correct": 1,
          "options": [
            {
              "text": "Presynaptic calcium flows into receptors",
              "feedback": "Calcium enters the presynaptic terminal; transmitter carries the signal across the cleft."
            },
            {
              "text": "Released transmitter binds to receptors",
              "feedback": "Correct. Released transmitter crosses the cleft and binds postsynaptic receptors."
            }
          ],
          "hints": [
            {
              "body": "Recall the distinction illustrated in this source figure."
            },
            {
              "body": "Separate the controlled condition from the outcome in the prompt."
            }
          ],
          "modelAnswer": [
            "Released transmitter binds to receptors."
          ]
        },
        {
          "id": "L05-chemical-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L05 PDF 9",
          "prompt": "What triggers vesicle release in the taught chemical transmission sequence?",
          "correct": 1,
          "options": [
            {
              "text": "Sodium entering the postsynaptic membrane",
              "feedback": "Postsynaptic ion flow occurs downstream of transmitter release."
            },
            {
              "text": "Calcium entering the presynaptic terminal",
              "feedback": "Correct. Presynaptic calcium entry triggers transmitter release."
            },
            {
              "text": "Transmitter entering the postsynaptic cell",
              "feedback": "Transmitter binds receptors after release; it does not trigger presynaptic release this way."
            }
          ],
          "hints": [{ "body": "Follow the events immediately after the presynaptic spike." }],
          "modelAnswer": [
            "Presynaptic calcium entry triggers transmitter release."
          ]
        }
      ],
      "part": {
        "id": "integration",
        "number": 2,
        "title": "Dendritic integration and Rall reduction"
      }
    },
    {
      "id": "receptors",
      "title": "Receptors and quantal events",
      "keyTerms": [
        "ionotropic",
        "metabotropic"
      ],
      "source": "L05 PDF 10",
      "blocks": [
        {
          "type": "text",
          "body": ["Ionotropic receptors are ligand-gated channels. Metabotropic receptors act via intracellular intermediates. Release of one vesicle can produce a miniature graded response, and multiple quanta contribute to a compound response. Reversal potential relative to voltage sets current direction. Assess excitation or inhibition by the effect on reaching spike threshold."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 5, PDF page 10. Ligand-gated channels compared with receptor signaling through intermediates. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 5, PDF page 10. Ligand-gated channels compared with receptor signaling through intermediates. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L05/receptors.webp', import.meta.url).href,
              "alt": "Lecture 5, PDF page 10. Ligand-gated channels compared with receptor signaling through intermediates. Original labels, axes and scale bars retained.",
              "aspect": 0.48549019607843136,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [],
      "conceptQuiz": [
        {
          "id": "L05-receptors-check",
          "prompt": "Which receptor directly gates an ion channel?",
          "correct": 0,
          "options": [
            {
              "text": "An ionotropic postsynaptic receptor",
              "feedback": "Correct. An ionotropic receptor is itself a ligand-gated ion channel."
            },
            {
              "text": "A metabotropic postsynaptic receptor",
              "feedback": "Metabotropic receptors signal through intermediate molecules rather than directly forming the gated pore."
            }
          ],
          "hints": [
            {
              "body": "Recall the distinction illustrated in this source figure."
            },
            {
              "body": "Separate the controlled condition from the outcome in the prompt."
            }
          ],
          "modelAnswer": [
            "An ionotropic postsynaptic receptor."
          ]
        },
        {
          "id": "L05-receptors-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L05 PDF 10",
          "prompt": "What is the release unit associated with a miniature postsynaptic potential?",
          "correct": 2,
          "options": [
            {
              "text": "Release from all terminal vesicles",
              "feedback": "Multiple release events contribute to a compound response."
            },
            {
              "text": "Release from every nearby terminal",
              "feedback": "A miniature event does not require coordinated release across terminals."
            },
            {
              "text": "Release from one transmitter vesicle",
              "feedback": "Correct. One released vesicle produces a miniature postsynaptic event."
            }
          ],
          "hints": [{ "body": "Identify the discrete object that fuses with the presynaptic membrane." }],
          "modelAnswer": [
            "One released vesicle produces a miniature postsynaptic event."
          ]
        }
      ]
    },
    {
      "id": "graded",
      "title": "Graded integration",
      "keyTerms": [],
      "source": "L05 PDF 11",
      "blocks": [
        {
          "type": "text",
          "body": ["Dendritic inputs generate local graded potentials. Geometry and membrane properties filter their spread, and overlapping responses can bring the axon initial segment to threshold. Add small passive responses at the same place and time. Axonal spikes regenerate through active conductances."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 5, PDF page 11. Passive dendritic integration followed by threshold-dependent axonal spike generation. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 5, PDF page 11. Passive dendritic integration followed by threshold-dependent axonal spike generation. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L05/graded.webp', import.meta.url).href,
              "alt": "Lecture 5, PDF page 11. Passive dendritic integration followed by threshold-dependent axonal spike generation. Original labels, axes and scale bars retained.",
              "aspect": 1.9400544959128065,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [],
      "conceptQuiz": [
        {
          "id": "L05-graded-check",
          "practice": "extra",
          "prompt": "Where can summed input initiate an axonal spike?",
          "correct": 1,
          "options": [
            {
              "text": "At every dendritic site after transmitter",
              "feedback": "A local graded potential need not reach threshold or initiate a spike at that site."
            },
            {
              "text": "At the axonal trigger region after threshold",
              "feedback": "Correct. Summed depolarization can initiate an axonal spike when the trigger region reaches threshold."
            }
          ],
          "hints": [
            {
              "body": "Recall the distinction illustrated in this source figure."
            },
            {
              "body": "Separate the controlled condition from the outcome in the prompt."
            }
          ],
          "modelAnswer": [
            "At the axonal trigger region after threshold."
          ]
        },
        {
          "id": "L05-graded-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L05 PDF 11",
          "prompt": "Which description fits a passive postsynaptic potential?",
          "correct": 0,
          "options": [
            {
              "text": "A graded response filtered during spread",
              "feedback": "Correct. Passive membrane and geometry attenuate and filter the response."
            },
            {
              "text": "A fixed spike regenerated during spread",
              "feedback": "Regeneration describes an active spike, not a passive graded potential."
            },
            {
              "text": "A fixed voltage clamped throughout the cell",
              "feedback": "A local postsynaptic input does not clamp the whole cell voltage."
            }
          ],
          "hints": [{ "body": "Follow a subthreshold signal as it spreads through a dendrite." }],
          "modelAnswer": [
            "Passive membrane and geometry attenuate and filter the response."
          ]
        }
      ]
    },
    {
      "id": "dendritic",
      "title": "Dendritic spikes",
      "keyTerms": [
        "dendritic"
      ],
      "source": "L05 PDF 12–13",
      "blocks": [
        {
          "type": "text",
          "body": ["Strong local input can recruit voltage-gated sodium or calcium channels and generate a dendritic spike. Potassium conductances shape excitability. The spike may stay local or help trigger axonal firing."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 5, PDF page 13. Source sodium/calcium local spike diagrams; additional labeled NMDA detail is reference-only here. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 5, PDF page 13. Source sodium/calcium local spike diagrams; additional labeled NMDA detail is reference-only here. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L05/local.webp', import.meta.url).href,
              "alt": "Lecture 5, PDF page 13. Source sodium/calcium local spike diagrams; additional labeled NMDA detail is reference-only here. Original labels, axes and scale bars retained.",
              "aspect": 1.058,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [],
      "conceptQuiz": [
        {
          "id": "L05-dendritic-check",
          "prompt": "Must a local dendritic spike reach the soma?",
          "correct": 0,
          "options": [
            {
              "text": "No, local active events can fail to propagate",
              "feedback": "Correct. A local regenerative dendritic event need not reach the soma."
            },
            {
              "text": "Yes, local active events always propagate",
              "feedback": "Local dendritic regeneration does not guarantee propagation to the soma or an axonal output spike."
            }
          ],
          "hints": [
            {
              "body": "Recall the distinction illustrated in this source figure."
            },
            {
              "body": "Separate the controlled condition from the outcome in the prompt."
            }
          ],
          "modelAnswer": [
            "No, local active events can fail to propagate."
          ]
        },
        {
          "id": "L05-dendritic-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L05 PDF 12–13",
          "prompt": "Which feature distinguishes a local dendritic spike from passive spread?",
          "correct": 1,
          "options": [
            {
              "text": "Flow through axial resistance alone",
              "feedback": "Axial current also carries passive voltage spread."
            },
            {
              "text": "Recruitment of voltage-gated channels",
              "feedback": "Correct. Voltage-gated channels provide the local regenerative response."
            },
            {
              "text": "Charging of membrane capacitance alone",
              "feedback": "Capacitive charging also occurs during passive responses."
            }
          ],
          "hints": [{ "body": "Ask what lets a local depolarization recruit additional inward current." }],
          "modelAnswer": [
            "Voltage-gated channels provide the local regenerative response."
          ]
        }
      ]
    },
    {
      "id": "backprop",
      "title": "Backpropagation",
      "keyTerms": [
        "dendritic"
      ],
      "source": "L05 PDF 14",
      "blocks": [
        {
          "type": "text",
          "body": ["An axonally initiated spike can invade the soma and dendrites. Use aligned onset times at known recording sites to infer origin. Backpropagating spikes often weaken with distance because of passive spread and varying channel density."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 5, PDF page 14. Source axonal, somatic and dendritic traces and their recording positions. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 5, PDF page 14. Source axonal, somatic and dendritic traces and their recording positions. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L05/backprop.webp', import.meta.url).href,
              "alt": "Lecture 5, PDF page 14. Source axonal, somatic and dendritic traces and their recording positions. Original labels, axes and scale bars retained.",
              "aspect": 1.6573426573426573,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [],
      "conceptQuiz": [
        {
          "id": "L05-backprop-check",
          "prompt": "Where does a backpropagating action potential originate?",
          "correct": 1,
          "options": [
            {
              "text": "At a dendritic site before axonal invasion",
              "feedback": "A dendritically initiated event is a local dendritic spike, not an axon-origin backpropagating spike."
            },
            {
              "text": "At the axonal region before dendritic invasion",
              "feedback": "Correct. The axonal spike can invade the soma and dendrites afterward."
            }
          ],
          "hints": [
            {
              "body": "Recall the distinction illustrated in this source figure."
            },
            {
              "body": "Separate the controlled condition from the outcome in the prompt."
            }
          ],
          "modelAnswer": [
            "At the axonal region before dendritic invasion."
          ]
        },
        {
          "id": "L05-backprop-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L05 PDF 14",
          "prompt": "What typically happens to backpropagating spike amplitude farther along dendrites?",
          "correct": 2,
          "options": [
            {
              "text": "It grows with dendritic distance",
              "feedback": "The taught backpropagation example shows weakening rather than systematic growth."
            },
            {
              "text": "It stays fixed at the axonal amplitude",
              "feedback": "Dendritic invasion need not preserve axonal spike amplitude."
            },
            {
              "text": "It weakens with dendritic distance",
              "feedback": "Correct. Passive properties and channel distribution influence the weakening."
            }
          ],
          "hints": [{ "body": "Compare the peak at successive dendritic recording sites." }],
          "modelAnswer": [
            "Passive properties and channel distribution influence the weakening."
          ]
        }
      ]
    },
    {
      "id": "atype",
      "title": "A-type potassium current",
      "keyTerms": [
        "backpropagation",
        "dendritic"
      ],
      "source": "L05 PDF 15",
      "blocks": [
        {
          "type": "text",
          "body": ["Outward A-type potassium current can damp dendritic invasion and limit re-excitation. Reducing it can increase invasion, with the outcome also depending on geometry and other conductances."]
        },
        {
          "type": "optionalInfo",
          "title": "Source figure and context",
          "blocks": [
            { "type": "text", "body": "The source illustrates an increasing density of A-type channels with dendritic distance. The distribution varies across cells." },
            {
              "type": "figure",
              "visual": {
                "type": "widget",
                "name": "image-hotspots",
                "caption": "Lecture 5, PDF page 15. Source compares passive integration, local dendritic initiation and axonal backpropagation. Original labels, axes and scale bars retained.",
                "fallbackAlt": "Lecture 5, PDF page 15. Source compares passive integration, local dendritic initiation and axonal backpropagation. Original labels, axes and scale bars retained.",
                "props": {
                  "src": new URL('../../assets/figures/nbe-e4120/L05/echo.webp', import.meta.url).href,
                  "alt": "Lecture 5, PDF page 15. Source compares passive integration, local dendritic initiation and axonal backpropagation. Original labels, axes and scale bars retained.",
                  "aspect": 0.7010968921389397,
                  "quiz": false,
                  "layout": "stack",
                  "regions": []
                }
              }
            }
          ]
        }
      ],
      "formulas": [],
      "conceptQuiz": [
        {
          "id": "L05-atype-check",
          "practice": "extra",
          "prompt": "Which direction is potassium current during repolarizing efflux?",
          "correct": 0,
          "options": [
            {
              "text": "Outward current under the course convention",
              "feedback": "Correct. Positive charge leaving the cell is outward-positive current."
            },
            {
              "text": "Inward current under the course convention",
              "feedback": "Potassium efflux carries positive charge outward, not inward."
            }
          ],
          "hints": [
            {
              "body": "Recall the distinction illustrated in this source figure."
            },
            {
              "body": "Separate the controlled condition from the outcome in the prompt."
            }
          ],
          "modelAnswer": [
            "Outward current under the course convention."
          ]
        },
        {
          "id": "L05-atype-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L05 PDF 15",
          "prompt": "What role do dendritic A-type potassium channels play in the taught example?",
          "correct": 0,
          "options": [
            {
              "text": "They damp backpropagating excitation",
              "feedback": "Correct. Outward potassium current opposes depolarization and limits repeated excitation."
            },
            {
              "text": "They regenerate backpropagating excitation",
              "feedback": "Regenerative inward currents and outward potassium damping have different roles."
            },
            {
              "text": "They initiate presynaptic vesicle release",
              "feedback": "Vesicle release is triggered by presynaptic calcium entry."
            }
          ],
          "hints": [{ "body": "Use the direction of potassium current in the source example." }],
          "modelAnswer": [
            "Outward potassium current opposes depolarization and limits repeated excitation."
          ]
        }
      ]
    },
    {
      "id": "morphology",
      "title": "Dendritic routes",
      "keyTerms": [
        "conductance"
      ],
      "source": "L05 PDF 16–17",
      "blocks": [
        {
          "type": "text",
          "body": ["Dendrites receive inputs across branching trees. To estimate somatic influence, follow the input-to-soma route and consider its electrical length and branch loads."]
        },
        {
          "type": "optionalInfo",
          "title": "Source figure and context",
          "blocks": [
            { "type": "text", "body": "The source compares several cell types to show how widely dendritic geometry varies." },
            {
              "type": "figure",
              "visual": {
                "type": "widget",
                "name": "image-hotspots",
                "caption": "Lecture 5, PDF page 16. Four neuronal dendritic morphologies with source scale bars. Original labels, axes and scale bars retained.",
                "fallbackAlt": "Lecture 5, PDF page 16. Four neuronal dendritic morphologies with source scale bars. Original labels, axes and scale bars retained.",
                "props": {
                  "src": new URL('../../assets/figures/nbe-e4120/L05/trees.webp', import.meta.url).href,
                  "alt": "Lecture 5, PDF page 16. Four neuronal dendritic morphologies with source scale bars. Original labels, axes and scale bars retained.",
                  "aspect": 1.0465116279069768,
                  "quiz": false,
                  "layout": "stack",
                  "regions": []
                }
              }
            }
          ]
        }
      ],
      "formulas": [],
      "conceptQuiz": [
        {
          "id": "L05-morphology-check",
          "prompt": "What initiates the local synaptic response?",
          "correct": 1,
          "options": [
            {
              "text": "An equal voltage imposed on every branch",
              "feedback": "A synapse changes conductance locally; it does not impose equal voltage across the tree."
            },
            {
              "text": "A local postsynaptic conductance change",
              "feedback": "Correct. Local receptor activation changes conductance and generates a spreading voltage response."
            }
          ],
          "hints": [
            {
              "body": "Recall the distinction illustrated in this source figure."
            },
            {
              "body": "Separate the controlled condition from the outcome in the prompt."
            }
          ],
          "modelAnswer": [
            "A local postsynaptic conductance change."
          ]
        },
        {
          "id": "L05-morphology-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L05 PDF 16–17",
          "prompt": "At common material properties, which dendritic segment has the shorter length constant?",
          "correct": 1,
          "options": [
            {
              "text": "The segment with greater physical length",
              "feedback": "Segment length does not itself set the local length constant."
            },
            {
              "text": "The segment with smaller diameter",
              "feedback": "Correct. The length constant increases with the square root of diameter."
            },
            {
              "text": "The segment with greater diameter",
              "feedback": "Greater diameter increases the length constant at fixed material properties."
            }
          ],
          "hints": [{ "body": "Keep material properties fixed and inspect diameter in the length-constant formula." }],
          "modelAnswer": [
            "The length constant increases with the square root of diameter."
          ]
        }
      ]
    },
    {
      "id": "equivalent",
      "title": "Equivalent cylinder",
      "keyTerms": [
        "dendritic"
      ],
      "source": "L05 PDF 18",
      "blocks": [
        {
          "type": "text",
          "body": ["Rall reduction replaces a tree with a cylinder connected to the lumped soma. It preserves the passive load under the matching conditions below and provides a tractable model for somatic integration."]
        },
        {
          "type": "optionalInfo",
          "title": "Source figure and context",
          "blocks": [
            { "type": "text", "body": "Historically, somatic microelectrode measurements motivated models of dendritic inputs that were difficult to measure directly." },
            {
              "type": "figure",
              "visual": {
                "type": "widget",
                "name": "image-hotspots",
                "caption": "Lecture 5, PDF page 18. Progressive neuronal simplification into a soma and equivalent dendritic cylinder. Original labels, axes and scale bars retained.",
                "fallbackAlt": "Lecture 5, PDF page 18. Progressive neuronal simplification into a soma and equivalent dendritic cylinder. Original labels, axes and scale bars retained.",
                "props": {
                  "src": new URL('../../assets/figures/nbe-e4120/L05/equivalent.webp', import.meta.url).href,
                  "alt": "Lecture 5, PDF page 18. Progressive neuronal simplification into a soma and equivalent dendritic cylinder. Original labels, axes and scale bars retained.",
                  "aspect": 1.9017341040462428,
                  "quiz": false,
                  "layout": "stack",
                  "regions": []
                }
              }
            }
          ]
        }
      ],
      "formulas": [],
      "conceptQuiz": [
        {
          "id": "L05-equivalent-check",
          "prompt": "What is replaced by an equivalent cylinder?",
          "correct": 0,
          "options": [
            {
              "text": "A dendritic tree satisfying model conditions",
              "feedback": "Correct. Equivalent-cylinder reduction requires the stated electrical and geometric conditions."
            },
            {
              "text": "Any neuron regardless of branch conditions",
              "feedback": "Tree anatomy alone does not guarantee matched branches or compatible terminal paths."
            }
          ],
          "hints": [
            {
              "body": "Recall the distinction illustrated in this source figure."
            },
            {
              "body": "Separate the controlled condition from the outcome in the prompt."
            }
          ],
          "modelAnswer": [
            "A dendritic tree satisfying model conditions."
          ]
        },
        {
          "id": "L05-equivalent-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L05 PDF 18",
          "prompt": "In the reduced ball-and-stick model, how is the soma represented?",
          "correct": 2,
          "options": [
            {
              "text": "As a second branching dendrite",
              "feedback": "The soma remains distinct from the reduced dendritic tree."
            },
            {
              "text": "As a semi-infinite continuation",
              "feedback": "Semi-infinite dendritic assumptions do not make the soma semi-infinite."
            },
            {
              "text": "As an isopotential compartment",
              "feedback": "Correct. A lumped soma is attached to the equivalent dendritic cylinder."
            }
          ],
          "hints": [{ "body": "Apply the isopotential assumption to the cell body." }],
          "modelAnswer": [
            "A lumped soma is attached to the equivalent dendritic cylinder."
          ]
        }
      ]
    },
    {
      "id": "distance",
      "title": "Somatic filtering",
      "keyTerms": [
        "compartment"
      ],
      "source": "L05 PDF 19",
      "blocks": [
        {
          "type": "text",
          "body": ["With recording fixed at compartment 1, equal model inputs at compartments 5 and 9 give smaller, later and broader somatic responses than input at 1. A small recorded peak can reflect filtering of a strong distal input."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 5, PDF page 19. Tree, compartment chain and somatic EPSP traces for inputs at different locations. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 5, PDF page 19. Tree, compartment chain and somatic EPSP traces for inputs at different locations. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L05/compartments.webp', import.meta.url).href,
              "alt": "Lecture 5, PDF page 19. Tree, compartment chain and somatic EPSP traces for inputs at different locations. Original labels, axes and scale bars retained.",
              "aspect": 0.7426829268292683,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [],
      "conceptQuiz": [
        {
          "id": "L05-distance-check",
          "prompt": "Which site is the fixed recording location?",
          "correct": 1,
          "options": [
            {
              "text": "Compartment nine, representing the tip",
              "feedback": "Compartment nine is a distal input location, not the fixed somatic recording site."
            },
            {
              "text": "Compartment one, representing the soma",
              "feedback": "Correct. The panel records at compartment one while input location changes."
            }
          ],
          "hints": [
            {
              "body": "Recall the distinction illustrated in this source figure."
            },
            {
              "body": "Separate the controlled condition from the outcome in the prompt."
            }
          ],
          "modelAnswer": [
            "Compartment one, representing the soma."
          ]
        },
        {
          "id": "L05-distance-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L05 PDF 19",
          "prompt": "What is varied across the compartment-response comparisons?",
          "correct": 0,
          "options": [
            {
              "text": "The site receiving the input",
              "feedback": "Correct. Inputs at compartments one, five and nine are compared at the soma."
            },
            {
              "text": "The site recording the output",
              "feedback": "The recording stays at compartment one, the soma."
            },
            {
              "text": "The boundary condition at the tip",
              "feedback": "This panel compares input locations, not a change of terminal boundary."
            }
          ],
          "hints": [{ "body": "Separate the injection locations from the fixed recording location." }],
          "modelAnswer": [
            "Inputs at compartments one, five and nine are compared at the soma."
          ]
        }
      ]
    },
    {
      "id": "matching",
      "title": "The three-halves rule",
      "keyTerms": [
        "conductance"
      ],
      "source": "L05 PDF 20",
      "blocks": [
        {
          "type": "text",
          "body": ["The branch point shares a voltage. Daughter currents and input conductances add. With common material properties and matched terminal factors, $G\\propto d^{3/2}$, so $d_P^{3/2}=\\sum_j d_j^{3/2}$. Add the daughter powers before taking the $2/3$ power. For an unknown daughter, subtract the known powers first."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 5, PDF page 20. Parent and daughter diameters and signed current directions at a bifurcation. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 5, PDF page 20. Parent and daughter diameters and signed current directions at a bifurcation. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L05/branch.webp', import.meta.url).href,
              "alt": "Lecture 5, PDF page 20. Parent and daughter diameters and signed current directions at a bifurcation. Original labels, axes and scale bars retained.",
              "aspect": 2.0616740088105727,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L05-f-diameter",
          "name": "Matched parent diameter",
          "tex": "d_P=\\left(\\sum_jd_j^{3/2}\\right)^{2/3}",
          "symbols": [
            {
              "tex": "d_P",
              "name": "Parent diameter",
              "unit": "m",
              "meaning": "Parent diameter in the stated model."
            },
            {
              "tex": "d_j",
              "name": "Daughter diameter",
              "unit": "m",
              "meaning": "Daughter diameter in the stated model."
            }
          ],
          "reads": "Conductance-equivalent branches combine by a three-halves power.",
          "assumes": "Common linear membrane material, matched equivalent continuations.",
          "variants": [],
          "drill": {
            "prompt": "Two daughters each have diameter $10^{-6}\\,\\mathrm{m}$. Find the matched parent diameter.",
            "answer": {
              "value": 1.5874010519681995e-06,
              "unit": "m",
              "tolerance": 4.762203155904598e-09,
              "verification": {
                "relation": "rallDiameter",
                "inputs": {
                  "diameters": [
                    1e-06,
                    1e-06
                  ]
                },
                "displayScale": 1
              }
            },
            "tex": "d_P=[(10^{-6}\\,\\mathrm{m})^{3/2}+(10^{-6}\\,\\mathrm{m})^{3/2}]^{2/3}",
            "modelAnswer": [
              "Conductance-equivalent branches combine by a three-halves power."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $d_P=\\left(\\sum_jd_j^{3/2}\\right)^{2/3}$."
              },
              {
                "body": "Start with $d_P=[(10^{-6}\\,\\mathrm{m})^{3/2}+(10^{-6}\\,\\mathrm{m})^{3/2}]^{2/3}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{d_P}=\\left(\\sum_j\\htmlClass{formula-term-1}{d_j}^{3/2}\\right)^{2/3}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L05-matching-check",
          "practice": "extra",
          "prompt": "Which branch quantity adds in parallel?",
          "correct": 0,
          "options": [
            {
              "text": "The input conductances of daughter branches",
              "feedback": "Correct. Daughter currents add at the shared branch voltage, so conductances add."
            },
            {
              "text": "The input resistances of daughter branches",
              "feedback": "Parallel resistances combine reciprocally; adding them would describe series elements."
            }
          ],
          "hints": [
            {
              "body": "Recall the distinction illustrated in this source figure."
            },
            {
              "body": "Separate the controlled condition from the outcome in the prompt."
            }
          ],
          "modelAnswer": [
            "The input conductances of daughter branches."
          ]
        },
        {
          "id": "L05-matching-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L05 PDF 20",
          "prompt": "Which diameter power appears in the Rall branch-matching rule?",
          "correct": 1,
          "options": [
            {
              "text": "The power of two",
              "feedback": "Cross-sectional area scales with diameter squared, but Rall matching uses three halves."
            },
            {
              "text": "The power of three halves",
              "feedback": "Correct. Parent diameter to this power equals the sum for daughters."
            },
            {
              "text": "The power of one half",
              "feedback": "The square-root dependence belongs to the length constant, not the branch diameter sum."
            }
          ],
          "hints": [{ "body": "Relate the diameter dependence to one-arm input conductance." }],
          "modelAnswer": [
            "Parent diameter to this power equals the sum for daughters."
          ]
        }
      ]
    },
    {
      "id": "assumptions",
      "title": "Rall conditions",
      "keyTerms": [
        "isopotential",
        "electrotonic"
      ],
      "source": "L05 PDF 21",
      "blocks": [
        {
          "type": "text",
          "body": ["Check linear passive membrane, common $R_m$, $R_i$ and $C_m$, negligible extracellular resistance and an isopotential soma. Check diameter matching at every node. For finite trees, also require sealed tips at equal soma-to-tip electrotonic lengths."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 5, PDF page 21. Branch indices and diameters on the source tree for recursive matching. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 5, PDF page 21. Branch indices and diameters on the source tree for recursive matching. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L05/rall-tree.webp', import.meta.url).href,
              "alt": "Lecture 5, PDF page 21. Branch indices and diameters on the source tree for recursive matching. Original labels, axes and scale bars retained.",
              "aspect": 1.8615384615384616,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [],
      "conceptQuiz": [
        {
          "id": "L05-assumptions-check",
          "practice": "extra",
          "prompt": "What must agree for the finite sealed reduction?",
          "correct": 1,
          "options": [
            {
              "text": "Total soma-to-tip physical path lengths",
              "feedback": "Equal physical lengths can have unequal electrotonic lengths because local length constants differ."
            },
            {
              "text": "Total soma-to-tip electrotonic path lengths",
              "feedback": "Correct. Complete soma-to-tip electrotonic totals must agree for this reduction."
            }
          ],
          "hints": [
            {
              "body": "Recall the distinction illustrated in this source figure."
            },
            {
              "body": "Separate the controlled condition from the outcome in the prompt."
            }
          ],
          "modelAnswer": [
            "Total soma-to-tip electrotonic path lengths."
          ]
        },
        {
          "id": "L05-assumptions-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L05 PDF 21",
          "prompt": "Which membrane behavior is assumed in the passive Rall reduction?",
          "correct": 2,
          "options": [
            {
              "text": "Active membrane with changing parameters",
              "feedback": "Active voltage-dependent conductances violate the stated passive linear assumption."
            },
            {
              "text": "Rectifying membrane with fixed geometry",
              "feedback": "Fixed geometry does not make a rectifying membrane linear."
            },
            {
              "text": "Linear membrane with fixed parameters",
              "feedback": "Correct. The reduction assumes linear membrane and common fixed material parameters."
            }
          ],
          "hints": [{ "body": "Decide whether conductance changes with voltage in a passive linear cable." }],
          "modelAnswer": [
            "The reduction assumes linear membrane and common fixed material parameters."
          ]
        }
      ]
    },
    {
      "id": "semi",
      "title": "One-arm input load",
      "keyTerms": [],
      "source": "L05 PDF 22",
      "blocks": [
        {
          "type": "text",
          "body": ["For one end-driven semi-infinite arm, $R_\\infty=r_i\\lambda$ and $G_\\infty=\\pi d^{3/2}/(2\\sqrt{R_iR_m})$. Here $r_i$ is axial resistance per length, $R_i$ is cytoplasmic resistivity and $R_m$ is specific membrane resistance. The resistance at the origin of two identical arms in parallel is half the one-arm value."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 5, PDF page 21. Branch indices and diameters on the source tree for recursive matching. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 5, PDF page 21. Branch indices and diameters on the source tree for recursive matching. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L05/rall-tree.webp', import.meta.url).href,
              "alt": "Lecture 5, PDF page 21. Branch indices and diameters on the source tree for recursive matching. Original labels, axes and scale bars retained.",
              "aspect": 1.8615384615384616,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        },
        {
          "type": "optionalInfo",
          "title": "Extra detail",
          "body": "PDF p22 gives the correct one-arm diameter expression but mixes in the two-sided resistance prefactor. At a two-sided injection site, use the total current split across both arms."
        }
      ],
      "formulas": [
        {
          "id": "L05-f-ginf",
          "name": "Semi-infinite input conductance",
          "tex": "G_\\infty=\\frac{\\pi d^{3/2}}{2\\sqrt{R_iR_m}}",
          "symbols": [
            {
              "tex": "G_\\infty",
              "name": "One-arm input conductance",
              "unit": "S",
              "meaning": "One-arm input conductance in the stated model."
            },
            {
              "tex": "d",
              "name": "Diameter",
              "unit": "m",
              "meaning": "Diameter in the stated model."
            },
            {
              "tex": "R_i",
              "name": "Axial resistivity",
              "unit": "ohm*m",
              "meaning": "Axial resistivity in the stated model."
            },
            {
              "tex": "R_m",
              "name": "Specific membrane resistance",
              "unit": "ohm*m2",
              "meaning": "Specific membrane resistance in the stated model."
            }
          ],
          "reads": "A thicker one-arm cable draws more current per source voltage.",
          "assumes": "End-driven uniform semi-infinite passive cylinder, negligible external resistance.",
          "variants": [],
          "drill": {
            "prompt": "Use $d=4\\times10^{-6}\\,\\mathrm{m}$, $R_i=1\\,\\Omega\\,\\mathrm{m}$ and $R_m=1\\,\\Omega\\,\\mathrm{m}^2$. Find one-arm conductance.",
            "answer": {
              "value": 1.2566370614359173e-08,
              "unit": "S",
              "tolerance": 3.769911184307752e-11,
              "verification": {
                "relation": "rallConductance",
                "inputs": {
                  "diameter": 4e-06,
                  "ri": 1,
                  "rm": 1
                },
                "displayScale": 1
              }
            },
            "tex": "G_\\infty=\\pi(4\\times10^{-6}\\,\\mathrm{m})^{3/2}/(2\\sqrt{(1\\,\\Omega\\,\\mathrm{m})(1\\,\\Omega\\,\\mathrm{m}^2)})",
            "modelAnswer": [
              "A thicker one-arm cable draws more current per source voltage."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $G_\\infty=\\frac{\\pi d^{3/2}}{2\\sqrt{R_iR_m}}$."
              },
              {
                "body": "Start with $G_\\infty=\\pi(4\\times10^{-6}\\,\\mathrm{m})^{3/2}/(2\\sqrt{(1\\,\\Omega\\,\\mathrm{m})(1\\,\\Omega\\,\\mathrm{m}^2)})$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{G_\\infty}=\\frac{\\pi \\htmlClass{formula-term-1}{d}^{3/2}}{2\\sqrt{\\htmlClass{formula-term-2}{R_i}\\htmlClass{formula-term-3}{R_m}}}"
        },
        {
          "id": "L05-f-rinf",
          "name": "One-arm input resistance",
          "tex": "R_\\infty=\\frac{1}{G_\\infty}=r_i\\lambda",
          "symbols": [
            {
              "tex": "R_\\infty",
              "name": "Input resistance",
              "unit": "ohm",
              "meaning": "Input resistance in the stated model."
            },
            {
              "tex": "G_\\infty",
              "name": "Input conductance",
              "unit": "S",
              "meaning": "Input conductance in the stated model."
            },
            {
              "tex": "r_i",
              "name": "Axial resistance per length",
              "unit": "ohm/m",
              "meaning": "Axial resistance per length in the stated model."
            },
            {
              "tex": "\\lambda",
              "name": "Length constant",
              "unit": "m",
              "meaning": "Length constant in the stated model."
            }
          ],
          "reads": "Resistance and conductance are reciprocal for one source geometry.",
          "assumes": "End-driven one-arm semi-infinite passive cable.",
          "variants": [],
          "drill": {
            "prompt": "A one-arm conductance is $10^{-8}\\,\\mathrm{S}$. Find input resistance.",
            "answer": {
              "value": 100000000.0,
              "unit": "ohm",
              "tolerance": 300000.0,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 1,
                  "b": 1e-08
                },
                "displayScale": 1
              }
            },
            "tex": "R_\\infty=1/(10^{-8}\\,\\mathrm{S})",
            "modelAnswer": [
              "Resistance and conductance are reciprocal for one source geometry."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $R_\\infty=\\frac{1}{G_\\infty}=r_i\\lambda$."
              },
              {
                "body": "Start with $R_\\infty=1/(10^{-8}\\,\\mathrm{S})$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{R_\\infty}=\\frac{1}{\\htmlClass{formula-term-1}{G_\\infty}}=\\htmlClass{formula-term-2}{r_i}\\htmlClass{formula-term-3}{\\lambda}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L05-semi-check",
          "prompt": "Which resistance belongs to one end-driven arm?",
          "correct": 0,
          "options": [
            {
              "text": "$r_i\\lambda$ for one semi-infinite arm",
              "feedback": "Correct. One end-driven semi-infinite arm has input resistance equal to this product."
            },
            {
              "text": "$r_i\\lambda/2$ for one semi-infinite arm",
              "feedback": "The extra factor of one half belongs to two identical arms loaded in parallel."
            }
          ],
          "hints": [
            {
              "body": "Recall the distinction illustrated in this source figure."
            },
            {
              "body": "Separate the controlled condition from the outcome in the prompt."
            }
          ],
          "modelAnswer": [
            "$r_i\\lambda$ for one semi-infinite arm."
          ]
        },
        {
          "id": "L05-semi-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L05 PDF 22",
          "prompt": "For fixed material parameters, what geometric quantity sets one-arm semi-infinite input conductance?",
          "correct": 0,
          "options": [
            {
              "text": "The diameter of the cable",
              "feedback": "Correct. Conductance scales with diameter to the three-halves power."
            },
            {
              "text": "The remaining tip distance",
              "feedback": "A semi-infinite arm has no finite terminal distance setting its conductance."
            },
            {
              "text": "The attached soma diameter",
              "feedback": "The arm conductance is distinct from a separately attached soma load."
            }
          ],
          "hints": [{ "body": "Hold the material prefactor constant in the input conductance expression." }],
          "modelAnswer": [
            "Conductance scales with diameter to the three-halves power."
          ]
        }
      ]
    },
    {
      "id": "recursive",
      "title": "Reducing a tree",
      "keyTerms": [
        "conductance"
      ],
      "source": "L05 PDF 23–25",
      "blocks": [
        {
          "type": "text",
          "body": ["Start at the most distal matched daughters. Replace their parallel load with the parent continuation, then repeat toward the soma. Count each daughter once."]
        },
        {
          "type": "optionalInfo",
          "title": "Source figure and context",
          "blocks": [
            { "type": "text", "body": "Source diagram for this model." },
            {
              "type": "figure",
              "visual": {
                "type": "widget",
                "name": "image-hotspots",
                "caption": "Lecture 5, PDF page 24. A branching tree and its reduced distal equivalent continuations. Original labels, axes and scale bars retained.",
                "fallbackAlt": "Lecture 5, PDF page 24. A branching tree and its reduced distal equivalent continuations. Original labels, axes and scale bars retained.",
                "props": {
                  "src": new URL('../../assets/figures/nbe-e4120/L05/replace.webp', import.meta.url).href,
                  "alt": "Lecture 5, PDF page 24. A branching tree and its reduced distal equivalent continuations. Original labels, axes and scale bars retained.",
                  "aspect": 0.9577836411609498,
                  "quiz": false,
                  "layout": "stack",
                  "regions": []
                }
              }
            }
          ]
        }
      ],
      "formulas": [
        {
          "id": "L05-f-parallel",
          "name": "Daughter conductance sum",
          "tex": "G_P=G_1+G_2",
          "symbols": [
            {
              "tex": "G_P",
              "name": "Matched parent conductance",
              "unit": "S",
              "meaning": "Matched parent conductance in the stated model."
            },
            {
              "tex": "G_1",
              "name": "First daughter conductance",
              "unit": "S",
              "meaning": "First daughter conductance in the stated model."
            },
            {
              "tex": "G_2",
              "name": "Second daughter conductance",
              "unit": "S",
              "meaning": "Second daughter conductance in the stated model."
            }
          ],
          "reads": "At common voltage, parallel loads add their currents.",
          "assumes": "Passive equivalent daughter loads at one branch point.",
          "variants": [],
          "drill": {
            "prompt": "Daughter input conductances are $3\\,\\mathrm{nS}$ and $5\\,\\mathrm{nS}$. Find their combined conductance.",
            "answer": {
              "value": 8e-09,
              "unit": "S",
              "tolerance": 2.4e-11,
              "verification": {
                "relation": "sum",
                "inputs": {
                  "a": 3e-09,
                  "b": 5e-09
                },
                "displayScale": 1
              }
            },
            "tex": "G_P=(3+5)\\,\\mathrm{nS}",
            "modelAnswer": [
              "At common voltage, parallel loads add their currents."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $G_P=G_1+G_2$."
              },
              {
                "body": "Start with $G_P=(3+5)\\,\\mathrm{nS}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{G_P}=\\htmlClass{formula-term-1}{G_1}+\\htmlClass{formula-term-2}{G_2}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L05-recursive-check",
          "practice": "extra",
          "prompt": "Which direction simplifies a branching tree recursively?",
          "correct": 1,
          "options": [
            {
              "text": "From the soma ignoring distal daughters",
              "feedback": "Ignoring distal daughter loads loses the load that a proximal replacement must preserve."
            },
            {
              "text": "From distal daughters toward the soma",
              "feedback": "Correct. Combine distal loads before replacing their parent, then work toward the soma."
            }
          ],
          "hints": [
            {
              "body": "Recall the distinction illustrated in this source figure."
            },
            {
              "body": "Separate the controlled condition from the outcome in the prompt."
            }
          ],
          "modelAnswer": [
            "From distal daughters toward the soma."
          ]
        },
        {
          "id": "L05-recursive-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L05 PDF 23–25",
          "prompt": "How are daughter loads combined at a shared branch voltage?",
          "correct": 1,
          "options": [
            {
              "text": "By averaging their input conductances",
              "feedback": "An average would discard part of the total parallel load."
            },
            {
              "text": "By adding their input conductances",
              "feedback": "Correct. Parallel daughters share voltage and their currents add."
            },
            {
              "text": "By adding their input resistances",
              "feedback": "Resistances add in series; daughters at a shared voltage are parallel loads."
            }
          ],
          "hints": [{ "body": "Both daughters begin at the same branch voltage." }],
          "modelAnswer": [
            "Parallel daughters share voltage and their currents add."
          ]
        }
      ]
    },
    {
      "id": "stems",
      "title": "Stems in parallel",
      "keyTerms": [
        "conductance",
        "electrotonic"
      ],
      "source": "L05 PDF 26",
      "blocks": [
        {
          "type": "text",
          "body": ["Combine stem loads in parallel. The equivalent diameter is $(\\sum_j d_j^{3/2})^{2/3}$ for shared material parameters and semi-infinite arms or equal-length sealed arms in electrotonic units. With unequal lengths, add the separately corrected conductances."]
        },
        {
          "type": "optionalInfo",
          "title": "Source figure and context",
          "blocks": [
            { "type": "text", "body": "Source diagram for this model." },
            {
              "type": "figure",
              "visual": {
                "type": "widget",
                "name": "image-hotspots",
                "caption": "Lecture 5, PDF page 26. Multiple dendritic stems reduced under matching electrical assumptions. Original labels, axes and scale bars retained.",
                "fallbackAlt": "Lecture 5, PDF page 26. Multiple dendritic stems reduced under matching electrical assumptions. Original labels, axes and scale bars retained.",
                "props": {
                  "src": new URL('../../assets/figures/nbe-e4120/L05/stems.webp', import.meta.url).href,
                  "alt": "Lecture 5, PDF page 26. Multiple dendritic stems reduced under matching electrical assumptions. Original labels, axes and scale bars retained.",
                  "aspect": 1.9017341040462428,
                  "quiz": false,
                  "layout": "stack",
                  "regions": []
                }
              }
            }
          ]
        }
      ],
      "formulas": [
        {
          "id": "L05-f-stems",
          "name": "Several equivalent stems",
          "tex": "d_{eq}=\\left(\\sum_jd_j^{3/2}\\right)^{2/3}",
          "symbols": [
            {
              "tex": "d_{eq}",
              "name": "Combined equivalent diameter",
              "unit": "m",
              "meaning": "Combined equivalent diameter in the stated model."
            },
            {
              "tex": "d_j",
              "name": "Stem diameter",
              "unit": "m",
              "meaning": "Stem diameter in the stated model."
            }
          ],
          "reads": "Equivalent stem loads add through the same material prefactor.",
          "assumes": "Common material, matched node conditions and identical finite endpoint length when finite.",
          "variants": [],
          "drill": {
            "prompt": "Three equivalent stems each have diameter $2\\,\\mu\\mathrm{m}$. Find their combined diameter.",
            "answer": {
              "value": 4.160167646103812e-06,
              "unit": "m",
              "tolerance": 1.2480502938311436e-08,
              "verification": {
                "relation": "rallDiameter",
                "inputs": {
                  "diameters": [
                    2e-06,
                    2e-06,
                    2e-06
                  ]
                },
                "displayScale": 1
              }
            },
            "tex": "d_{eq}=[3(2\\times10^{-6}\\,\\mathrm{m})^{3/2}]^{2/3}",
            "modelAnswer": [
              "Equivalent stem loads add through the same material prefactor."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $d_{eq}=\\left(\\sum_jd_j^{3/2}\\right)^{2/3}$."
              },
              {
                "body": "Start with $d_{eq}=[3(2\\times10^{-6}\\,\\mathrm{m})^{3/2}]^{2/3}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{d_{eq}}=\\left(\\sum_j\\htmlClass{formula-term-1}{d_j}^{3/2}\\right)^{2/3}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L05-stems-check",
          "practice": "extra",
          "prompt": "Does the rule apply exactly to every biological tree?",
          "correct": 0,
          "options": [
            {
              "text": "No, the geometric assumptions can fail",
              "feedback": "Correct. Biological trees need not satisfy all matching and material assumptions."
            },
            {
              "text": "Yes, dendritic identity guarantees matching",
              "feedback": "Being dendritic does not establish the three-halves law or equal terminal path lengths."
            }
          ],
          "hints": [
            {
              "body": "Recall the distinction illustrated in this source figure."
            },
            {
              "body": "Separate the controlled condition from the outcome in the prompt."
            }
          ],
          "modelAnswer": [
            "No, the geometric assumptions can fail."
          ]
        },
        {
          "id": "L05-stems-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L05 PDF 26",
          "prompt": "What is added to obtain the total load of independent dendritic stems at the soma?",
          "correct": 2,
          "options": [
            {
              "text": "The individual stem resistances",
              "feedback": "Parallel stem loads require conductance addition, not resistance addition."
            },
            {
              "text": "The individual stem diameters",
              "feedback": "A diameter-only reduction requires the three-halves rule and compatible conditions."
            },
            {
              "text": "The individual stem conductances",
              "feedback": "Correct. Stems attached to the soma load it in parallel."
            }
          ],
          "hints": [{ "body": "The stems share the somatic voltage and carry separate currents." }],
          "modelAnswer": [
            "Stems attached to the soma load it in parallel."
          ]
        }
      ]
    },
    {
      "id": "boundaries",
      "title": "Terminal conditions",
      "keyTerms": [],
      "source": "L05 PDF 27",
      "blocks": [
        {
          "type": "text",
          "body": ["At fixed origin increment $V_0$, the steady profiles are $V_0e^{-X}$ for an infinite cable on the $X\\ge0$ side, $V_0\\cosh(L-X)/\\cosh L$ for a sealed tip and $V_0\\sinh(L-X)/\\sinh L$ for a tip shorted to rest (called open in the slides). The sealed tip has zero axial current. For a remaining fraction $f=V(L)/V_0$, infer $L=\\operatorname{acosh}(1/f)$."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 5, PDF page 27. Normalized steady attenuation for sealed, clamped and infinite cable endpoints. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 5, PDF page 27. Normalized steady attenuation for sealed, clamped and infinite cable endpoints. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L05/profiles.webp', import.meta.url).href,
              "alt": "Lecture 5, PDF page 27. Normalized steady attenuation for sealed, clamped and infinite cable endpoints. Original labels, axes and scale bars retained.",
              "aspect": 1.544904137235116,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L05-f-terminal",
          "name": "Sealed terminal fraction",
          "tex": "f=\\frac{V(L)}{V(0)}=\\frac{1}{\\cosh L}",
          "symbols": [
            {
              "tex": "f",
              "name": "Remaining fraction",
              "unit": "",
              "meaning": "Remaining fraction in the stated model."
            },
            {
              "tex": "V(L)",
              "name": "Terminal increment",
              "unit": "V",
              "meaning": "Terminal increment in the stated model."
            },
            {
              "tex": "V(0)",
              "name": "Origin increment",
              "unit": "V",
              "meaning": "Origin increment in the stated model."
            },
            {
              "tex": "L",
              "name": "Electrotonic length",
              "unit": "",
              "meaning": "Electrotonic length in the stated model."
            }
          ],
          "reads": "Sealed-tip attenuation depends on total electrotonic length.",
          "assumes": "Steady passive sealed cylinder at fixed origin voltage.",
          "variants": [],
          "drill": {
            "prompt": "Find the remaining terminal fraction for a sealed cylinder with $L=0.8$.",
            "answer": {
              "value": 0.7476999182374195,
              "unit": "",
              "tolerance": 0.0022430997547122585,
              "verification": {
                "relation": "finiteCable",
                "inputs": {
                  "v": 1,
                  "length": 0.8,
                  "x": 0.8,
                  "load": 0,
                  "mode": "load"
                },
                "displayScale": 1
              }
            },
            "tex": "f=1/\\cosh(0.8)",
            "modelAnswer": [
              "Sealed-tip attenuation depends on total electrotonic length."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $f=\\frac{V(L)}{V(0)}=\\frac{1}{\\cosh L}$."
              },
              {
                "body": "Start with $f=1/\\cosh(0.8)$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{f}=\\frac{\\htmlClass{formula-term-1}{V(L)}}{\\htmlClass{formula-term-2}{V(0)}}=\\frac{1}{\\cosh \\htmlClass{formula-term-3}{L}}"
        },
        {
          "id": "L05-f-inverse",
          "name": "Infer sealed electrotonic length",
          "tex": "L=\\operatorname{acosh}(1/f)",
          "symbols": [
            {
              "tex": "L",
              "name": "Electrotonic length",
              "unit": "",
              "meaning": "Electrotonic length in the stated model."
            },
            {
              "tex": "f",
              "name": "Remaining terminal fraction",
              "unit": "",
              "meaning": "Remaining terminal fraction in the stated model."
            }
          ],
          "reads": "The measured remaining fraction determines a sealed-cylinder length.",
          "assumes": "Steady sealed cylinder; distinguish loss from remaining fraction.",
          "variants": [],
          "drill": {
            "prompt": "The terminal retains fraction $0.8$ of the origin increment. Find $L$.",
            "answer": {
              "value": 0.6931471805599453,
              "unit": "",
              "tolerance": 0.002079441541679836,
              "verification": {
                "relation": "sealedLength",
                "inputs": {
                  "fraction": 0.8
                },
                "displayScale": 1
              }
            },
            "tex": "L=\\operatorname{acosh}(1/0.8)",
            "modelAnswer": [
              "The measured remaining fraction determines a sealed-cylinder length."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $L=\\operatorname{acosh}(1/f)$."
              },
              {
                "body": "Start with $L=\\operatorname{acosh}(1/0.8)$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{L}=\\operatorname{acosh}(1/\\htmlClass{formula-term-1}{f})"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L05-boundaries-check",
          "prompt": "Which boundary models a dendritic tip with finite voltage and no axial current leaving it?",
          "correct": 1,
          "options": [
            {
              "text": "An open cable end with zero terminal voltage",
              "feedback": "The open boundary fixes terminal voltage, not zero axial current."
            },
            {
              "text": "A sealed cable end with zero voltage slope",
              "feedback": "Correct. A sealed tip has zero axial current and therefore zero axial voltage slope."
            }
          ],
          "hints": [
            {
              "body": "Recall the distinction illustrated in this source figure."
            },
            {
              "body": "Separate the controlled condition from the outcome in the prompt."
            }
          ],
          "modelAnswer": [
            "A sealed cable end with zero voltage slope."
          ]
        },
        {
          "id": "L05-boundaries-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L05 PDF 27",
          "prompt": "Which boundary fixes the terminal voltage increment to zero?",
          "correct": 0,
          "options": [
            {
              "text": "An open terminal boundary",
              "feedback": "Correct. The taught open boundary fixes the terminal increment to zero."
            },
            {
              "text": "A sealed terminal boundary",
              "feedback": "A sealed tip fixes axial current, hence voltage slope, to zero."
            },
            {
              "text": "A matched terminal boundary",
              "feedback": "A matched continuation behaves like the remaining semi-infinite cable."
            }
          ],
          "hints": [{ "body": "Distinguish fixing voltage from fixing axial current." }],
          "modelAnswer": [
            "The taught open boundary fixes the terminal increment to zero."
          ]
        }
      ]
    },
    {
      "id": "finite",
      "title": "Finite sealed load",
      "keyTerms": [
        "conductance"
      ],
      "source": "L05 PDF 28",
      "blocks": [
        {
          "type": "text",
          "body": ["A finite sealed arm has $G_N=G_\\infty\\tanh L$ and $R_N=R_\\infty\\coth L$. Relative to one semi-infinite arm, a short sealed arm draws less steady current at the same origin voltage. The correction approaches one as $L$ grows."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 5, PDF page 28. Source finite sealed input-conductance and resistance relations with model assumptions. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 5, PDF page 28. Source finite sealed input-conductance and resistance relations with model assumptions. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L05/finite.webp', import.meta.url).href,
              "alt": "Lecture 5, PDF page 28. Source finite sealed input-conductance and resistance relations with model assumptions. Original labels, axes and scale bars retained.",
              "aspect": 2.548707753479125,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        },
        {
          "type": "optionalInfo",
          "title": "Extra detail",
          "body": "As a geometry workflow, infer electrotonic length from tip attenuation, undo the terminal factor in the input load, and then recover diameter from the one-arm relation."
        }
      ],
      "formulas": [
        {
          "id": "L05-f-finite-g",
          "name": "Finite sealed conductance",
          "tex": "G_N=G_\\infty\\tanh L",
          "symbols": [
            {
              "tex": "G_N",
              "name": "Finite input conductance",
              "unit": "S",
              "meaning": "Finite input conductance in the stated model."
            },
            {
              "tex": "G_\\infty",
              "name": "Semi-infinite conductance",
              "unit": "S",
              "meaning": "Semi-infinite conductance in the stated model."
            },
            {
              "tex": "L",
              "name": "Electrotonic length",
              "unit": "",
              "meaning": "Electrotonic length in the stated model."
            }
          ],
          "reads": "A sealed finite arm draws less steady current than an infinite continuation.",
          "assumes": "Uniform finite passive cylinder, sealed tip.",
          "variants": [],
          "drill": {
            "prompt": "Use $d=2\\times10^{-6}\\,\\mathrm{m}$, $R_i=1\\,\\Omega\\,\\mathrm{m}$, $R_m=2\\,\\Omega\\,\\mathrm{m}^2$ and $L=0.7$. Find sealed input conductance.",
            "answer": {
              "value": 1.898677368657675e-09,
              "unit": "S",
              "tolerance": 5.696032105973024e-12,
              "verification": {
                "relation": "rallConductance",
                "inputs": {
                  "diameter": 2e-06,
                  "ri": 1,
                  "rm": 2,
                  "length": 0.7
                },
                "displayScale": 1
              }
            },
            "tex": "G_N=\\frac{\\pi(2\\times10^{-6}\\,\\mathrm{m})^{3/2}}{2\\sqrt{(1\\,\\Omega\\,\\mathrm{m})(2\\,\\Omega\\,\\mathrm{m}^2)}}\\tanh(0.7)",
            "modelAnswer": [
              "A sealed finite arm draws less steady current than an infinite continuation."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $G_N=G_\\infty\\tanh L$."
              },
              {
                "body": "Start with $G_N=\\frac{\\pi(2\\times10^{-6}\\,\\mathrm{m})^{3/2}}{2\\sqrt{(1\\,\\Omega\\,\\mathrm{m})(2\\,\\Omega\\,\\mathrm{m}^2)}}\\tanh(0.7)$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{G_N}=\\htmlClass{formula-term-1}{G_\\infty}\\tanh \\htmlClass{formula-term-2}{L}"
        },
        {
          "id": "L05-f-finite-r",
          "name": "Finite sealed resistance",
          "tex": "R_N=R_\\infty\\coth L",
          "symbols": [
            {
              "tex": "R_N",
              "name": "Finite input resistance",
              "unit": "ohm",
              "meaning": "Finite input resistance in the stated model."
            },
            {
              "tex": "R_\\infty",
              "name": "Semi-infinite resistance",
              "unit": "ohm",
              "meaning": "Semi-infinite resistance in the stated model."
            },
            {
              "tex": "L",
              "name": "Electrotonic length",
              "unit": "",
              "meaning": "Electrotonic length in the stated model."
            }
          ],
          "reads": "Finite sealed resistance is higher than the semi-infinite resistance.",
          "assumes": "Same one-arm source convention and sealed finite cylinder.",
          "variants": [],
          "drill": {
            "prompt": "A sealed cable has $R_\\infty=80\\,\\mathrm{M}\\Omega$ and $L=0.5$. Find $R_N$.",
            "answer": {
              "value": 173116273.09909222,
              "unit": "ohm",
              "tolerance": 519348.81929727667,
              "verification": {
                "relation": "sealedResistance",
                "inputs": {
                  "resistance": 80000000.0,
                  "length": 0.5
                },
                "displayScale": 1
              }
            },
            "tex": "R_N=(80\\,\\mathrm{M}\\Omega)/\\tanh(0.5)",
            "modelAnswer": [
              "Finite sealed resistance is higher than the semi-infinite resistance."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $R_N=R_\\infty\\coth L$."
              },
              {
                "body": "Start with $R_N=(80\\,\\mathrm{M}\\Omega)/\\tanh(0.5)$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{R_N}=\\htmlClass{formula-term-1}{R_\\infty}\\coth \\htmlClass{formula-term-2}{L}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L05-finite-check",
          "prompt": "Compared with a semi-infinite continuation, sealed conductance is",
          "correct": 0,
          "options": [
            {
              "text": "Smaller for a finite positive cable length",
              "feedback": "Correct. The hyperbolic tangent factor is below one at finite positive electrotonic length."
            },
            {
              "text": "Larger for a finite positive cable length",
              "feedback": "Removing the infinite continuation and sealing the tip reduces the steady input load."
            }
          ],
          "hints": [
            {
              "body": "Recall the distinction illustrated in this source figure."
            },
            {
              "body": "Separate the controlled condition from the outcome in the prompt."
            }
          ],
          "modelAnswer": [
            "Smaller for a finite positive cable length."
          ]
        },
        {
          "id": "L05-finite-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L05 PDF 28",
          "prompt": "Which function multiplies semi-infinite conductance for a finite sealed cable?",
          "correct": 1,
          "options": [
            {
              "text": "The hyperbolic cosine of length",
              "feedback": "The terminal voltage ratio uses the reciprocal of the hyperbolic cosine."
            },
            {
              "text": "The hyperbolic tangent of length",
              "feedback": "Correct. Finite sealed conductance uses the factor tanh of electrotonic length."
            },
            {
              "text": "The hyperbolic cotangent of length",
              "feedback": "The cotangent factor multiplies resistance, not conductance."
            }
          ],
          "hints": [{ "body": "Use the terminal correction for conductance, the reciprocal of resistance." }],
          "modelAnswer": [
            "Finite sealed conductance uses the factor tanh of electrotonic length."
          ]
        }
      ]
    },
    {
      "id": "paths",
      "title": "Electrotonic paths",
      "keyTerms": [],
      "source": "L05 PDF 29",
      "blocks": [
        {
          "type": "text",
          "body": ["For a cylindrical segment, $\\lambda=\\sqrt{dR_m/(4R_i)}$, with diameter $d$. Use consistent length units, then sum $L=\\sum_j\\ell_j/\\lambda_j$ separately along each soma-to-tip route. Physical lengths alone cannot establish a match."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 5, PDF page 29. Indexed tree used to sum the segments on each soma-to-tip route. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 5, PDF page 29. Indexed tree used to sum the segments on each soma-to-tip route. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L05/path.webp', import.meta.url).href,
              "alt": "Lecture 5, PDF page 29. Indexed tree used to sum the segments on each soma-to-tip route. Original labels, axes and scale bars retained.",
              "aspect": 1.8615384615384616,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L05-f-lambda",
          "name": "Local length constant",
          "tex": "\\lambda=\\sqrt{\\frac{R_md}{4R_i}}",
          "symbols": [
            {
              "tex": "\\lambda",
              "name": "Length constant",
              "unit": "m",
              "meaning": "Length constant in the stated model."
            },
            {
              "tex": "R_m",
              "name": "Specific membrane resistance",
              "unit": "ohm*m2",
              "meaning": "Specific membrane resistance in the stated model."
            },
            {
              "tex": "d",
              "name": "Segment diameter",
              "unit": "m",
              "meaning": "Segment diameter in the stated model."
            },
            {
              "tex": "R_i",
              "name": "Axial resistivity",
              "unit": "ohm*m",
              "meaning": "Axial resistivity in the stated model."
            }
          ],
          "reads": "Thicker segments have larger spread scales at fixed material parameters.",
          "assumes": "Uniform passive cylinder, negligible return resistance.",
          "variants": [],
          "drill": {
            "prompt": "Use $R_m=2\\,\\Omega\\,\\mathrm{m}^2$, $d=2\\times10^{-6}\\,\\mathrm{m}$ and $R_i=1\\,\\Omega\\,\\mathrm{m}$. Find the length constant.",
            "answer": {
              "value": 0.001,
              "unit": "m",
              "tolerance": 3e-06,
              "verification": {
                "relation": "cableLength",
                "inputs": {
                  "rm": 318309.8861837907,
                  "ri": 318309886183.7907
                },
                "displayScale": 1
              }
            },
            "tex": "\\lambda=\\sqrt{(2\\,\\Omega\\,\\mathrm{m}^2)(2\\times10^{-6}\\,\\mathrm{m})/(4\\,\\Omega\\,\\mathrm{m})}",
            "modelAnswer": [
              "Thicker segments have larger spread scales at fixed material parameters."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\lambda=\\sqrt{\\frac{R_md}{4R_i}}$."
              },
              {
                "body": "Start with $\\lambda=\\sqrt{(2\\,\\Omega\\,\\mathrm{m}^2)(2\\times10^{-6}\\,\\mathrm{m})/(4\\,\\Omega\\,\\mathrm{m})}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{\\lambda}=\\sqrt{\\frac{\\htmlClass{formula-term-1}{R_m}\\htmlClass{formula-term-2}{d}}{4\\htmlClass{formula-term-3}{R_i}}}"
        },
        {
          "id": "L05-f-path",
          "name": "Complete electrotonic path",
          "tex": "L_{path}=\\sum_j\\frac{\\ell_j}{\\lambda_j}",
          "symbols": [
            {
              "tex": "L_{path}",
              "name": "Total electrotonic path length",
              "unit": "",
              "meaning": "Total electrotonic path length in the stated model."
            },
            {
              "tex": "\\ell_j",
              "name": "Segment length",
              "unit": "m",
              "meaning": "Segment length in the stated model."
            },
            {
              "tex": "\\lambda_j",
              "name": "Local length constant",
              "unit": "m",
              "meaning": "Local length constant in the stated model."
            }
          ],
          "reads": "Each route sums normalized lengths, not all branches of the whole tree.",
          "assumes": "Use the actual connected soma-to-tip segments.",
          "variants": [],
          "drill": {
            "prompt": "A path has $\\ell_1=0.2\\,\\mathrm{mm}$, $\\lambda_1=1\\,\\mathrm{mm}$, $\\ell_2=0.3\\,\\mathrm{mm}$ and $\\lambda_2=0.5\\,\\mathrm{mm}$. Find total electrotonic length.",
            "answer": {
              "value": 0.8,
              "unit": "",
              "tolerance": 0.0024000000000000002,
              "verification": {
                "relation": "pathLength",
                "inputs": {
                  "segments": [
                    {
                      "length": 0.0002,
                      "lambda": 0.001
                    },
                    {
                      "length": 0.0003,
                      "lambda": 0.0005
                    }
                  ]
                },
                "displayScale": 1
              }
            },
            "tex": "L_{path}=(0.2\\,\\mathrm{mm})/(1\\,\\mathrm{mm})+(0.3\\,\\mathrm{mm})/(0.5\\,\\mathrm{mm})",
            "modelAnswer": [
              "Each route sums normalized lengths, not all branches of the whole tree."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $L_{path}=\\sum_j\\frac{\\ell_j}{\\lambda_j}$."
              },
              {
                "body": "Start with $L_{path}=(0.2\\,\\mathrm{mm})/(1\\,\\mathrm{mm})+(0.3\\,\\mathrm{mm})/(0.5\\,\\mathrm{mm})$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{L_{path}}=\\sum_j\\frac{\\htmlClass{formula-term-1}{\\ell_j}}{\\htmlClass{formula-term-2}{\\lambda_j}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L05-paths-check",
          "practice": "extra",
          "prompt": "What should be added along a path?",
          "correct": 1,
          "options": [
            {
              "text": "Each segment diameter divided by its length",
              "feedback": "Diameter influences the local length constant but diameter divided by length is not path length."
            },
            {
              "text": "Each segment length divided by its scale",
              "feedback": "Correct. Divide each physical segment length by its own length constant, then sum along the route."
            }
          ],
          "hints": [
            {
              "body": "Recall the distinction illustrated in this source figure."
            },
            {
              "body": "Separate the controlled condition from the outcome in the prompt."
            }
          ],
          "modelAnswer": [
            "Each segment length divided by its scale."
          ]
        },
        {
          "id": "L05-paths-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L05 PDF 29",
          "prompt": "When computing a complete soma-to-tip route, which segments are included?",
          "correct": 2,
          "options": [
            {
              "text": "All segments across the whole tree",
              "feedback": "Branches outside the selected route do not contribute to its path length."
            },
            {
              "text": "Only the final segment near the tip",
              "feedback": "The proximal segments also contribute to the complete route."
            },
            {
              "text": "All segments along that one route",
              "feedback": "Correct. Add the local electrotonic lengths encountered from soma to that tip."
            }
          ],
          "hints": [{ "body": "Follow the single route to the selected terminal." }],
          "modelAnswer": [
            "Add the local electrotonic lengths encountered from soma to that tip."
          ]
        }
      ]
    },
    {
      "id": "tree-example",
      "title": "Audit a finite tree",
      "keyTerms": [
        "electrotonic"
      ],
      "source": "L05 PDF 30",
      "blocks": [
        {
          "type": "text",
          "body": ["Audit each node for diameter matching, then compare every full electrotonic route. In Exercise 5, the branch point nearly matches, but the unequal routes rule out exact finite reduction."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 5, PDF page 30. Source worked node-matching example; rounded equalities are approximate. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 5, PDF page 30. Source worked node-matching example; rounded equalities are approximate. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L05/example.webp', import.meta.url).href,
              "alt": "Lecture 5, PDF page 30. Source worked node-matching example; rounded equalities are approximate. Original labels, axes and scale bars retained.",
              "aspect": 0.9974811083123426,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [],
      "conceptQuiz": [
        {
          "id": "L05-tree-example-check",
          "practice": "extra",
          "prompt": "What does one matched node establish?",
          "correct": 0,
          "options": [
            {
              "text": "Local matching rather than whole-tree validity",
              "feedback": "Correct. One node match establishes only that local conductance relation."
            },
            {
              "text": "Whole-tree validity without other conditions",
              "feedback": "Other nodes, materials and terminal electrotonic paths still require checks."
            }
          ],
          "hints": [
            {
              "body": "Recall the distinction illustrated in this source figure."
            },
            {
              "body": "Separate the controlled condition from the outcome in the prompt."
            }
          ],
          "modelAnswer": [
            "Local matching rather than whole-tree validity."
          ]
        },
        {
          "id": "L05-tree-example-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L05 PDF 30",
          "prompt": "Where must the three-halves rule be checked in a branching-tree audit?",
          "correct": 0,
          "options": [
            {
              "text": "At each individual branching node",
              "feedback": "Correct. A match at one node does not establish matches at the others."
            },
            {
              "text": "At only the first soma-side node",
              "feedback": "Distal nodes must also satisfy local matching."
            },
            {
              "text": "At only the last terminal-side node",
              "feedback": "Proximal nodes must also satisfy local matching."
            }
          ],
          "hints": [{ "body": "Local branch matching is tested separately from complete path length." }],
          "modelAnswer": [
            "A match at one node does not establish matches at the others."
          ]
        }
      ]
    },
    {
      "id": "soma",
      "title": "Soma and dendritic load",
      "keyTerms": [
        "dendritic"
      ],
      "source": "L05 PDF 31",
      "blocks": [
        {
          "type": "text",
          "body": ["At steady state the soma and dendrites are parallel loads, with $G_N=G_S+G_D$. The load ratio $\\rho=G_D/G_S$ gives dendritic current fraction $G_D/G_N=\\rho/(1+\\rho)$. For a uniform spherical soma, use $G_S=\\pi d_S^2/R_{m,S}$."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 5, PDF page 31. Lumped somatic resistance/capacitance and a sealed dendritic cylinder with steady current division. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 5, PDF page 31. Lumped somatic resistance/capacitance and a sealed dendritic cylinder with steady current division. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L05/soma.webp', import.meta.url).href,
              "alt": "Lecture 5, PDF page 31. Lumped somatic resistance/capacitance and a sealed dendritic cylinder with steady current division. Original labels, axes and scale bars retained.",
              "aspect": 1.3578125,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L05-f-rho",
          "name": "Dendritic-to-somatic ratio",
          "tex": "\\rho=G_D/G_S",
          "symbols": [
            {
              "tex": "\\rho",
              "name": "Conductance ratio",
              "unit": "",
              "meaning": "Conductance ratio in the stated model."
            },
            {
              "tex": "G_D",
              "name": "Dendritic conductance",
              "unit": "S",
              "meaning": "Dendritic conductance in the stated model."
            },
            {
              "tex": "G_S",
              "name": "Somatic conductance",
              "unit": "S",
              "meaning": "Somatic conductance in the stated model."
            }
          ],
          "reads": "The ratio compares two loads and is not a bounded fraction.",
          "assumes": "Steady passive loads sharing the somatic voltage.",
          "variants": [],
          "drill": {
            "prompt": "Use $G_D=12\\,\\mathrm{nS}$ and $G_S=4\\,\\mathrm{nS}$. Find $\\rho$.",
            "answer": {
              "value": 3.0,
              "unit": "",
              "tolerance": 0.009000000000000001,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 1.2e-08,
                  "b": 4e-09
                },
                "displayScale": 1
              }
            },
            "tex": "\\rho=(12\\,\\mathrm{nS})/(4\\,\\mathrm{nS})",
            "modelAnswer": [
              "The ratio compares two loads and is not a bounded fraction."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\rho=G_D/G_S$."
              },
              {
                "body": "Start with $\\rho=(12\\,\\mathrm{nS})/(4\\,\\mathrm{nS})$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{\\rho}=\\htmlClass{formula-term-1}{G_D}/\\htmlClass{formula-term-2}{G_S}"
        },
        {
          "id": "L05-f-total",
          "name": "Total somatic input conductance",
          "tex": "G_N=G_D+G_S=G_S(1+\\rho)",
          "symbols": [
            {
              "tex": "G_N",
              "name": "Total input conductance",
              "unit": "S",
              "meaning": "Total input conductance in the stated model."
            },
            {
              "tex": "G_D",
              "name": "Dendritic load",
              "unit": "S",
              "meaning": "Dendritic load in the stated model."
            },
            {
              "tex": "G_S",
              "name": "Somatic load",
              "unit": "S",
              "meaning": "Somatic load in the stated model."
            },
            {
              "tex": "\\rho",
              "name": "Conductance ratio",
              "unit": "",
              "meaning": "Conductance ratio in the stated model."
            }
          ],
          "reads": "Steady current divides between soma and dendritic loads.",
          "assumes": "Passive loads in parallel at the soma.",
          "variants": [],
          "drill": {
            "prompt": "Use $G_D=9\\,\\mathrm{nS}$ and $G_S=6\\,\\mathrm{nS}$. Find total input conductance.",
            "answer": {
              "value": 1.5e-08,
              "unit": "S",
              "tolerance": 4.5e-11,
              "verification": {
                "relation": "sum",
                "inputs": {
                  "a": 9e-09,
                  "b": 6e-09
                },
                "displayScale": 1
              }
            },
            "tex": "G_N=(9+6)\\,\\mathrm{nS}",
            "modelAnswer": [
              "Steady current divides between soma and dendritic loads."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $G_N=G_D+G_S=G_S(1+\\rho)$."
              },
              {
                "body": "Start with $G_N=(9+6)\\,\\mathrm{nS}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{G_N}=\\htmlClass{formula-term-1}{G_D}+\\htmlClass{formula-term-2}{G_S}=\\htmlClass{formula-term-2}{G_S}(1+\\htmlClass{formula-term-3}{\\rho})"
        },
        {
          "id": "L05-f-fraction",
          "name": "Steady dendritic current fraction",
          "tex": "f_D=\\frac{\\rho}{1+\\rho}",
          "symbols": [
            {
              "tex": "f_D",
              "name": "Dendritic current fraction",
              "unit": "",
              "meaning": "Dendritic current fraction in the stated model."
            },
            {
              "tex": "\\rho",
              "name": "Conductance ratio",
              "unit": "",
              "meaning": "Conductance ratio in the stated model."
            }
          ],
          "reads": "A ratio above unity still corresponds to a current fraction below unity.",
          "assumes": "Steady state only, common voltage and no capacitive current.",
          "variants": [],
          "drill": {
            "prompt": "Use $\\rho=4$. Find the fraction of total steady supplied current flowing to dendrites.",
            "answer": {
              "value": 0.8,
              "unit": "",
              "tolerance": 0.0024000000000000002,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 4,
                  "b": 5
                },
                "displayScale": 1
              }
            },
            "tex": "f_D=4/(1+4)",
            "modelAnswer": [
              "A ratio above unity still corresponds to a current fraction below unity."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $f_D=\\frac{\\rho}{1+\\rho}$."
              },
              {
                "body": "Start with $f_D=4/(1+4)$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{f_D}=\\frac{\\htmlClass{formula-term-1}{\\rho}}{1+\\htmlClass{formula-term-1}{\\rho}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L05-soma-check",
          "prompt": "Which quantity is bounded by unity?",
          "correct": 1,
          "options": [
            {
              "text": "The dendritic-to-somatic conductance ratio",
              "feedback": "The conductance ratio can exceed one when the dendritic load exceeds the somatic load."
            },
            {
              "text": "The fraction of steady current in dendrites",
              "feedback": "Correct. The dendritic share of total steady current is a fraction between zero and one."
            }
          ],
          "hints": [
            {
              "body": "Recall the distinction illustrated in this source figure."
            },
            {
              "body": "Separate the controlled condition from the outcome in the prompt."
            }
          ],
          "modelAnswer": [
            "The fraction of steady current in dendrites."
          ]
        },
        {
          "id": "L05-soma-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L05 PDF 31",
          "prompt": "What is the total steady input conductance of soma and dendrites?",
          "correct": 1,
          "options": [
            {
              "text": "Somatic times dendritic conductance",
              "feedback": "A product is not the total conductance of parallel loads."
            },
            {
              "text": "Somatic plus dendritic conductance",
              "feedback": "Correct. Soma and dendrites share voltage and act as parallel steady loads."
            },
            {
              "text": "Somatic minus dendritic conductance",
              "feedback": "Dendrites add a load rather than subtracting somatic conductance."
            }
          ],
          "hints": [{ "body": "Treat the two loads as parallel paths from the same soma voltage." }],
          "modelAnswer": [
            "Soma and dendrites share voltage and act as parallel steady loads."
          ]
        }
      ]
    },
    {
      "id": "step-input",
      "title": "Step responses",
      "keyTerms": [],
      "source": "L05 PDF 32",
      "blocks": [
        {
          "type": "text",
          "body": ["For the model step responses, compare somatic peak, delay and width at fixed recording location. Distal input charges intervening membrane, producing a smaller and slower somatic response."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 5, PDF page 32. Supplied ball-and-stick model step-pulse responses recorded at the soma; no new simulation. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 5, PDF page 32. Supplied ball-and-stick model step-pulse responses recorded at the soma; no new simulation. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L05/step.webp', import.meta.url).href,
              "alt": "Lecture 5, PDF page 32. Supplied ball-and-stick model step-pulse responses recorded at the soma; no new simulation. Original labels, axes and scale bars retained.",
              "aspect": 1.0592369477911647,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [],
      "conceptQuiz": [
        {
          "id": "L05-step-input-check",
          "practice": "extra",
          "prompt": "What can a shared late decay establish?",
          "correct": 0,
          "options": [
            {
              "text": "A common asymptotic mode of the passive model",
              "feedback": "Correct. A shared late decay can reflect a common slow passive relaxation mode."
            },
            {
              "text": "Identical peaks and latencies at all locations",
              "feedback": "A common late decay does not require equal early peaks, widths or latencies."
            }
          ],
          "hints": [
            {
              "body": "Recall the distinction illustrated in this source figure."
            },
            {
              "body": "Separate the controlled condition from the outcome in the prompt."
            }
          ],
          "modelAnswer": [
            "A common asymptotic mode of the passive model."
          ]
        },
        {
          "id": "L05-step-input-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L05 PDF 32",
          "prompt": "What stores charge as a passive response spreads through successive segments?",
          "correct": 2,
          "options": [
            {
              "text": "Each segment axial resistance",
              "feedback": "Axial resistance dissipates energy; it does not store membrane charge."
            },
            {
              "text": "Each segment membrane resistance",
              "feedback": "Membrane resistance carries leak current; capacitance stores charge."
            },
            {
              "text": "Each segment membrane capacitance",
              "feedback": "Correct. Successive capacitive charging contributes to slowing and delay."
            }
          ],
          "hints": [{ "body": "Think of the element that temporarily stores charge during a voltage change." }],
          "modelAnswer": [
            "Successive capacitive charging contributes to slowing and delay."
          ]
        }
      ]
    },
    {
      "id": "conductance-input",
      "title": "Synaptic conductance",
      "keyTerms": [
        "conductance"
      ],
      "source": "L05 PDF 33",
      "blocks": [
        {
          "type": "text",
          "body": ["A synapse changes conductance. Its outward-positive current is $I_{syn}=g_{syn}(t)(V_m-E_{syn})$. A conductance waveform with changing driving force can prevent exact summation even below spike threshold."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 5, PDF page 33. Supplied ball-and-stick alpha-like stimulus and somatic response traces. The original input-current label is retained; slide prose describes conductance, so only the qualitative shape is used. No new simulation. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 5, PDF page 33. Supplied ball-and-stick alpha-like stimulus and somatic response traces. The original input-current label is retained; slide prose describes conductance, so only the qualitative shape is used. No new simulation. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L05/alpha.webp', import.meta.url).href,
              "alt": "Lecture 5, PDF page 33. Supplied ball-and-stick alpha-like stimulus and somatic response traces. The original input-current label is retained; slide prose describes conductance, so only the qualitative shape is used. No new simulation. Original labels, axes and scale bars retained.",
              "aspect": 1.0654885654885655,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        },
        {
          "type": "optionalInfo",
          "title": "Extra detail",
          "body": "The source uses an alpha-shaped conductance pulse to approximate the time course of a synaptic conductance."
        }
      ],
      "formulas": [],
      "conceptQuiz": [
        {
          "id": "L05-conductance-input-check",
          "prompt": "Why can a conductance input depart from fixed-current summation?",
          "correct": 1,
          "options": [
            {
              "text": "Its current is independent of driving force",
              "feedback": "Prescribed current is independent of voltage; conductance-driven current is not."
            },
            {
              "text": "Its current depends on the evolving voltage",
              "feedback": "Correct. Current through a synaptic conductance changes with its driving force."
            }
          ],
          "hints": [
            {
              "body": "Recall the distinction illustrated in this source figure."
            },
            {
              "body": "Separate the controlled condition from the outcome in the prompt."
            }
          ],
          "modelAnswer": [
            "Its current depends on the evolving voltage."
          ]
        },
        {
          "id": "L05-conductance-input-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L05 PDF 33",
          "prompt": "Which stimulus better represents the brief synaptic event discussed here?",
          "correct": 0,
          "options": [
            {
              "text": "A brief local conductance change",
              "feedback": "Correct. A synaptic event changes local conductance rather than prescribing a rectangular current."
            },
            {
              "text": "A maintained rectangular current step",
              "feedback": "A step current is the comparison stimulus, not the brief synaptic conductance event."
            },
            {
              "text": "A maintained whole-cell voltage clamp",
              "feedback": "The example concerns a local input and resulting voltage response, not a whole-cell voltage command."
            }
          ],
          "hints": [{ "body": "Ask whether a synapse controls conductance or directly prescribes current." }],
          "modelAnswer": [
            "A synaptic event changes local conductance rather than prescribing a rectangular current."
          ]
        }
      ]
    },
    {
      "id": "exercise",
      "title": "Exercise 5 timing",
      "keyTerms": [],
      "source": "Exercise 5 p1–2, answers p1–2; L04 PDF2; L05 PDF29",
      "blocks": [
        {
          "type": "text",
          "body": ["Use $\\tau_m=R_mC_m$ and the assigned characteristic speed $\\theta=2\\lambda/\\tau_m$. Estimate each unshared route’s transit as $\\ell/\\theta$. With $d$, $R_i$ and $C_m$ fixed, $R_{m,new}=R_{m,old}(\\theta_{old}/\\theta_{new})^2$. Equal transit estimates may still give different EPSP peak times. In problem 2, use the assigned fourth diameter $5\\,\\mu\\mathrm{m}$."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 5, PDF page 29. Indexed tree used to sum the segments on each soma-to-tip route. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 5, PDF page 29. Indexed tree used to sum the segments on each soma-to-tip route. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L05/path.webp', import.meta.url).href,
              "alt": "Lecture 5, PDF page 29. Indexed tree used to sum the segments on each soma-to-tip route. Original labels, axes and scale bars retained.",
              "aspect": 1.8615384615384616,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L05-f-tau",
          "name": "Local membrane time constant",
          "tex": "\\tau_m=R_mC_m",
          "symbols": [
            {
              "tex": "\\tau_m",
              "name": "Time constant",
              "unit": "s",
              "meaning": "Time constant in the stated model."
            },
            {
              "tex": "R_m",
              "name": "Specific membrane resistance",
              "unit": "ohm*m2",
              "meaning": "Specific membrane resistance in the stated model."
            },
            {
              "tex": "C_m",
              "name": "Specific capacitance",
              "unit": "F/m2",
              "meaning": "Specific capacitance in the stated model."
            }
          ],
          "reads": "The local RC time product is independent of cylinder diameter.",
          "assumes": "Uniform linear membrane, consistent area normalization.",
          "variants": [],
          "drill": {
            "prompt": "Use $R_m=1.5\\,\\Omega\\,\\mathrm{m}^2$ and $C_m=0.01\\,\\mathrm{F/m}^2$. Find time constant.",
            "answer": {
              "value": 0.015,
              "unit": "s",
              "tolerance": 4.4999999999999996e-05,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 1.5,
                  "b": 0.01
                },
                "displayScale": 1
              }
            },
            "tex": "\\tau_m=(1.5\\,\\Omega\\,\\mathrm{m}^2)(0.01\\,\\mathrm{F/m}^2)",
            "modelAnswer": [
              "The local RC time product is independent of cylinder diameter."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\tau_m=R_mC_m$."
              },
              {
                "body": "Start with $\\tau_m=(1.5\\,\\Omega\\,\\mathrm{m}^2)(0.01\\,\\mathrm{F/m}^2)$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{\\tau_m}=\\htmlClass{formula-term-1}{R_m}\\htmlClass{formula-term-2}{C_m}"
        },
        {
          "id": "L05-f-speed",
          "name": "Characteristic passive speed",
          "tex": "\\theta=\\frac{2\\lambda}{\\tau_m}",
          "symbols": [
            {
              "tex": "\\theta",
              "name": "Characteristic speed",
              "unit": "m/s",
              "meaning": "Characteristic speed in the stated model."
            },
            {
              "tex": "\\lambda",
              "name": "Length constant",
              "unit": "m",
              "meaning": "Length constant in the stated model."
            },
            {
              "tex": "\\tau_m",
              "name": "Time constant",
              "unit": "s",
              "meaning": "Time constant in the stated model."
            }
          ],
          "reads": "Greater spatial scale and shorter relaxation give higher characteristic speed.",
          "assumes": "Taught half-rise approximation; not exact peak latency or active conduction.",
          "variants": [],
          "drill": {
            "prompt": "Use $\\lambda=0.0009\\,\\mathrm{m}$ and $\\tau_m=0.018\\,\\mathrm{s}$. Find characteristic speed.",
            "answer": {
              "value": 0.1,
              "unit": "m/s",
              "tolerance": 0.00030000000000000003,
              "verification": {
                "relation": "passiveSpeed",
                "inputs": {
                  "lambda": 0.0009,
                  "tau": 0.018
                },
                "displayScale": 1
              }
            },
            "tex": "\\theta=2(0.0009\\,\\mathrm{m})/(0.018\\,\\mathrm{s})",
            "modelAnswer": [
              "Greater spatial scale and shorter relaxation give higher characteristic speed."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\theta=\\frac{2\\lambda}{\\tau_m}$."
              },
              {
                "body": "Start with $\\theta=2(0.0009\\,\\mathrm{m})/(0.018\\,\\mathrm{s})$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{\\theta}=\\frac{2\\htmlClass{formula-term-1}{\\lambda}}{\\htmlClass{formula-term-2}{\\tau_m}}"
        },
        {
          "id": "L05-f-transit",
          "name": "Characteristic transit estimate",
          "tex": "t_{est}=\\ell/\\theta",
          "symbols": [
            {
              "tex": "t_{est}",
              "name": "Estimated transit time",
              "unit": "s",
              "meaning": "Estimated transit time in the stated model."
            },
            {
              "tex": "\\ell",
              "name": "Path length",
              "unit": "m",
              "meaning": "Path length in the stated model."
            },
            {
              "tex": "\\theta",
              "name": "Characteristic speed",
              "unit": "m/s",
              "meaning": "Characteristic speed in the stated model."
            }
          ],
          "reads": "Longer routes take longer in this approximate transit convention.",
          "assumes": "Characteristic estimate only, not proof of identical EPSP dynamics.",
          "variants": [],
          "drill": {
            "prompt": "Use $\\ell=0.00012\\,\\mathrm{m}$ and $\\theta=0.06\\,\\mathrm{m/s}$. Find estimated transit.",
            "answer": {
              "value": 0.002,
              "unit": "s",
              "tolerance": 6e-06,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 0.00012,
                  "b": 0.06
                },
                "displayScale": 1
              }
            },
            "tex": "t_{est}=(0.00012\\,\\mathrm{m})/(0.06\\,\\mathrm{m/s})",
            "modelAnswer": [
              "Longer routes take longer in this approximate transit convention."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $t_{est}=\\ell/\\theta$."
              },
              {
                "body": "Start with $t_{est}=(0.00012\\,\\mathrm{m})/(0.06\\,\\mathrm{m/s})$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{t_{est}}=\\htmlClass{formula-term-1}{\\ell}/\\htmlClass{formula-term-2}{\\theta}"
        },
        {
          "id": "L05-f-retune",
          "name": "Retune membrane resistance",
          "tex": "R_{m,new}=R_{m,old}\\left(\\frac{\\theta_{old}}{\\theta_{new}}\\right)^2",
          "symbols": [
            {
              "tex": "R_{m,new}",
              "name": "New specific resistance",
              "unit": "ohm*m2",
              "meaning": "New specific resistance in the stated model."
            },
            {
              "tex": "R_{m,old}",
              "name": "Old specific resistance",
              "unit": "ohm*m2",
              "meaning": "Old specific resistance in the stated model."
            },
            {
              "tex": "\\theta_{old}",
              "name": "Old speed",
              "unit": "m/s",
              "meaning": "Old speed in the stated model."
            },
            {
              "tex": "\\theta_{new}",
              "name": "Target speed",
              "unit": "m/s",
              "meaning": "Target speed in the stated model."
            }
          ],
          "reads": "Higher characteristic speed requires lower resistance at fixed diameter and capacitance.",
          "assumes": "Change only specific membrane resistance; this can break common-material Rall assumptions.",
          "variants": [],
          "drill": {
            "prompt": "Use $R_{m,old}=1.6\\,\\Omega\\,\\mathrm{m}^2$, $\\theta_{old}=0.06\\,\\mathrm{m/s}$ and $\\theta_{new}=0.12\\,\\mathrm{m/s}$. Find new resistance.",
            "answer": {
              "value": 0.4,
              "unit": "ohm*m2",
              "tolerance": 0.0012000000000000001,
              "verification": {
                "relation": "resistanceRetune",
                "inputs": {
                  "resistance": 1.6,
                  "old": 0.06,
                  "new": 0.12
                },
                "displayScale": 1
              }
            },
            "tex": "R_{m,new}=(1.6\\,\\Omega\\,\\mathrm{m}^2)(0.06/0.12)^2",
            "modelAnswer": [
              "Higher characteristic speed requires lower resistance at fixed diameter and capacitance."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $R_{m,new}=R_{m,old}\\left(\\frac{\\theta_{old}}{\\theta_{new}}\\right)^2$."
              },
              {
                "body": "Start with $R_{m,new}=(1.6\\,\\Omega\\,\\mathrm{m}^2)(0.06/0.12)^2$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{R_{m,new}}=\\htmlClass{formula-term-1}{R_{m,old}}\\left(\\frac{\\htmlClass{formula-term-2}{\\theta_{old}}}{\\htmlClass{formula-term-3}{\\theta_{new}}}\\right)^2"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L05-exercise-check",
          "practice": "extra",
          "prompt": "Does equal estimated transit prove identical EPSP arrival?",
          "correct": 0,
          "options": [
            {
              "text": "No, full waveform dynamics remain relevant",
              "feedback": "Correct. Matching characteristic transit estimates does not fix EPSP peak timing or width."
            },
            {
              "text": "Yes, every peak and width must then agree",
              "feedback": "The speed estimate does not specify all transient modes or the stimulus waveform."
            }
          ],
          "hints": [
            {
              "body": "Recall the distinction illustrated in this source figure."
            },
            {
              "body": "Separate the controlled condition from the outcome in the prompt."
            }
          ],
          "modelAnswer": [
            "No, full waveform dynamics remain relevant."
          ]
        },
        {
          "id": "L05-exercise-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "Exercise 5 p1–2; L04 PDF2",
          "prompt": "What is the physical interpretation of the taught passive speed formula?",
          "correct": 1,
          "options": [
            {
              "text": "An exact postsynaptic peak speed",
              "feedback": "EPSP peak timing depends on the full cable and stimulus dynamics."
            },
            {
              "text": "An approximate characteristic speed",
              "feedback": "Correct. This convention estimates transit; it does not determine a full transient waveform."
            },
            {
              "text": "An exact regenerated spike speed",
              "feedback": "This is a passive cable estimate, not active spike propagation."
            }
          ],
          "hints": [{ "body": "Compare an estimated transit time with the full shape of an EPSP." }],
          "modelAnswer": [
            "This convention estimates transit; it does not determine a full transient waveform."
          ]
        }
      ]
    }
  ],
  "recap": {
    "takeaways": ["Choose a compartment or a distributed tree from the size of the axial voltage drop.", "Check the daughter diameter rule, electrotonic lengths and tip conditions before reducing a tree.", "A synaptic conductance changes both driving current and the local electrical load."],
    "intro": "Practice reference. The calculator and official equation sheet are confirmed. Open-book status and official problem weights are unconfirmed.",
    "terms": [
      {
        "term": "Lumped model",
        "definition": "One voltage represents the electrically compact cell at the tested timescale."
      },
      {
        "term": "Distributed model",
        "definition": "Electrical properties and voltage vary over space."
      },
      {
        "term": "Compartment model",
        "definition": "Discrete passive elements linked by axial resistance approximate spatial spread."
      },
      {
        "term": "Miniature response",
        "definition": "Graded postsynaptic event associated with one released vesicle."
      },
      {
        "term": "Dendritic spike",
        "definition": "Local regenerative event involving voltage-gated channels."
      },
      {
        "term": "Backpropagation",
        "definition": "Axonally initiated spike invades soma and dendrites with possible decrement."
      },
      {
        "term": "Conductance matching",
        "definition": "Parent load equals daughter conductances summed at the branch voltage."
      },
      {
        "term": "Equivalent cylinder",
        "definition": "A reduction requiring material, matching and endpoint conditions."
      },
      {
        "term": "Electrotonic path",
        "definition": "Sum of segment lengths divided by their local length constants."
      },
      {
        "term": "Dendritic load ratio",
        "definition": "Dendritic conductance divided by somatic conductance, potentially above unity."
      }
    ],
    "equations": [
      {
        "name": "Ionic driving-force current",
        "tex": "I_i=g_i(V_m-E_i)",
        "note": "Ohmic channel with fixed conductance and reversal."
      },
      {
        "name": "One-compartment current balance",
        "tex": "\\frac{dV}{dt}=\\frac{I-V/R}{C}",
        "note": "Passive isopotential compartment, rest-relative voltage."
      },
      {
        "name": "Passive charging",
        "tex": "V(t)=IR(1-e^{-t/(RC)})",
        "note": "Resting initial condition, constant passive step current."
      },
      {
        "name": "Passive discharge",
        "tex": "V(t)=V_0e^{-t/\\tau_m}",
        "note": "Isopotential passive compartment; no continuing input."
      },
      {
        "name": "Matched parent diameter",
        "tex": "d_P=\\left(\\sum_jd_j^{3/2}\\right)^{2/3}",
        "note": "Common linear membrane material, matched equivalent continuations."
      },
      {
        "name": "Semi-infinite input conductance",
        "tex": "G_\\infty=\\frac{\\pi d^{3/2}}{2\\sqrt{R_iR_m}}",
        "note": "End-driven uniform semi-infinite passive cylinder, negligible external resistance."
      },
      {
        "name": "One-arm input resistance",
        "tex": "R_\\infty=\\frac{1}{G_\\infty}=r_i\\lambda",
        "note": "End-driven one-arm semi-infinite passive cable."
      },
      {
        "name": "Daughter conductance sum",
        "tex": "G_P=G_1+G_2",
        "note": "Passive equivalent daughter loads at one branch point."
      },
      {
        "name": "Several equivalent stems",
        "tex": "d_{eq}=\\left(\\sum_jd_j^{3/2}\\right)^{2/3}",
        "note": "Common material, matched node conditions and identical finite endpoint length when finite."
      },
      {
        "name": "Sealed terminal fraction",
        "tex": "f=\\frac{V(L)}{V(0)}=\\frac{1}{\\cosh L}",
        "note": "Steady passive sealed cylinder at fixed origin voltage."
      },
      {
        "name": "Infer sealed electrotonic length",
        "tex": "L=\\operatorname{acosh}(1/f)",
        "note": "Steady sealed cylinder; distinguish loss from remaining fraction."
      },
      {
        "name": "Finite sealed conductance",
        "tex": "G_N=G_\\infty\\tanh L",
        "note": "Uniform finite passive cylinder, sealed tip."
      },
      {
        "name": "Finite sealed resistance",
        "tex": "R_N=R_\\infty\\coth L",
        "note": "Same one-arm source convention and sealed finite cylinder."
      },
      {
        "name": "Local length constant",
        "tex": "\\lambda=\\sqrt{\\frac{R_md}{4R_i}}",
        "note": "Uniform passive cylinder, negligible return resistance."
      },
      {
        "name": "Complete electrotonic path",
        "tex": "L_{path}=\\sum_j\\frac{\\ell_j}{\\lambda_j}",
        "note": "Use the actual connected soma-to-tip segments."
      },
      {
        "name": "Dendritic-to-somatic ratio",
        "tex": "\\rho=G_D/G_S",
        "note": "Steady passive loads sharing the somatic voltage."
      },
      {
        "name": "Total somatic input conductance",
        "tex": "G_N=G_D+G_S=G_S(1+\\rho)",
        "note": "Passive loads in parallel at the soma."
      },
      {
        "name": "Steady dendritic current fraction",
        "tex": "f_D=\\frac{\\rho}{1+\\rho}",
        "note": "Steady state only, common voltage and no capacitive current."
      },
      {
        "name": "Local membrane time constant",
        "tex": "\\tau_m=R_mC_m",
        "note": "Uniform linear membrane, consistent area normalization."
      },
      {
        "name": "Characteristic passive speed",
        "tex": "\\theta=\\frac{2\\lambda}{\\tau_m}",
        "note": "Taught half-rise approximation; not exact peak latency or active conduction."
      },
      {
        "name": "Characteristic transit estimate",
        "tex": "t_{est}=\\ell/\\theta",
        "note": "Characteristic estimate only, not proof of identical EPSP dynamics."
      },
      {
        "name": "Retune membrane resistance",
        "tex": "R_{m,new}=R_{m,old}\\left(\\frac{\\theta_{old}}{\\theta_{new}}\\right)^2",
        "note": "Change only specific membrane resistance; this can break common-material Rall assumptions."
      },
      {
        "name": "Membrane time constant",
        "tex": "\\tau_m=R_mC_m",
        "note": "Earlier taught relation, used with geometry in Exercise5."
      },
      {
        "name": "Characteristic passive speed",
        "tex": "\\theta=2\\lambda/\\tau_m",
        "note": "Supplied exam p4; approximate characteristic timing, not exact EPSP latency."
      },
      {
        "name": "Resistance retuning at fixed geometry and capacitance",
        "tex": "R_{m,new}=R_{m,old}(\\theta_{old}/\\theta_{new})^2",
        "note": "Exercise5 1c algebra; changing one branch also breaks common material assumptions."
      }
    ],
    "constants": [
      {
        "name": "Geometry and source convention",
        "tex": "a=d/2,\\quad r_i=R_i/(\\pi a^2),\\quad r_m=R_m/(2\\pi a)"
      }
    ],
    "conventions": [
      "$V_m=V_{in}-V_{out}$ with $V_{out}=0$; passive cable $V=V_m-V_{rest}$.",
      "Positive ionic membrane current is outward; positive supplied current in these passive questions depolarizes.",
      "One-arm source: $R_\\infty=r_i\\lambda$; two equal arms: $R_N=r_i\\lambda/2$.",
      "Open cable end means short-circuited voltage; sealed end means zero axial current.",
      "Use remaining fraction after attenuation, not percent loss.",
      "Finite equivalent stems need common total electrotonic endpoint length.",
      "Shared late decay does not mean identical entire waveforms.",
      "Source model panels are supplied teaching figures; numerical practice scenarios are authored idealizations, not fabricated recordings."
    ]
  },
  "lectureQuiz": [
    {
      "id": "L05-core-synapse-type",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "chemical",
      "prompt": "Which mechanism carries the signal across a chemical synapse?",
      "options": [
        {
          "text": "Transmitter diffuses across a cleft",
          "feedback": "Vesicles release transmitter, which binds receptors on the receiving cell."
        },
        {
          "text": "Ions flow through gap junctions",
          "feedback": "Gap junctions carry current between cells at electrical synapses."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Calcium enters the presynaptic terminal and triggers vesicular release."
        },
        {
          "body": "Follow the substance that leaves the vesicle after fusion."
        }
      ],
      "modelAnswer": [
        "Vesicles release transmitter, which binds receptors on the receiving cell."
      ]
    },
    {
      "id": "L05-core-sealed-condition",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "assumptions",
      "prompt": "What vanishes at a sealed cable tip?",
      "options": [
        {
          "text": "Voltage increment at the tip",
          "feedback": "A tip held at rest has zero voltage increment."
        },
        {
          "text": "Current at the stimulus site",
          "feedback": "An injected current still enters at the origin."
        },
        {
          "text": "Axial current at the tip",
          "feedback": "No axial current crosses the sealed boundary."
        }
      ],
      "correct": 2,
      "hints": [
        {
          "body": "A sealed tip imposes a zero voltage gradient."
        },
        {
          "body": "Apply the no-flow condition at the distal boundary."
        }
      ],
      "modelAnswer": [
        "No axial current crosses the sealed boundary."
      ]
    },
    {
      "id": "L05-functional-facts",
      "sectionId": "functional",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "The cable model adds passive spatial spread.",
          "answer": true
        },
        {
          "text": "The HH model is a linear passive circuit.",
          "answer": false,
          "correction": "HH represents nonlinear active spike behavior."
        }
      ],
      "hints": [
        {
          "body": "Check one claim at a time against the source distinction."
        },
        {
          "body": "For a false claim, replace only the incorrect link, not the entire mechanism."
        }
      ],
      "modelAnswer": [
        "The cable model adds passive spatial spread.",
        "HH represents nonlinear active spike behavior."
      ],
      "points": 1,
      "source": "L05 PDF 2"
    },
    {
      "id": "L05-direct-ionic",
      "practice": "extra",
      "sectionId": "functional",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $g_i=2\\times10^{-9}\\,\\mathrm{S}$ and $V_m-E_i=-0.03\\,\\mathrm{V}$. Find outward current.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Conductance",
              "answer": {
                "value": 2e-09,
                "unit": "S",
                "tolerance": 2e-15,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 2e-09,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Driving force",
              "answer": {
                "value": -0.03,
                "unit": "V",
                "tolerance": 3e-08,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -0.03,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": -6e-11,
            "unit": "A",
            "tolerance": 1.8e-13,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 2e-09,
                "b": -0.03
              },
              "displayScale": 1
            }
          },
          "tex": "I_i=g_i(V_m-E_i)",
          "modelAnswer": [
            "Current follows conductance times signed driving force.",
            "$I_i=(2\\times10^{-9}\\,\\mathrm{S})(-0.03\\,\\mathrm{V})$",
            "$-6e-11\\,\\text{A}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "Current follows conductance times signed driving force."
            },
            {
              "label": "Use the result even if its units or the stated passive conditions do not apply."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Current follows conductance times signed driving force."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $I_i=g_i(V_m-E_i)$."
        },
        {
          "body": "Start with $I_i=(2\\times10^{-9}\\,\\mathrm{S})(-0.03\\,\\mathrm{V})$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Current follows conductance times signed driving force."
      ],
      "points": 1,
      "source": "L05 PDF 2"
    },
    {
      "id": "L05-structure-facts",
      "sectionId": "structure",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "A single electrical compartment is isopotential.",
          "answer": true
        },
        {
          "text": "A structural compartment model must preserve every biological branch.",
          "answer": false,
          "correction": "Compartment models may simplify structure while preserving the behavior being tested."
        }
      ],
      "hints": [
        {
          "body": "Check one claim at a time against the source distinction."
        },
        {
          "body": "For a false claim, replace only the incorrect link, not the entire mechanism."
        }
      ],
      "modelAnswer": [
        "A single electrical compartment is isopotential.",
        "Compartment models may simplify structure while preserving the behavior being tested."
      ],
      "points": 1,
      "source": "L05 PDF 3"
    },
    {
      "id": "L05-lumped-facts",
      "sectionId": "lumped",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "Matching two-site traces support a lumped approximation for that test.",
          "answer": true
        },
        {
          "text": "A physically short cell is isopotential at every timescale.",
          "answer": false,
          "correction": "Electrical size and timescale must be checked."
        }
      ],
      "hints": [
        {
          "body": "Check one claim at a time against the source distinction."
        },
        {
          "body": "For a false claim, replace only the incorrect link, not the entire mechanism."
        }
      ],
      "modelAnswer": [
        "Matching two-site traces support a lumped approximation for that test.",
        "Electrical size and timescale must be checked."
      ],
      "points": 1,
      "source": "L05 PDF 4"
    },
    {
      "id": "L05-one-facts",
      "sectionId": "one",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "Capacitive current vanishes at steady voltage.",
          "answer": true
        },
        {
          "text": "A single isopotential compartment predicts internal propagation delay.",
          "answer": false,
          "correction": "One compartment has no internal spatial propagation."
        }
      ],
      "hints": [
        {
          "body": "Check one claim at a time against the source distinction."
        },
        {
          "body": "For a false claim, replace only the incorrect link, not the entire mechanism."
        }
      ],
      "modelAnswer": [
        "Capacitive current vanishes at steady voltage.",
        "One compartment has no internal spatial propagation."
      ],
      "points": 1,
      "source": "L05 PDF 6"
    },
    {
      "id": "L05-direct-balance",
      "practice": "extra",
      "sectionId": "one",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "After subtracting leak from supplied current, $20\\,\\mathrm{pA}$ remains. With $C=10\\,\\mathrm{pF}$ find $dV/dt$.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Net charging current",
              "answer": {
                "value": 2e-11,
                "unit": "A",
                "tolerance": 1.9999999999999998e-17,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 2e-11,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Capacitance",
              "answer": {
                "value": 1e-11,
                "unit": "F",
                "tolerance": 9.999999999999999e-18,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1e-11,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 2.0,
            "unit": "V/s",
            "tolerance": 0.006,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 2e-11,
                "b": 1e-11
              },
              "displayScale": 1
            }
          },
          "tex": "\\frac{dV}{dt}=\\frac{I-V/R}{C}",
          "modelAnswer": [
            "Supplied current not carried by leak charges the capacitance.",
            "$dV/dt=(20\\times10^{-12}\\,\\mathrm{A})/(10\\times10^{-12}\\,\\mathrm{F})$",
            "$2\\,\\text{V/s}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "Supplied current not carried by leak charges the capacitance."
            },
            {
              "label": "Use the result even if its units or the stated passive conditions do not apply."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Supplied current not carried by leak charges the capacitance."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\frac{dV}{dt}=\\frac{I-V/R}{C}$."
        },
        {
          "body": "Start with $dV/dt=(20\\times10^{-12}\\,\\mathrm{A})/(10\\times10^{-12}\\,\\mathrm{F})$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Supplied current not carried by leak charges the capacitance."
      ],
      "points": 1,
      "source": "L05 PDF 6"
    },
    {
      "id": "L05-direct-charging",
      "practice": "extra",
      "sectionId": "one",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $I=5\\times10^{-11}\\,\\mathrm{A}$, $R=10^8\\,\\Omega$, $C=10^{-10}\\,\\mathrm{F}$ and $t=0.01\\,\\mathrm{s}$. Find voltage increment.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Current",
              "answer": {
                "value": 5e-11,
                "unit": "A",
                "tolerance": 5e-17,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 5e-11,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Resistance",
              "answer": {
                "value": 100000000.0,
                "unit": "ohm",
                "tolerance": 100.0,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 100000000.0,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Capacitance",
              "answer": {
                "value": 1e-10,
                "unit": "F",
                "tolerance": 1e-16,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1e-10,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Time",
              "answer": {
                "value": 0.01,
                "unit": "s",
                "tolerance": 1e-08,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.01,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 0.003160602794142788,
            "unit": "V",
            "tolerance": 9.481808382428365e-06,
            "verification": {
              "relation": "charging",
              "inputs": {
                "i": 5e-11,
                "r": 100000000.0,
                "c": 1e-10,
                "t": 0.01
              },
              "displayScale": 1
            }
          },
          "tex": "V(t)=IR(1-e^{-t/(RC)})",
          "modelAnswer": [
            "Voltage approaches the steady current-resistance product.",
            "$V=(50\\times10^{-12}\\,\\mathrm{A})(10^8\\,\\Omega)(1-e^{-1})$",
            "$0.0031606028\\,\\text{V}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "Voltage approaches the steady current-resistance product."
            },
            {
              "label": "Use the result even if its units or the stated passive conditions do not apply."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Voltage approaches the steady current-resistance product."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $V(t)=IR(1-e^{-t/(RC)})$."
        },
        {
          "body": "Start with $V=(50\\times10^{-12}\\,\\mathrm{A})(10^8\\,\\Omega)(1-e^{-1})$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Voltage approaches the steady current-resistance product."
      ],
      "points": 1,
      "source": "L05 PDF 6"
    },
    {
      "id": "L05-direct-decay",
      "practice": "extra",
      "sectionId": "one",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $V_0=-0.004\\,\\mathrm{V}$, $t=0.02\\,\\mathrm{s}$ and $\\tau_m=0.01\\,\\mathrm{s}$. Find the signed increment.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Initial increment",
              "answer": {
                "value": -0.004,
                "unit": "V",
                "tolerance": 4e-09,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -0.004,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Elapsed time",
              "answer": {
                "value": 0.02,
                "unit": "s",
                "tolerance": 2e-08,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.02,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Time constant",
              "answer": {
                "value": 0.01,
                "unit": "s",
                "tolerance": 1e-08,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.01,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": -0.0005413411329464508,
            "unit": "V",
            "tolerance": 1.6240233988393525e-06,
            "verification": {
              "relation": "passiveDecay",
              "inputs": {
                "v": -0.004,
                "time": 0.02,
                "tau": 0.01
              },
              "displayScale": 1
            }
          },
          "tex": "V(t)=V_0e^{-t/\\tau_m}",
          "modelAnswer": [
            "After input ends, passive voltage relaxes toward rest.",
            "$V=(-0.004\\,\\mathrm{V})e^{-2}$",
            "$-0.00054134113\\,\\text{V}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "After input ends, passive voltage relaxes toward rest."
            },
            {
              "label": "Use the result even if its units or the stated passive conditions do not apply."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "After input ends, passive voltage relaxes toward rest."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $V(t)=V_0e^{-t/\\tau_m}$."
        },
        {
          "body": "Start with $V=(-0.004\\,\\mathrm{V})e^{-2}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "After input ends, passive voltage relaxes toward rest."
      ],
      "points": 1,
      "source": "L05 PDF 6"
    },
    {
      "id": "L05-chemical-facts",
      "sectionId": "chemical",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "Presynaptic $\\mathrm{Ca}^{2+}$ entry precedes vesicle release.",
          "answer": true
        },
        {
          "text": "Calcium itself crosses the cleft to gate postsynaptic receptors.",
          "answer": false,
          "correction": "Released transmitter crosses the cleft and binds postsynaptic receptors."
        }
      ],
      "hints": [
        {
          "body": "Check one claim at a time against the source distinction."
        },
        {
          "body": "For a false claim, replace only the incorrect link, not the entire mechanism."
        }
      ],
      "modelAnswer": [
        "Presynaptic $\\mathrm{Ca}^{2+}$ entry precedes vesicle release.",
        "Released transmitter crosses the cleft and binds postsynaptic receptors."
      ],
      "points": 1,
      "source": "L05 PDF 9"
    },
    {
      "id": "L05-receptors-facts",
      "sectionId": "receptors",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "Ionotropic receptors directly gate channels.",
          "answer": true
        },
        {
          "text": "A miniature postsynaptic potential is an axonal all-or-none spike.",
          "answer": false,
          "correction": "A miniature event is a graded postsynaptic response associated with one vesicle."
        }
      ],
      "hints": [
        {
          "body": "Check one claim at a time against the source distinction."
        },
        {
          "body": "For a false claim, replace only the incorrect link, not the entire mechanism."
        }
      ],
      "modelAnswer": [
        "Ionotropic receptors directly gate channels.",
        "A miniature event is a graded postsynaptic response associated with one vesicle."
      ],
      "points": 1,
      "source": "L05 PDF 10"
    },
    {
      "id": "L05-graded-facts",
      "sectionId": "graded",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "Axonal propagation combines passive spread and active regeneration.",
          "answer": true
        },
        {
          "text": "Myelinated axonal propagation is decremental passive spread only.",
          "answer": false,
          "correction": "The slide identifies myelinated propagation as saltatory and nondecremental, with active regeneration."
        }
      ],
      "hints": [
        {
          "body": "Check one claim at a time against the source distinction."
        },
        {
          "body": "For a false claim, replace only the incorrect link, not the entire mechanism."
        }
      ],
      "modelAnswer": [
        "Axonal propagation combines passive spread and active regeneration.",
        "The slide identifies myelinated propagation as saltatory and nondecremental, with active regeneration."
      ],
      "points": 1,
      "source": "L05 PDF 11"
    },
    {
      "id": "L05-dendritic-facts",
      "sectionId": "dendritic",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "Local dendritic spikes can involve sodium or calcium channels.",
          "answer": true
        },
        {
          "text": "Every local dendritic spike reaches the soma.",
          "answer": false,
          "correction": "Dendritic spikes may remain local and may fail to reach somatic or axonal threshold."
        }
      ],
      "hints": [
        {
          "body": "Check one claim at a time against the source distinction."
        },
        {
          "body": "For a false claim, replace only the incorrect link, not the entire mechanism."
        }
      ],
      "modelAnswer": [
        "Local dendritic spikes can involve sodium or calcium channels.",
        "Dendritic spikes may remain local and may fail to reach somatic or axonal threshold."
      ],
      "points": 1,
      "source": "L05 PDF 12–13"
    },
    {
      "id": "L05-atype-facts",
      "sectionId": "atype",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "Outward $\\mathrm{K}^{+}$ current can oppose dendritic depolarization.",
          "answer": true
        },
        {
          "text": "Backpropagating spikes must regenerate indefinitely as echoes.",
          "answer": false,
          "correction": "Passive loss and channel-dependent damping limit repeated excitation."
        }
      ],
      "hints": [
        {
          "body": "Check one claim at a time against the source distinction."
        },
        {
          "body": "For a false claim, replace only the incorrect link, not the entire mechanism."
        }
      ],
      "modelAnswer": [
        "Outward $\\mathrm{K}^{+}$ current can oppose dendritic depolarization.",
        "Passive loss and channel-dependent damping limit repeated excitation."
      ],
      "points": 1,
      "source": "L05 PDF 15"
    },
    {
      "id": "L05-morphology-facts",
      "sectionId": "morphology",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "Synapses change conductance locally in a branching tree.",
          "answer": true
        },
        {
          "text": "Total dendritic length is the same as every soma-to-tip path length.",
          "answer": false,
          "correction": "Total tree length sums branches; each path includes only the segments on that route."
        }
      ],
      "hints": [
        {
          "body": "Check one claim at a time against the source distinction."
        },
        {
          "body": "For a false claim, replace only the incorrect link, not the entire mechanism."
        }
      ],
      "modelAnswer": [
        "Synapses change conductance locally in a branching tree.",
        "Total tree length sums branches; each path includes only the segments on that route."
      ],
      "points": 1,
      "source": "L05 PDF 16–17"
    },
    {
      "id": "L05-direct-diameter",
      "sectionId": "matching",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Two daughters each have diameter $10^{-6}\\,\\mathrm{m}$. Find the matched parent diameter.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "First daughter",
              "answer": {
                "value": 1e-06,
                "unit": "m",
                "tolerance": 1e-12,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1e-06,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Second daughter",
              "answer": {
                "value": 1e-06,
                "unit": "m",
                "tolerance": 1e-12,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1e-06,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 1.5874010519681995e-06,
            "unit": "m",
            "tolerance": 4.762203155904598e-09,
            "verification": {
              "relation": "rallDiameter",
              "inputs": {
                "diameters": [
                  1e-06,
                  1e-06
                ]
              },
              "displayScale": 1
            }
          },
          "tex": "d_P=\\left(\\sum_jd_j^{3/2}\\right)^{2/3}",
          "modelAnswer": [
            "Conductance-equivalent branches combine by a three-halves power.",
            "$d_P=[(10^{-6}\\,\\mathrm{m})^{3/2}+(10^{-6}\\,\\mathrm{m})^{3/2}]^{2/3}$",
            "$1.5874011e-06\\,\\text{m}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "Conductance-equivalent branches combine by a three-halves power."
            },
            {
              "label": "Use the result even if its units or the stated passive conditions do not apply."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Conductance-equivalent branches combine by a three-halves power."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $d_P=\\left(\\sum_jd_j^{3/2}\\right)^{2/3}$."
        },
        {
          "body": "Start with $d_P=[(10^{-6}\\,\\mathrm{m})^{3/2}+(10^{-6}\\,\\mathrm{m})^{3/2}]^{2/3}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Conductance-equivalent branches combine by a three-halves power."
      ],
      "points": 1,
      "source": "L05 PDF 20"
    },
    {
      "id": "L05-assumptions-facts",
      "sectionId": "assumptions",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "Rall finite sealed reduction requires equal electrotonic endpoint paths.",
          "answer": true
        },
        {
          "text": "The radial assumption prohibits transmembrane leak current.",
          "answer": false,
          "correction": "It neglects internal transverse voltage gradients, not transmembrane current."
        }
      ],
      "hints": [
        {
          "body": "Check one claim at a time against the source distinction."
        },
        {
          "body": "For a false claim, replace only the incorrect link, not the entire mechanism."
        }
      ],
      "modelAnswer": [
        "Rall finite sealed reduction requires equal electrotonic endpoint paths.",
        "It neglects internal transverse voltage gradients, not transmembrane current."
      ],
      "points": 1,
      "source": "L05 PDF 21"
    },
    {
      "id": "L05-direct-ginf",
      "sectionId": "semi",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $d=4\\times10^{-6}\\,\\mathrm{m}$, $R_i=1\\,\\Omega\\,\\mathrm{m}$ and $R_m=1\\,\\Omega\\,\\mathrm{m}^2$. Find one-arm conductance.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Diameter",
              "answer": {
                "value": 4e-06,
                "unit": "m",
                "tolerance": 4e-12,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 4e-06,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Axial resistivity",
              "answer": {
                "value": 1,
                "unit": "ohm*m",
                "tolerance": 1e-06,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Specific resistance",
              "answer": {
                "value": 1,
                "unit": "ohm*m2",
                "tolerance": 1e-06,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 1.2566370614359173e-08,
            "unit": "S",
            "tolerance": 3.769911184307752e-11,
            "verification": {
              "relation": "rallConductance",
              "inputs": {
                "diameter": 4e-06,
                "ri": 1,
                "rm": 1
              },
              "displayScale": 1
            }
          },
          "tex": "G_\\infty=\\frac{\\pi d^{3/2}}{2\\sqrt{R_iR_m}}",
          "modelAnswer": [
            "A thicker one-arm cable draws more current per source voltage.",
            "$G_\\infty=\\pi(4\\times10^{-6}\\,\\mathrm{m})^{3/2}/(2\\sqrt{(1\\,\\Omega\\,\\mathrm{m})(1\\,\\Omega\\,\\mathrm{m}^2)})$",
            "$1.2566371e-08\\,\\text{S}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "A thicker one-arm cable draws more current per source voltage."
            },
            {
              "label": "Use the result even if its units or the stated passive conditions do not apply."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "A thicker one-arm cable draws more current per source voltage."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $G_\\infty=\\frac{\\pi d^{3/2}}{2\\sqrt{R_iR_m}}$."
        },
        {
          "body": "Start with $G_\\infty=\\pi(4\\times10^{-6}\\,\\mathrm{m})^{3/2}/(2\\sqrt{(1\\,\\Omega\\,\\mathrm{m})(1\\,\\Omega\\,\\mathrm{m}^2)})$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "A thicker one-arm cable draws more current per source voltage."
      ],
      "points": 1,
      "source": "L05 PDF 22"
    },
    {
      "id": "L05-direct-rinf",
      "practice": "extra",
      "sectionId": "semi",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "A one-arm conductance is $10^{-8}\\,\\mathrm{S}$. Find input resistance.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Conductance",
              "answer": {
                "value": 1e-08,
                "unit": "S",
                "tolerance": 1e-14,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1e-08,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 100000000.0,
            "unit": "ohm",
            "tolerance": 300000.0,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 1,
                "b": 1e-08
              },
              "displayScale": 1
            }
          },
          "tex": "R_\\infty=\\frac{1}{G_\\infty}=r_i\\lambda",
          "modelAnswer": [
            "Resistance and conductance are reciprocal for one source geometry.",
            "$R_\\infty=1/(10^{-8}\\,\\mathrm{S})$",
            "$1e+08\\,\\text{ohm}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "Resistance and conductance are reciprocal for one source geometry."
            },
            {
              "label": "Use the result even if its units or the stated passive conditions do not apply."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Resistance and conductance are reciprocal for one source geometry."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $R_\\infty=\\frac{1}{G_\\infty}=r_i\\lambda$."
        },
        {
          "body": "Start with $R_\\infty=1/(10^{-8}\\,\\mathrm{S})$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Resistance and conductance are reciprocal for one source geometry."
      ],
      "points": 1,
      "source": "L05 PDF 22"
    },
    {
      "id": "L05-recursive-facts",
      "sectionId": "recursive",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "Distinct daughter conductances add at a common voltage.",
          "answer": true
        },
        {
          "text": "A matched distal bifurcation proves all finite-tip paths equal.",
          "answer": false,
          "correction": "Path equality must be checked separately over complete routes."
        }
      ],
      "hints": [
        {
          "body": "Check one claim at a time against the source distinction."
        },
        {
          "body": "For a false claim, replace only the incorrect link, not the entire mechanism."
        }
      ],
      "modelAnswer": [
        "Distinct daughter conductances add at a common voltage.",
        "Path equality must be checked separately over complete routes."
      ],
      "points": 1,
      "source": "L05 PDF 23–25"
    },
    {
      "id": "L05-direct-parallel",
      "practice": "extra",
      "sectionId": "recursive",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Daughter input conductances are $3\\,\\mathrm{nS}$ and $5\\,\\mathrm{nS}$. Find their combined conductance.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "First conductance",
              "answer": {
                "value": 3e-09,
                "unit": "S",
                "tolerance": 3e-15,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 3e-09,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Second conductance",
              "answer": {
                "value": 5e-09,
                "unit": "S",
                "tolerance": 5e-15,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 5e-09,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 8e-09,
            "unit": "S",
            "tolerance": 2.4e-11,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": 3e-09,
                "b": 5e-09
              },
              "displayScale": 1
            }
          },
          "tex": "G_P=G_1+G_2",
          "modelAnswer": [
            "At common voltage, parallel loads add their currents.",
            "$G_P=(3+5)\\,\\mathrm{nS}$",
            "$8e-09\\,\\text{S}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "At common voltage, parallel loads add their currents."
            },
            {
              "label": "Use the result even if its units or the stated passive conditions do not apply."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "At common voltage, parallel loads add their currents."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $G_P=G_1+G_2$."
        },
        {
          "body": "Start with $G_P=(3+5)\\,\\mathrm{nS}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "At common voltage, parallel loads add their currents."
      ],
      "points": 1,
      "source": "L05 PDF 23–25"
    },
    {
      "id": "L05-stems-facts",
      "sectionId": "stems",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "Not every neuron class has a tree obeying the rule exactly.",
          "answer": true
        },
        {
          "text": "Equivalent stem diameters add directly.",
          "answer": false,
          "correction": "Their three-halves powers add under the shared-material and endpoint assumptions."
        }
      ],
      "hints": [
        {
          "body": "Check one claim at a time against the source distinction."
        },
        {
          "body": "For a false claim, replace only the incorrect link, not the entire mechanism."
        }
      ],
      "modelAnswer": [
        "Not every neuron class has a tree obeying the rule exactly.",
        "Their three-halves powers add under the shared-material and endpoint assumptions."
      ],
      "points": 1,
      "source": "L05 PDF 26"
    },
    {
      "id": "L05-direct-stems",
      "sectionId": "stems",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Three equivalent stems each have diameter $2\\,\\mu\\mathrm{m}$. Find their combined diameter.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Each stem diameter",
              "answer": {
                "value": 2e-06,
                "unit": "m",
                "tolerance": 2e-12,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 2e-06,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 4.160167646103812e-06,
            "unit": "m",
            "tolerance": 1.2480502938311436e-08,
            "verification": {
              "relation": "rallDiameter",
              "inputs": {
                "diameters": [
                  2e-06,
                  2e-06,
                  2e-06
                ]
              },
              "displayScale": 1
            }
          },
          "tex": "d_{eq}=\\left(\\sum_jd_j^{3/2}\\right)^{2/3}",
          "modelAnswer": [
            "Equivalent stem loads add through the same material prefactor.",
            "$d_{eq}=[3(2\\times10^{-6}\\,\\mathrm{m})^{3/2}]^{2/3}$",
            "$4.1601676e-06\\,\\text{m}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "Equivalent stem loads add through the same material prefactor."
            },
            {
              "label": "Use the result even if its units or the stated passive conditions do not apply."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Equivalent stem loads add through the same material prefactor."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $d_{eq}=\\left(\\sum_jd_j^{3/2}\\right)^{2/3}$."
        },
        {
          "body": "Start with $d_{eq}=[3(2\\times10^{-6}\\,\\mathrm{m})^{3/2}]^{2/3}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Equivalent stem loads add through the same material prefactor."
      ],
      "points": 1,
      "source": "L05 PDF 26"
    },
    {
      "id": "L05-direct-terminal",
      "sectionId": "boundaries",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Find the remaining terminal fraction for a sealed cylinder with $L=0.8$.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Electrotonic length",
              "answer": {
                "value": 0.8,
                "unit": "",
                "tolerance": 8e-07,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.8,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 0.7476999182374195,
            "unit": "",
            "tolerance": 0.0022430997547122585,
            "verification": {
              "relation": "finiteCable",
              "inputs": {
                "v": 1,
                "length": 0.8,
                "x": 0.8,
                "load": 0,
                "mode": "load"
              },
              "displayScale": 1
            }
          },
          "tex": "f=\\frac{V(L)}{V(0)}=\\frac{1}{\\cosh L}",
          "modelAnswer": [
            "Sealed-tip attenuation depends on total electrotonic length.",
            "$f=1/\\cosh(0.8)$",
            "$0.74769992\\,\\text{}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "Sealed-tip attenuation depends on total electrotonic length."
            },
            {
              "label": "Use the result even if its units or the stated passive conditions do not apply."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Sealed-tip attenuation depends on total electrotonic length."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $f=\\frac{V(L)}{V(0)}=\\frac{1}{\\cosh L}$."
        },
        {
          "body": "Start with $f=1/\\cosh(0.8)$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Sealed-tip attenuation depends on total electrotonic length."
      ],
      "points": 1,
      "source": "L05 PDF 27"
    },
    {
      "id": "L05-direct-inverse",
      "sectionId": "boundaries",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "The terminal retains fraction $0.8$ of the origin increment. Find $L$.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Remaining fraction",
              "answer": {
                "value": 0.8,
                "unit": "",
                "tolerance": 8e-07,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.8,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 0.6931471805599453,
            "unit": "",
            "tolerance": 0.002079441541679836,
            "verification": {
              "relation": "sealedLength",
              "inputs": {
                "fraction": 0.8
              },
              "displayScale": 1
            }
          },
          "tex": "L=\\operatorname{acosh}(1/f)",
          "modelAnswer": [
            "The measured remaining fraction determines a sealed-cylinder length.",
            "$L=\\operatorname{acosh}(1/0.8)$",
            "$0.69314718\\,\\text{}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "The measured remaining fraction determines a sealed-cylinder length."
            },
            {
              "label": "Use the result even if its units or the stated passive conditions do not apply."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The measured remaining fraction determines a sealed-cylinder length."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $L=\\operatorname{acosh}(1/f)$."
        },
        {
          "body": "Start with $L=\\operatorname{acosh}(1/0.8)$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "The measured remaining fraction determines a sealed-cylinder length."
      ],
      "points": 1,
      "source": "L05 PDF 27"
    },
    {
      "id": "L05-direct-finite-g",
      "sectionId": "finite",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $d=2\\times10^{-6}\\,\\mathrm{m}$, $R_i=1\\,\\Omega\\,\\mathrm{m}$, $R_m=2\\,\\Omega\\,\\mathrm{m}^2$ and $L=0.7$. Find sealed input conductance.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Diameter",
              "answer": {
                "value": 2e-06,
                "unit": "m",
                "tolerance": 2e-12,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 2e-06,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Axial resistivity",
              "answer": {
                "value": 1,
                "unit": "ohm*m",
                "tolerance": 1e-06,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Specific resistance",
              "answer": {
                "value": 2,
                "unit": "ohm*m2",
                "tolerance": 2e-06,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 2,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Electrotonic length",
              "answer": {
                "value": 0.7,
                "unit": "",
                "tolerance": 7e-07,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.7,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 1.898677368657675e-09,
            "unit": "S",
            "tolerance": 5.696032105973024e-12,
            "verification": {
              "relation": "rallConductance",
              "inputs": {
                "diameter": 2e-06,
                "ri": 1,
                "rm": 2,
                "length": 0.7
              },
              "displayScale": 1
            }
          },
          "tex": "G_N=G_\\infty\\tanh L",
          "modelAnswer": [
            "A sealed finite arm draws less steady current than an infinite continuation.",
            "$G_N=\\frac{\\pi(2\\times10^{-6}\\,\\mathrm{m})^{3/2}}{2\\sqrt{(1\\,\\Omega\\,\\mathrm{m})(2\\,\\Omega\\,\\mathrm{m}^2)}}\\tanh(0.7)$",
            "$1.8986774e-09\\,\\text{S}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "A sealed finite arm draws less steady current than an infinite continuation."
            },
            {
              "label": "Use the result even if its units or the stated passive conditions do not apply."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "A sealed finite arm draws less steady current than an infinite continuation."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $G_N=G_\\infty\\tanh L$."
        },
        {
          "body": "Start with $G_N=\\frac{\\pi(2\\times10^{-6}\\,\\mathrm{m})^{3/2}}{2\\sqrt{(1\\,\\Omega\\,\\mathrm{m})(2\\,\\Omega\\,\\mathrm{m}^2)}}\\tanh(0.7)$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "A sealed finite arm draws less steady current than an infinite continuation."
      ],
      "points": 1,
      "source": "L05 PDF 28"
    },
    {
      "id": "L05-direct-finite-r",
      "sectionId": "finite",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "A sealed cable has $R_\\infty=80\\,\\mathrm{M}\\Omega$ and $L=0.5$. Find $R_N$.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Semi-infinite resistance",
              "answer": {
                "value": 80000000.0,
                "unit": "ohm",
                "tolerance": 80.0,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 80000000.0,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Electrotonic length",
              "answer": {
                "value": 0.5,
                "unit": "",
                "tolerance": 5e-07,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.5,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 173116273.09909222,
            "unit": "ohm",
            "tolerance": 519348.81929727667,
            "verification": {
              "relation": "sealedResistance",
              "inputs": {
                "resistance": 80000000.0,
                "length": 0.5
              },
              "displayScale": 1
            }
          },
          "tex": "R_N=R_\\infty\\coth L",
          "modelAnswer": [
            "Finite sealed resistance is higher than the semi-infinite resistance.",
            "$R_N=(80\\,\\mathrm{M}\\Omega)/\\tanh(0.5)$",
            "$1.7311627e+08\\,\\text{ohm}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "Finite sealed resistance is higher than the semi-infinite resistance."
            },
            {
              "label": "Use the result even if its units or the stated passive conditions do not apply."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Finite sealed resistance is higher than the semi-infinite resistance."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $R_N=R_\\infty\\coth L$."
        },
        {
          "body": "Start with $R_N=(80\\,\\mathrm{M}\\Omega)/\\tanh(0.5)$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Finite sealed resistance is higher than the semi-infinite resistance."
      ],
      "points": 1,
      "source": "L05 PDF 28"
    },
    {
      "id": "L05-direct-lambda",
      "sectionId": "paths",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $R_m=2\\,\\Omega\\,\\mathrm{m}^2$, $d=2\\times10^{-6}\\,\\mathrm{m}$ and $R_i=1\\,\\Omega\\,\\mathrm{m}$. Find the length constant.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Specific resistance",
              "answer": {
                "value": 2,
                "unit": "ohm*m2",
                "tolerance": 2e-06,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 2,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Diameter",
              "answer": {
                "value": 2e-06,
                "unit": "m",
                "tolerance": 2e-12,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 2e-06,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Axial resistivity",
              "answer": {
                "value": 1,
                "unit": "ohm*m",
                "tolerance": 1e-06,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 0.001,
            "unit": "m",
            "tolerance": 3e-06,
            "verification": {
              "relation": "cableLength",
              "inputs": {
                "rm": 318309.8861837907,
                "ri": 318309886183.7907
              },
              "displayScale": 1
            }
          },
          "tex": "\\lambda=\\sqrt{\\frac{R_md}{4R_i}}",
          "modelAnswer": [
            "Thicker segments have larger spread scales at fixed material parameters.",
            "$\\lambda=\\sqrt{(2\\,\\Omega\\,\\mathrm{m}^2)(2\\times10^{-6}\\,\\mathrm{m})/(4\\,\\Omega\\,\\mathrm{m})}$",
            "$0.001\\,\\text{m}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "Thicker segments have larger spread scales at fixed material parameters."
            },
            {
              "label": "Use the result even if its units or the stated passive conditions do not apply."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Thicker segments have larger spread scales at fixed material parameters."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\lambda=\\sqrt{\\frac{R_md}{4R_i}}$."
        },
        {
          "body": "Start with $\\lambda=\\sqrt{(2\\,\\Omega\\,\\mathrm{m}^2)(2\\times10^{-6}\\,\\mathrm{m})/(4\\,\\Omega\\,\\mathrm{m})}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Thicker segments have larger spread scales at fixed material parameters."
      ],
      "points": 1,
      "source": "L05 PDF 29"
    },
    {
      "id": "L05-direct-path",
      "sectionId": "paths",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "A path has $\\ell_1=0.2\\,\\mathrm{mm}$, $\\lambda_1=1\\,\\mathrm{mm}$, $\\ell_2=0.3\\,\\mathrm{mm}$ and $\\lambda_2=0.5\\,\\mathrm{mm}$. Find total electrotonic length.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "First length",
              "answer": {
                "value": 0.0002,
                "unit": "m",
                "tolerance": 2e-10,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.0002,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "First scale",
              "answer": {
                "value": 0.001,
                "unit": "m",
                "tolerance": 1e-09,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.001,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Second length",
              "answer": {
                "value": 0.0003,
                "unit": "m",
                "tolerance": 2.9999999999999995e-10,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.0003,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Second scale",
              "answer": {
                "value": 0.0005,
                "unit": "m",
                "tolerance": 5e-10,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.0005,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 0.8,
            "unit": "",
            "tolerance": 0.0024000000000000002,
            "verification": {
              "relation": "pathLength",
              "inputs": {
                "segments": [
                  {
                    "length": 0.0002,
                    "lambda": 0.001
                  },
                  {
                    "length": 0.0003,
                    "lambda": 0.0005
                  }
                ]
              },
              "displayScale": 1
            }
          },
          "tex": "L_{path}=\\sum_j\\frac{\\ell_j}{\\lambda_j}",
          "modelAnswer": [
            "Each route sums normalized lengths, not all branches of the whole tree.",
            "$L_{path}=(0.2\\,\\mathrm{mm})/(1\\,\\mathrm{mm})+(0.3\\,\\mathrm{mm})/(0.5\\,\\mathrm{mm})$",
            "$0.8\\,\\text{}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "Each route sums normalized lengths, not all branches of the whole tree."
            },
            {
              "label": "Use the result even if its units or the stated passive conditions do not apply."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Each route sums normalized lengths, not all branches of the whole tree."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $L_{path}=\\sum_j\\frac{\\ell_j}{\\lambda_j}$."
        },
        {
          "body": "Start with $L_{path}=(0.2\\,\\mathrm{mm})/(1\\,\\mathrm{mm})+(0.3\\,\\mathrm{mm})/(0.5\\,\\mathrm{mm})$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Each route sums normalized lengths, not all branches of the whole tree."
      ],
      "points": 1,
      "source": "L05 PDF 29"
    },
    {
      "id": "L05-soma-facts",
      "sectionId": "soma",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "$\\rho=G_D/G_S$ can exceed unity.",
          "answer": true
        },
        {
          "text": "The dendritic current fraction equals $\\rho$.",
          "answer": false,
          "correction": "The steady dendritic current fraction is $\\rho/(1+\\rho)$."
        }
      ],
      "hints": [
        {
          "body": "Check one claim at a time against the source distinction."
        },
        {
          "body": "For a false claim, replace only the incorrect link, not the entire mechanism."
        }
      ],
      "modelAnswer": [
        "$\\rho=G_D/G_S$ can exceed unity.",
        "The steady dendritic current fraction is $\\rho/(1+\\rho)$."
      ],
      "points": 1,
      "source": "L05 PDF 31"
    },
    {
      "id": "L05-direct-rho",
      "sectionId": "soma",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $G_D=12\\,\\mathrm{nS}$ and $G_S=4\\,\\mathrm{nS}$. Find $\\rho$.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Dendritic conductance",
              "answer": {
                "value": 1.2e-08,
                "unit": "S",
                "tolerance": 1.2e-14,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1.2e-08,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Somatic conductance",
              "answer": {
                "value": 4e-09,
                "unit": "S",
                "tolerance": 4e-15,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 4e-09,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 3.0,
            "unit": "",
            "tolerance": 0.009000000000000001,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 1.2e-08,
                "b": 4e-09
              },
              "displayScale": 1
            }
          },
          "tex": "\\rho=G_D/G_S",
          "modelAnswer": [
            "The ratio compares two loads and is not a bounded fraction.",
            "$\\rho=(12\\,\\mathrm{nS})/(4\\,\\mathrm{nS})$",
            "$3\\,\\text{}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "The ratio compares two loads and is not a bounded fraction."
            },
            {
              "label": "Use the result even if its units or the stated passive conditions do not apply."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The ratio compares two loads and is not a bounded fraction."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\rho=G_D/G_S$."
        },
        {
          "body": "Start with $\\rho=(12\\,\\mathrm{nS})/(4\\,\\mathrm{nS})$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "The ratio compares two loads and is not a bounded fraction."
      ],
      "points": 1,
      "source": "L05 PDF 31"
    },
    {
      "id": "L05-direct-total",
      "practice": "extra",
      "sectionId": "soma",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $G_D=9\\,\\mathrm{nS}$ and $G_S=6\\,\\mathrm{nS}$. Find total input conductance.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Dendritic conductance",
              "answer": {
                "value": 9e-09,
                "unit": "S",
                "tolerance": 9e-15,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 9e-09,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Somatic conductance",
              "answer": {
                "value": 6e-09,
                "unit": "S",
                "tolerance": 6e-15,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 6e-09,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 1.5e-08,
            "unit": "S",
            "tolerance": 4.5e-11,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": 9e-09,
                "b": 6e-09
              },
              "displayScale": 1
            }
          },
          "tex": "G_N=G_D+G_S=G_S(1+\\rho)",
          "modelAnswer": [
            "Steady current divides between soma and dendritic loads.",
            "$G_N=(9+6)\\,\\mathrm{nS}$",
            "$1.5e-08\\,\\text{S}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "Steady current divides between soma and dendritic loads."
            },
            {
              "label": "Use the result even if its units or the stated passive conditions do not apply."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Steady current divides between soma and dendritic loads."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $G_N=G_D+G_S=G_S(1+\\rho)$."
        },
        {
          "body": "Start with $G_N=(9+6)\\,\\mathrm{nS}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Steady current divides between soma and dendritic loads."
      ],
      "points": 1,
      "source": "L05 PDF 31"
    },
    {
      "id": "L05-direct-fraction",
      "sectionId": "soma",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $\\rho=4$. Find the fraction of total steady supplied current flowing to dendrites.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Conductance ratio",
              "answer": {
                "value": 4,
                "unit": "",
                "tolerance": 4e-06,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 4,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 0.8,
            "unit": "",
            "tolerance": 0.0024000000000000002,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 4,
                "b": 5
              },
              "displayScale": 1
            }
          },
          "tex": "f_D=\\frac{\\rho}{1+\\rho}",
          "modelAnswer": [
            "A ratio above unity still corresponds to a current fraction below unity.",
            "$f_D=4/(1+4)$",
            "$0.8\\,\\text{}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "A ratio above unity still corresponds to a current fraction below unity."
            },
            {
              "label": "Use the result even if its units or the stated passive conditions do not apply."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "A ratio above unity still corresponds to a current fraction below unity."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $f_D=\\frac{\\rho}{1+\\rho}$."
        },
        {
          "body": "Start with $f_D=4/(1+4)$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "A ratio above unity still corresponds to a current fraction below unity."
      ],
      "points": 1,
      "source": "L05 PDF 31"
    },
    {
      "id": "L05-conductance-input-facts",
      "sectionId": "conductance-input",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "A synaptic conductance stimulus changes current as driving force changes.",
          "answer": true
        },
        {
          "text": "The lecture supplies an analytic alpha formula that must be used numerically.",
          "answer": false,
          "correction": "The deck uses the alpha-like shape qualitatively without an analytic formula."
        }
      ],
      "hints": [
        {
          "body": "Check one claim at a time against the source distinction."
        },
        {
          "body": "For a false claim, replace only the incorrect link, not the entire mechanism."
        }
      ],
      "modelAnswer": [
        "A synaptic conductance stimulus changes current as driving force changes.",
        "The deck uses the alpha-like shape qualitatively without an analytic formula."
      ],
      "points": 1,
      "source": "L05 PDF 33"
    },
    {
      "id": "L05-direct-tau",
      "practice": "extra",
      "sectionId": "exercise",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $R_m=1.5\\,\\Omega\\,\\mathrm{m}^2$ and $C_m=0.01\\,\\mathrm{F/m}^2$. Find time constant.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Specific resistance",
              "answer": {
                "value": 1.5,
                "unit": "ohm*m2",
                "tolerance": 1.5e-06,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1.5,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Specific capacitance",
              "answer": {
                "value": 0.01,
                "unit": "F/m2",
                "tolerance": 1e-08,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.01,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 0.015,
            "unit": "s",
            "tolerance": 4.4999999999999996e-05,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 1.5,
                "b": 0.01
              },
              "displayScale": 1
            }
          },
          "tex": "\\tau_m=R_mC_m",
          "modelAnswer": [
            "The local RC time product is independent of cylinder diameter.",
            "$\\tau_m=(1.5\\,\\Omega\\,\\mathrm{m}^2)(0.01\\,\\mathrm{F/m}^2)$",
            "$0.015\\,\\text{s}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "The local RC time product is independent of cylinder diameter."
            },
            {
              "label": "Use the result even if its units or the stated passive conditions do not apply."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The local RC time product is independent of cylinder diameter."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\tau_m=R_mC_m$."
        },
        {
          "body": "Start with $\\tau_m=(1.5\\,\\Omega\\,\\mathrm{m}^2)(0.01\\,\\mathrm{F/m}^2)$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "The local RC time product is independent of cylinder diameter."
      ],
      "points": 1,
      "source": "Exercise 5 p1–2, answers p1–2; L04 PDF2; L05 PDF29"
    },
    {
      "id": "L05-direct-speed",
      "sectionId": "exercise",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $\\lambda=0.0009\\,\\mathrm{m}$ and $\\tau_m=0.018\\,\\mathrm{s}$. Find characteristic speed.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Length constant",
              "answer": {
                "value": 0.0009,
                "unit": "m",
                "tolerance": 8.999999999999999e-10,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.0009,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Time constant",
              "answer": {
                "value": 0.018,
                "unit": "s",
                "tolerance": 1.8e-08,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.018,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 0.1,
            "unit": "m/s",
            "tolerance": 0.00030000000000000003,
            "verification": {
              "relation": "passiveSpeed",
              "inputs": {
                "lambda": 0.0009,
                "tau": 0.018
              },
              "displayScale": 1
            }
          },
          "tex": "\\theta=\\frac{2\\lambda}{\\tau_m}",
          "modelAnswer": [
            "Greater spatial scale and shorter relaxation give higher characteristic speed.",
            "$\\theta=2(0.0009\\,\\mathrm{m})/(0.018\\,\\mathrm{s})$",
            "$0.1\\,\\text{m/s}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "Greater spatial scale and shorter relaxation give higher characteristic speed."
            },
            {
              "label": "Use the result even if its units or the stated passive conditions do not apply."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Greater spatial scale and shorter relaxation give higher characteristic speed."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\theta=\\frac{2\\lambda}{\\tau_m}$."
        },
        {
          "body": "Start with $\\theta=2(0.0009\\,\\mathrm{m})/(0.018\\,\\mathrm{s})$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Greater spatial scale and shorter relaxation give higher characteristic speed."
      ],
      "points": 1,
      "source": "Exercise 5 p1–2, answers p1–2; L04 PDF2; L05 PDF29"
    },
    {
      "id": "L05-direct-transit",
      "sectionId": "exercise",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $\\ell=0.00012\\,\\mathrm{m}$ and $\\theta=0.06\\,\\mathrm{m/s}$. Find estimated transit.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Length",
              "answer": {
                "value": 0.00012,
                "unit": "m",
                "tolerance": 1.2e-10,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.00012,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Speed",
              "answer": {
                "value": 0.06,
                "unit": "m/s",
                "tolerance": 6e-08,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.06,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 0.002,
            "unit": "s",
            "tolerance": 6e-06,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 0.00012,
                "b": 0.06
              },
              "displayScale": 1
            }
          },
          "tex": "t_{est}=\\ell/\\theta",
          "modelAnswer": [
            "Longer routes take longer in this approximate transit convention.",
            "$t_{est}=(0.00012\\,\\mathrm{m})/(0.06\\,\\mathrm{m/s})$",
            "$0.002\\,\\text{s}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "Longer routes take longer in this approximate transit convention."
            },
            {
              "label": "Use the result even if its units or the stated passive conditions do not apply."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Longer routes take longer in this approximate transit convention."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $t_{est}=\\ell/\\theta$."
        },
        {
          "body": "Start with $t_{est}=(0.00012\\,\\mathrm{m})/(0.06\\,\\mathrm{m/s})$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Longer routes take longer in this approximate transit convention."
      ],
      "points": 1,
      "source": "Exercise 5 p1–2, answers p1–2; L04 PDF2; L05 PDF29"
    },
    {
      "id": "L05-direct-retune",
      "sectionId": "exercise",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $R_{m,old}=1.6\\,\\Omega\\,\\mathrm{m}^2$, $\\theta_{old}=0.06\\,\\mathrm{m/s}$ and $\\theta_{new}=0.12\\,\\mathrm{m/s}$. Find new resistance.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Old resistance",
              "answer": {
                "value": 1.6,
                "unit": "ohm*m2",
                "tolerance": 1.6e-06,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1.6,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Old speed",
              "answer": {
                "value": 0.06,
                "unit": "m/s",
                "tolerance": 6e-08,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.06,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Target speed",
              "answer": {
                "value": 0.12,
                "unit": "m/s",
                "tolerance": 1.2e-07,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.12,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 0.4,
            "unit": "ohm*m2",
            "tolerance": 0.0012000000000000001,
            "verification": {
              "relation": "resistanceRetune",
              "inputs": {
                "resistance": 1.6,
                "old": 0.06,
                "new": 0.12
              },
              "displayScale": 1
            }
          },
          "tex": "R_{m,new}=R_{m,old}\\left(\\frac{\\theta_{old}}{\\theta_{new}}\\right)^2",
          "modelAnswer": [
            "Higher characteristic speed requires lower resistance at fixed diameter and capacitance.",
            "$R_{m,new}=(1.6\\,\\Omega\\,\\mathrm{m}^2)(0.06/0.12)^2$",
            "$0.4\\,\\text{ohm*m2}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "Higher characteristic speed requires lower resistance at fixed diameter and capacitance."
            },
            {
              "label": "Use the result even if its units or the stated passive conditions do not apply."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Higher characteristic speed requires lower resistance at fixed diameter and capacitance."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $R_{m,new}=R_{m,old}\\left(\\frac{\\theta_{old}}{\\theta_{new}}\\right)^2$."
        },
        {
          "body": "Start with $R_{m,new}=(1.6\\,\\Omega\\,\\mathrm{m}^2)(0.06/0.12)^2$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Higher characteristic speed requires lower resistance at fixed diameter and capacitance."
      ],
      "points": 1,
      "source": "Exercise 5 p1–2, answers p1–2; L04 PDF2; L05 PDF29"
    },
    {
      "id": "L05-core-trace-test",
      "type": "mc",
      "difficulty": "medium",
      "sectionId": "lumped",
      "prompt": "Two recording sites have equal plateaus but different rising phases during the same current step. What does this support?",
      "options": [
        {
          "text": "A lumped approximation for the rising phase",
          "feedback": "The rising voltages differ between sites."
        },
        {
          "text": "A lumped approximation for steady state",
          "feedback": "The common plateau supports one voltage after the transient has decayed."
        },
        {
          "text": "A lumped approximation for the full step",
          "feedback": "Different rising phases require resolving spatial differences during the transient."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Compare the traces at equal times after step onset."
        },
        {
          "body": "Compare the early voltage difference with the late voltage difference."
        }
      ],
      "modelAnswer": [
        "The common plateau supports one voltage after the transient has decayed."
      ]
    },
    {
      "id": "L05-core-axial-direction",
      "type": "mc",
      "difficulty": "medium",
      "sectionId": "two",
      "prompt": "With $V_A=-60\\,\\mathrm{mV}$ and $V_B=-50\\,\\mathrm{mV}$, which way does positive charge flow through the axial resistor?",
      "options": [
        {
          "text": "From B to A",
          "feedback": "B is at the higher potential."
        },
        {
          "text": "From A to B",
          "feedback": "A is more negative than B, so the A-to-B current is negative."
        },
        {
          "text": "There is no axial flow",
          "feedback": "A nonzero voltage difference drives axial current."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Use the signed voltage difference across the resistor."
        },
        {
          "body": "Positive charge moves toward the lower electric potential."
        }
      ],
      "modelAnswer": [
        "B is at the higher potential."
      ]
    },
    {
      "id": "L05-core-driving-force",
      "type": "mc",
      "difficulty": "medium",
      "sectionId": "receptors",
      "prompt": "An ionotropic synapse opens with $V_m=-65\\,\\mathrm{mV}$ and $E_{syn}=-20\\,\\mathrm{mV}$. What is the initial net synaptic current?",
      "options": [
        {
          "text": "Outward and hyperpolarizing",
          "feedback": "An outward current would require voltage above this reversal potential."
        },
        {
          "text": "Zero at channel opening",
          "feedback": "The starting voltage and reversal potential differ."
        },
        {
          "text": "Inward and depolarizing",
          "feedback": "The driving force is negative, so the inward current drives voltage toward the more positive reversal potential."
        }
      ],
      "correct": 2,
      "hints": [
        {
          "body": "Evaluate $V_m-E_{syn}$ just as the channels open."
        },
        {
          "body": "With positive conductance, a negative driving force gives inward current."
        }
      ],
      "modelAnswer": [
        "The driving force is negative, so the inward current drives voltage toward the more positive reversal potential."
      ]
    },
    {
      "id": "L05-core-spike-origin",
      "practice": "extra",
      "type": "mc",
      "difficulty": "medium",
      "sectionId": "backprop",
      "prompt": "An aligned recording shows the spike first at the axon, then the soma, then a dendrite. Which process fits this order?",
      "options": [
        {
          "text": "A somatic spike spreading both ways",
          "feedback": "This would require somatic onset ahead of the axonal recording."
        },
        {
          "text": "An axonal spike invading the dendrite",
          "feedback": "The axonal onset precedes somatic and dendritic onset."
        },
        {
          "text": "A dendritic spike driving axonal firing",
          "feedback": "This would require the dendritic event to lead the axonal onset."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Use onset order at known sites to identify likely propagation direction."
        },
        {
          "body": "A signal invading from the axon should reach the axonal site first."
        }
      ],
      "modelAnswer": [
        "The axonal onset precedes somatic and dendritic onset."
      ]
    },
    {
      "id": "L05-core-filtered-trace",
      "practice": "extra",
      "type": "mc",
      "difficulty": "medium",
      "sectionId": "distance",
      "prompt": "At a fixed somatic electrode, the same small current waveform is injected first near the soma and then farther away along a passive dendrite. Which somatic response usually comes from the farther site?",
      "options": [
        {
          "text": "The smaller, later, broader response",
          "feedback": "Additional membrane leak and charging attenuate and broaden transfer."
        },
        {
          "text": "The smaller, earlier, narrower response",
          "feedback": "Leak lowers amplitude, but charging delays and broadens the response."
        },
        {
          "text": "The larger, later, broader response",
          "feedback": "A longer passive transfer path usually attenuates the peak."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Compare the stimulus-to-recording routes with input waveform held fixed."
        },
        {
          "body": "Charging each intervening segment filters fast changes as the signal spreads."
        }
      ],
      "modelAnswer": [
        "Additional membrane leak and charging attenuate and broaden transfer."
      ]
    },
    {
      "id": "L05-core-equal-daughters",
      "type": "mc",
      "difficulty": "medium",
      "sectionId": "matching",
      "prompt": "Two identical daughter cables of diameter $d$ have common passive properties and semi-infinite loads. Which parent diameter matches them?",
      "options": [
        {
          "text": "$2^{1/2}d$",
          "feedback": "This would match cross-sectional area."
        },
        {
          "text": "$2^{3/2}d$",
          "feedback": "Apply the inverse exponent after summing the conductance proxies."
        },
        {
          "text": "$2^{2/3}d$",
          "feedback": "Summing $2d^{3/2}$ and taking the $2/3$ power gives this diameter."
        }
      ],
      "correct": 2,
      "hints": [
        {
          "body": "Sum the daughter diameter powers before solving for the parent diameter."
        },
        {
          "body": "Solve $d_P^{3/2}=2d^{3/2}$ for $d_P$."
        }
      ],
      "modelAnswer": [
        "Summing $2d^{3/2}$ and taking the $2/3$ power gives this diameter."
      ]
    },
    {
      "id": "L05-core-remaining",
      "practice": "extra",
      "type": "mc",
      "difficulty": "medium",
      "sectionId": "boundaries",
      "prompt": "A sealed tip retains $50\\%$ of the steady origin increment. What is $\\cosh L$?",
      "options": [
        {
          "text": "$1$",
          "feedback": "This would mean the entire origin increment is retained."
        },
        {
          "text": "$2$",
          "feedback": "The remaining fraction is $1/\\cosh L$, so invert $0.5$."
        },
        {
          "text": "$0.5$",
          "feedback": "This is the retained fraction itself."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Use the sealed-end profile at the terminal position."
        },
        {
          "body": "Substitute $0.5$ for the ratio $V(L)/V_0$."
        }
      ],
      "modelAnswer": [
        "The remaining fraction is $1/\\cosh L$, so invert $0.5$."
      ]
    },
    {
      "id": "L05-core-compare-load",
      "practice": "extra",
      "type": "mc",
      "difficulty": "medium",
      "sectionId": "finite",
      "prompt": "How does the steady input conductance of a finite sealed arm compare with its semi-infinite continuation of the same diameter?",
      "options": [
        {
          "text": "It equals the infinite value times $\\tanh L$.",
          "feedback": "The finite sealed profile gives $G_N=G_\\infty\\tanh L$."
        },
        {
          "text": "It is higher by a factor of $\\coth L$.",
          "feedback": "The reciprocal factor applies to input resistance."
        },
        {
          "text": "It is equal at every finite length.",
          "feedback": "The loads converge only in the large-length limit."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Choose the terminal factor for conductance."
        },
        {
          "body": "For positive finite length, $\\tanh L$ lies between zero and one."
        }
      ],
      "modelAnswer": [
        "The finite sealed profile gives $G_N=G_\\infty\\tanh L$."
      ]
    },
    {
      "id": "L05-core-unequal-paths",
      "type": "mc",
      "difficulty": "medium",
      "sectionId": "paths",
      "prompt": "Every branch point passes the diameter rule. With sealed tips, the full paths have different electrotonic lengths. What follows?",
      "options": [
        {
          "text": "The exact finite reduction holds.",
          "feedback": "Local diameter matches alone cannot establish equal terminal paths."
        },
        {
          "text": "The tree is equivalent to an infinite cable.",
          "feedback": "A match at each branch does not remove the finite terminations."
        },
        {
          "text": "The exact finite reduction fails.",
          "feedback": "Equal complete routes are a separate condition."
        }
      ],
      "correct": 2,
      "hints": [
        {
          "body": "Check the local diameter and full path conditions separately."
        },
        {
          "body": "Measure the paths from the same origin and compare their dimensionless totals."
        }
      ],
      "modelAnswer": [
        "Equal complete routes are a separate condition."
      ]
    },
    {
      "id": "L05-core-load-fraction",
      "practice": "extra",
      "type": "mc",
      "difficulty": "medium",
      "sectionId": "soma",
      "prompt": "If the dendritic load is twice the somatic load, what fraction of the steady injected somatic current enters the tree?",
      "options": [
        {
          "text": "One third",
          "feedback": "This is the fraction crossing the somatic membrane."
        },
        {
          "text": "Two thirds",
          "feedback": "The tree contributes two of the three conductance units in parallel."
        },
        {
          "text": "One half",
          "feedback": "This would apply to equal dendritic and somatic loads."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Divide the dendritic load by the total load."
        },
        {
          "body": "Set the somatic load to one unit and the dendritic load to two units."
        }
      ],
      "modelAnswer": [
        "The tree contributes two of the three conductance units in parallel."
      ]
    },
    {
      "id": "L05-core-input-type",
      "practice": "extra",
      "type": "mc",
      "difficulty": "medium",
      "sectionId": "conductance-input",
      "prompt": "Why can two brief synaptic conductance inputs fail to sum exactly even below spike threshold?",
      "options": [
        {
          "text": "Each input can alter the other’s driving force.",
          "feedback": "Both currents depend on the shared changing voltage."
        },
        {
          "text": "Each input fixes the other’s driving force.",
          "feedback": "Fixed driving force would instead support an approximately linear response."
        },
        {
          "text": "Each input removes capacitive current.",
          "feedback": "Membrane capacitance still contributes while voltage changes."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Relate local synaptic current to conductance and driving force."
        },
        {
          "body": "The first input can move voltage away from the second input’s reversal potential."
        }
      ],
      "modelAnswer": [
        "Both currents depend on the shared changing voltage."
      ]
    },
    {
      "id": "L05-functional-reason",
      "sectionId": "functional",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Choose models for steady ionic current, a time-dependent whole-cell response and passive distance-dependent attenuation. Explain why the GHK/HH names are not interchangeable.",
      "hints": [
        {
          "body": "This tests functional model classes. Identify the source model and its controlled conditions."
        },
        {
          "body": "Start by asking whether the requested behavior changes with time, space, ionic concentrations or active regeneration."
        }
      ],
      "markScheme": [
        {
          "text": "Ohm or fixed parallel conductances give current versus driving force."
        },
        {
          "text": "A lumped RC model adds time dependence without spatial gradients."
        },
        {
          "text": "Cable/core conductor models represent passive spatial spread."
        },
        {
          "text": "GHK concerns concentration/permeability relations; HH concerns active nonlinear spike generation."
        }
      ],
      "modelAnswer": [
        "Ohm or fixed parallel conductances give current versus driving force.",
        "A lumped RC model adds time dependence without spatial gradients.",
        "Cable/core conductor models represent passive spatial spread.",
        "GHK concerns concentration/permeability relations; HH concerns active nonlinear spike generation."
      ],
      "points": 1,
      "source": "L05 PDF 2",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 5, PDF page 3. Equivalent circuits and progressive simplification from branching dendrite to cylinder. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 5, PDF page 3. Equivalent circuits and progressive simplification from branching dendrite to cylinder. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L05/models.webp', import.meta.url).href,
          "alt": "Lecture 5, PDF page 3. Equivalent circuits and progressive simplification from branching dendrite to cylinder. Original labels, axes and scale bars retained.",
          "aspect": 0.5477741585233442,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L05-structure-reason",
      "sectionId": "structure",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Compare an equivalent circuit, ball-and-stick and a many-compartment representation. Which simplification would lose a two-site voltage difference?",
      "hints": [
        {
          "body": "This tests structural representations. Identify the source model and its controlled conditions."
        },
        {
          "body": "Separate electrical element replacement from how many spatial voltages the representation retains."
        }
      ],
      "markScheme": [
        {
          "text": "Equivalent circuits replace biological parts by electrical elements."
        },
        {
          "text": "Ball-and-stick separates soma and dendritic cable."
        },
        {
          "text": "Resistively connected compartments retain approximate spatial variation."
        },
        {
          "text": "A single isopotential compartment cannot retain two distinct internal voltages."
        }
      ],
      "modelAnswer": [
        "Equivalent circuits replace biological parts by electrical elements.",
        "Ball-and-stick separates soma and dendritic cable.",
        "Resistively connected compartments retain approximate spatial variation.",
        "A single isopotential compartment cannot retain two distinct internal voltages."
      ],
      "points": 1,
      "source": "L05 PDF 3",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 5, PDF page 3. Equivalent circuits and progressive simplification from branching dendrite to cylinder. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 5, PDF page 3. Equivalent circuits and progressive simplification from branching dendrite to cylinder. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L05/models.webp', import.meta.url).href,
          "alt": "Lecture 5, PDF page 3. Equivalent circuits and progressive simplification from branching dendrite to cylinder. Original labels, axes and scale bars retained.",
          "aspect": 0.5477741585233442,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L05-distributed-reason",
      "sectionId": "distributed",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Read the source distance traces: identify the controlled site, changes with distance and the failure of a single-compartment description.",
      "hints": [
        {
          "body": "This tests distributed properties and source distance. Identify the source model and its controlled conditions."
        },
        {
          "body": "Locate the stimulus, then follow the labeled distance series on the voltage-versus-time axes."
        }
      ],
      "markScheme": [
        {
          "text": "The stimulus is localized near the neuromuscular junction."
        },
        {
          "text": "Greater recording distance lowers response amplitude and increases delay/broadening."
        },
        {
          "text": "Spatially different voltages require a distributed or connected-compartment description."
        },
        {
          "text": "Compare axes qualitatively; no uncalibrated amplitude or latency is invented."
        }
      ],
      "modelAnswer": [
        "The stimulus is localized near the neuromuscular junction.",
        "Greater recording distance lowers response amplitude and increases delay/broadening.",
        "Spatially different voltages require a distributed or connected-compartment description.",
        "Compare axes qualitatively; no uncalibrated amplitude or latency is invented."
      ],
      "points": 1,
      "source": "L05 PDF 5",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 5, PDF page 5. Frog muscle voltage traces at increasing distances from localized stimulation. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 5, PDF page 5. Frog muscle voltage traces at increasing distances from localized stimulation. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L05/distributed.webp', import.meta.url).href,
          "alt": "Lecture 5, PDF page 5. Frog muscle voltage traces at increasing distances from localized stimulation. Original labels, axes and scale bars retained.",
          "aspect": 1.6674259681093395,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L05-chemical-reason",
      "sectionId": "chemical",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Order and explain the chemical synaptic transmission steps from presynaptic spike to spreading postsynaptic voltage.",
      "hints": [
        {
          "body": "This tests chemical transmission sequence. Identify the source model and its controlled conditions."
        },
        {
          "body": "Begin at the presynaptic membrane; distinguish the ion entering the terminal from the molecule crossing the cleft."
        }
      ],
      "markScheme": [
        {
          "text": "Presynaptic depolarization opens calcium channels and $\\mathrm{Ca}^{2+}$ enters."
        },
        {
          "text": "Calcium entry triggers vesicle fusion and transmitter release."
        },
        {
          "text": "Transmitter crosses the cleft and binds postsynaptic receptors."
        },
        {
          "text": "Postsynaptic channel activity changes ion flux and local graded voltage."
        },
        {
          "text": "The postsynaptic response spreads through membrane/cable properties."
        }
      ],
      "modelAnswer": [
        "Presynaptic depolarization opens calcium channels and $\\mathrm{Ca}^{2+}$ enters.",
        "Calcium entry triggers vesicle fusion and transmitter release.",
        "Transmitter crosses the cleft and binds postsynaptic receptors.",
        "Postsynaptic channel activity changes ion flux and local graded voltage.",
        "The postsynaptic response spreads through membrane/cable properties."
      ],
      "points": 1,
      "source": "L05 PDF 9",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 5, PDF page 9. Sequence from presynaptic spike through release and receptor activation to postsynaptic response. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 5, PDF page 9. Sequence from presynaptic spike through release and receptor activation to postsynaptic response. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L05/transmission.webp', import.meta.url).href,
          "alt": "Lecture 5, PDF page 9. Sequence from presynaptic spike through release and receptor activation to postsynaptic response. Original labels, axes and scale bars retained.",
          "aspect": 0.35805626598465473,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L05-receptors-reason",
      "sectionId": "receptors",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Compare ionotropic and metabotropic receptors, then explain how miniature and compound responses differ without equating either to an axonal action potential.",
      "hints": [
        {
          "body": "This tests receptors and miniature potentials. Identify the source model and its controlled conditions."
        },
        {
          "body": "Separate direct receptor gating from intermediate signaling, then compare the scale of a release event with axonal threshold."
        }
      ],
      "markScheme": [
        {
          "text": "Ionotropic receptors directly form ligand-gated channels."
        },
        {
          "text": "Metabotropic receptors act through intermediate molecules."
        },
        {
          "text": "One vesicle gives a miniature postsynaptic event."
        },
        {
          "text": "Multiple release events contribute to a compound graded response."
        },
        {
          "text": "Threshold-dependent axonal regeneration is a separate process."
        }
      ],
      "modelAnswer": [
        "Ionotropic receptors directly form ligand-gated channels.",
        "Metabotropic receptors act through intermediate molecules.",
        "One vesicle gives a miniature postsynaptic event.",
        "Multiple release events contribute to a compound graded response.",
        "Threshold-dependent axonal regeneration is a separate process."
      ],
      "points": 1,
      "source": "L05 PDF 10",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 5, PDF page 10. Ligand-gated channels compared with receptor signaling through intermediates. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 5, PDF page 10. Ligand-gated channels compared with receptor signaling through intermediates. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L05/receptors.webp', import.meta.url).href,
          "alt": "Lecture 5, PDF page 10. Ligand-gated channels compared with receptor signaling through intermediates. Original labels, axes and scale bars retained.",
          "aspect": 0.48549019607843136,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L05-dendritic-reason",
      "sectionId": "dendritic",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Use the source local-spike panel to contrast sodium and calcium events with purely passive integration. State the limited plasticity conclusion supported here.",
      "hints": [
        {
          "body": "This tests local dendritic spikes. Identify the source model and its controlled conditions."
        },
        {
          "body": "Locate the initiation site and distinguish active regeneration from passive spreading voltage."
        }
      ],
      "markScheme": [
        {
          "text": "Sodium and calcium channels can support local regenerative dendritic events."
        },
        {
          "text": "Passive integration alone does not regenerate a spike."
        },
        {
          "text": "A local event can alter the influence of synaptic inputs."
        },
        {
          "text": "The deck connects such events to plasticity but does not supply a quantitative plasticity rule."
        }
      ],
      "modelAnswer": [
        "Sodium and calcium channels can support local regenerative dendritic events.",
        "Passive integration alone does not regenerate a spike.",
        "A local event can alter the influence of synaptic inputs.",
        "The deck connects such events to plasticity but does not supply a quantitative plasticity rule."
      ],
      "points": 1,
      "source": "L05 PDF 12–13",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 5, PDF page 13. Source sodium/calcium local spike diagrams; additional labeled NMDA detail is reference-only here. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 5, PDF page 13. Source sodium/calcium local spike diagrams; additional labeled NMDA detail is reference-only here. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L05/local.webp', import.meta.url).href,
          "alt": "Lecture 5, PDF page 13. Source sodium/calcium local spike diagrams; additional labeled NMDA detail is reference-only here. Original labels, axes and scale bars retained.",
          "aspect": 1.058,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L05-backprop-reason",
      "sectionId": "backprop",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Interpret the source axon/soma/dendrite traces. Distinguish backpropagation from dendritic initiation and explain why dendritic amplitude can decline.",
      "hints": [
        {
          "body": "This tests backpropagating action potentials. Identify the source model and its controlled conditions."
        },
        {
          "body": "Use the source initiation location to establish causal order before comparing dendritic amplitudes."
        }
      ],
      "markScheme": [
        {
          "text": "An axonally initiated event invades soma and dendrites."
        },
        {
          "text": "A dendritically initiated spike begins locally instead."
        },
        {
          "text": "Passive losses and spatial channel distribution can weaken backpropagation."
        },
        {
          "text": "Compare the source timing qualitatively rather than assigning an invented velocity."
        }
      ],
      "modelAnswer": [
        "An axonally initiated event invades soma and dendrites.",
        "A dendritically initiated spike begins locally instead.",
        "Passive losses and spatial channel distribution can weaken backpropagation.",
        "Compare the source timing qualitatively rather than assigning an invented velocity."
      ],
      "points": 1,
      "source": "L05 PDF 14",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 5, PDF page 14. Source axonal, somatic and dendritic traces and their recording positions. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 5, PDF page 14. Source axonal, somatic and dendritic traces and their recording positions. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L05/backprop.webp', import.meta.url).href,
          "alt": "Lecture 5, PDF page 14. Source axonal, somatic and dendritic traces and their recording positions. Original labels, axes and scale bars retained.",
          "aspect": 1.6573426573426573,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L05-morphology-reason",
      "sectionId": "morphology",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Compare the source neuronal trees. Explain why a physically long thin distal route may be electrically more remote and why morphology alone cannot certify Rall reduction.",
      "hints": [
        {
          "body": "This tests dendritic trees and spatial organization. Identify the source model and its controlled conditions."
        },
        {
          "body": "Trace one soma-to-tip route and note how both length and diameter enter its electrical distance."
        }
      ],
      "markScheme": [
        {
          "text": "Trees differ in branching pattern and diameters."
        },
        {
          "text": "Electrotonic distance combines segment lengths and their cable scales."
        },
        {
          "text": "Thin segments have shorter length constants under common material parameters."
        },
        {
          "text": "Reduction additionally needs matched branch conductances, material assumptions and endpoint conditions."
        }
      ],
      "modelAnswer": [
        "Trees differ in branching pattern and diameters.",
        "Electrotonic distance combines segment lengths and their cable scales.",
        "Thin segments have shorter length constants under common material parameters.",
        "Reduction additionally needs matched branch conductances, material assumptions and endpoint conditions."
      ],
      "points": 1,
      "source": "L05 PDF 16–17",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 5, PDF page 16. Four neuronal dendritic morphologies with source scale bars. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 5, PDF page 16. Four neuronal dendritic morphologies with source scale bars. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L05/trees.webp', import.meta.url).href,
          "alt": "Lecture 5, PDF page 16. Four neuronal dendritic morphologies with source scale bars. Original labels, axes and scale bars retained.",
          "aspect": 1.0465116279069768,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L05-equivalent-reason",
      "sectionId": "equivalent",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain what Rall reduction preserves and the historical role of somatic recording. Correct an overclaim that dendritic recordings are universally impossible.",
      "hints": [
        {
          "body": "This tests why use an equivalent cylinder?. Identify the source model and its controlled conditions."
        },
        {
          "body": "Separate the historical measurement constraint from the electrical conditions that make the replacement valid."
        }
      ],
      "markScheme": [
        {
          "text": "The model links dendritic inputs to somatic electrical responses."
        },
        {
          "text": "A tree satisfying electrical conditions is represented by an equivalent cable attached to soma."
        },
        {
          "text": "Limited historical somatic access motivated the abstraction."
        },
        {
          "text": "The source statement is not a universal restriction on modern dendritic recording."
        }
      ],
      "modelAnswer": [
        "The model links dendritic inputs to somatic electrical responses.",
        "A tree satisfying electrical conditions is represented by an equivalent cable attached to soma.",
        "Limited historical somatic access motivated the abstraction.",
        "The source statement is not a universal restriction on modern dendritic recording."
      ],
      "points": 1,
      "source": "L05 PDF 18",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 5, PDF page 18. Progressive neuronal simplification into a soma and equivalent dendritic cylinder. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 5, PDF page 18. Progressive neuronal simplification into a soma and equivalent dendritic cylinder. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L05/equivalent.webp', import.meta.url).href,
          "alt": "Lecture 5, PDF page 18. Progressive neuronal simplification into a soma and equivalent dendritic cylinder. Original labels, axes and scale bars retained.",
          "aspect": 1.9017341040462428,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L05-matching-reason",
      "sectionId": "matching",
      "difficulty": "medium",
      "type": "derive",
      "prompt": "Derive the three-halves law from $G=Kd^{3/2}$ at a branch point. Explain why a cross-sectional-area matching rule is different.",
      "hints": [
        {
          "body": "This tests conductance matching at a branch. Identify the source model and its controlled conditions."
        },
        {
          "body": "Write the daughter current sum at common branch voltage, then insert the common diameter-dependent conductance factor."
        }
      ],
      "markScheme": [
        {
          "text": "The branch point has one voltage shared by parent and daughter loads."
        },
        {
          "text": "Daughter currents and therefore conductances add in parallel."
        },
        {
          "text": "$Kd_P^{3/2}=K\\sum_jd_j^{3/2}$."
        },
        {
          "text": "Common $K$ cancels only for common material properties."
        },
        {
          "text": "Area matching would add $d^2$, which is not the conductance exponent."
        }
      ],
      "modelAnswer": [
        "The branch point has one voltage shared by parent and daughter loads.",
        "Daughter currents and therefore conductances add in parallel.",
        "$Kd_P^{3/2}=K\\sum_jd_j^{3/2}$.",
        "Common $K$ cancels only for common material properties.",
        "Area matching would add $d^2$, which is not the conductance exponent."
      ],
      "points": 1,
      "source": "L05 PDF 20",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 5, PDF page 20. Parent and daughter diameters and signed current directions at a bifurcation. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 5, PDF page 20. Parent and daughter diameters and signed current directions at a bifurcation. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L05/branch.webp', import.meta.url).href,
          "alt": "Lecture 5, PDF page 20. Parent and daughter diameters and signed current directions at a bifurcation. Original labels, axes and scale bars retained.",
          "aspect": 2.0616740088105727,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L05-inverse-daughter",
      "sectionId": "matching",
      "difficulty": "medium",
      "type": "multiStepCalc",
      "prompt": "A parent diameter is $4\\,\\mu\\mathrm{m}$. One daughter is $2\\,\\mu\\mathrm{m}$. Find the other daughter needed for conductance matching, with common material parameters.",
      "stages": [
        {
          "title": "Rearrange",
          "choices": [
            {
              "label": "$d_2=(d_P^{3/2}-d_1^{3/2})^{2/3}$"
            },
            {
              "label": "$d_2=(d_P^2-d_1^2)^{1/2}$"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Subtract the known daughter conductance power before taking the inverse power."
          ]
        },
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Parent diameter",
              "answer": {
                "value": 4e-06,
                "unit": "m",
                "tolerance": 4e-12,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 4e-06,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Known daughter",
              "answer": {
                "value": 2e-06,
                "unit": "m",
                "tolerance": 2e-12,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 2e-06,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Missing daughter",
          "answer": {
            "value": 2.9905318533567714e-06,
            "unit": "m",
            "tolerance": 8.971595560070314e-09,
            "verification": {
              "relation": "powerRatio",
              "inputs": {
                "a": 5.1715728752538095e-09,
                "b": 1,
                "power": 0.6666666666666666
              },
              "displayScale": 1
            }
          },
          "tex": "d_2=(d_P^{3/2}-d_1^{3/2})^{2/3}",
          "modelAnswer": [
            "The remaining load is positive and smaller than the parent.",
            "$d_2=(d_P^{3/2}-d_1^{3/2})^{2/3}$",
            "$2.9905319e-06\\,\\text{m}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "The result uses conductance matching and the stated passive geometry."
            },
            {
              "label": "The result is valid for any active geometry without checking conditions."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The result uses conductance matching and the stated passive geometry."
          ]
        }
      ],
      "hints": [
        {
          "body": "This is inverse conductance matching, not an area balance."
        },
        {
          "body": "Start with $d_2^{3/2}=(4\\,\\mu\\mathrm{m})^{3/2}-(2\\,\\mu\\mathrm{m})^{3/2}$. Then take the inverse power and check positivity."
        }
      ],
      "modelAnswer": [
        "Subtract the known daughter conductance power before taking the inverse power.",
        "Convert each stated quantity to the requested unit before evaluating.",
        "The remaining load is positive and smaller than the parent."
      ],
      "points": 1,
      "source": "L05 PDF 20"
    },
    {
      "id": "L05-semi-reason",
      "sectionId": "semi",
      "difficulty": "medium",
      "type": "written",
      "prompt": "The source writes a one-arm diameter formula alongside a two-sided resistance factor. Explain the inconsistency using source-current division and give the consistent pair.",
      "hints": [
        {
          "body": "This tests one-arm semi-infinite conductance. Identify the source model and its controlled conditions."
        },
        {
          "body": "Count the cable arms supplied by the source before taking a reciprocal to compare resistance and conductance."
        }
      ],
      "markScheme": [
        {
          "text": "One arm has $R_\\infty=r_i\\lambda$."
        },
        {
          "text": "Two identical arms in parallel give $r_i\\lambda/2$."
        },
        {
          "text": "The one-arm diameter resistance is $2\\sqrt{R_iR_m}/(\\pi d^{3/2})$."
        },
        {
          "text": "Its reciprocal is $\\pi d^{3/2}/(2\\sqrt{R_iR_m})$."
        },
        {
          "text": "Choose one source geometry consistently before matching conductances."
        }
      ],
      "modelAnswer": [
        "One arm has $R_\\infty=r_i\\lambda$.",
        "Two identical arms in parallel give $r_i\\lambda/2$.",
        "The one-arm diameter resistance is $2\\sqrt{R_iR_m}/(\\pi d^{3/2})$.",
        "Its reciprocal is $\\pi d^{3/2}/(2\\sqrt{R_iR_m})$.",
        "Choose one source geometry consistently before matching conductances."
      ],
      "points": 1,
      "source": "L05 PDF 22",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 5, PDF page 21. Branch indices and diameters on the source tree for recursive matching. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 5, PDF page 21. Branch indices and diameters on the source tree for recursive matching. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L05/rall-tree.webp', import.meta.url).href,
          "alt": "Lecture 5, PDF page 21. Branch indices and diameters on the source tree for recursive matching. Original labels, axes and scale bars retained.",
          "aspect": 1.8615384615384616,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L05-recursive-reason",
      "sectionId": "recursive",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain recursive replacement in the source tree and correct its repeated-daughter-index typo. Why must distal assumptions be checked first?",
      "hints": [
        {
          "body": "This tests recursive daughter replacement. Identify the source model and its controlled conditions."
        },
        {
          "body": "Begin at the terminal daughters and keep a separate index for every distinct load."
        }
      ],
      "markScheme": [
        {
          "text": "Each distinct daughter contributes once to the conductance sum."
        },
        {
          "text": "The repeated second daughter index must refer to the other daughter."
        },
        {
          "text": "Replace matched distal subtrees by equivalent continuations."
        },
        {
          "text": "Repeat at the next proximal branch and work toward soma."
        },
        {
          "text": "Unmatched distal loads cannot be silently treated as identical continuations."
        }
      ],
      "modelAnswer": [
        "Each distinct daughter contributes once to the conductance sum.",
        "The repeated second daughter index must refer to the other daughter.",
        "Replace matched distal subtrees by equivalent continuations.",
        "Repeat at the next proximal branch and work toward soma.",
        "Unmatched distal loads cannot be silently treated as identical continuations."
      ],
      "points": 1,
      "source": "L05 PDF 23–25",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 5, PDF page 24. A branching tree and its reduced distal equivalent continuations. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 5, PDF page 24. A branching tree and its reduced distal equivalent continuations. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L05/replace.webp', import.meta.url).href,
          "alt": "Lecture 5, PDF page 24. A branching tree and its reduced distal equivalent continuations. Original labels, axes and scale bars retained.",
          "aspect": 0.9577836411609498,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L05-boundaries-reason",
      "sectionId": "boundaries",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Read the attenuation panel at a common origin voltage. Compare sealed, infinite and open endpoints, and explain why comparisons at common current can differ.",
      "hints": [
        {
          "body": "This tests attenuation and sealed-tip inference. Identify the source model and its controlled conditions."
        },
        {
          "body": "Identify whether the graph fixes origin voltage or supplied current, then inspect each endpoint."
        }
      ],
      "markScheme": [
        {
          "text": "Sealed ends have zero axial current and flatten to nonzero terminal voltage."
        },
        {
          "text": "Open cable ends have zero terminal response."
        },
        {
          "text": "The infinite exponential is the matched continuation."
        },
        {
          "text": "The source fixes origin voltage; input resistance changes the response at fixed current."
        }
      ],
      "modelAnswer": [
        "Sealed ends have zero axial current and flatten to nonzero terminal voltage.",
        "Open cable ends have zero terminal response.",
        "The infinite exponential is the matched continuation.",
        "The source fixes origin voltage; input resistance changes the response at fixed current."
      ],
      "points": 1,
      "source": "L05 PDF 27",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 5, PDF page 27. Normalized steady attenuation for sealed, clamped and infinite cable endpoints. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 5, PDF page 27. Normalized steady attenuation for sealed, clamped and infinite cable endpoints. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L05/profiles.webp', import.meta.url).href,
          "alt": "Lecture 5, PDF page 27. Normalized steady attenuation for sealed, clamped and infinite cable endpoints. Original labels, axes and scale bars retained.",
          "aspect": 1.544904137235116,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L05-finite-reason",
      "sectionId": "finite",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain the short and long sealed-cylinder limits of $G_N=G_\\infty\\tanh L$. State which finite-tree assumptions remain necessary.",
      "hints": [
        {
          "body": "This tests finite sealed input conductance. Identify the source model and its controlled conditions."
        },
        {
          "body": "Examine the small- and large-length limits of the hyperbolic factor, keeping resistance reciprocal."
        }
      ],
      "markScheme": [
        {
          "text": "For short $L$, $\\tanh L$ is small and conductance falls below the semi-infinite value."
        },
        {
          "text": "For long $L$, $\\tanh L$ approaches unity."
        },
        {
          "text": "Conductance and resistance remain reciprocal."
        },
        {
          "text": "A finite equivalent tree still needs sealed tips, matched nodes and common total endpoint length."
        }
      ],
      "modelAnswer": [
        "For short $L$, $\\tanh L$ is small and conductance falls below the semi-infinite value.",
        "For long $L$, $\\tanh L$ approaches unity.",
        "Conductance and resistance remain reciprocal.",
        "A finite equivalent tree still needs sealed tips, matched nodes and common total endpoint length."
      ],
      "points": 1,
      "source": "L05 PDF 28",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 5, PDF page 28. Source finite sealed input-conductance and resistance relations with model assumptions. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 5, PDF page 28. Source finite sealed input-conductance and resistance relations with model assumptions. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L05/finite.webp', import.meta.url).href,
          "alt": "Lecture 5, PDF page 28. Source finite sealed input-conductance and resistance relations with model assumptions. Original labels, axes and scale bars retained.",
          "aspect": 2.548707753479125,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L05-tree-example-reason",
      "sectionId": "tree-example",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Audit the source worked tree: distinguish approximate node matching from proof of an exact finite equivalent cylinder.",
      "hints": [
        {
          "body": "This tests audit every node of a tree. Identify the source model and its controlled conditions."
        },
        {
          "body": "Audit distal branch nodes before their parent, then ask what a rounded node match leaves untested."
        }
      ],
      "markScheme": [
        {
          "text": "Check the three-halves sum at each distal node."
        },
        {
          "text": "Check proximal nodes using the resulting equivalents."
        },
        {
          "text": "Treat rounded diameters as approximate rather than exact identities."
        },
        {
          "text": "Independently check total electrotonic path lengths and passive parameters."
        }
      ],
      "modelAnswer": [
        "Check the three-halves sum at each distal node.",
        "Check proximal nodes using the resulting equivalents.",
        "Treat rounded diameters as approximate rather than exact identities.",
        "Independently check total electrotonic path lengths and passive parameters."
      ],
      "points": 1,
      "source": "L05 PDF 30",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 5, PDF page 30. Source worked node-matching example; rounded equalities are approximate. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 5, PDF page 30. Source worked node-matching example; rounded equalities are approximate. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L05/example.webp', import.meta.url).href,
          "alt": "Lecture 5, PDF page 30. Source worked node-matching example; rounded equalities are approximate. Original labels, axes and scale bars retained.",
          "aspect": 0.9974811083123426,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L05-step-input-reason",
      "sectionId": "step-input",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Interpret the source step-pulse traces: compare soma versus distal injection, explain broadening, and qualify the common-decay statement.",
      "hints": [
        {
          "body": "This tests somatic responses to step pulses. Identify the source model and its controlled conditions."
        },
        {
          "body": "Identify stimulus and recording locations, then distinguish late relaxation from the full rise and peak."
        }
      ],
      "markScheme": [
        {
          "text": "The recording is somatic while input position changes."
        },
        {
          "text": "Distal responses have smaller amplitude, later peak and greater width."
        },
        {
          "text": "Successive membrane capacitances contribute to filtering."
        },
        {
          "text": "A common asymptotic slow mode can govern late decay."
        },
        {
          "text": "The whole waveform need not be identical or single-exponential."
        }
      ],
      "modelAnswer": [
        "The recording is somatic while input position changes.",
        "Distal responses have smaller amplitude, later peak and greater width.",
        "Successive membrane capacitances contribute to filtering.",
        "A common asymptotic slow mode can govern late decay.",
        "The whole waveform need not be identical or single-exponential."
      ],
      "points": 1,
      "source": "L05 PDF 32",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 5, PDF page 32. Supplied ball-and-stick model step-pulse responses recorded at the soma; no new simulation. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 5, PDF page 32. Supplied ball-and-stick model step-pulse responses recorded at the soma; no new simulation. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L05/step.webp', import.meta.url).href,
          "alt": "Lecture 5, PDF page 32. Supplied ball-and-stick model step-pulse responses recorded at the soma; no new simulation. Original labels, axes and scale bars retained.",
          "aspect": 1.0592369477911647,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L05-core-parallel-finite",
      "type": "mc",
      "difficulty": "hard",
      "sectionId": "stems",
      "prompt": "Two sealed stems have identical material properties and diameter. Their terminal factors are $\\tanh L_1=0.2$ and $\\tanh L_2=0.6$. The somatic conductance equals one stem’s semi-infinite conductance. What fraction of steady injected somatic current enters the pair?",
      "options": [
        {
          "text": "$4/5$",
          "feedback": "This is the ratio to somatic conductance only."
        },
        {
          "text": "$2/3$",
          "feedback": "This treats both finite stems as semi-infinite."
        },
        {
          "text": "$4/9$",
          "feedback": "The stems contribute $0.8$ conductance units and the soma contributes one, giving $0.8/1.8$."
        }
      ],
      "correct": 2,
      "hints": [
        {
          "body": "Correct each stem load for its terminal condition, then divide their sum by the total load."
        },
        {
          "body": "Express both corrected loads and the soma load in units of one infinite stem conductance."
        }
      ],
      "modelAnswer": [
        "The stems contribute $0.8$ conductance units and the soma contributes one, giving $0.8/1.8$."
      ]
    },
    {
      "id": "L05-core-retune-branch",
      "type": "mc",
      "difficulty": "hard",
      "sectionId": "exercise",
      "prompt": "Two passive branches have equal characteristic speed and material parameters. Branch A is twice as long as B. To match estimated transit times, what should happen to A’s $R_m$ with its diameter, $R_i$ and $C_m$ held fixed?",
      "options": [
        {
          "text": "Increase to four times.",
          "feedback": "This would halve speed and increase the delay."
        },
        {
          "text": "Decrease to one quarter.",
          "feedback": "A needs double the speed, and speed scales as $1/\\sqrt{R_m}$."
        },
        {
          "text": "Decrease to one half.",
          "feedback": "Halving $R_m$ raises speed by only $\\sqrt{2}$."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Find the speed required for equal transit, then use the resistance scaling."
        },
        {
          "body": "Use $R_{m,new}/R_{m,old}=(\\theta_{old}/\\theta_{new})^2$."
        }
      ],
      "modelAnswer": [
        "A needs double the speed, and speed scales as $1/\\sqrt{R_m}$."
      ]
    },
    {
      "id": "L05-lumped-reason",
      "sectionId": "lumped",
      "difficulty": "hard",
      "type": "written",
      "prompt": "Design a two-site injection/recording test of a lumped model. Matching steady responses are found but early transients differ. Decide what the evidence supports and what control to add.",
      "hints": [
        {
          "body": "This tests test the lumped approximation. Identify the source model and its controlled conditions."
        },
        {
          "body": "Compare the same pulse at the two sites, first during its rise and then after settling."
        }
      ],
      "markScheme": [
        {
          "text": "Inject controlled small current and compare simultaneous two-site voltage increments."
        },
        {
          "text": "Steady matching supports the approximation only for the steady test."
        },
        {
          "text": "Different transients reject a single voltage at the faster timescale."
        },
        {
          "text": "Repeat across stimulus durations with stable reference, geometry and passive operating range."
        },
        {
          "text": "Do not infer whole-cell uniformity from one site pair and one pulse alone."
        }
      ],
      "modelAnswer": [
        "Inject controlled small current and compare simultaneous two-site voltage increments.",
        "Steady matching supports the approximation only for the steady test.",
        "Different transients reject a single voltage at the faster timescale.",
        "Repeat across stimulus durations with stable reference, geometry and passive operating range.",
        "Do not infer whole-cell uniformity from one site pair and one pulse alone."
      ],
      "points": 1,
      "source": "L05 PDF 4",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 5, PDF page 4. Paramecium injection and matching recordings at two intracellular sites. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 5, PDF page 4. Paramecium injection and matching recordings at two intracellular sites. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L05/lumped.webp', import.meta.url).href,
          "alt": "Lecture 5, PDF page 4. Paramecium injection and matching recordings at two intracellular sites. Original labels, axes and scale bars retained.",
          "aspect": 1.1317567567567568,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L05-two-reason",
      "sectionId": "two",
      "difficulty": "hard",
      "type": "written",
      "prompt": "Draw a two-compartment circuit and explain its transient response. Correct the source claim that injecting an ideal current necessarily opens channels. Contrast a separate local conductance increase.",
      "hints": [
        {
          "body": "This tests two compartments: coupling and current division. Identify the source model and its controlled conditions."
        },
        {
          "body": "Start at the injected compartment and trace local leak, capacitive and longitudinal current paths."
        }
      ],
      "markScheme": [
        {
          "text": "Draw local resistance and capacitance in each compartment with axial coupling."
        },
        {
          "text": "Injected current divides between local charging, leak and longitudinal paths."
        },
        {
          "text": "The second compartment charges later and filters the response."
        },
        {
          "text": "Ideal imposed current does not itself alter passive conductance."
        },
        {
          "text": "A separately specified channel opening lowers local resistance and local RC time."
        }
      ],
      "modelAnswer": [
        "Draw local resistance and capacitance in each compartment with axial coupling.",
        "Injected current divides between local charging, leak and longitudinal paths.",
        "The second compartment charges later and filters the response.",
        "Ideal imposed current does not itself alter passive conductance.",
        "A separately specified channel opening lowers local resistance and local RC time."
      ],
      "points": 1,
      "source": "L05 PDF 7",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 5, PDF page 7. Adjacent membrane compartments linked by axial resistance, with local leak and capacitance. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 5, PDF page 7. Adjacent membrane compartments linked by axial resistance, with local leak and capacitance. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L05/two.webp', import.meta.url).href,
          "alt": "Lecture 5, PDF page 7. Adjacent membrane compartments linked by axial resistance, with local leak and capacitance. Original labels, axes and scale bars retained.",
          "aspect": 2.2556818181818183,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L05-graded-reason",
      "sectionId": "graded",
      "difficulty": "hard",
      "type": "written",
      "prompt": "Two distant inputs sum at the soma but the axon does not fire. A local dendritic spike later appears without an axonal spike. Explain both observations and what they do not establish.",
      "hints": [
        {
          "body": "This tests graded integration and axonal threshold. Identify the source model and its controlled conditions."
        },
        {
          "body": "Track local input, somatic transfer and axonal threshold separately before deciding whether a spike is required."
        }
      ],
      "markScheme": [
        {
          "text": "Passive transfer attenuates and filters graded inputs."
        },
        {
          "text": "Summation can remain below axonal threshold."
        },
        {
          "text": "Local voltage-gated channels can generate a dendritic event."
        },
        {
          "text": "The local event need not propagate sufficiently to cross axonal threshold."
        },
        {
          "text": "Neither observation establishes absence of synaptic activation or identical channel density throughout the cell."
        }
      ],
      "modelAnswer": [
        "Passive transfer attenuates and filters graded inputs.",
        "Summation can remain below axonal threshold.",
        "Local voltage-gated channels can generate a dendritic event.",
        "The local event need not propagate sufficiently to cross axonal threshold.",
        "Neither observation establishes absence of synaptic activation or identical channel density throughout the cell."
      ],
      "points": 1,
      "source": "L05 PDF 11",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 5, PDF page 11. Passive dendritic integration followed by threshold-dependent axonal spike generation. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 5, PDF page 11. Passive dendritic integration followed by threshold-dependent axonal spike generation. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L05/graded.webp', import.meta.url).href,
          "alt": "Lecture 5, PDF page 11. Passive dendritic integration followed by threshold-dependent axonal spike generation. Original labels, axes and scale bars retained.",
          "aspect": 1.9400544959128065,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L05-atype-reason",
      "sectionId": "atype",
      "difficulty": "hard",
      "type": "predict",
      "prompt": "Predict how reduced repolarizing A-type potassium influence could change dendritic invasion of an axonal spike. Explain why this does not prove endless repetitive firing.",
      "hints": [
        {
          "body": "This tests a-type potassium and echo suppression. Identify the source model and its controlled conditions."
        },
        {
          "body": "First identify which direction of potassium current opposes depolarization; then consider the limits of the prediction."
        }
      ],
      "markScheme": [
        {
          "text": "Outward potassium current normally opposes depolarization."
        },
        {
          "text": "Reducing it may lessen damping and permit stronger dendritic invasion."
        },
        {
          "text": "The effect depends on other passive and active properties."
        },
        {
          "text": "One stronger invasion does not establish a repeated regenerative echo."
        },
        {
          "text": "The lecture does not supply kinetics sufficient for a numerical firing prediction."
        }
      ],
      "modelAnswer": [
        "Outward potassium current normally opposes depolarization.",
        "Reducing it may lessen damping and permit stronger dendritic invasion.",
        "The effect depends on other passive and active properties.",
        "One stronger invasion does not establish a repeated regenerative echo.",
        "The lecture does not supply kinetics sufficient for a numerical firing prediction."
      ],
      "points": 1,
      "source": "L05 PDF 15",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 5, PDF page 15. Source compares passive integration, local dendritic initiation and axonal backpropagation. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 5, PDF page 15. Source compares passive integration, local dendritic initiation and axonal backpropagation. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L05/echo.webp', import.meta.url).href,
          "alt": "Lecture 5, PDF page 15. Source compares passive integration, local dendritic initiation and axonal backpropagation. Original labels, axes and scale bars retained.",
          "aspect": 0.7010968921389397,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L05-distance-reason",
      "sectionId": "distance",
      "difficulty": "hard",
      "type": "written",
      "prompt": "The source records at compartment one while activating one, five or nine. Propose a comparison separating input strength from transfer filtering. What cannot be inferred from somatic peak alone?",
      "hints": [
        {
          "body": "This tests interpret inputs to compartments one, five and nine. Identify the source model and its controlled conditions."
        },
        {
          "body": "Keep recording at the soma and compare whole normalized responses, not only their peaks."
        }
      ],
      "markScheme": [
        {
          "text": "Keep somatic recording fixed and standardize input size and waveform."
        },
        {
          "text": "Compare latency, width and normalized response as well as peak."
        },
        {
          "text": "Distal spread attenuates and broadens the somatic signal."
        },
        {
          "text": "A larger distal local event can compensate peak loss without matching timing."
        },
        {
          "text": "One somatic peak cannot uniquely identify input location, local strength or conductance history."
        }
      ],
      "modelAnswer": [
        "Keep somatic recording fixed and standardize input size and waveform.",
        "Compare latency, width and normalized response as well as peak.",
        "Distal spread attenuates and broadens the somatic signal.",
        "A larger distal local event can compensate peak loss without matching timing.",
        "One somatic peak cannot uniquely identify input location, local strength or conductance history."
      ],
      "points": 1,
      "source": "L05 PDF 19",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 5, PDF page 19. Tree, compartment chain and somatic EPSP traces for inputs at different locations. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 5, PDF page 19. Tree, compartment chain and somatic EPSP traces for inputs at different locations. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L05/compartments.webp', import.meta.url).href,
          "alt": "Lecture 5, PDF page 19. Tree, compartment chain and somatic EPSP traces for inputs at different locations. Original labels, axes and scale bars retained.",
          "aspect": 0.7426829268292683,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L05-assumptions-reason",
      "sectionId": "assumptions",
      "difficulty": "hard",
      "type": "written",
      "prompt": "A neuron satisfies every measured diameter match, but two sealed terminal routes have different electrotonic lengths and one branch opens voltage-dependent channels. Audit the equivalent-cylinder claim.",
      "hints": [
        {
          "body": "This tests rall assumptions and model limits. Identify the source model and its controlled conditions."
        },
        {
          "body": "Audit geometry, material parameters and endpoint conditions as three independent checks."
        }
      ],
      "markScheme": [
        {
          "text": "Local diameter matching is necessary but not sufficient."
        },
        {
          "text": "Unequal total electrotonic paths violate finite endpoint equivalence."
        },
        {
          "text": "Voltage-dependent conductance violates the common linear passive membrane model."
        },
        {
          "text": "An isopotential soma may still be represented separately as a lumped element."
        },
        {
          "text": "Use a more explicit compartment description rather than asserting an exact single cylinder."
        }
      ],
      "modelAnswer": [
        "Local diameter matching is necessary but not sufficient.",
        "Unequal total electrotonic paths violate finite endpoint equivalence.",
        "Voltage-dependent conductance violates the common linear passive membrane model.",
        "An isopotential soma may still be represented separately as a lumped element.",
        "Use a more explicit compartment description rather than asserting an exact single cylinder."
      ],
      "points": 1,
      "source": "L05 PDF 21",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 5, PDF page 21. Branch indices and diameters on the source tree for recursive matching. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 5, PDF page 21. Branch indices and diameters on the source tree for recursive matching. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L05/rall-tree.webp', import.meta.url).href,
          "alt": "Lecture 5, PDF page 21. Branch indices and diameters on the source tree for recursive matching. Original labels, axes and scale bars retained.",
          "aspect": 1.8615384615384616,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L05-stems-reason",
      "sectionId": "stems",
      "difficulty": "hard",
      "type": "written",
      "prompt": "Two stems have matching diameters for a three-halves sum, but their sealed tips have different total electrotonic lengths. Explain why summing diameter powers alone gives the wrong finite somatic load.",
      "hints": [
        {
          "body": "This tests several stems and biological limits. Identify the source model and its controlled conditions."
        },
        {
          "body": "Write the finite input conductance for each stem and look for factors that cannot be cancelled."
        }
      ],
      "markScheme": [
        {
          "text": "Each finite stem has a factor $\\tanh L_j$ in its conductance."
        },
        {
          "text": "Unequal lengths prevent that factor being common."
        },
        {
          "text": "A diameter-only sum therefore omits unequal endpoint loading."
        },
        {
          "text": "The multiple-stem finite reduction requires common endpoint electrotonic length."
        },
        {
          "text": "Retain separate stem loads or compartments when the assumption fails."
        }
      ],
      "modelAnswer": [
        "Each finite stem has a factor $\\tanh L_j$ in its conductance.",
        "Unequal lengths prevent that factor being common.",
        "A diameter-only sum therefore omits unequal endpoint loading.",
        "The multiple-stem finite reduction requires common endpoint electrotonic length.",
        "Retain separate stem loads or compartments when the assumption fails."
      ],
      "points": 1,
      "source": "L05 PDF 26",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 5, PDF page 26. Multiple dendritic stems reduced under matching electrical assumptions. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 5, PDF page 26. Multiple dendritic stems reduced under matching electrical assumptions. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L05/stems.webp', import.meta.url).href,
          "alt": "Lecture 5, PDF page 26. Multiple dendritic stems reduced under matching electrical assumptions. Original labels, axes and scale bars retained.",
          "aspect": 1.9017341040462428,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L05-unequal-stem-loads",
      "sectionId": "stems",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "Two independent sealed stems have diameters $2\\,\\mu\\mathrm{m}$ and $3\\,\\mu\\mathrm{m}$, common $R_i=1\\,\\Omega\\,\\mathrm{m}$ and $R_m=2\\,\\Omega\\,\\mathrm{m}^2$, but electrotonic lengths $0.4$ and $1.2$. Compute both finite conductances, their sum and the somatic voltage increment for a $20\\,\\mathrm{pA}$ steady input with no other load. Decide whether a diameter-only reduction is justified.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "First diameter",
              "answer": {
                "value": 2e-06,
                "unit": "m",
                "tolerance": 2e-12,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 2e-06,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Second diameter",
              "answer": {
                "value": 3e-06,
                "unit": "m",
                "tolerance": 3e-12,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 3e-06,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "First length",
              "answer": {
                "value": 0.4,
                "unit": "",
                "tolerance": 4e-07,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.4,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Second length",
              "answer": {
                "value": 1.2,
                "unit": "",
                "tolerance": 1.2e-06,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1.2,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Stem 1 conductance",
          "answer": {
            "value": 1.19364486856008e-09,
            "unit": "S",
            "tolerance": 3.58093460568024e-12,
            "verification": {
              "relation": "rallConductance",
              "inputs": {
                "diameter": 2e-06,
                "ri": 1,
                "rm": 2,
                "length": 0.4
              },
              "displayScale": 1
            }
          },
          "tex": "G_j=\\frac{\\pi d_j^{3/2}}{2\\sqrt{R_iR_m}}\\tanh L_j",
          "modelAnswer": [
            "Retain the distinct endpoint factor.",
            "$G_j=\\frac{\\pi d_j^{3/2}}{2\\sqrt{R_iR_m}}\\tanh L_j$",
            "$1.1936449e-09\\,\\text{S}$"
          ]
        },
        {
          "title": "Stem 2 conductance",
          "answer": {
            "value": 4.811416085866927e-09,
            "unit": "S",
            "tolerance": 1.4434248257600782e-11,
            "verification": {
              "relation": "rallConductance",
              "inputs": {
                "diameter": 3e-06,
                "ri": 1,
                "rm": 2,
                "length": 1.2
              },
              "displayScale": 1
            }
          },
          "tex": "G_j=\\frac{\\pi d_j^{3/2}}{2\\sqrt{R_iR_m}}\\tanh L_j",
          "modelAnswer": [
            "Retain the distinct endpoint factor.",
            "$G_j=\\frac{\\pi d_j^{3/2}}{2\\sqrt{R_iR_m}}\\tanh L_j$",
            "$4.8114161e-09\\,\\text{S}$"
          ]
        },
        {
          "title": "Combined load",
          "answer": {
            "value": 6.005060954427007e-09,
            "unit": "S",
            "tolerance": 1.801518286328102e-11,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": 1.19364486856008e-09,
                "b": 4.811416085866927e-09
              },
              "displayScale": 1
            }
          },
          "tex": "G_N=G_1+G_2",
          "modelAnswer": [
            "Parallel conductances add.",
            "$G_N=G_1+G_2$",
            "$6.005061e-09\\,\\text{S}$"
          ]
        },
        {
          "title": "Somatic increment",
          "answer": {
            "value": 0.0033305240615843783,
            "unit": "V",
            "tolerance": 9.991572184753135e-06,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 2e-11,
                "b": 6.005060954427007e-09
              },
              "displayScale": 1
            }
          },
          "tex": "V=I/G_N",
          "modelAnswer": [
            "Current divides among the two specified loads.",
            "$V=I/G_N$",
            "$0.0033305241\\,\\text{V}$"
          ]
        },
        {
          "title": "Reduction",
          "choices": [
            {
              "label": "Unequal endpoint lengths prevent this diameter-only finite reduction"
            },
            {
              "label": "A diameter-only sum remains exact despite unequal endpoint lengths"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The finite conductance factors cannot be cancelled when endpoint lengths differ."
          ]
        }
      ],
      "hints": [
        {
          "body": "Keep unequal sealed stem loads separate before summing their conductances."
        },
        {
          "body": "Start with $G_1=[\\pi(2\\times10^{-6}\\,\\mathrm{m})^{3/2}/(2\\sqrt{R_iR_m})]\\tanh(0.4)$. Evaluate both loads, add, then divide current by total conductance."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Retain the distinct endpoint factor.",
        "Retain the distinct endpoint factor.",
        "Parallel conductances add.",
        "Current divides among the two specified loads.",
        "The finite conductance factors cannot be cancelled when endpoint lengths differ."
      ],
      "points": 1,
      "source": "L05 PDF 26"
    },
    {
      "id": "L05-infer-geometry-load",
      "sectionId": "finite",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "A sealed equivalent cylinder retains $75\\%$ of the soma voltage increment at its terminal. Its physical length is $0.4\\,\\mathrm{mm}$, $R_m=1.6\\,\\Omega\\,\\mathrm{m}^2$ and $R_i=1.2\\,\\Omega\\,\\mathrm{m}$. Infer electrotonic length, local length constant, diameter and one-arm finite input conductance. No other somatic load is included.",
      "stages": [
        {
          "title": "Choose boundary relation",
          "choices": [
            {
              "label": "$f=1/\\cosh L$"
            },
            {
              "label": "$f=e^{-L}$"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The sealed terminal has zero axial current."
          ]
        },
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Remaining fraction",
              "answer": {
                "value": 0.75,
                "unit": "",
                "tolerance": 7.5e-07,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.75,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Physical length",
              "answer": {
                "value": 0.0004,
                "unit": "m",
                "tolerance": 4e-10,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.0004,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Specific resistance",
              "answer": {
                "value": 1.6,
                "unit": "ohm*m2",
                "tolerance": 1.6e-06,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1.6,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Axial resistivity",
              "answer": {
                "value": 1.2,
                "unit": "ohm*m",
                "tolerance": 1.2e-06,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1.2,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Electrotonic length",
          "answer": {
            "value": 0.7953654612239056,
            "unit": "",
            "tolerance": 0.0023860963836717167,
            "verification": {
              "relation": "sealedLength",
              "inputs": {
                "fraction": 0.75
              },
              "displayScale": 1
            }
          },
          "tex": "L=\\operatorname{acosh}(1/f)",
          "modelAnswer": [
            "Use the remaining fraction.",
            "$L=\\operatorname{acosh}(1/f)$",
            "$0.79536546$"
          ]
        },
        {
          "title": "Length constant",
          "answer": {
            "value": 0.0005029134649428722,
            "unit": "m",
            "tolerance": 1.5087403948286166e-06,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 0.0004,
                "b": 0.7953654612239056
              },
              "displayScale": 1
            }
          },
          "tex": "\\lambda=\\ell/L",
          "modelAnswer": [
            "Physical and electrotonic lengths are different.",
            "$\\lambda=\\ell/L$",
            "$0.00050291346\\,\\text{m}$"
          ]
        },
        {
          "title": "Diameter",
          "answer": {
            "value": 7.587658596625365e-07,
            "unit": "m",
            "tolerance": 2.2762975789876096e-09,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 2.9999999999999996,
                "b": 2.5292195322084553e-07
              },
              "displayScale": 1
            }
          },
          "tex": "d=4R_i\\lambda^2/R_m",
          "modelAnswer": [
            "Rearrange before evaluating.",
            "$d=4R_i\\lambda^2/R_m$",
            "$7.5876586e-07\\,\\text{m}$"
          ]
        },
        {
          "title": "Finite conductance",
          "answer": {
            "value": 4.955870665937146e-10,
            "unit": "S",
            "tolerance": 1.4867611997811438e-12,
            "verification": {
              "relation": "rallConductance",
              "inputs": {
                "diameter": 7.587658596625365e-07,
                "rm": 1.6,
                "ri": 1.2,
                "length": 0.7953654612239056
              },
              "displayScale": 1
            }
          },
          "tex": "G_N=\\frac{\\pi d^{3/2}}{2\\sqrt{R_iR_m}}\\tanh L",
          "modelAnswer": [
            "The finite conductance is below the semi-infinite reference.",
            "$G_N=\\frac{\\pi d^{3/2}}{2\\sqrt{R_iR_m}}\\tanh L$",
            "$4.9558707e-10\\,\\text{S}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "A sealed endpoint and one-arm input convention are required for this inference."
            },
            {
              "label": "An arbitrary endpoint and two-arm input convention give the same inference."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "A sealed endpoint and one-arm input convention are required for this inference."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use sealed attenuation, then invert the length constant geometry before calculating finite conductance."
        },
        {
          "body": "Start with $L=\\operatorname{acosh}(1/0.75)$. Divide physical length by $L$, rearrange the diameter relation, then apply the sealed conductance factor."
        }
      ],
      "modelAnswer": [
        "The sealed terminal has zero axial current.",
        "Convert each stated quantity to the requested unit before evaluating.",
        "Use the remaining fraction.",
        "Physical and electrotonic lengths are different.",
        "Rearrange before evaluating.",
        "The finite conductance is below the semi-infinite reference."
      ],
      "points": 1,
      "source": "L05 PDF 28"
    },
    {
      "id": "L05-paths-reason",
      "sectionId": "paths",
      "difficulty": "hard",
      "type": "written",
      "prompt": "A tree has equal physical soma-to-tip paths and approximately matched diameters. One path contains more thin segments. Decide whether exact finite reduction follows and design the missing calculation.",
      "hints": [
        {
          "body": "This tests add electrotonic lengths along each path. Identify the source model and its controlled conditions."
        },
        {
          "body": "Compute local cable scales before adding the normalized lengths on each complete route."
        }
      ],
      "markScheme": [
        {
          "text": "Compute length constant separately in each segment."
        },
        {
          "text": "Thin segments have shorter length constants with common material properties."
        },
        {
          "text": "Sum physical length divided by local length constant along each route."
        },
        {
          "text": "Equal physical lengths do not guarantee equal electrotonic totals."
        },
        {
          "text": "Compare all endpoint totals and local matches before certifying reduction."
        }
      ],
      "modelAnswer": [
        "Compute length constant separately in each segment.",
        "Thin segments have shorter length constants with common material properties.",
        "Sum physical length divided by local length constant along each route.",
        "Equal physical lengths do not guarantee equal electrotonic totals.",
        "Compare all endpoint totals and local matches before certifying reduction."
      ],
      "points": 1,
      "source": "L05 PDF 29",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 5, PDF page 29. Indexed tree used to sum the segments on each soma-to-tip route. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 5, PDF page 29. Indexed tree used to sum the segments on each soma-to-tip route. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L05/path.webp', import.meta.url).href,
          "alt": "Lecture 5, PDF page 29. Indexed tree used to sum the segments on each soma-to-tip route. Original labels, axes and scale bars retained.",
          "aspect": 1.8615384615384616,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L05-route-audit",
      "sectionId": "paths",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "A stem has length $0.2\\,\\mathrm{mm}$ and diameter $4\\,\\mu\\mathrm{m}$. Its daughters A and B are $0.24\\,\\mathrm{mm}$ by $2\\,\\mu\\mathrm{m}$ and $0.18\\,\\mathrm{mm}$ by $1\\,\\mu\\mathrm{m}$. All use $R_m=2\\,\\Omega\\,\\mathrm{m}^2$ and $R_i=1\\,\\Omega\\,\\mathrm{m}$. Find the three length constants, two complete electrotonic routes and the parent diameter required to match these daughters. Audit this finite sealed reduction.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Specific resistance",
              "answer": {
                "value": 2,
                "unit": "ohm*m2",
                "tolerance": 2e-06,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 2,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Axial resistivity",
              "answer": {
                "value": 1,
                "unit": "ohm*m",
                "tolerance": 1e-06,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Stem length",
              "answer": {
                "value": 0.0002,
                "unit": "m",
                "tolerance": 2e-10,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.0002,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "A length",
              "answer": {
                "value": 0.00024,
                "unit": "m",
                "tolerance": 2.4e-10,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.00024,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "B length",
              "answer": {
                "value": 0.00018,
                "unit": "m",
                "tolerance": 1.8e-10,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.00018,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Stem length constant",
          "answer": {
            "value": 0.001414213562373095,
            "unit": "m",
            "tolerance": 4.242640687119285e-06,
            "verification": {
              "relation": "cableLength",
              "inputs": {
                "rm": 159154.94309189534,
                "ri": 79577471545.94768
              },
              "displayScale": 1
            }
          },
          "tex": "\\lambda_j=\\sqrt{R_md_j/(4R_i)}",
          "modelAnswer": [
            "Each segment uses its own diameter.",
            "$\\lambda_j=\\sqrt{R_md_j/(4R_i)}$",
            "$0.0014142136\\,\\text{m}$"
          ]
        },
        {
          "title": "A length constant",
          "answer": {
            "value": 0.001,
            "unit": "m",
            "tolerance": 3e-06,
            "verification": {
              "relation": "cableLength",
              "inputs": {
                "rm": 318309.8861837907,
                "ri": 318309886183.7907
              },
              "displayScale": 1
            }
          },
          "tex": "\\lambda_j=\\sqrt{R_md_j/(4R_i)}",
          "modelAnswer": [
            "Each segment uses its own diameter.",
            "$\\lambda_j=\\sqrt{R_md_j/(4R_i)}$",
            "$0.001\\,\\text{m}$"
          ]
        },
        {
          "title": "B length constant",
          "answer": {
            "value": 0.0007071067811865475,
            "unit": "m",
            "tolerance": 2.1213203435596424e-06,
            "verification": {
              "relation": "cableLength",
              "inputs": {
                "rm": 636619.7723675814,
                "ri": 1273239544735.1628
              },
              "displayScale": 1
            }
          },
          "tex": "\\lambda_j=\\sqrt{R_md_j/(4R_i)}",
          "modelAnswer": [
            "Each segment uses its own diameter.",
            "$\\lambda_j=\\sqrt{R_md_j/(4R_i)}$",
            "$0.00070710678\\,\\text{m}$"
          ]
        },
        {
          "title": "Route A",
          "answer": {
            "value": 0.3814213562373095,
            "unit": "",
            "tolerance": 0.0011442640687119286,
            "verification": {
              "relation": "pathLength",
              "inputs": {
                "segments": [
                  {
                    "length": 0.0002,
                    "lambda": 0.001414213562373095
                  },
                  {
                    "length": 0.00024,
                    "lambda": 0.001
                  }
                ]
              },
              "displayScale": 1
            }
          },
          "tex": "L_{path}=L_{stem}+L_{daughter}",
          "modelAnswer": [
            "Compare complete paths, not the daughters alone.",
            "$L_{path}=L_{stem}+L_{daughter}$",
            "$0.38142136$"
          ]
        },
        {
          "title": "Route B",
          "answer": {
            "value": 0.39597979746446665,
            "unit": "",
            "tolerance": 0.0011879393923934,
            "verification": {
              "relation": "pathLength",
              "inputs": {
                "segments": [
                  {
                    "length": 0.0002,
                    "lambda": 0.001414213562373095
                  },
                  {
                    "length": 0.00018,
                    "lambda": 0.0007071067811865475
                  }
                ]
              },
              "displayScale": 1
            }
          },
          "tex": "L_{path}=L_{stem}+L_{daughter}",
          "modelAnswer": [
            "Compare complete paths, not the daughters alone.",
            "$L_{path}=L_{stem}+L_{daughter}$",
            "$0.3959798$"
          ]
        },
        {
          "title": "Matched parent diameter",
          "answer": {
            "value": 2.4472608147714757e-06,
            "unit": "m",
            "tolerance": 7.341782444314428e-09,
            "verification": {
              "relation": "rallDiameter",
              "inputs": {
                "diameters": [
                  2e-06,
                  1e-06
                ]
              },
              "displayScale": 1
            }
          },
          "tex": "d_P=(d_A^{3/2}+d_B^{3/2})^{2/3}",
          "modelAnswer": [
            "The specified parent is not the matched equivalent.",
            "$d_P=(d_A^{3/2}+d_B^{3/2})^{2/3}$",
            "$2.4472608e-06\\,\\text{m}$"
          ]
        },
        {
          "title": "Audit",
          "choices": [
            {
              "label": "Both local diameter matching and equal endpoint paths fail"
            },
            {
              "label": "Local matching alone certifies an exact finite cylinder"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Both independent requirements must be checked."
          ]
        }
      ],
      "hints": [
        {
          "body": "Compare both local conductance matching and complete electrotonic endpoint paths."
        },
        {
          "body": "Start with $\\lambda_{stem}=\\sqrt{(2\\,\\Omega\\,\\mathrm{m}^2)(4\\times10^{-6}\\,\\mathrm{m})/(4\\,\\Omega\\,\\mathrm{m})}$. Compute both route sums and independently check diameter matching."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Each segment uses its own diameter.",
        "Each segment uses its own diameter.",
        "Each segment uses its own diameter.",
        "Compare complete paths, not the daughters alone.",
        "Compare complete paths, not the daughters alone.",
        "The specified parent is not the matched equivalent.",
        "Both independent requirements must be checked."
      ],
      "points": 1,
      "source": "L05 PDF 29"
    },
    {
      "id": "L05-soma-reason",
      "sectionId": "soma",
      "difficulty": "hard",
      "type": "written",
      "prompt": "A student calls $\\rho=3$ a dendritic current fraction and applies it at the rising edge of a pulse. Identify both errors and explain a correct steady-state measurement.",
      "hints": [
        {
          "body": "This tests dendritic load and the lumped soma. Identify the source model and its controlled conditions."
        },
        {
          "body": "Write total steady conductance as the sum of two parallel loads before interpreting their ratio."
        }
      ],
      "markScheme": [
        {
          "text": "$\\rho$ is a conductance ratio and may exceed unity."
        },
        {
          "text": "The steady fraction is $\\rho/(1+\\rho)$."
        },
        {
          "text": "Capacitive currents contribute during the transient."
        },
        {
          "text": "Measure small steady voltage and supplied current after settling."
        },
        {
          "text": "Separate somatic and dendritic conductances rather than treating the transient as static division."
        }
      ],
      "modelAnswer": [
        "$\\rho$ is a conductance ratio and may exceed unity.",
        "The steady fraction is $\\rho/(1+\\rho)$.",
        "Capacitive currents contribute during the transient.",
        "Measure small steady voltage and supplied current after settling.",
        "Separate somatic and dendritic conductances rather than treating the transient as static division."
      ],
      "points": 1,
      "source": "L05 PDF 31",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 5, PDF page 31. Lumped somatic resistance/capacitance and a sealed dendritic cylinder with steady current division. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 5, PDF page 31. Lumped somatic resistance/capacitance and a sealed dendritic cylinder with steady current division. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L05/soma.webp', import.meta.url).href,
          "alt": "Lecture 5, PDF page 31. Lumped somatic resistance/capacitance and a sealed dendritic cylinder with steady current division. Original labels, axes and scale bars retained.",
          "aspect": 1.3578125,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L05-somatic-inference",
      "sectionId": "soma",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "A small steady $60\\,\\mathrm{pA}$ input gives a somatic increment of $3\\,\\mathrm{mV}$. Separate evidence gives $G_S=5\\,\\mathrm{nS}$. Find total and dendritic conductances, the load ratio, dendritic steady current fraction and dendritic current. Explain why the ratio is not a percentage.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Supplied current",
              "answer": {
                "value": 6e-11,
                "unit": "A",
                "tolerance": 6e-17,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 6e-11,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Voltage increment",
              "answer": {
                "value": 0.003,
                "unit": "V",
                "tolerance": 3e-09,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.003,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Somatic conductance",
              "answer": {
                "value": 5e-09,
                "unit": "S",
                "tolerance": 5e-15,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 5e-09,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Total conductance",
          "answer": {
            "value": 2e-08,
            "unit": "S",
            "tolerance": 6e-11,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 6e-11,
                "b": 0.003
              },
              "displayScale": 1
            }
          },
          "tex": "G_N=I/V",
          "modelAnswer": [
            "Use voltage increment, not absolute resting potential.",
            "$G_N=I/V$",
            "$2e-08\\,\\text{S}$"
          ]
        },
        {
          "title": "Dendritic conductance",
          "answer": {
            "value": 1.5e-08,
            "unit": "S",
            "tolerance": 4.5e-11,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": 2e-08,
                "b": -5e-09
              },
              "displayScale": 1
            }
          },
          "tex": "G_D=G_N-G_S",
          "modelAnswer": [
            "Subtract the parallel somatic load.",
            "$G_D=G_N-G_S$",
            "$1.5e-08\\,\\text{S}$"
          ],
          "commonErrors": [
            {
              "wrongValue": 2.5e-08,
              "tolerance": 1e-12,
              "why": "The soma is already part of total conductance. Subtract it rather than adding it again.",
              "verification": {
                "relation": "sum",
                "inputs": {
                  "a": 2e-08,
                  "b": 5e-09
                }
              }
            }
          ]
        },
        {
          "title": "Load ratio",
          "answer": {
            "value": 3,
            "unit": "",
            "tolerance": 0.009000000000000001,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 1.5e-08,
                "b": 5e-09
              },
              "displayScale": 1
            }
          },
          "tex": "\\rho=G_D/G_S",
          "modelAnswer": [
            "A conductance ratio can exceed unity.",
            "$\\rho=G_D/G_S$",
            "$3$"
          ]
        },
        {
          "title": "Dendritic fraction",
          "answer": {
            "value": 0.75,
            "unit": "",
            "tolerance": 0.0022500000000000003,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 3,
                "b": 4
              },
              "displayScale": 1
            }
          },
          "tex": "f_D=\\rho/(1+\\rho)",
          "modelAnswer": [
            "The current fraction is bounded.",
            "$f_D=\\rho/(1+\\rho)$",
            "$0.75$"
          ]
        },
        {
          "title": "Dendritic current",
          "answer": {
            "value": 4.5e-11,
            "unit": "A",
            "tolerance": 1.35e-13,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 6e-11,
                "b": 0.75
              },
              "displayScale": 1
            }
          },
          "tex": "I_D=I f_D",
          "modelAnswer": [
            "The remainder flows through the steady somatic load.",
            "$I_D=I f_D$",
            "$4.5e-11\\,\\text{A}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "The load ratio exceeds unity while the steady current fraction stays below unity."
            },
            {
              "label": "A load ratio above unity means more than all the supplied current enters dendrites."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The load ratio exceeds unity while the steady current fraction stays below unity."
          ]
        }
      ],
      "hints": [
        {
          "body": "Infer the total parallel load from small steady current and voltage, then separate its components."
        },
        {
          "body": "Start with $G_N=(60\\,\\mathrm{pA})/(3\\,\\mathrm{mV})$. Subtract the soma, form the ratio, convert to a fraction and calculate current."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Use voltage increment, not absolute resting potential.",
        "Subtract the parallel somatic load.",
        "A conductance ratio can exceed unity.",
        "The current fraction is bounded.",
        "The remainder flows through the steady somatic load."
      ],
      "points": 1,
      "source": "L05 PDF 31"
    },
    {
      "id": "L05-conductance-input-reason",
      "sectionId": "conductance-input",
      "difficulty": "hard",
      "type": "written",
      "prompt": "Compare the source step-pulse and alpha-like conductance panels. Design a controlled small-response comparison and explain what would invalidate simple current-source superposition.",
      "hints": [
        {
          "body": "This tests synaptic conductance versus rectangular current. Identify the source model and its controlled conditions."
        },
        {
          "body": "Compare what each stimulus prescribes and which quantity changes when membrane voltage changes."
        }
      ],
      "markScheme": [
        {
          "text": "Keep recording site, baseline and input location controlled."
        },
        {
          "text": "Compare normalized waveform, delay and width rather than inventing graph values."
        },
        {
          "text": "The rectangular current source prescribes current independently of membrane voltage."
        },
        {
          "text": "Synaptic conductance produces current depending on instantaneous driving force."
        },
        {
          "text": "Large conductance changes or active channels can invalidate linear superposition."
        }
      ],
      "modelAnswer": [
        "Keep recording site, baseline and input location controlled.",
        "Compare normalized waveform, delay and width rather than inventing graph values.",
        "The rectangular current source prescribes current independently of membrane voltage.",
        "Synaptic conductance produces current depending on instantaneous driving force.",
        "Large conductance changes or active channels can invalidate linear superposition."
      ],
      "points": 1,
      "source": "L05 PDF 33",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 5, PDF page 33. Supplied ball-and-stick alpha-like stimulus and somatic response traces. The original input-current label is retained; slide prose describes conductance, so only the qualitative shape is used. No new simulation. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 5, PDF page 33. Supplied ball-and-stick alpha-like stimulus and somatic response traces. The original input-current label is retained; slide prose describes conductance, so only the qualitative shape is used. No new simulation. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L05/alpha.webp', import.meta.url).href,
          "alt": "Lecture 5, PDF page 33. Supplied ball-and-stick alpha-like stimulus and somatic response traces. The original input-current label is retained; slide prose describes conductance, so only the qualitative shape is used. No new simulation. Original labels, axes and scale bars retained.",
          "aspect": 1.0654885654885655,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L05-timing-design",
      "sectionId": "exercise",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "Use the taught characteristic transit estimate for two daughter branches. A has $\\lambda_A=0.8\\,\\mathrm{mm}$, length $0.16\\,\\mathrm{mm}$ and $\\tau_A=20\\,\\mathrm{ms}$. B has $\\lambda_B=1\\,\\mathrm{mm}$, length $0.1\\,\\mathrm{mm}$ and $\\tau_B=20\\,\\mathrm{ms}$. Find their characteristic speeds and transit estimates. Change only A’s initial $R_m=2\\,\\Omega\\,\\mathrm{m}^2$ so its estimated transit matches B. Explain the model limitation.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "A length constant",
              "answer": {
                "value": 0.0008,
                "unit": "m",
                "tolerance": 8e-10,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.0008,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "B length constant",
              "answer": {
                "value": 0.001,
                "unit": "m",
                "tolerance": 1e-09,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.001,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Time constant",
              "answer": {
                "value": 0.02,
                "unit": "s",
                "tolerance": 2e-08,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.02,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "A characteristic speed",
          "answer": {
            "value": 0.08,
            "unit": "m/s",
            "tolerance": 0.00024,
            "verification": {
              "relation": "passiveSpeed",
              "inputs": {
                "lambda": 0.0008,
                "tau": 0.02
              },
              "displayScale": 1
            }
          },
          "tex": "\\theta_A=2\\lambda_A/\\tau_A",
          "modelAnswer": [
            "Characteristic passive timing is not spike conduction.",
            "$\\theta_A=2\\lambda_A/\\tau_A$",
            "$0.08\\,\\text{m/s}$"
          ]
        },
        {
          "title": "B characteristic speed",
          "answer": {
            "value": 0.1,
            "unit": "m/s",
            "tolerance": 0.00030000000000000003,
            "verification": {
              "relation": "passiveSpeed",
              "inputs": {
                "lambda": 0.001,
                "tau": 0.02
              },
              "displayScale": 1
            }
          },
          "tex": "\\theta_B=2\\lambda_B/\\tau_B",
          "modelAnswer": [
            "Use consistent distance and time units.",
            "$\\theta_B=2\\lambda_B/\\tau_B$",
            "$0.1\\,\\text{m/s}$"
          ]
        },
        {
          "title": "A transit estimate",
          "answer": {
            "value": 0.002,
            "unit": "s",
            "tolerance": 6e-06,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 0.00016,
                "b": 0.08
              },
              "displayScale": 1
            }
          },
          "tex": "t_A=\\ell_A/\\theta_A",
          "modelAnswer": [
            "This is an approximate characteristic estimate.",
            "$t_A=\\ell_A/\\theta_A$",
            "$0.002\\,\\text{s}$"
          ]
        },
        {
          "title": "B transit estimate",
          "answer": {
            "value": 0.001,
            "unit": "s",
            "tolerance": 3e-06,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 0.0001,
                "b": 0.1
              },
              "displayScale": 1
            }
          },
          "tex": "t_B=\\ell_B/\\theta_B",
          "modelAnswer": [
            "Use the target estimated transit time.",
            "$t_B=\\ell_B/\\theta_B$",
            "$0.001\\,\\text{s}$"
          ]
        },
        {
          "title": "Required A speed",
          "answer": {
            "value": 0.16,
            "unit": "m/s",
            "tolerance": 0.00048,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 0.00016,
                "b": 0.001
              },
              "displayScale": 1
            }
          },
          "tex": "\\theta_{A,new}=\\ell_A/t_B",
          "modelAnswer": [
            "A must have a higher characteristic speed.",
            "$\\theta_{A,new}=\\ell_A/t_B$",
            "$0.16\\,\\text{m/s}$"
          ]
        },
        {
          "title": "Required specific resistance",
          "answer": {
            "value": 0.5,
            "unit": "ohm*m2",
            "tolerance": 0.0015,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 2,
                "b": 0.25
              },
              "displayScale": 1
            }
          },
          "tex": "R_{m,new}=R_{m,old}(\\theta_{old}/\\theta_{new})^2",
          "modelAnswer": [
            "Both length constant and time constant change.",
            "$R_{m,new}=R_{m,old}(\\theta_{old}/\\theta_{new})^2$",
            "$0.5\\,\\text{ohm*m2}$"
          ]
        },
        {
          "title": "Model limits",
          "choices": [
            {
              "label": "Equal estimates do not imply equal actual EPSP peaks; common material assumptions are broken"
            },
            {
              "label": "Equal estimates prove identical EPSP waveforms and preserve common material assumptions"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Changing one branch resistance breaks common membrane parameters; passive delay is not one universal velocity."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use characteristic speed and approximate transit, then resistance scaling at fixed diameter and capacitance."
        },
        {
          "body": "Start with $\\theta_A=2(0.8\\,\\mathrm{mm})/(20\\,\\mathrm{ms})$. Compute B’s target time, required A speed and the squared resistance ratio."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Characteristic passive timing is not spike conduction.",
        "Use consistent distance and time units.",
        "This is an approximate characteristic estimate.",
        "Use the target estimated transit time.",
        "A must have a higher characteristic speed.",
        "Both length constant and time constant change.",
        "Changing one branch resistance breaks common membrane parameters; passive delay is not one universal velocity."
      ],
      "points": 1,
      "source": "Exercise 5 p1–2, answers p1–2; L04 PDF2; L05 PDF29"
    }
  ],
  "mockExams": [
    {
      "id": "L05-mock-A",
      "title": "Mock A: infer a sealed dendritic load",
      "coverage": "Lectures 1–5. Cellular models, sealed attenuation, equivalent diameter, somatic loading and source response traces.",
      "questions": [
        {
          "id": "L05-a1",
          "role": "concepts",
          "type": "written",
          "difficulty": "medium",
          "prompt": "a) Distinguish lumped from distributed parameters. b) Define conductance matching. c) Define a miniature postsynaptic potential. Answer each in 1–3 sentences.",
          "markScheme": [
            {
              "text": "Lumped elements ignore internal spatial voltage gradients; distributed models retain them."
            },
            {
              "text": "Parent input conductance matches the sum of daughter loads at common branch voltage."
            },
            {
              "text": "A miniature event is a graded response associated with one released vesicle."
            }
          ],
          "modelAnswer": [
            "Lumped elements ignore internal spatial voltage gradients; distributed models retain them.",
            "Parent input conductance matches the sum of daughter loads at common branch voltage.",
            "A miniature event is a graded response associated with one released vesicle."
          ],
          "hints": [
            {
              "body": "State the requested definitions and model assumptions before interpreting the observation."
            },
            {
              "body": "Separate local input, dendritic transfer and somatic observation; organize the requested subparts."
            }
          ],
          "points": 1,
          "source": "L05 PDF3–5,10,20"
        },
        {
          "id": "L05-a2",
          "role": "explanation",
          "type": "written",
          "difficulty": "medium",
          "prompt": "Explain how a dendritic tree can be replaced by a finite cylinder attached to a lumped soma. Sketch the equivalent circuit, derive the branch law and state the conditions that can make the reduction fail.",
          "markScheme": [
            {
              "text": "Draw a lumped somatic resistance/capacitance with a dendritic cable."
            },
            {
              "text": "Daughter conductances add at a common voltage."
            },
            {
              "text": "With common material factor, $d_P^{3/2}=\\sum_jd_j^{3/2}$."
            },
            {
              "text": "Require common linear passive parameters and negligible extracellular resistance."
            },
            {
              "text": "Finite sealed tips require equal total electrotonic paths."
            },
            {
              "text": "Unmatched geometry, unequal paths or active membrane violate the exact reduction."
            }
          ],
          "modelAnswer": [
            "Draw a lumped somatic resistance/capacitance with a dendritic cable.",
            "Daughter conductances add at a common voltage.",
            "With common material factor, $d_P^{3/2}=\\sum_jd_j^{3/2}$.",
            "Require common linear passive parameters and negligible extracellular resistance.",
            "Finite sealed tips require equal total electrotonic paths.",
            "Unmatched geometry, unequal paths or active membrane violate the exact reduction."
          ],
          "hints": [
            {
              "body": "State the requested definitions and model assumptions before interpreting the observation."
            },
            {
              "body": "Separate local input, dendritic transfer and somatic observation; organize the requested subparts."
            }
          ],
          "points": 1,
          "source": "L05 PDF20–29,31"
        },
        {
          "id": "L05-a3",
          "role": "calculation",
          "sectionId": "finite",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "A sealed equivalent cylinder retains $75\\%$ of the soma voltage increment at its terminal. Its physical length is $0.4\\,\\mathrm{mm}$, $R_m=1.6\\,\\Omega\\,\\mathrm{m}^2$ and $R_i=1.2\\,\\Omega\\,\\mathrm{m}$. Infer electrotonic length, local length constant, diameter and one-arm finite input conductance. No other somatic load is included.",
          "stages": [
            {
              "title": "Choose boundary relation",
              "choices": [
                {
                  "label": "$f=1/\\cosh L$"
                },
                {
                  "label": "$f=e^{-L}$"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "The sealed terminal has zero axial current."
              ]
            },
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "Remaining fraction",
                  "answer": {
                    "value": 0.75,
                    "unit": "",
                    "tolerance": 7.5e-07,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 0.75,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Physical length",
                  "answer": {
                    "value": 0.0004,
                    "unit": "m",
                    "tolerance": 4e-10,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 0.0004,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Specific resistance",
                  "answer": {
                    "value": 1.6,
                    "unit": "ohm*m2",
                    "tolerance": 1.6e-06,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 1.6,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Axial resistivity",
                  "answer": {
                    "value": 1.2,
                    "unit": "ohm*m",
                    "tolerance": 1.2e-06,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 1.2,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                }
              ],
              "modelAnswer": [
                "Convert each stated quantity to the requested unit before evaluating."
              ]
            },
            {
              "title": "Electrotonic length",
              "answer": {
                "value": 0.7953654612239056,
                "unit": "",
                "tolerance": 0.0023860963836717167,
                "verification": {
                  "relation": "sealedLength",
                  "inputs": {
                    "fraction": 0.75
                  },
                  "displayScale": 1
                }
              },
              "tex": "L=\\operatorname{acosh}(1/f)",
              "modelAnswer": [
                "Use the remaining fraction.",
                "$L=\\operatorname{acosh}(1/f)$",
                "$0.79536546$"
              ]
            },
            {
              "title": "Length constant",
              "answer": {
                "value": 0.0005029134649428722,
                "unit": "m",
                "tolerance": 1.5087403948286166e-06,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.0004,
                    "b": 0.7953654612239056
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\lambda=\\ell/L",
              "modelAnswer": [
                "Physical and electrotonic lengths are different.",
                "$\\lambda=\\ell/L$",
                "$0.00050291346\\,\\text{m}$"
              ]
            },
            {
              "title": "Diameter",
              "answer": {
                "value": 7.587658596625365e-07,
                "unit": "m",
                "tolerance": 2.2762975789876096e-09,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 2.9999999999999996,
                    "b": 2.5292195322084553e-07
                  },
                  "displayScale": 1
                }
              },
              "tex": "d=4R_i\\lambda^2/R_m",
              "modelAnswer": [
                "Rearrange before evaluating.",
                "$d=4R_i\\lambda^2/R_m$",
                "$7.5876586e-07\\,\\text{m}$"
              ]
            },
            {
              "title": "Finite conductance",
              "answer": {
                "value": 4.955870665937146e-10,
                "unit": "S",
                "tolerance": 1.4867611997811438e-12,
                "verification": {
                  "relation": "rallConductance",
                  "inputs": {
                    "diameter": 7.587658596625365e-07,
                    "rm": 1.6,
                    "ri": 1.2,
                    "length": 0.7953654612239056
                  },
                  "displayScale": 1
                }
              },
              "tex": "G_N=\\frac{\\pi d^{3/2}}{2\\sqrt{R_iR_m}}\\tanh L",
              "modelAnswer": [
                "The finite conductance is below the semi-infinite reference.",
                "$G_N=\\frac{\\pi d^{3/2}}{2\\sqrt{R_iR_m}}\\tanh L$",
                "$4.9558707e-10\\,\\text{S}$"
              ]
            },
            {
              "title": "Plausibility",
              "choices": [
                {
                  "label": "A sealed endpoint and one-arm input convention are required for this inference."
                },
                {
                  "label": "An arbitrary endpoint and two-arm input convention give the same inference."
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "A sealed endpoint and one-arm input convention are required for this inference."
              ]
            }
          ],
          "hints": [
            {
              "body": "Use sealed attenuation, then invert the length constant geometry before calculating finite conductance."
            },
            {
              "body": "Start with $L=\\operatorname{acosh}(1/0.75)$. Divide physical length by $L$, rearrange the diameter relation, then apply the sealed conductance factor."
            }
          ],
          "modelAnswer": [
            "The sealed terminal has zero axial current.",
            "Convert each stated quantity to the requested unit before evaluating.",
            "Use the remaining fraction.",
            "Physical and electrotonic lengths are different.",
            "Rearrange before evaluating.",
            "The finite conductance is below the semi-infinite reference."
          ],
          "points": 1,
          "source": "L05 PDF 28"
        },
        {
          "id": "L05-a4",
          "role": "calculation",
          "sectionId": "soma",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "A small steady $60\\,\\mathrm{pA}$ input gives a somatic increment of $3\\,\\mathrm{mV}$. Separate evidence gives $G_S=5\\,\\mathrm{nS}$. Find total and dendritic conductances, the load ratio, dendritic steady current fraction and dendritic current. Explain why the ratio is not a percentage.",
          "stages": [
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "Supplied current",
                  "answer": {
                    "value": 6e-11,
                    "unit": "A",
                    "tolerance": 6e-17,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 6e-11,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Voltage increment",
                  "answer": {
                    "value": 0.003,
                    "unit": "V",
                    "tolerance": 3e-09,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 0.003,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Somatic conductance",
                  "answer": {
                    "value": 5e-09,
                    "unit": "S",
                    "tolerance": 5e-15,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 5e-09,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                }
              ],
              "modelAnswer": [
                "Convert each stated quantity to the requested unit before evaluating."
              ]
            },
            {
              "title": "Total conductance",
              "answer": {
                "value": 2e-08,
                "unit": "S",
                "tolerance": 6e-11,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 6e-11,
                    "b": 0.003
                  },
                  "displayScale": 1
                }
              },
              "tex": "G_N=I/V",
              "modelAnswer": [
                "Use voltage increment, not absolute resting potential.",
                "$G_N=I/V$",
                "$2e-08\\,\\text{S}$"
              ]
            },
            {
              "title": "Dendritic conductance",
              "answer": {
                "value": 1.5e-08,
                "unit": "S",
                "tolerance": 4.5e-11,
                "verification": {
                  "relation": "sum",
                  "inputs": {
                    "a": 2e-08,
                    "b": -5e-09
                  },
                  "displayScale": 1
                }
              },
              "tex": "G_D=G_N-G_S",
              "modelAnswer": [
                "Subtract the parallel somatic load.",
                "$G_D=G_N-G_S$",
                "$1.5e-08\\,\\text{S}$"
              ],
              "commonErrors": [
                {
                  "wrongValue": 2.5e-08,
                  "tolerance": 1e-12,
                  "why": "The soma is already part of total conductance. Subtract it rather than adding it again.",
                  "verification": {
                    "relation": "sum",
                    "inputs": {
                      "a": 2e-08,
                      "b": 5e-09
                    }
                  }
                }
              ]
            },
            {
              "title": "Load ratio",
              "answer": {
                "value": 3,
                "unit": "",
                "tolerance": 0.009000000000000001,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1.5e-08,
                    "b": 5e-09
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\rho=G_D/G_S",
              "modelAnswer": [
                "A conductance ratio can exceed unity.",
                "$\\rho=G_D/G_S$",
                "$3$"
              ]
            },
            {
              "title": "Dendritic fraction",
              "answer": {
                "value": 0.75,
                "unit": "",
                "tolerance": 0.0022500000000000003,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 3,
                    "b": 4
                  },
                  "displayScale": 1
                }
              },
              "tex": "f_D=\\rho/(1+\\rho)",
              "modelAnswer": [
                "The current fraction is bounded.",
                "$f_D=\\rho/(1+\\rho)$",
                "$0.75$"
              ]
            },
            {
              "title": "Dendritic current",
              "answer": {
                "value": 4.5e-11,
                "unit": "A",
                "tolerance": 1.35e-13,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 6e-11,
                    "b": 0.75
                  },
                  "displayScale": 1
                }
              },
              "tex": "I_D=I f_D",
              "modelAnswer": [
                "The remainder flows through the steady somatic load.",
                "$I_D=I f_D$",
                "$4.5e-11\\,\\text{A}$"
              ]
            },
            {
              "title": "Plausibility",
              "choices": [
                {
                  "label": "The load ratio exceeds unity while the steady current fraction stays below unity."
                },
                {
                  "label": "A load ratio above unity means more than all the supplied current enters dendrites."
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "The load ratio exceeds unity while the steady current fraction stays below unity."
              ]
            }
          ],
          "hints": [
            {
              "body": "Infer the total parallel load from small steady current and voltage, then separate its components."
            },
            {
              "body": "Start with $G_N=(60\\,\\mathrm{pA})/(3\\,\\mathrm{mV})$. Subtract the soma, form the ratio, convert to a fraction and calculate current."
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating.",
            "Use voltage increment, not absolute resting potential.",
            "Subtract the parallel somatic load.",
            "A conductance ratio can exceed unity.",
            "The current fraction is bounded.",
            "The remainder flows through the steady somatic load."
          ],
          "points": 1,
          "source": "L05 PDF 31"
        },
        {
          "id": "L05-a5",
          "role": "methods",
          "type": "written",
          "difficulty": "medium",
          "prompt": "Read the source compartment-response panel. Identify input and recording sites, explain amplitude/width/latency changes and propose a control before attributing a small somatic response to a weak synapse. What measurement would justify splitting the dendrite into multiple compartments?",
          "markScheme": [
            {
              "text": "The recording remains at compartment one, the soma."
            },
            {
              "text": "Inputs are at one, five or nine."
            },
            {
              "text": "Distal inputs are smaller, broader and delayed at the soma."
            },
            {
              "text": "Control input amplitude/waveform and baseline before comparing transfer."
            },
            {
              "text": "A somatic peak alone does not uniquely identify local synaptic strength."
            },
            { "text": "A reproducible site-dependent amplitude or latency under a matched passive stimulus demonstrates spatial structure a single compartment cannot represent." }
          ],
          "modelAnswer": [
            "The recording remains at compartment one, the soma.",
            "Inputs are at one, five or nine.",
            "Distal inputs are smaller, broader and delayed at the soma.",
            "Control input amplitude/waveform and baseline before comparing transfer.",
            "A somatic peak alone does not uniquely identify local synaptic strength.",
            "A reproducible site-dependent amplitude or latency under a matched passive stimulus demonstrates spatial structure a single compartment cannot represent."
          ],
          "hints": [
            {
              "body": "State the requested definitions and model assumptions before interpreting the observation."
            },
            {
              "body": "Separate local input, dendritic transfer and somatic observation; organize the requested subparts."
            }
          ],
          "points": 1,
          "source": "L05 PDF19",
          "figure": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 5, PDF page 19. Tree, compartment chain and somatic EPSP traces for inputs at different locations. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 5, PDF page 19. Tree, compartment chain and somatic EPSP traces for inputs at different locations. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L05/compartments.webp', import.meta.url).href,
              "alt": "Lecture 5, PDF page 19. Tree, compartment chain and somatic EPSP traces for inputs at different locations. Original labels, axes and scale bars retained.",
              "aspect": 0.7426829268292683,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ]
    },
    {
      "id": "L05-mock-B",
      "title": "Mock B: audit a branching model and its timing",
      "coverage": "Lectures 1–5. Rall assumptions, complete paths, characteristic timing and current versus conductance stimuli.",
      "questions": [
        {
          "id": "L05-b1",
          "role": "concepts",
          "type": "written",
          "difficulty": "medium",
          "prompt": "a) Define electrotonic path length. b) Distinguish a current source from a synaptic conductance. c) State the one-arm input resistance convention.",
          "markScheme": [
            {
              "text": "Sum segment length divided by local length constant along a single soma-to-tip route."
            },
            {
              "text": "Current is prescribed independently in the ideal source; conductance current depends on driving force."
            },
            {
              "text": "One-arm semi-infinite input resistance is $r_i\\lambda$."
            }
          ],
          "modelAnswer": [
            "Sum segment length divided by local length constant along a single soma-to-tip route.",
            "Current is prescribed independently in the ideal source; conductance current depends on driving force.",
            "One-arm semi-infinite input resistance is $r_i\\lambda$."
          ],
          "hints": [
            {
              "body": "State the requested definitions and model assumptions before interpreting the observation."
            },
            {
              "body": "Separate local input, dendritic transfer and somatic observation; organize the requested subparts."
            }
          ],
          "points": 1,
          "source": "L05 PDF7,22,29,33"
        },
        {
          "id": "L05-b2",
          "role": "explanation",
          "type": "written",
          "difficulty": "medium",
          "prompt": "A tree has approximately matched local diameters. Explain why this does not establish finite-cylinder equivalence. Sketch two paths and explain the additional tests, including what changes if one branch alone changes membrane resistance.",
          "markScheme": [
            {
              "text": "Check all nodes, not only one bifurcation."
            },
            {
              "text": "Calculate each local length constant from its own diameter and material parameters."
            },
            {
              "text": "Sum electrotonic lengths to each sealed terminal."
            },
            {
              "text": "Unequal endpoint paths defeat the exact finite reduction."
            },
            {
              "text": "Changing one branch resistance also breaks common passive material assumptions."
            },
            {
              "text": "A lumped soma can remain separate even if its own membrane parameters differ."
            }
          ],
          "modelAnswer": [
            "Check all nodes, not only one bifurcation.",
            "Calculate each local length constant from its own diameter and material parameters.",
            "Sum electrotonic lengths to each sealed terminal.",
            "Unequal endpoint paths defeat the exact finite reduction.",
            "Changing one branch resistance also breaks common passive material assumptions.",
            "A lumped soma can remain separate even if its own membrane parameters differ."
          ],
          "hints": [
            {
              "body": "State the requested definitions and model assumptions before interpreting the observation."
            },
            {
              "body": "Separate local input, dendritic transfer and somatic observation; organize the requested subparts."
            }
          ],
          "points": 1,
          "source": "L05 PDF20–29; Exercise5 1b–c"
        },
        {
          "id": "L05-b3",
          "role": "calculation",
          "sectionId": "paths",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "A stem has length $0.2\\,\\mathrm{mm}$ and diameter $4\\,\\mu\\mathrm{m}$. Its daughters A and B are $0.24\\,\\mathrm{mm}$ by $2\\,\\mu\\mathrm{m}$ and $0.18\\,\\mathrm{mm}$ by $1\\,\\mu\\mathrm{m}$. All use $R_m=2\\,\\Omega\\,\\mathrm{m}^2$ and $R_i=1\\,\\Omega\\,\\mathrm{m}$. Find the three length constants, two complete electrotonic routes and the parent diameter required to match these daughters. Audit this finite sealed reduction.",
          "stages": [
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "Specific resistance",
                  "answer": {
                    "value": 2,
                    "unit": "ohm*m2",
                    "tolerance": 2e-06,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 2,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Axial resistivity",
                  "answer": {
                    "value": 1,
                    "unit": "ohm*m",
                    "tolerance": 1e-06,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 1,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Stem length",
                  "answer": {
                    "value": 0.0002,
                    "unit": "m",
                    "tolerance": 2e-10,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 0.0002,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "A length",
                  "answer": {
                    "value": 0.00024,
                    "unit": "m",
                    "tolerance": 2.4e-10,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 0.00024,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "B length",
                  "answer": {
                    "value": 0.00018,
                    "unit": "m",
                    "tolerance": 1.8e-10,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 0.00018,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                }
              ],
              "modelAnswer": [
                "Convert each stated quantity to the requested unit before evaluating."
              ]
            },
            {
              "title": "Stem length constant",
              "answer": {
                "value": 0.001414213562373095,
                "unit": "m",
                "tolerance": 4.242640687119285e-06,
                "verification": {
                  "relation": "cableLength",
                  "inputs": {
                    "rm": 159154.94309189534,
                    "ri": 79577471545.94768
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\lambda_j=\\sqrt{R_md_j/(4R_i)}",
              "modelAnswer": [
                "Each segment uses its own diameter.",
                "$\\lambda_j=\\sqrt{R_md_j/(4R_i)}$",
                "$0.0014142136\\,\\text{m}$"
              ]
            },
            {
              "title": "A length constant",
              "answer": {
                "value": 0.001,
                "unit": "m",
                "tolerance": 3e-06,
                "verification": {
                  "relation": "cableLength",
                  "inputs": {
                    "rm": 318309.8861837907,
                    "ri": 318309886183.7907
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\lambda_j=\\sqrt{R_md_j/(4R_i)}",
              "modelAnswer": [
                "Each segment uses its own diameter.",
                "$\\lambda_j=\\sqrt{R_md_j/(4R_i)}$",
                "$0.001\\,\\text{m}$"
              ]
            },
            {
              "title": "B length constant",
              "answer": {
                "value": 0.0007071067811865475,
                "unit": "m",
                "tolerance": 2.1213203435596424e-06,
                "verification": {
                  "relation": "cableLength",
                  "inputs": {
                    "rm": 636619.7723675814,
                    "ri": 1273239544735.1628
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\lambda_j=\\sqrt{R_md_j/(4R_i)}",
              "modelAnswer": [
                "Each segment uses its own diameter.",
                "$\\lambda_j=\\sqrt{R_md_j/(4R_i)}$",
                "$0.00070710678\\,\\text{m}$"
              ]
            },
            {
              "title": "Route A",
              "answer": {
                "value": 0.3814213562373095,
                "unit": "",
                "tolerance": 0.0011442640687119286,
                "verification": {
                  "relation": "pathLength",
                  "inputs": {
                    "segments": [
                      {
                        "length": 0.0002,
                        "lambda": 0.001414213562373095
                      },
                      {
                        "length": 0.00024,
                        "lambda": 0.001
                      }
                    ]
                  },
                  "displayScale": 1
                }
              },
              "tex": "L_{path}=L_{stem}+L_{daughter}",
              "modelAnswer": [
                "Compare complete paths, not the daughters alone.",
                "$L_{path}=L_{stem}+L_{daughter}$",
                "$0.38142136$"
              ]
            },
            {
              "title": "Route B",
              "answer": {
                "value": 0.39597979746446665,
                "unit": "",
                "tolerance": 0.0011879393923934,
                "verification": {
                  "relation": "pathLength",
                  "inputs": {
                    "segments": [
                      {
                        "length": 0.0002,
                        "lambda": 0.001414213562373095
                      },
                      {
                        "length": 0.00018,
                        "lambda": 0.0007071067811865475
                      }
                    ]
                  },
                  "displayScale": 1
                }
              },
              "tex": "L_{path}=L_{stem}+L_{daughter}",
              "modelAnswer": [
                "Compare complete paths, not the daughters alone.",
                "$L_{path}=L_{stem}+L_{daughter}$",
                "$0.3959798$"
              ]
            },
            {
              "title": "Matched parent diameter",
              "answer": {
                "value": 2.4472608147714757e-06,
                "unit": "m",
                "tolerance": 7.341782444314428e-09,
                "verification": {
                  "relation": "rallDiameter",
                  "inputs": {
                    "diameters": [
                      2e-06,
                      1e-06
                    ]
                  },
                  "displayScale": 1
                }
              },
              "tex": "d_P=(d_A^{3/2}+d_B^{3/2})^{2/3}",
              "modelAnswer": [
                "The specified parent is not the matched equivalent.",
                "$d_P=(d_A^{3/2}+d_B^{3/2})^{2/3}$",
                "$2.4472608e-06\\,\\text{m}$"
              ]
            },
            {
              "title": "Audit",
              "choices": [
                {
                  "label": "Both local diameter matching and equal endpoint paths fail"
                },
                {
                  "label": "Local matching alone certifies an exact finite cylinder"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "Both independent requirements must be checked."
              ]
            }
          ],
          "hints": [
            {
              "body": "Compare both local conductance matching and complete electrotonic endpoint paths."
            },
            {
              "body": "Start with $\\lambda_{stem}=\\sqrt{(2\\,\\Omega\\,\\mathrm{m}^2)(4\\times10^{-6}\\,\\mathrm{m})/(4\\,\\Omega\\,\\mathrm{m})}$. Compute both route sums and independently check diameter matching."
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating.",
            "Each segment uses its own diameter.",
            "Each segment uses its own diameter.",
            "Each segment uses its own diameter.",
            "Compare complete paths, not the daughters alone.",
            "Compare complete paths, not the daughters alone.",
            "The specified parent is not the matched equivalent.",
            "Both independent requirements must be checked."
          ],
          "points": 1,
          "source": "L05 PDF 29"
        },
        {
          "id": "L05-b4",
          "role": "calculation",
          "sectionId": "exercise",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "Use the taught characteristic transit estimate for two daughter branches. A has $\\lambda_A=0.8\\,\\mathrm{mm}$, length $0.16\\,\\mathrm{mm}$ and $\\tau_A=20\\,\\mathrm{ms}$. B has $\\lambda_B=1\\,\\mathrm{mm}$, length $0.1\\,\\mathrm{mm}$ and $\\tau_B=20\\,\\mathrm{ms}$. Find their characteristic speeds and transit estimates. Change only A’s initial $R_m=2\\,\\Omega\\,\\mathrm{m}^2$ so its estimated transit matches B. Explain the model limitation.",
          "stages": [
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "A length constant",
                  "answer": {
                    "value": 0.0008,
                    "unit": "m",
                    "tolerance": 8e-10,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 0.0008,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "B length constant",
                  "answer": {
                    "value": 0.001,
                    "unit": "m",
                    "tolerance": 1e-09,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 0.001,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Time constant",
                  "answer": {
                    "value": 0.02,
                    "unit": "s",
                    "tolerance": 2e-08,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 0.02,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                }
              ],
              "modelAnswer": [
                "Convert each stated quantity to the requested unit before evaluating."
              ]
            },
            {
              "title": "A characteristic speed",
              "answer": {
                "value": 0.08,
                "unit": "m/s",
                "tolerance": 0.00024,
                "verification": {
                  "relation": "passiveSpeed",
                  "inputs": {
                    "lambda": 0.0008,
                    "tau": 0.02
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\theta_A=2\\lambda_A/\\tau_A",
              "modelAnswer": [
                "Characteristic passive timing is not spike conduction.",
                "$\\theta_A=2\\lambda_A/\\tau_A$",
                "$0.08\\,\\text{m/s}$"
              ]
            },
            {
              "title": "B characteristic speed",
              "answer": {
                "value": 0.1,
                "unit": "m/s",
                "tolerance": 0.00030000000000000003,
                "verification": {
                  "relation": "passiveSpeed",
                  "inputs": {
                    "lambda": 0.001,
                    "tau": 0.02
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\theta_B=2\\lambda_B/\\tau_B",
              "modelAnswer": [
                "Use consistent distance and time units.",
                "$\\theta_B=2\\lambda_B/\\tau_B$",
                "$0.1\\,\\text{m/s}$"
              ]
            },
            {
              "title": "A transit estimate",
              "answer": {
                "value": 0.002,
                "unit": "s",
                "tolerance": 6e-06,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.00016,
                    "b": 0.08
                  },
                  "displayScale": 1
                }
              },
              "tex": "t_A=\\ell_A/\\theta_A",
              "modelAnswer": [
                "This is an approximate characteristic estimate.",
                "$t_A=\\ell_A/\\theta_A$",
                "$0.002\\,\\text{s}$"
              ]
            },
            {
              "title": "B transit estimate",
              "answer": {
                "value": 0.001,
                "unit": "s",
                "tolerance": 3e-06,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.0001,
                    "b": 0.1
                  },
                  "displayScale": 1
                }
              },
              "tex": "t_B=\\ell_B/\\theta_B",
              "modelAnswer": [
                "Use the target estimated transit time.",
                "$t_B=\\ell_B/\\theta_B$",
                "$0.001\\,\\text{s}$"
              ]
            },
            {
              "title": "Required A speed",
              "answer": {
                "value": 0.16,
                "unit": "m/s",
                "tolerance": 0.00048,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.00016,
                    "b": 0.001
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\theta_{A,new}=\\ell_A/t_B",
              "modelAnswer": [
                "A must have a higher characteristic speed.",
                "$\\theta_{A,new}=\\ell_A/t_B$",
                "$0.16\\,\\text{m/s}$"
              ]
            },
            {
              "title": "Required specific resistance",
              "answer": {
                "value": 0.5,
                "unit": "ohm*m2",
                "tolerance": 0.0015,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 2,
                    "b": 0.25
                  },
                  "displayScale": 1
                }
              },
              "tex": "R_{m,new}=R_{m,old}(\\theta_{old}/\\theta_{new})^2",
              "modelAnswer": [
                "Both length constant and time constant change.",
                "$R_{m,new}=R_{m,old}(\\theta_{old}/\\theta_{new})^2$",
                "$0.5\\,\\text{ohm*m2}$"
              ]
            },
            {
              "title": "Model limits",
              "choices": [
                {
                  "label": "Equal estimates do not imply equal actual EPSP peaks; common material assumptions are broken"
                },
                {
                  "label": "Equal estimates prove identical EPSP waveforms and preserve common material assumptions"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "Changing one branch resistance breaks common membrane parameters; passive delay is not one universal velocity."
              ]
            }
          ],
          "hints": [
            {
              "body": "Use characteristic speed and approximate transit, then resistance scaling at fixed diameter and capacitance."
            },
            {
              "body": "Start with $\\theta_A=2(0.8\\,\\mathrm{mm})/(20\\,\\mathrm{ms})$. Compute B’s target time, required A speed and the squared resistance ratio."
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating.",
            "Characteristic passive timing is not spike conduction.",
            "Use consistent distance and time units.",
            "This is an approximate characteristic estimate.",
            "Use the target estimated transit time.",
            "A must have a higher characteristic speed.",
            "Both length constant and time constant change.",
            "Changing one branch resistance breaks common membrane parameters; passive delay is not one universal velocity."
          ],
          "points": 1,
          "source": "Exercise 5 p1–2, answers p1–2; L04 PDF2; L05 PDF29"
        },
        {
          "id": "L05-b5",
          "role": "methods",
          "type": "written",
          "difficulty": "medium",
          "prompt": "Compare the source step-pulse panel with the alpha-like conductance panel. Design a small-response somatic recording comparison and explain the limits of waveform addition. How would an ionotropic synaptic response differ mechanistically from a metabotropic one in interpreting the experiment?",
          "markScheme": [
            {
              "text": "Keep the recording site and input location controlled."
            },
            {
              "text": "The source panels depict model responses, not new recordings."
            },
            {
              "text": "Compare full voltage waveforms, including width and delay."
            },
            {
              "text": "A fixed current pulse differs from voltage-dependent conductance current."
            },
            {
              "text": "Large conductance changes or active channels can invalidate current-source superposition."
            },
            { "text": "Ionotropic receptors directly gate an ion pathway. Metabotropic receptors change a downstream process through signaling, so the waveform can include extra kinetics." }
          ],
          "modelAnswer": [
            "Keep the recording site and input location controlled.",
            "The source panels depict model responses, not new recordings.",
            "Compare full voltage waveforms, including width and delay.",
            "A fixed current pulse differs from voltage-dependent conductance current.",
            "Large conductance changes or active channels can invalidate current-source superposition.",
            "Ionotropic receptors directly gate an ion pathway. Metabotropic receptors change a downstream process through signaling, so the waveform can include extra kinetics."
          ],
          "hints": [
            {
              "body": "State the requested definitions and model assumptions before interpreting the observation."
            },
            {
              "body": "Separate local input, dendritic transfer and somatic observation; organize the requested subparts."
            }
          ],
          "points": 1,
          "source": "L05 PDF32–33",
          "figure": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 5, PDF page 33. Supplied ball-and-stick alpha-like stimulus and somatic response traces. The original input-current label is retained; slide prose describes conductance, so only the qualitative shape is used. No new simulation. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 5, PDF page 33. Supplied ball-and-stick alpha-like stimulus and somatic response traces. The original input-current label is retained; slide prose describes conductance, so only the qualitative shape is used. No new simulation. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L05/alpha.webp', import.meta.url).href,
              "alt": "Lecture 5, PDF page 33. Supplied ball-and-stick alpha-like stimulus and somatic response traces. The original input-current label is retained; slide prose describes conductance, so only the qualitative shape is used. No new simulation. Original labels, axes and scale bars retained.",
              "aspect": 1.0654885654885655,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ]
    },
    {
      "id": "L05-mock-C",
      "title": "Mock C: unequal stem loads and local active events",
      "coverage": "Lectures 1–5. Inverse matching, unequal sealed loads, receptor mechanisms, dendritic spikes and backpropagation.",
      "questions": [
        {
          "id": "L05-c1",
          "role": "concepts",
          "type": "written",
          "difficulty": "medium",
          "prompt": "a) Compare ionotropic and metabotropic receptors. b) Distinguish local dendritic spikes from backpropagating spikes. c) Define the dendritic-to-somatic load ratio.",
          "markScheme": [
            {
              "text": "Ionotropic receptors directly gate channels; metabotropic receptors act through intermediates."
            },
            {
              "text": "Local spikes begin in dendrites; backpropagating spikes originate axonally."
            },
            {
              "text": "$\\rho=G_D/G_S$ is a conductance ratio, not a bounded current fraction."
            }
          ],
          "modelAnswer": [
            "Ionotropic receptors directly gate channels; metabotropic receptors act through intermediates.",
            "Local spikes begin in dendrites; backpropagating spikes originate axonally.",
            "$\\rho=G_D/G_S$ is a conductance ratio, not a bounded current fraction."
          ],
          "hints": [
            {
              "body": "State the requested definitions and model assumptions before interpreting the observation."
            },
            {
              "body": "Separate local input, dendritic transfer and somatic observation; organize the requested subparts."
            }
          ],
          "points": 1,
          "source": "L05 PDF10,12–15,31"
        },
        {
          "id": "L05-c2",
          "role": "explanation",
          "type": "written",
          "difficulty": "medium",
          "prompt": "Explain how a local input can remain graded, initiate a local dendritic spike or trigger an axonal spike. Sketch the three cases and explain potassium-dependent damping of backpropagating excitation.",
          "markScheme": [
            {
              "text": "A passive input filters and attenuates during spread."
            },
            {
              "text": "Voltage-gated channels can generate a local dendritic regenerative event."
            },
            {
              "text": "Such events may remain local or reach axonal threshold."
            },
            {
              "text": "Axonal initiation can be followed by backpropagation into dendrites."
            },
            {
              "text": "Outward A-type $\\mathrm{K}^{+}$ current opposes depolarization and damps the echo."
            },
            {
              "text": "No channel kinetic model or endless repetition follows from this qualitative account."
            }
          ],
          "modelAnswer": [
            "A passive input filters and attenuates during spread.",
            "Voltage-gated channels can generate a local dendritic regenerative event.",
            "Such events may remain local or reach axonal threshold.",
            "Axonal initiation can be followed by backpropagation into dendrites.",
            "Outward A-type $\\mathrm{K}^{+}$ current opposes depolarization and damps the echo.",
            "No channel kinetic model or endless repetition follows from this qualitative account."
          ],
          "hints": [
            {
              "body": "State the requested definitions and model assumptions before interpreting the observation."
            },
            {
              "body": "Separate local input, dendritic transfer and somatic observation; organize the requested subparts."
            }
          ],
          "points": 1,
          "source": "L05 PDF11–15"
        },
        {
          "id": "L05-c3",
          "role": "calculation",
          "sectionId": "matching",
          "difficulty": "medium",
          "type": "multiStepCalc",
          "prompt": "A parent diameter is $4\\,\\mu\\mathrm{m}$. One daughter is $2\\,\\mu\\mathrm{m}$. Find the other daughter needed for conductance matching, with common material parameters.",
          "stages": [
            {
              "title": "Rearrange",
              "choices": [
                {
                  "label": "$d_2=(d_P^{3/2}-d_1^{3/2})^{2/3}$"
                },
                {
                  "label": "$d_2=(d_P^2-d_1^2)^{1/2}$"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "Subtract the known daughter conductance power before taking the inverse power."
              ]
            },
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "Parent diameter",
                  "answer": {
                    "value": 4e-06,
                    "unit": "m",
                    "tolerance": 4e-12,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 4e-06,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Known daughter",
                  "answer": {
                    "value": 2e-06,
                    "unit": "m",
                    "tolerance": 2e-12,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 2e-06,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                }
              ],
              "modelAnswer": [
                "Convert each stated quantity to the requested unit before evaluating."
              ]
            },
            {
              "title": "Missing daughter",
              "answer": {
                "value": 2.9905318533567714e-06,
                "unit": "m",
                "tolerance": 8.971595560070314e-09,
                "verification": {
                  "relation": "powerRatio",
                  "inputs": {
                    "a": 5.1715728752538095e-09,
                    "b": 1,
                    "power": 0.6666666666666666
                  },
                  "displayScale": 1
                }
              },
              "tex": "d_2=(d_P^{3/2}-d_1^{3/2})^{2/3}",
              "modelAnswer": [
                "The remaining load is positive and smaller than the parent.",
                "$d_2=(d_P^{3/2}-d_1^{3/2})^{2/3}$",
                "$2.9905319e-06\\,\\text{m}$"
              ]
            },
            {
              "title": "Plausibility",
              "choices": [
                {
                  "label": "The result uses conductance matching and the stated passive geometry."
                },
                {
                  "label": "The result is valid for any active geometry without checking conditions."
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "The result uses conductance matching and the stated passive geometry."
              ]
            }
          ],
          "hints": [
            {
              "body": "This is inverse conductance matching, not an area balance."
            },
            {
              "body": "Start with $d_2^{3/2}=(4\\,\\mu\\mathrm{m})^{3/2}-(2\\,\\mu\\mathrm{m})^{3/2}$. Then take the inverse power and check positivity."
            }
          ],
          "modelAnswer": [
            "Subtract the known daughter conductance power before taking the inverse power.",
            "Convert each stated quantity to the requested unit before evaluating.",
            "The remaining load is positive and smaller than the parent."
          ],
          "points": 1,
          "source": "L05 PDF 20"
        },
        {
          "id": "L05-c4",
          "role": "calculation",
          "sectionId": "stems",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "Two independent sealed stems have diameters $2\\,\\mu\\mathrm{m}$ and $3\\,\\mu\\mathrm{m}$, common $R_i=1\\,\\Omega\\,\\mathrm{m}$ and $R_m=2\\,\\Omega\\,\\mathrm{m}^2$, but electrotonic lengths $0.4$ and $1.2$. Compute both finite conductances, their sum and the somatic voltage increment for a $20\\,\\mathrm{pA}$ steady input with no other load. Decide whether a diameter-only reduction is justified.",
          "stages": [
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "First diameter",
                  "answer": {
                    "value": 2e-06,
                    "unit": "m",
                    "tolerance": 2e-12,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 2e-06,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Second diameter",
                  "answer": {
                    "value": 3e-06,
                    "unit": "m",
                    "tolerance": 3e-12,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 3e-06,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "First length",
                  "answer": {
                    "value": 0.4,
                    "unit": "",
                    "tolerance": 4e-07,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 0.4,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Second length",
                  "answer": {
                    "value": 1.2,
                    "unit": "",
                    "tolerance": 1.2e-06,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 1.2,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                }
              ],
              "modelAnswer": [
                "Convert each stated quantity to the requested unit before evaluating."
              ]
            },
            {
              "title": "Stem 1 conductance",
              "answer": {
                "value": 1.19364486856008e-09,
                "unit": "S",
                "tolerance": 3.58093460568024e-12,
                "verification": {
                  "relation": "rallConductance",
                  "inputs": {
                    "diameter": 2e-06,
                    "ri": 1,
                    "rm": 2,
                    "length": 0.4
                  },
                  "displayScale": 1
                }
              },
              "tex": "G_j=\\frac{\\pi d_j^{3/2}}{2\\sqrt{R_iR_m}}\\tanh L_j",
              "modelAnswer": [
                "Retain the distinct endpoint factor.",
                "$G_j=\\frac{\\pi d_j^{3/2}}{2\\sqrt{R_iR_m}}\\tanh L_j$",
                "$1.1936449e-09\\,\\text{S}$"
              ]
            },
            {
              "title": "Stem 2 conductance",
              "answer": {
                "value": 4.811416085866927e-09,
                "unit": "S",
                "tolerance": 1.4434248257600782e-11,
                "verification": {
                  "relation": "rallConductance",
                  "inputs": {
                    "diameter": 3e-06,
                    "ri": 1,
                    "rm": 2,
                    "length": 1.2
                  },
                  "displayScale": 1
                }
              },
              "tex": "G_j=\\frac{\\pi d_j^{3/2}}{2\\sqrt{R_iR_m}}\\tanh L_j",
              "modelAnswer": [
                "Retain the distinct endpoint factor.",
                "$G_j=\\frac{\\pi d_j^{3/2}}{2\\sqrt{R_iR_m}}\\tanh L_j$",
                "$4.8114161e-09\\,\\text{S}$"
              ]
            },
            {
              "title": "Combined load",
              "answer": {
                "value": 6.005060954427007e-09,
                "unit": "S",
                "tolerance": 1.801518286328102e-11,
                "verification": {
                  "relation": "sum",
                  "inputs": {
                    "a": 1.19364486856008e-09,
                    "b": 4.811416085866927e-09
                  },
                  "displayScale": 1
                }
              },
              "tex": "G_N=G_1+G_2",
              "modelAnswer": [
                "Parallel conductances add.",
                "$G_N=G_1+G_2$",
                "$6.005061e-09\\,\\text{S}$"
              ]
            },
            {
              "title": "Somatic increment",
              "answer": {
                "value": 0.0033305240615843783,
                "unit": "V",
                "tolerance": 9.991572184753135e-06,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 2e-11,
                    "b": 6.005060954427007e-09
                  },
                  "displayScale": 1
                }
              },
              "tex": "V=I/G_N",
              "modelAnswer": [
                "Current divides among the two specified loads.",
                "$V=I/G_N$",
                "$0.0033305241\\,\\text{V}$"
              ]
            },
            {
              "title": "Reduction",
              "choices": [
                {
                  "label": "Unequal endpoint lengths prevent this diameter-only finite reduction"
                },
                {
                  "label": "A diameter-only sum remains exact despite unequal endpoint lengths"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "The finite conductance factors cannot be cancelled when endpoint lengths differ."
              ]
            }
          ],
          "hints": [
            {
              "body": "Keep unequal sealed stem loads separate before summing their conductances."
            },
            {
              "body": "Start with $G_1=[\\pi(2\\times10^{-6}\\,\\mathrm{m})^{3/2}/(2\\sqrt{R_iR_m})]\\tanh(0.4)$. Evaluate both loads, add, then divide current by total conductance."
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating.",
            "Retain the distinct endpoint factor.",
            "Retain the distinct endpoint factor.",
            "Parallel conductances add.",
            "Current divides among the two specified loads.",
            "The finite conductance factors cannot be cancelled when endpoint lengths differ."
          ],
          "points": 1,
          "source": "L05 PDF 26"
        },
        {
          "id": "L05-c5",
          "role": "methods",
          "type": "written",
          "difficulty": "medium",
          "prompt": "Interpret the source backpropagation panel. State how recording location and origin of the spike affect the inference. Propose a controlled comparison testing whether stronger dendritic invasion follows reduced potassium damping, and give a limitation. Which observation distinguishes a locally initiated dendritic event from a backpropagating spike?",
          "markScheme": [
            {
              "text": "Identify axonal initiation before somatic/dendritic invasion."
            },
            {
              "text": "Compare aligned axonal, somatic and dendritic traces with known locations."
            },
            {
              "text": "Hold stimulus and baseline controlled before changing the damping condition."
            },
            {
              "text": "Reduced outward influence can permit stronger invasion, depending on other properties."
            },
            {
              "text": "Amplitude alone does not establish origin, kinetics or repetitive echo; no numerical latency is invented."
            },
            { "text": "Compare onset at dendritic and axonal or somatic sites under the same stimulus. Earlier local onset can support dendritic initiation, whereas arrival after the axonal spike supports backpropagation." }
          ],
          "modelAnswer": [
            "Identify axonal initiation before somatic/dendritic invasion.",
            "Compare aligned axonal, somatic and dendritic traces with known locations.",
            "Hold stimulus and baseline controlled before changing the damping condition.",
            "Reduced outward influence can permit stronger invasion, depending on other properties.",
            "Amplitude alone does not establish origin, kinetics or repetitive echo; no numerical latency is invented.",
            "Compare onset at dendritic and axonal or somatic sites under the same stimulus. Earlier local onset can support dendritic initiation, whereas arrival after the axonal spike supports backpropagation."
          ],
          "hints": [
            {
              "body": "State the requested definitions and model assumptions before interpreting the observation."
            },
            {
              "body": "Separate local input, dendritic transfer and somatic observation; organize the requested subparts."
            }
          ],
          "points": 1,
          "source": "L05 PDF14–15",
          "figure": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 5, PDF page 14. Source axonal, somatic and dendritic traces and their recording positions. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 5, PDF page 14. Source axonal, somatic and dendritic traces and their recording positions. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L05/backprop.webp', import.meta.url).href,
              "alt": "Lecture 5, PDF page 14. Source axonal, somatic and dendritic traces and their recording positions. Original labels, axes and scale bars retained.",
              "aspect": 1.6573426573426573,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ]
    }
  ]
};
content.formulaReference=equationSheet;
content.formulaReferenceNote='Official exam PDF p4, full-course reference. These questions require lectures 1–5 only.';
export default content;
