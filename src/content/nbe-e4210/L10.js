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
const route = diagram('route', 'The two projection steps between the retina and striate cortex.',
  visualRoute, 'Retinal ganglion cells project to the LGN. LGN neurons project to layer IV of striate cortex.');
const unlabelledRoute = diagram('route-quiz', 'Three stations in the visual route, from input toward cortex.',
  visualRoute, 'Three blank boxes form a descending sequence.', true);
const migration = diagram('migration', 'Deep cortical layers settle before more superficial layers.',
  [
    ['Ventricular zone', 'Dividing precursors give rise to neuroblasts. Many migrate along radial glial fibres.'],
    ['Transient subplate', 'Early arrivals settle here and receive early thalamic input.'],
    ['Deep layers VI and V', 'Early cortical plate cohorts become the deep layers.'],
    ['Layers IV, III and II', 'Later cohorts pass earlier cortical plate neurons to settle closer to the surface.'],
  ], 'Early arrivals form the subplate. Cortical plate generations then settle from deep to superficial.');
const guidance = diagram('guide', 'Three successive decisions at different scales.',
  [
    ['Pathway', 'At a choice point such as the optic chiasm, take the appropriate route.'],
    ['Target', 'Enter the lateral geniculate nucleus, the correct structure in this projection.'],
    ['Address', 'Select the appropriate cells within that nucleus.'],
  ], 'Route choice precedes choice of target structure and then choice of cells within it.');
const survival = diagram('survival', 'Competition links survival to the available target support.',
  [
    ['Many developing inputs', 'Developing neurons initially outnumber those the target can support.'],
    ['Limited target support', 'Target-derived neurotrophins suppress the apoptotic programme in neurons receiving sufficient support.'],
    ['Fewer surviving neurons', 'Insufficiently supported neurons undergo apoptosis. Surviving inputs better match target capacity.'],
  ], 'Initial excess neurons compete for target-derived trophic support. Neurons with insufficient support die.');
const ltd = diagram('ltd', 'One activity-dependent route to persistent weakening.',
  [
    ['Poorly correlated input', 'Residual input arrives with weak postsynaptic depolarisation.'],
    ['Modest calcium entry', 'Weak NMDA receptor activation can produce an LTD-inducing calcium signal.'],
    ['Fewer surface AMPA receptors', 'AMPA receptor internalisation can reduce the postsynaptic response to future glutamate release.'],
  ], 'Weak coincidence can yield modest NMDA-mediated calcium entry, AMPA receptor removal and synaptic weakening.');
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
function schematic(caption, fallbackAlt, height, contents) {
  return {
    type: 'svg', caption, fallbackAlt,
    markup: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 ${height}" width="360" height="${height}" style="display:block;width:100%;max-width:360px;height:auto;margin:auto" font-family="system-ui" font-size="14" fill="#193545">
      <rect width="360" height="${height}" rx="10" fill="#f7fafb"/>${contents}</svg>`,
  };
}
const layers = schematic('A later cohort passes earlier cortical plate cells. The subplate receives early thalamic input.',
  'From deep to superficial, this schematic shows the ventricular zone, subplate, layers VI to II and the marginal zone. An upward radial path crosses earlier layers. An early thalamic axon ends in the subplate.', 236,
  `<g stroke="#7091a0">
    <path d="M16 24h180v30H16z M16 54h180v60H16z M16 114h180v38H16z M16 152h180v38H16z M16 190h180v30H16z" fill="#e5eff3"/>
    <path d="M16 76h180m-180 19h180" stroke-dasharray="4 4"/>
  </g>
  <path d="M47 207V66l-5 8m5-8 5 8M198 171h138m-138 0 8-5m-8 5 8 5" fill="none" stroke="#1b6782" stroke-width="2"/>
  <text x="65" y="44">Marginal zone</text><text x="65" y="74">II and III</text><text x="65" y="93">IV</text><text x="65" y="112">V</text>
  <text x="65" y="139">VI</text><text x="65" y="177">Subplate</text><text x="65" y="211">Ventricular zone</text>
  <text x="210" y="81">Later neuroblast</text><text x="210" y="102">passes older cells</text><text x="210" y="156">Early thalamic input</text>`);
const stripes = schematic('Layer IV territory becomes biased toward the eye that stays open after early deprivation.',
  'Balanced alternating terminal bands in the comparison are followed by broader open-eye bands and narrower deprived-eye bands in the deprived condition. The diagram shows relative widths only.', 155,
  `<text x="15" y="26">Balanced input</text><text x="15" y="82">After early monocular deprivation</text>
    <path d="M15 34h330v24H15z M15 90h330v24H15z" fill="#dce9ee"/>
    <path d="M15 34h55v24H15z M125 34h55v24h-55z M235 34h55v24h-55z
      M15 90h86v24H15z M125 90h86v24h-86z M235 90h86v24h-86z" fill="#3d7891"/>
    <rect x="15" y="128" width="14" height="14" fill="#3d7891"/><text x="35" y="140">Open eye</text>
    <rect x="158" y="128" width="14" height="14" fill="#dce9ee"/><text x="178" y="140">Other eye</text>`);
const coincidence = schematic('Glutamate is present in both conditions. Depolarisation changes whether the NMDA pore passes calcium.',
  'Two NMDA pores bind glutamate. The resting pore is blocked by magnesium. Depolarisation removes the block and calcium enters.', 184,
  `<text x="93" y="28" text-anchor="middle">Resting voltage</text><text x="267" y="28" text-anchor="middle">Depolarised</text>
  <text x="93" y="53" text-anchor="middle">Glutamate bound</text><text x="267" y="53" text-anchor="middle">Glutamate bound</text>
  <path d="M14 93h147m38 0h147M14 117h147m38 0h147" stroke="#7091a0"/>
  <path d="M65 75h15v58H65z M106 75h15v58h-15z M239 75h15v58h-15z M280 75h15v58h-15z" fill="#3d7891"/>
  <circle cx="93" cy="103" r="12" fill="#f1c49c"/><path d="M267 78v65m-5-6 5 6 5-6" fill="none" stroke="#193545" stroke-width="2"/>
  <text x="93" y="164" text-anchor="middle">Magnesium blocks</text><text x="267" y="164" text-anchor="middle">Calcium enters</text>`);

const section = (id, title, blocks, prompt, correct, rows) => ({
  id, title, blocks, conceptQuiz: [{ id: `l10-c-${id}`, prompt, correct, options: options(rows) }],
});

const sections = [
  section('initial-wiring', 'Initial wiring and refinement', [
    block('Genetic guidance establishes most initial connections. Spontaneous neural activity and later sensory experience refine the arrangement. The visual system shows how these stages work together.'),
    figure(route),
  ], 'Which structure relays retinal output to striate cortex?', 1, [
    ['Colliculus in the midbrain', 'The superior colliculus is a different retinal target.'],
    ['Lateral geniculate nucleus', 'The LGN is the thalamic relay in this pathway.'],
    ['Primary visual cortex (V1)', 'Striate cortex receives the LGN projection.'],
  ]),
  section('precursors', 'Proliferation and cell fate', [
    steps('The ventricular zone in the deck’s model',
      'Within the precursor, the nucleus moves away from the ventricular surface during the cycle and returns there for mitosis.',
      'Early vertical cleavage can expand the precursor pool. Later asymmetric division in the horizontal-cleavage model yields a daughter that leaves and a daughter that continues dividing.',
      'Notch-1 and Numb partition differently in the illustrated asymmetric division. They are upstream regulators of gene expression and fate.'),
    detail('Five positions in the slide 8 diagram', 'The early wall has a ventricular zone facing the ventricle and a marginal zone facing the pia. A precursor extends a process toward the pia. Its nucleus moves outward during DNA replication, returns to the ventricular surface, and the cell retracts its process before dividing.'),
    block('A daughter’s fate depends on precursor age, position in the ventricular zone and local environment at division. Slide 10 assigns Notch-1 to the departing daughter and Numb to the remaining daughter in its schematic.'),
  ], 'Where does cleavage occur in the proliferation diagram?', 0, [
    ['At the ventricular surface', 'The precursor nucleus returns here for mitosis.'],
    ['At the outer pial surface', 'Nuclear movement toward the outer surface is part of the cycle before division.'],
    ['In the settling cortical plate', 'The diagram places precursor division in the ventricular zone.'],
  ]),
  section('migration', 'Migration and the early subplate', [
    block('A neuroblast is an immature neuron. Many reach the cortical plate along radial glial fibres. Some neurons originate from radial glia, and the chapter’s schematic account places about one third on tangential routes.'),
    figure(layers),
    figure(migration),
    block('The subplate is an early, transient layer with glutamatergic and GABAergic neurons and electrical and chemical connections. It receives early thalamic input and contributes to early cortical activity, wiring and plasticity.'),
    detail('Reading the thalamocortical figures', 'Slides 18–19 show thalamic fibres radiating to cortical targets. The visual projection provides one example. The subplate is particularly vulnerable to hypoxia–ischemia. Its disappearance in slide 15 summarises loss of the transient layer during development.'),
  ], 'Which population receives the early thalamocortical input shown in the deck?', 2, [
    ['Dividing ventricular precursors', 'Ventricular precursors supply developing neurons.'],
    ['Late layer II cortical neurons', 'The outer layer II cohort settles later.'],
    ['Transient subplate neurons', 'The subplate is an early recipient of thalamic input.'],
  ]),
  section('differentiation', 'Differentiation and adult neurogenesis', [
    block('<dfn>Migration</dfn> changes where a neuron is. <dfn>Differentiation</dfn> changes its properties, including its gene expression, shape and processes. A correctly positioned cell still needs the appropriate structure and signalling machinery to join the circuit.'),
    steps('Developing cellular characteristics',
      'Differentiation begins as a precursor becomes a neuroblast and continues in the cortical plate.',
      'Neurons appear before astrocytes and oligodendrocytes in the sequence shown.',
      'Developing neurites respond to local cues. In the example, semaphorin 3A from the marginal zone attracts the apical dendrite and repels the extending axon.'),
    detail('Adult neurogenesis examples', 'The slides associate enrichment and running with adult neurogenesis in animal studies and report a correlation with hippocampal memory performance. They also cite a macaque association-cortex report and discuss proposed links to stress, sleep and disease. The examples differ by species and region and do not establish universal adult cortical neurogenesis or causation.'),
  ], 'Which observation describes differentiation?', 1, [
    ['A neuroblast travels along radial glia', 'This is movement toward a destination.'],
    ['A neuron develops its apical dendrite', 'The neuron is acquiring a specialised form.'],
    ['A young cell passes an older cohort', 'This is a step in inside-out migration.'],
  ]),
  section('guidance', 'Growth cones and guidance decisions', [
    figure(guidance),
    block('A <dfn>growth cone</dfn> samples the local environment with filopodia. Guidance can use direct contact, extracellular matrix cues or diffusible chemicals. Cues can attract or repel, depending on the responding process.'),
    detail('Fasciculation', 'An axon can grow along another axon. The slide contrasts cell adhesion molecules between axons with adhesion to matrix cues such as laminin. As pathways form, action potentials and synaptic transmission add another means of communication.'),
  ], 'Selecting the cells to contact within the LGN is which decision?', 0, [
    ['Address selection', 'The axon is choosing cells within a target.'],
    ['Pathway selection', 'Pathway selection concerns the route taken.'],
    ['Target selection', 'Target selection concerns the destination structure.'],
  ]),
  section('synaptogenesis', 'Building synapses and a retinotopic map', [
    steps('Formation of a CNS synapse',
      'A dendritic filopodium contacts an axon.',
      'Synaptic vesicles and active-zone proteins gather on the presynaptic side.',
      'Postsynaptic receptors accumulate. Adhesion molecules help hold the contact together.'),
    block('Retinal axons reach the LGN, and geniculate axons reach layer IV of striate cortex. In both projections, nearby visual locations are represented in an orderly arrangement. This is <dfn>retinotopy</dfn>.'),
  ], 'Which component accumulates on the receiving side of the new synapse?', 2, [
    ['Transmitter storage vesicles', 'Vesicles collect on the transmitting side.'],
    ['Presynaptic active-zone proteins', 'These proteins organise the release site on the transmitting side.'],
    ['Neurotransmitter receptors', 'Receptors on the receiving side detect the released transmitter.'],
  ]),
  section('reduction', 'Trophic competition and synaptic pruning', [
    figure(survival),
    block('Nerve growth factor (NGF) and brain-derived neurotrophic factor (BDNF) are examples of neurotrophins. <dfn>Apoptosis</dfn> is programmed disassembly of the cell. <dfn>Pruning</dfn> removes a connection and can leave the parent neuron alive.'),
    detail('Muscle innervation', 'Early in development several motor neurons can innervate one muscle fibre. One input remains. Postsynaptic acetylcholine receptor loss precedes retraction of losing branches in the illustrated example. Local receptor blockade can also promote elimination. The deck reports roughly 50% greater synaptic capacity in immature neurons as context.'),
  ], 'Which event is apoptosis?', 1, [
    ['Withdrawal of one input branch', 'A branch can disappear while the neuron survives.'],
    ['Programmed death of a neuron', 'Apoptosis eliminates the cell itself.'],
    ['Rearrangement of retained inputs', 'Rearrangement changes the pattern of connections.'],
  ]),
  section('segregation', 'Neural activity and eye-specific segregation', [
    block('Refinement can redistribute inputs without changing their total number. Hebbian plasticity favours inputs that help drive the target at the same time. Relatively out-of-sync inputs can lose influence.'),
    block('Retinal waves correlate nearby activity within an eye before vision. When the two eyes are active asynchronously, their LGN inputs can segregate into alternating eye-dominated stripes in cortical layer IV. Slide 40 illustrates spontaneous activity through preterm EEG, a different recording from retinal imaging.'),
    figure(population),
    detail('Selection and pruning on slide 37', 'The diagram distinguishes the choice of partners from later removal of duplicate connections. It illustrates three influences on selection: readiness to form a synapse, dynamics of contacts, and molecular recognition.'),
    detail('The stimulation comparison on slide 42', 'With spontaneous retinal firing suppressed in the experiment, synchronous stimulation supported more binocular responses. Asynchronous stimulation favoured responses dominated by either eye. The horizontal scale is eye preference, so peaks at both ends indicate two largely eye-specific populations.'),
  ], 'Where are the eye-dominated stripes discussed here?', 2, [
    ['In layer II of striate cortex', 'The stripes on the slide reflect geniculate wiring into layer IV.'],
    ['In layer III of striate cortex', 'Layer III is used later to discuss binocular convergence.'],
    ['In layer IV of striate cortex', 'Geniculate inputs segregate into eye-dominated stripes there.'],
  ]),
  section('deprivation', 'Monocular deprivation and critical periods', [
    steps('Three readouts of deprivation',
      'In macaque layer IV, the open-eye terminal territory expands after early long-term deprivation.',
      'In cat layer III, binocular responses shift toward the open eye after early deprivation.',
      'A single neuron on slide 45 loses its response to its deprived right eye after 17 hours. This measures a response change.'),
    figure(stripes),
    block('Norepinephrine from locus coeruleus and acetylcholine from basal forebrain facilitate the shift in the illustrated study. When these influences are removed, monocular deprivation has little effect on binocular cortical connections.'),
    detail('Why the window closes', 'A <dfn>critical period</dfn> is a developmental window of high susceptibility to a given experience. Bear proposes reduced axon growth, maturation of synaptic plasticity mechanisms and stronger constraints on cortical activation. Respectively, these can restrict arbor changes, alter the capacity for LTP or LTD, and keep activity below the level needed to induce plasticity. The rodent P25–30 illustration does not give a human age range.'),
  ], 'Which eye gains cortical territory after early long-term monocular deprivation?', 0, [
    ['The eye that stays open', 'Its cortical input territory expands in the layer IV example.'],
    ['The eye that was closed', 'Deprived-eye inputs lose territory in the illustrated comparison.'],
    ['Both eyes to the same extent', 'The result reflects an imbalance in available visual experience.'],
  ]),
  section('amblyopia', 'Amblyopia and the adult training trial', [
    block('Amblyopia involves reduced visual acuity and altered cortical processing. The lecture uses it to ask whether visual plasticity can be enhanced after development.'),
    steps('From animal result to human test',
      'The rodent example pairs fluoxetine with altered visual experience and reports critical-period-like plasticity.',
      'The human trial compared fluoxetine and placebo alongside patching and game-like perceptual training. The game also tracked training compliance.',
      'Acuity improved under the study conditions. Fluoxetine showed no added benefit over placebo. The result does not isolate the effect of games from the other shared components.'),
  ], 'What did the human comparison show about added fluoxetine?', 1, [
    ['It selectively restored cortical stripes', 'The trial measured visual performance, not restoration of stripes.'],
    ['It showed no added acuity benefit', 'Acuity improved without a demonstrated advantage over placebo.'],
    ['It prevented gains from the training', 'The comparison did not demonstrate prevention of training gains.'],
  ]),
  section('plasticity', 'NMDA coincidence, LTP and LTD', [
    block('Glutamate activates postsynaptic receptors including AMPA, NMDA and metabotropic glutamate receptors. At rest, magnesium blocks most current through NMDA receptors even when glutamate binds. Sufficient depolarisation relieves the block, allowing calcium entry.'),
    block('<dfn>Long-term potentiation</dfn> (LTP) is a persistent increase in synaptic effectiveness. Strong coincidence can produce a calcium signal that promotes AMPA receptor recruitment. <dfn>Long-term depression</dfn> (LTD) is a persistent decrease. Under some activity patterns, a smaller calcium rise can favour receptor removal.'),
    figure(coincidence),
    figure(ltd),
    detail('Other questions on the final teaching slide', 'Synaptic homeostasis and excitation–inhibition balance concern stability as individual inputs change. The slide raises these mechanisms as questions. The homework reading develops the NMDA-dependent potentiation and depression examples.'),
  ], 'What relieves the NMDA receptor magnesium block in the illustrated mechanism?', 2, [
    ['Release of glutamate by itself', 'At resting voltage glutamate can bind while the pore remains blocked.'],
    ['Removal of surface AMPA receptors', 'Receptor removal can be downstream of LTD-inducing activity.'],
    ['Sufficient postsynaptic depolarisation', 'Depolarisation displaces the magnesium block.'],
  ]),
];

const q = (id, type, difficulty, prompt, fields, ...modelAnswer) =>
  ({ id: `l10-q-${id}`, type, difficulty, points: 1, prompt, ...fields, modelAnswer });

const lectureQuiz = [
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
      { text: 'Loss of right-eye-evoked spikes in one cortical neuron', group: 'Physiological response', explanation: 'This measures a change in excitability to the stimulus.' },
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

// The three papers follow the ten-problem, one-point format of Mini Exam 8.
const paperQuestion = (id, prompt, ...answers) => ({
  id: `l10-paper-${id}`, prompt: Array.isArray(prompt) ? prompt : [prompt],
  markScheme: answers.map(text => ({ points: 1 / answers.length, text })),
});
const paper = (version, coverage, questions) => ({
  id: `l10-paper-${version}`, format: 'paper', title: `Mini-exam ${version}`, coverage, questions,
});
const mockExams = [
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
  recap: {
    intro: 'Review the developmental stages and the evidence that distinguishes them.',
    terms: [
      ['Inside-out layering', 'Subplate forms first. The cortical plate cohorts then settle in layers VI, V, IV, III and II, in that order.'],
      ['Migration and differentiation', 'Placement and acquisition of specialised properties are separate requirements.'],
      ['Guidance decisions', 'Route, target structure, then cells within that structure.'],
      ['Synapse formation', 'Filopodium contact, presynaptic assembly, postsynaptic receptor recruitment.'],
      ['Trophic support', 'Limited target support suppresses apoptosis in sufficiently supported neurons.'],
      ['Pruning', 'Selective loss of excess synaptic connections.'],
      ['Ocular dominance', 'Within-eye correlations and between-eye asynchrony support segregation.'],
      ['Deprivation', 'Early deprivation favours the open eye in structural and physiological readouts.'],
      ['Critical period', 'Limited window for a given change. Arbor growth, synaptic maturation and cortical activation can restrict it.'],
      ['NMDA coincidence', 'Glutamate binding plus depolarisation admits calcium.'],
      ['LTP and LTD', 'Persistent strengthening or weakening. In the visual cortical model, AMPA receptor availability can rise or fall.'],
    ].map(([term, definition]) => ({ term, definition })),
  },
  lectureQuiz,
  mockExams,
};
