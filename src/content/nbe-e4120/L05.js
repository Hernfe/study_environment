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
    "Derive and audit conductance matching and finite equivalent-cylinder conditions.",
    "Infer geometry and somatic loads with consistent signs, units and boundary conditions."
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
  "segmentedPractice": true,
  "sections": [
    {
      "id": "overview",
      "title": "Overview: model, integrate, reduce",
      "keyTerms": [
        "dendritic"
      ],
      "source": "L05 PDF 1",
      "blocks": [
        {
          "type": "text",
          "body": "Choose a model for the question, then test its assumptions. This lecture moves from cellular representations to dendritic integration and equivalent cylinders. Use $V=V_m-V_{rest}$ in passive cable formulas. Positive supplied current depolarizes; positive ionic current is outward."
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
          "prompt": "What does a useful cellular model preserve?",
          "correct": 0,
          "options": [
            {
              "text": "The electrical behavior under study",
              "feedback": "Correct. The electrical behavior under study."
            },
            {
              "text": "Every anatomical detail of the cell",
              "feedback": "Use this distinction: The electrical behavior under study."
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
      "title": "Functional model classes",
      "keyTerms": [
        "conductance"
      ],
      "source": "L05 PDF 2",
      "blocks": [
        {
          "type": "text",
          "body": "Ohm and parallel conductance models link driving force to current. RC adds time dependence. Core conductor and cable models add spatial spread. GHK describes concentration/permeability effects; HH describes active spike generation. Names do not make their assumptions interchangeable."
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
              "feedback": "Use this distinction: The cable model of dendrites and axons."
            },
            {
              "text": "The cable model of dendrites and axons",
              "feedback": "Correct. The cable model of dendrites and axons."
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
        }
      ]
    },
    {
      "id": "structure",
      "title": "Structural representations",
      "keyTerms": [
        "isopotential",
        "compartment"
      ],
      "source": "L05 PDF 3",
      "blocks": [
        {
          "type": "text",
          "body": "Equivalent circuits replace biological parts by electrical elements. Ball-and-stick separates soma and dendrite. A single compartment is isopotential; connected compartments approximate a distributed cable. Functional and structural classifications answer different questions."
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
          "id": "L05-structure-check",
          "prompt": "What couples adjacent electrical compartments?",
          "correct": 0,
          "options": [
            {
              "text": "A resistive path for longitudinal current",
              "feedback": "Correct. A resistive path for longitudinal current."
            },
            {
              "text": "A capacitive path for longitudinal current",
              "feedback": "Use this distinction: A resistive path for longitudinal current."
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
        }
      ]
    },
    {
      "id": "lumped",
      "title": "Test the lumped approximation",
      "keyTerms": [],
      "source": "L05 PDF 4",
      "blocks": [
        {
          "type": "text",
          "body": "A lumped cell has negligible internal voltage differences at the scale of interest. Compare simultaneous responses at two intracellular sites during controlled injection. Physical smallness alone is insufficient; electrical size and the tested timescale matter."
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
              "feedback": "Use this distinction: Two sites have matching voltage responses."
            },
            {
              "text": "Two sites have matching voltage responses",
              "feedback": "Correct. Two sites have matching voltage responses."
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
        }
      ]
    },
    {
      "id": "distributed",
      "title": "Distributed properties and source distance",
      "keyTerms": [],
      "source": "L05 PDF 5",
      "blocks": [
        {
          "type": "text",
          "body": "The source frog neuromuscular traces become smaller and later at greater distance. Spatial variation cannot be collapsed to a single voltage. The plotted traces are supplied teaching data, not new recordings."
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
              "feedback": "Correct. Amplitude falls while response delay grows."
            },
            {
              "text": "Amplitude grows while response delay falls",
              "feedback": "Use this distinction: Amplitude falls while response delay grows."
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
        }
      ]
    },
    {
      "id": "one",
      "title": "One compartment: temporal filtering",
      "keyTerms": [
        "compartment"
      ],
      "source": "L05 PDF 6",
      "blocks": [
        {
          "type": "text",
          "body": "For a passive compartment, $I=C\\,dV/dt+V/R$. A step charges the membrane; after it ends, voltage relaxes. This model has temporal filtering but no internal spatial propagation. At steady state capacitive current vanishes."
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
          "prompt": "Which current vanishes at a constant voltage?",
          "correct": 1,
          "options": [
            {
              "text": "The current leaking through membrane resistance",
              "feedback": "Use this distinction: The current charging membrane capacitance."
            },
            {
              "text": "The current charging membrane capacitance",
              "feedback": "Correct. The current charging membrane capacitance."
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
        }
      ]
    },
    {
      "id": "two",
      "title": "Two compartments: coupling and current division",
      "keyTerms": [
        "conductance",
        "compartment"
      ],
      "source": "L05 PDF 7",
      "blocks": [
        {
          "type": "text",
          "body": "Injected current divides into local membrane and axial paths. The next compartment also charges and leaks, producing attenuation and broadening. Ideal current injection does not itself open channels. A separately specified conductance increase can shorten the local time constant."
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
              "feedback": "Correct. A specified increase in channel conductance."
            },
            {
              "text": "A prescribed current with channels unchanged",
              "feedback": "Use this distinction: A specified increase in channel conductance."
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
        }
      ]
    },
    {
      "id": "chemical",
      "title": "Chemical transmission sequence",
      "keyTerms": [],
      "source": "L05 PDF 9",
      "blocks": [
        {
          "type": "text",
          "body": "Presynaptic depolarization opens calcium channels. $\\mathrm{Ca}^{2+}$ entry triggers vesicle release. Transmitter binds postsynaptic receptors; ion flow changes postsynaptic voltage, which spreads. Calcium does not carry the signal across the cleft."
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
          "prompt": "What crosses the synaptic cleft in this sequence?",
          "correct": 1,
          "options": [
            {
              "text": "Presynaptic calcium flows into receptors",
              "feedback": "Use this distinction: Released transmitter binds to receptors."
            },
            {
              "text": "Released transmitter binds to receptors",
              "feedback": "Correct. Released transmitter binds to receptors."
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
      "title": "Receptors and miniature potentials",
      "keyTerms": [
        "ionotropic",
        "metabotropic"
      ],
      "source": "L05 PDF 10",
      "blocks": [
        {
          "type": "text",
          "body": "Ionotropic receptors are ligand-gated channels. Metabotropic receptors act through intermediate molecules. One vesicle produces a miniature postsynaptic event; multiple release events contribute to a compound graded response. Inhibition must be interpreted relative to reversal and threshold."
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
              "feedback": "Correct. An ionotropic postsynaptic receptor."
            },
            {
              "text": "A metabotropic postsynaptic receptor",
              "feedback": "Use this distinction: An ionotropic postsynaptic receptor."
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
        }
      ]
    },
    {
      "id": "graded",
      "title": "Graded integration and axonal threshold",
      "keyTerms": [],
      "source": "L05 PDF 11",
      "blocks": [
        {
          "type": "text",
          "body": "Local postsynaptic potentials attenuate and filter as they spread. Their summation can bring the axon hillock to threshold. Axonal propagation combines passive spread with active regeneration; myelinated conduction is saltatory and nondecremental."
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
          "prompt": "Where can summed input initiate an axonal spike?",
          "correct": 1,
          "options": [
            {
              "text": "At every dendritic site after transmitter",
              "feedback": "Use this distinction: At the axonal trigger region after threshold."
            },
            {
              "text": "At the axonal trigger region after threshold",
              "feedback": "Correct. At the axonal trigger region after threshold."
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
        }
      ]
    },
    {
      "id": "dendritic",
      "title": "Local dendritic spikes",
      "keyTerms": [
        "dendritic"
      ],
      "source": "L05 PDF 12–13",
      "blocks": [
        {
          "type": "text",
          "body": "Dendritic sodium and calcium spikes require voltage-gated channels. They can stay local or influence the soma and axonal threshold. Local nonlinear events can enhance or weaken input influence and participate in plasticity; detailed plasticity mechanisms are outside this deck."
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
              "feedback": "Correct. No, local active events can fail to propagate."
            },
            {
              "text": "Yes, local active events always propagate",
              "feedback": "Use this distinction: No, local active events can fail to propagate."
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
        }
      ]
    },
    {
      "id": "backprop",
      "title": "Backpropagating action potentials",
      "keyTerms": [
        "dendritic"
      ],
      "source": "L05 PDF 14",
      "blocks": [
        {
          "type": "text",
          "body": "An axonal spike can travel back into soma and dendrites. Its amplitude typically weakens with dendritic distance because passive properties and channel distribution both matter. This is different from a spike initiated locally in a dendrite."
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
              "feedback": "Use this distinction: At the axonal region before dendritic invasion."
            },
            {
              "text": "At the axonal region before dendritic invasion",
              "feedback": "Correct. At the axonal region before dendritic invasion."
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
        }
      ]
    },
    {
      "id": "atype",
      "title": "A-type potassium and echo suppression",
      "keyTerms": [
        "backpropagation",
        "dendritic"
      ],
      "source": "L05 PDF 15",
      "blocks": [
        {
          "type": "text",
          "body": "Dendritic A-type $\\mathrm{K}^{+}$ channels oppose depolarization through outward current. The taught increasing dendritic density damps backpropagation and limits repeated excitation by a spike’s own echo. It is not a universal claim about every dendritic channel distribution."
        },
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
      ],
      "formulas": [],
      "conceptQuiz": [
        {
          "id": "L05-atype-check",
          "prompt": "Which direction is potassium current during repolarizing efflux?",
          "correct": 0,
          "options": [
            {
              "text": "Outward current under the course convention",
              "feedback": "Correct. Outward current under the course convention."
            },
            {
              "text": "Inward current under the course convention",
              "feedback": "Use this distinction: Outward current under the course convention."
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
        }
      ]
    },
    {
      "id": "morphology",
      "title": "Dendritic trees and spatial organization",
      "keyTerms": [
        "conductance"
      ],
      "source": "L05 PDF 16–17",
      "blocks": [
        {
          "type": "text",
          "body": "Dendrites receive inputs through repeatedly branching thin membrane tubes. Different neuron classes have different trees. A synapse changes local conductance, and electrical response spreads through a geometry-dependent path. Summed physical tree length is not one soma-to-tip distance."
        },
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
              "feedback": "Use this distinction: A local postsynaptic conductance change."
            },
            {
              "text": "A local postsynaptic conductance change",
              "feedback": "Correct. A local postsynaptic conductance change."
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
        }
      ]
    },
    {
      "id": "equivalent",
      "title": "Why use an equivalent cylinder?",
      "keyTerms": [
        "dendritic"
      ],
      "source": "L05 PDF 18",
      "blocks": [
        {
          "type": "text",
          "body": "Rall reduction connects branching anatomy to measurable somatic responses. A lumped soma plus equivalent dendrite is a ball-and-stick model. Somatic access was the historical motivation; the slide does not establish that modern dendritic recording is impossible."
        },
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
              "feedback": "Correct. A dendritic tree satisfying model conditions."
            },
            {
              "text": "Any neuron regardless of branch conditions",
              "feedback": "Use this distinction: A dendritic tree satisfying model conditions."
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
        }
      ]
    },
    {
      "id": "distance",
      "title": "Interpret inputs to compartments one, five and nine",
      "keyTerms": [
        "compartment"
      ],
      "source": "L05 PDF 19",
      "blocks": [
        {
          "type": "text",
          "body": "The recording stays at soma, compartment one. More distant inputs produce smaller, slower and more delayed somatic responses in this source model. Input location changes while recording location is fixed. Do not read the schematic as newly measured data."
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
              "feedback": "Use this distinction: Compartment one, representing the soma."
            },
            {
              "text": "Compartment one, representing the soma",
              "feedback": "Correct. Compartment one, representing the soma."
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
        }
      ]
    },
    {
      "id": "matching",
      "title": "Conductance matching at a branch",
      "keyTerms": [
        "conductance"
      ],
      "source": "L05 PDF 20",
      "blocks": [
        {
          "type": "text",
          "body": "At a branch point the voltage is common and daughter currents add. With common passive material parameters, input conductance scales as $d^{3/2}$. Matching the parent to the sum of daughter conductances gives the three-halves law, not equality of areas."
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
          "prompt": "Which branch quantity adds in parallel?",
          "correct": 0,
          "options": [
            {
              "text": "The input conductances of daughter branches",
              "feedback": "Correct. The input conductances of daughter branches."
            },
            {
              "text": "The input resistances of daughter branches",
              "feedback": "Use this distinction: The input conductances of daughter branches."
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
        }
      ]
    },
    {
      "id": "assumptions",
      "title": "Rall assumptions and model limits",
      "keyTerms": [
        "isopotential",
        "electrotonic"
      ],
      "source": "L05 PDF 21",
      "blocks": [
        {
          "type": "text",
          "body": "Use linear membrane parameters, negligible extracellular resistivity, an isopotential soma and matched branch geometry. Finite sealed tips need equal total electrotonic paths. “Radial current zero” means an isopotential cytoplasmic cross-section, not zero transmembrane leak or capacitance."
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
          "prompt": "What must agree for the finite sealed reduction?",
          "correct": 1,
          "options": [
            {
              "text": "Total soma-to-tip physical path lengths",
              "feedback": "Use this distinction: Total soma-to-tip electrotonic path lengths."
            },
            {
              "text": "Total soma-to-tip electrotonic path lengths",
              "feedback": "Correct. Total soma-to-tip electrotonic path lengths."
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
        }
      ]
    },
    {
      "id": "semi",
      "title": "One-arm semi-infinite conductance",
      "keyTerms": [],
      "source": "L05 PDF 22",
      "blocks": [
        {
          "type": "text",
          "body": "An end-driven semi-infinite cable has $R_\\infty=r_i\\lambda$ and $G_\\infty=1/R_\\infty$. The slide mixes a two-sided resistance factor with its correct one-arm diameter expression. Keep the one-arm convention throughout branch matching."
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
              "feedback": "Correct. $r_i\\lambda$ for one semi-infinite arm."
            },
            {
              "text": "$r_i\\lambda/2$ for one semi-infinite arm",
              "feedback": "Use this distinction: $r_i\\lambda$ for one semi-infinite arm."
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
        }
      ]
    },
    {
      "id": "recursive",
      "title": "Recursive daughter replacement",
      "keyTerms": [
        "conductance"
      ],
      "source": "L05 PDF 23–25",
      "blocks": [
        {
          "type": "text",
          "body": "Daughter conductances add at the same branch voltage. Replace matched distal daughters, then work back toward the soma. The source repeats one daughter index in its final equation; sum each distinct daughter once. A locally matching node alone does not certify the entire finite tree."
        },
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
          "prompt": "Which direction simplifies a branching tree recursively?",
          "correct": 1,
          "options": [
            {
              "text": "From the soma ignoring distal daughters",
              "feedback": "Use this distinction: From distal daughters toward the soma."
            },
            {
              "text": "From distal daughters toward the soma",
              "feedback": "Correct. From distal daughters toward the soma."
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
        }
      ]
    },
    {
      "id": "stems",
      "title": "Several stems and biological limits",
      "keyTerms": [
        "conductance",
        "electrotonic"
      ],
      "source": "L05 PDF 26",
      "blocks": [
        {
          "type": "text",
          "body": "Multiple equivalent stems at the soma add conductances. Under common material parameters and matching electrotonic endpoints, their three-halves powers combine into one diameter. Some neuron trees approximate these conditions; cortical and hippocampal pyramidal trees need not."
        },
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
          "prompt": "Does the rule apply exactly to every biological tree?",
          "correct": 0,
          "options": [
            {
              "text": "No, the geometric assumptions can fail",
              "feedback": "Correct. No, the geometric assumptions can fail."
            },
            {
              "text": "Yes, dendritic identity guarantees matching",
              "feedback": "Use this distinction: No, the geometric assumptions can fail."
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
        }
      ]
    },
    {
      "id": "boundaries",
      "title": "Attenuation and sealed-tip inference",
      "keyTerms": [],
      "source": "L05 PDF 27",
      "blocks": [
        {
          "type": "text",
          "body": "At equal origin voltage, sealed, infinite and open cables have different attenuation. For the sealed end, terminal fraction is $1/\\cosh L$. A stated percent loss must first be converted to the remaining fraction. An open cable end is short-circuited."
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
          "prompt": "Which endpoint has zero axial current?",
          "correct": 1,
          "options": [
            {
              "text": "An open cable end with zero terminal voltage",
              "feedback": "Use this distinction: A sealed cable end with zero voltage slope."
            },
            {
              "text": "A sealed cable end with zero voltage slope",
              "feedback": "Correct. A sealed cable end with zero voltage slope."
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
        }
      ]
    },
    {
      "id": "finite",
      "title": "Finite sealed input conductance",
      "keyTerms": [
        "conductance"
      ],
      "source": "L05 PDF 28",
      "blocks": [
        {
          "type": "text",
          "body": "For a finite sealed cylinder, $G_N=G_\\infty\\tanh L$. Resistance is its reciprocal, $R_N=R_\\infty\\coth L$. Short sealed cylinders have less input conductance than their semi-infinite continuation. Equal origin voltage does not mean equal supplied current."
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
              "feedback": "Correct. Smaller for a finite positive cable length."
            },
            {
              "text": "Larger for a finite positive cable length",
              "feedback": "Use this distinction: Smaller for a finite positive cable length."
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
        }
      ]
    },
    {
      "id": "paths",
      "title": "Add electrotonic lengths along each path",
      "keyTerms": [],
      "source": "L05 PDF 29",
      "blocks": [
        {
          "type": "text",
          "body": "Compute each segment’s $\\lambda$ using its own diameter. Sum $\\ell/\\lambda$ along a complete soma-to-tip route. Compare these totals across tips. Equal local diameter matching and equal total path length are separate requirements."
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
          "prompt": "What should be added along a path?",
          "correct": 1,
          "options": [
            {
              "text": "Each segment diameter divided by its length",
              "feedback": "Use this distinction: Each segment length divided by its scale."
            },
            {
              "text": "Each segment length divided by its scale",
              "feedback": "Correct. Each segment length divided by its scale."
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
        }
      ]
    },
    {
      "id": "tree-example",
      "title": "Audit every node of a tree",
      "keyTerms": [
        "electrotonic"
      ],
      "source": "L05 PDF 30",
      "blocks": [
        {
          "type": "text",
          "body": "The source example checks distal and proximal branch nodes separately. Rounding can make near matching look exact. Even when all nodes approximately match, finite sealed reduction still requires equal total electrotonic paths and compatible material properties."
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
          "prompt": "What does one matched node establish?",
          "correct": 0,
          "options": [
            {
              "text": "Local matching rather than whole-tree validity",
              "feedback": "Correct. Local matching rather than whole-tree validity."
            },
            {
              "text": "Whole-tree validity without other conditions",
              "feedback": "Use this distinction: Local matching rather than whole-tree validity."
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
        }
      ]
    },
    {
      "id": "soma",
      "title": "Dendritic load and the lumped soma",
      "keyTerms": [
        "dendritic"
      ],
      "source": "L05 PDF 31",
      "blocks": [
        {
          "type": "text",
          "body": "At steady state, $G_N=G_D+G_S$ and $\\rho=G_D/G_S$. The ratio can exceed unity. The dendritic fraction of supplied steady current is $\\rho/(1+\\rho)$; it is not $\\rho$. Capacitive transients do not share this static division."
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
              "feedback": "Use this distinction: The fraction of steady current in dendrites."
            },
            {
              "text": "The fraction of steady current in dendrites",
              "feedback": "Correct. The fraction of steady current in dendrites."
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
        }
      ]
    },
    {
      "id": "step-input",
      "title": "Somatic responses to step pulses",
      "keyTerms": [],
      "source": "L05 PDF 32",
      "blocks": [
        {
          "type": "text",
          "body": "In the supplied ball-and-stick model, distal inputs have attenuated, delayed and broadened somatic responses. Late relaxation can share a common slow mode. The entire waveform and every earlier component need not have a single identical decay time."
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
          "prompt": "What can a shared late decay establish?",
          "correct": 0,
          "options": [
            {
              "text": "A common asymptotic mode of the passive model",
              "feedback": "Correct. A common asymptotic mode of the passive model."
            },
            {
              "text": "Identical peaks and latencies at all locations",
              "feedback": "Use this distinction: A common asymptotic mode of the passive model."
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
        }
      ]
    },
    {
      "id": "conductance-input",
      "title": "Synaptic conductance versus rectangular current",
      "keyTerms": [
        "conductance"
      ],
      "source": "L05 PDF 33",
      "blocks": [
        {
          "type": "text",
          "body": "The slide describes a brief alpha-like conductance input; its figure retains an input-current label. Interpret the shape qualitatively. Distal somatic responses are smaller, slower and later. Conductance-driven current depends on driving force; no analytic alpha equation is supplied."
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
              "feedback": "Use this distinction: Its current depends on the evolving voltage."
            },
            {
              "text": "Its current depends on the evolving voltage",
              "feedback": "Correct. Its current depends on the evolving voltage."
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
        }
      ]
    },
    {
      "id": "exercise",
      "title": "Exercise extension: scales and characteristic timing",
      "keyTerms": [],
      "source": "Exercise 5 p1–2, answers p1–2; L04 PDF2; L05 PDF29",
      "blocks": [
        {
          "type": "text",
          "body": "Exercise 5 combines local geometry, time constant and estimated passive transit. Use $\\theta=2\\lambda/\\tau_m$ as a characteristic approximation. Retuning one branch resistance changes both scales and can break the common-material reduction."
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
          "prompt": "Does equal estimated transit prove identical EPSP arrival?",
          "correct": 0,
          "options": [
            {
              "text": "No, full waveform dynamics remain relevant",
              "feedback": "Correct. No, full waveform dynamics remain relevant."
            },
            {
              "text": "Yes, every peak and width must then agree",
              "feedback": "Use this distinction: No, full waveform dynamics remain relevant."
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
        }
      ]
    }
  ],
  "recap": {
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
          "type": "written",
          "difficulty": "medium",
          "prompt": "Read the source compartment-response panel. Identify input and recording sites, explain amplitude/width/latency changes and propose a control before attributing a small somatic response to a weak synapse.",
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
            }
          ],
          "modelAnswer": [
            "The recording remains at compartment one, the soma.",
            "Inputs are at one, five or nine.",
            "Distal inputs are smaller, broader and delayed at the soma.",
            "Control input amplitude/waveform and baseline before comparing transfer.",
            "A somatic peak alone does not uniquely identify local synaptic strength."
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
          "type": "written",
          "difficulty": "medium",
          "prompt": "Compare the source step-pulse panel with the alpha-like conductance panel. Design a small-response somatic recording comparison and explain the limits of waveform addition.",
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
            }
          ],
          "modelAnswer": [
            "Keep the recording site and input location controlled.",
            "The source panels depict model responses, not new recordings.",
            "Compare full voltage waveforms, including width and delay.",
            "A fixed current pulse differs from voltage-dependent conductance current.",
            "Large conductance changes or active channels can invalidate current-source superposition."
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
          "type": "written",
          "difficulty": "medium",
          "prompt": "Interpret the source backpropagation panel. State how recording location and origin of the spike affect the inference. Propose a controlled comparison testing whether stronger dendritic invasion follows reduced potassium damping, and give a limitation.",
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
            }
          ],
          "modelAnswer": [
            "Identify axonal initiation before somatic/dendritic invasion.",
            "Compare aligned axonal, somatic and dendritic traces with known locations.",
            "Hold stimulus and baseline controlled before changing the damping condition.",
            "Reduced outward influence can permit stronger invasion, depending on other properties.",
            "Amplitude alone does not establish origin, kinetics or repetitive echo; no numerical latency is invented."
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
