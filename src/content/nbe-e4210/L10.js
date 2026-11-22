import { registry } from './registry.js';

const block = body => ({ type: 'text', body: `<p>${body}</p>` });
const detail = (title, body) => ({ type: 'detail', title, body: `<p>${body}</p>` });
const steps = (title, ...steps) => ({ type: 'steps', title, steps });
const options = rows => rows.map(([text, feedback]) => ({ text, feedback }));
const items = rows => rows.map(([text, answer, explanation]) => ({ text, answer, explanation }));
const statements = rows => rows.map(([statement, answer, reason]) =>
  ({ statement, answer, [answer ? 'justification' : 'correction']: reason }));
const selections = rows => rows.map(([text, correct, feedback]) => ({ text, correct, feedback }));

// Original schematics. All positions represent relationships, not measured quantities.
function diagram(id, caption, labels, description, hideLabels = false) {
  const height = 72 * labels.length;
  const regions = labels.map(([label, body], i) => ({
    id: `${id}-${i + 1}`, label, body, explanation: body, x: 50,
    y: (36 + 72 * i) / height * 100, mx: 15, my: (36 + 72 * i) / height * 100, w: 78, h: 44 / height * 100, shape: 'rect',
  }));
  const nodes = labels.map(([label], i) => {
    const y = 36 + i * 72;
    return `<rect x="40" y="${y - 22}" width="280" height="44" rx="8" fill="#e5eff3" stroke="#5a7b8a"/>
      ${hideLabels ? '' : `<text x="180" y="${y + 6}" text-anchor="middle">${label}</text>`}
      ${i < labels.length - 1 ? `<path d="M180 ${y + 23}v22m-5-5 5 5 5-5" fill="none" stroke="#315866" stroke-width="2"/>` : ''}`;
  });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 ${height}" font-family="system-ui,sans-serif" font-size="16" fill="#193545">
    <rect width="360" height="${height}" rx="10" fill="#f7fafb"/>${nodes.join('')}</svg>`;
  return {
    type: 'widget', name: 'image-hotspots', caption, fallbackAlt: description,
    props: { src: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`, alt: description,
      aspect: 360 / height, regions, quiz: false, layout: 'stack' },
  };
}
const figure = visual => ({ type: 'figure', visual });
const visualRoute = [
  ['Retinal ganglion cell', 'Its axon projects from the retina toward the thalamus.'],
  ['Lateral geniculate nucleus', 'LGN relay neurons send axons through the optic radiation.'],
  ['Striate cortex, layer IV', 'Geniculate input terminates in a specific layer and follows retinotopic order.'],
];
const unlabelledRoute = diagram('route-quiz', 'Three stations in the visual route, from input toward cortex.',
  visualRoute, 'Three blank boxes form a descending sequence.', true);
const population = {
  type: 'svg',
  fallbackAlt: 'Condition A is concentrated in the middle of the ocular dominance scale. Condition B is concentrated at the two ends.',
  caption: 'Qualitative ocular dominance distributions. The horizontal axis runs from one eye only through binocular to the other eye only. Vertical extent represents relative prevalence. No measured counts are shown.',
  markup: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 220" width="340" height="220" style="display:block;width:100%;max-width:340px;height:auto;margin:auto" font-family="system-ui" font-size="13" fill="#193545">
    <rect width="340" height="220" rx="10" fill="#f7fafb"/>
    <path d="M75 25v61h230M75 103v61h230" fill="none" stroke="#315866"/>
    <path d="M89 81Q142 76 169 46Q190 16 214 46Q241 76 292 81M89 112Q125 154 181 158Q244 156 292 112" fill="none" stroke="#1b6782" stroke-width="3"/>
    <text x="23" y="55">A</text><text x="23" y="134">B</text>
    <text x="75" y="188">One eye</text><text x="165" y="188">Binocular</text><text x="245" y="188">Other eye</text>
    <text x="190" y="208" text-anchor="middle">Ocular dominance</text>
  </svg>`,
};
const concept = (id, prompt, correct, rows) => [id, [{ id: `l10-c-${id}`, prompt, correct, options: options(rows) }]];
const conceptChecks = new Map([
  concept('initial-wiring', 'Which structure relays retinal output to striate cortex?', 1, [
    ['Colliculus in the midbrain', 'The superior colliculus is a different retinal target.'],
    ['Lateral geniculate nucleus', 'The LGN is the thalamic relay in this pathway.'],
    ['Primary visual cortex (V1)', 'Striate cortex receives the LGN projection.'],
  ]),
  concept('precursors', 'Where does cleavage occur in the proliferation diagram?', 0, [
    ['At the ventricular surface', 'The precursor nucleus returns here for mitosis.'],
    ['At the outer pial surface', 'The nucleus moves toward the pia during DNA replication, then returns to the ventricle to divide.'],
    ['In the settling cortical plate', 'The diagram places precursor division in the ventricular zone.'],
  ]),
  concept('migration', 'Which population receives the early thalamocortical input shown in the deck?', 2, [
    ['Dividing ventricular precursors', 'Ventricular precursors supply developing neurons.'],
    ['Late layer II cortical neurons', 'The outer layer II cohort settles later.'],
    ['Transient subplate neurons', 'The subplate is an early recipient of thalamic input.'],
  ]),
  concept('differentiation', 'Which observation describes differentiation?', 1, [
    ['A neuroblast travels along radial glia', 'This is movement toward a destination.'],
    ['A neuron develops its apical dendrite', 'The neuron is acquiring a specialised form.'],
    ['A young cell passes an older cohort', 'This is a step in inside-out migration.'],
  ]),
  concept('guidance', 'Selecting the cells to contact within the LGN is which decision?', 0, [
    ['Address selection', 'The axon is choosing cells within a target.'],
    ['Pathway selection', 'Pathway selection concerns the route taken.'],
    ['Target selection', 'Target selection concerns the destination structure.'],
  ]),
  concept('synaptogenesis', 'Which component accumulates on the receiving side of the new synapse?', 2, [
    ['Transmitter storage vesicles', 'Vesicles collect on the transmitting side.'],
    ['Presynaptic active-zone proteins', 'These proteins organise the release site on the transmitting side.'],
    ['Neurotransmitter receptors', 'Receptors on the receiving side detect the released transmitter.'],
  ]),
  concept('reduction', 'Which event is apoptosis?', 1, [
    ['Withdrawal of one input branch', 'A branch can disappear while the neuron survives.'],
    ['Programmed death of a neuron', 'Apoptosis eliminates the cell itself.'],
    ['Rearrangement of retained inputs', 'Rearrangement changes the pattern of connections.'],
  ]),
  concept('segregation', 'Where are the eye-dominated stripes discussed here?', 2, [
    ['In layer II of striate cortex', 'The stripes on the slide reflect geniculate wiring into layer IV.'],
    ['In layer III of striate cortex', 'Layer III is used later to discuss binocular convergence.'],
    ['In layer IV of striate cortex', 'Geniculate inputs segregate into eye-dominated stripes there.'],
  ]),
  concept('deprivation', 'Which eye gains cortical territory after early long-term monocular deprivation?', 0, [
    ['The eye that stays open', 'Its cortical input territory expands in the layer IV example.'],
    ['The eye that was closed', 'Deprived-eye inputs lose territory in the illustrated comparison.'],
    ['Both eyes to the same extent', 'The result reflects an imbalance in available visual experience.'],
  ]),
  concept('amblyopia', 'What did the human comparison show about added fluoxetine?', 1, [
    ['It selectively restored cortical stripes', 'The trial measured visual performance, not restoration of stripes.'],
    ['It showed no added acuity benefit', 'Acuity improved without a demonstrated advantage over placebo.'],
    ['It prevented gains from the training', 'The comparison did not demonstrate prevention of training gains.'],
  ]),
  concept('plasticity', 'What relieves the NMDA receptor magnesium block in the illustrated mechanism?', 2, [
    ['Release of glutamate by itself', 'At resting voltage glutamate can bind while the pore remains blocked.'],
    ['Removal of surface AMPA receptors', 'Receptor removal can be downstream of LTD-inducing activity.'],
    ['Sufficient postsynaptic depolarisation', 'Depolarisation displaces the magnesium block.'],
  ]),
]);

const sourceFigure = (name, slide, aspect, description, anchors) => {
  const src = new URL(`../../assets/figures/nbe-e4210/L10/${name}.webp`, import.meta.url).href;
  return figure({
    type: 'widget', name: 'image-hotspots',
    caption: `L10 slide ${slide}. ${description}`, fallbackAlt: description, sourceImage: src,
    props: {
      src, alt: description, aspect, quiz: false,
      layout: ['stimulation', 'dominance-histogram'].includes(name) ? 'stack' : 'side',
      intro: 'Use the markers to locate features in the figure.',
      regions: anchors.map(([label, x, y], index) => ({ id: `${name}-${index + 1}`, label, x, y })),
    },
  });
};

const optionalFigure = (title, visual) => ({ type: 'detail', title, blocks: [visual] });

const parts = [
  ['Building the cortex', 'initial-wiring'],
  ['Specialisation and guidance', 'differentiation'],
  ['Assembly, survival and pruning', 'growing-axon'],
  ['Activity and eye competition', 'segregation'],
  ['Gating and reopening plasticity', 'neuromodulation'],
  ['Synaptic mechanisms and closure', 'plasticity'],
];

const topics = [
  ['initial-wiring', 'Wiring the visual pathway', [
    block('Retinal ganglion cells send axons through the optic nerves to the chiasm, where nasal retinal fibres cross and temporal fibres stay on the same side. The optic tract leads to the lateral geniculate nucleus (LGN). Its relay axons continue in the optic radiation to layer IV of striate cortex (area 17).'),
    block('The LGN sorts inputs by eye and ganglion-cell class and preserves neighbourhoods in visual space. Genetic cues lay out the initial wiring. Spontaneous activity and visual experience refine it.'),
    sourceFigure('visual-pathway', 5, 1.62, 'Follow ganglion-cell axons through the chiasm to the LGN and then to area 17.', [
      ['Optic chiasm', 55, 70], ['LGN', 76, 63], ['Layer IV', 87, 24],
    ]),
  ]],
  ['precursors', 'Cell proliferation', [
    block('The early wall has a ventricular zone beside the ventricle and a marginal zone beside the pia. Radial glial cells can act as neural stem cells. In the slide model, early vertical cleavage expands the precursor pool symmetrically. Later horizontal cleavage can produce one migrating daughter and one daughter that divides again.'),
    block('Slide 10 assigns Notch-1 to the departing daughter and Numb to the daughter that stays. These proteins regulate cell fate upstream of gene expression. The departing daughter’s fate also depends on precursor age, position in the ventricular zone and local signals at division.'),
    sourceFigure('cleavage', 8, 960 / 730, 'The numbered positions trace precursor nuclear movement. Panels b and c compare vertical and horizontal cleavage.', [
      ['Nuclear movement', 31, 19], ['Vertical cleavage', 72, 31], ['Horizontal cleavage', 71, 88],
    ]),
    detail('Five positions and precursor origins', '1. Extend a process toward the pia. 2. Move the nucleus outward as DNA replicates. 3. Return the nucleus to the ventricular surface. 4. Retract the process. 5. Divide at the ventricular surface. Dorsal precursors give rise to many cortical excitatory neurons. Many cortical inhibitory interneurons originate ventrally. See slides 8–11 and Bear pp. 786–789.'),
  ]],
  ['migration', 'Migration, inside out', [
    block('Many neuroblasts, or immature neurons, migrate along radial glial fibres. Slide 14 illustrates a tangential route for roughly one third. The earliest arrivals form the subplate. Within the cortical plate, the sequence is VI → V → IV → III → II. Later cohorts pass earlier ones to settle closer to the surface.'),
    sourceFigure('inside-out', 14, 1301 / 893, 'Successive cohorts build the cortical plate from deep to superficial.', [
      ['Early subplate', 7, 47], ['First deep cohort', 38, 41], ['Later superficial cohorts', 78, 17],
    ]),
  ], null],
  ['subplate', 'The subplate', [
    block('The transient subplate receives the first thalamocortical input. Its glutamatergic and GABAergic neurons communicate through electrical and chemical synapses, including with distant partners. The early circuit contributes to cortical activity, wiring and plasticity.'),
    detail('Transient layer in the deck', 'Slide 15 depicts the layer disappearing as development proceeds. Slides 17–20 show early human and mouse cortex, thalamocortical radiations and vulnerability to hypoxia–ischemia.'),
  ], 'migration'],
  ['differentiation', 'Differentiation', [
    block('Migration places the cell where it can join the right circuit. Differentiation equips it with the specialised shape, processes and signalling properties it needs to function there, so reaching the right layer satisfies only the first requirement. HW5 2(b), slide 21 and Bear pp. 788–790.'),
    block('Differentiation begins at the transition from precursor to neuroblast and continues in the cortical plate. In the slide’s sequence, neurons appear before astrocytes, then oligodendrocytes. Marginal-zone semaphorin 3A attracts the apical dendrite and repels the axon.'),
    sourceFigure('differentiation', 21, 649 / 632, 'A differentiating neuron polarises its processes in response to a local cue.', [
      ['Apical dendrite', 51, 31], ['Extending axon', 50, 87],
    ]),
  ]],
  ['adult-neurogenesis', 'Adult neurogenesis', [
    block('Slides 22–24 report increased adult neurogenesis with enrichment and running in animal studies. They link higher neurogenesis with better hippocampus-dependent memory performance by correlation. The macaque example reports new neurons in association cortex and gives primary sensory cortex as a contrast.'),
    detail('Other links mentioned in the lecture', 'The slides discuss learning, memory, executive function and behavioural inhibition, and report suppression by stress and sleep loss. They also mention possible links to schizophrenia, depression and Alzheimer’s disease. These are contextual claims whose strength varies by species, region and study.'),
  ]],
  ['guidance', 'Genesis of connections', [
    {
      type: 'compare', title: 'Three choices for a growing retinal axon',
      rowLabel: 'Selection', columns: ['Decision', 'Example'],
      rows: [
        { label: 'Pathway', cells: ['Which route?', 'Choose the appropriate path at the chiasm.'] },
        { label: 'Target', cells: ['Which structure?', 'Enter the LGN.'] },
        { label: 'Address', cells: ['Which cells?', 'Contact the appropriate cells within the LGN.'] },
      ],
    },
    block('HW5 2(c), slide 26 and Bear pp. 795–796.'),
    block('Developing cells communicate through direct contact, contact with secreted matrix, or diffusible signals. As connections form, action potentials and synaptic transmission add a fourth means of communication.'),
    sourceFigure('guidance-address', 26, 1007 / 536, 'Magnified view of the axon’s approach to the LGN.', [
      ['Pathway choice', 52, 72], ['Target entry', 30, 50], ['Address within LGN', 25, 32],
    ]),
  ]],
  ['growing-axon', 'The growing axon', [
    block('The growth cone explores with thin filopodia and broad lamellipodia. Integrins bind matrix cues such as laminin. Cell adhesion molecules can also link an extending axon to an existing axon, a process called fasciculation. Chemical cues can steer growth toward or away from a source.'),
    optionalFigure('Growth cone close-up', sourceFigure('growth-cone', 28, 602 / 594, 'The growth cone has thin projections and broad membrane sheets.', [
      ['Filopodia', 46, 82], ['Lamellipodia', 74, 73],
    ])),
    detail('Examples of diffusible cues', 'Bear pp. 797–799 discusses attraction by netrin and repulsion by Slit in the relevant axon-guidance contexts. The direction depends on which receptors the growth cone expresses.'),
  ]],
  ['synaptogenesis', 'Synapse formation', [
    steps('Three stages in the CNS synapse model',
      'A dendritic filopodium contacts an axon.',
      'Vesicles and active-zone proteins accumulate on the presynaptic side.',
      'Transmitter receptors cluster postsynaptically. Adhesion molecules stabilise the contact.'),
    block('By the fetal stage, the two projections shown in <a href="#initial-wiring">the visual pathway</a> reach their destinations and form synapses in retinotopic order. A prolonged period of refinement follows.'),
    sourceFigure('synapse-assembly', 30, 416 / 662, 'Three snapshots of a developing contact.', [
      ['Initial contact', 43, 19], ['Presynaptic assembly', 40, 47], ['Postsynaptic cluster', 45, 84],
    ]),
  ]],
  ['reduction', 'Reduction', [
    block('Developing neurons begin in excess and compete for a limited supply of target-derived neurotrophins such as NGF and BDNF. Sufficient support suppresses programmed cell death. Under-supported neurons undergo apoptosis, bringing the surviving population into line with the target’s capacity. HW5 3(a), slide 33 and Bear pp. 803–804.'),
    sourceFigure('trophic-competition', 33, 529 / 617, 'The two panels compare the initial population and the surviving inputs.', [
      ['Initial inputs', 61, 14], ['Target neurons', 61, 35], ['Surviving inputs', 61, 67],
    ]),
    detail('Terminology and examples', 'Apoptosis is a regulated process of cell disassembly. Necrosis is the contrasting form of cell death associated with injury. NT-3 and NT-4 are additional examples of neurotrophins in the chapter.'),
  ]],
  ['pruning', 'Pruning', [
    block('Multiple motor axons initially innervate a muscle fibre. One input persists. At a losing branch, postsynaptic acetylcholine receptors are lost, the terminal disassembles and the branch withdraws. This removes a connection while the motor neuron can survive.'),
    block('Partial local α-bungarotoxin blockade promotes elimination when other inputs can still activate the muscle. Full blockade silences the muscle and retains inputs under the experiment’s conditions (slide 35 and Bear p. 805).'),
    sourceFigure('pruning', 35, 1036 / 1070, 'The left panel compares innervation before and after maturation. The right follows receptor loss and branch withdrawal at a locally blocked site.', [
      ['Multiple inputs', 22, 26], ['Single input', 21, 84], ['Local blockade', 70, 29],
    ]),
    detail('Synaptic capacity', 'Slide 34 estimates immature neurons can support roughly 50% more synapses than adult neurons.'),
  ]],
  ['segregation', 'Rearrangement and Hebb', [
    block('Rearrangement is the final step of address selection. Spontaneous activity begins before birth and sensory experience increasingly shapes connections after birth. Hebb’s rule is “fire together, wire together”. Inputs firing out of sync with their target lose their link.'),
    block('Retinal waves correlate nearby cells within an eye before vision. When inputs from the two eyes first arrive in the LGN, they overlap. Blocking spontaneous firing with tetrodotoxin (TTX) prevents normal refinement into distinct eye-specific territories. In cortex, slide 41 stresses between-eye asynchrony for layer IV stripes. Bear pp. 806–809 also describes initial molecular targeting.'),
    optionalFigure('Hebbian segregation diagram', sourceFigure('hebb', 38, 1011 / 993, 'Groups of correlated inputs strengthen on a common target and segregate from competing inputs.', [
      ['Upper active group', 10, 14], ['Lower active group', 15, 90], ['Segregated inputs', 68, 52],
    ])),
    sourceFigure('stimulation', 42, 702 / 377, 'After TTX, synchronous stimulation favours binocular cells and asynchronous stimulation favours eye-specific cells. The axes show ocular dominance groups 1–7 and cell counts.', [
      ['Synchronous', 26, 88], ['Asynchronous', 84, 88],
    ]),
  ]],
  ['deprivation', 'Monocular deprivation, layer IV', [
    block('Monocular deprivation means blocking patterned visual input from one eye, for example by closing an eyelid. In the macaque tracer experiment, terminals serving the open eye occupy wider stripes in layer IV after early deprivation. Deprivation in that comparison began at two weeks of age and lasted 22 months. Tracer labels show where the terminals are.'),
    sourceFigure('stripes', 43, 512 / 718, 'Normal macaque stripes above and expanded open-eye bands after early deprivation below.', [
      ['Normal', 45, 24], ['Early deprivation', 53, 75],
    ]),
    detail('Timing and reversal', 'Bear p. 809 describes a roughly six-week critical period for changing macaque layer IV stripes. Reversing which eye is closed while that window is open can reverse the bias.'),
  ]],
  ['convergence', 'Convergence and the ocular dominance shift', [
    block('Inputs from layer IV converge onto layer III neurons. Correlated binocular vision helps maintain binocular responses. The normal cat histogram peaks at group 3. After early deprivation roughly 80% of units are in group 5, the open-eye group. This change in response preference is the ocular dominance shift.'),
    sourceFigure('dominance-histogram', 44, 1163 / 568, 'Measured percentages of layer III neurons by ocular dominance group. Compare the middle peak in normal cats with the open-eye peak after deprivation.', [
      ['Normal cats', 24, 37], ['After deprivation', 91, 31],
    ]),
    block('Slide 45’s “use it or lose it” describes a single neuron whose right-eye response dropped sharply after 17 hours. With strabismus, both eyes can remain active while their images are misaligned. Loss of binocular responses in that case points to competition between poorly coordinated inputs (Bear pp. 811–812). The same physiological shift can occur in species without visible ocular dominance columns.'),
    optionalFigure('Single-neuron recording', sourceFigure('right-eye-recording', 45, 432 / 736, 'The same neuron before and after right-eye deprivation. Yellow bars mark the visual stimulus.', [
      ['Initial right-eye response', 74, 24], ['After 17 hours', 72, 78],
    ])),
  ]],
  ['neuromodulation', 'Neuromodulation and the critical period', [
    block('Norepinephrine (NE) from locus coeruleus and acetylcholine (ACh) from basal forebrain facilitate cortical plasticity. With both influences removed, deprivation produces little shift in the illustrated experiment. Bear p. 813 also describes anaesthesia suppressing this plasticity even when stimulation still evokes some cortical activity.'),
    block('A critical period is a developmental window in which a particular experience strongly shapes a circuit. The mouse diagram on slide 47 labels this window around postnatal days 25–30. Slide 48 shows human ocular dominance columns.'),
    detail('Growth and binocular alignment', 'Bear p. 811 links maximal ocular dominance plasticity with rapid head and eye growth, when flexibility may help maintain binocular vision.'),
    optionalFigure('Modulation experiment', sourceFigure('modulators', 46, 883 / 931, 'The dominance distribution after deprivation differs with modulatory input intact versus disrupted.', [
      ['Intact influences', 79, 27], ['Disrupted influences', 79, 79],
    ])),
  ]],
  ['amblyopia', 'Amblyopia and reopening plasticity', [
    block('Amblyopia is a developmental reduction in visual acuity associated with altered cortical processing. Slide 49’s wording about eye deficits is ambiguous. Its focus is on impaired central visual processing.'),
    steps('Mouse result and human comparison',
      'In the mouse model, the SSRI fluoxetine reopened critical-period-like plasticity and supported recovery.',
      'In adults, the fluoxetine and placebo groups both received patching and game-like perceptual training. The game tracked adherence.',
      'Acuity improved under the shared conditions, with no demonstrated added benefit from fluoxetine. Slide 54 presents game-based digital therapeutics as a direction. The trial did not isolate the effect of the game from patching.'),
  ]],
  ['plasticity', 'NMDA receptors, LTP and LTD', [
    block('Glutamate can activate AMPA, NMDA and metabotropic receptors. At resting voltage, magnesium blocks most NMDA current even if glutamate binds. Postsynaptic depolarisation relieves the block. Glutamate release plus depolarisation therefore permits calcium entry and signals coincidence.'),
    sourceFigure('nmda-coincidence', 56, 720 / 571, 'Glutamate is present in both panels. Depolarisation in the second panel relieves the NMDA pore block.', [
      ['Blocked NMDA pore', 30, 60], ['Calcium entry', 84, 77],
    ]),
    block('In the potentiation model, strongly coincident input produces a large calcium signal that promotes AMPA receptor insertion and lasting strengthening (LTP).'),
    block('In the depression model, residual deprived-eye spikes seldom coincide with strong cortical responses. Weak NMDA activation admits modest calcium, prompting AMPA receptor internalisation and lasting weakening (LTD), which can precede elimination. HW5 3(b). Slide 57 names LTD. Bear pp. 817–818 explains how the active input weakens. See the blockade comparison in <a href="#pruning">Pruning</a>.'),
    detail('Silent synapses', 'An immature synapse with NMDA receptors and few AMPA receptors can show little response near rest. Potentiation can recruit AMPA receptors and make its response detectable. See Bear pp. 816–817.'),
  ]],
  ['critical-period-closure', 'Why critical periods end', [
    block('Adult plasticity persists in a narrower range. Local changes in synaptic efficacy can outlast the early capacity for large-scale arbor rearrangement (Bear p. 818). HW5 3(c) asks for two hypotheses and the limitation each explains. Bear p. 819 gives three.'),
    steps('Three proposed constraints',
      'Reduced axon growth limits the expansion and contraction of geniculate arbors.',
      'Maturation of synaptic transmission changes receptor properties and the conditions for inducing LTP or LTD.',
      'Cortical activation becomes more constrained. Mature inhibition or reduced modulatory influence can filter out activity that would have activated plasticity mechanisms earlier in development.'),
    detail('Evidence and recovery', 'Accelerating maturation of GABAergic inhibition shortened the ocular dominance plasticity window in mice. Slowing it prolonged the window. Bear p. 819 contrasts the extensive recovery possible in the immature nervous system with more limited recovery in adults.'),
  ]],
];

const sections = topics.map(([id, title, blocks, previousCheckId = id]) => {
  const partIndex = parts.findIndex(([, start]) => start === id);
  return {
    id, title, blocks,
    part: partIndex < 0 ? undefined : { id: `block-${partIndex + 1}`, number: partIndex + 1, title: parts[partIndex][0] },
    conceptQuiz: conceptChecks.get(previousCheckId),
  };
});

const q = (id, type, difficulty, prompt, fields, ...modelAnswer) =>
  ({ id: `l10-q-${id}`, type, difficulty, points: 1, prompt, ...fields, modelAnswer });

const previousPractice = [
  q('route', 'label', 'easy', 'Identify each station from retinal output to the cortical recipient.', {
    hotspots: unlabelledRoute.props,
    wordBank: ['Striate cortex, layer IV', 'Retinal ganglion cell', 'Lateral geniculate nucleus', 'Superior colliculus'],
  }, 'The retinal ganglion cell projects to the LGN.', 'LGN relay axons reach striate cortex in layer IV.'),
  q('guidance', 'classify', 'easy', 'Classify the three decisions in HW5 2(c).', {
    categories: ['Pathway selection', 'Target selection', 'Address selection'],
    items: items([
      ['Which cells within the LGN to contact', 'Address selection', 'The choice is within the destination.'],
      ['Which route to take along the projection', 'Pathway selection', 'The choice concerns the route.'],
      ['Which brain structure to innervate', 'Target selection', 'The choice concerns the destination.'],
    ]),
  }, 'Distinguish route, destination and cells within the destination.', 'The three decisions are address, pathway and target selection in the order shown.'),
  q('terms', 'fillBlank', 'easy', 'Name each process.', {
    text: 'Programmed death of the cell is ___. Selective removal of a connection is ___.',
    blanks: [{ accept: ['apoptosis', 'programmed cell death'] }, { accept: ['pruning', 'synaptic pruning', 'synapse elimination', 'synaptic elimination'] }],
  }, 'Apoptosis removes a cell. Pruning removes a synaptic input or branch.'),
  q('migration', 'classify', 'medium', 'Classify the observations as evidence about migration or differentiation. This practices HW5 2(b).', {
    categories: ['Migration', 'Differentiation'],
    items: items([
      ['A young neuron crosses an earlier cortical cohort.', 'Migration', 'It is changing position.'],
      ['A cell grows a polarised dendritic tree at its destination.', 'Differentiation', 'It is acquiring specialised structure.'],
      ['A labelled cell reaches the correct layer but lacks the expected mature processes.', 'Differentiation', 'Position is appropriate, so the missing requirement is cellular specialisation.'],
      ['A cell with the expected shape settles deep to its normal layer.', 'Migration', 'The finding concerns placement.'],
    ]),
  }, 'Migration gets a neuron to the correct place.', 'Differentiation supplies the specialised properties it needs to function in that circuit, even after it arrives.'),
  q('assembly', 'order', 'medium', 'Order the events in the slide model of CNS synapse formation.', {
    items: ['Dendritic filopodium contacts an axon', 'Vesicles and active-zone proteins assemble presynaptically', 'Transmitter receptors accumulate postsynaptically'],
  }, 'Contact is the first step.', 'The model then shows recruitment on the sending side and receptor accumulation on the receiving side.'),
  q('deprivation', 'inlineChoice', 'medium', 'Complete the predictions for early monocular deprivation.', {
    sentences: [
      { text: 'In layer IV the open-eye territory is ___, and in layer III responses favour the ___.',
        choices: [{ options: ['expanded', 'contracted'], answer: 0 }, { options: ['deprived eye', 'open eye'], answer: 1 }],
        explanation: 'The layer IV inputs and layer III response shift both favour the open eye.' },
      { text: 'Removing the two modulatory influences makes the induced shift ___ .',
        choices: [{ options: ['larger', 'much smaller'], answer: 1 }],
        explanation: 'The intact norepinephrine and acetylcholine systems facilitate the shift.' },
    ],
  }, 'Read layer IV in terms of terminal territory and layer III in terms of response preference.', 'Both changes favour the open eye when modulation is intact.'),
  q('trial', 'trueFalse', 'medium', 'Evaluate the inferences from the human amblyopia trial. Correct each false claim.', {
    statements: statements([
      ['Improvement under both trial conditions proves that fluoxetine contributed to the improvement.', false, 'An extra drug effect requires evidence of an advantage over placebo.'],
      ['The shared training and patching conditions limit what the comparison can say about training alone.', true, 'Those components were shared by the groups.'],
    ]),
  }, 'Identify the component that differed between groups.', 'The comparison tests the incremental drug effect. It does not isolate the shared training.'),
  q('modulation', 'matchPairs', 'medium', 'Match each circuit element to its role in the visual examples.', {
    right: [
      { id: 'relay', text: 'Visual input to cortical layer IV' }, { id: 'ach', text: 'Acetylcholine to cortex' },
      { id: 'temporary', text: 'Early recipient of thalamic input' }, { id: 'ne', text: 'Norepinephrine to cortex' },
      { id: 'retina', text: 'Visual input to the LGN' },
    ],
    left: items([
      ['Locus coeruleus', 'ne', 'Its modulatory transmitter is norepinephrine.'],
      ['Basal forebrain complex', 'ach', 'Its modulatory transmitter here is acetylcholine.'],
      ['LGN relay neurons', 'relay', 'The geniculate projection targets layer IV.'],
      ['Subplate neurons', 'temporary', 'They receive early thalamic input.'],
    ]),
  }, 'Separate neuromodulatory projections from the visual relay.', 'The early subplate receives thalamic input during development.'),
  q('readouts', 'groupItems', 'medium', 'Sort the observations by what was measured.', {
    groups: ['Anatomical territory', 'Physiological response'],
    items: [
      { text: 'Area covered by labelled terminals', group: 'Anatomical territory', explanation: 'This shows the location of fibres in layer IV.' },
      { text: 'Loss of right-eye-evoked spikes in one cortical neuron', group: 'Physiological response', explanation: 'This measures a change in evoked spiking to the stimulus.' },
      { text: 'Distribution of eye preferences across cortical units', group: 'Physiological response', explanation: 'The population histogram is built from unit responses.' },
      { text: 'Width of stripes labelled from the open eye', group: 'Anatomical territory', explanation: 'Stripe width is a structural readout.' },
    ],
  }, 'Tracer labelling measures where projections terminate.', 'Spiking and ocular preference measure how neurons respond.'),
  q('subplate', 'mc', 'medium', 'Which role best explains why a transient subplate can matter for development?', {
    correct: 1,
    options: options([
      ['It maintains the main adult visual projection.', 'The mature geniculate projection terminates in layer IV. The subplate receives early thalamic input.'],
      ['It participates in early thalamocortical circuitry.', 'The subplate receives and participates in early thalamic signalling.'],
      ['It supplies the main pool of dividing precursors.', 'That pool is associated with the ventricular zone.'],
    ]),
  }, 'A transient population can support early cortical activity and influence wiring before the mature circuit is established.'),
  q('closure', 'multiSelect', 'medium', 'Which mechanisms are proposed in Bear to explain the closure of critical periods? This practices HW5 3(c).', {
    options: selections([
      ['Reduced capacity to remodel geniculate axon arbors.', true, 'Less growth restricts changes in layer IV territory.'],
      ['Maturation of synaptic transmission and plasticity mechanisms.', true, 'Receptor and signalling changes alter the conditions for LTP or LTD.'],
      ['Constraints on which activity can drive cortical plasticity.', true, 'For example, mature inhibition can limit activation at modifiable synapses.'],
      ['A permanent loss of all plasticity in every cortical layer.', false, 'Adult plasticity persists in more constrained forms.'],
    ]),
  }, 'Any two of these hypotheses answer HW5 3(c) when the limitation is explained.', 'For example, reduced axonal growth constrains structural remodelling, and stronger filtering by mature cortical circuits prevents some inputs from activating plasticity mechanisms sufficiently.'),
  q('population', 'interpret', 'medium', 'Read the distributions. If the cortex can use correlated activity to stabilise connections, which protocol best explains B relative to A?', {
    figure: population, correct: 2, options: options([
      ['Both eyes driven synchronously throughout B', 'Shared timing favours the more binocular distribution.'],
      ['The same eye deprived throughout B', 'This would favour one side of the distribution.'],
      ['The two eyes driven asynchronously in B', 'Separated activity favours two eye-specific populations.'],
    ]),
  }, 'B has two peaks at opposite eye-specific ends and relatively few binocular units.', 'Asynchronous activation supports segregation because each eye can correlate with target firing at different times.', 'Monocular deprivation would bias the population toward one eye, not both ends.'),
  q('support', 'clinicalCase', 'hard', 'Name the process that removes cells. Then predict which population loses more cells and explain your reasoning before revealing the model.', {
    scenario: 'Two developing populations reach the right targets. Targets for population A produce less trophic support than those for B. In both groups there are more inputs than targets can support. Assume the input populations start equal and require the same support per cell.',
    accept: ['apoptosis', 'programmed cell death'],
  }, 'With less total support available, fewer developing neurons can get enough survival signalling.', 'Insufficient support allows apoptosis. More cells are therefore eliminated in A in this simplified comparison.', 'Competition limits the surviving population to the support available from its targets.'),
  q('misplaced', 'clinicalCase', 'hard', 'Which developmental process failed? Before revealing, explain why a normal terminal location alone cannot establish normal circuitry.', {
    scenario: 'An alteration leaves precursor division and dendritic differentiation intact. Later-born excitatory neurons stop beneath earlier cohorts, and a tracer still labels incoming axons in the usual layer IV zone.',
    accept: ['migration', 'neuronal migration', 'radial migration', 'inside-out migration'],
  }, 'The defining failure is placement: late cohorts do not pass the early ones.', 'That points to impaired radial migration even though differentiation is intact.', 'The expected terminal layer does not guarantee that the correct postsynaptic cells settled there.'),
  q('residual', 'trueFalse', 'hard', 'During early monocular deprivation, a manipulation allows residual deprived-eye activity but blocks AMPA receptor internalisation. Evaluate the claims using the chapter mechanism. Correct any false claim. This practices HW5 3(b).', {
    statements: statements([
      ['Weakly correlated activity can still produce modest NMDA-mediated calcium entry.', true, 'Residual activity provides glutamate and weak coincidence provides some depolarisation.'],
      ['Deprived-eye weakening should be unchanged because the input became inactive.', false, 'Residual activity can drive LTD, but preventing AMPA receptor loss interrupts this route to reduced effectiveness.'],
    ]),
  }, 'Deprivation changes the pattern of retinal activity and weakens its correlation with cortical firing.', 'The resulting modest calcium entry can normally recruit AMPA receptor internalisation.', 'Preventing internalisation protects against this mechanism of lasting weakening even with altered visual input.'),
  q('activation', 'multiSelect', 'hard', 'In two mature preparations, axon arbors cannot regrow. A weak visual stimulus fails to shift cortical responses in either preparation. In preparation A the experimenter then supplies glutamate release paired with strong local postsynaptic depolarisation. Only A shows persistent strengthening. Which conclusions follow?', {
    options: selections([
      ['Local synaptic strengthening can outlast the stimulus without arbor growth.', true, 'The experiment observed persistent strengthening despite the growth constraint.'],
      ['All forms of critical-period plasticity have been restored.', false, 'Local synaptic efficacy was tested. Structural remodelling remains constrained.'],
      ['Strong depolarisation alone proves that the same plasticity occurs without glutamate.', false, 'The two inputs were paired in the experiment.'],
      ['The experiment proves maturation of inhibition caused the original weak response.', false, 'It does not identify which circuit mechanism prevented the change.'],
    ]),
  }, 'Pairing glutamate and depolarisation can enable NMDA current and a potentiating calcium signal.', 'With growth still constrained, the result establishes local strengthening only.', 'Since the experiment bypasses upstream activation, it cannot by itself identify what limited activation originally.'),
];

const mc = (id, difficulty, prompt, correct, rows) =>
  q(id, 'mc', difficulty, prompt, { correct, options: options(rows) }, rows[correct][1]);

const lectureQuiz = [
  mc('crossing', 'easy', 'Which retinal fibres cross at the optic chiasm?', 0, [
    ['Fibres from the nasal retina', 'Nasal fibres cross to the opposite tract.'],
    ['Fibres from the temporal retina', 'Temporal fibres enter the tract on the same side.'],
  ]),
  mc('partition', 'easy', 'Which protein goes with the migrating daughter in slide 10?', 1, [
    ['The Numb protein', 'Numb stays with the daughter that divides again in this model.'],
    ['Notch-1 protein', 'Slide 10 places Notch-1 with the departing daughter.'],
  ]),
  mc('layer-order', 'easy', 'Which cortical plate layer forms first in the illustrated sequence?', 2, [
    ['Layer II', 'Layer II is late in the inside-out sequence.'],
    ['Layer IV', 'Layer IV follows the deeper VI and V cohorts.'],
    ['Layer VI', 'Layer VI is the first cortical plate layer in the sequence.'],
  ]),
  mc('neurite-sign', 'easy', 'What does semaphorin 3A do in slide 21?', 0, [
    ['Attracts the apical dendrite and repels the axon', 'The apical dendrite grows toward the marginal-zone cue. The axon grows away.'],
    ['Repels the apical dendrite and attracts the axon', 'These directions are reversed in the lecture figure.'],
    ['Attracts the apical dendrite and the axon', 'The apical dendrite is attracted. The axon is repelled.'],
  ]),
  mc('growth-cone', 'easy', 'What is the name for growth along an existing axon?', 1, [
    ['Differentiation', 'Differentiation is acquisition of specialised properties.'],
    ['Fasciculation', 'Fasciculation uses another axon as a growth substrate.'],
    ['Segregation', 'Segregation separates inputs into distinct territories or groups.'],
  ]),
  mc('pruning-order', 'easy', 'What occurs first at a losing motor input in the chapter model?', 2, [
    ['Withdrawal of the axon branch', 'The branch retracts after changes at the synapse.'],
    ['Disassembly of the axon terminal', 'The terminal disassembles after postsynaptic receptor loss.'],
    ['Loss of postsynaptic receptors', 'Loss of acetylcholine receptors precedes disassembly and withdrawal.'],
  ]),
  mc('sensitive-window', 'easy', 'What defines a developmental critical period for a circuit?', 1, [
    ['A window of especially rapid precursor division', 'Rapid division expands the precursor pool. The defining feature here is sensitivity to experience.'],
    ['A window of heightened sensitivity to experience', 'Experience in this window has an especially strong effect on how the circuit develops.'],
    ['A window between initial wiring and first activity', 'Spontaneous activity can already influence circuits before patterned sensory experience.'],
  ]),
  mc('mouse-recovery', 'easy', 'What did the lecture report for fluoxetine in the mouse model of amblyopia?', 2, [
    ['It prolonged the loss of visual acuity', 'The mouse result was recovery after treatment.'],
    ['It left visual recovery and plasticity unchanged', 'The lecture describes renewed plasticity in the mice.'],
    ['It reopened plasticity and supported visual recovery', 'The mouse model showed a reopened critical-period-like window and improved vision.'],
  ]),
  mc('assembly-sequence', 'medium', 'Which sequence matches the CNS synapse assembly shown in the lecture?', 0, [
    ['Contact → presynaptic recruitment → postsynaptic receptor accumulation', 'A dendritic filopodium contacts the axon. Vesicles and active-zone proteins are recruited before the illustrated receptor accumulation.'],
    ['Contact → postsynaptic receptor accumulation → presynaptic recruitment', 'The lecture places vesicle and active-zone recruitment before postsynaptic receptor accumulation.'],
    ['Presynaptic recruitment → contact → postsynaptic receptor accumulation', 'In this sequence the contact triggers recruitment to the release site.'],
  ]),
  mc('wrong-route', 'medium', 'A retinal axon arrives at the appropriate relay nucleus and cells but follows the wrong tract. Which decision was incorrect?', 0, [
    ['Pathway selection', 'The error concerns which route the axon took.'],
    ['Address selection', 'Address selection concerns which cells the axon contacts.'],
    ['Target selection', 'Target selection concerns which nucleus the axon enters.'],
  ]),
  mc('tracer-response', 'medium', 'An experiment counts spikes during separate left- and right-eye tests. Which outcome directly measures a shift in this experiment?', 1, [
    ['Wider layer IV bands for one eye', 'Band width would require anatomical labelling.'],
    ['Stronger preference for one eye', 'The experiment compares the unit’s responses to the two eyes.'],
    ['More geniculate terminals overall', 'A spike recording does not count terminals.'],
  ]),
  mc('paired-eye-timing', 'medium', 'After TTX suppresses spontaneous firing, which stimulation pattern favours eye-specific cortical responses in the lecture experiment?', 2, [
    ['Stimulate both eyes together in repeated bursts', 'Synchronous stimulation favoured binocular responses.'],
    ['Leave both eyes unstimulated after the blockade', 'This provides no patterned activity to drive eye-specific refinement.'],
    ['Stimulate the two eyes in out-of-sync bursts', 'Asynchronous stimulation favoured eye-specific responses.'],
  ]),
  mc('surface-gain', 'medium', 'Strong coincident activity produces a large calcium signal through NMDA receptors. What change can maintain the stronger response?', 0, [
    ['More AMPA receptors on the postsynaptic surface', 'AMPA insertion strengthens later responses to glutamate in this LTP model.'],
    ['Fewer AMPA receptors on the postsynaptic surface', 'AMPA removal weakens the synapse in the LTD model.'],
    ['More magnesium blocking the postsynaptic NMDA pores', 'The magnesium block limits NMDA current. Its relief permits induction but is separate from how AMPA recruitment maintains the stronger response.'],
  ]),
  mc('less-growth', 'medium', 'Which finding directly supports reduced arbor mobility as a limit on structural plasticity?', 2, [
    ['NMDA receptor composition changes', 'This supports the synaptic maturation hypothesis.'],
    ['Cortical inhibitory signals strengthen', 'This could constrain cortical activation.'],
    ['Geniculate axons stop changing length', 'The arbors cannot expand or contract if axon length cannot change.'],
  ]),
  mc('target-capacity', 'hard', 'Two equally sized populations compete for support at otherwise identical targets. Target X supplies less neurotrophin than Y, and a treatment blocks apoptosis in X. Compared with untreated X, what follows?', 1, [
    ['More cells die and input counts fall further below capacity', 'Blocking apoptosis prevents this route to cell loss.'],
    ['More cells survive and matching to available support worsens', 'Less support would normally leave more neurons below the survival threshold. Blocking apoptosis spares those cells and disrupts matching.'],
    ['More cells survive and the target starts producing more support', 'Preventing death does not entail an increase in target output.'],
  ]),
  mc('surface-tracking', 'hard', 'A deprived-eye synapse has weak NMDA activation and modest calcium entry. A selective intervention prevents AMPA internalisation. What outcome follows from the chapter’s LTD model?', 0, [
    ['Surface AMPA is retained and the LTD pathway is interrupted', 'The intervention interrupts the step linking modest calcium entry to lasting weakening.'],
    ['Surface AMPA falls and the LTD pathway proceeds normally', 'Internalisation is the step that reduces receptor availability in this model.'],
    ['Surface AMPA rises and the LTP pathway is necessarily engaged', 'Preventing removal does not recruit the large-calcium potentiation pathway.'],
  ]),
];
const optionalPractice = previousPractice;

// Original paper layouts remain available alongside their saved attempts.
const paperQuestion = (id, prompt, ...answers) => ({
  id: `l10-paper-${id}`, prompt: Array.isArray(prompt) ? prompt : [prompt],
  markScheme: answers.map(text => ({ points: 1 / answers.length, text })),
});
const paper = (version, coverage, questions) => ({
  id: `l10-paper-${version}`, format: 'paper', title: `Mini-exam ${version}`, coverage, questions,
});
const previousMockExams = [
  paper('A', 'Cell development, visual projections and synaptic changes', [
    paperQuestion('a01', ['Which pairing best describes early cortical development?',
      'A. Early cortical plate cohorts occupy deep layers.',
      'B. Early cortical plate cohorts occupy outer layers.',
      'C. Late cortical plate cohorts form the first subplate.',
      'D. Late cortical plate cohorts remain at the ventricle.'],
      'A. Early cortical plate cohorts occupy deep layers. Later cohorts pass them to settle closer to the surface. The transient subplate forms before either cohort, and the later cortical plate cohorts migrate away from the ventricle.'),
    paperQuestion('a02', ['Classify each observation as migration or differentiation.',
      'a) A neuroblast moves along a radial glial fibre.',
      'b) A settled cell develops an apical dendrite.'],
      'a) Migration.', 'b) Differentiation.'),
    paperQuestion('a03', ['Use pathway, target or address selection once each.',
      'a) Select the geniculate nucleus. b) Choose a route at the optic chiasm. c) Contact the appropriate cells in the nucleus.'],
      'a) Target selection.', 'b) Pathway selection.', 'c) Address selection.'),
    paperQuestion('a04', 'A dendritic filopodium contacts a developing axon. Name one change at the presynaptic membrane and one on the postsynaptic side.',
      'Presynaptic vesicles or active-zone proteins accumulate.', 'Postsynaptic neurotransmitter receptors accumulate.'),
    paperQuestion('a05', 'Two developing neurons reach a target. One receives enough trophic support and the other receives very little. Name the process expected in the second neuron, then explain why the first can survive.',
      'The unsupported neuron undergoes apoptosis.', 'Sufficient target-derived support suppresses the apoptotic programme.'),
    paperQuestion('a06', ['Circle one option in each bracket.',
      'During a retinal wave, activity in nearby cells in one eye is [uncorrelated / correlated]. Before eye opening, activity between the two eyes can be [asynchronous / synchronous].'],
      'Correlated within one eye.', 'Asynchronous between eyes.'),
    paperQuestion('a07', 'A tracer labels open-eye LGN terminals after early monocular deprivation. (a) Which striate layer is illustrated in the lecture? (b) Are the labelled stripes wider or narrower than usual?',
      'a) Layer IV.', 'b) Wider.'),
    paperQuestion('a08', 'Match each source to its transmitter: (a) basal forebrain complex, (b) locus coeruleus. Use acetylcholine and norepinephrine.',
      'a) Acetylcholine.', 'b) Norepinephrine.'),
    paperQuestion('a09', 'In a comparison with training and patching held constant, visual acuity improves in both drug and placebo groups. Which comparison is needed to support an additional fluoxetine benefit?',
      'The fluoxetine group must show a reliable additional improvement relative to the placebo group.'),
    paperQuestion('a10', 'A weakly correlated input repeatedly releases glutamate and admits modest calcium through NMDA receptors. In the LTD model, give the change in surface AMPA receptors and one consequence for subsequent responses.',
      'Surface AMPA receptor availability decreases through internalisation.', 'Later responses to glutamate weaken.'),
  ]),
  paper('B', 'Early cortical organisation, activity patterns and critical periods', [
    paperQuestion('b01', 'Order these developmental cohorts from earliest to latest: layer II, subplate, layer IV, layer VI.',
      'Subplate → layer VI → layer IV → layer II.'),
    paperQuestion('b02', ['Which finding most directly indicates poor differentiation?',
      'A. Late cells remain below their normal layer.',
      'B. Settled cells lack their expected dendrites.',
      'C. Young cells travel along radial glial fibres.',
      'D. Deep cells settle before superficial cells.'],
      'B. Settled cells lack their expected dendrites. Missing dendrites indicate a failure of cellular specialisation. Settling too deep indicates a migration error. Radial glial migration and deep-before-superficial settling are both expected.'),
    paperQuestion('b03', 'An axon reaches the correct nucleus by the normal route but contacts an inappropriate subset of neurons. Name the failed selection step and explain your choice.',
      'Address selection.', 'The error is in selecting cells within the destination structure.'),
    paperQuestion('b04', ['Match each observation to apoptosis or pruning.',
      'a) An under-supported neuron disassembles. b) A motor axon withdraws one branch while the cell survives.'],
      'a) Apoptosis.', 'b) Pruning.'),
    paperQuestion('b05', 'An experiment alternates stimulation of the two eyes after suppressing their spontaneous firing. Are more units expected at the binocular centre or at the eye-specific ends of the dominance scale? Explain.',
      'At the eye-specific ends.', 'Alternating activity favours separate sets of inputs correlated with the cortical target.'),
    paperQuestion('b06', ['Which describes the early functional shift in layer III?',
      'A. Equal responses to both eyes become more frequent.',
      'B. Responses become weighted toward the deprived eye.',
      'C. Responses become weighted toward the nondeprived eye.',
      'D. Responses become weaker to stimulation of either eye.'],
      'C. Responses become weighted toward the nondeprived eye. Previously binocular neurons lose deprived-eye responses. The change favours one eye, so it decreases binocularity and does not weaken both eyes equally.'),
    paperQuestion('b07', 'An NMDA receptor binds glutamate while the postsynaptic cell remains at resting voltage. Name the ion that blocks the pore and the electrical change that relieves the block.',
      'Magnesium blocks the pore.', 'Sufficient postsynaptic depolarisation relieves the block.'),
    paperQuestion('b08', 'After deprivation a retinal input still fires, but its spikes seldom coincide with postsynaptic firing. (a) Can this input undergo activity-dependent LTD? (b) Name a postsynaptic change that explains weaker responses.',
      'a) Yes. Residual poorly correlated activity can induce LTD.', 'b) Surface AMPA receptors can be internalised.'),
    paperQuestion('b09', 'Use two different chapter hypotheses to explain how critical-period closure could limit plasticity. Give one mechanistic explanation per hypothesis.',
      'First valid mechanism and link: reduced axon growth limits arbor remodelling, synaptic maturation changes LTP or LTD induction, or constrained cortical activation limits recruitment of plasticity mechanisms.',
      'Second distinct mechanism and link from the same set.'),
    paperQuestion('b10', 'Explain why a positive fluoxetine result in a rodent model did not settle the question of added benefit in adults with amblyopia.',
      'Plasticity in the rodent preparation does not establish efficacy in adult humans. The human comparison with placebo found no added drug benefit.'),
  ]),
  paper('C', 'Circuit assembly and interpretation of visual plasticity evidence', [
    paperQuestion('c01', 'During precursor proliferation, where does mitosis occur? Name one influence on a daughter cell’s fate.',
      'At the ventricular surface.', 'Any one of precursor age, position in the ventricular zone, or local environment at division.'),
    paperQuestion('c02', ['Which result best fits the early role of the subplate?',
      'A. Early retinal inputs end on ventricular precursors.',
      'B. Early thalamic inputs contact migrating radial glia.',
      'C. Late cortical cohorts contact only adult relay cells.',
      'D. Early thalamic inputs contact transient subplate cells.'],
      'D. Early thalamic inputs contact transient subplate cells. Retinal output goes to relays such as the LGN. Radial glia guide migration. The temporary subplate circuit is established before the mature relay.'),
    paperQuestion('c03', 'A growing axon follows an existing axon. Name the process and identify the part of the growing axon that samples its surroundings.',
      'Fasciculation.', 'The growth cone, including its filopodia.'),
    paperQuestion('c04', 'Name the cortical destination of LGN axons and explain what it means for their map to be retinotopic.',
      'Layer IV of striate cortex.', 'Nearby retinal or visual positions map to nearby positions in the projection.'),
    paperQuestion('c05', 'Give the order of these two changes at a losing neuromuscular input: local postsynaptic acetylcholine receptor loss and withdrawal of its axon branch.',
      'Local postsynaptic acetylcholine receptor loss precedes axon branch withdrawal.'),
    paperQuestion('c06', ['Classify each readout as structural or physiological.',
      'a) Open-eye terminal bands become wider. b) A neuron stops firing to a right-eye test stimulus.'],
      'a) Structural.', 'b) Physiological.'),
    paperQuestion('c07', 'Monocular deprivation normally causes an ocular dominance shift. Predict the change in the shift when both modulatory influences shown in the lecture are removed. Name those transmitters.',
      'The shift is greatly reduced.', 'Norepinephrine and acetylcholine.'),
    paperQuestion('c08', 'A mature preparation retains NMDA-dependent changes in efficacy but its geniculate axons can no longer extend or retract. Which capacity is directly constrained, and why?',
      'Structural remodelling of layer IV input territory is constrained because geniculate arbors cannot reshape.'),
    paperQuestion('c09', 'An experiment pairs strong postsynaptic depolarisation with glutamate release. In the potentiation model, name the ion entering through NMDA receptors and give one effect on AMPA receptors.',
      'Calcium enters.', 'AMPA receptors can be recruited to the synapse.'),
    paperQuestion('c10', 'Both arms of an amblyopia trial receive patching and perceptual training. One arm also receives fluoxetine. (a) What incremental effect does the comparison test? (b) Why does it not isolate the effect of training alone?',
      'a) It tests the added effect of fluoxetine alongside the shared intervention.', 'b) Both groups trained and patched, so the trial did not compare training with a training-free condition.'),
  ]),
];

const choice = (prompt, choices, correct, explanation, kind = 'mc') => ({
  prompt, choices, correct, kind, markScheme: [{ points: 1, text: explanation }],
});
const truth = (prompt, answer, explanation) => choice(prompt, ['True', 'False'], answer ? 0 : 1, explanation, 'trueFalse');
const explain = (prompt, first, second) => ({
  prompt, markScheme: [{ points: 0.5, text: first }, { points: 0.5, text: second }],
});
const mixedPaper = (version, coverage, entries) => ({
  ...paper(version, coverage, entries.map((entry, index) => ({
    ...entry, id: `l10-paper-v2-${version.toLowerCase()}${String(index + 1).padStart(2, '0')}`,
  }))),
  revision: 2,
  instructions: 'Ten one-point problems. Choose one answer for each objective question and write one or two sentences for each explanation. Submit to see the answer key and mark your written responses.',
});

const secondEditionPapers = [
  mixedPaper('A', 'Building a circuit and refining its inputs', [
    choice('A birth-dating label marks the first cohort to settle in the cortical plate. Where should most labelled cells be found?', ['Layer II', 'Layer IV', 'Layer VI'], 2, 'Layer VI forms before the other cortical plate layers in the inside-out sequence.'),
    choice('A labelled neuron arrives in the expected layer but fails to acquire a polarised dendritic tree. Which requirement failed?', ['Cell proliferation', 'Cell differentiation', 'Radial migration'], 1, 'The layer is correct, so the missing property is neuronal differentiation.'),
    choice('A growing retinal axon makes the wrong turn at a crossing and later reaches a relay of the correct type. Which decision was already wrong at the crossing?', ['Pathway selection', 'Address selection', 'Target selection'], 0, 'The turn is a route choice. Target and address describe the destination and cells within it.'),
    choice('After a dendritic filopodium makes contact, which presynaptic change appears in the slide model?', ['Glutamate receptors cluster', 'A dendritic spine retracts', 'Vesicles and active-zone proteins gather'], 2, 'Vesicles and active-zone proteins gather on the sending side. The transmitter receptors cluster on the receiving side.'),
    choice('A developing neuron releases transmitter just as its target depolarises strongly. What is the immediate result at a glutamate-bound NMDA receptor?', ['More magnesium occupies the pore', 'The pore admits calcium', 'The pore stops passing calcium'], 1, 'Depolarisation displaces magnesium and allows NMDA-mediated calcium entry.'),
    choice('What did the adult amblyopia trial show when the group given fluoxetine was compared with the placebo group?', ['No demonstrated additional acuity gain', 'A larger acuity gain with fluoxetine', 'A larger acuity gain with placebo'], 0, 'The training and patching conditions were shared. Fluoxetine showed no demonstrated added benefit.'),
    choice('In the illustrated macaque tracer experiment, where were the expanded bands from the open eye?', ['Layer II', 'Layer III', 'Layer IV'], 2, 'The tracer shows layer IV terminal territory. Layer III is used to illustrate a physiological shift in response.'),
    truth('Spontaneous retinal waves can synchronise nearby neurons in one retina before patterned vision begins.', true, 'True. Within-eye correlation can arise from spontaneous activity.'),
    explain('A developing target initially receives more inputs than it can support. In one or two sentences, explain how this leads to a better match between surviving neurons and target capacity.',
      'Developing inputs compete for limited target-derived trophic support.', 'Sufficient support suppresses apoptosis. Under-supported neurons die, reducing the population toward target capacity.'),
    explain('A deprived-eye input still releases glutamate but seldom coincides with strong postsynaptic responses. Explain how this active input can become less effective.',
      'Poor coincidence weakly activates NMDA receptors and permits modest calcium entry.', 'This promotes removal of postsynaptic AMPA receptors, reducing subsequent responses to glutamate.'),
  ]),
  mixedPaper('B', 'Developmental contrasts and the limits of cortical plasticity', [
    choice('In the slide 10 asymmetric division, which daughter inherits Numb?', ['The daughter remaining to divide', 'The daughter leaving to migrate', 'Both daughters to the same degree'], 0, 'In this model, Numb remains with the daughter that will divide again. Notch-1 goes with the migrating daughter.'),
    choice('Which paired response to marginal-zone semaphorin 3A is shown in the lecture?', ['Axon approaches and apical dendrite recedes', 'Axon recedes and apical dendrite approaches', 'Both axon and apical dendrite approach'], 1, 'In the differentiation figure, the axon is repelled and the apical dendrite is attracted.'),
    choice('A retinal axon reaches the LGN along the expected route, then synapses on the wrong cells. Which choice failed?', ['Target selection', 'Pathway selection', 'Address selection'], 2, 'Address selection chooses the cells within the destination. The route and destination were correct.'),
    choice('After spontaneous retinal firing is suppressed, both eyes are driven in synchrony. Where is the distribution concentrated compared with asynchronous stimulation?', ['Near the binocular centre', 'Near both eye-specific extremes', 'Near one eye-specific extreme'], 0, 'The central groups contain binocular cells. Asynchronous stimulation favours both eye-specific extremes.'),
    choice('What change follows early deprivation in the cat layer III comparison?', ['More units prefer the deprived eye', 'More units prefer the open eye', 'More units respond equally to both eyes'], 1, 'The population shifts toward the open-eye end of the dominance scale.'),
    choice('Which cortical modulatory projections were disrupted in the experiment on slide 46?', ['Locus coeruleus ACh and basal forebrain NE', 'Locus coeruleus glutamate and basal forebrain ACh', 'Locus coeruleus NE and basal forebrain ACh'], 2, 'The locus coeruleus supplies NE and the basal forebrain supplies ACh.'),
    choice('Which result fits potentiation after a large NMDA-dependent calcium signal?', ['More AMPA receptors at the synapse', 'Fewer AMPA receptors at the synapse', 'Fewer target neurons at the synapse'], 0, 'The chapter’s potentiation model recruits AMPA receptors. Removal is associated with the example of LTD.'),
    truth('The layer III ocular dominance shift and an expansion of labelled stripes are measurements of the same property.', false, 'False. Layer III shift concerns response preference. Tracer-labelled stripe width measures terminal territory in layer IV.'),
    explain('Two groups receive identical patching and game-like training. Explain what a placebo comparison can test about added fluoxetine, and what it can establish about the game alone.',
      'It tests the added effect of fluoxetine alongside the shared intervention.', 'Both groups get the game and patching, so the separate contribution of the game is unresolved.'),
    explain('A mature circuit changes local synaptic strength when directly stimulated but has little structural remodelling or response to weak sensory input. Give two distinct chapter hypotheses that could explain those two limits.',
      'Reduced axon growth limits the ability of arbors to expand or contract.', 'Constrained cortical activation can prevent weak sensory signals from sufficiently reaching or driving plastic synapses.'),
  ]),
  mixedPaper('C', 'Interpreting developmental manipulations and circuit readouts', [
    choice('A precursor divides at the ventricular surface during the early symmetric phase. What is the likely outcome in the deck’s model?', ['Two cells leave for the cortical plate', 'Two descendants remain able to divide', 'One daughter leaves and one divides again'], 1, 'Early vertical division expands the precursor population in the simplified model.'),
    choice('A transient population just below the cortical plate already receives thalamic input. Which population is labelled?', ['Layer II cohort', 'Ventricular precursor pool', 'Subplate neurons'], 2, 'The subplate is a transient early recipient of thalamic input.'),
    choice('A growth cone moves along an earlier axon using adhesion molecules on both surfaces. Which process is being observed?', ['Fasciculation', 'Chemoattraction', 'Synaptic pruning'], 0, 'Fasciculation is contact-guided axon growth along another axon.'),
    choice('A normally active muscle fibre has one locally blocked postsynaptic patch. What happens at the matching motor input in the chapter experiment?', ['Its terminal grows into a second patch', 'Its branch can selectively withdraw', 'Its whole motor neuron undergoes apoptosis'], 1, 'Activity at competing inputs can promote elimination at the blocked site. The change is local branch withdrawal.'),
    choice('A retinal axon follows the expected optic tract but terminates in a neighbouring structure instead of the LGN. Which decision failed?', ['Address selection', 'Pathway selection', 'Target selection'], 2, 'Target selection chooses the destination structure.'),
    choice('A neuron initially fires during tests of either eye. After early right-eye deprivation, it fires mainly during the left-eye test. What changed?', ['Physiological ocular preference', 'The width of its labelled terminal stripe', 'The number of retinal ganglion cells'], 0, 'The observed change is in stimulus-evoked firing. The test does not label terminals or count retinal cells.'),
    choice('Which finding in mice supports a role for inhibition in setting the duration of ocular dominance plasticity?', ['Faster inhibitory maturation prolonged the window', 'Faster inhibitory maturation shortened the window', 'Faster inhibitory maturation left the window unchanged'], 1, 'Bear p. 819 describes a shorter window with accelerated GABAergic maturation.'),
    truth('Adult visual cortical plasticity disappears when the developmental critical period ends.', false, 'False. Some local changes in synaptic efficacy remain possible, under more restricted conditions.'),
    explain('Two eyes still send spikes, but they seldom drive the same cortical cell at the same time. Explain why losing binocular responses in this case implicates competition.',
      'Both inputs are active, but their timing relative to cortical firing differs.', 'Better coordinated inputs can retain influence while poorly coordinated competitors weaken, reducing binocularity.'),
    explain('In a mature preparation, a previously effective pairing protocol no longer induces lasting changes at the synapse, even when it reaches the cortical neuron. Give one chapter hypothesis and explain how it limits change.',
      'Maturation of synaptic transmission can alter the elementary machinery for plasticity.', 'Changes such as altered NMDA receptor properties can change which activity patterns induce LTP or LTD.'),
  ]),
];

const judgmentSets = [
  [
    ['Nearby ganglion cells in one retina can fire together before patterned vision begins.', true, 'Spontaneous retinal waves produce correlated activity within an eye.'],
    ['Initial projections from the two eyes already occupy fully separate LGN territories.', false, 'The projections initially overlap. They refine into eye-specific territories during development.'],
    ['Blocking spontaneous retinal firing can disrupt eye-specific segregation in the LGN.', true, 'The blockade removes the activity that helps refine the projections.'],
    ['Asynchronous stimulation after suppressing retinal firing produces mostly binocular cortical responses.', false, 'Asynchronous stimulation concentrates responses near the eye-specific ends of the dominance scale.'],
  ],
  [
    ['Wider labelled stripes in layer IV indicate that the labelled input occupies more territory.', true, 'The tracer marks the distribution of geniculate terminals serving one eye.'],
    ['A layer III spike recording directly measures the width of geniculate terminal stripes.', false, 'The recording measures evoked firing. Terminal territory is measured anatomically in layer IV.'],
    ['Removing both modulatory inputs on slide 46 magnifies the usual shift after deprivation.', false, 'Without both inputs, deprivation has much less effect on binocular connections.'],
    ['After early deprivation, a previously binocular layer III neuron can respond only to the open eye.', true, 'This is the functional change illustrated by the ocular dominance shift.'],
  ],
  [
    ['All plasticity in visual cortex disappears when the developmental critical period ends.', false, 'Adults can still show more restricted changes in synaptic efficacy.'],
    ['Fluoxetine reopened a critical-period-like window in the mouse model shown in the lecture.', true, 'The lecture describes a recovery result in mice.'],
    ['The human trial demonstrated an acuity benefit from adding fluoxetine to the shared treatment.', false, 'Adding fluoxetine did not show a benefit over placebo under the shared conditions.'],
    ['A mature circuit can retain local synaptic plasticity after losing the ability to remodel large axonal arbors.', true, 'The chapter distinguishes local changes in efficacy from large-scale structural rearrangement.'],
  ],
];

const mockExams = secondEditionPapers.map((exam, paperIndex) => ({
  ...exam,
  revision: 3,
  instructions: 'Ten one-point problems. Choose one answer for each single-answer problem and mark each statement in the true/false set. Write one or two sentences for each explanation. Submit to see the key and self-mark the written responses.',
  questions: exam.questions.map(question => {
    const id = question.id.replace('-v2-', '-v3-');
    if (question.kind === 'trueFalse') {
      const rows = judgmentSets[paperIndex];
      return {
        id,
        kind: 'trueFalse',
        prompt: ['Early retinal activity', 'Measuring ocular dominance', 'Plasticity beyond development'][paperIndex],
        statements: rows.map(([text, correct]) => ({ text, correct })),
        markScheme: rows.map(([, correct, reason]) => ({ points: 0.25, text: `${correct ? 'True' : 'False'}. ${reason}` })),
      };
    }
    if (id === 'l10-paper-v3-c09') {
      return { id, ...explain('In a young visual cortex, two inputs still fire. Input A tends to fire just before the cortical cell spikes, while input B usually fires out of sync. Which input is more likely to retain influence, and how does this illustrate competition?',
        'Input A is more likely to retain influence because its activity is better coordinated with the cortical response.',
        'Input B remains active but is less well coordinated with the target and can weaken relative to A.') };
    }
    if (id === 'l10-paper-v3-a04') {
      return { ...question, id, choices: ['Glutamate receptors cluster', 'Adhesion molecules disperse', 'Vesicles and active-zone proteins gather'] };
    }
    if (id === 'l10-paper-v3-b07') {
      return { ...question, id, choices: ['More AMPA receptors at the synapse', 'Fewer AMPA receptors at the synapse', 'No change in AMPA receptor number'] };
    }
    return { ...question, id };
  }),
}));

const entry = registry.find(({ id }) => id === 'L10');
export default {
  meta: { ...entry, examLabel: 'Expected mini-exam', pages: [
    { chapter: 23, from: 785, to: 790 }, { chapter: 23, from: 795, to: 819 },
  ] },
  objectives: [
    'Distinguish neuronal proliferation, migration and differentiation.',
    'Trace the decisions by which axons find targets and assemble synapses.',
    'Explain how trophic support and activity refine developing circuits.',
    'Interpret visual development experiments and connect their outcomes to synaptic plasticity.',
  ],
  prerequisites: [
    { lectureId: 'L03', text: 'Synaptic transmission and receptor mechanisms' },
    { lectureId: 'L04', text: 'The retina, LGN and visual cortex' },
    { lectureId: 'L07', text: 'Diffuse modulatory systems' },
  ],
  sections,
  overview: {
    estimate: 'Core path design estimate: 20–30 minutes.',
    pitfalls: 'The homework mechanisms are in their topic sections. Use the optional recap to practise recalling them.',
  },
  standardPractice: 'mc-only',
  recap: {
    title: 'Before the exam',
    optional: true,
    intro: 'Use these cues to retrieve each explanation before revisiting its subsection.',
    terms: [
      ['HW5 2(b)', 'Placement → specialised properties → circuit function.'],
      ['HW5 2(c)', 'Route → structure → cells.'],
      ['HW5 3(a)', 'Excess inputs → finite target support → survival threshold → matched population.'],
      ['HW5 3(b)', 'Residual spikes → modest calcium → fewer surface AMPA receptors.'],
      ['HW5 3(c)', 'Retrieve two limits from arbor growth, synaptic maturation and cortical activation.'],
      ['Directional checks', 'Deep → superficial. Apical dendrite toward its cue, axon away. Open eye gains territory and response preference. Human trial: no added drug benefit.'],
    ].map(([term, definition]) => ({ term, definition })),
  },
  optionalPractice,
  lectureQuiz,
  mockExams,
  previousMockExams: [...previousMockExams, ...secondEditionPapers],
};
