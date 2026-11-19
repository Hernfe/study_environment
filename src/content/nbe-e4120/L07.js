// Sources and corrections: docs/scope/nbe-e4120/L07.md
import { equationSheet } from './equation-sheet.js';
const content = {
  "meta": {
    "id": "L07",
    "number": 7,
    "title": "Hodgkin-Huxley: experimental currents and gating kinetics",
    "chapters": [],
    "pages": [],
    "lectureDate": "2026-10-23",
    "examDate": "2026-11-30",
    "examLabel": "Final exam"
  },
  "objectives": [
    "Separate ionic currents with clamp, reversal shifts, substitutions and blockers.",
    "Distinguish fixed-gating open-pore linearity from population nonlinearity.",
    "Use and audit HH gating probabilities, conductance products and fitted transition rates."
  ],
  "prerequisites": [
    {
      "text": "Dynamic gate balance and relaxation",
      "lectureId": "L06",
      "sectionId": "balance"
    },
    {
      "text": "Ion gradients and reversal",
      "lectureId": "L01",
      "sectionId": "nernst"
    }
  ],
  "segmentedPractice": true,
  "standardPractice": "mc-only",
  "collapseFormulaExplorers": true,
  "overview": {
    "estimate": "Core route: read the main sections and answer 24 core questions. Formula explorers, videos, extra practice and mocks are optional.",
    "equations": "Start with $I_i=g_i(V_m-E_i)$, $g_K=\\bar g_K n^4$, $g_{Na}=\\bar g_{Na}m^3h$, $y_\\infty=\\alpha/(\\alpha+\\beta)$ and $\\tau=1/(\\alpha+\\beta)$.",
    "pitfalls": "Check for capacitance at a step edge and leak on the plateau. Zero ionic current at reversal can coexist with open channels."
  },
  "sections": [
    {
      "id": "overview",
      "title": "From clamp to model",
      "keyTerms": [],
      "source": "L07 PDF 1",
      "blocks": [
        {
          "type": "text",
          "body": ["Voltage clamp separates driving force from gating. Use $V_m=V_{in}-V_{out}$ and positive outward membrane current."]
        },
        {
          "type": "detail",
          "title": "Extra detail from the slides",
          "blocks": [
            {
              "type": "figure",
              "visual": {
                "type": "widget",
                "name": "image-hotspots",
                "caption": "Lecture 7, PDF page 7. Two-electrode feedback circuit with voltage and current electrodes. Original labels, axes and scale bars retained.",
                "fallbackAlt": "Lecture 7, PDF page 7. Two-electrode feedback circuit with voltage and current electrodes. Original labels, axes and scale bars retained.",
                "props": {
                  "src": new URL('../../assets/figures/nbe-e4120/L07/clamp.webp', import.meta.url).href,
                  "alt": "Lecture 7, PDF page 7. Two-electrode feedback circuit with voltage and current electrodes. Original labels, axes and scale bars retained.",
                  "aspect": 1.5227817745803358,
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
          "id": "L07-overview-check",
          "practice": "extra",
          "prompt": "Which conductance description belongs to the HH gate model?",
          "correct": 1,
          "options": [
            {
              "text": "Only time-independent membrane conductances",
              "feedback": "Fixed conductances omit the dynamic gating that underlies excitability."
            },
            {
              "text": "Voltage- and time-dependent ionic conductances",
              "feedback": "HH conductances change with voltage and time as channel gating changes."
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
            "Voltage- and time-dependent ionic conductances."
          ]
        },
        {
          "id": "L07-overview-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L07 PDF 1",
          "prompt": "Which distinction organizes the experimental approach?",
          "options": [
            {
              "text": "Ion permeation versus channel gating",
              "feedback": "Permeation describes current through open pores; gating describes changes in the conducting fraction."
            },
            {
              "text": "Ion permeation versus channel abundance",
              "feedback": "Abundance can affect current, but the outline separates open-pore flow from gating."
            },
            {
              "text": "Channel gating versus channel abundance",
              "feedback": "The outline tests permeation separately from gating, rather than studying trafficking."
            }
          ],
          "correct": 0,
          "hints": [{ "body": "Think about ion passage through a pore that is already open." }],
          "modelAnswer": [
            "Permeation describes current through open pores; gating describes changes in the conducting fraction."
          ]
        }
      ],
      "part": {
        "id": "experiment",
        "number": 1,
        "title": "Experimental evidence and current separation"
      }
    },
    {
      "id": "recording",
      "title": "Giant axon recording",
      "keyTerms": [],
      "source": "L07 PDF 2",
      "blocks": [
        {
          "type": "text",
          "body": ["The squid giant axon can accommodate an intracellular electrode. Read the source trace against zero for overshoot, and against rest for spike amplitude. Injury near the cut end can reduce the recorded amplitude."]
        },
        {
          "type": "detail",
          "title": "Extra detail from the slides",
          "blocks": [
            {
              "type": "figure",
              "visual": {
                "type": "widget",
                "name": "image-hotspots",
                "caption": "Lecture 7, PDF page 2. Historical squid intracellular electrode and action-potential recording with the supplied scale bar. Original labels, axes and scale bars retained.",
                "fallbackAlt": "Lecture 7, PDF page 2. Historical squid intracellular electrode and action-potential recording with the supplied scale bar. Original labels, axes and scale bars retained.",
                "props": {
                  "src": new URL('../../assets/figures/nbe-e4120/L07/recording.webp', import.meta.url).href,
                  "alt": "Lecture 7, PDF page 2. Historical squid intracellular electrode and action-potential recording with the supplied scale bar. Original labels, axes and scale bars retained.",
                  "aspect": 0.5186751233262861,
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
          "id": "L07-recording-check",
          "practice": "extra",
          "prompt": "Which membrane polarity defines the overshoot in an intracellular record?",
          "correct": 0,
          "options": [
            {
              "text": "Inside becomes positive relative to outside",
              "feedback": "Overshoot means the inside briefly becomes positive relative to the outside."
            },
            {
              "text": "Inside stays negative relative to outside",
              "feedback": "Remaining negative is depolarization without overshoot."
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
            "Inside becomes positive relative to outside."
          ]
        },
        {
          "id": "L07-recording-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L07 PDF 2",
          "prompt": "What made the giant axon suitable for intracellular recording?",
          "options": [
            {
              "text": "Its large diameter ensured uniform membrane voltage",
              "feedback": "Large diameter aids access; it does not by itself guarantee spatially uniform voltage."
            },
            {
              "text": "Its large diameter allowed electrode insertion",
              "feedback": "The large axon permitted an electrode to be placed inside."
            },
            {
              "text": "Its large diameter eliminated electrode injury",
              "feedback": "A large diameter permits insertion but does not eliminate injury near the cut end."
            }
          ],
          "correct": 1,
          "hints": [{ "body": "Think about what the large diameter allows you to insert." }],
          "modelAnswer": [
            "The large axon permitted an electrode to be placed inside."
          ]
        }
      ]
    },
    {
      "id": "model",
      "title": "Test the model",
      "keyTerms": [],
      "source": "L07 PDF 3–4",
      "blocks": [
        {
          "type": "text",
          "body": ["Fit conductances from clamp currents, then test whether their combined behavior reproduces the spike. The waveform tests a prediction of the fitted model."]
        },
        {
          "type": "detail",
          "title": "Extra detail from the slides",
          "blocks": [
            {
              "type": "figure",
              "visual": {
                "type": "widget",
                "name": "image-hotspots",
                "caption": "Lecture 7, PDF page 3. Supplied HH-model waveform compared with a recorded action potential. Original labels, axes and scale bars retained.",
                "fallbackAlt": "Lecture 7, PDF page 3. Supplied HH-model waveform compared with a recorded action potential. Original labels, axes and scale bars retained.",
                "props": {
                  "src": new URL('../../assets/figures/nbe-e4120/L07/prediction.webp', import.meta.url).href,
                  "alt": "Lecture 7, PDF page 3. Supplied HH-model waveform compared with a recorded action potential. Original labels, axes and scale bars retained.",
                  "aspect": 0.8561151079136691,
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
          "id": "L07-model-check",
          "prompt": "Which experimental preparation underlies the HH conductance model?",
          "correct": 0,
          "options": [
            {
              "text": "Squid axon recordings under voltage clamp",
              "feedback": "Voltage clamp separated the time and voltage dependencies of squid ionic currents."
            },
            {
              "text": "Squid axon recordings without voltage control",
              "feedback": "Without voltage control, voltage and gating change together during the spike."
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
            "Squid axon recordings under voltage clamp."
          ]
        },
        {
          "id": "L07-model-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L07 PDF 3–4",
          "prompt": "Which result is a prediction of the HH model?",
          "options": [
            {
              "text": "The composition of a recording electrode",
              "feedback": "Electrode composition is an experimental detail, not a predicted electrical behavior."
            },
            {
              "text": "The diameter of an experimental axon",
              "feedback": "Axon geometry is a preparation property, not the predicted waveform."
            },
            {
              "text": "The waveform of an action potential",
              "feedback": "The model predicts electrical behavior, including the action-potential waveform."
            }
          ],
          "correct": 2,
          "hints": [{ "body": "Look for a prediction you can compare with a recording." }],
          "modelAnswer": [
            "The model predicts electrical behavior, including the action-potential waveform."
          ]
        }
      ]
    },
    {
      "id": "overshoot",
      "title": "What overshoot shows",
      "keyTerms": [],
      "source": "L07 PDF 5",
      "blocks": [
        {
          "type": "text",
          "body": ["The positive peak contradicts Bernstein’s prediction that excitation drives voltage only as far as zero. External sodium manipulations test whether a selective rise in sodium conductance causes the overshoot."]
        },
        {
          "type": "detail",
          "title": "Extra detail from the slides",
          "blocks": [
            {
              "type": "figure",
              "visual": {
                "type": "widget",
                "name": "image-hotspots",
                "caption": "Lecture 7, PDF page 2. Historical squid intracellular electrode and action-potential recording with the supplied scale bar. Original labels, axes and scale bars retained.",
                "fallbackAlt": "Lecture 7, PDF page 2. Historical squid intracellular electrode and action-potential recording with the supplied scale bar. Original labels, axes and scale bars retained.",
                "props": {
                  "src": new URL('../../assets/figures/nbe-e4120/L07/recording.webp', import.meta.url).href,
                  "alt": "Lecture 7, PDF page 2. Historical squid intracellular electrode and action-potential recording with the supplied scale bar. Original labels, axes and scale bars retained.",
                  "aspect": 0.5186751233262861,
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
          "id": "L07-overshoot-check",
          "prompt": "Which recorded feature rules out the historical zero-peak prediction?",
          "correct": 1,
          "options": [
            {
              "text": "The action potential returns below zero voltage",
              "feedback": "Returning below zero is compatible with both theories; the positive peak distinguishes them."
            },
            {
              "text": "The action potential crosses above zero voltage",
              "feedback": "Crossing zero contradicts a theory whose peak cannot exceed zero."
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
            "The action potential crosses above zero voltage."
          ]
        },
        {
          "id": "L07-overshoot-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L07 PDF 5",
          "prompt": "In the loss-of-selectivity theory, where should voltage approach during excitation?",
          "options": [
            {
              "text": "Toward zero membrane voltage",
              "feedback": "The historical theory predicted loss of selectivity and an approach toward zero."
            },
            {
              "text": "Toward sodium equilibrium voltage",
              "feedback": "Approach toward sodium reversal instead supports a selective sodium mechanism."
            },
            {
              "text": "Toward potassium equilibrium voltage",
              "feedback": "Potassium selectivity describes the resting premise, not its proposed loss during excitation."
            }
          ],
          "correct": 0,
          "hints": [{ "body": "Compare the peak with the outside reference voltage." }],
          "modelAnswer": [
            "The historical theory predicted loss of selectivity and an approach toward zero."
          ]
        }
      ]
    },
    {
      "id": "ions",
      "title": "Change the ion gradients",
      "keyTerms": [],
      "source": "L07 PDF 6",
      "blocks": [
        {
          "type": "text",
          "body": ["Lower external sodium shifts $E_{Na}$ downward, reducing inward driving force at the same sub-reversal voltage. The spike rises more slowly and reaches a lower peak. Lower external potassium shifts $E_K$ downward, making rest and the afterpotential more negative in the illustrated preparation. Use Nernst with inside concentration fixed to calculate each reversal shift."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 7, PDF page 6. Source sodium concentration manipulation and voltage plots. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 7, PDF page 6. Source sodium concentration manipulation and voltage plots. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L07/ions.webp', import.meta.url).href,
              "alt": "Lecture 7, PDF page 6. Source sodium concentration manipulation and voltage plots. Original labels, axes and scale bars retained.",
              "aspect": 1.1323529411764706,
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
            "caption": "Lecture 7, PDF page 6. Source potassium concentration manipulation and action-potential traces. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 7, PDF page 6. Source potassium concentration manipulation and action-potential traces. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L07/potassium.webp', import.meta.url).href,
              "alt": "Lecture 7, PDF page 6. Source potassium concentration manipulation and action-potential traces. Original labels, axes and scale bars retained.",
              "aspect": 1.6051188299817185,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L07-f-nernst-shift",
          "name": "Selective reversal shift",
          "tex": "\\Delta E=s\\log_{10}(C_{o,new}/C_{o,old})",
          "symbols": [
            {
              "tex": "\\Delta E",
              "name": "Reversal shift",
              "unit": "\\mathrm V",
              "meaning": "Reversal shift in the stated model."
            },
            {
              "tex": "s",
              "name": "Monovalent rounded shortcut",
              "unit": "\\mathrm V",
              "meaning": "Monovalent rounded shortcut in the stated model."
            },
            {
              "tex": "C_{o,new}",
              "name": "New outside concentration",
              "unit": "\\mathrm{mol/m^3}",
              "meaning": "New outside concentration in the stated model."
            },
            {
              "tex": "C_{o,old}",
              "name": "Original outside concentration",
              "unit": "\\mathrm{mol/m^3}",
              "meaning": "Original outside concentration in the stated model."
            }
          ],
          "reads": "Changing outside concentration shifts selective reversal logarithmically.",
          "assumes": "Fixed inside concentration, monovalent cation, source 20°C shortcut.",
          "variants": [],
          "drill": {
            "prompt": "Outside sodium falls from $120\\,\\mathrm{mM}$ to $60\\,\\mathrm{mM}$. Inside is fixed. Use $s=0.058\\,\\mathrm V$ to find the reversal shift.",
            "answer": {
              "value": -0.01745973974851091,
              "unit": "V",
              "tolerance": 5.2379219245532734e-05,
              "verification": {
                "relation": "nernst",
                "inputs": {
                  "shortcut": 0.058,
                  "z": 1,
                  "outside": 60,
                  "inside": 120
                },
                "displayScale": 1
              }
            },
            "tex": "\\Delta E=0.058\\log_{10}(60/120)\\,\\mathrm V",
            "modelAnswer": [
              "Changing outside concentration shifts selective reversal logarithmically."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\Delta E=s\\log_{10}(C_{o,new}/C_{o,old})$."
              },
              {
                "body": "Start with $\\Delta E=0.058\\log_{10}(60/120)\\,\\mathrm V$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{\\Delta E}}={\\htmlClass{formula-term-1}{s}}\\log_{10}({\\htmlClass{formula-term-2}{C_{o,new}}}/{\\htmlClass{formula-term-3}{C_{o,old}}})"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L07-ions-check",
          "practice": "extra",
          "prompt": "Below sodium reversal, which change weakens inward driving force at fixed voltage?",
          "correct": 1,
          "options": [
            {
              "text": "Raising outside sodium at fixed inside sodium",
              "feedback": "Raising external sodium moves reversal upward and strengthens inward drive at the same voltage."
            },
            {
              "text": "Lowering outside sodium at fixed inside sodium",
              "feedback": "Lower external sodium lowers its reversal and weakens inward drive while voltage remains below reversal."
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
            "Lowering outside sodium at fixed inside sodium."
          ]
        },
        {
          "id": "L07-ions-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L07 PDF 6",
          "prompt": "Which feature is especially sensitive to external sodium in the illustrated experiment?",
          "options": [
            {
              "text": "The trough after the action potential",
              "feedback": "The illustrated afterpotential is more sensitive to potassium than to sodium reduction."
            },
            {
              "text": "The peak of the action potential",
              "feedback": "The source sodium reduction lowers the peak and slows the rise."
            },
            {
              "text": "The baseline before the action potential",
              "feedback": "The illustrated resting baseline changes little; this is not a universal sodium-independence rule."
            }
          ],
          "correct": 1,
          "hints": [{ "body": "Use the change in external concentration in the Nernst ratio." }],
          "modelAnswer": [
            "The source sodium reduction lowers the peak and slows the rise."
          ]
        }
      ]
    },
    {
      "id": "tevc",
      "title": "Two-electrode voltage clamp",
      "keyTerms": [],
      "source": "L07 PDF 7",
      "blocks": [
        {
          "type": "relevantVideo",
          "videoId": "8NQenLqDXsU",
          "title": "Voltage Clamp Explained (Tetrodotoxin And Tetraethylammonium) | Clip",
          "topic": "Voltage-clamp feedback and separation of sodium and potassium currents",
          "channel": "Science With Tal"
        },
        {
          "type": "text",
          "body": ["One electrode senses $V_m$. Negative feedback uses a second electrode to inject current and hold $V_m$ at command. Current clamp instead sets injected current and measures the voltage response.", "At the step edge, include $I_C=C_m\\,dV_m/dt$. On a settled plateau, positive inward injection balances outward ionic current, including leak. Check the amplifier’s display polarity and correct for leak before assigning a current to an ion."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 7, PDF page 7. Two-electrode feedback circuit with voltage and current electrodes. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 7, PDF page 7. Two-electrode feedback circuit with voltage and current electrodes. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L07/clamp.webp', import.meta.url).href,
              "alt": "Lecture 7, PDF page 7. Two-electrode feedback circuit with voltage and current electrodes. Original labels, axes and scale bars retained.",
              "aspect": 1.5227817745803358,
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
          "id": "L07-tevc-check",
          "prompt": "Which pair describes the controlled and measured quantities in TEVC?",
          "correct": 1,
          "options": [
            {
              "text": "Membrane current while measuring resulting voltage",
              "feedback": "This describes current clamp, which measures voltage responses to imposed current."
            },
            {
              "text": "Membrane voltage while measuring required current",
              "feedback": "Voltage is controlled; the balancing current is measured, with transients treated separately."
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
            "Membrane voltage while measuring required current."
          ]
        },
        {
          "id": "L07-tevc-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L07 PDF 7",
          "prompt": "What does the feedback circuit continuously compare?",
          "options": [
            {
              "text": "Measured current and command voltage",
              "feedback": "Current is adjusted to correct voltage error; it is not compared directly with voltage."
            },
            {
              "text": "Measured voltage and injected current",
              "feedback": "The feedback comparison uses two voltages, not voltage and current."
            },
            {
              "text": "Measured voltage and command voltage",
              "feedback": "The voltage error determines the compensating injected current."
            }
          ],
          "correct": 2,
          "hints": [{ "body": "Trace the feedback loop from the voltage measurement to the injected current." }],
          "modelAnswer": [
            "The voltage error determines the compensating injected current."
          ]
        }
      ]
    },
    {
      "id": "components",
      "title": "Read early and late currents",
      "keyTerms": [],
      "source": "L07 PDF 8",
      "blocks": [
        {
          "type": "text",
          "body": ["On the source trace, locate the step edge first, then compare matched early and late windows across command voltages. The early sodium component is transient and can become outward above $E_{Na}$. Delayed potassium current persists and is usually outward on a depolarized plateau. Check reversal to establish ion identity."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 7, PDF page 8. Command steps and early transient/late sustained currents. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 7, PDF page 8. Command steps and early transient/late sustained currents. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L07/currents.webp', import.meta.url).href,
              "alt": "Lecture 7, PDF page 8. Command steps and early transient/late sustained currents. Original labels, axes and scale bars retained.",
              "aspect": 1.103864734299517,
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
          "id": "L07-components-check",
          "prompt": "Can a selective sodium current flow outward when the membrane voltage changes?",
          "correct": 1,
          "options": [
            {
              "text": "No, regardless of its reversal potential",
              "feedback": "Current direction depends on driving force; sodium current is not always inward."
            },
            {
              "text": "Yes, above its selective reversal potential",
              "feedback": "Above sodium reversal, positive driving force gives outward sodium current through open channels."
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
            "Yes, above its selective reversal potential."
          ]
        },
        {
          "id": "L07-components-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L07 PDF 8",
          "prompt": "Which time course describes the late potassium component in the taught clamp?",
          "options": [
            {
              "text": "Delayed activation with sustained current",
              "feedback": "The late potassium component activates slowly and remains sustained."
            },
            {
              "text": "Rapid activation with transient current",
              "feedback": "Rapid transient activation characterizes the early sodium component here."
            },
            {
              "text": "Delayed activation with transient current",
              "feedback": "The taught late component is sustained, unlike sodium inactivation."
            }
          ],
          "correct": 0,
          "hints": [{ "body": "Compare the early and late windows after the step edge." }],
          "modelAnswer": [
            "The late potassium component activates slowly and remains sustained."
          ]
        }
      ]
    },
    {
      "id": "reversal",
      "title": "Identify the reversal",
      "keyTerms": [],
      "source": "L07 PDF 9",
      "blocks": [
        {
          "type": "text",
          "body": ["Plot isolated current against test voltage and find the zero crossing. A selective current reverses at its ion’s Nernst potential. Changing that ion’s gradient should shift the crossing in the predicted direction. An open pore can carry zero net current at reversal. A zero of mixed current can reflect cancellation."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 7, PDF page 9. Command voltages and recorded currents approaching reversal. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 7, PDF page 9. Command voltages and recorded currents approaching reversal. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L07/reversal.webp', import.meta.url).href,
              "alt": "Lecture 7, PDF page 9. Command voltages and recorded currents approaching reversal. Original labels, axes and scale bars retained.",
              "aspect": 2.633093525179856,
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
          "id": "L07-reversal-check",
          "prompt": "At selective reversal, which quantity is zero despite possible channel opening?",
          "correct": 0,
          "options": [
            {
              "text": "Net current through the selective open channel",
              "feedback": "At reversal, the electrochemical driving force and net selective current vanish."
            },
            {
              "text": "The probability that the selective channel opens",
              "feedback": "Channels may remain open at reversal; zero current does not establish gate closure."
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
            "Net current through the selective open channel."
          ]
        },
        {
          "id": "L07-reversal-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L07 PDF 9",
          "prompt": "Which comparison helps identify a selective current?",
          "options": [
            {
              "text": "Its reversal and candidate activation time constants",
              "feedback": "Activation time constants describe speed, not ionic equilibrium voltage."
            },
            {
              "text": "Its reversal and candidate equilibrium potentials",
              "feedback": "A selective reversal can be compared with the Nernst potential of a candidate ion."
            },
            {
              "text": "Its peak time and candidate equilibrium potentials",
              "feedback": "Peak time measures kinetics, not the voltage at which driving force vanishes."
            }
          ],
          "correct": 1,
          "hints": [{ "body": "Look for the voltage where the isolated component changes sign." }],
          "modelAnswer": [
            "A selective reversal can be compared with the Nernst potential of a candidate ion."
          ]
        }
      ]
    },
    {
      "id": "concentration",
      "title": "Separate by reversal shift",
      "keyTerms": [],
      "source": "L07 PDF 10",
      "blocks": [
        {
          "type": "text",
          "body": ["Keep potassium and the voltage protocol fixed. Adjust external sodium until $E_{Na}=V_{test}$. With leak and transients removed, the reference is potassium. Subtract signed traces, $I_{Na}=I_{control}-I_{reference}$, assuming potassium is unchanged. Compare the traces at the same time within each step."]
        },
        {
          "type": "detail",
          "title": "Extra detail from the slides",
          "blocks": [
            {
              "type": "figure",
              "visual": {
                "type": "widget",
                "name": "image-hotspots",
                "caption": "Lecture 7, PDF page 10. Three sodium solutions, fixed test voltage, and separated currents. Original labels, axes and scale bars retained.",
                "fallbackAlt": "Lecture 7, PDF page 10. Three sodium solutions, fixed test voltage, and separated currents. Original labels, axes and scale bars retained.",
                "props": {
                  "src": new URL('../../assets/figures/nbe-e4120/L07/subtraction.webp', import.meta.url).href,
                  "alt": "Lecture 7, PDF page 10. Three sodium solutions, fixed test voltage, and separated currents. Original labels, axes and scale bars retained.",
                  "aspect": 0.5931963146704465,
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
          "id": "L07-f-subtract",
          "name": "Corrected current subtraction",
          "tex": "I_{Na}=I_{total}-I_K",
          "symbols": [
            {
              "tex": "I_{Na}",
              "name": "Sodium current",
              "unit": "\\mathrm A",
              "meaning": "Sodium current in the stated model."
            },
            {
              "tex": "I_{total}",
              "name": "Corrected total current",
              "unit": "\\mathrm A",
              "meaning": "Corrected total current in the stated model."
            },
            {
              "tex": "I_K",
              "name": "Matched potassium current",
              "unit": "\\mathrm A",
              "meaning": "Matched potassium current in the stated model."
            }
          ],
          "reads": "Subtract the matched reference component with its signed current.",
          "assumes": "Leak/capacitive terms corrected, potassium unchanged.",
          "variants": [],
          "drill": {
            "prompt": "Corrected control current is $-3\\,\\mathrm{nA}$; matched sodium-free current is $2\\,\\mathrm{nA}$. Find sodium current.",
            "answer": {
              "value": -5e-09,
              "unit": "A",
              "tolerance": 1.5e-11,
              "verification": {
                "relation": "sum",
                "inputs": {
                  "a": -3e-09,
                  "b": -2e-09
                },
                "displayScale": 1
              }
            },
            "tex": "I_{Na}=(-3-2)\\,\\mathrm{nA}",
            "modelAnswer": [
              "Subtract the matched reference component with its signed current."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $I_{Na}=I_{total}-I_K$."
              },
              {
                "body": "Start with $I_{Na}=(-3-2)\\,\\mathrm{nA}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{I_{Na}}}={\\htmlClass{formula-term-1}{I_{total}}}-{\\htmlClass{formula-term-2}{I_K}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L07-concentration-check",
          "practice": "extra",
          "prompt": "Which condition makes subtracting the reference current interpretable?",
          "correct": 0,
          "options": [
            {
              "text": "Other current components stay comparable",
              "feedback": "Subtraction isolates sodium only if the retained potassium and background components remain matched."
            },
            {
              "text": "All current components change independently",
              "feedback": "Independent changes in other components would contaminate the subtracted sodium current."
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
            "Other current components stay comparable."
          ]
        },
        {
          "id": "L07-concentration-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L07 PDF 10",
          "prompt": "What is deliberately held constant across the sodium-concentration solutions?",
          "options": [
            {
              "text": "The external sodium concentration",
              "feedback": "Sodium concentration is deliberately varied to shift its reversal."
            },
            {
              "text": "The sodium equilibrium potential",
              "feedback": "Sodium reversal shifts with the changed sodium concentration."
            },
            {
              "text": "The external potassium concentration",
              "feedback": "Keeping potassium conditions matched supports subtraction of its unchanged component."
            }
          ],
          "correct": 2,
          "hints": [{ "body": "Set the sodium driving force to zero in the reference trial." }],
          "modelAnswer": [
            "Keeping potassium conditions matched supports subtraction of its unchanged component."
          ]
        }
      ]
    },
    {
      "id": "substitution",
      "title": "Separate by ion substitution",
      "keyTerms": [],
      "source": "L07 PDF 11",
      "blocks": [
        {
          "type": "text",
          "body": ["Replace external sodium with impermeant choline. The residual after background correction estimates potassium if substitution leaves it unchanged. Control minus residual isolates the rapidly activating and inactivating sodium current."]
        },
        {
          "type": "detail",
          "title": "Extra detail from the slides",
          "blocks": [
            {
              "type": "figure",
              "visual": {
                "type": "widget",
                "name": "image-hotspots",
                "caption": "Lecture 7, PDF page 11. Normal and sodium-free traces with their difference. Original labels, axes and scale bars retained.",
                "fallbackAlt": "Lecture 7, PDF page 11. Normal and sodium-free traces with their difference. Original labels, axes and scale bars retained.",
                "props": {
                  "src": new URL('../../assets/figures/nbe-e4120/L07/choline.webp', import.meta.url).href,
                  "alt": "Lecture 7, PDF page 11. Normal and sodium-free traces with their difference. Original labels, axes and scale bars retained.",
                  "aspect": 0.6666666666666666,
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
          "id": "L07-substitution-check",
          "prompt": "Which signed difference gives sodium current in the choline protocol?",
          "correct": 1,
          "options": [
            {
              "text": "Sodium-free current minus normal current",
              "feedback": "Reversing the subtraction reverses the inferred sodium-current sign."
            },
            {
              "text": "Normal current minus sodium-free current",
              "feedback": "Normal minus sodium-free current removes the matched non-sodium component while preserving sodium sign."
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
            "Normal current minus sodium-free current."
          ]
        },
        {
          "id": "L07-substitution-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L07 PDF 11",
          "prompt": "Why is choline used in the substitution experiment?",
          "options": [
            {
              "text": "It replaces sodium without passing its channels",
              "feedback": "Choline replaces external sodium but does not carry current through sodium channels."
            },
            {
              "text": "It replaces potassium without passing its channels",
              "feedback": "This protocol changes external sodium, not potassium."
            },
            {
              "text": "It replaces sodium while carrying its channel current",
              "feedback": "If the replacement carried the same current, it would not remove the sodium component."
            }
          ],
          "correct": 0,
          "hints": [{ "body": "Ask whether the replacement ion can pass through the sodium pore." }],
          "modelAnswer": [
            "Choline replaces external sodium but does not carry current through sodium channels."
          ]
        }
      ]
    },
    {
      "id": "blockers",
      "title": "Separate by selective block",
      "keyTerms": [],
      "source": "L07 PDF 12",
      "blocks": [
        {
          "type": "text",
          "body": ["TTX blocks the sodium component and TEA blocks the potassium component in the illustrated protocol. Match voltage history and compare residual kinetics and reversal after accounting for capacitance, leak and incomplete block."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 7, PDF page 12. Control, TTX and TEA source recordings. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 7, PDF page 12. Control, TTX and TEA source recordings. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L07/blockers.webp', import.meta.url).href,
              "alt": "Lecture 7, PDF page 12. Control, TTX and TEA source recordings. Original labels, axes and scale bars retained.",
              "aspect": 0.8648874061718098,
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
          "id": "L07-blockers-check",
          "prompt": "After TTX and background correction, which ionic current remains?",
          "correct": 1,
          "options": [
            {
              "text": "Sodium current after background correction",
              "feedback": "Sodium is the blocked component; it is not the retained current."
            },
            {
              "text": "Potassium current after background correction",
              "feedback": "TTX removes sodium in this preparation, leaving potassium after background correction."
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
            "Potassium current after background correction."
          ]
        },
        {
          "id": "L07-blockers-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L07 PDF 12",
          "prompt": "Which component remains with selective TEA after background correction?",
          "options": [
            {
              "text": "The capacitive component of membrane current",
              "feedback": "Capacitance is a transient to resolve or correct, not the retained ionic component."
            },
            {
              "text": "The sodium component of membrane current",
              "feedback": "TEA blocks the taught potassium component, leaving sodium."
            },
            {
              "text": "The potassium component of membrane current",
              "feedback": "Potassium is the blocked component in the taught TEA protocol."
            }
          ],
          "correct": 1,
          "hints": [{ "body": "Read what remains after the blocker removes its target current." }],
          "modelAnswer": [
            "TEA blocks the taught potassium component, leaving sodium."
          ]
        }
      ]
    },
    {
      "id": "instant-protocol",
      "title": "Hold gating fixed briefly",
      "keyTerms": [],
      "source": "L07 PDF 13",
      "blocks": [
        {
          "type": "text",
          "body": ["Use the same conditioning step to prepare the same gating state. Jump to different test voltages, then measure after capacitive contamination can be resolved and before gating changes appreciably. This isolates the effect of driving force."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 7, PDF page 14. Two-step protocol, initial and test voltages, with short sampling interval. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 7, PDF page 14. Two-step protocol, initial and test voltages, with short sampling interval. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L07/protocol.webp', import.meta.url).href,
              "alt": "Lecture 7, PDF page 14. Two-step protocol, initial and test voltages, with short sampling interval. Original labels, axes and scale bars retained.",
              "aspect": 0.8320209973753281,
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
          "id": "L07-instant-protocol-check",
          "prompt": "During an instantaneous comparison, which property should be unchanged?",
          "correct": 0,
          "options": [
            {
              "text": "The gating state during the rapid comparison",
              "feedback": "The rapid comparison samples the same gating state before it can appreciably relax."
            },
            {
              "text": "The driving force during the voltage change",
              "feedback": "The voltage step deliberately changes driving force; gating is the approximately fixed quantity."
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
            "The gating state during the rapid comparison."
          ]
        },
        {
          "id": "L07-instant-protocol-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L07 PDF 13",
          "prompt": "When is the second-step ionic current sampled?",
          "options": [
            {
              "text": "After gating reaches steady state, after resolving capacitance",
              "feedback": "Waiting for steady gating defeats the fixed-state comparison."
            },
            {
              "text": "Before resolving capacitance, after gating reaches steady state",
              "feedback": "Unresolved capacitance contaminates the ionic current measurement."
            },
            {
              "text": "Before appreciable gating change, after resolving capacitance",
              "feedback": "The useful interval excludes capacitance while keeping gating approximately fixed."
            }
          ],
          "correct": 2,
          "hints": [{ "body": "Keep the conditioning step identical across test voltages." }],
          "modelAnswer": [
            "The useful interval excludes capacitance while keeping gating approximately fixed."
          ]
        }
      ],
      "part": {
        "id": "ohmic",
        "number": 2,
        "title": "Instantaneous open-pore relations"
      }
    },
    {
      "id": "instant-law",
      "title": "Find fixed-gating conductance",
      "keyTerms": [],
      "source": "L07 PDF 14",
      "blocks": [
        {
          "type": "text",
          "body": ["With a common reversal and unchanged gating, subtract the two ionic currents to obtain $\\Delta I=g\\Delta V$. Use signed differences in the same order and a nonzero $\\Delta V$. Current can jump with voltage even though gate probabilities are continuous."]
        },
        {
          "type": "detail",
          "title": "Extra detail from the slides",
          "blocks": [
            {
              "type": "figure",
              "visual": {
                "type": "widget",
                "name": "image-hotspots",
                "caption": "Lecture 7, PDF page 14. Two-step protocol, initial and test voltages, with short sampling interval. Original labels, axes and scale bars retained.",
                "fallbackAlt": "Lecture 7, PDF page 14. Two-step protocol, initial and test voltages, with short sampling interval. Original labels, axes and scale bars retained.",
                "props": {
                  "src": new URL('../../assets/figures/nbe-e4120/L07/protocol.webp', import.meta.url).href,
                  "alt": "Lecture 7, PDF page 14. Two-step protocol, initial and test voltages, with short sampling interval. Original labels, axes and scale bars retained.",
                  "aspect": 0.8320209973753281,
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
          "id": "L07-f-delta-current",
          "name": "Fixed-gating current jump",
          "tex": "\\Delta I=g\\Delta V",
          "symbols": [
            {
              "tex": "\\Delta I",
              "name": "Instantaneous current change",
              "unit": "\\mathrm A",
              "meaning": "Instantaneous current change in the stated model."
            },
            {
              "tex": "g",
              "name": "Fixed conductance",
              "unit": "\\mathrm S",
              "meaning": "Fixed conductance in the stated model."
            },
            {
              "tex": "\\Delta V",
              "name": "Test voltage change",
              "unit": "\\mathrm V",
              "meaning": "Test voltage change in the stated model."
            }
          ],
          "reads": "Current changes immediately with driving force at fixed gating.",
          "assumes": "Gating unchanged over resolved sampling interval.",
          "variants": [],
          "drill": {
            "prompt": "A fixed $20\\,\\mathrm{nS}$ conductance sees a $15\\,\\mathrm{mV}$ positive jump. Find the signed current change.",
            "answer": {
              "value": 3e-10,
              "unit": "A",
              "tolerance": 9e-13,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 2e-08,
                  "b": 0.015
                },
                "displayScale": 1
              }
            },
            "tex": "\\Delta I=(20\\times10^{-9})(0.015)\\,\\mathrm A",
            "modelAnswer": [
              "Current changes immediately with driving force at fixed gating."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\Delta I=g\\Delta V$."
              },
              {
                "body": "Start with $\\Delta I=(20\\times10^{-9})(0.015)\\,\\mathrm A$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{\\Delta I}}={\\htmlClass{formula-term-1}{g}}{\\htmlClass{formula-term-2}{\\Delta V}}"
        },
        {
          "id": "L07-f-slope",
          "name": "Instantaneous slope conductance",
          "tex": "g=\\Delta I/\\Delta V",
          "symbols": [
            {
              "tex": "g",
              "name": "Instantaneous conductance",
              "unit": "\\mathrm S",
              "meaning": "Instantaneous conductance in the stated model."
            },
            {
              "tex": "\\Delta I",
              "name": "Current change",
              "unit": "\\mathrm A",
              "meaning": "Current change in the stated model."
            },
            {
              "tex": "\\Delta V",
              "name": "Voltage change",
              "unit": "\\mathrm V",
              "meaning": "Voltage change in the stated model."
            }
          ],
          "reads": "At fixed gating the slope is conductance.",
          "assumes": "Nonzero voltage jump; exclude capacitive current.",
          "variants": [],
          "drill": {
            "prompt": "An instantaneous current increases by $0.6\\,\\mathrm{nA}$ after a $20\\,\\mathrm{mV}$ increase. Find conductance.",
            "answer": {
              "value": 3e-08,
              "unit": "S",
              "tolerance": 9e-11,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 6e-10,
                  "b": 0.02
                },
                "displayScale": 1
              }
            },
            "tex": "g=(0.6\\times10^{-9})/0.020\\,\\mathrm S",
            "modelAnswer": [
              "At fixed gating the slope is conductance."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $g=\\Delta I/\\Delta V$."
              },
              {
                "body": "Start with $g=(0.6\\times10^{-9})/0.020\\,\\mathrm S$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{g}}={\\htmlClass{formula-term-1}{\\Delta I}}/{\\htmlClass{formula-term-2}{\\Delta V}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L07-instant-law-check",
          "prompt": "Which conductance is represented by the instantaneous line slope?",
          "correct": 0,
          "options": [
            {
              "text": "Conductance at the fixed gating state",
              "feedback": "The line slope measures conductance for the gating state prepared by the conditioning step."
            },
            {
              "text": "Conductance after every gate equilibrates",
              "feedback": "Equilibrating at each test voltage would mix different gating states into the curve."
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
            "Conductance at the fixed gating state."
          ]
        },
        {
          "id": "L07-instant-law-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L07 PDF 14",
          "prompt": "Which quantity cancels in the fixed-gating current difference?",
          "options": [
            {
              "text": "The shared ionic reversal potential",
              "feedback": "Subtracting two currents with the same conductance and reversal removes the reversal term."
            },
            {
              "text": "The imposed change in membrane voltage",
              "feedback": "The voltage difference remains and sets the current jump."
            },
            {
              "text": "The shared open-channel conductance",
              "feedback": "Conductance remains as the proportionality factor between the two differences."
            }
          ],
          "correct": 0,
          "hints": [{ "body": "Subtract the two currents while conductance is held fixed." }],
          "modelAnswer": [
            "Subtracting two currents with the same conductance and reversal removes the reversal term."
          ]
        }
      ]
    },
    {
      "id": "sodium-iv",
      "title": "Compare sodium I–V curves",
      "keyTerms": [],
      "source": "L07 PDF 15–16",
      "blocks": [
        {
          "type": "text",
          "body": ["The curved peak relation varies both the conditioning voltage and the resulting gate occupancy. The instantaneous line holds gate occupancy fixed. On the plot, find the conditioning voltage, where there is no second step, and $E_{Na}$, where driving force vanishes. The curves intersect at both."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 7, PDF page 15. Peak sodium relation and instantaneous linear test-current relation. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 7, PDF page 15. Peak sodium relation and instantaneous linear test-current relation. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L07/sodium.webp', import.meta.url).href,
              "alt": "Lecture 7, PDF page 15. Peak sodium relation and instantaneous linear test-current relation. Original labels, axes and scale bars retained.",
              "aspect": 0.6531204644412192,
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
          "id": "L07-sodium-iv-check",
          "prompt": "Which gating explanation accounts for a curved sodium peak-current relation?",
          "correct": 1,
          "options": [
            {
              "text": "Every open pore must have nonlinear permeation",
              "feedback": "A nonlinear peak curve does not require nonlinear open-pore flow; the instantaneous line can be straight."
            },
            {
              "text": "Different voltages recruit different gating states",
              "feedback": "Peak measurements at different voltages have different activation states and driving forces."
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
            "Different voltages recruit different gating states."
          ]
        },
        {
          "id": "L07-sodium-iv-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L07 PDF 15–16",
          "prompt": "What is kept the same within one instantaneous sodium line?",
          "options": [
            {
              "text": "The final steady activation at every measurement",
              "feedback": "The protocol samples before gating equilibrates at each new voltage."
            },
            {
              "text": "The preceding conditioning voltage and duration",
              "feedback": "Matched conditioning prepares the same gating state before different rapid test voltages."
            },
            {
              "text": "The final test voltage at every measurement",
              "feedback": "Test voltage must vary to trace a current–voltage line."
            }
          ],
          "correct": 1,
          "hints": [{ "body": "Ask whether the trials begin the test step with the same gate occupancy." }],
          "modelAnswer": [
            "Matched conditioning prepares the same gating state before different rapid test voltages."
          ]
        }
      ]
    },
    {
      "id": "potassium-iv",
      "title": "Test the potassium pore",
      "keyTerms": [],
      "source": "L07 PDF 17",
      "blocks": [
        {
          "type": "text",
          "body": ["The same two-step test gives a straight instantaneous potassium I–V relation through $E_K$. Its slope is specific to the prepared gating state. A different conditioning step can change that slope."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 7, PDF page 17. Potassium clamp protocol, currents and instantaneous relation. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 7, PDF page 17. Potassium clamp protocol, currents and instantaneous relation. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L07/k-instant.webp', import.meta.url).href,
              "alt": "Lecture 7, PDF page 17. Potassium clamp protocol, currents and instantaneous relation. Original labels, axes and scale bars retained.",
              "aspect": 2.534181240063593,
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
          "id": "L07-potassium-iv-check",
          "prompt": "Which proportionality describes a straight potassium instantaneous relation?",
          "correct": 0,
          "options": [
            {
              "text": "Current proportional to fixed-gating driving force",
              "feedback": "At fixed gating, open-potassium current is proportional to its driving force."
            },
            {
              "text": "Current independent of fixed-gating driving force",
              "feedback": "A straight line with nonzero slope means current changes with driving force."
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
            "Current proportional to fixed-gating driving force."
          ]
        },
        {
          "id": "L07-potassium-iv-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L07 PDF 17",
          "prompt": "Where does an open-potassium current line cross zero current?",
          "options": [
            {
              "text": "At the conditioning membrane potential",
              "feedback": "The conditioning voltage sets gating; it need not produce zero current."
            },
            {
              "text": "At the sodium equilibrium potential",
              "feedback": "Sodium reversal does not set zero current through a potassium-selective pore."
            },
            {
              "text": "At the potassium equilibrium potential",
              "feedback": "For a selective potassium component, zero driving force occurs at potassium reversal."
            }
          ],
          "correct": 2,
          "hints": [{ "body": "Find the voltage where the isolated instantaneous current changes sign." }],
          "modelAnswer": [
            "For a selective potassium component, zero driving force occurs at potassium reversal."
          ]
        }
      ]
    },
    {
      "id": "conductance",
      "title": "Convert current to conductance",
      "keyTerms": [],
      "source": "L07 PDF 18",
      "blocks": [
        {
          "type": "text",
          "body": ["Use $g_i=I_i/(V_m-E_i)$ for an isolated Ohmic component away from its reversal. Use consistent units for current and conductance, including when both are expressed per area. An inward current divided by its negative driving force gives positive conductance. At reversal use a fixed-gating slope across distinct voltages."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 7, PDF page 18. Separated currents and corresponding sodium and potassium conductances. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 7, PDF page 18. Separated currents and corresponding sodium and potassium conductances. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L07/conductances.webp', import.meta.url).href,
              "alt": "Lecture 7, PDF page 18. Separated currents and corresponding sodium and potassium conductances. Original labels, axes and scale bars retained.",
              "aspect": 2.0032626427406197,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L07-f-chord",
          "name": "Component conductance",
          "tex": "g=I/(V_m-E)",
          "symbols": [
            {
              "tex": "g",
              "name": "Ionic conductance",
              "unit": "\\mathrm S",
              "meaning": "Ionic conductance in the stated model."
            },
            {
              "tex": "I",
              "name": "Separated ionic current",
              "unit": "\\mathrm A",
              "meaning": "Separated ionic current in the stated model."
            },
            {
              "tex": "V_m",
              "name": "Absolute membrane voltage",
              "unit": "\\mathrm V",
              "meaning": "Absolute membrane voltage in the stated model."
            },
            {
              "tex": "E",
              "name": "Ionic reversal",
              "unit": "\\mathrm V",
              "meaning": "Ionic reversal in the stated model."
            }
          ],
          "reads": "Divide signed current by its signed driving force.",
          "assumes": "Ohmic component, nonzero driving force.",
          "variants": [],
          "drill": {
            "prompt": "A corrected sodium current is $-2\\,\\mathrm{nA}$ at $V_m=-20\\,\\mathrm{mV}$ with $E=60\\,\\mathrm{mV}$. Find conductance.",
            "answer": {
              "value": 2.5e-08,
              "unit": "S",
              "tolerance": 7.5e-11,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": -2e-09,
                  "b": -0.08
                },
                "displayScale": 1
              }
            },
            "tex": "g=(-2\\times10^{-9})/(-0.080)\\,\\mathrm S",
            "modelAnswer": [
              "Divide signed current by its signed driving force."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $g=I/(V_m-E)$."
              },
              {
                "body": "Start with $g=(-2\\times10^{-9})/(-0.080)\\,\\mathrm S$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{g}}={\\htmlClass{formula-term-1}{I}}/({\\htmlClass{formula-term-2}{V_m}}-{\\htmlClass{formula-term-3}{E}})"
        },
        {
          "id": "L07-f-ohmic",
          "name": "Separated ionic current",
          "tex": "I=g(V_m-E)",
          "symbols": [
            {
              "tex": "I",
              "name": "Outward-positive current",
              "unit": "\\mathrm A",
              "meaning": "Outward-positive current in the stated model."
            },
            {
              "tex": "g",
              "name": "Conductance",
              "unit": "\\mathrm S",
              "meaning": "Conductance in the stated model."
            },
            {
              "tex": "V_m",
              "name": "Membrane voltage",
              "unit": "\\mathrm V",
              "meaning": "Membrane voltage in the stated model."
            },
            {
              "tex": "E",
              "name": "Reversal",
              "unit": "\\mathrm V",
              "meaning": "Reversal in the stated model."
            }
          ],
          "reads": "Conductance is nonnegative; driving force sets current sign.",
          "assumes": "Ohmic separated component.",
          "variants": [],
          "drill": {
            "prompt": "Potassium conductance is $10\\,\\mathrm{nS}$ and driving force is $40\\,\\mathrm{mV}$. Find current.",
            "answer": {
              "value": 4e-10,
              "unit": "A",
              "tolerance": 1.2000000000000001e-12,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 1e-08,
                  "b": 0.04
                },
                "displayScale": 1
              }
            },
            "tex": "I=(10\\times10^{-9})(0.040)\\,\\mathrm A",
            "modelAnswer": [
              "Conductance is nonnegative; driving force sets current sign."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $I=g(V_m-E)$."
              },
              {
                "body": "Start with $I=(10\\times10^{-9})(0.040)\\,\\mathrm A$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{I}}={\\htmlClass{formula-term-1}{g}}({\\htmlClass{formula-term-2}{V_m}}-{\\htmlClass{formula-term-3}{E}})"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L07-conductance-check",
          "practice": "extra",
          "prompt": "Can a zero-current measurement at reversal alone establish zero conductance?",
          "correct": 0,
          "options": [
            {
              "text": "No, a nonzero driving-force measurement is needed",
              "feedback": "At reversal, zero net current can coexist with open channels; use a nonzero driving force to infer conductance."
            },
            {
              "text": "Yes, zero current always means zero conductance",
              "feedback": "Zero current can reflect zero driving force rather than zero conductance."
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
            "No, a nonzero driving-force measurement is needed."
          ]
        },
        {
          "id": "L07-conductance-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L07 PDF 18",
          "prompt": "Which data point cannot determine conductance by direct current division?",
          "options": [
            {
              "text": "A measurement exactly at ionic reversal",
              "feedback": "At reversal, both net current and driving force are zero, so direct division is undefined."
            },
            {
              "text": "A measurement above the ionic reversal",
              "feedback": "Above reversal a nonzero driving force permits division after component separation."
            },
            {
              "text": "A measurement below the ionic reversal",
              "feedback": "Below reversal current and driving force can both be negative while conductance is positive."
            }
          ],
          "correct": 0,
          "hints": [{ "body": "Use the driving force of the same ion as the isolated current." }],
          "modelAnswer": [
            "At reversal, both net current and driving force are zero, so direct division is undefined."
          ]
        }
      ]
    },
    {
      "id": "sensors",
      "title": "Voltage sensors and gates",
      "keyTerms": [],
      "source": "L07 PDF 19",
      "blocks": [
        {
          "type": "text",
          "body": ["Charged parts of the channel protein respond to the membrane field and change pore access. HH models the resulting kinetics with voltage-dependent transition rates."]
        },
        {
          "type": "detail",
          "title": "Extra detail from the slides",
          "blocks": [
            {
              "type": "figure",
              "visual": {
                "type": "widget",
                "name": "image-hotspots",
                "caption": "Lecture 7, PDF page 19. Labeled channel protein, voltage sensor and aqueous pore. Original labels, axes and scale bars retained.",
                "fallbackAlt": "Lecture 7, PDF page 19. Labeled channel protein, voltage sensor and aqueous pore. Original labels, axes and scale bars retained.",
                "props": {
                  "src": new URL('../../assets/figures/nbe-e4120/L07/sensor.webp', import.meta.url).href,
                  "alt": "Lecture 7, PDF page 19. Labeled channel protein, voltage sensor and aqueous pore. Original labels, axes and scale bars retained.",
                  "aspect": 1.0535211267605633,
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
          "id": "L07-sensors-check",
          "practice": "extra",
          "prompt": "Which mechanism links membrane voltage to channel conformation?",
          "correct": 0,
          "options": [
            {
              "text": "The electric field across the membrane",
              "feedback": "The membrane electric field acts on charged protein sensor regions."
            },
            {
              "text": "The concentration gradient through the pore",
              "feedback": "The concentration gradient drives permeation; the electric field acts on the charged protein sensor."
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
            "The electric field across the membrane."
          ]
        },
        {
          "id": "L07-sensors-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L07 PDF 19",
          "prompt": "What is a molecular voltage sensor in this lecture?",
          "options": [
            {
              "text": "An electrode monitoring membrane voltage",
              "feedback": "An electrode measures voltage externally to the gating mechanism."
            },
            {
              "text": "A charged region of channel protein",
              "feedback": "Charged protein regions move in the membrane field and influence channel conformation."
            },
            {
              "text": "A dissolved ion crossing the channel pore",
              "feedback": "Permeating ions carry ionic current; they are not the channel protein sensor."
            }
          ],
          "correct": 1,
          "hints": [{ "body": "Look for the part of the channel protein that responds to the field." }],
          "modelAnswer": [
            "Charged protein regions move in the membrane field and influence channel conformation."
          ]
        }
      ],
      "part": {
        "id": "gating",
        "number": 3,
        "title": "Gating variables, conductance and rates"
      }
    },
    {
      "id": "gates",
      "title": "What n, m and h measure",
      "keyTerms": [],
      "source": "L07 PDF 20",
      "blocks": [
        {
          "type": "relevantVideo",
          "videoId": "no_1cElnSIQ",
          "title": "Hodgkin-Huxley Model of Voltage-Gated Channels Explained (Gating Variables n, m, h)",
          "topic": "Potassium activation, sodium activation and sodium availability in the Hodgkin–Huxley model.",
          "channel": "Science With Tal"
        },
        {
          "type": "text",
          "body": ["$n$ is potassium activation, $m$ is sodium activation and $h$ is sodium availability. Each is a permissive probability between zero and one. Depolarization shifts steady occupancy toward greater activation and lower availability. A smaller $h$ means more inactivation."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 7, PDF page 20. Schematic potassium activation with permissive and nonpermissive states. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 7, PDF page 20. Schematic potassium activation with permissive and nonpermissive states. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L07/gates.webp', import.meta.url).href,
              "alt": "Lecture 7, PDF page 20. Schematic potassium activation with permissive and nonpermissive states. Original labels, axes and scale bars retained.",
              "aspect": 1.0346420323325636,
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
          "id": "L07-gates-check",
          "prompt": "Which variable describes permissive sodium inactivation gating?",
          "correct": 1,
          "options": [
            {
              "text": "$n$, the permissive potassium probability",
              "feedback": "The variable $n$ describes potassium activation, not sodium availability."
            },
            {
              "text": "$h$, the permissive inactivation probability",
              "feedback": "The permissive sodium inactivation variable is $h$; larger values mean greater availability."
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
            "$h$, the permissive inactivation probability."
          ]
        },
        {
          "id": "L07-gates-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L07 PDF 20",
          "prompt": "What does a single gating variable represent?",
          "options": [
            {
              "text": "Probability of a permeating ion species",
              "feedback": "Ion species determines selectivity; a gating variable describes a channel state."
            },
            {
              "text": "Fraction of the maximal ionic driving force",
              "feedback": "Driving force is a voltage difference, separate from gating probability."
            },
            {
              "text": "Probability of a permissive particle state",
              "feedback": "The variables describe permissive-state probabilities, not ion identity or driving force."
            }
          ],
          "correct": 2,
          "hints": [{ "body": "Separate activation from the availability to activate." }],
          "modelAnswer": [
            "The variables describe permissive-state probabilities, not ion identity or driving force."
          ]
        }
      ]
    },
    {
      "id": "states",
      "title": "Closed, open and inactivated",
      "keyTerms": [],
      "source": "L07 PDF 21",
      "blocks": [
        {
          "type": "text",
          "body": ["Closed channels can activate. Open channels conduct when there is driving force. Inactivated channels must recover availability before they can open again. Repolarization can simultaneously deactivate activation gates and restore sodium availability."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 7, PDF page 21. Closed, open and inactivated channel state diagram. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 7, PDF page 21. Closed, open and inactivated channel state diagram. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L07/states.webp', import.meta.url).href,
              "alt": "Lecture 7, PDF page 21. Closed, open and inactivated channel state diagram. Original labels, axes and scale bars retained.",
              "aspect": 1.2142152023692003,
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
          "id": "L07-states-check",
          "prompt": "Which named state is nonconducting and temporarily unavailable?",
          "correct": 1,
          "options": [
            {
              "text": "The closed but available channel state",
              "feedback": "A closed channel is nonconducting but remains available for activation."
            },
            {
              "text": "The inactivated nonconducting state",
              "feedback": "Inactivation makes the channel temporarily unavailable for activation."
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
            "The inactivated nonconducting state."
          ]
        },
        {
          "id": "L07-states-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L07 PDF 21",
          "prompt": "Which transition is called deactivation?",
          "options": [
            {
              "text": "Open to closed but still available",
              "feedback": "Deactivation closes an activated channel without the defining unavailability of inactivation."
            },
            {
              "text": "Open to inactivated and unavailable",
              "feedback": "This is inactivation, which reduces availability."
            },
            {
              "text": "Inactivated to closed and available",
              "feedback": "This is recovery from inactivation, restoring availability."
            }
          ],
          "correct": 0,
          "hints": [{ "body": "Ask whether a test pulse can open the channel immediately." }],
          "modelAnswer": [
            "Deactivation closes an activated channel without the defining unavailability of inactivation."
          ]
        }
      ]
    },
    {
      "id": "inactivation",
      "title": "Measure inactivation",
      "keyTerms": [],
      "source": "L07 PDF 22",
      "blocks": [
        {
          "type": "text",
          "body": ["Vary depolarizing prepulse duration and compare the corrected sodium response at a fixed test voltage. Once activation during the prepulse is established, a longer prepulse can yield a smaller inward test current because fewer channels remain available at the same driving force."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 7, PDF page 22. Depolarizing prepulses of differing duration and test sodium currents. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 7, PDF page 22. Depolarizing prepulses of differing duration and test sodium currents. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L07/inactivation.webp', import.meta.url).href,
              "alt": "Lecture 7, PDF page 22. Depolarizing prepulses of differing duration and test sodium currents. Original labels, axes and scale bars retained.",
              "aspect": 1.789537712895377,
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
          "id": "L07-inactivation-check",
          "practice": "extra",
          "prompt": "Which sodium property does the duration-dependent prepulse test probe?",
          "correct": 0,
          "options": [
            {
              "text": "Sodium availability during the later test pulse",
              "feedback": "Longer prepulses reduce the available sodium fraction, reducing current in the same test pulse."
            },
            {
              "text": "Sodium reversal during the later test pulse",
              "feedback": "The fixed-solution duration comparison tests availability, not a shift of sodium reversal."
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
            "Sodium availability during the later test pulse."
          ]
        },
        {
          "id": "L07-inactivation-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L07 PDF 22",
          "prompt": "What changes in the taught prepulse experiment?",
          "options": [
            {
              "text": "Sodium concentration before an unchanged test pulse",
              "feedback": "The taught comparison varies time, not external sodium concentration."
            },
            {
              "text": "Prepulse duration before an unchanged test pulse",
              "feedback": "Duration is varied while the test pulse is held fixed to probe developing inactivation."
            },
            {
              "text": "Test voltage after an unchanged prepulse duration",
              "feedback": "Changing test voltage also changes driving force and activation, confounding this comparison."
            }
          ],
          "correct": 1,
          "hints": [{ "body": "Compare test pulses at identical voltage after different prepulses." }],
          "modelAnswer": [
            "Duration is varied while the test pulse is held fixed to probe developing inactivation."
          ]
        }
      ]
    },
    {
      "id": "products",
      "title": "From gate probability to conductance",
      "keyTerms": [],
      "source": "L07 PDF 23",
      "blocks": [
        {
          "type": "text",
          "body": ["For independent required particles, multiply permissive probabilities. Use $g_K=\\bar g_K n^4$ and $g_{Na}=\\bar g_{Na}m^3h$. The barred terms are maximum conductances. Multiply the resulting conductance by the ion’s signed driving force to get its current."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 7, PDF page 23. Source comparison of particle powers and conductance time courses. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 7, PDF page 23. Source comparison of particle powers and conductance time courses. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L07/powers.webp', import.meta.url).href,
              "alt": "Lecture 7, PDF page 23. Source comparison of particle powers and conductance time courses. Original labels, axes and scale bars retained.",
              "aspect": 0.6194029850746269,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L07-f-particle-power",
          "name": "All-required identical particles",
          "tex": "Y=y^P",
          "symbols": [
            {
              "tex": "Y",
              "name": "Open fraction",
              "unit": "1",
              "meaning": "Open fraction in the stated model."
            },
            {
              "tex": "y",
              "name": "Permissive particle probability",
              "unit": "1",
              "meaning": "Permissive particle probability in the stated model."
            },
            {
              "tex": "P",
              "name": "Required particle count",
              "unit": "1",
              "meaning": "Required particle count in the stated model."
            }
          ],
          "reads": "All-required independent particle probabilities multiply.",
          "assumes": "Identical independent particles.",
          "variants": [],
          "drill": {
            "prompt": "Four independent required particles each have probability $0.6$. Find the channel open fraction.",
            "answer": {
              "value": 0.1296,
              "unit": "",
              "tolerance": 0.00038879999999999996,
              "verification": {
                "relation": "gatePower",
                "inputs": {
                  "y": 0.6,
                  "count": 4
                },
                "displayScale": 1
              }
            },
            "tex": "Y=0.6^4",
            "modelAnswer": [
              "All-required independent particle probabilities multiply."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $Y=y^P$."
              },
              {
                "body": "Start with $Y=0.6^4$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{Y}}={\\htmlClass{formula-term-1}{y}}^{\\htmlClass{formula-term-2}{P}}"
        },
        {
          "id": "L07-f-gk",
          "name": "Potassium conductance",
          "tex": "g_K=\\bar g_K n^4",
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
              "name": "Activation probability",
              "unit": "1",
              "meaning": "Activation probability in the stated model."
            }
          ],
          "reads": "Four activation factors scale maximum potassium conductance.",
          "assumes": "HH potassium fit.",
          "variants": [],
          "drill": {
            "prompt": "With $\\bar g_K=40\\,\\mathrm{nS}$ and $n=0.5$, find potassium conductance.",
            "answer": {
              "value": 2.5e-09,
              "unit": "S",
              "tolerance": 7.5e-12,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 4e-08,
                  "b": 0.0625
                },
                "displayScale": 1
              }
            },
            "tex": "g_K=(40\\times10^{-9})(0.5)^4\\,\\mathrm S",
            "modelAnswer": [
              "Four activation factors scale maximum potassium conductance."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $g_K=\\bar g_K n^4$."
              },
              {
                "body": "Start with $g_K=(40\\times10^{-9})(0.5)^4\\,\\mathrm S$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{g_K}}={\\htmlClass{formula-term-1}{\\bar g_K}} {\\htmlClass{formula-term-2}{n}}^4"
        },
        {
          "id": "L07-f-sodium-product",
          "name": "Sodium channel open probability",
          "tex": "Y_{Na}=m^3h",
          "symbols": [
            {
              "tex": "Y_{Na}",
              "name": "Sodium open fraction",
              "unit": "1",
              "meaning": "Sodium open fraction in the stated model."
            },
            {
              "tex": "m",
              "name": "Activation probability",
              "unit": "1",
              "meaning": "Activation probability in the stated model."
            },
            {
              "tex": "h",
              "name": "Availability probability",
              "unit": "1",
              "meaning": "Availability probability in the stated model."
            }
          ],
          "reads": "Sodium opening requires activation and availability together.",
          "assumes": "Independent all-required HH factors.",
          "variants": [],
          "drill": {
            "prompt": "Use $m=0.7$ and $h=0.2$. Find sodium open fraction.",
            "answer": {
              "value": 0.06859999999999998,
              "unit": "",
              "tolerance": 0.00020579999999999993,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 0.3429999999999999,
                  "b": 0.2
                },
                "displayScale": 1
              }
            },
            "tex": "Y_{Na}=0.7^3(0.2)",
            "modelAnswer": [
              "Sodium opening requires activation and availability together."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $Y_{Na}=m^3h$."
              },
              {
                "body": "Start with $Y_{Na}=0.7^3(0.2)$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{Y_{Na}}}={\\htmlClass{formula-term-1}{m}}^3{\\htmlClass{formula-term-2}{h}}"
        },
        {
          "id": "L07-f-gna",
          "name": "Sodium conductance",
          "tex": "g_{Na}=\\bar g_{Na}Y_{Na}",
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
              "tex": "Y_{Na}",
              "name": "Sodium open fraction",
              "unit": "1",
              "meaning": "Sodium open fraction in the stated model."
            }
          ],
          "reads": "Open fraction scales maximum sodium conductance.",
          "assumes": "Y is m cubed times h.",
          "variants": [],
          "drill": {
            "prompt": "Use $\\bar g_{Na}=100\\,\\mathrm{nS}$ and $Y_{Na}=0.08$. Find sodium conductance.",
            "answer": {
              "value": 8e-09,
              "unit": "S",
              "tolerance": 2.4e-11,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 1e-07,
                  "b": 0.08
                },
                "displayScale": 1
              }
            },
            "tex": "g_{Na}=(100\\times10^{-9})(0.08)\\,\\mathrm S",
            "modelAnswer": [
              "Open fraction scales maximum sodium conductance."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $g_{Na}=\\bar g_{Na}Y_{Na}$."
              },
              {
                "body": "Start with $g_{Na}=(100\\times10^{-9})(0.08)\\,\\mathrm S$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{g_{Na}}}={\\htmlClass{formula-term-1}{\\bar g_{Na}}}{\\htmlClass{formula-term-2}{Y_{Na}}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L07-products-check",
          "prompt": "Is one permissive particle sufficient when other particles are required?",
          "correct": 1,
          "options": [
            {
              "text": "Yes, one permissive particle guarantees conduction",
              "feedback": "An all-required model cannot conduct merely because one factor is permissive."
            },
            {
              "text": "No, other required particles must be permissive",
              "feedback": "All required particles must be permissive, so one permissive particle alone cannot ensure conduction."
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
            "No, other required particles must be permissive."
          ]
        },
        {
          "id": "L07-products-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L07 PDF 23",
          "prompt": "Which factor sets the conductance when all HH particles are permissive?",
          "options": [
            {
              "text": "The ionic equilibrium voltage parameter",
              "feedback": "Reversal sets driving force, not the maximal conductance scale."
            },
            {
              "text": "The particle relaxation time parameter",
              "feedback": "Time constants set kinetics, not the conductance when all particles are permissive."
            },
            {
              "text": "The maximal conductance parameter",
              "feedback": "With the gating product equal to one, conductance equals its maximum."
            }
          ],
          "correct": 2,
          "hints": [{ "body": "Multiply the probabilities of all required independent states." }],
          "modelAnswer": [
            "With the gating product equal to one, conductance equals its maximum."
          ]
        }
      ]
    },
    {
      "id": "structure",
      "title": "Interpret the gate powers",
      "keyTerms": [],
      "source": "L07 PDF 24",
      "blocks": [
        {
          "type": "text",
          "body": ["The powers fit macroscopic kinetics. Squid HH particle counts are model parameters, while voltage sensors and domains describe protein structure."]
        },
        {
          "type": "detail",
          "title": "Extra detail from the slides",
          "blocks": [
            {
              "type": "figure",
              "visual": {
                "type": "widget",
                "name": "image-hotspots",
                "caption": "Lecture 7, PDF page 23. Source comparison of particle powers and conductance time courses. Original labels, axes and scale bars retained.",
                "fallbackAlt": "Lecture 7, PDF page 23. Source comparison of particle powers and conductance time courses. Original labels, axes and scale bars retained.",
                "props": {
                  "src": new URL('../../assets/figures/nbe-e4120/L07/powers.webp', import.meta.url).href,
                  "alt": "Lecture 7, PDF page 23. Source comparison of particle powers and conductance time courses. Original labels, axes and scale bars retained.",
                  "aspect": 0.6194029850746269,
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
          "id": "L07-structure-check",
          "practice": "extra",
          "prompt": "Which gating product belongs to potassium rather than sodium?",
          "correct": 1,
          "options": [
            {
              "text": "$m^3h$, activation and availability factors",
              "feedback": "The product $m^3h$ describes sodium activation and availability."
            },
            {
              "text": "$n^4$, four all-required activation factors",
              "feedback": "Potassium conductance uses four all-required activation factors, giving $n^4$."
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
            "$n^4$, four all-required activation factors."
          ]
        },
        {
          "id": "L07-structure-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L07 PDF 24",
          "prompt": "What does the fourth power in the potassium fit describe?",
          "options": [
            {
              "text": "Four all-required permissive factors",
              "feedback": "The fit multiplies four independent identical permissive probabilities."
            },
            {
              "text": "Four alternative conducting ion species",
              "feedback": "The exponent describes gating factors, not the number of ion species."
            },
            {
              "text": "Four sequential permeating potassium ions",
              "feedback": "The exponent is not a count of ions traversing the pore."
            }
          ],
          "correct": 0,
          "hints": [{ "body": "Distinguish what fits a conductance trace from what identifies protein domains." }],
          "modelAnswer": [
            "The fit multiplies four independent identical permissive probabilities."
          ]
        }
      ]
    },
    {
      "id": "balance",
      "title": "Balance the two transition rates",
      "keyTerms": [],
      "source": "L07 PDF 25",
      "blocks": [
        {
          "type": "text",
          "body": ["For any gate $y$, entry into the permissive state at rate $\\alpha$ acts on $1-y$ and exit at rate $\\beta$ acts on $y$: $dy/dt=\\alpha(1-y)-\\beta y$. At held voltage, $y_\\infty=\\alpha/(\\alpha+\\beta)$ and $\\tau=1/(\\alpha+\\beta)$. Rates must use reciprocal units of the time unit. Steady occupancy can coexist with ongoing transitions."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 7, PDF page 25. Forward/backward gating transitions for n, m and h. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 7, PDF page 25. Forward/backward gating transitions for n, m and h. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L07/transitions.webp', import.meta.url).href,
              "alt": "Lecture 7, PDF page 25. Forward/backward gating transitions for n, m and h. Original labels, axes and scale bars retained.",
              "aspect": 7.613636363636363,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L07-f-derivative",
          "name": "Permissive-state balance",
          "tex": "\\frac{dy}{dt}=\\alpha(1-y)-\\beta y",
          "symbols": [
            {
              "tex": "y",
              "name": "Permissive probability",
              "unit": "1",
              "meaning": "Permissive probability in the stated model."
            },
            {
              "tex": "\\alpha",
              "name": "Forward rate",
              "unit": "\\mathrm{s^{-1}}",
              "meaning": "Forward rate in the stated model."
            },
            {
              "tex": "\\beta",
              "name": "Backward rate",
              "unit": "\\mathrm{s^{-1}}",
              "meaning": "Backward rate in the stated model."
            },
            {
              "tex": "t",
              "name": "Time",
              "unit": "\\mathrm s",
              "meaning": "Time in the stated model."
            }
          ],
          "reads": "Forward transitions add and backward transitions remove permissive probability.",
          "assumes": "Fixed voltage and nonnegative rates.",
          "variants": [],
          "drill": {
            "prompt": "At $y=0.4$, $\\alpha=200\\,\\mathrm{s^{-1}}$ and $\\beta=50\\,\\mathrm{s^{-1}}$, find the derivative.",
            "answer": {
              "value": 100,
              "unit": "1/s",
              "tolerance": 0.3,
              "verification": {
                "relation": "gateDerivative",
                "inputs": {
                  "alpha": 200,
                  "beta": 50,
                  "y": 0.4
                },
                "displayScale": 1
              }
            },
            "tex": "\\dot y=200(1-0.4)-50(0.4)\\,\\mathrm{s^{-1}}",
            "modelAnswer": [
              "Forward transitions add and backward transitions remove permissive probability."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\frac{dy}{dt}=\\alpha(1-y)-\\beta y$."
              },
              {
                "body": "Start with $\\dot y=200(1-0.4)-50(0.4)\\,\\mathrm{s^{-1}}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\frac{d{\\htmlClass{formula-term-0}{y}}}{d{\\htmlClass{formula-term-3}{t}}}={\\htmlClass{formula-term-1}{\\alpha}}(1-{\\htmlClass{formula-term-0}{y}})-{\\htmlClass{formula-term-2}{\\beta}} {\\htmlClass{formula-term-0}{y}}"
        },
        {
          "id": "L07-f-steady",
          "name": "Steady gating probability",
          "tex": "y_\\infty=\\alpha/(\\alpha+\\beta)",
          "symbols": [
            {
              "tex": "y_\\infty",
              "name": "Steady probability",
              "unit": "1",
              "meaning": "Steady probability in the stated model."
            },
            {
              "tex": "\\alpha",
              "name": "Forward rate",
              "unit": "\\mathrm{s^{-1}}",
              "meaning": "Forward rate in the stated model."
            },
            {
              "tex": "\\beta",
              "name": "Backward rate",
              "unit": "\\mathrm{s^{-1}}",
              "meaning": "Backward rate in the stated model."
            }
          ],
          "reads": "Steady forward and backward transition fluxes balance.",
          "assumes": "Positive rate sum.",
          "variants": [],
          "drill": {
            "prompt": "Forward rate is $300\\,\\mathrm{s^{-1}}$ and backward rate $100\\,\\mathrm{s^{-1}}$. Find steady probability.",
            "answer": {
              "value": 0.75,
              "unit": "",
              "tolerance": 0.0022500000000000003,
              "verification": {
                "relation": "gateSteady",
                "inputs": {
                  "alpha": 300,
                  "beta": 100
                },
                "displayScale": 1
              }
            },
            "tex": "y_\\infty=300/(300+100)",
            "modelAnswer": [
              "Steady forward and backward transition fluxes balance."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $y_\\infty=\\alpha/(\\alpha+\\beta)$."
              },
              {
                "body": "Start with $y_\\infty=300/(300+100)$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{y_\\infty}}={\\htmlClass{formula-term-1}{\\alpha}}/({\\htmlClass{formula-term-1}{\\alpha}}+{\\htmlClass{formula-term-2}{\\beta}})"
        },
        {
          "id": "L07-f-tau",
          "name": "Particle time constant",
          "tex": "\\tau=1/(\\alpha+\\beta)",
          "symbols": [
            {
              "tex": "\\tau",
              "name": "Time constant",
              "unit": "\\mathrm s",
              "meaning": "Time constant in the stated model."
            },
            {
              "tex": "\\alpha",
              "name": "Forward rate",
              "unit": "\\mathrm{s^{-1}}",
              "meaning": "Forward rate in the stated model."
            },
            {
              "tex": "\\beta",
              "name": "Backward rate",
              "unit": "\\mathrm{s^{-1}}",
              "meaning": "Backward rate in the stated model."
            }
          ],
          "reads": "The rate sum sets the speed of relaxation.",
          "assumes": "Rates in the same inverse-time unit.",
          "variants": [],
          "drill": {
            "prompt": "Forward plus backward rate is $500\\,\\mathrm{s^{-1}}$. Find the time constant.",
            "answer": {
              "value": 0.002,
              "unit": "s",
              "tolerance": 6e-06,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 1,
                  "b": 500
                },
                "displayScale": 1
              }
            },
            "tex": "\\tau=1/500\\,\\mathrm s",
            "modelAnswer": [
              "The rate sum sets the speed of relaxation."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\tau=1/(\\alpha+\\beta)$."
              },
              {
                "body": "Start with $\\tau=1/500\\,\\mathrm s$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{\\tau}}=1/({\\htmlClass{formula-term-1}{\\alpha}}+{\\htmlClass{formula-term-2}{\\beta}})"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L07-balance-check",
          "prompt": "Which term removes permissive probability in the first-order balance?",
          "correct": 0,
          "options": [
            {
              "text": "$\\beta y$, the closing flux",
              "feedback": "The term $\\beta y$ removes probability from the permissive state."
            },
            {
              "text": "$\\alpha(1-y)$, the opening flux",
              "feedback": "The term $\\alpha(1-y)$ adds permissive probability from the nonpermissive pool."
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
            "$\\beta y$, the closing flux."
          ]
        },
        {
          "id": "L07-balance-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L07 PDF 25",
          "prompt": "At fixed voltage, which quantity describes the speed of particle relaxation?",
          "options": [
            {
              "text": "The particle initial probability",
              "feedback": "Initial probability sets the starting point, not the relaxation speed."
            },
            {
              "text": "The particle time constant",
              "feedback": "The time constant sets the rate of approach toward steady state."
            },
            {
              "text": "The particle steady probability",
              "feedback": "Steady probability sets the endpoint, not how quickly it is reached."
            }
          ],
          "correct": 1,
          "hints": [{ "body": "Count transitions out of the permissive and non-permissive fractions." }],
          "modelAnswer": [
            "The time constant sets the rate of approach toward steady state."
          ]
        }
      ]
    },
    {
      "id": "relaxation",
      "title": "Follow a voltage step",
      "keyTerms": [],
      "source": "L07 PDF 26",
      "blocks": [
        {
          "type": "text",
          "body": ["Use $y(t)=y_\\infty+(y_0-y_\\infty)e^{-t/\\tau}$ with the new held-voltage rates and the pre-step occupancy $y_0$. Check $y(0)=y_0$ and $y(t\\to\\infty)=y_\\infty$. Use separate parameters for $n$, $m$ and $h$."]
        },
        {
          "type": "detail",
          "title": "Extra detail from the slides",
          "blocks": [
            {
              "type": "figure",
              "visual": {
                "type": "widget",
                "name": "image-hotspots",
                "caption": "Lecture 7, PDF page 27. Source voltage step, gating variables and conductance products. Original labels, axes and scale bars retained.",
                "fallbackAlt": "Lecture 7, PDF page 27. Source voltage step, gating variables and conductance products. Original labels, axes and scale bars retained.",
                "props": {
                  "src": new URL('../../assets/figures/nbe-e4120/L07/time.webp', import.meta.url).href,
                  "alt": "Lecture 7, PDF page 27. Source voltage step, gating variables and conductance products. Original labels, axes and scale bars retained.",
                  "aspect": 0.9829222011385199,
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
          "id": "L07-f-relax",
          "name": "Fixed-voltage relaxation",
          "tex": "y(t)=y_\\infty+(y_0-y_\\infty)e^{-t/\\tau}",
          "symbols": [
            {
              "tex": "y(t)",
              "name": "Probability at elapsed time",
              "unit": "1",
              "meaning": "Probability at elapsed time in the stated model."
            },
            {
              "tex": "y_\\infty",
              "name": "Steady probability",
              "unit": "1",
              "meaning": "Steady probability in the stated model."
            },
            {
              "tex": "y_0",
              "name": "Initial probability",
              "unit": "1",
              "meaning": "Initial probability in the stated model."
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
          "reads": "Probability moves between its initial and steady limits.",
          "assumes": "Fixed voltage and constant rates.",
          "variants": [],
          "drill": {
            "prompt": "Use $y_0=0.2$, $y_\\infty=0.8$, $\\tau=4\\,\\mathrm{ms}$ and $t=4\\,\\mathrm{ms}$. Find probability.",
            "answer": {
              "value": 0.5792723352971346,
              "unit": "",
              "tolerance": 0.001737817005891404,
              "verification": {
                "relation": "gateRelax",
                "inputs": {
                  "y0": 0.2,
                  "steady": 0.8,
                  "time": 0.004,
                  "tau": 0.004
                },
                "displayScale": 1
              }
            },
            "tex": "y=0.8+(0.2-0.8)e^{-1}",
            "modelAnswer": [
              "Probability moves between its initial and steady limits."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $y(t)=y_\\infty+(y_0-y_\\infty)e^{-t/\\tau}$."
              },
              {
                "body": "Start with $y=0.8+(0.2-0.8)e^{-1}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{y(t)}}={\\htmlClass{formula-term-1}{y_\\infty}}+({\\htmlClass{formula-term-2}{y_0}}-{\\htmlClass{formula-term-1}{y_\\infty}})e^{-{\\htmlClass{formula-term-3}{t}}/{\\htmlClass{formula-term-4}{\\tau}}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L07-relaxation-check",
          "practice": "extra",
          "prompt": "Which quantity remains continuous across a sudden voltage step?",
          "correct": 0,
          "options": [
            {
              "text": "The finite-rate gating probability",
              "feedback": "Finite transition rates keep particle probability continuous when voltage changes suddenly."
            },
            {
              "text": "Every ionic current component",
              "feedback": "Ionic current can jump because driving force changes even while gating probability is continuous."
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
            "The finite-rate gating probability."
          ]
        },
        {
          "id": "L07-relaxation-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L07 PDF 26",
          "prompt": "Which condition permits the single-exponential particle solution?",
          "options": [
            {
              "text": "Voltage changes while transition rates equilibrate",
              "feedback": "Changing voltage generally changes rates, so one fixed-rate exponential no longer applies."
            },
            {
              "text": "Voltage stays fixed while transition rates drift",
              "feedback": "Rate drift violates the constant-coefficient solution even if voltage stays fixed."
            },
            {
              "text": "Voltage and transition rates remain constant",
              "feedback": "The stated solution assumes constant rates at a fixed voltage."
            }
          ],
          "correct": 2,
          "hints": [{ "body": "Check what remains of the exponential at zero elapsed time." }],
          "modelAnswer": [
            "The stated solution assumes constant rates at a fixed voltage."
          ]
        }
      ]
    },
    {
      "id": "time-courses",
      "title": "Read conductance kinetics",
      "keyTerms": [],
      "source": "L07 PDF 27",
      "blocks": [
        {
          "type": "text",
          "body": ["Fast sodium activation raises $m^3$ before declining $h$ reduces sodium conductance. Slower potassium activation raises $n^4$, helping repolarize the membrane as inward sodium current falls. Relax the individual gates before taking powers or products. The simplified sodium transient assumes $m_0\\approx0$ and $h_\\infty\\approx0$."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 7, PDF page 27. Source voltage step, gating variables and conductance products. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 7, PDF page 27. Source voltage step, gating variables and conductance products. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L07/time.webp', import.meta.url).href,
              "alt": "Lecture 7, PDF page 27. Source voltage step, gating variables and conductance products. Original labels, axes and scale bars retained.",
              "aspect": 0.9829222011385199,
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
          "id": "L07-time-courses-check",
          "prompt": "Which competing changes explain a sodium conductance transient?",
          "correct": 0,
          "options": [
            {
              "text": "Activation grows while availability declines",
              "feedback": "Rapidly increasing activation and slower loss of availability produce the sodium transient."
            },
            {
              "text": "Activation and availability both stay fixed",
              "feedback": "Fixed activation and availability cannot explain a changing conductance under a fixed clamp."
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
            "Activation grows while availability declines."
          ]
        },
        {
          "id": "L07-time-courses-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L07 PDF 27",
          "prompt": "Which combination describes the taught transient sodium conductance?",
          "options": [
            {
              "text": "Rapid activation followed by reduced availability",
              "feedback": "Rising activation opens channels, then falling availability reduces conductance."
            },
            {
              "text": "Slow activation followed by increased availability",
              "feedback": "Increasing availability would not supply the taught inactivation-driven decline."
            },
            {
              "text": "Rapid activation followed by fixed availability",
              "feedback": "Fixed availability omits the inactivation underlying the transient."
            }
          ],
          "correct": 0,
          "hints": [{ "body": "Consider how activation and availability contribute to the product over time." }],
          "modelAnswer": [
            "Rising activation opens channels, then falling availability reduces conductance."
          ]
        }
      ]
    },
    {
      "id": "fit",
      "title": "Fit activation and its rate",
      "keyTerms": [],
      "source": "L07 PDF 28",
      "blocks": [
        {
          "type": "text",
          "body": ["Recover $n_\\infty=(g_{K,\\infty}/\\bar g_K)^{1/4}$ at each held voltage and fit the full fourth-power time course for $\\tau_n$. Optional explorers show how barrier-rate polarity differs between activation and availability."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 7, PDF page 28. Potassium conductance time courses at two clamp voltages. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 7, PDF page 28. Potassium conductance time courses at two clamp voltages. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L07/fitting.webp', import.meta.url).href,
              "alt": "Lecture 7, PDF page 28. Potassium conductance time courses at two clamp voltages. Original labels, axes and scale bars retained.",
              "aspect": 1.896774193548387,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L07-f-root",
          "name": "Infer potassium particle probability",
          "tex": "n_\\infty=(g_{K,\\infty}/\\bar g_K)^{1/4}",
          "symbols": [
            {
              "tex": "n_\\infty",
              "name": "Steady activation",
              "unit": "1",
              "meaning": "Steady activation in the stated model."
            },
            {
              "tex": "g_{K,\\infty}",
              "name": "Steady conductance",
              "unit": "\\mathrm S",
              "meaning": "Steady conductance in the stated model."
            },
            {
              "tex": "\\bar g_K",
              "name": "Maximum conductance",
              "unit": "\\mathrm S",
              "meaning": "Maximum conductance in the stated model."
            }
          ],
          "reads": "Take a fourth root, not the conductance fraction itself.",
          "assumes": "HH potassium model and known maximum.",
          "variants": [],
          "drill": {
            "prompt": "Steady potassium conductance is $8.1\\,\\mathrm{nS}$ of a maximum $100\\,\\mathrm{nS}$. Find steady activation.",
            "answer": {
              "value": 0.5334838230116768,
              "unit": "",
              "tolerance": 0.0016004514690350306,
              "verification": {
                "relation": "powerRatio",
                "inputs": {
                  "a": 8.1e-09,
                  "b": 1e-07,
                  "power": 0.25
                },
                "displayScale": 1
              }
            },
            "tex": "n_\\infty=(8.1/100)^{1/4}",
            "modelAnswer": [
              "Take a fourth root, not the conductance fraction itself."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $n_\\infty=(g_{K,\\infty}/\\bar g_K)^{1/4}$."
              },
              {
                "body": "Start with $n_\\infty=(8.1/100)^{1/4}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{n_\\infty}}=({\\htmlClass{formula-term-1}{g_{K,\\infty}}}/{\\htmlClass{formula-term-2}{\\bar g_K}})^{1/4}"
        },
        {
          "id": "L07-f-barrier-open",
          "name": "Barrier Open",
          "tex": "\\alpha=\\alpha_0 e^{\\gamma q}",
          "symbols": [
            {
              "tex": "\\alpha",
              "name": "Transition rate",
              "unit": "\\mathrm{s^{-1}}",
              "meaning": "Transition rate in the stated model."
            },
            {
              "tex": "\\alpha_0",
              "name": "Baseline rate",
              "unit": "\\mathrm{s^{-1}}",
              "meaning": "Baseline rate in the stated model."
            },
            {
              "tex": "\\gamma",
              "name": "Electrical distance",
              "unit": "1",
              "meaning": "Electrical distance in the stated model."
            },
            {
              "tex": "q",
              "name": "Dimensionless charge-voltage energy",
              "unit": "1",
              "meaning": "Dimensionless charge-voltage energy in the stated model."
            }
          ],
          "reads": "Availability has opposite voltage polarity to activation.",
          "assumes": "Here $q=zFV_m/(RT)$ is stated dimensionless; baseline and voltage share a fixed origin.",
          "variants": [],
          "drill": {
            "prompt": "Use baseline $40\\,\\mathrm{s^{-1}}$, $\\gamma=0.5$ and $q=1$. Evaluate barrier open rate.",
            "answer": {
              "value": 65.94885082800513,
              "unit": "1/s",
              "tolerance": 0.19784655248401542,
              "verification": {
                "relation": "exponentialRate",
                "inputs": {
                  "base": 40,
                  "exponent": 0.5
                },
                "displayScale": 1
              }
            },
            "tex": "40e^{0.5}\\,\\mathrm{s^{-1}}",
            "modelAnswer": [
              "Availability has opposite voltage polarity to activation."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\alpha=\\alpha_0 e^{\\gamma q}$."
              },
              {
                "body": "Start with $40e^{0.5}\\,\\mathrm{s^{-1}}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{\\alpha}}={\\htmlClass{formula-term-1}{\\alpha_0}} e^{{\\htmlClass{formula-term-2}{\\gamma}} {\\htmlClass{formula-term-3}{q}}}"
        },
        {
          "id": "L07-f-barrier-close",
          "name": "Barrier Close",
          "tex": "\\beta=\\beta_0 e^{-(1-\\gamma)q}",
          "symbols": [
            {
              "tex": "\\beta",
              "name": "Transition rate",
              "unit": "\\mathrm{s^{-1}}",
              "meaning": "Transition rate in the stated model."
            },
            {
              "tex": "\\beta_0",
              "name": "Baseline rate",
              "unit": "\\mathrm{s^{-1}}",
              "meaning": "Baseline rate in the stated model."
            },
            {
              "tex": "\\gamma",
              "name": "Electrical distance",
              "unit": "1",
              "meaning": "Electrical distance in the stated model."
            },
            {
              "tex": "q",
              "name": "Dimensionless charge-voltage energy",
              "unit": "1",
              "meaning": "Dimensionless charge-voltage energy in the stated model."
            }
          ],
          "reads": "Availability has opposite voltage polarity to activation.",
          "assumes": "Here $q=zFV_m/(RT)$ is stated dimensionless; baseline and voltage share a fixed origin.",
          "variants": [],
          "drill": {
            "prompt": "Use baseline $40\\,\\mathrm{s^{-1}}$, $\\gamma=0.5$ and $q=1$. Evaluate barrier close rate.",
            "answer": {
              "value": 24.261226388505335,
              "unit": "1/s",
              "tolerance": 0.07278367916551601,
              "verification": {
                "relation": "exponentialRate",
                "inputs": {
                  "base": 40,
                  "exponent": -0.5
                },
                "displayScale": 1
              }
            },
            "tex": "40e^{-0.5}\\,\\mathrm{s^{-1}}",
            "modelAnswer": [
              "Availability has opposite voltage polarity to activation."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\beta=\\beta_0 e^{-(1-\\gamma)q}$."
              },
              {
                "body": "Start with $40e^{-0.5}\\,\\mathrm{s^{-1}}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{\\beta}}={\\htmlClass{formula-term-1}{\\beta_0}} e^{-(1-{\\htmlClass{formula-term-2}{\\gamma}}){\\htmlClass{formula-term-3}{q}}}"
        },
        {
          "id": "L07-f-availability-open",
          "name": "Availability Open",
          "tex": "\\alpha_h=\\alpha_{h0} e^{-(1-\\gamma)q}",
          "symbols": [
            {
              "tex": "\\alpha_h",
              "name": "Transition rate",
              "unit": "\\mathrm{s^{-1}}",
              "meaning": "Transition rate in the stated model."
            },
            {
              "tex": "\\alpha_{h0}",
              "name": "Baseline rate",
              "unit": "\\mathrm{s^{-1}}",
              "meaning": "Baseline rate in the stated model."
            },
            {
              "tex": "\\gamma",
              "name": "Electrical distance",
              "unit": "1",
              "meaning": "Electrical distance in the stated model."
            },
            {
              "tex": "q",
              "name": "Dimensionless charge-voltage energy",
              "unit": "1",
              "meaning": "Dimensionless charge-voltage energy in the stated model."
            }
          ],
          "reads": "Availability has opposite voltage polarity to activation. These barrier rates and the later empirical squid laws are distinct fitted descriptions.",
          "assumes": "Here $q=zFV_m/(RT)$ is stated dimensionless; baseline and voltage share a fixed origin.",
          "variants": [],
          "drill": {
            "prompt": "Use baseline $40\\,\\mathrm{s^{-1}}$, $\\gamma=0.5$ and $q=1$. Evaluate availability open rate.",
            "answer": {
              "value": 24.261226388505335,
              "unit": "1/s",
              "tolerance": 0.07278367916551601,
              "verification": {
                "relation": "exponentialRate",
                "inputs": {
                  "base": 40,
                  "exponent": -0.5
                },
                "displayScale": 1
              }
            },
            "tex": "40e^{-0.5}\\,\\mathrm{s^{-1}}",
            "modelAnswer": [
              "Availability has opposite voltage polarity to activation."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\alpha_h=\\alpha_{h0} e^{-(1-\\gamma)q}$."
              },
              {
                "body": "Start with $40e^{-0.5}\\,\\mathrm{s^{-1}}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{\\alpha_h}}={\\htmlClass{formula-term-1}{\\alpha_{h0}}} e^{-(1-{\\htmlClass{formula-term-2}{\\gamma}}){\\htmlClass{formula-term-3}{q}}}"
        },
        {
          "id": "L07-f-availability-close",
          "name": "Availability Close",
          "tex": "\\beta_h=\\beta_{h0}e^{\\gamma q}",
          "symbols": [
            {
              "tex": "\\beta_h",
              "name": "Transition rate",
              "unit": "\\mathrm{s^{-1}}",
              "meaning": "Transition rate in the stated model."
            },
            {
              "tex": "\\beta_{h0}",
              "name": "Baseline rate",
              "unit": "\\mathrm{s^{-1}}",
              "meaning": "Baseline rate in the stated model."
            },
            {
              "tex": "\\gamma",
              "name": "Electrical distance",
              "unit": "1",
              "meaning": "Electrical distance in the stated model."
            },
            {
              "tex": "q",
              "name": "Dimensionless charge-voltage energy",
              "unit": "1",
              "meaning": "Dimensionless charge-voltage energy in the stated model."
            }
          ],
          "reads": "Availability has opposite voltage polarity to activation.",
          "assumes": "Here $q=zFV_m/(RT)$ is stated dimensionless; baseline and voltage share a fixed origin.",
          "variants": [],
          "drill": {
            "prompt": "Use baseline $40\\,\\mathrm{s^{-1}}$, $\\gamma=0.5$ and $q=1$. Evaluate availability close rate.",
            "answer": {
              "value": 65.94885082800513,
              "unit": "1/s",
              "tolerance": 0.19784655248401542,
              "verification": {
                "relation": "exponentialRate",
                "inputs": {
                  "base": 40,
                  "exponent": 0.5
                },
                "displayScale": 1
              }
            },
            "tex": "40e^{0.5}\\,\\mathrm{s^{-1}}",
            "modelAnswer": [
              "Availability has opposite voltage polarity to activation."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\beta_h=\\beta_{h0}e^{\\gamma q}$."
              },
              {
                "body": "Start with $40e^{0.5}\\,\\mathrm{s^{-1}}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{\\beta_h}}={\\htmlClass{formula-term-1}{\\beta_{h0}}}e^{{\\htmlClass{formula-term-2}{\\gamma}} {\\htmlClass{formula-term-3}{q}}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L07-fit-check",
          "practice": "extra",
          "prompt": "Which operation recovers a particle probability from normalized potassium conductance?",
          "correct": 1,
          "options": [
            {
              "text": "Fourth power of the normalized conductance",
              "feedback": "Taking another fourth power compounds the exponent instead of recovering particle probability."
            },
            {
              "text": "Fourth root of the normalized conductance",
              "feedback": "Conductance is proportional to the fourth power of potassium particle probability, so invert with a fourth root."
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
            "Fourth root of the normalized conductance."
          ]
        },
        {
          "id": "L07-fit-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L07 PDF 28",
          "prompt": "Which recording feature is needed to fit a particle time constant?",
          "options": [
            {
              "text": "The reversal voltage at each sodium concentration",
              "feedback": "Reversal shifts identify ionic driving force, not particle relaxation time."
            },
            {
              "text": "The time course of conductance after a voltage step",
              "feedback": "A relaxation time requires time-resolved data, with the appropriate gating-power model."
            },
            {
              "text": "The final conductance at each steady voltage only",
              "feedback": "Steady values constrain endpoints but do not determine transition speed."
            }
          ],
          "correct": 1,
          "hints": [{ "body": "Undo the fourth power after normalizing the steady conductance." }],
          "modelAnswer": [
            "A relaxation time requires time-resolved data, with the appropriate gating-power model."
          ]
        }
      ]
    },
    {
      "id": "steady-curves",
      "title": "Read steady and kinetic curves",
      "keyTerms": [],
      "source": "L07 PDF 29",
      "blocks": [
        {
          "type": "text",
          "body": ["Use the separate probability and time axes. Steady curves tell where each gate settles. Time constants tell how quickly it approaches that level and can vary nonmonotonically with voltage."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 7, PDF page 29. Steady activation/availability and time-constant plots with separate axes. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 7, PDF page 29. Steady activation/availability and time-constant plots with separate axes. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L07/steady.webp', import.meta.url).href,
              "alt": "Lecture 7, PDF page 29. Steady activation/availability and time-constant plots with separate axes. Original labels, axes and scale bars retained.",
              "aspect": 3.054711246200608,
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
          "id": "L07-steady-curves-check",
          "practice": "extra",
          "prompt": "Which gating property falls on depolarization in the source steady curves?",
          "correct": 0,
          "options": [
            {
              "text": "Sodium availability rather than sodium activation",
              "feedback": "Steady sodium availability decreases as depolarization favors inactivation."
            },
            {
              "text": "Sodium activation rather than sodium availability",
              "feedback": "Sodium activation increases with depolarization; the falling curve is availability."
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
            "Sodium availability rather than sodium activation."
          ]
        },
        {
          "id": "L07-steady-curves-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L07 PDF 29",
          "prompt": "What happens to steady sodium availability as voltage depolarizes in the source curves?",
          "options": [
            {
              "text": "It increases toward a higher probability",
              "feedback": "This is the direction of activation, not steady sodium availability."
            },
            {
              "text": "It stays at the initial probability",
              "feedback": "A steady curve varies with voltage; it is not fixed by the initial state."
            },
            {
              "text": "It decreases toward a lower probability",
              "feedback": "The availability curve falls with depolarization, unlike the activation curves."
            }
          ],
          "correct": 2,
          "hints": [{ "body": "Read the probability and time axes separately." }],
          "modelAnswer": [
            "The availability curve falls with depolarization, unlike the activation curves."
          ]
        }
      ]
    },
    {
      "id": "infer",
      "title": "Recover the rates",
      "keyTerms": [],
      "source": "L07 PDF 30",
      "blocks": [
        {
          "type": "text",
          "body": ["Use $\\alpha=y_\\infty/\\tau$ and $\\beta=(1-y_\\infty)/\\tau$ at the same held voltage. Check the ratio and reciprocal sum. Scaling both rates equally changes speed while preserving steady occupancy."]
        },
        {
          "type": "detail",
          "title": "Extra detail from the slides",
          "blocks": [
            {
              "type": "figure",
              "visual": {
                "type": "widget",
                "name": "image-hotspots",
                "caption": "Lecture 7, PDF page 25. Forward/backward gating transitions for n, m and h. Original labels, axes and scale bars retained.",
                "fallbackAlt": "Lecture 7, PDF page 25. Forward/backward gating transitions for n, m and h. Original labels, axes and scale bars retained.",
                "props": {
                  "src": new URL('../../assets/figures/nbe-e4120/L07/transitions.webp', import.meta.url).href,
                  "alt": "Lecture 7, PDF page 25. Forward/backward gating transitions for n, m and h. Original labels, axes and scale bars retained.",
                  "aspect": 7.613636363636363,
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
          "id": "L07-f-forward",
          "name": "Recover forward rate",
          "tex": "\\alpha=y_\\infty/\\tau",
          "symbols": [
            {
              "tex": "\\alpha",
              "name": "Transition rate",
              "unit": "\\mathrm{s^{-1}}",
              "meaning": "Transition rate in the stated model."
            },
            {
              "tex": "y_\\infty",
              "name": "Steady probability",
              "unit": "1",
              "meaning": "Steady probability in the stated model."
            },
            {
              "tex": "\\tau",
              "name": "Time constant",
              "unit": "\\mathrm s",
              "meaning": "Time constant in the stated model."
            }
          ],
          "reads": "Fraction and speed together determine the rate.",
          "assumes": "Fixed-voltage first-order gating.",
          "variants": [],
          "drill": {
            "prompt": "Use $y_\\infty=0.65$ and $\\tau=5\\,\\mathrm{ms}$ to find the forward rate.",
            "answer": {
              "value": 130,
              "unit": "1/s",
              "tolerance": 0.39,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 0.65,
                  "b": 0.005
                },
                "displayScale": 1
              }
            },
            "tex": "\\alpha=y_\\infty/\\tau",
            "modelAnswer": [
              "Fraction and speed together determine the rate."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\alpha=y_\\infty/\\tau$."
              },
              {
                "body": "Start with $\\alpha=y_\\infty/\\tau$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{\\alpha}}={\\htmlClass{formula-term-1}{y_\\infty}}/{\\htmlClass{formula-term-2}{\\tau}}"
        },
        {
          "id": "L07-f-backward",
          "name": "Recover backward rate",
          "tex": "\\beta=(1-y_\\infty)/\\tau",
          "symbols": [
            {
              "tex": "\\beta",
              "name": "Transition rate",
              "unit": "\\mathrm{s^{-1}}",
              "meaning": "Transition rate in the stated model."
            },
            {
              "tex": "y_\\infty",
              "name": "Steady probability",
              "unit": "1",
              "meaning": "Steady probability in the stated model."
            },
            {
              "tex": "\\tau",
              "name": "Time constant",
              "unit": "\\mathrm s",
              "meaning": "Time constant in the stated model."
            }
          ],
          "reads": "Fraction and speed together determine the rate.",
          "assumes": "Fixed-voltage first-order gating.",
          "variants": [],
          "drill": {
            "prompt": "Use $y_\\infty=0.65$ and $\\tau=5\\,\\mathrm{ms}$ to find the backward rate.",
            "answer": {
              "value": 70,
              "unit": "1/s",
              "tolerance": 0.21,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 0.35,
                  "b": 0.005
                },
                "displayScale": 1
              }
            },
            "tex": "\\beta=(1-y_\\infty)/\\tau",
            "modelAnswer": [
              "Fraction and speed together determine the rate."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\beta=(1-y_\\infty)/\\tau$."
              },
              {
                "body": "Start with $\\beta=(1-y_\\infty)/\\tau$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{\\beta}}=(1-{\\htmlClass{formula-term-1}{y_\\infty}})/{\\htmlClass{formula-term-2}{\\tau}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L07-infer-check",
          "practice": "extra",
          "prompt": "Besides steady probability, what is needed to recover both transition rates?",
          "correct": 0,
          "options": [
            {
              "text": "The relaxation time constant at that voltage",
              "feedback": "The time constant gives the rate sum; steady probability gives the forward fraction of that sum."
            },
            {
              "text": "The ionic reversal potential at that voltage",
              "feedback": "Ionic reversal constrains driving force but does not determine particle transition speed."
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
            "The relaxation time constant at that voltage."
          ]
        },
        {
          "id": "L07-infer-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L07 PDF 30",
          "prompt": "Which units belong to a forward or backward transition rate?",
          "options": [
            {
              "text": "Inverse time for both transition rates",
              "feedback": "Rates multiply probabilities to give probability change per unit time."
            },
            {
              "text": "Time for both transition rates",
              "feedback": "Time is the unit of a time constant, not a transition rate."
            },
            {
              "text": "Probability for both transition rates",
              "feedback": "Gating variables are probabilities; their transition rates have inverse-time units."
            }
          ],
          "correct": 0,
          "hints": [{ "body": "Use one measurement for the rate ratio and the other for their sum." }],
          "modelAnswer": [
            "Rates multiply probabilities to give probability change per unit time."
          ]
        }
      ]
    },
    {
      "id": "empirical",
      "title": "Use the squid voltage origin",
      "keyTerms": [],
      "source": "L07 PDF 31",
      "blocks": [
        {
          "type": "text",
          "body": ["The six empirical formulas use $U=V_m-V_{rest}$ in millivolts and yield rates in $\\mathrm{ms}^{-1}$ at the source temperature. Multiply by $1000$ for $\\mathrm{s}^{-1}$. The limits are $\\alpha_n(10)=0.1\\,\\mathrm{ms}^{-1}$ and $\\alpha_m(25)=1\\,\\mathrm{ms}^{-1}$. The preceding steady plots use absolute membrane voltage."]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 7, PDF page 31. Empirical rate coefficient plots, source absolute-voltage axes. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 7, PDF page 31. Empirical rate coefficient plots, source absolute-voltage axes. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L07/rates.webp', import.meta.url).href,
              "alt": "Lecture 7, PDF page 31. Empirical rate coefficient plots, source absolute-voltage axes. Original labels, axes and scale bars retained.",
              "aspect": 3.3120805369127515,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L07-f-an",
          "name": "Empirical an rate",
          "tex": "\\alpha_n=\\frac{0.01(10-U)}{e^{(10-U)/10}-1}",
          "symbols": [
            {
              "tex": "U",
              "name": "Depolarization from rest",
              "unit": "\\mathrm{mV}",
              "meaning": "Depolarization from rest in the stated model."
            },
            {
              "tex": "\\alpha_n",
              "name": "Empirical rate",
              "unit": "\\mathrm{ms^{-1}}",
              "meaning": "Empirical rate in the stated model."
            }
          ],
          "reads": "Evaluate the source squid rate at a rest-relative voltage.",
          "assumes": "Numerical U in mV; source rate in inverse ms; convert output to inverse s. Source fit at 6.3°C, no extrapolation. At $U=10\,\mathrm{mV}$ this ratio is $0/0$; the L'Hopital limit is $0.1\,\mathrm{ms}^{-1}$.",
          "variants": [],
          "drill": {
            "prompt": "Evaluate $\\alpha_n$ at $U=15\\,\\mathrm{mV}$ using the displayed law. Give the rate in $\\mathrm{s^{-1}}$.",
            "answer": {
              "value": 127.07470412683992,
              "unit": "1/s",
              "tolerance": 0.3812241123805198,
              "verification": {
                "relation": "hhRate",
                "inputs": {
                  "gate": "an",
                  "voltage": 0.015
                },
                "displayScale": 1
              }
            },
            "tex": "\\alpha_n=\\frac{0.01(10-U)}{e^{(10-U)/10}-1},\\quad U=15\\,\\mathrm{mV}",
            "modelAnswer": [
              "Evaluate the source squid rate at a rest-relative voltage."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\alpha_n=\\frac{0.01(10-U)}{e^{(10-U)/10}-1}$."
              },
              {
                "body": "Start with $\\alpha_n=\\frac{0.01(10-U)}{e^{(10-U)/10}-1},\\quad U=15\\,\\mathrm{mV}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-1}{\\alpha_n}}=\\frac{0.01(10-{\\htmlClass{formula-term-0}{U}})}{e^{(10-{\\htmlClass{formula-term-0}{U}})/10}-1}"
        },
        {
          "id": "L07-f-bn",
          "name": "Empirical bn rate",
          "tex": "\\beta_n=0.125e^{-U/80}",
          "symbols": [
            {
              "tex": "U",
              "name": "Depolarization from rest",
              "unit": "\\mathrm{mV}",
              "meaning": "Depolarization from rest in the stated model."
            },
            {
              "tex": "\\beta_n",
              "name": "Empirical rate",
              "unit": "\\mathrm{ms^{-1}}",
              "meaning": "Empirical rate in the stated model."
            }
          ],
          "reads": "Evaluate the source squid rate at a rest-relative voltage.",
          "assumes": "Numerical U in mV; source rate in inverse ms; convert output to inverse s. Source fit at 6.3°C, no extrapolation.",
          "variants": [],
          "drill": {
            "prompt": "Evaluate $\\beta_n$ at $U=15\\,\\mathrm{mV}$ using the displayed law. Give the rate in $\\mathrm{s^{-1}}$.",
            "answer": {
              "value": 103.62863977255004,
              "unit": "1/s",
              "tolerance": 0.31088591931765014,
              "verification": {
                "relation": "hhRate",
                "inputs": {
                  "gate": "bn",
                  "voltage": 0.015
                },
                "displayScale": 1
              }
            },
            "tex": "\\beta_n=0.125e^{-U/80},\\quad U=15\\,\\mathrm{mV}",
            "modelAnswer": [
              "Evaluate the source squid rate at a rest-relative voltage."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\beta_n=0.125e^{-U/80}$."
              },
              {
                "body": "Start with $\\beta_n=0.125e^{-U/80},\\quad U=15\\,\\mathrm{mV}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-1}{\\beta_n}}=0.125e^{-{\\htmlClass{formula-term-0}{U}}/80}"
        },
        {
          "id": "L07-f-am",
          "name": "Empirical am rate",
          "tex": "\\alpha_m=\\frac{0.1(25-U)}{e^{(25-U)/10}-1}",
          "symbols": [
            {
              "tex": "U",
              "name": "Depolarization from rest",
              "unit": "\\mathrm{mV}",
              "meaning": "Depolarization from rest in the stated model."
            },
            {
              "tex": "\\alpha_m",
              "name": "Empirical rate",
              "unit": "\\mathrm{ms^{-1}}",
              "meaning": "Empirical rate in the stated model."
            }
          ],
          "reads": "Evaluate the source squid rate at a rest-relative voltage.",
          "assumes": "Numerical U in mV; source rate in inverse ms; convert output to inverse s. Source fit at 6.3°C, no extrapolation.",
          "variants": [],
          "drill": {
            "prompt": "Evaluate $\\alpha_m$ at $U=15\\,\\mathrm{mV}$ using the displayed law. Give the rate in $\\mathrm{s^{-1}}$.",
            "answer": {
              "value": 581.9767068693264,
              "unit": "1/s",
              "tolerance": 1.7459301206079794,
              "verification": {
                "relation": "hhRate",
                "inputs": {
                  "gate": "am",
                  "voltage": 0.015
                },
                "displayScale": 1
              }
            },
            "tex": "\\alpha_m=\\frac{0.1(25-U)}{e^{(25-U)/10}-1},\\quad U=15\\,\\mathrm{mV}",
            "modelAnswer": [
              "Evaluate the source squid rate at a rest-relative voltage."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\alpha_m=\\frac{0.1(25-U)}{e^{(25-U)/10}-1}$."
              },
              {
                "body": "Start with $\\alpha_m=\\frac{0.1(25-U)}{e^{(25-U)/10}-1},\\quad U=15\\,\\mathrm{mV}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-1}{\\alpha_m}}=\\frac{0.1(25-{\\htmlClass{formula-term-0}{U}})}{e^{(25-{\\htmlClass{formula-term-0}{U}})/10}-1}"
        },
        {
          "id": "L07-f-bm",
          "name": "Empirical bm rate",
          "tex": "\\beta_m=4e^{-U/18}",
          "symbols": [
            {
              "tex": "U",
              "name": "Depolarization from rest",
              "unit": "\\mathrm{mV}",
              "meaning": "Depolarization from rest in the stated model."
            },
            {
              "tex": "\\beta_m",
              "name": "Empirical rate",
              "unit": "\\mathrm{ms^{-1}}",
              "meaning": "Empirical rate in the stated model."
            }
          ],
          "reads": "Evaluate the source squid rate at a rest-relative voltage.",
          "assumes": "Numerical U in mV; source rate in inverse ms; convert output to inverse s. Source fit at 6.3°C, no extrapolation.",
          "variants": [],
          "drill": {
            "prompt": "Evaluate $\\beta_m$ at $U=15\\,\\mathrm{mV}$ using the displayed law. Give the rate in $\\mathrm{s^{-1}}$.",
            "answer": {
              "value": 1738.3928340283128,
              "unit": "1/s",
              "tolerance": 5.215178502084939,
              "verification": {
                "relation": "hhRate",
                "inputs": {
                  "gate": "bm",
                  "voltage": 0.015
                },
                "displayScale": 1
              }
            },
            "tex": "\\beta_m=4e^{-U/18},\\quad U=15\\,\\mathrm{mV}",
            "modelAnswer": [
              "Evaluate the source squid rate at a rest-relative voltage."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\beta_m=4e^{-U/18}$."
              },
              {
                "body": "Start with $\\beta_m=4e^{-U/18},\\quad U=15\\,\\mathrm{mV}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-1}{\\beta_m}}=4e^{-{\\htmlClass{formula-term-0}{U}}/18}"
        },
        {
          "id": "L07-f-ah",
          "name": "Empirical ah rate",
          "tex": "\\alpha_h=0.07e^{-U/20}",
          "symbols": [
            {
              "tex": "U",
              "name": "Depolarization from rest",
              "unit": "\\mathrm{mV}",
              "meaning": "Depolarization from rest in the stated model."
            },
            {
              "tex": "\\alpha_h",
              "name": "Empirical rate",
              "unit": "\\mathrm{ms^{-1}}",
              "meaning": "Empirical rate in the stated model."
            }
          ],
          "reads": "Evaluate the source squid rate at a rest-relative voltage.",
          "assumes": "Numerical U in mV; source rate in inverse ms; convert output to inverse s. Source fit at 6.3°C, no extrapolation.",
          "variants": [],
          "drill": {
            "prompt": "Evaluate $\\alpha_h$ at $U=15\\,\\mathrm{mV}$ using the displayed law. Give the rate in $\\mathrm{s^{-1}}$.",
            "answer": {
              "value": 33.06565869187103,
              "unit": "1/s",
              "tolerance": 0.09919697607561309,
              "verification": {
                "relation": "hhRate",
                "inputs": {
                  "gate": "ah",
                  "voltage": 0.015
                },
                "displayScale": 1
              }
            },
            "tex": "\\alpha_h=0.07e^{-U/20},\\quad U=15\\,\\mathrm{mV}",
            "modelAnswer": [
              "Evaluate the source squid rate at a rest-relative voltage."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\alpha_h=0.07e^{-U/20}$."
              },
              {
                "body": "Start with $\\alpha_h=0.07e^{-U/20},\\quad U=15\\,\\mathrm{mV}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-1}{\\alpha_h}}=0.07e^{-{\\htmlClass{formula-term-0}{U}}/20}"
        },
        {
          "id": "L07-f-bh",
          "name": "Empirical bh rate",
          "tex": "\\beta_h=\\frac{1}{1+e^{(30-U)/10}}",
          "symbols": [
            {
              "tex": "U",
              "name": "Depolarization from rest",
              "unit": "\\mathrm{mV}",
              "meaning": "Depolarization from rest in the stated model."
            },
            {
              "tex": "\\beta_h",
              "name": "Empirical rate",
              "unit": "\\mathrm{ms^{-1}}",
              "meaning": "Empirical rate in the stated model."
            }
          ],
          "reads": "Evaluate the source squid rate at a rest-relative voltage.",
          "assumes": "Numerical U in mV; source rate in inverse ms; convert output to inverse s. Source fit at 6.3°C, no extrapolation.",
          "variants": [],
          "drill": {
            "prompt": "Evaluate $\\beta_h$ at $U=15\\,\\mathrm{mV}$ using the displayed law. Give the rate in $\\mathrm{s^{-1}}$.",
            "answer": {
              "value": 182.42552380635635,
              "unit": "1/s",
              "tolerance": 0.547276571419069,
              "verification": {
                "relation": "hhRate",
                "inputs": {
                  "gate": "bh",
                  "voltage": 0.015
                },
                "displayScale": 1
              }
            },
            "tex": "\\beta_h=\\frac{1}{1+e^{(30-U)/10}},\\quad U=15\\,\\mathrm{mV}",
            "modelAnswer": [
              "Evaluate the source squid rate at a rest-relative voltage."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\beta_h=\\frac{1}{1+e^{(30-U)/10}}$."
              },
              {
                "body": "Start with $\\beta_h=\\frac{1}{1+e^{(30-U)/10}},\\quad U=15\\,\\mathrm{mV}$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-1}{\\beta_h}}=\\frac{1}{1+e^{(30-{\\htmlClass{formula-term-0}{U}})/10}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L07-empirical-check",
          "practice": "extra",
          "prompt": "Which voltage origin is required by the source empirical squid coefficients?",
          "correct": 1,
          "options": [
            {
              "text": "Absolute inside voltage relative to the outside",
              "feedback": "Using absolute negative membrane voltage without shifting the origin changes the fitted rates."
            },
            {
              "text": "Depolarization relative to the resting potential",
              "feedback": "The empirical coefficients use depolarization from rest, not the absolute inside-minus-outside voltage."
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
            "Depolarization relative to the resting potential."
          ]
        },
        {
          "id": "L07-empirical-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L07 PDF 31",
          "prompt": "Which temperature qualification belongs to the empirical squid rate laws?",
          "options": [
            {
              "text": "Use a new temperature as a shift of voltage origin",
              "feedback": "Temperature dependence and voltage origin are different conventions."
            },
            {
              "text": "Use the fitted temperature without assumed rescaling",
              "feedback": "The source fit is temperature-specific; this lecture supplies no extrapolation rule."
            },
            {
              "text": "Use any temperature without changing the rate laws",
              "feedback": "Unchanged coefficients at arbitrary temperature are not justified by the source."
            }
          ],
          "correct": 1,
          "hints": [{ "body": "Subtract the resting voltage before entering the empirical formula." }],
          "modelAnswer": [
            "The source fit is temperature-specific; this lecture supplies no extrapolation rule."
          ]
        }
      ]
    },
    {
      "id": "group",
      "title": "Predict excitability",
      "keyTerms": [],
      "source": "L07 PDF 32–33",
      "blocks": [
        {
          "type": "text",
          "body": ["Raised extracellular potassium makes $E_K$ less negative and depolarizes rest. A small rise can bring the axon closer to threshold. Sustained depolarization can reduce $h$ enough to suppress excitability. Predict the response from availability as well as distance to threshold."]
        },
        {
          "type": "detail",
          "title": "Extra detail from the slides",
          "blocks": [
            {
              "type": "figure",
              "visual": {
                "type": "widget",
                "name": "image-hotspots",
                "caption": "Lecture 7, PDF page 32. Group-work gating curves and interpretation prompts. Original labels, axes and scale bars retained.",
                "fallbackAlt": "Lecture 7, PDF page 32. Group-work gating curves and interpretation prompts. Original labels, axes and scale bars retained.",
                "props": {
                  "src": new URL('../../assets/figures/nbe-e4120/L07/group.webp', import.meta.url).href,
                  "alt": "Lecture 7, PDF page 32. Group-work gating curves and interpretation prompts. Original labels, axes and scale bars retained.",
                  "aspect": 0.8902743142144638,
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
          "id": "L07-group-check",
          "practice": "extra",
          "prompt": "Does sustained potassium-induced depolarization necessarily increase excitability?",
          "correct": 1,
          "options": [
            {
              "text": "Yes, depolarization always increases availability",
              "feedback": "Depolarization does not always increase excitability; sustained inactivation can limit available sodium channels."
            },
            {
              "text": "No, sustained inactivation can reduce availability",
              "feedback": "Sustained depolarization can reduce sodium availability through inactivation and lower excitability."
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
            "No, sustained inactivation can reduce availability."
          ]
        },
        {
          "id": "L07-group-starter",
          "practice": "extra",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L07 PDF 32–33",
          "prompt": "Which HH variable represents sodium availability in the group-work curves?",
          "options": [
            {
              "text": "$m$, the permissive activation variable",
              "feedback": "This factor represents sodium activation, not availability."
            },
            {
              "text": "$n$, the permissive activation variable",
              "feedback": "This factor represents potassium activation, not sodium availability."
            },
            {
              "text": "$h$, the permissive inactivation variable",
              "feedback": "Sodium availability is represented by the permissive inactivation factor."
            }
          ],
          "correct": 2,
          "hints": [{ "body": "Find the curve for sodium availability in the group-work panel." }],
          "modelAnswer": [
            "Sodium availability is represented by the permissive inactivation factor."
          ]
        }
      ]
    }
  ],
  "lectureQuiz": [
    {
      "id": "L07-recording-recall",
      "practice": "extra",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "recording",
      "prompt": "What does an overshoot establish?",
      "options": [
        {
          "text": "Inside stays negative relative to outside",
          "feedback": "Use this distinction: Inside becomes positive relative to outside."
        },
        {
          "text": "Inside becomes positive relative to outside",
          "feedback": "Correct. Inside becomes positive relative to outside."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Recall the distinction illustrated in this source figure."
        },
        {
          "body": "Separate the controlled condition from the outcome in the prompt."
        }
      ],
      "modelAnswer": [
        "Inside becomes positive relative to outside."
      ],
      "points": 1,
      "source": "L07 PDF 2"
    },
    {
      "id": "L07-model-recall",
      "practice": "extra",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "model",
      "prompt": "What was central to building the model?",
      "options": [
        {
          "text": "Squid axon recordings without voltage control",
          "feedback": "Use this distinction: Squid axon recordings under voltage clamp."
        },
        {
          "text": "Squid axon recordings under voltage clamp",
          "feedback": "Correct. Squid axon recordings under voltage clamp."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Recall the distinction illustrated in this source figure."
        },
        {
          "body": "Separate the controlled condition from the outcome in the prompt."
        }
      ],
      "modelAnswer": [
        "Squid axon recordings under voltage clamp."
      ],
      "points": 1,
      "source": "L07 PDF 3–4"
    },
    {
      "id": "L07-overshoot-recall",
      "practice": "extra",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "overshoot",
      "prompt": "What contradicts the zero-peak prediction?",
      "options": [
        {
          "text": "The action potential crosses above zero voltage",
          "feedback": "Correct. The action potential crosses above zero voltage."
        },
        {
          "text": "The action potential returns below zero voltage",
          "feedback": "Use this distinction: The action potential crosses above zero voltage."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Recall the distinction illustrated in this source figure."
        },
        {
          "body": "Separate the controlled condition from the outcome in the prompt."
        }
      ],
      "modelAnswer": [
        "The action potential crosses above zero voltage."
      ],
      "points": 1,
      "source": "L07 PDF 5"
    },
    {
      "id": "L07-ions-recall",
      "practice": "extra",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "ions",
      "prompt": "Which manipulation directly reduces sodium driving force?",
      "options": [
        {
          "text": "Raising outside sodium at fixed inside sodium",
          "feedback": "Use this distinction: Lowering outside sodium at fixed inside sodium."
        },
        {
          "text": "Lowering outside sodium at fixed inside sodium",
          "feedback": "Correct. Lowering outside sodium at fixed inside sodium."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Recall the distinction illustrated in this source figure."
        },
        {
          "body": "Separate the controlled condition from the outcome in the prompt."
        }
      ],
      "modelAnswer": [
        "Lowering outside sodium at fixed inside sodium."
      ],
      "points": 1,
      "source": "L07 PDF 6"
    },
    {
      "id": "L07-direct-nernst-shift",
      "sectionId": "ions",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Outside sodium falls from $120\\,\\mathrm{mM}$ to $60\\,\\mathrm{mM}$. Inside is fixed. Use $s=0.058\\,\\mathrm V$ to find the reversal shift.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Old outside",
              "answer": {
                "value": 120,
                "unit": "mM",
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
              "label": "New outside",
              "answer": {
                "value": 60,
                "unit": "mM",
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
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": -0.01745973974851091,
            "unit": "V",
            "tolerance": 5.2379219245532734e-05,
            "verification": {
              "relation": "nernst",
              "inputs": {
                "shortcut": 0.058,
                "z": 1,
                "outside": 60,
                "inside": 120
              },
              "displayScale": 1
            }
          },
          "tex": "\\Delta E=s\\log_{10}(C_{o,new}/C_{o,old})",
          "modelAnswer": [
            "Changing outside concentration shifts selective reversal logarithmically.",
            "$\\Delta E=0.058\\log_{10}(60/120)\\,\\mathrm V$",
            "$-0.01745974\\,\\mathrm{V}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\Delta E=s\\log_{10}(C_{o,new}/C_{o,old})$."
        },
        {
          "body": "Start with $\\Delta E=0.058\\log_{10}(60/120)\\,\\mathrm V$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Changing outside concentration shifts selective reversal logarithmically."
      ],
      "points": 1,
      "source": "L07 PDF 6"
    },
    {
      "id": "L07-tevc-recall",
      "practice": "extra",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "tevc",
      "prompt": "In the squid-axon two-electrode protocol, what does feedback control and what is the readout?",
      "options": [
        {
          "text": "Membrane voltage while measuring required current",
          "feedback": "Correct. Membrane voltage while measuring required current."
        },
        {
          "text": "Membrane current while measuring resulting voltage",
          "feedback": "Use this distinction: Membrane voltage while measuring required current."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Recall the distinction illustrated in this source figure."
        },
        {
          "body": "Separate the controlled condition from the outcome in the prompt."
        }
      ],
      "modelAnswer": [
        "Membrane voltage while measuring required current."
      ],
      "points": 1,
      "source": "L07 PDF 7"
    },
    {
      "id": "L07-components-recall",
      "practice": "extra",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "components",
      "prompt": "Can sodium current become outward?",
      "options": [
        {
          "text": "No, regardless of its reversal potential",
          "feedback": "Use this distinction: Yes, above its selective reversal potential."
        },
        {
          "text": "Yes, above its selective reversal potential",
          "feedback": "Correct. Yes, above its selective reversal potential."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Recall the distinction illustrated in this source figure."
        },
        {
          "body": "Separate the controlled condition from the outcome in the prompt."
        }
      ],
      "modelAnswer": [
        "Yes, above its selective reversal potential."
      ],
      "points": 1,
      "source": "L07 PDF 8"
    },
    {
      "id": "L07-reversal-recall",
      "practice": "extra",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "reversal",
      "prompt": "What vanishes at a selective reversal?",
      "options": [
        {
          "text": "The probability that the selective channel opens",
          "feedback": "Use this distinction: Net current through the selective open channel."
        },
        {
          "text": "Net current through the selective open channel",
          "feedback": "Correct. Net current through the selective open channel."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Recall the distinction illustrated in this source figure."
        },
        {
          "body": "Separate the controlled condition from the outcome in the prompt."
        }
      ],
      "modelAnswer": [
        "Net current through the selective open channel."
      ],
      "points": 1,
      "source": "L07 PDF 9"
    },
    {
      "id": "L07-concentration-recall",
      "practice": "extra",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "concentration",
      "prompt": "What is required for reference subtraction?",
      "options": [
        {
          "text": "Other current components stay comparable",
          "feedback": "Correct. Other current components stay comparable."
        },
        {
          "text": "All current components change independently",
          "feedback": "Use this distinction: Other current components stay comparable."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Recall the distinction illustrated in this source figure."
        },
        {
          "body": "Separate the controlled condition from the outcome in the prompt."
        }
      ],
      "modelAnswer": [
        "Other current components stay comparable."
      ],
      "points": 1,
      "source": "L07 PDF 10"
    },
    {
      "id": "L07-direct-subtract",
      "sectionId": "concentration",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Corrected control current is $-3\\,\\mathrm{nA}$; matched sodium-free current is $2\\,\\mathrm{nA}$. Find sodium current.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Control",
              "answer": {
                "value": -3e-09,
                "unit": "A",
                "tolerance": 3e-15,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -3e-09,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Reference",
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
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": -5e-09,
            "unit": "A",
            "tolerance": 1.5e-11,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": -3e-09,
                "b": -2e-09
              },
              "displayScale": 1
            }
          },
          "tex": "I_{Na}=I_{total}-I_K",
          "modelAnswer": [
            "Subtract the matched reference component with its signed current.",
            "$I_{Na}=(-3-2)\\,\\mathrm{nA}$",
            "$-5\\times10^{-9}\\,\\mathrm{A}$"
          ],
          "commonErrors": [
            {
              "wrongValue": -1e-09,
              "tolerance": 1e-12,
              "why": "Subtract the positive reference; adding it reverses the subtraction logic.",
              "verification": {
                "relation": "sum",
                "inputs": {
                  "a": -3e-09,
                  "b": 2e-09
                }
              }
            }
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $I_{Na}=I_{total}-I_K$."
        },
        {
          "body": "Start with $I_{Na}=(-3-2)\\,\\mathrm{nA}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Subtract the matched reference component with its signed current."
      ],
      "points": 1,
      "source": "L07 PDF 10"
    },
    {
      "id": "L07-substitution-recall",
      "practice": "extra",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "substitution",
      "prompt": "Which operation isolates sodium current?",
      "options": [
        {
          "text": "Normal current minus sodium-free current",
          "feedback": "Correct. Normal current minus sodium-free current."
        },
        {
          "text": "Sodium-free current minus normal current",
          "feedback": "Use this distinction: Normal current minus sodium-free current."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Recall the distinction illustrated in this source figure."
        },
        {
          "body": "Separate the controlled condition from the outcome in the prompt."
        }
      ],
      "modelAnswer": [
        "Normal current minus sodium-free current."
      ],
      "points": 1,
      "source": "L07 PDF 11"
    },
    {
      "id": "L07-blockers-recall",
      "practice": "extra",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "blockers",
      "prompt": "Which component remains after selective TTX?",
      "options": [
        {
          "text": "Potassium current after background correction",
          "feedback": "Correct. Potassium current after background correction."
        },
        {
          "text": "Sodium current after background correction",
          "feedback": "Use this distinction: Potassium current after background correction."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Recall the distinction illustrated in this source figure."
        },
        {
          "body": "Separate the controlled condition from the outcome in the prompt."
        }
      ],
      "modelAnswer": [
        "Potassium current after background correction."
      ],
      "points": 1,
      "source": "L07 PDF 12"
    },
    {
      "id": "L07-instant-protocol-recall",
      "practice": "extra",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "instant-protocol",
      "prompt": "What must remain approximately fixed?",
      "options": [
        {
          "text": "The driving force during the voltage change",
          "feedback": "Use this distinction: The gating state during the rapid comparison."
        },
        {
          "text": "The gating state during the rapid comparison",
          "feedback": "Correct. The gating state during the rapid comparison."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Recall the distinction illustrated in this source figure."
        },
        {
          "body": "Separate the controlled condition from the outcome in the prompt."
        }
      ],
      "modelAnswer": [
        "The gating state during the rapid comparison."
      ],
      "points": 1,
      "source": "L07 PDF 13"
    },
    {
      "id": "L07-instant-law-recall",
      "practice": "extra",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "instant-law",
      "prompt": "What does the instantaneous slope measure?",
      "options": [
        {
          "text": "Conductance at the fixed gating state",
          "feedback": "Correct. Conductance at the fixed gating state."
        },
        {
          "text": "Conductance after every gate equilibrates",
          "feedback": "Use this distinction: Conductance at the fixed gating state."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Recall the distinction illustrated in this source figure."
        },
        {
          "body": "Separate the controlled condition from the outcome in the prompt."
        }
      ],
      "modelAnswer": [
        "Conductance at the fixed gating state."
      ],
      "points": 1,
      "source": "L07 PDF 14"
    },
    {
      "id": "L07-direct-delta-current",
      "sectionId": "instant-law",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "A fixed $20\\,\\mathrm{nS}$ conductance sees a $15\\,\\mathrm{mV}$ positive jump. Find the signed current change.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Conductance",
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
              "label": "Voltage change",
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
          "title": "Evaluate",
          "answer": {
            "value": 3e-10,
            "unit": "A",
            "tolerance": 9e-13,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 2e-08,
                "b": 0.015
              },
              "displayScale": 1
            }
          },
          "tex": "\\Delta I=g\\Delta V",
          "modelAnswer": [
            "Current changes immediately with driving force at fixed gating.",
            "$\\Delta I=(20\\times10^{-9})(0.015)\\,\\mathrm A$",
            "$3\\times10^{-10}\\,\\mathrm{A}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\Delta I=g\\Delta V$."
        },
        {
          "body": "Start with $\\Delta I=(20\\times10^{-9})(0.015)\\,\\mathrm A$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Current changes immediately with driving force at fixed gating."
      ],
      "points": 1,
      "source": "L07 PDF 14"
    },
    {
      "id": "L07-direct-slope",
      "sectionId": "instant-law",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "An instantaneous current increases by $0.6\\,\\mathrm{nA}$ after a $20\\,\\mathrm{mV}$ increase. Find conductance.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Current difference",
              "answer": {
                "value": 6e-10,
                "unit": "A",
                "tolerance": 6e-16,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 6e-10,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Voltage difference",
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
          "title": "Evaluate",
          "answer": {
            "value": 3e-08,
            "unit": "S",
            "tolerance": 9e-11,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 6e-10,
                "b": 0.02
              },
              "displayScale": 1
            }
          },
          "tex": "g=\\Delta I/\\Delta V",
          "modelAnswer": [
            "At fixed gating the slope is conductance.",
            "$g=(0.6\\times10^{-9})/0.020\\,\\mathrm S$",
            "$3\\times10^{-8}\\,\\mathrm{S}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $g=\\Delta I/\\Delta V$."
        },
        {
          "body": "Start with $g=(0.6\\times10^{-9})/0.020\\,\\mathrm S$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "At fixed gating the slope is conductance."
      ],
      "points": 1,
      "source": "L07 PDF 14"
    },
    {
      "id": "L07-sodium-iv-recall",
      "practice": "extra",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "sodium-iv",
      "prompt": "Why can the peak relation be nonlinear?",
      "options": [
        {
          "text": "Different voltages recruit different gating states",
          "feedback": "Correct. Different voltages recruit different gating states."
        },
        {
          "text": "Every open pore must have nonlinear permeation",
          "feedback": "Use this distinction: Different voltages recruit different gating states."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Recall the distinction illustrated in this source figure."
        },
        {
          "body": "Separate the controlled condition from the outcome in the prompt."
        }
      ],
      "modelAnswer": [
        "Different voltages recruit different gating states."
      ],
      "points": 1,
      "source": "L07 PDF 15–16"
    },
    {
      "id": "L07-potassium-iv-recall",
      "practice": "extra",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "potassium-iv",
      "prompt": "What does a straight instantaneous relation support?",
      "options": [
        {
          "text": "Current proportional to fixed-gating driving force",
          "feedback": "Correct. Current proportional to fixed-gating driving force."
        },
        {
          "text": "Current independent of fixed-gating driving force",
          "feedback": "Use this distinction: Current proportional to fixed-gating driving force."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Recall the distinction illustrated in this source figure."
        },
        {
          "body": "Separate the controlled condition from the outcome in the prompt."
        }
      ],
      "modelAnswer": [
        "Current proportional to fixed-gating driving force."
      ],
      "points": 1,
      "source": "L07 PDF 17"
    },
    {
      "id": "L07-conductance-recall",
      "practice": "extra",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "conductance",
      "prompt": "Can zero current at reversal determine conductance?",
      "options": [
        {
          "text": "No, a nonzero driving-force measurement is needed",
          "feedback": "Correct. No, a nonzero driving-force measurement is needed."
        },
        {
          "text": "Yes, zero current always means zero conductance",
          "feedback": "Use this distinction: No, a nonzero driving-force measurement is needed."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Recall the distinction illustrated in this source figure."
        },
        {
          "body": "Separate the controlled condition from the outcome in the prompt."
        }
      ],
      "modelAnswer": [
        "No, a nonzero driving-force measurement is needed."
      ],
      "points": 1,
      "source": "L07 PDF 18"
    },
    {
      "id": "L07-direct-ohmic",
      "sectionId": "conductance",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Potassium conductance is $10\\,\\mathrm{nS}$ and driving force is $40\\,\\mathrm{mV}$. Find current.",
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
            "value": 4e-10,
            "unit": "A",
            "tolerance": 1.2000000000000001e-12,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 1e-08,
                "b": 0.04
              },
              "displayScale": 1
            }
          },
          "tex": "I=g(V_m-E)",
          "modelAnswer": [
            "Conductance is nonnegative; driving force sets current sign.",
            "$I=(10\\times10^{-9})(0.040)\\,\\mathrm A$",
            "$4\\times10^{-10}\\,\\mathrm{A}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $I=g(V_m-E)$."
        },
        {
          "body": "Start with $I=(10\\times10^{-9})(0.040)\\,\\mathrm A$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Conductance is nonnegative; driving force sets current sign."
      ],
      "points": 1,
      "source": "L07 PDF 18"
    },
    {
      "id": "L07-sensors-recall",
      "practice": "extra",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "sensors",
      "prompt": "What does a voltage sensor respond to?",
      "options": [
        {
          "text": "The recording electrode’s metal composition",
          "feedback": "Use this distinction: The electric field across the membrane."
        },
        {
          "text": "The electric field across the membrane",
          "feedback": "Correct. The electric field across the membrane."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Recall the distinction illustrated in this source figure."
        },
        {
          "body": "Separate the controlled condition from the outcome in the prompt."
        }
      ],
      "modelAnswer": [
        "The electric field across the membrane."
      ],
      "points": 1,
      "source": "L07 PDF 19"
    },
    {
      "id": "L07-gates-recall",
      "practice": "extra",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "gates",
      "prompt": "Which variable represents sodium availability?",
      "options": [
        {
          "text": "$h$, the permissive inactivation probability",
          "feedback": "Correct. $h$, the permissive inactivation probability."
        },
        {
          "text": "$n$, the permissive potassium probability",
          "feedback": "Use this distinction: $h$, the permissive inactivation probability."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Recall the distinction illustrated in this source figure."
        },
        {
          "body": "Separate the controlled condition from the outcome in the prompt."
        }
      ],
      "modelAnswer": [
        "$h$, the permissive inactivation probability."
      ],
      "points": 1,
      "source": "L07 PDF 20"
    },
    {
      "id": "L07-gating-match",
      "type": "classify",
      "difficulty": "easy",
      "sectionId": "gates",
      "prompt": "Match the role to its gating variable.",
      "categories": [
        "m",
        "h",
        "n"
      ],
      "items": [
        {
          "text": "Sodium activation",
          "answer": "m"
        },
        {
          "text": "Sodium availability",
          "answer": "h"
        },
        {
          "text": "Potassium activation",
          "answer": "n"
        }
      ],
      "hints": [
        {
          "body": "Separate activation from availability."
        },
        {
          "body": "Only one variable is potassium-specific."
        }
      ],
      "modelAnswer": [
        "$m$ is sodium activation; $h$ is availability; $n$ is potassium activation."
      ],
      "points": 1,
      "source": "L07 PDF20,23–24"
    },
    {
      "id": "L07-states-recall",
      "practice": "extra",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "states",
      "prompt": "Which state is unavailable for immediate activation?",
      "options": [
        {
          "text": "The closed but available channel state",
          "feedback": "Use this distinction: The inactivated nonconducting state."
        },
        {
          "text": "The inactivated nonconducting state",
          "feedback": "Correct. The inactivated nonconducting state."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Recall the distinction illustrated in this source figure."
        },
        {
          "body": "Separate the controlled condition from the outcome in the prompt."
        }
      ],
      "modelAnswer": [
        "The inactivated nonconducting state."
      ],
      "points": 1,
      "source": "L07 PDF 21"
    },
    {
      "id": "L07-availability-facts",
      "sectionId": "states",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "An inactivated sodium channel is immediately available for activation.",
          "answer": false,
          "correction": "An inactivated channel must recover before it is available."
        },
        {
          "text": "An open selective channel can carry zero net current at reversal.",
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
        "An inactivated channel must recover before it is available.",
        "An open selective channel can carry zero net current at reversal."
      ],
      "points": 1,
      "source": "L07 PDF 21"
    },
    {
      "id": "L07-inactivation-recall",
      "practice": "extra",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "inactivation",
      "prompt": "What does a longer depolarizing prepulse reduce?",
      "options": [
        {
          "text": "Sodium reversal during the later test pulse",
          "feedback": "Use this distinction: Sodium availability during the later test pulse."
        },
        {
          "text": "Sodium availability during the later test pulse",
          "feedback": "Correct. Sodium availability during the later test pulse."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Recall the distinction illustrated in this source figure."
        },
        {
          "body": "Separate the controlled condition from the outcome in the prompt."
        }
      ],
      "modelAnswer": [
        "Sodium availability during the later test pulse."
      ],
      "points": 1,
      "source": "L07 PDF 22"
    },
    {
      "id": "L07-products-recall",
      "practice": "extra",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "products",
      "prompt": "Does a permissive sodium activation particle imply an open channel?",
      "options": [
        {
          "text": "Yes, one permissive particle guarantees conduction",
          "feedback": "Use this distinction: No, other required particles must be permissive."
        },
        {
          "text": "No, other required particles must be permissive",
          "feedback": "Correct. No, other required particles must be permissive."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Recall the distinction illustrated in this source figure."
        },
        {
          "body": "Separate the controlled condition from the outcome in the prompt."
        }
      ],
      "modelAnswer": [
        "No, other required particles must be permissive."
      ],
      "points": 1,
      "source": "L07 PDF 23"
    },
    {
      "id": "L07-direct-particle-power",
      "sectionId": "products",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Four independent required particles each have probability $0.6$. Find the channel open fraction.",
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
              "label": "Count",
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
            "value": 0.1296,
            "unit": "",
            "tolerance": 0.00038879999999999996,
            "verification": {
              "relation": "gatePower",
              "inputs": {
                "y": 0.6,
                "count": 4
              },
              "displayScale": 1
            }
          },
          "tex": "Y=y^P",
          "modelAnswer": [
            "All-required independent particle probabilities multiply.",
            "$Y=0.6^4$",
            "$0.1296$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $Y=y^P$."
        },
        {
          "body": "Start with $Y=0.6^4$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "All-required independent particle probabilities multiply."
      ],
      "points": 1,
      "source": "L07 PDF 23"
    },
    {
      "id": "L07-direct-gna",
      "practice": "extra",
      "sectionId": "products",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $\\bar g_{Na}=100\\,\\mathrm{nS}$ and $Y_{Na}=0.08$. Find sodium conductance.",
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
              "label": "Open fraction",
              "answer": {
                "value": 0.08,
                "unit": "",
                "tolerance": 8e-08,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.08,
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
              "relation": "product",
              "inputs": {
                "a": 1e-07,
                "b": 0.08
              },
              "displayScale": 1
            }
          },
          "tex": "g_{Na}=\\bar g_{Na}Y_{Na}",
          "modelAnswer": [
            "Open fraction scales maximum sodium conductance.",
            "$g_{Na}=(100\\times10^{-9})(0.08)\\,\\mathrm S$",
            "$8\\times10^{-9}\\,\\mathrm{S}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $g_{Na}=\\bar g_{Na}Y_{Na}$."
        },
        {
          "body": "Start with $g_{Na}=(100\\times10^{-9})(0.08)\\,\\mathrm S$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Open fraction scales maximum sodium conductance."
      ],
      "points": 1,
      "source": "L07 PDF 23"
    },
    {
      "id": "L07-structure-recall",
      "practice": "extra",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "structure",
      "prompt": "Which fitted probability belongs to potassium?",
      "options": [
        {
          "text": "$n^4$, four all-required activation factors",
          "feedback": "Correct. $n^4$, four all-required activation factors."
        },
        {
          "text": "$m^3h$, activation and availability factors",
          "feedback": "Use this distinction: $n^4$, four all-required activation factors."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Recall the distinction illustrated in this source figure."
        },
        {
          "body": "Separate the controlled condition from the outcome in the prompt."
        }
      ],
      "modelAnswer": [
        "$n^4$, four all-required activation factors."
      ],
      "points": 1,
      "source": "L07 PDF 24"
    },
    {
      "id": "L07-balance-recall",
      "practice": "extra",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "balance",
      "prompt": "Which term removes permissive probability?",
      "options": [
        {
          "text": "$\\alpha(1-y)$, the opening flux",
          "feedback": "Use this distinction: $\\beta y$, the closing flux."
        },
        {
          "text": "$\\beta y$, the closing flux",
          "feedback": "Correct. $\\beta y$, the closing flux."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Recall the distinction illustrated in this source figure."
        },
        {
          "body": "Separate the controlled condition from the outcome in the prompt."
        }
      ],
      "modelAnswer": [
        "$\\beta y$, the closing flux."
      ],
      "points": 1,
      "source": "L07 PDF 25"
    },
    {
      "id": "L07-relaxation-facts",
      "sectionId": "balance",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "The steady fraction alone determines $\\tau$.",
          "answer": false,
          "correction": "The fraction determines the rate ratio; the rate sum determines the time constant."
        },
        {
          "text": "$y(t)$ must remain between its initial and steady probabilities at a fixed voltage.",
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
        "The fraction determines the rate ratio; the rate sum determines the time constant.",
        "$y(t)$ must remain between its initial and steady probabilities at a fixed voltage."
      ],
      "points": 1,
      "source": "L07 PDF 25"
    },
    {
      "id": "L07-direct-derivative",
      "sectionId": "balance",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "At $y=0.4$, $\\alpha=200\\,\\mathrm{s^{-1}}$ and $\\beta=50\\,\\mathrm{s^{-1}}$, find the derivative.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Forward rate",
              "answer": {
                "value": 200,
                "unit": "1/s",
                "tolerance": 0.00019999999999999998,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 200,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Backward rate",
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
              "label": "Probability",
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
          "title": "Evaluate",
          "answer": {
            "value": 100,
            "unit": "1/s",
            "tolerance": 0.3,
            "verification": {
              "relation": "gateDerivative",
              "inputs": {
                "alpha": 200,
                "beta": 50,
                "y": 0.4
              },
              "displayScale": 1
            }
          },
          "tex": "\\frac{dy}{dt}=\\alpha(1-y)-\\beta y",
          "modelAnswer": [
            "Forward transitions add and backward transitions remove permissive probability.",
            "$\\dot y=200(1-0.4)-50(0.4)\\,\\mathrm{s^{-1}}$",
            "$100\\,\\mathrm{s^{-1}}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\frac{dy}{dt}=\\alpha(1-y)-\\beta y$."
        },
        {
          "body": "Start with $\\dot y=200(1-0.4)-50(0.4)\\,\\mathrm{s^{-1}}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Forward transitions add and backward transitions remove permissive probability."
      ],
      "points": 1,
      "source": "L07 PDF 25"
    },
    {
      "id": "L07-direct-steady",
      "sectionId": "balance",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Forward rate is $300\\,\\mathrm{s^{-1}}$ and backward rate $100\\,\\mathrm{s^{-1}}$. Find steady probability.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Forward rate",
              "answer": {
                "value": 300,
                "unit": "1/s",
                "tolerance": 0.0003,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 300,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Backward rate",
              "answer": {
                "value": 100,
                "unit": "1/s",
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
          "title": "Evaluate",
          "answer": {
            "value": 0.75,
            "unit": "",
            "tolerance": 0.0022500000000000003,
            "verification": {
              "relation": "gateSteady",
              "inputs": {
                "alpha": 300,
                "beta": 100
              },
              "displayScale": 1
            }
          },
          "tex": "y_\\infty=\\alpha/(\\alpha+\\beta)",
          "modelAnswer": [
            "Steady forward and backward transition fluxes balance.",
            "$y_\\infty=300/(300+100)$",
            "$0.75$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $y_\\infty=\\alpha/(\\alpha+\\beta)$."
        },
        {
          "body": "Start with $y_\\infty=300/(300+100)$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Steady forward and backward transition fluxes balance."
      ],
      "points": 1,
      "source": "L07 PDF 25"
    },
    {
      "id": "L07-direct-tau",
      "practice": "extra",
      "sectionId": "balance",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Forward plus backward rate is $500\\,\\mathrm{s^{-1}}$. Find the time constant.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Rate sum",
              "answer": {
                "value": 500,
                "unit": "1/s",
                "tolerance": 0.0005,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 500,
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
                "a": 1,
                "b": 500
              },
              "displayScale": 1
            }
          },
          "tex": "\\tau=1/(\\alpha+\\beta)",
          "modelAnswer": [
            "The rate sum sets the speed of relaxation.",
            "$\\tau=1/500\\,\\mathrm s$",
            "$0.002\\,\\mathrm{s}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\tau=1/(\\alpha+\\beta)$."
        },
        {
          "body": "Start with $\\tau=1/500\\,\\mathrm s$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "The rate sum sets the speed of relaxation."
      ],
      "points": 1,
      "source": "L07 PDF 25"
    },
    {
      "id": "L07-relaxation-recall",
      "practice": "extra",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "relaxation",
      "prompt": "Which quantity stays continuous across an ideal voltage step?",
      "options": [
        {
          "text": "Every ionic current component",
          "feedback": "Use this distinction: The finite-rate gating probability."
        },
        {
          "text": "The finite-rate gating probability",
          "feedback": "Correct. The finite-rate gating probability."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Recall the distinction illustrated in this source figure."
        },
        {
          "body": "Separate the controlled condition from the outcome in the prompt."
        }
      ],
      "modelAnswer": [
        "The finite-rate gating probability."
      ],
      "points": 1,
      "source": "L07 PDF 26"
    },
    {
      "id": "L07-direct-relax",
      "sectionId": "relaxation",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $y_0=0.2$, $y_\\infty=0.8$, $\\tau=4\\,\\mathrm{ms}$ and $t=4\\,\\mathrm{ms}$. Find probability.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Initial",
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
              "label": "Steady",
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
              "label": "Time",
              "answer": {
                "value": 0.004,
                "unit": "s",
                "tolerance": 4e-09,
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
              "label": "Time constant",
              "answer": {
                "value": 0.004,
                "unit": "s",
                "tolerance": 4e-09,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.004,
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
            "value": 0.5792723352971346,
            "unit": "",
            "tolerance": 0.001737817005891404,
            "verification": {
              "relation": "gateRelax",
              "inputs": {
                "y0": 0.2,
                "steady": 0.8,
                "time": 0.004,
                "tau": 0.004
              },
              "displayScale": 1
            }
          },
          "tex": "y(t)=y_\\infty+(y_0-y_\\infty)e^{-t/\\tau}",
          "modelAnswer": [
            "Probability moves between its initial and steady limits.",
            "$y=0.8+(0.2-0.8)e^{-1}$",
            "$0.57927234$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $y(t)=y_\\infty+(y_0-y_\\infty)e^{-t/\\tau}$."
        },
        {
          "body": "Start with $y=0.8+(0.2-0.8)e^{-1}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Probability moves between its initial and steady limits."
      ],
      "points": 1,
      "source": "L07 PDF 26"
    },
    {
      "id": "L07-time-courses-recall",
      "practice": "extra",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "time-courses",
      "prompt": "Why can sodium conductance be transient?",
      "options": [
        {
          "text": "Activation and availability both stay fixed",
          "feedback": "Use this distinction: Activation grows while availability declines."
        },
        {
          "text": "Activation grows while availability declines",
          "feedback": "Correct. Activation grows while availability declines."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Recall the distinction illustrated in this source figure."
        },
        {
          "body": "Separate the controlled condition from the outcome in the prompt."
        }
      ],
      "modelAnswer": [
        "Activation grows while availability declines."
      ],
      "points": 1,
      "source": "L07 PDF 27"
    },
    {
      "id": "L07-fit-recall",
      "practice": "extra",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "fit",
      "prompt": "How is potassium steady activation obtained?",
      "options": [
        {
          "text": "Fourth power of the normalized conductance",
          "feedback": "Use this distinction: Fourth root of the normalized conductance."
        },
        {
          "text": "Fourth root of the normalized conductance",
          "feedback": "Correct. Fourth root of the normalized conductance."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Recall the distinction illustrated in this source figure."
        },
        {
          "body": "Separate the controlled condition from the outcome in the prompt."
        }
      ],
      "modelAnswer": [
        "Fourth root of the normalized conductance."
      ],
      "points": 1,
      "source": "L07 PDF 28"
    },
    {
      "id": "L07-direct-root",
      "sectionId": "fit",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Steady potassium conductance is $8.1\\,\\mathrm{nS}$ of a maximum $100\\,\\mathrm{nS}$. Find steady activation.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Steady conductance",
              "answer": {
                "value": 8.1e-09,
                "unit": "S",
                "tolerance": 8.1e-15,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 8.1e-09,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
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
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 0.5334838230116768,
            "unit": "",
            "tolerance": 0.0016004514690350306,
            "verification": {
              "relation": "powerRatio",
              "inputs": {
                "a": 8.1e-09,
                "b": 1e-07,
                "power": 0.25
              },
              "displayScale": 1
            }
          },
          "tex": "n_\\infty=(g_{K,\\infty}/\\bar g_K)^{1/4}",
          "modelAnswer": [
            "Take a fourth root, not the conductance fraction itself.",
            "$n_\\infty=(8.1/100)^{1/4}$",
            "$0.53348382$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $n_\\infty=(g_{K,\\infty}/\\bar g_K)^{1/4}$."
        },
        {
          "body": "Start with $n_\\infty=(8.1/100)^{1/4}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Take a fourth root, not the conductance fraction itself."
      ],
      "points": 1,
      "source": "L07 PDF 28"
    },
    {
      "id": "L07-direct-barrier-open",
      "sectionId": "fit",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use baseline $40\\,\\mathrm{s^{-1}}$, $\\gamma=0.5$ and $q=1$. Evaluate barrier open rate.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Baseline",
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
              "label": "Electrical distance",
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
            },
            {
              "label": "Dimensionless energy",
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
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 65.94885082800513,
            "unit": "1/s",
            "tolerance": 0.19784655248401542,
            "verification": {
              "relation": "exponentialRate",
              "inputs": {
                "base": 40,
                "exponent": 0.5
              },
              "displayScale": 1
            }
          },
          "tex": "\\alpha=\\alpha_0 e^{\\gamma q}",
          "modelAnswer": [
            "Availability has opposite voltage polarity to activation.",
            "$40e^{0.5}\\,\\mathrm{s^{-1}}$",
            "$65.948851\\,\\mathrm{s^{-1}}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\alpha=\\alpha_0 e^{\\gamma q}$."
        },
        {
          "body": "Start with $40e^{0.5}\\,\\mathrm{s^{-1}}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Availability has opposite voltage polarity to activation."
      ],
      "points": 1,
      "source": "L07 PDF 28"
    },
    {
      "id": "L07-direct-barrier-close",
      "practice": "extra",
      "sectionId": "fit",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use baseline $40\\,\\mathrm{s^{-1}}$, $\\gamma=0.5$ and $q=1$. Evaluate barrier close rate.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Baseline",
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
              "label": "Electrical distance",
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
            },
            {
              "label": "Dimensionless energy",
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
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 24.261226388505335,
            "unit": "1/s",
            "tolerance": 0.07278367916551601,
            "verification": {
              "relation": "exponentialRate",
              "inputs": {
                "base": 40,
                "exponent": -0.5
              },
              "displayScale": 1
            }
          },
          "tex": "\\beta=\\beta_0 e^{-(1-\\gamma)q}",
          "modelAnswer": [
            "Availability has opposite voltage polarity to activation.",
            "$40e^{-0.5}\\,\\mathrm{s^{-1}}$",
            "$24.261226\\,\\mathrm{s^{-1}}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\beta=\\beta_0 e^{-(1-\\gamma)q}$."
        },
        {
          "body": "Start with $40e^{-0.5}\\,\\mathrm{s^{-1}}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Availability has opposite voltage polarity to activation."
      ],
      "points": 1,
      "source": "L07 PDF 28"
    },
    {
      "id": "L07-direct-availability-open",
      "practice": "extra",
      "sectionId": "fit",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use baseline $40\\,\\mathrm{s^{-1}}$, $\\gamma=0.5$ and $q=1$. Evaluate availability open rate.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Baseline",
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
              "label": "Electrical distance",
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
            },
            {
              "label": "Dimensionless energy",
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
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 24.261226388505335,
            "unit": "1/s",
            "tolerance": 0.07278367916551601,
            "verification": {
              "relation": "exponentialRate",
              "inputs": {
                "base": 40,
                "exponent": -0.5
              },
              "displayScale": 1
            }
          },
          "tex": "\\alpha_h=\\alpha_{h0} e^{-(1-\\gamma)q}",
          "modelAnswer": [
            "Availability has opposite voltage polarity to activation.",
            "$40e^{-0.5}\\,\\mathrm{s^{-1}}$",
            "$24.261226\\,\\mathrm{s^{-1}}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\alpha_h=\\alpha_{h0} e^{-(1-\\gamma)q}$."
        },
        {
          "body": "Start with $40e^{-0.5}\\,\\mathrm{s^{-1}}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Availability has opposite voltage polarity to activation."
      ],
      "points": 1,
      "source": "L07 PDF 28"
    },
    {
      "id": "L07-direct-availability-close",
      "practice": "extra",
      "sectionId": "fit",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use baseline $40\\,\\mathrm{s^{-1}}$, $\\gamma=0.5$ and $q=1$. Evaluate availability close rate.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Baseline",
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
              "label": "Electrical distance",
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
            },
            {
              "label": "Dimensionless energy",
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
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 65.94885082800513,
            "unit": "1/s",
            "tolerance": 0.19784655248401542,
            "verification": {
              "relation": "exponentialRate",
              "inputs": {
                "base": 40,
                "exponent": 0.5
              },
              "displayScale": 1
            }
          },
          "tex": "\\beta_h=\\beta_{h0}e^{\\gamma q}",
          "modelAnswer": [
            "Availability has opposite voltage polarity to activation.",
            "$40e^{0.5}\\,\\mathrm{s^{-1}}$",
            "$65.948851\\,\\mathrm{s^{-1}}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\beta_h=\\beta_{h0}e^{\\gamma q}$."
        },
        {
          "body": "Start with $40e^{0.5}\\,\\mathrm{s^{-1}}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Availability has opposite voltage polarity to activation."
      ],
      "points": 1,
      "source": "L07 PDF 28"
    },
    {
      "id": "L07-steady-curves-recall",
      "practice": "extra",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "steady-curves",
      "prompt": "Which curve decreases during steady depolarization?",
      "options": [
        {
          "text": "Sodium availability rather than sodium activation",
          "feedback": "Correct. Sodium availability rather than sodium activation."
        },
        {
          "text": "Sodium activation rather than sodium availability",
          "feedback": "Use this distinction: Sodium availability rather than sodium activation."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Recall the distinction illustrated in this source figure."
        },
        {
          "body": "Separate the controlled condition from the outcome in the prompt."
        }
      ],
      "modelAnswer": [
        "Sodium availability rather than sodium activation."
      ],
      "points": 1,
      "source": "L07 PDF 29"
    },
    {
      "id": "L07-infer-recall",
      "practice": "extra",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "infer",
      "prompt": "What extra datum identifies rates beyond a steady fraction?",
      "options": [
        {
          "text": "The ionic reversal potential at that voltage",
          "feedback": "Use this distinction: The relaxation time constant at that voltage."
        },
        {
          "text": "The relaxation time constant at that voltage",
          "feedback": "Correct. The relaxation time constant at that voltage."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Recall the distinction illustrated in this source figure."
        },
        {
          "body": "Separate the controlled condition from the outcome in the prompt."
        }
      ],
      "modelAnswer": [
        "The relaxation time constant at that voltage."
      ],
      "points": 1,
      "source": "L07 PDF 30"
    },
    {
      "id": "L07-direct-forward",
      "practice": "extra",
      "sectionId": "infer",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $y_\\infty=0.65$ and $\\tau=5\\,\\mathrm{ms}$ to find the forward rate.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Steady probability",
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
              "label": "Time constant",
              "answer": {
                "value": 0.005,
                "unit": "s",
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
            "value": 130,
            "unit": "1/s",
            "tolerance": 0.39,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 0.65,
                "b": 0.005
              },
              "displayScale": 1
            }
          },
          "tex": "\\alpha=y_\\infty/\\tau",
          "modelAnswer": [
            "Fraction and speed together determine the rate.",
            "$\\alpha=y_\\infty/\\tau$",
            "$130\\,\\mathrm{s^{-1}}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\alpha=y_\\infty/\\tau$."
        },
        {
          "body": "Start with $\\alpha=y_\\infty/\\tau$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Fraction and speed together determine the rate."
      ],
      "points": 1,
      "source": "L07 PDF 30"
    },
    {
      "id": "L07-direct-backward",
      "practice": "extra",
      "sectionId": "infer",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $y_\\infty=0.65$ and $\\tau=5\\,\\mathrm{ms}$ to find the backward rate.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Steady probability",
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
              "label": "Time constant",
              "answer": {
                "value": 0.005,
                "unit": "s",
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
            "value": 70,
            "unit": "1/s",
            "tolerance": 0.21,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 0.35,
                "b": 0.005
              },
              "displayScale": 1
            }
          },
          "tex": "\\beta=(1-y_\\infty)/\\tau",
          "modelAnswer": [
            "Fraction and speed together determine the rate.",
            "$\\beta=(1-y_\\infty)/\\tau$",
            "$70\\,\\mathrm{s^{-1}}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\beta=(1-y_\\infty)/\\tau$."
        },
        {
          "body": "Start with $\\beta=(1-y_\\infty)/\\tau$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Fraction and speed together determine the rate."
      ],
      "points": 1,
      "source": "L07 PDF 30"
    },
    {
      "id": "L07-empirical-recall",
      "practice": "extra",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "empirical",
      "prompt": "Which input belongs in the unshifted empirical laws?",
      "options": [
        {
          "text": "Depolarization relative to the resting potential",
          "feedback": "Correct. Depolarization relative to the resting potential."
        },
        {
          "text": "Absolute inside voltage relative to the outside",
          "feedback": "Use this distinction: Depolarization relative to the resting potential."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Recall the distinction illustrated in this source figure."
        },
        {
          "body": "Separate the controlled condition from the outcome in the prompt."
        }
      ],
      "modelAnswer": [
        "Depolarization relative to the resting potential."
      ],
      "points": 1,
      "source": "L07 PDF 31"
    },
    {
      "id": "L07-group-recall",
      "practice": "extra",
      "type": "mc",
      "difficulty": "easy",
      "sectionId": "group",
      "prompt": "Does strong depolarization always increase excitability?",
      "options": [
        {
          "text": "No, sustained inactivation can reduce availability",
          "feedback": "Correct. No, sustained inactivation can reduce availability."
        },
        {
          "text": "Yes, depolarization always increases availability",
          "feedback": "Use this distinction: No, sustained inactivation can reduce availability."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Recall the distinction illustrated in this source figure."
        },
        {
          "body": "Separate the controlled condition from the outcome in the prompt."
        }
      ],
      "modelAnswer": [
        "No, sustained inactivation can reduce availability."
      ],
      "points": 1,
      "source": "L07 PDF 32–33"
    },
    {
      "id": "L07-recording-explain",
      "sectionId": "recording",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain the mechanism and experimental limitation in this segment: Intracellular recording and the preassignment.",
      "hints": [
        {
          "body": "Separate the imposed voltage, ionic driving force and gating state."
        },
        {
          "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
        }
      ],
      "markScheme": [
        {
          "text": "Large diameter permits intracellular insertion."
        },
        {
          "text": "The cut end can be injured and produce a smaller recorded action potential."
        },
        {
          "text": "A larger signal farther from the cut end need not mean increasing intrinsic excitability."
        },
        {
          "text": "The article-specific rest value and stimulation protocol are not established by the supplied excerpt."
        }
      ],
      "modelAnswer": [
        "Large diameter permits intracellular insertion.",
        "The cut end can be injured and produce a smaller recorded action potential.",
        "A larger signal farther from the cut end need not mean increasing intrinsic excitability.",
        "The article-specific rest value and stimulation protocol are not established by the supplied excerpt."
      ],
      "points": 1,
      "source": "L07 PDF 2",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 7, PDF page 2. Historical squid intracellular electrode and action-potential recording with the supplied scale bar. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 7, PDF page 2. Historical squid intracellular electrode and action-potential recording with the supplied scale bar. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L07/recording.webp', import.meta.url).href,
          "alt": "Lecture 7, PDF page 2. Historical squid intracellular electrode and action-potential recording with the supplied scale bar. Original labels, axes and scale bars retained.",
          "aspect": 0.5186751233262861,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L07-model-explain",
      "sectionId": "model",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain the mechanism and experimental limitation in this segment: From experiments to a predictive model.",
      "hints": [
        {
          "body": "Separate the imposed voltage, ionic driving force and gating state."
        },
        {
          "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
        }
      ],
      "markScheme": [
        {
          "text": "The model arose from squid voltage-clamp experiments."
        },
        {
          "text": "It describes voltage- and time-dependent conductances."
        },
        {
          "text": "Waveform, refractoriness and accommodation are model predictions."
        },
        {
          "text": "A good fit is evidence, not a unique molecular identification."
        }
      ],
      "modelAnswer": [
        "The model arose from squid voltage-clamp experiments.",
        "It describes voltage- and time-dependent conductances.",
        "Waveform, refractoriness and accommodation are model predictions.",
        "A good fit is evidence, not a unique molecular identification."
      ],
      "points": 1,
      "source": "L07 PDF 3–4",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 7, PDF page 3. Supplied HH-model waveform compared with a recorded action potential. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 7, PDF page 3. Supplied HH-model waveform compared with a recorded action potential. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L07/prediction.webp', import.meta.url).href,
          "alt": "Lecture 7, PDF page 3. Supplied HH-model waveform compared with a recorded action potential. Original labels, axes and scale bars retained.",
          "aspect": 0.8561151079136691,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L07-overshoot-explain",
      "sectionId": "overshoot",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain the mechanism and experimental limitation in this segment: Overshoot challenges loss of selectivity.",
      "hints": [
        {
          "body": "Separate the imposed voltage, ionic driving force and gating state."
        },
        {
          "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
        }
      ],
      "markScheme": [
        {
          "text": "Loss of selectivity predicts approach toward zero."
        },
        {
          "text": "The observed overshoot exceeds that prediction."
        },
        {
          "text": "External sodium dependence supports a sodium-selective conductance increase."
        }
      ],
      "modelAnswer": [
        "Loss of selectivity predicts approach toward zero.",
        "The observed overshoot exceeds that prediction.",
        "External sodium dependence supports a sodium-selective conductance increase."
      ],
      "points": 1,
      "source": "L07 PDF 5",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 7, PDF page 2. Historical squid intracellular electrode and action-potential recording with the supplied scale bar. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 7, PDF page 2. Historical squid intracellular electrode and action-potential recording with the supplied scale bar. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L07/recording.webp', import.meta.url).href,
          "alt": "Lecture 7, PDF page 2. Historical squid intracellular electrode and action-potential recording with the supplied scale bar. Original labels, axes and scale bars retained.",
          "aspect": 0.5186751233262861,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L07-ions-explain",
      "sectionId": "ions",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain the mechanism and experimental limitation in this segment: Change extracellular sodium or potassium.",
      "hints": [
        {
          "body": "Separate the imposed voltage, ionic driving force and gating state."
        },
        {
          "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
        }
      ],
      "markScheme": [
        {
          "text": "Lower external sodium lowers its equilibrium potential."
        },
        {
          "text": "At a fixed voltage it reduces inward sodium driving force."
        },
        {
          "text": "The upstroke and peak decline in the illustrated experiment."
        },
        {
          "text": "Rest and afterpotential are more sensitive to potassium in that setting."
        }
      ],
      "modelAnswer": [
        "Lower external sodium lowers its equilibrium potential.",
        "At a fixed voltage it reduces inward sodium driving force.",
        "The upstroke and peak decline in the illustrated experiment.",
        "Rest and afterpotential are more sensitive to potassium in that setting."
      ],
      "points": 1,
      "source": "L07 PDF 6",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 7, PDF page 6. Source sodium concentration manipulation and voltage plots. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 7, PDF page 6. Source sodium concentration manipulation and voltage plots. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L07/ions.webp', import.meta.url).href,
          "alt": "Lecture 7, PDF page 6. Source sodium concentration manipulation and voltage plots. Original labels, axes and scale bars retained.",
          "aspect": 1.1323529411764706,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L07-tevc-explain",
      "sectionId": "tevc",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain the mechanism and experimental limitation in this segment: Two electrodes and negative feedback.",
      "hints": [
        {
          "body": "Separate the imposed voltage, ionic driving force and gating state."
        },
        {
          "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
        }
      ],
      "markScheme": [
        {
          "text": "The voltage electrode measures membrane voltage."
        },
        {
          "text": "Feedback compares it with the command."
        },
        {
          "text": "The current electrode supplies the compensating current."
        },
        {
          "text": "Exclude capacitive transients and specify injection versus outward-current polarity."
        }
      ],
      "modelAnswer": [
        "The voltage electrode measures membrane voltage.",
        "Feedback compares it with the command.",
        "The current electrode supplies the compensating current.",
        "Exclude capacitive transients and specify injection versus outward-current polarity."
      ],
      "points": 1,
      "source": "L07 PDF 7",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 7, PDF page 7. Two-electrode feedback circuit with voltage and current electrodes. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 7, PDF page 7. Two-electrode feedback circuit with voltage and current electrodes. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L07/clamp.webp', import.meta.url).href,
          "alt": "Lecture 7, PDF page 7. Two-electrode feedback circuit with voltage and current electrodes. Original labels, axes and scale bars retained.",
          "aspect": 1.5227817745803358,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L07-components-explain",
      "sectionId": "components",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain the mechanism and experimental limitation in this segment: Early transient and late sustained currents.",
      "hints": [
        {
          "body": "Separate the imposed voltage, ionic driving force and gating state."
        },
        {
          "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
        }
      ],
      "markScheme": [
        {
          "text": "Early current activates and inactivates rapidly."
        },
        {
          "text": "Late current activates more slowly and persists."
        },
        {
          "text": "Different reversals support distinct components."
        },
        {
          "text": "Direction alone cannot identify the permeant ion."
        }
      ],
      "modelAnswer": [
        "Early current activates and inactivates rapidly.",
        "Late current activates more slowly and persists.",
        "Different reversals support distinct components.",
        "Direction alone cannot identify the permeant ion."
      ],
      "points": 1,
      "source": "L07 PDF 8",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 7, PDF page 8. Command steps and early transient/late sustained currents. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 7, PDF page 8. Command steps and early transient/late sustained currents. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L07/currents.webp', import.meta.url).href,
          "alt": "Lecture 7, PDF page 8. Command steps and early transient/late sustained currents. Original labels, axes and scale bars retained.",
          "aspect": 1.103864734299517,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L07-reversal-explain",
      "sectionId": "reversal",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain the mechanism and experimental limitation in this segment: Identify a selective current by reversal.",
      "hints": [
        {
          "body": "Separate the imposed voltage, ionic driving force and gating state."
        },
        {
          "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
        }
      ],
      "markScheme": [
        {
          "text": "Measure a component over multiple voltages."
        },
        {
          "text": "Locate zero net current."
        },
        {
          "text": "Compare against the selective ion’s Nernst potential."
        },
        {
          "text": "Test by changing that ion’s concentration; account for other currents."
        }
      ],
      "modelAnswer": [
        "Measure a component over multiple voltages.",
        "Locate zero net current.",
        "Compare against the selective ion’s Nernst potential.",
        "Test by changing that ion’s concentration; account for other currents."
      ],
      "points": 1,
      "source": "L07 PDF 9",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 7, PDF page 9. Command voltages and recorded currents approaching reversal. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 7, PDF page 9. Command voltages and recorded currents approaching reversal. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L07/reversal.webp', import.meta.url).href,
          "alt": "Lecture 7, PDF page 9. Command voltages and recorded currents approaching reversal. Original labels, axes and scale bars retained.",
          "aspect": 2.633093525179856,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L07-concentration-explain",
      "sectionId": "concentration",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain the mechanism and experimental limitation in this segment: Separate currents by a reversal shift.",
      "hints": [
        {
          "body": "Separate the imposed voltage, ionic driving force and gating state."
        },
        {
          "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
        }
      ],
      "markScheme": [
        {
          "text": "Choose a reference solution with sodium reversal at the test voltage."
        },
        {
          "text": "Sodium net current is zero there even if gates are open."
        },
        {
          "text": "Other corrected current must remain comparable."
        },
        {
          "text": "Subtract reference from control point by point, retaining time alignment."
        }
      ],
      "modelAnswer": [
        "Choose a reference solution with sodium reversal at the test voltage.",
        "Sodium net current is zero there even if gates are open.",
        "Other corrected current must remain comparable.",
        "Subtract reference from control point by point, retaining time alignment."
      ],
      "points": 1,
      "source": "L07 PDF 10",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 7, PDF page 10. Three sodium solutions, fixed test voltage, and separated currents. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 7, PDF page 10. Three sodium solutions, fixed test voltage, and separated currents. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L07/subtraction.webp', import.meta.url).href,
          "alt": "Lecture 7, PDF page 10. Three sodium solutions, fixed test voltage, and separated currents. Original labels, axes and scale bars retained.",
          "aspect": 0.5931963146704465,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L07-substitution-explain",
      "sectionId": "substitution",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain the mechanism and experimental limitation in this segment: Replace sodium with impermeant choline.",
      "hints": [
        {
          "body": "Separate the imposed voltage, ionic driving force and gating state."
        },
        {
          "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
        }
      ],
      "markScheme": [
        {
          "text": "Choline replaces external sodium without conducting through its channel."
        },
        {
          "text": "Corrected residual estimates potassium."
        },
        {
          "text": "Control minus residual estimates sodium."
        },
        {
          "text": "Changed solution must not independently alter the retained component."
        }
      ],
      "modelAnswer": [
        "Choline replaces external sodium without conducting through its channel.",
        "Corrected residual estimates potassium.",
        "Control minus residual estimates sodium.",
        "Changed solution must not independently alter the retained component."
      ],
      "points": 1,
      "source": "L07 PDF 11",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 7, PDF page 11. Normal and sodium-free traces with their difference. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 7, PDF page 11. Normal and sodium-free traces with their difference. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L07/choline.webp', import.meta.url).href,
          "alt": "Lecture 7, PDF page 11. Normal and sodium-free traces with their difference. Original labels, axes and scale bars retained.",
          "aspect": 0.6666666666666666,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L07-blockers-explain",
      "sectionId": "blockers",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain the mechanism and experimental limitation in this segment: Separate currents with TTX and TEA.",
      "hints": [
        {
          "body": "Separate the imposed voltage, ionic driving force and gating state."
        },
        {
          "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
        }
      ],
      "markScheme": [
        {
          "text": "TTX removes sodium and TEA removes potassium in this protocol."
        },
        {
          "text": "Correct capacitive/leak background before attribution."
        },
        {
          "text": "A residual inward current after TTX could indicate incomplete block or another component."
        },
        {
          "text": "Use matched voltage steps and appropriate controls before claiming selectivity."
        }
      ],
      "modelAnswer": [
        "TTX removes sodium and TEA removes potassium in this protocol.",
        "Correct capacitive/leak background before attribution.",
        "A residual inward current after TTX could indicate incomplete block or another component.",
        "Use matched voltage steps and appropriate controls before claiming selectivity."
      ],
      "points": 1,
      "source": "L07 PDF 12",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 7, PDF page 12. Control, TTX and TEA source recordings. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 7, PDF page 12. Control, TTX and TEA source recordings. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L07/blockers.webp', import.meta.url).href,
          "alt": "Lecture 7, PDF page 12. Control, TTX and TEA source recordings. Original labels, axes and scale bars retained.",
          "aspect": 0.8648874061718098,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L07-instant-protocol-explain",
      "sectionId": "instant-protocol",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain the mechanism and experimental limitation in this segment: Two-step clamp freezes gating briefly.",
      "hints": [
        {
          "body": "Separate the imposed voltage, ionic driving force and gating state."
        },
        {
          "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
        }
      ],
      "markScheme": [
        {
          "text": "Use the same conditioning voltage and duration."
        },
        {
          "text": "Jump to different test voltages."
        },
        {
          "text": "Resolve capacitive transient before sampling ionic current."
        },
        {
          "text": "Sample before gating changes appreciably; inadequate time resolution confounds the estimate."
        }
      ],
      "modelAnswer": [
        "Use the same conditioning voltage and duration.",
        "Jump to different test voltages.",
        "Resolve capacitive transient before sampling ionic current.",
        "Sample before gating changes appreciably; inadequate time resolution confounds the estimate."
      ],
      "points": 1,
      "source": "L07 PDF 13",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 7, PDF page 14. Two-step protocol, initial and test voltages, with short sampling interval. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 7, PDF page 14. Two-step protocol, initial and test voltages, with short sampling interval. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L07/protocol.webp', import.meta.url).href,
          "alt": "Lecture 7, PDF page 14. Two-step protocol, initial and test voltages, with short sampling interval. Original labels, axes and scale bars retained.",
          "aspect": 0.8320209973753281,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L07-instant-law-explain",
      "sectionId": "instant-law",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain the mechanism and experimental limitation in this segment: Derive the instantaneous conductance.",
      "hints": [
        {
          "body": "Separate the imposed voltage, ionic driving force and gating state."
        },
        {
          "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
        }
      ],
      "markScheme": [
        {
          "text": "Write each current as the same conductance times its driving force."
        },
        {
          "text": "Subtract currents at the two voltages."
        },
        {
          "text": "Reversal cancels and the slope gives conductance."
        },
        {
          "text": "Do not confuse a jump in driving force with a jump in activation."
        }
      ],
      "modelAnswer": [
        "Write each current as the same conductance times its driving force.",
        "Subtract currents at the two voltages.",
        "Reversal cancels and the slope gives conductance.",
        "Do not confuse a jump in driving force with a jump in activation."
      ],
      "points": 1,
      "source": "L07 PDF 14",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 7, PDF page 14. Two-step protocol, initial and test voltages, with short sampling interval. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 7, PDF page 14. Two-step protocol, initial and test voltages, with short sampling interval. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L07/protocol.webp', import.meta.url).href,
          "alt": "Lecture 7, PDF page 14. Two-step protocol, initial and test voltages, with short sampling interval. Original labels, axes and scale bars retained.",
          "aspect": 0.8320209973753281,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L07-clamp-jump",
      "sectionId": "instant-law",
      "difficulty": "medium",
      "type": "multiStepCalc",
      "prompt": "A two-step clamp preserves the same gating state. $I_1=-2\\,\\mathrm{nA}$ at $V_1=-20\\,\\mathrm{mV}$, $g=25\\,\\mathrm{nS}$. Jump to $V_2=20\\,\\mathrm{mV}$. Reversal is $60\\,\\mathrm{mV}$. Predict the immediate ionic current after resolving capacitance, then check by the independent chord route.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "First voltage",
              "answer": {
                "value": -0.02,
                "unit": "V",
                "tolerance": 2e-08,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -0.02,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Second voltage",
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
              "label": "Conductance",
              "answer": {
                "value": 2.5e-08,
                "unit": "S",
                "tolerance": 2.4999999999999998e-14,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 2.5e-08,
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
          "title": "Voltage jump",
          "answer": {
            "value": 0.04,
            "unit": "V",
            "tolerance": 0.00012,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": 0.02,
                "b": 0.02
              },
              "displayScale": 1
            }
          },
          "tex": "\\Delta V=V_2-V_1",
          "modelAnswer": [
            "Use signed voltages.",
            "$\\Delta V=V_2-V_1$",
            "$0.04\\,\\mathrm{V}$"
          ]
        },
        {
          "title": "Current jump",
          "answer": {
            "value": 1e-09,
            "unit": "A",
            "tolerance": 3e-12,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 2.5e-08,
                "b": 0.04
              },
              "displayScale": 1
            }
          },
          "tex": "\\Delta I=g\\Delta V",
          "modelAnswer": [
            "Gating remains fixed.",
            "$\\Delta I=g\\Delta V$",
            "$1\\times10^{-9}\\,\\mathrm{A}$"
          ]
        },
        {
          "title": "New current",
          "answer": {
            "value": -1e-09,
            "unit": "A",
            "tolerance": 3e-12,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": -2e-09,
                "b": 1e-09
              },
              "displayScale": 1
            }
          },
          "tex": "I_2=I_1+\\Delta I",
          "modelAnswer": [
            "Add the signed change.",
            "$I_2=I_1+\\Delta I$",
            "$-1\\times10^{-9}\\,\\mathrm{A}$"
          ]
        },
        {
          "title": "New driving force",
          "answer": {
            "value": -0.039999999999999994,
            "unit": "V",
            "tolerance": 0.00011999999999999999,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": 0.02,
                "b": -0.06
              },
              "displayScale": 1
            }
          },
          "tex": "D_2=V_2-E",
          "modelAnswer": [
            "Use the same reversal.",
            "$D_2=V_2-E$",
            "$-0.04\\,\\mathrm{V}$"
          ]
        },
        {
          "title": "Independent current",
          "answer": {
            "value": -9.999999999999999e-10,
            "unit": "A",
            "tolerance": 2.9999999999999997e-12,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 2.5e-08,
                "b": -0.039999999999999994
              },
              "displayScale": 1
            }
          },
          "tex": "I_2=gD_2",
          "modelAnswer": [
            "The two routes agree for these consistent idealized data.",
            "$I_2=gD_2$",
            "$-1\\times10^{-9}\\,\\mathrm{A}$"
          ]
        },
        {
          "title": "Interpretation",
          "choices": [
            {
              "label": "The ionic current can jump while gating stays continuous"
            },
            {
              "label": "The ionic current can jump only if gating is discontinuous"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The jump is in driving force."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\Delta I=g\\Delta V$ then add to the initial current."
        },
        {
          "body": "Begin with $\\Delta V=V_2-V_1$; keep current signs and verify with the new driving force."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Use signed voltages.",
        "Gating remains fixed.",
        "Add the signed change.",
        "Use the same reversal.",
        "The two routes agree for these consistent idealized data.",
        "The jump is in driving force."
      ],
      "points": 1,
      "source": "L07 PDF13–18"
    },
    {
      "id": "L07-sodium-iv-explain",
      "sectionId": "sodium-iv",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain the mechanism and experimental limitation in this segment: Sodium peak curve versus instantaneous line.",
      "hints": [
        {
          "body": "Separate the imposed voltage, ionic driving force and gating state."
        },
        {
          "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
        }
      ],
      "markScheme": [
        {
          "text": "Peak measurements at different voltages have different gating states."
        },
        {
          "text": "Instantaneous test currents share a fixed initial state."
        },
        {
          "text": "Their line meets the peak curve at conditioning voltage and reversal."
        },
        {
          "text": "Only the fixed-gating relation tests open-pore linearity."
        }
      ],
      "modelAnswer": [
        "Peak measurements at different voltages have different gating states.",
        "Instantaneous test currents share a fixed initial state.",
        "Their line meets the peak curve at conditioning voltage and reversal.",
        "Only the fixed-gating relation tests open-pore linearity."
      ],
      "points": 1,
      "source": "L07 PDF 15–16",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 7, PDF page 15. Peak sodium relation and instantaneous linear test-current relation. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 7, PDF page 15. Peak sodium relation and instantaneous linear test-current relation. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L07/sodium.webp', import.meta.url).href,
          "alt": "Lecture 7, PDF page 15. Peak sodium relation and instantaneous linear test-current relation. Original labels, axes and scale bars retained.",
          "aspect": 0.6531204644412192,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L07-potassium-iv-explain",
      "sectionId": "potassium-iv",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain the mechanism and experimental limitation in this segment: Potassium obeys the same open-pore test.",
      "hints": [
        {
          "body": "Separate the imposed voltage, ionic driving force and gating state."
        },
        {
          "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
        }
      ],
      "markScheme": [
        {
          "text": "The conditioning current depends on activation and driving force."
        },
        {
          "text": "The instantaneous test line preserves gating."
        },
        {
          "text": "Its zero locates potassium reversal."
        },
        {
          "text": "Its slope gives open-population conductance for that initial state."
        }
      ],
      "modelAnswer": [
        "The conditioning current depends on activation and driving force.",
        "The instantaneous test line preserves gating.",
        "Its zero locates potassium reversal.",
        "Its slope gives open-population conductance for that initial state."
      ],
      "points": 1,
      "source": "L07 PDF 17",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 7, PDF page 17. Potassium clamp protocol, currents and instantaneous relation. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 7, PDF page 17. Potassium clamp protocol, currents and instantaneous relation. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L07/k-instant.webp', import.meta.url).href,
          "alt": "Lecture 7, PDF page 17. Potassium clamp protocol, currents and instantaneous relation. Original labels, axes and scale bars retained.",
          "aspect": 2.534181240063593,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L07-conductance-explain",
      "sectionId": "conductance",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain the mechanism and experimental limitation in this segment: Convert separated currents to conductances.",
      "hints": [
        {
          "body": "Separate the imposed voltage, ionic driving force and gating state."
        },
        {
          "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
        }
      ],
      "markScheme": [
        {
          "text": "Use the component-specific reversal potential."
        },
        {
          "text": "Divide corrected current by voltage minus reversal."
        },
        {
          "text": "Do not divide by zero at reversal."
        },
        {
          "text": "Use nearby nonzero driving force or an instantaneous slope instead."
        }
      ],
      "modelAnswer": [
        "Use the component-specific reversal potential.",
        "Divide corrected current by voltage minus reversal.",
        "Do not divide by zero at reversal.",
        "Use nearby nonzero driving force or an instantaneous slope instead."
      ],
      "points": 1,
      "source": "L07 PDF 18",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 7, PDF page 18. Separated currents and corresponding sodium and potassium conductances. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 7, PDF page 18. Separated currents and corresponding sodium and potassium conductances. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L07/conductances.webp', import.meta.url).href,
          "alt": "Lecture 7, PDF page 18. Separated currents and corresponding sodium and potassium conductances. Original labels, axes and scale bars retained.",
          "aspect": 2.0032626427406197,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L07-direct-chord",
      "sectionId": "conductance",
      "difficulty": "medium",
      "type": "multiStepCalc",
      "prompt": "A corrected sodium current is $-2\\,\\mathrm{nA}$ at $V_m=-20\\,\\mathrm{mV}$ with $E=60\\,\\mathrm{mV}$. Find conductance.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Current",
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
              "label": "Voltage",
              "answer": {
                "value": -0.02,
                "unit": "V",
                "tolerance": 2e-08,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -0.02,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Reversal",
              "answer": {
                "value": 0.06,
                "unit": "V",
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
          "title": "Signed driving force",
          "answer": {
            "value": -0.08,
            "unit": "V",
            "tolerance": 0.00024,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": -0.02,
                "b": -0.06
              },
              "displayScale": 1
            }
          },
          "tex": "D=V_m-E",
          "modelAnswer": [
            "Subtract reversal before division.",
            "$D=V_m-E$",
            "$-0.08\\,\\mathrm{V}$"
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 2.5e-08,
            "unit": "S",
            "tolerance": 7.5e-11,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": -2e-09,
                "b": -0.08
              },
              "displayScale": 1
            }
          },
          "tex": "g=I/(V_m-E)",
          "modelAnswer": [
            "Divide signed current by its signed driving force.",
            "$g=(-2\\times10^{-9})/(-0.080)\\,\\mathrm S$",
            "$2.5\\times10^{-8}\\,\\mathrm{S}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $g=I/(V_m-E)$."
        },
        {
          "body": "Start with $g=(-2\\times10^{-9})/(-0.080)\\,\\mathrm S$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Divide signed current by its signed driving force."
      ],
      "points": 1,
      "source": "L07 PDF 18"
    },
    {
      "id": "L07-sensors-explain",
      "sectionId": "sensors",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain the mechanism and experimental limitation in this segment: Voltage sensors and model particles.",
      "hints": [
        {
          "body": "Separate the imposed voltage, ionic driving force and gating state."
        },
        {
          "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
        }
      ],
      "markScheme": [
        {
          "text": "Voltage sensors are charged regions of channel protein."
        },
        {
          "text": "Field-driven motion changes conformation."
        },
        {
          "text": "HH particles describe probabilities of permissive states."
        },
        {
          "text": "They are distinct from ions permeating through the pore."
        }
      ],
      "modelAnswer": [
        "Voltage sensors are charged regions of channel protein.",
        "Field-driven motion changes conformation.",
        "HH particles describe probabilities of permissive states.",
        "They are distinct from ions permeating through the pore."
      ],
      "points": 1,
      "source": "L07 PDF 19",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 7, PDF page 19. Labeled channel protein, voltage sensor and aqueous pore. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 7, PDF page 19. Labeled channel protein, voltage sensor and aqueous pore. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L07/sensor.webp', import.meta.url).href,
          "alt": "Lecture 7, PDF page 19. Labeled channel protein, voltage sensor and aqueous pore. Original labels, axes and scale bars retained.",
          "aspect": 1.0535211267605633,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L07-gates-explain",
      "sectionId": "gates",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain the mechanism and experimental limitation in this segment: Activation and inactivation gates.",
      "hints": [
        {
          "body": "Separate the imposed voltage, ionic driving force and gating state."
        },
        {
          "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
        }
      ],
      "markScheme": [
        {
          "text": "Potassium activation is n."
        },
        {
          "text": "Sodium activation is m."
        },
        {
          "text": "Sodium availability is h, so falling h means increasing inactivation."
        },
        {
          "text": "All required factors must permit conduction."
        }
      ],
      "modelAnswer": [
        "Potassium activation is n.",
        "Sodium activation is m.",
        "Sodium availability is h, so falling h means increasing inactivation.",
        "All required factors must permit conduction."
      ],
      "points": 1,
      "source": "L07 PDF 20",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 7, PDF page 20. Schematic potassium activation with permissive and nonpermissive states. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 7, PDF page 20. Schematic potassium activation with permissive and nonpermissive states. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L07/gates.webp', import.meta.url).href,
          "alt": "Lecture 7, PDF page 20. Schematic potassium activation with permissive and nonpermissive states. Original labels, axes and scale bars retained.",
          "aspect": 1.0346420323325636,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L07-states-explain",
      "sectionId": "states",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain the mechanism and experimental limitation in this segment: Closed, open and inactivated.",
      "hints": [
        {
          "body": "Separate the imposed voltage, ionic driving force and gating state."
        },
        {
          "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
        }
      ],
      "markScheme": [
        {
          "text": "Closed is nonconducting but available."
        },
        {
          "text": "Open permits conduction when driving force is nonzero."
        },
        {
          "text": "Inactivated is unavailable until recovery."
        },
        {
          "text": "Recovery is distinct from merely closing an activation gate."
        }
      ],
      "modelAnswer": [
        "Closed is nonconducting but available.",
        "Open permits conduction when driving force is nonzero.",
        "Inactivated is unavailable until recovery.",
        "Recovery is distinct from merely closing an activation gate."
      ],
      "points": 1,
      "source": "L07 PDF 21",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 7, PDF page 21. Closed, open and inactivated channel state diagram. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 7, PDF page 21. Closed, open and inactivated channel state diagram. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L07/states.webp', import.meta.url).href,
          "alt": "Lecture 7, PDF page 21. Closed, open and inactivated channel state diagram. Original labels, axes and scale bars retained.",
          "aspect": 1.2142152023692003,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L07-inactivation-explain",
      "sectionId": "inactivation",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain the mechanism and experimental limitation in this segment: Prepulse duration reveals inactivation.",
      "hints": [
        {
          "body": "Separate the imposed voltage, ionic driving force and gating state."
        },
        {
          "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
        }
      ],
      "markScheme": [
        {
          "text": "Keep test voltage and recording conditions fixed."
        },
        {
          "text": "Extend the depolarizing prepulse."
        },
        {
          "text": "Reduced test inward current supports time-dependent inactivation."
        },
        {
          "text": "Exclude altered driving force, poor clamp or rundown with suitable controls."
        }
      ],
      "modelAnswer": [
        "Keep test voltage and recording conditions fixed.",
        "Extend the depolarizing prepulse.",
        "Reduced test inward current supports time-dependent inactivation.",
        "Exclude altered driving force, poor clamp or rundown with suitable controls."
      ],
      "points": 1,
      "source": "L07 PDF 22",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 7, PDF page 22. Depolarizing prepulses of differing duration and test sodium currents. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 7, PDF page 22. Depolarizing prepulses of differing duration and test sodium currents. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L07/inactivation.webp', import.meta.url).href,
          "alt": "Lecture 7, PDF page 22. Depolarizing prepulses of differing duration and test sodium currents. Original labels, axes and scale bars retained.",
          "aspect": 1.789537712895377,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L07-products-explain",
      "sectionId": "products",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain the mechanism and experimental limitation in this segment: Multiply permissive probabilities.",
      "hints": [
        {
          "body": "Separate the imposed voltage, ionic driving force and gating state."
        },
        {
          "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
        }
      ],
      "markScheme": [
        {
          "text": "Independent all-required particle probabilities multiply."
        },
        {
          "text": "Potassium uses four activation factors."
        },
        {
          "text": "Sodium uses three activation factors and one availability factor."
        },
        {
          "text": "A high single-particle probability can coexist with a small channel open fraction."
        }
      ],
      "modelAnswer": [
        "Independent all-required particle probabilities multiply.",
        "Potassium uses four activation factors.",
        "Sodium uses three activation factors and one availability factor.",
        "A high single-particle probability can coexist with a small channel open fraction."
      ],
      "points": 1,
      "source": "L07 PDF 23",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 7, PDF page 23. Source comparison of particle powers and conductance time courses. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 7, PDF page 23. Source comparison of particle powers and conductance time courses. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L07/powers.webp', import.meta.url).href,
          "alt": "Lecture 7, PDF page 23. Source comparison of particle powers and conductance time courses. Original labels, axes and scale bars retained.",
          "aspect": 0.6194029850746269,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L07-direct-gk",
      "sectionId": "products",
      "difficulty": "medium",
      "type": "multiStepCalc",
      "prompt": "With $\\bar g_K=40\\,\\mathrm{nS}$ and $n=0.5$, find potassium conductance.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Maximum",
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
              "label": "Activation",
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
          "title": "Four-particle fraction",
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
          "tex": "Y_K=n^4",
          "modelAnswer": [
            "Compute open fraction before conductance.",
            "$Y_K=n^4$",
            "$0.0625$"
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 2.5e-09,
            "unit": "S",
            "tolerance": 7.5e-12,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 4e-08,
                "b": 0.0625
              },
              "displayScale": 1
            }
          },
          "tex": "g_K=\\bar g_K n^4",
          "modelAnswer": [
            "Four activation factors scale maximum potassium conductance.",
            "$g_K=(40\\times10^{-9})(0.5)^4\\,\\mathrm S$",
            "$2.5\\times10^{-9}\\,\\mathrm{S}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $g_K=\\bar g_K n^4$."
        },
        {
          "body": "Start with $g_K=(40\\times10^{-9})(0.5)^4\\,\\mathrm S$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Four activation factors scale maximum potassium conductance."
      ],
      "points": 1,
      "source": "L07 PDF 23"
    },
    {
      "id": "L07-direct-sodium-product",
      "sectionId": "products",
      "difficulty": "medium",
      "type": "multiStepCalc",
      "prompt": "Use $m=0.7$ and $h=0.2$. Find sodium open fraction.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
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
          "title": "Three activation factors",
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
            "Then multiply by availability.",
            "$A=m^3$",
            "$0.343$"
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 0.06859999999999998,
            "unit": "",
            "tolerance": 0.00020579999999999993,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 0.3429999999999999,
                "b": 0.2
              },
              "displayScale": 1
            }
          },
          "tex": "Y_{Na}=m^3h",
          "modelAnswer": [
            "Sodium opening requires activation and availability together.",
            "$Y_{Na}=0.7^3(0.2)$",
            "$0.0686$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $Y_{Na}=m^3h$."
        },
        {
          "body": "Start with $Y_{Na}=0.7^3(0.2)$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Sodium opening requires activation and availability together."
      ],
      "points": 1,
      "source": "L07 PDF 23"
    },
    {
      "id": "L07-structure-explain",
      "sectionId": "structure",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain the mechanism and experimental limitation in this segment: Gate powers are not literal hinges.",
      "hints": [
        {
          "body": "Separate the imposed voltage, ionic driving force and gating state."
        },
        {
          "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
        }
      ],
      "markScheme": [
        {
          "text": "Potassium has four sensor-bearing subunits."
        },
        {
          "text": "Sodium has four domains within one alpha subunit."
        },
        {
          "text": "The fourth sodium domain is strongly coupled to inactivation."
        },
        {
          "text": "The fitted powers are phenomenological, not independent physical hinges."
        }
      ],
      "modelAnswer": [
        "Potassium has four sensor-bearing subunits.",
        "Sodium has four domains within one alpha subunit.",
        "The fourth sodium domain is strongly coupled to inactivation.",
        "The fitted powers are phenomenological, not independent physical hinges."
      ],
      "points": 1,
      "source": "L07 PDF 24",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 7, PDF page 23. Source comparison of particle powers and conductance time courses. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 7, PDF page 23. Source comparison of particle powers and conductance time courses. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L07/powers.webp', import.meta.url).href,
          "alt": "Lecture 7, PDF page 23. Source comparison of particle powers and conductance time courses. Original labels, axes and scale bars retained.",
          "aspect": 0.6194029850746269,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L07-balance-explain",
      "sectionId": "balance",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain the mechanism and experimental limitation in this segment: Derive first-order gating relaxation.",
      "hints": [
        {
          "body": "Separate the imposed voltage, ionic driving force and gating state."
        },
        {
          "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
        }
      ],
      "markScheme": [
        {
          "text": "Opening adds alpha times nonpermissive probability."
        },
        {
          "text": "Closing removes beta times permissive probability."
        },
        {
          "text": "At steady state those fluxes balance."
        },
        {
          "text": "Integration at constant voltage gives a relaxation preserving initial and limiting probabilities."
        }
      ],
      "modelAnswer": [
        "Opening adds alpha times nonpermissive probability.",
        "Closing removes beta times permissive probability.",
        "At steady state those fluxes balance.",
        "Integration at constant voltage gives a relaxation preserving initial and limiting probabilities."
      ],
      "points": 1,
      "source": "L07 PDF 25",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 7, PDF page 25. Forward/backward gating transitions for n, m and h. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 7, PDF page 25. Forward/backward gating transitions for n, m and h. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L07/transitions.webp', import.meta.url).href,
          "alt": "Lecture 7, PDF page 25. Forward/backward gating transitions for n, m and h. Original labels, axes and scale bars retained.",
          "aspect": 7.613636363636363,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L07-relaxation-explain",
      "sectionId": "relaxation",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain the mechanism and experimental limitation in this segment: Relaxation applies to all three variables.",
      "hints": [
        {
          "body": "Separate the imposed voltage, ionic driving force and gating state."
        },
        {
          "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
        }
      ],
      "markScheme": [
        {
          "text": "Use separate steady probability and time constant for each variable."
        },
        {
          "text": "Initial probability is set by the preceding state."
        },
        {
          "text": "A voltage step changes rate coefficients."
        },
        {
          "text": "Probability is continuous and can relax upward or downward."
        }
      ],
      "modelAnswer": [
        "Use separate steady probability and time constant for each variable.",
        "Initial probability is set by the preceding state.",
        "A voltage step changes rate coefficients.",
        "Probability is continuous and can relax upward or downward."
      ],
      "points": 1,
      "source": "L07 PDF 26",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 7, PDF page 27. Source voltage step, gating variables and conductance products. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 7, PDF page 27. Source voltage step, gating variables and conductance products. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L07/time.webp', import.meta.url).href,
          "alt": "Lecture 7, PDF page 27. Source voltage step, gating variables and conductance products. Original labels, axes and scale bars retained.",
          "aspect": 0.9829222011385199,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L07-time-courses-explain",
      "sectionId": "time-courses",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain the mechanism and experimental limitation in this segment: From exponential particles to conductance.",
      "hints": [
        {
          "body": "Separate the imposed voltage, ionic driving force and gating state."
        },
        {
          "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
        }
      ],
      "markScheme": [
        {
          "text": "Activation powers create delayed onset."
        },
        {
          "text": "Sodium activation rises rapidly while availability falls."
        },
        {
          "text": "Their product therefore rises then declines."
        },
        {
          "text": "The zero initial activation and zero final availability approximations are conditional."
        }
      ],
      "modelAnswer": [
        "Activation powers create delayed onset.",
        "Sodium activation rises rapidly while availability falls.",
        "Their product therefore rises then declines.",
        "The zero initial activation and zero final availability approximations are conditional."
      ],
      "points": 1,
      "source": "L07 PDF 27",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 7, PDF page 27. Source voltage step, gating variables and conductance products. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 7, PDF page 27. Source voltage step, gating variables and conductance products. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L07/time.webp', import.meta.url).href,
          "alt": "Lecture 7, PDF page 27. Source voltage step, gating variables and conductance products. Original labels, axes and scale bars retained.",
          "aspect": 0.9829222011385199,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L07-fit-explain",
      "sectionId": "fit",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain the mechanism and experimental limitation in this segment: Fit voltage-dependent gating and kinetics.",
      "hints": [
        {
          "body": "Separate the imposed voltage, ionic driving force and gating state."
        },
        {
          "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
        }
      ],
      "markScheme": [
        {
          "text": "Normalize steady potassium conductance by its maximum."
        },
        {
          "text": "Take the fourth root to obtain steady particle probability."
        },
        {
          "text": "Fit the powered relaxation, with its initial state, to estimate the time constant."
        },
        {
          "text": "A raw conductance time constant is not automatically the single-particle time constant."
        }
      ],
      "modelAnswer": [
        "Normalize steady potassium conductance by its maximum.",
        "Take the fourth root to obtain steady particle probability.",
        "Fit the powered relaxation, with its initial state, to estimate the time constant.",
        "A raw conductance time constant is not automatically the single-particle time constant."
      ],
      "points": 1,
      "source": "L07 PDF 28",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 7, PDF page 28. Potassium conductance time courses at two clamp voltages. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 7, PDF page 28. Potassium conductance time courses at two clamp voltages. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L07/fitting.webp', import.meta.url).href,
          "alt": "Lecture 7, PDF page 28. Potassium conductance time courses at two clamp voltages. Original labels, axes and scale bars retained.",
          "aspect": 1.896774193548387,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L07-steady-curves-explain",
      "sectionId": "steady-curves",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain the mechanism and experimental limitation in this segment: Read steady curves separately from time constants.",
      "hints": [
        {
          "body": "Separate the imposed voltage, ionic driving force and gating state."
        },
        {
          "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
        }
      ],
      "markScheme": [
        {
          "text": "Read probabilities on their own axis."
        },
        {
          "text": "Steady sodium/potassium activation grows with depolarization."
        },
        {
          "text": "Steady sodium availability falls."
        },
        {
          "text": "Time constants set speed and need not follow the same monotonic trend."
        }
      ],
      "modelAnswer": [
        "Read probabilities on their own axis.",
        "Steady sodium/potassium activation grows with depolarization.",
        "Steady sodium availability falls.",
        "Time constants set speed and need not follow the same monotonic trend."
      ],
      "points": 1,
      "source": "L07 PDF 29",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 7, PDF page 29. Steady activation/availability and time-constant plots with separate axes. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 7, PDF page 29. Steady activation/availability and time-constant plots with separate axes. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L07/steady.webp', import.meta.url).href,
          "alt": "Lecture 7, PDF page 29. Steady activation/availability and time-constant plots with separate axes. Original labels, axes and scale bars retained.",
          "aspect": 3.054711246200608,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L07-infer-explain",
      "sectionId": "infer",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain the mechanism and experimental limitation in this segment: Recover rates from steady state and time constant.",
      "hints": [
        {
          "body": "Separate the imposed voltage, ionic driving force and gating state."
        },
        {
          "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
        }
      ],
      "markScheme": [
        {
          "text": "Steady probability gives the forward fraction of the rate sum."
        },
        {
          "text": "Time constant gives the reciprocal sum."
        },
        {
          "text": "Forward rate is steady fraction divided by time constant."
        },
        {
          "text": "Backward rate is complementary fraction divided by time constant."
        }
      ],
      "modelAnswer": [
        "Steady probability gives the forward fraction of the rate sum.",
        "Time constant gives the reciprocal sum.",
        "Forward rate is steady fraction divided by time constant.",
        "Backward rate is complementary fraction divided by time constant."
      ],
      "points": 1,
      "source": "L07 PDF 30",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 7, PDF page 25. Forward/backward gating transitions for n, m and h. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 7, PDF page 25. Forward/backward gating transitions for n, m and h. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L07/transitions.webp', import.meta.url).href,
          "alt": "Lecture 7, PDF page 25. Forward/backward gating transitions for n, m and h. Original labels, axes and scale bars retained.",
          "aspect": 7.613636363636363,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L07-empirical-explain",
      "sectionId": "empirical",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain the mechanism and experimental limitation in this segment: Empirical squid rates and the voltage origin.",
      "hints": [
        {
          "body": "Separate the imposed voltage, ionic driving force and gating state."
        },
        {
          "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
        }
      ],
      "markScheme": [
        {
          "text": "Convert absolute membrane voltage to depolarization from rest."
        },
        {
          "text": "Insert the numerical value in millivolts."
        },
        {
          "text": "The source rates are per millisecond, so convert before SI dynamics."
        },
        {
          "text": "At removable singularities use continuous limits rather than assigning zero."
        }
      ],
      "modelAnswer": [
        "Convert absolute membrane voltage to depolarization from rest.",
        "Insert the numerical value in millivolts.",
        "The source rates are per millisecond, so convert before SI dynamics.",
        "At removable singularities use continuous limits rather than assigning zero."
      ],
      "points": 1,
      "source": "L07 PDF 31",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 7, PDF page 31. Empirical rate coefficient plots, source absolute-voltage axes. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 7, PDF page 31. Empirical rate coefficient plots, source absolute-voltage axes. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L07/rates.webp', import.meta.url).href,
          "alt": "Lecture 7, PDF page 31. Empirical rate coefficient plots, source absolute-voltage axes. Original labels, axes and scale bars retained.",
          "aspect": 3.3120805369127515,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L07-direct-an",
      "sectionId": "empirical",
      "difficulty": "medium",
      "type": "multiStepCalc",
      "prompt": "Evaluate $\\alpha_n$ at $U=15\\,\\mathrm{mV}$ using the displayed law. Give the rate in $\\mathrm{s^{-1}}$.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Rest-relative voltage",
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
          "title": "Source rate before inverse-time conversion",
          "answer": {
            "value": 0.1270747041268399,
            "unit": "1/ms",
            "tolerance": 0.00038122411238051976,
            "verification": {
              "relation": "hhRate",
              "inputs": {
                "gate": "an",
                "voltage": 0.015
              },
              "displayScale": 1000
            }
          },
          "tex": "\\alpha_n=\\frac{0.01(10-U)}{e^{(10-U)/10}-1}",
          "modelAnswer": [
            "Source law output is per millisecond.",
            "$\\alpha_n=\\frac{0.01(10-U)}{e^{(10-U)/10}-1}$",
            "$0.1270747\\,\\mathrm{1/ms}$"
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 127.07470412683992,
            "unit": "1/s",
            "tolerance": 0.3812241123805198,
            "verification": {
              "relation": "hhRate",
              "inputs": {
                "gate": "an",
                "voltage": 0.015
              },
              "displayScale": 1
            }
          },
          "tex": "\\alpha_n=\\frac{0.01(10-U)}{e^{(10-U)/10}-1}",
          "modelAnswer": [
            "Evaluate the source squid rate at a rest-relative voltage.",
            "$\\alpha_n=\\frac{0.01(10-U)}{e^{(10-U)/10}-1},\\quad U=15\\,\\mathrm{mV}$",
            "$127.0747\\,\\mathrm{s^{-1}}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\alpha_n=\\frac{0.01(10-U)}{e^{(10-U)/10}-1}$."
        },
        {
          "body": "Start with $\\alpha_n=\\frac{0.01(10-U)}{e^{(10-U)/10}-1},\\quad U=15\\,\\mathrm{mV}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Evaluate the source squid rate at a rest-relative voltage."
      ],
      "points": 1,
      "source": "L07 PDF 31"
    },
    {
      "id": "L07-direct-bn",
      "practice": "extra",
      "sectionId": "empirical",
      "difficulty": "medium",
      "type": "multiStepCalc",
      "prompt": "Evaluate $\\beta_n$ at $U=15\\,\\mathrm{mV}$ using the displayed law. Give the rate in $\\mathrm{s^{-1}}$.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Rest-relative voltage",
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
          "title": "Source rate before inverse-time conversion",
          "answer": {
            "value": 0.10362863977255005,
            "unit": "1/ms",
            "tolerance": 0.00031088591931765017,
            "verification": {
              "relation": "hhRate",
              "inputs": {
                "gate": "bn",
                "voltage": 0.015
              },
              "displayScale": 1000
            }
          },
          "tex": "\\beta_n=0.125e^{-U/80}",
          "modelAnswer": [
            "Source law output is per millisecond.",
            "$\\beta_n=0.125e^{-U/80}$",
            "$0.10362864\\,\\mathrm{1/ms}$"
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 103.62863977255004,
            "unit": "1/s",
            "tolerance": 0.31088591931765014,
            "verification": {
              "relation": "hhRate",
              "inputs": {
                "gate": "bn",
                "voltage": 0.015
              },
              "displayScale": 1
            }
          },
          "tex": "\\beta_n=0.125e^{-U/80}",
          "modelAnswer": [
            "Evaluate the source squid rate at a rest-relative voltage.",
            "$\\beta_n=0.125e^{-U/80},\\quad U=15\\,\\mathrm{mV}$",
            "$103.62864\\,\\mathrm{s^{-1}}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\beta_n=0.125e^{-U/80}$."
        },
        {
          "body": "Start with $\\beta_n=0.125e^{-U/80},\\quad U=15\\,\\mathrm{mV}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Evaluate the source squid rate at a rest-relative voltage."
      ],
      "points": 1,
      "source": "L07 PDF 31"
    },
    {
      "id": "L07-direct-am",
      "sectionId": "empirical",
      "difficulty": "medium",
      "type": "multiStepCalc",
      "prompt": "Evaluate $\\alpha_m$ at $U=15\\,\\mathrm{mV}$ using the displayed law. Give the rate in $\\mathrm{s^{-1}}$.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Rest-relative voltage",
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
          "title": "Source rate before inverse-time conversion",
          "answer": {
            "value": 0.5819767068693265,
            "unit": "1/ms",
            "tolerance": 0.0017459301206079795,
            "verification": {
              "relation": "hhRate",
              "inputs": {
                "gate": "am",
                "voltage": 0.015
              },
              "displayScale": 1000
            }
          },
          "tex": "\\alpha_m=\\frac{0.1(25-U)}{e^{(25-U)/10}-1}",
          "modelAnswer": [
            "Source law output is per millisecond.",
            "$\\alpha_m=\\frac{0.1(25-U)}{e^{(25-U)/10}-1}$",
            "$0.58197671\\,\\mathrm{1/ms}$"
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 581.9767068693264,
            "unit": "1/s",
            "tolerance": 1.7459301206079794,
            "verification": {
              "relation": "hhRate",
              "inputs": {
                "gate": "am",
                "voltage": 0.015
              },
              "displayScale": 1
            }
          },
          "tex": "\\alpha_m=\\frac{0.1(25-U)}{e^{(25-U)/10}-1}",
          "modelAnswer": [
            "Evaluate the source squid rate at a rest-relative voltage.",
            "$\\alpha_m=\\frac{0.1(25-U)}{e^{(25-U)/10}-1},\\quad U=15\\,\\mathrm{mV}$",
            "$581.97671\\,\\mathrm{s^{-1}}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\alpha_m=\\frac{0.1(25-U)}{e^{(25-U)/10}-1}$."
        },
        {
          "body": "Start with $\\alpha_m=\\frac{0.1(25-U)}{e^{(25-U)/10}-1},\\quad U=15\\,\\mathrm{mV}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Evaluate the source squid rate at a rest-relative voltage."
      ],
      "points": 1,
      "source": "L07 PDF 31"
    },
    {
      "id": "L07-direct-bm",
      "practice": "extra",
      "sectionId": "empirical",
      "difficulty": "medium",
      "type": "multiStepCalc",
      "prompt": "Evaluate $\\beta_m$ at $U=15\\,\\mathrm{mV}$ using the displayed law. Give the rate in $\\mathrm{s^{-1}}$.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Rest-relative voltage",
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
          "title": "Source rate before inverse-time conversion",
          "answer": {
            "value": 1.7383928340283128,
            "unit": "1/ms",
            "tolerance": 0.005215178502084939,
            "verification": {
              "relation": "hhRate",
              "inputs": {
                "gate": "bm",
                "voltage": 0.015
              },
              "displayScale": 1000
            }
          },
          "tex": "\\beta_m=4e^{-U/18}",
          "modelAnswer": [
            "Source law output is per millisecond.",
            "$\\beta_m=4e^{-U/18}$",
            "$1.7383928\\,\\mathrm{1/ms}$"
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 1738.3928340283128,
            "unit": "1/s",
            "tolerance": 5.215178502084939,
            "verification": {
              "relation": "hhRate",
              "inputs": {
                "gate": "bm",
                "voltage": 0.015
              },
              "displayScale": 1
            }
          },
          "tex": "\\beta_m=4e^{-U/18}",
          "modelAnswer": [
            "Evaluate the source squid rate at a rest-relative voltage.",
            "$\\beta_m=4e^{-U/18},\\quad U=15\\,\\mathrm{mV}$",
            "$1738.3928\\,\\mathrm{s^{-1}}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\beta_m=4e^{-U/18}$."
        },
        {
          "body": "Start with $\\beta_m=4e^{-U/18},\\quad U=15\\,\\mathrm{mV}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Evaluate the source squid rate at a rest-relative voltage."
      ],
      "points": 1,
      "source": "L07 PDF 31"
    },
    {
      "id": "L07-direct-ah",
      "practice": "extra",
      "sectionId": "empirical",
      "difficulty": "medium",
      "type": "multiStepCalc",
      "prompt": "Evaluate $\\alpha_h$ at $U=15\\,\\mathrm{mV}$ using the displayed law. Give the rate in $\\mathrm{s^{-1}}$.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Rest-relative voltage",
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
          "title": "Source rate before inverse-time conversion",
          "answer": {
            "value": 0.03306565869187103,
            "unit": "1/ms",
            "tolerance": 9.919697607561309e-05,
            "verification": {
              "relation": "hhRate",
              "inputs": {
                "gate": "ah",
                "voltage": 0.015
              },
              "displayScale": 1000
            }
          },
          "tex": "\\alpha_h=0.07e^{-U/20}",
          "modelAnswer": [
            "Source law output is per millisecond.",
            "$\\alpha_h=0.07e^{-U/20}$",
            "$0.033065659\\,\\mathrm{1/ms}$"
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 33.06565869187103,
            "unit": "1/s",
            "tolerance": 0.09919697607561309,
            "verification": {
              "relation": "hhRate",
              "inputs": {
                "gate": "ah",
                "voltage": 0.015
              },
              "displayScale": 1
            }
          },
          "tex": "\\alpha_h=0.07e^{-U/20}",
          "modelAnswer": [
            "Evaluate the source squid rate at a rest-relative voltage.",
            "$\\alpha_h=0.07e^{-U/20},\\quad U=15\\,\\mathrm{mV}$",
            "$33.065659\\,\\mathrm{s^{-1}}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\alpha_h=0.07e^{-U/20}$."
        },
        {
          "body": "Start with $\\alpha_h=0.07e^{-U/20},\\quad U=15\\,\\mathrm{mV}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Evaluate the source squid rate at a rest-relative voltage."
      ],
      "points": 1,
      "source": "L07 PDF 31"
    },
    {
      "id": "L07-direct-bh",
      "practice": "extra",
      "sectionId": "empirical",
      "difficulty": "medium",
      "type": "multiStepCalc",
      "prompt": "Evaluate $\\beta_h$ at $U=15\\,\\mathrm{mV}$ using the displayed law. Give the rate in $\\mathrm{s^{-1}}$.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Rest-relative voltage",
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
          "title": "Source rate before inverse-time conversion",
          "answer": {
            "value": 0.18242552380635635,
            "unit": "1/ms",
            "tolerance": 0.000547276571419069,
            "verification": {
              "relation": "hhRate",
              "inputs": {
                "gate": "bh",
                "voltage": 0.015
              },
              "displayScale": 1000
            }
          },
          "tex": "\\beta_h=\\frac{1}{1+e^{(30-U)/10}}",
          "modelAnswer": [
            "Source law output is per millisecond.",
            "$\\beta_h=\\frac{1}{1+e^{(30-U)/10}}$",
            "$0.18242552\\,\\mathrm{1/ms}$"
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 182.42552380635635,
            "unit": "1/s",
            "tolerance": 0.547276571419069,
            "verification": {
              "relation": "hhRate",
              "inputs": {
                "gate": "bh",
                "voltage": 0.015
              },
              "displayScale": 1
            }
          },
          "tex": "\\beta_h=\\frac{1}{1+e^{(30-U)/10}}",
          "modelAnswer": [
            "Evaluate the source squid rate at a rest-relative voltage.",
            "$\\beta_h=\\frac{1}{1+e^{(30-U)/10}},\\quad U=15\\,\\mathrm{mV}$",
            "$182.42552\\,\\mathrm{s^{-1}}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\beta_h=\\frac{1}{1+e^{(30-U)/10}}$."
        },
        {
          "body": "Start with $\\beta_h=\\frac{1}{1+e^{(30-U)/10}},\\quad U=15\\,\\mathrm{mV}$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Evaluate the source squid rate at a rest-relative voltage."
      ],
      "points": 1,
      "source": "L07 PDF 31"
    },
    {
      "id": "L07-group-explain",
      "sectionId": "group",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain the mechanism and experimental limitation in this segment: Group work: ions, kinetics and channel probability.",
      "hints": [
        {
          "body": "Separate the imposed voltage, ionic driving force and gating state."
        },
        {
          "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
        }
      ],
      "markScheme": [
        {
          "text": "Raised external potassium makes potassium reversal less negative."
        },
        {
          "text": "Rest depolarizes, which can initially increase excitability."
        },
        {
          "text": "Strong sustained depolarization reduces sodium availability."
        },
        {
          "text": "Reduced external sodium lowers sodium reversal and the overshoot."
        }
      ],
      "modelAnswer": [
        "Raised external potassium makes potassium reversal less negative.",
        "Rest depolarizes, which can initially increase excitability.",
        "Strong sustained depolarization reduces sodium availability.",
        "Reduced external sodium lowers sodium reversal and the overshoot."
      ],
      "points": 1,
      "source": "L07 PDF 32–33",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 7, PDF page 32. Group-work gating curves and interpretation prompts. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 7, PDF page 32. Group-work gating curves and interpretation prompts. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L07/group.webp', import.meta.url).href,
          "alt": "Lecture 7, PDF page 32. Group-work gating curves and interpretation prompts. Original labels, axes and scale bars retained.",
          "aspect": 0.8902743142144638,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L07-core-edge",
      "sectionId": "tevc",
      "type": "mc",
      "difficulty": "medium",
      "source": "L07 PDF 7–8",
      "prompt": "A clamp trace shows a narrow current spike at the step edge. What should you account for before interpreting the ionic current?",
      "options": [
        {
          "text": "Charging of the membrane capacitance",
          "feedback": "The capacitive term is large while voltage is changing and vanishes on the held plateau."
        },
        {
          "text": "Charging by sustained potassium current",
          "feedback": "Delayed potassium is an ionic current that can persist after the voltage has settled."
        },
        {
          "text": "Charging by the steady leak current",
          "feedback": "Leak contributes even on a steady plateau and needs separate correction."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Identify the term that depends on the rate of voltage change."
        },
        {
          "body": "Use $I_C=C_m\\,dV_m/dt$ at the edge and compare with its value on the plateau."
        }
      ],
      "modelAnswer": [
        "The capacitive term is large while voltage is changing and vanishes on the held plateau."
      ]
    },
    {
      "id": "L07-core-ion",
      "practice": "extra",
      "sectionId": "reversal",
      "type": "mc",
      "difficulty": "medium",
      "source": "L07 PDF 8–10",
      "prompt": "Lower extracellular sodium while holding other gradients fixed. What shift would support a sodium origin for the isolated early component?",
      "options": [
        {
          "text": "Its reversal shifts to more positive voltages",
          "feedback": "Lower external sodium reduces the outside-to-inside concentration ratio, so its reversal becomes less positive."
        },
        {
          "text": "Its reversal shifts to less positive voltages",
          "feedback": "Lower external sodium reduces the Nernst potential of sodium, shifting the zero crossing in the same direction."
        },
        {
          "text": "Its reversal stays at the original voltage",
          "feedback": "A selective sodium current follows its Nernst potential as the gradient changes."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Apply the Nernst ratio to sodium."
        },
        {
          "body": "With inside concentration held fixed, lowering the numerator lowers $E_{Na}$."
        }
      ],
      "modelAnswer": [
        "Lower external sodium reduces the Nernst potential of sodium, shifting the zero crossing in the same direction."
      ]
    },
    {
      "id": "L07-core-subtract",
      "sectionId": "concentration",
      "type": "mc",
      "difficulty": "medium",
      "source": "L07 PDF 10–11",
      "prompt": "At one time after a clamp step, the background-corrected control is $-3\\,\\mathrm{nA}$ and the matched sodium-free trace is $+2\\,\\mathrm{nA}$. What is the isolated sodium current?",
      "options": [
        {
          "text": "$-1\\,\\mathrm{nA}$ inward",
          "feedback": "This adds the currents. The control already includes the residual current."
        },
        {
          "text": "$+5\\,\\mathrm{nA}$ outward",
          "feedback": "This reverses the subtraction order."
        },
        {
          "text": "$-5\\,\\mathrm{nA}$ inward",
          "feedback": "Control minus residual gives an inward current of magnitude five nanoamperes."
        }
      ],
      "correct": 2,
      "hints": [
        {
          "body": "Subtract the signed residual from the signed control."
        },
        {
          "body": "Use $I_{Na}=(-3)-(+2)$ in nanoamperes."
        }
      ],
      "modelAnswer": [
        "Control minus residual gives an inward current of magnitude five nanoamperes."
      ]
    },
    {
      "id": "L07-core-conditioning",
      "sectionId": "instant-protocol",
      "type": "mc",
      "difficulty": "medium",
      "source": "L07 PDF 13–17",
      "prompt": "The same test voltages follow a stronger conditioning step. More potassium channels are now open at the test onset, with unchanged ion concentrations. What happens to the instantaneous I–V line?",
      "options": [
        {
          "text": "Its slope increases with the same reversal",
          "feedback": "Higher prepared conductance steepens the line. The unchanged potassium gradient fixes the reversal."
        },
        {
          "text": "Its slope stays fixed with a positive reversal shift",
          "feedback": "A change in occupancy changes conductance. Reversal depends on the gradient."
        },
        {
          "text": "Its slope decreases with the same reversal",
          "feedback": "More open channels increase conductance and steepen the line."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Separate the slope from the voltage at which current is zero."
        },
        {
          "body": "The slope is $g_K$. The zero is at $E_K$, which depends on the gradient."
        }
      ],
      "modelAnswer": [
        "Higher prepared conductance steepens the line. The unchanged potassium gradient fixes the reversal."
      ]
    },
    {
      "id": "L07-core-reversal-conductance",
      "sectionId": "conductance",
      "type": "mc",
      "difficulty": "medium",
      "source": "L07 PDF 14–18",
      "prompt": "You record zero isolated sodium current at $E_{Na}$. How can you estimate the open conductance at that instant?",
      "options": [
        {
          "text": "Divide the current there by the reversal voltage",
          "feedback": "The denominator for chord conductance is driving force, which is zero here."
        },
        {
          "text": "Measure a fixed-gating slope around reversal",
          "feedback": "The signed current difference divided by the voltage difference gives conductance for the prepared gating state."
        },
        {
          "text": "Measure the late current at that same voltage",
          "feedback": "The sodium driving force still vanishes, so a later sample at reversal cannot determine conductance."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Look for a second measurement that changes driving force before gating can respond."
        },
        {
          "body": "Use $g=\\Delta I/\\Delta V$ around $E_{Na}$ while the gating state is still fixed."
        }
      ],
      "modelAnswer": [
        "The signed current difference divided by the voltage difference gives conductance for the prepared gating state."
      ]
    },
    {
      "id": "L07-core-prepulse",
      "sectionId": "inactivation",
      "type": "mc",
      "difficulty": "medium",
      "source": "L07 PDF 22",
      "prompt": "A longer depolarizing prepulse reduces corrected sodium current at the same test voltage and unchanged sodium reversal. Which change explains this once activation during the prepulse is established?",
      "options": [
        {
          "text": "The prepulse increases steady sodium availability",
          "feedback": "Higher availability would support more sodium current at matched activation and driving force."
        },
        {
          "text": "The prepulse reduces potassium gate activation",
          "feedback": "Potassium activation does not explain a smaller isolated sodium response."
        },
        {
          "text": "The prepulse reduces sodium channel availability",
          "feedback": "More inactivation during the prepulse lowers availability for the fixed test pulse."
        }
      ],
      "correct": 2,
      "hints": [
        {
          "body": "The test driving force is fixed. Which gate tracks the fraction still available?"
        },
        {
          "body": "A longer depolarizing prepulse gives $h$ more time to decline before the test."
        }
      ],
      "modelAnswer": [
        "More inactivation during the prepulse lowers availability for the fixed test pulse."
      ]
    },
    {
      "id": "L07-core-potassium-power",
      "sectionId": "products",
      "type": "mc",
      "difficulty": "medium",
      "source": "L07 PDF 23–24",
      "prompt": "At fixed maximum potassium conductance, $n$ falls by half. What fraction of its previous value does $g_K$ reach?",
      "options": [
        {
          "text": "$1/2$ of the previous conductance",
          "feedback": "This treats one permissive particle as the whole-channel open fraction."
        },
        {
          "text": "$1/16$ of the previous conductance",
          "feedback": "The four required activation factors give the fourth power of one half."
        },
        {
          "text": "$1/4$ of the previous conductance",
          "feedback": "A square includes two factors. The HH potassium model uses four."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Apply the channel open fraction to the ratio of the two permissive probabilities."
        },
        {
          "body": "Use $(n_{new}/n_{old})^4=(1/2)^4$."
        }
      ],
      "modelAnswer": [
        "The four required activation factors give the fourth power of one half."
      ]
    },
    {
      "id": "L07-core-rescale",
      "practice": "extra",
      "sectionId": "balance",
      "type": "mc",
      "difficulty": "medium",
      "source": "L07 PDF 25–26",
      "prompt": "Both transition rates for one gate double. What happens at the same held voltage?",
      "options": [
        {
          "text": "Same steady occupancy and shorter relaxation time",
          "feedback": "The ratio is unchanged. The doubled sum halves the time constant."
        },
        {
          "text": "Higher steady occupancy and unchanged relaxation time",
          "feedback": "The numerator and denominator double together, and the sum rises."
        },
        {
          "text": "Same steady occupancy and longer relaxation time",
          "feedback": "The time constant is the reciprocal of the rate sum, so it becomes shorter."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Compare how the rate ratio and rate sum change."
        },
        {
          "body": "The factors of two cancel in $\\alpha/(\\alpha+\\beta)$ and remain in $\\alpha+\\beta$."
        }
      ],
      "modelAnswer": [
        "The ratio is unchanged. The doubled sum halves the time constant."
      ]
    },
    {
      "id": "L07-subtract-driving",
      "sectionId": "concentration",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "Idealized matched recordings give corrected total $-1\\,\\mathrm{nA}$ in control and $+2\\,\\mathrm{nA}$ when sodium reversal equals the fixed test $-10\\,\\mathrm{mV}$. Control sodium reversal is $50\\,\\mathrm{mV}$. Infer sodium current and conductance. Predict its immediate current after a jump to $70\\,\\mathrm{mV}$ with gating unchanged. State the subtraction assumption.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Control current",
              "answer": {
                "value": -1e-09,
                "unit": "A",
                "tolerance": 1e-15,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -1e-09,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Reference current",
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
              "label": "Test voltage",
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
              "label": "Control reversal",
              "answer": {
                "value": 0.05,
                "unit": "V",
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
          "title": "Isolated sodium current",
          "answer": {
            "value": -3e-09,
            "unit": "A",
            "tolerance": 9e-12,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": -1e-09,
                "b": -2e-09
              },
              "displayScale": 1
            }
          },
          "tex": "I_{Na}=I_{control}-I_{reference}",
          "modelAnswer": [
            "Subtract the outward reference.",
            "$I_{Na}=I_{control}-I_{reference}$",
            "$-3\\times10^{-9}\\,\\mathrm{A}$"
          ]
        },
        {
          "title": "Control driving force",
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
          "tex": "D=V_m-E_{Na}",
          "modelAnswer": [
            "Preserve sign.",
            "$D=V_m-E_{Na}$",
            "$-0.06\\,\\mathrm{V}$"
          ]
        },
        {
          "title": "Conductance",
          "answer": {
            "value": 5e-08,
            "unit": "S",
            "tolerance": 1.5e-10,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": -3e-09,
                "b": -0.06
              },
              "displayScale": 1
            }
          },
          "tex": "g_{Na}=I_{Na}/D",
          "modelAnswer": [
            "Both numerator and denominator are negative.",
            "$g_{Na}=I_{Na}/D$",
            "$5\\times10^{-8}\\,\\mathrm{S}$"
          ]
        },
        {
          "title": "New driving force",
          "answer": {
            "value": 0.02,
            "unit": "V",
            "tolerance": 6e-05,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": 0.07,
                "b": -0.05
              },
              "displayScale": 1
            }
          },
          "tex": "D_{new}=0.070-0.050\\,\\mathrm V",
          "modelAnswer": [
            "The new voltage exceeds reversal.",
            "$D_{new}=0.070-0.050\\,\\mathrm V$",
            "$0.02\\,\\mathrm{V}$"
          ]
        },
        {
          "title": "New sodium current",
          "answer": {
            "value": 1e-09,
            "unit": "A",
            "tolerance": 3e-12,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 5e-08,
                "b": 0.02
              },
              "displayScale": 1
            }
          },
          "tex": "I_{new}=g_{Na}D_{new}",
          "modelAnswer": [
            "Current reverses without requiring gate closure.",
            "$I_{new}=g_{Na}D_{new}$",
            "$1\\times10^{-9}\\,\\mathrm{A}$"
          ]
        },
        {
          "title": "Required control",
          "choices": [
            {
              "label": "Matched background and potassium currents in both solutions"
            },
            {
              "label": "Matched sodium reversal and sodium current in both solutions"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Sodium is what is intentionally changed, not what is subtracted as invariant."
          ]
        }
      ],
      "hints": [
        {
          "body": "Subtract the signed reference, infer conductance, then change driving force at fixed gating."
        },
        {
          "body": "First write $I_{Na}=(-1)-(+2)\\,\\mathrm{nA}$. Use the control reversal, not the reference reversal, for the conductance."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Subtract the outward reference.",
        "Preserve sign.",
        "Both numerator and denominator are negative.",
        "The new voltage exceeds reversal.",
        "Current reverses without requiring gate closure.",
        "Sodium is what is intentionally changed, not what is subtracted as invariant."
      ],
      "points": 1,
      "source": "L07 PDF9–10,13–18"
    },
    {
      "id": "L07-experimental-design",
      "sectionId": "blockers",
      "difficulty": "hard",
      "type": "written",
      "prompt": "Design a controlled clamp experiment to separate sodium and potassium and test an unexpected inward residual after TTX. Explain limits of attribution.",
      "hints": [
        {
          "body": "Separate the imposed voltage, ionic driving force and gating state."
        },
        {
          "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
        }
      ],
      "markScheme": [
        {
          "text": "TTX removes sodium and TEA removes potassium in this protocol."
        },
        {
          "text": "Correct capacitive/leak background before attribution."
        },
        {
          "text": "A residual inward current after TTX could indicate incomplete block or another component."
        },
        {
          "text": "Use matched voltage steps and appropriate controls before claiming selectivity."
        },
        {
          "text": "Repeat matched ion-substitution or reversal tests, and verify clamp control and leak subtraction."
        }
      ],
      "modelAnswer": [
        "TTX removes sodium and TEA removes potassium in this protocol.",
        "Correct capacitive/leak background before attribution.",
        "A residual inward current after TTX could indicate incomplete block or another component.",
        "Use matched voltage steps and appropriate controls before claiming selectivity.",
        "Repeat matched ion-substitution or reversal tests, and verify clamp control and leak subtraction."
      ],
      "points": 1,
      "source": "L07 PDF7,9,11–12",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 7, PDF page 12. Control, TTX and TEA source recordings. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 7, PDF page 12. Control, TTX and TEA source recordings. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L07/blockers.webp', import.meta.url).href,
          "alt": "Lecture 7, PDF page 12. Control, TTX and TEA source recordings. Original labels, axes and scale bars retained.",
          "aspect": 0.8648874061718098,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L07-endpoint-audit",
      "sectionId": "balance",
      "difficulty": "hard",
      "type": "derive",
      "prompt": "A printed relation reads $y=y_\\infty-(y_\\infty-y_0)(1-e^{-t/\\tau})$. Test both endpoints, repair it and explain how the error would alter an inferred conductance trajectory.",
      "hints": [
        {
          "body": "Separate the imposed voltage, ionic driving force and gating state."
        },
        {
          "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
        }
      ],
      "markScheme": [
        {
          "text": "At zero time the printed expression gives $y_\\infty$."
        },
        {
          "text": "At long time it gives $y_0$."
        },
        {
          "text": "The consistent relation is $y=y_\\infty+(y_0-y_\\infty)e^{-t/\\tau}$."
        },
        {
          "text": "Power-transforming the incorrect probability reverses the intended initial/steady conductance conditions."
        }
      ],
      "modelAnswer": [
        "At zero time the printed expression gives $y_\\infty$.",
        "At long time it gives $y_0$.",
        "The consistent relation is $y=y_\\infty+(y_0-y_\\infty)e^{-t/\\tau}$.",
        "Power-transforming the incorrect probability reverses the intended initial/steady conductance conditions."
      ],
      "points": 1,
      "source": "L07 PDF 25"
    },
    {
      "id": "L07-transient-sodium",
      "sectionId": "time-courses",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "After a fixed voltage step, $m_0=0.05$, $m_\\infty=0.9$, $h_0=0.8$, $h_\\infty=0.1$, $\\tau_m=0.5\\,\\mathrm{ms}$, $\\tau_h=4\\,\\mathrm{ms}$. At $t=1\\,\\mathrm{ms}$ with $\\bar g_{Na}=100\\,\\mathrm{nS}$, $V_m=-10\\,\\mathrm{mV}$, $E_{Na}=55\\,\\mathrm{mV}$, find both particle probabilities and current. These are stated idealized parameters, not graph readings.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Elapsed time",
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
              "label": "Activation time constant",
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
              "label": "Availability time constant",
              "answer": {
                "value": 0.004,
                "unit": "s",
                "tolerance": 4e-09,
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
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Activation",
          "answer": {
            "value": 0.7849650092488792,
            "unit": "",
            "tolerance": 0.002354895027746638,
            "verification": {
              "relation": "gateRelax",
              "inputs": {
                "y0": 0.05,
                "steady": 0.9,
                "time": 0.001,
                "tau": 0.0005
              },
              "displayScale": 1
            }
          },
          "tex": "m=m_\\infty+(m_0-m_\\infty)e^{-t/\\tau_m}",
          "modelAnswer": [
            "Retain nonzero initial activation.",
            "$m=m_\\infty+(m_0-m_\\infty)e^{-t/\\tau_m}$",
            "$0.78496501$"
          ]
        },
        {
          "title": "Availability",
          "answer": {
            "value": 0.6451605481499835,
            "unit": "",
            "tolerance": 0.0019354816444499504,
            "verification": {
              "relation": "gateRelax",
              "inputs": {
                "y0": 0.8,
                "steady": 0.1,
                "time": 0.001,
                "tau": 0.004
              },
              "displayScale": 1
            }
          },
          "tex": "h=h_\\infty+(h_0-h_\\infty)e^{-t/\\tau_h}",
          "modelAnswer": [
            "Retain nonzero limiting availability.",
            "$h=h_\\infty+(h_0-h_\\infty)e^{-t/\\tau_h}$",
            "$0.64516055$"
          ]
        },
        {
          "title": "Activation product",
          "answer": {
            "value": 0.4836719413564795,
            "unit": "",
            "tolerance": 0.0014510158240694385,
            "verification": {
              "relation": "gatePower",
              "inputs": {
                "y": 0.7849650092488792,
                "count": 3
              },
              "displayScale": 1
            }
          },
          "tex": "A=m^3",
          "modelAnswer": [
            "Three activation factors multiply.",
            "$A=m^3$",
            "$0.48367194$"
          ]
        },
        {
          "title": "Open fraction",
          "answer": {
            "value": 0.312046054810313,
            "unit": "",
            "tolerance": 0.000936138164430939,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 0.4836719413564795,
                "b": 0.6451605481499835
              },
              "displayScale": 1
            }
          },
          "tex": "Y_{Na}=Ah",
          "modelAnswer": [
            "Availability is a separate factor.",
            "$Y_{Na}=Ah$",
            "$0.31204605$"
          ]
        },
        {
          "title": "Conductance",
          "answer": {
            "value": 3.12046054810313e-08,
            "unit": "S",
            "tolerance": 9.361381644309389e-11,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 1e-07,
                "b": 0.312046054810313
              },
              "displayScale": 1
            }
          },
          "tex": "g_{Na}=\\bar g_{Na}Y_{Na}",
          "modelAnswer": [
            "Scale the maximum.",
            "$g_{Na}=\\bar g_{Na}Y_{Na}$",
            "$3.1204605\\times10^{-8}\\,\\mathrm{S}$"
          ]
        },
        {
          "title": "Driving force",
          "answer": {
            "value": -0.065,
            "unit": "V",
            "tolerance": 0.00019500000000000002,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": -0.01,
                "b": -0.055
              },
              "displayScale": 1
            }
          },
          "tex": "D=V_m-E_{Na}",
          "modelAnswer": [
            "Subtract reversal with signs.",
            "$D=V_m-E_{Na}$",
            "$-0.065\\,\\mathrm{V}$"
          ]
        },
        {
          "title": "Ionic current",
          "answer": {
            "value": -2.0282993562670346e-09,
            "unit": "A",
            "tolerance": 6.084898068801104e-12,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 3.12046054810313e-08,
                "b": -0.065
              },
              "displayScale": 1
            }
          },
          "tex": "I_{Na}=g_{Na}D",
          "modelAnswer": [
            "A negative driving force gives inward current.",
            "$I_{Na}=g_{Na}D$",
            "$-2.0282994\\times10^{-9}\\,\\mathrm{A}$"
          ]
        },
        {
          "title": "Boundary check",
          "choices": [
            {
              "label": "Both probabilities remain between their initial and final values"
            },
            {
              "label": "Both probabilities equal one because the voltage step activates sodium"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Activation and availability relax independently."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use the full relaxation for each particle, then $m^3h$ and the Ohmic relation."
        },
        {
          "body": "First convert $t=0.001\\,\\mathrm s$; use separate time constants before multiplying probabilities."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Retain nonzero initial activation.",
        "Retain nonzero limiting availability.",
        "Three activation factors multiply.",
        "Availability is a separate factor.",
        "Scale the maximum.",
        "Subtract reversal with signs.",
        "A negative driving force gives inward current.",
        "Activation and availability relax independently."
      ],
      "points": 1,
      "source": "L07 PDF18,23–27"
    },
    {
      "id": "L07-sketch",
      "sectionId": "time-courses",
      "difficulty": "hard",
      "type": "written",
      "prompt": "On paper sketch a depolarizing clamp step, particle activation and availability, and the resulting sodium/potassium conductances. Label axes, onset and recovery; explain why a zero current is ambiguous.",
      "hints": [
        {
          "body": "Separate the imposed voltage, ionic driving force and gating state."
        },
        {
          "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
        }
      ],
      "markScheme": [
        {
          "text": "Label time and command voltage, then dimensionless $m,n,h$ and conductance axes."
        },
        {
          "text": "Activation rises, availability falls during the step."
        },
        {
          "text": "Sodium conductance rises then falls; potassium rises with delay."
        },
        {
          "text": "Return to holding voltage permits recovery; use distinct kinetics rather than instantaneous resetting."
        },
        {
          "text": "Zero ionic current can reflect reversal or low open probability, so compare conductance and driving force."
        }
      ],
      "modelAnswer": [
        "Label time and command voltage, then dimensionless $m,n,h$ and conductance axes.",
        "Activation rises, availability falls during the step.",
        "Sodium conductance rises then falls; potassium rises with delay.",
        "Return to holding voltage permits recovery; use distinct kinetics rather than instantaneous resetting.",
        "Zero ionic current can reflect reversal or low open probability, so compare conductance and driving force."
      ],
      "points": 1,
      "source": "L07 PDF 27",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 7, PDF page 27. Source voltage step, gating variables and conductance products. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 7, PDF page 27. Source voltage step, gating variables and conductance products. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L07/time.webp', import.meta.url).href,
          "alt": "Lecture 7, PDF page 27. Source voltage step, gating variables and conductance products. Original labels, axes and scale bars retained.",
          "aspect": 0.9829222011385199,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L07-infer-root-rates",
      "sectionId": "fit",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "A corrected steady potassium conductance is $6.25\\,\\mathrm{nS}$ out of $100\\,\\mathrm{nS}$ maximum. A fit to the fourth-power relaxation gives particle $\\tau_n=2\\,\\mathrm{ms}$. Recover $n_\\infty$, both transition rates and $n(t)$ at $2\\,\\mathrm{ms}$ starting from $n_0=0.1$. Explain why fitting a single conductance exponential is inadequate.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Steady conductance",
              "answer": {
                "value": 6.25e-09,
                "unit": "S",
                "tolerance": 6.2499999999999994e-15,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 6.25e-09,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
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
              "label": "Particle time constant",
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
          "title": "Conductance fraction",
          "answer": {
            "value": 0.0625,
            "unit": "",
            "tolerance": 0.0001875,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 6.25e-09,
                "b": 1e-07
              },
              "displayScale": 1
            }
          },
          "tex": "f=g_\\infty/\\bar g",
          "modelAnswer": [
            "Normalize first.",
            "$f=g_\\infty/\\bar g$",
            "$0.0625$"
          ]
        },
        {
          "title": "Particle probability",
          "answer": {
            "value": 0.5,
            "unit": "",
            "tolerance": 0.0015,
            "verification": {
              "relation": "powerRatio",
              "inputs": {
                "a": 0.0625,
                "b": 1,
                "power": 0.25
              },
              "displayScale": 1
            }
          },
          "tex": "n_\\infty=f^{1/4}",
          "modelAnswer": [
            "Take the fourth root.",
            "$n_\\infty=f^{1/4}$",
            "$0.5$"
          ]
        },
        {
          "title": "Forward rate",
          "answer": {
            "value": 250,
            "unit": "1/s",
            "tolerance": 0.75,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 0.5,
                "b": 0.002
              },
              "displayScale": 1
            }
          },
          "tex": "\\alpha_n=n_\\infty/\\tau_n",
          "modelAnswer": [
            "Use the particle fraction.",
            "$\\alpha_n=n_\\infty/\\tau_n$",
            "$250\\,\\mathrm{s^{-1}}$"
          ]
        },
        {
          "title": "Backward rate",
          "answer": {
            "value": 250,
            "unit": "1/s",
            "tolerance": 0.75,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 0.5,
                "b": 0.002
              },
              "displayScale": 1
            }
          },
          "tex": "\\beta_n=(1-n_\\infty)/\\tau_n",
          "modelAnswer": [
            "Use its complement.",
            "$\\beta_n=(1-n_\\infty)/\\tau_n$",
            "$250\\,\\mathrm{s^{-1}}$"
          ]
        },
        {
          "title": "Finite-time activation",
          "answer": {
            "value": 0.3528482235314231,
            "unit": "",
            "tolerance": 0.0010585446705942694,
            "verification": {
              "relation": "gateRelax",
              "inputs": {
                "y0": 0.1,
                "steady": 0.5,
                "time": 0.002,
                "tau": 0.002
              },
              "displayScale": 1
            }
          },
          "tex": "n(t)=0.5+(0.1-0.5)e^{-1}",
          "modelAnswer": [
            "The particle relaxes exponentially.",
            "$n(t)=0.5+(0.1-0.5)e^{-1}$",
            "$0.35284822$"
          ]
        },
        {
          "title": "Fit interpretation",
          "choices": [
            {
              "label": "Conductance is a fourth power of particle relaxation"
            },
            {
              "label": "Conductance and particle probability have identical exponential traces"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Power transformation changes the trace shape."
          ]
        }
      ],
      "hints": [
        {
          "body": "Normalize conductance, take a fourth root, then use steady probability and particle time constant."
        },
        {
          "body": "Start with $f=6.25/100$. Recover particle probability before computing rates."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Normalize first.",
        "Take the fourth root.",
        "Use the particle fraction.",
        "Use its complement.",
        "The particle relaxes exponentially.",
        "Power transformation changes the trace shape."
      ],
      "points": 1,
      "source": "L07 PDF23,25–28,30"
    },
    {
      "id": "L07-recover-population",
      "sectionId": "infer",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "An idealized potassium component has steady particle probability $0.7$, particle time constant $3\\,\\mathrm{ms}$, maximum conductance $50\\,\\mathrm{nS}$, test voltage $-20\\,\\mathrm{mV}$ and reversal $-80\\,\\mathrm{mV}$. Recover both rates, channel open fraction, conductance and signed steady current.",
      "stages": [
        {
          "title": "Choose the route",
          "choices": [
            {
              "label": "Infer rates, multiply required factors, then use driving force"
            },
            {
              "label": "Use particle fraction directly as conductance, then sum reversals"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The conductance fraction is the fourth power, not the particle fraction."
          ]
        },
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Time constant",
              "answer": {
                "value": 0.003,
                "unit": "s",
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
              "label": "Maximum",
              "answer": {
                "value": 5e-08,
                "unit": "S",
                "tolerance": 4.9999999999999995e-14,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 5e-08,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Test voltage",
              "answer": {
                "value": -0.02,
                "unit": "V",
                "tolerance": 2e-08,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -0.02,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Reversal",
              "answer": {
                "value": -0.08,
                "unit": "V",
                "tolerance": 8e-08,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -0.08,
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
          "title": "Forward rate",
          "answer": {
            "value": 233.33333333333331,
            "unit": "1/s",
            "tolerance": 0.7,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 0.7,
                "b": 0.003
              },
              "displayScale": 1
            }
          },
          "tex": "\\alpha=n_\\infty/\\tau",
          "modelAnswer": [
            "Divide the steady fraction by time constant.",
            "$\\alpha=n_\\infty/\\tau$",
            "$233.33333\\,\\mathrm{s^{-1}}$"
          ]
        },
        {
          "title": "Backward rate",
          "answer": {
            "value": 100.00000000000001,
            "unit": "1/s",
            "tolerance": 0.30000000000000004,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 0.30000000000000004,
                "b": 0.003
              },
              "displayScale": 1
            }
          },
          "tex": "\\beta=(1-n_\\infty)/\\tau",
          "modelAnswer": [
            "Use the complementary probability.",
            "$\\beta=(1-n_\\infty)/\\tau$",
            "$100\\,\\mathrm{s^{-1}}$"
          ]
        },
        {
          "title": "Channel open fraction",
          "answer": {
            "value": 0.24009999999999995,
            "unit": "",
            "tolerance": 0.0007202999999999999,
            "verification": {
              "relation": "gatePower",
              "inputs": {
                "y": 0.7,
                "count": 4
              },
              "displayScale": 1
            }
          },
          "tex": "Y_K=n_\\infty^4",
          "modelAnswer": [
            "Four activation factors are required.",
            "$Y_K=n_\\infty^4$",
            "$0.2401$"
          ]
        },
        {
          "title": "Conductance",
          "answer": {
            "value": 1.2004999999999997e-08,
            "unit": "S",
            "tolerance": 3.601499999999999e-11,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 5e-08,
                "b": 0.24009999999999995
              },
              "displayScale": 1
            }
          },
          "tex": "g_K=\\bar g_KY_K",
          "modelAnswer": [
            "Scale the maximum.",
            "$g_K=\\bar g_KY_K$",
            "$1.2005\\times10^{-8}\\,\\mathrm{S}$"
          ]
        },
        {
          "title": "Driving force",
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
          "tex": "D=V_m-E_K",
          "modelAnswer": [
            "Subtract signed reversal.",
            "$D=V_m-E_K$",
            "$0.06\\,\\mathrm{V}$"
          ]
        },
        {
          "title": "Current",
          "answer": {
            "value": 7.202999999999998e-10,
            "unit": "A",
            "tolerance": 2.1608999999999994e-12,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 1.2004999999999997e-08,
                "b": 0.06
              },
              "displayScale": 1
            }
          },
          "tex": "I_K=g_KD",
          "modelAnswer": [
            "A positive driving force yields outward current.",
            "$I_K=g_KD$",
            "$7.203\\times10^{-10}\\,\\mathrm{A}$"
          ]
        },
        {
          "title": "Sanity check",
          "choices": [
            {
              "label": "Conductance lies below its maximum and current follows driving force"
            },
            {
              "label": "Conductance exceeds its maximum whenever current is outward"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Both probability and current sign must be physically consistent."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\alpha=y_\\infty/\\tau$, $\\beta=(1-y_\\infty)/\\tau$, $g_K=\\bar g_K n^4$ and $I=g(V-E)$."
        },
        {
          "body": "Start with $\\tau=0.003\\,\\mathrm s$. Calculate each rate, then channel probability and driving force separately."
        }
      ],
      "modelAnswer": [
        "The conductance fraction is the fourth power, not the particle fraction.",
        "Convert each stated quantity to the requested unit before evaluating.",
        "Divide the steady fraction by time constant.",
        "Use the complementary probability.",
        "Four activation factors are required.",
        "Scale the maximum.",
        "Subtract signed reversal.",
        "A positive driving force yields outward current.",
        "Both probability and current sign must be physically consistent."
      ],
      "points": 1,
      "source": "L07 PDF23–26,30; L01 current convention"
    },
    {
      "id": "L07-singular-rate",
      "sectionId": "empirical",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "For the source squid laws take $V_{rest}=-65\\,\\mathrm{mV}$ and $V_m=-55\\,\\mathrm{mV}$. Convert to $U$, evaluate both potassium rates including the removable singularity, then find steady activation, time constant and the steady conductance fraction.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Absolute voltage",
              "answer": {
                "value": -0.055,
                "unit": "V",
                "tolerance": 5.4999999999999996e-08,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -0.055,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Resting voltage",
              "answer": {
                "value": -0.065,
                "unit": "V",
                "tolerance": 6.5e-08,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -0.065,
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
          "title": "Rest-relative voltage",
          "answer": {
            "value": 0.01,
            "unit": "V",
            "tolerance": 3e-05,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": -0.055,
                "b": 0.065
              },
              "displayScale": 1
            }
          },
          "tex": "U=V_m-V_{rest}",
          "modelAnswer": [
            "Use the source empirical origin.",
            "$U=V_m-V_{rest}$",
            "$0.01\\,\\mathrm{V}$"
          ]
        },
        {
          "title": "Forward rate continuous limit",
          "answer": {
            "value": 100,
            "unit": "1/s",
            "tolerance": 0.3,
            "verification": {
              "relation": "hhRate",
              "inputs": {
                "gate": "an",
                "voltage": 0.01
              },
              "displayScale": 1
            }
          },
          "tex": "\\alpha_n\\longrightarrow0.1\\,\\mathrm{ms^{-1}}",
          "modelAnswer": [
            "Use $x/(e^x-1)$ approaching one.",
            "$\\alpha_n\\longrightarrow0.1\\,\\mathrm{ms^{-1}}$",
            "$100\\,\\mathrm{s^{-1}}$"
          ]
        },
        {
          "title": "Backward rate",
          "answer": {
            "value": 110.31211282307443,
            "unit": "1/s",
            "tolerance": 0.33093633846922327,
            "verification": {
              "relation": "hhRate",
              "inputs": {
                "gate": "bn",
                "voltage": 0.01
              },
              "displayScale": 1
            }
          },
          "tex": "\\beta_n=0.125e^{-10/80}\\,\\mathrm{ms^{-1}}",
          "modelAnswer": [
            "Convert inverse milliseconds to inverse seconds.",
            "$\\beta_n=0.125e^{-10/80}\\,\\mathrm{ms^{-1}}$",
            "$110.31211\\,\\mathrm{s^{-1}}$"
          ]
        },
        {
          "title": "Steady activation",
          "answer": {
            "value": 0.47548378767952965,
            "unit": "",
            "tolerance": 0.001426451363038589,
            "verification": {
              "relation": "gateSteady",
              "inputs": {
                "alpha": 100,
                "beta": 110.31211282307443
              },
              "displayScale": 1
            }
          },
          "tex": "n_\\infty=\\alpha_n/(\\alpha_n+\\beta_n)",
          "modelAnswer": [
            "Compute the rate ratio.",
            "$n_\\infty=\\alpha_n/(\\alpha_n+\\beta_n)$",
            "$0.47548379$"
          ]
        },
        {
          "title": "Time constant",
          "answer": {
            "value": 0.0047548378767952966,
            "unit": "s",
            "tolerance": 1.426451363038589e-05,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 1,
                "b": 210.31211282307441
              },
              "displayScale": 1
            }
          },
          "tex": "\\tau_n=1/(\\alpha_n+\\beta_n)",
          "modelAnswer": [
            "Use inverse seconds for a seconds result.",
            "$\\tau_n=1/(\\alpha_n+\\beta_n)$",
            "$0.0047548379\\,\\mathrm{s}$"
          ]
        },
        {
          "title": "Steady conductance fraction",
          "answer": {
            "value": 0.051114351416951496,
            "unit": "",
            "tolerance": 0.0001533430542508545,
            "verification": {
              "relation": "gatePower",
              "inputs": {
                "y": 0.47548378767952965,
                "count": 4
              },
              "displayScale": 1
            }
          },
          "tex": "g_{K,\\infty}/\\bar g_K=n_\\infty^4",
          "modelAnswer": [
            "Do not substitute the particle fraction directly.",
            "$g_{K,\\infty}/\\bar g_K=n_\\infty^4$",
            "$0.051114351$"
          ]
        }
      ],
      "hints": [
        {
          "body": "First identify the empirical voltage origin, then the continuous rate limit."
        },
        {
          "body": "Start with $U=(-55)-(-65)\\,\\mathrm{mV}$. Evaluate rates before their ratio and sum."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Use the source empirical origin.",
        "Use $x/(e^x-1)$ approaching one.",
        "Convert inverse milliseconds to inverse seconds.",
        "Compute the rate ratio.",
        "Use inverse seconds for a seconds result.",
        "Do not substitute the particle fraction directly."
      ],
      "points": 1,
      "source": "L07 PDF23,25–26,31"
    },
    {
      "id": "L07-group-synthesis",
      "sectionId": "group",
      "difficulty": "hard",
      "type": "written",
      "prompt": "Compare mild and strong sustained external potassium elevation, then combine reduced external sodium with sustained potassium elevation. Explain a possible reduced action potential despite depolarized rest.",
      "hints": [
        {
          "body": "Separate the imposed voltage, ionic driving force and gating state."
        },
        {
          "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
        }
      ],
      "markScheme": [
        {
          "text": "Raised external potassium makes potassium reversal less negative."
        },
        {
          "text": "Rest depolarizes, which can initially increase excitability."
        },
        {
          "text": "Strong sustained depolarization reduces sodium availability."
        },
        {
          "text": "Reduced external sodium lowers sodium reversal and the overshoot."
        },
        {
          "text": "Reduced sodium driving force and reduced availability can jointly suppress the upstroke despite a depolarized resting membrane."
        }
      ],
      "modelAnswer": [
        "Raised external potassium makes potassium reversal less negative.",
        "Rest depolarizes, which can initially increase excitability.",
        "Strong sustained depolarization reduces sodium availability.",
        "Reduced external sodium lowers sodium reversal and the overshoot.",
        "Reduced sodium driving force and reduced availability can jointly suppress the upstroke despite a depolarized resting membrane."
      ],
      "points": 1,
      "source": "L07 PDF 32–33",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Lecture 7, PDF page 32. Group-work gating curves and interpretation prompts. Original labels, axes and scale bars retained.",
        "fallbackAlt": "Lecture 7, PDF page 32. Group-work gating curves and interpretation prompts. Original labels, axes and scale bars retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L07/group.webp', import.meta.url).href,
          "alt": "Lecture 7, PDF page 32. Group-work gating curves and interpretation prompts. Original labels, axes and scale bars retained.",
          "aspect": 0.8902743142144638,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L07-core-recover",
      "sectionId": "fit",
      "type": "mc",
      "difficulty": "hard",
      "source": "L07 PDF 23–30",
      "prompt": "At a held voltage, $g_{K,\\infty}/\\bar g_K=1/16$. The fitted particle time constant is $2\\,\\mathrm{ms}$. What is the forward rate?",
      "options": [
        {
          "text": "$0.03125\\,\\mathrm{ms}^{-1}$",
          "feedback": "This uses the channel fraction directly in the rate equation. Take the fourth root first."
        },
        {
          "text": "$0.125\\,\\mathrm{ms}^{-1}$",
          "feedback": "This uses a square root. The fourth root of one sixteenth is one half."
        },
        {
          "text": "$0.25\\,\\mathrm{ms}^{-1}$",
          "feedback": "The fourth root gives a particle probability of one half. Dividing it by two milliseconds gives the forward rate."
        }
      ],
      "correct": 2,
      "hints": [
        {
          "body": "First recover the steady particle probability from the whole-channel fraction."
        },
        {
          "body": "Take $(1/16)^{1/4}$, then divide by $2\\,\\mathrm{ms}$."
        }
      ],
      "modelAnswer": [
        "The fourth root gives a particle probability of one half. Dividing it by two milliseconds gives the forward rate."
      ]
    },
    {
      "id": "L07-core-transient-sign",
      "sectionId": "time-courses",
      "type": "mc",
      "difficulty": "hard",
      "source": "L07 PDF 23–27",
      "prompt": "Just after a jump above $E_{Na}$, compare two isolated sodium currents before gates respond. Both trials have the same $m$ and $\\bar g_{Na}$. A longer prepulse halved $h$ in the second. How does its ionic current compare?",
      "options": [
        {
          "text": "Outward with half the magnitude",
          "feedback": "The positive driving force makes current outward. Halving availability halves the sodium conductance at fixed activation."
        },
        {
          "text": "Inward with half the magnitude",
          "feedback": "The magnitude halves, but the test voltage is above sodium reversal."
        },
        {
          "text": "Outward with twice the magnitude",
          "feedback": "The direction is outward. Lower availability reduces the product and the current magnitude."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Find the sign from the test driving force, then compare conductances using the sodium product."
        },
        {
          "body": "$V_m-E_{Na}>0$ for both trials. At fixed $m$, the conductance ratio equals the ratio of $h$."
        }
      ],
      "modelAnswer": [
        "The positive driving force makes current outward. Halving availability halves the sodium conductance at fixed activation."
      ]
    },
    {
      "id": "L07-core-origin-limit",
      "practice": "extra",
      "sectionId": "empirical",
      "type": "mc",
      "difficulty": "hard",
      "source": "L07 PDF 25–31",
      "prompt": "The squid model rests at $-65\\,\\mathrm{mV}$. After a clamp step to $-55\\,\\mathrm{mV}$, $\\beta_n=0.1103\\,\\mathrm{ms}^{-1}$. What is the particle time constant at the new voltage?",
      "options": [
        {
          "text": "$9.1\\,\\mathrm{ms}$",
          "feedback": "This sets the forward rate to zero at the removable singularity. Its finite limit contributes to the sum."
        },
        {
          "text": "$4.8\\,\\mathrm{ms}$",
          "feedback": "The shift is ten millivolts above rest. Add 0.10 and 0.1103 per millisecond, then take the reciprocal to obtain about 4.8 milliseconds."
        },
        {
          "text": "$10.0\\,\\mathrm{ms}$",
          "feedback": "This uses the forward rate alone. Both directions contribute to the relaxation rate."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Convert to rest-relative voltage, then handle the activation-rate limit before taking the reciprocal sum."
        },
        {
          "body": "Use $U=10\\,\\mathrm{mV}$ and add the limiting $\\alpha_n=0.10\\,\\mathrm{ms}^{-1}$ to the given $\\beta_n$."
        }
      ],
      "modelAnswer": [
        "The shift is ten millivolts above rest. Add 0.10 and 0.1103 per millisecond, then take the reciprocal to obtain about 4.8 milliseconds."
      ]
    }
  ],
  "mockExams": [
    {
      "id": "L07-mock-a",
      "title": "Mock A: Infer particles and predict transient currents",
      "coverage": "Lectures 1–7 only. Distinct HH experimental and gating reasoning. Official five-group structure; practice criteria are not official weights. Calculator and permanent supplied equation sheet available.",
      "questions": [
        {
          "id": "L07-a1",
          "role": "concepts",
          "difficulty": "medium",
          "type": "written",
          "prompt": "Answer briefly: a) Distinguish membrane voltage from empirical depolarization U. b) Distinguish particle probability from channel open fraction. c) Distinguish closed from inactivated. d) State what TEVC controls and records.",
          "hints": [
            {
              "body": "Separate the imposed voltage, ionic driving force and gating state."
            },
            {
              "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
            }
          ],
          "markScheme": [
            {
              "text": "$V_m$ is inside minus outside; $U$ is change from resting voltage."
            },
            {
              "text": "All-required independent particle probabilities multiply."
            },
            {
              "text": "Closed is available; inactivated is temporarily unavailable."
            },
            {
              "text": "TEVC controls voltage and records compensating current with transient/polarity qualifications."
            }
          ],
          "modelAnswer": [
            "$V_m$ is inside minus outside; $U$ is change from resting voltage.",
            "All-required independent particle probabilities multiply.",
            "Closed is available; inactivated is temporarily unavailable.",
            "TEVC controls voltage and records compensating current with transient/polarity qualifications."
          ],
          "points": 1,
          "source": "L07 PDF7,20–21,23–24,31; L01 voltage/current conventions"
        },
        {
          "id": "L07-a2",
          "role": "explanation",
          "difficulty": "medium",
          "type": "written",
          "prompt": "Explain how all-required particle probabilities produce delayed potassium and transient sodium conductance. Sketch both after a clamp step.",
          "hints": [
            {
              "body": "Separate the imposed voltage, ionic driving force and gating state."
            },
            {
              "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
            }
          ],
          "markScheme": [
            {
              "text": "Independent all-required particle probabilities multiply."
            },
            {
              "text": "Potassium uses four activation factors."
            },
            {
              "text": "Sodium uses three activation factors and one availability factor."
            },
            {
              "text": "A high single-particle probability can coexist with a small channel open fraction."
            },
            {
              "text": "Activation powers create delayed onset."
            },
            {
              "text": "Sodium activation rises rapidly while availability falls."
            },
            {
              "text": "Their product therefore rises then declines."
            },
            {
              "text": "The zero initial activation and zero final availability approximations are conditional."
            }
          ],
          "modelAnswer": [
            "Independent all-required particle probabilities multiply.",
            "Potassium uses four activation factors.",
            "Sodium uses three activation factors and one availability factor.",
            "A high single-particle probability can coexist with a small channel open fraction.",
            "Activation powers create delayed onset.",
            "Sodium activation rises rapidly while availability falls.",
            "Their product therefore rises then declines.",
            "The zero initial activation and zero final availability approximations are conditional."
          ],
          "points": 1,
          "source": "L07 PDF23–27",
          "figure": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 7, PDF page 18. Separated currents and corresponding sodium and potassium conductances. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 7, PDF page 18. Separated currents and corresponding sodium and potassium conductances. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L07/conductances.webp', import.meta.url).href,
              "alt": "Lecture 7, PDF page 18. Separated currents and corresponding sodium and potassium conductances. Original labels, axes and scale bars retained.",
              "aspect": 2.0032626427406197,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        },
        {
          "id": "L07-a3",
          "role": "calculation",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "An idealized potassium component has steady particle probability $0.7$, particle time constant $3\\,\\mathrm{ms}$, maximum conductance $50\\,\\mathrm{nS}$, test voltage $-20\\,\\mathrm{mV}$ and reversal $-80\\,\\mathrm{mV}$. Recover both rates, channel open fraction, conductance and signed steady current.",
          "stages": [
            {
              "title": "Choose the route",
              "choices": [
                {
                  "label": "Infer rates, multiply required factors, then use driving force"
                },
                {
                  "label": "Use particle fraction directly as conductance, then sum reversals"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "The conductance fraction is the fourth power, not the particle fraction."
              ]
            },
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "Time constant",
                  "answer": {
                    "value": 0.003,
                    "unit": "s",
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
                  "label": "Maximum",
                  "answer": {
                    "value": 5e-08,
                    "unit": "S",
                    "tolerance": 4.9999999999999995e-14,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 5e-08,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Test voltage",
                  "answer": {
                    "value": -0.02,
                    "unit": "V",
                    "tolerance": 2e-08,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": -0.02,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Reversal",
                  "answer": {
                    "value": -0.08,
                    "unit": "V",
                    "tolerance": 8e-08,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": -0.08,
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
              "title": "Forward rate",
              "answer": {
                "value": 233.33333333333331,
                "unit": "1/s",
                "tolerance": 0.7,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.7,
                    "b": 0.003
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\alpha=n_\\infty/\\tau",
              "modelAnswer": [
                "Divide the steady fraction by time constant.",
                "$\\alpha=n_\\infty/\\tau$",
                "$233.33333\\,\\mathrm{s^{-1}}$"
              ]
            },
            {
              "title": "Backward rate",
              "answer": {
                "value": 100.00000000000001,
                "unit": "1/s",
                "tolerance": 0.30000000000000004,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.30000000000000004,
                    "b": 0.003
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\beta=(1-n_\\infty)/\\tau",
              "modelAnswer": [
                "Use the complementary probability.",
                "$\\beta=(1-n_\\infty)/\\tau$",
                "$100\\,\\mathrm{s^{-1}}$"
              ]
            },
            {
              "title": "Channel open fraction",
              "answer": {
                "value": 0.24009999999999995,
                "unit": "",
                "tolerance": 0.0007202999999999999,
                "verification": {
                  "relation": "gatePower",
                  "inputs": {
                    "y": 0.7,
                    "count": 4
                  },
                  "displayScale": 1
                }
              },
              "tex": "Y_K=n_\\infty^4",
              "modelAnswer": [
                "Four activation factors are required.",
                "$Y_K=n_\\infty^4$",
                "$0.2401$"
              ]
            },
            {
              "title": "Conductance",
              "answer": {
                "value": 1.2004999999999997e-08,
                "unit": "S",
                "tolerance": 3.601499999999999e-11,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 5e-08,
                    "b": 0.24009999999999995
                  },
                  "displayScale": 1
                }
              },
              "tex": "g_K=\\bar g_KY_K",
              "modelAnswer": [
                "Scale the maximum.",
                "$g_K=\\bar g_KY_K$",
                "$1.2005\\times10^{-8}\\,\\mathrm{S}$"
              ]
            },
            {
              "title": "Driving force",
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
              "tex": "D=V_m-E_K",
              "modelAnswer": [
                "Subtract signed reversal.",
                "$D=V_m-E_K$",
                "$0.06\\,\\mathrm{V}$"
              ]
            },
            {
              "title": "Current",
              "answer": {
                "value": 7.202999999999998e-10,
                "unit": "A",
                "tolerance": 2.1608999999999994e-12,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 1.2004999999999997e-08,
                    "b": 0.06
                  },
                  "displayScale": 1
                }
              },
              "tex": "I_K=g_KD",
              "modelAnswer": [
                "A positive driving force yields outward current.",
                "$I_K=g_KD$",
                "$7.203\\times10^{-10}\\,\\mathrm{A}$"
              ]
            },
            {
              "title": "Sanity check",
              "choices": [
                {
                  "label": "Conductance lies below its maximum and current follows driving force"
                },
                {
                  "label": "Conductance exceeds its maximum whenever current is outward"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "Both probability and current sign must be physically consistent."
              ]
            }
          ],
          "hints": [
            {
              "body": "Use $\\alpha=y_\\infty/\\tau$, $\\beta=(1-y_\\infty)/\\tau$, $g_K=\\bar g_K n^4$ and $I=g(V-E)$."
            },
            {
              "body": "Start with $\\tau=0.003\\,\\mathrm s$. Calculate each rate, then channel probability and driving force separately."
            }
          ],
          "modelAnswer": [
            "The conductance fraction is the fourth power, not the particle fraction.",
            "Convert each stated quantity to the requested unit before evaluating.",
            "Divide the steady fraction by time constant.",
            "Use the complementary probability.",
            "Four activation factors are required.",
            "Scale the maximum.",
            "Subtract signed reversal.",
            "A positive driving force yields outward current.",
            "Both probability and current sign must be physically consistent."
          ],
          "points": 1,
          "source": "L07 PDF23–26,30; L01 current convention"
        },
        {
          "id": "L07-a4",
          "role": "calculation",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "After a fixed voltage step, $m_0=0.05$, $m_\\infty=0.9$, $h_0=0.8$, $h_\\infty=0.1$, $\\tau_m=0.5\\,\\mathrm{ms}$, $\\tau_h=4\\,\\mathrm{ms}$. At $t=1\\,\\mathrm{ms}$ with $\\bar g_{Na}=100\\,\\mathrm{nS}$, $V_m=-10\\,\\mathrm{mV}$, $E_{Na}=55\\,\\mathrm{mV}$, find both particle probabilities and current. These are stated idealized parameters, not graph readings.",
          "stages": [
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "Elapsed time",
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
                  "label": "Activation time constant",
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
                  "label": "Availability time constant",
                  "answer": {
                    "value": 0.004,
                    "unit": "s",
                    "tolerance": 4e-09,
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
                }
              ],
              "modelAnswer": [
                "Convert each stated quantity to the requested unit before evaluating."
              ]
            },
            {
              "title": "Activation",
              "answer": {
                "value": 0.7849650092488792,
                "unit": "",
                "tolerance": 0.002354895027746638,
                "verification": {
                  "relation": "gateRelax",
                  "inputs": {
                    "y0": 0.05,
                    "steady": 0.9,
                    "time": 0.001,
                    "tau": 0.0005
                  },
                  "displayScale": 1
                }
              },
              "tex": "m=m_\\infty+(m_0-m_\\infty)e^{-t/\\tau_m}",
              "modelAnswer": [
                "Retain nonzero initial activation.",
                "$m=m_\\infty+(m_0-m_\\infty)e^{-t/\\tau_m}$",
                "$0.78496501$"
              ]
            },
            {
              "title": "Availability",
              "answer": {
                "value": 0.6451605481499835,
                "unit": "",
                "tolerance": 0.0019354816444499504,
                "verification": {
                  "relation": "gateRelax",
                  "inputs": {
                    "y0": 0.8,
                    "steady": 0.1,
                    "time": 0.001,
                    "tau": 0.004
                  },
                  "displayScale": 1
                }
              },
              "tex": "h=h_\\infty+(h_0-h_\\infty)e^{-t/\\tau_h}",
              "modelAnswer": [
                "Retain nonzero limiting availability.",
                "$h=h_\\infty+(h_0-h_\\infty)e^{-t/\\tau_h}$",
                "$0.64516055$"
              ]
            },
            {
              "title": "Activation product",
              "answer": {
                "value": 0.4836719413564795,
                "unit": "",
                "tolerance": 0.0014510158240694385,
                "verification": {
                  "relation": "gatePower",
                  "inputs": {
                    "y": 0.7849650092488792,
                    "count": 3
                  },
                  "displayScale": 1
                }
              },
              "tex": "A=m^3",
              "modelAnswer": [
                "Three activation factors multiply.",
                "$A=m^3$",
                "$0.48367194$"
              ]
            },
            {
              "title": "Open fraction",
              "answer": {
                "value": 0.312046054810313,
                "unit": "",
                "tolerance": 0.000936138164430939,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 0.4836719413564795,
                    "b": 0.6451605481499835
                  },
                  "displayScale": 1
                }
              },
              "tex": "Y_{Na}=Ah",
              "modelAnswer": [
                "Availability is a separate factor.",
                "$Y_{Na}=Ah$",
                "$0.31204605$"
              ]
            },
            {
              "title": "Conductance",
              "answer": {
                "value": 3.12046054810313e-08,
                "unit": "S",
                "tolerance": 9.361381644309389e-11,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 1e-07,
                    "b": 0.312046054810313
                  },
                  "displayScale": 1
                }
              },
              "tex": "g_{Na}=\\bar g_{Na}Y_{Na}",
              "modelAnswer": [
                "Scale the maximum.",
                "$g_{Na}=\\bar g_{Na}Y_{Na}$",
                "$3.1204605\\times10^{-8}\\,\\mathrm{S}$"
              ]
            },
            {
              "title": "Driving force",
              "answer": {
                "value": -0.065,
                "unit": "V",
                "tolerance": 0.00019500000000000002,
                "verification": {
                  "relation": "sum",
                  "inputs": {
                    "a": -0.01,
                    "b": -0.055
                  },
                  "displayScale": 1
                }
              },
              "tex": "D=V_m-E_{Na}",
              "modelAnswer": [
                "Subtract reversal with signs.",
                "$D=V_m-E_{Na}$",
                "$-0.065\\,\\mathrm{V}$"
              ]
            },
            {
              "title": "Ionic current",
              "answer": {
                "value": -2.0282993562670346e-09,
                "unit": "A",
                "tolerance": 6.084898068801104e-12,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 3.12046054810313e-08,
                    "b": -0.065
                  },
                  "displayScale": 1
                }
              },
              "tex": "I_{Na}=g_{Na}D",
              "modelAnswer": [
                "A negative driving force gives inward current.",
                "$I_{Na}=g_{Na}D$",
                "$-2.0282994\\times10^{-9}\\,\\mathrm{A}$"
              ]
            },
            {
              "title": "Boundary check",
              "choices": [
                {
                  "label": "Both probabilities remain between their initial and final values"
                },
                {
                  "label": "Both probabilities equal one because the voltage step activates sodium"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "Activation and availability relax independently."
              ]
            }
          ],
          "hints": [
            {
              "body": "Use the full relaxation for each particle, then $m^3h$ and the Ohmic relation."
            },
            {
              "body": "First convert $t=0.001\\,\\mathrm s$; use separate time constants before multiplying probabilities."
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating.",
            "Retain nonzero initial activation.",
            "Retain nonzero limiting availability.",
            "Three activation factors multiply.",
            "Availability is a separate factor.",
            "Scale the maximum.",
            "Subtract reversal with signs.",
            "A negative driving force gives inward current.",
            "Activation and availability relax independently."
          ],
          "points": 1,
          "source": "L07 PDF18,23–27"
        },
        {
          "id": "L07-a5",
          "role": "methods",
          "difficulty": "medium",
          "type": "written",
          "prompt": "Interpret the supplied conductance/current panel. Explain why inward sodium current can disappear either through inactivation or through reversal, and specify a distinguishing clamp test. What shift under a change in external sodium would support the component assignment?",
          "hints": [
            {
              "body": "Separate the imposed voltage, ionic driving force and gating state."
            },
            {
              "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
            }
          ],
          "markScheme": [
            {
              "text": "Use the component-specific reversal potential."
            },
            {
              "text": "Divide corrected current by voltage minus reversal."
            },
            {
              "text": "Do not divide by zero at reversal."
            },
            {
              "text": "Use nearby nonzero driving force or an instantaneous slope instead."
            },
            {
              "text": "Compare multiple test voltages at matched prior gating and test availability with a controlled prepulse."
            },
            { "text": "The reversal of the isolated early component should shift in the direction predicted for the sodium equilibrium potential." }
          ],
          "modelAnswer": [
            "Use the component-specific reversal potential.",
            "Divide corrected current by voltage minus reversal.",
            "Do not divide by zero at reversal.",
            "Use nearby nonzero driving force or an instantaneous slope instead.",
            "Compare multiple test voltages at matched prior gating and test availability with a controlled prepulse.",
            "The reversal of the isolated early component should shift in the direction predicted for the sodium equilibrium potential."
          ],
          "points": 1,
          "source": "L07 PDF7–9,18,22",
          "figure": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 7, PDF page 18. Separated currents and corresponding sodium and potassium conductances. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 7, PDF page 18. Separated currents and corresponding sodium and potassium conductances. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L07/conductances.webp', import.meta.url).href,
              "alt": "Lecture 7, PDF page 18. Separated currents and corresponding sodium and potassium conductances. Original labels, axes and scale bars retained.",
              "aspect": 2.0032626427406197,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ]
    },
    {
      "id": "L07-mock-b",
      "title": "Mock B: Freeze gating and audit empirical rate conventions",
      "coverage": "Lectures 1–7 only. Distinct HH experimental and gating reasoning. Official five-group structure; practice criteria are not official weights. Calculator and permanent supplied equation sheet available.",
      "questions": [
        {
          "id": "L07-b1",
          "role": "concepts",
          "difficulty": "medium",
          "type": "written",
          "prompt": "Answer each in 1–3 sentences: a) What is held approximately fixed in an instantaneous current–voltage protocol? b) Why can an open sodium channel carry zero net current? c) What ionic component remains after selective TTX in the taught preparation? d) Why must the empirical squid rate laws use a stated voltage origin and temperature?",
          "hints": [
            {
              "body": "Separate pore conductance, ionic driving force, selective blockade and the conditions of an empirical fit."
            },
            {
              "body": "Start with the shared conditioning step and the short interval before gating changes. Then consider reversal, the unblocked component and the fit convention separately."
            }
          ],
          "markScheme": [
            {
              "text": "The conditioning history and initial gating state are matched; ionic current is sampled before gating changes appreciably, after resolving capacitance."
            },
            {
              "text": "At sodium reversal the driving force is zero; open channels need not carry net sodium current."
            },
            {
              "text": "Selective TTX removes sodium current; potassium remains after background and capacitive corrections."
            },
            {
              "text": "The empirical laws use rest-relative depolarization at the source squid fit temperature; an absolute-voltage input or unstated temperature extrapolation changes their meaning."
            }
          ],
          "modelAnswer": [
            "Match the conditioning step and sample the rapid ionic response while gating remains approximately fixed, resolving the capacitive transient.",
            "An open channel at sodium reversal has zero driving force and therefore zero net sodium current.",
            "In the taught selective-blocker protocol TTX leaves potassium current, with leak and capacitive contributions handled separately.",
            "Use the source rest-relative voltage and fitted temperature. The laws do not establish behavior at an arbitrary temperature."
          ],
          "points": 1,
          "source": "L07 PDF9,12–17,31"
        },
        {
          "id": "L07-b2",
          "role": "explanation",
          "difficulty": "medium",
          "type": "written",
          "prompt": "Derive the fixed-gating current difference, sketch peak versus instantaneous current–voltage relations, and explain why linear instantaneous pores coexist with nonlinear activation.",
          "hints": [
            {
              "body": "Separate the imposed voltage, ionic driving force and gating state."
            },
            {
              "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
            }
          ],
          "markScheme": [
            {
              "text": "Write each current as the same conductance times its driving force."
            },
            {
              "text": "Subtract currents at the two voltages."
            },
            {
              "text": "Reversal cancels and the slope gives conductance."
            },
            {
              "text": "Do not confuse a jump in driving force with a jump in activation."
            },
            {
              "text": "Peak measurements at different voltages have different gating states."
            },
            {
              "text": "Instantaneous test currents share a fixed initial state."
            },
            {
              "text": "Their line meets the peak curve at conditioning voltage and reversal."
            },
            {
              "text": "Only the fixed-gating relation tests open-pore linearity."
            }
          ],
          "modelAnswer": [
            "Write each current as the same conductance times its driving force.",
            "Subtract currents at the two voltages.",
            "Reversal cancels and the slope gives conductance.",
            "Do not confuse a jump in driving force with a jump in activation.",
            "Peak measurements at different voltages have different gating states.",
            "Instantaneous test currents share a fixed initial state.",
            "Their line meets the peak curve at conditioning voltage and reversal.",
            "Only the fixed-gating relation tests open-pore linearity."
          ],
          "points": 1,
          "source": "L07 PDF13–17",
          "figure": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 7, PDF page 12. Control, TTX and TEA source recordings. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 7, PDF page 12. Control, TTX and TEA source recordings. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L07/blockers.webp', import.meta.url).href,
              "alt": "Lecture 7, PDF page 12. Control, TTX and TEA source recordings. Original labels, axes and scale bars retained.",
              "aspect": 0.8648874061718098,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        },
        {
          "id": "L07-b3",
          "role": "calculation",
          "difficulty": "medium",
          "type": "multiStepCalc",
          "prompt": "A two-step clamp preserves the same gating state. $I_1=-2\\,\\mathrm{nA}$ at $V_1=-20\\,\\mathrm{mV}$, $g=25\\,\\mathrm{nS}$. Jump to $V_2=20\\,\\mathrm{mV}$. Reversal is $60\\,\\mathrm{mV}$. Predict the immediate ionic current after resolving capacitance, then check by the independent chord route.",
          "stages": [
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "First voltage",
                  "answer": {
                    "value": -0.02,
                    "unit": "V",
                    "tolerance": 2e-08,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": -0.02,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Second voltage",
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
                  "label": "Conductance",
                  "answer": {
                    "value": 2.5e-08,
                    "unit": "S",
                    "tolerance": 2.4999999999999998e-14,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 2.5e-08,
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
              "title": "Voltage jump",
              "answer": {
                "value": 0.04,
                "unit": "V",
                "tolerance": 0.00012,
                "verification": {
                  "relation": "sum",
                  "inputs": {
                    "a": 0.02,
                    "b": 0.02
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\Delta V=V_2-V_1",
              "modelAnswer": [
                "Use signed voltages.",
                "$\\Delta V=V_2-V_1$",
                "$0.04\\,\\mathrm{V}$"
              ]
            },
            {
              "title": "Current jump",
              "answer": {
                "value": 1e-09,
                "unit": "A",
                "tolerance": 3e-12,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 2.5e-08,
                    "b": 0.04
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\Delta I=g\\Delta V",
              "modelAnswer": [
                "Gating remains fixed.",
                "$\\Delta I=g\\Delta V$",
                "$1\\times10^{-9}\\,\\mathrm{A}$"
              ]
            },
            {
              "title": "New current",
              "answer": {
                "value": -1e-09,
                "unit": "A",
                "tolerance": 3e-12,
                "verification": {
                  "relation": "sum",
                  "inputs": {
                    "a": -2e-09,
                    "b": 1e-09
                  },
                  "displayScale": 1
                }
              },
              "tex": "I_2=I_1+\\Delta I",
              "modelAnswer": [
                "Add the signed change.",
                "$I_2=I_1+\\Delta I$",
                "$-1\\times10^{-9}\\,\\mathrm{A}$"
              ]
            },
            {
              "title": "New driving force",
              "answer": {
                "value": -0.039999999999999994,
                "unit": "V",
                "tolerance": 0.00011999999999999999,
                "verification": {
                  "relation": "sum",
                  "inputs": {
                    "a": 0.02,
                    "b": -0.06
                  },
                  "displayScale": 1
                }
              },
              "tex": "D_2=V_2-E",
              "modelAnswer": [
                "Use the same reversal.",
                "$D_2=V_2-E$",
                "$-0.04\\,\\mathrm{V}$"
              ]
            },
            {
              "title": "Independent current",
              "answer": {
                "value": -9.999999999999999e-10,
                "unit": "A",
                "tolerance": 2.9999999999999997e-12,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 2.5e-08,
                    "b": -0.039999999999999994
                  },
                  "displayScale": 1
                }
              },
              "tex": "I_2=gD_2",
              "modelAnswer": [
                "The two routes agree for these consistent idealized data.",
                "$I_2=gD_2$",
                "$-1\\times10^{-9}\\,\\mathrm{A}$"
              ]
            },
            {
              "title": "Interpretation",
              "choices": [
                {
                  "label": "The ionic current can jump while gating stays continuous"
                },
                {
                  "label": "The ionic current can jump only if gating is discontinuous"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "The jump is in driving force."
              ]
            }
          ],
          "hints": [
            {
              "body": "Use $\\Delta I=g\\Delta V$ then add to the initial current."
            },
            {
              "body": "Begin with $\\Delta V=V_2-V_1$; keep current signs and verify with the new driving force."
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating.",
            "Use signed voltages.",
            "Gating remains fixed.",
            "Add the signed change.",
            "Use the same reversal.",
            "The two routes agree for these consistent idealized data.",
            "The jump is in driving force."
          ],
          "points": 1,
          "source": "L07 PDF13–18"
        },
        {
          "id": "L07-b4",
          "role": "calculation",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "For the source squid laws take $V_{rest}=-65\\,\\mathrm{mV}$ and $V_m=-55\\,\\mathrm{mV}$. Convert to $U$, evaluate both potassium rates including the removable singularity, then find steady activation, time constant and the steady conductance fraction.",
          "stages": [
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "Absolute voltage",
                  "answer": {
                    "value": -0.055,
                    "unit": "V",
                    "tolerance": 5.4999999999999996e-08,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": -0.055,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Resting voltage",
                  "answer": {
                    "value": -0.065,
                    "unit": "V",
                    "tolerance": 6.5e-08,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": -0.065,
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
              "title": "Rest-relative voltage",
              "answer": {
                "value": 0.01,
                "unit": "V",
                "tolerance": 3e-05,
                "verification": {
                  "relation": "sum",
                  "inputs": {
                    "a": -0.055,
                    "b": 0.065
                  },
                  "displayScale": 1
                }
              },
              "tex": "U=V_m-V_{rest}",
              "modelAnswer": [
                "Use the source empirical origin.",
                "$U=V_m-V_{rest}$",
                "$0.01\\,\\mathrm{V}$"
              ]
            },
            {
              "title": "Forward rate continuous limit",
              "answer": {
                "value": 100,
                "unit": "1/s",
                "tolerance": 0.3,
                "verification": {
                  "relation": "hhRate",
                  "inputs": {
                    "gate": "an",
                    "voltage": 0.01
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\alpha_n\\longrightarrow0.1\\,\\mathrm{ms^{-1}}",
              "modelAnswer": [
                "Use $x/(e^x-1)$ approaching one.",
                "$\\alpha_n\\longrightarrow0.1\\,\\mathrm{ms^{-1}}$",
                "$100\\,\\mathrm{s^{-1}}$"
              ]
            },
            {
              "title": "Backward rate",
              "answer": {
                "value": 110.31211282307443,
                "unit": "1/s",
                "tolerance": 0.33093633846922327,
                "verification": {
                  "relation": "hhRate",
                  "inputs": {
                    "gate": "bn",
                    "voltage": 0.01
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\beta_n=0.125e^{-10/80}\\,\\mathrm{ms^{-1}}",
              "modelAnswer": [
                "Convert inverse milliseconds to inverse seconds.",
                "$\\beta_n=0.125e^{-10/80}\\,\\mathrm{ms^{-1}}$",
                "$110.31211\\,\\mathrm{s^{-1}}$"
              ]
            },
            {
              "title": "Steady activation",
              "answer": {
                "value": 0.47548378767952965,
                "unit": "",
                "tolerance": 0.001426451363038589,
                "verification": {
                  "relation": "gateSteady",
                  "inputs": {
                    "alpha": 100,
                    "beta": 110.31211282307443
                  },
                  "displayScale": 1
                }
              },
              "tex": "n_\\infty=\\alpha_n/(\\alpha_n+\\beta_n)",
              "modelAnswer": [
                "Compute the rate ratio.",
                "$n_\\infty=\\alpha_n/(\\alpha_n+\\beta_n)$",
                "$0.47548379$"
              ]
            },
            {
              "title": "Time constant",
              "answer": {
                "value": 0.0047548378767952966,
                "unit": "s",
                "tolerance": 1.426451363038589e-05,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1,
                    "b": 210.31211282307441
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\tau_n=1/(\\alpha_n+\\beta_n)",
              "modelAnswer": [
                "Use inverse seconds for a seconds result.",
                "$\\tau_n=1/(\\alpha_n+\\beta_n)$",
                "$0.0047548379\\,\\mathrm{s}$"
              ]
            },
            {
              "title": "Steady conductance fraction",
              "answer": {
                "value": 0.051114351416951496,
                "unit": "",
                "tolerance": 0.0001533430542508545,
                "verification": {
                  "relation": "gatePower",
                  "inputs": {
                    "y": 0.47548378767952965,
                    "count": 4
                  },
                  "displayScale": 1
                }
              },
              "tex": "g_{K,\\infty}/\\bar g_K=n_\\infty^4",
              "modelAnswer": [
                "Do not substitute the particle fraction directly.",
                "$g_{K,\\infty}/\\bar g_K=n_\\infty^4$",
                "$0.051114351$"
              ]
            }
          ],
          "hints": [
            {
              "body": "First identify the empirical voltage origin, then the continuous rate limit."
            },
            {
              "body": "Start with $U=(-55)-(-65)\\,\\mathrm{mV}$. Evaluate rates before their ratio and sum."
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating.",
            "Use the source empirical origin.",
            "Use $x/(e^x-1)$ approaching one.",
            "Convert inverse milliseconds to inverse seconds.",
            "Compute the rate ratio.",
            "Use inverse seconds for a seconds result.",
            "Do not substitute the particle fraction directly."
          ],
          "points": 1,
          "source": "L07 PDF23,25–26,31"
        },
        {
          "id": "L07-b5",
          "role": "methods",
          "difficulty": "medium",
          "type": "written",
          "prompt": "Use the supplied blocker panel to explain TTX and TEA separation, retained signals, background corrections and one control for an unexpected residual. Describe the role of negative feedback in a two-electrode voltage clamp.",
          "hints": [
            {
              "body": "Separate the imposed voltage, ionic driving force and gating state."
            },
            {
              "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
            }
          ],
          "markScheme": [
            {
              "text": "TTX removes sodium and TEA removes potassium in this protocol."
            },
            {
              "text": "Correct capacitive/leak background before attribution."
            },
            {
              "text": "A residual inward current after TTX could indicate incomplete block or another component."
            },
            {
              "text": "Use matched voltage steps and appropriate controls before claiming selectivity."
            },
            { "text": "A sensing electrode reports membrane voltage. The amplifier drives the second electrode to reduce the difference between the measured voltage and the command." }
          ],
          "modelAnswer": [
            "TTX removes sodium and TEA removes potassium in this protocol.",
            "Correct capacitive/leak background before attribution.",
            "A residual inward current after TTX could indicate incomplete block or another component.",
            "Use matched voltage steps and appropriate controls before claiming selectivity.",
            "A sensing electrode reports membrane voltage. The amplifier drives the second electrode to reduce the difference between the measured voltage and the command."
          ],
          "points": 1,
          "source": "L07 PDF7,9,11–12",
          "figure": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 7, PDF page 12. Control, TTX and TEA source recordings. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 7, PDF page 12. Control, TTX and TEA source recordings. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L07/blockers.webp', import.meta.url).href,
              "alt": "Lecture 7, PDF page 12. Control, TTX and TEA source recordings. Original labels, axes and scale bars retained.",
              "aspect": 0.8648874061718098,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ]
    },
    {
      "id": "L07-mock-c",
      "title": "Mock C: Recover kinetics and separate concentration effects",
      "coverage": "Lectures 1–7 only. Distinct HH experimental and gating reasoning. Official five-group structure; practice criteria are not official weights. Calculator and permanent supplied equation sheet available.",
      "questions": [
        {
          "id": "L07-c1",
          "role": "concepts",
          "difficulty": "medium",
          "type": "written",
          "prompt": "Answer each in 1–3 sentences: a) What does a larger sodium availability variable mean? b) Why does a steady activation curve alone not determine transition speed? c) How does recovery from inactivation differ from deactivation? d) Why can sustained strong potassium elevation reduce excitability despite depolarizing rest?",
          "hints": [
            {
              "body": "Distinguish availability, steady probability, transition speed and holding history."
            },
            {
              "body": "Begin with what must recover before a sodium channel can activate again. Then separate the rate ratio from the rate sum and trace the effect of sustained depolarization on availability."
            }
          ],
          "markScheme": [
            {
              "text": "Larger sodium availability means less inactivation, not a larger inactivated fraction."
            },
            {
              "text": "Steady probability fixes a rate ratio; a time-course measurement is also needed to determine transition speed."
            },
            {
              "text": "Deactivation closes activation gates; recovery restores availability after inactivation."
            },
            {
              "text": "Sustained strong depolarization can reduce sodium availability, weakening regenerative inward current despite a depolarized resting voltage."
            }
          ],
          "modelAnswer": [
            "A larger availability variable means fewer sodium channels are inactivated, subject to the separate activation requirement.",
            "The steady fraction gives the forward/backward rate ratio but not their common scale. Kinetics require a relaxation-time measurement.",
            "Deactivation closes activation gates; recovery from inactivation returns channels to an available state. These are distinct transitions.",
            "Strong sustained external potassium elevation can depolarize rest enough to lower sodium availability and reduce excitability. Mild depolarization need not have the same effect."
          ],
          "points": 1,
          "source": "L07 PDF20–22,25–30,32–33"
        },
        {
          "id": "L07-c2",
          "role": "explanation",
          "difficulty": "medium",
          "type": "written",
          "prompt": "Explain how conductance recordings identify particle activation and transition rates. Distinguish what can be inferred from steady conductance alone from what needs a time-course fit.",
          "hints": [
            {
              "body": "Separate the imposed voltage, ionic driving force and gating state."
            },
            {
              "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
            }
          ],
          "markScheme": [
            {
              "text": "Normalize steady potassium conductance by its maximum."
            },
            {
              "text": "Take the fourth root to obtain steady particle probability."
            },
            {
              "text": "Fit the powered relaxation, with its initial state, to estimate the time constant."
            },
            {
              "text": "A raw conductance time constant is not automatically the single-particle time constant."
            },
            {
              "text": "Steady probability gives the forward fraction of the rate sum."
            },
            {
              "text": "Time constant gives the reciprocal sum."
            },
            {
              "text": "Forward rate is steady fraction divided by time constant."
            },
            {
              "text": "Backward rate is complementary fraction divided by time constant."
            }
          ],
          "modelAnswer": [
            "Normalize steady potassium conductance by its maximum.",
            "Take the fourth root to obtain steady particle probability.",
            "Fit the powered relaxation, with its initial state, to estimate the time constant.",
            "A raw conductance time constant is not automatically the single-particle time constant.",
            "Steady probability gives the forward fraction of the rate sum.",
            "Time constant gives the reciprocal sum.",
            "Forward rate is steady fraction divided by time constant.",
            "Backward rate is complementary fraction divided by time constant."
          ],
          "points": 1,
          "source": "L07 PDF25–30",
          "figure": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 7, PDF page 22. Depolarizing prepulses of differing duration and test sodium currents. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 7, PDF page 22. Depolarizing prepulses of differing duration and test sodium currents. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L07/inactivation.webp', import.meta.url).href,
              "alt": "Lecture 7, PDF page 22. Depolarizing prepulses of differing duration and test sodium currents. Original labels, axes and scale bars retained.",
              "aspect": 1.789537712895377,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        },
        {
          "id": "L07-c3",
          "role": "calculation",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "A corrected steady potassium conductance is $6.25\\,\\mathrm{nS}$ out of $100\\,\\mathrm{nS}$ maximum. A fit to the fourth-power relaxation gives particle $\\tau_n=2\\,\\mathrm{ms}$. Recover $n_\\infty$, both transition rates and $n(t)$ at $2\\,\\mathrm{ms}$ starting from $n_0=0.1$. Explain why fitting a single conductance exponential is inadequate.",
          "stages": [
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "Steady conductance",
                  "answer": {
                    "value": 6.25e-09,
                    "unit": "S",
                    "tolerance": 6.2499999999999994e-15,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 6.25e-09,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
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
                  "label": "Particle time constant",
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
              "title": "Conductance fraction",
              "answer": {
                "value": 0.0625,
                "unit": "",
                "tolerance": 0.0001875,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 6.25e-09,
                    "b": 1e-07
                  },
                  "displayScale": 1
                }
              },
              "tex": "f=g_\\infty/\\bar g",
              "modelAnswer": [
                "Normalize first.",
                "$f=g_\\infty/\\bar g$",
                "$0.0625$"
              ]
            },
            {
              "title": "Particle probability",
              "answer": {
                "value": 0.5,
                "unit": "",
                "tolerance": 0.0015,
                "verification": {
                  "relation": "powerRatio",
                  "inputs": {
                    "a": 0.0625,
                    "b": 1,
                    "power": 0.25
                  },
                  "displayScale": 1
                }
              },
              "tex": "n_\\infty=f^{1/4}",
              "modelAnswer": [
                "Take the fourth root.",
                "$n_\\infty=f^{1/4}$",
                "$0.5$"
              ]
            },
            {
              "title": "Forward rate",
              "answer": {
                "value": 250,
                "unit": "1/s",
                "tolerance": 0.75,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.5,
                    "b": 0.002
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\alpha_n=n_\\infty/\\tau_n",
              "modelAnswer": [
                "Use the particle fraction.",
                "$\\alpha_n=n_\\infty/\\tau_n$",
                "$250\\,\\mathrm{s^{-1}}$"
              ]
            },
            {
              "title": "Backward rate",
              "answer": {
                "value": 250,
                "unit": "1/s",
                "tolerance": 0.75,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.5,
                    "b": 0.002
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\beta_n=(1-n_\\infty)/\\tau_n",
              "modelAnswer": [
                "Use its complement.",
                "$\\beta_n=(1-n_\\infty)/\\tau_n$",
                "$250\\,\\mathrm{s^{-1}}$"
              ]
            },
            {
              "title": "Finite-time activation",
              "answer": {
                "value": 0.3528482235314231,
                "unit": "",
                "tolerance": 0.0010585446705942694,
                "verification": {
                  "relation": "gateRelax",
                  "inputs": {
                    "y0": 0.1,
                    "steady": 0.5,
                    "time": 0.002,
                    "tau": 0.002
                  },
                  "displayScale": 1
                }
              },
              "tex": "n(t)=0.5+(0.1-0.5)e^{-1}",
              "modelAnswer": [
                "The particle relaxes exponentially.",
                "$n(t)=0.5+(0.1-0.5)e^{-1}$",
                "$0.35284822$"
              ]
            },
            {
              "title": "Fit interpretation",
              "choices": [
                {
                  "label": "Conductance is a fourth power of particle relaxation"
                },
                {
                  "label": "Conductance and particle probability have identical exponential traces"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "Power transformation changes the trace shape."
              ]
            }
          ],
          "hints": [
            {
              "body": "Normalize conductance, take a fourth root, then use steady probability and particle time constant."
            },
            {
              "body": "Start with $f=6.25/100$. Recover particle probability before computing rates."
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating.",
            "Normalize first.",
            "Take the fourth root.",
            "Use the particle fraction.",
            "Use its complement.",
            "The particle relaxes exponentially.",
            "Power transformation changes the trace shape."
          ],
          "points": 1,
          "source": "L07 PDF23,25–28,30"
        },
        {
          "id": "L07-c4",
          "role": "calculation",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "Idealized matched recordings give corrected total $-1\\,\\mathrm{nA}$ in control and $+2\\,\\mathrm{nA}$ when sodium reversal equals the fixed test $-10\\,\\mathrm{mV}$. Control sodium reversal is $50\\,\\mathrm{mV}$. Infer sodium current and conductance. Predict its immediate current after a jump to $70\\,\\mathrm{mV}$ with gating unchanged. State the subtraction assumption.",
          "stages": [
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "Control current",
                  "answer": {
                    "value": -1e-09,
                    "unit": "A",
                    "tolerance": 1e-15,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": -1e-09,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Reference current",
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
                  "label": "Test voltage",
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
                  "label": "Control reversal",
                  "answer": {
                    "value": 0.05,
                    "unit": "V",
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
              "title": "Isolated sodium current",
              "answer": {
                "value": -3e-09,
                "unit": "A",
                "tolerance": 9e-12,
                "verification": {
                  "relation": "sum",
                  "inputs": {
                    "a": -1e-09,
                    "b": -2e-09
                  },
                  "displayScale": 1
                }
              },
              "tex": "I_{Na}=I_{control}-I_{reference}",
              "modelAnswer": [
                "Subtract the outward reference.",
                "$I_{Na}=I_{control}-I_{reference}$",
                "$-3\\times10^{-9}\\,\\mathrm{A}$"
              ]
            },
            {
              "title": "Control driving force",
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
              "tex": "D=V_m-E_{Na}",
              "modelAnswer": [
                "Preserve sign.",
                "$D=V_m-E_{Na}$",
                "$-0.06\\,\\mathrm{V}$"
              ]
            },
            {
              "title": "Conductance",
              "answer": {
                "value": 5e-08,
                "unit": "S",
                "tolerance": 1.5e-10,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -3e-09,
                    "b": -0.06
                  },
                  "displayScale": 1
                }
              },
              "tex": "g_{Na}=I_{Na}/D",
              "modelAnswer": [
                "Both numerator and denominator are negative.",
                "$g_{Na}=I_{Na}/D$",
                "$5\\times10^{-8}\\,\\mathrm{S}$"
              ]
            },
            {
              "title": "New driving force",
              "answer": {
                "value": 0.02,
                "unit": "V",
                "tolerance": 6e-05,
                "verification": {
                  "relation": "sum",
                  "inputs": {
                    "a": 0.07,
                    "b": -0.05
                  },
                  "displayScale": 1
                }
              },
              "tex": "D_{new}=0.070-0.050\\,\\mathrm V",
              "modelAnswer": [
                "The new voltage exceeds reversal.",
                "$D_{new}=0.070-0.050\\,\\mathrm V$",
                "$0.02\\,\\mathrm{V}$"
              ]
            },
            {
              "title": "New sodium current",
              "answer": {
                "value": 1e-09,
                "unit": "A",
                "tolerance": 3e-12,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 5e-08,
                    "b": 0.02
                  },
                  "displayScale": 1
                }
              },
              "tex": "I_{new}=g_{Na}D_{new}",
              "modelAnswer": [
                "Current reverses without requiring gate closure.",
                "$I_{new}=g_{Na}D_{new}$",
                "$1\\times10^{-9}\\,\\mathrm{A}$"
              ]
            },
            {
              "title": "Required control",
              "choices": [
                {
                  "label": "Matched background and potassium currents in both solutions"
                },
                {
                  "label": "Matched sodium reversal and sodium current in both solutions"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "Sodium is what is intentionally changed, not what is subtracted as invariant."
              ]
            }
          ],
          "hints": [
            {
              "body": "Subtract the signed reference, infer conductance, then change driving force at fixed gating."
            },
            {
              "body": "First write $I_{Na}=(-1)-(+2)\\,\\mathrm{nA}$. Use the control reversal, not the reference reversal, for the conductance."
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating.",
            "Subtract the outward reference.",
            "Preserve sign.",
            "Both numerator and denominator are negative.",
            "The new voltage exceeds reversal.",
            "Current reverses without requiring gate closure.",
            "Sodium is what is intentionally changed, not what is subtracted as invariant."
          ],
          "points": 1,
          "source": "L07 PDF9–10,13–18"
        },
        {
          "id": "L07-c5",
          "role": "methods",
          "difficulty": "medium",
          "type": "written",
          "prompt": "Interpret the supplied prepulse/test-current panel. Design a matched comparison isolating inactivation and explain alternative causes of reduced test current. How would you measure recovery separately from activation in this protocol?",
          "hints": [
            {
              "body": "Separate the imposed voltage, ionic driving force and gating state."
            },
            {
              "body": "Follow the source experiment or state-transition model; specify assumptions before making the requested prediction."
            }
          ],
          "markScheme": [
            {
              "text": "Keep test voltage and recording conditions fixed."
            },
            {
              "text": "Extend the depolarizing prepulse."
            },
            {
              "text": "Reduced test inward current supports time-dependent inactivation."
            },
            {
              "text": "Exclude altered driving force, poor clamp or rundown with suitable controls."
            },
            { "text": "Use an inactivating conditioning pulse and vary the recovery interval before the same test step. Normalize test current to a recovered control." }
          ],
          "modelAnswer": [
            "Keep test voltage and recording conditions fixed.",
            "Extend the depolarizing prepulse.",
            "Reduced test inward current supports time-dependent inactivation.",
            "Exclude altered driving force, poor clamp or rundown with suitable controls.",
            "Use an inactivating conditioning pulse and vary the recovery interval before the same test step. Normalize test current to a recovered control."
          ],
          "points": 1,
          "source": "L07 PDF22",
          "figure": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 7, PDF page 22. Depolarizing prepulses of differing duration and test sodium currents. Original labels, axes and scale bars retained.",
            "fallbackAlt": "Lecture 7, PDF page 22. Depolarizing prepulses of differing duration and test sodium currents. Original labels, axes and scale bars retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L07/inactivation.webp', import.meta.url).href,
              "alt": "Lecture 7, PDF page 22. Depolarizing prepulses of differing duration and test sodium currents. Original labels, axes and scale bars retained.",
              "aspect": 1.789537712895377,
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
    "takeaways": ["Use control traces and isolation protocols before assigning ionic currents.", "Divide isolated current by driving force away from reversal to infer conductance.", "Condition activation and availability separately, then account for gate powers when fitting conductance."],
    "intro": "Revision checklist, not a claim of student-authored cheat-sheet permission.",
    "terms": [
      {
        "term": "Overview: measure, separate, model",
        "definition": "Follow the experimental chain: record an action potential, separate currents, test open-pore linearity, then fit gating kinetics. Use $V_m=V_{in}-V_{out}$ and positive outward ionic current."
      },
      {
        "term": "Intracellular recording and the preassignment",
        "definition": "Large diameter permits intracellular insertion."
      },
      {
        "term": "From experiments to a predictive model",
        "definition": "The model arose from squid voltage-clamp experiments."
      },
      {
        "term": "Overshoot challenges loss of selectivity",
        "definition": "Loss of selectivity predicts approach toward zero."
      },
      {
        "term": "Change extracellular sodium or potassium",
        "definition": "Lower external sodium lowers its equilibrium potential."
      },
      {
        "term": "Two electrodes and negative feedback",
        "definition": "The voltage electrode measures membrane voltage."
      },
      {
        "term": "Early transient and late sustained currents",
        "definition": "Early current activates and inactivates rapidly."
      },
      {
        "term": "Identify a selective current by reversal",
        "definition": "Measure a component over multiple voltages."
      },
      {
        "term": "Separate currents by a reversal shift",
        "definition": "Choose a reference solution with sodium reversal at the test voltage."
      },
      {
        "term": "Replace sodium with impermeant choline",
        "definition": "Choline replaces external sodium without conducting through its channel."
      },
      {
        "term": "Separate currents with TTX and TEA",
        "definition": "TTX removes sodium and TEA removes potassium in this protocol."
      },
      {
        "term": "Two-step clamp freezes gating briefly",
        "definition": "Use the same conditioning voltage and duration."
      },
      {
        "term": "Derive the instantaneous conductance",
        "definition": "Write each current as the same conductance times its driving force."
      },
      {
        "term": "Sodium peak curve versus instantaneous line",
        "definition": "Peak measurements at different voltages have different gating states."
      },
      {
        "term": "Potassium obeys the same open-pore test",
        "definition": "The conditioning current depends on activation and driving force."
      },
      {
        "term": "Convert separated currents to conductances",
        "definition": "Use the component-specific reversal potential."
      },
      {
        "term": "Voltage sensors and model particles",
        "definition": "Voltage sensors are charged regions of channel protein."
      },
      {
        "term": "Activation and inactivation gates",
        "definition": "Potassium activation is n."
      },
      {
        "term": "Closed, open and inactivated",
        "definition": "Closed is nonconducting but available."
      },
      {
        "term": "Prepulse duration reveals inactivation",
        "definition": "Keep test voltage and recording conditions fixed."
      },
      {
        "term": "Multiply permissive probabilities",
        "definition": "Independent all-required particle probabilities multiply."
      },
      {
        "term": "Gate powers are not literal hinges",
        "definition": "Potassium has four sensor-bearing subunits."
      },
      {
        "term": "Derive first-order gating relaxation",
        "definition": "Opening adds alpha times nonpermissive probability."
      },
      {
        "term": "Relaxation applies to all three variables",
        "definition": "Use separate steady probability and time constant for each variable."
      },
      {
        "term": "From exponential particles to conductance",
        "definition": "Activation powers create delayed onset."
      },
      {
        "term": "Fit voltage-dependent gating and kinetics",
        "definition": "Normalize steady potassium conductance by its maximum."
      },
      {
        "term": "Read steady curves separately from time constants",
        "definition": "Read probabilities on their own axis."
      },
      {
        "term": "Recover rates from steady state and time constant",
        "definition": "Steady probability gives the forward fraction of the rate sum."
      },
      {
        "term": "Empirical squid rates and the voltage origin",
        "definition": "Convert absolute membrane voltage to depolarization from rest."
      },
      {
        "term": "Group work: ions, kinetics and channel probability",
        "definition": "Raised external potassium makes potassium reversal less negative."
      }
    ],
    "equations": [
      {
        "name": "Selective reversal shift",
        "tex": "\\Delta E=s\\log_{10}(C_{o,new}/C_{o,old})",
        "note": "Fixed inside concentration, monovalent cation, source 20°C shortcut."
      },
      {
        "name": "Corrected current subtraction",
        "tex": "I_{Na}=I_{total}-I_K",
        "note": "Leak/capacitive terms corrected, potassium unchanged."
      },
      {
        "name": "Fixed-gating current jump",
        "tex": "\\Delta I=g\\Delta V",
        "note": "Gating unchanged over resolved sampling interval."
      },
      {
        "name": "Instantaneous slope conductance",
        "tex": "g=\\Delta I/\\Delta V",
        "note": "Nonzero voltage jump; exclude capacitive current."
      },
      {
        "name": "Component conductance",
        "tex": "g=I/(V_m-E)",
        "note": "Ohmic component, nonzero driving force."
      },
      {
        "name": "Separated ionic current",
        "tex": "I=g(V_m-E)",
        "note": "Ohmic separated component."
      },
      {
        "name": "All-required identical particles",
        "tex": "Y=y^P",
        "note": "Identical independent particles."
      },
      {
        "name": "Potassium conductance",
        "tex": "g_K=\\bar g_K n^4",
        "note": "HH potassium fit."
      },
      {
        "name": "Sodium channel open probability",
        "tex": "Y_{Na}=m^3h",
        "note": "Independent all-required HH factors."
      },
      {
        "name": "Sodium conductance",
        "tex": "g_{Na}=\\bar g_{Na}Y_{Na}",
        "note": "Y is m cubed times h."
      },
      {
        "name": "Permissive-state balance",
        "tex": "\\frac{dy}{dt}=\\alpha(1-y)-\\beta y",
        "note": "Fixed voltage and nonnegative rates."
      },
      {
        "name": "Steady gating probability",
        "tex": "y_\\infty=\\alpha/(\\alpha+\\beta)",
        "note": "Positive rate sum."
      },
      {
        "name": "Particle time constant",
        "tex": "\\tau=1/(\\alpha+\\beta)",
        "note": "Rates in the same inverse-time unit."
      },
      {
        "name": "Fixed-voltage relaxation",
        "tex": "y(t)=y_\\infty+(y_0-y_\\infty)e^{-t/\\tau}",
        "note": "Fixed voltage and constant rates."
      },
      {
        "name": "Infer potassium particle probability",
        "tex": "n_\\infty=(g_{K,\\infty}/\\bar g_K)^{1/4}",
        "note": "HH potassium model and known maximum."
      },
      {
        "name": "Recover forward rate",
        "tex": "\\alpha=y_\\infty/\\tau",
        "note": "Fixed-voltage first-order gating."
      },
      {
        "name": "Recover backward rate",
        "tex": "\\beta=(1-y_\\infty)/\\tau",
        "note": "Fixed-voltage first-order gating."
      },
      {
        "name": "Barrier Open",
        "tex": "\\alpha=\\alpha_0 e^{\\gamma q}",
        "note": "Here $q=zFV_m/(RT)$ is stated dimensionless; baseline and voltage share a fixed origin."
      },
      {
        "name": "Barrier Close",
        "tex": "\\beta=\\beta_0 e^{-(1-\\gamma)q}",
        "note": "Here $q=zFV_m/(RT)$ is stated dimensionless; baseline and voltage share a fixed origin."
      },
      {
        "name": "Availability Open",
        "tex": "\\alpha_h=\\alpha_{h0} e^{-(1-\\gamma)q}",
        "note": "Here $q=zFV_m/(RT)$ is stated dimensionless; baseline and voltage share a fixed origin."
      },
      {
        "name": "Availability Close",
        "tex": "\\beta_h=\\beta_{h0}e^{\\gamma q}",
        "note": "Here $q=zFV_m/(RT)$ is stated dimensionless; baseline and voltage share a fixed origin."
      },
      {
        "name": "Empirical an rate",
        "tex": "\\alpha_n=\\frac{0.01(10-U)}{e^{(10-U)/10}-1}",
        "note": "Numerical U in mV; source rate in inverse ms; convert output to inverse s. Source fit at 6.3°C, no extrapolation."
      },
      {
        "name": "Empirical bn rate",
        "tex": "\\beta_n=0.125e^{-U/80}",
        "note": "Numerical U in mV; source rate in inverse ms; convert output to inverse s. Source fit at 6.3°C, no extrapolation."
      },
      {
        "name": "Empirical am rate",
        "tex": "\\alpha_m=\\frac{0.1(25-U)}{e^{(25-U)/10}-1}",
        "note": "Numerical U in mV; source rate in inverse ms; convert output to inverse s. Source fit at 6.3°C, no extrapolation."
      },
      {
        "name": "Empirical bm rate",
        "tex": "\\beta_m=4e^{-U/18}",
        "note": "Numerical U in mV; source rate in inverse ms; convert output to inverse s. Source fit at 6.3°C, no extrapolation."
      },
      {
        "name": "Empirical ah rate",
        "tex": "\\alpha_h=0.07e^{-U/20}",
        "note": "Numerical U in mV; source rate in inverse ms; convert output to inverse s. Source fit at 6.3°C, no extrapolation."
      },
      {
        "name": "Empirical bh rate",
        "tex": "\\beta_h=\\frac{1}{1+e^{(30-U)/10}}",
        "note": "Numerical U in mV; source rate in inverse ms; convert output to inverse s. Source fit at 6.3°C, no extrapolation."
      }
    ],
    "constants": [
      {
        "name": "Empirical fit convention",
        "tex": "U=(V_m-V_{rest})/\\mathrm{mV},\\quad [\\alpha]=[\\beta]=\\mathrm{ms^{-1}}"
      },
      {
        "name": "Rounded monovalent Nernst shortcut, 20°C",
        "tex": "s=58\\,\\mathrm{mV}"
      }
    ],
    "conventions": [
      "$V_m=V_{in}-V_{out}$, with outside zero.",
      "Outward membrane ionic current is positive; inward injected current balances it on a constant clamp plateau.",
      "Separate capacitive transients and background leak before interpreting ionic components.",
      "Empirical rest-relative voltage $U$ differs from absolute $V_m$; do not apply source rates at arbitrary temperature.",
      "Full HH action-potential integration and saltatory propagation are later-lecture material."
    ]
  }
};
content.formulaReference=equationSheet;
content.formulaReferenceNote='Official exam PDF p4. These tasks use lectures 1–7 only.';
export default content;
