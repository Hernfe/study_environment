// Source audit: docs/scope/nbe-e4120/L03.md
import { equationSheet } from './equation-sheet.js';
const content = {
  "meta": {
    "id": "L03",
    "number": 3,
    "title": "Cable properties of dendrites",
    "chapters": [],
    "pages": [],
    "lectureDate": "2026-09-18",
    "examDate": "2026-11-30",
    "examLabel": "Final exam"
  },
  "objectives": [
    "Recognize passive responses and their recording protocol.",
    "Derive the uniform cable equation with correct geometry, signs and dimensions.",
    "Calculate and compare spatial attenuation, membrane timing and their limitations."
  ],
  "prerequisites": [
    {
      "text": "Circuits, RC charging and membrane signs",
      "lectureId": "L01",
      "sectionId": "signs"
    },
    {
      "text": "Membrane current balance and recording modes",
      "lectureId": "L02",
      "sectionId": "circuit"
    }
  ],
  "segmentedPractice": true,
  "sections": [
    {
      "id": "functions",
      "title": "Overview: passive spread in a working neuron",
      "keyTerms": [],
      "source": "L03 PDF 1–2",
      "blocks": [
        {
          "type": "text",
          "body": "Follow signals from reception to integration and output. Passive cables leak and store charge. Spatial spread uses $\\lambda$; local timing uses $\\tau_m$. Throughout this lecture $V=V_m-V_{rest}$."
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 3, PDF page 2. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 3, PDF page 2. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L03/functions.webp', import.meta.url).href,
              "alt": "Lecture 3, PDF page 2. Source figure with original labels and axes retained.",
              "aspect": 0.6411543287327478,
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
          "id": "L03-functions-check",
          "prompt": "What does electrotonic spread describe?",
          "correct": 0,
          "options": [
            {
              "text": "Passive spread of electrical signals",
              "feedback": "Correct. Passive spread of electrical signals."
            },
            {
              "text": "Regeneration of electrical impulses",
              "feedback": "Use this distinction: Passive spread of electrical signals."
            }
          ],
          "hints": [
            {
              "body": "Separate passive transfer from active spike generation."
            },
            {
              "body": "Ask whether voltage-dependent permeability must change for the signal to spread."
            }
          ],
          "modelAnswer": [
            "Passive spread of electrical signals."
          ]
        }
      ]
    },
    {
      "id": "responses",
      "title": "Two electrodes, passive responses and threshold",
      "keyTerms": [],
      "source": "L03 PDF 3",
      "blocks": [
        {
          "type": "text",
          "body": "One electrode injects current and another records $V_m$. Small perturbations can be approximately linear even in an excitable cell. Above threshold, permeability changes produce an active response."
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 3, PDF page 3. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 3, PDF page 3. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L03/responses.webp', import.meta.url).href,
              "alt": "Lecture 3, PDF page 3. Source figure with original labels and axes retained.",
              "aspect": 1.856115107913669,
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
          "id": "L03-responses-check",
          "prompt": "Which variable is measured in this current-injection experiment?",
          "correct": 1,
          "options": [
            {
              "text": "Membrane current at the recording electrode",
              "feedback": "Use this distinction: Membrane voltage at the recording electrode."
            },
            {
              "text": "Membrane voltage at the recording electrode",
              "feedback": "Correct. Membrane voltage at the recording electrode."
            }
          ],
          "hints": [
            {
              "body": "Identify which electrode supplies the stimulus."
            },
            {
              "body": "The second electrode reads the response rather than setting its value."
            }
          ],
          "modelAnswer": [
            "Membrane voltage at the recording electrode."
          ]
        }
      ]
    },
    {
      "id": "analogy",
      "title": "A cable stores charge and loses signal",
      "keyTerms": [],
      "source": "L03 PDF 4–5",
      "blocks": [
        {
          "type": "text",
          "body": "The telegraph analogy is distributed resistance and charge storage along a long conductor. Its historical map is context, not a memorization task. Neural cables also lose voltage and distort timing."
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 3, PDF page 4. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 3, PDF page 4. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L03/analogy.webp', import.meta.url).href,
              "alt": "Lecture 3, PDF page 4. Source figure with original labels and axes retained.",
              "aspect": 3.124716553287982,
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
          "id": "L03-analogy-check",
          "prompt": "Which feature makes the analogy useful?",
          "correct": 0,
          "options": [
            {
              "text": "Distributed resistance and charge storage",
              "feedback": "Correct. Distributed resistance and charge storage."
            },
            {
              "text": "All-or-none regeneration along the wire",
              "feedback": "Use this distinction: Distributed resistance and charge storage."
            }
          ],
          "hints": [
            {
              "body": "Look for electrical storage and longitudinal resistance."
            },
            {
              "body": "The historical conductor has no excitable membrane channels."
            }
          ],
          "modelAnswer": [
            "Distributed resistance and charge storage."
          ]
        }
      ]
    },
    {
      "id": "filter",
      "title": "Temporal and frequency-domain filtering",
      "keyTerms": [],
      "source": "L03 PDF 6",
      "blocks": [
        {
          "type": "text",
          "body": "An RC membrane is a low-pass filter. A larger time constant slows its response and lowers its corner frequency. A spatial cable also delays and attenuates signals as they spread."
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 3, PDF page 6. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 3, PDF page 6. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L03/filter.webp', import.meta.url).href,
              "alt": "Lecture 3, PDF page 6. Source figure with original labels and axes retained.",
              "aspect": 0.6703741152679474,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L03-f-tau",
          "name": "Membrane time constant",
          "tex": "\\tau_m=R_mC_m",
          "symbols": [
            {
              "tex": "\\tau_m",
              "name": "Time constant",
              "unit": "s",
              "meaning": "Local response timescale."
            },
            {
              "tex": "R_m",
              "name": "Specific membrane resistance",
              "unit": "ohm*m2",
              "meaning": "Resistance times membrane area."
            },
            {
              "tex": "C_m",
              "name": "Specific capacitance",
              "unit": "F/m2",
              "meaning": "Capacitance per membrane area."
            }
          ],
          "reads": "More resistance or capacitance makes local charging slower.",
          "assumes": "Uniform passive membrane; consistent area conventions.",
          "variants": [],
          "drill": {
            "prompt": "Use $R_m=2\\,\\Omega\\,\\text{m}^2$ and $C_m=0.01\\,\\text{F/m}^2$. Find the time constant.",
            "answer": {
              "value": 0.02,
              "unit": "s",
              "tolerance": 6e-05,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 2,
                  "b": 0.01
                },
                "displayScale": 1
              }
            },
            "tex": "\\tau_m=(2\\,\\Omega\\,\\text{m}^2)(0.01\\,\\text{F/m}^2)",
            "modelAnswer": [
              "More resistance or capacitance makes local charging slower."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\tau_m=R_mC_m$."
              },
              {
                "body": "Start with $\\tau_m=(2\\,\\Omega\\,\\text{m}^2)(0.01\\,\\text{F/m}^2)$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{\\tau_m}=\\htmlClass{formula-term-1}{R_m}\\htmlClass{formula-term-2}{C_m}"
        },
        {
          "id": "L03-f-corner",
          "name": "Corner frequency",
          "tex": "f_c=\\frac{1}{2\\pi\\tau_m}",
          "symbols": [
            {
              "tex": "f_c",
              "name": "Corner frequency",
              "unit": "Hz",
              "meaning": "Transition in low-pass response."
            },
            {
              "tex": "\\tau_m",
              "name": "Time constant",
              "unit": "s",
              "meaning": "Response timescale."
            }
          ],
          "reads": "Slow charging suppresses faster voltage fluctuations.",
          "assumes": "First-order RC approximation.",
          "variants": [],
          "drill": {
            "prompt": "For $\\tau_m=0.025\\,\\text{s}$ find the corner frequency in hertz.",
            "answer": {
              "value": 6.366197723675814,
              "unit": "Hz",
              "tolerance": 0.019098593171027443,
              "verification": {
                "relation": "corner",
                "inputs": {
                  "tau": 0.025
                },
                "displayScale": 1
              }
            },
            "tex": "f_c=1/[2\\pi(0.025\\,\\text{s})]",
            "modelAnswer": [
              "Slow charging suppresses faster voltage fluctuations."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $f_c=\\frac{1}{2\\pi\\tau_m}$."
              },
              {
                "body": "Start with $f_c=1/[2\\pi(0.025\\,\\text{s})]$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{f_c}=\\frac{1}{2\\pi\\htmlClass{formula-term-1}{\\tau_m}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L03-filter-check",
          "prompt": "What follows a larger time constant?",
          "correct": 1,
          "options": [
            {
              "text": "A higher corner frequency and faster response",
              "feedback": "Use this distinction: A lower corner frequency and slower response."
            },
            {
              "text": "A lower corner frequency and slower response",
              "feedback": "Correct. A lower corner frequency and slower response."
            }
          ],
          "hints": [
            {
              "body": "Relate response speed to its characteristic time."
            },
            {
              "body": "Use the inverse relationship between the corner frequency and the time constant."
            }
          ],
          "modelAnswer": [
            "A lower corner frequency and slower response."
          ]
        }
      ]
    },
    {
      "id": "cylinders",
      "title": "From a dendritic tree to cylindrical cables",
      "keyTerms": [],
      "source": "L03 PDF 7",
      "blocks": [
        {
          "type": "text",
          "body": "Complex dendritic geometry can be approximated by connected cylinders. The model quantifies signal attenuation and helps explain integration. This page assesses theory, not NEURON software operation."
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 3, PDF page 7. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 3, PDF page 7. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L03/cylinders.webp', import.meta.url).href,
              "alt": "Lecture 3, PDF page 7. Source figure with original labels and axes retained.",
              "aspect": 1.1845386533665836,
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
          "id": "L03-cylinders-check",
          "prompt": "What is the useful geometric approximation?",
          "correct": 0,
          "options": [
            {
              "text": "A tree of continuous cylindrical cables",
              "feedback": "Correct. A tree of continuous cylindrical cables."
            },
            {
              "text": "A single uniform voltage for every neuron",
              "feedback": "Use this distinction: A tree of continuous cylindrical cables."
            }
          ],
          "hints": [
            {
              "body": "Compare the dendritic arbor with the simplified geometry."
            },
            {
              "body": "A spatial approximation must retain paths between distinct recording positions."
            }
          ],
          "modelAnswer": [
            "A tree of continuous cylindrical cables."
          ]
        }
      ]
    },
    {
      "id": "sphere",
      "title": "The isopotential sphere",
      "keyTerms": [],
      "source": "L03 PDF 8",
      "blocks": [
        {
          "type": "text",
          "body": "An ohmic isopotential cell has one voltage and constant resistance. Total injected current is divided by spherical area to obtain uniform current density. Use voltage increments relative to rest."
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 3, PDF page 8. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 3, PDF page 8. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L03/sphere.webp', import.meta.url).href,
              "alt": "Lecture 3, PDF page 8. Source figure with original labels and axes retained.",
              "aspect": 2.2474437627811863,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L03-f-area",
          "name": "Spherical membrane area",
          "tex": "A=4\\pi a^2",
          "symbols": [
            {
              "tex": "A",
              "name": "Surface area",
              "unit": "m2",
              "meaning": "Membrane area of sphere."
            },
            {
              "tex": "a",
              "name": "Radius",
              "unit": "m",
              "meaning": "Sphere radius."
            }
          ],
          "reads": "Area grows with the square of radius.",
          "assumes": "Spherical membrane, not a cylinder cross-section.",
          "variants": [],
          "drill": {
            "prompt": "A spherical cell has radius $10^{-5}\\,\\text{m}$. Find area.",
            "answer": {
              "value": 1.2566370614359174e-09,
              "unit": "m2",
              "tolerance": 3.769911184307752e-12,
              "verification": {
                "relation": "sphereArea",
                "inputs": {
                  "radius": 1e-05
                },
                "displayScale": 1
              }
            },
            "tex": "A=4\\pi(10^{-5}\\,\\text{m})^2",
            "modelAnswer": [
              "Area grows with the square of radius."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $A=4\\pi a^2$."
              },
              {
                "body": "Start with $A=4\\pi(10^{-5}\\,\\text{m})^2$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{A}=4\\pi \\htmlClass{formula-term-1}{a}^2"
        },
        {
          "id": "L03-f-density",
          "name": "Uniform injected current density",
          "tex": "I_m=\\frac{I_0}{A}",
          "symbols": [
            {
              "tex": "I_m",
              "name": "Injected current density",
              "unit": "A/m2",
              "meaning": "Uniform inward supplied current density, not outward ionic current."
            },
            {
              "tex": "I_0",
              "name": "Total supplied current",
              "unit": "A",
              "meaning": "Positive here raises voltage."
            },
            {
              "tex": "A",
              "name": "Membrane area",
              "unit": "m2",
              "meaning": "Total spherical area."
            }
          ],
          "reads": "The same total current is diluted over a larger surface.",
          "assumes": "Isopotential uniform membrane; stated injection sign.",
          "variants": [],
          "drill": {
            "prompt": "Positive injected current is $2\\times10^{-10}\\,\\text{A}$ over $2\\times10^{-9}\\,\\text{m}^2$. Find supplied current density.",
            "answer": {
              "value": 0.1,
              "unit": "A/m2",
              "tolerance": 0.00030000000000000003,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 2e-10,
                  "b": 2e-09
                },
                "displayScale": 1
              }
            },
            "tex": "I_m=(2\\times10^{-10}\\,\\text{A})/(2\\times10^{-9}\\,\\text{m}^2)",
            "modelAnswer": [
              "The same total current is diluted over a larger surface."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $I_m=\\frac{I_0}{A}$."
              },
              {
                "body": "Start with $I_m=(2\\times10^{-10}\\,\\text{A})/(2\\times10^{-9}\\,\\text{m}^2)$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{I_m}=\\frac{\\htmlClass{formula-term-1}{I_0}}{\\htmlClass{formula-term-2}{A}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L03-sphere-check",
          "prompt": "What does isopotential mean?",
          "correct": 1,
          "options": [
            {
              "text": "The membrane current is zero over the cell",
              "feedback": "Use this distinction: The membrane voltage is uniform over the cell."
            },
            {
              "text": "The membrane voltage is uniform over the cell",
              "feedback": "Correct. The membrane voltage is uniform over the cell."
            }
          ],
          "hints": [
            {
              "body": "The term describes the potential over the membrane."
            },
            {
              "body": "Uniform voltage does not prohibit injected current or membrane current."
            }
          ],
          "modelAnswer": [
            "The membrane voltage is uniform over the cell."
          ]
        }
      ]
    },
    {
      "id": "input",
      "title": "Input resistance and the lumped step",
      "keyTerms": [],
      "source": "L03 PDF 8",
      "blocks": [
        {
          "type": "text",
          "body": "Input resistance divides a steady voltage increment by total injected current. For a passive sphere it is specific resistance divided by surface area. Charging approaches that steady increment exponentially."
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 3, PDF page 8. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 3, PDF page 8. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L03/sphere.webp', import.meta.url).href,
              "alt": "Lecture 3, PDF page 8. Source figure with original labels and axes retained.",
              "aspect": 2.2474437627811863,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L03-f-input",
          "name": "Spherical input resistance",
          "tex": "R_{input}=\\frac{R_m}{A}",
          "symbols": [
            {
              "tex": "R_{input}",
              "name": "Input resistance",
              "unit": "ohm",
              "meaning": "Total steady voltage/current ratio."
            },
            {
              "tex": "R_m",
              "name": "Specific resistance",
              "unit": "ohm*m2",
              "meaning": "Area-normalized material property."
            },
            {
              "tex": "A",
              "name": "Membrane area",
              "unit": "m2",
              "meaning": "Spherical surface."
            }
          ],
          "reads": "Larger cells have lower input resistance at unchanged specific resistance.",
          "assumes": "Isopotential ohmic sphere at steady state.",
          "variants": [],
          "drill": {
            "prompt": "Use $R_m=2\\,\\Omega\\,\\text{m}^2$ and $A=2\\times10^{-9}\\,\\text{m}^2$. Find input resistance.",
            "answer": {
              "value": 1000000000.0,
              "unit": "ohm",
              "tolerance": 3000000.0,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 2,
                  "b": 2e-09
                },
                "displayScale": 1
              }
            },
            "tex": "R_{input}=(2\\,\\Omega\\,\\text{m}^2)/(2\\times10^{-9}\\,\\text{m}^2)",
            "modelAnswer": [
              "Larger cells have lower input resistance at unchanged specific resistance."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $R_{input}=\\frac{R_m}{A}$."
              },
              {
                "body": "Start with $R_{input}=(2\\,\\Omega\\,\\text{m}^2)/(2\\times10^{-9}\\,\\text{m}^2)$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{R_{input}}=\\frac{\\htmlClass{formula-term-1}{R_m}}{\\htmlClass{formula-term-2}{A}}"
        },
        {
          "id": "L03-f-charging",
          "name": "Lumped current-step response",
          "tex": "V(t)=I_0R_{input}(1-e^{-t/\\tau_m})",
          "symbols": [
            {
              "tex": "V(t)",
              "name": "Voltage increment",
              "unit": "V",
              "meaning": "Above the initial resting value."
            },
            {
              "tex": "I_0",
              "name": "Supplied current",
              "unit": "A",
              "meaning": "Positive depolarizing injection."
            },
            {
              "tex": "R_{input}",
              "name": "Input resistance",
              "unit": "ohm",
              "meaning": "Total resistance."
            },
            {
              "tex": "t",
              "name": "Time since onset",
              "unit": "s",
              "meaning": "During the maintained step."
            },
            {
              "tex": "\\tau_m",
              "name": "Time constant",
              "unit": "s",
              "meaning": "Resistance times total capacitance."
            }
          ],
          "reads": "Voltage approaches the steady current times input resistance.",
          "assumes": "Initially resting isopotential passive cell; maintained step.",
          "variants": [],
          "drill": {
            "prompt": "Use $I_0=10^{-11}\\,\\text{A}$, $R_{input}=10^9\\,\\Omega$, $\\tau_m=0.02\\,\\text{s}$ and $t=0.02\\,\\text{s}$. Find the voltage increment.",
            "answer": {
              "value": 0.006321205588285576,
              "unit": "V",
              "tolerance": 1.896361676485673e-05,
              "verification": {
                "relation": "charging",
                "inputs": {
                  "i": 1e-11,
                  "r": 1000000000.0,
                  "c": 2e-11,
                  "t": 0.02
                },
                "displayScale": 1
              }
            },
            "tex": "V=(10^{-11}\\,\\text{A})(10^9\\,\\Omega)(1-e^{-1})",
            "modelAnswer": [
              "Voltage approaches the steady current times input resistance."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $V(t)=I_0R_{input}(1-e^{-t/\\tau_m})$."
              },
              {
                "body": "Start with $V=(10^{-11}\\,\\text{A})(10^9\\,\\Omega)(1-e^{-1})$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{V(t)}=\\htmlClass{formula-term-1}{I_0}\\htmlClass{formula-term-2}{R_{input}}(1-e^{-\\htmlClass{formula-term-3}{t}/\\htmlClass{formula-term-4}{\\tau_m}})"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L03-input-check",
          "prompt": "How is input resistance measured?",
          "correct": 0,
          "options": [
            {
              "text": "Steady voltage increment divided by supplied current",
              "feedback": "Correct. Steady voltage increment divided by supplied current."
            },
            {
              "text": "Supplied current divided by steady voltage increment",
              "feedback": "Use this distinction: Steady voltage increment divided by supplied current."
            }
          ],
          "hints": [
            {
              "body": "Use the steady current-voltage ratio."
            },
            {
              "body": "The measured response belongs in the numerator, with the supplied stimulus below it."
            }
          ],
          "modelAnswer": [
            "Steady voltage increment divided by supplied current."
          ]
        }
      ]
    },
    {
      "id": "distributed",
      "title": "Voltage differs along a real neuron",
      "keyTerms": [],
      "source": "L03 PDF 9",
      "blocks": [
        {
          "type": "text",
          "body": "A distributed cable has axial resistance and parallel membrane resistance/capacitance in each segment. Different recording positions can have different responses. Extracellular resistance is distinguished from the cytoplasmic path."
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 3, PDF page 9. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 3, PDF page 9. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L03/distributed.webp', import.meta.url).href,
              "alt": "Lecture 3, PDF page 9. Source figure with original labels and axes retained.",
              "aspect": 1.2598870056497176,
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
          "id": "L03-distributed-check",
          "prompt": "Which path connects neighboring intracellular positions?",
          "correct": 1,
          "options": [
            {
              "text": "The transmembrane capacitive resistance",
              "feedback": "Use this distinction: The longitudinal cytoplasmic resistance."
            },
            {
              "text": "The longitudinal cytoplasmic resistance",
              "feedback": "Correct. The longitudinal cytoplasmic resistance."
            }
          ],
          "hints": [
            {
              "body": "Trace the path connecting two internal nodes."
            },
            {
              "body": "A transmembrane branch crosses the boundary; a longitudinal branch connects positions."
            }
          ],
          "modelAnswer": [
            "The longitudinal cytoplasmic resistance."
          ]
        }
      ]
    },
    {
      "id": "assumptions",
      "title": "Choose a reference and state the assumptions",
      "keyTerms": [],
      "source": "L03 PDF 10",
      "blocks": [
        {
          "type": "text",
          "body": "The initial model is an infinite uniform cylinder with passive constant parameters and negligible external resistance. Let $V=V_m-V_{rest}$. One-dimensional core flow still permits current crossing the membrane."
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 3, PDF page 10. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 3, PDF page 10. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L03/assumptions.webp', import.meta.url).href,
              "alt": "Lecture 3, PDF page 10. Source figure with original labels and axes retained.",
              "aspect": 2.7139423076923075,
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
          "id": "L03-assumptions-check",
          "prompt": "What is zero when the cable is at rest?",
          "correct": 0,
          "options": [
            {
              "text": "The voltage increment relative to resting voltage",
              "feedback": "Correct. The voltage increment relative to resting voltage."
            },
            {
              "text": "The absolute voltage across the resting membrane",
              "feedback": "Use this distinction: The voltage increment relative to resting voltage."
            }
          ],
          "hints": [
            {
              "body": "Distinguish absolute membrane voltage from an increment."
            },
            {
              "body": "Subtract the baseline before interpreting zero in the cable equations."
            }
          ],
          "modelAnswer": [
            "The voltage increment relative to resting voltage."
          ]
        }
      ]
    },
    {
      "id": "compartments",
      "title": "Current divides between membrane and axial paths",
      "keyTerms": [],
      "source": "L03 PDF 11",
      "blocks": [
        {
          "type": "text",
          "body": "Kirchhoff balance separates membrane and onward axial current. In steady state the capacitive branch carries no current, although the membrane leak remains. The resting battery is removed by using rest-relative voltage."
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 3, PDF page 11. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 3, PDF page 11. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L03/compartments.webp', import.meta.url).href,
              "alt": "Lecture 3, PDF page 11. Source figure with original labels and axes retained.",
              "aspect": 1.4111111111111112,
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
          "id": "L03-compartments-check",
          "prompt": "Which branch carries no steady current?",
          "correct": 1,
          "options": [
            {
              "text": "The membrane resistor after charging",
              "feedback": "Use this distinction: The membrane capacitor after charging."
            },
            {
              "text": "The membrane capacitor after charging",
              "feedback": "Correct. The membrane capacitor after charging."
            }
          ],
          "hints": [
            {
              "body": "Consider what a capacitor needs to carry current."
            },
            {
              "body": "A fully charged constant voltage has no time derivative, while leak can remain."
            }
          ],
          "modelAnswer": [
            "The membrane capacitor after charging."
          ]
        }
      ]
    },
    {
      "id": "geometry",
      "title": "Specific parameters versus per-length parameters",
      "keyTerms": [],
      "source": "L03 PDF 12",
      "blocks": [
        {
          "type": "text",
          "body": "Uppercase membrane parameters refer to area; intracellular resistivity is a material property. Lowercase cable parameters include cylinder geometry. A segment gains axial resistance with length but gains parallel membrane area."
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 3, PDF page 12. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 3, PDF page 12. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L03/geometry.webp', import.meta.url).href,
              "alt": "Lecture 3, PDF page 12. Source figure with original labels and axes retained.",
              "aspect": 2.7139423076923075,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L03-f-axial",
          "name": "Axial resistance per length",
          "tex": "r_i=\\frac{R_i}{\\pi a^2}",
          "symbols": [
            {
              "tex": "r_i",
              "name": "Axial resistance per length",
              "unit": "ohm/m",
              "meaning": "Longitudinal resistance per cable length."
            },
            {
              "tex": "R_i",
              "name": "Intracellular resistivity",
              "unit": "ohm*m",
              "meaning": "Cytoplasm material property."
            },
            {
              "tex": "a",
              "name": "Radius",
              "unit": "m",
              "meaning": "Core radius."
            }
          ],
          "reads": "A wider cross-section makes longitudinal flow easier.",
          "assumes": "Uniform circular core.",
          "variants": [],
          "drill": {
            "prompt": "Use $R_i=2\\,\\Omega\\,\\text{m}$ and $a=2\\times10^{-6}\\,\\text{m}$. Find axial resistance per length.",
            "answer": {
              "value": 159154943091.89536,
              "unit": "ohm/m",
              "tolerance": 477464829.2756861,
              "verification": {
                "relation": "cableAxial",
                "inputs": {
                  "rho": 2,
                  "radius": 2e-06
                },
                "displayScale": 1
              }
            },
            "tex": "r_i=(2\\,\\Omega\\,\\text{m})/[\\pi(2\\times10^{-6}\\,\\text{m})^2]",
            "modelAnswer": [
              "A wider cross-section makes longitudinal flow easier."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $r_i=\\frac{R_i}{\\pi a^2}$."
              },
              {
                "body": "Start with $r_i=(2\\,\\Omega\\,\\text{m})/[\\pi(2\\times10^{-6}\\,\\text{m})^2]$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{r_i}=\\frac{\\htmlClass{formula-term-1}{R_i}}{\\pi \\htmlClass{formula-term-2}{a}^2}"
        },
        {
          "id": "L03-f-membrane",
          "name": "Membrane resistance-length parameter",
          "tex": "r_m=\\frac{R_m}{2\\pi a}",
          "symbols": [
            {
              "tex": "r_m",
              "name": "Membrane resistance-length",
              "unit": "ohm*m",
              "meaning": "Segment membrane resistance is this divided by length."
            },
            {
              "tex": "R_m",
              "name": "Specific membrane resistance",
              "unit": "ohm*m2",
              "meaning": "Resistance times surface area."
            },
            {
              "tex": "a",
              "name": "Radius",
              "unit": "m",
              "meaning": "Cylinder radius."
            }
          ],
          "reads": "More circumference provides more parallel leak pathways.",
          "assumes": "Lateral cylinder membrane; end caps ignored.",
          "variants": [],
          "drill": {
            "prompt": "For $R_m=2\\,\\Omega\\,\\text{m}^2$ and $a=2\\times10^{-6}\\,\\text{m}$ find the membrane resistance-length parameter.",
            "answer": {
              "value": 159154.94309189534,
              "unit": "ohm*m",
              "tolerance": 477.46482927568604,
              "verification": {
                "relation": "cableMembrane",
                "inputs": {
                  "specific": 2,
                  "radius": 2e-06
                },
                "displayScale": 1
              }
            },
            "tex": "r_m=(2\\,\\Omega\\,\\text{m}^2)/[2\\pi(2\\times10^{-6}\\,\\text{m})]",
            "modelAnswer": [
              "More circumference provides more parallel leak pathways."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $r_m=\\frac{R_m}{2\\pi a}$."
              },
              {
                "body": "Start with $r_m=(2\\,\\Omega\\,\\text{m}^2)/[2\\pi(2\\times10^{-6}\\,\\text{m})]$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{r_m}=\\frac{\\htmlClass{formula-term-1}{R_m}}{2\\pi \\htmlClass{formula-term-2}{a}}"
        },
        {
          "id": "L03-f-capacitance",
          "name": "Membrane capacitance per length",
          "tex": "c_m=C_m2\\pi a",
          "symbols": [
            {
              "tex": "c_m",
              "name": "Capacitance per length",
              "unit": "F/m",
              "meaning": "Membrane storage per cable length."
            },
            {
              "tex": "C_m",
              "name": "Specific capacitance",
              "unit": "F/m2",
              "meaning": "Capacitance per surface area."
            },
            {
              "tex": "a",
              "name": "Radius",
              "unit": "m",
              "meaning": "Cylinder radius."
            }
          ],
          "reads": "More circumference stores more charge per length.",
          "assumes": "Lateral uniform cylinder.",
          "variants": [],
          "drill": {
            "prompt": "Use $C_m=0.01\\,\\text{F/m}^2$ and $a=2\\times10^{-6}\\,\\text{m}$. Find capacitance per length.",
            "answer": {
              "value": 1.2566370614359172e-07,
              "unit": "F/m",
              "tolerance": 3.769911184307752e-10,
              "verification": {
                "relation": "cableCapacitance",
                "inputs": {
                  "specific": 0.01,
                  "radius": 2e-06
                },
                "displayScale": 1
              }
            },
            "tex": "c_m=(0.01\\,\\text{F/m}^2)2\\pi(2\\times10^{-6}\\,\\text{m})",
            "modelAnswer": [
              "More circumference stores more charge per length."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $c_m=C_m2\\pi a$."
              },
              {
                "body": "Start with $c_m=(0.01\\,\\text{F/m}^2)2\\pi(2\\times10^{-6}\\,\\text{m})$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{c_m}=\\htmlClass{formula-term-1}{C_m}2\\pi \\htmlClass{formula-term-2}{a}"
        },
        {
          "id": "L03-f-segment-axial",
          "name": "Axial resistance of a segment",
          "tex": "R_{ax}=r_i\\ell",
          "symbols": [
            {
              "tex": "R_{ax}",
              "name": "Segment axial resistance",
              "unit": "ohm",
              "meaning": "Series axial resistance."
            },
            {
              "tex": "r_i",
              "name": "Resistance per length",
              "unit": "ohm/m",
              "meaning": "Axial cable parameter."
            },
            {
              "tex": "\\ell",
              "name": "Segment length",
              "unit": "m",
              "meaning": "Length along cable."
            }
          ],
          "reads": "Longer paths put more axial resistance in series.",
          "assumes": "Uniform segment.",
          "variants": [],
          "drill": {
            "prompt": "Use $r_i=10^{11}\\,\\Omega/\\text{m}$ and segment length $10^{-4}\\,\\text{m}$. Find axial resistance.",
            "answer": {
              "value": 10000000.0,
              "unit": "ohm",
              "tolerance": 30000.0,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 100000000000.0,
                  "b": 0.0001
                },
                "displayScale": 1
              }
            },
            "tex": "R_{ax}=(10^{11}\\,\\Omega/\\text{m})(10^{-4}\\,\\text{m})",
            "modelAnswer": [
              "Longer paths put more axial resistance in series."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $R_{ax}=r_i\\ell$."
              },
              {
                "body": "Start with $R_{ax}=(10^{11}\\,\\Omega/\\text{m})(10^{-4}\\,\\text{m})$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{R_{ax}}=\\htmlClass{formula-term-1}{r_i}\\htmlClass{formula-term-2}{\\ell}"
        },
        {
          "id": "L03-f-segment-membrane",
          "name": "Membrane resistance of a segment",
          "tex": "R_{seg}=\\frac{r_m}{\\ell}",
          "symbols": [
            {
              "tex": "R_{seg}",
              "name": "Segment membrane resistance",
              "unit": "ohm",
              "meaning": "Transmembrane resistance."
            },
            {
              "tex": "r_m",
              "name": "Membrane resistance-length",
              "unit": "ohm*m",
              "meaning": "Inverse membrane area per length."
            },
            {
              "tex": "\\ell",
              "name": "Segment length",
              "unit": "m",
              "meaning": "Length contributing parallel area."
            }
          ],
          "reads": "Longer segments contain more membrane leak pathways in parallel.",
          "assumes": "Uniform lateral membrane.",
          "variants": [],
          "drill": {
            "prompt": "Use $r_m=10^5\\,\\Omega\\,\\text{m}$ and $\\ell=10^{-4}\\,\\text{m}$. Find segment membrane resistance.",
            "answer": {
              "value": 1000000000.0,
              "unit": "ohm",
              "tolerance": 3000000.0,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 100000.0,
                  "b": 0.0001
                },
                "displayScale": 1
              }
            },
            "tex": "R_{seg}=(10^5\\,\\Omega\\,\\text{m})/(10^{-4}\\,\\text{m})",
            "modelAnswer": [
              "Longer segments contain more membrane leak pathways in parallel."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $R_{seg}=\\frac{r_m}{\\ell}$."
              },
              {
                "body": "Start with $R_{seg}=(10^5\\,\\Omega\\,\\text{m})/(10^{-4}\\,\\text{m})$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{R_{seg}}=\\frac{\\htmlClass{formula-term-1}{r_m}}{\\htmlClass{formula-term-2}{\\ell}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L03-geometry-check",
          "prompt": "What happens to segment axial resistance as length increases?",
          "correct": 0,
          "options": [
            {
              "text": "It increases in proportion to segment length",
              "feedback": "Correct. It increases in proportion to segment length."
            },
            {
              "text": "It decreases in inverse proportion to segment length",
              "feedback": "Use this distinction: It increases in proportion to segment length."
            }
          ],
          "hints": [
            {
              "body": "A longer core puts more material in the current path."
            },
            {
              "body": "Compare a series longitudinal path with parallel membrane surface."
            }
          ],
          "modelAnswer": [
            "It increases in proportion to segment length."
          ]
        }
      ]
    },
    {
      "id": "conservation",
      "title": "From voltage gradient to current conservation",
      "keyTerms": [],
      "source": "L03 PDF 13",
      "blocks": [
        {
          "type": "text",
          "body": "Axial voltage falls along positive axial current. Outward membrane leak removes axial current as distance increases. Differentiating the axial voltage gradient connects curvature to membrane current per length."
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 3, PDF page 13. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 3, PDF page 13. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L03/conservation.webp', import.meta.url).href,
              "alt": "Lecture 3, PDF page 13. Source figure with original labels and axes retained.",
              "aspect": 2.263157894736842,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        },
        {
          "type": "link",
          "href": "https://www.youtube.com/@sciencewithtal",
          "label": "Source diagram attribution: Science with Tal",
          "body": "PDF13 links this channel. It is optional context; no clip is required for an answer."
        }
      ],
      "formulas": [
        {
          "id": "L03-f-gradient",
          "name": "Axial voltage gradient",
          "tex": "\\frac{\\partial V}{\\partial x}=-r_i i_i",
          "symbols": [
            {
              "tex": "V",
              "name": "Voltage increment",
              "unit": "V",
              "meaning": "Rest-relative inside voltage."
            },
            {
              "tex": "x",
              "name": "Position",
              "unit": "m",
              "meaning": "Increasing axial coordinate."
            },
            {
              "tex": "r_i",
              "name": "Axial resistance per length",
              "unit": "ohm/m",
              "meaning": "Positive passive parameter."
            },
            {
              "tex": "i_i",
              "name": "Axial current",
              "unit": "A",
              "meaning": "Positive in increasing coordinate."
            }
          ],
          "reads": "Positive axial current flows down the voltage gradient.",
          "assumes": "Uniform resistivity; negligible extracellular voltage gradient.",
          "variants": [],
          "drill": {
            "prompt": "For $r_i=10^{11}\\,\\Omega/\\text{m}$ and $i_i=2\\times10^{-10}\\,\\text{A}$ find the axial voltage gradient.",
            "answer": {
              "value": -20,
              "unit": "V/m",
              "tolerance": 0.06,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": -100000000000.0,
                  "b": 2e-10
                },
                "displayScale": 1
              }
            },
            "tex": "\\partial_{x}V=-(10^{11}\\,\\Omega/\\text{m})(2\\times10^{-10}\\,\\text{A})",
            "modelAnswer": [
              "Positive axial current flows down the voltage gradient."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\frac{\\partial V}{\\partial x}=-r_i i_i$."
              },
              {
                "body": "Start with $\\partial_{x}V=-(10^{11}\\,\\Omega/\\text{m})(2\\times10^{-10}\\,\\text{A})$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\frac{\\partial \\htmlClass{formula-term-0}{V}}{\\partial \\htmlClass{formula-term-1}{x}}=-\\htmlClass{formula-term-2}{r_i} \\htmlClass{formula-term-3}{i_i}"
        },
        {
          "id": "L03-f-conservation",
          "name": "Conservation along the core",
          "tex": "\\frac{\\partial i_i}{\\partial x}=-i_m",
          "symbols": [
            {
              "tex": "i_i",
              "name": "Axial current",
              "unit": "A",
              "meaning": "Positive increasing coordinate."
            },
            {
              "tex": "x",
              "name": "Position",
              "unit": "m",
              "meaning": "Cable coordinate."
            },
            {
              "tex": "i_m",
              "name": "Membrane current per length",
              "unit": "A/m",
              "meaning": "Positive outward loss from core."
            }
          ],
          "reads": "Outward membrane current reduces downstream axial current.",
          "assumes": "No additional local source inside this cable interval.",
          "variants": [],
          "drill": {
            "prompt": "Outward membrane current per length is $2\\times10^{-6}\\,\\text{A/m}$. Find the axial current gradient.",
            "answer": {
              "value": -2e-06,
              "unit": "A/m",
              "tolerance": 6e-09,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": -1,
                  "b": 2e-06
                },
                "displayScale": 1
              }
            },
            "tex": "\\partial_{x} i_i=-(2\\times10^{-6}\\,\\text{A/m})",
            "modelAnswer": [
              "Outward membrane current reduces downstream axial current."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\frac{\\partial i_i}{\\partial x}=-i_m$."
              },
              {
                "body": "Start with $\\partial_{x} i_i=-(2\\times10^{-6}\\,\\text{A/m})$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\frac{\\partial \\htmlClass{formula-term-0}{i_i}}{\\partial \\htmlClass{formula-term-1}{x}}=-\\htmlClass{formula-term-2}{i_m}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L03-conservation-check",
          "prompt": "What happens to positive axial current when positive outward leak occurs?",
          "correct": 1,
          "options": [
            {
              "text": "It increases along the direction of travel",
              "feedback": "Use this distinction: It decreases along the direction of travel."
            },
            {
              "text": "It decreases along the direction of travel",
              "feedback": "Correct. It decreases along the direction of travel."
            }
          ],
          "hints": [
            {
              "body": "Current leaving through membrane must come from somewhere."
            },
            {
              "body": "Compare upstream and downstream axial current around an outward leak."
            }
          ],
          "modelAnswer": [
            "It decreases along the direction of travel."
          ]
        }
      ]
    },
    {
      "id": "equation",
      "title": "Membrane balance and the linear cable equation",
      "keyTerms": [],
      "source": "L03 PDF 14",
      "blocks": [
        {
          "type": "text",
          "body": "Membrane current combines charging and leak. Eliminating axial current gives $\\lambda^2\\partial_{x}^2V=\\tau_m\\partial_tV+V$. These are increments from rest in a uniform source-free interval."
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 3, PDF page 14. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 3, PDF page 14. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L03/equation.webp', import.meta.url).href,
              "alt": "Lecture 3, PDF page 14. Source figure with original labels and axes retained.",
              "aspect": 1.7877094972067038,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L03-f-membrane-current",
          "name": "Membrane current per length",
          "tex": "i_m=c_m\\partial_tV+\\frac{V}{r_m}",
          "symbols": [
            {
              "tex": "i_m",
              "name": "Membrane current per length",
              "unit": "A/m",
              "meaning": "Charging plus outward leak in cable convention."
            },
            {
              "tex": "c_m",
              "name": "Capacitance per length",
              "unit": "F/m",
              "meaning": "Local charge storage."
            },
            {
              "tex": "V",
              "name": "Voltage increment",
              "unit": "V",
              "meaning": "Rest-relative voltage."
            },
            {
              "tex": "r_m",
              "name": "Membrane resistance-length",
              "unit": "ohm*m",
              "meaning": "Leak coefficient."
            }
          ],
          "reads": "Membrane current can charge storage and leak through resistance.",
          "assumes": "Uniform linear passive membrane.",
          "variants": [],
          "drill": {
            "prompt": "Given $c_m=10^{-7}\\,\\text{F/m}$, $\\partial_tV=1\\,\\text{V/s}$, $V=0.01\\,\\text{V}$ and $r_m=10^5\\,\\Omega\\,\\text{m}$, find membrane current per length.",
            "answer": {
              "value": 2e-07,
              "unit": "A/m",
              "tolerance": 6e-10,
              "verification": {
                "relation": "sum",
                "inputs": {
                  "a": 1e-07,
                  "b": 1e-07
                },
                "displayScale": 1
              }
            },
            "tex": "i_m=(10^{-7}\\,\\text{F/m})(1\\,\\text{V/s})+(0.01\\,\\text{V})/(10^5\\,\\Omega\\,\\text{m})",
            "modelAnswer": [
              "Membrane current can charge storage and leak through resistance."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $i_m=c_m\\partial_tV+\\frac{V}{r_m}$."
              },
              {
                "body": "Start with $i_m=(10^{-7}\\,\\text{F/m})(1\\,\\text{V/s})+(0.01\\,\\text{V})/(10^5\\,\\Omega\\,\\text{m})$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{i_m}=\\htmlClass{formula-term-1}{c_m}\\partial_t\\htmlClass{formula-term-2}{V}+\\frac{\\htmlClass{formula-term-2}{V}}{\\htmlClass{formula-term-3}{r_m}}"
        },
        {
          "id": "L03-f-evolution",
          "name": "Cable voltage evolution",
          "tex": "\\partial_tV=\\frac{\\lambda^2\\partial_{x}^2V-V}{\\tau_m}",
          "symbols": [
            {
              "tex": "V",
              "name": "Voltage increment",
              "unit": "V",
              "meaning": "Rest-relative voltage."
            },
            {
              "tex": "\\lambda",
              "name": "Length constant",
              "unit": "m",
              "meaning": "Spatial scale."
            },
            {
              "tex": "x",
              "name": "Position",
              "unit": "m",
              "meaning": "Axial coordinate."
            },
            {
              "tex": "\\tau_m",
              "name": "Time constant",
              "unit": "s",
              "meaning": "Local membrane timescale."
            }
          ],
          "reads": "Axial redistribution competes with local leakage to set voltage slope.",
          "assumes": "Source-free uniform cable, negligible external resistance.",
          "variants": [],
          "drill": {
            "prompt": "At a point $\\lambda=0.001\\,\\text{m}$, $\\partial_{x}^2V=5000\\,\\text{V/m}^2$, $V=0.01\\,\\text{V}$ and $\\tau_m=0.02\\,\\text{s}$. Find local voltage slope.",
            "answer": {
              "value": -0.25,
              "unit": "V/s",
              "tolerance": 0.00075,
              "verification": {
                "relation": "cableEvolution",
                "inputs": {
                  "lambda": 0.001,
                  "curvature": 5000,
                  "v": 0.01,
                  "tau": 0.02
                },
                "displayScale": 1
              }
            },
            "tex": "\\partial_tV=[(0.001\\,\\text{m})^2(5000\\,\\text{V/m}^2)-0.01\\,\\text{V}]/(0.02\\,\\text{s})",
            "modelAnswer": [
              "Axial redistribution competes with local leakage to set voltage slope."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\partial_tV=\\frac{\\lambda^2\\partial_{x}^2V-V}{\\tau_m}$."
              },
              {
                "body": "Start with $\\partial_tV=[(0.001\\,\\text{m})^2(5000\\,\\text{V/m}^2)-0.01\\,\\text{V}]/(0.02\\,\\text{s})$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\partial_t\\htmlClass{formula-term-0}{V}=\\frac{\\htmlClass{formula-term-1}{\\lambda}^2\\partial_{\\htmlClass{formula-term-2}{x}}^2\\htmlClass{formula-term-0}{V}-\\htmlClass{formula-term-0}{V}}{\\htmlClass{formula-term-3}{\\tau_m}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L03-equation-check",
          "prompt": "What does the curvature term represent?",
          "correct": 0,
          "options": [
            {
              "text": "Spatial redistribution through axial current",
              "feedback": "Correct. Spatial redistribution through axial current."
            },
            {
              "text": "Only the local membrane leakage current",
              "feedback": "Use this distinction: Spatial redistribution through axial current."
            }
          ],
          "hints": [
            {
              "body": "Ask how neighboring positions supply the local compartment."
            },
            {
              "body": "The local membrane terms account for storage and leak; the spatial term links positions."
            }
          ],
          "modelAnswer": [
            "Spatial redistribution through axial current."
          ]
        }
      ]
    },
    {
      "id": "length",
      "title": "Length constant and external resistance",
      "keyTerms": [],
      "source": "L03 PDF 14",
      "blocks": [
        {
          "type": "text",
          "body": "The length constant equals the square root of membrane resistance-length divided by axial resistance per length. External longitudinal resistance adds to the denominator if retained. Equal segment axial and membrane resistances define the same length."
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 3, PDF page 16. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 3, PDF page 16. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L03/decay.webp', import.meta.url).href,
              "alt": "Lecture 3, PDF page 16. Source figure with original labels and axes retained.",
              "aspect": 1.793103448275862,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L03-f-length",
          "name": "Cable length constant",
          "tex": "\\lambda=\\sqrt{\\frac{r_m}{r_i+r_o}}",
          "symbols": [
            {
              "tex": "\\lambda",
              "name": "Length constant",
              "unit": "m",
              "meaning": "Spatial attenuation scale."
            },
            {
              "tex": "r_m",
              "name": "Membrane resistance-length",
              "unit": "ohm*m",
              "meaning": "Leak resistance parameter."
            },
            {
              "tex": "r_i",
              "name": "Internal resistance per length",
              "unit": "ohm/m",
              "meaning": "Intracellular axial path."
            },
            {
              "tex": "r_o",
              "name": "External resistance per length",
              "unit": "ohm/m",
              "meaning": "Set to zero in initial model."
            }
          ],
          "reads": "Leak resistance promotes spread; axial resistance limits it.",
          "assumes": "Uniform cable; specified external resistance.",
          "variants": [],
          "drill": {
            "prompt": "Use $r_m=10^5\\,\\Omega\\,\\text{m}$, $r_i=10^{11}\\,\\Omega/\\text{m}$ and $r_o=0$. Find the length constant.",
            "answer": {
              "value": 0.001,
              "unit": "m",
              "tolerance": 3e-06,
              "verification": {
                "relation": "cableLength",
                "inputs": {
                  "rm": 100000.0,
                  "ri": 100000000000.0,
                  "ro": 0
                },
                "displayScale": 1
              }
            },
            "tex": "\\lambda=\\sqrt{(10^5\\,\\Omega\\,\\text{m})/(10^{11}\\,\\Omega/\\text{m})}",
            "modelAnswer": [
              "Leak resistance promotes spread; axial resistance limits it."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\lambda=\\sqrt{\\frac{r_m}{r_i+r_o}}$."
              },
              {
                "body": "Start with $\\lambda=\\sqrt{(10^5\\,\\Omega\\,\\text{m})/(10^{11}\\,\\Omega/\\text{m})}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{\\lambda}=\\sqrt{\\frac{\\htmlClass{formula-term-1}{r_m}}{\\htmlClass{formula-term-2}{r_i}+\\htmlClass{formula-term-3}{r_o}}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L03-length-check",
          "prompt": "What happens when external resistance is added at fixed other parameters?",
          "correct": 1,
          "options": [
            {
              "text": "The length constant becomes larger",
              "feedback": "Use this distinction: The length constant becomes smaller."
            },
            {
              "text": "The length constant becomes smaller",
              "feedback": "Correct. The length constant becomes smaller."
            }
          ],
          "hints": [
            {
              "body": "Use the variant with the two longitudinal resistances added."
            },
            {
              "body": "Compare the denominator before and after including the return path."
            }
          ],
          "modelAnswer": [
            "The length constant becomes smaller."
          ]
        }
      ]
    },
    {
      "id": "pulse",
      "title": "Read attenuation and temporal broadening",
      "keyTerms": [],
      "source": "L03 PDF 15",
      "blocks": [
        {
          "type": "text",
          "body": "The source current pulse evokes smaller and more delayed voltage responses farther away. For a distributed injection density $j_{inj}$, the forcing term is $-r_mj_{inj}$. A point injection instead sets a current jump at its location."
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 3, PDF page 15. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 3, PDF page 15. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L03/pulse.webp', import.meta.url).href,
              "alt": "Lecture 3, PDF page 15. Source figure with original labels and axes retained.",
              "aspect": 1.420824295010846,
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
          "id": "L03-pulse-check",
          "prompt": "Which response corresponds to a more distant position in the source traces?",
          "correct": 0,
          "options": [
            {
              "text": "A smaller and more delayed voltage response",
              "feedback": "Correct. A smaller and more delayed voltage response."
            },
            {
              "text": "A larger and less delayed voltage response",
              "feedback": "Use this distinction: A smaller and more delayed voltage response."
            }
          ],
          "hints": [
            {
              "body": "Follow the distance labels on the voltage panel."
            },
            {
              "body": "Compare amplitude and rise timing while holding the current pulse fixed."
            }
          ],
          "modelAnswer": [
            "A smaller and more delayed voltage response."
          ]
        }
      ]
    },
    {
      "id": "decay",
      "title": "Steady attenuation along an infinite cable",
      "keyTerms": [],
      "source": "L03 PDF 16",
      "blocks": [
        {
          "type": "text",
          "body": "At steady state the capacitive current vanishes. In a symmetric infinite cable the bounded response is $V(x)=V_0e^{-|x|/\\lambda}$. At one length constant it retains the inverse-e fraction, not zero."
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 3, PDF page 16. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 3, PDF page 16. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L03/decay.webp', import.meta.url).href,
              "alt": "Lecture 3, PDF page 16. Source figure with original labels and axes retained.",
              "aspect": 1.793103448275862,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L03-f-decay",
          "name": "Infinite-cable steady attenuation",
          "tex": "V(x)=V_0e^{-|x|/\\lambda}",
          "symbols": [
            {
              "tex": "V(x)",
              "name": "Local voltage increment",
              "unit": "V",
              "meaning": "Signed response at a position."
            },
            {
              "tex": "V_0",
              "name": "Injection-site voltage increment",
              "unit": "V",
              "meaning": "Steady response at origin."
            },
            {
              "tex": "x",
              "name": "Distance coordinate",
              "unit": "m",
              "meaning": "Absolute distance enters decay."
            },
            {
              "tex": "\\lambda",
              "name": "Length constant",
              "unit": "m",
              "meaning": "Spatial scale."
            }
          ],
          "reads": "The response becomes smaller with distance on either side of injection.",
          "assumes": "Steady infinite uniform cable, symmetric point injection and bounded response.",
          "variants": [],
          "drill": {
            "prompt": "Use $V_0=0.012\\,\\text{V}$, $x=0.001\\,\\text{m}$ and $\\lambda=0.001\\,\\text{m}$. Find the voltage increment.",
            "answer": {
              "value": 0.004414553294057308,
              "unit": "V",
              "tolerance": 1.3243659882171924e-05,
              "verification": {
                "relation": "cableDecay",
                "inputs": {
                  "v": 0.012,
                  "x": 0.001,
                  "lambda": 0.001
                },
                "displayScale": 1
              }
            },
            "tex": "V=0.012\\,\\text{V}\\,e^{-0.001/0.001}",
            "modelAnswer": [
              "The response becomes smaller with distance on either side of injection."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $V(x)=V_0e^{-|x|/\\lambda}$."
              },
              {
                "body": "Start with $V=0.012\\,\\text{V}\\,e^{-0.001/0.001}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{V(x)}=\\htmlClass{formula-term-1}{V_0}e^{-|\\htmlClass{formula-term-2}{x}|/\\htmlClass{formula-term-3}{\\lambda}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L03-decay-check",
          "prompt": "What does steady state remove from the cable equation?",
          "correct": 1,
          "options": [
            {
              "text": "The spatial derivative of the voltage response",
              "feedback": "Use this distinction: The time derivative of the voltage response."
            },
            {
              "text": "The time derivative of the voltage response",
              "feedback": "Correct. The time derivative of the voltage response."
            }
          ],
          "hints": [
            {
              "body": "Steady state means the local waveform stops changing in time."
            },
            {
              "body": "A stable response can still differ between positions along the cable."
            }
          ],
          "modelAnswer": [
            "The time derivative of the voltage response."
          ]
        }
      ]
    },
    {
      "id": "scaling",
      "title": "Radius and resistivity control spatial spread",
      "keyTerms": [],
      "source": "L03 PDF 17",
      "blocks": [
        {
          "type": "text",
          "body": "With negligible external resistance, $\\lambda=\\sqrt{R_ma/(2R_i)}$. Larger radius lowers axial resistance faster than it lowers membrane resistance-length. Specific resistivity stays distinct from total resistance."
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 3, PDF page 17. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 3, PDF page 17. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L03/scaling.webp', import.meta.url).href,
              "alt": "Lecture 3, PDF page 17. Source figure with original labels and axes retained.",
              "aspect": 0.8885496183206106,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L03-f-specific-length",
          "name": "Length constant from specific properties",
          "tex": "\\lambda=\\sqrt{\\frac{R_ma}{2R_i}}",
          "symbols": [
            {
              "tex": "\\lambda",
              "name": "Length constant",
              "unit": "m",
              "meaning": "Spatial scale."
            },
            {
              "tex": "R_m",
              "name": "Specific membrane resistance",
              "unit": "ohm*m2",
              "meaning": "Resistance times area."
            },
            {
              "tex": "a",
              "name": "Radius",
              "unit": "m",
              "meaning": "Core radius, not diameter."
            },
            {
              "tex": "R_i",
              "name": "Intracellular resistivity",
              "unit": "ohm*m",
              "meaning": "Material resistivity."
            }
          ],
          "reads": "Greater radius or membrane resistance improves passive spread.",
          "assumes": "Uniform cable with negligible external resistance.",
          "variants": [],
          "drill": {
            "prompt": "For $R_m=2\\,\\Omega\\,\\text{m}^2$, $R_i=2\\,\\Omega\\,\\text{m}$ and $a=2\\times10^{-6}\\,\\text{m}$, find length constant using the geometry-derived cable parameters.",
            "answer": {
              "value": 0.001,
              "unit": "m",
              "tolerance": 3e-06,
              "verification": {
                "relation": "cableLength",
                "inputs": {
                  "rm": 159154.94309189534,
                  "ri": 159154943091.89536
                },
                "displayScale": 1
              }
            },
            "tex": "\\lambda=\\sqrt{(2\\,\\Omega\\,\\text{m}^2)(2\\times10^{-6}\\,\\text{m})/[2(2\\,\\Omega\\,\\text{m})]}",
            "modelAnswer": [
              "Greater radius or membrane resistance improves passive spread."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\lambda=\\sqrt{\\frac{R_ma}{2R_i}}$."
              },
              {
                "body": "Start with $\\lambda=\\sqrt{(2\\,\\Omega\\,\\text{m}^2)(2\\times10^{-6}\\,\\text{m})/[2(2\\,\\Omega\\,\\text{m})]}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{\\lambda}=\\sqrt{\\frac{\\htmlClass{formula-term-1}{R_m}\\htmlClass{formula-term-2}{a}}{2\\htmlClass{formula-term-3}{R_i}}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L03-scaling-check",
          "prompt": "How does increased radius affect spread at fixed specific parameters?",
          "correct": 0,
          "options": [
            {
              "text": "It increases the spatial length constant",
              "feedback": "Correct. It increases the spatial length constant."
            },
            {
              "text": "It decreases the spatial length constant",
              "feedback": "Use this distinction: It increases the spatial length constant."
            }
          ],
          "hints": [
            {
              "body": "Compare radius powers in axial and membrane parameters."
            },
            {
              "body": "The axial resistance falls faster with radius than membrane resistance-length does."
            }
          ],
          "modelAnswer": [
            "It increases the spatial length constant."
          ]
        }
      ]
    },
    {
      "id": "distance",
      "title": "Electrotonic distance is dimensionless",
      "keyTerms": [],
      "source": "L03 PDF 18",
      "blocks": [
        {
          "type": "text",
          "body": "Electrotonic distance $X=x/\\lambda$ compares physical separation with the local spatial scale. The same physical distance can mean very different attenuation in different cables."
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 3, PDF page 18. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 3, PDF page 18. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L03/distance.webp', import.meta.url).href,
              "alt": "Lecture 3, PDF page 18. Source figure with original labels and axes retained.",
              "aspect": 2.234927234927235,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L03-f-distance",
          "name": "Electrotonic distance",
          "tex": "X=\\frac{x}{\\lambda}",
          "symbols": [
            {
              "tex": "X",
              "name": "Electrotonic distance",
              "unit": "",
              "meaning": "Dimensionless separation."
            },
            {
              "tex": "x",
              "name": "Physical distance",
              "unit": "m",
              "meaning": "Distance along cable."
            },
            {
              "tex": "\\lambda",
              "name": "Length constant",
              "unit": "m",
              "meaning": "Same length units as distance."
            }
          ],
          "reads": "Distance is meaningful relative to the cable spatial scale.",
          "assumes": "Uniform cable; use absolute distance when predicting symmetric attenuation.",
          "variants": [],
          "drill": {
            "prompt": "Use $x=0.003\\,\\text{m}$ and $\\lambda=0.001\\,\\text{m}$. Find electrotonic distance.",
            "answer": {
              "value": 3,
              "unit": "",
              "tolerance": 0.009000000000000001,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 0.003,
                  "b": 0.001
                },
                "displayScale": 1
              }
            },
            "tex": "X=(0.003\\,\\text{m})/(0.001\\,\\text{m})",
            "modelAnswer": [
              "Distance is meaningful relative to the cable spatial scale."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $X=\\frac{x}{\\lambda}$."
              },
              {
                "body": "Start with $X=(0.003\\,\\text{m})/(0.001\\,\\text{m})$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{X}=\\frac{\\htmlClass{formula-term-1}{x}}{\\htmlClass{formula-term-2}{\\lambda}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L03-distance-check",
          "prompt": "Which quantity is dimensionless?",
          "correct": 1,
          "options": [
            {
              "text": "Physical distance times the length constant",
              "feedback": "Use this distinction: Physical distance divided by length constant."
            },
            {
              "text": "Physical distance divided by length constant",
              "feedback": "Correct. Physical distance divided by length constant."
            }
          ],
          "hints": [
            {
              "body": "A dimensionless ratio cancels its units."
            },
            {
              "body": "Use two length quantities expressed in matching units."
            }
          ],
          "modelAnswer": [
            "Physical distance divided by length constant."
          ]
        }
      ]
    },
    {
      "id": "time",
      "title": "Charging, discharging and geometry cancellation",
      "keyTerms": [],
      "source": "L03 PDF 19",
      "blocks": [
        {
          "type": "text",
          "body": "The local membrane time constant is $r_mc_m=R_mC_m$. It describes a lumped or spatially uniform response. A distant cable trace is also shaped by axial flow, so it need not be a single local charging exponential."
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 3, PDF page 19. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 3, PDF page 19. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L03/time.webp', import.meta.url).href,
              "alt": "Lecture 3, PDF page 19. Source figure with original labels and axes retained.",
              "aspect": 1.246520874751491,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L03-f-discharge",
          "name": "Local passive discharge",
          "tex": "V(t)=V_0e^{-t/\\tau_m}",
          "symbols": [
            {
              "tex": "V(t)",
              "name": "Voltage increment",
              "unit": "V",
              "meaning": "Signed remaining response."
            },
            {
              "tex": "V_0",
              "name": "Initial increment",
              "unit": "V",
              "meaning": "At start of discharge."
            },
            {
              "tex": "t",
              "name": "Elapsed time",
              "unit": "s",
              "meaning": "Nonnegative time."
            },
            {
              "tex": "\\tau_m",
              "name": "Time constant",
              "unit": "s",
              "meaning": "Local passive relaxation scale."
            }
          ],
          "reads": "The remaining local increment decays exponentially after release.",
          "assumes": "Lumped or spatially uniform unforced passive response.",
          "variants": [],
          "drill": {
            "prompt": "Use $V_0=-0.01\\,\\text{V}$, $t=0.02\\,\\text{s}$ and $\\tau_m=0.02\\,\\text{s}$. Find the remaining voltage increment.",
            "answer": {
              "value": -0.0036787944117144234,
              "unit": "V",
              "tolerance": 1.103638323514327e-05,
              "verification": {
                "relation": "cableDecay",
                "inputs": {
                  "v": -0.01,
                  "x": 0.02,
                  "lambda": 0.02
                },
                "displayScale": 1
              }
            },
            "tex": "V=(-0.01\\,\\text{V})e^{-0.02/0.02}",
            "modelAnswer": [
              "The remaining local increment decays exponentially after release."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $V(t)=V_0e^{-t/\\tau_m}$."
              },
              {
                "body": "Start with $V=(-0.01\\,\\text{V})e^{-0.02/0.02}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{V(t)}=\\htmlClass{formula-term-1}{V_0}e^{-\\htmlClass{formula-term-2}{t}/\\htmlClass{formula-term-3}{\\tau_m}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L03-time-check",
          "prompt": "What changes local time constant at fixed specific properties?",
          "correct": 0,
          "options": [
            {
              "text": "Changing neither radius nor segment length",
              "feedback": "Correct. Changing neither radius nor segment length."
            },
            {
              "text": "Increasing only radius or segment length",
              "feedback": "Use this distinction: Changing neither radius nor segment length."
            }
          ],
          "hints": [
            {
              "body": "Multiply the two membrane parameters that include circumference."
            },
            {
              "body": "Their opposing geometric factors cancel in the local time product."
            }
          ],
          "modelAnswer": [
            "Changing neither radius nor segment length."
          ]
        }
      ]
    },
    {
      "id": "myelin",
      "title": "Insulation: separate distance and time effects",
      "keyTerms": [],
      "source": "L03 PDF 20",
      "blocks": [
        {
          "type": "text",
          "body": "Insulation raises effective membrane resistance and lowers capacitance. Increased resistance promotes spatial spread. The time product decreases only if the capacitance reduction outweighs the resistance increase; the slide’s faster-time claim needs this condition."
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 3, PDF page 20. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 3, PDF page 20. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L03/myelin.webp', import.meta.url).href,
              "alt": "Lecture 3, PDF page 20. Source figure with original labels and axes retained.",
              "aspect": 1.3396226415094339,
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
          "id": "L03-myelin-check",
          "prompt": "What determines whether local time constant decreases?",
          "correct": 1,
          "options": [
            {
              "text": "The increase in membrane resistance by itself",
              "feedback": "Use this distinction: The product of resistance and capacitance changes."
            },
            {
              "text": "The product of resistance and capacitance changes",
              "feedback": "Correct. The product of resistance and capacitance changes."
            }
          ],
          "hints": [
            {
              "body": "Resistance and capacitance both change under insulation."
            },
            {
              "body": "Write their product before deciding whether the time scale rises or falls."
            }
          ],
          "modelAnswer": [
            "The product of resistance and capacitance changes."
          ]
        }
      ]
    },
    {
      "id": "boundaries",
      "title": "Boundary conditions and temporal resolution",
      "keyTerms": [],
      "source": "L03 PDF 21",
      "blocks": [
        {
          "type": "text",
          "body": "A differential equation needs boundary and initial conditions before it predicts a waveform. Long electrotonic paths attenuate amplitude and filter rapid fluctuations. The infinite-cable solution cannot be silently reused at a finite end."
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 3, PDF page 21. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 3, PDF page 21. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L03/boundaries.webp', import.meta.url).href,
              "alt": "Lecture 3, PDF page 21. Source figure with original labels and axes retained.",
              "aspect": 1.0406015037593985,
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
          "id": "L03-boundaries-check",
          "prompt": "What else is needed to choose a cable solution?",
          "correct": 0,
          "options": [
            {
              "text": "Boundary conditions and the initial state",
              "feedback": "Correct. Boundary conditions and the initial state."
            },
            {
              "text": "Only the name of the cable equation",
              "feedback": "Use this distinction: Boundary conditions and the initial state."
            }
          ],
          "hints": [
            {
              "body": "An equation can admit several spatial solutions."
            },
            {
              "body": "Endpoint constraints and the starting state select the physical response."
            }
          ],
          "modelAnswer": [
            "Boundary conditions and the initial state."
          ]
        }
      ]
    },
    {
      "id": "normalization",
      "title": "Normalized variables and the transient reference",
      "keyTerms": [],
      "source": "L03 PDF 22",
      "blocks": [
        {
          "type": "text",
          "body": "Use $X=|x|/\\lambda$ and $T=t/\\tau_m$. The error-function transient is a reference, not a NEURON output. The two complementary-error-function terms have a minus between them. Check both the initial and steady limits before changing that sign."
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 3, PDF page 22. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 3, PDF page 22. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L03/normalization.webp', import.meta.url).href,
              "alt": "Lecture 3, PDF page 22. Source figure with original labels and axes retained.",
              "aspect": 1.6181384248210025,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        },
        {
          "type": "detail",
          "title": "Reference: error-function transient and limiting checks",
          "blocks": [
            {
              "type": "math",
              "items": [
                {
                  "tex": "V(X,T)=\\frac{r_i\\lambda I_0}{4}\\left[e^{-X}\\operatorname{erfc}\\left(\\frac{X}{2\\sqrt{T}}-\\sqrt{T}\\right)-e^X\\operatorname{erfc}\\left(\\frac{X}{2\\sqrt{T}}+\\sqrt{T}\\right)\\right]",
                  "label": "Source minus between terms. Uniform infinite cable, step injection at origin, initially resting, positive normalized time."
                },
                {
                  "tex": "\\operatorname{erfc}(u)=1-\\operatorname{erf}(u),\\quad \\operatorname{erf}(u)=\\frac{2}{\\sqrt{\\pi}}\\int_0^u e^{-y^2}\\,dy",
                  "label": "Complementary error function and error function."
                },
                {
                  "tex": "\\operatorname{erf}(-u)=-\\operatorname{erf}(u),\\quad \\frac{d}{du}\\operatorname{erf}(u)=\\frac{2}{\\sqrt{\\pi}}e^{-u^2}",
                  "label": "Symmetry and derivative from PDF22."
                }
              ]
            },
            {
              "type": "text",
              "body": "The source labels the two error functions inconsistently in its sentence. The displayed integrals identify them. Use the reference to understand limits; hand integration and numerical waveform reconstruction are not required here."
            }
          ]
        }
      ],
      "formulas": [
        {
          "id": "L03-f-normalized-time",
          "name": "Electrotonic time",
          "tex": "T=\\frac{t}{\\tau_m}",
          "symbols": [
            {
              "tex": "T",
              "name": "Normalized time",
              "unit": "",
              "meaning": "Dimensionless elapsed time."
            },
            {
              "tex": "t",
              "name": "Elapsed time",
              "unit": "s",
              "meaning": "Time after onset."
            },
            {
              "tex": "\\tau_m",
              "name": "Membrane time constant",
              "unit": "s",
              "meaning": "Time scale."
            }
          ],
          "reads": "Equal normalized times compare stages of membrane relaxation.",
          "assumes": "Consistent units; normalization does not remove boundary conditions.",
          "variants": [],
          "drill": {
            "prompt": "For $t=0.03\\,\\text{s}$ and $\\tau_m=0.02\\,\\text{s}$ find normalized time.",
            "answer": {
              "value": 1.5,
              "unit": "",
              "tolerance": 0.0045000000000000005,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 0.03,
                  "b": 0.02
                },
                "displayScale": 1
              }
            },
            "tex": "T=(0.03\\,\\text{s})/(0.02\\,\\text{s})",
            "modelAnswer": [
              "Equal normalized times compare stages of membrane relaxation."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $T=\\frac{t}{\\tau_m}$."
              },
              {
                "body": "Start with $T=(0.03\\,\\text{s})/(0.02\\,\\text{s})$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{T}=\\frac{\\htmlClass{formula-term-1}{t}}{\\htmlClass{formula-term-2}{\\tau_m}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L03-normalization-check",
          "prompt": "What does normalized time compare?",
          "correct": 1,
          "options": [
            {
              "text": "Elapsed time with the cable length constant",
              "feedback": "Use this distinction: Elapsed time with the membrane time constant."
            },
            {
              "text": "Elapsed time with the membrane time constant",
              "feedback": "Correct. Elapsed time with the membrane time constant."
            }
          ],
          "hints": [
            {
              "body": "Normalize a time using a quantity with time units."
            },
            {
              "body": "A spatial scale would leave mixed dimensions rather than a pure ratio."
            }
          ],
          "modelAnswer": [
            "Elapsed time with the membrane time constant."
          ]
        }
      ]
    },
    {
      "id": "synthesis",
      "title": "Synthesis and what a cable simulation should demonstrate",
      "keyTerms": [],
      "source": "L03 PDF 23",
      "blocks": [
        {
          "type": "text",
          "body": "Compare temporal charging with spatial attenuation. A passive simulation should reveal leakage, delayed and broadened distant responses, and geometry-dependent spread. No exercise file or simulator output is supplied here."
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 3, PDF page 19. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 3, PDF page 19. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L03/time.webp', import.meta.url).href,
              "alt": "Lecture 3, PDF page 19. Source figure with original labels and axes retained.",
              "aspect": 1.246520874751491,
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
          "id": "L03-synthesis-check",
          "prompt": "Which comparison isolates a spatial effect?",
          "correct": 0,
          "options": [
            {
              "text": "Record at different positions under the same pulse",
              "feedback": "Correct. Record at different positions under the same pulse."
            },
            {
              "text": "Change only recording time at one isopotential site",
              "feedback": "Use this distinction: Record at different positions under the same pulse."
            }
          ],
          "hints": [
            {
              "body": "Identify whether position or elapsed time is varied."
            },
            {
              "body": "Hold the stimulus fixed and compare locations to isolate propagation effects."
            }
          ],
          "modelAnswer": [
            "Record at different positions under the same pulse."
          ]
        }
      ]
    }
  ],
  "recap": {
    "intro": "Practice reference; supplied official equations and calculator are confirmed. Open-book status is unconfirmed.",
    "terms": [
      {
        "term": "Electrotonic spread",
        "definition": "Passive signal spread with attenuation and temporal filtering."
      },
      {
        "term": "Isopotential",
        "definition": "Membrane voltage is spatially uniform."
      },
      {
        "term": "Input resistance",
        "definition": "Steady rest-relative voltage divided by total supplied current."
      },
      {
        "term": "Length constant",
        "definition": "Spatial scale of exponential attenuation in a uniform cable."
      },
      {
        "term": "Time constant",
        "definition": "Local membrane resistance-capacitance product."
      },
      {
        "term": "Specific parameter",
        "definition": "Material property before cylinder geometry is included."
      },
      {
        "term": "Boundary conditions",
        "definition": "Endpoint and source constraints selecting an allowed cable solution."
      },
      {
        "term": "Normalized variables",
        "definition": "Distance or time divided by the corresponding scale."
      }
    ],
    "equations": [
      {
        "name": "Membrane time constant",
        "tex": "\\tau_m=R_mC_m",
        "note": "Uniform passive membrane; consistent area conventions."
      },
      {
        "name": "Corner frequency",
        "tex": "f_c=\\frac{1}{2\\pi\\tau_m}",
        "note": "First-order RC approximation."
      },
      {
        "name": "Spherical membrane area",
        "tex": "A=4\\pi a^2",
        "note": "Spherical membrane, not a cylinder cross-section."
      },
      {
        "name": "Uniform injected current density",
        "tex": "I_m=\\frac{I_0}{A}",
        "note": "Isopotential uniform membrane; stated injection sign."
      },
      {
        "name": "Spherical input resistance",
        "tex": "R_{input}=\\frac{R_m}{A}",
        "note": "Isopotential ohmic sphere at steady state."
      },
      {
        "name": "Lumped current-step response",
        "tex": "V(t)=I_0R_{input}(1-e^{-t/\\tau_m})",
        "note": "Initially resting isopotential passive cell; maintained step."
      },
      {
        "name": "Axial resistance per length",
        "tex": "r_i=\\frac{R_i}{\\pi a^2}",
        "note": "Uniform circular core."
      },
      {
        "name": "Membrane resistance-length parameter",
        "tex": "r_m=\\frac{R_m}{2\\pi a}",
        "note": "Lateral cylinder membrane; end caps ignored."
      },
      {
        "name": "Membrane capacitance per length",
        "tex": "c_m=C_m2\\pi a",
        "note": "Lateral uniform cylinder."
      },
      {
        "name": "Axial resistance of a segment",
        "tex": "R_{ax}=r_i\\ell",
        "note": "Uniform segment."
      },
      {
        "name": "Membrane resistance of a segment",
        "tex": "R_{seg}=\\frac{r_m}{\\ell}",
        "note": "Uniform lateral membrane."
      },
      {
        "name": "Axial voltage gradient",
        "tex": "\\frac{\\partial V}{\\partial x}=-r_i i_i",
        "note": "Uniform resistivity; negligible extracellular voltage gradient."
      },
      {
        "name": "Conservation along the core",
        "tex": "\\frac{\\partial i_i}{\\partial x}=-i_m",
        "note": "No additional local source inside this cable interval."
      },
      {
        "name": "Membrane current per length",
        "tex": "i_m=c_m\\partial_tV+\\frac{V}{r_m}",
        "note": "Uniform linear passive membrane."
      },
      {
        "name": "Cable voltage evolution",
        "tex": "\\partial_tV=\\frac{\\lambda^2\\partial_{x}^2V-V}{\\tau_m}",
        "note": "Source-free uniform cable, negligible external resistance."
      },
      {
        "name": "Cable length constant",
        "tex": "\\lambda=\\sqrt{\\frac{r_m}{r_i+r_o}}",
        "note": "Uniform cable; specified external resistance."
      },
      {
        "name": "Infinite-cable steady attenuation",
        "tex": "V(x)=V_0e^{-|x|/\\lambda}",
        "note": "Steady infinite uniform cable, symmetric point injection and bounded response."
      },
      {
        "name": "Length constant from specific properties",
        "tex": "\\lambda=\\sqrt{\\frac{R_ma}{2R_i}}",
        "note": "Uniform cable with negligible external resistance."
      },
      {
        "name": "Electrotonic distance",
        "tex": "X=\\frac{x}{\\lambda}",
        "note": "Uniform cable; use absolute distance when predicting symmetric attenuation."
      },
      {
        "name": "Local passive discharge",
        "tex": "V(t)=V_0e^{-t/\\tau_m}",
        "note": "Lumped or spatially uniform unforced passive response."
      },
      {
        "name": "Electrotonic time",
        "tex": "T=\\frac{t}{\\tau_m}",
        "note": "Consistent units; normalization does not remove boundary conditions."
      },
      {
        "name": "Cable equation",
        "tex": "\\lambda^2\\partial_{x}^2V=\\tau_m\\partial_tV+V",
        "note": "Uniform source-free interval."
      },
      {
        "name": "Distributed injection variant",
        "tex": "\\lambda^2\\partial_{x}^2V=\\tau_m\\partial_tV+V-r_mj_{inj}",
        "note": "Injected source is current per length; point injection instead specifies a current jump."
      },
      {
        "name": "Specific-parameter form",
        "tex": "\\frac{a}{2R_i}\\partial_{x}^2V=C_m\\partial_tV+\\frac{V}{R_m}",
        "note": "Uniform cable with zero external resistance."
      }
    ],
    "constants": [
      {
        "name": "Geometry and material convention",
        "tex": "A_{sphere}=4\\pi a^2,\\quad A_{core}=\\pi a^2,\\quad A_{lateral}=2\\pi a\\ell"
      }
    ],
    "conventions": [
      "$V=V_m-V_{rest}$; zero response is not zero absolute membrane voltage.",
      "Positive axial current points toward increasing coordinate; positive membrane current is outward. Positive supplied current is defined as depolarizing injection.",
      "$r_i$ has units $\\Omega/\\text{m}$; $r_m$ has units $\\Omega\\,\\text{m}$; $c_m$ has units $\\text{F/m}$.",
      "Use radius rather than diameter; convert all lengths before squaring.",
      "Do not equate distant transient fitting time with the local membrane time product.",
      "Insulation does not determine the time-product direction without parameter factors.",
      "All numerical scenarios are new idealized practice data; source recordings remain explicitly identified."
    ]
  },
  "lectureQuiz": [
    {
      "id": "L03-functions-recall",
      "sectionId": "functions",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "Intrinsic activity can arise at sites with voltage-dependent properties.",
          "answer": true
        },
        {
          "text": "Synaptic reception and integration are restricted to axon terminals.",
          "answer": false,
          "correction": "Reception is mostly dendritic; integration also involves soma, hillock and initial segment."
        },
        {
          "text": "Output can be encoded as graded potentials or action potentials.",
          "answer": true
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
        "Intrinsic activity can arise at sites with voltage-dependent properties.",
        "Reception is mostly dendritic; integration also involves soma, hillock and initial segment.",
        "Output can be encoded as graded potentials or action potentials."
      ],
      "points": 1,
      "source": "L03 PDF 1–2"
    },
    {
      "id": "L03-responses-recall",
      "sectionId": "responses",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "Small depolarizing and hyperpolarizing pulses can evoke passive responses.",
          "answer": true
        },
        {
          "text": "Every depolarizing pulse must evoke an action potential.",
          "answer": false,
          "correction": "Only a depolarization reaching threshold evokes the additional active response."
        },
        {
          "text": "The passive approximation uses small changes near resting voltage.",
          "answer": true
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
        "Small depolarizing and hyperpolarizing pulses can evoke passive responses.",
        "Only a depolarization reaching threshold evokes the additional active response.",
        "The passive approximation uses small changes near resting voltage."
      ],
      "points": 1,
      "source": "L03 PDF 3"
    },
    {
      "id": "L03-direct-tau",
      "sectionId": "filter",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $R_m=2\\,\\Omega\\,\\text{m}^2$ and $C_m=0.01\\,\\text{F/m}^2$. Find the time constant.",
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
            "value": 0.02,
            "unit": "s",
            "tolerance": 6e-05,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 2,
                "b": 0.01
              },
              "displayScale": 1
            }
          },
          "tex": "\\tau_m=R_mC_m",
          "modelAnswer": [
            "More resistance or capacitance makes local charging slower.",
            "$\\tau_m=(2\\,\\Omega\\,\\text{m}^2)(0.01\\,\\text{F/m}^2)$",
            "$0.02\\,\\text{s}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\tau_m=R_mC_m$."
        },
        {
          "body": "Start with $\\tau_m=(2\\,\\Omega\\,\\text{m}^2)(0.01\\,\\text{F/m}^2)$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "More resistance or capacitance makes local charging slower."
      ],
      "points": 1,
      "source": "L03 PDF 6"
    },
    {
      "id": "L03-direct-corner",
      "sectionId": "filter",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "For $\\tau_m=0.025\\,\\text{s}$ find the corner frequency in hertz.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Time constant",
              "answer": {
                "value": 0.025,
                "unit": "s",
                "tolerance": 2.5e-08,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.025,
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
            "value": 6.366197723675814,
            "unit": "Hz",
            "tolerance": 0.019098593171027443,
            "verification": {
              "relation": "corner",
              "inputs": {
                "tau": 0.025
              },
              "displayScale": 1
            }
          },
          "tex": "f_c=\\frac{1}{2\\pi\\tau_m}",
          "modelAnswer": [
            "Slow charging suppresses faster voltage fluctuations.",
            "$f_c=1/[2\\pi(0.025\\,\\text{s})]$",
            "$6.3661977\\,\\text{Hz}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $f_c=\\frac{1}{2\\pi\\tau_m}$."
        },
        {
          "body": "Start with $f_c=1/[2\\pi(0.025\\,\\text{s})]$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Slow charging suppresses faster voltage fluctuations."
      ],
      "points": 1,
      "source": "L03 PDF 6"
    },
    {
      "id": "L03-direct-area",
      "sectionId": "sphere",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "A spherical cell has radius $10^{-5}\\,\\text{m}$. Find area.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Radius",
              "answer": {
                "value": 1e-05,
                "unit": "m",
                "tolerance": 1.0000000000000001e-11,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1e-05,
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
            "value": 1.2566370614359174e-09,
            "unit": "m2",
            "tolerance": 3.769911184307752e-12,
            "verification": {
              "relation": "sphereArea",
              "inputs": {
                "radius": 1e-05
              },
              "displayScale": 1
            }
          },
          "tex": "A=4\\pi a^2",
          "modelAnswer": [
            "Area grows with the square of radius.",
            "$A=4\\pi(10^{-5}\\,\\text{m})^2$",
            "$1.2566371e-09\\,\\text{m2}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $A=4\\pi a^2$."
        },
        {
          "body": "Start with $A=4\\pi(10^{-5}\\,\\text{m})^2$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Area grows with the square of radius."
      ],
      "points": 1,
      "source": "L03 PDF 8"
    },
    {
      "id": "L03-direct-density",
      "sectionId": "sphere",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Positive injected current is $2\\times10^{-10}\\,\\text{A}$ over $2\\times10^{-9}\\,\\text{m}^2$. Find supplied current density.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Total current",
              "answer": {
                "value": 2e-10,
                "unit": "A",
                "tolerance": 2e-16,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 2e-10,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Area",
              "answer": {
                "value": 2e-09,
                "unit": "m2",
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
            "unit": "A/m2",
            "tolerance": 0.00030000000000000003,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 2e-10,
                "b": 2e-09
              },
              "displayScale": 1
            }
          },
          "tex": "I_m=\\frac{I_0}{A}",
          "modelAnswer": [
            "The same total current is diluted over a larger surface.",
            "$I_m=(2\\times10^{-10}\\,\\text{A})/(2\\times10^{-9}\\,\\text{m}^2)$",
            "$0.1\\,\\text{A/m2}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $I_m=\\frac{I_0}{A}$."
        },
        {
          "body": "Start with $I_m=(2\\times10^{-10}\\,\\text{A})/(2\\times10^{-9}\\,\\text{m}^2)$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "The same total current is diluted over a larger surface."
      ],
      "points": 1,
      "source": "L03 PDF 8"
    },
    {
      "id": "L03-direct-input",
      "sectionId": "input",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $R_m=2\\,\\Omega\\,\\text{m}^2$ and $A=2\\times10^{-9}\\,\\text{m}^2$. Find input resistance.",
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
              "label": "Area",
              "answer": {
                "value": 2e-09,
                "unit": "m2",
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
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 1000000000.0,
            "unit": "ohm",
            "tolerance": 3000000.0,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 2,
                "b": 2e-09
              },
              "displayScale": 1
            }
          },
          "tex": "R_{input}=\\frac{R_m}{A}",
          "modelAnswer": [
            "Larger cells have lower input resistance at unchanged specific resistance.",
            "$R_{input}=(2\\,\\Omega\\,\\text{m}^2)/(2\\times10^{-9}\\,\\text{m}^2)$",
            "$1e+09\\,\\text{ohm}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $R_{input}=\\frac{R_m}{A}$."
        },
        {
          "body": "Start with $R_{input}=(2\\,\\Omega\\,\\text{m}^2)/(2\\times10^{-9}\\,\\text{m}^2)$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Larger cells have lower input resistance at unchanged specific resistance."
      ],
      "points": 1,
      "source": "L03 PDF 8"
    },
    {
      "id": "L03-direct-charging",
      "sectionId": "input",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $I_0=10^{-11}\\,\\text{A}$, $R_{input}=10^9\\,\\Omega$, $\\tau_m=0.02\\,\\text{s}$ and $t=0.02\\,\\text{s}$. Find the voltage increment.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Current",
              "answer": {
                "value": 1e-11,
                "unit": "A",
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
            },
            {
              "label": "Resistance",
              "answer": {
                "value": 1000000000.0,
                "unit": "ohm",
                "tolerance": 1000.0,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1000000000.0,
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
          "title": "Evaluate",
          "answer": {
            "value": 0.006321205588285576,
            "unit": "V",
            "tolerance": 1.896361676485673e-05,
            "verification": {
              "relation": "charging",
              "inputs": {
                "i": 1e-11,
                "r": 1000000000.0,
                "c": 2e-11,
                "t": 0.02
              },
              "displayScale": 1
            }
          },
          "tex": "V(t)=I_0R_{input}(1-e^{-t/\\tau_m})",
          "modelAnswer": [
            "Voltage approaches the steady current times input resistance.",
            "$V=(10^{-11}\\,\\text{A})(10^9\\,\\Omega)(1-e^{-1})$",
            "$0.0063212056\\,\\text{V}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $V(t)=I_0R_{input}(1-e^{-t/\\tau_m})$."
        },
        {
          "body": "Start with $V=(10^{-11}\\,\\text{A})(10^9\\,\\Omega)(1-e^{-1})$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Voltage approaches the steady current times input resistance."
      ],
      "points": 1,
      "source": "L03 PDF 8"
    },
    {
      "id": "L03-distributed-recall",
      "sectionId": "distributed",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "A distributed model can represent different voltages at two positions.",
          "answer": true
        },
        {
          "text": "Membrane capacitances connect successive intracellular points in series.",
          "answer": false,
          "correction": "Axial resistances connect intracellular points; membrane capacitance and resistance form parallel local branches."
        },
        {
          "text": "External resistance can contribute to longitudinal circuit resistance.",
          "answer": true
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
        "A distributed model can represent different voltages at two positions.",
        "Axial resistances connect intracellular points; membrane capacitance and resistance form parallel local branches.",
        "External resistance can contribute to longitudinal circuit resistance."
      ],
      "points": 1,
      "source": "L03 PDF 9"
    },
    {
      "id": "L03-assumptions-recall",
      "sectionId": "assumptions",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "The passive parameters are independent of $V$ in the linear model.",
          "answer": true
        },
        {
          "text": "One-dimensional axial flow forbids transmembrane leakage.",
          "answer": false,
          "correction": "The intracellular core is approximated as one dimensional; the membrane still leaks and stores charge."
        },
        {
          "text": "Infinite length is a modeling assumption, not a universal anatomical fact.",
          "answer": true
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
        "The passive parameters are independent of $V$ in the linear model.",
        "The intracellular core is approximated as one dimensional; the membrane still leaks and stores charge.",
        "Infinite length is a modeling assumption, not a universal anatomical fact."
      ],
      "points": 1,
      "source": "L03 PDF 10"
    },
    {
      "id": "L03-direct-axial",
      "sectionId": "geometry",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $R_i=2\\,\\Omega\\,\\text{m}$ and $a=2\\times10^{-6}\\,\\text{m}$. Find axial resistance per length.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Resistivity",
              "answer": {
                "value": 2,
                "unit": "ohm*m",
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
              "label": "Radius",
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
            "value": 159154943091.89536,
            "unit": "ohm/m",
            "tolerance": 477464829.2756861,
            "verification": {
              "relation": "cableAxial",
              "inputs": {
                "rho": 2,
                "radius": 2e-06
              },
              "displayScale": 1
            }
          },
          "tex": "r_i=\\frac{R_i}{\\pi a^2}",
          "modelAnswer": [
            "A wider cross-section makes longitudinal flow easier.",
            "$r_i=(2\\,\\Omega\\,\\text{m})/[\\pi(2\\times10^{-6}\\,\\text{m})^2]$",
            "$1.5915494e+11\\,\\text{ohm/m}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $r_i=\\frac{R_i}{\\pi a^2}$."
        },
        {
          "body": "Start with $r_i=(2\\,\\Omega\\,\\text{m})/[\\pi(2\\times10^{-6}\\,\\text{m})^2]$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "A wider cross-section makes longitudinal flow easier."
      ],
      "points": 1,
      "source": "L03 PDF 12"
    },
    {
      "id": "L03-direct-membrane",
      "sectionId": "geometry",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "For $R_m=2\\,\\Omega\\,\\text{m}^2$ and $a=2\\times10^{-6}\\,\\text{m}$ find the membrane resistance-length parameter.",
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
              "label": "Radius",
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
            "value": 159154.94309189534,
            "unit": "ohm*m",
            "tolerance": 477.46482927568604,
            "verification": {
              "relation": "cableMembrane",
              "inputs": {
                "specific": 2,
                "radius": 2e-06
              },
              "displayScale": 1
            }
          },
          "tex": "r_m=\\frac{R_m}{2\\pi a}",
          "modelAnswer": [
            "More circumference provides more parallel leak pathways.",
            "$r_m=(2\\,\\Omega\\,\\text{m}^2)/[2\\pi(2\\times10^{-6}\\,\\text{m})]$",
            "$159154.94\\,\\text{ohm*m}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $r_m=\\frac{R_m}{2\\pi a}$."
        },
        {
          "body": "Start with $r_m=(2\\,\\Omega\\,\\text{m}^2)/[2\\pi(2\\times10^{-6}\\,\\text{m})]$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "More circumference provides more parallel leak pathways."
      ],
      "points": 1,
      "source": "L03 PDF 12"
    },
    {
      "id": "L03-direct-capacitance",
      "sectionId": "geometry",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $C_m=0.01\\,\\text{F/m}^2$ and $a=2\\times10^{-6}\\,\\text{m}$. Find capacitance per length.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
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
            },
            {
              "label": "Radius",
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
            "value": 1.2566370614359172e-07,
            "unit": "F/m",
            "tolerance": 3.769911184307752e-10,
            "verification": {
              "relation": "cableCapacitance",
              "inputs": {
                "specific": 0.01,
                "radius": 2e-06
              },
              "displayScale": 1
            }
          },
          "tex": "c_m=C_m2\\pi a",
          "modelAnswer": [
            "More circumference stores more charge per length.",
            "$c_m=(0.01\\,\\text{F/m}^2)2\\pi(2\\times10^{-6}\\,\\text{m})$",
            "$1.2566371e-07\\,\\text{F/m}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $c_m=C_m2\\pi a$."
        },
        {
          "body": "Start with $c_m=(0.01\\,\\text{F/m}^2)2\\pi(2\\times10^{-6}\\,\\text{m})$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "More circumference stores more charge per length."
      ],
      "points": 1,
      "source": "L03 PDF 12"
    },
    {
      "id": "L03-direct-segment-axial",
      "sectionId": "geometry",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $r_i=10^{11}\\,\\Omega/\\text{m}$ and segment length $10^{-4}\\,\\text{m}$. Find axial resistance.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Axial parameter",
              "answer": {
                "value": 100000000000.0,
                "unit": "ohm/m",
                "tolerance": 100000.0,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 100000000000.0,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Length",
              "answer": {
                "value": 0.0001,
                "unit": "m",
                "tolerance": 1e-10,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.0001,
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
            "value": 10000000.0,
            "unit": "ohm",
            "tolerance": 30000.0,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 100000000000.0,
                "b": 0.0001
              },
              "displayScale": 1
            }
          },
          "tex": "R_{ax}=r_i\\ell",
          "modelAnswer": [
            "Longer paths put more axial resistance in series.",
            "$R_{ax}=(10^{11}\\,\\Omega/\\text{m})(10^{-4}\\,\\text{m})$",
            "$10000000\\,\\text{ohm}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $R_{ax}=r_i\\ell$."
        },
        {
          "body": "Start with $R_{ax}=(10^{11}\\,\\Omega/\\text{m})(10^{-4}\\,\\text{m})$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Longer paths put more axial resistance in series."
      ],
      "points": 1,
      "source": "L03 PDF 12"
    },
    {
      "id": "L03-direct-segment-membrane",
      "sectionId": "geometry",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $r_m=10^5\\,\\Omega\\,\\text{m}$ and $\\ell=10^{-4}\\,\\text{m}$. Find segment membrane resistance.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Membrane parameter",
              "answer": {
                "value": 100000.0,
                "unit": "ohm*m",
                "tolerance": 0.09999999999999999,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 100000.0,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Length",
              "answer": {
                "value": 0.0001,
                "unit": "m",
                "tolerance": 1e-10,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.0001,
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
            "value": 1000000000.0,
            "unit": "ohm",
            "tolerance": 3000000.0,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 100000.0,
                "b": 0.0001
              },
              "displayScale": 1
            }
          },
          "tex": "R_{seg}=\\frac{r_m}{\\ell}",
          "modelAnswer": [
            "Longer segments contain more membrane leak pathways in parallel.",
            "$R_{seg}=(10^5\\,\\Omega\\,\\text{m})/(10^{-4}\\,\\text{m})$",
            "$1e+09\\,\\text{ohm}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $R_{seg}=\\frac{r_m}{\\ell}$."
        },
        {
          "body": "Start with $R_{seg}=(10^5\\,\\Omega\\,\\text{m})/(10^{-4}\\,\\text{m})$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Longer segments contain more membrane leak pathways in parallel."
      ],
      "points": 1,
      "source": "L03 PDF 12"
    },
    {
      "id": "L03-direct-gradient",
      "sectionId": "conservation",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "For $r_i=10^{11}\\,\\Omega/\\text{m}$ and $i_i=2\\times10^{-10}\\,\\text{A}$ find the axial voltage gradient.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Axial parameter",
              "answer": {
                "value": 100000000000.0,
                "unit": "ohm/m",
                "tolerance": 100000.0,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 100000000000.0,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Axial current",
              "answer": {
                "value": 2e-10,
                "unit": "A",
                "tolerance": 2e-16,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 2e-10,
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
            "value": -20,
            "unit": "V/m",
            "tolerance": 0.06,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": -100000000000.0,
                "b": 2e-10
              },
              "displayScale": 1
            }
          },
          "tex": "\\frac{\\partial V}{\\partial x}=-r_i i_i",
          "modelAnswer": [
            "Positive axial current flows down the voltage gradient.",
            "$\\partial_{x}V=-(10^{11}\\,\\Omega/\\text{m})(2\\times10^{-10}\\,\\text{A})$",
            "$-20\\,\\text{V/m}$"
          ],
          "commonErrors": [
            {
              "wrongValue": 20,
              "tolerance": 0.01,
              "why": "Positive axial current flows down voltage: retain the minus sign in the axial gradient.",
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 100000000000.0,
                  "b": 2e-10
                }
              }
            }
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\frac{\\partial V}{\\partial x}=-r_i i_i$."
        },
        {
          "body": "Start with $\\partial_{x}V=-(10^{11}\\,\\Omega/\\text{m})(2\\times10^{-10}\\,\\text{A})$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Positive axial current flows down the voltage gradient."
      ],
      "points": 1,
      "source": "L03 PDF 13"
    },
    {
      "id": "L03-direct-conservation",
      "sectionId": "conservation",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Outward membrane current per length is $2\\times10^{-6}\\,\\text{A/m}$. Find the axial current gradient.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Membrane current per length",
              "answer": {
                "value": 2e-06,
                "unit": "A/m",
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
            "value": -2e-06,
            "unit": "A/m",
            "tolerance": 6e-09,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": -1,
                "b": 2e-06
              },
              "displayScale": 1
            }
          },
          "tex": "\\frac{\\partial i_i}{\\partial x}=-i_m",
          "modelAnswer": [
            "Outward membrane current reduces downstream axial current.",
            "$\\partial_{x} i_i=-(2\\times10^{-6}\\,\\text{A/m})$",
            "$-2e-06\\,\\text{A/m}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\frac{\\partial i_i}{\\partial x}=-i_m$."
        },
        {
          "body": "Start with $\\partial_{x} i_i=-(2\\times10^{-6}\\,\\text{A/m})$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Outward membrane current reduces downstream axial current."
      ],
      "points": 1,
      "source": "L03 PDF 13"
    },
    {
      "id": "L03-direct-membrane-current",
      "sectionId": "equation",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Given $c_m=10^{-7}\\,\\text{F/m}$, $\\partial_tV=1\\,\\text{V/s}$, $V=0.01\\,\\text{V}$ and $r_m=10^5\\,\\Omega\\,\\text{m}$, find membrane current per length.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Capacitive term",
              "answer": {
                "value": 1e-07,
                "unit": "A/m",
                "tolerance": 9.999999999999999e-14,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1e-07,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Leak term",
              "answer": {
                "value": 1e-07,
                "unit": "A/m",
                "tolerance": 9.999999999999999e-14,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1e-07,
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
            "value": 2e-07,
            "unit": "A/m",
            "tolerance": 6e-10,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": 1e-07,
                "b": 1e-07
              },
              "displayScale": 1
            }
          },
          "tex": "i_m=c_m\\partial_tV+\\frac{V}{r_m}",
          "modelAnswer": [
            "Membrane current can charge storage and leak through resistance.",
            "$i_m=(10^{-7}\\,\\text{F/m})(1\\,\\text{V/s})+(0.01\\,\\text{V})/(10^5\\,\\Omega\\,\\text{m})$",
            "$2e-07\\,\\text{A/m}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $i_m=c_m\\partial_tV+\\frac{V}{r_m}$."
        },
        {
          "body": "Start with $i_m=(10^{-7}\\,\\text{F/m})(1\\,\\text{V/s})+(0.01\\,\\text{V})/(10^5\\,\\Omega\\,\\text{m})$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Membrane current can charge storage and leak through resistance."
      ],
      "points": 1,
      "source": "L03 PDF 14"
    },
    {
      "id": "L03-direct-evolution",
      "sectionId": "equation",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "At a point $\\lambda=0.001\\,\\text{m}$, $\\partial_{x}^2V=5000\\,\\text{V/m}^2$, $V=0.01\\,\\text{V}$ and $\\tau_m=0.02\\,\\text{s}$. Find local voltage slope.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Length constant",
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
              "label": "Curvature",
              "answer": {
                "value": 5000,
                "unit": "V/m2",
                "tolerance": 0.005,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 5000,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Voltage increment",
              "answer": {
                "value": 0.01,
                "unit": "V",
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
          "title": "Evaluate",
          "answer": {
            "value": -0.25,
            "unit": "V/s",
            "tolerance": 0.00075,
            "verification": {
              "relation": "cableEvolution",
              "inputs": {
                "lambda": 0.001,
                "curvature": 5000,
                "v": 0.01,
                "tau": 0.02
              },
              "displayScale": 1
            }
          },
          "tex": "\\partial_tV=\\frac{\\lambda^2\\partial_{x}^2V-V}{\\tau_m}",
          "modelAnswer": [
            "Axial redistribution competes with local leakage to set voltage slope.",
            "$\\partial_tV=[(0.001\\,\\text{m})^2(5000\\,\\text{V/m}^2)-0.01\\,\\text{V}]/(0.02\\,\\text{s})$",
            "$-0.25\\,\\text{V/s}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\partial_tV=\\frac{\\lambda^2\\partial_{x}^2V-V}{\\tau_m}$."
        },
        {
          "body": "Start with $\\partial_tV=[(0.001\\,\\text{m})^2(5000\\,\\text{V/m}^2)-0.01\\,\\text{V}]/(0.02\\,\\text{s})$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Axial redistribution competes with local leakage to set voltage slope."
      ],
      "points": 1,
      "source": "L03 PDF 14"
    },
    {
      "id": "L03-direct-length",
      "sectionId": "length",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $r_m=10^5\\,\\Omega\\,\\text{m}$, $r_i=10^{11}\\,\\Omega/\\text{m}$ and $r_o=0$. Find the length constant.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Membrane parameter",
              "answer": {
                "value": 100000.0,
                "unit": "ohm*m",
                "tolerance": 0.09999999999999999,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 100000.0,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Axial parameter",
              "answer": {
                "value": 100000000000.0,
                "unit": "ohm/m",
                "tolerance": 100000.0,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 100000000000.0,
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
                "rm": 100000.0,
                "ri": 100000000000.0,
                "ro": 0
              },
              "displayScale": 1
            }
          },
          "tex": "\\lambda=\\sqrt{\\frac{r_m}{r_i+r_o}}",
          "modelAnswer": [
            "Leak resistance promotes spread; axial resistance limits it.",
            "$\\lambda=\\sqrt{(10^5\\,\\Omega\\,\\text{m})/(10^{11}\\,\\Omega/\\text{m})}$",
            "$0.001\\,\\text{m}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\lambda=\\sqrt{\\frac{r_m}{r_i+r_o}}$."
        },
        {
          "body": "Start with $\\lambda=\\sqrt{(10^5\\,\\Omega\\,\\text{m})/(10^{11}\\,\\Omega/\\text{m})}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Leak resistance promotes spread; axial resistance limits it."
      ],
      "points": 1,
      "source": "L03 PDF 14"
    },
    {
      "id": "L03-direct-decay",
      "sectionId": "decay",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $V_0=0.012\\,\\text{V}$, $x=0.001\\,\\text{m}$ and $\\lambda=0.001\\,\\text{m}$. Find the voltage increment.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Origin voltage",
              "answer": {
                "value": 0.012,
                "unit": "V",
                "tolerance": 1.2e-08,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.012,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Distance",
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
              "label": "Length constant",
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
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 0.004414553294057308,
            "unit": "V",
            "tolerance": 1.3243659882171924e-05,
            "verification": {
              "relation": "cableDecay",
              "inputs": {
                "v": 0.012,
                "x": 0.001,
                "lambda": 0.001
              },
              "displayScale": 1
            }
          },
          "tex": "V(x)=V_0e^{-|x|/\\lambda}",
          "modelAnswer": [
            "The response becomes smaller with distance on either side of injection.",
            "$V=0.012\\,\\text{V}\\,e^{-0.001/0.001}$",
            "$0.0044145533\\,\\text{V}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $V(x)=V_0e^{-|x|/\\lambda}$."
        },
        {
          "body": "Start with $V=0.012\\,\\text{V}\\,e^{-0.001/0.001}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "The response becomes smaller with distance on either side of injection."
      ],
      "points": 1,
      "source": "L03 PDF 16"
    },
    {
      "id": "L03-direct-specific-length",
      "sectionId": "scaling",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "For $R_m=2\\,\\Omega\\,\\text{m}^2$, $R_i=2\\,\\Omega\\,\\text{m}$ and $a=2\\times10^{-6}\\,\\text{m}$, find length constant using the geometry-derived cable parameters.",
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
              "label": "Radius",
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
              "label": "Intracellular resistivity",
              "answer": {
                "value": 2,
                "unit": "ohm*m",
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
                "rm": 159154.94309189534,
                "ri": 159154943091.89536
              },
              "displayScale": 1
            }
          },
          "tex": "\\lambda=\\sqrt{\\frac{R_ma}{2R_i}}",
          "modelAnswer": [
            "Greater radius or membrane resistance improves passive spread.",
            "$\\lambda=\\sqrt{(2\\,\\Omega\\,\\text{m}^2)(2\\times10^{-6}\\,\\text{m})/[2(2\\,\\Omega\\,\\text{m})]}$",
            "$0.001\\,\\text{m}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\lambda=\\sqrt{\\frac{R_ma}{2R_i}}$."
        },
        {
          "body": "Start with $\\lambda=\\sqrt{(2\\,\\Omega\\,\\text{m}^2)(2\\times10^{-6}\\,\\text{m})/[2(2\\,\\Omega\\,\\text{m})]}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Greater radius or membrane resistance improves passive spread."
      ],
      "points": 1,
      "source": "L03 PDF 17"
    },
    {
      "id": "L03-direct-distance",
      "sectionId": "distance",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $x=0.003\\,\\text{m}$ and $\\lambda=0.001\\,\\text{m}$. Find electrotonic distance.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Distance",
              "answer": {
                "value": 0.003,
                "unit": "m",
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
              "label": "Length constant",
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
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 3,
            "unit": "",
            "tolerance": 0.009000000000000001,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 0.003,
                "b": 0.001
              },
              "displayScale": 1
            }
          },
          "tex": "X=\\frac{x}{\\lambda}",
          "modelAnswer": [
            "Distance is meaningful relative to the cable spatial scale.",
            "$X=(0.003\\,\\text{m})/(0.001\\,\\text{m})$",
            "$3\\,\\text{}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $X=\\frac{x}{\\lambda}$."
        },
        {
          "body": "Start with $X=(0.003\\,\\text{m})/(0.001\\,\\text{m})$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Distance is meaningful relative to the cable spatial scale."
      ],
      "points": 1,
      "source": "L03 PDF 18"
    },
    {
      "id": "L03-direct-discharge",
      "sectionId": "time",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $V_0=-0.01\\,\\text{V}$, $t=0.02\\,\\text{s}$ and $\\tau_m=0.02\\,\\text{s}$. Find the remaining voltage increment.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Initial increment",
              "answer": {
                "value": -0.01,
                "unit": "V",
                "tolerance": 1e-08,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -0.01,
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
          "title": "Evaluate",
          "answer": {
            "value": -0.0036787944117144234,
            "unit": "V",
            "tolerance": 1.103638323514327e-05,
            "verification": {
              "relation": "cableDecay",
              "inputs": {
                "v": -0.01,
                "x": 0.02,
                "lambda": 0.02
              },
              "displayScale": 1
            }
          },
          "tex": "V(t)=V_0e^{-t/\\tau_m}",
          "modelAnswer": [
            "The remaining local increment decays exponentially after release.",
            "$V=(-0.01\\,\\text{V})e^{-0.02/0.02}$",
            "$-0.0036787944\\,\\text{V}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $V(t)=V_0e^{-t/\\tau_m}$."
        },
        {
          "body": "Start with $V=(-0.01\\,\\text{V})e^{-0.02/0.02}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "The remaining local increment decays exponentially after release."
      ],
      "points": 1,
      "source": "L03 PDF 19"
    },
    {
      "id": "L03-myelin-recall",
      "sectionId": "myelin",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "Higher membrane resistance at fixed geometry increases passive spatial spread.",
          "answer": true
        },
        {
          "text": "Higher resistance always makes the local time constant smaller.",
          "answer": false,
          "correction": "The time constant is resistance times capacitance; both changes must be specified."
        },
        {
          "text": "This passive comparison alone derives the full mechanism of saltatory spike regeneration.",
          "answer": false,
          "correction": "Passive spread supports the context; detailed nodal spike mechanisms belong to later lectures."
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
        "Higher membrane resistance at fixed geometry increases passive spatial spread.",
        "The time constant is resistance times capacitance; both changes must be specified.",
        "Passive spread supports the context; detailed nodal spike mechanisms belong to later lectures."
      ],
      "points": 1,
      "source": "L03 PDF 20"
    },
    {
      "id": "L03-direct-normalized-time",
      "sectionId": "normalization",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "For $t=0.03\\,\\text{s}$ and $\\tau_m=0.02\\,\\text{s}$ find normalized time.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Elapsed time",
              "answer": {
                "value": 0.03,
                "unit": "s",
                "tolerance": 3e-08,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.03,
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
          "title": "Evaluate",
          "answer": {
            "value": 1.5,
            "unit": "",
            "tolerance": 0.0045000000000000005,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 0.03,
                "b": 0.02
              },
              "displayScale": 1
            }
          },
          "tex": "T=\\frac{t}{\\tau_m}",
          "modelAnswer": [
            "Equal normalized times compare stages of membrane relaxation.",
            "$T=(0.03\\,\\text{s})/(0.02\\,\\text{s})$",
            "$1.5\\,\\text{}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $T=\\frac{t}{\\tau_m}$."
        },
        {
          "body": "Start with $T=(0.03\\,\\text{s})/(0.02\\,\\text{s})$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Equal normalized times compare stages of membrane relaxation."
      ],
      "points": 1,
      "source": "L03 PDF 22"
    },
    {
      "id": "L03-functions-map",
      "sectionId": "functions",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Map intrinsic activity, reception, integration, encoding and distribution to the source neuron. Explain why passive spread matters between receiving and integrating sites.",
      "hints": [
        {
          "body": "Follow the arrows in the source neuron."
        },
        {
          "body": "Separate receiving a signal from combining signals and distributing output."
        }
      ],
      "markScheme": [
        {
          "text": "Intrinsic mechanisms generate activity; dendrites mainly receive synaptic inputs."
        },
        {
          "text": "Dendrites, soma, hillock and initial segment combine inputs with intrinsic activity."
        },
        {
          "text": "Graded potentials or spikes encode output; terminals usually distribute synaptic output."
        },
        {
          "text": "Passive spread changes the amplitude and timing arriving at another site."
        }
      ],
      "modelAnswer": [
        "Intrinsic mechanisms generate activity; dendrites mainly receive synaptic inputs.",
        "Dendrites, soma, hillock and initial segment combine inputs with intrinsic activity.",
        "Graded potentials or spikes encode output; terminals usually distribute synaptic output.",
        "Passive spread changes the amplitude and timing arriving at another site."
      ],
      "points": 1,
      "source": "L03 PDF 1–2",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 3, PDF page 2. Source figure with original labels and axes retained.",
        "fallbackAlt": "Lecture 3, PDF page 2. Source figure with original labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L03/functions.webp', import.meta.url).href,
          "alt": "Lecture 3, PDF page 2. Source figure with original labels and axes retained.",
          "aspect": 0.6411543287327478,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L03-responses-interpret",
      "sectionId": "responses",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Read the current steps and voltage responses in the source. Identify passive versus active responses, the role of the two electrodes and why a single linear model fails for the largest depolarizations.",
      "hints": [
        {
          "body": "Align the upper current steps with the lower voltage trace."
        },
        {
          "body": "Compare the voltage shapes below and above the marked threshold."
        }
      ],
      "markScheme": [
        {
          "text": "The injecting electrode supplies commanded current; the other measures membrane voltage."
        },
        {
          "text": "Hyperpolarizing and small depolarizing pulses produce graded passive responses."
        },
        {
          "text": "Above threshold the trace includes spikes and changing membrane permeability."
        },
        {
          "text": "A constant-resistance small-signal model cannot reproduce that regenerative response."
        }
      ],
      "modelAnswer": [
        "The injecting electrode supplies commanded current; the other measures membrane voltage.",
        "Hyperpolarizing and small depolarizing pulses produce graded passive responses.",
        "Above threshold the trace includes spikes and changing membrane permeability.",
        "A constant-resistance small-signal model cannot reproduce that regenerative response."
      ],
      "points": 1,
      "source": "L03 PDF 3",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 3, PDF page 3. Source figure with original labels and axes retained.",
        "fallbackAlt": "Lecture 3, PDF page 3. Source figure with original labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L03/responses.webp', import.meta.url).href,
          "alt": "Lecture 3, PDF page 3. Source figure with original labels and axes retained.",
          "aspect": 1.856115107913669,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L03-analogy-compare",
      "sectionId": "analogy",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Use the source cable drawing to explain the useful electrical analogy and one limit when it is applied to a neuron.",
      "hints": [
        {
          "body": "Compare electrical paths rather than historical dates."
        },
        {
          "body": "Separate distributed passive behavior from active membrane mechanisms."
        }
      ],
      "markScheme": [
        {
          "text": "Longitudinal resistance limits axial current and insulation is imperfect."
        },
        {
          "text": "Charge storage and leakage cause delay and attenuation."
        },
        {
          "text": "A passive wire analogy does not explain voltage-dependent spike regeneration."
        }
      ],
      "modelAnswer": [
        "Longitudinal resistance limits axial current and insulation is imperfect.",
        "Charge storage and leakage cause delay and attenuation.",
        "A passive wire analogy does not explain voltage-dependent spike regeneration."
      ],
      "points": 1,
      "source": "L03 PDF 4–5",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 3, PDF page 4. Source figure with original labels and axes retained.",
        "fallbackAlt": "Lecture 3, PDF page 4. Source figure with original labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L03/analogy.webp', import.meta.url).href,
          "alt": "Lecture 3, PDF page 4. Source figure with original labels and axes retained.",
          "aspect": 3.124716553287982,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L03-filter-compare",
      "sectionId": "filter",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Compare impulse time responses and frequency responses for membranes with the same steady resistance but different capacitance. Which preserves rapid input changes better?",
      "hints": [
        {
          "body": "Link the two source plots through the time constant."
        },
        {
          "body": "Keep resistance fixed before considering the effect of capacitance."
        }
      ],
      "markScheme": [
        {
          "text": "Larger capacitance increases the time constant at fixed resistance."
        },
        {
          "text": "Its impulse response lasts longer and corner frequency is lower."
        },
        {
          "text": "The smaller-capacitance membrane preserves rapid fluctuations better; neither passive response regenerates a spike."
        }
      ],
      "modelAnswer": [
        "Larger capacitance increases the time constant at fixed resistance.",
        "Its impulse response lasts longer and corner frequency is lower.",
        "The smaller-capacitance membrane preserves rapid fluctuations better; neither passive response regenerates a spike."
      ],
      "points": 1,
      "source": "L03 PDF 6",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 3, PDF page 6. Source figure with original labels and axes retained.",
        "fallbackAlt": "Lecture 3, PDF page 6. Source figure with original labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L03/filter.webp', import.meta.url).href,
          "alt": "Lecture 3, PDF page 6. Source figure with original labels and axes retained.",
          "aspect": 0.6703741152679474,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L03-cylinders-model",
      "sectionId": "cylinders",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Compare the source dendritic trees and simplified cylinder representation. What is retained for cable analysis, and what does a spatial model capture that one lumped voltage misses?",
      "hints": [
        {
          "body": "Compare a shape approximation with an electrical approximation."
        },
        {
          "body": "Focus on position-dependent voltage rather than the name of a software tool."
        }
      ],
      "markScheme": [
        {
          "text": "Cylinders retain longitudinal paths, radius and membrane surface."
        },
        {
          "text": "Connected paths allow different positions to have different voltage and timing."
        },
        {
          "text": "A lumped cell cannot describe attenuation between input and a distant integrating site."
        }
      ],
      "modelAnswer": [
        "Cylinders retain longitudinal paths, radius and membrane surface.",
        "Connected paths allow different positions to have different voltage and timing.",
        "A lumped cell cannot describe attenuation between input and a distant integrating site."
      ],
      "points": 1,
      "source": "L03 PDF 7",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 3, PDF page 7. Source figure with original labels and axes retained.",
        "fallbackAlt": "Lecture 3, PDF page 7. Source figure with original labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L03/cylinders.webp', import.meta.url).href,
          "alt": "Lecture 3, PDF page 7. Source figure with original labels and axes retained.",
          "aspect": 1.1845386533665836,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L03-sphere-chain",
      "sectionId": "input",
      "difficulty": "medium",
      "type": "multiStepCalc",
      "prompt": "A passive sphere has radius $12\\,\\mu\\text{m}$, $R_m=1.5\\,\\Omega\\,\\text{m}^2$, $C_m=0.01\\,\\text{F/m}^2$. Inject $8\\,\\text{pA}$ for a long time. Find area, input resistance, steady voltage increment and time constant.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Radius",
              "answer": {
                "value": 1.2e-05,
                "unit": "m",
                "tolerance": 1.2e-11,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1.2e-05,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Injected current",
              "answer": {
                "value": 8e-12,
                "unit": "A",
                "tolerance": 7.999999999999999e-18,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 8e-12,
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
          "title": "Area",
          "answer": {
            "value": 1.809557368467721e-09,
            "unit": "m2",
            "tolerance": 5.428672105403163e-12,
            "verification": {
              "relation": "sphereArea",
              "inputs": {
                "radius": 1.2e-05
              },
              "displayScale": 1
            }
          },
          "tex": "A=4\\pi a^2",
          "modelAnswer": [
            "Use membrane surface area.",
            "$A=4\\pi a^2$",
            "$1.8095574e-09\\,\\text{m2}$"
          ]
        },
        {
          "title": "Input resistance",
          "answer": {
            "value": 828931995.2702881,
            "unit": "ohm",
            "tolerance": 2486795.9858108643,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 1.5,
                "b": 1.809557368467721e-09
              },
              "displayScale": 1
            }
          },
          "tex": "R_{input}=R_m/A",
          "modelAnswer": [
            "Specific resistance is divided by area.",
            "$R_{input}=R_m/A$",
            "$8.28932e+08\\,\\text{ohm}$"
          ]
        },
        {
          "title": "Steady increment",
          "answer": {
            "value": 0.006631455962162305,
            "unit": "V",
            "tolerance": 1.9894367886486915e-05,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 8e-12,
                "b": 828931995.2702881
              },
              "displayScale": 1
            }
          },
          "tex": "V_{\\infty}=I_0R_{input}",
          "modelAnswer": [
            "Positive supplied current depolarizes.",
            "$V_{\\infty}=I_0R_{input}$",
            "$0.006631456\\,\\text{V}$"
          ]
        },
        {
          "title": "Time constant",
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
            "Geometry cancels from this local time constant.",
            "$\\tau_m=R_mC_m$",
            "$0.015\\,\\text{s}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Combine surface geometry with the steady current-voltage ratio."
        },
        {
          "body": "Start by converting the radius to metres, square it for area, then divide specific resistance by area."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Use membrane surface area.",
        "Specific resistance is divided by area.",
        "Positive supplied current depolarizes.",
        "Geometry cancels from this local time constant."
      ],
      "points": 1,
      "source": "L03 PDF 8"
    },
    {
      "id": "L03-compartment-balance",
      "sectionId": "compartments",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Identify the three current paths in the source compartment and explain what can be omitted at steady state. Why does omitting the resting battery not assert an absolute resting voltage of zero?",
      "hints": [
        {
          "body": "Separate zero derivative from zero voltage."
        },
        {
          "body": "Use the source steady circuit and the definition of rest-relative voltage."
        }
      ],
      "markScheme": [
        {
          "text": "Axial resistances link compartments; membrane resistance leaks and capacitance stores charge."
        },
        {
          "text": "At steady voltage capacitive current vanishes but leak and axial current can remain."
        },
        {
          "text": "Referencing voltage to rest removes the constant resting offset."
        },
        {
          "text": "Kirchhoff current balance still applies at each node."
        }
      ],
      "modelAnswer": [
        "Axial resistances link compartments; membrane resistance leaks and capacitance stores charge.",
        "At steady voltage capacitive current vanishes but leak and axial current can remain.",
        "Referencing voltage to rest removes the constant resting offset.",
        "Kirchhoff current balance still applies at each node."
      ],
      "points": 1,
      "source": "L03 PDF 11",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 3, PDF page 11. Source figure with original labels and axes retained.",
        "fallbackAlt": "Lecture 3, PDF page 11. Source figure with original labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L03/compartments.webp', import.meta.url).href,
          "alt": "Lecture 3, PDF page 11. Source figure with original labels and axes retained.",
          "aspect": 1.4111111111111112,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L03-geometry-derive",
      "sectionId": "geometry",
      "difficulty": "medium",
      "type": "derive",
      "prompt": "Derive the three per-length cable parameters from cross-section $\\pi a^2$ and lateral area $2\\pi a\\ell$. Explain their different dependence on radius and length.",
      "hints": [
        {
          "body": "Treat cross-section and surface area as different areas."
        },
        {
          "body": "Write total segment properties before dividing or multiplying by length."
        }
      ],
      "markScheme": [
        {
          "text": "$R_{ax}=R_i\\ell/(\\pi a^2)$ gives $r_i=R_i/(\\pi a^2)$."
        },
        {
          "text": "$R_{seg}=R_m/(2\\pi a\\ell)$ gives $r_m=R_m/(2\\pi a)$."
        },
        {
          "text": "$C_{seg}=C_m2\\pi a\\ell$ gives $c_m=C_m2\\pi a$."
        },
        {
          "text": "Axial resistance scales with length; transmembrane resistance scales inversely with length."
        }
      ],
      "modelAnswer": [
        "$R_{ax}=R_i\\ell/(\\pi a^2)$ gives $r_i=R_i/(\\pi a^2)$.",
        "$R_{seg}=R_m/(2\\pi a\\ell)$ gives $r_m=R_m/(2\\pi a)$.",
        "$C_{seg}=C_m2\\pi a\\ell$ gives $c_m=C_m2\\pi a$.",
        "Axial resistance scales with length; transmembrane resistance scales inversely with length."
      ],
      "points": 1,
      "source": "L03 PDF 12"
    },
    {
      "id": "L03-conservation-derive",
      "sectionId": "conservation",
      "difficulty": "medium",
      "type": "derive",
      "prompt": "Combine axial Ohm’s law and current conservation to obtain $\\partial_{x}^2V=r_i i_m$. State the sign convention and uniform-parameter assumption.",
      "hints": [
        {
          "body": "Differentiate the voltage relation once."
        },
        {
          "body": "Substitute the negative membrane-current gradient after taking the derivative."
        }
      ],
      "markScheme": [
        {
          "text": "Start $\\partial_{x}V=-r_i i_i$ and $\\partial_{x} i_i=-i_m$."
        },
        {
          "text": "Uniform $r_i$ permits $\\partial_{x}^2V=-r_i\\partial_{x}i_i=r_i i_m$."
        },
        {
          "text": "Positive axial current is in increasing position; positive membrane current is outward."
        }
      ],
      "modelAnswer": [
        "Start $\\partial_{x}V=-r_i i_i$ and $\\partial_{x} i_i=-i_m$.",
        "Uniform $r_i$ permits $\\partial_{x}^2V=-r_i\\partial_{x}i_i=r_i i_m$.",
        "Positive axial current is in increasing position; positive membrane current is outward."
      ],
      "points": 1,
      "source": "L03 PDF 13"
    },
    {
      "id": "L03-length-equality",
      "sectionId": "length",
      "difficulty": "medium",
      "type": "derive",
      "prompt": "Derive the length at which axial resistance $r_i\\ell$ equals membrane resistance $r_m/\\ell$. Explain why equating $r_i$ directly to $r_m$ is invalid.",
      "hints": [
        {
          "body": "Write total segment resistances before equating them."
        },
        {
          "body": "Multiply both sides by segment length, then take the positive root."
        }
      ],
      "markScheme": [
        {
          "text": "$r_i\\ell=r_m/\\ell$ gives $\\ell^2=r_m/r_i$ and $\\ell=\\lambda$."
        },
        {
          "text": "Both segment resistances have units of resistance; the per-length parameters do not have the same dimensions."
        },
        {
          "text": "This equality identifies a spatial scale, not complete loss of signal at that distance."
        }
      ],
      "modelAnswer": [
        "$r_i\\ell=r_m/\\ell$ gives $\\ell^2=r_m/r_i$ and $\\ell=\\lambda$.",
        "Both segment resistances have units of resistance; the per-length parameters do not have the same dimensions.",
        "This equality identifies a spatial scale, not complete loss of signal at that distance."
      ],
      "points": 1,
      "source": "L03 PDF 14"
    },
    {
      "id": "L03-external-resistance",
      "sectionId": "length",
      "difficulty": "medium",
      "type": "multiStepCalc",
      "prompt": "A cable has $r_m=8\\times10^4\\,\\Omega\\,\\text{m}$ and $r_i=8\\times10^{10}\\,\\Omega/\\text{m}$. Compare its length constant with negligible external resistance and with $r_o=3r_i$. For a $0.5\\,\\text{mm}$ site find the fraction of the same steady origin response in both cases.",
      "stages": [
        {
          "title": "No external resistance",
          "answer": {
            "value": 0.001,
            "unit": "m",
            "tolerance": 3e-06,
            "verification": {
              "relation": "cableLength",
              "inputs": {
                "rm": 80000.0,
                "ri": 80000000000.0
              },
              "displayScale": 1
            }
          },
          "tex": "\\lambda_0=\\sqrt{r_m/r_i}",
          "modelAnswer": [
            "The initial cable scale ignores external voltage drop.",
            "$\\lambda_0=\\sqrt{r_m/r_i}$",
            "$0.001\\,\\text{m}$"
          ]
        },
        {
          "title": "With external resistance",
          "answer": {
            "value": 0.0005,
            "unit": "m",
            "tolerance": 1.5e-06,
            "verification": {
              "relation": "cableLength",
              "inputs": {
                "rm": 80000.0,
                "ri": 80000000000.0,
                "ro": 240000000000.0
              },
              "displayScale": 1
            }
          },
          "tex": "\\lambda_1=\\sqrt{r_m/(r_i+r_o)}",
          "modelAnswer": [
            "Add the two longitudinal resistance parameters before taking the root.",
            "$\\lambda_1=\\sqrt{r_m/(r_i+r_o)}$",
            "$0.0005\\,\\text{m}$"
          ]
        },
        {
          "title": "Initial fraction",
          "answer": {
            "value": 0.6065306597126334,
            "unit": "",
            "tolerance": 0.0018195919791379003,
            "verification": {
              "relation": "cableDecay",
              "inputs": {
                "v": 1,
                "x": 0.0005,
                "lambda": 0.001
              },
              "displayScale": 1
            }
          },
          "tex": "f_0=e^{-x/\\lambda_0}",
          "modelAnswer": [
            "Use the same physical separation.",
            "$f_0=e^{-x/\\lambda_0}$",
            "$0.60653066$"
          ]
        },
        {
          "title": "New fraction",
          "answer": {
            "value": 0.36787944117144233,
            "unit": "",
            "tolerance": 0.001103638323514327,
            "verification": {
              "relation": "cableDecay",
              "inputs": {
                "v": 1,
                "x": 0.0005,
                "lambda": 0.0005
              },
              "displayScale": 1
            }
          },
          "tex": "f_1=e^{-x/\\lambda_1}",
          "modelAnswer": [
            "A shorter scale increases attenuation.",
            "$f_1=e^{-x/\\lambda_1}$",
            "$0.36787944$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use the external-resistance variant of the length relation."
        },
        {
          "body": "Start with total longitudinal resistance equal to internal plus external; keep source voltage fixed when comparing fractions."
        }
      ],
      "modelAnswer": [
        "The initial cable scale ignores external voltage drop.",
        "Add the two longitudinal resistance parameters before taking the root.",
        "Use the same physical separation.",
        "A shorter scale increases attenuation."
      ],
      "points": 1,
      "source": "L03 PDF 14"
    },
    {
      "id": "L03-pulse-interpret",
      "sectionId": "pulse",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Read the source current and voltage panels. Identify the controlled and measured variables, order the voltage traces by distance and explain the rounded distant responses. Do not infer exact values from the low-resolution curves.",
      "hints": [
        {
          "body": "Align the time axes and use the distance labels."
        },
        {
          "body": "Compare onset, rise and plateau separately."
        }
      ],
      "markScheme": [
        {
          "text": "The current pulse is supplied; voltage is recorded at indicated positions."
        },
        {
          "text": "Greater distance gives smaller voltage response and delayed, rounded rise."
        },
        {
          "text": "Axial resistance, membrane leakage and capacitive charging cause the filtering."
        },
        {
          "text": "These are source traces, not output generated by this site."
        }
      ],
      "modelAnswer": [
        "The current pulse is supplied; voltage is recorded at indicated positions.",
        "Greater distance gives smaller voltage response and delayed, rounded rise.",
        "Axial resistance, membrane leakage and capacitive charging cause the filtering.",
        "These are source traces, not output generated by this site."
      ],
      "points": 1,
      "source": "L03 PDF 15",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 3, PDF page 15. Source figure with original labels and axes retained.",
        "fallbackAlt": "Lecture 3, PDF page 15. Source figure with original labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L03/pulse.webp', import.meta.url).href,
          "alt": "Lecture 3, PDF page 15. Source figure with original labels and axes retained.",
          "aspect": 1.420824295010846,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L03-scaling-predict",
      "sectionId": "scaling",
      "difficulty": "medium",
      "type": "predict",
      "prompt": "Predict the separate effects of increasing $R_m$, decreasing $R_i$, and increasing radius on the source attenuation profiles. Explain why radius does not enter the local membrane time constant.",
      "hints": [
        {
          "body": "Compare the radius powers in the two cable resistances."
        },
        {
          "body": "Use the product of the membrane parameters for timing, and their ratio for distance."
        }
      ],
      "markScheme": [
        {
          "text": "Increasing $R_m$ reduces leak and increases $\\lambda$; decreasing $R_i$ eases axial flow and also increases $\\lambda$."
        },
        {
          "text": "Increasing radius increases $\\lambda$ because axial resistance falls quadratically while membrane resistance-length falls linearly."
        },
        {
          "text": "In $r_mc_m$, inverse circumference and circumference cancel to give $R_mC_m$."
        }
      ],
      "modelAnswer": [
        "Increasing $R_m$ reduces leak and increases $\\lambda$; decreasing $R_i$ eases axial flow and also increases $\\lambda$.",
        "Increasing radius increases $\\lambda$ because axial resistance falls quadratically while membrane resistance-length falls linearly.",
        "In $r_mc_m$, inverse circumference and circumference cancel to give $R_mC_m$."
      ],
      "points": 1,
      "source": "L03 PDF 17",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 3, PDF page 17. Source figure with original labels and axes retained.",
        "fallbackAlt": "Lecture 3, PDF page 17. Source figure with original labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L03/scaling.webp', import.meta.url).href,
          "alt": "Lecture 3, PDF page 17. Source figure with original labels and axes retained.",
          "aspect": 0.8885496183206106,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L03-insulation-factors",
      "sectionId": "myelin",
      "difficulty": "medium",
      "type": "multiStepCalc",
      "prompt": "An idealized insulating change multiplies specific membrane resistance by $9$ and capacitance by $1/18$, with geometry and intracellular resistivity fixed. Initially $\\lambda=0.5\\,\\text{mm}$ and $\\tau_m=24\\,\\text{ms}$. Find both new scales, then compare attenuation at $1\\,\\text{mm}$ for the same origin voltage.",
      "stages": [
        {
          "title": "New length",
          "answer": {
            "value": 0.0015,
            "unit": "m",
            "tolerance": 4.5e-06,
            "verification": {
              "relation": "cableLength",
              "inputs": {
                "rm": 225000.0,
                "ri": 100000000000.0
              },
              "displayScale": 1
            }
          },
          "tex": "\\lambda_{new}=\\lambda_{old}\\sqrt{9}",
          "modelAnswer": [
            "Length grows with the square root of resistance.",
            "$\\lambda_{new}=\\lambda_{old}\\sqrt{9}$",
            "$0.0015\\,\\text{m}$"
          ]
        },
        {
          "title": "New time",
          "answer": {
            "value": 0.012,
            "unit": "s",
            "tolerance": 3.6e-05,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 0.024,
                "b": 0.5
              },
              "displayScale": 1
            }
          },
          "tex": "\\tau_{new}=\\tau_{old}(9)(1/18)",
          "modelAnswer": [
            "The product decreases for these specified factors.",
            "$\\tau_{new}=\\tau_{old}(9)(1/18)$",
            "$0.012\\,\\text{s}$"
          ]
        },
        {
          "title": "Old fraction",
          "answer": {
            "value": 0.1353352832366127,
            "unit": "",
            "tolerance": 0.0004060058497098381,
            "verification": {
              "relation": "cableDecay",
              "inputs": {
                "v": 1,
                "x": 0.001,
                "lambda": 0.0005
              },
              "displayScale": 1
            }
          },
          "tex": "f_{old}=e^{-x/\\lambda_{old}}",
          "modelAnswer": [
            "A fraction is dimensionless.",
            "$f_{old}=e^{-x/\\lambda_{old}}$",
            "$0.13533528$"
          ]
        },
        {
          "title": "New fraction",
          "answer": {
            "value": 0.513417119032592,
            "unit": "",
            "tolerance": 0.0015402513570977761,
            "verification": {
              "relation": "cableDecay",
              "inputs": {
                "v": 1,
                "x": 0.001,
                "lambda": 0.0015
              },
              "displayScale": 1
            }
          },
          "tex": "f_{new}=e^{-x/\\lambda_{new}}",
          "modelAnswer": [
            "Less attenuation follows from the larger spatial scale.",
            "$f_{new}=e^{-x/\\lambda_{new}}$",
            "$0.51341712$"
          ]
        },
        {
          "title": "Interpretation",
          "choices": [
            {
              "label": "More spatial spread and faster local relaxation"
            },
            {
              "label": "Less spatial spread and slower local relaxation"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Both follow here from the specified changes, not from insulation alone."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use square-root scaling for distance and product scaling for time."
        },
        {
          "body": "Multiply the initial length by the square root of the resistance factor, and the initial time by both factors."
        }
      ],
      "modelAnswer": [
        "Length grows with the square root of resistance.",
        "The product decreases for these specified factors.",
        "A fraction is dimensionless.",
        "Less attenuation follows from the larger spatial scale.",
        "Both follow here from the specified changes, not from insulation alone."
      ],
      "points": 1,
      "source": "L03 PDF 20"
    },
    {
      "id": "L03-boundary-compare",
      "sectionId": "boundaries",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain why dendrites short relative to their length constant preserve signals better. Distinguish amplitude preservation from temporal resolution, and state why a finite end needs new boundary information.",
      "hints": [
        {
          "body": "Consider plateau size and response shape separately."
        },
        {
          "body": "Compare short and long paths before applying an infinite-cable expression."
        }
      ],
      "markScheme": [
        {
          "text": "Small electrotonic distance gives less passive attenuation."
        },
        {
          "text": "Capacitive and axial filtering delay and broaden rapid input changes."
        },
        {
          "text": "Temporal resolution concerns waveform timing/bandwidth rather than plateau amplitude alone."
        },
        {
          "text": "A finite endpoint changes the allowed spatial solution; boundary conditions must be stated."
        }
      ],
      "modelAnswer": [
        "Small electrotonic distance gives less passive attenuation.",
        "Capacitive and axial filtering delay and broaden rapid input changes.",
        "Temporal resolution concerns waveform timing/bandwidth rather than plateau amplitude alone.",
        "A finite endpoint changes the allowed spatial solution; boundary conditions must be stated."
      ],
      "points": 1,
      "source": "L03 PDF 21"
    },
    {
      "id": "L03-erf-recognize",
      "sectionId": "normalization",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Use the source error-function plot to distinguish erf from erfc, their relation, symmetry, and limiting values. Explain why the transient solution needs both normalized distance and normalized time.",
      "hints": [
        {
          "body": "Compare the two labelled curves at the origin and far right."
        },
        {
          "body": "Use the complementary identity to infer the falling curve."
        }
      ],
      "markScheme": [
        {
          "text": "$\\operatorname{erf}$ rises from its negative limit to its positive limit, passing through zero; it is odd."
        },
        {
          "text": "$\\operatorname{erfc}=1-\\operatorname{erf}$ falls, equals unity at zero and approaches zero at positive infinity."
        },
        {
          "text": "Its negative-infinity limit is two; $\\operatorname{erf}$ has positive-infinity limit one."
        },
        {
          "text": "Distance determines spatial attenuation while time determines transient development."
        }
      ],
      "modelAnswer": [
        "$\\operatorname{erf}$ rises from its negative limit to its positive limit, passing through zero; it is odd.",
        "$\\operatorname{erfc}=1-\\operatorname{erf}$ falls, equals unity at zero and approaches zero at positive infinity.",
        "Its negative-infinity limit is two; $\\operatorname{erf}$ has positive-infinity limit one.",
        "Distance determines spatial attenuation while time determines transient development."
      ],
      "points": 1,
      "source": "L03 PDF 22",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 3, PDF page 22. Source figure with original labels and axes retained.",
        "fallbackAlt": "Lecture 3, PDF page 22. Source figure with original labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L03/normalization.webp', import.meta.url).href,
          "alt": "Lecture 3, PDF page 22. Source figure with original labels and axes retained.",
          "aspect": 1.6181384248210025,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L03-responses-protocol",
      "sectionId": "responses",
      "difficulty": "hard",
      "type": "predict",
      "prompt": "Design a two-electrode test of the passive approximation. Explain what to compare across pulse amplitudes and what observation would invalidate it without assuming a specific channel model.",
      "hints": [
        {
          "body": "Think about linear scaling and the experimental controls."
        },
        {
          "body": "Compare normalized traces at fixed recording position, then increase pulse magnitude."
        }
      ],
      "markScheme": [
        {
          "text": "Inject small positive and negative steps around a stable baseline and record voltage separately."
        },
        {
          "text": "Compare proportional voltage increments and similar response shape under scaled current."
        },
        {
          "text": "Keep location and duration fixed and avoid drift in resting state."
        },
        {
          "text": "Spiking or amplitude-dependent shape/resistance indicates departure from the linear approximation."
        }
      ],
      "modelAnswer": [
        "Inject small positive and negative steps around a stable baseline and record voltage separately.",
        "Compare proportional voltage increments and similar response shape under scaled current.",
        "Keep location and duration fixed and avoid drift in resting state.",
        "Spiking or amplitude-dependent shape/resistance indicates departure from the linear approximation."
      ],
      "points": 1,
      "source": "L03 PDF 3"
    },
    {
      "id": "L03-size-control",
      "sectionId": "input",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "Two isopotential spheres have the same $R_m=2\\,\\Omega\\,\\text{m}^2$ and $C_m=0.01\\,\\text{F/m}^2$. B has twice A’s radius. A’s input resistance is $800\\,\\text{M}\\Omega$. For a $5\\,\\text{mV}$ steady increment in B, find its input resistance and required current; compare local time constants and explain why cable spread does not follow from this sphere model.",
      "stages": [
        {
          "title": "B input resistance",
          "answer": {
            "value": 200,
            "unit": "Mohm",
            "tolerance": 0.6,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 800000000.0,
                "b": 4
              },
              "displayScale": 1000000.0
            }
          },
          "tex": "R_{input,B}=R_{input,A}/2^2",
          "modelAnswer": [
            "Area increases quadratically.",
            "$R_{input,B}=R_{input,A}/2^2$",
            "$200\\,\\text{Mohm}$"
          ]
        },
        {
          "title": "Required injection",
          "answer": {
            "value": 25,
            "unit": "pA",
            "tolerance": 0.075,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 0.005,
                "b": 200000000.0
              },
              "displayScale": 1e-12
            }
          },
          "tex": "I_B=V_{\\infty}/R_{input,B}",
          "modelAnswer": [
            "Use the target increment, not absolute resting voltage.",
            "$I_B=V_{\\infty}/R_{input,B}$",
            "$25\\,\\text{pA}$"
          ]
        },
        {
          "title": "Common time constant",
          "answer": {
            "value": 20,
            "unit": "ms",
            "tolerance": 0.06,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 2,
                "b": 0.01
              },
              "displayScale": 0.001
            }
          },
          "tex": "\\tau_m=R_mC_m",
          "modelAnswer": [
            "Specific parameters are unchanged.",
            "$\\tau_m=R_mC_m$",
            "$20\\,\\text{ms}$"
          ]
        },
        {
          "title": "Spatial limitation",
          "choices": [
            {
              "label": "Isopotential spheres have no resolved longitudinal attenuation"
            },
            {
              "label": "Input resistance directly supplies a cable length constant"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The one-voltage sphere cannot resolve a spatial decay profile."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use sphere area scaling, then steady Ohm’s law."
        },
        {
          "body": "Double radius means fourfold area; divide A’s input resistance by four before solving the current."
        }
      ],
      "modelAnswer": [
        "Area increases quadratically.",
        "Use the target increment, not absolute resting voltage.",
        "Specific parameters are unchanged.",
        "The one-voltage sphere cannot resolve a spatial decay profile."
      ],
      "points": 1,
      "source": "L03 PDF 8"
    },
    {
      "id": "L03-assumptions-fail",
      "sectionId": "assumptions",
      "difficulty": "hard",
      "type": "written",
      "prompt": "A tapered dendrite develops an amplitude-dependent response and terminates near the recording site. Explain three assumptions that have failed and which conclusions from the infinite uniform passive cable need reconsideration.",
      "hints": [
        {
          "body": "Check geometry, membrane behavior and boundary separately."
        },
        {
          "body": "Ask which assumption underlies each coefficient and each solution shape."
        }
      ],
      "markScheme": [
        {
          "text": "Taper violates constant radius, changing local axial and membrane parameters."
        },
        {
          "text": "Amplitude dependence may violate passive constant resistance and linear superposition."
        },
        {
          "text": "A nearby termination violates infinite-cable boundary conditions."
        },
        {
          "text": "The simple symmetric exponential and a single uniform length constant may no longer describe this setup."
        }
      ],
      "modelAnswer": [
        "Taper violates constant radius, changing local axial and membrane parameters.",
        "Amplitude dependence may violate passive constant resistance and linear superposition.",
        "A nearby termination violates infinite-cable boundary conditions.",
        "The simple symmetric exponential and a single uniform length constant may no longer describe this setup."
      ],
      "points": 1,
      "source": "L03 PDF 10"
    },
    {
      "id": "L03-equation-derive",
      "sectionId": "equation",
      "difficulty": "hard",
      "type": "derive",
      "prompt": "Derive the cable equation from the two axial relations and membrane RC balance. Then rewrite with specific parameters. Explain why setting the spatial derivative to zero recovers a local RC equation.",
      "hints": [
        {
          "body": "Eliminate axial current, then collect membrane terms."
        },
        {
          "body": "Use the per-length equation before substituting the three geometric definitions."
        }
      ],
      "markScheme": [
        {
          "text": "$\\partial_{x}V=-r_i i_i$, $\\partial_{x} i_i=-i_m$, so $\\partial_{x}^2V=r_i i_m$."
        },
        {
          "text": "Insert $i_m=c_m\\partial_tV+V/r_m$."
        },
        {
          "text": "Multiply by $r_m/r_i$ to get $\\lambda^2\\partial_{x}^2V=\\tau_m\\partial_tV+V$, with $\\lambda^2=r_m/r_i$ and $\\tau_m=r_mc_m$."
        },
        {
          "text": "Substitute geometry to obtain $a\\partial_{x}^2V/(2R_i)=C_m\\partial_tV+V/R_m$."
        },
        {
          "text": "Without spatial gradients, the unforced local voltage relaxes through its membrane RC pathways."
        }
      ],
      "modelAnswer": [
        "$\\partial_{x}V=-r_i i_i$, $\\partial_{x} i_i=-i_m$, so $\\partial_{x}^2V=r_i i_m$.",
        "Insert $i_m=c_m\\partial_tV+V/r_m$.",
        "Multiply by $r_m/r_i$ to get $\\lambda^2\\partial_{x}^2V=\\tau_m\\partial_tV+V$, with $\\lambda^2=r_m/r_i$ and $\\tau_m=r_mc_m$.",
        "Substitute geometry to obtain $a\\partial_{x}^2V/(2R_i)=C_m\\partial_tV+V/R_m$.",
        "Without spatial gradients, the unforced local voltage relaxes through its membrane RC pathways."
      ],
      "points": 1,
      "source": "L03 PDF 14"
    },
    {
      "id": "L03-curvature-inference",
      "sectionId": "equation",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "At a source-free cable location, $V=6\\,\\text{mV}$ is increasing at $0.15\\,\\text{V/s}$. The local time constant is $20\\,\\text{ms}$ and length constant $0.75\\,\\text{mm}$. Infer voltage curvature. Predict the instantaneous slope if axial redistribution were removed while the same local voltage remained.",
      "stages": [
        {
          "title": "Rearrange",
          "choices": [
            {
              "label": "Curvature equals time-slope term plus voltage, divided by length squared"
            },
            {
              "label": "Curvature equals voltage minus time-slope term, divided by time"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Rearrange the source-free cable equation, keeping dimensions."
          ]
        },
        {
          "title": "Time-slope term",
          "answer": {
            "value": 0.003,
            "unit": "V",
            "tolerance": 9e-06,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 0.02,
                "b": 0.15
              },
              "displayScale": 1
            }
          },
          "tex": "\\tau_m\\partial_tV",
          "modelAnswer": [
            "This contribution has voltage units.",
            "$\\tau_m\\partial_tV$",
            "$0.003\\,\\text{V}$"
          ]
        },
        {
          "title": "Required curvature",
          "answer": {
            "value": 15999.999999999998,
            "unit": "V/m2",
            "tolerance": 47.99999999999999,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 0.009,
                "b": 5.625e-07
              },
              "displayScale": 1
            }
          },
          "tex": "\\partial_{x}^2V=(\\tau_m\\partial_tV+V)/\\lambda^2",
          "modelAnswer": [
            "Axial influx supports the rising local increment.",
            "$\\partial_{x}^2V=(\\tau_m\\partial_tV+V)/\\lambda^2$",
            "$16000\\,\\text{V/m2}$"
          ]
        },
        {
          "title": "Slope without axial support",
          "answer": {
            "value": -0.3,
            "unit": "V/s",
            "tolerance": 0.0009,
            "verification": {
              "relation": "cableEvolution",
              "inputs": {
                "lambda": 0.00075,
                "curvature": 0,
                "v": 0.006,
                "tau": 0.02
              },
              "displayScale": 1
            }
          },
          "tex": "\\partial_tV=-V/\\tau_m",
          "modelAnswer": [
            "Removing axial support makes the local positive increment decay.",
            "$\\partial_tV=-V/\\tau_m$",
            "$-0.3\\,\\text{V/s}$"
          ]
        },
        {
          "title": "Interpretation",
          "choices": [
            {
              "label": "Rising voltage requires axial support in this source-free example"
            },
            {
              "label": "Rising voltage proves a negative passive membrane resistance"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The spatial term supplies the current that local leak alone cannot provide."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use the source-free cable balance, then remove its spatial term."
        },
        {
          "body": "Start by multiplying the measured slope by the time constant; add the local voltage and divide by length squared."
        }
      ],
      "modelAnswer": [
        "Rearrange the source-free cable equation, keeping dimensions.",
        "This contribution has voltage units.",
        "Axial influx supports the rising local increment.",
        "Removing axial support makes the local positive increment decay.",
        "The spatial term supplies the current that local leak alone cannot provide."
      ],
      "points": 1,
      "source": "L03 PDF 14"
    },
    {
      "id": "L03-forcing-units",
      "sectionId": "pulse",
      "difficulty": "hard",
      "type": "written",
      "prompt": "The slide writes a forcing term $-r_m i_i$ although $i_i$ elsewhere means axial current. Use dimensions to distinguish a distributed injection from a point injection. Explain why treating an ampere value as current per length is wrong.",
      "hints": [
        {
          "body": "Each term of the normalized equation must have voltage units."
        },
        {
          "body": "Compare the dimensions of total current and current per cable length."
        }
      ],
      "markScheme": [
        {
          "text": "$r_m$ has units $\\Omega\\,\\text{m}$, so its source factor must be current per length to yield voltage."
        },
        {
          "text": "An axial current in amperes cannot be inserted unchanged as that distributed density."
        },
        {
          "text": "A localized electrode injection is represented by a source at one location, or a jump of axial current."
        },
        {
          "text": "In an infinite symmetric cable that supplied current splits into the two directions."
        }
      ],
      "modelAnswer": [
        "$r_m$ has units $\\Omega\\,\\text{m}$, so its source factor must be current per length to yield voltage.",
        "An axial current in amperes cannot be inserted unchanged as that distributed density.",
        "A localized electrode injection is represented by a source at one location, or a jump of axial current.",
        "In an infinite symmetric cable that supplied current splits into the two directions."
      ],
      "points": 1,
      "source": "L03 PDF 15"
    },
    {
      "id": "L03-infer-length",
      "sectionId": "decay",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "In an ideal infinite passive cable, steady increments at the injection site and $0.6\\,\\text{mm}$ away are $12$ and $4\\,\\text{mV}$. Infer the length constant, then predict the signed increment at $-1.2\\,\\text{mm}$. Explain the symmetry assumption.",
      "stages": [
        {
          "title": "Select relation",
          "choices": [
            {
              "label": "Use spatial exponential attenuation"
            },
            {
              "label": "Use temporal capacitor charging"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The measurements differ in position at steady state."
          ]
        },
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Distance",
              "answer": {
                "value": 0.0006,
                "unit": "m",
                "tolerance": 5.999999999999999e-10,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.0006,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Measured fraction",
              "answer": {
                "value": 0.3333333333333333,
                "unit": "",
                "tolerance": 3.333333333333333e-07,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.3333333333333333,
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
          "title": "Infer length",
          "answer": {
            "value": 0.0005461435359761024,
            "unit": "m",
            "tolerance": 1.6384306079283073e-06,
            "verification": {
              "relation": "cableInverse",
              "inputs": {
                "x": 0.0006,
                "fraction": 0.3333333333333333
              },
              "displayScale": 1
            }
          },
          "tex": "\\lambda=-|x|/\\ln[V(x)/V_0]",
          "modelAnswer": [
            "The fraction is positive and below unity, so length is positive.",
            "$\\lambda=-|x|/\\ln[V(x)/V_0]$",
            "$0.00054614354\\,\\text{m}$"
          ]
        },
        {
          "title": "Predict opposite side",
          "answer": {
            "value": 0.0013333333333333333,
            "unit": "V",
            "tolerance": 4e-06,
            "verification": {
              "relation": "cableDecay",
              "inputs": {
                "v": 0.012,
                "x": -0.0012,
                "lambda": 0.0005461435359761024
              },
              "displayScale": 1
            }
          },
          "tex": "V(-1.2\\,\\text{mm})=V_0e^{-|x|/\\lambda}",
          "modelAnswer": [
            "Use absolute distance, not a growing exponential on the negative side.",
            "$V(-1.2\\,\\text{mm})=V_0e^{-|x|/\\lambda}$",
            "$0.0013333333\\,\\text{V}$"
          ]
        },
        {
          "title": "Boundary assumption",
          "choices": [
            {
              "label": "Symmetric uniform infinite cable"
            },
            {
              "label": "A sealed end at the distant electrode"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The supplied infinite-cable assumptions justify the symmetric profile."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use a voltage ratio to eliminate the injection amplitude."
        },
        {
          "body": "Start with the distant-to-origin ratio, take its natural logarithm, solve for length, then use absolute distance."
        }
      ],
      "modelAnswer": [
        "The measurements differ in position at steady state.",
        "Convert each stated quantity to the requested unit before evaluating.",
        "The fraction is positive and below unity, so length is positive.",
        "Use absolute distance, not a growing exponential on the negative side.",
        "The supplied infinite-cable assumptions justify the symmetric profile."
      ],
      "points": 1,
      "source": "L03 PDF 16"
    },
    {
      "id": "L03-geometry-chain",
      "sectionId": "distance",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "A uniform dendrite has radius $1.5\\,\\mu\\text{m}$, $R_m=3\\,\\Omega\\,\\text{m}^2$ and $R_i=1.5\\,\\Omega\\,\\text{m}$. External resistance is negligible. Find its per-length resistances, length constant and electrotonic distance for a site $1.2\\,\\text{mm}$ away; predict attenuation of a $9\\,\\text{mV}$ origin increment.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Radius",
              "answer": {
                "value": 1.5e-06,
                "unit": "m",
                "tolerance": 1.5e-12,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1.5e-06,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Distance",
              "answer": {
                "value": 0.0012,
                "unit": "m",
                "tolerance": 1.1999999999999998e-09,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.0012,
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
          "title": "Axial parameter",
          "answer": {
            "value": 212206590789.19376,
            "unit": "ohm/m",
            "tolerance": 636619772.3675812,
            "verification": {
              "relation": "cableAxial",
              "inputs": {
                "rho": 1.5,
                "radius": 1.5e-06
              },
              "displayScale": 1
            }
          },
          "tex": "r_i=R_i/(\\pi a^2)",
          "modelAnswer": [
            "Square the radius for core cross-section.",
            "$r_i=R_i/(\\pi a^2)$",
            "$2.1220659e+11\\,\\text{ohm/m}$"
          ]
        },
        {
          "title": "Membrane parameter",
          "answer": {
            "value": 318309.8861837907,
            "unit": "ohm*m",
            "tolerance": 954.9296585513721,
            "verification": {
              "relation": "cableMembrane",
              "inputs": {
                "specific": 3,
                "radius": 1.5e-06
              },
              "displayScale": 1
            }
          },
          "tex": "r_m=R_m/(2\\pi a)",
          "modelAnswer": [
            "Use circumference for membrane area per length.",
            "$r_m=R_m/(2\\pi a)$",
            "$318309.89\\,\\text{ohm*m}$"
          ]
        },
        {
          "title": "Length constant",
          "answer": {
            "value": 0.0012247448713915891,
            "unit": "m",
            "tolerance": 3.6742346141747674e-06,
            "verification": {
              "relation": "cableLength",
              "inputs": {
                "rm": 318309.8861837907,
                "ri": 212206590789.19376
              },
              "displayScale": 1
            }
          },
          "tex": "\\lambda=\\sqrt{r_m/r_i}",
          "modelAnswer": [
            "Dimensions inside the root are length squared.",
            "$\\lambda=\\sqrt{r_m/r_i}$",
            "$0.0012247449\\,\\text{m}$"
          ]
        },
        {
          "title": "Electrotonic distance",
          "answer": {
            "value": 0.9797958971132711,
            "unit": "",
            "tolerance": 0.0029393876913398134,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 0.0012,
                "b": 0.0012247448713915891
              },
              "displayScale": 1
            }
          },
          "tex": "X=x/\\lambda",
          "modelAnswer": [
            "Use consistent distance units.",
            "$X=x/\\lambda$",
            "$0.9797959$"
          ]
        },
        {
          "title": "Distant voltage",
          "answer": {
            "value": 0.00337848937873183,
            "unit": "V",
            "tolerance": 1.013546813619549e-05,
            "verification": {
              "relation": "cableDecay",
              "inputs": {
                "v": 0.009,
                "x": 0.0012,
                "lambda": 0.0012247448713915891
              },
              "displayScale": 1
            }
          },
          "tex": "V=V_0e^{-X}",
          "modelAnswer": [
            "The positive response is smaller than at the source.",
            "$V=V_0e^{-X}$",
            "$0.0033784894\\,\\text{V}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Build the geometry-dependent parameters before solving spatial attenuation."
        },
        {
          "body": "Start with radius in metres; use cross-section for axial resistance and circumference for membrane resistance."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Square the radius for core cross-section.",
        "Use circumference for membrane area per length.",
        "Dimensions inside the root are length squared.",
        "Use consistent distance units.",
        "The positive response is smaller than at the source."
      ],
      "points": 1,
      "source": "L03 PDF 18"
    },
    {
      "id": "L03-time-versus-distance",
      "sectionId": "time",
      "difficulty": "hard",
      "type": "written",
      "prompt": "A student fits the distant cable response to a single local RC exponential and concludes that membrane capacitance changes with recording distance. Explain why that inference is not established, and propose a comparison that distinguishes spatial filtering from changed material parameters.",
      "hints": [
        {
          "body": "Separate a membrane property from a waveform-fitting parameter."
        },
        {
          "body": "The source pulse traces change with distance without requiring different membrane material."
        }
      ],
      "markScheme": [
        {
          "text": "A distant response combines axial redistribution and local storage/leak."
        },
        {
          "text": "A local RC time constant is not a complete description of a spatial cable transient."
        },
        {
          "text": "Compare responses at multiple distances with the same stimulus and known geometry."
        },
        {
          "text": "Fit the spatial cable model and keep specific material parameters fixed before asserting a capacitance change."
        }
      ],
      "modelAnswer": [
        "A distant response combines axial redistribution and local storage/leak.",
        "A local RC time constant is not a complete description of a spatial cable transient.",
        "Compare responses at multiple distances with the same stimulus and known geometry.",
        "Fit the spatial cable model and keep specific material parameters fixed before asserting a capacitance change."
      ],
      "points": 1,
      "source": "L03 PDF 19",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 3, PDF page 15. Source figure with original labels and axes retained.",
        "fallbackAlt": "Lecture 3, PDF page 15. Source figure with original labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L03/pulse.webp', import.meta.url).href,
          "alt": "Lecture 3, PDF page 15. Source figure with original labels and axes retained.",
          "aspect": 1.420824295010846,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L03-myelin-ambiguity",
      "sectionId": "myelin",
      "difficulty": "hard",
      "type": "written",
      "prompt": "Two proposed insulating treatments both raise resistance and lower capacitance. Explain why you can predict the direction of the length change but cannot rank their local time constants without factors. Also explain why the source curve labelled “large-diameter unmyelinated neuron or small myelinated neuron” does not uniquely identify myelin as the cause.",
      "hints": [
        {
          "body": "Keep the product and ratio dependencies separate."
        },
        {
          "body": "Inspect the size labels in the source before attributing all differences to insulation."
        }
      ],
      "markScheme": [
        {
          "text": "At fixed geometry and axial resistivity, higher membrane resistance increases length constant."
        },
        {
          "text": "Opposing resistance and capacitance changes leave the time product undetermined without magnitudes."
        },
        {
          "text": "Radius also affects the spatial scale; either larger unmyelinated diameter or myelination can explain the broader source profile."
        },
        {
          "text": "A controlled comparison must specify or match geometry and all effective passive parameters."
        }
      ],
      "modelAnswer": [
        "At fixed geometry and axial resistivity, higher membrane resistance increases length constant.",
        "Opposing resistance and capacitance changes leave the time product undetermined without magnitudes.",
        "Radius also affects the spatial scale; either larger unmyelinated diameter or myelination can explain the broader source profile.",
        "A controlled comparison must specify or match geometry and all effective passive parameters."
      ],
      "points": 1,
      "source": "L03 PDF 20",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 3, PDF page 20. Source figure with original labels and axes retained.",
        "fallbackAlt": "Lecture 3, PDF page 20. Source figure with original labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L03/myelin.webp', import.meta.url).href,
          "alt": "Lecture 3, PDF page 20. Source figure with original labels and axes retained.",
          "aspect": 1.3396226415094339,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L03-transient-sign-audit",
      "sectionId": "normalization",
      "difficulty": "hard",
      "type": "written",
      "prompt": "A reader proposes replacing the PDF22 minus between transient terms by a plus. At the injection site check the initial and long-time limits. Decide which sign is consistent with a continuous passive step response.",
      "hints": [
        {
          "body": "Test both early time and late time, not only one limit."
        },
        {
          "body": "At the injection site simplify the two erfc arguments before taking limits."
        }
      ],
      "markScheme": [
        {
          "text": "At $X=0$, the first erfc argument tends to negative infinity and the second to positive infinity."
        },
        {
          "text": "The limits are two and zero, so the minus gives the nonzero steady limit. At early time: at $X=0,T\\to0^+$ both erfc terms approach one."
        },
        {
          "text": "A plus would give an immediate nonzero source voltage, whereas the minus gives a continuous rise from zero."
        },
        {
          "text": "Therefore the source minus is the correct continuous step-response expression; the proposed plus must be rejected."
        }
      ],
      "modelAnswer": [
        "At $X=0$, the first erfc argument tends to negative infinity and the second to positive infinity.",
        "The limits are two and zero, so the minus gives the nonzero steady limit. At early time: at $X=0,T\\to0^+$ both erfc terms approach one.",
        "A plus would give an immediate nonzero source voltage, whereas the minus gives a continuous rise from zero.",
        "Therefore the source minus is the correct continuous step-response expression; the proposed plus must be rejected."
      ],
      "points": 1,
      "source": "L03 PDF 22"
    },
    {
      "id": "L03-synthesis-exam",
      "sectionId": "synthesis",
      "difficulty": "hard",
      "type": "written",
      "prompt": "Explain with two labelled sketches why a signal can travel farther without a change in local membrane time constant. Include geometry, specific parameters, spatial amplitude and temporal filtering, and describe a legitimate simulation prediction without inventing a trace.",
      "hints": [
        {
          "body": "Separate geometry-dependent distance from material-dependent local time."
        },
        {
          "body": "Use the radius factors in the resistance ratio and the cancellation in the membrane product."
        }
      ],
      "markScheme": [
        {
          "text": "At fixed $R_m,C_m,R_i$, increasing radius raises $\\lambda$ but leaves $\\tau_m=R_mC_m$ unchanged."
        },
        {
          "text": "Sketch steady voltage increment versus distance with slower decay for larger radius."
        },
        {
          "text": "Sketch voltage versus time and distinguish local relaxation from spatially filtered distant responses."
        },
        {
          "text": "Keep current, boundary conditions and recording positions specified when comparing simulations."
        },
        {
          "text": "Predict qualitative attenuation and broadening; do not claim an absent Exercise3 output was reproduced."
        }
      ],
      "modelAnswer": [
        "At fixed $R_m,C_m,R_i$, increasing radius raises $\\lambda$ but leaves $\\tau_m=R_mC_m$ unchanged.",
        "Sketch steady voltage increment versus distance with slower decay for larger radius.",
        "Sketch voltage versus time and distinguish local relaxation from spatially filtered distant responses.",
        "Keep current, boundary conditions and recording positions specified when comparing simulations.",
        "Predict qualitative attenuation and broadening; do not claim an absent Exercise3 output was reproduced."
      ],
      "points": 1,
      "source": "L03 PDF 23"
    }
  ],
  "mockExams": [
    {
      "id": "L03-mock-A",
      "title": "Mock A: measuring passive spread",
      "coverage": "Lectures 1–3. Two-electrode recordings, spatial inference, sphere geometry and passive limits.",
      "questions": [
        {
          "id": "L03-a1",
          "type": "written",
          "difficulty": "medium",
          "prompt": "a) Define electrotonic spread. b) Distinguish isopotential from non-isopotential. c) Define input resistance. Answer each in 1–3 sentences.",
          "markScheme": [
            {
              "text": "Electrotonic spread is passive spread shaped by axial resistance, leak and charge storage."
            },
            {
              "text": "Isopotential means uniform voltage; non-isopotential means voltage varies across positions."
            },
            {
              "text": "Input resistance is steady voltage increment divided by total supplied current."
            }
          ],
          "modelAnswer": [
            "Electrotonic spread is passive spread shaped by axial resistance, leak and charge storage.",
            "Isopotential means uniform voltage; non-isopotential means voltage varies across positions.",
            "Input resistance is steady voltage increment divided by total supplied current."
          ],
          "hints": [
            {
              "body": "Separate the requested subparts and specify what is held fixed."
            },
            {
              "body": "Use rest-relative voltage, the stated current direction, and the appropriate spatial or temporal scale."
            }
          ],
          "points": 1,
          "source": "L03 PDF2,8–9,16"
        },
        {
          "id": "L03-a2",
          "type": "written",
          "difficulty": "medium",
          "prompt": "Explain the five neuronal functions and sketch how passive spread connects reception and integration. Contrast small passive depolarization with a threshold-crossing active response.",
          "markScheme": [
            {
              "text": "Identify intrinsic activity, reception, integration, encoding and distribution."
            },
            {
              "text": "Show dendritic input and a path to an integrating/output site."
            },
            {
              "text": "Passive responses attenuate and filter during spread."
            },
            {
              "text": "Active responses involve changing permeability and spike regeneration; small-signal linearity has a limited range."
            }
          ],
          "modelAnswer": [
            "Identify intrinsic activity, reception, integration, encoding and distribution.",
            "Show dendritic input and a path to an integrating/output site.",
            "Passive responses attenuate and filter during spread.",
            "Active responses involve changing permeability and spike regeneration; small-signal linearity has a limited range."
          ],
          "hints": [
            {
              "body": "Separate the requested subparts and specify what is held fixed."
            },
            {
              "body": "Use rest-relative voltage, the stated current direction, and the appropriate spatial or temporal scale."
            }
          ],
          "points": 1,
          "source": "L03 PDF2–3,6–7"
        },
        {
          "id": "L03-a3",
          "sectionId": "decay",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "In an ideal infinite passive cable, steady increments at the injection site and $0.6\\,\\text{mm}$ away are $12$ and $4\\,\\text{mV}$. Infer the length constant, then predict the signed increment at $-1.2\\,\\text{mm}$. Explain the symmetry assumption.",
          "stages": [
            {
              "title": "Select relation",
              "choices": [
                {
                  "label": "Use spatial exponential attenuation"
                },
                {
                  "label": "Use temporal capacitor charging"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "The measurements differ in position at steady state."
              ]
            },
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "Distance",
                  "answer": {
                    "value": 0.0006,
                    "unit": "m",
                    "tolerance": 5.999999999999999e-10,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 0.0006,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Measured fraction",
                  "answer": {
                    "value": 0.3333333333333333,
                    "unit": "",
                    "tolerance": 3.333333333333333e-07,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 0.3333333333333333,
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
              "title": "Infer length",
              "answer": {
                "value": 0.0005461435359761024,
                "unit": "m",
                "tolerance": 1.6384306079283073e-06,
                "verification": {
                  "relation": "cableInverse",
                  "inputs": {
                    "x": 0.0006,
                    "fraction": 0.3333333333333333
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\lambda=-|x|/\\ln[V(x)/V_0]",
              "modelAnswer": [
                "The fraction is positive and below unity, so length is positive.",
                "$\\lambda=-|x|/\\ln[V(x)/V_0]$",
                "$0.00054614354\\,\\text{m}$"
              ]
            },
            {
              "title": "Predict opposite side",
              "answer": {
                "value": 0.0013333333333333333,
                "unit": "V",
                "tolerance": 4e-06,
                "verification": {
                  "relation": "cableDecay",
                  "inputs": {
                    "v": 0.012,
                    "x": -0.0012,
                    "lambda": 0.0005461435359761024
                  },
                  "displayScale": 1
                }
              },
              "tex": "V(-1.2\\,\\text{mm})=V_0e^{-|x|/\\lambda}",
              "modelAnswer": [
                "Use absolute distance, not a growing exponential on the negative side.",
                "$V(-1.2\\,\\text{mm})=V_0e^{-|x|/\\lambda}$",
                "$0.0013333333\\,\\text{V}$"
              ]
            },
            {
              "title": "Boundary assumption",
              "choices": [
                {
                  "label": "Symmetric uniform infinite cable"
                },
                {
                  "label": "A sealed end at the distant electrode"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "The supplied infinite-cable assumptions justify the symmetric profile."
              ]
            }
          ],
          "hints": [
            {
              "body": "Use a voltage ratio to eliminate the injection amplitude."
            },
            {
              "body": "Start with the distant-to-origin ratio, take its natural logarithm, solve for length, then use absolute distance."
            }
          ],
          "modelAnswer": [
            "The measurements differ in position at steady state.",
            "Convert each stated quantity to the requested unit before evaluating.",
            "The fraction is positive and below unity, so length is positive.",
            "Use absolute distance, not a growing exponential on the negative side.",
            "The supplied infinite-cable assumptions justify the symmetric profile."
          ],
          "points": 1,
          "source": "L03 PDF 16"
        },
        {
          "id": "L03-a4",
          "sectionId": "input",
          "difficulty": "medium",
          "type": "multiStepCalc",
          "prompt": "A passive sphere has radius $12\\,\\mu\\text{m}$, $R_m=1.5\\,\\Omega\\,\\text{m}^2$, $C_m=0.01\\,\\text{F/m}^2$. Inject $8\\,\\text{pA}$ for a long time. Find area, input resistance, steady voltage increment and time constant.",
          "stages": [
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "Radius",
                  "answer": {
                    "value": 1.2e-05,
                    "unit": "m",
                    "tolerance": 1.2e-11,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 1.2e-05,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Injected current",
                  "answer": {
                    "value": 8e-12,
                    "unit": "A",
                    "tolerance": 7.999999999999999e-18,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 8e-12,
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
              "title": "Area",
              "answer": {
                "value": 1.809557368467721e-09,
                "unit": "m2",
                "tolerance": 5.428672105403163e-12,
                "verification": {
                  "relation": "sphereArea",
                  "inputs": {
                    "radius": 1.2e-05
                  },
                  "displayScale": 1
                }
              },
              "tex": "A=4\\pi a^2",
              "modelAnswer": [
                "Use membrane surface area.",
                "$A=4\\pi a^2$",
                "$1.8095574e-09\\,\\text{m2}$"
              ]
            },
            {
              "title": "Input resistance",
              "answer": {
                "value": 828931995.2702881,
                "unit": "ohm",
                "tolerance": 2486795.9858108643,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1.5,
                    "b": 1.809557368467721e-09
                  },
                  "displayScale": 1
                }
              },
              "tex": "R_{input}=R_m/A",
              "modelAnswer": [
                "Specific resistance is divided by area.",
                "$R_{input}=R_m/A$",
                "$8.28932e+08\\,\\text{ohm}$"
              ]
            },
            {
              "title": "Steady increment",
              "answer": {
                "value": 0.006631455962162305,
                "unit": "V",
                "tolerance": 1.9894367886486915e-05,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 8e-12,
                    "b": 828931995.2702881
                  },
                  "displayScale": 1
                }
              },
              "tex": "V_{\\infty}=I_0R_{input}",
              "modelAnswer": [
                "Positive supplied current depolarizes.",
                "$V_{\\infty}=I_0R_{input}$",
                "$0.006631456\\,\\text{V}$"
              ]
            },
            {
              "title": "Time constant",
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
                "Geometry cancels from this local time constant.",
                "$\\tau_m=R_mC_m$",
                "$0.015\\,\\text{s}$"
              ]
            }
          ],
          "hints": [
            {
              "body": "Combine surface geometry with the steady current-voltage ratio."
            },
            {
              "body": "Start by converting the radius to metres, square it for area, then divide specific resistance by area."
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating.",
            "Use membrane surface area.",
            "Specific resistance is divided by area.",
            "Positive supplied current depolarizes.",
            "Geometry cancels from this local time constant."
          ],
          "points": 1,
          "source": "L03 PDF 8"
        },
        {
          "id": "L03-a5",
          "type": "written",
          "difficulty": "medium",
          "prompt": "Read the two-electrode source figure. Identify injection and recording, distinguish passive and active responses, and design an amplitude series to test linearity.",
          "markScheme": [
            {
              "text": "One electrode injects current; the other measures voltage."
            },
            {
              "text": "Small steps evoke graded passive responses; threshold-crossing depolarizations evoke spikes."
            },
            {
              "text": "Hold duration/location fixed and compare scaled subthreshold responses."
            },
            {
              "text": "Amplitude-dependent shape or spikes invalidate a constant passive model."
            }
          ],
          "modelAnswer": [
            "One electrode injects current; the other measures voltage.",
            "Small steps evoke graded passive responses; threshold-crossing depolarizations evoke spikes.",
            "Hold duration/location fixed and compare scaled subthreshold responses.",
            "Amplitude-dependent shape or spikes invalidate a constant passive model."
          ],
          "hints": [
            {
              "body": "Separate the requested subparts and specify what is held fixed."
            },
            {
              "body": "Use rest-relative voltage, the stated current direction, and the appropriate spatial or temporal scale."
            }
          ],
          "points": 1,
          "source": "L03 PDF3",
          "figure": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 3, PDF page 3. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 3, PDF page 3. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L03/responses.webp', import.meta.url).href,
              "alt": "Lecture 3, PDF page 3. Source figure with original labels and axes retained.",
              "aspect": 1.856115107913669,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ]
    },
    {
      "id": "L03-mock-B",
      "title": "Mock B: insulation and the return path",
      "coverage": "Lectures 1–3. Membrane versus axial paths, insulation factors, external resistance and distant traces.",
      "questions": [
        {
          "id": "L03-b1",
          "type": "written",
          "difficulty": "medium",
          "prompt": "a) Define the length constant. b) Define the membrane time constant. c) Distinguish specific resistivity from resistance per length.",
          "markScheme": [
            {
              "text": "Length constant sets steady spatial attenuation in a uniform cable."
            },
            {
              "text": "Time constant is the membrane resistance-capacitance product and sets local relaxation."
            },
            {
              "text": "Specific resistivity is a material property; per-length resistance also depends on cross-section."
            }
          ],
          "modelAnswer": [
            "Length constant sets steady spatial attenuation in a uniform cable.",
            "Time constant is the membrane resistance-capacitance product and sets local relaxation.",
            "Specific resistivity is a material property; per-length resistance also depends on cross-section."
          ],
          "hints": [
            {
              "body": "Separate the requested subparts and specify what is held fixed."
            },
            {
              "body": "Use rest-relative voltage, the stated current direction, and the appropriate spatial or temporal scale."
            }
          ],
          "points": 1,
          "source": "L03 PDF12,14,16,19"
        },
        {
          "id": "L03-b2",
          "type": "written",
          "difficulty": "medium",
          "prompt": "Derive the passive cable equation with a compartment sketch. Explain which terms disappear at steady state, and why an external return resistance changes spatial spread.",
          "markScheme": [
            {
              "text": "Draw axial series resistances and parallel membrane leak/capacitance."
            },
            {
              "text": "Combine axial Ohm gradient, conservation and membrane RC current."
            },
            {
              "text": "Identify the spatial resistance ratio and membrane time product."
            },
            {
              "text": "Steady state removes capacitive current but retains membrane leak."
            },
            {
              "text": "External longitudinal resistance adds to the internal path and reduces length constant."
            }
          ],
          "modelAnswer": [
            "Draw axial series resistances and parallel membrane leak/capacitance.",
            "Combine axial Ohm gradient, conservation and membrane RC current.",
            "Identify the spatial resistance ratio and membrane time product.",
            "Steady state removes capacitive current but retains membrane leak.",
            "External longitudinal resistance adds to the internal path and reduces length constant."
          ],
          "hints": [
            {
              "body": "Separate the requested subparts and specify what is held fixed."
            },
            {
              "body": "Use rest-relative voltage, the stated current direction, and the appropriate spatial or temporal scale."
            }
          ],
          "points": 1,
          "source": "L03 PDF10–14"
        },
        {
          "id": "L03-b3",
          "sectionId": "myelin",
          "difficulty": "medium",
          "type": "multiStepCalc",
          "prompt": "An idealized insulating change multiplies specific membrane resistance by $9$ and capacitance by $1/18$, with geometry and intracellular resistivity fixed. Initially $\\lambda=0.5\\,\\text{mm}$ and $\\tau_m=24\\,\\text{ms}$. Find both new scales, then compare attenuation at $1\\,\\text{mm}$ for the same origin voltage.",
          "stages": [
            {
              "title": "New length",
              "answer": {
                "value": 0.0015,
                "unit": "m",
                "tolerance": 4.5e-06,
                "verification": {
                  "relation": "cableLength",
                  "inputs": {
                    "rm": 225000.0,
                    "ri": 100000000000.0
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\lambda_{new}=\\lambda_{old}\\sqrt{9}",
              "modelAnswer": [
                "Length grows with the square root of resistance.",
                "$\\lambda_{new}=\\lambda_{old}\\sqrt{9}$",
                "$0.0015\\,\\text{m}$"
              ]
            },
            {
              "title": "New time",
              "answer": {
                "value": 0.012,
                "unit": "s",
                "tolerance": 3.6e-05,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 0.024,
                    "b": 0.5
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\tau_{new}=\\tau_{old}(9)(1/18)",
              "modelAnswer": [
                "The product decreases for these specified factors.",
                "$\\tau_{new}=\\tau_{old}(9)(1/18)$",
                "$0.012\\,\\text{s}$"
              ]
            },
            {
              "title": "Old fraction",
              "answer": {
                "value": 0.1353352832366127,
                "unit": "",
                "tolerance": 0.0004060058497098381,
                "verification": {
                  "relation": "cableDecay",
                  "inputs": {
                    "v": 1,
                    "x": 0.001,
                    "lambda": 0.0005
                  },
                  "displayScale": 1
                }
              },
              "tex": "f_{old}=e^{-x/\\lambda_{old}}",
              "modelAnswer": [
                "A fraction is dimensionless.",
                "$f_{old}=e^{-x/\\lambda_{old}}$",
                "$0.13533528$"
              ]
            },
            {
              "title": "New fraction",
              "answer": {
                "value": 0.513417119032592,
                "unit": "",
                "tolerance": 0.0015402513570977761,
                "verification": {
                  "relation": "cableDecay",
                  "inputs": {
                    "v": 1,
                    "x": 0.001,
                    "lambda": 0.0015
                  },
                  "displayScale": 1
                }
              },
              "tex": "f_{new}=e^{-x/\\lambda_{new}}",
              "modelAnswer": [
                "Less attenuation follows from the larger spatial scale.",
                "$f_{new}=e^{-x/\\lambda_{new}}$",
                "$0.51341712$"
              ]
            },
            {
              "title": "Interpretation",
              "choices": [
                {
                  "label": "More spatial spread and faster local relaxation"
                },
                {
                  "label": "Less spatial spread and slower local relaxation"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "Both follow here from the specified changes, not from insulation alone."
              ]
            }
          ],
          "hints": [
            {
              "body": "Use square-root scaling for distance and product scaling for time."
            },
            {
              "body": "Multiply the initial length by the square root of the resistance factor, and the initial time by both factors."
            }
          ],
          "modelAnswer": [
            "Length grows with the square root of resistance.",
            "The product decreases for these specified factors.",
            "A fraction is dimensionless.",
            "Less attenuation follows from the larger spatial scale.",
            "Both follow here from the specified changes, not from insulation alone."
          ],
          "points": 1,
          "source": "L03 PDF 20"
        },
        {
          "id": "L03-b4",
          "sectionId": "length",
          "difficulty": "medium",
          "type": "multiStepCalc",
          "prompt": "A cable has $r_m=8\\times10^4\\,\\Omega\\,\\text{m}$ and $r_i=8\\times10^{10}\\,\\Omega/\\text{m}$. Compare its length constant with negligible external resistance and with $r_o=3r_i$. For a $0.5\\,\\text{mm}$ site find the fraction of the same steady origin response in both cases.",
          "stages": [
            {
              "title": "No external resistance",
              "answer": {
                "value": 0.001,
                "unit": "m",
                "tolerance": 3e-06,
                "verification": {
                  "relation": "cableLength",
                  "inputs": {
                    "rm": 80000.0,
                    "ri": 80000000000.0
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\lambda_0=\\sqrt{r_m/r_i}",
              "modelAnswer": [
                "The initial cable scale ignores external voltage drop.",
                "$\\lambda_0=\\sqrt{r_m/r_i}$",
                "$0.001\\,\\text{m}$"
              ]
            },
            {
              "title": "With external resistance",
              "answer": {
                "value": 0.0005,
                "unit": "m",
                "tolerance": 1.5e-06,
                "verification": {
                  "relation": "cableLength",
                  "inputs": {
                    "rm": 80000.0,
                    "ri": 80000000000.0,
                    "ro": 240000000000.0
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\lambda_1=\\sqrt{r_m/(r_i+r_o)}",
              "modelAnswer": [
                "Add the two longitudinal resistance parameters before taking the root.",
                "$\\lambda_1=\\sqrt{r_m/(r_i+r_o)}$",
                "$0.0005\\,\\text{m}$"
              ]
            },
            {
              "title": "Initial fraction",
              "answer": {
                "value": 0.6065306597126334,
                "unit": "",
                "tolerance": 0.0018195919791379003,
                "verification": {
                  "relation": "cableDecay",
                  "inputs": {
                    "v": 1,
                    "x": 0.0005,
                    "lambda": 0.001
                  },
                  "displayScale": 1
                }
              },
              "tex": "f_0=e^{-x/\\lambda_0}",
              "modelAnswer": [
                "Use the same physical separation.",
                "$f_0=e^{-x/\\lambda_0}$",
                "$0.60653066$"
              ]
            },
            {
              "title": "New fraction",
              "answer": {
                "value": 0.36787944117144233,
                "unit": "",
                "tolerance": 0.001103638323514327,
                "verification": {
                  "relation": "cableDecay",
                  "inputs": {
                    "v": 1,
                    "x": 0.0005,
                    "lambda": 0.0005
                  },
                  "displayScale": 1
                }
              },
              "tex": "f_1=e^{-x/\\lambda_1}",
              "modelAnswer": [
                "A shorter scale increases attenuation.",
                "$f_1=e^{-x/\\lambda_1}$",
                "$0.36787944$"
              ]
            }
          ],
          "hints": [
            {
              "body": "Use the external-resistance variant of the length relation."
            },
            {
              "body": "Start with total longitudinal resistance equal to internal plus external; keep source voltage fixed when comparing fractions."
            }
          ],
          "modelAnswer": [
            "The initial cable scale ignores external voltage drop.",
            "Add the two longitudinal resistance parameters before taking the root.",
            "Use the same physical separation.",
            "A shorter scale increases attenuation."
          ],
          "points": 1,
          "source": "L03 PDF 14"
        },
        {
          "id": "L03-b5",
          "type": "written",
          "difficulty": "medium",
          "prompt": "Use the source distance-labelled pulse traces. Explain which waveform is most distant and why fitting all traces with one lumped RC exponential is inadequate. Specify one controlled comparison and one inference the plot alone cannot establish.",
          "markScheme": [
            {
              "text": "Farther responses are smaller, delayed and rounded."
            },
            {
              "text": "A distributed cable combines axial redistribution with local RC dynamics."
            },
            {
              "text": "Compare matched pulses at known distances while holding material parameters and geometry fixed."
            },
            {
              "text": "Waveform differences alone do not establish different membrane capacitance or a specific active channel."
            }
          ],
          "modelAnswer": [
            "Farther responses are smaller, delayed and rounded.",
            "A distributed cable combines axial redistribution with local RC dynamics.",
            "Compare matched pulses at known distances while holding material parameters and geometry fixed.",
            "Waveform differences alone do not establish different membrane capacitance or a specific active channel."
          ],
          "hints": [
            {
              "body": "Separate the requested subparts and specify what is held fixed."
            },
            {
              "body": "Use rest-relative voltage, the stated current direction, and the appropriate spatial or temporal scale."
            }
          ],
          "points": 1,
          "source": "L03 PDF15,19,21",
          "figure": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 3, PDF page 15. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 3, PDF page 15. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L03/pulse.webp', import.meta.url).href,
              "alt": "Lecture 3, PDF page 15. Source figure with original labels and axes retained.",
              "aspect": 1.420824295010846,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ]
    },
    {
      "id": "L03-mock-C",
      "title": "Mock C: geometry and causal balance",
      "coverage": "Lectures 1–3. Geometry, rest-relative signs, spatial curvature, bandwidth and method limitations.",
      "questions": [
        {
          "id": "L03-c1",
          "type": "written",
          "difficulty": "medium",
          "prompt": "a) Define rest-relative voltage. b) List the uniform passive cable assumptions. c) Define normalized distance and time.",
          "markScheme": [
            {
              "text": "Rest-relative voltage is membrane voltage minus resting membrane voltage."
            },
            {
              "text": "Use an infinite constant-radius uniform passive cable and negligible external resistance for the initial model."
            },
            {
              "text": "Normalize distance by length constant and time by membrane time constant."
            }
          ],
          "modelAnswer": [
            "Rest-relative voltage is membrane voltage minus resting membrane voltage.",
            "Use an infinite constant-radius uniform passive cable and negligible external resistance for the initial model.",
            "Normalize distance by length constant and time by membrane time constant."
          ],
          "hints": [
            {
              "body": "Separate the requested subparts and specify what is held fixed."
            },
            {
              "body": "Use rest-relative voltage, the stated current direction, and the appropriate spatial or temporal scale."
            }
          ],
          "points": 1,
          "source": "L03 PDF10,18,22"
        },
        {
          "id": "L03-c2",
          "type": "written",
          "difficulty": "medium",
          "prompt": "Sketch spatial attenuation and temporal responses for two uniform cables differing only in radius. Explain why greater spread does not imply a different local membrane time constant, and why boundary conditions still matter.",
          "markScheme": [
            {
              "text": "Larger radius raises spatial length constant at fixed material parameters."
            },
            {
              "text": "Sketch slower spatial decay for the larger cable, labelling distance and voltage increment."
            },
            {
              "text": "The local time product cancels geometry and remains unchanged."
            },
            {
              "text": "Distant temporal waveforms include spatial filtering, not just a local exponential."
            },
            {
              "text": "Finite endpoints need their own boundary conditions."
            }
          ],
          "modelAnswer": [
            "Larger radius raises spatial length constant at fixed material parameters.",
            "Sketch slower spatial decay for the larger cable, labelling distance and voltage increment.",
            "The local time product cancels geometry and remains unchanged.",
            "Distant temporal waveforms include spatial filtering, not just a local exponential.",
            "Finite endpoints need their own boundary conditions."
          ],
          "hints": [
            {
              "body": "Separate the requested subparts and specify what is held fixed."
            },
            {
              "body": "Use rest-relative voltage, the stated current direction, and the appropriate spatial or temporal scale."
            }
          ],
          "points": 1,
          "source": "L03 PDF17,19,21"
        },
        {
          "id": "L03-c3",
          "sectionId": "distance",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "A uniform dendrite has radius $1.5\\,\\mu\\text{m}$, $R_m=3\\,\\Omega\\,\\text{m}^2$ and $R_i=1.5\\,\\Omega\\,\\text{m}$. External resistance is negligible. Find its per-length resistances, length constant and electrotonic distance for a site $1.2\\,\\text{mm}$ away; predict attenuation of a $9\\,\\text{mV}$ origin increment.",
          "stages": [
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "Radius",
                  "answer": {
                    "value": 1.5e-06,
                    "unit": "m",
                    "tolerance": 1.5e-12,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 1.5e-06,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Distance",
                  "answer": {
                    "value": 0.0012,
                    "unit": "m",
                    "tolerance": 1.1999999999999998e-09,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 0.0012,
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
              "title": "Axial parameter",
              "answer": {
                "value": 212206590789.19376,
                "unit": "ohm/m",
                "tolerance": 636619772.3675812,
                "verification": {
                  "relation": "cableAxial",
                  "inputs": {
                    "rho": 1.5,
                    "radius": 1.5e-06
                  },
                  "displayScale": 1
                }
              },
              "tex": "r_i=R_i/(\\pi a^2)",
              "modelAnswer": [
                "Square the radius for core cross-section.",
                "$r_i=R_i/(\\pi a^2)$",
                "$2.1220659e+11\\,\\text{ohm/m}$"
              ]
            },
            {
              "title": "Membrane parameter",
              "answer": {
                "value": 318309.8861837907,
                "unit": "ohm*m",
                "tolerance": 954.9296585513721,
                "verification": {
                  "relation": "cableMembrane",
                  "inputs": {
                    "specific": 3,
                    "radius": 1.5e-06
                  },
                  "displayScale": 1
                }
              },
              "tex": "r_m=R_m/(2\\pi a)",
              "modelAnswer": [
                "Use circumference for membrane area per length.",
                "$r_m=R_m/(2\\pi a)$",
                "$318309.89\\,\\text{ohm*m}$"
              ]
            },
            {
              "title": "Length constant",
              "answer": {
                "value": 0.0012247448713915891,
                "unit": "m",
                "tolerance": 3.6742346141747674e-06,
                "verification": {
                  "relation": "cableLength",
                  "inputs": {
                    "rm": 318309.8861837907,
                    "ri": 212206590789.19376
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\lambda=\\sqrt{r_m/r_i}",
              "modelAnswer": [
                "Dimensions inside the root are length squared.",
                "$\\lambda=\\sqrt{r_m/r_i}$",
                "$0.0012247449\\,\\text{m}$"
              ]
            },
            {
              "title": "Electrotonic distance",
              "answer": {
                "value": 0.9797958971132711,
                "unit": "",
                "tolerance": 0.0029393876913398134,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.0012,
                    "b": 0.0012247448713915891
                  },
                  "displayScale": 1
                }
              },
              "tex": "X=x/\\lambda",
              "modelAnswer": [
                "Use consistent distance units.",
                "$X=x/\\lambda$",
                "$0.9797959$"
              ]
            },
            {
              "title": "Distant voltage",
              "answer": {
                "value": 0.00337848937873183,
                "unit": "V",
                "tolerance": 1.013546813619549e-05,
                "verification": {
                  "relation": "cableDecay",
                  "inputs": {
                    "v": 0.009,
                    "x": 0.0012,
                    "lambda": 0.0012247448713915891
                  },
                  "displayScale": 1
                }
              },
              "tex": "V=V_0e^{-X}",
              "modelAnswer": [
                "The positive response is smaller than at the source.",
                "$V=V_0e^{-X}$",
                "$0.0033784894\\,\\text{V}$"
              ]
            }
          ],
          "hints": [
            {
              "body": "Build the geometry-dependent parameters before solving spatial attenuation."
            },
            {
              "body": "Start with radius in metres; use cross-section for axial resistance and circumference for membrane resistance."
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating.",
            "Square the radius for core cross-section.",
            "Use circumference for membrane area per length.",
            "Dimensions inside the root are length squared.",
            "Use consistent distance units.",
            "The positive response is smaller than at the source."
          ],
          "points": 1,
          "source": "L03 PDF 18"
        },
        {
          "id": "L03-c4",
          "sectionId": "equation",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "At a source-free cable location, $V=6\\,\\text{mV}$ is increasing at $0.15\\,\\text{V/s}$. The local time constant is $20\\,\\text{ms}$ and length constant $0.75\\,\\text{mm}$. Infer voltage curvature. Predict the instantaneous slope if axial redistribution were removed while the same local voltage remained.",
          "stages": [
            {
              "title": "Rearrange",
              "choices": [
                {
                  "label": "Curvature equals time-slope term plus voltage, divided by length squared"
                },
                {
                  "label": "Curvature equals voltage minus time-slope term, divided by time"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "Rearrange the source-free cable equation, keeping dimensions."
              ]
            },
            {
              "title": "Time-slope term",
              "answer": {
                "value": 0.003,
                "unit": "V",
                "tolerance": 9e-06,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 0.02,
                    "b": 0.15
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\tau_m\\partial_tV",
              "modelAnswer": [
                "This contribution has voltage units.",
                "$\\tau_m\\partial_tV$",
                "$0.003\\,\\text{V}$"
              ]
            },
            {
              "title": "Required curvature",
              "answer": {
                "value": 15999.999999999998,
                "unit": "V/m2",
                "tolerance": 47.99999999999999,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.009,
                    "b": 5.625e-07
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\partial_{x}^2V=(\\tau_m\\partial_tV+V)/\\lambda^2",
              "modelAnswer": [
                "Axial influx supports the rising local increment.",
                "$\\partial_{x}^2V=(\\tau_m\\partial_tV+V)/\\lambda^2$",
                "$16000\\,\\text{V/m2}$"
              ]
            },
            {
              "title": "Slope without axial support",
              "answer": {
                "value": -0.3,
                "unit": "V/s",
                "tolerance": 0.0009,
                "verification": {
                  "relation": "cableEvolution",
                  "inputs": {
                    "lambda": 0.00075,
                    "curvature": 0,
                    "v": 0.006,
                    "tau": 0.02
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\partial_tV=-V/\\tau_m",
              "modelAnswer": [
                "Removing axial support makes the local positive increment decay.",
                "$\\partial_tV=-V/\\tau_m$",
                "$-0.3\\,\\text{V/s}$"
              ]
            },
            {
              "title": "Interpretation",
              "choices": [
                {
                  "label": "Rising voltage requires axial support in this source-free example"
                },
                {
                  "label": "Rising voltage proves a negative passive membrane resistance"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "The spatial term supplies the current that local leak alone cannot provide."
              ]
            }
          ],
          "hints": [
            {
              "body": "Use the source-free cable balance, then remove its spatial term."
            },
            {
              "body": "Start by multiplying the measured slope by the time constant; add the local voltage and divide by length squared."
            }
          ],
          "modelAnswer": [
            "Rearrange the source-free cable equation, keeping dimensions.",
            "This contribution has voltage units.",
            "Axial influx supports the rising local increment.",
            "Removing axial support makes the local positive increment decay.",
            "The spatial term supplies the current that local leak alone cannot provide."
          ],
          "points": 1,
          "source": "L03 PDF 14"
        },
        {
          "id": "L03-c5",
          "type": "written",
          "difficulty": "medium",
          "prompt": "Design a passive cable experiment that distinguishes stronger supplied current from improved spatial spread. Use the source spatial profile, specify recordings and controls, and explain why a remote amplitude alone is insufficient.",
          "markScheme": [
            {
              "text": "Measure injection-site and remote steady voltage increments with the same subthreshold protocol."
            },
            {
              "text": "Compare the remote-to-origin ratio to remove source-amplitude scaling."
            },
            {
              "text": "Record distance and hold geometry, baseline and boundary conditions fixed."
            },
            {
              "text": "A remote amplitude alone mixes origin amplitude and attenuation; do not claim a unique resistance change."
            }
          ],
          "modelAnswer": [
            "Measure injection-site and remote steady voltage increments with the same subthreshold protocol.",
            "Compare the remote-to-origin ratio to remove source-amplitude scaling.",
            "Record distance and hold geometry, baseline and boundary conditions fixed.",
            "A remote amplitude alone mixes origin amplitude and attenuation; do not claim a unique resistance change."
          ],
          "hints": [
            {
              "body": "Separate the requested subparts and specify what is held fixed."
            },
            {
              "body": "Use rest-relative voltage, the stated current direction, and the appropriate spatial or temporal scale."
            }
          ],
          "points": 1,
          "source": "L03 PDF3,16–18; L01 controlled current injection",
          "figure": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 3, PDF page 16. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 3, PDF page 16. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L03/decay.webp', import.meta.url).href,
              "alt": "Lecture 3, PDF page 16. Source figure with original labels and axes retained.",
              "aspect": 1.793103448275862,
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
content.formulaReferenceNote='Official exam PDF p4, full-course reference. This practice requires lectures 1–3 only.';
export default content;
