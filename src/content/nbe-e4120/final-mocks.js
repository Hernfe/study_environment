// Cumulative L01–L10 practice. Existing exam IDs preserve saved attempts.
export const fullCourseMocks = [
  {
    "id": "full-L01-L09-01",
    "title": "Full-course mock 1: Equilibrium, spatial spread and clamp evidence",
    "coverage": "Available lectures L01–L10. Focus: L01–L04 and L07. L10 topic: miniature and evoked end-plate potentials. Estimated workload: 180 minutes (practice estimate: 20, 40, 45, 45 and 30 minutes). L11–L12 materials are pending.",
    "questions": [
      {
        "type": "written",
        "difficulty": "medium",
        "prompt": "Answer in 1–3 sentences per part: a) Why can a resting membrane carry nonzero individual ionic currents? b) What does an equilibrium potential specify? c) Why can bulk solutions remain nearly neutral while voltage changes? d) Contrast a graded response with a regenerating action potential. e) Define an isopotential approximation. f) What is the difference between an mEPP and an evoked EPP?",
        "source": "L01 PDF24,30–36; L02 PDF8–19; L03 PDF2–5; L10 pp30–32",
        "points": 1,
        "markScheme": [
          {
            "text": "At rest the net current can vanish while opposing species currents cancel; this is not equilibrium for every species."
          },
          {
            "text": "An ion equilibrium potential balances its concentration and electrical driving forces, giving zero net flux for that ion."
          },
          {
            "text": "Only a tiny separation of charge near the membrane is needed; bulk ionic concentrations remain almost neutral."
          },
          {
            "text": "Graded responses vary with input and decay passively; an action potential recruits voltage-dependent conductances and regenerates."
          },
          {
            "text": "An isopotential model neglects spatial voltage differences when electrotonic dimensions and the protocol make them small."
          },
          {
            "text": "An mEPP reflects the response to one spontaneous quantum. An evoked EPP can sum several responses."
          }
        ],
        "modelAnswer": [
          "At rest the net current can vanish while opposing species currents cancel; this is not equilibrium for every species.",
          "An ion equilibrium potential balances its concentration and electrical driving forces, giving zero net flux for that ion.",
          "Only a tiny separation of charge near the membrane is needed; bulk ionic concentrations remain almost neutral.",
          "Graded responses vary with input and decay passively; an action potential recruits voltage-dependent conductances and regenerates.",
          "An isopotential model neglects spatial voltage differences when electrotonic dimensions and the protocol make them small.",
          "An mEPP reflects the response to one spontaneous quantum. An evoked EPP can sum several responses."
        ],
        "hints": [
          {
            "body": "Separate the requested parts and identify the physical variables held fixed."
          },
          {
            "body": "State the relevant mechanism, then apply it to the stated comparison and explain a limitation."
          }
        ],
        "id": "FC01-Q1",
        "role": "concepts"
      },
      {
        "type": "written",
        "difficulty": "medium",
        "prompt": "Explain why lowering membrane resistance can reduce both the size and reach of a dendritic response without changing specific capacitance. Sketch voltage versus time at the injection site and steady voltage versus distance before and after the change, for equal injected current. Label the reference voltage, axes and assumptions.",
        "source": "L01 PDF24–26; L03 cable relations; L04 PDF7–12",
        "points": 1,
        "markScheme": [
          {
            "text": "Use a passive uniform cable with unchanged geometry and axial resistance; plot voltage increments relative to rest."
          },
          {
            "text": "Lower membrane resistance increases leak and reduces input resistance, so equal injected current gives a smaller source voltage."
          },
          {
            "text": "The length constant falls as the square root of membrane resistance, giving stronger spatial attenuation."
          },
          {
            "text": "The membrane time constant falls with resistance at fixed capacitance; the local response approaches its smaller steady value faster."
          },
          {
            "text": "Label time and distance axes and distinguish the temporal charging curve from the steady spatial curve; finite boundaries can change the profile."
          }
        ],
        "modelAnswer": [
          "Use a passive uniform cable with unchanged geometry and axial resistance; plot voltage increments relative to rest.",
          "Lower membrane resistance increases leak and reduces input resistance, so equal injected current gives a smaller source voltage.",
          "The length constant falls as the square root of membrane resistance, giving stronger spatial attenuation.",
          "The membrane time constant falls with resistance at fixed capacitance; the local response approaches its smaller steady value faster.",
          "Label time and distance axes and distinguish the temporal charging curve from the steady spatial curve; finite boundaries can change the profile."
        ],
        "hints": [
          {
            "body": "Separate the requested parts and identify the physical variables held fixed."
          },
          {
            "body": "State the relevant mechanism, then apply it to the stated comparison and explain a limitation."
          }
        ],
        "id": "FC01-Q2",
        "role": "explanation"
      },
      {
        "type": "multiStepCalc",
        "difficulty": "hard",
        "prompt": "At $20\\,^{\\circ}\\mathrm C$, an ideal membrane has only potassium permeability, with inside/outside concentrations $144/9\\,\\mathrm{mM}$. Use the supplied $58\\,\\mathrm{mV}$ shortcut. Outside concentration is raised to $18\\,\\mathrm{mM}$. Find both equilibrium voltages and their difference. If a clamp holds $-60\\,\\mathrm{mV}$ with potassium conductance $7\\,\\mathrm{nS}$ after the change, find signed potassium current and its direction.",
        "source": "L01 PDF30–33; L02 conductance/current; official sheet p4",
        "points": 1,
        "stages": [
          {
            "title": "Initial equilibrium",
            "answer": {
              "value": -69.83895899404364,
              "unit": "mV",
              "tolerance": 0.3491947949702182
            },
            "modelAnswer": [
              "$E_1=58\\log_{10}(9/144)=-69.839\\,\\mathrm{mV}$"
            ]
          },
          {
            "title": "New equilibrium",
            "answer": {
              "value": -52.379219245532724,
              "unit": "mV",
              "tolerance": 0.26189609622766363
            },
            "modelAnswer": [
              "$E_2=58\\log_{10}(18/144)=-52.379\\,\\mathrm{mV}$"
            ]
          },
          {
            "title": "Equilibrium shift",
            "answer": {
              "value": 17.45973974851091,
              "unit": "mV",
              "tolerance": 0.08729869874255455
            },
            "modelAnswer": [
              "$\\Delta E=58\\log_{10}2=17.460\\,\\mathrm{mV}$"
            ]
          },
          {
            "title": "Clamped potassium current",
            "answer": {
              "value": -53.34546528127093,
              "unit": "pA",
              "tolerance": 0.26672732640635466
            },
            "modelAnswer": [
              "$I_K=7(-60+52.379)=-53.345\\,\\mathrm{pA}$"
            ]
          }
        ],
        "modelAnswer": [
          "$E_1=58\\log_{10}(9/144)=-69.839\\,\\mathrm{mV}$",
          "$E_2=58\\log_{10}(18/144)=-52.379\\,\\mathrm{mV}$",
          "$\\Delta E=58\\log_{10}2=17.460\\,\\mathrm{mV}$",
          "$I_K=7(-60+52.379)=-53.345\\,\\mathrm{pA}$",
          "The shift is depolarizing. Negative potassium current is inward positive charge; a clamp fixes voltage rather than letting it relax to equilibrium."
        ],
        "methodCriteria": [
          {
            "text": "Selects the relevant relations and states their assumptions."
          },
          {
            "text": "Shows substitutions and consistent unit conversions."
          },
          {
            "text": "Carries intermediate results without cascading an earlier arithmetic error."
          },
          {
            "text": "Explains the sign, physical plausibility and requested limitation."
          }
        ],
        "hints": [
          {
            "body": "Choose relations for the stated idealized model; distinguish equilibrium, steady state and transient quantities."
          },
          {
            "body": "Begin with $E_1=58\\log_{10}(9/144)$. Then find new equilibrium, equilibrium shift, clamped potassium current. Check units and physical sign."
          }
        ],
        "id": "FC01-Q3",
        "role": "calculation"
      },
      {
        "type": "multiStepCalc",
        "difficulty": "hard",
        "prompt": "A uniform matched passive cable has measured steady rest-relative responses $12\\,\\mathrm{mV}$ at the origin and $4\\,\\mathrm{mV}$ at $0.66\\,\\mathrm{mm}$. Its time constant is $15\\,\\mathrm{ms}$. Infer the length constant, predict the response at $1.10\\,\\mathrm{mm}$, and calculate the course characteristic passive speed. Explain why this speed is not a sharp action-potential front.",
        "source": "L03 cable attenuation and characteristic speed; L04 matched boundary; official sheet p4",
        "points": 1,
        "stages": [
          {
            "title": "Infer length constant",
            "answer": {
              "value": 0.6007578895737127,
              "unit": "mm",
              "tolerance": 0.0030037894478685636
            },
            "modelAnswer": [
              "$\\lambda=x/\\ln(V_0/V_x)=0.66/\\ln3=0.60076\\,\\mathrm{mm}$"
            ]
          },
          {
            "title": "Remote steady response",
            "answer": {
              "value": 1.9229994270765443,
              "unit": "mV",
              "tolerance": 0.00961499713538272
            },
            "modelAnswer": [
              "$V(1.10)=12e^{-1.10/0.60076}=1.922999\\,\\mathrm{mV}$"
            ]
          },
          {
            "title": "Characteristic passive speed",
            "answer": {
              "value": 0.08010105194316168,
              "unit": "m/s",
              "tolerance": 0.00040050525971580843
            },
            "modelAnswer": [
              "$\\theta=2\\lambda/\\tau=2(0.00060076)/0.015=0.080101\\,\\mathrm{m/s}$"
            ]
          }
        ],
        "modelAnswer": [
          "$\\lambda=x/\\ln(V_0/V_x)=0.66/\\ln3=0.60076\\,\\mathrm{mm}$",
          "$V(1.10)=12e^{-1.10/0.60076}=1.922999\\,\\mathrm{mV}$",
          "$\\theta=2\\lambda/\\tau=2(0.00060076)/0.015=0.080101\\,\\mathrm{m/s}$",
          "The speed is a course characteristic estimate for passive spread. Passive diffusion does not have a single propagating front."
        ],
        "methodCriteria": [
          {
            "text": "Selects the relevant relations and states their assumptions."
          },
          {
            "text": "Shows substitutions and consistent unit conversions."
          },
          {
            "text": "Carries intermediate results without cascading an earlier arithmetic error."
          },
          {
            "text": "Explains the sign, physical plausibility and requested limitation."
          }
        ],
        "hints": [
          {
            "body": "Choose relations for the stated idealized model; distinguish equilibrium, steady state and transient quantities."
          },
          {
            "body": "Begin with $\\lambda=x/\\ln(V_0/V_x)=0.66/\\ln3$. Then find remote steady response, characteristic passive speed. Check units and physical sign."
          }
        ],
        "id": "FC01-Q4",
        "role": "calculation"
      },
      {
        "type": "written",
        "difficulty": "medium",
        "prompt": "Design a two-electrode voltage-clamp comparison to determine whether an early inward current and delayed outward current are distinct ionic components. Give controlled and measured variables, two separation approaches, and a reason a peak current–voltage curve alone cannot prove an Ohmic instantaneous conductance. Do not assume later recording electronics. Describe how dSEVC separates sensing from injection and identify a voltage offset that remains to be accounted for.",
        "source": "L02 PDF17–19,28; L07 PDF7–10,18–22; Axon Guide pp57–67,94",
        "points": 1,
        "markScheme": [
          {
            "text": "Command membrane voltage relative to a reference and measure the feedback current needed to hold it; use matched holding and test protocols."
          },
          {
            "text": "Use sodium replacement or a sodium blocker to isolate the early component, with appropriate controls."
          },
          {
            "text": "Use a potassium blocker or reversal manipulation to distinguish the delayed outward component."
          },
          {
            "text": "Compare control and intervention traces under matched voltage, timing and baseline subtraction; capacitive transients are not ionic activation."
          },
          {
            "text": "A peak curve samples different gating states as voltage changes; an instantaneous test attempts to hold gating fixed and measures driving force more directly."
          },
          {
            "text": "dSEVC alternates injection and sensing with one electrode. Sample after its transient settles and use that voltage for feedback. A liquid junction potential can shift the voltage reference and needs a signed correction."
          }
        ],
        "modelAnswer": [
          "Command membrane voltage relative to a reference and measure the feedback current needed to hold it; use matched holding and test protocols.",
          "Use sodium replacement or a sodium blocker to isolate the early component, with appropriate controls.",
          "Use a potassium blocker or reversal manipulation to distinguish the delayed outward component.",
          "Compare control and intervention traces under matched voltage, timing and baseline subtraction; capacitive transients are not ionic activation.",
          "A peak curve samples different gating states as voltage changes; an instantaneous test attempts to hold gating fixed and measures driving force more directly.",
          "dSEVC alternates injection and sensing with one electrode. Sample after its transient settles and use that voltage for feedback. A liquid junction potential can shift the voltage reference and needs a signed correction."
        ],
        "hints": [
          {
            "body": "Separate the requested parts and identify the physical variables held fixed."
          },
          {
            "body": "State the relevant mechanism, then apply it to the stated comparison and explain a limitation."
          }
        ],
        "id": "FC01-Q5",
        "role": "methods"
      }
    ]
  },
  {
    "id": "full-L01-L09-02",
    "title": "Full-course mock 2: Trees, relaxation and current balance",
    "coverage": "Available lectures L01–L10. Focus: L03–L08. L10 topic: the synaptic reversal measured at the soma. Estimated workload: 180 minutes (practice estimate: 20, 40, 45, 45 and 30 minutes). L11–L12 materials are pending.",
    "questions": [
      {
        "type": "written",
        "difficulty": "medium",
        "prompt": "Give short answers: a) State the Rall diameter rule. b) Why is that rule alone insufficient for an exact equivalent cylinder? c) Distinguish length constant and electrotonic length. d) Distinguish a sealed cable end from a cut-open end. e) What do independent HH gate powers represent? f) Why can a dendritic synapse’s apparent somatic reversal differ from its local reversal?",
        "source": "L03–L05 cable/Rall; L07 gate model; L10 pp28–29",
        "points": 1,
        "markScheme": [
          {
            "text": "The parent diameter to the three-halves power equals the sum of daughter diameters to that power."
          },
          {
            "text": "Passive properties, appropriate terminal boundary conditions and equal terminal electrotonic path lengths must also match."
          },
          {
            "text": "Length constant is a physical distance scale; electrotonic length is physical length divided by that scale."
          },
          {
            "text": "A sealed end has zero axial current and zero voltage slope; a cut-open end is held at the reference voltage."
          },
          {
            "text": "Products and powers represent probabilities of required independent permissive particles, not literal pore counts or a universal molecular mechanism."
          },
          {
            "text": "Axial resistance and membrane leak limit how closely the dendritic voltage follows the somatic command."
          }
        ],
        "modelAnswer": [
          "The parent diameter to the three-halves power equals the sum of daughter diameters to that power.",
          "Passive properties, appropriate terminal boundary conditions and equal terminal electrotonic path lengths must also match.",
          "Length constant is a physical distance scale; electrotonic length is physical length divided by that scale.",
          "A sealed end has zero axial current and zero voltage slope; a cut-open end is held at the reference voltage.",
          "Products and powers represent probabilities of required independent permissive particles, not literal pore counts or a universal molecular mechanism.",
          "Axial resistance and membrane leak limit how closely the dendritic voltage follows the somatic command."
        ],
        "hints": [
          {
            "body": "Separate the requested parts and identify the physical variables held fixed."
          },
          {
            "body": "State the relevant mechanism, then apply it to the stated comparison and explain a limitation."
          }
        ],
        "id": "FC02-Q1",
        "role": "concepts"
      },
      {
        "type": "written",
        "difficulty": "medium",
        "prompt": "A branch-point model satisfies the diameter rule but has unequal electrotonic paths to sealed terminals. Explain what the rule preserves locally and why global cylinder reduction can fail. Sketch the branch point and a passive compartment circuit, labelling axial coupling, membrane leak and capacitance. Compare local voltage summation with conductance-based synaptic summation.",
        "source": "L05 Rall, compartment and integration sections; Exercise5 P1",
        "points": 1,
        "markScheme": [
          {
            "text": "The diameter rule matches characteristic passive loads locally when the underlying specific properties agree."
          },
          {
            "text": "Unequal terminal electrotonic distances violate an additional condition of an exact equivalent-cylinder reduction."
          },
          {
            "text": "Label the parent, daughters and terminals on the tree; do not replace unequal paths solely because diameters match."
          },
          {
            "text": "Draw membrane capacitance and leak in parallel in each compartment, with axial resistance coupling neighbouring voltages."
          },
          {
            "text": "Injected currents can superpose in a linear passive model, while synaptic conductance changes alter driving force and total membrane conductance, limiting simple voltage addition."
          }
        ],
        "modelAnswer": [
          "The diameter rule matches characteristic passive loads locally when the underlying specific properties agree.",
          "Unequal terminal electrotonic distances violate an additional condition of an exact equivalent-cylinder reduction.",
          "Label the parent, daughters and terminals on the tree; do not replace unequal paths solely because diameters match.",
          "Draw membrane capacitance and leak in parallel in each compartment, with axial resistance coupling neighbouring voltages.",
          "Injected currents can superpose in a linear passive model, while synaptic conductance changes alter driving force and total membrane conductance, limiting simple voltage addition."
        ],
        "hints": [
          {
            "body": "Separate the requested parts and identify the physical variables held fixed."
          },
          {
            "body": "State the relevant mechanism, then apply it to the stated comparison and explain a limitation."
          }
        ],
        "id": "FC02-Q2",
        "role": "explanation"
      },
      {
        "type": "multiStepCalc",
        "difficulty": "hard",
        "prompt": "An ideal passive binary bifurcation has daughter diameters $1.1$ and $1.7\\,\\mathrm{\\mu m}$. Find the matched parent diameter. With $R_m=16000\\,\\Omega\\,\\mathrm{cm^2}$ and $R_i=100\\,\\Omega\\,\\mathrm{cm}$, calculate the parent length constant using radius in centimetres, then the electrotonic length of a $240\\,\\mathrm{\\mu m}$ parent. Does matching this node prove exact whole-tree reduction?",
        "source": "L03 geometry; L05 Rall; Exercise5 P1–2; official sheet p4",
        "points": 1,
        "stages": [
          {
            "title": "Matched parent diameter",
            "answer": {
              "value": 2.2478744093530034,
              "unit": "um",
              "tolerance": 0.011239372046765018
            },
            "modelAnswer": [
              "$d_P=(1.1^{3/2}+1.7^{3/2})^{2/3}=2.247874\\,\\mathrm{\\mu m}$"
            ]
          },
          {
            "title": "Parent length constant",
            "answer": {
              "value": 948.2350783119138,
              "unit": "um",
              "tolerance": 4.741175391559569
            },
            "modelAnswer": [
              "$\\lambda=\\sqrt{(16000/100)(d_P10^{-4}/4)}=948.2351\\,\\mathrm{\\mu m}$"
            ]
          },
          {
            "title": "Parent electrotonic length",
            "answer": {
              "value": 0.25310179457530474,
              "unit": "",
              "tolerance": 0.0012655089728765237
            },
            "modelAnswer": [
              "$L=240/948.2351=0.253102$"
            ]
          }
        ],
        "modelAnswer": [
          "$d_P=(1.1^{3/2}+1.7^{3/2})^{2/3}=2.247874\\,\\mathrm{\\mu m}$",
          "$\\lambda=\\sqrt{(16000/100)(d_P10^{-4}/4)}=948.2351\\,\\mathrm{\\mu m}$",
          "$L=240/948.2351=0.253102$",
          "The small dimensionless length suggests limited parent attenuation under suitable boundaries. All terminal-path and property conditions still need checking."
        ],
        "methodCriteria": [
          {
            "text": "Selects the relevant relations and states their assumptions."
          },
          {
            "text": "Shows substitutions and consistent unit conversions."
          },
          {
            "text": "Carries intermediate results without cascading an earlier arithmetic error."
          },
          {
            "text": "Explains the sign, physical plausibility and requested limitation."
          }
        ],
        "hints": [
          {
            "body": "Choose relations for the stated idealized model; distinguish equilibrium, steady state and transient quantities."
          },
          {
            "body": "Begin with $d_P=(1.1^{3/2}+1.7^{3/2})^{2/3}$. Then find parent length constant, parent electrotonic length. Check units and physical sign."
          }
        ],
        "id": "FC02-Q3",
        "role": "calculation"
      },
      {
        "type": "multiStepCalc",
        "difficulty": "hard",
        "prompt": "A voltage step leaves a first-order activation variable at $y_0=0.1$. At the test voltage, $y_\\infty=0.7$ and $\\tau=4\\,\\mathrm{ms}$. Infer forward and backward rates in inverse milliseconds. Find $y$ after $4\\,\\mathrm{ms}$. Four independent required particles control a population with maximal conductance $32\\,\\mathrm{nS}$; find conductance then and current for driving force $25\\,\\mathrm{mV}$.",
        "source": "L06 state balance; L07 relaxation/gate products; official sheet p4",
        "points": 1,
        "stages": [
          {
            "title": "Forward rate",
            "answer": {
              "value": 0.175,
              "unit": "1/ms",
              "tolerance": 0.0008749999999999999
            },
            "modelAnswer": [
              "$\\alpha=y_\\infty/\\tau=0.7/4=0.175\\,\\mathrm{ms^{-1}}$"
            ]
          },
          {
            "title": "Backward rate",
            "answer": {
              "value": 0.075,
              "unit": "1/ms",
              "tolerance": 0.000375
            },
            "modelAnswer": [
              "$\\beta=(1-y_\\infty)/\\tau=0.3/4=0.075\\,\\mathrm{ms^{-1}}$"
            ]
          },
          {
            "title": "Activation at one time constant",
            "answer": {
              "value": 0.47927233529713453,
              "unit": "",
              "tolerance": 0.0023963616764856727
            },
            "modelAnswer": [
              "$y(4)=0.7+(0.1-0.7)e^{-1}=0.479272$"
            ]
          },
          {
            "title": "Population conductance",
            "answer": {
              "value": 1.6884158610046516,
              "unit": "nS",
              "tolerance": 0.008442079305023258
            },
            "modelAnswer": [
              "$g=32(0.479272)^4=1.688416\\,\\mathrm{nS}$"
            ]
          },
          {
            "title": "Outward current",
            "answer": {
              "value": 42.21039652511629,
              "unit": "pA",
              "tolerance": 0.21105198262558145
            },
            "modelAnswer": [
              "$I=g(V-E)=1.688416(25)=42.21040\\,\\mathrm{pA}$"
            ]
          }
        ],
        "modelAnswer": [
          "$\\alpha=y_\\infty/\\tau=0.7/4=0.175\\,\\mathrm{ms^{-1}}$",
          "$\\beta=(1-y_\\infty)/\\tau=0.3/4=0.075\\,\\mathrm{ms^{-1}}$",
          "$y(4)=0.7+(0.1-0.7)e^{-1}=0.479272$",
          "$g=32(0.479272)^4=1.688416\\,\\mathrm{nS}$",
          "$I=g(V-E)=1.688416(25)=42.21040\\,\\mathrm{pA}$",
          "Rates are nonnegative and activation remains between its initial and steady values. The product requires the stated independence assumption."
        ],
        "methodCriteria": [
          {
            "text": "Selects the relevant relations and states their assumptions."
          },
          {
            "text": "Shows substitutions and consistent unit conversions."
          },
          {
            "text": "Carries intermediate results without cascading an earlier arithmetic error."
          },
          {
            "text": "Explains the sign, physical plausibility and requested limitation."
          }
        ],
        "hints": [
          {
            "body": "Choose relations for the stated idealized model; distinguish equilibrium, steady state and transient quantities."
          },
          {
            "body": "Begin with $\\alpha=y_\\infty/\\tau=0.7/4$. Then find backward rate, activation at one time constant, population conductance, outward current. Check units and physical sign."
          }
        ],
        "id": "FC02-Q4",
        "role": "calculation"
      },
      {
        "type": "written",
        "difficulty": "medium",
        "prompt": "An injected dendritic pulse gives a smaller, broader somatic response than a local response. Propose a passive-recording comparison that separates electrotonic filtering from a change in stimulus delivery. Specify what to match, what to record, boundary/load effects, and what this observation cannot establish about active dendritic spikes. Then describe how to measure the apparent reversal of an evoked input at the same remote site.",
        "source": "L03 transient filtering; L04 summation/recordings; L05 dendritic integration; L10 pp25–29",
        "points": 1,
        "markScheme": [
          {
            "text": "Match the actual injected current waveform and baseline conditions, rather than only the nominal command."
          },
          {
            "text": "Record local and somatic voltage increments and compare amplitude and time course at known sites."
          },
          {
            "text": "Passive cable spread attenuates and temporally filters remote responses, so a smaller broader waveform is expected."
          },
          {
            "text": "Soma loading, branching and terminal conditions affect transfer and should be controlled or included in the model."
          },
          {
            "text": "The waveform alone does not prove an active spike or exclude active channels; test voltage dependence and reproducibility with additional protocols."
          }
        ],
        "modelAnswer": [
          "Match the actual injected current waveform and baseline conditions, rather than only the nominal command.",
          "Record local and somatic voltage increments and compare amplitude and time course at known sites.",
          "Passive cable spread attenuates and temporally filters remote responses, so a smaller broader waveform is expected.",
          "Soma loading, branching and terminal conditions affect transfer and should be controlled or included in the model.",
          "The waveform alone does not prove an active spike or exclude active channels; test voltage dependence and reproducibility with additional protocols.",
        "Under somatic voltage clamp evoke the same synaptic input at several holds. Subtract the baseline at each hold and find where net evoked current crosses zero. This gives an apparent somatic reversal because the distal voltage can differ from the command."
        ],
        "hints": [
          {
            "body": "Separate the requested parts and identify the physical variables held fixed."
          },
          {
            "body": "State the relevant mechanism, then apply it to the stated comparison and explain a limitation."
          }
        ],
        "id": "FC02-Q5",
        "role": "methods"
      }
    ]
  },
  {
    "id": "full-L01-L09-03",
    "title": "Full-course mock 3: Membrane charging, channel noise and molecular gates",
    "coverage": "Available lectures L01–L10. Focus: L01, L02, L07–L09. L10 topic: ionotropic and metabotropic receptors. Estimated workload: 180 minutes (practice estimate: 20, 40, 45, 45 and 30 minutes). L11–L12 materials are pending.",
    "questions": [
      {
        "type": "written",
        "difficulty": "medium",
        "prompt": "Briefly distinguish: a) capacitance and conductance, b) gating current and ionic current, c) selectivity filter and voltage sensor, d) a single-channel event and an ensemble average, e) a closed channel and an inactivated channel. f) Distinguish ionotropic and metabotropic receptor operation.",
        "source": "L01 PDF23–24; L07 gating; L08 8:1 PDF15–18; L09 9:1 PDF7–10,16–17; L10 pp22–23",
        "points": 1,
        "markScheme": [
          {
            "text": "Capacitance relates stored charge to voltage; conductance relates ionic current to driving force in the stated model."
          },
          {
            "text": "Gating current reflects sensor charge movement; ionic current reflects ions passing through the pore."
          },
          {
            "text": "The filter discriminates permeating ions; the voltage sensor couples voltage-dependent charge movement to gating."
          },
          {
            "text": "Individual events are stochastic; averaging matched trials reveals a reproducible mean time course."
          },
          {
            "text": "A closed activatable channel can open with activation; an inactivated channel must regain availability before ordinary reopening."
          },
          {
            "text": "Ionotropic receptors directly gate a channel. Metabotropic receptors signal through intracellular pathways."
          }
        ],
        "modelAnswer": [
          "Capacitance relates stored charge to voltage; conductance relates ionic current to driving force in the stated model.",
          "Gating current reflects sensor charge movement; ionic current reflects ions passing through the pore.",
          "The filter discriminates permeating ions; the voltage sensor couples voltage-dependent charge movement to gating.",
          "Individual events are stochastic; averaging matched trials reveals a reproducible mean time course.",
          "A closed activatable channel can open with activation; an inactivated channel must regain availability before ordinary reopening.",
          "Ionotropic receptors directly gate a channel. Metabotropic receptors signal through intracellular pathways."
        ],
        "hints": [
          {
            "body": "Separate the requested parts and identify the physical variables held fixed."
          },
          {
            "body": "State the relevant mechanism, then apply it to the stated comparison and explain a limitation."
          }
        ],
        "id": "FC03-Q1",
        "role": "concepts"
      },
      {
        "type": "written",
        "difficulty": "medium",
        "prompt": "Explain a voltage-gated potassium channel from membrane voltage to macroscopic current. Sketch one six-helix subunit and the tetrameric pore; label sensor, pore helices and filter. Explain how a filter change and a sensor change could affect current differently, and why an HH gate is not a literal structural helix.",
        "source": "L07 HH model; L09 9:1 PDF7–8,16–17",
        "points": 1,
        "markScheme": [
          {
            "text": "Place S1–S4 in the sensor domain and identify positively charged S4 residues as voltage-sensitive charge."
          },
          {
            "text": "Place S5–S6 and the intervening P-loop in the pore domain and filter."
          },
          {
            "text": "Four subunits surround a central conducting pore; the sketch labels membrane orientation and both domains."
          },
          {
            "text": "Sensor perturbation can alter voltage-dependent opening while filter perturbation can alter permeation/selectivity; current alone may mix these effects."
          },
          {
            "text": "Macroscopic current depends on channel number, open probability, unitary conductance and driving force; HH particles are phenomenological probability variables."
          }
        ],
        "modelAnswer": [
          "Place S1–S4 in the sensor domain and identify positively charged S4 residues as voltage-sensitive charge.",
          "Place S5–S6 and the intervening P-loop in the pore domain and filter.",
          "Four subunits surround a central conducting pore; the sketch labels membrane orientation and both domains.",
          "Sensor perturbation can alter voltage-dependent opening while filter perturbation can alter permeation/selectivity; current alone may mix these effects.",
          "Macroscopic current depends on channel number, open probability, unitary conductance and driving force; HH particles are phenomenological probability variables."
        ],
        "hints": [
          {
            "body": "Separate the requested parts and identify the physical variables held fixed."
          },
          {
            "body": "State the relevant mechanism, then apply it to the stated comparison and explain a limitation."
          }
        ],
        "id": "FC03-Q2",
        "role": "explanation"
      },
      {
        "type": "multiStepCalc",
        "difficulty": "hard",
        "prompt": "A small isopotential cell receives a $60\\,\\mathrm{pA}$ step. Its steady voltage increment is $9\\,\\mathrm{mV}$ and at $8\\,\\mathrm{ms}$ it reaches half that increment. Infer resistance, time constant and capacitance. Find initial voltage slope and the ideal RC corner frequency. State the passive assumptions.",
        "source": "L01 PDF24–26; Exercise1 P2; L02 passive membrane",
        "points": 1,
        "stages": [
          {
            "title": "Input resistance",
            "answer": {
              "value": 150,
              "unit": "Mohm",
              "tolerance": 0.75
            },
            "modelAnswer": [
              "$R=\\Delta V_\\infty/I=9/60=0.15\\,\\mathrm{G\\Omega}=150\\,\\mathrm{M\\Omega}$"
            ]
          },
          {
            "title": "Time constant",
            "answer": {
              "value": 11.541560327111707,
              "unit": "ms",
              "tolerance": 0.05770780163555854
            },
            "modelAnswer": [
              "$1-e^{-8/\\tau}=0.5\\Rightarrow\\tau=8/\\ln2=11.5416\\,\\mathrm{ms}$"
            ]
          },
          {
            "title": "Capacitance",
            "answer": {
              "value": 76.94373551407804,
              "unit": "pF",
              "tolerance": 0.38471867757039024
            },
            "modelAnswer": [
              "$C=\\tau/R=11.5416\\,\\mathrm{ms}/150\\,\\mathrm{M\\Omega}=76.9437\\,\\mathrm{pF}$"
            ]
          },
          {
            "title": "Initial slope",
            "answer": {
              "value": 0.7797905781299386,
              "unit": "mV/ms",
              "tolerance": 0.003898952890649693
            },
            "modelAnswer": [
              "$\\dot V(0)=I/C=0.77979\\,\\mathrm{mV/ms}$"
            ]
          },
          {
            "title": "Corner frequency",
            "answer": {
              "value": 13.789725009540724,
              "unit": "Hz",
              "tolerance": 0.06894862504770362
            },
            "modelAnswer": [
              "$f_0=(2\\pi\\tau)^{-1}=13.7897\\,\\mathrm{Hz}$"
            ]
          }
        ],
        "modelAnswer": [
          "$R=\\Delta V_\\infty/I=9/60=0.15\\,\\mathrm{G\\Omega}=150\\,\\mathrm{M\\Omega}$",
          "$1-e^{-8/\\tau}=0.5\\Rightarrow\\tau=8/\\ln2=11.5416\\,\\mathrm{ms}$",
          "$C=\\tau/R=11.5416\\,\\mathrm{ms}/150\\,\\mathrm{M\\Omega}=76.9437\\,\\mathrm{pF}$",
          "$\\dot V(0)=I/C=0.77979\\,\\mathrm{mV/ms}$",
          "$f_0=(2\\pi\\tau)^{-1}=13.7897\\,\\mathrm{Hz}$",
          "Linear leak, constant capacitance, an isopotential cell and a resolved current step are assumed. Faster electrode artifacts must not be fitted as membrane charging."
        ],
        "methodCriteria": [
          {
            "text": "Selects the relevant relations and states their assumptions."
          },
          {
            "text": "Shows substitutions and consistent unit conversions."
          },
          {
            "text": "Carries intermediate results without cascading an earlier arithmetic error."
          },
          {
            "text": "Explains the sign, physical plausibility and requested limitation."
          }
        ],
        "hints": [
          {
            "body": "Choose relations for the stated idealized model; distinguish equilibrium, steady state and transient quantities."
          },
          {
            "body": "Begin with $R=\\Delta V_\\infty/I=9/60=0.15\\,\\mathrm{G\\Omega}$. Then find time constant, capacitance, initial slope, corner frequency. Check units and physical sign."
          }
        ],
        "id": "FC03-Q3",
        "role": "calculation"
      },
      {
        "type": "multiStepCalc",
        "difficulty": "hard",
        "prompt": "Five identical independent channels each have open probability $0.3$, unitary conductance $18\\,\\mathrm{pS}$ and reversal $+10\\,\\mathrm{mV}$ at a holding voltage of $-40\\,\\mathrm{mV}$. Find unitary current, expected open count, mean current, and probability of exactly two open channels at an instant. Explain why expected count need not be an integer.",
        "source": "L09 9:1 PDF9–10; official binomial equation p4",
        "points": 1,
        "stages": [
          {
            "title": "Unitary current",
            "answer": {
              "value": -0.9,
              "unit": "pA",
              "tolerance": 0.0045000000000000005
            },
            "modelAnswer": [
              "$i=\\gamma(V-E)=18(-50)\\times10^{-3}=-0.9\\,\\mathrm{pA}$"
            ]
          },
          {
            "title": "Expected open count",
            "answer": {
              "value": 1.5,
              "unit": "",
              "tolerance": 0.0075
            },
            "modelAnswer": [
              "$\\langle k\\rangle=Np=5(0.3)=1.5$"
            ]
          },
          {
            "title": "Ensemble mean current",
            "answer": {
              "value": -1.35,
              "unit": "pA",
              "tolerance": 0.006750000000000001
            },
            "modelAnswer": [
              "$\\langle I\\rangle=Npi=1.5(-0.9)=-1.35\\,\\mathrm{pA}$"
            ]
          },
          {
            "title": "Exactly two open",
            "answer": {
              "value": 0.3086999999999999,
              "unit": "",
              "tolerance": 0.0015434999999999997
            },
            "modelAnswer": [
              "$P(2)=\\binom52(0.3)^2(0.7)^3=0.3087$"
            ]
          }
        ],
        "modelAnswer": [
          "$i=\\gamma(V-E)=18(-50)\\times10^{-3}=-0.9\\,\\mathrm{pA}$",
          "$\\langle k\\rangle=Np=5(0.3)=1.5$",
          "$\\langle I\\rangle=Npi=1.5(-0.9)=-1.35\\,\\mathrm{pA}$",
          "$P(2)=\\binom52(0.3)^2(0.7)^3=0.3087$",
          "Each instantaneous count is an integer, while the ensemble expectation is an average across repetitions. Independence and identical probabilities are model assumptions."
        ],
        "methodCriteria": [
          {
            "text": "Selects the relevant relations and states their assumptions."
          },
          {
            "text": "Shows substitutions and consistent unit conversions."
          },
          {
            "text": "Carries intermediate results without cascading an earlier arithmetic error."
          },
          {
            "text": "Explains the sign, physical plausibility and requested limitation."
          }
        ],
        "hints": [
          {
            "body": "Choose relations for the stated idealized model; distinguish equilibrium, steady state and transient quantities."
          },
          {
            "body": "Begin with $i=\\gamma(V-E)=18(-50)\\times10^{-3}$. Then find expected open count, ensemble mean current, exactly two open. Check units and physical sign."
          }
        ],
        "id": "FC03-Q4",
        "role": "calculation"
      },
      {
        "type": "written",
        "difficulty": "medium",
        "prompt": "Plan a gating-current measurement during voltage steps. Explain how to distinguish sensor charge from ionic and linear capacitive currents, why ON and OFF transients matter, and why total charge alone cannot identify channel number without an extra assumption. No exact graph measurements are required.",
        "source": "L08 8:1 PDF15–18; L09 9:1 PDF17",
        "points": 1,
        "markScheme": [
          {
            "text": "Step command voltage from a controlled holding condition and record brief clamp transients with adequate temporal resolution."
          },
          {
            "text": "Suppress permeating ionic currents using source-supported ionic substitution/blocking controls."
          },
          {
            "text": "Subtract linear capacitance/leak contributions with matched controls; remaining nonlinear transients are candidate gating current."
          },
          {
            "text": "Integrate resolved ON and OFF components and check charge recovery under matched protocols; incomplete integration can bias charge estimates."
          },
          {
            "text": "Total charge equals effective charge per channel times functional channel number only under stated activation and charge assumptions; charge alone does not uniquely separate them."
          }
        ],
        "modelAnswer": [
          "Step command voltage from a controlled holding condition and record brief clamp transients with adequate temporal resolution.",
          "Suppress permeating ionic currents using source-supported ionic substitution/blocking controls.",
          "Subtract linear capacitance/leak contributions with matched controls; remaining nonlinear transients are candidate gating current.",
          "Integrate resolved ON and OFF components and check charge recovery under matched protocols; incomplete integration can bias charge estimates.",
          "Total charge equals effective charge per channel times functional channel number only under stated activation and charge assumptions; charge alone does not uniquely separate them."
        ],
        "hints": [
          {
            "body": "Separate the requested parts and identify the physical variables held fixed."
          },
          {
            "body": "State the relevant mechanism, then apply it to the stated comparison and explain a limitation."
          }
        ],
        "id": "FC03-Q5",
        "role": "methods"
      }
    ]
  },
  {
    "id": "full-L01-L09-04",
    "title": "Full-course mock 4: Resting voltage, geometry and regenerative signaling",
    "coverage": "Available lectures L01–L10. Focus: L01–L04 and L07–L08. L10 topic: rod sensory transduction. Estimated workload: 180 minutes (practice estimate: 20, 40, 45, 45 and 30 minutes). L11–L12 materials are pending.",
    "questions": [
      {
        "type": "written",
        "difficulty": "medium",
        "prompt": "Answer briefly: a) Why is a pump needed to maintain gradients during sustained activity? b) Why is a resting GHK voltage not generally one ion equilibrium potential? c) What does doubling cable diameter do to axial resistance per length? d) What is accommodation? e) Why can myelin increase propagation speed without necessarily shortening the membrane RC product? f) Why does a rod hyperpolarize in response to light?",
        "source": "L01 PDF34–35; L02 GHK; L03 geometry; L08 8:1 threshold and 8:2 myelin; L10 pp7–8",
        "points": 1,
        "markScheme": [
          {
            "text": "Leak and activity tend to dissipate gradients; energy-dependent transport maintains them over longer times."
          },
          {
            "text": "GHK combines species permeabilities and concentrations; zero net current does not imply zero current for each species."
          },
          {
            "text": "At fixed intracellular resistivity, cross-sectional area scales with diameter squared, so axial resistance per length falls fourfold."
          },
          {
            "text": "A slowly rising stimulus can alter gate availability and outward conductance so a previously effective threshold comparison no longer applies."
          },
          {
            "text": "Myelin reduces effective capacitance and increases resistance; their product depends on both changes, while internodal spread and nodal regeneration govern speed."
          },
          {
            "text": "Light lowers cGMP and closes cation channels while potassium efflux continues."
          }
        ],
        "modelAnswer": [
          "Leak and activity tend to dissipate gradients; energy-dependent transport maintains them over longer times.",
          "GHK combines species permeabilities and concentrations; zero net current does not imply zero current for each species.",
          "At fixed intracellular resistivity, cross-sectional area scales with diameter squared, so axial resistance per length falls fourfold.",
          "A slowly rising stimulus can alter gate availability and outward conductance so a previously effective threshold comparison no longer applies.",
          "Myelin reduces effective capacitance and increases resistance; their product depends on both changes, while internodal spread and nodal regeneration govern speed.",
          "Light lowers cGMP and closes cation channels while potassium efflux continues."
        ],
        "hints": [
          {
            "body": "Separate the requested parts and identify the physical variables held fixed."
          },
          {
            "body": "State the relevant mechanism, then apply it to the stated comparison and explain a limitation."
          }
        ],
        "id": "FC04-Q1",
        "role": "concepts"
      },
      {
        "type": "written",
        "difficulty": "medium",
        "prompt": "Explain an action potential and refractory behavior using sodium activation, sodium inactivation and delayed potassium activation. Sketch qualitative voltage and conductance time courses with labelled axes. Then explain why the same local dynamics require axial current coupling to propagate along an axon, and contrast nodal regeneration with passive internodal spread.",
        "source": "L07 gate products; L08 8:1 AP/current balance and 8:2 propagation",
        "points": 1,
        "markScheme": [
          {
            "text": "Rapid sodium activation supplies inward current that depolarizes voltage and recruits more activation, forming positive feedback."
          },
          {
            "text": "Sodium inactivation reduces inward conductance while delayed potassium activation promotes outward current and repolarization."
          },
          {
            "text": "Residual inactivation and outward conductance reduce responsiveness after a spike; recovery depends on voltage and history."
          },
          {
            "text": "Label time, voltage and sodium/potassium conductance separately and show the early sodium versus delayed potassium sequence."
          },
          {
            "text": "Axial current depolarizes adjacent membrane; unmyelinated propagation regenerates continuously whereas myelinated axons regenerate mainly at nodes with passive internodal spread."
          }
        ],
        "modelAnswer": [
          "Rapid sodium activation supplies inward current that depolarizes voltage and recruits more activation, forming positive feedback.",
          "Sodium inactivation reduces inward conductance while delayed potassium activation promotes outward current and repolarization.",
          "Residual inactivation and outward conductance reduce responsiveness after a spike; recovery depends on voltage and history.",
          "Label time, voltage and sodium/potassium conductance separately and show the early sodium versus delayed potassium sequence.",
          "Axial current depolarizes adjacent membrane; unmyelinated propagation regenerates continuously whereas myelinated axons regenerate mainly at nodes with passive internodal spread."
        ],
        "hints": [
          {
            "body": "Separate the requested parts and identify the physical variables held fixed."
          },
          {
            "body": "State the relevant mechanism, then apply it to the stated comparison and explain a limitation."
          }
        ],
        "id": "FC04-Q2",
        "role": "explanation"
      },
      {
        "type": "multiStepCalc",
        "difficulty": "hard",
        "prompt": "Use the $20\\,^{\\circ}\\mathrm C$ GHK logarithmic shortcut $58\\log_{10}$ in millivolts for monovalent ions. Potassium inside/outside is $130/6$, sodium $12/145$, chloride $8/115$, all in millimolar. Relative permeabilities are $1:0.04:0.2$ for potassium:sodium:chloride. Calculate weighted numerator and denominator, their ratio and voltage. Recalculate voltage if sodium permeability rises to $0.12$, holding all concentrations fixed. Explain the chloride orientation.",
        "source": "L02 GHK; L01 Nernst shortcut; official sheet p4",
        "points": 1,
        "stages": [
          {
            "title": "Weighted numerator",
            "answer": {
              "value": 13.4,
              "unit": "mM",
              "tolerance": 0.067
            },
            "modelAnswer": [
              "$A=1(6)+0.04(145)+0.2(8)=13.4\\,\\mathrm{mM}$"
            ]
          },
          {
            "title": "Weighted denominator",
            "answer": {
              "value": 153.48,
              "unit": "mM",
              "tolerance": 0.7674
            },
            "modelAnswer": [
              "$B=1(130)+0.04(12)+0.2(115)=153.48\\,\\mathrm{mM}$"
            ]
          },
          {
            "title": "Initial ratio",
            "answer": {
              "value": 0.0873077925462601,
              "unit": "",
              "tolerance": 0.00043653896273130054
            },
            "modelAnswer": [
              "$A/B=13.4/153.48=0.0873078$"
            ]
          },
          {
            "title": "Initial resting voltage",
            "answer": {
              "value": -61.418925545365326,
              "unit": "mV",
              "tolerance": 0.30709462772682666
            },
            "modelAnswer": [
              "$V_1=58\\log_{10}(13.4/153.48)=-61.41893\\,\\mathrm{mV}$"
            ]
          },
          {
            "title": "Raised sodium permeability voltage",
            "answer": {
              "value": -45.867547488238486,
              "unit": "mV",
              "tolerance": 0.22933773744119243
            },
            "modelAnswer": [
              "$V_2=58\\log_{10}[(6+0.12(145)+1.6)/(130+0.12(12)+23)]=-45.86755\\,\\mathrm{mV}$"
            ]
          }
        ],
        "modelAnswer": [
          "$A=1(6)+0.04(145)+0.2(8)=13.4\\,\\mathrm{mM}$",
          "$B=1(130)+0.04(12)+0.2(115)=153.48\\,\\mathrm{mM}$",
          "$A/B=13.4/153.48=0.0873078$",
          "$V_1=58\\log_{10}(13.4/153.48)=-61.41893\\,\\mathrm{mV}$",
          "$V_2=58\\log_{10}[(6+0.12(145)+1.6)/(130+0.12(12)+23)]=-45.86755\\,\\mathrm{mV}$",
          "Chloride concentrations enter opposite sides to cations because its charge is negative. Increased sodium permeability depolarizes this steady zero-net-current model; it is not a dynamic AP simulation."
        ],
        "methodCriteria": [
          {
            "text": "Selects the relevant relations and states their assumptions."
          },
          {
            "text": "Shows substitutions and consistent unit conversions."
          },
          {
            "text": "Carries intermediate results without cascading an earlier arithmetic error."
          },
          {
            "text": "Explains the sign, physical plausibility and requested limitation."
          }
        ],
        "hints": [
          {
            "body": "Choose relations for the stated idealized model; distinguish equilibrium, steady state and transient quantities."
          },
          {
            "body": "Begin with $A=1(6)+0.04(145)+0.2(8)$. Then find weighted denominator, initial ratio, initial resting voltage, raised sodium permeability voltage. Check units and physical sign."
          }
        ],
        "id": "FC04-Q3",
        "role": "calculation"
      },
      {
        "type": "multiStepCalc",
        "difficulty": "hard",
        "prompt": "Two passive unmyelinated cables differ only in diameter: cable B has three times the diameter of A. For A, length constant is $0.4\\,\\mathrm{mm}$, membrane time constant is $10\\,\\mathrm{ms}$ and two-sided infinite-cable input resistance is $120\\,\\mathrm{M}\\Omega$. Find B length constant, time constant, input resistance and source voltage increment for $50\\,\\mathrm{pA}$. Compare characteristic passive speeds.",
        "source": "L03 geometry/scaling; L04 Exercise4 P2; official sheet p4",
        "points": 1,
        "stages": [
          {
            "title": "B length constant",
            "answer": {
              "value": 0.6928203230275509,
              "unit": "mm",
              "tolerance": 0.0034641016151377548
            },
            "modelAnswer": [
              "$\\lambda_B=\\lambda_A\\sqrt3=0.692820\\,\\mathrm{mm}$"
            ]
          },
          {
            "title": "B time constant",
            "answer": {
              "value": 10,
              "unit": "ms",
              "tolerance": 0.05
            },
            "modelAnswer": [
              "$\\tau_B=R_mC_m=\\tau_A=10\\,\\mathrm{ms}$"
            ]
          },
          {
            "title": "B input resistance",
            "answer": {
              "value": 23.09401076758503,
              "unit": "Mohm",
              "tolerance": 0.11547005383792515
            },
            "modelAnswer": [
              "$R_{in,B}=R_{in,A}3^{-3/2}=23.0940\\,\\mathrm{M\\Omega}$"
            ]
          },
          {
            "title": "B origin voltage",
            "answer": {
              "value": 1.1547005383792515,
              "unit": "mV",
              "tolerance": 0.005773502691896257
            },
            "modelAnswer": [
              "$\\Delta V_B=IR_{in,B}=50(23.0940)10^{-3}=1.15470\\,\\mathrm{mV}$"
            ]
          },
          {
            "title": "Speed ratio",
            "answer": {
              "value": 1.7320508075688772,
              "unit": "",
              "tolerance": 0.008660254037844387
            },
            "modelAnswer": [
              "$\\theta_B/\\theta_A=(\\lambda_B/\\lambda_A)(\\tau_A/\\tau_B)=\\sqrt3=1.73205$"
            ]
          }
        ],
        "modelAnswer": [
          "$\\lambda_B=\\lambda_A\\sqrt3=0.692820\\,\\mathrm{mm}$",
          "$\\tau_B=R_mC_m=\\tau_A=10\\,\\mathrm{ms}$",
          "$R_{in,B}=R_{in,A}3^{-3/2}=23.0940\\,\\mathrm{M\\Omega}$",
          "$\\Delta V_B=IR_{in,B}=50(23.0940)10^{-3}=1.15470\\,\\mathrm{mV}$",
          "$\\theta_B/\\theta_A=(\\lambda_B/\\lambda_A)(\\tau_A/\\tau_B)=\\sqrt3=1.73205$",
          "The two-sided source geometry is unchanged, so the input-resistance ratio is valid. The passive characteristic speed is not a measured active conduction velocity."
        ],
        "methodCriteria": [
          {
            "text": "Selects the relevant relations and states their assumptions."
          },
          {
            "text": "Shows substitutions and consistent unit conversions."
          },
          {
            "text": "Carries intermediate results without cascading an earlier arithmetic error."
          },
          {
            "text": "Explains the sign, physical plausibility and requested limitation."
          }
        ],
        "hints": [
          {
            "body": "Choose relations for the stated idealized model; distinguish equilibrium, steady state and transient quantities."
          },
          {
            "body": "Begin with $\\lambda_B=\\lambda_A\\sqrt3$. Then find b time constant, b input resistance, b origin voltage, speed ratio. Check units and physical sign."
          }
        ],
        "id": "FC04-Q4",
        "role": "calculation"
      },
      {
        "type": "written",
        "difficulty": "medium",
        "prompt": "In a paired-pulse current-clamp study the second response fails at a short interval but returns after a longer interval. Design controls and explain what this can say about refractoriness. Compare a slow ramp with a fast step and distinguish accommodation from loss of stimulus delivery. Explain why a single failed response does not locate a molecular defect.",
        "source": "L08 8:1 Noble/threshold/history; L07 gating; L01 recording modes",
        "points": 1,
        "markScheme": [
          {
            "text": "Control baseline voltage, pulse amplitude/duration and the actual injected waveform; vary only the interpulse interval in the first comparison."
          },
          {
            "text": "Recovery of sodium availability and decay of potassium activation can restore excitability at longer intervals."
          },
          {
            "text": "Use a matched fast step and slow ramp to test stimulus-rate dependence; a slow ramp permits state changes before strong depolarization."
          },
          {
            "text": "Check delivery, recording stability and repeated trials before assigning a failed spike to accommodation or refractoriness."
          },
          {
            "text": "Multiple gate and conductance changes can produce failure; the waveform alone cannot uniquely locate a channel mutation or establish an individual mechanism."
          }
        ],
        "modelAnswer": [
          "Control baseline voltage, pulse amplitude/duration and the actual injected waveform; vary only the interpulse interval in the first comparison.",
          "Recovery of sodium availability and decay of potassium activation can restore excitability at longer intervals.",
          "Use a matched fast step and slow ramp to test stimulus-rate dependence; a slow ramp permits state changes before strong depolarization.",
          "Check delivery, recording stability and repeated trials before assigning a failed spike to accommodation or refractoriness.",
          "Multiple gate and conductance changes can produce failure; the waveform alone cannot uniquely locate a channel mutation or establish an individual mechanism."
        ],
        "hints": [
          {
            "body": "Separate the requested parts and identify the physical variables held fixed."
          },
          {
            "body": "State the relevant mechanism, then apply it to the stated comparison and explain a limitation."
          }
        ],
        "id": "FC04-Q5",
        "role": "methods"
      }
    ]
  },
  {
    "id": "full-L01-L09-05",
    "title": "Full-course mock 5: Conductance inference and measurement limits",
    "coverage": "Available lectures L01–L10. Focus: L01–L02 and L06–L09; no provisional clinical claims. L10 topic: binomial and Poisson quantal release. Estimated workload: 180 minutes (practice estimate: 20, 40, 45, 45 and 30 minutes). L11–L12 materials are pending.",
    "questions": [
      {
        "type": "written",
        "difficulty": "medium",
        "prompt": "In short responses: a) Distinguish chord and slope conductance. b) Why can rectification occur without a changing number of open channels? c) How does sodium inactivation differ from reversal of its driving force? d) Why does a smaller ensemble current not uniquely imply fewer channels? e) Distinguish voltage clamp and current clamp. f) When does Poisson approximate binomial release, and what does a failure represent?",
        "source": "L02 current–voltage; L06 nonlinearities; L07 inactivation; L09 9:1 PDF10; L10 pp32–35",
        "points": 1,
        "markScheme": [
          {
            "text": "Chord conductance is current divided by voltage minus reversal; slope conductance is the local derivative of current with voltage."
          },
          {
            "text": "Asymmetric concentrations or permeation barriers can make the open-path current–voltage relation nonlinear."
          },
          {
            "text": "Inactivation reduces availability; driving-force reversal changes current sign when voltage crosses the reversal potential."
          },
          {
            "text": "Mean current combines number, opening probability, unitary conductance and driving force, so each must be controlled for number inference."
          },
          {
            "text": "Voltage clamp controls voltage and measures balancing current; current clamp controls injected current and measures voltage."
          },
          {
            "text": "Poisson approximates binomial release for many sites with small release probability at a given mean. A failure is zero released quanta."
          }
        ],
        "modelAnswer": [
          "Chord conductance is current divided by voltage minus reversal; slope conductance is the local derivative of current with voltage.",
          "Asymmetric concentrations or permeation barriers can make the open-path current–voltage relation nonlinear.",
          "Inactivation reduces availability; driving-force reversal changes current sign when voltage crosses the reversal potential.",
          "Mean current combines number, opening probability, unitary conductance and driving force, so each must be controlled for number inference.",
          "Voltage clamp controls voltage and measures balancing current; current clamp controls injected current and measures voltage.",
          "Poisson approximates binomial release for many sites with small release probability at a given mean. A failure is zero released quanta."
        ],
        "hints": [
          {
            "body": "Separate the requested parts and identify the physical variables held fixed."
          },
          {
            "body": "State the relevant mechanism, then apply it to the stated comparison and explain a limitation."
          }
        ],
        "id": "FC05-Q1",
        "role": "concepts"
      },
      {
        "type": "written",
        "difficulty": "medium",
        "prompt": "Two preparations have the same peak sodium current but one has a longer-lasting inward tail during a depolarizing step. Explain why equal peak amplitude does not establish equal channel number or inactivation kinetics. Sketch normal and slower-decaying current with labelled axes, holding potential and test step. Propose a recovery protocol and explain its interpretation limits.",
        "source": "L07 PDF18–22 gate/clamp inference; L09 9:1 PDF10,16–17",
        "points": 1,
        "markScheme": [
          {
            "text": "Equal peak current constrains a product of number, unitary conductance, activation, availability and driving force, not each factor."
          },
          {
            "text": "A longer decay is consistent with altered inactivation but other current components or protocol differences must be excluded."
          },
          {
            "text": "Sketch time and signed current axes, an inward negative trace, and matched voltage command/holding conditions with a slower-decaying comparison."
          },
          {
            "text": "Use a conditioning pulse, varied recovery intervals at a defined voltage and a matched test pulse to measure recovered availability."
          },
          {
            "text": "Normalize with suitable controls and separate leak/other currents; neither the peak nor recovery alone identifies a unique molecular structure or a full disease mechanism."
          }
        ],
        "modelAnswer": [
          "Equal peak current constrains a product of number, unitary conductance, activation, availability and driving force, not each factor.",
          "A longer decay is consistent with altered inactivation but other current components or protocol differences must be excluded.",
          "Sketch time and signed current axes, an inward negative trace, and matched voltage command/holding conditions with a slower-decaying comparison.",
          "Use a conditioning pulse, varied recovery intervals at a defined voltage and a matched test pulse to measure recovered availability.",
          "Normalize with suitable controls and separate leak/other currents; neither the peak nor recovery alone identifies a unique molecular structure or a full disease mechanism."
        ],
        "hints": [
          {
            "body": "Separate the requested parts and identify the physical variables held fixed."
          },
          {
            "body": "State the relevant mechanism, then apply it to the stated comparison and explain a limitation."
          }
        ],
        "id": "FC05-Q2",
        "role": "explanation"
      },
      {
        "type": "multiStepCalc",
        "difficulty": "hard",
        "prompt": "At a fixed test voltage of $-25\\,\\mathrm{mV}$, an isolated current with reversal $+35\\,\\mathrm{mV}$ relaxes from $-90$ to $-330\\,\\mathrm{pA}$. At $6\\,\\mathrm{ms}$ it is $-241.709\\,\\mathrm{pA}$ (ideal model data, not a graph reading). Infer initial and final chord conductances and the relaxation time constant. Then find steady current at $-5\\,\\mathrm{mV}$ if that final conductance and reversal remain unchanged. State why this last assumption is a separate test.",
        "source": "L06 Exercise6 and kinetics; L02 chord conductance; L07 clamp inference",
        "points": 1,
        "stages": [
          {
            "title": "Initial chord conductance",
            "answer": {
              "value": 1.5,
              "unit": "nS",
              "tolerance": 0.0075
            },
            "modelAnswer": [
              "$g_0=I_0/(V-E)=(-90)/(-60)=1.5\\,\\mathrm{nS}$"
            ]
          },
          {
            "title": "Final chord conductance",
            "answer": {
              "value": 5.5,
              "unit": "nS",
              "tolerance": 0.0275
            },
            "modelAnswer": [
              "$g_\\infty=(-330)/(-60)=5.5\\,\\mathrm{nS}$"
            ]
          },
          {
            "title": "Relaxation time constant",
            "answer": {
              "value": 5.999995522913609,
              "unit": "ms",
              "tolerance": 0.029999977614568043
            },
            "modelAnswer": [
              "$\\tau=-t/\\ln[(I(t)-I_\\infty)/(I_0-I_\\infty)]=6.000\\,\\mathrm{ms}$"
            ]
          },
          {
            "title": "Current at new driving force",
            "answer": {
              "value": -220,
              "unit": "pA",
              "tolerance": 1.1
            },
            "modelAnswer": [
              "$I=5.5[-5-(35)]=-220\\,\\mathrm{pA}$"
            ]
          }
        ],
        "modelAnswer": [
          "$g_0=I_0/(V-E)=(-90)/(-60)=1.5\\,\\mathrm{nS}$",
          "$g_\\infty=(-330)/(-60)=5.5\\,\\mathrm{nS}$",
          "$\\tau=-t/\\ln[(I(t)-I_\\infty)/(I_0-I_\\infty)]=6.000\\,\\mathrm{ms}$",
          "$I=5.5[-5-(35)]=-220\\,\\mathrm{pA}$",
          "The negative current is inward. Conductance may itself change with voltage, so moving voltage while keeping it fixed requires a rapid instantaneous protocol or an explicit model assumption."
        ],
        "methodCriteria": [
          {
            "text": "Selects the relevant relations and states their assumptions."
          },
          {
            "text": "Shows substitutions and consistent unit conversions."
          },
          {
            "text": "Carries intermediate results without cascading an earlier arithmetic error."
          },
          {
            "text": "Explains the sign, physical plausibility and requested limitation."
          }
        ],
        "hints": [
          {
            "body": "Choose relations for the stated idealized model; distinguish equilibrium, steady state and transient quantities."
          },
          {
            "body": "Begin with $g_0=I_0/(V-E)=(-90)/(-60)$. Then find final chord conductance, relaxation time constant, current at new driving force. Check units and physical sign."
          }
        ],
        "id": "FC05-Q3",
        "role": "calculation"
      },
      {
        "type": "multiStepCalc",
        "difficulty": "hard",
        "prompt": "At a single instant an isopotential HH membrane has $m=0.5$, $h=0.4$, $n=0.6$, maximal sodium/potassium conductances $80/25\\,\\mathrm{nS}$, reversal voltages $+50/-80\\,\\mathrm{mV}$ and membrane voltage $-30\\,\\mathrm{mV}$. Leak conductance is $2\\,\\mathrm{nS}$ with reversal $-60\\,\\mathrm{mV}$. Applied inward current is $30\\,\\mathrm{pA}$ and capacitance is $20\\,\\mathrm{pF}$. Find both gated conductances, each ionic current, their sum and instantaneous voltage slope. Use outward-positive ionic current.",
        "source": "L07 HH products; L08 8:1 current balance; official sheet p4",
        "points": 1,
        "stages": [
          {
            "title": "Sodium conductance",
            "answer": {
              "value": 4,
              "unit": "nS",
              "tolerance": 0.02
            },
            "modelAnswer": [
              "$g_{Na}=80(0.5)^3(0.4)=4\\,\\mathrm{nS}$"
            ]
          },
          {
            "title": "Potassium conductance",
            "answer": {
              "value": 3.24,
              "unit": "nS",
              "tolerance": 0.016200000000000003
            },
            "modelAnswer": [
              "$g_K=25(0.6)^4=3.24\\,\\mathrm{nS}$"
            ]
          },
          {
            "title": "Sodium current",
            "answer": {
              "value": -320,
              "unit": "pA",
              "tolerance": 1.6
            },
            "modelAnswer": [
              "$I_{Na}=4(-30-50)=-320\\,\\mathrm{pA}$"
            ]
          },
          {
            "title": "Potassium current",
            "answer": {
              "value": 162,
              "unit": "pA",
              "tolerance": 0.81
            },
            "modelAnswer": [
              "$I_K=3.24(-30+80)=162\\,\\mathrm{pA}$"
            ]
          },
          {
            "title": "Leak current",
            "answer": {
              "value": 60,
              "unit": "pA",
              "tolerance": 0.3
            },
            "modelAnswer": [
              "$I_L=2(-30+60)=60\\,\\mathrm{pA}$"
            ]
          },
          {
            "title": "Net ionic current",
            "answer": {
              "value": -98,
              "unit": "pA",
              "tolerance": 0.49
            },
            "modelAnswer": [
              "$\\sum I_i=-320+162+60=-98\\,\\mathrm{pA}$"
            ]
          },
          {
            "title": "Instantaneous voltage slope",
            "answer": {
              "value": 6.4,
              "unit": "mV/ms",
              "tolerance": 0.032
            },
            "modelAnswer": [
              "$\\dot V=(I_{app}-\\sum I_i)/C=[30-(-98)]/20=6.4\\,\\mathrm{mV/ms}$"
            ]
          }
        ],
        "modelAnswer": [
          "$g_{Na}=80(0.5)^3(0.4)=4\\,\\mathrm{nS}$",
          "$g_K=25(0.6)^4=3.24\\,\\mathrm{nS}$",
          "$I_{Na}=4(-30-50)=-320\\,\\mathrm{pA}$",
          "$I_K=3.24(-30+80)=162\\,\\mathrm{pA}$",
          "$I_L=2(-30+60)=60\\,\\mathrm{pA}$",
          "$\\sum I_i=-320+162+60=-98\\,\\mathrm{pA}$",
          "$\\dot V=(I_{app}-\\sum I_i)/C=[30-(-98)]/20=6.4\\,\\mathrm{mV/ms}$",
          "The positive slope is depolarizing. Gates change with voltage and time, so this snapshot cannot determine the complete action-potential trajectory."
        ],
        "methodCriteria": [
          {
            "text": "Selects the relevant relations and states their assumptions."
          },
          {
            "text": "Shows substitutions and consistent unit conversions."
          },
          {
            "text": "Carries intermediate results without cascading an earlier arithmetic error."
          },
          {
            "text": "Explains the sign, physical plausibility and requested limitation."
          }
        ],
        "hints": [
          {
            "body": "Choose relations for the stated idealized model; distinguish equilibrium, steady state and transient quantities."
          },
          {
            "body": "Begin with $g_{Na}=80(0.5)^3(0.4)$. Then find potassium conductance, sodium current, potassium current, leak current, net ionic current, instantaneous voltage slope. Check units and physical sign."
          }
        ],
        "id": "FC05-Q4",
        "role": "calculation"
      },
      {
        "type": "written",
        "difficulty": "medium",
        "prompt": "A voltage-clamp transient becomes smaller after an intervention. Plan an analysis to distinguish reduced capacitance, reduced sensor charge and reduced ionic current. Specify subtraction/integration, holding and step controls, finite-window limitations and at least one ambiguity that remains. Do not infer a numerical membrane area from an uncalibrated image.",
        "source": "L01 capacitance; L07 clamp separation; L08 8:1 PDF15–18; Exercise8",
        "points": 1,
        "markScheme": [
          {
            "text": "Match holding voltage, step size, timing and baseline; distinguish a rapid capacitive component from slower ionic contributions."
          },
          {
            "text": "Use appropriate ionic suppression and leak/linear-capacitance subtraction to isolate candidate sensor current."
          },
          {
            "text": "For a resolved linear transient integrate corrected current and divide charge by voltage step to estimate capacitance."
          },
          {
            "text": "Check integration duration and ON/OFF recovery; incomplete capture or imperfect subtraction can mimic a smaller charge."
          },
          {
            "text": "Sensor charge also depends on activation and channel number, and inferred area needs a justified specific capacitance; a smaller raw transient alone does not identify its cause."
          }
        ],
        "modelAnswer": [
          "Match holding voltage, step size, timing and baseline; distinguish a rapid capacitive component from slower ionic contributions.",
          "Use appropriate ionic suppression and leak/linear-capacitance subtraction to isolate candidate sensor current.",
          "For a resolved linear transient integrate corrected current and divide charge by voltage step to estimate capacitance.",
          "Check integration duration and ON/OFF recovery; incomplete capture or imperfect subtraction can mimic a smaller charge.",
          "Sensor charge also depends on activation and channel number, and inferred area needs a justified specific capacitance; a smaller raw transient alone does not identify its cause."
        ],
        "hints": [
          {
            "body": "Separate the requested parts and identify the physical variables held fixed."
          },
          {
            "body": "State the relevant mechanism, then apply it to the stated comparison and explain a limitation."
          }
        ],
        "id": "FC05-Q5",
        "role": "methods"
      }
    ]
  }
];
