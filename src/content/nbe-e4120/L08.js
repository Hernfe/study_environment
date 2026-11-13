// Scope and corrections: docs/scope/nbe-e4120/L08.md
import { equationSheet } from './equation-sheet.js';
const content={
  "meta": {
    "id": "L08",
    "number": 8,
    "title": "Hodgkin-Huxley continued and saltatory propagation",
    "chapters": [],
    "pages": [],
    "lectureDate": "2026-10-30",
    "examDate": "2026-11-30",
    "examLabel": "Final exam"
  },
  "objectives": [
    "Use signed HH current balance and distinguish space clamp from propagation.",
    "Explain threshold, accommodation and refractory history through gating.",
    "Infer capacitance, gating charge and channel properties with explicit assumptions.",
    "Explain myelinated propagation using geometry, spatial measurements and continuous internodal voltage."
  ],
  "prerequisites": [
    {
      "text": "HH conductance and gating kinetics",
      "lectureId": "L07",
      "sectionId": "products"
    },
    {
      "text": "Cable current and spatial spread",
      "lectureId": "L03",
      "sectionId": "overview"
    }
  ],
  "segmentedPractice": true,
  "sections": [
    {
      "id": "overview",
      "title": "Overview: current balance to saltatory conduction",
      "keyTerms": [],
      "source": "L08 8:1 p1",
      "blocks": [
        {
          "type": "text",
          "body": ["Combine ionic conductances with membrane capacitance, then add axial current. Follow excitability, gating-charge measurements and myelinated propagation. Use $V_m=V_{in}-V_{out}$ and positive outward membrane current.", "The circuit links a changing voltage to the difference between supplied current and ionic current. Adding spatial coupling explains how local excitation recruits adjacent membrane. Keep these two questions separate: what changes voltage at one site, and what carries excitation to the next site? (8:1 PDF p1.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:1, PDF page 2. Source circuit panel with original labels and axes.",
            "fallbackAlt": "8:1, PDF page 2. Source circuit panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/circuit.webp', import.meta.url).href,
              "alt": "8:1, PDF page 2. Source circuit panel with original labels and axes.",
              "aspect": 1.0910652920962198,
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
          "id": "L08-overview-check",
          "prompt": "Under space clamp, which voltage variation remains possible?",
          "correct": 0,
          "options": [
            {
              "text": "Voltage over time at a spatially uniform site",
              "feedback": "Space clamp makes voltage uniform in space while allowing temporal changes."
            },
            {
              "text": "Voltage over space at a temporally fixed site",
              "feedback": "Spatial variation is removed by space clamp; voltage can still change with time."
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
            "Voltage over time at a spatially uniform site."
          ]
        },
        {
          "id": "L08-overview-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 8:1 p1–2",
          "prompt": "Which component stores charge in the HH circuit?",
          "options": [
            {
              "text": "The membrane capacitance",
              "feedback": "Capacitance links stored charge to membrane voltage."
            },
            {
              "text": "The membrane leak conductance",
              "feedback": "Leak conductance carries ionic current rather than storing charge."
            },
            {
              "text": "The axial resistance branch",
              "feedback": "Axial resistance limits longitudinal current rather than storing membrane charge."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "Capacitance links stored charge to membrane voltage."
            }
          ],
          "modelAnswer": [
            "Capacitance links stored charge to membrane voltage."
          ]
        }
      ],
      "part": {
        "id": "hh",
        "number": 1,
        "title": "HH part 2: current balance and excitability"
      }
    },
    {
      "id": "circuit",
      "title": "Parallel HH circuit and signed current balance",
      "keyTerms": [],
      "source": "L08 8:1 p2",
      "blocks": [
        {
          "type": "text",
          "body": ["Capacitance, potassium, sodium and leak branches are parallel. Each ionic current is conductance times its own signed driving force. Use total currents with total capacitance, or densities consistently.", "All branches share voltage, but their reversal potentials differ. Calculate each signed branch first, sum the ionic currents, then use the current-balance explorer to obtain the voltage slope. A zero sum can hide opposing ionic flows; it does not imply that every channel is closed. (8:1 PDF p2.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:1, PDF page 2. Source circuit panel with original labels and axes.",
            "fallbackAlt": "8:1, PDF page 2. Source circuit panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/circuit.webp', import.meta.url).href,
              "alt": "8:1, PDF page 2. Source circuit panel with original labels and axes.",
              "aspect": 1.0910652920962198,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L08-f-ohmic",
          "name": "Signed ionic current",
          "tex": "I=g(V-E)",
          "symbols": [
            {
              "tex": "I",
              "name": "Outward current",
              "unit": "\\mathrm A",
              "meaning": "Outward current in the stated model."
            },
            {
              "tex": "g",
              "name": "Conductance",
              "unit": "\\mathrm S",
              "meaning": "Conductance in the stated model."
            },
            {
              "tex": "V",
              "name": "Inside voltage",
              "unit": "\\mathrm V",
              "meaning": "Inside voltage in the stated model."
            },
            {
              "tex": "E",
              "name": "Selective reversal",
              "unit": "\\mathrm V",
              "meaning": "Selective reversal in the stated model."
            }
          ],
          "reads": "Driving force sets direction; conductance sets scale.",
          "assumes": "Fixed-gating Ohmic component.",
          "variants": [],
          "drill": {
            "prompt": "For $g=40\\,\\mathrm{nS}$ and $V-E=-0.060\\,\\mathrm V$, find outward current.",
            "answer": {
              "value": -2.4e-09,
              "unit": "A",
              "tolerance": 7.2e-12,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 4e-08,
                  "b": -0.06
                },
                "displayScale": 1
              }
            },
            "tex": "I=40\\times10^{-9}(-0.060)\\,\\mathrm A",
            "modelAnswer": [
              "Driving force sets direction; conductance sets scale."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $I=g(V-E)$."
              },
              {
                "body": "Start with $I=40\\times10^{-9}(-0.060)\\,\\mathrm A$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{I}}={\\htmlClass{formula-term-1}{g}}({\\htmlClass{formula-term-2}{V}}-{\\htmlClass{formula-term-3}{E}})"
        },
        {
          "id": "L08-f-sum",
          "name": "Sum parallel ionic currents",
          "tex": "I_{ion}=I_{Na}+I_K+I_L",
          "symbols": [
            {
              "tex": "I_{ion}",
              "name": "Ionic total",
              "unit": "\\mathrm A",
              "meaning": "Ionic total in the stated model."
            },
            {
              "tex": "I_{Na}",
              "name": "Sodium current",
              "unit": "\\mathrm A",
              "meaning": "Sodium current in the stated model."
            },
            {
              "tex": "I_K",
              "name": "Potassium current",
              "unit": "\\mathrm A",
              "meaning": "Potassium current in the stated model."
            },
            {
              "tex": "I_L",
              "name": "Leak current",
              "unit": "\\mathrm A",
              "meaning": "Leak current in the stated model."
            }
          ],
          "reads": "Signed components can cancel without every branch vanishing.",
          "assumes": "Same total-current units.",
          "variants": [],
          "drill": {
            "prompt": "Sodium plus potassium current is $-1.5\\,\\mathrm{nA}$ and leak is $0.3\\,\\mathrm{nA}$. Find net ionic current.",
            "answer": {
              "value": -1.2e-09,
              "unit": "A",
              "tolerance": 3.6e-12,
              "verification": {
                "relation": "sum",
                "inputs": {
                  "a": -1.5e-09,
                  "b": 3e-10
                },
                "displayScale": 1
              }
            },
            "tex": "I_{ion}=(-1.5+0.3)\\,\\mathrm{nA}",
            "modelAnswer": [
              "Signed components can cancel without every branch vanishing."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $I_{ion}=I_{Na}+I_K+I_L$."
              },
              {
                "body": "Start with $I_{ion}=(-1.5+0.3)\\,\\mathrm{nA}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{I_{ion}}}={\\htmlClass{formula-term-1}{I_{Na}}}+{\\htmlClass{formula-term-2}{I_K}}+{\\htmlClass{formula-term-3}{I_L}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L08-circuit-check",
          "prompt": "Which factor sets inward versus outward current for an open ionic branch?",
          "correct": 1,
          "options": [
            {
              "text": "The maximum conductance $\\bar g_i$",
              "feedback": "Conductance sets current magnitude; the signed driving force sets its direction."
            },
            {
              "text": "The driving force $V_m-E_i$",
              "feedback": "With nonnegative conductance, current has the sign of its driving force."
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
            "The driving force $V_m-E_i$."
          ]
        },
        {
          "id": "L08-circuit-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 8:1 p2",
          "prompt": "How are the ionic branches connected to membrane capacitance?",
          "options": [
            {
              "text": "In series along the axoplasm",
              "feedback": "The ionic branches cross the membrane; axial resistance belongs along the axon."
            },
            {
              "text": "In parallel across the membrane",
              "feedback": "Parallel branches share membrane voltage and carry separate currents."
            },
            {
              "text": "In series across the membrane",
              "feedback": "Series branches would share current, whereas the HH branches share voltage."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "Parallel branches share membrane voltage and carry separate currents."
            }
          ],
          "modelAnswer": [
            "Parallel branches share membrane voltage and carry separate currents."
          ]
        }
      ]
    },
    {
      "id": "agreement",
      "title": "From gate probabilities to the action potential",
      "keyTerms": [],
      "source": "L08 8:1 p3",
      "blocks": [
        {
          "type": "text",
          "body": ["Use $g_K=\\bar g_Kn^4$ and $g_{Na}=\\bar g_{Na}m^3h$. The source compares calculated and recorded waveforms and currents. These are source results, not a new simulation or a unique molecular proof.", "The variables $m,n,h$ are particle probabilities; their products are channel conductance fractions, not currents. First apply the powers, multiply by maximal conductance, then use the appropriate driving force. Agreement of predicted and recorded traces tests the combined model, rather than uniquely establishing its molecular interpretation. (8:1 PDF p3.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:1, PDF page 3. Source agreement panel with original labels and axes.",
            "fallbackAlt": "8:1, PDF page 3. Source agreement panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/agreement.webp', import.meta.url).href,
              "alt": "8:1, PDF page 3. Source agreement panel with original labels and axes.",
              "aspect": 3.3214285714285716,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L08-f-gk",
          "name": "Potassium conductance product",
          "tex": "g_K=\\bar g_Kn^4",
          "symbols": [
            {
              "tex": "g_K",
              "name": "Potassium conductance",
              "unit": "\\mathrm S",
              "meaning": "Potassium conductance in the stated model."
            },
            {
              "tex": "\\bar g_K",
              "name": "Maximum conductance",
              "unit": "\\mathrm S",
              "meaning": "Maximum conductance in the stated model."
            },
            {
              "tex": "n",
              "name": "Particle probability",
              "unit": "1",
              "meaning": "Particle probability in the stated model."
            }
          ],
          "reads": "Four independent all-required activation factors multiply.",
          "assumes": "HH potassium fit.",
          "variants": [],
          "drill": {
            "prompt": "For $\\bar g_K=80\\,\\mathrm{nS}$ and $n=0.5$, find conductance.",
            "answer": {
              "value": 5e-09,
              "unit": "S",
              "tolerance": 1.5e-11,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 8e-08,
                  "b": 0.0625
                },
                "displayScale": 1
              }
            },
            "tex": "g_K=80\\times10^{-9}(0.5)^4\\,\\mathrm S",
            "modelAnswer": [
              "Four independent all-required activation factors multiply."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $g_K=\\bar g_Kn^4$."
              },
              {
                "body": "Start with $g_K=80\\times10^{-9}(0.5)^4\\,\\mathrm S$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{g_K}}={\\htmlClass{formula-term-1}{\\bar g_K}}{\\htmlClass{formula-term-2}{n}}^4"
        },
        {
          "id": "L08-f-gna",
          "name": "Sodium conductance product",
          "tex": "g_{Na}=\\bar g_{Na}m^3h",
          "symbols": [
            {
              "tex": "g_{Na}",
              "name": "Sodium conductance",
              "unit": "\\mathrm S",
              "meaning": "Sodium conductance in the stated model."
            },
            {
              "tex": "\\bar g_{Na}",
              "name": "Maximum conductance",
              "unit": "\\mathrm S",
              "meaning": "Maximum conductance in the stated model."
            },
            {
              "tex": "m",
              "name": "Activation",
              "unit": "1",
              "meaning": "Activation in the stated model."
            },
            {
              "tex": "h",
              "name": "Availability",
              "unit": "1",
              "meaning": "Availability in the stated model."
            }
          ],
          "reads": "Availability weights the three activation factors.",
          "assumes": "HH sodium fit.",
          "variants": [],
          "drill": {
            "prompt": "For $\\bar g_{Na}=100\\,\\mathrm{nS}$, $m=0.8$, $h=0.2$, find conductance.",
            "answer": {
              "value": 1.0240000000000003e-08,
              "unit": "S",
              "tolerance": 3.072000000000001e-11,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 1e-07,
                  "b": 0.10240000000000003
                },
                "displayScale": 1
              }
            },
            "tex": "g_{Na}=100\\times10^{-9}(0.8)^3(0.2)\\,\\mathrm S",
            "modelAnswer": [
              "Availability weights the three activation factors."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $g_{Na}=\\bar g_{Na}m^3h$."
              },
              {
                "body": "Start with $g_{Na}=100\\times10^{-9}(0.8)^3(0.2)\\,\\mathrm S$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{g_{Na}}}={\\htmlClass{formula-term-1}{\\bar g_{Na}}}{\\htmlClass{formula-term-2}{m}}^3{\\htmlClass{formula-term-3}{h}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L08-agreement-check",
          "prompt": "Which product combines sodium activation with sodium availability?",
          "correct": 0,
          "options": [
            {
              "text": "$m^3h$, activation times availability",
              "feedback": "Three activation factors and one availability factor give the sodium fraction."
            },
            {
              "text": "$n^4$, four potassium activation factors",
              "feedback": "The fourth power of potassium activation describes potassium, not sodium."
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
            "$m^3h$, activation times availability."
          ]
        },
        {
          "id": "L08-agreement-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 8:1 p3",
          "prompt": "What do the individual HH variables represent?",
          "options": [
            {
              "text": "Fractions of total injected current",
              "feedback": "Gate variables determine conductance fractions, not shares of applied current."
            },
            {
              "text": "Ratios of ionic reversal potentials",
              "feedback": "Reversal potentials set driving forces separately from gate probabilities."
            },
            {
              "text": "Permissive-state probabilities",
              "feedback": "The channel fraction combines these probabilities using the taught powers."
            }
          ],
          "correct": 2,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "The channel fraction combines these probabilities using the taught powers."
            }
          ],
          "modelAnswer": [
            "The channel fraction combines these probabilities using the taught powers."
          ]
        }
      ]
    },
    {
      "id": "space",
      "title": "Space clamp, cable coupling and travelling waves",
      "keyTerms": [],
      "source": "L08 8:1 p4",
      "blocks": [
        {
          "type": "text",
          "body": ["Space clamp removes spatial gradients; voltage clamp fixes voltage. A uniform axon supports an approximately constant-speed travelling wave. The source propagation equation drops driving forces in one line; retain the full ionic currents.", "For a travelling profile, converting spatial curvature to temporal curvature introduces an inverse-square speed factor. The axial-source explorer uses radius and bulk intracellular resistivity, giving current per area. Use capacitance and ionic currents per area in the same equation; a whole-cell capacitance cannot be mixed directly with that density. (8:1 PDF p4.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:1, PDF page 4. Source space panel with original labels and axes.",
            "fallbackAlt": "8:1, PDF page 4. Source space panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/space.webp', import.meta.url).href,
              "alt": "8:1, PDF page 4. Source space panel with original labels and axes.",
              "aspect": 2.9660056657223794,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        },
        {
          "type": "math",
          "title": "Complete propagating balance",
          "tex": "\\frac{a}{2\\rho_i}\\partial_x^2V_m=C_m\\partial_tV_m+\\bar g_K n^4(V_m-E_K)+\\bar g_{Na}m^3h(V_m-E_{Na})+g_L(V_m-E_L)",
          "note": "Specific capacitance and conductance densities; radius a, bulk resistivity rho. Driving forces retained."
        }
      ],
      "formulas": [
        {
          "id": "L08-f-axial",
          "name": "Axial source density",
          "tex": "I_m=\\frac{a}{2\\rho_i}\\partial_x^2V",
          "symbols": [
            {
              "tex": "I_m",
              "name": "Membrane current density",
              "unit": "\\mathrm{A/m^2}",
              "meaning": "Membrane current density in the stated model."
            },
            {
              "tex": "a",
              "name": "Axon radius",
              "unit": "\\mathrm m",
              "meaning": "Axon radius in the stated model."
            },
            {
              "tex": "\\rho_i",
              "name": "Bulk axial resistivity",
              "unit": "\\mathrm{\\Omega m}",
              "meaning": "Bulk axial resistivity in the stated model."
            },
            {
              "tex": "\\partial_x^2V",
              "name": "Voltage curvature",
              "unit": "\\mathrm{V/m^2}",
              "meaning": "Voltage curvature in the stated model."
            }
          ],
          "reads": "Spatial curvature provides local membrane-current density.",
          "assumes": "Uniform cylinder, negligible extracellular resistance.",
          "variants": [],
          "drill": {
            "prompt": "For $a=5\\,\\mu\\mathrm m$, $\\rho_i=1\\,\\Omega\\mathrm m$, and curvature $4\\times10^5\\,\\mathrm{V/m^2}$, find current density.",
            "answer": {
              "value": 1,
              "unit": "A/m2",
              "tolerance": 0.003,
              "verification": {
                "relation": "axialSource",
                "inputs": {
                  "radius": 5e-06,
                  "rho": 1,
                  "curvature": 400000.0
                },
                "displayScale": 1
              }
            },
            "tex": "I_m=5\\times10^{-6}(4\\times10^5)/(2\\times1)\\,\\mathrm{A/m^2}",
            "modelAnswer": [
              "Spatial curvature provides local membrane-current density."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $I_m=\\frac{a}{2\\rho_i}\\partial_x^2V$."
              },
              {
                "body": "Start with $I_m=5\\times10^{-6}(4\\times10^5)/(2\\times1)\\,\\mathrm{A/m^2}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{I_m}}=\\frac{{\\htmlClass{formula-term-1}{a}}}{2{\\htmlClass{formula-term-2}{\\rho_i}}}{\\htmlClass{formula-term-3}{\\partial_x^2V}}"
        },
        {
          "id": "L08-f-wave",
          "name": "Travelling-wave derivative factor",
          "tex": "\\partial_x^2V=v^{-2}\\partial_t^2V",
          "symbols": [
            {
              "tex": "v",
              "name": "Wave speed",
              "unit": "\\mathrm{m/s}",
              "meaning": "Wave speed in the stated model."
            }
          ],
          "reads": "A rigid travelling profile links spatial and temporal curvature.",
          "assumes": "Constant-speed profile only.",
          "variants": [],
          "drill": {
            "prompt": "For a speed ratio of $3$, find the ratio of inverse-square derivative factors.",
            "answer": {
              "value": 0.1111111111111111,
              "unit": "",
              "tolerance": 0.0003333333333333333,
              "verification": {
                "relation": "powerRatio",
                "inputs": {
                  "a": 3,
                  "b": 1,
                  "power": -2
                },
                "displayScale": 1
              }
            },
            "tex": "(v_2/v_1)^{-2}=3^{-2}",
            "modelAnswer": [
              "A rigid travelling profile links spatial and temporal curvature."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\partial_x^2V=v^{-2}\\partial_t^2V$."
              },
              {
                "body": "Start with $(v_2/v_1)^{-2}=3^{-2}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\partial_x^2V={\\htmlClass{formula-term-0}{v}}^{-2}\\partial_t^2V"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L08-space-check",
          "prompt": "Does a spatially uniform membrane have to remain at one voltage over time?",
          "correct": 1,
          "options": [
            {
              "text": "Yes, it removes temporal variation in voltage",
              "feedback": "Voltage clamp controls voltage; space clamp alone removes spatial gradients."
            },
            {
              "text": "No, it removes spatial variation in voltage",
              "feedback": "Space clamp makes voltage independent of position without fixing its time course."
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
            "No, it removes spatial variation in voltage."
          ]
        },
        {
          "id": "L08-space-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 8:1 p4",
          "prompt": "Which pathway couples neighboring axonal regions in cable theory?",
          "options": [
            {
              "text": "Longitudinal current through the axoplasm",
              "feedback": "Axial current couples sites with different membrane voltages."
            },
            {
              "text": "Transverse current through the membrane",
              "feedback": "Transmembrane current charges or crosses local membrane rather than running along the axon."
            },
            {
              "text": "Displacement current across local capacitance",
              "feedback": "Local capacitive current changes stored charge; axial current couples positions."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "Axial current couples sites with different membrane voltages."
            }
          ],
          "modelAnswer": [
            "Axial current couples sites with different membrane voltages."
          ]
        }
      ]
    },
    {
      "id": "nonpropagating",
      "title": "Nonpropagating AP: capacitive balance",
      "keyTerms": [],
      "source": "L08 8:1 p5",
      "blocks": [
        {
          "type": "text",
          "body": ["After a brief stimulus ends in a space-clamped cell, the net applied current is zero. Inward net ionic current charges the capacitor during the rising phase. Include leak in the ionic sum unless it is explicitly negligible.", "With no applied current, the voltage slope is minus the ionic sum divided by capacitance. Thus inward ionic current gives a positive slope and outward current gives a negative slope. At a smooth voltage maximum the capacitive current is zero, even though individual ionic currents may remain substantial. (8:1 PDF p5.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:1, PDF page 5. Source nonpropagating panel with original labels and axes.",
            "fallbackAlt": "8:1, PDF page 5. Source nonpropagating panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/nonpropagating.webp', import.meta.url).href,
              "alt": "8:1, PDF page 5. Source nonpropagating panel with original labels and axes.",
              "aspect": 0.7514792899408284,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L08-f-balance",
          "name": "Voltage slope from current balance",
          "tex": "\\dot V=(I_m-I_{ion})/C",
          "symbols": [
            {
              "tex": "\\dot V",
              "name": "Voltage slope",
              "unit": "\\mathrm{V/s}",
              "meaning": "Voltage slope in the stated model."
            },
            {
              "tex": "I_m",
              "name": "Applied current",
              "unit": "\\mathrm A",
              "meaning": "Applied current in the stated model."
            },
            {
              "tex": "I_{ion}",
              "name": "Outward ionic current",
              "unit": "\\mathrm A",
              "meaning": "Outward ionic current in the stated model."
            },
            {
              "tex": "C",
              "name": "Capacitance",
              "unit": "\\mathrm F",
              "meaning": "Capacitance in the stated model."
            }
          ],
          "reads": "Inward net ionic current makes the membrane voltage rise.",
          "assumes": "Space-clamped, same total-current/total-capacitance convention.",
          "variants": [],
          "drill": {
            "prompt": "After injection ends, $I_m=0$, $I_{ion}=-2\\,\\mathrm{nA}$ and $C=100\\,\\mathrm{pF}$. Find voltage slope.",
            "answer": {
              "value": 20,
              "unit": "V/s",
              "tolerance": 0.06,
              "verification": {
                "relation": "hhBalance",
                "inputs": {
                  "im": 0,
                  "ionic": -2e-09,
                  "capacitance": 1e-10
                },
                "displayScale": 1
              }
            },
            "tex": "\\dot V=(0-(-2\\times10^{-9}))/(100\\times10^{-12})\\,\\mathrm{V/s}",
            "modelAnswer": [
              "Inward net ionic current makes the membrane voltage rise."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\dot V=(I_m-I_{ion})/C$."
              },
              {
                "body": "Start with $\\dot V=(0-(-2\\times10^{-9}))/(100\\times10^{-12})\\,\\mathrm{V/s}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{\\dot V}}=({\\htmlClass{formula-term-1}{I_m}}-{\\htmlClass{formula-term-2}{I_{ion}}})/{\\htmlClass{formula-term-3}{C}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L08-nonpropagating-check",
          "prompt": "With injection over, which ionic current accompanies a rising space-clamped voltage?",
          "correct": 1,
          "options": [
            {
              "text": "Net outward ionic current balanced by capacitance",
              "feedback": "Net outward ionic current lowers voltage once injection has ended."
            },
            {
              "text": "Net inward ionic current balanced by capacitance",
              "feedback": "Net inward ionic current is balanced by outward capacitive current as voltage rises."
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
            "Net inward ionic current balanced by capacitance."
          ]
        },
        {
          "id": "L08-nonpropagating-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 8:1 p5",
          "prompt": "At a smooth voltage peak, what is the capacitive current?",
          "options": [
            {
              "text": "Inward at that instant",
              "feedback": "Inward capacitive current accompanies falling voltage under the stated convention."
            },
            {
              "text": "Zero at that instant",
              "feedback": "Capacitive current is proportional to voltage slope, which is zero at a smooth peak."
            },
            {
              "text": "Outward at that instant",
              "feedback": "Outward capacitive current accompanies rising voltage under the stated convention."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "Capacitive current is proportional to voltage slope, which is zero at a smooth peak."
            }
          ],
          "modelAnswer": [
            "Capacitive current is proportional to voltage slope, which is zero at a smooth peak."
          ]
        }
      ]
    },
    {
      "id": "regeneration",
      "title": "Continuous propagation and the refractory wake",
      "keyTerms": [],
      "source": "L08 8:1 p6",
      "blocks": [
        {
          "type": "text",
          "body": ["An active region provides inward ionic current. Axial current spreads in both directions and excites available adjacent membrane. Recently active membrane has reduced sodium availability, so ordinary propagation advances away from the refractory wake.", "The key sequence is local inward current, passive axial spread, then fresh sodium-channel recruitment ahead of the wave. Current can spread backward too. Directional regeneration depends on the different gating histories ahead and behind, rather than on an axial pathway that conducts in only one direction. (8:1 PDF p6.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:1, PDF page 6. Source propagation panel with original labels and axes.",
            "fallbackAlt": "8:1, PDF page 6. Source propagation panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/propagation.webp', import.meta.url).href,
              "alt": "8:1, PDF page 6. Source propagation panel with original labels and axes.",
              "aspect": 1.1540616246498598,
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
          "id": "L08-regeneration-check",
          "prompt": "Which sodium property limits immediate regeneration behind an advancing spike?",
          "correct": 0,
          "options": [
            {
              "text": "Sodium availability remains reduced after activation",
              "feedback": "Recent inactivation reduces sodium availability in the wake."
            },
            {
              "text": "Sodium availability recovers fully after activation",
              "feedback": "Full recovery would restore excitability; the wake instead retains sodium inactivation."
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
            "Sodium availability remains reduced after activation."
          ]
        },
        {
          "id": "L08-regeneration-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 8:1 p6",
          "prompt": "How does axial current spread away from an active region?",
          "options": [
            {
              "text": "Actively in the forward direction",
              "feedback": "Axial spread is passive; local membrane channels provide regeneration."
            },
            {
              "text": "Passively in the forward direction",
              "feedback": "Passive current can spread backward too; refractoriness limits backward regeneration."
            },
            {
              "text": "Passively in both axial directions",
              "feedback": "Current spreads both ways; available channels ahead support fresh regeneration."
            }
          ],
          "correct": 2,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "Current spreads both ways; available channels ahead support fresh regeneration."
            }
          ],
          "modelAnswer": [
            "Current spreads both ways; available channels ahead support fresh regeneration."
          ]
        }
      ]
    },
    {
      "id": "propagating",
      "title": "Axial diversion changes the current balance",
      "keyTerms": [],
      "source": "L08 8:1 p7",
      "blocks": [
        {
          "type": "text",
          "body": ["During propagation ionic current supplies local capacitance and axial current. Therefore $I_{ion}=-I_C$ is not generally valid at each point. Read position, time and propagation direction separately on the source traces.", "Follow one recording position through time before comparing positions. A mismatch between local ionic and capacitive current is expected when longitudinal current supplies neighboring membrane. The plotted wave travels right to left; the trace order must be read with that direction, rather than inferred from current sign alone. (8:1 PDF p7.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:1, PDF page 7. Source propagating panel with original labels and axes.",
            "fallbackAlt": "8:1, PDF page 7. Source propagating panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/propagating.webp', import.meta.url).href,
              "alt": "8:1, PDF page 7. Source propagating panel with original labels and axes.",
              "aspect": 1.0059880239520957,
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
          "id": "L08-propagating-check",
          "prompt": "Which route prevents ionic current from balancing only local capacitive current during propagation?",
          "correct": 0,
          "options": [
            {
              "text": "Longitudinal current into adjacent axonal regions",
              "feedback": "Axial current can supply adjacent regions as well as local membrane charging."
            },
            {
              "text": "Only transverse current into local capacitance",
              "feedback": "Propagation also requires longitudinal current, so local capacitance is not the only destination."
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
            "Longitudinal current into adjacent axonal regions."
          ]
        },
        {
          "id": "L08-propagating-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 8:1 p7",
          "prompt": "What does the local membrane capacitor account for?",
          "options": [
            {
              "text": "Charge stored across the local membrane",
              "feedback": "Local charging is one destination for current during propagation."
            },
            {
              "text": "Charge carried along the axonal interior",
              "feedback": "Longitudinal transport is axial current, distinct from local capacitive charging."
            },
            {
              "text": "Charge transferred through the ionic pores",
              "feedback": "Ionic current crosses channels; capacitive current changes stored charge."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "Local charging is one destination for current during propagation."
            }
          ],
          "modelAnswer": [
            "Local charging is one destination for current during propagation."
          ]
        }
      ]
    },
    {
      "id": "noble",
      "title": "Noble approximation and stable resting voltage",
      "keyTerms": [],
      "source": "L08 8:1 p8",
      "blocks": [
        {
          "type": "text",
          "body": ["Fast activation follows its steady value while slower potassium activation and sodium availability are briefly fixed. The momentary total current can have several zeros. Positive slope at rest produces restoring current in this reduced subsystem.", "Read the total momentary curve, not the sodium branch alone. A small depolarization at a positive-slope zero produces outward current and reverses the displacement. This argument assumes fast $m$ follows voltage while $n,h$ are frozen; it describes local fast stability, not an equilibrium with all gates fixed forever. (8:1 PDF p8.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:1, PDF page 8. Source noble panel with original labels and axes.",
            "fallbackAlt": "8:1, PDF page 8. Source noble panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/noble.webp', import.meta.url).href,
              "alt": "8:1, PDF page 8. Source noble panel with original labels and axes.",
              "aspect": 1.78168130489335,
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
          "id": "L08-noble-check",
          "prompt": "Which pair is briefly frozen while fast sodium activation follows voltage?",
          "correct": 0,
          "options": [
            {
              "text": "Potassium activation $n$ and availability $h$",
              "feedback": "The approximation freezes the slower potassium activation and sodium availability."
            },
            {
              "text": "Sodium activation $m$ and driving force $V-E$",
              "feedback": "Sodium activation follows voltage rapidly, and driving force still depends on voltage."
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
            "Potassium activation $n$ and availability $h$."
          ]
        },
        {
          "id": "L08-noble-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 8:1 p8",
          "prompt": "Which variable follows voltage rapidly in the Noble approximation?",
          "options": [
            {
              "text": "Sodium availability probability $h$",
              "feedback": "Sodium availability is treated as slow during the momentary approximation."
            },
            {
              "text": "Sodium activation probability $m$",
              "feedback": "Fast sodium activation follows its steady voltage-dependent value."
            },
            {
              "text": "Potassium activation probability $n$",
              "feedback": "Potassium activation is treated as slow during the momentary approximation."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "Fast sodium activation follows its steady voltage-dependent value."
            }
          ],
          "modelAnswer": [
            "Fast sodium activation follows its steady voltage-dependent value."
          ]
        }
      ]
    },
    {
      "id": "moving-iv",
      "title": "Threshold instability and a transient peak",
      "keyTerms": [],
      "source": "L08 8:1 p9",
      "blocks": [
        {
          "type": "text",
          "body": ["A negative current slope at threshold amplifies voltage perturbations. The positive-slope high-voltage zero is transient: potassium activation rises and sodium availability falls. The momentary curve shifts outward and can lose its high-voltage zeros.", "The perturbation rate is the negative local current slope divided by capacitance. A negative slope therefore gives growth instead of recovery. During sustained depolarization the slow gates change the curve itself, so stability at a momentary high-voltage crossing cannot guarantee a sustained plateau in the full model. (8:1 PDF p9.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:1, PDF page 9. Source moving iv panel with original labels and axes.",
            "fallbackAlt": "8:1, PDF page 9. Source moving iv panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/moving-iv.webp', import.meta.url).href,
              "alt": "8:1, PDF page 9. Source moving iv panel with original labels and axes.",
              "aspect": 1.7771812080536913,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L08-f-stability",
          "name": "Local perturbation rate",
          "tex": "k=-G_{slope}/C",
          "symbols": [
            {
              "tex": "k",
              "name": "Perturbation growth rate",
              "unit": "\\mathrm{s^{-1}}",
              "meaning": "Perturbation growth rate in the stated model."
            },
            {
              "tex": "G_{slope}",
              "name": "Momentary current slope",
              "unit": "\\mathrm S",
              "meaning": "Momentary current slope in the stated model."
            },
            {
              "tex": "C",
              "name": "Capacitance",
              "unit": "\\mathrm F",
              "meaning": "Capacitance in the stated model."
            }
          ],
          "reads": "Negative momentary current slope amplifies a small displacement.",
          "assumes": "Zero applied current; frozen slow variables; linearized near current zero.",
          "variants": [],
          "drill": {
            "prompt": "For $G_{slope}=-4\\,\\mathrm{nS}$ and $C=80\\,\\mathrm{pF}$, find the perturbation growth rate.",
            "answer": {
              "value": 50,
              "unit": "1/s",
              "tolerance": 0.15,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 4e-09,
                  "b": 8e-11
                },
                "displayScale": 1
              }
            },
            "tex": "k=-(-4\\times10^{-9})/(80\\times10^{-12})\\,\\mathrm{s^{-1}}",
            "modelAnswer": [
              "Negative momentary current slope amplifies a small displacement."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $k=-G_{slope}/C$."
              },
              {
                "body": "Start with $k=-(-4\\times10^{-9})/(80\\times10^{-12})\\,\\mathrm{s^{-1}}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{k}}=-{\\htmlClass{formula-term-1}{G_{slope}}}/{\\htmlClass{formula-term-2}{C}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L08-moving-iv-check",
          "prompt": "At a momentary current zero, which slope sign gives local instability?",
          "correct": 0,
          "options": [
            {
              "text": "Negative slope with zero applied current",
              "feedback": "A negative slope gives an amplifying current rather than a restoring current."
            },
            {
              "text": "Positive slope with zero applied current",
              "feedback": "A positive slope gives restoring current near the zero in the fast subsystem."
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
            "Negative slope with zero applied current."
          ]
        },
        {
          "id": "L08-moving-iv-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 8:1 p9",
          "prompt": "During sustained depolarization, which slow gating change is taught?",
          "options": [
            {
              "text": "Potassium activation falls; sodium availability rises",
              "feedback": "This reverses the taught depolarization-dependent changes in the slow gates."
            },
            {
              "text": "Potassium activation rises; sodium availability rises",
              "feedback": "Potassium activation rises, but sodium inactivation reduces availability."
            },
            {
              "text": "Potassium activation rises; sodium availability falls",
              "feedback": "Both changes shift the momentary current balance outward."
            }
          ],
          "correct": 2,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "Both changes shift the momentary current balance outward."
            }
          ],
          "modelAnswer": [
            "Both changes shift the momentary current balance outward."
          ]
        }
      ]
    },
    {
      "id": "threshold",
      "title": "Threshold and deterministic versus biological variability",
      "keyTerms": [],
      "source": "L08 8:1 p10",
      "blocks": [
        {
          "type": "text",
          "body": ["A sufficiently rapid depolarization recruits regenerative sodium activation. The deterministic HH model gives the same response for identical initial states and stimuli. Biological variability near threshold is absent unless noise or variability is explicitly introduced.", "Compare trials with the same starting voltage, gate history and stimulus waveform. The model separates recovery toward rest from regenerative depolarization. Experimental trial-to-trial success near threshold is probabilistic, whereas a deterministic fit cannot generate that variability from identical inputs without an added source of noise. (8:1 PDF p10.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:1, PDF page 10. Source threshold panel with original labels and axes.",
            "fallbackAlt": "8:1, PDF page 10. Source threshold panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/threshold.webp', import.meta.url).href,
              "alt": "8:1, PDF page 10. Source threshold panel with original labels and axes.",
              "aspect": 0.9536842105263158,
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
          "id": "L08-threshold-check",
          "prompt": "For identical initial gates and stimuli, how does deterministic HH behave across trials?",
          "correct": 1,
          "options": [
            {
              "text": "Identical stimuli give inherently random responses",
              "feedback": "Identical inputs and initial states do not generate random trials in deterministic HH."
            },
            {
              "text": "Identical stimuli give deterministic responses",
              "feedback": "Fixed inputs and initial states give the same response unless variability is added."
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
            "Identical stimuli give deterministic responses."
          ]
        },
        {
          "id": "L08-threshold-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 8:1 p10",
          "prompt": "Which response begins once rapid excitation recruits sufficient sodium activation?",
          "options": [
            {
              "text": "Regenerative depolarization of the membrane",
              "feedback": "Sodium recruitment reinforces depolarization above threshold."
            },
            {
              "text": "Passive recovery toward the resting voltage",
              "feedback": "Recovery toward rest is the subthreshold alternative to regeneration."
            },
            {
              "text": "Delayed recovery of sodium availability",
              "feedback": "Recovery from inactivation prepares later excitation rather than initiating the fast upstroke."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "Sodium recruitment reinforces depolarization above threshold."
            }
          ],
          "modelAnswer": [
            "Sodium recruitment reinforces depolarization above threshold."
          ]
        }
      ]
    },
    {
      "id": "feedback",
      "title": "Fast positive and slow negative feedback",
      "keyTerms": [],
      "source": "L08 8:1 p11",
      "blocks": [
        {
          "type": "text",
          "body": ["Depolarization increases sodium activation and inward current, which promotes more depolarization. Slower sodium inactivation and potassium activation oppose this cycle and terminate the spike.", "Trace the loop in causal order: activation increases sodium conductance, inward sodium current raises voltage, and higher voltage recruits more activation. Delayed potassium activation and falling sodium availability break that loop. The voltage trace alone does not identify either conductance; interpret it alongside the conductance panel. (8:1 PDF p11.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:1, PDF page 11. Source feedback panel with original labels and axes.",
            "fallbackAlt": "8:1, PDF page 11. Source feedback panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/feedback.webp', import.meta.url).href,
              "alt": "8:1, PDF page 11. Source feedback panel with original labels and axes.",
              "aspect": 2.5098039215686274,
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
          "id": "L08-feedback-check",
          "prompt": "Which link reinforces depolarization during the fast feedback cycle?",
          "correct": 1,
          "options": [
            {
              "text": "Depolarization removes all sodium driving force",
              "feedback": "Reduced sodium driving force limits inward current rather than reinforcing it."
            },
            {
              "text": "Depolarization recruits inward sodium current",
              "feedback": "Rapid sodium recruitment increases inward current, reinforcing depolarization."
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
            "Depolarization recruits inward sodium current."
          ]
        },
        {
          "id": "L08-feedback-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 8:1 p11",
          "prompt": "Which pair belongs to the slow negative feedback cycle?",
          "options": [
            {
              "text": "Sodium recovery and potassium deactivation",
              "feedback": "These describe recovery toward excitability, not the processes terminating the upstroke."
            },
            {
              "text": "Sodium inactivation and potassium activation",
              "feedback": "These slower processes oppose the fast regenerative inward current."
            },
            {
              "text": "Sodium activation and potassium deactivation",
              "feedback": "Sodium activation reinforces depolarization; it is part of the fast positive cycle."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "These slower processes oppose the fast regenerative inward current."
            }
          ],
          "modelAnswer": [
            "These slower processes oppose the fast regenerative inward current."
          ]
        }
      ]
    },
    {
      "id": "phases",
      "title": "Read the AP phases through conductance and driving force",
      "keyTerms": [],
      "source": "L08 8:1 p12",
      "blocks": [
        {
          "type": "text",
          "body": ["Upstroke, peak, repolarization and afterhyperpolarization follow changing gates and driving forces. Current sign cannot be inferred from comparing conductances alone. Slow potassium closure and recovering sodium availability return the membrane toward rest.", "Near the peak, approaching sodium reversal reduces inward sodium current even before every sodium channel closes. Later, persistent potassium conductance pulls voltage toward potassium reversal and produces the undershoot. Always combine a conductance trace with its signed driving force before explaining a current or voltage phase. (8:1 PDF p12.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:1, PDF page 12. Source phases panel with original labels and axes.",
            "fallbackAlt": "8:1, PDF page 12. Source phases panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/phases.webp', import.meta.url).href,
              "alt": "8:1, PDF page 12. Source phases panel with original labels and axes.",
              "aspect": 0.9877049180327869,
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
          "id": "L08-phases-check",
          "prompt": "What permits little sodium current even when many sodium channels are open?",
          "correct": 0,
          "options": [
            {
              "text": "Voltage can approach sodium reversal potential",
              "feedback": "Near sodium reversal the driving force is small despite high conductance."
            },
            {
              "text": "Voltage can stay far from sodium reversal potential",
              "feedback": "Far from reversal, high conductance gives substantial current; near reversal the driving force shrinks."
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
            "Voltage can approach sodium reversal potential."
          ]
        },
        {
          "id": "L08-phases-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 8:1 p12",
          "prompt": "Which persistent conductance contributes to afterhyperpolarization?",
          "options": [
            {
              "text": "Sodium conductance that activates rapidly",
              "feedback": "Fast sodium activation supports the upstroke rather than the potassium-driven undershoot."
            },
            {
              "text": "Leak conductance that inactivates rapidly",
              "feedback": "The taught leak is not a rapidly inactivating branch producing the undershoot."
            },
            {
              "text": "Potassium conductance that closes slowly",
              "feedback": "Persistent potassium conductance draws voltage toward potassium reversal below rest."
            }
          ],
          "correct": 2,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "Persistent potassium conductance draws voltage toward potassium reversal below rest."
            }
          ],
          "modelAnswer": [
            "Persistent potassium conductance draws voltage toward potassium reversal below rest."
          ]
        }
      ]
    },
    {
      "id": "accommodation",
      "title": "Slow ramps and accommodation",
      "keyTerms": [],
      "source": "L08 8:1 p13",
      "blocks": [
        {
          "type": "text",
          "body": ["A slowly rising stimulus allows $n$ to increase and $h$ to fall before regenerative excitation. The threshold increases; an otherwise effective fast stimulus can fail when delivered slowly. This is a kinetic-history effect.", "Compare stimulus rise times while following the voltage response and threshold. The slowly changing momentary curve can lose its regenerative region before a spike starts. Unlike refractoriness, accommodation does not require a preceding action potential; both involve slow gating history, but the experimental triggers differ. (8:1 PDF p13.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:1, PDF page 13. Source accommodation panel with original labels and axes.",
            "fallbackAlt": "8:1, PDF page 13. Source accommodation panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/accommodation.webp', import.meta.url).href,
              "alt": "8:1, PDF page 13. Source accommodation panel with original labels and axes.",
              "aspect": 2.088888888888889,
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
          "id": "L08-accommodation-check",
          "prompt": "What threshold effect can develop while a depolarizing ramp rises slowly?",
          "correct": 0,
          "options": [
            {
              "text": "Raise threshold through slow gating changes",
              "feedback": "Slow potassium activation and sodium inactivation can increase threshold."
            },
            {
              "text": "Lower threshold while all slow gates stay fixed",
              "feedback": "Slow gates change during the ramp; holding them fixed misses accommodation."
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
            "Raise threshold through slow gating changes."
          ]
        },
        {
          "id": "L08-accommodation-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 8:1 p13",
          "prompt": "Which stimulus feature is central to accommodation?",
          "options": [
            {
              "text": "A slowly developing depolarization",
              "feedback": "Slow depolarization permits potassium activation and sodium inactivation before a spike."
            },
            {
              "text": "A brief rapidly rising depolarization",
              "feedback": "A fast rise recruits sodium activation before the slow opposing gates catch up."
            },
            {
              "text": "A delay after a preceding action potential",
              "feedback": "A preceding spike defines refractory recovery; accommodation needs no earlier spike."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "Slow depolarization permits potassium activation and sodium inactivation before a spike."
            }
          ],
          "modelAnswer": [
            "Slow depolarization permits potassium activation and sodium inactivation before a spike."
          ]
        }
      ]
    },
    {
      "id": "refractory",
      "title": "Paired pulses: absolute and relative refractoriness",
      "keyTerms": [],
      "source": "L08 8:1 p14",
      "blocks": [
        {
          "type": "text",
          "body": ["Vary the interval between two stimuli. Early extensive sodium inactivation prevents another spike. Later partial recovery and residual potassium conductance mean a stronger second stimulus may succeed. Record threshold, not just whether identical pulses fail.", "Keep the first pulse reliable and change the second-pulse delay; then vary its strength to distinguish failure from an elevated threshold. Recovery of sodium availability and decay of potassium conductance restore excitability. Failure of one fixed second pulse alone cannot distinguish absolute from relative refractoriness. (8:1 PDF p14.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:1, PDF page 14. Source refractory panel with original labels and axes.",
            "fallbackAlt": "8:1, PDF page 14. Source refractory panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/refractory.webp', import.meta.url).href,
              "alt": "8:1, PDF page 14. Source refractory panel with original labels and axes.",
              "aspect": 0.7012847965738758,
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
          "id": "L08-refractory-check",
          "prompt": "Which outcome identifies the relative rather than absolute refractory period?",
          "correct": 1,
          "options": [
            {
              "text": "No second stimulus strength can trigger a spike",
              "feedback": "Failure at every stimulus strength describes absolute refractoriness."
            },
            {
              "text": "A stronger second stimulus may still trigger a spike",
              "feedback": "Partial recovery permits a second spike if the second stimulus is stronger."
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
            "A stronger second stimulus may still trigger a spike."
          ]
        },
        {
          "id": "L08-refractory-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 8:1 p14",
          "prompt": "What is varied in the taught paired-pulse recovery protocol?",
          "options": [
            {
              "text": "The ratio between two ionic concentrations",
              "feedback": "Concentration changes alter driving forces, not the paired-pulse recovery interval."
            },
            {
              "text": "The interval between two current stimuli",
              "feedback": "Varying delay tests recovery after the first pulse reliably evokes a spike."
            },
            {
              "text": "The spacing between two recording sites",
              "feedback": "Spatial spacing tests propagation rather than recovery time after a first spike."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "Varying delay tests recovery after the first pulse reliably evokes a spike."
            }
          ],
          "modelAnswer": [
            "Varying delay tests recovery after the first pulse reliably evokes a spike."
          ]
        }
      ]
    },
    {
      "id": "sensor",
      "title": "Gating charge differs from ionic permeation",
      "keyTerms": [],
      "source": "L08 8:1 p15",
      "blocks": [
        {
          "type": "text",
          "body": ["Voltage sensors move charged protein regions in the membrane field. Their collective transient produces a gating current even when permeation is blocked. Opening a pore and ions passing through it are distinct events.", "A voltage step moves sensor charge only while the sensor population redistributes, so the signal is transient. Ionic current instead requires an open permeation pathway and a driving force. Blocking pore current helps reveal sensor movement; it does not mean that every remaining transient is necessarily a gating current. (8:1 PDF p15.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:1, PDF page 15. Source sensor panel with original labels and axes.",
            "fallbackAlt": "8:1, PDF page 15. Source sensor panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/sensor.webp', import.meta.url).href,
              "alt": "8:1, PDF page 15. Source sensor panel with original labels and axes.",
              "aspect": 1.965635738831615,
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
          "id": "L08-sensor-check",
          "prompt": "Which charge movement is measured as gating rather than ionic current?",
          "correct": 1,
          "options": [
            {
              "text": "Movement of sodium ions through an open pore",
              "feedback": "Pore permeation is ionic current, distinct from sensor charge displacement."
            },
            {
              "text": "Movement of channel voltage-sensor charge",
              "feedback": "Moving charged protein sensors creates a transient gating current."
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
            "Movement of channel voltage-sensor charge."
          ]
        },
        {
          "id": "L08-sensor-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 8:1 p15",
          "prompt": "When does a voltage sensor produce its transient current?",
          "options": [
            {
              "text": "While ions pass steadily through its pore",
              "feedback": "Steady ionic permeation is distinct from transient movement of sensor charge."
            },
            {
              "text": "While membrane voltage stays at its plateau",
              "feedback": "A maintained voltage does not require sustained sensor movement after equilibration."
            },
            {
              "text": "While its charge redistributes after a step",
              "feedback": "Current reflects sensor charge movement, so it decays when redistribution ends."
            }
          ],
          "correct": 2,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "Current reflects sensor charge movement, so it decays when redistribution ends."
            }
          ],
          "modelAnswer": [
            "Current reflects sensor charge movement, so it decays when redistribution ends."
          ]
        }
      ],
      "part": {
        "id": "measurement",
        "number": 2,
        "title": "Gating charge and membrane measurements"
      }
    },
    {
      "id": "boltzmann",
      "title": "Two-state energies and normalized probability",
      "keyTerms": [],
      "source": "L08 8:1 p16–17",
      "blocks": [
        {
          "type": "text",
          "body": ["The source odds are $r=\\exp((w+zeV)/kT)$. With probabilities summing to one, $y_{out}=r/(1+r)$. The slide’s minus denominator is a typo. This two-state illustration is not the full sodium $m^3h$ model.", "Here $w$ is the zero-voltage energy bias, $ze$ the displaced charge, and $kT$ thermal energy. Positive odds are not probabilities: divide by one plus the odds to keep the result between zero and one. The explorer uses dimensionless bias and thermal voltage to express this same normalization. (8:1 PDF p16–17.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:1, PDF page 16. Source energy panel with original labels and axes.",
            "fallbackAlt": "8:1, PDF page 16. Source energy panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/energy.webp', import.meta.url).href,
              "alt": "8:1, PDF page 16. Source energy panel with original labels and axes.",
              "aspect": 1.0874074074074074,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        },
        {
          "type": "misconception",
          "wrong": "The source prints $y=r/(1-r)$.",
          "right": "Normalization gives $y=r/(1+r)$; probability remains between zero and one."
        }
      ],
      "formulas": [
        {
          "id": "L08-f-energy",
          "name": "Gating-charge energy scale",
          "tex": "\\Delta G=zeV",
          "symbols": [
            {
              "tex": "\\Delta G",
              "name": "Electrical work scale",
              "unit": "\\mathrm J",
              "meaning": "Electrical work scale in the stated model."
            },
            {
              "tex": "z",
              "name": "Effective charge number",
              "unit": "1",
              "meaning": "Effective charge number in the stated model."
            },
            {
              "tex": "e",
              "name": "Elementary charge",
              "unit": "\\mathrm C",
              "meaning": "Elementary charge in the stated model."
            },
            {
              "tex": "V",
              "name": "Voltage displacement",
              "unit": "\\mathrm V",
              "meaning": "Voltage displacement in the stated model."
            }
          ],
          "reads": "Voltage changes the energy of a displaced charge.",
          "assumes": "Work convention as stated; state-energy odds use source sign definition.",
          "variants": [],
          "drill": {
            "prompt": "For displaced charge $ze=8\\times10^{-19}\\,\\mathrm C$ and voltage displacement $0.010\\,\\mathrm V$, find electrical work.",
            "answer": {
              "value": 8e-21,
              "unit": "J",
              "tolerance": 2.4e-23,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 8e-19,
                  "b": 0.01
                },
                "displayScale": 1
              }
            },
            "tex": "\\Delta G=(8\\times10^{-19})(0.010)\\,\\mathrm J",
            "modelAnswer": [
              "Voltage changes the energy of a displaced charge."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\Delta G=zeV$."
              },
              {
                "body": "Start with $\\Delta G=(8\\times10^{-19})(0.010)\\,\\mathrm J$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{\\Delta G}}={\\htmlClass{formula-term-1}{z}}{\\htmlClass{formula-term-2}{e}}{\\htmlClass{formula-term-3}{V}}"
        },
        {
          "id": "L08-f-odds",
          "name": "Boltzmann state odds",
          "tex": "r=e^x,\\quad x=(w+zeV)/(kT)",
          "symbols": [
            {
              "tex": "r",
              "name": "State odds",
              "unit": "1",
              "meaning": "State odds in the stated model."
            },
            {
              "tex": "x",
              "name": "Dimensionless energy bias",
              "unit": "1",
              "meaning": "Dimensionless energy bias in the stated model."
            }
          ],
          "reads": "State odds grow exponentially with activation-favoring bias.",
          "assumes": "Two states with source energy convention.",
          "variants": [],
          "drill": {
            "prompt": "For dimensionless bias $x=\\ln 3$, find outside/inside odds.",
            "answer": {
              "value": 3,
              "unit": "",
              "tolerance": 0.009000000000000001,
              "verification": {
                "relation": "exponentialRate",
                "inputs": {
                  "base": 1,
                  "exponent": 1.0986122886681098
                },
                "displayScale": 1
              }
            },
            "tex": "r=e^{\\ln 3}",
            "modelAnswer": [
              "State odds grow exponentially with activation-favoring bias."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $r=e^x,\\quad x=(w+zeV)/(kT)$."
              },
              {
                "body": "Start with $r=e^{\\ln 3}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{r}}=e^{\\htmlClass{formula-term-1}{x}},\\quad {\\htmlClass{formula-term-1}{x}}=(w+zeV)/(kT)"
        },
        {
          "id": "L08-f-probability",
          "name": "Normalized two-state probability",
          "tex": "y=\\frac{1}{1+e^{-(b+zV/V_T)}}",
          "symbols": [
            {
              "tex": "y",
              "name": "Permissive probability",
              "unit": "1",
              "meaning": "Permissive probability in the stated model."
            },
            {
              "tex": "b",
              "name": "Zero-voltage bias",
              "unit": "1",
              "meaning": "Zero-voltage bias in the stated model."
            },
            {
              "tex": "z",
              "name": "Effective charge",
              "unit": "1",
              "meaning": "Effective charge in the stated model."
            },
            {
              "tex": "V",
              "name": "Inside voltage",
              "unit": "\\mathrm V",
              "meaning": "Inside voltage in the stated model."
            },
            {
              "tex": "V_T",
              "name": "Thermal voltage",
              "unit": "\\mathrm V",
              "meaning": "Thermal voltage in the stated model."
            }
          ],
          "reads": "Normalization keeps activation bounded while odds grow.",
          "assumes": "Two-state illustration, not the full sodium conductance.",
          "variants": [],
          "drill": {
            "prompt": "Let $b=0$, $z=2$, $V=0.010\\,\\mathrm V$, and $V_T=0.025\\,\\mathrm V$. Find the permissive probability.",
            "answer": {
              "value": 0.6899744811276125,
              "unit": "",
              "tolerance": 0.0020699234433828374,
              "verification": {
                "relation": "boltzmann",
                "inputs": {
                  "bias": 0,
                  "z": 2,
                  "voltage": 0.01,
                  "thermal": 0.025
                },
                "displayScale": 1
              }
            },
            "tex": "y=(1+e^{-0.8})^{-1}",
            "modelAnswer": [
              "Normalization keeps activation bounded while odds grow."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $y=\\frac{1}{1+e^{-(b+zV/V_T)}}$."
              },
              {
                "body": "Start with $y=(1+e^{-0.8})^{-1}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{y}}=\\frac{1}{1+e^{-({\\htmlClass{formula-term-1}{b}}+{\\htmlClass{formula-term-2}{z}}{\\htmlClass{formula-term-3}{V}}/{\\htmlClass{formula-term-4}{V_T}})}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L08-boltzmann-check",
          "prompt": "Which denominator keeps a positive outside-to-inside odds ratio bounded as a probability?",
          "correct": 0,
          "options": [
            {
              "text": "$1+r$, so probability stays bounded",
              "feedback": "Dividing positive odds by one plus those odds gives a bounded probability."
            },
            {
              "text": "$1-r$, so probability stays bounded",
              "feedback": "One minus the odds can vanish or become negative, so it cannot normalize probability."
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
            "$1+r$, so probability stays bounded."
          ]
        },
        {
          "id": "L08-boltzmann-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 8:1 p16–17",
          "prompt": "What does the zero-voltage bias describe in the two-state model?",
          "options": [
            {
              "text": "An energy preference between sensor states",
              "feedback": "Bias specifies the relative state energies before the voltage contribution is added."
            },
            {
              "text": "An ionic concentration ratio across the pore",
              "feedback": "Ion concentrations set permeation driving forces rather than this sensor-state energy bias."
            },
            {
              "text": "A relaxation time between sensor states",
              "feedback": "The equilibrium bias describes state preference, not how quickly states interconvert."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "Bias specifies the relative state energies before the voltage contribution is added."
            }
          ],
          "modelAnswer": [
            "Bias specifies the relative state energies before the voltage contribution is added."
          ]
        }
      ]
    },
    {
      "id": "charge-slope",
      "title": "Low-activation slope estimates effective gating charge",
      "keyTerms": [],
      "source": "L08 8:1 p17",
      "blocks": [
        {
          "type": "text",
          "body": ["At small activation, conductance is approximately exponential in voltage. An e-fold voltage scale $s$ gives effective $z=(kT/e)/s$. Use the source rounded thermal voltage only for its stated room-temperature approximation.", "An e-fold rise means multiplication by the exponential base for each voltage increment $s$. Estimate the slope only in the low-activation region, before saturation bends the curve. The inferred effective charge describes voltage sensitivity under this approximation, rather than directly counting anatomical particles in one channel. (8:1 PDF p17.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:1, PDF page 17. Source slope panel with original labels and axes.",
            "fallbackAlt": "8:1, PDF page 17. Source slope panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/slope.webp', import.meta.url).href,
              "alt": "8:1, PDF page 17. Source slope panel with original labels and axes.",
              "aspect": 1.823030303030303,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L08-f-z",
          "name": "Effective charge from an e-fold scale",
          "tex": "z=V_T/s",
          "symbols": [
            {
              "tex": "z",
              "name": "Effective charge number",
              "unit": "1",
              "meaning": "Effective charge number in the stated model."
            },
            {
              "tex": "V_T",
              "name": "Thermal voltage",
              "unit": "\\mathrm V",
              "meaning": "Thermal voltage in the stated model."
            },
            {
              "tex": "s",
              "name": "E-fold voltage scale",
              "unit": "\\mathrm V",
              "meaning": "E-fold voltage scale in the stated model."
            }
          ],
          "reads": "A steeper log-conductance slope implies a larger effective charge.",
          "assumes": "Low-activation exponential regime; source rounded thermal voltage.",
          "variants": [],
          "drill": {
            "prompt": "Use $V_T=25\\,\\mathrm{mV}$ and e-fold scale $s=5\\,\\mathrm{mV}$. Find effective charge number.",
            "answer": {
              "value": 5,
              "unit": "",
              "tolerance": 0.015,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 0.025,
                  "b": 0.005
                },
                "displayScale": 1
              }
            },
            "tex": "z=0.025/0.005",
            "modelAnswer": [
              "A steeper log-conductance slope implies a larger effective charge."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $z=V_T/s$."
              },
              {
                "body": "Start with $z=0.025/0.005$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{z}}={\\htmlClass{formula-term-1}{V_T}}/{\\htmlClass{formula-term-2}{s}}"
        },
        {
          "id": "L08-f-efold",
          "name": "Low-activation conductance ratio",
          "tex": "g_2/g_1=e^{\\Delta V/s}",
          "symbols": [
            {
              "tex": "g_2/g_1",
              "name": "Conductance ratio",
              "unit": "1",
              "meaning": "Conductance ratio in the stated model."
            },
            {
              "tex": "\\Delta V",
              "name": "Voltage increment",
              "unit": "\\mathrm V",
              "meaning": "Voltage increment in the stated model."
            },
            {
              "tex": "s",
              "name": "E-fold voltage scale",
              "unit": "\\mathrm V",
              "meaning": "E-fold voltage scale in the stated model."
            }
          ],
          "reads": "A voltage increment multiplies low-activation conductance.",
          "assumes": "Both voltages remain in the exponential regime.",
          "variants": [],
          "drill": {
            "prompt": "For $\\Delta V=10\\,\\mathrm{mV}$ and $s=5\\,\\mathrm{mV}$, find the conductance ratio.",
            "answer": {
              "value": 7.38905609893065,
              "unit": "",
              "tolerance": 0.022167168296791953,
              "verification": {
                "relation": "exponentialRate",
                "inputs": {
                  "base": 1,
                  "exponent": 2
                },
                "displayScale": 1
              }
            },
            "tex": "g_2/g_1=e^{0.010/0.005}",
            "modelAnswer": [
              "A voltage increment multiplies low-activation conductance."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $g_2/g_1=e^{\\Delta V/s}$."
              },
              {
                "body": "Start with $g_2/g_1=e^{0.010/0.005}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{g_2/g_1}}=e^{{\\htmlClass{formula-term-1}{\\Delta V}}/{\\htmlClass{formula-term-2}{s}}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L08-charge-slope-check",
          "prompt": "How should a charge estimated from low-activation voltage sensitivity be interpreted?",
          "correct": 0,
          "options": [
            {
              "text": "An effective displaced charge under the stated model",
              "feedback": "The estimate describes voltage sensitivity under the model assumptions."
            },
            {
              "text": "An exact count of independently hinged protein gates",
              "feedback": "A slope-derived effective charge is not an anatomical count of hinged gates."
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
            "An effective displaced charge under the stated model."
          ]
        },
        {
          "id": "L08-charge-slope-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 8:1 p17",
          "prompt": "Where is the exponential conductance approximation used?",
          "options": [
            {
              "text": "In the reversal region of the current trace",
              "feedback": "Current reversal concerns driving force, not the low-activation conductance approximation."
            },
            {
              "text": "In the low-activation part of the curve",
              "feedback": "At low activation the normalized probability is approximated by its small odds."
            },
            {
              "text": "In the saturated high-activation plateau",
              "feedback": "Saturation bends the curve away from exponential growth."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "At low activation the normalized probability is approximated by its small odds."
            }
          ],
          "modelAnswer": [
            "At low activation the normalized probability is approximated by its small odds."
          ]
        }
      ]
    },
    {
      "id": "isolation",
      "title": "Isolate ON and OFF gating current",
      "keyTerms": [],
      "source": "L08 8:1 p18",
      "blocks": [
        {
          "type": "text",
          "body": ["Suppress ionic current, then subtract linear capacitance with matched control steps having minimal sensor movement. For the taught depolarization-activated sensor, ON charge is outward and OFF charge inward. Poor subtraction can mimic a gating signal.", "Voltage is controlled and total clamp current is measured. The taught protocol suppresses sodium permeation with sodium-free solution and TTX, and potassium current with internal cesium. Opposite control steps cancel linear charging only if sensor movement is negligible in the control; test control-step dependence before integrating the residual. (8:1 PDF p18.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:1, PDF page 18. Source gating panel with original labels and axes.",
            "fallbackAlt": "8:1, PDF page 18. Source gating panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/gating.webp', import.meta.url).href,
              "alt": "8:1, PDF page 18. Source gating panel with original labels and axes.",
              "aspect": 2.0232558139534884,
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
          "id": "L08-isolation-check",
          "prompt": "After ionic block and matched capacitive subtraction, which transient is sought?",
          "correct": 1,
          "options": [
            {
              "text": "Linear membrane-capacitance charging of the step",
              "feedback": "Linear capacitive charging should be removed along with ionic current."
            },
            {
              "text": "Nonlinear gating-charge movement of the sensors",
              "feedback": "Valid subtraction leaves nonlinear sensor movement rather than ordinary linear charging."
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
            "Nonlinear gating-charge movement of the sensors."
          ]
        },
        {
          "id": "L08-isolation-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 8:1 p18",
          "prompt": "For the taught depolarization-activated sensor, what is the ON current direction?",
          "options": [
            {
              "text": "Inward during sensor activation",
              "feedback": "Inward is the taught OFF return direction, not the ON direction."
            },
            {
              "text": "Outward during sensor deactivation",
              "feedback": "Outward describes activation here; deactivation returns charge inward."
            },
            {
              "text": "Outward during sensor activation",
              "feedback": "Depolarization moves the taught positive sensor charge outward; OFF movement reverses it."
            }
          ],
          "correct": 2,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "Depolarization moves the taught positive sensor charge outward; OFF movement reverses it."
            }
          ],
          "modelAnswer": [
            "Depolarization moves the taught positive sensor charge outward; OFF movement reverses it."
          ]
        }
      ]
    },
    {
      "id": "capacitance",
      "title": "Measure capacitance from leak-corrected charge",
      "keyTerms": [],
      "source": "L08 8:1 p19",
      "blocks": [
        {
          "type": "text",
          "body": ["Subtract the steady leak before integrating the transient. Then $C_m=Q/\\Delta V$. With constant specific capacitance, area follows from total capacitance. Current per capacitance is a size-normalized measure, not literally current per area without the conversion.", "Control the voltage step and measure the current transient above the steady leak baseline. Integrating only an early window misses charge and underestimates capacitance. For the stated exponential model the charge explorer quantifies this loss. Unremoved gating or ionic currents contaminate the area and therefore the inferred cell size. (8:1 PDF p19.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:1, PDF page 19. Source capacitance panel with original labels and axes.",
            "fallbackAlt": "8:1, PDF page 19. Source capacitance panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/capacitance.webp', import.meta.url).href,
              "alt": "8:1, PDF page 19. Source capacitance panel with original labels and axes.",
              "aspect": 1.642570281124498,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L08-f-charge",
          "name": "Integrate an ideal exponential transient",
          "tex": "Q(t)=I_0\\tau(1-e^{-t/\\tau})",
          "symbols": [
            {
              "tex": "Q(t)",
              "name": "Accumulated charge",
              "unit": "\\mathrm C",
              "meaning": "Accumulated charge in the stated model."
            },
            {
              "tex": "I_0",
              "name": "Initial corrected current",
              "unit": "\\mathrm A",
              "meaning": "Initial corrected current in the stated model."
            },
            {
              "tex": "\\tau",
              "name": "Decay time constant",
              "unit": "\\mathrm s",
              "meaning": "Decay time constant in the stated model."
            },
            {
              "tex": "t",
              "name": "Integration interval",
              "unit": "\\mathrm s",
              "meaning": "Integration interval in the stated model."
            }
          ],
          "reads": "The integral saturates as the corrected transient decays.",
          "assumes": "Explicit ideal exponential, not a fit asserted for the source trace.",
          "variants": [],
          "drill": {
            "prompt": "An ideal corrected transient has $I_0=1\\,\\mathrm{nA}$, $\\tau=1\\,\\mathrm{ms}$. Find charge integrated to $2\\,\\mathrm{ms}$.",
            "answer": {
              "value": 8.646647167633873e-13,
              "unit": "C",
              "tolerance": 2.5939941502901618e-15,
              "verification": {
                "relation": "expCharge",
                "inputs": {
                  "current": 1e-09,
                  "tau": 0.001,
                  "time": 0.002
                },
                "displayScale": 1
              }
            },
            "tex": "Q=10^{-9}(10^{-3})(1-e^{-2})\\,\\mathrm C",
            "modelAnswer": [
              "The integral saturates as the corrected transient decays."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $Q(t)=I_0\\tau(1-e^{-t/\\tau})$."
              },
              {
                "body": "Start with $Q=10^{-9}(10^{-3})(1-e^{-2})\\,\\mathrm C$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{Q(t)}}={\\htmlClass{formula-term-1}{I_0}}{\\htmlClass{formula-term-2}{\\tau}}(1-e^{-{\\htmlClass{formula-term-3}{t}}/{\\htmlClass{formula-term-2}{\\tau}}})"
        },
        {
          "id": "L08-f-cap",
          "name": "Capacitance from charge",
          "tex": "C=Q/\\Delta V",
          "symbols": [
            {
              "tex": "C",
              "name": "Total capacitance",
              "unit": "\\mathrm F",
              "meaning": "Total capacitance in the stated model."
            },
            {
              "tex": "Q",
              "name": "Corrected charge",
              "unit": "\\mathrm C",
              "meaning": "Corrected charge in the stated model."
            },
            {
              "tex": "\\Delta V",
              "name": "Voltage step",
              "unit": "\\mathrm V",
              "meaning": "Voltage step in the stated model."
            }
          ],
          "reads": "The charge needed for a voltage step measures capacitance.",
          "assumes": "Linear capacitance, leak and gating corrections accounted for.",
          "variants": [],
          "drill": {
            "prompt": "A corrected charge is $0.6\\,\\mathrm{pC}$ for a $10\\,\\mathrm{mV}$ step. Find capacitance.",
            "answer": {
              "value": 6e-11,
              "unit": "F",
              "tolerance": 1.8e-13,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 6e-13,
                  "b": 0.01
                },
                "displayScale": 1
              }
            },
            "tex": "C=0.6\\times10^{-12}/0.010\\,\\mathrm F",
            "modelAnswer": [
              "The charge needed for a voltage step measures capacitance."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $C=Q/\\Delta V$."
              },
              {
                "body": "Start with $C=0.6\\times10^{-12}/0.010\\,\\mathrm F$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{C}}={\\htmlClass{formula-term-1}{Q}}/{\\htmlClass{formula-term-2}{\\Delta V}}"
        },
        {
          "id": "L08-f-area",
          "name": "Area from specific capacitance",
          "tex": "A=C/c_m",
          "symbols": [
            {
              "tex": "A",
              "name": "Membrane area",
              "unit": "\\mathrm{m^2}",
              "meaning": "Membrane area in the stated model."
            },
            {
              "tex": "C",
              "name": "Total capacitance",
              "unit": "\\mathrm F",
              "meaning": "Total capacitance in the stated model."
            },
            {
              "tex": "c_m",
              "name": "Specific capacitance",
              "unit": "\\mathrm{F/m^2}",
              "meaning": "Specific capacitance in the stated model."
            }
          ],
          "reads": "Capacitance estimates area under a specific-capacitance assumption.",
          "assumes": "Source specific capacitance treated constant.",
          "variants": [],
          "drill": {
            "prompt": "For $C=60\\,\\mathrm{pF}$ and $c_m=0.01\\,\\mathrm{F/m^2}$, find area.",
            "answer": {
              "value": 6e-09,
              "unit": "m2",
              "tolerance": 1.8e-11,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 6e-11,
                  "b": 0.01
                },
                "displayScale": 1
              }
            },
            "tex": "A=60\\times10^{-12}/0.01\\,\\mathrm{m^2}",
            "modelAnswer": [
              "Capacitance estimates area under a specific-capacitance assumption."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $A=C/c_m$."
              },
              {
                "body": "Start with $A=60\\times10^{-12}/0.01\\,\\mathrm{m^2}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{A}}={\\htmlClass{formula-term-1}{C}}/{\\htmlClass{formula-term-2}{c_m}}"
        },
        {
          "id": "L08-f-normalize",
          "name": "Current per capacitance",
          "tex": "j_C=I/C",
          "symbols": [
            {
              "tex": "j_C",
              "name": "Size-normalized current",
              "unit": "\\mathrm{A/F}",
              "meaning": "Size-normalized current in the stated model."
            },
            {
              "tex": "I",
              "name": "Total current",
              "unit": "\\mathrm A",
              "meaning": "Total current in the stated model."
            },
            {
              "tex": "C",
              "name": "Total capacitance",
              "unit": "\\mathrm F",
              "meaning": "Total capacitance in the stated model."
            }
          ],
          "reads": "Normalization separates current scale from cell size.",
          "assumes": "Capacitance is a comparable size proxy.",
          "variants": [],
          "drill": {
            "prompt": "For $I=-300\\,\\mathrm{pA}$ and $C=60\\,\\mathrm{pF}$, find current per capacitance.",
            "answer": {
              "value": -5,
              "unit": "A/F",
              "tolerance": 0.015,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": -3e-10,
                  "b": 6e-11
                },
                "displayScale": 1
              }
            },
            "tex": "j_C=-300\\times10^{-12}/(60\\times10^{-12})\\,\\mathrm{A/F}",
            "modelAnswer": [
              "Normalization separates current scale from cell size."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $j_C=I/C$."
              },
              {
                "body": "Start with $j_C=-300\\times10^{-12}/(60\\times10^{-12})\\,\\mathrm{A/F}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{j_C}}={\\htmlClass{formula-term-1}{I}}/{\\htmlClass{formula-term-2}{C}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L08-capacitance-check",
          "prompt": "Which current trace should supply the charge integral for a capacitance estimate?",
          "correct": 0,
          "options": [
            {
              "text": "Transient current after steady leak subtraction",
              "feedback": "Leak subtraction isolates the charging transient before integration."
            },
            {
              "text": "Total current including steady leak throughout",
              "feedback": "Steady leak adds charge throughout the window and contaminates the capacitance estimate."
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
            "Transient current after steady leak subtraction."
          ]
        },
        {
          "id": "L08-capacitance-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 8:1 p19",
          "prompt": "What must be assumed when using capacitance to estimate membrane area?",
          "options": [
            {
              "text": "Specific membrane capacitance is constant",
              "feedback": "Area follows from total capacitance divided by the assumed specific capacitance."
            },
            {
              "text": "Total membrane capacitance is constant",
              "feedback": "Total capacitance varies with membrane area under the taught assumption."
            },
            {
              "text": "Membrane leak conductance is constant",
              "feedback": "Leak subtraction is needed, but a constant leak alone does not convert capacitance to area."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "Area follows from total capacitance divided by the assumed specific capacitance."
            }
          ],
          "modelAnswer": [
            "Area follows from total capacitance divided by the assumed specific capacitance."
          ]
        }
      ]
    },
    {
      "id": "density",
      "title": "Gating charge, channel density and single-channel conductance",
      "keyTerms": [],
      "source": "L08 8:1 p20",
      "blocks": [
        {
          "type": "text",
          "body": ["Integrated sensor current gives displaced charge. Divide charge density by displaced charge per channel to estimate channel density. Divide maximal ionic conductance density by channel density to estimate single-channel conductance. State complete activation and charge-assignment assumptions.", "Keep gating charge and conductance on the same membrane-area basis before dividing. A charge assignment per channel converts the measured integral into channel number, not open probability. If the ionic conductance is measured before full activation, its ratio to channel density gives conductance times open probability instead. (8:1 PDF p20.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:1, PDF page 20. Source charge panel with original labels and axes.",
            "fallbackAlt": "8:1, PDF page 20. Source charge panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/charge.webp', import.meta.url).href,
              "alt": "8:1, PDF page 20. Source charge panel with original labels and axes.",
              "aspect": 1.852803738317757,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L08-f-density",
          "name": "Channel density from gating charge",
          "tex": "D=Q_A/(ze)",
          "symbols": [
            {
              "tex": "D",
              "name": "Channel density",
              "unit": "\\mathrm{m^{-2}}",
              "meaning": "Channel density in the stated model."
            },
            {
              "tex": "Q_A",
              "name": "Charge density",
              "unit": "\\mathrm{C/m^2}",
              "meaning": "Charge density in the stated model."
            },
            {
              "tex": "ze",
              "name": "Displaced charge per channel",
              "unit": "\\mathrm C",
              "meaning": "Displaced charge per channel in the stated model."
            }
          ],
          "reads": "Total displaced charge counts participating channels under the charge assumption.",
          "assumes": "Complete known charge displacement per channel.",
          "variants": [],
          "drill": {
            "prompt": "Charge density is $0.0048\\,\\mathrm{C/m^2}$ and each channel moves $8\\times10^{-19}\\,\\mathrm C$. Find channel density.",
            "answer": {
              "value": 6000000000000000.0,
              "unit": "1/m2",
              "tolerance": 18000000000000.0,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 0.0048,
                  "b": 8e-19
                },
                "displayScale": 1
              }
            },
            "tex": "D=0.0048/(8\\times10^{-19})\\,\\mathrm{m^{-2}}",
            "modelAnswer": [
              "Total displaced charge counts participating channels under the charge assumption."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $D=Q_A/(ze)$."
              },
              {
                "body": "Start with $D=0.0048/(8\\times10^{-19})\\,\\mathrm{m^{-2}}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{D}}={\\htmlClass{formula-term-1}{Q_A}}/({\\htmlClass{formula-term-2}{ze}})"
        },
        {
          "id": "L08-f-single",
          "name": "Single-channel conductance",
          "tex": "\\gamma=\\bar g_A/D",
          "symbols": [
            {
              "tex": "\\gamma",
              "name": "Single-channel conductance",
              "unit": "\\mathrm S",
              "meaning": "Single-channel conductance in the stated model."
            },
            {
              "tex": "\\bar g_A",
              "name": "Maximum conductance density",
              "unit": "\\mathrm{S/m^2}",
              "meaning": "Maximum conductance density in the stated model."
            },
            {
              "tex": "D",
              "name": "Channel density",
              "unit": "\\mathrm{m^{-2}}",
              "meaning": "Channel density in the stated model."
            }
          ],
          "reads": "Maximal conductance divided by participating channel count gives one-channel conductance.",
          "assumes": "Same area basis and fully activated assigned channel population.",
          "variants": [],
          "drill": {
            "prompt": "For $\\bar g_A=1200\\,\\mathrm{S/m^2}$ and $D=3\\times10^{14}\\,\\mathrm{m^{-2}}$, find single-channel conductance.",
            "answer": {
              "value": 4e-12,
              "unit": "S",
              "tolerance": 1.2e-14,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 1200,
                  "b": 300000000000000.0
                },
                "displayScale": 1
              }
            },
            "tex": "\\gamma=1200/(3\\times10^{14})\\,\\mathrm S",
            "modelAnswer": [
              "Maximal conductance divided by participating channel count gives one-channel conductance."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\gamma=\\bar g_A/D$."
              },
              {
                "body": "Start with $\\gamma=1200/(3\\times10^{14})\\,\\mathrm S$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{\\gamma}}={\\htmlClass{formula-term-1}{\\bar g_A}}/{\\htmlClass{formula-term-2}{D}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L08-density-check",
          "prompt": "Which conductance measurement supports unitary-conductance inference from channel density?",
          "correct": 0,
          "options": [
            {
              "text": "Maximal conductance normalized to the same area",
              "feedback": "Maximal conductance and channel density on the same area basis yield unitary conductance."
            },
            {
              "text": "Arbitrary transient current normalized to voltage",
              "feedback": "An arbitrary current divided by voltage does not establish full activation or matching channel density."
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
            "Maximal conductance normalized to the same area."
          ]
        },
        {
          "id": "L08-density-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 8:1 p20",
          "prompt": "What is obtained by dividing gating-charge density by charge moved per channel?",
          "options": [
            {
              "text": "Conductance per membrane channel",
              "feedback": "Single-channel conductance needs a conductance measurement as well as channel density."
            },
            {
              "text": "Channel number per membrane area",
              "feedback": "The assigned charge per channel converts total displaced charge density into channel density."
            },
            {
              "text": "Ionic current per membrane area",
              "feedback": "Current is charge per time; this division instead counts channels per area."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "The assigned charge per channel converts total displaced charge density into channel density."
            }
          ],
          "modelAnswer": [
            "The assigned charge per channel converts total displaced charge density into channel density."
          ]
        }
      ]
    },
    {
      "id": "synthesis",
      "title": "HH synthesis and limits",
      "keyTerms": [],
      "source": "L08 8:1 p21–22",
      "blocks": [
        {
          "type": "text",
          "body": ["The HH circuit combines voltage-dependent conductances, gating kinetics and current balance. It explains threshold, refractory history and accommodation. Gating-charge measurements test sensor movement but do not turn fitted particle exponents into literal anatomical gate counts.", "A complete dynamic calculation needs initial voltage and gate values, stimulus, gating kinetics and the current-balance equation. Fixed-gate ionic branches can be linear even though the evolving membrane is nonlinear. Compare the source voltage-clamp measurements with the resulting action-potential prediction without treating the fitted model as a unique channel structure. (8:1 PDF p21–22.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:1, PDF page 2. Source circuit panel with original labels and axes.",
            "fallbackAlt": "8:1, PDF page 2. Source circuit panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/circuit.webp', import.meta.url).href,
              "alt": "8:1, PDF page 2. Source circuit panel with original labels and axes.",
              "aspect": 1.0910652920962198,
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
          "id": "L08-synthesis-check",
          "prompt": "What combination determines the evolving voltage in a free-running HH membrane?",
          "correct": 1,
          "options": [
            {
              "text": "Gating probabilities without any membrane current balance",
              "feedback": "Gate probabilities alone do not determine a free-running membrane voltage."
            },
            {
              "text": "Gating kinetics together with membrane current balance",
              "feedback": "Current balance evolves voltage while gating kinetics evolve conductances."
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
            "Gating kinetics together with membrane current balance."
          ]
        },
        {
          "id": "L08-synthesis-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 8:1 p21–22",
          "prompt": "At fixed gate values, how does each HH ionic current depend on voltage?",
          "options": [
            {
              "text": "Exponentially through its signed driving force",
              "feedback": "Voltage-dependent gates add nonlinearity; a frozen HH branch is linear."
            },
            {
              "text": "Independently of its signed driving force",
              "feedback": "Even frozen channels carry current according to voltage minus reversal."
            },
            {
              "text": "Linearly through its signed driving force",
              "feedback": "At frozen conductance the ionic branch is Ohmic, with its own reversal potential."
            }
          ],
          "correct": 2,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "At frozen conductance the ionic branch is Ohmic, with its own reversal potential."
            }
          ],
          "modelAnswer": [
            "At frozen conductance the ionic branch is Ohmic, with its own reversal potential."
          ]
        }
      ]
    },
    {
      "id": "ais",
      "title": "Initiation at AIS and directions of propagation",
      "keyTerms": [],
      "source": "L08 8:2 p1–2",
      "blocks": [
        {
          "type": "text",
          "body": ["High sodium-channel density gives the initial segment a low threshold. Activity propagates toward terminals and can backpropagate toward soma and dendrites. The refractory wake prevents immediate re-excitation; it does not prohibit all backward spread.", "The diagram separates initiation from the routes followed afterward. High local excitability explains why the initial segment reaches threshold first; axial current then recruits available membrane on either side. Backpropagation toward the soma is compatible with a refractory wake behind a wave already advancing toward the terminals. (8:2 PDF p1–2.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:2, PDF page 2. Source ais panel with original labels and axes.",
            "fallbackAlt": "8:2, PDF page 2. Source ais panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/ais.webp', import.meta.url).href,
              "alt": "8:2, PDF page 2. Source ais panel with original labels and axes.",
              "aspect": 0.7215639810426541,
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
          "id": "L08-ais-check",
          "prompt": "Which site usually reaches spike threshold first near the soma?",
          "correct": 1,
          "options": [
            {
              "text": "The myelin-covered center of each internode",
              "feedback": "Covered internodal membrane is not the usual low-threshold initiation site."
            },
            {
              "text": "The sodium-channel-rich axon initial segment",
              "feedback": "High sodium-channel density makes the initial segment especially excitable."
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
            "The sodium-channel-rich axon initial segment."
          ]
        },
        {
          "id": "L08-ais-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 8:2 p1–2",
          "prompt": "Where does backpropagation from the initial segment travel?",
          "options": [
            {
              "text": "Back toward the soma and dendrites",
              "feedback": "Backward spread from the initiation region can invade soma and dendrites."
            },
            {
              "text": "Toward the axonal synaptic terminals",
              "feedback": "That is forward axonal propagation in the source description."
            },
            {
              "text": "Toward the center of a myelin sheath",
              "feedback": "Myelin is insulation, not the somatodendritic destination of backpropagation."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "Backward spread from the initiation region can invade soma and dendrites."
            }
          ],
          "modelAnswer": [
            "Backward spread from the initiation region can invade soma and dendrites."
          ]
        }
      ],
      "part": {
        "id": "saltatory",
        "number": 3,
        "title": "Saltatory propagation"
      }
    },
    {
      "id": "diameter",
      "title": "Unmyelinated conduction and diameter trade-off",
      "keyTerms": [],
      "source": "L08 8:2 p3",
      "blocks": [
        {
          "type": "text",
          "body": ["Unmyelinated speed scales approximately as $\\sqrt d$ under comparable membrane properties. Giant diameter can improve speed at a large volume cost. Improved insulation offers another route.", "For comparisons, take the square root of the diameter ratio rather than applying the diameter ratio directly to speed. This scaling holds other membrane properties comparable. The cross sections illustrate the space cost of a giant axon; they do not establish a universal speed coefficient for all unmyelinated fibers. (8:2 PDF p3.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:2, PDF page 3. Source diameter panel with original labels and axes.",
            "fallbackAlt": "8:2, PDF page 3. Source diameter panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/diameter.webp', import.meta.url).href,
              "alt": "8:2, PDF page 3. Source diameter panel with original labels and axes.",
              "aspect": 0.6362139917695473,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L08-f-unmyelin",
          "name": "Unmyelinated speed ratio",
          "tex": "v_2/v_1=\\sqrt{d_2/d_1}",
          "symbols": [
            {
              "tex": "v_2/v_1",
              "name": "Speed ratio",
              "unit": "1",
              "meaning": "Speed ratio in the stated model."
            },
            {
              "tex": "d_2/d_1",
              "name": "Diameter ratio",
              "unit": "1",
              "meaning": "Diameter ratio in the stated model."
            }
          ],
          "reads": "Doubling speed needs four times the diameter in this approximation.",
          "assumes": "Comparable membrane and axial properties.",
          "variants": [],
          "drill": {
            "prompt": "Diameter rises from $2$ to $18\\,\\mu\\mathrm m$. Find the predicted unmyelinated speed ratio.",
            "answer": {
              "value": 3,
              "unit": "",
              "tolerance": 0.009000000000000001,
              "verification": {
                "relation": "powerRatio",
                "inputs": {
                  "a": 1.8e-05,
                  "b": 2e-06,
                  "power": 0.5
                },
                "displayScale": 1
              }
            },
            "tex": "v_2/v_1=\\sqrt{18/2}",
            "modelAnswer": [
              "Doubling speed needs four times the diameter in this approximation."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $v_2/v_1=\\sqrt{d_2/d_1}$."
              },
              {
                "body": "Start with $v_2/v_1=\\sqrt{18/2}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{v_2/v_1}}=\\sqrt{{\\htmlClass{formula-term-1}{d_2/d_1}}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L08-diameter-check",
          "prompt": "Which diameter dependence is used for the unmyelinated speed comparison?",
          "correct": 0,
          "options": [
            {
              "text": "As the square root of axon diameter",
              "feedback": "Speed follows a square-root diameter law under comparable properties."
            },
            {
              "text": "As the square of axon diameter",
              "feedback": "A squared-diameter law greatly overstates the taught speed gain."
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
            "As the square root of axon diameter."
          ]
        },
        {
          "id": "L08-diameter-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 8:2 p3",
          "prompt": "What is the main trade-off of a giant unmyelinated axon?",
          "options": [
            {
              "text": "Reduced speed at a large volume cost",
              "feedback": "Larger comparable unmyelinated axons conduct faster, despite the space cost."
            },
            {
              "text": "Improved speed at a large volume cost",
              "feedback": "Increasing diameter improves speed but uses much more anatomical space."
            },
            {
              "text": "Improved speed at a smaller volume cost",
              "feedback": "A larger diameter increases the required space rather than reducing it."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "Increasing diameter improves speed but uses much more anatomical space."
            }
          ],
          "modelAnswer": [
            "Increasing diameter improves speed but uses much more anatomical space."
          ]
        }
      ]
    },
    {
      "id": "speed",
      "title": "Compare myelinated and unmyelinated scaling",
      "keyTerms": [],
      "source": "L08 8:2 p4",
      "blocks": [
        {
          "type": "text",
          "body": ["Myelinated speed is approximately linear in fiber diameter in the source comparison, near $6\\,\\mathrm{m/s}$ per micrometer. These are empirical scales, not universal exact laws across species, temperatures and axons.", "Use the source coefficient with outer fiber diameter in micrometers, or convert both quantities to the SI convention in the explorer. For ratios, myelinated speed follows diameter while unmyelinated speed follows its square root. Compare like conditions; the scattered source measurements show why these are approximate trends. (8:2 PDF p4.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:2, PDF page 4. Source speed panel with original labels and axes.",
            "fallbackAlt": "8:2, PDF page 4. Source speed panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/speed.webp', import.meta.url).href,
              "alt": "8:2, PDF page 4. Source speed panel with original labels and axes.",
              "aspect": 1.1381118881118881,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L08-f-myelinspeed",
          "name": "Empirical myelinated speed",
          "tex": "v\\approx kD",
          "symbols": [
            {
              "tex": "v",
              "name": "Conduction speed",
              "unit": "\\mathrm{m/s}",
              "meaning": "Conduction speed in the stated model."
            },
            {
              "tex": "k",
              "name": "Source empirical coefficient",
              "unit": "\\mathrm{s^{-1}}",
              "meaning": "Source empirical coefficient in the stated model."
            },
            {
              "tex": "D",
              "name": "Fiber diameter",
              "unit": "\\mathrm m",
              "meaning": "Fiber diameter in the stated model."
            }
          ],
          "reads": "Larger comparable myelinated fibers conduct approximately proportionally faster.",
          "assumes": "Source empirical coefficient, approximate and condition dependent.",
          "variants": [],
          "drill": {
            "prompt": "Use $k=6\\times10^6\\,\\mathrm{s^{-1}}$ and fiber diameter $D=8\\,\\mu\\mathrm m$. Estimate speed.",
            "answer": {
              "value": 48,
              "unit": "m/s",
              "tolerance": 0.14400000000000002,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 6000000.0,
                  "b": 8e-06
                },
                "displayScale": 1
              }
            },
            "tex": "v\\approx6\\times10^6(8\\times10^{-6})\\,\\mathrm{m/s}",
            "modelAnswer": [
              "Larger comparable myelinated fibers conduct approximately proportionally faster."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $v\\approx kD$."
              },
              {
                "body": "Start with $v\\approx6\\times10^6(8\\times10^{-6})\\,\\mathrm{m/s}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{v}}\\approx {\\htmlClass{formula-term-1}{k}}{\\htmlClass{formula-term-2}{D}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L08-speed-check",
          "prompt": "Which diameter dependence describes the source myelinated trend?",
          "correct": 0,
          "options": [
            {
              "text": "Approximately proportional to fiber diameter",
              "feedback": "The source myelinated trend is approximately linear in fiber diameter."
            },
            {
              "text": "Approximately proportional to squared diameter",
              "feedback": "Squaring diameter is not the source fit for myelinated speed."
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
            "Approximately proportional to fiber diameter."
          ]
        },
        {
          "id": "L08-speed-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 8:2 p4",
          "prompt": "How should the myelinated speed coefficient be treated?",
          "options": [
            {
              "text": "An exact constant across different temperatures",
              "feedback": "Temperature and preparation differences limit the empirical approximation."
            },
            {
              "text": "An exact constant across different axon types",
              "feedback": "The source comparisons do not establish an identical coefficient for every axon."
            },
            {
              "text": "An empirical estimate under comparable conditions",
              "feedback": "The source coefficient summarizes a trend, not a universal exact law."
            }
          ],
          "correct": 2,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "The source coefficient summarizes a trend, not a universal exact law."
            }
          ],
          "modelAnswer": [
            "The source coefficient summarizes a trend, not a universal exact law."
          ]
        }
      ]
    },
    {
      "id": "glia",
      "title": "Myelin from Schwann cells and oligodendrocytes",
      "keyTerms": [],
      "source": "L08 8:2 p5",
      "blocks": [
        {
          "type": "text",
          "body": ["Glial membrane wraps an axonal segment into compact insulating layers. A Schwann cell makes one peripheral internode. An oligodendrocyte can make several central internodes, often across different axons.", "An internode is the wrapped segment, not the entire axon. Several successive Schwann cells are needed to cover a peripheral axon, whereas processes from one oligodendrocyte can reach several central segments. Read the source diagram by following each glial cell to its wraps rather than counting axons alone. (8:2 PDF p5.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:2, PDF page 5. Source glia panel with original labels and axes.",
            "fallbackAlt": "8:2, PDF page 5. Source glia panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/glia.webp', import.meta.url).href,
              "alt": "8:2, PDF page 5. Source glia panel with original labels and axes.",
              "aspect": 1.1210762331838564,
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
          "id": "L08-glia-check",
          "prompt": "Which glial cell can supply several internodes in the central nervous system?",
          "correct": 1,
          "options": [
            {
              "text": "A Schwann cell making one peripheral segment",
              "feedback": "One Schwann cell normally supplies one peripheral internode."
            },
            {
              "text": "An oligodendrocyte contacting several segments",
              "feedback": "One oligodendrocyte can extend processes to several central internodes."
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
            "An oligodendrocyte contacting several segments."
          ]
        },
        {
          "id": "L08-glia-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 8:2 p5",
          "prompt": "What material forms the compact myelin wrap?",
          "options": [
            {
              "text": "Multiple layers of glial plasma membrane",
              "feedback": "Glial membrane wraps the axon to form the insulating sheath."
            },
            {
              "text": "Multiple layers of axonal plasma membrane",
              "feedback": "The wrap is supplied by glia rather than repeated layers of the axon membrane."
            },
            {
              "text": "Multiple layers of extracellular connective tissue",
              "feedback": "Myelin is compact glial membrane rather than extracellular connective tissue."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "Glial membrane wraps the axon to form the insulating sheath."
            }
          ],
          "modelAnswer": [
            "Glial membrane wraps the axon to form the insulating sheath."
          ]
        }
      ]
    },
    {
      "id": "insulation",
      "title": "Electrical insulation: length is not time",
      "keyTerms": [],
      "source": "L08 8:2 p6",
      "blocks": [
        {
          "type": "text",
          "body": ["Myelin increases effective transverse resistance and lowers capacitance. The length constant increases. The time constant is the product $RC$, so its change depends on both factors. Ideal identical series layers leave that product unchanged.", "For the ideal equal-layer model, add series resistances and reciprocals of capacitances before calculating the product. At fixed axial properties, higher membrane resistance lengthens passive spread, reducing attenuation between nodes. This spatial benefit does not require a smaller time constant; use the integrated example to separate those conclusions. (8:2 PDF p6.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:2, PDF page 6. Source myelin panel with original labels and axes.",
            "fallbackAlt": "8:2, PDF page 6. Source myelin panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/myelin.webp', import.meta.url).href,
              "alt": "8:2, PDF page 6. Source myelin panel with original labels and axes.",
              "aspect": 0.7374631268436578,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L08-f-series-r",
          "name": "Identical insulating resistances in series",
          "tex": "R_N=NR_1",
          "symbols": [
            {
              "tex": "R_N",
              "name": "Effective resistance",
              "unit": "\\mathrm\\Omega",
              "meaning": "Effective resistance in the stated model."
            },
            {
              "tex": "N",
              "name": "Number of ideal layers",
              "unit": "1",
              "meaning": "Number of ideal layers in the stated model."
            },
            {
              "tex": "R_1",
              "name": "One-layer resistance",
              "unit": "\\mathrm\\Omega",
              "meaning": "One-layer resistance in the stated model."
            }
          ],
          "reads": "Series layers add transverse resistance.",
          "assumes": "Ideal equal-area identical layers only.",
          "variants": [],
          "drill": {
            "prompt": "Four ideal layers each have resistance $20\\,\\mathrm{M\\Omega}$. Find effective resistance.",
            "answer": {
              "value": 80000000.0,
              "unit": "ohm",
              "tolerance": 240000.0,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 4,
                  "b": 20000000.0
                },
                "displayScale": 1
              }
            },
            "tex": "R_4=4(20\\times10^6)\\,\\Omega",
            "modelAnswer": [
              "Series layers add transverse resistance."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $R_N=NR_1$."
              },
              {
                "body": "Start with $R_4=4(20\\times10^6)\\,\\Omega$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{R_N}}={\\htmlClass{formula-term-1}{N}}{\\htmlClass{formula-term-2}{R_1}}"
        },
        {
          "id": "L08-f-series-c",
          "name": "Identical capacitances in series",
          "tex": "C_N=C_1/N",
          "symbols": [
            {
              "tex": "C_N",
              "name": "Effective capacitance",
              "unit": "\\mathrm F",
              "meaning": "Effective capacitance in the stated model."
            },
            {
              "tex": "C_1",
              "name": "One-layer capacitance",
              "unit": "\\mathrm F",
              "meaning": "One-layer capacitance in the stated model."
            },
            {
              "tex": "N",
              "name": "Number of ideal layers",
              "unit": "1",
              "meaning": "Number of ideal layers in the stated model."
            }
          ],
          "reads": "Series layers reduce transverse capacitance.",
          "assumes": "Ideal equal-area identical layers only.",
          "variants": [],
          "drill": {
            "prompt": "Four ideal layers each have capacitance $40\\,\\mathrm{pF}$. Find effective capacitance.",
            "answer": {
              "value": 1e-11,
              "unit": "F",
              "tolerance": 3e-14,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 4e-11,
                  "b": 4
                },
                "displayScale": 1
              }
            },
            "tex": "C_4=40\\times10^{-12}/4\\,\\mathrm F",
            "modelAnswer": [
              "Series layers reduce transverse capacitance."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $C_N=C_1/N$."
              },
              {
                "body": "Start with $C_4=40\\times10^{-12}/4\\,\\mathrm F$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{C_N}}={\\htmlClass{formula-term-1}{C_1}}/{\\htmlClass{formula-term-2}{N}}"
        },
        {
          "id": "L08-f-thickness",
          "name": "Capacitance and effective thickness",
          "tex": "C=\\varepsilon A/t_m",
          "symbols": [
            {
              "tex": "C",
              "name": "Capacitance",
              "unit": "\\mathrm F",
              "meaning": "Capacitance in the stated model."
            },
            {
              "tex": "\\varepsilon",
              "name": "Permittivity",
              "unit": "\\mathrm{F/m}",
              "meaning": "Permittivity in the stated model."
            },
            {
              "tex": "A",
              "name": "Area",
              "unit": "\\mathrm{m^2}",
              "meaning": "Area in the stated model."
            },
            {
              "tex": "t_m",
              "name": "Insulator thickness",
              "unit": "\\mathrm m",
              "meaning": "Insulator thickness in the stated model."
            }
          ],
          "reads": "Greater effective thickness reduces capacitance at fixed area.",
          "assumes": "Ideal uniform dielectric approximation.",
          "variants": [],
          "drill": {
            "prompt": "Use $\\varepsilon=2\\times10^{-11}\\,\\mathrm{F/m}$, $A=10^{-8}\\,\\mathrm{m^2}$ and $t_m=2\\times10^{-8}\\,\\mathrm m$. Find capacitance.",
            "answer": {
              "value": 1e-11,
              "unit": "F",
              "tolerance": 3e-14,
              "verification": {
                "relation": "geometry",
                "inputs": {
                  "epsilon": 2e-11,
                  "area": 1e-08,
                  "distance": 2e-08
                },
                "displayScale": 1
              }
            },
            "tex": "C=(2\\times10^{-11})(10^{-8})/(2\\times10^{-8})\\,\\mathrm F",
            "modelAnswer": [
              "Greater effective thickness reduces capacitance at fixed area."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $C=\\varepsilon A/t_m$."
              },
              {
                "body": "Start with $C=(2\\times10^{-11})(10^{-8})/(2\\times10^{-8})\\,\\mathrm F$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{C}}={\\htmlClass{formula-term-1}{\\varepsilon}} {\\htmlClass{formula-term-2}{A}}/{\\htmlClass{formula-term-3}{t_m}}"
        },
        {
          "id": "L08-f-tau",
          "name": "Time constant depends on the product",
          "tex": "\\tau=RC",
          "symbols": [
            {
              "tex": "\\tau",
              "name": "Time constant",
              "unit": "\\mathrm s",
              "meaning": "Time constant in the stated model."
            },
            {
              "tex": "R",
              "name": "Resistance",
              "unit": "\\mathrm\\Omega",
              "meaning": "Resistance in the stated model."
            },
            {
              "tex": "C",
              "name": "Capacitance",
              "unit": "\\mathrm F",
              "meaning": "Capacitance in the stated model."
            }
          ],
          "reads": "Opposite resistance and capacitance changes can cancel.",
          "assumes": "Matched effective lumped properties.",
          "variants": [],
          "drill": {
            "prompt": "For $R=80\\,\\mathrm{M\\Omega}$ and $C=10\\,\\mathrm{pF}$, find time constant.",
            "answer": {
              "value": 0.0008,
              "unit": "s",
              "tolerance": 2.4000000000000003e-06,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 80000000.0,
                  "b": 1e-11
                },
                "displayScale": 1
              }
            },
            "tex": "\\tau=(80\\times10^6)(10\\times10^{-12})\\,\\mathrm s",
            "modelAnswer": [
              "Opposite resistance and capacitance changes can cancel."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\tau=RC$."
              },
              {
                "body": "Start with $\\tau=(80\\times10^6)(10\\times10^{-12})\\,\\mathrm s$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{\\tau}}={\\htmlClass{formula-term-1}{R}}{\\htmlClass{formula-term-2}{C}}"
        },
        {
          "id": "L08-f-lambda",
          "name": "Internodal length constant",
          "tex": "\\lambda=\\sqrt{r_m/r_i}",
          "symbols": [
            {
              "tex": "\\lambda",
              "name": "Length constant",
              "unit": "\\mathrm m",
              "meaning": "Length constant in the stated model."
            },
            {
              "tex": "r_m",
              "name": "Membrane resistance per unit length",
              "unit": "\\mathrm{\\Omega m}",
              "meaning": "Membrane resistance per unit length in the stated model."
            },
            {
              "tex": "r_i",
              "name": "Axial resistance per unit length",
              "unit": "\\mathrm{\\Omega/m}",
              "meaning": "Axial resistance per unit length in the stated model."
            }
          ],
          "reads": "Reduced transverse leakage permits farther passive spread.",
          "assumes": "Uniform effective cable; external resistance neglected.",
          "variants": [],
          "drill": {
            "prompt": "For $r_m=100\\,\\Omega\\mathrm m$ and $r_i=10^8\\,\\Omega/\\mathrm m$, find length constant.",
            "answer": {
              "value": 0.001,
              "unit": "m",
              "tolerance": 3e-06,
              "verification": {
                "relation": "cableLength",
                "inputs": {
                  "rm": 100,
                  "ri": 100000000.0
                },
                "displayScale": 1
              }
            },
            "tex": "\\lambda=\\sqrt{100/10^8}\\,\\mathrm m",
            "modelAnswer": [
              "Reduced transverse leakage permits farther passive spread."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\lambda=\\sqrt{r_m/r_i}$."
              },
              {
                "body": "Start with $\\lambda=\\sqrt{100/10^8}\\,\\mathrm m$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{\\lambda}}=\\sqrt{{\\htmlClass{formula-term-1}{r_m}}/{\\htmlClass{formula-term-2}{r_i}}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L08-insulation-check",
          "prompt": "Can the sign of a resistance change alone establish faster membrane charging?",
          "correct": 1,
          "options": [
            {
              "text": "Yes, higher resistance always makes charging faster",
              "feedback": "Resistance alone cannot settle a time constant that is a resistance-capacitance product."
            },
            {
              "text": "No, the capacitance change must also be considered",
              "feedback": "Both effective resistance and capacitance determine the charging time constant."
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
            "No, the capacitance change must also be considered."
          ]
        },
        {
          "id": "L08-insulation-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 8:2 p6",
          "prompt": "At fixed axial properties, what does increased membrane resistance do to passive spread?",
          "options": [
            {
              "text": "Preserves the spatial attenuation scale",
              "feedback": "At fixed axial resistance, changing membrane resistance changes the length constant."
            },
            {
              "text": "Lengthens the spatial attenuation scale",
              "feedback": "Higher transverse resistance reduces leakage and increases the length constant."
            },
            {
              "text": "Shortens the spatial attenuation scale",
              "feedback": "Less leakage allows farther spread, so the length constant increases."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "Higher transverse resistance reduces leakage and increases the length constant."
            }
          ],
          "modelAnswer": [
            "Higher transverse resistance reduces leakage and increases the length constant."
          ]
        }
      ]
    },
    {
      "id": "node",
      "title": "Nodes and internodes",
      "keyTerms": [],
      "source": "L08 8:2 p7",
      "blocks": [
        {
          "type": "text",
          "body": ["A node is a short exposed membrane gap between internodes. Paranodes border the gap; juxtaparanodes lie beneath nearby myelin. Preserve those locations when explaining channel distributions.", "Read the spatial diagram from the exposed node through the paranode to the covered juxtaparanode and internode. These locations distinguish accessible regenerative membrane from insulated membrane. The gap is small relative to the internode, but it concentrates excitability; a long covered segment need not contain a matching density of active channels. (8:2 PDF p7.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:2, PDF page 7. Source node panel with original labels and axes.",
            "fallbackAlt": "8:2, PDF page 7. Source node panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/node.webp', import.meta.url).href,
              "alt": "8:2, PDF page 7. Source node panel with original labels and axes.",
              "aspect": 5.3125,
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
          "id": "L08-node-check",
          "prompt": "Which location corresponds to the exposed nodal membrane?",
          "correct": 1,
          "options": [
            {
              "text": "At the long insulated center between nodal gaps",
              "feedback": "The long covered segment is an internode, not a node."
            },
            {
              "text": "At the short exposed gap between myelin segments",
              "feedback": "Nodes are short exposed gaps with concentrated regenerative channels."
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
            "At the short exposed gap between myelin segments."
          ]
        },
        {
          "id": "L08-node-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 8:2 p7",
          "prompt": "Which region is the long myelin-covered segment?",
          "options": [
            {
              "text": "The node between insulated segments",
              "feedback": "A node is the short exposed gap, not the long covered segment."
            },
            {
              "text": "The paranode bordering an exposed gap",
              "feedback": "Paranodes border the node and are distinct from the long internode."
            },
            {
              "text": "The internode between exposed gaps",
              "feedback": "Internodes are the insulated segments connecting nodal gaps."
            }
          ],
          "correct": 2,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "Internodes are the insulated segments connecting nodal gaps."
            }
          ],
          "modelAnswer": [
            "Internodes are the insulated segments connecting nodal gaps."
          ]
        }
      ]
    },
    {
      "id": "dimensions",
      "title": "Geometry and empirical myelinated-fiber fits",
      "keyTerms": [],
      "source": "L08 8:2 p8",
      "blocks": [
        {
          "type": "text",
          "body": ["The source uses outer fiber diameter $D$ and inner axon diameter $d$. Its approximate fits are $L(\\mathrm{mm})=0.146D(\\mu\\mathrm m)$ and $d/D=0.74$. The illustrative drawing is not an exact simultaneous instance of both fits.", "Apply each fit with its stated units. Radial sheath thickness is half the difference between outer and inner diameters; internode transit time is length divided by speed. Node length is an approximate fraction of internode length. These empirical proportions summarize the source population, rather than defining every myelinated axon. (8:2 PDF p8.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:2, PDF page 8. Source dimensions panel with original labels and axes.",
            "fallbackAlt": "8:2, PDF page 8. Source dimensions panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/dimensions.webp', import.meta.url).href,
              "alt": "8:2, PDF page 8. Source dimensions panel with original labels and axes.",
              "aspect": 3.6315789473684212,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L08-f-internode",
          "name": "Internode length fit",
          "tex": "L\\approx146D",
          "symbols": [
            {
              "tex": "L",
              "name": "Internode length",
              "unit": "\\mathrm m",
              "meaning": "Internode length in the stated model."
            },
            {
              "tex": "D",
              "name": "Outer fiber diameter",
              "unit": "\\mathrm m",
              "meaning": "Outer fiber diameter in the stated model."
            }
          ],
          "reads": "Longer internodes accompany larger fibers in the supplied empirical fit.",
          "assumes": "SI form of source millimeter/micrometer fit.",
          "variants": [],
          "drill": {
            "prompt": "For outer diameter $D=8\\,\\mu\\mathrm m$, estimate internode length with the source fit.",
            "answer": {
              "value": 0.001168,
              "unit": "m",
              "tolerance": 3.504e-06,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 146,
                  "b": 8e-06
                },
                "displayScale": 1
              }
            },
            "tex": "L\\approx146(8\\times10^{-6})\\,\\mathrm m",
            "modelAnswer": [
              "Longer internodes accompany larger fibers in the supplied empirical fit."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $L\\approx146D$."
              },
              {
                "body": "Start with $L\\approx146(8\\times10^{-6})\\,\\mathrm m$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{L}}\\approx146{\\htmlClass{formula-term-1}{D}}"
        },
        {
          "id": "L08-f-inner",
          "name": "Inner-to-outer diameter fit",
          "tex": "d\\approx0.74D",
          "symbols": [
            {
              "tex": "d",
              "name": "Inner axon diameter",
              "unit": "\\mathrm m",
              "meaning": "Inner axon diameter in the stated model."
            },
            {
              "tex": "D",
              "name": "Outer fiber diameter",
              "unit": "\\mathrm m",
              "meaning": "Outer fiber diameter in the stated model."
            }
          ],
          "reads": "The inner diameter excludes myelin thickness.",
          "assumes": "Source approximate fit.",
          "variants": [],
          "drill": {
            "prompt": "For outer diameter $D=8\\,\\mu\\mathrm m$, estimate inner diameter.",
            "answer": {
              "value": 5.92e-06,
              "unit": "m",
              "tolerance": 1.776e-08,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 0.74,
                  "b": 8e-06
                },
                "displayScale": 1
              }
            },
            "tex": "d\\approx0.74(8\\times10^{-6})\\,\\mathrm m",
            "modelAnswer": [
              "The inner diameter excludes myelin thickness."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $d\\approx0.74D$."
              },
              {
                "body": "Start with $d\\approx0.74(8\\times10^{-6})\\,\\mathrm m$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{d}}\\approx0.74{\\htmlClass{formula-term-1}{D}}"
        },
        {
          "id": "L08-f-nodelength",
          "name": "Node-to-internode length scale",
          "tex": "l\\approx10^{-3}L",
          "symbols": [
            {
              "tex": "l",
              "name": "Node length",
              "unit": "\\mathrm m",
              "meaning": "Node length in the stated model."
            },
            {
              "tex": "L",
              "name": "Internode length",
              "unit": "\\mathrm m",
              "meaning": "Internode length in the stated model."
            }
          ],
          "reads": "The exposed gap is much shorter than its neighboring internode.",
          "assumes": "Approximate source geometry, not exact universal morphology.",
          "variants": [],
          "drill": {
            "prompt": "For $L=1.2\\,\\mathrm{mm}$, estimate node length with the source ratio.",
            "answer": {
              "value": 1.2e-06,
              "unit": "m",
              "tolerance": 3.6e-09,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 0.001,
                  "b": 0.0012
                },
                "displayScale": 1
              }
            },
            "tex": "l\\approx10^{-3}(1.2\\times10^{-3})\\,\\mathrm m",
            "modelAnswer": [
              "The exposed gap is much shorter than its neighboring internode."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $l\\approx10^{-3}L$."
              },
              {
                "body": "Start with $l\\approx10^{-3}(1.2\\times10^{-3})\\,\\mathrm m$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{l}}\\approx10^{-3}{\\htmlClass{formula-term-1}{L}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L08-dimensions-check",
          "prompt": "Which diameter spans both axon and sheath in the geometry panel?",
          "correct": 0,
          "options": [
            {
              "text": "Outer fiber diameter $D$ in the supplied fit",
              "feedback": "Outer fiber diameter includes axon plus myelin sheath."
            },
            {
              "text": "Inner axon diameter $d$ in the supplied fit",
              "feedback": "Inner axon diameter excludes the surrounding sheath."
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
            "Outer fiber diameter $D$ in the supplied fit."
          ]
        },
        {
          "id": "L08-dimensions-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 8:2 p8",
          "prompt": "How does internode length vary with outer diameter in the supplied fit?",
          "options": [
            {
              "text": "Approximately in direct proportion",
              "feedback": "The empirical fit makes internode length approximately linear in outer diameter."
            },
            {
              "text": "Approximately in inverse proportion",
              "feedback": "The source trend lengthens internodes as outer fiber diameter increases."
            },
            {
              "text": "Approximately with its square root",
              "feedback": "Square-root scaling describes unmyelinated speed, not this internode-length fit."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "The empirical fit makes internode length approximately linear in outer diameter."
            }
          ],
          "modelAnswer": [
            "The empirical fit makes internode length approximately linear in outer diameter."
          ]
        }
      ]
    },
    {
      "id": "saltation",
      "title": "Continuous versus saltatory regeneration",
      "keyTerms": [],
      "source": "L08 8:2 p9–10",
      "blocks": [
        {
          "type": "text",
          "body": ["Both forms use continuous passive spread of current. Unmyelinated membrane regenerates along the axon; myelinated axons regenerate mainly at nodes. The source cartoon simplifies potassium distribution, which the next panel refines.", "At an active node, inward sodium current supplies local charging and axial spread beneath myelin. If downstream membrane reaches threshold, nodal sodium current regenerates the signal. Internodal voltage still changes during that passive connection; localization of regeneration does not mean the electrical pathway is interrupted between nodes. (8:2 PDF p9–10.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:2, PDF page 10. Source saltatory panel with original labels and axes.",
            "fallbackAlt": "8:2, PDF page 10. Source saltatory panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/saltatory.webp', import.meta.url).href,
              "alt": "8:2, PDF page 10. Source saltatory panel with original labels and axes.",
              "aspect": 1.418848167539267,
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
          "id": "L08-saltation-check",
          "prompt": "Which signal component is concentrated at regenerative sites in myelinated fibers?",
          "correct": 1,
          "options": [
            {
              "text": "All longitudinal current and membrane voltage",
              "feedback": "Axial current and voltage continue between nodes."
            },
            {
              "text": "Regenerative inward sodium membrane current",
              "feedback": "Strong regenerative sodium current is concentrated at excitable nodes."
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
            "Regenerative inward sodium membrane current."
          ]
        },
        {
          "id": "L08-saltation-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 8:2 p9–10",
          "prompt": "What links one active node to downstream excitable membrane?",
          "options": [
            {
              "text": "Passive ionic leakage across each wrap",
              "feedback": "Transverse leakage loses current rather than providing the longitudinal connection."
            },
            {
              "text": "Passive axial spread beneath myelin",
              "feedback": "Axial spread depolarizes downstream membrane before local regeneration."
            },
            {
              "text": "Active inward current throughout the sheath",
              "feedback": "The sheath is insulating; strong regenerative inward current is concentrated at nodes."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "Axial spread depolarizes downstream membrane before local regeneration."
            }
          ],
          "modelAnswer": [
            "Axial spread depolarizes downstream membrane before local regeneration."
          ]
        }
      ]
    },
    {
      "id": "channels",
      "title": "Nodal and juxtaparanodal channels",
      "keyTerms": [],
      "source": "L08 8:2 p11",
      "blocks": [
        {
          "type": "text",
          "body": ["Nodes concentrate sodium channels and include Kv3.1b and Kv7 potassium channels. Many Kv1 channels cluster at juxtaparanodes beneath myelin, limiting normal activation. Distribution and insulation improve speed and metabolic efficiency.", "Use the detailed distribution panel to refine the earlier cartoon. Rapid nodal sodium activation supports regeneration, while potassium-channel location and accessibility differ among families. Do not describe the insulated internode as an exposed patch with the same channel distribution or infer that all potassium channels are absent from nodes. (8:2 PDF p11.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:2, PDF page 11. Source channels panel with original labels and axes.",
            "fallbackAlt": "8:2, PDF page 11. Source channels panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/channels.webp', import.meta.url).href,
              "alt": "8:2, PDF page 11. Source channels panel with original labels and axes.",
              "aspect": 1.768916155419223,
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
          "id": "L08-channels-check",
          "prompt": "Which region contains the taught cluster of many Kv1 channels?",
          "correct": 1,
          "options": [
            {
              "text": "The exposed nodal gap without nearby myelin",
              "feedback": "The exposed node contains other potassium families; many Kv1 are under nearby myelin."
            },
            {
              "text": "Juxtaparanodal membrane beneath the myelin",
              "feedback": "Many Kv1 channels cluster in covered juxtaparanodal regions."
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
            "Juxtaparanodal membrane beneath the myelin."
          ]
        },
        {
          "id": "L08-channels-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 8:2 p11",
          "prompt": "Which potassium-channel families are included at nodes in the detailed panel?",
          "options": [
            {
              "text": "Kv1 channels without Kv7 channels",
              "feedback": "Many Kv1 channels are juxtaparanodal; the panel includes nodal Kv7."
            },
            {
              "text": "Kv1 channels without Kv3.1b channels",
              "feedback": "The detailed distribution includes nodal Kv3.1b and places many Kv1 beneath myelin."
            },
            {
              "text": "Nodal Kv3.1b and Kv7 channels",
              "feedback": "The detailed nodal panel includes these potassium families alongside sodium channels."
            }
          ],
          "correct": 2,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "The detailed nodal panel includes these potassium families alongside sodium channels."
            }
          ],
          "modelAnswer": [
            "The detailed nodal panel includes these potassium families alongside sodium channels."
          ]
        }
      ]
    },
    {
      "id": "anesthetic",
      "title": "Evidence from anesthetic blocks and nodal currents",
      "keyTerms": [],
      "source": "L08 8:2 p12",
      "blocks": [
        {
          "type": "text",
          "body": ["The source experiments show propagation past a small number of blocked nodes and failure after more consecutive nodes are blocked. Large inward currents localize to nodes. These observations support a safety margin, not a universal blocked-node cutoff.", "The manipulated variable is the number of consecutive anesthetized nodes; the readout is successful conduction beyond the treated region. Relate that result to the spatial current panel, where strong inward current occurs at nodes. Passive spread can bridge some inactive sites, but the experiment does not fix a universal safety distance. (8:2 PDF p12.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:2, PDF page 12. Source anesthetic panel with original labels and axes.",
            "fallbackAlt": "8:2, PDF page 12. Source anesthetic panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/anesthetic.webp', import.meta.url).href,
              "alt": "8:2, PDF page 12. Source anesthetic panel with original labels and axes.",
              "aspect": 0.6064467766116941,
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
          "id": "L08-anesthetic-check",
          "prompt": "Which mechanism can carry excitation beyond a locally blocked node?",
          "correct": 0,
          "options": [
            {
              "text": "Passive spread can excite a farther available node",
              "feedback": "Passive spread can reach an available node beyond an inactive one."
            },
            {
              "text": "Every node is strictly required to regenerate each spike",
              "feedback": "Conduction past a blocked node shows that every individual node need not regenerate."
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
            "Passive spread can excite a farther available node."
          ]
        },
        {
          "id": "L08-anesthetic-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 8:2 p12",
          "prompt": "What was varied in the local-anesthetic propagation experiment?",
          "options": [
            {
              "text": "The number of consecutive blocked nodes",
              "feedback": "The source compared successful conduction as more adjacent nodes were blocked."
            },
            {
              "text": "The diameter of consecutive blocked axons",
              "feedback": "Axon diameter was not the manipulated variable in this local nodal-block experiment."
            },
            {
              "text": "The spacing of consecutive recording electrodes",
              "feedback": "The block experiment varies inactive nodes rather than recording-electrode spacing."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "The source compared successful conduction as more adjacent nodes were blocked."
            }
          ],
          "modelAnswer": [
            "The source compared successful conduction as more adjacent nodes were blocked."
          ]
        }
      ]
    },
    {
      "id": "twitch",
      "title": "Local stimulation threshold and the twitch proxy",
      "keyTerms": [],
      "source": "L08 8:2 p13",
      "blocks": [
        {
          "type": "text",
          "body": ["Move a stimulating electrode along a motor nerve and measure the minimum current producing a barely detectable muscle twitch. Lowest thresholds near nodes support spatially distinct excitability. A twitch is an indirect readout, not a direct intracellular voltage trace.", "Electrode position is varied and threshold stimulus current is measured using the twitch criterion. Minima near nodes support greater nodal excitability. Keep nerve-muscle preparation and electrode geometry comparable: the endpoint also requires successful downstream transmission and muscle activation, so it is not a direct local membrane-voltage measurement. (8:2 PDF p13.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:2, PDF page 13. Source twitch panel with original labels and axes.",
            "fallbackAlt": "8:2, PDF page 13. Source twitch panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/twitch.webp', import.meta.url).href,
              "alt": "8:2, PDF page 13. Source twitch panel with original labels and axes.",
              "aspect": 1.0967007963594995,
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
          "id": "L08-twitch-check",
          "prompt": "Which measured endpoint was used to identify the stimulation threshold?",
          "correct": 0,
          "options": [
            {
              "text": "The minimum stimulus producing a detectable twitch",
              "feedback": "The twitch criterion reports successful excitation indirectly through the nerve-muscle preparation."
            },
            {
              "text": "The maximum stimulus producing a fixed inward current",
              "feedback": "The experiment used the minimum twitch-producing stimulus, not a maximum inward-current criterion."
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
            "The minimum stimulus producing a detectable twitch."
          ]
        },
        {
          "id": "L08-twitch-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 8:2 p13",
          "prompt": "Where were excitation-threshold minima found in the local-stimulation experiment?",
          "options": [
            {
              "text": "Uniformly along nodes and internodes",
              "feedback": "Spatially varying thresholds are the evidence for nonuniform excitability."
            },
            {
              "text": "Near the nodes of Ranvier",
              "feedback": "Low thresholds near nodes support localized excitable membrane."
            },
            {
              "text": "Near the centers of internodes",
              "feedback": "Covered mid-internodal membrane had higher thresholds in this experiment."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "Low thresholds near nodes support localized excitable membrane."
            }
          ],
          "modelAnswer": [
            "Low thresholds near nodes support localized excitable membrane."
          ]
        }
      ]
    },
    {
      "id": "extracellular",
      "title": "Extracellular recordings localize nodal sources",
      "keyTerms": [],
      "source": "L08 8:2 p14",
      "blocks": [
        {
          "type": "text",
          "body": ["Extracellular AP amplitude is largest near a node and decreases away from it. Its spatial organization supports localized regenerative current sources. The measured extracellular voltage is not the transmembrane voltage itself.", "Move the recording electrode while retaining a comparable propagated response and reference geometry. A spatial amplitude maximum near the node supports a localized source, but amplitude also depends on electrode distance and the surrounding conductive path. Compare positions at controlled distances before attributing a changed amplitude to altered membrane excitability. (8:2 PDF p14.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:2, PDF page 14. Source extracellular panel with original labels and axes.",
            "fallbackAlt": "8:2, PDF page 14. Source extracellular panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/extracellular.webp', import.meta.url).href,
              "alt": "8:2, PDF page 14. Source extracellular panel with original labels and axes.",
              "aspect": 1.1474285714285715,
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
          "id": "L08-extracellular-check",
          "prompt": "Which potential difference does the surrounding recording electrode report?",
          "correct": 0,
          "options": [
            {
              "text": "Extracellular potential relative to its reference",
              "feedback": "The electrode measures an extracellular potential difference relative to a reference."
            },
            {
              "text": "Transmembrane potential independent of its reference",
              "feedback": "Transmembrane voltage requires inside-minus-outside potential, not one surrounding electrode alone."
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
            "Extracellular potential relative to its reference."
          ]
        },
        {
          "id": "L08-extracellular-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 8:2 p14",
          "prompt": "Where is the source extracellular action-potential amplitude greatest?",
          "options": [
            {
              "text": "Near the middle of an internode",
              "feedback": "The source amplitude maximum is nodal rather than mid-internodal."
            },
            {
              "text": "Equally at nodal and internodal sites",
              "feedback": "The source maps spatially varying amplitude, not an equal signal everywhere."
            },
            {
              "text": "Near the exposed node of Ranvier",
              "feedback": "The spatial amplitude maximum supports a localized nodal current source."
            }
          ],
          "correct": 2,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "The spatial amplitude maximum supports a localized nodal current source."
            }
          ],
          "modelAnswer": [
            "The spatial amplitude maximum supports a localized nodal current source."
          ]
        }
      ]
    },
    {
      "id": "continuity",
      "title": "Membrane current is more saltatory than voltage",
      "keyTerms": [],
      "source": "L08 8:2 p15",
      "blocks": [
        {
          "type": "text",
          "body": ["Classical panels show a strongly localized inward membrane current but continuous depolarization across nodes and internodes. Waveforms need not be identical at the two sites. Distinguish transmembrane current from axial current.", "Compare the nodal and mid-internodal panels separately for voltage and membrane current. The inward current component is concentrated at nodes, whereas the voltage waveform remains present between them. Axial current carries charge along the fiber; it should not be mistaken for inward transmembrane current at every intermediate location. (8:2 PDF p15.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:2, PDF page 15. Source voltage current panel with original labels and axes.",
            "fallbackAlt": "8:2, PDF page 15. Source voltage current panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/voltage-current.webp', import.meta.url).href,
              "alt": "8:2, PDF page 15. Source voltage current panel with original labels and axes.",
              "aspect": 1.7869742198100407,
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
          "id": "L08-continuity-check",
          "prompt": "Which measured component is localized more strongly to nodes than membrane voltage?",
          "correct": 1,
          "options": [
            {
              "text": "Depolarization propagating through the internodes",
              "feedback": "Depolarization remains present through internodes despite localized inward membrane current."
            },
            {
              "text": "Regenerative inward transmembrane current",
              "feedback": "Regenerative inward transmembrane current is concentrated mainly at nodes."
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
            "Regenerative inward transmembrane current."
          ]
        },
        {
          "id": "L08-continuity-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 8:2 p15",
          "prompt": "What does axial current describe?",
          "options": [
            {
              "text": "Charge moving along the fiber",
              "feedback": "Axial current runs longitudinally and links successive membrane regions."
            },
            {
              "text": "Charge entering across the membrane",
              "feedback": "Inward transmembrane current crosses the membrane rather than running along the fiber."
            },
            {
              "text": "Charge stored across the membrane",
              "feedback": "Stored membrane charge belongs to capacitance; axial current transfers charge longitudinally."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "Axial current runs longitudinally and links successive membrane regions."
            }
          ],
          "modelAnswer": [
            "Axial current runs longitudinally and links successive membrane regions."
          ]
        }
      ]
    },
    {
      "id": "double",
      "title": "Double cable and the periaxonal pathway",
      "keyTerms": [],
      "source": "L08 8:2 p16",
      "blocks": [
        {
          "type": "text",
          "body": ["A narrow periaxonal conductive pathway adds a second axial route under myelin. The supplied optical study found different nodal and internodal waveforms and faster propagation when this space was reduced. These are study-specific observations.", "The optical measurement follows membrane voltage at nodal and internodal sites; it does not simply measure extracellular amplitude. Distinct waveforms remain compatible with continuous internodal depolarization. Adding the periaxonal route refines the single-cable picture, while the reported space and waveform differences belong to the illustrated study. (8:2 PDF p16.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:2, PDF page 16. Source double panel with original labels and axes.",
            "fallbackAlt": "8:2, PDF page 16. Source double panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/double.webp', import.meta.url).href,
              "alt": "8:2, PDF page 16. Source double panel with original labels and axes.",
              "aspect": 3.5723684210526314,
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
          "id": "L08-double-check",
          "prompt": "Which conductive pathway is added to the ordinary axoplasmic route?",
          "correct": 1,
          "options": [
            {
              "text": "Only the intracellular axoplasm inside the axon",
              "feedback": "Axoplasm is already the longitudinal route in a single-cable model."
            },
            {
              "text": "Conductive periaxonal space under the myelin",
              "feedback": "The double cable adds the conductive space between axon membrane and sheath."
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
            "Conductive periaxonal space under the myelin."
          ]
        },
        {
          "id": "L08-double-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 8:2 p16",
          "prompt": "Which method supplied the modern nodal versus internodal voltage comparison?",
          "options": [
            {
              "text": "Local nerve-muscle twitch stimulation",
              "feedback": "That measures excitation threshold indirectly rather than comparing optical voltage waveforms."
            },
            {
              "text": "High-speed optical voltage recording",
              "feedback": "The supplied study used optical recordings of transaxonal voltage waveforms."
            },
            {
              "text": "Spatial extracellular amplitude recording",
              "feedback": "That describes the earlier extracellular source-localization experiment."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "The supplied study used optical recordings of transaxonal voltage waveforms."
            }
          ],
          "modelAnswer": [
            "The supplied study used optical recordings of transaxonal voltage waveforms."
          ]
        }
      ]
    },
    {
      "id": "jump",
      "title": "Critique the literal-jumping description",
      "keyTerms": [],
      "source": "L08 8:2 p17–18",
      "blocks": [
        {
          "type": "text",
          "body": ["Saltatory describes mainly the localization of regenerative inward current. Continuous passive spread links active nodes, sometimes across several internodes. A model answer must distinguish current and voltage rather than saying the entire AP vanishes and reappears.", "Build an explanation from independent observations: localized inward current, easier nodal excitation and continuous internodal voltage. Blocking experiments add evidence that passive spread can bridge inactive nodes. Together these support reliable nodal regeneration without requiring identical waveforms everywhere or literal disappearance and reappearance of the membrane potential. (8:2 PDF p17–18.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:2, PDF page 17. Source continuity panel with original labels and axes.",
            "fallbackAlt": "8:2, PDF page 17. Source continuity panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/continuity.webp', import.meta.url).href,
              "alt": "8:2, PDF page 17. Source continuity panel with original labels and axes.",
              "aspect": 0.6662468513853904,
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
          "id": "L08-jump-check",
          "prompt": "Which account keeps both internodal continuity and localized regeneration?",
          "correct": 0,
          "options": [
            {
              "text": "Continuous passive spread with nodal regeneration",
              "feedback": "Passive spread connects sites of regenerative nodal excitation."
            },
            {
              "text": "Disappearance of voltage throughout every internode",
              "feedback": "Internodal depolarization persists; the voltage does not disappear and reappear."
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
            "Continuous passive spread with nodal regeneration."
          ]
        },
        {
          "id": "L08-jump-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 8:2 p17–18",
          "prompt": "Which observation argues directly against disappearance of internodal voltage?",
          "options": [
            {
              "text": "Inward current concentrated at active nodes",
              "feedback": "Localized inward current alone does not show whether internodal voltage disappears."
            },
            {
              "text": "Sodium channels concentrated at active nodes",
              "feedback": "Channel localization identifies regenerative sites but does not itself measure internodal voltage."
            },
            {
              "text": "Depolarization recorded between active nodes",
              "feedback": "A voltage waveform between nodes contradicts literal disappearance there."
            }
          ],
          "correct": 2,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "A voltage waveform between nodes contradicts literal disappearance there."
            }
          ],
          "modelAnswer": [
            "A voltage waveform between nodes contradicts literal disappearance there."
          ]
        }
      ]
    },
    {
      "id": "ex-iv",
      "title": "Exercise 8: steady sodium I–V from tabulated gates",
      "keyTerms": [],
      "source": "L08 Exercise8 p1–2 #1",
      "blocks": [
        {
          "type": "text",
          "body": ["Use the exact supplied $m_\\infty,h_\\infty$ table. Compare current at the sampled voltages; changing reversal changes driving force without changing the stipulated gates. Removing inactivation sets $h=1$. A continuous maximum requires an additional interpolation choice.", "At each voltage, multiply maximal conductance by the activation-cubed and availability product, then multiply by signed driving force. For inverse problems, divide measured currents by their stipulated gate products before fitting conductance and reversal. Normalize only where that product is nonzero; small products magnify measurement error. (Exercise8 PDF p1–2 #1.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Exercise8, PDF page 2. Source ex table panel with original labels and axes.",
            "fallbackAlt": "Exercise8, PDF page 2. Source ex table panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/ex-table.webp', import.meta.url).href,
              "alt": "Exercise8, PDF page 2. Source ex table panel with original labels and axes.",
              "aspect": 1.2732447817836812,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        },
        {
          "type": "figure",
          "visual": {
            "type": "svg",
            "name": "tabulated-iv",
            "props": {
              "voltages": [
                -100,
                -90,
                -80,
                -70,
                -60,
                -50,
                -40,
                -30,
                -20,
                -10,
                0,
                10,
                20
              ],
              "activation": [
                0.003,
                0.007,
                0.015,
                0.034,
                0.076,
                0.159,
                0.303,
                0.5,
                0.697,
                0.841,
                0.924,
                0.966,
                0.985
              ],
              "availability": [
                0.985,
                0.966,
                0.924,
                0.841,
                0.697,
                0.5,
                0.303,
                0.159,
                0.076,
                0.034,
                0.015,
                0.007,
                0.003
              ],
              "maximum": 0.1,
              "conditions": [
                {
                  "reversal": 50,
                  "noInactivation": false
                }
              ],
              "xLabel": "Membrane voltage (mV)",
              "yLabel": "Outward current (nA)",
              "title": "Control: steady sodium current"
            },
            "caption": "Computed from Exercise8 p2 rounded table. Dots are supplied voltage samples; connecting lines are a visual guide, not a fitted continuous gate model. One condition per panel preserves its own readable current scale.",
            "fallbackAlt": "Control: steady sodium current: signed steady sodium current at each supplied membrane voltage."
          }
        },
        {
          "type": "figure",
          "visual": {
            "type": "svg",
            "name": "tabulated-iv",
            "props": {
              "voltages": [
                -100,
                -90,
                -80,
                -70,
                -60,
                -50,
                -40,
                -30,
                -20,
                -10,
                0,
                10,
                20
              ],
              "activation": [
                0.003,
                0.007,
                0.015,
                0.034,
                0.076,
                0.159,
                0.303,
                0.5,
                0.697,
                0.841,
                0.924,
                0.966,
                0.985
              ],
              "availability": [
                0.985,
                0.966,
                0.924,
                0.841,
                0.697,
                0.5,
                0.303,
                0.159,
                0.076,
                0.034,
                0.015,
                0.007,
                0.003
              ],
              "maximum": 0.1,
              "conditions": [
                {
                  "reversal": 30,
                  "noInactivation": false
                }
              ],
              "xLabel": "Membrane voltage (mV)",
              "yLabel": "Outward current (nA)",
              "title": "Lowered sodium reversal"
            },
            "caption": "Computed from Exercise8 p2 rounded table. Dots are supplied voltage samples; connecting lines are a visual guide, not a fitted continuous gate model. One condition per panel preserves its own readable current scale.",
            "fallbackAlt": "Lowered sodium reversal: signed steady sodium current at each supplied membrane voltage."
          }
        },
        {
          "type": "figure",
          "visual": {
            "type": "svg",
            "name": "tabulated-iv",
            "props": {
              "voltages": [
                -100,
                -90,
                -80,
                -70,
                -60,
                -50,
                -40,
                -30,
                -20,
                -10,
                0,
                10,
                20
              ],
              "activation": [
                0.003,
                0.007,
                0.015,
                0.034,
                0.076,
                0.159,
                0.303,
                0.5,
                0.697,
                0.841,
                0.924,
                0.966,
                0.985
              ],
              "availability": [
                0.985,
                0.966,
                0.924,
                0.841,
                0.697,
                0.5,
                0.303,
                0.159,
                0.076,
                0.034,
                0.015,
                0.007,
                0.003
              ],
              "maximum": 0.1,
              "conditions": [
                {
                  "reversal": 50,
                  "noInactivation": true
                }
              ],
              "xLabel": "Membrane voltage (mV)",
              "yLabel": "Outward current (nA)",
              "title": "Inactivation removed"
            },
            "caption": "Computed from Exercise8 p2 rounded table. Dots are supplied voltage samples; connecting lines are a visual guide, not a fitted continuous gate model. One condition per panel preserves its own readable current scale.",
            "fallbackAlt": "Inactivation removed: signed steady sodium current at each supplied membrane voltage."
          }
        }
      ],
      "formulas": [],
      "conceptQuiz": [
        {
          "id": "L08-ex-iv-check",
          "prompt": "Which gate values should be used at each voltage after equilibration?",
          "correct": 1,
          "options": [
            {
              "text": "Initial activation and availability at every voltage",
              "feedback": "Initial gates describe the starting state, not each steady test voltage."
            },
            {
              "text": "Steady activation and availability at each voltage",
              "feedback": "Each table entry uses steady gates appropriate to its own test voltage."
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
            "Steady activation and availability at each voltage."
          ]
        },
        {
          "id": "L08-ex-iv-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 Exercise8 p1–2 #1",
          "prompt": "In the exercise comparison, what changes when sodium reversal shifts at fixed gates?",
          "options": [
            {
              "text": "The signed sodium driving force",
              "feedback": "The exercise stipulates unchanged gates, so reversal changes the driving-force factor."
            },
            {
              "text": "The steady activation probability",
              "feedback": "Activation is explicitly held unchanged in the reversal comparison."
            },
            {
              "text": "The steady availability probability",
              "feedback": "Availability is explicitly held unchanged in the reversal comparison."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "The exercise stipulates unchanged gates, so reversal changes the driving-force factor."
            }
          ],
          "modelAnswer": [
            "The exercise stipulates unchanged gates, so reversal changes the driving-force factor."
          ]
        }
      ],
      "part": {
        "id": "exercise",
        "number": 4,
        "title": "Exercise 8: independently checked methods"
      }
    },
    {
      "id": "ex-k",
      "title": "Exercise 8: absolute-voltage potassium graph",
      "keyTerms": [],
      "source": "L08 Exercise8 p2 #2",
      "blocks": [
        {
          "type": "text",
          "body": ["The supplied plot explicitly annotates $n_\\infty\\approx0.88$ at absolute $0\\,\\mathrm{mV}$. Raise the particle probability to the fourth power before applying the signed driving force. Do not feed that absolute voltage into an unshifted rest-relative L07 rate law.", "For a voltage jump, distinguish immediate driving-force change at frozen gates from subsequent relaxation toward the new steady activation. Recover conductance from current divided by driving force, then take the fourth root of its maximal fraction. Separate the capacitive transient before interpreting the ionic tail. (Exercise8 PDF p2 #2.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Exercise8, PDF page 2. Source ex potassium panel with original labels and axes.",
            "fallbackAlt": "Exercise8, PDF page 2. Source ex potassium panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/ex-potassium.webp', import.meta.url).href,
              "alt": "Exercise8, PDF page 2. Source ex potassium panel with original labels and axes.",
              "aspect": 1.6624825662482565,
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
          "id": "L08-ex-k-check",
          "prompt": "How is the potassium channel fraction formed from its particle probability?",
          "correct": 0,
          "options": [
            {
              "text": "The fourth power of the particle probability",
              "feedback": "All four independent potassium factors must be permissive, giving the fourth power."
            },
            {
              "text": "The first power of the particle probability",
              "feedback": "The single-particle fraction alone omits the other three required factors."
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
            "The fourth power of the particle probability."
          ]
        },
        {
          "id": "L08-ex-k-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 Exercise8 p2 #2",
          "prompt": "What voltage reference does the supplied potassium activation graph use?",
          "options": [
            {
              "text": "Voltage relative to potassium reversal",
              "feedback": "Potassium reversal sets driving force; it is not the activation graph origin."
            },
            {
              "text": "Absolute inside-minus-outside voltage",
              "feedback": "The source graph uses absolute voltage, unlike the rest-relative L07 empirical rates."
            },
            {
              "text": "Depolarization relative to resting voltage",
              "feedback": "That convention belongs to the empirical L07 rate laws, not this graph."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "The source graph uses absolute voltage, unlike the rest-relative L07 empirical rates."
            }
          ],
          "modelAnswer": [
            "The source graph uses absolute voltage, unlike the rest-relative L07 empirical rates."
          ]
        }
      ]
    },
    {
      "id": "ex-charge",
      "title": "Exercise 8: gating area and single-channel inference",
      "keyTerms": [],
      "source": "L08 Exercise8 p3 #3",
      "blocks": [
        {
          "type": "text",
          "body": ["Use the given charge integral and assigned charge per channel. The source gives measured conductance at its test voltage, without confirming maximal activation. Thus $g_A/D$ estimates single-channel conductance only if fully open; otherwise it measures $\\gamma P_{open}$.", "Integrate the isolated sensor transient, convert the charge-density units, and divide by the assigned elementary charges per channel. Use the same area basis for conductance. A separate fully open measurement makes single-channel conductance identifiable; without it, the test pulse gives only its product with open probability. (Exercise8 PDF p3 #3.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Exercise8, PDF page 3. Source ex gating panel with original labels and axes.",
            "fallbackAlt": "Exercise8, PDF page 3. Source ex gating panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/ex-gating.webp', import.meta.url).href,
              "alt": "Exercise8, PDF page 3. Source ex gating panel with original labels and axes.",
              "aspect": 1.4155597722960152,
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
          "id": "L08-ex-charge-check",
          "prompt": "Which quantity is obtained from the time integral of sensor-current density?",
          "correct": 1,
          "options": [
            {
              "text": "Ionic conductance per unit membrane area",
              "feedback": "Gating-current integration gives charge, not conductance."
            },
            {
              "text": "Displaced charge per unit membrane area",
              "feedback": "Integrating current density over time gives displaced charge per membrane area."
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
            "Displaced charge per unit membrane area."
          ]
        },
        {
          "id": "L08-ex-charge-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L08 Exercise8 p3 #3",
          "prompt": "Without confirmed full opening, what does conductance density divided by channel density represent?",
          "options": [
            {
              "text": "Unitary conductance without an activation factor",
              "feedback": "This equality requires full opening, which the exercise does not establish."
            },
            {
              "text": "Open probability without a conductance factor",
              "feedback": "The quotient still has conductance units and includes unitary conductance."
            },
            {
              "text": "Unitary conductance times open probability",
              "feedback": "The measured conductance reflects both unitary conductance and the fraction open."
            }
          ],
          "correct": 2,
          "hints": [
            {
              "body": "Recall the definition or distinction taught in this section."
            },
            {
              "body": "The measured conductance reflects both unitary conductance and the fraction open."
            }
          ],
          "modelAnswer": [
            "The measured conductance reflects both unitary conductance and the fraction open."
          ]
        }
      ]
    }
  ],
  "lectureQuiz": [
    {
      "id": "L08-circuit-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "circuit",
      "prompt": "What determines the sign of an ionic branch?",
      "options": [
        {
          "text": "The maximum conductance $\\bar g_i$",
          "feedback": "Use this distinction: The driving force $V_m-E_i$."
        },
        {
          "text": "The driving force $V_m-E_i$",
          "feedback": "Correct. The driving force $V_m-E_i$."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "The driving force $V_m-E_i$"
      ],
      "points": 1,
      "source": "L08 8:1 p2"
    },
    {
      "id": "L08-direct-ohmic",
      "practice": "extra",
      "sectionId": "circuit",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "For $g=40\\,\\mathrm{nS}$ and $V-E=-0.060\\,\\mathrm V$, find outward current.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Conductance",
              "answer": {
                "value": 4e-08,
                "unit": "S",
                "tolerance": 4e-14,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 4e-08,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Driving force",
              "answer": {
                "value": -0.06,
                "unit": "V",
                "tolerance": 6e-08,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -0.06,
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
            "value": -2.4e-09,
            "unit": "A",
            "tolerance": 7.2e-12,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 4e-08,
                "b": -0.06
              },
              "displayScale": 1
            }
          },
          "tex": "I=g(V-E)",
          "modelAnswer": [
            "Driving force sets direction; conductance sets scale.",
            "$I=40\\times10^{-9}(-0.060)\\,\\mathrm A$",
            "$-2.4\\times10^{-9}\\,\\mathrm{A}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $I=g(V-E)$."
        },
        {
          "body": "Start with $I=40\\times10^{-9}(-0.060)\\,\\mathrm A$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Driving force sets direction; conductance sets scale."
      ],
      "points": 1,
      "source": "L08 8:1 p2"
    },
    {
      "id": "L08-direct-sum",
      "practice": "extra",
      "sectionId": "circuit",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Sodium plus potassium current is $-1.5\\,\\mathrm{nA}$ and leak is $0.3\\,\\mathrm{nA}$. Find net ionic current.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Sodium plus potassium",
              "answer": {
                "value": -1.5e-09,
                "unit": "A",
                "tolerance": 1.5e-15,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -1.5e-09,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Leak",
              "answer": {
                "value": 3e-10,
                "unit": "A",
                "tolerance": 3e-16,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 3e-10,
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
            "value": -1.2e-09,
            "unit": "A",
            "tolerance": 3.6e-12,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": -1.5e-09,
                "b": 3e-10
              },
              "displayScale": 1
            }
          },
          "tex": "I_{ion}=I_{Na}+I_K+I_L",
          "modelAnswer": [
            "Signed components can cancel without every branch vanishing.",
            "$I_{ion}=(-1.5+0.3)\\,\\mathrm{nA}$",
            "$-1.2\\times10^{-9}\\,\\mathrm{A}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $I_{ion}=I_{Na}+I_K+I_L$."
        },
        {
          "body": "Start with $I_{ion}=(-1.5+0.3)\\,\\mathrm{nA}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Signed components can cancel without every branch vanishing."
      ],
      "points": 1,
      "source": "L08 8:1 p2"
    },
    {
      "id": "L08-agreement-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "agreement",
      "prompt": "Which fitted fraction gives sodium conductance?",
      "options": [
        {
          "text": "$m^3h$, activation times availability",
          "feedback": "Correct. $m^3h$, activation times availability."
        },
        {
          "text": "$n^4$, four potassium activation factors",
          "feedback": "Use this distinction: $m^3h$, activation times availability."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "$m^3h$, activation times availability"
      ],
      "points": 1,
      "source": "L08 8:1 p3"
    },
    {
      "id": "L08-space-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "space",
      "prompt": "Does space clamp also fix voltage over time?",
      "options": [
        {
          "text": "Yes, it removes temporal variation in voltage",
          "feedback": "Use this distinction: No, it removes spatial variation in voltage."
        },
        {
          "text": "No, it removes spatial variation in voltage",
          "feedback": "Correct. No, it removes spatial variation in voltage."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "No, it removes spatial variation in voltage"
      ],
      "points": 1,
      "source": "L08 8:1 p4"
    },
    {
      "id": "L08-direct-axial",
      "sectionId": "space",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "For $a=5\\,\\mu\\mathrm m$, $\\rho_i=1\\,\\Omega\\mathrm m$, and curvature $4\\times10^5\\,\\mathrm{V/m^2}$, find current density.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Radius",
              "answer": {
                "value": 5e-06,
                "unit": "m",
                "tolerance": 5.0000000000000005e-12,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 5e-06,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Resistivity",
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
              "label": "Curvature",
              "answer": {
                "value": 400000.0,
                "unit": "V/m2",
                "tolerance": 0.39999999999999997,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 400000.0,
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
            "value": 1,
            "unit": "A/m2",
            "tolerance": 0.003,
            "verification": {
              "relation": "axialSource",
              "inputs": {
                "radius": 5e-06,
                "rho": 1,
                "curvature": 400000.0
              },
              "displayScale": 1
            }
          },
          "tex": "I_m=\\frac{a}{2\\rho_i}\\partial_x^2V",
          "modelAnswer": [
            "Spatial curvature provides local membrane-current density.",
            "$I_m=5\\times10^{-6}(4\\times10^5)/(2\\times1)\\,\\mathrm{A/m^2}$",
            "$1\\,\\mathrm{A/m^2}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $I_m=\\frac{a}{2\\rho_i}\\partial_x^2V$."
        },
        {
          "body": "Start with $I_m=5\\times10^{-6}(4\\times10^5)/(2\\times1)\\,\\mathrm{A/m^2}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Spatial curvature provides local membrane-current density."
      ],
      "points": 1,
      "source": "L08 8:1 p4"
    },
    {
      "id": "L08-direct-wave",
      "practice": "extra",
      "sectionId": "space",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "For a speed ratio of $3$, find the ratio of inverse-square derivative factors.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Speed ratio",
              "answer": {
                "value": 3,
                "unit": "",
                "tolerance": 3e-06,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 3,
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
            "value": 0.1111111111111111,
            "unit": "",
            "tolerance": 0.0003333333333333333,
            "verification": {
              "relation": "powerRatio",
              "inputs": {
                "a": 3,
                "b": 1,
                "power": -2
              },
              "displayScale": 1
            }
          },
          "tex": "\\partial_x^2V=v^{-2}\\partial_t^2V",
          "modelAnswer": [
            "A rigid travelling profile links spatial and temporal curvature.",
            "$(v_2/v_1)^{-2}=3^{-2}$",
            "$0.11111111$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\partial_x^2V=v^{-2}\\partial_t^2V$."
        },
        {
          "body": "Start with $(v_2/v_1)^{-2}=3^{-2}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "A rigid travelling profile links spatial and temporal curvature."
      ],
      "points": 1,
      "source": "L08 8:1 p4"
    },
    {
      "id": "L08-clamp-facts",
      "sectionId": "space",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "Space clamp prevents all voltage change over time.",
          "answer": false,
          "correction": "Space clamp prevents spatial gradients; voltage may change over time."
        },
        {
          "text": "A propagation equation must retain the ionic driving forces.",
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
        "Space clamp prevents spatial gradients; voltage may change over time.",
        "A propagation equation must retain the ionic driving forces."
      ],
      "points": 1,
      "source": "L08 8:1 p4"
    },
    {
      "id": "L08-nonpropagating-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "nonpropagating",
      "prompt": "After the stimulus ends, rising voltage requires",
      "options": [
        {
          "text": "Net outward ionic current balanced by capacitance",
          "feedback": "Use this distinction: Net inward ionic current balanced by capacitance."
        },
        {
          "text": "Net inward ionic current balanced by capacitance",
          "feedback": "Correct. Net inward ionic current balanced by capacitance."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "Net inward ionic current balanced by capacitance"
      ],
      "points": 1,
      "source": "L08 8:1 p5"
    },
    {
      "id": "L08-direct-balance",
      "sectionId": "nonpropagating",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "After injection ends, $I_m=0$, $I_{ion}=-2\\,\\mathrm{nA}$ and $C=100\\,\\mathrm{pF}$. Find voltage slope.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Applied current",
              "answer": {
                "value": 0,
                "unit": "A",
                "tolerance": 1e-300,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Ionic current",
              "answer": {
                "value": -2e-09,
                "unit": "A",
                "tolerance": 2e-15,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -2e-09,
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
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 20,
            "unit": "V/s",
            "tolerance": 0.06,
            "verification": {
              "relation": "hhBalance",
              "inputs": {
                "im": 0,
                "ionic": -2e-09,
                "capacitance": 1e-10
              },
              "displayScale": 1
            }
          },
          "tex": "\\dot V=(I_m-I_{ion})/C",
          "modelAnswer": [
            "Inward net ionic current makes the membrane voltage rise.",
            "$\\dot V=(0-(-2\\times10^{-9}))/(100\\times10^{-12})\\,\\mathrm{V/s}$",
            "$20\\,\\mathrm{V/s}$"
          ],
          "commonErrors": [
            {
              "wrongValue": -20,
              "tolerance": 0.01,
              "why": "You used outward ionic current directly; subtract it from applied current.",
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": -2e-09,
                  "b": 1e-10
                }
              }
            }
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\dot V=(I_m-I_{ion})/C$."
        },
        {
          "body": "Start with $\\dot V=(0-(-2\\times10^{-9}))/(100\\times10^{-12})\\,\\mathrm{V/s}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Inward net ionic current makes the membrane voltage rise."
      ],
      "points": 1,
      "source": "L08 8:1 p5"
    },
    {
      "id": "L08-regeneration-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "regeneration",
      "prompt": "Why does the wave usually fail to re-excite its wake?",
      "options": [
        {
          "text": "Sodium reversal remains absent after activation",
          "feedback": "Use this distinction: Sodium availability remains reduced after activation."
        },
        {
          "text": "Sodium availability remains reduced after activation",
          "feedback": "Correct. Sodium availability remains reduced after activation."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "Sodium availability remains reduced after activation"
      ],
      "points": 1,
      "source": "L08 8:1 p6"
    },
    {
      "id": "L08-propagating-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "propagating",
      "prompt": "Which extra route matters during propagation?",
      "options": [
        {
          "text": "Only transverse current into local capacitance",
          "feedback": "Use this distinction: Longitudinal current into adjacent axonal regions."
        },
        {
          "text": "Longitudinal current into adjacent axonal regions",
          "feedback": "Correct. Longitudinal current into adjacent axonal regions."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "Longitudinal current into adjacent axonal regions"
      ],
      "points": 1,
      "source": "L08 8:1 p7"
    },
    {
      "id": "L08-noble-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "noble",
      "prompt": "What is held slow in the momentary approximation?",
      "options": [
        {
          "text": "Sodium activation $m$ and driving force $V-E$",
          "feedback": "Use this distinction: Potassium activation $n$ and availability $h$."
        },
        {
          "text": "Potassium activation $n$ and availability $h$",
          "feedback": "Correct. Potassium activation $n$ and availability $h$."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "Potassium activation $n$ and availability $h$"
      ],
      "points": 1,
      "source": "L08 8:1 p8"
    },
    {
      "id": "L08-moving-iv-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "moving-iv",
      "prompt": "Which sign of momentary slope amplifies a displacement?",
      "options": [
        {
          "text": "Negative slope with zero applied current",
          "feedback": "Correct. Negative slope with zero applied current."
        },
        {
          "text": "Positive slope with zero applied current",
          "feedback": "Use this distinction: Negative slope with zero applied current."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "Negative slope with zero applied current"
      ],
      "points": 1,
      "source": "L08 8:1 p9"
    },
    {
      "id": "L08-direct-stability",
      "sectionId": "moving-iv",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "For $G_{slope}=-4\\,\\mathrm{nS}$ and $C=80\\,\\mathrm{pF}$, find the perturbation growth rate.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Negative of slope",
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
            },
            {
              "label": "Capacitance",
              "answer": {
                "value": 8e-11,
                "unit": "F",
                "tolerance": 7.999999999999999e-17,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 8e-11,
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
            "value": 50,
            "unit": "1/s",
            "tolerance": 0.15,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 4e-09,
                "b": 8e-11
              },
              "displayScale": 1
            }
          },
          "tex": "k=-G_{slope}/C",
          "modelAnswer": [
            "Negative momentary current slope amplifies a small displacement.",
            "$k=-(-4\\times10^{-9})/(80\\times10^{-12})\\,\\mathrm{s^{-1}}$",
            "$50\\,\\mathrm{s^{-1}}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $k=-G_{slope}/C$."
        },
        {
          "body": "Start with $k=-(-4\\times10^{-9})/(80\\times10^{-12})\\,\\mathrm{s^{-1}}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Negative momentary current slope amplifies a small displacement."
      ],
      "points": 1,
      "source": "L08 8:1 p9"
    },
    {
      "id": "L08-threshold-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "threshold",
      "prompt": "What distinguishes the basic HH response at fixed initial state?",
      "options": [
        {
          "text": "Identical stimuli give deterministic responses",
          "feedback": "Correct. Identical stimuli give deterministic responses."
        },
        {
          "text": "Identical stimuli give inherently random responses",
          "feedback": "Use this distinction: Identical stimuli give deterministic responses."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "Identical stimuli give deterministic responses"
      ],
      "points": 1,
      "source": "L08 8:1 p10"
    },
    {
      "id": "L08-feedback-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "feedback",
      "prompt": "Which process belongs to the fast positive loop?",
      "options": [
        {
          "text": "Depolarization removes all sodium driving force",
          "feedback": "Use this distinction: Depolarization recruits inward sodium current."
        },
        {
          "text": "Depolarization recruits inward sodium current",
          "feedback": "Correct. Depolarization recruits inward sodium current."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "Depolarization recruits inward sodium current"
      ],
      "points": 1,
      "source": "L08 8:1 p11"
    },
    {
      "id": "L08-phases-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "phases",
      "prompt": "Why can high sodium conductance carry little current?",
      "options": [
        {
          "text": "Conductance can remove sodium reversal potential",
          "feedback": "Use this distinction: Voltage can approach sodium reversal potential."
        },
        {
          "text": "Voltage can approach sodium reversal potential",
          "feedback": "Correct. Voltage can approach sodium reversal potential."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "Voltage can approach sodium reversal potential"
      ],
      "points": 1,
      "source": "L08 8:1 p12"
    },
    {
      "id": "L08-accommodation-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "accommodation",
      "prompt": "What can a slow depolarizing ramp do?",
      "options": [
        {
          "text": "Raise threshold through slow gating changes",
          "feedback": "Correct. Raise threshold through slow gating changes."
        },
        {
          "text": "Lower threshold while all slow gates stay fixed",
          "feedback": "Use this distinction: Raise threshold through slow gating changes."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "Raise threshold through slow gating changes"
      ],
      "points": 1,
      "source": "L08 8:1 p13"
    },
    {
      "id": "L08-refractory-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "refractory",
      "prompt": "What distinguishes relative refractoriness?",
      "options": [
        {
          "text": "A stronger second stimulus may still trigger a spike",
          "feedback": "Correct. A stronger second stimulus may still trigger a spike."
        },
        {
          "text": "No second stimulus strength can trigger a spike",
          "feedback": "Use this distinction: A stronger second stimulus may still trigger a spike."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "A stronger second stimulus may still trigger a spike"
      ],
      "points": 1,
      "source": "L08 8:1 p14"
    },
    {
      "id": "L08-sensor-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "sensor",
      "prompt": "What produces a gating current?",
      "options": [
        {
          "text": "Movement of channel voltage-sensor charge",
          "feedback": "Correct. Movement of channel voltage-sensor charge."
        },
        {
          "text": "Movement of sodium ions through an open pore",
          "feedback": "Use this distinction: Movement of channel voltage-sensor charge."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "Movement of channel voltage-sensor charge"
      ],
      "points": 1,
      "source": "L08 8:1 p15"
    },
    {
      "id": "L08-boltzmann-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "boltzmann",
      "prompt": "Which denominator normalizes positive odds?",
      "options": [
        {
          "text": "$1-r$, so probability stays bounded",
          "feedback": "Use this distinction: $1+r$, so probability stays bounded."
        },
        {
          "text": "$1+r$, so probability stays bounded",
          "feedback": "Correct. $1+r$, so probability stays bounded."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "$1+r$, so probability stays bounded"
      ],
      "points": 1,
      "source": "L08 8:1 p16–17"
    },
    {
      "id": "L08-direct-energy",
      "practice": "extra",
      "sectionId": "boltzmann",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "For displaced charge $ze=8\\times10^{-19}\\,\\mathrm C$ and voltage displacement $0.010\\,\\mathrm V$, find electrical work.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Displaced charge",
              "answer": {
                "value": 8e-19,
                "unit": "C",
                "tolerance": 7.999999999999999e-25,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 8e-19,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Voltage",
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
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 8e-21,
            "unit": "J",
            "tolerance": 2.4e-23,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 8e-19,
                "b": 0.01
              },
              "displayScale": 1
            }
          },
          "tex": "\\Delta G=zeV",
          "modelAnswer": [
            "Voltage changes the energy of a displaced charge.",
            "$\\Delta G=(8\\times10^{-19})(0.010)\\,\\mathrm J$",
            "$8\\times10^{-21}\\,\\mathrm{J}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\Delta G=zeV$."
        },
        {
          "body": "Start with $\\Delta G=(8\\times10^{-19})(0.010)\\,\\mathrm J$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Voltage changes the energy of a displaced charge."
      ],
      "points": 1,
      "source": "L08 8:1 p16–17"
    },
    {
      "id": "L08-direct-odds",
      "practice": "extra",
      "sectionId": "boltzmann",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "For dimensionless bias $x=\\ln 3$, find outside/inside odds.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Bias",
              "answer": {
                "value": 1.0986122886681098,
                "unit": "",
                "tolerance": 1.0986122886681098e-06,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1.0986122886681098,
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
              "relation": "exponentialRate",
              "inputs": {
                "base": 1,
                "exponent": 1.0986122886681098
              },
              "displayScale": 1
            }
          },
          "tex": "r=e^x,\\quad x=(w+zeV)/(kT)",
          "modelAnswer": [
            "State odds grow exponentially with activation-favoring bias.",
            "$r=e^{\\ln 3}$",
            "$3$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $r=e^x,\\quad x=(w+zeV)/(kT)$."
        },
        {
          "body": "Start with $r=e^{\\ln 3}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "State odds grow exponentially with activation-favoring bias."
      ],
      "points": 1,
      "source": "L08 8:1 p16–17"
    },
    {
      "id": "L08-direct-probability",
      "sectionId": "boltzmann",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Let $b=0$, $z=2$, $V=0.010\\,\\mathrm V$, and $V_T=0.025\\,\\mathrm V$. Find the permissive probability.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Bias",
              "answer": {
                "value": 0,
                "unit": "",
                "tolerance": 1e-300,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Effective charge",
              "answer": {
                "value": 2,
                "unit": "",
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
              "label": "Voltage",
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
              "label": "Thermal voltage",
              "answer": {
                "value": 0.025,
                "unit": "V",
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
            "value": 0.6899744811276125,
            "unit": "",
            "tolerance": 0.0020699234433828374,
            "verification": {
              "relation": "boltzmann",
              "inputs": {
                "bias": 0,
                "z": 2,
                "voltage": 0.01,
                "thermal": 0.025
              },
              "displayScale": 1
            }
          },
          "tex": "y=\\frac{1}{1+e^{-(b+zV/V_T)}}",
          "modelAnswer": [
            "Normalization keeps activation bounded while odds grow.",
            "$y=(1+e^{-0.8})^{-1}$",
            "$0.68997448$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $y=\\frac{1}{1+e^{-(b+zV/V_T)}}$."
        },
        {
          "body": "Start with $y=(1+e^{-0.8})^{-1}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Normalization keeps activation bounded while odds grow."
      ],
      "points": 1,
      "source": "L08 8:1 p16–17"
    },
    {
      "id": "L08-charge-slope-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "charge-slope",
      "prompt": "What does the slope-derived charge represent?",
      "options": [
        {
          "text": "An exact count of independently hinged protein gates",
          "feedback": "Use this distinction: An effective displaced charge under the stated model."
        },
        {
          "text": "An effective displaced charge under the stated model",
          "feedback": "Correct. An effective displaced charge under the stated model."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "An effective displaced charge under the stated model"
      ],
      "points": 1,
      "source": "L08 8:1 p17"
    },
    {
      "id": "L08-direct-z",
      "sectionId": "charge-slope",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $V_T=25\\,\\mathrm{mV}$ and e-fold scale $s=5\\,\\mathrm{mV}$. Find effective charge number.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Thermal voltage",
              "answer": {
                "value": 0.025,
                "unit": "V",
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
            },
            {
              "label": "E-fold scale",
              "answer": {
                "value": 0.005,
                "unit": "V",
                "tolerance": 5e-09,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.005,
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
            "value": 5,
            "unit": "",
            "tolerance": 0.015,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 0.025,
                "b": 0.005
              },
              "displayScale": 1
            }
          },
          "tex": "z=V_T/s",
          "modelAnswer": [
            "A steeper log-conductance slope implies a larger effective charge.",
            "$z=0.025/0.005$",
            "$5$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $z=V_T/s$."
        },
        {
          "body": "Start with $z=0.025/0.005$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "A steeper log-conductance slope implies a larger effective charge."
      ],
      "points": 1,
      "source": "L08 8:1 p17"
    },
    {
      "id": "L08-direct-efold",
      "practice": "extra",
      "sectionId": "charge-slope",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "For $\\Delta V=10\\,\\mathrm{mV}$ and $s=5\\,\\mathrm{mV}$, find the conductance ratio.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
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
              "label": "E-fold scale",
              "answer": {
                "value": 0.005,
                "unit": "V",
                "tolerance": 5e-09,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.005,
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
            "value": 7.38905609893065,
            "unit": "",
            "tolerance": 0.022167168296791953,
            "verification": {
              "relation": "exponentialRate",
              "inputs": {
                "base": 1,
                "exponent": 2
              },
              "displayScale": 1
            }
          },
          "tex": "g_2/g_1=e^{\\Delta V/s}",
          "modelAnswer": [
            "A voltage increment multiplies low-activation conductance.",
            "$g_2/g_1=e^{0.010/0.005}$",
            "$7.3890561$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $g_2/g_1=e^{\\Delta V/s}$."
        },
        {
          "body": "Start with $g_2/g_1=e^{0.010/0.005}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "A voltage increment multiplies low-activation conductance."
      ],
      "points": 1,
      "source": "L08 8:1 p17"
    },
    {
      "id": "L08-isolation-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "isolation",
      "prompt": "Which contribution should remain after valid subtraction?",
      "options": [
        {
          "text": "Linear membrane-capacitance charging of the step",
          "feedback": "Use this distinction: Nonlinear gating-charge movement of the sensors."
        },
        {
          "text": "Nonlinear gating-charge movement of the sensors",
          "feedback": "Correct. Nonlinear gating-charge movement of the sensors."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "Nonlinear gating-charge movement of the sensors"
      ],
      "points": 1,
      "source": "L08 8:1 p18"
    },
    {
      "id": "L08-capacitance-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "capacitance",
      "prompt": "What is integrated to estimate capacitive charge?",
      "options": [
        {
          "text": "Total current including steady leak throughout",
          "feedback": "Use this distinction: Transient current after steady leak subtraction."
        },
        {
          "text": "Transient current after steady leak subtraction",
          "feedback": "Correct. Transient current after steady leak subtraction."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "Transient current after steady leak subtraction"
      ],
      "points": 1,
      "source": "L08 8:1 p19"
    },
    {
      "id": "L08-direct-charge",
      "sectionId": "capacitance",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "An ideal corrected transient has $I_0=1\\,\\mathrm{nA}$, $\\tau=1\\,\\mathrm{ms}$. Find charge integrated to $2\\,\\mathrm{ms}$.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Initial current",
              "answer": {
                "value": 1e-09,
                "unit": "A",
                "tolerance": 1e-15,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1e-09,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Time constant",
              "answer": {
                "value": 0.001,
                "unit": "s",
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
              "label": "Time",
              "answer": {
                "value": 0.002,
                "unit": "s",
                "tolerance": 2e-09,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.002,
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
            "value": 8.646647167633873e-13,
            "unit": "C",
            "tolerance": 2.5939941502901618e-15,
            "verification": {
              "relation": "expCharge",
              "inputs": {
                "current": 1e-09,
                "tau": 0.001,
                "time": 0.002
              },
              "displayScale": 1
            }
          },
          "tex": "Q(t)=I_0\\tau(1-e^{-t/\\tau})",
          "modelAnswer": [
            "The integral saturates as the corrected transient decays.",
            "$Q=10^{-9}(10^{-3})(1-e^{-2})\\,\\mathrm C$",
            "$8.6466472\\times10^{-13}\\,\\mathrm{C}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $Q(t)=I_0\\tau(1-e^{-t/\\tau})$."
        },
        {
          "body": "Start with $Q=10^{-9}(10^{-3})(1-e^{-2})\\,\\mathrm C$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "The integral saturates as the corrected transient decays."
      ],
      "points": 1,
      "source": "L08 8:1 p19"
    },
    {
      "id": "L08-direct-cap",
      "practice": "extra",
      "sectionId": "capacitance",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "A corrected charge is $0.6\\,\\mathrm{pC}$ for a $10\\,\\mathrm{mV}$ step. Find capacitance.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Charge",
              "answer": {
                "value": 6e-13,
                "unit": "C",
                "tolerance": 6e-19,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 6e-13,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Step",
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
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 6e-11,
            "unit": "F",
            "tolerance": 1.8e-13,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 6e-13,
                "b": 0.01
              },
              "displayScale": 1
            }
          },
          "tex": "C=Q/\\Delta V",
          "modelAnswer": [
            "The charge needed for a voltage step measures capacitance.",
            "$C=0.6\\times10^{-12}/0.010\\,\\mathrm F$",
            "$6\\times10^{-11}\\,\\mathrm{F}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $C=Q/\\Delta V$."
        },
        {
          "body": "Start with $C=0.6\\times10^{-12}/0.010\\,\\mathrm F$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "The charge needed for a voltage step measures capacitance."
      ],
      "points": 1,
      "source": "L08 8:1 p19"
    },
    {
      "id": "L08-direct-area",
      "practice": "extra",
      "sectionId": "capacitance",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "For $C=60\\,\\mathrm{pF}$ and $c_m=0.01\\,\\mathrm{F/m^2}$, find area.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Capacitance",
              "answer": {
                "value": 6e-11,
                "unit": "F",
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
            "value": 6e-09,
            "unit": "m2",
            "tolerance": 1.8e-11,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 6e-11,
                "b": 0.01
              },
              "displayScale": 1
            }
          },
          "tex": "A=C/c_m",
          "modelAnswer": [
            "Capacitance estimates area under a specific-capacitance assumption.",
            "$A=60\\times10^{-12}/0.01\\,\\mathrm{m^2}$",
            "$6\\times10^{-9}\\,\\mathrm{m2}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $A=C/c_m$."
        },
        {
          "body": "Start with $A=60\\times10^{-12}/0.01\\,\\mathrm{m^2}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Capacitance estimates area under a specific-capacitance assumption."
      ],
      "points": 1,
      "source": "L08 8:1 p19"
    },
    {
      "id": "L08-direct-normalize",
      "practice": "extra",
      "sectionId": "capacitance",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "For $I=-300\\,\\mathrm{pA}$ and $C=60\\,\\mathrm{pF}$, find current per capacitance.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Current",
              "answer": {
                "value": -3e-10,
                "unit": "A",
                "tolerance": 3e-16,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -3e-10,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Capacitance",
              "answer": {
                "value": 6e-11,
                "unit": "F",
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
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": -5,
            "unit": "A/F",
            "tolerance": 0.015,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": -3e-10,
                "b": 6e-11
              },
              "displayScale": 1
            }
          },
          "tex": "j_C=I/C",
          "modelAnswer": [
            "Normalization separates current scale from cell size.",
            "$j_C=-300\\times10^{-12}/(60\\times10^{-12})\\,\\mathrm{A/F}$",
            "$-5\\,\\mathrm{A/F}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $j_C=I/C$."
        },
        {
          "body": "Start with $j_C=-300\\times10^{-12}/(60\\times10^{-12})\\,\\mathrm{A/F}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Normalization separates current scale from cell size."
      ],
      "points": 1,
      "source": "L08 8:1 p19"
    },
    {
      "id": "L08-density-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "density",
      "prompt": "Which conductance is needed for single-channel inference?",
      "options": [
        {
          "text": "Maximal conductance normalized to the same area",
          "feedback": "Correct. Maximal conductance normalized to the same area."
        },
        {
          "text": "Arbitrary transient current normalized to voltage",
          "feedback": "Use this distinction: Maximal conductance normalized to the same area."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "Maximal conductance normalized to the same area"
      ],
      "points": 1,
      "source": "L08 8:1 p20"
    },
    {
      "id": "L08-direct-density",
      "sectionId": "density",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Charge density is $0.0048\\,\\mathrm{C/m^2}$ and each channel moves $8\\times10^{-19}\\,\\mathrm C$. Find channel density.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Charge density",
              "answer": {
                "value": 0.0048,
                "unit": "C/m2",
                "tolerance": 4.799999999999999e-09,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.0048,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Charge per channel",
              "answer": {
                "value": 8e-19,
                "unit": "C",
                "tolerance": 7.999999999999999e-25,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 8e-19,
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
            "value": 6000000000000000.0,
            "unit": "1/m2",
            "tolerance": 18000000000000.0,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 0.0048,
                "b": 8e-19
              },
              "displayScale": 1
            }
          },
          "tex": "D=Q_A/(ze)",
          "modelAnswer": [
            "Total displaced charge counts participating channels under the charge assumption.",
            "$D=0.0048/(8\\times10^{-19})\\,\\mathrm{m^{-2}}$",
            "$6\\times10^{15}\\,\\mathrm{1/m2}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $D=Q_A/(ze)$."
        },
        {
          "body": "Start with $D=0.0048/(8\\times10^{-19})\\,\\mathrm{m^{-2}}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Total displaced charge counts participating channels under the charge assumption."
      ],
      "points": 1,
      "source": "L08 8:1 p20"
    },
    {
      "id": "L08-direct-single",
      "sectionId": "density",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "For $\\bar g_A=1200\\,\\mathrm{S/m^2}$ and $D=3\\times10^{14}\\,\\mathrm{m^{-2}}$, find single-channel conductance.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Maximal conductance density",
              "answer": {
                "value": 1200,
                "unit": "S/m2",
                "tolerance": 0.0012,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1200,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Channel density",
              "answer": {
                "value": 300000000000000.0,
                "unit": "1/m2",
                "tolerance": 300000000.0,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 300000000000000.0,
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
            "value": 4e-12,
            "unit": "S",
            "tolerance": 1.2e-14,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 1200,
                "b": 300000000000000.0
              },
              "displayScale": 1
            }
          },
          "tex": "\\gamma=\\bar g_A/D",
          "modelAnswer": [
            "Maximal conductance divided by participating channel count gives one-channel conductance.",
            "$\\gamma=1200/(3\\times10^{14})\\,\\mathrm S$",
            "$4\\times10^{-12}\\,\\mathrm{S}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\gamma=\\bar g_A/D$."
        },
        {
          "body": "Start with $\\gamma=1200/(3\\times10^{14})\\,\\mathrm S$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Maximal conductance divided by participating channel count gives one-channel conductance."
      ],
      "points": 1,
      "source": "L08 8:1 p20"
    },
    {
      "id": "L08-synthesis-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "synthesis",
      "prompt": "What closes the dynamic HH description?",
      "options": [
        {
          "text": "Gating kinetics together with membrane current balance",
          "feedback": "Correct. Gating kinetics together with membrane current balance."
        },
        {
          "text": "Gating probabilities without any membrane current balance",
          "feedback": "Use this distinction: Gating kinetics together with membrane current balance."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "Gating kinetics together with membrane current balance"
      ],
      "points": 1,
      "source": "L08 8:1 p21–22"
    },
    {
      "id": "L08-ais-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "ais",
      "prompt": "Where is the usual low-threshold initiation site?",
      "options": [
        {
          "text": "The sodium-channel-rich axon initial segment",
          "feedback": "Correct. The sodium-channel-rich axon initial segment."
        },
        {
          "text": "The myelin-covered center of each internode",
          "feedback": "Use this distinction: The sodium-channel-rich axon initial segment."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "The sodium-channel-rich axon initial segment"
      ],
      "points": 1,
      "source": "L08 8:2 p1–2"
    },
    {
      "id": "L08-diameter-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "diameter",
      "prompt": "How does comparable unmyelinated speed scale?",
      "options": [
        {
          "text": "As the square of axon diameter",
          "feedback": "Use this distinction: As the square root of axon diameter."
        },
        {
          "text": "As the square root of axon diameter",
          "feedback": "Correct. As the square root of axon diameter."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "As the square root of axon diameter"
      ],
      "points": 1,
      "source": "L08 8:2 p3"
    },
    {
      "id": "L08-direct-unmyelin",
      "sectionId": "diameter",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Diameter rises from $2$ to $18\\,\\mu\\mathrm m$. Find the predicted unmyelinated speed ratio.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "New diameter",
              "answer": {
                "value": 1.8e-05,
                "unit": "m",
                "tolerance": 1.8e-11,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1.8e-05,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Old diameter",
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
            "value": 3,
            "unit": "",
            "tolerance": 0.009000000000000001,
            "verification": {
              "relation": "powerRatio",
              "inputs": {
                "a": 1.8e-05,
                "b": 2e-06,
                "power": 0.5
              },
              "displayScale": 1
            }
          },
          "tex": "v_2/v_1=\\sqrt{d_2/d_1}",
          "modelAnswer": [
            "Doubling speed needs four times the diameter in this approximation.",
            "$v_2/v_1=\\sqrt{18/2}$",
            "$3$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $v_2/v_1=\\sqrt{d_2/d_1}$."
        },
        {
          "body": "Start with $v_2/v_1=\\sqrt{18/2}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Doubling speed needs four times the diameter in this approximation."
      ],
      "points": 1,
      "source": "L08 8:2 p3"
    },
    {
      "id": "L08-speed-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "speed",
      "prompt": "Which is the source myelinated scaling?",
      "options": [
        {
          "text": "Approximately proportional to fiber diameter",
          "feedback": "Correct. Approximately proportional to fiber diameter."
        },
        {
          "text": "Approximately proportional to squared diameter",
          "feedback": "Use this distinction: Approximately proportional to fiber diameter."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "Approximately proportional to fiber diameter"
      ],
      "points": 1,
      "source": "L08 8:2 p4"
    },
    {
      "id": "L08-direct-myelinspeed",
      "practice": "extra",
      "sectionId": "speed",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $k=6\\times10^6\\,\\mathrm{s^{-1}}$ and fiber diameter $D=8\\,\\mu\\mathrm m$. Estimate speed.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Coefficient",
              "answer": {
                "value": 6000000.0,
                "unit": "1/s",
                "tolerance": 6.0,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 6000000.0,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Diameter",
              "answer": {
                "value": 8e-06,
                "unit": "m",
                "tolerance": 8e-12,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 8e-06,
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
            "value": 48,
            "unit": "m/s",
            "tolerance": 0.14400000000000002,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 6000000.0,
                "b": 8e-06
              },
              "displayScale": 1
            }
          },
          "tex": "v\\approx kD",
          "modelAnswer": [
            "Larger comparable myelinated fibers conduct approximately proportionally faster.",
            "$v\\approx6\\times10^6(8\\times10^{-6})\\,\\mathrm{m/s}$",
            "$48\\,\\mathrm{m/s}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $v\\approx kD$."
        },
        {
          "body": "Start with $v\\approx6\\times10^6(8\\times10^{-6})\\,\\mathrm{m/s}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Larger comparable myelinated fibers conduct approximately proportionally faster."
      ],
      "points": 1,
      "source": "L08 8:2 p4"
    },
    {
      "id": "L08-glia-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "glia",
      "prompt": "Which cell can myelinate multiple CNS internodes?",
      "options": [
        {
          "text": "A Schwann cell making one peripheral segment",
          "feedback": "Use this distinction: An oligodendrocyte contacting several segments."
        },
        {
          "text": "An oligodendrocyte contacting several segments",
          "feedback": "Correct. An oligodendrocyte contacting several segments."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "An oligodendrocyte contacting several segments"
      ],
      "points": 1,
      "source": "L08 8:2 p5"
    },
    {
      "id": "L08-insulation-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "insulation",
      "prompt": "Does higher resistance alone prove a smaller time constant?",
      "options": [
        {
          "text": "Yes, higher resistance always makes charging faster",
          "feedback": "Use this distinction: No, the capacitance change must also be considered."
        },
        {
          "text": "No, the capacitance change must also be considered",
          "feedback": "Correct. No, the capacitance change must also be considered."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "No, the capacitance change must also be considered"
      ],
      "points": 1,
      "source": "L08 8:2 p6"
    },
    {
      "id": "L08-direct-series-r",
      "practice": "extra",
      "sectionId": "insulation",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Four ideal layers each have resistance $20\\,\\mathrm{M\\Omega}$. Find effective resistance.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Layers",
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
            },
            {
              "label": "One-layer resistance",
              "answer": {
                "value": 20000000.0,
                "unit": "ohm",
                "tolerance": 20.0,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 20000000.0,
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
            "value": 80000000.0,
            "unit": "ohm",
            "tolerance": 240000.0,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 4,
                "b": 20000000.0
              },
              "displayScale": 1
            }
          },
          "tex": "R_N=NR_1",
          "modelAnswer": [
            "Series layers add transverse resistance.",
            "$R_4=4(20\\times10^6)\\,\\Omega$",
            "$80000000\\,\\mathrm{ohm}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $R_N=NR_1$."
        },
        {
          "body": "Start with $R_4=4(20\\times10^6)\\,\\Omega$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Series layers add transverse resistance."
      ],
      "points": 1,
      "source": "L08 8:2 p6"
    },
    {
      "id": "L08-direct-series-c",
      "practice": "extra",
      "sectionId": "insulation",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Four ideal layers each have capacitance $40\\,\\mathrm{pF}$. Find effective capacitance.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "One-layer capacitance",
              "answer": {
                "value": 4e-11,
                "unit": "F",
                "tolerance": 3.9999999999999997e-17,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 4e-11,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Layers",
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
            "value": 1e-11,
            "unit": "F",
            "tolerance": 3e-14,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 4e-11,
                "b": 4
              },
              "displayScale": 1
            }
          },
          "tex": "C_N=C_1/N",
          "modelAnswer": [
            "Series layers reduce transverse capacitance.",
            "$C_4=40\\times10^{-12}/4\\,\\mathrm F$",
            "$1\\times10^{-11}\\,\\mathrm{F}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $C_N=C_1/N$."
        },
        {
          "body": "Start with $C_4=40\\times10^{-12}/4\\,\\mathrm F$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Series layers reduce transverse capacitance."
      ],
      "points": 1,
      "source": "L08 8:2 p6"
    },
    {
      "id": "L08-direct-thickness",
      "sectionId": "insulation",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $\\varepsilon=2\\times10^{-11}\\,\\mathrm{F/m}$, $A=10^{-8}\\,\\mathrm{m^2}$ and $t_m=2\\times10^{-8}\\,\\mathrm m$. Find capacitance.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Permittivity",
              "answer": {
                "value": 2e-11,
                "unit": "F/m",
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
              "label": "Area",
              "answer": {
                "value": 1e-08,
                "unit": "m2",
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
            },
            {
              "label": "Thickness",
              "answer": {
                "value": 2e-08,
                "unit": "m",
                "tolerance": 2e-14,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 2e-08,
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
            "value": 1e-11,
            "unit": "F",
            "tolerance": 3e-14,
            "verification": {
              "relation": "geometry",
              "inputs": {
                "epsilon": 2e-11,
                "area": 1e-08,
                "distance": 2e-08
              },
              "displayScale": 1
            }
          },
          "tex": "C=\\varepsilon A/t_m",
          "modelAnswer": [
            "Greater effective thickness reduces capacitance at fixed area.",
            "$C=(2\\times10^{-11})(10^{-8})/(2\\times10^{-8})\\,\\mathrm F$",
            "$1\\times10^{-11}\\,\\mathrm{F}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $C=\\varepsilon A/t_m$."
        },
        {
          "body": "Start with $C=(2\\times10^{-11})(10^{-8})/(2\\times10^{-8})\\,\\mathrm F$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Greater effective thickness reduces capacitance at fixed area."
      ],
      "points": 1,
      "source": "L08 8:2 p6"
    },
    {
      "id": "L08-direct-tau",
      "practice": "extra",
      "sectionId": "insulation",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "For $R=80\\,\\mathrm{M\\Omega}$ and $C=10\\,\\mathrm{pF}$, find time constant.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Resistance",
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
            "value": 0.0008,
            "unit": "s",
            "tolerance": 2.4000000000000003e-06,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 80000000.0,
                "b": 1e-11
              },
              "displayScale": 1
            }
          },
          "tex": "\\tau=RC",
          "modelAnswer": [
            "Opposite resistance and capacitance changes can cancel.",
            "$\\tau=(80\\times10^6)(10\\times10^{-12})\\,\\mathrm s$",
            "$0.0008\\,\\mathrm{s}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\tau=RC$."
        },
        {
          "body": "Start with $\\tau=(80\\times10^6)(10\\times10^{-12})\\,\\mathrm s$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Opposite resistance and capacitance changes can cancel."
      ],
      "points": 1,
      "source": "L08 8:2 p6"
    },
    {
      "id": "L08-direct-lambda",
      "sectionId": "insulation",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "For $r_m=100\\,\\Omega\\mathrm m$ and $r_i=10^8\\,\\Omega/\\mathrm m$, find length constant.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Membrane parameter",
              "answer": {
                "value": 100,
                "unit": "ohm*m",
                "tolerance": 9.999999999999999e-05,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 100,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Axial parameter",
              "answer": {
                "value": 100000000.0,
                "unit": "ohm/m",
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
                "rm": 100,
                "ri": 100000000.0
              },
              "displayScale": 1
            }
          },
          "tex": "\\lambda=\\sqrt{r_m/r_i}",
          "modelAnswer": [
            "Reduced transverse leakage permits farther passive spread.",
            "$\\lambda=\\sqrt{100/10^8}\\,\\mathrm m$",
            "$0.001\\,\\mathrm{m}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\lambda=\\sqrt{r_m/r_i}$."
        },
        {
          "body": "Start with $\\lambda=\\sqrt{100/10^8}\\,\\mathrm m$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Reduced transverse leakage permits farther passive spread."
      ],
      "points": 1,
      "source": "L08 8:2 p6"
    },
    {
      "id": "L08-myelin-facts",
      "sectionId": "insulation",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "Higher membrane resistance alone guarantees a shorter time constant.",
          "answer": false,
          "correction": "The time constant depends on the resistance-capacitance product."
        },
        {
          "text": "Myelin reduces transverse leakage and effective capacitance.",
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
        "The time constant depends on the resistance-capacitance product.",
        "Myelin reduces transverse leakage and effective capacitance."
      ],
      "points": 1,
      "source": "L08 8:2 p6"
    },
    {
      "id": "L08-node-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "node",
      "prompt": "Where is the node of Ranvier?",
      "options": [
        {
          "text": "At the short exposed gap between myelin segments",
          "feedback": "Correct. At the short exposed gap between myelin segments."
        },
        {
          "text": "At the long insulated center between nodal gaps",
          "feedback": "Use this distinction: At the short exposed gap between myelin segments."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "At the short exposed gap between myelin segments"
      ],
      "points": 1,
      "source": "L08 8:2 p7"
    },
    {
      "id": "L08-dimensions-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "dimensions",
      "prompt": "Which diameter includes the myelin sheath?",
      "options": [
        {
          "text": "Inner axon diameter $d$ in the supplied fit",
          "feedback": "Use this distinction: Outer fiber diameter $D$ in the supplied fit."
        },
        {
          "text": "Outer fiber diameter $D$ in the supplied fit",
          "feedback": "Correct. Outer fiber diameter $D$ in the supplied fit."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "Outer fiber diameter $D$ in the supplied fit"
      ],
      "points": 1,
      "source": "L08 8:2 p8"
    },
    {
      "id": "L08-direct-internode",
      "practice": "extra",
      "sectionId": "dimensions",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "For outer diameter $D=8\\,\\mu\\mathrm m$, estimate internode length with the source fit.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Fit coefficient",
              "answer": {
                "value": 146,
                "unit": "",
                "tolerance": 0.000146,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 146,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Diameter",
              "answer": {
                "value": 8e-06,
                "unit": "m",
                "tolerance": 8e-12,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 8e-06,
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
            "value": 0.001168,
            "unit": "m",
            "tolerance": 3.504e-06,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 146,
                "b": 8e-06
              },
              "displayScale": 1
            }
          },
          "tex": "L\\approx146D",
          "modelAnswer": [
            "Longer internodes accompany larger fibers in the supplied empirical fit.",
            "$L\\approx146(8\\times10^{-6})\\,\\mathrm m$",
            "$0.001168\\,\\mathrm{m}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $L\\approx146D$."
        },
        {
          "body": "Start with $L\\approx146(8\\times10^{-6})\\,\\mathrm m$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Longer internodes accompany larger fibers in the supplied empirical fit."
      ],
      "points": 1,
      "source": "L08 8:2 p8"
    },
    {
      "id": "L08-direct-inner",
      "practice": "extra",
      "sectionId": "dimensions",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "For outer diameter $D=8\\,\\mu\\mathrm m$, estimate inner diameter.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Ratio",
              "answer": {
                "value": 0.74,
                "unit": "",
                "tolerance": 7.4e-07,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.74,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Outer diameter",
              "answer": {
                "value": 8e-06,
                "unit": "m",
                "tolerance": 8e-12,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 8e-06,
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
            "value": 5.92e-06,
            "unit": "m",
            "tolerance": 1.776e-08,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 0.74,
                "b": 8e-06
              },
              "displayScale": 1
            }
          },
          "tex": "d\\approx0.74D",
          "modelAnswer": [
            "The inner diameter excludes myelin thickness.",
            "$d\\approx0.74(8\\times10^{-6})\\,\\mathrm m$",
            "$5.92\\times10^{-6}\\,\\mathrm{m}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $d\\approx0.74D$."
        },
        {
          "body": "Start with $d\\approx0.74(8\\times10^{-6})\\,\\mathrm m$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "The inner diameter excludes myelin thickness."
      ],
      "points": 1,
      "source": "L08 8:2 p8"
    },
    {
      "id": "L08-direct-nodelength",
      "practice": "extra",
      "sectionId": "dimensions",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "For $L=1.2\\,\\mathrm{mm}$, estimate node length with the source ratio.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Ratio",
              "answer": {
                "value": 0.001,
                "unit": "",
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
              "label": "Internode",
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
          "title": "Evaluate",
          "answer": {
            "value": 1.2e-06,
            "unit": "m",
            "tolerance": 3.6e-09,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 0.001,
                "b": 0.0012
              },
              "displayScale": 1
            }
          },
          "tex": "l\\approx10^{-3}L",
          "modelAnswer": [
            "The exposed gap is much shorter than its neighboring internode.",
            "$l\\approx10^{-3}(1.2\\times10^{-3})\\,\\mathrm m$",
            "$1.2\\times10^{-6}\\,\\mathrm{m}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $l\\approx10^{-3}L$."
        },
        {
          "body": "Start with $l\\approx10^{-3}(1.2\\times10^{-3})\\,\\mathrm m$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "The exposed gap is much shorter than its neighboring internode."
      ],
      "points": 1,
      "source": "L08 8:2 p8"
    },
    {
      "id": "L08-saltation-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "saltation",
      "prompt": "What is localized mainly to nodes?",
      "options": [
        {
          "text": "All longitudinal current and membrane voltage",
          "feedback": "Use this distinction: Regenerative inward sodium membrane current."
        },
        {
          "text": "Regenerative inward sodium membrane current",
          "feedback": "Correct. Regenerative inward sodium membrane current."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "Regenerative inward sodium membrane current"
      ],
      "points": 1,
      "source": "L08 8:2 p9–10"
    },
    {
      "id": "L08-channels-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "channels",
      "prompt": "Where are many Kv1 channels concentrated?",
      "options": [
        {
          "text": "The exposed nodal gap without nearby myelin",
          "feedback": "Use this distinction: Juxtaparanodal membrane beneath the myelin."
        },
        {
          "text": "Juxtaparanodal membrane beneath the myelin",
          "feedback": "Correct. Juxtaparanodal membrane beneath the myelin."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "Juxtaparanodal membrane beneath the myelin"
      ],
      "points": 1,
      "source": "L08 8:2 p11"
    },
    {
      "id": "L08-anesthetic-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "anesthetic",
      "prompt": "What does propagation past a blocked node support?",
      "options": [
        {
          "text": "Passive spread can excite a farther available node",
          "feedback": "Correct. Passive spread can excite a farther available node."
        },
        {
          "text": "Every node is strictly required to regenerate each spike",
          "feedback": "Use this distinction: Passive spread can excite a farther available node."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "Passive spread can excite a farther available node"
      ],
      "points": 1,
      "source": "L08 8:2 p12"
    },
    {
      "id": "L08-twitch-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "twitch",
      "prompt": "What readout defined excitation threshold here?",
      "options": [
        {
          "text": "The maximum stimulus producing a fixed inward current",
          "feedback": "Use this distinction: The minimum stimulus producing a detectable twitch."
        },
        {
          "text": "The minimum stimulus producing a detectable twitch",
          "feedback": "Correct. The minimum stimulus producing a detectable twitch."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "The minimum stimulus producing a detectable twitch"
      ],
      "points": 1,
      "source": "L08 8:2 p13"
    },
    {
      "id": "L08-extracellular-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "extracellular",
      "prompt": "What is measured by the surrounding electrode?",
      "options": [
        {
          "text": "Extracellular potential relative to its reference",
          "feedback": "Correct. Extracellular potential relative to its reference."
        },
        {
          "text": "Transmembrane potential independent of its reference",
          "feedback": "Use this distinction: Extracellular potential relative to its reference."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "Extracellular potential relative to its reference"
      ],
      "points": 1,
      "source": "L08 8:2 p14"
    },
    {
      "id": "L08-continuity-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "continuity",
      "prompt": "Which signal is more spatially discontinuous?",
      "options": [
        {
          "text": "Regenerative inward transmembrane current",
          "feedback": "Correct. Regenerative inward transmembrane current."
        },
        {
          "text": "Depolarization propagating through the internodes",
          "feedback": "Use this distinction: Regenerative inward transmembrane current."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "Regenerative inward transmembrane current"
      ],
      "points": 1,
      "source": "L08 8:2 p15"
    },
    {
      "id": "L08-double-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "double",
      "prompt": "What extra route does the double cable include?",
      "options": [
        {
          "text": "Conductive periaxonal space under the myelin",
          "feedback": "Correct. Conductive periaxonal space under the myelin."
        },
        {
          "text": "Only the intracellular axoplasm inside the axon",
          "feedback": "Use this distinction: Conductive periaxonal space under the myelin."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "Conductive periaxonal space under the myelin"
      ],
      "points": 1,
      "source": "L08 8:2 p16"
    },
    {
      "id": "L08-jump-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "jump",
      "prompt": "What is a sound description of saltatory conduction?",
      "options": [
        {
          "text": "Disappearance of voltage throughout every internode",
          "feedback": "Use this distinction: Continuous passive spread with nodal regeneration."
        },
        {
          "text": "Continuous passive spread with nodal regeneration",
          "feedback": "Correct. Continuous passive spread with nodal regeneration."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "Continuous passive spread with nodal regeneration"
      ],
      "points": 1,
      "source": "L08 8:2 p17–18"
    },
    {
      "id": "L08-ex-iv-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "ex-iv",
      "prompt": "Which gates belong in a steady current table?",
      "options": [
        {
          "text": "Steady activation and availability at each voltage",
          "feedback": "Correct. Steady activation and availability at each voltage."
        },
        {
          "text": "Initial activation and availability at every voltage",
          "feedback": "Use this distinction: Steady activation and availability at each voltage."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "Steady activation and availability at each voltage"
      ],
      "points": 1,
      "source": "L08 Exercise8 p1–2 #1"
    },
    {
      "id": "L08-ex-k-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "ex-k",
      "prompt": "What is the potassium open-channel fraction?",
      "options": [
        {
          "text": "The fourth power of the particle probability",
          "feedback": "Correct. The fourth power of the particle probability."
        },
        {
          "text": "The first power of the particle probability",
          "feedback": "Use this distinction: The fourth power of the particle probability."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "The fourth power of the particle probability"
      ],
      "points": 1,
      "source": "L08 Exercise8 p2 #2"
    },
    {
      "id": "L08-ex-charge-recall",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "ex-charge",
      "prompt": "What does integrating gating-current density yield?",
      "options": [
        {
          "text": "Ionic conductance per unit membrane area",
          "feedback": "Use this distinction: Displaced charge per unit membrane area."
        },
        {
          "text": "Displaced charge per unit membrane area",
          "feedback": "Correct. Displaced charge per unit membrane area."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Identify the quantity or condition named in the prompt."
        },
        {
          "body": "Separate membrane voltage, ionic current, gating state and recording readout."
        }
      ],
      "modelAnswer": [
        "Displaced charge per unit membrane area"
      ],
      "points": 1,
      "source": "L08 Exercise8 p3 #3"
    },
    {
      "id": "L08-circuit-explain",
      "sectionId": "circuit",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain parallel hh circuit and signed current balance. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "$I_i=g_i(V_m-E_i)$."
        },
        {
          "text": "$I_m=C_m\\dot V_m+I_K+I_{Na}+I_L$."
        },
        {
          "text": "Leak remains unless explicitly neglected."
        }
      ],
      "modelAnswer": [
        "$I_i=g_i(V_m-E_i)$.",
        "$I_m=C_m\\dot V_m+I_K+I_{Na}+I_L$.",
        "Leak remains unless explicitly neglected."
      ],
      "points": 1,
      "source": "L08 8:1 p2",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:1, PDF page 2. Source circuit panel with original labels and axes.",
        "fallbackAlt": "8:1, PDF page 2. Source circuit panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/circuit.webp', import.meta.url).href,
          "alt": "8:1, PDF page 2. Source circuit panel with original labels and axes.",
          "aspect": 1.0910652920962198,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-agreement-explain",
      "sectionId": "agreement",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain from gate probabilities to the action potential. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "Independent all-required particle probabilities multiply."
        },
        {
          "text": "Sodium activation is fast while availability declines."
        },
        {
          "text": "Agreement tests quantitative predictions, not unique molecular structure."
        }
      ],
      "modelAnswer": [
        "Independent all-required particle probabilities multiply.",
        "Sodium activation is fast while availability declines.",
        "Agreement tests quantitative predictions, not unique molecular structure."
      ],
      "points": 1,
      "source": "L08 8:1 p3",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:1, PDF page 3. Source agreement panel with original labels and axes.",
        "fallbackAlt": "8:1, PDF page 3. Source agreement panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/agreement.webp', import.meta.url).href,
          "alt": "8:1, PDF page 3. Source agreement panel with original labels and axes.",
          "aspect": 3.3214285714285716,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-direct-gk",
      "sectionId": "agreement",
      "difficulty": "medium",
      "type": "multiStepCalc",
      "prompt": "For $\\bar g_K=80\\,\\mathrm{nS}$ and $n=0.5$, find conductance.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Maximum",
              "answer": {
                "value": 8e-08,
                "unit": "S",
                "tolerance": 8e-14,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 8e-08,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Particle probability",
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
          "title": "Open fraction",
          "answer": {
            "value": 0.0625,
            "unit": "",
            "tolerance": 0.0001875,
            "verification": {
              "relation": "gatePower",
              "inputs": {
                "y": 0.5,
                "count": 4
              },
              "displayScale": 1
            }
          },
          "tex": "Y=n^4",
          "modelAnswer": [
            "Compute the particle product first.",
            "$Y=n^4$",
            "$0.0625$"
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 5e-09,
            "unit": "S",
            "tolerance": 1.5e-11,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 8e-08,
                "b": 0.0625
              },
              "displayScale": 1
            }
          },
          "tex": "g_K=\\bar g_Kn^4",
          "modelAnswer": [
            "Four independent all-required activation factors multiply.",
            "$g_K=80\\times10^{-9}(0.5)^4\\,\\mathrm S$",
            "$5\\times10^{-9}\\,\\mathrm{S}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $g_K=\\bar g_Kn^4$."
        },
        {
          "body": "Start with $g_K=80\\times10^{-9}(0.5)^4\\,\\mathrm S$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Four independent all-required activation factors multiply."
      ],
      "points": 1,
      "source": "L08 8:1 p3"
    },
    {
      "id": "L08-direct-gna",
      "sectionId": "agreement",
      "difficulty": "medium",
      "type": "multiStepCalc",
      "prompt": "For $\\bar g_{Na}=100\\,\\mathrm{nS}$, $m=0.8$, $h=0.2$, find conductance.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Maximum",
              "answer": {
                "value": 1e-07,
                "unit": "S",
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
              "label": "Activation",
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
            },
            {
              "label": "Availability",
              "answer": {
                "value": 0.2,
                "unit": "",
                "tolerance": 2e-07,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.2,
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
          "title": "Cubic activation",
          "answer": {
            "value": 0.5120000000000001,
            "unit": "",
            "tolerance": 0.0015360000000000005,
            "verification": {
              "relation": "gatePower",
              "inputs": {
                "y": 0.8,
                "count": 3
              },
              "displayScale": 1
            }
          },
          "tex": "A=m^3",
          "modelAnswer": [
            "Three activation factors.",
            "$A=m^3$",
            "$0.512$"
          ]
        },
        {
          "title": "Open fraction",
          "answer": {
            "value": 0.10240000000000003,
            "unit": "",
            "tolerance": 0.0003072000000000001,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 0.5120000000000001,
                "b": 0.2
              },
              "displayScale": 1
            }
          },
          "tex": "Y=Ah",
          "modelAnswer": [
            "Multiply by availability.",
            "$Y=Ah$",
            "$0.1024$"
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 1.0240000000000003e-08,
            "unit": "S",
            "tolerance": 3.072000000000001e-11,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 1e-07,
                "b": 0.10240000000000003
              },
              "displayScale": 1
            }
          },
          "tex": "g_{Na}=\\bar g_{Na}m^3h",
          "modelAnswer": [
            "Availability weights the three activation factors.",
            "$g_{Na}=100\\times10^{-9}(0.8)^3(0.2)\\,\\mathrm S$",
            "$1.024\\times10^{-8}\\,\\mathrm{S}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $g_{Na}=\\bar g_{Na}m^3h$."
        },
        {
          "body": "Start with $g_{Na}=100\\times10^{-9}(0.8)^3(0.2)\\,\\mathrm S$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Availability weights the three activation factors."
      ],
      "points": 1,
      "source": "L08 8:1 p3"
    },
    {
      "id": "L08-space-explain",
      "sectionId": "space",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain space clamp, cable coupling and travelling waves. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "Space clamp sets $\\partial V_m/\\partial x=0$."
        },
        {
          "text": "Without space clamp axial current supplies $a\\partial_x^2V_m/(2\\rho_i)$."
        },
        {
          "text": "For $V(x,t)=f(t-x/v)$, $\\partial_x^2V=v^{-2}\\partial_t^2V$."
        },
        {
          "text": "The source radius-speed relation is a square-root scaling, conditional on unchanged membrane properties."
        }
      ],
      "modelAnswer": [
        "Space clamp sets $\\partial V_m/\\partial x=0$.",
        "Without space clamp axial current supplies $a\\partial_x^2V_m/(2\\rho_i)$.",
        "For $V(x,t)=f(t-x/v)$, $\\partial_x^2V=v^{-2}\\partial_t^2V$.",
        "The source radius-speed relation is a square-root scaling, conditional on unchanged membrane properties."
      ],
      "points": 1,
      "source": "L08 8:1 p4",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:1, PDF page 4. Source space panel with original labels and axes.",
        "fallbackAlt": "8:1, PDF page 4. Source space panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/space.webp', import.meta.url).href,
          "alt": "8:1, PDF page 4. Source space panel with original labels and axes.",
          "aspect": 2.9660056657223794,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-nonpropagating-explain",
      "sectionId": "nonpropagating",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain nonpropagating ap: capacitive balance. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "$I_C+I_{ion}=0$ after injection ends."
        },
        {
          "text": "$\\dot V=-I_{ion}/C$."
        },
        {
          "text": "Net inward ionic current is negative and gives a positive voltage slope."
        }
      ],
      "modelAnswer": [
        "$I_C+I_{ion}=0$ after injection ends.",
        "$\\dot V=-I_{ion}/C$.",
        "Net inward ionic current is negative and gives a positive voltage slope."
      ],
      "points": 1,
      "source": "L08 8:1 p5",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:1, PDF page 5. Source nonpropagating panel with original labels and axes.",
        "fallbackAlt": "8:1, PDF page 5. Source nonpropagating panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/nonpropagating.webp', import.meta.url).href,
          "alt": "8:1, PDF page 5. Source nonpropagating panel with original labels and axes.",
          "aspect": 0.7514792899408284,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-regeneration-explain",
      "sectionId": "regeneration",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain continuous propagation and the refractory wake. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "Current spreads passively to nearby membrane."
        },
        {
          "text": "Threshold activates regenerative sodium entry ahead."
        },
        {
          "text": "Inactivation and elevated potassium conductance oppose immediate re-excitation behind."
        },
        {
          "text": "Artificial middle stimulation can launch waves in both directions into rested membrane."
        }
      ],
      "modelAnswer": [
        "Current spreads passively to nearby membrane.",
        "Threshold activates regenerative sodium entry ahead.",
        "Inactivation and elevated potassium conductance oppose immediate re-excitation behind.",
        "Artificial middle stimulation can launch waves in both directions into rested membrane."
      ],
      "points": 1,
      "source": "L08 8:1 p6",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:1, PDF page 6. Source propagation panel with original labels and axes.",
        "fallbackAlt": "8:1, PDF page 6. Source propagation panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/propagation.webp', import.meta.url).href,
          "alt": "8:1, PDF page 6. Source propagation panel with original labels and axes.",
          "aspect": 1.1540616246498598,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-propagating-explain",
      "sectionId": "propagating",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain axial diversion changes the current balance. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "Local capacitance is only one destination of inward current."
        },
        {
          "text": "Axial divergence makes ionic and capacitive currents unequal."
        },
        {
          "text": "The source profiles propagate right to left; a generic axon need not have that laboratory orientation."
        }
      ],
      "modelAnswer": [
        "Local capacitance is only one destination of inward current.",
        "Axial divergence makes ionic and capacitive currents unequal.",
        "The source profiles propagate right to left; a generic axon need not have that laboratory orientation."
      ],
      "points": 1,
      "source": "L08 8:1 p7",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:1, PDF page 7. Source propagating panel with original labels and axes.",
        "fallbackAlt": "8:1, PDF page 7. Source propagating panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/propagating.webp', import.meta.url).href,
          "alt": "8:1, PDF page 7. Source propagating panel with original labels and axes.",
          "aspect": 1.0059880239520957,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-noble-explain",
      "sectionId": "noble",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain noble approximation and stable resting voltage. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "$m\\approx m_\\infty(V)$ while $n,h$ are momentarily fixed."
        },
        {
          "text": "For zero applied current a positive current slope restores a small voltage displacement."
        },
        {
          "text": "The instantaneous potassium pore is approximately linear in this source model, not universally in every cell."
        }
      ],
      "modelAnswer": [
        "$m\\approx m_\\infty(V)$ while $n,h$ are momentarily fixed.",
        "For zero applied current a positive current slope restores a small voltage displacement.",
        "The instantaneous potassium pore is approximately linear in this source model, not universally in every cell."
      ],
      "points": 1,
      "source": "L08 8:1 p8",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:1, PDF page 8. Source noble panel with original labels and axes.",
        "fallbackAlt": "8:1, PDF page 8. Source noble panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/noble.webp', import.meta.url).href,
          "alt": "8:1, PDF page 8. Source noble panel with original labels and axes.",
          "aspect": 1.78168130489335,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-moving-iv-explain",
      "sectionId": "moving-iv",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain threshold instability and a transient peak. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "$C\\dot{\\delta V}=-G_{slope}\\delta V$."
        },
        {
          "text": "Negative slope drives voltage away from the crossing."
        },
        {
          "text": "During depolarization n rises and h falls, rather than h activating upward."
        },
        {
          "text": "A stable fast-subsystem peak need not persist under slow gating."
        }
      ],
      "modelAnswer": [
        "$C\\dot{\\delta V}=-G_{slope}\\delta V$.",
        "Negative slope drives voltage away from the crossing.",
        "During depolarization n rises and h falls, rather than h activating upward.",
        "A stable fast-subsystem peak need not persist under slow gating."
      ],
      "points": 1,
      "source": "L08 8:1 p9",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:1, PDF page 9. Source moving iv panel with original labels and axes.",
        "fallbackAlt": "8:1, PDF page 9. Source moving iv panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/moving-iv.webp', import.meta.url).href,
          "alt": "8:1, PDF page 9. Source moving iv panel with original labels and axes.",
          "aspect": 1.7771812080536913,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-threshold-explain",
      "sectionId": "threshold",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain threshold and deterministic versus biological variability. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "Threshold separates return toward rest from regenerative depolarization."
        },
        {
          "text": "Experiments show steep but probabilistic initiation near threshold."
        },
        {
          "text": "Deterministic HH does not itself reproduce biological trial variability."
        }
      ],
      "modelAnswer": [
        "Threshold separates return toward rest from regenerative depolarization.",
        "Experiments show steep but probabilistic initiation near threshold.",
        "Deterministic HH does not itself reproduce biological trial variability."
      ],
      "points": 1,
      "source": "L08 8:1 p10",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:1, PDF page 10. Source threshold panel with original labels and axes.",
        "fallbackAlt": "8:1, PDF page 10. Source threshold panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/threshold.webp', import.meta.url).href,
          "alt": "8:1, PDF page 10. Source threshold panel with original labels and axes.",
          "aspect": 0.9536842105263158,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-feedback-explain",
      "sectionId": "feedback",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain fast positive and slow negative feedback. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "Fast activation reinforces depolarization."
        },
        {
          "text": "Sodium inactivation reduces available inward current."
        },
        {
          "text": "Potassium activation increases outward current when voltage exceeds potassium reversal."
        }
      ],
      "modelAnswer": [
        "Fast activation reinforces depolarization.",
        "Sodium inactivation reduces available inward current.",
        "Potassium activation increases outward current when voltage exceeds potassium reversal."
      ],
      "points": 1,
      "source": "L08 8:1 p11",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:1, PDF page 11. Source feedback panel with original labels and axes.",
        "fallbackAlt": "8:1, PDF page 11. Source feedback panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/feedback.webp', import.meta.url).href,
          "alt": "8:1, PDF page 11. Source feedback panel with original labels and axes.",
          "aspect": 2.5098039215686274,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-phases-explain",
      "sectionId": "phases",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain read the ap phases through conductance and driving force. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "At rest activation is low, not literally zero in every HH steady state."
        },
        {
          "text": "Fast sodium activation drives upstroke."
        },
        {
          "text": "Decreasing inward driving force, inactivation and outward potassium terminate it."
        },
        {
          "text": "Residual potassium conductance supports afterhyperpolarization."
        }
      ],
      "modelAnswer": [
        "At rest activation is low, not literally zero in every HH steady state.",
        "Fast sodium activation drives upstroke.",
        "Decreasing inward driving force, inactivation and outward potassium terminate it.",
        "Residual potassium conductance supports afterhyperpolarization."
      ],
      "points": 1,
      "source": "L08 8:1 p12",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:1, PDF page 12. Source phases panel with original labels and axes.",
        "fallbackAlt": "8:1, PDF page 12. Source phases panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/phases.webp', import.meta.url).href,
          "alt": "8:1, PDF page 12. Source phases panel with original labels and axes.",
          "aspect": 0.9877049180327869,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-accommodation-explain",
      "sectionId": "accommodation",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain slow ramps and accommodation. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "Potassium activation increases outward opposition."
        },
        {
          "text": "Sodium availability falls with inactivation."
        },
        {
          "text": "A rapid stimulus can excite before these slow changes develop."
        },
        {
          "text": "Failure does not imply absence of depolarization."
        }
      ],
      "modelAnswer": [
        "Potassium activation increases outward opposition.",
        "Sodium availability falls with inactivation.",
        "A rapid stimulus can excite before these slow changes develop.",
        "Failure does not imply absence of depolarization."
      ],
      "points": 1,
      "source": "L08 8:1 p13",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:1, PDF page 13. Source accommodation panel with original labels and axes.",
        "fallbackAlt": "8:1, PDF page 13. Source accommodation panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/accommodation.webp', import.meta.url).href,
          "alt": "8:1, PDF page 13. Source accommodation panel with original labels and axes.",
          "aspect": 2.088888888888889,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-refractory-explain",
      "sectionId": "refractory",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain paired pulses: absolute and relative refractoriness. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "Absolute refractoriness reflects extensive sodium inactivation."
        },
        {
          "text": "Relative refractoriness includes partial recovery and elevated potassium conductance."
        },
        {
          "text": "Keep first stimulus and recording conditions matched while varying interval and second-pulse strength."
        }
      ],
      "modelAnswer": [
        "Absolute refractoriness reflects extensive sodium inactivation.",
        "Relative refractoriness includes partial recovery and elevated potassium conductance.",
        "Keep first stimulus and recording conditions matched while varying interval and second-pulse strength."
      ],
      "points": 1,
      "source": "L08 8:1 p14",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:1, PDF page 14. Source refractory panel with original labels and axes.",
        "fallbackAlt": "8:1, PDF page 14. Source refractory panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/refractory.webp', import.meta.url).href,
          "alt": "8:1, PDF page 14. Source refractory panel with original labels and axes.",
          "aspect": 0.7012847965738758,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-sensor-explain",
      "sectionId": "sensor",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain gating charge differs from ionic permeation. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "Voltage changes sensor-state energetics."
        },
        {
          "text": "Sensor movement changes conformation and opening probability."
        },
        {
          "text": "Gating currents can remain after ionic current is blocked."
        }
      ],
      "modelAnswer": [
        "Voltage changes sensor-state energetics.",
        "Sensor movement changes conformation and opening probability.",
        "Gating currents can remain after ionic current is blocked."
      ],
      "points": 1,
      "source": "L08 8:1 p15",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:1, PDF page 15. Source sensor panel with original labels and axes.",
        "fallbackAlt": "8:1, PDF page 15. Source sensor panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/sensor.webp', import.meta.url).href,
          "alt": "8:1, PDF page 15. Source sensor panel with original labels and axes.",
          "aspect": 1.965635738831615,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-boltzmann-explain",
      "sectionId": "boltzmann",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain two-state energies and normalized probability. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "$y_{out}/y_{in}=r$ and $y_{out}+y_{in}=1$."
        },
        {
          "text": "Thus $y_{out}=r/(1+r)$."
        },
        {
          "text": "Positive effective charge favors activation as inside voltage becomes more positive in this convention."
        },
        {
          "text": "The source defines w as minus the zero-voltage state-energy difference."
        }
      ],
      "modelAnswer": [
        "$y_{out}/y_{in}=r$ and $y_{out}+y_{in}=1$.",
        "Thus $y_{out}=r/(1+r)$.",
        "Positive effective charge favors activation as inside voltage becomes more positive in this convention.",
        "The source defines w as minus the zero-voltage state-energy difference."
      ],
      "points": 1,
      "source": "L08 8:1 p16–17",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:1, PDF page 16. Source energy panel with original labels and axes.",
        "fallbackAlt": "8:1, PDF page 16. Source energy panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/energy.webp', import.meta.url).href,
          "alt": "8:1, PDF page 16. Source energy panel with original labels and axes.",
          "aspect": 1.0874074074074074,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-charge-slope-explain",
      "sectionId": "charge-slope",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain low-activation slope estimates effective gating charge. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "The exponential requires small activation and a fixed prefactor."
        },
        {
          "text": "Use the slope of log conductance, not ionic-current slope."
        },
        {
          "text": "Saturation invalidates unrestricted exponential extrapolation."
        }
      ],
      "modelAnswer": [
        "The exponential requires small activation and a fixed prefactor.",
        "Use the slope of log conductance, not ionic-current slope.",
        "Saturation invalidates unrestricted exponential extrapolation."
      ],
      "points": 1,
      "source": "L08 8:1 p17",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:1, PDF page 17. Source slope panel with original labels and axes.",
        "fallbackAlt": "8:1, PDF page 17. Source slope panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/slope.webp', import.meta.url).href,
          "alt": "8:1, PDF page 17. Source slope panel with original labels and axes.",
          "aspect": 1.823030303030303,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-isolation-explain",
      "sectionId": "isolation",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain isolate on and off gating current. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "Source protocol uses sodium-free solution/TTX and internal cesium."
        },
        {
          "text": "Equal signed control steps cancel linear capacitance only under matched conditions."
        },
        {
          "text": "A nonlinear transient is not automatically a clean sensor signal; verify block, leak and subtraction."
        }
      ],
      "modelAnswer": [
        "Source protocol uses sodium-free solution/TTX and internal cesium.",
        "Equal signed control steps cancel linear capacitance only under matched conditions.",
        "A nonlinear transient is not automatically a clean sensor signal; verify block, leak and subtraction."
      ],
      "points": 1,
      "source": "L08 8:1 p18",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:1, PDF page 18. Source gating panel with original labels and axes.",
        "fallbackAlt": "8:1, PDF page 18. Source gating panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/gating.webp', import.meta.url).href,
          "alt": "8:1, PDF page 18. Source gating panel with original labels and axes.",
          "aspect": 2.0232558139534884,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-capacitance-explain",
      "sectionId": "capacitance",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain measure capacitance from leak-corrected charge. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "Integrate the capacitive component over time."
        },
        {
          "text": "Divide signed charge by the matched signed voltage step."
        },
        {
          "text": "Unresolved gating charge or series-resistance artifacts can bias the estimate."
        },
        {
          "text": "Area estimation assumes constant specific capacitance."
        }
      ],
      "modelAnswer": [
        "Integrate the capacitive component over time.",
        "Divide signed charge by the matched signed voltage step.",
        "Unresolved gating charge or series-resistance artifacts can bias the estimate.",
        "Area estimation assumes constant specific capacitance."
      ],
      "points": 1,
      "source": "L08 8:1 p19",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:1, PDF page 19. Source capacitance panel with original labels and axes.",
        "fallbackAlt": "8:1, PDF page 19. Source capacitance panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/capacitance.webp', import.meta.url).href,
          "alt": "8:1, PDF page 19. Source capacitance panel with original labels and axes.",
          "aspect": 1.642570281124498,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-charge-area",
      "sectionId": "capacitance",
      "difficulty": "medium",
      "type": "multiStepCalc",
      "prompt": "A new ideal leak-corrected transient is $I_C(t)=2\\,\\mathrm{nA}\\,e^{-t/(0.5\\,\\mathrm{ms})}$. Integrate to $1\\,\\mathrm{ms}$ after a $10\\,\\mathrm{mV}$ step. Find captured charge, fraction of total, inferred capacitance from that window, and the complete-transient capacitance. State the finite-window bias.",
      "stages": [
        {
          "title": "Select integration",
          "choices": [
            {
              "label": "$Q(t)=I_0\\tau(1-e^{-t/\\tau})$"
            },
            {
              "label": "$Q(t)=I_0t$ for every decay"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Integrate the decaying current."
          ]
        },
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Initial current",
              "answer": {
                "value": 2e-09,
                "unit": "A",
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
              "label": "Time constant",
              "answer": {
                "value": 0.0005,
                "unit": "s",
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
            },
            {
              "label": "Window",
              "answer": {
                "value": 0.001,
                "unit": "s",
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
              "label": "Step",
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
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Captured charge",
          "answer": {
            "value": 8.646647167633873e-13,
            "unit": "C",
            "tolerance": 2.5939941502901618e-15,
            "verification": {
              "relation": "expCharge",
              "inputs": {
                "current": 2e-09,
                "tau": 0.0005,
                "time": 0.001
              },
              "displayScale": 1
            }
          },
          "tex": "Q=I_0\\tau(1-e^{-2})",
          "modelAnswer": [
            "Finite window misses a tail.",
            "$Q=I_0\\tau(1-e^{-2})$",
            "$8.6466472\\times10^{-13}\\,\\mathrm{C}$"
          ]
        },
        {
          "title": "Captured fraction",
          "answer": {
            "value": 0.8646647167633873,
            "unit": "",
            "tolerance": 0.002593994150290162,
            "verification": {
              "relation": "expCharge",
              "inputs": {
                "current": 1,
                "tau": 1,
                "time": 2
              },
              "displayScale": 1
            }
          },
          "tex": "f=1-e^{-2}",
          "modelAnswer": [
            "This is less than one.",
            "$f=1-e^{-2}$",
            "$0.86466472$"
          ]
        },
        {
          "title": "Window-based capacitance",
          "answer": {
            "value": 8.646647167633873e-11,
            "unit": "F",
            "tolerance": 2.593994150290162e-13,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 8.646647167633873e-13,
                "b": 0.01
              },
              "displayScale": 1
            }
          },
          "tex": "C_{window}=Q/\\Delta V",
          "modelAnswer": [
            "The missed charge biases low.",
            "$C_{window}=Q/\\Delta V$",
            "$8.6466472\\times10^{-11}\\,\\mathrm{F}$"
          ]
        },
        {
          "title": "Complete charge",
          "answer": {
            "value": 1e-12,
            "unit": "C",
            "tolerance": 3e-15,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 2e-09,
                "b": 0.0005
              },
              "displayScale": 1
            }
          },
          "tex": "Q_\\infty=I_0\\tau",
          "modelAnswer": [
            "Use the analytic infinite-window limit.",
            "$Q_\\infty=I_0\\tau$",
            "$1\\times10^{-12}\\,\\mathrm{C}$"
          ]
        },
        {
          "title": "Complete capacitance",
          "answer": {
            "value": 1e-10,
            "unit": "F",
            "tolerance": 3.0000000000000003e-13,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 1e-12,
                "b": 0.01
              },
              "displayScale": 1
            }
          },
          "tex": "C_\\infty=Q_\\infty/\\Delta V",
          "modelAnswer": [
            "The complete estimate is larger.",
            "$C_\\infty=Q_\\infty/\\Delta V$",
            "$1\\times10^{-10}\\,\\mathrm{F}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Choose relations for the controlled geometry, gating state and signed current."
        },
        {
          "body": "First convert the stated quantities into the requested units. Evaluate intermediate factors separately before combining them."
        }
      ],
      "modelAnswer": [
        "Integrate the decaying current.",
        "Convert each stated quantity to the requested unit before evaluating.",
        "Finite window misses a tail.",
        "This is less than one.",
        "The missed charge biases low.",
        "Use the analytic infinite-window limit.",
        "The complete estimate is larger."
      ],
      "points": 1,
      "source": "L08 8:1 p19; L01 exponential capacitor charging"
    },
    {
      "id": "L08-density-explain",
      "sectionId": "density",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain gating charge, channel density and single-channel conductance. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "Charge density and conductance density must share an area convention."
        },
        {
          "text": "Effective charge per channel must be known."
        },
        {
          "text": "Incomplete charge movement or nonmaximal activation biases the inferred density or conductance."
        }
      ],
      "modelAnswer": [
        "Charge density and conductance density must share an area convention.",
        "Effective charge per channel must be known.",
        "Incomplete charge movement or nonmaximal activation biases the inferred density or conductance."
      ],
      "points": 1,
      "source": "L08 8:1 p20",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:1, PDF page 20. Source charge panel with original labels and axes.",
        "fallbackAlt": "8:1, PDF page 20. Source charge panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/charge.webp', import.meta.url).href,
          "alt": "8:1, PDF page 20. Source charge panel with original labels and axes.",
          "aspect": 1.852803738317757,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-synthesis-explain",
      "sectionId": "synthesis",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain hh synthesis and limits. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "Conductance products determine ionic currents."
        },
        {
          "text": "Current balance determines voltage evolution unless voltage is imposed."
        },
        {
          "text": "Gating equations determine the evolving conductances."
        },
        {
          "text": "Space coupling is additionally needed for propagation."
        }
      ],
      "modelAnswer": [
        "Conductance products determine ionic currents.",
        "Current balance determines voltage evolution unless voltage is imposed.",
        "Gating equations determine the evolving conductances.",
        "Space coupling is additionally needed for propagation."
      ],
      "points": 1,
      "source": "L08 8:1 p21–22",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:1, PDF page 2. Source circuit panel with original labels and axes.",
        "fallbackAlt": "8:1, PDF page 2. Source circuit panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/circuit.webp', import.meta.url).href,
          "alt": "8:1, PDF page 2. Source circuit panel with original labels and axes.",
          "aspect": 1.0910652920962198,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-ais-explain",
      "sectionId": "ais",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain initiation at ais and directions of propagation. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "AIS has high sodium-channel density."
        },
        {
          "text": "Forward propagation serves transmitter release."
        },
        {
          "text": "Backpropagation can modulate intracellular signaling and plasticity."
        }
      ],
      "modelAnswer": [
        "AIS has high sodium-channel density.",
        "Forward propagation serves transmitter release.",
        "Backpropagation can modulate intracellular signaling and plasticity."
      ],
      "points": 1,
      "source": "L08 8:2 p1–2",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:2, PDF page 2. Source ais panel with original labels and axes.",
        "fallbackAlt": "8:2, PDF page 2. Source ais panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/ais.webp', import.meta.url).href,
          "alt": "8:2, PDF page 2. Source ais panel with original labels and axes.",
          "aspect": 0.7215639810426541,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-diameter-explain",
      "sectionId": "diameter",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain unmyelinated conduction and diameter trade-off. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "Axial resistance falls as diameter increases."
        },
        {
          "text": "Cable length constant increases with square-root diameter at fixed specific properties."
        },
        {
          "text": "A large speed increase by diameter alone is costly in cross-sectional area."
        }
      ],
      "modelAnswer": [
        "Axial resistance falls as diameter increases.",
        "Cable length constant increases with square-root diameter at fixed specific properties.",
        "A large speed increase by diameter alone is costly in cross-sectional area."
      ],
      "points": 1,
      "source": "L08 8:2 p3",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:2, PDF page 3. Source diameter panel with original labels and axes.",
        "fallbackAlt": "8:2, PDF page 3. Source diameter panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/diameter.webp', import.meta.url).href,
          "alt": "8:2, PDF page 3. Source diameter panel with original labels and axes.",
          "aspect": 0.6362139917695473,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-speed-explain",
      "sectionId": "speed",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain compare myelinated and unmyelinated scaling. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "Myelinated and unmyelinated diameter laws differ."
        },
        {
          "text": "State comparable conditions when taking ratios."
        },
        {
          "text": "Do not apply the empirical myelinated coefficient to an unmyelinated axon."
        }
      ],
      "modelAnswer": [
        "Myelinated and unmyelinated diameter laws differ.",
        "State comparable conditions when taking ratios.",
        "Do not apply the empirical myelinated coefficient to an unmyelinated axon."
      ],
      "points": 1,
      "source": "L08 8:2 p4",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:2, PDF page 4. Source speed panel with original labels and axes.",
        "fallbackAlt": "8:2, PDF page 4. Source speed panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/speed.webp', import.meta.url).href,
          "alt": "8:2, PDF page 4. Source speed panel with original labels and axes.",
          "aspect": 1.1381118881118881,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-glia-explain",
      "sectionId": "glia",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain myelin from schwann cells and oligodendrocytes. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "Compact layers limit transverse current."
        },
        {
          "text": "Schwann cells and oligodendrocytes differ in internode coverage."
        },
        {
          "text": "A myelin sheath covers internodes rather than the short nodal gap."
        }
      ],
      "modelAnswer": [
        "Compact layers limit transverse current.",
        "Schwann cells and oligodendrocytes differ in internode coverage.",
        "A myelin sheath covers internodes rather than the short nodal gap."
      ],
      "points": 1,
      "source": "L08 8:2 p5",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:2, PDF page 5. Source glia panel with original labels and axes.",
        "fallbackAlt": "8:2, PDF page 5. Source glia panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/glia.webp', import.meta.url).href,
          "alt": "8:2, PDF page 5. Source glia panel with original labels and axes.",
          "aspect": 1.1210762331838564,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-insulation-explain",
      "sectionId": "insulation",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain electrical insulation: length is not time. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "Added layers increase effective thickness and reduce capacitance."
        },
        {
          "text": "Reduced leakage permits farther passive spread."
        },
        {
          "text": "The source says usually smaller time constant; it is not a consequence of resistance alone."
        },
        {
          "text": "Use the measured product rather than asserting a universal time change."
        }
      ],
      "modelAnswer": [
        "Added layers increase effective thickness and reduce capacitance.",
        "Reduced leakage permits farther passive spread.",
        "The source says usually smaller time constant; it is not a consequence of resistance alone.",
        "Use the measured product rather than asserting a universal time change."
      ],
      "points": 1,
      "source": "L08 8:2 p6",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:2, PDF page 6. Source myelin panel with original labels and axes.",
        "fallbackAlt": "8:2, PDF page 6. Source myelin panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/myelin.webp', import.meta.url).href,
          "alt": "8:2, PDF page 6. Source myelin panel with original labels and axes.",
          "aspect": 0.7374631268436578,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-node-explain",
      "sectionId": "node",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain nodes and internodes. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "Nodes concentrate regenerative sodium conductance."
        },
        {
          "text": "Internodes carry mostly passive spread."
        },
        {
          "text": "Paranodal and juxtaparanodal regions have distinct locations."
        }
      ],
      "modelAnswer": [
        "Nodes concentrate regenerative sodium conductance.",
        "Internodes carry mostly passive spread.",
        "Paranodal and juxtaparanodal regions have distinct locations."
      ],
      "points": 1,
      "source": "L08 8:2 p7",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:2, PDF page 7. Source node panel with original labels and axes.",
        "fallbackAlt": "8:2, PDF page 7. Source node panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/node.webp', import.meta.url).href,
          "alt": "8:2, PDF page 7. Source node panel with original labels and axes.",
          "aspect": 5.3125,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-dimensions-explain",
      "sectionId": "dimensions",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain geometry and empirical myelinated-fiber fits. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "Larger fibers generally have longer internodes and thicker wrapping."
        },
        {
          "text": "The node length is about a thousandth of internode length in the example."
        },
        {
          "text": "Treat fits as empirical estimates rather than exact universal geometry."
        }
      ],
      "modelAnswer": [
        "Larger fibers generally have longer internodes and thicker wrapping.",
        "The node length is about a thousandth of internode length in the example.",
        "Treat fits as empirical estimates rather than exact universal geometry."
      ],
      "points": 1,
      "source": "L08 8:2 p8",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:2, PDF page 8. Source dimensions panel with original labels and axes.",
        "fallbackAlt": "8:2, PDF page 8. Source dimensions panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/dimensions.webp', import.meta.url).href,
          "alt": "8:2, PDF page 8. Source dimensions panel with original labels and axes.",
          "aspect": 3.6315789473684212,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-saltation-explain",
      "sectionId": "saltation",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain continuous versus saltatory regeneration. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "Inward nodal current spreads axially through internodes."
        },
        {
          "text": "Downstream nodal activation renews the signal."
        },
        {
          "text": "The membrane potential does not disappear between nodes."
        }
      ],
      "modelAnswer": [
        "Inward nodal current spreads axially through internodes.",
        "Downstream nodal activation renews the signal.",
        "The membrane potential does not disappear between nodes."
      ],
      "points": 1,
      "source": "L08 8:2 p9–10",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:2, PDF page 10. Source saltatory panel with original labels and axes.",
        "fallbackAlt": "8:2, PDF page 10. Source saltatory panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/saltatory.webp', import.meta.url).href,
          "alt": "8:2, PDF page 10. Source saltatory panel with original labels and axes.",
          "aspect": 1.418848167539267,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-channels-explain",
      "sectionId": "channels",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain nodal and juxtaparanodal channels. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "Nodal sodium channels open rapidly and synchronously."
        },
        {
          "text": "Specific potassium subtypes have different localizations."
        },
        {
          "text": "Avoid inferring uniform potassium density from a simplified cartoon."
        }
      ],
      "modelAnswer": [
        "Nodal sodium channels open rapidly and synchronously.",
        "Specific potassium subtypes have different localizations.",
        "Avoid inferring uniform potassium density from a simplified cartoon."
      ],
      "points": 1,
      "source": "L08 8:2 p11",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:2, PDF page 11. Source channels panel with original labels and axes.",
        "fallbackAlt": "8:2, PDF page 11. Source channels panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/channels.webp', import.meta.url).href,
          "alt": "8:2, PDF page 11. Source channels panel with original labels and axes.",
          "aspect": 1.768916155419223,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-anesthetic-explain",
      "sectionId": "anesthetic",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain evidence from anesthetic blocks and nodal currents. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "Reduced excitability at neighboring nodes can be bridged over a limited distance."
        },
        {
          "text": "Recorded inward membrane current is strongest at nodes."
        },
        {
          "text": "The exact reported blocking count belongs to the experimental conditions."
        }
      ],
      "modelAnswer": [
        "Reduced excitability at neighboring nodes can be bridged over a limited distance.",
        "Recorded inward membrane current is strongest at nodes.",
        "The exact reported blocking count belongs to the experimental conditions."
      ],
      "points": 1,
      "source": "L08 8:2 p12",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:2, PDF page 12. Source anesthetic panel with original labels and axes.",
        "fallbackAlt": "8:2, PDF page 12. Source anesthetic panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/anesthetic.webp', import.meta.url).href,
          "alt": "8:2, PDF page 12. Source anesthetic panel with original labels and axes.",
          "aspect": 0.6064467766116941,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-twitch-explain",
      "sectionId": "twitch",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain local stimulation threshold and the twitch proxy. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "Control electrode placement and stimulus waveform."
        },
        {
          "text": "Compare threshold versus location relative to nodes."
        },
        {
          "text": "Nerve conduction and neuromuscular/muscle response contribute to the proxy."
        }
      ],
      "modelAnswer": [
        "Control electrode placement and stimulus waveform.",
        "Compare threshold versus location relative to nodes.",
        "Nerve conduction and neuromuscular/muscle response contribute to the proxy."
      ],
      "points": 1,
      "source": "L08 8:2 p13",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:2, PDF page 13. Source twitch panel with original labels and axes.",
        "fallbackAlt": "8:2, PDF page 13. Source twitch panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/twitch.webp', import.meta.url).href,
          "alt": "8:2, PDF page 13. Source twitch panel with original labels and axes.",
          "aspect": 1.0967007963594995,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-extracellular-explain",
      "sectionId": "extracellular",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain extracellular recordings localize nodal sources. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "Compare position at matched recording conditions."
        },
        {
          "text": "Large nodal source currents generate the spatial extracellular signal."
        },
        {
          "text": "Amplitude depends on geometry and reference as well as source activity."
        }
      ],
      "modelAnswer": [
        "Compare position at matched recording conditions.",
        "Large nodal source currents generate the spatial extracellular signal.",
        "Amplitude depends on geometry and reference as well as source activity."
      ],
      "points": 1,
      "source": "L08 8:2 p14",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:2, PDF page 14. Source extracellular panel with original labels and axes.",
        "fallbackAlt": "8:2, PDF page 14. Source extracellular panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/extracellular.webp', import.meta.url).href,
          "alt": "8:2, PDF page 14. Source extracellular panel with original labels and axes.",
          "aspect": 1.1474285714285715,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-continuity-explain",
      "sectionId": "continuity",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain membrane current is more saltatory than voltage. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "Nodal inward current is much larger than internodal inward current."
        },
        {
          "text": "Internodal voltage remains nonzero and propagates."
        },
        {
          "text": "The source classical model and newer recordings need not have identical waveforms."
        }
      ],
      "modelAnswer": [
        "Nodal inward current is much larger than internodal inward current.",
        "Internodal voltage remains nonzero and propagates.",
        "The source classical model and newer recordings need not have identical waveforms."
      ],
      "points": 1,
      "source": "L08 8:2 p15",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:2, PDF page 15. Source voltage current panel with original labels and axes.",
        "fallbackAlt": "8:2, PDF page 15. Source voltage current panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/voltage-current.webp', import.meta.url).href,
          "alt": "8:2, PDF page 15. Source voltage current panel with original labels and axes.",
          "aspect": 1.7869742198100407,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-double-explain",
      "sectionId": "double",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain double cable and the periaxonal pathway. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "A single cable omits the separate periaxonal route."
        },
        {
          "text": "Optical transaxonal voltage differs from an extracellular electrode signal."
        },
        {
          "text": "Study-specific waveform differences do not imply absent internodal voltage."
        }
      ],
      "modelAnswer": [
        "A single cable omits the separate periaxonal route.",
        "Optical transaxonal voltage differs from an extracellular electrode signal.",
        "Study-specific waveform differences do not imply absent internodal voltage."
      ],
      "points": 1,
      "source": "L08 8:2 p16",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:2, PDF page 16. Source double panel with original labels and axes.",
        "fallbackAlt": "8:2, PDF page 16. Source double panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/double.webp', import.meta.url).href,
          "alt": "8:2, PDF page 16. Source double panel with original labels and axes.",
          "aspect": 3.5723684210526314,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-jump-explain",
      "sectionId": "jump",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain critique the literal-jumping description. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "Use localized nodal regeneration and continuous internodal voltage."
        },
        {
          "text": "Limited excitation across several nodes provides reliability."
        },
        {
          "text": "Safety margin is conditional on insulation, excitability and spacing."
        }
      ],
      "modelAnswer": [
        "Use localized nodal regeneration and continuous internodal voltage.",
        "Limited excitation across several nodes provides reliability.",
        "Safety margin is conditional on insulation, excitability and spacing."
      ],
      "points": 1,
      "source": "L08 8:2 p17–18",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:2, PDF page 17. Source continuity panel with original labels and axes.",
        "fallbackAlt": "8:2, PDF page 17. Source continuity panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/continuity.webp', import.meta.url).href,
          "alt": "8:2, PDF page 17. Source continuity panel with original labels and axes.",
          "aspect": 0.6662468513853904,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-ex-iv-explain",
      "sectionId": "ex-iv",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain exercise 8: steady sodium i–v from tabulated gates. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "Compute the cubic activation product and multiply by availability."
        },
        {
          "text": "Compute signed driving force independently."
        },
        {
          "text": "A reversal shift changes current without changing stipulated gating."
        },
        {
          "text": "Removing inactivation preferentially restores high-voltage conductance."
        },
        {
          "text": "Identify sampled maxima as sampled, not uniquely continuous peaks."
        }
      ],
      "modelAnswer": [
        "Compute the cubic activation product and multiply by availability.",
        "Compute signed driving force independently.",
        "A reversal shift changes current without changing stipulated gating.",
        "Removing inactivation preferentially restores high-voltage conductance.",
        "Identify sampled maxima as sampled, not uniquely continuous peaks."
      ],
      "points": 1,
      "source": "L08 Exercise8 p1–2 #1",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Exercise8, PDF page 2. Source ex table panel with original labels and axes.",
        "fallbackAlt": "Exercise8, PDF page 2. Source ex table panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/ex-table.webp', import.meta.url).href,
          "alt": "Exercise8, PDF page 2. Source ex table panel with original labels and axes.",
          "aspect": 1.2732447817836812,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-ex-k-explain",
      "sectionId": "ex-k",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain exercise 8: absolute-voltage potassium graph. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "The graph uses absolute membrane voltage."
        },
        {
          "text": "Particle activation is not whole-channel fraction."
        },
        {
          "text": "Above potassium reversal the current is outward."
        },
        {
          "text": "A graph reading limits final precision."
        }
      ],
      "modelAnswer": [
        "The graph uses absolute membrane voltage.",
        "Particle activation is not whole-channel fraction.",
        "Above potassium reversal the current is outward.",
        "A graph reading limits final precision."
      ],
      "points": 1,
      "source": "L08 Exercise8 p2 #2",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Exercise8, PDF page 2. Source ex potassium panel with original labels and axes.",
        "fallbackAlt": "Exercise8, PDF page 2. Source ex potassium panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/ex-potassium.webp', import.meta.url).href,
          "alt": "Exercise8, PDF page 2. Source ex potassium panel with original labels and axes.",
          "aspect": 1.6624825662482565,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-ex-charge-explain",
      "sectionId": "ex-charge",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain exercise 8: gating area and single-channel inference. State the relevant assumption and a limitation of the source evidence.",
      "hints": [
        {
          "body": "Identify what is controlled and what is measured or predicted."
        },
        {
          "body": "Follow the source mechanism and distinguish current, voltage, probability and geometry."
        }
      ],
      "markScheme": [
        {
          "text": "Convert microampere milliseconds to coulombs."
        },
        {
          "text": "Divide by the charge moved per channel."
        },
        {
          "text": "Use the same area units for maximal conductance and density."
        },
        {
          "text": "Do not confuse the number of particles with independent pore currents."
        },
        {
          "text": "The original measured conductance need not be maximal; without open probability the true single-channel conductance is not uniquely determined."
        }
      ],
      "modelAnswer": [
        "Convert microampere milliseconds to coulombs.",
        "Divide by the charge moved per channel.",
        "Use the same area units for maximal conductance and density.",
        "Do not confuse the number of particles with independent pore currents.",
        "The original measured conductance need not be maximal; without open probability the true single-channel conductance is not uniquely determined."
      ],
      "points": 1,
      "source": "L08 Exercise8 p3 #3",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Exercise8, PDF page 3. Source ex gating panel with original labels and axes.",
        "fallbackAlt": "Exercise8, PDF page 3. Source ex gating panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/ex-gating.webp', import.meta.url).href,
          "alt": "Exercise8, PDF page 3. Source ex gating panel with original labels and axes.",
          "aspect": 1.4155597722960152,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-ionic-balance",
      "sectionId": "circuit",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "An ideal space-clamped membrane has $g_{Na}=20\\,\\mathrm{nS}$, $g_K=30\\,\\mathrm{nS}$, $g_L=5\\,\\mathrm{nS}$ at $V=-20\\,\\mathrm{mV}$. Reversals are $+50,-80,-60\\,\\mathrm{mV}$ respectively. $I_m=0$ and $C=100\\,\\mathrm{pF}$. Find all branch currents, net ionic current and instantaneous voltage slope.",
      "stages": [
        {
          "title": "Choose branch relation",
          "choices": [
            {
              "label": "$I_i=g_i(V-E_i)$"
            },
            {
              "label": "$I_i=g_i(E_i-V)$"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Outward current is positive."
          ]
        },
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Sodium conductance",
              "answer": {
                "value": 2e-08,
                "unit": "S",
                "tolerance": 2e-14,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 2e-08,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Potassium conductance",
              "answer": {
                "value": 3e-08,
                "unit": "S",
                "tolerance": 3e-14,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 3e-08,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Leak conductance",
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
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Sodium driving force",
          "answer": {
            "value": -0.07,
            "unit": "V",
            "tolerance": 0.00021000000000000004,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": -0.02,
                "b": -0.05
              },
              "displayScale": 1
            }
          },
          "tex": "D_{Na}=-0.020-0.050\\,\\mathrm V",
          "modelAnswer": [
            "Subtract reversal.",
            "$D_{Na}=-0.020-0.050\\,\\mathrm V$",
            "$-0.07\\,\\mathrm{V}$"
          ]
        },
        {
          "title": "Sodium current",
          "answer": {
            "value": -1.4e-09,
            "unit": "A",
            "tolerance": 4.2e-12,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 2e-08,
                "b": -0.07
              },
              "displayScale": 1
            }
          },
          "tex": "I_{Na}=g_{Na}D_{Na}",
          "modelAnswer": [
            "Negative is inward.",
            "$I_{Na}=g_{Na}D_{Na}$",
            "$-1.4\\times10^{-9}\\,\\mathrm{A}$"
          ]
        },
        {
          "title": "Potassium driving force",
          "answer": {
            "value": 0.06,
            "unit": "V",
            "tolerance": 0.00017999999999999998,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": -0.02,
                "b": 0.08
              },
              "displayScale": 1
            }
          },
          "tex": "D_K=-0.020-(-0.080)\\,\\mathrm V",
          "modelAnswer": [
            "Negative reversal is subtracted.",
            "$D_K=-0.020-(-0.080)\\,\\mathrm V$",
            "$0.06\\,\\mathrm{V}$"
          ]
        },
        {
          "title": "Potassium current",
          "answer": {
            "value": 1.8e-09,
            "unit": "A",
            "tolerance": 5.4000000000000004e-12,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 3e-08,
                "b": 0.06
              },
              "displayScale": 1
            }
          },
          "tex": "I_K=g_KD_K",
          "modelAnswer": [
            "Positive is outward.",
            "$I_K=g_KD_K$",
            "$1.8\\times10^{-9}\\,\\mathrm{A}$"
          ]
        },
        {
          "title": "Leak driving force",
          "answer": {
            "value": 0.04,
            "unit": "V",
            "tolerance": 0.00012,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": -0.02,
                "b": 0.06
              },
              "displayScale": 1
            }
          },
          "tex": "D_L=-0.020-(-0.060)\\,\\mathrm V",
          "modelAnswer": [
            "Keep leak.",
            "$D_L=-0.020-(-0.060)\\,\\mathrm V$",
            "$0.04\\,\\mathrm{V}$"
          ]
        },
        {
          "title": "Leak current",
          "answer": {
            "value": 2e-10,
            "unit": "A",
            "tolerance": 6.000000000000001e-13,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 5e-09,
                "b": 0.04
              },
              "displayScale": 1
            }
          },
          "tex": "I_L=g_LD_L",
          "modelAnswer": [
            "Leak is outward here.",
            "$I_L=g_LD_L$",
            "$2\\times10^{-10}\\,\\mathrm{A}$"
          ]
        },
        {
          "title": "Net sodium plus potassium",
          "answer": {
            "value": 4e-10,
            "unit": "A",
            "tolerance": 1.2000000000000001e-12,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": -1.4e-09,
                "b": 1.8e-09
              },
              "displayScale": 1
            }
          },
          "tex": "I_{NaK}=I_{Na}+I_K",
          "modelAnswer": [
            "Sum signed currents.",
            "$I_{NaK}=I_{Na}+I_K$",
            "$4\\times10^{-10}\\,\\mathrm{A}$"
          ]
        },
        {
          "title": "Total ionic current",
          "answer": {
            "value": 6e-10,
            "unit": "A",
            "tolerance": 1.8e-12,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": 4e-10,
                "b": 2e-10
              },
              "displayScale": 1
            }
          },
          "tex": "I_{ion}=I_{NaK}+I_L",
          "modelAnswer": [
            "Do not omit leak.",
            "$I_{ion}=I_{NaK}+I_L$",
            "$6\\times10^{-10}\\,\\mathrm{A}$"
          ]
        },
        {
          "title": "Voltage slope",
          "answer": {
            "value": -6,
            "unit": "V/s",
            "tolerance": 0.018000000000000002,
            "verification": {
              "relation": "hhBalance",
              "inputs": {
                "im": 0,
                "ionic": 6e-10,
                "capacitance": 1e-10
              },
              "displayScale": 1
            }
          },
          "tex": "\\dot V=-I_{ion}/C",
          "modelAnswer": [
            "Outward current repolarizes.",
            "$\\dot V=-I_{ion}/C$",
            "$-6\\,\\mathrm{V/s}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "Voltage falls although sodium current is inward"
            },
            {
              "label": "Voltage rises whenever sodium current is inward"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Net current, not a single branch, controls the slope."
          ]
        }
      ],
      "hints": [
        {
          "body": "Choose relations for the controlled geometry, gating state and signed current."
        },
        {
          "body": "First convert the stated quantities into the requested units. Evaluate intermediate factors separately before combining them."
        }
      ],
      "modelAnswer": [
        "Outward current is positive.",
        "Convert each stated quantity to the requested unit before evaluating.",
        "Subtract reversal.",
        "Negative is inward.",
        "Negative reversal is subtracted.",
        "Positive is outward.",
        "Keep leak.",
        "Leak is outward here.",
        "Sum signed currents.",
        "Do not omit leak.",
        "Outward current repolarizes.",
        "Net current, not a single branch, controls the slope."
      ],
      "points": 1,
      "source": "L08 8:1 p2–5; L07 conductance products"
    },
    {
      "id": "L08-wave-derive",
      "sectionId": "space",
      "difficulty": "hard",
      "type": "derive",
      "prompt": "Derive the travelling-wave derivative identity and explain why the source propagation equation needs the missing driving-force terms.",
      "hints": [
        {
          "body": "Identify independent evidence and distinguish measured signals from inferred mechanisms."
        },
        {
          "body": "Begin with one source observation, state its inference, then a control or alternative interpretation."
        }
      ],
      "markScheme": [
        {
          "text": "For $V=f(t-x/v)$, $V_{xx}=f^{\\prime\\prime}/v^2$ and $V_{tt}=f^{\\prime\\prime}$."
        },
        {
          "text": "Therefore $V_{xx}=V_{tt}/v^2$."
        },
        {
          "text": "Conductance alone does not have current units; each ionic branch requires its own voltage difference."
        },
        {
          "text": "The identity assumes a rigid constant-speed profile, not arbitrary changing waves."
        }
      ],
      "modelAnswer": [
        "For $V=f(t-x/v)$, $V_{xx}=f^{\\prime\\prime}/v^2$ and $V_{tt}=f^{\\prime\\prime}$.",
        "Therefore $V_{xx}=V_{tt}/v^2$.",
        "Conductance alone does not have current units; each ionic branch requires its own voltage difference.",
        "The identity assumes a rigid constant-speed profile, not arbitrary changing waves."
      ],
      "points": 1,
      "source": "L08 8:1 p4",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:1, PDF page 4. Source space panel with original labels and axes.",
        "fallbackAlt": "8:1, PDF page 4. Source space panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/space.webp', import.meta.url).href,
          "alt": "8:1, PDF page 4. Source space panel with original labels and axes.",
          "aspect": 2.9660056657223794,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-slow-stimulus",
      "sectionId": "accommodation",
      "difficulty": "hard",
      "type": "written",
      "prompt": "Explain why a brief rapid pulse can excite when a slow ramp to the same voltage fails. Then distinguish this from recovery after a preceding AP. Sketch the relevant momentary I–V changes on paper.",
      "hints": [
        {
          "body": "Identify independent evidence and distinguish measured signals from inferred mechanisms."
        },
        {
          "body": "Begin with one source observation, state its inference, then a control or alternative interpretation."
        }
      ],
      "markScheme": [
        {
          "text": "Slow depolarization increases $n$ and decreases $h$."
        },
        {
          "text": "The momentary relation shifts outward and threshold can disappear."
        },
        {
          "text": "Fast activation can outrun these slower changes during a brief pulse."
        },
        {
          "text": "After an AP, recovery of availability and decline of potassium conductance restore excitability."
        },
        {
          "text": "Label voltage, outward current, stable/unstable crossings and direction of slow shift."
        }
      ],
      "modelAnswer": [
        "Slow depolarization increases $n$ and decreases $h$.",
        "The momentary relation shifts outward and threshold can disappear.",
        "Fast activation can outrun these slower changes during a brief pulse.",
        "After an AP, recovery of availability and decline of potassium conductance restore excitability.",
        "Label voltage, outward current, stable/unstable crossings and direction of slow shift."
      ],
      "points": 1,
      "source": "L08 8:1 p13",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:1, PDF page 9. Source moving iv panel with original labels and axes.",
        "fallbackAlt": "8:1, PDF page 9. Source moving iv panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/moving-iv.webp', import.meta.url).href,
          "alt": "8:1, PDF page 9. Source moving iv panel with original labels and axes.",
          "aspect": 1.7771812080536913,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-sensor-audit",
      "sectionId": "isolation",
      "difficulty": "hard",
      "type": "written",
      "prompt": "Design a gating-current isolation protocol and diagnose a residual transient that changes with control-step size. Explain ON/OFF signs and why density inference is conditional.",
      "hints": [
        {
          "body": "Identify independent evidence and distinguish measured signals from inferred mechanisms."
        },
        {
          "body": "Begin with one source observation, state its inference, then a control or alternative interpretation."
        }
      ],
      "markScheme": [
        {
          "text": "Block ionic currents using the taught source methods."
        },
        {
          "text": "Use matched small control steps with minimal gating charge to subtract linear capacitance."
        },
        {
          "text": "Vary the control protocol to test subtraction artifacts."
        },
        {
          "text": "Depolarization-activated sensor ON is outward and OFF inward under outward-positive convention."
        },
        {
          "text": "Assigning all integrated charge to a known displaced charge per fully activated channel is required for density."
        }
      ],
      "modelAnswer": [
        "Block ionic currents using the taught source methods.",
        "Use matched small control steps with minimal gating charge to subtract linear capacitance.",
        "Vary the control protocol to test subtraction artifacts.",
        "Depolarization-activated sensor ON is outward and OFF inward under outward-positive convention.",
        "Assigning all integrated charge to a known displaced charge per fully activated channel is required for density."
      ],
      "points": 1,
      "source": "L08 8:1 p18",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:1, PDF page 18. Source gating panel with original labels and axes.",
        "fallbackAlt": "8:1, PDF page 18. Source gating panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/gating.webp', import.meta.url).href,
          "alt": "8:1, PDF page 18. Source gating panel with original labels and axes.",
          "aspect": 2.0232558139534884,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-sensor-density",
      "sectionId": "density",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "An ideal population has displaced gating-charge density $0.0032\\,\\mathrm{C/m^2}$. Each channel moves four elementary charges; use $e=1.6\\times10^{-19}\\,\\mathrm C$. Maximal ionic conductance density is $4000\\,\\mathrm{S/m^2}$. Recover charge per channel, density, density per square micrometer, and single-channel conductance. Explain the complete-activation assumption.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Charge density",
              "answer": {
                "value": 0.0032,
                "unit": "C/m2",
                "tolerance": 3.2e-09,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.0032,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Effective charge number",
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
            },
            {
              "label": "Elementary charge",
              "answer": {
                "value": 1.6e-19,
                "unit": "C",
                "tolerance": 1.5999999999999998e-25,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1.6e-19,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Maximal conductance density",
              "answer": {
                "value": 4000,
                "unit": "S/m2",
                "tolerance": 0.004,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 4000,
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
          "title": "Charge per channel",
          "answer": {
            "value": 6.4e-19,
            "unit": "C",
            "tolerance": 1.92e-21,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 4,
                "b": 1.6e-19
              },
              "displayScale": 1
            }
          },
          "tex": "q_c=ze",
          "modelAnswer": [
            "Multiply the charge number by elementary charge.",
            "$q_c=ze$",
            "$6.4\\times10^{-19}\\,\\mathrm{C}$"
          ]
        },
        {
          "title": "Channel density",
          "answer": {
            "value": 5000000000000000.0,
            "unit": "1/m2",
            "tolerance": 15000000000000.0,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 0.0032,
                "b": 6.4e-19
              },
              "displayScale": 1
            }
          },
          "tex": "D=Q_A/q_c",
          "modelAnswer": [
            "Charge counts channels only under full displacement.",
            "$D=Q_A/q_c$",
            "$5\\times10^{15}\\,\\mathrm{1/m2}$"
          ]
        },
        {
          "title": "Density per square micrometer",
          "answer": {
            "value": 5000,
            "unit": "1/um2",
            "tolerance": 15.0,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 5000000000000000.0,
                "b": 1
              },
              "displayScale": 1000000000000.0
            }
          },
          "tex": "D_{\\mu m^2}=D_{m^2}\\times10^{-12}",
          "modelAnswer": [
            "Convert inverse area, not length.",
            "$D_{\\mu m^2}=D_{m^2}\\times10^{-12}$",
            "$5000\\,\\mathrm{1/um2}$"
          ]
        },
        {
          "title": "Single-channel conductance",
          "answer": {
            "value": 8e-13,
            "unit": "S",
            "tolerance": 2.4e-15,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 4000,
                "b": 5000000000000000.0
              },
              "displayScale": 1
            }
          },
          "tex": "\\gamma=\\bar g_A/D",
          "modelAnswer": [
            "Maximal conductance divided by density.",
            "$\\gamma=\\bar g_A/D$",
            "$8\\times10^{-13}\\,\\mathrm{S}$"
          ]
        },
        {
          "title": "Assumption",
          "choices": [
            {
              "label": "Charge and conductance refer to the same fully activated population"
            },
            {
              "label": "Charge and conductance may refer to unrelated channel populations"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Otherwise the ratio does not identify one-channel conductance."
          ]
        }
      ],
      "hints": [
        {
          "body": "Choose relations for the controlled geometry, gating state and signed current."
        },
        {
          "body": "First convert the stated quantities into the requested units. Evaluate intermediate factors separately before combining them."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Multiply the charge number by elementary charge.",
        "Charge counts channels only under full displacement.",
        "Convert inverse area, not length.",
        "Maximal conductance divided by density.",
        "Otherwise the ratio does not identify one-channel conductance."
      ],
      "points": 1,
      "source": "L08 8:1 p16–20; Exercise8 p3 #3 method"
    },
    {
      "id": "L08-insulation-audit",
      "sectionId": "insulation",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "An ideal one-layer effective membrane has $R=50\\,\\mathrm{M\\Omega}$ and $C=40\\,\\mathrm{pF}$. Replace it by five identical equal-area layers in series while keeping axial properties fixed. Find effective resistance, capacitance, time constant and length-constant ratio. Then find the passive remaining voltage fraction one original length constant away before and after wrapping. Explain why this model does not prove a universal time-constant decrease.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "One-layer resistance",
              "answer": {
                "value": 50000000.0,
                "unit": "ohm",
                "tolerance": 50.0,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 50000000.0,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "One-layer capacitance",
              "answer": {
                "value": 4e-11,
                "unit": "F",
                "tolerance": 3.9999999999999997e-17,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 4e-11,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Layers",
              "answer": {
                "value": 5,
                "unit": "",
                "tolerance": 4.9999999999999996e-06,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 5,
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
          "title": "Effective resistance",
          "answer": {
            "value": 250000000.0,
            "unit": "ohm",
            "tolerance": 750000.0,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 5,
                "b": 50000000.0
              },
              "displayScale": 1
            }
          },
          "tex": "R_5=5R",
          "modelAnswer": [
            "Series resistance adds.",
            "$R_5=5R$",
            "$2.5\\times10^{8}\\,\\mathrm{ohm}$"
          ]
        },
        {
          "title": "Effective capacitance",
          "answer": {
            "value": 8e-12,
            "unit": "F",
            "tolerance": 2.4e-14,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 4e-11,
                "b": 5
              },
              "displayScale": 1
            }
          },
          "tex": "C_5=C/5",
          "modelAnswer": [
            "Series capacitance falls.",
            "$C_5=C/5$",
            "$8\\times10^{-12}\\,\\mathrm{F}$"
          ]
        },
        {
          "title": "Effective time constant",
          "answer": {
            "value": 0.002,
            "unit": "s",
            "tolerance": 6e-06,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 250000000.0,
                "b": 8e-12
              },
              "displayScale": 1
            }
          },
          "tex": "\\tau_5=R_5C_5",
          "modelAnswer": [
            "Ideal series factors cancel.",
            "$\\tau_5=R_5C_5$",
            "$0.002\\,\\mathrm{s}$"
          ]
        },
        {
          "title": "Length-constant ratio",
          "answer": {
            "value": 2.23606797749979,
            "unit": "",
            "tolerance": 0.00670820393249937,
            "verification": {
              "relation": "powerRatio",
              "inputs": {
                "a": 5,
                "b": 1,
                "power": 0.5
              },
              "displayScale": 1
            }
          },
          "tex": "\\lambda_5/\\lambda_1=\\sqrt5",
          "modelAnswer": [
            "Axial properties fixed.",
            "$\\lambda_5/\\lambda_1=\\sqrt5$",
            "$2.236068$"
          ]
        },
        {
          "title": "Original remaining voltage fraction",
          "answer": {
            "value": 0.36787944117144233,
            "unit": "",
            "tolerance": 0.001103638323514327,
            "verification": {
              "relation": "cableDecay",
              "inputs": {
                "v": 1,
                "x": 1,
                "lambda": 1
              },
              "displayScale": 1
            }
          },
          "tex": "f_1=e^{-1}",
          "modelAnswer": [
            "Compare the same physical distance.",
            "$f_1=e^{-1}$",
            "$0.36787944$"
          ]
        },
        {
          "title": "Wrapped remaining voltage fraction",
          "answer": {
            "value": 0.6394073191618971,
            "unit": "",
            "tolerance": 0.0019182219574856913,
            "verification": {
              "relation": "cableDecay",
              "inputs": {
                "v": 1,
                "x": 1,
                "lambda": 2.23606797749979
              },
              "displayScale": 1
            }
          },
          "tex": "f_5=e^{-1/\\sqrt5}",
          "modelAnswer": [
            "Less attenuation despite unchanged time constant.",
            "$f_5=e^{-1/\\sqrt5}$",
            "$0.63940732$"
          ]
        },
        {
          "title": "Conclusion",
          "choices": [
            {
              "label": "Longer spatial reach without a guaranteed time-constant reduction"
            },
            {
              "label": "Faster time constant is guaranteed by higher resistance alone"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Use the product and the separate spatial scale."
          ]
        }
      ],
      "hints": [
        {
          "body": "Choose relations for the controlled geometry, gating state and signed current."
        },
        {
          "body": "First convert the stated quantities into the requested units. Evaluate intermediate factors separately before combining them."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Series resistance adds.",
        "Series capacitance falls.",
        "Ideal series factors cancel.",
        "Axial properties fixed.",
        "Compare the same physical distance.",
        "Less attenuation despite unchanged time constant.",
        "Use the product and the separate spatial scale."
      ],
      "points": 1,
      "source": "L08 8:2 p6; L03 passive cable decay"
    },
    {
      "id": "L08-fiber-design",
      "sectionId": "dimensions",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "For an outer fiber diameter $D=12\\,\\mu\\mathrm m$, apply the supplied approximate geometry and speed fits. Estimate inner diameter, radial myelin thickness, internode length, speed and internode transit time. Compare the fractional speed change for a comparable unmyelinated axon whose diameter doubles.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Outer diameter",
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
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Inner diameter",
          "answer": {
            "value": 8.88e-06,
            "unit": "m",
            "tolerance": 2.664e-08,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 0.74,
                "b": 1.2e-05
              },
              "displayScale": 1
            }
          },
          "tex": "d=0.74D",
          "modelAnswer": [
            "Use outer diameter in this fit.",
            "$d=0.74D$",
            "$8.88\\times10^{-6}\\,\\mathrm{m}$"
          ]
        },
        {
          "title": "Outer minus inner diameter",
          "answer": {
            "value": 3.12e-06,
            "unit": "m",
            "tolerance": 9.36e-09,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": 1.2e-05,
                "b": -8.88e-06
              },
              "displayScale": 1
            }
          },
          "tex": "\\Delta d=D-d",
          "modelAnswer": [
            "This is twice the radial thickness.",
            "$\\Delta d=D-d$",
            "$3.12\\times10^{-6}\\,\\mathrm{m}$"
          ]
        },
        {
          "title": "Radial thickness",
          "answer": {
            "value": 1.56e-06,
            "unit": "m",
            "tolerance": 4.68e-09,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 3.12e-06,
                "b": 2
              },
              "displayScale": 1
            }
          },
          "tex": "t=(D-d)/2",
          "modelAnswer": [
            "Two sides of the sheath.",
            "$t=(D-d)/2$",
            "$1.56\\times10^{-6}\\,\\mathrm{m}$"
          ]
        },
        {
          "title": "Internode length",
          "answer": {
            "value": 0.001752,
            "unit": "m",
            "tolerance": 5.256e-06,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 146,
                "b": 1.2e-05
              },
              "displayScale": 1
            }
          },
          "tex": "L\\approx146D",
          "modelAnswer": [
            "Convert the empirical fit consistently.",
            "$L\\approx146D$",
            "$0.001752\\,\\mathrm{m}$"
          ]
        },
        {
          "title": "Speed estimate",
          "answer": {
            "value": 72,
            "unit": "m/s",
            "tolerance": 0.216,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 6000000.0,
                "b": 1.2e-05
              },
              "displayScale": 1
            }
          },
          "tex": "v\\approx6\\times10^6D",
          "modelAnswer": [
            "Empirical approximate coefficient.",
            "$v\\approx6\\times10^6D$",
            "$72\\,\\mathrm{m/s}$"
          ]
        },
        {
          "title": "Transit time",
          "answer": {
            "value": 2.4333333333333333e-05,
            "unit": "s",
            "tolerance": 7.3e-08,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 0.001752,
                "b": 72
              },
              "displayScale": 1
            }
          },
          "tex": "t=L/v",
          "modelAnswer": [
            "Timing estimate, not a nodal delay model.",
            "$t=L/v$",
            "$2.4333333\\times10^{-5}\\,\\mathrm{s}$"
          ]
        },
        {
          "title": "Unmyelinated speed ratio",
          "answer": {
            "value": 1.4142135623730951,
            "unit": "",
            "tolerance": 0.004242640687119286,
            "verification": {
              "relation": "powerRatio",
              "inputs": {
                "a": 2,
                "b": 1,
                "power": 0.5
              },
              "displayScale": 1
            }
          },
          "tex": "v_2/v_1=\\sqrt2",
          "modelAnswer": [
            "Linear myelinated scaling must not be transferred.",
            "$v_2/v_1=\\sqrt2$",
            "$1.4142136$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Choose relations for the controlled geometry, gating state and signed current."
        },
        {
          "body": "First convert the stated quantities into the requested units. Evaluate intermediate factors separately before combining them."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Use outer diameter in this fit.",
        "This is twice the radial thickness.",
        "Two sides of the sheath.",
        "Convert the empirical fit consistently.",
        "Empirical approximate coefficient.",
        "Timing estimate, not a nodal delay model.",
        "Linear myelinated scaling must not be transferred."
      ],
      "points": 1,
      "source": "L08 8:2 p3–4,8"
    },
    {
      "id": "L08-methods-design",
      "sectionId": "extracellular",
      "difficulty": "hard",
      "type": "written",
      "prompt": "Design a spatial recording and local-stimulation comparison to localize regenerative sites. Explain the limitations of an extracellular amplitude peak and the twitch threshold proxy.",
      "hints": [
        {
          "body": "Identify independent evidence and distinguish measured signals from inferred mechanisms."
        },
        {
          "body": "Begin with one source observation, state its inference, then a control or alternative interpretation."
        }
      ],
      "markScheme": [
        {
          "text": "Map electrode position relative to nodes while keeping reference and geometry controlled."
        },
        {
          "text": "Compare extracellular waveforms and local stimulation thresholds."
        },
        {
          "text": "Strong nodal extracellular signals and low nodal thresholds support localized regeneration."
        },
        {
          "text": "An extracellular voltage is not a direct transmembrane potential."
        },
        {
          "text": "A twitch additionally depends on conduction and neuromuscular/muscle response; it is not a direct nodal current measurement."
        }
      ],
      "modelAnswer": [
        "Map electrode position relative to nodes while keeping reference and geometry controlled.",
        "Compare extracellular waveforms and local stimulation thresholds.",
        "Strong nodal extracellular signals and low nodal thresholds support localized regeneration.",
        "An extracellular voltage is not a direct transmembrane potential.",
        "A twitch additionally depends on conduction and neuromuscular/muscle response; it is not a direct nodal current measurement."
      ],
      "points": 1,
      "source": "L08 8:2 p14",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:2, PDF page 13. Source twitch panel with original labels and axes.",
        "fallbackAlt": "8:2, PDF page 13. Source twitch panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/twitch.webp', import.meta.url).href,
          "alt": "8:2, PDF page 13. Source twitch panel with original labels and axes.",
          "aspect": 1.0967007963594995,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-saltatory-evidence",
      "sectionId": "jump",
      "difficulty": "hard",
      "type": "written",
      "prompt": "Use three independent source observations to reject literal disappearance of internodal voltage. Contrast the classical single-cable panel with the double-cable observation.",
      "hints": [
        {
          "body": "Identify independent evidence and distinguish measured signals from inferred mechanisms."
        },
        {
          "body": "Begin with one source observation, state its inference, then a control or alternative interpretation."
        }
      ],
      "markScheme": [
        {
          "text": "Inward membrane current is concentrated at nodes."
        },
        {
          "text": "Voltage profiles remain continuous through internodes."
        },
        {
          "text": "Local stimulation and extracellular amplitude vary with node distance."
        },
        {
          "text": "Limited conduction across blocked nodes supports passive bridging."
        },
        {
          "text": "A periaxonal path and optical waveform differences refine the model without removing internodal voltage."
        }
      ],
      "modelAnswer": [
        "Inward membrane current is concentrated at nodes.",
        "Voltage profiles remain continuous through internodes.",
        "Local stimulation and extracellular amplitude vary with node distance.",
        "Limited conduction across blocked nodes supports passive bridging.",
        "A periaxonal path and optical waveform differences refine the model without removing internodal voltage."
      ],
      "points": 1,
      "source": "L08 8:2 p17–18",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "8:2, PDF page 15. Source voltage current panel with original labels and axes.",
        "fallbackAlt": "8:2, PDF page 15. Source voltage current panel with original labels and axes.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L08/voltage-current.webp', import.meta.url).href,
          "alt": "8:2, PDF page 15. Source voltage current panel with original labels and axes.",
          "aspect": 1.7869742198100407,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L08-source-table-audit",
      "sectionId": "ex-iv",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "Infer an unknown sodium population from two new ideal observations. At $V_1=-20\\,\\mathrm{mV}$ the stipulated gates are $m_1=0.4,h_1=0.3$ and $I_1=-93.6\\,\\mathrm{pA}$. At $V_2=10\\,\\mathrm{mV}$ they are $m_2=0.8,h_2=0.1$ and $I_2=-134.4\\,\\mathrm{pA}$. Both observations share one unknown maximal conductance and reversal. Normalize out gating, infer both unknowns, then predict the second current if only reversal shifts to $15\\,\\mathrm{mV}$. Explain why two raw currents alone would not identify the parameters without the stipulated gates.",
      "hints": [
        {
          "body": "Use $I=\\bar g m^3h(V-E)$. Removing the known gate factors gives two points on one Ohmic line."
        },
        {
          "body": "Start with $I_1/(0.4^3\\times0.3)$. Do the same for the second observation, find the line slope, then its zero. Only after that change reversal while holding gating fixed."
        }
      ],
      "stages": [
        {
          "title": "Convert and enter the supplied operands",
          "fields": [
            {
              "label": "First current",
              "answer": {
                "value": -9.36e-11,
                "unit": "A",
                "tolerance": 1.8720000000000003e-13,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": -9.36e-11,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Second current",
              "answer": {
                "value": -1.344e-10,
                "unit": "A",
                "tolerance": 2.688e-13,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": -1.344e-10,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Voltage difference",
              "answer": {
                "value": 0.03,
                "unit": "V",
                "tolerance": 6e-05,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 0.03,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Use SI values or supported equivalent units. These are supplied illustrative observations, not readings from a source recording."
          ]
        },
        {
          "title": "First activation power",
          "answer": {
            "value": 0.06400000000000002,
            "unit": "",
            "tolerance": 0.00012800000000000002,
            "verification": {
              "relation": "gatePower",
              "inputs": {
                "y": 0.4,
                "count": 3
              },
              "displayScale": 1
            }
          },
          "tex": "m_1^3=0.4^3",
          "modelAnswer": [
            "Activation is a particle probability; its cube is not the full sodium open fraction.",
            "$0.064$"
          ]
        },
        {
          "title": "First open fraction",
          "answer": {
            "value": 0.019200000000000005,
            "unit": "",
            "tolerance": 3.840000000000001e-05,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 0.06400000000000002,
                "b": 0.3
              },
              "displayScale": 1
            }
          },
          "tex": "f_1=m_1^3h_1",
          "modelAnswer": [
            "Multiply by the separate availability.",
            "$0.0192$"
          ]
        },
        {
          "title": "Second open fraction",
          "answer": {
            "value": 0.051200000000000016,
            "unit": "",
            "tolerance": 0.00010240000000000004,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 0.5120000000000001,
                "b": 0.1
              },
              "displayScale": 1
            }
          },
          "tex": "f_2=m_2^3h_2",
          "modelAnswer": [
            "The second gating factor differs from the first.",
            "$0.0512$"
          ]
        },
        {
          "title": "First gate-normalized current",
          "answer": {
            "value": -4.874999999999999e-09,
            "unit": "A",
            "tolerance": 9.749999999999999e-12,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": -9.36e-11,
                "b": 0.019200000000000005
              },
              "displayScale": 1
            }
          },
          "tex": "J_1=I_1/f_1",
          "modelAnswer": [
            "This is the hypothetical current at full opening, not the measured current.",
            "$-4.875\\times10^{-9}\\,\\mathrm{A}$"
          ]
        },
        {
          "title": "Second gate-normalized current",
          "answer": {
            "value": -2.624999999999999e-09,
            "unit": "A",
            "tolerance": 5.249999999999998e-12,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": -1.344e-10,
                "b": 0.051200000000000016
              },
              "displayScale": 1
            }
          },
          "tex": "J_2=I_2/f_2",
          "modelAnswer": [
            "Both normalized currents share the same maximal conductance.",
            "$-2.625\\times10^{-9}\\,\\mathrm{A}$"
          ]
        },
        {
          "title": "Normalized current difference",
          "answer": {
            "value": 2.25e-09,
            "unit": "A",
            "tolerance": 4.5e-12,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": -2.624999999999999e-09,
                "b": 4.874999999999999e-09
              },
              "displayScale": 1
            }
          },
          "tex": "\\Delta J=J_2-J_1",
          "modelAnswer": [
            "Subtract in the same order as the voltage difference.",
            "$2.25\\times10^{-9}\\,\\mathrm{A}$"
          ]
        },
        {
          "title": "Infer maximal conductance",
          "answer": {
            "value": 7.5e-08,
            "unit": "S",
            "tolerance": 1.5e-10,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 2.25e-09,
                "b": 0.03
              },
              "displayScale": 1
            }
          },
          "tex": "\\bar g=\\Delta J/(V_2-V_1)",
          "modelAnswer": [
            "The positive slope is the inferred maximal conductance.",
            "$7.5\\times10^{-8}\\,\\mathrm{S}$"
          ]
        },
        {
          "title": "First normalized driving force",
          "answer": {
            "value": -0.06499999999999999,
            "unit": "V",
            "tolerance": 0.00013,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": -4.874999999999999e-09,
                "b": 7.5e-08
              },
              "displayScale": 1
            }
          },
          "tex": "V_1-E=J_1/\\bar g",
          "modelAnswer": [
            "Its negative sign is consistent with inward current.",
            "$-0.065\\,\\mathrm{V}$"
          ]
        },
        {
          "title": "Infer reversal",
          "answer": {
            "value": 0.044999999999999984,
            "unit": "V",
            "tolerance": 8.999999999999997e-05,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": -0.02,
                "b": 0.06499999999999999
              },
              "displayScale": 1
            }
          },
          "tex": "E=V_1-J_1/\\bar g",
          "modelAnswer": [
            "The reversal lies above both test voltages.",
            "$0.045\\,\\mathrm{V}$"
          ]
        },
        {
          "title": "Second population conductance",
          "answer": {
            "value": 3.840000000000001e-09,
            "unit": "S",
            "tolerance": 7.680000000000001e-12,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 7.5e-08,
                "b": 0.051200000000000016
              },
              "displayScale": 1
            }
          },
          "tex": "g_2=\\bar gf_2",
          "modelAnswer": [
            "Only gating sets the fraction of maximum here.",
            "$3.84\\times10^{-9}\\,\\mathrm{S}$"
          ]
        },
        {
          "title": "Predict current after reversal shift",
          "answer": {
            "value": -1.9200000000000005e-11,
            "unit": "A",
            "tolerance": 3.840000000000001e-14,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 3.840000000000001e-09,
                "b": -0.005
              },
              "displayScale": 1
            }
          },
          "tex": "I_2^{new}=\\bar gf_2(0.010-0.015)\\,\\mathrm V",
          "modelAnswer": [
            "The remaining inward driving force is smaller. Without known gates the two observations do not uniquely separate gating from maximum conductance and reversal.",
            "$-1.92\\times10^{-11}\\,\\mathrm{A}$"
          ]
        }
      ],
      "modelAnswer": [
        "Normalize by each known open fraction before fitting the line.",
        "Infer its positive slope and zero-current voltage.",
        "A reversal change then alters driving force without changing the stipulated gates.",
        "Without independently known gate factors, the inverse problem is not uniquely determined."
      ],
      "points": 1,
      "source": "L08 8:1 p2–3; Exercise8 p1–2 #1 method; L07 PDF14,18"
    },
    {
      "id": "L08-gating-reversal",
      "sectionId": "ex-iv",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "A new ideal sodium population has $\\bar g=80\\,\\mathrm{nS}$, $m_\\infty=0.7$, $h_\\infty=0.1$ at $V=-10\\,\\mathrm{mV}$. Find current for $E=50\\,\\mathrm{mV}$, then for $E=20\\,\\mathrm{mV}$ at fixed gates. Finally remove inactivation at the original reversal. Compare the mechanisms, not just magnitudes.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Maximum conductance",
              "answer": {
                "value": 8e-08,
                "unit": "S",
                "tolerance": 8e-14,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 8e-08,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Activation",
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
            },
            {
              "label": "Availability",
              "answer": {
                "value": 0.1,
                "unit": "",
                "tolerance": 1e-07,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.1,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Voltage",
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
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Cubic activation",
          "answer": {
            "value": 0.3429999999999999,
            "unit": "",
            "tolerance": 0.0010289999999999997,
            "verification": {
              "relation": "gatePower",
              "inputs": {
                "y": 0.7,
                "count": 3
              },
              "displayScale": 1
            }
          },
          "tex": "A=m^3",
          "modelAnswer": [
            "Three independent activation factors.",
            "$A=m^3$",
            "$0.343$"
          ]
        },
        {
          "title": "Open fraction",
          "answer": {
            "value": 0.03429999999999999,
            "unit": "",
            "tolerance": 0.00010289999999999997,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 0.3429999999999999,
                "b": 0.1
              },
              "displayScale": 1
            }
          },
          "tex": "Y=Ah",
          "modelAnswer": [
            "Availability suppresses the fraction.",
            "$Y=Ah$",
            "$0.0343$"
          ]
        },
        {
          "title": "Conductance",
          "answer": {
            "value": 2.7439999999999996e-09,
            "unit": "S",
            "tolerance": 8.232e-12,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 8e-08,
                "b": 0.03429999999999999
              },
              "displayScale": 1
            }
          },
          "tex": "g=\\bar gY",
          "modelAnswer": [
            "Use conductance, not maximum directly.",
            "$g=\\bar gY$",
            "$2.744\\times10^{-9}\\,\\mathrm{S}$"
          ]
        },
        {
          "title": "Original driving force",
          "answer": {
            "value": -0.06,
            "unit": "V",
            "tolerance": 0.00017999999999999998,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": -0.01,
                "b": -0.05
              },
              "displayScale": 1
            }
          },
          "tex": "D=V-E",
          "modelAnswer": [
            "Outward sign convention.",
            "$D=V-E$",
            "$-0.06\\,\\mathrm{V}$"
          ]
        },
        {
          "title": "Original current",
          "answer": {
            "value": -1.6463999999999996e-10,
            "unit": "A",
            "tolerance": 4.939199999999999e-13,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 2.7439999999999996e-09,
                "b": -0.06
              },
              "displayScale": 1
            }
          },
          "tex": "I=gD",
          "modelAnswer": [
            "Current is inward.",
            "$I=gD$",
            "$-1.6464\\times10^{-10}\\,\\mathrm{A}$"
          ]
        },
        {
          "title": "Shifted driving force",
          "answer": {
            "value": -0.03,
            "unit": "V",
            "tolerance": 8.999999999999999e-05,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": -0.01,
                "b": -0.02
              },
              "displayScale": 1
            }
          },
          "tex": "D_{new}=V-E_{new}",
          "modelAnswer": [
            "Only driving force changes.",
            "$D_{new}=V-E_{new}$",
            "$-0.03\\,\\mathrm{V}$"
          ]
        },
        {
          "title": "Shifted current",
          "answer": {
            "value": -8.231999999999998e-11,
            "unit": "A",
            "tolerance": 2.4695999999999994e-13,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 2.7439999999999996e-09,
                "b": -0.03
              },
              "displayScale": 1
            }
          },
          "tex": "I_{new}=gD_{new}",
          "modelAnswer": [
            "Reduced inward driving force.",
            "$I_{new}=gD_{new}$",
            "$-8.232\\times10^{-11}\\,\\mathrm{A}$"
          ]
        },
        {
          "title": "No-inactivation conductance",
          "answer": {
            "value": 2.7439999999999993e-08,
            "unit": "S",
            "tolerance": 8.231999999999998e-11,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 8e-08,
                "b": 0.3429999999999999
              },
              "displayScale": 1
            }
          },
          "tex": "g_{h=1}=\\bar gm^3",
          "modelAnswer": [
            "Now availability changes.",
            "$g_{h=1}=\\bar gm^3$",
            "$2.744\\times10^{-8}\\,\\mathrm{S}$"
          ]
        },
        {
          "title": "No-inactivation current",
          "answer": {
            "value": -1.6463999999999996e-09,
            "unit": "A",
            "tolerance": 4.939199999999999e-12,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 2.7439999999999993e-08,
                "b": -0.06
              },
              "displayScale": 1
            }
          },
          "tex": "I_{h=1}=g_{h=1}(V-E)",
          "modelAnswer": [
            "Keep the original reversal for this comparison.",
            "$I_{h=1}=g_{h=1}(V-E)$",
            "$-1.6464\\times10^{-9}\\,\\mathrm{A}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Choose relations for the controlled geometry, gating state and signed current."
        },
        {
          "body": "First convert the stated quantities into the requested units. Evaluate intermediate factors separately before combining them."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Three independent activation factors.",
        "Availability suppresses the fraction.",
        "Use conductance, not maximum directly.",
        "Outward sign convention.",
        "Current is inward.",
        "Only driving force changes.",
        "Reduced inward driving force.",
        "Now availability changes.",
        "Keep the original reversal for this comparison."
      ],
      "points": 1,
      "source": "L08 8:1 p3; Exercise8 p1–2 #1 method"
    },
    {
      "id": "L08-source-k-audit",
      "sectionId": "ex-k",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "A new ideal potassium tail is $+200\\,\\mathrm{pA}$ at $-40\\,\\mathrm{mV}$, with $E_K=-80\\,\\mathrm{mV}$ and $\\bar g_K=125\\,\\mathrm{nS}$. Recover conductance and particle activation. The voltage then jumps to $-60\\,\\mathrm{mV}$ before gates change. Predict the immediate current, then the later current if $n$ reaches $0.8$. Resolve the capacitive transient separately. Explain why the current jump is not evidence of an instantaneous gate change.",
      "hints": [
        {
          "body": "Combine the ionic driving-force law with $g_K=\\bar g_Kn^4$. Finite-rate gates remain continuous during an ideal voltage step."
        },
        {
          "body": "Start with $g_K=(200\\,\\mathrm{pA})/(40\\,\\mathrm{mV})$. Normalize and take the fourth root, then reuse the unchanged conductance at the new driving force before considering later activation."
        }
      ],
      "stages": [
        {
          "title": "Convert and enter the supplied operands",
          "fields": [
            {
              "label": "Initial current",
              "answer": {
                "value": 2e-10,
                "unit": "A",
                "tolerance": 4e-13,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 2e-10,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Initial driving force",
              "answer": {
                "value": 0.04,
                "unit": "V",
                "tolerance": 8e-05,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 0.04,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Maximal conductance",
              "answer": {
                "value": 1.25e-07,
                "unit": "S",
                "tolerance": 2.5e-10,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 1.25e-07,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Use SI values or supported equivalent units. These are supplied illustrative observations, not readings from a source recording."
          ]
        },
        {
          "title": "Initial conductance",
          "answer": {
            "value": 5e-09,
            "unit": "S",
            "tolerance": 1.0000000000000001e-11,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 2e-10,
                "b": 0.04
              },
              "displayScale": 1
            }
          },
          "tex": "g_K=I/(V-E_K)",
          "modelAnswer": [
            "The initial current and driving force are both positive.",
            "$5\\times10^{-9}\\,\\mathrm{S}$"
          ]
        },
        {
          "title": "Whole-channel open fraction",
          "answer": {
            "value": 0.04,
            "unit": "",
            "tolerance": 8e-05,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 5e-09,
                "b": 1.25e-07
              },
              "displayScale": 1
            }
          },
          "tex": "n^4=g_K/\\bar g_K",
          "modelAnswer": [
            "Do not equate the conductance fraction with the particle probability.",
            "$0.04$"
          ]
        },
        {
          "title": "Infer particle probability",
          "answer": {
            "value": 0.4472135954999579,
            "unit": "",
            "tolerance": 0.0008944271909999159,
            "verification": {
              "relation": "powerRatio",
              "inputs": {
                "a": 0.04,
                "b": 1,
                "power": 0.25
              },
              "displayScale": 1
            }
          },
          "tex": "n=(g_K/\\bar g_K)^{1/4}",
          "modelAnswer": [
            "The particle probability is bounded between zero and one.",
            "$0.4472136$"
          ]
        },
        {
          "title": "Immediate tail after the jump",
          "answer": {
            "value": 1e-10,
            "unit": "A",
            "tolerance": 2e-13,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 5e-09,
                "b": 0.02
              },
              "displayScale": 1
            }
          },
          "tex": "I(0^+)=g_K(-0.060+0.080)\\,\\mathrm V",
          "modelAnswer": [
            "Gating is unchanged; the outward driving force halves.",
            "$1\\times10^{-10}\\,\\mathrm{A}$"
          ]
        },
        {
          "title": "Later whole-channel fraction",
          "answer": {
            "value": 0.4096000000000001,
            "unit": "",
            "tolerance": 0.0008192000000000002,
            "verification": {
              "relation": "gatePower",
              "inputs": {
                "y": 0.8,
                "count": 4
              },
              "displayScale": 1
            }
          },
          "tex": "Y_K=0.8^4",
          "modelAnswer": [
            "Later activation changes population conductance.",
            "$0.4096$"
          ]
        },
        {
          "title": "Later conductance",
          "answer": {
            "value": 5.120000000000001e-08,
            "unit": "S",
            "tolerance": 1.0240000000000002e-10,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 1.25e-07,
                "b": 0.4096000000000001
              },
              "displayScale": 1
            }
          },
          "tex": "g_K^{later}=\\bar g_KY_K",
          "modelAnswer": [
            "Use maximum conductance, not the initial conductance, for the new fraction.",
            "$5.12\\times10^{-8}\\,\\mathrm{S}$"
          ]
        },
        {
          "title": "Later current",
          "answer": {
            "value": 1.0240000000000002e-09,
            "unit": "A",
            "tolerance": 2.0480000000000006e-12,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 5.120000000000001e-08,
                "b": 0.02
              },
              "displayScale": 1
            }
          },
          "tex": "I^{later}=g_K^{later}(V_2-E_K)",
          "modelAnswer": [
            "Both times have outward current. The immediate decrease comes from driving force; the later increase comes from activation.",
            "$1.024\\times10^{-9}\\,\\mathrm{A}$"
          ]
        }
      ],
      "modelAnswer": [
        "Recover the open fraction before taking the fourth root.",
        "The early jump changes driving force while gates remain continuous.",
        "The later current uses the new particle state."
      ],
      "points": 1,
      "source": "L08 Exercise8 p2 #2 method; L07 PDF13–18,23"
    },
    {
      "id": "L08-source-charge-audit",
      "sectionId": "ex-charge",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "A new ideal sensor experiment gives complete displaced charge density $1.92\\,\\mathrm{nC/cm^2}$, with three elementary charges per channel and $e=1.6\\times10^{-19}\\,\\mathrm C$. Ionic conductance density is $0.12\\,\\mathrm{S/cm^2}$ in a test pulse. An independently verified fully open pulse gives $0.20\\,\\mathrm{S/cm^2}$. Infer channel density, single-channel conductance and test-pulse open probability. Explain what remains identifiable if the fully open pulse is unavailable.",
      "hints": [
        {
          "body": "Integrated sensor charge counts assigned sensor displacement, while ionic conductance also depends on open probability. Use $D=Q_A/(ze)$ and $g_A=D\\gamma P_{open}$."
        },
        {
          "body": "Start by converting the charge density into coulombs per square meter. Divide by charge per channel; compare test and fully open conductances only after using a shared area basis."
        }
      ],
      "stages": [
        {
          "title": "Convert and enter the supplied operands",
          "fields": [
            {
              "label": "Charge density",
              "answer": {
                "value": 1.92e-05,
                "unit": "C/m2",
                "tolerance": 3.84e-08,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 1.92e-05,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Test conductance density",
              "answer": {
                "value": 1200,
                "unit": "S/m2",
                "tolerance": 2.4,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 1200,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Fully open conductance density",
              "answer": {
                "value": 2000,
                "unit": "S/m2",
                "tolerance": 4.0,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 2000,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Use SI values or supported equivalent units. These are supplied illustrative observations, not readings from a source recording."
          ]
        },
        {
          "title": "Charge displaced per channel",
          "answer": {
            "value": 4.7999999999999995e-19,
            "unit": "C",
            "tolerance": 9.6e-22,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 3,
                "b": 1.6e-19
              },
              "displayScale": 1
            }
          },
          "tex": "q_c=3e",
          "modelAnswer": [
            "Sensor displacement per channel is stipulated complete.",
            "$4.8\\times10^{-19}\\,\\mathrm{C}$"
          ]
        },
        {
          "title": "Channel density",
          "answer": {
            "value": 40000000000000.0,
            "unit": "1/m2",
            "tolerance": 80000000000.0,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 1.92e-05,
                "b": 4.7999999999999995e-19
              },
              "displayScale": 1
            }
          },
          "tex": "D=Q_A/q_c",
          "modelAnswer": [
            "Use the same membrane-area basis throughout.",
            "$4\\times10^{13}\\,\\mathrm{m^{-2}}$"
          ]
        },
        {
          "title": "Test conductance per channel",
          "answer": {
            "value": 3e-11,
            "unit": "S",
            "tolerance": 6e-14,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 1200,
                "b": 40000000000000.0
              },
              "displayScale": 1
            }
          },
          "tex": "g_{A,test}/D=\\gamma P_{open}",
          "modelAnswer": [
            "This product alone is not the single-channel conductance.",
            "$3\\times10^{-11}\\,\\mathrm{S}$"
          ]
        },
        {
          "title": "Single-channel conductance",
          "answer": {
            "value": 5e-11,
            "unit": "S",
            "tolerance": 1e-13,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 2000,
                "b": 40000000000000.0
              },
              "displayScale": 1
            }
          },
          "tex": "\\gamma=g_{A,max}/D",
          "modelAnswer": [
            "Independent evidence of full opening makes this inference possible.",
            "$5\\times10^{-11}\\,\\mathrm{S}$"
          ]
        },
        {
          "title": "Test open probability",
          "answer": {
            "value": 0.6,
            "unit": "",
            "tolerance": 0.0012,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 3e-11,
                "b": 5e-11
              },
              "displayScale": 1
            }
          },
          "tex": "P_{open}=(g_{A,test}/D)/\\gamma",
          "modelAnswer": [
            "The inferred probability is within its physical bounds. Without the fully open pulse only the product gamma times open probability is fixed.",
            "$0.6$"
          ]
        }
      ],
      "modelAnswer": [
        "Complete sensor displacement and assigned charge identify density.",
        "An independent fully open ionic pulse identifies single-channel conductance.",
        "The test/maximal conductance ratio identifies test open probability.",
        "Without full-opening evidence only the conductance/probability product is determined."
      ],
      "points": 1,
      "source": "L08 8:1 p18–20; Exercise8 p3 #3 method"
    }
  ],
  "mockExams": [
    {
      "id": "L08-mock-a",
      "title": "Mock A: Signed current balance and finite-window capacitance",
      "coverage": "Lectures 1–8 only. Official five-group structure; practice criteria are not official question weights. Calculator and supplied equation sheet available.",
      "questions": [
        {
          "id": "L08-a1",
          "difficulty": "medium",
          "type": "written",
          "prompt": "a) Distinguish space and voltage clamp. b) State outward current convention. c) Explain why zero net ionic current need not mean closed channels. d) Define accommodation.",
          "hints": [
            {
              "body": "Identify the physical variable and the recording condition."
            },
            {
              "body": "State a source-grounded causal link, then its assumption or limitation."
            }
          ],
          "markScheme": [
            {
              "text": "Space clamp removes spatial gradients; voltage clamp fixes voltage."
            },
            {
              "text": "Outward ionic current is positive."
            },
            {
              "text": "Opposing branch currents can cancel at nonzero conductance."
            },
            {
              "text": "Slow depolarization can raise threshold through potassium activation and sodium inactivation."
            }
          ],
          "modelAnswer": [
            "Space clamp removes spatial gradients; voltage clamp fixes voltage.",
            "Outward ionic current is positive.",
            "Opposing branch currents can cancel at nonzero conductance.",
            "Slow depolarization can raise threshold through potassium activation and sodium inactivation."
          ],
          "points": 1,
          "source": "L08 8:1 p2–14,19"
        },
        {
          "id": "L08-a2",
          "difficulty": "medium",
          "type": "written",
          "prompt": "Explain initiation, peak, repolarization, afterhyperpolarization and refractory recovery; sketch voltage and both conductances.",
          "hints": [
            {
              "body": "Identify the physical variable and the recording condition."
            },
            {
              "body": "State a source-grounded causal link, then its assumption or limitation."
            }
          ],
          "markScheme": [
            {
              "text": "At rest activation is low, not literally zero in every HH steady state."
            },
            {
              "text": "Fast sodium activation drives upstroke."
            },
            {
              "text": "Decreasing inward driving force, inactivation and outward potassium terminate it."
            },
            {
              "text": "Residual potassium conductance supports afterhyperpolarization."
            },
            {
              "text": "Absolute refractoriness reflects extensive sodium inactivation."
            },
            {
              "text": "Relative refractoriness includes partial recovery and elevated potassium conductance."
            },
            {
              "text": "Keep first stimulus and recording conditions matched while varying interval and second-pulse strength."
            }
          ],
          "modelAnswer": [
            "At rest activation is low, not literally zero in every HH steady state.",
            "Fast sodium activation drives upstroke.",
            "Decreasing inward driving force, inactivation and outward potassium terminate it.",
            "Residual potassium conductance supports afterhyperpolarization.",
            "Absolute refractoriness reflects extensive sodium inactivation.",
            "Relative refractoriness includes partial recovery and elevated potassium conductance.",
            "Keep first stimulus and recording conditions matched while varying interval and second-pulse strength."
          ],
          "points": 1,
          "source": "L08 8:1 p2–14,19",
          "figure": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:1, PDF page 12. Source phases panel with original labels and axes.",
            "fallbackAlt": "8:1, PDF page 12. Source phases panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/phases.webp', import.meta.url).href,
              "alt": "8:1, PDF page 12. Source phases panel with original labels and axes.",
              "aspect": 0.9877049180327869,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        },
        {
          "id": "L08-a3",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "An ideal space-clamped membrane has $g_{Na}=20\\,\\mathrm{nS}$, $g_K=30\\,\\mathrm{nS}$, $g_L=5\\,\\mathrm{nS}$ at $V=-20\\,\\mathrm{mV}$. Reversals are $+50,-80,-60\\,\\mathrm{mV}$ respectively. $I_m=0$ and $C=100\\,\\mathrm{pF}$. Find all branch currents, net ionic current and instantaneous voltage slope.",
          "stages": [
            {
              "title": "Choose branch relation",
              "choices": [
                {
                  "label": "$I_i=g_i(V-E_i)$"
                },
                {
                  "label": "$I_i=g_i(E_i-V)$"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "Outward current is positive."
              ]
            },
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "Sodium conductance",
                  "answer": {
                    "value": 2e-08,
                    "unit": "S",
                    "tolerance": 2e-14,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 2e-08,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Potassium conductance",
                  "answer": {
                    "value": 3e-08,
                    "unit": "S",
                    "tolerance": 3e-14,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 3e-08,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Leak conductance",
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
                }
              ],
              "modelAnswer": [
                "Convert each stated quantity to the requested unit before evaluating."
              ]
            },
            {
              "title": "Sodium driving force",
              "answer": {
                "value": -0.07,
                "unit": "V",
                "tolerance": 0.00021000000000000004,
                "verification": {
                  "relation": "sum",
                  "inputs": {
                    "a": -0.02,
                    "b": -0.05
                  },
                  "displayScale": 1
                }
              },
              "tex": "D_{Na}=-0.020-0.050\\,\\mathrm V",
              "modelAnswer": [
                "Subtract reversal.",
                "$D_{Na}=-0.020-0.050\\,\\mathrm V$",
                "$-0.07\\,\\mathrm{V}$"
              ]
            },
            {
              "title": "Sodium current",
              "answer": {
                "value": -1.4e-09,
                "unit": "A",
                "tolerance": 4.2e-12,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 2e-08,
                    "b": -0.07
                  },
                  "displayScale": 1
                }
              },
              "tex": "I_{Na}=g_{Na}D_{Na}",
              "modelAnswer": [
                "Negative is inward.",
                "$I_{Na}=g_{Na}D_{Na}$",
                "$-1.4\\times10^{-9}\\,\\mathrm{A}$"
              ]
            },
            {
              "title": "Potassium driving force",
              "answer": {
                "value": 0.06,
                "unit": "V",
                "tolerance": 0.00017999999999999998,
                "verification": {
                  "relation": "sum",
                  "inputs": {
                    "a": -0.02,
                    "b": 0.08
                  },
                  "displayScale": 1
                }
              },
              "tex": "D_K=-0.020-(-0.080)\\,\\mathrm V",
              "modelAnswer": [
                "Negative reversal is subtracted.",
                "$D_K=-0.020-(-0.080)\\,\\mathrm V$",
                "$0.06\\,\\mathrm{V}$"
              ]
            },
            {
              "title": "Potassium current",
              "answer": {
                "value": 1.8e-09,
                "unit": "A",
                "tolerance": 5.4000000000000004e-12,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 3e-08,
                    "b": 0.06
                  },
                  "displayScale": 1
                }
              },
              "tex": "I_K=g_KD_K",
              "modelAnswer": [
                "Positive is outward.",
                "$I_K=g_KD_K$",
                "$1.8\\times10^{-9}\\,\\mathrm{A}$"
              ]
            },
            {
              "title": "Leak driving force",
              "answer": {
                "value": 0.04,
                "unit": "V",
                "tolerance": 0.00012,
                "verification": {
                  "relation": "sum",
                  "inputs": {
                    "a": -0.02,
                    "b": 0.06
                  },
                  "displayScale": 1
                }
              },
              "tex": "D_L=-0.020-(-0.060)\\,\\mathrm V",
              "modelAnswer": [
                "Keep leak.",
                "$D_L=-0.020-(-0.060)\\,\\mathrm V$",
                "$0.04\\,\\mathrm{V}$"
              ]
            },
            {
              "title": "Leak current",
              "answer": {
                "value": 2e-10,
                "unit": "A",
                "tolerance": 6.000000000000001e-13,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 5e-09,
                    "b": 0.04
                  },
                  "displayScale": 1
                }
              },
              "tex": "I_L=g_LD_L",
              "modelAnswer": [
                "Leak is outward here.",
                "$I_L=g_LD_L$",
                "$2\\times10^{-10}\\,\\mathrm{A}$"
              ]
            },
            {
              "title": "Net sodium plus potassium",
              "answer": {
                "value": 4e-10,
                "unit": "A",
                "tolerance": 1.2000000000000001e-12,
                "verification": {
                  "relation": "sum",
                  "inputs": {
                    "a": -1.4e-09,
                    "b": 1.8e-09
                  },
                  "displayScale": 1
                }
              },
              "tex": "I_{NaK}=I_{Na}+I_K",
              "modelAnswer": [
                "Sum signed currents.",
                "$I_{NaK}=I_{Na}+I_K$",
                "$4\\times10^{-10}\\,\\mathrm{A}$"
              ]
            },
            {
              "title": "Total ionic current",
              "answer": {
                "value": 6e-10,
                "unit": "A",
                "tolerance": 1.8e-12,
                "verification": {
                  "relation": "sum",
                  "inputs": {
                    "a": 4e-10,
                    "b": 2e-10
                  },
                  "displayScale": 1
                }
              },
              "tex": "I_{ion}=I_{NaK}+I_L",
              "modelAnswer": [
                "Do not omit leak.",
                "$I_{ion}=I_{NaK}+I_L$",
                "$6\\times10^{-10}\\,\\mathrm{A}$"
              ]
            },
            {
              "title": "Voltage slope",
              "answer": {
                "value": -6,
                "unit": "V/s",
                "tolerance": 0.018000000000000002,
                "verification": {
                  "relation": "hhBalance",
                  "inputs": {
                    "im": 0,
                    "ionic": 6e-10,
                    "capacitance": 1e-10
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\dot V=-I_{ion}/C",
              "modelAnswer": [
                "Outward current repolarizes.",
                "$\\dot V=-I_{ion}/C$",
                "$-6\\,\\mathrm{V/s}$"
              ]
            },
            {
              "title": "Plausibility",
              "choices": [
                {
                  "label": "Voltage falls although sodium current is inward"
                },
                {
                  "label": "Voltage rises whenever sodium current is inward"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "Net current, not a single branch, controls the slope."
              ]
            }
          ],
          "hints": [
            {
              "body": "Choose relations for the controlled geometry, gating state and signed current."
            },
            {
              "body": "First convert the stated quantities into the requested units. Evaluate intermediate factors separately before combining them."
            }
          ],
          "modelAnswer": [
            "Outward current is positive.",
            "Convert each stated quantity to the requested unit before evaluating.",
            "Subtract reversal.",
            "Negative is inward.",
            "Negative reversal is subtracted.",
            "Positive is outward.",
            "Keep leak.",
            "Leak is outward here.",
            "Sum signed currents.",
            "Do not omit leak.",
            "Outward current repolarizes.",
            "Net current, not a single branch, controls the slope."
          ],
          "points": 1,
          "source": "L08 8:1 p2–5; L07 conductance products"
        },
        {
          "id": "L08-a4",
          "difficulty": "medium",
          "type": "multiStepCalc",
          "prompt": "A new ideal leak-corrected transient is $I_C(t)=2\\,\\mathrm{nA}\\,e^{-t/(0.5\\,\\mathrm{ms})}$. Integrate to $1\\,\\mathrm{ms}$ after a $10\\,\\mathrm{mV}$ step. Find captured charge, fraction of total, inferred capacitance from that window, and the complete-transient capacitance. State the finite-window bias.",
          "stages": [
            {
              "title": "Select integration",
              "choices": [
                {
                  "label": "$Q(t)=I_0\\tau(1-e^{-t/\\tau})$"
                },
                {
                  "label": "$Q(t)=I_0t$ for every decay"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "Integrate the decaying current."
              ]
            },
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "Initial current",
                  "answer": {
                    "value": 2e-09,
                    "unit": "A",
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
                  "label": "Time constant",
                  "answer": {
                    "value": 0.0005,
                    "unit": "s",
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
                },
                {
                  "label": "Window",
                  "answer": {
                    "value": 0.001,
                    "unit": "s",
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
                  "label": "Step",
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
                }
              ],
              "modelAnswer": [
                "Convert each stated quantity to the requested unit before evaluating."
              ]
            },
            {
              "title": "Captured charge",
              "answer": {
                "value": 8.646647167633873e-13,
                "unit": "C",
                "tolerance": 2.5939941502901618e-15,
                "verification": {
                  "relation": "expCharge",
                  "inputs": {
                    "current": 2e-09,
                    "tau": 0.0005,
                    "time": 0.001
                  },
                  "displayScale": 1
                }
              },
              "tex": "Q=I_0\\tau(1-e^{-2})",
              "modelAnswer": [
                "Finite window misses a tail.",
                "$Q=I_0\\tau(1-e^{-2})$",
                "$8.6466472\\times10^{-13}\\,\\mathrm{C}$"
              ]
            },
            {
              "title": "Captured fraction",
              "answer": {
                "value": 0.8646647167633873,
                "unit": "",
                "tolerance": 0.002593994150290162,
                "verification": {
                  "relation": "expCharge",
                  "inputs": {
                    "current": 1,
                    "tau": 1,
                    "time": 2
                  },
                  "displayScale": 1
                }
              },
              "tex": "f=1-e^{-2}",
              "modelAnswer": [
                "This is less than one.",
                "$f=1-e^{-2}$",
                "$0.86466472$"
              ]
            },
            {
              "title": "Window-based capacitance",
              "answer": {
                "value": 8.646647167633873e-11,
                "unit": "F",
                "tolerance": 2.593994150290162e-13,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 8.646647167633873e-13,
                    "b": 0.01
                  },
                  "displayScale": 1
                }
              },
              "tex": "C_{window}=Q/\\Delta V",
              "modelAnswer": [
                "The missed charge biases low.",
                "$C_{window}=Q/\\Delta V$",
                "$8.6466472\\times10^{-11}\\,\\mathrm{F}$"
              ]
            },
            {
              "title": "Complete charge",
              "answer": {
                "value": 1e-12,
                "unit": "C",
                "tolerance": 3e-15,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 2e-09,
                    "b": 0.0005
                  },
                  "displayScale": 1
                }
              },
              "tex": "Q_\\infty=I_0\\tau",
              "modelAnswer": [
                "Use the analytic infinite-window limit.",
                "$Q_\\infty=I_0\\tau$",
                "$1\\times10^{-12}\\,\\mathrm{C}$"
              ]
            },
            {
              "title": "Complete capacitance",
              "answer": {
                "value": 1e-10,
                "unit": "F",
                "tolerance": 3.0000000000000003e-13,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1e-12,
                    "b": 0.01
                  },
                  "displayScale": 1
                }
              },
              "tex": "C_\\infty=Q_\\infty/\\Delta V",
              "modelAnswer": [
                "The complete estimate is larger.",
                "$C_\\infty=Q_\\infty/\\Delta V$",
                "$1\\times10^{-10}\\,\\mathrm{F}$"
              ]
            }
          ],
          "hints": [
            {
              "body": "Choose relations for the controlled geometry, gating state and signed current."
            },
            {
              "body": "First convert the stated quantities into the requested units. Evaluate intermediate factors separately before combining them."
            }
          ],
          "modelAnswer": [
            "Integrate the decaying current.",
            "Convert each stated quantity to the requested unit before evaluating.",
            "Finite window misses a tail.",
            "This is less than one.",
            "The missed charge biases low.",
            "Use the analytic infinite-window limit.",
            "The complete estimate is larger."
          ],
          "points": 1,
          "source": "L08 8:1 p19; L01 exponential capacitor charging"
        },
        {
          "id": "L08-a5",
          "difficulty": "medium",
          "type": "written",
          "prompt": "Using the supplied source capacitor-current panel, specify the recording mode, leak subtraction, integration procedure and finite-window/gating contamination risks.",
          "hints": [
            {
              "body": "Identify the physical variable and the recording condition."
            },
            {
              "body": "State a source-grounded causal link, then its assumption or limitation."
            }
          ],
          "markScheme": [
            {
              "text": "Integrate the capacitive component over time."
            },
            {
              "text": "Divide signed charge by the matched signed voltage step."
            },
            {
              "text": "Unresolved gating charge or series-resistance artifacts can bias the estimate."
            },
            {
              "text": "Area estimation assumes constant specific capacitance."
            }
          ],
          "modelAnswer": [
            "Integrate the capacitive component over time.",
            "Divide signed charge by the matched signed voltage step.",
            "Unresolved gating charge or series-resistance artifacts can bias the estimate.",
            "Area estimation assumes constant specific capacitance."
          ],
          "points": 1,
          "source": "L08 8:1 p2–14,19",
          "figure": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:1, PDF page 19. Source capacitance panel with original labels and axes.",
            "fallbackAlt": "8:1, PDF page 19. Source capacitance panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/capacitance.webp', import.meta.url).href,
              "alt": "8:1, PDF page 19. Source capacitance panel with original labels and axes.",
              "aspect": 1.642570281124498,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ]
    },
    {
      "id": "L08-mock-b",
      "title": "Mock B: Sensor-charge inference and myelinated geometry",
      "coverage": "Lectures 1–8 only. Official five-group structure; practice criteria are not official question weights. Calculator and supplied equation sheet available.",
      "questions": [
        {
          "id": "L08-b1",
          "difficulty": "medium",
          "type": "written",
          "prompt": "a) Distinguish gating current from permeation. b) State the inner versus outer diameter convention. c) Contrast Schwann and oligodendrocyte internodes. d) Define an ON gating current.",
          "hints": [
            {
              "body": "Identify the physical variable and the recording condition."
            },
            {
              "body": "State a source-grounded causal link, then its assumption or limitation."
            }
          ],
          "markScheme": [
            {
              "text": "Gating current reflects sensor-charge movement; permeation current is ions passing through the pore."
            },
            {
              "text": "Outer fiber diameter includes myelin; inner axon diameter excludes it."
            },
            {
              "text": "A Schwann cell makes one peripheral internode; an oligodendrocyte can make several central internodes."
            },
            {
              "text": "ON gating current is outward for the taught depolarization-activated sensor."
            }
          ],
          "modelAnswer": [
            "Gating current reflects sensor-charge movement; permeation current is ions passing through the pore.",
            "Outer fiber diameter includes myelin; inner axon diameter excludes it.",
            "A Schwann cell makes one peripheral internode; an oligodendrocyte can make several central internodes.",
            "ON gating current is outward for the taught depolarization-activated sensor."
          ],
          "points": 1,
          "source": "L08 8:1 p15–20; 8:2 p5,8"
        },
        {
          "id": "L08-b2",
          "difficulty": "medium",
          "type": "written",
          "prompt": "Explain the path from a voltage step to sensor charge, channel density and single-channel conductance. Derive normalized two-state probability and state inference assumptions.",
          "hints": [
            {
              "body": "Identify the physical variable and the recording condition."
            },
            {
              "body": "State a source-grounded causal link, then its assumption or limitation."
            }
          ],
          "markScheme": [
            {
              "text": "$y_{out}/y_{in}=r$ and $y_{out}+y_{in}=1$."
            },
            {
              "text": "Thus $y_{out}=r/(1+r)$."
            },
            {
              "text": "Positive effective charge favors activation as inside voltage becomes more positive in this convention."
            },
            {
              "text": "The source defines w as minus the zero-voltage state-energy difference."
            },
            {
              "text": "Charge density and conductance density must share an area convention."
            },
            {
              "text": "Effective charge per channel must be known."
            },
            {
              "text": "Incomplete charge movement or nonmaximal activation biases the inferred density or conductance."
            }
          ],
          "modelAnswer": [
            "$y_{out}/y_{in}=r$ and $y_{out}+y_{in}=1$.",
            "Thus $y_{out}=r/(1+r)$.",
            "Positive effective charge favors activation as inside voltage becomes more positive in this convention.",
            "The source defines w as minus the zero-voltage state-energy difference.",
            "Charge density and conductance density must share an area convention.",
            "Effective charge per channel must be known.",
            "Incomplete charge movement or nonmaximal activation biases the inferred density or conductance."
          ],
          "points": 1,
          "source": "L08 8:1 p15–20; 8:2 p5,8",
          "figure": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:1, PDF page 16. Source energy panel with original labels and axes.",
            "fallbackAlt": "8:1, PDF page 16. Source energy panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/energy.webp', import.meta.url).href,
              "alt": "8:1, PDF page 16. Source energy panel with original labels and axes.",
              "aspect": 1.0874074074074074,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        },
        {
          "id": "L08-b3",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "An ideal population has displaced gating-charge density $0.0032\\,\\mathrm{C/m^2}$. Each channel moves four elementary charges; use $e=1.6\\times10^{-19}\\,\\mathrm C$. Maximal ionic conductance density is $4000\\,\\mathrm{S/m^2}$. Recover charge per channel, density, density per square micrometer, and single-channel conductance. Explain the complete-activation assumption.",
          "stages": [
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "Charge density",
                  "answer": {
                    "value": 0.0032,
                    "unit": "C/m2",
                    "tolerance": 3.2e-09,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 0.0032,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Effective charge number",
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
                },
                {
                  "label": "Elementary charge",
                  "answer": {
                    "value": 1.6e-19,
                    "unit": "C",
                    "tolerance": 1.5999999999999998e-25,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 1.6e-19,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Maximal conductance density",
                  "answer": {
                    "value": 4000,
                    "unit": "S/m2",
                    "tolerance": 0.004,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 4000,
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
              "title": "Charge per channel",
              "answer": {
                "value": 6.4e-19,
                "unit": "C",
                "tolerance": 1.92e-21,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 4,
                    "b": 1.6e-19
                  },
                  "displayScale": 1
                }
              },
              "tex": "q_c=ze",
              "modelAnswer": [
                "Multiply the charge number by elementary charge.",
                "$q_c=ze$",
                "$6.4\\times10^{-19}\\,\\mathrm{C}$"
              ]
            },
            {
              "title": "Channel density",
              "answer": {
                "value": 5000000000000000.0,
                "unit": "1/m2",
                "tolerance": 15000000000000.0,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.0032,
                    "b": 6.4e-19
                  },
                  "displayScale": 1
                }
              },
              "tex": "D=Q_A/q_c",
              "modelAnswer": [
                "Charge counts channels only under full displacement.",
                "$D=Q_A/q_c$",
                "$5\\times10^{15}\\,\\mathrm{1/m2}$"
              ]
            },
            {
              "title": "Density per square micrometer",
              "answer": {
                "value": 5000,
                "unit": "1/um2",
                "tolerance": 15.0,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 5000000000000000.0,
                    "b": 1
                  },
                  "displayScale": 1000000000000.0
                }
              },
              "tex": "D_{\\mu m^2}=D_{m^2}\\times10^{-12}",
              "modelAnswer": [
                "Convert inverse area, not length.",
                "$D_{\\mu m^2}=D_{m^2}\\times10^{-12}$",
                "$5000\\,\\mathrm{1/um2}$"
              ]
            },
            {
              "title": "Single-channel conductance",
              "answer": {
                "value": 8e-13,
                "unit": "S",
                "tolerance": 2.4e-15,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 4000,
                    "b": 5000000000000000.0
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\gamma=\\bar g_A/D",
              "modelAnswer": [
                "Maximal conductance divided by density.",
                "$\\gamma=\\bar g_A/D$",
                "$8\\times10^{-13}\\,\\mathrm{S}$"
              ]
            },
            {
              "title": "Assumption",
              "choices": [
                {
                  "label": "Charge and conductance refer to the same fully activated population"
                },
                {
                  "label": "Charge and conductance may refer to unrelated channel populations"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "Otherwise the ratio does not identify one-channel conductance."
              ]
            }
          ],
          "hints": [
            {
              "body": "Choose relations for the controlled geometry, gating state and signed current."
            },
            {
              "body": "First convert the stated quantities into the requested units. Evaluate intermediate factors separately before combining them."
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating.",
            "Multiply the charge number by elementary charge.",
            "Charge counts channels only under full displacement.",
            "Convert inverse area, not length.",
            "Maximal conductance divided by density.",
            "Otherwise the ratio does not identify one-channel conductance."
          ],
          "points": 1,
          "source": "L08 8:1 p16–20; Exercise8 p3 #3 method"
        },
        {
          "id": "L08-b4",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "For an outer fiber diameter $D=12\\,\\mu\\mathrm m$, apply the supplied approximate geometry and speed fits. Estimate inner diameter, radial myelin thickness, internode length, speed and internode transit time. Compare the fractional speed change for a comparable unmyelinated axon whose diameter doubles.",
          "stages": [
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "Outer diameter",
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
                }
              ],
              "modelAnswer": [
                "Convert each stated quantity to the requested unit before evaluating."
              ]
            },
            {
              "title": "Inner diameter",
              "answer": {
                "value": 8.88e-06,
                "unit": "m",
                "tolerance": 2.664e-08,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 0.74,
                    "b": 1.2e-05
                  },
                  "displayScale": 1
                }
              },
              "tex": "d=0.74D",
              "modelAnswer": [
                "Use outer diameter in this fit.",
                "$d=0.74D$",
                "$8.88\\times10^{-6}\\,\\mathrm{m}$"
              ]
            },
            {
              "title": "Outer minus inner diameter",
              "answer": {
                "value": 3.12e-06,
                "unit": "m",
                "tolerance": 9.36e-09,
                "verification": {
                  "relation": "sum",
                  "inputs": {
                    "a": 1.2e-05,
                    "b": -8.88e-06
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\Delta d=D-d",
              "modelAnswer": [
                "This is twice the radial thickness.",
                "$\\Delta d=D-d$",
                "$3.12\\times10^{-6}\\,\\mathrm{m}$"
              ]
            },
            {
              "title": "Radial thickness",
              "answer": {
                "value": 1.56e-06,
                "unit": "m",
                "tolerance": 4.68e-09,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 3.12e-06,
                    "b": 2
                  },
                  "displayScale": 1
                }
              },
              "tex": "t=(D-d)/2",
              "modelAnswer": [
                "Two sides of the sheath.",
                "$t=(D-d)/2$",
                "$1.56\\times10^{-6}\\,\\mathrm{m}$"
              ]
            },
            {
              "title": "Internode length",
              "answer": {
                "value": 0.001752,
                "unit": "m",
                "tolerance": 5.256e-06,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 146,
                    "b": 1.2e-05
                  },
                  "displayScale": 1
                }
              },
              "tex": "L\\approx146D",
              "modelAnswer": [
                "Convert the empirical fit consistently.",
                "$L\\approx146D$",
                "$0.001752\\,\\mathrm{m}$"
              ]
            },
            {
              "title": "Speed estimate",
              "answer": {
                "value": 72,
                "unit": "m/s",
                "tolerance": 0.216,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 6000000.0,
                    "b": 1.2e-05
                  },
                  "displayScale": 1
                }
              },
              "tex": "v\\approx6\\times10^6D",
              "modelAnswer": [
                "Empirical approximate coefficient.",
                "$v\\approx6\\times10^6D$",
                "$72\\,\\mathrm{m/s}$"
              ]
            },
            {
              "title": "Transit time",
              "answer": {
                "value": 2.4333333333333333e-05,
                "unit": "s",
                "tolerance": 7.3e-08,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.001752,
                    "b": 72
                  },
                  "displayScale": 1
                }
              },
              "tex": "t=L/v",
              "modelAnswer": [
                "Timing estimate, not a nodal delay model.",
                "$t=L/v$",
                "$2.4333333\\times10^{-5}\\,\\mathrm{s}$"
              ]
            },
            {
              "title": "Unmyelinated speed ratio",
              "answer": {
                "value": 1.4142135623730951,
                "unit": "",
                "tolerance": 0.004242640687119286,
                "verification": {
                  "relation": "powerRatio",
                  "inputs": {
                    "a": 2,
                    "b": 1,
                    "power": 0.5
                  },
                  "displayScale": 1
                }
              },
              "tex": "v_2/v_1=\\sqrt2",
              "modelAnswer": [
                "Linear myelinated scaling must not be transferred.",
                "$v_2/v_1=\\sqrt2$",
                "$1.4142136$"
              ]
            }
          ],
          "hints": [
            {
              "body": "Choose relations for the controlled geometry, gating state and signed current."
            },
            {
              "body": "First convert the stated quantities into the requested units. Evaluate intermediate factors separately before combining them."
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating.",
            "Use outer diameter in this fit.",
            "This is twice the radial thickness.",
            "Two sides of the sheath.",
            "Convert the empirical fit consistently.",
            "Empirical approximate coefficient.",
            "Timing estimate, not a nodal delay model.",
            "Linear myelinated scaling must not be transferred."
          ],
          "points": 1,
          "source": "L08 8:2 p3–4,8"
        },
        {
          "id": "L08-b5",
          "difficulty": "medium",
          "type": "written",
          "prompt": "Interpret the supplied gating-current isolation panel. Explain blockers, signed control steps, ON/OFF current and a control for incomplete capacitance subtraction.",
          "hints": [
            {
              "body": "Identify the physical variable and the recording condition."
            },
            {
              "body": "State a source-grounded causal link, then its assumption or limitation."
            }
          ],
          "markScheme": [
            {
              "text": "Source protocol uses sodium-free solution/TTX and internal cesium."
            },
            {
              "text": "Equal signed control steps cancel linear capacitance only under matched conditions."
            },
            {
              "text": "A nonlinear transient is not automatically a clean sensor signal; verify block, leak and subtraction."
            }
          ],
          "modelAnswer": [
            "Source protocol uses sodium-free solution/TTX and internal cesium.",
            "Equal signed control steps cancel linear capacitance only under matched conditions.",
            "A nonlinear transient is not automatically a clean sensor signal; verify block, leak and subtraction."
          ],
          "points": 1,
          "source": "L08 8:1 p15–20; 8:2 p5,8",
          "figure": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:1, PDF page 18. Source gating panel with original labels and axes.",
            "fallbackAlt": "8:1, PDF page 18. Source gating panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/gating.webp', import.meta.url).href,
              "alt": "8:1, PDF page 18. Source gating panel with original labels and axes.",
              "aspect": 2.0232558139534884,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ]
    },
    {
      "id": "L08-mock-c",
      "title": "Mock C: Reversal versus inactivation and insulation audit",
      "coverage": "Lectures 1–8 only. Official five-group structure; practice criteria are not official question weights. Calculator and supplied equation sheet available.",
      "questions": [
        {
          "id": "L08-c1",
          "difficulty": "medium",
          "type": "written",
          "prompt": "a) Where does an AP usually start? b) What regenerates at a node? c) Distinguish transmembrane from axial current. d) Explain why a twitch is an indirect threshold readout.",
          "hints": [
            {
              "body": "Identify the physical variable and the recording condition."
            },
            {
              "body": "State a source-grounded causal link, then its assumption or limitation."
            }
          ],
          "markScheme": [
            {
              "text": "The AP usually starts at the sodium-channel-rich initial segment."
            },
            {
              "text": "Regenerative inward sodium current is concentrated at nodes."
            },
            {
              "text": "Transmembrane current crosses the membrane; axial current flows longitudinally."
            },
            {
              "text": "A twitch also requires nerve conduction and neuromuscular/muscle response, so it is an indirect threshold readout."
            }
          ],
          "modelAnswer": [
            "The AP usually starts at the sodium-channel-rich initial segment.",
            "Regenerative inward sodium current is concentrated at nodes.",
            "Transmembrane current crosses the membrane; axial current flows longitudinally.",
            "A twitch also requires nerve conduction and neuromuscular/muscle response, so it is an indirect threshold readout."
          ],
          "points": 1,
          "source": "L08 8:2 p2,9–18"
        },
        {
          "id": "L08-c2",
          "difficulty": "medium",
          "type": "written",
          "prompt": "Explain saltatory propagation using nodal channel distribution, insulation and three source experiments. Critique literal jumping and describe what the double cable adds.",
          "hints": [
            {
              "body": "Identify the physical variable and the recording condition."
            },
            {
              "body": "State a source-grounded causal link, then its assumption or limitation."
            }
          ],
          "markScheme": [
            {
              "text": "Nodal sodium channels open rapidly and synchronously."
            },
            {
              "text": "Specific potassium subtypes have different localizations."
            },
            {
              "text": "Avoid inferring uniform potassium density from a simplified cartoon."
            },
            {
              "text": "Reduced excitability at neighboring nodes can be bridged over a limited distance."
            },
            {
              "text": "Recorded inward membrane current is strongest at nodes."
            },
            {
              "text": "The exact reported blocking count belongs to the experimental conditions."
            },
            {
              "text": "A single cable omits the separate periaxonal route."
            },
            {
              "text": "Optical transaxonal voltage differs from an extracellular electrode signal."
            },
            {
              "text": "Study-specific waveform differences do not imply absent internodal voltage."
            },
            {
              "text": "Use localized nodal regeneration and continuous internodal voltage."
            },
            {
              "text": "Limited excitation across several nodes provides reliability."
            },
            {
              "text": "Safety margin is conditional on insulation, excitability and spacing."
            }
          ],
          "modelAnswer": [
            "Nodal sodium channels open rapidly and synchronously.",
            "Specific potassium subtypes have different localizations.",
            "Avoid inferring uniform potassium density from a simplified cartoon.",
            "Reduced excitability at neighboring nodes can be bridged over a limited distance.",
            "Recorded inward membrane current is strongest at nodes.",
            "The exact reported blocking count belongs to the experimental conditions.",
            "A single cable omits the separate periaxonal route.",
            "Optical transaxonal voltage differs from an extracellular electrode signal.",
            "Study-specific waveform differences do not imply absent internodal voltage.",
            "Use localized nodal regeneration and continuous internodal voltage.",
            "Limited excitation across several nodes provides reliability.",
            "Safety margin is conditional on insulation, excitability and spacing."
          ],
          "points": 1,
          "source": "L08 8:2 p2,9–18",
          "figure": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:2, PDF page 15. Source voltage current panel with original labels and axes.",
            "fallbackAlt": "8:2, PDF page 15. Source voltage current panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/voltage-current.webp', import.meta.url).href,
              "alt": "8:2, PDF page 15. Source voltage current panel with original labels and axes.",
              "aspect": 1.7869742198100407,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        },
        {
          "id": "L08-c3",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "A new ideal sodium population has $\\bar g=80\\,\\mathrm{nS}$, $m_\\infty=0.7$, $h_\\infty=0.1$ at $V=-10\\,\\mathrm{mV}$. Find current for $E=50\\,\\mathrm{mV}$, then for $E=20\\,\\mathrm{mV}$ at fixed gates. Finally remove inactivation at the original reversal. Compare the mechanisms, not just magnitudes.",
          "stages": [
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "Maximum conductance",
                  "answer": {
                    "value": 8e-08,
                    "unit": "S",
                    "tolerance": 8e-14,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 8e-08,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Activation",
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
                },
                {
                  "label": "Availability",
                  "answer": {
                    "value": 0.1,
                    "unit": "",
                    "tolerance": 1e-07,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 0.1,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Voltage",
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
                }
              ],
              "modelAnswer": [
                "Convert each stated quantity to the requested unit before evaluating."
              ]
            },
            {
              "title": "Cubic activation",
              "answer": {
                "value": 0.3429999999999999,
                "unit": "",
                "tolerance": 0.0010289999999999997,
                "verification": {
                  "relation": "gatePower",
                  "inputs": {
                    "y": 0.7,
                    "count": 3
                  },
                  "displayScale": 1
                }
              },
              "tex": "A=m^3",
              "modelAnswer": [
                "Three independent activation factors.",
                "$A=m^3$",
                "$0.343$"
              ]
            },
            {
              "title": "Open fraction",
              "answer": {
                "value": 0.03429999999999999,
                "unit": "",
                "tolerance": 0.00010289999999999997,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 0.3429999999999999,
                    "b": 0.1
                  },
                  "displayScale": 1
                }
              },
              "tex": "Y=Ah",
              "modelAnswer": [
                "Availability suppresses the fraction.",
                "$Y=Ah$",
                "$0.0343$"
              ]
            },
            {
              "title": "Conductance",
              "answer": {
                "value": 2.7439999999999996e-09,
                "unit": "S",
                "tolerance": 8.232e-12,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 8e-08,
                    "b": 0.03429999999999999
                  },
                  "displayScale": 1
                }
              },
              "tex": "g=\\bar gY",
              "modelAnswer": [
                "Use conductance, not maximum directly.",
                "$g=\\bar gY$",
                "$2.744\\times10^{-9}\\,\\mathrm{S}$"
              ]
            },
            {
              "title": "Original driving force",
              "answer": {
                "value": -0.06,
                "unit": "V",
                "tolerance": 0.00017999999999999998,
                "verification": {
                  "relation": "sum",
                  "inputs": {
                    "a": -0.01,
                    "b": -0.05
                  },
                  "displayScale": 1
                }
              },
              "tex": "D=V-E",
              "modelAnswer": [
                "Outward sign convention.",
                "$D=V-E$",
                "$-0.06\\,\\mathrm{V}$"
              ]
            },
            {
              "title": "Original current",
              "answer": {
                "value": -1.6463999999999996e-10,
                "unit": "A",
                "tolerance": 4.939199999999999e-13,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 2.7439999999999996e-09,
                    "b": -0.06
                  },
                  "displayScale": 1
                }
              },
              "tex": "I=gD",
              "modelAnswer": [
                "Current is inward.",
                "$I=gD$",
                "$-1.6464\\times10^{-10}\\,\\mathrm{A}$"
              ]
            },
            {
              "title": "Shifted driving force",
              "answer": {
                "value": -0.03,
                "unit": "V",
                "tolerance": 8.999999999999999e-05,
                "verification": {
                  "relation": "sum",
                  "inputs": {
                    "a": -0.01,
                    "b": -0.02
                  },
                  "displayScale": 1
                }
              },
              "tex": "D_{new}=V-E_{new}",
              "modelAnswer": [
                "Only driving force changes.",
                "$D_{new}=V-E_{new}$",
                "$-0.03\\,\\mathrm{V}$"
              ]
            },
            {
              "title": "Shifted current",
              "answer": {
                "value": -8.231999999999998e-11,
                "unit": "A",
                "tolerance": 2.4695999999999994e-13,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 2.7439999999999996e-09,
                    "b": -0.03
                  },
                  "displayScale": 1
                }
              },
              "tex": "I_{new}=gD_{new}",
              "modelAnswer": [
                "Reduced inward driving force.",
                "$I_{new}=gD_{new}$",
                "$-8.232\\times10^{-11}\\,\\mathrm{A}$"
              ]
            },
            {
              "title": "No-inactivation conductance",
              "answer": {
                "value": 2.7439999999999993e-08,
                "unit": "S",
                "tolerance": 8.231999999999998e-11,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 8e-08,
                    "b": 0.3429999999999999
                  },
                  "displayScale": 1
                }
              },
              "tex": "g_{h=1}=\\bar gm^3",
              "modelAnswer": [
                "Now availability changes.",
                "$g_{h=1}=\\bar gm^3$",
                "$2.744\\times10^{-8}\\,\\mathrm{S}$"
              ]
            },
            {
              "title": "No-inactivation current",
              "answer": {
                "value": -1.6463999999999996e-09,
                "unit": "A",
                "tolerance": 4.939199999999999e-12,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 2.7439999999999993e-08,
                    "b": -0.06
                  },
                  "displayScale": 1
                }
              },
              "tex": "I_{h=1}=g_{h=1}(V-E)",
              "modelAnswer": [
                "Keep the original reversal for this comparison.",
                "$I_{h=1}=g_{h=1}(V-E)$",
                "$-1.6464\\times10^{-9}\\,\\mathrm{A}$"
              ]
            }
          ],
          "hints": [
            {
              "body": "Choose relations for the controlled geometry, gating state and signed current."
            },
            {
              "body": "First convert the stated quantities into the requested units. Evaluate intermediate factors separately before combining them."
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating.",
            "Three independent activation factors.",
            "Availability suppresses the fraction.",
            "Use conductance, not maximum directly.",
            "Outward sign convention.",
            "Current is inward.",
            "Only driving force changes.",
            "Reduced inward driving force.",
            "Now availability changes.",
            "Keep the original reversal for this comparison."
          ],
          "points": 1,
          "source": "L08 8:1 p3; Exercise8 p1–2 #1 method"
        },
        {
          "id": "L08-c4",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "An ideal one-layer effective membrane has $R=50\\,\\mathrm{M\\Omega}$ and $C=40\\,\\mathrm{pF}$. Replace it by five identical equal-area layers in series while keeping axial properties fixed. Find effective resistance, capacitance, time constant and length-constant ratio. Then find the passive remaining voltage fraction one original length constant away before and after wrapping. Explain why this model does not prove a universal time-constant decrease.",
          "stages": [
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "One-layer resistance",
                  "answer": {
                    "value": 50000000.0,
                    "unit": "ohm",
                    "tolerance": 50.0,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 50000000.0,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "One-layer capacitance",
                  "answer": {
                    "value": 4e-11,
                    "unit": "F",
                    "tolerance": 3.9999999999999997e-17,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 4e-11,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Layers",
                  "answer": {
                    "value": 5,
                    "unit": "",
                    "tolerance": 4.9999999999999996e-06,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 5,
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
              "title": "Effective resistance",
              "answer": {
                "value": 250000000.0,
                "unit": "ohm",
                "tolerance": 750000.0,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 5,
                    "b": 50000000.0
                  },
                  "displayScale": 1
                }
              },
              "tex": "R_5=5R",
              "modelAnswer": [
                "Series resistance adds.",
                "$R_5=5R$",
                "$2.5\\times10^{8}\\,\\mathrm{ohm}$"
              ]
            },
            {
              "title": "Effective capacitance",
              "answer": {
                "value": 8e-12,
                "unit": "F",
                "tolerance": 2.4e-14,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 4e-11,
                    "b": 5
                  },
                  "displayScale": 1
                }
              },
              "tex": "C_5=C/5",
              "modelAnswer": [
                "Series capacitance falls.",
                "$C_5=C/5$",
                "$8\\times10^{-12}\\,\\mathrm{F}$"
              ]
            },
            {
              "title": "Effective time constant",
              "answer": {
                "value": 0.002,
                "unit": "s",
                "tolerance": 6e-06,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 250000000.0,
                    "b": 8e-12
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\tau_5=R_5C_5",
              "modelAnswer": [
                "Ideal series factors cancel.",
                "$\\tau_5=R_5C_5$",
                "$0.002\\,\\mathrm{s}$"
              ]
            },
            {
              "title": "Length-constant ratio",
              "answer": {
                "value": 2.23606797749979,
                "unit": "",
                "tolerance": 0.00670820393249937,
                "verification": {
                  "relation": "powerRatio",
                  "inputs": {
                    "a": 5,
                    "b": 1,
                    "power": 0.5
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\lambda_5/\\lambda_1=\\sqrt5",
              "modelAnswer": [
                "Axial properties fixed.",
                "$\\lambda_5/\\lambda_1=\\sqrt5$",
                "$2.236068$"
              ]
            },
            {
              "title": "Original remaining voltage fraction",
              "answer": {
                "value": 0.36787944117144233,
                "unit": "",
                "tolerance": 0.001103638323514327,
                "verification": {
                  "relation": "cableDecay",
                  "inputs": {
                    "v": 1,
                    "x": 1,
                    "lambda": 1
                  },
                  "displayScale": 1
                }
              },
              "tex": "f_1=e^{-1}",
              "modelAnswer": [
                "Compare the same physical distance.",
                "$f_1=e^{-1}$",
                "$0.36787944$"
              ]
            },
            {
              "title": "Wrapped remaining voltage fraction",
              "answer": {
                "value": 0.6394073191618971,
                "unit": "",
                "tolerance": 0.0019182219574856913,
                "verification": {
                  "relation": "cableDecay",
                  "inputs": {
                    "v": 1,
                    "x": 1,
                    "lambda": 2.23606797749979
                  },
                  "displayScale": 1
                }
              },
              "tex": "f_5=e^{-1/\\sqrt5}",
              "modelAnswer": [
                "Less attenuation despite unchanged time constant.",
                "$f_5=e^{-1/\\sqrt5}$",
                "$0.63940732$"
              ]
            },
            {
              "title": "Conclusion",
              "choices": [
                {
                  "label": "Longer spatial reach without a guaranteed time-constant reduction"
                },
                {
                  "label": "Faster time constant is guaranteed by higher resistance alone"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "Use the product and the separate spatial scale."
              ]
            }
          ],
          "hints": [
            {
              "body": "Choose relations for the controlled geometry, gating state and signed current."
            },
            {
              "body": "First convert the stated quantities into the requested units. Evaluate intermediate factors separately before combining them."
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating.",
            "Series resistance adds.",
            "Series capacitance falls.",
            "Ideal series factors cancel.",
            "Axial properties fixed.",
            "Compare the same physical distance.",
            "Less attenuation despite unchanged time constant.",
            "Use the product and the separate spatial scale."
          ],
          "points": 1,
          "source": "L08 8:2 p6; L03 passive cable decay"
        },
        {
          "id": "L08-c5",
          "difficulty": "medium",
          "type": "written",
          "prompt": "Interpret the supplied spatial extracellular traces. Relate amplitude to nodal sources, distinguish the measured voltage from transmembrane voltage and propose a geometry control.",
          "hints": [
            {
              "body": "Identify the physical variable and the recording condition."
            },
            {
              "body": "State a source-grounded causal link, then its assumption or limitation."
            }
          ],
          "markScheme": [
            {
              "text": "Compare position at matched recording conditions."
            },
            {
              "text": "Large nodal source currents generate the spatial extracellular signal."
            },
            {
              "text": "Amplitude depends on geometry and reference as well as source activity."
            }
          ],
          "modelAnswer": [
            "Compare position at matched recording conditions.",
            "Large nodal source currents generate the spatial extracellular signal.",
            "Amplitude depends on geometry and reference as well as source activity."
          ],
          "points": 1,
          "source": "L08 8:2 p2,9–18",
          "figure": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "8:2, PDF page 14. Source extracellular panel with original labels and axes.",
            "fallbackAlt": "8:2, PDF page 14. Source extracellular panel with original labels and axes.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L08/extracellular.webp', import.meta.url).href,
              "alt": "8:2, PDF page 14. Source extracellular panel with original labels and axes.",
              "aspect": 1.1474285714285715,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ]
    }
  ],
  "recap": {
    "intro": "Revision reference. Source typos and exercise limits are documented in the scope audit.",
    "terms": [
      {
        "term": "Overview: current balance to saltatory conduction",
        "definition": "Space clamp removes spatial voltage gradients."
      },
      {
        "term": "Parallel HH circuit and signed current balance",
        "definition": "$I_i=g_i(V_m-E_i)$."
      },
      {
        "term": "From gate probabilities to the action potential",
        "definition": "Independent all-required particle probabilities multiply."
      },
      {
        "term": "Space clamp, cable coupling and travelling waves",
        "definition": "Space clamp sets $\\partial V_m/\\partial x=0$."
      },
      {
        "term": "Nonpropagating AP: capacitive balance",
        "definition": "$I_C+I_{ion}=0$ after injection ends."
      },
      {
        "term": "Continuous propagation and the refractory wake",
        "definition": "Current spreads passively to nearby membrane."
      },
      {
        "term": "Axial diversion changes the current balance",
        "definition": "Local capacitance is only one destination of inward current."
      },
      {
        "term": "Noble approximation and stable resting voltage",
        "definition": "$m\\approx m_\\infty(V)$ while $n,h$ are momentarily fixed."
      },
      {
        "term": "Threshold instability and a transient peak",
        "definition": "$C\\dot{\\delta V}=-G_{slope}\\delta V$."
      },
      {
        "term": "Threshold and deterministic versus biological variability",
        "definition": "Threshold separates return toward rest from regenerative depolarization."
      },
      {
        "term": "Fast positive and slow negative feedback",
        "definition": "Fast activation reinforces depolarization."
      },
      {
        "term": "Read the AP phases through conductance and driving force",
        "definition": "At rest activation is low, not literally zero in every HH steady state."
      },
      {
        "term": "Slow ramps and accommodation",
        "definition": "Potassium activation increases outward opposition."
      },
      {
        "term": "Paired pulses: absolute and relative refractoriness",
        "definition": "Absolute refractoriness reflects extensive sodium inactivation."
      },
      {
        "term": "Gating charge differs from ionic permeation",
        "definition": "Voltage changes sensor-state energetics."
      },
      {
        "term": "Two-state energies and normalized probability",
        "definition": "$y_{out}/y_{in}=r$ and $y_{out}+y_{in}=1$."
      },
      {
        "term": "Low-activation slope estimates effective gating charge",
        "definition": "The exponential requires small activation and a fixed prefactor."
      },
      {
        "term": "Isolate ON and OFF gating current",
        "definition": "Source protocol uses sodium-free solution/TTX and internal cesium."
      },
      {
        "term": "Measure capacitance from leak-corrected charge",
        "definition": "Integrate the capacitive component over time."
      },
      {
        "term": "Gating charge, channel density and single-channel conductance",
        "definition": "Charge density and conductance density must share an area convention."
      },
      {
        "term": "HH synthesis and limits",
        "definition": "Conductance products determine ionic currents."
      },
      {
        "term": "Initiation at AIS and directions of propagation",
        "definition": "AIS has high sodium-channel density."
      },
      {
        "term": "Unmyelinated conduction and diameter trade-off",
        "definition": "Axial resistance falls as diameter increases."
      },
      {
        "term": "Compare myelinated and unmyelinated scaling",
        "definition": "Myelinated and unmyelinated diameter laws differ."
      },
      {
        "term": "Myelin from Schwann cells and oligodendrocytes",
        "definition": "Compact layers limit transverse current."
      },
      {
        "term": "Electrical insulation: length is not time",
        "definition": "Added layers increase effective thickness and reduce capacitance."
      },
      {
        "term": "Nodes and internodes",
        "definition": "Nodes concentrate regenerative sodium conductance."
      },
      {
        "term": "Geometry and empirical myelinated-fiber fits",
        "definition": "Larger fibers generally have longer internodes and thicker wrapping."
      },
      {
        "term": "Continuous versus saltatory regeneration",
        "definition": "Inward nodal current spreads axially through internodes."
      },
      {
        "term": "Nodal and juxtaparanodal channels",
        "definition": "Nodal sodium channels open rapidly and synchronously."
      },
      {
        "term": "Evidence from anesthetic blocks and nodal currents",
        "definition": "Reduced excitability at neighboring nodes can be bridged over a limited distance."
      },
      {
        "term": "Local stimulation threshold and the twitch proxy",
        "definition": "Control electrode placement and stimulus waveform."
      },
      {
        "term": "Extracellular recordings localize nodal sources",
        "definition": "Compare position at matched recording conditions."
      },
      {
        "term": "Membrane current is more saltatory than voltage",
        "definition": "Nodal inward current is much larger than internodal inward current."
      },
      {
        "term": "Double cable and the periaxonal pathway",
        "definition": "A single cable omits the separate periaxonal route."
      },
      {
        "term": "Critique the literal-jumping description",
        "definition": "Use localized nodal regeneration and continuous internodal voltage."
      },
      {
        "term": "Exercise 8: steady sodium I–V from tabulated gates",
        "definition": "Compute the cubic activation product and multiply by availability."
      },
      {
        "term": "Exercise 8: absolute-voltage potassium graph",
        "definition": "The graph uses absolute membrane voltage."
      },
      {
        "term": "Exercise 8: gating area and single-channel inference",
        "definition": "Convert microampere milliseconds to coulombs."
      }
    ],
    "equations": [
      {
        "name": "Signed ionic current",
        "tex": "I=g(V-E)",
        "note": "Fixed-gating Ohmic component."
      },
      {
        "name": "Sum parallel ionic currents",
        "tex": "I_{ion}=I_{Na}+I_K+I_L",
        "note": "Same total-current units."
      },
      {
        "name": "Potassium conductance product",
        "tex": "g_K=\\bar g_Kn^4",
        "note": "HH potassium fit."
      },
      {
        "name": "Sodium conductance product",
        "tex": "g_{Na}=\\bar g_{Na}m^3h",
        "note": "HH sodium fit."
      },
      {
        "name": "Voltage slope from current balance",
        "tex": "\\dot V=(I_m-I_{ion})/C",
        "note": "Space-clamped, same total-current/total-capacitance convention."
      },
      {
        "name": "Axial source density",
        "tex": "I_m=\\frac{a}{2\\rho_i}\\partial_x^2V",
        "note": "Uniform cylinder, negligible extracellular resistance."
      },
      {
        "name": "Travelling-wave derivative factor",
        "tex": "\\partial_x^2V=v^{-2}\\partial_t^2V",
        "note": "Constant-speed profile only."
      },
      {
        "name": "Local perturbation rate",
        "tex": "k=-G_{slope}/C",
        "note": "Zero applied current; frozen slow variables; linearized near current zero."
      },
      {
        "name": "Gating-charge energy scale",
        "tex": "\\Delta G=zeV",
        "note": "Work convention as stated; state-energy odds use source sign definition."
      },
      {
        "name": "Boltzmann state odds",
        "tex": "r=e^x,\\quad x=(w+zeV)/(kT)",
        "note": "Two states with source energy convention."
      },
      {
        "name": "Normalized two-state probability",
        "tex": "y=\\frac{1}{1+e^{-(b+zV/V_T)}}",
        "note": "Two-state illustration, not the full sodium conductance."
      },
      {
        "name": "Effective charge from an e-fold scale",
        "tex": "z=V_T/s",
        "note": "Low-activation exponential regime; source rounded thermal voltage."
      },
      {
        "name": "Low-activation conductance ratio",
        "tex": "g_2/g_1=e^{\\Delta V/s}",
        "note": "Both voltages remain in the exponential regime."
      },
      {
        "name": "Integrate an ideal exponential transient",
        "tex": "Q(t)=I_0\\tau(1-e^{-t/\\tau})",
        "note": "Explicit ideal exponential, not a fit asserted for the source trace."
      },
      {
        "name": "Capacitance from charge",
        "tex": "C=Q/\\Delta V",
        "note": "Linear capacitance, leak and gating corrections accounted for."
      },
      {
        "name": "Area from specific capacitance",
        "tex": "A=C/c_m",
        "note": "Source specific capacitance treated constant."
      },
      {
        "name": "Current per capacitance",
        "tex": "j_C=I/C",
        "note": "Capacitance is a comparable size proxy."
      },
      {
        "name": "Channel density from gating charge",
        "tex": "D=Q_A/(ze)",
        "note": "Complete known charge displacement per channel."
      },
      {
        "name": "Single-channel conductance",
        "tex": "\\gamma=\\bar g_A/D",
        "note": "Same area basis and fully activated assigned channel population."
      },
      {
        "name": "Unmyelinated speed ratio",
        "tex": "v_2/v_1=\\sqrt{d_2/d_1}",
        "note": "Comparable membrane and axial properties."
      },
      {
        "name": "Empirical myelinated speed",
        "tex": "v\\approx kD",
        "note": "Source empirical coefficient, approximate and condition dependent."
      },
      {
        "name": "Identical insulating resistances in series",
        "tex": "R_N=NR_1",
        "note": "Ideal equal-area identical layers only."
      },
      {
        "name": "Identical capacitances in series",
        "tex": "C_N=C_1/N",
        "note": "Ideal equal-area identical layers only."
      },
      {
        "name": "Capacitance and effective thickness",
        "tex": "C=\\varepsilon A/t_m",
        "note": "Ideal uniform dielectric approximation."
      },
      {
        "name": "Time constant depends on the product",
        "tex": "\\tau=RC",
        "note": "Matched effective lumped properties."
      },
      {
        "name": "Internodal length constant",
        "tex": "\\lambda=\\sqrt{r_m/r_i}",
        "note": "Uniform effective cable; external resistance neglected."
      },
      {
        "name": "Internode length fit",
        "tex": "L\\approx146D",
        "note": "SI form of source millimeter/micrometer fit."
      },
      {
        "name": "Inner-to-outer diameter fit",
        "tex": "d\\approx0.74D",
        "note": "Source approximate fit."
      },
      {
        "name": "Node-to-internode length scale",
        "tex": "l\\approx10^{-3}L",
        "note": "Approximate source geometry, not exact universal morphology."
      }
    ],
    "constants": [
      {
        "name": "Source room-temperature thermal-voltage approximation",
        "tex": "kT/e\\approx25\\,\\mathrm{mV}"
      },
      {
        "name": "Exercise8 rounded elementary charge",
        "tex": "e=1.6\\times10^{-19}\\,\\mathrm C"
      }
    ],
    "conventions": [
      "$V_m=V_{in}-V_{out}$. Outward membrane current is positive.",
      "$I_m=C_m\\dot V+I_{ion}$; after injection ends in space clamp, $I_{ion}=-I_C$.",
      "Use densities with specific capacitance; use total currents with total capacitance.",
      "Space clamp removes spatial variation; voltage clamp additionally controls voltage.",
      "Source empirical L07 rates use rest-relative voltage; Exercise8 graph uses absolute voltage.",
      "Gating current measures sensor charge, not ionic permeation.",
      "Myelinated fits use outer fiber diameter; voltage spreads through internodes continuously.",
      "Source table peaks are sampled-grid maxima; graph readings are approximate."
    ]
  }
};
content.formulaReference=equationSheet;
content.formulaReferenceNote='Official exam PDF p4. These tasks use lectures 1–8 only.';
export default content;
