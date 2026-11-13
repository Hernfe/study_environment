// Source map: docs/scope/nbe-e4120/L09.md
import { equationSheet } from './equation-sheet.js';
const content={
  "meta": {
    "id": "L09",
    "number": 9,
    "title": "Ion channels, channelopathy and applications",
    "chapters": [],
    "pages": [],
    "lectureDate": "2026-11-06",
    "examDate": "2026-11-30",
    "examLabel": "Final exam"
  },
  "objectives": [
    "Distinguish passive pores, active transport and channel control.",
    "Explain selectivity through hydration, filter geometry and interactions.",
    "Relate channel architecture, stochastic gates and population currents.",
    "Interpret taught channelopathy and pharmacology mechanisms with explicit assay limits."
  ],
  "prerequisites": [
    {
      "text": "HH current, gating charge and ionic driving force",
      "lectureId": "L08",
      "sectionId": "circuit"
    },
    {
      "text": "First-order gates and independent factors",
      "lectureId": "L06",
      "sectionId": "balance"
    }
  ],
  "segmentedPractice": true,
  "sections": [
    {
      "id": "overview",
      "title": "Overview: pores, gates and applications",
      "keyTerms": [],
      "source": "L09 9:1 p1",
      "blocks": [
        {
          "type": "text",
          "body": ["Ion channels link molecular structure to electrical behavior: a pore selects ions, while a gate controls when they pass. Distinguish these roles before explaining how altered channel function changes a cell.", "Use $V_m=V_{in}-V_{out}$ and positive outward current throughout. Part 1 develops transport, selectivity and gating; part 2 applies those ideas to channel dysfunction and recording. The applications remain provisional final-exam scope. (9:1 PDF p1.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "9:1, PDF page 5. KcsA pore, pore helix, extracellular selectivity filter and cytoplasmic gate. Printed labels and axes retained.",
            "fallbackAlt": "9:1, PDF page 5. KcsA pore, pore helix, extracellular selectivity filter and cytoplasmic gate. Printed labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L09/ions-05.webp', import.meta.url).href,
              "alt": "9:1, PDF page 5. KcsA pore, pore helix, extracellular selectivity filter and cytoplasmic gate. Printed labels and axes retained.",
              "aspect": 0.6581632653061225,
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
          "id": "L09-overview-check",
          "prompt": "Which movement is passive?",
          "correct": 0,
          "options": [
            {
              "text": "Ion passage down its electrochemical gradient",
              "feedback": "An open pore allows downhill electrochemical movement without obligatory ATP per ion."
            },
            {
              "text": "Ion pumping against its electrochemical gradient",
              "feedback": "Uphill pumping requires an energy source and is active transport."
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
            "Ion passage down its electrochemical gradient."
          ]
        },
        {
          "id": "L09-overview-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L09 9:1 p1",
          "prompt": "What is the role of a channel gate?",
          "options": [
            {
              "text": "Control when ions can pass",
              "feedback": "The gate controls opening and closing of the permeation pathway."
            },
            {
              "text": "Determine which ions fit best",
              "feedback": "Selectivity belongs to the pore and filter, distinct from the gate."
            },
            {
              "text": "Maintain the ionic gradient",
              "feedback": "Pumps maintain gradients; gates control passive access to a pore."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Recall the distinction taught in this section."
            },
            {
              "body": "The gate controls opening and closing of the permeation pathway."
            }
          ],
          "modelAnswer": [
            "The gate controls opening and closing of the permeation pathway."
          ]
        }
      ],
      "part": {
        "id": "channels",
        "number": 1,
        "title": "Ion channels: transport, pores and gating"
      }
    },
    {
      "id": "transport",
      "title": "Pumps, carriers and channels",
      "keyTerms": [],
      "source": "L09 9:1 p2",
      "blocks": [
        {
          "type": "text",
          "body": ["Primary pumps directly convert ATP, light or other energy into concentration gradients. The secondary carriers shown here use a gradient created by pumps: downhill movement of one substance drives another uphill.", "Channels instead provide rapid passive movement down an electrochemical gradient. Electrical and concentration forces must be considered together. Opening a pore changes access to that gradient; it neither supplies energy nor guarantees movement down the concentration gradient alone. (9:1 PDF p2.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "9:1, PDF page 2. Pump, carrier and channel transport pathways and turnover comparison. Printed labels and axes retained.",
            "fallbackAlt": "9:1, PDF page 2. Pump, carrier and channel transport pathways and turnover comparison. Printed labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L09/ions-02.webp', import.meta.url).href,
              "alt": "9:1, PDF page 2. Pump, carrier and channel transport pathways and turnover comparison. Printed labels and axes retained.",
              "aspect": 1.7562724014336917,
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
          "id": "L09-transport-check",
          "prompt": "Which energy source does a secondary carrier use immediately?",
          "correct": 1,
          "options": [
            {
              "text": "ATP cleavage during every carrier movement",
              "feedback": "Direct ATP use describes primary active transport, not the secondary carrier."
            },
            {
              "text": "A gradient previously established by pumping",
              "feedback": "Secondary carriers use energy stored in a gradient established by pumps."
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
            "A gradient previously established by pumping."
          ]
        },
        {
          "id": "L09-transport-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L09 9:1 p2",
          "prompt": "What distinguishes channel transport from alternating-access carrier transport?",
          "options": [
            {
              "text": "ATP is cleaved for each ion passed",
              "feedback": "Channel permeation is passive and needs no obligatory ATP cleavage per ion."
            },
            {
              "text": "Many ions pass during one opening",
              "feedback": "An open pore permits rapid flow of many ions down their electrochemical gradient."
            },
            {
              "text": "One ion crosses per protein cycle",
              "feedback": "Alternating access describes carriers rather than flow through an open pore."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Recall the distinction taught in this section."
            },
            {
              "body": "An open pore permits rapid flow of many ions down their electrochemical gradient."
            }
          ],
          "modelAnswer": [
            "An open pore permits rapid flow of many ions down their electrochemical gradient."
          ]
        }
      ]
    },
    {
      "id": "channelome",
      "title": "Channelome and cellular functions",
      "keyTerms": [],
      "source": "L09 9:1 p3",
      "blocks": [
        {
          "type": "text",
          "body": ["The channelome is the complete set of channel types, their abundance and their distribution in plasma and organelle membranes. Together they shape excitability, signaling and homeostasis.", "Gating changes membrane potential, cell volume, salt and water handling, and secretion. Thus a cell cannot be described by naming its most prominent channel alone. In the source cell diagram, location matters as well as channel identity because different membranes separate different compartments. (9:1 PDF p3.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "9:1, PDF page 3. Chondrocyte plasma and organelle channel repertoire. Printed labels and axes retained.",
            "fallbackAlt": "9:1, PDF page 3. Chondrocyte plasma and organelle channel repertoire. Printed labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L09/ions-03.webp', import.meta.url).href,
              "alt": "9:1, PDF page 3. Chondrocyte plasma and organelle channel repertoire. Printed labels and axes retained.",
              "aspect": 1.4661399548532732,
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
          "id": "L09-channelome-check",
          "prompt": "Does the channelome include channels that are currently closed?",
          "correct": 0,
          "options": [
            {
              "text": "Channel repertoire, abundance and membrane distribution",
              "feedback": "The channelome includes the repertoire, abundance and distribution, including closed channels."
            },
            {
              "text": "Only the channels conducting at the moment of recording",
              "feedback": "Being closed during one recording does not remove a channel from the channelome."
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
            "Channel repertoire, abundance and membrane distribution."
          ]
        },
        {
          "id": "L09-channelome-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L09 9:1 p3",
          "prompt": "Which membranes are included in the taught channelome?",
          "options": [
            {
              "text": "Plasma and extracellular matrices",
              "feedback": "Extracellular matrix is not a channel-bearing cellular membrane."
            },
            {
              "text": "Organelle and nuclear contents",
              "feedback": "The channelome concerns membrane proteins, not all organelle or nuclear contents."
            },
            {
              "text": "Plasma and organelle membranes",
              "feedback": "The repertoire includes channels in the surface and organelle membranes."
            }
          ],
          "correct": 2,
          "hints": [
            {
              "body": "Recall the distinction taught in this section."
            },
            {
              "body": "The repertoire includes channels in the surface and organelle membranes."
            }
          ],
          "modelAnswer": [
            "The repertoire includes channels in the surface and organelle membranes."
          ]
        }
      ]
    },
    {
      "id": "control",
      "title": "Expression, gating and trafficking",
      "keyTerms": [],
      "source": "L09 9:1 p4",
      "blocks": [
        {
          "type": "text",
          "body": ["Cells regulate channels through expression, gating and trafficking. Expression sets the longer-term repertoire; gating changes whether existing channels conduct; trafficking relocates them between membrane compartments. The source retinal pigment epithelium example moves sodium channels toward phagosomes during photoreceptor outer-segment uptake.", "In the conductance explorer below, channel number, open probability and unitary conductance are separate factors. A smaller population conductance alone cannot identify which factor changed; membrane relocation need not change the pore gene. (9:1 PDF p4.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "9:1, PDF page 4. Side and top views of a ligand-gated pore with membrane boundaries. Printed labels and axes retained.",
            "fallbackAlt": "9:1, PDF page 4. Side and top views of a ligand-gated pore with membrane boundaries. Printed labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L09/ions-04.webp', import.meta.url).href,
              "alt": "9:1, PDF page 4. Side and top views of a ligand-gated pore with membrane boundaries. Printed labels and axes retained.",
              "aspect": 0.454320987654321,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L09-f-conductance",
          "name": "Functional population conductance",
          "tex": "G=NP_{open}\\gamma",
          "symbols": [
            {
              "tex": "G",
              "name": "Population conductance",
              "unit": "\\mathrm S",
              "meaning": "Population conductance in the stated model."
            },
            {
              "tex": "N",
              "name": "Channel count",
              "unit": "1",
              "meaning": "Channel count in the stated model."
            },
            {
              "tex": "P_{open}",
              "name": "Open probability",
              "unit": "1",
              "meaning": "Open probability in the stated model."
            },
            {
              "tex": "\\gamma",
              "name": "Unitary conductance",
              "unit": "\\mathrm S",
              "meaning": "Unitary conductance in the stated model."
            }
          ],
          "reads": "Expression and gating can change the same measured conductance.",
          "assumes": "Identical pores under matched conditions.",
          "variants": [],
          "drill": {
            "prompt": "Use $N=120$, $P_{open}=0.5$ and $\\gamma=3\\times10^{-11}\\,\\mathrm S$. Find population conductance.",
            "answer": {
              "value": 1.8e-09,
              "unit": "S",
              "tolerance": 5.4000000000000004e-12,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 60,
                  "b": 3e-11
                },
                "displayScale": 1
              }
            },
            "tex": "G=120(0.5)(30\\times10^{-12})\\,\\mathrm S",
            "modelAnswer": [
              "Expression and gating can change the same measured conductance."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $G=NP_{open}\\gamma$."
              },
              {
                "body": "Start with $G=120(0.5)(30\\times10^{-12})\\,\\mathrm S$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{G}}={\\htmlClass{formula-term-1}{N}}{\\htmlClass{formula-term-2}{P_{open}}}{\\htmlClass{formula-term-3}{\\gamma}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L09-control-check",
          "prompt": "Which process relocates an already synthesized channel?",
          "correct": 1,
          "options": [
            {
              "text": "Replacement of the channel selectivity sequence",
              "feedback": "A selectivity-sequence change alters the protein; relocation uses trafficking."
            },
            {
              "text": "Trafficking of existing channel proteins",
              "feedback": "Trafficking moves existing channels between membrane compartments."
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
            "Trafficking of existing channel proteins."
          ]
        },
        {
          "id": "L09-control-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L09 9:1 p4",
          "prompt": "Which control changes the fraction of existing channels that are open?",
          "options": [
            {
              "text": "Changing channel gating",
              "feedback": "Gating changes open probability without requiring a new channel protein."
            },
            {
              "text": "Changing gene expression",
              "feedback": "Expression changes the repertoire or abundance rather than directly defining open probability."
            },
            {
              "text": "Changing channel location",
              "feedback": "Trafficking relocates channels; gating controls their open state."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Recall the distinction taught in this section."
            },
            {
              "body": "Gating changes open probability without requiring a new channel protein."
            }
          ],
          "modelAnswer": [
            "Gating changes open probability without requiring a new channel protein."
          ]
        }
      ]
    },
    {
      "id": "kcsa",
      "title": "KcsA architecture and intracellular pH gate",
      "keyTerms": [],
      "source": "L09 9:1 p5",
      "blocks": [
        {
          "type": "text",
          "body": ["KcsA is a bacterial potassium-selective tetramer, with four identical two-helix subunits around a central pore. Each subunit contributes a P-loop to the extracellular selectivity-filter region.", "The intracellular helix bundle forms the gate and responds to intracellular pH. Follow the inside/outside labels in the source structure: changing access at the bundle gate differs from changing which ions the filter favors. KcsA illustrates pore architecture without requiring a voltage-sensor domain. (9:1 PDF p5.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "9:1, PDF page 5. KcsA pore, pore helix, extracellular selectivity filter and cytoplasmic gate. Printed labels and axes retained.",
            "fallbackAlt": "9:1, PDF page 5. KcsA pore, pore helix, extracellular selectivity filter and cytoplasmic gate. Printed labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L09/ions-05.webp', import.meta.url).href,
              "alt": "9:1, PDF page 5. KcsA pore, pore helix, extracellular selectivity filter and cytoplasmic gate. Printed labels and axes retained.",
              "aspect": 0.6581632653061225,
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
          "id": "L09-kcsa-check",
          "prompt": "Which part of KcsA closes at its cytoplasmic entrance?",
          "correct": 0,
          "options": [
            {
              "text": "At the tightly packed cytoplasmic helices",
              "feedback": "The cytoplasmic helices form the gate; intracellular pH regulates KcsA."
            },
            {
              "text": "At the widened extracellular pore entrance",
              "feedback": "The extracellular region contains the filter rather than the cytoplasmic bundle gate."
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
            "At the tightly packed cytoplasmic helices."
          ]
        },
        {
          "id": "L09-kcsa-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L09 9:1 p5",
          "prompt": "Which stimulus regulates the taught KcsA gate?",
          "options": [
            {
              "text": "Extracellular ACh binding",
              "feedback": "Acetylcholine gates the nicotinic receptor, not the taught KcsA gate."
            },
            {
              "text": "Intracellular pH change",
              "feedback": "KcsA is the pH-regulated two-helix potassium channel in this section."
            },
            {
              "text": "Membrane voltage change",
              "feedback": "The six-helix voltage-sensor architecture belongs to voltage-gated channels, not KcsA."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Recall the distinction taught in this section."
            },
            {
              "body": "KcsA is the pH-regulated two-helix potassium channel in this section."
            }
          ],
          "modelAnswer": [
            "KcsA is the pH-regulated two-helix potassium channel in this section."
          ]
        }
      ]
    },
    {
      "id": "permeation",
      "title": "Follow potassium through the pore",
      "keyTerms": [],
      "source": "L09 9:1 p6",
      "blocks": [
        {
          "type": "text",
          "body": ["For the outward passage illustrated, potassium enters the aqueous cavity, loses hydration water at the narrow filter, interacts with carbonyl oxygens, then rehydrates outside. Negative pore-helix charges help attract potassium toward the cavity.", "Filter interactions must compensate for dehydration. Less-selective pores, such as the acetylcholine receptor example, allow ions to remain more hydrated. The drawing follows outward flow for explanation; the pathway can carry inward flow when the electrochemical driving force reverses. (9:1 PDF p6.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "9:1, PDF page 6. Water-filled cavity and carbonyl-coordinated potassium filter. Printed labels and axes retained.",
            "fallbackAlt": "9:1, PDF page 6. Water-filled cavity and carbonyl-coordinated potassium filter. Printed labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L09/ions-06.webp', import.meta.url).href,
              "alt": "9:1, PDF page 6. Water-filled cavity and carbonyl-coordinated potassium filter. Printed labels and axes retained.",
              "aspect": 0.5690515806988353,
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
          "id": "L09-permeation-check",
          "prompt": "Which pore groups coordinate potassium after its water shell is shed?",
          "correct": 1,
          "options": [
            {
              "text": "Hydrophobic lipid tails surrounding the channel",
              "feedback": "Lipid tails do not provide the carbonyl coordination within the selective filter."
            },
            {
              "text": "Coordinating carbonyl oxygens of the channel",
              "feedback": "Filter carbonyl oxygens coordinate potassium in place of its hydration water."
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
            "Coordinating carbonyl oxygens of the channel."
          ]
        },
        {
          "id": "L09-permeation-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L09 9:1 p6",
          "prompt": "How are ions described within the less-selective acetylcholine-receptor pore?",
          "options": [
            {
              "text": "They become fully dehydrated",
              "feedback": "Strong dehydration is characteristic of the narrow potassium filter comparison."
            },
            {
              "text": "They are carried by ATP pumps",
              "feedback": "The receptor is a passive pore, not an ATP-driven carrier."
            },
            {
              "text": "They remain largely hydrated",
              "feedback": "This broader pore passes sodium and potassium largely hydrated."
            }
          ],
          "correct": 2,
          "hints": [
            {
              "body": "Recall the distinction taught in this section."
            },
            {
              "body": "This broader pore passes sodium and potassium largely hydrated."
            }
          ],
          "modelAnswer": [
            "This broader pore passes sodium and potassium largely hydrated."
          ]
        }
      ]
    },
    {
      "id": "filter",
      "title": "Selectivity filter, binding sites and exclusion",
      "keyTerms": [],
      "source": "L09 9:1 p7",
      "blocks": [
        {
          "type": "text",
          "body": ["The KcsA filter contains four main binding sites formed by oxygens associated with the TVGYG sequence. These replace the hydration shell of potassium at low energetic cost. Single-file ions and mutual repulsion support rapid passage.", "Smaller sodium is not automatically admitted: its stronger hydration and poorer fit make replacement of water less favorable. A filter mutation can therefore alter selectivity without simply widening the pore. Compare ion passage or reversal under matched solutions, rather than attributing an amplitude change alone to selectivity. (9:1 PDF p7.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "9:1, PDF page 7. Potassium binding sites S1 through S4 and coordinating carbonyl groups. Printed labels and axes retained.",
            "fallbackAlt": "9:1, PDF page 7. Potassium binding sites S1 through S4 and coordinating carbonyl groups. Printed labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L09/ions-07.webp', import.meta.url).href,
              "alt": "9:1, PDF page 7. Potassium binding sites S1 through S4 and coordinating carbonyl groups. Printed labels and axes retained.",
              "aspect": 1.6842105263157894,
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
          "id": "L09-filter-check",
          "prompt": "Which energetic mismatch can exclude sodium from the potassium filter?",
          "correct": 0,
          "options": [
            {
              "text": "Its dehydration cost is poorly compensated by the filter",
              "feedback": "Selectivity depends on the energetic balance between dehydration and filter coordination."
            },
            {
              "text": "Its smaller bare radius always prevents entering the pore",
              "feedback": "A smaller bare ion can fit geometrically yet remain energetically disfavored."
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
            "Its dehydration cost is poorly compensated by the filter."
          ]
        },
        {
          "id": "L09-filter-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L09 9:1 p7",
          "prompt": "What is the arrangement of potassium ions in the narrow KcsA filter?",
          "options": [
            {
              "text": "A single file of bound ions",
              "feedback": "The filter has consecutive binding sites and supports single-file permeation."
            },
            {
              "text": "A water-filled cluster of ions",
              "feedback": "The aqueous cavity is wider; the narrow filter constrains ions to single file."
            },
            {
              "text": "A carrier-bound pair of ions",
              "feedback": "KcsA is a pore rather than an alternating-access carrier moving a bound pair."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Recall the distinction taught in this section."
            },
            {
              "body": "The filter has consecutive binding sites and supports single-file permeation."
            }
          ],
          "modelAnswer": [
            "The filter has consecutive binding sites and supports single-file permeation."
          ]
        }
      ]
    },
    {
      "id": "hydration",
      "title": "Size, charge, hydration and throughput",
      "keyTerms": [],
      "source": "L09 9:1 p8",
      "blocks": [
        {
          "type": "text",
          "body": ["Ion selectivity depends on size, charge and hydration energy together. Calcium and sodium have similar bare radii, but calcium has twice the charge. In the source comparison, hydration is strongest for calcium, then sodium, then potassium.", "Dehydration costs energy that filter interactions must compensate. Rapid conduction therefore requires selective but brief interactions, rather than permanent binding. For the throughput calculation below, multiply the stated net outward ion rate by charge per ion; include valence when the ions are not monovalent. (9:1 PDF p8.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "9:1, PDF page 8. Bare radii of sodium, calcium, potassium and chloride; hydration shells are not shown. Printed labels and axes retained.",
            "fallbackAlt": "9:1, PDF page 8. Bare radii of sodium, calcium, potassium and chloride; hydration shells are not shown. Printed labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L09/ions-08.webp', import.meta.url).href,
              "alt": "9:1, PDF page 8. Bare radii of sodium, calcium, potassium and chloride; hydration shells are not shown. Printed labels and axes retained.",
              "aspect": 2.219607843137255,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L09-f-throughput",
          "name": "Charge flow from ion throughput",
          "tex": "i=ze\\dot n",
          "symbols": [
            {
              "tex": "i",
              "name": "Outward current",
              "unit": "\\mathrm A",
              "meaning": "Outward current in the stated model."
            },
            {
              "tex": "z",
              "name": "Charge valence",
              "unit": "1",
              "meaning": "Charge valence in the stated model."
            },
            {
              "tex": "e",
              "name": "Elementary charge",
              "unit": "\\mathrm C",
              "meaning": "Elementary charge in the stated model."
            },
            {
              "tex": "\\dot n",
              "name": "Signed ion rate",
              "unit": "\\mathrm{s^{-1}}",
              "meaning": "Signed ion rate in the stated model."
            }
          ],
          "reads": "Rapid microscopic passage can give picoampere currents.",
          "assumes": "A stated unidirectional monovalent-ion rate.",
          "variants": [],
          "drill": {
            "prompt": "An open pore passes $5\\times10^7$ monovalent cations outward per second. Use $e=1.6\\times10^{-19}\\,\\mathrm C$. Find current.",
            "answer": {
              "value": 8e-12,
              "unit": "A",
              "tolerance": 2.4e-14,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 50000000.0,
                  "b": 1.6e-19
                },
                "displayScale": 1
              }
            },
            "tex": "i=(5\\times10^7)(1.6\\times10^{-19})\\,\\mathrm A",
            "modelAnswer": [
              "Rapid microscopic passage can give picoampere currents."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $i=ze\\dot n$."
              },
              {
                "body": "Start with $i=(5\\times10^7)(1.6\\times10^{-19})\\,\\mathrm A$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{i}}={\\htmlClass{formula-term-1}{z}}{\\htmlClass{formula-term-2}{e}}{\\htmlClass{formula-term-3}{\\dot n}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L09-hydration-check",
          "prompt": "Which hydration ordering is taught from strongest to weakest?",
          "correct": 1,
          "options": [
            {
              "text": "Potassium, then sodium, then calcium",
              "feedback": "This reverses the source ordering; calcium is more strongly hydrated than sodium or potassium."
            },
            {
              "text": "Calcium, then sodium, then potassium",
              "feedback": "Higher charge and smaller radius favor stronger hydration in the source comparison."
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
            "Calcium, then sodium, then potassium."
          ]
        },
        {
          "id": "L09-hydration-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L09 9:1 p8",
          "prompt": "What happens energetically when an ion loses its hydration shell?",
          "options": [
            {
              "text": "Energy cost is independent of ion",
              "feedback": "Size and charge affect hydration strength and therefore dehydration cost."
            },
            {
              "text": "Energy must be supplied",
              "feedback": "Dehydration costs energy that favorable filter interactions must compensate."
            },
            {
              "text": "Energy is always released",
              "feedback": "Hydration releases energy; removing the shell requires energy."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Recall the distinction taught in this section."
            },
            {
              "body": "Dehydration costs energy that favorable filter interactions must compensate."
            }
          ],
          "modelAnswer": [
            "Dehydration costs energy that favorable filter interactions must compensate."
          ]
        }
      ]
    },
    {
      "id": "gating",
      "title": "Gating, inactivation and concentration economy",
      "keyTerms": [],
      "source": "L09 9:1 p9",
      "blocks": [
        {
          "type": "text",
          "body": ["Activation opens a resting closed channel; deactivation closes it. An inactivated channel must recover before normal reopening. Opening depends on voltage, time and/or ligand concentration. Apparently abrupt transitions are unresolved at the recording bandwidth, rather than literally instantaneous.", "Brief current can change membrane voltage while bulk concentrations remain approximately unchanged. Multiply signed current by duration for transferred charge, then use the charge-to-voltage explorer. Inward positive charge raises voltage in an isolated capacitor; voltage clamp supplies balancing current instead of permitting that free voltage change. (9:1 PDF p9.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "9:1, PDF page 9. Resting-closed, open and inactivated states with activation, deactivation and recovery arrows. Printed labels and axes retained.",
            "fallbackAlt": "9:1, PDF page 9. Resting-closed, open and inactivated states with activation, deactivation and recovery arrows. Printed labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L09/ions-09.webp', import.meta.url).href,
              "alt": "9:1, PDF page 9. Resting-closed, open and inactivated states with activation, deactivation and recovery arrows. Printed labels and axes retained.",
              "aspect": 1.875,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L09-f-charge",
          "name": "Charge transferred during an opening",
          "tex": "Q=It",
          "symbols": [
            {
              "tex": "Q",
              "name": "Signed outward charge",
              "unit": "\\mathrm C",
              "meaning": "Signed outward charge in the stated model."
            },
            {
              "tex": "I",
              "name": "Constant outward current",
              "unit": "\\mathrm A",
              "meaning": "Constant outward current in the stated model."
            },
            {
              "tex": "t",
              "name": "Open duration",
              "unit": "\\mathrm s",
              "meaning": "Open duration in the stated model."
            }
          ],
          "reads": "Charge accumulates while a channel conducts.",
          "assumes": "Constant current over the stated interval.",
          "variants": [],
          "drill": {
            "prompt": "A channel conducts $-2\\times10^{-12}\\,\\mathrm A$ for $0.003\\,\\mathrm s$. Find signed outward charge.",
            "answer": {
              "value": -6e-15,
              "unit": "C",
              "tolerance": 1.8e-17,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": -2e-12,
                  "b": 0.003
                },
                "displayScale": 1
              }
            },
            "tex": "Q=(-2\\times10^{-12})(3\\times10^{-3})\\,\\mathrm C",
            "modelAnswer": [
              "Charge accumulates while a channel conducts."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $Q=It$."
              },
              {
                "body": "Start with $Q=(-2\\times10^{-12})(3\\times10^{-3})\\,\\mathrm C$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{Q}}={\\htmlClass{formula-term-1}{I}}{\\htmlClass{formula-term-2}{t}}"
        },
        {
          "id": "L09-f-voltage",
          "name": "Voltage from inward capacitive charge",
          "tex": "\\Delta V=Q_{in}/C",
          "symbols": [
            {
              "tex": "V",
              "name": "Voltage change",
              "unit": "\\mathrm V",
              "meaning": "Voltage change in the stated model."
            },
            {
              "tex": "Q_{in}",
              "name": "Positive charge entering",
              "unit": "\\mathrm C",
              "meaning": "Positive charge entering in the stated model."
            },
            {
              "tex": "C",
              "name": "Membrane capacitance",
              "unit": "\\mathrm F",
              "meaning": "Membrane capacitance in the stated model."
            }
          ],
          "reads": "A small charge redistribution can change membrane voltage.",
          "assumes": "Net inward charge goes to the capacitor; outward Q has the opposite sign.",
          "variants": [],
          "drill": {
            "prompt": "Net positive charge $Q_{in}=2\\times10^{-15}\\,\\mathrm C$ enters a $10^{-13}\\,\\mathrm F$ capacitor. Find voltage change.",
            "answer": {
              "value": 0.02,
              "unit": "V",
              "tolerance": 6e-05,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 2e-15,
                  "b": 1e-13
                },
                "displayScale": 1
              }
            },
            "tex": "\\Delta V=(2\\times10^{-15})/(100\\times10^{-15})\\,\\mathrm V",
            "modelAnswer": [
              "A small charge redistribution can change membrane voltage."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\Delta V=Q_{in}/C$."
              },
              {
                "body": "Start with $\\Delta V=(2\\times10^{-15})/(100\\times10^{-15})\\,\\mathrm V$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\Delta {\\htmlClass{formula-term-0}{V}}={\\htmlClass{formula-term-1}{Q_{in}}}/{\\htmlClass{formula-term-2}{C}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L09-gating-check",
          "prompt": "Which channel state is unavailable until recovery?",
          "correct": 0,
          "options": [
            {
              "text": "An inactivated channel following activation",
              "feedback": "Inactivation removes channel availability until recovery occurs."
            },
            {
              "text": "A closed channel awaiting ordinary activation",
              "feedback": "Ordinary activation opens an available closed channel; inactivation requires recovery first."
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
            "An inactivated channel following activation."
          ]
        },
        {
          "id": "L09-gating-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L09 9:1 p9",
          "prompt": "Which transition is called deactivation?",
          "options": [
            {
              "text": "Closed state to open state",
              "feedback": "Closed-to-open is activation, the reverse of deactivation."
            },
            {
              "text": "Inactivated state to available state",
              "feedback": "Recovery restores availability after inactivation; it is a different transition."
            },
            {
              "text": "Open state to closed state",
              "feedback": "Deactivation closes an activated channel."
            }
          ],
          "correct": 2,
          "hints": [
            {
              "body": "Recall the distinction taught in this section."
            },
            {
              "body": "Deactivation closes an activated channel."
            }
          ],
          "modelAnswer": [
            "Deactivation closes an activated channel."
          ]
        }
      ]
    },
    {
      "id": "single",
      "title": "Stochastic single-channel and ensemble currents",
      "keyTerms": [],
      "source": "L09 9:1 p10",
      "blocks": [
        {
          "type": "text",
          "body": ["Repeated identical voltage steps control voltage while measuring current. Individual opening times vary, but averaging trials gives reproducible ensemble kinetics. Negative deflections indicate inward current. The source sodium traces are experimental; the potassium ensemble example is simulated.", "Unitary amplitude depends on conductance and driving force; mean current also depends on channel number and open probability. For identical independent channels, the instantaneous open count is binomial with mean $NP_{open}$; Poisson approximates large $N$, small $P_{open}$. A smaller mean alone cannot distinguish fewer channels from less opening. (9:1 PDF p10.)", "For the count calculation, use $P(k)=\\binom{N}{k}p^k(1-p)^{N-k}$, where $p=P_{open}$ and $k$ is the integer open count. This assumes identical independent channels. (Official exam PDF p4; cumulative HH model.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "9:1, PDF page 10. Source repeated sodium recordings and simulated potassium traces with ensemble means; original command steps and scale bars. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
            "fallbackAlt": "9:1, PDF page 10. Source repeated sodium recordings and simulated potassium traces with ensemble means; original command steps and scale bars. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L09/ions-10.webp', import.meta.url).href,
              "alt": "9:1, PDF page 10. Source repeated sodium recordings and simulated potassium traces with ensemble means; original command steps and scale bars. Printed labels and axes retained.",
              "aspect": 1.2439405785770132,
              "quiz": false,
              "layout": "stack",
              "regions": [],
              "minWidth": 760
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L09-f-unitary",
          "name": "Signed single-channel current",
          "tex": "i=\\gamma(V_m-E)",
          "symbols": [
            {
              "tex": "i",
              "name": "Unitary outward current",
              "unit": "\\mathrm A",
              "meaning": "Unitary outward current in the stated model."
            },
            {
              "tex": "\\gamma",
              "name": "Open-pore conductance",
              "unit": "\\mathrm S",
              "meaning": "Open-pore conductance in the stated model."
            },
            {
              "tex": "V_m",
              "name": "Inside voltage",
              "unit": "\\mathrm V",
              "meaning": "Inside voltage in the stated model."
            },
            {
              "tex": "E",
              "name": "Reversal",
              "unit": "\\mathrm V",
              "meaning": "Reversal in the stated model."
            }
          ],
          "reads": "Current direction follows the signed driving force.",
          "assumes": "Ohmic open pore; fixed ionic solutions.",
          "variants": [],
          "drill": {
            "prompt": "An open channel has $\\gamma=2.5\\times10^{-11}\\,\\mathrm S$ and $V_m-E=-0.060\\,\\mathrm V$. Find current in amperes.",
            "answer": {
              "value": -1.5e-12,
              "unit": "A",
              "tolerance": 4.5000000000000005e-15,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 2.5e-11,
                  "b": -0.06
                },
                "displayScale": 1
              }
            },
            "tex": "i=(25\\times10^{-12})(-0.060)\\,\\mathrm A",
            "modelAnswer": [
              "Current direction follows the signed driving force."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $i=\\gamma(V_m-E)$."
              },
              {
                "body": "Start with $i=(25\\times10^{-12})(-0.060)\\,\\mathrm A$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{i}}={\\htmlClass{formula-term-1}{\\gamma}}({\\htmlClass{formula-term-2}{V_m}}-{\\htmlClass{formula-term-3}{E}})"
        },
        {
          "id": "L09-f-population",
          "name": "Population mean current",
          "tex": "\\langle I\\rangle=NP_{open}i",
          "symbols": [
            {
              "tex": "I",
              "name": "Mean current",
              "unit": "\\mathrm A",
              "meaning": "Mean current in the stated model."
            },
            {
              "tex": "N",
              "name": "Functional channel count",
              "unit": "1",
              "meaning": "Functional channel count in the stated model."
            },
            {
              "tex": "P_{open}",
              "name": "Open probability",
              "unit": "1",
              "meaning": "Open probability in the stated model."
            },
            {
              "tex": "i",
              "name": "Unitary current",
              "unit": "\\mathrm A",
              "meaning": "Unitary current in the stated model."
            }
          ],
          "reads": "Mean current combines number, occupancy and unitary amplitude.",
          "assumes": "Identical independent pores at a fixed voltage.",
          "variants": [],
          "drill": {
            "prompt": "For $N=80$, $P_{open}=0.25$ and $i=-2\\times10^{-12}\\,\\mathrm A$, find mean current.",
            "answer": {
              "value": -4e-11,
              "unit": "A",
              "tolerance": 1.2e-13,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 20.0,
                  "b": -2e-12
                },
                "displayScale": 1
              }
            },
            "tex": "I=80(0.25)(-2\\times10^{-12})\\,\\mathrm A",
            "modelAnswer": [
              "Mean current combines number, occupancy and unitary amplitude."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\langle I\\rangle=NP_{open}i$."
              },
              {
                "body": "Start with $I=80(0.25)(-2\\times10^{-12})\\,\\mathrm A$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "\\langle {\\htmlClass{formula-term-0}{I}}\\rangle={\\htmlClass{formula-term-1}{N}}{\\htmlClass{formula-term-2}{P_{open}}}{\\htmlClass{formula-term-3}{i}}"
        },
        {
          "id": "L09-f-slope",
          "name": "Open-pore conductance from a unitary I–V slope",
          "tex": "\\gamma=\\Delta i/\\Delta V",
          "symbols": [
            {
              "tex": "\\gamma",
              "name": "Unitary conductance",
              "unit": "\\mathrm S",
              "meaning": "Unitary conductance in the stated model."
            },
            {
              "tex": "i",
              "name": "Current difference",
              "unit": "\\mathrm A",
              "meaning": "Current difference in the stated model."
            },
            {
              "tex": "V",
              "name": "Voltage difference",
              "unit": "\\mathrm V",
              "meaning": "Voltage difference in the stated model."
            }
          ],
          "reads": "The slope separates open-pore amplitude from occupancy.",
          "assumes": "Linear open pore under unchanged ionic conditions.",
          "variants": [],
          "drill": {
            "prompt": "Unitary current changes by $2\\times10^{-12}\\,\\mathrm A$ across $0.080\\,\\mathrm V$. Find conductance.",
            "answer": {
              "value": 2.5e-11,
              "unit": "S",
              "tolerance": 7.500000000000001e-14,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 2e-12,
                  "b": 0.08
                },
                "displayScale": 1
              }
            },
            "tex": "\\gamma=(2\\times10^{-12})/0.080\\,\\mathrm S",
            "modelAnswer": [
              "The slope separates open-pore amplitude from occupancy."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $\\gamma=\\Delta i/\\Delta V$."
              },
              {
                "body": "Start with $\\gamma=(2\\times10^{-12})/0.080\\,\\mathrm S$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{\\gamma}}=\\Delta {\\htmlClass{formula-term-1}{i}}/\\Delta {\\htmlClass{formula-term-2}{V}}"
        },
        {
          "id": "L09-f-binomial",
          "name": "Binomial open-channel probability",
          "tex": "P_n(k)=\\frac{n!}{k!(n-k)!}p^k(1-p)^{n-k}",
          "symbols": [
            {
              "tex": "P_n(k)",
              "name": "Probability",
              "unit": "1",
              "meaning": "Probability that exactly k of n channels are simultaneously open."
            },
            {
              "tex": "n",
              "name": "Channel count",
              "unit": "1",
              "meaning": "Total number of independent identical channels."
            },
            {
              "tex": "k",
              "name": "Open count",
              "unit": "1",
              "meaning": "Number simultaneously open; a non-negative integer no greater than n."
            },
            {
              "tex": "p",
              "name": "Per-channel open probability",
              "unit": "1",
              "meaning": "Open probability for each channel; equals $P_{open}$ in the stated model."
            }
          ],
          "reads": "The combinatorial factor counts all ways k channels can be open; $p^k$ and $(1-p)^{n-k}$ supply independent per-channel probabilities. This is the same logic as $n_\\infty^4$ for a $\\mathrm{K}^+$ channel with four gating particles each of probability $n_\\infty$.",
          "assumes": "n identical independent channels; p is the same for every channel.",
          "variants": [],
          "drill": {
            "prompt": "A $\\mathrm{K}^+$ channel is treated as $n=4$ independent activation particles each with $p=0.80$. Find $P(k=3)$, the probability that exactly 3 of 4 are permissive.",
            "answer": {
              "value": 0.4096,
              "unit": "1",
              "tolerance": 0.0020480000000000008,
              "verification": {
                "relation": "binomialProb",
                "inputs": {
                  "n": 4,
                  "k": 3,
                  "p": 0.8
                },
                "displayScale": 1
              }
            },
            "tex": "P_n(3;4,0.80)=\\binom{4}{3}(0.80)^3(0.20)^1=4(0.512)(0.20)=0.4096",
            "modelAnswer": [
              "Combinatorial factor $\\binom{4}{3}=4$; then $4\\times0.80^3\\times0.20=0.4096$."
            ],
            "error": "Check the combinatorial factor and the exponents.",
            "hints": [
              {
                "body": "Use $P_n(k)=\\frac{n!}{k!(n-k)!}p^k(1-p)^{n-k}$ with $n=4$, $k=3$, $p=0.80$."
              },
              {
                "body": "$\\binom{4}{3}=4$; then $4\\times0.80^3\\times0.20=4\\times0.512\\times0.20=0.4096$."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{P_n(k)}=\\frac{\\htmlClass{formula-term-1}{n}!}{\\htmlClass{formula-term-2}{k}!(n-k)!}\\htmlClass{formula-term-3}{p}^k(1-p)^{n-k}"
        },
        {
          "id": "L09-f-poisson",
          "name": "Poisson approximation for open channels",
          "tex": "P(k)=\\frac{m^ke^{-m}}{k!}",
          "symbols": [
            {
              "tex": "P(k)",
              "name": "Probability",
              "unit": "1",
              "meaning": "Probability of exactly k open channels."
            },
            {
              "tex": "m",
              "name": "Mean open channels",
              "unit": "1",
              "meaning": "Expected number open; $m = n \\cdot P_{open}$."
            },
            {
              "tex": "k",
              "name": "Open count",
              "unit": "1",
              "meaning": "Exact number simultaneously open; a non-negative integer."
            }
          ],
          "reads": "The mean m replaces n and p; this approximation is best when n is large and p is small so $m=np$ is moderate.",
          "assumes": "Poisson limit of the binomial; $m = n P_{open}$; large n, small p.",
          "variants": [],
          "drill": {
            "prompt": "A resting patch has 1000 $\\mathrm{Na}^+$ channels. At rest $P_{open}=0.003$ so the mean is $m=3$. Find $P(k=0)$, the probability that all channels are closed at a given instant.",
            "answer": {
              "value": 0.049787068367863944,
              "unit": "1",
              "tolerance": 0.00024893534183931975,
              "verification": {
                "relation": "poissonProb",
                "inputs": {
                  "m": 3.0,
                  "k": 0
                },
                "displayScale": 1
              }
            },
            "tex": "P(0)=\\frac{3^0e^{-3}}{0!}=e^{-3}\\approx0.0498",
            "modelAnswer": [
              "$P(0)=e^{-m}=e^{-3}\\approx0.0498$."
            ],
            "error": "For k=0 the formula simplifies to $e^{-m}$; check that you used $m=3$.",
            "hints": [
              {
                "body": "Use $P(k)=m^ke^{-m}/k!$ with $m=3$, $k=0$."
              },
              {
                "body": "$P(0)=3^0e^{-3}/0!=e^{-3}\\approx0.0498$."
              }
            ]
          },
          "interactiveTex": "\\htmlClass{formula-term-0}{P(k)}=\\frac{\\htmlClass{formula-term-1}{m}^{\\htmlClass{formula-term-2}{k}}e^{-m}}{k!}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L09-single-check",
          "prompt": "Which feature of a unitary recording remains stochastic under an identical clamp command?",
          "correct": 1,
          "options": [
            {
              "text": "The command voltage imposed by an ideal voltage clamp",
              "feedback": "An ideal voltage clamp holds the same command across trials; channel events remain random."
            },
            {
              "text": "The opening and closing times of individual channels",
              "feedback": "Individual openings and closings are stochastic even under identical commands."
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
            "The opening and closing times of individual channels."
          ]
        },
        {
          "id": "L09-single-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L09 9:1 p10",
          "prompt": "At fixed voltage and solutions, what does an ensemble average summarize?",
          "options": [
            {
              "text": "Mean current across repeated trials",
              "feedback": "Averaging stochastic openings produces a smoother mean current response."
            },
            {
              "text": "Opening time of each single trial",
              "feedback": "Individual opening times vary; the average does not fix each trial."
            },
            {
              "text": "Command voltage across repeated trials",
              "feedback": "The command is controlled; the ensemble average here concerns the measured current."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Recall the distinction taught in this section."
            },
            {
              "body": "Averaging stochastic openings produces a smoother mean current response."
            }
          ],
          "modelAnswer": [
            "Averaging stochastic openings produces a smoother mean current response."
          ]
        }
      ]
    },
    {
      "id": "classification",
      "title": "Pore-forming and auxiliary subunits",
      "keyTerms": [],
      "source": "L09 9:1 p11",
      "blocks": [
        {
          "type": "text",
          "body": ["Channel classifications answer different questions: selectivity identifies permeating ions, gating identifies triggers, and structural families describe protein architecture and relationships. Location and drug sensitivity supply further classifications.", "Pore-forming alpha subunits differ from auxiliary subunits that usually regulate gating, expression or stability. The pore is often central between subunits or domains, but some families have pores within individual subunits. Do not infer a universal pore arrangement from the sodium-channel cartoon alone. (9:1 PDF p11.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "9:1, PDF page 11. Sodium alpha pore protein, auxiliary beta subunits and modulator sites. Printed labels and axes retained.",
            "fallbackAlt": "9:1, PDF page 11. Sodium alpha pore protein, auxiliary beta subunits and modulator sites. Printed labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L09/ions-11.webp', import.meta.url).href,
              "alt": "9:1, PDF page 11. Sodium alpha pore protein, auxiliary beta subunits and modulator sites. Printed labels and axes retained.",
              "aspect": 0.9508928571428571,
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
          "id": "L09-classification-check",
          "prompt": "Which component supplies the usual permeation pathway?",
          "correct": 0,
          "options": [
            {
              "text": "The pore-forming alpha subunit or linked domains",
              "feedback": "Alpha subunits or linked domains supply the conducting pathway."
            },
            {
              "text": "The non-pore-forming auxiliary beta subunit",
              "feedback": "Auxiliary beta subunits usually regulate the complex without forming its pore."
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
            "The pore-forming alpha subunit or linked domains."
          ]
        },
        {
          "id": "L09-classification-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L09 9:1 p11",
          "prompt": "Which role is usually assigned to auxiliary beta subunits?",
          "options": [
            {
              "text": "Generation of the ionic gradient",
              "feedback": "Pumps establish gradients; auxiliary subunits modulate the channel complex."
            },
            {
              "text": "Modulation of gating and stability",
              "feedback": "Auxiliary subunits tune gating, voltage dependence or stability."
            },
            {
              "text": "Formation of the central ionic pore",
              "feedback": "The alpha subunit or linked pore-forming domains usually supply the pore."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Recall the distinction taught in this section."
            },
            {
              "body": "Auxiliary subunits tune gating, voltage dependence or stability."
            }
          ],
          "modelAnswer": [
            "Auxiliary subunits tune gating, voltage dependence or stability."
          ]
        }
      ]
    },
    {
      "id": "evolution",
      "title": "Pore duplication and voltage-sensor additions",
      "keyTerms": [],
      "source": "L09 9:1 p12",
      "blocks": [
        {
          "type": "text",
          "body": ["The source schematic starts with a two-helix pore module. Duplication gives additional pore modules, while addition of S1–S4 gives a six-helix subunit with a voltage-sensor domain. Positive S4 charges support voltage sensitivity.", "Further duplication links four homologous domains in vertebrate sodium and calcium channels. Count domains separately from independently assembled subunits. The diagram is a schematic relationship among channel architectures, rather than evidence that every family followed one universal evolutionary sequence. (9:1 PDF p12.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "9:1, PDF page 12. Source schematic pore/sensor duplication and cation-channel topology families. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
            "fallbackAlt": "9:1, PDF page 12. Source schematic pore/sensor duplication and cation-channel topology families. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L09/ions-12.webp', import.meta.url).href,
              "alt": "9:1, PDF page 12. Source schematic pore/sensor duplication and cation-channel topology families. Printed labels and axes retained.",
              "aspect": 1.3454545454545455,
              "quiz": false,
              "layout": "stack",
              "regions": [],
              "minWidth": 760
            }
          }
        }
      ],
      "formulas": [],
      "conceptQuiz": [
        {
          "id": "L09-evolution-check",
          "prompt": "What charge property makes S4 a voltage sensor?",
          "correct": 1,
          "options": [
            {
              "text": "Positive residues carrying ions through the open pore",
              "feedback": "Sensor residues move within the field; permeant ions carry the separate ionic current."
            },
            {
              "text": "Positive residues moving within the membrane field",
              "feedback": "Charged S4 residues respond to the membrane field, coupling voltage to gating."
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
            "Positive residues moving within the membrane field."
          ]
        },
        {
          "id": "L09-evolution-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L09 9:1 p12",
          "prompt": "In the source schematic, what is added to the two-helix pore module to make a six-helix module?",
          "options": [
            {
              "text": "A second complete S5–S6 pore",
              "feedback": "Pore duplication gives a different schematic topology, not the S1–S4 sensor addition."
            },
            {
              "text": "Four separate auxiliary subunits",
              "feedback": "Auxiliary subunits are distinct proteins, not the four added helices of this module."
            },
            {
              "text": "The S1–S4 sensor segments",
              "feedback": "Adding S1–S4 to S5–S6 makes the six-helix module."
            }
          ],
          "correct": 2,
          "hints": [
            {
              "body": "Recall the distinction taught in this section."
            },
            {
              "body": "Adding S1–S4 to S5–S6 makes the six-helix module."
            }
          ],
          "modelAnswer": [
            "Adding S1–S4 to S5–S6 makes the six-helix module."
          ]
        }
      ]
    },
    {
      "id": "evolution-other",
      "title": "Ligand-binding and other channel lineages",
      "keyTerms": [],
      "source": "L09 9:1 p13",
      "blocks": [
        {
          "type": "text",
          "body": ["Adding a glutamate-binding domain provides chemical sensitivity to a channel lineage. The source also depicts duplication of a three-membrane-segment module in the water-channel lineage, illustrating another route to a larger protein.", "Chloride, ammonia and connexin architectures broaden the comparison beyond potassium channels. Read each topology and assembly separately: acquiring ligand sensitivity changes the gating input, whereas duplicating a membrane module changes architecture. Neither statement alone specifies which ions or molecules will pass. (9:1 PDF p13.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "9:1, PDF page 13. Source ligand, chloride, water, ammonia and connexin lineage/topology schematic. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
            "fallbackAlt": "9:1, PDF page 13. Source ligand, chloride, water, ammonia and connexin lineage/topology schematic. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L09/ions-13.webp', import.meta.url).href,
              "alt": "9:1, PDF page 13. Source ligand, chloride, water, ammonia and connexin lineage/topology schematic. Printed labels and axes retained.",
              "aspect": 1.6182336182336183,
              "quiz": false,
              "layout": "stack",
              "regions": [],
              "minWidth": 760
            }
          }
        }
      ],
      "formulas": [],
      "conceptQuiz": [
        {
          "id": "L09-evolution-other-check",
          "prompt": "What function does the source glutamate-binding addition supply?",
          "correct": 0,
          "options": [
            {
              "text": "Chemical recognition coupled to pore opening",
              "feedback": "A binding domain adds chemical recognition that can control the pore."
            },
            {
              "text": "Chemical recognition without coupling to pore gating",
              "feedback": "The source binding domain couples chemical recognition to gating, not recognition alone."
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
            "Chemical recognition coupled to pore opening."
          ]
        },
        {
          "id": "L09-evolution-other-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L09 9:1 p13",
          "prompt": "Which process makes repeated channel modules in the source lineage schematic?",
          "options": [
            {
              "text": "Duplication of a channel gene",
              "feedback": "Gene duplication produces repeated inherited modules in the schematic."
            },
            {
              "text": "Opening of a channel gate",
              "feedback": "Gating changes a protein state, not the number of inherited modules."
            },
            {
              "text": "Trafficking of a channel protein",
              "feedback": "Trafficking relocates proteins without duplicating their genes."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Recall the distinction taught in this section."
            },
            {
              "body": "Gene duplication produces repeated inherited modules in the schematic."
            }
          ],
          "modelAnswer": [
            "Gene duplication produces repeated inherited modules in the schematic."
          ]
        }
      ]
    },
    {
      "id": "families",
      "title": "Structural family reference",
      "keyTerms": [],
      "source": "L09 9:1 p14",
      "blocks": [
        {
          "type": "text",
          "body": ["The source taxonomy groups channels by membrane topology and pore organization. It includes one-helix M2, two-helix examples, S5–S6/P-loop families, extracellular ligand-gated channels, and separate chloride, water, ammonia and connexin families.", "Counts refer to each pore-forming subunit, or each domain in vertebrate sodium/calcium channels. Count regulatory subunits separately. For a family match, first identify the pore architecture rather than using the gating stimulus alone; similar stimuli need not imply identical protein topology. (9:1 PDF p14.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "9:1, PDF page 14. Structural-family taxonomy retained as a source reference table. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
            "fallbackAlt": "9:1, PDF page 14. Structural-family taxonomy retained as a source reference table. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L09/ions-14.webp', import.meta.url).href,
              "alt": "9:1, PDF page 14. Structural-family taxonomy retained as a source reference table. Printed labels and axes retained.",
              "aspect": 2.0577617328519855,
              "quiz": false,
              "layout": "stack",
              "regions": [],
              "minWidth": 760
            }
          }
        }
      ],
      "formulas": [],
      "conceptQuiz": [
        {
          "id": "L09-families-check",
          "prompt": "What unit of sodium-channel architecture does the six-helix count describe?",
          "correct": 1,
          "options": [
            {
              "text": "Per complete channel including every auxiliary subunit",
              "feedback": "Auxiliary proteins are not included in each homologous domain helix count."
            },
            {
              "text": "Per homologous domain of the linked alpha subunit",
              "feedback": "The linked sodium alpha protein contains four homologous six-helix domains."
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
            "Per homologous domain of the linked alpha subunit."
          ]
        },
        {
          "id": "L09-families-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L09 9:1 p14",
          "prompt": "Which source family contains gap-junction channels?",
          "options": [
            {
              "text": "The bestrophin channel family",
              "feedback": "Bestrophins are grouped with chloride channels in the source list."
            },
            {
              "text": "The connexin channel family",
              "feedback": "Connexins form the source gap-junction channels."
            },
            {
              "text": "The aquaporin channel family",
              "feedback": "Aquaporins are the water-channel comparison, not connexin gap junctions."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Recall the distinction taught in this section."
            },
            {
              "body": "Connexins form the source gap-junction channels."
            }
          ],
          "modelAnswer": [
            "Connexins form the source gap-junction channels."
          ]
        }
      ]
    },
    {
      "id": "stimuli",
      "title": "Voltage, ligand, mechanical and multimodal gating",
      "keyTerms": [],
      "source": "L09 9:1 p15",
      "blocks": [
        {
          "type": "text",
          "body": ["Voltage, ligand binding and mechanical disturbance can alter opening probability. Ligands may act outside or inside the cell. Multimodal channels respond to several cues with different sensitivities.", "Classify a trigger by the physical signal named in the question: voltage change, chemical binding or mechanical force. This does not classify the ions carried. A channel can be both chemically gated and cation-permeable, and one channel need not belong to only one stimulus class. (9:1 PDF p15.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "9:1, PDF page 15. Voltage, extracellular-ligand, intracellular-ligand and mechanical gating comparisons. Printed labels and axes retained.",
            "fallbackAlt": "9:1, PDF page 15. Voltage, extracellular-ligand, intracellular-ligand and mechanical gating comparisons. Printed labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L09/ions-15.webp', import.meta.url).href,
              "alt": "9:1, PDF page 15. Voltage, extracellular-ligand, intracellular-ligand and mechanical gating comparisons. Printed labels and axes retained.",
              "aspect": 1.1192307692307693,
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
          "id": "L09-stimuli-check",
          "prompt": "Are voltage, ligand and mechanical gating categories allowed to overlap?",
          "correct": 0,
          "options": [
            {
              "text": "Yes, channels can have multimodal gating",
              "feedback": "Multimodal channels respond to more than one chemical or physical stimulus class."
            },
            {
              "text": "No, gating classes are always mutually exclusive",
              "feedback": "Gating categories can overlap; the source explicitly includes multimodal channels."
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
            "Yes, channels can have multimodal gating."
          ]
        },
        {
          "id": "L09-stimuli-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L09 9:1 p15",
          "prompt": "What directly stimulates a mechanically gated channel?",
          "options": [
            {
              "text": "A chemical ligand binding event",
              "feedback": "Ligand binding defines chemical gating, although channels may be multimodal."
            },
            {
              "text": "An electrical voltage change alone",
              "feedback": "Voltage changes define voltage gating rather than mechanical gating."
            },
            {
              "text": "A mechanical membrane disturbance",
              "feedback": "Mechanical disturbance is the defining input for this gating class."
            }
          ],
          "correct": 2,
          "hints": [
            {
              "body": "Recall the distinction taught in this section."
            },
            {
              "body": "Mechanical disturbance is the defining input for this gating class."
            }
          ],
          "modelAnswer": [
            "Mechanical disturbance is the defining input for this gating class."
          ]
        }
      ]
    },
    {
      "id": "cation",
      "title": "Voltage-gated cation channel organization",
      "keyTerms": [],
      "source": "L09 9:1 p16",
      "blocks": [
        {
          "type": "text",
          "body": ["Potassium channels assemble four alpha subunits; vertebrate sodium and calcium channels link four homologous six-helix domains in one alpha polypeptide. Bacterial sodium/calcium channels can instead assemble four identical subunits. Auxiliary subunits are additional components.", "Coordinated sensor movement activates the pore. The source peptide-occlusion model explains some rapid inactivation, not every channel. The probability explorer below assumes independent all-required factors explicitly; anatomical subunit or domain counts alone do not establish that mathematical independence. (9:1 PDF p16.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "9:1, PDF page 16. Linked domains, activation curve and the source pore-occlusion model. Printed labels and axes retained.",
            "fallbackAlt": "9:1, PDF page 16. Linked domains, activation curve and the source pore-occlusion model. Printed labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L09/ions-16.webp', import.meta.url).href,
              "alt": "9:1, PDF page 16. Linked domains, activation curve and the source pore-occlusion model. Printed labels and axes retained.",
              "aspect": 0.9422382671480144,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L09-f-independent",
          "name": "All-required independent gates",
          "tex": "P=y^k",
          "symbols": [
            {
              "tex": "P",
              "name": "Whole-channel probability",
              "unit": "1",
              "meaning": "Whole-channel probability in the stated model."
            },
            {
              "tex": "y",
              "name": "Single-factor probability",
              "unit": "1",
              "meaning": "Single-factor probability in the stated model."
            },
            {
              "tex": "k",
              "name": "Required factor count",
              "unit": "1",
              "meaning": "Required factor count in the stated model."
            }
          ],
          "reads": "Required independent factors multiply.",
          "assumes": "Ideal identical independent factors; not inferred from subunit count alone.",
          "variants": [],
          "drill": {
            "prompt": "An explicitly ideal channel needs four independent permissive factors with probability $y=0.8$. Find open probability.",
            "answer": {
              "value": 0.4096,
              "unit": "",
              "tolerance": 0.0012288000000000002,
              "verification": {
                "relation": "gatePower",
                "inputs": {
                  "y": 0.8,
                  "count": 4
                },
                "displayScale": 1
              }
            },
            "tex": "P=0.8^4",
            "modelAnswer": [
              "Required independent factors multiply."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $P=y^k$."
              },
              {
                "body": "Start with $P=0.8^4$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{P}}={\\htmlClass{formula-term-1}{y}}^{\\htmlClass{formula-term-2}{k}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L09-cation-check",
          "prompt": "Which repeating units belong to a vertebrate sodium alpha polypeptide?",
          "correct": 1,
          "options": [
            {
              "text": "Four independent two-helix membrane proteins",
              "feedback": "Independent two-helix proteins describe a different architecture from vertebrate sodium alpha."
            },
            {
              "text": "Four homologous six-helix membrane domains",
              "feedback": "Vertebrate sodium alpha links four homologous six-helix domains in one polypeptide."
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
            "Four homologous six-helix membrane domains."
          ]
        },
        {
          "id": "L09-cation-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L09 9:1 p16",
          "prompt": "Where is the taught fast-inactivation peptide in a sodium channel?",
          "options": [
            {
              "text": "In a loop between linked domains",
              "feedback": "The source places the sodium inactivation peptide in an interdomain loop."
            },
            {
              "text": "In the extracellular selectivity filter",
              "feedback": "The filter selects permeating ions; it is not the taught peptide location."
            },
            {
              "text": "In a separate pore-forming subunit",
              "feedback": "The sodium alpha protein links its domains; the taught peptide is part of that protein."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Recall the distinction taught in this section."
            },
            {
              "body": "The source places the sodium inactivation peptide in an interdomain loop."
            }
          ],
          "modelAnswer": [
            "The source places the sodium inactivation peptide in an interdomain loop."
          ]
        }
      ]
    },
    {
      "id": "sensor",
      "title": "Voltage sensor versus pore domain",
      "keyTerms": [],
      "source": "L09 9:1 p17",
      "blocks": [
        {
          "type": "text",
          "body": ["S1–S4 form the voltage-sensor domain; S5–S6 and the P-loop form the pore and filter. Depolarization favors outward movement of positive S4 residues, producing gating current and a conformational change that opens the pore.", "Sensor charge movement differs from ion permeation through the aqueous pathway. An S4 change can shift voltage-dependent opening, whereas a filter change can alter selectivity and reversal under matched gradients. A gating-current measurement therefore does not directly measure ionic selectivity. (9:1 PDF p17.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "9:1, PDF page 17. Six-helix potassium subunit, tetrameric pore and closed/open sensor coupling. Printed labels and axes retained.",
            "fallbackAlt": "9:1, PDF page 17. Six-helix potassium subunit, tetrameric pore and closed/open sensor coupling. Printed labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L09/ions-17.webp', import.meta.url).href,
              "alt": "9:1, PDF page 17. Six-helix potassium subunit, tetrameric pore and closed/open sensor coupling. Printed labels and axes retained.",
              "aspect": 1.5087108013937283,
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
          "id": "L09-sensor-check",
          "prompt": "Where are the positive voltage-sensing residues in the source architecture?",
          "correct": 0,
          "options": [
            {
              "text": "S4 in the peripheral voltage-sensor domain",
              "feedback": "S4 carries the positive voltage-sensing residues in the S1–S4 domain."
            },
            {
              "text": "S6 in the central ion-selectivity filter",
              "feedback": "S6 belongs to the pore domain; the P-loop rather than S6 supplies the filter."
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
            "S4 in the peripheral voltage-sensor domain."
          ]
        },
        {
          "id": "L09-sensor-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L09 9:1 p17",
          "prompt": "Which region forms the selectivity filter in the source potassium channel?",
          "options": [
            {
              "text": "The cytoplasmic end of S1",
              "feedback": "S1 belongs to the sensor domain, not the filter-forming P-loop."
            },
            {
              "text": "The P-loop between S5 and S6",
              "feedback": "The P-loop belongs to the pore domain and supplies the filter."
            },
            {
              "text": "The S4 helix within S1–S4",
              "feedback": "S4 is the voltage sensor; its charge motion differs from ionic selection."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Recall the distinction taught in this section."
            },
            {
              "body": "The P-loop belongs to the pore domain and supplies the filter."
            }
          ],
          "modelAnswer": [
            "The P-loop belongs to the pore domain and supplies the filter."
          ]
        }
      ]
    },
    {
      "id": "nav",
      "title": "Sodium subtypes and auxiliary functions",
      "keyTerms": [],
      "source": "L09 9:1 p18",
      "blocks": [
        {
          "type": "text",
          "body": ["The source lists nine sodium-channel family members. Adult sensory neurons express several subtypes, with NaV1.7, NaV1.8 and NaV1.9 emphasized in pain signaling. Their contributions should be read in the source action-potential panel rather than treated as interchangeable labels.", "Beta subunits regulate gating and expression and participate in adhesion and cytoskeletal interactions. Thus altered sodium current may reflect regulation of the alpha pore as well as the pore itself; an auxiliary subunit need not conduct ions to affect excitability. (9:1 PDF p18.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "9:1, PDF page 18. Source sodium subtype contributions around an action-potential waveform. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
            "fallbackAlt": "9:1, PDF page 18. Source sodium subtype contributions around an action-potential waveform. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L09/ions-18.webp', import.meta.url).href,
              "alt": "9:1, PDF page 18. Source sodium subtype contributions around an action-potential waveform. Printed labels and axes retained.",
              "aspect": 1.7809439002671417,
              "quiz": false,
              "layout": "stack",
              "regions": [],
              "minWidth": 760
            }
          }
        }
      ],
      "formulas": [],
      "conceptQuiz": [
        {
          "id": "L09-nav-check",
          "prompt": "Which sodium subtype set is highlighted for pain pathways?",
          "correct": 1,
          "options": [
            {
              "text": "Only the cardiac NaV1.5 channel subtype",
              "feedback": "NaV1.5 is the cardiac comparison rather than the emphasized pain subtype group."
            },
            {
              "text": "NaV1.7, NaV1.8 and NaV1.9 channels",
              "feedback": "The source emphasizes NaV1.7, NaV1.8 and NaV1.9 in pain signaling."
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
            "NaV1.7, NaV1.8 and NaV1.9 channels."
          ]
        },
        {
          "id": "L09-nav-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L09 9:1 p18",
          "prompt": "Which function of sodium-channel beta subunits extends beyond gating?",
          "options": [
            {
              "text": "ATP hydrolysis and gradient maintenance",
              "feedback": "Pumping gradients is not a beta-subunit function in this model."
            },
            {
              "text": "Pore formation and ionic permeation",
              "feedback": "The sodium alpha protein forms the conducting pore; beta subunits modulate it."
            },
            {
              "text": "Cell adhesion and cytoskeletal interaction",
              "feedback": "The source beta functions include adhesion and cytoskeletal interactions."
            }
          ],
          "correct": 2,
          "hints": [
            {
              "body": "Recall the distinction taught in this section."
            },
            {
              "body": "The source beta functions include adhesion and cytoskeletal interactions."
            }
          ],
          "modelAnswer": [
            "The source beta functions include adhesion and cytoskeletal interactions."
          ]
        }
      ]
    },
    {
      "id": "kv",
      "title": "Delayed rectifier, A-type and M-type currents",
      "keyTerms": [],
      "source": "L09 9:1 p19",
      "blocks": [
        {
          "type": "text",
          "body": ["Delayed rectifiers activate after depolarization and inactivate slowly or little. A-type currents activate rapidly and then inactivate rapidly. M-type currents activate slowly without inactivation.", "Compare the time course during the same depolarizing step: a transient peak followed by decay differs from a sustained or slowly rising response. Peak amplitude alone cannot identify these kinetic types. Potassium channels form homo- or heterotetramers, and auxiliary subunits can further modify gating, expression and trafficking. (9:1 PDF p19.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "9:1, PDF page 19. Delayed rectifier, transient A-type and sustained M-type source currents. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
            "fallbackAlt": "9:1, PDF page 19. Delayed rectifier, transient A-type and sustained M-type source currents. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L09/ions-19.webp', import.meta.url).href,
              "alt": "9:1, PDF page 19. Delayed rectifier, transient A-type and sustained M-type source currents. Printed labels and axes retained.",
              "aspect": 1.8355263157894737,
              "quiz": false,
              "layout": "stack",
              "regions": [],
              "minWidth": 760
            }
          }
        }
      ],
      "formulas": [],
      "conceptQuiz": [
        {
          "id": "L09-kv-check",
          "prompt": "Which potassium-current class gives rapid activation followed by rapid inactivation?",
          "correct": 0,
          "options": [
            {
              "text": "The transient A-type potassium current",
              "feedback": "A-type current activates and inactivates rapidly, giving a transient response."
            },
            {
              "text": "The sustained M-type potassium current",
              "feedback": "M-type current activates slowly and does not inactivate in the source description."
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
            "The transient A-type potassium current."
          ]
        },
        {
          "id": "L09-kv-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L09 9:1 p19",
          "prompt": "Which kinetic description identifies the taught M-type current?",
          "options": [
            {
              "text": "Slow activation without inactivation",
              "feedback": "The source M-type description is slowly activating and non-inactivating."
            },
            {
              "text": "Rapid activation with fast inactivation",
              "feedback": "Rapid activation and inactivation describe A-type current."
            },
            {
              "text": "Delayed activation with fast inactivation",
              "feedback": "The delayed rectifier inactivates slowly or not at all, not rapidly."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Recall the distinction taught in this section."
            },
            {
              "body": "The source M-type description is slowly activating and non-inactivating."
            }
          ],
          "modelAnswer": [
            "The source M-type description is slowly activating and non-inactivating."
          ]
        }
      ]
    },
    {
      "id": "trp",
      "title": "TRP architecture and multimodal sensing",
      "keyTerms": [],
      "source": "L09 9:1 p20",
      "blocks": [
        {
          "type": "text",
          "body": ["TRP channels commonly assemble four six-helix subunits with P-loop filters. Many conduct sodium and calcium while the ions remain partly hydrated. The source contrasts their S4 charge pattern with canonical voltage sensors, giving generally weaker voltage dependence.", "Temperature, chemicals, osmotic changes and mechanical stimuli can act on these multimodal channels. Their sensory roles include pain, temperature, taste, mechanosensation and vision. Shared architecture does not mean identical stimulus sensitivity, and the source generalizations need not describe every TRP member. (9:1 PDF p20.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "9:1, PDF page 20. TRP channel structural models with sensor and pore modules. Printed labels and axes retained.",
            "fallbackAlt": "9:1, PDF page 20. TRP channel structural models with sensor and pore modules. Printed labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L09/ions-20.webp', import.meta.url).href,
              "alt": "9:1, PDF page 20. TRP channel structural models with sensor and pore modules. Printed labels and axes retained.",
              "aspect": 1.9681274900398407,
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
          "id": "L09-trp-check",
          "prompt": "Which description summarizes the taught TRP gating and permeation properties?",
          "correct": 1,
          "options": [
            {
              "text": "Uniformly potassium-selective, strongly voltage-dependent pores",
              "feedback": "The source TRP generalization is weak voltage dependence and broad cation permeation."
            },
            {
              "text": "Multimodal, often weakly voltage-dependent cation pores",
              "feedback": "Multiple inputs and broad cation permeation characterize the source TRP comparison."
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
            "Multimodal, often weakly voltage-dependent cation pores."
          ]
        },
        {
          "id": "L09-trp-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L09 9:1 p20",
          "prompt": "Which architecture is shown for the source TRP channel?",
          "options": [
            {
              "text": "Five subunits with four helices each",
              "feedback": "Five four-helix subunits describe the pentameric ligand-gated comparison."
            },
            {
              "text": "Four subunits with six helices each",
              "feedback": "The source TRP channel has four six-helix subunits with P-loops."
            },
            {
              "text": "Four subunits with two helices each",
              "feedback": "Four two-helix subunits describe the KcsA comparison."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Recall the distinction taught in this section."
            },
            {
              "body": "The source TRP channel has four six-helix subunits with P-loops."
            }
          ],
          "modelAnswer": [
            "The source TRP channel has four six-helix subunits with P-loops."
          ]
        }
      ]
    },
    {
      "id": "thermal",
      "title": "Thermal TRP examples and chemical activation",
      "keyTerms": [],
      "source": "L09 9:1 p21",
      "blocks": [
        {
          "type": "text",
          "body": ["The source associates TRPV1 with heat around $43\\,^{\\circ}\\mathrm C$ and capsaicin, and TRPV2 with higher heat around $52\\,^{\\circ}\\mathrm C$. The diagram places different TRP members across cold, warmth and noxious heat ranges.", "These are approximate examples of stimulus sensitivity. Chemical and thermal activation of the same channel illustrate multimodal gating, rather than separate ion pathways. Other TRP members sense osmotic pressure, volume, stretch or vibration; a temperature label alone does not describe the full response repertoire. (9:1 PDF p21.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "9:1, PDF page 21. Source approximate thermal activation ranges across TRP members. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
            "fallbackAlt": "9:1, PDF page 21. Source approximate thermal activation ranges across TRP members. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L09/ions-21.webp', import.meta.url).href,
              "alt": "9:1, PDF page 21. Source approximate thermal activation ranges across TRP members. Printed labels and axes retained.",
              "aspect": 3.188841201716738,
              "quiz": false,
              "layout": "stack",
              "regions": [],
              "minWidth": 760
            }
          }
        }
      ],
      "formulas": [],
      "conceptQuiz": [
        {
          "id": "L09-thermal-check",
          "prompt": "Which combination illustrates TRPV1 multimodal sensitivity?",
          "correct": 0,
          "options": [
            {
              "text": "Moderate heat and capsaicin exposure",
              "feedback": "TRPV1 responds to capsaicin as well as moderate heat in the source example."
            },
            {
              "text": "Only extreme heat without chemical ligands",
              "feedback": "Chemical activation is part of the TRPV1 example; extreme heat is not its sole input."
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
            "Moderate heat and capsaicin exposure."
          ]
        },
        {
          "id": "L09-thermal-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L09 9:1 p21",
          "prompt": "What does the source TRPV2 example detect?",
          "options": [
            {
              "text": "Lower cold than the TRPM8 example",
              "feedback": "TRPV2 is the high-heat example, not a cold sensor."
            },
            {
              "text": "Capsaicin rather than thermal input",
              "feedback": "Capsaicin activation is emphasized for TRPV1; TRPV2 is the high-heat comparison."
            },
            {
              "text": "Higher heat than the TRPV1 example",
              "feedback": "The source places TRPV2 at a higher heat threshold than TRPV1; thresholds depend on conditions."
            }
          ],
          "correct": 2,
          "hints": [
            {
              "body": "Recall the distinction taught in this section."
            },
            {
              "body": "The source places TRPV2 at a higher heat threshold than TRPV1; thresholds depend on conditions."
            }
          ],
          "modelAnswer": [
            "The source places TRPV2 at a higher heat threshold than TRPV1; thresholds depend on conditions."
          ]
        }
      ]
    },
    {
      "id": "ligand",
      "title": "Extracellular ligands and nicotinic receptors",
      "keyTerms": [],
      "source": "L09 9:1 p22",
      "blocks": [
        {
          "type": "text",
          "body": ["Ionotropic receptors couple extracellular transmitter binding directly to channel gating. The source examples include acetylcholine, serotonin, glutamate, glycine and GABA. Pentameric ligand-gated receptors have five subunits, each with four membrane helices.", "In the nicotinic example, binding two acetylcholine molecules opens a channel more permeable to sodium and potassium than calcium. The resulting endplate depolarization can trigger muscle activation. Ligand binding controls opening; it should not be confused with the electrochemical forces that determine ion movement through the open pore. (9:1 PDF p22.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "9:1, PDF page 22. Nicotinic receptor structural views and aqueous mixed-cation pathway. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
            "fallbackAlt": "9:1, PDF page 22. Nicotinic receptor structural views and aqueous mixed-cation pathway. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L09/ions-22.webp', import.meta.url).href,
              "alt": "9:1, PDF page 22. Nicotinic receptor structural views and aqueous mixed-cation pathway. Printed labels and axes retained.",
              "aspect": 2.6858638743455496,
              "quiz": false,
              "layout": "stack",
              "regions": [],
              "minWidth": 760
            }
          }
        }
      ],
      "formulas": [],
      "conceptQuiz": [
        {
          "id": "L09-ligand-check",
          "prompt": "What opens an ionotropic postsynaptic channel directly?",
          "correct": 1,
          "options": [
            {
              "text": "An obligatory long intracellular transcription cascade",
              "feedback": "Ionotropic gating is direct ligand control of the channel, not obligatory transcription."
            },
            {
              "text": "Neurotransmitter binding to the channel complex",
              "feedback": "Neurotransmitter binding gates the ionotropic channel complex directly."
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
            "Neurotransmitter binding to the channel complex."
          ]
        },
        {
          "id": "L09-ligand-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L09 9:1 p22",
          "prompt": "How many subunits form the taught pentameric ligand-gated receptor?",
          "options": [
            {
              "text": "Five pore-associated subunits",
              "feedback": "Pentameric means five subunits, each with four transmembrane segments here."
            },
            {
              "text": "Four pore-associated subunits",
              "feedback": "Four subunits describe several other channel families, not a pentamer."
            },
            {
              "text": "Two pore-associated subunits",
              "feedback": "Two acetylcholine molecules gate the taught receptor; that is not its subunit count."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Recall the distinction taught in this section."
            },
            {
              "body": "Pentameric means five subunits, each with four transmembrane segments here."
            }
          ],
          "modelAnswer": [
            "Pentameric means five subunits, each with four transmembrane segments here."
          ]
        }
      ]
    },
    {
      "id": "channelopathy",
      "title": "Channelopathy: altered function and ENaC",
      "keyTerms": [],
      "source": "L09 9:2 p1–2",
      "blocks": [
        {
          "type": "text",
          "body": ["Channel dysfunction can be inherited or acquired through disease, drugs or toxins. Functional changes can involve gating, conductance, selectivity, abundance or signaling. A genetic variant may cause gain of function, loss of function or no measurable functional change.", "The ENaC example links increased renal sodium absorption to water retention, expanded extracellular volume and hypertension; reduced function can give hypotension. Establish the functional defect before predicting the physiological effect. These applications remain provisional exam scope; a mutation alone does not establish a disease mechanism. (9:2 PDF p1–2.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "9:2, PDF page 2. Source disease/channel association diagram; associations alone do not establish a mutation effect. Printed labels and axes retained.",
            "fallbackAlt": "9:2, PDF page 2. Source disease/channel association diagram; associations alone do not establish a mutation effect. Printed labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L09/applications-02.webp', import.meta.url).href,
              "alt": "9:2, PDF page 2. Source disease/channel association diagram; associations alone do not establish a mutation effect. Printed labels and axes retained.",
              "aspect": 1.61875,
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
          "id": "L09-channelopathy-check",
          "prompt": "Which definition requires channel dysfunction rather than a sequence variant alone?",
          "correct": 0,
          "options": [
            {
              "text": "Disease caused by dysfunctional ion-channel behavior",
              "feedback": "Channelopathy requires channel dysfunction causing disease, inherited or acquired."
            },
            {
              "text": "Any genetic sequence change regardless of its effect",
              "feedback": "A sequence variant alone does not establish dysfunction or a disease mechanism."
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
            "Disease caused by dysfunctional ion-channel behavior."
          ]
        },
        {
          "id": "L09-channelopathy-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L09 9:2 p1–2",
          "prompt": "What distinguishes an acquired channelopathy from an inherited one?",
          "options": [
            {
              "text": "Dysfunction caused by a duplicated gene only",
              "feedback": "Gene duplication alone does not define acquired dysfunction or establish disease."
            },
            {
              "text": "Dysfunction caused by disease, drug or toxin",
              "feedback": "Acquired channel dysfunction can follow disease, drugs or toxins."
            },
            {
              "text": "Dysfunction caused by an inherited variant",
              "feedback": "An inherited variant belongs to the inherited rather than acquired category."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Recall the distinction taught in this section."
            },
            {
              "body": "Acquired channel dysfunction can follow disease, drugs or toxins."
            }
          ],
          "modelAnswer": [
            "Acquired channel dysfunction can follow disease, drugs or toxins."
          ]
        }
      ],
      "part": {
        "id": "applications",
        "number": 2,
        "title": "Integration and applications",
        "intro": "Taught in lecture 9; final-exam scope remains provisional."
      }
    },
    {
      "id": "toxins",
      "title": "Toxin mechanisms: block, activate and alter gating",
      "keyTerms": [],
      "source": "L09 9:2 p3",
      "blocks": [
        {
          "type": "text",
          "body": ["Toxins can block pores or change gating. In the source table, TTX blocks sodium channels from outside, whereas batrachotoxin slows inactivation and shifts activation. Receptor agonists activate; antagonists oppose receptor activation.", "Compare the intervention with its immediate channel effect before predicting a cellular response. The table also includes ligand-receptor antagonists, such as strychnine at glycine receptors. Blocking a conducting pore and preventing ligand activation can both reduce current, but they act at different steps. (9:2 PDF p3.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "9:2, PDF page 3. Source toxin mechanisms and target channels. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
            "fallbackAlt": "9:2, PDF page 3. Source toxin mechanisms and target channels. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L09/applications-03.webp', import.meta.url).href,
              "alt": "9:2, PDF page 3. Source toxin mechanisms and target channels. Printed labels and axes retained.",
              "aspect": 0.699814126394052,
              "quiz": false,
              "layout": "stack",
              "regions": [],
              "minWidth": 760
            }
          }
        }
      ],
      "formulas": [],
      "conceptQuiz": [
        {
          "id": "L09-toxins-check",
          "prompt": "What does an agonist do when it binds its receptor?",
          "correct": 1,
          "options": [
            {
              "text": "Prevention of receptor activation by binding",
              "feedback": "Prevention of activation defines antagonism in the source distinction."
            },
            {
              "text": "Activation of the receptor through its binding",
              "feedback": "Agonists activate receptors; antagonists oppose their activation."
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
            "Activation of the receptor through its binding."
          ]
        },
        {
          "id": "L09-toxins-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L09 9:2 p3",
          "prompt": "Which action defines a receptor antagonist?",
          "options": [
            {
              "text": "Promoting receptor activation",
              "feedback": "Promoting activation describes an agonist in this source distinction."
            },
            {
              "text": "Increasing receptor expression",
              "feedback": "Changing expression changes receptor abundance, not the definition of antagonism."
            },
            {
              "text": "Blocking receptor activation",
              "feedback": "An antagonist blocks activation, unlike an agonist that activates the receptor."
            }
          ],
          "correct": 2,
          "hints": [
            {
              "body": "Recall the distinction taught in this section."
            },
            {
              "body": "An antagonist blocks activation, unlike an agonist that activates the receptor."
            }
          ],
          "modelAnswer": [
            "An antagonist blocks activation, unlike an agonist that activates the receptor."
          ]
        }
      ]
    },
    {
      "id": "ttx",
      "title": "TTX sensitivity and propagation failure",
      "keyTerms": [],
      "source": "L09 9:2 p4",
      "blocks": [
        {
          "type": "text",
          "body": ["TTX pore block reduces sodium current and can prevent action-potential propagation. The source separates relatively low-concentration-sensitive NaV1.1–1.4, 1.6 and 1.7 from relatively resistant NaV1.5, 1.8 and 1.9. Resistant does not mean immune.", "In the clamp panel, compare current before and after TTX at the same voltage protocol; reduced inward current supports sodium-channel block. Sensitivity depends on subtype and concentration. The slide animal/food anecdotes and lethal-dose value are contextual material, not a quantitative rule for channel inhibition. (9:2 PDF p4.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "9:2, PDF page 4. Source TTX current suppression and relative sensitive/resistant subtype table. Printed labels and axes retained.",
            "fallbackAlt": "9:2, PDF page 4. Source TTX current suppression and relative sensitive/resistant subtype table. Printed labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L09/applications-04.webp', import.meta.url).href,
              "alt": "9:2, PDF page 4. Source TTX current suppression and relative sensitive/resistant subtype table. Printed labels and axes retained.",
              "aspect": 0.6592233009708738,
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
          "id": "L09-ttx-check",
          "prompt": "Which current change links sodium pore block to failed propagation?",
          "correct": 0,
          "options": [
            {
              "text": "Reduced sodium current supporting regenerative depolarization",
              "feedback": "Sodium pore block reduces the inward current needed for regenerative propagation."
            },
            {
              "text": "Increased sodium current supporting repetitive depolarization",
              "feedback": "TTX blocks rather than enhances the sodium current supporting propagation."
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
            "Reduced sodium current supporting regenerative depolarization."
          ]
        },
        {
          "id": "L09-ttx-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L09 9:2 p4",
          "prompt": "What does relative TTX resistance mean in the source subtype comparison?",
          "options": [
            {
              "text": "Block requires a higher concentration",
              "feedback": "Resistance is relative: less-sensitive subtypes require higher concentrations, not absolute immunity."
            },
            {
              "text": "Block requires a lower concentration",
              "feedback": "Lower concentrations block the more sensitive subtype group."
            },
            {
              "text": "Block requires a different current sign",
              "feedback": "Sensitivity concerns toxin concentration and subtype, not whether current is inward or outward."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Recall the distinction taught in this section."
            },
            {
              "body": "Resistance is relative: less-sensitive subtypes require higher concentrations, not absolute immunity."
            }
          ],
          "modelAnswer": [
            "Resistance is relative: less-sensitive subtypes require higher concentrations, not absolute immunity."
          ]
        }
      ]
    },
    {
      "id": "modulation",
      "title": "Direct modulation versus compensation",
      "keyTerms": [],
      "source": "L09 9:2 p5",
      "blocks": [
        {
          "type": "text",
          "body": ["Direct modulation aims to oppose a measured functional defect: inhibit excessive activity or enhance reduced activity. Compensation instead acts through another signaling pathway to offset the cellular consequence.", "A channel-targeting drug does not imply that the disease is caused by a mutated channel. In the source example, inflammatory pain can be reduced by blocking normal sodium channels involved in signal transmission. Explain target action separately from disease origin before choosing between direct correction and compensation. (9:2 PDF p5.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "9:2, PDF page 5. Source illustrative drug/channel target table, not prescribing guidance. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
            "fallbackAlt": "9:2, PDF page 5. Source illustrative drug/channel target table, not prescribing guidance. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L09/applications-05.webp', import.meta.url).href,
              "alt": "9:2, PDF page 5. Source illustrative drug/channel target table, not prescribing guidance. Printed labels and axes retained.",
              "aspect": 0.6801275239107333,
              "quiz": false,
              "layout": "stack",
              "regions": [],
              "minWidth": 760
            }
          }
        }
      ],
      "formulas": [],
      "conceptQuiz": [
        {
          "id": "L09-modulation-check",
          "prompt": "Must a channel carry a mutation for its blockade to relieve symptoms?",
          "correct": 1,
          "options": [
            {
              "text": "Yes, all drug targets must carry a disease mutation",
              "feedback": "A drug can target normal channels carrying symptoms without a target mutation."
            },
            {
              "text": "No, normal channels can mediate disease symptoms",
              "feedback": "The inflammatory-pain example targets normal sodium channels used in signal transmission."
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
            "No, normal channels can mediate disease symptoms."
          ]
        },
        {
          "id": "L09-modulation-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L09 9:2 p5",
          "prompt": "Which strategy is compensation rather than direct modulation?",
          "options": [
            {
              "text": "Enhancing activity of the underactive target channel",
              "feedback": "Enhancing the defective underactive channel is direct modulation."
            },
            {
              "text": "Acting through an alternative signaling pathway",
              "feedback": "Compensation offsets the cellular consequence through another pathway."
            },
            {
              "text": "Reducing activity of the overactive target channel",
              "feedback": "Inhibiting the defective overactive channel is direct modulation."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Recall the distinction taught in this section."
            },
            {
              "body": "Compensation offsets the cellular consequence through another pathway."
            }
          ],
          "modelAnswer": [
            "Compensation offsets the cellular consequence through another pathway."
          ]
        }
      ]
    },
    {
      "id": "pain",
      "title": "Sodium-channel loss and gain in pain",
      "keyTerms": [],
      "source": "L09 9:2 p6",
      "blocks": [
        {
          "type": "text",
          "body": ["The source contrasts NaV1.7 loss of function with congenital insensitivity to pain and gain of function with severe congenital pain. NaV1.7, 1.8 and 1.9 contribute to pain pathways, but sodium channels also serve other tissues.", "Subtype-selective blockade is therefore a rationale for suppressing unwanted pain signaling while sparing other functions. A subtype list alone cannot establish selectivity or safety. The clinical-development and safety statements on this slide are dated teaching claims, rather than current treatment guidance. (9:2 PDF p6.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "9:2, PDF page 6. Source tissue and sensory-fiber sodium subtype distribution. Printed labels and axes retained.",
            "fallbackAlt": "9:2, PDF page 6. Source tissue and sensory-fiber sodium subtype distribution. Printed labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L09/applications-06.webp', import.meta.url).href,
              "alt": "9:2, PDF page 6. Source tissue and sensory-fiber sodium subtype distribution. Printed labels and axes retained.",
              "aspect": 1.7769347496206374,
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
          "id": "L09-pain-check",
          "prompt": "Which phenotype is paired with NaV1.7 loss of function?",
          "correct": 0,
          "options": [
            {
              "text": "Congenital reduction or absence of pain sensation",
              "feedback": "The source links NaV1.7 loss of function to reduced or absent congenital pain sensation."
            },
            {
              "text": "Congenital increase in persistent pain sensation",
              "feedback": "Severe congenital pain is the gain-of-function comparison."
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
            "Congenital reduction or absence of pain sensation."
          ]
        },
        {
          "id": "L09-pain-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L09 9:2 p6",
          "prompt": "What is the rationale for subtype-selective sodium-channel blockade in pain pathways?",
          "options": [
            {
              "text": "Suppress channel expression throughout other tissues",
              "feedback": "Broad suppression in other tissues defeats the intended selectivity."
            },
            {
              "text": "Enhance pain signaling while sparing other functions",
              "feedback": "The aim is to reduce unwanted pain signaling, not enhance it."
            },
            {
              "text": "Suppress pain signaling while sparing other functions",
              "feedback": "Subtype selectivity aims to reduce unwanted pain signals while preserving other sodium-channel functions."
            }
          ],
          "correct": 2,
          "hints": [
            {
              "body": "Recall the distinction taught in this section."
            },
            {
              "body": "Subtype selectivity aims to reduce unwanted pain signals while preserving other sodium-channel functions."
            }
          ],
          "modelAnswer": [
            "Subtype selectivity aims to reduce unwanted pain signals while preserving other sodium-channel functions."
          ]
        }
      ]
    },
    {
      "id": "lidocaine",
      "title": "State-dependent blockade and cardiac context",
      "keyTerms": [],
      "source": "L09 9:2 p7",
      "blocks": [
        {
          "type": "text",
          "body": ["In the source account, lidocaine preferentially binds open and inactivated sodium channels. Reduced sodium entry limits depolarization and action-potential propagation. Tissue voltage and activity influence the channel states available for binding.", "To compare rested and repeatedly depolarized cells, control the voltage protocol and exposure, then measure sodium current with matched solutions and channel expression. Differences may reflect state occupancy rather than different pore numbers. The cardiac class comparison supplies a tissue-dependent rationale, not a guarantee of uniform benefit or safety. (9:2 PDF p7.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "9:2, PDF page 7. Source class-I sodium-blocker ventricular waveforms and class comparison. Printed labels and axes retained.",
            "fallbackAlt": "9:2, PDF page 7. Source class-I sodium-blocker ventricular waveforms and class comparison. Printed labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L09/applications-07.webp', import.meta.url).href,
              "alt": "9:2, PDF page 7. Source class-I sodium-blocker ventricular waveforms and class comparison. Printed labels and axes retained.",
              "aspect": 0.7284345047923323,
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
          "id": "L09-lidocaine-check",
          "prompt": "Which sodium-channel states favor lidocaine binding in the source account?",
          "correct": 1,
          "options": [
            {
              "text": "Only the fully recovered resting closed state",
              "feedback": "The taught preference is for open and inactivated channels rather than resting channels."
            },
            {
              "text": "Open and inactivated sodium-channel states",
              "feedback": "Binding preference depends on channel state, favoring open and inactivated sodium channels."
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
            "Open and inactivated sodium-channel states."
          ]
        },
        {
          "id": "L09-lidocaine-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L09 9:2 p7",
          "prompt": "What ionic change follows the taught lidocaine sodium-channel block?",
          "options": [
            {
              "text": "Reduced sodium entry during depolarization",
              "feedback": "Sodium-channel block reduces sodium entry and limits propagation."
            },
            {
              "text": "Increased sodium entry during depolarization",
              "feedback": "Increased entry is opposite to the taught blocking action."
            },
            {
              "text": "Reduced potassium exit during repolarization",
              "feedback": "Potassium exit is a different channel pathway, not the direct sodium-block effect."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Recall the distinction taught in this section."
            },
            {
              "body": "Sodium-channel block reduces sodium entry and limits propagation."
            }
          ],
          "modelAnswer": [
            "Sodium-channel block reduces sodium entry and limits propagation."
          ]
        }
      ]
    },
    {
      "id": "epilepsy",
      "title": "Hyperexcitability and hypersynchronization",
      "keyTerms": [],
      "source": "L09 9:2 p8",
      "blocks": [
        {
          "type": "text",
          "body": ["Seizure activity combines hyperexcitability, excessive firing within cells, with hypersynchronization across a neuronal population. The source contrasts a normal action potential with abnormal repetitive discharges.", "A single-cell burst supports altered excitability but cannot establish population synchrony; that requires observations across cells. Genetic and environmental causes can interact, and not every epilepsy is a single channel mutation. Relate the illustrated discharge pattern to the cellular claim before extending the explanation to a network-level disorder. (9:2 PDF p8.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "9:2, PDF page 8. Source normal and repetitive-discharge voltage traces, with time axes. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
            "fallbackAlt": "9:2, PDF page 8. Source normal and repetitive-discharge voltage traces, with time axes. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L09/applications-08.webp', import.meta.url).href,
              "alt": "9:2, PDF page 8. Source normal and repetitive-discharge voltage traces, with time axes. Printed labels and axes retained.",
              "aspect": 2.006269592476489,
              "quiz": false,
              "layout": "stack",
              "regions": [],
              "minWidth": 760
            }
          }
        }
      ],
      "formulas": [],
      "conceptQuiz": [
        {
          "id": "L09-epilepsy-check",
          "prompt": "Which description concerns synchrony between cells rather than firing within one cell?",
          "correct": 0,
          "options": [
            {
              "text": "Coordinated timing across a neuronal population",
              "feedback": "Synchrony describes coordinated timing across cells, not simply their individual firing rates."
            },
            {
              "text": "Increased firing within one isolated neuron only",
              "feedback": "Increased single-neuron firing supports hyperexcitability, not population synchrony by itself."
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
            "Coordinated timing across a neuronal population."
          ]
        },
        {
          "id": "L09-epilepsy-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L09 9:2 p8",
          "prompt": "Which observation describes cellular hyperexcitability in the source?",
          "options": [
            {
              "text": "Reduced firing within an isolated neuron",
              "feedback": "Reduced firing does not describe the excessive cellular firing in this example."
            },
            {
              "text": "High-frequency bursts within a neuron",
              "feedback": "The source uses high-frequency action-potential bursts to describe hyperexcitability."
            },
            {
              "text": "Coordinated timing between many neurons",
              "feedback": "Coordinated population timing describes hypersynchronization instead."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Recall the distinction taught in this section."
            },
            {
              "body": "The source uses high-frequency action-potential bursts to describe hyperexcitability."
            }
          ],
          "modelAnswer": [
            "The source uses high-frequency action-potential bursts to describe hyperexcitability."
          ]
        }
      ]
    },
    {
      "id": "persistent",
      "title": "Impaired inactivation and persistent sodium current",
      "keyTerms": [],
      "source": "L09 9:2 p9",
      "blocks": [
        {
          "type": "text",
          "body": ["Impaired sodium-channel inactivation can leave persistent inward current during sustained depolarization, promoting excitability. Channel abundance can also change current. In the source normal/abnormal panel, compare late current relative to the transient peak rather than interpreting a larger peak alone as impaired inactivation.", "Under matched voltage clamp, separate leak and compare kinetics and expression. The HH explorer combines activation cubed with availability; use its conductance fraction and signed driving force to calculate current. A cellular current change alone does not demonstrate seizure synchronization or determine its effect in every neuronal population. (9:2 PDF p9.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "9:2, PDF page 9. Normal inactivation versus increased persistent sodium current in the supplied diagram. Printed labels and axes retained.",
            "fallbackAlt": "9:2, PDF page 9. Normal inactivation versus increased persistent sodium current in the supplied diagram. Printed labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L09/applications-09.webp', import.meta.url).href,
              "alt": "9:2, PDF page 9. Normal inactivation versus increased persistent sodium current in the supplied diagram. Printed labels and axes retained.",
              "aspect": 1.1636363636363636,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L09-f-availability",
          "name": "HH available sodium fraction",
          "tex": "P_{open}=m^3h",
          "symbols": [
            {
              "tex": "P_{open}",
              "name": "Open fraction",
              "unit": "1",
              "meaning": "Open fraction in the stated model."
            },
            {
              "tex": "m",
              "name": "Activation factor",
              "unit": "1",
              "meaning": "Activation factor in the stated model."
            },
            {
              "tex": "h",
              "name": "Availability factor",
              "unit": "1",
              "meaning": "Availability factor in the stated model."
            }
          ],
          "reads": "Impaired inactivation can raise current at unchanged activation.",
          "assumes": "Cumulative HH phenomenology, not a literal molecular domain count.",
          "variants": [],
          "drill": {
            "prompt": "Use $m=0.5$, $h=0.4$. Find the open fraction.",
            "answer": {
              "value": 0.05,
              "unit": "",
              "tolerance": 0.00015000000000000001,
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 0.125,
                  "b": 0.4
                },
                "displayScale": 1
              }
            },
            "tex": "P_{open}=0.5^3(0.4)",
            "modelAnswer": [
              "Impaired inactivation can raise current at unchanged activation."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $P_{open}=m^3h$."
              },
              {
                "body": "Start with $P_{open}=0.5^3(0.4)$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{P_{open}}}={\\htmlClass{formula-term-1}{m}}^3{\\htmlClass{formula-term-2}{h}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L09-persistent-check",
          "prompt": "Which inactivation change leaves excessive late sodium current?",
          "correct": 1,
          "options": [
            {
              "text": "Faster complete inactivation eliminating residual current",
              "feedback": "Complete rapid inactivation suppresses late sodium current rather than increasing it."
            },
            {
              "text": "Impaired inactivation leaving residual inward current",
              "feedback": "Incomplete inactivation leaves inward sodium current during sustained depolarization."
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
            "Impaired inactivation leaving residual inward current."
          ]
        },
        {
          "id": "L09-persistent-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L09 9:2 p9",
          "prompt": "Which part of a sustained clamp response reveals persistent current?",
          "options": [
            {
              "text": "Command voltage before the voltage step",
              "feedback": "The pre-step command is a control condition, not residual ionic current."
            },
            {
              "text": "Capacitive transient at the voltage step",
              "feedback": "Capacitive charging is a brief transient and must be separated from late ionic current."
            },
            {
              "text": "Residual current late in the voltage step",
              "feedback": "Persistent current remains late rather than disappearing with the initial transient."
            }
          ],
          "correct": 2,
          "hints": [
            {
              "body": "Recall the distinction taught in this section."
            },
            {
              "body": "Persistent current remains late rather than disappearing with the initial transient."
            }
          ],
          "modelAnswer": [
            "Persistent current remains late rather than disappearing with the initial transient."
          ]
        }
      ]
    },
    {
      "id": "kv-target",
      "title": "Potassium modulation and excitability",
      "keyTerms": [],
      "source": "L09 9:2 p10",
      "blocks": [
        {
          "type": "text",
          "body": ["Potassium channels regulate repolarization, action-potential waveform and firing frequency. Under the source outward-current conditions, blockade reduces potassium efflux and can slow repolarization; activation can promote hyperpolarization and reduce pathological excitability.", "Predict the current direction from voltage relative to potassium reversal before applying that reasoning. Timing, subtype and cellular context also matter. The illustrated firing changes explain the rationale for modulation, rather than establishing that every potassium blocker increases firing or every activator has the same physiological effect. (9:2 PDF p10.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "9:2, PDF page 10. Source potassium-channel modulation and firing examples. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
            "fallbackAlt": "9:2, PDF page 10. Source potassium-channel modulation and firing examples. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L09/applications-10.webp', import.meta.url).href,
              "alt": "9:2, PDF page 10. Source potassium-channel modulation and firing examples. Printed labels and axes retained.",
              "aspect": 1.869244935543278,
              "quiz": false,
              "layout": "stack",
              "regions": [],
              "minWidth": 760
            }
          }
        }
      ],
      "formulas": [],
      "conceptQuiz": [
        {
          "id": "L09-kv-target-check",
          "prompt": "With outward potassium driving force, what tendency follows channel activation?",
          "correct": 0,
          "options": [
            {
              "text": "Increase repolarizing current and oppose excess firing",
              "feedback": "More outward potassium current supports repolarization and can oppose excessive firing."
            },
            {
              "text": "Decrease repolarizing current and promote excess firing",
              "feedback": "Under the stated outward-current conditions, activation increases rather than decreases that current."
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
            "Increase repolarizing current and oppose excess firing."
          ]
        },
        {
          "id": "L09-kv-target-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L09 9:2 p10",
          "prompt": "Which action-potential phase is directly supported by the taught outward potassium current?",
          "options": [
            {
              "text": "The repolarizing falling phase",
              "feedback": "Outward potassium current supports the falling phase under the stated driving force."
            },
            {
              "text": "The regenerative rising phase",
              "feedback": "The fast regenerative upstroke is supported by inward sodium current in this model."
            },
            {
              "text": "The capacitive command artifact",
              "feedback": "The command artifact is a recording transient, not an action-potential phase."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Recall the distinction taught in this section."
            },
            {
              "body": "Outward potassium current supports the falling phase under the stated driving force."
            }
          ],
          "modelAnswer": [
            "Outward potassium current supports the falling phase under the stated driving force."
          ]
        }
      ]
    },
    {
      "id": "herg",
      "title": "hERG hazard and atrial-target contrast",
      "keyTerms": [],
      "source": "L09 9:2 p11",
      "blocks": [
        {
          "type": "text",
          "body": ["hERG supports ventricular repolarization and has a blocker-binding pocket that accommodates diverse compounds. Inhibition reduces repolarizing potassium current and can prolong the cellular action potential and ECG QT interval.", "The source contrasts predominantly atrial KV1.5 targeting with ventricular hERG risk. Tissue selectivity is a rationale for atrial action, not proof of freedom from ventricular harm. Keep the molecular target, cellular waveform and tissue-level outcome distinct when explaining why a drug can be useful at one target and hazardous at another. (9:2 PDF p11.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "9:2, PDF page 11. Source atrial versus ventricular action-potential responses to the KV1.5 targeting example. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
            "fallbackAlt": "9:2, PDF page 11. Source atrial versus ventricular action-potential responses to the KV1.5 targeting example. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L09/applications-11.webp', import.meta.url).href,
              "alt": "9:2, PDF page 11. Source atrial versus ventricular action-potential responses to the KV1.5 targeting example. Printed labels and axes retained.",
              "aspect": 3.1660649819494586,
              "quiz": false,
              "layout": "stack",
              "regions": [],
              "minWidth": 760
            }
          }
        }
      ],
      "formulas": [],
      "conceptQuiz": [
        {
          "id": "L09-herg-check",
          "prompt": "Which potassium target raises the taught ventricular repolarization concern?",
          "correct": 1,
          "options": [
            {
              "text": "KV1.5 considered mainly for atrial-selective targeting",
              "feedback": "KV1.5 is the predominantly atrial target in this contrast."
            },
            {
              "text": "KV11.1/hERG supporting cardiac repolarization",
              "feedback": "hERG supports ventricular repolarization and is the source safety concern."
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
            "KV11.1/hERG supporting cardiac repolarization."
          ]
        },
        {
          "id": "L09-herg-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L09 9:2 p11",
          "prompt": "Which tissue predominantly expresses KV1.5 in the source comparison?",
          "options": [
            {
              "text": "Peripheral pain-sensing nerve cells",
              "feedback": "Pain-sensing neurons are discussed for sodium subtypes, not this atrial target."
            },
            {
              "text": "Atrial cardiac muscle cells",
              "feedback": "The source contrasts predominantly atrial KV1.5 with ventricular hERG safety concerns."
            },
            {
              "text": "Ventricular cardiac muscle cells",
              "feedback": "Ventricular repolarization is the hERG safety comparison, not the source predominant KV1.5 location."
            }
          ],
          "correct": 1,
          "hints": [
            {
              "body": "Recall the distinction taught in this section."
            },
            {
              "body": "The source contrasts predominantly atrial KV1.5 with ventricular hERG safety concerns."
            }
          ],
          "modelAnswer": [
            "The source contrasts predominantly atrial KV1.5 with ventricular hERG safety concerns."
          ]
        }
      ]
    },
    {
      "id": "lqt",
      "title": "Distinct channel defects converge on long QT",
      "keyTerms": [],
      "source": "L09 9:2 p12",
      "blocks": [
        {
          "type": "text",
          "body": ["Loss of outward potassium function or gain of persistent inward sodium current can delay ventricular repolarization. The source links LQT1 with KCNQ1/KV7.1 loss, LQT2 with KCNH2/hERG loss and LQT3 with SCN5A/NaV1.5 gain.", "For the instantaneous calculation, add signed ionic currents and use minus their sum divided by capacitance when applied current is zero. An outward net current lowers voltage. This local slope does not specify a full action potential or ECG QT interval; the source simplified QT threshold is not a protocol-independent diagnostic rule. (9:2 PDF p12.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "9:2, PDF page 12. Source ventricular repolarization and ECG QT comparison. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
            "fallbackAlt": "9:2, PDF page 12. Source ventricular repolarization and ECG QT comparison. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L09/applications-12.webp', import.meta.url).href,
              "alt": "9:2, PDF page 12. Source ventricular repolarization and ECG QT comparison. Printed labels and axes retained.",
              "aspect": 3.0311418685121105,
              "quiz": false,
              "layout": "stack",
              "regions": [],
              "minWidth": 760
            }
          }
        }
      ],
      "formulas": [],
      "conceptQuiz": [
        {
          "id": "L09-lqt-check",
          "prompt": "Which inward-current change is linked to LQT3?",
          "correct": 0,
          "options": [
            {
              "text": "Gain of persistent sodium current through NaV1.5",
              "feedback": "The source LQT3 mechanism is gain of persistent inward sodium current."
            },
            {
              "text": "Gain of repolarizing potassium current through hERG",
              "feedback": "Increased repolarizing potassium current opposes the source delay in repolarization."
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
            "Gain of persistent sodium current through NaV1.5."
          ]
        },
        {
          "id": "L09-lqt-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L09 9:2 p12",
          "prompt": "What cellular change is shared by the taught long-QT mechanisms?",
          "options": [
            {
              "text": "Accelerated ventricular repolarization",
              "feedback": "Faster repolarization is the opposite of the taught long-QT mechanism."
            },
            {
              "text": "Delayed atrial depolarization only",
              "feedback": "The taught convergence is ventricular repolarization, not atrial depolarization alone."
            },
            {
              "text": "Delayed ventricular repolarization",
              "feedback": "Reduced outward or increased persistent inward current can delay ventricular repolarization."
            }
          ],
          "correct": 2,
          "hints": [
            {
              "body": "Recall the distinction taught in this section."
            },
            {
              "body": "Reduced outward or increased persistent inward current can delay ventricular repolarization."
            }
          ],
          "modelAnswer": [
            "Reduced outward or increased persistent inward current can delay ventricular repolarization."
          ]
        }
      ]
    },
    {
      "id": "screen",
      "title": "Read hERG tail currents and inhibition curves",
      "keyTerms": [],
      "source": "L09 9:2 p13",
      "blocks": [
        {
          "type": "text",
          "body": ["The source CHO-cell patch-clamp assay controls voltage and measures current. Recovery from inactivation produces a hERG tail after the voltage change, followed by deactivation. Compare the same tail measure under matched voltage, solutions and exposure.", "Normalize drug current to a time-matched control; declining control tails indicate rundown. Check leak, capacitive transients and holding-current changes before attributing suppression to hERG inhibition. The curves illustrate concentration dependence, but no precise digitized fit is established here. Channel inhibition identifies a hazard without measuring clinical arrhythmia incidence. (9:2 PDF p13.)"]
        },
        {
          "type": "figure",
          "visual": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "9:2, PDF page 13. Source CHO-cell hERG tails and normalized terfenadine/quinidine inhibition curves. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
            "fallbackAlt": "9:2, PDF page 13. Source CHO-cell hERG tails and normalized terfenadine/quinidine inhibition curves. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L09/applications-13.webp', import.meta.url).href,
              "alt": "9:2, PDF page 13. Source CHO-cell hERG tails and normalized terfenadine/quinidine inhibition curves. Printed labels and axes retained.",
              "aspect": 4.225,
              "quiz": false,
              "layout": "stack",
              "regions": [],
              "minWidth": 1000
            }
          }
        }
      ],
      "formulas": [
        {
          "id": "L09-f-remaining",
          "name": "Normalized current remaining",
          "tex": "f=I_{drug}/I_{control}",
          "symbols": [
            {
              "tex": "f",
              "name": "Fraction remaining",
              "unit": "1",
              "meaning": "Fraction remaining in the stated model."
            },
            {
              "tex": "I_{drug}",
              "name": "Drug current",
              "unit": "\\mathrm A",
              "meaning": "Drug current in the stated model."
            },
            {
              "tex": "I_{control}",
              "name": "Control current",
              "unit": "\\mathrm A",
              "meaning": "Control current in the stated model."
            }
          ],
          "reads": "Compare matched protocol amplitudes before interpreting inhibition.",
          "assumes": "Same sign, voltage, solutions, and time-matched baseline.",
          "variants": [],
          "drill": {
            "prompt": "A matched tail falls from $8\\times10^{-10}\\,\\mathrm A$ to $3\\times10^{-10}\\,\\mathrm A$. Find fraction remaining.",
            "answer": {
              "value": 0.375,
              "unit": "",
              "tolerance": 0.0011250000000000001,
              "verification": {
                "relation": "ratio",
                "inputs": {
                  "a": 3e-10,
                  "b": 8e-10
                },
                "displayScale": 1
              }
            },
            "tex": "f=300/800",
            "modelAnswer": [
              "Compare matched protocol amplitudes before interpreting inhibition."
            ],
            "error": "Check signs, units and the indicated ratio before retrying.",
            "hints": [
              {
                "body": "Use $f=I_{drug}/I_{control}$."
              },
              {
                "body": "Start with $f=300/800$. Evaluate without changing the stated reference direction."
              }
            ]
          },
          "interactiveTex": "{\\htmlClass{formula-term-0}{f}}={\\htmlClass{formula-term-1}{I_{drug}}}/{\\htmlClass{formula-term-2}{I_{control}}}"
        }
      ],
      "conceptQuiz": [
        {
          "id": "L09-screen-check",
          "prompt": "Which variable is measured directly in the hERG clamp assay?",
          "correct": 1,
          "options": [
            {
              "text": "Clinical arrhythmia incidence during drug treatment",
              "feedback": "A channel assay is a hazard measurement, not a direct count of clinical arrhythmias."
            },
            {
              "text": "Channel current during a defined voltage-clamp protocol",
              "feedback": "Voltage clamp measures current under a defined protocol; clinical risk requires additional evidence."
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
            "Channel current during a defined voltage-clamp protocol."
          ]
        },
        {
          "id": "L09-screen-starter",
          "type": "mc",
          "difficulty": "easy",
          "progressionAdded": true,
          "source": "L09 9:2 p13",
          "prompt": "Which process produces the initial hERG tail in the source account?",
          "options": [
            {
              "text": "Rapid recovery from inactivation",
              "feedback": "Recovery from inactivation initially permits tail current; slower deactivation follows."
            },
            {
              "text": "Slow completion of deactivation",
              "feedback": "Deactivation closes channels and contributes to the later tail decay."
            },
            {
              "text": "Rapid increase in channel expression",
              "feedback": "Expression does not change rapidly enough to explain a tail after a voltage step."
            }
          ],
          "correct": 0,
          "hints": [
            {
              "body": "Recall the distinction taught in this section."
            },
            {
              "body": "Recovery from inactivation initially permits tail current; slower deactivation follows."
            }
          ],
          "modelAnswer": [
            "Recovery from inactivation initially permits tail current; slower deactivation follows."
          ]
        }
      ]
    }
  ],
  "lectureQuiz": [
    {
      "id": "L09-transport-recall",
      "prompt": "Which source directly powers secondary active transport?",
      "correct": 0,
      "options": [
        {
          "text": "A gradient previously established by pumping",
          "feedback": "Correct. A gradient previously established by pumping."
        },
        {
          "text": "ATP cleavage during every carrier movement",
          "feedback": "Use this distinction: A gradient previously established by pumping."
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
        "A gradient previously established by pumping."
      ],
      "type": "mc",
      "sectionId": "transport",
      "difficulty": "easy",
      "points": 1,
      "source": "L09 9:1 p2"
    },
    {
      "id": "L09-transport-sort",
      "sectionId": "transport",
      "difficulty": "easy",
      "type": "classify",
      "prompt": "Assign the transport mechanism.",
      "modelAnswer": [
        "Direct energy input: pump.",
        "Coupled gradient energy: secondary carrier.",
        "Passive aqueous pathway: channel."
      ],
      "source": "L09 9:1 p2",
      "points": 1,
      "hints": [
        {
          "body": "Use the structural or functional distinction in the source panel."
        },
        {
          "body": "Treat each item separately; gating, selectivity and topology answer different questions."
        }
      ],
      "categories": [
        "Pump",
        "Secondary carrier",
        "Channel"
      ],
      "items": [
        {
          "text": "Directly converts ATP energy into an uphill gradient",
          "answer": "Pump",
          "explanation": "Primary energy coupling."
        },
        {
          "text": "Downhill movement powers a second solute uphill",
          "answer": "Secondary carrier",
          "explanation": "Secondary energy coupling."
        },
        {
          "text": "Rapid passage through a pore down electrochemical drive",
          "answer": "Channel",
          "explanation": "Passive conduction."
        }
      ]
    },
    {
      "id": "L09-channelome-recall",
      "prompt": "What belongs to the channelome?",
      "correct": 0,
      "options": [
        {
          "text": "Channel repertoire, abundance and membrane distribution",
          "feedback": "Correct. Channel repertoire, abundance and membrane distribution."
        },
        {
          "text": "Only the channels conducting at the moment of recording",
          "feedback": "Use this distinction: Channel repertoire, abundance and membrane distribution."
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
        "Channel repertoire, abundance and membrane distribution."
      ],
      "type": "mc",
      "sectionId": "channelome",
      "difficulty": "easy",
      "points": 1,
      "source": "L09 9:1 p3"
    },
    {
      "id": "L09-control-recall",
      "prompt": "What changes membrane location without changing the pore gene?",
      "correct": 1,
      "options": [
        {
          "text": "Replacement of the channel selectivity sequence",
          "feedback": "Use this distinction: Trafficking of existing channel proteins."
        },
        {
          "text": "Trafficking of existing channel proteins",
          "feedback": "Correct. Trafficking of existing channel proteins."
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
        "Trafficking of existing channel proteins."
      ],
      "type": "mc",
      "sectionId": "control",
      "difficulty": "easy",
      "points": 1,
      "source": "L09 9:1 p4"
    },
    {
      "id": "L09-direct-conductance",
      "sectionId": "control",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $N=120$, $P_{open}=0.5$ and $\\gamma=3\\times10^{-11}\\,\\mathrm S$. Find population conductance.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Channel number",
              "answer": {
                "value": 120,
                "unit": "",
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
              "label": "Open probability",
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
              "label": "Unitary conductance",
              "answer": {
                "value": 3e-11,
                "unit": "S",
                "tolerance": 3e-17,
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
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Expected open count",
          "answer": {
            "value": 60,
            "unit": "",
            "tolerance": 0.18,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 120,
                "b": 0.5
              },
              "displayScale": 1
            }
          },
          "tex": "NP=120(0.5)",
          "modelAnswer": [
            "Compute the intermediate before the final product.",
            "$NP=120(0.5)$",
            "$60$"
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 1.8e-09,
            "unit": "S",
            "tolerance": 5.4000000000000004e-12,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 60,
                "b": 3e-11
              },
              "displayScale": 1
            }
          },
          "tex": "G=NP_{open}\\gamma",
          "modelAnswer": [
            "Expression and gating can change the same measured conductance.",
            "$G=120(0.5)(30\\times10^{-12})\\,\\mathrm S$",
            "$1.8\\times10^{-9}\\,\\mathrm{S}$"
          ]
        },
        {
          "title": "Check physical plausibility",
          "choices": [
            {
              "label": "A positive conductance describes current per driving force"
            },
            {
              "label": "A negative conductance is required for all inward currents"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "An inward current comes from driving force, not a negative Ohmic conductance."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $G=NP_{open}\\gamma$."
        },
        {
          "body": "Start with $G=120(0.5)(30\\times10^{-12})\\,\\mathrm S$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Expression and gating can change the same measured conductance."
      ],
      "points": 1,
      "source": "L09 9:1 p4"
    },
    {
      "id": "L09-kcsa-recall",
      "prompt": "Where is the KcsA bundle gate?",
      "correct": 1,
      "options": [
        {
          "text": "At the widened extracellular pore entrance",
          "feedback": "Use this distinction: At the tightly packed cytoplasmic helices."
        },
        {
          "text": "At the tightly packed cytoplasmic helices",
          "feedback": "Correct. At the tightly packed cytoplasmic helices."
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
        "At the tightly packed cytoplasmic helices."
      ],
      "type": "mc",
      "sectionId": "kcsa",
      "difficulty": "easy",
      "points": 1,
      "source": "L09 9:1 p5"
    },
    {
      "id": "L09-permeation-recall",
      "prompt": "What replaces hydration water in the selective filter?",
      "correct": 0,
      "options": [
        {
          "text": "Coordinating carbonyl oxygens of the channel",
          "feedback": "Correct. Coordinating carbonyl oxygens of the channel."
        },
        {
          "text": "Hydrophobic lipid tails surrounding the channel",
          "feedback": "Use this distinction: Coordinating carbonyl oxygens of the channel."
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
        "Coordinating carbonyl oxygens of the channel."
      ],
      "type": "mc",
      "sectionId": "permeation",
      "difficulty": "easy",
      "points": 1,
      "source": "L09 9:1 p6"
    },
    {
      "id": "L09-filter-recall",
      "prompt": "Why can a smaller ion be excluded?",
      "correct": 1,
      "options": [
        {
          "text": "Its smaller bare radius always prevents entering the pore",
          "feedback": "Use this distinction: Its dehydration cost is poorly compensated by the filter."
        },
        {
          "text": "Its dehydration cost is poorly compensated by the filter",
          "feedback": "Correct. Its dehydration cost is poorly compensated by the filter."
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
        "Its dehydration cost is poorly compensated by the filter."
      ],
      "type": "mc",
      "sectionId": "filter",
      "difficulty": "easy",
      "points": 1,
      "source": "L09 9:1 p7"
    },
    {
      "id": "L09-hydration-recall",
      "prompt": "Which is most strongly hydrated in the source comparison?",
      "correct": 0,
      "options": [
        {
          "text": "Calcium, then sodium, then potassium",
          "feedback": "Correct. Calcium, then sodium, then potassium."
        },
        {
          "text": "Potassium, then sodium, then calcium",
          "feedback": "Use this distinction: Calcium, then sodium, then potassium."
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
        "Calcium, then sodium, then potassium."
      ],
      "type": "mc",
      "sectionId": "hydration",
      "difficulty": "easy",
      "points": 1,
      "source": "L09 9:1 p8"
    },
    {
      "id": "L09-direct-throughput",
      "sectionId": "hydration",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "An open pore passes $5\\times10^7$ monovalent cations outward per second. Use $e=1.6\\times10^{-19}\\,\\mathrm C$. Find current.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Ion rate",
              "answer": {
                "value": 50000000.0,
                "unit": "1/s",
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
              "label": "Charge per ion",
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
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 8e-12,
            "unit": "A",
            "tolerance": 2.4e-14,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 50000000.0,
                "b": 1.6e-19
              },
              "displayScale": 1
            }
          },
          "tex": "i=ze\\dot n",
          "modelAnswer": [
            "Rapid microscopic passage can give picoampere currents.",
            "$i=(5\\times10^7)(1.6\\times10^{-19})\\,\\mathrm A$",
            "$8\\times10^{-12}\\,\\mathrm{A}$"
          ]
        },
        {
          "title": "Check physical plausibility",
          "choices": [
            {
              "label": "The sign follows the stated outward-current reference"
            },
            {
              "label": "All open-channel currents must be positive"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Use the driving force and reference direction, not channel opening alone."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $i=ze\\dot n$."
        },
        {
          "body": "Start with $i=(5\\times10^7)(1.6\\times10^{-19})\\,\\mathrm A$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Rapid microscopic passage can give picoampere currents."
      ],
      "points": 1,
      "source": "L09 9:1 p8"
    },
    {
      "id": "L09-gating-recall",
      "prompt": "Which state must recover before normal reopening?",
      "correct": 0,
      "options": [
        {
          "text": "An inactivated channel following activation",
          "feedback": "Correct. An inactivated channel following activation."
        },
        {
          "text": "A hydrated ion after arriving outside the cell",
          "feedback": "Use this distinction: An inactivated channel following activation."
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
        "An inactivated channel following activation."
      ],
      "type": "mc",
      "sectionId": "gating",
      "difficulty": "easy",
      "points": 1,
      "source": "L09 9:1 p9"
    },
    {
      "id": "L09-gating-audit",
      "sectionId": "gating",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "Single-channel transitions have literally zero duration.",
          "answer": false,
          "correction": "They may be unresolved at recording bandwidth; this does not imply zero physical duration."
        },
        {
          "text": "Brief channel activity can change voltage with little change in bulk concentrations.",
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
        "They may be unresolved at recording bandwidth; this does not imply zero physical duration.",
        "Brief channel activity can change voltage with little change in bulk concentrations."
      ],
      "points": 1,
      "source": "L09 9:1 p9"
    },
    {
      "id": "L09-direct-charge",
      "sectionId": "gating",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "A channel conducts $-2\\times10^{-12}\\,\\mathrm A$ for $0.003\\,\\mathrm s$. Find signed outward charge.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Current",
              "answer": {
                "value": -2e-12,
                "unit": "A",
                "tolerance": 1.9999999999999998e-18,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -2e-12,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Duration",
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
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": -6e-15,
            "unit": "C",
            "tolerance": 1.8e-17,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": -2e-12,
                "b": 0.003
              },
              "displayScale": 1
            }
          },
          "tex": "Q=It",
          "modelAnswer": [
            "Charge accumulates while a channel conducts.",
            "$Q=(-2\\times10^{-12})(3\\times10^{-3})\\,\\mathrm C$",
            "$-6\\times10^{-15}\\,\\mathrm{C}$"
          ]
        },
        {
          "title": "Check physical plausibility",
          "choices": [
            {
              "label": "The charge sign retains the signed current direction"
            },
            {
              "label": "Charge must be positive regardless of current direction"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Charge is the integral of signed current."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $Q=It$."
        },
        {
          "body": "Start with $Q=(-2\\times10^{-12})(3\\times10^{-3})\\,\\mathrm C$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Charge accumulates while a channel conducts."
      ],
      "points": 1,
      "source": "L09 9:1 p9"
    },
    {
      "id": "L09-direct-voltage",
      "sectionId": "gating",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Net positive charge $Q_{in}=2\\times10^{-15}\\,\\mathrm C$ enters a $10^{-13}\\,\\mathrm F$ capacitor. Find voltage change.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Inward charge",
              "answer": {
                "value": 2e-15,
                "unit": "C",
                "tolerance": 2.0000000000000002e-21,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 2e-15,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Capacitance",
              "answer": {
                "value": 1e-13,
                "unit": "F",
                "tolerance": 1e-19,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1e-13,
                    "b": 1
                  },
                  "displayScale": 1
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
            "unit": "V",
            "tolerance": 6e-05,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 2e-15,
                "b": 1e-13
              },
              "displayScale": 1
            }
          },
          "tex": "\\Delta V=Q_{in}/C",
          "modelAnswer": [
            "A small charge redistribution can change membrane voltage.",
            "$\\Delta V=(2\\times10^{-15})/(100\\times10^{-15})\\,\\mathrm V$",
            "$0.02\\,\\mathrm{V}$"
          ]
        },
        {
          "title": "Check physical plausibility",
          "choices": [
            {
              "label": "Positive inward charge depolarizes this isolated capacitor"
            },
            {
              "label": "Positive inward charge necessarily hyperpolarizes the capacitor"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Charge and membrane voltage use the stated inside-minus-outside convention."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\Delta V=Q_{in}/C$."
        },
        {
          "body": "Start with $\\Delta V=(2\\times10^{-15})/(100\\times10^{-15})\\,\\mathrm V$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "A small charge redistribution can change membrane voltage."
      ],
      "points": 1,
      "source": "L09 9:1 p9"
    },
    {
      "id": "L09-single-recall",
      "prompt": "What varies randomly on repeated identical steps?",
      "correct": 0,
      "options": [
        {
          "text": "The opening and closing times of individual channels",
          "feedback": "Correct. The opening and closing times of individual channels."
        },
        {
          "text": "The command voltage imposed by an ideal voltage clamp",
          "feedback": "Use this distinction: The opening and closing times of individual channels."
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
        "The opening and closing times of individual channels."
      ],
      "type": "mc",
      "sectionId": "single",
      "difficulty": "easy",
      "points": 1,
      "source": "L09 9:1 p10"
    },
    {
      "id": "L09-direct-unitary",
      "sectionId": "single",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "An open channel has $\\gamma=2.5\\times10^{-11}\\,\\mathrm S$ and $V_m-E=-0.060\\,\\mathrm V$. Find current in amperes.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Conductance",
              "answer": {
                "value": 2.5e-11,
                "unit": "S",
                "tolerance": 2.5e-17,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 2.5e-11,
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
            "value": -1.5e-12,
            "unit": "A",
            "tolerance": 4.5000000000000005e-15,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 2.5e-11,
                "b": -0.06
              },
              "displayScale": 1
            }
          },
          "tex": "i=\\gamma(V_m-E)",
          "modelAnswer": [
            "Current direction follows the signed driving force.",
            "$i=(25\\times10^{-12})(-0.060)\\,\\mathrm A$",
            "$-1.5\\times10^{-12}\\,\\mathrm{A}$"
          ],
          "commonErrors": [
            {
              "wrongValue": 1.5e-12,
              "tolerance": 1e-15,
              "why": "The inward driving force is negative; retain the outward-positive current convention.",
              "verification": {
                "relation": "product",
                "inputs": {
                  "a": 2.5e-11,
                  "b": 0.06
                },
                "displayScale": 1
              }
            }
          ]
        },
        {
          "title": "Check physical plausibility",
          "choices": [
            {
              "label": "The sign follows the stated outward-current reference"
            },
            {
              "label": "All open-channel currents must be positive"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Use the driving force and reference direction, not channel opening alone."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $i=\\gamma(V_m-E)$."
        },
        {
          "body": "Start with $i=(25\\times10^{-12})(-0.060)\\,\\mathrm A$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Current direction follows the signed driving force."
      ],
      "points": 1,
      "source": "L09 9:1 p10"
    },
    {
      "id": "L09-direct-population",
      "sectionId": "single",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "For $N=80$, $P_{open}=0.25$ and $i=-2\\times10^{-12}\\,\\mathrm A$, find mean current.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Channel number",
              "answer": {
                "value": 80,
                "unit": "",
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
            },
            {
              "label": "Open probability",
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
              "label": "Unitary current",
              "answer": {
                "value": -2e-12,
                "unit": "A",
                "tolerance": 1.9999999999999998e-18,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -2e-12,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Expected open count",
          "answer": {
            "value": 20,
            "unit": "",
            "tolerance": 0.06,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 80,
                "b": 0.25
              },
              "displayScale": 1
            }
          },
          "tex": "NP=80(0.25)",
          "modelAnswer": [
            "Compute the intermediate before the final product.",
            "$NP=80(0.25)$",
            "$20$"
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": -4e-11,
            "unit": "A",
            "tolerance": 1.2e-13,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 20.0,
                "b": -2e-12
              },
              "displayScale": 1
            }
          },
          "tex": "\\langle I\\rangle=NP_{open}i",
          "modelAnswer": [
            "Mean current combines number, occupancy and unitary amplitude.",
            "$I=80(0.25)(-2\\times10^{-12})\\,\\mathrm A$",
            "$-4\\times10^{-11}\\,\\mathrm{A}$"
          ]
        },
        {
          "title": "Check physical plausibility",
          "choices": [
            {
              "label": "The sign follows the stated outward-current reference"
            },
            {
              "label": "All open-channel currents must be positive"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Use the driving force and reference direction, not channel opening alone."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\langle I\\rangle=NP_{open}i$."
        },
        {
          "body": "Start with $I=80(0.25)(-2\\times10^{-12})\\,\\mathrm A$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Mean current combines number, occupancy and unitary amplitude."
      ],
      "points": 1,
      "source": "L09 9:1 p10"
    },
    {
      "id": "L09-direct-slope",
      "sectionId": "single",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Unitary current changes by $2\\times10^{-12}\\,\\mathrm A$ across $0.080\\,\\mathrm V$. Find conductance.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Current difference",
              "answer": {
                "value": 2e-12,
                "unit": "A",
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
              "label": "Voltage difference",
              "answer": {
                "value": 0.08,
                "unit": "V",
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
            "value": 2.5e-11,
            "unit": "S",
            "tolerance": 7.500000000000001e-14,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 2e-12,
                "b": 0.08
              },
              "displayScale": 1
            }
          },
          "tex": "\\gamma=\\Delta i/\\Delta V",
          "modelAnswer": [
            "The slope separates open-pore amplitude from occupancy.",
            "$\\gamma=(2\\times10^{-12})/0.080\\,\\mathrm S$",
            "$2.5\\times10^{-11}\\,\\mathrm{S}$"
          ]
        },
        {
          "title": "Check physical plausibility",
          "choices": [
            {
              "label": "A positive conductance describes current per driving force"
            },
            {
              "label": "A negative conductance is required for all inward currents"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "An inward current comes from driving force, not a negative Ohmic conductance."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $\\gamma=\\Delta i/\\Delta V$."
        },
        {
          "body": "Start with $\\gamma=(2\\times10^{-12})/0.080\\,\\mathrm S$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "The slope separates open-pore amplitude from occupancy."
      ],
      "points": 1,
      "source": "L09 9:1 p10"
    },
    {
      "id": "L09-a1",
      "sectionId": "single",
      "difficulty": "easy",
      "type": "written",
      "prompt": "a) Distinguish pump and channel energy. b) Define channelome. c) Distinguish gating from trafficking. d) Define an ensemble mean.",
      "hints": [
        {
          "body": "Identify the taught mechanism and the level of measurement."
        },
        {
          "body": "Organize your response by cause, observation, alternative explanation and control."
        }
      ],
      "markScheme": [
        {
          "text": "Pumps supply energy; channels conduct down electrochemical gradients."
        },
        {
          "text": "Channelome includes type, abundance and membrane distribution."
        },
        {
          "text": "Gating changes occupancy; trafficking changes location and functional number."
        },
        {
          "text": "An ensemble mean averages stochastic trials at the same protocol."
        }
      ],
      "modelAnswer": [
        "Pumps supply energy; channels conduct down electrochemical gradients.",
        "Channelome includes type, abundance and membrane distribution.",
        "Gating changes occupancy; trafficking changes location and functional number.",
        "An ensemble mean averages stochastic trials at the same protocol."
      ],
      "points": 1,
      "source": "L09 9:1 p2–4,10",
      "mockRole": "preparation"
    },
    {
      "id": "L09-classification-recall",
      "prompt": "Which component usually forms the conducting pore?",
      "correct": 1,
      "options": [
        {
          "text": "The non-pore-forming auxiliary beta subunit",
          "feedback": "Use this distinction: The pore-forming alpha subunit or linked domains."
        },
        {
          "text": "The pore-forming alpha subunit or linked domains",
          "feedback": "Correct. The pore-forming alpha subunit or linked domains."
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
        "The pore-forming alpha subunit or linked domains."
      ],
      "type": "mc",
      "sectionId": "classification",
      "difficulty": "easy",
      "points": 1,
      "source": "L09 9:1 p11"
    },
    {
      "id": "L09-evolution-recall",
      "prompt": "What gives the source S4 segment voltage sensitivity?",
      "correct": 0,
      "options": [
        {
          "text": "Positive residues moving within the membrane field",
          "feedback": "Correct. Positive residues moving within the membrane field."
        },
        {
          "text": "Neutral residues pumping ions against a gradient",
          "feedback": "Use this distinction: Positive residues moving within the membrane field."
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
        "Positive residues moving within the membrane field."
      ],
      "type": "mc",
      "sectionId": "evolution",
      "difficulty": "easy",
      "points": 1,
      "source": "L09 9:1 p12"
    },
    {
      "id": "L09-evolution-other-recall",
      "prompt": "What does acquisition of a ligand-binding domain add?",
      "correct": 1,
      "options": [
        {
          "text": "Mandatory pumping coupled to ATP breakdown",
          "feedback": "Use this distinction: Chemical recognition coupled to pore opening."
        },
        {
          "text": "Chemical recognition coupled to pore opening",
          "feedback": "Correct. Chemical recognition coupled to pore opening."
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
        "Chemical recognition coupled to pore opening."
      ],
      "type": "mc",
      "sectionId": "evolution-other",
      "difficulty": "easy",
      "points": 1,
      "source": "L09 9:1 p13"
    },
    {
      "id": "L09-families-recall",
      "prompt": "How should sodium-channel helix counts be interpreted?",
      "correct": 0,
      "options": [
        {
          "text": "Per homologous domain of the linked alpha subunit",
          "feedback": "Correct. Per homologous domain of the linked alpha subunit."
        },
        {
          "text": "Per complete channel including every auxiliary subunit",
          "feedback": "Use this distinction: Per homologous domain of the linked alpha subunit."
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
        "Per homologous domain of the linked alpha subunit."
      ],
      "type": "mc",
      "sectionId": "families",
      "difficulty": "easy",
      "points": 1,
      "source": "L09 9:1 p14"
    },
    {
      "id": "L09-family-match",
      "practice": "extra",
      "sectionId": "families",
      "difficulty": "easy",
      "type": "classify",
      "prompt": "Use the source reference to match each example to its structural family. The same family may be used more than once.",
      "modelAnswer": [
        "M2 is the one-helix example.",
        "MscL is a two-helix example.",
        "TRP and inward rectifiers belong to the S5–S6/P-loop family.",
        "GABAA belongs to the pentameric extracellular-ligand group."
      ],
      "source": "L09 9:1 p14",
      "points": 1,
      "hints": [
        {
          "body": "Use the structural or functional distinction in the source panel."
        },
        {
          "body": "Treat each item separately; gating, selectivity and topology answer different questions."
        }
      ],
      "categories": [
        "One-helix",
        "Two-helix",
        "S5–S6/P-loop",
        "Pentameric ligand-gated"
      ],
      "items": [
        {
          "text": "M2 proton channel",
          "answer": "One-helix"
        },
        {
          "text": "MscL mechanosensitive channel",
          "answer": "Two-helix"
        },
        {
          "text": "Inward-rectifier potassium channel",
          "answer": "S5–S6/P-loop"
        },
        {
          "text": "TRP cation channel",
          "answer": "S5–S6/P-loop"
        },
        {
          "text": "GABAA receptor",
          "answer": "Pentameric ligand-gated"
        }
      ]
    },
    {
      "id": "L09-stimuli-recall",
      "prompt": "Can one channel respond to several stimulus classes?",
      "correct": 0,
      "options": [
        {
          "text": "Yes, channels can have multimodal gating",
          "feedback": "Correct. Yes, channels can have multimodal gating."
        },
        {
          "text": "No, gating classes are always mutually exclusive",
          "feedback": "Use this distinction: Yes, channels can have multimodal gating."
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
        "Yes, channels can have multimodal gating."
      ],
      "type": "mc",
      "sectionId": "stimuli",
      "difficulty": "easy",
      "points": 1,
      "source": "L09 9:1 p15"
    },
    {
      "id": "L09-stimulus-bins",
      "sectionId": "stimuli",
      "difficulty": "easy",
      "type": "groupItems",
      "prompt": "Sort the source trigger examples by the primary signal named here.",
      "modelAnswer": [
        "Voltage changes gate voltage-sensitive channels.",
        "Ligand binding supplies chemical input.",
        "Membrane distortion supplies mechanical input.",
        "This classification does not exclude additional sensitivity."
      ],
      "source": "L09 9:1 p15",
      "points": 1,
      "hints": [
        {
          "body": "Use the structural or functional distinction in the source panel."
        },
        {
          "body": "Treat each item separately; gating, selectivity and topology answer different questions."
        }
      ],
      "groups": [
        "Voltage",
        "Chemical",
        "Mechanical"
      ],
      "items": [
        {
          "text": "Change in membrane potential",
          "group": "Voltage"
        },
        {
          "text": "Extracellular transmitter binding",
          "group": "Chemical"
        },
        {
          "text": "Intracellular calcium binding",
          "group": "Chemical"
        },
        {
          "text": "Membrane stretch",
          "group": "Mechanical"
        }
      ]
    },
    {
      "id": "L09-cation-recall",
      "prompt": "What is linked in vertebrate sodium-channel alpha protein?",
      "correct": 0,
      "options": [
        {
          "text": "Four homologous six-helix membrane domains",
          "feedback": "Correct. Four homologous six-helix membrane domains."
        },
        {
          "text": "Four independent two-helix membrane proteins",
          "feedback": "Use this distinction: Four homologous six-helix membrane domains."
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
        "Four homologous six-helix membrane domains."
      ],
      "type": "mc",
      "sectionId": "cation",
      "difficulty": "easy",
      "points": 1,
      "source": "L09 9:1 p16"
    },
    {
      "id": "L09-direct-independent",
      "sectionId": "cation",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "An explicitly ideal channel needs four independent permissive factors with probability $y=0.8$. Find open probability.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Factor probability",
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
              "label": "Required factor number",
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
            "value": 0.4096,
            "unit": "",
            "tolerance": 0.0012288000000000002,
            "verification": {
              "relation": "gatePower",
              "inputs": {
                "y": 0.8,
                "count": 4
              },
              "displayScale": 1
            }
          },
          "tex": "P=y^k",
          "modelAnswer": [
            "Required independent factors multiply.",
            "$P=0.8^4$",
            "$0.4096$"
          ]
        },
        {
          "title": "Check physical plausibility",
          "choices": [
            {
              "label": "The resulting probability or fraction is bounded between zero and one"
            },
            {
              "label": "The fraction must carry the sign of the ionic current"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Probabilities and matched same-sign fractions are dimensionless nonnegative ratios."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $P=y^k$."
        },
        {
          "body": "Start with $P=0.8^4$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Required independent factors multiply."
      ],
      "points": 1,
      "source": "L09 9:1 p16"
    },
    {
      "id": "L09-sensor-recall",
      "prompt": "Which segment carries the source positive voltage-sensor residues?",
      "correct": 0,
      "options": [
        {
          "text": "S4 in the peripheral voltage-sensor domain",
          "feedback": "Correct. S4 in the peripheral voltage-sensor domain."
        },
        {
          "text": "S6 in the central ion-selectivity filter",
          "feedback": "Use this distinction: S4 in the peripheral voltage-sensor domain."
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
        "S4 in the peripheral voltage-sensor domain."
      ],
      "type": "mc",
      "sectionId": "sensor",
      "difficulty": "easy",
      "points": 1,
      "source": "L09 9:1 p17"
    },
    {
      "id": "L09-b1",
      "sectionId": "sensor",
      "difficulty": "easy",
      "type": "written",
      "prompt": "a) Locate the P-loop. b) Locate S4. c) Contrast potassium subunits with sodium domains. d) Distinguish gating and ionic current.",
      "hints": [
        {
          "body": "Identify the taught mechanism and the level of measurement."
        },
        {
          "body": "Organize your response by cause, observation, alternative explanation and control."
        }
      ],
      "markScheme": [
        {
          "text": "The P-loop between S5 and S6 forms the filter."
        },
        {
          "text": "S4 positive residues participate in voltage sensing."
        },
        {
          "text": "Potassium is tetrameric; vertebrate sodium alpha links four homologous domains."
        },
        {
          "text": "Gating current reports sensor displacement; ionic current reports pore permeation."
        }
      ],
      "modelAnswer": [
        "The P-loop between S5 and S6 forms the filter.",
        "S4 positive residues participate in voltage sensing.",
        "Potassium is tetrameric; vertebrate sodium alpha links four homologous domains.",
        "Gating current reports sensor displacement; ionic current reports pore permeation."
      ],
      "points": 1,
      "source": "L09 9:1 p16–17; L08 8:1 p15–18",
      "mockRole": "preparation"
    },
    {
      "id": "L09-nav-recall",
      "practice": "extra",
      "prompt": "Which source subtype group is emphasized in pain signaling?",
      "correct": 0,
      "options": [
        {
          "text": "NaV1.7, NaV1.8 and NaV1.9 channels",
          "feedback": "Correct. NaV1.7, NaV1.8 and NaV1.9 channels."
        },
        {
          "text": "Only the cardiac NaV1.5 channel subtype",
          "feedback": "Use this distinction: NaV1.7, NaV1.8 and NaV1.9 channels."
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
        "NaV1.7, NaV1.8 and NaV1.9 channels."
      ],
      "type": "mc",
      "sectionId": "nav",
      "difficulty": "easy",
      "points": 1,
      "source": "L09 9:1 p18"
    },
    {
      "id": "L09-kv-recall",
      "prompt": "Which type rapidly activates and then rapidly inactivates?",
      "correct": 1,
      "options": [
        {
          "text": "The sustained M-type potassium current",
          "feedback": "Use this distinction: The transient A-type potassium current."
        },
        {
          "text": "The transient A-type potassium current",
          "feedback": "Correct. The transient A-type potassium current."
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
        "The transient A-type potassium current."
      ],
      "type": "mc",
      "sectionId": "kv",
      "difficulty": "easy",
      "points": 1,
      "source": "L09 9:1 p19"
    },
    {
      "id": "L09-kv-match",
      "sectionId": "kv",
      "difficulty": "easy",
      "type": "matchPairs",
      "prompt": "Match each kinetic description to the taught potassium current type.",
      "modelAnswer": [
        "A-type activates and inactivates rapidly.",
        "Delayed rectifier activates with delay and persists.",
        "M-type activates slowly without inactivation."
      ],
      "source": "L09 9:1 p19",
      "points": 1,
      "hints": [
        {
          "body": "Use the structural or functional distinction in the source panel."
        },
        {
          "body": "Treat each item separately; gating, selectivity and topology answer different questions."
        }
      ],
      "right": [
        {
          "id": "m",
          "text": "M-type"
        },
        {
          "id": "a",
          "text": "A-type"
        },
        {
          "id": "d",
          "text": "Delayed rectifier"
        },
        {
          "id": "kir",
          "text": "Inward rectifier"
        }
      ],
      "left": [
        {
          "text": "Rapid activation followed by rapid inactivation",
          "answer": "a",
          "explanation": "Transient A-type."
        },
        {
          "text": "Delayed opening with slow or little inactivation",
          "answer": "d",
          "explanation": "Delayed rectifier."
        },
        {
          "text": "Slow activation and sustained current",
          "answer": "m",
          "explanation": "Non-inactivating M-type."
        }
      ]
    },
    {
      "id": "L09-trp-recall",
      "prompt": "What best characterizes the source TRP family?",
      "correct": 1,
      "options": [
        {
          "text": "Uniformly potassium-selective, strongly voltage-dependent pores",
          "feedback": "Use this distinction: Multimodal, often weakly voltage-dependent cation pores."
        },
        {
          "text": "Multimodal, often weakly voltage-dependent cation pores",
          "feedback": "Correct. Multimodal, often weakly voltage-dependent cation pores."
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
        "Multimodal, often weakly voltage-dependent cation pores."
      ],
      "type": "mc",
      "sectionId": "trp",
      "difficulty": "easy",
      "points": 1,
      "source": "L09 9:1 p20"
    },
    {
      "id": "L09-thermal-recall",
      "practice": "extra",
      "prompt": "Which source stimulus pair activates TRPV1?",
      "correct": 0,
      "options": [
        {
          "text": "Moderate heat and capsaicin exposure",
          "feedback": "Correct. Moderate heat and capsaicin exposure."
        },
        {
          "text": "Only extreme heat without chemical ligands",
          "feedback": "Use this distinction: Moderate heat and capsaicin exposure."
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
        "Moderate heat and capsaicin exposure."
      ],
      "type": "mc",
      "sectionId": "thermal",
      "difficulty": "easy",
      "points": 1,
      "source": "L09 9:1 p21"
    },
    {
      "id": "L09-ligand-recall",
      "prompt": "Which event directly gates an ionotropic receptor?",
      "correct": 1,
      "options": [
        {
          "text": "An obligatory long intracellular transcription cascade",
          "feedback": "Use this distinction: Neurotransmitter binding to the channel complex."
        },
        {
          "text": "Neurotransmitter binding to the channel complex",
          "feedback": "Correct. Neurotransmitter binding to the channel complex."
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
        "Neurotransmitter binding to the channel complex."
      ],
      "type": "mc",
      "sectionId": "ligand",
      "difficulty": "easy",
      "points": 1,
      "source": "L09 9:1 p22"
    },
    {
      "id": "L09-channelopathy-recall",
      "prompt": "What defines a channelopathy?",
      "correct": 0,
      "options": [
        {
          "text": "Disease caused by dysfunctional ion-channel behavior",
          "feedback": "Correct. Disease caused by dysfunctional ion-channel behavior."
        },
        {
          "text": "Any genetic sequence change regardless of its effect",
          "feedback": "Use this distinction: Disease caused by dysfunctional ion-channel behavior."
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
        "Disease caused by dysfunctional ion-channel behavior."
      ],
      "type": "mc",
      "sectionId": "channelopathy",
      "difficulty": "easy",
      "points": 1,
      "source": "L09 9:2 p1–2"
    },
    {
      "id": "L09-toxins-recall",
      "prompt": "Which action defines an agonist in the source?",
      "correct": 1,
      "options": [
        {
          "text": "Prevention of receptor activation by binding",
          "feedback": "Use this distinction: Activation of the receptor through its binding."
        },
        {
          "text": "Activation of the receptor through its binding",
          "feedback": "Correct. Activation of the receptor through its binding."
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
        "Activation of the receptor through its binding."
      ],
      "type": "mc",
      "sectionId": "toxins",
      "difficulty": "easy",
      "points": 1,
      "source": "L09 9:2 p3"
    },
    {
      "id": "L09-ttx-recall",
      "prompt": "What directly explains TTX-induced propagation failure?",
      "correct": 0,
      "options": [
        {
          "text": "Reduced sodium current supporting regenerative depolarization",
          "feedback": "Correct. Reduced sodium current supporting regenerative depolarization."
        },
        {
          "text": "Increased sodium current supporting repetitive depolarization",
          "feedback": "Use this distinction: Reduced sodium current supporting regenerative depolarization."
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
        "Reduced sodium current supporting regenerative depolarization."
      ],
      "type": "mc",
      "sectionId": "ttx",
      "difficulty": "easy",
      "points": 1,
      "source": "L09 9:2 p4"
    },
    {
      "id": "L09-modulation-recall",
      "prompt": "Does a channel-targeting drug imply a mutated target?",
      "correct": 1,
      "options": [
        {
          "text": "Yes, all drug targets must carry a disease mutation",
          "feedback": "Use this distinction: No, normal channels can mediate disease symptoms."
        },
        {
          "text": "No, normal channels can mediate disease symptoms",
          "feedback": "Correct. No, normal channels can mediate disease symptoms."
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
        "No, normal channels can mediate disease symptoms."
      ],
      "type": "mc",
      "sectionId": "modulation",
      "difficulty": "easy",
      "points": 1,
      "source": "L09 9:2 p5"
    },
    {
      "id": "L09-pain-recall",
      "prompt": "What is the source NaV1.7 loss-of-function phenotype?",
      "correct": 0,
      "options": [
        {
          "text": "Congenital reduction or absence of pain sensation",
          "feedback": "Correct. Congenital reduction or absence of pain sensation."
        },
        {
          "text": "Congenital increase in persistent pain sensation",
          "feedback": "Use this distinction: Congenital reduction or absence of pain sensation."
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
        "Congenital reduction or absence of pain sensation."
      ],
      "type": "mc",
      "sectionId": "pain",
      "difficulty": "easy",
      "points": 1,
      "source": "L09 9:2 p6"
    },
    {
      "id": "L09-lidocaine-recall",
      "prompt": "Which states are preferred by the taught lidocaine model?",
      "correct": 1,
      "options": [
        {
          "text": "Only the fully recovered resting closed state",
          "feedback": "Use this distinction: Open and inactivated sodium-channel states."
        },
        {
          "text": "Open and inactivated sodium-channel states",
          "feedback": "Correct. Open and inactivated sodium-channel states."
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
        "Open and inactivated sodium-channel states."
      ],
      "type": "mc",
      "sectionId": "lidocaine",
      "difficulty": "easy",
      "points": 1,
      "source": "L09 9:2 p7"
    },
    {
      "id": "L09-epilepsy-recall",
      "prompt": "What distinguishes hypersynchronization from excitability?",
      "correct": 0,
      "options": [
        {
          "text": "Coordinated timing across a neuronal population",
          "feedback": "Correct. Coordinated timing across a neuronal population."
        },
        {
          "text": "Increased firing within one isolated neuron only",
          "feedback": "Use this distinction: Coordinated timing across a neuronal population."
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
        "Coordinated timing across a neuronal population."
      ],
      "type": "mc",
      "sectionId": "epilepsy",
      "difficulty": "easy",
      "points": 1,
      "source": "L09 9:2 p8"
    },
    {
      "id": "L09-persistent-recall",
      "prompt": "Which defect increases the source persistent sodium current?",
      "correct": 1,
      "options": [
        {
          "text": "Faster complete inactivation eliminating residual current",
          "feedback": "Use this distinction: Impaired inactivation leaving residual inward current."
        },
        {
          "text": "Impaired inactivation leaving residual inward current",
          "feedback": "Correct. Impaired inactivation leaving residual inward current."
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
        "Impaired inactivation leaving residual inward current."
      ],
      "type": "mc",
      "sectionId": "persistent",
      "difficulty": "easy",
      "points": 1,
      "source": "L09 9:2 p9"
    },
    {
      "id": "L09-direct-availability",
      "sectionId": "persistent",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "Use $m=0.5$, $h=0.4$. Find the open fraction.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Activation factor",
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
              "label": "Availability factor",
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
          "title": "Activation power",
          "answer": {
            "value": 0.125,
            "unit": "",
            "tolerance": 0.000375,
            "verification": {
              "relation": "gatePower",
              "inputs": {
                "y": 0.5,
                "count": 3
              },
              "displayScale": 1
            }
          },
          "tex": "m^3=0.5^3",
          "modelAnswer": [
            "Compute the intermediate before the final product.",
            "$m^3=0.5^3$",
            "$0.125$"
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 0.05,
            "unit": "",
            "tolerance": 0.00015000000000000001,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 0.125,
                "b": 0.4
              },
              "displayScale": 1
            }
          },
          "tex": "P_{open}=m^3h",
          "modelAnswer": [
            "Impaired inactivation can raise current at unchanged activation.",
            "$P_{open}=0.5^3(0.4)$",
            "$0.05$"
          ]
        },
        {
          "title": "Check physical plausibility",
          "choices": [
            {
              "label": "The resulting probability or fraction is bounded between zero and one"
            },
            {
              "label": "The fraction must carry the sign of the ionic current"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Probabilities and matched same-sign fractions are dimensionless nonnegative ratios."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $P_{open}=m^3h$."
        },
        {
          "body": "Start with $P_{open}=0.5^3(0.4)$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Impaired inactivation can raise current at unchanged activation."
      ],
      "points": 1,
      "source": "L09 9:2 p9"
    },
    {
      "id": "L09-kv-target-recall",
      "prompt": "Under the taught outward-current conditions, activation tends to",
      "correct": 1,
      "options": [
        {
          "text": "Decrease repolarizing current and promote excess firing",
          "feedback": "Use this distinction: Increase repolarizing current and oppose excess firing."
        },
        {
          "text": "Increase repolarizing current and oppose excess firing",
          "feedback": "Correct. Increase repolarizing current and oppose excess firing."
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
        "Increase repolarizing current and oppose excess firing."
      ],
      "type": "mc",
      "sectionId": "kv-target",
      "difficulty": "easy",
      "points": 1,
      "source": "L09 9:2 p10"
    },
    {
      "id": "L09-herg-recall",
      "prompt": "Which target is the source ventricular safety concern?",
      "correct": 0,
      "options": [
        {
          "text": "KV11.1/hERG supporting cardiac repolarization",
          "feedback": "Correct. KV11.1/hERG supporting cardiac repolarization."
        },
        {
          "text": "KV1.5 considered mainly for atrial-selective targeting",
          "feedback": "Use this distinction: KV11.1/hERG supporting cardiac repolarization."
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
        "KV11.1/hERG supporting cardiac repolarization."
      ],
      "type": "mc",
      "sectionId": "herg",
      "difficulty": "easy",
      "points": 1,
      "source": "L09 9:2 p11"
    },
    {
      "id": "L09-risk-audit",
      "sectionId": "herg",
      "difficulty": "easy",
      "type": "trueFalse",
      "prompt": "Judge each statement and correct every false statement.",
      "statements": [
        {
          "text": "Atrial predominance guarantees that a blocker cannot affect ventricular rhythm.",
          "answer": false,
          "correction": "Atrial predominance is a targeting rationale; off-target effects and exposure still matter."
        },
        {
          "text": "hERG inhibition can reduce repolarizing potassium current.",
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
        "Atrial predominance is a targeting rationale; off-target effects and exposure still matter.",
        "hERG inhibition can reduce repolarizing potassium current."
      ],
      "points": 1,
      "source": "L09 9:2 p11"
    },
    {
      "id": "L09-lqt-recall",
      "practice": "extra",
      "prompt": "Which source change can produce LQT3?",
      "correct": 0,
      "options": [
        {
          "text": "Gain of persistent sodium current through NaV1.5",
          "feedback": "Correct. Gain of persistent sodium current through NaV1.5."
        },
        {
          "text": "Gain of repolarizing potassium current through hERG",
          "feedback": "Use this distinction: Gain of persistent sodium current through NaV1.5."
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
        "Gain of persistent sodium current through NaV1.5."
      ],
      "type": "mc",
      "sectionId": "lqt",
      "difficulty": "easy",
      "points": 1,
      "source": "L09 9:2 p12"
    },
    {
      "id": "L09-screen-recall",
      "prompt": "What does the source tail-current assay directly measure?",
      "correct": 1,
      "options": [
        {
          "text": "Clinical arrhythmia incidence during drug treatment",
          "feedback": "Use this distinction: Channel current during a defined voltage-clamp protocol."
        },
        {
          "text": "Channel current during a defined voltage-clamp protocol",
          "feedback": "Correct. Channel current during a defined voltage-clamp protocol."
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
        "Channel current during a defined voltage-clamp protocol."
      ],
      "type": "mc",
      "sectionId": "screen",
      "difficulty": "easy",
      "points": 1,
      "source": "L09 9:2 p13"
    },
    {
      "id": "L09-direct-remaining",
      "practice": "extra",
      "sectionId": "screen",
      "difficulty": "easy",
      "type": "multiStepCalc",
      "prompt": "A matched tail falls from $8\\times10^{-10}\\,\\mathrm A$ to $3\\times10^{-10}\\,\\mathrm A$. Find fraction remaining.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Drug current",
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
            },
            {
              "label": "Control current",
              "answer": {
                "value": 8e-10,
                "unit": "A",
                "tolerance": 8e-16,
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
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Evaluate",
          "answer": {
            "value": 0.375,
            "unit": "",
            "tolerance": 0.0011250000000000001,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 3e-10,
                "b": 8e-10
              },
              "displayScale": 1
            }
          },
          "tex": "f=I_{drug}/I_{control}",
          "modelAnswer": [
            "Compare matched protocol amplitudes before interpreting inhibition.",
            "$f=300/800$",
            "$0.375$"
          ]
        },
        {
          "title": "Check physical plausibility",
          "choices": [
            {
              "label": "The resulting probability or fraction is bounded between zero and one"
            },
            {
              "label": "The fraction must carry the sign of the ionic current"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Probabilities and matched same-sign fractions are dimensionless nonnegative ratios."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use $f=I_{drug}/I_{control}$."
        },
        {
          "body": "Start with $f=300/800$. Evaluate without changing the stated reference direction."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Compare matched protocol amplitudes before interpreting inhibition."
      ],
      "points": 1,
      "source": "L09 9:2 p13"
    },
    {
      "id": "L09-c1",
      "sectionId": "screen",
      "difficulty": "easy",
      "type": "written",
      "prompt": "a) Define channelopathy. b) Contrast LQT1 and LQT3 function changes. c) Explain atrial selectivity rationale. d) Define a hERG tail current.",
      "hints": [
        {
          "body": "Identify the taught mechanism and the level of measurement."
        },
        {
          "body": "Organize your response by cause, observation, alternative explanation and control."
        }
      ],
      "markScheme": [
        {
          "text": "Channelopathy is dysfunction, inherited or acquired; a neutral variant need not cause disease."
        },
        {
          "text": "LQT1 is KCNQ1 loss; LQT3 is SCN5A persistent-current gain."
        },
        {
          "text": "Atrial KV1.5 targeting is a rationale, not proof of zero ventricular risk."
        },
        {
          "text": "A tail follows a voltage transition, with rapid recovery from inactivation followed by deactivation."
        }
      ],
      "modelAnswer": [
        "Channelopathy is dysfunction, inherited or acquired; a neutral variant need not cause disease.",
        "LQT1 is KCNQ1 loss; LQT3 is SCN5A persistent-current gain.",
        "Atrial KV1.5 targeting is a rationale, not proof of zero ventricular risk.",
        "A tail follows a voltage transition, with rapid recovery from inactivation followed by deactivation."
      ],
      "points": 1,
      "source": "L09 9:2 p2,11–13",
      "mockRole": "preparation"
    },
    {
      "id": "L09-transport-explain",
      "sectionId": "transport",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain pumps, carriers and channels. Use the source panel and distinguish the main mechanism from its nearest alternative.",
      "hints": [
        {
          "body": "Identify the structures or controlled variables shown in this panel."
        },
        {
          "body": "Follow the source relationship, then state what its observation cannot establish."
        }
      ],
      "markScheme": [
        {
          "text": "Pumps convert ATP, light or other energy into gradients."
        },
        {
          "text": "Secondary carriers use an existing gradient to drive another solute uphill."
        },
        {
          "text": "Channels use electrical and chemical driving forces, without obligatory ATP per passing ion."
        },
        {
          "text": "The source compares turnover: channels pass many ions per opening, unlike alternating-access transport."
        }
      ],
      "modelAnswer": [
        "Pumps convert ATP, light or other energy into gradients.",
        "Secondary carriers use an existing gradient to drive another solute uphill.",
        "Channels use electrical and chemical driving forces, without obligatory ATP per passing ion.",
        "The source compares turnover: channels pass many ions per opening, unlike alternating-access transport."
      ],
      "points": 1,
      "source": "L09 9:1 p2",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:1, PDF page 2. Pump, carrier and channel transport pathways and turnover comparison. Printed labels and axes retained.",
        "fallbackAlt": "9:1, PDF page 2. Pump, carrier and channel transport pathways and turnover comparison. Printed labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/ions-02.webp', import.meta.url).href,
          "alt": "9:1, PDF page 2. Pump, carrier and channel transport pathways and turnover comparison. Printed labels and axes retained.",
          "aspect": 1.7562724014336917,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L09-channelome-explain",
      "sectionId": "channelome",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain channelome and cellular functions. Use the source panel and distinguish the main mechanism from its nearest alternative.",
      "hints": [
        {
          "body": "Identify the structures or controlled variables shown in this panel."
        },
        {
          "body": "Follow the source relationship, then state what its observation cannot establish."
        }
      ],
      "markScheme": [
        {
          "text": "The entire membrane channel set includes organelle membranes."
        },
        {
          "text": "Type, number and position change electrical behavior."
        },
        {
          "text": "The source chondrocyte example also links channels to volume, secretion, absorption and signaling."
        }
      ],
      "modelAnswer": [
        "The entire membrane channel set includes organelle membranes.",
        "Type, number and position change electrical behavior.",
        "The source chondrocyte example also links channels to volume, secretion, absorption and signaling."
      ],
      "points": 1,
      "source": "L09 9:1 p3",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:1, PDF page 3. Chondrocyte plasma and organelle channel repertoire. Printed labels and axes retained.",
        "fallbackAlt": "9:1, PDF page 3. Chondrocyte plasma and organelle channel repertoire. Printed labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/ions-03.webp', import.meta.url).href,
          "alt": "9:1, PDF page 3. Chondrocyte plasma and organelle channel repertoire. Printed labels and axes retained.",
          "aspect": 1.4661399548532732,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L09-control-explain",
      "sectionId": "control",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain expression, gating and trafficking. Use the source panel and distinguish the main mechanism from its nearest alternative.",
      "hints": [
        {
          "body": "Identify the structures or controlled variables shown in this panel."
        },
        {
          "body": "Follow the source relationship, then state what its observation cannot establish."
        }
      ],
      "markScheme": [
        {
          "text": "Ion channels are aqueous membrane pores."
        },
        {
          "text": "Expression, gating and trafficking operate on different quantities and time scales."
        },
        {
          "text": "The RPE example illustrates NaV1.4 redistribution, not a universal neuronal trafficking rule."
        }
      ],
      "modelAnswer": [
        "Ion channels are aqueous membrane pores.",
        "Expression, gating and trafficking operate on different quantities and time scales.",
        "The RPE example illustrates NaV1.4 redistribution, not a universal neuronal trafficking rule."
      ],
      "points": 1,
      "source": "L09 9:1 p4",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:1, PDF page 4. Side and top views of a ligand-gated pore with membrane boundaries. Printed labels and axes retained.",
        "fallbackAlt": "9:1, PDF page 4. Side and top views of a ligand-gated pore with membrane boundaries. Printed labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/ions-04.webp', import.meta.url).href,
          "alt": "9:1, PDF page 4. Side and top views of a ligand-gated pore with membrane boundaries. Printed labels and axes retained.",
          "aspect": 0.454320987654321,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L09-kcsa-explain",
      "sectionId": "kcsa",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain kcsa architecture and intracellular ph gate. Use the source panel and distinguish the main mechanism from its nearest alternative.",
      "hints": [
        {
          "body": "Identify the structures or controlled variables shown in this panel."
        },
        {
          "body": "Follow the source relationship, then state what its observation cannot establish."
        }
      ],
      "markScheme": [
        {
          "text": "Four two-helix subunits surround one pore."
        },
        {
          "text": "The P-loop supplies the selectivity filter."
        },
        {
          "text": "The cytoplasmic gate and extracellular filter are separate structures."
        },
        {
          "text": "KcsA is pH-regulated, so it must not be labeled a six-helix voltage-gated channel."
        }
      ],
      "modelAnswer": [
        "Four two-helix subunits surround one pore.",
        "The P-loop supplies the selectivity filter.",
        "The cytoplasmic gate and extracellular filter are separate structures.",
        "KcsA is pH-regulated, so it must not be labeled a six-helix voltage-gated channel."
      ],
      "points": 1,
      "source": "L09 9:1 p5",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:1, PDF page 5. KcsA pore, pore helix, extracellular selectivity filter and cytoplasmic gate. Printed labels and axes retained.",
        "fallbackAlt": "9:1, PDF page 5. KcsA pore, pore helix, extracellular selectivity filter and cytoplasmic gate. Printed labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/ions-05.webp', import.meta.url).href,
          "alt": "9:1, PDF page 5. KcsA pore, pore helix, extracellular selectivity filter and cytoplasmic gate. Printed labels and axes retained.",
          "aspect": 0.6581632653061225,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L09-permeation-explain",
      "sectionId": "permeation",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain follow potassium through the pore. Use the source panel and distinguish the main mechanism from its nearest alternative.",
      "hints": [
        {
          "body": "Identify the structures or controlled variables shown in this panel."
        },
        {
          "body": "Follow the source relationship, then state what its observation cannot establish."
        }
      ],
      "markScheme": [
        {
          "text": "Pore-helix charge attracts potassium into the aqueous cavity."
        },
        {
          "text": "Dehydration costs energy; filter coordination compensates it."
        },
        {
          "text": "Acetylcholine-receptor pores pass sodium and potassium largely hydrated."
        },
        {
          "text": "Gap junctions also pass small molecules; the source gives an approximate size limit, not strict ion selectivity."
        }
      ],
      "modelAnswer": [
        "Pore-helix charge attracts potassium into the aqueous cavity.",
        "Dehydration costs energy; filter coordination compensates it.",
        "Acetylcholine-receptor pores pass sodium and potassium largely hydrated.",
        "Gap junctions also pass small molecules; the source gives an approximate size limit, not strict ion selectivity."
      ],
      "points": 1,
      "source": "L09 9:1 p6",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:1, PDF page 6. Water-filled cavity and carbonyl-coordinated potassium filter. Printed labels and axes retained.",
        "fallbackAlt": "9:1, PDF page 6. Water-filled cavity and carbonyl-coordinated potassium filter. Printed labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/ions-06.webp', import.meta.url).href,
          "alt": "9:1, PDF page 6. Water-filled cavity and carbonyl-coordinated potassium filter. Printed labels and axes retained.",
          "aspect": 0.5690515806988353,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L09-permeation-order",
      "sectionId": "permeation",
      "difficulty": "medium",
      "type": "order",
      "prompt": "Order a potassium ion’s outward passage through the source KcsA pathway.",
      "modelAnswer": [
        "Enter the aqueous cavity from the cytoplasm.",
        "Shed hydration water on entering the narrow filter.",
        "Coordinate with filter carbonyl oxygens during single-file passage.",
        "Leave the filter and rehydrate in extracellular solution."
      ],
      "source": "L09 9:1 p6",
      "points": 1,
      "hints": [
        {
          "body": "Use the structural or functional distinction in the source panel."
        },
        {
          "body": "Treat each item separately; gating, selectivity and topology answer different questions."
        }
      ],
      "items": [
        "Enter the aqueous cavity from the cytoplasm",
        "Shed hydration water at the filter entrance",
        "Pass through carbonyl-coordinated filter sites",
        "Rehydrate in extracellular solution"
      ],
      "correctOrder": [
        0,
        1,
        2,
        3
      ]
    },
    {
      "id": "L09-filter-explain",
      "sectionId": "filter",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain selectivity filter, binding sites and exclusion. Use the source panel and distinguish the main mechanism from its nearest alternative.",
      "hints": [
        {
          "body": "Identify the structures or controlled variables shown in this panel."
        },
        {
          "body": "Follow the source relationship, then state what its observation cannot establish."
        }
      ],
      "markScheme": [
        {
          "text": "The source pore is about $4.5\\,\\mathrm{nm}$ long; its filter about $1.2\\,\\mathrm{nm}$."
        },
        {
          "text": "The filter diameter is roughly $0.2$–$0.3\\,\\mathrm{nm}$, sufficient for dehydrated potassium."
        },
        {
          "text": "Four binding sites are coordinated by eight oxygens per site from the four subunits."
        },
        {
          "text": "Sodium retains water more strongly; filter interactions do not compensate its dehydration as well."
        },
        {
          "text": "The roughly thousand-to-one discrimination is a source example, not a universal selectivity constant."
        }
      ],
      "modelAnswer": [
        "The source pore is about $4.5\\,\\mathrm{nm}$ long; its filter about $1.2\\,\\mathrm{nm}$.",
        "The filter diameter is roughly $0.2$–$0.3\\,\\mathrm{nm}$, sufficient for dehydrated potassium.",
        "Four binding sites are coordinated by eight oxygens per site from the four subunits.",
        "Sodium retains water more strongly; filter interactions do not compensate its dehydration as well.",
        "The roughly thousand-to-one discrimination is a source example, not a universal selectivity constant."
      ],
      "points": 1,
      "source": "L09 9:1 p7",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:1, PDF page 7. Potassium binding sites S1 through S4 and coordinating carbonyl groups. Printed labels and axes retained.",
        "fallbackAlt": "9:1, PDF page 7. Potassium binding sites S1 through S4 and coordinating carbonyl groups. Printed labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/ions-07.webp', import.meta.url).href,
          "alt": "9:1, PDF page 7. Potassium binding sites S1 through S4 and coordinating carbonyl groups. Printed labels and axes retained.",
          "aspect": 1.6842105263157894,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L09-hydration-explain",
      "sectionId": "hydration",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain size, charge, hydration and throughput. Use the source panel and distinguish the main mechanism from its nearest alternative.",
      "hints": [
        {
          "body": "Identify the structures or controlled variables shown in this panel."
        },
        {
          "body": "Follow the source relationship, then state what its observation cannot establish."
        }
      ],
      "markScheme": [
        {
          "text": "Higher charge and smaller size generally strengthen hydration."
        },
        {
          "text": "Dehydration must be balanced by filter interactions."
        },
        {
          "text": "The source estimates $10^6$–$10^8$ ions per second and nanosecond-scale interactions."
        },
        {
          "text": "These orders of magnitude illustrate fast discrimination, not fixed dwell times for every ion/channel."
        }
      ],
      "modelAnswer": [
        "Higher charge and smaller size generally strengthen hydration.",
        "Dehydration must be balanced by filter interactions.",
        "The source estimates $10^6$–$10^8$ ions per second and nanosecond-scale interactions.",
        "These orders of magnitude illustrate fast discrimination, not fixed dwell times for every ion/channel."
      ],
      "points": 1,
      "source": "L09 9:1 p8",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:1, PDF page 8. Bare radii of sodium, calcium, potassium and chloride; hydration shells are not shown. Printed labels and axes retained.",
        "fallbackAlt": "9:1, PDF page 8. Bare radii of sodium, calcium, potassium and chloride; hydration shells are not shown. Printed labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/ions-08.webp', import.meta.url).href,
          "alt": "9:1, PDF page 8. Bare radii of sodium, calcium, potassium and chloride; hydration shells are not shown. Printed labels and axes retained.",
          "aspect": 2.219607843137255,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L09-gating-explain",
      "sectionId": "gating",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain gating, inactivation and concentration economy. Use the source panel and distinguish the main mechanism from its nearest alternative.",
      "hints": [
        {
          "body": "Identify the structures or controlled variables shown in this panel."
        },
        {
          "body": "Follow the source relationship, then state what its observation cannot establish."
        }
      ],
      "markScheme": [
        {
          "text": "Activation and deactivation connect closed and open states."
        },
        {
          "text": "Inactivation reduces availability and recovery restores it."
        },
        {
          "text": "The dependency notation does not specify a unique numerical gating law."
        },
        {
          "text": "Transitions are experimentally unresolved, not literally instantaneous."
        },
        {
          "text": "Gradients are not exactly conserved and pumps still carry an energetic cost."
        }
      ],
      "modelAnswer": [
        "Activation and deactivation connect closed and open states.",
        "Inactivation reduces availability and recovery restores it.",
        "The dependency notation does not specify a unique numerical gating law.",
        "Transitions are experimentally unresolved, not literally instantaneous.",
        "Gradients are not exactly conserved and pumps still carry an energetic cost."
      ],
      "points": 1,
      "source": "L09 9:1 p9",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:1, PDF page 9. Resting-closed, open and inactivated states with activation, deactivation and recovery arrows. Printed labels and axes retained.",
        "fallbackAlt": "9:1, PDF page 9. Resting-closed, open and inactivated states with activation, deactivation and recovery arrows. Printed labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/ions-09.webp', import.meta.url).href,
          "alt": "9:1, PDF page 9. Resting-closed, open and inactivated states with activation, deactivation and recovery arrows. Printed labels and axes retained.",
          "aspect": 1.875,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L09-charge-count",
      "sectionId": "gating",
      "difficulty": "medium",
      "type": "multiStepCalc",
      "prompt": "A constant inward $3.2\\,\\mathrm{pA}$ opening lasts $2\\,\\mathrm{ms}$. Use $e=1.6\\times10^{-19}\\,\\mathrm C$. Find inward monovalent ion count and the voltage change if all net charge charges $200\\,\\mathrm{fF}$.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Inward magnitude",
              "answer": {
                "value": 3.2e-12,
                "unit": "A",
                "tolerance": 3.2e-18,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 3.2e-12,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Duration",
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
            },
            {
              "label": "Capacitance",
              "answer": {
                "value": 2e-13,
                "unit": "F",
                "tolerance": 2e-19,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 2e-13,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Inward charge",
          "answer": {
            "value": 6.4e-15,
            "unit": "C",
            "tolerance": 1.92e-17,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 3.2e-12,
                "b": 0.002
              },
              "displayScale": 1
            }
          },
          "tex": "Q_{in}=|I|t",
          "modelAnswer": [
            "Use inward magnitude, not outward signed charge.",
            "$Q_{in}=|I|t$",
            "$6.4\\times10^{-15}\\,\\mathrm{C}$"
          ]
        },
        {
          "title": "Ion count",
          "answer": {
            "value": 40000,
            "unit": "",
            "tolerance": 120.0,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 6.4e-15,
                "b": 1.6e-19
              },
              "displayScale": 1
            }
          },
          "tex": "n=Q_{in}/e",
          "modelAnswer": [
            "The number of ions is positive.",
            "$n=Q_{in}/e$",
            "$40000$"
          ]
        },
        {
          "title": "Voltage increment",
          "answer": {
            "value": 0.032,
            "unit": "V",
            "tolerance": 9.6e-05,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 6.4e-15,
                "b": 2e-13
              },
              "displayScale": 1
            }
          },
          "tex": "\\Delta V=Q_{in}/C",
          "modelAnswer": [
            "This is a capacitive upper-bound model without other currents.",
            "$\\Delta V=Q_{in}/C$",
            "$0.032\\,\\mathrm{V}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Combine charge conservation and capacitor charge."
        },
        {
          "body": "Start with $Q_{in}=(3.2\\times10^{-12})(2\\times10^{-3})\\,\\mathrm C$; then divide by elementary charge and capacitance separately."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Use inward magnitude, not outward signed charge.",
        "The number of ions is positive.",
        "This is a capacitive upper-bound model without other currents."
      ],
      "points": 1,
      "source": "L09 9:1 p9"
    },
    {
      "id": "L09-single-explain",
      "sectionId": "single",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain stochastic single-channel and ensemble currents. Use the source panel and distinguish the main mechanism from its nearest alternative.",
      "hints": [
        {
          "body": "Identify the structures or controlled variables shown in this panel."
        },
        {
          "body": "Follow the source relationship, then state what its observation cannot establish."
        }
      ],
      "markScheme": [
        {
          "text": "The sodium records show transient inward openings; the potassium records show delayed outward openings."
        },
        {
          "text": "The caption labels sodium traces as experimental and potassium traces as simulated source records."
        },
        {
          "text": "Averages describe population behavior without making each trial deterministic."
        },
        {
          "text": "The right-hand source plot separates unitary current amplitude from stochastic dwell times."
        }
      ],
      "modelAnswer": [
        "The sodium records show transient inward openings; the potassium records show delayed outward openings.",
        "The caption labels sodium traces as experimental and potassium traces as simulated source records.",
        "Averages describe population behavior without making each trial deterministic.",
        "The right-hand source plot separates unitary current amplitude from stochastic dwell times."
      ],
      "points": 1,
      "source": "L09 9:1 p10",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:1, PDF page 10. Source repeated sodium recordings and simulated potassium traces with ensemble means; original command steps and scale bars. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "fallbackAlt": "9:1, PDF page 10. Source repeated sodium recordings and simulated potassium traces with ensemble means; original command steps and scale bars. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/ions-10.webp', import.meta.url).href,
          "alt": "9:1, PDF page 10. Source repeated sodium recordings and simulated potassium traces with ensemble means; original command steps and scale bars. Printed labels and axes retained.",
          "aspect": 1.2439405785770132,
          "quiz": false,
          "layout": "stack",
          "regions": [],
          "minWidth": 760
        }
      }
    },
    {
      "id": "L09-trace-reading",
      "sectionId": "single",
      "difficulty": "medium",
      "type": "interpret",
      "prompt": "Read the source sodium and potassium repeated-step traces. Which observation supports stochastic single-channel gating?",
      "modelAnswer": [
        "Individual trials differ under identical command steps; ensemble averaging produces reproducible kinetics.",
        "The caption distinguishes experimental sodium trials from source-simulated potassium records."
      ],
      "source": "L09 9:1 p10",
      "points": 1,
      "hints": [
        {
          "body": "Use the structural or functional distinction in the source panel."
        },
        {
          "body": "Treat each item separately; gating, selectivity and topology answer different questions."
        }
      ],
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:1, PDF page 10. Source repeated sodium recordings and simulated potassium traces with ensemble means; original command steps and scale bars. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "fallbackAlt": "9:1, PDF page 10. Source repeated sodium recordings and simulated potassium traces with ensemble means; original command steps and scale bars. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/ions-10.webp', import.meta.url).href,
          "alt": "9:1, PDF page 10. Source repeated sodium recordings and simulated potassium traces with ensemble means; original command steps and scale bars. Printed labels and axes retained.",
          "aspect": 1.2439405785770132,
          "quiz": false,
          "layout": "stack",
          "regions": [],
          "minWidth": 760
        }
      },
      "options": [
        {
          "text": "Individual command voltages differ across all repeated steps",
          "feedback": "The command steps are repeated; variation is in channel openings."
        },
        {
          "text": "Individual opening times differ across identical repeated steps",
          "feedback": "Correct. Trial-to-trial timing varies even with a common command."
        }
      ],
      "correct": 1
    },
    {
      "id": "L09-occupancy",
      "sectionId": "single",
      "difficulty": "medium",
      "type": "multiStepCalc",
      "prompt": "At $V=-40\\,\\mathrm{mV}$, $E=20\\,\\mathrm{mV}$, $\\gamma=30\\,\\mathrm{pS}$ and $N=100$, mean current is $-54\\,\\mathrm{pA}$. Infer open probability and explain identifiability if N is unknown.",
      "stages": [
        {
          "title": "Select the relation",
          "choices": [
            {
              "label": "$I=NP_{open}\\gamma(V-E)$"
            },
            {
              "label": "$I=N\\gamma/(V-E)$"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Use number times open probability times unitary current."
          ]
        },
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Voltage",
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
              "label": "Unitary conductance",
              "answer": {
                "value": 3e-11,
                "unit": "S",
                "tolerance": 3e-17,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 3e-11,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Mean current",
              "answer": {
                "value": -5.4e-11,
                "unit": "A",
                "tolerance": 5.3999999999999996e-17,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -5.4e-11,
                    "b": 1
                  },
                  "displayScale": 1
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
            "value": -0.06,
            "unit": "V",
            "tolerance": 0.00017999999999999998,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": -0.04,
                "b": -0.02
              },
              "displayScale": 1
            }
          },
          "tex": "V-E=-0.040-0.020",
          "modelAnswer": [
            "Retain reversal sign.",
            "$V-E=-0.040-0.020$",
            "$-0.06\\,\\mathrm{V}$"
          ]
        },
        {
          "title": "Unitary current",
          "answer": {
            "value": -1.8e-12,
            "unit": "A",
            "tolerance": 5.4e-15,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 3e-11,
                "b": -0.06
              },
              "displayScale": 1
            }
          },
          "tex": "i=(30\\times10^{-12})(-0.060)",
          "modelAnswer": [
            "Negative means inward.",
            "$i=(30\\times10^{-12})(-0.060)$",
            "$-1.8\\times10^{-12}\\,\\mathrm{A}$"
          ]
        },
        {
          "title": "Infer occupancy",
          "answer": {
            "value": 0.3,
            "unit": "",
            "tolerance": 0.0009,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": -5.4e-11,
                "b": -1.8e-10
              },
              "displayScale": 1
            }
          },
          "tex": "P=I/(Ni)",
          "modelAnswer": [
            "Without channel number only NP can be inferred.",
            "$P=I/(Ni)$",
            "$0.3$"
          ]
        },
        {
          "title": "Plausibility",
          "choices": [
            {
              "label": "Probability lies between zero and one"
            },
            {
              "label": "Probability must be negative for inward current"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Current sign cancels in the occupancy ratio."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use the population current relation, solving for occupancy."
        },
        {
          "body": "Start with $V-E=-40-20$ in millivolts, then convert; find unitary current before dividing the mean."
        }
      ],
      "modelAnswer": [
        "Use number times open probability times unitary current.",
        "Convert each stated quantity to the requested unit before evaluating.",
        "Retain reversal sign.",
        "Negative means inward.",
        "Without channel number only NP can be inferred.",
        "Current sign cancels in the occupancy ratio."
      ],
      "points": 1,
      "source": "L09 9:1 p10"
    },
    {
      "id": "L09-a5",
      "sectionId": "single",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Interpret the supplied source single-channel and ensemble panel. Identify the controlled and measured variables, current directions, stochastic evidence and why lower mean does not uniquely prove fewer channels.",
      "hints": [
        {
          "body": "Identify the taught mechanism and the level of measurement."
        },
        {
          "body": "Organize your response by cause, observation, alternative explanation and control."
        }
      ],
      "markScheme": [
        {
          "text": "Voltage is commanded and current is recorded."
        },
        {
          "text": "Individual dwell times vary while the mean has reproducible kinetics."
        },
        {
          "text": "Sodium source openings are inward and potassium source openings outward in their respective protocols."
        },
        {
          "text": "Compare unitary amplitude, occupancy and independent count controls."
        },
        {
          "text": "The source potassium caption marks simulated data; do not claim it is a new experimental record."
        }
      ],
      "modelAnswer": [
        "Voltage is commanded and current is recorded.",
        "Individual dwell times vary while the mean has reproducible kinetics.",
        "Sodium source openings are inward and potassium source openings outward in their respective protocols.",
        "Compare unitary amplitude, occupancy and independent count controls.",
        "The source potassium caption marks simulated data; do not claim it is a new experimental record."
      ],
      "points": 1,
      "source": "L09 9:1 p10",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:1, PDF page 10. Source repeated sodium recordings and simulated potassium traces with ensemble means; original command steps and scale bars. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "fallbackAlt": "9:1, PDF page 10. Source repeated sodium recordings and simulated potassium traces with ensemble means; original command steps and scale bars. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/ions-10.webp', import.meta.url).href,
          "alt": "9:1, PDF page 10. Source repeated sodium recordings and simulated potassium traces with ensemble means; original command steps and scale bars. Printed labels and axes retained.",
          "aspect": 1.2439405785770132,
          "quiz": false,
          "layout": "stack",
          "regions": [],
          "minWidth": 760
        }
      },
      "mockRole": "preparation"
    },
    {
      "id": "L09-classification-explain",
      "sectionId": "classification",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain pore-forming and auxiliary subunits. Use the source panel and distinguish the main mechanism from its nearest alternative.",
      "hints": [
        {
          "body": "Identify the structures or controlled variables shown in this panel."
        },
        {
          "body": "Follow the source relationship, then state what its observation cannot establish."
        }
      ],
      "markScheme": [
        {
          "text": "Classification criteria answer different questions."
        },
        {
          "text": "Auxiliary beta subunits regulate kinetics, voltage dependence and stability."
        },
        {
          "text": "A central pore is common, but chloride, water and ammonia channels can have pathways within individual subunits."
        },
        {
          "text": "The source approximate gene/subunit counts describe diversity rather than a universal stoichiometry."
        }
      ],
      "modelAnswer": [
        "Classification criteria answer different questions.",
        "Auxiliary beta subunits regulate kinetics, voltage dependence and stability.",
        "A central pore is common, but chloride, water and ammonia channels can have pathways within individual subunits.",
        "The source approximate gene/subunit counts describe diversity rather than a universal stoichiometry."
      ],
      "points": 1,
      "source": "L09 9:1 p11",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:1, PDF page 11. Sodium alpha pore protein, auxiliary beta subunits and modulator sites. Printed labels and axes retained.",
        "fallbackAlt": "9:1, PDF page 11. Sodium alpha pore protein, auxiliary beta subunits and modulator sites. Printed labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/ions-11.webp', import.meta.url).href,
          "alt": "9:1, PDF page 11. Sodium alpha pore protein, auxiliary beta subunits and modulator sites. Printed labels and axes retained.",
          "aspect": 0.9508928571428571,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L09-evolution-explain",
      "sectionId": "evolution",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain pore duplication and voltage-sensor additions. Use the source panel and distinguish the main mechanism from its nearest alternative.",
      "hints": [
        {
          "body": "Identify the structures or controlled variables shown in this panel."
        },
        {
          "body": "Follow the source relationship, then state what its observation cannot establish."
        }
      ],
      "markScheme": [
        {
          "text": "Two-helix pore modules are the schematic starting point."
        },
        {
          "text": "Duplication can generate two P-loops in a four-helix unit."
        },
        {
          "text": "Adding S1–S4 makes a six-helix voltage-sensing module."
        },
        {
          "text": "Linked four-domain sodium/calcium alpha subunits reflect repeated homologous modules, not four separate alpha proteins."
        }
      ],
      "modelAnswer": [
        "Two-helix pore modules are the schematic starting point.",
        "Duplication can generate two P-loops in a four-helix unit.",
        "Adding S1–S4 makes a six-helix voltage-sensing module.",
        "Linked four-domain sodium/calcium alpha subunits reflect repeated homologous modules, not four separate alpha proteins."
      ],
      "points": 1,
      "source": "L09 9:1 p12",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:1, PDF page 12. Source schematic pore/sensor duplication and cation-channel topology families. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "fallbackAlt": "9:1, PDF page 12. Source schematic pore/sensor duplication and cation-channel topology families. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/ions-12.webp', import.meta.url).href,
          "alt": "9:1, PDF page 12. Source schematic pore/sensor duplication and cation-channel topology families. Printed labels and axes retained.",
          "aspect": 1.3454545454545455,
          "quiz": false,
          "layout": "stack",
          "regions": [],
          "minWidth": 760
        }
      }
    },
    {
      "id": "L09-evolution-other-explain",
      "practice": "extra",
      "sectionId": "evolution-other",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain ligand-binding and other channel lineages. Use the source panel and distinguish the main mechanism from its nearest alternative.",
      "hints": [
        {
          "body": "Identify the structures or controlled variables shown in this panel."
        },
        {
          "body": "Follow the source relationship, then state what its observation cannot establish."
        }
      ],
      "markScheme": [
        {
          "text": "The source schematic adds glutamate binding to a channel lineage."
        },
        {
          "text": "It depicts duplication in water-channel architecture."
        },
        {
          "text": "Shared ancestry does not mean identical ion selectivity or gating."
        },
        {
          "text": "Treat the diagram as the supplied schematic, not an established universal chronological sequence."
        }
      ],
      "modelAnswer": [
        "The source schematic adds glutamate binding to a channel lineage.",
        "It depicts duplication in water-channel architecture.",
        "Shared ancestry does not mean identical ion selectivity or gating.",
        "Treat the diagram as the supplied schematic, not an established universal chronological sequence."
      ],
      "points": 1,
      "source": "L09 9:1 p13",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:1, PDF page 13. Source ligand, chloride, water, ammonia and connexin lineage/topology schematic. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "fallbackAlt": "9:1, PDF page 13. Source ligand, chloride, water, ammonia and connexin lineage/topology schematic. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/ions-13.webp', import.meta.url).href,
          "alt": "9:1, PDF page 13. Source ligand, chloride, water, ammonia and connexin lineage/topology schematic. Printed labels and axes retained.",
          "aspect": 1.6182336182336183,
          "quiz": false,
          "layout": "stack",
          "regions": [],
          "minWidth": 760
        }
      }
    },
    {
      "id": "L09-families-explain",
      "sectionId": "families",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain structural family reference. Use the source panel and distinguish the main mechanism from its nearest alternative.",
      "hints": [
        {
          "body": "Identify the structures or controlled variables shown in this panel."
        },
        {
          "body": "Follow the source relationship, then state what its observation cannot establish."
        }
      ],
      "markScheme": [
        {
          "text": "One-helix M2 proton channels differ from two-helix examples such as MscL and amiloride-sensitive channels."
        },
        {
          "text": "The S5–S6/P-loop family includes inward rectifiers, tandem-pore, TRP, intracellular-ligand and voltage-gated cation channels, plus calcium-release channels."
        },
        {
          "text": "Extracellular-ligand channels include glutamate receptors and pentameric receptors."
        },
        {
          "text": "Other source families include chloride/bestrophin, ammonia, water, connexin/gap junction, porin, TMBIM, Piezo and fluoride channels."
        },
        {
          "text": "The ATP-sensitive example needs pore/regulatory distinction; family labels alone do not establish the topology of every complete complex."
        }
      ],
      "modelAnswer": [
        "One-helix M2 proton channels differ from two-helix examples such as MscL and amiloride-sensitive channels.",
        "The S5–S6/P-loop family includes inward rectifiers, tandem-pore, TRP, intracellular-ligand and voltage-gated cation channels, plus calcium-release channels.",
        "Extracellular-ligand channels include glutamate receptors and pentameric receptors.",
        "Other source families include chloride/bestrophin, ammonia, water, connexin/gap junction, porin, TMBIM, Piezo and fluoride channels.",
        "The ATP-sensitive example needs pore/regulatory distinction; family labels alone do not establish the topology of every complete complex."
      ],
      "points": 1,
      "source": "L09 9:1 p14",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:1, PDF page 14. Structural-family taxonomy retained as a source reference table. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "fallbackAlt": "9:1, PDF page 14. Structural-family taxonomy retained as a source reference table. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/ions-14.webp', import.meta.url).href,
          "alt": "9:1, PDF page 14. Structural-family taxonomy retained as a source reference table. Printed labels and axes retained.",
          "aspect": 2.0577617328519855,
          "quiz": false,
          "layout": "stack",
          "regions": [],
          "minWidth": 760
        }
      }
    },
    {
      "id": "L09-stimuli-explain",
      "sectionId": "stimuli",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain voltage, ligand, mechanical and multimodal gating. Use the source panel and distinguish the main mechanism from its nearest alternative.",
      "hints": [
        {
          "body": "Identify the structures or controlled variables shown in this panel."
        },
        {
          "body": "Follow the source relationship, then state what its observation cannot establish."
        }
      ],
      "markScheme": [
        {
          "text": "Voltage, ligand and mechanical signals alter opening."
        },
        {
          "text": "Ligands can be extracellular transmitters or intracellular signals such as calcium."
        },
        {
          "text": "Multimodal sensitivity prevents inferring a unique stimulus from topology alone."
        }
      ],
      "modelAnswer": [
        "Voltage, ligand and mechanical signals alter opening.",
        "Ligands can be extracellular transmitters or intracellular signals such as calcium.",
        "Multimodal sensitivity prevents inferring a unique stimulus from topology alone."
      ],
      "points": 1,
      "source": "L09 9:1 p15",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:1, PDF page 15. Voltage, extracellular-ligand, intracellular-ligand and mechanical gating comparisons. Printed labels and axes retained.",
        "fallbackAlt": "9:1, PDF page 15. Voltage, extracellular-ligand, intracellular-ligand and mechanical gating comparisons. Printed labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/ions-15.webp', import.meta.url).href,
          "alt": "9:1, PDF page 15. Voltage, extracellular-ligand, intracellular-ligand and mechanical gating comparisons. Printed labels and axes retained.",
          "aspect": 1.1192307692307693,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L09-cation-explain",
      "sectionId": "cation",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain voltage-gated cation channel organization. Use the source panel and distinguish the main mechanism from its nearest alternative.",
      "hints": [
        {
          "body": "Identify the structures or controlled variables shown in this panel."
        },
        {
          "body": "Follow the source relationship, then state what its observation cannot establish."
        }
      ],
      "markScheme": [
        {
          "text": "Bacterial sodium/calcium channels can assemble four identical subunits."
        },
        {
          "text": "Potassium tetramers may contain identical or different alpha subunits."
        },
        {
          "text": "Auxiliary beta/gamma subunits can modulate the complex."
        },
        {
          "text": "The taught fast-inactivation peptide lies at an N terminus in some potassium channels or between sodium-channel domains."
        }
      ],
      "modelAnswer": [
        "Bacterial sodium/calcium channels can assemble four identical subunits.",
        "Potassium tetramers may contain identical or different alpha subunits.",
        "Auxiliary beta/gamma subunits can modulate the complex.",
        "The taught fast-inactivation peptide lies at an N terminus in some potassium channels or between sodium-channel domains."
      ],
      "points": 1,
      "source": "L09 9:1 p16",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:1, PDF page 16. Linked domains, activation curve and the source pore-occlusion model. Printed labels and axes retained.",
        "fallbackAlt": "9:1, PDF page 16. Linked domains, activation curve and the source pore-occlusion model. Printed labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/ions-16.webp', import.meta.url).href,
          "alt": "9:1, PDF page 16. Linked domains, activation curve and the source pore-occlusion model. Printed labels and axes retained.",
          "aspect": 0.9422382671480144,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L09-sensor-explain",
      "sectionId": "sensor",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain voltage sensor versus pore domain. Use the source panel and distinguish the main mechanism from its nearest alternative.",
      "hints": [
        {
          "body": "Identify the structures or controlled variables shown in this panel."
        },
        {
          "body": "Follow the source relationship, then state what its observation cannot establish."
        }
      ],
      "markScheme": [
        {
          "text": "Four sensor domains surround the potassium pore."
        },
        {
          "text": "The P-loop forms the filter and mutations can alter selectivity."
        },
        {
          "text": "The source S4 example has four positive residues, usually arginine."
        },
        {
          "text": "Sensor displacement yields gating current; ionic current is subsequent permeation."
        },
        {
          "text": "Both N and C termini are intracellular in the supplied six-helix subunit."
        }
      ],
      "modelAnswer": [
        "Four sensor domains surround the potassium pore.",
        "The P-loop forms the filter and mutations can alter selectivity.",
        "The source S4 example has four positive residues, usually arginine.",
        "Sensor displacement yields gating current; ionic current is subsequent permeation.",
        "Both N and C termini are intracellular in the supplied six-helix subunit."
      ],
      "points": 1,
      "source": "L09 9:1 p17",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:1, PDF page 17. Six-helix potassium subunit, tetrameric pore and closed/open sensor coupling. Printed labels and axes retained.",
        "fallbackAlt": "9:1, PDF page 17. Six-helix potassium subunit, tetrameric pore and closed/open sensor coupling. Printed labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/ions-17.webp', import.meta.url).href,
          "alt": "9:1, PDF page 17. Six-helix potassium subunit, tetrameric pore and closed/open sensor coupling. Printed labels and axes retained.",
          "aspect": 1.5087108013937283,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L09-nav-explain",
      "sectionId": "nav",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain sodium subtypes and auxiliary functions. Use the source panel and distinguish the main mechanism from its nearest alternative.",
      "hints": [
        {
          "body": "Identify the structures or controlled variables shown in this panel."
        },
        {
          "body": "Follow the source relationship, then state what its observation cannot establish."
        }
      ],
      "markScheme": [
        {
          "text": "The source adult sensory list includes NaV1.1, NaV1.6, NaV1.7, NaV1.8 and NaV1.9."
        },
        {
          "text": "Different subtypes contribute at different phases of the source action-potential illustration."
        },
        {
          "text": "Alpha forms the pore; beta functions extend beyond gating to expression, adhesion and cytoskeletal interactions."
        }
      ],
      "modelAnswer": [
        "The source adult sensory list includes NaV1.1, NaV1.6, NaV1.7, NaV1.8 and NaV1.9.",
        "Different subtypes contribute at different phases of the source action-potential illustration.",
        "Alpha forms the pore; beta functions extend beyond gating to expression, adhesion and cytoskeletal interactions."
      ],
      "points": 1,
      "source": "L09 9:1 p18",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:1, PDF page 18. Source sodium subtype contributions around an action-potential waveform. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "fallbackAlt": "9:1, PDF page 18. Source sodium subtype contributions around an action-potential waveform. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/ions-18.webp', import.meta.url).href,
          "alt": "9:1, PDF page 18. Source sodium subtype contributions around an action-potential waveform. Printed labels and axes retained.",
          "aspect": 1.7809439002671417,
          "quiz": false,
          "layout": "stack",
          "regions": [],
          "minWidth": 760
        }
      }
    },
    {
      "id": "L09-kv-explain",
      "sectionId": "kv",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain delayed rectifier, a-type and m-type currents. Use the source panel and distinguish the main mechanism from its nearest alternative.",
      "hints": [
        {
          "body": "Identify the structures or controlled variables shown in this panel."
        },
        {
          "body": "Follow the source relationship, then state what its observation cannot establish."
        }
      ],
      "markScheme": [
        {
          "text": "Potassium channels form homo- or heterotetramers."
        },
        {
          "text": "Auxiliary subunits modulate gating, expression and trafficking."
        },
        {
          "text": "Delayed rectifier, A-type and M-type are kinetic descriptions."
        },
        {
          "text": "The source traces use different protocols/scales; amplitude alone cannot identify a kinetic class."
        }
      ],
      "modelAnswer": [
        "Potassium channels form homo- or heterotetramers.",
        "Auxiliary subunits modulate gating, expression and trafficking.",
        "Delayed rectifier, A-type and M-type are kinetic descriptions.",
        "The source traces use different protocols/scales; amplitude alone cannot identify a kinetic class."
      ],
      "points": 1,
      "source": "L09 9:1 p19",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:1, PDF page 19. Delayed rectifier, transient A-type and sustained M-type source currents. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "fallbackAlt": "9:1, PDF page 19. Delayed rectifier, transient A-type and sustained M-type source currents. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/ions-19.webp', import.meta.url).href,
          "alt": "9:1, PDF page 19. Delayed rectifier, transient A-type and sustained M-type source currents. Printed labels and axes retained.",
          "aspect": 1.8355263157894737,
          "quiz": false,
          "layout": "stack",
          "regions": [],
          "minWidth": 760
        }
      }
    },
    {
      "id": "L09-trp-explain",
      "sectionId": "trp",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain trp architecture and multimodal sensing. Use the source panel and distinguish the main mechanism from its nearest alternative.",
      "hints": [
        {
          "body": "Identify the structures or controlled variables shown in this panel."
        },
        {
          "body": "Follow the source relationship, then state what its observation cannot establish."
        }
      ],
      "markScheme": [
        {
          "text": "The source lists temperature, pain, taste, mechanical and visual sensory roles."
        },
        {
          "text": "Ligand-binding sites and physical stimuli can converge on one channel."
        },
        {
          "text": "Family generalizations do not make every member identical."
        }
      ],
      "modelAnswer": [
        "The source lists temperature, pain, taste, mechanical and visual sensory roles.",
        "Ligand-binding sites and physical stimuli can converge on one channel.",
        "Family generalizations do not make every member identical."
      ],
      "points": 1,
      "source": "L09 9:1 p20",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:1, PDF page 20. TRP channel structural models with sensor and pore modules. Printed labels and axes retained.",
        "fallbackAlt": "9:1, PDF page 20. TRP channel structural models with sensor and pore modules. Printed labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/ions-20.webp', import.meta.url).href,
          "alt": "9:1, PDF page 20. TRP channel structural models with sensor and pore modules. Printed labels and axes retained.",
          "aspect": 1.9681274900398407,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L09-thermal-explain",
      "practice": "extra",
      "sectionId": "thermal",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain thermal trp examples and chemical activation. Use the source panel and distinguish the main mechanism from its nearest alternative.",
      "hints": [
        {
          "body": "Identify the structures or controlled variables shown in this panel."
        },
        {
          "body": "Follow the source relationship, then state what its observation cannot establish."
        }
      ],
      "markScheme": [
        {
          "text": "The source diagram spans cold through noxious heat with different TRP members."
        },
        {
          "text": "TRPV1 can respond to both chemical and thermal inputs."
        },
        {
          "text": "Thresholds depend on conditions and are not exact universal thermometers."
        }
      ],
      "modelAnswer": [
        "The source diagram spans cold through noxious heat with different TRP members.",
        "TRPV1 can respond to both chemical and thermal inputs.",
        "Thresholds depend on conditions and are not exact universal thermometers."
      ],
      "points": 1,
      "source": "L09 9:1 p21",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:1, PDF page 21. Source approximate thermal activation ranges across TRP members. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "fallbackAlt": "9:1, PDF page 21. Source approximate thermal activation ranges across TRP members. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/ions-21.webp', import.meta.url).href,
          "alt": "9:1, PDF page 21. Source approximate thermal activation ranges across TRP members. Printed labels and axes retained.",
          "aspect": 3.188841201716738,
          "quiz": false,
          "layout": "stack",
          "regions": [],
          "minWidth": 760
        }
      }
    },
    {
      "id": "L09-ligand-explain",
      "sectionId": "ligand",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain extracellular ligands and nicotinic receptors. Use the source panel and distinguish the main mechanism from its nearest alternative.",
      "hints": [
        {
          "body": "Identify the structures or controlled variables shown in this panel."
        },
        {
          "body": "Follow the source relationship, then state what its observation cannot establish."
        }
      ],
      "markScheme": [
        {
          "text": "The source transmitter examples include acetylcholine, serotonin, glutamate, glycine and GABA."
        },
        {
          "text": "Nicotinic, 5-HT3 and GABAA are pentameric examples; not every ionotropic receptor is pentameric."
        },
        {
          "text": "Nicotinic mixed-cation permeability is distinct from potassium-selective KcsA."
        },
        {
          "text": "A neuromuscular endplate depolarization can trigger a muscle action potential and contraction."
        }
      ],
      "modelAnswer": [
        "The source transmitter examples include acetylcholine, serotonin, glutamate, glycine and GABA.",
        "Nicotinic, 5-HT3 and GABAA are pentameric examples; not every ionotropic receptor is pentameric.",
        "Nicotinic mixed-cation permeability is distinct from potassium-selective KcsA.",
        "A neuromuscular endplate depolarization can trigger a muscle action potential and contraction."
      ],
      "points": 1,
      "source": "L09 9:1 p22",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:1, PDF page 22. Nicotinic receptor structural views and aqueous mixed-cation pathway. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "fallbackAlt": "9:1, PDF page 22. Nicotinic receptor structural views and aqueous mixed-cation pathway. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/ions-22.webp', import.meta.url).href,
          "alt": "9:1, PDF page 22. Nicotinic receptor structural views and aqueous mixed-cation pathway. Printed labels and axes retained.",
          "aspect": 2.6858638743455496,
          "quiz": false,
          "layout": "stack",
          "regions": [],
          "minWidth": 760
        }
      }
    },
    {
      "id": "L09-channelopathy-explain",
      "sectionId": "channelopathy",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain channelopathy: altered function and enac. Use the source panel and distinguish the main mechanism from its nearest alternative.",
      "hints": [
        {
          "body": "Identify the structures or controlled variables shown in this panel."
        },
        {
          "body": "Follow the source relationship, then state what its observation cannot establish."
        }
      ],
      "markScheme": [
        {
          "text": "Changes can affect gating, conductance, selectivity, abundance or signaling."
        },
        {
          "text": "A neutral variant must not be described as dysfunction solely because it is a mutation."
        },
        {
          "text": "Liddle example: increased sodium retention expands extracellular volume and raises pressure."
        },
        {
          "text": "Inherited and acquired causes are both possible."
        }
      ],
      "modelAnswer": [
        "Changes can affect gating, conductance, selectivity, abundance or signaling.",
        "A neutral variant must not be described as dysfunction solely because it is a mutation.",
        "Liddle example: increased sodium retention expands extracellular volume and raises pressure.",
        "Inherited and acquired causes are both possible."
      ],
      "points": 1,
      "source": "L09 9:2 p1–2",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:2, PDF page 2. Source disease/channel association diagram; associations alone do not establish a mutation effect. Printed labels and axes retained.",
        "fallbackAlt": "9:2, PDF page 2. Source disease/channel association diagram; associations alone do not establish a mutation effect. Printed labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/applications-02.webp', import.meta.url).href,
          "alt": "9:2, PDF page 2. Source disease/channel association diagram; associations alone do not establish a mutation effect. Printed labels and axes retained.",
          "aspect": 1.61875,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L09-toxins-explain",
      "practice": "extra",
      "sectionId": "toxins",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain toxin mechanisms: block, activate and alter gating. Use the source panel and distinguish the main mechanism from its nearest alternative.",
      "hints": [
        {
          "body": "Identify the structures or controlled variables shown in this panel."
        },
        {
          "body": "Follow the source relationship, then state what its observation cannot establish."
        }
      ],
      "markScheme": [
        {
          "text": "TTX blocks sodium channels from outside; batrachotoxin slows inactivation and shifts activation."
        },
        {
          "text": "The source table also shows potassium and calcium-channel blockers."
        },
        {
          "text": "Alpha-bungarotoxin antagonizes nicotinic receptors; strychnine competitively antagonizes glycine receptors."
        },
        {
          "text": "Apamin targets small calcium-activated potassium channels; omega-conotoxin targets N-type calcium channels."
        },
        {
          "text": "These examples identify mechanisms, not recommended uses or toxic doses."
        }
      ],
      "modelAnswer": [
        "TTX blocks sodium channels from outside; batrachotoxin slows inactivation and shifts activation.",
        "The source table also shows potassium and calcium-channel blockers.",
        "Alpha-bungarotoxin antagonizes nicotinic receptors; strychnine competitively antagonizes glycine receptors.",
        "Apamin targets small calcium-activated potassium channels; omega-conotoxin targets N-type calcium channels.",
        "These examples identify mechanisms, not recommended uses or toxic doses."
      ],
      "points": 1,
      "source": "L09 9:2 p3",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:2, PDF page 3. Source toxin mechanisms and target channels. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "fallbackAlt": "9:2, PDF page 3. Source toxin mechanisms and target channels. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/applications-03.webp', import.meta.url).href,
          "alt": "9:2, PDF page 3. Source toxin mechanisms and target channels. Printed labels and axes retained.",
          "aspect": 0.699814126394052,
          "quiz": false,
          "layout": "stack",
          "regions": [],
          "minWidth": 760
        }
      }
    },
    {
      "id": "L09-ttx-explain",
      "sectionId": "ttx",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain ttx sensitivity and propagation failure. Use the source panel and distinguish the main mechanism from its nearest alternative.",
      "hints": [
        {
          "body": "Identify the structures or controlled variables shown in this panel."
        },
        {
          "body": "Follow the source relationship, then state what its observation cannot establish."
        }
      ],
      "markScheme": [
        {
          "text": "The source contrasts low-concentration-sensitive NaV1.1–1.4,1.6,1.7 with relatively resistant NaV1.5,1.8,1.9."
        },
        {
          "text": "The source traces show reduced current during blocker application."
        },
        {
          "text": "Reduced propagation can impair skeletal muscle activation and respiration."
        },
        {
          "text": "Subtype sensitivity depends on conditions and does not define a safe exposure."
        }
      ],
      "modelAnswer": [
        "The source contrasts low-concentration-sensitive NaV1.1–1.4,1.6,1.7 with relatively resistant NaV1.5,1.8,1.9.",
        "The source traces show reduced current during blocker application.",
        "Reduced propagation can impair skeletal muscle activation and respiration.",
        "Subtype sensitivity depends on conditions and does not define a safe exposure."
      ],
      "points": 1,
      "source": "L09 9:2 p4",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:2, PDF page 4. Source TTX current suppression and relative sensitive/resistant subtype table. Printed labels and axes retained.",
        "fallbackAlt": "9:2, PDF page 4. Source TTX current suppression and relative sensitive/resistant subtype table. Printed labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/applications-04.webp', import.meta.url).href,
          "alt": "9:2, PDF page 4. Source TTX current suppression and relative sensitive/resistant subtype table. Printed labels and axes retained.",
          "aspect": 0.6592233009708738,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L09-modulation-explain",
      "sectionId": "modulation",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain direct modulation versus compensation. Use the source panel and distinguish the main mechanism from its nearest alternative.",
      "hints": [
        {
          "body": "Identify the structures or controlled variables shown in this panel."
        },
        {
          "body": "Follow the source relationship, then state what its observation cannot establish."
        }
      ],
      "markScheme": [
        {
          "text": "Direct treatment should oppose the measured functional defect."
        },
        {
          "text": "Compensation uses a different pathway rather than repairing the original mutation."
        },
        {
          "text": "The source inflammatory-pain example uses sodium blockade to reduce signaling without assuming a sodium-channel mutation."
        },
        {
          "text": "The table illustrates channel targets across different indications, not a prescribing algorithm."
        }
      ],
      "modelAnswer": [
        "Direct treatment should oppose the measured functional defect.",
        "Compensation uses a different pathway rather than repairing the original mutation.",
        "The source inflammatory-pain example uses sodium blockade to reduce signaling without assuming a sodium-channel mutation.",
        "The table illustrates channel targets across different indications, not a prescribing algorithm."
      ],
      "points": 1,
      "source": "L09 9:2 p5",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:2, PDF page 5. Source illustrative drug/channel target table, not prescribing guidance. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "fallbackAlt": "9:2, PDF page 5. Source illustrative drug/channel target table, not prescribing guidance. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/applications-05.webp', import.meta.url).href,
          "alt": "9:2, PDF page 5. Source illustrative drug/channel target table, not prescribing guidance. Printed labels and axes retained.",
          "aspect": 0.6801275239107333,
          "quiz": false,
          "layout": "stack",
          "regions": [],
          "minWidth": 760
        }
      }
    },
    {
      "id": "L09-pain-explain",
      "practice": "extra",
      "sectionId": "pain",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain sodium-channel loss and gain in pain. Use the source panel and distinguish the main mechanism from its nearest alternative.",
      "hints": [
        {
          "body": "Identify the structures or controlled variables shown in this panel."
        },
        {
          "body": "Follow the source relationship, then state what its observation cannot establish."
        }
      ],
      "markScheme": [
        {
          "text": "NaV1.7,1.8,1.9 are linked to pain pathways."
        },
        {
          "text": "Opposite functional changes can give opposite phenotypes."
        },
        {
          "text": "Subtype distribution matters for therapeutic selectivity."
        },
        {
          "text": "The slide does not establish present approval status, dosing, or guaranteed clinical safety."
        }
      ],
      "modelAnswer": [
        "NaV1.7,1.8,1.9 are linked to pain pathways.",
        "Opposite functional changes can give opposite phenotypes.",
        "Subtype distribution matters for therapeutic selectivity.",
        "The slide does not establish present approval status, dosing, or guaranteed clinical safety."
      ],
      "points": 1,
      "source": "L09 9:2 p6",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:2, PDF page 6. Source tissue and sensory-fiber sodium subtype distribution. Printed labels and axes retained.",
        "fallbackAlt": "9:2, PDF page 6. Source tissue and sensory-fiber sodium subtype distribution. Printed labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/applications-06.webp', import.meta.url).href,
          "alt": "9:2, PDF page 6. Source tissue and sensory-fiber sodium subtype distribution. Printed labels and axes retained.",
          "aspect": 1.7769347496206374,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L09-lidocaine-explain",
      "sectionId": "lidocaine",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain state-dependent blockade and cardiac context. Use the source panel and distinguish the main mechanism from its nearest alternative.",
      "hints": [
        {
          "body": "Identify the structures or controlled variables shown in this panel."
        },
        {
          "body": "Follow the source relationship, then state what its observation cannot establish."
        }
      ],
      "markScheme": [
        {
          "text": "State dependence links drug effects to membrane activity."
        },
        {
          "text": "The source class-I model reduces ventricular excitability by reducing sodium influx."
        },
        {
          "text": "Class IB lidocaine is emphasized in depolarized/ischemic tissue."
        },
        {
          "text": "The source compares normal-tissue sodium block IC greater than IA greater than IB, not universal safety rankings."
        },
        {
          "text": "Sketching the source waveforms requires labeling voltage and time and distinguishing depolarization from repolarization."
        }
      ],
      "modelAnswer": [
        "State dependence links drug effects to membrane activity.",
        "The source class-I model reduces ventricular excitability by reducing sodium influx.",
        "Class IB lidocaine is emphasized in depolarized/ischemic tissue.",
        "The source compares normal-tissue sodium block IC greater than IA greater than IB, not universal safety rankings.",
        "Sketching the source waveforms requires labeling voltage and time and distinguishing depolarization from repolarization."
      ],
      "points": 1,
      "source": "L09 9:2 p7",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:2, PDF page 7. Source class-I sodium-blocker ventricular waveforms and class comparison. Printed labels and axes retained.",
        "fallbackAlt": "9:2, PDF page 7. Source class-I sodium-blocker ventricular waveforms and class comparison. Printed labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/applications-07.webp', import.meta.url).href,
          "alt": "9:2, PDF page 7. Source class-I sodium-blocker ventricular waveforms and class comparison. Printed labels and axes retained.",
          "aspect": 0.7284345047923323,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L09-epilepsy-explain",
      "practice": "extra",
      "sectionId": "epilepsy",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain hyperexcitability and hypersynchronization. Use the source panel and distinguish the main mechanism from its nearest alternative.",
      "hints": [
        {
          "body": "Identify the structures or controlled variables shown in this panel."
        },
        {
          "body": "Follow the source relationship, then state what its observation cannot establish."
        }
      ],
      "markScheme": [
        {
          "text": "The source illustrates repetitive abnormal discharges against a normal action potential."
        },
        {
          "text": "Hyperexcitability is a firing property; hypersynchronization is a population timing property."
        },
        {
          "text": "Causes can be monogenic or multifactorial."
        },
        {
          "text": "The slide drug-target proportion is historical context, not a current market statistic."
        }
      ],
      "modelAnswer": [
        "The source illustrates repetitive abnormal discharges against a normal action potential.",
        "Hyperexcitability is a firing property; hypersynchronization is a population timing property.",
        "Causes can be monogenic or multifactorial.",
        "The slide drug-target proportion is historical context, not a current market statistic."
      ],
      "points": 1,
      "source": "L09 9:2 p8",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:2, PDF page 8. Source normal and repetitive-discharge voltage traces, with time axes. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "fallbackAlt": "9:2, PDF page 8. Source normal and repetitive-discharge voltage traces, with time axes. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/applications-08.webp', import.meta.url).href,
          "alt": "9:2, PDF page 8. Source normal and repetitive-discharge voltage traces, with time axes. Printed labels and axes retained.",
          "aspect": 2.006269592476489,
          "quiz": false,
          "layout": "stack",
          "regions": [],
          "minWidth": 760
        }
      }
    },
    {
      "id": "L09-b5",
      "sectionId": "persistent",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Read the supplied normal versus abnormal persistent-current source panel. Propose voltage-clamp evidence for impaired inactivation, separate expression changes and state why seizure synchronization needs additional evidence.",
      "hints": [
        {
          "body": "Identify the taught mechanism and the level of measurement."
        },
        {
          "body": "Organize your response by cause, observation, alternative explanation and control."
        }
      ],
      "markScheme": [
        {
          "text": "Compare residual current after an identical depolarizing step."
        },
        {
          "text": "Normalize peak/current density while controlling expression and driving force."
        },
        {
          "text": "A larger persistent fraction supports altered availability, not merely increased abundance."
        },
        {
          "text": "Population timing and cell identity are needed for a network interpretation."
        }
      ],
      "modelAnswer": [
        "Compare residual current after an identical depolarizing step.",
        "Normalize peak/current density while controlling expression and driving force.",
        "A larger persistent fraction supports altered availability, not merely increased abundance.",
        "Population timing and cell identity are needed for a network interpretation."
      ],
      "points": 1,
      "source": "L09 9:2 p8–9; L07 PDF7,18,22",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:2, PDF page 9. Normal inactivation versus increased persistent sodium current in the supplied diagram. Printed labels and axes retained.",
        "fallbackAlt": "9:2, PDF page 9. Normal inactivation versus increased persistent sodium current in the supplied diagram. Printed labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/applications-09.webp', import.meta.url).href,
          "alt": "9:2, PDF page 9. Normal inactivation versus increased persistent sodium current in the supplied diagram. Printed labels and axes retained.",
          "aspect": 1.1636363636363636,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      },
      "mockRole": "preparation"
    },
    {
      "id": "L09-persistent-explain",
      "sectionId": "persistent",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain impaired inactivation and persistent sodium current. Use the source panel and distinguish the main mechanism from its nearest alternative.",
      "hints": [
        {
          "body": "Identify the structures or controlled variables shown in this panel."
        },
        {
          "body": "Follow the source relationship, then state what its observation cannot establish."
        }
      ],
      "markScheme": [
        {
          "text": "The source lists sodium, potassium, calcium and TRP channel associations."
        },
        {
          "text": "A change in expression differs from a change in single-channel function."
        },
        {
          "text": "Reduced inactivation increases residual sodium influx at depolarized voltage."
        },
        {
          "text": "Association and temporal precedence alone do not uniquely establish the whole seizure mechanism."
        }
      ],
      "modelAnswer": [
        "The source lists sodium, potassium, calcium and TRP channel associations.",
        "A change in expression differs from a change in single-channel function.",
        "Reduced inactivation increases residual sodium influx at depolarized voltage.",
        "Association and temporal precedence alone do not uniquely establish the whole seizure mechanism."
      ],
      "points": 1,
      "source": "L09 9:2 p9",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:2, PDF page 9. Normal inactivation versus increased persistent sodium current in the supplied diagram. Printed labels and axes retained.",
        "fallbackAlt": "9:2, PDF page 9. Normal inactivation versus increased persistent sodium current in the supplied diagram. Printed labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/applications-09.webp', import.meta.url).href,
          "alt": "9:2, PDF page 9. Normal inactivation versus increased persistent sodium current in the supplied diagram. Printed labels and axes retained.",
          "aspect": 1.1636363636363636,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L09-kv-target-explain",
      "sectionId": "kv-target",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain potassium modulation and excitability. Use the source panel and distinguish the main mechanism from its nearest alternative.",
      "hints": [
        {
          "body": "Identify the structures or controlled variables shown in this panel."
        },
        {
          "body": "Follow the source relationship, then state what its observation cannot establish."
        }
      ],
      "markScheme": [
        {
          "text": "Block can slow repolarization and change firing."
        },
        {
          "text": "Activation can enhance outward current and oppose hyperexcitability."
        },
        {
          "text": "The proposed depression/cognition and epilepsy/pain applications are source examples."
        },
        {
          "text": "Do not infer a universal change in firing from conductance alone without driving force."
        }
      ],
      "modelAnswer": [
        "Block can slow repolarization and change firing.",
        "Activation can enhance outward current and oppose hyperexcitability.",
        "The proposed depression/cognition and epilepsy/pain applications are source examples.",
        "Do not infer a universal change in firing from conductance alone without driving force."
      ],
      "points": 1,
      "source": "L09 9:2 p10",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:2, PDF page 10. Source potassium-channel modulation and firing examples. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "fallbackAlt": "9:2, PDF page 10. Source potassium-channel modulation and firing examples. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/applications-10.webp', import.meta.url).href,
          "alt": "9:2, PDF page 10. Source potassium-channel modulation and firing examples. Printed labels and axes retained.",
          "aspect": 1.869244935543278,
          "quiz": false,
          "layout": "stack",
          "regions": [],
          "minWidth": 760
        }
      }
    },
    {
      "id": "L09-herg-explain",
      "sectionId": "herg",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain herg hazard and atrial-target contrast. Use the source panel and distinguish the main mechanism from its nearest alternative.",
      "hints": [
        {
          "body": "Identify the structures or controlled variables shown in this panel."
        },
        {
          "body": "Follow the source relationship, then state what its observation cannot establish."
        }
      ],
      "markScheme": [
        {
          "text": "The source pairs hERG inhibition with reduced repolarizing potassium current."
        },
        {
          "text": "QT prolongation can increase ventricular-arrhythmia risk."
        },
        {
          "text": "KV1.5 expression supports an atrial-selectivity strategy."
        },
        {
          "text": "Off-target activity and actual exposure still matter; atrial predominance does not prove zero risk."
        }
      ],
      "modelAnswer": [
        "The source pairs hERG inhibition with reduced repolarizing potassium current.",
        "QT prolongation can increase ventricular-arrhythmia risk.",
        "KV1.5 expression supports an atrial-selectivity strategy.",
        "Off-target activity and actual exposure still matter; atrial predominance does not prove zero risk."
      ],
      "points": 1,
      "source": "L09 9:2 p11",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:2, PDF page 11. Source atrial versus ventricular action-potential responses to the KV1.5 targeting example. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "fallbackAlt": "9:2, PDF page 11. Source atrial versus ventricular action-potential responses to the KV1.5 targeting example. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/applications-11.webp', import.meta.url).href,
          "alt": "9:2, PDF page 11. Source atrial versus ventricular action-potential responses to the KV1.5 targeting example. Printed labels and axes retained.",
          "aspect": 3.1660649819494586,
          "quiz": false,
          "layout": "stack",
          "regions": [],
          "minWidth": 760
        }
      }
    },
    {
      "id": "L09-lqt-explain",
      "sectionId": "lqt",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain distinct channel defects converge on long qt. Use the source panel and distinguish the main mechanism from its nearest alternative.",
      "hints": [
        {
          "body": "Identify the structures or controlled variables shown in this panel."
        },
        {
          "body": "Follow the source relationship, then state what its observation cannot establish."
        }
      ],
      "markScheme": [
        {
          "text": "LQT1: KV7.1 loss; LQT2: hERG loss; LQT3: sodium gain."
        },
        {
          "text": "Different molecular changes can converge on delayed repolarization."
        },
        {
          "text": "The source threshold is a simplified teaching example, not a universal clinical diagnostic criterion."
        },
        {
          "text": "The ECG QT interval is not a single isolated-cell voltage recording."
        },
        {
          "text": "In the source comparison potassium activation shortens and inhibition prolongs repolarization."
        }
      ],
      "modelAnswer": [
        "LQT1: KV7.1 loss; LQT2: hERG loss; LQT3: sodium gain.",
        "Different molecular changes can converge on delayed repolarization.",
        "The source threshold is a simplified teaching example, not a universal clinical diagnostic criterion.",
        "The ECG QT interval is not a single isolated-cell voltage recording.",
        "In the source comparison potassium activation shortens and inhibition prolongs repolarization."
      ],
      "points": 1,
      "source": "L09 9:2 p12",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:2, PDF page 12. Source ventricular repolarization and ECG QT comparison. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "fallbackAlt": "9:2, PDF page 12. Source ventricular repolarization and ECG QT comparison. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/applications-12.webp', import.meta.url).href,
          "alt": "9:2, PDF page 12. Source ventricular repolarization and ECG QT comparison. Printed labels and axes retained.",
          "aspect": 3.0311418685121105,
          "quiz": false,
          "layout": "stack",
          "regions": [],
          "minWidth": 760
        }
      }
    },
    {
      "id": "L09-screen-explain",
      "practice": "extra",
      "sectionId": "screen",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Explain read herg tail currents and inhibition curves. Use the source panel and distinguish the main mechanism from its nearest alternative.",
      "hints": [
        {
          "body": "Identify the structures or controlled variables shown in this panel."
        },
        {
          "body": "Follow the source relationship, then state what its observation cannot establish."
        }
      ],
      "markScheme": [
        {
          "text": "Identify voltage control and measured membrane current."
        },
        {
          "text": "Tail amplitude can index available hERG current under a fixed protocol."
        },
        {
          "text": "Normalize matched control and drug records; concentration-response curves show inhibition, not clinical risk by themselves."
        },
        {
          "text": "Control leak, capacitance, rundown, time, concentration and voltage protocol."
        },
        {
          "text": "Terfenadine and quinidine are the source examples. No exact curve digitization, new IC50 fit or present safety guideline is asserted."
        }
      ],
      "modelAnswer": [
        "Identify voltage control and measured membrane current.",
        "Tail amplitude can index available hERG current under a fixed protocol.",
        "Normalize matched control and drug records; concentration-response curves show inhibition, not clinical risk by themselves.",
        "Control leak, capacitance, rundown, time, concentration and voltage protocol.",
        "Terfenadine and quinidine are the source examples. No exact curve digitization, new IC50 fit or present safety guideline is asserted."
      ],
      "points": 1,
      "source": "L09 9:2 p13",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:2, PDF page 13. Source CHO-cell hERG tails and normalized terfenadine/quinidine inhibition curves. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "fallbackAlt": "9:2, PDF page 13. Source CHO-cell hERG tails and normalized terfenadine/quinidine inhibition curves. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/applications-13.webp', import.meta.url).href,
          "alt": "9:2, PDF page 13. Source CHO-cell hERG tails and normalized terfenadine/quinidine inhibition curves. Printed labels and axes retained.",
          "aspect": 4.225,
          "quiz": false,
          "layout": "stack",
          "regions": [],
          "minWidth": 1000
        }
      }
    },
    {
      "id": "L09-matched-inhibition",
      "practice": "extra",
      "sectionId": "screen",
      "difficulty": "medium",
      "type": "multiStepCalc",
      "prompt": "At an identical clamp protocol the control tail is $1.2\\,\\mathrm{nA}$, vehicle time-control is $1.0\\,\\mathrm{nA}$ and drug tail is $0.4\\,\\mathrm{nA}$. Compare remaining fractions using the original and time-matched controls. Do not treat the difference as a fitted drug-binding law.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Original control",
              "answer": {
                "value": 1.2e-09,
                "unit": "A",
                "tolerance": 1.2e-15,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1.2e-09,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Time control",
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
              "label": "Drug",
              "answer": {
                "value": 4e-10,
                "unit": "A",
                "tolerance": 4e-16,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 4e-10,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Original-baseline fraction",
          "answer": {
            "value": 0.3333333333333333,
            "unit": "",
            "tolerance": 0.001,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 4e-10,
                "b": 1.2e-09
              },
              "displayScale": 1
            }
          },
          "tex": "f_{original}=0.4/1.2",
          "modelAnswer": [
            "This includes time-related decline.",
            "$f_{original}=0.4/1.2$",
            "$0.33333333$"
          ]
        },
        {
          "title": "Time-matched fraction",
          "answer": {
            "value": 0.4,
            "unit": "",
            "tolerance": 0.0012000000000000001,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 4e-10,
                "b": 1e-09
              },
              "displayScale": 1
            }
          },
          "tex": "f_{matched}=0.4/1.0",
          "modelAnswer": [
            "A time-matched control partially separates rundown.",
            "$f_{matched}=0.4/1.0$",
            "$0.4$"
          ]
        },
        {
          "title": "Interpretation",
          "choices": [
            {
              "label": "Rundown makes the original-baseline inhibition appear larger"
            },
            {
              "label": "Rundown proves every current reduction is direct pore block"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Neither normalization alone proves a molecular binding mechanism."
          ]
        }
      ],
      "hints": [
        {
          "body": "Compare currents only with an explicit baseline."
        },
        {
          "body": "First convert all currents to amperes; form two ratios using the same drug numerator."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "This includes time-related decline.",
        "A time-matched control partially separates rundown.",
        "Neither normalization alone proves a molecular binding mechanism."
      ],
      "points": 1,
      "source": "L09 9:2 p13"
    },
    {
      "id": "L09-c5",
      "sectionId": "screen",
      "difficulty": "medium",
      "type": "written",
      "prompt": "Interpret the supplied hERG tail and drug-response source panels. Identify the measurement mode, a normalization strategy, rundown/artifact controls and what cannot be concluded from the curve.",
      "hints": [
        {
          "body": "Identify the taught mechanism and the level of measurement."
        },
        {
          "body": "Organize your response by cause, observation, alternative explanation and control."
        }
      ],
      "markScheme": [
        {
          "text": "Voltage is controlled and current measured in the source patch-clamp assay."
        },
        {
          "text": "Use matched time-control and drug tails at the same protocol."
        },
        {
          "text": "Check leak, capacitance, rundown, voltage/solutions and exposure."
        },
        {
          "text": "No precise IC50 is digitized here; inhibition alone does not measure clinical arrhythmia incidence."
        }
      ],
      "modelAnswer": [
        "Voltage is controlled and current measured in the source patch-clamp assay.",
        "Use matched time-control and drug tails at the same protocol.",
        "Check leak, capacitance, rundown, voltage/solutions and exposure.",
        "No precise IC50 is digitized here; inhibition alone does not measure clinical arrhythmia incidence."
      ],
      "points": 1,
      "source": "L09 9:2 p13",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:2, PDF page 13. Source CHO-cell hERG tails and normalized terfenadine/quinidine inhibition curves. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "fallbackAlt": "9:2, PDF page 13. Source CHO-cell hERG tails and normalized terfenadine/quinidine inhibition curves. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/applications-13.webp', import.meta.url).href,
          "alt": "9:2, PDF page 13. Source CHO-cell hERG tails and normalized terfenadine/quinidine inhibition curves. Printed labels and axes retained.",
          "aspect": 4.225,
          "quiz": false,
          "layout": "stack",
          "regions": [],
          "minWidth": 1000
        }
      },
      "mockRole": "preparation"
    },
    {
      "id": "L09-filter-synthesis",
      "sectionId": "filter",
      "difficulty": "hard",
      "type": "written",
      "prompt": "A pore mutation makes its carbonyl geometry less favorable for potassium. Explain why bare radius alone cannot predict the new selectivity and propose a comparison that separates selectivity from channel number.",
      "hints": [
        {
          "body": "Separate the measured current from the proposed molecular or disease mechanism."
        },
        {
          "body": "List an alternative explanation and a matched control before drawing the causal conclusion."
        }
      ],
      "markScheme": [
        {
          "text": "Compare dehydration cost with compensating pore interactions."
        },
        {
          "text": "Changing geometry can change relative permeation without a monotonic bare-size rule."
        },
        {
          "text": "Measure reversal/current with controlled ionic gradients rather than just total amplitude."
        },
        {
          "text": "Control expression, open probability, voltage and gradients before attributing reduced current to selectivity."
        }
      ],
      "modelAnswer": [
        "Compare dehydration cost with compensating pore interactions.",
        "Changing geometry can change relative permeation without a monotonic bare-size rule.",
        "Measure reversal/current with controlled ionic gradients rather than just total amplitude.",
        "Control expression, open probability, voltage and gradients before attributing reduced current to selectivity."
      ],
      "points": 1,
      "source": "L09 9:1 p7",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:1, PDF page 7. Potassium binding sites S1 through S4 and coordinating carbonyl groups. Printed labels and axes retained.",
        "fallbackAlt": "9:1, PDF page 7. Potassium binding sites S1 through S4 and coordinating carbonyl groups. Printed labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/ions-07.webp', import.meta.url).href,
          "alt": "9:1, PDF page 7. Potassium binding sites S1 through S4 and coordinating carbonyl groups. Printed labels and axes retained.",
          "aspect": 1.6842105263157894,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L09-a4",
      "sectionId": "gating",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "A brief ideal opening passes constant inward $4\\,\\mathrm{pA}$ for $5\\,\\mathrm{ms}$ into a $2\\,\\mathrm{pF}$ patch. Use $e=1.6\\times10^{-19}\\,\\mathrm C$. Find inward charge, monovalent ion count and voltage increment without leak. Then explain why voltage clamp instead supplies balancing current.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Current magnitude",
              "answer": {
                "value": 4e-12,
                "unit": "A",
                "tolerance": 3.9999999999999995e-18,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 4e-12,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Duration",
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
            },
            {
              "label": "Capacitance",
              "answer": {
                "value": 2e-12,
                "unit": "F",
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
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Charge",
          "answer": {
            "value": 2e-14,
            "unit": "C",
            "tolerance": 6e-17,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 4e-12,
                "b": 0.005
              },
              "displayScale": 1
            }
          },
          "tex": "Q_{in}=|i|t",
          "modelAnswer": [
            "This is inward positive charge.",
            "$Q_{in}=|i|t$",
            "$2\\times10^{-14}\\,\\mathrm{C}$"
          ]
        },
        {
          "title": "Ion count",
          "answer": {
            "value": 125000,
            "unit": "",
            "tolerance": 375.0,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 2e-14,
                "b": 1.6e-19
              },
              "displayScale": 1
            }
          },
          "tex": "n=Q_{in}/e",
          "modelAnswer": [
            "A microscopic charge can change voltage without large bulk concentration changes.",
            "$n=Q_{in}/e$",
            "$125000$"
          ]
        },
        {
          "title": "Unclamped increment",
          "answer": {
            "value": 0.01,
            "unit": "V",
            "tolerance": 3e-05,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 2e-14,
                "b": 2e-12
              },
              "displayScale": 1
            }
          },
          "tex": "\\Delta V=Q_{in}/C",
          "modelAnswer": [
            "Without leak it depolarizes.",
            "$\\Delta V=Q_{in}/C$",
            "$0.01\\,\\mathrm{V}$"
          ]
        },
        {
          "title": "Under ideal voltage clamp",
          "choices": [
            {
              "label": "The clamp supplies opposite current to hold voltage fixed"
            },
            {
              "label": "The same capacitor voltage increment must occur under clamp"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Do not mix current-clamp charge accumulation with voltage-clamp control."
          ]
        }
      ],
      "hints": [
        {
          "body": "Combine current-time charge and capacitor charge; distinguish clamp modes."
        },
        {
          "body": "Start with $Q_{in}=(4\\times10^{-12})(5\\times10^{-3})\\,\\mathrm C$; divide separately by charge per ion and capacitance."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "This is inward positive charge.",
        "A microscopic charge can change voltage without large bulk concentration changes.",
        "Without leak it depolarizes.",
        "Do not mix current-clamp charge accumulation with voltage-clamp control."
      ],
      "points": 1,
      "source": "L09 9:1 p9",
      "mockRole": "preparation"
    },
    {
      "id": "L09-single-synthesis",
      "sectionId": "single",
      "difficulty": "hard",
      "type": "written",
      "prompt": "Identical clamp steps give the same unitary amplitude but a smaller ensemble current after a manipulation. Develop competing mechanisms and an experiment that separates them.",
      "hints": [
        {
          "body": "Separate the measured current from the proposed molecular or disease mechanism."
        },
        {
          "body": "List an alternative explanation and a matched control before drawing the causal conclusion."
        }
      ],
      "markScheme": [
        {
          "text": "At unchanged driving force, unitary amplitude constrains open-pore conductance."
        },
        {
          "text": "Reduced open probability and fewer functional channels both reduce ensemble amplitude."
        },
        {
          "text": "Compare opening-time occupancy and maximal simultaneous channel levels across many trials."
        },
        {
          "text": "Use expression/trafficking controls and stable voltage/solutions; current reduction alone cannot identify channel loss."
        }
      ],
      "modelAnswer": [
        "At unchanged driving force, unitary amplitude constrains open-pore conductance.",
        "Reduced open probability and fewer functional channels both reduce ensemble amplitude.",
        "Compare opening-time occupancy and maximal simultaneous channel levels across many trials.",
        "Use expression/trafficking controls and stable voltage/solutions; current reduction alone cannot identify channel loss."
      ],
      "points": 1,
      "source": "L09 9:1 p10",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:1, PDF page 10. Source repeated sodium recordings and simulated potassium traces with ensemble means; original command steps and scale bars. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "fallbackAlt": "9:1, PDF page 10. Source repeated sodium recordings and simulated potassium traces with ensemble means; original command steps and scale bars. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/ions-10.webp', import.meta.url).href,
          "alt": "9:1, PDF page 10. Source repeated sodium recordings and simulated potassium traces with ensemble means; original command steps and scale bars. Printed labels and axes retained.",
          "aspect": 1.2439405785770132,
          "quiz": false,
          "layout": "stack",
          "regions": [],
          "minWidth": 760
        }
      }
    },
    {
      "id": "L09-a3",
      "sectionId": "single",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "A preparation has $N=60$ identical channels, $\\gamma=20\\,\\mathrm{pS}$, $E=0$ and $V=-50\\,\\mathrm{mV}$. Mean current is $-18\\,\\mathrm{pA}$. After trafficking, the functional count halves without changing gating. Find unitary current, initial occupancy, final mean current and explain why amplitude alone cannot identify trafficking.",
      "stages": [
        {
          "title": "Select the relation",
          "choices": [
            {
              "label": "$I=NP_{open}\\gamma(V-E)$"
            },
            {
              "label": "$I=N\\gamma/(V-E)$"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "Unitary amplitude and occupancy enter separately."
          ]
        },
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Channel count",
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
            },
            {
              "label": "Conductance",
              "answer": {
                "value": 2e-11,
                "unit": "S",
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
              "label": "Mean current",
              "answer": {
                "value": -1.8e-11,
                "unit": "A",
                "tolerance": 1.8e-17,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -1.8e-11,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Unitary amplitude",
          "answer": {
            "value": -1e-12,
            "unit": "A",
            "tolerance": 3e-15,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 2e-11,
                "b": -0.05
              },
              "displayScale": 1
            }
          },
          "tex": "i=\\gamma(V-E)",
          "modelAnswer": [
            "The unitary amplitude does not depend on how many channels are present.",
            "$i=\\gamma(V-E)$",
            "$-1\\times10^{-12}\\,\\mathrm{A}$"
          ]
        },
        {
          "title": "Occupancy",
          "answer": {
            "value": 0.3,
            "unit": "",
            "tolerance": 0.0009,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": -1.8e-11,
                "b": -6e-11
              },
              "displayScale": 1
            }
          },
          "tex": "P=I/(Ni)",
          "modelAnswer": [
            "Use original channel count.",
            "$P=I/(Ni)$",
            "$0.3$"
          ]
        },
        {
          "title": "New channel count",
          "answer": {
            "value": 30,
            "unit": "",
            "tolerance": 0.09,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 60,
                "b": 2
              },
              "displayScale": 1
            }
          },
          "tex": "N_2=N_1/2",
          "modelAnswer": [
            "Trafficking changes functional count.",
            "$N_2=N_1/2$",
            "$30$"
          ]
        },
        {
          "title": "New mean",
          "answer": {
            "value": -9e-12,
            "unit": "A",
            "tolerance": 2.7e-14,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 9.0,
                "b": -1e-12
              },
              "displayScale": 1
            }
          },
          "tex": "I_2=N_2Pi",
          "modelAnswer": [
            "A halved open probability could mimic the same mean decrease.",
            "$I_2=N_2Pi$",
            "$-9\\times10^{-12}\\,\\mathrm{A}$"
          ]
        },
        {
          "title": "Inference",
          "choices": [
            {
              "label": "Use independent occupancy or expression evidence to separate causes"
            },
            {
              "label": "Reduced mean alone uniquely proves a change in channel count"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "An ensemble amplitude is underdetermined."
          ]
        }
      ],
      "hints": [
        {
          "body": "Use signed open-pore current and the population mean."
        },
        {
          "body": "Start with $i=(20\\times10^{-12})(-0.050)\\,\\mathrm A$; then infer occupancy and change only the count."
        }
      ],
      "modelAnswer": [
        "Unitary amplitude and occupancy enter separately.",
        "Convert each stated quantity to the requested unit before evaluating.",
        "The unitary amplitude does not depend on how many channels are present.",
        "Use original channel count.",
        "Trafficking changes functional count.",
        "A halved open probability could mimic the same mean decrease.",
        "An ensemble amplitude is underdetermined."
      ],
      "points": 1,
      "source": "L09 9:1 p10",
      "mockRole": "preparation"
    },
    {
      "id": "L09-a2",
      "sectionId": "single",
      "difficulty": "hard",
      "type": "written",
      "prompt": "Explain how selective rapid conduction and stochastic opening coexist. Sketch repeated single-channel steps and their ensemble mean on paper; label axes and current sign.",
      "hints": [
        {
          "body": "Identify the taught mechanism and the level of measurement."
        },
        {
          "body": "Organize your response by cause, observation, alternative explanation and control."
        }
      ],
      "markScheme": [
        {
          "text": "Pumps supply energy; channels conduct down electrochemical gradients."
        },
        {
          "text": "Channelome includes type, abundance and membrane distribution."
        },
        {
          "text": "Gating changes occupancy; trafficking changes location and functional number."
        },
        {
          "text": "An ensemble mean averages stochastic trials at the same protocol."
        },
        {
          "text": "Carbonyl compensation and hydration cost explain selectivity; fast flow does not imply no discrimination."
        },
        {
          "text": "Sketch step-like random openings with current/time axes and a smoother average; identify source sodium recording versus potassium simulation."
        }
      ],
      "modelAnswer": [
        "Pumps supply energy; channels conduct down electrochemical gradients.",
        "Channelome includes type, abundance and membrane distribution.",
        "Gating changes occupancy; trafficking changes location and functional number.",
        "An ensemble mean averages stochastic trials at the same protocol.",
        "Carbonyl compensation and hydration cost explain selectivity; fast flow does not imply no discrimination.",
        "Sketch step-like random openings with current/time axes and a smoother average; identify source sodium recording versus potassium simulation."
      ],
      "points": 1,
      "source": "L09 9:1 p6–10",
      "mockRole": "preparation"
    },
    {
      "id": "L09-cation-synthesis",
      "sectionId": "cation",
      "difficulty": "hard",
      "type": "written",
      "prompt": "Compare a tetrameric potassium channel and a linked sodium alpha protein. Explain why four domains do not imply four independent whole-channel activation variables and why the peptide model must be qualified.",
      "hints": [
        {
          "body": "Separate the measured current from the proposed molecular or disease mechanism."
        },
        {
          "body": "List an alternative explanation and a matched control before drawing the causal conclusion."
        }
      ],
      "markScheme": [
        {
          "text": "Potassium has four subunits; vertebrate sodium alpha links four domains."
        },
        {
          "text": "Structural modules do not uniquely specify kinetic independence."
        },
        {
          "text": "HH variables are fitted permissive/availability factors, not a literal complete molecular map."
        },
        {
          "text": "Peptide occlusion is a taught model, not universal evidence for every inactivation mechanism."
        }
      ],
      "modelAnswer": [
        "Potassium has four subunits; vertebrate sodium alpha links four domains.",
        "Structural modules do not uniquely specify kinetic independence.",
        "HH variables are fitted permissive/availability factors, not a literal complete molecular map.",
        "Peptide occlusion is a taught model, not universal evidence for every inactivation mechanism."
      ],
      "points": 1,
      "source": "L09 9:1 p16",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:1, PDF page 16. Linked domains, activation curve and the source pore-occlusion model. Printed labels and axes retained.",
        "fallbackAlt": "9:1, PDF page 16. Linked domains, activation curve and the source pore-occlusion model. Printed labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/ions-16.webp', import.meta.url).href,
          "alt": "9:1, PDF page 16. Linked domains, activation curve and the source pore-occlusion model. Printed labels and axes retained.",
          "aspect": 0.9422382671480144,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L09-b3",
      "sectionId": "cation",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "An explicitly ideal model needs four independent permissive factors, each with $y=0.7$. There are $200$ channels, $\\gamma=15\\,\\mathrm{pS}$ and driving force $40\\,\\mathrm{mV}$. Find whole-channel probability, expected open count and outward current. Compare a second condition y=0.8 without changing N or conductance.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Particle probability",
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
              "label": "Count",
              "answer": {
                "value": 200,
                "unit": "",
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
              "label": "Conductance",
              "answer": {
                "value": 1.5e-11,
                "unit": "S",
                "tolerance": 1.5e-17,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1.5e-11,
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
          "title": "Whole-channel probability",
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
          "tex": "P_1=0.7^4",
          "modelAnswer": [
            "The independence rule is explicitly given, not inferred from topology.",
            "$P_1=0.7^4$",
            "$0.2401$"
          ]
        },
        {
          "title": "Expected open count",
          "answer": {
            "value": 48.01999999999999,
            "unit": "",
            "tolerance": 0.14405999999999997,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 200,
                "b": 0.24009999999999995
              },
              "displayScale": 1
            }
          },
          "tex": "\\langle N_{open}\\rangle=NP_1",
          "modelAnswer": [
            "An expectation need not be an integer.",
            "$\\langle N_{open}\\rangle=NP_1$",
            "$48.02$"
          ]
        },
        {
          "title": "Unitary outward current",
          "answer": {
            "value": 6e-13,
            "unit": "A",
            "tolerance": 1.8e-15,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 1.5e-11,
                "b": 0.04
              },
              "displayScale": 1
            }
          },
          "tex": "i=\\gamma(V-E)",
          "modelAnswer": [
            "Positive driving force gives outward current.",
            "$i=\\gamma(V-E)$",
            "$6\\times10^{-13}\\,\\mathrm{A}$"
          ]
        },
        {
          "title": "First mean current",
          "answer": {
            "value": 2.8811999999999993e-11,
            "unit": "A",
            "tolerance": 8.643599999999998e-14,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 48.01999999999999,
                "b": 6e-13
              },
              "displayScale": 1
            }
          },
          "tex": "I_1=NP_1i",
          "modelAnswer": [
            "Keep microscopic and population currents separate.",
            "$I_1=NP_1i$",
            "$2.8812\\times10^{-11}\\,\\mathrm{A}$"
          ]
        },
        {
          "title": "Second probability",
          "answer": {
            "value": 0.4096000000000001,
            "unit": "",
            "tolerance": 0.0012288000000000002,
            "verification": {
              "relation": "gatePower",
              "inputs": {
                "y": 0.8,
                "count": 4
              },
              "displayScale": 1
            }
          },
          "tex": "P_2=0.8^4",
          "modelAnswer": [
            "All four factors must be permissive.",
            "$P_2=0.8^4$",
            "$0.4096$"
          ]
        },
        {
          "title": "Second mean",
          "answer": {
            "value": 4.9152000000000004e-11,
            "unit": "A",
            "tolerance": 1.4745600000000002e-13,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 81.92000000000002,
                "b": 6e-13
              },
              "displayScale": 1
            }
          },
          "tex": "I_2=NP_2i",
          "modelAnswer": [
            "The nonlinear probability change amplifies the single-factor change.",
            "$I_2=NP_2i$",
            "$4.9152\\times10^{-11}\\,\\mathrm{A}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use the explicitly stated independent all-required rule."
        },
        {
          "body": "Start with $P_1=0.7^4$; then multiply count, probability and unitary signed current."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "The independence rule is explicitly given, not inferred from topology.",
        "An expectation need not be an integer.",
        "Positive driving force gives outward current.",
        "Keep microscopic and population currents separate.",
        "All four factors must be permissive.",
        "The nonlinear probability change amplifies the single-factor change."
      ],
      "points": 1,
      "source": "L09 9:1 p16",
      "mockRole": "preparation"
    },
    {
      "id": "L09-sensor-synthesis",
      "sectionId": "sensor",
      "difficulty": "hard",
      "type": "written",
      "prompt": "An S4 mutation changes voltage dependence but a P-loop mutation changes reversal under matched gradients. Explain each causal chain and why a gating-current measurement is not an ionic selectivity measurement.",
      "hints": [
        {
          "body": "Separate the measured current from the proposed molecular or disease mechanism."
        },
        {
          "body": "List an alternative explanation and a matched control before drawing the causal conclusion."
        }
      ],
      "markScheme": [
        {
          "text": "S4 senses voltage and couples charge displacement to opening."
        },
        {
          "text": "P-loop chemistry changes relative ion permeation and reversal."
        },
        {
          "text": "Gating current records sensor charge movement, not ions passing the pore."
        },
        {
          "text": "Separate activation curves, ionic reversals and sensor-charge records with appropriate current isolation."
        }
      ],
      "modelAnswer": [
        "S4 senses voltage and couples charge displacement to opening.",
        "P-loop chemistry changes relative ion permeation and reversal.",
        "Gating current records sensor charge movement, not ions passing the pore.",
        "Separate activation curves, ionic reversals and sensor-charge records with appropriate current isolation."
      ],
      "points": 1,
      "source": "L09 9:1 p17",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:1, PDF page 17. Six-helix potassium subunit, tetrameric pore and closed/open sensor coupling. Printed labels and axes retained.",
        "fallbackAlt": "9:1, PDF page 17. Six-helix potassium subunit, tetrameric pore and closed/open sensor coupling. Printed labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/ions-17.webp', import.meta.url).href,
          "alt": "9:1, PDF page 17. Six-helix potassium subunit, tetrameric pore and closed/open sensor coupling. Printed labels and axes retained.",
          "aspect": 1.5087108013937283,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L09-lidocaine-synthesis",
      "practice": "extra",
      "sectionId": "lidocaine",
      "difficulty": "hard",
      "type": "written",
      "prompt": "Design a qualitative comparison of sodium blockade in rested versus repeatedly depolarized cells. Explain state occupancy, confounds and why the cardiac rationale does not establish universal safety.",
      "hints": [
        {
          "body": "Separate the measured current from the proposed molecular or disease mechanism."
        },
        {
          "body": "List an alternative explanation and a matched control before drawing the causal conclusion."
        }
      ],
      "markScheme": [
        {
          "text": "Use matched concentrations and voltage protocols with rested and repeated-step conditions."
        },
        {
          "text": "Repeated activation populates open/inactivated states preferred by the source model."
        },
        {
          "text": "Compare recovery and normalized current, controlling rundown and driving force."
        },
        {
          "text": "Subtype, tissue state and off-target effects prevent a blanket clinical-safety inference."
        }
      ],
      "modelAnswer": [
        "Use matched concentrations and voltage protocols with rested and repeated-step conditions.",
        "Repeated activation populates open/inactivated states preferred by the source model.",
        "Compare recovery and normalized current, controlling rundown and driving force.",
        "Subtype, tissue state and off-target effects prevent a blanket clinical-safety inference."
      ],
      "points": 1,
      "source": "L09 9:2 p7",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:2, PDF page 7. Source class-I sodium-blocker ventricular waveforms and class comparison. Printed labels and axes retained.",
        "fallbackAlt": "9:2, PDF page 7. Source class-I sodium-blocker ventricular waveforms and class comparison. Printed labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/applications-07.webp', import.meta.url).href,
          "alt": "9:2, PDF page 7. Source class-I sodium-blocker ventricular waveforms and class comparison. Printed labels and axes retained.",
          "aspect": 0.7284345047923323,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L09-b2",
      "sectionId": "persistent",
      "difficulty": "hard",
      "type": "written",
      "prompt": "Explain how a sensor mutation differs from a filter mutation and impaired inactivation. Sketch a six-helix subunit and a qualitative current time course for normal versus persistent sodium current.",
      "hints": [
        {
          "body": "Identify the taught mechanism and the level of measurement."
        },
        {
          "body": "Organize your response by cause, observation, alternative explanation and control."
        }
      ],
      "markScheme": [
        {
          "text": "The P-loop between S5 and S6 forms the filter."
        },
        {
          "text": "S4 positive residues participate in voltage sensing."
        },
        {
          "text": "Potassium is tetrameric; vertebrate sodium alpha links four homologous domains."
        },
        {
          "text": "Gating current reports sensor displacement; ionic current reports pore permeation."
        },
        {
          "text": "A filter mutation can alter selectivity; a sensor mutation can shift activation; failed inactivation can increase residual current."
        },
        {
          "text": "Label extracellular/intracellular sides and voltage/current time axes; do not infer four independent HH factors from four structural domains."
        }
      ],
      "modelAnswer": [
        "The P-loop between S5 and S6 forms the filter.",
        "S4 positive residues participate in voltage sensing.",
        "Potassium is tetrameric; vertebrate sodium alpha links four homologous domains.",
        "Gating current reports sensor displacement; ionic current reports pore permeation.",
        "A filter mutation can alter selectivity; a sensor mutation can shift activation; failed inactivation can increase residual current.",
        "Label extracellular/intracellular sides and voltage/current time axes; do not infer four independent HH factors from four structural domains."
      ],
      "points": 1,
      "source": "L09 9:1 p7,16–17; 9:2 p2,9",
      "mockRole": "preparation"
    },
    {
      "id": "L09-persistent-synthesis",
      "practice": "extra",
      "sectionId": "persistent",
      "difficulty": "hard",
      "type": "written",
      "prompt": "A mutation reduces inactivation in one neuronal population. Build a causal hypothesis for increased seizures, then state why cell identity and population recording are still necessary.",
      "hints": [
        {
          "body": "Separate the measured current from the proposed molecular or disease mechanism."
        },
        {
          "body": "List an alternative explanation and a matched control before drawing the causal conclusion."
        }
      ],
      "markScheme": [
        {
          "text": "Reduced inactivation can increase persistent inward sodium current."
        },
        {
          "text": "This can depolarize and sustain firing under the source conditions."
        },
        {
          "text": "The network effect depends on which neurons are altered, not just current sign."
        },
        {
          "text": "Population timing is needed to demonstrate synchronization; an isolated-cell burst is insufficient."
        }
      ],
      "modelAnswer": [
        "Reduced inactivation can increase persistent inward sodium current.",
        "This can depolarize and sustain firing under the source conditions.",
        "The network effect depends on which neurons are altered, not just current sign.",
        "Population timing is needed to demonstrate synchronization; an isolated-cell burst is insufficient."
      ],
      "points": 1,
      "source": "L09 9:2 p9",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:2, PDF page 9. Normal inactivation versus increased persistent sodium current in the supplied diagram. Printed labels and axes retained.",
        "fallbackAlt": "9:2, PDF page 9. Normal inactivation versus increased persistent sodium current in the supplied diagram. Printed labels and axes retained.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/applications-09.webp', import.meta.url).href,
          "alt": "9:2, PDF page 9. Normal inactivation versus increased persistent sodium current in the supplied diagram. Printed labels and axes retained.",
          "aspect": 1.1636363636363636,
          "quiz": false,
          "layout": "stack",
          "regions": []
        }
      }
    },
    {
      "id": "L09-b4",
      "sectionId": "persistent",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "At fixed $m=0.6$, maximal sodium conductance is $100\\,\\mathrm{nS}$ and driving force $-70\\,\\mathrm{mV}$. Residual availability rises from $h=0.02$ to $0.08$. Find activation power, both conductances, both currents and current ratio. Explain why this is not a complete seizure simulation.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
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
            },
            {
              "label": "Maximum conductance",
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
              "label": "Driving force",
              "answer": {
                "value": -0.07,
                "unit": "V",
                "tolerance": 7e-08,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -0.07,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating."
          ]
        },
        {
          "title": "Activation power",
          "answer": {
            "value": 0.216,
            "unit": "",
            "tolerance": 0.000648,
            "verification": {
              "relation": "gatePower",
              "inputs": {
                "y": 0.6,
                "count": 3
              },
              "displayScale": 1
            }
          },
          "tex": "m^3=0.6^3",
          "modelAnswer": [
            "Cumulative HH factor, not literal domain identity.",
            "$m^3=0.6^3$",
            "$0.216$"
          ]
        },
        {
          "title": "Control conductance",
          "answer": {
            "value": 4.32e-10,
            "unit": "S",
            "tolerance": 1.2960000000000001e-12,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 1e-07,
                "b": 0.00432
              },
              "displayScale": 1
            }
          },
          "tex": "g_1=\\bar g m^3h_1",
          "modelAnswer": [
            "Availability is small but not zero.",
            "$g_1=\\bar g m^3h_1$",
            "$4.32\\times10^{-10}\\,\\mathrm{S}$"
          ]
        },
        {
          "title": "Altered conductance",
          "answer": {
            "value": 1.728e-09,
            "unit": "S",
            "tolerance": 5.1840000000000005e-12,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 1e-07,
                "b": 0.01728
              },
              "displayScale": 1
            }
          },
          "tex": "g_2=\\bar g m^3h_2",
          "modelAnswer": [
            "Fourfold availability at unchanged activation.",
            "$g_2=\\bar g m^3h_2$",
            "$1.728\\times10^{-9}\\,\\mathrm{S}$"
          ]
        },
        {
          "title": "Control current",
          "answer": {
            "value": -3.0240000000000004e-11,
            "unit": "A",
            "tolerance": 9.072000000000002e-14,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 4.32e-10,
                "b": -0.07
              },
              "displayScale": 1
            }
          },
          "tex": "I_1=g_1(V-E)",
          "modelAnswer": [
            "Both currents are inward.",
            "$I_1=g_1(V-E)$",
            "$-3.024\\times10^{-11}\\,\\mathrm{A}$"
          ]
        },
        {
          "title": "Altered current",
          "answer": {
            "value": -1.2096000000000001e-10,
            "unit": "A",
            "tolerance": 3.6288000000000007e-13,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 1.728e-09,
                "b": -0.07
              },
              "displayScale": 1
            }
          },
          "tex": "I_2=g_2(V-E)",
          "modelAnswer": [
            "More persistent inward current can oppose repolarization.",
            "$I_2=g_2(V-E)$",
            "$-1.2096\\times10^{-10}\\,\\mathrm{A}$"
          ]
        },
        {
          "title": "Magnitude ratio",
          "answer": {
            "value": 4,
            "unit": "",
            "tolerance": 0.012,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 1.728e-09,
                "b": 4.32e-10
              },
              "displayScale": 1
            }
          },
          "tex": "|I_2|/|I_1|=4",
          "modelAnswer": [
            "A fixed-voltage calculation is not a network seizure prediction.",
            "$|I_2|/|I_1|=4$",
            "$4$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Use HH conductance and signed driving force at fixed activation."
        },
        {
          "body": "Start with $m^3=0.6^3$; multiply separately by each availability before applying the common driving force."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Cumulative HH factor, not literal domain identity.",
        "Availability is small but not zero.",
        "Fourfold availability at unchanged activation.",
        "Both currents are inward.",
        "More persistent inward current can oppose repolarization.",
        "A fixed-voltage calculation is not a network seizure prediction."
      ],
      "points": 1,
      "source": "L09 9:2 p9",
      "mockRole": "preparation"
    },
    {
      "id": "L09-lqt-synthesis",
      "sectionId": "lqt",
      "difficulty": "hard",
      "type": "written",
      "prompt": "Compare potassium loss and persistent sodium gain as convergent long-QT mechanisms. Sketch cellular voltage and an ECG interval on paper, then explain why neither isolated assay quantifies clinical risk.",
      "hints": [
        {
          "body": "Separate the measured current from the proposed molecular or disease mechanism."
        },
        {
          "body": "List an alternative explanation and a matched control before drawing the causal conclusion."
        }
      ],
      "markScheme": [
        {
          "text": "Reduced outward current and increased persistent inward current both oppose repolarization."
        },
        {
          "text": "Label voltage/time for cellular AP and ECG voltage/time with Q-to-T interval."
        },
        {
          "text": "Connect KCNQ1/KCNH2 loss and SCN5A gain to the correct source examples."
        },
        {
          "text": "Channel expression, exposure, other currents and intact-tissue context limit the inference."
        }
      ],
      "modelAnswer": [
        "Reduced outward current and increased persistent inward current both oppose repolarization.",
        "Label voltage/time for cellular AP and ECG voltage/time with Q-to-T interval.",
        "Connect KCNQ1/KCNH2 loss and SCN5A gain to the correct source examples.",
        "Channel expression, exposure, other currents and intact-tissue context limit the inference."
      ],
      "points": 1,
      "source": "L09 9:2 p12",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:2, PDF page 12. Source ventricular repolarization and ECG QT comparison. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "fallbackAlt": "9:2, PDF page 12. Source ventricular repolarization and ECG QT comparison. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/applications-12.webp', import.meta.url).href,
          "alt": "9:2, PDF page 12. Source ventricular repolarization and ECG QT comparison. Printed labels and axes retained.",
          "aspect": 3.0311418685121105,
          "quiz": false,
          "layout": "stack",
          "regions": [],
          "minWidth": 760
        }
      }
    },
    {
      "id": "L09-c4",
      "sectionId": "lqt",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "At one fixed depolarized instant, potassium current is $+80\\,\\mathrm{pA}$, persistent sodium current is $-30\\,\\mathrm{pA}$, applied current is zero and capacitance is $10\\,\\mathrm{pF}$. Find net ionic current and voltage slope. Then halve outward potassium current and double inward sodium current. Find the new slope and explain the relation to delayed repolarization without calculating a QT interval.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Potassium current",
              "answer": {
                "value": 8e-11,
                "unit": "A",
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
            },
            {
              "label": "Sodium current",
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
          "title": "Initial ionic sum",
          "answer": {
            "value": 5e-11,
            "unit": "A",
            "tolerance": 1.5000000000000002e-13,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": 8e-11,
                "b": -3e-11
              },
              "displayScale": 1
            }
          },
          "tex": "I_{ion}=I_K+I_{NaP}",
          "modelAnswer": [
            "Signed currents oppose each other.",
            "$I_{ion}=I_K+I_{NaP}$",
            "$5\\times10^{-11}\\,\\mathrm{A}$"
          ]
        },
        {
          "title": "Initial slope",
          "answer": {
            "value": -5,
            "unit": "A/F",
            "tolerance": 0.015,
            "verification": {
              "relation": "hhBalance",
              "inputs": {
                "im": 0,
                "ionic": 5e-11,
                "capacitance": 1e-11
              },
              "displayScale": 1
            }
          },
          "tex": "\\dot V=-I_{ion}/C",
          "modelAnswer": [
            "Outward ionic current repolarizes.",
            "$\\dot V=-I_{ion}/C$",
            "$-5\\,\\mathrm{A/F}$"
          ]
        },
        {
          "title": "Changed ionic sum",
          "answer": {
            "value": -2e-11,
            "unit": "A",
            "tolerance": 6e-14,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": 4e-11,
                "b": -6e-11
              },
              "displayScale": 1
            }
          },
          "tex": "I_{ion,2}=40-60\\,\\mathrm{pA}",
          "modelAnswer": [
            "The new balance is inward.",
            "$I_{ion,2}=40-60\\,\\mathrm{pA}$",
            "$-2\\times10^{-11}\\,\\mathrm{A}$"
          ]
        },
        {
          "title": "Changed slope",
          "answer": {
            "value": 2,
            "unit": "A/F",
            "tolerance": 0.006,
            "verification": {
              "relation": "hhBalance",
              "inputs": {
                "im": 0,
                "ionic": -2e-11,
                "capacitance": 1e-11
              },
              "displayScale": 1
            }
          },
          "tex": "\\dot V_2=-I_{ion,2}/C",
          "modelAnswer": [
            "This instantaneous slope is depolarizing; time-varying currents and tissue context are needed for a QT prediction.",
            "$\\dot V_2=-I_{ion,2}/C$",
            "$2\\,\\mathrm{A/F}$"
          ]
        },
        {
          "title": "Meaning",
          "choices": [
            {
              "label": "The altered instantaneous balance opposes repolarization"
            },
            {
              "label": "A single instantaneous slope uniquely determines the ECG QT interval"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "A cellular derivative is not a complete tissue waveform."
          ]
        }
      ],
      "hints": [
        {
          "body": "Combine signed ionic currents before applying capacitive balance."
        },
        {
          "body": "Start with $I_{ion}=80-30$ in picoamperes; then use $\\dot V=-I_{ion}/C$ separately for each condition."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "Signed currents oppose each other.",
        "Outward ionic current repolarizes.",
        "The new balance is inward.",
        "This instantaneous slope is depolarizing; time-varying currents and tissue context are needed for a QT prediction.",
        "A cellular derivative is not a complete tissue waveform."
      ],
      "points": 1,
      "source": "L09 9:2 p12",
      "mockRole": "preparation"
    },
    {
      "id": "L09-screen-synthesis",
      "sectionId": "screen",
      "difficulty": "hard",
      "type": "written",
      "prompt": "A compound reduces a hERG tail but also shifts the holding current and the control tail declines with time. Design a basic within-source assay audit and state what remains unproved.",
      "hints": [
        {
          "body": "Separate the measured current from the proposed molecular or disease mechanism."
        },
        {
          "body": "List an alternative explanation and a matched control before drawing the causal conclusion."
        }
      ],
      "markScheme": [
        {
          "text": "Use time-matched vehicle and drug controls to estimate rundown."
        },
        {
          "text": "Check leak/capacitive artifacts and voltage protocol consistency."
        },
        {
          "text": "Compare normalized tail current across exposure and recovery under identical ionic conditions."
        },
        {
          "text": "Reduced measured tail is not uniquely pore block and does not alone quantify clinical arrhythmia risk."
        }
      ],
      "modelAnswer": [
        "Use time-matched vehicle and drug controls to estimate rundown.",
        "Check leak/capacitive artifacts and voltage protocol consistency.",
        "Compare normalized tail current across exposure and recovery under identical ionic conditions.",
        "Reduced measured tail is not uniquely pore block and does not alone quantify clinical arrhythmia risk."
      ],
      "points": 1,
      "source": "L09 9:2 p13",
      "figure": {
        "type": "widget",
        "name": "image-hotspots",
        "caption": "9:2, PDF page 13. Source CHO-cell hERG tails and normalized terfenadine/quinidine inhibition curves. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "fallbackAlt": "9:2, PDF page 13. Source CHO-cell hERG tails and normalized terfenadine/quinidine inhibition curves. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
        "props": {
          "src": new URL('../../assets/figures/nbe-e4120/L09/applications-13.webp', import.meta.url).href,
          "alt": "9:2, PDF page 13. Source CHO-cell hERG tails and normalized terfenadine/quinidine inhibition curves. Printed labels and axes retained.",
          "aspect": 4.225,
          "quiz": false,
          "layout": "stack",
          "regions": [],
          "minWidth": 1000
        }
      }
    },
    {
      "id": "L09-c3",
      "sectionId": "screen",
      "difficulty": "hard",
      "type": "multiStepCalc",
      "prompt": "A hERG tail is $900\\,\\mathrm{pA}$ initially. A matched time-control gives $750\\,\\mathrm{pA}$ and drug gives $300\\,\\mathrm{pA}$. Find time-control fraction, drug/control remaining fraction and inhibition fraction. If tail conductance is Ohmic during the comparison and driving force is $50\\,\\mathrm{mV}$, find both matched conductances.",
      "stages": [
        {
          "title": "Enter substitution quantities",
          "fields": [
            {
              "label": "Initial current",
              "answer": {
                "value": 9e-10,
                "unit": "A",
                "tolerance": 9e-16,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 9e-10,
                    "b": 1
                  },
                  "displayScale": 1
                }
              }
            },
            {
              "label": "Time control",
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
            },
            {
              "label": "Drug current",
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
            },
            {
              "label": "Driving force",
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
          "title": "Time-control fraction",
          "answer": {
            "value": 0.8333333333333334,
            "unit": "",
            "tolerance": 0.0025,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 7.5e-10,
                "b": 9e-10
              },
              "displayScale": 1
            }
          },
          "tex": "f_{time}=750/900",
          "modelAnswer": [
            "This estimates rundown in the matched control.",
            "$f_{time}=750/900$",
            "$0.83333333$"
          ]
        },
        {
          "title": "Remaining under drug",
          "answer": {
            "value": 0.4,
            "unit": "",
            "tolerance": 0.0012000000000000001,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 3e-10,
                "b": 7.5e-10
              },
              "displayScale": 1
            }
          },
          "tex": "f=300/750",
          "modelAnswer": [
            "Use the matched baseline.",
            "$f=300/750$",
            "$0.4$"
          ]
        },
        {
          "title": "Inhibition fraction",
          "answer": {
            "value": 0.6,
            "unit": "",
            "tolerance": 0.0018,
            "verification": {
              "relation": "sum",
              "inputs": {
                "a": 1,
                "b": -0.4
              },
              "displayScale": 1
            }
          },
          "tex": "b=1-f",
          "modelAnswer": [
            "This is empirical inhibition under this protocol, not a binding affinity.",
            "$b=1-f$",
            "$0.6$"
          ]
        },
        {
          "title": "Control conductance",
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
          "tex": "G_c=I_c/(V-E)",
          "modelAnswer": [
            "Assumes common driving force and equivalent gate-state interpretation.",
            "$G_c=I_c/(V-E)$",
            "$1.5\\times10^{-8}\\,\\mathrm{S}$"
          ]
        },
        {
          "title": "Drug conductance",
          "answer": {
            "value": 6e-09,
            "unit": "S",
            "tolerance": 1.8e-11,
            "verification": {
              "relation": "ratio",
              "inputs": {
                "a": 3e-10,
                "b": 0.05
              },
              "displayScale": 1
            }
          },
          "tex": "G_d=I_d/(V-E)",
          "modelAnswer": [
            "The conductance decrease alone does not quantify clinical arrhythmia risk.",
            "$G_d=I_d/(V-E)$",
            "$6\\times10^{-9}\\,\\mathrm{S}$"
          ]
        }
      ],
      "hints": [
        {
          "body": "Normalize to the time-matched control and use signed Ohm current."
        },
        {
          "body": "Start with the two control currents converted to amperes; form the remaining fraction before taking its complement."
        }
      ],
      "modelAnswer": [
        "Convert each stated quantity to the requested unit before evaluating.",
        "This estimates rundown in the matched control.",
        "Use the matched baseline.",
        "This is empirical inhibition under this protocol, not a binding affinity.",
        "Assumes common driving force and equivalent gate-state interpretation.",
        "The conductance decrease alone does not quantify clinical arrhythmia risk."
      ],
      "points": 1,
      "source": "L09 9:2 p13",
      "mockRole": "preparation"
    },
    {
      "id": "L09-c2",
      "sectionId": "screen",
      "difficulty": "hard",
      "type": "written",
      "prompt": "Explain how loss of repolarizing potassium current and gain of persistent sodium current converge on delayed repolarization. Sketch a qualitative cellular AP and ECG QT interval and give the limits of a channel assay.",
      "hints": [
        {
          "body": "Identify the taught mechanism and the level of measurement."
        },
        {
          "body": "Organize your response by cause, observation, alternative explanation and control."
        }
      ],
      "markScheme": [
        {
          "text": "Channelopathy is dysfunction, inherited or acquired; a neutral variant need not cause disease."
        },
        {
          "text": "LQT1 is KCNQ1 loss; LQT3 is SCN5A persistent-current gain."
        },
        {
          "text": "Atrial KV1.5 targeting is a rationale, not proof of zero ventricular risk."
        },
        {
          "text": "A tail follows a voltage transition, with rapid recovery from inactivation followed by deactivation."
        },
        {
          "text": "Both reduced outward and increased inward current oppose repolarization; label voltage/time and Q-to-T endpoints."
        },
        {
          "text": "hERG inhibition is a hazard signal; protocol, exposure, other currents and tissue context limit clinical inference."
        }
      ],
      "modelAnswer": [
        "Channelopathy is dysfunction, inherited or acquired; a neutral variant need not cause disease.",
        "LQT1 is KCNQ1 loss; LQT3 is SCN5A persistent-current gain.",
        "Atrial KV1.5 targeting is a rationale, not proof of zero ventricular risk.",
        "A tail follows a voltage transition, with rapid recovery from inactivation followed by deactivation.",
        "Both reduced outward and increased inward current oppose repolarization; label voltage/time and Q-to-T endpoints.",
        "hERG inhibition is a hazard signal; protocol, exposure, other currents and tissue context limit clinical inference."
      ],
      "points": 1,
      "source": "L09 9:2 p11–13",
      "mockRole": "preparation"
    }
,
    {
      "id": "L09-binomial-patch",
      "sectionId": "single",
      "type": "multiStepCalc",
      "difficulty": "hard",
      "prompt": "A patch has $n=5$ identical $\\mathrm{Na}^+$ channels. After a depolarizing step the HH gating factor gives $P_{open}=0.30$ per channel. Find (a) the mean number of open channels and (b) using the binomial formula, $P(k=1)$, the probability that exactly one channel is open.",
      "hints": [
        {
          "body": "Mean $=n\\times P_{open}$; then $P_n(k)=\\binom{n}{k}p^k(1-p)^{n-k}$."
        },
        {
          "body": "Mean $=5\\times0.30=1.5$; $\\binom{5}{1}=5$; $P(k=1)=5(0.30)(0.70)^4=5(0.30)(0.2401)$."
        }
      ],
      "stages": [
        {
          "title": "Mean open channels",
          "answer": {
            "value": 1.5,
            "unit": "",
            "tolerance": 0.0075,
            "verification": {
              "relation": "product",
              "inputs": {
                "a": 5,
                "b": 0.3
              },
              "displayScale": 1
            }
          },
          "tex": "\\langle k\\rangle=n P_{open}=5\\times0.30=1.5",
          "modelAnswer": [
            "$\\langle k\\rangle=5\\times0.30=1.5$"
          ]
        },
        {
          "title": "Binomial probability P(k=1)",
          "answer": {
            "value": 0.3601499999999999,
            "unit": "",
            "tolerance": 0.0018007499999999996,
            "verification": {
              "relation": "binomialProb",
              "inputs": {
                "n": 5,
                "k": 1,
                "p": 0.3
              },
              "displayScale": 1
            }
          },
          "tex": "P_n(1;5,0.30)=\\binom{5}{1}(0.30)^1(0.70)^4=5(0.30)(0.2401)=0.36015",
          "modelAnswer": [
            "$\\binom{5}{1}=5$; $(0.70)^4=0.2401$; $5\\times0.30\\times0.2401=0.36015$."
          ]
        },
        {
          "title": "Check physical meaning",
          "choices": [
            {
              "label": "k=1 is below the mean of 1.5"
            },
            {
              "label": "k=1 is impossible given $P_{open}$"
            }
          ],
          "correct": 0,
          "modelAnswer": [
            "The mean is 1.5, so k=1 is below the mean; the binomial is spread around 1.5."
          ]
        }
      ],
      "modelAnswer": [
        "Mean = $5\\times0.30=1.5$ channels.",
        "P(k=1) = $\\binom{5}{1}(0.30)^1(0.70)^4=5\\times0.30\\times0.2401=0.36015$."
      ],
      "source": "single",
      "points": 1
    }
  ],
  "mockExams": [
    {
      "id": "L09-mock-a",
      "title": "Mock A: Single-channel inference and charge economy",
      "coverage": "Lectures 1–9 only. Lecture 9 applications have provisional exam scope. Practice criteria are not official marking weights.",
      "questions": [
        {
          "id": "L09-a1",
          "sectionId": "single",
          "difficulty": "easy",
          "type": "written",
          "prompt": "a) Distinguish pump and channel energy. b) Define channelome. c) Distinguish gating from trafficking. d) Define an ensemble mean.",
          "hints": [
            {
              "body": "Identify the taught mechanism and the level of measurement."
            },
            {
              "body": "Organize your response by cause, observation, alternative explanation and control."
            }
          ],
          "markScheme": [
            {
              "text": "Pumps supply energy; channels conduct down electrochemical gradients."
            },
            {
              "text": "Channelome includes type, abundance and membrane distribution."
            },
            {
              "text": "Gating changes occupancy; trafficking changes location and functional number."
            },
            {
              "text": "An ensemble mean averages stochastic trials at the same protocol."
            }
          ],
          "modelAnswer": [
            "Pumps supply energy; channels conduct down electrochemical gradients.",
            "Channelome includes type, abundance and membrane distribution.",
            "Gating changes occupancy; trafficking changes location and functional number.",
            "An ensemble mean averages stochastic trials at the same protocol."
          ],
          "points": 1,
          "source": "L09 9:1 p2–4,10",
          "mockRole": "preparation"
        },
        {
          "id": "L09-a2",
          "sectionId": "single",
          "difficulty": "hard",
          "type": "written",
          "prompt": "Explain how selective rapid conduction and stochastic opening coexist. Sketch repeated single-channel steps and their ensemble mean on paper; label axes and current sign.",
          "hints": [
            {
              "body": "Identify the taught mechanism and the level of measurement."
            },
            {
              "body": "Organize your response by cause, observation, alternative explanation and control."
            }
          ],
          "markScheme": [
            {
              "text": "Pumps supply energy; channels conduct down electrochemical gradients."
            },
            {
              "text": "Channelome includes type, abundance and membrane distribution."
            },
            {
              "text": "Gating changes occupancy; trafficking changes location and functional number."
            },
            {
              "text": "An ensemble mean averages stochastic trials at the same protocol."
            },
            {
              "text": "Carbonyl compensation and hydration cost explain selectivity; fast flow does not imply no discrimination."
            },
            {
              "text": "Sketch step-like random openings with current/time axes and a smoother average; identify source sodium recording versus potassium simulation."
            }
          ],
          "modelAnswer": [
            "Pumps supply energy; channels conduct down electrochemical gradients.",
            "Channelome includes type, abundance and membrane distribution.",
            "Gating changes occupancy; trafficking changes location and functional number.",
            "An ensemble mean averages stochastic trials at the same protocol.",
            "Carbonyl compensation and hydration cost explain selectivity; fast flow does not imply no discrimination.",
            "Sketch step-like random openings with current/time axes and a smoother average; identify source sodium recording versus potassium simulation."
          ],
          "points": 1,
          "source": "L09 9:1 p6–10",
          "mockRole": "preparation"
        },
        {
          "id": "L09-a3",
          "sectionId": "single",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "A preparation has $N=60$ identical channels, $\\gamma=20\\,\\mathrm{pS}$, $E=0$ and $V=-50\\,\\mathrm{mV}$. Mean current is $-18\\,\\mathrm{pA}$. After trafficking, the functional count halves without changing gating. Find unitary current, initial occupancy, final mean current and explain why amplitude alone cannot identify trafficking.",
          "stages": [
            {
              "title": "Select the relation",
              "choices": [
                {
                  "label": "$I=NP_{open}\\gamma(V-E)$"
                },
                {
                  "label": "$I=N\\gamma/(V-E)$"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "Unitary amplitude and occupancy enter separately."
              ]
            },
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "Channel count",
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
                },
                {
                  "label": "Conductance",
                  "answer": {
                    "value": 2e-11,
                    "unit": "S",
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
                  "label": "Mean current",
                  "answer": {
                    "value": -1.8e-11,
                    "unit": "A",
                    "tolerance": 1.8e-17,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": -1.8e-11,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                }
              ],
              "modelAnswer": [
                "Convert each stated quantity to the requested unit before evaluating."
              ]
            },
            {
              "title": "Unitary amplitude",
              "answer": {
                "value": -1e-12,
                "unit": "A",
                "tolerance": 3e-15,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 2e-11,
                    "b": -0.05
                  },
                  "displayScale": 1
                }
              },
              "tex": "i=\\gamma(V-E)",
              "modelAnswer": [
                "The unitary amplitude does not depend on how many channels are present.",
                "$i=\\gamma(V-E)$",
                "$-1\\times10^{-12}\\,\\mathrm{A}$"
              ]
            },
            {
              "title": "Occupancy",
              "answer": {
                "value": 0.3,
                "unit": "",
                "tolerance": 0.0009,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": -1.8e-11,
                    "b": -6e-11
                  },
                  "displayScale": 1
                }
              },
              "tex": "P=I/(Ni)",
              "modelAnswer": [
                "Use original channel count.",
                "$P=I/(Ni)$",
                "$0.3$"
              ]
            },
            {
              "title": "New channel count",
              "answer": {
                "value": 30,
                "unit": "",
                "tolerance": 0.09,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 60,
                    "b": 2
                  },
                  "displayScale": 1
                }
              },
              "tex": "N_2=N_1/2",
              "modelAnswer": [
                "Trafficking changes functional count.",
                "$N_2=N_1/2$",
                "$30$"
              ]
            },
            {
              "title": "New mean",
              "answer": {
                "value": -9e-12,
                "unit": "A",
                "tolerance": 2.7e-14,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 9.0,
                    "b": -1e-12
                  },
                  "displayScale": 1
                }
              },
              "tex": "I_2=N_2Pi",
              "modelAnswer": [
                "A halved open probability could mimic the same mean decrease.",
                "$I_2=N_2Pi$",
                "$-9\\times10^{-12}\\,\\mathrm{A}$"
              ]
            },
            {
              "title": "Inference",
              "choices": [
                {
                  "label": "Use independent occupancy or expression evidence to separate causes"
                },
                {
                  "label": "Reduced mean alone uniquely proves a change in channel count"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "An ensemble amplitude is underdetermined."
              ]
            }
          ],
          "hints": [
            {
              "body": "Use signed open-pore current and the population mean."
            },
            {
              "body": "Start with $i=(20\\times10^{-12})(-0.050)\\,\\mathrm A$; then infer occupancy and change only the count."
            }
          ],
          "modelAnswer": [
            "Unitary amplitude and occupancy enter separately.",
            "Convert each stated quantity to the requested unit before evaluating.",
            "The unitary amplitude does not depend on how many channels are present.",
            "Use original channel count.",
            "Trafficking changes functional count.",
            "A halved open probability could mimic the same mean decrease.",
            "An ensemble amplitude is underdetermined."
          ],
          "points": 1,
          "source": "L09 9:1 p10",
          "mockRole": "preparation"
        },
        {
          "id": "L09-a4",
          "sectionId": "gating",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "A brief ideal opening passes constant inward $4\\,\\mathrm{pA}$ for $5\\,\\mathrm{ms}$ into a $2\\,\\mathrm{pF}$ patch. Use $e=1.6\\times10^{-19}\\,\\mathrm C$. Find inward charge, monovalent ion count and voltage increment without leak. Then explain why voltage clamp instead supplies balancing current.",
          "stages": [
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "Current magnitude",
                  "answer": {
                    "value": 4e-12,
                    "unit": "A",
                    "tolerance": 3.9999999999999995e-18,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 4e-12,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Duration",
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
                },
                {
                  "label": "Capacitance",
                  "answer": {
                    "value": 2e-12,
                    "unit": "F",
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
                }
              ],
              "modelAnswer": [
                "Convert each stated quantity to the requested unit before evaluating."
              ]
            },
            {
              "title": "Charge",
              "answer": {
                "value": 2e-14,
                "unit": "C",
                "tolerance": 6e-17,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 4e-12,
                    "b": 0.005
                  },
                  "displayScale": 1
                }
              },
              "tex": "Q_{in}=|i|t",
              "modelAnswer": [
                "This is inward positive charge.",
                "$Q_{in}=|i|t$",
                "$2\\times10^{-14}\\,\\mathrm{C}$"
              ]
            },
            {
              "title": "Ion count",
              "answer": {
                "value": 125000,
                "unit": "",
                "tolerance": 375.0,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 2e-14,
                    "b": 1.6e-19
                  },
                  "displayScale": 1
                }
              },
              "tex": "n=Q_{in}/e",
              "modelAnswer": [
                "A microscopic charge can change voltage without large bulk concentration changes.",
                "$n=Q_{in}/e$",
                "$125000$"
              ]
            },
            {
              "title": "Unclamped increment",
              "answer": {
                "value": 0.01,
                "unit": "V",
                "tolerance": 3e-05,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 2e-14,
                    "b": 2e-12
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\Delta V=Q_{in}/C",
              "modelAnswer": [
                "Without leak it depolarizes.",
                "$\\Delta V=Q_{in}/C$",
                "$0.01\\,\\mathrm{V}$"
              ]
            },
            {
              "title": "Under ideal voltage clamp",
              "choices": [
                {
                  "label": "The clamp supplies opposite current to hold voltage fixed"
                },
                {
                  "label": "The same capacitor voltage increment must occur under clamp"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "Do not mix current-clamp charge accumulation with voltage-clamp control."
              ]
            }
          ],
          "hints": [
            {
              "body": "Combine current-time charge and capacitor charge; distinguish clamp modes."
            },
            {
              "body": "Start with $Q_{in}=(4\\times10^{-12})(5\\times10^{-3})\\,\\mathrm C$; divide separately by charge per ion and capacitance."
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating.",
            "This is inward positive charge.",
            "A microscopic charge can change voltage without large bulk concentration changes.",
            "Without leak it depolarizes.",
            "Do not mix current-clamp charge accumulation with voltage-clamp control."
          ],
          "points": 1,
          "source": "L09 9:1 p9",
          "mockRole": "preparation"
        },
        {
          "id": "L09-a5",
          "sectionId": "single",
          "difficulty": "medium",
          "type": "written",
          "prompt": "Interpret the supplied source single-channel and ensemble panel. Identify the controlled and measured variables, current directions, stochastic evidence and why lower mean does not uniquely prove fewer channels.",
          "hints": [
            {
              "body": "Identify the taught mechanism and the level of measurement."
            },
            {
              "body": "Organize your response by cause, observation, alternative explanation and control."
            }
          ],
          "markScheme": [
            {
              "text": "Voltage is commanded and current is recorded."
            },
            {
              "text": "Individual dwell times vary while the mean has reproducible kinetics."
            },
            {
              "text": "Sodium source openings are inward and potassium source openings outward in their respective protocols."
            },
            {
              "text": "Compare unitary amplitude, occupancy and independent count controls."
            },
            {
              "text": "The source potassium caption marks simulated data; do not claim it is a new experimental record."
            }
          ],
          "modelAnswer": [
            "Voltage is commanded and current is recorded.",
            "Individual dwell times vary while the mean has reproducible kinetics.",
            "Sodium source openings are inward and potassium source openings outward in their respective protocols.",
            "Compare unitary amplitude, occupancy and independent count controls.",
            "The source potassium caption marks simulated data; do not claim it is a new experimental record."
          ],
          "points": 1,
          "source": "L09 9:1 p10",
          "figure": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "9:1, PDF page 10. Source repeated sodium recordings and simulated potassium traces with ensemble means; original command steps and scale bars. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
            "fallbackAlt": "9:1, PDF page 10. Source repeated sodium recordings and simulated potassium traces with ensemble means; original command steps and scale bars. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L09/ions-10.webp', import.meta.url).href,
              "alt": "9:1, PDF page 10. Source repeated sodium recordings and simulated potassium traces with ensemble means; original command steps and scale bars. Printed labels and axes retained.",
              "aspect": 1.2439405785770132,
              "quiz": false,
              "layout": "stack",
              "regions": [],
              "minWidth": 760
            }
          },
          "mockRole": "preparation"
        }
      ]
    },
    {
      "id": "L09-mock-b",
      "title": "Mock B: Sensor architecture and persistent current",
      "coverage": "Lectures 1–9 only. Lecture 9 applications have provisional exam scope. Practice criteria are not official marking weights.",
      "questions": [
        {
          "id": "L09-b1",
          "sectionId": "sensor",
          "difficulty": "easy",
          "type": "written",
          "prompt": "a) Locate the P-loop. b) Locate S4. c) Contrast potassium subunits with sodium domains. d) Distinguish gating and ionic current.",
          "hints": [
            {
              "body": "Identify the taught mechanism and the level of measurement."
            },
            {
              "body": "Organize your response by cause, observation, alternative explanation and control."
            }
          ],
          "markScheme": [
            {
              "text": "The P-loop between S5 and S6 forms the filter."
            },
            {
              "text": "S4 positive residues participate in voltage sensing."
            },
            {
              "text": "Potassium is tetrameric; vertebrate sodium alpha links four homologous domains."
            },
            {
              "text": "Gating current reports sensor displacement; ionic current reports pore permeation."
            }
          ],
          "modelAnswer": [
            "The P-loop between S5 and S6 forms the filter.",
            "S4 positive residues participate in voltage sensing.",
            "Potassium is tetrameric; vertebrate sodium alpha links four homologous domains.",
            "Gating current reports sensor displacement; ionic current reports pore permeation."
          ],
          "points": 1,
          "source": "L09 9:1 p16–17; L08 8:1 p15–18",
          "mockRole": "preparation"
        },
        {
          "id": "L09-b2",
          "sectionId": "sensor",
          "difficulty": "hard",
          "type": "written",
          "prompt": "Explain how a sensor mutation differs from a filter mutation and impaired inactivation. Sketch a six-helix subunit and a qualitative current time course for normal versus persistent sodium current.",
          "hints": [
            {
              "body": "Identify the taught mechanism and the level of measurement."
            },
            {
              "body": "Organize your response by cause, observation, alternative explanation and control."
            }
          ],
          "markScheme": [
            {
              "text": "The P-loop between S5 and S6 forms the filter."
            },
            {
              "text": "S4 positive residues participate in voltage sensing."
            },
            {
              "text": "Potassium is tetrameric; vertebrate sodium alpha links four homologous domains."
            },
            {
              "text": "Gating current reports sensor displacement; ionic current reports pore permeation."
            },
            {
              "text": "A filter mutation can alter selectivity; a sensor mutation can shift activation; failed inactivation can increase residual current."
            },
            {
              "text": "Label extracellular/intracellular sides and voltage/current time axes; do not infer four independent HH factors from four structural domains."
            }
          ],
          "modelAnswer": [
            "The P-loop between S5 and S6 forms the filter.",
            "S4 positive residues participate in voltage sensing.",
            "Potassium is tetrameric; vertebrate sodium alpha links four homologous domains.",
            "Gating current reports sensor displacement; ionic current reports pore permeation.",
            "A filter mutation can alter selectivity; a sensor mutation can shift activation; failed inactivation can increase residual current.",
            "Label extracellular/intracellular sides and voltage/current time axes; do not infer four independent HH factors from four structural domains."
          ],
          "points": 1,
          "source": "L09 9:1 p7,16–17; 9:2 p2,9",
          "mockRole": "preparation"
        },
        {
          "id": "L09-b3",
          "sectionId": "cation",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "An explicitly ideal model needs four independent permissive factors, each with $y=0.7$. There are $200$ channels, $\\gamma=15\\,\\mathrm{pS}$ and driving force $40\\,\\mathrm{mV}$. Find whole-channel probability, expected open count and outward current. Compare a second condition y=0.8 without changing N or conductance.",
          "stages": [
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "Particle probability",
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
                  "label": "Count",
                  "answer": {
                    "value": 200,
                    "unit": "",
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
                  "label": "Conductance",
                  "answer": {
                    "value": 1.5e-11,
                    "unit": "S",
                    "tolerance": 1.5e-17,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 1.5e-11,
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
              "title": "Whole-channel probability",
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
              "tex": "P_1=0.7^4",
              "modelAnswer": [
                "The independence rule is explicitly given, not inferred from topology.",
                "$P_1=0.7^4$",
                "$0.2401$"
              ]
            },
            {
              "title": "Expected open count",
              "answer": {
                "value": 48.01999999999999,
                "unit": "",
                "tolerance": 0.14405999999999997,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 200,
                    "b": 0.24009999999999995
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\langle N_{open}\\rangle=NP_1",
              "modelAnswer": [
                "An expectation need not be an integer.",
                "$\\langle N_{open}\\rangle=NP_1$",
                "$48.02$"
              ]
            },
            {
              "title": "Unitary outward current",
              "answer": {
                "value": 6e-13,
                "unit": "A",
                "tolerance": 1.8e-15,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 1.5e-11,
                    "b": 0.04
                  },
                  "displayScale": 1
                }
              },
              "tex": "i=\\gamma(V-E)",
              "modelAnswer": [
                "Positive driving force gives outward current.",
                "$i=\\gamma(V-E)$",
                "$6\\times10^{-13}\\,\\mathrm{A}$"
              ]
            },
            {
              "title": "First mean current",
              "answer": {
                "value": 2.8811999999999993e-11,
                "unit": "A",
                "tolerance": 8.643599999999998e-14,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 48.01999999999999,
                    "b": 6e-13
                  },
                  "displayScale": 1
                }
              },
              "tex": "I_1=NP_1i",
              "modelAnswer": [
                "Keep microscopic and population currents separate.",
                "$I_1=NP_1i$",
                "$2.8812\\times10^{-11}\\,\\mathrm{A}$"
              ]
            },
            {
              "title": "Second probability",
              "answer": {
                "value": 0.4096000000000001,
                "unit": "",
                "tolerance": 0.0012288000000000002,
                "verification": {
                  "relation": "gatePower",
                  "inputs": {
                    "y": 0.8,
                    "count": 4
                  },
                  "displayScale": 1
                }
              },
              "tex": "P_2=0.8^4",
              "modelAnswer": [
                "All four factors must be permissive.",
                "$P_2=0.8^4$",
                "$0.4096$"
              ]
            },
            {
              "title": "Second mean",
              "answer": {
                "value": 4.9152000000000004e-11,
                "unit": "A",
                "tolerance": 1.4745600000000002e-13,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 81.92000000000002,
                    "b": 6e-13
                  },
                  "displayScale": 1
                }
              },
              "tex": "I_2=NP_2i",
              "modelAnswer": [
                "The nonlinear probability change amplifies the single-factor change.",
                "$I_2=NP_2i$",
                "$4.9152\\times10^{-11}\\,\\mathrm{A}$"
              ]
            }
          ],
          "hints": [
            {
              "body": "Use the explicitly stated independent all-required rule."
            },
            {
              "body": "Start with $P_1=0.7^4$; then multiply count, probability and unitary signed current."
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating.",
            "The independence rule is explicitly given, not inferred from topology.",
            "An expectation need not be an integer.",
            "Positive driving force gives outward current.",
            "Keep microscopic and population currents separate.",
            "All four factors must be permissive.",
            "The nonlinear probability change amplifies the single-factor change."
          ],
          "points": 1,
          "source": "L09 9:1 p16",
          "mockRole": "preparation"
        },
        {
          "id": "L09-b4",
          "sectionId": "persistent",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "At fixed $m=0.6$, maximal sodium conductance is $100\\,\\mathrm{nS}$ and driving force $-70\\,\\mathrm{mV}$. Residual availability rises from $h=0.02$ to $0.08$. Find activation power, both conductances, both currents and current ratio. Explain why this is not a complete seizure simulation.",
          "stages": [
            {
              "title": "Enter substitution quantities",
              "fields": [
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
                },
                {
                  "label": "Maximum conductance",
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
                  "label": "Driving force",
                  "answer": {
                    "value": -0.07,
                    "unit": "V",
                    "tolerance": 7e-08,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": -0.07,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                }
              ],
              "modelAnswer": [
                "Convert each stated quantity to the requested unit before evaluating."
              ]
            },
            {
              "title": "Activation power",
              "answer": {
                "value": 0.216,
                "unit": "",
                "tolerance": 0.000648,
                "verification": {
                  "relation": "gatePower",
                  "inputs": {
                    "y": 0.6,
                    "count": 3
                  },
                  "displayScale": 1
                }
              },
              "tex": "m^3=0.6^3",
              "modelAnswer": [
                "Cumulative HH factor, not literal domain identity.",
                "$m^3=0.6^3$",
                "$0.216$"
              ]
            },
            {
              "title": "Control conductance",
              "answer": {
                "value": 4.32e-10,
                "unit": "S",
                "tolerance": 1.2960000000000001e-12,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 1e-07,
                    "b": 0.00432
                  },
                  "displayScale": 1
                }
              },
              "tex": "g_1=\\bar g m^3h_1",
              "modelAnswer": [
                "Availability is small but not zero.",
                "$g_1=\\bar g m^3h_1$",
                "$4.32\\times10^{-10}\\,\\mathrm{S}$"
              ]
            },
            {
              "title": "Altered conductance",
              "answer": {
                "value": 1.728e-09,
                "unit": "S",
                "tolerance": 5.1840000000000005e-12,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 1e-07,
                    "b": 0.01728
                  },
                  "displayScale": 1
                }
              },
              "tex": "g_2=\\bar g m^3h_2",
              "modelAnswer": [
                "Fourfold availability at unchanged activation.",
                "$g_2=\\bar g m^3h_2$",
                "$1.728\\times10^{-9}\\,\\mathrm{S}$"
              ]
            },
            {
              "title": "Control current",
              "answer": {
                "value": -3.0240000000000004e-11,
                "unit": "A",
                "tolerance": 9.072000000000002e-14,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 4.32e-10,
                    "b": -0.07
                  },
                  "displayScale": 1
                }
              },
              "tex": "I_1=g_1(V-E)",
              "modelAnswer": [
                "Both currents are inward.",
                "$I_1=g_1(V-E)$",
                "$-3.024\\times10^{-11}\\,\\mathrm{A}$"
              ]
            },
            {
              "title": "Altered current",
              "answer": {
                "value": -1.2096000000000001e-10,
                "unit": "A",
                "tolerance": 3.6288000000000007e-13,
                "verification": {
                  "relation": "product",
                  "inputs": {
                    "a": 1.728e-09,
                    "b": -0.07
                  },
                  "displayScale": 1
                }
              },
              "tex": "I_2=g_2(V-E)",
              "modelAnswer": [
                "More persistent inward current can oppose repolarization.",
                "$I_2=g_2(V-E)$",
                "$-1.2096\\times10^{-10}\\,\\mathrm{A}$"
              ]
            },
            {
              "title": "Magnitude ratio",
              "answer": {
                "value": 4,
                "unit": "",
                "tolerance": 0.012,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 1.728e-09,
                    "b": 4.32e-10
                  },
                  "displayScale": 1
                }
              },
              "tex": "|I_2|/|I_1|=4",
              "modelAnswer": [
                "A fixed-voltage calculation is not a network seizure prediction.",
                "$|I_2|/|I_1|=4$",
                "$4$"
              ]
            }
          ],
          "hints": [
            {
              "body": "Use HH conductance and signed driving force at fixed activation."
            },
            {
              "body": "Start with $m^3=0.6^3$; multiply separately by each availability before applying the common driving force."
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating.",
            "Cumulative HH factor, not literal domain identity.",
            "Availability is small but not zero.",
            "Fourfold availability at unchanged activation.",
            "Both currents are inward.",
            "More persistent inward current can oppose repolarization.",
            "A fixed-voltage calculation is not a network seizure prediction."
          ],
          "points": 1,
          "source": "L09 9:2 p9",
          "mockRole": "preparation"
        },
        {
          "id": "L09-b5",
          "sectionId": "sensor",
          "difficulty": "medium",
          "type": "written",
          "prompt": "Read the supplied normal versus abnormal persistent-current source panel. Propose voltage-clamp evidence for impaired inactivation, separate expression changes and state why seizure synchronization needs additional evidence.",
          "hints": [
            {
              "body": "Identify the taught mechanism and the level of measurement."
            },
            {
              "body": "Organize your response by cause, observation, alternative explanation and control."
            }
          ],
          "markScheme": [
            {
              "text": "Compare residual current after an identical depolarizing step."
            },
            {
              "text": "Normalize peak/current density while controlling expression and driving force."
            },
            {
              "text": "A larger persistent fraction supports altered availability, not merely increased abundance."
            },
            {
              "text": "Population timing and cell identity are needed for a network interpretation."
            }
          ],
          "modelAnswer": [
            "Compare residual current after an identical depolarizing step.",
            "Normalize peak/current density while controlling expression and driving force.",
            "A larger persistent fraction supports altered availability, not merely increased abundance.",
            "Population timing and cell identity are needed for a network interpretation."
          ],
          "points": 1,
          "source": "L09 9:2 p8–9; L07 PDF7,18,22",
          "figure": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "9:2, PDF page 9. Normal inactivation versus increased persistent sodium current in the supplied diagram. Printed labels and axes retained.",
            "fallbackAlt": "9:2, PDF page 9. Normal inactivation versus increased persistent sodium current in the supplied diagram. Printed labels and axes retained.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L09/applications-09.webp', import.meta.url).href,
              "alt": "9:2, PDF page 9. Normal inactivation versus increased persistent sodium current in the supplied diagram. Printed labels and axes retained.",
              "aspect": 1.1636363636363636,
              "quiz": false,
              "layout": "stack",
              "regions": []
            }
          },
          "mockRole": "preparation"
        }
      ]
    },
    {
      "id": "L09-mock-c",
      "title": "Mock C: Cardiac safety and current-balance audit",
      "coverage": "Lectures 1–9 only. Lecture 9 applications have provisional exam scope. Practice criteria are not official marking weights.",
      "questions": [
        {
          "id": "L09-c1",
          "sectionId": "screen",
          "difficulty": "easy",
          "type": "written",
          "prompt": "a) Define channelopathy. b) Contrast LQT1 and LQT3 function changes. c) Explain atrial selectivity rationale. d) Define a hERG tail current.",
          "hints": [
            {
              "body": "Identify the taught mechanism and the level of measurement."
            },
            {
              "body": "Organize your response by cause, observation, alternative explanation and control."
            }
          ],
          "markScheme": [
            {
              "text": "Channelopathy is dysfunction, inherited or acquired; a neutral variant need not cause disease."
            },
            {
              "text": "LQT1 is KCNQ1 loss; LQT3 is SCN5A persistent-current gain."
            },
            {
              "text": "Atrial KV1.5 targeting is a rationale, not proof of zero ventricular risk."
            },
            {
              "text": "A tail follows a voltage transition, with rapid recovery from inactivation followed by deactivation."
            }
          ],
          "modelAnswer": [
            "Channelopathy is dysfunction, inherited or acquired; a neutral variant need not cause disease.",
            "LQT1 is KCNQ1 loss; LQT3 is SCN5A persistent-current gain.",
            "Atrial KV1.5 targeting is a rationale, not proof of zero ventricular risk.",
            "A tail follows a voltage transition, with rapid recovery from inactivation followed by deactivation."
          ],
          "points": 1,
          "source": "L09 9:2 p2,11–13",
          "mockRole": "preparation"
        },
        {
          "id": "L09-c2",
          "sectionId": "screen",
          "difficulty": "hard",
          "type": "written",
          "prompt": "Explain how loss of repolarizing potassium current and gain of persistent sodium current converge on delayed repolarization. Sketch a qualitative cellular AP and ECG QT interval and give the limits of a channel assay.",
          "hints": [
            {
              "body": "Identify the taught mechanism and the level of measurement."
            },
            {
              "body": "Organize your response by cause, observation, alternative explanation and control."
            }
          ],
          "markScheme": [
            {
              "text": "Channelopathy is dysfunction, inherited or acquired; a neutral variant need not cause disease."
            },
            {
              "text": "LQT1 is KCNQ1 loss; LQT3 is SCN5A persistent-current gain."
            },
            {
              "text": "Atrial KV1.5 targeting is a rationale, not proof of zero ventricular risk."
            },
            {
              "text": "A tail follows a voltage transition, with rapid recovery from inactivation followed by deactivation."
            },
            {
              "text": "Both reduced outward and increased inward current oppose repolarization; label voltage/time and Q-to-T endpoints."
            },
            {
              "text": "hERG inhibition is a hazard signal; protocol, exposure, other currents and tissue context limit clinical inference."
            }
          ],
          "modelAnswer": [
            "Channelopathy is dysfunction, inherited or acquired; a neutral variant need not cause disease.",
            "LQT1 is KCNQ1 loss; LQT3 is SCN5A persistent-current gain.",
            "Atrial KV1.5 targeting is a rationale, not proof of zero ventricular risk.",
            "A tail follows a voltage transition, with rapid recovery from inactivation followed by deactivation.",
            "Both reduced outward and increased inward current oppose repolarization; label voltage/time and Q-to-T endpoints.",
            "hERG inhibition is a hazard signal; protocol, exposure, other currents and tissue context limit clinical inference."
          ],
          "points": 1,
          "source": "L09 9:2 p11–13",
          "mockRole": "preparation"
        },
        {
          "id": "L09-c3",
          "sectionId": "screen",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "A hERG tail is $900\\,\\mathrm{pA}$ initially. A matched time-control gives $750\\,\\mathrm{pA}$ and drug gives $300\\,\\mathrm{pA}$. Find time-control fraction, drug/control remaining fraction and inhibition fraction. If tail conductance is Ohmic during the comparison and driving force is $50\\,\\mathrm{mV}$, find both matched conductances.",
          "stages": [
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "Initial current",
                  "answer": {
                    "value": 9e-10,
                    "unit": "A",
                    "tolerance": 9e-16,
                    "verification": {
                      "relation": "ratio",
                      "inputs": {
                        "a": 9e-10,
                        "b": 1
                      },
                      "displayScale": 1
                    }
                  }
                },
                {
                  "label": "Time control",
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
                },
                {
                  "label": "Drug current",
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
                },
                {
                  "label": "Driving force",
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
              "title": "Time-control fraction",
              "answer": {
                "value": 0.8333333333333334,
                "unit": "",
                "tolerance": 0.0025,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 7.5e-10,
                    "b": 9e-10
                  },
                  "displayScale": 1
                }
              },
              "tex": "f_{time}=750/900",
              "modelAnswer": [
                "This estimates rundown in the matched control.",
                "$f_{time}=750/900$",
                "$0.83333333$"
              ]
            },
            {
              "title": "Remaining under drug",
              "answer": {
                "value": 0.4,
                "unit": "",
                "tolerance": 0.0012000000000000001,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 3e-10,
                    "b": 7.5e-10
                  },
                  "displayScale": 1
                }
              },
              "tex": "f=300/750",
              "modelAnswer": [
                "Use the matched baseline.",
                "$f=300/750$",
                "$0.4$"
              ]
            },
            {
              "title": "Inhibition fraction",
              "answer": {
                "value": 0.6,
                "unit": "",
                "tolerance": 0.0018,
                "verification": {
                  "relation": "sum",
                  "inputs": {
                    "a": 1,
                    "b": -0.4
                  },
                  "displayScale": 1
                }
              },
              "tex": "b=1-f",
              "modelAnswer": [
                "This is empirical inhibition under this protocol, not a binding affinity.",
                "$b=1-f$",
                "$0.6$"
              ]
            },
            {
              "title": "Control conductance",
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
              "tex": "G_c=I_c/(V-E)",
              "modelAnswer": [
                "Assumes common driving force and equivalent gate-state interpretation.",
                "$G_c=I_c/(V-E)$",
                "$1.5\\times10^{-8}\\,\\mathrm{S}$"
              ]
            },
            {
              "title": "Drug conductance",
              "answer": {
                "value": 6e-09,
                "unit": "S",
                "tolerance": 1.8e-11,
                "verification": {
                  "relation": "ratio",
                  "inputs": {
                    "a": 3e-10,
                    "b": 0.05
                  },
                  "displayScale": 1
                }
              },
              "tex": "G_d=I_d/(V-E)",
              "modelAnswer": [
                "The conductance decrease alone does not quantify clinical arrhythmia risk.",
                "$G_d=I_d/(V-E)$",
                "$6\\times10^{-9}\\,\\mathrm{S}$"
              ]
            }
          ],
          "hints": [
            {
              "body": "Normalize to the time-matched control and use signed Ohm current."
            },
            {
              "body": "Start with the two control currents converted to amperes; form the remaining fraction before taking its complement."
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating.",
            "This estimates rundown in the matched control.",
            "Use the matched baseline.",
            "This is empirical inhibition under this protocol, not a binding affinity.",
            "Assumes common driving force and equivalent gate-state interpretation.",
            "The conductance decrease alone does not quantify clinical arrhythmia risk."
          ],
          "points": 1,
          "source": "L09 9:2 p13",
          "mockRole": "preparation"
        },
        {
          "id": "L09-c4",
          "sectionId": "lqt",
          "difficulty": "hard",
          "type": "multiStepCalc",
          "prompt": "At one fixed depolarized instant, potassium current is $+80\\,\\mathrm{pA}$, persistent sodium current is $-30\\,\\mathrm{pA}$, applied current is zero and capacitance is $10\\,\\mathrm{pF}$. Find net ionic current and voltage slope. Then halve outward potassium current and double inward sodium current. Find the new slope and explain the relation to delayed repolarization without calculating a QT interval.",
          "stages": [
            {
              "title": "Enter substitution quantities",
              "fields": [
                {
                  "label": "Potassium current",
                  "answer": {
                    "value": 8e-11,
                    "unit": "A",
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
                },
                {
                  "label": "Sodium current",
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
              "title": "Initial ionic sum",
              "answer": {
                "value": 5e-11,
                "unit": "A",
                "tolerance": 1.5000000000000002e-13,
                "verification": {
                  "relation": "sum",
                  "inputs": {
                    "a": 8e-11,
                    "b": -3e-11
                  },
                  "displayScale": 1
                }
              },
              "tex": "I_{ion}=I_K+I_{NaP}",
              "modelAnswer": [
                "Signed currents oppose each other.",
                "$I_{ion}=I_K+I_{NaP}$",
                "$5\\times10^{-11}\\,\\mathrm{A}$"
              ]
            },
            {
              "title": "Initial slope",
              "answer": {
                "value": -5,
                "unit": "A/F",
                "tolerance": 0.015,
                "verification": {
                  "relation": "hhBalance",
                  "inputs": {
                    "im": 0,
                    "ionic": 5e-11,
                    "capacitance": 1e-11
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\dot V=-I_{ion}/C",
              "modelAnswer": [
                "Outward ionic current repolarizes.",
                "$\\dot V=-I_{ion}/C$",
                "$-5\\,\\mathrm{A/F}$"
              ]
            },
            {
              "title": "Changed ionic sum",
              "answer": {
                "value": -2e-11,
                "unit": "A",
                "tolerance": 6e-14,
                "verification": {
                  "relation": "sum",
                  "inputs": {
                    "a": 4e-11,
                    "b": -6e-11
                  },
                  "displayScale": 1
                }
              },
              "tex": "I_{ion,2}=40-60\\,\\mathrm{pA}",
              "modelAnswer": [
                "The new balance is inward.",
                "$I_{ion,2}=40-60\\,\\mathrm{pA}$",
                "$-2\\times10^{-11}\\,\\mathrm{A}$"
              ]
            },
            {
              "title": "Changed slope",
              "answer": {
                "value": 2,
                "unit": "A/F",
                "tolerance": 0.006,
                "verification": {
                  "relation": "hhBalance",
                  "inputs": {
                    "im": 0,
                    "ionic": -2e-11,
                    "capacitance": 1e-11
                  },
                  "displayScale": 1
                }
              },
              "tex": "\\dot V_2=-I_{ion,2}/C",
              "modelAnswer": [
                "This instantaneous slope is depolarizing; time-varying currents and tissue context are needed for a QT prediction.",
                "$\\dot V_2=-I_{ion,2}/C$",
                "$2\\,\\mathrm{A/F}$"
              ]
            },
            {
              "title": "Meaning",
              "choices": [
                {
                  "label": "The altered instantaneous balance opposes repolarization"
                },
                {
                  "label": "A single instantaneous slope uniquely determines the ECG QT interval"
                }
              ],
              "correct": 0,
              "modelAnswer": [
                "A cellular derivative is not a complete tissue waveform."
              ]
            }
          ],
          "hints": [
            {
              "body": "Combine signed ionic currents before applying capacitive balance."
            },
            {
              "body": "Start with $I_{ion}=80-30$ in picoamperes; then use $\\dot V=-I_{ion}/C$ separately for each condition."
            }
          ],
          "modelAnswer": [
            "Convert each stated quantity to the requested unit before evaluating.",
            "Signed currents oppose each other.",
            "Outward ionic current repolarizes.",
            "The new balance is inward.",
            "This instantaneous slope is depolarizing; time-varying currents and tissue context are needed for a QT prediction.",
            "A cellular derivative is not a complete tissue waveform."
          ],
          "points": 1,
          "source": "L09 9:2 p12",
          "mockRole": "preparation"
        },
        {
          "id": "L09-c5",
          "sectionId": "screen",
          "difficulty": "medium",
          "type": "written",
          "prompt": "Interpret the supplied hERG tail and drug-response source panels. Identify the measurement mode, a normalization strategy, rundown/artifact controls and what cannot be concluded from the curve.",
          "hints": [
            {
              "body": "Identify the taught mechanism and the level of measurement."
            },
            {
              "body": "Organize your response by cause, observation, alternative explanation and control."
            }
          ],
          "markScheme": [
            {
              "text": "Voltage is controlled and current measured in the source patch-clamp assay."
            },
            {
              "text": "Use matched time-control and drug tails at the same protocol."
            },
            {
              "text": "Check leak, capacitance, rundown, voltage/solutions and exposure."
            },
            {
              "text": "No precise IC50 is digitized here; inhibition alone does not measure clinical arrhythmia incidence."
            }
          ],
          "modelAnswer": [
            "Voltage is controlled and current measured in the source patch-clamp assay.",
            "Use matched time-control and drug tails at the same protocol.",
            "Check leak, capacitance, rundown, voltage/solutions and exposure.",
            "No precise IC50 is digitized here; inhibition alone does not measure clinical arrhythmia incidence."
          ],
          "points": 1,
          "source": "L09 9:2 p13",
          "figure": {
            "type": "widget",
            "name": "image-hotspots",
            "caption": "9:2, PDF page 13. Source CHO-cell hERG tails and normalized terfenadine/quinidine inhibition curves. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
            "fallbackAlt": "9:2, PDF page 13. Source CHO-cell hERG tails and normalized terfenadine/quinidine inhibition curves. Printed labels and axes retained. Scroll horizontally to read the original axes or table on narrow screens.",
            "props": {
              "src": new URL('../../assets/figures/nbe-e4120/L09/applications-13.webp', import.meta.url).href,
              "alt": "9:2, PDF page 13. Source CHO-cell hERG tails and normalized terfenadine/quinidine inhibition curves. Printed labels and axes retained.",
              "aspect": 4.225,
              "quiz": false,
              "layout": "stack",
              "regions": [],
              "minWidth": 1000
            }
          },
          "mockRole": "preparation"
        }
      ]
    }
  ],
  "formulaReferenceNote": "Official exam PDF p4: supplied equation sheet. Calculator permitted; open-book status unconfirmed.",
  "recap": {
    "intro": "Revision reference. Part-2 application exam scope remains provisional.",
    "terms": [
      {
        "term": "Pumps, carriers and channels",
        "definition": "Pumps convert ATP, light or other energy into gradients."
      },
      {
        "term": "Channelome and cellular functions",
        "definition": "The entire membrane channel set includes organelle membranes."
      },
      {
        "term": "Expression, gating and trafficking",
        "definition": "Ion channels are aqueous membrane pores."
      },
      {
        "term": "KcsA architecture and intracellular pH gate",
        "definition": "Four two-helix subunits surround one pore."
      },
      {
        "term": "Follow potassium through the pore",
        "definition": "Pore-helix charge attracts potassium into the aqueous cavity."
      },
      {
        "term": "Selectivity filter, binding sites and exclusion",
        "definition": "The source pore is about $4.5\\,\\mathrm{nm}$ long; its filter about $1.2\\,\\mathrm{nm}$."
      },
      {
        "term": "Size, charge, hydration and throughput",
        "definition": "Higher charge and smaller size generally strengthen hydration."
      },
      {
        "term": "Gating, inactivation and concentration economy",
        "definition": "Activation and deactivation connect closed and open states."
      },
      {
        "term": "Stochastic single-channel and ensemble currents",
        "definition": "The sodium records show transient inward openings; the potassium records show delayed outward openings."
      },
      {
        "term": "Pore-forming and auxiliary subunits",
        "definition": "Classification criteria answer different questions."
      },
      {
        "term": "Pore duplication and voltage-sensor additions",
        "definition": "Two-helix pore modules are the schematic starting point."
      },
      {
        "term": "Ligand-binding and other channel lineages",
        "definition": "The source schematic adds glutamate binding to a channel lineage."
      },
      {
        "term": "Structural family reference",
        "definition": "One-helix M2 proton channels differ from two-helix examples such as MscL and amiloride-sensitive channels."
      },
      {
        "term": "Voltage, ligand, mechanical and multimodal gating",
        "definition": "Voltage, ligand and mechanical signals alter opening."
      },
      {
        "term": "Voltage-gated cation channel organization",
        "definition": "Bacterial sodium/calcium channels can assemble four identical subunits."
      },
      {
        "term": "Voltage sensor versus pore domain",
        "definition": "Four sensor domains surround the potassium pore."
      },
      {
        "term": "Sodium subtypes and auxiliary functions",
        "definition": "The source adult sensory list includes NaV1.1, NaV1.6, NaV1.7, NaV1.8 and NaV1.9."
      },
      {
        "term": "Delayed rectifier, A-type and M-type currents",
        "definition": "Potassium channels form homo- or heterotetramers."
      },
      {
        "term": "TRP architecture and multimodal sensing",
        "definition": "The source lists temperature, pain, taste, mechanical and visual sensory roles."
      },
      {
        "term": "Thermal TRP examples and chemical activation",
        "definition": "The source diagram spans cold through noxious heat with different TRP members."
      },
      {
        "term": "Extracellular ligands and nicotinic receptors",
        "definition": "The source transmitter examples include acetylcholine, serotonin, glutamate, glycine and GABA."
      },
      {
        "term": "Channelopathy: altered function and ENaC",
        "definition": "Changes can affect gating, conductance, selectivity, abundance or signaling."
      },
      {
        "term": "Toxin mechanisms: block, activate and alter gating",
        "definition": "TTX blocks sodium channels from outside; batrachotoxin slows inactivation and shifts activation."
      },
      {
        "term": "TTX sensitivity and propagation failure",
        "definition": "The source contrasts low-concentration-sensitive NaV1.1–1.4,1.6,1.7 with relatively resistant NaV1.5,1.8,1.9."
      },
      {
        "term": "Direct modulation versus compensation",
        "definition": "Direct treatment should oppose the measured functional defect."
      },
      {
        "term": "Sodium-channel loss and gain in pain",
        "definition": "NaV1.7,1.8,1.9 are linked to pain pathways."
      },
      {
        "term": "State-dependent blockade and cardiac context",
        "definition": "State dependence links drug effects to membrane activity."
      },
      {
        "term": "Hyperexcitability and hypersynchronization",
        "definition": "The source illustrates repetitive abnormal discharges against a normal action potential."
      },
      {
        "term": "Impaired inactivation and persistent sodium current",
        "definition": "The source lists sodium, potassium, calcium and TRP channel associations."
      },
      {
        "term": "Potassium modulation and excitability",
        "definition": "Block can slow repolarization and change firing."
      },
      {
        "term": "hERG hazard and atrial-target contrast",
        "definition": "The source pairs hERG inhibition with reduced repolarizing potassium current."
      },
      {
        "term": "Distinct channel defects converge on long QT",
        "definition": "LQT1: KV7.1 loss; LQT2: hERG loss; LQT3: sodium gain."
      },
      {
        "term": "Read hERG tail currents and inhibition curves",
        "definition": "Identify voltage control and measured membrane current."
      }
    ],
    "equations": [
      {
        "name": "Signed single-channel current",
        "tex": "i=\\gamma(V_m-E)",
        "note": "Ohmic open pore; fixed ionic solutions."
      },
      {
        "name": "Population mean current",
        "tex": "\\langle I\\rangle=NP_{open}i",
        "note": "Identical independent pores at a fixed voltage."
      },
      {
        "name": "Functional population conductance",
        "tex": "G=NP_{open}\\gamma",
        "note": "Identical pores under matched conditions."
      },
      {
        "name": "Charge flow from ion throughput",
        "tex": "i=ze\\dot n",
        "note": "A stated unidirectional monovalent-ion rate."
      },
      {
        "name": "Charge transferred during an opening",
        "tex": "Q=It",
        "note": "Constant current over the stated interval."
      },
      {
        "name": "Voltage from inward capacitive charge",
        "tex": "\\Delta V=Q_{in}/C",
        "note": "Net inward charge goes to the capacitor; outward Q has the opposite sign."
      },
      {
        "name": "Open-pore conductance from a unitary I–V slope",
        "tex": "\\gamma=\\Delta i/\\Delta V",
        "note": "Linear open pore under unchanged ionic conditions."
      },
      {
        "name": "Normalized current remaining",
        "tex": "f=I_{drug}/I_{control}",
        "note": "Same sign, voltage, solutions, and time-matched baseline."
      },
      {
        "name": "HH available sodium fraction",
        "tex": "P_{open}=m^3h",
        "note": "Cumulative HH phenomenology, not a literal molecular domain count."
      },
      {
        "name": "All-required independent gates",
        "tex": "P=y^k",
        "note": "Ideal identical independent factors; not inferred from subunit count alone."
      },
      {
        "name": "Dependency notation, reference only",
        "tex": "P_{open}=f(V_m,t,c_{ligand})",
        "note": "Not a unique numerical law."
      }
    ],
    "constants": [
      {
        "name": "Elementary charge used in new problems",
        "tex": "e=1.6\\times10^{-19}\\,\\mathrm C"
      }
    ],
    "conventions": [
      "$V_m=V_{in}-V_{out}$; outside is the voltage reference.",
      "Outward positive-charge current is positive; inward cation current is negative.",
      "$Q_{in}=-Q_{out}$ when only charge transfer is considered.",
      "Unitary amplitude, open probability and channel number are separate quantities.",
      "Historical source pharmacology examples are mechanism teaching, not dosing or present clinical-status claims."
    ]
  }
};
content.formulaReference=equationSheet;
export default content;
