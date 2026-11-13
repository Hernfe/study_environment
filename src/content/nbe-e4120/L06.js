// Sources: docs/scope/nbe-e4120/L06.md
import { equationSheet } from './equation-sheet.js';
const content = {
  "meta": {
    "id": "L06",
    "number": 6,
    "title": "Membrane nonlinearities: permeation, energy barriers and gates",
    "chapters": [],
    "pages": [],
    "lectureDate": "2026-10-09",
    "examDate": "2026-11-30",
    "examLabel": "Final exam"
  },
  "objectives": [
    "Distinguish concentration-gradient, barrier and gating sources of nonlinearity.",
    "Predict directional flux and current using explicit voltage and valence conventions.",
    "Infer steady activation, rates, time constants and whole-channel probabilities.",
    "Interpret clamp traces and reversal-based conductance without overidentifying a mechanism."
  ],
  "prerequisites": [
    {
      "text": "Selective reversal, GHK and driving force",
      "lectureId": "L02",
      "sectionId": "ghk"
    },
    {
      "text": "Cellular models and active versus passive behavior",
      "lectureId": "L05",
      "sectionId": "functional"
    }
  ],
  "segmentedPractice": true,
  "sections": [
    {
      "id": "overview",
      "title": "Overview: permeation, barriers and gates",
      "keyTerms": [],
      "source": "L06 PDF 1",
      "blocks": [
        {
          "type": "text",
          "body": ["Lecture 6 separates three questions: how ions permeate an open pore, which energy barrier limits passage, and how the fraction of conducting channels changes. A curved current–voltage relation alone does not prove that gates move. Concentration gradients or an asymmetric barrier can also produce curvature.", "The models introduced on PDF page 1 and compared on pages 18–21 can work together. Use $V_m=V_{in}-V_{out}$ and positive outward ionic current throughout. First identify whether the observation concerns static permeation or a time-dependent change in channel state."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 6, PDF page 21. Source comparison table for constant-field, barrier and gate models. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 6, PDF page 21. Source comparison table for constant-field, barrier and gate models. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L06/comparison.webp', import.meta.url).href,
              "alt": "Lecture 6, PDF page 21. Source comparison table for constant-field, barrier and gate models. Original labels, axes and scale bars retained.",
              "aspect": 1.99182156133829,
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
          "id": "L06-overview-check",
          "prompt": "Which model explicitly tracks a changing gating state?",
          "correct": 0,
          "options": [
            {
              "text": "The gate model with a dynamic state variable",
              "feedback": "The state variable stores how opening changes with time."
            },
            {
              "text": "The constant-field model with fixed permeability",
              "feedback": "Fixed permeability specifies permeation without a changing gate state."
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
            "The gate model with a dynamic state variable."
          ]
        },
        {
          "id": "L06-overview-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L06 PDF 1,18",
          "prompt": "Which quantity describes permeation through an already open pore?",
          "options": [
            {
              "text": "The current carried by ions through the pore",
              "feedback": "Permeation describes ion passage once the pore is available."
            },
            {
              "text": "The fraction of channels in the open state",
              "feedback": "The open fraction describes gating, which controls access to the pore."
            },
            {
              "text": "The rate of switching between channel states",
              "feedback": "State-transition rates describe gating rather than open-pore ion passage."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Permeation describes ion passage once the pore is available."
          ]
        }
      ],
      "part": {
        "id": "permeation",
        "number": 1,
        "title": "Static permeation and energy barriers"
      }
    },
    {
      "id": "rectification",
      "title": "Recognize membrane rectification",
      "keyTerms": [],
      "source": "L06 PDF 2",
      "blocks": [
        {
          "type": "text",
          "body": ["Rectification means that current passes more easily in one direction: inward rectification favors inward current, outward rectification favors outward current. PDF page 2 also shows that linear behavior may hold only over a restricted voltage range; a membrane can rectify differently in different ranges.", "Locate reversal before comparing the two sides. Unequal current magnitudes at unequal driving forces do not by themselves establish unequal conductance. Distinguish curvature with voltage from a change over time at fixed voltage; these observations place different demands on a model."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 6, PDF page 2. Representative current–voltage relations with reversal reference and directional curvature. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 6, PDF page 2. Representative current–voltage relations with reversal reference and directional curvature. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L06/rectification.webp', import.meta.url).href,
              "alt": "Lecture 6, PDF page 2. Representative current–voltage relations with reversal reference and directional curvature. Original labels, axes and scale bars retained.",
              "aspect": 1.1695760598503742,
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
          "id": "L06-rectification-check",
          "prompt": "What does inward rectification describe?",
          "correct": 1,
          "options": [
            {
              "text": "Greater ease of outward than inward current",
              "feedback": "That describes outward rectification, which favors outward current."
            },
            {
              "text": "Greater ease of inward than outward current",
              "feedback": "Inward rectification favors inward current relative to outward current."
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
            "Greater ease of inward than outward current."
          ]
        },
        {
          "id": "L06-rectification-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L06 PDF 2",
          "prompt": "What is the reversal potential on a current–voltage plot?",
          "options": [
            {
              "text": "The voltage where the ionic current is largest",
              "feedback": "A maximum current is not reversal; reversal is the zero-current crossing."
            },
            {
              "text": "The voltage where the local slope is zero",
              "feedback": "A horizontal tangent identifies zero slope, not necessarily zero current."
            },
            {
              "text": "The voltage where the ionic current is zero",
              "feedback": "At reversal, inward and outward ionic contributions balance."
            }
          ],
          "correct": 2,
          "modelAnswer": [
            "At reversal, inward and outward ionic contributions balance."
          ]
        }
      ]
    },
    {
      "id": "constant-field",
      "title": "Constant-field current and its limits",
      "keyTerms": [],
      "source": "L06 PDF 3",
      "blocks": [
        {
          "type": "text",
          "body": ["GHK assumes independent permeation through a uniform electric field with fixed permeability. Unequal concentrations can bend the current–voltage relation without any gates opening or closing. For the positive ion on PDF page 3, higher outside concentration gives positive reversal and inward rectification; higher inside gives the opposite pairing.", "Use the current-density explorer below with inside and outside concentrations in consistent SI units. Current density becomes total current only after multiplication by membrane area. An incompatible rectification/reversal pairing rules out this fixed-permeability account, but a compatible curve does not uniquely prove it."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 6, PDF page 3. GHK current family with concentration ratios and signed voltage/current axes. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 6, PDF page 3. GHK current family with concentration ratios and signed voltage/current axes. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L06/ghk.webp', import.meta.url).href,
              "alt": "Lecture 6, PDF page 3. GHK current family with concentration ratios and signed voltage/current axes. Original labels, axes and scale bars retained.",
              "aspect": 1.3191214470284238,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L06-f-ghk",
          "name": "Constant-field current density",
          "tex": "j=P_m\\frac{z^2F^2V_m}{RT}\\frac{C_i-C_oe^{-zFV_m/(RT)}}{1-e^{-zFV_m/(RT)}}",
          "symbols": [
            {
              "tex": "j",
              "name": "Outward current density",
              "unit": "\\mathrm{A/m^2}",
              "meaning": "Outward current density in the stated model."
            },
            {
              "tex": "P_m",
              "name": "Permeability",
              "unit": "\\mathrm{m/s}",
              "meaning": "Permeability in the stated model."
            },
            {
              "tex": "V_m",
              "name": "Inside potential",
              "unit": "\\mathrm V",
              "meaning": "Inside potential in the stated model."
            },
            {
              "tex": "C_i",
              "name": "Inside concentration",
              "unit": "\\mathrm{mol/m^3}",
              "meaning": "Inside concentration in the stated model."
            },
            {
              "tex": "C_o",
              "name": "Outside concentration",
              "unit": "\\mathrm{mol/m^3}",
              "meaning": "Outside concentration in the stated model."
            },
            {
              "tex": "z",
              "name": "Charge valence",
              "unit": "1",
              "meaning": "Valence of the permeating ion or modeled gating charge, as specified."
            },
            {
              "tex": "F",
              "name": "Faraday constant",
              "unit": "\\mathrm{C/mol}",
              "meaning": "Molar charge scale."
            },
            {
              "tex": "R",
              "name": "Gas constant",
              "unit": "\\mathrm{J/(mol\\,K)}",
              "meaning": "Molar thermal-energy scale."
            },
            {
              "tex": "T",
              "name": "Absolute temperature",
              "unit": "\\mathrm K",
              "meaning": "Temperature in kelvin."
            }
          ],
          "reads": "A concentration gradient can rectify current even at fixed permeability.",
          "assumes": "Independent permeation, constant field; current density convention.",
          "variants": [],
          "drill": {
            "prompt": "Use $P_m=2\\times10^{-8}\\,\\mathrm{m/s}$, $z=1$, $F=96485\\,\\mathrm{C/mol}$, $R=8.314\\,\\mathrm{J/(mol\\,K)}$, $T=293\\,\\mathrm K$, $V_m=0.025\\,\\mathrm V$, $C_i=120$ and $C_o=12\\,\\mathrm{mol/m^3}$. Calculate outward current density.",
            "answer": {
              "value": 0.35127603007599756,
              "unit": "A/m2",
              "tolerance": 0.0010538280902279928,
              "verification": {
                "relation": "ghkCurrent",
                "inputs": {
                  "z": 1,
                  "f": 96485,
                  "r": 8.314,
                  "temperature": 293,
                  "v": 0.025,
                  "inside": 120,
                  "outside": 12,
                  "permeability": 2e-08
                },
                "displayScale": 1
              }
            },
            "tex": "j=(2\\times10^{-8})\\frac{96485^2(0.025)}{8.314(293)}\\frac{120-12e^{-96485(0.025)/(8.314(293))}}{1-e^{-96485(0.025)/(8.314(293))}}",
            "modelAnswer": [
              "A concentration gradient can rectify current even at fixed permeability."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $j=P_m\\frac{z^2F^2V_m}{RT}\\frac{C_i-C_oe^{-zFV_m/(RT)}}{1-e^{-zFV_m/(RT)}}$."
              },
              {
                "body": "Use $V_T=RT/F$, then the dimensionless ratio $V_m/V_T$. Start with $V_T=(8.314\\times293)/96485\\,\\mathrm V$; form the exponential and the concentration terms separately before multiplying the current-density prefactor."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{j}}={\\htmlClass{formula-term-1}{P_m}}\\frac{{\\htmlClass{formula-term-5}{z}}^2{\\htmlClass{formula-term-6}{F}}^2{\\htmlClass{formula-term-2}{V_m}}}{{\\htmlClass{formula-term-7}{R}}{\\htmlClass{formula-term-8}{T}}}\\frac{{\\htmlClass{formula-term-3}{C_i}}-{\\htmlClass{formula-term-4}{C_o}}e^{-{\\htmlClass{formula-term-5}{z}}{\\htmlClass{formula-term-6}{F}}{\\htmlClass{formula-term-2}{V_m}}/({\\htmlClass{formula-term-7}{R}}{\\htmlClass{formula-term-8}{T}})}}{1-e^{-{\\htmlClass{formula-term-5}{z}}{\\htmlClass{formula-term-6}{F}}{\\htmlClass{formula-term-2}{V_m}}/({\\htmlClass{formula-term-7}{R}}{\\htmlClass{formula-term-8}{T}})}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L06-constant-field-check",
          "prompt": "What can cause GHK nonlinearity with fixed permeability?",
          "correct": 0,
          "options": [
            {
              "text": "Unequal concentrations on the two sides",
              "feedback": "A concentration gradient can curve the relation without changing pore availability."
            },
            {
              "text": "Time-dependent opening of the channel gates",
              "feedback": "Fixed-permeability GHK has no dynamic opening variable."
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
            "Unequal concentrations on the two sides."
          ]
        },
        {
          "id": "L06-constant-field-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L06 PDF 3",
          "prompt": "Which electric-field assumption defines the constant-field model?",
          "options": [
            {
              "text": "The field is absent throughout the membrane",
              "feedback": "Constant field does not mean zero field; applied voltage can bias flux."
            },
            {
              "text": "The field is uniform across the membrane",
              "feedback": "The constant-field approximation uses a uniform transmembrane field."
            },
            {
              "text": "The field is confined to one narrow barrier",
              "feedback": "A localized barrier belongs to an energy-barrier account."
            }
          ],
          "correct": 1,
          "modelAnswer": [
            "The constant-field approximation uses a uniform transmembrane field."
          ]
        }
      ]
    },
    {
      "id": "barrier",
      "title": "One dominant energy barrier",
      "keyTerms": [],
      "source": "L06 PDF 4",
      "blocks": [
        {
          "type": "text",
          "body": ["An energy barrier represents the energetic cost of ion passage through a pore. Local potential need not vary linearly because ions within the channel can alter the field. PDF page 4 distinguishes one dominant rate-limiting barrier from several comparable barriers, which require a richer model.", "The two crossing coefficients describe opposite directions over the barrier. Their values concern permeation through the pore, not the probability that a gate is open. A higher activation barrier slows crossing; the shape of a current–voltage curve therefore depends on the energetic pathway as well as concentrations."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 6, PDF page 4. Zero-voltage energy barrier, outside/inside concentrations and partitioning. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 6, PDF page 4. Zero-voltage energy barrier, outside/inside concentrations and partitioning. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L06/barrier.webp', import.meta.url).href,
              "alt": "Lecture 6, PDF page 4. Zero-voltage energy barrier, outside/inside concentrations and partitioning. Original labels, axes and scale bars retained.",
              "aspect": 0.8329694323144105,
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
          "id": "L06-barrier-check",
          "prompt": "What does a permeation energy barrier obstruct?",
          "correct": 1,
          "options": [
            {
              "text": "Movement of a gating particle between channel states",
              "feedback": "That describes a gating transition, not the path of a permeating ion."
            },
            {
              "text": "Movement of the permeating ion through a pore",
              "feedback": "The barrier is the energetic obstacle an ion crosses in the pore."
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
            "Movement of the permeating ion through a pore."
          ]
        },
        {
          "id": "L06-barrier-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L06 PDF 4",
          "prompt": "When is a single dominant barrier a suitable approximation?",
          "options": [
            {
              "text": "One crossing step limits the overall passage",
              "feedback": "A dominant rate-limiting step can represent the main obstruction to passage."
            },
            {
              "text": "Several crossing steps limit passage equally",
              "feedback": "Comparable rate-limiting barriers require a multiple-barrier account."
            },
            {
              "text": "Every crossing step has negligible resistance",
              "feedback": "A negligible barrier cannot be the dominant obstruction to passage."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "A dominant rate-limiting step can represent the main obstruction to passage."
          ]
        }
      ]
    },
    {
      "id": "independence",
      "title": "Independence, partitioning and directional flux",
      "keyTerms": [],
      "source": "L06 PDF 5",
      "blocks": [
        {
          "type": "text",
          "body": ["Independent passage means one ion does not alter another ion’s passage. PDF page 5 lists saturation of finite binding sites, flux coupling and interacting ions at multiple sites as limitations. The partition coefficient $\\beta_p$ is channel concentration divided by surrounding solution concentration, distinct from the later closing rate $\\beta$.", "Calculate each directional flux from its source side: inward uses outside concentration and outward uses inside concentration. Multiply crossing coefficient, partition coefficient and concentration, as in the explorers below. Keep both fluxes positive as directional magnitudes; subtract them only when forming signed net current."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 6, PDF page 4. Zero-voltage energy barrier, outside/inside concentrations and partitioning. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 6, PDF page 4. Zero-voltage energy barrier, outside/inside concentrations and partitioning. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L06/barrier.webp', import.meta.url).href,
              "alt": "Lecture 6, PDF page 4. Zero-voltage energy barrier, outside/inside concentrations and partitioning. Original labels, axes and scale bars retained.",
              "aspect": 0.8329694323144105,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L06-f-influx",
          "name": "Directional influx",
          "tex": "J=k\\beta_p C",
          "symbols": [
            {
              "tex": "J",
              "name": "Directional flux",
              "unit": "\\mathrm{mol/(m^2s)}",
              "meaning": "Directional flux in the stated model."
            },
            {
              "tex": "k",
              "name": "Crossing coefficient",
              "unit": "\\mathrm{m/s}",
              "meaning": "Crossing coefficient in the stated model."
            },
            {
              "tex": "\\beta_p",
              "name": "Partition coefficient",
              "unit": "1",
              "meaning": "Partition coefficient in the stated model."
            },
            {
              "tex": "C",
              "name": "Source-side concentration",
              "unit": "\\mathrm{mol/m^3}",
              "meaning": "Source-side concentration in the stated model."
            }
          ],
          "reads": "Directional flux scales with coefficient, partitioning and source concentration.",
          "assumes": "Independent passage, effective crossing coefficient.",
          "variants": [],
          "drill": {
            "prompt": "For the inward direction, use $k=2\\times10^{-6}\\,\\mathrm{m/s}$, $\\beta_p=0.25$ and source concentration $80\\,\\mathrm{mol/m^3}$. Find flux.",
            "answer": {
              "value": 3.9999999999999996e-05,
              "unit": "mol/m2/s",
              "tolerance": 1.2e-07,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 5e-07,
                  "b": 80
                },
                "displayScale": 1
              }
            },
            "tex": "J=(2\\times10^{-6})(0.25)(80)",
            "modelAnswer": [
              "Directional flux scales with coefficient, partitioning and source concentration."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $J=k\\beta_p C$."
              },
              {
                "body": "Start with $J=(2\\times10^{-6})(0.25)(80)$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{J}}={\\htmlClass{formula-term-1}{k}}{\\htmlClass{formula-term-2}{\\beta_p}} {\\htmlClass{formula-term-3}{C}}"
        },
        {
          "id": "L06-f-outflux",
          "name": "Directional outflux",
          "tex": "J=k\\beta_p C",
          "symbols": [
            {
              "tex": "J",
              "name": "Directional flux",
              "unit": "\\mathrm{mol/(m^2s)}",
              "meaning": "Directional flux in the stated model."
            },
            {
              "tex": "k",
              "name": "Crossing coefficient",
              "unit": "\\mathrm{m/s}",
              "meaning": "Crossing coefficient in the stated model."
            },
            {
              "tex": "\\beta_p",
              "name": "Partition coefficient",
              "unit": "1",
              "meaning": "Partition coefficient in the stated model."
            },
            {
              "tex": "C",
              "name": "Source-side concentration",
              "unit": "\\mathrm{mol/m^3}",
              "meaning": "Source-side concentration in the stated model."
            }
          ],
          "reads": "Directional flux scales with coefficient, partitioning and source concentration.",
          "assumes": "Independent passage, effective crossing coefficient.",
          "variants": [],
          "drill": {
            "prompt": "For the outward direction, use $k=3\\times10^{-6}\\,\\mathrm{m/s}$, $\\beta_p=0.25$ and source concentration $100\\,\\mathrm{mol/m^3}$. Find flux.",
            "answer": {
              "value": 7.500000000000001e-05,
              "unit": "mol/m2/s",
              "tolerance": 2.2500000000000002e-07,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 7.5e-07,
                  "b": 100
                },
                "displayScale": 1
              }
            },
            "tex": "J=(3\\times10^{-6})(0.25)(100)",
            "modelAnswer": [
              "Directional flux scales with coefficient, partitioning and source concentration."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $J=k\\beta_p C$."
              },
              {
                "body": "Start with $J=(3\\times10^{-6})(0.25)(100)$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{J}}={\\htmlClass{formula-term-1}{k}}{\\htmlClass{formula-term-2}{\\beta_p}} {\\htmlClass{formula-term-3}{C}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L06-independence-check",
          "prompt": "Which observation challenges independent passage?",
          "correct": 0,
          "options": [
            {
              "text": "Flux saturates as binding sites become occupied",
              "feedback": "Finite binding capacity can make flux saturate rather than remain proportional."
            },
            {
              "text": "Flux scales with concentration at fixed coefficient",
              "feedback": "Proportional flux at fixed coefficient is consistent with independent passage."
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
            "Flux saturates as binding sites become occupied."
          ]
        },
        {
          "id": "L06-independence-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L06 PDF 5",
          "prompt": "What does the partition coefficient compare?",
          "options": [
            {
              "text": "Outside concentration with inside concentration",
              "feedback": "The transmembrane concentration ratio differs from channel-to-solution partitioning."
            },
            {
              "text": "Opening transition rate with closing transition rate",
              "feedback": "A ratio of gating rates describes state balance, not ion partitioning."
            },
            {
              "text": "Channel concentration with solution concentration",
              "feedback": "Partitioning compares ion concentration inside the channel with the surrounding solution."
            }
          ],
          "correct": 2,
          "modelAnswer": [
            "Partitioning compares ion concentration inside the channel with the surrounding solution."
          ]
        }
      ]
    },
    {
      "id": "zero-barrier",
      "title": "Symmetric barrier at zero voltage",
      "keyTerms": [],
      "source": "L06 PDF 6",
      "blocks": [
        {
          "type": "text",
          "body": ["At zero voltage the symmetric barrier on PDF page 6 gives equal crossing coefficients in both directions. The Arrhenius relation below makes crossing exponentially slower as activation energy increases relative to thermal energy. Its exponent is dimensionless; the prefactor and crossing coefficient have the same units.", "Equal coefficients do not mean equal fluxes: their ratio is still set by outside versus inside concentration when partitioning is common. Net flux vanishes only when the two directional contributions balance. This concentration argument also applies to neutral particles, for which voltage supplies no electrical bias."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 6, PDF page 4. Zero-voltage energy barrier, outside/inside concentrations and partitioning. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 6, PDF page 4. Zero-voltage energy barrier, outside/inside concentrations and partitioning. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L06/barrier.webp', import.meta.url).href,
              "alt": "Lecture 6, PDF page 4. Zero-voltage energy barrier, outside/inside concentrations and partitioning. Original labels, axes and scale bars retained.",
              "aspect": 0.8329694323144105,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L06-f-arrhenius",
          "name": "Activation energy controls crossing",
          "tex": "k_0=Ae^{-\\Delta G_0/(RT)}",
          "symbols": [
            {
              "tex": "k_0",
              "name": "Crossing coefficient",
              "unit": "\\mathrm{m/s}",
              "meaning": "Crossing coefficient in the stated model."
            },
            {
              "tex": "A",
              "name": "Prefactor",
              "unit": "\\mathrm{m/s}",
              "meaning": "Prefactor in the stated model."
            },
            {
              "tex": "\\Delta G_0",
              "name": "Molar activation energy",
              "unit": "\\mathrm{J/mol}",
              "meaning": "Molar activation energy in the stated model."
            },
            {
              "tex": "R",
              "name": "Gas constant",
              "unit": "\\mathrm{J/(mol\\,K)}",
              "meaning": "Gas constant in the stated model."
            },
            {
              "tex": "T",
              "name": "Temperature",
              "unit": "\\mathrm K",
              "meaning": "Temperature in the stated model."
            }
          ],
          "reads": "A higher activation barrier lowers the crossing coefficient exponentially.",
          "assumes": "The barrier is expressed in multiples of thermal energy.",
          "variants": [],
          "drill": {
            "prompt": "An effective prefactor is $0.002\\,\\mathrm{m/s}$ and the barrier is $4RT$. Find the zero-voltage crossing coefficient.",
            "answer": {
              "value": 3.663127777746836e-05,
              "unit": "m/s",
              "tolerance": 1.0989383333240508e-07,
              "verification": {
                "relation": "exponentialRate",
                "inputs": {
                  "base": 0.002,
                  "exponent": -4
                },
                "displayScale": 1
              }
            },
            "tex": "k_0=(0.002\\,\\mathrm{m/s})e^{-4}",
            "modelAnswer": [
              "A higher activation barrier lowers the crossing coefficient exponentially."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $k_0=Ae^{-\\Delta G_0/(RT)}$."
              },
              {
                "body": "Start with $k_0=(0.002\\,\\mathrm{m/s})e^{-4}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{k_0}}={\\htmlClass{formula-term-1}{A}}e^{-{\\htmlClass{formula-term-2}{\\Delta G_0}}/({\\htmlClass{formula-term-3}{R}}{\\htmlClass{formula-term-4}{T}})}"
        },
        {
          "id": "L06-f-flux-ratio",
          "name": "Zero-voltage directional flux ratio",
          "tex": "\\frac{J_{in}}{J_{out}}=\\frac{C_o}{C_i}",
          "symbols": [
            {
              "tex": "J_{in}",
              "name": "Inward flux",
              "unit": "\\mathrm{mol/(m^2s)}",
              "meaning": "Inward flux in the stated model."
            },
            {
              "tex": "J_{out}",
              "name": "Outward flux",
              "unit": "\\mathrm{mol/(m^2s)}",
              "meaning": "Outward flux in the stated model."
            },
            {
              "tex": "C_o",
              "name": "Outside concentration",
              "unit": "\\mathrm{mol/m^3}",
              "meaning": "Outside concentration in the stated model."
            },
            {
              "tex": "C_i",
              "name": "Inside concentration",
              "unit": "\\mathrm{mol/m^3}",
              "meaning": "Inside concentration in the stated model."
            }
          ],
          "reads": "Equal coefficients leave the directional flux ratio set by concentration.",
          "assumes": "Symmetric zero-voltage barrier with common partition.",
          "variants": [],
          "drill": {
            "prompt": "At zero voltage equal crossing coefficients and common partition apply. If $C_o=90$ and $C_i=30\\,\\mathrm{mol/m^3}$, find $J_{in}/J_{out}$.",
            "answer": {
              "value": 3,
              "unit": "",
              "tolerance": 0.009000000000000001,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 90,
                  "b": 30
                },
                "displayScale": 1
              }
            },
            "tex": "J_{in}/J_{out}=90/30",
            "modelAnswer": [
              "Equal coefficients leave the directional flux ratio set by concentration."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\frac{J_{in}}{J_{out}}=\\frac{C_o}{C_i}$."
              },
              {
                "body": "Start with $J_{in}/J_{out}=90/30$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\frac{{\\htmlClass{formula-term-0}{J_{in}}}}{{\\htmlClass{formula-term-1}{J_{out}}}}=\\frac{{\\htmlClass{formula-term-2}{C_o}}}{{\\htmlClass{formula-term-3}{C_i}}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L06-zero-barrier-check",
          "prompt": "When equal crossing coefficients yield equal directional fluxes",
          "correct": 1,
          "options": [
            {
              "text": "The two concentrations can be arbitrary",
              "feedback": "With common partitioning, different concentrations still give different fluxes."
            },
            {
              "text": "The two concentrations are also equal",
              "feedback": "Equal coefficients give equal fluxes only when the source concentrations also match."
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
            "The two concentrations are also equal."
          ]
        },
        {
          "id": "L06-zero-barrier-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L06 PDF 6",
          "prompt": "What happens to crossing at a higher activation barrier, with temperature and prefactor fixed?",
          "options": [
            {
              "text": "The crossing coefficient stays unchanged",
              "feedback": "Barrier height appears in the exponent and therefore changes the coefficient."
            },
            {
              "text": "The crossing coefficient becomes smaller",
              "feedback": "The negative Arrhenius exponent makes crossing slower at a higher barrier."
            },
            {
              "text": "The crossing coefficient becomes larger",
              "feedback": "A higher barrier reduces the fraction able to cross at the same temperature."
            }
          ],
          "correct": 1,
          "modelAnswer": [
            "The negative Arrhenius exponent makes crossing slower at a higher barrier."
          ]
        }
      ]
    },
    {
      "id": "tilted-barrier",
      "title": "Voltage tilts the permeation barrier",
      "keyTerms": [],
      "source": "L06 PDF 7",
      "blocks": [
        {
          "type": "text",
          "body": ["PDF page 7 measures barrier location $\\delta$ from the inside: zero is the inner boundary and one the outer boundary. For a positive ion, positive inside voltage lowers the outward activation barrier and raises the inward barrier. The rate exponents below encode these opposite electrical effects.", "For a calculation, form the dimensionless voltage $zFV_m/(RT)$, apply the appropriate location factor, then calculate both crossing coefficients. Multiply by partitioning and source-side concentration to obtain fluxes. Signed outward current density is $zF(J_{out}-J_{in})$; an inward excess gives negative current for a cation."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 6, PDF page 7. Zero-voltage and voltage-tilted permeation energy profiles. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 6, PDF page 7. Zero-voltage and voltage-tilted permeation energy profiles. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L06/tilt.webp', import.meta.url).href,
              "alt": "Lecture 6, PDF page 7. Zero-voltage and voltage-tilted permeation energy profiles. Original labels, axes and scale bars retained.",
              "aspect": 1.739825581395349,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L06-f-inward-rate",
          "name": "Voltage-dependent inward-rate",
          "tex": "k_1=k_0e^{-(1-\\delta)zFV_m/(RT)}",
          "symbols": [
            {
              "tex": "k_1",
              "name": "Directional coefficient",
              "unit": "\\mathrm{m/s}",
              "meaning": "Directional coefficient in the stated model."
            },
            {
              "tex": "k_0",
              "name": "Zero-voltage coefficient",
              "unit": "\\mathrm{m/s}",
              "meaning": "Zero-voltage coefficient in the stated model."
            },
            {
              "tex": "\\delta",
              "name": "Location from inside",
              "unit": "1",
              "meaning": "Location from inside in the stated model."
            },
            {
              "tex": "V_m",
              "name": "Inside potential",
              "unit": "\\mathrm V",
              "meaning": "Inside potential in the stated model."
            },
            {
              "tex": "z",
              "name": "Charge valence",
              "unit": "1",
              "meaning": "Valence of the permeating ion or modeled gating charge, as specified."
            },
            {
              "tex": "F",
              "name": "Faraday constant",
              "unit": "\\mathrm{C/mol}",
              "meaning": "Molar charge scale."
            },
            {
              "tex": "R",
              "name": "Gas constant",
              "unit": "\\mathrm{J/(mol\\,K)}",
              "meaning": "Molar thermal-energy scale."
            },
            {
              "tex": "T",
              "name": "Absolute temperature",
              "unit": "\\mathrm K",
              "meaning": "Temperature in kelvin."
            }
          ],
          "reads": "Positive inside voltage favors outward crossing for positive ions.",
          "assumes": "Fixed barrier, positive valence, effective coefficient.",
          "variants": [],
          "drill": {
            "prompt": "Use $k_0=10^{-6}\\,\\mathrm{m/s}$, $\\delta=0.3$, $z=1$, $V_m=0.020\\,\\mathrm V$, $F=96485$, $R=8.314$ and $T=293\\,\\mathrm K$. Calculate the inward crossing coefficient.",
            "answer": {
              "value": 5.743530287860968e-07,
              "unit": "m/s",
              "tolerance": 1.7230590863582903e-09,
              "verification": {
                "relation": "exponentialRate",
                "inputs": {
                  "base": 1e-06,
                  "exponent": -0.5545110389892947
                },
                "displayScale": 1
              }
            },
            "tex": "k=(10^{-6})e^{-0.7(96485)(0.020)/(8.314\\times293)}",
            "modelAnswer": [
              "Positive inside voltage favors outward crossing for positive ions."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $k_1=k_0e^{-(1-\\delta)zFV_m/(RT)}$."
              },
              {
                "body": "Start with $k=(10^{-6})e^{-0.7(96485)(0.020)/(8.314\\times293)}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{k_1}}={\\htmlClass{formula-term-1}{k_0}}e^{-(1-{\\htmlClass{formula-term-2}{\\delta}}){\\htmlClass{formula-term-4}{z}}{\\htmlClass{formula-term-5}{F}}{\\htmlClass{formula-term-3}{V_m}}/({\\htmlClass{formula-term-6}{R}}{\\htmlClass{formula-term-7}{T}})}"
        },
        {
          "id": "L06-f-outward-rate",
          "name": "Voltage-dependent outward-rate",
          "tex": "k_2=k_0e^{\\delta zFV_m/(RT)}",
          "symbols": [
            {
              "tex": "k_2",
              "name": "Directional coefficient",
              "unit": "\\mathrm{m/s}",
              "meaning": "Directional coefficient in the stated model."
            },
            {
              "tex": "k_0",
              "name": "Zero-voltage coefficient",
              "unit": "\\mathrm{m/s}",
              "meaning": "Zero-voltage coefficient in the stated model."
            },
            {
              "tex": "\\delta",
              "name": "Location from inside",
              "unit": "1",
              "meaning": "Location from inside in the stated model."
            },
            {
              "tex": "V_m",
              "name": "Inside potential",
              "unit": "\\mathrm V",
              "meaning": "Inside potential in the stated model."
            },
            {
              "tex": "z",
              "name": "Charge valence",
              "unit": "1",
              "meaning": "Valence of the permeating ion or modeled gating charge, as specified."
            },
            {
              "tex": "F",
              "name": "Faraday constant",
              "unit": "\\mathrm{C/mol}",
              "meaning": "Molar charge scale."
            },
            {
              "tex": "R",
              "name": "Gas constant",
              "unit": "\\mathrm{J/(mol\\,K)}",
              "meaning": "Molar thermal-energy scale."
            },
            {
              "tex": "T",
              "name": "Absolute temperature",
              "unit": "\\mathrm K",
              "meaning": "Temperature in kelvin."
            }
          ],
          "reads": "Positive inside voltage favors outward crossing for positive ions.",
          "assumes": "Fixed barrier, positive valence, effective coefficient.",
          "variants": [],
          "drill": {
            "prompt": "Use $k_0=10^{-6}\\,\\mathrm{m/s}$, $\\delta=0.3$, $z=1$, $V_m=0.020\\,\\mathrm V$, $F=96485$, $R=8.314$ and $T=293\\,\\mathrm K$. Calculate the outward crossing coefficient.",
            "answer": {
              "value": 1.2682621634301293e-06,
              "unit": "m/s",
              "tolerance": 3.804786490290388e-09,
              "verification": {
                "relation": "exponentialRate",
                "inputs": {
                  "base": 1e-06,
                  "exponent": 0.23764758813826917
                },
                "displayScale": 1
              }
            },
            "tex": "k=(10^{-6})e^{0.3(96485)(0.020)/(8.314\\times293)}",
            "modelAnswer": [
              "Positive inside voltage favors outward crossing for positive ions."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $k_2=k_0e^{\\delta zFV_m/(RT)}$."
              },
              {
                "body": "Start with $k=(10^{-6})e^{0.3(96485)(0.020)/(8.314\\times293)}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{k_2}}={\\htmlClass{formula-term-1}{k_0}}e^{{\\htmlClass{formula-term-2}{\\delta}} {\\htmlClass{formula-term-4}{z}}{\\htmlClass{formula-term-5}{F}}{\\htmlClass{formula-term-3}{V_m}}/({\\htmlClass{formula-term-6}{R}}{\\htmlClass{formula-term-7}{T}})}"
        },
        {
          "id": "L06-f-net-current",
          "name": "Outward net current from fluxes",
          "tex": "j=zF(J_{out}-J_{in})",
          "symbols": [
            {
              "tex": "j",
              "name": "Outward current density",
              "unit": "\\mathrm{A/m^2}",
              "meaning": "Outward current density in the stated model."
            },
            {
              "tex": "z",
              "name": "Valence",
              "unit": "1",
              "meaning": "Valence in the stated model."
            },
            {
              "tex": "F",
              "name": "Faraday constant",
              "unit": "\\mathrm{C/mol}",
              "meaning": "Faraday constant in the stated model."
            },
            {
              "tex": "J_{out}",
              "name": "Outward flux",
              "unit": "\\mathrm{mol/(m^2s)}",
              "meaning": "Outward flux in the stated model."
            },
            {
              "tex": "J_{in}",
              "name": "Inward flux",
              "unit": "\\mathrm{mol/(m^2s)}",
              "meaning": "Inward flux in the stated model."
            }
          ],
          "reads": "Outward current subtracts inward flux, retaining the ion valence.",
          "assumes": "Fluxes are densities and current is density.",
          "variants": [],
          "drill": {
            "prompt": "A monovalent cation has $J_{out}=3\\times10^{-6}$ and $J_{in}=5\\times10^{-6}\\,\\mathrm{mol/(m^2s)}$. With $F=96485\\,\\mathrm{C/mol}$ find outward current density.",
            "answer": {
              "value": -0.19297,
              "unit": "A/m2",
              "tolerance": 0.00057891,
              "verification": {
                "relation": "fluxCurrent",
                "inputs": {
                  "flux": -2e-06,
                  "z": 1,
                  "f": 96485
                },
                "displayScale": 1
              }
            },
            "tex": "j=(1)(96485)(3-5)10^{-6}",
            "modelAnswer": [
              "Outward current subtracts inward flux, retaining the ion valence."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $j=zF(J_{out}-J_{in})$."
              },
              {
                "body": "Start with $j=(1)(96485)(3-5)10^{-6}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{j}}={\\htmlClass{formula-term-1}{z}}{\\htmlClass{formula-term-2}{F}}({\\htmlClass{formula-term-3}{J_{out}}}-{\\htmlClass{formula-term-4}{J_{in}}})"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L06-tilted-barrier-check",
          "prompt": "Where is a barrier with location one?",
          "correct": 0,
          "options": [
            {
              "text": "At the outer membrane boundary",
              "feedback": "Location is measured from inside, so one is the outer boundary."
            },
            {
              "text": "At the inner membrane boundary",
              "feedback": "The inner boundary is location zero in the source convention."
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
            "At the outer membrane boundary."
          ]
        },
        {
          "id": "L06-tilted-barrier-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L06 PDF 7",
          "prompt": "For a positive ion and a barrier away from the inner boundary, what does positive inside voltage do to the outward activation barrier?",
          "options": [
            {
              "text": "It lowers the outward activation barrier",
              "feedback": "Positive inside voltage favors outward movement of positive charge."
            },
            {
              "text": "It raises the outward activation barrier",
              "feedback": "Positive inside voltage opposes inward, rather than outward, cation movement."
            },
            {
              "text": "It leaves the outward barrier unaffected",
              "feedback": "The outward barrier changes with voltage except at the inner-boundary limiting location."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Positive inside voltage favors outward movement of positive charge."
          ]
        }
      ]
    },
    {
      "id": "position",
      "title": "Barrier position and rectification",
      "keyTerms": [],
      "source": "L06 PDF 8",
      "blocks": [
        {
          "type": "text",
          "body": ["For positive ions, an outer barrier makes outward crossing strongly voltage-dependent, whereas an inner barrier makes inward crossing strongly voltage-dependent. On PDF page 8, making voltage more negative increases inward flux for the inner-barrier case. The phrase “inward ion flux decreases” requires this explicit voltage-direction qualification.", "A central barrier gives the least asymmetric curve in the displayed comparison, not a generally linear resistor. Use the location-dependent exponents from the preceding section to predict which directional flux changes most. Curvature describes a transport bias and does not by itself establish dynamic opening."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 6, PDF page 8. Outer and inner energy barrier profiles with their current–voltage curves. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 6, PDF page 8. Outer and inner energy barrier profiles with their current–voltage curves. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L06/position.webp', import.meta.url).href,
              "alt": "Lecture 6, PDF page 8. Outer and inner energy barrier profiles with their current–voltage curves. Original labels, axes and scale bars retained.",
              "aspect": 0.9837662337662337,
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
          "id": "L06-position-check",
          "prompt": "Which margin favors the source inward-rectifying form?",
          "correct": 1,
          "options": [
            {
              "text": "The extracellular membrane margin",
              "feedback": "The outer boundary gives the source outward-rectifying form for cations."
            },
            {
              "text": "The intracellular membrane margin",
              "feedback": "The inner barrier makes inward crossing strongly voltage-dependent."
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
            "The intracellular membrane margin."
          ]
        },
        {
          "id": "L06-position-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L06 PDF 8",
          "prompt": "Which boundary location gives the source outward-rectifying barrier model for positive ions?",
          "options": [
            {
              "text": "A barrier at the intracellular boundary",
              "feedback": "At the inner boundary, inward crossing has the full voltage-dependent factor."
            },
            {
              "text": "A barrier at the membrane central plane",
              "feedback": "The central barrier gives the least asymmetric source comparison, not the outer-boundary form."
            },
            {
              "text": "A barrier at the extracellular boundary",
              "feedback": "At the outer boundary, outward crossing has the full voltage-dependent factor."
            }
          ],
          "correct": 2,
          "modelAnswer": [
            "At the outer boundary, outward crossing has the full voltage-dependent factor."
          ]
        }
      ]
    },
    {
      "id": "concentrations",
      "title": "Concentration changes and model identifiability",
      "keyTerms": [],
      "source": "L06 PDF 9",
      "blocks": [
        {
          "type": "text",
          "body": ["At fixed barrier location, current depends on both absolute concentrations. PDF page 9 compares varying inside concentration with outside fixed against varying outside with inside fixed; the same concentration ratio need not give the same current magnitude. Scaling both concentrations together scales both directional fluxes.", "Selective reversal is set by the concentration ratio because it marks equal inward and outward fluxes. Barrier position can change curve shape without changing that balance voltage. Unlike the fixed-permeability GHK constraint, barrier permeation permits either rectification direction at either reversal sign, so a nonlinear curve alone cannot locate a unique barrier."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 6, PDF page 9. Fixed central barrier with different concentration ratios and separately fixed inside/outside concentration. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 6, PDF page 9. Fixed central barrier with different concentration ratios and separately fixed inside/outside concentration. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L06/concentrations.webp', import.meta.url).href,
              "alt": "Lecture 6, PDF page 9. Fixed central barrier with different concentration ratios and separately fixed inside/outside concentration. Original labels, axes and scale bars retained.",
              "aspect": 1.6971894832275611,
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
          "id": "L06-concentrations-check",
          "prompt": "What must accompany a changing concentration ratio?",
          "correct": 0,
          "options": [
            {
              "text": "Which absolute concentration was held fixed",
              "feedback": "Current magnitude depends on absolute concentrations as well as their ratio."
            },
            {
              "text": "Only the ratio of the two ion concentrations",
              "feedback": "A ratio alone does not specify the absolute concentrations that set flux magnitude."
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
            "Which absolute concentration was held fixed."
          ]
        },
        {
          "id": "L06-concentrations-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L06 PDF 9",
          "prompt": "What concentration property sets selective reversal in this barrier model?",
          "options": [
            {
              "text": "The difference of the two concentrations",
              "feedback": "A concentration difference alone does not specify the ratio needed for reversal."
            },
            {
              "text": "The ratio of the two ion concentrations",
              "feedback": "Reversal balances directional fluxes and depends on their concentration ratio."
            },
            {
              "text": "The sum of the two ion concentrations",
              "feedback": "Absolute concentration scale changes current magnitude, not the selective reversal at a fixed ratio."
            }
          ],
          "correct": 1,
          "modelAnswer": [
            "Reversal balances directional fluxes and depends on their concentration ratio."
          ]
        }
      ]
    },
    {
      "id": "multiple",
      "title": "Several barriers and binding wells",
      "keyTerms": [],
      "source": "L06 PDF 10",
      "blocks": [
        {
          "type": "text",
          "body": ["PDF page 10 follows sodium through an entry diffusion barrier, an attractive binding well, a larger selectivity-filter barrier and two further barriers. Peaks oppose passage; a well is a favorable binding location. Its negative relative energy is not a negative crossing rate.", "The highest barrier motivates a single rate-limiting-step approximation only when it dominates the pathway. Several comparable barriers and interacting binding sites require a fuller account. Read the source energy profile as a sequence of physical obstacles and binding locations, rather than replacing all peaks by one arbitrary average."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 6, PDF page 10. Sodium permeation energy profile and binding-site arrangement. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 6, PDF page 10. Sodium permeation energy profile and binding-site arrangement. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L06/multiple.webp', import.meta.url).href,
              "alt": "Lecture 6, PDF page 10. Sodium permeation energy profile and binding-site arrangement. Original labels, axes and scale bars retained.",
              "aspect": 2.073170731707317,
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
          "id": "L06-multiple-check",
          "prompt": "What is represented by a free-energy well?",
          "correct": 1,
          "options": [
            {
              "text": "An impossible negative ion-crossing coefficient",
              "feedback": "A well is a favorable binding location; crossing coefficients remain nonnegative."
            },
            {
              "text": "An energetically favorable ion-binding location",
              "feedback": "The energy minimum represents attraction and favorable binding."
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
            "An energetically favorable ion-binding location."
          ]
        },
        {
          "id": "L06-multiple-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L06 PDF 10",
          "prompt": "Which part of the source sodium pathway is a binding well?",
          "options": [
            {
              "text": "The attractive site near a charged group",
              "feedback": "Electrostatic attraction creates a favorable binding location, shown as a well."
            },
            {
              "text": "The narrow region of the selectivity filter",
              "feedback": "The narrow filter is represented by an activation barrier, not the attractive well."
            },
            {
              "text": "The entry obstacle from extracellular fluid",
              "feedback": "The entry diffusion step is an obstacle to passage, shown as a barrier."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Electrostatic attraction creates a favorable binding location, shown as a well."
          ]
        }
      ]
    },
    {
      "id": "gates",
      "title": "Permeation versus movement of gating charge",
      "keyTerms": [],
      "source": "L06 PDF 11",
      "blocks": [
        {
          "type": "text",
          "body": ["The gate model on PDF page 11 adds a state that changes over time. Voltage-sensitive charges move within channel proteins and control access to aqueous pores. Here the barrier concerns movement of gating particles, whereas the earlier barrier model concerned permeating ions crossing the pore.", "This distinction explains why a static permeation model cannot describe a delayed change in conducting fraction at held voltage. Actual current can involve both mechanisms: the pore determines current when open, while gating determines how many channels contribute at a given time."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 6, PDF page 11. Source voltage-gated channel diagram with pore and gating structures. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 6, PDF page 11. Source voltage-gated channel diagram with pore and gating structures. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L06/channel.webp', import.meta.url).href,
              "alt": "Lecture 6, PDF page 11. Source voltage-gated channel diagram with pore and gating structures. Original labels, axes and scale bars retained.",
              "aspect": 1.1273809523809524,
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
          "id": "L06-gates-check",
          "prompt": "Which particle crosses the gate-model activation barrier?",
          "correct": 0,
          "options": [
            {
              "text": "A gating particle moving within the channel",
              "feedback": "This barrier describes a state-changing gating particle within the protein."
            },
            {
              "text": "A permeating ion moving through the open channel",
              "feedback": "That describes the permeating ion, which crosses a different energy barrier."
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
            "A gating particle moving within the channel."
          ]
        },
        {
          "id": "L06-gates-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L06 PDF 11",
          "prompt": "In the gate model, what do voltage-sensitive charges control?",
          "options": [
            {
              "text": "Concentration of ions in the outer solution",
              "feedback": "Gating charge movement controls channel state, not the bulk external ion concentration."
            },
            {
              "text": "Valence of ions crossing the open channel",
              "feedback": "Gating does not change the charge carried by a permeating ion."
            },
            {
              "text": "Access to the aqueous conducting pore",
              "feedback": "Gating charge movement changes channel state and controls pore availability."
            }
          ],
          "correct": 2,
          "modelAnswer": [
            "Gating charge movement changes channel state and controls pore availability."
          ]
        }
      ],
      "part": {
        "id": "dynamic",
        "number": 2,
        "title": "Dynamic gating"
      }
    },
    {
      "id": "assumptions",
      "title": "Closed and open states, linear open pores",
      "keyTerms": [],
      "source": "L06 PDF 12",
      "blocks": [
        {
          "type": "text",
          "body": ["PDF page 12 assumes voltage-dependent opening and closing with first-order transitions. An already open channel is taken to be Ohmic: doubling its driving force doubles its current. This assumption applies to the open pore, not to the whole population at all voltages and times.", "The population current can still be nonlinear because its conducting fraction changes. Separate open-channel conductance, driving force and open fraction when explaining a trace. Voltage controls the transition rates; a finite relaxation of the state after a step is different from an immediate change in driving force."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 6, PDF page 11. Source voltage-gated channel diagram with pore and gating structures. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 6, PDF page 11. Source voltage-gated channel diagram with pore and gating structures. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L06/channel.webp', import.meta.url).href,
              "alt": "Lecture 6, PDF page 11. Source voltage-gated channel diagram with pore and gating structures. Original labels, axes and scale bars retained.",
              "aspect": 1.1273809523809524,
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
          "id": "L06-assumptions-check",
          "prompt": "Does a linear open pore imply a linear gated population?",
          "correct": 1,
          "options": [
            {
              "text": "Yes, all population currents must remain linear",
              "feedback": "The open fraction can vary even when each open pore is Ohmic."
            },
            {
              "text": "No, the fraction open can change with voltage",
              "feedback": "Voltage-dependent opening makes the population nonlinear despite linear open pores."
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
            "No, the fraction open can change with voltage."
          ]
        },
        {
          "id": "L06-assumptions-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L06 PDF 12",
          "prompt": "For an already open Ohmic pore, current is proportional to what?",
          "options": [
            {
              "text": "Voltage measured from the command baseline",
              "feedback": "The command baseline need not equal the ionic reversal potential."
            },
            {
              "text": "Voltage measured from the reversal potential",
              "feedback": "The open-pore driving force is voltage relative to reversal."
            },
            {
              "text": "Voltage measured from the resting potential",
              "feedback": "Rest is not generally reversal for the selected ionic current."
            }
          ],
          "correct": 1,
          "modelAnswer": [
            "The open-pore driving force is voltage relative to reversal."
          ]
        }
      ]
    },
    {
      "id": "balance",
      "title": "Balance transitions between particle states",
      "keyTerms": [],
      "source": "L06 PDF 13",
      "blocks": [
        {
          "type": "text",
          "body": ["On PDF page 13, $y$ is the fraction of gating particles in the permissive state and $1-y$ is the available non-permissive fraction. Opening adds $\\alpha(1-y)$ and closing removes $\\beta y$. The derivative below is their difference; rates have inverse-time units, while fractions are dimensionless.", "To determine the direction of change, compare the two transition flows rather than the rate coefficients alone. At steady state they balance even though particles continue switching. A permissive particle need not mean an open whole channel if several particles must all be permissive."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 6, PDF page 13. Permissive and non-permissive gating particle states separated by an energy barrier. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 6, PDF page 13. Permissive and non-permissive gating particle states separated by an energy barrier. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L06/gating.webp', import.meta.url).href,
              "alt": "Lecture 6, PDF page 13. Permissive and non-permissive gating particle states separated by an energy barrier. Original labels, axes and scale bars retained.",
              "aspect": 1.0713178294573644,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L06-f-derivative",
          "name": "Permissive-state balance",
          "tex": "\\frac{dy}{dt}=\\alpha(1-y)-\\beta y",
          "symbols": [
            {
              "tex": "y",
              "name": "Permissive fraction",
              "unit": "1",
              "meaning": "Permissive fraction in the stated model."
            },
            {
              "tex": "\\alpha",
              "name": "Opening rate",
              "unit": "\\mathrm{s^{-1}}",
              "meaning": "Opening rate in the stated model."
            },
            {
              "tex": "\\beta",
              "name": "Closing rate",
              "unit": "\\mathrm{s^{-1}}",
              "meaning": "Closing rate in the stated model."
            }
          ],
          "reads": "Gain from non-permissive particles competes with loss from permissive particles.",
          "assumes": "One first-order particle at fixed voltage.",
          "variants": [],
          "drill": {
            "prompt": "Use $\\alpha=30\\,\\mathrm{s^{-1}}$, $\\beta=10\\,\\mathrm{s^{-1}}$ and $y=0.4$. Find $dy/dt$.",
            "answer": {
              "value": 14,
              "unit": "1/s",
              "tolerance": 0.042,
              "verification": {
                "relation": "gateDerivative",
                "inputs": {
                  "alpha": 30,
                  "beta": 10,
                  "y": 0.4
                },
                "displayScale": 1
              }
            },
            "tex": "dy/dt=30(1-0.4)-10(0.4)",
            "modelAnswer": [
              "Gain from non-permissive particles competes with loss from permissive particles."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\frac{dy}{dt}=\\alpha(1-y)-\\beta y$."
              },
              {
                "body": "Start with $dy/dt=30(1-0.4)-10(0.4)$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\frac{d{\\htmlClass{formula-term-0}{y}}}{dt}={\\htmlClass{formula-term-1}{\\alpha}}(1-{\\htmlClass{formula-term-0}{y}})-{\\htmlClass{formula-term-2}{\\beta}} {\\htmlClass{formula-term-0}{y}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L06-balance-check",
          "prompt": "Which term removes permissive particles?",
          "correct": 0,
          "options": [
            {
              "text": "$\\beta y$, the closing-rate term",
              "feedback": "Closing removes the fraction already permissive, at rate $\\beta y$."
            },
            {
              "text": "$\\alpha(1-y)$, the opening-rate term",
              "feedback": "Opening adds permissive particles from the available non-permissive fraction."
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
            "$\\beta y$, the closing-rate term."
          ]
        },
        {
          "id": "L06-balance-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L06 PDF 13",
          "prompt": "What does the fraction $1-y$ represent in the two-state particle model?",
          "options": [
            {
              "text": "Particles in the non-permissive state",
              "feedback": "The two fractions sum to one; the complement is available for opening transitions."
            },
            {
              "text": "Particles in the permissive state",
              "feedback": "The permissive fraction is $y$, not its complement."
            },
            {
              "text": "Channels in the conducting state",
              "feedback": "A particle-state fraction need not equal the whole-channel open fraction."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The two fractions sum to one; the complement is available for opening transitions."
          ]
        }
      ]
    },
    {
      "id": "polarity",
      "title": "Depolarization and gating-particle charge",
      "keyTerms": [],
      "source": "L06 PDF 14",
      "blocks": [
        {
          "type": "text",
          "body": ["For the positively charged, depolarization-activated particle on PDF page 14, a more positive membrane voltage lowers the barrier toward the permissive state. Hyperpolarization favors the reverse transition in this example. The electrical effect depends on the modeled gating charge and state assignment, not merely the permeating ion.", "Depolarization means a change toward a more positive voltage, including a change between two negative values. It need not cross zero. Do not generalize this particular activation direction to every channel; the next source curves also include channels activated by hyperpolarization."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 6, PDF page 13. Permissive and non-permissive gating particle states separated by an energy barrier. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 6, PDF page 13. Permissive and non-permissive gating particle states separated by an energy barrier. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L06/gating.webp', import.meta.url).href,
              "alt": "Lecture 6, PDF page 13. Permissive and non-permissive gating particle states separated by an energy barrier. Original labels, axes and scale bars retained.",
              "aspect": 1.0713178294573644,
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
          "id": "L06-polarity-check",
          "prompt": "A shift from a negative voltage to a less negative one is",
          "correct": 1,
          "options": [
            {
              "text": "Hyperpolarization unless voltage crosses zero",
              "feedback": "A more positive change is depolarization even between negative voltages."
            },
            {
              "text": "Depolarization even without crossing zero",
              "feedback": "Depolarization describes a direction of change, not a requirement to cross zero."
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
            "Depolarization even without crossing zero."
          ]
        },
        {
          "id": "L06-polarity-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L06 PDF 14",
          "prompt": "For the illustrated positive gating charge, depolarization favors which transition?",
          "options": [
            {
              "text": "Movement toward the non-permissive state",
              "feedback": "That reverse transition is favored by hyperpolarization in this example."
            },
            {
              "text": "Movement of the ion through the open pore",
              "feedback": "This energy diagram describes a gating particle, not the permeating ion."
            },
            {
              "text": "Movement toward the permissive state",
              "feedback": "The illustrated voltage change lowers the barrier toward the permissive state."
            }
          ],
          "correct": 2,
          "modelAnswer": [
            "The illustrated voltage change lowers the barrier toward the permissive state."
          ]
        }
      ]
    },
    {
      "id": "steady",
      "title": "Rate laws and the steady activation curve",
      "keyTerms": [],
      "source": "L06 PDF 15",
      "blocks": [
        {
          "type": "text",
          "body": ["At fixed voltage, balance opening and closing to obtain $y_\\infty=\\alpha/(\\alpha+\\beta)$. PDF page 15 gives exponential voltage-dependent rates; calculate them with a dimensionless electrical-energy exponent before taking their ratio. Equal zero-voltage coefficients give the symmetric logistic special case, not a requirement for the general relation.", "With baseline coefficients fixed, barrier location cancels from the steady fraction but affects the rate sum and response speed. Thus an unchanged activation curve does not imply unchanged kinetics. Combining steady activation with $\\tau=1/(\\alpha+\\beta)$ lets you infer both rates rather than just their ratio."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 6, PDF page 13. Permissive and non-permissive gating particle states separated by an energy barrier. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 6, PDF page 13. Permissive and non-permissive gating particle states separated by an energy barrier. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L06/gating.webp', import.meta.url).href,
              "alt": "Lecture 6, PDF page 13. Permissive and non-permissive gating particle states separated by an energy barrier. Original labels, axes and scale bars retained.",
              "aspect": 1.0713178294573644,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L06-f-alpha",
          "name": "Gating alpha rate",
          "tex": "\\alpha=\\alpha_0e^{\\delta zFV_m/(RT)}",
          "symbols": [
            {
              "tex": "\\alpha",
              "name": "Voltage-dependent rate",
              "unit": "\\mathrm{s^{-1}}",
              "meaning": "Voltage-dependent rate in the stated model."
            },
            {
              "tex": "\\alpha_0",
              "name": "Baseline rate",
              "unit": "\\mathrm{s^{-1}}",
              "meaning": "Baseline rate in the stated model."
            },
            {
              "tex": "\\delta",
              "name": "Location",
              "unit": "1",
              "meaning": "Location in the stated model."
            },
            {
              "tex": "V_m",
              "name": "Inside voltage",
              "unit": "\\mathrm V",
              "meaning": "Inside voltage in the stated model."
            },
            {
              "tex": "z",
              "name": "Charge valence",
              "unit": "1",
              "meaning": "Valence of the permeating ion or modeled gating charge, as specified."
            },
            {
              "tex": "F",
              "name": "Faraday constant",
              "unit": "\\mathrm{C/mol}",
              "meaning": "Molar charge scale."
            },
            {
              "tex": "R",
              "name": "Gas constant",
              "unit": "\\mathrm{J/(mol\\,K)}",
              "meaning": "Molar thermal-energy scale."
            },
            {
              "tex": "T",
              "name": "Absolute temperature",
              "unit": "\\mathrm K",
              "meaning": "Temperature in kelvin."
            }
          ],
          "reads": "The source depolarization-activated particle gains opening and loses closing rate as voltage rises.",
          "assumes": "Fixed baseline rates and positive gating valence.",
          "variants": [],
          "drill": {
            "prompt": "Use baseline $25\\,\\mathrm{s^{-1}}$, $\\delta=0.4$, $z=1$, $V_m=0.015\\,\\mathrm V$, $F=96485$, $R=8.314$, $T=293\\,\\mathrm K$. Calculate $alpha$.",
            "answer": {
              "value": 31.706554085753236,
              "unit": "1/s",
              "tolerance": 0.09511966225725971,
              "verification": {
                "relation": "exponentialRate",
                "inputs": {
                  "base": 25,
                  "exponent": 0.23764758813826917
                },
                "displayScale": 1
              }
            },
            "tex": "alpha=25e^{0.4(96485)(0.015)/(8.314\\times293)}",
            "modelAnswer": [
              "The source depolarization-activated particle gains opening and loses closing rate as voltage rises."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\alpha=\\alpha_0e^{\\delta zFV_m/(RT)}$."
              },
              {
                "body": "Start with $alpha=25e^{0.4(96485)(0.015)/(8.314\\times293)}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{\\alpha}}={\\htmlClass{formula-term-1}{\\alpha_0}}e^{{\\htmlClass{formula-term-2}{\\delta}} {\\htmlClass{formula-term-4}{z}}{\\htmlClass{formula-term-5}{F}}{\\htmlClass{formula-term-3}{V_m}}/({\\htmlClass{formula-term-6}{R}}{\\htmlClass{formula-term-7}{T}})}"
        },
        {
          "id": "L06-f-beta",
          "name": "Gating beta rate",
          "tex": "\\beta=\\beta_0e^{-(1-\\delta)zFV_m/(RT)}",
          "symbols": [
            {
              "tex": "\\beta",
              "name": "Voltage-dependent rate",
              "unit": "\\mathrm{s^{-1}}",
              "meaning": "Voltage-dependent rate in the stated model."
            },
            {
              "tex": "\\beta_0",
              "name": "Baseline rate",
              "unit": "\\mathrm{s^{-1}}",
              "meaning": "Baseline rate in the stated model."
            },
            {
              "tex": "\\delta",
              "name": "Location",
              "unit": "1",
              "meaning": "Location in the stated model."
            },
            {
              "tex": "V_m",
              "name": "Inside voltage",
              "unit": "\\mathrm V",
              "meaning": "Inside voltage in the stated model."
            },
            {
              "tex": "z",
              "name": "Charge valence",
              "unit": "1",
              "meaning": "Valence of the permeating ion or modeled gating charge, as specified."
            },
            {
              "tex": "F",
              "name": "Faraday constant",
              "unit": "\\mathrm{C/mol}",
              "meaning": "Molar charge scale."
            },
            {
              "tex": "R",
              "name": "Gas constant",
              "unit": "\\mathrm{J/(mol\\,K)}",
              "meaning": "Molar thermal-energy scale."
            },
            {
              "tex": "T",
              "name": "Absolute temperature",
              "unit": "\\mathrm K",
              "meaning": "Temperature in kelvin."
            }
          ],
          "reads": "The source depolarization-activated particle gains opening and loses closing rate as voltage rises.",
          "assumes": "Fixed baseline rates and positive gating valence.",
          "variants": [],
          "drill": {
            "prompt": "Use baseline $40\\,\\mathrm{s^{-1}}$, $\\delta=0.4$, $z=1$, $V_m=0.015\\,\\mathrm V$, $F=96485$, $R=8.314$, $T=293\\,\\mathrm K$. Calculate $beta$.",
            "answer": {
              "value": 28.005700308639867,
              "unit": "1/s",
              "tolerance": 0.0840171009259196,
              "verification": {
                "relation": "exponentialRate",
                "inputs": {
                  "base": 40,
                  "exponent": -0.3564713822074037
                },
                "displayScale": 1
              }
            },
            "tex": "beta=40e^{-0.6(96485)(0.015)/(8.314\\times293)}",
            "modelAnswer": [
              "The source depolarization-activated particle gains opening and loses closing rate as voltage rises."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\beta=\\beta_0e^{-(1-\\delta)zFV_m/(RT)}$."
              },
              {
                "body": "Start with $beta=40e^{-0.6(96485)(0.015)/(8.314\\times293)}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{\\beta}}={\\htmlClass{formula-term-1}{\\beta_0}}e^{-(1-{\\htmlClass{formula-term-2}{\\delta}}){\\htmlClass{formula-term-4}{z}}{\\htmlClass{formula-term-5}{F}}{\\htmlClass{formula-term-3}{V_m}}/({\\htmlClass{formula-term-6}{R}}{\\htmlClass{formula-term-7}{T}})}"
        },
        {
          "id": "L06-f-steady",
          "name": "Steady permissive fraction",
          "tex": "y_\\infty=\\frac{\\alpha}{\\alpha+\\beta}",
          "symbols": [
            {
              "tex": "y_\\infty",
              "name": "Steady fraction",
              "unit": "1",
              "meaning": "Steady fraction in the stated model."
            },
            {
              "tex": "\\alpha",
              "name": "Opening rate",
              "unit": "\\mathrm{s^{-1}}",
              "meaning": "Opening rate in the stated model."
            },
            {
              "tex": "\\beta",
              "name": "Closing rate",
              "unit": "\\mathrm{s^{-1}}",
              "meaning": "Closing rate in the stated model."
            }
          ],
          "reads": "Steady activation balances opening and closing transitions.",
          "assumes": "Nonnegative rates with nonzero sum.",
          "variants": [],
          "drill": {
            "prompt": "At fixed voltage $\\alpha=60$ and $\\beta=20\\,\\mathrm{s^{-1}}$. Find steady permissive fraction.",
            "answer": {
              "value": 0.75,
              "unit": "",
              "tolerance": 0.0022500000000000003,
              "verification": {
                "relation": "gateSteady",
                "inputs": {
                  "alpha": 60,
                  "beta": 20
                },
                "displayScale": 1
              }
            },
            "tex": "y_\\infty=60/(60+20)",
            "modelAnswer": [
              "Steady activation balances opening and closing transitions."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $y_\\infty=\\frac{\\alpha}{\\alpha+\\beta}$."
              },
              {
                "body": "Start with $y_\\infty=60/(60+20)$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{y_\\infty}}=\\frac{{\\htmlClass{formula-term-1}{\\alpha}}}{{\\htmlClass{formula-term-1}{\\alpha}}+{\\htmlClass{formula-term-2}{\\beta}}}"
        },
        {
          "id": "L06-f-logistic",
          "name": "Steady activation without barrier location",
          "tex": "y_\\infty=\\frac{1}{1+(\\beta_0/\\alpha_0)e^{-zFV_m/(RT)}}",
          "symbols": [
            {
              "tex": "y_\\infty",
              "name": "Steady fraction",
              "unit": "1",
              "meaning": "Steady fraction in the stated model."
            },
            {
              "tex": "\\alpha_0",
              "name": "Baseline opening",
              "unit": "\\mathrm{s^{-1}}",
              "meaning": "Baseline opening in the stated model."
            },
            {
              "tex": "\\beta_0",
              "name": "Baseline closing",
              "unit": "\\mathrm{s^{-1}}",
              "meaning": "Baseline closing in the stated model."
            },
            {
              "tex": "V_m",
              "name": "Inside voltage",
              "unit": "\\mathrm V",
              "meaning": "Inside voltage in the stated model."
            },
            {
              "tex": "z",
              "name": "Charge valence",
              "unit": "1",
              "meaning": "Valence of the permeating ion or modeled gating charge, as specified."
            },
            {
              "tex": "F",
              "name": "Faraday constant",
              "unit": "\\mathrm{C/mol}",
              "meaning": "Molar charge scale."
            },
            {
              "tex": "R",
              "name": "Gas constant",
              "unit": "\\mathrm{J/(mol\\,K)}",
              "meaning": "Molar thermal-energy scale."
            },
            {
              "tex": "T",
              "name": "Absolute temperature",
              "unit": "\\mathrm K",
              "meaning": "Temperature in kelvin."
            }
          ],
          "reads": "Barrier location cancels from the steady ratio when baseline rates stay fixed.",
          "assumes": "Positive baseline rates, single source gating-charge model.",
          "variants": [],
          "drill": {
            "prompt": "Use $\\alpha_0=30$, $\\beta_0=50\\,\\mathrm{s^{-1}}$, $z=1$, $V_m=0.020\\,\\mathrm V$, $F=96485$, $R=8.314$, $T=293\\,\\mathrm K$. Find steady activation.",
            "answer": {
              "value": 0.5698729971305603,
              "unit": "",
              "tolerance": 0.0017096189913916808,
              "verification": {
                "relation": "gateSteady",
                "inputs": {
                  "alpha": 66.24473624404591,
                  "beta": 50
                },
                "displayScale": 1
              }
            },
            "tex": "y_\\infty=1/[1+(50/30)e^{-96485(0.020)/(8.314\\times293)}]",
            "modelAnswer": [
              "Barrier location cancels from the steady ratio when baseline rates stay fixed."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $y_\\infty=\\frac{1}{1+(\\beta_0/\\alpha_0)e^{-zFV_m/(RT)}}$."
              },
              {
                "body": "Start with $y_\\infty=1/[1+(50/30)e^{-96485(0.020)/(8.314\\times293)}]$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{y_\\infty}}=\\frac{1}{1+({\\htmlClass{formula-term-2}{\\beta_0}}/{\\htmlClass{formula-term-1}{\\alpha_0}})e^{-{\\htmlClass{formula-term-4}{z}}{\\htmlClass{formula-term-5}{F}}{\\htmlClass{formula-term-3}{V_m}}/({\\htmlClass{formula-term-6}{R}}{\\htmlClass{formula-term-7}{T}})}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L06-steady-check",
          "prompt": "What can changing barrier location alter at fixed baselines?",
          "correct": 0,
          "options": [
            {
              "text": "The approach speed without changing the steady fraction",
              "feedback": "Location changes the rate sum while cancelling from the steady ratio at fixed baselines."
            },
            {
              "text": "The steady fraction without changing either crossing rate",
              "feedback": "A changed steady ratio requires more than moving the barrier with baseline coefficients fixed."
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
            "The approach speed without changing the steady fraction."
          ]
        },
        {
          "id": "L06-steady-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L06 PDF 15",
          "prompt": "At steady activation, which transition flows balance?",
          "options": [
            {
              "text": "Ionic and capacitive membrane currents",
              "feedback": "Current balance is distinct from the two-state particle balance defining activation."
            },
            {
              "text": "Opening and closing particle flows",
              "feedback": "Steady activation means opening replenishes the permissive particles lost by closing."
            },
            {
              "text": "Inward and outward permeating ion fluxes",
              "feedback": "Ionic flux balance defines reversal, not the steady fraction of gating particles."
            }
          ],
          "correct": 1,
          "modelAnswer": [
            "Steady activation means opening replenishes the permissive particles lost by closing."
          ]
        }
      ]
    },
    {
      "id": "activation",
      "title": "Read activation direction from curves",
      "keyTerms": [],
      "source": "L06 PDF 16",
      "blocks": [
        {
          "type": "text",
          "body": ["PDF page 16 plots steady permissive probability against voltage. A rising curve means depolarization activation; a falling curve means hyperpolarization activation. Read the state definition and voltage axis before assigning a direction. These curves describe the final fraction after sufficient time at each voltage.", "Steady activation alone gives neither the relaxation speed nor ionic current direction. The former needs transition rates or a time constant; the latter also needs voltage relative to reversal. A channel can become more permissive while its current changes sign because the driving force crosses reversal."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 6, PDF page 16. Source rate and activation curves: depolarization activation above, hyperpolarization activation below. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 6, PDF page 16. Source rate and activation curves: depolarization activation above, hyperpolarization activation below. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L06/activation.webp', import.meta.url).href,
              "alt": "Lecture 6, PDF page 16. Source rate and activation curves: depolarization activation above, hyperpolarization activation below. Original labels, axes and scale bars retained.",
              "aspect": 1.7243510506798516,
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
          "id": "L06-activation-check",
          "prompt": "What identifies hyperpolarization activation?",
          "correct": 1,
          "options": [
            {
              "text": "Steady activation rises as voltage becomes more positive",
              "feedback": "A rising curve with positive voltage describes depolarization activation."
            },
            {
              "text": "Steady activation rises as voltage becomes more negative",
              "feedback": "A higher steady fraction at more negative voltage defines hyperpolarization activation."
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
            "Steady activation rises as voltage becomes more negative."
          ]
        },
        {
          "id": "L06-activation-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L06 PDF 16",
          "prompt": "What does a steady activation curve show at each held voltage?",
          "options": [
            {
              "text": "The permissive fraction after relaxation",
              "feedback": "The curve gives the final particle-state fraction after sufficient time at that voltage."
            },
            {
              "text": "The permissive fraction before relaxation",
              "feedback": "The initial fraction depends on the preceding holding condition."
            },
            {
              "text": "The ionic current after full relaxation",
              "feedback": "Current also requires a permeation relation and driving force; activation is a fraction."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The curve gives the final particle-state fraction after sufficient time at that voltage."
          ]
        }
      ]
    },
    {
      "id": "kinetics",
      "title": "Approach to steady state after a voltage step",
      "keyTerms": [],
      "source": "L06 PDF 17",
      "blocks": [
        {
          "type": "text",
          "body": ["After a voltage step, use the rates at the new held voltage. PDF page 17 gives exponential relaxation from initial fraction $y_0$ toward $y_\\infty$, with $\\tau=1/(\\alpha+\\beta)$. Keep time and inverse-rate units consistent. At one time constant the remaining distance to steady state is reduced by a factor of $e$.", "The fraction is continuous at the step and approaches, rather than overshoots, the new steady value in this model. Ionic current can nevertheless jump because driving force changes immediately. Sketch the initial value, final asymptote and approach direction before evaluating a time point with the explorer below."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 6, PDF page 17. Single-particle and whole-channel activation time courses; schematic axes have no numerical time scale. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 6, PDF page 17. Single-particle and whole-channel activation time courses; schematic axes have no numerical time scale. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L06/kinetics.webp', import.meta.url).href,
              "alt": "Lecture 6, PDF page 17. Single-particle and whole-channel activation time courses; schematic axes have no numerical time scale. Original labels, axes and scale bars retained.",
              "aspect": 1.7868421052631578,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L06-f-tau",
          "name": "Gating time constant",
          "tex": "\\tau=\\frac{1}{\\alpha+\\beta}",
          "symbols": [
            {
              "tex": "\\tau",
              "name": "Relaxation time",
              "unit": "\\mathrm s",
              "meaning": "Relaxation time in the stated model."
            },
            {
              "tex": "\\alpha",
              "name": "Opening rate",
              "unit": "\\mathrm{s^{-1}}",
              "meaning": "Opening rate in the stated model."
            },
            {
              "tex": "\\beta",
              "name": "Closing rate",
              "unit": "\\mathrm{s^{-1}}",
              "meaning": "Closing rate in the stated model."
            }
          ],
          "reads": "A larger rate sum gives a faster relaxation.",
          "assumes": "Constant voltage and constant rates after the step.",
          "variants": [],
          "drill": {
            "prompt": "With $\\alpha=45$ and $\\beta=15\\,\\mathrm{s^{-1}}$, find the time constant in seconds.",
            "answer": {
              "value": 0.016666666666666666,
              "unit": "s",
              "tolerance": 5e-05,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 1,
                  "b": 60
                },
                "displayScale": 1
              }
            },
            "tex": "\\tau=1/(45+15)",
            "modelAnswer": [
              "A larger rate sum gives a faster relaxation."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\tau=\\frac{1}{\\alpha+\\beta}$."
              },
              {
                "body": "Start with $\\tau=1/(45+15)$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{\\tau}}=\\frac{1}{{\\htmlClass{formula-term-1}{\\alpha}}+{\\htmlClass{formula-term-2}{\\beta}}}"
        },
        {
          "id": "L06-f-relax",
          "name": "Activation after a voltage step",
          "tex": "y(t)=y_\\infty+(y_0-y_\\infty)e^{-t/\\tau}",
          "symbols": [
            {
              "tex": "y(t)",
              "name": "Particle fraction",
              "unit": "1",
              "meaning": "Particle fraction in the stated model."
            },
            {
              "tex": "y_\\infty",
              "name": "Steady fraction",
              "unit": "1",
              "meaning": "Steady fraction in the stated model."
            },
            {
              "tex": "y_0",
              "name": "Initial fraction",
              "unit": "1",
              "meaning": "Initial fraction in the stated model."
            },
            {
              "tex": "t",
              "name": "Elapsed time",
              "unit": "\\mathrm s",
              "meaning": "Elapsed time in the stated model."
            },
            {
              "tex": "\\tau",
              "name": "Time constant",
              "unit": "\\mathrm s",
              "meaning": "Time constant in the stated model."
            }
          ],
          "reads": "Activation moves continuously from its initial value toward the new steady value.",
          "assumes": "One particle; fixed voltage during the interval.",
          "variants": [],
          "drill": {
            "prompt": "Use $y_0=0.2$, $y_\\infty=0.8$, $\\tau=0.020\\,\\mathrm s$ and $t=0.030\\,\\mathrm s$. Find $y(t)$.",
            "answer": {
              "value": 0.6661219039109422,
              "unit": "",
              "tolerance": 0.0019983657117328265,
              "verification": {
                "relation": "gateRelax",
                "inputs": {
                  "y0": 0.2,
                  "steady": 0.8,
                  "tau": 0.02,
                  "time": 0.03
                },
                "displayScale": 1
              }
            },
            "tex": "y=0.8+(0.2-0.8)e^{-0.030/0.020}",
            "modelAnswer": [
              "Activation moves continuously from its initial value toward the new steady value."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $y(t)=y_\\infty+(y_0-y_\\infty)e^{-t/\\tau}$."
              },
              {
                "body": "Start with $y=0.8+(0.2-0.8)e^{-0.030/0.020}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{y(t)}}={\\htmlClass{formula-term-1}{y_\\infty}}+({\\htmlClass{formula-term-2}{y_0}}-{\\htmlClass{formula-term-1}{y_\\infty}})e^{-{\\htmlClass{formula-term-3}{t}}/{\\htmlClass{formula-term-4}{\\tau}}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L06-kinetics-check",
          "prompt": "What stays continuous in the ideal finite-rate model?",
          "correct": 0,
          "options": [
            {
              "text": "The gating variable across the voltage step",
              "feedback": "Finite transition rates keep the particle fraction continuous."
            },
            {
              "text": "The current across every voltage-clamp step",
              "feedback": "Current can jump because driving force changes while the gate fraction stays continuous."
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
            "The gating variable across the voltage step."
          ]
        },
        {
          "id": "L06-kinetics-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L06 PDF 17",
          "prompt": "What does the time constant describe in first-order gating?",
          "options": [
            {
              "text": "The size of the final steady activation",
              "feedback": "The steady fraction depends on the rate ratio; the time constant depends on the rate sum."
            },
            {
              "text": "The voltage where ionic current reverses",
              "feedback": "Reversal concerns driving force and ion concentrations, not the relaxation timescale."
            },
            {
              "text": "The timescale of approach to steady activation",
              "feedback": "The time constant sets how quickly the initial fraction relaxes toward its new steady value."
            }
          ],
          "correct": 2,
          "modelAnswer": [
            "The time constant sets how quickly the initial fraction relaxes toward its new steady value."
          ]
        }
      ]
    },
    {
      "id": "particles",
      "title": "From particles to whole-channel opening",
      "keyTerms": [],
      "source": "L06 PDF 17",
      "blocks": [
        {
          "type": "text",
          "body": ["If $P$ identical independent particles must all be permissive, PDF page 17 multiplies their probabilities: $Y=y^P$. First calculate the single-particle relaxation, then raise that entire fraction to the particle count. Applying the power only to a rate or exponential term changes the model.", "For several required particles, whole-channel opening is less likely than one particle being permissive and can show a delayed rise. To obtain population current, multiply the resulting open fraction by maximum conductance and driving force. Independence and the all-required rule are essential; the power law is not universal."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 6, PDF page 17. Single-particle and whole-channel activation time courses; schematic axes have no numerical time scale. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 6, PDF page 17. Single-particle and whole-channel activation time courses; schematic axes have no numerical time scale. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L06/kinetics.webp', import.meta.url).href,
              "alt": "Lecture 6, PDF page 17. Single-particle and whole-channel activation time courses; schematic axes have no numerical time scale. Original labels, axes and scale bars retained.",
              "aspect": 1.7868421052631578,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L06-f-power",
          "name": "Independent all-required particles",
          "tex": "Y=y^P",
          "symbols": [
            {
              "tex": "Y",
              "name": "Whole-channel probability",
              "unit": "1",
              "meaning": "Whole-channel probability in the stated model."
            },
            {
              "tex": "y",
              "name": "Particle probability",
              "unit": "1",
              "meaning": "Particle probability in the stated model."
            },
            {
              "tex": "P",
              "name": "Required particle count",
              "unit": "1",
              "meaning": "Required particle count in the stated model."
            }
          ],
          "reads": "All-required independent particle probabilities multiply.",
          "assumes": "Identical independent particles; all must be permissive.",
          "variants": [],
          "drill": {
            "prompt": "Three independent particles must all be permissive. Each has $y=0.6$. Find whole-channel open probability.",
            "answer": {
              "value": 0.21599999999999997,
              "unit": "",
              "tolerance": 0.0006479999999999999,
              "verification": {
                "relation": "gatePower",
                "inputs": {
                  "y": 0.6,
                  "count": 3
                },
                "displayScale": 1
              }
            },
            "tex": "Y=0.6^3",
            "modelAnswer": [
              "All-required independent particle probabilities multiply."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $Y=y^P$."
              },
              {
                "body": "Start with $Y=0.6^3$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{Y}}={\\htmlClass{formula-term-1}{y}}^{\\htmlClass{formula-term-2}{P}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L06-particles-check",
          "prompt": "For several all-required particles, open probability is",
          "correct": 1,
          "options": [
            {
              "text": "The sum of their permissive probabilities",
              "feedback": "Summing counts alternatives; all-required independent events require multiplication."
            },
            {
              "text": "The product of their permissive probabilities",
              "feedback": "Independence lets the all-required probabilities multiply."
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
            "The product of their permissive probabilities."
          ]
        },
        {
          "id": "L06-particles-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L06 PDF 17",
          "prompt": "Which condition is required for the whole-channel rule $Y=y^P$?",
          "options": [
            {
              "text": "All identical dependent particles must be permissive",
              "feedback": "Dependence prevents multiplying identical marginal probabilities without further information."
            },
            {
              "text": "All identical independent particles must be permissive",
              "feedback": "The product rule applies when every independent particle must be permissive for opening."
            },
            {
              "text": "Any identical independent particle may be permissive",
              "feedback": "An any-one-suffices rule needs a different probability expression."
            }
          ],
          "correct": 1,
          "modelAnswer": [
            "The product rule applies when every independent particle must be permissive for opening."
          ]
        }
      ]
    },
    {
      "id": "summary",
      "title": "Combine three sources of nonlinearity",
      "keyTerms": [],
      "source": "L06 PDF 18",
      "blocks": [
        {
          "type": "text",
          "body": ["PDF page 18 combines three sources of nonlinearity: concentration gradients, the positions of permeation barriers, and voltage-dependent transitions between gating states. Constant-field and static barrier relations describe permeation at specified conditions. The gate model adds explicit evolution of the conducting fraction at fixed voltage.", "A useful explanation names the observation and the mechanism it requires. Curvature alone can have several explanations; delayed activation needs a changing state. These mechanisms can coexist in one channel. This lecture introduces general gating logic, while channel-specific Hodgkin–Huxley equations belong to the following lecture."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 6, PDF page 21. Source comparison table for constant-field, barrier and gate models. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 6, PDF page 21. Source comparison table for constant-field, barrier and gate models. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L06/comparison.webp', import.meta.url).href,
              "alt": "Lecture 6, PDF page 21. Source comparison table for constant-field, barrier and gate models. Original labels, axes and scale bars retained.",
              "aspect": 1.99182156133829,
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
          "id": "L06-summary-check",
          "prompt": "Which mechanism adds explicit gating memory?",
          "correct": 0,
          "options": [
            {
              "text": "Time evolution of the channel state",
              "feedback": "A changing state carries the effect of the earlier holding condition."
            },
            {
              "text": "A fixed ion concentration gradient",
              "feedback": "A fixed gradient curves permeation but adds no dynamic state memory."
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
            "Time evolution of the channel state."
          ]
        },
        {
          "id": "L06-summary-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L06 PDF 18",
          "prompt": "How can the three mechanisms contribute to a real channel?",
          "options": [
            {
              "text": "They can act together in the same channel",
              "feedback": "Concentration gradients, pore barriers and dynamic gating can all contribute."
            },
            {
              "text": "They must act in separate channel populations",
              "feedback": "The models describe different aspects and are not restricted to separate populations."
            },
            {
              "text": "They must act in separate voltage intervals",
              "feedback": "Several mechanisms can contribute at the same voltage, not just in separate intervals."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Concentration gradients, pore barriers and dynamic gating can all contribute."
          ]
        }
      ]
    },
    {
      "id": "model-audit",
      "title": "Group-work model audit",
      "keyTerms": [],
      "source": "L06 PDF 19–21",
      "blocks": [
        {
          "type": "text",
          "body": ["The group work on PDF pages 19–21 asks which model directly explains each observation, not which single label describes every aspect of a real channel. Fixed-permeability concentration effects support constant-field permeation; barrier height or position supports barrier permeation; switching and delayed conductance require dynamic gates.", "All three families can give nonlinear current–voltage behavior. The table’s “indirectly” means a gate model controls access but still needs a permeation/current relation and reversal to calculate ionic current. Compare explicit time dependence and the moving object, ion versus gating particle, before claiming that curvature uniquely identifies a mechanism."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 6, PDF page 21. Source comparison table for constant-field, barrier and gate models. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 6, PDF page 21. Source comparison table for constant-field, barrier and gate models. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L06/comparison.webp', import.meta.url).href,
              "alt": "Lecture 6, PDF page 21. Source comparison table for constant-field, barrier and gate models. Original labels, axes and scale bars retained.",
              "aspect": 1.99182156133829,
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
          "id": "L06-model-audit-check",
          "prompt": "Can a nonlinear current curve uniquely prove gating?",
          "correct": 1,
          "options": [
            {
              "text": "Yes, every nonlinear current curve proves gating",
              "feedback": "Curvature also arises from concentration gradients or fixed pore barriers."
            },
            {
              "text": "No, static permeation can also be nonlinear",
              "feedback": "Static permeation can be nonlinear without dynamic opening and closing."
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
            "No, static permeation can also be nonlinear."
          ]
        },
        {
          "id": "L06-model-audit-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L06 PDF 19–21",
          "prompt": "In the comparison table, why does a gate model describe permeation only indirectly?",
          "options": [
            {
              "text": "It sets ion valence but needs a state relation",
              "feedback": "The gate model describes states; it does not determine permeating-ion valence."
            },
            {
              "text": "It sets ion gradients but needs a pore fraction",
              "feedback": "Gating does not specify the bulk concentration gradients that drive permeation."
            },
            {
              "text": "It sets pore access but needs a current relation",
              "feedback": "Opening probability controls availability; a separate open-pore relation supplies ionic current."
            }
          ],
          "correct": 2,
          "modelAnswer": [
            "Opening probability controls availability; a separate open-pore relation supplies ionic current."
          ]
        }
      ]
    },
    {
      "id": "clamp",
      "title": "Separate leak, activation and driving force",
      "keyTerms": [],
      "source": "Exercise6 p1; solving instructions",
      "blocks": [
        {
          "type": "text",
          "body": ["Exercise 6 problem 1 controls membrane voltage and measures total current over time. A step to a more negative voltage gives a rapid jump followed by slower inward activation, consistent with the falling steady activation curve. At the new held voltage, subtract leak before dividing by the gating fraction to infer fully activated current.", "The solving instructions identify the immediate component as leak only when initial activation is negligible and the capacitive transient is excluded. Finite-rate gating keeps $y$ continuous, but pre-existing open channels can change current instantly with driving force. Use the relaxation law for later activation and then recombine leak and gated current."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Exercise 6, PDF page 1. Supplied Exercise6 voltage-clamp current/voltage traces and steady activation curve. Graph readings are approximate. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Exercise 6, PDF page 1. Supplied Exercise6 voltage-clamp current/voltage traces and steady activation curve. Graph readings are approximate. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L06/clamp.webp', import.meta.url).href,
              "alt": "Exercise 6, PDF page 1. Supplied Exercise6 voltage-clamp current/voltage traces and steady activation curve. Graph readings are approximate. Original labels, axes and scale bars retained.",
              "aspect": 1.9728682170542635,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L06-f-gated-current",
          "name": "Current at a specified gate fraction",
          "tex": "I_y=I_{y,max}y",
          "symbols": [
            {
              "tex": "I_y",
              "name": "Gated current",
              "unit": "\\mathrm A",
              "meaning": "Gated current in the stated model."
            },
            {
              "tex": "I_{y,max}",
              "name": "Fully activated current",
              "unit": "\\mathrm A",
              "meaning": "Fully activated current in the stated model."
            },
            {
              "tex": "y",
              "name": "Activation",
              "unit": "1",
              "meaning": "Activation in the stated model."
            }
          ],
          "reads": "At fixed voltage the specified one-variable current scales with activation.",
          "assumes": "Exercise6 single activation factor, no extra particle power.",
          "variants": [],
          "drill": {
            "prompt": "At fixed voltage $I_{y,max}=-4\\times10^{-9}\\,\\mathrm A$ and $y=0.3$. Find gated current.",
            "answer": {
              "value": -1.2e-09,
              "unit": "A",
              "tolerance": 3.6e-12,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": -4e-09,
                  "b": 0.3
                },
                "displayScale": 1
              }
            },
            "tex": "I_y=(-4\\times10^{-9})(0.3)",
            "modelAnswer": [
              "At fixed voltage the specified one-variable current scales with activation."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $I_y=I_{y,max}y$."
              },
              {
                "body": "Start with $I_y=(-4\\times10^{-9})(0.3)$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{I_y}}={\\htmlClass{formula-term-1}{I_{y,max}}}{\\htmlClass{formula-term-2}{y}}"
        },
        {
          "id": "L06-f-max-current",
          "name": "Infer fully activated current",
          "tex": "I_{y,max}=\\frac{I_{total}-I_L}{y}",
          "symbols": [
            {
              "tex": "I_{y,max}",
              "name": "Fully activated current",
              "unit": "\\mathrm A",
              "meaning": "Fully activated current in the stated model."
            },
            {
              "tex": "I_{total}",
              "name": "Total current",
              "unit": "\\mathrm A",
              "meaning": "Total current in the stated model."
            },
            {
              "tex": "I_L",
              "name": "Leak current",
              "unit": "\\mathrm A",
              "meaning": "Leak current in the stated model."
            },
            {
              "tex": "y",
              "name": "Activation",
              "unit": "1",
              "meaning": "Activation in the stated model."
            }
          ],
          "reads": "Subtract the leak before dividing by the known activation.",
          "assumes": "No capacitive current; nonzero activation.",
          "variants": [],
          "drill": {
            "prompt": "Total current is $-3.8\\times10^{-9}\\,\\mathrm A$, leak is $-0.8\\times10^{-9}\\,\\mathrm A$ and $y=0.6$. Find fully activated current.",
            "answer": {
              "value": -5e-09,
              "unit": "A",
              "tolerance": 1.5e-11,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": -3e-09,
                  "b": 0.6
                },
                "displayScale": 1
              }
            },
            "tex": "I_{y,max}=[-3.8-(-0.8)]10^{-9}/0.6",
            "modelAnswer": [
              "Subtract the leak before dividing by the known activation."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $I_{y,max}=\\frac{I_{total}-I_L}{y}$."
              },
              {
                "body": "Start with $I_{y,max}=[-3.8-(-0.8)]10^{-9}/0.6$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{I_{y,max}}}=\\frac{{\\htmlClass{formula-term-1}{I_{total}}}-{\\htmlClass{formula-term-2}{I_L}}}{{\\htmlClass{formula-term-3}{y}}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L06-clamp-check",
          "prompt": "What must be checked before assigning the jump to leak?",
          "correct": 0,
          "options": [
            {
              "text": "Initial activation and the capacitive transient",
              "feedback": "Pre-existing open channels and capacitance can contribute to the immediate response."
            },
            {
              "text": "Only the final inward-current amplitude",
              "feedback": "A late amplitude alone does not separate early gated, leak and capacitive contributions."
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
            "Initial activation and the capacitive transient."
          ]
        },
        {
          "id": "L06-clamp-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "Exercise 6 p1; L06 PDF17",
          "prompt": "In Exercise 6 voltage clamp, which quantity is imposed and which is recorded?",
          "options": [
            {
              "text": "Conductance is imposed and current is recorded",
              "feedback": "Conductance is inferred from the response; it is not the clamp command."
            },
            {
              "text": "Voltage is imposed and current is recorded",
              "feedback": "Voltage clamp holds the command voltage while measuring the required membrane current."
            },
            {
              "text": "Current is imposed and voltage is recorded",
              "feedback": "That describes current clamp, rather than the exercise voltage-clamp protocol."
            }
          ],
          "correct": 1,
          "modelAnswer": [
            "Voltage clamp holds the command voltage while measuring the required membrane current."
          ]
        }
      ],
      "part": {
        "id": "exercise",
        "number": 3,
        "title": "Exercise 6: analytical interpretation"
      }
    },
    {
      "id": "chord",
      "title": "Chord conductance and reversal-based inference",
      "keyTerms": [],
      "source": "Exercise6 p2; solving instructions",
      "blocks": [
        {
          "type": "text",
          "body": ["Exercise 6 problem 2 compares currents at controlled voltages. Locate the zero-current reversal, then calculate chord conductance from $G=I/(V-E_{rev})$. This is a line from reversal to the measured point, not the local differential slope. Compare conductances, not just current amplitudes, to assess rectification.", "For the specified selective monovalent ion at $20\\,^{\\circ}\\mathrm C$, infer the inside/outside ratio using the supplied $58\\,\\mathrm{mV}$ Nernst shortcut below. Treat graph readings as approximate. A positive reversal with inward rectification is GHK-compatible and can also fit a suitable barrier model; neither compatibility nor curvature proves a unique mechanism."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Exercise 6, PDF page 2. Supplied Exercise6 nonlinear current–voltage curve, with original axes. Graph readings are approximate. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Exercise 6, PDF page 2. Supplied Exercise6 nonlinear current–voltage curve, with original axes. Graph readings are approximate. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L06/chord.webp', import.meta.url).href,
              "alt": "Exercise 6, PDF page 2. Supplied Exercise6 nonlinear current–voltage curve, with original axes. Graph readings are approximate. Original labels, axes and scale bars retained.",
              "aspect": 2.0183968462549275,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L06-f-chord",
          "name": "Chord conductance",
          "tex": "G_{chord}=\\frac{I}{V_m-E_{rev}}",
          "symbols": [
            {
              "tex": "G_{chord}",
              "name": "Chord conductance",
              "unit": "\\mathrm S",
              "meaning": "Chord conductance in the stated model."
            },
            {
              "tex": "I",
              "name": "Ionic current",
              "unit": "\\mathrm A",
              "meaning": "Ionic current in the stated model."
            },
            {
              "tex": "V_m",
              "name": "Inside voltage",
              "unit": "\\mathrm V",
              "meaning": "Inside voltage in the stated model."
            },
            {
              "tex": "E_{rev}",
              "name": "Reversal",
              "unit": "\\mathrm V",
              "meaning": "Reversal in the stated model."
            }
          ],
          "reads": "The chord uses reversal rather than zero as its voltage reference.",
          "assumes": "Finite nonzero driving force for this ionic component.",
          "variants": [],
          "drill": {
            "prompt": "Use $I=-1.5\\times10^{-9}\\,\\mathrm A$, $V_m=-0.030\\,\\mathrm V$ and $E_{rev}=0.020\\,\\mathrm V$. Find chord conductance.",
            "answer": {
              "value": 3e-08,
              "unit": "S",
              "tolerance": 9e-11,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": -1.5e-09,
                  "b": -0.05
                },
                "displayScale": 1
              }
            },
            "tex": "G=(-1.5\\times10^{-9})/[-0.030-0.020]",
            "modelAnswer": [
              "The chord uses reversal rather than zero as its voltage reference."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $G_{chord}=\\frac{I}{V_m-E_{rev}}$."
              },
              {
                "body": "Start with $G=(-1.5\\times10^{-9})/[-0.030-0.020]$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{G_{chord}}}=\\frac{{\\htmlClass{formula-term-1}{I}}}{{\\htmlClass{formula-term-2}{V_m}}-{\\htmlClass{formula-term-3}{E_{rev}}}}"
        },
        {
          "id": "L06-f-inverse-nernst",
          "name": "Concentration ratio from reversal",
          "tex": "\\frac{C_i}{C_o}=10^{-zE_{rev}/(58\\,\\mathrm{mV})}",
          "symbols": [
            {
              "tex": "C_i",
              "name": "Inside concentration",
              "unit": "\\mathrm{mol/m^3}",
              "meaning": "Inside concentration in the stated model."
            },
            {
              "tex": "C_o",
              "name": "Outside concentration",
              "unit": "\\mathrm{mol/m^3}",
              "meaning": "Outside concentration in the stated model."
            },
            {
              "tex": "z",
              "name": "Ion valence",
              "unit": "1",
              "meaning": "Ion valence in the stated model."
            },
            {
              "tex": "E_{rev}",
              "name": "Selective reversal",
              "unit": "\\mathrm V",
              "meaning": "Selective reversal in the stated model."
            }
          ],
          "reads": "A positive selective cation reversal requires a higher outside concentration.",
          "assumes": "Selective ion at 20°C; use the source rounded shortcut.",
          "variants": [],
          "drill": {
            "prompt": "A selective monovalent cation reverses at $0.040\\,\\mathrm V$ at 20°C. With the $0.058\\,\\mathrm V$ shortcut find $C_i/C_o$.",
            "answer": {
              "value": 0.2043359717856942,
              "unit": "",
              "tolerance": 0.0006130079153570826,
              "verification": {
                "relation": "nernstRatio",
                "inputs": {
                  "delta": -0.04,
                  "shortcut": 0.058
                },
                "displayScale": 1
              }
            },
            "tex": "C_i/C_o=10^{-0.040/0.058}",
            "modelAnswer": [
              "A positive selective cation reversal requires a higher outside concentration."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\frac{C_i}{C_o}=10^{-zE_{rev}/(58\\,\\mathrm{mV})}$."
              },
              {
                "body": "Start with $C_i/C_o=10^{-0.040/0.058}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\frac{{\\htmlClass{formula-term-0}{C_i}}}{{\\htmlClass{formula-term-1}{C_o}}}=10^{-{\\htmlClass{formula-term-2}{z}}{\\htmlClass{formula-term-3}{E_{rev}}}/(58\\,\\mathrm{mV})}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L06-chord-check",
          "prompt": "What voltage belongs in the chord denominator?",
          "correct": 1,
          "options": [
            {
              "text": "Membrane voltage minus zero volts in all cases",
              "feedback": "Zero is the correct reference only if reversal itself is zero."
            },
            {
              "text": "Membrane voltage minus reversal potential",
              "feedback": "The chord denominator is the driving force relative to ionic reversal."
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
            "Membrane voltage minus reversal potential."
          ]
        },
        {
          "id": "L06-chord-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "Exercise 6 p2",
          "prompt": "Geometrically, which line defines chord conductance at a measured point?",
          "options": [
            {
              "text": "The line from reversal to that measured point",
              "feedback": "The chord uses current divided by voltage measured from reversal."
            },
            {
              "text": "The tangent through that measured curve point",
              "feedback": "The tangent gives local differential slope conductance, not chord conductance."
            },
            {
              "text": "The line from resting voltage to that point",
              "feedback": "The chord reference is ionic reversal, which need not equal resting voltage."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The chord uses current divided by voltage measured from reversal."
          ]
        }
      ]
    }
  ],
  "recap": {
    "intro": "Revision reference, not an assumed permitted personal cheat sheet. A calculator and the official supplied equation sheet are confirmed.",
    "terms": [
      {
        "term": "Rectification",
        "definition": "Current flows more easily in one direction relative to driving force."
      },
      {
        "term": "Constant field",
        "definition": "Uniform-field independent permeation with fixed permeability."
      },
      {
        "term": "Partition coefficient",
        "definition": "Channel concentration divided by surrounding concentration."
      },
      {
        "term": "Dominant energy barrier",
        "definition": "Largest rate-limiting obstacle motivating a single-barrier reduction."
      },
      {
        "term": "Binding well",
        "definition": "Favorable energetic location, not a negative transition rate."
      },
      {
        "term": "Permissive fraction",
        "definition": "Probability of one particle being in its permissive state."
      },
      {
        "term": "Activation function",
        "definition": "Steady permissive fraction at a specified voltage."
      },
      {
        "term": "Gating time constant",
        "definition": "Reciprocal opening-plus-closing rate."
      },
      {
        "term": "Independent all-required particles",
        "definition": "Whole-channel open probability is the product of particle probabilities."
      },
      {
        "term": "Chord conductance",
        "definition": "Current divided by voltage relative to ionic reversal."
      },
      {
        "term": "Model identifiability",
        "definition": "Consistency of a curve does not uniquely establish a mechanism."
      }
    ],
    "equations": [
      {
        "name": "Constant-field current density",
        "tex": "j=P_m\\frac{z^2F^2V_m}{RT}\\frac{C_i-C_oe^{-zFV_m/(RT)}}{1-e^{-zFV_m/(RT)}}",
        "note": "Independent permeation, constant field; current density convention."
      },
      {
        "name": "Directional influx",
        "tex": "J=k\\beta_p C",
        "note": "Independent passage, effective crossing coefficient."
      },
      {
        "name": "Directional outflux",
        "tex": "J=k\\beta_p C",
        "note": "Independent passage, effective crossing coefficient."
      },
      {
        "name": "Activation energy controls crossing",
        "tex": "k_0=Ae^{-\\Delta G_0/(RT)}",
        "note": "The barrier is expressed in multiples of thermal energy."
      },
      {
        "name": "Zero-voltage directional flux ratio",
        "tex": "\\frac{J_{in}}{J_{out}}=\\frac{C_o}{C_i}",
        "note": "Symmetric zero-voltage barrier with common partition."
      },
      {
        "name": "Voltage-dependent inward-rate",
        "tex": "k_1=k_0e^{-(1-\\delta)zFV_m/(RT)}",
        "note": "Fixed barrier, positive valence, effective coefficient."
      },
      {
        "name": "Voltage-dependent outward-rate",
        "tex": "k_2=k_0e^{\\delta zFV_m/(RT)}",
        "note": "Fixed barrier, positive valence, effective coefficient."
      },
      {
        "name": "Outward net current from fluxes",
        "tex": "j=zF(J_{out}-J_{in})",
        "note": "Fluxes are densities and current is density."
      },
      {
        "name": "Permissive-state balance",
        "tex": "\\frac{dy}{dt}=\\alpha(1-y)-\\beta y",
        "note": "One first-order particle at fixed voltage."
      },
      {
        "name": "Gating alpha rate",
        "tex": "\\alpha=\\alpha_0e^{\\delta zFV_m/(RT)}",
        "note": "Fixed baseline rates and positive gating valence."
      },
      {
        "name": "Gating beta rate",
        "tex": "\\beta=\\beta_0e^{-(1-\\delta)zFV_m/(RT)}",
        "note": "Fixed baseline rates and positive gating valence."
      },
      {
        "name": "Steady permissive fraction",
        "tex": "y_\\infty=\\frac{\\alpha}{\\alpha+\\beta}",
        "note": "Nonnegative rates with nonzero sum."
      },
      {
        "name": "Steady activation without barrier location",
        "tex": "y_\\infty=\\frac{1}{1+(\\beta_0/\\alpha_0)e^{-zFV_m/(RT)}}",
        "note": "Positive baseline rates, single source gating-charge model."
      },
      {
        "name": "Gating time constant",
        "tex": "\\tau=\\frac{1}{\\alpha+\\beta}",
        "note": "Constant voltage and constant rates after the step."
      },
      {
        "name": "Activation after a voltage step",
        "tex": "y(t)=y_\\infty+(y_0-y_\\infty)e^{-t/\\tau}",
        "note": "One particle; fixed voltage during the interval."
      },
      {
        "name": "Independent all-required particles",
        "tex": "Y=y^P",
        "note": "Identical independent particles; all must be permissive."
      },
      {
        "name": "Current at a specified gate fraction",
        "tex": "I_y=I_{y,max}y",
        "note": "Exercise6 single activation factor, no extra particle power."
      },
      {
        "name": "Infer fully activated current",
        "tex": "I_{y,max}=\\frac{I_{total}-I_L}{y}",
        "note": "No capacitive current; nonzero activation."
      },
      {
        "name": "Chord conductance",
        "tex": "G_{chord}=\\frac{I}{V_m-E_{rev}}",
        "note": "Finite nonzero driving force for this ionic component."
      },
      {
        "name": "Concentration ratio from reversal",
        "tex": "\\frac{C_i}{C_o}=10^{-zE_{rev}/(58\\,\\mathrm{mV})}",
        "note": "Selective ion at 20°C; use the source rounded shortcut."
      },
      {
        "name": "Current decomposition",
        "tex": "I_{total}=I_L+I_{y,max}y",
        "note": "Exercise6 after excluding capacitive current."
      },
      {
        "name": "Ohmic open population",
        "tex": "I=\\bar gY(V_m-E_{rev})",
        "note": "PDF12 and earlier L02; Y depends on gating rule."
      }
    ],
    "constants": [
      {
        "name": "Gas constant and temperature",
        "tex": "R=8.314\\,\\mathrm{J/(mol\\,K)},\\quad T=293\\,\\mathrm K"
      },
      {
        "name": "Faraday constant",
        "tex": "F=96485\\,\\mathrm{C/mol}"
      },
      {
        "name": "Course Nernst shortcut at 20°C",
        "tex": "58\\,\\mathrm{mV}\\quad(z=+1)"
      }
    ],
    "conventions": [
      "$V_m=V_{in}-V_{out}$ with outside zero; outward ionic current is positive.",
      "Depolarization means more positive, not necessarily positive absolute voltage.",
      "$\\delta$ is measured from inside: zero inner margin, one outer margin.",
      "$\\beta_p$ denotes partitioning; $\\beta$ alone denotes the closing rate.",
      "Permeation coefficients use effective velocity units with flux density. GHK uses permeability and current density; multiply by area for total current.",
      "Finite-rate gating is continuous, but a current can jump when driving force changes.",
      "Zero-voltage baselines stay fixed for the location-cancellation argument.",
      "Source figures are teaching panels. New numerical scenarios are explicitly idealized; no new recordings or NEURON outputs are claimed."
    ]
  },
  "lectureQuiz": [
    {
      "id": "L06-rectification-facts",
      "sectionId": "rectification",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "Inward rectification means inward current flows more easily.",
          "answer": true
        },
        {
          "text": "All nonlinear membranes require explicit time-dependent gating.",
          "answer": false,
          "correction": "Concentration gradients and static energy barriers can also make current nonlinear."
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
        "Inward rectification means inward current flows more easily.",
        "Concentration gradients and static energy barriers can also make current nonlinear."
      ],
      "points": 1,
      "source": "L06 PDF 2"
    },
    {
      "id": "L06-direct-ghk",
      "sectionId": "constant-field",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $P_m=2\\times10^{-8}\\,\\mathrm{m/s}$, $z=1$, $F=96485\\,\\mathrm{C/mol}$, $R=8.314\\,\\mathrm{J/(mol\\,K)}$, $T=293\\,\\mathrm K$, $V_m=0.025\\,\\mathrm V$, $C_i=120$ and $C_o=12\\,\\mathrm{mol/m^3}$. Calculate outward current density.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Permeability",
              "answer": {
                "value": 2e-08,
                "unit": "m/s",
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
              "label": "Voltage",
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
              "label": "Inside concentration",
              "answer": {
                "value": 120,
                "unit": "mol/m3",
                "tolerance": 0.00011999999999999999,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 120,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Outside concentration",
              "answer": {
                "value": 12,
                "unit": "mol/m3",
                "tolerance": 1.2e-05,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 12,
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
          "title": "Thermal voltage",
          "answer": {
            "value": 0.025247468518422553,
            "unit": "V",
            "tolerance": 7.574240555526767e-05,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 2436.002,
                "b": 96485
              },
              "displayScale": 1
            }
          },
          "tex": "V_T=RT/F",
          "modelAnswer": [
            "Use SI molar constants.",
            "$V_T=RT/F$",
            "$0.025247469\\,\\mathrm{V}$"
          ]
        },
        {
          "title": "Dimensionless voltage",
          "answer": {
            "value": 0.990198283909455,
            "unit": "",
            "tolerance": 0.002970594851728365,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 0.025,
                "b": 0.025247468518422553
              },
              "displayScale": 1
            }
          },
          "tex": "u=zV_m/V_T",
          "modelAnswer": [
            "Valence is one in this question.",
            "$u=zV_m/V_T$",
            "$0.99019828$"
          ]
        },
        {
          "title": "Boltzmann factor",
          "answer": {
            "value": 0.37150302064715385,
            "unit": "",
            "tolerance": 0.0011145090619414616,
            "verification": {
              "relation": "exponentialRate",
              "inputs": {
                "base": 1,
                "exponent": -0.990198283909455
              },
              "displayScale": 1
            }
          },
          "tex": "b=e^{-u}",
          "modelAnswer": [
            "Keep the negative exponent.",
            "$b=e^{-u}$",
            "$0.37150302$"
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 0.35127603007599756,
            "unit": "A/m2",
            "tolerance": 0.0010538280902279928,
            "verification": {
              "relation": "ghkCurrent",
              "inputs": {
                "z": 1,
                "f": 96485,
                "r": 8.314,
                "temperature": 293,
                "v": 0.025,
                "inside": 120,
                "outside": 12,
                "permeability": 2e-08
              },
              "displayScale": 1
            }
          },
          "tex": "j=P_m\\frac{z^2F^2V_m}{RT}\\frac{C_i-C_oe^{-zFV_m/(RT)}}{1-e^{-zFV_m/(RT)}}",
          "modelAnswer": [
            "A concentration gradient can rectify current even at fixed permeability.",
            "$j=(2\\times10^{-8})\\frac{96485^2(0.025)}{8.314(293)}\\frac{120-12e^{-96485(0.025)/(8.314(293))}}{1-e^{-96485(0.025)/(8.314(293))}}$",
            "$0.35127603\\,\\mathrm{A/m^2}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "A concentration gradient can rectify current even at fixed permeability."
            },
            {
              "label": "Ignore units and model assumptions when accepting the numerical result."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "A concentration gradient can rectify current even at fixed permeability."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $j=P_m\\frac{z^2F^2V_m}{RT}\\frac{C_i-C_oe^{-zFV_m/(RT)}}{1-e^{-zFV_m/(RT)}}$."
        },
        {
          "body": "Use $V_T=RT/F$, then the dimensionless ratio $V_m/V_T$. Start with $V_T=(8.314\\times293)/96485\\,\\mathrm V$; form the exponential and the concentration terms separately before multiplying the current-density prefactor."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Use SI molar constants.",
        "Valence is one in this question.",
        "Keep the negative exponent.",
        "A concentration gradient can rectify current even at fixed permeability.",
        "A concentration gradient can rectify current even at fixed permeability."
      ],
      "points": 1,
      "source": "L06 PDF 3"
    },
    {
      "id": "L06-barrier-facts",
      "sectionId": "barrier",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "One dominant barrier can justify the single-barrier approximation.",
          "answer": true
        },
        {
          "text": "The electric field must be uniform in every channel model.",
          "answer": false,
          "correction": "Energy-barrier models allow local field variation."
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
        "One dominant barrier can justify the single-barrier approximation.",
        "Energy-barrier models allow local field variation."
      ],
      "points": 1,
      "source": "L06 PDF 4"
    },
    {
      "id": "L06-independence-facts",
      "sectionId": "independence",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "The partition coefficient is a concentration ratio.",
          "answer": true
        },
        {
          "text": "Flux coupling satisfies independent passage by definition.",
          "answer": false,
          "correction": "Flux coupling means one ion’s movement affects another’s passage."
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
        "The partition coefficient is a concentration ratio.",
        "Flux coupling means one ion’s movement affects another’s passage."
      ],
      "points": 1,
      "source": "L06 PDF 5"
    },
    {
      "id": "L06-direct-influx",
      "sectionId": "independence",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "For the inward direction, use $k=2\\times10^{-6}\\,\\mathrm{m/s}$, $\\beta_p=0.25$ and source concentration $80\\,\\mathrm{mol/m^3}$. Find flux.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Crossing coefficient",
              "answer": {
                "value": 2e-06,
                "unit": "m/s",
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
              "label": "Partition coefficient",
              "answer": {
                "value": 0.25,
                "unit": "",
                "tolerance": 2.5e-07,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.25,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Source concentration",
              "answer": {
                "value": 80,
                "unit": "mol/m3",
                "tolerance": 7.999999999999999e-05,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 80,
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
          "title": "Partitioned outside concentration",
          "answer": {
            "value": 20,
            "unit": "mol/m3",
            "tolerance": 0.06,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 0.25,
                "b": 80
              },
              "displayScale": 1
            }
          },
          "tex": "C_{channel}=\\beta_p C_o",
          "modelAnswer": [
            "Partition multiplies the surrounding concentration.",
            "$C_{channel}=\\beta_p C_o$",
            "$20\\,\\mathrm{mol/m^3}$"
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 3.9999999999999996e-05,
            "unit": "mol/m2/s",
            "tolerance": 1.2e-07,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 5e-07,
                "b": 80
              },
              "displayScale": 1
            }
          },
          "tex": "J=k\\beta_p C",
          "modelAnswer": [
            "Directional flux scales with coefficient, partitioning and source concentration.",
            "$J=(2\\times10^{-6})(0.25)(80)$",
            "$4\\times10^{-5}\\,\\mathrm{mol/(m^2s)}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "Directional flux scales with coefficient, partitioning and source concentration."
            },
            {
              "label": "Ignore units and model assumptions when accepting the numerical result."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Directional flux scales with coefficient, partitioning and source concentration."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $J=k\\beta_p C$."
        },
        {
          "body": "Start with $J=(2\\times10^{-6})(0.25)(80)$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Partition multiplies the surrounding concentration.",
        "Directional flux scales with coefficient, partitioning and source concentration.",
        "Directional flux scales with coefficient, partitioning and source concentration."
      ],
      "points": 1,
      "source": "L06 PDF 5"
    },
    {
      "id": "L06-direct-outflux",
      "practice": "extra",
      "sectionId": "independence",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "For the outward direction, use $k=3\\times10^{-6}\\,\\mathrm{m/s}$, $\\beta_p=0.25$ and source concentration $100\\,\\mathrm{mol/m^3}$. Find flux.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Crossing coefficient",
              "answer": {
                "value": 3e-06,
                "unit": "m/s",
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
              "label": "Partition coefficient",
              "answer": {
                "value": 0.25,
                "unit": "",
                "tolerance": 2.5e-07,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.25,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Source concentration",
              "answer": {
                "value": 100,
                "unit": "mol/m3",
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
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Partitioned inside concentration",
          "answer": {
            "value": 25,
            "unit": "mol/m3",
            "tolerance": 0.075,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 0.25,
                "b": 100
              },
              "displayScale": 1
            }
          },
          "tex": "C_{channel}=\\beta_p C_i",
          "modelAnswer": [
            "Use the source side for this directional flux.",
            "$C_{channel}=\\beta_p C_i$",
            "$25\\,\\mathrm{mol/m^3}$"
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 7.500000000000001e-05,
            "unit": "mol/m2/s",
            "tolerance": 2.2500000000000002e-07,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 7.5e-07,
                "b": 100
              },
              "displayScale": 1
            }
          },
          "tex": "J=k\\beta_p C",
          "modelAnswer": [
            "Directional flux scales with coefficient, partitioning and source concentration.",
            "$J=(3\\times10^{-6})(0.25)(100)$",
            "$7.5\\times10^{-5}\\,\\mathrm{mol/(m^2s)}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "Directional flux scales with coefficient, partitioning and source concentration."
            },
            {
              "label": "Ignore units and model assumptions when accepting the numerical result."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Directional flux scales with coefficient, partitioning and source concentration."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $J=k\\beta_p C$."
        },
        {
          "body": "Start with $J=(3\\times10^{-6})(0.25)(100)$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Use the source side for this directional flux.",
        "Directional flux scales with coefficient, partitioning and source concentration.",
        "Directional flux scales with coefficient, partitioning and source concentration."
      ],
      "points": 1,
      "source": "L06 PDF 5"
    },
    {
      "id": "L06-zero-barrier-facts",
      "sectionId": "zero-barrier",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "Equal crossing coefficients at zero voltage imply equal directional fluxes for arbitrary concentrations.",
          "answer": false,
          "correction": "Equal directional fluxes additionally require equal concentrations under the common partition assumption."
        },
        {
          "text": "The symmetric zero-voltage argument can apply to neutral particles.",
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
        "Equal directional fluxes additionally require equal concentrations under the common partition assumption.",
        "The symmetric zero-voltage argument can apply to neutral particles."
      ],
      "points": 1,
      "source": "L06 PDF 6"
    },
    {
      "id": "L06-direct-arrhenius",
      "sectionId": "zero-barrier",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "An effective prefactor is $0.002\\,\\mathrm{m/s}$ and the barrier is $4RT$. Find the zero-voltage crossing coefficient.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Prefactor",
              "answer": {
                "value": 0.002,
                "unit": "m/s",
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
            },
            {
              "label": "Barrier in thermal units",
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
            "value": 3.663127777746836e-05,
            "unit": "m/s",
            "tolerance": 1.0989383333240508e-07,
            "verification": {
              "relation": "exponentialRate",
              "inputs": {
                "base": 0.002,
                "exponent": -4
              },
              "displayScale": 1
            }
          },
          "tex": "k_0=Ae^{-\\Delta G_0/(RT)}",
          "modelAnswer": [
            "A higher activation barrier lowers the crossing coefficient exponentially.",
            "$k_0=(0.002\\,\\mathrm{m/s})e^{-4}$",
            "$3.6631278\\times10^{-5}\\,\\mathrm{m/s}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "A higher activation barrier lowers the crossing coefficient exponentially."
            },
            {
              "label": "Ignore units and model assumptions when accepting the numerical result."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "A higher activation barrier lowers the crossing coefficient exponentially."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $k_0=Ae^{-\\Delta G_0/(RT)}$."
        },
        {
          "body": "Start with $k_0=(0.002\\,\\mathrm{m/s})e^{-4}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "A higher activation barrier lowers the crossing coefficient exponentially.",
        "A higher activation barrier lowers the crossing coefficient exponentially."
      ],
      "points": 1,
      "source": "L06 PDF 6"
    },
    {
      "id": "L06-direct-flux-ratio",
      "practice": "extra",
      "sectionId": "zero-barrier",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "At zero voltage equal crossing coefficients and common partition apply. If $C_o=90$ and $C_i=30\\,\\mathrm{mol/m^3}$, find $J_{in}/J_{out}$.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Outside concentration",
              "answer": {
                "value": 90,
                "unit": "mol/m3",
                "tolerance": 8.999999999999999e-05,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 90,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Inside concentration",
              "answer": {
                "value": 30,
                "unit": "mol/m3",
                "tolerance": 2.9999999999999997e-05,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 30,
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
                "a": 90,
                "b": 30
              },
              "displayScale": 1
            }
          },
          "tex": "\\frac{J_{in}}{J_{out}}=\\frac{C_o}{C_i}",
          "modelAnswer": [
            "Equal coefficients leave the directional flux ratio set by concentration.",
            "$J_{in}/J_{out}=90/30$",
            "$3$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "Equal coefficients leave the directional flux ratio set by concentration."
            },
            {
              "label": "Ignore units and model assumptions when accepting the numerical result."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Equal coefficients leave the directional flux ratio set by concentration."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\frac{J_{in}}{J_{out}}=\\frac{C_o}{C_i}$."
        },
        {
          "body": "Start with $J_{in}/J_{out}=90/30$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Equal coefficients leave the directional flux ratio set by concentration.",
        "Equal coefficients leave the directional flux ratio set by concentration."
      ],
      "points": 1,
      "source": "L06 PDF 6"
    },
    {
      "id": "L06-direct-inward-rate",
      "practice": "extra",
      "sectionId": "tilted-barrier",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $k_0=10^{-6}\\,\\mathrm{m/s}$, $\\delta=0.3$, $z=1$, $V_m=0.020\\,\\mathrm V$, $F=96485$, $R=8.314$ and $T=293\\,\\mathrm K$. Calculate the inward crossing coefficient.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Baseline coefficient",
              "answer": {
                "value": 1e-06,
                "unit": "m/s",
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
              "label": "Barrier location",
              "answer": {
                "value": 0.3,
                "unit": "",
                "tolerance": 3e-07,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.3,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Voltage",
              "answer": {
                "value": 0.02,
                "unit": "V",
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
          "title": "Inward exponent",
          "answer": {
            "value": -0.5545110389892947,
            "unit": "",
            "tolerance": 0.001663533116967884,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": -0.013999999999999999,
                "b": 0.025247468518422553
              },
              "displayScale": 1
            }
          },
          "tex": "u_{in}=-(1-\\delta)V_m/V_T",
          "modelAnswer": [
            "The inward coefficient decreases at positive voltage.",
            "$u_{in}=-(1-\\delta)V_m/V_T$",
            "$-0.55451104$"
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 5.743530287860968e-07,
            "unit": "m/s",
            "tolerance": 1.7230590863582903e-09,
            "verification": {
              "relation": "exponentialRate",
              "inputs": {
                "base": 1e-06,
                "exponent": -0.5545110389892947
              },
              "displayScale": 1
            }
          },
          "tex": "k_1=k_0e^{-(1-\\delta)zFV_m/(RT)}",
          "modelAnswer": [
            "Positive inside voltage favors outward crossing for positive ions.",
            "$k=(10^{-6})e^{-0.7(96485)(0.020)/(8.314\\times293)}$",
            "$5.7435303\\times10^{-7}\\,\\mathrm{m/s}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "Positive inside voltage favors outward crossing for positive ions."
            },
            {
              "label": "Ignore units and model assumptions when accepting the numerical result."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Positive inside voltage favors outward crossing for positive ions."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $k_1=k_0e^{-(1-\\delta)zFV_m/(RT)}$."
        },
        {
          "body": "Start with $k=(10^{-6})e^{-0.7(96485)(0.020)/(8.314\\times293)}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "The inward coefficient decreases at positive voltage.",
        "Positive inside voltage favors outward crossing for positive ions.",
        "Positive inside voltage favors outward crossing for positive ions."
      ],
      "points": 1,
      "source": "L06 PDF 7"
    },
    {
      "id": "L06-direct-outward-rate",
      "sectionId": "tilted-barrier",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $k_0=10^{-6}\\,\\mathrm{m/s}$, $\\delta=0.3$, $z=1$, $V_m=0.020\\,\\mathrm V$, $F=96485$, $R=8.314$ and $T=293\\,\\mathrm K$. Calculate the outward crossing coefficient.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Baseline coefficient",
              "answer": {
                "value": 1e-06,
                "unit": "m/s",
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
              "label": "Barrier location",
              "answer": {
                "value": 0.3,
                "unit": "",
                "tolerance": 3e-07,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.3,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Voltage",
              "answer": {
                "value": 0.02,
                "unit": "V",
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
          "title": "Outward exponent",
          "answer": {
            "value": 0.23764758813826917,
            "unit": "",
            "tolerance": 0.0007129427644148075,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 0.006,
                "b": 0.025247468518422553
              },
              "displayScale": 1
            }
          },
          "tex": "u_{out}=\\delta V_m/V_T",
          "modelAnswer": [
            "The outward coefficient increases at positive voltage.",
            "$u_{out}=\\delta V_m/V_T$",
            "$0.23764759$"
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 1.2682621634301293e-06,
            "unit": "m/s",
            "tolerance": 3.804786490290388e-09,
            "verification": {
              "relation": "exponentialRate",
              "inputs": {
                "base": 1e-06,
                "exponent": 0.23764758813826917
              },
              "displayScale": 1
            }
          },
          "tex": "k_2=k_0e^{\\delta zFV_m/(RT)}",
          "modelAnswer": [
            "Positive inside voltage favors outward crossing for positive ions.",
            "$k=(10^{-6})e^{0.3(96485)(0.020)/(8.314\\times293)}$",
            "$1.2682622\\times10^{-6}\\,\\mathrm{m/s}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "Positive inside voltage favors outward crossing for positive ions."
            },
            {
              "label": "Ignore units and model assumptions when accepting the numerical result."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Positive inside voltage favors outward crossing for positive ions."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $k_2=k_0e^{\\delta zFV_m/(RT)}$."
        },
        {
          "body": "Start with $k=(10^{-6})e^{0.3(96485)(0.020)/(8.314\\times293)}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "The outward coefficient increases at positive voltage.",
        "Positive inside voltage favors outward crossing for positive ions.",
        "Positive inside voltage favors outward crossing for positive ions."
      ],
      "points": 1,
      "source": "L06 PDF 7"
    },
    {
      "id": "L06-direct-net-current",
      "sectionId": "tilted-barrier",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "A monovalent cation has $J_{out}=3\\times10^{-6}$ and $J_{in}=5\\times10^{-6}\\,\\mathrm{mol/(m^2s)}$. With $F=96485\\,\\mathrm{C/mol}$ find outward current density.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Outward flux",
              "answer": {
                "value": 3e-06,
                "unit": "mol/m2/s",
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
              "label": "Inward flux",
              "answer": {
                "value": 5e-06,
                "unit": "mol/m2/s",
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
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Signed net flux",
          "answer": {
            "value": -2e-06,
            "unit": "mol/m2/s",
            "tolerance": 6e-09,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": 3e-06,
                "b": -5e-06
              },
              "displayScale": 1
            }
          },
          "tex": "J=J_{out}-J_{in}",
          "modelAnswer": [
            "Do not add the magnitudes.",
            "$J=J_{out}-J_{in}$",
            "$-2\\times10^{-6}\\,\\mathrm{mol/(m^2s)}$"
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": -0.19297,
            "unit": "A/m2",
            "tolerance": 0.00057891,
            "verification": {
              "relation": "fluxCurrent",
              "inputs": {
                "flux": -2e-06,
                "z": 1,
                "f": 96485
              },
              "displayScale": 1
            }
          },
          "tex": "j=zF(J_{out}-J_{in})",
          "modelAnswer": [
            "Outward current subtracts inward flux, retaining the ion valence.",
            "$j=(1)(96485)(3-5)10^{-6}$",
            "$-0.19297\\,\\mathrm{A/m^2}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "Outward current subtracts inward flux, retaining the ion valence."
            },
            {
              "label": "Ignore units and model assumptions when accepting the numerical result."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Outward current subtracts inward flux, retaining the ion valence."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $j=zF(J_{out}-J_{in})$."
        },
        {
          "body": "Start with $j=(1)(96485)(3-5)10^{-6}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Do not add the magnitudes.",
        "Outward current subtracts inward flux, retaining the ion valence.",
        "Outward current subtracts inward flux, retaining the ion valence."
      ],
      "points": 1,
      "source": "L06 PDF 7"
    },
    {
      "id": "L06-position-facts",
      "sectionId": "position",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "For positive ions the inner-margin expression supports inward rectification.",
          "answer": true
        },
        {
          "text": "A central barrier must give a perfectly straight current–voltage relation.",
          "answer": false,
          "correction": "Central location removes one asymmetry but the exponential relation can remain nonlinear."
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
        "For positive ions the inner-margin expression supports inward rectification.",
        "Central location removes one asymmetry but the exponential relation can remain nonlinear."
      ],
      "points": 1,
      "source": "L06 PDF 8"
    },
    {
      "id": "L06-multiple-facts",
      "sectionId": "multiple",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "Binding wells represent favorable energetic locations.",
          "answer": true
        },
        {
          "text": "Four barriers can always be replaced by one without testing their relative heights.",
          "answer": false,
          "correction": "Several comparable rate-limiting barriers require a multiple-barrier description."
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
        "Binding wells represent favorable energetic locations.",
        "Several comparable rate-limiting barriers require a multiple-barrier description."
      ],
      "points": 1,
      "source": "L06 PDF 10"
    },
    {
      "id": "L06-gates-facts",
      "sectionId": "gates",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "The gating barrier and the permeation barrier describe different moving particles.",
          "answer": true
        },
        {
          "text": "Static GHK directly specifies the delay in a channel’s activation state.",
          "answer": false,
          "correction": "Dynamic gating requires a state variable and transition kinetics."
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
        "The gating barrier and the permeation barrier describe different moving particles.",
        "Dynamic gating requires a state variable and transition kinetics."
      ],
      "points": 1,
      "source": "L06 PDF 11"
    },
    {
      "id": "L06-assumptions-facts",
      "sectionId": "assumptions",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "The source assumes Ohmic current through an already open channel.",
          "answer": true
        },
        {
          "text": "Ohmic open pores preclude nonlinear population currents.",
          "answer": false,
          "correction": "Voltage-dependent open fraction can make the population nonlinear."
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
        "The source assumes Ohmic current through an already open channel.",
        "Voltage-dependent open fraction can make the population nonlinear."
      ],
      "points": 1,
      "source": "L06 PDF 12"
    },
    {
      "id": "L06-balance-facts",
      "sectionId": "balance",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "$y$ is a permissive-particle probability, not always whole-channel open probability.",
          "answer": true
        },
        {
          "text": "The loss term is $\\alpha y$.",
          "answer": false,
          "correction": "The loss term is $\\beta y$; the gain term is $\\alpha(1-y)$."
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
        "$y$ is a permissive-particle probability, not always whole-channel open probability.",
        "The loss term is $\\beta y$; the gain term is $\\alpha(1-y)$."
      ],
      "points": 1,
      "source": "L06 PDF 13"
    },
    {
      "id": "L06-direct-derivative",
      "sectionId": "balance",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $\\alpha=30\\,\\mathrm{s^{-1}}$, $\\beta=10\\,\\mathrm{s^{-1}}$ and $y=0.4$. Find $dy/dt$.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Opening rate",
              "answer": {
                "value": 30,
                "unit": "1/s",
                "tolerance": 2.9999999999999997e-05,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 30,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Closing rate",
              "answer": {
                "value": 10,
                "unit": "1/s",
                "tolerance": 9.999999999999999e-06,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 10,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Permissive fraction",
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
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Gain into permissive state",
          "answer": {
            "value": 18,
            "unit": "1/s",
            "tolerance": 0.054,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 30,
                "b": 0.6
              },
              "displayScale": 1
            }
          },
          "tex": "gain=\\alpha(1-y)",
          "modelAnswer": [
            "Only non-permissive particles contribute to the gain.",
            "$gain=\\alpha(1-y)$",
            "$18\\,\\mathrm{s^{-1}}$"
          ]
        },
        {
          "title": "Loss from permissive state",
          "answer": {
            "value": 4,
            "unit": "1/s",
            "tolerance": 0.012,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 10,
                "b": 0.4
              },
              "displayScale": 1
            }
          },
          "tex": "loss=\\beta y",
          "modelAnswer": [
            "Subtract loss from gain in the final balance.",
            "$loss=\\beta y$",
            "$4\\,\\mathrm{s^{-1}}$"
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 14,
            "unit": "1/s",
            "tolerance": 0.042,
            "verification": {
              "relation": "gateDerivative",
              "inputs": {
                "alpha": 30,
                "beta": 10,
                "y": 0.4
              },
              "displayScale": 1
            }
          },
          "tex": "\\frac{dy}{dt}=\\alpha(1-y)-\\beta y",
          "modelAnswer": [
            "Gain from non-permissive particles competes with loss from permissive particles.",
            "$dy/dt=30(1-0.4)-10(0.4)$",
            "$14\\,\\mathrm{s^{-1}}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "Gain from non-permissive particles competes with loss from permissive particles."
            },
            {
              "label": "Ignore units and model assumptions when accepting the numerical result."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Gain from non-permissive particles competes with loss from permissive particles."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\frac{dy}{dt}=\\alpha(1-y)-\\beta y$."
        },
        {
          "body": "Start with $dy/dt=30(1-0.4)-10(0.4)$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Only non-permissive particles contribute to the gain.",
        "Subtract loss from gain in the final balance.",
        "Gain from non-permissive particles competes with loss from permissive particles.",
        "Gain from non-permissive particles competes with loss from permissive particles."
      ],
      "points": 1,
      "source": "L06 PDF 13"
    },
    {
      "id": "L06-polarity-facts",
      "sectionId": "polarity",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "Depolarization must cross zero voltage.",
          "answer": false,
          "correction": "Depolarization is a change toward a more positive value, including less negative values."
        },
        {
          "text": "The direction of gating response depends on the channel type.",
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
        "Depolarization is a change toward a more positive value, including less negative values.",
        "The direction of gating response depends on the channel type."
      ],
      "points": 1,
      "source": "L06 PDF 14"
    },
    {
      "id": "L06-direct-alpha",
      "practice": "extra",
      "sectionId": "steady",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use baseline $25\\,\\mathrm{s^{-1}}$, $\\delta=0.4$, $z=1$, $V_m=0.015\\,\\mathrm V$, $F=96485$, $R=8.314$, $T=293\\,\\mathrm K$. Calculate $alpha$.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Baseline rate",
              "answer": {
                "value": 25,
                "unit": "1/s",
                "tolerance": 2.4999999999999998e-05,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 25,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Location",
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
              "label": "Voltage",
              "answer": {
                "value": 0.015,
                "unit": "V",
                "tolerance": 1.5e-08,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.015,
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
          "title": "Opening exponent",
          "answer": {
            "value": 0.23764758813826917,
            "unit": "",
            "tolerance": 0.0007129427644148075,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 0.006,
                "b": 0.025247468518422553
              },
              "displayScale": 1
            }
          },
          "tex": "u_\\alpha=\\delta V_m/V_T",
          "modelAnswer": [
            "Use the source positive gating charge.",
            "$u_\\alpha=\\delta V_m/V_T$",
            "$0.23764759$"
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 31.706554085753236,
            "unit": "1/s",
            "tolerance": 0.09511966225725971,
            "verification": {
              "relation": "exponentialRate",
              "inputs": {
                "base": 25,
                "exponent": 0.23764758813826917
              },
              "displayScale": 1
            }
          },
          "tex": "\\alpha=\\alpha_0e^{\\delta zFV_m/(RT)}",
          "modelAnswer": [
            "The source depolarization-activated particle gains opening and loses closing rate as voltage rises.",
            "$alpha=25e^{0.4(96485)(0.015)/(8.314\\times293)}$",
            "$31.706554\\,\\mathrm{s^{-1}}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "The source depolarization-activated particle gains opening and loses closing rate as voltage rises."
            },
            {
              "label": "Ignore units and model assumptions when accepting the numerical result."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The source depolarization-activated particle gains opening and loses closing rate as voltage rises."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\alpha=\\alpha_0e^{\\delta zFV_m/(RT)}$."
        },
        {
          "body": "Start with $alpha=25e^{0.4(96485)(0.015)/(8.314\\times293)}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Use the source positive gating charge.",
        "The source depolarization-activated particle gains opening and loses closing rate as voltage rises.",
        "The source depolarization-activated particle gains opening and loses closing rate as voltage rises."
      ],
      "points": 1,
      "source": "L06 PDF 15"
    },
    {
      "id": "L06-direct-beta",
      "practice": "extra",
      "sectionId": "steady",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use baseline $40\\,\\mathrm{s^{-1}}$, $\\delta=0.4$, $z=1$, $V_m=0.015\\,\\mathrm V$, $F=96485$, $R=8.314$, $T=293\\,\\mathrm K$. Calculate $beta$.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Baseline rate",
              "answer": {
                "value": 40,
                "unit": "1/s",
                "tolerance": 3.9999999999999996e-05,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 40,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Location",
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
              "label": "Voltage",
              "answer": {
                "value": 0.015,
                "unit": "V",
                "tolerance": 1.5e-08,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.015,
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
          "title": "Closing exponent",
          "answer": {
            "value": -0.3564713822074037,
            "unit": "",
            "tolerance": 0.0010694141466222112,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": -0.009,
                "b": 0.025247468518422553
              },
              "displayScale": 1
            }
          },
          "tex": "u_\\beta=-(1-\\delta)V_m/V_T",
          "modelAnswer": [
            "Closing uses the complementary location and negative sign.",
            "$u_\\beta=-(1-\\delta)V_m/V_T$",
            "$-0.35647138$"
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 28.005700308639867,
            "unit": "1/s",
            "tolerance": 0.0840171009259196,
            "verification": {
              "relation": "exponentialRate",
              "inputs": {
                "base": 40,
                "exponent": -0.3564713822074037
              },
              "displayScale": 1
            }
          },
          "tex": "\\beta=\\beta_0e^{-(1-\\delta)zFV_m/(RT)}",
          "modelAnswer": [
            "The source depolarization-activated particle gains opening and loses closing rate as voltage rises.",
            "$beta=40e^{-0.6(96485)(0.015)/(8.314\\times293)}$",
            "$28.0057\\,\\mathrm{s^{-1}}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "The source depolarization-activated particle gains opening and loses closing rate as voltage rises."
            },
            {
              "label": "Ignore units and model assumptions when accepting the numerical result."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The source depolarization-activated particle gains opening and loses closing rate as voltage rises."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\beta=\\beta_0e^{-(1-\\delta)zFV_m/(RT)}$."
        },
        {
          "body": "Start with $beta=40e^{-0.6(96485)(0.015)/(8.314\\times293)}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Closing uses the complementary location and negative sign.",
        "The source depolarization-activated particle gains opening and loses closing rate as voltage rises.",
        "The source depolarization-activated particle gains opening and loses closing rate as voltage rises."
      ],
      "points": 1,
      "source": "L06 PDF 15"
    },
    {
      "id": "L06-direct-steady",
      "sectionId": "steady",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "At fixed voltage $\\alpha=60$ and $\\beta=20\\,\\mathrm{s^{-1}}$. Find steady permissive fraction.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Opening rate",
              "answer": {
                "value": 60,
                "unit": "1/s",
                "tolerance": 5.9999999999999995e-05,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 60,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Closing rate",
              "answer": {
                "value": 20,
                "unit": "1/s",
                "tolerance": 1.9999999999999998e-05,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 20,
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
          "title": "Total transition rate",
          "answer": {
            "value": 80,
            "unit": "1/s",
            "tolerance": 0.24,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": 60,
                "b": 20
              },
              "displayScale": 1
            }
          },
          "tex": "s=\\alpha+\\beta",
          "modelAnswer": [
            "Both rates contribute to relaxation.",
            "$s=\\alpha+\\beta$",
            "$80\\,\\mathrm{s^{-1}}$"
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 0.75,
            "unit": "",
            "tolerance": 0.0022500000000000003,
            "verification": {
              "relation": "gateSteady",
              "inputs": {
                "alpha": 60,
                "beta": 20
              },
              "displayScale": 1
            }
          },
          "tex": "y_\\infty=\\frac{\\alpha}{\\alpha+\\beta}",
          "modelAnswer": [
            "Steady activation balances opening and closing transitions.",
            "$y_\\infty=60/(60+20)$",
            "$0.75$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "Steady activation balances opening and closing transitions."
            },
            {
              "label": "Ignore units and model assumptions when accepting the numerical result."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Steady activation balances opening and closing transitions."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $y_\\infty=\\frac{\\alpha}{\\alpha+\\beta}$."
        },
        {
          "body": "Start with $y_\\infty=60/(60+20)$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Both rates contribute to relaxation.",
        "Steady activation balances opening and closing transitions.",
        "Steady activation balances opening and closing transitions."
      ],
      "points": 1,
      "source": "L06 PDF 15"
    },
    {
      "id": "L06-direct-logistic",
      "sectionId": "steady",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $\\alpha_0=30$, $\\beta_0=50\\,\\mathrm{s^{-1}}$, $z=1$, $V_m=0.020\\,\\mathrm V$, $F=96485$, $R=8.314$, $T=293\\,\\mathrm K$. Find steady activation.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Baseline opening",
              "answer": {
                "value": 30,
                "unit": "1/s",
                "tolerance": 2.9999999999999997e-05,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 30,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Baseline closing",
              "answer": {
                "value": 50,
                "unit": "1/s",
                "tolerance": 4.9999999999999996e-05,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 50,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Voltage",
              "answer": {
                "value": 0.02,
                "unit": "V",
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
          "title": "Voltage Boltzmann factor",
          "answer": {
            "value": 0.4528661702188664,
            "unit": "",
            "tolerance": 0.0013585985106565992,
            "verification": {
              "relation": "exponentialRate",
              "inputs": {
                "base": 1,
                "exponent": -0.7921586271275639
              },
              "displayScale": 1
            }
          },
          "tex": "b=e^{-V_m/V_T}",
          "modelAnswer": [
            "The factor decreases at positive voltage.",
            "$b=e^{-V_m/V_T}$",
            "$0.45286617$"
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 0.5698729971305603,
            "unit": "",
            "tolerance": 0.0017096189913916808,
            "verification": {
              "relation": "gateSteady",
              "inputs": {
                "alpha": 66.24473624404591,
                "beta": 50
              },
              "displayScale": 1
            }
          },
          "tex": "y_\\infty=\\frac{1}{1+(\\beta_0/\\alpha_0)e^{-zFV_m/(RT)}}",
          "modelAnswer": [
            "Barrier location cancels from the steady ratio when baseline rates stay fixed.",
            "$y_\\infty=1/[1+(50/30)e^{-96485(0.020)/(8.314\\times293)}]$",
            "$0.569873$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "Barrier location cancels from the steady ratio when baseline rates stay fixed."
            },
            {
              "label": "Ignore units and model assumptions when accepting the numerical result."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Barrier location cancels from the steady ratio when baseline rates stay fixed."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $y_\\infty=\\frac{1}{1+(\\beta_0/\\alpha_0)e^{-zFV_m/(RT)}}$."
        },
        {
          "body": "Start with $y_\\infty=1/[1+(50/30)e^{-96485(0.020)/(8.314\\times293)}]$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "The factor decreases at positive voltage.",
        "Barrier location cancels from the steady ratio when baseline rates stay fixed.",
        "Barrier location cancels from the steady ratio when baseline rates stay fixed."
      ],
      "points": 1,
      "source": "L06 PDF 15"
    },
    {
      "id": "L06-activation-facts",
      "sectionId": "activation",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "A falling activation curve can describe hyperpolarization activation.",
          "answer": true
        },
        {
          "text": "Activation direction alone determines whether ionic current is inward.",
          "answer": false,
          "correction": "Current direction also depends on driving force and ion charge."
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
        "A falling activation curve can describe hyperpolarization activation.",
        "Current direction also depends on driving force and ion charge."
      ],
      "points": 1,
      "source": "L06 PDF 16"
    },
    {
      "id": "L06-kinetics-facts",
      "sectionId": "kinetics",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "Finite-rate activation is continuous across the ideal voltage step.",
          "answer": true
        },
        {
          "text": "Its continuity forces the ionic current itself to stay continuous.",
          "answer": false,
          "correction": "The driving force can jump while activation stays continuous."
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
        "Finite-rate activation is continuous across the ideal voltage step.",
        "The driving force can jump while activation stays continuous."
      ],
      "points": 1,
      "source": "L06 PDF 17"
    },
    {
      "id": "L06-direct-tau",
      "practice": "extra",
      "sectionId": "kinetics",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "With $\\alpha=45$ and $\\beta=15\\,\\mathrm{s^{-1}}$, find the time constant in seconds.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Opening rate",
              "answer": {
                "value": 45,
                "unit": "1/s",
                "tolerance": 4.4999999999999996e-05,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 45,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Closing rate",
              "answer": {
                "value": 15,
                "unit": "1/s",
                "tolerance": 1.4999999999999999e-05,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 15,
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
          "title": "Rate sum",
          "answer": {
            "value": 60,
            "unit": "1/s",
            "tolerance": 0.18,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": 45,
                "b": 15
              },
              "displayScale": 1
            }
          },
          "tex": "s=\\alpha+\\beta",
          "modelAnswer": [
            "The time constant is the reciprocal, not the sum itself.",
            "$s=\\alpha+\\beta$",
            "$60\\,\\mathrm{s^{-1}}$"
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 0.016666666666666666,
            "unit": "s",
            "tolerance": 5e-05,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 1,
                "b": 60
              },
              "displayScale": 1
            }
          },
          "tex": "\\tau=\\frac{1}{\\alpha+\\beta}",
          "modelAnswer": [
            "A larger rate sum gives a faster relaxation.",
            "$\\tau=1/(45+15)$",
            "$0.016666667\\,\\mathrm{s}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "A larger rate sum gives a faster relaxation."
            },
            {
              "label": "Ignore units and model assumptions when accepting the numerical result."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "A larger rate sum gives a faster relaxation."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\tau=\\frac{1}{\\alpha+\\beta}$."
        },
        {
          "body": "Start with $\\tau=1/(45+15)$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "The time constant is the reciprocal, not the sum itself.",
        "A larger rate sum gives a faster relaxation.",
        "A larger rate sum gives a faster relaxation."
      ],
      "points": 1,
      "source": "L06 PDF 17"
    },
    {
      "id": "L06-direct-relax",
      "sectionId": "kinetics",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $y_0=0.2$, $y_\\infty=0.8$, $\\tau=0.020\\,\\mathrm s$ and $t=0.030\\,\\mathrm s$. Find $y(t)$.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Initial fraction",
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
            },
            {
              "label": "Steady fraction",
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
            },
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
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Time in relaxation units",
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
          "tex": "t/\\tau=0.030/0.020",
          "modelAnswer": [
            "The exponent is dimensionless.",
            "$t/\\tau=0.030/0.020$",
            "$1.5$"
          ]
        },
        {
          "title": "Remaining initial displacement",
          "answer": {
            "value": 0.22313016014842982,
            "unit": "",
            "tolerance": 0.0006693904804452894,
            "verification": {
              "relation": "exponentialRate",
              "inputs": {
                "base": 1,
                "exponent": -1.5
              },
              "displayScale": 1
            }
          },
          "tex": "f=e^{-1.5}",
          "modelAnswer": [
            "This is the remaining displacement fraction, not activation itself.",
            "$f=e^{-1.5}$",
            "$0.22313016$"
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 0.6661219039109422,
            "unit": "",
            "tolerance": 0.0019983657117328265,
            "verification": {
              "relation": "gateRelax",
              "inputs": {
                "y0": 0.2,
                "steady": 0.8,
                "tau": 0.02,
                "time": 0.03
              },
              "displayScale": 1
            }
          },
          "tex": "y(t)=y_\\infty+(y_0-y_\\infty)e^{-t/\\tau}",
          "modelAnswer": [
            "Activation moves continuously from its initial value toward the new steady value.",
            "$y=0.8+(0.2-0.8)e^{-0.030/0.020}$",
            "$0.6661219$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "Activation moves continuously from its initial value toward the new steady value."
            },
            {
              "label": "Ignore units and model assumptions when accepting the numerical result."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Activation moves continuously from its initial value toward the new steady value."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $y(t)=y_\\infty+(y_0-y_\\infty)e^{-t/\\tau}$."
        },
        {
          "body": "Start with $y=0.8+(0.2-0.8)e^{-0.030/0.020}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "The exponent is dimensionless.",
        "This is the remaining displacement fraction, not activation itself.",
        "Activation moves continuously from its initial value toward the new steady value.",
        "Activation moves continuously from its initial value toward the new steady value."
      ],
      "points": 1,
      "source": "L06 PDF 17"
    },
    {
      "id": "L06-particles-facts",
      "sectionId": "particles",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "For independent all-required particles, $Y=y^P$.",
          "answer": true
        },
        {
          "text": "Adding particle probabilities gives the probability that all are permissive.",
          "answer": false,
          "correction": "Multiply the probabilities when independent particles must all be permissive."
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
        "For independent all-required particles, $Y=y^P$.",
        "Multiply the probabilities when independent particles must all be permissive."
      ],
      "points": 1,
      "source": "L06 PDF 17"
    },
    {
      "id": "L06-direct-power",
      "sectionId": "particles",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Three independent particles must all be permissive. Each has $y=0.6$. Find whole-channel open probability.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Particle probability",
              "answer": {
                "value": 0.6,
                "unit": "",
                "tolerance": 6e-07,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.6,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Required particle count",
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
            "value": 0.21599999999999997,
            "unit": "",
            "tolerance": 0.0006479999999999999,
            "verification": {
              "relation": "gatePower",
              "inputs": {
                "y": 0.6,
                "count": 3
              },
              "displayScale": 1
            }
          },
          "tex": "Y=y^P",
          "modelAnswer": [
            "All-required independent particle probabilities multiply.",
            "$Y=0.6^3$",
            "$0.216$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "All-required independent particle probabilities multiply."
            },
            {
              "label": "Ignore units and model assumptions when accepting the numerical result."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "All-required independent particle probabilities multiply."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $Y=y^P$."
        },
        {
          "body": "Start with $Y=0.6^3$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "All-required independent particle probabilities multiply.",
        "All-required independent particle probabilities multiply."
      ],
      "points": 1,
      "source": "L06 PDF 17"
    },
    {
      "id": "L06-summary-facts",
      "sectionId": "summary",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "Static permeation and dynamic gating may contribute to the same channel.",
          "answer": true
        },
        {
          "text": "A curved current–voltage plot alone uniquely identifies gate dynamics.",
          "answer": false,
          "correction": "Concentration gradients and barrier asymmetry can produce a static curved relation."
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
        "Static permeation and dynamic gating may contribute to the same channel.",
        "Concentration gradients and barrier asymmetry can produce a static curved relation."
      ],
      "points": 1,
      "source": "L06 PDF 18"
    },
    {
      "id": "L06-group-phenomena",
      "practice": "extra",
      "sectionId": "model-audit",
      "difficulty": "easy",
      "type": "written",
      "prompt": "Classify: (a) asymmetric current with fixed permeability and unequal concentrations; (b) delay after a voltage step; (c) an outer-margin rate-limiting barrier; (d) rate coefficients set by barrier height; (e) a sigmoid activation curve; (f) a nonlinear curve with no dynamic state. Allow more than one suitable static model.",
      "hints": [
        {
          "body": "Identify which observation concerns permeation, energetic position or changing channel state."
        },
        {
          "body": "Separate reversal, conductance and activation history; check whether one model can establish the requested inference on its own."
        }
      ],
      "markScheme": [
        {
          "text": "(a) Constant field is sufficient under its assumptions; barrier permeation can also be relevant."
        },
        {
          "text": "(b) Dynamic gate model."
        },
        {
          "text": "(c) Energy-barrier model."
        },
        {
          "text": "(d) Energy barriers, including those describing gating particles."
        },
        {
          "text": "(e) Gate model when the curve denotes permissive activation."
        },
        {
          "text": "(f) Constant field or energy barrier; nonlinearity alone does not prove dynamic gating."
        }
      ],
      "modelAnswer": [
        "(a) Constant field is sufficient under its assumptions; barrier permeation can also be relevant.",
        "(b) Dynamic gate model.",
        "(c) Energy-barrier model.",
        "(d) Energy barriers, including those describing gating particles.",
        "(e) Gate model when the curve denotes permissive activation.",
        "(f) Constant field or energy barrier; nonlinearity alone does not prove dynamic gating."
      ],
      "points": 1,
      "source": "L06 PDF 19–21"
    },
    {
      "id": "L06-group-features",
      "practice": "extra",
      "sectionId": "model-audit",
      "difficulty": "easy",
      "type": "written",
      "prompt": "Compare all three model families for voltage dependence, explicit time dependence, channel opening/closing and direct permeation. Explain the meaning of “indirectly” in the source table.",
      "hints": [
        {
          "body": "Identify which observation concerns permeation, energetic position or changing channel state."
        },
        {
          "body": "Separate reversal, conductance and activation history; check whether one model can establish the requested inference on its own."
        }
      ],
      "markScheme": [
        {
          "text": "All three can depend on voltage."
        },
        {
          "text": "Explicit gate-state time dependence and opening/closing occur in the gate model."
        },
        {
          "text": "Constant-field and permeation-barrier models directly describe ion passage."
        },
        {
          "text": "The gate model governs availability, with permeation supplied separately."
        }
      ],
      "modelAnswer": [
        "All three can depend on voltage.",
        "Explicit gate-state time dependence and opening/closing occur in the gate model.",
        "Constant-field and permeation-barrier models directly describe ion passage.",
        "The gate model governs availability, with permeation supplied separately."
      ],
      "points": 1,
      "source": "L06 PDF 19–21"
    },
    {
      "id": "L06-model-sort",
      "sectionId": "model-audit",
      "difficulty": "easy",
      "type": "classify",
      "prompt": "Choose the most direct model for each rephrased group-work observation. “Either static model” accepts constant-field or energy-barrier permeation, not dynamic gating inferred from curvature alone.",
      "categories": [
        "Gate model",
        "Energy barrier",
        "Constant field",
        "Either static model"
      ],
      "items": [
        {
          "text": "Unequal concentrations produce asymmetric current while permeability stays fixed.",
          "answer": "Constant field",
          "explanation": "The concentration-gradient mechanism is sufficient in GHK."
        },
        {
          "text": "Conducting-state probability changes with voltage and time.",
          "answer": "Gate model",
          "explanation": "A dynamic state variable is required."
        },
        {
          "text": "Rectification follows a barrier displaced toward one membrane margin.",
          "answer": "Energy barrier",
          "explanation": "Barrier location changes directional voltage dependence."
        },
        {
          "text": "Outward current develops with a delay after a depolarizing step.",
          "answer": "Gate model",
          "explanation": "Static permeation alone lacks an evolving activation state."
        },
        {
          "text": "A fixed uniform electric field and electrochemical gradient set ion flux.",
          "answer": "Constant field",
          "explanation": "These are the constant-field permeation assumptions."
        },
        {
          "text": "Permeating-ion crossing depends exponentially on activation-barrier height.",
          "answer": "Energy barrier",
          "explanation": "The barrier describes the ion-crossing process."
        },
        {
          "text": "Sodium current rises rapidly and then declines during maintained depolarization.",
          "answer": "Gate model",
          "explanation": "Changing channel states are needed for the time course; detailed channel-specific equations follow later."
        },
        {
          "text": "Concentrations change the current curve while channel number remains fixed.",
          "answer": "Constant field",
          "explanation": "Changing electrochemical permeation can change current without changing availability."
        },
        {
          "text": "A spike uses regenerative sodium activation and delayed potassium activation.",
          "answer": "Gate model",
          "explanation": "The source group work associates these dynamic conductances with gates; no channel-specific power is inferred here."
        },
        {
          "text": "A curved current relation is obtained with no explicit gating state variable.",
          "answer": "Either static model",
          "explanation": "Both constant-field and barrier descriptions can give static nonlinearity."
        }
      ],
      "hints": [
        {
          "body": "Ask whether the observation concerns a changing channel state or ion passage through available pores."
        },
        {
          "body": "For static passage, distinguish uniform-field concentration effects from a localized activation barrier. A curved relation alone is nonunique."
        }
      ],
      "modelAnswer": [
        "Concentration-gradient effects with fixed permeability are a direct constant-field application.",
        "Delayed, activating or declining channel-state behavior needs dynamic gates.",
        "Localized crossing energies and their positions motivate a barrier model.",
        "Static nonlinearity without a state variable can arise from either permeation model."
      ],
      "source": "L06 PDF19 task1; PDF20 answers; PDF21 comparison",
      "points": 1
    },
    {
      "id": "L06-clamp-facts",
      "sectionId": "clamp",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "A capacitive transient must be separated before interpreting sustained ionic current.",
          "answer": true
        },
        {
          "text": "A rapid jump is always pure leak regardless of initial activation.",
          "answer": false,
          "correction": "Nonzero initial activation and a changed driving force can produce a rapid gated-current jump."
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
        "A capacitive transient must be separated before interpreting sustained ionic current.",
        "Nonzero initial activation and a changed driving force can produce a rapid gated-current jump."
      ],
      "points": 1,
      "source": "Exercise6 p1; solving instructions"
    },
    {
      "id": "L06-direct-gated-current",
      "sectionId": "clamp",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "At fixed voltage $I_{y,max}=-4\\times10^{-9}\\,\\mathrm A$ and $y=0.3$. Find gated current.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Fully activated current",
              "answer": {
                "value": -4e-09,
                "unit": "A",
                "tolerance": 4e-15,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -4e-09,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Activation",
              "answer": {
                "value": 0.3,
                "unit": "",
                "tolerance": 3e-07,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.3,
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
              "relation": "product",
              "inputs": {
                "a": -4e-09,
                "b": 0.3
              },
              "displayScale": 1
            }
          },
          "tex": "I_y=I_{y,max}y",
          "modelAnswer": [
            "At fixed voltage the specified one-variable current scales with activation.",
            "$I_y=(-4\\times10^{-9})(0.3)$",
            "$-1.2\\times10^{-9}\\,\\mathrm{A}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "At fixed voltage the specified one-variable current scales with activation."
            },
            {
              "label": "Ignore units and model assumptions when accepting the numerical result."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "At fixed voltage the specified one-variable current scales with activation."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $I_y=I_{y,max}y$."
        },
        {
          "body": "Start with $I_y=(-4\\times10^{-9})(0.3)$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "At fixed voltage the specified one-variable current scales with activation.",
        "At fixed voltage the specified one-variable current scales with activation."
      ],
      "points": 1,
      "source": "Exercise6 p1; solving instructions"
    },
    {
      "id": "L06-direct-max-current",
      "sectionId": "clamp",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Total current is $-3.8\\times10^{-9}\\,\\mathrm A$, leak is $-0.8\\times10^{-9}\\,\\mathrm A$ and $y=0.6$. Find fully activated current.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Total current",
              "answer": {
                "value": -3.8e-09,
                "unit": "A",
                "tolerance": 3.8e-15,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -3.8e-09,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Leak current",
              "answer": {
                "value": -8e-10,
                "unit": "A",
                "tolerance": 8e-16,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -8e-10,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Activation",
              "answer": {
                "value": 0.6,
                "unit": "",
                "tolerance": 6e-07,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.6,
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
          "title": "Current after subtracting leak",
          "answer": {
            "value": -3e-09,
            "unit": "A",
            "tolerance": 9e-12,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": -3.8e-09,
                "b": 8e-10
              },
              "displayScale": 1
            }
          },
          "tex": "I_y=I_{total}-I_L",
          "modelAnswer": [
            "Subtract the signed leak before dividing by activation.",
            "$I_y=I_{total}-I_L$",
            "$-3\\times10^{-9}\\,\\mathrm{A}$"
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": -5e-09,
            "unit": "A",
            "tolerance": 1.5e-11,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": -3e-09,
                "b": 0.6
              },
              "displayScale": 1
            }
          },
          "tex": "I_{y,max}=\\frac{I_{total}-I_L}{y}",
          "modelAnswer": [
            "Subtract the leak before dividing by the known activation.",
            "$I_{y,max}=[-3.8-(-0.8)]10^{-9}/0.6$",
            "$-5\\times10^{-9}\\,\\mathrm{A}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "Subtract the leak before dividing by the known activation."
            },
            {
              "label": "Ignore units and model assumptions when accepting the numerical result."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Subtract the leak before dividing by the known activation."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $I_{y,max}=\\frac{I_{total}-I_L}{y}$."
        },
        {
          "body": "Start with $I_{y,max}=[-3.8-(-0.8)]10^{-9}/0.6$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Subtract the signed leak before dividing by activation.",
        "Subtract the leak before dividing by the known activation.",
        "Subtract the leak before dividing by the known activation."
      ],
      "points": 1,
      "source": "Exercise6 p1; solving instructions"
    },
    {
      "id": "L06-chord-facts",
      "sectionId": "chord",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "Chord conductance uses reversal as reference.",
          "answer": true
        },
        {
          "text": "Chord conductance is always equal to the local tangent slope.",
          "answer": false,
          "correction": "The chord joins the reversal point to the observed point; the tangent is a derivative."
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
        "Chord conductance uses reversal as reference.",
        "The chord joins the reversal point to the observed point; the tangent is a derivative."
      ],
      "points": 1,
      "source": "Exercise6 p2; solving instructions"
    },
    {
      "id": "L06-direct-chord",
      "sectionId": "chord",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $I=-1.5\\times10^{-9}\\,\\mathrm A$, $V_m=-0.030\\,\\mathrm V$ and $E_{rev}=0.020\\,\\mathrm V$. Find chord conductance.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Current",
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
              "label": "Membrane voltage",
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
            },
            {
              "label": "Reversal",
              "answer": {
                "value": 0.02,
                "unit": "V",
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
          "title": "Driving force",
          "answer": {
            "value": -0.05,
            "unit": "V",
            "tolerance": 0.00015000000000000001,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": -0.03,
                "b": -0.02
              },
              "displayScale": 1
            }
          },
          "tex": "V_m-E_{rev}=-0.030-0.020",
          "modelAnswer": [
            "Use reversal, not zero, as reference.",
            "$V_m-E_{rev}=-0.030-0.020$",
            "$-0.05\\,\\mathrm{V}$"
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 3e-08,
            "unit": "S",
            "tolerance": 9e-11,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": -1.5e-09,
                "b": -0.05
              },
              "displayScale": 1
            }
          },
          "tex": "G_{chord}=\\frac{I}{V_m-E_{rev}}",
          "modelAnswer": [
            "The chord uses reversal rather than zero as its voltage reference.",
            "$G=(-1.5\\times10^{-9})/[-0.030-0.020]$",
            "$3\\times10^{-8}\\,\\mathrm{S}$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "The chord uses reversal rather than zero as its voltage reference."
            },
            {
              "label": "Ignore units and model assumptions when accepting the numerical result."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The chord uses reversal rather than zero as its voltage reference."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $G_{chord}=\\frac{I}{V_m-E_{rev}}$."
        },
        {
          "body": "Start with $G=(-1.5\\times10^{-9})/[-0.030-0.020]$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Use reversal, not zero, as reference.",
        "The chord uses reversal rather than zero as its voltage reference.",
        "The chord uses reversal rather than zero as its voltage reference."
      ],
      "points": 1,
      "source": "Exercise6 p2; solving instructions"
    },
    {
      "id": "L06-direct-inverse-nernst",
      "sectionId": "chord",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "A selective monovalent cation reverses at $0.040\\,\\mathrm V$ at 20°C. With the $0.058\\,\\mathrm V$ shortcut find $C_i/C_o$.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Reversal voltage",
              "answer": {
                "value": 0.04,
                "unit": "V",
                "tolerance": 4e-08,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.04,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Rounded shortcut",
              "answer": {
                "value": 0.058,
                "unit": "V",
                "tolerance": 5.8e-08,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.058,
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
          "title": "Base-ten exponent",
          "answer": {
            "value": -0.689655172413793,
            "unit": "",
            "tolerance": 0.0020689655172413794,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": -0.04,
                "b": 0.058
              },
              "displayScale": 1
            }
          },
          "tex": "e=-E_{rev}/(0.058\\,\\mathrm V)",
          "modelAnswer": [
            "Positive cation reversal gives a negative exponent for inside/outside.",
            "$e=-E_{rev}/(0.058\\,\\mathrm V)$",
            "$-0.68965517$"
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 0.2043359717856942,
            "unit": "",
            "tolerance": 0.0006130079153570826,
            "verification": {
              "relation": "nernstRatio",
              "inputs": {
                "delta": -0.04,
                "shortcut": 0.058
              },
              "displayScale": 1
            }
          },
          "tex": "\\frac{C_i}{C_o}=10^{-zE_{rev}/(58\\,\\mathrm{mV})}",
          "modelAnswer": [
            "A positive selective cation reversal requires a higher outside concentration.",
            "$C_i/C_o=10^{-0.040/0.058}$",
            "$0.20433597$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "A positive selective cation reversal requires a higher outside concentration."
            },
            {
              "label": "Ignore units and model assumptions when accepting the numerical result."
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "A positive selective cation reversal requires a higher outside concentration."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\frac{C_i}{C_o}=10^{-zE_{rev}/(58\\,\\mathrm{mV})}$."
        },
        {
          "body": "Start with $C_i/C_o=10^{-0.040/0.058}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Positive cation reversal gives a negative exponent for inside/outside.",
        "A positive selective cation reversal requires a higher outside concentration.",
        "A positive selective cation reversal requires a higher outside concentration."
      ],
      "points": 1,
      "source": "Exercise6 p2; solving instructions"
    },
    {
      "id": "L06-rectification-reason",
      "sectionId": "rectification",
      "difficulty": "medium",
      "type": "written",
      "prompt": "A curve carries more inward current at one test voltage than outward current at another. Explain why that alone is insufficient to establish rectification.",
      "hints": [
        {
          "body": "Identify which observation concerns permeation, energetic position or changing channel state."
        },
        {
          "body": "Separate reversal, conductance and activation history; check whether one model can establish the requested inference on its own."
        }
      ],
      "markScheme": [
        {
          "text": "Compare driving forces relative to reversal."
        },
        {
          "text": "Use chord conductances or comparable opposite driving forces."
        },
        {
          "text": "Different voltage distances from reversal can produce unequal currents even in an Ohmic channel."
        }
      ],
      "modelAnswer": [
        "Compare driving forces relative to reversal.",
        "Use chord conductances or comparable opposite driving forces.",
        "Different voltage distances from reversal can produce unequal currents even in an Ohmic channel."
      ],
      "points": 1,
      "source": "L06 PDF 2"
    },
    {
      "id": "L06-constant-field-reason",
      "sectionId": "constant-field",
      "difficulty": "medium",
      "type": "written",
      "prompt": "A positive ion has negative reversal but shows stronger inward than outward conductance. Audit a fixed-permeability GHK explanation.",
      "hints": [
        {
          "body": "Identify which observation concerns permeation, energetic position or changing channel state."
        },
        {
          "body": "Separate reversal, conductance and activation history; check whether one model can establish the requested inference on its own."
        }
      ],
      "markScheme": [
        {
          "text": "Negative reversal indicates higher inside concentration for the selective positive ion."
        },
        {
          "text": "The source GHK mechanism then predicts outward rectification."
        },
        {
          "text": "Observed inward rectification is anomalous for those assumptions; consider barrier or gate mechanisms."
        }
      ],
      "modelAnswer": [
        "Negative reversal indicates higher inside concentration for the selective positive ion.",
        "The source GHK mechanism then predicts outward rectification.",
        "Observed inward rectification is anomalous for those assumptions; consider barrier or gate mechanisms."
      ],
      "points": 1,
      "source": "L06 PDF 3"
    },
    {
      "id": "L06-barrier-reason",
      "sectionId": "barrier",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain when one energy barrier is a useful reduction and when the reduction fails.",
      "hints": [
        {
          "body": "Identify which observation concerns permeation, energetic position or changing channel state."
        },
        {
          "body": "Separate reversal, conductance and activation history; check whether one model can establish the requested inference on its own."
        }
      ],
      "markScheme": [
        {
          "text": "One rate-limiting barrier must dominate."
        },
        {
          "text": "Ion passage rates depend exponentially on activation energy."
        },
        {
          "text": "Several comparable barriers and binding interactions require more states/barriers."
        }
      ],
      "modelAnswer": [
        "One rate-limiting barrier must dominate.",
        "Ion passage rates depend exponentially on activation energy.",
        "Several comparable barriers and binding interactions require more states/barriers."
      ],
      "points": 1,
      "source": "L06 PDF 4"
    },
    {
      "id": "L06-independence-reason",
      "sectionId": "independence",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Concentration increases while flux approaches a plateau. Explain two ways this could challenge independent passage.",
      "hints": [
        {
          "body": "Identify which observation concerns permeation, energetic position or changing channel state."
        },
        {
          "body": "Separate reversal, conductance and activation history; check whether one model can establish the requested inference on its own."
        }
      ],
      "markScheme": [
        {
          "text": "Finite binding sites may saturate."
        },
        {
          "text": "Occupancy can make one ion influence another ion’s flux."
        },
        {
          "text": "A fixed independent flux law predicts proportionality, not saturation; distinguish a changed coefficient from the original assumption."
        }
      ],
      "modelAnswer": [
        "Finite binding sites may saturate.",
        "Occupancy can make one ion influence another ion’s flux.",
        "A fixed independent flux law predicts proportionality, not saturation; distinguish a changed coefficient from the original assumption."
      ],
      "points": 1,
      "source": "L06 PDF 5"
    },
    {
      "id": "L06-zero-barrier-reason",
      "sectionId": "zero-barrier",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain why a symmetric barrier at zero voltage can still carry net ionic current and what equal directional fluxes establish.",
      "hints": [
        {
          "body": "Identify which observation concerns permeation, energetic position or changing channel state."
        },
        {
          "body": "Separate reversal, conductance and activation history; check whether one model can establish the requested inference on its own."
        }
      ],
      "markScheme": [
        {
          "text": "Equal barrier heights give equal coefficients."
        },
        {
          "text": "Unequal concentrations give unequal directional fluxes."
        },
        {
          "text": "Equal opposing fluxes mean zero net flux, not absence of microscopic passage."
        }
      ],
      "modelAnswer": [
        "Equal barrier heights give equal coefficients.",
        "Unequal concentrations give unequal directional fluxes.",
        "Equal opposing fluxes mean zero net flux, not absence of microscopic passage."
      ],
      "points": 1,
      "source": "L06 PDF 6"
    },
    {
      "id": "L06-position-reason",
      "sectionId": "position",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Use the source barrier-position panel to compare inner, outer and central barriers. State voltage polarity and avoid a universal linearity claim.",
      "hints": [
        {
          "body": "Identify which observation concerns permeation, energetic position or changing channel state."
        },
        {
          "body": "Separate reversal, conductance and activation history; check whether one model can establish the requested inference on its own."
        }
      ],
      "markScheme": [
        {
          "text": "Location is measured from inside; inner is zero and outer one."
        },
        {
          "text": "For positive ions an outer barrier gives stronger outward voltage dependence."
        },
        {
          "text": "An inner barrier gives stronger inward voltage dependence at negative voltage."
        },
        {
          "text": "A central barrier can still have nonlinear exponential current."
        }
      ],
      "modelAnswer": [
        "Location is measured from inside; inner is zero and outer one.",
        "For positive ions an outer barrier gives stronger outward voltage dependence.",
        "An inner barrier gives stronger inward voltage dependence at negative voltage.",
        "A central barrier can still have nonlinear exponential current."
      ],
      "points": 1,
      "source": "L06 PDF 8",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 6, PDF page 8. Outer and inner energy barrier profiles with their current–voltage curves. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 6, PDF page 8. Outer and inner energy barrier profiles with their current–voltage curves. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L06/position.webp', import.meta.url).href,
          "alt": "Lecture 6, PDF page 8. Outer and inner energy barrier profiles with their current–voltage curves. Original labels, axes and scale bars retained.",
          "aspect": 0.9837662337662337,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L06-concentrations-reason",
      "sectionId": "concentrations",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Compare the two source concentration panels at a fixed central barrier. Why does a ratio alone fail to specify absolute current?",
      "hints": [
        {
          "body": "Identify which observation concerns permeation, energetic position or changing channel state."
        },
        {
          "body": "Separate reversal, conductance and activation history; check whether one model can establish the requested inference on its own."
        }
      ],
      "markScheme": [
        {
          "text": "Each directional term contains an absolute concentration."
        },
        {
          "text": "Holding inside fixed versus outside fixed changes the overall current scale."
        },
        {
          "text": "Equal ratios set the same selective reversal, but scaling both concentrations scales current."
        },
        {
          "text": "A static curve does not uniquely determine a physical barrier."
        }
      ],
      "modelAnswer": [
        "Each directional term contains an absolute concentration.",
        "Holding inside fixed versus outside fixed changes the overall current scale.",
        "Equal ratios set the same selective reversal, but scaling both concentrations scales current.",
        "A static curve does not uniquely determine a physical barrier."
      ],
      "points": 1,
      "source": "L06 PDF 9",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 6, PDF page 9. Fixed central barrier with different concentration ratios and separately fixed inside/outside concentration. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 6, PDF page 9. Fixed central barrier with different concentration ratios and separately fixed inside/outside concentration. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L06/concentrations.webp', import.meta.url).href,
          "alt": "Lecture 6, PDF page 9. Fixed central barrier with different concentration ratios and separately fixed inside/outside concentration. Original labels, axes and scale bars retained.",
          "aspect": 1.6971894832275611,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L06-multiple-reason",
      "sectionId": "multiple",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Identify entry, binding and selectivity features in the sodium profile. Explain why a binding well is compatible with a positive overall crossing rate.",
      "hints": [
        {
          "body": "Identify which observation concerns permeation, energetic position or changing channel state."
        },
        {
          "body": "Separate reversal, conductance and activation history; check whether one model can establish the requested inference on its own."
        }
      ],
      "markScheme": [
        {
          "text": "The initial barrier opposes entry."
        },
        {
          "text": "A well is an energetically favorable binding region."
        },
        {
          "text": "The larger filter barrier limits later passage; further barriers remain."
        },
        {
          "text": "Rates are positive exponentials, not the signed energy values themselves."
        }
      ],
      "modelAnswer": [
        "The initial barrier opposes entry.",
        "A well is an energetically favorable binding region.",
        "The larger filter barrier limits later passage; further barriers remain.",
        "Rates are positive exponentials, not the signed energy values themselves."
      ],
      "points": 1,
      "source": "L06 PDF 10",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 6, PDF page 10. Sodium permeation energy profile and binding-site arrangement. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 6, PDF page 10. Sodium permeation energy profile and binding-site arrangement. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L06/multiple.webp', import.meta.url).href,
          "alt": "Lecture 6, PDF page 10. Sodium permeation energy profile and binding-site arrangement. Original labels, axes and scale bars retained.",
          "aspect": 2.073170731707317,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L06-gates-reason",
      "sectionId": "gates",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Compare the moving particles and the missing time variable in static permeation and gate models.",
      "hints": [
        {
          "body": "Identify which observation concerns permeation, energetic position or changing channel state."
        },
        {
          "body": "Separate reversal, conductance and activation history; check whether one model can establish the requested inference on its own."
        }
      ],
      "markScheme": [
        {
          "text": "Permeation barriers describe ions traversing the pore."
        },
        {
          "text": "Gate barriers describe gating-particle rearrangement."
        },
        {
          "text": "A dynamic state variable retains the past voltage-dependent activation state."
        },
        {
          "text": "Both mechanisms may be needed for a single channel."
        }
      ],
      "modelAnswer": [
        "Permeation barriers describe ions traversing the pore.",
        "Gate barriers describe gating-particle rearrangement.",
        "A dynamic state variable retains the past voltage-dependent activation state.",
        "Both mechanisms may be needed for a single channel."
      ],
      "points": 1,
      "source": "L06 PDF 11"
    },
    {
      "id": "L06-assumptions-reason",
      "sectionId": "assumptions",
      "difficulty": "medium",
      "type": "written",
      "prompt": "How can doubling driving force double single-open-pore current while the entire population remains nonlinear?",
      "hints": [
        {
          "body": "Identify which observation concerns permeation, energetic position or changing channel state."
        },
        {
          "body": "Separate reversal, conductance and activation history; check whether one model can establish the requested inference on its own."
        }
      ],
      "markScheme": [
        {
          "text": "Hold the open pore and its conductance fixed for the Ohmic comparison."
        },
        {
          "text": "Population current also depends on the fraction open."
        },
        {
          "text": "That fraction varies with voltage and time."
        }
      ],
      "modelAnswer": [
        "Hold the open pore and its conductance fixed for the Ohmic comparison.",
        "Population current also depends on the fraction open.",
        "That fraction varies with voltage and time."
      ],
      "points": 1,
      "source": "L06 PDF 12"
    },
    {
      "id": "L06-balance-reason",
      "sectionId": "balance",
      "difficulty": "medium",
      "type": "derive",
      "prompt": "Derive the steady permissive fraction from the transition balance.",
      "hints": [
        {
          "body": "Identify which observation concerns permeation, energetic position or changing channel state."
        },
        {
          "body": "Separate reversal, conductance and activation history; check whether one model can establish the requested inference on its own."
        }
      ],
      "markScheme": [
        {
          "text": "Set the derivative to zero."
        },
        {
          "text": "$\\alpha(1-y_\\infty)=\\beta y_\\infty$."
        },
        {
          "text": "$y_\\infty=\\alpha/(\\alpha+\\beta)$."
        },
        {
          "text": "Distinguish particle fraction from whole-channel probability."
        }
      ],
      "modelAnswer": [
        "Set the derivative to zero.",
        "$\\alpha(1-y_\\infty)=\\beta y_\\infty$.",
        "$y_\\infty=\\alpha/(\\alpha+\\beta)$.",
        "Distinguish particle fraction from whole-channel probability."
      ],
      "points": 1,
      "source": "L06 PDF 13"
    },
    {
      "id": "L06-polarity-reason",
      "sectionId": "polarity",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain why depolarization can increase activation while decreasing inward ionic current at a fixed gate fraction.",
      "hints": [
        {
          "body": "Identify which observation concerns permeation, energetic position or changing channel state."
        },
        {
          "body": "Separate reversal, conductance and activation history; check whether one model can establish the requested inference on its own."
        }
      ],
      "markScheme": [
        {
          "text": "Depolarization means a more positive voltage."
        },
        {
          "text": "The source positive gating particle can become more permissive."
        },
        {
          "text": "At fixed activation, a voltage closer to reversal reduces the magnitude of inward driving force."
        },
        {
          "text": "Activation and driving force are separate effects."
        }
      ],
      "modelAnswer": [
        "Depolarization means a more positive voltage.",
        "The source positive gating particle can become more permissive.",
        "At fixed activation, a voltage closer to reversal reduces the magnitude of inward driving force.",
        "Activation and driving force are separate effects."
      ],
      "points": 1,
      "source": "L06 PDF 14"
    },
    {
      "id": "L06-steady-reason",
      "sectionId": "steady",
      "difficulty": "medium",
      "type": "written",
      "prompt": "At fixed baseline rate coefficients, move the barrier without changing its state-energy difference. Predict steady activation and speed, and justify cancellation.",
      "hints": [
        {
          "body": "Identify which observation concerns permeation, energetic position or changing channel state."
        },
        {
          "body": "Separate reversal, conductance and activation history; check whether one model can establish the requested inference on its own."
        }
      ],
      "markScheme": [
        {
          "text": "Opening and closing exponents share a location-dependent factor."
        },
        {
          "text": "It cancels in the ratio defining steady activation."
        },
        {
          "text": "It does not cancel from the rate sum."
        },
        {
          "text": "The time constant can therefore change without a steady-state change."
        }
      ],
      "modelAnswer": [
        "Opening and closing exponents share a location-dependent factor.",
        "It cancels in the ratio defining steady activation.",
        "It does not cancel from the rate sum.",
        "The time constant can therefore change without a steady-state change."
      ],
      "points": 1,
      "source": "L06 PDF 15"
    },
    {
      "id": "L06-activation-reason",
      "sectionId": "activation",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Read the source activation panel and distinguish permissive-state direction from measured current direction.",
      "hints": [
        {
          "body": "Identify which observation concerns permeation, energetic position or changing channel state."
        },
        {
          "body": "Separate reversal, conductance and activation history; check whether one model can establish the requested inference on its own."
        }
      ],
      "markScheme": [
        {
          "text": "The rising curve is depolarization activated."
        },
        {
          "text": "The falling curve is hyperpolarization activated."
        },
        {
          "text": "The current sign also requires voltage relative to ionic reversal."
        },
        {
          "text": "Opening more channels can increase either inward or outward current."
        }
      ],
      "modelAnswer": [
        "The rising curve is depolarization activated.",
        "The falling curve is hyperpolarization activated.",
        "The current sign also requires voltage relative to ionic reversal.",
        "Opening more channels can increase either inward or outward current."
      ],
      "points": 1,
      "source": "L06 PDF 16",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 6, PDF page 16. Source rate and activation curves: depolarization activation above, hyperpolarization activation below. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 6, PDF page 16. Source rate and activation curves: depolarization activation above, hyperpolarization activation below. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L06/activation.webp', import.meta.url).href,
          "alt": "Lecture 6, PDF page 16. Source rate and activation curves: depolarization activation above, hyperpolarization activation below. Original labels, axes and scale bars retained.",
          "aspect": 1.7243510506798516,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L06-kinetics-reason",
      "sectionId": "kinetics",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain how to recognize first-order relaxation after a voltage step and what cannot be inferred from an unscaled schematic.",
      "hints": [
        {
          "body": "Identify which observation concerns permeation, energetic position or changing channel state."
        },
        {
          "body": "Separate reversal, conductance and activation history; check whether one model can establish the requested inference on its own."
        }
      ],
      "markScheme": [
        {
          "text": "The particle probability approaches a fixed asymptote exponentially at fixed voltage."
        },
        {
          "text": "The rate sum defines $1/\\tau$."
        },
        {
          "text": "The source schematic lacks a numerical time calibration."
        },
        {
          "text": "It cannot supply a numerical time constant or prove a specific HH channel identity."
        }
      ],
      "modelAnswer": [
        "The particle probability approaches a fixed asymptote exponentially at fixed voltage.",
        "The rate sum defines $1/\\tau$.",
        "The source schematic lacks a numerical time calibration.",
        "It cannot supply a numerical time constant or prove a specific HH channel identity."
      ],
      "points": 1,
      "source": "L06 PDF 17",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 6, PDF page 17. Single-particle and whole-channel activation time courses; schematic axes have no numerical time scale. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 6, PDF page 17. Single-particle and whole-channel activation time courses; schematic axes have no numerical time scale. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L06/kinetics.webp', import.meta.url).href,
          "alt": "Lecture 6, PDF page 17. Single-particle and whole-channel activation time courses; schematic axes have no numerical time scale. Original labels, axes and scale bars retained.",
          "aspect": 1.7868421052631578,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L06-particles-reason",
      "sectionId": "particles",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Compare a single permissive particle with a channel requiring several independent permissive particles.",
      "hints": [
        {
          "body": "Identify which observation concerns permeation, energetic position or changing channel state."
        },
        {
          "body": "Separate reversal, conductance and activation history; check whether one model can establish the requested inference on its own."
        }
      ],
      "markScheme": [
        {
          "text": "The particle follows first-order activation."
        },
        {
          "text": "The whole-channel probability is the product, $y^P$."
        },
        {
          "text": "This can produce a delayed initial rise."
        },
        {
          "text": "Correlated particles or a different opening rule invalidate the product model."
        }
      ],
      "modelAnswer": [
        "The particle follows first-order activation.",
        "The whole-channel probability is the product, $y^P$.",
        "This can produce a delayed initial rise.",
        "Correlated particles or a different opening rule invalidate the product model."
      ],
      "points": 1,
      "source": "L06 PDF 17"
    },
    {
      "id": "L06-summary-reason",
      "sectionId": "summary",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain why one real channel can need all three nonlinear mechanisms without making the models interchangeable.",
      "hints": [
        {
          "body": "Identify which observation concerns permeation, energetic position or changing channel state."
        },
        {
          "body": "Separate reversal, conductance and activation history; check whether one model can establish the requested inference on its own."
        }
      ],
      "markScheme": [
        {
          "text": "Gradients and fields affect ionic permeation."
        },
        {
          "text": "Barrier structure adds localized energetic constraints and binding."
        },
        {
          "text": "Gate-state kinetics change availability over time."
        },
        {
          "text": "A model answering one of these questions may omit the others."
        }
      ],
      "modelAnswer": [
        "Gradients and fields affect ionic permeation.",
        "Barrier structure adds localized energetic constraints and binding.",
        "Gate-state kinetics change availability over time.",
        "A model answering one of these questions may omit the others."
      ],
      "points": 1,
      "source": "L06 PDF 18"
    },
    {
      "id": "L06-group-choices",
      "sectionId": "model-audit",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Choose a useful starting model for: changing concentration at fixed permeability; a gate state switching in time; barrier-position asymmetry; a spike requiring regenerative activation and delayed recovery. Explain what each selected model omits.",
      "hints": [
        {
          "body": "Identify which observation concerns permeation, energetic position or changing channel state."
        },
        {
          "body": "Separate reversal, conductance and activation history; check whether one model can establish the requested inference on its own."
        }
      ],
      "markScheme": [
        {
          "text": "Use constant-field permeation for the concentration manipulation within its scope."
        },
        {
          "text": "Use a dynamic gate for the switching state."
        },
        {
          "text": "Use the energy-barrier description for barrier-position asymmetry."
        },
        {
          "text": "Dynamic gate mechanisms are needed for the spike; full channel-specific equations are deferred."
        },
        {
          "text": "Permeation models do not explicitly track gating state; a gating model only indirectly describes permeation."
        }
      ],
      "modelAnswer": [
        "Use constant-field permeation for the concentration manipulation within its scope.",
        "Use a dynamic gate for the switching state.",
        "Use the energy-barrier description for barrier-position asymmetry.",
        "Dynamic gate mechanisms are needed for the spike; full channel-specific equations are deferred.",
        "Permeation models do not explicitly track gating state; a gating model only indirectly describes permeation."
      ],
      "points": 1,
      "source": "L06 PDF 19–21"
    },
    {
      "id": "L06-clamp-reason",
      "sectionId": "clamp",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Interpret the source clamp panel. State the controlled variable, what is measured, activation direction and the limitation of the immediate-jump argument.",
      "hints": [
        {
          "body": "Identify which observation concerns permeation, energetic position or changing channel state."
        },
        {
          "body": "Separate reversal, conductance and activation history; check whether one model can establish the requested inference on its own."
        }
      ],
      "markScheme": [
        {
          "text": "Voltage is stepped and membrane current recorded."
        },
        {
          "text": "Slower inward current develops during hyperpolarization."
        },
        {
          "text": "The steady activation curve rises at more negative voltage."
        },
        {
          "text": "Leak inference requires initially negligible activation and removal of the capacitive transient."
        },
        {
          "text": "An already activated gated component can jump with driving force."
        }
      ],
      "modelAnswer": [
        "Voltage is stepped and membrane current recorded.",
        "Slower inward current develops during hyperpolarization.",
        "The steady activation curve rises at more negative voltage.",
        "Leak inference requires initially negligible activation and removal of the capacitive transient.",
        "An already activated gated component can jump with driving force."
      ],
      "points": 1,
      "source": "Exercise6 p1; solving instructions",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Exercise 6, PDF page 1. Supplied Exercise6 voltage-clamp current/voltage traces and steady activation curve. Graph readings are approximate. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Exercise 6, PDF page 1. Supplied Exercise6 voltage-clamp current/voltage traces and steady activation curve. Graph readings are approximate. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L06/clamp.webp', import.meta.url).href,
          "alt": "Exercise 6, PDF page 1. Supplied Exercise6 voltage-clamp current/voltage traces and steady activation curve. Graph readings are approximate. Original labels, axes and scale bars retained.",
          "aspect": 1.9728682170542635,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L06-chord-reason",
      "sectionId": "chord",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Use the source nonlinear curve to compare chord conductance and local slope. Explain what reversal can and cannot tell you.",
      "hints": [
        {
          "body": "Identify which observation concerns permeation, energetic position or changing channel state."
        },
        {
          "body": "Separate reversal, conductance and activation history; check whether one model can establish the requested inference on its own."
        }
      ],
      "markScheme": [
        {
          "text": "The chord connects reversal to the measured point."
        },
        {
          "text": "Local slope is the derivative of the curve."
        },
        {
          "text": "For a specified selective ion, reversal constrains the concentration ratio."
        },
        {
          "text": "Positive reversal with inward rectification is consistent with GHK or an appropriate barrier model, not proof of either."
        }
      ],
      "modelAnswer": [
        "The chord connects reversal to the measured point.",
        "Local slope is the derivative of the curve.",
        "For a specified selective ion, reversal constrains the concentration ratio.",
        "Positive reversal with inward rectification is consistent with GHK or an appropriate barrier model, not proof of either."
      ],
      "points": 1,
      "source": "Exercise6 p2; solving instructions",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Exercise 6, PDF page 2. Supplied Exercise6 nonlinear current–voltage curve, with original axes. Graph readings are approximate. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Exercise 6, PDF page 2. Supplied Exercise6 nonlinear current–voltage curve, with original axes. Graph readings are approximate. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L06/chord.webp', import.meta.url).href,
          "alt": "Exercise 6, PDF page 2. Supplied Exercise6 nonlinear current–voltage curve, with original axes. Graph readings are approximate. Original labels, axes and scale bars retained.",
          "aspect": 2.0183968462549275,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L06-barrier-derive",
      "sectionId": "tilted-barrier",
      "difficulty": "hard",
      "type": "written",
      "prompt": "Start from the two voltage-tilted permeation rates. Derive the outward current expression, show why reversal loses its location dependence, and explain why rectification need not lose it.",
      "hints": [
        {
          "body": "Identify which observation concerns permeation, energetic position or changing channel state."
        },
        {
          "body": "Separate reversal, conductance and activation history; check whether one model can establish the requested inference on its own."
        }
      ],
      "markScheme": [
        {
          "text": "Write outward minus inward flux with the ion valence."
        },
        {
          "text": "Set $C_i e^{\\delta u}=C_o e^{-(1-\\delta)u}$ with $u=zFV/(RT)$."
        },
        {
          "text": "Then $e^u=C_o/C_i$, so selective reversal has the Nernst ratio."
        },
        {
          "text": "At nonzero current, the two separate exponential terms still contain location."
        },
        {
          "text": "This allows rectification direction beyond the constant-field constraint."
        }
      ],
      "modelAnswer": [
        "Write outward minus inward flux with the ion valence.",
        "Set $C_i e^{\\delta u}=C_o e^{-(1-\\delta)u}$ with $u=zFV/(RT)$.",
        "Then $e^u=C_o/C_i$, so selective reversal has the Nernst ratio.",
        "At nonzero current, the two separate exponential terms still contain location.",
        "This allows rectification direction beyond the constant-field constraint."
      ],
      "points": 1,
      "source": "L06 PDF 7",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 6, PDF page 7. Zero-voltage and voltage-tilted permeation energy profiles. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 6, PDF page 7. Zero-voltage and voltage-tilted permeation energy profiles. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L06/tilt.webp', import.meta.url).href,
          "alt": "Lecture 6, PDF page 7. Zero-voltage and voltage-tilted permeation energy profiles. Original labels, axes and scale bars retained.",
          "aspect": 1.739825581395349,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L06-barrier-flux-audit",
      "sectionId": "position",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "An ideal monovalent-cation pore has equal concentrations $40\\,\\mathrm{mol/m^3}$, partition coefficient $0.5$, $k_0=2\\times10^{-6}\\,\\mathrm{m/s}$ and inner-side barrier location $\\delta=0.2$. The voltage satisfies $zFV_m/(RT)=-1$. Find the crossing coefficients, fluxes and outward current density. Then double both concentrations. What changes and what remains unchanged?",
      "stages": [
        {
          "title": "Choose voltage signs",
          "choices": [
            {
              "label": "$k_1=k_0 e^{0.8}$, $k_2=k_0e^{-0.2}$"
            },
            {
              "label": "$k_1=k_0 e^{-0.8}$, $k_2=k_0e^{0.2}$"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The negative voltage favors inward crossing for positive ions."
          ]
        },
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Baseline coefficient",
              "answer": {
                "value": 2e-06,
                "unit": "m/s",
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
              "label": "Source concentration",
              "answer": {
                "value": 40,
                "unit": "mol/m3",
                "tolerance": 3.9999999999999996e-05,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 40,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Partition coefficient",
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
          "title": "Inward coefficient",
          "answer": {
            "value": 4.451081856984936e-06,
            "unit": "m/s",
            "tolerance": 1.3353245570954808e-08,
            "verification": {
              "relation": "exponentialRate",
              "inputs": {
                "base": 2e-06,
                "exponent": 0.8
              },
              "displayScale": 1
            }
          },
          "tex": "k_1=k_0e^{0.8}",
          "modelAnswer": [
            "Use the distance from the outer side for inward crossing.",
            "$k_1=k_0e^{0.8}$",
            "$4.4510819\\times10^{-6}\\,\\mathrm{m/s}$"
          ]
        },
        {
          "title": "Outward coefficient",
          "answer": {
            "value": 1.6374615061559637e-06,
            "unit": "m/s",
            "tolerance": 4.912384518467891e-09,
            "verification": {
              "relation": "exponentialRate",
              "inputs": {
                "base": 2e-06,
                "exponent": -0.2
              },
              "displayScale": 1
            }
          },
          "tex": "k_2=k_0e^{-0.2}",
          "modelAnswer": [
            "Use the location from inside for outward crossing.",
            "$k_2=k_0e^{-0.2}$",
            "$1.6374615\\times10^{-6}\\,\\mathrm{m/s}$"
          ]
        },
        {
          "title": "Inward flux",
          "answer": {
            "value": 8.902163713969872e-05,
            "unit": "mol/m2/s",
            "tolerance": 2.6706491141909616e-07,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 4.451081856984936e-06,
                "b": 20
              },
              "displayScale": 1
            }
          },
          "tex": "J_{in}=k_1\\beta_p C_o",
          "modelAnswer": [
            "Partition multiplies concentration.",
            "$J_{in}=k_1\\beta_p C_o$",
            "$8.9021637\\times10^{-5}\\,\\mathrm{mol/(m^2s)}$"
          ]
        },
        {
          "title": "Outward flux",
          "answer": {
            "value": 3.274923012311927e-05,
            "unit": "mol/m2/s",
            "tolerance": 9.824769036935782e-08,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 1.6374615061559637e-06,
                "b": 20
              },
              "displayScale": 1
            }
          },
          "tex": "J_{out}=k_2\\beta_p C_i",
          "modelAnswer": [
            "Retain the separate directional coefficient.",
            "$J_{out}=k_2\\beta_p C_i$",
            "$3.274923\\times10^{-5}\\,\\mathrm{mol/(m^2s)}$"
          ]
        },
        {
          "title": "Net current density",
          "answer": {
            "value": -5.429443190994668,
            "unit": "A/m2",
            "tolerance": 0.016288329572984005,
            "verification": {
              "relation": "fluxCurrent",
              "inputs": {
                "flux": -5.627240701657945e-05,
                "z": 1,
                "f": 96485
              },
              "displayScale": 1
            }
          },
          "tex": "j=F(J_{out}-J_{in})",
          "modelAnswer": [
            "Inward flux is subtracted.",
            "$j=F(J_{out}-J_{in})$",
            "$-5.4294432\\,\\mathrm{A/m^2}$"
          ]
        },
        {
          "title": "Doubled-concentration current",
          "answer": {
            "value": -10.858886381989336,
            "unit": "A/m2",
            "tolerance": 0.03257665914596801,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": -5.429443190994668,
                "b": 2
              },
              "displayScale": 1
            }
          },
          "tex": "j_{new}=2j",
          "modelAnswer": [
            "Both directional fluxes scale.",
            "$j_{new}=2j$",
            "$-10.858886\\,\\mathrm{A/m^2}$"
          ]
        },
        {
          "title": "Reversal",
          "choices": [
            {
              "label": "Reversal remains zero because the concentration ratio remains one"
            },
            {
              "label": "Reversal doubles because the absolute current density doubles"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Scaling both concentrations scales current but not selective reversal."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use voltage-tilted barrier coefficients, then directional fluxes and outward-current subtraction."
        },
        {
          "body": "Insert $zFV_m/(RT)=-1$ into $-(1-0.2)zFV_m/(RT)$ and $0.2zFV_m/(RT)$. Then multiply by partition and concentration before subtracting fluxes."
        }
      ],
      "modelAnswer": [
        "The negative voltage favors inward crossing for positive ions.",
        "Convert each stated quantity to the requested unit before evaluating.",
        "Use the distance from the outer side for inward crossing.",
        "Use the location from inside for outward crossing.",
        "Partition multiplies concentration.",
        "Retain the separate directional coefficient.",
        "Inward flux is subtracted.",
        "Both directional fluxes scale.",
        "Scaling both concentrations scales current but not selective reversal."
      ],
      "points": 1,
      "source": "L06 PDF 8"
    },
    {
      "id": "L06-gradient-rescale",
      "sectionId": "concentrations",
      "difficulty": "hard",
      "type": "written",
      "prompt": "Two pores share permeability or barrier parameters. In the second, both concentrations are scaled together without changing their ratio. Predict reversal, current scale and the limits of using a current curve to identify the mechanism.",
      "hints": [
        {
          "body": "Identify which observation concerns permeation, energetic position or changing channel state."
        },
        {
          "body": "Separate reversal, conductance and activation history; check whether one model can establish the requested inference on its own."
        }
      ],
      "markScheme": [
        {
          "text": "The selective reversal remains unchanged."
        },
        {
          "text": "Both directional permeation terms scale with concentration."
        },
        {
          "text": "Current changes despite unchanged ratio."
        },
        {
          "text": "Both static models can support this result under their assumptions."
        },
        {
          "text": "A unique barrier location or gate count cannot be inferred from the result."
        }
      ],
      "modelAnswer": [
        "The selective reversal remains unchanged.",
        "Both directional permeation terms scale with concentration.",
        "Current changes despite unchanged ratio.",
        "Both static models can support this result under their assumptions.",
        "A unique barrier location or gate count cannot be inferred from the result."
      ],
      "points": 1,
      "source": "L06 PDF 9",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 6, PDF page 9. Fixed central barrier with different concentration ratios and separately fixed inside/outside concentration. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 6, PDF page 9. Fixed central barrier with different concentration ratios and separately fixed inside/outside concentration. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L06/concentrations.webp', import.meta.url).href,
          "alt": "Lecture 6, PDF page 9. Fixed central barrier with different concentration ratios and separately fixed inside/outside concentration. Original labels, axes and scale bars retained.",
          "aspect": 1.6971894832275611,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L06-infer-rates",
      "sectionId": "steady",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "A fixed-voltage experiment gives steady particle activation $0.65$ and relaxation time $25\\,\\mathrm{ms}$. Infer opening and closing rates. A second condition doubles both rates without changing their ratio. Find its steady activation and time constant. Explain what can change without shifting the activation curve.",
      "stages": [
        {
          "title": "Choose relations",
          "choices": [
            {
              "label": "$y_\\infty=\\alpha/(\\alpha+\\beta)$ and $\\tau=1/(\\alpha+\\beta)$"
            },
            {
              "label": "$y_\\infty=\\beta/(\\alpha+\\beta)$ and $\\tau=\\alpha+\\beta$"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Use the steady ratio and reciprocal rate sum."
          ]
        },
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Steady fraction",
              "answer": {
                "value": 0.65,
                "unit": "",
                "tolerance": 6.5e-07,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.65,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Original time constant",
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
          "title": "Rate sum",
          "answer": {
            "value": 40,
            "unit": "1/s",
            "tolerance": 0.12,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 1,
                "b": 0.025
              },
              "displayScale": 1
            }
          },
          "tex": "s=1/\\tau",
          "modelAnswer": [
            "Convert time before taking its reciprocal.",
            "$s=1/\\tau$",
            "$40\\,\\mathrm{s^{-1}}$"
          ]
        },
        {
          "title": "Opening rate",
          "answer": {
            "value": 26,
            "unit": "1/s",
            "tolerance": 0.078,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 0.65,
                "b": 40
              },
              "displayScale": 1
            }
          },
          "tex": "\\alpha=y_\\infty s",
          "modelAnswer": [
            "Opening sets the numerator.",
            "$\\alpha=y_\\infty s$",
            "$26\\,\\mathrm{s^{-1}}$"
          ]
        },
        {
          "title": "Closing rate",
          "answer": {
            "value": 14,
            "unit": "1/s",
            "tolerance": 0.042,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": 40,
                "b": -26
              },
              "displayScale": 1
            }
          },
          "tex": "\\beta=s-\\alpha",
          "modelAnswer": [
            "Subtract opening from the sum.",
            "$\\beta=s-\\alpha$",
            "$14\\,\\mathrm{s^{-1}}$"
          ]
        },
        {
          "title": "New steady fraction",
          "answer": {
            "value": 0.65,
            "unit": "",
            "tolerance": 0.0019500000000000001,
            "verification": {
              "relation": "gateSteady",
              "inputs": {
                "alpha": 52,
                "beta": 28
              },
              "displayScale": 1
            }
          },
          "tex": "y_{\\infty,new}=52/(52+28)",
          "modelAnswer": [
            "A common rate multiplier cancels.",
            "$y_{\\infty,new}=52/(52+28)$",
            "$0.65$"
          ]
        },
        {
          "title": "New time constant",
          "answer": {
            "value": 0.0125,
            "unit": "s",
            "tolerance": 3.7500000000000003e-05,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 1,
                "b": 80
              },
              "displayScale": 1
            }
          },
          "tex": "\\tau_{new}=1/(52+28)",
          "modelAnswer": [
            "The common multiplier does not cancel here.",
            "$\\tau_{new}=1/(52+28)$",
            "$0.0125\\,\\mathrm{s}$"
          ]
        },
        {
          "title": "Interpretation",
          "choices": [
            {
              "label": "Relaxation accelerates while steady activation remains unchanged"
            },
            {
              "label": "Relaxation stays unchanged while steady activation must double"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Steady-state and kinetic measurements constrain different combinations of rates."
          ]
        }
      ],
      "hints": [
        {
          "body": "Invert the time constant for the rate sum, then use the steady fraction."
        },
        {
          "body": "Begin with $25\\,\\mathrm{ms}=0.025\\,\\mathrm s$. Infer the rate sum, split it using the fraction and apply the common multiplier."
        }
      ],
      "modelAnswer": [
        "Use the steady ratio and reciprocal rate sum.",
        "Convert each stated quantity to the requested unit before evaluating.",
        "Convert time before taking its reciprocal.",
        "Opening sets the numerator.",
        "Subtract opening from the sum.",
        "A common rate multiplier cancels.",
        "The common multiplier does not cancel here.",
        "Steady-state and kinetic measurements constrain different combinations of rates."
      ],
      "points": 1,
      "source": "L06 PDF 15"
    },
    {
      "id": "L06-move-gating-barrier",
      "sectionId": "steady",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "For the source positive gating charge, hold $zFV/(RT)=0.8$, $\\alpha_0=20$ and $\\beta_0=30\\,\\mathrm{s^{-1}}$ fixed. Move $\\delta$ from $0.25$ to $0.75$ without changing the baseline state energies. Find both new rates, steady activation and old/new time constants. Starting at $y_0=0.1$, find new activation at $20\\,\\mathrm{ms}$. Explain which part of the behavior changed.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Baseline opening",
              "answer": {
                "value": 20,
                "unit": "1/s",
                "tolerance": 1.9999999999999998e-05,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 20,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Baseline closing",
              "answer": {
                "value": 30,
                "unit": "1/s",
                "tolerance": 2.9999999999999997e-05,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 30,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "New location",
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
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "New opening rate",
          "answer": {
            "value": 36.44237600781018,
            "unit": "1/s",
            "tolerance": 0.10932712802343054,
            "verification": {
              "relation": "exponentialRate",
              "inputs": {
                "base": 20,
                "exponent": 0.6000000000000001
              },
              "displayScale": 1
            }
          },
          "tex": "\\alpha=20e^{0.75(0.8)}",
          "modelAnswer": [
            "Use the new location in the opening exponent.",
            "$\\alpha=20e^{0.75(0.8)}$",
            "$36.442376\\,\\mathrm{s^{-1}}$"
          ]
        },
        {
          "title": "New closing rate",
          "answer": {
            "value": 24.561922592339453,
            "unit": "1/s",
            "tolerance": 0.07368576777701837,
            "verification": {
              "relation": "exponentialRate",
              "inputs": {
                "base": 30,
                "exponent": -0.2
              },
              "displayScale": 1
            }
          },
          "tex": "\\beta=30e^{-(1-0.75)(0.8)}",
          "modelAnswer": [
            "Closing uses the complementary location.",
            "$\\beta=30e^{-(1-0.75)(0.8)}$",
            "$24.561923\\,\\mathrm{s^{-1}}$"
          ]
        },
        {
          "title": "Steady activation",
          "answer": {
            "value": 0.5973739038730755,
            "unit": "",
            "tolerance": 0.0017921217116192267,
            "verification": {
              "relation": "gateSteady",
              "inputs": {
                "alpha": 36.44237600781018,
                "beta": 24.561922592339453
              },
              "displayScale": 1
            }
          },
          "tex": "y_\\infty=\\alpha/(\\alpha+\\beta)",
          "modelAnswer": [
            "The location factor cancels in the ratio.",
            "$y_\\infty=\\alpha/(\\alpha+\\beta)$",
            "$0.5973739$"
          ]
        },
        {
          "title": "Old time constant",
          "answer": {
            "value": 0.024454419309356854,
            "unit": "s",
            "tolerance": 7.336325792807057e-05,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 1,
                "b": 40.892404246024185
              },
              "displayScale": 1
            }
          },
          "tex": "\\tau_{old}=1/[20e^{0.25(0.8)}+30e^{-0.75(0.8)}]",
          "modelAnswer": [
            "Use the original rates for this comparison.",
            "$\\tau_{old}=1/[20e^{0.25(0.8)}+30e^{-0.75(0.8)}]$",
            "$0.024454419\\,\\mathrm{s}$"
          ]
        },
        {
          "title": "New time constant",
          "answer": {
            "value": 0.01639228747722291,
            "unit": "s",
            "tolerance": 4.917686243166873e-05,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 1,
                "b": 61.00429860014964
              },
              "displayScale": 1
            }
          },
          "tex": "\\tau_{new}=1/(\\alpha+\\beta)",
          "modelAnswer": [
            "The common multiplier remains in the sum.",
            "$\\tau_{new}=1/(\\alpha+\\beta)$",
            "$0.016392287\\,\\mathrm{s}$"
          ]
        },
        {
          "title": "New activation at the stated time",
          "answer": {
            "value": 0.4505467467763971,
            "unit": "",
            "tolerance": 0.0013516402403291913,
            "verification": {
              "relation": "gateRelax",
              "inputs": {
                "y0": 0.1,
                "steady": 0.5973739038730755,
                "time": 0.02,
                "tau": 0.01639228747722291
              },
              "displayScale": 1
            }
          },
          "tex": "y=y_\\infty+(0.1-y_\\infty)e^{-0.020/\\tau_{new}}",
          "modelAnswer": [
            "Use the new kinetic scale.",
            "$y=y_\\infty+(0.1-y_\\infty)e^{-0.020/\\tau_{new}}$",
            "$0.45054675$"
          ]
        },
        {
          "title": "Interpretation",
          "choices": [
            {
              "label": "The steady activation is unchanged but relaxation is faster"
            },
            {
              "label": "The relaxation is unchanged but steady activation is larger"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "This prediction requires fixed baseline coefficients, not arbitrary energy changes."
          ]
        }
      ],
      "hints": [
        {
          "body": "Insert barrier locations into both exponential rates; compare their ratio and sum."
        },
        {
          "body": "Start with $\\alpha_{new}=20e^{0.75(0.8)}\\,\\mathrm{s^{-1}}$. Evaluate closing separately, then fraction, times and finite-time activation."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Use the new location in the opening exponent.",
        "Closing uses the complementary location.",
        "The location factor cancels in the ratio.",
        "Use the original rates for this comparison.",
        "The common multiplier remains in the sum.",
        "Use the new kinetic scale.",
        "This prediction requires fixed baseline coefficients, not arbitrary energy changes."
      ],
      "points": 1,
      "source": "L06 PDF 15"
    },
    {
      "id": "L06-kinetic-sketch",
      "sectionId": "kinetics",
      "difficulty": "hard",
      "type": "written",
      "prompt": "Sketch particle activation and an all-required multi-particle channel after a voltage step. Explain continuity, delay, final values and why a measured current need not follow either curve alone.",
      "hints": [
        {
          "body": "Identify which observation concerns permeation, energetic position or changing channel state."
        },
        {
          "body": "Separate reversal, conductance and activation history; check whether one model can establish the requested inference on its own."
        }
      ],
      "markScheme": [
        {
          "text": "Label time and dimensionless probability axes."
        },
        {
          "text": "Draw the particle exponential between initial and steady fractions."
        },
        {
          "text": "Draw the whole-channel curve as $y^P$, with the stated independence rule."
        },
        {
          "text": "Both probabilities are continuous, but the driving force can jump."
        },
        {
          "text": "Current additionally requires conductance and reversal; no numerical time is read from the unscaled source sketch."
        }
      ],
      "modelAnswer": [
        "Label time and dimensionless probability axes.",
        "Draw the particle exponential between initial and steady fractions.",
        "Draw the whole-channel curve as $y^P$, with the stated independence rule.",
        "Both probabilities are continuous, but the driving force can jump.",
        "Current additionally requires conductance and reversal; no numerical time is read from the unscaled source sketch."
      ],
      "points": 1,
      "source": "L06 PDF 17",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 6, PDF page 17. Single-particle and whole-channel activation time courses; schematic axes have no numerical time scale. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 6, PDF page 17. Single-particle and whole-channel activation time courses; schematic axes have no numerical time scale. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L06/kinetics.webp', import.meta.url).href,
          "alt": "Lecture 6, PDF page 17. Single-particle and whole-channel activation time courses; schematic axes have no numerical time scale. Original labels, axes and scale bars retained.",
          "aspect": 1.7868421052631578,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L06-population-current",
      "sectionId": "particles",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "After a step to $-50\\,\\mathrm{mV}$, each particle has $y_0=0.1$, $y_\\infty=0.7$, $\\tau=20\\,\\mathrm{ms}$. Three identical independent particles must all be permissive. Maximum population conductance is $8\\,\\mathrm{nS}$ and reversal is $+30\\,\\mathrm{mV}$. Find activation, open fraction and ionic current at $40\\,\\mathrm{ms}$. Explain why multiplying current by the particle fraction alone fails.",
      "stages": [
        {
          "title": "Select population rule",
          "choices": [
            {
              "label": "$I=\\bar g y^3(V-E)$"
            },
            {
              "label": "$I=\\bar g(3y)(V-E)$"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "All-required independent probabilities multiply."
          ]
        },
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Time",
              "answer": {
                "value": 0.04,
                "unit": "s",
                "tolerance": 4e-08,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.04,
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
            },
            {
              "label": "Maximum conductance",
              "answer": {
                "value": 8e-09,
                "unit": "S",
                "tolerance": 8e-15,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 8e-09,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Voltage",
              "answer": {
                "value": -0.05,
                "unit": "V",
                "tolerance": 5e-08,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -0.05,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Reversal",
              "answer": {
                "value": 0.03,
                "unit": "V",
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
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Particle activation",
          "answer": {
            "value": 0.6187988300580324,
            "unit": "",
            "tolerance": 0.0018563964901740972,
            "verification": {
              "relation": "gateRelax",
              "inputs": {
                "y0": 0.1,
                "steady": 0.7,
                "time": 0.04,
                "tau": 0.02
              },
              "displayScale": 1
            }
          },
          "tex": "y=0.7+(0.1-0.7)e^{-0.040/0.020}",
          "modelAnswer": [
            "Use correct prior values for later stages.",
            "$y=0.7+(0.1-0.7)e^{-0.040/0.020}$",
            "$0.61879883$"
          ]
        },
        {
          "title": "Whole-channel fraction",
          "answer": {
            "value": 0.2369454927150307,
            "unit": "",
            "tolerance": 0.0007108364781450922,
            "verification": {
              "relation": "gatePower",
              "inputs": {
                "y": 0.6187988300580324,
                "count": 3
              },
              "displayScale": 1
            }
          },
          "tex": "Y=y^3",
          "modelAnswer": [
            "The fraction is smaller than a single-particle probability.",
            "$Y=y^3$",
            "$0.23694549$"
          ]
        },
        {
          "title": "Open conductance",
          "answer": {
            "value": 1.895563941720246e-09,
            "unit": "S",
            "tolerance": 5.686691825160738e-12,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 8e-09,
                "b": 0.2369454927150307
              },
              "displayScale": 1
            }
          },
          "tex": "g=\\bar gY",
          "modelAnswer": [
            "Convert the maximum conductance to SI.",
            "$g=\\bar gY$",
            "$1.8955639\\times10^{-9}\\,\\mathrm{S}$"
          ]
        },
        {
          "title": "Driving force",
          "answer": {
            "value": -0.08,
            "unit": "V",
            "tolerance": 0.00024,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": -0.05,
                "b": -0.03
              },
              "displayScale": 1
            }
          },
          "tex": "V-E=-0.050-0.030",
          "modelAnswer": [
            "A negative driving force gives inward cation current.",
            "$V-E=-0.050-0.030$",
            "$-0.08\\,\\mathrm{V}$"
          ]
        },
        {
          "title": "Ionic current",
          "answer": {
            "value": -1.5164511533761968e-10,
            "unit": "A",
            "tolerance": 4.54935346012859e-13,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 1.895563941720246e-09,
                "b": -0.08
              },
              "displayScale": 1
            }
          },
          "tex": "I=g(V-E)",
          "modelAnswer": [
            "The current retains the inward sign.",
            "$I=g(V-E)$",
            "$-1.5164512\\times10^{-10}\\,\\mathrm{A}$"
          ]
        },
        {
          "title": "Interpretation",
          "choices": [
            {
              "label": "The product rule suppresses opening relative to a single permissive particle"
            },
            {
              "label": "Three required particles make the probability three times one particle"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Do not replace an all-required rule with a sum."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use exponential particle activation, the all-required probability and the Ohmic open-pore current."
        },
        {
          "body": "Start with $40\\,\\mathrm{ms}=0.040\\,\\mathrm s$ and $20\\,\\mathrm{ms}=0.020\\,\\mathrm s$. Evaluate particle activation, apply the power, then conductance and driving force."
        }
      ],
      "modelAnswer": [
        "All-required independent probabilities multiply.",
        "Convert each stated quantity to the requested unit before evaluating.",
        "Use correct prior values for later stages.",
        "The fraction is smaller than a single-particle probability.",
        "Convert the maximum conductance to SI.",
        "A negative driving force gives inward cation current.",
        "The current retains the inward sign.",
        "Do not replace an all-required rule with a sum."
      ],
      "points": 1,
      "source": "L06 PDF 17"
    },
    {
      "id": "L06-mechanism-design",
      "sectionId": "summary",
      "difficulty": "hard",
      "type": "written",
      "prompt": "An inward-rectifying current has a positive reversal and a slow onset after a clamp step. Design a comparison separating static rectification from changing activation, including controls and an inference limit.",
      "hints": [
        {
          "body": "Identify which observation concerns permeation, energetic position or changing channel state."
        },
        {
          "body": "Separate reversal, conductance and activation history; check whether one model can establish the requested inference on its own."
        }
      ],
      "markScheme": [
        {
          "text": "Record at fixed clamp voltage long enough to distinguish early and late current."
        },
        {
          "text": "Control concentrations and baseline activation between trials."
        },
        {
          "text": "A concentration gradient or barrier can produce the static nonlinear relation."
        },
        {
          "text": "A delayed state-dependent change motivates gating kinetics after excluding capacitive/artifact effects."
        },
        {
          "text": "Measure reversal and compare activation conditions; the static curve alone does not locate a barrier."
        }
      ],
      "modelAnswer": [
        "Record at fixed clamp voltage long enough to distinguish early and late current.",
        "Control concentrations and baseline activation between trials.",
        "A concentration gradient or barrier can produce the static nonlinear relation.",
        "A delayed state-dependent change motivates gating kinetics after excluding capacitive/artifact effects.",
        "Measure reversal and compare activation conditions; the static curve alone does not locate a barrier."
      ],
      "points": 1,
      "source": "L06 PDF 18",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 6, PDF page 21. Source comparison table for constant-field, barrier and gate models. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 6, PDF page 21. Source comparison table for constant-field, barrier and gate models. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L06/comparison.webp', import.meta.url).href,
          "alt": "Lecture 6, PDF page 21. Source comparison table for constant-field, barrier and gate models. Original labels, axes and scale bars retained.",
          "aspect": 1.99182156133829,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L06-group-synthesis",
      "sectionId": "model-audit",
      "difficulty": "hard",
      "type": "written",
      "prompt": "A channel has nonlinear steady current, concentration-sensitive reversal and delayed activation that changes with holding history. Build a minimal combined explanation and state what additional measurements are needed before fitting a unique mechanism.",
      "hints": [
        {
          "body": "Identify which observation concerns permeation, energetic position or changing channel state."
        },
        {
          "body": "Separate reversal, conductance and activation history; check whether one model can establish the requested inference on its own."
        }
      ],
      "markScheme": [
        {
          "text": "Use selective permeation for concentration-dependent reversal."
        },
        {
          "text": "Allow concentration or barrier contributions to static rectification."
        },
        {
          "text": "Use a dynamic gate for delayed activation and history."
        },
        {
          "text": "Control concentrations, clamp voltages, initial state and duration."
        },
        {
          "text": "A single curve cannot identify barrier location, independent-particle count or detailed kinetic structure."
        }
      ],
      "modelAnswer": [
        "Use selective permeation for concentration-dependent reversal.",
        "Allow concentration or barrier contributions to static rectification.",
        "Use a dynamic gate for delayed activation and history.",
        "Control concentrations, clamp voltages, initial state and duration.",
        "A single curve cannot identify barrier location, independent-particle count or detailed kinetic structure."
      ],
      "points": 1,
      "source": "L06 PDF 19–21"
    },
    {
      "id": "L06-preactivated-clamp",
      "sectionId": "clamp",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "An idealized clamp step goes from $-20$ to $-60\\,\\mathrm{mV}$. Maximum gated conductance is $10\\,\\mathrm{nS}$, reversal $+20\\,\\mathrm{mV}$, initial activation $0.25$, new steady activation $0.75$ and time constant $50\\,\\mathrm{ms}$. After excluding capacitive current, the immediate total is $-0.8\\,\\mathrm{nA}$. Find immediate gated current and leak at the new voltage, then activation and total current at $100\\,\\mathrm{ms}$. Explain why the immediate jump cannot be assigned wholly to leak.",
      "stages": [
        {
          "title": "Continuity",
          "choices": [
            {
              "label": "The initial gate fraction is retained with the new driving force"
            },
            {
              "label": "The initial gated current is retained regardless of the new voltage"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The state variable is continuous, not generally the current."
          ]
        },
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "New voltage",
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
            },
            {
              "label": "Reversal",
              "answer": {
                "value": 0.02,
                "unit": "V",
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
              "label": "Maximum conductance",
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
            },
            {
              "label": "Initial activation",
              "answer": {
                "value": 0.25,
                "unit": "",
                "tolerance": 2.5e-07,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.25,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Elapsed time",
              "answer": {
                "value": 0.1,
                "unit": "s",
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
              "label": "Time constant",
              "answer": {
                "value": 0.05,
                "unit": "s",
                "tolerance": 5e-08,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.05,
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
          "title": "Fully activated current",
          "answer": {
            "value": -8e-10,
            "unit": "A",
            "tolerance": 2.4000000000000003e-12,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 1e-08,
                "b": -0.08
              },
              "displayScale": 1
            }
          },
          "tex": "I_{max}=\\bar g(V-E)",
          "modelAnswer": [
            "Use new voltage and selective reversal.",
            "$I_{max}=\\bar g(V-E)$",
            "$-8\\times10^{-10}\\,\\mathrm{A}$"
          ]
        },
        {
          "title": "Immediate gated current",
          "answer": {
            "value": -2e-10,
            "unit": "A",
            "tolerance": 6.000000000000001e-13,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": -8e-10,
                "b": 0.25
              },
              "displayScale": 1
            }
          },
          "tex": "I_y(0^+)=I_{max}y_0",
          "modelAnswer": [
            "Nonzero initial activation matters.",
            "$I_y(0^+)=I_{max}y_0$",
            "$-2\\times10^{-10}\\,\\mathrm{A}$"
          ]
        },
        {
          "title": "Leak at the new voltage",
          "answer": {
            "value": -6e-10,
            "unit": "A",
            "tolerance": 1.8e-12,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": -8e-10,
                "b": 2e-10
              },
              "displayScale": 1
            }
          },
          "tex": "I_L=I_{total}(0^+)-I_y(0^+)",
          "modelAnswer": [
            "Subtract signed gated current.",
            "$I_L=I_{total}(0^+)-I_y(0^+)$",
            "$-6\\times10^{-10}\\,\\mathrm{A}$"
          ],
          "commonErrors": [
            {
              "wrongValue": -1e-09,
              "tolerance": 1e-12,
              "why": "Subtract the negative gated contribution, rather than adding its inward magnitude.",
              "verification": {
                "relation": "sum",
                "inputs": {
                  "a": -8e-10,
                  "b": -2e-10
                }
              }
            }
          ]
        },
        {
          "title": "Later activation",
          "answer": {
            "value": 0.6823323583816936,
            "unit": "",
            "tolerance": 0.0020469970751450807,
            "verification": {
              "relation": "gateRelax",
              "inputs": {
                "y0": 0.25,
                "steady": 0.75,
                "time": 0.1,
                "tau": 0.05
              },
              "displayScale": 1
            }
          },
          "tex": "y=0.75+(0.25-0.75)e^{-0.100/0.050}",
          "modelAnswer": [
            "The later stage uses correct initial values.",
            "$y=0.75+(0.25-0.75)e^{-0.100/0.050}$",
            "$0.68233236$"
          ]
        },
        {
          "title": "Later total current",
          "answer": {
            "value": -1.145865886705355e-09,
            "unit": "A",
            "tolerance": 3.4375976601160647e-12,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": -5.458658867053549e-10,
                "b": -6e-10
              },
              "displayScale": 1
            }
          },
          "tex": "I_{total}=I_{max}y+I_L",
          "modelAnswer": [
            "Leak is fixed at the same clamp voltage.",
            "$I_{total}=I_{max}y+I_L$",
            "$-1.1458659\\times10^{-9}\\,\\mathrm{A}$"
          ]
        },
        {
          "title": "Inference",
          "choices": [
            {
              "label": "Finite gating kinetics do not make the rapid current purely leak"
            },
            {
              "label": "Finite gating kinetics guarantee the rapid current is purely leak"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The source inference needs initially negligible gated activation."
          ]
        }
      ],
      "hints": [
        {
          "body": "Activation stays continuous, but its current includes a new driving force. Subtract the gated contribution before inferring leak."
        },
        {
          "body": "Start with $V-E=-60\\,\\mathrm{mV}-20\\,\\mathrm{mV}$. Multiply by maximum conductance and initial activation; subtract this current from the immediate total before relaxing activation."
        }
      ],
      "modelAnswer": [
        "The state variable is continuous, not generally the current.",
        "Convert each stated quantity to the requested unit before evaluating.",
        "Use new voltage and selective reversal.",
        "Nonzero initial activation matters.",
        "Subtract signed gated current.",
        "The later stage uses correct initial values.",
        "Leak is fixed at the same clamp voltage.",
        "The source inference needs initially negligible gated activation."
      ],
      "points": 1,
      "source": "Exercise6 p1; solving instructions"
    },
    {
      "id": "L06-clamp-troubleshoot",
      "sectionId": "clamp",
      "difficulty": "hard",
      "type": "written",
      "prompt": "A colleague assigns every rapid clamp-current change to leak and every slow change to one channel. Audit both conclusions and propose a source-supported comparison.",
      "hints": [
        {
          "body": "Identify which observation concerns permeation, energetic position or changing channel state."
        },
        {
          "body": "Separate reversal, conductance and activation history; check whether one model can establish the requested inference on its own."
        }
      ],
      "markScheme": [
        {
          "text": "Separate the capacitive transient."
        },
        {
          "text": "Determine whether gated activation was negligible at the holding voltage."
        },
        {
          "text": "At nonzero initial activation the new driving force gives immediate gated current."
        },
        {
          "text": "Repeat from controlled initial activation and compare steady activation curves."
        },
        {
          "text": "Several components or changing conditions can undermine a unique-channel interpretation."
        }
      ],
      "modelAnswer": [
        "Separate the capacitive transient.",
        "Determine whether gated activation was negligible at the holding voltage.",
        "At nonzero initial activation the new driving force gives immediate gated current.",
        "Repeat from controlled initial activation and compare steady activation curves.",
        "Several components or changing conditions can undermine a unique-channel interpretation."
      ],
      "points": 1,
      "source": "Exercise6 p1; solving instructions",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Exercise 6, PDF page 1. Supplied Exercise6 voltage-clamp current/voltage traces and steady activation curve. Graph readings are approximate. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Exercise 6, PDF page 1. Supplied Exercise6 voltage-clamp current/voltage traces and steady activation curve. Graph readings are approximate. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L06/clamp.webp', import.meta.url).href,
          "alt": "Exercise 6, PDF page 1. Supplied Exercise6 voltage-clamp current/voltage traces and steady activation curve. Graph readings are approximate. Original labels, axes and scale bars retained.",
          "aspect": 1.9728682170542635,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L06-chord-model-inference",
      "sectionId": "chord",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "Stated idealized observations for one selective monovalent cation at 20°C: reversal $+25\\,\\mathrm{mV}$; current $-1.6\\,\\mathrm{nA}$ at $-15\\,\\mathrm{mV}$ and $+0.75\\,\\mathrm{nA}$ at $+75\\,\\mathrm{mV}$. Find both chord conductances, their inward/outward ratio and $C_i/C_o$ using the $58\\,\\mathrm{mV}$ shortcut. Assess GHK consistency without asserting unique identification.",
      "stages": [
        {
          "title": "Reference",
          "choices": [
            {
              "label": "$G=I/(V-E_{rev})$"
            },
            {
              "label": "$G=I/V$ regardless of reversal"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The chord begins at ionic reversal."
          ]
        },
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "First voltage",
              "answer": {
                "value": -0.015,
                "unit": "V",
                "tolerance": 1.5e-08,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -0.015,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Second voltage",
              "answer": {
                "value": 0.075,
                "unit": "V",
                "tolerance": 7.5e-08,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.075,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Reversal",
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
              "label": "First current",
              "answer": {
                "value": -1.6e-09,
                "unit": "A",
                "tolerance": 1.6e-15,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -1.6e-09,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Second current",
              "answer": {
                "value": 7.5e-10,
                "unit": "A",
                "tolerance": 7.5e-16,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 7.5e-10,
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
          "title": "Inward chord",
          "answer": {
            "value": 4e-08,
            "unit": "S",
            "tolerance": 1.2e-10,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": -1.6e-09,
                "b": -0.04
              },
              "displayScale": 1
            }
          },
          "tex": "G_1=(-1.6\\,\\mathrm{nA})/(-40\\,\\mathrm{mV})",
          "modelAnswer": [
            "Negative current and force yield positive conductance.",
            "$G_1=(-1.6\\,\\mathrm{nA})/(-40\\,\\mathrm{mV})$",
            "$4\\times10^{-8}\\,\\mathrm{S}$"
          ]
        },
        {
          "title": "Outward chord",
          "answer": {
            "value": 1.5e-08,
            "unit": "S",
            "tolerance": 4.5e-11,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 7.5e-10,
                "b": 0.05
              },
              "displayScale": 1
            }
          },
          "tex": "G_2=(0.75\\,\\mathrm{nA})/(50\\,\\mathrm{mV})",
          "modelAnswer": [
            "Compare chords rather than unequal raw currents.",
            "$G_2=(0.75\\,\\mathrm{nA})/(50\\,\\mathrm{mV})$",
            "$1.5\\times10^{-8}\\,\\mathrm{S}$"
          ]
        },
        {
          "title": "Conductance ratio",
          "answer": {
            "value": 2.6666666666666665,
            "unit": "",
            "tolerance": 0.008,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 4e-08,
                "b": 1.5e-08
              },
              "displayScale": 1
            }
          },
          "tex": "G_1/G_2=40/15",
          "modelAnswer": [
            "A ratio above one favors inward current.",
            "$G_1/G_2=40/15$",
            "$2.6666667$"
          ]
        },
        {
          "title": "Concentration ratio",
          "answer": {
            "value": 0.3706512910922155,
            "unit": "",
            "tolerance": 0.0011119538732766465,
            "verification": {
              "relation": "nernstRatio",
              "inputs": {
                "delta": -0.025,
                "shortcut": 0.058
              },
              "displayScale": 1
            }
          },
          "tex": "C_i/C_o=10^{-25/58}",
          "modelAnswer": [
            "Use the selective monovalent assumption.",
            "$C_i/C_o=10^{-25/58}$",
            "$0.37065129$"
          ]
        },
        {
          "title": "Model inference",
          "choices": [
            {
              "label": "Positive reversal and inward rectification are GHK-consistent but not unique"
            },
            {
              "label": "Positive reversal proves dynamic gating and rules out static permeation"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "An appropriately placed barrier can also explain this qualitative behavior."
          ]
        }
      ],
      "hints": [
        {
          "body": "Compute reversal-referenced chords, compare their conductances and invert the selective Nernst relation."
        },
        {
          "body": "First convert $-15\\,\\mathrm{mV}=-0.015\\,\\mathrm V$ and $25\\,\\mathrm{mV}=0.025\\,\\mathrm V$. Form both driving forces, divide currents, compare and use the inverse shortcut."
        }
      ],
      "modelAnswer": [
        "The chord begins at ionic reversal.",
        "Convert each stated quantity to the requested unit before evaluating.",
        "Negative current and force yield positive conductance.",
        "Compare chords rather than unequal raw currents.",
        "A ratio above one favors inward current.",
        "Use the selective monovalent assumption.",
        "An appropriately placed barrier can also explain this qualitative behavior."
      ],
      "points": 1,
      "source": "Exercise6 p2; solving instructions"
    }
  ],
  "mockExams": [
    {
      "id": "L06-mock-A",
      "title": "Mock A: infer kinetics and population current",
      "coverage": "Lectures 1–6. First-order rates, independent particles, population current and activation curves.",
      "questions": [
        {
          "id": "L06-a1",
          "type": "written",
          "difficulty": "medium",
          "prompt": "a) Define inward rectification. b) Distinguish a permissive particle from an open channel. c) Explain why an open Ohmic pore can belong to a nonlinear population. Answer each in 1–3 sentences.",
          "markScheme": [
            {
              "text": "Inward current flows more easily relative to its driving force."
            },
            {
              "text": "One particle can be permissive while other required particles are not."
            },
            {
              "text": "Voltage and time can change the open fraction."
            }
          ],
          "modelAnswer": [
            "Inward current flows more easily relative to its driving force.",
            "One particle can be permissive while other required particles are not.",
            "Voltage and time can change the open fraction."
          ],
          "hints": [
            {
              "body": "Identify the model assumptions and the variables that are controlled."
            },
            {
              "body": "Organize the requested subparts around permeation, driving force and gating state."
            }
          ],
          "points": 1,
          "source": "L06 PDF2,12–13,17"
        },
        {
          "id": "L06-a2",
          "type": "written",
          "difficulty": "medium",
          "prompt": "Derive first-order steady activation and the relaxation law from the state balance. Sketch the single-particle and all-required multi-particle curves. Explain which assumptions are needed for the power law.",
          "markScheme": [
            {
              "text": "$dy/dt=\\alpha-(\\alpha+\\beta)y$."
            },
            {
              "text": "Steady fraction is $\\alpha/(\\alpha+\\beta)$ and $\\tau=1/(\\alpha+\\beta)$."
            },
            {
              "text": "$y(t)=y_\\infty+(y_0-y_\\infty)e^{-t/\\tau}$."
            },
            {
              "text": "Label time and probability axes; preserve initial and final values."
            },
            {
              "text": "$Y=y^P$ requires identical independent particles all required permissive."
            },
            {
              "text": "Whole-channel activation can have a delayed rise without a delayed start in the particle transition."
            }
          ],
          "modelAnswer": [
            "$dy/dt=\\alpha-(\\alpha+\\beta)y$.",
            "Steady fraction is $\\alpha/(\\alpha+\\beta)$ and $\\tau=1/(\\alpha+\\beta)$.",
            "$y(t)=y_\\infty+(y_0-y_\\infty)e^{-t/\\tau}$.",
            "Label time and probability axes; preserve initial and final values.",
            "$Y=y^P$ requires identical independent particles all required permissive.",
            "Whole-channel activation can have a delayed rise without a delayed start in the particle transition."
          ],
          "hints": [
            {
              "body": "Identify the model assumptions and the variables that are controlled."
            },
            {
              "body": "Organize the requested subparts around permeation, driving force and gating state."
            }
          ],
          "points": 1,
          "source": "L06 PDF13,15,17"
        },
        {
          "id": "L06-a3",
          "sectionId": "steady",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "A fixed-voltage experiment gives steady particle activation $0.65$ and relaxation time $25\\,\\mathrm{ms}$. Infer opening and closing rates. A second condition doubles both rates without changing their ratio. Find its steady activation and time constant. Explain what can change without shifting the activation curve.",
          "stages": [
            {
              "title": "Choose relations",
              "choices": [
                {
                  "label": "$y_\\infty=\\alpha/(\\alpha+\\beta)$ and $\\tau=1/(\\alpha+\\beta)$"
                },
                {
                  "label": "$y_\\infty=\\beta/(\\alpha+\\beta)$ and $\\tau=\\alpha+\\beta$"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "Use the steady ratio and reciprocal rate sum."
              ]
            },
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "Steady fraction",
                  "answer": {
                    "value": 0.65,
                    "unit": "",
                    "tolerance": 6.5e-07,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 0.65,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Original time constant",
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
              "title": "Rate sum",
              "answer": {
                "value": 40,
                "unit": "1/s",
                "tolerance": 0.12,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1,
                    "b": 0.025
                  },
                  "displayScale": 1
                }
              },
              "tex": "s=1/\\tau",
              "modelAnswer": [
                "Convert time before taking its reciprocal.",
                "$s=1/\\tau$",
                "$40\\,\\mathrm{s^{-1}}$"
              ]
            },
            {
              "title": "Opening rate",
              "answer": {
                "value": 26,
                "unit": "1/s",
                "tolerance": 0.078,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 0.65,
                    "b": 40
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\alpha=y_\\infty s",
              "modelAnswer": [
                "Opening sets the numerator.",
                "$\\alpha=y_\\infty s$",
                "$26\\,\\mathrm{s^{-1}}$"
              ]
            },
            {
              "title": "Closing rate",
              "answer": {
                "value": 14,
                "unit": "1/s",
                "tolerance": 0.042,
                "verification": {
                  "relation": "sum",
                  "inputs": {
                    "a": 40,
                    "b": -26
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\beta=s-\\alpha",
              "modelAnswer": [
                "Subtract opening from the sum.",
                "$\\beta=s-\\alpha$",
                "$14\\,\\mathrm{s^{-1}}$"
              ]
            },
            {
              "title": "New steady fraction",
              "answer": {
                "value": 0.65,
                "unit": "",
                "tolerance": 0.0019500000000000001,
                "verification": {
                  "relation": "gateSteady",
                  "inputs": {
                    "alpha": 52,
                    "beta": 28
                  },
                  "displayScale": 1
                }
              },
              "tex": "y_{\\infty,new}=52/(52+28)",
              "modelAnswer": [
                "A common rate multiplier cancels.",
                "$y_{\\infty,new}=52/(52+28)$",
                "$0.65$"
              ]
            },
            {
              "title": "New time constant",
              "answer": {
                "value": 0.0125,
                "unit": "s",
                "tolerance": 3.7500000000000003e-05,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1,
                    "b": 80
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\tau_{new}=1/(52+28)",
              "modelAnswer": [
                "The common multiplier does not cancel here.",
                "$\\tau_{new}=1/(52+28)$",
                "$0.0125\\,\\mathrm{s}$"
              ]
            },
            {
              "title": "Interpretation",
              "choices": [
                {
                  "label": "Relaxation accelerates while steady activation remains unchanged"
                },
                {
                  "label": "Relaxation stays unchanged while steady activation must double"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "Steady-state and kinetic measurements constrain different combinations of rates."
              ]
            }
          ],
          "hints": [
            {
              "body": "Invert the time constant for the rate sum, then use the steady fraction."
            },
            {
              "body": "Begin with $25\\,\\mathrm{ms}=0.025\\,\\mathrm s$. Infer the rate sum, split it using the fraction and apply the common multiplier."
            }
          ],
          "modelAnswer": [
            "Use the steady ratio and reciprocal rate sum.",
            "Convert each stated quantity to the requested unit before evaluating.",
            "Convert time before taking its reciprocal.",
            "Opening sets the numerator.",
            "Subtract opening from the sum.",
            "A common rate multiplier cancels.",
            "The common multiplier does not cancel here.",
            "Steady-state and kinetic measurements constrain different combinations of rates."
          ],
          "points": 1,
          "source": "L06 PDF 15"
        },
        {
          "id": "L06-a4",
          "sectionId": "particles",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "After a step to $-50\\,\\mathrm{mV}$, each particle has $y_0=0.1$, $y_\\infty=0.7$, $\\tau=20\\,\\mathrm{ms}$. Three identical independent particles must all be permissive. Maximum population conductance is $8\\,\\mathrm{nS}$ and reversal is $+30\\,\\mathrm{mV}$. Find activation, open fraction and ionic current at $40\\,\\mathrm{ms}$. Explain why multiplying current by the particle fraction alone fails.",
          "stages": [
            {
              "title": "Select population rule",
              "choices": [
                {
                  "label": "$I=\\bar g y^3(V-E)$"
                },
                {
                  "label": "$I=\\bar g(3y)(V-E)$"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "All-required independent probabilities multiply."
              ]
            },
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "Time",
                  "answer": {
                    "value": 0.04,
                    "unit": "s",
                    "tolerance": 4e-08,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 0.04,
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
                },
                {
                  "label": "Maximum conductance",
                  "answer": {
                    "value": 8e-09,
                    "unit": "S",
                    "tolerance": 8e-15,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 8e-09,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Voltage",
                  "answer": {
                    "value": -0.05,
                    "unit": "V",
                    "tolerance": 5e-08,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": -0.05,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Reversal",
                  "answer": {
                    "value": 0.03,
                    "unit": "V",
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
                }
              ],
              "modelAnswer": [
                "Convert each stated quantity to the requested unit before evaluating."
              ]
            },
            {
              "title": "Particle activation",
              "answer": {
                "value": 0.6187988300580324,
                "unit": "",
                "tolerance": 0.0018563964901740972,
                "verification": {
                  "relation": "gateRelax",
                  "inputs": {
                    "y0": 0.1,
                    "steady": 0.7,
                    "time": 0.04,
                    "tau": 0.02
                  },
                  "displayScale": 1
                }
              },
              "tex": "y=0.7+(0.1-0.7)e^{-0.040/0.020}",
              "modelAnswer": [
                "Use correct prior values for later stages.",
                "$y=0.7+(0.1-0.7)e^{-0.040/0.020}$",
                "$0.61879883$"
              ]
            },
            {
              "title": "Whole-channel fraction",
              "answer": {
                "value": 0.2369454927150307,
                "unit": "",
                "tolerance": 0.0007108364781450922,
                "verification": {
                  "relation": "gatePower",
                  "inputs": {
                    "y": 0.6187988300580324,
                    "count": 3
                  },
                  "displayScale": 1
                }
              },
              "tex": "Y=y^3",
              "modelAnswer": [
                "The fraction is smaller than a single-particle probability.",
                "$Y=y^3$",
                "$0.23694549$"
              ]
            },
            {
              "title": "Open conductance",
              "answer": {
                "value": 1.895563941720246e-09,
                "unit": "S",
                "tolerance": 5.686691825160738e-12,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 8e-09,
                    "b": 0.2369454927150307
                  },
                  "displayScale": 1
                }
              },
              "tex": "g=\\bar gY",
              "modelAnswer": [
                "Convert the maximum conductance to SI.",
                "$g=\\bar gY$",
                "$1.8955639\\times10^{-9}\\,\\mathrm{S}$"
              ]
            },
            {
              "title": "Driving force",
              "answer": {
                "value": -0.08,
                "unit": "V",
                "tolerance": 0.00024,
                "verification": {
                  "relation": "sum",
                  "inputs": {
                    "a": -0.05,
                    "b": -0.03
                  },
                  "displayScale": 1
                }
              },
              "tex": "V-E=-0.050-0.030",
              "modelAnswer": [
                "A negative driving force gives inward cation current.",
                "$V-E=-0.050-0.030$",
                "$-0.08\\,\\mathrm{V}$"
              ]
            },
            {
              "title": "Ionic current",
              "answer": {
                "value": -1.5164511533761968e-10,
                "unit": "A",
                "tolerance": 4.54935346012859e-13,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 1.895563941720246e-09,
                    "b": -0.08
                  },
                  "displayScale": 1
                }
              },
              "tex": "I=g(V-E)",
              "modelAnswer": [
                "The current retains the inward sign.",
                "$I=g(V-E)$",
                "$-1.5164512\\times10^{-10}\\,\\mathrm{A}$"
              ]
            },
            {
              "title": "Interpretation",
              "choices": [
                {
                  "label": "The product rule suppresses opening relative to a single permissive particle"
                },
                {
                  "label": "Three required particles make the probability three times one particle"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "Do not replace an all-required rule with a sum."
              ]
            }
          ],
          "hints": [
            {
              "body": "Use exponential particle activation, the all-required probability and the Ohmic open-pore current."
            },
            {
              "body": "Start with $40\\,\\mathrm{ms}=0.040\\,\\mathrm s$ and $20\\,\\mathrm{ms}=0.020\\,\\mathrm s$. Evaluate particle activation, apply the power, then conductance and driving force."
            }
          ],
          "modelAnswer": [
            "All-required independent probabilities multiply.",
            "Convert each stated quantity to the requested unit before evaluating.",
            "Use correct prior values for later stages.",
            "The fraction is smaller than a single-particle probability.",
            "Convert the maximum conductance to SI.",
            "A negative driving force gives inward cation current.",
            "The current retains the inward sign.",
            "Do not replace an all-required rule with a sum."
          ],
          "points": 1,
          "source": "L06 PDF 17"
        },
        {
          "id": "L06-a5",
          "type": "written",
          "difficulty": "medium",
          "prompt": "Read the supplied activation panel. Identify which curve is activated by each voltage direction. Design a clamp comparison measuring kinetics and explain why a steady activation curve alone does not determine current sign.",
          "markScheme": [
            {
              "text": "The increasing curve is depolarization activated."
            },
            {
              "text": "The decreasing curve is hyperpolarization activated."
            },
            {
              "text": "Control holding voltage and compare step responses at fixed test voltages."
            },
            {
              "text": "Measure the approach as well as steady activation."
            },
            {
              "text": "Current sign also needs ionic reversal and driving force."
            }
          ],
          "modelAnswer": [
            "The increasing curve is depolarization activated.",
            "The decreasing curve is hyperpolarization activated.",
            "Control holding voltage and compare step responses at fixed test voltages.",
            "Measure the approach as well as steady activation.",
            "Current sign also needs ionic reversal and driving force."
          ],
          "hints": [
            {
              "body": "Identify the model assumptions and the variables that are controlled."
            },
            {
              "body": "Organize the requested subparts around permeation, driving force and gating state."
            }
          ],
          "points": 1,
          "source": "L06 PDF16–17; Exercise6 p1",
          "figure": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 6, PDF page 16. Source rate and activation curves: depolarization activation above, hyperpolarization activation below. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 6, PDF page 16. Source rate and activation curves: depolarization activation above, hyperpolarization activation below. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L06/activation.webp', import.meta.url).href,
              "alt": "Lecture 6, PDF page 16. Source rate and activation curves: depolarization activation above, hyperpolarization activation below. Original labels, axes and scale bars retained.",
              "aspect": 1.7243510506798516,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ]
    },
    {
      "id": "L06-mock-B",
      "title": "Mock B: distinguish barrier and gradient rectification",
      "coverage": "Lectures 1–6. Energy barriers, directional flux, reversal-based conductance and selective concentration inference.",
      "questions": [
        {
          "id": "L06-b1",
          "type": "written",
          "difficulty": "medium",
          "prompt": "a) Define partition coefficient. b) What violates independent passage? c) Where is a barrier at location zero? Answer briefly.",
          "markScheme": [
            {
              "text": "Channel concentration divided by surrounding concentration."
            },
            {
              "text": "Saturation or flux coupling can violate independent passage."
            },
            {
              "text": "Zero is the inner margin, measured from inside."
            }
          ],
          "modelAnswer": [
            "Channel concentration divided by surrounding concentration.",
            "Saturation or flux coupling can violate independent passage.",
            "Zero is the inner margin, measured from inside."
          ],
          "hints": [
            {
              "body": "Identify the model assumptions and the variables that are controlled."
            },
            {
              "body": "Organize the requested subparts around permeation, driving force and gating state."
            }
          ],
          "points": 1,
          "source": "L06 PDF5,7"
        },
        {
          "id": "L06-b2",
          "type": "written",
          "difficulty": "medium",
          "prompt": "Compare concentration-gradient rectification with barrier-position rectification. Derive why the selective reversal can be independent of barrier location while the current shape is not. Sketch the inner and outer barrier cases.",
          "markScheme": [
            {
              "text": "GHK rectification is constrained by concentration gradient and reversal sign."
            },
            {
              "text": "Barrier placement changes the voltage dependence of the two directional terms."
            },
            {
              "text": "At zero current, $e^{zFV/(RT)}=C_o/C_i$, with location cancelled."
            },
            {
              "text": "At nonzero current the separate terms retain location."
            },
            {
              "text": "For positive ions, outer position favors outward and inner position inward rectification."
            },
            {
              "text": "Label inside/outside and voltage/current polarity in the sketch."
            }
          ],
          "modelAnswer": [
            "GHK rectification is constrained by concentration gradient and reversal sign.",
            "Barrier placement changes the voltage dependence of the two directional terms.",
            "At zero current, $e^{zFV/(RT)}=C_o/C_i$, with location cancelled.",
            "At nonzero current the separate terms retain location.",
            "For positive ions, outer position favors outward and inner position inward rectification.",
            "Label inside/outside and voltage/current polarity in the sketch."
          ],
          "hints": [
            {
              "body": "Identify the model assumptions and the variables that are controlled."
            },
            {
              "body": "Organize the requested subparts around permeation, driving force and gating state."
            }
          ],
          "points": 1,
          "source": "L06 PDF3,7–9"
        },
        {
          "id": "L06-b3",
          "sectionId": "position",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "An ideal monovalent-cation pore has equal concentrations $40\\,\\mathrm{mol/m^3}$, partition coefficient $0.5$, $k_0=2\\times10^{-6}\\,\\mathrm{m/s}$ and inner-side barrier location $\\delta=0.2$. The voltage satisfies $zFV_m/(RT)=-1$. Find the crossing coefficients, fluxes and outward current density. Then double both concentrations. What changes and what remains unchanged?",
          "stages": [
            {
              "title": "Choose voltage signs",
              "choices": [
                {
                  "label": "$k_1=k_0 e^{0.8}$, $k_2=k_0e^{-0.2}$"
                },
                {
                  "label": "$k_1=k_0 e^{-0.8}$, $k_2=k_0e^{0.2}$"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "The negative voltage favors inward crossing for positive ions."
              ]
            },
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "Baseline coefficient",
                  "answer": {
                    "value": 2e-06,
                    "unit": "m/s",
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
                  "label": "Source concentration",
                  "answer": {
                    "value": 40,
                    "unit": "mol/m3",
                    "tolerance": 3.9999999999999996e-05,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 40,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Partition coefficient",
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
              "title": "Inward coefficient",
              "answer": {
                "value": 4.451081856984936e-06,
                "unit": "m/s",
                "tolerance": 1.3353245570954808e-08,
                "verification": {
                  "relation": "exponentialRate",
                  "inputs": {
                    "base": 2e-06,
                    "exponent": 0.8
                  },
                  "displayScale": 1
                }
              },
              "tex": "k_1=k_0e^{0.8}",
              "modelAnswer": [
                "Use the distance from the outer side for inward crossing.",
                "$k_1=k_0e^{0.8}$",
                "$4.4510819\\times10^{-6}\\,\\mathrm{m/s}$"
              ]
            },
            {
              "title": "Outward coefficient",
              "answer": {
                "value": 1.6374615061559637e-06,
                "unit": "m/s",
                "tolerance": 4.912384518467891e-09,
                "verification": {
                  "relation": "exponentialRate",
                  "inputs": {
                    "base": 2e-06,
                    "exponent": -0.2
                  },
                  "displayScale": 1
                }
              },
              "tex": "k_2=k_0e^{-0.2}",
              "modelAnswer": [
                "Use the location from inside for outward crossing.",
                "$k_2=k_0e^{-0.2}$",
                "$1.6374615\\times10^{-6}\\,\\mathrm{m/s}$"
              ]
            },
            {
              "title": "Inward flux",
              "answer": {
                "value": 8.902163713969872e-05,
                "unit": "mol/m2/s",
                "tolerance": 2.6706491141909616e-07,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 4.451081856984936e-06,
                    "b": 20
                  },
                  "displayScale": 1
                }
              },
              "tex": "J_{in}=k_1\\beta_p C_o",
              "modelAnswer": [
                "Partition multiplies concentration.",
                "$J_{in}=k_1\\beta_p C_o$",
                "$8.9021637\\times10^{-5}\\,\\mathrm{mol/(m^2s)}$"
              ]
            },
            {
              "title": "Outward flux",
              "answer": {
                "value": 3.274923012311927e-05,
                "unit": "mol/m2/s",
                "tolerance": 9.824769036935782e-08,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 1.6374615061559637e-06,
                    "b": 20
                  },
                  "displayScale": 1
                }
              },
              "tex": "J_{out}=k_2\\beta_p C_i",
              "modelAnswer": [
                "Retain the separate directional coefficient.",
                "$J_{out}=k_2\\beta_p C_i$",
                "$3.274923\\times10^{-5}\\,\\mathrm{mol/(m^2s)}$"
              ]
            },
            {
              "title": "Net current density",
              "answer": {
                "value": -5.429443190994668,
                "unit": "A/m2",
                "tolerance": 0.016288329572984005,
                "verification": {
                  "relation": "fluxCurrent",
                  "inputs": {
                    "flux": -5.627240701657945e-05,
                    "z": 1,
                    "f": 96485
                  },
                  "displayScale": 1
                }
              },
              "tex": "j=F(J_{out}-J_{in})",
              "modelAnswer": [
                "Inward flux is subtracted.",
                "$j=F(J_{out}-J_{in})$",
                "$-5.4294432\\,\\mathrm{A/m^2}$"
              ]
            },
            {
              "title": "Doubled-concentration current",
              "answer": {
                "value": -10.858886381989336,
                "unit": "A/m2",
                "tolerance": 0.03257665914596801,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": -5.429443190994668,
                    "b": 2
                  },
                  "displayScale": 1
                }
              },
              "tex": "j_{new}=2j",
              "modelAnswer": [
                "Both directional fluxes scale.",
                "$j_{new}=2j$",
                "$-10.858886\\,\\mathrm{A/m^2}$"
              ]
            },
            {
              "title": "Reversal",
              "choices": [
                {
                  "label": "Reversal remains zero because the concentration ratio remains one"
                },
                {
                  "label": "Reversal doubles because the absolute current density doubles"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "Scaling both concentrations scales current but not selective reversal."
              ]
            }
          ],
          "hints": [
            {
              "body": "Use voltage-tilted barrier coefficients, then directional fluxes and outward-current subtraction."
            },
            {
              "body": "Insert $zFV_m/(RT)=-1$ into $-(1-0.2)zFV_m/(RT)$ and $0.2zFV_m/(RT)$. Then multiply by partition and concentration before subtracting fluxes."
            }
          ],
          "modelAnswer": [
            "The negative voltage favors inward crossing for positive ions.",
            "Convert each stated quantity to the requested unit before evaluating.",
            "Use the distance from the outer side for inward crossing.",
            "Use the location from inside for outward crossing.",
            "Partition multiplies concentration.",
            "Retain the separate directional coefficient.",
            "Inward flux is subtracted.",
            "Both directional fluxes scale.",
            "Scaling both concentrations scales current but not selective reversal."
          ],
          "points": 1,
          "source": "L06 PDF 8"
        },
        {
          "id": "L06-b4",
          "sectionId": "chord",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "Stated idealized observations for one selective monovalent cation at 20°C: reversal $+25\\,\\mathrm{mV}$; current $-1.6\\,\\mathrm{nA}$ at $-15\\,\\mathrm{mV}$ and $+0.75\\,\\mathrm{nA}$ at $+75\\,\\mathrm{mV}$. Find both chord conductances, their inward/outward ratio and $C_i/C_o$ using the $58\\,\\mathrm{mV}$ shortcut. Assess GHK consistency without asserting unique identification.",
          "stages": [
            {
              "title": "Reference",
              "choices": [
                {
                  "label": "$G=I/(V-E_{rev})$"
                },
                {
                  "label": "$G=I/V$ regardless of reversal"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "The chord begins at ionic reversal."
              ]
            },
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "First voltage",
                  "answer": {
                    "value": -0.015,
                    "unit": "V",
                    "tolerance": 1.5e-08,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": -0.015,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Second voltage",
                  "answer": {
                    "value": 0.075,
                    "unit": "V",
                    "tolerance": 7.5e-08,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 0.075,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Reversal",
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
                  "label": "First current",
                  "answer": {
                    "value": -1.6e-09,
                    "unit": "A",
                    "tolerance": 1.6e-15,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": -1.6e-09,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Second current",
                  "answer": {
                    "value": 7.5e-10,
                    "unit": "A",
                    "tolerance": 7.5e-16,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 7.5e-10,
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
              "title": "Inward chord",
              "answer": {
                "value": 4e-08,
                "unit": "S",
                "tolerance": 1.2e-10,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -1.6e-09,
                    "b": -0.04
                  },
                  "displayScale": 1
                }
              },
              "tex": "G_1=(-1.6\\,\\mathrm{nA})/(-40\\,\\mathrm{mV})",
              "modelAnswer": [
                "Negative current and force yield positive conductance.",
                "$G_1=(-1.6\\,\\mathrm{nA})/(-40\\,\\mathrm{mV})$",
                "$4\\times10^{-8}\\,\\mathrm{S}$"
              ]
            },
            {
              "title": "Outward chord",
              "answer": {
                "value": 1.5e-08,
                "unit": "S",
                "tolerance": 4.5e-11,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 7.5e-10,
                    "b": 0.05
                  },
                  "displayScale": 1
                }
              },
              "tex": "G_2=(0.75\\,\\mathrm{nA})/(50\\,\\mathrm{mV})",
              "modelAnswer": [
                "Compare chords rather than unequal raw currents.",
                "$G_2=(0.75\\,\\mathrm{nA})/(50\\,\\mathrm{mV})$",
                "$1.5\\times10^{-8}\\,\\mathrm{S}$"
              ]
            },
            {
              "title": "Conductance ratio",
              "answer": {
                "value": 2.6666666666666665,
                "unit": "",
                "tolerance": 0.008,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 4e-08,
                    "b": 1.5e-08
                  },
                  "displayScale": 1
                }
              },
              "tex": "G_1/G_2=40/15",
              "modelAnswer": [
                "A ratio above one favors inward current.",
                "$G_1/G_2=40/15$",
                "$2.6666667$"
              ]
            },
            {
              "title": "Concentration ratio",
              "answer": {
                "value": 0.3706512910922155,
                "unit": "",
                "tolerance": 0.0011119538732766465,
                "verification": {
                  "relation": "nernstRatio",
                  "inputs": {
                    "delta": -0.025,
                    "shortcut": 0.058
                  },
                  "displayScale": 1
                }
              },
              "tex": "C_i/C_o=10^{-25/58}",
              "modelAnswer": [
                "Use the selective monovalent assumption.",
                "$C_i/C_o=10^{-25/58}$",
                "$0.37065129$"
              ]
            },
            {
              "title": "Model inference",
              "choices": [
                {
                  "label": "Positive reversal and inward rectification are GHK-consistent but not unique"
                },
                {
                  "label": "Positive reversal proves dynamic gating and rules out static permeation"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "An appropriately placed barrier can also explain this qualitative behavior."
              ]
            }
          ],
          "hints": [
            {
              "body": "Compute reversal-referenced chords, compare their conductances and invert the selective Nernst relation."
            },
            {
              "body": "First convert $-15\\,\\mathrm{mV}=-0.015\\,\\mathrm V$ and $25\\,\\mathrm{mV}=0.025\\,\\mathrm V$. Form both driving forces, divide currents, compare and use the inverse shortcut."
            }
          ],
          "modelAnswer": [
            "The chord begins at ionic reversal.",
            "Convert each stated quantity to the requested unit before evaluating.",
            "Negative current and force yield positive conductance.",
            "Compare chords rather than unequal raw currents.",
            "A ratio above one favors inward current.",
            "Use the selective monovalent assumption.",
            "An appropriately placed barrier can also explain this qualitative behavior."
          ],
          "points": 1,
          "source": "Exercise6 p2; solving instructions"
        },
        {
          "id": "L06-b5",
          "type": "written",
          "difficulty": "medium",
          "prompt": "Use the supplied nonlinear current–voltage plot as qualitative evidence. Explain how to estimate reversal and chord conductance, distinguish the local slope, and state why GHK consistency is not unique mechanistic proof.",
          "markScheme": [
            {
              "text": "Reversal is the voltage at zero current."
            },
            {
              "text": "A chord connects that reversal to a chosen point."
            },
            {
              "text": "The local differential slope is a tangent, not that chord."
            },
            {
              "text": "The source curve favors inward conductance and has positive reversal."
            },
            {
              "text": "A positive-ion concentration gradient fits GHK, but an appropriate barrier can fit too."
            },
            {
              "text": "Readings are approximate; do not invent precise sample values."
            }
          ],
          "modelAnswer": [
            "Reversal is the voltage at zero current.",
            "A chord connects that reversal to a chosen point.",
            "The local differential slope is a tangent, not that chord.",
            "The source curve favors inward conductance and has positive reversal.",
            "A positive-ion concentration gradient fits GHK, but an appropriate barrier can fit too.",
            "Readings are approximate; do not invent precise sample values."
          ],
          "hints": [
            {
              "body": "Identify the model assumptions and the variables that are controlled."
            },
            {
              "body": "Organize the requested subparts around permeation, driving force and gating state."
            }
          ],
          "points": 1,
          "source": "Exercise6 p2; L06 PDF3,8–9",
          "figure": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Exercise 6, PDF page 2. Supplied Exercise6 nonlinear current–voltage curve, with original axes. Graph readings are approximate. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Exercise 6, PDF page 2. Supplied Exercise6 nonlinear current–voltage curve, with original axes. Graph readings are approximate. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L06/chord.webp', import.meta.url).href,
              "alt": "Exercise 6, PDF page 2. Supplied Exercise6 nonlinear current–voltage curve, with original axes. Graph readings are approximate. Original labels, axes and scale bars retained.",
              "aspect": 2.0183968462549275,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ]
    },
    {
      "id": "L06-mock-C",
      "title": "Mock C: troubleshoot current jumps and unchanged activation",
      "coverage": "Lectures 1–6. Nonzero initial activation, current decomposition, barrier relocation and kinetic/steady identifiability.",
      "questions": [
        {
          "id": "L06-c1",
          "type": "written",
          "difficulty": "medium",
          "prompt": "a) Is depolarization necessarily a positive inside potential? b) What is continuous across an ideal finite-rate gating step? c) Distinguish the permeation and gating barriers.",
          "markScheme": [
            {
              "text": "No, a less negative potential is also depolarization."
            },
            {
              "text": "The gating state is continuous; current can jump with driving force."
            },
            {
              "text": "The moving particles are permeating ions versus gating charges within the channel."
            }
          ],
          "modelAnswer": [
            "No, a less negative potential is also depolarization.",
            "The gating state is continuous; current can jump with driving force.",
            "The moving particles are permeating ions versus gating charges within the channel."
          ],
          "hints": [
            {
              "body": "Identify the model assumptions and the variables that are controlled."
            },
            {
              "body": "Organize the requested subparts around permeation, driving force and gating state."
            }
          ],
          "points": 1,
          "source": "L06 PDF11–14,17"
        },
        {
          "id": "L06-c2",
          "type": "written",
          "difficulty": "medium",
          "prompt": "A kinetic modification leaves the steady activation curve unchanged but speeds the response. Explain a source-supported barrier change that can do this, derive the rate-ratio cancellation and discuss why this does not identify a unique molecular mechanism.",
          "markScheme": [
            {
              "text": "Keep zero-voltage rate coefficients and state-energy difference fixed."
            },
            {
              "text": "Moving barrier location changes both transition rates by a common factor at a fixed voltage."
            },
            {
              "text": "That factor cancels from the steady fraction."
            },
            {
              "text": "It remains in the rate sum and changes the time constant."
            },
            {
              "text": "Other common-rate changes could have similar observations."
            },
            {
              "text": "Compare responses over several voltages and controlled initial conditions."
            }
          ],
          "modelAnswer": [
            "Keep zero-voltage rate coefficients and state-energy difference fixed.",
            "Moving barrier location changes both transition rates by a common factor at a fixed voltage.",
            "That factor cancels from the steady fraction.",
            "It remains in the rate sum and changes the time constant.",
            "Other common-rate changes could have similar observations.",
            "Compare responses over several voltages and controlled initial conditions."
          ],
          "hints": [
            {
              "body": "Identify the model assumptions and the variables that are controlled."
            },
            {
              "body": "Organize the requested subparts around permeation, driving force and gating state."
            }
          ],
          "points": 1,
          "source": "L06 PDF15–17"
        },
        {
          "id": "L06-c3",
          "sectionId": "clamp",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "An idealized clamp step goes from $-20$ to $-60\\,\\mathrm{mV}$. Maximum gated conductance is $10\\,\\mathrm{nS}$, reversal $+20\\,\\mathrm{mV}$, initial activation $0.25$, new steady activation $0.75$ and time constant $50\\,\\mathrm{ms}$. After excluding capacitive current, the immediate total is $-0.8\\,\\mathrm{nA}$. Find immediate gated current and leak at the new voltage, then activation and total current at $100\\,\\mathrm{ms}$. Explain why the immediate jump cannot be assigned wholly to leak.",
          "stages": [
            {
              "title": "Continuity",
              "choices": [
                {
                  "label": "The initial gate fraction is retained with the new driving force"
                },
                {
                  "label": "The initial gated current is retained regardless of the new voltage"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "The state variable is continuous, not generally the current."
              ]
            },
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "New voltage",
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
                },
                {
                  "label": "Reversal",
                  "answer": {
                    "value": 0.02,
                    "unit": "V",
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
                  "label": "Maximum conductance",
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
                },
                {
                  "label": "Initial activation",
                  "answer": {
                    "value": 0.25,
                    "unit": "",
                    "tolerance": 2.5e-07,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 0.25,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Elapsed time",
                  "answer": {
                    "value": 0.1,
                    "unit": "s",
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
                  "label": "Time constant",
                  "answer": {
                    "value": 0.05,
                    "unit": "s",
                    "tolerance": 5e-08,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 0.05,
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
              "title": "Fully activated current",
              "answer": {
                "value": -8e-10,
                "unit": "A",
                "tolerance": 2.4000000000000003e-12,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 1e-08,
                    "b": -0.08
                  },
                  "displayScale": 1
                }
              },
              "tex": "I_{max}=\\bar g(V-E)",
              "modelAnswer": [
                "Use new voltage and selective reversal.",
                "$I_{max}=\\bar g(V-E)$",
                "$-8\\times10^{-10}\\,\\mathrm{A}$"
              ]
            },
            {
              "title": "Immediate gated current",
              "answer": {
                "value": -2e-10,
                "unit": "A",
                "tolerance": 6.000000000000001e-13,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": -8e-10,
                    "b": 0.25
                  },
                  "displayScale": 1
                }
              },
              "tex": "I_y(0^+)=I_{max}y_0",
              "modelAnswer": [
                "Nonzero initial activation matters.",
                "$I_y(0^+)=I_{max}y_0$",
                "$-2\\times10^{-10}\\,\\mathrm{A}$"
              ]
            },
            {
              "title": "Leak at the new voltage",
              "answer": {
                "value": -6e-10,
                "unit": "A",
                "tolerance": 1.8e-12,
                "verification": {
                  "relation": "sum",
                  "inputs": {
                    "a": -8e-10,
                    "b": 2e-10
                  },
                  "displayScale": 1
                }
              },
              "tex": "I_L=I_{total}(0^+)-I_y(0^+)",
              "modelAnswer": [
                "Subtract signed gated current.",
                "$I_L=I_{total}(0^+)-I_y(0^+)$",
                "$-6\\times10^{-10}\\,\\mathrm{A}$"
              ],
              "commonErrors": [
                {
                  "wrongValue": -1e-09,
                  "tolerance": 1e-12,
                  "why": "Subtract the negative gated contribution, rather than adding its inward magnitude.",
                  "verification": {
                    "relation": "sum",
                    "inputs": {
                      "a": -8e-10,
                      "b": -2e-10
                    }
                  }
                }
              ]
            },
            {
              "title": "Later activation",
              "answer": {
                "value": 0.6823323583816936,
                "unit": "",
                "tolerance": 0.0020469970751450807,
                "verification": {
                  "relation": "gateRelax",
                  "inputs": {
                    "y0": 0.25,
                    "steady": 0.75,
                    "time": 0.1,
                    "tau": 0.05
                  },
                  "displayScale": 1
                }
              },
              "tex": "y=0.75+(0.25-0.75)e^{-0.100/0.050}",
              "modelAnswer": [
                "The later stage uses correct initial values.",
                "$y=0.75+(0.25-0.75)e^{-0.100/0.050}$",
                "$0.68233236$"
              ]
            },
            {
              "title": "Later total current",
              "answer": {
                "value": -1.145865886705355e-09,
                "unit": "A",
                "tolerance": 3.4375976601160647e-12,
                "verification": {
                  "relation": "sum",
                  "inputs": {
                    "a": -5.458658867053549e-10,
                    "b": -6e-10
                  },
                  "displayScale": 1
                }
              },
              "tex": "I_{total}=I_{max}y+I_L",
              "modelAnswer": [
                "Leak is fixed at the same clamp voltage.",
                "$I_{total}=I_{max}y+I_L$",
                "$-1.1458659\\times10^{-9}\\,\\mathrm{A}$"
              ]
            },
            {
              "title": "Inference",
              "choices": [
                {
                  "label": "Finite gating kinetics do not make the rapid current purely leak"
                },
                {
                  "label": "Finite gating kinetics guarantee the rapid current is purely leak"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "The source inference needs initially negligible gated activation."
              ]
            }
          ],
          "hints": [
            {
              "body": "Activation stays continuous, but its current includes a new driving force. Subtract the gated contribution before inferring leak."
            },
            {
              "body": "Start with $V-E=-60\\,\\mathrm{mV}-20\\,\\mathrm{mV}$. Multiply by maximum conductance and initial activation; subtract this current from the immediate total before relaxing activation."
            }
          ],
          "modelAnswer": [
            "The state variable is continuous, not generally the current.",
            "Convert each stated quantity to the requested unit before evaluating.",
            "Use new voltage and selective reversal.",
            "Nonzero initial activation matters.",
            "Subtract signed gated current.",
            "The later stage uses correct initial values.",
            "Leak is fixed at the same clamp voltage.",
            "The source inference needs initially negligible gated activation."
          ],
          "points": 1,
          "source": "Exercise6 p1; solving instructions"
        },
        {
          "id": "L06-c4",
          "sectionId": "steady",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "For the source positive gating charge, hold $zFV/(RT)=0.8$, $\\alpha_0=20$ and $\\beta_0=30\\,\\mathrm{s^{-1}}$ fixed. Move $\\delta$ from $0.25$ to $0.75$ without changing the baseline state energies. Find both new rates, steady activation and old/new time constants. Starting at $y_0=0.1$, find new activation at $20\\,\\mathrm{ms}$. Explain which part of the behavior changed.",
          "stages": [
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "Baseline opening",
                  "answer": {
                    "value": 20,
                    "unit": "1/s",
                    "tolerance": 1.9999999999999998e-05,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 20,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Baseline closing",
                  "answer": {
                    "value": 30,
                    "unit": "1/s",
                    "tolerance": 2.9999999999999997e-05,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 30,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "New location",
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
                }
              ],
              "modelAnswer": [
                "Convert each stated quantity to the requested unit before evaluating."
              ]
            },
            {
              "title": "New opening rate",
              "answer": {
                "value": 36.44237600781018,
                "unit": "1/s",
                "tolerance": 0.10932712802343054,
                "verification": {
                  "relation": "exponentialRate",
                  "inputs": {
                    "base": 20,
                    "exponent": 0.6000000000000001
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\alpha=20e^{0.75(0.8)}",
              "modelAnswer": [
                "Use the new location in the opening exponent.",
                "$\\alpha=20e^{0.75(0.8)}$",
                "$36.442376\\,\\mathrm{s^{-1}}$"
              ]
            },
            {
              "title": "New closing rate",
              "answer": {
                "value": 24.561922592339453,
                "unit": "1/s",
                "tolerance": 0.07368576777701837,
                "verification": {
                  "relation": "exponentialRate",
                  "inputs": {
                    "base": 30,
                    "exponent": -0.2
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\beta=30e^{-(1-0.75)(0.8)}",
              "modelAnswer": [
                "Closing uses the complementary location.",
                "$\\beta=30e^{-(1-0.75)(0.8)}$",
                "$24.561923\\,\\mathrm{s^{-1}}$"
              ]
            },
            {
              "title": "Steady activation",
              "answer": {
                "value": 0.5973739038730755,
                "unit": "",
                "tolerance": 0.0017921217116192267,
                "verification": {
                  "relation": "gateSteady",
                  "inputs": {
                    "alpha": 36.44237600781018,
                    "beta": 24.561922592339453
                  },
                  "displayScale": 1
                }
              },
              "tex": "y_\\infty=\\alpha/(\\alpha+\\beta)",
              "modelAnswer": [
                "The location factor cancels in the ratio.",
                "$y_\\infty=\\alpha/(\\alpha+\\beta)$",
                "$0.5973739$"
              ]
            },
            {
              "title": "Old time constant",
              "answer": {
                "value": 0.024454419309356854,
                "unit": "s",
                "tolerance": 7.336325792807057e-05,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1,
                    "b": 40.892404246024185
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\tau_{old}=1/[20e^{0.25(0.8)}+30e^{-0.75(0.8)}]",
              "modelAnswer": [
                "Use the original rates for this comparison.",
                "$\\tau_{old}=1/[20e^{0.25(0.8)}+30e^{-0.75(0.8)}]$",
                "$0.024454419\\,\\mathrm{s}$"
              ]
            },
            {
              "title": "New time constant",
              "answer": {
                "value": 0.01639228747722291,
                "unit": "s",
                "tolerance": 4.917686243166873e-05,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1,
                    "b": 61.00429860014964
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\tau_{new}=1/(\\alpha+\\beta)",
              "modelAnswer": [
                "The common multiplier remains in the sum.",
                "$\\tau_{new}=1/(\\alpha+\\beta)$",
                "$0.016392287\\,\\mathrm{s}$"
              ]
            },
            {
              "title": "New activation at the stated time",
              "answer": {
                "value": 0.4505467467763971,
                "unit": "",
                "tolerance": 0.0013516402403291913,
                "verification": {
                  "relation": "gateRelax",
                  "inputs": {
                    "y0": 0.1,
                    "steady": 0.5973739038730755,
                    "time": 0.02,
                    "tau": 0.01639228747722291
                  },
                  "displayScale": 1
                }
              },
              "tex": "y=y_\\infty+(0.1-y_\\infty)e^{-0.020/\\tau_{new}}",
              "modelAnswer": [
                "Use the new kinetic scale.",
                "$y=y_\\infty+(0.1-y_\\infty)e^{-0.020/\\tau_{new}}$",
                "$0.45054675$"
              ]
            },
            {
              "title": "Interpretation",
              "choices": [
                {
                  "label": "The steady activation is unchanged but relaxation is faster"
                },
                {
                  "label": "The relaxation is unchanged but steady activation is larger"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "This prediction requires fixed baseline coefficients, not arbitrary energy changes."
              ]
            }
          ],
          "hints": [
            {
              "body": "Insert barrier locations into both exponential rates; compare their ratio and sum."
            },
            {
              "body": "Start with $\\alpha_{new}=20e^{0.75(0.8)}\\,\\mathrm{s^{-1}}$. Evaluate closing separately, then fraction, times and finite-time activation."
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating.",
            "Use the new location in the opening exponent.",
            "Closing uses the complementary location.",
            "The location factor cancels in the ratio.",
            "Use the original rates for this comparison.",
            "The common multiplier remains in the sum.",
            "Use the new kinetic scale.",
            "This prediction requires fixed baseline coefficients, not arbitrary energy changes."
          ],
          "points": 1,
          "source": "L06 PDF 15"
        },
        {
          "id": "L06-c5",
          "type": "written",
          "difficulty": "medium",
          "prompt": "Interpret the supplied clamp panel, then troubleshoot the claim that every immediate current jump is leak. Give the special conditions under which the provided solving instructions are valid and a controlled comparison testing the limitation.",
          "markScheme": [
            {
              "text": "Clamp imposes voltage and records current."
            },
            {
              "text": "The source curve indicates hyperpolarization activation."
            },
            {
              "text": "Exclude the capacitive transient."
            },
            {
              "text": "Initially negligible activation permits the simple leak inference."
            },
            {
              "text": "Nonzero initial activation gives immediate gated current with changed driving force."
            },
            {
              "text": "Vary controlled holding activation while keeping the test voltage fixed; compare the early and late components."
            }
          ],
          "modelAnswer": [
            "Clamp imposes voltage and records current.",
            "The source curve indicates hyperpolarization activation.",
            "Exclude the capacitive transient.",
            "Initially negligible activation permits the simple leak inference.",
            "Nonzero initial activation gives immediate gated current with changed driving force.",
            "Vary controlled holding activation while keeping the test voltage fixed; compare the early and late components."
          ],
          "hints": [
            {
              "body": "Identify the model assumptions and the variables that are controlled."
            },
            {
              "body": "Organize the requested subparts around permeation, driving force and gating state."
            }
          ],
          "points": 1,
          "source": "Exercise6 p1/instructions; L06 PDF12,17",
          "figure": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Exercise 6, PDF page 1. Supplied Exercise6 voltage-clamp current/voltage traces and steady activation curve. Graph readings are approximate. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Exercise 6, PDF page 1. Supplied Exercise6 voltage-clamp current/voltage traces and steady activation curve. Graph readings are approximate. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L06/clamp.webp', import.meta.url).href,
              "alt": "Exercise 6, PDF page 1. Supplied Exercise6 voltage-clamp current/voltage traces and steady activation curve. Graph readings are approximate. Original labels, axes and scale bars retained.",
              "aspect": 1.9728682170542635,
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
content.formulaReferenceNote='Official exam PDF p4, full-course reference. These questions use lectures 1–6 only.';
export default content;
