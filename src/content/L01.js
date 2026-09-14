// Lecture 1: neuroscience, neurons and glia, structure of the nervous
// system. Scope: docs/scope/L01.md. Every section and question traces
// to a line in that file. Sections are written as blocks (see
// docs/CONTENT_SCHEMA.md, "Blocks"); figures are raster assets in
// src/assets/figures/L01 (sources in CREDITS.md) shown through the
// image-hotspots widget, plus two d3 charts.

import { neuronCountsFigure, disorderBurdenFigure } from './figures/charts.js';
import { axonalTransportFigure } from './figures/cells.js';

const fig = (name) => new URL(`../assets/figures/L01/${name}.webp`, import.meta.url).href;

function hotspots(name, aspect, alt, regions, extra = {}) {
  return { src: fig(name), alt, aspect, regions, ...extra };
}

function chart(figure, alt, extra = {}) {
  return { svg: figure.svg, alt, aspect: figure.aspect, regions: figure.regions, quiz: false, layout: 'stack', ...extra };
}

function transportFigure() {
  const figure = axonalTransportFigure(TRANSPORT_REGIONS);
  return { svg: figure.svg, alt: 'Axonal transport along a microtubule.', aspect: figure.aspect, regions: figure.regions, gutter: 'ends' };
}

function figureBlock(props, caption, fallbackAlt) {
  return { type: 'figure', visual: { type: 'widget', name: 'image-hotspots', props, caption, fallbackAlt } };
}

// ---------------------------------------------------------------------
// Region sets. Coordinates are percentages of each image. mx, my place
// the anchor dot on the structure when the region centre is not the
// best spot; the badge itself sits in a gutter outside the picture, or
// inline (side: 'inline') where the picture has clear space.

const SCALES_REGIONS = [
  { id: 'coarse', label: 'Metres to millimetres', body: 'Body, whole brain, brain regions. The scale of behaviour, imaging and anatomy.', shape: 'rect', x: 22, y: 27, w: 34, h: 36, mx: 8, my: 27 },
  { id: 'cells', label: 'Micrometres', body: 'Microcircuits, cells and synapses. The scale of the microscope.', shape: 'rect', x: 22, y: 63, w: 34, h: 18, mx: 8, my: 63 },
  { id: 'molecules', label: 'Nanometres', body: 'Chromosomes and proteins. The scale of molecular biology.', shape: 'rect', x: 22, y: 90, w: 34, h: 16, mx: 8, my: 90 },
  { id: 'slow', label: 'Years to hours', body: 'Development and aging, behaviour, learning. Slow processes that change the brain.', shape: 'rect', x: 78, y: 20, w: 34, h: 30, mx: 94, my: 20 },
  { id: 'medium', label: 'Minutes to seconds', body: 'Synaptic plasticity and metabolism.', shape: 'rect', x: 78, y: 50, w: 34, h: 16, mx: 94, my: 50 },
  { id: 'fast', label: 'Milliseconds to picoseconds', body: 'The action potential, vesicle release and molecular dynamics. The fastest events in the brain.', shape: 'rect', x: 78, y: 80, w: 34, h: 38, mx: 94, my: 80 },
];

const VIEW_REGIONS = [
  { id: 'dorsal', label: 'Dorsal view', body: 'Seen from above. Both hemispheres, the midline between them.', x: 23, y: 27, w: 38, h: 46, mx: 12, my: 27 },
  { id: 'ventral', label: 'Ventral view', body: 'Seen from below. The brain stem and cerebellum are visible, and the olfactory bulbs at the front.', x: 72, y: 27, w: 40, h: 46, mx: 86, my: 27 },
  { id: 'lateral', label: 'Lateral view', body: 'Seen from the side. Anterior is to the left. The view used for lobes and functional areas.', x: 24, y: 80, w: 46, h: 36, mx: 12, my: 80 },
  { id: 'medial', label: 'Medial view', body: 'The inner surface after a cut down the midline (a midsagittal cut). Shows the corpus callosum, brain stem and cerebellum.', x: 74, y: 80, w: 46, h: 36, mx: 86, my: 80 },
];

const PLANE_REGIONS = [
  { id: 'coronal', label: 'Coronal plane', body: 'A vertical cut from side to side. Separates anterior from posterior. Seen edge-on in the lateral view.', shape: 'line', x: 27, y: 63, x2: 27, y2: 95, mx: 27, my: 61 },
  { id: 'horizontal', label: 'Horizontal plane', body: 'A cut parallel to the ground. Separates superior from inferior. Seen edge-on in the lateral view.', shape: 'line', x: 3, y: 80, x2: 47, y2: 80, mx: 10, my: 80 },
  { id: 'sagittal', label: 'Sagittal plane', body: 'A vertical cut from front to back. Separates left from right. The midsagittal cut runs down the midline of the dorsal view and gives the medial view.', shape: 'line', x: 23, y: 5, x2: 23, y2: 50, mx: 23, my: 10 },
  { id: 'rostral', label: 'Rostral', body: 'Toward the nose. In the forebrain this is the anterior end (the frontal pole here); in the brainstem and spinal cord it means toward the head, so superior.', x: 6, y: 79, w: 8, h: 14, mx: 6, my: 72 },
  { id: 'caudal', label: 'Caudal', body: 'Toward the tail. In the forebrain this is the posterior end (the occipital pole); in the brainstem and spinal cord it means toward the feet, so inferior.', x: 46, y: 80, w: 8, h: 14, mx: 47, my: 72, side: 'inline', dir: 'up-right' },
];

const DIRECTION_REGIONS = [
  { id: 'anterior', label: 'Anterior', body: 'Toward the front. The frontal pole in the lateral view.', x: 6, y: 79, w: 8, h: 14 },
  { id: 'posterior', label: 'Posterior', body: 'Toward the back. The occipital pole.', x: 46, y: 80, w: 8, h: 14, mx: 47, my: 72, side: 'inline', dir: 'up-right' },
  { id: 'dorsal', label: 'Dorsal (superior)', body: 'Toward the back of the animal. In the human forebrain this is the top of the head, so dorsal equals superior here.', shape: 'rect', x: 24, y: 64, w: 22, h: 5 },
  { id: 'ventral', label: 'Ventral (inferior)', body: 'Toward the belly. In the forebrain this is the underside, so ventral equals inferior here.', shape: 'rect', x: 24, y: 95, w: 22, h: 5 },
  { id: 'medial', label: 'Medial', body: 'Toward the midline, seen here as the groove between the hemispheres in the dorsal view.', shape: 'line', x: 23, y: 6, x2: 23, y2: 49, mx: 23, my: 7, side: 'inline', dir: 'up' },
  { id: 'lateral', label: 'Lateral', body: 'Away from the midline, toward the outer edge of a hemisphere.', x: 6, y: 27, w: 6, h: 30 },
];

const GROSS_REGIONS = [
  { id: 'cerebrum', label: 'Cerebrum', body: 'The largest part. Two hemispheres with a folded surface. Everything in the lateral view except the cerebellum and brain stem.', x: 48, y: 44, w: 84, h: 76, mx: 31, my: 23 },
  { id: 'cerebellum', label: 'Cerebellum', body: 'Below and behind the cerebrum, with fine parallel folds.', x: 76, y: 82, w: 26, h: 30, mx: 78, my: 91 },
  { id: 'brainstem', label: 'Brain stem', body: 'The stalk under the cerebrum: midbrain, pons and medulla. It continues into the spinal cord.', shape: 'rect', x: 60, y: 96, w: 16, h: 8, mx: 57, my: 96 },
  { id: 'olfactory', label: 'Olfactory bulb', body: 'Small structure on the ventral surface under the frontal lobe. Receives primary olfactory input.', x: 16, y: 79, w: 9, h: 6, mx: 17, my: 80 },
];

const GYRI_REGIONS = [
  { id: 'precentral', label: 'Precentral gyrus', body: 'Just anterior to the central sulcus (purple). Primary motor cortex.', shape: 'line', x: 45.8, y: 15.6, x2: 41.7, y2: 50.0, mx: 40.3, my: 35.4, side: 'top' },
  { id: 'central-sulcus', label: 'Central sulcus', body: 'The groove from the top of the hemisphere down toward the lateral fissure. Frontal lobe in front, parietal lobe behind.', shape: 'line', x: 50.0, y: 13.5, x2: 44.4, y2: 50.0, mx: 47.9, my: 27.1, side: 'top' },
  { id: 'postcentral', label: 'Postcentral gyrus', body: 'Just posterior to the central sulcus (yellow). Primary somatosensory cortex.', shape: 'line', x: 54.2, y: 13.5, x2: 47.2, y2: 50.0, mx: 52.1, my: 24.0, side: 'top' },
  { id: 'lateral-fissure', label: 'Lateral (Sylvian) fissure', body: 'The deep groove that separates the temporal lobe from the frontal and parietal lobes. The insula is buried inside it.', shape: 'line', x: 18.1, y: 53.1, x2: 56.9, y2: 47.9, mx: 34.7, my: 53.1 },
  { id: 'superior-temporal', label: 'Superior temporal gyrus', body: 'The gyrus just below the lateral fissure (red). Primary auditory cortex on its upper surface.', shape: 'line', x: 36.1, y: 56.2, x2: 68.1, y2: 50.0, mx: 61.1, my: 52.1 },
];

const LOBE_REGIONS = [
  { id: 'frontal', label: 'Frontal lobe', body: 'Anterior to the central sulcus and above the lateral fissure. Motor areas at the back, prefrontal association cortex in front.', x: 25, y: 29, w: 26, h: 42, mx: 18, my: 24 },
  { id: 'parietal', label: 'Parietal lobe', body: 'Behind the central sulcus. Somatosensory cortex in the postcentral gyrus, posterior parietal association cortex behind it.', x: 46, y: 23, w: 20, h: 34, mx: 48, my: 13, side: 'top' },
  { id: 'temporal', label: 'Temporal lobe', body: 'Below the lateral fissure. Auditory cortex on the superior temporal gyrus, inferotemporal association cortex lower down.', x: 38, y: 62, w: 28, h: 32, mx: 29, my: 69 },
  { id: 'occipital', label: 'Occipital lobe', body: 'The back of the cerebrum. Visual cortex.', x: 56, y: 48, w: 12, h: 32, mx: 58, my: 30, side: 'top' },
  { id: 'central-sulcus', label: 'Central sulcus', body: 'Divides the frontal lobe from the parietal lobe.', shape: 'line', x: 36, y: 9, x2: 44, y2: 46, mx: 37, my: 13, side: 'top' },
  { id: 'lateral-fissure', label: 'Lateral (Sylvian) fissure', body: 'Separates the temporal lobe from the frontal and parietal lobes.', shape: 'line', x: 22, y: 54, x2: 48, y2: 43, mx: 25, my: 53 },
  { id: 'insula', label: 'Insula', body: 'Cortex buried inside the lateral fissure, seen on the right only because the edges of the fissure have been pulled apart. The gustatory cortex is here.', x: 82, y: 36, w: 8, h: 12, mx: 80, my: 40 },
];

const SENSORY_MOTOR_REGIONS = [
  { id: 'motor', label: 'Primary motor cortex (area 4)', body: 'In the precentral gyrus, just anterior to the central sulcus. Controls voluntary movement.', shape: 'line', x: 46, y: 13, x2: 38, y2: 46, mx: 43.5, my: 17, side: 'top' },
  { id: 'premotor', label: 'Premotor area (area 6)', body: 'Anterior to the primary motor cortex, on the lateral surface. Plans movement.', x: 33, y: 28, w: 10, h: 20, mx: 34, my: 26 },
  { id: 'sma', label: 'Supplementary motor area (area 6)', body: 'Also area 6, on the upper and medial part of the frontal lobe in front of area 4.', x: 37, y: 14, w: 12, h: 8, mx: 39, my: 12, side: 'top' },
  { id: 'somatosensory', label: 'Somatosensory cortex (areas 3, 1, 2)', body: 'In the postcentral gyrus, just behind the central sulcus. Touch and body sensation.', shape: 'line', x: 51, y: 13, x2: 43, y2: 47, mx: 49, my: 19, side: 'top' },
  { id: 'visual', label: 'Visual cortex (areas 17, 18, 19)', body: 'The occipital lobe. Area 17 is primary visual cortex, V1.', x: 68, y: 42, w: 16, h: 30, mx: 75, my: 32 },
  { id: 'auditory', label: 'Auditory cortex (areas 41, 42)', body: 'On the superior temporal gyrus, partly hidden in the lateral fissure.', x: 46, y: 53, w: 14, h: 8, mx: 47, my: 53, side: 'inline', dir: 'down-right' },
  { id: 'gustatory', label: 'Gustatory cortex (area 43)', body: 'Taste. Buried in the insula and the parietal operculum, shown on the small brain with the fissure opened.', x: 84, y: 79, w: 5, h: 6, mx: 84, my: 80 },
];

const ASSOCIATION_REGIONS = [
  { id: 'prefrontal', label: 'Prefrontal cortex', body: 'The association cortex of the frontal lobe, in front of the motor areas.', x: 24, y: 45, w: 30, h: 44, mx: 24, my: 60 },
  { id: 'posterior-parietal', label: 'Posterior parietal cortex (areas 5, 7)', body: 'Association cortex behind the somatosensory area.', x: 58, y: 25, w: 22, h: 26, mx: 66, my: 22 },
  { id: 'inferotemporal', label: 'Inferotemporal cortex (areas 20, 21, 37)', body: 'Association cortex on the lower temporal lobe.', x: 38, y: 70, w: 26, h: 14, mx: 37, my: 70 },
];

const BRODMANN_REGIONS = [
  { id: 'b4', label: 'Area 4: primary motor cortex', body: 'The red strip in the precentral gyrus.', shape: 'line', x: 50.5, y: 16, x2: 43.3, y2: 49, mx: 51.3, my: 20 },
  { id: 'b6', label: 'Area 6: premotor and supplementary motor areas', body: 'Anterior to area 4.', x: 41, y: 27, w: 8, h: 20, mx: 41, my: 20 },
  { id: 'b312', label: 'Areas 3, 1, 2: somatosensory cortex', body: 'The strip in the postcentral gyrus, behind the central sulcus.', shape: 'line', x: 54.6, y: 13, x2: 44.3, y2: 49, mx: 54, my: 17 },
  { id: 'b57', label: 'Areas 5, 7: posterior parietal cortex', body: 'Behind the somatosensory strip.', x: 66, y: 35, w: 16, h: 20, mx: 68, my: 26 },
  { id: 'b17', label: 'Areas 17, 18, 19: visual cortex', body: 'Area 17 (V1) at the occipital pole, 18 and 19 around it.', x: 88.7, y: 56.5, w: 14, h: 24, mx: 84, my: 66 },
  { id: 'b41', label: 'Areas 41, 42: auditory cortex', body: 'On the superior temporal gyrus.', x: 51.5, y: 57.6, w: 12, h: 8, mx: 60, my: 60, side: 'inline', dir: 'right' },
  { id: 'b20', label: 'Areas 20, 21, 37: inferotemporal cortex', body: 'The lower temporal lobe.', x: 40.2, y: 76, w: 16, h: 12, mx: 44, my: 84 },
];

const LAYER_REGIONS = [
  { id: 'l4sub', label: 'Layer 4 of V1: 4A, 4B, 4C', body: 'In primary visual cortex layer 4 is thick and split into sublayers, because it receives the dense input from the thalamus.', shape: 'rect', x: 12, y: 19, w: 14, h: 14 },
  { id: 'gennari', label: 'Line of Gennari', body: 'A pale stripe within layer 4 of V1, made of myelinated fibres. Visible to the naked eye.', x: 36, y: 34, w: 8, h: 7 },
  { id: 'transition', label: 'V1 to V2 transition', body: 'Where the thick, subdivided layer 4 ends abruptly. A cytoarchitectonic border.', x: 72, y: 41, w: 8, h: 8 },
  { id: 'l4v2', label: 'Layer 4 in V2', body: 'Thin and undivided. The same layer looks different across the border.', x: 78, y: 63, w: 8, h: 8 },
];

const STAIN_REGIONS = [
  { id: 'nissl-body', label: 'Nissl: a neuron cell body', body: 'The basic dye binds RNA in the rough ER and the nucleus, so the soma is dark and the processes are invisible.', x: 10, y: 32, w: 8, h: 12 },
  { id: 'nissl-glia', label: 'Nissl: small cells', body: 'Small stained nuclei with little cytoplasm are glia. Neurons and glia can be told apart by size and shape.', x: 25, y: 62, w: 6, h: 9 },
  { id: 'golgi-neuron', label: 'Golgi: one whole neuron', body: 'Silver chromate fills a few neurons completely: soma, dendrites and axon stand out in black.', x: 48, y: 32, w: 10, h: 34 },
  { id: 'golgi-background', label: 'Golgi: unstained tissue', body: 'Most cells take up no stain, which is why single neurons can be followed.', x: 67, y: 72, w: 8, h: 12 },
  { id: 'em-terminal', label: 'Electron microscope: presynaptic terminal', body: 'Coloured green. Filled with synaptic vesicles.', x: 90, y: 22, w: 8, h: 12 },
  { id: 'em-spine', label: 'Electron microscope: postsynaptic spine', body: 'Coloured yellow. Its membrane is separate from the terminal, with the synaptic cleft between.', x: 86, y: 56, w: 10, h: 30 },
  { id: 'em-astrocyte', label: 'Electron microscope: astrocyte process', body: 'Coloured blue. Wraps the synapse and restricts the extracellular space.', x: 80, y: 16, w: 5, h: 12 },
];

const NEURON_REGIONS = [
  { id: 'dendrites', label: 'Dendrites', body: 'Branching neurites that receive most of the synaptic input. They taper and are rarely longer than 2 mm.', x: 16, y: 35, w: 26, h: 40, mx: 16, my: 35 },
  { id: 'soma', label: 'Soma (cell body)', body: 'About 20 micrometres across. Holds the nucleus and the organelles that make proteins and energy.', x: 35, y: 50, w: 20, h: 26, mx: 41, my: 63, side: 'bottom' },
  { id: 'nucleus', label: 'Nucleus', body: 'Holds the chromosomes. Genes are read here into mRNA, which leaves through pores to be made into protein.', x: 34, y: 48, w: 8, h: 9, mx: 34, my: 48, side: 'top' },
  { id: 'hillock', label: 'Axon hillock', body: 'Where the axon begins, tapering away from the soma.', x: 44, y: 58, w: 6, h: 7, mx: 47, my: 70, side: 'bottom' },
  { id: 'axon', label: 'Axon', body: 'The single output fibre. Uniform diameter, up to a metre long, no ribosomes.', x: 68, y: 60, w: 30, h: 14, mx: 78, my: 60 },
  { id: 'myelin', label: 'Myelin sheath', body: 'Wrapping made by glia, interrupted at the nodes of Ranvier. Speeds conduction.', x: 58, y: 62, w: 9, h: 9, mx: 57, my: 71, side: 'bottom' },
  { id: 'terminals', label: 'Axon terminals', body: 'The branched end of the axon. Each terminal contacts a target cell at a synapse.', x: 90, y: 28, w: 18, h: 26, mx: 92, my: 18 },
];

const INTERNAL_REGIONS = [
  { id: 'nucleus', label: 'Nucleus', body: 'DNA in chromosomes. Transcription makes mRNA, which leaves through nuclear pores.', x: 56, y: 60, w: 14, h: 16 },
  { id: 'rough-er', label: 'Rough ER', body: 'Membrane stacks studded with ribosomes. Makes membrane proteins. This is the Nissl substance.', x: 47, y: 52, w: 10, h: 10, side: 'right' },
  { id: 'mitochondrion', label: 'Mitochondrion', body: 'Cellular respiration; makes the ATP that fuels the membrane pumps.', x: 67, y: 45, w: 6, h: 7 },
  { id: 'golgi', label: 'Golgi apparatus', body: 'Sorts finished proteins for delivery to the axon or the dendrites.', x: 72, y: 65, w: 7, h: 10 },
  { id: 'smooth-er', label: 'Smooth ER', body: 'No ribosomes. Folds proteins and regulates substances such as calcium.', x: 73, y: 76, w: 6, h: 6 },
  { id: 'hillock', label: 'Axon hillock', body: 'Where the soma narrows into the axon.', x: 62, y: 83, w: 8, h: 6 },
  { id: 'microtubules', label: 'Microtubules', body: 'Cytoskeletal tracks running down the axon; the rails for axoplasmic transport.', x: 62, y: 91, w: 6, h: 6 },
];

const TRANSPORT_REGIONS = {
  soma: { label: 'Soma', body: 'The only part of the neuron with rough ER and ribosomes, so every protein the axon and terminal need starts here.' },
  microtubule: { label: 'Microtubule', body: 'A 20 nm tube of tubulin running the length of the axon. The track that both motor proteins walk along.' },
  anterograde: { label: 'Anterograde transport: kinesin', body: 'Kinesin walks a vesicle from the soma toward the terminal, using ATP. Fast transport moves up to 1000 mm per day.' },
  retrograde: { label: 'Retrograde transport: dynein', body: 'Dynein carries material the other way, from the terminal back to the soma, including signals about what the terminal has met.' },
  terminal: { label: 'Axon terminal', body: 'The destination. It has no ribosomes of its own, so it depends entirely on what arrives down the axon.' },
};

const SYNAPSE_REGIONS = [
  { id: 'terminal', label: 'Presynaptic axon terminal', body: 'The swollen end of the axon. No ribosomes, no microtubules, many mitochondria.', x: 48, y: 32, w: 80, h: 36, mx: 26, my: 34 },
  { id: 'vesicle', label: 'Synaptic vesicle', body: 'About 50 nm across, filled with neurotransmitter.', x: 37, y: 41, w: 14, h: 9, mx: 37, my: 41 },
  { id: 'active-zone', label: 'Active zone', body: 'The release face of the terminal, coated with protein, where vesicles fuse with the membrane.', x: 66, y: 50, w: 20, h: 6, mx: 66, my: 47 },
  { id: 'cleft', label: 'Synaptic cleft', body: 'The gap between the two cells, 20 to 50 nm wide. Transmitter diffuses across it.', shape: 'line', x: 10, y: 55, x2: 93, y2: 55, mx: 88, my: 56 },
  { id: 'transmitter', label: 'Neurotransmitter', body: 'Released molecules crossing the cleft.', x: 55, y: 59, w: 40, h: 9, mx: 33, my: 59 },
  { id: 'postsynaptic-membrane', label: 'Postsynaptic membrane (receptors)', body: 'Carries the receptors that bind transmitter; the postsynaptic density.', x: 50, y: 64, w: 78, h: 8, mx: 24, my: 65 },
  { id: 'dendrite', label: 'Postsynaptic dendrite', body: 'The target cell, usually a dendrite or soma. Produces an electrical or biochemical response.', x: 50, y: 82, w: 70, h: 30, mx: 50, my: 84 },
];

const GLIA_REGIONS = [
  { id: 'astrocyte', label: 'Astrocyte', body: 'The most numerous glia. Star-shaped, fills the space between neurons and vessels, wraps synapses, clears transmitter and potassium.', x: 15, y: 50, w: 26, h: 80, mx: 14, my: 47 },
  { id: 'oligo', label: 'Oligodendroglial cell', body: 'Makes myelin in the central nervous system. One cell sends processes to several axons.', x: 44, y: 30, w: 10, h: 20, mx: 44, my: 30 },
  { id: 'myelin', label: 'Myelin sheath', body: 'Many layers of glial membrane wrapped round a segment of axon.', x: 58, y: 50, w: 10, h: 10, mx: 58, my: 50 },
  { id: 'node', label: 'Node of Ranvier', body: 'The gap between two myelin segments where the axon membrane is exposed.', x: 46.5, y: 50, w: 3, h: 9, mx: 46.5, my: 62 },
  { id: 'axon', label: 'Axon', body: 'The fibre being insulated. Schwann cells do the same job in the peripheral nervous system, one segment of one axon each.', x: 66, y: 57, w: 6, h: 5, mx: 67, my: 62 },
  { id: 'microglia', label: 'Microglial cell', body: 'The brain\'s phagocyte. Monitors tissue, removes debris and remodels synapses.', x: 86, y: 50, w: 26, h: 80, mx: 85, my: 50 },
];

const NEURON_COUNTS = neuronCountsFigure();
const DISORDERS = disorderBurdenFigure();

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
      keyTerms: ['spatial scale', 'time scale', 'network', 'node', 'edge', 'structural connectivity', 'functional connectivity'],
      blocks: [
        { type: 'text', body: 'Brain research spans a huge range of sizes and speeds. Any one method sees only a slice of each range.' },
        { type: 'definition', term: 'Spatial scale', body: 'The size of what is measured. Proteins and chromosomes are nanometres; synapses and cells micrometres; microcircuits and regions millimetres; the whole brain centimetres; the body metres.' },
        { type: 'definition', term: 'Time scale', body: 'The speed of what is measured. Molecular dynamics take picoseconds; vesicle release and the action potential microseconds to milliseconds; metabolism and synaptic plasticity seconds to minutes; learning hours; behaviour days; development and aging years.' },
        figureBlock(
          hotspots('scales', 850 / 854, 'The two ladders from the slide: spatial scales on the left from metres down to nanometres, time scales on the right from years down to picoseconds.', SCALES_REGIONS, { quiz: false }),
          'The two ladders from the slide. Structure runs from body to proteins; function from development and aging to molecular dynamics.',
          'Two ladders. Left: spatial scale from metres (body) down to nanometres (proteins). Right: time scale from years (development and aging) down to picoseconds (molecular dynamics).'
        ),
        { type: 'whyItMatters', body: 'A result applies to the scale and time window that was measured. A claim should say which.' },
        { type: 'definition', term: 'Network', body: 'A set of nodes joined by edges. The brain can be described as a network at any scale.' },
        {
          type: 'compare',
          title: 'Nodes and edges at two scales',
          columns: ['Cellular scale', 'Regional scale'],
          rows: [
            { label: 'Node', cells: ['A neuron', 'A brain area'] },
            { label: 'Edge', cells: ['A synapse or an axon', 'An anatomical pathway, or a statistical relationship between the activity of two areas'] },
          ],
        },
        {
          type: 'compare',
          title: 'Structural versus functional connectivity',
          columns: ['Structural', 'Functional'],
          rows: [
            { label: 'What it is', cells: ['Anatomical connections: axons, tracts', 'Signals of two nodes vary together over time'] },
            { label: 'Kind of statement', cells: ['About anatomy', 'About measurements'] },
            { label: 'Proves a pathway?', cells: ['Yes, by definition', 'No. Correlated activity does not prove a direct axonal link'] },
          ],
        },
        { type: 'detail', title: 'The measured network depends on analysis choices', body: ['How the brain is divided into nodes, what threshold counts as an edge, and which time window and resolution are used all change the network you get.', 'The slide adds a topological axis (local, meso-scale, global) and a temporal axis (instantaneous, development and lifespan, evolutionary).'] },
      ],
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
      keyTerms: ['prevalence', 'burden', 'mechanistic explanation'],
      blocks: [
        { type: 'keyNumber', title: 'Europe, 2010 data, 30 countries', items: [
          { value: '800 billion euro', label: 'per year, the total cost of brain disorders' },
          { value: '179 million', label: 'people affected' },
        ] },
        { type: 'definition', term: 'Cost components', body: 'Health care, non-medical support such as care at home, and lost productivity.' },
        figureBlock(
          chart(DISORDERS, 'Three dot plots for twelve disorders: people affected, cost per person, and total cost.'),
          'Twelve disorders from the slide, ordered by total cost. The small grey number in each column is the rank by that column alone: the three measures rank the disorders differently. Dementia is marked.',
          'Three columns of dots, rows ordered by total cost: mood disorders, dementia and anxiety disorders lead. By people affected the order is anxiety disorders, migraine, mood disorders. By cost per person it is multiple sclerosis, brain tumour, stroke.'
        ),
        {
          type: 'compare',
          title: 'Three ways to rank a disorder',
          columns: ['Most people affected', 'Highest cost per person', 'Largest total cost'],
          rows: [
            { label: 'Disorders', cells: ['Anxiety, migraine, mood disorders', 'Brain tumour, multiple sclerosis, stroke', 'Mood disorders, dementia'] },
            { label: 'Why', cells: ['Common, cheap per person', 'Rare, expensive per person', 'Prevalence times cost per person'] },
          ],
        },
        { type: 'whyItMatters', body: 'The burden of a disorder on a population depends on prevalence, on the disability and care it causes, and on its wider economic effects. Severity still varies between patients.' },
        { type: 'detail', title: 'What disorders affect, and what an explanation needs', body: ['Brain disorders can affect movement, sensation, mood, cognition, communication and independence, because all of these arise from interacting processes across the nervous system. The textbook names Alzheimer\'s disease, Parkinson\'s disease, depression, schizophrenia, stroke, epilepsy and multiple sclerosis.', 'A mechanistic explanation links changes in molecules or cells to altered circuit function and then to symptoms, and allows for distributed pathology, compensation, and variation between patients.'] },
      ],
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
      keyTerms: ['soma', 'dendrites', 'axon', 'axon terminal', 'synapse'],
      blocks: [
        { type: 'definition', term: 'Three regions of a neuron', body: 'The soma, or cell body, keeps the cell alive and holds the nucleus. The dendrites receive and combine most of the input. The axon carries the output to axon terminals, which contact other cells at synapses.' },
        { type: 'keyNumber', title: 'The human brain', items: [
          { value: '86 billion', label: 'neurons' },
          { value: '100 trillion', label: 'connections between them' },
          { value: '16.3 billion', label: 'of the neurons are in the cerebral cortex' },
          { value: '5600', label: 'nerve fibres connected to the single neuron on the slide' },
        ], note: 'There are roughly as many glial cells as neurons.' },
        figureBlock(
          chart(NEURON_COUNTS, 'Two dot plots of neuron counts for six species: whole brain and cerebral cortex.'),
          'Neuron counts from the slide, in billions. The elephant leads on the whole brain, the human on the cerebral cortex. Human is marked.',
          'Two columns of dots for six species. Whole brain: elephant 251, human 86, gorilla 33, chimpanzee 22, rhesus 6, marmoset 0.6 billion. Cerebral cortex: human 16.3, gorilla 9.1, chimpanzee 6, elephant 5.6, rhesus 1.7, marmoset 0.2 billion.'
        ),
        { type: 'example', title: 'Elephant versus human', body: 'The elephant has more neurons in total (251 billion on the slide, nearly all in the cerebellum) but only about 5.6 billion cortical neurons. The human cortex has 16.3 billion. Whole-brain counts and cortex counts give different rankings.' },
        { type: 'misconception', wrong: 'More neurons means a smarter animal.', right: 'Counts must be compared at the same anatomical level, and even then cell types, morphology, connectivity, synaptic strength and timing all matter. Neuron number sets one limit, not a ranking.' },
      ],
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
            { text: 'In the cerebellum', feedback: 'Correct. About 251 billion in the whole brain on the slide, but only 5.6 billion of them in the cortex.' },
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
      keyTerms: ['anterior', 'posterior', 'medial', 'lateral', 'superior', 'inferior', 'dorsal', 'ventral', 'rostral', 'caudal', 'coronal', 'sagittal', 'horizontal'],
      blocks: [
        { type: 'whyItMatters', body: 'Direction terms give a shared coordinate system for specimens, drawings, scans and surgery. A precise description names the side, the view or section plane, the structure, and its relation to a landmark.' },
        {
          type: 'compare',
          title: 'Direction pairs',
          columns: ['Toward', 'Opposite'],
          rows: [
            { label: 'Anterior / posterior', cells: ['The front', 'The back'] },
            { label: 'Medial / lateral', cells: ['The midline', 'Away from the midline'] },
            { label: 'Superior / inferior', cells: ['The top of the head', 'The feet'] },
            { label: 'Dorsal / ventral', cells: ['The back of the animal', 'The belly'] },
            { label: 'Rostral / caudal', cells: ['The nose', 'The tail'] },
          ],
        },
        figureBlock(
          hotspots('four-views', 1001 / 1047, 'Four views of the brain: dorsal and ventral above, lateral and medial below.', DIRECTION_REGIONS, { intro: 'Directions on the lateral view (bottom left) and the dorsal view (top left).' }),
          'Directions placed on the slide figure. Anterior is to the left in the lateral view.',
          'A lateral view with anterior, posterior, dorsal and ventral marked, and a dorsal view with medial and lateral marked.'
        ),
        {
          type: 'compare',
          title: 'Why the slide lists both dorsal and superior',
          rowLabel: 'Term',
          columns: ['In the forebrain', 'In the brainstem and spinal cord'],
          rows: [
            { label: 'Dorsal', cells: ['Superior, the top of the head', 'Posterior, the back of the animal'] },
            { label: 'Ventral', cells: ['Inferior, the underside', 'Anterior, the belly side'] },
            { label: 'Rostral', cells: ['Anterior, toward the frontal pole', 'Superior, toward the head'] },
            { label: 'Caudal', cells: ['Posterior, toward the occipital pole', 'Inferior, toward the feet'] },
          ],
        },
        { type: 'example', title: 'One axis, bent', body: 'The neuraxis bends near the midbrain, so the same word lands on a different everyday direction above and below the bend. HW1 exercise 1 asks for both pairs.' },
        { type: 'definition', term: 'View', body: 'What you see from one side. Dorsal from above, ventral from below, lateral from the side, medial the inner surface after a cut down the midline.' },
        figureBlock(
          hotspots('four-views', 1001 / 1047, 'Four views of the brain: dorsal and ventral above, lateral and medial below.', VIEW_REGIONS),
          'The four views from the slide. Quiz yourself on which is which.',
          'Dorsal view top left, ventral view top right, lateral view bottom left, medial view bottom right.'
        ),
        {
          type: 'steps',
          title: 'Three section planes',
          steps: [
            { title: 'Coronal:', body: 'a vertical cut from side to side. Separates anterior from posterior.' },
            { title: 'Sagittal:', body: 'a vertical cut from front to back. Separates left from right. The midsagittal cut runs down the midline.' },
            { title: 'Horizontal:', body: 'a cut parallel to the ground. Separates superior from inferior.' },
          ],
        },
        figureBlock(
          hotspots('four-views', 1001 / 1047, 'Four views of the brain with three section planes marked.', PLANE_REGIONS, { showShapes: true, intro: 'Each plane is drawn where you look along it: coronal and horizontal on the lateral view, sagittal on the dorsal view.' }),
          'Planes drawn edge-on, with the rostral and caudal ends of the forebrain marked. The Nissl-stained whole-brain slice later in this lecture is a coronal section.',
          'Coronal plane as a vertical line and horizontal plane as a horizontal line on the lateral view; sagittal plane as the midline on the dorsal view; rostral at the frontal pole and caudal at the occipital pole.'
        ),
      ],
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
        {
          id: 'directions-4',
          prompt: 'Rostral means toward the nose. In the human forebrain, which everyday direction is that?',
          options: [
            { text: 'Anterior', feedback: 'Correct. The nose is at the front, so rostral equals anterior in the forebrain and caudal equals posterior.' },
            { text: 'Superior', feedback: 'That holds in the brainstem and spinal cord, where the neuraxis runs vertically.' },
            { text: 'Medial', feedback: 'Medial is about distance from the midline, not front and back.' },
            { text: 'Ventral', feedback: 'Ventral means toward the belly, the underside of the forebrain.' },
          ],
          correct: 0,
        },
      ],
    },

    // 5 -----------------------------------------------------------------
    {
      id: 'gross-anatomy',
      title: 'Gross anatomy and cortical surface anatomy',
      keyTerms: ['cerebrum', 'cerebellum', 'brain stem', 'olfactory bulb', 'gyri', 'sulci', 'fissures', 'central sulcus', 'precentral gyrus', 'postcentral gyrus', 'lateral (Sylvian) fissure', 'superior temporal gyrus', 'frontal lobe', 'parietal lobe', 'temporal lobe', 'occipital lobe', 'insula'],
      blocks: [
        { type: 'definition', term: 'Gross anatomy', body: 'What you can see without a microscope. In the lateral view: the cerebrum, the cerebellum below and behind it, the brain stem under it, and the small olfactory bulb on the ventral surface.' },
        figureBlock(
          hotspots('gross-features', 939 / 655, 'Lateral view of the brain with four gross features marked.', GROSS_REGIONS),
          'The four gross features from the slide. The brain stem contains the midbrain, pons and medulla and continues into the spinal cord.',
          'Lateral view of the brain. Markers on the cerebrum, the cerebellum, the brain stem and the olfactory bulb.'
        ),
        { type: 'definition', term: 'Gyri, sulci, fissures', body: 'The surface of the cerebrum is folded. The bumps are gyri, the grooves sulci, and especially deep grooves fissures. Folding fits more cortical surface inside the skull.' },
        figureBlock(
          hotspots('gyri-sulci', 474 / 409, 'Lateral view of the brain with the precentral gyrus, central sulcus, postcentral gyrus, lateral fissure and superior temporal gyrus marked.', GYRI_REGIONS, { gutter: 'all' }),
          'The two landmarks and the three gyri around them. Precentral is purple, postcentral yellow, superior temporal red on the slide figure.',
          'Lateral view with the central sulcus running from the top down toward the lateral fissure, the precentral gyrus in front of it, the postcentral gyrus behind it, and the superior temporal gyrus under the lateral fissure.'
        ),
        {
          type: 'steps',
          title: 'From landmark to lobe',
          steps: [
            { title: 'Central sulcus:', body: 'frontal lobe in front, parietal lobe behind.' },
            { title: 'Lateral (Sylvian) fissure:', body: 'temporal lobe below it, frontal and parietal lobes above it.' },
            { title: 'The back:', body: 'the occipital lobe, with no sharp sulcus on the lateral surface.' },
            { title: 'Inside the lateral fissure:', body: 'the insula, seen only when the edges of the fissure are pulled apart.' },
          ],
        },
        figureBlock(
          hotspots('lobes', 936 / 454, 'Lateral view of the brain with the four lobes coloured, and a small brain with the lateral fissure opened to show the insula.', LOBE_REGIONS, { gutter: 'all', labelPool: ['Cerebellum', 'Brain stem'] }),
          'The four lobes, named after the skull bones over them, plus the two landmarks and the insula.',
          'Lateral view with the frontal lobe blue, parietal green, occipital red and temporal beige, and an inset showing the insula inside the opened lateral fissure.'
        ),
        { type: 'whyItMatters', body: 'Landmarks locate function: primary motor cortex in the precentral gyrus, primary somatosensory cortex in the postcentral gyrus, primary auditory cortex on the superior temporal gyrus.' },
        { type: 'detail', title: 'Folds vary between people', body: 'The main sulci are constant, but smaller folds differ between individuals. Exact localization needs an atlas or measurements from that brain.' },
      ],
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
      keyTerms: ['visual cortex', 'auditory cortex', 'somatosensory cortex', 'gustatory cortex', 'primary motor cortex', 'premotor area', 'supplementary motor area', 'association areas', 'prefrontal cortex', 'posterior parietal cortex', 'inferotemporal cortex'],
      blocks: [
        { type: 'text', body: 'The cortex is a patchwork. Areas differ in their inputs, outputs and responses, so they can be named as primary sensory, motor, or association.' },
        {
          type: 'compare',
          title: 'Sensory and motor areas',
          columns: ['Where', 'Brodmann areas'],
          rows: [
            { label: 'Visual cortex', cells: ['Occipital lobe', '17, 18, 19'] },
            { label: 'Auditory cortex', cells: ['Superior temporal gyrus', '41, 42'] },
            { label: 'Somatosensory cortex', cells: ['Postcentral gyrus', '3, 1, 2'] },
            { label: 'Gustatory cortex', cells: ['Insula and parietal operculum', '43'] },
            { label: 'Primary motor cortex', cells: ['Precentral gyrus', '4'] },
            { label: 'Premotor and supplementary motor areas', cells: ['In front of area 4', '6'] },
          ],
        },
        figureBlock(
          hotspots('functional-areas', 886 / 641, 'Lateral view of the brain with motor areas red, sensory areas green and association areas purple.', SENSORY_MOTOR_REGIONS, { gutter: 'all' }),
          'Sensory (green) and motor (red) areas on the slide figure. The gustatory cortex is on the small brain with the fissure opened.',
          'Lateral view: motor areas in front of the central sulcus, somatosensory behind it, visual at the back, auditory on the superior temporal gyrus, gustatory in the insula.'
        ),
        { type: 'definition', term: 'Association areas', body: 'The large parts of the human cortex that are neither sensory nor motor. They combine sensory evidence with memory, goals, attention, language and plans for action.' },
        figureBlock(
          hotspots('functional-areas', 886 / 641, 'Lateral view of the brain with the three association areas marked.', ASSOCIATION_REGIONS),
          'The three association areas named on the slide (purple).',
          'Lateral view with the prefrontal cortex at the front, the posterior parietal cortex behind the somatosensory area, and the inferotemporal cortex on the lower temporal lobe.'
        ),
        { type: 'detail', title: 'Localizing a function needs evidence', body: 'A label on a map is not enough. Evidence comes from what is lost when an area is damaged and what happens when it is stimulated. The first motor maps came from stimulating animal cortex; Broca\'s patient, who lost speech after left frontal damage, is the classic lesion case.' },
      ],
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
      keyTerms: ['cytoarchitecture', 'Nissl stain', 'Nissl bodies', 'cortical layers', 'line of Gennari', 'Brodmann area', 'cortical map'],
      blocks: [
        { type: 'definition', term: 'Cytoarchitecture', body: 'The arrangement of cells in a tissue: their types, density, size, shape and layering. Repeated differences in these features divide the cortex into areas.' },
        { type: 'definition', term: 'Nissl stain', body: 'Basic dyes such as cresyl violet colour the nuclei of all cells and clumps around neuronal nuclei. The clumps, Nissl bodies, are rough endoplasmic reticulum rich in RNA. In short, the Nissl stain makes cell bodies visible.' },
        { type: 'example', title: 'Two classes of cell in a Nissl section', body: 'Neurons and glia. Large and small neurons, astrocytes, oligodendrocytes, microglia and the endothelial cells of vessels are told apart by the shape of the cell body, the nucleus and the surrounding tissue.' },
        { type: 'definition', term: 'Cortical layers', body: 'Six layers, I at the surface to VI next to the white matter. Their thickness and cell types differ between areas.' },
        figureBlock(
          hotspots('cortical-layers', 660 / 392, 'Nissl-stained section across the border between primary and secondary visual cortex.', LAYER_REGIONS, { quiz: false, intro: 'The slide photo, with its own labels. Hover a marker for what each feature means.' }),
          'Laminar structure at the V1 to V2 border on the slide. V1 has a thick, subdivided layer 4 and the line of Gennari; in V2 layer 4 is thin.',
          'Photomicrograph of Nissl-stained cortex. On the left, layer 4 is split into 4A, 4B and 4C with the pale line of Gennari; on the right, past the transition, layer 4 is thin.'
        ),
        { type: 'definition', term: 'Brodmann area', body: 'One of 52 numbered areas that Korbinian Brodmann defined from laminar differences. A cytoarchitectonic label, an anatomical statement.' },
        figureBlock(
          hotspots('brodmann-map', 733 / 594, 'Brodmann\'s map on the lateral surface with the areas numbered and coloured.', BRODMANN_REGIONS, { gutter: 'ends', quiz: false, intro: 'The map keeps its own printed area numbers, so there is no quiz mode here. Hover a marker for what each numbered area does.' }),
          'Brodmann\'s map from the slide. The seven groups that match the functional areas named in this lecture.',
          'Lateral view with numbered areas. Area 4 and areas 3, 1, 2 flank the central sulcus; 6 is in front of 4; 5 and 7 behind 3, 1, 2; 17, 18, 19 at the back; 41, 42 on the superior temporal gyrus; 20, 21, 37 on the lower temporal lobe.'
        ),
        { type: 'misconception', wrong: 'A Brodmann number tells you what that patch of cortex does.', right: 'It tells you how the cells are arranged. Many areas do match functional areas, such as 4 (motor) and 17 (V1), but function needs separate evidence.' },
        { type: 'detail', title: 'Cortical maps and atlases', body: 'A map can be based on folding, cytoarchitecture, myelin, connectivity, activity or behaviour, and maps based on different properties put their boundaries in different places. Boundaries also run into sulci and vary between individuals, so fitting an atlas to one brain adds uncertainty.' },
      ],
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
      keyTerms: ['histology', 'Golgi stain', 'neurites', 'reticular theory', 'neuron doctrine', 'electron microscope', 'law of dynamic polarization', 'Dale\'s law'],
      blocks: [
        {
          type: 'steps',
          title: 'Making brain tissue visible (histology)',
          steps: [
            { title: 'Fix:', body: 'harden the soft tissue in formaldehyde.' },
            { title: 'Slice:', body: 'cut thin sections with a microtome.' },
            { title: 'Stain:', body: 'otherwise the tissue looks uniform under the microscope.' },
          ],
        },
        figureBlock(
          hotspots('stains', 2096 / 520, 'Three panels: Nissl-stained cortex, Golgi-stained neurons, and an electron micrograph of a synapse.', STAIN_REGIONS, { layout: 'stack' }),
          'The three methods from the slides, left to right: Nissl (Figure 2.1), Golgi (Figure 2.3), electron microscope (Figure 2.25).',
          'Left: many purple cell bodies, no processes. Middle: a few black neurons with dendrites and axon on a yellow ground. Right: an electron micrograph with a green presynaptic terminal, a yellow postsynaptic spine and a blue astrocyte process.'
        ),
        {
          type: 'compare',
          title: 'What each method shows',
          columns: ['Shows', 'Does not show'],
          rows: [
            { label: 'Nissl stain', cells: ['All cell bodies, layers, neurons versus glia', 'Dendritic trees, axons, spines, synapses'] },
            { label: 'Golgi stain', cells: ['A few neurons stained completely: soma, dendrites, axon', 'Most cells; whether two neurons touch or fuse'] },
            { label: 'Electron microscope', cells: ['Membranes, vesicles, the synaptic cleft itself', 'Large-scale organization; only a tiny volume at a time'] },
          ],
        },
        { type: 'example', title: 'Golgi 1873, Cajal from 1888', body: 'Golgi found that silver chromate stains a small percentage of neurons completely. It showed that the soma is a small part of the neuron and that the neurites are of two kinds: many tapering dendrites and one axon of uniform diameter. Cajal used the stain to work out circuits.' },
        {
          type: 'compare',
          title: 'Same stain, opposite conclusions',
          columns: ['Golgi: reticular theory', 'Cajal: neuron doctrine'],
          rows: [
            { label: 'Claim', cells: ['Neurites of different cells fuse into one continuous network', 'Neurons are separate cells that communicate by contact, not continuity'] },
            { label: 'Fate', cells: ['Rejected in the 1950s', 'Confirmed by the electron microscope'] },
          ],
        },
        { type: 'keyNumber', title: 'Why the light microscope could not decide', items: [
          { value: '0.1 micrometre', label: 'resolution limit of the light microscope' },
          { value: '20 nanometres', label: 'the gap between neurons at a synapse' },
          { value: '0.1 nanometre', label: 'resolution of the electron microscope, which showed the cleft in the 1950s' },
        ] },
        { type: 'whyItMatters', body: 'Both men looked at the same tissue. The stains were observations; the theories were interpretations. A better instrument, repeated observation and testable predictions settled it.' },
        { type: 'detail', title: 'The neuron doctrine in twelve points (slides)', blocks: [
          { type: 'steps', steps: [
            'Neural units: the brain is made of individual units with dendrites, a cell body and an axon.',
            'Neurons are cells, like the cells of other tissues.',
            'Specialization: units differ in size, shape and structure by location and function.',
            'The nucleus is the trophic centre: only the part containing the nucleus survives division of the cell.',
            'Nerve fibres are outgrowths of nerve cells.',
            'Nerve cells arise by cell division.',
            'Contact, not cytoplasmic continuity, joins nerve cells.',
            'Law of dynamic polarization: a preferred direction of transmission from cell to cell, although an axon can conduct both ways.',
            'The synapse is a barrier at the contact that may permit transmission.',
            'Unity of transmission: a contact is always excitatory or always inhibitory.',
            'Dale\'s law: each nerve terminal releases a single type of transmitter.',
            'Modern additions: electrical transmission and cotransmission.',
          ] },
        ] },
      ],
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
            { text: 'The Golgi stain never filled two neighbouring neurons at once, so a contact was never in one picture', feedback: 'Cajal did see stained neurons meeting. The problem was that a 20 nm gap and a fusion look identical at that resolution.' },
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
      keyTerms: ['neuronal membrane', 'cytosol', 'organelles', 'cytoplasm', 'nucleus', 'gene expression', 'mRNA', 'ribosomes', 'rough endoplasmic reticulum', 'polyribosomes', 'smooth ER', 'Golgi apparatus', 'mitochondria', 'ATP', 'dendritic tree', 'dendritic spines', 'axon hillock', 'axon collaterals', 'innervate'],
      blocks: [
        figureBlock(
          hotspots('neuron', 1168 / 695, 'A neuron with dendrites on the left, a cell body with a nucleus, and a myelinated axon ending in terminals on the right.', NEURON_REGIONS, { gutter: 'all' }),
          'The parts of a neuron and the direction of information flow: dendrites to soma to axon to terminals.',
          'Drawing of a neuron. Branching dendrites at the left, a round soma with a dark nucleus, an axon leaving from the hillock, blue myelin segments along the axon, and branched terminals at the right.'
        ),
        { type: 'definition', term: 'Neuronal membrane, cytosol, cytoplasm', body: 'The membrane is about 5 nm thick and studded with proteins. Inside is the cytosol, a salty potassium-rich fluid, and membrane-enclosed organelles. Everything inside the membrane except the nucleus is the cytoplasm.' },
        {
          type: 'steps',
          title: 'Gene expression: from DNA to protein',
          steps: [
            { title: 'Genes:', body: 'the segments of DNA in the chromosomes that the cell uses.' },
            { title: 'Transcription:', body: 'a gene is copied into mRNA in the nucleus.' },
            { title: 'Export:', body: 'the mRNA leaves through nuclear pores.' },
            { title: 'Translation:', body: 'ribosomes read the mRNA and assemble the protein.' },
          ],
        },
        { type: 'whyItMatters', body: 'A neuron differs from a liver cell because it expresses different genes.' },
        figureBlock(
          hotspots('neuron-internal', 680 / 847, 'Cutaway drawing of a neuron cell body showing its organelles.', INTERNAL_REGIONS, { quiz: false, intro: 'The slide figure (Figure 2.8), with its own labels. Hover a marker for what each organelle does.' }),
          'The internal structure of a typical neuron, from the slide. Seven organelles marked.',
          'Cutaway soma with the nucleus in the middle, rough ER around it, mitochondria, the Golgi apparatus, smooth ER, and the axon hillock leading down into the axon with microtubules.'
        ),
        {
          type: 'compare',
          title: 'Where proteins are made and sorted',
          columns: ['Structure', 'Job'],
          rows: [
            { label: 'Rough ER', cells: ['Membrane stacks with ribosomes. Neurons have far more than other cells. This is the Nissl substance.', 'Makes proteins destined for a membrane'] },
            { label: 'Free ribosomes, polyribosomes', cells: ['Ribosomes in the cytosol, often several along one mRNA', 'Make proteins for the cytosol'] },
            { label: 'Smooth ER', cells: ['Membrane without ribosomes', 'Folds proteins, regulates calcium'] },
            { label: 'Golgi apparatus', cells: ['Membrane stacks near the nucleus', 'Sorts proteins for delivery to the axon or the dendrites'] },
            { label: 'Mitochondria', cells: ['Throughout the cell', 'Cellular respiration, ATP for the membrane pumps'] },
          ],
        },
        { type: 'definition', term: 'Dendrites', body: 'Branch like a tree (the dendritic tree) and are covered with synapses. The membrane holds receptors for neurotransmitter. On many neurons input arrives on dendritic spines, small bags on the dendrite, with polyribosomes underneath for local protein synthesis.' },
        { type: 'definition', term: 'Axon', body: 'Begins at the axon hillock, keeps a uniform diameter, can be a metre long. No rough ER and almost no ribosomes, so all its proteins come from the soma. It may branch into axon collaterals and ends in the axon terminal, or terminal bouton. A neuron that contacts a cell innervates it.' },
      ],
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
      keyTerms: ['presynaptic', 'postsynaptic', 'synaptic cleft', 'synaptic transmission', 'synaptic vesicles', 'neurotransmitter', 'active zone', 'voltage-gated calcium channels', 'receptors', 'electrical synapse', 'gap junction', 'synaptic plasticity'],
      blocks: [
        { type: 'definition', term: 'Synapse', body: 'The point of contact where an axon terminal passes information to another cell. Presynaptic side: usually the axon terminal. Postsynaptic side: usually a dendrite or soma. Between them the synaptic cleft. Transfer across it is synaptic transmission.' },
        figureBlock(
          hotspots('synapse', 702 / 1204, 'A presynaptic terminal with vesicles above a postsynaptic dendrite, with transmitter crossing the cleft.', SYNAPSE_REGIONS),
          'A chemical synapse. Vesicles on one side, receptors on the other, so transmission runs one way.',
          'Drawing of a synapse: an orange axon terminal containing vesicles, small transmitter molecules in the cleft, and a teal postsynaptic dendrite below.'
        ),
        { type: 'example', title: 'What makes the terminal different from the axon', body: 'Microtubules stop before it. It holds many synaptic vesicles about 50 nm across, filled with transmitter, and many mitochondria. The membrane facing the cleft carries the active zone, a dense coat of proteins where release happens. No ribosomes.' },
        {
          type: 'steps',
          title: 'Chemical synaptic transmission',
          steps: [
            'An action potential arrives at the terminal.',
            'The depolarization opens voltage-gated calcium channels and calcium enters.',
            'Calcium triggers vesicles to fuse with the membrane at the active zone and release transmitter.',
            'The transmitter diffuses across the cleft.',
            'It binds receptors in the postsynaptic membrane (the postsynaptic density), producing an electrical or biochemical response.',
          ],
        },
        { type: 'whyItMatters', body: 'An electrical signal becomes chemical and then electrical again. This conversion makes many computations possible, changes in it underlie learning and memory, and the synapse is where most psychoactive drugs and many toxins act.' },
        {
          type: 'compare',
          title: 'Chemical versus electrical synapse',
          columns: ['Chemical', 'Electrical'],
          rows: [
            { label: 'Link', cells: ['Transmitter across a 20 to 50 nm cleft', 'Gap junction: connexin channels join the two cytoplasms'] },
            { label: 'Direction', cells: ['One way, pre to post, because the two sides are built differently', 'Both directions'] },
            { label: 'Speed', cells: ['Slower', 'Very fast'] },
            { label: 'How common', cells: ['Most synapses in the mature human brain', 'A minority'] },
          ],
        },
        { type: 'detail', title: 'Directionality and plasticity', body: ['One-way transmission is the structural basis of the law of dynamic polarization. Two neurons can still talk both ways through separate reciprocal synapses.', 'Synaptic strength can change: activity alters release probability, the number of receptors and the structure of the synapse. This synaptic plasticity contributes to adaptation and learning and is a target for drugs and disease.'] },
      ],
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
      keyTerms: ['cytoskeleton', 'microtubules', 'neurofilaments', 'microfilaments', 'axoplasmic transport', 'Wallerian degeneration', 'anterograde transport', 'kinesin', 'retrograde transport', 'dynein'],
      blocks: [
        {
          type: 'compare',
          title: 'The cytoskeleton: three kinds of fibre',
          columns: ['Diameter', 'Made of', 'Where'],
          rows: [
            { label: 'Microtubules', cells: ['20 nm', 'Tubulin', 'Run down the neurites; the tracks for transport'] },
            { label: 'Neurofilaments', cells: ['10 nm', 'Intermediate filament proteins', 'Mechanically strong, throughout'] },
            { label: 'Microfilaments', cells: ['5 nm', 'Actin', 'Under the membrane and in the neurites'] },
          ],
        },
        { type: 'whyItMatters', body: 'The axon has no ribosomes, so everything it and its terminal need is made in the soma and shipped down. This is axoplasmic transport.' },
        { type: 'example', title: 'Wallerian degeneration', body: 'Augustus Waller showed in the nineteenth century that an axon cut off from its soma degenerates. This is doctrine point 4: the nucleus is the trophic centre.' },
        figureBlock(
          transportFigure(),
          'Kinesin walks vesicles along microtubules from the soma to the terminal (anterograde); dynein carries material back (retrograde).',
          'A soma on the left, an axon running right to a terminal, and a microtubule inside the axon. A vesicle above the microtubule moves right; a vesicle below it moves left.'
        ),
        {
          type: 'compare',
          title: 'Two directions of transport',
          columns: ['Anterograde', 'Retrograde'],
          rows: [
            { label: 'Direction', cells: ['Soma to terminal', 'Terminal to soma'] },
            { label: 'Motor protein', cells: ['Kinesin, using ATP', 'Dynein'] },
            { label: 'Speed', cells: ['Fast transport up to 1000 mm per day; a slow component (Weiss) takes months', 'Fast'] },
            { label: 'Carries', cells: ['Vesicles, membrane and proteins for the terminal', 'Used material and signals about the state of the terminal'] },
          ],
        },
        { type: 'detail', title: 'When transport fails', body: ['Distant terminals suffer first: the supply of vesicle proteins and membrane stops and the synapse weakens. Continued failure can impair a whole circuit.', 'In Alzheimer\'s disease the microtubule-associated protein tau detaches from the microtubules and forms tangles. Both directions are also used by neuroscientists to trace connections with injected tracers.'] },
      ],
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
            { text: 'It survives but can no longer conduct action potentials', feedback: 'The opposite: a cut axon conducts for a while and then breaks down, because the soma is the only source of new protein.' },
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
      keyTerms: ['glia', 'astrocytes', 'myelin', 'nodes of Ranvier', 'oligodendroglia', 'Schwann cells', 'microglia', 'ependymal cells'],
      blocks: [
        { type: 'definition', term: 'Glia', body: 'The other class of cell in the brain, roughly as numerous as neurons. They do not carry the main signals, but neurons cannot work without them.' },
        figureBlock(
          hotspots('glia-types', 2289 / 520, 'Three glial cells: an astrocyte, an oligodendroglial cell wrapping three axons, and a microglial cell.', GLIA_REGIONS, { layout: 'stack' }),
          'Left: astrocyte (slide, Figure 2.24). Middle: oligodendroglial cell with myelin segments and nodes of Ranvier. Right: microglial cell.',
          'Three drawings side by side: a star-shaped orange astrocyte; a pink oligodendroglial cell whose processes wrap segments of three axons, with gaps between the segments; a blue microglial cell with fine branches.'
        ),
        {
          type: 'compare',
          title: 'Four glial cell types',
          columns: ['Where', 'Main job'],
          rows: [
            { label: 'Astrocyte', cells: ['CNS, the most numerous; around synapses and vessels', 'Chemical environment: removes transmitter, regulates potassium, metabolic support'] },
            { label: 'Oligodendroglia', cells: ['CNS: brain and spinal cord', 'Myelin, several axons per cell'] },
            { label: 'Schwann cell', cells: ['PNS: nerves outside skull and vertebral column', 'Myelin, one segment of one axon per cell'] },
            { label: 'Microglia', cells: ['CNS; can enter from the blood', 'Phagocyte: debris, damage, infection, synapse remodelling'] },
          ],
        },
        { type: 'example', title: 'Astrocytes at a synapse', body: 'Their processes envelop synapses, leaving gaps of only about 20 nm. They restrict the spread of released transmitter and actively remove it, keep extracellular potassium at working levels, help match blood supply to activity, and carry transmitter receptors of their own.' },
        { type: 'definition', term: 'Myelin', body: 'Many layers of glial membrane wrapped round an axon, interrupted at the nodes of Ranvier where the axon membrane is exposed. Myelin speeds conduction of the action potential.' },
        { type: 'misconception', wrong: 'Glia are just glue that fills the space between neurons.', right: 'They keep the chemical environment stable, supply energy, insulate axons, monitor the tissue and repair it.' },
        { type: 'detail', title: 'Other non-neuronal cells', body: 'Ependymal cells line the fluid-filled ventricles. Blood vessels deliver oxygen and nutrients.' },
      ],
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
      { term: 'Spatial scale', definition: 'Proteins (nm), synapses and cells (um), microcircuits, regions, whole brain, body (m).' },
      { term: 'Time scale', definition: 'Molecular dynamics (ps), the spike (ms), plasticity, learning, development (years). A result applies only to the scale measured.' },
      { term: 'Node, edge', definition: 'Network elements. Cellular scale: neuron, synapse. Regional scale: brain area, pathway or signal relationship.' },
      { term: 'Structural connectivity', definition: 'Anatomical connections (axons, tracts).' },
      { term: 'Functional connectivity', definition: 'Statistical dependence between measured signals. Does not prove an anatomical pathway.' },
      { term: 'Brain disorders (Europe 2010)', definition: 'About 800 billion EUR per year, 179 million people, 30 countries.' },
      { term: 'Mechanistic explanation', definition: 'Links molecules and cells to circuit function and to the symptoms a patient has.' },
      { term: 'Cost and burden', definition: 'Cost = health care + non-medical support + lost productivity. Burden also needs prevalence, disability, wider economics.' },
      { term: 'Neuron numbers, human', definition: '86 billion neurons, 100 trillion connections, 16.3 billion of them in the cortex.' },
      { term: 'Neuron numbers, elephant', definition: '251 billion in total, nearly all cerebellum, only 5.6 billion cortical. Count alone does not rank cognition.' },
      { term: 'Anterior / posterior', definition: 'Front / back.' },
      { term: 'Medial / lateral', definition: 'Toward / away from the midline.' },
      { term: 'Superior / inferior', definition: 'Top of head / feet.' },
      { term: 'Dorsal / ventral', definition: 'Back / belly. Forebrain: superior / inferior. Brainstem and cord: posterior / anterior.' },
      { term: 'Rostral / caudal', definition: 'Nose / tail. Forebrain: anterior / posterior. Brainstem and cord: superior / inferior.' },
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
      { term: 'Histology', definition: 'Staining thin slices of tissue so the cells can be seen under a microscope.' },
      { term: 'Nissl stain', definition: 'Basic dye binds rough ER RNA (Nissl bodies) and nuclei: all cell bodies, layers, glia versus neurons. Not processes.' },
      { term: 'Cortical layers', definition: 'I to VI. V1 has thick layer 4 (4A, 4B, 4C, line of Gennari); V2 does not.' },
      { term: 'Brodmann area', definition: 'Numbered cytoarchitectonic label. Anatomical, not a function statement by itself.' },
      { term: 'Golgi stain', definition: 'Silver chromate. Few neurons, stained completely: soma, dendrites, axon.' },
      { term: 'Reticular theory vs neuron doctrine', definition: 'Golgi: neurites fuse into a continuous network. Cajal: separate cells, contact not continuity.' },
      { term: 'What settled it', definition: 'EM (1950s) resolved the cleft. Gap between neurons 20 nm, light microscope limit 0.1 um.' },
      { term: 'Neuron doctrine, points 1 to 6', definition: 'Neural units; neurons are cells; specialization; nucleus is the trophic centre; fibres are processes; cell division.' },
      { term: 'Neuron doctrine, points 7 to 12', definition: 'Contact not continuity; dynamic polarization; synapse as barrier; unity of transmission; Dale\'s law; electrical transmission and cotransmission.' },
      { term: 'Law of dynamic polarization', definition: 'Transmission runs dendrite and soma to axon to terminal, although an axon itself can conduct both ways.' },
      { term: 'Dale\'s law', definition: 'Each nerve terminal releases a single type of transmitter.' },
      { term: 'Soma', definition: 'Cell body, about 20 um. Nucleus, rough and smooth ER, Golgi apparatus, mitochondria.' },
      { term: 'Membrane, cytosol, cytoplasm', definition: 'Neuronal membrane about 5 nm, studded with proteins. Cytoplasm is the cytosol plus the organelles in it.' },
      { term: 'Gene expression', definition: 'DNA transcribed to mRNA, translated to protein on ribosomes.' },
      { term: 'Rough ER', definition: 'Ribosomes on membrane. Makes membrane proteins. Equals Nissl substance. Free ribosomes and polyribosomes make cytosolic proteins.' },
      { term: 'Golgi apparatus', definition: 'Sorts proteins for delivery to axon or dendrites.' },
      { term: 'Mitochondria', definition: 'Cellular respiration, ATP.' },
      { term: 'Dendrites', definition: 'Input. Dendritic tree, spines, receptors. Polyribosomes under spines.' },
      { term: 'Axon', definition: 'Output. Starts at axon hillock, uniform diameter, no ribosomes, collaterals, ends in axon terminal (terminal bouton).' },
      { term: 'Synapse', definition: 'Presynaptic terminal, synaptic cleft, postsynaptic membrane with receptors. Terminal: vesicles (50 nm), mitochondria, active zone, no ribosomes or microtubules.' },
      { term: 'Chemical transmission', definition: 'AP arrives, voltage-gated Ca2+ channels open, Ca2+ triggers vesicle fusion, transmitter crosses the cleft and binds receptors.' },
      { term: 'Signal conversion', definition: 'Electrical to chemical to electrical, and one-way: vesicles on one side, receptors on the other.' },
      { term: 'Electrical synapse', definition: 'Gap junction (connexins). Direct ionic current, fast, both directions.' },
      { term: 'Synaptic plasticity', definition: 'Activity changes release probability, receptor number, structure. Basis of learning; drug and disease target.' },
      { term: 'Cytoskeleton', definition: 'Microtubules 20 nm (tubulin), neurofilaments 10 nm, microfilaments 5 nm (actin).' },
      { term: 'Axoplasmic transport', definition: 'Anterograde: soma to terminal, kinesin on microtubules, ATP, up to 1000 mm/day. Retrograde: terminal to soma, dynein.' },
      { term: 'Wallerian degeneration', definition: 'Axon cut from soma dies. Nucleus is the trophic centre.' },
      { term: 'Astrocyte', definition: 'Most numerous glia. Envelops synapses, removes transmitter, regulates K+, metabolic support.' },
      { term: 'Oligodendroglia / Schwann cell', definition: 'Myelin in CNS, several axons each / PNS, one axon each. Nodes of Ranvier between segments; myelin speeds conduction.' },
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
        { text: 'Electron microscopy', feedback: 'Not a stain, and it shows a tiny field: membranes, vesicles and the cleft.' },
        { text: 'Silver chromate applied to a thick block of cortex', feedback: 'That is the Golgi method by another name; it still fills only a small percentage of the neurons.' },
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
        { text: 'The axon terminal', feedback: 'The terminal is the far end of the axon, where it contacts the next cell. The axon is what carries the output there.' },
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
        { text: 'The superior temporal gyrus', feedback: 'That is the gyrus just below the fissure, one gyrus of the temporal lobe, not the lobe itself.' },
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
      prompt: 'Label the numbered markers on the lateral view of the brain (anterior is to the left), then read the explanation for each.',
      hotspots: hotspots('lobes', 936 / 454, 'Lateral view of the brain with the lobes coloured and an inset showing the insula.', LOBE_REGIONS, { gutter: 'all', labelPool: ['Cerebellum', 'Brain stem', 'Olfactory bulb'] }),
      modelAnswer: [
        '1 is the frontal lobe, anterior to the central sulcus.',
        '2 is the parietal lobe, behind the central sulcus.',
        '3 is the temporal lobe, below the lateral fissure.',
        '4 is the occipital lobe at the back.',
        '5 is the central sulcus, between the precentral and postcentral gyri.',
        '6 is the lateral fissure, with the temporal lobe below it.',
        '7 is the insula, buried inside the lateral fissure and seen only when it is opened.',
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
        'Electron microscopy resolves membranes and organelles at about 0.1 nm, showing synaptic vesicles and the synaptic cleft, which proved that neurons are separate cells.',
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
        { points: 1, text: 'States the modern doctrine: neurons communicate at specialized contacts, chemical synapses with a preferred direction (the law of dynamic polarization) or electrical synapses.' },
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
      prompt: 'Using the slide numbers, calculate the percentage of neurons that lie in the cerebral cortex for the human (86 billion total, 16.3 billion cortical) and for the elephant (251 billion total, 5.6 billion cortical). Enter the human percentage. Then compare the two.',
      given: [
        { symbol: 'N_human', value: 86, unit: 'billion neurons' },
        { symbol: 'N_human,cortex', value: 16.3, unit: 'billion neurons' },
        { symbol: 'N_elephant', value: 251, unit: 'billion neurons' },
        { symbol: 'N_elephant,cortex', value: 5.6, unit: 'billion neurons' },
      ],
      answer: { value: 19.0, tolerance: 0.5, unit: '%' },
      steps: [
        { text: 'Write the fraction of neurons in the cortex as a percentage.', math: 'fraction = N_cortex / N_total * 100 %' },
        { text: 'Substitute the human values.', math: 'human = 16.3 / 86 * 100 % = 0.1895 * 100 % = 19.0 %' },
        { text: 'Substitute the elephant values.', math: 'elephant = 5.6 / 251 * 100 % = 0.0223 * 100 % = 2.2 %' },
        { text: 'Compare the two fractions.', math: '19.0 % / 2.2 % = 8.5' },
      ],
      modelAnswer: [
        'About 19 % of human neurons are in the cerebral cortex, against about 2 % of elephant neurons, a difference of about eight and a half times.',
        'The elephant has about three times more neurons overall, but nearly all of them are in the cerebellum, so the two species look very different depending on which anatomical level is compared.',
        'This is why a whole-brain count and a cortical count answer different questions, and why neuron number alone does not rank cognitive ability.',
      ],
    },
  ],
};
