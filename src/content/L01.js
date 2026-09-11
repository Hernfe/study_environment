// Lecture 1: neuroscience, neurons and glia, structure of the nervous
// system. Scope: docs/scope/L01.md. Every section and question traces
// to a line in that file.

import { brainLateral, REGIONS } from './figures/brain-lateral.js';
import { neuron, NEURON_REGIONS } from './figures/neuron.js';
import {
  astrocyteFigure,
  oligodendrocyteFigure,
  schwannFigure,
  microgliaFigure,
  gliaOverview,
  stainPanel,
  stainTriptych,
} from './figures/cells.js';

// Explanations for the cortical map, keyed by the region keys in
// figures/brain-lateral.js. Wording follows the slides.
const LOBE_INFO = {
  frontal: 'Anterior to the central sulcus and above the lateral fissure. Holds the motor areas (precentral gyrus, premotor and supplementary motor areas) and the prefrontal association cortex.',
  parietal: 'Behind the central sulcus. Holds the somatosensory cortex in the postcentral gyrus and the posterior parietal association cortex.',
  occipital: 'The back of the cerebrum. Holds the visual cortex.',
  temporal: 'Below the lateral fissure. Holds the auditory cortex on the superior temporal gyrus and the inferotemporal association cortex.',
  insula: 'Cortex buried inside the lateral fissure. Seen only when the frontal, parietal and temporal edges of the fissure are pulled apart. The gustatory cortex is here.',
  'central-sulcus': 'The groove between the frontal and parietal lobes. The precentral gyrus is just anterior, the postcentral gyrus just posterior.',
  'lateral-fissure': 'The deep groove (Sylvian fissure) that separates the temporal lobe from the frontal and parietal lobes. The insula lies inside it.',
  precentral: 'The gyrus immediately anterior to the central sulcus. Primary motor cortex, which controls voluntary movement.',
  postcentral: 'The gyrus immediately posterior to the central sulcus. Primary somatosensory cortex, which handles touch.',
  'superior-temporal': 'The gyrus just below the lateral fissure. The auditory cortex is on its upper surface.',
  cerebellum: 'Sits below the posterior cerebrum, with fine parallel folds. Part of the gross anatomy list on the slide.',
  brainstem: 'The stalk under the cerebrum. Contains the midbrain, pons and medulla, carries the main ascending and descending pathways, and continues into the spinal cord.',
  'olfactory-bulb': 'Small structure on the ventral surface under the frontal lobe. Receives primary olfactory input.',
};

const FUNCTIONAL_INFO = {
  motor: 'Primary motor cortex, Brodmann area 4, in the precentral gyrus. Controls voluntary movement.',
  premotor: 'Premotor area, part of area 6, anterior to the primary motor cortex. A motor area involved in planning movement.',
  sma: 'Supplementary motor area, also area 6, on the upper and medial part of the frontal lobe in front of area 4.',
  somatosensory: 'Somatosensory cortex, areas 3, 1 and 2, in the postcentral gyrus. Touch and body sensation.',
  'posterior-parietal': 'Posterior parietal cortex, areas 5 and 7. Association cortex behind the somatosensory area.',
  visual: 'Visual cortex, areas 17, 18 and 19, in the occipital lobe. Area 17 is primary visual cortex (V1).',
  auditory: 'Auditory cortex, areas 41 and 42, on the superior temporal gyrus, partly hidden in the lateral fissure.',
  gustatory: 'Gustatory cortex, area 43, for taste. Buried in the insula and the parietal operculum.',
  inferotemporal: 'Inferotemporal cortex, areas 20, 21 and 37. Association cortex on the lower temporal lobe.',
  prefrontal: 'Prefrontal cortex, the association cortex of the frontal lobe in front of the motor areas.',
};

const BRODMANN_INFO = {
  b4: 'Area 4: primary motor cortex, precentral gyrus.',
  b6: 'Area 6: premotor area and supplementary motor area, anterior to area 4.',
  b8: 'Area 8: frontal lobe, anterior to area 6. Prefrontal cortex on the slide map.',
  b9: 'Area 9: lateral prefrontal cortex.',
  b10: 'Area 10: the frontal pole, prefrontal cortex.',
  b46: 'Area 46: lateral prefrontal cortex, below area 9.',
  b45: 'Area 45: inferior frontal gyrus, prefrontal cortex.',
  b11: 'Area 11: the lower (orbital) frontal surface.',
  b312: 'Areas 3, 1 and 2: somatosensory cortex, postcentral gyrus.',
  b5: 'Area 5: posterior parietal cortex, behind the postcentral gyrus.',
  b7: 'Area 7: posterior parietal cortex, upper parietal lobe.',
  b17: 'Area 17: primary visual cortex (V1), at the occipital pole and on the medial surface.',
  b18: 'Area 18: secondary visual cortex (V2), surrounding area 17.',
  b19: 'Area 19: visual cortex, surrounding area 18.',
  b41: 'Areas 41 and 42: auditory cortex, on the superior temporal gyrus.',
  b22: 'Area 22: superior temporal gyrus, around the auditory areas.',
  b21: 'Area 21: middle temporal gyrus. Part of the inferotemporal cortex on the slide.',
  b20: 'Area 20: inferior temporal gyrus. Part of the inferotemporal cortex.',
  b37: 'Area 37: posterior temporal lobe, near the occipital lobe. Part of the inferotemporal cortex.',
  b38: 'Area 38: the temporal pole.',
  b43: 'Area 43: gustatory cortex, in the operculum near the insula.',
};

const withInfo = (list, info) => list.map((r) => ({ key: r.key, name: r.label, info: info[r.key] || '' }));

const CORTEX_LAYERS = [
  { key: 'lobes', label: 'Lobes and landmarks', regions: withInfo(REGIONS.lobes, LOBE_INFO) },
  { key: 'functional', label: 'Functional areas', regions: withInfo(REGIONS.functional, FUNCTIONAL_INFO) },
  { key: 'brodmann', label: 'Brodmann numbers', regions: withInfo(REGIONS.brodmann, BRODMANN_INFO) },
];

function cortexMap(defaultLayer) {
  return {
    figure: brainLateral,
    layers: CORTEX_LAYERS,
    defaultLayer,
    labels: true,
    intro: 'Hover, tap or pick a region to read what it is. Switch layers to see lobes, functional areas or Brodmann numbers.',
    layerLabel: 'Show',
    selectLabel: 'Region',
    placeholder: 'Choose a region',
  };
}

const NEURON_INFO = {
  dendrites: 'Branching neurites that receive most of the synaptic input. Their membrane carries receptors for neurotransmitter. Rarely longer than 2 mm, they taper to a point.',
  soma: 'The cell body, about 20 micrometres across. Holds the nucleus and the organelles that make proteins and energy. The Nissl stain shows this part.',
  nucleus: 'Contains the chromosomes and DNA. Genes are read here (transcription) into mRNA, which leaves through pores to be translated into protein.',
  'axon-hillock': 'Where the axon begins, tapering away from the soma into the initial segment of the axon.',
  axon: 'The single output fibre. Uniform diameter, up to a metre long, no ribosomes, so all its proteins come from the soma. Carries action potentials.',
  'axon-collateral': 'A branch of the axon, usually leaving at a right angle. Lets one neuron reach several targets.',
  'axon-terminal': 'The end of the axon (terminal bouton), swollen and full of synaptic vesicles and mitochondria. Releases neurotransmitter onto the target cell.',
  synapse: 'The point of contact between the terminal and a target cell. The gap between them is the synaptic cleft. Information flows from presynaptic terminal to postsynaptic membrane.',
};

export default {
  meta: {
    id: 'L01',
    number: 1,
    title: 'Neuroscience, neurons and glia, structure of the nervous system',
    chapters: [1, 2, 7],
    pages: [
      { chapter: 1, from: 11, to: 21 },
      { chapter: 2, from: 24, to: 52 },
      { chapter: 5, from: 110, to: 117 },
      { chapter: 7, from: 220, to: 224 },
    ],
    lectureDate: '2026-09-02',
    examDate: '2026-09-18',
  },

  objectives: [
    'Explain how spatial scale, temporal scale, and the choice of method limit a neuroscience observation or claim.',
    'Define nodes and edges in a brain network and distinguish structural from functional connectivity.',
    'Use neuroanatomical directions, section planes, cortical landmarks, and lobes to describe location.',
    'Compare what Nissl staining, Golgi staining, and electron microscopy reveal.',
    'Outline chemical synaptic transmission from the presynaptic action potential to the postsynaptic response.',
    'Explain how axonal transport and glial cells support neuronal signaling.',
  ],

  prerequisites: [
    { text: 'The main parts of a cell: membrane, nucleus, cytoplasm, proteins made from genes.' },
    { text: 'The words node and edge as used for any network (points joined by links).' },
    { text: 'Keep a labelled brain figure open while learning the direction terms; they are hard to learn from text alone.' },
  ],

  sections: [
    // 1 -----------------------------------------------------------------
    {
      id: 'scales',
      title: 'Scales of the brain and the brain as a network',
      body: [
        'Brain research works across a huge range of spatial scales. At the small end are proteins and chromosomes, measured in nanometres. Then come synapses and cells in micrometres, microcircuits and brain regions in millimetres, the whole brain in centimetres, and the body in metres.',
        'Function has its own ladder of time scales. Molecular dynamics take picoseconds. Vesicle release and the action potential take microseconds to milliseconds. Metabolism and synaptic plasticity run over seconds to minutes. Learning takes hours, behaviour days, and development and aging years.',
        'A method sees only one part of these ladders. A result applies to the scale and time window that was measured, and a claim should say which.',
        'The brain can be described as a network at any scale. A network is a set of nodes joined by edges. At the cellular scale a node is a neuron and an edge is a synapse or an axon. At the regional scale a node is a brain area and an edge is an anatomical pathway, or a statistical relationship between the activity of two areas.',
        'Structural connectivity means anatomical connections. Functional connectivity means that the signals of two nodes vary together over time. Functional connectivity is a relationship between measurements. It does not by itself prove that an anatomical pathway exists.',
        'The measured network also depends on analysis choices: how the brain is divided into nodes, what threshold counts as an edge, and which time window and resolution are used. The slide adds a topological axis (local, meso-scale, global) and a temporal axis (instantaneous, development and lifespan, evolutionary).',
      ],
      keyTerms: ['spatial scale', 'time scale', 'network', 'node', 'edge', 'structural connectivity', 'functional connectivity'],
      visual: {
        type: 'svg',
        name: 'scales-ladder',
        props: {},
        caption: 'The two ladders from the slide. Structure runs from body to proteins; function from development and aging to molecular dynamics.',
        fallbackAlt: 'Two vertical ladders. Left, spatial scale from metres (body) down to nanometres (proteins). Right, time scale from years (development and aging) down to picoseconds (molecular dynamics).',
      },
      conceptQuiz: [
        {
          id: 'scales-1',
          prompt: 'At the cellular scale, what are the nodes and edges of a brain network?',
          options: [
            { text: 'Neurons and the synapses or axons between them', feedback: 'Correct. Cells are the nodes, their contacts the edges.' },
            { text: 'Brain regions and the pathways between them', feedback: 'That is the regional scale, one level up.' },
            { text: 'Action potentials and vesicles', feedback: 'Those are events and objects inside a node, not network elements.' },
          ],
          correct: 0,
        },
        {
          id: 'scales-2',
          prompt: 'Which statement about functional connectivity is right?',
          options: [
            { text: 'It is measured from anatomical tracts', feedback: 'That is structural connectivity.' },
            { text: 'It is a statistical relationship between signals measured over time', feedback: 'Correct. It says two signals vary together.' },
            { text: 'It proves that two areas are joined by axons', feedback: 'A common misconception. Correlated signals do not prove a direct pathway.' },
          ],
          correct: 1,
        },
        {
          id: 'scales-3',
          prompt: 'Which of these happens on the shortest time scale?',
          options: [
            { text: 'Learning', feedback: 'Learning takes hours on the slide ladder.' },
            { text: 'Synaptic plasticity', feedback: 'Minutes. Faster than learning but not the fastest.' },
            { text: 'The action potential', feedback: 'Correct. Milliseconds.' },
            { text: 'Development', feedback: 'Years. The slowest end of the ladder.' },
          ],
          correct: 2,
        },
      ],
    },

    // 2 -----------------------------------------------------------------
    {
      id: 'disorders',
      title: 'Brain disorders',
      body: [
        'Brain disorders are common and expensive. A European study using 2010 data estimated a cost of about 800 billion euros per year across 30 countries, with about 179 million people affected.',
        'The cost has three parts: health care, non-medical support such as care at home, and lost productivity.',
        'The graph on the slide shows three numbers per disorder: how many people have it, what it costs per person per year, and the total cost. These do not rank the same way.',
        'Anxiety disorders, migraine and mood disorders affect the most people but cost relatively little per person. Brain tumours, multiple sclerosis and stroke affect fewer people but cost the most per person. Mood disorders and dementia have the largest total cost.',
        'The burden of a disorder on a population therefore depends on prevalence, on how much disability and care it causes, and on its wider economic effects. Severity and course still vary a lot between individual patients.',
        'Brain disorders can affect movement, sensation, mood, cognition, communication and independence, because all of these arise from interacting processes across the nervous system. The textbook lists Alzheimer\'s disease, Parkinson\'s disease, depression, schizophrenia, stroke, epilepsy and multiple sclerosis among the major ones.',
        'A mechanistic explanation of a disorder links changes in molecules or cells to altered circuit function and then to symptoms. It should also allow for distributed pathology, compensation by the rest of the system, and variation between patients.',
      ],
      keyTerms: ['prevalence', 'burden', 'mechanistic explanation'],
      visual: {
        type: 'svg',
        name: 'disorder-burden',
        props: {},
        caption: 'Brain disorders in Europe, 2010 data, from the slide. Each column has its own scale. Common disorders cost little per person; rare ones cost a lot per person.',
        fallbackAlt: 'Table of bars for twelve disorders. Anxiety disorders, migraine and mood disorders affect the most people; multiple sclerosis, brain tumour and stroke cost the most per person; mood disorders and dementia have the largest total cost.',
      },
      conceptQuiz: [
        {
          id: 'disorders-1',
          prompt: 'Which group affects the most people in the European data?',
          options: [
            { text: 'Anxiety disorders', feedback: 'Correct. About 61 million people.' },
            { text: 'Dementia', feedback: 'Dementia has one of the largest total costs, but about 6 million people.' },
            { text: 'Brain tumours', feedback: 'Rare, but the cost per person is among the highest.' },
            { text: 'Stroke', feedback: 'About 1.3 million people. High cost per person.' },
          ],
          correct: 0,
        },
        {
          id: 'disorders-2',
          prompt: 'Why does dementia have one of the largest total costs although migraine affects eight times as many people?',
          options: [
            { text: 'Its cost per person is high and it is still fairly common', feedback: 'Correct. Total cost is prevalence times cost per person.' },
            { text: 'It is the most common brain disorder', feedback: 'No. Anxiety, migraine and mood disorders are far more common.' },
            { text: 'It has the highest cost per person of all disorders', feedback: 'Multiple sclerosis, brain tumour and stroke cost more per person.' },
          ],
          correct: 0,
        },
        {
          id: 'disorders-3',
          prompt: 'Which of these is not one of the three cost components counted in the study?',
          options: [
            { text: 'Health care', feedback: 'This is counted.' },
            { text: 'Non-medical support', feedback: 'This is counted, for example care at home.' },
            { text: 'Research funding', feedback: 'Correct. Research is not part of the burden estimate.' },
            { text: 'Lost productivity', feedback: 'This is counted.' },
          ],
          correct: 2,
        },
      ],
    },

    // 3 -----------------------------------------------------------------
    {
      id: 'neuron-counts',
      title: 'Neuron counts and comparative scale',
      body: [
        'A neuron has three main regions. The soma, or cell body, keeps the cell alive and holds the nucleus. The dendrites receive and combine most of the input from other neurons. The axon carries the output toward other cells.',
        'The axon ends in axon terminals that contact target cells at synapses. Collaterals and terminal branches let one axon reach many targets through separate contact sites.',
        'A single neuron can receive input from thousands of nerve fibres. The slide shows one with about 5600 fibres connected to it. The number of synapses varies with cell type, brain region, developmental stage and the counting method.',
        'The human brain has about 86 billion neurons, which form about 100 trillion connections. About 16.3 billion of the neurons are in the cerebral cortex. There are roughly as many glial cells as neurons.',
        'Comparisons between species must use the same anatomical level. The elephant has more neurons than a human in total (the slide gives 251 billion; nearly all of them are in the cerebellum) but only about 5.6 billion cortical neurons, far fewer than the human 16.3 billion.',
        'So whole-brain counts and cortex counts give different rankings. A large cerebellar population and a large cortical population have different functional implications.',
        'Neuron number sets one limit on what a nervous system can do. Cognitive ability also depends on cell types, morphology, connectivity, synaptic strength and the timing of activity. Neuron counts alone do not rank species by intelligence.',
      ],
      keyTerms: ['soma', 'dendrites', 'axon', 'axon terminal', 'synapse'],
      visual: {
        type: 'svg',
        name: 'neuron-counts',
        props: {},
        caption: 'Neuron counts from the slide, in billions. The elephant leads on the whole brain, the human on the cerebral cortex.',
        fallbackAlt: 'Two bar columns for six species. Whole brain: elephant 251, human 86, gorilla 33, chimpanzee 22, rhesus 6, marmoset 0.6 billion. Cerebral cortex: human 16.3, gorilla 9.1, chimpanzee 6, elephant 5.6, rhesus 1.7, marmoset 0.2 billion.',
      },
      conceptQuiz: [
        {
          id: 'neuron-counts-1',
          prompt: 'Roughly how many neurons does the human brain contain?',
          options: [
            { text: 'About 86 billion', feedback: 'Correct. With about 100 trillion connections between them.' },
            { text: 'About 100 trillion', feedback: 'That is the number of connections, not neurons.' },
            { text: 'About 16 billion', feedback: 'That is the number in the cerebral cortex alone.' },
            { text: 'About 86 million', feedback: 'A thousand times too few.' },
          ],
          correct: 0,
        },
        {
          id: 'neuron-counts-2',
          prompt: 'The elephant has more neurons than a human in total but fewer in the cortex. Where are most elephant neurons?',
          options: [
            { text: 'In the cerebellum', feedback: 'Correct. About 251 billion of the roughly 257 billion.' },
            { text: 'In the cerebral cortex', feedback: 'No. The elephant cortex has about 5.6 billion, a third of the human count.' },
            { text: 'In the brain stem', feedback: 'The brain stem holds relatively few neurons in any species.' },
          ],
          correct: 0,
        },
        {
          id: 'neuron-counts-3',
          prompt: 'Which part of a neuron receives and combines most of its synaptic input?',
          options: [
            { text: 'The dendrites', feedback: 'Correct. They are the main input surface.' },
            { text: 'The axon', feedback: 'The axon carries output away from the soma.' },
            { text: 'The axon terminal', feedback: 'The terminal sends output to the next cell.' },
            { text: 'The nucleus', feedback: 'The nucleus holds the genes; it does not receive synapses.' },
          ],
          correct: 0,
        },
      ],
    },

    // 4 -----------------------------------------------------------------
    {
      id: 'directions',
      title: 'Anatomical directions and planes',
      body: [
        'Direction terms give a shared coordinate system for specimens, drawings, scans and surgery.',
        'Anterior means toward the front and posterior toward the back. Medial means toward the midline and lateral away from it. Superior means toward the top of the head and inferior toward the feet.',
        'Dorsal means toward the back of the animal and ventral toward the belly. The human neuraxis bends near the midbrain, so in the forebrain dorsal roughly equals superior and ventral equals inferior. In the brainstem and spinal cord, dorsal equals posterior and ventral equals anterior. That is why the slide lists both pairs.',
        'A view is what you see from one side: the dorsal view from above, the ventral view from below, the lateral view from the side, and the medial view, the inner surface after a cut down the midline.',
        'A section is a cut through the brain. A coronal section is a vertical cut that separates anterior from posterior. A sagittal section is a vertical cut that separates left from right; the midsagittal section runs down the midline. A horizontal section separates superior from inferior.',
        'A precise anatomical description names the side, the view or section plane, the structure, and its spatial relationship to a landmark.',
      ],
      keyTerms: ['anterior', 'posterior', 'medial', 'lateral', 'superior', 'inferior', 'dorsal', 'ventral', 'coronal', 'sagittal', 'horizontal'],
      visual: {
        type: 'widget',
        name: 'section-planes',
        props: {
          chooseLabel: 'Plane',
          planes: [
            { key: 'coronal', label: 'Coronal', info: 'A vertical cut from side to side. It separates anterior from posterior. Seen edge-on in the lateral view and in the dorsal view. The Nissl-stained whole-brain slice on the slide is a coronal section.' },
            { key: 'sagittal', label: 'Sagittal', info: 'A vertical cut from front to back. It separates left from right. In the lateral view the plane is parallel to the page, so it covers the whole view; the midsagittal cut down the midline gives the medial view.' },
            { key: 'horizontal', label: 'Horizontal', info: 'A cut parallel to the ground. It separates superior from inferior. Seen edge-on in the lateral view; in the dorsal view it is parallel to the page and covers the whole view.' },
          ],
          directions: {
            anterior: 'Anterior',
            posterior: 'Posterior',
            dorsal: 'Dorsal (superior)',
            ventral: 'Ventral (inferior)',
            lateral: 'Lateral',
            medial: 'Medial',
          },
        },
        caption: 'Pick a plane. It appears as a band where you look along it, and covers the whole view where it is parallel to the page.',
        fallbackAlt: 'A lateral view and a dorsal view of the brain with direction labels: anterior, posterior, dorsal (superior), ventral (inferior), lateral, medial. A coloured band marks the chosen section plane.',
      },
      conceptQuiz: [
        {
          id: 'directions-1',
          prompt: 'Which term means toward the midline?',
          options: [
            { text: 'Medial', feedback: 'Correct.' },
            { text: 'Lateral', feedback: 'Lateral means away from the midline.' },
            { text: 'Ventral', feedback: 'Ventral means toward the belly side.' },
            { text: 'Inferior', feedback: 'Inferior means toward the feet.' },
          ],
          correct: 0,
        },
        {
          id: 'directions-2',
          prompt: 'A coronal section separates which pair?',
          options: [
            { text: 'Anterior from posterior', feedback: 'Correct. A coronal cut goes from side to side.' },
            { text: 'Left from right', feedback: 'That is a sagittal section.' },
            { text: 'Superior from inferior', feedback: 'That is a horizontal section.' },
          ],
          correct: 0,
        },
        {
          id: 'directions-3',
          prompt: 'In the human forebrain, dorsal corresponds most closely to which term?',
          options: [
            { text: 'Superior', feedback: 'Correct. The neuraxis has bent, so the top of the forebrain is its dorsal side.' },
            { text: 'Anterior', feedback: 'In the brainstem and spinal cord, dorsal equals posterior, not anterior.' },
            { text: 'Medial', feedback: 'Medial is about distance from the midline, not up and down.' },
            { text: 'Posterior', feedback: 'That holds in the spinal cord, not in the forebrain.' },
          ],
          correct: 0,
        },
      ],
    },

    // 5 -----------------------------------------------------------------
    {
      id: 'gross-anatomy',
      title: 'Gross anatomy and cortical surface anatomy',
      body: [
        'Gross anatomy covers what you can see without a microscope. In a lateral view the largest part is the cerebrum. Below and behind it is the cerebellum, with fine parallel folds. The brain stem forms the stalk under the cerebrum and continues into the spinal cord. The small olfactory bulb sits on the ventral surface under the frontal lobe.',
        'The brain stem contains the midbrain, pons and medulla. It carries the main ascending and descending pathways and regulates essential bodily functions.',
        'The surface of the cerebrum is folded. The bumps are gyri, the grooves are sulci, and especially deep grooves are called fissures. Folding fits more cortical surface inside the skull.',
        'Two landmarks matter most. The central sulcus runs from the top of the hemisphere down toward the lateral fissure. The precentral gyrus lies just anterior to it and the postcentral gyrus just posterior. The lateral (Sylvian) fissure is the deep groove that separates the temporal lobe from the frontal and parietal lobes. The superior temporal gyrus lies just below it.',
        'The cerebrum is divided into four lobes, named after the skull bones over them. The central sulcus divides the frontal lobe from the parietal lobe. The temporal lobe lies below the lateral fissure. The occipital lobe is at the back.',
        'The insula is cortex buried inside the lateral fissure. It appears when the frontal, parietal and temporal edges around the fissure are pulled apart.',
        'Landmarks locate function. The precentral gyrus holds the primary motor cortex, the postcentral gyrus the primary somatosensory cortex, and the superior temporal gyrus the primary auditory cortex. Smaller folds vary between people, so exact localization needs an atlas or measurements from that brain.',
      ],
      keyTerms: ['cerebrum', 'cerebellum', 'brain stem', 'olfactory bulb', 'gyri', 'sulci', 'fissures', 'central sulcus', 'precentral gyrus', 'postcentral gyrus', 'lateral (Sylvian) fissure', 'superior temporal gyrus', 'frontal lobe', 'parietal lobe', 'temporal lobe', 'occipital lobe', 'insula'],
      visual: {
        type: 'widget',
        name: 'cortical-map',
        props: cortexMap('lobes'),
        caption: 'Lateral view of the left hemisphere, anterior to the left. Hover or tap a lobe, sulcus or gyrus. The other layers show the functional areas and the Brodmann numbers.',
        fallbackAlt: 'Lateral view of the brain with the frontal, parietal, occipital and temporal lobes tinted, the central sulcus and lateral fissure drawn as thick lines, the precentral, postcentral and superior temporal gyri highlighted, and the cerebellum, brain stem and olfactory bulb below.',
      },
      conceptQuiz: [
        {
          id: 'gross-1',
          prompt: 'The central sulcus separates which two lobes?',
          options: [
            { text: 'Frontal and parietal', feedback: 'Correct.' },
            { text: 'Frontal and temporal', feedback: 'The lateral fissure does that.' },
            { text: 'Parietal and occipital', feedback: 'No clear sulcus does this on the lateral surface.' },
            { text: 'Temporal and occipital', feedback: 'The occipital lobe is behind both; the central sulcus is far from it.' },
          ],
          correct: 0,
        },
        {
          id: 'gross-2',
          prompt: 'The postcentral gyrus lies where, and holds what?',
          options: [
            { text: 'Posterior to the central sulcus; primary somatosensory cortex', feedback: 'Correct. Post means behind.' },
            { text: 'Anterior to the central sulcus; primary motor cortex', feedback: 'That is the precentral gyrus.' },
            { text: 'Posterior to the central sulcus; primary motor cortex', feedback: 'Right place, wrong function. Motor cortex is in front of the sulcus.' },
            { text: 'Below the lateral fissure; auditory cortex', feedback: 'That is the superior temporal gyrus.' },
          ],
          correct: 0,
        },
        {
          id: 'gross-3',
          prompt: 'Where is the insula?',
          options: [
            { text: 'Buried inside the lateral fissure', feedback: 'Correct. You see it only when the fissure is opened.' },
            { text: 'On the medial surface of the hemisphere', feedback: 'No. It is on the lateral side, but hidden.' },
            { text: 'At the occipital pole', feedback: 'That is visual cortex.' },
            { text: 'Between the cerebellum and the brain stem', feedback: 'The insula is part of the cerebral cortex.' },
          ],
          correct: 0,
        },
        {
          id: 'gross-4',
          prompt: 'What is a gyrus?',
          options: [
            { text: 'A raised fold of the cortical surface', feedback: 'Correct. Sulci are the grooves between gyri.' },
            { text: 'A groove between folds', feedback: 'That is a sulcus.' },
            { text: 'An especially deep groove', feedback: 'That is a fissure.' },
            { text: 'One of the four divisions of the cerebrum', feedback: 'That is a lobe.' },
          ],
          correct: 0,
        },
      ],
    },

    // 6 -----------------------------------------------------------------
    {
      id: 'functional-areas',
      title: 'Functional localization',
      body: [
        'The cortex is organized like a patchwork. Areas differ in their dominant inputs, outputs and measured responses, so they can be given functional names: primary sensory, motor, and association.',
        'The sensory areas on the slide are the visual cortex in the occipital lobe (areas 17, 18, 19), the auditory cortex on the superior temporal gyrus (areas 41, 42), the somatosensory cortex in the postcentral gyrus (areas 3, 1, 2), and the gustatory cortex for taste, buried in the insula and the parietal operculum (area 43).',
        'The motor areas lie in the frontal lobe, anterior to the central sulcus: the primary motor cortex in the precentral gyrus (area 4), and the premotor area and the supplementary motor area in front of it (both area 6).',
        'Large parts of the human cortex cannot be called sensory or motor. These are the association areas. The slide names three: prefrontal cortex, posterior parietal cortex (areas 5, 7) and inferotemporal cortex (areas 20, 21, 37).',
        'Association areas combine sensory evidence with memory, goals, attention, language and plans for action.',
        'Localizing a function needs evidence, not just a label on a map: what is lost when an area is damaged, and what happens when it is stimulated. The first maps of motor cortex came from stimulating the cortex of animals, and Broca\'s patient, who lost speech after damage to the left frontal lobe, is the classic lesion case.',
      ],
      keyTerms: ['visual cortex', 'auditory cortex', 'somatosensory cortex', 'gustatory cortex', 'primary motor cortex', 'premotor area', 'supplementary motor area', 'association areas', 'prefrontal cortex', 'posterior parietal cortex', 'inferotemporal cortex'],
      visual: {
        type: 'widget',
        name: 'cortical-map',
        props: cortexMap('functional'),
        caption: 'The functional areas from the slide, with their Brodmann numbers. Red tints are motor, green sensory, purple association.',
        fallbackAlt: 'Lateral view of the brain with the primary motor, premotor and supplementary motor areas in front of the central sulcus, the somatosensory cortex behind it, the visual cortex at the back, the auditory cortex on the superior temporal gyrus, and the prefrontal, posterior parietal and inferotemporal association areas.',
      },
      conceptQuiz: [
        {
          id: 'functional-1',
          prompt: 'The primary motor cortex (area 4) is in which gyrus?',
          options: [
            { text: 'Precentral gyrus', feedback: 'Correct. Anterior to the central sulcus.' },
            { text: 'Postcentral gyrus', feedback: 'That is somatosensory cortex, areas 3, 1, 2.' },
            { text: 'Superior temporal gyrus', feedback: 'That is auditory cortex, areas 41, 42.' },
            { text: 'Occipital lobe', feedback: 'That is visual cortex, areas 17, 18, 19.' },
          ],
          correct: 0,
        },
        {
          id: 'functional-2',
          prompt: 'Which of these is an association area?',
          options: [
            { text: 'Posterior parietal cortex', feedback: 'Correct. Areas 5 and 7, behind the somatosensory cortex.' },
            { text: 'Primary visual cortex', feedback: 'A primary sensory area.' },
            { text: 'Somatosensory cortex', feedback: 'A primary sensory area, areas 3, 1, 2.' },
            { text: 'Supplementary motor area', feedback: 'A motor area, part of area 6.' },
          ],
          correct: 0,
        },
        {
          id: 'functional-3',
          prompt: 'Where is the gustatory cortex?',
          options: [
            { text: 'In the insula and parietal operculum (area 43)', feedback: 'Correct. Hidden in the lateral fissure.' },
            { text: 'In the occipital lobe', feedback: 'That is vision.' },
            { text: 'In the precentral gyrus', feedback: 'That is motor.' },
            { text: 'In the prefrontal cortex', feedback: 'That is association cortex.' },
          ],
          correct: 0,
        },
      ],
    },

    // 7 -----------------------------------------------------------------
    {
      id: 'cytoarchitecture',
      title: 'Cytoarchitecture and Brodmann areas',
      body: [
        'Cytoarchitecture is the arrangement of cells in a tissue: their types, density, size, shape and how they are layered. Repeated differences in these features divide the cortex into areas.',
        'The Nissl stain makes cytoarchitecture visible. Franz Nissl showed that basic dyes such as cresyl violet colour the nuclei of all cells and clumps of material around the nuclei of neurons. These clumps, the Nissl bodies, are rough endoplasmic reticulum rich in RNA. In short, the Nissl stain makes cell bodies visible.',
        'In a Nissl section two classes of cell can be told apart: neurons and glia. Large and small neurons, astrocytes, oligodendrocytes, microglia and the endothelial cells of blood vessels are identified from the shape of the cell body, the nucleus, the cytoplasm and the surrounding tissue.',
        'The Nissl stain shows little of fine axons, whole dendritic trees, spines or synapses. Those need Golgi staining, tracers or electron microscopy.',
        'The cerebral cortex has six layers, numbered I at the surface to VI next to the white matter. Their thickness and cell types differ between areas. Primary visual cortex (V1) has a thick, subdivided layer 4 (4A, 4B, 4C) that receives the dense visual input, and a pale stripe called the line of Gennari. At the V1 to V2 transition this laminar pattern changes abruptly.',
        'Korbinian Brodmann used such laminar differences to divide the cortex into 52 numbered areas. A Brodmann area is a cytoarchitectonic label, an anatomical statement. It is not by itself a statement about function, although many areas match functional areas, such as area 4 (motor) and area 17 (V1). Switch the map above to the Brodmann layer to see the numbers.',
        'A cortical map can be based on folding, cytoarchitecture, myelin, connectivity, activity or behaviour. Maps based on different properties may put their boundaries in different places. Boundaries also run into sulci and vary between individuals, so fitting an atlas to one brain adds uncertainty.',
      ],
      keyTerms: ['cytoarchitecture', 'Nissl stain', 'Nissl bodies', 'cortical layers', 'line of Gennari', 'Brodmann area', 'cortical map'],
      visual: {
        type: 'svg',
        name: 'cortical-layers',
        props: {},
        caption: 'Laminar structure in Nissl-stained cortex. V1 has a thick layer 4 split into 4A, 4B (line of Gennari) and 4C; in V2 layer 4 is thin. This difference marks the V1 to V2 border.',
        fallbackAlt: 'Two columns of six cortical layers drawn as dotted bands. In the left column, primary visual cortex, layer 4 is much thicker and split into three sublayers. In the right column, secondary visual cortex, all layers are of similar thickness.',
      },
      conceptQuiz: [
        {
          id: 'cyto-1',
          prompt: 'What does the Nissl stain colour?',
          options: [
            { text: 'RNA-rich rough ER and the nuclei, so the cell bodies', feedback: 'Correct. Nissl bodies are rough ER.' },
            { text: 'Myelin sheaths', feedback: 'Nissl stains cell bodies, not myelin.' },
            { text: 'Whole neurons including axons', feedback: 'That is the Golgi stain.' },
            { text: 'Synaptic vesicles', feedback: 'Vesicles need the electron microscope.' },
          ],
          correct: 0,
        },
        {
          id: 'cyto-2',
          prompt: 'Brodmann defined his 52 areas by what?',
          options: [
            { text: 'Laminar structure and cell body types in Nissl sections', feedback: 'Correct. Cytoarchitectonic characteristics.' },
            { text: 'Responses to electrical stimulation', feedback: 'That is functional mapping, not what Brodmann did.' },
            { text: 'The pattern of gyri and sulci', feedback: 'Folds vary between people; Brodmann used the microscope.' },
            { text: 'Their connections to other areas', feedback: 'Connectivity maps came later.' },
          ],
          correct: 0,
        },
        {
          id: 'cyto-3',
          prompt: 'Which layer is unusually thick and subdivided in primary visual cortex?',
          options: [
            { text: 'Layer 4', feedback: 'Correct. 4A, 4B and 4C, with the line of Gennari.' },
            { text: 'Layer 1', feedback: 'Layer 1 has few cell bodies in every area.' },
            { text: 'Layer 5', feedback: 'Layer 5 holds large cells but is not what marks V1.' },
            { text: 'Layer 6', feedback: 'Layer 6 borders the white matter; it does not mark V1.' },
          ],
          correct: 0,
        },
        {
          id: 'cyto-4',
          prompt: 'What does a Brodmann number tell you on its own?',
          options: [
            { text: 'How the cells in that patch of cortex are arranged', feedback: 'Correct. It is a cytoarchitectonic label.' },
            { text: 'What function that patch performs', feedback: 'A common misconception. Function needs separate evidence, even if many numbers now match functional areas.' },
            { text: 'Which gyrus it lies on', feedback: 'Areas cross gyri and run into sulci.' },
          ],
          correct: 0,
        },
      ],
    },

    // 8 -----------------------------------------------------------------
    {
      id: 'neuron-doctrine',
      title: 'The neuron doctrine and stains',
      body: [
        'Brain tissue is soft and looks uniform under a microscope. Before its cells could be studied it had to be fixed (hardened in formaldehyde), cut into thin slices with a microtome, and stained. The microscopic study of tissue is histology.',
        'The Nissl stain showed where cell bodies are and how they are arranged, but a Nissl-stained neuron looks like little more than a lump around a nucleus.',
        'In 1873 Camillo Golgi found that soaking tissue in silver chromate stains a small percentage of neurons completely, cell body and every process. The Golgi stain showed that the soma is only a small part of the neuron, and that the thin tubes radiating from it, the neurites, are of two kinds: many tapering dendrites and a single axon of uniform diameter.',
        'From 1888 Santiago Ramon y Cajal used the Golgi stain to work out the circuitry of many brain regions. Golgi and Cajal shared the 1906 Nobel Prize but drew opposite conclusions. Golgi held the reticular theory: the neurites of different cells fuse into one continuous network. Cajal argued that neurons are separate cells that communicate by contact, not continuity. This is the neuron doctrine.',
        'A light microscope cannot resolve anything closer than about 0.1 micrometre, and the space between neurons is about 20 nanometres, so the stains could not settle the question. The electron microscope, applied in the 1950s, showed the synaptic cleft and two separate membranes. That was the final proof.',
        'The version on the slides has twelve points: neural units; neurons are cells; specialization by location and function; the nucleus is the trophic centre, so only the part with the nucleus survives division; nerve fibres are outgrowths of nerve cells; nerve cells arise by cell division; contact, not cytoplasmic continuity; the law of dynamic polarization, a preferred direction of transmission from cell to cell even though an axon can conduct both ways; the synapse as a barrier at the contact that may permit transmission; unity of transmission, a contact is always excitatory or always inhibitory; Dale\'s law, each nerve terminal releases a single type of transmitter; plus the modern additions of electrical transmission and cotransmission.',
        'The story separates observation from interpretation. Both men looked at the same stained tissue. The question was settled by repeated observation, testable predictions and a better instrument. The modern doctrine describes neurons as separate cells with specialized compartments and regulated sites of communication, chemical synapses that release neurotransmitter and electrical synapses that pass current through gap junctions.',
      ],
      keyTerms: ['histology', 'Golgi stain', 'neurites', 'reticular theory', 'neuron doctrine', 'electron microscope', 'law of dynamic polarization', 'Dale\'s law'],
      visual: {
        type: 'widget',
        name: 'stain-compare',
        props: {
          chooseLabel: 'Method',
          fallback: stainTriptych,
          items: [
            {
              key: 'nissl',
              label: 'Nissl stain',
              figure: stainPanel('nissl'),
              rows: [
                { term: 'What it stains', text: 'Basic dyes bind RNA: the rough ER (Nissl bodies) of neurons and the nuclei of all cells.' },
                { term: 'What you see', text: 'Every cell body in the slice. Neurons and glia can be told apart. Cortical layers and cell density are visible.' },
                { term: 'What you miss', text: 'Dendritic trees, axons, spines and synapses. A neuron looks like a lump around a nucleus.' },
                { term: 'Used for', text: 'Cytoarchitecture, Brodmann areas, counting and locating cells.' },
              ],
            },
            {
              key: 'golgi',
              label: 'Golgi stain',
              figure: stainPanel('golgi'),
              rows: [
                { term: 'What it stains', text: 'Silver chromate fills a small percentage of neurons completely, for reasons still not understood.' },
                { term: 'What you see', text: 'A few whole neurons standing out against unstained tissue: soma, dendrites and axon that can be followed through the slice.' },
                { term: 'What you miss', text: 'Most cells, which stay unstained, and whether two stained neurons touch or fuse.' },
                { term: 'Used for', text: 'Cell shape and circuitry (Cajal), classifying neurons by dendrites and axon.' },
              ],
            },
            {
              key: 'em',
              label: 'Electron microscope',
              figure: stainPanel('em'),
              rows: [
                { term: 'How it works', text: 'An electron beam instead of light. Resolution about 0.1 nm, a thousand times better than the light microscope.' },
                { term: 'What you see', text: 'Membranes, organelles, synaptic vesicles, and the synaptic cleft between two separate cells.' },
                { term: 'What you miss', text: 'The big picture: only a tiny volume of fixed tissue at a time.' },
                { term: 'Used for', text: 'Final proof of the neuron doctrine (1950s); ultrastructure of synapses.' },
              ],
            },
          ],
          table: {
            caption: 'Summary for the cheat sheet',
            columns: ['Method', 'Shows', 'Does not show'],
            rows: [
              ['Nissl', 'All cell bodies, layers, neurons versus glia', 'Processes, synapses'],
              ['Golgi', 'A few whole neurons with dendrites and axon', 'Most cells; contact versus fusion'],
              ['Electron microscope', 'Membranes, vesicles, the 20 nm synaptic cleft', 'Large-scale organization'],
            ],
          },
        },
        caption: 'The same patch of cortex seen with three methods. Choose one to read what it reveals and what it hides.',
        fallbackAlt: 'Three panels of the same tissue. Nissl: many small cell bodies and nuclei, no processes. Golgi: two complete black neurons with dendrites and axon among unstained cells. Electron microscope: two membranes with a narrow cleft and vesicles on one side.',
      },
      conceptQuiz: [
        {
          id: 'doctrine-1',
          prompt: 'Who argued that neurons are separate cells that communicate by contact?',
          options: [
            { text: 'Cajal', feedback: 'Correct. He used the Golgi stain to reach the opposite conclusion from Golgi.' },
            { text: 'Golgi', feedback: 'Golgi invented the stain but defended the reticular theory of a continuous network.' },
            { text: 'Nissl', feedback: 'Nissl made cell bodies visible; he did not settle this debate.' },
            { text: 'Brodmann', feedback: 'Brodmann mapped cortical areas by cytoarchitecture.' },
          ],
          correct: 0,
        },
        {
          id: 'doctrine-2',
          prompt: 'Why could the light microscope not decide between contact and continuity?',
          options: [
            { text: 'The gap between neurons, about 20 nm, is below its resolution limit of about 0.1 micrometre', feedback: 'Correct. The electron microscope was needed.' },
            { text: 'Stains did not colour neurons', feedback: 'Golgi and Nissl stains coloured them well; the limit was resolution.' },
            { text: 'Neurons were too large to fit in the field of view', feedback: 'Size was not the problem; the gap was too small.' },
          ],
          correct: 0,
        },
        {
          id: 'doctrine-3',
          prompt: 'The law of dynamic polarization states that',
          options: [
            { text: 'transmission between cells has a preferred direction, even though an axon can conduct both ways', feedback: 'Correct.' },
            { text: 'each terminal releases a single type of transmitter', feedback: 'That is Dale\'s law.' },
            { text: 'a contact is always either excitatory or inhibitory', feedback: 'That is unity of transmission.' },
            { text: 'nerve cells are generated by cell division', feedback: 'That is point 6, cell division.' },
          ],
          correct: 0,
        },
        {
          id: 'doctrine-4',
          prompt: 'What is special about the Golgi stain?',
          options: [
            { text: 'It stains only a small fraction of neurons, but each one completely', feedback: 'Correct. That is why single neurons stand out.' },
            { text: 'It stains all cell bodies but no processes', feedback: 'That describes the Nissl stain.' },
            { text: 'It stains only axons', feedback: 'It fills soma, dendrites and axon.' },
            { text: 'It shows the synaptic cleft', feedback: 'Only the electron microscope resolves the cleft.' },
          ],
          correct: 0,
        },
      ],
    },

    // 9 -----------------------------------------------------------------
    {
      id: 'prototypical-neuron',
      title: 'The prototypical neuron',
      body: [
        'The neuron is bounded by the neuronal membrane, about 5 nm thick and studded with proteins. Inside is the cytosol, a salty potassium-rich fluid, and membrane-enclosed organelles. Everything inside the membrane except the nucleus is the cytoplasm.',
        'The soma is about 20 micrometres across and holds the nucleus. Chromosomes in the nucleus carry the DNA. The segments of DNA used to build the cell are genes. Reading a gene is gene expression: transcription copies the gene into mRNA, the mRNA leaves the nucleus through pores, and ribosomes translate it into protein. A neuron differs from a liver cell because it expresses different genes.',
        'Ribosomes attached to stacks of membrane form the rough endoplasmic reticulum (rough ER). Neurons have far more of it than other cells. This is the Nissl substance. Proteins destined for a membrane are made on the rough ER. Proteins for the cytosol are made on free ribosomes, often in groups along one mRNA called polyribosomes.',
        'The smooth ER folds proteins and regulates substances such as calcium. The Golgi apparatus sorts proteins for delivery to the axon or the dendrites. The mitochondria carry out cellular respiration and make ATP, the energy currency that fuels the pumps in the membrane.',
        'Dendrites branch like a tree, the dendritic tree, and are covered with synapses. The dendritic membrane holds receptors that detect neurotransmitter. On many neurons the input arrives on dendritic spines, small bags hanging off the dendrite. Polyribosomes sit under spines, so some protein synthesis happens locally.',
        'The axon begins at the axon hillock, keeps a uniform diameter, and can be a metre long. It has no rough ER and almost no ribosomes, so all axonal proteins are made in the soma. Its membrane proteins differ from the soma\'s. It may branch into axon collaterals, and it ends in the axon terminal, or terminal bouton, where it contacts other cells. A neuron that contacts a cell is said to innervate it.',
      ],
      keyTerms: ['neuronal membrane', 'cytosol', 'organelles', 'cytoplasm', 'nucleus', 'gene expression', 'mRNA', 'ribosomes', 'rough endoplasmic reticulum', 'polyribosomes', 'smooth ER', 'Golgi apparatus', 'mitochondria', 'ATP', 'dendritic tree', 'dendritic spines', 'axon hillock', 'axon collaterals', 'innervate'],
      visual: {
        type: 'widget',
        name: 'neuron-parts',
        props: {
          figure: (opts) => neuron({ labels: opts.labels }),
          layers: [
            {
              key: 'parts',
              label: 'Parts',
              regions: NEURON_REGIONS.map((r) => ({ key: r.key, name: r.label, info: NEURON_INFO[r.key] })),
            },
          ],
          labels: true,
          intro: 'Hover, tap or pick a part to read what it does.',
          selectLabel: 'Part',
          placeholder: 'Choose a part',
        },
        caption: 'The basic parts of a neuron and the direction of information flow, dendrites to soma to axon to terminal.',
        fallbackAlt: 'A neuron with branching dendrites at the upper left, a round soma with a nucleus, an axon hillock leading into a long axon to the right with one collateral branching downward, and axon terminals with vesicles contacting another cell.',
      },
      conceptQuiz: [
        {
          id: 'neuron-1',
          prompt: 'Where are proteins assembled?',
          options: [
            { text: 'On ribosomes, free or on the rough ER', feedback: 'Correct. Ribosomes translate mRNA into protein.' },
            { text: 'In the nucleus', feedback: 'DNA is read into mRNA there, but the mRNA leaves before translation.' },
            { text: 'In the mitochondria', feedback: 'Mitochondria make ATP, not proteins.' },
            { text: 'In the Golgi apparatus', feedback: 'The Golgi apparatus sorts finished proteins.' },
          ],
          correct: 0,
        },
        {
          id: 'neuron-2',
          prompt: 'Why must every protein in the axon be made in the soma?',
          options: [
            { text: 'The axon has no rough ER and almost no ribosomes', feedback: 'Correct. No ribosomes, no protein synthesis.' },
            { text: 'The axon membrane keeps mRNA out', feedback: 'It is the lack of ribosomes, not a barrier to mRNA.' },
            { text: 'The axon has no mitochondria', feedback: 'Axons and terminals have many mitochondria.' },
          ],
          correct: 0,
        },
        {
          id: 'neuron-3',
          prompt: 'The Nissl substance is which organelle?',
          options: [
            { text: 'Rough endoplasmic reticulum', feedback: 'Correct. Its ribosomal RNA takes up the basic dye.' },
            { text: 'Smooth endoplasmic reticulum', feedback: 'Smooth ER has no ribosomes, so it does not stain.' },
            { text: 'Golgi apparatus', feedback: 'Named after Golgi, but it is not what Nissl saw.' },
            { text: 'Mitochondria', feedback: 'Mitochondria are not RNA-rich.' },
          ],
          correct: 0,
        },
        {
          id: 'neuron-4',
          prompt: 'Where does the axon begin?',
          options: [
            { text: 'At the axon hillock', feedback: 'Correct. It tapers away from the soma into the initial segment.' },
            { text: 'At a dendritic spine', feedback: 'Spines are on dendrites, the input side.' },
            { text: 'At the terminal bouton', feedback: 'That is where the axon ends.' },
            { text: 'At the nucleus', feedback: 'The nucleus stays inside the soma.' },
          ],
          correct: 0,
        },
      ],
    },

    // 10 ----------------------------------------------------------------
    {
      id: 'synaptic-transmission',
      title: 'Synaptic transmission overview',
      body: [
        'A synapse is the point of contact where an axon terminal passes information to another cell. It has a presynaptic side, usually the axon terminal, and a postsynaptic side, usually a dendrite or a soma. The gap between them is the synaptic cleft. Transfer of information across it is synaptic transmission.',
        'The terminal cytoplasm differs from the axon. Microtubules stop before it. It holds many synaptic vesicles about 50 nm across, filled with neurotransmitter. It has many mitochondria, a sign of high energy use. The membrane facing the cleft carries a dense coat of proteins, the active zone, where release happens. There are no ribosomes.',
        'The sequence has five steps. 1. An action potential arrives at the terminal. 2. The depolarization opens voltage-gated calcium channels and calcium enters. 3. Calcium triggers vesicles to fuse with the membrane at the active zone and release neurotransmitter. 4. The transmitter diffuses across the cleft. 5. It binds receptors in the postsynaptic membrane (the postsynaptic density), producing an electrical or biochemical response in the target cell.',
        'So an electrical signal becomes a chemical one and then an electrical one again. This conversion makes many of the brain\'s computations possible. Changes in it underlie learning and memory, and the synapse is the site of action of most psychoactive drugs and many toxins.',
        'Because the two sides are built differently, a chemical synapse works in one direction, from pre to post. This is the structural basis of the law of dynamic polarization. Two neurons can still communicate both ways through separate reciprocal synapses.',
        'Electrical synapses are different. At a gap junction, channels made of connexin proteins join the cytoplasm of the two cells directly, current passes in both directions, and transmission is very fast. Most synapses in the mature human brain are chemical.',
        'Synaptic strength can change. Activity alters release probability, the number of receptors and the structure of the synapse. This synaptic plasticity contributes to adaptation and learning, and it is a target for drugs and disease.',
      ],
      keyTerms: ['presynaptic', 'postsynaptic', 'synaptic cleft', 'synaptic transmission', 'synaptic vesicles', 'neurotransmitter', 'active zone', 'voltage-gated calcium channels', 'receptors', 'electrical synapse', 'gap junction', 'synaptic plasticity'],
      visual: {
        type: 'svg',
        name: 'synapse-steps',
        props: {},
        caption: 'The axon terminal and the synapse, with the five steps of chemical transmission numbered.',
        fallbackAlt: 'An axon terminal containing a mitochondrion and synaptic vesicles sits above a postsynaptic dendrite with receptors. Numbered steps: 1 action potential arrives, 2 calcium channels open, 3 vesicles fuse and release transmitter, 4 transmitter crosses the cleft, 5 transmitter binds receptors.',
      },
      conceptQuiz: [
        {
          id: 'synapse-1',
          prompt: 'What directly triggers vesicles to fuse and release transmitter?',
          options: [
            { text: 'Calcium entering through voltage-gated channels', feedback: 'Correct. Calcium activates the fusion machinery.' },
            { text: 'Sodium entering the terminal', feedback: 'Sodium carries the action potential, but calcium triggers release.' },
            { text: 'Transmitter binding to the terminal', feedback: 'Transmitter acts on the postsynaptic side.' },
            { text: 'ATP from the mitochondria', feedback: 'ATP fuels the terminal but is not the trigger.' },
          ],
          correct: 0,
        },
        {
          id: 'synapse-2',
          prompt: 'Which side of the synapse holds the synaptic vesicles?',
          options: [
            { text: 'The presynaptic axon terminal', feedback: 'Correct. Vesicles store the transmitter for release.' },
            { text: 'The postsynaptic dendrite', feedback: 'The postsynaptic side holds receptors, not vesicles.' },
            { text: 'Both sides equally', feedback: 'The two sides are built differently; that is why transmission is one-way.' },
          ],
          correct: 0,
        },
        {
          id: 'synapse-3',
          prompt: 'What makes a chemical synapse work in one direction?',
          options: [
            { text: 'The presynaptic and postsynaptic sides are built differently', feedback: 'Correct. Vesicles on one side, receptors on the other.' },
            { text: 'The synaptic cleft blocks signals going backwards', feedback: 'The cleft is just a gap; transmitter diffuses in every direction.' },
            { text: 'Action potentials can only travel one way along an axon', feedback: 'An axon can conduct both ways; the synapse sets the direction.' },
          ],
          correct: 0,
        },
        {
          id: 'synapse-4',
          prompt: 'At an electrical synapse, how does the signal cross?',
          options: [
            { text: 'Ions flow directly through gap junction channels', feedback: 'Correct. Fast and usually bidirectional.' },
            { text: 'Transmitter diffuses across a cleft', feedback: 'That is a chemical synapse.' },
            { text: 'Vesicles carry ions across', feedback: 'Vesicles carry transmitter at chemical synapses.' },
          ],
          correct: 0,
        },
      ],
    },

    // 11 ----------------------------------------------------------------
    {
      id: 'axonal-transport',
      title: 'Axonal transport and the cytoskeleton',
      body: [
        'The cytoskeleton is the scaffold that gives a neuron its shape. It has three kinds of fibre. Microtubules, 20 nm across and made of tubulin, run down the neurites. Neurofilaments, 10 nm, are the mechanically strong intermediate filaments. Microfilaments, 5 nm and made of actin, lie under the membrane and throughout the neurites. All three are constantly assembled and taken apart.',
        'Because the axon has no ribosomes, everything the axon and its terminal need must be made in the soma and shipped down. This shipping is axoplasmic transport. In the nineteenth century Augustus Waller showed that an axon cut off from its soma degenerates. This Wallerian degeneration is the point of doctrine item 4: the nucleus is the trophic centre.',
        'Anterograde transport moves material from the soma toward the terminal. Fast anterograde transport packs material in vesicles that walk along microtubules on the motor protein kinesin, using ATP, at up to 1000 mm per day. A slower transport, shown by Weiss, moves other material at a rate that would take months to reach the end of the longest axons.',
        'Retrograde transport moves material from the terminal back to the soma on a different motor protein, dynein. It returns used material and carries signals about the state of the terminal. Both directions are used by neuroscientists to trace connections with injected tracers.',
        'When transport fails, the distant terminals suffer first: the supply of vesicle proteins and membrane stops, and the synapse weakens. Continued failure can impair a whole circuit. Transport failure contributes to several neurological diseases; in Alzheimer\'s disease, for example, the microtubule-associated protein tau detaches from the microtubules and forms tangles.',
      ],
      keyTerms: ['cytoskeleton', 'microtubules', 'neurofilaments', 'microfilaments', 'axoplasmic transport', 'Wallerian degeneration', 'anterograde transport', 'kinesin', 'retrograde transport', 'dynein'],
      visual: {
        type: 'svg',
        name: 'axonal-transport',
        props: {},
        caption: 'Vesicles walk along microtubules. Kinesin carries them from the soma to the terminal (anterograde); dynein carries them back (retrograde).',
        fallbackAlt: 'A soma on the left, an axon running right to a terminal, and a microtubule inside the axon. A vesicle above the microtubule moves right, labelled anterograde, kinesin. A vesicle below moves left, labelled retrograde, dynein.',
      },
      conceptQuiz: [
        {
          id: 'transport-1',
          prompt: 'Kinesin moves material in which direction?',
          options: [
            { text: 'From the soma to the terminal (anterograde)', feedback: 'Correct.' },
            { text: 'From the terminal to the soma (retrograde)', feedback: 'That is dynein.' },
            { text: 'In both directions', feedback: 'Each motor goes one way.' },
          ],
          correct: 0,
        },
        {
          id: 'transport-2',
          prompt: 'What happens to an axon that is cut off from its soma?',
          options: [
            { text: 'It degenerates, because it cannot make its own proteins', feedback: 'Correct. Wallerian degeneration.' },
            { text: 'It keeps working indefinitely on stored proteins', feedback: 'Stored material runs out; the axon dies.' },
            { text: 'It grows a new soma at the cut end', feedback: 'The nucleus is the trophic centre; only the part with it survives.' },
          ],
          correct: 0,
        },
        {
          id: 'transport-3',
          prompt: 'Which cytoskeletal element is the track for fast axoplasmic transport?',
          options: [
            { text: 'Microtubules', feedback: 'Correct. Kinesin and dynein walk along them.' },
            { text: 'Neurofilaments', feedback: 'Neurofilaments give strength; they are not the track.' },
            { text: 'Microfilaments', feedback: 'Actin filaments shape the cell and line the membrane.' },
          ],
          correct: 0,
        },
      ],
    },

    // 12 ----------------------------------------------------------------
    {
      id: 'glia',
      title: 'Glia',
      body: [
        'Glia are the other class of cell in the brain, roughly as numerous as neurons. They do not carry the main signals, but neurons cannot work without them. Glia regulate the extracellular environment, support metabolism, insulate axons and respond to injury.',
        'Astrocytes are the most numerous glia. They fill most of the space between neurons and blood vessels, leaving gaps of only about 20 nm. Their processes envelop synapses, restrict the spread of released transmitter and actively remove it from the cleft. They regulate extracellular potassium and other substances that would disturb signalling, and they help match blood supply to activity. They also carry transmitter receptors of their own.',
        'Myelinating glia wrap axons in many layers of membrane. The wrapping, myelin, is interrupted at the nodes of Ranvier, where the axon membrane is exposed. Myelin speeds up conduction of the action potential.',
        'Oligodendroglia make myelin in the central nervous system, the brain and spinal cord. One oligodendroglial cell myelinates segments of several axons. Schwann cells make myelin in the peripheral nervous system, the nerves outside the skull and vertebral column. Each Schwann cell myelinates one segment of one axon.',
        'Microglia are the brain\'s phagocytes. They monitor the tissue, respond to damage and infection, remove debris left by dead cells, and remodel synapses by removing them. They can enter the brain from the blood.',
        'Other non-neuronal cells: ependymal cells line the fluid-filled ventricles, and blood vessels deliver oxygen and nutrients.',
        'A common misconception is that glia are only glue that fills space. They keep the chemical environment stable, supply energy, insulate, monitor and repair.',
      ],
      keyTerms: ['glia', 'astrocytes', 'myelin', 'nodes of Ranvier', 'oligodendroglia', 'Schwann cells', 'microglia', 'ependymal cells'],
      visual: {
        type: 'widget',
        name: 'glia-compare',
        props: {
          chooseLabel: 'Cell type',
          fallback: gliaOverview,
          items: [
            {
              key: 'astrocyte',
              label: 'Astrocyte',
              figure: astrocyteFigure(),
              rows: [
                { term: 'Where', text: 'Everywhere in the CNS, filling the space between neurons and around blood vessels. The most numerous glia.' },
                { term: 'What it does', text: 'Envelops synapses, removes transmitter from the cleft, regulates extracellular potassium, supports metabolism, and can respond to transmitter with its own receptors.' },
                { term: 'On the slide', text: 'Figure 2.24 (star-shaped cell) and Figure 2.25 (astrocyte process wrapped around a synapse).' },
              ],
            },
            {
              key: 'oligodendrocyte',
              label: 'Oligodendroglia',
              figure: oligodendrocyteFigure(),
              rows: [
                { term: 'Where', text: 'Central nervous system: brain and spinal cord.' },
                { term: 'What it does', text: 'Wraps axons in myelin, which speeds conduction. One cell myelinates segments of several axons. Gaps between segments are the nodes of Ranvier.' },
                { term: 'On the slide', text: 'Figure 2.27, an oligodendroglial cell with processes to several axons.' },
              ],
            },
            {
              key: 'schwann',
              label: 'Schwann cell',
              figure: schwannFigure(),
              rows: [
                { term: 'Where', text: 'Peripheral nervous system: nerves outside the skull and vertebral column.' },
                { term: 'What it does', text: 'Wraps one segment of one axon in myelin. Same job as oligodendroglia, different location and one axon per cell.' },
                { term: 'On the slide', text: 'Named in the Figure 2.27 caption as the peripheral counterpart of oligodendroglia.' },
              ],
            },
            {
              key: 'microglia',
              label: 'Microglia',
              figure: microgliaFigure(),
              rows: [
                { term: 'Where', text: 'Throughout the brain; can migrate in from the blood.' },
                { term: 'What it does', text: 'Phagocyte: removes debris from dead or degenerating cells, responds to damage and infection, remodels synaptic connections by removing them.' },
                { term: 'On the slide', text: 'Listed under Glia with astrocytes and the myelinating glia.' },
              ],
            },
          ],
          table: {
            caption: 'Summary for the cheat sheet',
            columns: ['Cell', 'Where', 'Main job'],
            rows: [
              ['Astrocyte', 'CNS, around synapses and vessels', 'Chemical environment: transmitter removal, potassium, metabolic support'],
              ['Oligodendroglia', 'CNS', 'Myelin, several axons per cell'],
              ['Schwann cell', 'PNS', 'Myelin, one axon per cell'],
              ['Microglia', 'CNS', 'Phagocyte: debris, damage, synapse remodelling'],
            ],
          },
        },
        caption: 'Four glial cell types. Choose one for its location and role; the table below summarizes all four.',
        fallbackAlt: 'Four drawings: a star-shaped astrocyte with processes on a synapse and a blood vessel; an oligodendroglial cell sending processes to myelin segments on three axons; a single axon with one Schwann cell per myelin segment; a small microglial cell with fine branches engulfing debris.',
      },
      conceptQuiz: [
        {
          id: 'glia-1',
          prompt: 'Which cell makes myelin in the brain and spinal cord?',
          options: [
            { text: 'Oligodendroglia', feedback: 'Correct. One cell wraps several axons.' },
            { text: 'Schwann cells', feedback: 'Schwann cells myelinate peripheral nerves.' },
            { text: 'Astrocytes', feedback: 'Astrocytes regulate the environment; they do not make myelin.' },
            { text: 'Microglia', feedback: 'Microglia are phagocytes.' },
          ],
          correct: 0,
        },
        {
          id: 'glia-2',
          prompt: 'Which cell removes debris left by dead neurons?',
          options: [
            { text: 'Microglia', feedback: 'Correct. The brain\'s phagocytes.' },
            { text: 'Astrocytes', feedback: 'Astrocytes clear transmitter and potassium, not cell debris.' },
            { text: 'Ependymal cells', feedback: 'Ependymal cells line the ventricles.' },
          ],
          correct: 0,
        },
        {
          id: 'glia-3',
          prompt: 'Which glial cell envelops synapses and regulates extracellular potassium?',
          options: [
            { text: 'Astrocyte', feedback: 'Correct. See Figure 2.25 on the slide.' },
            { text: 'Oligodendroglia', feedback: 'They insulate axons, not synapses.' },
            { text: 'Schwann cell', feedback: 'Peripheral myelin only.' },
            { text: 'Microglia', feedback: 'Microglia monitor and clean up; they do not regulate potassium.' },
          ],
          correct: 0,
        },
        {
          id: 'glia-4',
          prompt: 'How do oligodendroglia and Schwann cells differ?',
          options: [
            { text: 'Oligodendroglia are in the CNS and wrap several axons; Schwann cells are in the PNS and wrap one', feedback: 'Correct on both counts.' },
            { text: 'Oligodendroglia make myelin; Schwann cells do not', feedback: 'Both make myelin.' },
            { text: 'Schwann cells are in the CNS; oligodendroglia in the PNS', feedback: 'The other way round.' },
          ],
          correct: 0,
        },
      ],
    },
  ],

  recap: {
    terms: [
      { term: 'Spatial and time scales', definition: 'Structure: proteins (nm) to body (m). Function: molecular dynamics (ps) to development (years). A result applies only to the scale measured.' },
      { term: 'Node, edge', definition: 'Network elements. Cellular scale: neuron, synapse. Regional scale: brain area, pathway or signal relationship.' },
      { term: 'Structural connectivity', definition: 'Anatomical connections (axons, tracts).' },
      { term: 'Functional connectivity', definition: 'Statistical dependence between measured signals. Does not prove an anatomical pathway.' },
      { term: 'Brain disorders (Europe 2010)', definition: 'About 800 billion EUR per year, 179 million people. Cost = health care + non-medical support + lost productivity. Burden depends on prevalence, disability, economic effects.' },
      { term: 'Neuron numbers', definition: 'Human: 86 billion neurons, 100 trillion connections, 16.3 billion in cortex. Elephant: more in total (cerebellum), 5.6 billion in cortex. Count alone does not rank cognition.' },
      { term: 'Anterior / posterior', definition: 'Front / back.' },
      { term: 'Medial / lateral', definition: 'Toward / away from the midline.' },
      { term: 'Superior / inferior', definition: 'Top of head / feet.' },
      { term: 'Dorsal / ventral', definition: 'Back / belly. Forebrain: superior / inferior. Brainstem and cord: posterior / anterior.' },
      { term: 'Coronal, sagittal, horizontal', definition: 'Cuts separating anterior-posterior, left-right, superior-inferior.' },
      { term: 'Gross features', definition: 'Cerebrum, cerebellum, brain stem (midbrain, pons, medulla), olfactory bulb.' },
      { term: 'Gyrus, sulcus, fissure', definition: 'Fold, groove, deep groove.' },
      { term: 'Central sulcus', definition: 'Frontal from parietal. Precentral gyrus (motor) in front, postcentral gyrus (somatosensory) behind.' },
      { term: 'Lateral (Sylvian) fissure', definition: 'Temporal lobe below it, insula buried inside it, superior temporal gyrus (auditory) just under it.' },
      { term: 'Lobes', definition: 'Frontal, parietal, temporal, occipital, plus the insula.' },
      { term: 'Sensory cortices', definition: 'Visual 17, 18, 19 (occipital). Auditory 41, 42 (superior temporal). Somatosensory 3, 1, 2 (postcentral). Gustatory 43 (insula).' },
      { term: 'Motor areas', definition: 'Primary motor 4 (precentral). Premotor and supplementary motor 6.' },
      { term: 'Association cortices', definition: 'Prefrontal. Posterior parietal 5, 7. Inferotemporal 20, 21, 37.' },
      { term: 'Cytoarchitecture', definition: 'Arrangement of cells: type, density, size, layers. Basis of Brodmann\'s 52 areas.' },
      { term: 'Nissl stain', definition: 'Basic dye binds RNA of rough ER (Nissl bodies) and nuclei. Shows all cell bodies, layers, neurons versus glia. Not processes.' },
      { term: 'Cortical layers', definition: 'I to VI. V1 has thick layer 4 (4A, 4B, 4C, line of Gennari); V2 does not.' },
      { term: 'Brodmann area', definition: 'Numbered cytoarchitectonic label. Anatomical, not a function statement by itself.' },
      { term: 'Golgi stain', definition: 'Silver chromate. Few neurons, stained completely: soma, dendrites, axon.' },
      { term: 'Reticular theory vs neuron doctrine', definition: 'Golgi: continuous network. Cajal: separate cells, contact not continuity. EM (1950s) showed the 20 nm cleft; light microscope limit 0.1 um.' },
      { term: 'Neuron doctrine points', definition: 'Units; cells; specialization; nucleus is trophic centre; fibres are processes; cell division; contact; dynamic polarization; synapse barrier; unity of transmission; Dale\'s law; electrical transmission and cotransmission.' },
      { term: 'Law of dynamic polarization', definition: 'Preferred direction of transmission cell to cell (dendrite, soma to axon to terminal), although an axon can conduct both ways.' },
      { term: 'Dale\'s law', definition: 'Each nerve terminal releases a single type of transmitter.' },
      { term: 'Soma', definition: 'Cell body, about 20 um. Nucleus, rough and smooth ER, Golgi apparatus, mitochondria.' },
      { term: 'Gene expression', definition: 'DNA transcribed to mRNA, translated to protein on ribosomes.' },
      { term: 'Rough ER', definition: 'Ribosomes on membrane. Makes membrane proteins. Equals Nissl substance. Free ribosomes and polyribosomes make cytosolic proteins.' },
      { term: 'Golgi apparatus', definition: 'Sorts proteins for delivery to axon or dendrites.' },
      { term: 'Mitochondria', definition: 'Cellular respiration, ATP.' },
      { term: 'Dendrites', definition: 'Input. Dendritic tree, spines, receptors. Polyribosomes under spines.' },
      { term: 'Axon', definition: 'Output. Starts at axon hillock, uniform diameter, no ribosomes, collaterals, ends in axon terminal (terminal bouton).' },
      { term: 'Synapse', definition: 'Presynaptic terminal, synaptic cleft, postsynaptic membrane with receptors. Terminal: vesicles (50 nm), mitochondria, active zone, no ribosomes or microtubules.' },
      { term: 'Chemical transmission', definition: 'AP arrives, voltage-gated Ca2+ channels open, Ca2+ triggers vesicle fusion, transmitter crosses cleft, binds receptors, postsynaptic response. Electrical to chemical to electrical. One-way.' },
      { term: 'Electrical synapse', definition: 'Gap junction (connexins). Direct ionic current, fast, both directions.' },
      { term: 'Synaptic plasticity', definition: 'Activity changes release probability, receptor number, structure. Basis of learning; drug and disease target.' },
      { term: 'Cytoskeleton', definition: 'Microtubules 20 nm (tubulin), neurofilaments 10 nm, microfilaments 5 nm (actin).' },
      { term: 'Axoplasmic transport', definition: 'Anterograde: soma to terminal, kinesin on microtubules, ATP, up to 1000 mm/day. Retrograde: terminal to soma, dynein.' },
      { term: 'Wallerian degeneration', definition: 'Axon cut from soma dies. Nucleus is the trophic centre.' },
      { term: 'Astrocyte', definition: 'Most numerous glia. Envelops synapses, removes transmitter, regulates K+, metabolic support.' },
      { term: 'Oligodendroglia / Schwann cell', definition: 'Myelin in CNS (several axons per cell) / PNS (one axon per cell). Nodes of Ranvier between segments. Myelin speeds conduction.' },
      { term: 'Microglia', definition: 'Phagocytes. Debris, damage, synapse remodelling.' },
      { term: 'Ependymal cells', definition: 'Line the ventricles.' },
    ],
    equations: [],
  },

  lectureQuiz: [
    // Easy ---------------------------------------------------------------
    {
      id: 'q01',
      difficulty: 'easy',
      type: 'mc',
      prompt: 'Which stain makes all cell bodies visible and is the basis of cytoarchitecture?',
      options: [
        { text: 'Nissl stain', feedback: 'Correct. Basic dyes bind the RNA of the rough ER and the nuclei.' },
        { text: 'Golgi stain', feedback: 'Golgi stains a few neurons completely, not all cell bodies.' },
        { text: 'Electron microscopy', feedback: 'Not a stain; it resolves membranes and synapses.' },
        { text: 'Myelin stain', feedback: 'Not covered on the slides; myelin staining shows fibres, not cell bodies.' },
      ],
      correct: 0,
      modelAnswer: [
        'The Nissl stain uses basic dyes such as cresyl violet.',
        'They bind RNA in the rough ER (Nissl bodies) and the nuclei of all cells, so every cell body shows.',
        'Comparing the arrangement of stained cell bodies across regions is cytoarchitecture, which Brodmann used to define his areas.',
      ],
    },
    {
      id: 'q02',
      difficulty: 'easy',
      type: 'mc',
      prompt: 'Which part of the neuron carries its output to other cells?',
      options: [
        { text: 'The axon', feedback: 'Correct. One axon per neuron, ending in terminals.' },
        { text: 'The dendrites', feedback: 'Dendrites receive input.' },
        { text: 'The soma', feedback: 'The soma maintains the cell and holds the nucleus.' },
        { text: 'The nucleus', feedback: 'The nucleus holds the DNA.' },
      ],
      correct: 0,
      modelAnswer: [
        'The neuron has three main regions: soma, dendrites and axon.',
        'Dendrites receive input, the soma maintains the cell, and the single axon carries output to the axon terminals, which contact other cells at synapses.',
      ],
    },
    {
      id: 'q03',
      difficulty: 'easy',
      type: 'mc',
      prompt: 'Which lobe is separated from the frontal and parietal lobes by the lateral (Sylvian) fissure?',
      options: [
        { text: 'Temporal lobe', feedback: 'Correct. It lies below the fissure.' },
        { text: 'Occipital lobe', feedback: 'The occipital lobe is at the back, not below the lateral fissure.' },
        { text: 'The insula', feedback: 'The insula is inside the fissure, not a lobe separated by it.' },
        { text: 'The cerebellum', feedback: 'The cerebellum is not part of the cerebrum.' },
      ],
      correct: 0,
      modelAnswer: [
        'The lateral fissure is the deep groove on the side of the hemisphere.',
        'The temporal lobe lies ventral to it; the frontal and parietal lobes are above it.',
        'The insula is the cortex buried inside the fissure.',
      ],
    },
    {
      id: 'q04',
      difficulty: 'easy',
      type: 'mc',
      prompt: 'Roughly how many neurons and how many connections does the human brain have?',
      options: [
        { text: '86 billion neurons, 100 trillion connections', feedback: 'Correct, as on the slide.' },
        { text: '86 million neurons, 100 billion connections', feedback: 'A thousand times too few of each.' },
        { text: '16 billion neurons, 5600 connections', feedback: '16 billion is the cortex only; 5600 is the fibres onto one neuron.' },
        { text: '251 billion neurons, 100 trillion connections', feedback: '251 billion is the elephant figure on the slide.' },
      ],
      correct: 0,
      modelAnswer: [
        'The slide gives about 86 billion neurons forming about 100 trillion connections.',
        'About 16.3 billion neurons are in the cerebral cortex.',
        'A single neuron can have thousands of fibres connected to it; the slide shows one with 5600.',
      ],
    },
    {
      id: 'q05',
      difficulty: 'easy',
      type: 'mc',
      prompt: 'Which glial cell makes myelin in the peripheral nervous system?',
      options: [
        { text: 'Schwann cell', feedback: 'Correct. One Schwann cell per segment of one axon.' },
        { text: 'Oligodendroglial cell', feedback: 'Oligodendroglia myelinate central axons.' },
        { text: 'Astrocyte', feedback: 'Astrocytes regulate the extracellular environment.' },
        { text: 'Microglial cell', feedback: 'Microglia are phagocytes.' },
      ],
      correct: 0,
      modelAnswer: [
        'Myelinating glia come in two kinds.',
        'Oligodendroglia are in the central nervous system and each myelinates several axons.',
        'Schwann cells are in the peripheral nervous system and each myelinates one segment of one axon.',
      ],
    },

    // Medium -------------------------------------------------------------
    {
      id: 'q06',
      difficulty: 'medium',
      type: 'label',
      prompt: 'Label the numbered landmarks on the lateral view of the brain (anterior is to the left), then read the explanation for each.',
      figure: {
        type: 'svg',
        name: 'brain-lateral',
        props: { layer: 'plain', labels: false, uid: 'q06' },
        fallbackAlt: 'Lateral view of the brain without labels, with seven numbered markers on the central sulcus, the lateral fissure, the frontal lobe, the occipital lobe, the temporal lobe, the cerebellum and the brain stem.',
      },
      regions: [
        { id: 'r1', x: 49, y: 28, label: 'Central sulcus', explanation: 'The groove running from the top of the hemisphere toward the lateral fissure. Frontal lobe in front, parietal lobe behind; precentral (motor) and postcentral (somatosensory) gyri on either side.' },
        { id: 'r2', x: 30, y: 50, label: 'Lateral (Sylvian) fissure', explanation: 'The deep groove separating the temporal lobe from the frontal and parietal lobes. The insula is buried inside it.' },
        { id: 'r3', x: 25, y: 28, label: 'Frontal lobe', explanation: 'Anterior to the central sulcus. Motor areas at the back of it, prefrontal association cortex in front.' },
        { id: 'r4', x: 87, y: 44, label: 'Occipital lobe', explanation: 'The posterior pole of the cerebrum. Visual cortex, areas 17, 18, 19.' },
        { id: 'r5', x: 42, y: 61, label: 'Temporal lobe', explanation: 'Below the lateral fissure. Auditory cortex on the superior temporal gyrus, inferotemporal association cortex lower down.' },
        { id: 'r6', x: 76, y: 79, label: 'Cerebellum', explanation: 'Behind and below the cerebrum, with fine parallel folds. One of the four gross features on the slide.' },
        { id: 'r7', x: 63, y: 92, label: 'Brain stem', explanation: 'The stalk under the cerebrum: midbrain, pons and medulla. Continues into the spinal cord.' },
      ],
      labels: ['Central sulcus', 'Lateral (Sylvian) fissure', 'Frontal lobe', 'Occipital lobe', 'Temporal lobe', 'Cerebellum', 'Brain stem', 'Parietal lobe', 'Insula', 'Olfactory bulb'],
      modelAnswer: [
        '1 is the central sulcus, between the precentral and postcentral gyri.',
        '2 is the lateral fissure, with the temporal lobe below it.',
        '3 is the frontal lobe, anterior to the central sulcus.',
        '4 is the occipital lobe at the back.',
        '5 is the temporal lobe, ventral to the lateral fissure.',
        '6 is the cerebellum, under the posterior cerebrum.',
        '7 is the brain stem, continuing down into the spinal cord.',
      ],
    },
    {
      id: 'q07',
      difficulty: 'medium',
      type: 'essay',
      prompt: 'Give one example of nodes and edges at the cellular scale and one at the brain-region scale. Then explain how structural and functional connectivity differ.',
      points: 3,
      markScheme: [
        { points: 1, text: 'Cellular scale: nodes are neurons, edges are synapses or axons between them.' },
        { points: 1, text: 'Region scale: nodes are brain areas, edges are anatomical pathways or statistical relationships between the areas\' signals.' },
        { points: 1, text: 'Structural connectivity is anatomical connection; functional connectivity is a statistical dependence between signals over time and does not by itself prove a pathway.' },
      ],
      modelAnswer: [
        'At the cellular scale each neuron is a node and each synapse or axon linking two neurons is an edge.',
        'At the region scale each cortical area is a node; an edge can be a fibre pathway between two areas or a correlation between their activity.',
        'Structural connectivity describes the anatomy, the axons and tracts that exist.',
        'Functional connectivity describes a relationship between measured signals that vary together. Two areas can be functionally connected without a direct axonal link, so it is not the same as an anatomical pathway.',
      ],
    },
    {
      id: 'q08',
      difficulty: 'medium',
      type: 'essay',
      prompt: 'Why can neuron counts alone not explain cognitive ability? Use the elephant and human numbers from the lecture in your answer.',
      points: 3,
      markScheme: [
        { points: 1, text: 'Gives the comparison: the elephant has more neurons in total (about 251 billion on the slide) than the human (86 billion), but far fewer cortical neurons (5.6 versus 16.3 billion).' },
        { points: 1, text: 'States that counts must be compared at the same anatomical level, because most elephant neurons are in the cerebellum and expanding the cerebellum has different implications from expanding the cortex.' },
        { points: 1, text: 'Names other factors: cell types, morphology, connectivity, synaptic strength, timing and dynamics of activity.' },
      ],
      modelAnswer: [
        'The elephant brain has more neurons than the human brain in total, about 251 billion on the slide against 86 billion.',
        'Almost all of the elephant\'s neurons are in the cerebellum; its cerebral cortex has about 5.6 billion, while the human cortex has about 16.3 billion.',
        'So whole-brain and cortical counts rank the species differently, and a comparison must say which level it uses.',
        'Even at one level, circuit function depends on cell identity, morphology, connectivity, synaptic strength and the timing of activity, none of which a count captures.',
      ],
    },
    {
      id: 'q09',
      difficulty: 'medium',
      type: 'essay',
      prompt: 'State what each of the following shows: Nissl staining, Golgi staining, and electron microscopy.',
      points: 3,
      markScheme: [
        { points: 1, text: 'Nissl: cell bodies (rough ER and nuclei) of all cells, so cell density, cortical layers and neurons versus glia; not processes.' },
        { points: 1, text: 'Golgi: a small fraction of neurons stained completely, so the shape of whole neurons with dendrites and axon.' },
        { points: 1, text: 'Electron microscopy: membranes and ultrastructure, including synaptic vesicles and the synaptic cleft between separate cells.' },
      ],
      modelAnswer: [
        'Nissl staining colours the RNA-rich rough ER and the nuclei, so it shows every cell body, the layering of the cortex, and lets neurons and glia be told apart. It does not show axons, dendritic trees or synapses.',
        'Golgi staining fills a few neurons entirely, so it shows the shape of whole neurons, their dendritic trees and axons, against unstained tissue.',
        'Electron microscopy resolves membranes and organelles at about 0.1 nm, showing synaptic vesicles and the 20 nm synaptic cleft, which proved that neurons are separate cells.',
      ],
    },
    {
      id: 'q10',
      difficulty: 'medium',
      type: 'order',
      prompt: 'Put the steps of chemical synaptic transmission in order, from the presynaptic action potential to the postsynaptic response.',
      items: [
        'An action potential arrives at the axon terminal',
        'Voltage-gated calcium channels open and calcium enters the terminal',
        'Synaptic vesicles fuse with the membrane at the active zone and release neurotransmitter',
        'Neurotransmitter diffuses across the synaptic cleft',
        'Neurotransmitter binds receptors in the postsynaptic membrane',
        'The postsynaptic cell produces an electrical or biochemical response',
      ],
      correctOrder: [0, 1, 2, 3, 4, 5],
      modelAnswer: [
        'The action potential is the electrical signal that reaches the terminal; nothing else can start the sequence.',
        'Its depolarization opens voltage-gated calcium channels, so calcium flows into the terminal.',
        'Calcium is the trigger for vesicle fusion at the active zone, which releases transmitter into the cleft.',
        'The transmitter must cross the cleft by diffusion before it can act.',
        'It then binds receptors in the postsynaptic density.',
        'Receptor activation converts the chemical signal into an electrical or biochemical change in the target cell.',
      ],
    },
    {
      id: 'q11',
      difficulty: 'medium',
      type: 'mc',
      prompt: 'A structure is described as dorsal in the spinal cord and another as dorsal in the forebrain. Which everyday directions do these two uses of dorsal correspond to?',
      options: [
        { text: 'Posterior in the spinal cord, superior in the forebrain', feedback: 'Correct. The neuraxis bends near the midbrain, so dorsal changes its everyday meaning.' },
        { text: 'Superior in both', feedback: 'In the spinal cord the back of the animal is posterior, not superior.' },
        { text: 'Posterior in both', feedback: 'In the forebrain dorsal means the top of the brain, superior.' },
        { text: 'Anterior in the spinal cord, inferior in the forebrain', feedback: 'That is ventral in both places.' },
      ],
      correct: 0,
      modelAnswer: [
        'Dorsal means toward the back of the animal and ventral toward the belly.',
        'In the spinal cord and brainstem the back is posterior, so dorsal equals posterior and ventral equals anterior.',
        'In the human forebrain the neuraxis has bent, so dorsal equals superior and ventral equals inferior.',
      ],
    },

    // Hard ---------------------------------------------------------------
    {
      id: 'q12',
      difficulty: 'hard',
      type: 'essay',
      prompt: 'Describe the evidence that led from the reticular theory to the neuron doctrine. Name the methods, say what each one showed, and state what finally settled the question. Then explain why two careful scientists could look at the same tissue and disagree, and what the modern doctrine says about how neurons communicate.',
      points: 6,
      markScheme: [
        { points: 1, text: 'Nissl stain: shows cell bodies and their arrangement (cytoarchitecture) but not processes.' },
        { points: 1, text: 'Golgi stain: silver chromate stains a small fraction of neurons completely, revealing soma, dendrites and axon.' },
        { points: 1, text: 'States the two interpretations: Golgi\'s reticular theory (neurites fuse into a continuous network) versus Cajal\'s neuron doctrine (separate cells, contact not continuity).' },
        { points: 1, text: 'Explains why light microscopy could not decide: its resolution limit (about 0.1 micrometre) is larger than the 20 nm gap between neurons.' },
        { points: 1, text: 'Electron microscopy in the 1950s resolved the synaptic cleft and two separate membranes, the final proof.' },
        { points: 1, text: 'Applies the lesson: distinguishes observation from interpretation, and states that neurons communicate at specialized contacts, chemical synapses with a preferred direction (dynamic polarization) or electrical synapses.' },
      ],
      modelAnswer: [
        'The Nissl stain showed that brain tissue is made of cell bodies arranged in patterns, but a stained neuron looked like a lump around a nucleus.',
        'Golgi\'s silver chromate method stained a few neurons in their entirety, showing that each has a soma, many dendrites and one axon.',
        'Golgi read his own pictures as a continuous reticulum of fused neurites. Cajal, using the same stain across species, regions and ages, concluded that neurons are separate cells that communicate by contact, not continuity.',
        'Light microscopes resolve about 0.1 micrometre, but the space between neurons is about 20 nanometres, so no stain could show whether neurites touch or fuse.',
        'The electron microscope of the 1950s, with a resolution of about 0.1 nm, showed the synaptic cleft between two separate membranes and settled the debate for the neuron doctrine.',
        'The stains were the observations; the theories were interpretations, and only a better instrument could decide between them. The modern doctrine says neurons are polarized cells that communicate at synapses in a preferred direction, chemically by transmitter release or electrically through gap junctions.',
      ],
    },
    {
      id: 'q13',
      difficulty: 'hard',
      type: 'essay',
      prompt: 'Compare the roles of astrocytes, oligodendroglia, Schwann cells and microglia. For each, say where it is found and what it does for neuronal signalling. Then predict what would go wrong at a synapse if the surrounding astrocytes stopped working.',
      points: 6,
      markScheme: [
        { points: 1, text: 'Astrocytes: the most numerous glia in the CNS; envelop synapses and blood vessels; regulate the extracellular environment (remove transmitter, control potassium, metabolic support).' },
        { points: 1, text: 'Oligodendroglia: form myelin in the central nervous system; one cell myelinates several axons.' },
        { points: 1, text: 'Schwann cells: form myelin in the peripheral nervous system; one cell per segment of one axon.' },
        { points: 1, text: 'States what myelin does: insulates the axon and speeds conduction; the sheath is interrupted at nodes of Ranvier.' },
        { points: 1, text: 'Microglia: phagocytes that remove debris, respond to damage and infection, and remodel synapses.' },
        { points: 1, text: 'Prediction: without astrocytes, released transmitter would spread and linger and extracellular potassium would rise, so the synapse would signal less precisely and the neurons\' excitability would be disturbed.' },
      ],
      modelAnswer: [
        'Astrocytes fill the space between neurons in the brain and spinal cord, leaving gaps of about 20 nm. Their processes wrap synapses and blood vessels, they remove neurotransmitter from the cleft, and they keep extracellular potassium and other substances at working levels.',
        'Oligodendroglia are the myelinating glia of the central nervous system. One cell sends processes to several axons and wraps a segment of each.',
        'Schwann cells do the same job in the peripheral nervous system, but each Schwann cell myelinates only one segment of one axon.',
        'Myelin is a spiral of membrane that insulates the axon; the sheath is interrupted at the nodes of Ranvier, and it makes the action potential travel faster.',
        'Microglia are the brain\'s phagocytes. They monitor the tissue, respond to damage and infection, remove debris left by dead cells and remodel synaptic connections.',
        'If astrocytes stopped working, transmitter released at a synapse would no longer be confined or cleared, so it would spread to neighbouring synapses and act for longer, and potassium released by active neurons would build up outside them. The synapse would lose its precision and the neurons would become abnormally excitable, showing that glia do far more than fill space.',
      ],
    },
    {
      id: 'q14',
      difficulty: 'hard',
      type: 'mc',
      prompt: 'A toxin blocks the voltage-gated calcium channels of axon terminals but leaves the sodium channels of the axon untouched. Predict the most likely effect on transmission at a chemical synapse.',
      options: [
        { text: 'Action potentials still reach the terminal, but little or no transmitter is released', feedback: 'Correct. Calcium entry is the trigger for vesicle fusion; without it the chemical step fails.' },
        { text: 'Action potentials fail to travel along the axon', feedback: 'Propagation depends on the sodium channels, which are intact.' },
        { text: 'Vesicles fuse normally but the transmitter cannot cross the cleft', feedback: 'Fusion itself needs calcium; the cleft is just a gap.' },
        { text: 'The postsynaptic receptors stop responding to transmitter', feedback: 'The receptors are untouched; the problem is that no transmitter reaches them.' },
      ],
      correct: 0,
      modelAnswer: [
        'The action potential depends on voltage-gated sodium channels in the axon, which the toxin spares, so it still arrives at the terminal.',
        'Arrival normally opens voltage-gated calcium channels; calcium entry triggers vesicle fusion at the active zone.',
        'With the calcium channels blocked, no calcium enters, vesicles do not fuse and little transmitter is released.',
        'The postsynaptic cell therefore receives no signal even though the presynaptic electrical event is normal.',
      ],
    },
    {
      id: 'q15',
      difficulty: 'hard',
      type: 'calc',
      prompt: 'Using the lecture numbers, calculate the percentage of neurons that lie in the cerebral cortex for the human (86 billion total, 16.3 billion cortical) and for the elephant (257 billion total according to the counting study, 5.6 billion cortical). Enter the human percentage. Then compare the two.',
      given: [
        { symbol: 'N_human', value: 86, unit: 'billion neurons' },
        { symbol: 'N_human,cortex', value: 16.3, unit: 'billion neurons' },
        { symbol: 'N_elephant', value: 257, unit: 'billion neurons' },
        { symbol: 'N_elephant,cortex', value: 5.6, unit: 'billion neurons' },
      ],
      answer: { value: 19.0, tolerance: 0.5, unit: '%' },
      steps: [
        { text: 'Write the fraction of neurons in the cortex as a percentage.', math: 'fraction = N_cortex / N_total * 100 %' },
        { text: 'Substitute the human values.', math: 'human = 16.3 / 86 * 100 % = 0.1895 * 100 % = 19.0 %' },
        { text: 'Substitute the elephant values.', math: 'elephant = 5.6 / 257 * 100 % = 0.0218 * 100 % = 2.2 %' },
        { text: 'Compare the two fractions.', math: '19.0 % / 2.2 % = 8.7' },
      ],
      modelAnswer: [
        'About 19 % of human neurons are in the cerebral cortex, against about 2 % of elephant neurons, a difference of almost nine times.',
        'The elephant has three times more neurons overall, but nearly all of them are in the cerebellum, so the two species look very different depending on which anatomical level is compared.',
        'This is why a whole-brain count and a cortical count answer different questions, and why neuron number alone does not rank cognitive ability.',
      ],
    },
  ],
};
