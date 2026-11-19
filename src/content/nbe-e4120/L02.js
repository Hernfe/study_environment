// Sources and caveats: docs/scope/nbe-e4120/L02.md
import { equationSheet } from './equation-sheet.js';
const content = {
  "meta": {
    "id": "L02",
    "number": 2,
    "title": "Membrane potential, action potential and membrane electrical properties",
    "chapters": [],
    "pages": [],
    "lectureDate": "2026-09-11",
    "examDate": "2026-11-30",
    "examLabel": "Final exam"
  },
  "overview": {
    "estimate": "Core route: read the main sections and answer 24 core questions. Formula explorers, videos, extra practice and mocks are optional.",
    "equations": "Core equations include Nernst $E_i=(RT/z_iF)\\ln(C_o/C_i)$, $V_m=\\sum_i g_i E_i/\\sum_i g_i$, $I_i=g_i(V_m-E_i)$, and $I_C=C\\,dV_m/dt$.",
    "pitfalls": "Use signed valence in Nernst and reverse the chloride concentrations in GHK. Zero current through one pathway and zero total membrane current describe different conditions."
  },
  "objectives": [
    "Choose Nernst for one ion and GHK for a mixed-ion resting membrane.",
    "Predict how gradients and permeability shifts change resting voltage.",
    "Distinguish local graded signals from regenerated spikes and read clamp traces.",
    "Use the parallel circuit to relate voltage, charge and ionic current."
  ],
  "prerequisites": [
    {
      "text": "Ion movement, signs, circuits and capacitor charging",
      "lectureId": "L01",
      "sectionId": "signs"
    }
  ],
  "segmentedPractice": true,
  "standardPractice": "mc-only",
  "collapseFormulaExplorers": true,
  "sections": [
    {
      "id": "equilibrium",
      "title": "Equilibrium or steady state?",
      "keyTerms": [],
      "source": "L02 PDF 2",
      "blocks": [
        {
          "type": "relevantVideo",
          "videoId": "rJSJWosBJg0",
          "title": "Nernst Equation And The Electrochemical Gradient Explained | Clip",
          "topic": "Electrochemical gradients and equilibrium voltage for individual ions.",
          "channel": "Science With Tal"
        },
        {
          "type": "text",
          "body": [
            "Use $V_m=V_{\\mathrm{in}}-V_{\\mathrm{out}}$ and positive outward current. Nernst gives one ion’s zero-flux voltage, $E_i=(RT/z_iF)\\ln(C_o/C_i)$. Use signed valence $z_i$, absolute temperature $T$, and matching concentration units. In Donnan equilibrium, each permeant ion has zero net flux at a shared voltage."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 2, PDF page 2. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 2, PDF page 2. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L02/equilibrium.webp', import.meta.url).href,
              "alt": "Lecture 2, PDF page 2. Source figure with original labels and axes retained.",
              "aspect": 0.5925632911392406,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L02-f-nernst",
          "name": "Single-ion equilibrium",
          "tex": "E=\\frac{k}{z}\\log_{10}\\frac{C_o}{C_i}",
          "symbols": [
            {
              "tex": "E",
              "name": "Equilibrium potential",
              "unit": "V",
              "meaning": "Voltage at zero net flux for this ion."
            },
            {
              "tex": "k",
              "name": "Temperature shortcut",
              "unit": "V",
              "meaning": "Use the supplied rounded shortcut."
            },
            {
              "tex": "z",
              "name": "Valence",
              "unit": "",
              "meaning": "Signed ionic charge."
            },
            {
              "tex": "C_o",
              "name": "Outside concentration",
              "unit": "mM",
              "meaning": "Extracellular concentration."
            },
            {
              "tex": "C_i",
              "name": "Inside concentration",
              "unit": "mM",
              "meaning": "Intracellular concentration."
            }
          ],
          "reads": "The concentration ratio and signed valence determine equilibrium voltage.",
          "assumes": "One ion; use the stated temperature shortcut.",
          "variants": [],
          "drill": {
            "prompt": "Only potassium permeates. At $20\\,^{\\circ}\\text{C}$ use $58\\,\\text{mV}$, with outside $8\\,\\text{mM}$ and inside $160\\,\\text{mM}$. Find voltage.",
            "answer": {
              "value": -75.45973974851091,
              "unit": "mV",
              "tolerance": 0.22637921924553275,
              "verification": {
                "relation": "nernst",
                "inputs": {
                  "shortcut": 0.058,
                  "z": 1,
                  "outside": 8,
                  "inside": 160
                },
                "displayScale": 0.001
              }
            },
            "tex": "E=58\\,\\text{mV}\\log_{10}(8/160)",
            "modelAnswer": [
              "The concentration ratio and signed valence determine equilibrium voltage."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $E=\\frac{k}{z}\\log_{10}\\frac{C_o}{C_i}$."
              },
              {
                "body": "Start with $E=58\\,\\text{mV}\\log_{10}(8/160)$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{E}=\\frac{\\htmlClass{formula-term-1}{k}}{\\htmlClass{formula-term-2}{z}}\\log_{10}\\frac{\\htmlClass{formula-term-3}{C_o}}{\\htmlClass{formula-term-4}{C_i}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L02-equilibrium-check",
          "practice": "extra",
          "prompt": "What is required for equilibrium of each permeant ion?",
          "correct": 0,
          "options": [
            {
              "text": "Every permeant ion has zero net flux",
              "feedback": "Zero net flux is required separately for each ion at equilibrium."
            },
            {
              "text": "Only the sum of ionic currents is zero",
              "feedback": "Opposing currents can cancel at steady state while individual ions still have net flux."
            }
          ],
          "hints": [
            {
              "body": "Separate a whole-membrane condition from a condition on each ion."
            },
            {
              "body": "Ask whether cancelling opposite currents guarantees equilibrium of each species."
            }
          ],
          "modelAnswer": [
            "Every permeant ion has zero net flux."
          ]
        },
        {
          "id": "L02-equilibrium-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L02 PDF 2",
          "prompt": "In Donnan equilibrium, what do the permeant ions share?",
          "correct": 0,
          "options": [
            {
              "text": "The same equilibrium voltage",
              "feedback": "Each permeant ion has zero net flux at the shared membrane voltage."
            },
            {
              "text": "The same inside concentration",
              "feedback": "Concentrations can remain unequal at Donnan equilibrium."
            },
            {
              "text": "The same membrane permeability",
              "feedback": "A common equilibrium voltage does not require equal permeabilities."
            }
          ],
          "hints": [
            {
              "body": "Identify which definition or experimental role this section introduces."
            },
            {
              "body": "Distinguish that role from the neighboring terms in the section."
            }
          ],
          "modelAnswer": [
            "Each permeant ion has zero net flux at the shared membrane voltage."
          ]
        }
      ]
    },
    {
      "id": "chloride",
      "title": "Chloride perturbation and recovery",
      "keyTerms": [],
      "source": "L02 PDF 3–4",
      "blocks": [
        {
          "type": "text",
          "body": [
            "Lowering outside chloride makes $E_{\\mathrm{Cl}}$ less negative and initially depolarizes the muscle. Potassium and chloride then redistribute outward. Restoring outside chloride briefly hyperpolarizes the cell before inward redistribution."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 2, PDF page 4. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 2, PDF page 4. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L02/chloride.webp', import.meta.url).href,
              "alt": "Lecture 2, PDF page 4. Source figure with original labels and axes retained.",
              "aspect": 1.0468451242829828,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        },
        {
          "type": "optionalInfo",
          "title": "Extra detail",
          "body": [
            "The source sequence includes water movement and treats potassium concentrations as effectively fixed. An exact calculation requires a consistent volume and solute balance."
          ]
        }
      ],
      "formulas": [],
      "conceptQuiz": [
        {
          "id": "L02-chloride-check",
          "practice": "extra",
          "prompt": "What follows a sudden extracellular chloride reduction in the source example?",
          "correct": 1,
          "options": [
            {
              "text": "Initial hyperpolarization then slow recovery",
              "feedback": "The initial response is depolarizing; hyperpolarization occurs when outside chloride is restored."
            },
            {
              "text": "Initial depolarization then slow recovery",
              "feedback": "The changed chloride equilibrium potential first depolarizes; slower redistribution then permits recovery."
            }
          ],
          "hints": [
            {
              "body": "Hold inside chloride fixed for the immediate response."
            },
            {
              "body": "Use the negative valence before considering slower redistribution."
            }
          ],
          "modelAnswer": [
            "Initial depolarization then slow recovery."
          ]
        },
        {
          "id": "L02-chloride-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L02 PDF 3–4",
          "prompt": "What is the initial response when outside chloride is restored in the taught sequence?",
          "correct": 1,
          "options": [
            {
              "text": "An immediate full recovery",
              "feedback": "Redistribution takes time, so restoration does not immediately return the cell to its original state."
            },
            {
              "text": "A transient hyperpolarization",
              "feedback": "Restoring outside chloride first makes voltage more negative; redistribution follows."
            },
            {
              "text": "A sustained depolarization",
              "feedback": "The taught restoration produces a negative transient, not a sustained positive shift."
            }
          ],
          "hints": [
            {
              "body": "Identify which definition or experimental role this section introduces."
            },
            {
              "body": "Distinguish that role from the neighboring terms in the section."
            }
          ],
          "modelAnswer": [
            "Restoring outside chloride first makes voltage more negative; redistribution follows."
          ]
        }
      ]
    },
    {
      "id": "permeability",
      "title": "Permeability from diffusion and partition",
      "keyTerms": [],
      "source": "L02 PDF 5",
      "blocks": [
        {
          "type": "text",
          "body": [
            "For a homogeneous membrane, $P=D^*\\beta/l$: diffusion within the membrane ($D^*$) and partition into it ($\\beta$) raise permeability, while thickness ($l$) reduces it. In the diffusion-only relation $J=-P\\Delta C$, define the positive direction before assigning the concentration difference."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 2, PDF page 5. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 2, PDF page 5. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L02/permeability.webp', import.meta.url).href,
              "alt": "Lecture 2, PDF page 5. Source figure with original labels and axes retained.",
              "aspect": 1.1850220264317182,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L02-f-permeability",
          "name": "Membrane permeability",
          "tex": "P=\\frac{D\\beta}{l}",
          "symbols": [
            {
              "tex": "P",
              "name": "Permeability",
              "unit": "m/s",
              "meaning": "Effective crossing speed."
            },
            {
              "tex": "D",
              "name": "Membrane diffusion coefficient",
              "unit": "m2/s",
              "meaning": "Diffusion within membrane."
            },
            {
              "tex": "\\beta",
              "name": "Partition coefficient",
              "unit": "",
              "meaning": "Membrane concentration relative to water."
            },
            {
              "tex": "l",
              "name": "Thickness",
              "unit": "m",
              "meaning": "Diffusion path length."
            }
          ],
          "reads": "More diffusion or partition increases permeability; thickness reduces it.",
          "assumes": "Homogeneous membrane with linear concentration profile.",
          "variants": [],
          "drill": {
            "prompt": "Use $D=2\\times10^{-12}\\,\\text{m}^2/\\text{s}$, $\\beta=0.01$, $l=5\\,\\text{nm}$. Find permeability.",
            "answer": {
              "value": 4e-06,
              "unit": "m/s",
              "tolerance": 1.2e-08,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 2e-14,
                  "b": 5e-09
                },
                "displayScale": 1
              }
            },
            "tex": "P=\\frac{(2\\times10^{-12})(0.01)}{5\\times10^{-9}}\\,\\text{m/s}",
            "modelAnswer": [
              "More diffusion or partition increases permeability; thickness reduces it."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $P=\\frac{D\\beta}{l}$."
              },
              {
                "body": "Start with $P=\\frac{(2\\times10^{-12})(0.01)}{5\\times10^{-9}}\\,\\text{m/s}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{P}=\\frac{\\htmlClass{formula-term-1}{D}\\htmlClass{formula-term-2}{\\beta}}{\\htmlClass{formula-term-3}{l}}"
        },
        {
          "id": "L02-f-flux",
          "name": "Permeability flux",
          "tex": "J=-P\\Delta C",
          "symbols": [
            {
              "tex": "J",
              "name": "Molar flux density",
              "unit": "mol/m2/s",
              "meaning": "Positive toward increasing coordinate."
            },
            {
              "tex": "P",
              "name": "Permeability",
              "unit": "m/s",
              "meaning": "Effective membrane permeability."
            },
            {
              "tex": "\\Delta C",
              "name": "Concentration difference",
              "unit": "mol/m3",
              "meaning": "Concentration at the end minus the start."
            }
          ],
          "reads": "Passive diffusive flux opposes the defined concentration difference.",
          "assumes": "No electrical drift contribution in this relation.",
          "variants": [],
          "drill": {
            "prompt": "For $P=3\\times10^{-6}\\,\\text{m/s}$ and $\\Delta C=20\\,\\text{mol/m}^3$, find signed flux density.",
            "answer": {
              "value": -6e-05,
              "unit": "mol/m2/s",
              "tolerance": 1.8e-07,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": -3e-06,
                  "b": 20
                },
                "displayScale": 1
              }
            },
            "tex": "J=-(3\\times10^{-6})(20)\\,\\text{mol}/(\\text{m}^2\\text{s})",
            "modelAnswer": [
              "Passive diffusive flux opposes the defined concentration difference."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $J=-P\\Delta C$."
              },
              {
                "body": "Start with $J=-(3\\times10^{-6})(20)\\,\\text{mol}/(\\text{m}^2\\text{s})$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{J}=-\\htmlClass{formula-term-1}{P}\\htmlClass{formula-term-2}{\\Delta C}"
        },
        {
          "id": "L02-f-mobility-permeability",
          "name": "Mobility and permeability",
          "tex": "P=\\frac{RTu\\beta}{Fl}",
          "symbols": [
            {
              "tex": "P",
              "name": "Permeability",
              "unit": "m/s",
              "meaning": "Effective crossing speed."
            },
            {
              "tex": "R",
              "name": "Gas constant",
              "unit": "J/mol/K",
              "meaning": "Use stated value."
            },
            {
              "tex": "T",
              "name": "Temperature",
              "unit": "K",
              "meaning": "Absolute temperature."
            },
            {
              "tex": "u",
              "name": "Membrane mobility",
              "unit": "m2/V/s",
              "meaning": "Course ionic mobility convention."
            },
            {
              "tex": "\\beta",
              "name": "Partition coefficient",
              "unit": "",
              "meaning": "Membrane/water partition."
            },
            {
              "tex": "F",
              "name": "Faraday constant",
              "unit": "C/mol",
              "meaning": "Charge per mole."
            },
            {
              "tex": "l",
              "name": "Thickness",
              "unit": "m",
              "meaning": "Membrane thickness."
            }
          ],
          "reads": "At fixed mobility, partition and thickness, permeability scales with absolute temperature.",
          "assumes": "Course relation $D=uRT/F$; this temperature comparison holds other parameters fixed.",
          "variants": [],
          "drill": {
            "prompt": "Permeability is $2\\times10^{-6}\\,\\text{m/s}$ at $290\\,\\text{K}$. Holding mobility and geometry fixed, find it at $310\\,\\text{K}$.",
            "answer": {
              "value": 2.137931034482759e-06,
              "unit": "m/s",
              "tolerance": 6.413793103448277e-09,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 2e-06,
                  "b": 1.0689655172413792
                },
                "displayScale": 1
              }
            },
            "tex": "P_2=(2\\times10^{-6})\\frac{310}{290}\\,\\text{m/s}",
            "modelAnswer": [
              "At fixed mobility, partition and thickness, permeability scales with absolute temperature."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $P=\\frac{RTu\\beta}{Fl}$."
              },
              {
                "body": "Start with $P_2=(2\\times10^{-6})\\frac{310}{290}\\,\\text{m/s}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{P}=\\frac{\\htmlClass{formula-term-1}{R}\\htmlClass{formula-term-2}{T}\\htmlClass{formula-term-3}{u}\\htmlClass{formula-term-4}{\\beta}}{\\htmlClass{formula-term-5}{F}\\htmlClass{formula-term-6}{l}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L02-permeability-check",
          "prompt": "What increases permeability with other parameters fixed?",
          "correct": 0,
          "options": [
            {
              "text": "Increasing the membrane partition coefficient",
              "feedback": "Greater partition into the membrane increases permeability at fixed diffusion and thickness."
            },
            {
              "text": "Increasing the membrane thickness instead",
              "feedback": "A thicker barrier lowers permeability because thickness is in the denominator."
            }
          ],
          "hints": [
            {
              "body": "Use diffusion times partition divided by thickness."
            },
            {
              "body": "Compare a numerator factor with the denominator factor."
            }
          ],
          "modelAnswer": [
            "Increasing the membrane partition coefficient."
          ]
        },
        {
          "id": "L02-permeability-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L02 PDF 5",
          "prompt": "What does the partition coefficient describe in the permeability model?",
          "correct": 2,
          "options": [
            {
              "text": "Diffusion speed within membrane material",
              "feedback": "Diffusion within the membrane is represented by the diffusion coefficient."
            },
            {
              "text": "Distance across the membrane barrier",
              "feedback": "Barrier distance is membrane thickness, a separate factor in permeability."
            },
            {
              "text": "Distribution between membrane and water",
              "feedback": "Partition describes how readily the solute enters the membrane from water."
            }
          ],
          "hints": [
            {
              "body": "Identify which definition or experimental role this section introduces."
            },
            {
              "body": "Distinguish that role from the neighboring terms in the section."
            }
          ],
          "modelAnswer": [
            "Partition describes how readily the solute enters the membrane from water."
          ]
        }
      ]
    },
    {
      "id": "ghk",
      "title": "Constant field and mixed-ion resting voltage",
      "keyTerms": [],
      "source": "L02 PDF 6",
      "blocks": [
        {
          "type": "text",
          "body": [
            "Use GHK voltage for independent monovalent ions moving by electrodiffusion in a constant field, at zero total ionic current. Weight outside cations and inside chloride in the numerator, and the opposite sides in the denominator. Only relative permeabilities matter. With one permeant ion, use Nernst."
          ]
        },
        {
          "type": "math",
          "title": "GHK resting voltage",
          "tex": "V_m=\\frac{RT}{F}\\ln\\frac{P_K[K]_o+P_{Na}[Na]_o+P_{Cl}[Cl]_i}{P_K[K]_i+P_{Na}[Na]_i+P_{Cl}[Cl]_o}",
          "label": "Use relative permeabilities $P$ and concentrations in the same units. Subscripts $o$ and $i$ mark outside and inside."
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 2, PDF page 10. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 2, PDF page 10. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L02/resting.webp', import.meta.url).href,
              "alt": "Lecture 2, PDF page 10. Source figure with original labels and axes retained.",
              "aspect": 0.9462686567164179,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L02-f-ghk",
          "name": "GHK resting voltage",
          "tex": "V_m=k\\log_{10}\\frac{P_KK_o+P_{Na}Na_o+P_{Cl}Cl_i}{P_KK_i+P_{Na}Na_i+P_{Cl}Cl_o}",
          "symbols": [
            {
              "tex": "V_m",
              "name": "Membrane voltage",
              "unit": "V",
              "meaning": "Inside minus outside."
            },
            {
              "tex": "k",
              "name": "Shortcut",
              "unit": "V",
              "meaning": "Temperature-dependent logarithm shortcut."
            },
            {
              "tex": "P_K",
              "name": "Potassium permeability",
              "unit": "",
              "meaning": "Relative weight."
            },
            {
              "tex": "P_{Na}",
              "name": "Sodium permeability",
              "unit": "",
              "meaning": "Relative weight."
            },
            {
              "tex": "P_{Cl}",
              "name": "Chloride permeability",
              "unit": "",
              "meaning": "Relative weight; chloride is reversed."
            },
            {
              "tex": "K_o",
              "name": "Outside potassium",
              "unit": "mM",
              "meaning": "Same units for all concentrations."
            },
            {
              "tex": "Cl_i",
              "name": "Inside chloride",
              "unit": "mM",
              "meaning": "Anion concentration in numerator."
            }
          ],
          "reads": "Each permeant ion contributes a permeability-weighted concentration; chloride is inverted.",
          "assumes": "Monovalent ions, constant field, independent movement, zero total current.",
          "variants": [],
          "drill": {
            "prompt": "At $37\\,^{\\circ}\\text{C}$ use $61.5\\,\\text{mV}$. Let $(P_K,P_{Na},P_{Cl})=(1,0.05,0.2)$, inside $(K,Na,Cl)=(140,12,8)$ and outside $(6,145,120)\\,\\text{mM}$. Find resting voltage.",
            "answer": {
              "value": -64.24925769921572,
              "unit": "mV",
              "tolerance": 0.19274777309764715,
              "verification": {
                "relation": "ghkVoltage",
                "inputs": {
                  "shortcut": 0.0615,
                  "pk": 1,
                  "pna": 0.05,
                  "pcl": 0.2,
                  "ko": 6,
                  "ki": 140,
                  "nao": 145,
                  "nai": 12,
                  "cli": 8,
                  "clo": 120
                },
                "displayScale": 0.001
              }
            },
            "tex": "V_m=61.5\\,\\text{mV}\\log_{10}\\frac{6+0.05(145)+0.2(8)}{140+0.05(12)+0.2(120)}",
            "modelAnswer": [
              "Each permeant ion contributes a permeability-weighted concentration; chloride is inverted."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $V_m=k\\log_{10}\\frac{P_KK_o+P_{Na}Na_o+P_{Cl}Cl_i}{P_KK_i+P_{Na}Na_i+P_{Cl}Cl_o}$."
              },
              {
                "body": "Start with $V_m=61.5\\,\\text{mV}\\log_{10}\\frac{6+0.05(145)+0.2(8)}{140+0.05(12)+0.2(120)}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{V_m}=\\htmlClass{formula-term-1}{k}\\log_{10}\\frac{\\htmlClass{formula-term-2}{P_K}\\htmlClass{formula-term-5}{K_o}+\\htmlClass{formula-term-3}{P_{Na}}Na_o+\\htmlClass{formula-term-4}{P_{Cl}}\\htmlClass{formula-term-6}{Cl_i}}{\\htmlClass{formula-term-2}{P_K}K_i+\\htmlClass{formula-term-3}{P_{Na}}Na_i+\\htmlClass{formula-term-4}{P_{Cl}}Cl_o}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L02-ghk-check",
          "prompt": "Which concentration belongs in the GHK numerator for chloride?",
          "correct": 1,
          "options": [
            {
              "text": "The extracellular chloride concentration",
              "feedback": "Outside chloride belongs in the denominator because chloride has negative valence."
            },
            {
              "text": "The intracellular chloride concentration",
              "feedback": "Inside chloride belongs in the numerator, opposite to the cation placement."
            }
          ],
          "hints": [
            {
              "body": "Chloride has the opposite valence to potassium and sodium."
            },
            {
              "body": "Compare its single-ion Nernst ratio with the cation ratio."
            }
          ],
          "modelAnswer": [
            "The intracellular chloride concentration."
          ]
        },
        {
          "id": "L02-ghk-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L02 PDF 6",
          "prompt": "What does the constant-field assumption say about voltage across the membrane?",
          "correct": 0,
          "options": [
            {
              "text": "It varies linearly with distance",
              "feedback": "A constant electric field corresponds to a linear voltage profile."
            },
            {
              "text": "It stays constant across the layer",
              "feedback": "Constant field does not mean constant voltage; voltage changes across the layer."
            },
            {
              "text": "It changes only at the inner face",
              "feedback": "The voltage drop is distributed through the membrane in this model."
            }
          ],
          "hints": [
            {
              "body": "Identify which definition or experimental role this section introduces."
            },
            {
              "body": "Distinguish that role from the neighboring terms in the section."
            }
          ],
          "modelAnswer": [
            "A constant electric field corresponds to a linear voltage profile."
          ]
        }
      ]
    },
    {
      "id": "rectification",
      "title": "GHK current and rectification",
      "keyTerms": [],
      "source": "L02 PDF 7–8",
      "blocks": [
        {
          "type": "text",
          "body": [
            "Use the GHK current equation for one ion’s current density at a given voltage. Unequal concentrations can produce rectification even at constant permeability. Equal concentrations give a straight I–V relation. Use the continuous limit at zero voltage and multiply current density by uniform patch area for current."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 2, PDF page 7. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 2, PDF page 7. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L02/rectification.webp', import.meta.url).href,
              "alt": "Lecture 2, PDF page 7. Source figure with original labels and axes retained.",
              "aspect": 1.3375527426160339,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        },
        {
          "type": "optionalInfo",
          "title": "Extra detail",
          "body": [
            "Real rectifier traces may also reflect changing channel availability. Curve shape alone leaves the mechanism uncertain."
          ]
        }
      ],
      "formulas": [
        {
          "id": "L02-f-ghk-current",
          "name": "GHK current density",
          "tex": "j=P\\frac{z^2F^2}{RT}V_m\\frac{C_i-C_oe^{-zFV_m/(RT)}}{1-e^{-zFV_m/(RT)}}",
          "symbols": [
            {
              "tex": "j",
              "name": "Current density",
              "unit": "A/m2",
              "meaning": "Outward conventional current per area."
            },
            {
              "tex": "P",
              "name": "Permeability",
              "unit": "m/s",
              "meaning": "SI permeability."
            },
            {
              "tex": "z",
              "name": "Valence",
              "unit": "",
              "meaning": "Signed ion charge."
            },
            {
              "tex": "F",
              "name": "Faraday constant",
              "unit": "C/mol",
              "meaning": "Charge per mole."
            },
            {
              "tex": "R",
              "name": "Gas constant",
              "unit": "J/mol/K",
              "meaning": "Gas constant."
            },
            {
              "tex": "T",
              "name": "Temperature",
              "unit": "K",
              "meaning": "Absolute temperature."
            },
            {
              "tex": "V_m",
              "name": "Voltage",
              "unit": "V",
              "meaning": "Inside relative to outside."
            }
          ],
          "reads": "Unequal concentrations produce rectification; equal concentrations give a linear relation.",
          "assumes": "Concentrations in moles per cubic metre. Use the continuous limit at zero voltage.",
          "variants": [
            {
              "tex": "\\lim_{V_m\\to0}j=PzF(C_i-C_o)",
              "note": "Continuous limit; do not evaluate a zero divided by zero directly."
            }
          ],
          "drill": {
            "prompt": "At $V_m=0$, the continuous limit is $j=PzF(C_i-C_o)$. For $P=10^{-8}\\,\\text{m/s}$, $z=1$, $F=96485\\,\\text{C/mol}$, $C_i=120$ and $C_o=10\\,\\text{mol/m}^3$, find current density.",
            "answer": {
              "value": 0.1061335,
              "unit": "A/m2",
              "tolerance": 0.00031840050000000005,
              "verification": {
                "relation": "ghkCurrent",
                "inputs": {
                  "permeability": 1e-08,
                  "z": 1,
                  "f": 96485,
                  "r": 8.314,
                  "temperature": 293,
                  "v": 0,
                  "inside": 120,
                  "outside": 10
                },
                "displayScale": 1
              }
            },
            "tex": "j=(10^{-8})(1)(96485)(120-10)\\,\\text{A/m}^2",
            "modelAnswer": [
              "Unequal concentrations produce rectification; equal concentrations give a linear relation."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $j=P\\frac{z^2F^2}{RT}V_m\\frac{C_i-C_oe^{-zFV_m/(RT)}}{1-e^{-zFV_m/(RT)}}$."
              },
              {
                "body": "Start with $j=(10^{-8})(1)(96485)(120-10)\\,\\text{A/m}^2$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{j}=\\htmlClass{formula-term-1}{P}\\frac{\\htmlClass{formula-term-2}{z}^2\\htmlClass{formula-term-3}{F}^2}{\\htmlClass{formula-term-4}{R}\\htmlClass{formula-term-5}{T}}\\htmlClass{formula-term-6}{V_m}\\frac{C_i-C_oe^{-\\htmlClass{formula-term-2}{z}\\htmlClass{formula-term-3}{F}\\htmlClass{formula-term-6}{V_m}/(\\htmlClass{formula-term-4}{R}\\htmlClass{formula-term-5}{T})}}{1-e^{-\\htmlClass{formula-term-2}{z}\\htmlClass{formula-term-3}{F}\\htmlClass{formula-term-6}{V_m}/(\\htmlClass{formula-term-4}{R}\\htmlClass{formula-term-5}{T})}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L02-rectification-check",
          "practice": "extra",
          "prompt": "What does inward rectification mean?",
          "correct": 0,
          "options": [
            {
              "text": "Inward current flows more readily than outward",
              "feedback": "Inward rectification means inward current flows more readily."
            },
            {
              "text": "Outward current flows more readily than inward",
              "feedback": "Preferential outward flow is outward rectification."
            }
          ],
          "hints": [
            {
              "body": "The term describes a preferred direction of current flow."
            },
            {
              "body": "Read inward and outward in conventional-current terms."
            }
          ],
          "modelAnswer": [
            "Inward current flows more readily than outward."
          ]
        },
        {
          "id": "L02-rectification-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L02 PDF 7–8",
          "prompt": "In the constant-permeability GHK model, which concentration case gives a linear current–voltage relation?",
          "correct": 1,
          "options": [
            {
              "text": "Higher concentration on the inside",
              "feedback": "Higher inside concentration also gives an asymmetric current–voltage relation."
            },
            {
              "text": "Equal concentrations on both sides",
              "feedback": "Equal concentrations remove the concentration asymmetry that produces GHK rectification."
            },
            {
              "text": "Higher concentration on the outside",
              "feedback": "Higher outside concentration gives an asymmetric current–voltage relation."
            }
          ],
          "hints": [
            {
              "body": "Identify which definition or experimental role this section introduces."
            },
            {
              "body": "Distinguish that role from the neighboring terms in the section."
            }
          ],
          "modelAnswer": [
            "Equal concentrations remove the concentration asymmetry that produces GHK rectification."
          ]
        }
      ]
    },
    {
      "id": "potassium",
      "title": "Potassium dependence of resting voltage",
      "keyTerms": [],
      "source": "L02 PDF 9",
      "blocks": [
        {
          "type": "text",
          "body": [
            "The squid resting membrane is most permeable to potassium. Raising outside potassium makes $E_{\\mathrm K}$ and the GHK prediction less negative in the source example. The curves approach each other as the potassium term dominates the GHK numerator."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 2, PDF page 9. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 2, PDF page 9. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L02/potassium.webp', import.meta.url).href,
              "alt": "Lecture 2, PDF page 9. Source figure with original labels and axes retained.",
              "aspect": 0.7868362004487659,
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
          "id": "L02-potassium-check",
          "prompt": "Why do the source GHK and potassium curves converge at high outside potassium?",
          "correct": 1,
          "options": [
            {
              "text": "The sodium numerator contribution dominates",
              "feedback": "Only outside potassium increases here, so the sodium term does not become dominant."
            },
            {
              "text": "The potassium numerator contribution dominates",
              "feedback": "The growing outside-potassium term dominates the numerator without eliminating other permeabilities."
            }
          ],
          "hints": [
            {
              "body": "Compare the numerator terms while keeping permeabilities fixed."
            },
            {
              "body": "Consider which term grows when only outside potassium rises."
            }
          ],
          "modelAnswer": [
            "The potassium numerator contribution dominates."
          ]
        },
        {
          "id": "L02-potassium-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L02 PDF 9",
          "prompt": "Which permeability is largest in the taught squid resting-membrane example?",
          "correct": 2,
          "options": [
            {
              "text": "The permeability to sodium",
              "feedback": "Sodium contributes to GHK voltage but has a smaller permeability here."
            },
            {
              "text": "The permeability to chloride",
              "feedback": "Chloride contributes to GHK voltage but does not have the largest permeability here."
            },
            {
              "text": "The permeability to potassium",
              "feedback": "Potassium dominates the resting permeability, although other ions still contribute."
            }
          ],
          "hints": [
            {
              "body": "Identify which definition or experimental role this section introduces."
            },
            {
              "body": "Distinguish that role from the neighboring terms in the section."
            }
          ],
          "modelAnswer": [
            "Potassium dominates the resting permeability, although other ions still contribute."
          ]
        }
      ]
    },
    {
      "id": "resting",
      "title": "Resting voltage is a maintained steady state",
      "keyTerms": [],
      "source": "L02 PDF 10",
      "blocks": [
        {
          "type": "text",
          "body": [
            "At unstimulated rest, membrane voltage is stable and all membrane currents sum to zero. Individual currents can persist. Pumps maintain the gradients; passive GHK assumes the modeled ionic currents balance without an additional pump-current term."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 2, PDF page 10. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 2, PDF page 10. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L02/resting.webp', import.meta.url).href,
              "alt": "Lecture 2, PDF page 10. Source figure with original labels and axes retained.",
              "aspect": 0.9462686567164179,
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
          "id": "L02-resting-check",
          "prompt": "Which description fits a resting cell?",
          "correct": 0,
          "options": [
            {
              "text": "Stable voltage with ongoing molecular transport",
              "feedback": "Stable voltage can coexist with channel currents and active transport that maintains gradients."
            },
            {
              "text": "Stable voltage without any molecular transport",
              "feedback": "Stable voltage does not imply transport stops; opposing currents can balance."
            }
          ],
          "hints": [
            {
              "body": "Stable voltage is a macroscopic observation."
            },
            {
              "body": "Consider whether opposing currents can continue while their sum is unchanged."
            }
          ],
          "modelAnswer": [
            "Stable voltage with ongoing molecular transport."
          ]
        },
        {
          "id": "L02-resting-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L02 PDF 10",
          "prompt": "Which process maintains resting ion gradients over time?",
          "correct": 0,
          "options": [
            {
              "text": "Active transport through pumps",
              "feedback": "Pumps supply the active transport that maintains gradients against passive leakage."
            },
            {
              "text": "Passive transport through channels",
              "feedback": "Passive channels carry ions down electrochemical gradients rather than maintaining those gradients."
            },
            {
              "text": "Charge storage across membrane",
              "feedback": "Capacitance stores separated charge; it does not actively restore ionic gradients."
            }
          ],
          "hints": [
            {
              "body": "Identify which definition or experimental role this section introduces."
            },
            {
              "body": "Distinguish that role from the neighboring terms in the section."
            }
          ],
          "modelAnswer": [
            "Pumps supply the active transport that maintains gradients against passive leakage."
          ]
        }
      ]
    },
    {
      "id": "charge",
      "title": "Small charge, large voltage change",
      "keyTerms": [],
      "source": "L02 PDF 11; Exercise2 P1",
      "blocks": [
        {
          "type": "text",
          "body": [
            "Exercise 2 uses $A=4\\pi r^2$, then $C=C_sA$ and $\\Delta Q=C\\Delta V$. Divide $|\\Delta Q|$ by elementary charge $e$ to count monovalent ions. A small charge separation can change voltage with little effect on bulk concentrations. Depolarization moves voltage more positive, repolarization returns toward rest, and hyperpolarization goes below rest."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 2, PDF page 11. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 2, PDF page 11. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L02/terminology.webp', import.meta.url).href,
              "alt": "Lecture 2, PDF page 11. Source figure with original labels and axes retained.",
              "aspect": 1.5418502202643172,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L02-f-sphere",
          "name": "Spherical membrane area",
          "tex": "A=4\\pi r^2",
          "symbols": [
            {
              "tex": "A",
              "name": "Area",
              "unit": "m2",
              "meaning": "Surface area, not cross section."
            },
            {
              "tex": "r",
              "name": "Radius",
              "unit": "m",
              "meaning": "Half the diameter."
            }
          ],
          "reads": "Spherical membrane area scales with radius squared.",
          "assumes": "Ideal sphere with no folding.",
          "variants": [],
          "drill": {
            "prompt": "An ideal spherical cell has radius $5\\,\\mu\\text{m}$. Find membrane area.",
            "answer": {
              "value": 314.1592653589793,
              "unit": "um2",
              "tolerance": 0.942477796076938,
              "verification": {
                "relation": "sphereArea",
                "inputs": {
                  "radius": 5e-06
                },
                "displayScale": 1e-12
              }
            },
            "tex": "A=4\\pi(5\\,\\mu\\text{m})^2",
            "modelAnswer": [
              "Spherical membrane area scales with radius squared."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $A=4\\pi r^2$."
              },
              {
                "body": "Start with $A=4\\pi(5\\,\\mu\\text{m})^2$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{A}=4\\pi \\htmlClass{formula-term-1}{r}^2"
        },
        {
          "id": "L02-f-area-capacitance",
          "name": "Total from specific capacitance",
          "tex": "C=C_sA",
          "symbols": [
            {
              "tex": "C",
              "name": "Total capacitance",
              "unit": "F",
              "meaning": "Whole cell capacitance."
            },
            {
              "tex": "C_s",
              "name": "Specific capacitance",
              "unit": "F/m2",
              "meaning": "Capacitance per area."
            },
            {
              "tex": "A",
              "name": "Area",
              "unit": "m2",
              "meaning": "Membrane surface area."
            }
          ],
          "reads": "Total capacitance grows in proportion to area.",
          "assumes": "Uniform specific capacitance.",
          "variants": [],
          "drill": {
            "prompt": "A membrane area is $200\\,\\mu\\text{m}^2$ and specific capacitance is $1\\,\\mu\\text{F}/\\text{cm}^2=0.01\\,\\text{F/m}^2$. Find total capacitance.",
            "answer": {
              "value": 2,
              "unit": "pF",
              "tolerance": 0.006,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 0.01,
                  "b": 2e-10
                },
                "displayScale": 1e-12
              }
            },
            "tex": "C=(0.01\\,\\text{F/m}^2)(200\\times10^{-12}\\,\\text{m}^2)",
            "modelAnswer": [
              "Total capacitance grows in proportion to area."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $C=C_sA$."
              },
              {
                "body": "Start with $C=(0.01\\,\\text{F/m}^2)(200\\times10^{-12}\\,\\text{m}^2)$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{C}=\\htmlClass{formula-term-1}{C_s}\\htmlClass{formula-term-2}{A}"
        },
        {
          "id": "L02-f-charge",
          "name": "Charge increment",
          "tex": "\\Delta Q=C\\Delta V",
          "symbols": [
            {
              "tex": "\\Delta Q",
              "name": "Inner charge increment",
              "unit": "C",
              "meaning": "Positive when positive charge enters."
            },
            {
              "tex": "C",
              "name": "Capacitance",
              "unit": "F",
              "meaning": "Total capacitance."
            },
            {
              "tex": "\\Delta V",
              "name": "Voltage increment",
              "unit": "V",
              "meaning": "Final minus initial membrane voltage."
            }
          ],
          "reads": "Depolarization increases inner plate charge.",
          "assumes": "Constant capacitance; charge increment is not outward ionic current.",
          "variants": [],
          "drill": {
            "prompt": "A $20\\,\\text{pF}$ membrane moves from $-60$ to $+30\\,\\text{mV}$. Find positive charge entering, neglecting concurrent currents.",
            "answer": {
              "value": 1.8,
              "unit": "pC",
              "tolerance": 0.0054,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 2e-11,
                  "b": 0.09
                },
                "displayScale": 1e-12
              }
            },
            "tex": "\\Delta Q=(20\\,\\text{pF})(90\\,\\text{mV})",
            "modelAnswer": [
              "Depolarization increases inner plate charge."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\Delta Q=C\\Delta V$."
              },
              {
                "body": "Start with $\\Delta Q=(20\\,\\text{pF})(90\\,\\text{mV})$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{\\Delta Q}=\\htmlClass{formula-term-1}{C}\\htmlClass{formula-term-2}{\\Delta V}"
        },
        {
          "id": "L02-f-ion-count",
          "name": "Monovalent ion count",
          "tex": "N=\\frac{|Q|}{e}",
          "symbols": [
            {
              "tex": "N",
              "name": "Number of ions",
              "unit": "",
              "meaning": "Count, not molar quantity."
            },
            {
              "tex": "Q",
              "name": "Charge magnitude",
              "unit": "C",
              "meaning": "Total charge transferred."
            },
            {
              "tex": "e",
              "name": "Elementary charge",
              "unit": "C",
              "meaning": "Charge per monovalent ion."
            }
          ],
          "reads": "Divide charge magnitude by charge per ion.",
          "assumes": "Monovalent ions; use the stated elementary charge.",
          "variants": [],
          "drill": {
            "prompt": "How many monovalent ions carry $3.2044\\,\\text{pC}$? Use $e=1.6022\\times10^{-19}\\,\\text{C}$.",
            "answer": {
              "value": 20000000.0,
              "unit": "",
              "tolerance": 60000.0,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 3.2044e-12,
                  "b": 1.6022e-19
                },
                "displayScale": 1
              }
            },
            "tex": "N=\\frac{3.2044\\times10^{-12}}{1.6022\\times10^{-19}}",
            "modelAnswer": [
              "Divide charge magnitude by charge per ion."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $N=\\frac{|Q|}{e}$."
              },
              {
                "body": "Start with $N=\\frac{3.2044\\times10^{-12}}{1.6022\\times10^{-19}}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{N}=\\frac{|\\htmlClass{formula-term-1}{Q}|}{\\htmlClass{formula-term-2}{e}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L02-charge-check",
          "practice": "extra",
          "prompt": "Which term describes a voltage becoming more positive than rest?",
          "correct": 1,
          "options": [
            {
              "text": "Hyperpolarization relative to resting voltage",
              "feedback": "Hyperpolarization is movement toward a more negative voltage than rest."
            },
            {
              "text": "Depolarization relative to resting voltage",
              "feedback": "Depolarization is movement toward a more positive voltage, even if inside remains negative."
            }
          ],
          "hints": [
            {
              "body": "Compare the new voltage with resting voltage."
            },
            {
              "body": "The direction of change matters even when the cell is still negative inside."
            }
          ],
          "modelAnswer": [
            "Depolarization relative to resting voltage."
          ]
        },
        {
          "id": "L02-charge-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L02 PDF 11; Exercise2 P1",
          "prompt": "Which membrane property is capacitance per unit area?",
          "correct": 1,
          "options": [
            {
              "text": "Total membrane conductance",
              "feedback": "Conductance describes current flow through pathways, not charge storage per area."
            },
            {
              "text": "Specific membrane capacitance",
              "feedback": "Specific capacitance is per area; multiplying by area gives total capacitance."
            },
            {
              "text": "Total membrane capacitance",
              "feedback": "Total capacitance describes the whole membrane, without dividing by its area."
            }
          ],
          "hints": [
            {
              "body": "Identify which definition or experimental role this section introduces."
            },
            {
              "body": "Distinguish that role from the neighboring terms in the section."
            }
          ],
          "modelAnswer": [
            "Specific capacitance is per area; multiplying by area gives total capacitance."
          ]
        }
      ]
    },
    {
      "id": "resting-functions",
      "title": "Resting voltage beyond excitable cells",
      "keyTerms": [],
      "source": "L02 PDF 12",
      "blocks": [
        {
          "type": "text",
          "body": [
            "The sodium–potassium pump moves three sodium ions out and two potassium ions in per cycle. This net outward positive charge favors hyperpolarization. Gradients, channels and pumps vary across cells, so resting voltages vary too."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 2, PDF page 12. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 2, PDF page 12. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L02/cell-potentials.webp', import.meta.url).href,
              "alt": "Lecture 2, PDF page 12. Source figure with original labels and axes retained.",
              "aspect": 0.6419019316493314,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        },
        {
          "type": "optionalInfo",
          "title": "Extra detail",
          "body": [
            "Membrane voltage can also participate in cell-volume control, proliferation and wound healing in nonexcitable cells."
          ]
        }
      ],
      "formulas": [],
      "conceptQuiz": [
        {
          "id": "L02-resting-functions-check",
          "prompt": "What is the immediate electrogenic tendency of the sodium/potassium pump?",
          "correct": 0,
          "options": [
            {
              "text": "Net positive charge leaves the cell",
              "feedback": "Three sodium ions leave for every two potassium ions entering, giving net outward positive charge."
            },
            {
              "text": "Net positive charge enters the cell",
              "feedback": "The pump exports one more positive charge than it imports in each cycle."
            }
          ],
          "hints": [
            {
              "body": "Count exported and imported positive charges per pump cycle."
            },
            {
              "body": "Translate the net particle transfer into conventional-current direction."
            }
          ],
          "modelAnswer": [
            "Net positive charge leaves the cell."
          ]
        },
        {
          "id": "L02-resting-functions-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L02 PDF 12",
          "prompt": "Which function is associated with voltage in nonexcitable cells in this lecture?",
          "correct": 2,
          "options": [
            {
              "text": "Regeneration of axonal spikes",
              "feedback": "Regenerated axonal spikes are the excitable-neuron example, not the nonexcitable-cell function."
            },
            {
              "text": "Coding by spike frequency",
              "feedback": "Spike-frequency coding belongs to spiking signals, not the nonexcitable-cell example."
            },
            {
              "text": "Regulation of cell volume",
              "feedback": "Membrane voltage contributes to cell-volume control even in cells that do not spike."
            }
          ],
          "hints": [
            {
              "body": "Identify which definition or experimental role this section introduces."
            },
            {
              "body": "Distinguish that role from the neighboring terms in the section."
            }
          ],
          "modelAnswer": [
            "Membrane voltage contributes to cell-volume control even in cells that do not spike."
          ]
        }
      ]
    },
    {
      "id": "mutation",
      "title": "Permeability change without gradient change",
      "keyTerms": [],
      "source": "L02 PDF 13",
      "blocks": [
        {
          "type": "text",
          "body": [
            "Increasing sodium permeability at fixed concentrations leaves every Nernst potential unchanged. In the source example, sodium gets more weight in GHK and the membrane depolarizes toward $E_{\\mathrm{Na}}$. Recompute both concentration sums."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 2, PDF page 10. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 2, PDF page 10. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L02/resting.webp', import.meta.url).href,
              "alt": "Lecture 2, PDF page 10. Source figure with original labels and axes retained.",
              "aspect": 0.9462686567164179,
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
          "id": "L02-mutation-check",
          "practice": "extra",
          "prompt": "What initially changes after selective sodium permeability rises?",
          "correct": 1,
          "options": [
            {
              "text": "Its Nernst voltage changes; its weighting stays fixed",
              "feedback": "Permeability is not an input to Nernst; unchanged concentration ratios keep Nernst voltages fixed."
            },
            {
              "text": "Its weighting changes; its Nernst voltage stays fixed",
              "feedback": "Sodium gains weight in GHK while its own equilibrium potential stays fixed initially."
            }
          ],
          "hints": [
            {
              "body": "Nernst uses concentrations and valence, whereas GHK also uses permeabilities."
            },
            {
              "body": "Identify which of those inputs the mutation changes initially."
            }
          ],
          "modelAnswer": [
            "Its weighting changes; its Nernst voltage stays fixed."
          ]
        },
        {
          "id": "L02-mutation-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L02 PDF 13",
          "prompt": "Which input sets an individual Nernst potential at fixed temperature and valence?",
          "correct": 0,
          "options": [
            {
              "text": "The ion concentration ratio",
              "feedback": "Nernst uses the concentration ratio for that ion, not its permeability or conductance."
            },
            {
              "text": "The ion permeability ratio",
              "feedback": "Relative permeability affects mixed-ion GHK voltage, not an individual Nernst potential."
            },
            {
              "text": "The ion conductance ratio",
              "feedback": "Conductances weight the parallel-branch voltage model, not the single-ion Nernst relation."
            }
          ],
          "hints": [
            {
              "body": "Identify which definition or experimental role this section introduces."
            },
            {
              "body": "Distinguish that role from the neighboring terms in the section."
            }
          ],
          "modelAnswer": [
            "Nernst uses the concentration ratio for that ion, not its permeability or conductance."
          ]
        }
      ]
    },
    {
      "id": "neuron",
      "title": "Signal locations in a neuron",
      "keyTerms": [],
      "source": "L02 PDF 14",
      "blocks": [
        {
          "type": "text",
          "body": [
            "Dendrites receive signals and the soma integrates input. Spikes initiate in the axon initial segment near the hillock, regenerate along the axon, and reach the presynaptic terminals."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 2, PDF page 14. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 2, PDF page 14. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L02/neuron.webp', import.meta.url).href,
              "alt": "Lecture 2, PDF page 14. Source figure with original labels and axes retained.",
              "aspect": 1.0816714150047484,
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
          "id": "L02-neuron-check",
          "prompt": "Which region is the taught action-potential origin?",
          "correct": 0,
          "options": [
            {
              "text": "The axon hillock near the soma",
              "feedback": "The lecture identifies the hillock as the spike-origin region."
            },
            {
              "text": "The dendritic spine near a synapse",
              "feedback": "Dendritic spines are receiving sites with local graded signals in this diagram."
            }
          ],
          "hints": [
            {
              "body": "Distinguish the receiving arbor from the beginning of the output process."
            },
            {
              "body": "Locate the transition between soma and axon in the source diagram."
            }
          ],
          "modelAnswer": [
            "The axon hillock near the soma."
          ]
        },
        {
          "id": "L02-neuron-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L02 PDF 14",
          "prompt": "Which region is the main receiving region in the taught neuronal diagram?",
          "correct": 1,
          "options": [
            {
              "text": "The hillock and initial output region",
              "feedback": "The hillock is the taught spike-origin region, rather than the main receiving arbor."
            },
            {
              "text": "The dendrites and their spines",
              "feedback": "Dendrites and spines receive inputs that produce local graded signals."
            },
            {
              "text": "The axon and its distant terminals",
              "feedback": "The axon carries regenerated signals toward output terminals."
            }
          ],
          "hints": [
            {
              "body": "Identify which definition or experimental role this section introduces."
            },
            {
              "body": "Distinguish that role from the neighboring terms in the section."
            }
          ],
          "modelAnswer": [
            "Dendrites and spines receive inputs that produce local graded signals."
          ]
        }
      ]
    },
    {
      "id": "signalling",
      "title": "Graded signals and regenerated spikes",
      "keyTerms": [],
      "source": "L02 PDF 15",
      "blocks": [
        {
          "type": "text",
          "body": [
            "Graded signals encode stimulus strength in amplitude, can summate and decay as they spread. Spikes require threshold, regenerate along the axon and do not summate. Stronger stimuli can increase firing frequency."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 2, PDF page 15. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 2, PDF page 15. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L02/signalling.webp', import.meta.url).href,
              "alt": "Lecture 2, PDF page 15. Source figure with original labels and axes retained.",
              "aspect": 0.7070631970260223,
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
          "id": "L02-signalling-check",
          "prompt": "Which property distinguishes graded responses from spikes?",
          "correct": 1,
          "options": [
            {
              "text": "Spikes can summate into a larger amplitude",
              "feedback": "Spike amplitude does not summate; stronger stimulation is typically encoded by frequency."
            },
            {
              "text": "Graded responses can summate in amplitude",
              "feedback": "Graded amplitudes can add, unlike the regenerated spikes contrasted here."
            }
          ],
          "hints": [
            {
              "body": "Compare how the two modes represent stronger input."
            },
            {
              "body": "Ask which response amplitude can add to another local response."
            }
          ],
          "modelAnswer": [
            "Graded responses can summate in amplitude."
          ]
        },
        {
          "id": "L02-signalling-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L02 PDF 15",
          "prompt": "How is stronger stimulation typically encoded in a train of action potentials?",
          "correct": 2,
          "options": [
            {
              "text": "By a larger spike amplitude",
              "feedback": "Individual spikes do not become proportionally larger as stimulation increases."
            },
            {
              "text": "By a larger summed spike",
              "feedback": "Amplitude summation is a property of graded responses, not a spike train."
            },
            {
              "text": "By a higher firing frequency",
              "feedback": "Stimulus strength is represented by firing frequency rather than larger individual spikes."
            }
          ],
          "hints": [
            {
              "body": "Identify which definition or experimental role this section introduces."
            },
            {
              "body": "Distinguish that role from the neighboring terms in the section."
            }
          ],
          "modelAnswer": [
            "Stimulus strength is represented by firing frequency rather than larger individual spikes."
          ]
        }
      ]
    },
    {
      "id": "action-potential",
      "title": "From overshoot to afterhyperpolarization",
      "keyTerms": [],
      "source": "L02 PDF 16",
      "blocks": [
        {
          "type": "text",
          "body": [
            "Rapidly rising sodium conductance depolarizes the squid axon toward $E_{\\mathrm{Na}}$. Sodium inactivation and delayed potassium activation repolarize it. Potassium conductance that persists after the spike can drive the afterhyperpolarization. The voltage trace shows these phases; clamp separates the currents."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 2, PDF page 16. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 2, PDF page 16. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L02/action-potential.webp', import.meta.url).href,
              "alt": "Lecture 2, PDF page 16. Source figure with original labels and axes retained.",
              "aspect": 1.030844155844156,
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
          "id": "L02-action-potential-check",
          "prompt": "What observation follows repolarization in the source trace?",
          "correct": 0,
          "options": [
            {
              "text": "Voltage briefly becomes more negative than rest",
              "feedback": "The afterhyperpolarization is a brief voltage excursion below rest after repolarization."
            },
            {
              "text": "Voltage briefly becomes more positive than rest",
              "feedback": "The supplied trace shows a brief undershoot below rest, rather than a positive excursion."
            }
          ],
          "hints": [
            {
              "body": "Follow the waveform after it returns from the overshoot."
            },
            {
              "body": "Compare the brief undershoot with the earlier baseline."
            }
          ],
          "modelAnswer": [
            "Voltage briefly becomes more negative than rest."
          ]
        },
        {
          "id": "L02-action-potential-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L02 PDF 16",
          "prompt": "What is the overshoot of an action potential?",
          "correct": 0,
          "options": [
            {
              "text": "The phase above zero voltage",
              "feedback": "During the overshoot, inside voltage is positive relative to outside."
            },
            {
              "text": "The phase below resting voltage",
              "feedback": "A phase below rest is an afterhyperpolarization, not the overshoot."
            },
            {
              "text": "The phase returning toward rest",
              "feedback": "Returning toward rest is repolarization; overshoot names the positive-voltage part."
            }
          ],
          "hints": [
            {
              "body": "Identify which definition or experimental role this section introduces."
            },
            {
              "body": "Distinguish that role from the neighboring terms in the section."
            }
          ],
          "modelAnswer": [
            "During the overshoot, inside voltage is positive relative to outside."
          ]
        }
      ]
    },
    {
      "id": "clamp",
      "title": "Separating early and late clamp currents",
      "keyTerms": [],
      "source": "L02 PDF 17–18; Exercise2 P2",
      "blocks": [
        {
          "type": "text",
          "body": [
            "Voltage clamp controls voltage and measures current. In the source step, early inward sodium current activates and inactivates quickly, followed by delayed outward potassium current. Replace outside sodium with choline and subtract the residual at matched voltage and time. Exercise 2 uses the sodium reversal shift to infer an outside concentration ratio at fixed inside concentration and temperature. A smaller late outward current at matched voltage and time suggests higher outside potassium if potassium conductance is unchanged."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 2, PDF page 18. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 2, PDF page 18. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L02/clamp.webp', import.meta.url).href,
              "alt": "Lecture 2, PDF page 18. Source figure with original labels and axes retained.",
              "aspect": 0.7456213511259383,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        },
        {
          "type": "optionalInfo",
          "title": "Extra detail",
          "body": [
            "A reversal read from a trace gives an approximate concentration ratio. Check the voltage steps that bracket the change of current sign."
          ]
        }
      ],
      "formulas": [
        {
          "id": "L02-f-reversal-ratio",
          "name": "Concentration ratio from a reversal shift",
          "tex": "\\frac{C_{o,A}}{C_{o,B}}=10^{(E_A-E_B)/k}",
          "symbols": [
            {
              "tex": "C_{o,A}",
              "name": "Outside concentration A",
              "unit": "mM",
              "meaning": "First solution."
            },
            {
              "tex": "C_{o,B}",
              "name": "Outside concentration B",
              "unit": "mM",
              "meaning": "Second solution."
            },
            {
              "tex": "E_A",
              "name": "Reversal A",
              "unit": "V",
              "meaning": "Single-ion reversal in first solution."
            },
            {
              "tex": "E_B",
              "name": "Reversal B",
              "unit": "V",
              "meaning": "Single-ion reversal in second solution."
            },
            {
              "tex": "k",
              "name": "Nernst shortcut",
              "unit": "V",
              "meaning": "Use stated monovalent shortcut."
            }
          ],
          "reads": "Subtract Nernst voltages to cancel the common inside concentration.",
          "assumes": "Same monovalent cation, fixed inside concentration and temperature.",
          "variants": [],
          "drill": {
            "prompt": "At $20\\,^{\\circ}\\text{C}$, sodium reversals in two solutions differ by $29\\,\\text{mV}$, with A more positive. Use $58\\,\\text{mV}$. Find outside concentration ratio A/B.",
            "answer": {
              "value": 3.1622776601683795,
              "unit": "",
              "tolerance": 0.00948683298050514,
              "verification": {
                "relation": "nernstRatio",
                "inputs": {
                  "delta": 0.029,
                  "shortcut": 0.058
                },
                "displayScale": 1
              }
            },
            "tex": "C_{o,A}/C_{o,B}=10^{29/58}",
            "modelAnswer": [
              "Subtract Nernst voltages to cancel the common inside concentration."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\frac{C_{o,A}}{C_{o,B}}=10^{(E_A-E_B)/k}$."
              },
              {
                "body": "Start with $C_{o,A}/C_{o,B}=10^{29/58}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\frac{\\htmlClass{formula-term-0}{C_{o,A}}}{\\htmlClass{formula-term-1}{C_{o,B}}}=10^{(\\htmlClass{formula-term-2}{E_A}-\\htmlClass{formula-term-3}{E_B})/\\htmlClass{formula-term-4}{k}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L02-clamp-check",
          "prompt": "Which operation isolates sodium from control and sodium-free current?",
          "correct": 1,
          "options": [
            {
              "text": "Sodium-free current minus control current",
              "feedback": "This subtraction reverses the sign of the sodium component."
            },
            {
              "text": "Control current minus sodium-free current",
              "feedback": "Control contains sodium plus residual current; subtracting the residual isolates sodium."
            }
          ],
          "hints": [
            {
              "body": "Control contains the component of interest plus residual pathways."
            },
            {
              "body": "Write control as a sum before isolating the removed component."
            }
          ],
          "modelAnswer": [
            "Control current minus sodium-free current."
          ]
        },
        {
          "id": "L02-clamp-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L02 PDF 17–18",
          "prompt": "Which quantity does a voltage clamp control?",
          "correct": 1,
          "options": [
            {
              "text": "The membrane conductance",
              "feedback": "Conductance is inferred from currents and driving force rather than directly held by the clamp."
            },
            {
              "text": "The membrane voltage",
              "feedback": "Voltage clamp holds a commanded voltage while the required current is recorded."
            },
            {
              "text": "The membrane current",
              "feedback": "Current is the measured response in voltage clamp; current clamp instead prescribes current."
            }
          ],
          "hints": [
            {
              "body": "Identify which definition or experimental role this section introduces."
            },
            {
              "body": "Distinguish that role from the neighboring terms in the section."
            }
          ],
          "modelAnswer": [
            "Voltage clamp holds a commanded voltage while the required current is recorded."
          ]
        }
      ]
    },
    {
      "id": "blockers",
      "title": "Pharmacological isolation",
      "keyTerms": [],
      "source": "L02 PDF 19–20",
      "blocks": [
        {
          "type": "text",
          "body": [
            "In the source protocol, TTX blocks sodium current and TEA blocks potassium current. Subtract the residual from control at matched voltage and time. The inference assumes selective, complete block and unchanged remaining currents."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 2, PDF page 19. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 2, PDF page 19. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L02/blockers.webp', import.meta.url).href,
              "alt": "Lecture 2, PDF page 19. Source figure with original labels and axes retained.",
              "aspect": 0.7483766233766234,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        },
        {
          "type": "link",
          "href": "https://www.youtube.com/watch?v=g2hysrWbuZs",
          "label": "The squid and its giant nerve fibre",
          "body": "Optional source PDF page 20 video. No question requires it."
        }
      ],
      "formulas": [],
      "conceptQuiz": [
        {
          "id": "L02-blockers-check",
          "prompt": "Which current remains after sodium block by TTX?",
          "correct": 0,
          "options": [
            {
              "text": "The isolated potassium current remains",
              "feedback": "TTX blocks sodium, leaving potassium in the taught two-component isolation."
            },
            {
              "text": "The isolated sodium current remains",
              "feedback": "Sodium is the blocked component; it is not the current left after TTX."
            }
          ],
          "hints": [
            {
              "body": "Separate the current that is blocked from the current left behind."
            },
            {
              "body": "TTX targets the early transient component in the taught protocol."
            }
          ],
          "modelAnswer": [
            "The isolated potassium current remains."
          ]
        },
        {
          "id": "L02-blockers-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L02 PDF 19",
          "prompt": "Which component does TEA block in the taught squid experiment?",
          "correct": 2,
          "options": [
            {
              "text": "The sodium-current component",
              "feedback": "TTX is the sodium-channel blocker in the paired experiment."
            },
            {
              "text": "The capacitive-current component",
              "feedback": "Capacitive current reflects membrane charging, not the potassium pathway blocked by TEA."
            },
            {
              "text": "The potassium-current component",
              "feedback": "TEA suppresses potassium current in the taught isolation experiment."
            }
          ],
          "hints": [
            {
              "body": "Identify which definition or experimental role this section introduces."
            },
            {
              "body": "Distinguish that role from the neighboring terms in the section."
            }
          ],
          "modelAnswer": [
            "TEA suppresses potassium current in the taught isolation experiment."
          ]
        }
      ]
    },
    {
      "id": "circuit",
      "title": "Equivalent circuit and current balance",
      "keyTerms": [],
      "source": "L02 PDF 21–22",
      "blocks": [
        {
          "type": "text",
          "body": [
            "The membrane capacitor is parallel to ionic branches, each with a conductance and a battery for its reversal potential. Use $I_m=I_C+I_i$ with $I_C=C\\,dV_m/dt$. Pair total capacitance with total current, or specific capacitance with current density."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 2, PDF page 22. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 2, PDF page 22. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L02/circuit.webp', import.meta.url).href,
              "alt": "Lecture 2, PDF page 22. Source figure with original labels and axes retained.",
              "aspect": 2.368150684931507,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L02-f-capacitive",
          "name": "Capacitive current",
          "tex": "I_C=C\\frac{dV_m}{dt}",
          "symbols": [
            {
              "tex": "I_C",
              "name": "Capacitive current",
              "unit": "A",
              "meaning": "Current in capacitive branch under circuit sign convention."
            },
            {
              "tex": "C",
              "name": "Capacitance",
              "unit": "F",
              "meaning": "Total capacitance for total current."
            },
            {
              "tex": "V_m",
              "name": "Voltage",
              "unit": "V",
              "meaning": "Inside minus outside."
            },
            {
              "tex": "t",
              "name": "Time",
              "unit": "s",
              "meaning": "Time coordinate."
            }
          ],
          "reads": "Capacitive current depends on voltage slope, not on voltage alone.",
          "assumes": "Constant capacitance.",
          "variants": [],
          "drill": {
            "prompt": "A $50\\,\\text{pF}$ membrane voltage rises at $2\\,\\text{mV/ms}$. Find capacitive current.",
            "answer": {
              "value": 100,
              "unit": "pA",
              "tolerance": 0.3,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 5e-11,
                  "b": 2
                },
                "displayScale": 1e-12
              }
            },
            "tex": "I_C=(50\\,\\text{pF})(2\\,\\text{V/s})",
            "modelAnswer": [
              "Capacitive current depends on voltage slope, not on voltage alone."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $I_C=C\\frac{dV_m}{dt}$."
              },
              {
                "body": "Start with $I_C=(50\\,\\text{pF})(2\\,\\text{V/s})$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{I_C}=\\htmlClass{formula-term-1}{C}\\frac{d\\htmlClass{formula-term-2}{V_m}}{d\\htmlClass{formula-term-3}{t}}"
        },
        {
          "id": "L02-f-current-balance",
          "name": "Total branch current",
          "tex": "I_m=I_i+I_C",
          "symbols": [
            {
              "tex": "I_m",
              "name": "Total branch current",
              "unit": "A",
              "meaning": "Sum in common circuit direction."
            },
            {
              "tex": "I_i",
              "name": "Ionic current",
              "unit": "A",
              "meaning": "Sum over ionic pathways."
            },
            {
              "tex": "I_C",
              "name": "Capacitive current",
              "unit": "A",
              "meaning": "Capacitive branch current."
            }
          ],
          "reads": "Currents add algebraically with consistent reference directions.",
          "assumes": "Total currents, not a mix of current and current density.",
          "variants": [],
          "drill": {
            "prompt": "With common reference direction, ionic current is $-40\\,\\text{pA}$ and capacitive current is $+100\\,\\text{pA}$. Find total branch current.",
            "answer": {
              "value": 60,
              "unit": "pA",
              "tolerance": 0.18,
              "verification": {
                "relation": "sum",
                "inputs": {
                  "a": -4e-11,
                  "b": 1e-10
                },
                "displayScale": 1e-12
              }
            },
            "tex": "I_m=-40\\,\\text{pA}+100\\,\\text{pA}",
            "modelAnswer": [
              "Currents add algebraically with consistent reference directions."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $I_m=I_i+I_C$."
              },
              {
                "body": "Start with $I_m=-40\\,\\text{pA}+100\\,\\text{pA}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{I_m}=\\htmlClass{formula-term-1}{I_i}+\\htmlClass{formula-term-2}{I_C}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L02-circuit-check",
          "prompt": "What does an ionic branch battery represent?",
          "correct": 1,
          "options": [
            {
              "text": "Its geometric membrane capacitance",
              "feedback": "A capacitor represents charge storage; the ionic battery represents a reversal voltage."
            },
            {
              "text": "Its electrochemical reversal potential",
              "feedback": "The branch battery sets the electrochemical reversal potential for its pathway."
            }
          ],
          "hints": [
            {
              "body": "A battery is a voltage source rather than a charge-storage element."
            },
            {
              "body": "Ask what voltage gives zero current through the ionic branch."
            }
          ],
          "modelAnswer": [
            "Its electrochemical reversal potential."
          ]
        },
        {
          "id": "L02-circuit-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L02 PDF 22",
          "prompt": "Which circuit element represents membrane charge storage?",
          "correct": 0,
          "options": [
            {
              "text": "The membrane capacitor",
              "feedback": "The capacitor stores charge separated across the membrane."
            },
            {
              "text": "The ionic branch resistor",
              "feedback": "A branch resistor represents resistance to ionic flow."
            },
            {
              "text": "The ionic branch battery",
              "feedback": "The branch battery represents the electrochemical reversal potential."
            }
          ],
          "hints": [
            {
              "body": "Identify which definition or experimental role this section introduces."
            },
            {
              "body": "Distinguish that role from the neighboring terms in the section."
            }
          ],
          "modelAnswer": [
            "The capacitor stores charge separated across the membrane."
          ]
        }
      ],
      "part": {
        "id": "electrical",
        "number": 2,
        "title": "Electrical properties of cell membranes"
      }
    },
    {
      "id": "reversal",
      "title": "Ion equilibrium, channel reversal and whole-cell rest",
      "keyTerms": [],
      "source": "L02 PDF 23",
      "blocks": [
        {
          "type": "text",
          "body": [
            "Ion equilibrium means zero net flux of one ion. Channel reversal means zero net current through that pathway. They coincide for a passive single-ion channel. For a mixed channel, currents can cancel at reversal. Whole-cell rest balances all membrane currents."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 2, PDF page 26. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 2, PDF page 26. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L02/parallel.webp', import.meta.url).href,
              "alt": "Lecture 2, PDF page 26. Source figure with original labels and axes retained.",
              "aspect": 1.893223819301848,
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
          "id": "L02-reversal-check",
          "prompt": "Which quantity belongs to a conducting channel pathway?",
          "correct": 0,
          "options": [
            {
              "text": "Its current reversal potential",
              "feedback": "A conducting pathway has a reversal voltage where its net current changes sign."
            },
            {
              "text": "The cell’s complete resting state",
              "feedback": "Rest describes the whole cell, including all pathways and any pump contribution."
            }
          ],
          "hints": [
            {
              "body": "Compare properties of an ion, a pathway and an entire membrane."
            },
            {
              "body": "Choose the level whose current changes direction at the specified voltage."
            }
          ],
          "modelAnswer": [
            "Its current reversal potential."
          ]
        },
        {
          "id": "L02-reversal-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L02 PDF 23",
          "prompt": "Which voltage describes the whole cell in the absence of stimulation?",
          "correct": 1,
          "options": [
            {
              "text": "The channel reversal potential",
              "feedback": "A reversal potential belongs to a pathway whose net current changes direction."
            },
            {
              "text": "The resting membrane potential",
              "feedback": "Resting potential describes the whole-cell state and can include opposing ionic currents."
            },
            {
              "text": "The single-ion equilibrium potential",
              "feedback": "An equilibrium potential belongs to a particular ion and its concentration ratio."
            }
          ],
          "hints": [
            {
              "body": "Identify which definition or experimental role this section introduces."
            },
            {
              "body": "Distinguish that role from the neighboring terms in the section."
            }
          ],
          "modelAnswer": [
            "Resting potential describes the whole-cell state and can include opposing ionic currents."
          ]
        }
      ]
    },
    {
      "id": "conductance",
      "title": "Driving force and ionic conductance",
      "keyTerms": [],
      "source": "L02 PDF 24",
      "blocks": [
        {
          "type": "text",
          "body": [
            "For an ohmic branch, $I_i=g_i(V_m-E_i)$. Above reversal, current is positive and outward for positive conductance. Chloride particles move opposite to conventional current. Parallel conductances add at the same voltage and time; voltage-dependent conductance can make the I–V curve nonlinear."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 2, PDF page 24. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 2, PDF page 24. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L02/conductance.webp', import.meta.url).href,
              "alt": "Lecture 2, PDF page 24. Source figure with original labels and axes retained.",
              "aspect": 2.091451292246521,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L02-f-ionic",
          "name": "Ionic driving force",
          "tex": "I=g(V_m-E)",
          "symbols": [
            {
              "tex": "I",
              "name": "Ionic current",
              "unit": "A",
              "meaning": "Positive outward conventional current."
            },
            {
              "tex": "g",
              "name": "Conductance",
              "unit": "S",
              "meaning": "Nonnegative chord conductance."
            },
            {
              "tex": "V_m",
              "name": "Voltage",
              "unit": "V",
              "meaning": "Inside relative to outside."
            },
            {
              "tex": "E",
              "name": "Reversal",
              "unit": "V",
              "meaning": "Zero-current voltage."
            }
          ],
          "reads": "Current reverses when membrane voltage crosses reversal.",
          "assumes": "Ohmic branch or a specified chord conductance.",
          "variants": [],
          "drill": {
            "prompt": "For $g=5\\,\\text{nS}$, $V_m=-40\\,\\text{mV}$ and $E=-80\\,\\text{mV}$, find current.",
            "answer": {
              "value": 200,
              "unit": "pA",
              "tolerance": 0.6,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 5e-09,
                  "b": 0.04
                },
                "displayScale": 1e-12
              }
            },
            "tex": "I=(5\\,\\text{nS})[-40-(-80)]\\,\\text{mV}",
            "modelAnswer": [
              "Current reverses when membrane voltage crosses reversal."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $I=g(V_m-E)$."
              },
              {
                "body": "Start with $I=(5\\,\\text{nS})[-40-(-80)]\\,\\text{mV}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{I}=\\htmlClass{formula-term-1}{g}(\\htmlClass{formula-term-2}{V_m}-\\htmlClass{formula-term-3}{E})"
        },
        {
          "id": "L02-f-sum-conductance",
          "name": "Parallel conductance sum",
          "tex": "G=g_1+g_2",
          "symbols": [
            {
              "tex": "G",
              "name": "Total conductance",
              "unit": "S",
              "meaning": "Sum of parallel ionic pathways."
            },
            {
              "tex": "g_1",
              "name": "First conductance",
              "unit": "S",
              "meaning": "First branch."
            },
            {
              "tex": "g_2",
              "name": "Second conductance",
              "unit": "S",
              "meaning": "Second branch."
            }
          ],
          "reads": "Parallel pathways add conducting capacity.",
          "assumes": "Specified conductances at the same voltage and time.",
          "variants": [],
          "drill": {
            "prompt": "Two parallel pathways have $4$ and $7\\,\\text{nS}$. Find total conductance.",
            "answer": {
              "value": 11,
              "unit": "nS",
              "tolerance": 0.033,
              "verification": {
                "relation": "sum",
                "inputs": {
                  "a": 4e-09,
                  "b": 7e-09
                },
                "displayScale": 1e-09
              }
            },
            "tex": "G=4\\,\\text{nS}+7\\,\\text{nS}",
            "modelAnswer": [
              "Parallel pathways add conducting capacity."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $G=g_1+g_2$."
              },
              {
                "body": "Start with $G=4\\,\\text{nS}+7\\,\\text{nS}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{G}=\\htmlClass{formula-term-1}{g_1}+\\htmlClass{formula-term-2}{g_2}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L02-conductance-check",
          "prompt": "When is passive ohmic ionic current zero?",
          "correct": 1,
          "options": [
            {
              "text": "When voltage equals extracellular zero",
              "feedback": "The extracellular reference is arbitrary; zero driving force occurs at branch reversal."
            },
            {
              "text": "When voltage equals the branch reversal",
              "feedback": "At branch reversal, driving force vanishes even if channels remain open."
            }
          ],
          "hints": [
            {
              "body": "Use current equals conductance times driving force."
            },
            {
              "body": "Set the driving-force factor to zero while leaving conductance nonzero."
            }
          ],
          "modelAnswer": [
            "When voltage equals the branch reversal."
          ]
        },
        {
          "id": "L02-conductance-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L02 PDF 24",
          "prompt": "What is ionic driving force in the ohmic branch model?",
          "correct": 2,
          "options": [
            {
              "text": "Reversal minus membrane voltage",
              "feedback": "Reversing the subtraction reverses the current sign for a positive conductance."
            },
            {
              "text": "Membrane voltage plus reversal",
              "feedback": "Adding voltages does not make the driving force vanish at reversal."
            },
            {
              "text": "Membrane voltage minus reversal",
              "feedback": "With positive outward current, driving force is membrane voltage minus branch reversal."
            }
          ],
          "hints": [
            {
              "body": "Identify which definition or experimental role this section introduces."
            },
            {
              "body": "Distinguish that role from the neighboring terms in the section."
            }
          ],
          "modelAnswer": [
            "With positive outward current, driving force is membrane voltage minus branch reversal."
          ]
        }
      ]
    },
    {
      "id": "slope",
      "title": "Slope and chord are different",
      "keyTerms": [],
      "source": "L02 PDF 25",
      "blocks": [
        {
          "type": "text",
          "body": [
            "Slope is the local tangent $dI/dV$. Chord is the secant between two points, or $I/(V_m-E_{\\mathrm{rev}})$ using reversal as the reference. A falling curve can have negative slope and positive chord."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 2, PDF page 25. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 2, PDF page 25. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L02/slope.webp', import.meta.url).href,
              "alt": "Lecture 2, PDF page 25. Source figure with original labels and axes retained.",
              "aspect": 0.9010989010989011,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L02-f-slope",
          "name": "Local slope conductance",
          "tex": "G_s=\\frac{dI}{dV}",
          "symbols": [
            {
              "tex": "G_s",
              "name": "Slope conductance",
              "unit": "S",
              "meaning": "Local derivative."
            },
            {
              "tex": "I",
              "name": "Current",
              "unit": "A",
              "meaning": "Signed current."
            },
            {
              "tex": "V",
              "name": "Voltage",
              "unit": "V",
              "meaning": "Local voltage coordinate."
            }
          ],
          "reads": "The local derivative measures current change for a small voltage change.",
          "assumes": "Use a sufficiently small stated interval for a finite-difference estimate.",
          "variants": [],
          "drill": {
            "prompt": "Near an operating point, current falls by $30\\,\\text{pA}$ as voltage rises $5\\,\\text{mV}$. Estimate slope conductance.",
            "answer": {
              "value": -6,
              "unit": "nS",
              "tolerance": 0.018000000000000002,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": -3e-11,
                  "b": 0.005
                },
                "displayScale": 1e-09
              }
            },
            "tex": "G_s\\approx\\frac{-30\\,\\text{pA}}{5\\,\\text{mV}}",
            "modelAnswer": [
              "The local derivative measures current change for a small voltage change."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $G_s=\\frac{dI}{dV}$."
              },
              {
                "body": "Start with $G_s\\approx\\frac{-30\\,\\text{pA}}{5\\,\\text{mV}}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{G_s}=\\frac{d\\htmlClass{formula-term-1}{I}}{d\\htmlClass{formula-term-2}{V}}"
        },
        {
          "id": "L02-f-chord",
          "name": "Chord to reversal",
          "tex": "G_c=\\frac{I}{V-E}",
          "symbols": [
            {
              "tex": "G_c",
              "name": "Chord conductance",
              "unit": "S",
              "meaning": "Secant to the zero-current reversal."
            },
            {
              "tex": "I",
              "name": "Current",
              "unit": "A",
              "meaning": "Current at the chosen point."
            },
            {
              "tex": "V",
              "name": "Voltage",
              "unit": "V",
              "meaning": "Voltage at the chosen point."
            },
            {
              "tex": "E",
              "name": "Reversal",
              "unit": "V",
              "meaning": "Reference zero-current point."
            }
          ],
          "reads": "The chord to reversal divides current by driving force.",
          "assumes": "Nonzero driving force. General secant is $(I_2-I_1)/(V_2-V_1)$.",
          "variants": [],
          "drill": {
            "prompt": "At $V=-20\\,\\text{mV}$, $E=-60\\,\\text{mV}$ and $I=120\\,\\text{pA}$, find chord conductance.",
            "answer": {
              "value": 3,
              "unit": "nS",
              "tolerance": 0.009000000000000001,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 1.2e-10,
                  "b": 0.04
                },
                "displayScale": 1e-09
              }
            },
            "tex": "G_c=\\frac{120\\,\\text{pA}}{[-20-(-60)]\\,\\text{mV}}",
            "modelAnswer": [
              "The chord to reversal divides current by driving force."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $G_c=\\frac{I}{V-E}$."
              },
              {
                "body": "Start with $G_c=\\frac{120\\,\\text{pA}}{[-20-(-60)]\\,\\text{mV}}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{G_c}=\\frac{\\htmlClass{formula-term-1}{I}}{\\htmlClass{formula-term-2}{V}-\\htmlClass{formula-term-3}{E}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L02-slope-check",
          "prompt": "Which conductance uses a local tangent?",
          "correct": 0,
          "options": [
            {
              "text": "Slope conductance at the operating point",
              "feedback": "Slope conductance is the local derivative, represented by the tangent."
            },
            {
              "text": "Chord conductance from the reversal point",
              "feedback": "Chord conductance uses a secant from reversal, not the local tangent."
            }
          ],
          "hints": [
            {
              "body": "Compare a tangent with a line joining two separated points."
            },
            {
              "body": "A derivative uses a very small neighborhood around the operating point."
            }
          ],
          "modelAnswer": [
            "Slope conductance at the operating point."
          ]
        },
        {
          "id": "L02-slope-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L02 PDF 25",
          "prompt": "How is chord conductance represented on a current–voltage plot?",
          "correct": 0,
          "options": [
            {
              "text": "A secant drawn from reversal",
              "feedback": "Chord conductance uses current divided by voltage displacement from reversal."
            },
            {
              "text": "A tangent at the chosen voltage",
              "feedback": "A local tangent gives slope conductance, which can differ from chord conductance."
            },
            {
              "text": "A horizontal line through current",
              "feedback": "A horizontal current line does not give the current-to-driving-force ratio."
            }
          ],
          "hints": [
            {
              "body": "Identify which definition or experimental role this section introduces."
            },
            {
              "body": "Distinguish that role from the neighboring terms in the section."
            }
          ],
          "modelAnswer": [
            "Chord conductance uses current divided by voltage displacement from reversal."
          ]
        }
      ]
    },
    {
      "id": "parallel",
      "title": "Parallel conductance voltage and its limits",
      "keyTerms": [],
      "source": "L02 PDF 26",
      "blocks": [
        {
          "type": "text",
          "body": [
            "Use $V_m=\\sum_i g_i E_i/\\sum_i g_i$ when voltage is stationary, the passive branches balance, and there is no unaccounted pump or applied current. Use each conductance at the operating voltage and time. An action-potential peak establishes only $dV_m/dt=0$."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 2, PDF page 26. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 2, PDF page 26. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L02/parallel.webp', import.meta.url).href,
              "alt": "Lecture 2, PDF page 26. Source figure with original labels and axes retained.",
              "aspect": 1.893223819301848,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L02-f-weighted",
          "name": "Conductance-weighted voltage",
          "tex": "V_m=\\frac{g_KE_K+g_{Na}E_{Na}+g_{Cl}E_{Cl}}{g_K+g_{Na}+g_{Cl}}",
          "symbols": [
            {
              "tex": "V_m",
              "name": "Membrane voltage",
              "unit": "V",
              "meaning": "Zero-total-current voltage."
            },
            {
              "tex": "g_K",
              "name": "Potassium conductance",
              "unit": "S",
              "meaning": "Weight at the stated voltage/time."
            },
            {
              "tex": "g_{Na}",
              "name": "Sodium conductance",
              "unit": "S",
              "meaning": "Weight at the stated voltage/time."
            },
            {
              "tex": "g_{Cl}",
              "name": "Chloride conductance",
              "unit": "S",
              "meaning": "Weight at the stated voltage/time."
            },
            {
              "tex": "E_K",
              "name": "Potassium reversal",
              "unit": "V",
              "meaning": "Branch battery."
            },
            {
              "tex": "E_{Na}",
              "name": "Sodium reversal",
              "unit": "V",
              "meaning": "Branch battery."
            },
            {
              "tex": "E_{Cl}",
              "name": "Chloride reversal",
              "unit": "V",
              "meaning": "Branch battery."
            }
          ],
          "reads": "Voltage is a conductance-weighted average of branch reversals.",
          "assumes": "Zero derivative and zero total current; no unaccounted pump or applied current.",
          "variants": [],
          "drill": {
            "prompt": "With no applied or pump current and stationary voltage, $g_K=8\\,\\text{nS}$, $g_{Na}=2\\,\\text{nS}$, $g_{Cl}=0$, $E_K=-85\\,\\text{mV}$ and $E_{Na}=55\\,\\text{mV}$. Find voltage.",
            "answer": {
              "value": -57,
              "unit": "mV",
              "tolerance": 0.171,
              "verification": {
                "relation": "weightedVoltage",
                "inputs": {
                  "gk": 8e-09,
                  "gna": 2e-09,
                  "gcl": 0,
                  "ek": -0.085,
                  "ena": 0.055,
                  "ecl": -0.065
                },
                "displayScale": 0.001
              }
            },
            "tex": "V_m=\\frac{8(-85)+2(55)}{8+2}\\,\\text{mV}",
            "modelAnswer": [
              "Voltage is a conductance-weighted average of branch reversals."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $V_m=\\frac{g_KE_K+g_{Na}E_{Na}+g_{Cl}E_{Cl}}{g_K+g_{Na}+g_{Cl}}$."
              },
              {
                "body": "Start with $V_m=\\frac{8(-85)+2(55)}{8+2}\\,\\text{mV}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{V_m}=\\frac{\\htmlClass{formula-term-1}{g_K}\\htmlClass{formula-term-4}{E_K}+\\htmlClass{formula-term-2}{g_{Na}}\\htmlClass{formula-term-5}{E_{Na}}+\\htmlClass{formula-term-3}{g_{Cl}}\\htmlClass{formula-term-6}{E_{Cl}}}{\\htmlClass{formula-term-1}{g_K}+\\htmlClass{formula-term-2}{g_{Na}}+\\htmlClass{formula-term-3}{g_{Cl}}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L02-parallel-check",
          "prompt": "What extra condition is needed beyond zero capacitive current for the weighted voltage?",
          "correct": 1,
          "options": [
            {
              "text": "Zero conductance through every ionic branch",
              "feedback": "The weighted-voltage model allows nonzero branch conductances and opposing currents."
            },
            {
              "text": "Zero net current through the full membrane",
              "feedback": "The zero-total-current condition is needed as well as zero capacitive current."
            }
          ],
          "hints": [
            {
              "body": "Zero voltage slope removes only the capacitive term."
            },
            {
              "body": "Keep any imposed current in the remaining ionic-current balance."
            }
          ],
          "modelAnswer": [
            "Zero net current through the full membrane."
          ]
        },
        {
          "id": "L02-parallel-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L02 PDF 26",
          "prompt": "How are branch conductances combined for parallel membrane pathways?",
          "correct": 1,
          "options": [
            {
              "text": "Their conductances are averaged",
              "feedback": "An average would omit pathways from the total conductance."
            },
            {
              "text": "Their conductances are added",
              "feedback": "Parallel pathways share voltage, so branch conductances add."
            },
            {
              "text": "Their resistances are added",
              "feedback": "Resistances add directly for series elements, not parallel pathways."
            }
          ],
          "hints": [
            {
              "body": "Identify which definition or experimental role this section introduces."
            },
            {
              "body": "Distinguish that role from the neighboring terms in the section."
            }
          ],
          "modelAnswer": [
            "Parallel pathways share voltage, so branch conductances add."
          ]
        }
      ]
    },
    {
      "id": "iv",
      "title": "Constructing and comparing IV curves",
      "keyTerms": [],
      "source": "L02 PDF 27",
      "blocks": [
        {
          "type": "text",
          "body": [
            "For an I–V curve, step the voltage and plot peak or steady-state current against command voltage. Use the same sampling rule and isolate the component before interpreting reversal. Current clamp instead imposes current and measures voltage."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 2, PDF page 27. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 2, PDF page 27. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L02/iv.webp', import.meta.url).href,
              "alt": "Lecture 2, PDF page 27. Source figure with original labels and axes retained.",
              "aspect": 1.7548872180451127,
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
          "id": "L02-iv-check",
          "prompt": "What must be kept consistent across an IV series?",
          "correct": 0,
          "options": [
            {
              "text": "The time or feature used to measure current",
              "feedback": "A consistent peak or sampling time makes the currents comparable across voltages."
            },
            {
              "text": "The measured current amplitude at each voltage",
              "feedback": "Current amplitude can vary across voltages; keep the sampling rule consistent, not the measured amplitude."
            }
          ],
          "hints": [
            {
              "body": "An early peak and a late steady value need not represent the same channel state."
            },
            {
              "body": "Choose one reproducible sampling rule before comparing command voltages."
            }
          ],
          "modelAnswer": [
            "The time or feature used to measure current."
          ]
        },
        {
          "id": "L02-iv-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L02 PDF 27",
          "prompt": "Which pair of quantities is plotted in an IV curve?",
          "correct": 2,
          "options": [
            {
              "text": "Current and elapsed recording time",
              "feedback": "Current versus time is a trace used to select samples for the IV curve."
            },
            {
              "text": "Voltage and elapsed recording time",
              "feedback": "Voltage versus time shows the command or response waveform rather than an IV relation."
            },
            {
              "text": "Current and membrane voltage",
              "feedback": "An IV curve relates sampled current to membrane voltage across commands."
            }
          ],
          "hints": [
            {
              "body": "Identify which definition or experimental role this section introduces."
            },
            {
              "body": "Distinguish that role from the neighboring terms in the section."
            }
          ],
          "modelAnswer": [
            "An IV curve relates sampled current to membrane voltage across commands."
          ]
        }
      ]
    },
    {
      "id": "calcium",
      "title": "Separating calcium currents and activation",
      "keyTerms": [],
      "source": "L02 PDF 28",
      "blocks": [
        {
          "type": "text",
          "body": [
            "Nifedipine leaves T-type calcium current in the source example. With selective block, subtract residual from control for L-type current, divide by driving force, then normalize by $g_{\\max}$. Near reversal, small driving force makes this estimate unreliable even with open channels."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 2, PDF page 28. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 2, PDF page 28. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L02/calcium.webp', import.meta.url).href,
              "alt": "Lecture 2, PDF page 28. Source figure with original labels and axes retained.",
              "aspect": 1.163677130044843,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 2, PDF page 28. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 2, PDF page 28. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L02/activation.webp', import.meta.url).href,
              "alt": "Lecture 2, PDF page 28. Source figure with original labels and axes retained.",
              "aspect": 1.778723404255319,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L02-f-fraction",
          "name": "Normalized conductance",
          "tex": "f=\\frac{g}{g_{max}}=\\frac{I}{(V-E)g_{max}}",
          "symbols": [
            {
              "tex": "f",
              "name": "Fractional conductance",
              "unit": "",
              "meaning": "Normalized activation readout."
            },
            {
              "tex": "g",
              "name": "Conductance",
              "unit": "S",
              "meaning": "Current divided by driving force."
            },
            {
              "tex": "g_{max}",
              "name": "Maximum conductance",
              "unit": "S",
              "meaning": "Normalization reference."
            },
            {
              "tex": "I",
              "name": "Current",
              "unit": "A",
              "meaning": "Isolated component."
            },
            {
              "tex": "V",
              "name": "Voltage",
              "unit": "V",
              "meaning": "Command voltage."
            },
            {
              "tex": "E",
              "name": "Reversal",
              "unit": "V",
              "meaning": "Component reversal."
            }
          ],
          "reads": "Normalize conductance rather than raw current to remove driving-force variation.",
          "assumes": "Use isolated current, nonzero driving force and a specified maximum.",
          "variants": [],
          "drill": {
            "prompt": "An isolated current is $-80\\,\\text{pA}$ at driving force $-40\\,\\text{mV}$; maximum conductance is $4\\,\\text{nS}$. Find fractional conductance.",
            "answer": {
              "value": 0.5,
              "unit": "",
              "tolerance": 0.0015,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 2e-09,
                  "b": 4e-09
                },
                "displayScale": 1
              }
            },
            "tex": "f=\\frac{(-80\\,\\text{pA})/(-40\\,\\text{mV})}{4\\,\\text{nS}}",
            "modelAnswer": [
              "Normalize conductance rather than raw current to remove driving-force variation."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $f=\\frac{g}{g_{max}}=\\frac{I}{(V-E)g_{max}}$."
              },
              {
                "body": "Start with $f=\\frac{(-80\\,\\text{pA})/(-40\\,\\text{mV})}{4\\,\\text{nS}}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{f}=\\frac{\\htmlClass{formula-term-1}{g}}{\\htmlClass{formula-term-2}{g_{max}}}=\\frac{\\htmlClass{formula-term-3}{I}}{(\\htmlClass{formula-term-4}{V}-\\htmlClass{formula-term-5}{E})\\htmlClass{formula-term-2}{g_{max}}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L02-calcium-check",
          "practice": "extra",
          "prompt": "What remains after L-type block by nifedipine in this example?",
          "correct": 1,
          "options": [
            {
              "text": "The L-type calcium component",
              "feedback": "Nifedipine blocks the L-type component; it is removed from the residual."
            },
            {
              "text": "The T-type calcium component",
              "feedback": "T-type current remains when L-type current is selectively blocked in this example."
            }
          ],
          "hints": [
            {
              "body": "Name the component inhibited by the drug first."
            },
            {
              "body": "The residual is the component that was not blocked in the taught selective model."
            }
          ],
          "modelAnswer": [
            "The T-type calcium component."
          ]
        },
        {
          "id": "L02-calcium-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L02 PDF 28",
          "prompt": "Which quantity is normalized to obtain the taught fractional activation curve?",
          "correct": 0,
          "options": [
            {
              "text": "The isolated channel conductance",
              "feedback": "Divide isolated conductance by its maximum to estimate fractional activation."
            },
            {
              "text": "The total control current amplitude",
              "feedback": "Control current mixes components and depends on driving force as well as conductance."
            },
            {
              "text": "The command voltage amplitude",
              "feedback": "Command voltage is the independent variable; its amplitude is not fractional activation."
            }
          ],
          "hints": [
            {
              "body": "Identify which definition or experimental role this section introduces."
            },
            {
              "body": "Distinguish that role from the neighboring terms in the section."
            }
          ],
          "modelAnswer": [
            "Divide isolated conductance by its maximum to estimate fractional activation."
          ]
        }
      ]
    }
  ],
  "recap": {
    "takeaways": ["Choose a single-ion equilibrium equation, a permeability model, or a conductance balance from the givens.", "At a reversal, a branch can be conductive even when its current is zero.", "Use clamp steps to separate capacitive transients from ionic currents."],
    "intro": "Practice reference. The official equation sheet and calculator are confirmed; open-book status is not established.",
    "terms": [
      {
        "term": "Permeability",
        "definition": "Diffusion and partition weighted crossing rate per concentration difference."
      },
      {
        "term": "Rest",
        "definition": "Steady whole-membrane voltage, not zero individual ionic currents."
      },
      {
        "term": "Reversal",
        "definition": "Zero net current through the specified pathway."
      },
      {
        "term": "Rectification",
        "definition": "Current passes more readily in one direction."
      },
      {
        "term": "Graded signal",
        "definition": "Amplitude varies and can summate; local spread attenuates."
      },
      {
        "term": "Action potential",
        "definition": "Thresholded regenerated signal; frequency can encode stimulus intensity."
      },
      {
        "term": "Chord conductance",
        "definition": "Current divided by driving force relative to reversal."
      },
      {
        "term": "Slope conductance",
        "definition": "Local current-voltage derivative."
      }
    ],
    "equations": [
      {
        "name": "Single-ion equilibrium",
        "tex": "E=\\frac{k}{z}\\log_{10}\\frac{C_o}{C_i}",
        "note": "One ion; use the stated temperature shortcut."
      },
      {
        "name": "Membrane permeability",
        "tex": "P=\\frac{D\\beta}{l}",
        "note": "Homogeneous membrane with linear concentration profile."
      },
      {
        "name": "Permeability flux",
        "tex": "J=-P\\Delta C",
        "note": "No electrical drift contribution in this relation."
      },
      {
        "name": "Mobility and permeability",
        "tex": "P=\\frac{RTu\\beta}{Fl}",
        "note": "Course relation $D=uRT/F$; this temperature comparison holds other parameters fixed."
      },
      {
        "name": "GHK resting voltage",
        "tex": "V_m=k\\log_{10}\\frac{P_KK_o+P_{Na}Na_o+P_{Cl}Cl_i}{P_KK_i+P_{Na}Na_i+P_{Cl}Cl_o}",
        "note": "Monovalent ions, constant field, independent movement, zero total current."
      },
      {
        "name": "GHK current density",
        "tex": "j=P\\frac{z^2F^2}{RT}V_m\\frac{C_i-C_oe^{-zFV_m/(RT)}}{1-e^{-zFV_m/(RT)}}",
        "note": "Concentrations in moles per cubic metre. Use the continuous limit at zero voltage."
      },
      {
        "name": "Spherical membrane area",
        "tex": "A=4\\pi r^2",
        "note": "Ideal sphere with no folding."
      },
      {
        "name": "Total from specific capacitance",
        "tex": "C=C_sA",
        "note": "Uniform specific capacitance."
      },
      {
        "name": "Charge increment",
        "tex": "\\Delta Q=C\\Delta V",
        "note": "Constant capacitance; charge increment is not outward ionic current."
      },
      {
        "name": "Monovalent ion count",
        "tex": "N=\\frac{|Q|}{e}",
        "note": "Monovalent ions; use the stated elementary charge."
      },
      {
        "name": "Concentration ratio from a reversal shift",
        "tex": "\\frac{C_{o,A}}{C_{o,B}}=10^{(E_A-E_B)/k}",
        "note": "Same monovalent cation, fixed inside concentration and temperature."
      },
      {
        "name": "Capacitive current",
        "tex": "I_C=C\\frac{dV_m}{dt}",
        "note": "Constant capacitance."
      },
      {
        "name": "Total branch current",
        "tex": "I_m=I_i+I_C",
        "note": "Total currents, not a mix of current and current density."
      },
      {
        "name": "Ionic driving force",
        "tex": "I=g(V_m-E)",
        "note": "Ohmic branch or a specified chord conductance."
      },
      {
        "name": "Parallel conductance sum",
        "tex": "G=g_1+g_2",
        "note": "Specified conductances at the same voltage and time."
      },
      {
        "name": "Local slope conductance",
        "tex": "G_s=\\frac{dI}{dV}",
        "note": "Use a sufficiently small stated interval for a finite-difference estimate."
      },
      {
        "name": "Chord to reversal",
        "tex": "G_c=\\frac{I}{V-E}",
        "note": "Nonzero driving force. General secant is $(I_2-I_1)/(V_2-V_1)$."
      },
      {
        "name": "Conductance-weighted voltage",
        "tex": "V_m=\\frac{g_KE_K+g_{Na}E_{Na}+g_{Cl}E_{Cl}}{g_K+g_{Na}+g_{Cl}}",
        "note": "Zero derivative and zero total current; no unaccounted pump or applied current."
      },
      {
        "name": "Normalized conductance",
        "tex": "f=\\frac{g}{g_{max}}=\\frac{I}{(V-E)g_{max}}",
        "note": "Use isolated current, nonzero driving force and a specified maximum."
      }
    ],
    "constants": [
      {
        "name": "Temperature shortcuts",
        "tex": "k=58\\,\\text{mV}\\ (20\\,^{\\circ}\\text{C});\\quad61.5\\,\\text{mV}\\ (37\\,^{\\circ}\\text{C})"
      },
      {
        "name": "Physical constants",
        "tex": "F=96485\\,\\text{C/mol},\\ R=8.314\\,\\text{J/(mol\\,K)},\\ e=1.6022\\times10^{-19}\\,\\text{C}"
      },
      {
        "name": "Specific membrane capacitance",
        "tex": "C_s\\approx1\\,\\mu\\text{F}/\\text{cm}^2=0.01\\,\\text{F/m}^2"
      }
    ],
    "conventions": [
      "$V_m=V_{in}-V_{out}$ and $V_{out}=0$.",
      "Outward conventional membrane current is positive. Negative-ion particle direction is opposite to conventional current.",
      "GHK chloride concentrations are reversed relative to cations. $\\ln(C_o/C_i)=-\\ln(C_i/C_o)$.",
      "Use total currents with total conductance/capacitance, or densities with specific quantities.",
      "Weighted resting voltage needs zero total current and zero voltage derivative; account for pumps and applied current.",
      "New numerical scenarios are practice data, not fabricated experimental recordings."
    ]
  },
  "lectureQuiz": [
    {
      "id": "L02-equilibrium-recall",
      "sectionId": "equilibrium",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "A single passive permeant ion brings voltage to its Nernst potential.",
          "answer": true
        },
        {
          "text": "A resting cell must have every ionic current equal to zero.",
          "answer": false,
          "correction": "A resting steady state requires zero total current; individual ionic currents may balance."
        },
        {
          "text": "Donnan equilibrium includes impermeant charge and equal electrochemical potentials for permeant ions.",
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
        "A single passive permeant ion brings voltage to its Nernst potential.",
        "A resting steady state requires zero total current; individual ionic currents may balance.",
        "Donnan equilibrium includes impermeant charge and equal electrochemical potentials for permeant ions."
      ],
      "points": 1,
      "source": "L02 PDF 2"
    },
    {
      "id": "L02-direct-nernst",
      "sectionId": "equilibrium",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Only potassium permeates. At $20\\,^{\\circ}\\text{C}$ use $58\\,\\text{mV}$, with outside $8\\,\\text{mM}$ and inside $160\\,\\text{mM}$. Find voltage.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Shortcut",
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
            },
            {
              "label": "Valence",
              "answer": {
                "value": 1,
                "unit": "",
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
              "label": "Outside",
              "answer": {
                "value": 8,
                "unit": "mM",
                "tolerance": 8e-06,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 8,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Inside",
              "answer": {
                "value": 160,
                "unit": "mM",
                "tolerance": 0.00015999999999999999,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 160,
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
            "value": -75.45973974851091,
            "unit": "mV",
            "tolerance": 0.22637921924553275,
            "verification": {
              "relation": "nernst",
              "inputs": {
                "shortcut": 0.058,
                "z": 1,
                "outside": 8,
                "inside": 160
              },
              "displayScale": 0.001
            }
          },
          "tex": "E=\\frac{k}{z}\\log_{10}\\frac{C_o}{C_i}",
          "modelAnswer": [
            "The concentration ratio and signed valence determine equilibrium voltage.",
            "$E=58\\,\\text{mV}\\log_{10}(8/160)$",
            "$-75.45974\\,\\text{mV}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $E=\\frac{k}{z}\\log_{10}\\frac{C_o}{C_i}$."
        },
        {
          "body": "Start with $E=58\\,\\text{mV}\\log_{10}(8/160)$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "The concentration ratio and signed valence determine equilibrium voltage."
      ],
      "points": 1,
      "source": "L02 PDF 2"
    },
    {
      "id": "L02-direct-permeability",
      "sectionId": "permeability",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $D=2\\times10^{-12}\\,\\text{m}^2/\\text{s}$, $\\beta=0.01$, $l=5\\,\\text{nm}$. Find permeability.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Diffusion",
              "answer": {
                "value": 2e-12,
                "unit": "m2/s",
                "tolerance": 1.9999999999999998e-18,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 2e-12,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Partition",
              "answer": {
                "value": 0.01,
                "unit": "",
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
              "label": "Thickness",
              "answer": {
                "value": 5e-09,
                "unit": "m",
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
            "value": 4e-06,
            "unit": "m/s",
            "tolerance": 1.2e-08,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 2e-14,
                "b": 5e-09
              },
              "displayScale": 1
            }
          },
          "tex": "P=\\frac{D\\beta}{l}",
          "modelAnswer": [
            "More diffusion or partition increases permeability; thickness reduces it.",
            "$P=\\frac{(2\\times10^{-12})(0.01)}{5\\times10^{-9}}\\,\\text{m/s}$",
            "$4e-06\\,\\text{m/s}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $P=\\frac{D\\beta}{l}$."
        },
        {
          "body": "Start with $P=\\frac{(2\\times10^{-12})(0.01)}{5\\times10^{-9}}\\,\\text{m/s}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "More diffusion or partition increases permeability; thickness reduces it."
      ],
      "points": 1,
      "source": "L02 PDF 5"
    },
    {
      "id": "L02-direct-flux",
      "sectionId": "permeability",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "For $P=3\\times10^{-6}\\,\\text{m/s}$ and $\\Delta C=20\\,\\text{mol/m}^3$, find signed flux density.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Permeability",
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
              "label": "Concentration difference",
              "answer": {
                "value": 20,
                "unit": "mol/m3",
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
          "title": "Evaluate",
          "answer": {
            "value": -6e-05,
            "unit": "mol/m2/s",
            "tolerance": 1.8e-07,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": -3e-06,
                "b": 20
              },
              "displayScale": 1
            }
          },
          "tex": "J=-P\\Delta C",
          "modelAnswer": [
            "Passive diffusive flux opposes the defined concentration difference.",
            "$J=-(3\\times10^{-6})(20)\\,\\text{mol}/(\\text{m}^2\\text{s})$",
            "$-6e-05\\,\\text{mol/m2/s}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $J=-P\\Delta C$."
        },
        {
          "body": "Start with $J=-(3\\times10^{-6})(20)\\,\\text{mol}/(\\text{m}^2\\text{s})$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Passive diffusive flux opposes the defined concentration difference."
      ],
      "points": 1,
      "source": "L02 PDF 5"
    },
    {
      "id": "L02-direct-mobility-permeability",
      "practice": "extra",
      "sectionId": "permeability",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Permeability is $2\\times10^{-6}\\,\\text{m/s}$ at $290\\,\\text{K}$. Holding mobility and geometry fixed, find it at $310\\,\\text{K}$.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Initial permeability",
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
              "label": "Temperature ratio",
              "answer": {
                "value": 1.0689655172413792,
                "unit": "",
                "tolerance": 1.0689655172413792e-06,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1.0689655172413792,
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
            "value": 2.137931034482759e-06,
            "unit": "m/s",
            "tolerance": 6.413793103448277e-09,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 2e-06,
                "b": 1.0689655172413792
              },
              "displayScale": 1
            }
          },
          "tex": "P=\\frac{RTu\\beta}{Fl}",
          "modelAnswer": [
            "At fixed mobility, partition and thickness, permeability scales with absolute temperature.",
            "$P_2=(2\\times10^{-6})\\frac{310}{290}\\,\\text{m/s}$",
            "$2.137931e-06\\,\\text{m/s}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $P=\\frac{RTu\\beta}{Fl}$."
        },
        {
          "body": "Start with $P_2=(2\\times10^{-6})\\frac{310}{290}\\,\\text{m/s}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "At fixed mobility, partition and thickness, permeability scales with absolute temperature."
      ],
      "points": 1,
      "source": "L02 PDF 5"
    },
    {
      "id": "L02-direct-ghk",
      "sectionId": "ghk",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "At $37\\,^{\\circ}\\text{C}$ use $61.5\\,\\text{mV}$. Let $(P_K,P_{Na},P_{Cl})=(1,0.05,0.2)$, inside $(K,Na,Cl)=(140,12,8)$ and outside $(6,145,120)\\,\\text{mM}$. Find resting voltage.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Numerator weighted concentration",
              "answer": {
                "value": 14.85,
                "unit": "mM",
                "tolerance": 1.4849999999999998e-05,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 14.85,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Denominator weighted concentration",
              "answer": {
                "value": 164.6,
                "unit": "mM",
                "tolerance": 0.0001646,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 164.6,
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
            "value": -64.24925769921572,
            "unit": "mV",
            "tolerance": 0.19274777309764715,
            "verification": {
              "relation": "ghkVoltage",
              "inputs": {
                "shortcut": 0.0615,
                "pk": 1,
                "pna": 0.05,
                "pcl": 0.2,
                "ko": 6,
                "ki": 140,
                "nao": 145,
                "nai": 12,
                "cli": 8,
                "clo": 120
              },
              "displayScale": 0.001
            }
          },
          "tex": "V_m=k\\log_{10}\\frac{P_KK_o+P_{Na}Na_o+P_{Cl}Cl_i}{P_KK_i+P_{Na}Na_i+P_{Cl}Cl_o}",
          "modelAnswer": [
            "Each permeant ion contributes a permeability-weighted concentration; chloride is inverted.",
            "$V_m=61.5\\,\\text{mV}\\log_{10}\\frac{6+0.05(145)+0.2(8)}{140+0.05(12)+0.2(120)}$",
            "$-64.249258\\,\\text{mV}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $V_m=k\\log_{10}\\frac{P_KK_o+P_{Na}Na_o+P_{Cl}Cl_i}{P_KK_i+P_{Na}Na_i+P_{Cl}Cl_o}$."
        },
        {
          "body": "Start with $V_m=61.5\\,\\text{mV}\\log_{10}\\frac{6+0.05(145)+0.2(8)}{140+0.05(12)+0.2(120)}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Each permeant ion contributes a permeability-weighted concentration; chloride is inverted."
      ],
      "points": 1,
      "source": "L02 PDF 6"
    },
    {
      "id": "L02-ghk-assumptions",
      "sectionId": "ghk",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "GHK assumes ions move independently and the membrane field is constant.",
          "answer": true
        },
        {
          "text": "Zero total current in GHK requires every species to be at Nernst equilibrium.",
          "answer": false,
          "correction": "Individual ionic currents may cancel while each ion remains away from equilibrium."
        },
        {
          "text": "A common multiplier on all relative permeabilities changes GHK voltage.",
          "answer": false,
          "correction": "A common permeability factor cancels between numerator and denominator."
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
        "GHK assumes ions move independently and the membrane field is constant.",
        "Individual ionic currents may cancel while each ion remains away from equilibrium.",
        "A common permeability factor cancels between numerator and denominator."
      ],
      "points": 1,
      "source": "L02 PDF 6"
    },
    {
      "id": "L02-direct-ghk-current",
      "sectionId": "rectification",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "At $V_m=0$, the continuous limit is $j=PzF(C_i-C_o)$. For $P=10^{-8}\\,\\text{m/s}$, $z=1$, $F=96485\\,\\text{C/mol}$, $C_i=120$ and $C_o=10\\,\\text{mol/m}^3$, find current density.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Permeability",
              "answer": {
                "value": 1e-08,
                "unit": "m/s",
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
              "label": "Concentration difference",
              "answer": {
                "value": 110,
                "unit": "mol/m3",
                "tolerance": 0.00010999999999999999,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 110,
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
            "value": 0.1061335,
            "unit": "A/m2",
            "tolerance": 0.00031840050000000005,
            "verification": {
              "relation": "ghkCurrent",
              "inputs": {
                "permeability": 1e-08,
                "z": 1,
                "f": 96485,
                "r": 8.314,
                "temperature": 293,
                "v": 0,
                "inside": 120,
                "outside": 10
              },
              "displayScale": 1
            }
          },
          "tex": "j=P\\frac{z^2F^2}{RT}V_m\\frac{C_i-C_oe^{-zFV_m/(RT)}}{1-e^{-zFV_m/(RT)}}",
          "modelAnswer": [
            "Unequal concentrations produce rectification; equal concentrations give a linear relation.",
            "$j=(10^{-8})(1)(96485)(120-10)\\,\\text{A/m}^2$",
            "$0.1061335\\,\\text{A/m2}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $j=P\\frac{z^2F^2}{RT}V_m\\frac{C_i-C_oe^{-zFV_m/(RT)}}{1-e^{-zFV_m/(RT)}}$."
        },
        {
          "body": "Start with $j=(10^{-8})(1)(96485)(120-10)\\,\\text{A/m}^2$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Unequal concentrations produce rectification; equal concentrations give a linear relation."
      ],
      "points": 1,
      "source": "L02 PDF 7–8"
    },
    {
      "id": "L02-resting-recall",
      "sectionId": "resting",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "Open channels and pumps can participate while voltage is stable.",
          "answer": true
        },
        {
          "text": "Changing concentration and changing permeability are the same perturbation.",
          "answer": false,
          "correction": "Concentration changes the gradient; permeability changes the weight of a pathway."
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
        "Open channels and pumps can participate while voltage is stable.",
        "Concentration changes the gradient; permeability changes the weight of a pathway."
      ],
      "points": 1,
      "source": "L02 PDF 10"
    },
    {
      "id": "L02-direct-sphere",
      "practice": "extra",
      "sectionId": "charge",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "An ideal spherical cell has radius $5\\,\\mu\\text{m}$. Find membrane area.",
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
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 314.1592653589793,
            "unit": "um2",
            "tolerance": 0.942477796076938,
            "verification": {
              "relation": "sphereArea",
              "inputs": {
                "radius": 5e-06
              },
              "displayScale": 1e-12
            }
          },
          "tex": "A=4\\pi r^2",
          "modelAnswer": [
            "Spherical membrane area scales with radius squared.",
            "$A=4\\pi(5\\,\\mu\\text{m})^2$",
            "$314.15927\\,\\text{um2}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $A=4\\pi r^2$."
        },
        {
          "body": "Start with $A=4\\pi(5\\,\\mu\\text{m})^2$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Spherical membrane area scales with radius squared."
      ],
      "points": 1,
      "source": "L02 PDF 11; Exercise2 P1"
    },
    {
      "id": "L02-direct-area-capacitance",
      "practice": "extra",
      "sectionId": "charge",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "A membrane area is $200\\,\\mu\\text{m}^2$ and specific capacitance is $1\\,\\mu\\text{F}/\\text{cm}^2=0.01\\,\\text{F/m}^2$. Find total capacitance.",
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
              "label": "Area",
              "answer": {
                "value": 2e-10,
                "unit": "m2",
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
            "value": 2,
            "unit": "pF",
            "tolerance": 0.006,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 0.01,
                "b": 2e-10
              },
              "displayScale": 1e-12
            }
          },
          "tex": "C=C_sA",
          "modelAnswer": [
            "Total capacitance grows in proportion to area.",
            "$C=(0.01\\,\\text{F/m}^2)(200\\times10^{-12}\\,\\text{m}^2)$",
            "$2\\,\\text{pF}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $C=C_sA$."
        },
        {
          "body": "Start with $C=(0.01\\,\\text{F/m}^2)(200\\times10^{-12}\\,\\text{m}^2)$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Total capacitance grows in proportion to area."
      ],
      "points": 1,
      "source": "L02 PDF 11; Exercise2 P1"
    },
    {
      "id": "L02-direct-charge",
      "practice": "extra",
      "sectionId": "charge",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "A $20\\,\\text{pF}$ membrane moves from $-60$ to $+30\\,\\text{mV}$. Find positive charge entering, neglecting concurrent currents.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Capacitance",
              "answer": {
                "value": 2e-11,
                "unit": "F",
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
              "label": "Voltage change",
              "answer": {
                "value": 0.09,
                "unit": "V",
                "tolerance": 9e-08,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.09,
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
            "value": 1.8,
            "unit": "pC",
            "tolerance": 0.0054,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 2e-11,
                "b": 0.09
              },
              "displayScale": 1e-12
            }
          },
          "tex": "\\Delta Q=C\\Delta V",
          "modelAnswer": [
            "Depolarization increases inner plate charge.",
            "$\\Delta Q=(20\\,\\text{pF})(90\\,\\text{mV})$",
            "$1.8\\,\\text{pC}$"
          ],
          "commonErrors": [
            {
              "wrongValue": -1.8,
              "tolerance": 0.01,
              "why": "This asks for inner charge gained, not outward current. Depolarization increases inner charge.",
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 2e-11,
                  "b": -0.09
                },
                "displayScale": 1e-12
              }
            }
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\Delta Q=C\\Delta V$."
        },
        {
          "body": "Start with $\\Delta Q=(20\\,\\text{pF})(90\\,\\text{mV})$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Depolarization increases inner plate charge."
      ],
      "points": 1,
      "source": "L02 PDF 11; Exercise2 P1"
    },
    {
      "id": "L02-direct-ion-count",
      "practice": "extra",
      "sectionId": "charge",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "How many monovalent ions carry $3.2044\\,\\text{pC}$? Use $e=1.6022\\times10^{-19}\\,\\text{C}$.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Charge magnitude",
              "answer": {
                "value": 3.2044e-12,
                "unit": "C",
                "tolerance": 3.2043999999999997e-18,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 3.2044e-12,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Elementary charge",
              "answer": {
                "value": 1.6022e-19,
                "unit": "C",
                "tolerance": 1.6022e-25,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1.6022e-19,
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
            "value": 20000000.0,
            "unit": "",
            "tolerance": 60000.0,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 3.2044e-12,
                "b": 1.6022e-19
              },
              "displayScale": 1
            }
          },
          "tex": "N=\\frac{|Q|}{e}",
          "modelAnswer": [
            "Divide charge magnitude by charge per ion.",
            "$N=\\frac{3.2044\\times10^{-12}}{1.6022\\times10^{-19}}$",
            "$20000000\\,\\text{}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $N=\\frac{|Q|}{e}$."
        },
        {
          "body": "Start with $N=\\frac{3.2044\\times10^{-12}}{1.6022\\times10^{-19}}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Divide charge magnitude by charge per ion."
      ],
      "points": 1,
      "source": "L02 PDF 11; Exercise2 P1"
    },
    {
      "id": "L02-resting-functions-recall",
      "sectionId": "resting-functions",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "Membrane voltage matters only in neurons that fire spikes.",
          "answer": false,
          "correction": "Voltage also contributes to nonexcitable-cell functions such as volume control and proliferation."
        },
        {
          "text": "The sodium/potassium pump moves three sodium out and two potassium in per cycle.",
          "answer": true
        },
        {
          "text": "All differentiated cell types have the same resting voltage.",
          "answer": false,
          "correction": "The source shows different resting voltages across cell types."
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
        "Voltage also contributes to nonexcitable-cell functions such as volume control and proliferation.",
        "The sodium/potassium pump moves three sodium out and two potassium in per cycle.",
        "The source shows different resting voltages across cell types."
      ],
      "points": 1,
      "source": "L02 PDF 12"
    },
    {
      "id": "L02-neuron-recall",
      "sectionId": "neuron",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "Dendritic spines are receiving structures and support graded potentials.",
          "answer": true
        },
        {
          "text": "The axon terminal is the main receiving part of the neuron in this diagram.",
          "answer": false,
          "correction": "Dendrites are the main receiving part; the axon terminal is presynaptic output."
        },
        {
          "text": "The axon propagates and regenerates action potentials.",
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
        "Dendritic spines are receiving structures and support graded potentials.",
        "Dendrites are the main receiving part; the axon terminal is presynaptic output.",
        "The axon propagates and regenerates action potentials."
      ],
      "points": 1,
      "source": "L02 PDF 14"
    },
    {
      "id": "L02-clamp-recall",
      "sectionId": "clamp",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "Current clamp records voltage; voltage clamp records current.",
          "answer": true
        },
        {
          "text": "The early sodium current remains sustained while potassium rapidly inactivates in this example.",
          "answer": false,
          "correction": "Sodium activates rapidly and inactivates; potassium activates more slowly and is sustained."
        },
        {
          "text": "Replacing outside sodium by impermeant choline leaves the outward potassium current in the taught preparation.",
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
        "Current clamp records voltage; voltage clamp records current.",
        "Sodium activates rapidly and inactivates; potassium activates more slowly and is sustained.",
        "Replacing outside sodium by impermeant choline leaves the outward potassium current in the taught preparation."
      ],
      "points": 1,
      "source": "L02 PDF 17–18; Exercise2 P2"
    },
    {
      "id": "L02-direct-reversal-ratio",
      "sectionId": "clamp",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "At $20\\,^{\\circ}\\text{C}$, sodium reversals in two solutions differ by $29\\,\\text{mV}$, with A more positive. Use $58\\,\\text{mV}$. Find outside concentration ratio A/B.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Reversal difference",
              "answer": {
                "value": 0.029,
                "unit": "V",
                "tolerance": 2.9e-08,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.029,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Shortcut",
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
          "title": "Evaluate",
          "answer": {
            "value": 3.1622776601683795,
            "unit": "",
            "tolerance": 0.00948683298050514,
            "verification": {
              "relation": "nernstRatio",
              "inputs": {
                "delta": 0.029,
                "shortcut": 0.058
              },
              "displayScale": 1
            }
          },
          "tex": "\\frac{C_{o,A}}{C_{o,B}}=10^{(E_A-E_B)/k}",
          "modelAnswer": [
            "Subtract Nernst voltages to cancel the common inside concentration.",
            "$C_{o,A}/C_{o,B}=10^{29/58}$",
            "$3.1622777\\,\\text{}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\frac{C_{o,A}}{C_{o,B}}=10^{(E_A-E_B)/k}$."
        },
        {
          "body": "Start with $C_{o,A}/C_{o,B}=10^{29/58}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Subtract Nernst voltages to cancel the common inside concentration."
      ],
      "points": 1,
      "source": "L02 PDF 17–18; Exercise2 P2"
    },
    {
      "id": "L02-direct-capacitive",
      "sectionId": "circuit",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "A $50\\,\\text{pF}$ membrane voltage rises at $2\\,\\text{mV/ms}$. Find capacitive current.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Capacitance",
              "answer": {
                "value": 5e-11,
                "unit": "F",
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
              "label": "Voltage slope",
              "answer": {
                "value": 2,
                "unit": "V/s",
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
            "value": 100,
            "unit": "pA",
            "tolerance": 0.3,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 5e-11,
                "b": 2
              },
              "displayScale": 1e-12
            }
          },
          "tex": "I_C=C\\frac{dV_m}{dt}",
          "modelAnswer": [
            "Capacitive current depends on voltage slope, not on voltage alone.",
            "$I_C=(50\\,\\text{pF})(2\\,\\text{V/s})$",
            "$100\\,\\text{pA}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $I_C=C\\frac{dV_m}{dt}$."
        },
        {
          "body": "Start with $I_C=(50\\,\\text{pF})(2\\,\\text{V/s})$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Capacitive current depends on voltage slope, not on voltage alone."
      ],
      "points": 1,
      "source": "L02 PDF 21–22"
    },
    {
      "id": "L02-direct-current-balance",
      "sectionId": "circuit",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "With common reference direction, ionic current is $-40\\,\\text{pA}$ and capacitive current is $+100\\,\\text{pA}$. Find total branch current.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Ionic current",
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
            },
            {
              "label": "Capacitive current",
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
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 60,
            "unit": "pA",
            "tolerance": 0.18,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": -4e-11,
                "b": 1e-10
              },
              "displayScale": 1e-12
            }
          },
          "tex": "I_m=I_i+I_C",
          "modelAnswer": [
            "Currents add algebraically with consistent reference directions.",
            "$I_m=-40\\,\\text{pA}+100\\,\\text{pA}$",
            "$60\\,\\text{pA}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $I_m=I_i+I_C$."
        },
        {
          "body": "Start with $I_m=-40\\,\\text{pA}+100\\,\\text{pA}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Currents add algebraically with consistent reference directions."
      ],
      "points": 1,
      "source": "L02 PDF 21–22"
    },
    {
      "id": "L02-reversal-recall",
      "sectionId": "reversal",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "A single-ion passive channel reversal coincides with that ion’s equilibrium voltage.",
          "answer": true
        },
        {
          "text": "A mixed channel reversal must equal every ion’s Nernst voltage.",
          "answer": false,
          "correction": "It is the zero of net pathway current; individual species can have opposing nonzero currents."
        },
        {
          "text": "Whole-cell rest includes all active current pathways and maintained gradients.",
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
        "A single-ion passive channel reversal coincides with that ion’s equilibrium voltage.",
        "It is the zero of net pathway current; individual species can have opposing nonzero currents.",
        "Whole-cell rest includes all active current pathways and maintained gradients."
      ],
      "points": 1,
      "source": "L02 PDF 23"
    },
    {
      "id": "L02-direct-ionic",
      "sectionId": "conductance",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "For $g=5\\,\\text{nS}$, $V_m=-40\\,\\text{mV}$ and $E=-80\\,\\text{mV}$, find current.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Conductance",
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
              "label": "Driving force",
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
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 200,
            "unit": "pA",
            "tolerance": 0.6,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 5e-09,
                "b": 0.04
              },
              "displayScale": 1e-12
            }
          },
          "tex": "I=g(V_m-E)",
          "modelAnswer": [
            "Current reverses when membrane voltage crosses reversal.",
            "$I=(5\\,\\text{nS})[-40-(-80)]\\,\\text{mV}$",
            "$200\\,\\text{pA}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $I=g(V_m-E)$."
        },
        {
          "body": "Start with $I=(5\\,\\text{nS})[-40-(-80)]\\,\\text{mV}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Current reverses when membrane voltage crosses reversal."
      ],
      "points": 1,
      "source": "L02 PDF 24"
    },
    {
      "id": "L02-direct-sum-conductance",
      "sectionId": "conductance",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Two parallel pathways have $4$ and $7\\,\\text{nS}$. Find total conductance.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "First conductance",
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
              "label": "Second conductance",
              "answer": {
                "value": 7e-09,
                "unit": "S",
                "tolerance": 6.999999999999999e-15,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 7e-09,
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
            "value": 11,
            "unit": "nS",
            "tolerance": 0.033,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": 4e-09,
                "b": 7e-09
              },
              "displayScale": 1e-09
            }
          },
          "tex": "G=g_1+g_2",
          "modelAnswer": [
            "Parallel pathways add conducting capacity.",
            "$G=4\\,\\text{nS}+7\\,\\text{nS}$",
            "$11\\,\\text{nS}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $G=g_1+g_2$."
        },
        {
          "body": "Start with $G=4\\,\\text{nS}+7\\,\\text{nS}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Parallel pathways add conducting capacity."
      ],
      "points": 1,
      "source": "L02 PDF 24"
    },
    {
      "id": "L02-direct-slope",
      "sectionId": "slope",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Near an operating point, current falls by $30\\,\\text{pA}$ as voltage rises $5\\,\\text{mV}$. Estimate slope conductance.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Current increment",
              "answer": {
                "value": -3e-11,
                "unit": "A",
                "tolerance": 3e-17,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -3e-11,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Voltage increment",
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
            "value": -6,
            "unit": "nS",
            "tolerance": 0.018000000000000002,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": -3e-11,
                "b": 0.005
              },
              "displayScale": 1e-09
            }
          },
          "tex": "G_s=\\frac{dI}{dV}",
          "modelAnswer": [
            "The local derivative measures current change for a small voltage change.",
            "$G_s\\approx\\frac{-30\\,\\text{pA}}{5\\,\\text{mV}}$",
            "$-6\\,\\text{nS}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $G_s=\\frac{dI}{dV}$."
        },
        {
          "body": "Start with $G_s\\approx\\frac{-30\\,\\text{pA}}{5\\,\\text{mV}}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "The local derivative measures current change for a small voltage change."
      ],
      "points": 1,
      "source": "L02 PDF 25"
    },
    {
      "id": "L02-direct-chord",
      "sectionId": "slope",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "At $V=-20\\,\\text{mV}$, $E=-60\\,\\text{mV}$ and $I=120\\,\\text{pA}$, find chord conductance.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Current",
              "answer": {
                "value": 1.2e-10,
                "unit": "A",
                "tolerance": 1.2e-16,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1.2e-10,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Driving force",
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
            "unit": "nS",
            "tolerance": 0.009000000000000001,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 1.2e-10,
                "b": 0.04
              },
              "displayScale": 1e-09
            }
          },
          "tex": "G_c=\\frac{I}{V-E}",
          "modelAnswer": [
            "The chord to reversal divides current by driving force.",
            "$G_c=\\frac{120\\,\\text{pA}}{[-20-(-60)]\\,\\text{mV}}$",
            "$3\\,\\text{nS}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $G_c=\\frac{I}{V-E}$."
        },
        {
          "body": "Start with $G_c=\\frac{120\\,\\text{pA}}{[-20-(-60)]\\,\\text{mV}}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "The chord to reversal divides current by driving force."
      ],
      "points": 1,
      "source": "L02 PDF 25"
    },
    {
      "id": "L02-direct-weighted",
      "sectionId": "parallel",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "With no applied or pump current and stationary voltage, $g_K=8\\,\\text{nS}$, $g_{Na}=2\\,\\text{nS}$, $g_{Cl}=0$, $E_K=-85\\,\\text{mV}$ and $E_{Na}=55\\,\\text{mV}$. Find voltage.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Potassium conductance",
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
              "label": "Sodium conductance",
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
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": -57,
            "unit": "mV",
            "tolerance": 0.171,
            "verification": {
              "relation": "weightedVoltage",
              "inputs": {
                "gk": 8e-09,
                "gna": 2e-09,
                "gcl": 0,
                "ek": -0.085,
                "ena": 0.055,
                "ecl": -0.065
              },
              "displayScale": 0.001
            }
          },
          "tex": "V_m=\\frac{g_KE_K+g_{Na}E_{Na}+g_{Cl}E_{Cl}}{g_K+g_{Na}+g_{Cl}}",
          "modelAnswer": [
            "Voltage is a conductance-weighted average of branch reversals.",
            "$V_m=\\frac{8(-85)+2(55)}{8+2}\\,\\text{mV}$",
            "$-57\\,\\text{mV}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $V_m=\\frac{g_KE_K+g_{Na}E_{Na}+g_{Cl}E_{Cl}}{g_K+g_{Na}+g_{Cl}}$."
        },
        {
          "body": "Start with $V_m=\\frac{8(-85)+2(55)}{8+2}\\,\\text{mV}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Voltage is a conductance-weighted average of branch reversals."
      ],
      "points": 1,
      "source": "L02 PDF 26"
    },
    {
      "id": "L02-direct-fraction",
      "sectionId": "calcium",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "An isolated current is $-80\\,\\text{pA}$ at driving force $-40\\,\\text{mV}$; maximum conductance is $4\\,\\text{nS}$. Find fractional conductance.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Current",
              "answer": {
                "value": -8e-11,
                "unit": "A",
                "tolerance": 7.999999999999999e-17,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -8e-11,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Driving force",
              "answer": {
                "value": -0.04,
                "unit": "V",
                "tolerance": 4e-08,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -0.04,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Maximum conductance",
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
            "value": 0.5,
            "unit": "",
            "tolerance": 0.0015,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 2e-09,
                "b": 4e-09
              },
              "displayScale": 1
            }
          },
          "tex": "f=\\frac{g}{g_{max}}=\\frac{I}{(V-E)g_{max}}",
          "modelAnswer": [
            "Normalize conductance rather than raw current to remove driving-force variation.",
            "$f=\\frac{(-80\\,\\text{pA})/(-40\\,\\text{mV})}{4\\,\\text{nS}}$",
            "$0.5\\,\\text{}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $f=\\frac{g}{g_{max}}=\\frac{I}{(V-E)g_{max}}$."
        },
        {
          "body": "Start with $f=\\frac{(-80\\,\\text{pA})/(-40\\,\\text{mV})}{4\\,\\text{nS}}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Normalize conductance rather than raw current to remove driving-force variation."
      ],
      "points": 1,
      "source": "L02 PDF 28"
    },
    {
      "id": "L02-equilibrium-compare",
      "sectionId": "equilibrium",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain why a squid axon at rest can have a voltage different from every individual Nernst potential. Contrast this with Donnan equilibrium.",
      "hints": [
        {
          "body": "Separate total balance from each species."
        },
        {
          "body": "Consider whether opposite signed currents can sum to zero."
        }
      ],
      "markScheme": [
        {
          "text": "At rest several ionic currents can be nonzero and cancel."
        },
        {
          "text": "Different permeabilities weight their influence on voltage."
        },
        {
          "text": "At Donnan equilibrium each permeant ion has zero net flux and the shared voltage equals each equilibrium potential."
        }
      ],
      "modelAnswer": [
        "At rest several ionic currents can be nonzero and cancel.",
        "Different permeabilities weight their influence on voltage.",
        "At Donnan equilibrium each permeant ion has zero net flux and the shared voltage equals each equilibrium potential."
      ],
      "points": 1,
      "source": "L02 PDF 2"
    },
    {
      "id": "L02-chloride-sequence",
      "sectionId": "chloride",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Use the source trace: explain the initial voltage shift, slow recovery, and opposite response when extracellular chloride is restored. Distinguish the immediate and slower causes.",
      "hints": [
        {
          "body": "Read the chloride step separately from the slow trace."
        },
        {
          "body": "First change the chloride ratio with inside fixed; then allow redistribution."
        }
      ],
      "markScheme": [
        {
          "text": "Lower outside chloride makes its equilibrium voltage less negative while potassium equilibrium initially stays fixed."
        },
        {
          "text": "Voltage initially depolarizes between the two equilibrium potentials."
        },
        {
          "text": "Potassium and chloride redistribute outward while the cell approaches a shared equilibrium."
        },
        {
          "text": "Restoring outside chloride first hyperpolarizes the membrane, then inward redistribution restores the earlier state."
        }
      ],
      "modelAnswer": [
        "Lower outside chloride makes its equilibrium voltage less negative while potassium equilibrium initially stays fixed.",
        "Voltage initially depolarizes between the two equilibrium potentials.",
        "Potassium and chloride redistribute outward while the cell approaches a shared equilibrium.",
        "Restoring outside chloride first hyperpolarizes the membrane, then inward redistribution restores the earlier state."
      ],
      "points": 1,
      "source": "L02 PDF 3–4",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 2, PDF page 4. Source figure with original labels and axes retained.",
        "fallbackAlt": "Lecture 2, PDF page 4. Source figure with original labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L02/chloride.webp', import.meta.url).href,
          "alt": "Lecture 2, PDF page 4. Source figure with original labels and axes retained.",
          "aspect": 1.0468451242829828,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L02-permeability-derive",
      "sectionId": "permeability",
      "difficulty": "medium",
      "type": "derive",
      "prompt": "Starting from Fick’s law and a linear membrane concentration profile, derive permeability. State why a negative flux does not imply negative permeability.",
      "hints": [
        {
          "body": "Use the two gradients on PDF5."
        },
        {
          "body": "Substitute the partition-weighted concentration gradient before comparing coefficients."
        }
      ],
      "markScheme": [
        {
          "text": "$J=-D\\partial C/\\partial x$ and $\\partial C/\\partial x=\\beta\\Delta C/l$."
        },
        {
          "text": "Substitution gives $J=-(D\\beta/l)\\Delta C$, hence $P=D\\beta/l$."
        },
        {
          "text": "Positive permeability is a material parameter; signed flux depends on the concentration difference and coordinate."
        }
      ],
      "modelAnswer": [
        "$J=-D\\partial C/\\partial x$ and $\\partial C/\\partial x=\\beta\\Delta C/l$.",
        "Substitution gives $J=-(D\\beta/l)\\Delta C$, hence $P=D\\beta/l$.",
        "Positive permeability is a material parameter; signed flux depends on the concentration difference and coordinate."
      ],
      "points": 1,
      "source": "L02 PDF 5"
    },
    {
      "id": "L02-ghk-limit",
      "sectionId": "ghk",
      "difficulty": "medium",
      "type": "derive",
      "prompt": "Show how GHK reduces to potassium Nernst when the other permeabilities vanish. Explain why the chloride terms swap sides.",
      "hints": [
        {
          "body": "Remove the impermeant species algebraically."
        },
        {
          "body": "Cancel the common weight before taking the logarithm."
        }
      ],
      "markScheme": [
        {
          "text": "Set sodium and chloride permeabilities to zero and cancel potassium permeability."
        },
        {
          "text": "The fraction becomes $K_o/K_i$, giving potassium Nernst."
        },
        {
          "text": "Chloride has negative valence, reversing its equilibrium concentration ratio."
        }
      ],
      "modelAnswer": [
        "Set sodium and chloride permeabilities to zero and cancel potassium permeability.",
        "The fraction becomes $K_o/K_i$, giving potassium Nernst.",
        "Chloride has negative valence, reversing its equilibrium concentration ratio."
      ],
      "points": 1,
      "source": "L02 PDF 6"
    },
    {
      "id": "L02-rectification-interpret",
      "sectionId": "rectification",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Compare the source constant-field curves with equal, larger outside, and larger inside concentrations. Identify the linear case and preferred current direction for a cation.",
      "hints": [
        {
          "body": "Read the labelled concentration ratios."
        },
        {
          "body": "Separate concentration asymmetry from the sign convention."
        }
      ],
      "markScheme": [
        {
          "text": "Equal concentrations give a linear current-voltage relationship."
        },
        {
          "text": "More outside than inside favors inward current; more inside favors outward current."
        },
        {
          "text": "Rectification describes directional preference, not a negative permeability."
        }
      ],
      "modelAnswer": [
        "Equal concentrations give a linear current-voltage relationship.",
        "More outside than inside favors inward current; more inside favors outward current.",
        "Rectification describes directional preference, not a negative permeability."
      ],
      "points": 1,
      "source": "L02 PDF 7–8",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 2, PDF page 7. Source figure with original labels and axes retained.",
        "fallbackAlt": "Lecture 2, PDF page 7. Source figure with original labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L02/rectification.webp', import.meta.url).href,
          "alt": "Lecture 2, PDF page 7. Source figure with original labels and axes retained.",
          "aspect": 1.3375527426160339,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L02-potassium-change",
      "sectionId": "potassium",
      "difficulty": "medium",
      "type": "multiStepCalc",
      "prompt": "A squid-like membrane has inside $(K,Na,Cl)=(400,50,40)$ and outside $(20,460,540)\\,\\text{mM}$ with permeability ratio $1:0.03:0.1$. Use $58\\,\\text{mV}$ at $20\\,^{\\circ}\\text{C}$. Compare potassium-only and GHK voltages.",
      "stages": [
        {
          "title": "Potassium equilibrium",
          "answer": {
            "value": -75.45973974851091,
            "unit": "mV",
            "tolerance": 0.22637921924553275,
            "verification": {
              "relation": "nernst",
              "inputs": {
                "shortcut": 0.058,
                "z": 1,
                "outside": 20,
                "inside": 400
              },
              "displayScale": 0.001
            }
          },
          "tex": "E_K=58\\,\\text{mV}\\log_{10}(20/400)",
          "modelAnswer": [
            "Potassium-only voltage is a single-ion equilibrium.",
            "$E_K=58\\,\\text{mV}\\log_{10}(20/400)$",
            "$-75.45974\\,\\text{mV}$"
          ]
        },
        {
          "title": "Mixed voltage",
          "answer": {
            "value": -62.69780172536392,
            "unit": "mV",
            "tolerance": 0.18809340517609174,
            "verification": {
              "relation": "ghkVoltage",
              "inputs": {
                "shortcut": 0.058,
                "pk": 1,
                "pna": 0.03,
                "pcl": 0.1,
                "ko": 20,
                "ki": 400,
                "nao": 460,
                "nai": 50,
                "cli": 40,
                "clo": 540
              },
              "displayScale": 0.001
            }
          },
          "tex": "V_m=58\\,\\text{mV}\\log_{10}\\frac{20+0.03(460)+0.1(40)}{400+0.03(50)+0.1(540)}",
          "modelAnswer": [
            "Other ions make this rest different from potassium equilibrium.",
            "$V_m=58\\,\\text{mV}\\log_{10}\\frac{20+0.03(460)+0.1(40)}{400+0.03(50)+0.1(540)}$",
            "$-62.697802\\,\\text{mV}$"
          ]
        },
        {
          "title": "Comparison",
          "choices": [
            {
              "label": "GHK voltage is less negative"
            },
            {
              "label": "GHK voltage is more negative"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Sodium contribution makes the GHK voltage less negative here."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use Nernst and GHK under the same shortcut."
        },
        {
          "body": "Start the two numerators with 20 and with $20+0.03(460)+0.1(40)$ respectively."
        }
      ],
      "modelAnswer": [
        "Potassium-only voltage is a single-ion equilibrium.",
        "Other ions make this rest different from potassium equilibrium.",
        "Sodium contribution makes the GHK voltage less negative here."
      ],
      "points": 1,
      "source": "L02 PDF 9"
    },
    {
      "id": "L02-potassium-curve",
      "sectionId": "potassium",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Read the source plot qualitatively. Why is resting voltage not always potassium Nernst, and why does convergence at high outside potassium not prove that other permeabilities became zero?",
      "hints": [
        {
          "body": "Compare terms rather than only lines."
        },
        {
          "body": "Keep the stated permeability ratios fixed."
        }
      ],
      "markScheme": [
        {
          "text": "Sodium and chloride remain terms in GHK."
        },
        {
          "text": "Their relative importance decreases as outside potassium dominates the numerator."
        },
        {
          "text": "Convergence is a limiting dominance effect, not proof of closed pathways."
        }
      ],
      "modelAnswer": [
        "Sodium and chloride remain terms in GHK.",
        "Their relative importance decreases as outside potassium dominates the numerator.",
        "Convergence is a limiting dominance effect, not proof of closed pathways."
      ],
      "points": 1,
      "source": "L02 PDF 9",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 2, PDF page 9. Source figure with original labels and axes retained.",
        "fallbackAlt": "Lecture 2, PDF page 9. Source figure with original labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L02/potassium.webp', import.meta.url).href,
          "alt": "Lecture 2, PDF page 9. Source figure with original labels and axes retained.",
          "aspect": 0.7868362004487659,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L02-voltage-terms",
      "sectionId": "charge",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Distinguish depolarization, repolarization and hyperpolarization. Why does a large voltage change not imply a large fractional change of bulk ion concentration?",
      "hints": [
        {
          "body": "Compare each term with rest, not zero."
        },
        {
          "body": "Separate boundary capacitor charge from total dissolved ions."
        }
      ],
      "markScheme": [
        {
          "text": "Depolarization is a more positive voltage relative to rest; repolarization returns after depolarization."
        },
        {
          "text": "Hyperpolarization is more negative than rest."
        },
        {
          "text": "A small separated boundary charge supports voltage; bulk solution remains approximately neutral."
        },
        {
          "text": "The fraction of all ions requires volume and concentration, not capacitance alone."
        }
      ],
      "modelAnswer": [
        "Depolarization is a more positive voltage relative to rest; repolarization returns after depolarization.",
        "Hyperpolarization is more negative than rest.",
        "A small separated boundary charge supports voltage; bulk solution remains approximately neutral.",
        "The fraction of all ions requires volume and concentration, not capacitance alone."
      ],
      "points": 1,
      "source": "L02 PDF 11; Exercise2 P1"
    },
    {
      "id": "L02-mutation-predict",
      "sectionId": "mutation",
      "difficulty": "medium",
      "type": "predict",
      "prompt": "Rework the slide warm-up: sodium permeability rises tenfold at fixed concentrations. Predict the initial resting-voltage direction and state what cannot be concluded about long-term concentrations.",
      "hints": [
        {
          "body": "Distinguish a pathway weight from a concentration ratio."
        },
        {
          "body": "Compare sodium equilibrium with the original negative resting voltage."
        }
      ],
      "markScheme": [
        {
          "text": "For the taught sodium gradient, voltage shifts toward the more positive sodium equilibrium potential."
        },
        {
          "text": "Individual Nernst potentials initially remain fixed because their concentration ratios do not change."
        },
        {
          "text": "The premise does not establish later concentrations or pump compensation."
        }
      ],
      "modelAnswer": [
        "For the taught sodium gradient, voltage shifts toward the more positive sodium equilibrium potential.",
        "Individual Nernst potentials initially remain fixed because their concentration ratios do not change.",
        "The premise does not establish later concentrations or pump compensation."
      ],
      "points": 1,
      "source": "L02 PDF 13"
    },
    {
      "id": "L02-signalling-compare",
      "sectionId": "signalling",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Compare action and graded potentials in coding, threshold, summation, spread and typical location. Include the source’s calcium caveat.",
      "hints": [
        {
          "body": "Use the two signal modes, one property at a time."
        },
        {
          "body": "Compare the receptor traces with the spike train."
        }
      ],
      "markScheme": [
        {
          "text": "Spikes are all-or-none and use frequency coding; graded responses use amplitude coding."
        },
        {
          "text": "Spikes have a threshold and do not summate in amplitude; graded responses have no spike threshold and can summate."
        },
        {
          "text": "Regenerated spikes support long-distance transmission; graded signals decay over short distances in dendrites, synapses and receptors."
        },
        {
          "text": "Sodium- and calcium-dependent spikes and mixed calcium-based responses exist; the binary comparison is an introductory model."
        }
      ],
      "modelAnswer": [
        "Spikes are all-or-none and use frequency coding; graded responses use amplitude coding.",
        "Spikes have a threshold and do not summate in amplitude; graded responses have no spike threshold and can summate.",
        "Regenerated spikes support long-distance transmission; graded signals decay over short distances in dendrites, synapses and receptors.",
        "Sodium- and calcium-dependent spikes and mixed calcium-based responses exist; the binary comparison is an introductory model."
      ],
      "points": 1,
      "source": "L02 PDF 15",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 2, PDF page 15. Source figure with original labels and axes retained.",
        "fallbackAlt": "Lecture 2, PDF page 15. Source figure with original labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L02/signalling.webp', import.meta.url).href,
          "alt": "Lecture 2, PDF page 15. Source figure with original labels and axes retained.",
          "aspect": 0.7070631970260223,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L02-ap-evidence",
      "sectionId": "action-potential",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Read the squid source recording. Describe the voltage sequence and explain why voltage and total conductance alone did not identify the ion carrying each phase.",
      "hints": [
        {
          "body": "Read voltage before inferring a current."
        },
        {
          "body": "Separate a measured waveform from the ionic hypothesis."
        }
      ],
      "markScheme": [
        {
          "text": "Voltage rises through zero toward sodium equilibrium, then repolarizes and briefly hyperpolarizes."
        },
        {
          "text": "Large conductance changes accompany the spike."
        },
        {
          "text": "Voltage and total conductance do not separate sodium and potassium currents; ion replacement or blockers with voltage clamp add evidence."
        }
      ],
      "modelAnswer": [
        "Voltage rises through zero toward sodium equilibrium, then repolarizes and briefly hyperpolarizes.",
        "Large conductance changes accompany the spike.",
        "Voltage and total conductance do not separate sodium and potassium currents; ion replacement or blockers with voltage clamp add evidence."
      ],
      "points": 1,
      "source": "L02 PDF 16",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 2, PDF page 16. Source figure with original labels and axes retained.",
        "fallbackAlt": "Lecture 2, PDF page 16. Source figure with original labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L02/action-potential.webp', import.meta.url).href,
          "alt": "Lecture 2, PDF page 16. Source figure with original labels and axes retained.",
          "aspect": 1.030844155844156,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L02-reversal-shift",
      "sectionId": "clamp",
      "difficulty": "medium",
      "type": "multiStepCalc",
      "prompt": "New voltage-clamp measurements give approximate early-current reversals $+60$ and $+36\\,\\text{mV}$ in baths A and B. Inside sodium stays fixed. Use $58\\,\\text{mV}$ at $20\\,^{\\circ}\\text{C}$. Infer outside sodium ratio A/B, stating why the graph-derived result is approximate.",
      "stages": [
        {
          "title": "Reversal difference",
          "answer": {
            "value": 24,
            "unit": "mV",
            "tolerance": 0.07200000000000001,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": 0.06,
                "b": -0.036
              },
              "displayScale": 0.001
            }
          },
          "tex": "\\Delta E=E_A-E_B",
          "modelAnswer": [
            "Subtract voltages; do not divide the reversal potentials.",
            "$\\Delta E=E_A-E_B$",
            "$24\\,\\text{mV}$"
          ]
        },
        {
          "title": "Outside ratio",
          "answer": {
            "value": 2.592943797404667,
            "unit": "",
            "tolerance": 0.007778831392214002,
            "verification": {
              "relation": "nernstRatio",
              "inputs": {
                "delta": 0.024,
                "shortcut": 0.058
              },
              "displayScale": 1
            }
          },
          "tex": "C_{o,A}/C_{o,B}=10^{\\Delta E/(58\\,\\text{mV})}",
          "modelAnswer": [
            "Approximate reversal readings give an approximate concentration ratio.",
            "$C_{o,A}/C_{o,B}=10^{\\Delta E/(58\\,\\text{mV})}$",
            "$2.5929438$"
          ]
        },
        {
          "title": "Limitation",
          "choices": [
            {
              "label": "Approximate reversals limit ratio precision"
            },
            {
              "label": "Absolute inside sodium must also be known"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Inside cancels if fixed, but uncertainty in the shift remains."
          ]
        }
      ],
      "hints": [
        {
          "body": "Subtract the two single-ion Nernst equations."
        },
        {
          "body": "Start with the positive reversal difference, then exponentiate the difference divided by the shortcut."
        }
      ],
      "modelAnswer": [
        "Subtract voltages; do not divide the reversal potentials.",
        "Approximate reversal readings give an approximate concentration ratio.",
        "Inside cancels if fixed, but uncertainty in the shift remains."
      ],
      "points": 1,
      "source": "L02 PDF 17–18; Exercise2 P2"
    },
    {
      "id": "L02-blockers-interpret",
      "sectionId": "blockers",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Identify control, TTX and TEA trace families in the source figure. Explain how to isolate sodium by subtraction and why current timing matters.",
      "hints": [
        {
          "body": "Separate what is blocked from what remains."
        },
        {
          "body": "Compare control and residual at the same stimulus."
        }
      ],
      "markScheme": [
        {
          "text": "Control combines sodium and potassium."
        },
        {
          "text": "TTX leaves potassium; TEA leaves sodium in this taught selective-block model."
        },
        {
          "text": "Control minus TTX residual gives sodium; use the same voltage and time."
        },
        {
          "text": "Early transient and delayed sustained components have different kinetics."
        }
      ],
      "modelAnswer": [
        "Control combines sodium and potassium.",
        "TTX leaves potassium; TEA leaves sodium in this taught selective-block model.",
        "Control minus TTX residual gives sodium; use the same voltage and time.",
        "Early transient and delayed sustained components have different kinetics."
      ],
      "points": 1,
      "source": "L02 PDF 19–20",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 2, PDF page 19. Source figure with original labels and axes retained.",
        "fallbackAlt": "Lecture 2, PDF page 19. Source figure with original labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L02/blockers.webp', import.meta.url).href,
          "alt": "Lecture 2, PDF page 19. Source figure with original labels and axes retained.",
          "aspect": 0.7483766233766234,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L02-current-subtraction",
      "sectionId": "blockers",
      "difficulty": "medium",
      "type": "multiStepCalc",
      "prompt": "At one matched clamp voltage and time, control current is $-0.8\\,\\text{nA}$ and the TTX residual is $+0.3\\,\\text{nA}$. Find isolated sodium current. Assume a selective complete sodium block and unchanged other currents.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Control current",
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
              "label": "TTX residual",
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
          "title": "Subtract residual",
          "answer": {
            "value": -1.1,
            "unit": "nA",
            "tolerance": 0.0033000000000000004,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": -8e-10,
                "b": -3e-10
              },
              "displayScale": 1e-09
            }
          },
          "tex": "I_{Na}=I_{control}-I_{TTX}",
          "modelAnswer": [
            "A negative result is inward conventional current.",
            "$I_{Na}=I_{control}-I_{TTX}$",
            "$-1.1\\,\\text{nA}$"
          ]
        },
        {
          "title": "Direction",
          "choices": [
            {
              "label": "Positive sodium charge enters"
            },
            {
              "label": "Positive sodium charge leaves"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Inward sodium current carries positive charge inward."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use a signed subtraction, not subtraction of magnitudes."
        },
        {
          "body": "Start $I_{Na}=(-0.8)-(+0.3)$ in nanoamperes."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "A negative result is inward conventional current.",
        "Inward sodium current carries positive charge inward."
      ],
      "points": 1,
      "source": "L02 PDF 19–20"
    },
    {
      "id": "L02-circuit-specific",
      "sectionId": "circuit",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Identify the capacitor, conductance and battery in the source circuit. Distinguish specific capacitance, resistance and conductance from total values; why must area conventions match?",
      "hints": [
        {
          "body": "Check which quantities scale with area and which scale inversely."
        },
        {
          "body": "Do not put total current on one side and current density on the other."
        }
      ],
      "markScheme": [
        {
          "text": "The capacitor stores charge, the conductance carries ionic current, and the battery represents reversal potential."
        },
        {
          "text": "Specific capacitance is capacitance per area, specific resistance is resistance times area, and specific conductance is conductance per area."
        },
        {
          "text": "A density equation needs per-area conductance and capacitance; a total-current equation needs total conductance and capacitance."
        },
        {
          "text": "In excitable cells resistance can depend on voltage and time."
        }
      ],
      "modelAnswer": [
        "The capacitor stores charge, the conductance carries ionic current, and the battery represents reversal potential.",
        "Specific capacitance is capacitance per area, specific resistance is resistance times area, and specific conductance is conductance per area.",
        "A density equation needs per-area conductance and capacitance; a total-current equation needs total conductance and capacitance.",
        "In excitable cells resistance can depend on voltage and time."
      ],
      "points": 1,
      "source": "L02 PDF 21–22",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 2, PDF page 22. Source figure with original labels and axes retained.",
        "fallbackAlt": "Lecture 2, PDF page 22. Source figure with original labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L02/circuit.webp', import.meta.url).href,
          "alt": "Lecture 2, PDF page 22. Source figure with original labels and axes retained.",
          "aspect": 2.368150684931507,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L02-driving-sign",
      "sectionId": "conductance",
      "difficulty": "medium",
      "type": "written",
      "prompt": "At a voltage below a chloride-selective channel reversal, what is the conventional current sign and chloride particle direction? Explain why particle and current directions differ.",
      "hints": [
        {
          "body": "Use voltage minus reversal first."
        },
        {
          "body": "Only after finding current sign convert to negative-ion particle motion."
        }
      ],
      "markScheme": [
        {
          "text": "Voltage minus reversal is negative, so current is inward for positive conductance."
        },
        {
          "text": "Inward conventional current corresponds to chloride leaving the cell."
        },
        {
          "text": "Negative ions moving outward carry the same conventional-current sign as positive ions moving inward."
        }
      ],
      "modelAnswer": [
        "Voltage minus reversal is negative, so current is inward for positive conductance.",
        "Inward conventional current corresponds to chloride leaving the cell.",
        "Negative ions moving outward carry the same conventional-current sign as positive ions moving inward."
      ],
      "points": 1,
      "source": "L02 PDF 24"
    },
    {
      "id": "L02-slope-interpret",
      "sectionId": "slope",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Use the source nonlinear curve. Explain how a positive chord can coexist with a negative slope, and identify which describes a small voltage perturbation.",
      "hints": [
        {
          "body": "Draw tangent and secant separately."
        },
        {
          "body": "Compare the current itself with its derivative."
        }
      ],
      "markScheme": [
        {
          "text": "Chord measures the secant between the operating point and reversal."
        },
        {
          "text": "Slope measures the tangent; current can decrease locally while retaining the same sign relative to reversal."
        },
        {
          "text": "The local slope describes small current changes for small voltage perturbations; chord gives current divided by driving force."
        }
      ],
      "modelAnswer": [
        "Chord measures the secant between the operating point and reversal.",
        "Slope measures the tangent; current can decrease locally while retaining the same sign relative to reversal.",
        "The local slope describes small current changes for small voltage perturbations; chord gives current divided by driving force."
      ],
      "points": 1,
      "source": "L02 PDF 25",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 2, PDF page 25. Source figure with original labels and axes retained.",
        "fallbackAlt": "Lecture 2, PDF page 25. Source figure with original labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L02/slope.webp', import.meta.url).href,
          "alt": "Lecture 2, PDF page 25. Source figure with original labels and axes retained.",
          "aspect": 0.9010989010989011,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L02-iv-protocol",
      "sectionId": "iv",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Design an IV measurement from the source trace family. State the controlled and recorded variables, sampling rule and a way to isolate a component. Contrast current clamp.",
      "hints": [
        {
          "body": "Build the graph from one value per trace."
        },
        {
          "body": "State which value you take before comparing channels."
        }
      ],
      "markScheme": [
        {
          "text": "Voltage clamp controls membrane voltage and records current for each command."
        },
        {
          "text": "Choose either peak or a specified steady-state time for every trace."
        },
        {
          "text": "Plot those currents against voltage; use matched blockers, solutions or protocols to isolate components."
        },
        {
          "text": "Current clamp imposes current and records voltage."
        }
      ],
      "modelAnswer": [
        "Voltage clamp controls membrane voltage and records current for each command.",
        "Choose either peak or a specified steady-state time for every trace.",
        "Plot those currents against voltage; use matched blockers, solutions or protocols to isolate components.",
        "Current clamp imposes current and records voltage."
      ],
      "points": 1,
      "source": "L02 PDF 27",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 2, PDF page 27. Source figure with original labels and axes retained.",
        "fallbackAlt": "Lecture 2, PDF page 27. Source figure with original labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L02/iv.webp', import.meta.url).href,
          "alt": "Lecture 2, PDF page 27. Source figure with original labels and axes retained.",
          "aspect": 1.7548872180451127,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L02-calcium-interpret",
      "sectionId": "calcium",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain the source control, residual and subtracted calcium IV plots. Why can maximum inward current occur before maximal fractional conductance?",
      "hints": [
        {
          "body": "Distinguish an IV curve from an activation curve."
        },
        {
          "body": "Track the two factors of current as voltage approaches reversal."
        }
      ],
      "markScheme": [
        {
          "text": "Nifedipine leaves T-type; control minus T-type gives L-type under selective unchanged-component assumptions."
        },
        {
          "text": "Current combines conductance and driving force."
        },
        {
          "text": "Depolarization can raise activation while reducing inward driving force toward reversal."
        },
        {
          "text": "Divide by driving force and normalize to compare activation; reversal itself is an ill-conditioned division."
        }
      ],
      "modelAnswer": [
        "Nifedipine leaves T-type; control minus T-type gives L-type under selective unchanged-component assumptions.",
        "Current combines conductance and driving force.",
        "Depolarization can raise activation while reducing inward driving force toward reversal.",
        "Divide by driving force and normalize to compare activation; reversal itself is an ill-conditioned division."
      ],
      "points": 1,
      "source": "L02 PDF 28",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 2, PDF page 28. Source figure with original labels and axes retained.",
        "fallbackAlt": "Lecture 2, PDF page 28. Source figure with original labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L02/calcium.webp', import.meta.url).href,
          "alt": "Lecture 2, PDF page 28. Source figure with original labels and axes retained.",
          "aspect": 1.163677130044843,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L02-chloride-limits",
      "sectionId": "chloride",
      "difficulty": "hard",
      "type": "written",
      "prompt": "A student treats the source chloride example as an exact fixed-volume prediction and also uses the slide’s water-flow approximation. Explain the conflict and specify what must be fixed before calculating a new equilibrium.",
      "hints": [
        {
          "body": "Identify what concentration means when volume changes."
        },
        {
          "body": "Write amount equals concentration times volume before selecting a constraint."
        }
      ],
      "markScheme": [
        {
          "text": "Fixed volumes imply concentration changes determined by ion conservation in those volumes."
        },
        {
          "text": "Water flow changes volumes and therefore concentrations even without extra ion transfer."
        },
        {
          "text": "Specify bath size, volume constraints, impermeant material and charge conservation before solving quantitatively."
        },
        {
          "text": "The qualitative transient direction remains supported without asserting the approximate redistribution as exact."
        }
      ],
      "modelAnswer": [
        "Fixed volumes imply concentration changes determined by ion conservation in those volumes.",
        "Water flow changes volumes and therefore concentrations even without extra ion transfer.",
        "Specify bath size, volume constraints, impermeant material and charge conservation before solving quantitatively.",
        "The qualitative transient direction remains supported without asserting the approximate redistribution as exact."
      ],
      "points": 1,
      "source": "L02 PDF 3–4"
    },
    {
      "id": "L02-rectifier-recordings",
      "sectionId": "rectification",
      "difficulty": "hard",
      "type": "written",
      "prompt": "Using the source rectifier recordings, explain why a nonlinear IV plot alone cannot establish whether concentration asymmetry or voltage-dependent channel availability produced the shape. Propose a comparison within the taught methods.",
      "hints": [
        {
          "body": "Compare constant-field curves with real recordings."
        },
        {
          "body": "Control concentrations, then compare time-dependent isolated current."
        }
      ],
      "markScheme": [
        {
          "text": "GHK concentration asymmetry can produce a nonlinear IV relation at constant permeability."
        },
        {
          "text": "Channel conductance can also vary with voltage and time."
        },
        {
          "text": "Compare matched voltage protocols and solutions, and examine time courses or isolated currents."
        },
        {
          "text": "State that the plotted shape alone does not uniquely identify mechanism."
        }
      ],
      "modelAnswer": [
        "GHK concentration asymmetry can produce a nonlinear IV relation at constant permeability.",
        "Channel conductance can also vary with voltage and time.",
        "Compare matched voltage protocols and solutions, and examine time courses or isolated currents.",
        "State that the plotted shape alone does not uniquely identify mechanism."
      ],
      "points": 1,
      "source": "L02 PDF 7–8",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 2, PDF page 8. Source figure with original labels and axes retained.",
        "fallbackAlt": "Lecture 2, PDF page 8. Source figure with original labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L02/rectifier-recordings.webp', import.meta.url).href,
          "alt": "Lecture 2, PDF page 8. Source figure with original labels and axes retained.",
          "aspect": 0.9212481426448736,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L02-sphere-charge",
      "sectionId": "charge",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "An ideal spherical cell has diameter $12\\,\\mu\\text{m}$, specific capacitance $1\\,\\mu\\text{F}/\\text{cm}^2$, and voltage changes from $-65$ to $35\\,\\text{mV}$. Assume only inward monovalent sodium supplies the charging increment. Find area, capacitance, charge and ion count. Use $e=1.6022\\times10^{-19}\\,\\text{C}$.",
      "stages": [
        {
          "title": "Select geometry",
          "choices": [
            {
              "label": "Surface area is 4πr²"
            },
            {
              "label": "Surface area is πr²"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The membrane surrounds the sphere, not its cross section."
          ]
        },
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Radius",
              "answer": {
                "value": 6e-06,
                "unit": "m",
                "tolerance": 6e-12,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 6e-06,
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
            },
            {
              "label": "Voltage increment",
              "answer": {
                "value": 0.1,
                "unit": "V",
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
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Area",
          "answer": {
            "value": 452.3893421169302,
            "unit": "um2",
            "tolerance": 1.3571680263507906,
            "verification": {
              "relation": "sphereArea",
              "inputs": {
                "radius": 6e-06
              },
              "displayScale": 1e-12
            }
          },
          "tex": "A=4\\pi r^2",
          "modelAnswer": [
            "Use radius, not diameter.",
            "$A=4\\pi r^2$",
            "$452.38934\\,\\text{um2}$"
          ]
        },
        {
          "title": "Total capacitance",
          "answer": {
            "value": 4.523893421169302,
            "unit": "pF",
            "tolerance": 0.013571680263507907,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 0.01,
                "b": 4.523893421169302e-10
              },
              "displayScale": 1e-12
            }
          },
          "tex": "C=C_sA",
          "modelAnswer": [
            "Area units must match the specific capacitance.",
            "$C=C_sA$",
            "$4.5238934\\,\\text{pF}$"
          ]
        },
        {
          "title": "Charge gained",
          "answer": {
            "value": 0.4523893421169302,
            "unit": "pC",
            "tolerance": 0.0013571680263507906,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 4.523893421169302e-12,
                "b": 0.1
              },
              "displayScale": 1e-12
            }
          },
          "tex": "\\Delta Q=C(V_f-V_i)",
          "modelAnswer": [
            "Positive entering charge raises voltage.",
            "$\\Delta Q=C(V_f-V_i)$",
            "$0.45238934\\,\\text{pC}$"
          ]
        },
        {
          "title": "Ion count",
          "answer": {
            "value": 2823551.005598116,
            "unit": "",
            "tolerance": 8470.65301679435,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 4.523893421169302e-13,
                "b": 1.6022e-19
              },
              "displayScale": 1
            }
          },
          "tex": "N=|\\Delta Q|/e",
          "modelAnswer": [
            "Count only the charging increment, not all intracellular ions.",
            "$N=|\\Delta Q|/e$",
            "$2823551$"
          ]
        },
        {
          "title": "Sanity check",
          "choices": [
            {
              "label": "Inner charge increases; outward ionic charge is negative"
            },
            {
              "label": "Inner charge decreases; outward ionic charge is positive"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The two reference directions have opposite signs."
          ]
        }
      ],
      "hints": [
        {
          "body": "Choose surface area and capacitor charging, then count ions."
        },
        {
          "body": "First halve the diameter. Convert specific capacitance to SI, then multiply area and voltage increment."
        }
      ],
      "modelAnswer": [
        "The membrane surrounds the sphere, not its cross section.",
        "Convert each stated quantity to the requested unit before evaluating.",
        "Use radius, not diameter.",
        "Area units must match the specific capacitance.",
        "Positive entering charge raises voltage.",
        "Count only the charging increment, not all intracellular ions.",
        "The two reference directions have opposite signs."
      ],
      "points": 1,
      "source": "L02 PDF 11; Exercise2 P1"
    },
    {
      "id": "L02-mutation-reconstruct",
      "sectionId": "mutation",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "Use inside $(K,Na,Cl)=(140,12,8)$ and outside $(6,145,120)\\,\\text{mM}$ at $37\\,^{\\circ}\\text{C}$, shortcut $61.5\\,\\text{mV}$. Initially relative permeabilities are $(1,0.05,0.2)$. A mutation raises only sodium permeability tenfold. Calculate both voltages, their shift and explain which equilibrium voltages changed.",
      "stages": [
        {
          "title": "Initial voltage",
          "answer": {
            "value": -64.24925769921572,
            "unit": "mV",
            "tolerance": 0.19274777309764715,
            "verification": {
              "relation": "ghkVoltage",
              "inputs": {
                "shortcut": 0.0615,
                "pk": 1,
                "pna": 0.05,
                "pcl": 0.2,
                "ko": 6,
                "ki": 140,
                "nao": 145,
                "nai": 12,
                "cli": 8,
                "clo": 120
              },
              "displayScale": 0.001
            }
          },
          "tex": "V_m=k\\log_{10}\\frac{P_KK_o+P_{Na}Na_o+P_{Cl}Cl_i}{P_KK_i+P_{Na}Na_i+P_{Cl}Cl_o}",
          "modelAnswer": [
            "Use the initial weights.",
            "$V_m=k\\log_{10}\\frac{P_KK_o+P_{Na}Na_o+P_{Cl}Cl_i}{P_KK_i+P_{Na}Na_i+P_{Cl}Cl_o}$",
            "$-64.249258\\,\\text{mV}$"
          ]
        },
        {
          "title": "Mutant voltage",
          "answer": {
            "value": -20.099208925583234,
            "unit": "mV",
            "tolerance": 0.060297626776749706,
            "verification": {
              "relation": "ghkVoltage",
              "inputs": {
                "shortcut": 0.0615,
                "pk": 1,
                "pna": 0.5,
                "pcl": 0.2,
                "ko": 6,
                "ki": 140,
                "nao": 145,
                "nai": 12,
                "cli": 8,
                "clo": 120
              },
              "displayScale": 0.001
            }
          },
          "tex": "V_m=k\\log_{10}\\frac{P_KK_o+P_{Na}Na_o+P_{Cl}Cl_i}{P_KK_i+P_{Na}Na_i+P_{Cl}Cl_o}",
          "modelAnswer": [
            "Only sodium permeability changes.",
            "$V_m=k\\log_{10}\\frac{P_KK_o+P_{Na}Na_o+P_{Cl}Cl_i}{P_KK_i+P_{Na}Na_i+P_{Cl}Cl_o}$",
            "$-20.099209\\,\\text{mV}$"
          ]
        },
        {
          "title": "Voltage shift",
          "answer": {
            "value": 44.150048773632484,
            "unit": "mV",
            "tolerance": 0.13245014632089747,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": -0.020099208925583235,
                "b": 0.06424925769921572
              },
              "displayScale": 0.001
            }
          },
          "tex": "\\Delta V=V_{mutant}-V_{initial}",
          "modelAnswer": [
            "A positive shift is depolarizing.",
            "$\\Delta V=V_{mutant}-V_{initial}$",
            "$44.150049\\,\\text{mV}$"
          ]
        },
        {
          "title": "Equilibrium potentials",
          "choices": [
            {
              "label": "All remain initially unchanged"
            },
            {
              "label": "All become initially more positive"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Each individual equilibrium potential depends on its concentration ratio and valence, not permeability."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use GHK twice, changing one parameter only."
        },
        {
          "body": "Replace sodium weight 0.05 by 0.5 in both numerator and denominator."
        }
      ],
      "modelAnswer": [
        "Use the initial weights.",
        "Only sodium permeability changes.",
        "A positive shift is depolarizing.",
        "Each individual equilibrium potential depends on its concentration ratio and valence, not permeability."
      ],
      "points": 1,
      "source": "L02 PDF 13"
    },
    {
      "id": "L02-signalling-sketch",
      "sectionId": "signalling",
      "difficulty": "hard",
      "type": "written",
      "prompt": "Sketch responses to weak and strong stimuli in a graded receptor and a spiking axon. Then predict what happens to a locally spreading graded response at a distant point, and explain why a spike amplitude is a poor intensity code.",
      "hints": [
        {
          "body": "Separate amplitude, frequency and distance."
        },
        {
          "body": "Label both axes and mark threshold only on the spiking example."
        }
      ],
      "markScheme": [
        {
          "text": "Draw larger graded amplitude for stronger stimulation."
        },
        {
          "text": "Draw similar individual spike amplitudes with a changed firing frequency for stronger stimulation."
        },
        {
          "text": "Show attenuation of a graded signal with distance and regeneration of spikes."
        },
        {
          "text": "Explain threshold and lack of spike-amplitude summation without treating all calcium responses as identical."
        }
      ],
      "modelAnswer": [
        "Draw larger graded amplitude for stronger stimulation.",
        "Draw similar individual spike amplitudes with a changed firing frequency for stronger stimulation.",
        "Show attenuation of a graded signal with distance and regeneration of spikes.",
        "Explain threshold and lack of spike-amplitude summation without treating all calcium responses as identical."
      ],
      "points": 1,
      "source": "L02 PDF 15"
    },
    {
      "id": "L02-clamp-method",
      "sectionId": "clamp",
      "difficulty": "hard",
      "type": "written",
      "prompt": "A lower late outward current is observed in bath B at the same voltage than in bath A. Under equal potassium conductance, infer which bath has more outside potassium. Then give a second explanation if that conductance assumption is removed.",
      "hints": [
        {
          "body": "Write current as conductance times driving force."
        },
        {
          "body": "Hold conductance fixed first, then explicitly release that assumption."
        }
      ],
      "markScheme": [
        {
          "text": "With equal conductance, lower outward current implies smaller positive driving force and a more positive potassium reversal in B."
        },
        {
          "text": "With inside fixed, a more positive potassium reversal means higher outside potassium in B."
        },
        {
          "text": "A lower potassium conductance could also reduce current, so amplitude alone is insufficient without the assumption."
        },
        {
          "text": "Use matched voltage/time and isolation controls; do not infer an exact ratio from unobserved reversals."
        }
      ],
      "modelAnswer": [
        "With equal conductance, lower outward current implies smaller positive driving force and a more positive potassium reversal in B.",
        "With inside fixed, a more positive potassium reversal means higher outside potassium in B.",
        "A lower potassium conductance could also reduce current, so amplitude alone is insufficient without the assumption.",
        "Use matched voltage/time and isolation controls; do not infer an exact ratio from unobserved reversals."
      ],
      "points": 1,
      "source": "L02 PDF 17–18; Exercise2 P2"
    },
    {
      "id": "L02-balanced-not-equilibrium",
      "sectionId": "parallel",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "At zero total current, two passive branches have $g_K=6\\,\\text{nS}$, $g_{Na}=3\\,\\text{nS}$, $E_K=-90\\,\\text{mV}$ and $E_{Na}=60\\,\\text{mV}$. Capacitance is constant and no other current exists. Find voltage and each current, then explain why this is not individual-ion equilibrium.",
      "stages": [
        {
          "title": "Stationary voltage",
          "answer": {
            "value": -40,
            "unit": "mV",
            "tolerance": 0.12,
            "verification": {
              "relation": "weightedVoltage",
              "inputs": {
                "gk": 6e-09,
                "gna": 3e-09,
                "gcl": 0,
                "ek": -0.09,
                "ena": 0.06,
                "ecl": 0
              },
              "displayScale": 0.001
            }
          },
          "tex": "V_m=\\frac{g_KE_K+g_{Na}E_{Na}+g_{Cl}E_{Cl}}{g_K+g_{Na}+g_{Cl}}",
          "modelAnswer": [
            "The voltage must lie between the two reversals.",
            "$V_m=\\frac{g_KE_K+g_{Na}E_{Na}+g_{Cl}E_{Cl}}{g_K+g_{Na}+g_{Cl}}$",
            "$-40\\,\\text{mV}$"
          ]
        },
        {
          "title": "Potassium current",
          "answer": {
            "value": 300,
            "unit": "pA",
            "tolerance": 0.9,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 6e-09,
                "b": 0.05
              },
              "displayScale": 1e-12
            }
          },
          "tex": "I_K=g_K(V_m-E_K)",
          "modelAnswer": [
            "Positive potassium current is outward.",
            "$I_K=g_K(V_m-E_K)$",
            "$300\\,\\text{pA}$"
          ]
        },
        {
          "title": "Sodium current",
          "answer": {
            "value": -300,
            "unit": "pA",
            "tolerance": 0.9,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 3e-09,
                "b": -0.1
              },
              "displayScale": 1e-12
            }
          },
          "tex": "I_{Na}=g_{Na}(V_m-E_{Na})",
          "modelAnswer": [
            "Negative sodium current is inward.",
            "$I_{Na}=g_{Na}(V_m-E_{Na})$",
            "$-300\\,\\text{pA}$"
          ]
        },
        {
          "title": "Total ionic current",
          "answer": {
            "value": 0,
            "unit": "pA",
            "tolerance": 1e-12,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": 3e-10,
                "b": -3e-10
              },
              "displayScale": 1e-12
            }
          },
          "tex": "I_{total}=I_K+I_{Na}",
          "modelAnswer": [
            "Opposing currents cancel without each being zero.",
            "$I_{total}=I_K+I_{Na}$",
            "$0\\,\\text{pA}$"
          ]
        },
        {
          "title": "Interpretation",
          "choices": [
            {
              "label": "Steady state without single-ion equilibrium"
            },
            {
              "label": "Every ion is individually at equilibrium"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Zero sum does not imply each summand is zero."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use zero current to solve voltage, then evaluate each branch."
        },
        {
          "body": "Start by summing $g_K(V-E_K)+g_{Na}(V-E_{Na})=0$."
        }
      ],
      "modelAnswer": [
        "The voltage must lie between the two reversals.",
        "Positive potassium current is outward.",
        "Negative sodium current is inward.",
        "Opposing currents cancel without each being zero.",
        "Zero sum does not imply each summand is zero."
      ],
      "points": 1,
      "source": "L02 PDF 26"
    },
    {
      "id": "L02-parallel-caveat",
      "sectionId": "parallel",
      "difficulty": "hard",
      "type": "written",
      "prompt": "At a spike peak during an injected-current pulse, a student immediately applies the zero-current weighted formula. Identify the missing condition and write the appropriate balance before and after the pulse ends.",
      "hints": [
        {
          "body": "Zero derivative is only one part of the balance."
        },
        {
          "body": "Keep the external source in the circuit instead of silently dropping it."
        }
      ],
      "markScheme": [
        {
          "text": "At the peak voltage slope and capacitive current are zero."
        },
        {
          "text": "Injected current need not be zero, so ionic currents can sum to the imposed current rather than zero."
        },
        {
          "text": "Specify the injected-current sign, then equate it to capacitive plus ionic branch currents."
        },
        {
          "text": "Only with no applied current or other unaccounted current does zero slope imply the zero-sum weighted formula."
        }
      ],
      "modelAnswer": [
        "At the peak voltage slope and capacitive current are zero.",
        "Injected current need not be zero, so ionic currents can sum to the imposed current rather than zero.",
        "Specify the injected-current sign, then equate it to capacitive plus ionic branch currents.",
        "Only with no applied current or other unaccounted current does zero slope imply the zero-sum weighted formula."
      ],
      "points": 1,
      "source": "L02 PDF 26"
    },
    {
      "id": "L02-calcium-normalize",
      "sectionId": "calcium",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "At $-10\\,\\text{mV}$, control calcium current is $-180\\,\\text{pA}$ and nifedipine residual is $-60\\,\\text{pA}$. Assume selective L-type block, unchanged T-type and reversal $+50\\,\\text{mV}$. Infer L-type current, conductance and fraction of its $4\\,\\text{nS}$ maximum. Explain why zero current near reversal need not mean closed channels.",
      "stages": [
        {
          "title": "L-type current",
          "answer": {
            "value": -120,
            "unit": "pA",
            "tolerance": 0.36,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": -1.8e-10,
                "b": 6e-11
              },
              "displayScale": 1e-12
            }
          },
          "tex": "I_L=I_{control}-I_T",
          "modelAnswer": [
            "Subtract signed residual current.",
            "$I_L=I_{control}-I_T$",
            "$-120\\,\\text{pA}$"
          ]
        },
        {
          "title": "Driving force",
          "answer": {
            "value": -60,
            "unit": "mV",
            "tolerance": 0.18,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": -0.01,
                "b": -0.05
              },
              "displayScale": 0.001
            }
          },
          "tex": "D=V-E",
          "modelAnswer": [
            "Use voltage minus reversal.",
            "$D=V-E$",
            "$-60\\,\\text{mV}$"
          ]
        },
        {
          "title": "L-type conductance",
          "answer": {
            "value": 2,
            "unit": "nS",
            "tolerance": 0.006,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": -1.2e-10,
                "b": -0.06
              },
              "displayScale": 1e-09
            }
          },
          "tex": "g_L=I_L/(V-E)",
          "modelAnswer": [
            "Negative current divided by negative driving force gives positive conductance.",
            "$g_L=I_L/(V-E)$",
            "$2\\,\\text{nS}$"
          ]
        },
        {
          "title": "Fraction",
          "answer": {
            "value": 0.5,
            "unit": "",
            "tolerance": 0.0015,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 2e-09,
                "b": 4e-09
              },
              "displayScale": 1
            }
          },
          "tex": "f=g_L/g_{L,max}",
          "modelAnswer": [
            "Normalized conductance is between zero and one here.",
            "$f=g_L/g_{L,max}$",
            "$0.5$"
          ]
        },
        {
          "title": "Near reversal",
          "choices": [
            {
              "label": "Zero driving force can hide open channels"
            },
            {
              "label": "Zero current proves all channels are closed"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Do not divide by zero driving force at reversal."
          ]
        }
      ],
      "hints": [
        {
          "body": "Isolate current, remove driving force, then normalize."
        },
        {
          "body": "Start $I_L=(-180)-(-60)$ in picoamperes; compute voltage minus reversal separately."
        }
      ],
      "modelAnswer": [
        "Subtract signed residual current.",
        "Use voltage minus reversal.",
        "Negative current divided by negative driving force gives positive conductance.",
        "Normalized conductance is between zero and one here.",
        "Do not divide by zero driving force at reversal."
      ],
      "points": 1,
      "source": "L02 PDF 28"
    }
  ],
  "mockExams": [
    {
      "id": "L02-mock-A",
      "title": "Mock A: permeability and charge",
      "coverage": "Lectures 1–2. Mixed-ion rest, capacitive charge and voltage-clamp isolation.",
      "questions": [
        {
          "id": "a1",
          "role": "concepts",
          "type": "written",
          "difficulty": "medium",
          "prompt": "a) Distinguish equilibrium from steady state. b) Define permeability. c) Define depolarization and hyperpolarization. Answer each in 1–3 sentences.",
          "markScheme": [
            {
              "text": "Equilibrium requires zero net flux per permeant ion; steady state can balance opposing currents."
            },
            {
              "text": "Permeability combines membrane diffusion, partition and thickness."
            },
            {
              "text": "Depolarization is more positive than rest; hyperpolarization is more negative."
            }
          ],
          "modelAnswer": [
            "Equilibrium requires zero net flux per permeant ion; steady state can balance opposing currents.",
            "Permeability combines membrane diffusion, partition and thickness.",
            "Depolarization is more positive than rest; hyperpolarization is more negative."
          ],
          "hints": [
            {
              "body": "Separate the requested subparts before answering."
            },
            {
              "body": "Use the taught reference direction and state the assumptions behind each inference."
            }
          ],
          "points": 1,
          "source": "L02 source matrix; cumulative L01 prerequisites"
        },
        {
          "id": "a2",
          "role": "explanation",
          "type": "written",
          "difficulty": "medium",
          "prompt": "Explain and sketch why a membrane can have a stable resting voltage while sodium and potassium continue to cross. Label directions and distinguish pumps from passive pathways.",
          "markScheme": [
            {
              "text": "Draw negative inside relative to outside and appropriate ion gradients."
            },
            {
              "text": "Passive ionic currents can oppose and sum to zero without individual equilibrium."
            },
            {
              "text": "Pumps maintain gradients and may contribute electrogenic current."
            },
            {
              "text": "A small boundary charge separation is compatible with bulk electroneutrality."
            }
          ],
          "modelAnswer": [
            "Draw negative inside relative to outside and appropriate ion gradients.",
            "Passive ionic currents can oppose and sum to zero without individual equilibrium.",
            "Pumps maintain gradients and may contribute electrogenic current.",
            "A small boundary charge separation is compatible with bulk electroneutrality."
          ],
          "hints": [
            {
              "body": "Separate the requested subparts before answering."
            },
            {
              "body": "Use the taught reference direction and state the assumptions behind each inference."
            }
          ],
          "points": 1,
          "source": "L02 source matrix; cumulative L01 prerequisites"
        },
        {
          "id": "a3",
          "role": "calculation",
          "sectionId": "charge",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "An ideal spherical cell has diameter $12\\,\\mu\\text{m}$, specific capacitance $1\\,\\mu\\text{F}/\\text{cm}^2$, and voltage changes from $-65$ to $35\\,\\text{mV}$. Assume only inward monovalent sodium supplies the charging increment. Find area, capacitance, charge and ion count. Use $e=1.6022\\times10^{-19}\\,\\text{C}$.",
          "stages": [
            {
              "title": "Select geometry",
              "choices": [
                {
                  "label": "Surface area is 4πr²"
                },
                {
                  "label": "Surface area is πr²"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "The membrane surrounds the sphere, not its cross section."
              ]
            },
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "Radius",
                  "answer": {
                    "value": 6e-06,
                    "unit": "m",
                    "tolerance": 6e-12,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 6e-06,
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
                },
                {
                  "label": "Voltage increment",
                  "answer": {
                    "value": 0.1,
                    "unit": "V",
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
                }
              ],
              "modelAnswer": [
                "Convert each stated quantity to the requested unit before evaluating."
              ]
            },
            {
              "title": "Area",
              "answer": {
                "value": 452.3893421169302,
                "unit": "um2",
                "tolerance": 1.3571680263507906,
                "verification": {
                  "relation": "sphereArea",
                  "inputs": {
                    "radius": 6e-06
                  },
                  "displayScale": 1e-12
                }
              },
              "tex": "A=4\\pi r^2",
              "modelAnswer": [
                "Use radius, not diameter.",
                "$A=4\\pi r^2$",
                "$452.38934\\,\\text{um2}$"
              ]
            },
            {
              "title": "Total capacitance",
              "answer": {
                "value": 4.523893421169302,
                "unit": "pF",
                "tolerance": 0.013571680263507907,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 0.01,
                    "b": 4.523893421169302e-10
                  },
                  "displayScale": 1e-12
                }
              },
              "tex": "C=C_sA",
              "modelAnswer": [
                "Area units must match the specific capacitance.",
                "$C=C_sA$",
                "$4.5238934\\,\\text{pF}$"
              ]
            },
            {
              "title": "Charge gained",
              "answer": {
                "value": 0.4523893421169302,
                "unit": "pC",
                "tolerance": 0.0013571680263507906,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 4.523893421169302e-12,
                    "b": 0.1
                  },
                  "displayScale": 1e-12
                }
              },
              "tex": "\\Delta Q=C(V_f-V_i)",
              "modelAnswer": [
                "Positive entering charge raises voltage.",
                "$\\Delta Q=C(V_f-V_i)$",
                "$0.45238934\\,\\text{pC}$"
              ]
            },
            {
              "title": "Ion count",
              "answer": {
                "value": 2823551.005598116,
                "unit": "",
                "tolerance": 8470.65301679435,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 4.523893421169302e-13,
                    "b": 1.6022e-19
                  },
                  "displayScale": 1
                }
              },
              "tex": "N=|\\Delta Q|/e",
              "modelAnswer": [
                "Count only the charging increment, not all intracellular ions.",
                "$N=|\\Delta Q|/e$",
                "$2823551$"
              ]
            },
            {
              "title": "Sanity check",
              "choices": [
                {
                  "label": "Inner charge increases; outward ionic charge is negative"
                },
                {
                  "label": "Inner charge decreases; outward ionic charge is positive"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "The two reference directions have opposite signs."
              ]
            }
          ],
          "hints": [
            {
              "body": "Choose surface area and capacitor charging, then count ions."
            },
            {
              "body": "First halve the diameter. Convert specific capacitance to SI, then multiply area and voltage increment."
            }
          ],
          "modelAnswer": [
            "The membrane surrounds the sphere, not its cross section.",
            "Convert each stated quantity to the requested unit before evaluating.",
            "Use radius, not diameter.",
            "Area units must match the specific capacitance.",
            "Positive entering charge raises voltage.",
            "Count only the charging increment, not all intracellular ions.",
            "The two reference directions have opposite signs."
          ],
          "points": 1,
          "source": "L02 PDF 11; Exercise2 P1"
        },
        {
          "id": "a4",
          "role": "calculation",
          "sectionId": "potassium",
          "difficulty": "medium",
          "type": "multiStepCalc",
          "prompt": "A squid-like membrane has inside $(K,Na,Cl)=(400,50,40)$ and outside $(20,460,540)\\,\\text{mM}$ with permeability ratio $1:0.03:0.1$. Use $58\\,\\text{mV}$ at $20\\,^{\\circ}\\text{C}$. Compare potassium-only and GHK voltages.",
          "stages": [
            {
              "title": "Potassium equilibrium",
              "answer": {
                "value": -75.45973974851091,
                "unit": "mV",
                "tolerance": 0.22637921924553275,
                "verification": {
                  "relation": "nernst",
                  "inputs": {
                    "shortcut": 0.058,
                    "z": 1,
                    "outside": 20,
                    "inside": 400
                  },
                  "displayScale": 0.001
                }
              },
              "tex": "E_K=58\\,\\text{mV}\\log_{10}(20/400)",
              "modelAnswer": [
                "Potassium-only voltage is a single-ion equilibrium.",
                "$E_K=58\\,\\text{mV}\\log_{10}(20/400)$",
                "$-75.45974\\,\\text{mV}$"
              ]
            },
            {
              "title": "Mixed voltage",
              "answer": {
                "value": -62.69780172536392,
                "unit": "mV",
                "tolerance": 0.18809340517609174,
                "verification": {
                  "relation": "ghkVoltage",
                  "inputs": {
                    "shortcut": 0.058,
                    "pk": 1,
                    "pna": 0.03,
                    "pcl": 0.1,
                    "ko": 20,
                    "ki": 400,
                    "nao": 460,
                    "nai": 50,
                    "cli": 40,
                    "clo": 540
                  },
                  "displayScale": 0.001
                }
              },
              "tex": "V_m=58\\,\\text{mV}\\log_{10}\\frac{20+0.03(460)+0.1(40)}{400+0.03(50)+0.1(540)}",
              "modelAnswer": [
                "Other ions make this rest different from potassium equilibrium.",
                "$V_m=58\\,\\text{mV}\\log_{10}\\frac{20+0.03(460)+0.1(40)}{400+0.03(50)+0.1(540)}$",
                "$-62.697802\\,\\text{mV}$"
              ]
            },
            {
              "title": "Comparison",
              "choices": [
                {
                  "label": "GHK voltage is less negative"
                },
                {
                  "label": "GHK voltage is more negative"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "Sodium contribution makes the GHK voltage less negative here."
              ]
            }
          ],
          "hints": [
            {
              "body": "Use Nernst and GHK under the same shortcut."
            },
            {
              "body": "Start the two numerators with 20 and with $20+0.03(460)+0.1(40)$ respectively."
            }
          ],
          "modelAnswer": [
            "Potassium-only voltage is a single-ion equilibrium.",
            "Other ions make this rest different from potassium equilibrium.",
            "Sodium contribution makes the GHK voltage less negative here."
          ],
          "points": 1,
          "source": "L02 PDF 9"
        },
        {
          "id": "a5",
          "role": "methods",
          "type": "written",
          "difficulty": "medium",
          "prompt": "Interpret the source voltage-clamp traces. Identify the command, early inward and late outward components; design an ion-replacement control and subtraction. Why does the action potential waveform alone fail to identify which ion carries each phase?",
          "markScheme": [
            {
              "text": "Voltage is controlled; current is recorded."
            },
            {
              "text": "Sodium is early transient inward; potassium is delayed sustained outward."
            },
            {
              "text": "Replace outside sodium by impermeant choline and compare matched time/voltage."
            },
            {
              "text": "Control minus residual isolates sodium if other currents remain unchanged."
            },
            { "text": "Voltage reflects the combined capacitive and ionic current balance. Compare separated clamp currents and their reversal shifts under ion substitution." }
          ],
          "modelAnswer": [
            "Voltage is controlled; current is recorded.",
            "Sodium is early transient inward; potassium is delayed sustained outward.",
            "Replace outside sodium by impermeant choline and compare matched time/voltage.",
            "Control minus residual isolates sodium if other currents remain unchanged.",
            "Voltage reflects the combined capacitive and ionic current balance. Compare separated clamp currents and their reversal shifts under ion substitution."
          ],
          "hints": [
            {
              "body": "Separate the requested subparts before answering."
            },
            {
              "body": "Use the taught reference direction and state the assumptions behind each inference."
            }
          ],
          "points": 1,
          "source": "L02 source matrix; cumulative L01 prerequisites",
          "figure": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 2, PDF page 18. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 2, PDF page 18. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L02/clamp.webp', import.meta.url).href,
              "alt": "Lecture 2, PDF page 18. Source figure with original labels and axes retained.",
              "aspect": 0.7456213511259383,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ]
    },
    {
      "id": "L02-mock-B",
      "title": "Mock B: reversal and activation",
      "coverage": "Lectures 1–2. Reversal shifts, graded versus spike coding and calcium-current isolation.",
      "questions": [
        {
          "id": "b1",
          "role": "concepts",
          "type": "written",
          "difficulty": "medium",
          "prompt": "a) Distinguish equilibrium, channel reversal and whole-cell rest. b) What do TTX and TEA leave? c) What is slope conductance?",
          "markScheme": [
            {
              "text": "Equilibrium belongs to an ion; reversal to a pathway; rest to the entire cell."
            },
            {
              "text": "TTX leaves potassium and TEA leaves sodium in the taught selective-block model."
            },
            {
              "text": "Slope conductance is the local current-voltage derivative."
            }
          ],
          "modelAnswer": [
            "Equilibrium belongs to an ion; reversal to a pathway; rest to the entire cell.",
            "TTX leaves potassium and TEA leaves sodium in the taught selective-block model.",
            "Slope conductance is the local current-voltage derivative."
          ],
          "hints": [
            {
              "body": "Separate the requested subparts before answering."
            },
            {
              "body": "Use the taught reference direction and state the assumptions behind each inference."
            }
          ],
          "points": 1,
          "source": "L02 source matrix; cumulative L01 prerequisites"
        },
        {
          "id": "b2",
          "role": "explanation",
          "type": "written",
          "difficulty": "medium",
          "prompt": "Sketch weak and strong stimulus responses in a graded receptor and a spiking axon. Explain threshold, summation, coding and spread.",
          "markScheme": [
            {
              "text": "Graded amplitude grows with stimulus and can summate."
            },
            {
              "text": "Spikes cross a threshold and encode intensity through frequency rather than summed amplitude."
            },
            {
              "text": "Graded signals attenuate locally; spikes regenerate over distance."
            },
            {
              "text": "Label time and voltage axes and allow the taught mixed calcium responses."
            }
          ],
          "modelAnswer": [
            "Graded amplitude grows with stimulus and can summate.",
            "Spikes cross a threshold and encode intensity through frequency rather than summed amplitude.",
            "Graded signals attenuate locally; spikes regenerate over distance.",
            "Label time and voltage axes and allow the taught mixed calcium responses."
          ],
          "hints": [
            {
              "body": "Separate the requested subparts before answering."
            },
            {
              "body": "Use the taught reference direction and state the assumptions behind each inference."
            }
          ],
          "points": 1,
          "source": "L02 source matrix; cumulative L01 prerequisites"
        },
        {
          "id": "b3",
          "role": "calculation",
          "sectionId": "clamp",
          "difficulty": "medium",
          "type": "multiStepCalc",
          "prompt": "New voltage-clamp measurements give approximate early-current reversals $+60$ and $+36\\,\\text{mV}$ in baths A and B. Inside sodium stays fixed. Use $58\\,\\text{mV}$ at $20\\,^{\\circ}\\text{C}$. Infer outside sodium ratio A/B, stating why the graph-derived result is approximate.",
          "stages": [
            {
              "title": "Reversal difference",
              "answer": {
                "value": 24,
                "unit": "mV",
                "tolerance": 0.07200000000000001,
                "verification": {
                  "relation": "sum",
                  "inputs": {
                    "a": 0.06,
                    "b": -0.036
                  },
                  "displayScale": 0.001
                }
              },
              "tex": "\\Delta E=E_A-E_B",
              "modelAnswer": [
                "Subtract voltages; do not divide the reversal potentials.",
                "$\\Delta E=E_A-E_B$",
                "$24\\,\\text{mV}$"
              ]
            },
            {
              "title": "Outside ratio",
              "answer": {
                "value": 2.592943797404667,
                "unit": "",
                "tolerance": 0.007778831392214002,
                "verification": {
                  "relation": "nernstRatio",
                  "inputs": {
                    "delta": 0.024,
                    "shortcut": 0.058
                  },
                  "displayScale": 1
                }
              },
              "tex": "C_{o,A}/C_{o,B}=10^{\\Delta E/(58\\,\\text{mV})}",
              "modelAnswer": [
                "Approximate reversal readings give an approximate concentration ratio.",
                "$C_{o,A}/C_{o,B}=10^{\\Delta E/(58\\,\\text{mV})}$",
                "$2.5929438$"
              ]
            },
            {
              "title": "Limitation",
              "choices": [
                {
                  "label": "Approximate reversals limit ratio precision"
                },
                {
                  "label": "Absolute inside sodium must also be known"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "Inside cancels if fixed, but uncertainty in the shift remains."
              ]
            }
          ],
          "hints": [
            {
              "body": "Subtract the two single-ion Nernst equations."
            },
            {
              "body": "Start with the positive reversal difference, then exponentiate the difference divided by the shortcut."
            }
          ],
          "modelAnswer": [
            "Subtract voltages; do not divide the reversal potentials.",
            "Approximate reversal readings give an approximate concentration ratio.",
            "Inside cancels if fixed, but uncertainty in the shift remains."
          ],
          "points": 1,
          "source": "L02 PDF 17–18; Exercise2 P2"
        },
        {
          "id": "b4",
          "role": "calculation",
          "sectionId": "calcium",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "At $-10\\,\\text{mV}$, control calcium current is $-180\\,\\text{pA}$ and nifedipine residual is $-60\\,\\text{pA}$. Assume selective L-type block, unchanged T-type and reversal $+50\\,\\text{mV}$. Infer L-type current, conductance and fraction of its $4\\,\\text{nS}$ maximum. Explain why zero current near reversal need not mean closed channels.",
          "stages": [
            {
              "title": "L-type current",
              "answer": {
                "value": -120,
                "unit": "pA",
                "tolerance": 0.36,
                "verification": {
                  "relation": "sum",
                  "inputs": {
                    "a": -1.8e-10,
                    "b": 6e-11
                  },
                  "displayScale": 1e-12
                }
              },
              "tex": "I_L=I_{control}-I_T",
              "modelAnswer": [
                "Subtract signed residual current.",
                "$I_L=I_{control}-I_T$",
                "$-120\\,\\text{pA}$"
              ]
            },
            {
              "title": "Driving force",
              "answer": {
                "value": -60,
                "unit": "mV",
                "tolerance": 0.18,
                "verification": {
                  "relation": "sum",
                  "inputs": {
                    "a": -0.01,
                    "b": -0.05
                  },
                  "displayScale": 0.001
                }
              },
              "tex": "D=V-E",
              "modelAnswer": [
                "Use voltage minus reversal.",
                "$D=V-E$",
                "$-60\\,\\text{mV}$"
              ]
            },
            {
              "title": "L-type conductance",
              "answer": {
                "value": 2,
                "unit": "nS",
                "tolerance": 0.006,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -1.2e-10,
                    "b": -0.06
                  },
                  "displayScale": 1e-09
                }
              },
              "tex": "g_L=I_L/(V-E)",
              "modelAnswer": [
                "Negative current divided by negative driving force gives positive conductance.",
                "$g_L=I_L/(V-E)$",
                "$2\\,\\text{nS}$"
              ]
            },
            {
              "title": "Fraction",
              "answer": {
                "value": 0.5,
                "unit": "",
                "tolerance": 0.0015,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 2e-09,
                    "b": 4e-09
                  },
                  "displayScale": 1
                }
              },
              "tex": "f=g_L/g_{L,max}",
              "modelAnswer": [
                "Normalized conductance is between zero and one here.",
                "$f=g_L/g_{L,max}$",
                "$0.5$"
              ]
            },
            {
              "title": "Near reversal",
              "choices": [
                {
                  "label": "Zero driving force can hide open channels"
                },
                {
                  "label": "Zero current proves all channels are closed"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "Do not divide by zero driving force at reversal."
              ]
            }
          ],
          "hints": [
            {
              "body": "Isolate current, remove driving force, then normalize."
            },
            {
              "body": "Start $I_L=(-180)-(-60)$ in picoamperes; compute voltage minus reversal separately."
            }
          ],
          "modelAnswer": [
            "Subtract signed residual current.",
            "Use voltage minus reversal.",
            "Negative current divided by negative driving force gives positive conductance.",
            "Normalized conductance is between zero and one here.",
            "Do not divide by zero driving force at reversal."
          ],
          "points": 1,
          "source": "L02 PDF 28"
        },
        {
          "id": "b5",
          "role": "methods",
          "type": "written",
          "difficulty": "medium",
          "prompt": "Use the calcium source figure to design an L-type activation curve. Include isolation, sampling, driving-force correction and a limitation near reversal. How would you handle a pipette-to-bath junction potential when estimating the voltage dependence?",
          "markScheme": [
            {
              "text": "Record matched voltage-clamp currents before and after nifedipine."
            },
            {
              "text": "Residual is T-type; control minus residual isolates L-type under unchanged-component assumptions."
            },
            {
              "text": "Use consistent sampling, divide by voltage minus reversal and normalize conductance."
            },
            {
              "text": "At reversal current cannot identify conductance by division; current maximum is not activation maximum."
            },
            { "text": "Measure or estimate the junction potential for the solutions used and correct the voltage axis with the stated sign convention before interpreting activation or reversal." }
          ],
          "modelAnswer": [
            "Record matched voltage-clamp currents before and after nifedipine.",
            "Residual is T-type; control minus residual isolates L-type under unchanged-component assumptions.",
            "Use consistent sampling, divide by voltage minus reversal and normalize conductance.",
            "At reversal current cannot identify conductance by division; current maximum is not activation maximum.",
            "Measure or estimate the junction potential for the solutions used and correct the voltage axis with the stated sign convention before interpreting activation or reversal."
          ],
          "hints": [
            {
              "body": "Separate the requested subparts before answering."
            },
            {
              "body": "Use the taught reference direction and state the assumptions behind each inference."
            }
          ],
          "points": 1,
          "source": "L02 source matrix; cumulative L01 prerequisites",
          "figure": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 2, PDF page 28. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 2, PDF page 28. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L02/calcium.webp', import.meta.url).href,
              "alt": "Lecture 2, PDF page 28. Source figure with original labels and axes retained.",
              "aspect": 1.163677130044843,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ]
    },
    {
      "id": "L02-mock-C",
      "title": "Mock C: competing membrane pathways",
      "coverage": "Lectures 1–2. Mutation, parallel currents, nonlinear IV and the limits of inference.",
      "questions": [
        {
          "id": "c1",
          "role": "concepts",
          "type": "written",
          "difficulty": "medium",
          "prompt": "a) State the GHK assumptions. b) What does inward rectification mean? c) Distinguish specific from total capacitance.",
          "markScheme": [
            {
              "text": "GHK uses electrodiffusion, independent ion movement and constant field; voltage form assumes zero total current."
            },
            {
              "text": "Inward current flows more readily than outward."
            },
            {
              "text": "Specific capacitance is per area; total capacitance multiplies it by membrane area."
            }
          ],
          "modelAnswer": [
            "GHK uses electrodiffusion, independent ion movement and constant field; voltage form assumes zero total current.",
            "Inward current flows more readily than outward.",
            "Specific capacitance is per area; total capacitance multiplies it by membrane area."
          ],
          "hints": [
            {
              "body": "Separate the requested subparts before answering."
            },
            {
              "body": "Use the taught reference direction and state the assumptions behind each inference."
            }
          ],
          "points": 1,
          "source": "L02 source matrix; cumulative L01 prerequisites"
        },
        {
          "id": "c2",
          "role": "explanation",
          "type": "written",
          "difficulty": "medium",
          "prompt": "Explain the chloride source perturbation sequence with a labelled voltage sketch. Discuss the immediate versus delayed causes and why an exact calculation needs volume assumptions.",
          "markScheme": [
            {
              "text": "Outside chloride reduction shifts chloride equilibrium and initially depolarizes."
            },
            {
              "text": "Redistribution then moves voltage toward a shared equilibrium."
            },
            {
              "text": "Restoring outside chloride first hyperpolarizes, then recovers."
            },
            {
              "text": "Mark time and voltage and distinguish fixed-volume conservation from changing-volume approximations."
            }
          ],
          "modelAnswer": [
            "Outside chloride reduction shifts chloride equilibrium and initially depolarizes.",
            "Redistribution then moves voltage toward a shared equilibrium.",
            "Restoring outside chloride first hyperpolarizes, then recovers.",
            "Mark time and voltage and distinguish fixed-volume conservation from changing-volume approximations."
          ],
          "hints": [
            {
              "body": "Separate the requested subparts before answering."
            },
            {
              "body": "Use the taught reference direction and state the assumptions behind each inference."
            }
          ],
          "points": 1,
          "source": "L02 source matrix; cumulative L01 prerequisites"
        },
        {
          "id": "c3",
          "role": "calculation",
          "sectionId": "mutation",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "Use inside $(K,Na,Cl)=(140,12,8)$ and outside $(6,145,120)\\,\\text{mM}$ at $37\\,^{\\circ}\\text{C}$, shortcut $61.5\\,\\text{mV}$. Initially relative permeabilities are $(1,0.05,0.2)$. A mutation raises only sodium permeability tenfold. Calculate both voltages, their shift and explain which equilibrium voltages changed.",
          "stages": [
            {
              "title": "Initial voltage",
              "answer": {
                "value": -64.24925769921572,
                "unit": "mV",
                "tolerance": 0.19274777309764715,
                "verification": {
                  "relation": "ghkVoltage",
                  "inputs": {
                    "shortcut": 0.0615,
                    "pk": 1,
                    "pna": 0.05,
                    "pcl": 0.2,
                    "ko": 6,
                    "ki": 140,
                    "nao": 145,
                    "nai": 12,
                    "cli": 8,
                    "clo": 120
                  },
                  "displayScale": 0.001
                }
              },
              "tex": "V_m=k\\log_{10}\\frac{P_KK_o+P_{Na}Na_o+P_{Cl}Cl_i}{P_KK_i+P_{Na}Na_i+P_{Cl}Cl_o}",
              "modelAnswer": [
                "Use the initial weights.",
                "$V_m=k\\log_{10}\\frac{P_KK_o+P_{Na}Na_o+P_{Cl}Cl_i}{P_KK_i+P_{Na}Na_i+P_{Cl}Cl_o}$",
                "$-64.249258\\,\\text{mV}$"
              ]
            },
            {
              "title": "Mutant voltage",
              "answer": {
                "value": -20.099208925583234,
                "unit": "mV",
                "tolerance": 0.060297626776749706,
                "verification": {
                  "relation": "ghkVoltage",
                  "inputs": {
                    "shortcut": 0.0615,
                    "pk": 1,
                    "pna": 0.5,
                    "pcl": 0.2,
                    "ko": 6,
                    "ki": 140,
                    "nao": 145,
                    "nai": 12,
                    "cli": 8,
                    "clo": 120
                  },
                  "displayScale": 0.001
                }
              },
              "tex": "V_m=k\\log_{10}\\frac{P_KK_o+P_{Na}Na_o+P_{Cl}Cl_i}{P_KK_i+P_{Na}Na_i+P_{Cl}Cl_o}",
              "modelAnswer": [
                "Only sodium permeability changes.",
                "$V_m=k\\log_{10}\\frac{P_KK_o+P_{Na}Na_o+P_{Cl}Cl_i}{P_KK_i+P_{Na}Na_i+P_{Cl}Cl_o}$",
                "$-20.099209\\,\\text{mV}$"
              ]
            },
            {
              "title": "Voltage shift",
              "answer": {
                "value": 44.150048773632484,
                "unit": "mV",
                "tolerance": 0.13245014632089747,
                "verification": {
                  "relation": "sum",
                  "inputs": {
                    "a": -0.020099208925583235,
                    "b": 0.06424925769921572
                  },
                  "displayScale": 0.001
                }
              },
              "tex": "\\Delta V=V_{mutant}-V_{initial}",
              "modelAnswer": [
                "A positive shift is depolarizing.",
                "$\\Delta V=V_{mutant}-V_{initial}$",
                "$44.150049\\,\\text{mV}$"
              ]
            },
            {
              "title": "Equilibrium potentials",
              "choices": [
                {
                  "label": "All remain initially unchanged"
                },
                {
                  "label": "All become initially more positive"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "Each individual equilibrium potential depends on its concentration ratio and valence, not permeability."
              ]
            }
          ],
          "hints": [
            {
              "body": "Use GHK twice, changing one parameter only."
            },
            {
              "body": "Replace sodium weight 0.05 by 0.5 in both numerator and denominator."
            }
          ],
          "modelAnswer": [
            "Use the initial weights.",
            "Only sodium permeability changes.",
            "A positive shift is depolarizing.",
            "Each individual equilibrium potential depends on its concentration ratio and valence, not permeability."
          ],
          "points": 1,
          "source": "L02 PDF 13"
        },
        {
          "id": "c4",
          "role": "calculation",
          "sectionId": "parallel",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "At zero total current, two passive branches have $g_K=6\\,\\text{nS}$, $g_{Na}=3\\,\\text{nS}$, $E_K=-90\\,\\text{mV}$ and $E_{Na}=60\\,\\text{mV}$. Capacitance is constant and no other current exists. Find voltage and each current, then explain why this is not individual-ion equilibrium.",
          "stages": [
            {
              "title": "Stationary voltage",
              "answer": {
                "value": -40,
                "unit": "mV",
                "tolerance": 0.12,
                "verification": {
                  "relation": "weightedVoltage",
                  "inputs": {
                    "gk": 6e-09,
                    "gna": 3e-09,
                    "gcl": 0,
                    "ek": -0.09,
                    "ena": 0.06,
                    "ecl": 0
                  },
                  "displayScale": 0.001
                }
              },
              "tex": "V_m=\\frac{g_KE_K+g_{Na}E_{Na}+g_{Cl}E_{Cl}}{g_K+g_{Na}+g_{Cl}}",
              "modelAnswer": [
                "The voltage must lie between the two reversals.",
                "$V_m=\\frac{g_KE_K+g_{Na}E_{Na}+g_{Cl}E_{Cl}}{g_K+g_{Na}+g_{Cl}}$",
                "$-40\\,\\text{mV}$"
              ]
            },
            {
              "title": "Potassium current",
              "answer": {
                "value": 300,
                "unit": "pA",
                "tolerance": 0.9,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 6e-09,
                    "b": 0.05
                  },
                  "displayScale": 1e-12
                }
              },
              "tex": "I_K=g_K(V_m-E_K)",
              "modelAnswer": [
                "Positive potassium current is outward.",
                "$I_K=g_K(V_m-E_K)$",
                "$300\\,\\text{pA}$"
              ]
            },
            {
              "title": "Sodium current",
              "answer": {
                "value": -300,
                "unit": "pA",
                "tolerance": 0.9,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 3e-09,
                    "b": -0.1
                  },
                  "displayScale": 1e-12
                }
              },
              "tex": "I_{Na}=g_{Na}(V_m-E_{Na})",
              "modelAnswer": [
                "Negative sodium current is inward.",
                "$I_{Na}=g_{Na}(V_m-E_{Na})$",
                "$-300\\,\\text{pA}$"
              ]
            },
            {
              "title": "Total ionic current",
              "answer": {
                "value": 0,
                "unit": "pA",
                "tolerance": 1e-12,
                "verification": {
                  "relation": "sum",
                  "inputs": {
                    "a": 3e-10,
                    "b": -3e-10
                  },
                  "displayScale": 1e-12
                }
              },
              "tex": "I_{total}=I_K+I_{Na}",
              "modelAnswer": [
                "Opposing currents cancel without each being zero.",
                "$I_{total}=I_K+I_{Na}$",
                "$0\\,\\text{pA}$"
              ]
            },
            {
              "title": "Interpretation",
              "choices": [
                {
                  "label": "Steady state without single-ion equilibrium"
                },
                {
                  "label": "Every ion is individually at equilibrium"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "Zero sum does not imply each summand is zero."
              ]
            }
          ],
          "hints": [
            {
              "body": "Use zero current to solve voltage, then evaluate each branch."
            },
            {
              "body": "Start by summing $g_K(V-E_K)+g_{Na}(V-E_{Na})=0$."
            }
          ],
          "modelAnswer": [
            "The voltage must lie between the two reversals.",
            "Positive potassium current is outward.",
            "Negative sodium current is inward.",
            "Opposing currents cancel without each being zero.",
            "Zero sum does not imply each summand is zero."
          ],
          "points": 1,
          "source": "L02 PDF 26"
        },
        {
          "id": "c5",
          "role": "methods",
          "type": "written",
          "difficulty": "medium",
          "prompt": "Use the nonlinear source IV curve: distinguish chord and slope, explain positive chord with negative slope, and propose controls before attributing an altered current to a concentration change. How can a fixed-permeability pore yield a curved current–voltage relation?",
          "markScheme": [
            {
              "text": "Chord uses a secant to reversal; slope uses a local tangent."
            },
            {
              "text": "Current and driving force can retain the same sign while current decreases locally with voltage."
            },
            {
              "text": "Compare matched voltage and time and isolate the pathway."
            },
            {
              "text": "A changed conductance can mimic a changed driving force, so amplitude alone is insufficient."
            },
            { "text": "Under the constant-field model unequal concentrations can produce different conductance on opposing sides of reversal even at fixed permeability." }
          ],
          "modelAnswer": [
            "Chord uses a secant to reversal; slope uses a local tangent.",
            "Current and driving force can retain the same sign while current decreases locally with voltage.",
            "Compare matched voltage and time and isolate the pathway.",
            "A changed conductance can mimic a changed driving force, so amplitude alone is insufficient.",
            "Under the constant-field model unequal concentrations can produce different conductance on opposing sides of reversal even at fixed permeability."
          ],
          "hints": [
            {
              "body": "Separate the requested subparts before answering."
            },
            {
              "body": "Use the taught reference direction and state the assumptions behind each inference."
            }
          ],
          "points": 1,
          "source": "L02 source matrix; cumulative L01 prerequisites",
          "figure": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 2, PDF page 25. Source figure with original labels and axes retained.",
            "fallbackAlt": "Lecture 2, PDF page 25. Source figure with original labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L02/slope.webp', import.meta.url).href,
              "alt": "Lecture 2, PDF page 25. Source figure with original labels and axes retained.",
              "aspect": 0.9010989010989011,
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
// Keep the earlier bank IDs available for saved records and numeric validation.
// The MCQ-only policy presents only these compatible items during regular practice.
function practiceMc(id, sectionId, difficulty, prompt, hints, choices) {
  const [correctChoice] = choices;
  return {
    id: `L02-core-${id}`,
    sectionId,
    difficulty,
    type: 'mc',
    prompt,
    hints: hints.map(body => ({ body })),
    options: choices.map(([text, feedback]) => ({ text, feedback })),
    correct: 0,
    modelAnswer: [correctChoice[1]],
  };
}

content.lectureQuiz.push(
  practiceMc('choose-nernst', 'equilibrium', 'easy',
    'Which equation gives the equilibrium voltage of a single ion?',
    ["Start from the zero-net-flux condition.", "Look for one concentration ratio with a signed valence."], [
      ['Single-ion Nernst equation', 'Nernst gives the voltage where net flux of that ion is zero.'],
      ['GHK current equation', 'GHK current gives current density at a specified voltage and requires further work to find its zero.'],
      ['Capacitor charge equation', 'The capacitor equation relates stored charge to voltage and has no concentration term.'],
    ]),
  practiceMc('chloride-valence', 'equilibrium', 'medium',
    'Outside chloride exceeds inside chloride. What sign does its Nernst potential have?',
    ["What sign is the logarithm of a ratio greater than one?", "Multiply by the sign of the valence for chloride."], [
      ['Negative', 'The logarithm is positive and chloride has negative valence, giving a negative voltage.'],
      ['Positive', 'The logarithm is positive, but chloride valence reverses its sign.'],
      ['Zero', 'Zero would require equal concentrations in this model.'],
    ]),
  practiceMc('potassium-shift', 'potassium', 'medium',
    'Outside potassium rises while the other concentrations and permeabilities stay fixed. What happens to the GHK resting voltage?',
    ["Find the weighted outside potassium term.", "Only the numerator increases, so consider how the logarithm responds."], [
      ['It becomes more positive', 'Outside potassium increases the numerator while the denominator stays fixed. The logarithm increases.'],
      ['It becomes more negative', 'Outside potassium enters the numerator, so increasing it raises voltage.'],
      ['It stays at the same value', 'The conductance or permeability can stay fixed while the concentration gradient changes.'],
    ]),
  practiceMc('charge-scale', 'charge', 'medium',
    'Two spherical cells have the same specific membrane capacitance. For the same voltage step, how much charge does the cell with twice the radius require?',
    ["Use the link between charge and total capacitance.", "Total capacitance scales with spherical area, which is proportional to radius squared."], [
      ['Four times as much', 'Area grows with the square of radius, so total capacitance and charge both quadruple.'],
      ['Twice as much', 'Area grows with radius squared, giving a factor of four.'],
      ['Eight times as much', 'Volume grows eightfold, but capacitance here scales with surface area.'],
    ]),
  practiceMc('permeability-shift', 'mutation', 'medium',
    'In the mixed-ion resting example, only sodium permeability increases. Which quantity changes immediately?',
    ["Identify which inputs appear in Nernst.", "GHK also uses relative permeabilities in both concentration sums."], [
      ['The GHK resting voltage', 'Sodium receives more weight in the GHK concentration sums, changing the predicted resting voltage.'],
      ['The sodium Nernst voltage', 'Sodium Nernst voltage is unchanged because its concentration ratio and temperature are fixed.'],
      ['The potassium Nernst voltage', 'The potassium concentration ratio is also unchanged.'],
    ]),
  practiceMc('reversal-ratio', 'clamp', 'medium',
    'At fixed temperature and inside sodium, the early sodium current reverses at a more positive voltage in bath A than in bath B. Which inference follows?',
    ["Treat the isolated sodium reversal as a sodium Nernst potential.", "At fixed inside concentration, a more positive sodium reversal means a larger outside-to-inside ratio."], [
      ['Bath A has more outside sodium', 'A higher sodium reversal means a larger outside-to-inside sodium ratio.'],
      ['Bath A has less outside sodium', 'Lowering outside sodium would decrease its equilibrium voltage.'],
      ['The baths have equal outside sodium', 'Equal outside concentrations at fixed inside sodium and temperature would give equal reversals.'],
    ]),
  practiceMc('late-potassium', 'action-potential', 'medium',
    'Sodium channels have inactivated and potassium conductance remains elevated after a spike. What best explains the voltage falling below its resting level?',
    ["Which channel still conducts after sodium inactivates?", "Compare potassium equilibrium with the resting voltage."], [
      ['Potassium current pulls voltage toward potassium equilibrium', 'Persistent outward potassium current pulls voltage toward potassium equilibrium, which is below rest in this example.'],
      ['Sodium current pulls voltage toward sodium equilibrium', 'Sodium is largely inactivated and its equilibrium voltage is above rest.'],
      ['The capacitor sets a new equilibrium below rest', 'Capacitance governs how fast voltage changes; the conducting pathways set the direction of change.'],
    ]),
  practiceMc('capacitive-plateau', 'circuit', 'medium',
    'At a stable voltage-clamp plateau, what happens to capacitive current?',
    ["The plateau follows the voltage transition.", "Evaluate the voltage derivative in the capacitive-current equation."], [
      ['It falls to zero at the plateau', 'At the plateau the voltage derivative is zero. Ionic currents can still flow.'],
      ['It stays at its transient peak', 'The transient comes from changing voltage. Voltage is constant at the plateau.'],
      ['It equals the net ionic current', 'At a plateau capacitive current vanishes regardless of the ionic current.'],
    ]),
  practiceMc('chloride-direction', 'conductance', 'medium',
    String.raw`A passive chloride pathway carries positive conventional current at $V_m>E_{\mathrm{Cl}}$. Which way do chloride ions move?`,
    ["Start with the direction assigned to positive current.", "Chloride has negative charge, so its movement is opposite to conventional current."], [
      ['Into the cell', 'Negative chloride moving inward creates positive outward conventional current.'],
      ['Out of the cell', 'Outward chloride movement would give negative conventional current.'],
      ['No net movement', 'With finite conductance and nonzero driving force, net chloride flux is present.'],
    ]),
  practiceMc('negative-slope', 'slope', 'medium',
    'At a voltage above reversal, outward current is positive but decreases on a small depolarizing step. What are the signs of local slope and chord to reversal?',
    ["A tangent uses only the small step around the operating point.", "For the chord, compare the sign of current with the sign of voltage minus reversal."], [
      ['Slope negative, chord positive', 'The small current change is negative, while current and driving force are both positive.'],
      ['Slope positive, chord negative', 'Current falls with voltage, and the line from reversal rises to the operating point.'],
      ['Slope positive, chord positive', 'The chord is positive, but the local current change per voltage increase is negative.'],
    ]),
  practiceMc('parallel-balance', 'parallel', 'hard',
    String.raw`Only two passive branches contribute at rest. Initially their conductances are equal, with $E_{\mathrm K}=-90\,\mathrm{mV}$ and $E_{\mathrm{Na}}=+30\,\mathrm{mV}$. Sodium conductance doubles. What is the new resting voltage and sodium current direction?`,
    ["Use weights of one for potassium and two for sodium.", "Compare the resulting weighted mean with sodium reversal to get the current sign."], [
      [String.raw`$-10\,\mathrm{mV}$, inward`, String.raw`The weighted mean is $(-90+2\times30)/3=-10\,\mathrm{mV}$. This is below sodium reversal, giving inward current.`],
      [String.raw`$-10\,\mathrm{mV}$, outward`, 'The weighted mean is right. Sodium current is negative because voltage is below its reversal.'],
      [String.raw`$-30\,\mathrm{mV}$, inward`, 'Sodium current is inward, but the voltage has moved above the original equal-weight mean.'],
    ]),
  practiceMc('calcium-activation', 'calcium', 'hard',
    String.raw`At $-20\,\mathrm{mV}$, control and nifedipine residual currents are $-180$ and $-60\,\mathrm{pA}$. At $+10\,\mathrm{mV}$, they are $-100$ and $-20\,\mathrm{pA}$. Assume selective L-type block, unchanged residual pathways and L-type reversal at $+50\,\mathrm{mV}$. Where is L-type conductance larger?`,
    ["Isolate L-type current by subtracting the nifedipine residual.", "Divide each isolated current by its own voltage minus reversal before comparing."], [
      [String.raw`At $+10\,\mathrm{mV}$`, String.raw`The isolated conductances are $(-120)/(-70)\approx1.7\,\mathrm{nS}$ and $(-80)/(-40)=2\,\mathrm{nS}$. The second has smaller current magnitude but larger conductance.`],
      [String.raw`At $-20\,\mathrm{mV}$`, 'The first step has larger isolated current magnitude but also larger driving force. Dividing gives the smaller conductance.'],
      ['Equal at the two voltages', 'After isolation, the current-to-driving-force ratios differ.'],
    ]),
);

const difficultyOrder = ['easy', 'medium', 'hard'];
content.lectureQuiz.sort((a, b) => difficultyOrder.indexOf(a.difficulty) - difficultyOrder.indexOf(b.difficulty));

content.formulaReference=equationSheet;
content.formulaReferenceNote='Official exam information p4. Full-course reference; practice on this page requires only lectures 1–2.';
const extraPracticeIds = new Set(['L02-core-charge-scale', 'L02-core-permeability-shift', 'L02-core-reversal-ratio', 'L02-core-negative-slope']);
for (const question of content.lectureQuiz) {
  if (extraPracticeIds.has(question.id)) question.practice = 'extra';
}
export default content;
