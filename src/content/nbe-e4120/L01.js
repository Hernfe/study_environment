// Source-grounded lecture data. See docs/scope/nbe-e4120/L01.md.
import { equationSheet } from './equation-sheet.js';
const content = {
  "meta": {
    "id": "L01",
    "number": 1,
    "title": "Bioelectricity, electrical circuits and ion movements",
    "chapters": [],
    "pages": [],
    "lectureDate": "2026-09-04",
    "examDate": "2026-11-30",
    "examLabel": "Final exam"
  },
  "overview": {
    "estimate": "Core route: read the main sections and answer 25 core questions. Formula explorers, videos, extra practice and mocks are optional.",
    "equations": "Core equations: $\\Delta V=IR$, $I_C=C\\,dV/dt$, $\\tau=RC$, $f_0=1/(2\\pi\\tau)$, $E=(RT/zF)\\ln(C_{\\mathrm{out}}/C_{\\mathrm{in}})$.",
    "pitfalls": "Check two signs: outward current is positive even when anions move inward, and Nernst uses signed valence with the outside/inside ratio."
  },
  "objectives": [
    "Choose which signal to record and how to control it.",
    "Use circuit topology to choose the resistance, capacitance and voltage relations.",
    "Read the plateau and time constant of a passive voltage response.",
    "Use electrochemical gradients to explain ion movement and equilibrium."
  ],
  "prerequisites": [
    {
      "text": "Basic algebra, logarithms and SI unit conversion."
    }
  ],
  "segmentedPractice": true,
  "standardPractice": "mc-only",
  "collapseFormulaExplorers": true,
  "sections": [
    {
      "id": "cells",
      "title": "Neurons and recording scale",
      "keyTerms": [],
      "blocks": [
        {
          "type": "text",
          "body": [
            "Dendrites receive input, the soma integrates it, and the axon carries spikes to synaptic terminals. Compare single-cell recordings with population signals such as EEG (brain), EMG (muscle), ECG (heart) and ERG (retina)."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 1, slide 8–9. Printed labels and source axes retained.",
            "fallbackAlt": "Lecture 1, slide 8–9. Printed labels and source axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L01/neurons.webp', import.meta.url).href,
              "alt": "Lecture 1, slide 8–9. Printed labels and source axes retained.",
              "aspect": 0.8538461538461538,
              "quiz": false,
              "layout": "stack",
              "regions": [
                {
                  "id": "dendrite",
                  "label": "Dendritic tree",
                  "body": "Branching processes on the first neuron.",
                  "x": 19,
                  "y": 11,
                  "w": 9,
                  "h": 10,
                  "side": "top"
                },
                {
                  "id": "soma",
                  "label": "Soma",
                  "body": "Cell body of the first neuron.",
                  "x": 30,
                  "y": 22,
                  "w": 9,
                  "h": 10,
                  "side": "top"
                },
                {
                  "id": "axon",
                  "label": "Axon",
                  "body": "Long process extending below the first cell body.",
                  "x": 23,
                  "y": 40,
                  "w": 9,
                  "h": 10,
                  "side": "top"
                }
              ]
            }
          }
        }
      ],
      "conceptQuiz": [
        {
          "id": "cells-check",
          "practice": "extra",
          "prompt": "Which recording measures muscle electrical activity?",
          "options": [
            {
              "text": "Electroencephalography",
              "feedback": "EEG records brain electrical activity."
            },
            {
              "text": "Electromyography",
              "feedback": "EMG records muscle electrical activity."
            },
            {
              "text": "Electroretinography",
              "feedback": "ERG records retinal electrical activity."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Match each electrography prefix to its tissue."
            },
            {
              "body": "Separate brain and retina readouts from muscle readouts."
            }
          ],
          "modelAnswer": [
            "EMG records muscle electrical activity."
          ]
        },
        {
          "id": "cells-starter-soma",
          "difficulty": "easy",
          "type": "mc",
          "progressionAdded": true,
          "source": "L01 PDF 8–9",
          "prompt": "Which name denotes the cell body of a neuron?",
          "options": [
            {
              "text": "The axon",
              "feedback": "The axon is a process extending from the cell body."
            },
            {
              "text": "The synapse",
              "feedback": "A synapse is a connection for communication between cells."
            },
            {
              "text": "The soma",
              "feedback": "The soma is the cell body."
            }
          ],
          "correct": 2,
          "hints": [{ "body": "Distinguish the central cell body from its processes and connections." }],
          "modelAnswer": [
            "The soma is the cell body."
          ]
        },
        {
          "id": "cells-starter-scale",
          "practice": "extra",
          "difficulty": "easy",
          "type": "mc",
          "progressionAdded": true,
          "source": "L01 PDF 8–9",
          "prompt": "Which recording level addresses the electrical function of one cell?",
          "options": [
            {
              "text": "Cellular electrophysiology",
              "feedback": "Cellular recordings measure the function of individual cells."
            },
            {
              "text": "Network electrophysiology",
              "feedback": "Network recordings combine activity from multiple cells."
            },
            {
              "text": "Whole-organ electrography",
              "feedback": "Organ recordings combine sources across a tissue or organ."
            }
          ],
          "correct": 0,
          "hints": [{ "body": "Match the recording scale to the source you need to isolate." }],
          "modelAnswer": [
            "Cellular recordings measure the function of individual cells."
          ]
        }
      ],
      "formulas": []
    },
    {
      "id": "applications",
      "title": "Functional measurements",
      "keyTerms": [],
      "blocks": [
        {
          "type": "text",
          "body": [
            "Compare electrical responses before and after an intervention. A cellular current change can show a drug effect, while an organ recording tests consequences such as altered cardiac rhythm."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 1, slide 10–12. Printed labels and source axes retained.",
            "fallbackAlt": "Lecture 1, slide 10–12. Printed labels and source axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L01/applications.webp', import.meta.url).href,
              "alt": "Lecture 1, slide 10–12. Printed labels and source axes retained.",
              "aspect": 1.9487179487179487,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "conceptQuiz": [
        {
          "id": "applications-check",
          "practice": "extra",
          "prompt": "What does a functional electrical readout establish most directly?",
          "options": [
            {
              "text": "The electrical effect of treatment",
              "feedback": "The recording tests the functional effect."
            },
            {
              "text": "The molecular identity of treatment",
              "feedback": "A functional trace alone does not identify a molecule."
            },
            {
              "text": "The anatomical origin of treatment",
              "feedback": "A functional trace alone does not locate every source."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Think about the difference between function and identity."
            },
            {
              "body": "A current trace can show a functional change without identifying the molecule."
            }
          ],
          "modelAnswer": [
            "The recording tests the functional effect."
          ]
        },
        {
          "id": "applications-starter-safety",
          "practice": "extra",
          "difficulty": "easy",
          "type": "mc",
          "progressionAdded": true,
          "source": "L01 PDF 10–12",
          "prompt": "Why are cardiac electrical recordings used in drug safety testing?",
          "options": [
            {
              "text": "To identify the drug molecule itself",
              "feedback": "A functional recording tests effects, not molecular identity."
            },
            {
              "text": "To detect effects on cardiac rhythm",
              "feedback": "An off-target electrical effect can disturb cardiac rhythm."
            },
            {
              "text": "To locate the drug binding site",
              "feedback": "A cardiac trace alone does not locate a molecular binding site."
            }
          ],
          "correct": 1,
          "hints": [{ "body": "Consider which organ’s rhythm depends directly on electrical activity." }],
          "modelAnswer": [
            "An off-target electrical effect can disturb cardiac rhythm."
          ]
        }
      ],
      "formulas": []
    },
    {
      "id": "signals",
      "title": "Current and voltage clamp",
      "keyTerms": [],
      "blocks": [
        {
          "type": "text",
          "body": [
            "Current clamp sets injected current and records voltage. In voltage clamp, an operational amplifier compares the command and measured voltages. Negative feedback adjusts the current it delivers to reduce the voltage error. The delivered current is the clamp readout.",
            "Semiconductor transistors are the active devices in an operational amplifier. A small input difference controls the output. In the clamp, the feedback loop uses that output to reduce the voltage error.",
            "Two-electrode voltage clamp separates current injection and voltage sensing with two electrodes. Discontinuous single-electrode voltage and current clamp (dSEVC and dSECC) alternate current injection and voltage sampling through one electrode. Sample after the electrode transient settles. In dSEVC the sampled voltage drives feedback toward command. In dSECC it is the recorded response to programmed current.",
            "Selectivity determines which ions pass. Gating controls when they pass. Passive signals spread through existing pathways, while active propagation recruits voltage-dependent channels."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 1, slide 13–14. Printed labels and source axes retained.",
            "fallbackAlt": "Lecture 1, slide 13–14. Printed labels and source axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L01/recordings.webp', import.meta.url).href,
              "alt": "Lecture 1, slide 13–14. Printed labels and source axes retained.",
              "aspect": 0.6937669376693767,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "conceptQuiz": [
        {
          "id": "signals-check",
          "practice": "extra",
          "prompt": "Which signal is recorded in voltage clamp?",
          "options": [
            {
              "text": "Intracellular potential",
              "feedback": "Current clamp records intracellular potential."
            },
            {
              "text": "Membrane electric current",
              "feedback": "Voltage clamp records current while voltage is controlled."
            },
            {
              "text": "Extracellular field potential",
              "feedback": "Field recording measures extracellular voltage; voltage clamp records membrane current."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Separate the controlled variable from the recorded variable."
            },
            {
              "body": "Voltage clamp controls voltage; choose the other electrical quantity."
            }
          ],
          "modelAnswer": [
            "Voltage clamp records current while voltage is controlled."
          ]
        },
        {
          "id": "signals-starter-selectivity",
          "practice": "extra",
          "difficulty": "easy",
          "type": "mc",
          "progressionAdded": true,
          "source": "L01 PDF 13–14",
          "prompt": "What does selective permeability describe?",
          "options": [
            {
              "text": "When the channel pathway opens",
              "feedback": "Gating concerns availability of the pathway, not ion selectivity."
            },
            {
              "text": "Where the recording is performed",
              "feedback": "Preparation and recording location do not define selectivity."
            },
            {
              "text": "Which ions can pass a channel",
              "feedback": "Selectivity concerns the ion species that can permeate."
            }
          ],
          "correct": 2,
          "hints": [{ "body": "Separate which ions can pass from when the channel opens." }],
          "modelAnswer": [
            "Selectivity concerns the ion species that can permeate."
          ]
        },
        {
          "id": "signals-starter-current-clamp",
          "difficulty": "easy",
          "type": "mc",
          "progressionAdded": true,
          "source": "L01 PDF 13–14",
          "prompt": "Which variable is controlled in current clamp?",
          "options": [
            {
              "text": "The injected electric current",
              "feedback": "Current clamp controls injected current and records voltage."
            },
            {
              "text": "The intracellular potential",
              "feedback": "Voltage is recorded in current clamp, rather than held fixed."
            },
            {
              "text": "The extracellular ion content",
              "feedback": "Bath composition is an experimental condition, not the clamped variable."
            }
          ],
          "correct": 0,
          "hints": [{ "body": "Distinguish what the experimenter sets from what the instrument reads." }],
          "modelAnswer": [
            "Current clamp controls injected current and records voltage."
          ]
        }
      ],
      "formulas": []
    },
    {
      "id": "apparatus",
      "title": "Electrodes and patch clamp",
      "keyTerms": [],
      "blocks": [
        {
          "type": "relevantVideo",
          "videoId": "ECcwCUeboFs",
          "title": "Patch Clamp Explained (Cell-Attached, Whole Cell, Inside Out, Outside Out Configurations) | Clip",
          "topic": "Patch configurations and which membrane face is exposed.",
          "channel": "Science With Tal"
        },
        {
          "type": "text",
          "body": [
            "A glass microelectrode measures intracellular voltage. Microscopy and a micromanipulator position it. Vibration isolation stabilizes the setup, and shielding reduces interference.",
            "Electrode resistance and stray capacitance low-pass filter the signal. Capacitance compensation supplies charging current to speed up the electrode response. Excess compensation can cause ringing.",
            "Unequal ion mobilities at a boundary between different solutions create a liquid junction potential. A pipette-to-bath junction can offset the voltage reference. Estimate or measure the offset for the solutions used and apply the correction with the stated sign convention.",
            "A tight pipette seal limits bypass current. Cell-attached keeps the patch intact. Inside-out exposes the cytoplasmic face and outside-out exposes the extracellular face. Whole-cell ruptures the patch for cell access. Perforated patch passes ions through pores and limits washout."
          ]
        },
        {
          "type": "optionalInfo",
          "title": "Suction-electrode recording",
          "body": "A suction electrode measures changes in extracellular current from a single photoreceptor."
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Slide 15. Microscope and recording apparatus, source photograph.",
            "fallbackAlt": "Slide 15. Microscope and recording apparatus, source photograph.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L01/apparatus.webp', import.meta.url).href,
              "alt": "Slide 15. Microscope and recording apparatus, source photograph.",
              "aspect": 1.1511991657977059,
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
            "caption": "Lecture 1, slide 15–17. Printed labels and source axes retained.",
            "fallbackAlt": "Lecture 1, slide 15–17. Printed labels and source axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L01/patch.webp', import.meta.url).href,
              "alt": "Lecture 1, slide 15–17. Printed labels and source axes retained.",
              "aspect": 1.539980256663376,
              "quiz": false,
              "layout": "stack",
              "regions": [
                {
                  "id": "attached",
                  "label": "Cell-attached",
                  "body": "Patch remains attached to the cell.",
                  "x": 17,
                  "y": 28,
                  "w": 9,
                  "h": 10,
                  "side": "top"
                },
                {
                  "id": "inside",
                  "label": "Inside-out",
                  "body": "An excised patch exposes its intracellular face to the bath.",
                  "x": 43,
                  "y": 28,
                  "w": 9,
                  "h": 10,
                  "side": "top"
                },
                {
                  "id": "whole",
                  "label": "Whole-cell",
                  "body": "Rupturing the patch gives access to the cell interior.",
                  "x": 17,
                  "y": 76,
                  "w": 9,
                  "h": 10,
                  "side": "top"
                },
                {
                  "id": "outside",
                  "label": "Outside-out",
                  "body": "An excised patch exposes its extracellular face to the bath.",
                  "x": 43,
                  "y": 76,
                  "w": 9,
                  "h": 10,
                  "side": "top"
                },
                {
                  "id": "perforated",
                  "label": "Perforated patch",
                  "body": "Perforations give access without completely rupturing the patch.",
                  "x": 87,
                  "y": 45,
                  "w": 9,
                  "h": 10,
                  "side": "top"
                }
              ]
            }
          }
        }
      ],
      "conceptQuiz": [
        {
          "id": "apparatus-check",
          "prompt": "Which feature isolates a patch electrically?",
          "options": [
            {
              "text": "A tight pipette–membrane seal",
              "feedback": "The tight seal directs current through the isolated patch."
            },
            {
              "text": "A grounded electrical shield",
              "feedback": "Shielding reduces interference but does not seal the patch."
            },
            {
              "text": "A stable micromanipulator tip",
              "feedback": "Positioning stabilizes the pipette; electrical isolation requires the seal."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Follow the path that current can take."
            },
            {
              "body": "A gap permits an unwanted bypass around the patch."
            }
          ],
          "modelAnswer": [
            "The tight seal directs current through the isolated patch."
          ]
        },
        {
          "id": "apparatus-starter-shielding",
          "practice": "extra",
          "difficulty": "easy",
          "type": "mc",
          "progressionAdded": true,
          "source": "L01 PDF 15–17",
          "prompt": "What is the main purpose of electrical shielding in this setup?",
          "options": [
            {
              "text": "Reduce mechanical vibration",
              "feedback": "Vibration isolation addresses movement rather than electrical interference."
            },
            {
              "text": "Reduce electrical interference",
              "feedback": "Shielding reduces interference picked up by the recording apparatus."
            },
            {
              "text": "Position the recording pipette",
              "feedback": "Micromanipulation positions the pipette; shielding addresses interference."
            }
          ],
          "correct": 1,
          "hints": [{ "body": "Separate electrical interference from mechanical motion." }],
          "modelAnswer": [
            "Shielding reduces interference picked up by the recording apparatus."
          ]
        },
        {
          "id": "apparatus-starter-inside-out",
          "practice": "extra",
          "difficulty": "easy",
          "type": "mc",
          "progressionAdded": true,
          "source": "L01 PDF 15–17",
          "prompt": "Which patch configuration exposes the inner membrane face to the bath?",
          "options": [
            {
              "text": "An outside-out patch",
              "feedback": "Outside-out exposes the extracellular face to the bath."
            },
            {
              "text": "A cell-attached patch",
              "feedback": "Cell-attached leaves the patch on the intact cell."
            },
            {
              "text": "An inside-out patch",
              "feedback": "Excising an inside-out patch exposes the cytoplasmic face."
            }
          ],
          "correct": 2,
          "hints": [{ "body": "Think about which side of the patch now faces the bath." }],
          "modelAnswer": [
            "Excising an inside-out patch exposes the cytoplasmic face."
          ]
        }
      ],
      "formulas": []
    },
    {
      "id": "signs",
      "title": "Voltage and current signs",
      "keyTerms": [],
      "blocks": [
        {
          "type": "text",
          "body": [
            "$V_m=V_{\\mathrm{in}}-V_{\\mathrm{out}}$ with outside as zero. $I=\\Delta Q/\\Delta t$. Outward positive current means cations leave or anions enter."
          ]
        },
        {
          "type": "convention",
          "body": "Do not confuse outward membrane current with the sign of injected current in a current-step experiment. State the reference direction before computing."
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 1, slide 18–19. Printed labels and source axes retained.",
            "fallbackAlt": "Lecture 1, slide 18–19. Printed labels and source axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L01/current.webp', import.meta.url).href,
              "alt": "Lecture 1, slide 18–19. Printed labels and source axes retained.",
              "aspect": 2.8089500860585197,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "conceptQuiz": [
        {
          "id": "signs-check",
          "prompt": "Which movement is positive outward membrane current?",
          "options": [
            {
              "text": "Positive charge entering the cell",
              "feedback": "Positive charge entering is inward current."
            },
            {
              "text": "Negative charge entering the cell",
              "feedback": "Negative charge entering has the same conventional-current sign as positive charge leaving."
            },
            {
              "text": "Negative charge leaving the cell",
              "feedback": "Negative charge leaving is inward conventional current."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Conventional current follows positive charge."
            },
            {
              "body": "For a negative ion, particle motion and conventional-current direction are opposite."
            }
          ],
          "modelAnswer": [
            "Negative charge entering has the same conventional-current sign as positive charge leaving."
          ]
        },
        {
          "id": "signs-starter-voltage",
          "practice": "extra",
          "difficulty": "easy",
          "type": "mc",
          "progressionAdded": true,
          "source": "L01 PDF 18–19",
          "prompt": "With the outside reference set to zero, what does a negative membrane voltage mean?",
          "options": [
            {
              "text": "Inside potential is lower than outside",
              "feedback": "Membrane voltage is inside potential minus outside potential."
            },
            {
              "text": "Inside potential is higher than outside",
              "feedback": "A higher inside potential would give a positive membrane voltage."
            },
            {
              "text": "Inside potential is equal to outside",
              "feedback": "Equal potentials give zero membrane voltage."
            }
          ],
          "correct": 0,
          "hints": [{ "body": "The reference is outside. Compare the two potentials in the stated subtraction order." }],
          "modelAnswer": [
            "Membrane voltage is inside potential minus outside potential."
          ]
        },
        {
          "id": "signs-starter-current",
          "practice": "extra",
          "difficulty": "easy",
          "type": "mc",
          "progressionAdded": true,
          "source": "L01 PDF 18–19",
          "prompt": "What is electric current?",
          "options": [
            {
              "text": "Stored charge divided by voltage",
              "feedback": "Charge divided by voltage defines capacitance."
            },
            {
              "text": "Signed charge transferred per time",
              "feedback": "Current measures the rate of transfer of signed charge."
            },
            {
              "text": "Voltage drop divided by current",
              "feedback": "Voltage drop divided by current defines resistance."
            }
          ],
          "correct": 1,
          "hints": [{ "body": "Recall what the ampere measures per second." }],
          "modelAnswer": [
            "Current measures the rate of transfer of signed charge."
          ]
        }
      ],
      "formulas": [
        {
          "id": "L01-f-current",
          "name": "Current from transferred charge",
          "tex": "I=\\frac{\\Delta Q}{\\Delta t}",
          "symbols": [
            {
              "tex": "I",
              "name": "Current",
              "unit": "A",
              "meaning": "Signed charge transfer per time."
            },
            {
              "tex": "\\Delta Q",
              "name": "Transferred charge",
              "unit": "C",
              "meaning": "Positive for outward transfer of positive charge."
            },
            {
              "tex": "\\Delta t",
              "name": "Duration",
              "unit": "s",
              "meaning": "Time interval."
            }
          ],
          "reads": "A larger signed charge transfer in the same time means a larger current.",
          "assumes": "Use a fixed reference direction and a time-averaged transfer.",
          "variants": [],
          "drill": {
            "prompt": "Positive charge $12\\,\\text{pC}$ leaves in $4\\,\\text{ms}$. Find outward current.",
            "answer": {
              "value": 3,
              "unit": "nA",
              "tolerance": 0.015,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 1.2e-11,
                  "b": 0.004
                },
                "displayScale": 1e-09
              }
            },
            "tex": "I=\\frac{12\\,pC}{4\\,ms}=3\\,nA",
            "modelAnswer": [
              "A larger signed charge transfer in the same time means a larger current."
            ],
            "error": "Check the outward sign and convert charge and time together.",
            "hints": [
              {
                "body": "Use $I=\\frac{\\Delta Q}{\\Delta t}$."
              },
              {
                "body": "Start with $I=\\frac{12\\,pC}{4\\,ms}$. Evaluate using the stated units, then check the sign."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{I}=\\frac{\\htmlClass{formula-term-1}{\\Delta Q}}{\\htmlClass{formula-term-2}{\\Delta t}}"
        }
      ]
    },
    {
      "id": "resistance",
      "title": "Ohm’s law",
      "keyTerms": [],
      "blocks": [
        {
          "type": "text",
          "body": [
            "For an ohmic path, $\\Delta V=IR$ and $G=1/R$. Use the measured voltage drop and known resistance to infer current. With capacitive components, impedance also depends on frequency."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 1, slide 20–21. Printed labels and source axes retained.",
            "fallbackAlt": "Lecture 1, slide 20–21. Printed labels and source axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L01/ohm.webp', import.meta.url).href,
              "alt": "Lecture 1, slide 20–21. Printed labels and source axes retained.",
              "aspect": 2.4630071599045347,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "conceptQuiz": [
        {
          "id": "resistance-check",
          "prompt": "Which quantity adds for parallel open channels?",
          "options": [
            {
              "text": "Individual resistance values",
              "feedback": "Parallel resistances combine reciprocally."
            },
            {
              "text": "Individual conductance values",
              "feedback": "Parallel conductances add."
            },
            {
              "text": "Individual voltage differences",
              "feedback": "Parallel branches share voltage."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Choose the quantity describing ease of flow."
            },
            {
              "body": "Parallel channels share voltage and supply additional current pathways."
            }
          ],
          "modelAnswer": [
            "Parallel conductances add."
          ]
        },
        {
          "id": "resistance-starter-reciprocal",
          "practice": "extra",
          "difficulty": "easy",
          "type": "mc",
          "progressionAdded": true,
          "source": "L01 PDF 20–21",
          "prompt": "How are resistance and conductance related?",
          "options": [
            {
              "text": "Each is proportional to the other",
              "feedback": "Increasing passive resistance reduces conductance."
            },
            {
              "text": "Each is independent of the other",
              "feedback": "They describe the same path through reciprocal quantities."
            },
            {
              "text": "Each is the reciprocal of the other",
              "feedback": "Conductance is one divided by resistance."
            }
          ],
          "correct": 2,
          "hints": [{ "body": "A pathway that opposes current less has a larger conductance." }],
          "modelAnswer": [
            "Conductance is one divided by resistance."
          ]
        },
        {
          "id": "resistance-starter-ohm",
          "practice": "extra",
          "difficulty": "easy",
          "type": "mc",
          "progressionAdded": true,
          "source": "L01 PDF 20–21",
          "prompt": "For an ohmic resistor, what relates voltage drop to current?",
          "options": [
            {
              "text": "Their ratio is the resistance",
              "feedback": "Ohm’s law gives voltage drop divided by current as resistance."
            },
            {
              "text": "Their product is the resistance",
              "feedback": "Ohm’s law uses a ratio to find resistance, not a product."
            },
            {
              "text": "Their difference is the resistance",
              "feedback": "Subtracting voltage and current cannot give resistance."
            }
          ],
          "correct": 0,
          "hints": [{ "body": "Use the proportionality between voltage drop and current for a linear resistor." }],
          "modelAnswer": [
            "Ohm’s law gives voltage drop divided by current as resistance."
          ]
        }
      ],
      "formulas": [
        {
          "id": "L01-f-conductance",
          "name": "Reciprocal resistance",
          "tex": "G=\\frac{1}{R}",
          "symbols": [
            {
              "tex": "G",
              "name": "Conductance",
              "unit": "S",
              "meaning": "Ease of current flow."
            },
            {
              "tex": "R",
              "name": "Resistance",
              "unit": "ohm",
              "meaning": "Opposition to current flow."
            }
          ],
          "reads": "Higher resistance means lower conductance.",
          "assumes": "An ohmic component with positive resistance.",
          "variants": [],
          "drill": {
            "prompt": "Find the conductance of $250\\,\\text{M}\\Omega$.",
            "answer": {
              "value": 4,
              "unit": "nS",
              "tolerance": 0.02,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 1,
                  "b": 250000000.0
                },
                "displayScale": 1e-09
              }
            },
            "tex": "G=(250\\,M\\Omega)^{-1}=4\\,nS",
            "modelAnswer": [
              "Higher resistance means lower conductance."
            ],
            "error": "Take a reciprocal and convert siemens to nanosiemens.",
            "hints": [
              {
                "body": "Use $G=\\frac{1}{R}$."
              },
              {
                "body": "Start with $G=(250\\,M\\Omega)^{-1}$. Evaluate using the stated units, then check the sign."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{G}=\\frac{1}{\\htmlClass{formula-term-1}{R}}"
        },
        {
          "id": "L01-f-ohm",
          "name": "Ohm law",
          "tex": "\\Delta V=IR=I/G",
          "symbols": [
            {
              "tex": "\\Delta V",
              "name": "Voltage drop",
              "unit": "V",
              "meaning": "Potential difference across the resistor."
            },
            {
              "tex": "I",
              "name": "Current",
              "unit": "A",
              "meaning": "Current through the resistor."
            },
            {
              "tex": "R",
              "name": "Resistance",
              "unit": "ohm",
              "meaning": "Linear resistance."
            },
            {
              "tex": "G",
              "name": "Conductance",
              "unit": "S",
              "meaning": "Reciprocal resistance."
            }
          ],
          "reads": "The same current makes a larger voltage drop across a larger resistance.",
          "assumes": "Linear resistor; voltage and current directions agree.",
          "variants": [],
          "drill": {
            "prompt": "A fluid path of $4\\,\\text{k}\\Omega$ carries $3\\,\\mu\\text{A}$. Find the IR drop.",
            "answer": {
              "value": 12,
              "unit": "mV",
              "tolerance": 0.06,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 4000,
                  "b": 3e-06
                },
                "displayScale": 0.001
              }
            },
            "tex": "\\Delta V=4\\,k\\Omega\\times3\\,\\mu A=12\\,mV",
            "modelAnswer": [
              "The same current makes a larger voltage drop across a larger resistance."
            ],
            "error": "Convert microamperes before multiplying.",
            "hints": [
              {
                "body": "Use $\\Delta V=IR=I/G$."
              },
              {
                "body": "Start with $\\Delta V=4\\,k\\Omega\\times3\\,\\mu A$. Evaluate using the stated units, then check the sign."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{\\Delta V}=\\htmlClass{formula-term-1}{I}\\htmlClass{formula-term-2}{R}=\\htmlClass{formula-term-1}{I}/\\htmlClass{formula-term-3}{G}"
        }
      ]
    },
    {
      "id": "divider",
      "title": "Voltage divider",
      "keyTerms": [],
      "blocks": [
        {
          "type": "text",
          "body": [
            "For an unloaded divider, $V_{\\mathrm{out}}=V_{\\mathrm{in}}R_2/(R_1+R_2)$, with output across the lower resistor $R_2$. A load across $R_2$ changes its effective resistance."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 1, slide 22. Printed labels and source axes retained.",
            "fallbackAlt": "Lecture 1, slide 22. Printed labels and source axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L01/divider.webp', import.meta.url).href,
              "alt": "Lecture 1, slide 22. Printed labels and source axes retained.",
              "aspect": 0.7374301675977654,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "conceptQuiz": [
        {
          "id": "divider-check",
          "practice": "extra",
          "prompt": "Across which component is the shown divider output measured?",
          "options": [
            {
              "text": "Across both resistors together",
              "feedback": "Both resistors together have the input voltage."
            },
            {
              "text": "Across the lower resistor only",
              "feedback": "The output node is measured relative to the grounded lower end."
            },
            {
              "text": "Across the upper resistor only",
              "feedback": "The upper drop is input minus output."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Locate the output node and ground."
            },
            {
              "body": "Find the component between those two nodes, rather than the entire source path."
            }
          ],
          "modelAnswer": [
            "The output node is measured relative to the grounded lower end."
          ]
        },
        {
          "id": "divider-starter-series-current",
          "practice": "extra",
          "difficulty": "easy",
          "type": "mc",
          "progressionAdded": true,
          "source": "L01 PDF 22",
          "prompt": "What is shared by both resistors in an unloaded series voltage divider?",
          "options": [
            {
              "text": "The voltage drop on each resistor",
              "feedback": "Voltage drops depend on the individual resistances."
            },
            {
              "text": "The current through each resistor",
              "feedback": "With no branch load, the same current passes through both."
            },
            {
              "text": "The resistance of each component",
              "feedback": "The two resistances need not be equal."
            }
          ],
          "correct": 1,
          "hints": [{ "body": "There is one current path when nothing draws current from the output node." }],
          "modelAnswer": [
            "With no branch load, the same current passes through both."
          ]
        }
      ],
      "formulas": [
        {
          "id": "L01-f-divider",
          "name": "Unloaded voltage divider",
          "tex": "V_{out}=V_{in}\\frac{R_2}{R_1+R_2}",
          "symbols": [
            {
              "tex": "V_{out}",
              "name": "Output voltage",
              "unit": "V",
              "meaning": "Voltage across the lower resistor."
            },
            {
              "tex": "V_{in}",
              "name": "Input voltage",
              "unit": "V",
              "meaning": "Voltage across the series pair."
            },
            {
              "tex": "R_1",
              "name": "Upper resistance",
              "unit": "ohm",
              "meaning": "From source to output."
            },
            {
              "tex": "R_2",
              "name": "Lower resistance",
              "unit": "ohm",
              "meaning": "From output to ground."
            }
          ],
          "reads": "The fraction of total series resistance below the output sets attenuation.",
          "assumes": "No appreciable current is drawn by the output measurement.",
          "variants": [
            {
              "tex": "R_1=R_2(V_{in}/V_{out}-1)",
              "note": "Inverse design, derived by rearrangement; not separately supplied on the exam sheet."
            }
          ],
          "drill": {
            "prompt": "For $V_{in}=2\\,\\text{V}$, $R_1=6\\,\\text{k}\\Omega$ and $R_2=2\\,\\text{k}\\Omega$, find output.",
            "answer": {
              "value": 0.5,
              "unit": "V",
              "tolerance": 0.0025,
              "verification": {
                "relation": "divider",
                "inputs": {
                  "v": 2,
                  "r1": 6000,
                  "r2": 2000
                },
                "displayScale": 1
              }
            },
            "tex": "V_{out}=2\\,V\\frac{2}{6+2}=0.5\\,V",
            "modelAnswer": [
              "The fraction of total series resistance below the output sets attenuation."
            ],
            "error": "Include both resistors in the denominator.",
            "hints": [
              {
                "body": "Use $V_{out}=V_{in}\\frac{R_2}{R_1+R_2}$."
              },
              {
                "body": "Start with $V_{out}=2\\,V\\frac{2}{6+2}$. Evaluate using the stated units, then check the sign."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{V_{out}}=\\htmlClass{formula-term-1}{V_{in}}\\frac{\\htmlClass{formula-term-3}{R_2}}{\\htmlClass{formula-term-2}{R_1}+\\htmlClass{formula-term-3}{R_2}}"
        }
      ]
    },
    {
      "id": "capacitance",
      "title": "Capacitance and charge",
      "keyTerms": [],
      "blocks": [
        {
          "type": "text",
          "body": [
            "The lipid membrane is the insulating dielectric. In a parallel-plate approximation, $C=\\epsilon A/d$ for permittivity $\\epsilon$, area $A$ and separation $d$. Multiply area by specific membrane capacitance (about $1\\,\\mu\\mathrm{F}/\\mathrm{cm}^2$) for total $C$. Then $Q=CV_m$ gives signed inner charge. Convert squared area units before multiplying."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 1, slide 23. Printed labels and source axes retained.",
            "fallbackAlt": "Lecture 1, slide 23. Printed labels and source axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L01/capacitor.webp', import.meta.url).href,
              "alt": "Lecture 1, slide 23. Printed labels and source axes retained.",
              "aspect": 1.7045454545454546,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "conceptQuiz": [
        {
          "id": "capacitance-check",
          "prompt": "What happens to total capacitance if area doubles at fixed dielectric and separation?",
          "options": [
            {
              "text": "It becomes twice as large",
              "feedback": "Capacitance is proportional to area."
            },
            {
              "text": "It stays at its initial value",
              "feedback": "Specific capacitance can stay fixed while total capacitance changes."
            },
            {
              "text": "It becomes half as large",
              "feedback": "Increasing separation, rather than area, lowers capacitance."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Use the geometric capacitance relation."
            },
            {
              "body": "Keep separation and dielectric fixed and consider only the area factor."
            }
          ],
          "modelAnswer": [
            "Capacitance is proportional to area."
          ]
        },
        {
          "id": "capacitance-starter-specific",
          "practice": "extra",
          "difficulty": "easy",
          "type": "mc",
          "progressionAdded": true,
          "source": "L01 PDF 23",
          "prompt": "What does specific membrane capacitance mean?",
          "options": [
            {
              "text": "Capacitance per membrane voltage",
              "feedback": "Capacitance already relates charge to voltage; specific means per area."
            },
            {
              "text": "Capacitance per membrane thickness",
              "feedback": "Thickness affects capacitance, but specific capacitance is per area."
            },
            {
              "text": "Capacitance per membrane area",
              "feedback": "Multiply specific capacitance by area to obtain total capacitance."
            }
          ],
          "correct": 2,
          "hints": [{ "body": "Distinguish a total from a quantity normalized by membrane size." }],
          "modelAnswer": [
            "Multiply specific capacitance by area to obtain total capacitance."
          ]
        },
        {
          "id": "capacitance-starter-dielectric",
          "practice": "extra",
          "difficulty": "easy",
          "type": "mc",
          "progressionAdded": true,
          "source": "L01 PDF 23",
          "prompt": "Which membrane component provides the insulating dielectric for charge storage?",
          "options": [
            {
              "text": "The membrane lipid bilayer",
              "feedback": "The lipid bilayer separates conducting solutions and acts as an insulator."
            },
            {
              "text": "The intracellular solution",
              "feedback": "The intracellular solution provides one conducting side of the capacitor."
            },
            {
              "text": "The extracellular solution",
              "feedback": "The extracellular solution provides the other conducting side."
            }
          ],
          "correct": 0,
          "hints": [{ "body": "Identify the insulating layer between the conducting solutions." }],
          "modelAnswer": [
            "The lipid bilayer separates conducting solutions and acts as an insulator."
          ]
        }
      ],
      "formulas": [
        {
          "id": "L01-f-charge",
          "name": "Charge stored in a capacitor",
          "tex": "q=C\\Delta V",
          "symbols": [
            {
              "tex": "q",
              "name": "Inner plate charge",
              "unit": "C",
              "meaning": "Signed charge on the inside plate."
            },
            {
              "tex": "C",
              "name": "Capacitance",
              "unit": "F",
              "meaning": "Total charge storage per voltage."
            },
            {
              "tex": "\\Delta V",
              "name": "Voltage",
              "unit": "V",
              "meaning": "Inside relative to outside."
            }
          ],
          "reads": "Larger capacitance needs more charge separation for the same voltage.",
          "assumes": "Constant linear capacitance.",
          "variants": [
            {
              "tex": "C=q/\\Delta V=I\\Delta t/\\Delta V",
              "note": "Constant current over the stated charging interval; use consistent signs."
            }
          ],
          "drill": {
            "prompt": "A $40\\,\\text{pF}$ membrane is at $-50\\,\\text{mV}$. Find signed inner charge.",
            "answer": {
              "value": -2,
              "unit": "pC",
              "tolerance": 0.01,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 4e-11,
                  "b": -0.05
                },
                "displayScale": 1e-12
              }
            },
            "tex": "q=40\\,pF(-50\\,mV)=-2\\,pC",
            "modelAnswer": [
              "Larger capacitance needs more charge separation for the same voltage."
            ],
            "error": "Keep the negative inner voltage sign.",
            "hints": [
              {
                "body": "Use $q=C\\Delta V$."
              },
              {
                "body": "Start with $q=40\\,pF(-50\\,mV)$. Evaluate using the stated units, then check the sign."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{q}=\\htmlClass{formula-term-1}{C}\\htmlClass{formula-term-2}{\\Delta V}"
        },
        {
          "id": "L01-f-geometry",
          "name": "Geometric capacitance",
          "tex": "C=\\epsilon A/d",
          "symbols": [
            {
              "tex": "C",
              "name": "Capacitance",
              "unit": "F",
              "meaning": "Total capacitance."
            },
            {
              "tex": "\\epsilon",
              "name": "Permittivity",
              "unit": "F/m",
              "meaning": "Dielectric property."
            },
            {
              "tex": "A",
              "name": "Area",
              "unit": "m2",
              "meaning": "Facing conductive area."
            },
            {
              "tex": "d",
              "name": "Separation",
              "unit": "m",
              "meaning": "Dielectric thickness."
            }
          ],
          "reads": "Larger area increases capacitance; thicker dielectric reduces it.",
          "assumes": "Parallel-plate approximation and specified effective permittivity.",
          "variants": [],
          "drill": {
            "prompt": "Use an illustrative planar dielectric: $\\epsilon=2\\times10^{-11}\\,\\text{F/m}$, $A=10^{-10}\\,\\text{m}^2$, $d=5\\,\\text{nm}$. Find capacitance.",
            "answer": {
              "value": 0.4,
              "unit": "pF",
              "tolerance": 0.002,
              "verification": {
                "relation": "geometry",
                "inputs": {
                  "epsilon": 2e-11,
                  "area": 1e-10,
                  "distance": 5e-09
                },
                "displayScale": 1e-12
              }
            },
            "tex": "C=\\frac{2\\times10^{-11}\\,F/m\\times10^{-10}\\,m^2}{5\\times10^{-9}\\,m}=0.4\\,pF",
            "modelAnswer": [
              "Larger area increases capacitance; thicker dielectric reduces it."
            ],
            "error": "Separation is in the denominator; convert nanometres.",
            "hints": [
              {
                "body": "Use $C=\\epsilon A/d$."
              },
              {
                "body": "Start with $C=\\frac{2\\times10^{-11}\\,F/m\\times10^{-10}\\,m^2}{5\\times10^{-9}\\,m}$. Evaluate using the stated units, then check the sign."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{C}=\\htmlClass{formula-term-1}{\\epsilon} \\htmlClass{formula-term-2}{A}/\\htmlClass{formula-term-3}{d}"
        },
        {
          "id": "L01-f-area",
          "name": "Specific to total capacitance",
          "tex": "C=C_{specific}A",
          "symbols": [
            {
              "tex": "C",
              "name": "Total capacitance",
              "unit": "F",
              "meaning": "Whole membrane."
            },
            {
              "tex": "C_{specific}",
              "name": "Specific capacitance",
              "unit": "F/m2",
              "meaning": "Capacitance per membrane area."
            },
            {
              "tex": "A",
              "name": "Membrane area",
              "unit": "m2",
              "meaning": "Total membrane surface."
            }
          ],
          "reads": "More membrane at the same specific capacitance stores more charge.",
          "assumes": "Uniform specific capacitance.",
          "variants": [],
          "drill": {
            "prompt": "A membrane area is $800\\,\\mu\\text{m}^2$. Use $1\\,\\mu\\text{F}/\\text{cm}^2$ to find total capacitance.",
            "answer": {
              "value": 8,
              "unit": "pF",
              "tolerance": 0.04,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 0.01,
                  "b": 8e-10
                },
                "displayScale": 1e-12
              }
            },
            "tex": "C=0.01\\,F/m^2\\times800\\times10^{-12}\\,m^2=8\\,pF",
            "modelAnswer": [
              "More membrane at the same specific capacitance stores more charge."
            ],
            "error": "Square the length conversion when converting area.",
            "hints": [
              {
                "body": "Use $C=C_{specific}A$."
              },
              {
                "body": "Start with $C=0.01\\,F/m^2\\times800\\times10^{-12}\\,m^2$. Evaluate using the stated units, then check the sign."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{C}=\\htmlClass{formula-term-1}{C_{specific}}\\htmlClass{formula-term-2}{A}"
        }
      ]
    },
    {
      "id": "passive",
      "title": "Passive membrane circuit",
      "keyTerms": [],
      "blocks": [
        {
          "type": "relevantVideo",
          "videoId": "LdumhvDBpzQ",
          "title": "Equivalent Circuit Model Of The Neuron Explained (Capacitance, Resistance, Driving force) | Clip",
          "topic": "Membrane capacitance, resistive pathways and driving force.",
          "channel": "Science With Tal"
        },
        {
          "type": "text",
          "body": [
            "In a passive isopotential cell, a constant current step $I$ charges the parallel $RC$ circuit. $\\Delta V(t)=IR(1-e^{-t/\\tau})$, where $R$ and $C$ are total input resistance and capacitance and $\\tau=RC$.",
            "At the plateau $I_C=C\\,dV/dt=0$. Estimate $R$ from plateau $\\Delta V/I$, then $C=\\tau/R$. Use a fitted time constant for a single-exponential response."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 1, slide 24. Printed labels and source axes retained.",
            "fallbackAlt": "Lecture 1, slide 24. Printed labels and source axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L01/rc.webp', import.meta.url).href,
              "alt": "Lecture 1, slide 24. Printed labels and source axes retained.",
              "aspect": 2.3145454545454545,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "conceptQuiz": [
        {
          "id": "passive-check",
          "practice": "extra",
          "prompt": "At constant membrane voltage, what is the capacitive current?",
          "options": [
            {
              "text": "It has its maximal value",
              "feedback": "Capacitive current depends on voltage change, not voltage alone."
            },
            {
              "text": "It is equal to leak current",
              "feedback": "Leak current and capacitive current are separate terms."
            },
            {
              "text": "It has a value of zero",
              "feedback": "A zero voltage derivative gives zero capacitive current."
            }
          ],
          "correct": 2,
          "hints": [
            {
              "body": "Capacitive current depends on a time derivative."
            },
            {
              "body": "Constant voltage has zero slope even if voltage itself is nonzero."
            }
          ],
          "modelAnswer": [
            "A zero voltage derivative gives zero capacitive current."
          ]
        },
        {
          "id": "passive-starter-topology",
          "difficulty": "easy",
          "type": "mc",
          "progressionAdded": true,
          "source": "L01 PDF 24; Exercise 1 P2",
          "prompt": "How are resistance and capacitance arranged in the passive membrane model?",
          "options": [
            {
              "text": "As two series circuit elements",
              "feedback": "A series pair shares current; the membrane paths instead share voltage."
            },
            {
              "text": "As two parallel circuit elements",
              "feedback": "Both elements experience the same membrane voltage."
            },
            {
              "text": "As two disconnected circuit elements",
              "feedback": "The resistive and capacitive paths both participate in membrane response."
            }
          ],
          "correct": 1,
          "hints": [{ "body": "Both elements connect the inside node to the outside node." }],
          "modelAnswer": [
            "Both elements experience the same membrane voltage."
          ]
        },
        {
          "id": "passive-starter-tau",
          "difficulty": "easy",
          "type": "mc",
          "progressionAdded": true,
          "source": "L01 PDF 24; Exercise 1 P2",
          "prompt": "Which pair determines the passive membrane time constant?",
          "options": [
            {
              "text": "Resistance and injected current",
              "feedback": "Injected current sets response amplitude, not the passive RC time constant."
            },
            {
              "text": "Capacitance and plateau voltage",
              "feedback": "Plateau voltage depends on the stimulus; it does not define the RC product."
            },
            {
              "text": "Resistance and capacitance",
              "feedback": "The time constant is the product of consistent resistance and capacitance."
            }
          ],
          "correct": 2,
          "hints": [{ "body": "Identify the two circuit properties that set charging speed." }],
          "modelAnswer": [
            "The time constant is the product of consistent resistance and capacitance."
          ]
        }
      ],
      "formulas": [
        {
          "id": "L01-f-capacitive",
          "name": "Capacitive current",
          "tex": "I_C=C\\frac{dV}{dt}",
          "symbols": [
            {
              "tex": "I_C",
              "name": "Capacitive current",
              "unit": "A",
              "meaning": "Charging current under the chosen voltage reference."
            },
            {
              "tex": "C",
              "name": "Capacitance",
              "unit": "F",
              "meaning": "Total membrane capacitance."
            },
            {
              "tex": "\\frac{dV}{dt}",
              "name": "Voltage slope",
              "unit": "V/s",
              "meaning": "Rate of voltage change."
            }
          ],
          "reads": "Faster voltage change needs greater charging current.",
          "assumes": "Capacitance constant over the ramp.",
          "variants": [],
          "drill": {
            "prompt": "A $20\\,\\text{pF}$ capacitor has voltage slope $3\\,\\text{V/s}$. Find capacitive current.",
            "answer": {
              "value": 60,
              "unit": "pA",
              "tolerance": 0.3,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 2e-11,
                  "b": 3
                },
                "displayScale": 1e-12
              }
            },
            "tex": "I_C=20\\,pF\\times3\\,V/s=60\\,pA",
            "modelAnswer": [
              "Faster voltage change needs greater charging current."
            ],
            "error": "Multiply by the voltage slope, not the final voltage.",
            "hints": [
              {
                "body": "Use $I_C=C\\frac{dV}{dt}$."
              },
              {
                "body": "Start with $I_C=20\\,pF\\times3\\,V/s$. Evaluate using the stated units, then check the sign."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{I_C}=\\htmlClass{formula-term-1}{C}\\htmlClass{formula-term-2}{\\frac{dV}{dt}}"
        },
        {
          "id": "L01-f-tau",
          "name": "Membrane time constant",
          "tex": "\\tau_m=R_m C_m",
          "symbols": [
            {
              "tex": "\\tau_m",
              "name": "Time constant",
              "unit": "s",
              "meaning": "Passive charging timescale."
            },
            {
              "tex": "R_m",
              "name": "Membrane resistance",
              "unit": "ohm",
              "meaning": "Total resistance here."
            },
            {
              "tex": "C_m",
              "name": "Membrane capacitance",
              "unit": "F",
              "meaning": "Total capacitance here."
            }
          ],
          "reads": "A larger resistance or capacitance slows the approach to steady state.",
          "assumes": "Use total resistance with total capacitance, or a consistent specific pair.",
          "variants": [],
          "drill": {
            "prompt": "Find the time constant for $R_m=200\\,\\text{M}\\Omega$ and $C_m=50\\,\\text{pF}$.",
            "answer": {
              "value": 10,
              "unit": "ms",
              "tolerance": 0.05,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 200000000.0,
                  "b": 5e-11
                },
                "displayScale": 0.001
              }
            },
            "tex": "\\tau_m=200\\,M\\Omega\\times50\\,pF=10\\,ms",
            "modelAnswer": [
              "A larger resistance or capacitance slows the approach to steady state."
            ],
            "error": "Convert both quantities to SI before multiplying.",
            "hints": [
              {
                "body": "Use $\\tau_m=R_m C_m$."
              },
              {
                "body": "Start with $\\tau_m=200\\,M\\Omega\\times50\\,pF$. Evaluate using the stated units, then check the sign."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{\\tau_m}=\\htmlClass{formula-term-1}{R_m} \\htmlClass{formula-term-2}{C_m}"
        },
        {
          "id": "L01-f-charging",
          "name": "Passive step response",
          "tex": "\\Delta V(t)=IR_m(1-e^{-t/(R_mC_m)})",
          "symbols": [
            {
              "tex": "\\Delta V(t)",
              "name": "Voltage change",
              "unit": "V",
              "meaning": "Response relative to pre-step baseline."
            },
            {
              "tex": "I",
              "name": "Injected step current",
              "unit": "A",
              "meaning": "Positive for a depolarizing injected step in this model."
            },
            {
              "tex": "R_m",
              "name": "Resistance",
              "unit": "ohm",
              "meaning": "Input resistance."
            },
            {
              "tex": "C_m",
              "name": "Capacitance",
              "unit": "F",
              "meaning": "Total capacitance."
            },
            {
              "tex": "t",
              "name": "Time since step",
              "unit": "s",
              "meaning": "Elapsed time."
            }
          ],
          "reads": "The response approaches a finite plateau rather than changing instantaneously.",
          "assumes": "Linear isopotential passive membrane, constant current step, initially at baseline.",
          "variants": [],
          "drill": {
            "prompt": "For $I=100\\,\\text{pA}$, $R=100\\,\\text{M}\\Omega$, $C=100\\,\\text{pF}$, find voltage change after $10\\,\\text{ms}$.",
            "answer": {
              "value": 6.321205588,
              "unit": "mV",
              "tolerance": 0.031606027939999996,
              "verification": {
                "relation": "charging",
                "inputs": {
                  "i": 1e-10,
                  "r": 100000000.0,
                  "c": 1e-10,
                  "t": 0.01
                },
                "displayScale": 0.001
              }
            },
            "tex": "\\Delta V=10\\,mV(1-e^{-1})\\approx6.321\\,mV",
            "modelAnswer": [
              "The response approaches a finite plateau rather than changing instantaneously."
            ],
            "error": "Multiply by the charging factor; do not divide by it.",
            "hints": [
              {
                "body": "Use $\\Delta V(t)=IR_m(1-e^{-t/(R_mC_m)})$."
              },
              {
                "body": "Start with $\\Delta V(t)=IR_m(1-e^{-t/(R_mC_m)})$. Evaluate using the stated units, then check the sign."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{\\Delta V(t)}=\\htmlClass{formula-term-1}{I}\\htmlClass{formula-term-2}{R_m}(1-e^{-\\htmlClass{formula-term-4}{t}/(\\htmlClass{formula-term-2}{R_m}\\htmlClass{formula-term-3}{C_m})})"
        }
      ]
    },
    {
      "id": "filters",
      "title": "RC filters",
      "keyTerms": [],
      "blocks": [
        {
          "type": "text",
          "body": [
            "The passive membrane attenuates fast signals. A first-order low-pass has corner $f_0=1/(2\\pi\\tau)$ in hertz for $\\tau$ in seconds. A larger $\\tau$ lowers the corner and rounds a square pulse more. A high-pass attenuates slow components."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 1, slide 25–26. Printed labels and source axes retained.",
            "fallbackAlt": "Lecture 1, slide 25–26. Printed labels and source axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L01/filters.webp', import.meta.url).href,
              "alt": "Lecture 1, slide 25–26. Printed labels and source axes retained.",
              "aspect": 1.35140771637122,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "conceptQuiz": [
        {
          "id": "filters-check",
          "practice": "extra",
          "prompt": "If the membrane time constant increases, how does its corner frequency change?",
          "options": [
            {
              "text": "The corner frequency decreases",
              "feedback": "Corner frequency is inversely proportional to time constant."
            },
            {
              "text": "The corner frequency increases",
              "feedback": "Increasing time constant slows the response."
            },
            {
              "text": "The corner frequency stays fixed",
              "feedback": "Corner frequency depends on the time constant."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Time constant and corner frequency are reciprocal scales."
            },
            {
              "body": "A slower membrane follows fewer rapid fluctuations."
            }
          ],
          "modelAnswer": [
            "Corner frequency is inversely proportional to time constant."
          ]
        },
        {
          "id": "filters-starter-low-pass",
          "practice": "extra",
          "difficulty": "easy",
          "type": "mc",
          "progressionAdded": true,
          "source": "L01 PDF 25–26",
          "prompt": "Which components does a low-pass membrane filter attenuate more strongly?",
          "options": [
            {
              "text": "Higher-frequency signal components",
              "feedback": "Charging takes time, so rapid changes are attenuated more strongly."
            },
            {
              "text": "Lower-frequency signal components",
              "feedback": "Preferential loss of slow components describes high-pass filtering."
            },
            {
              "text": "All signal frequencies equally",
              "feedback": "A frequency-independent attenuation would not describe low-pass filtering."
            }
          ],
          "correct": 0,
          "hints": [{ "body": "The name of the filter identifies the frequencies it passes most readily." }],
          "modelAnswer": [
            "Charging takes time, so rapid changes are attenuated more strongly."
          ]
        },
        {
          "id": "filters-starter-frequency",
          "practice": "extra",
          "difficulty": "easy",
          "type": "mc",
          "progressionAdded": true,
          "source": "L01 PDF 25–26",
          "prompt": "What does the frequency of a periodic signal count?",
          "options": [
            {
              "text": "Time occupied by a single cycle",
              "feedback": "Time per cycle is the period, the reciprocal of frequency."
            },
            {
              "text": "Cycles occurring per unit time",
              "feedback": "Frequency counts cycles per second when expressed in hertz."
            },
            {
              "text": "Voltage change during each cycle",
              "feedback": "Voltage change describes amplitude, not cycles per time."
            }
          ],
          "correct": 1,
          "hints": [{ "body": "Frequency measures repetitions, while period measures duration." }],
          "modelAnswer": [
            "Frequency counts cycles per second when expressed in hertz."
          ]
        }
      ],
      "formulas": [
        {
          "id": "L01-f-corner",
          "name": "Corner frequency",
          "tex": "f_0=\\frac{1}{2\\pi\\tau_m}",
          "symbols": [
            {
              "tex": "f_0",
              "name": "Corner frequency",
              "unit": "Hz",
              "meaning": "First-order low-pass transition frequency."
            },
            {
              "tex": "\\tau_m",
              "name": "Time constant",
              "unit": "s",
              "meaning": "Passive response timescale."
            }
          ],
          "reads": "A slower membrane transmits rapid fluctuations less well.",
          "assumes": "First-order passive RC low-pass.",
          "variants": [],
          "drill": {
            "prompt": "Find corner frequency for $\\tau=5\\,\\text{ms}$.",
            "answer": {
              "value": 31.83098862,
              "unit": "Hz",
              "tolerance": 0.1591549431,
              "verification": {
                "relation": "corner",
                "inputs": {
                  "tau": 0.005
                },
                "displayScale": 1
              }
            },
            "tex": "f_0=\\frac1{2\\pi(0.005\\,s)}\\approx31.831\\,Hz",
            "modelAnswer": [
              "A slower membrane transmits rapid fluctuations less well."
            ],
            "error": "Use seconds in the denominator.",
            "hints": [
              {
                "body": "Use $f_0=\\frac{1}{2\\pi\\tau_m}$."
              },
              {
                "body": "Start with $f_0=\\frac{1}{2\\pi\\tau_m}$. Evaluate using the stated units, then check the sign."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{f_0}=\\frac{1}{2\\pi\\htmlClass{formula-term-1}{\\tau_m}}"
        },
        {
          "id": "L01-f-frequency",
          "name": "Frequency and period",
          "tex": "f=1/T",
          "symbols": [
            {
              "tex": "f",
              "name": "Frequency",
              "unit": "Hz",
              "meaning": "Cycles per second."
            },
            {
              "tex": "T",
              "name": "Period",
              "unit": "s",
              "meaning": "Time for one complete cycle, not temperature in this relation."
            }
          ],
          "reads": "Shorter periods mean more cycles each second.",
          "assumes": "Periodic waveform.",
          "variants": [],
          "drill": {
            "prompt": "A waveform repeats every $20\\,\\text{ms}$. Find frequency.",
            "answer": {
              "value": 50,
              "unit": "Hz",
              "tolerance": 0.25,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 1,
                  "b": 0.02
                },
                "displayScale": 1
              }
            },
            "tex": "f=1/(0.020\\,s)=50\\,Hz",
            "modelAnswer": [
              "Shorter periods mean more cycles each second."
            ],
            "error": "Convert period to seconds before taking its reciprocal.",
            "hints": [
              {
                "body": "Use $f=1/T$."
              },
              {
                "body": "Start with $f=1/(0.020\\,s)$. Evaluate using the stated units, then check the sign."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{f}=1/\\htmlClass{formula-term-1}{T}"
        }
      ]
    },
    {
      "id": "combinations",
      "title": "Series, parallel and Kirchhoff",
      "keyTerms": [],
      "blocks": [
        {
          "type": "text",
          "body": [
            "Series elements share current and their voltage drops add. Parallel branches share voltage and their currents add. Add resistances in series, and conductances and capacitances in parallel. For the opposite arrangements, add reciprocals and invert.",
            "Choose signs first. Signed currents sum to zero at a node, and signed voltage changes sum to zero around a loop."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 1, slide 27. Printed labels and source axes retained.",
            "fallbackAlt": "Lecture 1, slide 27. Printed labels and source axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L01/circuits.webp', import.meta.url).href,
              "alt": "Lecture 1, slide 27. Printed labels and source axes retained.",
              "aspect": 2.3023983315954117,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "conceptQuiz": [
        {
          "id": "combinations-check",
          "practice": "extra",
          "prompt": "Which pair shares voltage?",
          "options": [
            {
              "text": "Resistors arranged in series",
              "feedback": "Series resistors share current."
            },
            {
              "text": "Branches arranged in parallel",
              "feedback": "Parallel branches connect to the same two nodes."
            },
            {
              "text": "Capacitors arranged in series",
              "feedback": "Series capacitors generally split voltage."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Identify which elements connect to the same two nodes."
            },
            {
              "body": "A series path shares current, while separate parallel branches share endpoints."
            }
          ],
          "modelAnswer": [
            "Parallel branches connect to the same two nodes."
          ]
        },
        {
          "id": "combinations-starter-series",
          "practice": "extra",
          "difficulty": "easy",
          "type": "mc",
          "progressionAdded": true,
          "source": "L01 PDF 27",
          "prompt": "Which quantity is the same through all elements of a simple series circuit?",
          "options": [
            {
              "text": "Voltage drop across each element",
              "feedback": "Series voltage drops can differ and add to the total."
            },
            {
              "text": "Resistance value of each element",
              "feedback": "Series topology does not require equal component resistances."
            },
            {
              "text": "Current through each element",
              "feedback": "A single series path carries the same current through each element."
            }
          ],
          "correct": 2,
          "hints": [{ "body": "Charge has only one path through a simple series circuit." }],
          "modelAnswer": [
            "A single series path carries the same current through each element."
          ]
        },
        {
          "id": "combinations-starter-node",
          "difficulty": "easy",
          "type": "mc",
          "progressionAdded": true,
          "source": "L01 PDF 27",
          "prompt": "Which conservation principle underlies Kirchhoff’s node law?",
          "options": [
            {
              "text": "Conservation of electric charge",
              "feedback": "No net charge accumulates at an ideal node, so signed currents balance."
            },
            {
              "text": "Equality of branch resistances",
              "feedback": "Branch resistances can differ while current is conserved."
            },
            {
              "text": "Equality of branch capacitances",
              "feedback": "Capacitances need not be equal for signed currents to balance."
            }
          ],
          "correct": 0,
          "hints": [{ "body": "Consider what would accumulate if more current entered than left." }],
          "modelAnswer": [
            "No net charge accumulates at an ideal node, so signed currents balance."
          ]
        }
      ],
      "formulas": [
        {
          "id": "L01-f-series-r",
          "name": "Series resistance",
          "tex": "R_{total}=R_1+R_2",
          "symbols": [
            {
              "tex": "R_{total}",
              "name": "Total quantity",
              "unit": "kohm",
              "meaning": "Equivalent component between the external terminals."
            }
          ],
          "reads": "Use the topology before choosing a sum or reciprocal sum.",
          "assumes": "Ideal lumped components of the stated topology.",
          "variants": [],
          "drill": {
            "prompt": "Evaluate $4\\,k\\Omega+5\\,k\\Omega$ for the series resistance.",
            "answer": {
              "value": 9,
              "unit": "kohm",
              "tolerance": 0.045,
              "verification": {
                "relation": "sum",
                "inputs": {
                  "a": 4000,
                  "b": 5000
                },
                "displayScale": 1000
              }
            },
            "tex": "R_{total}=4\\,k\\Omega+5\\,k\\Omega=9\\,k\\Omega",
            "modelAnswer": [
              "Use the topology before choosing a sum or reciprocal sum."
            ],
            "error": "Check whether this topology requires direct addition or a reciprocal sum.",
            "hints": [
              {
                "body": "Use $R_{total}=R_1+R_2$."
              },
              {
                "body": "Start with $R_{total}=4\\,k\\Omega+5\\,k\\Omega$. Evaluate using the stated units, then check the sign."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{R_{total}}=R_1+R_2"
        },
        {
          "id": "L01-f-parallel-r",
          "name": "Parallel resistance",
          "tex": "R_{total}^{-1}=R_1^{-1}+R_2^{-1}",
          "symbols": [
            {
              "tex": "R_{total}^{-1}",
              "name": "Total quantity",
              "unit": "kohm",
              "meaning": "Equivalent component between the external terminals."
            }
          ],
          "reads": "Use the topology before choosing a sum or reciprocal sum.",
          "assumes": "Ideal lumped components of the stated topology.",
          "variants": [],
          "drill": {
            "prompt": "Evaluate $(1/4+1/12)^{-1}\\,k\\Omega$ for the parallel resistance.",
            "answer": {
              "value": 3,
              "unit": "kohm",
              "tolerance": 0.015,
              "verification": {
                "relation": "parallel",
                "inputs": {
                  "a": 4000,
                  "b": 12000
                },
                "displayScale": 1000
              }
            },
            "tex": "R_{total}=(1/4+1/12)^{-1}\\,k\\Omega=3\\,k\\Omega",
            "modelAnswer": [
              "Use the topology before choosing a sum or reciprocal sum."
            ],
            "error": "Check whether this topology requires direct addition or a reciprocal sum.",
            "hints": [
              {
                "body": "Use $R_{total}^{-1}=R_1^{-1}+R_2^{-1}$."
              },
              {
                "body": "Start with $R_{total}=(1/4+1/12)^{-1}\\,k\\Omega$. Evaluate using the stated units, then check the sign."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{R_{total}^{-1}}=R_1^{-1}+R_2^{-1}"
        },
        {
          "id": "L01-f-parallel-c",
          "name": "Parallel capacitance",
          "tex": "C_{total}=C_1+C_2",
          "symbols": [
            {
              "tex": "C_{total}",
              "name": "Total quantity",
              "unit": "pF",
              "meaning": "Equivalent component between the external terminals."
            }
          ],
          "reads": "Use the topology before choosing a sum or reciprocal sum.",
          "assumes": "Ideal lumped components of the stated topology.",
          "variants": [],
          "drill": {
            "prompt": "Evaluate $10\\,pF+20\\,pF$ for the parallel capacitance.",
            "answer": {
              "value": 30,
              "unit": "pF",
              "tolerance": 0.15,
              "verification": {
                "relation": "sum",
                "inputs": {
                  "a": 1e-11,
                  "b": 2e-11
                },
                "displayScale": 1e-12
              }
            },
            "tex": "C_{total}=10\\,pF+20\\,pF=30\\,pF",
            "modelAnswer": [
              "Use the topology before choosing a sum or reciprocal sum."
            ],
            "error": "Check whether this topology requires direct addition or a reciprocal sum.",
            "hints": [
              {
                "body": "Use $C_{total}=C_1+C_2$."
              },
              {
                "body": "Start with $C_{total}=10\\,pF+20\\,pF$. Evaluate using the stated units, then check the sign."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{C_{total}}=C_1+C_2"
        },
        {
          "id": "L01-f-series-c",
          "name": "Series capacitance",
          "tex": "C_{total}^{-1}=C_1^{-1}+C_2^{-1}",
          "symbols": [
            {
              "tex": "C_{total}^{-1}",
              "name": "Total quantity",
              "unit": "pF",
              "meaning": "Equivalent component between the external terminals."
            }
          ],
          "reads": "Use the topology before choosing a sum or reciprocal sum.",
          "assumes": "Ideal lumped components of the stated topology.",
          "variants": [],
          "drill": {
            "prompt": "Evaluate $(1/10+1/15)^{-1}\\,pF$ for the series capacitance.",
            "answer": {
              "value": 6,
              "unit": "pF",
              "tolerance": 0.03,
              "verification": {
                "relation": "parallel",
                "inputs": {
                  "a": 1e-11,
                  "b": 1.5e-11
                },
                "displayScale": 1e-12
              }
            },
            "tex": "C_{total}=(1/10+1/15)^{-1}\\,pF=6\\,pF",
            "modelAnswer": [
              "Use the topology before choosing a sum or reciprocal sum."
            ],
            "error": "Check whether this topology requires direct addition or a reciprocal sum.",
            "hints": [
              {
                "body": "Use $C_{total}^{-1}=C_1^{-1}+C_2^{-1}$."
              },
              {
                "body": "Start with $C_{total}=(1/10+1/15)^{-1}\\,pF$. Evaluate using the stated units, then check the sign."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{C_{total}^{-1}}=C_1^{-1}+C_2^{-1}"
        },
        {
          "id": "L01-f-parallel-g",
          "name": "Parallel conductance",
          "tex": "G_{total}=G_1+G_2",
          "symbols": [
            {
              "tex": "G_{total}",
              "name": "Total quantity",
              "unit": "nS",
              "meaning": "Equivalent component between the external terminals."
            }
          ],
          "reads": "Use the topology before choosing a sum or reciprocal sum.",
          "assumes": "Ideal lumped components of the stated topology.",
          "variants": [],
          "drill": {
            "prompt": "Evaluate $5\\,nS+7\\,nS$ for the parallel conductance.",
            "answer": {
              "value": 12,
              "unit": "nS",
              "tolerance": 0.06,
              "verification": {
                "relation": "sum",
                "inputs": {
                  "a": 5e-09,
                  "b": 7e-09
                },
                "displayScale": 1e-09
              }
            },
            "tex": "G_{total}=5\\,nS+7\\,nS=12\\,nS",
            "modelAnswer": [
              "Use the topology before choosing a sum or reciprocal sum."
            ],
            "error": "Check whether this topology requires direct addition or a reciprocal sum.",
            "hints": [
              {
                "body": "Use $G_{total}=G_1+G_2$."
              },
              {
                "body": "Start with $G_{total}=5\\,nS+7\\,nS$. Evaluate using the stated units, then check the sign."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{G_{total}}=G_1+G_2"
        },
        {
          "id": "L01-f-series-g",
          "name": "Series conductance",
          "tex": "G_{total}^{-1}=G_1^{-1}+G_2^{-1}",
          "symbols": [
            {
              "tex": "G_{total}^{-1}",
              "name": "Total quantity",
              "unit": "nS",
              "meaning": "Equivalent component between the external terminals."
            }
          ],
          "reads": "Use the topology before choosing a sum or reciprocal sum.",
          "assumes": "Ideal lumped components of the stated topology.",
          "variants": [],
          "drill": {
            "prompt": "Evaluate $(1/3+1/6)^{-1}\\,nS$ for the series conductance.",
            "answer": {
              "value": 2,
              "unit": "nS",
              "tolerance": 0.01,
              "verification": {
                "relation": "parallel",
                "inputs": {
                  "a": 3e-09,
                  "b": 6e-09
                },
                "displayScale": 1e-09
              }
            },
            "tex": "G_{total}=(1/3+1/6)^{-1}\\,nS=2\\,nS",
            "modelAnswer": [
              "Use the topology before choosing a sum or reciprocal sum."
            ],
            "error": "Check whether this topology requires direct addition or a reciprocal sum.",
            "hints": [
              {
                "body": "Use $G_{total}^{-1}=G_1^{-1}+G_2^{-1}$."
              },
              {
                "body": "Start with $G_{total}=(1/3+1/6)^{-1}\\,nS$. Evaluate using the stated units, then check the sign."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{G_{total}^{-1}}=G_1^{-1}+G_2^{-1}"
        },
        {
          "id": "L01-f-node",
          "name": "Kirchhoff node law",
          "tex": "\\sum I=0",
          "symbols": [
            {
              "tex": "I",
              "name": "Signed branch current",
              "unit": "A",
              "meaning": "Current with the chosen node reference."
            }
          ],
          "reads": "Charge is conserved at a circuit junction.",
          "assumes": "Consistent signs; no net accumulation at the ideal node.",
          "variants": [],
          "drill": {
            "prompt": "At a node, two incoming currents are $3\\,\\text{nA}$ and $4\\,\\text{nA}$. Find total outgoing current magnitude.",
            "answer": {
              "value": 7,
              "unit": "nA",
              "tolerance": 0.035,
              "verification": {
                "relation": "sum",
                "inputs": {
                  "a": 3e-09,
                  "b": 4e-09
                },
                "displayScale": 1e-09
              }
            },
            "tex": "I_{out}=3\\,nA+4\\,nA=7\\,nA",
            "modelAnswer": [
              "Charge is conserved at a circuit junction."
            ],
            "error": "Account for incoming and outgoing signs in the node sum.",
            "hints": [
              {
                "body": "Use $\\sum I=0$."
              },
              {
                "body": "Start with $I_{out}=3\\,nA+4\\,nA$. Evaluate using the stated units, then check the sign."
              }
            ]
          },
          "interactiveTex": "\\sum \\htmlClass{formula-term-0}{I}=0"
        },
        {
          "id": "L01-f-loop",
          "name": "Kirchhoff loop law",
          "tex": "\\sum \\Delta V=0",
          "symbols": [
            {
              "tex": "\\Delta V",
              "name": "Signed voltage change",
              "unit": "V",
              "meaning": "Potential change along the chosen traversal."
            }
          ],
          "reads": "Returning to the same point gives zero total potential change.",
          "assumes": "Closed lumped circuit loop with consistent traversal signs.",
          "variants": [],
          "drill": {
            "prompt": "A loop has a source rise $12\\,\\text{mV}$ and one drop $5\\,\\text{mV}$. Find the remaining drop magnitude.",
            "answer": {
              "value": 7,
              "unit": "mV",
              "tolerance": 0.035,
              "verification": {
                "relation": "sum",
                "inputs": {
                  "a": 0.012,
                  "b": -0.005
                },
                "displayScale": 0.001
              }
            },
            "tex": "\\Delta V_{remaining}=12\\,mV-5\\,mV=7\\,mV",
            "modelAnswer": [
              "Returning to the same point gives zero total potential change."
            ],
            "error": "A rise has opposite sign to a drop around the loop.",
            "hints": [
              {
                "body": "Use $\\sum \\Delta V=0$."
              },
              {
                "body": "Start with $\\Delta V_{remaining}=12\\,mV-5\\,mV$. Evaluate using the stated units, then check the sign."
              }
            ]
          },
          "interactiveTex": "\\sum \\htmlClass{formula-term-0}{\\Delta V}=0"
        },
        {
          "id": "L01-f-series-v",
          "name": "Series voltage drops",
          "tex": "V_{total}=V_1+V_2",
          "symbols": [
            {
              "tex": "V_{total}",
              "name": "Total voltage",
              "unit": "V",
              "meaning": "Voltage across a series path."
            },
            {
              "tex": "V_1",
              "name": "First drop",
              "unit": "V",
              "meaning": "First series element."
            },
            {
              "tex": "V_2",
              "name": "Second drop",
              "unit": "V",
              "meaning": "Second series element."
            }
          ],
          "reads": "Series voltage drops add along a path.",
          "assumes": "Consistent voltage reference directions.",
          "variants": [],
          "drill": {
            "prompt": "Two series drops are $2\\,\\text{mV}$ and $6\\,\\text{mV}$. Find the total.",
            "answer": {
              "value": 8,
              "unit": "mV",
              "tolerance": 0.04,
              "verification": {
                "relation": "sum",
                "inputs": {
                  "a": 0.002,
                  "b": 0.006
                },
                "displayScale": 0.001
              }
            },
            "tex": "V_{total}=2\\,mV+6\\,mV=8\\,mV",
            "modelAnswer": [
              "Series voltage drops add along a path."
            ],
            "error": "Use a series path, not parallel branches.",
            "hints": [
              {
                "body": "Use $V_{total}=V_1+V_2$."
              },
              {
                "body": "Start with $V_{total}=2\\,mV+6\\,mV$. Evaluate using the stated units, then check the sign."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{V_{total}}=\\htmlClass{formula-term-1}{V_1}+\\htmlClass{formula-term-2}{V_2}"
        },
        {
          "id": "L01-f-parallel-i",
          "name": "Parallel branch currents",
          "tex": "I_{total}=I_1+I_2",
          "symbols": [
            {
              "tex": "I_{total}",
              "name": "Total current",
              "unit": "A",
              "meaning": "Current entering parallel branches."
            },
            {
              "tex": "I_1",
              "name": "First branch current",
              "unit": "A",
              "meaning": "Current in one branch."
            },
            {
              "tex": "I_2",
              "name": "Second branch current",
              "unit": "A",
              "meaning": "Current in the other branch."
            }
          ],
          "reads": "Parallel branch currents add to the source current.",
          "assumes": "Branch reference directions point in the same direction.",
          "variants": [],
          "drill": {
            "prompt": "Two parallel branches carry $20\\,\\text{pA}$ and $30\\,\\text{pA}$. Find total current.",
            "answer": {
              "value": 50,
              "unit": "pA",
              "tolerance": 0.25,
              "verification": {
                "relation": "sum",
                "inputs": {
                  "a": 2e-11,
                  "b": 3e-11
                },
                "displayScale": 1e-12
              }
            },
            "tex": "I_{total}=20\\,pA+30\\,pA=50\\,pA",
            "modelAnswer": [
              "Parallel branch currents add to the source current."
            ],
            "error": "Sum signed branch currents.",
            "hints": [
              {
                "body": "Use $I_{total}=I_1+I_2$."
              },
              {
                "body": "Start with $I_{total}=20\\,pA+30\\,pA$. Evaluate using the stated units, then check the sign."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{I_{total}}=\\htmlClass{formula-term-1}{I_1}+\\htmlClass{formula-term-2}{I_2}"
        }
      ]
    },
    {
      "id": "movement",
      "title": "Electrodiffusion",
      "keyTerms": [],
      "blocks": [
        {
          "type": "text",
          "body": [
            "Diffusion follows $J_{\\mathrm{diff}}=-D\\,\\partial C/\\partial x$. Drift follows $J_{\\mathrm{drift}}=-uzC\\,\\partial V/\\partial x$ in the course mobility convention. Add both fluxes for net $J$. Multiply by $zF$ for current density and by area for total current."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 1, slide 29. Printed labels and source axes retained.",
            "fallbackAlt": "Lecture 1, slide 29. Printed labels and source axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L01/diffusion.webp', import.meta.url).href,
              "alt": "Lecture 1, slide 29. Printed labels and source axes retained.",
              "aspect": 2.4444444444444446,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "conceptQuiz": [
        {
          "id": "movement-check",
          "practice": "extra",
          "prompt": "Which contribution to ion flux is driven by an electric field?",
          "options": [
            {
              "text": "Electrical drift of charged ions",
              "feedback": "Charged particles drift in an electric field."
            },
            {
              "text": "Thermal diffusion of particles",
              "feedback": "Diffusion is driven by concentration gradients, rather than electric fields."
            },
            {
              "text": "Active pumping of charged ions",
              "feedback": "Active transport uses an energy source such as ATP or another ion gradient."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Ions carry electric charge."
            },
            {
              "body": "Remove the concentration gradient and consider the remaining electrical force."
            }
          ],
          "modelAnswer": [
            "Charged particles drift in an electric field."
          ]
        },
        {
          "id": "movement-starter-diffusion",
          "practice": "extra",
          "difficulty": "easy",
          "type": "mc",
          "progressionAdded": true,
          "source": "L01 PDF 29",
          "prompt": "In which direction does net diffusion carry particles?",
          "options": [
            {
              "text": "From lower toward higher concentration",
              "feedback": "That direction opposes passive diffusion down the gradient."
            },
            {
              "text": "From higher toward lower concentration",
              "feedback": "Random motion gives net transport down a concentration gradient."
            },
            {
              "text": "Along surfaces of equal concentration",
              "feedback": "A concentration gradient drives net diffusion across such surfaces."
            }
          ],
          "correct": 1,
          "hints": [{ "body": "Look at concentration on the two sides before considering an electric field." }],
          "modelAnswer": [
            "Random motion gives net transport down a concentration gradient."
          ]
        },
        {
          "id": "movement-starter-electrodiffusion",
          "difficulty": "easy",
          "type": "mc",
          "progressionAdded": true,
          "source": "L01 PDF 29",
          "prompt": "Which two contributions make up electrodiffusive ion flux?",
          "options": [
            {
              "text": "Diffusion and ATP-driven pumping",
              "feedback": "Active pumping is distinct from the passive electrodiffusive flux law."
            },
            {
              "text": "Electrical drift and ATP pumping",
              "feedback": "This omits the diffusion contribution and adds active transport."
            },
            {
              "text": "Diffusion and electrical drift",
              "feedback": "Concentration gradients drive diffusion; electric fields drive drift."
            }
          ],
          "correct": 2,
          "hints": [{ "body": "Identify the two gradients acting on a dissolved ion." }],
          "modelAnswer": [
            "Concentration gradients drive diffusion; electric fields drive drift."
          ]
        }
      ],
      "formulas": [
        {
          "id": "L01-f-fick",
          "name": "Fick first law",
          "tex": "J_{diff}=-D\\frac{\\partial C}{\\partial x}",
          "symbols": [
            {
              "tex": "J_{diff}",
              "name": "Diffusive flux density",
              "unit": "mol/m2/s",
              "meaning": "Moles crossing unit area per time."
            },
            {
              "tex": "D",
              "name": "Diffusion coefficient",
              "unit": "m2/s",
              "meaning": "Diffusion strength."
            },
            {
              "tex": "\\frac{\\partial C}{\\partial x}",
              "name": "Concentration gradient",
              "unit": "mol/m4",
              "meaning": "Change in molar concentration per distance."
            }
          ],
          "reads": "Net diffusion points toward lower concentration.",
          "assumes": "One spatial dimension and a local gradient.",
          "variants": [],
          "drill": {
            "prompt": "For $D=10^{-9}\\,\\text{m}^2/\\text{s}$ and $\\partial C/\\partial x=2\\times10^4\\,\\text{mol}/\\text{m}^4$, find flux density.",
            "answer": {
              "value": -2e-05,
              "unit": "mol/m2/s",
              "tolerance": 1e-07,
              "verification": {
                "relation": "diffusion",
                "inputs": {
                  "d": 1e-09,
                  "gradient": 20000.0
                },
                "displayScale": 1
              }
            },
            "tex": "J=-10^{-9}(2\\times10^4)=-2\\times10^{-5}\\,mol/(m^2s)",
            "modelAnswer": [
              "Net diffusion points toward lower concentration."
            ],
            "error": "The minus sign sends flux down the concentration gradient.",
            "hints": [
              {
                "body": "Use $J_{diff}=-D\\frac{\\partial C}{\\partial x}$."
              },
              {
                "body": "Start with $J=-10^{-9}(2\\times10^4)$. Evaluate using the stated units, then check the sign."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{J_{diff}}=-\\htmlClass{formula-term-1}{D}\\htmlClass{formula-term-2}{\\frac{\\partial C}{\\partial x}}"
        },
        {
          "id": "L01-f-drift",
          "name": "Electrical drift",
          "tex": "J_{drift}=-uzC\\frac{\\partial V}{\\partial x}",
          "symbols": [
            {
              "tex": "u",
              "name": "Mobility",
              "unit": "m2/V/s",
              "meaning": "Course mobility convention."
            },
            {
              "tex": "z",
              "name": "Valence",
              "unit": "",
              "meaning": "Signed ion charge number."
            },
            {
              "tex": "C",
              "name": "Concentration",
              "unit": "mol/m3",
              "meaning": "Local molar concentration."
            },
            {
              "tex": "\\frac{\\partial V}{\\partial x}",
              "name": "Potential gradient",
              "unit": "V/m",
              "meaning": "Electric field is its negative."
            }
          ],
          "reads": "Electric drift reverses direction when ion valence reverses.",
          "assumes": "Local field and mobility in the course convention.",
          "variants": [],
          "drill": {
            "prompt": "For $u=4\\times10^{-8}\\,\\text{m}^2/(\\text{V s})$, $z=+1$, $C=100\\,\\text{mol}/\\text{m}^3$, and potential gradient $2\\,\\text{V/m}$, find drift flux.",
            "answer": {
              "value": -8e-06,
              "unit": "mol/m2/s",
              "tolerance": 1e-08,
              "verification": {
                "relation": "drift",
                "inputs": {
                  "mobility": 4e-08,
                  "z": 1,
                  "concentration": 100,
                  "field": 2
                },
                "displayScale": 1
              }
            },
            "tex": "J=-4\\times10^{-8}(1)(100)(2)=-8\\times10^{-6}\\,mol/(m^2s)",
            "modelAnswer": [
              "Electric drift reverses direction when ion valence reverses."
            ],
            "error": "Include signed valence and the leading minus sign.",
            "hints": [
              {
                "body": "Use $J_{drift}=-uzC\\frac{\\partial V}{\\partial x}$."
              },
              {
                "body": "Start with $J=-4\\times10^{-8}(1)(100)(2)$. Evaluate using the stated units, then check the sign."
              }
            ]
          },
          "interactiveTex": "J_{drift}=-\\htmlClass{formula-term-0}{u}\\htmlClass{formula-term-1}{z}\\htmlClass{formula-term-2}{C}\\htmlClass{formula-term-3}{\\frac{\\partial V}{\\partial x}}"
        },
        {
          "id": "L01-f-einstein",
          "name": "Course Stokes-Einstein relation",
          "tex": "D=uRT/F",
          "symbols": [
            {
              "tex": "D",
              "name": "Diffusion coefficient",
              "unit": "m2/s",
              "meaning": "Strength of diffusion."
            },
            {
              "tex": "u",
              "name": "Mobility",
              "unit": "m2/V/s",
              "meaning": "Course mobility."
            },
            {
              "tex": "R",
              "name": "Gas constant",
              "unit": "J/mol/K",
              "meaning": "Molar gas constant."
            },
            {
              "tex": "T",
              "name": "Absolute temperature",
              "unit": "K",
              "meaning": "Temperature in kelvin."
            },
            {
              "tex": "F",
              "name": "Faraday constant",
              "unit": "C/mol",
              "meaning": "Charge per mole of elementary carriers."
            }
          ],
          "reads": "Thermal diffusion and electrical mobility are linked at a given temperature.",
          "assumes": "Use the course mobility definition and consistent constants.",
          "variants": [],
          "drill": {
            "prompt": "Use $u=4\\times10^{-8}\\,\\text{m}^2/(\\text{V s})$, $R=8.314$, $T=293\\,\\text{K}$ and $F=96500$ in SI. Find $D$.",
            "answer": {
              "value": 1.009741761658031e-09,
              "unit": "m2/s",
              "tolerance": 1e-12,
              "verification": {
                "relation": "einstein",
                "inputs": {
                  "mobility": 4e-08,
                  "r": 8.314,
                  "temperature": 293,
                  "f": 96500
                },
                "displayScale": 1
              }
            },
            "tex": "D=\\frac{(4\\times10^{-8})(8.314)(293)}{96500}\\approx1.0097\\times10^{-9}\\,m^2/s",
            "modelAnswer": [
              "Thermal diffusion and electrical mobility are linked at a given temperature."
            ],
            "error": "Use absolute temperature; this slide rounds Faraday constant to $96500$.",
            "hints": [
              {
                "body": "Use $D=uRT/F$."
              },
              {
                "body": "Start with $D=uRT/F$. Evaluate using the stated units, then check the sign."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{D}=\\htmlClass{formula-term-1}{u}\\htmlClass{formula-term-2}{R}\\htmlClass{formula-term-3}{T}/\\htmlClass{formula-term-4}{F}"
        }
      ]
    },
    {
      "id": "equilibrium",
      "title": "Nernst equilibrium",
      "keyTerms": [],
      "blocks": [
        {
          "type": "text",
          "body": [
            "At zero net flux, diffusion and drift balance for one ion. Use $E=\\frac{RT}{zF}\\ln(C_{\\mathrm{out}}/C_{\\mathrm{in}})$ with signed valence $z$ and absolute temperature $T$. Invert the ratio only if you also reverse the sign.",
            "For base ten use $58\\,\\mathrm{mV}/z$ at $20\\,^{\\circ}\\mathrm{C}$ or $61.5\\,\\mathrm{mV}/z$ at $37\\,^{\\circ}\\mathrm{C}$ as the prefactor."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 1, slide 30–31. Printed labels and source axes retained.",
            "fallbackAlt": "Lecture 1, slide 30–31. Printed labels and source axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L01/nernst.webp', import.meta.url).href,
              "alt": "Lecture 1, slide 30–31. Printed labels and source axes retained.",
              "aspect": 0.6256517205422315,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "conceptQuiz": [
        {
          "id": "equilibrium-check",
          "practice": "extra",
          "prompt": "At equilibrium for one permeant ion, which quantity vanishes?",
          "options": [
            {
              "text": "Its net transmembrane flux",
              "feedback": "Opposing fluxes balance to give zero net flux."
            },
            {
              "text": "Its concentration on both sides",
              "feedback": "Concentrations can remain unequal."
            },
            {
              "text": "Its random thermal movement",
              "feedback": "Thermal movement continues at equilibrium."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Distinguish microscopic motion from net movement."
            },
            {
              "body": "Equal opposing fluxes can occur even with unequal concentrations."
            }
          ],
          "modelAnswer": [
            "Opposing fluxes balance to give zero net flux."
          ]
        },
        {
          "id": "equilibrium-starter-ratio",
          "practice": "extra",
          "difficulty": "easy",
          "type": "mc",
          "progressionAdded": true,
          "source": "L01 PDF 30–31",
          "prompt": "Which concentration ratio accompanies the positive Nernst prefactor $RT/(zF)$?",
          "options": [
            {
              "text": "Outside concentration over inside",
              "feedback": "The positive prefactor uses the outside/inside ratio."
            },
            {
              "text": "Inside concentration over outside",
              "feedback": "The reciprocal ratio needs a minus sign before the prefactor."
            },
            {
              "text": "Inside concentration over their sum",
              "feedback": "Nernst uses a side-to-side ratio, not a fraction of the total."
            }
          ],
          "correct": 0,
          "hints": [{ "body": "Use the same concentration ratio as the supplied equation sheet." }],
          "modelAnswer": [
            "The positive prefactor uses the outside/inside ratio."
          ]
        },
        {
          "id": "equilibrium-starter-balance",
          "difficulty": "easy",
          "type": "mc",
          "progressionAdded": true,
          "source": "L01 PDF 30–31",
          "prompt": "What balances at the equilibrium voltage of a permeant ion?",
          "options": [
            {
              "text": "Electrical and ATP-driven fluxes",
              "feedback": "The Nernst balance is passive; ATP pumping is not one of its two terms."
            },
            {
              "text": "Electrical and diffusional fluxes",
              "feedback": "Their opposite net contributions cancel for that ion."
            },
            {
              "text": "Diffusional and ATP-driven fluxes",
              "feedback": "This replaces the electrical contribution with active transport."
            }
          ],
          "correct": 1,
          "hints": [{ "body": "Consider how net flux can vanish even when each contribution is nonzero." }],
          "modelAnswer": [
            "Their opposite net contributions cancel for that ion."
          ]
        }
      ],
      "formulas": [
        {
          "id": "L01-f-np",
          "name": "Nernst-Planck flux",
          "tex": "J=-u\\left(\\frac{RT}{F}\\frac{\\partial C}{\\partial x}+zC\\frac{\\partial V}{\\partial x}\\right)",
          "symbols": [
            {
              "tex": "J",
              "name": "Net molar flux density",
              "unit": "mol/m2/s",
              "meaning": "Sum of diffusion and drift."
            },
            {
              "tex": "u",
              "name": "Mobility",
              "unit": "m2/V/s",
              "meaning": "Course mobility."
            },
            {
              "tex": "R",
              "name": "Gas constant",
              "unit": "J/mol/K",
              "meaning": "Molar gas constant."
            },
            {
              "tex": "T",
              "name": "Temperature",
              "unit": "K",
              "meaning": "Absolute temperature."
            },
            {
              "tex": "F",
              "name": "Faraday constant",
              "unit": "C/mol",
              "meaning": "Molar elementary charge."
            },
            {
              "tex": "z",
              "name": "Valence",
              "unit": "",
              "meaning": "Signed ion charge."
            },
            {
              "tex": "C",
              "name": "Concentration",
              "unit": "mol/m3",
              "meaning": "Local concentration."
            }
          ],
          "reads": "Net movement combines chemical and electrical gradients.",
          "assumes": "One spatial dimension, local gradients and consistent molar units.",
          "variants": [],
          "drill": {
            "prompt": "Use $u=4\\times10^{-8}$, $R=8.314$, $T=293$, $F=96500$, $z=1$, $C=100$, $\\partial C/\\partial x=20000$, $\\partial V/\\partial x=2$ in SI. Find $J$.",
            "answer": {
              "value": -2.819483523316062e-05,
              "unit": "mol/m2/s",
              "tolerance": 1e-07,
              "verification": {
                "relation": "electrodiffusion",
                "inputs": {
                  "mobility": 4e-08,
                  "r": 8.314,
                  "temperature": 293,
                  "f": 96500,
                  "z": 1,
                  "concentration": 100,
                  "gradient": 20000,
                  "field": 2
                },
                "displayScale": 1
              }
            },
            "tex": "J=-4\\times10^{-8}\\left(\\frac{8.314(293)}{96500}(20000)+200\\right)\\approx-2.8194\\times10^{-5}\\,mol/(m^2s)",
            "modelAnswer": [
              "Net movement combines chemical and electrical gradients."
            ],
            "error": "Add both flux contributions with their signs.",
            "hints": [
              {
                "body": "Use $J=-u\\left(\\frac{RT}{F}\\frac{\\partial C}{\\partial x}+zC\\frac{\\partial V}{\\partial x}\\right)$."
              },
              {
                "body": "Start with $J=-u\\left(\\frac{RT}{F}\\frac{\\partial C}{\\partial x}+zC\\frac{\\partial V}{\\partial x}\\right)$. Evaluate using the stated units, then check the sign."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{J}=-\\htmlClass{formula-term-1}{u}\\left(\\frac{\\htmlClass{formula-term-2}{R}\\htmlClass{formula-term-3}{T}}{\\htmlClass{formula-term-4}{F}}\\frac{\\partial \\htmlClass{formula-term-6}{C}}{\\partial x}+\\htmlClass{formula-term-5}{z}\\htmlClass{formula-term-6}{C}\\frac{\\partial V}{\\partial x}\\right)"
        },
        {
          "id": "L01-f-flux-current",
          "name": "Flux density to current density",
          "tex": "j=JzF",
          "symbols": [
            {
              "tex": "j",
              "name": "Current density",
              "unit": "A/m2",
              "meaning": "Conventional current per membrane area."
            },
            {
              "tex": "J",
              "name": "Molar flux density",
              "unit": "mol/m2/s",
              "meaning": "Signed ion flux per area."
            },
            {
              "tex": "z",
              "name": "Valence",
              "unit": "",
              "meaning": "Signed ionic charge."
            },
            {
              "tex": "F",
              "name": "Faraday constant",
              "unit": "C/mol",
              "meaning": "Elementary charge per mole."
            }
          ],
          "reads": "Anions reverse the relation between particle flux and conventional current.",
          "assumes": "Slide 30 writes current as flux times charge; for flux per area the result is current per area. Multiply by area for total current.",
          "variants": [],
          "drill": {
            "prompt": "For outward chloride flux $J=10^{-6}\\,\\text{mol}/(\\text{m}^2\\text{s})$, $z=-1$ and $F=96485\\,\\text{C/mol}$, find outward current density.",
            "answer": {
              "value": -0.096485,
              "unit": "A/m2",
              "tolerance": 0.00048242500000000003,
              "verification": {
                "relation": "fluxCurrent",
                "inputs": {
                  "flux": 1e-06,
                  "z": -1,
                  "f": 96485
                },
                "displayScale": 1
              }
            },
            "tex": "j=10^{-6}(-1)(96485)=-0.096485\\,A/m^2",
            "modelAnswer": [
              "Anions reverse the relation between particle flux and conventional current."
            ],
            "error": "Outward chloride particle flow produces negative conventional current.",
            "hints": [
              {
                "body": "Use $j=JzF$."
              },
              {
                "body": "Start with $j=10^{-6}(-1)(96485)$. Evaluate using the stated units, then check the sign."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{j}=\\htmlClass{formula-term-1}{J}\\htmlClass{formula-term-2}{z}\\htmlClass{formula-term-3}{F}"
        },
        {
          "id": "L01-f-nernst",
          "name": "Nernst equilibrium potential",
          "tex": "E=\\frac{RT}{zF}\\ln\\frac{C_{out}}{C_{in}}",
          "symbols": [
            {
              "tex": "E",
              "name": "Equilibrium potential",
              "unit": "V",
              "meaning": "Inside-minus-outside voltage at zero ion net current."
            },
            {
              "tex": "R",
              "name": "Gas constant",
              "unit": "J/mol/K",
              "meaning": "Molar gas constant."
            },
            {
              "tex": "T",
              "name": "Temperature",
              "unit": "K",
              "meaning": "Absolute temperature."
            },
            {
              "tex": "z",
              "name": "Valence",
              "unit": "",
              "meaning": "Signed charge number."
            },
            {
              "tex": "F",
              "name": "Faraday constant",
              "unit": "C/mol",
              "meaning": "Molar elementary charge."
            },
            {
              "tex": "C_{out}",
              "name": "Outside concentration",
              "unit": "mM",
              "meaning": "Concentration outside."
            },
            {
              "tex": "C_{in}",
              "name": "Inside concentration",
              "unit": "mM",
              "meaning": "Concentration inside, same units as outside."
            }
          ],
          "reads": "The concentration ratio, temperature and valence set one-ion equilibrium voltage.",
          "assumes": "One-ion equilibrium, ideal concentration approximation, temperature stated.",
          "variants": [
            {
              "tex": "E=-\\frac{RT}{zF}\\ln\\frac{C_{in}}{C_{out}}",
              "note": "Equivalent reversed ratio with a minus sign."
            },
            {
              "tex": "E=\\frac{58\\,mV}{z}\\log_{10}\\frac{C_{out}}{C_{in}}",
              "note": "Course rounded shortcut at $20\\,^{\\circ}\\text{C}$, explicitly supplied on the exam sheet."
            },
            {
              "tex": "E=\\frac{61.5\\,mV}{z}\\log_{10}\\frac{C_{out}}{C_{in}}",
              "note": "Course rounded shortcut at $37\\,^{\\circ}\\text{C}$, explicitly supplied on the exam sheet."
            }
          ],
          "drill": {
            "prompt": "Use the course $20\\,^{\\circ}\\text{C}$ shortcut $58\\,\\text{mV}$, $z=+1$, outside $10\\,\\text{mM}$ and inside $100\\,\\text{mM}$. Find $E$.",
            "answer": {
              "value": -58,
              "unit": "mV",
              "tolerance": 0.29,
              "verification": {
                "relation": "nernst",
                "inputs": {
                  "shortcut": 0.058,
                  "z": 1,
                  "outside": 10,
                  "inside": 100
                },
                "displayScale": 0.001
              }
            },
            "tex": "E=58\\,mV\\log_{10}(10/100)=-58\\,mV",
            "modelAnswer": [
              "The concentration ratio, temperature and valence set one-ion equilibrium voltage."
            ],
            "error": "Keep outside over inside and divide by signed valence.",
            "hints": [
              {
                "body": "Use $E=\\frac{RT}{zF}\\ln\\frac{C_{out}}{C_{in}}$."
              },
              {
                "body": "Start with $E=58\\,mV\\log_{10}(10/100)$. Evaluate using the stated units, then check the sign."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{E}=\\frac{\\htmlClass{formula-term-1}{R}\\htmlClass{formula-term-2}{T}}{\\htmlClass{formula-term-3}{z}\\htmlClass{formula-term-4}{F}}\\ln\\frac{\\htmlClass{formula-term-5}{C_{out}}}{\\htmlClass{formula-term-6}{C_{in}}}"
        }
      ]
    },
    {
      "id": "ion-patterns",
      "title": "Ion gradients and driving force",
      "keyTerms": [],
      "blocks": [
        {
          "type": "text",
          "body": [
            "Typically potassium is concentrated inside, and sodium, chloride and calcium outside. When $V_m>E_{\\mathrm{ion}}$, current is outward: cations move out and anions move in. At equality net flux vanishes."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 1, slide 32–33. Printed labels and source axes retained.",
            "fallbackAlt": "Lecture 1, slide 32–33. Printed labels and source axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L01/ions.webp', import.meta.url).href,
              "alt": "Lecture 1, slide 32–33. Printed labels and source axes retained.",
              "aspect": 1.3144016227180528,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "conceptQuiz": [
        {
          "id": "ion-patterns-check",
          "practice": "extra",
          "prompt": "For equal concentrations on both sides, what is the Nernst potential?",
          "options": [
            {
              "text": "$E=0$ for any nonzero valence",
              "feedback": "The logarithm of a unit ratio is zero."
            },
            {
              "text": "$E>0$ for every positive ion",
              "feedback": "Valence cannot make a zero logarithm positive."
            },
            {
              "text": "$E<0$ for every negative ion",
              "feedback": "Valence cannot make a zero logarithm negative."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Look at the concentration ratio before valence."
            },
            {
              "body": "A ratio of one has a zero logarithm."
            }
          ],
          "modelAnswer": [
            "The logarithm of a unit ratio is zero."
          ]
        },
        {
          "id": "ion-patterns-starter-potassium",
          "practice": "extra",
          "difficulty": "easy",
          "type": "mc",
          "progressionAdded": true,
          "source": "L01 PDF 32–33",
          "prompt": "Which ion is typically more concentrated inside animal cells than outside?",
          "options": [
            {
              "text": "Sodium ions",
              "feedback": "The source pattern places sodium predominantly outside."
            },
            {
              "text": "Calcium ions",
              "feedback": "Free calcium is typically much more concentrated outside."
            },
            {
              "text": "Potassium ions",
              "feedback": "The source pattern places potassium predominantly inside."
            }
          ],
          "correct": 2,
          "hints": [{ "body": "Think of the major intracellular cation in the typical concentration table." }],
          "modelAnswer": [
            "The source pattern places potassium predominantly inside."
          ]
        },
        {
          "id": "ion-patterns-starter-chloride",
          "practice": "extra",
          "difficulty": "easy",
          "type": "mc",
          "progressionAdded": true,
          "source": "L01 PDF 32–33",
          "prompt": "What is the typical sign of the chloride equilibrium voltage in the source pattern?",
          "options": [
            {
              "text": "A negative equilibrium voltage",
              "feedback": "Outside-rich chloride has negative valence, giving a negative equilibrium voltage."
            },
            {
              "text": "A positive equilibrium voltage",
              "feedback": "This misses the negative valence of chloride."
            },
            {
              "text": "A zero equilibrium voltage",
              "feedback": "Zero requires equal concentrations, unlike the source chloride pattern."
            }
          ],
          "correct": 0,
          "hints": [{ "body": "An outside-rich concentration ratio gives a positive logarithm. Now apply chloride valence." }],
          "modelAnswer": [
            "Outside-rich chloride has negative valence, giving a negative equilibrium voltage."
          ]
        }
      ],
      "formulas": []
    },
    {
      "id": "transport",
      "title": "Gradient maintenance",
      "keyTerms": [],
      "blocks": [
        {
          "type": "text",
          "body": [
            "Primary active transport uses ATP. Secondary transport uses another ion’s gradient. The sodium/potassium pump exports three $\\mathrm{Na}^+$ and imports two $\\mathrm{K}^+$ per cycle, moving one net positive charge outward."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 1, slide 34–35. Printed labels and source axes retained.",
            "fallbackAlt": "Lecture 1, slide 34–35. Printed labels and source axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L01/transport.webp', import.meta.url).href,
              "alt": "Lecture 1, slide 34–35. Printed labels and source axes retained.",
              "aspect": 1.6591639871382637,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "conceptQuiz": [
        {
          "id": "transport-check",
          "practice": "extra",
          "prompt": "What directly powers primary active transport?",
          "options": [
            {
              "text": "Hydrolysis of ATP molecules",
              "feedback": "ATP hydrolysis powers primary active transport."
            },
            {
              "text": "Diffusion through open channels",
              "feedback": "Passive channels do not supply primary pumping energy."
            },
            {
              "text": "Flow down another ion gradient",
              "feedback": "Another ion gradient powers secondary active transport."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Distinguish primary from secondary energy sources."
            },
            {
              "body": "A stored ion gradient powers secondary transport, rather than primary pumping."
            }
          ],
          "modelAnswer": [
            "ATP hydrolysis powers primary active transport."
          ]
        },
        {
          "id": "transport-starter-secondary",
          "practice": "extra",
          "difficulty": "easy",
          "type": "mc",
          "progressionAdded": true,
          "source": "L01 PDF 34–35",
          "prompt": "What energy source directly drives secondary active transport?",
          "options": [
            {
              "text": "ATP split by the transporter itself",
              "feedback": "Direct ATP hydrolysis defines primary rather than secondary transport."
            },
            {
              "text": "Energy stored in another ion gradient",
              "feedback": "Secondary transport couples movement to another ion’s electrochemical gradient."
            },
            {
              "text": "Random motion through a leak channel",
              "feedback": "Passive leaks do not supply the coupling of secondary active transport."
            }
          ],
          "correct": 1,
          "hints": [{ "body": "Identify the energy source already stored across the membrane." }],
          "modelAnswer": [
            "Secondary transport couples movement to another ion’s electrochemical gradient."
          ]
        },
        {
          "id": "transport-starter-pump",
          "difficulty": "easy",
          "type": "mc",
          "progressionAdded": true,
          "source": "L01 PDF 34–35",
          "prompt": "Which directions does the sodium/potassium pump use in its normal cycle?",
          "options": [
            {
              "text": "Sodium inward and potassium outward",
              "feedback": "Those are the reverse of the pump’s normal transport directions."
            },
            {
              "text": "Sodium outward and potassium outward",
              "feedback": "Potassium is imported, rather than exported, in the normal cycle."
            },
            {
              "text": "Sodium outward and potassium inward",
              "feedback": "The pump exports three sodium ions and imports two potassium ions."
            }
          ],
          "correct": 2,
          "hints": [{ "body": "The pump restores the sodium-rich outside and potassium-rich inside." }],
          "modelAnswer": [
            "The pump exports three sodium ions and imports two potassium ions."
          ]
        }
      ],
      "formulas": []
    },
    {
      "id": "neutrality",
      "title": "Bulk electroneutrality",
      "keyTerms": [],
      "blocks": [
        {
          "type": "text",
          "body": [
            "Valence-weighted concentrations balance in bulk solution. Membrane voltage comes from a thin layer of separated charge near the membrane, so the bulk on either side stays approximately neutral."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 1, slide 36. Printed labels and source axes retained.",
            "fallbackAlt": "Lecture 1, slide 36. Printed labels and source axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L01/neutrality.webp', import.meta.url).href,
              "alt": "Lecture 1, slide 36. Printed labels and source axes retained.",
              "aspect": 3.171122994652406,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "conceptQuiz": [
        {
          "id": "neutrality-check",
          "prompt": "Where is the important exception to bulk electroneutrality?",
          "options": [
            {
              "text": "In charge layers near the membrane",
              "feedback": "Membrane-adjacent charge separation supports voltage."
            },
            {
              "text": "Throughout the whole extracellular bath",
              "feedback": "The bulk extracellular solution remains approximately neutral."
            },
            {
              "text": "Throughout the whole intracellular fluid",
              "feedback": "The bulk intracellular solution remains approximately neutral."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Separate bulk solution from an interface."
            },
            {
              "body": "A capacitor supports voltage with localized boundary charge separation."
            }
          ],
          "modelAnswer": [
            "Membrane-adjacent charge separation supports voltage."
          ]
        },
        {
          "id": "neutrality-starter-valence",
          "practice": "extra",
          "difficulty": "easy",
          "type": "mc",
          "progressionAdded": true,
          "source": "L01 PDF 36",
          "prompt": "What must weight ion concentrations when checking bulk electroneutrality?",
          "options": [
            {
              "text": "The signed valence of each ion",
              "feedback": "Charge balance weights concentration by signed ionic charge."
            },
            {
              "text": "The molecular mass of each ion",
              "feedback": "Mass balance is different from electric charge balance."
            },
            {
              "text": "The diffusion rate of each ion",
              "feedback": "Diffusion rates affect transport, not charge per particle."
            }
          ],
          "correct": 0,
          "hints": [{ "body": "Count charge carried by each particle as well as how many particles there are." }],
          "modelAnswer": [
            "Charge balance weights concentration by signed ionic charge."
          ]
        }
      ],
      "formulas": [
        {
          "id": "L01-f-neutrality",
          "name": "Charge balance",
          "tex": "\\sum_i z_i^+[C_i]=\\sum_j |z_j^-|[A_j]",
          "symbols": [
            {
              "tex": "z",
              "name": "Valence magnitude",
              "unit": "",
              "meaning": "Charge weighting in the balance."
            },
            {
              "tex": "[C]",
              "name": "Cation concentration",
              "unit": "mM",
              "meaning": "Positive charge carriers."
            },
            {
              "tex": "[A]",
              "name": "Anion concentration",
              "unit": "mM",
              "meaning": "Negative charge carriers."
            }
          ],
          "reads": "Electroneutrality balances charge equivalents, not merely particle counts.",
          "assumes": "Bulk solution, away from membrane charge layers.",
          "variants": [],
          "drill": {
            "prompt": "A bulk solution contains $3\\,\\text{mM}$ of a divalent cation as its only cation. Find the monovalent anion concentration needed for neutrality.",
            "answer": {
              "value": 6,
              "unit": "mM",
              "tolerance": 0.03,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 3,
                  "b": 2
                },
                "displayScale": 1
              }
            },
            "tex": "[A^-]=2(3\\,mM)=6\\,mM",
            "modelAnswer": [
              "Electroneutrality balances charge equivalents, not merely particle counts."
            ],
            "error": "Weight each concentration by valence magnitude.",
            "hints": [
              {
                "body": "Use $\\sum_i z_i^+[C_i]=\\sum_j |z_j^-|[A_j]$."
              },
              {
                "body": "Start with $[A^-]=2(3\\,mM)$. Evaluate using the stated units, then check the sign."
              }
            ]
          },
          "interactiveTex": "\\sum_i \\htmlClass{formula-term-0}{z}_i^+[C_i]=\\sum_j |\\htmlClass{formula-term-0}{z}_j^-|[A_j]"
        }
      ]
    },
    {
      "id": "donnan",
      "title": "Donnan redistribution",
      "keyTerms": [],
      "blocks": [
        {
          "type": "text",
          "body": [
            "Impermeant charge shifts permeant ions until their Nernst potentials agree. For monovalent potassium and chloride, $[K^+]_{\\mathrm{in}}[Cl^-]_{\\mathrm{in}}=[K^+]_{\\mathrm{out}}[Cl^-]_{\\mathrm{out}}$. Combine this with charge balance and conservation at the specified volumes.",
            "For equal fixed volumes, solve for the concentration transfer before finding voltage. Count all solute particles, including impermeant ions, to predict water movement if volumes can change."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Lecture 1, slide 37–38; Exercise 1 P3. Printed labels and source axes retained.",
            "fallbackAlt": "Lecture 1, slide 37–38; Exercise 1 P3. Printed labels and source axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L01/donnan.webp', import.meta.url).href,
              "alt": "Lecture 1, slide 37–38; Exercise 1 P3. Printed labels and source axes retained.",
              "aspect": 3.6116504854368934,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "conceptQuiz": [
        {
          "id": "donnan-check",
          "prompt": "Which constraint must accompany the Donnan product rule?",
          "options": [
            {
              "text": "Only the equality of ion counts",
              "feedback": "Ion counts alone ignore valence and impermeant charge."
            },
            {
              "text": "Only a prescribed voltage sign",
              "feedback": "Voltage sign is an outcome rather than a sufficient constraint."
            },
            {
              "text": "Charge balance and conservation",
              "feedback": "Conservation and electroneutrality determine the allowed redistribution."
            }
          ],
          "correct": 2,
          "hints": [
            {
              "body": "One relation alone does not determine every concentration."
            },
            {
              "body": "Track conserved permeant material and the charge contributed by impermeant ions."
            }
          ],
          "modelAnswer": [
            "Conservation and electroneutrality determine the allowed redistribution."
          ]
        },
        {
          "id": "donnan-starter-impermeant",
          "practice": "extra",
          "difficulty": "easy",
          "type": "mc",
          "progressionAdded": true,
          "source": "L01 PDF 37–38; Exercise 1 P3",
          "prompt": "What establishes the asymmetry in the taught Donnan setup?",
          "options": [
            {
              "text": "Equal permeant salt on both sides",
              "feedback": "Equal salt alone does not establish the trapped-charge asymmetry."
            },
            {
              "text": "Charged solute trapped on one side",
              "feedback": "Impermeant charge constrains how the permeant ions can redistribute."
            },
            {
              "text": "A pump moving salt to one side",
              "feedback": "The taught Donnan equilibrium uses passive redistribution, not pumping."
            }
          ],
          "correct": 1,
          "hints": [{ "body": "Look for the charge that cannot redistribute across the membrane." }],
          "modelAnswer": [
            "Impermeant charge constrains how the permeant ions can redistribute."
          ]
        },
        {
          "id": "donnan-starter-water",
          "practice": "extra",
          "difficulty": "easy",
          "type": "mc",
          "progressionAdded": true,
          "source": "L01 PDF 37–38; Exercise 1 P3",
          "prompt": "Which particles count when comparing osmotic tendencies in this setup?",
          "options": [
            {
              "text": "Only solutes that cross the membrane",
              "feedback": "Impermeant dissolved particles also contribute to osmotic tendency."
            },
            {
              "text": "Only solutes trapped by the membrane",
              "feedback": "Permeant dissolved particles also count in each compartment."
            },
            {
              "text": "Both permeant and impermeant solutes",
              "feedback": "All dissolved particles contribute to the osmotic comparison."
            }
          ],
          "correct": 2,
          "hints": [{ "body": "Osmotic tendency depends on total particle concentration on each side." }],
          "modelAnswer": [
            "All dissolved particles contribute to the osmotic comparison."
          ]
        }
      ],
      "formulas": [
        {
          "id": "L01-f-donnan",
          "name": "Monovalent Donnan product",
          "tex": "[K^+]_{in}[Cl^-]_{in}=[K^+]_{out}[Cl^-]_{out}",
          "symbols": [
            {
              "tex": "[K^+]_{in}",
              "name": "Inside potassium",
              "unit": "mM",
              "meaning": "Permeant cation concentration inside."
            },
            {
              "tex": "[Cl^-]_{in}",
              "name": "Inside chloride",
              "unit": "mM",
              "meaning": "Permeant anion concentration inside."
            },
            {
              "tex": "[K^+]_{out}",
              "name": "Outside potassium",
              "unit": "mM",
              "meaning": "Permeant cation outside."
            },
            {
              "tex": "[Cl^-]_{out}",
              "name": "Outside chloride",
              "unit": "mM",
              "meaning": "Permeant anion outside."
            }
          ],
          "reads": "Both permeant ions must share the same equilibrium voltage.",
          "assumes": "Passive equilibrium, monovalent permeant pair, impermeant charge specified; use conservation and neutrality too.",
          "variants": [
            {
              "tex": "\\left(\\frac{C_{out}^{+m}}{C_{in}^{+m}}\\right)^{1/m}=\\left(\\frac{A_{in}^{-n}}{A_{out}^{-n}}\\right)^{1/n}",
              "note": "General valence form from slide 37; valence magnitudes are positive in the exponents."
            }
          ],
          "drill": {
            "prompt": "At constrained equilibrium, inside potassium is $90\\,\\text{mM}$ and chloride is $40\\,\\text{mM}$. Outside potassium is $60\\,\\text{mM}$. Find outside chloride.",
            "answer": {
              "value": 60,
              "unit": "mM",
              "tolerance": 0.3,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 3600,
                  "b": 60
                },
                "displayScale": 1
              }
            },
            "tex": "[Cl^-]_{out}=90(40)/60\\,mM=60\\,mM",
            "modelAnswer": [
              "Both permeant ions must share the same equilibrium voltage."
            ],
            "error": "Use the cross-membrane product, not equal concentrations.",
            "hints": [
              {
                "body": "Use $[K^+]_{in}[Cl^-]_{in}=[K^+]_{out}[Cl^-]_{out}$."
              },
              {
                "body": "Start with $[Cl^-]_{out}=90(40)/60\\,mM$. Evaluate using the stated units, then check the sign."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{[K^+]_{in}}\\htmlClass{formula-term-1}{[Cl^-]_{in}}=\\htmlClass{formula-term-2}{[K^+]_{out}}\\htmlClass{formula-term-3}{[Cl^-]_{out}}"
        }
      ]
    }
  ],
  "recap": {
    "takeaways": ["Predict current direction from the voltage convention and driving force.", "Check both time-domain charging and frequency-domain filtering for a passive membrane.", "Choose the clamp mode and check electrode or seal artifacts before interpreting traces."],
    "intro": "Revision reference. Equation provision and calculator allowance are confirmed; open-book status is not established.",
    "terms": [
      {
        "term": "Electrophysiology",
        "definition": "Measurement of biological voltage and current."
      },
      {
        "term": "Equilibrium potential",
        "definition": "Voltage at zero net current for one ion."
      },
      {
        "term": "Time constant",
        "definition": "Timescale of passive exponential response."
      },
      {
        "term": "Donnan equilibrium",
        "definition": "Constrained passive ionic redistribution with impermeant charge."
      }
    ],
    "equations": [
      {
        "name": "Current from transferred charge",
        "tex": "I=\\frac{\\Delta Q}{\\Delta t}",
        "note": "Use a fixed reference direction and a time-averaged transfer."
      },
      {
        "name": "Reciprocal resistance",
        "tex": "G=\\frac{1}{R}",
        "note": "An ohmic component with positive resistance."
      },
      {
        "name": "Ohm law",
        "tex": "\\Delta V=IR=I/G",
        "note": "Linear resistor; voltage and current directions agree."
      },
      {
        "name": "Unloaded voltage divider",
        "tex": "V_{out}=V_{in}\\frac{R_2}{R_1+R_2}",
        "note": "No appreciable current is drawn by the output measurement."
      },
      {
        "name": "Charge stored in a capacitor",
        "tex": "q=C\\Delta V",
        "note": "Constant linear capacitance."
      },
      {
        "name": "Geometric capacitance",
        "tex": "C=\\epsilon A/d",
        "note": "Parallel-plate approximation and specified effective permittivity."
      },
      {
        "name": "Specific to total capacitance",
        "tex": "C=C_{specific}A",
        "note": "Uniform specific capacitance."
      },
      {
        "name": "Capacitive current",
        "tex": "I_C=C\\frac{dV}{dt}",
        "note": "Capacitance constant over the ramp."
      },
      {
        "name": "Membrane time constant",
        "tex": "\\tau_m=R_m C_m",
        "note": "Use total resistance with total capacitance, or a consistent specific pair."
      },
      {
        "name": "Passive step response",
        "tex": "\\Delta V(t)=IR_m(1-e^{-t/(R_mC_m)})",
        "note": "Linear isopotential passive membrane, constant current step, initially at baseline."
      },
      {
        "name": "Corner frequency",
        "tex": "f_0=\\frac{1}{2\\pi\\tau_m}",
        "note": "First-order passive RC low-pass."
      },
      {
        "name": "Series resistance",
        "tex": "R_{total}=R_1+R_2",
        "note": "Ideal lumped components of the stated topology."
      },
      {
        "name": "Parallel resistance",
        "tex": "R_{total}^{-1}=R_1^{-1}+R_2^{-1}",
        "note": "Ideal lumped components of the stated topology."
      },
      {
        "name": "Parallel capacitance",
        "tex": "C_{total}=C_1+C_2",
        "note": "Ideal lumped components of the stated topology."
      },
      {
        "name": "Series capacitance",
        "tex": "C_{total}^{-1}=C_1^{-1}+C_2^{-1}",
        "note": "Ideal lumped components of the stated topology."
      },
      {
        "name": "Parallel conductance",
        "tex": "G_{total}=G_1+G_2",
        "note": "Ideal lumped components of the stated topology."
      },
      {
        "name": "Series conductance",
        "tex": "G_{total}^{-1}=G_1^{-1}+G_2^{-1}",
        "note": "Ideal lumped components of the stated topology."
      },
      {
        "name": "Fick first law",
        "tex": "J_{diff}=-D\\frac{\\partial C}{\\partial x}",
        "note": "One spatial dimension and a local gradient."
      },
      {
        "name": "Electrical drift",
        "tex": "J_{drift}=-uzC\\frac{\\partial V}{\\partial x}",
        "note": "Local field and mobility in the course convention."
      },
      {
        "name": "Course Stokes-Einstein relation",
        "tex": "D=uRT/F",
        "note": "Use the course mobility definition and consistent constants."
      },
      {
        "name": "Nernst-Planck flux",
        "tex": "J=-u\\left(\\frac{RT}{F}\\frac{\\partial C}{\\partial x}+zC\\frac{\\partial V}{\\partial x}\\right)",
        "note": "One spatial dimension, local gradients and consistent molar units."
      },
      {
        "name": "Flux density to current density",
        "tex": "j=JzF",
        "note": "Slide 30 writes current as flux times charge; for flux per area the result is current per area. Multiply by area for total current."
      },
      {
        "name": "Nernst equilibrium potential",
        "tex": "E=\\frac{RT}{zF}\\ln\\frac{C_{out}}{C_{in}}",
        "note": "One-ion equilibrium, ideal concentration approximation, temperature stated."
      },
      {
        "name": "Charge balance",
        "tex": "\\sum_i z_i^+[C_i]=\\sum_j |z_j^-|[A_j]",
        "note": "Bulk solution, away from membrane charge layers."
      },
      {
        "name": "Monovalent Donnan product",
        "tex": "[K^+]_{in}[Cl^-]_{in}=[K^+]_{out}[Cl^-]_{out}",
        "note": "Passive equilibrium, monovalent permeant pair, impermeant charge specified; use conservation and neutrality too."
      },
      {
        "name": "Kirchhoff node law",
        "tex": "\\sum I=0",
        "note": "Consistent signs; no net accumulation at the ideal node."
      },
      {
        "name": "Kirchhoff loop law",
        "tex": "\\sum \\Delta V=0",
        "note": "Closed lumped circuit loop with consistent traversal signs."
      },
      {
        "name": "Series voltage drops",
        "tex": "V_{total}=V_1+V_2",
        "note": "Consistent voltage reference directions."
      },
      {
        "name": "Parallel branch currents",
        "tex": "I_{total}=I_1+I_2",
        "note": "Branch reference directions point in the same direction."
      },
      {
        "name": "Frequency and period",
        "tex": "f=1/T",
        "note": "Periodic waveform."
      }
    ],
    "constants": [
      {
        "name": "Gas constant",
        "tex": "R=8.314\\,J/(mol\\,K)"
      },
      {
        "name": "Faraday constant",
        "tex": "F=96485\\,C/mol\\quad(96500\\text{ on slide 29})"
      },
      {
        "name": "Nernst shortcuts",
        "tex": "58\\,mV\\ (20\\,^{\\circ}C),\\quad61.5\\,mV\\ (37\\,^{\\circ}C)"
      },
      {
        "name": "Specific membrane capacitance",
        "tex": "C_{specific}\\approx1\\,\\mu F/cm^2=0.01\\,F/m^2"
      }
    ],
    "conventions": [
      "$V_m=V_{in}-V_{out}$ with $V_{out}=0$.",
      "Outward conventional current is positive: positive charge leaving or negative charge entering.",
      "$\\ln(C_{out}/C_{in})=-\\ln(C_{in}/C_{out})$.",
      "Donnan concentrations require an explicit volume constraint; water movement is a separate equilibrium condition."
    ]
  },
  "lectureQuiz": [
    {
      "id": "L01-scales",
      "sectionId": "cells",
      "type": "trueFalse",
      "difficulty": "easy",
      "prompt": "Judge each statement. Correct every false statement in one line.",
      "hints": [
        {
          "body": "Recall slide 8 structural units and slide 9 scales."
        },
        {
          "body": "Start with a neuron, then a connection, then the spatial scale of each recording."
        }
      ],
      "modelAnswer": [
        "Neuron regions are dendrites, soma, axon and presynaptic terminal.",
        "Synapses mediate communication and can be chemical or electrical.",
        "Cellular recordings resolve individual cells; network recordings include MEAs; organ-level electrography is extracellular.",
        "ECG: heart; EEG: brain; EMG: muscle; ERG: retina."
      ],
      "source": "cells",
      "points": 1,
      "statements": [
        {
          "text": "The soma, dendrites, axon and presynaptic terminal are basic neuronal regions.",
          "answer": true
        },
        {
          "text": "Chemical and electrical synapses are two forms of neural communication.",
          "answer": true
        },
        {
          "text": "ECG records brain electrical activity, while EEG records heart activity.",
          "answer": false,
          "correction": "ECG records heart activity; EEG records brain activity."
        },
        {
          "text": "EMG records muscle activity, ERG retinal activity, and MEAs can sample networks.",
          "answer": true
        }
      ]
    },
    {
      "id": "L01-applications-recall",
      "sectionId": "applications",
      "type": "trueFalse",
      "difficulty": "easy",
      "prompt": "Judge each statement. Correct every false statement in one line.",
      "hints": [
        {
          "body": "Use the application headings."
        },
        {
          "body": "Connect each application to a measured electrical signal."
        }
      ],
      "modelAnswer": [
        "Medicine: ECG or EEG diagnostics, nerve conduction or EMG.",
        "Pharmacology: measure channel or receptor function and off-target electrical risks.",
        "Research: test models or genetic effects; prosthetic examples include cochlear implants, retinal prostheses, myoelectric limbs and brain-controlled arms."
      ],
      "source": "applications",
      "points": 1,
      "statements": [
        {
          "text": "Cellular electrical recordings can test genetic effects and functional drug action.",
          "answer": true
        },
        {
          "text": "EEG, ECG, nerve conduction and EMG are diagnostic electrical readouts.",
          "answer": true
        },
        {
          "text": "Electrical recordings cannot contribute to prosthetic interfaces.",
          "answer": false,
          "correction": "Examples include cochlear and retinal implants, myoelectric prostheses and brain-controlled arms."
        }
      ]
    },
    {
      "id": "L01-modes",
      "sectionId": "signals",
      "type": "trueFalse",
      "difficulty": "easy",
      "prompt": "Judge each statement. Correct every false statement in one line.",
      "hints": [
        {
          "body": "Recall the methodology list."
        },
        {
          "body": "Separate what the instrument records from where the preparation is kept."
        }
      ],
      "modelAnswer": [
        "Current clamp: intracellular voltage; voltage clamp: electric current; single-channel recording: individual-channel current; field recording: extracellular collective activity.",
        "In vivo uses a living organism; ex vivo includes tissue slices; in vitro includes isolated primary or cultured cells."
      ],
      "source": "signals",
      "points": 1,
      "statements": [
        {
          "text": "Current clamp records intracellular potential; voltage clamp records current.",
          "answer": true
        },
        {
          "text": "Single-channel and field recordings necessarily measure the same spatial scale.",
          "answer": false,
          "correction": "Single-channel recording resolves an individual channel; field recording samples extracellular collective activity."
        },
        {
          "text": "Ex vivo includes tissue slices, while in vitro includes isolated primary and cultured cells.",
          "answer": true
        },
        {
          "text": "Noise recording and analysis, optical methods and simultaneous recordings from several cells are also listed research approaches.",
          "answer": true
        }
      ]
    },
    {
      "id": "L01-apparatus-recall",
      "sectionId": "apparatus",
      "type": "written",
      "difficulty": "easy",
      "prompt": "State the roles of microscope, vibration isolation, micromanipulator and electrical shielding. Identify cell-attached, inside-out, whole-cell, outside-out and perforated-patch configurations in the figure.",
      "hints": [
        {
          "body": "Use the apparatus and configuration slides."
        },
        {
          "body": "First separate mechanical and electrical disturbances, then identify access and exposed patch face."
        }
      ],
      "modelAnswer": [
        "Microscope: view the preparation; micromanipulator: position the pipette.",
        "Vibration isolation reduces mechanical disturbance; shielding reduces electrical interference.",
        "Cell-attached retains the patch; whole-cell opens access; inside-out and outside-out expose opposite patch faces; perforated patch provides access through perforations."
      ],
      "markScheme": [
        {
          "text": "Microscope: view the preparation; micromanipulator: position the pipette."
        },
        {
          "text": "Vibration isolation reduces mechanical disturbance; shielding reduces electrical interference."
        },
        {
          "text": "Cell-attached retains the patch; whole-cell opens access; inside-out and outside-out expose opposite patch faces; perforated patch provides access through perforations."
        }
      ],
      "source": "apparatus",
      "points": 1
    },
    {
      "id": "L01-direct-current",
      "sectionId": "signs",
      "type": "multiStepCalc",
      "difficulty": "easy",
      "prompt": "Positive charge $12\\,\\text{pC}$ leaves in $4\\,\\text{ms}$. Find outward current.",
      "hints": [
        {
          "body": "Use $I=\\frac{\\Delta Q}{\\Delta t}$."
        },
        {
          "body": "Start with $I=\\frac{12\\,pC}{4\\,ms}$. Evaluate using the stated units, then check the sign."
        }
      ],
      "stages": [
        {
          "title": "Enter substitution quantities",
          "prompt": "Enter the quantities in the requested units. A bare number uses the displayed unit. For a stated SI constant, enter its numerical value.",
          "fields": [
            {
              "label": "Charge transfer",
              "answer": {
                "value": 1.2e-11,
                "unit": "C",
                "tolerance": 1e-15,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1.2e-11,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Duration",
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
            "Use the given quantities after conversion to the requested units. No expression-string matching is required."
          ]
        },
        {
          "title": "Substitute and evaluate",
          "answer": {
            "value": 3,
            "unit": "nA",
            "tolerance": 0.015,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 1.2e-11,
                "b": 0.004
              },
              "displayScale": 1e-09
            }
          },
          "tex": "I=\\frac{\\Delta Q}{\\Delta t}",
          "modelAnswer": [
            "$I=\\frac{12\\,pC}{4\\,ms}=3\\,nA$",
            "$I=\\frac{\\Delta Q}{\\Delta t}$",
            "$3\\,\\text{nA}$"
          ]
        },
        {
          "title": "Check physical meaning",
          "choices": [
            {
              "label": "Consistent with the stated relation"
            },
            {
              "label": "Opposite to the stated relation"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "A larger signed charge transfer in the same time means a larger current."
          ]
        }
      ],
      "modelAnswer": [
        "$I=\\frac{12\\,pC}{4\\,ms}=3\\,nA$",
        "A larger signed charge transfer in the same time means a larger current."
      ],
      "source": "signs",
      "points": 1
    },
    {
      "id": "L01-sign-identify",
      "sectionId": "signs",
      "type": "trueFalse",
      "difficulty": "easy",
      "prompt": "Judge each statement. Correct every false statement in one line.",
      "hints": [
        {
          "body": "Define the voltage reference and conventional current."
        },
        {
          "body": "Do not use particle direction alone for a negative ion."
        }
      ],
      "modelAnswer": [
        "The voltage is negative relative to outside zero.",
        "Both outward positive-ion movement and inward negative-ion movement are positive outward current.",
        "Lipid is insulating; membrane proteins include conducting channels and transporters."
      ],
      "source": "signs",
      "points": 1,
      "statements": [
        {
          "text": "Negative inside voltage gives negative membrane potential when outside is zero.",
          "answer": true
        },
        {
          "text": "Negative charge entering produces negative outward conventional current.",
          "answer": false,
          "correction": "Negative charge entering gives positive outward conventional current."
        },
        {
          "text": "Lipids insulate, while membrane proteins include channels and transporters.",
          "answer": true
        }
      ]
    },
    {
      "id": "L01-direct-conductance",
      "sectionId": "resistance",
      "type": "multiStepCalc",
      "difficulty": "easy",
      "prompt": "Find the conductance of $250\\,\\text{M}\\Omega$.",
      "hints": [
        {
          "body": "Use $G=\\frac{1}{R}$."
        },
        {
          "body": "Start with $G=(250\\,M\\Omega)^{-1}$. Evaluate using the stated units, then check the sign."
        }
      ],
      "stages": [
        {
          "title": "Enter substitution quantities",
          "prompt": "Enter the quantities in the requested units. A bare number uses the displayed unit. For a stated SI constant, enter its numerical value.",
          "fields": [
            {
              "label": "Reciprocal numerator",
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
              "label": "Resistance",
              "answer": {
                "value": 250000000.0,
                "unit": "ohm",
                "tolerance": 250.0,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 250000000.0,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Use the given quantities after conversion to the requested units. No expression-string matching is required."
          ]
        },
        {
          "title": "Substitute and evaluate",
          "answer": {
            "value": 4,
            "unit": "nS",
            "tolerance": 0.02,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 1,
                "b": 250000000.0
              },
              "displayScale": 1e-09
            }
          },
          "tex": "G=\\frac{1}{R}",
          "modelAnswer": [
            "$G=(250\\,M\\Omega)^{-1}=4\\,nS$",
            "$G=\\frac{1}{R}$",
            "$4\\,\\text{nS}$"
          ]
        },
        {
          "title": "Check physical meaning",
          "choices": [
            {
              "label": "Consistent with the stated relation"
            },
            {
              "label": "Opposite to the stated relation"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Higher resistance means lower conductance."
          ]
        }
      ],
      "modelAnswer": [
        "$G=(250\\,M\\Omega)^{-1}=4\\,nS$",
        "Higher resistance means lower conductance."
      ],
      "source": "resistance",
      "points": 1
    },
    {
      "id": "L01-direct-ohm",
      "sectionId": "resistance",
      "type": "multiStepCalc",
      "difficulty": "easy",
      "prompt": "A fluid path of $4\\,\\text{k}\\Omega$ carries $3\\,\\mu\\text{A}$. Find the IR drop.",
      "hints": [
        {
          "body": "Use $\\Delta V=IR=I/G$."
        },
        {
          "body": "Start with $\\Delta V=4\\,k\\Omega\\times3\\,\\mu A$. Evaluate using the stated units, then check the sign."
        }
      ],
      "stages": [
        {
          "title": "Enter substitution quantities",
          "prompt": "Enter the quantities in the requested units. A bare number uses the displayed unit. For a stated SI constant, enter its numerical value.",
          "fields": [
            {
              "label": "Resistance",
              "answer": {
                "value": 4000,
                "unit": "ohm",
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
            },
            {
              "label": "Current",
              "answer": {
                "value": 3e-06,
                "unit": "A",
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
            }
          ],
          "modelAnswer": [
            "Use the given quantities after conversion to the requested units. No expression-string matching is required."
          ]
        },
        {
          "title": "Substitute and evaluate",
          "answer": {
            "value": 12,
            "unit": "mV",
            "tolerance": 0.06,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 4000,
                "b": 3e-06
              },
              "displayScale": 0.001
            }
          },
          "tex": "\\Delta V=IR=I/G",
          "modelAnswer": [
            "$\\Delta V=4\\,k\\Omega\\times3\\,\\mu A=12\\,mV$",
            "$\\Delta V=IR=I/G$",
            "$12\\,\\text{mV}$"
          ]
        },
        {
          "title": "Check physical meaning",
          "choices": [
            {
              "label": "Consistent with the stated relation"
            },
            {
              "label": "Opposite to the stated relation"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The same current makes a larger voltage drop across a larger resistance."
          ]
        }
      ],
      "modelAnswer": [
        "$\\Delta V=4\\,k\\Omega\\times3\\,\\mu A=12\\,mV$",
        "The same current makes a larger voltage drop across a larger resistance."
      ],
      "source": "resistance",
      "points": 1
    },
    {
      "id": "L01-direct-divider",
      "sectionId": "divider",
      "type": "multiStepCalc",
      "difficulty": "easy",
      "prompt": "For $V_{in}=2\\,\\text{V}$, $R_1=6\\,\\text{k}\\Omega$ and $R_2=2\\,\\text{k}\\Omega$, find output.",
      "hints": [
        {
          "body": "Use $V_{out}=V_{in}\\frac{R_2}{R_1+R_2}$."
        },
        {
          "body": "Start with $V_{out}=2\\,V\\frac{2}{6+2}$. Evaluate using the stated units, then check the sign."
        }
      ],
      "stages": [
        {
          "title": "Enter substitution quantities",
          "prompt": "Enter the quantities in the requested units. A bare number uses the displayed unit. For a stated SI constant, enter its numerical value.",
          "fields": [
            {
              "label": "Input voltage",
              "answer": {
                "value": 2,
                "unit": "V",
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
              "label": "Upper resistance",
              "answer": {
                "value": 6000,
                "unit": "ohm",
                "tolerance": 0.006,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 6000,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Lower resistance",
              "answer": {
                "value": 2000,
                "unit": "ohm",
                "tolerance": 0.002,
                "verification": {
                  "relation": "ratio",
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
            "Use the given quantities after conversion to the requested units. No expression-string matching is required."
          ]
        },
        {
          "title": "Substitute and evaluate",
          "answer": {
            "value": 0.5,
            "unit": "V",
            "tolerance": 0.0025,
            "verification": {
              "relation": "divider",
              "inputs": {
                "v": 2,
                "r1": 6000,
                "r2": 2000
              },
              "displayScale": 1
            }
          },
          "tex": "V_{out}=V_{in}\\frac{R_2}{R_1+R_2}",
          "modelAnswer": [
            "$V_{out}=2\\,V\\frac{2}{6+2}=0.5\\,V$",
            "$V_{out}=V_{in}\\frac{R_2}{R_1+R_2}$",
            "$0.5\\,\\text{V}$"
          ]
        },
        {
          "title": "Check physical meaning",
          "choices": [
            {
              "label": "Consistent with the stated relation"
            },
            {
              "label": "Opposite to the stated relation"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The fraction of total series resistance below the output sets attenuation."
          ]
        }
      ],
      "modelAnswer": [
        "$V_{out}=2\\,V\\frac{2}{6+2}=0.5\\,V$",
        "The fraction of total series resistance below the output sets attenuation."
      ],
      "source": "divider",
      "points": 1
    },
    {
      "id": "L01-direct-charge",
      "sectionId": "capacitance",
      "type": "multiStepCalc",
      "difficulty": "easy",
      "prompt": "A $40\\,\\text{pF}$ membrane is at $-50\\,\\text{mV}$. Find signed inner charge.",
      "hints": [
        {
          "body": "Use $q=C\\Delta V$."
        },
        {
          "body": "Start with $q=40\\,pF(-50\\,mV)$. Evaluate using the stated units, then check the sign."
        }
      ],
      "stages": [
        {
          "title": "Enter substitution quantities",
          "prompt": "Enter the quantities in the requested units. A bare number uses the displayed unit. For a stated SI constant, enter its numerical value.",
          "fields": [
            {
              "label": "Capacitance",
              "answer": {
                "value": 4e-11,
                "unit": "F",
                "tolerance": 1e-15,
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
              "label": "Inside voltage",
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
            }
          ],
          "modelAnswer": [
            "Use the given quantities after conversion to the requested units. No expression-string matching is required."
          ]
        },
        {
          "title": "Substitute and evaluate",
          "answer": {
            "value": -2,
            "unit": "pC",
            "tolerance": 0.01,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 4e-11,
                "b": -0.05
              },
              "displayScale": 1e-12
            }
          },
          "tex": "q=C\\Delta V",
          "modelAnswer": [
            "$q=40\\,pF(-50\\,mV)=-2\\,pC$",
            "$q=C\\Delta V$",
            "$-2\\,\\text{pC}$"
          ],
          "commonErrors": [
            {
              "wrongValue": 2,
              "tolerance": 0.01,
              "why": "The inner voltage was negative. Keep its sign when computing inner plate charge.",
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 4e-11,
                  "b": 0.05
                },
                "displayScale": 1e-12
              }
            }
          ]
        },
        {
          "title": "Check physical meaning",
          "choices": [
            {
              "label": "Consistent with the stated relation"
            },
            {
              "label": "Opposite to the stated relation"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Larger capacitance needs more charge separation for the same voltage."
          ]
        }
      ],
      "modelAnswer": [
        "$q=40\\,pF(-50\\,mV)=-2\\,pC$",
        "Larger capacitance needs more charge separation for the same voltage."
      ],
      "source": "capacitance",
      "points": 1
    },
    {
      "id": "L01-direct-geometry",
      "sectionId": "capacitance",
      "type": "multiStepCalc",
      "difficulty": "easy",
      "prompt": "Use an illustrative planar dielectric: $\\epsilon=2\\times10^{-11}\\,\\text{F/m}$, $A=10^{-10}\\,\\text{m}^2$, $d=5\\,\\text{nm}$. Find capacitance.",
      "hints": [
        {
          "body": "Use $C=\\epsilon A/d$."
        },
        {
          "body": "Start with $C=\\frac{2\\times10^{-11}\\,F/m\\times10^{-10}\\,m^2}{5\\times10^{-9}\\,m}$. Evaluate using the stated units, then check the sign."
        }
      ],
      "stages": [
        {
          "title": "Enter substitution quantities",
          "prompt": "Enter the quantities in the requested units. A bare number uses the displayed unit. For a stated SI constant, enter its numerical value.",
          "fields": [
            {
              "label": "Permittivity",
              "answer": {
                "value": 2e-11,
                "unit": "F/m",
                "tolerance": 1e-15,
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
                "value": 1e-10,
                "unit": "m2",
                "tolerance": 1e-15,
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
              "label": "Separation",
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
            "Use the given quantities after conversion to the requested units. No expression-string matching is required."
          ]
        },
        {
          "title": "Substitute and evaluate",
          "answer": {
            "value": 0.4,
            "unit": "pF",
            "tolerance": 0.002,
            "verification": {
              "relation": "geometry",
              "inputs": {
                "epsilon": 2e-11,
                "area": 1e-10,
                "distance": 5e-09
              },
              "displayScale": 1e-12
            }
          },
          "tex": "C=\\epsilon A/d",
          "modelAnswer": [
            "$C=\\frac{2\\times10^{-11}\\,F/m\\times10^{-10}\\,m^2}{5\\times10^{-9}\\,m}=0.4\\,pF$",
            "$C=\\epsilon A/d$",
            "$0.4\\,\\text{pF}$"
          ]
        },
        {
          "title": "Check physical meaning",
          "choices": [
            {
              "label": "Consistent with the stated relation"
            },
            {
              "label": "Opposite to the stated relation"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Larger area increases capacitance; thicker dielectric reduces it."
          ]
        }
      ],
      "modelAnswer": [
        "$C=\\frac{2\\times10^{-11}\\,F/m\\times10^{-10}\\,m^2}{5\\times10^{-9}\\,m}=0.4\\,pF$",
        "Larger area increases capacitance; thicker dielectric reduces it."
      ],
      "source": "capacitance",
      "points": 1
    },
    {
      "id": "L01-direct-area",
      "sectionId": "capacitance",
      "type": "multiStepCalc",
      "difficulty": "easy",
      "prompt": "A membrane area is $800\\,\\mu\\text{m}^2$. Use $1\\,\\mu\\text{F}/\\text{cm}^2$ to find total capacitance.",
      "hints": [
        {
          "body": "Use $C=C_{specific}A$."
        },
        {
          "body": "Start with $C=0.01\\,F/m^2\\times800\\times10^{-12}\\,m^2$. Evaluate using the stated units, then check the sign."
        }
      ],
      "stages": [
        {
          "title": "Enter substitution quantities",
          "prompt": "Enter the quantities in the requested units. A bare number uses the displayed unit. For a stated SI constant, enter its numerical value.",
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
              "label": "Membrane area",
              "answer": {
                "value": 8e-10,
                "unit": "m2",
                "tolerance": 1e-15,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 8e-10,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Use the given quantities after conversion to the requested units. No expression-string matching is required."
          ]
        },
        {
          "title": "Substitute and evaluate",
          "answer": {
            "value": 8,
            "unit": "pF",
            "tolerance": 0.04,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 0.01,
                "b": 8e-10
              },
              "displayScale": 1e-12
            }
          },
          "tex": "C=C_{specific}A",
          "modelAnswer": [
            "$C=0.01\\,F/m^2\\times800\\times10^{-12}\\,m^2=8\\,pF$",
            "$C=C_{specific}A$",
            "$8\\,\\text{pF}$"
          ]
        },
        {
          "title": "Check physical meaning",
          "choices": [
            {
              "label": "Consistent with the stated relation"
            },
            {
              "label": "Opposite to the stated relation"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "More membrane at the same specific capacitance stores more charge."
          ]
        }
      ],
      "modelAnswer": [
        "$C=0.01\\,F/m^2\\times800\\times10^{-12}\\,m^2=8\\,pF$",
        "More membrane at the same specific capacitance stores more charge."
      ],
      "source": "capacitance",
      "points": 1
    },
    {
      "id": "L01-direct-capacitive",
      "sectionId": "passive",
      "type": "multiStepCalc",
      "difficulty": "easy",
      "prompt": "A $20\\,\\text{pF}$ capacitor has voltage slope $3\\,\\text{V/s}$. Find capacitive current.",
      "hints": [
        {
          "body": "Use $I_C=C\\frac{dV}{dt}$."
        },
        {
          "body": "Start with $I_C=20\\,pF\\times3\\,V/s$. Evaluate using the stated units, then check the sign."
        }
      ],
      "stages": [
        {
          "title": "Enter substitution quantities",
          "prompt": "Enter the quantities in the requested units. A bare number uses the displayed unit. For a stated SI constant, enter its numerical value.",
          "fields": [
            {
              "label": "Capacitance",
              "answer": {
                "value": 2e-11,
                "unit": "F",
                "tolerance": 1e-15,
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
              "label": "Voltage slope",
              "answer": {
                "value": 3,
                "unit": "V/s",
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
            "Use the given quantities after conversion to the requested units. No expression-string matching is required."
          ]
        },
        {
          "title": "Substitute and evaluate",
          "answer": {
            "value": 60,
            "unit": "pA",
            "tolerance": 0.3,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 2e-11,
                "b": 3
              },
              "displayScale": 1e-12
            }
          },
          "tex": "I_C=C\\frac{dV}{dt}",
          "modelAnswer": [
            "$I_C=20\\,pF\\times3\\,V/s=60\\,pA$",
            "$I_C=C\\frac{dV}{dt}$",
            "$60\\,\\text{pA}$"
          ]
        },
        {
          "title": "Check physical meaning",
          "choices": [
            {
              "label": "Consistent with the stated relation"
            },
            {
              "label": "Opposite to the stated relation"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Faster voltage change needs greater charging current."
          ]
        }
      ],
      "modelAnswer": [
        "$I_C=20\\,pF\\times3\\,V/s=60\\,pA$",
        "Faster voltage change needs greater charging current."
      ],
      "source": "passive",
      "points": 1
    },
    {
      "id": "L01-direct-tau",
      "sectionId": "passive",
      "type": "multiStepCalc",
      "difficulty": "easy",
      "prompt": "Find the time constant for $R_m=200\\,\\text{M}\\Omega$ and $C_m=50\\,\\text{pF}$.",
      "hints": [
        {
          "body": "Use $\\tau_m=R_m C_m$."
        },
        {
          "body": "Start with $\\tau_m=200\\,M\\Omega\\times50\\,pF$. Evaluate using the stated units, then check the sign."
        }
      ],
      "stages": [
        {
          "title": "Enter substitution quantities",
          "prompt": "Enter the quantities in the requested units. A bare number uses the displayed unit. For a stated SI constant, enter its numerical value.",
          "fields": [
            {
              "label": "Resistance",
              "answer": {
                "value": 200000000.0,
                "unit": "ohm",
                "tolerance": 200.0,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 200000000.0,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Capacitance",
              "answer": {
                "value": 5e-11,
                "unit": "F",
                "tolerance": 1e-15,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 5e-11,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Use the given quantities after conversion to the requested units. No expression-string matching is required."
          ]
        },
        {
          "title": "Substitute and evaluate",
          "answer": {
            "value": 10,
            "unit": "ms",
            "tolerance": 0.05,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 200000000.0,
                "b": 5e-11
              },
              "displayScale": 0.001
            }
          },
          "tex": "\\tau_m=R_m C_m",
          "modelAnswer": [
            "$\\tau_m=200\\,M\\Omega\\times50\\,pF=10\\,ms$",
            "$\\tau_m=R_m C_m$",
            "$10\\,\\text{ms}$"
          ]
        },
        {
          "title": "Check physical meaning",
          "choices": [
            {
              "label": "Consistent with the stated relation"
            },
            {
              "label": "Opposite to the stated relation"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "A larger resistance or capacitance slows the approach to steady state."
          ]
        }
      ],
      "modelAnswer": [
        "$\\tau_m=200\\,M\\Omega\\times50\\,pF=10\\,ms$",
        "A larger resistance or capacitance slows the approach to steady state."
      ],
      "source": "passive",
      "points": 1
    },
    {
      "id": "L01-direct-charging",
      "sectionId": "passive",
      "type": "multiStepCalc",
      "difficulty": "easy",
      "prompt": "For $I=100\\,\\text{pA}$, $R=100\\,\\text{M}\\Omega$, $C=100\\,\\text{pF}$, find voltage change after $10\\,\\text{ms}$.",
      "hints": [
        {
          "body": "Use $\\Delta V(t)=IR_m(1-e^{-t/(R_mC_m)})$."
        },
        {
          "body": "Start with $\\Delta V(t)=IR_m(1-e^{-t/(R_mC_m)})$. Evaluate using the stated units, then check the sign."
        }
      ],
      "stages": [
        {
          "title": "Enter substitution quantities",
          "prompt": "Enter the quantities in the requested units. A bare number uses the displayed unit. For a stated SI constant, enter its numerical value.",
          "fields": [
            {
              "label": "Injected step current",
              "answer": {
                "value": 1e-10,
                "unit": "A",
                "tolerance": 1e-15,
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
                "tolerance": 1e-15,
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
              "label": "Elapsed time",
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
            "Use the given quantities after conversion to the requested units. No expression-string matching is required."
          ]
        },
        {
          "title": "Substitute and evaluate",
          "answer": {
            "value": 6.321205588,
            "unit": "mV",
            "tolerance": 0.031606027939999996,
            "verification": {
              "relation": "charging",
              "inputs": {
                "i": 1e-10,
                "r": 100000000.0,
                "c": 1e-10,
                "t": 0.01
              },
              "displayScale": 0.001
            }
          },
          "tex": "\\Delta V(t)=IR_m(1-e^{-t/(R_mC_m)})",
          "modelAnswer": [
            "$\\Delta V=10\\,mV(1-e^{-1})\\approx6.321\\,mV$",
            "$\\Delta V(t)=IR_m(1-e^{-t/(R_mC_m)})$",
            "$6.3212056\\,\\text{mV}$"
          ]
        },
        {
          "title": "Check physical meaning",
          "choices": [
            {
              "label": "Consistent with the stated relation"
            },
            {
              "label": "Opposite to the stated relation"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The response approaches a finite plateau rather than changing instantaneously."
          ]
        }
      ],
      "modelAnswer": [
        "$\\Delta V=10\\,mV(1-e^{-1})\\approx6.321\\,mV$",
        "The response approaches a finite plateau rather than changing instantaneously."
      ],
      "source": "passive",
      "points": 1
    },
    {
      "id": "L01-direct-corner",
      "sectionId": "filters",
      "type": "multiStepCalc",
      "difficulty": "easy",
      "prompt": "Find corner frequency for $\\tau=5\\,\\text{ms}$.",
      "hints": [
        {
          "body": "Use $f_0=\\frac{1}{2\\pi\\tau_m}$."
        },
        {
          "body": "Start with $f_0=\\frac{1}{2\\pi\\tau_m}$. Evaluate using the stated units, then check the sign."
        }
      ],
      "stages": [
        {
          "title": "Enter substitution quantities",
          "prompt": "Enter the quantities in the requested units. A bare number uses the displayed unit. For a stated SI constant, enter its numerical value.",
          "fields": [
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
            "Use the given quantities after conversion to the requested units. No expression-string matching is required."
          ]
        },
        {
          "title": "Substitute and evaluate",
          "answer": {
            "value": 31.83098862,
            "unit": "Hz",
            "tolerance": 0.1591549431,
            "verification": {
              "relation": "corner",
              "inputs": {
                "tau": 0.005
              },
              "displayScale": 1
            }
          },
          "tex": "f_0=\\frac{1}{2\\pi\\tau_m}",
          "modelAnswer": [
            "$f_0=\\frac1{2\\pi(0.005\\,s)}\\approx31.831\\,Hz$",
            "$f_0=\\frac{1}{2\\pi\\tau_m}$",
            "$31.830989\\,\\text{Hz}$"
          ]
        },
        {
          "title": "Check physical meaning",
          "choices": [
            {
              "label": "Consistent with the stated relation"
            },
            {
              "label": "Opposite to the stated relation"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "A slower membrane transmits rapid fluctuations less well."
          ]
        }
      ],
      "modelAnswer": [
        "$f_0=\\frac1{2\\pi(0.005\\,s)}\\approx31.831\\,Hz$",
        "A slower membrane transmits rapid fluctuations less well."
      ],
      "source": "filters",
      "points": 1
    },
    {
      "id": "L01-direct-frequency",
      "sectionId": "filters",
      "type": "multiStepCalc",
      "difficulty": "easy",
      "prompt": "A waveform repeats every $20\\,\\text{ms}$. Find frequency.",
      "hints": [
        {
          "body": "Use $f=1/T$."
        },
        {
          "body": "Start with $f=1/(0.020\\,s)$. Evaluate using the stated units, then check the sign."
        }
      ],
      "stages": [
        {
          "title": "Enter substitution quantities",
          "prompt": "Enter the quantities in the requested units. A bare number uses the displayed unit. For a stated SI constant, enter its numerical value.",
          "fields": [
            {
              "label": "Operand 1, in the displayed operation",
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
              "label": "Operand 2, in the displayed operation",
              "answer": {
                "value": 0.02,
                "unit": "",
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
            "Use the given quantities after conversion to the requested units. No expression-string matching is required."
          ]
        },
        {
          "title": "Substitute and evaluate",
          "answer": {
            "value": 50,
            "unit": "Hz",
            "tolerance": 0.25,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 1,
                "b": 0.02
              },
              "displayScale": 1
            }
          },
          "tex": "f=1/T",
          "modelAnswer": [
            "$f=1/(0.020\\,s)=50\\,Hz$",
            "$f=1/T$",
            "$50\\,\\text{Hz}$"
          ]
        },
        {
          "title": "Check physical meaning",
          "choices": [
            {
              "label": "Consistent with the stated relation"
            },
            {
              "label": "Opposite to the stated relation"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Shorter periods mean more cycles each second."
          ]
        }
      ],
      "modelAnswer": [
        "$f=1/(0.020\\,s)=50\\,Hz$",
        "Shorter periods mean more cycles each second."
      ],
      "source": "filters"
    },
    {
      "id": "L01-direct-series-r",
      "practice": "extra",
      "sectionId": "combinations",
      "type": "multiStepCalc",
      "difficulty": "easy",
      "prompt": "Evaluate $4\\,k\\Omega+5\\,k\\Omega$ for the series resistance.",
      "hints": [
        {
          "body": "Use $R_{total}=R_1+R_2$."
        },
        {
          "body": "Start with $R_{total}=4\\,k\\Omega+5\\,k\\Omega$. Evaluate using the stated units, then check the sign."
        }
      ],
      "stages": [
        {
          "title": "Enter substitution quantities",
          "prompt": "Enter the quantities in the requested units. A bare number uses the displayed unit. For a stated SI constant, enter its numerical value.",
          "fields": [
            {
              "label": "Operand 1, in the displayed operation",
              "answer": {
                "value": 4000,
                "unit": "",
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
            },
            {
              "label": "Operand 2, in the displayed operation",
              "answer": {
                "value": 5000,
                "unit": "",
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
            }
          ],
          "modelAnswer": [
            "Use the given quantities after conversion to the requested units. No expression-string matching is required."
          ]
        },
        {
          "title": "Substitute and evaluate",
          "answer": {
            "value": 9,
            "unit": "kohm",
            "tolerance": 0.045,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": 4000,
                "b": 5000
              },
              "displayScale": 1000
            }
          },
          "tex": "R_{total}=R_1+R_2",
          "modelAnswer": [
            "$R_{total}=4\\,k\\Omega+5\\,k\\Omega=9\\,k\\Omega$",
            "$R_{total}=R_1+R_2$",
            "$9\\,\\text{kohm}$"
          ]
        },
        {
          "title": "Check physical meaning",
          "choices": [
            {
              "label": "Consistent with the stated relation"
            },
            {
              "label": "Opposite to the stated relation"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Use the topology before choosing a sum or reciprocal sum."
          ]
        }
      ],
      "modelAnswer": [
        "$R_{total}=4\\,k\\Omega+5\\,k\\Omega=9\\,k\\Omega$",
        "Use the topology before choosing a sum or reciprocal sum."
      ],
      "source": "combinations",
      "points": 1
    },
    {
      "id": "L01-direct-parallel-r",
      "sectionId": "combinations",
      "type": "multiStepCalc",
      "difficulty": "easy",
      "prompt": "Evaluate $(1/4+1/12)^{-1}\\,k\\Omega$ for the parallel resistance.",
      "hints": [
        {
          "body": "Use $R_{total}^{-1}=R_1^{-1}+R_2^{-1}$."
        },
        {
          "body": "Start with $R_{total}=(1/4+1/12)^{-1}\\,k\\Omega$. Evaluate using the stated units, then check the sign."
        }
      ],
      "stages": [
        {
          "title": "Enter substitution quantities",
          "prompt": "Enter the quantities in the requested units. A bare number uses the displayed unit. For a stated SI constant, enter its numerical value.",
          "fields": [
            {
              "label": "Operand 1, in the displayed operation",
              "answer": {
                "value": 4000,
                "unit": "",
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
            },
            {
              "label": "Operand 2, in the displayed operation",
              "answer": {
                "value": 12000,
                "unit": "",
                "tolerance": 0.012,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 12000,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Use the given quantities after conversion to the requested units. No expression-string matching is required."
          ]
        },
        {
          "title": "Substitute and evaluate",
          "answer": {
            "value": 3,
            "unit": "kohm",
            "tolerance": 0.015,
            "verification": {
              "relation": "parallel",
              "inputs": {
                "a": 4000,
                "b": 12000
              },
              "displayScale": 1000
            }
          },
          "tex": "R_{total}^{-1}=R_1^{-1}+R_2^{-1}",
          "modelAnswer": [
            "$R_{total}=(1/4+1/12)^{-1}\\,k\\Omega=3\\,k\\Omega$",
            "$R_{total}^{-1}=R_1^{-1}+R_2^{-1}$",
            "$3\\,\\text{kohm}$"
          ]
        },
        {
          "title": "Check physical meaning",
          "choices": [
            {
              "label": "Consistent with the stated relation"
            },
            {
              "label": "Opposite to the stated relation"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Use the topology before choosing a sum or reciprocal sum."
          ]
        }
      ],
      "modelAnswer": [
        "$R_{total}=(1/4+1/12)^{-1}\\,k\\Omega=3\\,k\\Omega$",
        "Use the topology before choosing a sum or reciprocal sum."
      ],
      "source": "combinations",
      "points": 1
    },
    {
      "id": "L01-direct-parallel-c",
      "practice": "extra",
      "sectionId": "combinations",
      "type": "multiStepCalc",
      "difficulty": "easy",
      "prompt": "Evaluate $10\\,pF+20\\,pF$ for the parallel capacitance.",
      "hints": [
        {
          "body": "Use $C_{total}=C_1+C_2$."
        },
        {
          "body": "Start with $C_{total}=10\\,pF+20\\,pF$. Evaluate using the stated units, then check the sign."
        }
      ],
      "stages": [
        {
          "title": "Enter substitution quantities",
          "prompt": "Enter the quantities in the requested units. A bare number uses the displayed unit. For a stated SI constant, enter its numerical value.",
          "fields": [
            {
              "label": "Operand 1, in the displayed operation",
              "answer": {
                "value": 1e-11,
                "unit": "",
                "tolerance": 1e-15,
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
              "label": "Operand 2, in the displayed operation",
              "answer": {
                "value": 2e-11,
                "unit": "",
                "tolerance": 1e-15,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 2e-11,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Use the given quantities after conversion to the requested units. No expression-string matching is required."
          ]
        },
        {
          "title": "Substitute and evaluate",
          "answer": {
            "value": 30,
            "unit": "pF",
            "tolerance": 0.15,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": 1e-11,
                "b": 2e-11
              },
              "displayScale": 1e-12
            }
          },
          "tex": "C_{total}=C_1+C_2",
          "modelAnswer": [
            "$C_{total}=10\\,pF+20\\,pF=30\\,pF$",
            "$C_{total}=C_1+C_2$",
            "$30\\,\\text{pF}$"
          ]
        },
        {
          "title": "Check physical meaning",
          "choices": [
            {
              "label": "Consistent with the stated relation"
            },
            {
              "label": "Opposite to the stated relation"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Use the topology before choosing a sum or reciprocal sum."
          ]
        }
      ],
      "modelAnswer": [
        "$C_{total}=10\\,pF+20\\,pF=30\\,pF$",
        "Use the topology before choosing a sum or reciprocal sum."
      ],
      "source": "combinations",
      "points": 1
    },
    {
      "id": "L01-direct-series-c",
      "sectionId": "combinations",
      "type": "multiStepCalc",
      "difficulty": "easy",
      "prompt": "Evaluate $(1/10+1/15)^{-1}\\,pF$ for the series capacitance.",
      "hints": [
        {
          "body": "Use $C_{total}^{-1}=C_1^{-1}+C_2^{-1}$."
        },
        {
          "body": "Start with $C_{total}=(1/10+1/15)^{-1}\\,pF$. Evaluate using the stated units, then check the sign."
        }
      ],
      "stages": [
        {
          "title": "Enter substitution quantities",
          "prompt": "Enter the quantities in the requested units. A bare number uses the displayed unit. For a stated SI constant, enter its numerical value.",
          "fields": [
            {
              "label": "Operand 1, in the displayed operation",
              "answer": {
                "value": 1e-11,
                "unit": "",
                "tolerance": 1e-15,
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
              "label": "Operand 2, in the displayed operation",
              "answer": {
                "value": 1.5e-11,
                "unit": "",
                "tolerance": 1e-15,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1.5e-11,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Use the given quantities after conversion to the requested units. No expression-string matching is required."
          ]
        },
        {
          "title": "Substitute and evaluate",
          "answer": {
            "value": 6,
            "unit": "pF",
            "tolerance": 0.03,
            "verification": {
              "relation": "parallel",
              "inputs": {
                "a": 1e-11,
                "b": 1.5e-11
              },
              "displayScale": 1e-12
            }
          },
          "tex": "C_{total}^{-1}=C_1^{-1}+C_2^{-1}",
          "modelAnswer": [
            "$C_{total}=(1/10+1/15)^{-1}\\,pF=6\\,pF$",
            "$C_{total}^{-1}=C_1^{-1}+C_2^{-1}$",
            "$6\\,\\text{pF}$"
          ]
        },
        {
          "title": "Check physical meaning",
          "choices": [
            {
              "label": "Consistent with the stated relation"
            },
            {
              "label": "Opposite to the stated relation"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Use the topology before choosing a sum or reciprocal sum."
          ]
        }
      ],
      "modelAnswer": [
        "$C_{total}=(1/10+1/15)^{-1}\\,pF=6\\,pF$",
        "Use the topology before choosing a sum or reciprocal sum."
      ],
      "source": "combinations",
      "points": 1
    },
    {
      "id": "L01-direct-parallel-g",
      "sectionId": "combinations",
      "type": "multiStepCalc",
      "difficulty": "easy",
      "prompt": "Evaluate $5\\,nS+7\\,nS$ for the parallel conductance.",
      "hints": [
        {
          "body": "Use $G_{total}=G_1+G_2$."
        },
        {
          "body": "Start with $G_{total}=5\\,nS+7\\,nS$. Evaluate using the stated units, then check the sign."
        }
      ],
      "stages": [
        {
          "title": "Enter substitution quantities",
          "prompt": "Enter the quantities in the requested units. A bare number uses the displayed unit. For a stated SI constant, enter its numerical value.",
          "fields": [
            {
              "label": "Operand 1, in the displayed operation",
              "answer": {
                "value": 5e-09,
                "unit": "",
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
              "label": "Operand 2, in the displayed operation",
              "answer": {
                "value": 7e-09,
                "unit": "",
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
            "Use the given quantities after conversion to the requested units. No expression-string matching is required."
          ]
        },
        {
          "title": "Substitute and evaluate",
          "answer": {
            "value": 12,
            "unit": "nS",
            "tolerance": 0.06,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": 5e-09,
                "b": 7e-09
              },
              "displayScale": 1e-09
            }
          },
          "tex": "G_{total}=G_1+G_2",
          "modelAnswer": [
            "$G_{total}=5\\,nS+7\\,nS=12\\,nS$",
            "$G_{total}=G_1+G_2$",
            "$12\\,\\text{nS}$"
          ]
        },
        {
          "title": "Check physical meaning",
          "choices": [
            {
              "label": "Consistent with the stated relation"
            },
            {
              "label": "Opposite to the stated relation"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Use the topology before choosing a sum or reciprocal sum."
          ]
        }
      ],
      "modelAnswer": [
        "$G_{total}=5\\,nS+7\\,nS=12\\,nS$",
        "Use the topology before choosing a sum or reciprocal sum."
      ],
      "source": "combinations",
      "points": 1
    },
    {
      "id": "L01-direct-series-g",
      "practice": "extra",
      "sectionId": "combinations",
      "type": "multiStepCalc",
      "difficulty": "easy",
      "prompt": "Evaluate $(1/3+1/6)^{-1}\\,nS$ for the series conductance.",
      "hints": [
        {
          "body": "Use $G_{total}^{-1}=G_1^{-1}+G_2^{-1}$."
        },
        {
          "body": "Start with $G_{total}=(1/3+1/6)^{-1}\\,nS$. Evaluate using the stated units, then check the sign."
        }
      ],
      "stages": [
        {
          "title": "Enter substitution quantities",
          "prompt": "Enter the quantities in the requested units. A bare number uses the displayed unit. For a stated SI constant, enter its numerical value.",
          "fields": [
            {
              "label": "Operand 1, in the displayed operation",
              "answer": {
                "value": 3e-09,
                "unit": "",
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
              "label": "Operand 2, in the displayed operation",
              "answer": {
                "value": 6e-09,
                "unit": "",
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
            "Use the given quantities after conversion to the requested units. No expression-string matching is required."
          ]
        },
        {
          "title": "Substitute and evaluate",
          "answer": {
            "value": 2,
            "unit": "nS",
            "tolerance": 0.01,
            "verification": {
              "relation": "parallel",
              "inputs": {
                "a": 3e-09,
                "b": 6e-09
              },
              "displayScale": 1e-09
            }
          },
          "tex": "G_{total}^{-1}=G_1^{-1}+G_2^{-1}",
          "modelAnswer": [
            "$G_{total}=(1/3+1/6)^{-1}\\,nS=2\\,nS$",
            "$G_{total}^{-1}=G_1^{-1}+G_2^{-1}$",
            "$2\\,\\text{nS}$"
          ]
        },
        {
          "title": "Check physical meaning",
          "choices": [
            {
              "label": "Consistent with the stated relation"
            },
            {
              "label": "Opposite to the stated relation"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Use the topology before choosing a sum or reciprocal sum."
          ]
        }
      ],
      "modelAnswer": [
        "$G_{total}=(1/3+1/6)^{-1}\\,nS=2\\,nS$",
        "Use the topology before choosing a sum or reciprocal sum."
      ],
      "source": "combinations",
      "points": 1
    },
    {
      "id": "L01-direct-node",
      "practice": "extra",
      "sectionId": "combinations",
      "type": "multiStepCalc",
      "difficulty": "easy",
      "prompt": "At a node, two incoming currents are $3\\,\\text{nA}$ and $4\\,\\text{nA}$. Find total outgoing current magnitude.",
      "hints": [
        {
          "body": "Use $\\sum I=0$."
        },
        {
          "body": "Start with $I_{out}=3\\,nA+4\\,nA$. Evaluate using the stated units, then check the sign."
        }
      ],
      "stages": [
        {
          "title": "Enter substitution quantities",
          "prompt": "Enter the quantities in the requested units. A bare number uses the displayed unit. For a stated SI constant, enter its numerical value.",
          "fields": [
            {
              "label": "Operand 1, in the displayed operation",
              "answer": {
                "value": 3e-09,
                "unit": "",
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
              "label": "Operand 2, in the displayed operation",
              "answer": {
                "value": 4e-09,
                "unit": "",
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
            "Use the given quantities after conversion to the requested units. No expression-string matching is required."
          ]
        },
        {
          "title": "Substitute and evaluate",
          "answer": {
            "value": 7,
            "unit": "nA",
            "tolerance": 0.035,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": 3e-09,
                "b": 4e-09
              },
              "displayScale": 1e-09
            }
          },
          "tex": "\\sum I=0",
          "modelAnswer": [
            "$I_{out}=3\\,nA+4\\,nA=7\\,nA$",
            "$\\sum I=0$",
            "$7\\,\\text{nA}$"
          ]
        },
        {
          "title": "Check physical meaning",
          "choices": [
            {
              "label": "Consistent with the stated relation"
            },
            {
              "label": "Opposite to the stated relation"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Charge is conserved at a circuit junction."
          ]
        }
      ],
      "modelAnswer": [
        "$I_{out}=3\\,nA+4\\,nA=7\\,nA$",
        "Charge is conserved at a circuit junction."
      ],
      "source": "combinations"
    },
    {
      "id": "L01-direct-loop",
      "sectionId": "combinations",
      "type": "multiStepCalc",
      "difficulty": "easy",
      "prompt": "A loop has a source rise $12\\,\\text{mV}$ and one drop $5\\,\\text{mV}$. Find the remaining drop magnitude.",
      "hints": [
        {
          "body": "Use $\\sum \\Delta V=0$."
        },
        {
          "body": "Start with $\\Delta V_{remaining}=12\\,mV-5\\,mV$. Evaluate using the stated units, then check the sign."
        }
      ],
      "stages": [
        {
          "title": "Enter substitution quantities",
          "prompt": "Enter the quantities in the requested units. A bare number uses the displayed unit. For a stated SI constant, enter its numerical value.",
          "fields": [
            {
              "label": "Operand 1, in the displayed operation",
              "answer": {
                "value": 0.012,
                "unit": "",
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
              "label": "Operand 2, in the displayed operation",
              "answer": {
                "value": -0.005,
                "unit": "",
                "tolerance": 5e-09,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -0.005,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Use the given quantities after conversion to the requested units. No expression-string matching is required."
          ]
        },
        {
          "title": "Substitute and evaluate",
          "answer": {
            "value": 7,
            "unit": "mV",
            "tolerance": 0.035,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": 0.012,
                "b": -0.005
              },
              "displayScale": 0.001
            }
          },
          "tex": "\\sum \\Delta V=0",
          "modelAnswer": [
            "$\\Delta V_{remaining}=12\\,mV-5\\,mV=7\\,mV$",
            "$\\sum \\Delta V=0$",
            "$7\\,\\text{mV}$"
          ]
        },
        {
          "title": "Check physical meaning",
          "choices": [
            {
              "label": "Consistent with the stated relation"
            },
            {
              "label": "Opposite to the stated relation"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Returning to the same point gives zero total potential change."
          ]
        }
      ],
      "modelAnswer": [
        "$\\Delta V_{remaining}=12\\,mV-5\\,mV=7\\,mV$",
        "Returning to the same point gives zero total potential change."
      ],
      "source": "combinations"
    },
    {
      "id": "L01-direct-series-v",
      "practice": "extra",
      "sectionId": "combinations",
      "type": "multiStepCalc",
      "difficulty": "easy",
      "prompt": "Two series drops are $2\\,\\text{mV}$ and $6\\,\\text{mV}$. Find the total.",
      "hints": [
        {
          "body": "Use $V_{total}=V_1+V_2$."
        },
        {
          "body": "Start with $V_{total}=2\\,mV+6\\,mV$. Evaluate using the stated units, then check the sign."
        }
      ],
      "stages": [
        {
          "title": "Enter substitution quantities",
          "prompt": "Enter the quantities in the requested units. A bare number uses the displayed unit. For a stated SI constant, enter its numerical value.",
          "fields": [
            {
              "label": "Operand 1, in the displayed operation",
              "answer": {
                "value": 0.002,
                "unit": "",
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
              "label": "Operand 2, in the displayed operation",
              "answer": {
                "value": 0.006,
                "unit": "",
                "tolerance": 6e-09,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.006,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Use the given quantities after conversion to the requested units. No expression-string matching is required."
          ]
        },
        {
          "title": "Substitute and evaluate",
          "answer": {
            "value": 8,
            "unit": "mV",
            "tolerance": 0.04,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": 0.002,
                "b": 0.006
              },
              "displayScale": 0.001
            }
          },
          "tex": "V_{total}=V_1+V_2",
          "modelAnswer": [
            "$V_{total}=2\\,mV+6\\,mV=8\\,mV$",
            "$V_{total}=V_1+V_2$",
            "$8\\,\\text{mV}$"
          ]
        },
        {
          "title": "Check physical meaning",
          "choices": [
            {
              "label": "Consistent with the stated relation"
            },
            {
              "label": "Opposite to the stated relation"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Series voltage drops add along a path."
          ]
        }
      ],
      "modelAnswer": [
        "$V_{total}=2\\,mV+6\\,mV=8\\,mV$",
        "Series voltage drops add along a path."
      ],
      "source": "combinations"
    },
    {
      "id": "L01-direct-parallel-i",
      "practice": "extra",
      "sectionId": "combinations",
      "type": "multiStepCalc",
      "difficulty": "easy",
      "prompt": "Two parallel branches carry $20\\,\\text{pA}$ and $30\\,\\text{pA}$. Find total current.",
      "hints": [
        {
          "body": "Use $I_{total}=I_1+I_2$."
        },
        {
          "body": "Start with $I_{total}=20\\,pA+30\\,pA$. Evaluate using the stated units, then check the sign."
        }
      ],
      "stages": [
        {
          "title": "Enter substitution quantities",
          "prompt": "Enter the quantities in the requested units. A bare number uses the displayed unit. For a stated SI constant, enter its numerical value.",
          "fields": [
            {
              "label": "Operand 1, in the displayed operation",
              "answer": {
                "value": 2e-11,
                "unit": "",
                "tolerance": 1e-15,
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
              "label": "Operand 2, in the displayed operation",
              "answer": {
                "value": 3e-11,
                "unit": "",
                "tolerance": 1e-15,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 3e-11,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Use the given quantities after conversion to the requested units. No expression-string matching is required."
          ]
        },
        {
          "title": "Substitute and evaluate",
          "answer": {
            "value": 50,
            "unit": "pA",
            "tolerance": 0.25,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": 2e-11,
                "b": 3e-11
              },
              "displayScale": 1e-12
            }
          },
          "tex": "I_{total}=I_1+I_2",
          "modelAnswer": [
            "$I_{total}=20\\,pA+30\\,pA=50\\,pA$",
            "$I_{total}=I_1+I_2$",
            "$50\\,\\text{pA}$"
          ]
        },
        {
          "title": "Check physical meaning",
          "choices": [
            {
              "label": "Consistent with the stated relation"
            },
            {
              "label": "Opposite to the stated relation"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Parallel branch currents add to the source current."
          ]
        }
      ],
      "modelAnswer": [
        "$I_{total}=20\\,pA+30\\,pA=50\\,pA$",
        "Parallel branch currents add to the source current."
      ],
      "source": "combinations"
    },
    {
      "id": "L01-direct-fick",
      "sectionId": "movement",
      "type": "multiStepCalc",
      "difficulty": "easy",
      "prompt": "For $D=10^{-9}\\,\\text{m}^2/\\text{s}$ and $\\partial C/\\partial x=2\\times10^4\\,\\text{mol}/\\text{m}^4$, find flux density.",
      "hints": [
        {
          "body": "Use $J_{diff}=-D\\frac{\\partial C}{\\partial x}$."
        },
        {
          "body": "Start with $J=-10^{-9}(2\\times10^4)$. Evaluate using the stated units, then check the sign."
        }
      ],
      "stages": [
        {
          "title": "Enter substitution quantities",
          "prompt": "Enter the quantities in the requested units. A bare number uses the displayed unit. For a stated SI constant, enter its numerical value.",
          "fields": [
            {
              "label": "Diffusion coefficient",
              "answer": {
                "value": 1e-09,
                "unit": "m2/s",
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
              "label": "Concentration gradient",
              "answer": {
                "value": 20000.0,
                "unit": "mol/m4",
                "tolerance": 0.02,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 20000.0,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Use the given quantities after conversion to the requested units. No expression-string matching is required."
          ]
        },
        {
          "title": "Substitute and evaluate",
          "answer": {
            "value": -2e-05,
            "unit": "mol/m2/s",
            "tolerance": 1e-07,
            "verification": {
              "relation": "diffusion",
              "inputs": {
                "d": 1e-09,
                "gradient": 20000.0
              },
              "displayScale": 1
            }
          },
          "tex": "J_{diff}=-D\\frac{\\partial C}{\\partial x}",
          "modelAnswer": [
            "$J=-10^{-9}(2\\times10^4)=-2\\times10^{-5}\\,mol/(m^2s)$",
            "$J_{diff}=-D\\frac{\\partial C}{\\partial x}$",
            "$-2e-05\\,\\text{mol/m2/s}$"
          ]
        },
        {
          "title": "Check physical meaning",
          "choices": [
            {
              "label": "Consistent with the stated relation"
            },
            {
              "label": "Opposite to the stated relation"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Net diffusion points toward lower concentration."
          ]
        }
      ],
      "modelAnswer": [
        "$J=-10^{-9}(2\\times10^4)=-2\\times10^{-5}\\,mol/(m^2s)$",
        "Net diffusion points toward lower concentration."
      ],
      "source": "movement",
      "points": 1
    },
    {
      "id": "L01-direct-drift",
      "sectionId": "movement",
      "type": "multiStepCalc",
      "difficulty": "easy",
      "prompt": "For $u=4\\times10^{-8}\\,\\text{m}^2/(\\text{V s})$, $z=+1$, $C=100\\,\\text{mol}/\\text{m}^3$, and potential gradient $2\\,\\text{V/m}$, find drift flux.",
      "hints": [
        {
          "body": "Use $J_{drift}=-uzC\\frac{\\partial V}{\\partial x}$."
        },
        {
          "body": "Start with $J=-4\\times10^{-8}(1)(100)(2)$. Evaluate using the stated units, then check the sign."
        }
      ],
      "stages": [
        {
          "title": "Enter substitution quantities",
          "prompt": "Enter the quantities in the requested units. A bare number uses the displayed unit. For a stated SI constant, enter its numerical value.",
          "fields": [
            {
              "label": "Mobility",
              "answer": {
                "value": 4e-08,
                "unit": "m2/V/s",
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
              "label": "Signed valence",
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
              "label": "Molar concentration",
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
            },
            {
              "label": "Potential gradient",
              "answer": {
                "value": 2,
                "unit": "V/m",
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
            "Use the given quantities after conversion to the requested units. No expression-string matching is required."
          ]
        },
        {
          "title": "Substitute and evaluate",
          "answer": {
            "value": -8e-06,
            "unit": "mol/m2/s",
            "tolerance": 1e-08,
            "verification": {
              "relation": "drift",
              "inputs": {
                "mobility": 4e-08,
                "z": 1,
                "concentration": 100,
                "field": 2
              },
              "displayScale": 1
            }
          },
          "tex": "J_{drift}=-uzC\\frac{\\partial V}{\\partial x}",
          "modelAnswer": [
            "$J=-4\\times10^{-8}(1)(100)(2)=-8\\times10^{-6}\\,mol/(m^2s)$",
            "$J_{drift}=-uzC\\frac{\\partial V}{\\partial x}$",
            "$-8e-06\\,\\text{mol/m2/s}$"
          ]
        },
        {
          "title": "Check physical meaning",
          "choices": [
            {
              "label": "Consistent with the stated relation"
            },
            {
              "label": "Opposite to the stated relation"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Electric drift reverses direction when ion valence reverses."
          ]
        }
      ],
      "modelAnswer": [
        "$J=-4\\times10^{-8}(1)(100)(2)=-8\\times10^{-6}\\,mol/(m^2s)$",
        "Electric drift reverses direction when ion valence reverses."
      ],
      "source": "movement",
      "points": 1
    },
    {
      "id": "L01-direct-einstein",
      "sectionId": "movement",
      "type": "multiStepCalc",
      "difficulty": "easy",
      "prompt": "Use $u=4\\times10^{-8}\\,\\text{m}^2/(\\text{V s})$, $R=8.314$, $T=293\\,\\text{K}$ and $F=96500$ in SI. Find $D$.",
      "hints": [
        {
          "body": "Use $D=uRT/F$."
        },
        {
          "body": "Start with $D=uRT/F$. Evaluate using the stated units, then check the sign."
        }
      ],
      "stages": [
        {
          "title": "Enter substitution quantities",
          "prompt": "Enter the quantities in the requested units. A bare number uses the displayed unit. For a stated SI constant, enter its numerical value.",
          "fields": [
            {
              "label": "Mobility",
              "answer": {
                "value": 4e-08,
                "unit": "m2/V/s",
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
              "label": "Gas constant",
              "answer": {
                "value": 8.314,
                "unit": "J/mol/K",
                "tolerance": 8.314e-06,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 8.314,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Absolute temperature",
              "answer": {
                "value": 293,
                "unit": "K",
                "tolerance": 0.00029299999999999997,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 293,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Faraday constant",
              "answer": {
                "value": 96500,
                "unit": "C/mol",
                "tolerance": 0.0965,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 96500,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Use the given quantities after conversion to the requested units. No expression-string matching is required."
          ]
        },
        {
          "title": "Substitute and evaluate",
          "answer": {
            "value": 1.009741761658031e-09,
            "unit": "m2/s",
            "tolerance": 1e-12,
            "verification": {
              "relation": "einstein",
              "inputs": {
                "mobility": 4e-08,
                "r": 8.314,
                "temperature": 293,
                "f": 96500
              },
              "displayScale": 1
            }
          },
          "tex": "D=uRT/F",
          "modelAnswer": [
            "$D=\\frac{(4\\times10^{-8})(8.314)(293)}{96500}\\approx1.0097\\times10^{-9}\\,m^2/s$",
            "$D=uRT/F$",
            "$1.0097418e-09\\,\\text{m2/s}$"
          ]
        },
        {
          "title": "Check physical meaning",
          "choices": [
            {
              "label": "Consistent with the stated relation"
            },
            {
              "label": "Opposite to the stated relation"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Thermal diffusion and electrical mobility are linked at a given temperature."
          ]
        }
      ],
      "modelAnswer": [
        "$D=\\frac{(4\\times10^{-8})(8.314)(293)}{96500}\\approx1.0097\\times10^{-9}\\,m^2/s$",
        "Thermal diffusion and electrical mobility are linked at a given temperature."
      ],
      "source": "movement",
      "points": 1
    },
    {
      "id": "L01-direct-np",
      "sectionId": "equilibrium",
      "type": "multiStepCalc",
      "difficulty": "easy",
      "prompt": "Use $u=4\\times10^{-8}$, $R=8.314$, $T=293$, $F=96500$, $z=1$, $C=100$, $\\partial C/\\partial x=20000$, $\\partial V/\\partial x=2$ in SI. Find $J$.",
      "hints": [
        {
          "body": "Use $J=-u\\left(\\frac{RT}{F}\\frac{\\partial C}{\\partial x}+zC\\frac{\\partial V}{\\partial x}\\right)$."
        },
        {
          "body": "Start with $J=-u\\left(\\frac{RT}{F}\\frac{\\partial C}{\\partial x}+zC\\frac{\\partial V}{\\partial x}\\right)$. Evaluate using the stated units, then check the sign."
        }
      ],
      "stages": [
        {
          "title": "Enter substitution quantities",
          "prompt": "Enter the quantities in the requested units. A bare number uses the displayed unit. For a stated SI constant, enter its numerical value.",
          "fields": [
            {
              "label": "Mobility",
              "answer": {
                "value": 4e-08,
                "unit": "m2/V/s",
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
              "label": "Gas constant",
              "answer": {
                "value": 8.314,
                "unit": "J/mol/K",
                "tolerance": 8.314e-06,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 8.314,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Absolute temperature",
              "answer": {
                "value": 293,
                "unit": "K",
                "tolerance": 0.00029299999999999997,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 293,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Faraday constant",
              "answer": {
                "value": 96500,
                "unit": "C/mol",
                "tolerance": 0.0965,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 96500,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Signed valence",
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
              "label": "Molar concentration",
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
            },
            {
              "label": "Concentration gradient",
              "answer": {
                "value": 20000,
                "unit": "mol/m4",
                "tolerance": 0.02,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 20000,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Potential gradient",
              "answer": {
                "value": 2,
                "unit": "V/m",
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
            "Use the given quantities after conversion to the requested units. No expression-string matching is required."
          ]
        },
        {
          "title": "Substitute and evaluate",
          "answer": {
            "value": -2.819483523316062e-05,
            "unit": "mol/m2/s",
            "tolerance": 1e-07,
            "verification": {
              "relation": "electrodiffusion",
              "inputs": {
                "mobility": 4e-08,
                "r": 8.314,
                "temperature": 293,
                "f": 96500,
                "z": 1,
                "concentration": 100,
                "gradient": 20000,
                "field": 2
              },
              "displayScale": 1
            }
          },
          "tex": "J=-u\\left(\\frac{RT}{F}\\frac{\\partial C}{\\partial x}+zC\\frac{\\partial V}{\\partial x}\\right)",
          "modelAnswer": [
            "$J=-4\\times10^{-8}\\left(\\frac{8.314(293)}{96500}(20000)+200\\right)\\approx-2.8194\\times10^{-5}\\,mol/(m^2s)$",
            "$J=-u\\left(\\frac{RT}{F}\\frac{\\partial C}{\\partial x}+zC\\frac{\\partial V}{\\partial x}\\right)$",
            "$-2.8194835e-05\\,\\text{mol/m2/s}$"
          ]
        },
        {
          "title": "Check physical meaning",
          "choices": [
            {
              "label": "Consistent with the stated relation"
            },
            {
              "label": "Opposite to the stated relation"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Net movement combines chemical and electrical gradients."
          ]
        }
      ],
      "modelAnswer": [
        "$J=-4\\times10^{-8}\\left(\\frac{8.314(293)}{96500}(20000)+200\\right)\\approx-2.8194\\times10^{-5}\\,mol/(m^2s)$",
        "Net movement combines chemical and electrical gradients."
      ],
      "source": "equilibrium",
      "points": 1
    },
    {
      "id": "L01-direct-flux-current",
      "sectionId": "equilibrium",
      "type": "multiStepCalc",
      "difficulty": "easy",
      "prompt": "For outward chloride flux $J=10^{-6}\\,\\text{mol}/(\\text{m}^2\\text{s})$, $z=-1$ and $F=96485\\,\\text{C/mol}$, find outward current density.",
      "hints": [
        {
          "body": "Use $j=JzF$."
        },
        {
          "body": "Start with $j=10^{-6}(-1)(96485)$. Evaluate using the stated units, then check the sign."
        }
      ],
      "stages": [
        {
          "title": "Enter substitution quantities",
          "prompt": "Enter the quantities in the requested units. A bare number uses the displayed unit. For a stated SI constant, enter its numerical value.",
          "fields": [
            {
              "label": "Flux density",
              "answer": {
                "value": 1e-06,
                "unit": "mol/m2/s",
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
              "label": "Signed valence",
              "answer": {
                "value": -1,
                "unit": "",
                "tolerance": 1e-06,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -1,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Faraday constant",
              "answer": {
                "value": 96485,
                "unit": "C/mol",
                "tolerance": 0.096485,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 96485,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Use the given quantities after conversion to the requested units. No expression-string matching is required."
          ]
        },
        {
          "title": "Substitute and evaluate",
          "answer": {
            "value": -0.096485,
            "unit": "A/m2",
            "tolerance": 0.00048242500000000003,
            "verification": {
              "relation": "fluxCurrent",
              "inputs": {
                "flux": 1e-06,
                "z": -1,
                "f": 96485
              },
              "displayScale": 1
            }
          },
          "tex": "j=JzF",
          "modelAnswer": [
            "$j=10^{-6}(-1)(96485)=-0.096485\\,A/m^2$",
            "$j=JzF$",
            "$-0.096485\\,\\text{A/m2}$"
          ]
        },
        {
          "title": "Check physical meaning",
          "choices": [
            {
              "label": "Consistent with the stated relation"
            },
            {
              "label": "Opposite to the stated relation"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Anions reverse the relation between particle flux and conventional current."
          ]
        }
      ],
      "modelAnswer": [
        "$j=10^{-6}(-1)(96485)=-0.096485\\,A/m^2$",
        "Anions reverse the relation between particle flux and conventional current."
      ],
      "source": "equilibrium",
      "points": 1
    },
    {
      "id": "L01-direct-nernst",
      "sectionId": "equilibrium",
      "type": "multiStepCalc",
      "difficulty": "easy",
      "prompt": "Use the course $20\\,^{\\circ}\\text{C}$ shortcut $58\\,\\text{mV}$, $z=+1$, outside $10\\,\\text{mM}$ and inside $100\\,\\text{mM}$. Find $E$.",
      "hints": [
        {
          "body": "Use $E=\\frac{RT}{zF}\\ln\\frac{C_{out}}{C_{in}}$."
        },
        {
          "body": "Start with $E=58\\,mV\\log_{10}(10/100)$. Evaluate using the stated units, then check the sign."
        }
      ],
      "stages": [
        {
          "title": "Enter substitution quantities",
          "prompt": "Enter the quantities in the requested units. A bare number uses the displayed unit. For a stated SI constant, enter its numerical value.",
          "fields": [
            {
              "label": "Nernst shortcut",
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
              "label": "Signed valence",
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
              "label": "Outside concentration",
              "answer": {
                "value": 10,
                "unit": "mM",
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
              "label": "Inside concentration",
              "answer": {
                "value": 100,
                "unit": "mM",
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
            "Use the given quantities after conversion to the requested units. No expression-string matching is required."
          ]
        },
        {
          "title": "Substitute and evaluate",
          "answer": {
            "value": -58,
            "unit": "mV",
            "tolerance": 0.29,
            "verification": {
              "relation": "nernst",
              "inputs": {
                "shortcut": 0.058,
                "z": 1,
                "outside": 10,
                "inside": 100
              },
              "displayScale": 0.001
            }
          },
          "tex": "E=\\frac{RT}{zF}\\ln\\frac{C_{out}}{C_{in}}",
          "modelAnswer": [
            "$E=58\\,mV\\log_{10}(10/100)=-58\\,mV$",
            "$E=\\frac{RT}{zF}\\ln\\frac{C_{out}}{C_{in}}$",
            "$-58\\,\\text{mV}$"
          ]
        },
        {
          "title": "Check physical meaning",
          "choices": [
            {
              "label": "Consistent with the stated relation"
            },
            {
              "label": "Opposite to the stated relation"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The concentration ratio, temperature and valence set one-ion equilibrium voltage."
          ]
        }
      ],
      "modelAnswer": [
        "$E=58\\,mV\\log_{10}(10/100)=-58\\,mV$",
        "The concentration ratio, temperature and valence set one-ion equilibrium voltage."
      ],
      "source": "equilibrium",
      "points": 1
    },
    {
      "id": "L01-ion-signs",
      "sectionId": "ion-patterns",
      "type": "trueFalse",
      "difficulty": "easy",
      "prompt": "Judge each statement. Correct every false statement in one line.",
      "hints": [
        {
          "body": "Combine the ratio with signed valence."
        },
        {
          "body": "For chloride check valence before inferring voltage sign."
        }
      ],
      "modelAnswer": [
        "Potassium is usually higher inside and has negative equilibrium potential.",
        "Sodium and calcium are higher outside and have positive equilibrium potentials.",
        "Chloride is usually higher outside but its negative valence makes its equilibrium potential negative.",
        "Zero net flux means balanced opposing fluxes, not stopped microscopic movement."
      ],
      "source": "ion-patterns",
      "points": 1,
      "statements": [
        {
          "text": "Potassium is usually higher inside and has a negative equilibrium potential.",
          "answer": true
        },
        {
          "text": "Sodium and calcium are usually higher outside and have positive equilibrium potentials.",
          "answer": true
        },
        {
          "text": "Chloride is usually higher outside and therefore has a positive equilibrium potential.",
          "answer": false,
          "correction": "Its negative valence makes its typical equilibrium potential negative."
        },
        {
          "text": "Zero net ion flux means that individual ions stop crossing.",
          "answer": false,
          "correction": "Opposing microscopic ion fluxes balance, while individual crossings continue."
        }
      ]
    },
    {
      "id": "L01-transport-recall",
      "sectionId": "transport",
      "type": "trueFalse",
      "difficulty": "easy",
      "prompt": "Judge each statement. Correct every false statement in one line.",
      "hints": [
        {
          "body": "Classify by energy source."
        },
        {
          "body": "Do not classify all gradient-maintaining mechanisms as ATPases."
        }
      ],
      "modelAnswer": [
        "Primary active pumps use ATP directly; sodium/potassium ATPase and calcium ATPase are examples.",
        "Secondary exchangers and cotransporters use stored ion-gradient energy, including sodium/calcium exchange and sodium/potassium/chloride cotransport.",
        "Passive channels use electrochemical gradients and selective permeability; they do not hydrolyse ATP for each crossing."
      ],
      "source": "transport",
      "points": 1,
      "statements": [
        {
          "text": "The calcium ATPase is primary active transport.",
          "answer": true
        },
        {
          "text": "The sodium/calcium exchanger and sodium/potassium/chloride cotransporter both require direct ATP hydrolysis for each transport event.",
          "answer": false,
          "correction": "These are secondary active transport examples, powered by an ion gradient."
        },
        {
          "text": "Passive channel movement requires no ATP hydrolysis for each crossing.",
          "answer": true
        },
        {
          "text": "Passive membrane pathways are typically more permeable to potassium and chloride than to sodium and calcium in the lecture overview.",
          "answer": true
        }
      ]
    },
    {
      "id": "L01-direct-neutrality",
      "sectionId": "neutrality",
      "type": "multiStepCalc",
      "difficulty": "easy",
      "prompt": "A bulk solution contains $3\\,\\text{mM}$ of a divalent cation as its only cation. Find the monovalent anion concentration needed for neutrality.",
      "hints": [
        {
          "body": "Use $\\sum_i z_i^+[C_i]=\\sum_j |z_j^-|[A_j]$."
        },
        {
          "body": "Start with $[A^-]=2(3\\,mM)$. Evaluate using the stated units, then check the sign."
        }
      ],
      "stages": [
        {
          "title": "Enter substitution quantities",
          "prompt": "Enter the quantities in the requested units. A bare number uses the displayed unit. For a stated SI constant, enter its numerical value.",
          "fields": [
            {
              "label": "Operand 1, in the displayed operation",
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
            },
            {
              "label": "Operand 2, in the displayed operation",
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
            }
          ],
          "modelAnswer": [
            "Use the given quantities after conversion to the requested units. No expression-string matching is required."
          ]
        },
        {
          "title": "Substitute and evaluate",
          "answer": {
            "value": 6,
            "unit": "mM",
            "tolerance": 0.03,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 3,
                "b": 2
              },
              "displayScale": 1
            }
          },
          "tex": "\\sum_i z_i^+[C_i]=\\sum_j |z_j^-|[A_j]",
          "modelAnswer": [
            "$[A^-]=2(3\\,mM)=6\\,mM$",
            "$\\sum_i z_i^+[C_i]=\\sum_j |z_j^-|[A_j]$",
            "$6\\,\\text{mM}$"
          ]
        },
        {
          "title": "Check physical meaning",
          "choices": [
            {
              "label": "Consistent with the stated relation"
            },
            {
              "label": "Opposite to the stated relation"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Electroneutrality balances charge equivalents, not merely particle counts."
          ]
        }
      ],
      "modelAnswer": [
        "$[A^-]=2(3\\,mM)=6\\,mM$",
        "Electroneutrality balances charge equivalents, not merely particle counts."
      ],
      "source": "neutrality",
      "points": 1
    },
    {
      "id": "L01-direct-donnan",
      "sectionId": "donnan",
      "type": "multiStepCalc",
      "difficulty": "easy",
      "prompt": "At constrained equilibrium, inside potassium is $90\\,\\text{mM}$ and chloride is $40\\,\\text{mM}$. Outside potassium is $60\\,\\text{mM}$. Find outside chloride.",
      "hints": [
        {
          "body": "Use $[K^+]_{in}[Cl^-]_{in}=[K^+]_{out}[Cl^-]_{out}$."
        },
        {
          "body": "Start with $[Cl^-]_{out}=90(40)/60\\,mM$. Evaluate using the stated units, then check the sign."
        }
      ],
      "stages": [
        {
          "title": "Enter substitution quantities",
          "prompt": "Enter the quantities in the requested units. A bare number uses the displayed unit. For a stated SI constant, enter its numerical value.",
          "fields": [
            {
              "label": "Operand 1, in the displayed operation",
              "answer": {
                "value": 3600,
                "unit": "",
                "tolerance": 0.0036,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 3600,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Operand 2, in the displayed operation",
              "answer": {
                "value": 60,
                "unit": "",
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
            "Use the given quantities after conversion to the requested units. No expression-string matching is required."
          ]
        },
        {
          "title": "Substitute and evaluate",
          "answer": {
            "value": 60,
            "unit": "mM",
            "tolerance": 0.3,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 3600,
                "b": 60
              },
              "displayScale": 1
            }
          },
          "tex": "[K^+]_{in}[Cl^-]_{in}=[K^+]_{out}[Cl^-]_{out}",
          "modelAnswer": [
            "$[Cl^-]_{out}=90(40)/60\\,mM=60\\,mM$",
            "$[K^+]_{in}[Cl^-]_{in}=[K^+]_{out}[Cl^-]_{out}$",
            "$60\\,\\text{mM}$"
          ]
        },
        {
          "title": "Check physical meaning",
          "choices": [
            {
              "label": "Consistent with the stated relation"
            },
            {
              "label": "Opposite to the stated relation"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Both permeant ions must share the same equilibrium voltage."
          ]
        }
      ],
      "modelAnswer": [
        "$[Cl^-]_{out}=90(40)/60\\,mM=60\\,mM$",
        "Both permeant ions must share the same equilibrium voltage."
      ],
      "source": "donnan",
      "points": 1
    },
    {
      "id": "L01-core-feedback",
      "practice": "extra",
      "sectionId": "signals",
      "type": "mc",
      "difficulty": "easy",
      "prompt": "What does feedback minimize during voltage clamp?",
      "options": [
        {
          "text": "The measured current minus the holding current",
          "feedback": "Injected current changes as needed to control voltage."
        },
        {
          "text": "The command voltage minus the measured voltage",
          "feedback": "The amplifier adjusts its output to reduce this voltage error."
        },
        {
          "text": "The membrane voltage minus the ion equilibrium voltage",
          "feedback": "The equilibrium voltage sets ionic driving force."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Identify the variable controlled in voltage clamp."
        },
        {
          "body": "Compare its measured value with its target."
        }
      ],
      "modelAnswer": [
        "The amplifier adjusts its output to reduce this voltage error."
      ]
    },
    {
      "id": "L01-core-access",
      "sectionId": "apparatus",
      "type": "mc",
      "difficulty": "easy",
      "prompt": "Which patch configuration gives electrical access while limiting washout of cytoplasm?",
      "options": [
        {
          "text": "Inside-out, with the inner membrane face exposed",
          "feedback": "An excised patch exposes its cytoplasmic face to bath solution."
        },
        {
          "text": "Whole-cell, with the sealed membrane patch ruptured",
          "feedback": "Rupture allows the pipette solution to exchange with the cell interior."
        },
        {
          "text": "Perforated patch, with ion-conducting pores in the patch",
          "feedback": "Pores provide electrical access and restrict exchange of larger intracellular components."
        }
      ],
      "correct": 2,
      "hints": [
        {
          "body": "Separate access through a patch from access through its complete rupture."
        },
        {
          "body": "Look for a pathway that passes small ions while retaining larger components."
        }
      ],
      "modelAnswer": [
        "Pores provide electrical access and restrict exchange of larger intracellular components."
      ]
    },
    {
      "id": "L01-core-ohmic-path",
      "practice": "extra",
      "sectionId": "resistance",
      "type": "mc",
      "difficulty": "easy",
      "prompt": "What additional quantity lets you infer current from voltage drop across a linear resistor?",
      "options": [
        {
          "text": "The resistance of the measured path",
          "feedback": "Divide the voltage drop by that path’s resistance."
        },
        {
          "text": "The capacitance of a neighboring path",
          "feedback": "A neighboring branch capacitance cannot set the measured resistor’s current."
        },
        {
          "text": "The duration of the applied voltage",
          "feedback": "A steady ohmic current follows voltage divided by resistance at any duration."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Identify the relation between voltage drop and current."
        },
        {
          "body": "Rearrange Ohm’s law to make current the subject."
        }
      ],
      "modelAnswer": [
        "Divide the voltage drop by that path’s resistance."
      ]
    },
    {
      "id": "L01-core-corner",
      "sectionId": "filters",
      "type": "mc",
      "difficulty": "easy",
      "prompt": "At the same input amplitude, which frequency does a first-order low-pass pass with the greatest output amplitude?",
      "options": [
        {
          "text": "A frequency far above the corner",
          "feedback": "This frequency is strongly attenuated."
        },
        {
          "text": "A frequency right at the corner",
          "feedback": "The gain at the corner is about 0.707 of the low-frequency gain."
        },
        {
          "text": "A frequency far below the corner",
          "feedback": "Gain is close to the low-frequency plateau."
        }
      ],
      "correct": 2,
      "hints": [
        {
          "body": "Recall which frequencies name the passband."
        },
        {
          "body": "Compare each frequency to the corner."
        }
      ],
      "modelAnswer": [
        "Gain is close to the low-frequency plateau."
      ]
    },
    {
      "id": "L01-core-loop",
      "sectionId": "combinations",
      "type": "mc",
      "difficulty": "easy",
      "prompt": "Which sum must be zero around a closed circuit loop?",
      "options": [
        {
          "text": "The signed currents through successive elements",
          "feedback": "Signed currents sum to zero at a node."
        },
        {
          "text": "The signed voltage changes along the loop",
          "feedback": "A full circuit of the loop returns to the same potential."
        },
        {
          "text": "The signed charges on one side of each capacitor",
          "feedback": "Loop closure constrains potentials, not stored capacitor charge."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Think about returning to your starting point."
        },
        {
          "body": "Track potential rises and drops with the same traversal direction."
        }
      ],
      "modelAnswer": [
        "A full circuit of the loop returns to the same potential."
      ]
    },
    {
      "id": "L01-scale-limits",
      "sectionId": "cells",
      "type": "written",
      "difficulty": "medium",
      "prompt": "An extracellular organ recording changes after a treatment. Explain why this alone does not identify a single altered ion channel.",
      "hints": [
        {
          "body": "Separate recording scale from mechanism."
        },
        {
          "body": "Compare the number of contributing cells and the signal each method resolves."
        }
      ],
      "modelAnswer": [
        "The organ trace combines activity beyond one cell or channel.",
        "Cellular or single-channel recordings provide a more specific electrical readout.",
        "Choose the measurement scale to match the proposed cellular mechanism."
      ],
      "markScheme": [
        {
          "text": "The organ trace combines activity beyond one cell or channel."
        },
        {
          "text": "Cellular or single-channel recordings provide a more specific electrical readout."
        },
        {
          "text": "Choose the measurement scale to match the proposed cellular mechanism."
        }
      ],
      "source": "cells",
      "points": 1
    },
    {
      "id": "L01-signals-compare",
      "sectionId": "signals",
      "type": "written",
      "difficulty": "medium",
      "prompt": "Compare chemical signals with ionic electrical current, selective permeability with gating, and passive spread with active spread.",
      "hints": [
        {
          "body": "Use the three contrasts on slide 13."
        },
        {
          "body": "Give one sentence per contrast without importing later cable or Hodgkin-Huxley equations."
        }
      ],
      "modelAnswer": [
        "Chemical signals include chemical synaptic communication; ionic electrical current is movement of charge.",
        "Selectivity concerns which ions pass; gating concerns whether a channel conducts.",
        "Passive spread is described by linear cable ideas; active spread involves nonlinear voltage- and time-dependent properties."
      ],
      "markScheme": [
        {
          "text": "Chemical signals include chemical synaptic communication; ionic electrical current is movement of charge."
        },
        {
          "text": "Selectivity concerns which ions pass; gating concerns whether a channel conducts."
        },
        {
          "text": "Passive spread is described by linear cable ideas; active spread involves nonlinear voltage- and time-dependent properties."
        }
      ],
      "source": "signals",
      "points": 1
    },
    {
      "id": "L01-seal",
      "sectionId": "apparatus",
      "type": "written",
      "difficulty": "medium",
      "prompt": "Explain why an incomplete patch seal compromises the inference that pipette current crossed the isolated patch. Contrast this with the suction-electrode photoreceptor measurement.",
      "hints": [
        {
          "body": "Follow the current path."
        },
        {
          "body": "Describe the bypass before comparing the signal measured by each electrode."
        }
      ],
      "modelAnswer": [
        "The seal should force pipette current through the isolated membrane patch.",
        "A leak allows a bypass, so pipette current need not represent only patch current.",
        "The suction-electrode example measures changes in extracellular photoreceptor current rather than identifying an individual patch channel."
      ],
      "markScheme": [
        {
          "text": "The seal should force pipette current through the isolated membrane patch."
        },
        {
          "text": "A leak allows a bypass, so pipette current need not represent only patch current."
        },
        {
          "text": "The suction-electrode example measures changes in extracellular photoreceptor current rather than identifying an individual patch channel."
        }
      ],
      "source": "apparatus",
      "points": 1
    },
    {
      "id": "L01-ohm-method",
      "sectionId": "resistance",
      "type": "written",
      "difficulty": "medium",
      "prompt": "Explain how an extracellular IR-drop measurement relates electrode voltage to current. What assumption is needed to infer current from voltage? Distinguish resistance from impedance in time-varying circuits.",
      "hints": [
        {
          "body": "Use the extracellular diagram on slide 21."
        },
        {
          "body": "Name the resistance between electrodes, then rearrange Ohm law."
        }
      ],
      "modelAnswer": [
        "The fluid between recording points provides a resistance.",
        "Current flowing through that resistance produces a potential difference by Ohm law.",
        "The relevant resistance and a consistent reference direction must be known; voltage alone is not current.",
        "Resistance describes the resistive component; impedance describes opposition to time-varying current including capacitive effects."
      ],
      "markScheme": [
        {
          "text": "The fluid between recording points provides a resistance."
        },
        {
          "text": "Current flowing through that resistance produces a potential difference by Ohm law."
        },
        {
          "text": "The relevant resistance and a consistent reference direction must be known; voltage alone is not current."
        },
        {
          "text": "Resistance describes the resistive component; impedance describes opposition to time-varying current including capacitive effects."
        }
      ],
      "source": "resistance",
      "points": 1
    },
    {
      "id": "L01-divider-design",
      "sectionId": "divider",
      "type": "multiStepCalc",
      "difficulty": "medium",
      "prompt": "Design an unloaded attenuator: $V_{in}=3\\,\\text{V}$, desired $V_{out}=0.3\\,\\text{V}$, lower resistor $R_2=2\\,\\text{k}\\Omega$. Find upper resistance and verify the attenuation.",
      "hints": [
        {
          "body": "Use the unloaded divider relation."
        },
        {
          "body": "Start with $R_1=2000\\,\\Omega(3/0.3-1)$, then verify the output."
        }
      ],
      "stages": [
        {
          "title": "Rearrange",
          "choices": [
            {
              "label": "R1 = R2 (Vin/Vout - 1)"
            },
            {
              "label": "R1 = R2 (Vout/Vin - 1)"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Solve the divider equation for the upper resistor."
          ]
        },
        {
          "title": "Voltage ratio",
          "answer": {
            "value": 10,
            "unit": "",
            "tolerance": 0.05,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 3,
                "b": 0.3
              },
              "displayScale": 1
            }
          },
          "tex": "V_{in}/V_{out}=3/0.3",
          "modelAnswer": [
            "Divide input by desired output.",
            "$V_{in}/V_{out}=3/0.3$",
            "$10$"
          ]
        },
        {
          "title": "Upper resistance",
          "answer": {
            "value": 18,
            "unit": "kohm",
            "tolerance": 0.09,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 2000,
                "b": 9
              },
              "displayScale": 1000
            }
          },
          "tex": "R_1=R_2(V_{in}/V_{out}-1)",
          "modelAnswer": [
            "The upper resistor is nine times the lower resistor.",
            "$R_1=R_2(V_{in}/V_{out}-1)$",
            "$18\\,\\text{kohm}$"
          ]
        },
        {
          "title": "Verify output",
          "answer": {
            "value": 0.3,
            "unit": "V",
            "tolerance": 0.0015,
            "verification": {
              "relation": "divider",
              "inputs": {
                "v": 3,
                "r1": 18000,
                "r2": 2000
              },
              "displayScale": 1
            }
          },
          "tex": "V_{out}=V_{in}R_2/(R_1+R_2)",
          "modelAnswer": [
            "The output is smaller than the source and agrees with the target.",
            "$V_{out}=V_{in}R_2/(R_1+R_2)$",
            "$0.3\\,\\text{V}$"
          ]
        }
      ],
      "modelAnswer": [
        "Solve the divider equation for the upper resistor.",
        "Divide input by desired output.",
        "The upper resistor is nine times the lower resistor.",
        "The output is smaller than the source and agrees with the target."
      ],
      "source": "divider",
      "points": 1
    },
    {
      "id": "L01-ramp-inference",
      "sectionId": "capacitance",
      "type": "multiStepCalc",
      "difficulty": "medium",
      "prompt": "A linear membrane ramp changes inside-minus-outside voltage by $-20\\,\\text{mV}$ in $4\\,\\text{ms}$. The isolated capacitive current is $-150\\,\\text{pA}$. Infer capacitance and charge change.",
      "hints": [
        {
          "body": "Use capacitive current and charge storage."
        },
        {
          "body": "Start with slope $(-0.020\\,V)/(0.004\\,s)$, infer capacitance, then multiply by voltage change."
        }
      ],
      "stages": [
        {
          "title": "Voltage slope",
          "answer": {
            "value": -5,
            "unit": "",
            "tolerance": 0.025,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": -0.02,
                "b": 0.004
              },
              "displayScale": 1
            }
          },
          "tex": "dV/dt=\\Delta V/\\Delta t",
          "modelAnswer": [
            "Enter the SI slope in volts per second as a bare number.",
            "$dV/dt=\\Delta V/\\Delta t$",
            "$-5$"
          ]
        },
        {
          "title": "Capacitance",
          "answer": {
            "value": 30,
            "unit": "pF",
            "tolerance": 0.15,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": -1.5e-10,
                "b": -5
              },
              "displayScale": 1e-12
            }
          },
          "tex": "C=I_C/(dV/dt)",
          "modelAnswer": [
            "Both current and slope are negative, so capacitance is positive.",
            "$C=I_C/(dV/dt)$",
            "$30\\,\\text{pF}$"
          ]
        },
        {
          "title": "Charge change",
          "answer": {
            "value": -0.6,
            "unit": "pC",
            "tolerance": 0.003,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 3e-11,
                "b": -0.02
              },
              "displayScale": 1e-12
            }
          },
          "tex": "\\Delta q=C\\Delta V",
          "modelAnswer": [
            "Inner plate charge decreases.",
            "$\\Delta q=C\\Delta V$",
            "$-0.6\\,\\text{pC}$"
          ]
        }
      ],
      "modelAnswer": [
        "Enter the SI slope in volts per second as a bare number.",
        "Both current and slope are negative, so capacitance is positive.",
        "Inner plate charge decreases."
      ],
      "source": "capacitance",
      "points": 1
    },
    {
      "id": "L01-rc-measure",
      "sectionId": "passive",
      "type": "multiStepCalc",
      "difficulty": "medium",
      "prompt": "An illustrative passive isopotential-cell measurement uses injected current $80\\,\\text{pA}$, plateau voltage change $12\\,\\text{mV}$ and fitted time constant $6\\,\\text{ms}$. Infer input resistance, total capacitance and corner frequency. These are specified practice data, not readings from a source trace.",
      "hints": [
        {
          "body": "Use plateau Ohm law, time constant and corner frequency."
        },
        {
          "body": "Start with $R=0.012\\,V/(80\\times10^{-12}\\,A)$, then use $C=\\tau/R$ and the corner relation."
        }
      ],
      "stages": [
        {
          "title": "Input resistance",
          "answer": {
            "value": 150,
            "unit": "Mohm",
            "tolerance": 0.75,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 0.012,
                "b": 8e-11
              },
              "displayScale": 1000000.0
            }
          },
          "tex": "R=\\Delta V_{steady}/I",
          "modelAnswer": [
            "Use the plateau, not a transient voltage.",
            "$R=\\Delta V_{steady}/I$",
            "$150\\,\\text{Mohm}$"
          ]
        },
        {
          "title": "Capacitance",
          "answer": {
            "value": 40,
            "unit": "pF",
            "tolerance": 0.2,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 0.006,
                "b": 150000000.0
              },
              "displayScale": 1e-12
            }
          },
          "tex": "C=\\tau/R",
          "modelAnswer": [
            "Use the correct resistance even if your preceding answer differed.",
            "$C=\\tau/R$",
            "$40\\,\\text{pF}$"
          ]
        },
        {
          "title": "Corner frequency",
          "answer": {
            "value": 26.52582385,
            "unit": "Hz",
            "tolerance": 0.13262911924999998,
            "verification": {
              "relation": "corner",
              "inputs": {
                "tau": 0.006
              },
              "displayScale": 1
            }
          },
          "tex": "f_0=1/(2\\pi\\tau)",
          "modelAnswer": [
            "A finite time constant implies finite bandwidth.",
            "$f_0=1/(2\\pi\\tau)$",
            "$26.525824\\,\\text{Hz}$"
          ]
        }
      ],
      "modelAnswer": [
        "Use the plateau, not a transient voltage.",
        "Use the correct resistance even if your preceding answer differed.",
        "A finite time constant implies finite bandwidth."
      ],
      "source": "passive",
      "points": 1
    },
    {
      "id": "L01-filters-compare",
      "sectionId": "filters",
      "type": "written",
      "difficulty": "medium",
      "prompt": "Compare the low-pass and high-pass source circuits and predict the effect of increasing membrane time constant on a square-pulse response.",
      "hints": [
        {
          "body": "Read the circuit output nodes and the slide 26 response sequence."
        },
        {
          "body": "Treat a square pulse as a signal with rapid changes; do not assume a sharp corner-frequency cutoff."
        }
      ],
      "modelAnswer": [
        "The low-pass circuit reads output across the capacitor; the high-pass circuit reads across the resistor.",
        "Low-pass retains slow components; high-pass suppresses slow components.",
        "A larger membrane time constant rounds and delays the response more, reducing fidelity to rapid edges."
      ],
      "markScheme": [
        {
          "text": "The low-pass circuit reads output across the capacitor; the high-pass circuit reads across the resistor."
        },
        {
          "text": "Low-pass retains slow components; high-pass suppresses slow components."
        },
        {
          "text": "A larger membrane time constant rounds and delays the response more, reducing fidelity to rapid edges."
        }
      ],
      "source": "filters",
      "points": 1
    },
    {
      "id": "L01-kirchhoff",
      "sectionId": "combinations",
      "type": "written",
      "difficulty": "medium",
      "prompt": "State the signed node and loop laws. For series and parallel connections, give the voltage and current rules and explain why one cannot add parallel voltage drops as if they were in series.",
      "hints": [
        {
          "body": "Use node conservation and a closed loop."
        },
        {
          "body": "Choose reference arrows first, then distinguish shared quantities from added quantities."
        }
      ],
      "modelAnswer": [
        "Signed currents at a node sum to zero, expressing charge conservation.",
        "Signed potential changes around a closed loop sum to zero.",
        "Series: equal current and summed voltage; parallel: equal voltage and summed current.",
        "Parallel branches span the same nodes, so summing their voltage drops would count the same potential difference repeatedly."
      ],
      "markScheme": [
        {
          "text": "Signed currents at a node sum to zero, expressing charge conservation."
        },
        {
          "text": "Signed potential changes around a closed loop sum to zero."
        },
        {
          "text": "Series: equal current and summed voltage; parallel: equal voltage and summed current."
        },
        {
          "text": "Parallel branches span the same nodes, so summing their voltage drops would count the same potential difference repeatedly."
        }
      ],
      "source": "combinations",
      "points": 1
    },
    {
      "id": "L01-nernst-divalent",
      "sectionId": "equilibrium",
      "type": "multiStepCalc",
      "difficulty": "medium",
      "prompt": "At $37\\,^{\\circ}\\text{C}$, a divalent cation has outside concentration $2\\,\\text{mM}$ and inside $0.002\\,\\text{mM}$. Use the supplied $61.5\\,\\text{mV}$ shortcut. Find ratio, equilibrium potential and its sign.",
      "hints": [
        {
          "body": "Use Nernst with the stated temperature and valence."
        },
        {
          "body": "Begin with outside/inside $=2/0.002$, then take the logarithm and divide the shortcut by two."
        }
      ],
      "stages": [
        {
          "title": "Concentration ratio",
          "answer": {
            "value": 1000,
            "unit": "",
            "tolerance": 5.0,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 2,
                "b": 0.002
              },
              "displayScale": 1
            }
          },
          "tex": "C_{out}/C_{in}",
          "modelAnswer": [
            "Both concentrations already use the same unit.",
            "$C_{out}/C_{in}$",
            "$1000$"
          ]
        },
        {
          "title": "Equilibrium potential",
          "answer": {
            "value": 92.25,
            "unit": "mV",
            "tolerance": 0.46125,
            "verification": {
              "relation": "nernst",
              "inputs": {
                "shortcut": 0.0615,
                "z": 2,
                "outside": 2,
                "inside": 0.002
              },
              "displayScale": 0.001
            }
          },
          "tex": "E=(61.5\\,mV/2)\\log_{10}(C_{out}/C_{in})",
          "modelAnswer": [
            "Divide the shortcut by valence.",
            "$E=(61.5\\,mV/2)\\log_{10}(C_{out}/C_{in})$",
            "$92.25\\,\\text{mV}$"
          ]
        },
        {
          "title": "Sign check",
          "choices": [
            {
              "label": "Positive inside at equilibrium"
            },
            {
              "label": "Negative inside at equilibrium"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The positive cation needs positive inside voltage to balance its inward concentration tendency."
          ]
        }
      ],
      "modelAnswer": [
        "Both concentrations already use the same unit.",
        "Divide the shortcut by valence.",
        "The positive cation needs positive inside voltage to balance its inward concentration tendency."
      ],
      "source": "equilibrium",
      "points": 1
    },
    {
      "id": "L01-movement-predict",
      "sectionId": "ion-patterns",
      "type": "predict",
      "difficulty": "medium",
      "prompt": "A potassium-selective membrane is held more positive than its potassium equilibrium potential. Predict potassium particle movement and conventional current. Repeat for a negative ion held more positive than its own equilibrium potential.",
      "hints": [
        {
          "body": "Use slide 33 direction reasoning and the outward-positive convention."
        },
        {
          "body": "Separate particle direction from conventional-current direction."
        }
      ],
      "modelAnswer": [
        "Potassium flows outward and carries positive outward current.",
        "For a negative ion at voltage above its equilibrium potential, particles move inward, still producing positive outward current.",
        "At the equilibrium potential the net flux of that ion is zero."
      ],
      "markScheme": [
        {
          "text": "Potassium flows outward and carries positive outward current."
        },
        {
          "text": "For a negative ion at voltage above its equilibrium potential, particles move inward, still producing positive outward current."
        },
        {
          "text": "At the equilibrium potential the net flux of that ion is zero."
        }
      ],
      "source": "ion-patterns",
      "points": 1
    },
    {
      "id": "L01-pump",
      "sectionId": "transport",
      "type": "written",
      "difficulty": "medium",
      "prompt": "Explain how the sodium/potassium ATPase maintains gradients despite leak. State its exchange stoichiometry and whether the transport is electrically neutral.",
      "hints": [
        {
          "body": "Use the supported sodium/potassium example on slide 35."
        },
        {
          "body": "Compare the outward and inward transported positive charges."
        }
      ],
      "modelAnswer": [
        "The pump moves three sodium ions out and two potassium ions in per ATP.",
        "This supports gradients that passive leakage tends to dissipate.",
        "One net positive charge leaves per cycle, so the transport is electrogenic.",
        "Pump-supported maintained gradients are not global thermodynamic equilibrium."
      ],
      "markScheme": [
        {
          "text": "The pump moves three sodium ions out and two potassium ions in per ATP."
        },
        {
          "text": "This supports gradients that passive leakage tends to dissipate."
        },
        {
          "text": "One net positive charge leaves per cycle, so the transport is electrogenic."
        },
        {
          "text": "Pump-supported maintained gradients are not global thermodynamic equilibrium."
        }
      ],
      "source": "transport",
      "points": 1
    },
    {
      "id": "L01-neutrality-explain",
      "sectionId": "neutrality",
      "type": "written",
      "difficulty": "medium",
      "prompt": "Explain how a cell can have a negative membrane potential while its bulk intracellular and extracellular fluids are approximately electroneutral.",
      "hints": [
        {
          "body": "Separate membrane boundary layers from bulk solution."
        },
        {
          "body": "Connect the capacitor model to the scope of the neutrality approximation."
        }
      ],
      "modelAnswer": [
        "Only a small boundary charge separation is needed at the insulating membrane.",
        "Bulk cation and anion charge remains approximately balanced on each side.",
        "Membrane voltage concerns charge separation and capacitance, not a large unbalanced bulk charge."
      ],
      "markScheme": [
        {
          "text": "Only a small boundary charge separation is needed at the insulating membrane."
        },
        {
          "text": "Bulk cation and anion charge remains approximately balanced on each side."
        },
        {
          "text": "Membrane voltage concerns charge separation and capacitance, not a large unbalanced bulk charge."
        }
      ],
      "source": "neutrality",
      "points": 1
    },
    {
      "id": "L01-donnan-general",
      "sectionId": "donnan",
      "type": "derive",
      "difficulty": "medium",
      "prompt": "Explain how the general-valence Donnan ratio follows by equating Nernst voltages for a cation of valence $+m$ and an anion of valence $-n$. State when the monovalent product shortcut is valid.",
      "hints": [
        {
          "body": "Use the signed valence in each Nernst relation."
        },
        {
          "body": "Move the anion minus sign into an inverted ratio before exponentiating."
        }
      ],
      "modelAnswer": [
        "Equal equilibrium voltage gives $\\ln(C_{out}/C_{in})/m=\\ln(A_{in}/A_{out})/n$.",
        "Exponentiation gives the valence-weighted ratio relation in the recap.",
        "The simple product shortcut applies to a monovalent cation and monovalent anion; it must accompany charge balance and conservation."
      ],
      "markScheme": [
        {
          "text": "Equal equilibrium voltage gives $\\ln(C_{out}/C_{in})/m=\\ln(A_{in}/A_{out})/n$."
        },
        {
          "text": "Exponentiation gives the valence-weighted ratio relation in the recap."
        },
        {
          "text": "The simple product shortcut applies to a monovalent cation and monovalent anion; it must accompany charge balance and conservation."
        }
      ],
      "source": "donnan",
      "points": 1
    },
    {
      "id": "L01-rebalance-clamp-loop",
      "type": "mc",
      "difficulty": "medium",
      "sectionId": "signals",
      "source": "L01 PDF p14; Axon Guide Ch. 3, pp57–67; official exam pp1, 3",
      "prompt": "Synthetic practice scenario. In a voltage-clamp circuit, a small command step raises the target above the measured cell voltage. What is the operational amplifier doing during the correction?",
      "correct": 0,
      "options": [
        {
          "text": "Its transistor stages amplify the voltage error and drive the cell toward the target.",
          "feedback": "The amplifier responds to the measured difference. Negative feedback pushes the voltage toward the command."
        },
        {
          "text": "Its transistor stages amplify the voltage error and drive the cell away from the target.",
          "feedback": "Driving the cell farther from the command would increase the error and defeat negative feedback."
        },
        {
          "text": "Its transistor stages amplify the recorded current and keep the corrective drive fixed.",
          "feedback": "The error is a voltage difference. The drive changes as needed to keep the measured voltage near the command."
        }
      ],
      "hints": [
        {
          "body": "Identify the quantity compared with the command."
        },
        {
          "body": "Check which direction of correction makes the error smaller."
        }
      ],
      "modelAnswer": [
        "The semiconductor stages amplify the command-minus-measured voltage error. The feedback loop adjusts current to reduce that error and the correction changes as the cell approaches the command."
      ]
    },
    {
      "id": "L01-core-seal-bypass",
      "sectionId": "apparatus",
      "type": "mc",
      "difficulty": "medium",
      "prompt": "A patch pipette shifts and its seal resistance falls. Why is a channel current estimate now less reliable?",
      "options": [
        {
          "text": "More pipette current can bypass the patch",
          "feedback": "A poorer seal opens a parallel leakage path."
        },
        {
          "text": "More pipette current must cross the patch",
          "feedback": "Lower seal resistance increases leakage around the patch."
        },
        {
          "text": "The pipette now measures the cell’s voltage",
          "feedback": "A leaky seal alone does not switch the recording mode."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "The seal is a resistance separating pipette and bath."
        },
        {
          "body": "Think of the leak as a parallel current path."
        }
      ],
      "modelAnswer": [
        "A poorer seal opens a parallel leakage path."
      ]
    },
    {
      "id": "L01-core-divider-load",
      "practice": "extra",
      "sectionId": "divider",
      "type": "mc",
      "difficulty": "medium",
      "prompt": "A meter with input resistance equal to $R_2$ is connected across the lower resistor. What happens to the divider output?",
      "options": [
        {
          "text": "It rises because the lower resistance doubles",
          "feedback": "The meter is in parallel, so lower-leg resistance falls."
        },
        {
          "text": "It stays fixed because the input voltage is fixed",
          "feedback": "The voltage fraction also depends on the lower leg’s effective resistance."
        },
        {
          "text": "It falls because the lower resistance halves",
          "feedback": "Two equal resistances in parallel give half the original lower-leg resistance."
        }
      ],
      "correct": 2,
      "hints": [
        {
          "body": "Identify which two components share both terminals."
        },
        {
          "body": "Insert their parallel equivalent in place of the lower resistance."
        }
      ],
      "modelAnswer": [
        "Two equal resistances in parallel give half the original lower-leg resistance."
      ]
    },
    {
      "id": "L01-core-negative-ramp",
      "sectionId": "passive",
      "type": "mc",
      "difficulty": "medium",
      "prompt": "A clamp ramp changes $V_m$ from $-50$ to $-60\\,\\mathrm{mV}$ at constant slope. What is the sign of the isolated capacitive current?",
      "options": [
        {
          "text": "Positive throughout the ramp",
          "feedback": "Positive capacitance multiplied by a negative slope gives a negative current."
        },
        {
          "text": "Negative throughout the ramp",
          "feedback": "The slope is negative, so the capacitive current is negative."
        },
        {
          "text": "Zero throughout the ramp",
          "feedback": "Zero capacitive current requires a flat voltage."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Use $I_C=C\\,dV_m/dt$."
        },
        {
          "body": "The sign follows the slope during the ramp."
        }
      ],
      "modelAnswer": [
        "The slope is negative, so the capacitive current is negative."
      ]
    },
    {
      "id": "L01-core-chloride-current",
      "sectionId": "ion-patterns",
      "type": "mc",
      "difficulty": "medium",
      "prompt": "In a chloride-selective membrane, $V_m$ is held above $E_{\\mathrm{Cl}}$. What are the directions of chloride movement and conventional current?",
      "options": [
        {
          "text": "Chloride inward, current outward",
          "feedback": "Positive driving voltage produces outward conventional current, which chloride carries by moving inward."
        },
        {
          "text": "Chloride outward, current inward",
          "feedback": "The two directions oppose each other, but positive driving voltage sets outward current."
        },
        {
          "text": "Chloride inward, current inward",
          "feedback": "A negative ion crossing inward carries outward conventional current."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Start with the sign of $V_m-E_{\\mathrm{Cl}}$."
        },
        {
          "body": "Conventional current points in the opposite direction to anion movement."
        }
      ],
      "modelAnswer": [
        "Positive driving voltage produces outward conventional current, which chloride carries by moving inward."
      ]
    },
    {
      "id": "L01-core-nernst-valence",
      "sectionId": "equilibrium",
      "type": "mc",
      "difficulty": "medium",
      "prompt": "At $20\\,^{\\circ}\\mathrm{C}$ an anion has $z=-1$ and an outside concentration ten times its inside concentration. What is its equilibrium potential?",
      "options": [
        {
          "text": "$+58\\,\\mathrm{mV}$",
          "feedback": "The concentration ratio gives a positive logarithm, but the valence is negative."
        },
        {
          "text": "$-58\\,\\mathrm{mV}$",
          "feedback": "The base-ten logarithm is 1 and the signed valence is −1."
        },
        {
          "text": "$-5.8\\,\\mathrm{mV}$",
          "feedback": "The formula multiplies by the logarithm of the concentration ratio, rather than dividing by the ratio."
        }
      ],
      "correct": 1,
      "hints": [
        {
          "body": "Use the course shortcut with $C_{\\mathrm{out}}/C_{\\mathrm{in}}$."
        },
        {
          "body": "Take the base-ten logarithm first, then apply signed valence."
        }
      ],
      "modelAnswer": [
        "The base-ten logarithm is 1 and the signed valence is −1."
      ]
    },
    {
      "id": "L01-core-donnan-osmosis",
      "sectionId": "donnan",
      "type": "mc",
      "difficulty": "medium",
      "prompt": "At fixed-volume Donnan equilibrium, the inside has more total solute particles per volume after impermeant ions are included. Which way does water initially move if the volume constraint is released at equal hydrostatic pressure?",
      "options": [
        {
          "text": "Into the compartment with more particles",
          "feedback": "Water moves toward the higher total particle concentration at equal hydrostatic pressure."
        },
        {
          "text": "Out of the compartment with more particles",
          "feedback": "This direction would further concentrate the side that already has more particles per volume."
        },
        {
          "text": "Neither way because ion flux is zero",
          "feedback": "Zero net flux for the permeant ions does not establish zero net water flux."
        }
      ],
      "correct": 0,
      "hints": [
        {
          "body": "Compare total particle concentrations after redistribution."
        },
        {
          "body": "Separate ionic electrochemical equilibrium from osmotic equilibrium."
        }
      ],
      "modelAnswer": [
        "Water moves toward the higher total particle concentration at equal hydrostatic pressure."
      ]
    },
    {
      "id": "L01-safety",
      "sectionId": "applications",
      "type": "written",
      "difficulty": "hard",
      "prompt": "A candidate compound changes a cellular current. Design a basic sequence of electrical readouts to distinguish intended functional action from an organ-level safety concern. State what the first recording cannot establish.",
      "hints": [
        {
          "body": "Use slides 10–12, without inventing pharmacological targets."
        },
        {
          "body": "Start at the cellular readout, then choose the matching organ readout and state its limitation."
        }
      ],
      "modelAnswer": [
        "Record the intended cellular electrical effect rather than assuming binding proves function.",
        "Consider altered excitability and off-target risks such as arrhythmia or seizure risk.",
        "Use the relevant organ-level readout, such as cardiac recording, to test the safety concern.",
        "A cellular current change alone does not prove safe organ function or establish every molecular mechanism."
      ],
      "markScheme": [
        {
          "text": "Record the intended cellular electrical effect rather than assuming binding proves function."
        },
        {
          "text": "Consider altered excitability and off-target risks such as arrhythmia or seizure risk."
        },
        {
          "text": "Use the relevant organ-level readout, such as cardiac recording, to test the safety concern."
        },
        {
          "text": "A cellular current change alone does not prove safe organ function or establish every molecular mechanism."
        }
      ],
      "source": "applications",
      "points": 1
    },
    {
      "id": "L01-methods-traces",
      "sectionId": "signals",
      "type": "written",
      "difficulty": "hard",
      "prompt": "Use the source recording examples to propose a basic test of whether a changed response is cellular voltage or channel current. Choose a recording mode, explain the readout and two apparatus controls, and state what the trace alone cannot identify.",
      "hints": [
        {
          "body": "Separate the measured quantity from the recording scale."
        },
        {
          "body": "Choose the mode first, then identify a signal and controls grounded in slides 14–16."
        }
      ],
      "modelAnswer": [
        "Use current clamp for intracellular voltage or voltage clamp for current, chosen to match the hypothesis.",
        "A single-channel current record differs in scale from whole-cell or field activity.",
        "Use electrical shielding and vibration isolation to reduce electrical and mechanical contamination.",
        "A response waveform alone does not uniquely identify a molecular channel or prove the absence of recording artifacts."
      ],
      "markScheme": [
        {
          "text": "Use current clamp for intracellular voltage or voltage clamp for current, chosen to match the hypothesis."
        },
        {
          "text": "A single-channel current record differs in scale from whole-cell or field activity."
        },
        {
          "text": "Use electrical shielding and vibration isolation to reduce electrical and mechanical contamination."
        },
        {
          "text": "A response waveform alone does not uniquely identify a molecular channel or prove the absence of recording artifacts."
        }
      ],
      "source": "signals",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "Slide 14 source recordings. Preserve axes; qualitative comparison only, no graph values inferred.",
        "fallbackAlt": "Slide 14 source recordings. Preserve axes; qualitative comparison only, no graph values inferred.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L01/recordings.webp', import.meta.url).href,
          "alt": "Slide 14 source recordings. Preserve axes; qualitative comparison only, no graph values inferred.",
          "aspect": 0.6937669376693767,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      },
      "points": 1
    },
    {
      "id": "L01-channels-inverse",
      "sectionId": "resistance",
      "type": "multiStepCalc",
      "difficulty": "hard",
      "prompt": "A membrane patch has an ohmic current of $120\\,\\text{pA}$ for a $10\\,\\text{mV}$ drop. One parallel pathway contributes $4\\,\\text{nS}$. Infer the conductance of the other pathway, total resistance, then voltage needed to carry $60\\,\\text{pA}$. Treat this as a resistor circuit without ionic batteries.",
      "hints": [
        {
          "body": "Select reciprocal and parallel relations before applying Ohm law."
        },
        {
          "body": "Infer $G_{total}=120\\,pA/(10\\,mV)$, subtract the known branch, then find resistance and the new voltage."
        }
      ],
      "stages": [
        {
          "title": "Total conductance",
          "answer": {
            "value": 12,
            "unit": "nS",
            "tolerance": 0.06,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 1.2e-10,
                "b": 0.01
              },
              "displayScale": 1e-09
            }
          },
          "tex": "G_{total}=I/\\Delta V",
          "modelAnswer": [
            "Infer total conductance from the measured current and voltage.",
            "$G_{total}=I/\\Delta V$",
            "$12\\,\\text{nS}$"
          ]
        },
        {
          "title": "Unknown pathway",
          "answer": {
            "value": 8,
            "unit": "nS",
            "tolerance": 0.04,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": 1.2e-08,
                "b": -4e-09
              },
              "displayScale": 1e-09
            }
          },
          "tex": "G_2=G_{total}-G_1",
          "modelAnswer": [
            "Parallel conductances add.",
            "$G_2=G_{total}-G_1$",
            "$8\\,\\text{nS}$"
          ]
        },
        {
          "title": "Total resistance",
          "answer": {
            "value": 83.3333333,
            "unit": "Mohm",
            "tolerance": 0.41666666650000006,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 1,
                "b": 1.2e-08
              },
              "displayScale": 1000000.0
            }
          },
          "tex": "R_{total}=1/G_{total}",
          "modelAnswer": [
            "Do not add parallel resistances.",
            "$R_{total}=1/G_{total}$",
            "$83.333333\\,\\text{Mohm}$"
          ]
        },
        {
          "title": "New voltage",
          "answer": {
            "value": 5,
            "unit": "mV",
            "tolerance": 0.025,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 6e-11,
                "b": 1.2e-08
              },
              "displayScale": 0.001
            }
          },
          "tex": "\\Delta V=I/G_{total}",
          "modelAnswer": [
            "Half the current requires half the voltage for the same linear circuit.",
            "$\\Delta V=I/G_{total}$",
            "$5\\,\\text{mV}$"
          ]
        }
      ],
      "modelAnswer": [
        "Infer total conductance from the measured current and voltage.",
        "Parallel conductances add.",
        "Do not add parallel resistances.",
        "Half the current requires half the voltage for the same linear circuit."
      ],
      "source": "resistance",
      "points": 1
    },
    {
      "id": "L01-rc-backwards",
      "sectionId": "filters",
      "type": "multiStepCalc",
      "difficulty": "hard",
      "prompt": "A passive low-pass membrane must have corner frequency $50\\,\\text{Hz}$. Its measured total capacitance is $20\\,\\text{pF}$. Choose the required resistance and predict the plateau and voltage after one time constant for injected $100\\,\\text{pA}$.",
      "hints": [
        {
          "body": "Combine corner frequency, time constant and passive response."
        },
        {
          "body": "Start with $\\tau=1/(2\\pi\\times50\\,Hz)$; then infer resistance, plateau and the transient."
        }
      ],
      "stages": [
        {
          "title": "Required timescale",
          "answer": {
            "value": 3.1830988618379066,
            "unit": "ms",
            "tolerance": 0.015915494309189534,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 1,
                "b": 314.1592653589793
              },
              "displayScale": 0.001
            }
          },
          "tex": "\\tau=1/(2\\pi f_0)",
          "modelAnswer": [
            "Work backwards from frequency.",
            "$\\tau=1/(2\\pi f_0)$",
            "$3.1830989\\,\\text{ms}$"
          ]
        },
        {
          "title": "Required resistance",
          "answer": {
            "value": 159.15494309189535,
            "unit": "Mohm",
            "tolerance": 0.7957747154594768,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 0.0031830988618379067,
                "b": 2e-11
              },
              "displayScale": 1000000.0
            }
          },
          "tex": "R=\\tau/C",
          "modelAnswer": [
            "Convert capacitance to farads.",
            "$R=\\tau/C$",
            "$159.15494\\,\\text{Mohm}$"
          ]
        },
        {
          "title": "Plateau voltage",
          "answer": {
            "value": 15.915494309189533,
            "unit": "mV",
            "tolerance": 0.07957747154594767,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 1e-10,
                "b": 159154943.09189534
              },
              "displayScale": 0.001
            }
          },
          "tex": "\\Delta V_{steady}=IR",
          "modelAnswer": [
            "Injected depolarizing current gives a positive voltage change.",
            "$\\Delta V_{steady}=IR$",
            "$15.915494\\,\\text{mV}$"
          ]
        },
        {
          "title": "One-time-constant voltage",
          "answer": {
            "value": 10.060511156757617,
            "unit": "mV",
            "tolerance": 0.05030255578378808,
            "verification": {
              "relation": "charging",
              "inputs": {
                "i": 1e-10,
                "r": 159154943.09189534,
                "c": 2e-11,
                "t": 0.0031830988618379067
              },
              "displayScale": 0.001
            }
          },
          "tex": "\\Delta V(\\tau)=IR(1-e^{-1})",
          "modelAnswer": [
            "The transient must be below its plateau.",
            "$\\Delta V(\\tau)=IR(1-e^{-1})$",
            "$10.060511\\,\\text{mV}$"
          ]
        }
      ],
      "modelAnswer": [
        "Work backwards from frequency.",
        "Convert capacitance to farads.",
        "Injected depolarizing current gives a positive voltage change.",
        "The transient must be below its plateau."
      ],
      "source": "filters",
      "points": 1
    },
    {
      "id": "L01-derive-nernst",
      "sectionId": "equilibrium",
      "type": "derive",
      "difficulty": "hard",
      "prompt": "Derive the Nernst voltage from zero net Nernst-Planck flux. State assumptions, integration limits and why reversing the concentration ratio requires a sign change.",
      "hints": [
        {
          "body": "Set the net flux to zero before integrating."
        },
        {
          "body": "Separate the voltage differential from the logarithmic concentration differential; keep limits on the same sides."
        }
      ],
      "modelAnswer": [
        "Set $J=0$ and cancel nonzero mobility: $dV=-RT\\,dC/(zFC)$.",
        "Integrate from outside to inside: $V_{in}-V_{out}=-RT\\ln(C_{in}/C_{out})/(zF)$.",
        "Use $\\ln(a/b)=-\\ln(b/a)$ to obtain $E=RT\\ln(C_{out}/C_{in})/(zF)$.",
        "Assume one-ion equilibrium, uniform temperature and the concentration approximation used in the lecture."
      ],
      "markScheme": [
        {
          "text": "Set $J=0$ and cancel nonzero mobility: $dV=-RT\\,dC/(zFC)$."
        },
        {
          "text": "Integrate from outside to inside: $V_{in}-V_{out}=-RT\\ln(C_{in}/C_{out})/(zF)$."
        },
        {
          "text": "Use $\\ln(a/b)=-\\ln(b/a)$ to obtain $E=RT\\ln(C_{out}/C_{in})/(zF)$."
        },
        {
          "text": "Assume one-ion equilibrium, uniform temperature and the concentration approximation used in the lecture."
        }
      ],
      "source": "equilibrium",
      "points": 1
    },
    {
      "id": "L01-donnan-constrained",
      "sectionId": "donnan",
      "type": "multiStepCalc",
      "difficulty": "hard",
      "prompt": "Two equal compartments are held at fixed volume. Initially each contains $120\\,\\text{mM}$ KCl; inside additionally contains $80\\,\\text{mM}$ potassium salt of impermeant monovalent anions. Only potassium and chloride cross. Find redistribution $x$ outwards of each permeant ion, final concentrations and shared equilibrium voltage at $20\\,^{\\circ}\\text{C}$. Then predict water tendency if the volume constraint is released.",
      "hints": [
        {
          "body": "Use neutrality, conservation and Donnan, then Nernst."
        },
        {
          "body": "Start with $(200-x)(120-x)=(120+x)^2$. Solve for the shift, fill concentrations, then compare total particles."
        }
      ],
      "stages": [
        {
          "title": "Set up product constraint",
          "choices": [
            {
              "label": "(200 - x)(120 - x) = (120 + x)^2"
            },
            {
              "label": "(200 + x)(120 + x) = (120 - x)^2"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "An equal outward transfer of cations and anions preserves bulk neutrality."
          ]
        },
        {
          "title": "Redistribution",
          "answer": {
            "value": 17.142857142857142,
            "unit": "mM",
            "tolerance": 0.08571428571428572,
            "verification": {
              "relation": "donnan",
              "inputs": {
                "fixed": 80,
                "salt": 120
              },
              "displayScale": 1
            }
          },
          "tex": "x=\\frac{80(120)}{4(120)+80}",
          "modelAnswer": [
            "Conservation, neutrality and product equality determine the shift.",
            "$x=\\frac{80(120)}{4(120)+80}$",
            "$17.142857\\,\\text{mM}$"
          ]
        },
        {
          "title": "Inside potassium",
          "answer": {
            "value": 182.85714285714286,
            "unit": "mM",
            "tolerance": 0.9142857142857144,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": 200,
                "b": -17.142857142857142
              },
              "displayScale": 1
            }
          },
          "tex": "[K]_{in}=200-x",
          "modelAnswer": [
            "Impermeant anions stay inside.",
            "$[K]_{in}=200-x$",
            "$182.85714\\,\\text{mM}$"
          ]
        },
        {
          "title": "Inside chloride",
          "answer": {
            "value": 102.85714285714286,
            "unit": "mM",
            "tolerance": 0.5142857142857143,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": 120,
                "b": -17.142857142857142
              },
              "displayScale": 1
            }
          },
          "tex": "[Cl]_{in}=120-x",
          "modelAnswer": [
            "Potassium minus chloride still balances fixed anions.",
            "$[Cl]_{in}=120-x$",
            "$102.85714\\,\\text{mM}$"
          ]
        },
        {
          "title": "Outside potassium and chloride",
          "answer": {
            "value": 137.14285714285714,
            "unit": "mM",
            "tolerance": 0.6857142857142857,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": 120,
                "b": 17.142857142857142
              },
              "displayScale": 1
            }
          },
          "tex": "[K]_{out}=[Cl]_{out}=120+x",
          "modelAnswer": [
            "Outside remains electrically neutral.",
            "$[K]_{out}=[Cl]_{out}=120+x$",
            "$137.14286\\,\\text{mM}$"
          ]
        },
        {
          "title": "Shared voltage",
          "answer": {
            "value": -7.246446723281396,
            "unit": "mV",
            "tolerance": 0.036232233616406984,
            "verification": {
              "relation": "nernst",
              "inputs": {
                "shortcut": 0.058,
                "z": 1,
                "outside": 137.14285714285714,
                "inside": 182.85714285714286
              },
              "displayScale": 0.001
            }
          },
          "tex": "E=58\\,mV\\log_{10}([K]_{out}/[K]_{in})",
          "modelAnswer": [
            "Potassium is higher inside, so equilibrium voltage is negative.",
            "$E=58\\,mV\\log_{10}([K]_{out}/[K]_{in})$",
            "$-7.2464467\\,\\text{mV}$"
          ]
        },
        {
          "title": "Osmotic tendency",
          "choices": [
            {
              "label": "Water tends to enter the inside compartment"
            },
            {
              "label": "Water tends to leave the inside compartment"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The constrained inside solution has a higher total particle concentration. Subsequent water movement changes the concentrations."
          ]
        }
      ],
      "modelAnswer": [
        "An equal outward transfer of cations and anions preserves bulk neutrality.",
        "Conservation, neutrality and product equality determine the shift.",
        "Impermeant anions stay inside.",
        "Potassium minus chloride still balances fixed anions.",
        "Outside remains electrically neutral.",
        "Potassium is higher inside, so equilibrium voltage is negative.",
        "The constrained inside solution has a higher total particle concentration. Subsequent water movement changes the concentrations."
      ],
      "source": "donnan",
      "points": 1
    },
    {
      "id": "L01-donnan-limits",
      "sectionId": "donnan",
      "type": "written",
      "difficulty": "hard",
      "prompt": "Explain why a fixed-volume Donnan calculation with water-permeable membrane does not establish the final unrestricted osmotic equilibrium. Relate impermeant charge, permeant redistribution, voltage and osmotic pressure.",
      "hints": [
        {
          "body": "Distinguish ionic equilibrium from water equilibrium."
        },
        {
          "body": "Follow fixed charge to ion redistribution, then compare particle totals before discussing water."
        }
      ],
      "modelAnswer": [
        "Impermeant charge requires unequal permeant concentrations while preserving approximate bulk neutrality.",
        "Both permeant ions share one equilibrium voltage when their electrochemical potentials balance.",
        "The resulting total particle concentrations can differ, producing an osmotic water tendency.",
        "If water moves, volumes and concentrations change; a fixed-volume ionic solution is an intermediate constrained equilibrium, not the unrestricted final state."
      ],
      "markScheme": [
        {
          "text": "Impermeant charge requires unequal permeant concentrations while preserving approximate bulk neutrality."
        },
        {
          "text": "Both permeant ions share one equilibrium voltage when their electrochemical potentials balance."
        },
        {
          "text": "The resulting total particle concentrations can differ, producing an osmotic water tendency."
        },
        {
          "text": "If water moves, volumes and concentrations change; a fixed-volume ionic solution is an intermediate constrained equilibrium, not the unrestricted final state."
        }
      ],
      "source": "donnan",
      "points": 1
    },
    {
      "id": "L01-rebalance-loaded-divider",
      "type": "mc",
      "difficulty": "hard",
      "sectionId": "divider",
      "source": "L01 PDF pp20–22; official exam p1",
      "prompt": "Synthetic practice scenario. A recording input is connected across the lower resistor of a voltage divider. Replacing the input with a lower-resistance input changes the measured voltage. What should you expect with a fixed supply and positive resistances?",
      "correct": 0,
      "options": [
        {
          "text": "Lower voltage and higher supply current.",
          "feedback": "The input shunts the lower resistor. The combined lower resistance and the total resistance both fall."
        },
        {
          "text": "Lower voltage and lower supply current.",
          "feedback": "The lower voltage is consistent with shunting. Total resistance falls, which increases supply current."
        },
        {
          "text": "Higher voltage and higher supply current.",
          "feedback": "Supply current rises, but the lower branch now accounts for a smaller fraction of total resistance."
        }
      ],
      "hints": [
        {
          "body": "Identify which resistor the input is in parallel with."
        },
        {
          "body": "Recalculate the direction of change in both the divider fraction and the total resistance."
        }
      ],
      "modelAnswer": [
        "A smaller input resistance lowers the effective lower-arm resistance. The output fraction falls, while the smaller total series resistance draws more supply current."
      ]
    },
    {
      "id": "L01-core-rc-prediction",
      "sectionId": "passive",
      "type": "mc",
      "difficulty": "hard",
      "prompt": "A passive isopotential cell has a $10\\,\\mathrm{mV}$ plateau and a $10\\,\\mathrm{ms}$ time constant during a fixed current step. A second equal leak conductance opens in parallel, with the same reversal voltage and no capacitance change. What is the approximate voltage change $5\\,\\mathrm{ms}$ into the same step?",
      "options": [
        {
          "text": "$2.0\\,\\mathrm{mV}$",
          "feedback": "This uses the new plateau but keeps the original time constant."
        },
        {
          "text": "$6.3\\,\\mathrm{mV}$",
          "feedback": "This uses the new time constant but keeps the original plateau."
        },
        {
          "text": "$3.2\\,\\mathrm{mV}$",
          "feedback": "Doubling conductance halves resistance, plateau and time constant. At one new time constant, voltage reaches about 63% of the new $5\\,\\mathrm{mV}$ plateau."
        }
      ],
      "correct": 2,
      "hints": [
        {
          "body": "Find the new resistance from the two equal parallel conductances."
        },
        {
          "body": "Use the new resistance for both the plateau and the time constant."
        }
      ],
      "modelAnswer": [
        "Doubling conductance halves resistance, plateau and time constant. At one new time constant, voltage reaches about 63% of the new $5\\,\\mathrm{mV}$ plateau."
      ]
    }
  ],
  "mockExams": [
    {
      "id": "L01-mock-A",
      "title": "Mock A: passive measurement and ion balance",
      "coverage": "Lecture 1 only. Scales, signs, passive membrane, divalent Nernst and recording modes.",
      "questions": [
        {
          "id": "a1",
          "role": "concepts",
          "type": "written",
          "difficulty": "medium",
          "prompt": "a) What does EEG measure and at what scale? b) State inside-minus-outside voltage convention. c) What is outward-positive current for a negative ion? Answer each in 1–3 sentences.",
          "markScheme": [
            {
              "text": "EEG records extracellular brain electrical activity at organ/network scale."
            },
            {
              "text": "Membrane potential is inside minus outside, with outside defined as zero."
            },
            {
              "text": "Negative charge entering gives positive outward conventional current."
            }
          ],
          "modelAnswer": [
            "EEG records extracellular brain electrical activity at organ/network scale.",
            "Membrane potential is inside minus outside, with outside defined as zero.",
            "Negative charge entering gives positive outward conventional current."
          ],
          "hints": [
            {
              "body": "Separate scale, voltage reference and particle charge."
            },
            {
              "body": "Answer each subquestion independently."
            }
          ]
        },
        {
          "id": "a2",
          "role": "explanation",
          "type": "written",
          "difficulty": "medium",
          "prompt": "Explain the parallel RC membrane and sketch its response to a depolarizing current step. Label voltage and time axes, initial baseline, plateau and charging phase. Explain current partition during charging and at steady state.",
          "markScheme": [
            {
              "text": "Membrane resistance and capacitance are parallel."
            },
            {
              "text": "The voltage change approaches a plateau exponentially from baseline; axes show voltage and time."
            },
            {
              "text": "During charging there is capacitive current as well as channel current."
            },
            {
              "text": "At constant final voltage capacitive current is zero."
            }
          ],
          "modelAnswer": [
            "Membrane resistance and capacitance are parallel.",
            "The voltage change approaches a plateau exponentially from baseline; axes show voltage and time.",
            "During charging there is capacitive current as well as channel current.",
            "At constant final voltage capacitive current is zero."
          ],
          "hints": [
            {
              "body": "Use slide 24."
            },
            {
              "body": "Draw the gradual response before explaining transient versus steady current."
            }
          ]
        },
        {
          "id": "a3",
          "role": "calculation",
          "sectionId": "passive",
          "type": "multiStepCalc",
          "difficulty": "medium",
          "prompt": "An illustrative passive isopotential-cell measurement uses injected current $80\\,\\text{pA}$, plateau voltage change $12\\,\\text{mV}$ and fitted time constant $6\\,\\text{ms}$. Infer input resistance, total capacitance and corner frequency. These are specified practice data, not readings from a source trace.",
          "hints": [
            {
              "body": "Use plateau Ohm law, time constant and corner frequency."
            },
            {
              "body": "Start with $R=0.012\\,V/(80\\times10^{-12}\\,A)$, then use $C=\\tau/R$ and the corner relation."
            }
          ],
          "stages": [
            {
              "title": "Input resistance",
              "answer": {
                "value": 150,
                "unit": "Mohm",
                "tolerance": 0.75,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.012,
                    "b": 8e-11
                  },
                  "displayScale": 1000000.0
                }
              },
              "tex": "R=\\Delta V_{steady}/I",
              "modelAnswer": [
                "Use the plateau, not a transient voltage.",
                "$R=\\Delta V_{steady}/I$",
                "$150\\,\\text{Mohm}$"
              ]
            },
            {
              "title": "Capacitance",
              "answer": {
                "value": 40,
                "unit": "pF",
                "tolerance": 0.2,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 0.006,
                    "b": 150000000.0
                  },
                  "displayScale": 1e-12
                }
              },
              "tex": "C=\\tau/R",
              "modelAnswer": [
                "Use the correct resistance even if your preceding answer differed.",
                "$C=\\tau/R$",
                "$40\\,\\text{pF}$"
              ]
            },
            {
              "title": "Corner frequency",
              "answer": {
                "value": 26.52582385,
                "unit": "Hz",
                "tolerance": 0.13262911924999998,
                "verification": {
                  "relation": "corner",
                  "inputs": {
                    "tau": 0.006
                  },
                  "displayScale": 1
                }
              },
              "tex": "f_0=1/(2\\pi\\tau)",
              "modelAnswer": [
                "A finite time constant implies finite bandwidth.",
                "$f_0=1/(2\\pi\\tau)$",
                "$26.525824\\,\\text{Hz}$"
              ]
            }
          ],
          "modelAnswer": [
            "Use the plateau, not a transient voltage.",
            "Use the correct resistance even if your preceding answer differed.",
            "A finite time constant implies finite bandwidth."
          ],
          "source": "passive"
        },
        {
          "id": "a4",
          "role": "calculation",
          "sectionId": "equilibrium",
          "type": "multiStepCalc",
          "difficulty": "medium",
          "prompt": "At $37\\,^{\\circ}\\text{C}$, a divalent cation has outside concentration $2\\,\\text{mM}$ and inside $0.002\\,\\text{mM}$. Use the supplied $61.5\\,\\text{mV}$ shortcut. Find ratio, equilibrium potential and its sign.",
          "hints": [
            {
              "body": "Use Nernst with the stated temperature and valence."
            },
            {
              "body": "Begin with outside/inside $=2/0.002$, then take the logarithm and divide the shortcut by two."
            }
          ],
          "stages": [
            {
              "title": "Concentration ratio",
              "answer": {
                "value": 1000,
                "unit": "",
                "tolerance": 5.0,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 2,
                    "b": 0.002
                  },
                  "displayScale": 1
                }
              },
              "tex": "C_{out}/C_{in}",
              "modelAnswer": [
                "Both concentrations already use the same unit.",
                "$C_{out}/C_{in}$",
                "$1000$"
              ]
            },
            {
              "title": "Equilibrium potential",
              "answer": {
                "value": 92.25,
                "unit": "mV",
                "tolerance": 0.46125,
                "verification": {
                  "relation": "nernst",
                  "inputs": {
                    "shortcut": 0.0615,
                    "z": 2,
                    "outside": 2,
                    "inside": 0.002
                  },
                  "displayScale": 0.001
                }
              },
              "tex": "E=(61.5\\,mV/2)\\log_{10}(C_{out}/C_{in})",
              "modelAnswer": [
                "Divide the shortcut by valence.",
                "$E=(61.5\\,mV/2)\\log_{10}(C_{out}/C_{in})$",
                "$92.25\\,\\text{mV}$"
              ]
            },
            {
              "title": "Sign check",
              "choices": [
                {
                  "label": "Positive inside at equilibrium"
                },
                {
                  "label": "Negative inside at equilibrium"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "The positive cation needs positive inside voltage to balance its inward concentration tendency."
              ]
            }
          ],
          "modelAnswer": [
            "Both concentrations already use the same unit.",
            "Divide the shortcut by valence.",
            "The positive cation needs positive inside voltage to balance its inward concentration tendency."
          ],
          "source": "equilibrium"
        },
        {
          "id": "a5",
          "role": "methods",
          "type": "written",
          "difficulty": "medium",
          "prompt": "Using slide 14 recordings, distinguish single-channel current, whole-cell current and intracellular voltage records. Select a mode to observe voltage after current injection, and explain why mode and preparation type are separate choices. What assumption lets you infer current from an extracellular voltage drop?",
          "markScheme": [
            {
              "text": "Single-channel and whole-cell records measure current at different scales; intracellular current-clamp records voltage."
            },
            {
              "text": "Current clamp is the appropriate mode for voltage after current injection."
            },
            {
              "text": "In vivo, ex vivo and in vitro describe preparations rather than recorded variables."
            },
            { "text": "The current path must have a known impedance. For a resistive path use the measured voltage difference divided by its resistance." }
          ],
          "modelAnswer": [
            "Single-channel and whole-cell records measure current at different scales; intracellular current-clamp records voltage.",
            "Current clamp is the appropriate mode for voltage after current injection.",
            "In vivo, ex vivo and in vitro describe preparations rather than recorded variables.",
            "The current path must have a known impedance. For a resistive path use the measured voltage difference divided by its resistance."
          ],
          "hints": [
            {
              "body": "Read the axes and mode names."
            },
            {
              "body": "Choose the measured variable, then state the preparation distinction."
            }
          ],
          "figure": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Source slide 14. Qualitative recording identification; no numerical readings required.",
            "fallbackAlt": "Source slide 14. Qualitative recording identification; no numerical readings required.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L01/recordings.webp', import.meta.url).href,
              "alt": "Source slide 14. Qualitative recording identification; no numerical readings required.",
              "aspect": 0.6937669376693767,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ]
    },
    {
      "id": "L01-mock-B",
      "title": "Mock B: attenuation and capacitive charging",
      "coverage": "Lecture 1 only. Channel pathways, diffusion, functional readouts, divider design, ramp charging and apparatus.",
      "questions": [
        {
          "id": "b1",
          "role": "concepts",
          "type": "written",
          "difficulty": "medium",
          "prompt": "a) Distinguish selectivity from gating. b) Distinguish diffusion from electrical drift. c) What is the difference between total and specific membrane capacitance? Answer each in 1–3 sentences.",
          "markScheme": [
            {
              "text": "Selectivity determines which ions pass; gating determines whether the channel conducts."
            },
            {
              "text": "Diffusion follows concentration gradients; drift depends on electric field and ion charge."
            },
            {
              "text": "Total capacitance scales with membrane area; specific capacitance is capacitance per area."
            }
          ],
          "modelAnswer": [
            "Selectivity determines which ions pass; gating determines whether the channel conducts.",
            "Diffusion follows concentration gradients; drift depends on electric field and ion charge.",
            "Total capacitance scales with membrane area; specific capacitance is capacitance per area."
          ],
          "hints": [
            {
              "body": "Use the channel and capacitor definitions."
            },
            {
              "body": "For each pair identify what changes and what stays fixed."
            }
          ]
        },
        {
          "id": "b2",
          "role": "explanation",
          "type": "written",
          "difficulty": "medium",
          "prompt": "Explain why drug binding alone cannot establish electrical efficacy or safety. Propose cellular and organ-level functional readouts, and explain a limitation of extrapolating between them.",
          "markScheme": [
            {
              "text": "Measure functional electrical change because a molecule can block, activate or alter gating."
            },
            {
              "text": "A cellular recording tests the local effect; a suitable cardiac or brain readout can reveal an organ-level concern."
            },
            {
              "text": "Off-target electrical effects can include arrhythmia or seizure risk."
            },
            {
              "text": "The cellular trace alone does not establish safe organ function."
            }
          ],
          "modelAnswer": [
            "Measure functional electrical change because a molecule can block, activate or alter gating.",
            "A cellular recording tests the local effect; a suitable cardiac or brain readout can reveal an organ-level concern.",
            "Off-target electrical effects can include arrhythmia or seizure risk.",
            "The cellular trace alone does not establish safe organ function."
          ],
          "hints": [
            {
              "body": "Use the three application slides."
            },
            {
              "body": "Connect intended action and off-target concern to suitable recording scales."
            }
          ]
        },
        {
          "id": "b3",
          "role": "calculation",
          "sectionId": "divider",
          "type": "multiStepCalc",
          "difficulty": "medium",
          "prompt": "Design an unloaded attenuator: $V_{in}=3\\,\\text{V}$, desired $V_{out}=0.3\\,\\text{V}$, lower resistor $R_2=2\\,\\text{k}\\Omega$. Find upper resistance and verify the attenuation.",
          "hints": [
            {
              "body": "Use the unloaded divider relation."
            },
            {
              "body": "Start with $R_1=2000\\,\\Omega(3/0.3-1)$, then verify the output."
            }
          ],
          "stages": [
            {
              "title": "Rearrange",
              "choices": [
                {
                  "label": "R1 = R2 (Vin/Vout - 1)"
                },
                {
                  "label": "R1 = R2 (Vout/Vin - 1)"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "Solve the divider equation for the upper resistor."
              ]
            },
            {
              "title": "Voltage ratio",
              "answer": {
                "value": 10,
                "unit": "",
                "tolerance": 0.05,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 3,
                    "b": 0.3
                  },
                  "displayScale": 1
                }
              },
              "tex": "V_{in}/V_{out}=3/0.3",
              "modelAnswer": [
                "Divide input by desired output.",
                "$V_{in}/V_{out}=3/0.3$",
                "$10$"
              ]
            },
            {
              "title": "Upper resistance",
              "answer": {
                "value": 18,
                "unit": "kohm",
                "tolerance": 0.09,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 2000,
                    "b": 9
                  },
                  "displayScale": 1000
                }
              },
              "tex": "R_1=R_2(V_{in}/V_{out}-1)",
              "modelAnswer": [
                "The upper resistor is nine times the lower resistor.",
                "$R_1=R_2(V_{in}/V_{out}-1)$",
                "$18\\,\\text{kohm}$"
              ]
            },
            {
              "title": "Verify output",
              "answer": {
                "value": 0.3,
                "unit": "V",
                "tolerance": 0.0015,
                "verification": {
                  "relation": "divider",
                  "inputs": {
                    "v": 3,
                    "r1": 18000,
                    "r2": 2000
                  },
                  "displayScale": 1
                }
              },
              "tex": "V_{out}=V_{in}R_2/(R_1+R_2)",
              "modelAnswer": [
                "The output is smaller than the source and agrees with the target.",
                "$V_{out}=V_{in}R_2/(R_1+R_2)$",
                "$0.3\\,\\text{V}$"
              ]
            }
          ],
          "modelAnswer": [
            "Solve the divider equation for the upper resistor.",
            "Divide input by desired output.",
            "The upper resistor is nine times the lower resistor.",
            "The output is smaller than the source and agrees with the target."
          ],
          "source": "divider"
        },
        {
          "id": "b4",
          "role": "calculation",
          "sectionId": "capacitance",
          "type": "multiStepCalc",
          "difficulty": "medium",
          "prompt": "A linear membrane ramp changes inside-minus-outside voltage by $-20\\,\\text{mV}$ in $4\\,\\text{ms}$. The isolated capacitive current is $-150\\,\\text{pA}$. Infer capacitance and charge change.",
          "hints": [
            {
              "body": "Use capacitive current and charge storage."
            },
            {
              "body": "Start with slope $(-0.020\\,V)/(0.004\\,s)$, infer capacitance, then multiply by voltage change."
            }
          ],
          "stages": [
            {
              "title": "Voltage slope",
              "answer": {
                "value": -5,
                "unit": "",
                "tolerance": 0.025,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -0.02,
                    "b": 0.004
                  },
                  "displayScale": 1
                }
              },
              "tex": "dV/dt=\\Delta V/\\Delta t",
              "modelAnswer": [
                "Enter the SI slope in volts per second as a bare number.",
                "$dV/dt=\\Delta V/\\Delta t$",
                "$-5$"
              ]
            },
            {
              "title": "Capacitance",
              "answer": {
                "value": 30,
                "unit": "pF",
                "tolerance": 0.15,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -1.5e-10,
                    "b": -5
                  },
                  "displayScale": 1e-12
                }
              },
              "tex": "C=I_C/(dV/dt)",
              "modelAnswer": [
                "Both current and slope are negative, so capacitance is positive.",
                "$C=I_C/(dV/dt)$",
                "$30\\,\\text{pF}$"
              ]
            },
            {
              "title": "Charge change",
              "answer": {
                "value": -0.6,
                "unit": "pC",
                "tolerance": 0.003,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 3e-11,
                    "b": -0.02
                  },
                  "displayScale": 1e-12
                }
              },
              "tex": "\\Delta q=C\\Delta V",
              "modelAnswer": [
                "Inner plate charge decreases.",
                "$\\Delta q=C\\Delta V$",
                "$-0.6\\,\\text{pC}$"
              ]
            }
          ],
          "modelAnswer": [
            "Enter the SI slope in volts per second as a bare number.",
            "Both current and slope are negative, so capacitance is positive.",
            "Inner plate charge decreases."
          ],
          "source": "capacitance"
        },
        {
          "id": "b5",
          "role": "methods",
          "type": "written",
          "difficulty": "medium",
          "prompt": "Identify the recording apparatus roles shown on slide 15. A pipette recording is unstable when the table is disturbed and also contains electrical interference. Choose a control for each problem, then explain the seal requirement for patch recording. How would you distinguish a slow response caused by pipette capacitance from slow membrane charging?",
          "markScheme": [
            {
              "text": "Microscope and micromanipulator support viewing and pipette placement."
            },
            {
              "text": "Vibration isolation addresses mechanical disturbance; electrical shielding addresses electrical interference."
            },
            {
              "text": "A tight pipette–membrane seal isolates a patch and constrains the current path."
            },
            { "text": "Apply a test step and adjust pipette-capacitance compensation against its fast transient. Excess compensation causes overshoot or ringing. A slower cell response can remain after the pipette transient is controlled." }
          ],
          "modelAnswer": [
            "Microscope and micromanipulator support viewing and pipette placement.",
            "Vibration isolation addresses mechanical disturbance; electrical shielding addresses electrical interference.",
            "A tight pipette–membrane seal isolates a patch and constrains the current path.",
            "Apply a test step and adjust pipette-capacitance compensation against its fast transient. Excess compensation causes overshoot or ringing. A slower cell response can remain after the pipette transient is controlled."
          ],
          "hints": [
            {
              "body": "Separate mechanical and electrical problems."
            },
            {
              "body": "Match each control to its source of interference, then follow patch current."
            }
          ],
          "figure": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Source slide 15 recording apparatus.",
            "fallbackAlt": "Source slide 15 recording apparatus.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L01/apparatus.webp', import.meta.url).href,
              "alt": "Source slide 15 recording apparatus.",
              "aspect": 1.1511991657977059,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ]
    },
    {
      "id": "L01-mock-C",
      "title": "Mock C: constrained equilibrium and current pathways",
      "coverage": "Lecture 1 only. Transport, equilibrium, electroneutrality, Donnan redistribution, parallel pathways and patch configurations.",
      "questions": [
        {
          "id": "c1",
          "role": "concepts",
          "type": "written",
          "difficulty": "medium",
          "prompt": "a) Distinguish primary and secondary active transport. b) State the sodium/potassium pump exchange. c) What does zero net ion flux mean? Answer each in 1–3 sentences.",
          "markScheme": [
            {
              "text": "Primary transport uses ATP directly; secondary transport uses a stored ion gradient."
            },
            {
              "text": "Three sodium ions leave and two potassium ions enter per ATP."
            },
            {
              "text": "Zero net flux is balanced opposing ion movements, not no microscopic movement."
            }
          ],
          "modelAnswer": [
            "Primary transport uses ATP directly; secondary transport uses a stored ion gradient.",
            "Three sodium ions leave and two potassium ions enter per ATP.",
            "Zero net flux is balanced opposing ion movements, not no microscopic movement."
          ],
          "hints": [
            {
              "body": "Use slides 30 and 34–35."
            },
            {
              "body": "Separate energy source from the meaning of equilibrium."
            }
          ]
        },
        {
          "id": "c2",
          "role": "explanation",
          "type": "written",
          "difficulty": "medium",
          "prompt": "Explain how membrane voltage, bulk electroneutrality and Donnan asymmetry can coexist. Sketch two fixed-volume compartments with impermeant intracellular anions and indicate the osmotic tendency after ionic redistribution.",
          "markScheme": [
            {
              "text": "Bulk fluid remains approximately electroneutral; thin boundary charge layers support membrane voltage."
            },
            {
              "text": "Impermeant charge causes unequal permeant-ion distributions."
            },
            {
              "text": "Conservation and charge balance accompany equality of electrochemical potentials."
            },
            {
              "text": "Water tends toward the compartment with greater total particle concentration; releasing a volume constraint changes the ionic solution."
            }
          ],
          "modelAnswer": [
            "Bulk fluid remains approximately electroneutral; thin boundary charge layers support membrane voltage.",
            "Impermeant charge causes unequal permeant-ion distributions.",
            "Conservation and charge balance accompany equality of electrochemical potentials.",
            "Water tends toward the compartment with greater total particle concentration; releasing a volume constraint changes the ionic solution."
          ],
          "hints": [
            {
              "body": "Distinguish bulk charge balance, membrane charge and total particles."
            },
            {
              "body": "Sketch fixed charge first, then permeant ions and a separate water arrow."
            }
          ]
        },
        {
          "id": "c3",
          "role": "calculation",
          "sectionId": "donnan",
          "type": "multiStepCalc",
          "difficulty": "hard",
          "prompt": "Two equal compartments are held at fixed volume. Initially each contains $120\\,\\text{mM}$ KCl; inside additionally contains $80\\,\\text{mM}$ potassium salt of impermeant monovalent anions. Only potassium and chloride cross. Find redistribution $x$ outwards of each permeant ion, final concentrations and shared equilibrium voltage at $20\\,^{\\circ}\\text{C}$. Then predict water tendency if the volume constraint is released.",
          "hints": [
            {
              "body": "Use neutrality, conservation and Donnan, then Nernst."
            },
            {
              "body": "Start with $(200-x)(120-x)=(120+x)^2$. Solve for the shift, fill concentrations, then compare total particles."
            }
          ],
          "stages": [
            {
              "title": "Set up product constraint",
              "choices": [
                {
                  "label": "(200 - x)(120 - x) = (120 + x)^2"
                },
                {
                  "label": "(200 + x)(120 + x) = (120 - x)^2"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "An equal outward transfer of cations and anions preserves bulk neutrality."
              ]
            },
            {
              "title": "Redistribution",
              "answer": {
                "value": 17.142857142857142,
                "unit": "mM",
                "tolerance": 0.08571428571428572,
                "verification": {
                  "relation": "donnan",
                  "inputs": {
                    "fixed": 80,
                    "salt": 120
                  },
                  "displayScale": 1
                }
              },
              "tex": "x=\\frac{80(120)}{4(120)+80}",
              "modelAnswer": [
                "Conservation, neutrality and product equality determine the shift.",
                "$x=\\frac{80(120)}{4(120)+80}$",
                "$17.142857\\,\\text{mM}$"
              ]
            },
            {
              "title": "Inside potassium",
              "answer": {
                "value": 182.85714285714286,
                "unit": "mM",
                "tolerance": 0.9142857142857144,
                "verification": {
                  "relation": "sum",
                  "inputs": {
                    "a": 200,
                    "b": -17.142857142857142
                  },
                  "displayScale": 1
                }
              },
              "tex": "[K]_{in}=200-x",
              "modelAnswer": [
                "Impermeant anions stay inside.",
                "$[K]_{in}=200-x$",
                "$182.85714\\,\\text{mM}$"
              ]
            },
            {
              "title": "Inside chloride",
              "answer": {
                "value": 102.85714285714286,
                "unit": "mM",
                "tolerance": 0.5142857142857143,
                "verification": {
                  "relation": "sum",
                  "inputs": {
                    "a": 120,
                    "b": -17.142857142857142
                  },
                  "displayScale": 1
                }
              },
              "tex": "[Cl]_{in}=120-x",
              "modelAnswer": [
                "Potassium minus chloride still balances fixed anions.",
                "$[Cl]_{in}=120-x$",
                "$102.85714\\,\\text{mM}$"
              ]
            },
            {
              "title": "Outside potassium and chloride",
              "answer": {
                "value": 137.14285714285714,
                "unit": "mM",
                "tolerance": 0.6857142857142857,
                "verification": {
                  "relation": "sum",
                  "inputs": {
                    "a": 120,
                    "b": 17.142857142857142
                  },
                  "displayScale": 1
                }
              },
              "tex": "[K]_{out}=[Cl]_{out}=120+x",
              "modelAnswer": [
                "Outside remains electrically neutral.",
                "$[K]_{out}=[Cl]_{out}=120+x$",
                "$137.14286\\,\\text{mM}$"
              ]
            },
            {
              "title": "Shared voltage",
              "answer": {
                "value": -7.246446723281396,
                "unit": "mV",
                "tolerance": 0.036232233616406984,
                "verification": {
                  "relation": "nernst",
                  "inputs": {
                    "shortcut": 0.058,
                    "z": 1,
                    "outside": 137.14285714285714,
                    "inside": 182.85714285714286
                  },
                  "displayScale": 0.001
                }
              },
              "tex": "E=58\\,mV\\log_{10}([K]_{out}/[K]_{in})",
              "modelAnswer": [
                "Potassium is higher inside, so equilibrium voltage is negative.",
                "$E=58\\,mV\\log_{10}([K]_{out}/[K]_{in})$",
                "$-7.2464467\\,\\text{mV}$"
              ]
            },
            {
              "title": "Osmotic tendency",
              "choices": [
                {
                  "label": "Water tends to enter the inside compartment"
                },
                {
                  "label": "Water tends to leave the inside compartment"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "The constrained inside solution has a higher total particle concentration. Subsequent water movement changes the concentrations."
              ]
            }
          ],
          "modelAnswer": [
            "An equal outward transfer of cations and anions preserves bulk neutrality.",
            "Conservation, neutrality and product equality determine the shift.",
            "Impermeant anions stay inside.",
            "Potassium minus chloride still balances fixed anions.",
            "Outside remains electrically neutral.",
            "Potassium is higher inside, so equilibrium voltage is negative.",
            "The constrained inside solution has a higher total particle concentration. Subsequent water movement changes the concentrations."
          ],
          "source": "donnan"
        },
        {
          "id": "c4",
          "role": "calculation",
          "sectionId": "resistance",
          "type": "multiStepCalc",
          "difficulty": "hard",
          "prompt": "A membrane patch has an ohmic current of $120\\,\\text{pA}$ for a $10\\,\\text{mV}$ drop. One parallel pathway contributes $4\\,\\text{nS}$. Infer the conductance of the other pathway, total resistance, then voltage needed to carry $60\\,\\text{pA}$. Treat this as a resistor circuit without ionic batteries.",
          "hints": [
            {
              "body": "Select reciprocal and parallel relations before applying Ohm law."
            },
            {
              "body": "Infer $G_{total}=120\\,pA/(10\\,mV)$, subtract the known branch, then find resistance and the new voltage."
            }
          ],
          "stages": [
            {
              "title": "Total conductance",
              "answer": {
                "value": 12,
                "unit": "nS",
                "tolerance": 0.06,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1.2e-10,
                    "b": 0.01
                  },
                  "displayScale": 1e-09
                }
              },
              "tex": "G_{total}=I/\\Delta V",
              "modelAnswer": [
                "Infer total conductance from the measured current and voltage.",
                "$G_{total}=I/\\Delta V$",
                "$12\\,\\text{nS}$"
              ]
            },
            {
              "title": "Unknown pathway",
              "answer": {
                "value": 8,
                "unit": "nS",
                "tolerance": 0.04,
                "verification": {
                  "relation": "sum",
                  "inputs": {
                    "a": 1.2e-08,
                    "b": -4e-09
                  },
                  "displayScale": 1e-09
                }
              },
              "tex": "G_2=G_{total}-G_1",
              "modelAnswer": [
                "Parallel conductances add.",
                "$G_2=G_{total}-G_1$",
                "$8\\,\\text{nS}$"
              ]
            },
            {
              "title": "Total resistance",
              "answer": {
                "value": 83.3333333,
                "unit": "Mohm",
                "tolerance": 0.41666666650000006,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1,
                    "b": 1.2e-08
                  },
                  "displayScale": 1000000.0
                }
              },
              "tex": "R_{total}=1/G_{total}",
              "modelAnswer": [
                "Do not add parallel resistances.",
                "$R_{total}=1/G_{total}$",
                "$83.333333\\,\\text{Mohm}$"
              ]
            },
            {
              "title": "New voltage",
              "answer": {
                "value": 5,
                "unit": "mV",
                "tolerance": 0.025,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 6e-11,
                    "b": 1.2e-08
                  },
                  "displayScale": 0.001
                }
              },
              "tex": "\\Delta V=I/G_{total}",
              "modelAnswer": [
                "Half the current requires half the voltage for the same linear circuit.",
                "$\\Delta V=I/G_{total}$",
                "$5\\,\\text{mV}$"
              ]
            }
          ],
          "modelAnswer": [
            "Infer total conductance from the measured current and voltage.",
            "Parallel conductances add.",
            "Do not add parallel resistances.",
            "Half the current requires half the voltage for the same linear circuit."
          ],
          "source": "resistance"
        },
        {
          "id": "c5",
          "role": "methods",
          "type": "written",
          "difficulty": "medium",
          "prompt": "Identify cell-attached, whole-cell, inside-out, outside-out and perforated-patch configurations from the source figure. Choose between retaining an intact patch, obtaining whole-cell access, and exposing the intracellular membrane face to the bath. State the signal measured by the suction-electrode photoreceptor method. Which whole-cell variant preserves soluble cytoplasmic constituents, and what access trade-off should you monitor?",
          "markScheme": [
            {
              "text": "Cell-attached retains an intact membrane patch; whole-cell gives access to the interior."
            },
            {
              "text": "Inside-out exposes the intracellular patch face; outside-out exposes the extracellular face."
            },
            {
              "text": "Perforated patch provides access through perforations rather than complete rupture."
            },
            {
              "text": "The suction electrode measures changes in extracellular photoreceptor current."
            },
            { "text": "Perforated patch limits washout through the pipette. Access resistance can be higher and should be monitored." }
          ],
          "modelAnswer": [
            "Cell-attached retains an intact membrane patch; whole-cell gives access to the interior.",
            "Inside-out exposes the intracellular patch face; outside-out exposes the extracellular face.",
            "Perforated patch provides access through perforations rather than complete rupture.",
            "The suction electrode measures changes in extracellular photoreceptor current.",
            "Perforated patch limits washout through the pipette. Access resistance can be higher and should be monitored."
          ],
          "hints": [
            {
              "body": "Compare access and exposed face."
            },
            {
              "body": "Identify the three requested goals before contrasting the suction electrode."
            }
          ],
          "figure": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "Source slide 17 patch configurations with printed labels retained.",
            "fallbackAlt": "Source slide 17 patch configurations with printed labels retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L01/patch.webp', import.meta.url).href,
              "alt": "Source slide 17 patch configurations with printed labels retained.",
              "aspect": 1.539980256663376,
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
content.formulaReference = equationSheet;
content.formulaReferenceNote = 'Official exam information p4; full-course reference. Only lecture 1 relations are used in this page.';
export default content;
