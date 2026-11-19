// Source audit: docs/scope/nbe-e4120/L04.md
import { equationSheet } from './equation-sheet.js';
const content = {
  "meta": {
    "id": "L04",
    "number": 4,
    "title": "Linear cable theory continued",
    "chapters": [],
    "pages": [],
    "lectureDate": "2026-09-25",
    "examDate": "2026-11-30",
    "examLabel": "Final exam"
  },
  "overview": {
    "estimate": "Core route: read the main sections and answer 20 core questions. Formula explorers, videos, extra practice and mocks are optional.",
    "equations": "Start with $\\lambda=\\sqrt{r_m/r_i}$, $\\tau_m=R_mC_m$, $\\theta=2\\lambda/\\tau_m$, and $V(x)=V_0e^{-|x|/\\lambda}$ for steady spread in an infinite cable.",
    "pitfalls": "Use voltage relative to rest. A sealed tip has zero distal axial current, and a shorted tip has zero distal voltage increment."
  },
  "objectives": [
    "Use length and time constants to predict passive spread.",
    "Choose the steady profile from the geometry and terminal load.",
    "Explain how dendrites combine inputs across space and time.",
    "Use electrotonic length to assess voltage uniformity."
  ],
  "prerequisites": [
    {
      "text": "Circuit signs, current injection and exponential relaxation",
      "lectureId": "L01",
      "sectionId": "signs"
    },
    {
      "text": "Core conductor geometry and cable equation",
      "lectureId": "L03",
      "sectionId": "equation"
    }
  ],
  "segmentedPractice": true,
  "standardPractice": "mc-only",
  "collapseFormulaExplorers": true,
  "sections": [
    {
      "id": "overview",
      "title": "Passive voltage spread",
      "keyTerms": [
        "passive"
      ],
      "source": "L04 PDF 1",
      "blocks": [
        {
          "type": "text",
          "body": [
            "Use the signed voltage increment $V=V_m-V_{\\rm rest}$. Passive spread attenuates and broadens because current charges the membrane and leaks across it. The linear model uses constant cable parameters."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 4, PDF page 2 (printed slide 3). Passive response travels along a neuronal branch, becoming smaller and broader.",
            "fallbackAlt": "Passive response travels along a neuronal branch, becoming smaller and broader.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L04/wave.webp', import.meta.url).href,
              "alt": "Passive response travels along a neuronal branch, becoming smaller and broader.",
              "aspect": 4.530612244897959,
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
          "id": "L04-overview-check",
          "prompt": "What is studied by linear passive cable theory?",
          "correct": 0,
          "options": [
            {
              "text": "Spread with constant membrane parameters",
              "feedback": "Constant membrane parameters allow a linear relation between supplied current and response."
            },
            {
              "text": "Spread with changing membrane parameters",
              "feedback": "Changing membrane parameters can make the response nonlinear."
            }
          ],
          "hints": [
            {
              "body": "Separate passive transfer from spike regeneration."
            },
            {
              "body": "Ask whether the model changes membrane parameters as voltage changes."
            }
          ],
          "modelAnswer": [
            "Spread with constant membrane parameters."
          ]
        },
        {
          "id": "L04-overview-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L04 PDF 1–2",
          "prompt": "Which signal does the passive cable model describe?",
          "options": [
            {
              "text": "A graded voltage response",
              "feedback": "Passive cable theory describes graded changes that spread and attenuate."
            },
            {
              "text": "A regenerated spike train",
              "feedback": "Regenerated spikes require active membrane mechanisms."
            },
            {
              "text": "A voltage-clamped command",
              "feedback": "A clamp command is an imposed stimulus, not the resulting passive response."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Recall the distinction in this section: overview: speed, boundaries and integration."
            },
            {
              "body": "Use the stated passive-cable assumptions and identify the requested quantity or recording site."
            }
          ],
          "modelAnswer": [
            "Passive cable theory describes graded changes that spread and attenuate."
          ]
        }
      ]
    },
    {
      "id": "speed",
      "title": "Characteristic passive speed",
      "keyTerms": [
        "characteristic speed"
      ],
      "source": "L04 PDF 2",
      "blocks": [
        {
          "type": "math",
          "items": [
            {
              "tex": "\\theta=2\\lambda/\\tau_m"
            }
          ],
          "note": "The half-rise criterion compares voltage at each site with its own steady value. Larger $\\lambda$ increases spread and smaller $\\tau_m$ speeds charging. This scale describes passive spread."
        },
        {
          "type": "detail",
          "title": "Half-rise contour",
          "blocks": [
            {
              "type": "text",
              "body": [
                "The taught approximation is $x(t)=\\theta t-\\lambda/2$. Passive diffusion has no sharp front. Use the contour in its stated regime and avoid extrapolating to time zero."
              ]
            }
          ]
        }
      ],
      "formulas": [
        {
          "id": "L04-f-speed",
          "name": "Characteristic passive velocity",
          "tex": "\\theta=\\frac{2\\lambda}{\\tau_m}",
          "symbols": [
            {
              "tex": "\\theta",
              "name": "Characteristic velocity",
              "unit": "m/s",
              "meaning": "Characteristic velocity in the stated model."
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
          "reads": "More spatial reach and faster relaxation raise the characteristic speed.",
          "assumes": "Uniform infinite passive cable; taught half-rise-contour approximation.",
          "variants": [],
          "drill": {
            "prompt": "Use $\\lambda=0.0012\\,\\text{m}$ and $\\tau_m=0.024\\,\\text{s}$. Find $\\theta$.",
            "answer": {
              "value": 0.1,
              "unit": "m/s",
              "tolerance": 0.00030000000000000003,
              "verification": {
                "relation": "passiveSpeed",
                "inputs": {
                  "lambda": 0.0012,
                  "tau": 0.024
                },
                "displayScale": 1
              }
            },
            "tex": "\\theta=2(0.0012\\,\\text{m})/(0.024\\,\\text{s})",
            "modelAnswer": [
              "More spatial reach and faster relaxation raise the characteristic speed.",
              "$0.10000000\\,\\mathrm{m/s}$"
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\theta=\\frac{2\\lambda}{\\tau_m}$."
              },
              {
                "body": "Start with $\\theta=2(0.0012\\,\\text{m})/(0.024\\,\\text{s})$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{\\theta}=\\frac{2\\htmlClass{formula-term-1}{\\lambda}}{\\htmlClass{formula-term-2}{\\tau_m}}"
        },
        {
          "id": "L04-f-position",
          "name": "Taught half-rise contour",
          "tex": "x(t)=\\frac{2\\lambda t}{\\tau_m}-\\frac{\\lambda}{2}",
          "symbols": [
            {
              "tex": "x(t)",
              "name": "Contour position",
              "unit": "m",
              "meaning": "Contour position in the stated model."
            },
            {
              "tex": "\\lambda",
              "name": "Length constant",
              "unit": "m",
              "meaning": "Length constant in the stated model."
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
          "reads": "The characteristic contour advances approximately linearly with time.",
          "assumes": "Use only in the taught contour regime; do not extrapolate a negative front at time zero.",
          "variants": [],
          "drill": {
            "prompt": "Use $\\lambda=0.001\\,\\text{m}$, $\\tau_m=0.02\\,\\text{s}$ and $t=0.03\\,\\text{s}$. Evaluate the taught contour position.",
            "answer": {
              "value": 0.0025,
              "unit": "m",
              "tolerance": 0.0000075,
              "verification": {
                "relation": "passivePosition",
                "inputs": {
                  "lambda": 0.001,
                  "tau": 0.02,
                  "time": 0.03
                },
                "displayScale": 1
              }
            },
            "tex": "x=2(0.001\\,\\text{m})(0.03\\,\\text{s})/(0.02\\,\\text{s})-0.001\\,\\text{m}/2",
            "modelAnswer": [
              "The characteristic contour advances approximately linearly with time.",
              "$0.0025000000\\,\\mathrm{m}$"
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $x(t)=\\frac{2\\lambda t}{\\tau_m}-\\frac{\\lambda}{2}$."
              },
              {
                "body": "Start with $x=2(0.001\\,\\text{m})(0.03\\,\\text{s})/(0.02\\,\\text{s})-0.001\\,\\text{m}/2$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{x(t)}=\\frac{2\\htmlClass{formula-term-1}{\\lambda} \\htmlClass{formula-term-2}{t}}{\\htmlClass{formula-term-3}{\\tau_m}}-\\frac{\\htmlClass{formula-term-1}{\\lambda}}{2}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L04-speed-check",
          "practice": "extra",
          "prompt": "Which timescale enters the passive speed relation?",
          "correct": 1,
          "options": [
            {
              "text": "The injected pulse repetition interval",
              "feedback": "The repetition interval describes the stimulus; membrane charging sets the model timescale."
            },
            {
              "text": "The membrane resistance-capacitance time",
              "feedback": "Membrane resistance times capacitance sets the local charging time."
            }
          ],
          "hints": [
            {
              "body": "Identify the temporal scale in the half-rise relation."
            },
            {
              "body": "Keep the spatial scale fixed and inspect the denominator of the speed relation."
            }
          ],
          "modelAnswer": [
            "The membrane resistance-capacitance time."
          ]
        },
        {
          "id": "L04-speed-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L04 PDF 2",
          "prompt": "What does the taught passive-wave contour track?",
          "options": [
            {
              "text": "Onset of the local active response",
              "feedback": "The contour concerns passive charging, not spike initiation."
            },
            {
              "text": "Half of the local steady response",
              "feedback": "Each position is compared with half of its own eventual steady response."
            },
            {
              "text": "Peak of the local injected pulse",
              "feedback": "The criterion uses steady voltage, not the peak of the stimulus pulse."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Recall the distinction in this section: a characteristic passive-wave velocity."
            },
            {
              "body": "Use the stated passive-cable assumptions and identify the requested quantity or recording site."
            }
          ],
          "modelAnswer": [
            "Each position is compared with half of its own eventual steady response."
          ]
        }
      ]
    },
    {
      "id": "scaling",
      "title": "Diameter, spread and charging",
      "keyTerms": [
        "radius",
        "diameter"
      ],
      "source": "L04 PDF 3",
      "blocks": [
        {
          "type": "math",
          "items": [
            {
              "tex": "\\lambda=\\sqrt{\\frac{R_m a}{2R_i}},\\qquad \\tau_m=R_m C_m"
            }
          ],
          "note": "For a uniform cylinder with negligible extracellular resistance, use radius $a=d/2$, specific membrane resistance $R_m$, specific capacitance $C_m$ and axial resistivity $R_i$. At fixed material properties, quadrupling diameter doubles $\\lambda$ and $\\theta$, while $\\tau_m$ is unchanged."
        },
        {
          "type": "detail",
          "title": "Comparing waveforms at two sites",
          "blocks": [
            {
              "type": "figure",
              "visual": {
                "type": "widget",
                "name": "image-hotspots",
                "caption": "Lecture 4, PDF page 3 (printed slide 4). Two recording positions along the same cable have different response amplitudes and widths.",
                "fallbackAlt": "Two recording positions along the same cable have different response amplitudes and widths.",
                "props": {
                  "src": new URL('../../assets/figures/nbe-e4120/L04/speed.webp', import.meta.url).href,
                  "alt": "Two recording positions along the same cable have different response amplitudes and widths.",
                  "aspect": 1.7556270096463023,
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
          "id": "L04-f-length",
          "name": "Length constant from material parameters",
          "tex": "\\lambda=\\sqrt{\\frac{R_m a}{2R_i}}",
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
              "tex": "a",
              "name": "Radius",
              "unit": "m",
              "meaning": "Radius in the stated model."
            },
            {
              "tex": "R_i",
              "name": "Axial resistivity",
              "unit": "ohm*m",
              "meaning": "Axial resistivity in the stated model."
            }
          ],
          "reads": "Increasing radius raises spatial spread at fixed material parameters.",
          "assumes": "Uniform cylinder, negligible external resistance.",
          "variants": [],
          "drill": {
            "prompt": "Use $R_m=2\\,\\Omega\\,\\text{m}^2$, $a=10^{-6}\\,\\text{m}$ and $R_i=1\\,\\Omega\\,\\text{m}$. Find $\\lambda$.",
            "answer": {
              "value": 0.001,
              "unit": "m",
              "tolerance": 0.000003,
              "verification": {
                "relation": "cableLength",
                "inputs": {
                  "rm": 318309.8861837907,
                  "ri": 318309886183.7907
                },
                "displayScale": 1
              }
            },
            "tex": "\\lambda=\\sqrt{(2\\,\\Omega\\,\\text{m}^2)(10^{-6}\\,\\text{m})/(2\\,\\Omega\\,\\text{m})}",
            "modelAnswer": [
              "Increasing radius raises spatial spread at fixed material parameters.",
              "$0.0010000000\\,\\mathrm{m}$"
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\lambda=\\sqrt{\\frac{R_m a}{2R_i}}$."
              },
              {
                "body": "Start with $\\lambda=\\sqrt{(2\\,\\Omega\\,\\text{m}^2)(10^{-6}\\,\\text{m})/(2\\,\\Omega\\,\\text{m})}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{\\lambda}=\\sqrt{\\frac{\\htmlClass{formula-term-1}{R_m} \\htmlClass{formula-term-2}{a}}{2\\htmlClass{formula-term-3}{R_i}}}"
        },
        {
          "id": "L04-f-tau",
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
          "reads": "The local time product cancels cylinder geometry.",
          "assumes": "Uniform passive membrane with consistent area normalization.",
          "variants": [],
          "drill": {
            "prompt": "Use $R_m=1.8\\,\\Omega\\,\\text{m}^2$ and $C_m=0.01\\,\\text{F/m}^2$. Find $\\tau_m$.",
            "answer": {
              "value": 0.018,
              "unit": "s",
              "tolerance": 0.000054,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 1.8,
                  "b": 0.01
                },
                "displayScale": 1
              }
            },
            "tex": "\\tau_m=(1.8\\,\\Omega\\,\\text{m}^2)(0.01\\,\\text{F/m}^2)",
            "modelAnswer": [
              "The local time product cancels cylinder geometry.",
              "$0.018000000\\,\\mathrm{s}$"
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\tau_m=R_mC_m$."
              },
              {
                "body": "Start with $\\tau_m=(1.8\\,\\Omega\\,\\text{m}^2)(0.01\\,\\text{F/m}^2)$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{\\tau_m}=\\htmlClass{formula-term-1}{R_m}\\htmlClass{formula-term-2}{C_m}"
        },
        {
          "id": "L04-f-size-ratio",
          "name": "Passive speed ratio",
          "tex": "\\frac{\\theta_B}{\\theta_A}=\\sqrt{\\frac{d_B}{d_A}}",
          "symbols": [
            {
              "tex": "\\theta_B",
              "name": "B speed",
              "unit": "m/s",
              "meaning": "B speed in the stated model."
            },
            {
              "tex": "\\theta_A",
              "name": "A speed",
              "unit": "m/s",
              "meaning": "A speed in the stated model."
            },
            {
              "tex": "d_B",
              "name": "B diameter",
              "unit": "m",
              "meaning": "B diameter in the stated model."
            },
            {
              "tex": "d_A",
              "name": "A diameter",
              "unit": "m",
              "meaning": "A diameter in the stated model."
            }
          ],
          "reads": "Speed scales with square root of diameter, not diameter itself.",
          "assumes": "Only diameter differs; same passive material parameters.",
          "variants": [],
          "drill": {
            "prompt": "Cables B and A have diameter ratio $9$. Find the passive speed ratio.",
            "answer": {
              "value": 3,
              "unit": "",
              "tolerance": 0.009000000000000001,
              "verification": {
                "relation": "powerRatio",
                "inputs": {
                  "a": 9,
                  "b": 1,
                  "power": 0.5
                },
                "displayScale": 1
              }
            },
            "tex": "\\theta_B/\\theta_A=\\sqrt{9}",
            "modelAnswer": [
              "Speed scales with square root of diameter, not diameter itself.",
              "$3.0000000$"
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\frac{\\theta_B}{\\theta_A}=\\sqrt{\\frac{d_B}{d_A}}$."
              },
              {
                "body": "Start with $\\theta_B/\\theta_A=\\sqrt{9}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\frac{\\htmlClass{formula-term-0}{\\theta_B}}{\\htmlClass{formula-term-1}{\\theta_A}}=\\sqrt{\\frac{\\htmlClass{formula-term-2}{d_B}}{\\htmlClass{formula-term-3}{d_A}}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L04-scaling-check",
          "prompt": "What stays unchanged when only cable diameter changes?",
          "correct": 0,
          "options": [
            {
              "text": "The local membrane time constant",
              "feedback": "The time constant is the product of fixed specific resistance and capacitance."
            },
            {
              "text": "The passive spatial length constant",
              "feedback": "The length constant includes radius, so a diameter change alters spatial reach."
            }
          ],
          "hints": [
            {
              "body": "Hold specific resistance and capacitance fixed."
            },
            {
              "body": "Their product has no radius term, while the spatial scale does."
            }
          ],
          "modelAnswer": [
            "The local membrane time constant."
          ]
        },
        {
          "id": "L04-scaling-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L04 PDF 3; Exercise 4 problem 2",
          "prompt": "At fixed material properties, how does length constant scale with radius?",
          "options": [
            {
              "text": "As the first power of radius",
              "feedback": "Linear radius scaling overestimates the gain in spatial reach."
            },
            {
              "text": "As the three-halves power of radius",
              "feedback": "The three-halves power belongs to the inverse input-resistance scaling."
            },
            {
              "text": "As the square root of radius",
              "feedback": "The cable length relation places radius inside a square root."
            }
          ],
          "correct": 2,
          "hints": [
            {
              "body": "Recall the distinction in this section: geometry changes spread and input resistance."
            },
            {
              "body": "Use the stated passive-cable assumptions and identify the requested quantity or recording site."
            }
          ],
          "modelAnswer": [
            "The cable length relation places radius inside a square root."
          ]
        }
      ]
    },
    {
      "id": "boundaries",
      "title": "Choose geometry and stimulus",
      "keyTerms": [
        "steady",
        "transient"
      ],
      "source": "L04 PDF 4",
      "blocks": [
        {
          "type": "text",
          "body": [
            "First locate the drive. Central injection into an infinite cable feeds two arms. End injection into a semi-infinite cable feeds one. A finite cable also needs a distal boundary condition.",
            "Then choose a time regime. Use steady profiles after a constant drive settles. A pulse or time-varying synaptic input calls for the transient cable equation. A current source sets current, a voltage clamp sets voltage, and a conductance change alters the local current–voltage relation."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 4, PDF page 4 (printed slide 5). Cylinder length and terminal resistance specify the cable boundary problem.",
            "fallbackAlt": "Cylinder length and terminal resistance specify the cable boundary problem.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L04/boundaries.webp', import.meta.url).href,
              "alt": "Cylinder length and terminal resistance specify the cable boundary problem.",
              "aspect": 1.7251585623678647,
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
          "id": "L04-boundaries-check",
          "prompt": "What selects among possible cable solutions?",
          "correct": 1,
          "options": [
            {
              "text": "Geometry alone without endpoint constraints",
              "feedback": "The same geometry admits different profiles under different loads and stimuli."
            },
            {
              "text": "Geometry, stimulus and endpoint constraints",
              "feedback": "Geometry, the controlled stimulus and endpoint constraints together select the physical solution."
            }
          ],
          "hints": [
            {
              "body": "A differential equation can have several physical solutions."
            },
            {
              "body": "The end of the process and what is controlled there constrain the solution."
            }
          ],
          "modelAnswer": [
            "Geometry, stimulus and endpoint constraints."
          ]
        },
        {
          "id": "L04-boundaries-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L04 PDF 4",
          "prompt": "Which stimulus calls for a transient rather than a steady solution?",
          "options": [
            {
              "text": "A brief pulse of supplied current",
              "feedback": "A brief pulse makes the voltage depend on time as well as position."
            },
            {
              "text": "A sustained input after settling",
              "feedback": "After settling, a sustained input can have a time-independent profile."
            },
            {
              "text": "A constant endpoint after settling",
              "feedback": "A constant imposed endpoint can be treated by the steady boundary solution after settling."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Recall the distinction in this section: choose the geometry and stimulus first."
            },
            {
              "body": "Use the stated passive-cable assumptions and identify the requested quantity or recording site."
            }
          ],
          "modelAnswer": [
            "A brief pulse makes the voltage depend on time as well as position."
          ]
        }
      ]
    },
    {
      "id": "coordinates",
      "title": "Normalize distance and time",
      "keyTerms": [
        "endpoint"
      ],
      "source": "L04 PDF 5",
      "blocks": [
        {
          "type": "math",
          "items": [
            {
              "tex": "X=x/\\lambda,\\qquad L=\\ell/\\lambda,\\qquad T=t/\\tau_m"
            }
          ],
          "note": "$x$ is position, $\\ell$ is total cable length and $t$ is elapsed time. All three ratios are dimensionless. At the distal end $X=L$. The normalized source-free equation is $\\partial_X^2 V=\\partial_T V+V$."
        },
        {
          "type": "detail",
          "title": "Slide normalization",
          "blocks": [
            {
              "type": "figure",
              "visual": {
                "type": "widget",
                "name": "image-hotspots",
                "caption": "Lecture 4, PDF page 5 (printed slide 6). The dimensional cable equation is rewritten with electrotonic distance and time.",
                "fallbackAlt": "The dimensional cable equation is rewritten with electrotonic distance and time.",
                "props": {
                  "src": new URL('../../assets/figures/nbe-e4120/L04/normalized.webp', import.meta.url).href,
                  "alt": "The dimensional cable equation is rewritten with electrotonic distance and time.",
                  "aspect": 1.3026315789473684,
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
          "id": "L04-f-distance",
          "name": "Electrotonic distance",
          "tex": "X=\\frac{x}{\\lambda}",
          "symbols": [
            {
              "tex": "X",
              "name": "Electrotonic distance",
              "unit": "",
              "meaning": "Electrotonic distance in the stated model."
            },
            {
              "tex": "x",
              "name": "Dimensional numerator",
              "unit": "m",
              "meaning": "Dimensional numerator in the stated model."
            },
            {
              "tex": "\\lambda",
              "name": "Characteristic scale",
              "unit": "m",
              "meaning": "Characteristic scale in the stated model."
            }
          ],
          "reads": "Normalization compares a dimensional quantity with its characteristic scale.",
          "assumes": "Use consistent units and the correct spatial or temporal scale.",
          "variants": [],
          "drill": {
            "prompt": "Use $x=0.0009\\,\\text{m}$ and $\\lambda=0.0006\\,\\text{m}$. Find $X$.",
            "answer": {
              "value": 1.5,
              "unit": "",
              "tolerance": 0.0045000000000000005,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 0.0009,
                  "b": 0.0006
                },
                "displayScale": 1
              }
            },
            "tex": "X=(0.0009\\,\\text{m})/(0.0006\\,\\text{m})",
            "modelAnswer": [
              "Normalization compares a dimensional quantity with its characteristic scale.",
              "$1.5000000$"
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $X=\\frac{x}{\\lambda}$."
              },
              {
                "body": "Start with $X=(0.0009\\,\\text{m})/(0.0006\\,\\text{m})$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{X}=\\frac{\\htmlClass{formula-term-1}{x}}{\\htmlClass{formula-term-2}{\\lambda}}"
        },
        {
          "id": "L04-f-total-length",
          "name": "Electrotonic cable length",
          "tex": "L=\\frac{\\ell}{\\lambda}",
          "symbols": [
            {
              "tex": "L",
              "name": "Electrotonic cable length",
              "unit": "",
              "meaning": "Electrotonic cable length in the stated model."
            },
            {
              "tex": "\\ell",
              "name": "Dimensional numerator",
              "unit": "m",
              "meaning": "Dimensional numerator in the stated model."
            },
            {
              "tex": "\\lambda",
              "name": "Characteristic scale",
              "unit": "m",
              "meaning": "Characteristic scale in the stated model."
            }
          ],
          "reads": "Normalization compares a dimensional quantity with its characteristic scale.",
          "assumes": "Use consistent units and the correct spatial or temporal scale.",
          "variants": [],
          "drill": {
            "prompt": "Use $\\ell=0.0012\\,\\text{m}$ and $\\lambda=0.0004\\,\\text{m}$. Find $L$.",
            "answer": {
              "value": 3,
              "unit": "",
              "tolerance": 0.009000000000000001,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 0.0012,
                  "b": 0.0004
                },
                "displayScale": 1
              }
            },
            "tex": "L=(0.0012\\,\\text{m})/(0.0004\\,\\text{m})",
            "modelAnswer": [
              "Normalization compares a dimensional quantity with its characteristic scale.",
              "$3.0000000$"
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $L=\\frac{\\ell}{\\lambda}$."
              },
              {
                "body": "Start with $L=(0.0012\\,\\text{m})/(0.0004\\,\\text{m})$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{L}=\\frac{\\htmlClass{formula-term-1}{\\ell}}{\\htmlClass{formula-term-2}{\\lambda}}"
        },
        {
          "id": "L04-f-time",
          "name": "Electrotonic time",
          "tex": "T=\\frac{t}{\\tau_m}",
          "symbols": [
            {
              "tex": "T",
              "name": "Electrotonic time",
              "unit": "",
              "meaning": "Electrotonic time in the stated model."
            },
            {
              "tex": "t",
              "name": "Dimensional numerator",
              "unit": "s",
              "meaning": "Dimensional numerator in the stated model."
            },
            {
              "tex": "\\tau_m",
              "name": "Characteristic scale",
              "unit": "s",
              "meaning": "Characteristic scale in the stated model."
            }
          ],
          "reads": "Normalization compares a dimensional quantity with its characteristic scale.",
          "assumes": "Use consistent units and the correct spatial or temporal scale.",
          "variants": [],
          "drill": {
            "prompt": "Use $t=0.03\\,\\text{s}$ and $\\tau_m=0.012\\,\\text{s}$. Find $T$.",
            "answer": {
              "value": 2.5,
              "unit": "",
              "tolerance": 0.0075,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 0.03,
                  "b": 0.012
                },
                "displayScale": 1
              }
            },
            "tex": "T=(0.03\\,\\text{s})/(0.012\\,\\text{s})",
            "modelAnswer": [
              "Normalization compares a dimensional quantity with its characteristic scale.",
              "$2.5000000$"
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $T=\\frac{t}{\\tau_m}$."
              },
              {
                "body": "Start with $T=(0.03\\,\\text{s})/(0.012\\,\\text{s})$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{T}=\\frac{\\htmlClass{formula-term-1}{t}}{\\htmlClass{formula-term-2}{\\tau_m}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L04-coordinates-check",
          "prompt": "Which quantity describes the whole cable rather than a recording position?",
          "correct": 0,
          "options": [
            {
              "text": "Physical length divided by length constant",
              "feedback": "Total physical length divided by length constant defines the whole cable’s electrotonic length."
            },
            {
              "text": "Recording position divided by length constant",
              "feedback": "Recording position divided by length constant defines a site, not the whole segment."
            }
          ],
          "hints": [
            {
              "body": "Distinguish a location from the endpoint of the entire process."
            },
            {
              "body": "Use total physical length for the cable-wide measure."
            }
          ],
          "modelAnswer": [
            "Physical length divided by length constant."
          ]
        },
        {
          "id": "L04-coordinates-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L04 PDF 5",
          "prompt": "Which scale is used to normalize elapsed time?",
          "options": [
            {
              "text": "The stimulus pulse duration",
              "feedback": "Pulse duration describes the stimulus rather than the cable normalization scale."
            },
            {
              "text": "The membrane time constant",
              "feedback": "Electrotonic time divides elapsed time by the membrane time constant."
            },
            {
              "text": "The input repetition interval",
              "feedback": "Repetition interval describes the input train rather than membrane charging."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Recall the distinction in this section: normalize position, total length and time."
            },
            {
              "body": "Use the stated passive-cable assumptions and identify the requested quantity or recording site."
            }
          ],
          "modelAnswer": [
            "Electrotonic time divides elapsed time by the membrane time constant."
          ]
        }
      ]
    },
    {
      "id": "infinite",
      "title": "Infinite cable profile",
      "keyTerms": [
        "symmetric"
      ],
      "source": "L04 PDF 6",
      "blocks": [
        {
          "type": "math",
          "items": [
            {
              "tex": "V(x)=V_0 e^{-|x|/\\lambda},\\qquad V_0=I_0r_i\\lambda/2"
            }
          ],
          "note": "For a steady point current $I_0$ at the center of a uniform infinite cable, $r_i$ is axial resistance per length. Equal distances on opposite sides give equal signed increments. One length constant leaves about 37% of the origin increment."
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 4, PDF page 6 (printed slide 7). A central source gives a symmetric steady exponential profile on both sides.",
            "fallbackAlt": "A central source gives a symmetric steady exponential profile on both sides.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L04/infinite.webp', import.meta.url).href,
              "alt": "A central source gives a symmetric steady exponential profile on both sides.",
              "aspect": 2.180894308943089,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L04-f-source-voltage",
          "name": "Infinite-cable source and attenuation",
          "tex": "V(x)=\\frac{I_0r_i\\lambda}{2}e^{-|x|/\\lambda}",
          "symbols": [
            {
              "tex": "V(x)",
              "name": "Rest-relative voltage",
              "unit": "V",
              "meaning": "Rest-relative voltage in the stated model."
            },
            {
              "tex": "I_0",
              "name": "Supplied current",
              "unit": "A",
              "meaning": "Supplied current in the stated model."
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
            },
            {
              "tex": "x",
              "name": "Signed position",
              "unit": "m",
              "meaning": "Signed position in the stated model."
            }
          ],
          "reads": "The same injected current supports two symmetric arms.",
          "assumes": "Infinite uniform cable, central current source, steady state.",
          "variants": [],
          "drill": {
            "prompt": "Use $I_0=10^{-10}\\,\\text{A}$, $r_i=2\\times10^{11}\\,\\Omega/\\text{m}$, $\\lambda=0.0005\\,\\text{m}$ and $x=-0.0005\\,\\text{m}$. Find the increment.",
            "answer": {
              "value": 0.0018393972058572117,
              "unit": "V",
              "tolerance": 0.000005518191617571635,
              "verification": {
                "relation": "infiniteCable",
                "inputs": {
                  "current": 1e-10,
                  "ri": 200000000000,
                  "lambda": 0.0005,
                  "x": -0.0005
                }
              }
            },
            "tex": "V=(I_0r_i\\lambda/2)e^{-1}",
            "modelAnswer": [
              "The same injected current supports two symmetric arms.",
              "$0.0018393972\\,\\mathrm{V}$"
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $V(x)=\\frac{I_0r_i\\lambda}{2}e^{-|x|/\\lambda}$."
              },
              {
                "body": "Start with $V=(I_0r_i\\lambda/2)e^{-1}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{V(x)}=\\frac{\\htmlClass{formula-term-1}{I_0}\\htmlClass{formula-term-2}{r_i}\\htmlClass{formula-term-3}{\\lambda}}{2}e^{-|\\htmlClass{formula-term-4}{x}|/\\htmlClass{formula-term-3}{\\lambda}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L04-infinite-check",
          "prompt": "How should steady voltage depend on signed distance from a central source?",
          "correct": 1,
          "options": [
            {
              "text": "It grows exponentially on the negative side",
              "feedback": "Using signed distance without its absolute value falsely creates growth on one side."
            },
            {
              "text": "It decays symmetrically on the two sides",
              "feedback": "Identical cable arms give equal attenuation at equal distances on either side."
            }
          ],
          "hints": [
            {
              "body": "Compare two sites the same distance from the source."
            },
            {
              "body": "The source sends current down identical arms; coordinate sign does not invert voltage."
            }
          ],
          "modelAnswer": [
            "It decays symmetrically on the two sides."
          ]
        },
        {
          "id": "L04-infinite-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L04 PDF 6",
          "prompt": "What happens to the steady increment far from a localized source in an infinite cable?",
          "options": [
            {
              "text": "It approaches the source increment",
              "feedback": "Membrane leakage attenuates the response rather than preserving the source value."
            },
            {
              "text": "It approaches the opposite increment",
              "feedback": "Coordinate direction does not reverse the voltage sign."
            },
            {
              "text": "It approaches the resting baseline",
              "feedback": "The rest-relative increment tends to zero at large distance."
            }
          ],
          "correct": 2,
          "hints": [
            {
              "body": "Recall the distinction in this section: steady response to localized injection."
            },
            {
              "body": "Use the stated passive-cable assumptions and identify the requested quantity or recording site."
            }
          ],
          "modelAnswer": [
            "The rest-relative increment tends to zero at large distance."
          ]
        }
      ]
    },
    {
      "id": "input",
      "title": "One arm versus two",
      "keyTerms": [
        "Input resistance"
      ],
      "source": "L04 PDF 7",
      "blocks": [
        {
          "type": "math",
          "items": [
            {
              "tex": "R_{\\rm semi}=r_i\\lambda,\\qquad R_{\\rm inf}=r_i\\lambda/2"
            }
          ],
          "note": "Steady input resistance is the origin increment divided by injected current. The two identical arms of the infinite cable act in parallel. At fixed material properties and arm geometry, $r_i\\propto d^{-2}$ gives $R_{\\rm in}\\propto d^{-3/2}$."
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 4, PDF page 7 (printed slide 8). A central point injection drives two cable arms; the normalized voltage falls with distance.",
            "fallbackAlt": "A central point injection drives two cable arms; the normalized voltage falls with distance.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L04/input.webp', import.meta.url).href,
              "alt": "A central point injection drives two cable arms; the normalized voltage falls with distance.",
              "aspect": 1.2912154031287606,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L04-f-input-infinite",
          "name": "Infinite input resistance",
          "tex": "R_N=\\frac{r_i\\lambda}{2}",
          "symbols": [
            {
              "tex": "R_N",
              "name": "Input resistance",
              "unit": "ohm",
              "meaning": "Input resistance in the stated model."
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
          "reads": "The number of available cable arms sets the source current division.",
          "assumes": "Steady uniform cable; negligible external resistance.",
          "variants": [],
          "drill": {
            "prompt": "Use $r_i=10^{11}\\,\\Omega/\\text{m}$ and $\\lambda=0.0008\\,\\text{m}$. Find the infinite input resistance.",
            "answer": {
              "value": 40000000,
              "unit": "ohm",
              "tolerance": 120000,
              "verification": {
                "relation": "cableInput",
                "inputs": {
                  "ri": 100000000000,
                  "lambda": 0.0008,
                  "sides": 2
                },
                "displayScale": 1
              }
            },
            "tex": "R=r_i\\lambda/2",
            "modelAnswer": [
              "The number of available cable arms sets the source current division.",
              "$40000000\\,\\mathrm{ohm}$"
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $R_N=\\frac{r_i\\lambda}{2}$."
              },
              {
                "body": "Start with $R=r_i\\lambda/2$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{R_N}=\\frac{\\htmlClass{formula-term-1}{r_i}\\htmlClass{formula-term-2}{\\lambda}}{2}"
        },
        {
          "id": "L04-f-input-semi",
          "name": "Semi-infinite input resistance",
          "tex": "R_{semi}=r_i\\lambda",
          "symbols": [
            {
              "tex": "R_{semi}",
              "name": "Input resistance",
              "unit": "ohm",
              "meaning": "Input resistance in the stated model."
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
          "reads": "The number of available cable arms sets the source current division.",
          "assumes": "Steady uniform cable; negligible external resistance.",
          "variants": [],
          "drill": {
            "prompt": "Use $r_i=10^{11}\\,\\Omega/\\text{m}$ and $\\lambda=0.0008\\,\\text{m}$. Find the semi-infinite input resistance.",
            "answer": {
              "value": 80000000,
              "unit": "ohm",
              "tolerance": 240000,
              "verification": {
                "relation": "cableInput",
                "inputs": {
                  "ri": 100000000000,
                  "lambda": 0.0008,
                  "sides": 1
                },
                "displayScale": 1
              }
            },
            "tex": "R=r_i\\lambda/1",
            "modelAnswer": [
              "The number of available cable arms sets the source current division.",
              "$80000000\\,\\mathrm{ohm}$"
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $R_{semi}=r_i\\lambda$."
              },
              {
                "body": "Start with $R=r_i\\lambda/1$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{R_{semi}}=\\htmlClass{formula-term-1}{r_i}\\htmlClass{formula-term-2}{\\lambda}"
        },
        {
          "id": "L04-f-input-ratio",
          "name": "Input resistance geometry ratio",
          "tex": "\\frac{R_{N,B}}{R_{N,A}}=\\left(\\frac{a_B}{a_A}\\right)^{-3/2}",
          "symbols": [
            {
              "tex": "R_{N,B}",
              "name": "B input resistance",
              "unit": "ohm",
              "meaning": "B input resistance in the stated model."
            },
            {
              "tex": "R_{N,A}",
              "name": "A input resistance",
              "unit": "ohm",
              "meaning": "A input resistance in the stated model."
            },
            {
              "tex": "a_B",
              "name": "B radius",
              "unit": "m",
              "meaning": "B radius in the stated model."
            },
            {
              "tex": "a_A",
              "name": "A radius",
              "unit": "m",
              "meaning": "A radius in the stated model."
            }
          ],
          "reads": "Larger radius lowers cable input resistance by a three-halves power.",
          "assumes": "Identical material properties and same infinite or semi-infinite geometry.",
          "variants": [],
          "drill": {
            "prompt": "B has four times A’s radius. Find the ratio of B to A input resistance.",
            "answer": {
              "value": 0.125,
              "unit": "",
              "tolerance": 0.000375,
              "verification": {
                "relation": "powerRatio",
                "inputs": {
                  "a": 4,
                  "b": 1,
                  "power": -1.5
                },
                "displayScale": 1
              }
            },
            "tex": "R_{N,B}/R_{N,A}=4^{-3/2}",
            "modelAnswer": [
              "Larger radius lowers cable input resistance by a three-halves power.",
              "$0.12500000$"
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\frac{R_{N,B}}{R_{N,A}}=\\left(\\frac{a_B}{a_A}\\right)^{-3/2}$."
              },
              {
                "body": "Start with $R_{N,B}/R_{N,A}=4^{-3/2}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\frac{\\htmlClass{formula-term-0}{R_{N,B}}}{\\htmlClass{formula-term-1}{R_{N,A}}}=\\left(\\frac{\\htmlClass{formula-term-2}{a_B}}{\\htmlClass{formula-term-3}{a_A}}\\right)^{-3/2}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L04-input-check",
          "practice": "extra",
          "prompt": "Why is semi-infinite input resistance higher?",
          "correct": 0,
          "options": [
            {
              "text": "The source supplies one longitudinal arm",
              "feedback": "One available arm presents a higher resistance than two identical arms in parallel."
            },
            {
              "text": "The source supplies two longitudinal arms",
              "feedback": "Two identical arms are the infinite-cable case and lower input resistance."
            }
          ],
          "hints": [
            {
              "body": "Count available longitudinal directions for current."
            },
            {
              "body": "Compare one available arm with two identical parallel arms."
            }
          ],
          "modelAnswer": [
            "The source supplies one longitudinal arm."
          ]
        },
        {
          "id": "L04-input-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L04 PDF 7",
          "prompt": "Where is voltage measured when defining cable input resistance?",
          "options": [
            {
              "text": "At the site where current enters",
              "feedback": "Input resistance uses the steady increment at the injection site divided by injected current."
            },
            {
              "text": "At a remote site along the cable",
              "feedback": "A remote measurement includes transfer attenuation as well as source resistance."
            },
            {
              "text": "At the far end beyond the source",
              "feedback": "An endpoint voltage generally differs from the source voltage used to define input resistance."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Recall the distinction in this section: infinite and semi-infinite input resistance."
            },
            {
              "body": "Use the stated passive-cable assumptions and identify the requested quantity or recording site."
            }
          ],
          "modelAnswer": [
            "Input resistance uses the steady increment at the injection site divided by injected current."
          ]
        }
      ]
    },
    {
      "id": "attenuation",
      "title": "Compare steady profiles",
      "keyTerms": [
        "endpoint load"
      ],
      "source": "L04 PDF 8",
      "blocks": [
        {
          "type": "text",
          "body": [
            "The graph fixes the same positive origin increment $V_0$. The sealed cable retains the most voltage, the shorted cable the least, and the exponential lies between them at interior positions. Equal injected currents can produce different origin voltages."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 4, PDF page 8 (printed slide 9). Original steady attenuation graph: sealed curve ends with zero slope, open curve reaches zero, infinite curve continues.",
            "fallbackAlt": "Original steady attenuation graph: sealed curve ends with zero slope, open curve reaches zero, infinite curve continues.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L04/profiles.webp', import.meta.url).href,
              "alt": "Original steady attenuation graph: sealed curve ends with zero slope, open curve reaches zero, infinite curve continues.",
              "aspect": 1.544904137235116,
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
          "id": "L04-attenuation-check",
          "practice": "extra",
          "prompt": "What must be held equal when comparing the plotted normalized profiles?",
          "correct": 1,
          "options": [
            {
              "text": "The total injected current at the origin",
              "feedback": "Equal source current does not fix source voltage when the input resistances differ."
            },
            {
              "text": "The voltage increment at the origin",
              "feedback": "Equal origin increment isolates differences in spatial attenuation."
            }
          ],
          "hints": [
            {
              "body": "The vertical axis is normalized by the origin response."
            },
            {
              "body": "This normalization removes source voltage scaling, not source current scaling."
            }
          ],
          "modelAnswer": [
            "The voltage increment at the origin."
          ]
        },
        {
          "id": "L04-attenuation-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L04 PDF 8",
          "prompt": "At equal positive origin voltage, which terminal retains the largest interior increment?",
          "options": [
            {
              "text": "A matched terminal boundary",
              "feedback": "A matched continuation gives the intermediate exponential profile."
            },
            {
              "text": "A sealed terminal boundary",
              "feedback": "Blocking terminal escape keeps the sealed profile above the other two."
            },
            {
              "text": "An open terminal boundary",
              "feedback": "An open short circuit draws the endpoint to rest and gives the lowest profile."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Recall the distinction in this section: read attenuation under matched origin voltage."
            },
            {
              "body": "Use the stated passive-cable assumptions and identify the requested quantity or recording site."
            }
          ],
          "modelAnswer": [
            "Blocking terminal escape keeps the sealed profile above the other two."
          ]
        }
      ]
    },
    {
      "id": "ends",
      "title": "Terminal boundary conditions",
      "keyTerms": [
        "sealed end",
        "open cable end"
      ],
      "source": "L04 PDF 9",
      "blocks": [
        {
          "type": "text",
          "body": [
            "A sealed end is an open circuit. The axial current $i_{\\rm axial}$ sets the slope through $\\partial_X V=-r_i\\lambda i_{\\rm axial}$. At a seal both current and slope vanish. The terminal voltage can differ from rest. The slide’s “open end” means a short to rest, so $V(L)=0$ and terminal current can flow."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 4, PDF page 9 (printed slide 10). Open, sealed and arbitrary-conductance terminal circuit diagrams.",
            "fallbackAlt": "Open, sealed and arbitrary-conductance terminal circuit diagrams.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L04/ends.webp', import.meta.url).href,
              "alt": "Open, sealed and arbitrary-conductance terminal circuit diagrams.",
              "aspect": 1.2510288065843622,
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
          "id": "L04-ends-check",
          "prompt": "Which endpoint has zero axial current?",
          "correct": 0,
          "options": [
            {
              "text": "A sealed end with zero terminal conductance",
              "feedback": "Zero terminal conductance blocks axial escape, so the terminal current is zero."
            },
            {
              "text": "An open end with infinite terminal conductance",
              "feedback": "Infinite terminal conductance clamps voltage to rest while permitting axial current."
            }
          ],
          "hints": [
            {
              "body": "Distinguish zero terminal conductance from zero terminal resistance."
            },
            {
              "body": "An insulated terminal blocks longitudinal escape."
            }
          ],
          "modelAnswer": [
            "A sealed end with zero terminal conductance."
          ]
        },
        {
          "id": "L04-ends-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L04 PDF 9",
          "prompt": "An open cable end is clamped to which voltage?",
          "options": [
            {
              "text": "The origin membrane voltage",
              "feedback": "The origin can be driven away from rest while the open endpoint stays at rest."
            },
            {
              "text": "The peak membrane voltage",
              "feedback": "The boundary specifies rest, not the maximum voltage reached during the response."
            },
            {
              "text": "The resting membrane voltage",
              "feedback": "An open short circuit fixes the rest-relative endpoint increment at zero."
            }
          ],
          "correct": 2,
          "hints": [
            {
              "body": "Recall the distinction in this section: open end means short circuit; sealed means no axial flow."
            },
            {
              "body": "Use the stated passive-cable assumptions and identify the requested quantity or recording site."
            }
          ],
          "modelAnswer": [
            "An open short circuit fixes the rest-relative endpoint increment at zero."
          ]
        }
      ]
    },
    {
      "id": "hyperbolic",
      "title": "Steady cable equation",
      "keyTerms": [
        "hyperbolic functions"
      ],
      "source": "L04 PDF 10",
      "blocks": [
        {
          "type": "text",
          "body": [
            "On a source-free interval at steady state, $\\partial_T V=0$ and $\\partial_X^2 V=V$. The boundary conditions select the coefficients of the two independent solutions."
          ]
        },
        {
          "type": "detail",
          "title": "Hyperbolic form",
          "blocks": [
            {
              "type": "text",
              "body": [
                "Write $V=C_1\\cosh(L-X)+C_2\\sinh(L-X)$. At the end $V(L)=C_1$ and $\\partial_X V(L)=-C_2$. Hyperbolic cosine is even and hyperbolic sine is odd."
              ]
            }
          ]
        },
        {
          "type": "detail",
          "title": "Hyperbolic definitions on the slide",
          "blocks": [
            {
              "type": "figure",
              "visual": {
                "type": "widget",
                "name": "image-hotspots",
                "caption": "Lecture 4, PDF page 10 (printed slide 11). The exponential definitions of hyperbolic cosine and sine.",
                "fallbackAlt": "The exponential definitions of hyperbolic cosine and sine.",
                "props": {
                  "src": new URL('../../assets/figures/nbe-e4120/L04/hyperbolic.webp', import.meta.url).href,
                  "alt": "The exponential definitions of hyperbolic cosine and sine.",
                  "aspect": 2.0869565217391304,
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
          "id": "L04-hyperbolic-check",
          "practice": "extra",
          "prompt": "Which function is odd?",
          "correct": 1,
          "options": [
            {
              "text": "Hyperbolic cosine changes sign at negative input",
              "feedback": "Hyperbolic cosine is even, so its value is unchanged by negating the argument."
            },
            {
              "text": "Hyperbolic sine changes sign at negative input",
              "feedback": "Hyperbolic sine is odd, so negating its argument negates its value."
            }
          ],
          "hints": [
            {
              "body": "Use the two exponential definitions."
            },
            {
              "body": "Replace the argument by its negative and inspect the subtraction order."
            }
          ],
          "modelAnswer": [
            "Hyperbolic sine changes sign at negative input."
          ]
        },
        {
          "id": "L04-hyperbolic-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L04 PDF 10",
          "prompt": "What becomes zero when the cable reaches steady state?",
          "options": [
            {
              "text": "The temporal voltage derivative",
              "feedback": "Steady voltage no longer changes with time."
            },
            {
              "text": "The spatial voltage derivative",
              "feedback": "Spatial slope can remain nonzero as current flows along a steady cable."
            },
            {
              "text": "The spatial voltage curvature",
              "feedback": "Steady curvature balances membrane leak and generally remains nonzero."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Recall the distinction in this section: steady solutions and hyperbolic functions."
            },
            {
              "body": "Use the stated passive-cable assumptions and identify the requested quantity or recording site."
            }
          ],
          "modelAnswer": [
            "Steady voltage no longer changes with time."
          ]
        }
      ]
    },
    {
      "id": "load",
      "title": "Compare the terminal load",
      "keyTerms": [
        "load ratio"
      ],
      "source": "L04 PDF 11",
      "blocks": [
        {
          "type": "math",
          "items": [
            {
              "tex": "B_L=G_e/G_\\infty,\\qquad G_\\infty=1/(r_i\\lambda)"
            }
          ],
          "note": "$G_e$ is the conductance of the terminal load to rest. $G_\\infty$ is the steady input conductance of one semi-infinite arm. A matched continuation has $B_L=1$. Branches present a combined downstream load."
        },
        {
          "type": "detail",
          "title": "Termination diagrams",
          "blocks": [
            {
              "type": "figure",
              "visual": {
                "type": "widget",
                "name": "image-hotspots",
                "caption": "Lecture 4, PDF page 11 (printed slide 12). Three finite cable terminal-load diagrams, including sealed, open and arbitrary conductance.",
                "fallbackAlt": "Three finite cable terminal-load diagrams, including sealed, open and arbitrary conductance.",
                "props": {
                  "src": new URL('../../assets/figures/nbe-e4120/L04/loads.webp', import.meta.url).href,
                  "alt": "Three finite cable terminal-load diagrams, including sealed, open and arbitrary conductance.",
                  "aspect": 1.242603550295858,
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
          "id": "L04-f-conductance",
          "name": "One-arm reference conductance",
          "tex": "G_\\infty=\\frac{1}{r_i\\lambda}",
          "symbols": [
            {
              "tex": "G_\\infty",
              "name": "Reference conductance",
              "unit": "S",
              "meaning": "Reference conductance in the stated model."
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
          "reads": "The reference is reciprocal of one-arm input resistance.",
          "assumes": "Semi-infinite uniform cable at steady state.",
          "variants": [],
          "drill": {
            "prompt": "A one-arm input resistance is $5\\times10^7\\,\\Omega$. Find its input conductance.",
            "answer": {
              "value": 2e-8,
              "unit": "S",
              "tolerance": 6e-11,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 1,
                  "b": 50000000
                },
                "displayScale": 1
              }
            },
            "tex": "G_\\infty=1/(5\\times10^7\\,\\Omega)",
            "modelAnswer": [
              "The reference is reciprocal of one-arm input resistance.",
              "$2.0000000e-8\\,\\mathrm{S}$"
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $G_\\infty=\\frac{1}{r_i\\lambda}$."
              },
              {
                "body": "Start with $G_\\infty=1/(5\\times10^7\\,\\Omega)$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{G_\\infty}=\\frac{1}{\\htmlClass{formula-term-1}{r_i}\\htmlClass{formula-term-2}{\\lambda}}"
        },
        {
          "id": "L04-f-load",
          "name": "Dimensionless terminal load",
          "tex": "B_L=\\frac{G_e}{G_\\infty}",
          "symbols": [
            {
              "tex": "B_L",
              "name": "Terminal load ratio",
              "unit": "",
              "meaning": "Terminal load ratio in the stated model."
            },
            {
              "tex": "G_e",
              "name": "Terminal conductance",
              "unit": "S",
              "meaning": "Terminal conductance in the stated model."
            },
            {
              "tex": "G_\\infty",
              "name": "Reference conductance",
              "unit": "S",
              "meaning": "Reference conductance in the stated model."
            }
          ],
          "reads": "A larger terminal conductance draws more end current.",
          "assumes": "Passive terminal with stated reversal at rest.",
          "variants": [],
          "drill": {
            "prompt": "Use $G_e=6\\times10^{-8}\\,\\text{S}$ and $G_\\infty=2\\times10^{-8}\\,\\text{S}$. Find the load ratio.",
            "answer": {
              "value": 3,
              "unit": "",
              "tolerance": 0.009000000000000001,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 6e-8,
                  "b": 2e-8
                },
                "displayScale": 1
              }
            },
            "tex": "B_L=(6\\times10^{-8}\\,\\text{S})/(2\\times10^{-8}\\,\\text{S})",
            "modelAnswer": [
              "A larger terminal conductance draws more end current.",
              "$3.0000000$"
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $B_L=\\frac{G_e}{G_\\infty}$."
              },
              {
                "body": "Start with $B_L=(6\\times10^{-8}\\,\\text{S})/(2\\times10^{-8}\\,\\text{S})$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{B_L}=\\frac{\\htmlClass{formula-term-1}{G_e}}{\\htmlClass{formula-term-2}{G_\\infty}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L04-load-check",
          "prompt": "What does a matched termination compare?",
          "correct": 0,
          "options": [
            {
              "text": "Terminal conductance with a semi-infinite arm",
              "feedback": "A matched terminal replaces the conductance of one semi-infinite continuation."
            },
            {
              "text": "Terminal conductance with two infinite arms",
              "feedback": "Two source arms have twice the conductance of the one-arm terminal reference."
            }
          ],
          "hints": [
            {
              "body": "The denominator represents one possible continuation at the end."
            },
            {
              "body": "A termination replaces a one-sided arm rather than the entire two-sided source."
            }
          ],
          "modelAnswer": [
            "Terminal conductance with a semi-infinite arm."
          ]
        },
        {
          "id": "L04-load-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L04 PDF 11",
          "prompt": "Which load ratio represents a matched continuation?",
          "options": [
            {
              "text": "A terminal load ratio of zero",
              "feedback": "Zero terminal conductance seals the end."
            },
            {
              "text": "A terminal load ratio of one",
              "feedback": "Equal terminal and one-arm conductances give a ratio of one."
            },
            {
              "text": "A terminal load ratio tending to infinity",
              "feedback": "The infinite-conductance limit gives an open short circuit."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Recall the distinction in this section: terminal conductance relative to a cable arm."
            },
            {
              "body": "Use the stated passive-cable assumptions and identify the requested quantity or recording site."
            }
          ],
          "modelAnswer": [
            "Equal terminal and one-arm conductances give a ratio of one."
          ]
        }
      ]
    },
    {
      "id": "finite",
      "title": "General finite profile",
      "keyTerms": [
        "origin increment"
      ],
      "source": "L04 PDF 11",
      "blocks": [
        {
          "type": "math",
          "items": [
            {
              "tex": "\\frac{V(X)}{V_0}=\\frac{\\cosh(L-X)+B_L\\sinh(L-X)}{\\cosh L+B_L\\sinh L}"
            }
          ],
          "note": "Use this on a uniform passive segment, from $0$ to $L$, after settling, with a known origin increment and a load to rest. For current drive, determine the origin increment using the actual input resistance."
        }
      ],
      "formulas": [
        {
          "id": "L04-f-finite",
          "name": "Loaded finite cable",
          "tex": "V(X)=V_0\\frac{\\cosh(L-X)+B_L\\sinh(L-X)}{\\cosh L+B_L\\sinh L}",
          "symbols": [
            {
              "tex": "V(X)",
              "name": "Voltage increment",
              "unit": "V",
              "meaning": "Voltage increment in the stated model."
            },
            {
              "tex": "V_0",
              "name": "Origin increment",
              "unit": "V",
              "meaning": "Origin increment in the stated model."
            },
            {
              "tex": "L",
              "name": "Total electrotonic length",
              "unit": "",
              "meaning": "Total electrotonic length in the stated model."
            },
            {
              "tex": "X",
              "name": "Electrotonic position",
              "unit": "",
              "meaning": "Electrotonic position in the stated model."
            },
            {
              "tex": "B_L",
              "name": "Terminal load ratio",
              "unit": "",
              "meaning": "Terminal load ratio in the stated model."
            }
          ],
          "reads": "The boundary load changes attenuation even when the material length constant is unchanged.",
          "assumes": "Uniform finite passive cable, steady state, known origin voltage.",
          "variants": [],
          "drill": {
            "prompt": "Use $V_0=0.01\\,\\text{V}$, $L=1$, $X=0.5$ and $B_L=2$. Find $V(X)$.",
            "answer": {
              "value": 0.0055729447486378685,
              "unit": "V",
              "tolerance": 0.000016718834245913607,
              "verification": {
                "relation": "finiteCable",
                "inputs": {
                  "v": 0.01,
                  "length": 1,
                  "x": 0.5,
                  "load": 2,
                  "mode": "load"
                },
                "displayScale": 1
              }
            },
            "tex": "V=0.01\\,\\text{V}\\frac{\\cosh(0.5)+2\\sinh(0.5)}{\\cosh(1)+2\\sinh(1)}",
            "modelAnswer": [
              "The boundary load changes attenuation even when the material length constant is unchanged.",
              "$0.0055729447\\,\\mathrm{V}$"
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $V(X)=V_0\\frac{\\cosh(L-X)+B_L\\sinh(L-X)}{\\cosh L+B_L\\sinh L}$."
              },
              {
                "body": "Start with $V=0.01\\,\\text{V}\\frac{\\cosh(0.5)+2\\sinh(0.5)}{\\cosh(1)+2\\sinh(1)}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{V(X)}=\\htmlClass{formula-term-1}{V_0}\\frac{\\cosh(\\htmlClass{formula-term-2}{L}-\\htmlClass{formula-term-3}{X})+\\htmlClass{formula-term-4}{B_L}\\sinh(\\htmlClass{formula-term-2}{L}-\\htmlClass{formula-term-3}{X})}{\\cosh \\htmlClass{formula-term-2}{L}+\\htmlClass{formula-term-4}{B_L}\\sinh \\htmlClass{formula-term-2}{L}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L04-finite-check",
          "prompt": "Which extra quantities enter a finite profile?",
          "correct": 1,
          "options": [
            {
              "text": "Elapsed electrotonic time and pulse count",
              "feedback": "Elapsed time and pulse count do not determine a steady finite profile."
            },
            {
              "text": "Total electrotonic length and terminal load",
              "feedback": "Total length and terminal load add boundary information to the spatial scale."
            }
          ],
          "hints": [
            {
              "body": "A finite segment knows where its endpoint is."
            },
            {
              "body": "Its solution uses normalized total length and how strongly the terminal draws current."
            }
          ],
          "modelAnswer": [
            "Total electrotonic length and terminal load."
          ]
        },
        {
          "id": "L04-finite-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L04 PDF 10–11",
          "prompt": "Which voltage scales the normalized finite-cable profile?",
          "options": [
            {
              "text": "The voltage increment at the terminal",
              "feedback": "Terminal voltage is determined by the profile and load rather than serving as this prefactor."
            },
            {
              "text": "The resting voltage before stimulation",
              "feedback": "The profile is rest-relative, so its scale is an increment rather than the resting voltage."
            },
            {
              "text": "The voltage increment at the origin",
              "feedback": "The prefactor is the actual origin increment; the normalized ratio equals one there."
            }
          ],
          "correct": 2,
          "hints": [
            {
              "body": "Recall the distinction in this section: the finite-cable load solution."
            },
            {
              "body": "Use the stated passive-cable assumptions and identify the requested quantity or recording site."
            }
          ],
          "modelAnswer": [
            "The prefactor is the actual origin increment; the normalized ratio equals one there."
          ]
        }
      ]
    },
    {
      "id": "cases",
      "title": "Choose the attenuation formula",
      "keyTerms": [
        "sealed end"
      ],
      "source": "L04 PDF11",
      "blocks": [
        {
          "type": "compare",
          "title": "Steady attenuation",
          "rowLabel": "Case",
          "columns": [
            "Voltage fraction and end condition"
          ],
          "rows": [
            {
              "label": "Infinite / matched",
              "cells": [
                "$e^{-|X|}$ on the infinite line. On one arm use $e^{-X}$. A matched load has $B_L=1$."
              ]
            },
            {
              "label": "Sealed",
              "cells": [
                "$\\cosh(L-X)/\\cosh L$ with $B_L=0$ and zero end current."
              ]
            },
            {
              "label": "Shorted",
              "cells": [
                "$\\sinh(L-X)/\\sinh L$ as $B_L\\to\\infty$, with the end held at rest."
              ]
            }
          ]
        }
      ],
      "formulas": [
        {
          "id": "L04-f-sealed",
          "name": "Sealed finite profile",
          "tex": "V(X)=V_0\\frac{\\cosh(L-X)}{\\cosh L}",
          "symbols": [
            {
              "tex": "V(X)",
              "name": "Voltage increment",
              "unit": "V",
              "meaning": "Voltage increment in the stated model."
            },
            {
              "tex": "V_0",
              "name": "Origin increment",
              "unit": "V",
              "meaning": "Origin increment in the stated model."
            },
            {
              "tex": "L",
              "name": "Total electrotonic length",
              "unit": "",
              "meaning": "Total electrotonic length in the stated model."
            },
            {
              "tex": "X",
              "name": "Electrotonic position",
              "unit": "",
              "meaning": "Electrotonic position in the stated model."
            }
          ],
          "reads": "The endpoint condition selects a different hyperbolic ratio.",
          "assumes": "Steady uniform finite cable; zero end current.",
          "variants": [],
          "drill": {
            "prompt": "Use $V_0=0.01\\,\\text{V}$, $L=1$ and $X=0.5$. Find the sealed-end profile voltage.",
            "answer": {
              "value": 0.007307628258463588,
              "unit": "V",
              "tolerance": 0.000021922884775390764,
              "verification": {
                "relation": "finiteCable",
                "inputs": {
                  "v": 0.01,
                  "length": 1,
                  "x": 0.5,
                  "load": 0,
                  "mode": "load"
                },
                "displayScale": 1
              }
            },
            "tex": "V=0.01\\,\\text{V}\\frac{\\cosh(0.5)}{\\cosh(1)}",
            "modelAnswer": [
              "The endpoint condition selects a different hyperbolic ratio.",
              "$0.0073076283\\,\\mathrm{V}$"
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $V(X)=V_0\\frac{\\cosh(L-X)}{\\cosh L}$."
              },
              {
                "body": "Start with $V=0.01\\,\\text{V}\\frac{\\cosh(0.5)}{\\cosh(1)}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{V(X)}=\\htmlClass{formula-term-1}{V_0}\\frac{\\cosh(\\htmlClass{formula-term-2}{L}-\\htmlClass{formula-term-3}{X})}{\\cosh \\htmlClass{formula-term-2}{L}}"
        },
        {
          "id": "L04-f-open",
          "name": "Open finite profile",
          "tex": "V(X)=V_0\\frac{\\sinh(L-X)}{\\sinh L}",
          "symbols": [
            {
              "tex": "V(X)",
              "name": "Voltage increment",
              "unit": "V",
              "meaning": "Voltage increment in the stated model."
            },
            {
              "tex": "V_0",
              "name": "Origin increment",
              "unit": "V",
              "meaning": "Origin increment in the stated model."
            },
            {
              "tex": "L",
              "name": "Total electrotonic length",
              "unit": "",
              "meaning": "Total electrotonic length in the stated model."
            },
            {
              "tex": "X",
              "name": "Electrotonic position",
              "unit": "",
              "meaning": "Electrotonic position in the stated model."
            }
          ],
          "reads": "The endpoint condition selects a different hyperbolic ratio.",
          "assumes": "Steady uniform finite cable; end voltage clamped to rest.",
          "variants": [],
          "drill": {
            "prompt": "Use $V_0=0.01\\,\\text{V}$, $L=1$ and $X=0.5$. Find the open-end profile voltage.",
            "answer": {
              "value": 0.00443409441985037,
              "unit": "V",
              "tolerance": 0.00001330228325955111,
              "verification": {
                "relation": "finiteCable",
                "inputs": {
                  "v": 0.01,
                  "length": 1,
                  "x": 0.5,
                  "load": 0,
                  "mode": "open"
                },
                "displayScale": 1
              }
            },
            "tex": "V=0.01\\,\\text{V}\\frac{\\sinh(0.5)}{\\sinh(1)}",
            "modelAnswer": [
              "The endpoint condition selects a different hyperbolic ratio.",
              "$0.0044340944\\,\\mathrm{V}$"
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $V(X)=V_0\\frac{\\sinh(L-X)}{\\sinh L}$."
              },
              {
                "body": "Start with $V=0.01\\,\\text{V}\\frac{\\sinh(0.5)}{\\sinh(1)}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{V(X)}=\\htmlClass{formula-term-1}{V_0}\\frac{\\sinh(\\htmlClass{formula-term-2}{L}-\\htmlClass{formula-term-3}{X})}{\\sinh \\htmlClass{formula-term-2}{L}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L04-cases-check",
          "practice": "extra",
          "prompt": "Which endpoint forces voltage increment to zero?",
          "correct": 0,
          "options": [
            {
              "text": "The short-circuited open cable end",
              "feedback": "An open short circuit fixes the endpoint increment at zero."
            },
            {
              "text": "The insulated sealed cable end",
              "feedback": "A sealed end fixes terminal current and slope at zero, not voltage."
            }
          ],
          "hints": [
            {
              "body": "Differentiate a sealed profile; evaluate an open profile at its end."
            },
            {
              "body": "A current-blocking end and a voltage-clamped end enforce different zero quantities."
            }
          ],
          "modelAnswer": [
            "The short-circuited open cable end."
          ]
        },
        {
          "id": "L04-cases-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L04 PDF 11",
          "prompt": "Which steady profile belongs to a matched termination?",
          "options": [
            {
              "text": "An exponential attenuation profile",
              "feedback": "A matched continuation has the same exponential attenuation as a semi-infinite arm."
            },
            {
              "text": "A hyperbolic cosine-ratio profile",
              "feedback": "The cosine-hyperbolic ratio enforces zero slope at a sealed end."
            },
            {
              "text": "A hyperbolic sine-ratio profile",
              "feedback": "The sine-hyperbolic ratio enforces zero increment at an open end."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Recall the distinction in this section: sealed, matched and open endpoints."
            },
            {
              "body": "Use the stated passive-cable assumptions and identify the requested quantity or recording site."
            }
          ],
          "modelAnswer": [
            "A matched continuation has the same exponential attenuation as a semi-infinite arm."
          ]
        }
      ]
    },
    {
      "id": "endpoint",
      "title": "Two prescribed voltages",
      "keyTerms": [
        "terminal conductance"
      ],
      "source": "L04 PDF 11",
      "blocks": [
        {
          "type": "math",
          "items": [
            {
              "tex": "V(X)=\\frac{V_0\\sinh(L-X)+V_e\\sinh X}{\\sinh L}"
            }
          ],
          "note": "Use when both endpoint increments are prescribed. A passive load to rest determines $V_e=V(L)$ through its current condition, so the load and end voltage must agree."
        }
      ],
      "formulas": [
        {
          "id": "L04-f-endpoint",
          "name": "Specified endpoint voltages",
          "tex": "V(X)=\\frac{V_0\\sinh(L-X)+V_e\\sinh X}{\\sinh L}",
          "symbols": [
            {
              "tex": "V(X)",
              "name": "Interior voltage increment",
              "unit": "V",
              "meaning": "Interior voltage increment in the stated model."
            },
            {
              "tex": "V_0",
              "name": "Origin increment",
              "unit": "V",
              "meaning": "Origin increment in the stated model."
            },
            {
              "tex": "V_e",
              "name": "End increment",
              "unit": "V",
              "meaning": "End increment in the stated model."
            },
            {
              "tex": "L",
              "name": "Total electrotonic length",
              "unit": "",
              "meaning": "Total electrotonic length in the stated model."
            },
            {
              "tex": "X",
              "name": "Electrotonic position",
              "unit": "",
              "meaning": "Electrotonic position in the stated model."
            }
          ],
          "reads": "Two boundary voltages select the steady interior profile.",
          "assumes": "Steady uniform cable with compatible prescribed endpoint voltages.",
          "variants": [],
          "drill": {
            "prompt": "Use $V_0=0.01\\,\\text{V}$, $V_e=-0.002\\,\\text{V}$, $L=1$, $X=0.5$. Find the interior increment.",
            "answer": {
              "value": 0.0035472755358802958,
              "unit": "V",
              "tolerance": 0.000010641826607640887,
              "verification": {
                "relation": "endpointCable",
                "inputs": {
                  "v0": 0.01,
                  "ve": -0.002,
                  "length": 1,
                  "x": 0.5
                },
                "displayScale": 1
              }
            },
            "tex": "V=\\frac{(0.01\\,\\text{V})\\sinh(0.5)-(0.002\\,\\text{V})\\sinh(0.5)}{\\sinh(1)}",
            "modelAnswer": [
              "Two boundary voltages select the steady interior profile.",
              "$0.0035472755\\,\\mathrm{V}$"
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $V(X)=\\frac{V_0\\sinh(L-X)+V_e\\sinh X}{\\sinh L}$."
              },
              {
                "body": "Start with $V=\\frac{(0.01\\,\\text{V})\\sinh(0.5)-(0.002\\,\\text{V})\\sinh(0.5)}{\\sinh(1)}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{V(X)}=\\frac{\\htmlClass{formula-term-1}{V_0}\\sinh(\\htmlClass{formula-term-3}{L}-\\htmlClass{formula-term-4}{X})+\\htmlClass{formula-term-2}{V_e}\\sinh \\htmlClass{formula-term-4}{X}}{\\sinh \\htmlClass{formula-term-3}{L}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L04-endpoint-check",
          "practice": "extra",
          "prompt": "Can endpoint voltage and terminal conductance be chosen independently?",
          "correct": 1,
          "options": [
            {
              "text": "Yes, using the two voltage values alone",
              "feedback": "Voltage and conductance together imply a current that must agree with the cable slope."
            },
            {
              "text": "Only if their terminal current condition agrees",
              "feedback": "Compatibility requires the terminal load current to equal the axial current reaching it."
            }
          ],
          "hints": [
            {
              "body": "A terminal conductance implies an end current for a given voltage."
            },
            {
              "body": "The spatial slope must supply that same current."
            }
          ],
          "modelAnswer": [
            "Only if their terminal current condition agrees."
          ]
        },
        {
          "id": "L04-endpoint-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L04 PDF 11",
          "prompt": "What data define the two-endpoint voltage representation?",
          "options": [
            {
              "text": "Both endpoint axial conductances",
              "feedback": "Conductance boundaries require current balance rather than independently imposed endpoint voltages."
            },
            {
              "text": "Both endpoint voltage increments",
              "feedback": "Imposed or measured origin and terminal increments set the two voltage boundary values."
            },
            {
              "text": "Both endpoint stimulus durations",
              "feedback": "Stimulus durations do not provide the two steady voltage boundary values."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Recall the distinction in this section: when both endpoint voltages are specified."
            },
            {
              "body": "Use the stated passive-cable assumptions and identify the requested quantity or recording site."
            }
          ],
          "modelAnswer": [
            "Imposed or measured origin and terminal increments set the two voltage boundary values."
          ]
        }
      ]
    },
    {
      "id": "summary",
      "title": "Check the limits",
      "keyTerms": [
        "zero slope"
      ],
      "source": "L04 PDF 12",
      "blocks": [
        {
          "type": "text",
          "body": [
            "Every profile returns $V_0$ at $X=0$. Apply the distal check at $X=L$ and stop evaluating the finite profile there. Increasing $L$ weakens the effect of the end at a fixed interior position."
          ]
        }
      ],
      "formulas": [],
      "conceptQuiz": [
        {
          "id": "L04-summary-check",
          "practice": "extra",
          "prompt": "What is the right check for a sealed terminal?",
          "correct": 0,
          "options": [
            {
              "text": "Differentiate and test for zero endpoint slope",
              "feedback": "Zero slope expresses the absence of axial current through the sealed terminal."
            },
            {
              "text": "Substitute and demand zero endpoint voltage",
              "feedback": "Zero endpoint increment checks an open short circuit, not a sealed end."
            }
          ],
          "hints": [
            {
              "body": "Sealed means the current cannot escape axially."
            },
            {
              "body": "Connect axial current to the spatial voltage gradient."
            }
          ],
          "modelAnswer": [
            "Differentiate and test for zero endpoint slope."
          ]
        },
        {
          "id": "L04-summary-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L04 PDF 12",
          "prompt": "What should a normalized profile return at the origin?",
          "options": [
            {
              "text": "The imposed terminal voltage increment",
              "feedback": "The terminal voltage is recovered at the endpoint, not generally at the origin."
            },
            {
              "text": "The unchanged resting membrane voltage",
              "feedback": "These profiles describe increments from rest, not the absolute resting potential."
            },
            {
              "text": "The imposed origin voltage increment",
              "feedback": "The origin check substitutes zero position and must recover the chosen origin increment."
            }
          ],
          "correct": 2,
          "hints": [
            {
              "body": "Recall the distinction in this section: check limiting cases before trusting a profile."
            },
            {
              "body": "Use the stated passive-cable assumptions and identify the requested quantity or recording site."
            }
          ],
          "modelAnswer": [
            "The origin check substitutes zero position and must recover the chosen origin increment."
          ]
        }
      ]
    },
    {
      "id": "neuron",
      "title": "Loads in a neuron",
      "keyTerms": [
        "conductance"
      ],
      "source": "L04 PDF 13",
      "blocks": [
        {
          "type": "text",
          "body": [
            "An insulated dendritic tip can approximate a seal. A low-resistance soma can draw axial current, and a long axon can approximate a continuation. Opening synaptic channels changes local conductance even when geometry stays fixed."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 4, PDF page 13 (printed slide 14). Neuron schematic with high-resistance dendritic tip, low-resistance somatic load and long axon.",
            "fallbackAlt": "Neuron schematic with high-resistance dendritic tip, low-resistance somatic load and long axon.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L04/neuron.webp', import.meta.url).href,
              "alt": "Neuron schematic with high-resistance dendritic tip, low-resistance somatic load and long axon.",
              "aspect": 2.4630071599045347,
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
          "id": "L04-neuron-check",
          "practice": "extra",
          "prompt": "What can a newly active synapse change locally?",
          "correct": 1,
          "options": [
            {
              "text": "The axial resistivity of the cytoplasm",
              "feedback": "Synaptic activation changes electrical load while dendritic length can remain fixed."
            },
            {
              "text": "The membrane conductance and effective load",
              "feedback": "Opened synaptic pathways increase local membrane conductance and alter the effective load."
            }
          ],
          "hints": [
            {
              "body": "An activated synapse opens a membrane current path."
            },
            {
              "body": "Geometry can stay fixed while the electrical load changes."
            }
          ],
          "modelAnswer": [
            "The membrane conductance and effective load."
          ]
        },
        {
          "id": "L04-neuron-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L04 PDF 13",
          "prompt": "Which boundary approximates an isolated insulated dendritic tip?",
          "options": [
            {
              "text": "A sealed terminal boundary",
              "feedback": "An insulated tip blocks axial escape and is approximated by a sealed end."
            },
            {
              "text": "An open terminal boundary",
              "feedback": "An open boundary approximates a very low-resistance load, not an insulated tip."
            },
            {
              "text": "A matched terminal boundary",
              "feedback": "A matched boundary represents continuation into another cable arm."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Recall the distinction in this section: real dendrites have changing boundary loads."
            },
            {
              "body": "Use the stated passive-cable assumptions and identify the requested quantity or recording site."
            }
          ],
          "modelAnswer": [
            "An insulated tip blocks axial escape and is approximated by a sealed end."
          ]
        }
      ]
    },
    {
      "id": "synapses",
      "title": "From spikes to graded input",
      "keyTerms": [
        "graded"
      ],
      "source": "L04 PDF 14",
      "blocks": [
        {
          "type": "text",
          "body": [
            "Synaptic transmission turns presynaptic spikes into graded postsynaptic responses. The dendrite adds low-pass filtering. Individual inputs are often small, and their combined response can reach spike threshold."
          ]
        },
        {
          "type": "detail",
          "title": "Distribution of synapses",
          "blocks": [
            {
              "type": "figure",
              "visual": {
                "type": "widget",
                "name": "image-hotspots",
                "caption": "Lecture 4, PDF page 14 (printed slide 15). Original pyramidal-neuron and interneuron images with excitatory and inhibitory synaptic labels; source attribution retained.",
                "fallbackAlt": "Original pyramidal-neuron and interneuron images with excitatory and inhibitory synaptic labels; source attribution retained.",
                "props": {
                  "src": new URL('../../assets/figures/nbe-e4120/L04/synapses.webp', import.meta.url).href,
                  "alt": "Original pyramidal-neuron and interneuron images with excitatory and inhibitory synaptic labels; source attribution retained.",
                  "aspect": 1.393939393939394,
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
          "id": "L04-synapses-check",
          "practice": "extra",
          "prompt": "What does the dendrite combine?",
          "correct": 0,
          "options": [
            {
              "text": "Graded postsynaptic signals spread over space and time",
              "feedback": "Dendrites combine graded postsynaptic signals after synaptic transformation."
            },
            {
              "text": "Unchanged presynaptic spikes copied across each synapse",
              "feedback": "Presynaptic spikes are transformed at the synapse before passive dendritic spread."
            }
          ],
          "hints": [
            {
              "body": "Compare the presynaptic event with the postsynaptic response."
            },
            {
              "body": "A synapse transforms the input before the dendrite filters it further."
            }
          ],
          "modelAnswer": [
            "Graded postsynaptic signals spread over space and time."
          ]
        },
        {
          "id": "L04-synapses-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L04 PDF 14",
          "prompt": "Which filtering role is assigned to synaptic transmission here?",
          "options": [
            {
              "text": "High-pass filtering of spike input",
              "feedback": "The source emphasizes smoothing rather than preferential passage of rapid changes."
            },
            {
              "text": "Low-pass filtering of spike input",
              "feedback": "The source describes spike trains being transformed into slower graded signals."
            },
            {
              "text": "Unchanged copying of spike input",
              "feedback": "Postsynaptic graded potentials differ from the incoming presynaptic spikes."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Recall the distinction in this section: distributed weak inputs and low-pass filtering."
            },
            {
              "body": "Use the stated passive-cable assumptions and identify the requested quantity or recording site."
            }
          ],
          "modelAnswer": [
            "The source describes spike trains being transformed into slower graded signals."
          ]
        }
      ]
    },
    {
      "id": "summation",
      "title": "Temporal and spatial summation",
      "keyTerms": [
        "Temporal integration",
        "Spatial integration"
      ],
      "source": "L04 PDF 15",
      "blocks": [
        {
          "type": "text",
          "body": [
            "Temporal summation combines responses close together in time. Spatial summation combines responses from different sites. Both depend on waveform overlap at the site where voltage is being read."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 4, PDF page 15 (printed slide 16). Source branches illustrate attenuation, broadening and summation of graded inputs.",
            "fallbackAlt": "Source branches illustrate attenuation, broadening and summation of graded inputs.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L04/summation.webp', import.meta.url).href,
              "alt": "Source branches illustrate attenuation, broadening and summation of graded inputs.",
              "aspect": 1.6014625228519195,
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
          "id": "L04-summation-check",
          "practice": "extra",
          "prompt": "What must be compared before adding inputs at the soma?",
          "correct": 1,
          "options": [
            {
              "text": "Their separate local peaks at different input sites",
              "feedback": "Separate local peaks omit the propagation and timing needed at the soma."
            },
            {
              "text": "Their waveforms at the same soma and same time",
              "feedback": "Pointwise addition requires both waveforms at one shared site and instant."
            }
          ],
          "hints": [
            {
              "body": "A voltage sum has a single observation coordinate and time."
            },
            {
              "body": "Transport each input to that coordinate before combining waveforms."
            }
          ],
          "modelAnswer": [
            "Their waveforms at the same soma and same time."
          ]
        },
        {
          "id": "L04-summation-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L04 PDF 15",
          "prompt": "What does spatial integration combine?",
          "options": [
            {
              "text": "Inputs repeated at one fixed location",
              "feedback": "Repeated inputs at one location illustrate temporal integration."
            },
            {
              "text": "Inputs arriving with different amplitudes",
              "feedback": "Different amplitudes describe input strength rather than the locations that define spatial integration."
            },
            {
              "text": "Inputs arriving at different locations",
              "feedback": "Spatial integration concerns inputs distributed across locations."
            }
          ],
          "correct": 2,
          "hints": [
            {
              "body": "Recall the distinction in this section: where and when inputs arrive both matter."
            },
            {
              "body": "Use the stated passive-cable assumptions and identify the requested quantity or recording site."
            }
          ],
          "modelAnswer": [
            "Spatial integration concerns inputs distributed across locations."
          ]
        }
      ]
    },
    {
      "id": "superposition",
      "title": "Add signed waveforms",
      "keyTerms": [
        "linear"
      ],
      "source": "L04 PDF 16",
      "blocks": [
        {
          "type": "math",
          "items": [
            {
              "tex": "V_{\\rm sum}(x,t)=V_1(x,t)+V_2(x,t)"
            }
          ],
          "note": "Add increments at the same site and time for an unchanged linear passive cable driven by additive currents. Add rest once to recover absolute voltage. Synaptic shunting or active conductances can change the response and invalidate the sum."
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 4, PDF page 16 (printed slide 17). Somatic recording of two current inputs at proximal and distal sites on one dendrite.",
            "fallbackAlt": "Somatic recording of two current inputs at proximal and distal sites on one dendrite.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L04/superposition.webp', import.meta.url).href,
              "alt": "Somatic recording of two current inputs at proximal and distal sites on one dendrite.",
              "aspect": 1.4679943100995732,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L04-f-sum",
          "name": "Linear waveform superposition",
          "tex": "V_{sum}(x,t)=V_1(x,t)+V_2(x,t)",
          "symbols": [
            {
              "tex": "V_{sum}(x,t)",
              "name": "Combined response",
              "unit": "V",
              "meaning": "Combined response in the stated model."
            },
            {
              "tex": "V_1(x,t)",
              "name": "First response",
              "unit": "V",
              "meaning": "First response in the stated model."
            },
            {
              "tex": "V_2(x,t)",
              "name": "Second response",
              "unit": "V",
              "meaning": "Second response in the stated model."
            }
          ],
          "reads": "At a shared location and instant, linear responses add with their signs.",
          "assumes": "Same linear passive system and additive current inputs.",
          "variants": [],
          "drill": {
            "prompt": "At one recording site and instant, separate increments are $0.004\\,\\text{V}$ and $-0.0015\\,\\text{V}$. Find their linear sum.",
            "answer": {
              "value": 0.0025,
              "unit": "V",
              "tolerance": 0.0000075,
              "verification": {
                "relation": "sum",
                "inputs": {
                  "a": 0.004,
                  "b": -0.0015
                },
                "displayScale": 1
              }
            },
            "tex": "V_{sum}=0.004\\,\\text{V}-0.0015\\,\\text{V}",
            "modelAnswer": [
              "At a shared location and instant, linear responses add with their signs.",
              "$0.0025000000\\,\\mathrm{V}$"
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $V_{sum}(x,t)=V_1(x,t)+V_2(x,t)$."
              },
              {
                "body": "Start with $V_{sum}=0.004\\,\\text{V}-0.0015\\,\\text{V}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{V_{sum}(x,t)}=\\htmlClass{formula-term-1}{V_1(x,t)}+\\htmlClass{formula-term-2}{V_2(x,t)}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L04-superposition-check",
          "prompt": "When is simple waveform addition valid?",
          "correct": 0,
          "options": [
            {
              "text": "When the same linear passive system receives current inputs",
              "feedback": "An unchanged linear cable permits pointwise addition of current-driven voltage increments."
            },
            {
              "text": "When membrane conductance changes freely with either input",
              "feedback": "Input-dependent conductance changes the system and can invalidate simple addition."
            }
          ],
          "hints": [
            {
              "body": "Superposition assumes one unchanged linear system."
            },
            {
              "body": "Voltage-dependent or input-dependent conductance violates that requirement."
            }
          ],
          "modelAnswer": [
            "When the same linear passive system receives current inputs."
          ]
        },
        {
          "id": "L04-superposition-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L04 PDF 16",
          "prompt": "How is the resting baseline handled when adding two voltage increments?",
          "options": [
            {
              "text": "Add the resting baseline once",
              "feedback": "The summed increments are converted to absolute voltage by adding rest once."
            },
            {
              "text": "Add the resting baseline twice",
              "feedback": "Both responses already represent changes from rest; adding it twice double-counts the baseline."
            },
            {
              "text": "Subtract the resting baseline twice",
              "feedback": "The inputs are already rest-relative increments, so no second baseline subtraction is needed."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Recall the distinction in this section: linear superposition and its limits."
            },
            {
              "body": "Use the stated passive-cable assumptions and identify the requested quantity or recording site."
            }
          ],
          "modelAnswer": [
            "The summed increments are converted to absolute voltage by adding rest once."
          ]
        }
      ]
    },
    {
      "id": "temporal",
      "title": "Read temporal integration",
      "keyTerms": [
        "trigger-zone"
      ],
      "source": "L04 PDF 17",
      "blocks": [
        {
          "type": "text",
          "body": [
            "In the two-input column, the second response arrives while the first still contributes voltage. Compare the dendrite and trigger-zone traces. A triggered spike uses an active mechanism beyond the passive sum."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 4, PDF page 17 (printed slide 18). One or two input-cell spikes, their target dendritic responses and trigger-zone recordings with threshold.",
            "fallbackAlt": "One or two input-cell spikes, their target dendritic responses and trigger-zone recordings with threshold.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L04/temporal.webp', import.meta.url).href,
              "alt": "One or two input-cell spikes, their target dendritic responses and trigger-zone recordings with threshold.",
              "aspect": 1.1588089330024813,
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
          "id": "L04-temporal-check",
          "prompt": "Which trace records the trigger zone?",
          "correct": 1,
          "options": [
            {
              "text": "The input-cell trace at the presynaptic stimulus",
              "feedback": "The input-cell trace records the presynaptic event rather than target output."
            },
            {
              "text": "The target-cell trace nearest the threshold marker",
              "feedback": "The threshold-marked target trace is the trigger-zone recording."
            }
          ],
          "hints": [
            {
              "body": "Locate the threshold line in the source panel."
            },
            {
              "body": "The target output trace is distinct from the presynaptic spike recording."
            }
          ],
          "modelAnswer": [
            "The target-cell trace nearest the threshold marker."
          ]
        },
        {
          "id": "L04-temporal-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L04 PDF 17",
          "prompt": "What allows a second nearby input to build on the first passive response?",
          "options": [
            {
              "text": "Complete repolarization before arrival",
              "feedback": "After complete recovery there is no residual increment to add to."
            },
            {
              "text": "Residual depolarization before recovery",
              "feedback": "A second input can arrive while some of the first depolarization remains."
            },
            {
              "text": "Complete spike regeneration before arrival",
              "feedback": "Spike regeneration is nonlinear and is not required for passive temporal summation."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Recall the distinction in this section: read temporal integration at three recording sites."
            },
            {
              "body": "Use the stated passive-cable assumptions and identify the requested quantity or recording site."
            }
          ],
          "modelAnswer": [
            "A second input can arrive while some of the first depolarization remains."
          ]
        }
      ]
    },
    {
      "id": "spatial",
      "title": "Read spatial integration",
      "keyTerms": [
        "causal order"
      ],
      "source": "L04 PDF 18",
      "blocks": [
        {
          "type": "text",
          "body": [
            "Compare each input alone with both together at the same target site. Check causal order against the source’s marked early response. The schematic supports a qualitative comparison of timing and overlap."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 4, PDF page 18 (printed slide 19). Separate and combined presynaptic inputs with target dendrite and trigger-zone recordings. The source flags a response drawn too early. Interpret causal order; no numerical latency is inferred.",
            "fallbackAlt": "Separate and combined presynaptic inputs with target dendrite and trigger-zone recordings. The source flags a response drawn too early.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L04/spatial.webp', import.meta.url).href,
              "alt": "Separate and combined presynaptic inputs with target dendrite and trigger-zone recordings. The source flags a response drawn too early.",
              "aspect": 1.2943327239488116,
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
          "id": "L04-spatial-check",
          "practice": "extra",
          "prompt": "What must precede a target response?",
          "correct": 0,
          "options": [
            {
              "text": "The causal input and propagation to the target",
              "feedback": "A response requires a preceding causal input and propagation to the target."
            },
            {
              "text": "The peak of the later target-cell response",
              "feedback": "The source warning corrects an early response; a later input cannot cause it."
            }
          ],
          "hints": [
            {
              "body": "Follow the direction of causation from input cell to target."
            },
            {
              "body": "The source warning identifies a response drawn before it should occur."
            }
          ],
          "modelAnswer": [
            "The causal input and propagation to the target."
          ]
        },
        {
          "id": "L04-spatial-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L04 PDF 18",
          "prompt": "Which target recording site is numbered three in the spatial-integration source?",
          "options": [
            {
              "text": "The target trigger-zone recording site",
              "feedback": "The trigger zone is target site four in this source."
            },
            {
              "text": "The second input-cell recording site",
              "feedback": "The second input cell is site two, upstream of the target."
            },
            {
              "text": "The target dendritic recording site",
              "feedback": "The source labels the target dendrite as site three."
            }
          ],
          "correct": 2,
          "hints": [
            {
              "body": "Recall the distinction in this section: spatial integration must preserve causal timing."
            },
            {
              "body": "Use the stated passive-cable assumptions and identify the requested quantity or recording site."
            }
          ],
          "modelAnswer": [
            "The source labels the target dendrite as site three."
          ]
        }
      ]
    },
    {
      "id": "distance-effect",
      "title": "Isolate distance effects",
      "keyTerms": [
        "input strength"
      ],
      "source": "L04 PDF 19",
      "blocks": [
        {
          "type": "text",
          "body": [
            "Greater electrotonic distance generally reduces and broadens a passive response. Compare matched local inputs while controlling timing and cable properties. Equal somatic peaks can still hide different waveforms."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 4, PDF page 19 (printed slide 20). Two input pathways produce different target trigger-zone waveforms in the source schematic.",
            "fallbackAlt": "Two input pathways produce different target trigger-zone waveforms in the source schematic.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L04/distance.webp', import.meta.url).href,
              "alt": "Two input pathways produce different target trigger-zone waveforms in the source schematic.",
              "aspect": 1.1228334589299171,
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
          "id": "L04-distance-effect-check",
          "practice": "extra",
          "prompt": "What is needed to isolate a distance effect?",
          "correct": 1,
          "options": [
            {
              "text": "Matched input peaks without matching cable properties",
              "feedback": "Unknown input strength and uncontrolled cable properties confound a distance comparison."
            },
            {
              "text": "Comparable inputs and controlled cable properties",
              "feedback": "Comparable inputs and fixed cable properties let distance be examined independently."
            }
          ],
          "hints": [
            {
              "body": "The target amplitude depends on both input strength and transfer."
            },
            {
              "body": "Control one factor before assigning the observed difference to another."
            }
          ],
          "modelAnswer": [
            "Comparable inputs and controlled cable properties."
          ]
        },
        {
          "id": "L04-distance-effect-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L04 PDF 19",
          "prompt": "Which signal is recorded at site three in the distance-effect source?",
          "options": [
            {
              "text": "The target trigger-zone voltage",
              "feedback": "Site three is the target trigger zone where transferred responses are compared."
            },
            {
              "text": "The first input-cell membrane voltage",
              "feedback": "The first input-cell voltage is recorded at site one."
            },
            {
              "text": "The second input-cell membrane voltage",
              "feedback": "The second input-cell voltage is recorded at site two."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Recall the distinction in this section: electrotonic distance changes the trigger-zone signal."
            },
            {
              "body": "Use the stated passive-cable assumptions and identify the requested quantity or recording site."
            }
          ],
          "modelAnswer": [
            "Site three is the target trigger zone where transferred responses are compared."
          ]
        }
      ]
    },
    {
      "id": "return",
      "title": "Restricted extracellular return",
      "keyTerms": [
        "extracellular annulus"
      ],
      "source": "Exercise 4 p1–2; answers p1–2; L03 PDF12,14",
      "blocks": [
        {
          "type": "math",
          "items": [
            {
              "tex": "A_o=\\pi h(2a+h),\\qquad r_o=R_o/A_o,\\qquad \\lambda=\\sqrt{\\frac{r_m}{r_i+r_o}}"
            }
          ],
          "note": "Exercise 4 models a process of radius $a$ surrounded by a shell of thickness $h$. $R_o$ is extracellular resistivity, $r_o$ and $r_i$ are axial resistances per length, and $r_m$ is membrane resistance in the per-length cable convention."
        },
        {
          "type": "text",
          "body": [
            "A narrower shell raises $r_o$. Opening channels lowers $r_m$. Both shorten $\\lambda$ and increase $L=\\ell/\\lambda$. Check $L\\ll1$ to justify an approximately isopotential model."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Exercise 4, PDF page 1. Exercise source microvillar cross-section and annular geometry of the extracellular return path.",
            "fallbackAlt": "Exercise source microvillar cross-section and annular geometry of the extracellular return path.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L04/return.webp', import.meta.url).href,
              "alt": "Exercise source microvillar cross-section and annular geometry of the extracellular return path.",
              "aspect": 2.685483870967742,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L04-f-annulus",
          "name": "Extracellular annular area",
          "tex": "A_o=\\pi[(a+h)^2-a^2]",
          "symbols": [
            {
              "tex": "A_o",
              "name": "Return-path area",
              "unit": "m2",
              "meaning": "Return-path area in the stated model."
            },
            {
              "tex": "a",
              "name": "Core radius",
              "unit": "m",
              "meaning": "Core radius in the stated model."
            },
            {
              "tex": "h",
              "name": "Shell thickness",
              "unit": "m",
              "meaning": "Shell thickness in the stated model."
            }
          ],
          "reads": "The conducting return area is an annulus, not the whole outer disk.",
          "assumes": "Ideal concentric shell assigned to one cylindrical process.",
          "variants": [],
          "drill": {
            "prompt": "Use $a=4\\times10^{-8}\\,\\text{m}$ and $h=4\\times10^{-9}\\,\\text{m}$. Find return-path area.",
            "answer": {
              "value": 1.0555751316061697e-15,
              "unit": "m2",
              "tolerance": 3.166725394818509e-18,
              "verification": {
                "relation": "annulus",
                "inputs": {
                  "radius": 4e-8,
                  "shell": 4e-9
                },
                "displayScale": 1
              }
            },
            "tex": "A_o=\\pi[(44\\times10^{-9}\\,\\text{m})^2-(40\\times10^{-9}\\,\\text{m})^2]",
            "modelAnswer": [
              "The conducting return area is an annulus, not the whole outer disk.",
              "$1.0555751e-15\\,\\mathrm{m2}$"
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $A_o=\\pi[(a+h)^2-a^2]$."
              },
              {
                "body": "Start with $A_o=\\pi[(44\\times10^{-9}\\,\\text{m})^2-(40\\times10^{-9}\\,\\text{m})^2]$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{A_o}=\\pi[(\\htmlClass{formula-term-1}{a}+\\htmlClass{formula-term-2}{h})^2-\\htmlClass{formula-term-1}{a}^2]"
        },
        {
          "id": "L04-f-return-resistance",
          "name": "External axial resistance per length",
          "tex": "r_o=\\frac{R_o}{A_o}",
          "symbols": [
            {
              "tex": "r_o",
              "name": "External axial resistance per length",
              "unit": "ohm/m",
              "meaning": "External axial resistance per length in the stated model."
            },
            {
              "tex": "R_o",
              "name": "External resistivity",
              "unit": "ohm*m",
              "meaning": "External resistivity in the stated model."
            },
            {
              "tex": "A_o",
              "name": "Return-path area",
              "unit": "m2",
              "meaning": "Return-path area in the stated model."
            }
          ],
          "reads": "A small cross-section raises axial resistance even at unchanged material resistivity.",
          "assumes": "Uniform extracellular return path.",
          "variants": [],
          "drill": {
            "prompt": "Use $R_o=1.5\\,\\Omega\\,\\text{m}$ and $A_o=10^{-15}\\,\\text{m}^2$. Find $r_o$.",
            "answer": {
              "value": 1500000000000000,
              "unit": "ohm/m",
              "tolerance": 4500000000000,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 1.5,
                  "b": 1e-15
                },
                "displayScale": 1
              }
            },
            "tex": "r_o=(1.5\\,\\Omega\\,\\text{m})/(10^{-15}\\,\\text{m}^2)",
            "modelAnswer": [
              "A small cross-section raises axial resistance even at unchanged material resistivity.",
              "$1.5000000e+15\\,\\mathrm{ohm/m}$"
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $r_o=\\frac{R_o}{A_o}$."
              },
              {
                "body": "Start with $r_o=(1.5\\,\\Omega\\,\\text{m})/(10^{-15}\\,\\text{m}^2)$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{r_o}=\\frac{\\htmlClass{formula-term-1}{R_o}}{\\htmlClass{formula-term-2}{A_o}}"
        },
        {
          "id": "L04-f-external-length",
          "name": "Length constant with return resistance",
          "tex": "\\lambda=\\sqrt{\\frac{r_m}{r_i+r_o}}",
          "symbols": [
            {
              "tex": "\\lambda",
              "name": "Length constant",
              "unit": "m",
              "meaning": "Length constant in the stated model."
            },
            {
              "tex": "r_m",
              "name": "Membrane resistance-length",
              "unit": "ohm*m",
              "meaning": "Membrane resistance-length in the stated model."
            },
            {
              "tex": "r_i",
              "name": "Internal axial resistance per length",
              "unit": "ohm/m",
              "meaning": "Internal axial resistance per length in the stated model."
            },
            {
              "tex": "r_o",
              "name": "External axial resistance per length",
              "unit": "ohm/m",
              "meaning": "External axial resistance per length in the stated model."
            }
          ],
          "reads": "The return path adds to internal longitudinal resistance.",
          "assumes": "Uniform linear cable with explicit external return resistance.",
          "variants": [],
          "drill": {
            "prompt": "Use $r_m=8\\times10^6\\,\\Omega\\,\\text{m}$ and $r_i=r_o=4\\times10^{14}\\,\\Omega/\\text{m}$. Find $\\lambda$.",
            "answer": {
              "value": 0.0001,
              "unit": "m",
              "tolerance": 3.0000000000000004e-7,
              "verification": {
                "relation": "cableLength",
                "inputs": {
                  "rm": 8000000,
                  "ri": 400000000000000,
                  "ro": 400000000000000
                },
                "displayScale": 1
              }
            },
            "tex": "\\lambda=\\sqrt{(8\\times10^6\\,\\Omega\\,\\text{m})/(8\\times10^{14}\\,\\Omega/\\text{m})}",
            "modelAnswer": [
              "The return path adds to internal longitudinal resistance.",
              "$0.00010000000\\,\\mathrm{m}$"
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\lambda=\\sqrt{\\frac{r_m}{r_i+r_o}}$."
              },
              {
                "body": "Start with $\\lambda=\\sqrt{(8\\times10^6\\,\\Omega\\,\\text{m})/(8\\times10^{14}\\,\\Omega/\\text{m})}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{\\lambda}=\\sqrt{\\frac{\\htmlClass{formula-term-1}{r_m}}{\\htmlClass{formula-term-2}{r_i}+\\htmlClass{formula-term-3}{r_o}}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L04-return-check",
          "practice": "extra",
          "prompt": "Why can a narrow extracellular gap increase gradients?",
          "correct": 0,
          "options": [
            {
              "text": "A small return-path area raises axial resistance",
              "feedback": "Resistance per length divides material resistivity by cross-sectional area."
            },
            {
              "text": "A small return-path area lowers axial resistance",
              "feedback": "Reducing area raises resistance per length, even when material resistivity is unchanged."
            }
          ],
          "hints": [
            {
              "body": "Resistance per length divides resistivity by conducting area."
            },
            {
              "body": "A restricted conducting cross-section changes resistance even at equal material resistivity."
            }
          ],
          "modelAnswer": [
            "A small return-path area raises axial resistance."
          ]
        },
        {
          "id": "L04-return-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "Exercise 4 pages 1–2; answers pages 1–2",
          "prompt": "Which condition supports an approximately isopotential microvillus?",
          "options": [
            {
              "text": "Electrotonic length approximately one",
              "feedback": "A length comparable to the length constant can show substantial voltage gradients."
            },
            {
              "text": "Electrotonic length much smaller than one",
              "feedback": "A physically short segment relative to its length constant has little spatial voltage variation."
            },
            {
              "text": "Electrotonic length much larger than one",
              "feedback": "A long electrotonic segment can strongly attenuate voltage along its length."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Recall the distinction in this section: exercise extension: a restricted extracellular return path."
            },
            {
              "body": "Use the stated passive-cable assumptions and identify the requested quantity or recording site."
            }
          ],
          "modelAnswer": [
            "A physically short segment relative to its length constant has little spatial voltage variation."
          ]
        }
      ]
    }
  ],
  "recap": {
    "takeaways": ["Choose a lumped model only if voltage differences across the region can be neglected. Check linearity separately.", "At steady state a sealed tip has zero axial current. A shorted tip has zero voltage increment. A finite load links terminal current to voltage.", "Use the time constant for charging and the length constant for spatial reach. Add signed waveforms at the same site and time in the linear regime."],
    "intro": "Practice reference. Calculator and the official equation sheet are confirmed; open-book status and official problem weights are unconfirmed.",
    "terms": [
      {
        "term": "Characteristic passive velocity",
        "definition": "Taught half-rise-contour scale, distinct from active spike conduction."
      },
      {
        "term": "Electrotonic length",
        "definition": "Total physical length divided by spatial length constant."
      },
      {
        "term": "Input resistance",
        "definition": "Source voltage increment divided by total injected current."
      },
      {
        "term": "Sealed end",
        "definition": "Zero terminal conductance and zero axial current."
      },
      {
        "term": "Open cable end",
        "definition": "Short circuit to resting voltage, so response vanishes at the end."
      },
      {
        "term": "Matched terminal",
        "definition": "Conductance equal to one semi-infinite cable continuation."
      },
      {
        "term": "Linear superposition",
        "definition": "Signed sum of individual waveforms at the same observation site and instant."
      },
      {
        "term": "Temporal and spatial integration",
        "definition": "Combination of inputs distributed in time and across locations."
      },
      {
        "term": "Isopotential approximation",
        "definition": "A spatially nearly uniform voltage, requiring an electrotonically short structure."
      }
    ],
    "equations": [
      {
        "name": "Characteristic passive velocity",
        "tex": "\\theta=\\frac{2\\lambda}{\\tau_m}",
        "note": "Uniform infinite passive cable; taught half-rise-contour approximation."
      },
      {
        "name": "Taught half-rise contour",
        "tex": "x(t)=\\frac{2\\lambda t}{\\tau_m}-\\frac{\\lambda}{2}",
        "note": "Use only in the taught contour regime; do not extrapolate a negative front at time zero."
      },
      {
        "name": "Length constant from material parameters",
        "tex": "\\lambda=\\sqrt{\\frac{R_m a}{2R_i}}",
        "note": "Uniform cylinder, negligible external resistance."
      },
      {
        "name": "Local membrane time constant",
        "tex": "\\tau_m=R_mC_m",
        "note": "Uniform passive membrane with consistent area normalization."
      },
      {
        "name": "Passive speed ratio",
        "tex": "\\frac{\\theta_B}{\\theta_A}=\\sqrt{\\frac{d_B}{d_A}}",
        "note": "Only diameter differs; same passive material parameters."
      },
      {
        "name": "Electrotonic distance",
        "tex": "X=\\frac{x}{\\lambda}",
        "note": "Use consistent units and the correct spatial or temporal scale."
      },
      {
        "name": "Electrotonic cable length",
        "tex": "L=\\frac{\\ell}{\\lambda}",
        "note": "Use consistent units and the correct spatial or temporal scale."
      },
      {
        "name": "Electrotonic time",
        "tex": "T=\\frac{t}{\\tau_m}",
        "note": "Use consistent units and the correct spatial or temporal scale."
      },
      {
        "name": "Infinite-cable source and attenuation",
        "tex": "V(x)=\\frac{I_0r_i\\lambda}{2}e^{-|x|/\\lambda}",
        "note": "Infinite uniform cable, central current source, steady state."
      },
      {
        "name": "Infinite input resistance",
        "tex": "R_N=\\frac{r_i\\lambda}{2}",
        "note": "Steady uniform cable; negligible external resistance."
      },
      {
        "name": "Semi-infinite input resistance",
        "tex": "R_{semi}=r_i\\lambda",
        "note": "Steady uniform cable; negligible external resistance."
      },
      {
        "name": "Input resistance geometry ratio",
        "tex": "\\frac{R_{N,B}}{R_{N,A}}=\\left(\\frac{a_B}{a_A}\\right)^{-3/2}",
        "note": "Identical material properties and same infinite or semi-infinite geometry."
      },
      {
        "name": "One-arm reference conductance",
        "tex": "G_\\infty=\\frac{1}{r_i\\lambda}",
        "note": "Semi-infinite uniform cable at steady state."
      },
      {
        "name": "Dimensionless terminal load",
        "tex": "B_L=\\frac{G_e}{G_\\infty}",
        "note": "Passive terminal with stated reversal at rest."
      },
      {
        "name": "Loaded finite cable",
        "tex": "V(X)=V_0\\frac{\\cosh(L-X)+B_L\\sinh(L-X)}{\\cosh L+B_L\\sinh L}",
        "note": "Uniform finite passive cable, steady state, known origin voltage."
      },
      {
        "name": "Sealed finite profile",
        "tex": "V(X)=V_0\\frac{\\cosh(L-X)}{\\cosh L}",
        "note": "Steady uniform finite cable; zero end current."
      },
      {
        "name": "Open finite profile",
        "tex": "V(X)=V_0\\frac{\\sinh(L-X)}{\\sinh L}",
        "note": "Steady uniform finite cable; end voltage clamped to rest."
      },
      {
        "name": "Specified endpoint voltages",
        "tex": "V(X)=\\frac{V_0\\sinh(L-X)+V_e\\sinh X}{\\sinh L}",
        "note": "Steady uniform cable with compatible prescribed endpoint voltages."
      },
      {
        "name": "Linear waveform superposition",
        "tex": "V_{sum}(x,t)=V_1(x,t)+V_2(x,t)",
        "note": "Same linear passive system and additive current inputs."
      },
      {
        "name": "Extracellular annular area",
        "tex": "A_o=\\pi[(a+h)^2-a^2]",
        "note": "Ideal concentric shell assigned to one cylindrical process."
      },
      {
        "name": "External axial resistance per length",
        "tex": "r_o=\\frac{R_o}{A_o}",
        "note": "Uniform extracellular return path."
      },
      {
        "name": "Length constant with return resistance",
        "tex": "\\lambda=\\sqrt{\\frac{r_m}{r_i+r_o}}",
        "note": "Uniform linear cable with explicit external return resistance."
      },
      {
        "name": "Normalized steady cable equation",
        "tex": "\\partial_X^2V-V=0",
        "note": "Steady uniform source-free interval."
      },
      {
        "name": "General hyperbolic solution",
        "tex": "V=C_1\\cosh(L-X)+C_2\\sinh(L-X)",
        "note": "Coefficients follow from compatible boundary conditions."
      },
      {
        "name": "Normalized axial gradient",
        "tex": "\\partial_XV=-r_i\\lambda i_{axial}",
        "note": "The slide omits the length factor; zero slope remains correct at a sealed end."
      }
    ],
    "constants": [
      {
        "name": "Geometry conventions",
        "tex": "a=d/2,\\quad A_i=\\pi a^2,\\quad r_i=R_i/A_i,\\quad r_m=R_m/(2\\pi a)"
      }
    ],
    "conventions": [
      "$V_m=V_{in}-V_{out}$, with $V_{out}=0$; $V=V_m-V_{rest}$ in cable solutions.",
      "Positive ionic membrane current is outward; positive supplied current here is depolarizing.",
      "Open cable end means electrical short circuit; sealed cable end means electrical open circuit.",
      "Hold origin voltage fixed when comparing normalized attenuation; equal injected current is a different comparison.",
      "Use one semi-infinite arm, not a two-sided cable, to define the terminal load reference.",
      "$\\sinh(-X)=-\\sinh X$; $\\cosh(-X)=\\cosh X$.",
      "Source trace timing error is explicitly flagged; no numeric latency is inferred from uncalibrated schematics.",
      "Practice numerical scenarios are authored idealizations, not fabricated experimental or NEURON recordings."
    ]
  },
  "lectureQuiz": [
    {
      "id": "L04-overview-recall",
      "sectionId": "overview",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "A passive signal may become smaller and broader as it travels.",
          "answer": true
        },
        {
          "text": "A passive cable regenerates every small input as a spike.",
          "answer": false,
          "correction": "Passive spread does not regenerate spikes; active membrane properties are needed."
        },
        {
          "text": "Cable voltage here is measured relative to resting voltage.",
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
        "A passive signal may become smaller and broader as it travels.",
        "Passive spread does not regenerate spikes; active membrane properties are needed.",
        "Cable voltage here is measured relative to resting voltage."
      ],
      "points": 1,
      "source": "L04 PDF 1"
    },
    {
      "id": "L04-direct-speed",
      "sectionId": "speed",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $\\lambda=0.0012\\,\\text{m}$ and $\\tau_m=0.024\\,\\text{s}$. Find $\\theta$.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Length constant",
              "answer": {
                "value": 0.0012,
                "unit": "m",
                "tolerance": 1.1999999999999998e-9,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.0012,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Time constant",
              "answer": {
                "value": 0.024,
                "unit": "s",
                "tolerance": 2.4e-8,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.024,
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
                "lambda": 0.0012,
                "tau": 0.024
              },
              "displayScale": 1
            }
          },
          "tex": "\\theta=\\frac{2\\lambda}{\\tau_m}",
          "modelAnswer": [
            "More spatial reach and faster relaxation raise the characteristic speed.",
            "$\\theta=2(0.0012\\,\\text{m})/(0.024\\,\\text{s})$",
            "$2(0.0012\\,\\mathrm{m})/(0.024\\,\\mathrm{s})$",
            "$0.1\\,\\text{m/s}$"
          ]
        },
        {
          "title": "Plausibility and assumptions",
          "choices": [
            {
              "label": "Increasing the time constant reduces characteristic speed at fixed length constant."
            },
            {
              "label": "Increasing the time constant raises characteristic speed at fixed length constant."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Increasing the time constant reduces characteristic speed at fixed length constant."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\theta=\\frac{2\\lambda}{\\tau_m}$."
        },
        {
          "body": "Start with $\\theta=2(0.0012\\,\\text{m})/(0.024\\,\\text{s})$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "More spatial reach and faster relaxation raise the characteristic speed."
      ],
      "points": 1,
      "source": "L04 PDF 2"
    },
    {
      "id": "L04-direct-position",
      "sectionId": "speed",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $\\lambda=0.001\\,\\text{m}$, $\\tau_m=0.02\\,\\text{s}$ and $t=0.03\\,\\text{s}$. Evaluate the taught contour position.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Length constant",
              "answer": {
                "value": 0.001,
                "unit": "m",
                "tolerance": 1e-9,
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
                "value": 0.03,
                "unit": "s",
                "tolerance": 3e-8,
                "verification": {
                  "relation": "ratio",
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
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 0.0025,
            "unit": "m",
            "tolerance": 0.0000075,
            "verification": {
              "relation": "passivePosition",
              "inputs": {
                "lambda": 0.001,
                "tau": 0.02,
                "time": 0.03
              },
              "displayScale": 1
            }
          },
          "tex": "x(t)=\\frac{2\\lambda t}{\\tau_m}-\\frac{\\lambda}{2}",
          "modelAnswer": [
            "The characteristic contour advances approximately linearly with time.",
            "$x=2(0.001\\,\\text{m})(0.03\\,\\text{s})/(0.02\\,\\text{s})-0.001\\,\\text{m}/2$",
            "$2(0.001\\,\\mathrm{m})(0.03\\,\\mathrm{s})/(0.02\\,\\mathrm{s})-(0.001\\,\\mathrm{m})/2$",
            "$0.0025\\,\\text{m}$"
          ]
        },
        {
          "title": "Plausibility and assumptions",
          "choices": [
            {
              "label": "The affine contour is a taught approximation with a restricted interpretation."
            },
            {
              "label": "The affine contour is an exact sharp wavefront starting at the origin at all times."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The affine contour is a taught approximation with a restricted interpretation."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $x(t)=\\frac{2\\lambda t}{\\tau_m}-\\frac{\\lambda}{2}$."
        },
        {
          "body": "Start with $x=2(0.001\\,\\text{m})(0.03\\,\\text{s})/(0.02\\,\\text{s})-0.001\\,\\text{m}/2$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "The characteristic contour advances approximately linearly with time."
      ],
      "points": 1,
      "source": "L04 PDF 2"
    },
    {
      "id": "L04-direct-length",
      "sectionId": "scaling",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $R_m=2\\,\\Omega\\,\\text{m}^2$, $a=10^{-6}\\,\\text{m}$ and $R_i=1\\,\\Omega\\,\\text{m}$. Find $\\lambda$.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Radius",
              "answer": {
                "value": 0.000001,
                "unit": "m",
                "tolerance": 1e-12,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.000001,
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
                "tolerance": 0.000002,
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
            "tolerance": 0.000003,
            "verification": {
              "relation": "cableLength",
              "inputs": {
                "rm": 318309.8861837907,
                "ri": 318309886183.7907
              },
              "displayScale": 1
            }
          },
          "tex": "\\lambda=\\sqrt{\\frac{R_m a}{2R_i}}",
          "modelAnswer": [
            "Increasing radius raises spatial spread at fixed material parameters.",
            "$\\lambda=\\sqrt{(2\\,\\Omega\\,\\text{m}^2)(10^{-6}\\,\\text{m})/(2\\,\\Omega\\,\\text{m})}$",
            "$\\sqrt{(318309.886\\,\\mathrm{ohm\\,m})/[(3.18309886e+11\\,\\mathrm{ohm/m})+(0\\,\\mathrm{ohm/m})]}$",
            "$0.001\\,\\text{m}$"
          ]
        },
        {
          "title": "Plausibility and assumptions",
          "choices": [
            {
              "label": "A radius increase raises length constant at fixed material properties."
            },
            {
              "label": "A radius increase lowers length constant at fixed material properties."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "A radius increase raises length constant at fixed material properties."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\lambda=\\sqrt{\\frac{R_m a}{2R_i}}$."
        },
        {
          "body": "Start with $\\lambda=\\sqrt{(2\\,\\Omega\\,\\text{m}^2)(10^{-6}\\,\\text{m})/(2\\,\\Omega\\,\\text{m})}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Increasing radius raises spatial spread at fixed material parameters."
      ],
      "points": 1,
      "source": "L04 PDF 3"
    },
    {
      "id": "L04-direct-tau",
      "practice": "extra",
      "sectionId": "scaling",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $R_m=1.8\\,\\Omega\\,\\text{m}^2$ and $C_m=0.01\\,\\text{F/m}^2$. Find $\\tau_m$.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Specific resistance",
              "answer": {
                "value": 1.8,
                "unit": "ohm*m2",
                "tolerance": 0.0000018,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1.8,
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
                "tolerance": 1e-8,
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
            "value": 0.018,
            "unit": "s",
            "tolerance": 0.000054,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 1.8,
                "b": 0.01
              },
              "displayScale": 1
            }
          },
          "tex": "\\tau_m=R_mC_m",
          "modelAnswer": [
            "The local time product cancels cylinder geometry.",
            "$\\tau_m=(1.8\\,\\Omega\\,\\text{m}^2)(0.01\\,\\text{F/m}^2)$",
            "$0.018\\,\\text{s}$"
          ]
        },
        {
          "title": "Plausibility and assumptions",
          "choices": [
            {
              "label": "Diameter changes alone leave the local time product unchanged."
            },
            {
              "label": "Diameter changes alone multiply the local time product by radius."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Diameter changes alone leave the local time product unchanged."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\tau_m=R_mC_m$."
        },
        {
          "body": "Start with $\\tau_m=(1.8\\,\\Omega\\,\\text{m}^2)(0.01\\,\\text{F/m}^2)$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "The local time product cancels cylinder geometry."
      ],
      "points": 1,
      "source": "L04 PDF 3"
    },
    {
      "id": "L04-direct-size-ratio",
      "sectionId": "scaling",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Cables B and A have diameter ratio $9$. Find the passive speed ratio.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Diameter ratio",
              "answer": {
                "value": 9,
                "unit": "",
                "tolerance": 0.000009,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 9,
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
                "a": 9,
                "b": 1,
                "power": 0.5
              },
              "displayScale": 1
            }
          },
          "tex": "\\frac{\\theta_B}{\\theta_A}=\\sqrt{\\frac{d_B}{d_A}}",
          "modelAnswer": [
            "Speed scales with square root of diameter, not diameter itself.",
            "$\\theta_B/\\theta_A=\\sqrt{9}$",
            "$((9)/(1))^{0.5}$",
            "$3\\,\\text{}$"
          ]
        },
        {
          "title": "Plausibility and assumptions",
          "choices": [
            {
              "label": "The speed ratio equals the square root of the diameter ratio."
            },
            {
              "label": "The speed ratio equals the diameter ratio without a square root."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The speed ratio equals the square root of the diameter ratio."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\frac{\\theta_B}{\\theta_A}=\\sqrt{\\frac{d_B}{d_A}}$."
        },
        {
          "body": "Start with $\\theta_B/\\theta_A=\\sqrt{9}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Speed scales with square root of diameter, not diameter itself."
      ],
      "points": 1,
      "source": "L04 PDF 3"
    },
    {
      "id": "L04-direct-distance",
      "sectionId": "coordinates",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $x=0.0009\\,\\text{m}$ and $\\lambda=0.0006\\,\\text{m}$. Find $X$.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Numerator",
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
              "label": "Scale",
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
                "a": 0.0009,
                "b": 0.0006
              },
              "displayScale": 1
            }
          },
          "tex": "X=\\frac{x}{\\lambda}",
          "modelAnswer": [
            "Normalization compares a dimensional quantity with its characteristic scale.",
            "$X=(0.0009\\,\\text{m})/(0.0006\\,\\text{m})$",
            "$1.5\\,\\text{}$"
          ]
        },
        {
          "title": "Plausibility and assumptions",
          "choices": [
            {
              "label": "The resulting ratio is dimensionless and identifies one observation site."
            },
            {
              "label": "The resulting ratio has length units and describes the entire cable."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The resulting ratio is dimensionless and identifies one observation site."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $X=\\frac{x}{\\lambda}$."
        },
        {
          "body": "Start with $X=(0.0009\\,\\text{m})/(0.0006\\,\\text{m})$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Normalization compares a dimensional quantity with its characteristic scale."
      ],
      "points": 1,
      "source": "L04 PDF 5"
    },
    {
      "id": "L04-direct-total-length",
      "practice": "extra",
      "sectionId": "coordinates",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $\\ell=0.0012\\,\\text{m}$ and $\\lambda=0.0004\\,\\text{m}$. Find $L$.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Numerator",
              "answer": {
                "value": 0.0012,
                "unit": "m",
                "tolerance": 1.1999999999999998e-9,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.0012,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Scale",
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
                "a": 0.0012,
                "b": 0.0004
              },
              "displayScale": 1
            }
          },
          "tex": "L=\\frac{\\ell}{\\lambda}",
          "modelAnswer": [
            "Normalization compares a dimensional quantity with its characteristic scale.",
            "$L=(0.0012\\,\\text{m})/(0.0004\\,\\text{m})$",
            "$3\\,\\text{}$"
          ]
        },
        {
          "title": "Plausibility and assumptions",
          "choices": [
            {
              "label": "A long cable can still show boundary effects close to its endpoint."
            },
            {
              "label": "A long cable has no boundary effects even immediately beside its endpoint."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "A long cable can still show boundary effects close to its endpoint."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $L=\\frac{\\ell}{\\lambda}$."
        },
        {
          "body": "Start with $L=(0.0012\\,\\text{m})/(0.0004\\,\\text{m})$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Normalization compares a dimensional quantity with its characteristic scale."
      ],
      "points": 1,
      "source": "L04 PDF 5"
    },
    {
      "id": "L04-direct-time",
      "sectionId": "coordinates",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $t=0.03\\,\\text{s}$ and $\\tau_m=0.012\\,\\text{s}$. Find $T$.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Numerator",
              "answer": {
                "value": 0.03,
                "unit": "s",
                "tolerance": 3e-8,
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
              "label": "Scale",
              "answer": {
                "value": 0.012,
                "unit": "s",
                "tolerance": 1.2e-8,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.012,
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
            "value": 2.5,
            "unit": "",
            "tolerance": 0.0075,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 0.03,
                "b": 0.012
              },
              "displayScale": 1
            }
          },
          "tex": "T=\\frac{t}{\\tau_m}",
          "modelAnswer": [
            "Normalization compares a dimensional quantity with its characteristic scale.",
            "$T=(0.03\\,\\text{s})/(0.012\\,\\text{s})$",
            "$2.5\\,\\text{}$"
          ]
        },
        {
          "title": "Plausibility and assumptions",
          "choices": [
            {
              "label": "Normalized time compares elapsed time with membrane time constant."
            },
            {
              "label": "Normalized time compares elapsed time with the cable length constant."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Normalized time compares elapsed time with membrane time constant."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $T=\\frac{t}{\\tau_m}$."
        },
        {
          "body": "Start with $T=(0.03\\,\\text{s})/(0.012\\,\\text{s})$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Normalization compares a dimensional quantity with its characteristic scale."
      ],
      "points": 1,
      "source": "L04 PDF 5"
    },
    {
      "id": "L04-direct-source-voltage",
      "sectionId": "infinite",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $I_0=10^{-10}\\,\\text{A}$, $r_i=2\\times10^{11}\\,\\Omega/\\text{m}$, $\\lambda=0.0005\\,\\text{m}$ and $x=-0.0005\\,\\text{m}$. Find the increment.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Injected current",
              "answer": {
                "value": 1e-10,
                "unit": "A",
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
              "label": "Signed position",
              "answer": {
                "value": -0.0005,
                "unit": "m",
                "tolerance": 5e-10,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -0.0005,
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
            "value": 0.0018393972058572117,
            "unit": "V",
            "tolerance": 0.000005518191617571635,
            "verification": {
              "relation": "infiniteCable",
              "inputs": {
                "current": 1e-10,
                "ri": 200000000000,
                "lambda": 0.0005,
                "x": -0.0005
              }
            }
          },
          "tex": "V(x)=\\frac{I_0r_i\\lambda}{2}e^{-|x|/\\lambda}",
          "modelAnswer": [
            "The same injected current supports two symmetric arms.",
            "$V=(I_0r_i\\lambda/2)e^{-1}$",
            "$(0.005\\,\\mathrm{V})\\exp[-|(-0.0005)|/(0.0005\\,\\mathrm{m})]$",
            "$0.0018393972\\,\\text{V}$"
          ]
        },
        {
          "title": "Plausibility and assumptions",
          "choices": [
            {
              "label": "Equal absolute distances have the same signed increment."
            },
            {
              "label": "Negative positions reverse the sign of the source voltage increment."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Equal absolute distances have the same signed increment."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $V(x)=\\frac{I_0r_i\\lambda}{2}e^{-|x|/\\lambda}$."
        },
        {
          "body": "Start with $V=(I_0r_i\\lambda/2)e^{-1}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "The same injected current supports two symmetric arms."
      ],
      "points": 1,
      "source": "L04 PDF 6"
    },
    {
      "id": "L04-direct-input-infinite",
      "sectionId": "input",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $r_i=10^{11}\\,\\Omega/\\text{m}$ and $\\lambda=0.0008\\,\\text{m}$. Find the infinite input resistance.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Axial resistance per length",
              "answer": {
                "value": 100000000000,
                "unit": "ohm/m",
                "tolerance": 100000,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 100000000000,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Length constant",
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
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 40000000,
            "unit": "ohm",
            "tolerance": 120000,
            "verification": {
              "relation": "cableInput",
              "inputs": {
                "ri": 100000000000,
                "lambda": 0.0008,
                "sides": 2
              },
              "displayScale": 1
            }
          },
          "tex": "R_N=\\frac{r_i\\lambda}{2}",
          "modelAnswer": [
            "The number of available cable arms sets the source current division.",
            "$R=r_i\\lambda/2$",
            "$(1e+11\\,\\mathrm{ohm/m})(0.0008\\,\\mathrm{m})/2$",
            "$40000000\\,\\text{ohm}$"
          ]
        },
        {
          "title": "Plausibility and assumptions",
          "choices": [
            {
              "label": "The central source supplies two longitudinal arms in parallel."
            },
            {
              "label": "The central source supplies two longitudinal arms in series."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The central source supplies two longitudinal arms in parallel."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $R_N=\\frac{r_i\\lambda}{2}$."
        },
        {
          "body": "Start with $R=r_i\\lambda/2$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "The number of available cable arms sets the source current division."
      ],
      "points": 1,
      "source": "L04 PDF 7"
    },
    {
      "id": "L04-direct-input-semi",
      "sectionId": "input",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $r_i=10^{11}\\,\\Omega/\\text{m}$ and $\\lambda=0.0008\\,\\text{m}$. Find the semi-infinite input resistance.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Axial resistance per length",
              "answer": {
                "value": 100000000000,
                "unit": "ohm/m",
                "tolerance": 100000,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 100000000000,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Length constant",
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
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 80000000,
            "unit": "ohm",
            "tolerance": 240000,
            "verification": {
              "relation": "cableInput",
              "inputs": {
                "ri": 100000000000,
                "lambda": 0.0008,
                "sides": 1
              },
              "displayScale": 1
            }
          },
          "tex": "R_{semi}=r_i\\lambda",
          "modelAnswer": [
            "The number of available cable arms sets the source current division.",
            "$R=r_i\\lambda/1$",
            "$(1e+11\\,\\mathrm{ohm/m})(0.0008\\,\\mathrm{m})/1$",
            "$80000000\\,\\text{ohm}$"
          ]
        },
        {
          "title": "Plausibility and assumptions",
          "choices": [
            {
              "label": "The end source supplies one arm, so input resistance is higher."
            },
            {
              "label": "The end source supplies one arm, so input resistance is lower."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The end source supplies one arm, so input resistance is higher."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $R_{semi}=r_i\\lambda$."
        },
        {
          "body": "Start with $R=r_i\\lambda/1$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "The number of available cable arms sets the source current division."
      ],
      "points": 1,
      "source": "L04 PDF 7"
    },
    {
      "id": "L04-direct-input-ratio",
      "sectionId": "input",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "B has four times A’s radius. Find the ratio of B to A input resistance.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Radius ratio",
              "answer": {
                "value": 4,
                "unit": "",
                "tolerance": 0.000004,
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
            "value": 0.125,
            "unit": "",
            "tolerance": 0.000375,
            "verification": {
              "relation": "powerRatio",
              "inputs": {
                "a": 4,
                "b": 1,
                "power": -1.5
              },
              "displayScale": 1
            }
          },
          "tex": "\\frac{R_{N,B}}{R_{N,A}}=\\left(\\frac{a_B}{a_A}\\right)^{-3/2}",
          "modelAnswer": [
            "Larger radius lowers cable input resistance by a three-halves power.",
            "$R_{N,B}/R_{N,A}=4^{-3/2}$",
            "$((4)/(1))^{-1.5}$",
            "$0.125\\,\\text{}$"
          ]
        },
        {
          "title": "Plausibility and assumptions",
          "choices": [
            {
              "label": "A thicker cable has lower input resistance for the same arm geometry."
            },
            {
              "label": "A thicker cable has higher input resistance for the same arm geometry."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "A thicker cable has lower input resistance for the same arm geometry."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\frac{R_{N,B}}{R_{N,A}}=\\left(\\frac{a_B}{a_A}\\right)^{-3/2}$."
        },
        {
          "body": "Start with $R_{N,B}/R_{N,A}=4^{-3/2}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Larger radius lowers cable input resistance by a three-halves power."
      ],
      "points": 1,
      "source": "L04 PDF 7"
    },
    {
      "id": "L04-end-recall",
      "sectionId": "ends",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "A sealed end has $G_e=0$.",
          "answer": true
        },
        {
          "text": "An open cable end means infinite electrical terminal resistance.",
          "answer": false,
          "correction": "An open cable end is a short circuit with near-zero resistance; sealed means electrical open circuit."
        },
        {
          "text": "At a sealed end $\\partial_XV=0$.",
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
        "A sealed end has $G_e=0$.",
        "An open cable end is a short circuit with near-zero resistance; sealed means electrical open circuit.",
        "At a sealed end $\\partial_XV=0$."
      ],
      "points": 1,
      "source": "L04 PDF 9"
    },
    {
      "id": "L04-direct-conductance",
      "practice": "extra",
      "sectionId": "load",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "A one-arm input resistance is $5\\times10^7\\,\\Omega$. Find its input conductance.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "One-arm resistance",
              "answer": {
                "value": 50000000,
                "unit": "ohm",
                "tolerance": 50,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 50000000,
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
            "value": 2e-8,
            "unit": "S",
            "tolerance": 6e-11,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 1,
                "b": 50000000
              },
              "displayScale": 1
            }
          },
          "tex": "G_\\infty=\\frac{1}{r_i\\lambda}",
          "modelAnswer": [
            "The reference is reciprocal of one-arm input resistance.",
            "$G_\\infty=1/(5\\times10^7\\,\\Omega)$",
            "$2e-08\\,\\text{S}$"
          ]
        },
        {
          "title": "Plausibility and assumptions",
          "choices": [
            {
              "label": "The load reference uses the conductance of one semi-infinite arm."
            },
            {
              "label": "The load reference uses the conductance of a two-sided source."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The load reference uses the conductance of one semi-infinite arm."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $G_\\infty=\\frac{1}{r_i\\lambda}$."
        },
        {
          "body": "Start with $G_\\infty=1/(5\\times10^7\\,\\Omega)$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "The reference is reciprocal of one-arm input resistance."
      ],
      "points": 1,
      "source": "L04 PDF 11"
    },
    {
      "id": "L04-direct-load",
      "sectionId": "load",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $G_e=6\\times10^{-8}\\,\\text{S}$ and $G_\\infty=2\\times10^{-8}\\,\\text{S}$. Find the load ratio.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Terminal conductance",
              "answer": {
                "value": 6e-8,
                "unit": "S",
                "tolerance": 6e-14,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 6e-8,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Reference conductance",
              "answer": {
                "value": 2e-8,
                "unit": "S",
                "tolerance": 2e-14,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 2e-8,
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
                "a": 6e-8,
                "b": 2e-8
              },
              "displayScale": 1
            }
          },
          "tex": "B_L=\\frac{G_e}{G_\\infty}",
          "modelAnswer": [
            "A larger terminal conductance draws more end current.",
            "$B_L=(6\\times10^{-8}\\,\\text{S})/(2\\times10^{-8}\\,\\text{S})$",
            "$3\\,\\text{}$"
          ]
        },
        {
          "title": "Plausibility and assumptions",
          "choices": [
            {
              "label": "A load ratio above the matched value draws more terminal current."
            },
            {
              "label": "A load ratio above the matched value approaches a sealed terminal."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "A load ratio above the matched value draws more terminal current."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $B_L=\\frac{G_e}{G_\\infty}$."
        },
        {
          "body": "Start with $B_L=(6\\times10^{-8}\\,\\text{S})/(2\\times10^{-8}\\,\\text{S})$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "A larger terminal conductance draws more end current."
      ],
      "points": 1,
      "source": "L04 PDF 11"
    },
    {
      "id": "L04-direct-finite",
      "sectionId": "finite",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $V_0=0.01\\,\\text{V}$, $L=1$, $X=0.5$ and $B_L=2$. Find $V(X)$.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Origin voltage",
              "answer": {
                "value": 0.01,
                "unit": "V",
                "tolerance": 1e-8,
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
              "label": "Total length",
              "answer": {
                "value": 1,
                "unit": "",
                "tolerance": 0.000001,
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
              "label": "Position",
              "answer": {
                "value": 0.5,
                "unit": "",
                "tolerance": 5e-7,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.5,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Load ratio",
              "answer": {
                "value": 2,
                "unit": "",
                "tolerance": 0.000002,
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
            "value": 0.0055729447486378685,
            "unit": "V",
            "tolerance": 0.000016718834245913607,
            "verification": {
              "relation": "finiteCable",
              "inputs": {
                "v": 0.01,
                "length": 1,
                "x": 0.5,
                "load": 2,
                "mode": "load"
              },
              "displayScale": 1
            }
          },
          "tex": "V(X)=V_0\\frac{\\cosh(L-X)+B_L\\sinh(L-X)}{\\cosh L+B_L\\sinh L}",
          "modelAnswer": [
            "The boundary load changes attenuation even when the material length constant is unchanged.",
            "$V=0.01\\,\\text{V}\\frac{\\cosh(0.5)+2\\sinh(0.5)}{\\cosh(1)+2\\sinh(1)}$",
            "$(0.01\\,\\mathrm{V})\\frac{\\cosh((1)-(0.5))+(2)\\sinh((1)-(0.5))}{\\cosh((1))+(2)\\sinh((1))}$",
            "$0.0055729447\\,\\text{V}$"
          ]
        },
        {
          "title": "Plausibility and assumptions",
          "choices": [
            {
              "label": "Changing load at equal current can also change the origin voltage."
            },
            {
              "label": "Changing load at equal current must preserve the origin voltage."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Changing load at equal current can also change the origin voltage."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $V(X)=V_0\\frac{\\cosh(L-X)+B_L\\sinh(L-X)}{\\cosh L+B_L\\sinh L}$."
        },
        {
          "body": "Start with $V=0.01\\,\\text{V}\\frac{\\cosh(0.5)+2\\sinh(0.5)}{\\cosh(1)+2\\sinh(1)}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "The boundary load changes attenuation even when the material length constant is unchanged."
      ],
      "points": 1,
      "source": "L04 PDF 11"
    },
    {
      "id": "L04-direct-sealed",
      "sectionId": "cases",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $V_0=0.01\\,\\text{V}$, $L=1$ and $X=0.5$. Find the sealed-end profile voltage.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Origin voltage",
              "answer": {
                "value": 0.01,
                "unit": "V",
                "tolerance": 1e-8,
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
              "label": "Length",
              "answer": {
                "value": 1,
                "unit": "",
                "tolerance": 0.000001,
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
              "label": "Position",
              "answer": {
                "value": 0.5,
                "unit": "",
                "tolerance": 5e-7,
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
            "value": 0.007307628258463588,
            "unit": "V",
            "tolerance": 0.000021922884775390764,
            "verification": {
              "relation": "finiteCable",
              "inputs": {
                "v": 0.01,
                "length": 1,
                "x": 0.5,
                "load": 0,
                "mode": "load"
              },
              "displayScale": 1
            }
          },
          "tex": "V(X)=V_0\\frac{\\cosh(L-X)}{\\cosh L}",
          "modelAnswer": [
            "The endpoint condition selects a different hyperbolic ratio.",
            "$V=0.01\\,\\text{V}\\frac{cosh(0.5)}{cosh(1)}$",
            "$(0.01\\,\\mathrm{V})\\frac{\\cosh((1)-(0.5))+(0)\\sinh((1)-(0.5))}{\\cosh((1))+(0)\\sinh((1))}$",
            "$0.0073076283\\,\\text{V}$"
          ]
        },
        {
          "title": "Plausibility and assumptions",
          "choices": [
            {
              "label": "The endpoint slope vanishes while voltage can remain nonzero."
            },
            {
              "label": "The endpoint voltage vanishes while slope can remain nonzero."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The endpoint slope vanishes while voltage can remain nonzero."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $V(X)=V_0\\frac{\\cosh(L-X)}{\\cosh L}$."
        },
        {
          "body": "Start with $V=0.01\\,\\text{V}\\frac{cosh(0.5)}{cosh(1)}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "The endpoint condition selects a different hyperbolic ratio."
      ],
      "points": 1,
      "source": "L04 PDF11–12"
    },
    {
      "id": "L04-direct-open",
      "sectionId": "cases",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $V_0=0.01\\,\\text{V}$, $L=1$ and $X=0.5$. Find the open-end profile voltage.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Origin voltage",
              "answer": {
                "value": 0.01,
                "unit": "V",
                "tolerance": 1e-8,
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
              "label": "Length",
              "answer": {
                "value": 1,
                "unit": "",
                "tolerance": 0.000001,
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
              "label": "Position",
              "answer": {
                "value": 0.5,
                "unit": "",
                "tolerance": 5e-7,
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
            "value": 0.00443409441985037,
            "unit": "V",
            "tolerance": 0.00001330228325955111,
            "verification": {
              "relation": "finiteCable",
              "inputs": {
                "v": 0.01,
                "length": 1,
                "x": 0.5,
                "load": 0,
                "mode": "open"
              },
              "displayScale": 1
            }
          },
          "tex": "V(X)=V_0\\frac{\\sinh(L-X)}{\\sinh L}",
          "modelAnswer": [
            "The endpoint condition selects a different hyperbolic ratio.",
            "$V=0.01\\,\\text{V}\\frac{sinh(0.5)}{sinh(1)}$",
            "$(0.01\\,\\mathrm{V})\\frac{\\sinh((1)-(0.5))}{\\sinh((1))}$",
            "$0.0044340944\\,\\text{V}$"
          ]
        },
        {
          "title": "Plausibility and assumptions",
          "choices": [
            {
              "label": "The endpoint voltage increment vanishes at the short circuit."
            },
            {
              "label": "The endpoint axial current vanishes at the short circuit."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The endpoint voltage increment vanishes at the short circuit."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $V(X)=V_0\\frac{\\sinh(L-X)}{\\sinh L}$."
        },
        {
          "body": "Start with $V=0.01\\,\\text{V}\\frac{sinh(0.5)}{sinh(1)}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "The endpoint condition selects a different hyperbolic ratio."
      ],
      "points": 1,
      "source": "L04 PDF11–12"
    },
    {
      "id": "L04-cases-recall",
      "sectionId": "cases",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "A matched load gives $V(X)=V_0e^{-X}$.",
          "answer": true
        },
        {
          "text": "A sealed end loses all its voltage at the endpoint.",
          "answer": false,
          "correction": "A sealed end has zero axial current, not generally zero endpoint voltage."
        },
        {
          "text": "At equal origin voltage a sealed finite cable attenuates less than a matched continuation.",
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
        "A matched load gives $V(X)=V_0e^{-X}$.",
        "A sealed end has zero axial current, not generally zero endpoint voltage.",
        "At equal origin voltage a sealed finite cable attenuates less than a matched continuation."
      ],
      "points": 1,
      "source": "L04 PDF11–12"
    },
    {
      "id": "L04-direct-endpoint",
      "practice": "extra",
      "sectionId": "endpoint",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $V_0=0.01\\,\\text{V}$, $V_e=-0.002\\,\\text{V}$, $L=1$, $X=0.5$. Find the interior increment.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Origin voltage",
              "answer": {
                "value": 0.01,
                "unit": "V",
                "tolerance": 1e-8,
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
              "label": "End voltage",
              "answer": {
                "value": -0.002,
                "unit": "V",
                "tolerance": 2e-9,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -0.002,
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
            "value": 0.0035472755358802958,
            "unit": "V",
            "tolerance": 0.000010641826607640887,
            "verification": {
              "relation": "endpointCable",
              "inputs": {
                "v0": 0.01,
                "ve": -0.002,
                "length": 1,
                "x": 0.5
              },
              "displayScale": 1
            }
          },
          "tex": "V(X)=\\frac{V_0\\sinh(L-X)+V_e\\sinh X}{\\sinh L}",
          "modelAnswer": [
            "Two boundary voltages select the steady interior profile.",
            "$V=\\frac{(0.01\\,\\text{V})\\sinh(0.5)-(0.002\\,\\text{V})\\sinh(0.5)}{\\sinh(1)}$",
            "$\\frac{(0.01\\,\\mathrm{V})\\sinh((0.5))+(-0.002\\,\\mathrm{V})\\sinh((0.5))}{\\sinh((1))}$",
            "$0.0035472755\\,\\text{V}$"
          ]
        },
        {
          "title": "Plausibility and assumptions",
          "choices": [
            {
              "label": "Both specified voltages must be compatible with any terminal current condition."
            },
            {
              "label": "Both specified voltages may be assigned independently of any terminal current condition."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Both specified voltages must be compatible with any terminal current condition."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $V(X)=\\frac{V_0\\sinh(L-X)+V_e\\sinh X}{\\sinh L}$."
        },
        {
          "body": "Start with $V=\\frac{(0.01\\,\\text{V})\\sinh(0.5)-(0.002\\,\\text{V})\\sinh(0.5)}{\\sinh(1)}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Two boundary voltages select the steady interior profile."
      ],
      "points": 1,
      "source": "L04 PDF 11"
    },
    {
      "id": "L04-synapse-recall",
      "sectionId": "synapses",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "Dendrites can attenuate and delay synaptic responses.",
          "answer": true
        },
        {
          "text": "Every single synaptic activation is incapable of causing a spike in any cell.",
          "answer": false,
          "correction": "A typical single input is weak; the universal claim is not justified."
        },
        {
          "text": "A presynaptic spike train can become a graded postsynaptic signal.",
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
        "Dendrites can attenuate and delay synaptic responses.",
        "A typical single input is weak; the universal claim is not justified.",
        "A presynaptic spike train can become a graded postsynaptic signal."
      ],
      "points": 1,
      "source": "L04 PDF 14"
    },
    {
      "id": "L04-direct-sum",
      "sectionId": "superposition",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "At one recording site and instant, separate increments are $0.004\\,\\text{V}$ and $-0.0015\\,\\text{V}$. Find their linear sum.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "First increment",
              "answer": {
                "value": 0.004,
                "unit": "V",
                "tolerance": 4e-9,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.004,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Second increment",
              "answer": {
                "value": -0.0015,
                "unit": "V",
                "tolerance": 1.5e-9,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -0.0015,
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
            "value": 0.0025,
            "unit": "V",
            "tolerance": 0.0000075,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": 0.004,
                "b": -0.0015
              },
              "displayScale": 1
            }
          },
          "tex": "V_{sum}(x,t)=V_1(x,t)+V_2(x,t)",
          "modelAnswer": [
            "At a shared location and instant, linear responses add with their signs.",
            "$V_{sum}=0.004\\,\\text{V}-0.0015\\,\\text{V}$",
            "$0.0025\\,\\text{V}$"
          ],
          "commonErrors": [
            {
              "wrongValue": 0.0055,
              "tolerance": 0.000001,
              "why": "The second increment is negative. Add signed values rather than their magnitudes.",
              "verification": {
                "relation": "sum",
                "inputs": {
                  "a": 0.004,
                  "b": 0.0015
                }
              }
            }
          ]
        },
        {
          "title": "Plausibility and assumptions",
          "choices": [
            {
              "label": "A negative increment subtracts from the positive increment at that instant."
            },
            {
              "label": "A negative increment adds its magnitude to the positive increment at that instant."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "A negative increment subtracts from the positive increment at that instant."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $V_{sum}(x,t)=V_1(x,t)+V_2(x,t)$."
        },
        {
          "body": "Start with $V_{sum}=0.004\\,\\text{V}-0.0015\\,\\text{V}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "At a shared location and instant, linear responses add with their signs."
      ],
      "points": 1,
      "source": "L04 PDF 16"
    },
    {
      "id": "L04-linear-recall",
      "sectionId": "superposition",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "Linear superposition applies point by point in time.",
          "answer": true
        },
        {
          "text": "An observed sublinear sum proves a particular voltage-gated channel is present.",
          "answer": false,
          "correction": "Conductance interactions can also cause sublinear summation; the result alone does not identify a channel."
        },
        {
          "text": "The passive linear model assumes constant membrane parameters.",
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
        "Linear superposition applies point by point in time.",
        "Conductance interactions can also cause sublinear summation; the result alone does not identify a channel.",
        "The passive linear model assumes constant membrane parameters."
      ],
      "points": 1,
      "source": "L04 PDF 16"
    },
    {
      "id": "L04-direct-annulus",
      "practice": "extra",
      "sectionId": "return",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $a=4\\times10^{-8}\\,\\text{m}$ and $h=4\\times10^{-9}\\,\\text{m}$. Find return-path area.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Core radius",
              "answer": {
                "value": 4e-8,
                "unit": "m",
                "tolerance": 4e-14,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 4e-8,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Shell thickness",
              "answer": {
                "value": 4e-9,
                "unit": "m",
                "tolerance": 4e-15,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 4e-9,
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
            "value": 1.0555751316061697e-15,
            "unit": "m2",
            "tolerance": 3.166725394818509e-18,
            "verification": {
              "relation": "annulus",
              "inputs": {
                "radius": 4e-8,
                "shell": 4e-9
              },
              "displayScale": 1
            }
          },
          "tex": "A_o=\\pi[(a+h)^2-a^2]",
          "modelAnswer": [
            "The conducting return area is an annulus, not the whole outer disk.",
            "$A_o=\\pi[(44\\times10^{-9}\\,\\text{m})^2-(40\\times10^{-9}\\,\\text{m})^2]$",
            "$\\pi[((4e-08\\,\\mathrm{m})+(4e-09\\,\\mathrm{m}))^2-(4e-08\\,\\mathrm{m})^2]$",
            "$1.0555751e-15\\,\\text{m2}$"
          ]
        },
        {
          "title": "Plausibility and assumptions",
          "choices": [
            {
              "label": "The annular area excludes the intracellular core cross-section."
            },
            {
              "label": "The annular area includes the intracellular core cross-section."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The annular area excludes the intracellular core cross-section."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $A_o=\\pi[(a+h)^2-a^2]$."
        },
        {
          "body": "Start with $A_o=\\pi[(44\\times10^{-9}\\,\\text{m})^2-(40\\times10^{-9}\\,\\text{m})^2]$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "The conducting return area is an annulus, not the whole outer disk."
      ],
      "points": 1,
      "source": "Exercise 4 p1–2; answers p1–2; L03 PDF12,14"
    },
    {
      "id": "L04-direct-return-resistance",
      "practice": "extra",
      "sectionId": "return",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $R_o=1.5\\,\\Omega\\,\\text{m}$ and $A_o=10^{-15}\\,\\text{m}^2$. Find $r_o$.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "External resistivity",
              "answer": {
                "value": 1.5,
                "unit": "ohm*m",
                "tolerance": 0.0000015,
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
              "label": "Return area",
              "answer": {
                "value": 1e-15,
                "unit": "m2",
                "tolerance": 1.0000000000000001e-21,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1e-15,
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
            "value": 1500000000000000,
            "unit": "ohm/m",
            "tolerance": 4500000000000,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 1.5,
                "b": 1e-15
              },
              "displayScale": 1
            }
          },
          "tex": "r_o=\\frac{R_o}{A_o}",
          "modelAnswer": [
            "A small cross-section raises axial resistance even at unchanged material resistivity.",
            "$r_o=(1.5\\,\\Omega\\,\\text{m})/(10^{-15}\\,\\text{m}^2)$",
            "$1.5e+15\\,\\text{ohm/m}$"
          ]
        },
        {
          "title": "Plausibility and assumptions",
          "choices": [
            {
              "label": "Equal resistivity can give different resistance per length for unequal areas."
            },
            {
              "label": "Equal resistivity must give equal resistance per length despite unequal areas."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Equal resistivity can give different resistance per length for unequal areas."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $r_o=\\frac{R_o}{A_o}$."
        },
        {
          "body": "Start with $r_o=(1.5\\,\\Omega\\,\\text{m})/(10^{-15}\\,\\text{m}^2)$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "A small cross-section raises axial resistance even at unchanged material resistivity."
      ],
      "points": 1,
      "source": "Exercise 4 p1–2; answers p1–2; L03 PDF12,14"
    },
    {
      "id": "L04-direct-external-length",
      "sectionId": "return",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $r_m=8\\times10^6\\,\\Omega\\,\\text{m}$ and $r_i=r_o=4\\times10^{14}\\,\\Omega/\\text{m}$. Find $\\lambda$.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Membrane resistance-length",
              "answer": {
                "value": 8000000,
                "unit": "ohm*m",
                "tolerance": 8,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 8000000,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Internal axial parameter",
              "answer": {
                "value": 400000000000000,
                "unit": "ohm/m",
                "tolerance": 400000000,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 400000000000000,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "External axial parameter",
              "answer": {
                "value": 400000000000000,
                "unit": "ohm/m",
                "tolerance": 400000000,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 400000000000000,
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
            "value": 0.0001,
            "unit": "m",
            "tolerance": 3.0000000000000004e-7,
            "verification": {
              "relation": "cableLength",
              "inputs": {
                "rm": 8000000,
                "ri": 400000000000000,
                "ro": 400000000000000
              },
              "displayScale": 1
            }
          },
          "tex": "\\lambda=\\sqrt{\\frac{r_m}{r_i+r_o}}",
          "modelAnswer": [
            "The return path adds to internal longitudinal resistance.",
            "$\\lambda=\\sqrt{(8\\times10^6\\,\\Omega\\,\\text{m})/(8\\times10^{14}\\,\\Omega/\\text{m})}$",
            "$\\sqrt{(8000000\\,\\mathrm{ohm\\,m})/[(4e+14\\,\\mathrm{ohm/m})+(4e+14\\,\\mathrm{ohm/m})]}$",
            "$0.0001\\,\\text{m}$"
          ]
        },
        {
          "title": "Plausibility and assumptions",
          "choices": [
            {
              "label": "External axial resistance reduces the spatial length constant."
            },
            {
              "label": "External axial resistance raises the spatial length constant."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "External axial resistance reduces the spatial length constant."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\lambda=\\sqrt{\\frac{r_m}{r_i+r_o}}$."
        },
        {
          "body": "Start with $\\lambda=\\sqrt{(8\\times10^6\\,\\Omega\\,\\text{m})/(8\\times10^{14}\\,\\Omega/\\text{m})}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "The return path adds to internal longitudinal resistance."
      ],
      "points": 1,
      "source": "Exercise 4 p1–2; answers p1–2; L03 PDF12,14"
    },
    {
      "id": "L04-inverse-scaling",
      "sectionId": "scaling",
      "difficulty": "medium",
      "type": "multiStepCalc",
      "prompt": "Identical-material cables have measured characteristic passive speed ratio $\\theta_B/\\theta_A=1.5$. Infer their diameter ratio, input resistance ratio for the same arm geometry and time-constant ratio.",
      "stages": [
        {
          "title": "Diameter ratio",
          "answer": {
            "value": 2.25,
            "unit": "",
            "tolerance": 0.00675,
            "verification": {
              "relation": "powerRatio",
              "inputs": {
                "a": 1.5,
                "b": 1,
                "power": 2
              },
              "displayScale": 1
            }
          },
          "tex": "d_B/d_A=(\\theta_B/\\theta_A)^2",
          "modelAnswer": [
            "Invert the square-root relation.",
            "$d_B/d_A=(\\theta_B/\\theta_A)^2$",
            "$((1.5)/(1))^{2}$",
            "$2.25$"
          ]
        },
        {
          "title": "Input resistance ratio",
          "answer": {
            "value": 0.2962962962962963,
            "unit": "",
            "tolerance": 0.0008888888888888888,
            "verification": {
              "relation": "powerRatio",
              "inputs": {
                "a": 2.25,
                "b": 1,
                "power": -1.5
              },
              "displayScale": 1
            }
          },
          "tex": "R_{N,B}/R_{N,A}=(d_B/d_A)^{-3/2}",
          "modelAnswer": [
            "B has larger diameter and lower input resistance.",
            "$R_{N,B}/R_{N,A}=(d_B/d_A)^{-3/2}$",
            "$((2.25)/(1))^{-1.5}$",
            "$0.2962963$"
          ]
        },
        {
          "title": "Time-constant ratio",
          "answer": {
            "value": 1,
            "unit": "",
            "tolerance": 0.003,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 0.02,
                "b": 0.02
              },
              "displayScale": 1
            }
          },
          "tex": "\\tau_{m,B}/\\tau_{m,A}=1",
          "modelAnswer": [
            "Material parameters, not diameter, set the local time product.",
            "$\\tau_{m,B}/\\tau_{m,A}=1$",
            "$(0.020000000)/(0.020000000)$",
            "$1$"
          ]
        },
        {
          "title": "Plausibility and assumptions",
          "choices": [
            {
              "label": "A faster passive scale from diameter alone accompanies lower input resistance."
            },
            {
              "label": "A faster passive scale from diameter alone accompanies higher input resistance."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "A faster passive scale from diameter alone accompanies lower input resistance."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use square-root speed scaling and inverse three-halves input scaling. Relations: $d_B/d_A=(\\theta_B/\\theta_A)^2$; $R_{N,B}/R_{N,A}=(d_B/d_A)^{-3/2}$; $\\tau_{m,B}/\\tau_{m,A}=1$."
        },
        {
          "body": "Start with $d_B/d_A=(1.5)^2$. Apply the input-resistance power and compare identical membrane time products."
        }
      ],
      "modelAnswer": [
        "Invert the square-root relation.",
        "B has larger diameter and lower input resistance.",
        "Material parameters, not diameter, set the local time product."
      ],
      "points": 1,
      "source": "L04 PDF 3"
    },
    {
      "id": "L04-boundary-compare",
      "sectionId": "boundaries",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Compare an infinite cable with point injection, a one-sided semi-infinite cable driven at its end, and a finite dendritic segment. What extra information is needed before predicting voltage?",
      "hints": [
        {
          "body": "Identify the controlled input, geometry and recording site before choosing a relation."
        },
        {
          "body": "Use the endpoint condition or align the input and response traces; distinguish a voltage increment from absolute membrane voltage."
        }
      ],
      "markScheme": [
        {
          "text": "An infinite point source sends current along two directions."
        },
        {
          "text": "An end-driven semi-infinite cable has one available longitudinal direction."
        },
        {
          "text": "A finite cable needs its length and terminal condition."
        },
        {
          "text": "The stimulus waveform and whether current, voltage or conductance is controlled also matter."
        }
      ],
      "modelAnswer": [
        "An infinite point source sends current along two directions.",
        "An end-driven semi-infinite cable has one available longitudinal direction.",
        "A finite cable needs its length and terminal condition.",
        "The stimulus waveform and whether current, voltage or conductance is controlled also matter."
      ],
      "points": 1,
      "source": "L04 PDF 4",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 4, PDF page 4 (printed slide 5). Cylinder length and terminal resistance specify the cable boundary problem.",
        "fallbackAlt": "Cylinder length and terminal resistance specify the cable boundary problem.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L04/boundaries.webp', import.meta.url).href,
          "alt": "Cylinder length and terminal resistance specify the cable boundary problem.",
          "aspect": 1.7251585623678647,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L04-normalized-derive",
      "sectionId": "coordinates",
      "difficulty": "medium",
      "type": "derive",
      "prompt": "Start with $\\lambda^2\\partial_x^2V=\\tau_m\\partial_tV+V$. Use the normalized coordinates to obtain the parameter-free equation and explain when two cables have the same normalized solution.",
      "hints": [
        {
          "body": "Identify the controlled input, geometry and recording site before choosing a relation."
        },
        {
          "body": "Use the endpoint condition or align the input and response traces; distinguish a voltage increment from absolute membrane voltage."
        }
      ],
      "markScheme": [
        {
          "text": "$\\partial_x=\\lambda^{-1}\\partial_X$ and $\\partial_t=\\tau_m^{-1}\\partial_T$."
        },
        {
          "text": "The equation becomes $\\partial_X^2V=\\partial_TV+V$."
        },
        {
          "text": "Normalized initial, boundary and stimulus conditions must also agree."
        },
        {
          "text": "Matching the differential equation alone is insufficient."
        }
      ],
      "modelAnswer": [
        "$\\partial_x=\\lambda^{-1}\\partial_X$ and $\\partial_t=\\tau_m^{-1}\\partial_T$.",
        "The equation becomes $\\partial_X^2V=\\partial_TV+V$.",
        "Normalized initial, boundary and stimulus conditions must also agree.",
        "Matching the differential equation alone is insufficient."
      ],
      "points": 1,
      "source": "L04 PDF 5"
    },
    {
      "id": "L04-source-sign",
      "sectionId": "infinite",
      "difficulty": "medium",
      "type": "written",
      "prompt": "A hyperpolarizing point current is injected into an otherwise resting infinite passive cable. Compare voltage increments at equal positive and negative distances and their absolute membrane potentials.",
      "hints": [
        {
          "body": "Identify the controlled input, geometry and recording site before choosing a relation."
        },
        {
          "body": "Use the endpoint condition or align the input and response traces; distinguish a voltage increment from absolute membrane voltage."
        }
      ],
      "markScheme": [
        {
          "text": "Both rest-relative increments are negative."
        },
        {
          "text": "Equal absolute distances have equal increments in the uniform symmetric model."
        },
        {
          "text": "Their absolute membrane potentials equal baseline plus the negative increment."
        },
        {
          "text": "A negative coordinate does not reverse the response sign."
        }
      ],
      "modelAnswer": [
        "Both rest-relative increments are negative.",
        "Equal absolute distances have equal increments in the uniform symmetric model.",
        "Their absolute membrane potentials equal baseline plus the negative increment.",
        "A negative coordinate does not reverse the response sign."
      ],
      "points": 1,
      "source": "L04 PDF 6",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 4, PDF page 6 (printed slide 7). A central source gives a symmetric steady exponential profile on both sides.",
        "fallbackAlt": "A central source gives a symmetric steady exponential profile on both sides.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L04/infinite.webp', import.meta.url).href,
          "alt": "A central source gives a symmetric steady exponential profile on both sides.",
          "aspect": 2.180894308943089,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L04-profiles-read",
      "sectionId": "attenuation",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Use the source graph to rank sealed, matched and short-circuited profiles at an interior position. Explain the endpoint behavior and why the infinite curve continues beyond the finite endpoint.",
      "hints": [
        {
          "body": "Identify the controlled input, geometry and recording site before choosing a relation."
        },
        {
          "body": "Use the endpoint condition or align the input and response traces; distinguish a voltage increment from absolute membrane voltage."
        }
      ],
      "markScheme": [
        {
          "text": "At an interior position with equal origin voltage, sealed is highest, matched is intermediate and open is lowest."
        },
        {
          "text": "A sealed endpoint has zero axial current and zero spatial slope."
        },
        {
          "text": "An open short-circuited endpoint has zero voltage increment."
        },
        {
          "text": "The finite curves stop at their endpoint; the infinite curve has no endpoint there."
        }
      ],
      "modelAnswer": [
        "At an interior position with equal origin voltage, sealed is highest, matched is intermediate and open is lowest.",
        "A sealed endpoint has zero axial current and zero spatial slope.",
        "An open short-circuited endpoint has zero voltage increment.",
        "The finite curves stop at their endpoint; the infinite curve has no endpoint there."
      ],
      "points": 1,
      "source": "L04 PDF 8",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 4, PDF page 8 (printed slide 9). Original steady attenuation graph: sealed curve ends with zero slope, open curve reaches zero, infinite curve continues.",
        "fallbackAlt": "Original steady attenuation graph: sealed curve ends with zero slope, open curve reaches zero, infinite curve continues.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L04/profiles.webp', import.meta.url).href,
          "alt": "Original steady attenuation graph: sealed curve ends with zero slope, open curve reaches zero, infinite curve continues.",
          "aspect": 1.544904137235116,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L04-stimulus-compare",
      "sectionId": "ends",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Distinguish a current stimulus, a voltage stimulus and a conductance change at a cable site. Why does specifying only “same stimulation” fail to define a boundary comparison?",
      "hints": [
        {
          "body": "Identify the controlled input, geometry and recording site before choosing a relation."
        },
        {
          "body": "Use the endpoint condition or align the input and response traces; distinguish a voltage increment from absolute membrane voltage."
        }
      ],
      "markScheme": [
        {
          "text": "Current stimulation specifies supplied current and allows voltage to respond."
        },
        {
          "text": "Voltage stimulation specifies voltage and allows required current to change."
        },
        {
          "text": "Conductance change produces current depending on local voltage and its reversal potential."
        },
        {
          "text": "The same current need not give the same origin voltage when endpoint load changes."
        }
      ],
      "modelAnswer": [
        "Current stimulation specifies supplied current and allows voltage to respond.",
        "Voltage stimulation specifies voltage and allows required current to change.",
        "Conductance change produces current depending on local voltage and its reversal potential.",
        "The same current need not give the same origin voltage when endpoint load changes."
      ],
      "points": 1,
      "source": "L04 PDF 9",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 4, PDF page 9 (printed slide 10). Open, sealed and arbitrary-conductance terminal circuit diagrams.",
        "fallbackAlt": "Open, sealed and arbitrary-conductance terminal circuit diagrams.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L04/ends.webp', import.meta.url).href,
          "alt": "Open, sealed and arbitrary-conductance terminal circuit diagrams.",
          "aspect": 1.2510288065843622,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L04-steady-derive",
      "sectionId": "hyperbolic",
      "difficulty": "medium",
      "type": "derive",
      "prompt": "Derive the form $V=C_1\\cosh(L-X)+C_2\\sinh(L-X)$ from the steady cable equation. Identify the endpoint voltage and the endpoint derivative.",
      "hints": [
        {
          "body": "Identify the controlled input, geometry and recording site before choosing a relation."
        },
        {
          "body": "Use the endpoint condition or align the input and response traces; distinguish a voltage increment from absolute membrane voltage."
        }
      ],
      "markScheme": [
        {
          "text": "The characteristic roots of $V^{\\prime\\prime}-V=0$ are $+1$ and $-1$."
        },
        {
          "text": "The two exponential solutions can be regrouped into $\\cosh$ and $\\sinh$."
        },
        {
          "text": "At $X=L$, $V(L)=C_1$."
        },
        {
          "text": "$\\partial_XV(L)=-C_2$."
        },
        {
          "text": "A sealed endpoint therefore sets the hyperbolic-sine coefficient to zero."
        }
      ],
      "modelAnswer": [
        "The characteristic roots of $V^{\\prime\\prime}-V=0$ are $+1$ and $-1$.",
        "The two exponential solutions can be regrouped into $\\cosh$ and $\\sinh$.",
        "At $X=L$, $V(L)=C_1$.",
        "$\\partial_XV(L)=-C_2$.",
        "A sealed endpoint therefore sets the hyperbolic-sine coefficient to zero."
      ],
      "points": 1,
      "source": "L04 PDF 10"
    },
    {
      "id": "L04-endpoint-conflict",
      "sectionId": "endpoint",
      "difficulty": "medium",
      "type": "multiStepCalc",
      "prompt": "A finite cable has imposed increments $V_0=6\\,\\text{mV}$ and $V_e=-3\\,\\text{mV}$, with $L=1.6$. Calculate the midpoint increment. Could this negative end voltage also be a sealed end of a cable driven only by the positive origin?",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Origin increment",
              "answer": {
                "value": 0.006,
                "unit": "V",
                "tolerance": 6e-9,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.006,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "End increment",
              "answer": {
                "value": -0.003,
                "unit": "V",
                "tolerance": 3e-9,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -0.003,
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
          "title": "Midpoint increment",
          "answer": {
            "value": 0.0011215498773561293,
            "unit": "V",
            "tolerance": 0.0000033646496320683877,
            "verification": {
              "relation": "endpointCable",
              "inputs": {
                "v0": 0.006,
                "ve": -0.003,
                "length": 1.6,
                "x": 0.8
              },
              "displayScale": 1
            }
          },
          "tex": "V(X)=\\frac{V_0\\sinh(L-X)+V_e\\sinh X}{\\sinh L}",
          "modelAnswer": [
            "The midpoint is influenced by both endpoints.",
            "$V(X)=\\frac{V_0\\sinh(L-X)+V_e\\sinh X}{\\sinh L}$",
            "$\\frac{(0.006\\,\\mathrm{V})\\sinh((0.8))+(-0.003\\,\\mathrm{V})\\sinh((0.8))}{\\sinh((1.6))}$",
            "$0.0011215499\\,\\text{V}$"
          ]
        },
        {
          "title": "Boundary compatibility",
          "choices": [
            {
              "label": "The end voltage requires an additional boundary drive in this setup"
            },
            {
              "label": "The negative end voltage is forced by an insulated passive terminal"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "A positive origin with a sealed passive end gives a positive cosh profile."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use the two-endpoint voltage solution, not the sealed-end solution. Relations: $V(X)=\\frac{V_0\\sinh(L-X)+V_e\\sinh X}{\\sinh L}$."
        },
        {
          "body": "Start with $V=[(0.006\\,\\text{V})\\sinh(0.8)-(0.003\\,\\text{V})\\sinh(0.8)]/\\sinh(1.6)$. Then compare its endpoint assumption with a sealed end."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "The midpoint is influenced by both endpoints.",
        "A positive origin with a sealed passive end gives a positive cosh profile."
      ],
      "points": 1,
      "source": "L04 PDF 11"
    },
    {
      "id": "L04-neuron-map",
      "sectionId": "neuron",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Use the neuron schematic to identify the sealed tip, low-resistance somatic load and nearly infinite axonal idealization. Why can a synaptic conductance change alter the profile without changing dendritic geometry?",
      "hints": [
        {
          "body": "Identify the controlled input, geometry and recording site before choosing a relation."
        },
        {
          "body": "Use the endpoint condition or align the input and response traces; distinguish a voltage increment from absolute membrane voltage."
        }
      ],
      "markScheme": [
        {
          "text": "The isolated tip is high resistance and approximated as sealed."
        },
        {
          "text": "The large somatic load can be approximated as low terminal resistance for a connected segment."
        },
        {
          "text": "A sufficiently distant axon endpoint may be ignored in a nearly infinite approximation."
        },
        {
          "text": "A new membrane conductance changes the electrical load and possibly the origin response."
        },
        {
          "text": "These steady idealizations do not fix the transient waveform."
        }
      ],
      "modelAnswer": [
        "The isolated tip is high resistance and approximated as sealed.",
        "The large somatic load can be approximated as low terminal resistance for a connected segment.",
        "A sufficiently distant axon endpoint may be ignored in a nearly infinite approximation.",
        "A new membrane conductance changes the electrical load and possibly the origin response.",
        "These steady idealizations do not fix the transient waveform."
      ],
      "points": 1,
      "source": "L04 PDF 13",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 4, PDF page 13 (printed slide 14). Neuron schematic with high-resistance dendritic tip, low-resistance somatic load and long axon.",
        "fallbackAlt": "Neuron schematic with high-resistance dendritic tip, low-resistance somatic load and long axon.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L04/neuron.webp', import.meta.url).href,
          "alt": "Neuron schematic with high-resistance dendritic tip, low-resistance somatic load and long axon.",
          "aspect": 2.4630071599045347,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L04-synapse-compare",
      "sectionId": "synapses",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain the transformation from presynaptic spikes to a graded dendritic signal. Distinguish synaptic filtering from additional cable filtering without introducing an active-channel model.",
      "hints": [
        {
          "body": "Identify the controlled input, geometry and recording site before choosing a relation."
        },
        {
          "body": "Use the endpoint condition or align the input and response traces; distinguish a voltage increment from absolute membrane voltage."
        }
      ],
      "markScheme": [
        {
          "text": "Presynaptic spikes evoke postsynaptic responses rather than identical copied spikes."
        },
        {
          "text": "Synaptic responses are graded and commonly temporally smoothed."
        },
        {
          "text": "Spread through the dendrite adds attenuation, delay and broadening."
        },
        {
          "text": "Several inputs can combine before the trigger zone."
        }
      ],
      "modelAnswer": [
        "Presynaptic spikes evoke postsynaptic responses rather than identical copied spikes.",
        "Synaptic responses are graded and commonly temporally smoothed.",
        "Spread through the dendrite adds attenuation, delay and broadening.",
        "Several inputs can combine before the trigger zone."
      ],
      "points": 1,
      "source": "L04 PDF 14",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 4, PDF page 14 (printed slide 15). Original pyramidal-neuron and interneuron images with excitatory and inhibitory synaptic labels; source attribution retained.",
        "fallbackAlt": "Original pyramidal-neuron and interneuron images with excitatory and inhibitory synaptic labels; source attribution retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L04/synapses.webp', import.meta.url).href,
          "alt": "Original pyramidal-neuron and interneuron images with excitatory and inhibitory synaptic labels; source attribution retained.",
          "aspect": 1.393939393939394,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L04-summation-compare",
      "sectionId": "summation",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Compare temporal and spatial summation using the source branches. Why does adding peak amplitudes measured at different locations or different times usually fail?",
      "hints": [
        {
          "body": "Identify the controlled input, geometry and recording site before choosing a relation."
        },
        {
          "body": "Use the endpoint condition or align the input and response traces; distinguish a voltage increment from absolute membrane voltage."
        }
      ],
      "markScheme": [
        {
          "text": "Temporal summation concerns overlap of time-dependent responses."
        },
        {
          "text": "Spatial summation concerns signals from distinct input sites reaching a common site."
        },
        {
          "text": "Cable filtering changes amplitude and timing during travel."
        },
        {
          "text": "The sum must use the same observation position and instant, not unrelated peak values."
        }
      ],
      "modelAnswer": [
        "Temporal summation concerns overlap of time-dependent responses.",
        "Spatial summation concerns signals from distinct input sites reaching a common site.",
        "Cable filtering changes amplitude and timing during travel.",
        "The sum must use the same observation position and instant, not unrelated peak values."
      ],
      "points": 1,
      "source": "L04 PDF 15",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 4, PDF page 15 (printed slide 16). Source branches illustrate attenuation, broadening and summation of graded inputs.",
        "fallbackAlt": "Source branches illustrate attenuation, broadening and summation of graded inputs.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L04/summation.webp', import.meta.url).href,
          "alt": "Source branches illustrate attenuation, broadening and summation of graded inputs.",
          "aspect": 1.6014625228519195,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L04-temporal-read",
      "sectionId": "temporal",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Read the left and right columns of the temporal-integration source. Map the three recording sites, describe the effect of a second close input and distinguish passive summation from a regenerated spike.",
      "hints": [
        {
          "body": "Identify the controlled input, geometry and recording site before choosing a relation."
        },
        {
          "body": "Use the endpoint condition or align the input and response traces; distinguish a voltage increment from absolute membrane voltage."
        }
      ],
      "markScheme": [
        {
          "text": "The lowest traces show the input-cell spikes."
        },
        {
          "text": "The middle traces show graded responses at the target dendrite."
        },
        {
          "text": "The upper traces show trigger-zone voltage and threshold."
        },
        {
          "text": "Close inputs overlap and can raise trigger-zone depolarization to threshold."
        },
        {
          "text": "The resulting spike is an active event, not a linear sum of spike peaks."
        }
      ],
      "modelAnswer": [
        "The lowest traces show the input-cell spikes.",
        "The middle traces show graded responses at the target dendrite.",
        "The upper traces show trigger-zone voltage and threshold.",
        "Close inputs overlap and can raise trigger-zone depolarization to threshold.",
        "The resulting spike is an active event, not a linear sum of spike peaks."
      ],
      "points": 1,
      "source": "L04 PDF 17",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 4, PDF page 17 (printed slide 18). One or two input-cell spikes, their target dendritic responses and trigger-zone recordings with threshold.",
        "fallbackAlt": "One or two input-cell spikes, their target dendritic responses and trigger-zone recordings with threshold.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L04/temporal.webp', import.meta.url).href,
          "alt": "One or two input-cell spikes, their target dendritic responses and trigger-zone recordings with threshold.",
          "aspect": 1.1588089330024813,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L04-temporal-residual",
      "sectionId": "temporal",
      "difficulty": "medium",
      "type": "multiStepCalc",
      "prompt": "In a local lumped passive approximation, a $5\\,\\text{mV}$ increment decays with $\\tau_m=16\\,\\text{ms}$. A second brief input arrives $8\\,\\text{ms}$ later and adds an instantaneous $3\\,\\text{mV}$ increment. Find the residual and the sum just after the second input. Explain why this is not a full distant-cable trace.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "First increment",
              "answer": {
                "value": 0.005,
                "unit": "V",
                "tolerance": 5e-9,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.005,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Interval",
              "answer": {
                "value": 0.008,
                "unit": "s",
                "tolerance": 8e-9,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.008,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Time constant",
              "answer": {
                "value": 0.016,
                "unit": "s",
                "tolerance": 1.6e-8,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.016,
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
          "title": "Residual increment",
          "answer": {
            "value": 0.003032653298563167,
            "unit": "V",
            "tolerance": 0.0000090979598956895,
            "verification": {
              "relation": "cableDecay",
              "inputs": {
                "v": 0.005,
                "x": 0.008,
                "lambda": 0.016
              },
              "displayScale": 1
            }
          },
          "tex": "V_{res}=V_1e^{-\\Delta t/\\tau_m}",
          "modelAnswer": [
            "Here the exponential argument is time, not distance.",
            "$V_{res}=V_1e^{-\\Delta t/\\tau_m}$",
            "$(0.005\\,\\mathrm{V})\\exp[-|(0.008)|/(0.016\\,\\mathrm{m})]$",
            "$0.0030326533\\,\\text{V}$"
          ]
        },
        {
          "title": "Immediate sum",
          "answer": {
            "value": 0.006032653298563167,
            "unit": "V",
            "tolerance": 0.0000180979598956895,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": 0.003,
                "b": 0.003032653298563167
              },
              "displayScale": 1
            }
          },
          "tex": "V_{after}=V_{res}+\\Delta V_2",
          "modelAnswer": [
            "A distant cable also includes spatial filtering; this is a stated local approximation.",
            "$V_{after}=V_{res}+\\Delta V_2$",
            "$(0.0030000000\\,\\mathrm{V})+(0.0030326533\\,\\mathrm{V})$",
            "$0.0060326533\\,\\text{V}$"
          ]
        },
        {
          "title": "Plausibility and assumptions",
          "choices": [
            {
              "label": "The residual is below the original peak before the second input."
            },
            {
              "label": "The residual equals the original peak until the second input arrives."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The residual is below the original peak before the second input."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use local exponential discharge and linear addition. Relations: $V_{res}=V_1e^{-\\Delta t/\\tau_m}$; $V_{after}=V_{res}+\\Delta V_2$."
        },
        {
          "body": "Start with $V_{res}=(5\\times10^{-3}\\,\\text{V})e^{-8/16}$. Then add only the second increment, not the full original first peak."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Here the exponential argument is time, not distance.",
        "A distant cable also includes spatial filtering; this is a stated local approximation."
      ],
      "points": 1,
      "source": "L04 PDF 17"
    },
    {
      "id": "L04-spatial-read",
      "sectionId": "spatial",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Map the four recording sites in the source and compare separate with combined inputs. Identify the source’s timing warning and state which quantitative conclusion cannot be drawn.",
      "hints": [
        {
          "body": "Identify the controlled input, geometry and recording site before choosing a relation."
        },
        {
          "body": "Use the endpoint condition or align the input and response traces; distinguish a voltage increment from absolute membrane voltage."
        }
      ],
      "markScheme": [
        {
          "text": "Sites one and two record spikes in separate input cells."
        },
        {
          "text": "Site three records target dendritic voltage and site four the trigger zone."
        },
        {
          "text": "The combined graded responses can overlap enough to reach threshold at the trigger zone."
        },
        {
          "text": "The middle-column trigger response is explicitly marked too early and should occur later."
        },
        {
          "text": "No calibrated latency or conduction speed can be read from this schematic."
        }
      ],
      "modelAnswer": [
        "Sites one and two record spikes in separate input cells.",
        "Site three records target dendritic voltage and site four the trigger zone.",
        "The combined graded responses can overlap enough to reach threshold at the trigger zone.",
        "The middle-column trigger response is explicitly marked too early and should occur later.",
        "No calibrated latency or conduction speed can be read from this schematic."
      ],
      "points": 1,
      "source": "L04 PDF 18",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 4, PDF page 18 (printed slide 19). Separate and combined presynaptic inputs with target dendrite and trigger-zone recordings. The source flags a response drawn too early. Interpret causal order; no numerical latency is inferred.",
        "fallbackAlt": "Separate and combined presynaptic inputs with target dendrite and trigger-zone recordings. The source flags a response drawn too early.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L04/spatial.webp', import.meta.url).href,
          "alt": "Separate and combined presynaptic inputs with target dendrite and trigger-zone recordings. The source flags a response drawn too early.",
          "aspect": 1.2943327239488116,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L04-distance-read",
      "sectionId": "distance-effect",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Use the source traces to compare input-cell spikes with the target trigger-zone responses. What does the diagram illustrate, and what would you measure before claiming a unique change in length constant?",
      "hints": [
        {
          "body": "Identify the controlled input, geometry and recording site before choosing a relation."
        },
        {
          "body": "Use the endpoint condition or align the input and response traces; distinguish a voltage increment from absolute membrane voltage."
        }
      ],
      "markScheme": [
        {
          "text": "Input-cell action potentials need not produce equal target responses."
        },
        {
          "text": "Electrotonic distance and filtering change the target amplitude and waveform."
        },
        {
          "text": "Measure local input strength, physical path distance and responses at common target sites."
        },
        {
          "text": "Control geometry, passive parameters and boundary loading before inferring a length constant."
        },
        {
          "text": "The schematic alone cannot identify a unique changed material parameter."
        }
      ],
      "modelAnswer": [
        "Input-cell action potentials need not produce equal target responses.",
        "Electrotonic distance and filtering change the target amplitude and waveform.",
        "Measure local input strength, physical path distance and responses at common target sites.",
        "Control geometry, passive parameters and boundary loading before inferring a length constant.",
        "The schematic alone cannot identify a unique changed material parameter."
      ],
      "points": 1,
      "source": "L04 PDF 19",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 4, PDF page 19 (printed slide 20). Two input pathways produce different target trigger-zone waveforms in the source schematic.",
        "fallbackAlt": "Two input pathways produce different target trigger-zone waveforms in the source schematic.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L04/distance.webp', import.meta.url).href,
          "alt": "Two input pathways produce different target trigger-zone waveforms in the source schematic.",
          "aspect": 1.1228334589299171,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L04-return-interpret",
      "sectionId": "return",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain the four conditions in Exercise 4: channels closed/open, each with negligible/restricted external return. Why does the supplied solution’s statement about larger axial “resistivity” need more precise wording?",
      "hints": [
        {
          "body": "Identify the controlled input, geometry and recording site before choosing a relation."
        },
        {
          "body": "Use the endpoint condition or align the input and response traces; distinguish a voltage increment from absolute membrane voltage."
        }
      ],
      "markScheme": [
        {
          "text": "Channel opening lowers specific membrane resistance and therefore length constant."
        },
        {
          "text": "A restricted return area adds axial resistance per length and lowers length constant further."
        },
        {
          "text": "Electrotonic length increases as length constant falls, so uniformity becomes less plausible."
        },
        {
          "text": "The material resistivities can be equal while resistance per length differs because the areas differ."
        },
        {
          "text": "A near-unit electrotonic length cannot be treated as much smaller than one."
        }
      ],
      "modelAnswer": [
        "Channel opening lowers specific membrane resistance and therefore length constant.",
        "A restricted return area adds axial resistance per length and lowers length constant further.",
        "Electrotonic length increases as length constant falls, so uniformity becomes less plausible.",
        "The material resistivities can be equal while resistance per length differs because the areas differ.",
        "A near-unit electrotonic length cannot be treated as much smaller than one."
      ],
      "points": 1,
      "source": "Exercise 4 p1–2; answers p1–2; L03 PDF12,14",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Exercise 4, PDF page 1. Exercise source microvillar cross-section and annular geometry of the extracellular return path.",
        "fallbackAlt": "Exercise source microvillar cross-section and annular geometry of the extracellular return path.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L04/return.webp', import.meta.url).href,
          "alt": "Exercise source microvillar cross-section and annular geometry of the extracellular return path.",
          "aspect": 2.685483870967742,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L04-rebalance-terminal-current",
      "type": "mc",
      "difficulty": "medium",
      "sectionId": "load",
      "source": "L04 PDF pp9, 11–12",
      "prompt": "Synthetic practice scenario. A passive branch tip has a positive steady voltage increment relative to rest. Its terminal load has finite positive conductance to rest. What follows at the tip?",
      "correct": 0,
      "options": [
        {
          "text": "Axial current leaves the cable into the load.",
          "feedback": "Positive voltage across a positive conductance drives current into the load."
        },
        {
          "text": "Axial current enters the cable from the load.",
          "feedback": "Current through the passive load flows toward the lower potential."
        },
        {
          "text": "Axial current vanishes at the loaded tip.",
          "feedback": "Zero tip current is the sealed condition. The finite load draws current at nonzero voltage."
        }
      ],
      "hints": [
        {
          "body": "Identify the voltage across the terminal conductance."
        },
        {
          "body": "Use Ohm’s law and current balance at the tip."
        }
      ],
      "modelAnswer": [
        "The tip is above the reference voltage, so the passive load draws current. At the boundary the axial current supplies that load."
      ]
    },
    {
      "id": "L04-core-passive-speed",
      "practice": "extra",
      "type": "mc",
      "difficulty": "medium",
      "sectionId": "speed",
      "prompt": "Two cables have the same $\\lambda$. Cable B has twice the $\\tau_m$ of cable A. How does the characteristic passive speed of B compare?",
      "correct": 0,
      "options": [
        {
          "text": "Half the speed of A",
          "feedback": "The time constant is in the denominator."
        },
        {
          "text": "Twice the speed of A",
          "feedback": "That would follow from doubling the length constant at fixed time constant."
        },
        {
          "text": "The same speed as A",
          "feedback": "Identical spatial scales can still give different speeds."
        }
      ],
      "hints": [
        {
          "body": "Identify the quantity that differs between the two cables."
        },
        {
          "body": "Compare $2\\lambda/\\tau_m$ in both cables."
        }
      ],
      "modelAnswer": [
        "With the same $\\lambda$, doubling $\\tau_m$ halves $\\theta$."
      ]
    },
    {
      "id": "L04-core-finite-choice",
      "type": "mc",
      "difficulty": "medium",
      "sectionId": "boundaries",
      "prompt": "A constant current enters one end of a short segment. After settling, the distal electrode holds that end at rest. What model applies?",
      "correct": 0,
      "options": [
        {
          "text": "Finite cable with a shorted end",
          "feedback": "The distal voltage increment is fixed at zero."
        },
        {
          "text": "Finite cable with a sealed end",
          "feedback": "A seal fixes distal axial current at zero and leaves distal voltage free."
        },
        {
          "text": "Semi-infinite cable driven at its end",
          "feedback": "A nearby electrode imposes a distal condition and must enter the model."
        }
      ],
      "hints": [
        {
          "body": "Start by locating the driven and distal ends."
        },
        {
          "body": "Identify which quantity the distal electrode holds fixed."
        }
      ],
      "modelAnswer": [
        "The finite segment has a fixed voltage at its distal end. Use the shorted steady profile with the measured or calculated origin voltage."
      ]
    },
    {
      "id": "L04-core-signed-decay",
      "type": "mc",
      "difficulty": "medium",
      "sectionId": "infinite",
      "prompt": "A hyperpolarizing point current produces $-10\\,\\mathrm{mV}$ at the origin of an infinite cable. At steady state, what is the increment at $x=-\\lambda$?",
      "correct": 1,
      "options": [
        {
          "text": "$+3.7\\,\\mathrm{mV}$",
          "feedback": "Changing the side of the source leaves the sign of the increment unchanged."
        },
        {
          "text": "$-3.7\\,\\mathrm{mV}$",
          "feedback": "One length constant leaves about 37% of the signed origin increment."
        },
        {
          "text": "$-27.2\\,\\mathrm{mV}$",
          "feedback": "Using a signed exponent on both arms would incorrectly amplify the left-side signal."
        }
      ],
      "hints": [
        {
          "body": "A central point source feeds two identical arms."
        },
        {
          "body": "Distance from the source is $|x|$."
        }
      ],
      "modelAnswer": [
        "$(-10\\,\\mathrm{mV})e^{-1}\\approx-3.7\\,\\mathrm{mV}$."
      ]
    },
    {
      "id": "L04-core-same-current",
      "type": "mc",
      "difficulty": "medium",
      "sectionId": "input",
      "prompt": "The same steady current drives one semi-infinite arm or the midpoint between two identical arms. How does the origin increment magnitude change with two arms?",
      "correct": 2,
      "options": [
        {
          "text": "It doubles with two arms",
          "feedback": "Doubling the number of parallel arms doubles their conductance."
        },
        {
          "text": "It stays the same with two arms",
          "feedback": "Splitting the current changes the effective input resistance."
        },
        {
          "text": "It halves with two arms",
          "feedback": "Two equal input resistances in parallel halve the resistance seen by the source."
        }
      ],
      "hints": [
        {
          "body": "Apply Ohm’s law at the injection site."
        },
        {
          "body": "Picture each arm as an input resistance seen from the injection site."
        }
      ],
      "modelAnswer": [
        "The source sees half the resistance with two arms. At the same current, the voltage magnitude halves."
      ]
    },
    {
      "id": "L04-core-load-profile",
      "type": "mc",
      "difficulty": "medium",
      "sectionId": "finite",
      "prompt": "A finite cable has $G_e=2G_\\infty$. At the same positive origin voltage, how does its distal increment compare with the matched and shorted cases?",
      "correct": 1,
      "options": [
        {
          "text": "Above matched and above shorted",
          "feedback": "A load heavier than matched draws more current at a given distal voltage."
        },
        {
          "text": "Below matched and above shorted",
          "feedback": "The load draws more current than the matched load but still leaves a nonzero distal increment."
        },
        {
          "text": "Below matched and below shorted",
          "feedback": "The short fixes the increment at zero. This finite load leaves it positive."
        }
      ],
      "hints": [
        {
          "body": "Compare the terminal conductance with the one-arm reference."
        },
        {
          "body": "At $X=L$, the numerator of the normalized expression is 1."
        }
      ],
      "modelAnswer": [
        "The terminal fraction is $1/(\\cosh L+B_L\\sinh L)$. It decreases as the load rises. A finite load of 2 lies between 1 and the short-circuit limit."
      ]
    },
    {
      "id": "L04-core-sealed-voltage",
      "type": "mc",
      "difficulty": "medium",
      "sectionId": "cases",
      "prompt": "A steady profile reaches a positive distal voltage and flattens to zero slope there. Which terminal is consistent with both observations?",
      "correct": 2,
      "options": [
        {
          "text": "A matched continuation",
          "feedback": "A decaying exponential has a nonzero slope at a finite position where its voltage increment is positive."
        },
        {
          "text": "A short to resting voltage",
          "feedback": "The short fixes the distal increment at zero."
        },
        {
          "text": "A sealed cable end",
          "feedback": "At a sealed end, axial current and therefore slope are zero while voltage can stay above rest."
        }
      ],
      "hints": [
        {
          "body": "Voltage and its spatial derivative specify different boundary conditions."
        },
        {
          "body": "Axial current is proportional to the negative spatial voltage slope."
        }
      ],
      "modelAnswer": [
        "The flat slope signals zero distal axial current, the sealed boundary condition."
      ]
    },
    {
      "id": "L04-core-timing-overlap",
      "type": "mc",
      "difficulty": "medium",
      "sectionId": "temporal",
      "prompt": "Two identical brief depolarizing inputs arrive at the same site. Which change increases the response just after the second input in a local passive RC model?",
      "correct": 1,
      "options": [
        {
          "text": "Increase the delay between inputs",
          "feedback": "A longer delay lets more of the first increment decay."
        },
        {
          "text": "Decrease the delay between inputs",
          "feedback": "A shorter delay leaves more of the first increment when the second arrives."
        },
        {
          "text": "Shift both inputs later by the same amount",
          "feedback": "The separation stays the same, so the remaining fraction at the second input is unchanged."
        }
      ],
      "hints": [
        {
          "body": "A passive response decays after a brief input."
        },
        {
          "body": "Consider what remains of the first response when the second begins."
        }
      ],
      "modelAnswer": [
        "A smaller interval leaves a larger positive residual of the first response to add to the second."
      ]
    },
    {
      "id": "L04-core-signed-sum",
      "practice": "extra",
      "type": "mc",
      "difficulty": "medium",
      "sectionId": "superposition",
      "prompt": "At the soma at one instant, two independent current inputs separately produce increments of $+5$ and $-2\\,\\mathrm{mV}$. Rest is $-65\\,\\mathrm{mV}$. In the linear passive model, what is the combined absolute voltage?",
      "correct": 2,
      "options": [
        {
          "text": "$-68\\,\\mathrm{mV}$",
          "feedback": "The sum is a positive increment, so it raises the voltage above rest."
        },
        {
          "text": "$-58\\,\\mathrm{mV}$",
          "feedback": "The second increment is negative and reduces the total."
        },
        {
          "text": "$-62\\,\\mathrm{mV}$",
          "feedback": "The signed sum is $+3\\,\\mathrm{mV}$. Add it to rest once."
        }
      ],
      "hints": [
        {
          "body": "Separate the resting voltage from the responses to the two inputs."
        },
        {
          "body": "Add signed voltage changes first."
        }
      ],
      "modelAnswer": [
        "$V_m=-65+5-2=-62\\,\\mathrm{mV}$."
      ]
    },
    {
      "id": "L04-core-spatial-test",
      "practice": "extra",
      "type": "mc",
      "difficulty": "medium",
      "sectionId": "spatial",
      "prompt": "You record two responses separately and then stimulate both sites. Which prediction should you use to test linear summation?",
      "correct": 0,
      "options": [
        {
          "text": "Add simultaneous samples from the two separate traces",
          "feedback": "This predicts the full waveform at the same recording site, with the stimulus times aligned."
        },
        {
          "text": "Add the two highest points from the separate traces",
          "feedback": "The peaks may occur at different times. Their sum can overstate the expected peak."
        },
        {
          "text": "Average simultaneous samples from the two separate traces",
          "feedback": "The linear prediction is the sum of signed increments. Averaging would halve it."
        }
      ],
      "hints": [
        {
          "body": "The two peaks can occur at different times."
        },
        {
          "body": "Use a prediction for each instant at the same electrode."
        }
      ],
      "modelAnswer": [
        "Align separate trials to the timing of the combined trial and sum their voltage increments sample by sample."
      ]
    },
    {
      "id": "L04-speed-limits",
      "sectionId": "speed",
      "difficulty": "hard",
      "type": "written",
      "prompt": "Explain why a passive-wave velocity cannot be interpreted as a unique sharp wavefront speed. State what the half-rise criterion measures and why the affine contour must not be extrapolated to all times.",
      "hints": [
        {
          "body": "Identify the controlled input, geometry and recording site before choosing a relation."
        },
        {
          "body": "Use the endpoint condition or align the input and response traces; distinguish a voltage increment from absolute membrane voltage."
        }
      ],
      "markScheme": [
        {
          "text": "The reference amplitude is the local steady response at each location."
        },
        {
          "text": "Passive voltage changes spread with waveform broadening, not identical regenerative waveforms."
        },
        {
          "text": "The relation is a characteristic contour approximation in the taught model."
        },
        {
          "text": "Its negative time-zero intercept is not a physical front behind the injection site."
        },
        {
          "text": "It does not supply the active spike velocity."
        }
      ],
      "modelAnswer": [
        "The reference amplitude is the local steady response at each location.",
        "Passive voltage changes spread with waveform broadening, not identical regenerative waveforms.",
        "The relation is a characteristic contour approximation in the taught model.",
        "Its negative time-zero intercept is not a physical front behind the injection site.",
        "It does not supply the active spike velocity."
      ],
      "points": 1,
      "source": "L04 PDF 2"
    },
    {
      "id": "L04-geometry-chain",
      "sectionId": "scaling",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "A uniform passive neurite has diameter $3.2\\,\\mu\\text{m}$, $R_m=12\\,\\text{k}\\Omega\\,\\text{cm}^2$, $R_i=150\\,\\Omega\\,\\text{cm}$ and $C_m=1\\,\\mu\\text{F/cm}^2$. Find radius in SI, length constant, time constant and characteristic speed. Explain why this is not a measured spike speed.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Radius",
              "answer": {
                "value": 0.0000016,
                "unit": "m",
                "tolerance": 1.5999999999999998e-12,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.0000016,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Specific membrane resistance",
              "answer": {
                "value": 1.2,
                "unit": "ohm*m2",
                "tolerance": 0.0000012,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1.2,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Axial resistivity",
              "answer": {
                "value": 1.5,
                "unit": "ohm*m",
                "tolerance": 0.0000015,
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
                "tolerance": 1e-8,
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
          "title": "Length constant",
          "answer": {
            "value": 0.0008,
            "unit": "m",
            "tolerance": 0.0000024000000000000003,
            "verification": {
              "relation": "cableLength",
              "inputs": {
                "rm": 119366.2073189215,
                "ri": 186509698935.81488
              },
              "displayScale": 1
            }
          },
          "tex": "\\lambda=\\sqrt{R_ma/(2R_i)}",
          "modelAnswer": [
            "Check radius rather than diameter.",
            "$\\lambda=\\sqrt{R_ma/(2R_i)}$",
            "$\\sqrt{(119366.207\\,\\mathrm{ohm\\,m})/[(1.86509699e+11\\,\\mathrm{ohm/m})+(0\\,\\mathrm{ohm/m})]}$",
            "$0.0008\\,\\text{m}$"
          ]
        },
        {
          "title": "Time constant",
          "answer": {
            "value": 0.012,
            "unit": "s",
            "tolerance": 0.000036,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 1.2,
                "b": 0.01
              },
              "displayScale": 1
            }
          },
          "tex": "\\tau_m=R_mC_m",
          "modelAnswer": [
            "Units reduce to seconds.",
            "$\\tau_m=R_mC_m$",
            "$(1.2000000\\,\\mathrm{ohm m^2})\\times(0.010000000\\,\\mathrm{F/m^2})$",
            "$0.012\\,\\text{s}$"
          ]
        },
        {
          "title": "Characteristic speed",
          "answer": {
            "value": 0.13333333333333333,
            "unit": "m/s",
            "tolerance": 0.0004,
            "verification": {
              "relation": "passiveSpeed",
              "inputs": {
                "lambda": 0.0008,
                "tau": 0.012
              },
              "displayScale": 1
            }
          },
          "tex": "\\theta=2\\lambda/\\tau_m",
          "modelAnswer": [
            "This tracks the passive half-rise approximation.",
            "$\\theta=2\\lambda/\\tau_m$",
            "$2(0.0008\\,\\mathrm{m})/(0.012\\,\\mathrm{s})$",
            "$0.13333333\\,\\text{m/s}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "This is a passive characteristic, not active spike regeneration"
            },
            {
              "label": "This is a measured spike speed, fixed by diameter alone"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The supplied passive parameters do not define an active channel model."
          ]
        }
      ],
      "hints": [
        {
          "body": "Combine geometry, spatial scale and local membrane timing. Relations: $\\lambda=\\sqrt{R_ma/(2R_i)}$; $\\tau_m=R_mC_m$; $\\theta=2\\lambda/\\tau_m$."
        },
        {
          "body": "Start with $a=(3.2\\times10^{-6}\\,\\text{m})/2$. Convert the specific parameters, then compute the scales and their speed ratio."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Check radius rather than diameter.",
        "Units reduce to seconds.",
        "This tracks the passive half-rise approximation.",
        "The supplied passive parameters do not define an active channel model."
      ],
      "points": 1,
      "source": "L04 PDF 3"
    },
    {
      "id": "L04-input-inference",
      "sectionId": "input",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "An end-driven semi-infinite cable has $R_{semi}=90\\,\\text{M}\\Omega$ and $\\lambda=0.6\\,\\text{mm}$. Infer axial resistance per length. The same cable is then extended identically on both sides of the source. Find its new input resistance, source response to $-40\\,\\text{pA}$ and response one length constant away.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "One-sided input resistance",
              "answer": {
                "value": 90000000,
                "unit": "ohm",
                "tolerance": 90,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 90000000,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Length constant",
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
              "label": "Supplied current",
              "answer": {
                "value": -4e-11,
                "unit": "A",
                "tolerance": 3.9999999999999997e-17,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -4e-11,
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
            "value": 150000000000,
            "unit": "ohm/m",
            "tolerance": 450000000,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 90000000,
                "b": 0.0006
              },
              "displayScale": 1
            }
          },
          "tex": "r_i=R_{semi}/\\lambda",
          "modelAnswer": [
            "Use the one-sided relation before adding another arm.",
            "$r_i=R_{semi}/\\lambda$",
            "$(90000000\\,\\mathrm{ohm})/(0.00060000000\\,\\mathrm{m})$",
            "$1.5e+11\\,\\text{ohm/m}$"
          ]
        },
        {
          "title": "Two-sided resistance",
          "answer": {
            "value": 45000000,
            "unit": "ohm",
            "tolerance": 135000,
            "verification": {
              "relation": "cableInput",
              "inputs": {
                "ri": 150000000000,
                "lambda": 0.0006,
                "sides": 2
              },
              "displayScale": 1
            }
          },
          "tex": "R_N=r_i\\lambda/2",
          "modelAnswer": [
            "Two arms halve the input resistance.",
            "$R_N=r_i\\lambda/2$",
            "$(1.5e+11\\,\\mathrm{ohm/m})(0.0006\\,\\mathrm{m})/2$",
            "$45000000\\,\\text{ohm}$"
          ]
        },
        {
          "title": "Source voltage",
          "answer": {
            "value": -0.0018,
            "unit": "V",
            "tolerance": 0.0000054,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 45000000,
                "b": -4e-11
              },
              "displayScale": 1
            }
          },
          "tex": "V_0=I_0R_N",
          "modelAnswer": [
            "Negative supplied current gives a negative increment.",
            "$V_0=I_0R_N$",
            "$(45000000\\,\\mathrm{ohm})\\times(-4.0000000e-11\\,\\mathrm{A})$",
            "$-0.0018\\,\\text{V}$"
          ]
        },
        {
          "title": "Remote voltage",
          "answer": {
            "value": -0.0006621829941085962,
            "unit": "V",
            "tolerance": 0.0000019865489823257887,
            "verification": {
              "relation": "cableDecay",
              "inputs": {
                "v": -0.0018,
                "x": 0.0006,
                "lambda": 0.0006
              },
              "displayScale": 1
            }
          },
          "tex": "V(\\lambda)=V_0e^{-1}",
          "modelAnswer": [
            "Attenuation reduces magnitude without changing sign.",
            "$V(\\lambda)=V_0e^{-1}$",
            "$(-0.0018\\,\\mathrm{V})\\exp[-|(0.0006)|/(0.0006\\,\\mathrm{m})]$",
            "$-0.00066218299\\,\\text{V}$"
          ]
        },
        {
          "title": "Plausibility and assumptions",
          "choices": [
            {
              "label": "Adding a second identical arm reduces source response at the same supplied current."
            },
            {
              "label": "Adding a second identical arm preserves source response at the same supplied current."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Adding a second identical arm reduces source response at the same supplied current."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use the number of driven arms and the exponential steady profile. Relations: $r_i=R_{semi}/\\lambda$; $R_N=r_i\\lambda/2$; $V_0=I_0R_N$; $V(\\lambda)=V_0e^{-1}$."
        },
        {
          "body": "Start with $r_i=(90\\times10^6\\,\\Omega)/(0.6\\times10^{-3}\\,\\text{m})$. Then change the arm count, apply Ohm’s law and attenuate."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Use the one-sided relation before adding another arm.",
        "Two arms halve the input resistance.",
        "Negative supplied current gives a negative increment.",
        "Attenuation reduces magnitude without changing sign."
      ],
      "points": 1,
      "source": "L04 PDF 7"
    },
    {
      "id": "L04-load-chain",
      "sectionId": "finite",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "A passive finite segment has $r_i=8\\times10^{10}\\,\\Omega/\\text{m}$, $\\lambda=0.75\\,\\text{mm}$ and terminal conductance $25\\,\\text{nS}$. The measured origin increment is $8\\,\\text{mV}$, $L=1.2$ and the recording is at $X=0.8$. Infer the load ratio, remote increment and terminal increment. Explain the comparison with a matched continuation.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Length constant",
              "answer": {
                "value": 0.00075,
                "unit": "m",
                "tolerance": 7.5e-10,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.00075,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Terminal conductance",
              "answer": {
                "value": 2.5e-8,
                "unit": "S",
                "tolerance": 2.4999999999999998e-14,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 2.5e-8,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Origin increment",
              "answer": {
                "value": 0.008,
                "unit": "V",
                "tolerance": 8e-9,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.008,
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
          "title": "One-arm resistance",
          "answer": {
            "value": 60000000,
            "unit": "ohm",
            "tolerance": 180000,
            "verification": {
              "relation": "cableInput",
              "inputs": {
                "ri": 80000000000,
                "lambda": 0.00075,
                "sides": 1
              },
              "displayScale": 1
            }
          },
          "tex": "R_{semi}=r_i\\lambda",
          "modelAnswer": [
            "Use one arm to define the reference load.",
            "$R_{semi}=r_i\\lambda$",
            "$(8e+10\\,\\mathrm{ohm/m})(0.00075\\,\\mathrm{m})/1$",
            "$60000000\\,\\text{ohm}$"
          ]
        },
        {
          "title": "Reference conductance",
          "answer": {
            "value": 1.6666666666666667e-8,
            "unit": "S",
            "tolerance": 5e-11,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 1,
                "b": 60000000
              },
              "displayScale": 1
            }
          },
          "tex": "G_\\infty=1/R_{semi}",
          "modelAnswer": [
            "Do not use the two-sided input conductance.",
            "$G_\\infty=1/R_{semi}$",
            "$(1.0000000)/(60000000\\,\\mathrm{ohm})$",
            "$1.6666667e-08\\,\\text{S}$"
          ]
        },
        {
          "title": "Load ratio",
          "answer": {
            "value": 1.5,
            "unit": "",
            "tolerance": 0.0045000000000000005,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 2.5e-8,
                "b": 1.6666666666666667e-8
              },
              "displayScale": 1
            }
          },
          "tex": "B_L=G_e/G_\\infty",
          "modelAnswer": [
            "This is greater than the matched load.",
            "$B_L=G_e/G_\\infty$",
            "$(2.5000000e-8)/(1.6666667e-8)$",
            "$1.5$"
          ]
        },
        {
          "title": "Remote increment",
          "answer": {
            "value": 0.0033320526840970796,
            "unit": "V",
            "tolerance": 0.00000999615805229124,
            "verification": {
              "relation": "finiteCable",
              "inputs": {
                "v": 0.008,
                "length": 1.2,
                "x": 0.8,
                "load": 1.5,
                "mode": "load"
              },
              "displayScale": 1
            }
          },
          "tex": "V(X)=V_0\\frac{\\cosh(L-X)+B_L\\sinh(L-X)}{\\cosh L+B_L\\sinh L}",
          "modelAnswer": [
            "At the same origin voltage, the extra load reduces the remote response.",
            "$V(X)=V_0\\frac{\\cosh(L-X)+B_L\\sinh(L-X)}{\\cosh L+B_L\\sinh L}$",
            "$(0.008\\,\\mathrm{V})\\frac{\\cosh((1.2)-(0.8))+(1.5)\\sinh((1.2)-(0.8))}{\\cosh((1.2))+(1.5)\\sinh((1.2))}$",
            "$0.0033320527\\,\\text{V}$"
          ]
        },
        {
          "title": "Terminal increment",
          "answer": {
            "value": 0.0019632636074858345,
            "unit": "V",
            "tolerance": 0.0000058897908224575035,
            "verification": {
              "relation": "finiteCable",
              "inputs": {
                "v": 0.008,
                "length": 1.2,
                "x": 1.2,
                "load": 1.5,
                "mode": "load"
              },
              "displayScale": 1
            }
          },
          "tex": "V(L)=V_0/(\\cosh L+B_L\\sinh L)",
          "modelAnswer": [
            "A finite nonzero load is neither perfectly sealed nor shorted.",
            "$V(L)=V_0/(\\cosh L+B_L\\sinh L)$",
            "$(0.008\\,\\mathrm{V})\\frac{\\cosh((1.2)-(1.2))+(1.5)\\sinh((1.2)-(1.2))}{\\cosh((1.2))+(1.5)\\sinh((1.2))}$",
            "$0.0019632636\\,\\text{V}$"
          ]
        },
        {
          "title": "Plausibility and assumptions",
          "choices": [
            {
              "label": "A load ratio above matching attenuates more at equal origin voltage."
            },
            {
              "label": "A load ratio above matching attenuates less at equal origin voltage."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "A load ratio above matching attenuates more at equal origin voltage."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use one-arm input conductance, then the general finite profile. Relations: $R_{semi}=r_i\\lambda$; $G_\\infty=1/R_{semi}$; $B_L=G_e/G_\\infty$; $V(X)=V_0\\frac{\\cosh(L-X)+B_L\\sinh(L-X)}{\\cosh L+B_L\\sinh L}$; $V(L)=V_0/(\\cosh L+B_L\\sinh L)$."
        },
        {
          "body": "Start with $R_{semi}=(8\\times10^{10}\\,\\Omega/\\text{m})(0.75\\times10^{-3}\\,\\text{m})$. Invert, form the load ratio and evaluate both positions."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Use one arm to define the reference load.",
        "Do not use the two-sided input conductance.",
        "This is greater than the matched load.",
        "At the same origin voltage, the extra load reduces the remote response.",
        "A finite nonzero load is neither perfectly sealed nor shorted."
      ],
      "points": 1,
      "source": "L04 PDF 11"
    },
    {
      "id": "L04-boundary-design",
      "sectionId": "cases",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "The same uniform segment has length $0.6\\,\\text{mm}$ and length constant $0.5\\,\\text{mm}$. An electrode holds its origin increment at $10\\,\\text{mV}$. Compare the increment at $x=0.4\\,\\text{mm}$ for sealed, matched and open terminals. State why this does not predict equal-current responses.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Cable length",
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
              "label": "Recording distance",
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
              "label": "Length constant",
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
          "title": "Total electrotonic length",
          "answer": {
            "value": 1.2,
            "unit": "",
            "tolerance": 0.0036,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 0.0006,
                "b": 0.0005
              },
              "displayScale": 1
            }
          },
          "tex": "L=\\ell/\\lambda",
          "modelAnswer": [
            "Compare physical lengths in the same unit.",
            "$L=\\ell/\\lambda$",
            "$(0.00060000000\\,\\mathrm{m})/(0.00050000000\\,\\mathrm{m})$",
            "$1.2$"
          ]
        },
        {
          "title": "Electrotonic position",
          "answer": {
            "value": 0.8,
            "unit": "",
            "tolerance": 0.0024000000000000002,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 0.0004,
                "b": 0.0005
              },
              "displayScale": 1
            }
          },
          "tex": "X=x/\\lambda",
          "modelAnswer": [
            "The recording lies within the finite segment.",
            "$X=x/\\lambda$",
            "$(0.00040000000\\,\\mathrm{m})/(0.00050000000\\,\\mathrm{m})$",
            "$0.8$"
          ]
        },
        {
          "title": "Sealed voltage",
          "answer": {
            "value": 0.005970613027390776,
            "unit": "V",
            "tolerance": 0.000017911839082172327,
            "verification": {
              "relation": "finiteCable",
              "inputs": {
                "v": 0.01,
                "length": 1.2,
                "x": 0.8,
                "load": 0,
                "mode": "load"
              },
              "displayScale": 1
            }
          },
          "tex": "V=V_0 f(X,L,B_L)",
          "modelAnswer": [
            "The boundary condition changes the profile at fixed origin voltage.",
            "$V=V_0 f(X,L,B_L)$",
            "$(0.01\\,\\mathrm{V})\\frac{\\cosh((1.2)-(0.8))+(0)\\sinh((1.2)-(0.8))}{\\cosh((1.2))+(0)\\sinh((1.2))}$",
            "$0.005970613\\,\\text{V}$"
          ]
        },
        {
          "title": "Matched voltage",
          "answer": {
            "value": 0.004493289641172216,
            "unit": "V",
            "tolerance": 0.000013479868923516648,
            "verification": {
              "relation": "finiteCable",
              "inputs": {
                "v": 0.01,
                "length": 1.2,
                "x": 0.8,
                "load": 1,
                "mode": "load"
              },
              "displayScale": 1
            }
          },
          "tex": "V=V_0 f(X,L,B_L)",
          "modelAnswer": [
            "The boundary condition changes the profile at fixed origin voltage.",
            "$V=V_0 f(X,L,B_L)$",
            "$(0.01\\,\\mathrm{V})\\frac{\\cosh((1.2)-(0.8))+(1)\\sinh((1.2)-(0.8))}{\\cosh((1.2))+(1)\\sinh((1.2))}$",
            "$0.0044932896\\,\\text{V}$"
          ]
        },
        {
          "title": "Open voltage",
          "answer": {
            "value": 0.0027211847744896766,
            "unit": "V",
            "tolerance": 0.00000816355432346903,
            "verification": {
              "relation": "finiteCable",
              "inputs": {
                "v": 0.01,
                "length": 1.2,
                "x": 0.8,
                "load": 0,
                "mode": "open"
              },
              "displayScale": 1
            }
          },
          "tex": "V=V_0 f(X,L,B_L)",
          "modelAnswer": [
            "The boundary condition changes the profile at fixed origin voltage.",
            "$V=V_0 f(X,L,B_L)$",
            "$(0.01\\,\\mathrm{V})\\frac{\\sinh((1.2)-(0.8))}{\\sinh((1.2))}$",
            "$0.0027211848\\,\\text{V}$"
          ]
        },
        {
          "title": "Plausibility and assumptions",
          "choices": [
            {
              "label": "Equal origin voltage permits comparison of normalized attenuation alone."
            },
            {
              "label": "Equal origin current permits comparison of normalized attenuation alone."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Equal origin voltage permits comparison of normalized attenuation alone."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $L=\\ell/\\lambda$ and $X=x/\\lambda$. Compare $V_0\\cosh(L-X)/\\cosh L$, $V_0e^{-X}$ and $V_0\\sinh(L-X)/\\sinh L$ under the three endpoint conditions."
        },
        {
          "body": "Start with $L=(0.6\\,\\text{mm})/(0.5\\,\\text{mm})$. Compute the recording position, then substitute each boundary condition."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Compare physical lengths in the same unit.",
        "The recording lies within the finite segment.",
        "The boundary condition changes the profile at fixed origin voltage.",
        "The boundary condition changes the profile at fixed origin voltage.",
        "The boundary condition changes the profile at fixed origin voltage."
      ],
      "points": 1,
      "source": "L04 PDF11–12"
    },
    {
      "id": "L04-limits-proof",
      "sectionId": "summary",
      "difficulty": "hard",
      "type": "derive",
      "prompt": "Check the general finite solution at $X=0$, reduce it for $B_L=0$ and $B_L=1$, and explain the long-cable limit for a fixed interior position. Contrast that limit with moving the recording site along with the endpoint.",
      "hints": [
        {
          "body": "Identify the controlled input, geometry and recording site before choosing a relation."
        },
        {
          "body": "Use the endpoint condition or align the input and response traces; distinguish a voltage increment from absolute membrane voltage."
        }
      ],
      "markScheme": [
        {
          "text": "At the origin the numerator equals the denominator, giving the specified origin voltage."
        },
        {
          "text": "Zero load yields the sealed cosh ratio."
        },
        {
          "text": "Equal reference load reduces exactly to an exponential using the exponential definitions."
        },
        {
          "text": "At fixed interior position the distant-boundary exponential correction vanishes as total length grows."
        },
        {
          "text": "A position kept near the moving endpoint need not have the same relative boundary effect."
        }
      ],
      "modelAnswer": [
        "At the origin the numerator equals the denominator, giving the specified origin voltage.",
        "Zero load yields the sealed cosh ratio.",
        "Equal reference load reduces exactly to an exponential using the exponential definitions.",
        "At fixed interior position the distant-boundary exponential correction vanishes as total length grows.",
        "A position kept near the moving endpoint need not have the same relative boundary effect."
      ],
      "points": 1,
      "source": "L04 PDF 12"
    },
    {
      "id": "L04-spatial-signed-sum",
      "sectionId": "superposition",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "Two additive current inputs act in an ideal linear cable. Their separate steady local increments are $+8\\,\\text{mV}$ at $X=0.4$ and $-6\\,\\text{mV}$ at $X=1.1$ from the same recording site. Each individual transfer follows a matched exponential. Find both contributions at the recording site, their sum and the resulting absolute membrane voltage from a $-65\\,\\text{mV}$ baseline. State the current-source assumption.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Positive local increment",
              "answer": {
                "value": 0.008,
                "unit": "V",
                "tolerance": 8e-9,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.008,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Negative local increment",
              "answer": {
                "value": -0.006,
                "unit": "V",
                "tolerance": 6e-9,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -0.006,
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
          "title": "Positive contribution",
          "answer": {
            "value": 0.005362560368285115,
            "unit": "V",
            "tolerance": 0.000016087681104855343,
            "verification": {
              "relation": "cableDecay",
              "inputs": {
                "v": 0.008,
                "x": 0.4,
                "lambda": 1
              },
              "displayScale": 1
            }
          },
          "tex": "V_1=0.008\\,\\text{V}\\,e^{-0.4}",
          "modelAnswer": [
            "Use the transfer to the shared observation site.",
            "$V_1=0.008\\,\\text{V}\\,e^{-0.4}$",
            "$(0.008\\,\\mathrm{V})\\exp[-|(0.4)|/(1\\,\\mathrm{m})]$",
            "$0.0053625604\\,\\text{V}$"
          ]
        },
        {
          "title": "Negative contribution",
          "answer": {
            "value": -0.0019972265021884774,
            "unit": "V",
            "tolerance": 0.000005991679506565432,
            "verification": {
              "relation": "cableDecay",
              "inputs": {
                "v": -0.006,
                "x": 1.1,
                "lambda": 1
              },
              "displayScale": 1
            }
          },
          "tex": "V_2=-0.006\\,\\text{V}\\,e^{-1.1}",
          "modelAnswer": [
            "Attenuation preserves the negative sign.",
            "$V_2=-0.006\\,\\text{V}\\,e^{-1.1}$",
            "$(-0.006\\,\\mathrm{V})\\exp[-|(1.1)|/(1\\,\\mathrm{m})]$",
            "$-0.0019972265\\,\\text{V}$"
          ]
        },
        {
          "title": "Combined increment",
          "answer": {
            "value": 0.0033653338660966374,
            "unit": "V",
            "tolerance": 0.000010096001598289912,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": 0.005362560368285115,
                "b": -0.0019972265021884774
              },
              "displayScale": 1
            }
          },
          "tex": "V=V_1+V_2",
          "modelAnswer": [
            "This sum is rest-relative.",
            "$V=V_1+V_2$",
            "$(0.0053625604\\,\\mathrm{V})+(-0.0019972265\\,\\mathrm{V})$",
            "$0.0033653339\\,\\text{V}$"
          ]
        },
        {
          "title": "Absolute membrane voltage",
          "answer": {
            "value": -0.061634666133903365,
            "unit": "V",
            "tolerance": 0.0001849039984017101,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": -0.065,
                "b": 0.0033653338660966374
              },
              "displayScale": 1
            }
          },
          "tex": "V_m=V_{rest}+V",
          "modelAnswer": [
            "The resulting membrane potential can remain negative despite depolarization.",
            "$V_m=V_{rest}+V$",
            "$(-0.065000000\\,\\mathrm{V})+(0.0033653339\\,\\mathrm{V})$",
            "$-0.061634666\\,\\text{V}$"
          ]
        },
        {
          "title": "Plausibility and assumptions",
          "choices": [
            {
              "label": "The membrane can remain negative while its increment is depolarizing."
            },
            {
              "label": "A positive membrane increment requires an absolute positive membrane voltage."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The membrane can remain negative while its increment is depolarizing."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use signed spatial attenuation for each input, then add at a common site. Relations: $V_1=0.008\\,\\text{V}\\,e^{-0.4}$; $V_2=-0.006\\,\\text{V}\\,e^{-1.1}$; $V=V_1+V_2$; $V_m=V_{rest}+V$."
        },
        {
          "body": "Start with $V_1=(8\\times10^{-3}\\,\\text{V})e^{-0.4}$. Attenuate the second input, add the increments and then add the resting baseline."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Use the transfer to the shared observation site.",
        "Attenuation preserves the negative sign.",
        "This sum is rest-relative.",
        "The resulting membrane potential can remain negative despite depolarization."
      ],
      "points": 1,
      "source": "L04 PDF 16"
    },
    {
      "id": "L04-summation-method",
      "sectionId": "spatial",
      "difficulty": "hard",
      "type": "written",
      "prompt": "Design a test of linear spatial summation using two stimulation sites and one somatic voltage recording. Include separate and combined trials, timing alignment, a way to avoid spikes and how you would interpret a sublinear result.",
      "hints": [
        {
          "body": "Identify the controlled input, geometry and recording site before choosing a relation."
        },
        {
          "body": "Use the endpoint condition or align the input and response traces; distinguish a voltage increment from absolute membrane voltage."
        }
      ],
      "markScheme": [
        {
          "text": "Record each input separately at the same soma under stable baseline conditions."
        },
        {
          "text": "Record the combined response with controlled relative stimulus timing."
        },
        {
          "text": "Sum the separate somatic waveforms point by point after aligning the stimulus times."
        },
        {
          "text": "Use small responses and monitor for threshold or changing input resistance."
        },
        {
          "text": "A sublinear response can reflect conductance interaction or another departure from assumptions, not proof of a specific active channel."
        },
        {
          "text": "Control drift, stimulation reproducibility and recording position."
        }
      ],
      "modelAnswer": [
        "Record each input separately at the same soma under stable baseline conditions.",
        "Record the combined response with controlled relative stimulus timing.",
        "Sum the separate somatic waveforms point by point after aligning the stimulus times.",
        "Use small responses and monitor for threshold or changing input resistance.",
        "A sublinear response can reflect conductance interaction or another departure from assumptions, not proof of a specific active channel.",
        "Control drift, stimulation reproducibility and recording position."
      ],
      "points": 1,
      "source": "L04 PDF 18",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 4, PDF page 16 (printed slide 17). Somatic recording of two current inputs at proximal and distal sites on one dendrite.",
        "fallbackAlt": "Somatic recording of two current inputs at proximal and distal sites on one dendrite.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L04/superposition.webp', import.meta.url).href,
          "alt": "Somatic recording of two current inputs at proximal and distal sites on one dendrite.",
          "aspect": 1.4679943100995732,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L04-distance-causality",
      "sectionId": "distance-effect",
      "difficulty": "hard",
      "type": "predict",
      "prompt": "A stronger local input farther along a dendrite gives the same somatic peak as a weaker proximal input. Explain why equal peaks do not establish equal integration, and propose observations that separate amplitude compensation from temporal filtering.",
      "hints": [
        {
          "body": "Identify the controlled input, geometry and recording site before choosing a relation."
        },
        {
          "body": "Use the endpoint condition or align the input and response traces; distinguish a voltage increment from absolute membrane voltage."
        }
      ],
      "markScheme": [
        {
          "text": "Greater local strength can compensate for attenuation of the peak."
        },
        {
          "text": "Arrival time, width and overlap with other inputs may still differ."
        },
        {
          "text": "Record or estimate the local responses and compare normalized somatic transfer."
        },
        {
          "text": "Compare full time-aligned waveforms rather than just the peaks."
        },
        {
          "text": "Keep baseline and boundary loading controlled; equality of one measurement is insufficient."
        }
      ],
      "modelAnswer": [
        "Greater local strength can compensate for attenuation of the peak.",
        "Arrival time, width and overlap with other inputs may still differ.",
        "Record or estimate the local responses and compare normalized somatic transfer.",
        "Compare full time-aligned waveforms rather than just the peaks.",
        "Keep baseline and boundary loading controlled; equality of one measurement is insufficient."
      ],
      "points": 1,
      "source": "L04 PDF 19",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 4, PDF page 19 (printed slide 20). Two input pathways produce different target trigger-zone waveforms in the source schematic.",
        "fallbackAlt": "Two input pathways produce different target trigger-zone waveforms in the source schematic.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L04/distance.webp', import.meta.url).href,
          "alt": "Two input pathways produce different target trigger-zone waveforms in the source schematic.",
          "aspect": 1.1228334589299171,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L04-return-design",
      "sectionId": "return",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "A cylindrical sensory process has radius $40\\,\\text{nm}$ and length $6\\,\\mu\\text{m}$. Both axial material resistivities are $150\\,\\Omega\\,\\text{cm}$. Its extracellular shell is $4\\,\\text{nm}$ thick and resting $R_m=8\\,\\text{k}\\Omega\\,\\text{cm}^2$. Find the shell area, both axial parameters, length constants with and without the return resistance and loaded electrotonic length. Then open channels to reduce specific membrane resistance sixteenfold. Explain whether physical smallness guarantees uniform voltage.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Radius",
              "answer": {
                "value": 4e-8,
                "unit": "m",
                "tolerance": 4e-14,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 4e-8,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Shell thickness",
              "answer": {
                "value": 4e-9,
                "unit": "m",
                "tolerance": 4e-15,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 4e-9,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Material resistivity",
              "answer": {
                "value": 1.5,
                "unit": "ohm*m",
                "tolerance": 0.0000015,
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
              "label": "Specific membrane resistance",
              "answer": {
                "value": 0.8,
                "unit": "ohm*m2",
                "tolerance": 8e-7,
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
          "title": "Annular area",
          "answer": {
            "value": 1.0555751316061709e-15,
            "unit": "m2",
            "tolerance": 3.166725394818513e-18,
            "verification": {
              "relation": "annulus",
              "inputs": {
                "radius": 4e-8,
                "shell": 4e-9
              },
              "displayScale": 1
            }
          },
          "tex": "A_o=\\pi[(a+h)^2-a^2]",
          "modelAnswer": [
            "Subtract the core area from the outer disk.",
            "$A_o=\\pi[(a+h)^2-a^2]$",
            "$\\pi[((4e-08\\,\\mathrm{m})+(4e-09\\,\\mathrm{m}))^2-(4e-08\\,\\mathrm{m})^2]$",
            "$1.0555751e-15\\,\\text{m2}$"
          ]
        },
        {
          "title": "Internal axial parameter",
          "answer": {
            "value": 298415518297303.75,
            "unit": "ohm/m",
            "tolerance": 895246554891.9113,
            "verification": {
              "relation": "cableAxial",
              "inputs": {
                "rho": 1.5,
                "radius": 4e-8
              },
              "displayScale": 1
            }
          },
          "tex": "r_i=R_i/(\\pi a^2)",
          "modelAnswer": [
            "Use the core cross-section.",
            "$r_i=R_i/(\\pi a^2)$",
            "$(1.5\\,\\mathrm{ohm\\,m})/[\\pi(4e-08\\,\\mathrm{m})^2]$",
            "$2.9841552e+14\\,\\text{ohm/m}$"
          ]
        },
        {
          "title": "External axial parameter",
          "answer": {
            "value": 1421026277606208,
            "unit": "ohm/m",
            "tolerance": 4263078832818.624,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 1.5,
                "b": 1.0555751316061709e-15
              },
              "displayScale": 1
            }
          },
          "tex": "r_o=R_o/A_o",
          "modelAnswer": [
            "Equal material resistivities do not mean equal per-length resistances.",
            "$r_o=R_o/A_o$",
            "$(1.5000000\\,\\mathrm{ohm m})/(1.0555751e-15\\,\\mathrm{m^2})$",
            "$1.4210263e+15\\,\\text{ohm/m}$"
          ]
        },
        {
          "title": "Membrane parameter",
          "answer": {
            "value": 3183098.861837907,
            "unit": "ohm*m",
            "tolerance": 9549.296585513723,
            "verification": {
              "relation": "cableMembrane",
              "inputs": {
                "specific": 0.8,
                "radius": 4e-8
              },
              "displayScale": 1
            }
          },
          "tex": "r_m=R_m/(2\\pi a)",
          "modelAnswer": [
            "Use circumference for surface per length.",
            "$r_m=R_m/(2\\pi a)$",
            "$(0.8\\,\\mathrm{ohm\\,m2})/[2\\pi(4e-08\\,\\mathrm{m})]$",
            "$3183098.9\\,\\text{ohm*m}$"
          ]
        },
        {
          "title": "No-return length constant",
          "answer": {
            "value": 0.00010327955589886446,
            "unit": "m",
            "tolerance": 3.098386676965934e-7,
            "verification": {
              "relation": "cableLength",
              "inputs": {
                "rm": 3183098.861837907,
                "ri": 298415518297303.75
              },
              "displayScale": 1
            }
          },
          "tex": "\\lambda_0=\\sqrt{r_m/r_i}",
          "modelAnswer": [
            "Neglecting the external path overestimates spread.",
            "$\\lambda_0=\\sqrt{r_m/r_i}$",
            "$\\sqrt{(3183098.86\\,\\mathrm{ohm\\,m})/[(2.98415518e+14\\,\\mathrm{ohm/m})+(0\\,\\mathrm{ohm/m})]}$",
            "$0.00010327956\\,\\text{m}$"
          ]
        },
        {
          "title": "Loaded length constant",
          "answer": {
            "value": 0.000043026034786179035,
            "unit": "m",
            "tolerance": 1.290781043585371e-7,
            "verification": {
              "relation": "cableLength",
              "inputs": {
                "rm": 3183098.861837907,
                "ri": 298415518297303.75,
                "ro": 1421026277606208
              },
              "displayScale": 1
            }
          },
          "tex": "\\lambda=\\sqrt{r_m/(r_i+r_o)}",
          "modelAnswer": [
            "Both longitudinal resistances contribute.",
            "$\\lambda=\\sqrt{r_m/(r_i+r_o)}$",
            "$\\sqrt{(3183098.86\\,\\mathrm{ohm\\,m})/[(2.98415518e+14\\,\\mathrm{ohm/m})+(1.42102628e+15\\,\\mathrm{ohm/m})]}$",
            "$4.3026035e-05\\,\\text{m}$"
          ]
        },
        {
          "title": "Resting electrotonic length",
          "answer": {
            "value": 0.1394504520302052,
            "unit": "",
            "tolerance": 0.0004183513560906156,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 0.000006,
                "b": 0.000043026034786179035
              },
              "displayScale": 1
            }
          },
          "tex": "L=\\ell/\\lambda",
          "modelAnswer": [
            "Use the dimensionless ratio to assess uniformity.",
            "$L=\\ell/\\lambda$",
            "$(0.0000060000000\\,\\mathrm{m})/(0.000043026035\\,\\mathrm{m})$",
            "$0.13945045$"
          ]
        },
        {
          "title": "Activated length constant",
          "answer": {
            "value": 0.000010756508696544759,
            "unit": "m",
            "tolerance": 3.2269526089634275e-8,
            "verification": {
              "relation": "cableLength",
              "inputs": {
                "rm": 198943.6788648692,
                "ri": 298415518297303.75,
                "ro": 1421026277606208
              },
              "displayScale": 1
            }
          },
          "tex": "\\lambda_{active}=\\lambda/\\sqrt{16}",
          "modelAnswer": [
            "A sixteenfold resistance fall gives a fourfold scale decrease.",
            "$\\lambda_{active}=\\lambda/\\sqrt{16}$",
            "$\\sqrt{(198943.679\\,\\mathrm{ohm\\,m})/[(2.98415518e+14\\,\\mathrm{ohm/m})+(1.42102628e+15\\,\\mathrm{ohm/m})]}$",
            "$1.0756509e-05\\,\\text{m}$"
          ]
        },
        {
          "title": "Activated electrotonic length",
          "answer": {
            "value": 0.5578018081208208,
            "unit": "",
            "tolerance": 0.0016734054243624625,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 0.000006,
                "b": 0.000010756508696544759
              },
              "displayScale": 1
            }
          },
          "tex": "L_{active}=\\ell/\\lambda_{active}",
          "modelAnswer": [
            "The activated process is less uniform; physical size alone is not enough.",
            "$L_{active}=\\ell/\\lambda_{active}$",
            "$(0.0000060000000\\,\\mathrm{m})/(0.000010756509\\,\\mathrm{m})$",
            "$0.55780181$"
          ]
        },
        {
          "title": "Plausibility and assumptions",
          "choices": [
            {
              "label": "Channel opening shortens spread and makes this process less isopotential."
            },
            {
              "label": "Channel opening extends spread and makes this process more isopotential."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Channel opening shortens spread and makes this process less isopotential."
          ]
        }
      ],
      "hints": [
        {
          "body": "Combine the annular return geometry with the cable parameters and normalized total length. Relations: $A_o=\\pi[(a+h)^2-a^2]$; $r_i=R_i/(\\pi a^2)$; $r_o=R_o/A_o$; $r_m=R_m/(2\\pi a)$; $\\lambda_0=\\sqrt{r_m/r_i}$; $\\lambda=\\sqrt{r_m/(r_i+r_o)}$; $L=\\ell/\\lambda$; $\\lambda_{active}=\\lambda/\\sqrt{16}$; $L_{active}=\\ell/\\lambda_{active}$."
        },
        {
          "body": "Start with $A_o=\\pi[(44\\times10^{-9}\\,\\text{m})^2-(40\\times10^{-9}\\,\\text{m})^2]$. Compute the axial and membrane parameters, both length constants and the two electrotonic lengths."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Subtract the core area from the outer disk.",
        "Use the core cross-section.",
        "Equal material resistivities do not mean equal per-length resistances.",
        "Use circumference for surface per length.",
        "Neglecting the external path overestimates spread.",
        "Both longitudinal resistances contribute.",
        "Use the dimensionless ratio to assess uniformity.",
        "A sixteenfold resistance fall gives a fourfold scale decrease.",
        "The activated process is less uniform; physical size alone is not enough."
      ],
      "points": 1,
      "source": "Exercise 4 p1–2; answers p1–2; L03 PDF12,14"
    },
    {
      "id": "L04-rebalance-changing-load",
      "type": "mc",
      "difficulty": "hard",
      "sectionId": "superposition",
      "source": "L04 PDF pp13, 15–17",
      "prompt": "Synthetic practice scenario. Two small current pulses add linearly at the recording site. A third input briefly increases membrane conductance along the path, with its reversal at rest. What is the concern when predicting all three responses from separate recordings?",
      "correct": 0,
      "options": [
        {
          "text": "The third input can change transfer even when its own voltage response is negligible.",
          "feedback": "Conductance to rest increases local current loss when another input moves voltage away from rest."
        },
        {
          "text": "The third input can change transfer only when its own voltage response is large.",
          "feedback": "The response in isolation can be zero at reversal even though conductance has increased."
        },
        {
          "text": "The third input can change transfer only when it opens a voltage-gated current.",
          "feedback": "A time-varying synaptic conductance changes the passive load without requiring voltage-gated channels."
        }
      ],
      "hints": [
        {
          "body": "Consider the third input alone at rest."
        },
        {
          "body": "Now add a pulse and consider the current through the additional conductance."
        }
      ],
      "modelAnswer": [
        "At rest the new conductance has zero driving force. During either pulse it provides an additional path toward rest. The original pulse waveforms no longer describe transfer during that input."
      ]
    },
    {
      "id": "L04-core-diameter-chain",
      "type": "mc",
      "difficulty": "hard",
      "sectionId": "scaling",
      "prompt": "A uniform infinite cable doubles in diameter with all material properties fixed. You repeat the same steady point-current injection and assess the characteristic passive speed separately. Which pair of changes follows?",
      "correct": 0,
      "options": [
        {
          "text": "Speed rises by $\\sqrt{2}$ and origin increment falls to $2^{-3/2}$ of its magnitude.",
          "feedback": "The speed follows the length constant and the origin increment follows input resistance."
        },
        {
          "text": "Speed rises by $\\sqrt{2}$ and origin increment rises to $2^{3/2}$ of its magnitude.",
          "feedback": "Larger diameter lowers input resistance, even as it increases the spatial scale."
        },
        {
          "text": "Speed falls by $\\sqrt{2}$ and origin increment falls to $2^{-3/2}$ of its magnitude.",
          "feedback": "Time constant stays fixed while length constant increases, so speed rises."
        }
      ],
      "hints": [
        {
          "body": "The change in geometry affects both the length constant and input resistance."
        },
        {
          "body": "Combine $\\theta=2\\lambda/\\tau_m$ with $V_0=I_0R_{\\rm in}$."
        }
      ],
      "modelAnswer": [
        "At fixed material properties $\\lambda\\propto d^{1/2}$ and $\\tau_m$ stays constant. With $r_i\\propto d^{-2}$, the product $r_i\\lambda$ scales as $d^{-3/2}$."
      ]
    },
    {
      "id": "L04-core-return-chain",
      "practice": "extra",
      "type": "mc",
      "difficulty": "hard",
      "sectionId": "return",
      "prompt": "Initially an activated process has $L=0.15$. Its membrane resistance falls to one quarter of its value and its total axial resistance per length doubles. What is the new $L$ at fixed physical length?",
      "correct": 1,
      "options": [
        {
          "text": "About $0.21$, because the length constant falls by $\\sqrt{2}$.",
          "feedback": "This accounts for the axial change alone. Membrane resistance falls as well."
        },
        {
          "text": "About $0.42$, because the length constant falls by $\\sqrt{8}$.",
          "feedback": "Both changes reduce the ratio under the square root. The electrotonic length rises by the reciprocal factor."
        },
        {
          "text": "About $0.85$, because the length constant falls by $\\sqrt{32}$.",
          "feedback": "The new membrane-to-axial ratio is one eighth of the original."
        }
      ],
      "hints": [
        {
          "body": "Electrotonic length changes even when physical length stays fixed."
        },
        {
          "body": "First evaluate the change in $r_m/(r_i+r_o)$, then apply $L=\\ell/\\lambda$."
        }
      ],
      "modelAnswer": [
        "The new ratio is $1/8$ of its old value. Thus $L=0.15\\sqrt{8}\\approx0.42$, making the approximation of uniform voltage less secure."
      ]
    }
  ],
  "mockExams": [
    {
      "id": "L04-mock-A",
      "title": "Mock A: boundary loading and current division",
      "coverage": "Lectures 1–4. Boundary conditions, source arms, steady voltage profiles and current-injection method.",
      "questions": [
        {
          "id": "L04-a1",
          "role": "concepts",
          "type": "written",
          "difficulty": "medium",
          "prompt": "a) Define electrotonic length. b) Distinguish an open cable end from an electrical open circuit. c) Define input resistance. Answer each in 1–3 sentences.",
          "markScheme": [
            {
              "text": "Electrotonic length is physical cable length divided by length constant."
            },
            {
              "text": "An open cable end is short-circuited; an electrical open circuit corresponds to a sealed end."
            },
            {
              "text": "Input resistance is source voltage increment divided by supplied steady current."
            }
          ],
          "modelAnswer": [
            "Electrotonic length is physical cable length divided by length constant.",
            "An open cable end is short-circuited; an electrical open circuit corresponds to a sealed end.",
            "Input resistance is source voltage increment divided by supplied steady current."
          ],
          "hints": [
            {
              "body": "Organize the requested subparts and state the passive model."
            },
            {
              "body": "Identify the stimulus and observation site, then compare causal order and boundary conditions."
            }
          ],
          "points": 1,
          "source": "L04 PDF5,7,9"
        },
        {
          "id": "L04-a2",
          "role": "explanation",
          "type": "written",
          "difficulty": "medium",
          "prompt": "Sketch and explain steady sealed, matched and open profiles at equal origin voltage. Label axes and endpoint conditions. Explain why equal injected current is a different comparison.",
          "markScheme": [
            {
              "text": "Label normalized position and rest-relative voltage or its normalized ratio."
            },
            {
              "text": "Sealed has zero endpoint slope and nonzero end response."
            },
            {
              "text": "Open has zero endpoint response."
            },
            {
              "text": "Matched continuation follows exponential attenuation between the other profiles."
            },
            {
              "text": "Changing input resistance means the same current need not preserve origin voltage."
            }
          ],
          "modelAnswer": [
            "Label normalized position and rest-relative voltage or its normalized ratio.",
            "Sealed has zero endpoint slope and nonzero end response.",
            "Open has zero endpoint response.",
            "Matched continuation follows exponential attenuation between the other profiles.",
            "Changing input resistance means the same current need not preserve origin voltage."
          ],
          "hints": [
            {
              "body": "Organize the requested subparts and state the passive model."
            },
            {
              "body": "Identify the stimulus and observation site, then compare causal order and boundary conditions."
            }
          ],
          "points": 1,
          "source": "L04 PDF8–12"
        },
        {
          "id": "L04-a3",
          "role": "calculation",
          "sectionId": "input",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "An end-driven semi-infinite cable has $R_{semi}=90\\,\\text{M}\\Omega$ and $\\lambda=0.6\\,\\text{mm}$. Infer axial resistance per length. The same cable is then extended identically on both sides of the source. Find its new input resistance, source response to $-40\\,\\text{pA}$ and response one length constant away.",
          "stages": [
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "One-sided input resistance",
                  "answer": {
                    "value": 90000000,
                    "unit": "ohm",
                    "tolerance": 90,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 90000000,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Length constant",
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
                  "label": "Supplied current",
                  "answer": {
                    "value": -4e-11,
                    "unit": "A",
                    "tolerance": 3.9999999999999997e-17,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": -4e-11,
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
                "value": 150000000000,
                "unit": "ohm/m",
                "tolerance": 450000000,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 90000000,
                    "b": 0.0006
                  },
                  "displayScale": 1
                }
              },
              "tex": "r_i=R_{semi}/\\lambda",
              "modelAnswer": [
                "Use the one-sided relation before adding another arm.",
                "$r_i=R_{semi}/\\lambda$",
                "$(90000000\\,\\mathrm{ohm})/(0.00060000000\\,\\mathrm{m})$",
                "$1.5e+11\\,\\text{ohm/m}$"
              ]
            },
            {
              "title": "Two-sided resistance",
              "answer": {
                "value": 45000000,
                "unit": "ohm",
                "tolerance": 135000,
                "verification": {
                  "relation": "cableInput",
                  "inputs": {
                    "ri": 150000000000,
                    "lambda": 0.0006,
                    "sides": 2
                  },
                  "displayScale": 1
                }
              },
              "tex": "R_N=r_i\\lambda/2",
              "modelAnswer": [
                "Two arms halve the input resistance.",
                "$R_N=r_i\\lambda/2$",
                "$(1.5e+11\\,\\mathrm{ohm/m})(0.0006\\,\\mathrm{m})/2$",
                "$45000000\\,\\text{ohm}$"
              ]
            },
            {
              "title": "Source voltage",
              "answer": {
                "value": -0.0018,
                "unit": "V",
                "tolerance": 0.0000054,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 45000000,
                    "b": -4e-11
                  },
                  "displayScale": 1
                }
              },
              "tex": "V_0=I_0R_N",
              "modelAnswer": [
                "Negative supplied current gives a negative increment.",
                "$V_0=I_0R_N$",
                "$(45000000\\,\\mathrm{ohm})\\times(-4.0000000e-11\\,\\mathrm{A})$",
                "$-0.0018\\,\\text{V}$"
              ]
            },
            {
              "title": "Remote voltage",
              "answer": {
                "value": -0.0006621829941085962,
                "unit": "V",
                "tolerance": 0.0000019865489823257887,
                "verification": {
                  "relation": "cableDecay",
                  "inputs": {
                    "v": -0.0018,
                    "x": 0.0006,
                    "lambda": 0.0006
                  },
                  "displayScale": 1
                }
              },
              "tex": "V(\\lambda)=V_0e^{-1}",
              "modelAnswer": [
                "Attenuation reduces magnitude without changing sign.",
                "$V(\\lambda)=V_0e^{-1}$",
                "$(-0.0018\\,\\mathrm{V})\\exp[-|(0.0006)|/(0.0006\\,\\mathrm{m})]$",
                "$-0.00066218299\\,\\text{V}$"
              ]
            },
            {
              "title": "Plausibility and assumptions",
              "choices": [
                {
                  "label": "Adding a second identical arm reduces source response at the same supplied current."
                },
                {
                  "label": "Adding a second identical arm preserves source response at the same supplied current."
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "Adding a second identical arm reduces source response at the same supplied current."
              ]
            }
          ],
          "hints": [
            {
              "body": "Use the number of driven arms and the exponential steady profile. Relations: $r_i=R_{semi}/\\lambda$; $R_N=r_i\\lambda/2$; $V_0=I_0R_N$; $V(\\lambda)=V_0e^{-1}$."
            },
            {
              "body": "Start with $r_i=(90\\times10^6\\,\\Omega)/(0.6\\times10^{-3}\\,\\text{m})$. Then change the arm count, apply Ohm’s law and attenuate."
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating.",
            "Use the one-sided relation before adding another arm.",
            "Two arms halve the input resistance.",
            "Negative supplied current gives a negative increment.",
            "Attenuation reduces magnitude without changing sign."
          ],
          "points": 1,
          "source": "L04 PDF 7"
        },
        {
          "id": "L04-a4",
          "role": "calculation",
          "sectionId": "cases",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "The same uniform segment has length $0.6\\,\\text{mm}$ and length constant $0.5\\,\\text{mm}$. An electrode holds its origin increment at $10\\,\\text{mV}$. Compare the increment at $x=0.4\\,\\text{mm}$ for sealed, matched and open terminals. State why this does not predict equal-current responses.",
          "stages": [
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "Cable length",
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
                  "label": "Recording distance",
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
                  "label": "Length constant",
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
              "title": "Total electrotonic length",
              "answer": {
                "value": 1.2,
                "unit": "",
                "tolerance": 0.0036,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.0006,
                    "b": 0.0005
                  },
                  "displayScale": 1
                }
              },
              "tex": "L=\\ell/\\lambda",
              "modelAnswer": [
                "Compare physical lengths in the same unit.",
                "$L=\\ell/\\lambda$",
                "$(0.00060000000\\,\\mathrm{m})/(0.00050000000\\,\\mathrm{m})$",
                "$1.2$"
              ]
            },
            {
              "title": "Electrotonic position",
              "answer": {
                "value": 0.8,
                "unit": "",
                "tolerance": 0.0024000000000000002,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.0004,
                    "b": 0.0005
                  },
                  "displayScale": 1
                }
              },
              "tex": "X=x/\\lambda",
              "modelAnswer": [
                "The recording lies within the finite segment.",
                "$X=x/\\lambda$",
                "$(0.00040000000\\,\\mathrm{m})/(0.00050000000\\,\\mathrm{m})$",
                "$0.8$"
              ]
            },
            {
              "title": "Sealed voltage",
              "answer": {
                "value": 0.005970613027390776,
                "unit": "V",
                "tolerance": 0.000017911839082172327,
                "verification": {
                  "relation": "finiteCable",
                  "inputs": {
                    "v": 0.01,
                    "length": 1.2,
                    "x": 0.8,
                    "load": 0,
                    "mode": "load"
                  },
                  "displayScale": 1
                }
              },
              "tex": "V=V_0 f(X,L,B_L)",
              "modelAnswer": [
                "The boundary condition changes the profile at fixed origin voltage.",
                "$V=V_0 f(X,L,B_L)$",
                "$(0.01\\,\\mathrm{V})\\frac{\\cosh((1.2)-(0.8))+(0)\\sinh((1.2)-(0.8))}{\\cosh((1.2))+(0)\\sinh((1.2))}$",
                "$0.005970613\\,\\text{V}$"
              ]
            },
            {
              "title": "Matched voltage",
              "answer": {
                "value": 0.004493289641172216,
                "unit": "V",
                "tolerance": 0.000013479868923516648,
                "verification": {
                  "relation": "finiteCable",
                  "inputs": {
                    "v": 0.01,
                    "length": 1.2,
                    "x": 0.8,
                    "load": 1,
                    "mode": "load"
                  },
                  "displayScale": 1
                }
              },
              "tex": "V=V_0 f(X,L,B_L)",
              "modelAnswer": [
                "The boundary condition changes the profile at fixed origin voltage.",
                "$V=V_0 f(X,L,B_L)$",
                "$(0.01\\,\\mathrm{V})\\frac{\\cosh((1.2)-(0.8))+(1)\\sinh((1.2)-(0.8))}{\\cosh((1.2))+(1)\\sinh((1.2))}$",
                "$0.0044932896\\,\\text{V}$"
              ]
            },
            {
              "title": "Open voltage",
              "answer": {
                "value": 0.0027211847744896766,
                "unit": "V",
                "tolerance": 0.00000816355432346903,
                "verification": {
                  "relation": "finiteCable",
                  "inputs": {
                    "v": 0.01,
                    "length": 1.2,
                    "x": 0.8,
                    "load": 0,
                    "mode": "open"
                  },
                  "displayScale": 1
                }
              },
              "tex": "V=V_0 f(X,L,B_L)",
              "modelAnswer": [
                "The boundary condition changes the profile at fixed origin voltage.",
                "$V=V_0 f(X,L,B_L)$",
                "$(0.01\\,\\mathrm{V})\\frac{\\sinh((1.2)-(0.8))}{\\sinh((1.2))}$",
                "$0.0027211848\\,\\text{V}$"
              ]
            },
            {
              "title": "Plausibility and assumptions",
              "choices": [
                {
                  "label": "Equal origin voltage permits comparison of normalized attenuation alone."
                },
                {
                  "label": "Equal origin current permits comparison of normalized attenuation alone."
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "Equal origin voltage permits comparison of normalized attenuation alone."
              ]
            }
          ],
          "hints": [
            {
              "body": "Use $L=\\ell/\\lambda$ and $X=x/\\lambda$. Compare $V_0\\cosh(L-X)/\\cosh L$, $V_0e^{-X}$ and $V_0\\sinh(L-X)/\\sinh L$ under the three endpoint conditions."
            },
            {
              "body": "Start with $L=(0.6\\,\\text{mm})/(0.5\\,\\text{mm})$. Compute the recording position, then substitute each boundary condition."
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating.",
            "Compare physical lengths in the same unit.",
            "The recording lies within the finite segment.",
            "The boundary condition changes the profile at fixed origin voltage.",
            "The boundary condition changes the profile at fixed origin voltage.",
            "The boundary condition changes the profile at fixed origin voltage."
          ],
          "points": 1,
          "source": "L04 PDF 11–12"
        },
        {
          "id": "L04-a5",
          "role": "methods",
          "type": "written",
          "difficulty": "medium",
          "prompt": "Design a two-electrode steady recording test of a changed terminal load. Use the source profile to specify recordings, controls and one ambiguity if only a remote amplitude is available. What measurement distinguishes a sealed end from a shorted end when the endpoint voltage remains appreciable?",
          "markScheme": [
            {
              "text": "Inject controlled subthreshold current and measure source and remote voltage increments."
            },
            {
              "text": "Record stable baseline, path distance and sufficient time for steady response."
            },
            {
              "text": "Compare source voltage/current and remote/source attenuation separately."
            },
            {
              "text": "A remote amplitude alone mixes changed origin voltage with changed attenuation."
            },
            {
              "text": "The normalized profile comparison must state the endpoint model."
            },
            { "text": "A sealed end requires zero endpoint axial current, inferred from zero spatial voltage slope. A short fixes the endpoint voltage to the reference." }
          ],
          "modelAnswer": [
            "Inject controlled subthreshold current and measure source and remote voltage increments.",
            "Record stable baseline, path distance and sufficient time for steady response.",
            "Compare source voltage/current and remote/source attenuation separately.",
            "A remote amplitude alone mixes changed origin voltage with changed attenuation.",
            "The normalized profile comparison must state the endpoint model.",
            "A sealed end requires zero endpoint axial current, inferred from zero spatial voltage slope. A short fixes the endpoint voltage to the reference."
          ],
          "hints": [
            {
              "body": "Organize the requested subparts and state the passive model."
            },
            {
              "body": "Identify the stimulus and observation site, then compare causal order and boundary conditions."
            }
          ],
          "points": 1,
          "source": "L04 PDF7–13; L03 PDF3",
          "figure": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 4, PDF page 8 (printed slide 9). Original steady attenuation graph: sealed curve ends with zero slope, open curve reaches zero, infinite curve continues.",
            "fallbackAlt": "Original steady attenuation graph: sealed curve ends with zero slope, open curve reaches zero, infinite curve continues.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L04/profiles.webp', import.meta.url).href,
              "alt": "Original steady attenuation graph: sealed curve ends with zero slope, open curve reaches zero, infinite curve continues.",
              "aspect": 1.544904137235116,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ]
    },
    {
      "id": "L04-mock-B",
      "title": "Mock B: geometry, return path and voltage control",
      "coverage": "Lectures 1–4. Geometry-dependent scales, restricted extracellular path, imposed endpoints and measurement limitations.",
      "questions": [
        {
          "id": "L04-b1",
          "role": "concepts",
          "type": "written",
          "difficulty": "medium",
          "prompt": "a) Distinguish axial material resistivity from axial resistance per length. b) State what makes a process approximately isopotential. c) Define the terminal load ratio.",
          "markScheme": [
            {
              "text": "Material resistivity describes the material; resistance per length also depends on conducting cross-section."
            },
            {
              "text": "Electrotonic total length must be much smaller than one for the approximation."
            },
            {
              "text": "Terminal load ratio is terminal conductance divided by input conductance of one semi-infinite continuation."
            }
          ],
          "modelAnswer": [
            "Material resistivity describes the material; resistance per length also depends on conducting cross-section.",
            "Electrotonic total length must be much smaller than one for the approximation.",
            "Terminal load ratio is terminal conductance divided by input conductance of one semi-infinite continuation."
          ],
          "hints": [
            {
              "body": "Organize the requested subparts and state the passive model."
            },
            {
              "body": "Identify the stimulus and observation site, then compare causal order and boundary conditions."
            }
          ],
          "points": 1,
          "source": "Exercise 4 p1–2; L04 PDF5,11"
        },
        {
          "id": "L04-b2",
          "role": "explanation",
          "type": "written",
          "difficulty": "medium",
          "prompt": "Explain how channel opening and a restricted extracellular shell jointly change voltage uniformity. Sketch the two longitudinal paths and membrane leak. Explain why a physically tiny process is not automatically isopotential.",
          "markScheme": [
            {
              "text": "Opening channels lowers membrane resistance and length constant."
            },
            {
              "text": "A narrow extracellular annulus raises external axial resistance."
            },
            {
              "text": "The axial resistances add in the length-constant denominator."
            },
            {
              "text": "Draw internal and external longitudinal paths with transmembrane leak."
            },
            {
              "text": "Normalized total length, not physical length alone, determines the approximation."
            }
          ],
          "modelAnswer": [
            "Opening channels lowers membrane resistance and length constant.",
            "A narrow extracellular annulus raises external axial resistance.",
            "The axial resistances add in the length-constant denominator.",
            "Draw internal and external longitudinal paths with transmembrane leak.",
            "Normalized total length, not physical length alone, determines the approximation."
          ],
          "hints": [
            {
              "body": "Organize the requested subparts and state the passive model."
            },
            {
              "body": "Identify the stimulus and observation site, then compare causal order and boundary conditions."
            }
          ],
          "points": 1,
          "source": "Exercise 4 p1–2"
        },
        {
          "id": "L04-b3",
          "role": "calculation",
          "sectionId": "return",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "A cylindrical sensory process has radius $40\\,\\text{nm}$ and length $6\\,\\mu\\text{m}$. Both axial material resistivities are $150\\,\\Omega\\,\\text{cm}$. Its extracellular shell is $4\\,\\text{nm}$ thick and resting $R_m=8\\,\\text{k}\\Omega\\,\\text{cm}^2$. Find the shell area, both axial parameters, length constants with and without the return resistance and loaded electrotonic length. Then open channels to reduce specific membrane resistance sixteenfold. Explain whether physical smallness guarantees uniform voltage.",
          "stages": [
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "Radius",
                  "answer": {
                    "value": 4e-8,
                    "unit": "m",
                    "tolerance": 4e-14,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 4e-8,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Shell thickness",
                  "answer": {
                    "value": 4e-9,
                    "unit": "m",
                    "tolerance": 4e-15,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 4e-9,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Material resistivity",
                  "answer": {
                    "value": 1.5,
                    "unit": "ohm*m",
                    "tolerance": 0.0000015,
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
                  "label": "Specific membrane resistance",
                  "answer": {
                    "value": 0.8,
                    "unit": "ohm*m2",
                    "tolerance": 8e-7,
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
              "title": "Annular area",
              "answer": {
                "value": 1.0555751316061709e-15,
                "unit": "m2",
                "tolerance": 3.166725394818513e-18,
                "verification": {
                  "relation": "annulus",
                  "inputs": {
                    "radius": 4e-8,
                    "shell": 4e-9
                  },
                  "displayScale": 1
                }
              },
              "tex": "A_o=\\pi[(a+h)^2-a^2]",
              "modelAnswer": [
                "Subtract the core area from the outer disk.",
                "$A_o=\\pi[(a+h)^2-a^2]$",
                "$\\pi[((4e-08\\,\\mathrm{m})+(4e-09\\,\\mathrm{m}))^2-(4e-08\\,\\mathrm{m})^2]$",
                "$1.0555751e-15\\,\\text{m2}$"
              ]
            },
            {
              "title": "Internal axial parameter",
              "answer": {
                "value": 298415518297303.75,
                "unit": "ohm/m",
                "tolerance": 895246554891.9113,
                "verification": {
                  "relation": "cableAxial",
                  "inputs": {
                    "rho": 1.5,
                    "radius": 4e-8
                  },
                  "displayScale": 1
                }
              },
              "tex": "r_i=R_i/(\\pi a^2)",
              "modelAnswer": [
                "Use the core cross-section.",
                "$r_i=R_i/(\\pi a^2)$",
                "$(1.5\\,\\mathrm{ohm\\,m})/[\\pi(4e-08\\,\\mathrm{m})^2]$",
                "$2.9841552e+14\\,\\text{ohm/m}$"
              ]
            },
            {
              "title": "External axial parameter",
              "answer": {
                "value": 1421026277606208,
                "unit": "ohm/m",
                "tolerance": 4263078832818.624,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1.5,
                    "b": 1.0555751316061709e-15
                  },
                  "displayScale": 1
                }
              },
              "tex": "r_o=R_o/A_o",
              "modelAnswer": [
                "Equal material resistivities do not mean equal per-length resistances.",
                "$r_o=R_o/A_o$",
                "$(1.5000000\\,\\mathrm{ohm m})/(1.0555751e-15\\,\\mathrm{m^2})$",
                "$1.4210263e+15\\,\\text{ohm/m}$"
              ]
            },
            {
              "title": "Membrane parameter",
              "answer": {
                "value": 3183098.861837907,
                "unit": "ohm*m",
                "tolerance": 9549.296585513723,
                "verification": {
                  "relation": "cableMembrane",
                  "inputs": {
                    "specific": 0.8,
                    "radius": 4e-8
                  },
                  "displayScale": 1
                }
              },
              "tex": "r_m=R_m/(2\\pi a)",
              "modelAnswer": [
                "Use circumference for surface per length.",
                "$r_m=R_m/(2\\pi a)$",
                "$(0.8\\,\\mathrm{ohm\\,m2})/[2\\pi(4e-08\\,\\mathrm{m})]$",
                "$3183098.9\\,\\text{ohm*m}$"
              ]
            },
            {
              "title": "No-return length constant",
              "answer": {
                "value": 0.00010327955589886446,
                "unit": "m",
                "tolerance": 3.098386676965934e-7,
                "verification": {
                  "relation": "cableLength",
                  "inputs": {
                    "rm": 3183098.861837907,
                    "ri": 298415518297303.75
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\lambda_0=\\sqrt{r_m/r_i}",
              "modelAnswer": [
                "Neglecting the external path overestimates spread.",
                "$\\lambda_0=\\sqrt{r_m/r_i}$",
                "$\\sqrt{(3183098.86\\,\\mathrm{ohm\\,m})/[(2.98415518e+14\\,\\mathrm{ohm/m})+(0\\,\\mathrm{ohm/m})]}$",
                "$0.00010327956\\,\\text{m}$"
              ]
            },
            {
              "title": "Loaded length constant",
              "answer": {
                "value": 0.000043026034786179035,
                "unit": "m",
                "tolerance": 1.290781043585371e-7,
                "verification": {
                  "relation": "cableLength",
                  "inputs": {
                    "rm": 3183098.861837907,
                    "ri": 298415518297303.75,
                    "ro": 1421026277606208
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\lambda=\\sqrt{r_m/(r_i+r_o)}",
              "modelAnswer": [
                "Both longitudinal resistances contribute.",
                "$\\lambda=\\sqrt{r_m/(r_i+r_o)}$",
                "$\\sqrt{(3183098.86\\,\\mathrm{ohm\\,m})/[(2.98415518e+14\\,\\mathrm{ohm/m})+(1.42102628e+15\\,\\mathrm{ohm/m})]}$",
                "$4.3026035e-05\\,\\text{m}$"
              ]
            },
            {
              "title": "Resting electrotonic length",
              "answer": {
                "value": 0.1394504520302052,
                "unit": "",
                "tolerance": 0.0004183513560906156,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.000006,
                    "b": 0.000043026034786179035
                  },
                  "displayScale": 1
                }
              },
              "tex": "L=\\ell/\\lambda",
              "modelAnswer": [
                "Use the dimensionless ratio to assess uniformity.",
                "$L=\\ell/\\lambda$",
                "$(0.0000060000000\\,\\mathrm{m})/(0.000043026035\\,\\mathrm{m})$",
                "$0.13945045$"
              ]
            },
            {
              "title": "Activated length constant",
              "answer": {
                "value": 0.000010756508696544759,
                "unit": "m",
                "tolerance": 3.2269526089634275e-8,
                "verification": {
                  "relation": "cableLength",
                  "inputs": {
                    "rm": 198943.6788648692,
                    "ri": 298415518297303.75,
                    "ro": 1421026277606208
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\lambda_{active}=\\lambda/\\sqrt{16}",
              "modelAnswer": [
                "A sixteenfold resistance fall gives a fourfold scale decrease.",
                "$\\lambda_{active}=\\lambda/\\sqrt{16}$",
                "$\\sqrt{(198943.679\\,\\mathrm{ohm\\,m})/[(2.98415518e+14\\,\\mathrm{ohm/m})+(1.42102628e+15\\,\\mathrm{ohm/m})]}$",
                "$1.0756509e-05\\,\\text{m}$"
              ]
            },
            {
              "title": "Activated electrotonic length",
              "answer": {
                "value": 0.5578018081208208,
                "unit": "",
                "tolerance": 0.0016734054243624625,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.000006,
                    "b": 0.000010756508696544759
                  },
                  "displayScale": 1
                }
              },
              "tex": "L_{active}=\\ell/\\lambda_{active}",
              "modelAnswer": [
                "The activated process is less uniform; physical size alone is not enough.",
                "$L_{active}=\\ell/\\lambda_{active}$",
                "$(0.0000060000000\\,\\mathrm{m})/(0.000010756509\\,\\mathrm{m})$",
                "$0.55780181$"
              ]
            },
            {
              "title": "Plausibility and assumptions",
              "choices": [
                {
                  "label": "Channel opening shortens spread and makes this process less isopotential."
                },
                {
                  "label": "Channel opening extends spread and makes this process more isopotential."
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "Channel opening shortens spread and makes this process less isopotential."
              ]
            }
          ],
          "hints": [
            {
              "body": "Combine the annular return geometry with the cable parameters and normalized total length. Relations: $A_o=\\pi[(a+h)^2-a^2]$; $r_i=R_i/(\\pi a^2)$; $r_o=R_o/A_o$; $r_m=R_m/(2\\pi a)$; $\\lambda_0=\\sqrt{r_m/r_i}$; $\\lambda=\\sqrt{r_m/(r_i+r_o)}$; $L=\\ell/\\lambda$; $\\lambda_{active}=\\lambda/\\sqrt{16}$; $L_{active}=\\ell/\\lambda_{active}$."
            },
            {
              "body": "Start with $A_o=\\pi[(44\\times10^{-9}\\,\\text{m})^2-(40\\times10^{-9}\\,\\text{m})^2]$. Compute the axial and membrane parameters, both length constants and the two electrotonic lengths."
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating.",
            "Subtract the core area from the outer disk.",
            "Use the core cross-section.",
            "Equal material resistivities do not mean equal per-length resistances.",
            "Use circumference for surface per length.",
            "Neglecting the external path overestimates spread.",
            "Both longitudinal resistances contribute.",
            "Use the dimensionless ratio to assess uniformity.",
            "A sixteenfold resistance fall gives a fourfold scale decrease.",
            "The activated process is less uniform; physical size alone is not enough."
          ],
          "points": 1,
          "source": "Exercise 4 p1–2; answers p1–2; L03 PDF12,14"
        },
        {
          "id": "L04-b4",
          "role": "calculation",
          "sectionId": "endpoint",
          "difficulty": "medium",
          "type": "multiStepCalc",
          "prompt": "A finite cable has imposed increments $V_0=6\\,\\text{mV}$ and $V_e=-3\\,\\text{mV}$, with $L=1.6$. Calculate the midpoint increment. Could this negative end voltage also be a sealed end of a cable driven only by the positive origin?",
          "stages": [
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "Origin increment",
                  "answer": {
                    "value": 0.006,
                    "unit": "V",
                    "tolerance": 6e-9,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 0.006,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "End increment",
                  "answer": {
                    "value": -0.003,
                    "unit": "V",
                    "tolerance": 3e-9,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": -0.003,
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
              "title": "Midpoint increment",
              "answer": {
                "value": 0.0011215498773561293,
                "unit": "V",
                "tolerance": 0.0000033646496320683877,
                "verification": {
                  "relation": "endpointCable",
                  "inputs": {
                    "v0": 0.006,
                    "ve": -0.003,
                    "length": 1.6,
                    "x": 0.8
                  },
                  "displayScale": 1
                }
              },
              "tex": "V(X)=\\frac{V_0\\sinh(L-X)+V_e\\sinh X}{\\sinh L}",
              "modelAnswer": [
                "The midpoint is influenced by both endpoints.",
                "$V(X)=\\frac{V_0\\sinh(L-X)+V_e\\sinh X}{\\sinh L}$",
                "$\\frac{(0.006\\,\\mathrm{V})\\sinh((0.8))+(-0.003\\,\\mathrm{V})\\sinh((0.8))}{\\sinh((1.6))}$",
                "$0.0011215499\\,\\text{V}$"
              ]
            },
            {
              "title": "Boundary compatibility",
              "choices": [
                {
                  "label": "The end voltage requires an additional boundary drive in this setup"
                },
                {
                  "label": "The negative end voltage is forced by an insulated passive terminal"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "A positive origin with a sealed passive end gives a positive cosh profile."
              ]
            }
          ],
          "hints": [
            {
              "body": "Use the two-endpoint voltage solution, not the sealed-end solution. Relations: $V(X)=\\frac{V_0\\sinh(L-X)+V_e\\sinh X}{\\sinh L}$."
            },
            {
              "body": "Start with $V=[(0.006\\,\\text{V})\\sinh(0.8)-(0.003\\,\\text{V})\\sinh(0.8)]/\\sinh(1.6)$. Then compare its endpoint assumption with a sealed end."
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating.",
            "The midpoint is influenced by both endpoints.",
            "A positive origin with a sealed passive end gives a positive cosh profile."
          ],
          "points": 1,
          "source": "L04 PDF 11"
        },
        {
          "id": "L04-b5",
          "role": "methods",
          "type": "written",
          "difficulty": "medium",
          "prompt": "A recording team compares two cables at the same injected current and finds different remote voltages. Explain how source geometry and endpoint loading confound an inference about radius. Use the source neuron and propose additional measurements. Why does substituting a conductance pulse for a current pulse confound this comparison?",
          "markScheme": [
            {
              "text": "Radius changes cable parameters and input resistance."
            },
            {
              "text": "One-sided versus two-sided source geometry changes current division."
            },
            {
              "text": "Endpoint load changes both the profile and source response."
            },
            {
              "text": "Measure source voltage/current, remote/source ratio and known path distance under controlled baseline."
            },
            {
              "text": "Do not infer radius uniquely from one remote amplitude."
            },
            { "text": "Conductance-driven current depends on local driving force, so equal conductance changes can inject unequal currents across preparations." }
          ],
          "modelAnswer": [
            "Radius changes cable parameters and input resistance.",
            "One-sided versus two-sided source geometry changes current division.",
            "Endpoint load changes both the profile and source response.",
            "Measure source voltage/current, remote/source ratio and known path distance under controlled baseline.",
            "Do not infer radius uniquely from one remote amplitude.",
            "Conductance-driven current depends on local driving force, so equal conductance changes can inject unequal currents across preparations."
          ],
          "hints": [
            {
              "body": "Organize the requested subparts and state the passive model."
            },
            {
              "body": "Identify the stimulus and observation site, then compare causal order and boundary conditions."
            }
          ],
          "points": 1,
          "source": "L04 PDF7–13",
          "figure": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 4, PDF page 13 (printed slide 14). Neuron schematic with high-resistance dendritic tip, low-resistance somatic load and long axon.",
            "fallbackAlt": "Neuron schematic with high-resistance dendritic tip, low-resistance somatic load and long axon.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L04/neuron.webp', import.meta.url).href,
              "alt": "Neuron schematic with high-resistance dendritic tip, low-resistance somatic load and long axon.",
              "aspect": 2.4630071599045347,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ]
    },
    {
      "id": "L04-mock-C",
      "title": "Mock C: signed summation and causal traces",
      "coverage": "Lectures 1–4. Passive scales, temporal and spatial integration, signs and source trace interpretation.",
      "questions": [
        {
          "id": "L04-c1",
          "role": "concepts",
          "type": "written",
          "difficulty": "medium",
          "prompt": "a) Define the passive half-rise characteristic speed. b) Distinguish temporal from spatial summation. c) State the condition for linear waveform addition.",
          "markScheme": [
            {
              "text": "The taught characteristic speed is twice length constant divided by membrane time constant for the local half-rise contour approximation."
            },
            {
              "text": "Temporal summation involves overlap in time; spatial summation combines distinct input locations."
            },
            {
              "text": "Add responses at a common site and instant in the same linear passive current-driven system."
            }
          ],
          "modelAnswer": [
            "The taught characteristic speed is twice length constant divided by membrane time constant for the local half-rise contour approximation.",
            "Temporal summation involves overlap in time; spatial summation combines distinct input locations.",
            "Add responses at a common site and instant in the same linear passive current-driven system."
          ],
          "hints": [
            {
              "body": "Organize the requested subparts and state the passive model."
            },
            {
              "body": "Identify the stimulus and observation site, then compare causal order and boundary conditions."
            }
          ],
          "points": 1,
          "source": "L04 PDF2,15–16"
        },
        {
          "id": "L04-c2",
          "role": "explanation",
          "type": "written",
          "difficulty": "medium",
          "prompt": "Sketch separate and summed somatic responses to two inputs. Explain how distance and relative input timing affect summation and why a threshold spike or conductance interaction defeats unrestricted linear addition.",
          "markScheme": [
            {
              "text": "Label time and voltage increment on the sketch."
            },
            {
              "text": "Translate each separate response to the same somatic site and align stimulus timing."
            },
            {
              "text": "Distance changes attenuation, delay and width."
            },
            {
              "text": "Add waveforms point by point under the linear current-source assumptions."
            },
            {
              "text": "A spike is an active threshold response; a conductance input can alter its own current and interact nonlinearly."
            }
          ],
          "modelAnswer": [
            "Label time and voltage increment on the sketch.",
            "Translate each separate response to the same somatic site and align stimulus timing.",
            "Distance changes attenuation, delay and width.",
            "Add waveforms point by point under the linear current-source assumptions.",
            "A spike is an active threshold response; a conductance input can alter its own current and interact nonlinearly."
          ],
          "hints": [
            {
              "body": "Organize the requested subparts and state the passive model."
            },
            {
              "body": "Identify the stimulus and observation site, then compare causal order and boundary conditions."
            }
          ],
          "points": 1,
          "source": "L04 PDF14–19"
        },
        {
          "id": "L04-c3",
          "role": "calculation",
          "sectionId": "scaling",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "A uniform passive neurite has diameter $3.2\\,\\mu\\text{m}$, $R_m=12\\,\\text{k}\\Omega\\,\\text{cm}^2$, $R_i=150\\,\\Omega\\,\\text{cm}$ and $C_m=1\\,\\mu\\text{F/cm}^2$. Find radius in SI, length constant, time constant and characteristic speed. Explain why this is not a measured spike speed.",
          "stages": [
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "Radius",
                  "answer": {
                    "value": 0.0000016,
                    "unit": "m",
                    "tolerance": 1.5999999999999998e-12,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 0.0000016,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Specific membrane resistance",
                  "answer": {
                    "value": 1.2,
                    "unit": "ohm*m2",
                    "tolerance": 0.0000012,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 1.2,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Axial resistivity",
                  "answer": {
                    "value": 1.5,
                    "unit": "ohm*m",
                    "tolerance": 0.0000015,
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
                    "tolerance": 1e-8,
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
              "title": "Length constant",
              "answer": {
                "value": 0.0008,
                "unit": "m",
                "tolerance": 0.0000024000000000000003,
                "verification": {
                  "relation": "cableLength",
                  "inputs": {
                    "rm": 119366.2073189215,
                    "ri": 186509698935.81488
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\lambda=\\sqrt{R_ma/(2R_i)}",
              "modelAnswer": [
                "Check radius rather than diameter.",
                "$\\lambda=\\sqrt{R_ma/(2R_i)}$",
                "$\\sqrt{(119366.207\\,\\mathrm{ohm\\,m})/[(1.86509699e+11\\,\\mathrm{ohm/m})+(0\\,\\mathrm{ohm/m})]}$",
                "$0.0008\\,\\text{m}$"
              ]
            },
            {
              "title": "Time constant",
              "answer": {
                "value": 0.012,
                "unit": "s",
                "tolerance": 0.000036,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 1.2,
                    "b": 0.01
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\tau_m=R_mC_m",
              "modelAnswer": [
                "Units reduce to seconds.",
                "$\\tau_m=R_mC_m$",
                "$(1.2000000\\,\\mathrm{ohm m^2})\\times(0.010000000\\,\\mathrm{F/m^2})$",
                "$0.012\\,\\text{s}$"
              ]
            },
            {
              "title": "Characteristic speed",
              "answer": {
                "value": 0.13333333333333333,
                "unit": "m/s",
                "tolerance": 0.0004,
                "verification": {
                  "relation": "passiveSpeed",
                  "inputs": {
                    "lambda": 0.0008,
                    "tau": 0.012
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\theta=2\\lambda/\\tau_m",
              "modelAnswer": [
                "This tracks the passive half-rise approximation.",
                "$\\theta=2\\lambda/\\tau_m$",
                "$2(0.0008\\,\\mathrm{m})/(0.012\\,\\mathrm{s})$",
                "$0.13333333\\,\\text{m/s}$"
              ]
            },
            {
              "title": "Plausibility",
              "choices": [
                {
                  "label": "This is a passive characteristic, not active spike regeneration"
                },
                {
                  "label": "This is a measured spike speed, fixed by diameter alone"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "The supplied passive parameters do not define an active channel model."
              ]
            }
          ],
          "hints": [
            {
              "body": "Combine geometry, spatial scale and local membrane timing. Relations: $\\lambda=\\sqrt{R_ma/(2R_i)}$; $\\tau_m=R_mC_m$; $\\theta=2\\lambda/\\tau_m$."
            },
            {
              "body": "Start with $a=(3.2\\times10^{-6}\\,\\text{m})/2$. Convert the specific parameters, then compute the scales and their speed ratio."
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating.",
            "Check radius rather than diameter.",
            "Units reduce to seconds.",
            "This tracks the passive half-rise approximation.",
            "The supplied passive parameters do not define an active channel model."
          ],
          "points": 1,
          "source": "L04 PDF 3"
        },
        {
          "id": "L04-c4",
          "role": "calculation",
          "sectionId": "superposition",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "Two additive current inputs act in an ideal linear cable. Their separate steady local increments are $+8\\,\\text{mV}$ at $X=0.4$ and $-6\\,\\text{mV}$ at $X=1.1$ from the same recording site. Each individual transfer follows a matched exponential. Find both contributions at the recording site, their sum and the resulting absolute membrane voltage from a $-65\\,\\text{mV}$ baseline. State the current-source assumption.",
          "stages": [
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "Positive local increment",
                  "answer": {
                    "value": 0.008,
                    "unit": "V",
                    "tolerance": 8e-9,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 0.008,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Negative local increment",
                  "answer": {
                    "value": -0.006,
                    "unit": "V",
                    "tolerance": 6e-9,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": -0.006,
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
              "title": "Positive contribution",
              "answer": {
                "value": 0.005362560368285115,
                "unit": "V",
                "tolerance": 0.000016087681104855343,
                "verification": {
                  "relation": "cableDecay",
                  "inputs": {
                    "v": 0.008,
                    "x": 0.4,
                    "lambda": 1
                  },
                  "displayScale": 1
                }
              },
              "tex": "V_1=0.008\\,\\text{V}\\,e^{-0.4}",
              "modelAnswer": [
                "Use the transfer to the shared observation site.",
                "$V_1=0.008\\,\\text{V}\\,e^{-0.4}$",
                "$(0.008\\,\\mathrm{V})\\exp[-|(0.4)|/(1\\,\\mathrm{m})]$",
                "$0.0053625604\\,\\text{V}$"
              ]
            },
            {
              "title": "Negative contribution",
              "answer": {
                "value": -0.0019972265021884774,
                "unit": "V",
                "tolerance": 0.000005991679506565432,
                "verification": {
                  "relation": "cableDecay",
                  "inputs": {
                    "v": -0.006,
                    "x": 1.1,
                    "lambda": 1
                  },
                  "displayScale": 1
                }
              },
              "tex": "V_2=-0.006\\,\\text{V}\\,e^{-1.1}",
              "modelAnswer": [
                "Attenuation preserves the negative sign.",
                "$V_2=-0.006\\,\\text{V}\\,e^{-1.1}$",
                "$(-0.006\\,\\mathrm{V})\\exp[-|(1.1)|/(1\\,\\mathrm{m})]$",
                "$-0.0019972265\\,\\text{V}$"
              ]
            },
            {
              "title": "Combined increment",
              "answer": {
                "value": 0.0033653338660966374,
                "unit": "V",
                "tolerance": 0.000010096001598289912,
                "verification": {
                  "relation": "sum",
                  "inputs": {
                    "a": 0.005362560368285115,
                    "b": -0.0019972265021884774
                  },
                  "displayScale": 1
                }
              },
              "tex": "V=V_1+V_2",
              "modelAnswer": [
                "This sum is rest-relative.",
                "$V=V_1+V_2$",
                "$(0.0053625604\\,\\mathrm{V})+(-0.0019972265\\,\\mathrm{V})$",
                "$0.0033653339\\,\\text{V}$"
              ]
            },
            {
              "title": "Absolute membrane voltage",
              "answer": {
                "value": -0.061634666133903365,
                "unit": "V",
                "tolerance": 0.0001849039984017101,
                "verification": {
                  "relation": "sum",
                  "inputs": {
                    "a": -0.065,
                    "b": 0.0033653338660966374
                  },
                  "displayScale": 1
                }
              },
              "tex": "V_m=V_{rest}+V",
              "modelAnswer": [
                "The resulting membrane potential can remain negative despite depolarization.",
                "$V_m=V_{rest}+V$",
                "$(-0.065000000\\,\\mathrm{V})+(0.0033653339\\,\\mathrm{V})$",
                "$-0.061634666\\,\\text{V}$"
              ]
            },
            {
              "title": "Plausibility and assumptions",
              "choices": [
                {
                  "label": "The membrane can remain negative while its increment is depolarizing."
                },
                {
                  "label": "A positive membrane increment requires an absolute positive membrane voltage."
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "The membrane can remain negative while its increment is depolarizing."
              ]
            }
          ],
          "hints": [
            {
              "body": "Use signed spatial attenuation for each input, then add at a common site. Relations: $V_1=0.008\\,\\text{V}\\,e^{-0.4}$; $V_2=-0.006\\,\\text{V}\\,e^{-1.1}$; $V=V_1+V_2$; $V_m=V_{rest}+V$."
            },
            {
              "body": "Start with $V_1=(8\\times10^{-3}\\,\\text{V})e^{-0.4}$. Attenuate the second input, add the increments and then add the resting baseline."
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating.",
            "Use the transfer to the shared observation site.",
            "Attenuation preserves the negative sign.",
            "This sum is rest-relative.",
            "The resulting membrane potential can remain negative despite depolarization."
          ],
          "points": 1,
          "source": "L04 PDF 16"
        },
        {
          "id": "L04-c5",
          "role": "methods",
          "type": "written",
          "difficulty": "medium",
          "prompt": "Read the spatial-integration source. Map the input and target recording sites, describe separate versus combined responses, correct the timing warning and design a control that distinguishes peak compensation from equal waveforms. Why should the experiment compare aligned waveforms before adding the two input responses?",
          "markScheme": [
            {
              "text": "Input sites one and two are presynaptic; target sites three and four are dendrite and trigger zone."
            },
            {
              "text": "Separate inputs give graded target responses; combined inputs can cross threshold."
            },
            {
              "text": "The explicitly marked middle-column response must occur later than shown."
            },
            {
              "text": "Record full time-aligned somatic responses to separate and combined small inputs."
            },
            {
              "text": "Equal peaks alone do not imply equal delay, width or subsequent integration."
            },
            { "text": "Peaks at different times need not overlap. Test linear summation by adding the individually measured waveforms at the same site and matched stimulus times." }
          ],
          "modelAnswer": [
            "Input sites one and two are presynaptic; target sites three and four are dendrite and trigger zone.",
            "Separate inputs give graded target responses; combined inputs can cross threshold.",
            "The explicitly marked middle-column response must occur later than shown.",
            "Record full time-aligned somatic responses to separate and combined small inputs.",
            "Equal peaks alone do not imply equal delay, width or subsequent integration.",
            "Peaks at different times need not overlap. Test linear summation by adding the individually measured waveforms at the same site and matched stimulus times."
          ],
          "hints": [
            {
              "body": "Organize the requested subparts and state the passive model."
            },
            {
              "body": "Identify the stimulus and observation site, then compare causal order and boundary conditions."
            }
          ],
          "points": 1,
          "source": "L04 PDF18–19",
          "figure": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 4, PDF page 18 (printed slide 19). Separate and combined presynaptic inputs with target dendrite and trigger-zone recordings. The source flags a response drawn too early. Interpret causal order; no numerical latency is inferred.",
            "fallbackAlt": "Separate and combined presynaptic inputs with target dendrite and trigger-zone recordings. The source flags a response drawn too early.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L04/spatial.webp', import.meta.url).href,
              "alt": "Separate and combined presynaptic inputs with target dendrite and trigger-zone recordings. The source flags a response drawn too early.",
              "aspect": 1.2943327239488116,
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
content.formulaReferenceNote='Official exam PDF p4, full-course reference. These questions require lectures 1–4 only.';
export default content;
