// Lecture 6: the somatic sensory system, spinal and brain control of
// movement (chapters 12, 13 and 14).
// Scope: docs/scope/nbe-e4210/L06.md. TA notes exist (written against a
// deck one slide longer from the motor section on; the mapping is in
// the scope file, and every slide number here is ours). The page filter
// is HW3's reading guide (ch 12 pp. 417-436; ch 13 pp. 457-460 and
// 469-476; ch 14 pp. 484-485) plus the pages the notes cite for each
// slide, and the homework reading of slide 47 (pp. 491-517) for depth on
// what slides 46 to 49 show. The page has three parts, as the deck does:
// somatic sensation, spinal control, brain control.
// Figures are slide crops in src/assets/figures/nbe-e4210/L06 (sources
// in CREDITS.md) through the image-hotspots widget, and five d3 demos:
// adaptation, dermatome map, two-pathway tracer, recruitment, and the
// control loop on the HW3 tray scenario.

import { DERMATOME_PATHS, DERMATOME_POINTS, DERMATOME_SIZE } from './figures/dermatome-regions.js';

const fig = (name) => new URL(`../../assets/figures/nbe-e4210/L06/${name}.webp`, import.meta.url).href;

function hotspots(name, aspect, alt, regions, extra = {}) {
  return { src: fig(name), alt, aspect, regions, ...extra };
}

function figureBlock(props, caption, fallbackAlt) {
  return { type: 'figure', visual: { type: 'widget', name: 'image-hotspots', props, caption, fallbackAlt } };
}

function demoBlock(name, props, caption, fallbackAlt) {
  return { type: 'figure', visual: { type: 'widget', name, props, caption, fallbackAlt } };
}

// ---------------------------------------------------------------------
// Region sets. Coordinates are percentages of each image.

// Figure 12.1, labels painted out, label column cropped off.
const SKIN_REGIONS = [
  { id: 'merkel', label: 'Merkel\'s disk', body: 'In the epidermis: a nerve terminal on a flattened non-neural Merkel cell. Small field, slowly adapting.', x: 59, y: 39, w: 9, h: 5, side: 'right' },
  { id: 'free', label: 'Free nerve ending', body: 'A bare branching ending with no capsule. Nociceptors and thermoreceptors end this way.', x: 9, y: 42, w: 8, h: 6, side: 'left' },
  { id: 'meissner', label: 'Meissner\'s corpuscle', body: 'In the dermal ridges of glabrous skin, a tenth the size of a Pacinian corpuscle. Small field, rapidly adapting.', x: 42.5, y: 45.5, w: 5, h: 8, side: 'right' },
  { id: 'hair', label: 'Hair follicle receptor', body: 'Endings wrapped around the follicle. Bending the hair deforms them.', x: 25, y: 53, w: 6, h: 8, side: 'left' },
  { id: 'pacinian', label: 'Pacinian corpuscle', body: 'Deep in the dermis, up to $2\\,\\text{mm}$ long, an onion of $20$ to $70$ layers. Large field, rapidly adapting.', x: 13, y: 74, w: 12, h: 12, side: 'left' },
  { id: 'ruffini', label: 'Ruffini\'s ending', body: 'Deep in the dermis, slightly smaller than a Pacinian corpuscle. Large field, slowly adapting.', x: 40, y: 76, w: 12, h: 9, side: 'right' },
];

// Figure 12.2a, labels printed.
const RF_RECORDING_REGIONS = [
  { id: 'probe', label: 'Stimulus probe', body: 'A fine probe pressed and moved over the skin.', x: 16, y: 51, w: 4, h: 8, side: 'top' },
  { id: 'rf', label: 'Receptive field', body: 'The patch of skin where the probe changes this one afferent\'s firing.', x: 18, y: 59, w: 4, h: 5, side: 'bottom' },
  { id: 'electrode', label: 'Recording electrode', body: 'A microelectrode in the median nerve picks up the spikes of a single sensory axon.', x: 48, y: 42, w: 5, h: 8, side: 'top' },
  { id: 'nerve', label: 'Median nerve', body: 'Carries the afferent from the hand toward the spinal cord.', x: 62, y: 62, w: 10, h: 4, side: 'bottom' },
];

// Figure 12.2b, labels printed.
const RF_HANDS_REGIONS = [
  { id: 'meissner', label: 'Meissner field', body: 'Each blue dot is one afferent\'s field: a few millimetres across.', x: 26, y: 54, w: 5, h: 7, side: 'left' },
  { id: 'pacinian', label: 'Pacinian field', body: 'One afferent covers a whole finger or half the palm.', x: 67, y: 55, w: 14, h: 30, side: 'right' },
];

// Figure 12.3, labels printed.
const MECH_TABLE_REGIONS = [
  { id: 'meissner', label: 'Meissner\'s corpuscle', body: 'Small field, rapid: a burst at the start of the press, then silence.', x: 32, y: 40, w: 22, h: 22, side: 'top' },
  { id: 'pacinian', label: 'Pacinian corpuscle', body: 'Large field, rapid: a spike or two at the onset and again at the offset.', x: 59, y: 40, w: 22, h: 22, side: 'top' },
  { id: 'merkel', label: 'Merkel\'s disk', body: 'Small field, slow: fires throughout the press.', x: 32, y: 73, w: 22, h: 22, side: 'bottom' },
  { id: 'ruffini', label: 'Ruffini\'s ending', body: 'Large field, slow: fires throughout the press.', x: 59, y: 73, w: 22, h: 22, side: 'bottom' },
];

// Figure 12.4, labels printed.
const FREQ_REGIONS = [
  { id: 'meissner', label: 'Meissner minimum', body: 'Lowest threshold around $50\\,\\text{Hz}$: texture and flutter.', x: 40, y: 47, w: 6, h: 6, side: 'top' },
  { id: 'pacinian', label: 'Pacinian minimum', body: 'Lowest threshold, about $1\\,\\mu\\text{m}$, at $200$ to $300\\,\\text{Hz}$: high-frequency vibration.', x: 74.5, y: 83, w: 6, h: 6, side: 'right' },
];

// Figure 12.5, labels printed.
const PACINIAN_REGIONS = [
  { id: 'capsule', label: 'Capsule', body: 'Concentric elastic layers with viscous fluid between them.', x: 18, y: 18, w: 10, h: 6, side: 'left' },
  { id: 'onset', label: 'Onset response', body: 'Pressing compresses the capsule and deforms the terminal: a receptor potential.', x: 38.5, y: 26, w: 6, h: 8, side: 'top' },
  { id: 'hold', label: 'Silent during the hold', body: 'The layers slip, the terminal is no longer deformed, the potential fades.', x: 58, y: 36, w: 8, h: 4, side: 'top' },
  { id: 'offset', label: 'Offset response', body: 'Lifting the probe deforms the terminal again.', x: 76.5, y: 26, w: 6, h: 8, side: 'right' },
  { id: 'stripped', label: 'Stripped response', body: 'Without the capsule the ending still responds, and the response lasts much longer.', x: 45, y: 74, w: 18, h: 8, side: 'right' },
];

// Figure 12.6, labels printed.
const CHANNEL_REGIONS = [
  { id: 'membrane', label: 'Membrane stretch', body: 'Tension in the lipid bilayer itself pulls the channel open.', x: 63, y: 15, w: 14, h: 12, side: 'right' },
  { id: 'extracellular', label: 'Extracellular link', body: 'Force on an extracellular protein tethered to the channel.', x: 27, y: 37, w: 14, h: 6, side: 'left' },
  { id: 'cytoskeleton', label: 'Cytoskeletal link', body: 'Force through the cytoskeleton (actin, microtubules) inside the cell.', x: 27, y: 90, w: 14, h: 6, side: 'left' },
];

// Figure 12.9, labels painted out. Also the lecture quiz label question.
const SPINAL_ROOT_REGIONS = [
  { id: 'grey', label: 'Gray matter', body: 'The butterfly-shaped inner core: cell bodies and local circuits.', x: 28.1, y: 57.3, w: 6.2, h: 13.3, side: 'left' },
  { id: 'white', label: 'White matter', body: 'The thick outer covering of axon tracts (columns).', x: 18.8, y: 48, w: 5.2, h: 13.3, side: 'left' },
  { id: 'droot', label: 'Dorsal root', body: 'Carries sensory axons into the spinal cord.', x: 56.2, y: 28, w: 6.2, h: 8, side: 'top' },
  { id: 'drg', label: 'Dorsal root ganglion', body: 'Holds the cell bodies of the primary afferents.', x: 65.6, y: 46.7, w: 6.2, h: 10.7, side: 'right' },
  { id: 'vroot', label: 'Ventral root', body: 'Carries lower motor neuron axons out to the muscles.', x: 57.3, y: 72, w: 6.2, h: 6.7, side: 'bottom' },
  { id: 'nerve', label: 'Spinal nerve', body: 'Dorsal and ventral roots join: a mixed nerve with sensory and motor axons.', x: 76, y: 76, w: 5.2, h: 8, side: 'right' },
];

// Figure 12.10, labels printed.
const FIBRE_REGIONS = [
  { id: 'aa', label: 'A-alpha, group I', body: '$13$ to $20\\,\\mu\\text{m}$, $80$ to $120\\,\\text{m/s}$: proprioceptors of skeletal muscle.', x: 30, y: 40, w: 16, h: 30, side: 'top' },
  { id: 'ab', label: 'A-beta, group II', body: '$6$ to $12\\,\\mu\\text{m}$, $35$ to $75\\,\\text{m/s}$: mechanoreceptors of skin.', x: 50, y: 40, w: 10, h: 26, side: 'top' },
  { id: 'ad', label: 'A-delta, group III', body: '$1$ to $5\\,\\mu\\text{m}$, $5$ to $30\\,\\text{m/s}$, thinly myelinated: pain, temperature.', x: 70.5, y: 45, w: 4, h: 30, side: 'top' },
  { id: 'c', label: 'C, group IV', body: '$0.2$ to $1.5\\,\\mu\\text{m}$, $0.5$ to $2\\,\\text{m/s}$, unmyelinated: temperature, pain, itch.', x: 87.5, y: 45, w: 3, h: 30, side: 'top' },
];

// Figure 12.11, labels printed.
const SEGMENT_REGIONS = [
  { id: 'cervical', label: 'Cervical, C1 to C8', body: 'Eight segments; the arm segments make the cord swell here.', x: 25, y: 26, w: 6, h: 10, side: 'left' },
  { id: 'thoracic', label: 'Thoracic, T1 to T12', body: 'Twelve segments: trunk.', x: 25, y: 46, w: 6, h: 14, side: 'left' },
  { id: 'lumbar', label: 'Lumbar, L1 to L5', body: 'Five segments; the leg segments.', x: 25, y: 64, w: 6, h: 6, side: 'left' },
  { id: 'sacral', label: 'Sacral, S1 to S5', body: 'Five segments at the tip of the cord.', x: 26, y: 70, w: 5, h: 4, side: 'left' },
  { id: 'nerves', label: 'Spinal nerves', body: 'One pair per segment, each leaving between two vertebrae; named for the vertebra.', x: 50, y: 95, w: 8, h: 6, side: 'bottom' },
];

// Figure 12.14, labels painted out.
const DORSAL_HORN_REGIONS = [
  { id: 'columns', label: 'Dorsal columns', body: 'White matter tracts between the dorsal horns. A-beta branches ascend here to the medulla.', x: 36, y: 30, w: 14, h: 14, side: 'top' },
  { id: 'dhorn', label: 'Dorsal horn', body: 'Grey matter receiving sensory input; one A-beta branch synapses deep in it (reflexes).', x: 21, y: 46, w: 5, h: 8, side: 'left' },
  { id: 'izone', label: 'Intermediate zone', body: 'Grey matter between the horns: interneurons that combine input and commands.', x: 29, y: 58, w: 5, h: 5, side: 'left' },
  { id: 'vhorn', label: 'Ventral horn', body: 'Grey matter holding the lower motor neurons.', x: 26, y: 70, w: 6, h: 8, side: 'bottom' },
  { id: 'drg', label: 'Dorsal root ganglion', body: 'Cell body of the A-beta afferent, outside the cord.', x: 75, y: 50, w: 5, h: 6, side: 'right' },
  { id: 'axon', label: 'A-beta axon', body: 'Large myelinated touch afferent from a skin mechanoreceptor.', x: 85, y: 72, w: 5, h: 5, side: 'right' },
];

// Figure 12.15, labels printed.
const DCML_REGIONS = [
  { id: 'axons', label: 'Large dorsal root axons', body: 'First-order neurons: A-beta afferents from skin mechanoreceptors.', x: 9, y: 87, w: 8, h: 5, side: 'left' },
  { id: 'column', label: 'Dorsal column', body: 'The axons ascend on the same side, with no synapse, to the medulla.', x: 29, y: 85, w: 4, h: 5, side: 'bottom' },
  { id: 'nuclei', label: 'Dorsal column nuclei', body: 'First synapse, at the junction of the spinal cord and medulla. Still ipsilateral.', x: 42, y: 62, w: 6, h: 5, side: 'left' },
  { id: 'ml', label: 'Medial lemniscus', body: 'Second-order axons cross the midline in the medulla and ascend here.', x: 46, y: 69, w: 5, h: 5, side: 'right' },
  { id: 'vp', label: 'Thalamus (VP nucleus)', body: 'Second synapse: the ventral posterior nucleus.', x: 74, y: 31, w: 5, h: 5, side: 'right' },
  { id: 's1', label: 'Primary somatosensory cortex', body: 'S1 on the postcentral gyrus, opposite the stimulated side.', x: 83, y: 13, w: 5, h: 5, side: 'right' },
];

// Figure 12.16, labels printed.
const TRIGEMINAL_REGIONS = [
  { id: 'nerve', label: 'Trigeminal nerve', body: 'Cranial nerve V, carrying large mechanoreceptor axons from the face.', x: 28, y: 92, w: 6, h: 4, side: 'left' },
  { id: 'nucleus', label: 'Principal sensory trigeminal nucleus', body: 'First synapse, on the same side, in the pons.', x: 39, y: 81, w: 4, h: 4, side: 'left' },
  { id: 'cross', label: 'Crossing', body: 'The second-order axons cross the midline in the brain stem.', x: 46, y: 82, w: 4, h: 4, side: 'bottom' },
  { id: 'vp', label: 'Thalamus (VP nucleus)', body: 'The medial part of VP receives the face.', x: 69, y: 37, w: 5, h: 5, side: 'right' },
  { id: 's1', label: 'S1, face area', body: 'The face representation, lateral on the postcentral gyrus.', x: 90, y: 29, w: 5, h: 5, side: 'right' },
];

// Figure 12.17, labels printed.
const S1_REGIONS = [
  { id: 'cs', label: 'Central sulcus', body: 'S1 lies just behind it, on the postcentral gyrus.', x: 24, y: 80, w: 4, h: 8, side: 'left' },
  { id: '3b', label: 'Area 3b', body: 'S1 proper: dense VP input, purely somatosensory responses.', x: 25, y: 83, w: 4, h: 5, side: 'left' },
  { id: '3a', label: 'Area 3a', body: 'Dense thalamic input about body position rather than touch.', x: 25, y: 92, w: 4, h: 4, side: 'left' },
  { id: '1', label: 'Area 1', body: 'Gets texture information from 3b.', x: 34, y: 76, w: 5, h: 4, side: 'top' },
  { id: '2', label: 'Area 2', body: 'Gets size and shape information from 3b.', x: 45, y: 84, w: 4, h: 5, side: 'bottom' },
  { id: '5', label: 'Area 5', body: 'Posterior parietal cortex: input from areas 3, 1 and 2.', x: 55, y: 84, w: 4, h: 5, side: 'right' },
  { id: '7', label: 'Area 7', body: 'Posterior parietal cortex: input from higher visual areas.', x: 66, y: 77, w: 4, h: 4, side: 'right' },
];

// Figure 12.18, labels printed.
const COLUMN_REGIONS = [
  { id: 'columns', label: 'Columns in area 3b', body: 'Within each finger\'s strip, columns of rapidly and slowly adapting neurons alternate.', x: 40, y: 45, w: 30, h: 16, side: 'left' },
  { id: 'fingers', label: 'One strip per finger', body: 'D1, D2 and D3 lie next to each other: neighbouring skin, neighbouring cortex.', x: 70, y: 35, w: 8, h: 6, side: 'right' },
  { id: 'thalamus', label: 'Thalamus', body: 'VP relays the dorsal column nucleus output to layer IV.', x: 72, y: 62, w: 10, h: 5, side: 'right' },
  { id: 'dcn', label: 'Dorsal column nucleus', body: 'The first relay of the pathway, in the medulla.', x: 73, y: 69, w: 10, h: 5, side: 'right' },
];

// Figure 12.19 (with the slide's drawing), labels printed.
const HOMUNCULUS_REGIONS = [
  { id: 'leg', label: 'Leg and foot', body: 'Medial, near the top of the postcentral gyrus.', x: 80, y: 19, w: 6, h: 6, side: 'right' },
  { id: 'trunk', label: 'Trunk', body: 'A small strip for a large body part.', x: 70, y: 25, w: 5, h: 5, side: 'top' },
  { id: 'head', label: 'Head', body: 'Head and neck sit between the trunk and the arm.', x: 59, y: 26, w: 4, h: 4, side: 'top' },
  { id: 'hand', label: 'Hand and fingers', body: 'A huge territory. It separates the head from the face: the map is not continuous.', x: 42, y: 28, w: 8, h: 6, side: 'top' },
  { id: 'face', label: 'Face and lips', body: 'Lateral. Lips and tongue get far more cortex than the trunk.', x: 31, y: 48, w: 6, h: 8, side: 'left' },
  { id: 'tongue', label: 'Tongue and pharynx', body: 'The most lateral part, deep near the lateral sulcus.', x: 24, y: 69, w: 5, h: 5, side: 'left' },
];

// Figure 12.23, labels printed.
const PLASTICITY_REGIONS = [
  { id: 'where', label: 'Hand map in S1', body: 'The left hand map on the right hemisphere of an owl monkey.', x: 56, y: 12, w: 6, h: 5, side: 'right' },
  { id: 'normal', label: 'Normal map', body: 'Digits 1 to 5 in order, each its own strip.', x: 90, y: 37, w: 10, h: 10, side: 'right' },
  { id: 'removed', label: 'After removing D3', body: 'Months later, the D3 strip responds to D2 and D4.', x: 90, y: 60, w: 10, h: 10, side: 'right' },
  { id: 'trained', label: 'After training D2 and D3', body: 'Weeks of use expand the trained fingertips\' strips.', x: 90, y: 83, w: 10, h: 10, side: 'right' },
];

// Figure 12.25, labels printed.
const SOUP_REGIONS = [
  { id: 'ending', label: 'Nociceptor ending', body: 'A free nerve ending. Injury chemicals open its channels or lower its threshold.', x: 45, y: 51, w: 5, h: 5, side: 'top' },
  { id: 'brady', label: 'Bradykinin', body: 'Made from kininogen by proteases; depolarizes nociceptors and sensitizes heat channels.', x: 37, y: 31, w: 8, h: 4, side: 'top' },
  { id: 'prost', label: 'Prostaglandins', body: 'Do not cause pain themselves but make nociceptors far more sensitive.', x: 29, y: 38, w: 10, h: 4, side: 'left' },
  { id: 'mast', label: 'Mast cell and histamine', body: 'Histamine depolarizes nociceptors and makes capillaries leaky.', x: 49, y: 30, w: 6, h: 8, side: 'top' },
  { id: 'subp', label: 'Substance P', body: 'Released by other branches of the same axon: vasodilation, histamine release, secondary hyperalgesia.', x: 38, y: 82, w: 8, h: 4, side: 'bottom' },
  { id: 'drg', label: 'Dorsal root ganglion', body: 'Cell body of the nociceptor; its axon enters the dorsal horn.', x: 72, y: 66, w: 4, h: 4, side: 'right' },
];

// Figure 12.30, labels printed.
const STT_REGIONS = [
  { id: 'axons', label: 'Small dorsal root axons', body: 'A-delta and C afferents, cell bodies in the dorsal root ganglion.', x: 14, y: 82, w: 6, h: 4, side: 'left' },
  { id: 'cross', label: 'Immediate crossing', body: 'After the synapse in the dorsal horn, second-order axons cross at once.', x: 31, y: 91, w: 5, h: 4, side: 'bottom' },
  { id: 'tract', label: 'Spinothalamic tract', body: 'Ascends on the opposite side through cord, medulla, pons and midbrain without a synapse.', x: 45, y: 81, w: 4, h: 4, side: 'right' },
  { id: 'thalamus', label: 'Thalamus', body: 'VP and intralaminar nuclei; the intralaminar relay reaches wide areas of cortex.', x: 71, y: 31, w: 5, h: 5, side: 'right' },
  { id: 's1', label: 'S1', body: 'Plus several other cortical areas for pain.', x: 81, y: 12, w: 5, h: 5, side: 'right' },
];

// Figure 12.31, labels printed.
const TWO_PATH_REGIONS = [
  { id: 'dcml-cross', label: 'DCML crosses in the medulla', body: 'From the dorsal column nuclei into the medial lemniscus.', x: 24.5, y: 40, w: 5, h: 4, side: 'left' },
  { id: 'dcml-up', label: 'Dorsal column, same side', body: 'In the cord, touch ascends ipsilaterally.', x: 22, y: 62, w: 4, h: 10, side: 'left' },
  { id: 'stt-cross', label: 'Spinothalamic crosses at entry', body: 'Second-order axons cross in the spinal cord, near the segment of entry.', x: 77, y: 73, w: 5, h: 4, side: 'right' },
  { id: 'stt-up', label: 'Lateral spinothalamic tract', body: 'In the cord, pain and temperature ascend contralaterally.', x: 77, y: 55, w: 4, h: 12, side: 'right' },
];

// Figure 12.33, labels printed.
const GATE_REGIONS = [
  { id: 'ab', label: 'A-beta axon', body: 'Non-nociceptive mechanoreceptor: excites the projection neuron and the inhibitory interneuron.', x: 68, y: 16, w: 8, h: 5, side: 'right' },
  { id: 'c', label: 'C fibre', body: 'Nociceptive: excites the projection neuron and inhibits the interneuron.', x: 70, y: 24, w: 8, h: 5, side: 'right' },
  { id: 'inter', label: 'Inhibitory interneuron', body: 'The gate. When A-beta drives it, it inhibits the projection neuron.', x: 48, y: 48, w: 5, h: 6, side: 'right' },
  { id: 'proj', label: 'Projection neuron', body: 'Sends nociceptive signals up the spinothalamic tract.', x: 44, y: 61, w: 5, h: 6, side: 'left' },
  { id: 'out', label: 'To spinothalamic tract', body: 'What gets through the gate goes to the brain.', x: 28, y: 86, w: 6, h: 6, side: 'left' },
];

// Figure 12.34, labels printed.
const PAG_REGIONS = [
  { id: 'pag', label: 'Periaqueductal gray', body: 'Midbrain. Receives emotional and behavioural signals; stimulating it gives profound analgesia.', x: 85, y: 19, w: 5, h: 5, side: 'right' },
  { id: 'raphe', label: 'Raphe nuclei', body: 'Medulla, serotonergic. Driven by the PAG.', x: 72, y: 55, w: 5, h: 5, side: 'right' },
  { id: 'dh', label: 'Dorsal horn', body: 'Raphe axons depress nociceptive neurons here.', x: 60, y: 84, w: 5, h: 5, side: 'right' },
];

// Figure 12.35, labels printed.
const TRP_REGIONS = [
  { id: 'trpa1', label: 'TRPA1', body: 'Active at the coldest temperatures on the graph.', x: 15, y: 79, w: 5, h: 8, side: 'left' },
  { id: 'trpm8', label: 'TRPM8', body: 'Cool, below about $25\\,^{\\circ}\\text{C}$; also opened by menthol.', x: 24, y: 47, w: 6, h: 8, side: 'left' },
  { id: 'trpv4', label: 'TRPV4 and TRPV3', body: 'Warm, roughly $30$ to $40\\,^{\\circ}\\text{C}$.', x: 53, y: 52, w: 6, h: 10, side: 'top' },
  { id: 'trpv1', label: 'TRPV1', body: 'Hot, above about $43\\,^{\\circ}\\text{C}$; also opened by capsaicin. Lets in $\\text{Na}^+$ and $\\text{Ca}^{2+}$.', x: 74, y: 62, w: 5, h: 10, side: 'right' },
  { id: 'trpv2', label: 'TRPV2', body: 'Hotter still, at the right edge of the graph.', x: 79, y: 75, w: 4, h: 10, side: 'right' },
];

// Figure 12.36, labels printed.
const THERMO_REGIONS = [
  { id: 'step', label: 'Skin cooled', body: 'From $38$ to $32\\,^{\\circ}\\text{C}$, then back.', x: 30, y: 15, w: 4, h: 14, side: 'top' },
  { id: 'cold-burst', label: 'Cold receptor burst', body: 'Fires fast at the drop, then slows but stays above its $38\\,^{\\circ}\\text{C}$ rate.', x: 34, y: 41, w: 10, h: 10, side: 'top' },
  { id: 'warm-silent', label: 'Warm receptor pause', body: 'Silenced by the drop, then resumes slowly.', x: 37, y: 70, w: 8, h: 8, side: 'bottom' },
  { id: 'warm-burst', label: 'Warm receptor burst', body: 'On rewarming the roles reverse.', x: 69, y: 70, w: 8, h: 10, side: 'bottom' },
];

// Figure 13.1 and the Komi drawing, labels printed.
const MUSCLE_REGIONS = [
  { id: 'biceps', label: 'Muscle (biceps)', body: 'A skeletal muscle; tendons at its ends attach it to bone.', x: 20, y: 55, w: 8, h: 18, side: 'left' },
  { id: 'axons', label: 'Axons from CNS', body: 'Each muscle fibre is innervated by one axon branch.', x: 71, y: 20, w: 4, h: 8, side: 'left' },
  { id: 'fibres', label: 'Muscle fibres', body: 'The cells of skeletal muscle: long, with many nuclei.', x: 86, y: 12, w: 6, h: 6, side: 'right' },
];
const MUSCLE_STRUCTURE_REGIONS = [
  { id: 'muscle', label: 'Muscle', body: 'Bundles of fibres in connective tissue; about a millimetre across per bundle.', x: 20, y: 16, w: 16, h: 12, side: 'left' },
  { id: 'fibres', label: 'Muscle fibres and vessels', body: 'Fibres about $50\\,\\mu\\text{m}$ wide.', x: 70, y: 28, w: 18, h: 10, side: 'right' },
  { id: 'fibre', label: 'Muscle fibre', body: 'Packed with myofibrils that repeat the sarcomere.', x: 70, y: 56, w: 12, h: 10, side: 'right' },
  { id: 'sarcomere', label: 'Sarcomere', body: 'The repeating contractile unit, about $2\\,\\mu\\text{m}$ long.', x: 25, y: 56, w: 14, h: 8, side: 'left' },
  { id: 'myosin', label: 'Myosin', body: 'Thick filament; its heads pull on actin.', x: 42, y: 82, w: 10, h: 5, side: 'right' },
  { id: 'actin', label: 'Actin', body: 'Thin filament.', x: 30, y: 92, w: 10, h: 4, side: 'bottom' },
  { id: 'titin', label: 'Titin', body: 'A giant elastic protein holding myosin in place.', x: 20, y: 86, w: 6, h: 4, side: 'left' },
];

// Figure 13.7, labels printed.
const MOTOR_UNIT_REGIONS = [
  { id: 'alpha', label: 'Alpha motor neuron', body: 'One neuron in the ventral horn.', x: 44, y: 6, w: 6, h: 5, side: 'right' },
  { id: 'fibres', label: 'Muscle fibres', body: 'All the fibres this neuron innervates: together, one motor unit.', x: 30, y: 28, w: 14, h: 10, side: 'left' },
  { id: 'pool', label: 'Motor neuron pool', body: 'All the alpha motor neurons that innervate one muscle.', x: 47, y: 58, w: 18, h: 14, side: 'right' },
  { id: 'muscle', label: 'Muscle', body: 'Controlled by the whole pool.', x: 38, y: 82, w: 10, h: 8, side: 'left' },
];

// Figure 13.8, labels printed.
const TWITCH_REGIONS = [
  { id: 'f5', label: '$5\\,\\text{Hz}$', body: 'Each spike gives a separate twitch.', x: 20, y: 12, w: 8, h: 8, side: 'top' },
  { id: 'f10', label: '$10\\,\\text{Hz}$', body: 'Twitches start to add up.', x: 72, y: 10, w: 8, h: 8, side: 'top' },
  { id: 'f20', label: '$20\\,\\text{Hz}$', body: 'Summation raises the force; ripples remain.', x: 25, y: 58, w: 10, h: 8, side: 'bottom' },
  { id: 'f40', label: '$40\\,\\text{Hz}$', body: 'Fused: a smooth, sustained contraction.', x: 78, y: 58, w: 10, h: 8, side: 'bottom' },
];

// Figure 13.10, labels printed.
const MU_TYPE_REGIONS = [
  { id: 'ff', label: 'Fast fatigable', body: 'Biggest, fastest twitch; force collapses within about a minute of $40\\,\\text{Hz}$ trains.', x: 18, y: 22, w: 6, h: 8, side: 'left' },
  { id: 'fr', label: 'Fast fatigue-resistant', body: 'Moderate, fast twitch; declines slowly over many minutes.', x: 26, y: 70, w: 8, h: 6, side: 'left' },
  { id: 'slow', label: 'Slow', body: 'Small, slow twitch; holds its force for an hour.', x: 22, y: 79, w: 6, h: 4, side: 'bottom' },
  { id: 'ff-b', label: 'Fatigue, fast fatigable', body: 'Repeated stimulation: force drops to almost nothing.', x: 76, y: 12, w: 12, h: 10, side: 'right' },
  { id: 'slow-b', label: 'Fatigue, slow', body: 'Constant force for the whole hour.', x: 76, y: 76, w: 12, h: 10, side: 'right' },
];

// Figure 13.9, labels printed.
const LMN_INPUT_REGIONS = [
  { id: 'alpha', label: 'Alpha motor neuron', body: 'In the ventral horn; the final common pathway to the muscle.', x: 50, y: 61, w: 5, h: 5, side: 'bottom' },
  { id: 'inter', label: 'Spinal interneurons', body: 'The largest input, excitatory or inhibitory: the spinal motor programs.', x: 44, y: 53, w: 4, h: 4, side: 'left' },
  { id: 'spindle', label: 'Muscle spindle input', body: 'Ia afferents report muscle length.', x: 53, y: 50, w: 4, h: 4, side: 'top' },
  { id: 'umn', label: 'Upper motor neurons', body: 'From motor cortex and brain stem: voluntary movement.', x: 57, y: 59, w: 4, h: 4, side: 'right' },
];

// Figure 13.20, labels printed.
const ALPHA_GAMMA_REGIONS = [
  { id: 'alpha', label: 'Alpha motor neuron', body: 'Innervates the extrafusal fibres that make force.', x: 36, y: 16.5, w: 4, h: 3, side: 'left' },
  { id: 'gamma', label: 'Gamma motor neuron', body: 'Innervates the intrafusal fibres inside the spindle.', x: 35, y: 20.5, w: 4, h: 3, side: 'left' },
  { id: 'extra', label: 'Extrafusal fibres', body: 'The bulk of the muscle.', x: 68, y: 62, w: 8, h: 16, side: 'right' },
  { id: 'intra', label: 'Intrafusal fibres', body: 'Inside the spindle\'s capsule, in parallel with the extrafusal fibres.', x: 20, y: 66, w: 10, h: 14, side: 'left' },
];

// Figure 13.4, labels printed.
const LMN_REGIONS = [
  { id: 'lmn', label: 'Lower motor neurons', body: 'Cell bodies in the ventral horn.', x: 49, y: 45, w: 6, h: 6, side: 'top' },
  { id: 'vhorn', label: 'Ventral horn', body: 'The grey matter that holds them.', x: 72, y: 45, w: 6, h: 6, side: 'right' },
  { id: 'vroot', label: 'Ventral root', body: 'Their axons leave the cord here.', x: 33, y: 49, w: 6, h: 4, side: 'top' },
  { id: 'nerve', label: 'Mixed spinal nerve', body: 'Motor axons travel with sensory ones.', x: 10, y: 70, w: 5, h: 8, side: 'left' },
  { id: 'fibre', label: 'Muscle fibre', body: 'The target: one axon branch per fibre.', x: 60, y: 87, w: 10, h: 5, side: 'bottom' },
];

// Figure 13.6, labels printed.
const VH_MAP_REGIONS = [
  { id: 'axial', label: 'Axial muscles: medial', body: 'Trunk muscles are controlled from the medial ventral horn.', x: 20, y: 74, w: 10, h: 6, side: 'left' },
  { id: 'distal', label: 'Distal muscles: lateral', body: 'Hands and feet from the lateral ventral horn.', x: 57, y: 80, w: 10, h: 6, side: 'right' },
  { id: 'flexors', label: 'Flexors: dorsal', body: 'Flexor motor neurons lie dorsal to extensor ones.', x: 40, y: 67, w: 10, h: 4, side: 'right' },
  { id: 'extensors', label: 'Extensors: ventral', body: 'Extensor motor neurons lie ventral.', x: 43, y: 92, w: 10, h: 4, side: 'bottom' },
];

// Figure 13.21, labels printed.
const SPINDLE_REGIONS = [
  { id: 'intra', label: 'Intrafusal fibres', body: 'Inside the spindle, in parallel with the extrafusal fibres.', x: 16, y: 45, w: 3, h: 16, side: 'left' },
  { id: 'ia', label: 'Ia axon', body: 'Wraps the spindle\'s middle; fires faster when it is stretched.', x: 25, y: 38, w: 4, h: 4, side: 'top' },
  { id: 'gamma', label: 'Gamma motor axon', body: 'Contracts the two ends of the intrafusal fibres.', x: 22, y: 60, w: 4, h: 4, side: 'left' },
  { id: 'alpha', label: 'Alpha motor axon', body: 'Contracts the extrafusal fibres.', x: 24, y: 81, w: 4, h: 4, side: 'left' },
  { id: 'slack', label: 'Alpha alone: slack', body: 'The muscle shortens, the spindle goes slack, the Ia axon falls silent.', x: 53, y: 40, w: 6, h: 16, side: 'top' },
  { id: 'taut', label: 'Gamma on: taut again', body: 'The ends contract, the middle is stretched, Ia fires again.', x: 86, y: 40, w: 6, h: 16, side: 'right' },
];

// Figure 13.22, labels printed.
const GTO_REGIONS = [
  { id: 'organ', label: 'Golgi tendon organ', body: 'At the junction of muscle and tendon, about $1\\,\\text{mm}$ long.', x: 50, y: 29, w: 8, h: 8, side: 'right' },
  { id: 'ib', label: 'Ib axon', body: 'Its branches twist among the collagen fibrils.', x: 64, y: 32, w: 4, h: 4, side: 'right' },
  { id: 'collagen', label: 'Collagen fibrils', body: 'Tension straightens them and they squeeze the Ib endings.', x: 50, y: 76, w: 20, h: 20, side: 'left' },
];

// Figure 13.23, labels printed.
const GTO_SERIES_REGIONS = [
  { id: 'gto', label: 'Tendon organ: in series', body: 'Between the fibres and their attachment: feels the force.', x: 24, y: 40, w: 4, h: 6, side: 'left' },
  { id: 'spindle', label: 'Spindle: in parallel', body: 'Alongside the fibres: feels their length.', x: 32, y: 65, w: 4, h: 10, side: 'left' },
  { id: 'active', label: 'Isometric contraction', body: 'The muscle contracts without changing length: Ib fires, Ia stays silent.', x: 82, y: 14, w: 10, h: 8, side: 'right' },
];

// Kandel 2013 drawing (S44), labels printed.
const HIERARCHY_REGIONS = [
  { id: 'motor', label: 'Motor areas', body: 'Motor cortex: tactics.', x: 36, y: 20, w: 10, h: 8, mx: 33, my: 30, side: 'top' },
  { id: 'bg', label: 'Basal ganglia', body: 'With the association areas: strategy.', x: 31, y: 43, w: 8, h: 6, mx: 27, my: 47, side: 'left' },
  { id: 'thal', label: 'Thalamus', body: 'Both loops return to cortex through it.', x: 48, y: 41, w: 8, h: 6, mx: 58, my: 46, side: 'top' },
  { id: 'cb', label: 'Cerebellum', body: 'With motor cortex: tactics.', x: 74, y: 74, w: 10, h: 8, mx: 68, my: 80, side: 'right' },
];

// Figure 14.2, labels printed.
const TRACT_SECTION_REGIONS = [
  { id: 'cst', label: 'Corticospinal tract', body: 'Lateral pathway, from cortex.', x: 58, y: 28, w: 6, h: 6, side: 'right' },
  { id: 'rst', label: 'Rubrospinal tract', body: 'Lateral pathway, from the red nucleus.', x: 59, y: 35, w: 4, h: 3, side: 'right' },
  { id: 'mrst', label: 'Medullary reticulospinal tract', body: 'Ventromedial: frees antigravity muscles from reflex control.', x: 56, y: 49, w: 4, h: 4, side: 'right' },
  { id: 'prst', label: 'Pontine reticulospinal tract', body: 'Ventromedial: strengthens antigravity reflexes in leg extensors.', x: 45, y: 58, w: 6, h: 3, side: 'bottom' },
  { id: 'vst', label: 'Vestibulospinal tracts', body: 'Ventromedial: head stability and upright posture.', x: 40, y: 49, w: 3, h: 4, side: 'left' },
  { id: 'tst', label: 'Tectospinal tract', body: 'Ventromedial: from the superior colliculus; orients the head.', x: 36, y: 46, w: 3, h: 4, side: 'left' },
];

// Figure 14.6, labels printed.
const TRACT_SUMMARY_REGIONS = [
  { id: 'cortex', label: 'Motor cortex', body: 'Commands the lateral pathways directly.', x: 40, y: 18, w: 12, h: 10, side: 'top' },
  { id: 'cst', label: 'Corticospinal tract', body: 'Straight to the spinal cord, no brain stem relay.', x: 40, y: 60, w: 4, h: 14, side: 'right' },
  { id: 'red', label: 'Red nucleus', body: 'Rubrospinal tract, lateral; reduced in humans.', x: 23, y: 70, w: 6, h: 4, mx: 23, my: 61, side: 'left' },
  { id: 'ret', label: 'Reticular nuclei', body: 'Reticulospinal tracts, ventromedial.', x: 58, y: 70, w: 6, h: 4, mx: 58, my: 61, side: 'right' },
  { id: 'sc', label: 'Superior colliculus and vestibular nuclei', body: 'Tectospinal and vestibulospinal tracts, ventromedial.', x: 76, y: 70, w: 8, h: 4, mx: 76, my: 61, side: 'right' },
];

// Figure 14.8 with the sensory map, labels printed.
const MOTOR_MAP_REGIONS = [
  { id: 'motor', label: 'Motor map, precentral gyrus', body: 'Area 4, M1. Stimulating a point twitches muscles of the opposite side.', x: 20, y: 66, w: 12, h: 16, mx: 26, my: 80, side: 'bottom' },
  { id: 'sensory', label: 'Sensory map, postcentral gyrus', body: 'S1 lies behind the central sulcus, mirror to the motor map.', x: 80, y: 66, w: 12, h: 16, side: 'right' },
  { id: 'hand', label: 'Hand area, motor map', body: 'Large, as in S1: fine control of the fingers.', x: 22, y: 38, w: 6, h: 6, side: 'top' },
  { id: 'leg', label: 'Leg area, motor map', body: 'Medial, at the top of the gyrus.', x: 39, y: 42, w: 4, h: 6, side: 'top' },
  { id: 'mouth', label: 'Face and mouth, motor map', body: 'Lateral: lips, jaw, tongue, swallowing.', x: 8, y: 66, w: 5, h: 10, side: 'left' },
];

// Figure 14.7, labels printed.
const MOTOR_AREA_REGIONS = [
  { id: 'pfc', label: 'Prefrontal cortex', body: 'Chooses actions and anticipates their outcome.', x: 19, y: 37, w: 8, h: 8, side: 'left' },
  { id: 'sma', label: 'SMA', body: 'Area 6, medial surface (dashed): planning sequences, both hands.', x: 30, y: 32, w: 4, h: 4, side: 'top' },
  { id: 'pma', label: 'PMA', body: 'Area 6, lateral surface: preparing movements.', x: 35, y: 37, w: 4, h: 6, side: 'top' },
  { id: 'm1', label: 'M1', body: 'Area 4, precentral gyrus.', x: 46, y: 26, w: 4, h: 6, side: 'top' },
  { id: 's1', label: 'S1', body: 'Areas 1, 2 and 3, postcentral gyrus.', x: 53, y: 31, w: 4, h: 6, side: 'top' },
  { id: 'a5', label: 'Area 5', body: 'Posterior parietal: somatosensory input.', x: 61, y: 25, w: 4, h: 4, side: 'right' },
  { id: 'a7', label: 'Area 7', body: 'Posterior parietal: visual input.', x: 70, y: 32, w: 6, h: 6, side: 'right' },
];

// Figure 14.14 as adapted on S48 (arrow from striatum to GPe corrected
// to inhibitory, as the notes say), labels printed.
const BG_REGIONS = [
  { id: 'cortex', label: 'Cerebral cortex', body: 'Excites the striatum and, directly, the STN.', x: 43, y: 17, w: 18, h: 6, mx: 14, my: 17, side: 'top' },
  { id: 'striatum', label: 'Striatum', body: 'Putamen and caudate: the input stage.', x: 33, y: 35, w: 14, h: 8, mx: 19, my: 35, side: 'left' },
  { id: 'snpc', label: 'SNpc', body: 'Dopamine: excites direct-pathway cells through D1, inhibits indirect-pathway cells through D2.', x: 84, y: 35, w: 8, h: 6, mx: 82, my: 36, side: 'right' },
  { id: 'gpe', label: 'GPe', body: 'Indirect pathway. Inhibits GPi and the STN.', x: 56, y: 54, w: 10, h: 6, mx: 65, my: 54, side: 'right' },
  { id: 'stn', label: 'STN', body: 'Excites GPi.', x: 81, y: 63, w: 8, h: 6, mx: 88, my: 63, side: 'right' },
  { id: 'gpi', label: 'GPi', body: 'Fires all the time, holding the motor thalamus inhibited.', x: 43, y: 70, w: 10, h: 6, mx: 30, my: 70, side: 'left' },
  { id: 'thal', label: 'Thalamus', body: 'VLo; when released from GPi, it excites SMA.', x: 43, y: 86, w: 12, h: 6, mx: 25, my: 86, side: 'left' },
];

// Figure 14.22, labels printed.
const CB_LOOP_REGIONS = [
  { id: 'cortex', label: 'Motor cortex', body: 'Areas 4 and 6, with somatosensory and posterior parietal cortex, project to the pons.', x: 45, y: 15, w: 10, h: 6, side: 'top' },
  { id: 'pons', label: 'Pontine nuclei', body: 'Relay about $20$ million cortical axons to the cerebellum.', x: 66, y: 45, w: 8, h: 4, mx: 78, my: 45, side: 'right' },
  { id: 'cb', label: 'Cerebellum', body: 'Lateral cerebellum: direction, timing and force.', x: 66, y: 52, w: 8, h: 4, mx: 78, my: 51.5, side: 'right' },
  { id: 'vlc', label: 'VLc', body: 'Part of the ventral lateral thalamus; relays the cerebellum to M1.', x: 52, y: 48, w: 6, h: 6, mx: 49, my: 46, side: 'right' },
  { id: 'cst', label: 'Corticospinal tract', body: 'Where the corrected commands go.', x: 40, y: 64, w: 4, h: 10, side: 'left' },
];

// Figure 14.15, labels printed.
const POOLS_REGIONS = [
  { id: 'layer5', label: 'Layer V corticospinal neurons', body: 'Large pyramidal cells; their axons form the corticospinal tract.', x: 50, y: 13, w: 20, h: 8, side: 'top' },
  { id: 'inter', label: 'Inhibitory interneurons', body: 'Excited by the corticospinal axon; they inhibit the antagonist pool.', x: 56, y: 52, w: 14, h: 6, side: 'right' },
  { id: 'flexor', label: 'Flexor motor neuron pools', body: 'Inhibited, through the interneurons.', x: 59, y: 63, w: 8, h: 6, side: 'right' },
  { id: 'extensor', label: 'Extensor motor neuron pools', body: 'Excited directly.', x: 55, y: 74, w: 8, h: 6, side: 'right' },
];

// Meier et al. 2008 (S50), legend printed.
const FMRI_REGIONS = [
  { id: 'fingers', label: 'Fingers', body: 'Red patches: voxels whose strongest response was to finger movement.', x: 23, y: 23, w: 6, h: 10, side: 'left' },
  { id: 'legend', label: 'Winner take all', body: 'Each voxel gets the colour of the one movement it responded to most; overlap is hidden.', x: 37, y: 22, w: 8, h: 20, mx: 34, my: 22, side: 'top' },
  { id: 'subjects', label: 'Four people', body: 'Panels A to D are individual maps: the layout differs in detail between people.', x: 77, y: 60, w: 18, h: 20, side: 'right' },
];

const DERMATOME_GROUPS = [
  { key: 'C', label: 'Cervical', segments: ['C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8'] },
  { key: 'T', label: 'Thoracic', segments: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'] },
  { key: 'L', label: 'Lumbar', segments: ['L1', 'L2', 'L3', 'L4', 'L5'] },
  { key: 'S', label: 'Sacral', segments: ['S1', 'S2', 'S3', 'S4', 'S5'] },
];

const DERMATOME_NOTES = {
  C2: 'Front of the neck, high, in this figure.',
  C5: 'The figure points C5 to the outer arm; the shaded band runs over the shoulders.',
  C6: 'Thumb side of the hand; on the back view a strip down the arm.',
  C7: 'Middle fingers; a strip down the back of the arm.',
  C8: 'Little finger side; the most medial strip on the back of the arm.',
  T1: 'Upper chest and the inner arm.',
  T4: 'The band at the level of the nipples.',
  T10: 'The band at the level of the navel.',
  L1: 'Groin and the band just above it.',
  L4: 'Front of the thigh and the inner shin.',
  L5: 'Outer shin and the top of the foot.',
  S1: 'Outer edge of the foot and the back of the thigh.',
  S3: 'An inner ring around the anus, and with S2 and S4 the genital region.',
};

export default {
  meta: {
    id: 'L06',
    number: 6,
    title: 'The somatic sensory system, spinal and brain control of movement',
    chapters: [12, 13, 14],
    pages: [
      { chapter: 12, from: 417, to: 450 },
      { chapter: 13, from: 454, to: 476 },
      { chapter: 14, from: 484, to: 517 },
    ],
    lectureDate: '2026-10-07',
    examDate: '2026-10-23',
  },

  objectives: [
    'Explain sensory coding: relate receptor sensitivity, receptive fields, adaptation and afferent firing to the perception of touch and temperature.',
    'Trace the ascending pathways for touch and for pain and temperature, say where each crosses, predict basic lesion effects, and explain somatotopy and map plasticity.',
    'Distinguish nociception from pain and describe how spinal inhibition, descending pathways and endogenous opioids regulate nociceptive transmission.',
    'Explain how muscle force is graded by recruitment and firing rate, and compare muscle spindle and Golgi tendon organ feedback, including alpha-gamma coactivation.',
    'Compare feedback and feedforward control, and the roles of the motor control hierarchy, the descending tracts, the basal ganglia and the cerebellum.',
    'Say what fMRI, MEG and stimulation measure when the motor cortex is mapped.',
  ],

  prerequisites: [
    { text: 'Directional terms: dorsal and ventral, medial and lateral, ipsilateral and contralateral.', lectureId: 'L01', sectionId: 'directions' },
    { text: 'Grey and white matter, the spinal cord and the brain stem.', lectureId: 'L01', sectionId: 'gross-anatomy' },
    { text: 'Graded receptor potentials versus all-or-none action potentials, and firing rate as a code.', lectureId: 'L02', sectionId: 'initiation' },
    { text: 'Myelin and axon diameter set conduction speed.', lectureId: 'L02', sectionId: 'myelin' },
    { text: 'Excitatory and inhibitory synapses.', lectureId: 'L03', sectionId: 'epsp-ipsp' },
    { text: 'Receptive fields and maps (retinotopy, tonotopy), the model somatotopy follows.', lectureId: 'L04', sectionId: 'receptive-field' },
  ],

  sections: [
    // =================================================================
    // PART 1. SOMATIC SENSATION
    // 1 -----------------------------------------------------------------
    {
      id: 'somatic-senses',
      part: { id: 'part-1', number: 1, title: 'Somatic sensation', intro: 'Chapter 12, slides 5 to 31. How skin, muscles and joints turn touch, pain, temperature and position into signals, and the two routes those signals take to the cortex.' },
      title: 'The somatosensory system and the skin\'s mechanoreceptors',
      keyTerms: ['somatic sensation', 'mechanoreceptor', 'glabrous skin', 'hairy skin'],
      blocks: [
        { type: 'text', body: 'Somatic sensation is every sense except hearing, smell, taste, vision and balance: touch, temperature, pain, itch and body position. Most of its receptors are mechanoreceptors.' },
        { type: 'definition', term: 'Mechanoreceptor', body: 'A receptor sensitive to physical distortion such as bending or stretching. At its heart is an unmyelinated axon terminal; most skin types add non-neural tissue around it.' },
        figureBlock(
          hotspots('skin', 818 / 749, 'Block of hairy and glabrous skin with six numbered markers on its receptors.', SKIN_REGIONS),
          'Receptors in hairy and glabrous skin (Figure 12.1, slide 8).',
          'A cut block of skin: a hair on the left, the epidermis on top, the dermis below with a large onion-like corpuscle deep on the left, small capsules in the ridges of the glabrous skin on the right, and fine endings near the surface.'
        ),
        { type: 'compare', title: 'Where they sit', columns: ['Depth', 'Size'], rows: [
          { label: 'Merkel\'s disk', cells: ['Epidermis', 'A terminal on one Merkel cell'] },
          { label: 'Meissner\'s corpuscle', cells: ['Dermal ridges of glabrous skin', 'A tenth of a Pacinian'] },
          { label: 'Pacinian corpuscle', cells: ['Deep dermis', 'Up to $2\\,\\text{mm}$ long'] },
          { label: 'Ruffini\'s ending', cells: ['Deep dermis, hairy and glabrous', 'Slightly smaller than a Pacinian'] },
        ] },
        { type: 'whyItMatters', body: 'Skin can be vibrated, pressed, pricked, stroked and its hairs bent. Different receptor types, tuned to different features, let us tell these apart.' },
      ],
      conceptQuiz: [
        {
          id: 'senses-1',
          prompt: 'Which of these is not part of somatic sensation?',
          options: [
            { text: 'Temperature', feedback: 'Temperature is a somatic sense, signalled by thermoreceptors.' },
            { text: 'Balance', feedback: 'Correct. Balance is the vestibular sense, listed apart on slide 7.' },
            { text: 'Itch', feedback: 'Itch is on the slide\'s list of somatic senses.' },
            { text: 'Body position', feedback: 'Body position (proprioception) is a somatic sense.' },
          ],
          correct: 1,
        },
      ],
    },

    // 2 -----------------------------------------------------------------
    {
      id: 'receptive-fields',
      title: 'Receptive fields, sensitivity and specificity',
      keyTerms: ['receptive field', 'rapidly adapting', 'slowly adapting'],
      blocks: [
        { type: 'definition', term: 'Receptive field', body: 'The area of skin where stimulation changes the activity of one sensory afferent. Vallbo and Johansson mapped them by recording one median nerve axon while probing the hand.' },
        figureBlock(
          hotspots('rf-recording', 826 / 488, 'Arm with a recording electrode in the median nerve and a probe on the fingertip.', RF_RECORDING_REGIONS, { quiz: false, layout: 'stack' }),
          'Mapping a receptive field in a human volunteer (Figure 12.2a, slide 9).',
          'An outstretched arm: a probe touches a fingertip, a fine electrode enters the median nerve at the forearm, and a box shows a burst of spikes.'
        ),
        figureBlock(
          hotspots('rf-hands', 599 / 394, 'Two hands: small blue dots on the first, large blue patches on the second.', RF_HANDS_REGIONS, { quiz: false }),
          'Small Meissner fields and large Pacinian fields (Figure 12.2b, slide 9).',
          'Left hand with several small blue dots on fingertips and palm; right hand with two large blue areas covering a finger and half the palm.'
        ),
        figureBlock(
          hotspots('mech-table', 1039 / 422, 'Two by two table of receptors by field size and adaptation, with probe and spike traces.', MECH_TABLE_REGIONS, { quiz: false, layout: 'stack' }),
          'Field size against adaptation (Figure 12.3, slide 10). Upper trace in each cell: the probe; lower: the spikes.',
          'A grid: columns small and large receptive field, rows rapid and slow adaptation. Rapid cells fire only at the start (and for Pacinian also the end) of a press; slow cells fire throughout.'
        ),
        { type: 'compare', title: 'Four mechanoreceptors (slide 10)', columns: ['Field', 'Adaptation', 'Best at'], rows: [
          { label: 'Merkel\'s disk', cells: ['Small', 'Slow', 'Sustained pressure, edges, fine detail'] },
          { label: 'Meissner\'s corpuscle', cells: ['Small', 'Rapid', 'Skin motion, flutter, about $50\\,\\text{Hz}$'] },
          { label: 'Pacinian corpuscle', cells: ['Large', 'Rapid', 'Vibration, $200$ to $300\\,\\text{Hz}$'] },
          { label: 'Ruffini\'s ending', cells: ['Large', 'Slow', 'Skin stretch'] },
        ] },
        figureBlock(
          hotspots('freq-tuning', 586 / 474, 'Two U-shaped threshold curves against stimulus frequency.', FREQ_REGIONS, { quiz: false }),
          'Threshold indentation against vibration frequency (Figure 12.4, slide 10). Lower means more sensitive.',
          'Log-log graph: the blue Meissner curve has its lowest point near 50 hertz; the red Pacinian curve dips far lower, to about 1 micrometre, near 300 hertz.'
        ),
        { type: 'detail', title: 'Hair follicle receptors', body: 'Free endings wrap around or run along each follicle. Bending the hair deforms them and changes their firing. They can be slowly or rapidly adapting.' },
      ],
      conceptQuiz: [
        {
          id: 'rf-1',
          prompt: 'Which receptor combines a small receptive field with slow adaptation?',
          options: [
            { text: 'Meissner\'s corpuscle', feedback: 'Small field, but it adapts rapidly.' },
            { text: 'Ruffini\'s ending', feedback: 'Slowly adapting, but its field is large.' },
            { text: 'Pacinian corpuscle', feedback: 'Large field and rapid adaptation.' },
            { text: 'Merkel\'s disk', feedback: 'Correct. Small field, sustained firing.' },
          ],
          correct: 3,
        },
        {
          id: 'rf-2',
          prompt: 'You rest your hand on a loudspeaker playing music. Which receptor mostly lets you feel it?',
          options: [
            { text: 'Pacinian corpuscles, tuned to high-frequency vibration', feedback: 'Correct. Their threshold is lowest at $200$ to $300\\,\\text{Hz}$.' },
            { text: 'Merkel\'s disks, tuned to steady pressure and edges', feedback: 'Merkel disks signal sustained contact, not fast vibration.' },
            { text: 'Ruffini\'s endings, tuned to slow stretch of the skin', feedback: 'Ruffini endings signal stretch, not vibration.' },
          ],
          correct: 0,
        },
      ],
    },

    // 3 -----------------------------------------------------------------
    {
      id: 'adaptation',
      title: 'Adaptation and the Pacinian capsule',
      keyTerms: ['adaptation', 'receptor potential', 'capsule'],
      blocks: [
        { type: 'definition', term: 'Adaptation', body: 'The change in a receptor\'s response during a maintained stimulus. Rapidly adapting afferents report change; slowly adapting ones keep firing while contact lasts.' },
        { type: 'steps', title: 'Why the Pacinian corpuscle adapts fast (slide 11)', steps: [
          'The probe compresses the capsule and energy reaches the nerve terminal.',
          'The terminal membrane deforms, mechanosensitive channels open, and a depolarizing receptor potential appears.',
          'If the pressure is held, the slick capsule layers slip past each other, the terminal is no longer deformed, and the potential fades.',
          'When the probe lifts, the terminal is deformed again: a second receptor potential at the offset.',
        ] },
        figureBlock(
          hotspots('pacinian', 653 / 750, 'Intact and stripped Pacinian corpuscle under a held probe, with receptor potentials.', PACINIAN_REGIONS, { quiz: false }),
          'The capsule experiment (Figure 12.5, slide 11).',
          'Top: the intact corpuscle gives a peak of receptor potential when the probe presses and another when it lifts, nothing in between. Bottom: the bare ending gives a large response that decays slowly while the probe is held.'
        ),
        { type: 'compare', title: 'Intact against stripped', columns: ['Intact corpuscle', 'Capsule removed'], rows: [
          { label: 'Responds to indentation?', cells: ['Yes, at onset and offset', 'Yes'] },
          { label: 'During the hold', cells: ['Silent', 'A much more prolonged response'] },
          { label: 'So the capsule', cells: ['Makes it rapidly adapting', 'Is not needed for mechanotransduction'] },
        ] },
        demoBlock('adaptation-demo', {
          initial: { hold: 1.2, depth: 0.7 },
          rows: [
            { key: 'pacinian', label: 'Pacinian', sub: 'intact' },
            { key: 'stripped', label: 'Pacinian', sub: 'capsule removed' },
            { key: 'merkel', label: 'Merkel', sub: 'slowly adapting' },
          ],
          labels: {
            hold: 'Probe held for', depth: 'Indentation', shallow: 'shallow', medium: 'medium', deep: 'deep',
            probe: 'Probe', time: 's', held: 'probe held', onset: 'onset', during: 'during the hold', removal: 'at removal', spikes: 'spikes',
            note: 'A silent Pacinian afferent during the hold does not mean the probe is gone: the Merkel afferent is still firing. Only removal brings the second Pacinian burst.',
          },
        },
        'Three afferents under the same held probe (HW3 2B.2). Thin grey line: receptor potential. Ticks: spikes. Illustrative model, not recorded data.',
        'Three rows under a probe trace that steps down, holds and steps up. Intact Pacinian: a few spikes at the press and at the lift. Stripped Pacinian: dense firing that thins out during the hold. Merkel: a burst, then steady firing until the lift.'),
        { type: 'misconception', wrong: 'Adaptation means the receptor stops firing.', right: 'Adaptation means the response declines during a maintained stimulus. A slowly adapting receptor keeps firing at a lower rate.' },
      ],
      conceptQuiz: [
        {
          id: 'adapt-1',
          prompt: 'What happened when the capsule was stripped from a Pacinian corpuscle?',
          options: [
            { text: 'The ending gave a much longer response to a held press', feedback: 'Correct. The capsule, not the ending, makes it rapidly adapting.' },
            { text: 'The ending stopped responding to any indentation at all', feedback: 'It still responded: the capsule is not needed to transduce.' },
            { text: 'The ending fired only at the offset of each press', feedback: 'Onset and offset responses are the intact corpuscle\'s pattern.' },
          ],
          correct: 0,
        },
      ],
    },

    // 4 -----------------------------------------------------------------
    {
      id: 'mechanotransduction',
      title: 'Mechanosensitive ion channels',
      keyTerms: ['mechanosensitive channel', 'second messenger'],
      blocks: [
        { type: 'text', body: 'All skin mechanoreceptors have unmyelinated terminals whose membranes hold mechanosensitive channels. Force changes their gating, and the ionic current changes.' },
        { type: 'steps', title: 'Three ways force reaches the channel (slide 12)', steps: [
          { title: 'The membrane itself:', body: 'stretch or bending of the lipid bilayer pulls the channel open.' },
          { title: 'Extracellular proteins:', body: 'force on a protein tethered to the channel from outside.' },
          { title: 'The cytoskeleton:', body: 'force through actin or microtubules inside the cell.' },
        ] },
        figureBlock(
          hotspots('mech-channels', 662 / 1124, 'Three membrane panels with channels opened by stretch, an outside tether and an inside tether.', CHANNEL_REGIONS, { quiz: false }),
          'Mechanosensitive channels (Figure 12.6, slide 12). The open channel lets $\\text{Na}^+$ and $\\text{Ca}^{2+}$ in.',
          'Three stacked membrane drawings with two green channels each. Top: arrows stretch the membrane. Middle: a protein outside pulls a channel. Bottom: a protein inside pulls a channel. The open channel passes sodium and calcium inward.'
        ),
        { type: 'detail', title: 'An indirect route', body: 'Mechanical stimuli may also trigger second messengers such as DAG and $\\text{IP}_3$, which regulate ion channels secondarily.' },
      ],
      conceptQuiz: [
        {
          id: 'mech-1',
          prompt: 'Which is not one of the ways slide 12 gives for force to open a channel?',
          options: [
            { text: 'Stretch of the lipid membrane', feedback: 'This is panel (a).' },
            { text: 'A tether to an extracellular protein', feedback: 'This is panel (b).' },
            { text: 'Binding of a released transmitter', feedback: 'Correct. Transmitter binding is ligand gating, not mechanical gating.' },
            { text: 'A link to the cytoskeleton', feedback: 'This is panel (c).' },
          ],
          correct: 2,
        },
      ],
    },

    // 5 -----------------------------------------------------------------
    {
      id: 'two-point',
      title: 'Two-point discrimination: why the fingertip wins',
      keyTerms: ['two-point discrimination'],
      blocks: [
        { type: 'definition', term: 'Two-point discrimination', body: 'The smallest distance at which two simultaneous touches feel like two points rather than one. It varies at least 20-fold across the body.' },
        { type: 'keyNumber', items: [
          { value: '$1\\,\\text{mm}$, $2.5\\,\\text{mm}$', label: 'height and spacing of Braille dots' },
          { value: '600', label: 'letters per minute for an experienced Braille reader' },
        ] },
        { type: 'steps', title: 'Why the fingertip beats the elbow (slide 12, p. 422)', steps: [
          'A much higher density of mechanoreceptors in the skin.',
          'More receptor types with small receptive fields, such as Merkel\'s disks.',
          'More brain tissue, so more processing, devoted to each square millimetre of skin.',
          'Possibly special neural mechanisms for high-resolution discrimination.',
        ] },
        { type: 'example', body: 'Braille readers move the fingertip across the dots: touch is most sensitive when skin and stimulus move against each other. Practice improves pattern discrimination.' },
      ],
      conceptQuiz: [
        {
          id: 'two-point-1',
          prompt: 'Two nearby points are told apart more easily on the fingertip than on the upper arm. Which pair of reasons does the slide give?',
          options: [
            { text: 'Small receptive fields and more cortex per area of skin', feedback: 'Correct. Peripheral sampling and central processing both matter.' },
            { text: 'Large receptive fields and faster C-fibre conduction', feedback: 'Large fields lower spatial precision, and C fibres carry pain.' },
            { text: 'Rapid adaptation and a thicker epidermis over receptors', feedback: 'Neither explains spatial resolution.' },
          ],
          correct: 0,
        },
      ],
    },

    // 6 -----------------------------------------------------------------
    {
      id: 'afferents',
      title: 'Afferent axons, types I to IV',
      keyTerms: ['afferent', 'efferent', 'dorsal root ganglion', 'primary afferent'],
      blocks: [
        { type: 'compare', title: 'Direction of travel', columns: ['Carries'], rows: [
          { label: 'Afferent', cells: ['Toward the CNS: sensory'] },
          { label: 'Efferent', cells: ['Away from the CNS: to muscles and glands'] },
        ] },
        { type: 'definition', term: 'Primary afferent', body: 'The sensory neuron from a receptor to the spinal cord or brain stem. It enters through a dorsal root; its cell body sits in the dorsal root ganglion just outside the cord.' },
        figureBlock(
          hotspots('fibre-classes', 877 / 829, 'Four axons drawn to scale with their diameter, speed and receptors.', FIBRE_REGIONS, { quiz: false }),
          'Primary afferent axons by size (Figure 12.10, slide 14). Skin names use Greek letters, muscle names Roman numerals.',
          'A table of four axons from thick to thin. A-alpha group I: thick myelin, 13 to 20 micrometres, 80 to 120 metres per second. A-beta group II, A-delta group III, and the thin unmyelinated C fibre, group IV.'
        ),
        { type: 'keyNumber', items: [
          { value: '$80$ to $120\\,\\text{m/s}$', label: 'A-alpha (I): muscle proprioceptors' },
          { value: '$35$ to $75\\,\\text{m/s}$', label: 'A-beta (II): skin mechanoreceptors' },
          { value: '$5$ to $30\\,\\text{m/s}$', label: 'A-delta (III): pain, temperature' },
          { value: '$0.5$ to $2\\,\\text{m/s}$', label: 'C (IV): temperature, pain, itch' },
        ], note: 'Diameter and myelin set the speed. C fibres are the only unmyelinated class.' },
        { type: 'detail', title: 'First and second pain', body: 'A brief harmful stimulus gives a sharp first pain carried by fast A-delta fibres, then a duller, longer second pain carried by slow C fibres (notes 2.3, p. 442).' },
      ],
      conceptQuiz: [
        {
          id: 'aff-1',
          prompt: 'Where are the cell bodies of the primary afferents from the trunk and limbs?',
          options: [
            { text: 'In the dorsal horn of the spinal cord', feedback: 'The dorsal horn holds second-order neurons.' },
            { text: 'In the dorsal root ganglia', feedback: 'Correct. Just outside the cord, on the dorsal root.' },
            { text: 'In the ventral horn of the spinal cord', feedback: 'The ventral horn holds lower motor neurons.' },
            { text: 'In the dorsal column nuclei', feedback: 'Those are in the medulla, where touch afferents end.' },
          ],
          correct: 1,
        },
        {
          id: 'aff-2',
          prompt: 'Which afferent class carries touch from skin mechanoreceptors?',
          options: [
            { text: 'C fibres, group IV', feedback: 'C fibres carry temperature, pain and itch.' },
            { text: 'A-delta fibres, group III', feedback: 'A-delta fibres carry pain and temperature.' },
            { text: 'A-beta fibres, group II', feedback: 'Correct. Large, myelinated, $35$ to $75\\,\\text{m/s}$.' },
          ],
          correct: 2,
        },
      ],
    },

    // 7 -----------------------------------------------------------------
    {
      id: 'dermatomes',
      title: 'Spinal segments and dermatomes',
      keyTerms: ['spinal segment', 'dermatome', 'dorsal horn', 'ventral horn', 'intermediate zone'],
      blocks: [
        { type: 'text', body: 'The spinal cord repeats one pattern 30 times: a pair of dorsal roots and a pair of ventral roots per segment. Each spinal nerve leaves between two vertebrae and is named for the vertebra beside it.' },
        figureBlock(
          hotspots('segments', 748 / 965, 'Spinal cord with numbered segments and spinal nerves, beside the vertebral column.', SEGMENT_REGIONS, { quiz: false }),
          'Segmental organization (Figure 12.11, slide 15).',
          'Left: the spinal cord from the brain down with its nerves, coloured by group, numbered C1 to S5. Right: the same in side view inside the vertebral column, where the cord ends above the lower vertebrae.'
        ),
        { type: 'keyNumber', items: [
          { value: 'C1 to C8', label: 'cervical' }, { value: 'T1 to T12', label: 'thoracic' },
          { value: 'L1 to L5', label: 'lumbar' }, { value: 'S1 to S5', label: 'sacral' },
        ] },
        { type: 'definition', term: 'Dermatome', body: 'The area of skin supplied by the right and left dorsal roots of one spinal segment. Dermatomes form bands on the trunk and long strips on the limbs.' },
        demoBlock('dermatome-map', {
          src: fig('dermatomes'),
          alt: 'Front and back view of a body with dermatome bands; the chosen segment is shaded.',
          size: DERMATOME_SIZE,
          paths: DERMATOME_PATHS,
          points: DERMATOME_POINTS,
          groups: DERMATOME_GROUPS,
          initial: 'T10',
          notes: DERMATOME_NOTES,
          labels: {
            choose: 'Spinal segment', whole: 'Light the whole group', wholeShort: 'whole group lit',
            spot: 'A ring marks where the figure points without drawing a boundary.',
            overlap: 'Neighbouring dermatomes overlap: cutting one dorsal root leaves some sensation in its band, and three adjacent roots must be cut to lose it all.',
          },
        },
        'Pick a segment to shade its skin on Figure 12.12 (slide 16). Only areas the figure itself labels are shaded; its printed labels stay visible. Arrow keys move along the cord.',
        'Front and back views of a standing man with coloured dermatome bands: pink cervical over the neck, shoulders and arms, blue thoracic bands around the trunk, green lumbar and teal sacral strips down the legs. The chosen segment is shaded in the accent colour.'),
        { type: 'compare', title: 'Inside the cord (slide 15)', columns: ['What it is', 'What it does'], rows: [
          { label: 'Gray matter', cells: ['Inner core, butterfly-shaped', 'Neurons and local circuits'] },
          { label: 'Dorsal horn', cells: ['Gray matter, dorsal', 'Receives sensory input'] },
          { label: 'Intermediate zone', cells: ['Gray matter, between the horns', 'Interneurons combine input with commands'] },
          { label: 'Ventral horn', cells: ['Gray matter, ventral', 'Lower motor neurons'] },
          { label: 'White matter', cells: ['Thick outer tracts (columns)', 'Carry signals up and down'] },
        ] },
        { type: 'misconception', wrong: 'The dorsal columns are the dorsal roots.', right: 'Dorsal roots carry axons into the cord. The dorsal columns are white matter tracts inside it.' },
      ],
      conceptQuiz: [
        {
          id: 'derm-1',
          prompt: 'One dorsal root is cut on the right. What happens to sensation in its dermatome?',
          options: [
            { text: 'It is lost completely on both sides of the body', feedback: 'Each side has its own dorsal roots; the left is untouched.' },
            { text: 'It is reduced on the right but not abolished', feedback: 'Correct. Neighbouring roots overlap the same skin.' },
            { text: 'It is lost completely on the right side only', feedback: 'Overlap from the neighbouring roots spares some sensation.' },
            { text: 'It is unchanged, because the ventral root takes over', feedback: 'Ventral roots carry motor axons out, not sensation in.' },
          ],
          correct: 1,
        },
      ],
    },

    // 8 -----------------------------------------------------------------
    {
      id: 'dcml',
      title: 'The dorsal column-medial lemniscal pathway',
      keyTerms: ['dorsal column', 'dorsal column nuclei', 'medial lemniscus', 'VP nucleus', 'decussate'],
      blocks: [
        { type: 'text', body: 'Touch and vibration take a path to the brain entirely separate from pain and temperature. The touch path is named for its two white matter tracts.' },
        figureBlock(
          hotspots('dorsal-horn', 647 / 401, 'Spinal cord cross section with an A-beta axon entering; six numbered markers.', DORSAL_HORN_REGIONS),
          'Where the A-beta touch axon goes in the cord (Figure 12.14, slide 17).',
          'A cross section of the spinal cord: a purple A-beta axon comes in from the right through its ganglion, sends a branch into the gray matter, and turns up into the blue dorsal columns toward the brain.'
        ),
        { type: 'steps', title: 'Right index finger to S1 (HW3 2A.1)', steps: [
          { title: 'Dorsal root:', body: 'the A-beta afferent enters the cord. One branch synapses in the deep dorsal horn for reflexes.' },
          { title: 'Dorsal column:', body: 'the other branch ascends in the right (ipsilateral) dorsal column, with no synapse.' },
          { title: 'Dorsal column nuclei:', body: 'first synapse, where the cord meets the medulla.' },
          { title: 'Crossing:', body: 'second-order axons decussate in the medulla and ascend in the medial lemniscus.' },
          { title: 'VP thalamus:', body: 'second synapse, in the ventral posterior nucleus.' },
          { title: 'S1:', body: 'thalamic neurons project to the left primary somatosensory cortex.' },
        ] },
        figureBlock(
          hotspots('dcml', 1012 / 1030, 'The pathway from a dorsal root through medulla and thalamus to cortex.', DCML_REGIONS, { quiz: false }),
          'The dorsal column-medial lemniscal pathway (Figure 12.15, slide 17).',
          'A red line from a large dorsal root axon up the same side of the spinal cord, to a nucleus in the medulla, across the midline, up to the thalamus and out to the postcentral gyrus on the opposite side.'
        ),
        { type: 'whyItMatters', body: 'Below the medulla, touch runs on the same side as the body it came from; above it, on the opposite side. Where a lesion sits decides which side loses touch.' },
        { type: 'detail', title: 'Relay nuclei are not passive', body: 'Information is transformed at every set of synapses, in the dorsal column nuclei and in the thalamus, and cortex feeds back onto both (p. 428).' },
      ],
      conceptQuiz: [
        {
          id: 'dcml-1',
          prompt: 'Where do the second-order axons of the touch pathway cross the midline?',
          options: [
            { text: 'In the spinal cord, at the level of entry', feedback: 'That is the spinothalamic pathway.' },
            { text: 'In the thalamus, before reaching cortex', feedback: 'They are already crossed when they reach the thalamus.' },
            { text: 'In the medulla, after the dorsal column nuclei', feedback: 'Correct. They then ascend in the medial lemniscus.' },
          ],
          correct: 2,
        },
      ],
    },

    // 9 -----------------------------------------------------------------
    {
      id: 'trigeminal',
      title: 'The trigeminal touch pathway',
      keyTerms: ['trigeminal nerve', 'principal sensory trigeminal nucleus'],
      blocks: [
        { type: 'text', body: 'If the spinal cord were the whole story, the face would be numb. Facial touch arrives mostly through the trigeminal nerves, cranial nerve V, which enter the brain at the pons.' },
        { type: 'steps', title: 'Cheek to S1 (slide 18, HW3 2A.2)', steps: [
          'Large mechanoreceptor axons from the face travel in the trigeminal nerve, not in a spinal root.',
          'They synapse in the principal sensory trigeminal nucleus on the same side, in the pons.',
          'Second-order axons cross the midline and ascend to the medial part of the VP thalamus.',
          'The thalamus relays to the face area of S1.',
        ] },
        figureBlock(
          hotspots('trigeminal', 1160 / 1051, 'The trigeminal pathway from face to cortex through the pons and thalamus.', TRIGEMINAL_REGIONS, { quiz: false }),
          'The trigeminal touch pathway (Figure 12.16, slide 18).',
          'A blue line enters the pons from a facial nerve, synapses in a nucleus on the same side, crosses, rises to the thalamus and ends in the lateral postcentral gyrus of the other hemisphere.'
        ),
        { type: 'compare', title: 'Body and face', columns: ['Body', 'Face'], rows: [
          { label: 'Enters through', cells: ['Dorsal roots', 'Trigeminal nerve (V), at the pons'] },
          { label: 'First synapse', cells: ['Dorsal column nuclei', 'Principal sensory trigeminal nucleus'] },
          { label: 'Thalamus', cells: ['VP', 'Medial part of VP'] },
        ] },
      ],
      conceptQuiz: [
        {
          id: 'trig-1',
          prompt: 'Does touch from the right cheek enter through a spinal dorsal root?',
          options: [
            { text: 'No, it enters through the trigeminal nerve at the pons', feedback: 'Correct. Cranial nerve V carries most facial touch.' },
            { text: 'Yes, through the dorsal root of the second cervical segment', feedback: 'C2 supplies the back of the head and the neck, not the cheek.' },
            { text: 'No, it enters through the vestibular nerve at the medulla', feedback: 'The vestibular nerve carries balance signals from the inner ear.' },
          ],
          correct: 0,
        },
      ],
    },

    // 10 ----------------------------------------------------------------
    {
      id: 's1',
      title: 'Somatosensory cortex: area 3b, layers and columns',
      keyTerms: ['primary somatosensory cortex', 'area 3b', 'postcentral gyrus', 'cortical column'],
      blocks: [
        { type: 'text', body: 'Most somatosensory cortex is in the parietal lobe. Areas 3a, 3b, 1 and 2 lie on the postcentral gyrus, just behind the central sulcus; areas 5 and 7 lie behind them in posterior parietal cortex.' },
        figureBlock(
          hotspots('s1-areas', 635 / 968, 'Brain with somatosensory areas coloured, and a cut through the postcentral gyrus with areas numbered.', S1_REGIONS, { quiz: false }),
          'Somatosensory areas (Figure 12.17, slide 19). Brodmann\'s map on slide 24 shows the same strip: areas 1, 2 and 3 behind area 4.',
          'A lateral brain with a green strip behind the central sulcus and a purple patch behind it; below, a section through the gyri numbered 3a and 3b in the sulcus, 1 on the crown, 2, then 5 and 7.'
        ),
        { type: 'steps', title: 'Why area 3b is S1 (slide 19)', steps: [
          'It receives dense input from the VP nucleus of the thalamus.',
          'Its neurons respond strongly to somatosensory stimuli, and not to other senses.',
          'Lesions here impair somatic sensation.',
          'Electrical stimulation here evokes somatic sensory experiences.',
        ] },
        figureBlock(
          hotspots('s1-columns', 502 / 1085, 'A block of area 3b with strips for three fingers and alternating columns.', COLUMN_REGIONS, { quiz: false }),
          'Columns in area 3b (Figure 12.18, slide 20).',
          'A small brain at the top with the postcentral strip marked; below, a block of cortex divided into strips for fingers D1 to D3, each striped with pink and green columns, fed from the thalamus and the dorsal column nucleus, which receive the fingertips.'
        ),
        { type: 'compare', title: 'Organization (slide 20)', columns: ['Detail'], rows: [
          { label: 'Layers', cells: ['Six, like other neocortex; thalamic input ends mainly in layer IV'] },
          { label: 'Columns', cells: ['Neurons with similar input stacked across the layers; first described in S1 by Mountcastle'] },
          { label: 'Localization', cells: ['Each site responds to a specific part of the body'] },
        ] },
        { type: 'detail', title: 'The neighbours of 3b', body: 'Area 3a also gets dense thalamic input, about body position rather than touch. Areas 1 and 2 receive from 3b: area 1 mainly texture, area 2 size and shape (p. 431).' },
      ],
      conceptQuiz: [
        {
          id: 's1-1',
          prompt: 'Where do the thalamic inputs to S1 mainly end?',
          options: [
            { text: 'In layer I', feedback: 'Layer I is mostly dendrites and axons, not the main thalamic target.' },
            { text: 'In layer IV', feedback: 'Correct, as in visual and auditory cortex.' },
            { text: 'In layer VI', feedback: 'Layer VI sends output back to the thalamus.' },
          ],
          correct: 1,
        },
      ],
    },

    // 11 ----------------------------------------------------------------
    {
      id: 'somatotopy',
      title: 'The somatotopic map',
      keyTerms: ['somatotopy', 'homunculus'],
      blocks: [
        { type: 'definition', term: 'Somatotopy', body: 'An ordered map of the body surface on a brain structure: neighbouring skin goes to neighbouring cortex. Found by electrical stimulation (Penfield) and by recording from neurons.' },
        figureBlock(
          hotspots('homunculus', 670 / 745, 'Cut through the postcentral gyrus with the body parts drawn along it.', HOMUNCULUS_REGIONS, { quiz: false }),
          'The somatotopic map in S1 (Figure 12.19, slide 21).',
          'A green section of the postcentral gyrus with a distorted body above it: toes and legs at the top and medial, then trunk, head, a very large hand, then face, lips, tongue and pharynx laterally.'
        ),
        { type: 'steps', title: 'Three things to notice (slide 21)', steps: [
          { title: 'Order:', body: 'legs and feet medial, near the top; face and mouth lateral.' },
          { title: 'Not continuous:', body: 'the hand sits between the head and the face.' },
          { title: 'Not to scale:', body: 'lips, tongue and fingers are huge, trunk and legs small. Size follows receptor density and how important the input is.' },
        ] },
        { type: 'whyItMatters', body: 'S1 represents mainly the opposite side of the body: left S1, right body. A lesion on one side costs sensation on the other.' },
        { type: 'text', body: 'Slide 22 shows such maps measured: individual finger maps of area 3b by fMRI and by optical imaging of intrinsic signals in monkeys, which placed the fingers in broadly the same spots.' },
        { type: 'detail', title: 'More than one map', body: 'Areas 3b and 1 each hold a map of the body, side by side; in the owl monkey the two hand maps are mirror images across the border (pp. 433-434).' },
      ],
      conceptQuiz: [
        {
          id: 'som-1',
          prompt: 'In what sense is the somatotopic map "not continuous"?',
          options: [
            { text: 'The hand area separates the head area from the face area', feedback: 'Correct. Neighbouring body parts are not always neighbours in cortex.' },
            { text: 'The left half of the body is mapped in both hemispheres', feedback: 'Each S1 maps mainly the opposite half.' },
            { text: 'Each body part is mapped in a random place in each person', feedback: 'The order is consistent; only the details vary.' },
          ],
          correct: 0,
        },
      ],
    },

    // 12 ----------------------------------------------------------------
    {
      id: 'plasticity',
      title: 'Map plasticity',
      keyTerms: ['map plasticity'],
      blocks: [
        figureBlock(
          hotspots('plasticity', 687 / 1077, 'Monkey hand maps in S1: normal, after removing one finger, and after training two.', PLASTICITY_REGIONS, { quiz: false }),
          'Somatotopic map plasticity in owl monkeys (Figure 12.23, slide 23).',
          'Top: a monkey brain with the hand area marked. Below, three pairs of a hand and its cortical map: normal digits 1 to 5; after digit 3 is removed, digits 2 and 4 take over its strip; after training digits 2 and 3, their strips grow.'
        ),
        { type: 'compare', title: 'Two experiments (slide 23)', columns: ['What was done', 'What the map did'], rows: [
          { label: 'Less input', cells: ['Digit 3 removed, mapped months later', 'Cortex for D3 now responds to D2 and D4'] },
          { label: 'More input', cells: ['Weeks of rewarded use of selected fingers', 'Their representations expand'] },
        ] },
        { type: 'text', body: 'Similar plasticity is found in visual, auditory and motor cortex: adult maps adjust to the amount of sensory experience.' },
        { type: 'detail', title: 'Size is not body size (HW3 2B.3)', body: 'In people, string players have an enlarged representation of the fingering hand, and amputees can feel a missing hand when the face is touched, because the face area has spread into the old hand cortex (p. 436).' },
      ],
      conceptQuiz: [
        {
          id: 'plas-1',
          prompt: 'After weeks of practice with the same two fingertips, what happens to their representation in S1?',
          options: [
            { text: 'It shrinks, because the neurons adapt to the repeated input', feedback: 'Adaptation is a receptor property; the map grows with use.' },
            { text: 'It expands at the expense of neighbouring representations', feedback: 'Correct, as in the trained monkeys of slide 23.' },
            { text: 'It moves to the opposite hemisphere to share the load', feedback: 'The map stays in the hemisphere opposite the hand.' },
          ],
          correct: 1,
        },
      ],
    },

    // 13 ----------------------------------------------------------------
    {
      id: 'ppc',
      title: 'Posterior parietal cortex',
      keyTerms: ['posterior parietal cortex'],
      blocks: [
        { type: 'text', body: 'Different parts of cortex specialize, but stimulus-specific information must come together. The posterior parietal cortex (PPC) summarizes it and translates it into action.' },
        { type: 'steps', title: 'From intention to action (slide 25, Cui 2014)', steps: [
          { title: 'Sensory input', body: 'arrives in visual coordinates.' },
          { title: 'General motor intention:', body: 'potential motor plans for the entire sequence.' },
          { title: 'Detailed motor program:', body: 'in the body\'s own coordinates, one selected plan, elementary actions.' },
          { title: 'Motor output.', body: 'The PPC seems to be a hierarchical mosaic of such intentional maps.' },
        ] },
        { type: 'compare', title: 'Its inputs (pp. 437, 493)', columns: ['Gets input from', 'Role'], rows: [
          { label: 'Area 5', cells: ['Somatosensory areas 3, 1 and 2', 'Where the body is'] },
          { label: 'Area 7', cells: ['Higher-order visual areas', 'Where the target is'] },
        ] },
        { type: 'whyItMatters', body: 'PPC neurons have large, complex receptive fields and respond to touch, vision, planned movement and attention. PPC and prefrontal cortex both feed area 6, where planning starts.' },
      ],
      conceptQuiz: [
        {
          id: 'ppc-1',
          prompt: 'What does slide 25 say the posterior parietal cortex does?',
          options: [
            { text: 'Relays touch from the thalamus to area 3b without changing it', feedback: 'That is the VP thalamus, and relays do transform information.' },
            { text: 'Integrates stimulus-specific information and turns it into action', feedback: 'Correct. A hierarchical mosaic of intentional maps.' },
            { text: 'Sends the corticospinal tract directly to the motor neurons', feedback: 'Most corticospinal axons come from areas 4 and 6.' },
          ],
          correct: 1,
        },
      ],
    },

    // 14 ----------------------------------------------------------------
    {
      id: 'nociceptors',
      title: 'Pain and nociceptors',
      keyTerms: ['nociceptor', 'nociception', 'polymodal', 'hyperalgesia', 'inflammatory soup'],
      blocks: [
        { type: 'compare', title: 'Two words (slide 26)', columns: ['Meaning'], rows: [
          { label: 'Pain', cells: ['The feeling and perception: sore, stinging, aching'] },
          { label: 'Nociception', cells: ['The sensory process that signals harm and may trigger pain'] },
        ] },
        { type: 'definition', term: 'Nociceptor', body: 'A free, branching, unmyelinated ending that signals tissue damage or its risk. Carried by unmyelinated C fibres and lightly myelinated A-delta fibres.' },
        { type: 'definition', term: 'Polymodal', body: 'Responding to mechanical, thermal and chemical stimuli. Most nociceptors are polymodal; some are selective for one kind.' },
        figureBlock(
          hotspots('pain-soup', 1049 / 756, 'A wound with chemicals released around a nociceptor ending, a mast cell, a blood vessel and the spinal cord.', SOUP_REGIONS, { quiz: false }),
          'The inflammatory soup (Figure 12.25, slide 26).',
          'A pin pierces the skin; bradykinin, prostaglandins and potassium reach a nociceptor ending; a mast cell releases histamine; substance P from other branches acts on a blood vessel; the noxious signal travels to the dorsal root ganglion and spinal cord.'
        ),
        { type: 'definition', term: 'Hyperalgesia', body: 'Enhanced pain sensitivity: a lower threshold, stronger pain, or even spontaneous pain. Chemicals of the inflammatory soup raise nociceptor excitability.' },
        { type: 'detail', title: 'What each chemical does (pp. 438-441)', body: [
          'Bradykinin depolarizes nociceptors and makes heat channels more sensitive. Prostaglandins cause no pain themselves but sensitize nociceptors; aspirin blocks their synthesis.',
          'Histamine from mast cells depolarizes nociceptors and makes capillaries leaky. Substance P, released by other branches of the same axon, dilates vessels and frees histamine, spreading the sensitivity.',
        ] },
      ],
      conceptQuiz: [
        {
          id: 'noci-1',
          prompt: 'Why is a light touch on sunburnt skin painful?',
          options: [
            { text: 'Chemicals released at the injury make nociceptors more excitable', feedback: 'Correct. This is hyperalgesia.' },
            { text: 'The burn turns Meissner\'s corpuscles into nociceptors', feedback: 'Receptor types do not convert; the nociceptors become sensitized.' },
            { text: 'The burn speeds up C fibres to the speed of A-beta fibres', feedback: 'Conduction speed is set by diameter and myelin, not by injury.' },
          ],
          correct: 0,
        },
      ],
    },

    // 15 ----------------------------------------------------------------
    {
      id: 'spinothalamic',
      title: 'The spinothalamic pathway and its immediate crossing',
      keyTerms: ['spinothalamic tract', 'intralaminar nuclei', 'hemisection'],
      blocks: [
        { type: 'steps', title: 'Pain from the right foot (slide 27)', steps: [
          'A-delta and C afferents enter through the dorsal root and synapse in the dorsal horn.',
          'Second-order axons decussate immediately, at about the level of entry.',
          'They ascend on the opposite side in the spinothalamic tract, through cord, medulla, pons and midbrain, without a synapse.',
          'They end in the VP and intralaminar nuclei of the thalamus, which relay to S1 and wider cortical areas.',
        ] },
        figureBlock(
          hotspots('spinothalamic', 1308 / 1210, 'Pain pathway from small dorsal root axons across the cord, up to thalamus and cortex.', STT_REGIONS, { quiz: false }),
          'The spinothalamic pathway (Figure 12.30, slide 27).',
          'A red line from a small dorsal root axon into the spinal cord, across the midline at once, up the opposite side through the medulla to the thalamus and the postcentral gyrus.'
        ),
        demoBlock('pathway-tracer', {
          initial: { side: 'right', show: 'both', lesion: 'none' },
          lesions: [
            { key: 'none', label: 'None' },
            { key: 'hemi-right', label: 'Right half of the cord' },
            { key: 'dc-right', label: 'Right dorsal column' },
            { key: 'ml-left', label: 'Left medial lemniscus' },
          ],
          labels: {
            side: 'Stimulus on the', left: 'left', right: 'right', show: 'Trace', touch: 'Touch', pain: 'Pain and temperature', both: 'Both',
            lesion: 'Lesion', cut: 'Lesion', s1Left: 'Left S1', s1Right: 'Right S1', thalamus: 'VP thalamus', medulla: 'Medulla', cord: 'Spinal cord',
            midline: 'midline', bodyLeft: 'Left body', bodyRight: 'Right body', dcml: 'Dorsal column', stt: 'Spinothalamic',
            crossMedulla: 'crosses in the medulla', crossCord: 'crosses at once',
            leftBody: 'Left side of the body', rightBody: 'Right side of the body', touchRow: 'Touch, vibration, position', painRow: 'pain, temperature', intact: 'intact', lost: 'lost',
          },
        },
        'Touch (blue, dorsal column-medial lemniscal) and pain and temperature (dashed, spinothalamic) from one side of the body. Pick a lesion: the read-out lists what is lost on each side below it. The stimulus enters below the lesion level. Schematic.',
        'A ladder of S1, thalamus, medulla and spinal cord either side of a midline. From the right body, a blue path climbs the right side of the cord, crosses in the medulla and ends in left S1; a dashed path crosses in the cord at once and climbs the left side to left S1.'),
        figureBlock(
          hotspots('two-pathways', 610 / 665, 'The two ascending pathways side by side with their crossings.', TWO_PATH_REGIONS, { quiz: false }),
          'The two ascending pathways compared (Figure 12.31, slide 27).',
          'Left: the dorsal column path rises on the same side and crosses at the medulla. Right: the spinothalamic path crosses in the spinal cord and rises on the opposite side. Both reach thalamus and cortex.'
        ),
        { type: 'compare', title: 'One half of the cord cut (hemisection)', columns: ['Same side, below the cut', 'Opposite side, below the cut'], rows: [
          { label: 'Touch, vibration, position', cells: ['Lost', 'Intact'] },
          { label: 'Pain, temperature', cells: ['Intact', 'Lost'] },
        ] },
        { type: 'detail', title: 'Brown-Sequard syndrome', body: 'The textbook\'s name for the signs of damage to one side of the cord; movement is also impaired on the same side, because the motor tracts have already crossed higher up (p. 445).' },
      ],
      conceptQuiz: [
        {
          id: 'stt-1',
          prompt: 'The left half of the spinal cord is cut at T10. Pain from the right foot is:',
          options: [
            { text: 'Lost, because its spinothalamic axons ascend on the left', feedback: 'Correct. They crossed at entry, below the cut.' },
            { text: 'Intact, because pain ascends on the same side as the foot', feedback: 'Pain crosses at once and ascends on the opposite side.' },
            { text: 'Lost, because its dorsal column axons ascend on the left', feedback: 'Pain is not in the dorsal columns, and right-foot touch rises on the right.' },
          ],
          correct: 0,
        },
      ],
    },

    // 16 ----------------------------------------------------------------
    {
      id: 'pain-regulation',
      title: 'Pain regulation: the gate and the PAG',
      keyTerms: ['gate theory', 'periaqueductal gray', 'analgesia', 'raphe nuclei'],
      blocks: [
        { type: 'text', body: 'The same nociceptor activity can produce more pain or less, depending on other sensory input and on the brain\'s state. Slide 28 shows two controls.' },
        figureBlock(
          hotspots('gate', 658 / 514, 'Dorsal horn with an A-beta axon, a C fibre, an interneuron and a projection neuron.', GATE_REGIONS, { quiz: false }),
          'Melzack and Wall\'s gate theory of pain (Figure 12.33, slide 28). Plus signs excitatory, minus signs inhibitory.',
          'Inside the dorsal horn, a blue A-beta axon and a red C fibre both contact a red projection neuron that sends its axon toward the spinothalamic tract. A grey interneuron between them inhibits the projection neuron; A-beta excites it, the C fibre inhibits it.'
        ),
        { type: 'steps', title: 'Why rubbing a bruise helps', steps: [
          'The C fibre excites the projection neuron and inhibits the interneuron: the gate is open.',
          'Rubbing activates low-threshold A-beta mechanoreceptors.',
          'A-beta input excites the inhibitory interneuron.',
          'The interneuron inhibits the projection neuron: less nociceptive signal reaches the brain.',
        ] },
        figureBlock(
          hotspots('pag', 852 / 735, 'Midbrain, medulla and spinal cord sections linked by a descending red line.', PAG_REGIONS, { quiz: false }),
          'Descending pain control (Figure 12.34, slide 28).',
          'A sagittal brain with three section planes; the midbrain section with the PAG at the top right, a red axon down to the raphe nuclei in the medulla, and on to the dorsal horn of the spinal cord.'
        ),
        { type: 'steps', title: 'Descending control', steps: [
          'The periaqueductal gray (PAG) in the midbrain receives signals about emotional and behavioural state.',
          'It drives the raphe nuclei of the medulla, which use serotonin.',
          'Raphe axons descend to the dorsal horn and depress nociceptive neurons.',
          'Electrical stimulation of the PAG can cause a profound analgesia.',
        ] },
      ],
      conceptQuiz: [
        {
          id: 'gate-1',
          prompt: 'In the gate theory, what does the A-beta mechanoreceptor axon excite?',
          options: [
            { text: 'Only the projection neuron, opening the gate wider', feedback: 'It excites the interneuron too, and that closes the gate.' },
            { text: 'The projection neuron and the inhibitory interneuron', feedback: 'Correct. The interneuron\'s inhibition wins when touch comes with pain.' },
            { text: 'Only the C fibre, through an axon-to-axon synapse', feedback: 'The figure shows no synapse onto the C fibre.' },
          ],
          correct: 1,
        },
      ],
    },

    // 17 ----------------------------------------------------------------
    {
      id: 'opioids',
      title: 'Opioids and endorphins',
      keyTerms: ['endorphin', 'opioid receptor', 'opioid'],
      blocks: [
        { type: 'definition', term: 'Endorphins', body: 'Endogenous morphine-like peptides made by the brain itself. They bind tightly and specifically to several types of opioid receptor.' },
        { type: 'compare', title: 'Where and how (slide 29, p. 448)', columns: ['Detail'], rows: [
          { label: 'Distribution', cells: ['Widespread in the CNS, concentrated where nociceptive information is processed or modulated'] },
          { label: 'Presynaptic', cells: ['Less glutamate released from nociceptive terminals'] },
          { label: 'Postsynaptic', cells: ['Hyperpolarization, so dorsal horn neurons fire less'] },
          { label: 'Sites', cells: ['Morphine or endorphins in the PAG, raphe or dorsal horn produce analgesia'] },
        ] },
        { type: 'text', body: 'Slide 29 (Corder et al. 2018) shows opioid receptors and peptides across circuits for the sensory, affective, cognitive and motivational sides of pain, with descending modulation through the PAG and the rostral ventromedial medulla.' },
        { type: 'whyItMatters', body: 'Pain depends on processing as much as on input. The brain can turn nociceptive transmission down with its own opioids.' },
      ],
      conceptQuiz: [
        {
          id: 'opi-1',
          prompt: 'How do endorphins weaken nociceptive transmission in the dorsal horn?',
          options: [
            { text: 'They reduce glutamate release and hyperpolarize postsynaptic neurons', feedback: 'Correct. Both effects lower the chance of firing.' },
            { text: 'They block voltage-gated sodium channels along the C-fibre axons', feedback: 'That is how local anaesthetics act, not endorphins.' },
            { text: 'They speed up conduction so that touch arrives before the pain', feedback: 'Endorphins act at synapses, not on conduction speed.' },
          ],
          correct: 0,
        },
      ],
    },

    // 18 ----------------------------------------------------------------
    {
      id: 'temperature',
      title: 'Temperature',
      keyTerms: ['thermoreceptor', 'TRP channel', 'TRPV1', 'TRPM8'],
      blocks: [
        { type: 'definition', term: 'Thermoreceptor', body: 'A neuron exquisitely sensitive to temperature. Skin thermoreceptors give temperature perception; temperature-sensitive neurons in the hypothalamus and spinal cord drive physiological responses.' },
        figureBlock(
          hotspots('trp', 1601 / 1150, 'Six TRP channels in a membrane, and their activity against temperature.', TRP_REGIONS, { quiz: false }),
          'Thermosensitive TRP channels (Figure 12.35, slide 30). Menthol opens TRPM8, capsaicin opens TRPV1.',
          'Top: six channels in a membrane from cold blue to warm orange. Bottom: activity against temperature from 0 to 55 degrees: TRPA1 and TRPM8 rise toward the cold, TRPV4, TRPV3, TRPV1 and TRPV2 rise toward the heat; a mint leaf points at TRPM8, a chilli at TRPV1.'
        ),
        { type: 'steps', title: 'One channel, one line (slide 30)', steps: [
          'Each thermoreceptive neuron expresses mainly one type of TRP channel, tuned to one temperature range.',
          'Menthol opens TRPM8, the cool channel, so mint feels cold without any cooling.',
          'Capsaicin opens TRPV1, the channel for painful heat above about $43\\,^{\\circ}\\text{C}$: chilli burns.',
          'The CNS does not know what opened the channel. It reads all activity from a cold receptor as cold.',
        ] },
        figureBlock(
          hotspots('thermo-adapt', 927 / 723, 'Skin temperature step down and back, with cold and warm receptor spikes.', THERMO_REGIONS, { quiz: false }),
          'Thermoreceptors adapt (Figure 12.36, slide 31).',
          'Skin temperature drops from 38 to 32 degrees and returns. The cold receptor bursts at the drop and settles to a faster steady rate; the warm receptor stops, then resumes slowly, and bursts on rewarming.'
        ),
        { type: 'text', body: 'Receptors react to changes, as in other systems. Responses adapt after a few seconds, and sudden changes give the most striking responses.' },
      ],
      conceptQuiz: [
        {
          id: 'temp-1',
          prompt: 'Why does menthol feel cool?',
          options: [
            { text: 'It lowers skin temperature by evaporating quickly', feedback: 'The effect is chemical, not a real drop in temperature.' },
            { text: 'It opens TRPM8, the channel of cold-sensing neurons', feedback: 'Correct. The brain reads cold-receptor activity as cold.' },
            { text: 'It opens TRPV1, the channel of heat-sensing neurons', feedback: 'TRPV1 is opened by capsaicin and gives burning heat.' },
          ],
          correct: 1,
        },
      ],
    },

    // =================================================================
    // PART 2. SPINAL CONTROL OF MOVEMENT
    // 19 ----------------------------------------------------------------
    {
      id: 'muscle',
      part: { id: 'part-2', number: 2, title: 'Spinal control of movement', intro: 'Chapter 13, slides 32 to 42. How motor neurons grade muscle force, and how two kinds of proprioceptor close a feedback loop through the spinal cord.' },
      title: 'The somatic motor system and skeletal muscle',
      keyTerms: ['somatic motor system', 'skeletal muscle', 'muscle fibre', 'sarcomere'],
      blocks: [
        { type: 'text', body: 'The brain takes in and interprets sensory data, stores it, transforms it, produces knowledge and controls the body. Its most visible output runs through the somatic motor system: the skeletal muscles and the neurons that control them.' },
        figureBlock(
          hotspots('muscle', 1055 / 855, 'Arm with the biceps, and a bundle of muscle fibres with their axons.', MUSCLE_REGIONS, { quiz: false }),
          'A muscle and its innervation (Figure 13.1, slide 33).',
          'A bent arm with the biceps shaded; an arrow leads to a bundle of striped fibres, each touched by a green axon branch coming from the CNS.'
        ),
        figureBlock(
          hotspots('muscle-structure', 1165 / 899, 'Muscle broken down from bundles to fibres, sarcomeres and myofilaments.', MUSCLE_STRUCTURE_REGIONS, { quiz: false }),
          'From muscle to myofilaments (slide 33, after Komi 2003).',
          'Line drawings at falling scale: a muscle with its bundles, fibres with blood vessels, one fibre, a sarcomere, and the myofilaments actin, myosin and titin.'
        ),
        { type: 'steps', title: 'Nested structure (slide 33)', steps: [
          { title: 'Muscle:', body: 'hundreds of fibres in a connective tissue sheath that forms the tendons.' },
          { title: 'Muscle fibre:', body: 'one long cell, innervated by one axon branch.' },
          { title: 'Sarcomere:', body: 'the repeating contractile unit along the fibre.' },
          { title: 'Myofilaments:', body: 'thin actin, thick myosin, and elastic titin.' },
        ] },
        { type: 'text', body: 'A muscle can only pull. At the elbow, flexors bend the joint and extensors straighten it.' },
        { type: 'detail', title: 'Not on the slides', body: 'How a muscle action potential becomes force (calcium release, the cross-bridge cycle, ATP) is in the notes and on pp. 464-468, but no slide shows it; slide 34 may have been an animation of it. It is left out here.' },
      ],
      conceptQuiz: [
        {
          id: 'muscle-1',
          prompt: 'Which is the repeating contractile unit along a muscle fibre?',
          options: [
            { text: 'The sarcomere', feedback: 'Correct. Actin and myosin overlap within it.' },
            { text: 'The motor unit', feedback: 'A motor unit is a neuron and its fibres, not a unit inside a fibre.' },
            { text: 'The tendon', feedback: 'The tendon joins muscle to bone.' },
            { text: 'The fascicle', feedback: 'A fascicle is a bundle of whole fibres.' },
          ],
          correct: 0,
        },
      ],
    },

    // 20 ----------------------------------------------------------------
    {
      id: 'muscle-actions',
      title: 'Muscle actions at a joint',
      keyTerms: ['agonist', 'antagonist', 'synergist', 'fixator'],
      blocks: [
        { type: 'compare', title: 'Four roles (slide 35)', columns: ['Role', 'At the elbow, during flexion'], rows: [
          { label: 'Agonist', cells: ['The prime mover of the action', 'The flexors, such as biceps and brachialis'] },
          { label: 'Antagonist', cells: ['Produces the opposing action', 'The extensors, such as triceps'] },
          { label: 'Synergist', cells: ['Works with the agonist on the same action', 'Biceps and brachialis for each other'] },
          { label: 'Fixator', cells: ['A synergist that holds the agonist\'s base steady', 'Muscles steadying the shoulder'] },
        ] },
        { type: 'text', body: 'The roles depend on the action. During elbow extension the triceps is the agonist and the flexors are the antagonists. Relaxing the antagonist makes the movement faster and more efficient.' },
        { type: 'compare', title: 'Where the muscles act (p. 456)', columns: ['Move', 'Mainly for'], rows: [
          { label: 'Axial', cells: ['The trunk', 'Posture'] },
          { label: 'Proximal', cells: ['Shoulder, elbow, pelvis, knee', 'Locomotion'] },
          { label: 'Distal', cells: ['Hands, feet, digits', 'Manipulating objects'] },
        ] },
      ],
      conceptQuiz: [
        {
          id: 'actions-1',
          prompt: 'You curl a dumbbell up by bending the elbow. What is the triceps?',
          options: [
            { text: 'The agonist', feedback: 'The agonist of flexion is the flexor group.' },
            { text: 'The antagonist', feedback: 'Correct. It produces the opposing action, extension.' },
            { text: 'The fixator', feedback: 'A fixator steadies the agonist\'s base, such as the shoulder.' },
            { text: 'The synergist', feedback: 'Synergists work with the agonist; the triceps opposes it.' },
          ],
          correct: 1,
        },
      ],
    },

    // 21 ----------------------------------------------------------------
    {
      id: 'motor-unit',
      title: 'The motor unit',
      keyTerms: ['motor unit', 'motor neuron pool', 'twitch', 'rate coding'],
      blocks: [
        { type: 'definition', term: 'Motor unit', body: 'One alpha motor neuron and all the muscle fibres it innervates. Each spike of the neuron makes every fibre of the unit contract.' },
        { type: 'definition', term: 'Motor neuron pool', body: 'All the alpha motor neurons that innervate one muscle.' },
        figureBlock(
          hotspots('motor-unit', 598 / 927, 'One motor neuron with its fibres, and a pool of neurons over the arm.', MOTOR_UNIT_REGIONS, { quiz: false }),
          'A motor unit and a motor neuron pool (Figure 13.7, slide 36).',
          'Top: one green alpha motor neuron branches onto several striped muscle fibres, bracketed as one motor unit. Bottom: an oval of several motor neurons sends axons to the biceps: the pool.'
        ),
        figureBlock(
          hotspots('twitch-summation', 888 / 847, 'Force and spike traces at four firing rates.', TWITCH_REGIONS, { quiz: false }),
          'From twitch to sustained contraction (Figure 13.8, slide 36).',
          'Four panels of force above spikes: at 5 hertz two separate twitches, at 10 hertz overlapping twitches, at 20 hertz a rippled plateau, at 40 hertz a smooth plateau.'
        ),
        { type: 'steps', title: 'Rate coding', steps: [
          'One motor neuron spike releases acetylcholine and gives one muscle action potential: one twitch.',
          'At higher rates the twitches overlap and add up (temporal summation).',
          'At high enough rates they fuse into a smooth, sustained contraction.',
        ] },
        figureBlock(
          hotspots('mu-types', 963 / 945, 'Twitches of three motor unit types, and their force over repeated stimulation.', MU_TYPE_REGIONS, { quiz: false }),
          'Three types of motor unit (Figure 13.10, slide 36).',
          'Left: one twitch of each type: a tall fast red twitch, a medium blue one, a small slow green one. Right: force over many minutes of 40 hertz trains: red collapses within a minute, blue declines slowly, green stays flat for an hour.'
        ),
        { type: 'compare', title: 'Motor unit types (pp. 461-462)', columns: ['Twitch', 'Fatigue', 'Motor neuron'], rows: [
          { label: 'Slow (S)', cells: ['Small, slow', 'Resistant', 'Small; steady $10$ to $20$ spikes/s'] },
          { label: 'Fast fatigue-resistant (FR)', cells: ['Moderate, fast', 'Fairly resistant', 'Intermediate'] },
          { label: 'Fast fatigable (FF)', cells: ['Largest, fastest', 'Quick', 'Largest; bursts at $30$ to $60$ spikes/s'] },
        ] },
        { type: 'keyNumber', items: [
          { value: 'over 1000', label: 'fibres per motor neuron in antigravity leg muscles' },
          { value: 'about 3', label: 'fibres per motor neuron in finger and eye muscles' },
        ], note: 'Small units allow fine control; large units add a lot of force at once.' },
      ],
      conceptQuiz: [
        {
          id: 'mu-1',
          prompt: 'What makes up one motor unit?',
          options: [
            { text: 'One alpha motor neuron and all the fibres it innervates', feedback: 'Correct.' },
            { text: 'All the alpha motor neurons that innervate one muscle', feedback: 'That is the motor neuron pool.' },
            { text: 'One muscle fibre and all the motor neurons that reach it', feedback: 'Each fibre gets one axon branch, from one neuron.' },
          ],
          correct: 0,
        },
      ],
    },

    // 22 ----------------------------------------------------------------
    {
      id: 'recruitment',
      title: 'Recruitment order and Henneman\'s size principle',
      keyTerms: ['recruitment', 'size principle'],
      blocks: [
        { type: 'definition', term: 'Henneman\'s size principle', body: 'As excitatory drive grows, small, low-threshold motor neurons are recruited first and larger, higher-threshold ones later. Small neurons are more easily excited by descending signals.' },
        { type: 'steps', title: 'Two ways to add force (HW3 3B.1)', steps: [
          { title: 'Recruitment:', body: 'activate more motor units, in order of size: slow, then fast fatigue-resistant, then fast fatigable.' },
          { title: 'Rate coding:', body: 'fire the active motor neurons faster, so their twitches summate.' },
        ] },
        demoBlock('recruitment-demo', {
          units: 24,
          initial: 20,
          labels: {
            force: 'Force asked for', pool: 'Motor neuron pool, smallest unit first', raster: 'Spikes in one second, one row per unit',
            curve: 'Force against units recruited', curveX: '% of the pool recruited', curveY: '% MVC',
            recruited: 'Units recruited', types_: 'By type', rate: 'Firing rates', perSecond: 'spikes/s',
            types: { S: 'Slow', FR: 'Fast fatigue-resistant', FF: 'Fast fatigable' },
          },
        },
        'Slide the force (as a share of maximal voluntary contraction, MVC). Units fill as they are recruited, smallest first; darker means faster firing. The curve is the shape of slide 37: the last, largest units add the most force. Illustrative model.',
        'A row of 24 circles growing from tiny to large, grouped slow, fast fatigue-resistant and fast fatigable; recruited circles are filled. Below, a raster with one row of spikes per recruited unit; to the right, a curve of force against percent of the pool recruited, rising slowly then steeply.'),
        { type: 'misconception', wrong: 'Stronger contractions need bigger action potentials.', right: 'Action potentials are all or none. Force grows by recruiting more units and by firing them faster.' },
        { type: 'whyItMatters', body: 'Most everyday movements need weak contractions, done finely by many small units. Recruiting small first means fine control at low force, and the big, tiring units are saved for rare strong efforts.' },
        { type: 'detail', title: 'The Cinderella hypothesis', body: 'Grey on slide 37. Low-threshold units are recruited first and stay on through long, light work, so the same fibres get little rest; this is proposed to contribute to muscle pain (notes 6.2).' },
      ],
      conceptQuiz: [
        {
          id: 'recruit-1',
          prompt: 'In what order are motor units usually recruited as force increases?',
          options: [
            { text: 'Fast fatigable, then fast fatigue-resistant, then slow', feedback: 'That is the reverse of the size principle.' },
            { text: 'All types at once, with force set only by firing rate', feedback: 'Recruitment is ordered; rate coding adds to it.' },
            { text: 'Slow, then fast fatigue-resistant, then fast fatigable', feedback: 'Correct. Small, low-threshold units first.' },
          ],
          correct: 2,
        },
      ],
    },

    // 23 ----------------------------------------------------------------
    {
      id: 'lmn',
      title: 'Lower motor neurons',
      keyTerms: ['lower motor neuron', 'alpha motor neuron', 'gamma motor neuron', 'extrafusal fibre', 'intrafusal fibre', 'final common pathway'],
      blocks: [
        { type: 'definition', term: 'Lower motor neuron', body: 'A motor neuron in the ventral horn whose axon leaves through the ventral root to a skeletal muscle. Only lower motor neurons command muscles directly: the final common pathway.' },
        figureBlock(
          hotspots('lmn', 1030 / 953, 'Spinal cord with lower motor neurons in the ventral horn, their axons to a muscle fibre.', LMN_REGIONS, { quiz: false }),
          'Lower motor neurons (Figure 13.4, slide 39).',
          'A spinal cord segment with green motor neurons in the blue ventral horn; their axons run out through the ventral root, join the mixed spinal nerve and end on a striped muscle fibre.'
        ),
        figureBlock(
          hotspots('lmn-inputs', 984 / 865, 'Spinal cord section with an alpha motor neuron and three arrows of input.', LMN_INPUT_REGIONS, { quiz: false }),
          'The three inputs to an alpha motor neuron (Figure 13.9, slide 38).',
          'A cross section with one green motor neuron in the ventral horn and three blue arrows into it: from spinal interneurons, from muscle spindles, and from upper motor neurons in the brain.'
        ),
        { type: 'compare', title: 'Three inputs (slide 38)', columns: ['Brings'], rows: [
          { label: 'Muscle spindle afferents', cells: ['Feedback about muscle length'] },
          { label: 'Upper motor neurons', cells: ['Commands from motor cortex and brain stem: voluntary movement'] },
          { label: 'Spinal interneurons', cells: ['The largest input, excitatory or inhibitory: spinal motor programs'] },
        ] },
        figureBlock(
          hotspots('alpha-gamma', 782 / 1015, 'Alpha and gamma motor neurons, the muscle, and a spindle inside it.', ALPHA_GAMMA_REGIONS, { quiz: false }),
          'Alpha and gamma motor neurons (Figure 13.20, slide 38).',
          'A cord section with a green alpha and a purple gamma motor neuron; the green axon ends on the big muscle, the purple axons end on the two ends of a spindle drawn enlarged in an inset.'
        ),
        { type: 'compare', title: 'Two kinds of lower motor neuron', columns: ['Target', 'Job'], rows: [
          { label: 'Alpha', cells: ['Extrafusal fibres, the bulk of the muscle', 'Make force'] },
          { label: 'Gamma', cells: ['Intrafusal fibres inside the spindles', 'Keep the spindles taut and sensitive'] },
        ] },
        figureBlock(
          hotspots('ventral-horn-map', 544 / 985, 'Ventral horn enlarged with the positions of motor neurons by muscle.', VH_MAP_REGIONS, { quiz: false }),
          'Where motor neurons sit in the ventral horn (Figure 13.6, slide 39).',
          'A cord section and an enlarged ventral horn shaped like a small body: axial muscles medial, distal muscles lateral, flexors dorsal, extensors ventral.'
        ),
        { type: 'detail', title: 'The enlargements', body: 'Arm muscles get their motor neurons from C3 to T1 and leg muscles from L1 to S3, so the ventral horns swell there: the cervical and lumbar enlargements (pp. 457-458).' },
      ],
      conceptQuiz: [
        {
          id: 'lmn-1',
          prompt: 'Which input to an alpha motor neuron is the largest?',
          options: [
            { text: 'Muscle spindle afferents', feedback: 'Important for the stretch reflex, but not the largest input.' },
            { text: 'Spinal interneurons', feedback: 'Correct. They carry the spinal motor programs.' },
            { text: 'Upper motor neurons', feedback: 'They start voluntary movement, but interneurons supply the most input.' },
          ],
          correct: 1,
        },
        {
          id: 'lmn-2',
          prompt: 'In the ventral horn, motor neurons for distal muscles of the hand lie:',
          options: [
            { text: 'Lateral to those for axial muscles', feedback: 'Correct. Axial medial, distal lateral.' },
            { text: 'Medial to those for axial muscles', feedback: 'It is the other way round.' },
            { text: 'In the dorsal horn, next to sensory neurons', feedback: 'Lower motor neurons are all in the ventral horn.' },
          ],
          correct: 0,
        },
      ],
    },

    // 24 ----------------------------------------------------------------
    {
      id: 'spindles',
      title: 'Muscle spindles and the stretch reflex',
      keyTerms: ['muscle spindle', 'Ia axon', 'stretch reflex', 'alpha-gamma coactivation', 'proprioception'],
      blocks: [
        { type: 'definition', term: 'Muscle spindle', body: 'A proprioceptor: a few specialized intrafusal fibres in a capsule, lying in parallel with the extrafusal fibres. Group Ia axons wrap its middle and signal muscle length and its change.' },
        { type: 'steps', title: 'The stretch reflex, shortest path (HW3 3A.2)', steps: [
          'A load stretches the muscle and its spindles.',
          'Mechanosensitive channels in the Ia endings open; the Ia afferents fire faster.',
          'Ia axons enter through the dorsal root and excite alpha motor neurons of the same muscle: one synapse, excitatory.',
          'The alpha motor neurons fire faster; their axons leave through the ventral root.',
          'The extrafusal fibres contract and the muscle shortens against the stretch.',
        ] },
        { type: 'example', body: 'The knee jerk: tapping the tendon below the kneecap briefly stretches the quadriceps, which reflexively contracts. Cutting the dorsal roots abolishes the reflex and muscle tone, although the motor neurons are intact.' },
        figureBlock(
          hotspots('spindle', 1601 / 763, 'Muscle and spindle in three states: at rest, after alpha activation, after gamma activation.', SPINDLE_REGIONS, { quiz: false, layout: 'stack' }),
          'Why gamma motor neurons are needed (Figure 13.21, slide 40).',
          'Three frames of a red muscle with a yellow spindle beside it. (a) at rest, the Ia axon fires. (b) after alpha activation the muscle shortens, the spindle goes wavy and slack, and the Ia axon is silent. (c) after gamma activation the spindle ends contract, it is taut again, and Ia fires.'
        ),
        { type: 'compare', title: 'Alpha alone against alpha with gamma', columns: ['Spindle', 'Ia output'], rows: [
          { label: 'Alpha alone', cells: ['Goes slack as the muscle shortens', 'Falls silent: "off the air"'] },
          { label: 'Gamma alone', cells: ['Its ends contract, the middle is stretched', 'Rises'] },
          { label: 'Alpha and gamma together', cells: ['Stays taut while the muscle shortens', 'Keeps reporting length'] },
        ] },
        { type: 'whyItMatters', body: 'Descending commands normally activate alpha and gamma motor neurons together. Gamma activity also sets the length the stretch loop defends: its set point.' },
      ],
      conceptQuiz: [
        {
          id: 'spindle-1',
          prompt: 'Only alpha motor neurons are activated and the muscle shortens. What happens to Ia firing?',
          options: [
            { text: 'It rises, because the muscle is contracting harder', feedback: 'The spindle is in parallel: it slackens as the muscle shortens.' },
            { text: 'It falls, because the slackened spindle is no longer stretched', feedback: 'Correct. Gamma activation prevents this.' },
            { text: 'It is unchanged, because spindles signal only tension', feedback: 'Spindles signal length; tendon organs signal tension.' },
          ],
          correct: 1,
        },
      ],
    },

    // 25 ----------------------------------------------------------------
    {
      id: 'gto',
      title: 'Golgi tendon organs',
      keyTerms: ['Golgi tendon organ', 'Ib axon', 'in series', 'in parallel'],
      blocks: [
        { type: 'definition', term: 'Golgi tendon organ', body: 'A proprioceptor at the junction of muscle and tendon, in series with the muscle fibres. Contraction tightens its collagen fibrils, which squeeze the endings of a group Ib axon: it signals tension.' },
        figureBlock(
          hotspots('gto', 525 / 1120, 'Muscle, tendon organ and bone, with the collagen and Ib axon enlarged.', GTO_REGIONS, { quiz: false }),
          'A Golgi tendon organ (Figure 13.22, slide 41).',
          'A muscle narrowing into a tendon onto bone, with a small capsule at the junction; below, an enlargement of twisted white collagen fibrils with blue Ib axon branches among them.'
        ),
        figureBlock(
          hotspots('gto-series', 1550 / 784, 'Muscle between two bars with a tendon organ in series and a spindle in parallel.', GTO_SERIES_REGIONS, { quiz: false, layout: 'stack' }),
          'In series against in parallel (Figure 13.23, slide 41).',
          'Two frames of a muscle held between fixed bars. The tendon organ sits between the muscle and the bar; the spindle runs alongside. When the alpha axon is active and the muscle cannot shorten, the Ib axon fires while the Ia axon stays silent.'
        ),
        { type: 'compare', title: 'Two proprioceptors (HW3 3A.1)', columns: ['Muscle spindle', 'Golgi tendon organ'], rows: [
          { label: 'Arrangement', cells: ['In parallel with the fibres', 'In series with the fibres'] },
          { label: 'Signals', cells: ['Length and its change', 'Tension, force'] },
          { label: 'Afferent', cells: ['Group Ia', 'Group Ib'] },
          { label: 'Spinal effect on the same muscle', cells: ['Excites its alpha motor neurons directly', 'Inhibits them, through an interneuron'] },
        ] },
        { type: 'steps', title: 'The tendon organ reflex (pp. 475-476)', steps: [
          'Tension rises and Ib firing increases.',
          'Ib axons excite Ib inhibitory interneurons in the ventral horn.',
          'The interneurons inhibit alpha motor neurons of the same muscle.',
          'Tension is kept in range; in extremes the muscle is protected from overload.',
        ] },
      ],
      conceptQuiz: [
        {
          id: 'gto-1',
          prompt: 'A muscle contracts against an immovable load, so its length does not change. Which afferent fires more?',
          options: [
            { text: 'Ia, from the muscle spindle', feedback: 'Length is unchanged, so the spindle does not report more.' },
            { text: 'Ib, from the Golgi tendon organ', feedback: 'Correct. Tension rises; the tendon organ is in series.' },
            { text: 'Neither, because nothing moves', feedback: 'Force still rises, and the tendon organ reports force.' },
          ],
          correct: 1,
        },
      ],
    },

    // 26 ----------------------------------------------------------------
    {
      id: 'spinal-loop',
      title: 'The spinal control loop',
      keyTerms: ['feedback', 'error signal', 'reference signal'],
      blocks: [
        { type: 'text', body: 'Slide 42 draws the stretch reflex as a negative-feedback loop: a desired state, a sensor, and an effector that corrects deviations.' },
        { type: 'steps', title: 'Around the loop, holding a tray (HW3 3A)', steps: [
          { title: 'Reference signal:', body: 'the desired elbow angle, the muscle length to hold.' },
          { title: 'Error signal:', body: 'reference minus feedback. A weight lands and stretches the flexor: an error appears.' },
          { title: 'Controller and actuator:', body: 'the alpha motor neurons drive the flexor (the muscle) to contract.' },
          { title: 'Sensor:', body: 'the muscle spindles report the new length, by proprioception.' },
          { title: 'Feedback signal:', body: 'the Ia input, after processing in the cord, returns to the comparator with a minus sign.' },
        ] },
        demoBlock('control-loop', {
          mode: 'spinal',
          parts: [
            { key: 'sensor', label: 'Remove the feedback sensor (muscle spindle)', effect: 'Sensor gone: the stretch is never detected, there is no stretch reflex, and the weight pushes the elbow about three times as far open.' },
            { key: 'input', label: 'Remove the proprioceptive input (dorsal root)', effect: 'Input gone: the error never reaches the cord. No reflex and no tone, as when Sherrington cut the dorsal roots. Same trace: any break opens the loop.' },
          ],
          labels: {
            remove: 'Break the loop', plotTitle: 'The tray: how far the elbow is pushed open after the weight lands',
            blocks: {
              desired: 'Desired state', reference: 'Reference signal', error: 'Error signal', controller: 'Controller', actuator: 'Actuator', actuatorSub: '(muscle)',
              environment: 'Environment', proprioception: 'Proprioception', sensor: 'Sensor', sensorSub: '(muscle spindle)', inputProcessing: 'Input processing',
              feedback: 'Feedback signal', filtering: 'Filtering and amplification',
            },
            axisY: 'Elbow opened (°)', axisX: 's', weight: 'Weight lands', intact: 'Intact', current: 'Now',
            peak: 'Largest opening', droop: 'Still open at 2 s', breaks: 'What breaks', unit: '°',
            nothing: 'Nothing removed: the reflex catches the weight within a tenth of a second, but a small droop stays. The spinal loop cannot raise its own reference; the brain does that (part 3).',
          },
        },
        'The spinal feedback loop of slide 42 on the HW3 tray. Tick a box to remove a part; removed blocks are crossed out and the plot compares the arm with the intact loop (muted dashes). Illustrative model, not data.',
        'A block diagram: reference signal into a comparator, error signal to the controller, controller to the actuator (muscle) which acts on the environment, proprioception down to the sensor (muscle spindle), input processing and the feedback signal back to the comparator. Below, a plot of elbow opening after the weight lands.'),
        { type: 'whyItMatters', body: 'The loop holds posture against disturbance without the brain. Most of the time ventral horn activity maintains, rather than changes, muscle length.' },
      ],
      conceptQuiz: [
        {
          id: 'loop-1',
          prompt: 'In the slide 42 diagram, which block is the muscle spindle?',
          options: [
            { text: 'The controller', feedback: 'The controller is the motor neuron side that sets the command.' },
            { text: 'The actuator', feedback: 'The actuator is the muscle that makes force.' },
            { text: 'The sensor', feedback: 'Correct. It turns muscle length into the feedback signal.' },
          ],
          correct: 2,
        },
      ],
    },

    // =================================================================
    // PART 3. BRAIN CONTROL OF MOVEMENT
    // 27 ----------------------------------------------------------------
    {
      id: 'feedforward',
      part: { id: 'part-3', number: 3, title: 'Brain control of movement', intro: 'Chapter 14, slides 43 to 52, with the homework reading of pages 491 to 517. How the brain plans ahead, which levels do what, and the loops through the basal ganglia and the cerebellum.' },
      title: 'Feedforward plus feedback',
      keyTerms: ['feedforward', 'exteroception', 'ballistic'],
      blocks: [
        { type: 'text', body: 'Slide 43 puts a feedforward controller with memory on top of the spinal loop. It reads the world through exteroception (the eye) and sets the reference signal before feedback can say anything.' },
        { type: 'compare', title: 'Two kinds of control (notes 7.1)', columns: ['Uses', 'Good for'], rows: [
          { label: 'Feedback', cells: ['Sensory report of the current state', 'Correcting a disturbance, such as an unexpected load'] },
          { label: 'Feedforward', cells: ['Available information and learned predictions', 'Rapid movements, expected loads'] },
        ] },
        demoBlock('control-loop', {
          mode: 'brain',
          scenarios: [
            { key: 'unexpected', label: 'unexpected (HW3)' },
            { key: 'expected', label: 'expected: you add it yourself' },
          ],
          parts: [
            { key: 'ff', label: 'Remove the feedforward controller', effect: 'No feedforward controller: an expected weight is met like an unexpected one, and nothing raises the command after the reflex, so the droop stays.' },
            { key: 'sensor', label: 'Remove the feedback sensor (muscle spindle)', effect: 'No spindle: no stretch reflex, so the elbow drops far. The brain still corrects, slowly, from joint and tendon receptors.' },
            { key: 'input', label: 'Remove the proprioceptive input (dorsal root)', effect: 'No proprioception: no reflex, and the brain can only correct by watching the tray, late and weakly.' },
            { key: 'extero', label: 'Remove exteroception (close the eyes)', effect: 'Eyes closed: with proprioception intact little changes. Vision matters when proprioception is gone; lose both and nothing corrects the droop.' },
          ],
          labels: {
            remove: 'Remove a part', scenario: 'The weight is', plotTitle: 'The tray: how far the elbow is pushed open after the weight lands',
            blocks: {
              reference: 'Reference signal', error: 'Error signal', controller: 'Controller', actuator: 'Actuator', actuatorSub: '(muscle)',
              environment: 'Environment', proprioception: 'Proprioception', sensor: 'Sensor', sensorSub: '(muscle spindle)', inputProcessing: 'Input processing',
              feedback: 'Feedback signal', ff: 'Feedforward', ffSub: 'controller (with memory)', eye: 'Sensor', eyeSub: '(eye)',
              exteroception: 'Exteroception', filtering: 'Filtering and amplification',
            },
            axisY: 'Elbow opened (°)', axisX: 's', weight: 'Weight lands', intact: 'Intact', current: 'Now',
            peak: 'Largest opening', droop: 'Still open at 2 s', breaks: 'What breaks', unit: '°',
            nothing: 'Nothing removed, unexpected weight: the reflex catches it, then the brain raises the command until the elbow is back where it was.',
            nothingExpected: 'Nothing removed, expected weight: the feedforward controller adds the force as the weight lands, and the elbow barely moves.',
          },
        },
        'Brain control of movement (slide 43) on the tray. Choose whether the weight is expected, then remove parts. The muted dashed line is the intact system in the same situation. Illustrative model, not data.',
        'The spinal loop of the previous section with a feedforward controller at top left feeding the reference signal, and a second chain from the environment through exteroception, a sensor (eye) and input processing into the feedforward controller. Below, a plot of elbow opening.'),
        { type: 'example', title: 'A ballistic throw (pp. 484-485)', body: 'A pitcher\'s throw is too fast to be steered by feedback. Sensory information before it sets the start and the plan; information during it improves the next throw.' },
        { type: 'misconception', wrong: 'Feedforward control works without any sensory information.', right: 'It uses sensory information gathered before the movement and predictions learned from earlier ones; it just does not wait for feedback about this movement.' },
      ],
      conceptQuiz: [
        {
          id: 'ff-1',
          prompt: 'You lift a box you know is heavy, and your arm does not dip. Which part of slide 43 explains that?',
          options: [
            { text: 'The feedforward controller, which sets the force in advance', feedback: 'Correct. It uses memory and what the eyes report.' },
            { text: 'The muscle spindle, which detects the box before it is lifted', feedback: 'A spindle can only report stretch once it happens.' },
            { text: 'The comparator, which removes the error after the arm dips', feedback: 'That is feedback; here the dip never happens.' },
          ],
          correct: 0,
        },
      ],
    },

    // 28 ----------------------------------------------------------------
    {
      id: 'hierarchy',
      title: 'The motor control hierarchy',
      keyTerms: ['strategy', 'tactics', 'execution'],
      blocks: [
        { type: 'compare', title: 'Three levels (slide 44, Table 14.1)', columns: ['Concerned with', 'Structures', 'Tray (HW3 3B.3)'], rows: [
          { label: 'Strategy (high)', cells: ['The goal and the best way to reach it', 'Association areas of neocortex, basal ganglia', 'Decide to hold the tray level'] },
          { label: 'Tactics (middle)', cells: ['Which muscles contract, in what sequence and timing', 'Motor cortex, cerebellum', 'Plan flexor force and its timing'] },
          { label: 'Execution (low)', cells: ['Activating motor neuron and interneuron pools, adjusting posture', 'Brain stem (motor nuclei), spinal cord', 'Fire the flexor motor neurons, reflexes'] },
        ] },
        figureBlock(
          hotspots('hierarchy', 483 / 447, 'Brain with the basal ganglia and cerebellar loops drawn as arrows through the thalamus.', HIERARCHY_REGIONS, { quiz: false }),
          'The basal ganglia and cerebellar loops return to the motor areas through the thalamus (slide 44, Kandel et al. 2013).',
          'A see-through brain: green motor areas on top, blue basal ganglia and thalamus deep in the middle, the orange cerebellum at the back; a blue arrow loops from cortex through the basal ganglia and thalamus, an orange one through the cerebellum and thalamus.'
        ),
        { type: 'example', title: 'The pitcher (Figure 14.1)', body: 'Cortex knows where the body is; options are filtered through the basal ganglia until a pitch is chosen (strategy). Motor cortex and cerebellum set the sequence (tactics). Brain stem and spinal cord fire the motor neurons and keep the pitcher upright (execution).' },
        { type: 'whyItMatters', body: 'The levels are interconnected and every level uses sensory information: the motor system is really a sensorimotor system.' },
      ],
      conceptQuiz: [
        {
          id: 'hier-1',
          prompt: 'Which level of the hierarchy do the motor cortex and the cerebellum belong to?',
          options: [
            { text: 'Strategy', feedback: 'Strategy is association cortex and the basal ganglia.' },
            { text: 'Tactics', feedback: 'Correct. Sequence and timing of contractions.' },
            { text: 'Execution', feedback: 'Execution is the brain stem and the spinal cord.' },
          ],
          correct: 1,
        },
      ],
    },

    // 29 ----------------------------------------------------------------
    {
      id: 'tracts',
      title: 'Descending spinal tracts',
      keyTerms: ['lateral pathways', 'ventromedial pathways', 'corticospinal tract', 'pyramidal decussation'],
      blocks: [
        figureBlock(
          hotspots('tracts-section', 1211 / 777, 'Spinal cord section with the descending tracts shaded.', TRACT_SECTION_REGIONS, { quiz: false }),
          'The descending tracts in the spinal cord (Figure 14.2, slide 45).',
          'A cross section of the cord: two blue lateral patches, the corticospinal and rubrospinal tracts, form the lateral pathways; pink ventral and medial patches, the tectospinal, vestibulospinal and reticulospinal tracts, form the ventromedial pathways.'
        ),
        { type: 'compare', title: 'Two groups (slide 45)', columns: ['Tracts', 'Control', 'Mainly for'], rows: [
          { label: 'Lateral', cells: ['Corticospinal, rubrospinal', 'Direct, from cortex', 'Voluntary movement of distal muscles, the fingers'] },
          { label: 'Ventromedial', cells: ['Vestibulospinal, tectospinal, pontine and medullary reticulospinal', 'Brain stem', 'Posture and locomotion, axial and proximal muscles'] },
        ] },
        figureBlock(
          hotspots('tracts-summary', 1171 / 991, 'Cortex sending the corticospinal tract to the cord, and inputs to brain stem nuclei.', TRACT_SUMMARY_REGIONS, { quiz: false }),
          'Summary of the descending tracts (Figure 14.6, slide 45).',
          'Cerebral cortex at the top; a thick arrow runs straight down to the spinal cord as the corticospinal tract, others go to the red nucleus (lateral) and to the reticular, collicular and vestibular nuclei (ventromedial), which then descend.'
        ),
        { type: 'steps', title: 'The corticospinal tract (p. 486)', steps: [
          'Two thirds of its axons start in areas 4 and 6, the motor cortex.',
          'They pass through the internal capsule and the cerebral peduncle and gather in the medullary pyramid.',
          'At the junction of medulla and spinal cord they cross: the pyramidal decussation.',
          'They descend in the lateral column as the lateral corticospinal tract: left cortex, right body.',
        ] },
        { type: 'example', title: 'A lateral pathway lesion (p. 487)', body: 'Monkeys with corticospinal and rubrospinal lesions could sit and stand normally but could not move the fingers independently; they grasped with all fingers at once.' },
        { type: 'detail', title: 'The ventromedial tracts', body: [
          'Vestibulospinal: from the vestibular nuclei; head stability and upright posture, partly by facilitating leg extensors. Tectospinal: from the superior colliculus; orients head and eyes.',
          'Pontine reticulospinal strengthens antigravity reflexes; medullary reticulospinal frees the antigravity muscles from reflex control. Cortex balances the two (pp. 489-491).',
        ] },
      ],
      conceptQuiz: [
        {
          id: 'tract-1',
          prompt: 'Which tract belongs to the lateral pathways?',
          options: [
            { text: 'Vestibulospinal tract', feedback: 'Ventromedial: posture and head stability.' },
            { text: 'Tectospinal tract', feedback: 'Ventromedial: orienting the head.' },
            { text: 'Corticospinal tract', feedback: 'Correct, with the rubrospinal tract.' },
            { text: 'Pontine reticulospinal tract', feedback: 'Ventromedial: antigravity reflexes.' },
          ],
          correct: 2,
        },
      ],
    },

    // 30 ----------------------------------------------------------------
    {
      id: 'motor-cortex',
      title: 'Motor areas of the cerebral cortex',
      keyTerms: ['primary motor cortex', 'area 4', 'area 6', 'premotor area', 'supplementary motor area'],
      blocks: [
        figureBlock(
          hotspots('motor-map', 957 / 736, 'Motor and sensory homunculi on the precentral and postcentral gyri.', MOTOR_MAP_REGIONS, { quiz: false }),
          'Penfield\'s motor map beside the sensory map (Figure 14.8 and slide 46).',
          'Two cross sections side by side: the red precentral gyrus with a body drawn along it, face and mouth lateral, hand large, legs medial; the blue postcentral gyrus with the matching sensory body.'
        ),
        { type: 'steps', title: 'What Penfield found (slide 46, p. 492)', steps: [
          'He stimulated the cortex of awake patients during epilepsy surgery, to find tissue to spare.',
          'Weak stimulation of area 4, on the precentral gyrus, twitched muscles on the opposite side of the body.',
          'The responses were somatotopic, like the sensory map behind the central sulcus.',
          'Stimulating area 6 evoked more complex movements, of either side.',
        ] },
        figureBlock(
          hotspots('motor-areas', 1173 / 1077, 'Lateral brain with prefrontal, area 6, area 4, S1 and posterior parietal areas.', MOTOR_AREA_REGIONS, { quiz: false }),
          'Areas that plan and direct voluntary movement (Figure 14.7, slide 47).',
          'A lateral brain: green prefrontal cortex in front, blue area 6 with PMA and the medial SMA, red area 4 (M1) on the precentral gyrus, green S1 behind the central sulcus, orange area 5 and purple area 7 in posterior parietal cortex.'
        ),
        { type: 'compare', title: 'The areas (slide 47)', columns: ['Where', 'Role'], rows: [
          { label: 'Area 4, M1', cells: ['Precentral gyrus', 'Execution commands, somatotopic'] },
          { label: 'Area 6, PMA', cells: ['Lateral, in front of M1', 'Preparing movements'] },
          { label: 'Area 6, SMA', cells: ['Medial surface', 'Planning sequences, both hands'] },
          { label: 'Prefrontal cortex', cells: ['Front of the frontal lobe', 'Deciding what to do'] },
          { label: 'Areas 5 and 7', cells: ['Posterior parietal', 'Body position and target location'] },
        ] },
        { type: 'text', body: 'Prefrontal and posterior parietal cortex both converge on area 6: there, decisions about what to do become plans for how to move.' },
        { type: 'detail', title: 'Planning before moving (homework pp. 494-495)', body: [
          'SMA neurons fire about a second before a hand movement. After an SMA lesion, tasks needing both hands, such as buttoning a shirt, are especially hard.',
          'A PMA neuron fired after a cue to move left and kept firing until the go signal, but not for a move to the right: it held the plan. Area 6 stays active when a movement is only rehearsed in the mind.',
        ] },
      ],
      conceptQuiz: [
        {
          id: 'mc-1',
          prompt: 'Penfield weakly stimulated a point on the left precentral gyrus. What did he see?',
          options: [
            { text: 'A twitch of muscles on the right side of the body', feedback: 'Correct. Area 4 commands the opposite side.' },
            { text: 'A tingling feeling on the left side of the body', feedback: 'Sensations come from the postcentral gyrus, and from the opposite side.' },
            { text: 'A complex movement of both arms together', feedback: 'Complex, either-side movements came from area 6.' },
          ],
          correct: 0,
        },
      ],
    },


    // 31 ----------------------------------------------------------------
    {
      id: 'basal-ganglia',
      title: 'The basal ganglia loop',
      keyTerms: ['striatum', 'GPi', 'GPe', 'subthalamic nucleus', 'disinhibition', 'direct pathway', 'indirect pathway', 'SNpc'],
      blocks: [
        { type: 'text', body: 'Cortex sends information through the basal ganglia and the thalamus (VLo) back to cortex, particularly the SMA. One job of this loop is selecting and starting willed movements.' },
        figureBlock(
          hotspots('bg-loop', 934 / 1048, 'Wiring diagram of the direct and indirect pathways with excitatory and inhibitory arrows.', BG_REGIONS, { quiz: false }),
          'Direct and indirect pathways (slide 48, adapted from Figure 14.14). Green excitatory, red inhibitory. The slide drew the striatum to GPe arrow green; the notes and the textbook say it is inhibitory, and it is corrected here.',
          'Boxes for cerebral cortex, striatum, SNpc, GPe, STN, GPi and thalamus. Green arrows: cortex to striatum and to STN, STN to GPi, thalamus back to cortex, SNpc to striatum through D1. Red arrows: striatum to GPi and to GPe, GPe to GPi and to STN, GPi to thalamus, SNpc to striatum through D2.'
        ),
        { type: 'definition', term: 'Disinhibition', body: 'Raising activity by inhibiting an inhibitor. GPi neurons fire all the time and hold the motor thalamus inhibited; quieting them releases the thalamus.' },
        { type: 'steps', title: 'Direct pathway: go', steps: [
          'Cortex excites striatal neurons (putamen, caudate).',
          'They inhibit GPi.',
          'GPi falls quiet, so VLo is released from its tonic inhibition.',
          'VLo excites the SMA: the selected movement is facilitated.',
        ] },
        { type: 'steps', title: 'Indirect pathway: stop the rest', steps: [
          'Cortex excites other striatal neurons, which inhibit GPe.',
          'GPe normally inhibits GPi and the STN, so both are released.',
          'The STN, also excited directly by cortex, drives GPi harder.',
          'GPi inhibits the thalamus more: competing movements are suppressed.',
        ] },
        { type: 'compare', title: 'Dopamine from the SNpc (slide 48)', columns: ['Acts on', 'Effect', 'Net'], rows: [
          { label: 'D1 receptors', cells: ['Direct-pathway striatal neurons', 'Excites them', 'More movement'] },
          { label: 'D2 receptors', cells: ['Indirect-pathway striatal neurons', 'Inhibits them', 'Less suppression, more movement'] },
        ] },
        { type: 'misconception', wrong: 'An inhibitory connection always lowers activity downstream.', right: 'Two inhibitory steps in a row raise it: striatum inhibits GPi, which inhibits the thalamus, so the thalamus is released.' },
        { type: 'detail', title: 'When the balance fails (homework pp. 501-503)', body: [
          'Parkinson\'s disease: dopamine neurons of the substantia nigra degenerate. Direct-pathway drive falls and indirect-pathway drive rises, GPi inhibits the thalamus more, and movement becomes scarce: slow (bradykinesia), hard to start (akinesia), with rigidity and a tremor at rest.',
          'Huntington\'s disease: neurons of the caudate, putamen and globus pallidus are lost. Basal ganglia output falls and movement becomes excessive: chorea, rapid, irregular, involuntary movements.',
        ] },
      ],
      conceptQuiz: [
        {
          id: 'bg-1',
          prompt: 'At rest, what do GPi neurons do to the motor thalamus?',
          options: [
            { text: 'They fire steadily and keep it inhibited', feedback: 'Correct. The direct pathway works by quieting them.' },
            { text: 'They stay silent until a movement starts', feedback: 'GPi neurons fire spontaneously at rest.' },
            { text: 'They fire steadily and keep it excited', feedback: 'GPi output is inhibitory.' },
          ],
          correct: 0,
        },
        {
          id: 'bg-2',
          prompt: 'Through D2 receptors, dopamine:',
          options: [
            { text: 'Excites indirect-pathway neurons, so movement is suppressed', feedback: 'D2 inhibits the indirect pathway.' },
            { text: 'Inhibits indirect-pathway neurons, so movement is favoured', feedback: 'Correct. Like D1 on the direct pathway, it favours movement.' },
            { text: 'Excites direct-pathway neurons, so movement is favoured', feedback: 'That is the D1 action.' },
          ],
          correct: 1,
        },
      ],
    },

    // 32 ----------------------------------------------------------------
    {
      id: 'cerebellum',
      title: 'The cerebellar loop',
      keyTerms: ['cerebellum', 'pontine nuclei', 'VLc', 'ataxia'],
      blocks: [
        figureBlock(
          hotspots('cerebellar-loop', 996 / 1135, 'The motor loop from cortex through the pons and cerebellum to VLc and back.', CB_LOOP_REGIONS, { quiz: false }),
          'The lateral cerebellar loop (Figure 14.22, slide 49). The basal ganglia loop is greyed out.',
          'Cerebral cortex across the top; a blue arrow from sensory and motor cortex down to the pons, on to the cerebellum, back up through VLc to motor cortex; below, the corticospinal tract and the brain stem nuclei descending to the spinal cord.'
        ),
        { type: 'steps', title: 'Around the loop (pp. 514-515)', steps: [
          'Layer V neurons of areas 4 and 6, somatosensory and posterior parietal cortex project massively to the pontine nuclei.',
          'The pontine nuclei feed the lateral cerebellum.',
          'The cerebellum projects through VLc, part of the ventral lateral thalamus.',
          'VLc excites the primary motor cortex, M1.',
        ] },
        { type: 'compare', title: 'Two loops through the thalamus', columns: ['Thalamic relay', 'Returns to', 'Contributes'], rows: [
          { label: 'Basal ganglia', cells: ['VLo', 'SMA', 'Selecting and starting movements'] },
          { label: 'Cerebellum', cells: ['VLc', 'M1', 'Direction, timing and force'] },
        ] },
        { type: 'text', body: 'For fast movements the cerebellum works on predictions learned from past movements. It compares what was intended with what happened, and changes its circuits when they differ: motor learning.' },
        figureBlock(
          hotspots('corticospinal-pools', 1073 / 1048, 'Layer V cortical neurons sending axons to flexor and extensor motor neuron pools.', POOLS_REGIONS, { quiz: false }),
          'How motor cortex drives spinal pools (Figure 14.15, slide 49).',
          'Red pyramidal neurons in motor cortex send axons down the corticospinal tract; each directly excites yellow extensor motor neurons and excites a green inhibitory interneuron that inhibits brown flexor motor neurons.'
        ),
        { type: 'text', body: 'One corticospinal neuron can excite an extensor pool directly and, through inhibitory interneurons, inhibit the antagonist flexor pool: the cortex provides excitation, the spinal interneurons the inhibition.' },
        { type: 'detail', title: 'Ataxia (homework pp. 511-512)', body: 'Cerebellar damage makes movement uncoordinated and inaccurate. Dysmetria: the finger overshoots or falls short of the nose. Decomposition: shoulder, elbow and wrist move one after another. Intention tremor: shaking during a movement toward a target, unlike the resting tremor of Parkinson\'s disease.' },
        { type: 'detail', title: 'Inside the cerebellar cortex', body: 'Signals from the pons reach granule cells, which excite Purkinje cells; Purkinje cells inhibit the deep cerebellar nuclei, whose output goes to the brain stem and, through the thalamus, to motor cortex (p. 513).' },
      ],
      conceptQuiz: [
        {
          id: 'cb-1',
          prompt: 'Through which thalamic relay does the lateral cerebellum reach the motor cortex?',
          options: [
            { text: 'VLo', feedback: 'VLo relays the basal ganglia to the SMA.' },
            { text: 'VP', feedback: 'VP relays touch and pain to S1.' },
            { text: 'VLc', feedback: 'Correct. On to M1.' },
          ],
          correct: 2,
        },
      ],
    },

    // 33 ----------------------------------------------------------------
    {
      id: 'mapping',
      title: 'Mapping the motor cortex',
      keyTerms: ['fMRI', 'MEG', 'navigated TMS', 'motor-evoked potential', 'test-retest reliability'],
      blocks: [
        { type: 'text', body: 'The motor cortex is mapped by brain imaging (fMRI, also MEG) and by brain stimulation (slide 50). Why: for science, and for evaluating a patient before surgery and designing the operation so motor areas are spared.' },
        figureBlock(
          hotspots('fmri-map', 1600 / 1081, 'Four inflated brains coloured by which movement each spot responded to most.', FMRI_REGIONS, { quiz: false, layout: 'stack' }),
          'Somatotopy in human motor cortex by fMRI, four people (Meier et al. 2008, slide 50).',
          'Four grey cortical surfaces with coloured patches for tongue, lips, fingers, wrist, elbow and foot movements, arranged roughly in a strip but with interleaved patches.'
        ),
        { type: 'compare', title: 'What each method measures (slides 50 and 51)', columns: ['Measures', 'Note'], rows: [
          { label: 'fMRI', cells: ['Activity-related changes in blood oxygenation', 'Indirect, haemodynamic; good spatial maps'] },
          { label: 'MEG', cells: ['Magnetic fields made by neuronal currents', 'Follows fast changes fMRI cannot'] },
          { label: 'Navigated TMS', cells: ['Muscle responses (motor-evoked potentials) to magnetic pulses through the scalp', 'Coil tracked on the person\'s MRI; robotic arms can hold it'] },
          { label: 'Direct cortical stimulation', cells: ['Movements or muscle responses to pulses on exposed cortex', 'During surgery, for example a 4 by 4 electrode grid; Penfield\'s method'] },
          { label: 'White matter stimulation', cells: ['Muscle responses to pulses below the cortex', 'Finds descending motor fibres near the surgical site'] },
        ] },
        { type: 'definition', term: 'Test-retest reliability', body: 'How consistently a measurement is reproduced across sessions. Slide 52 compares fMRI and navigated TMS in ten healthy volunteers, three sessions each, using the intraclass correlation coefficient (ICC).' },
        { type: 'text', body: 'Both methods reproduced the centre of a motor map more reliably than its full extent or its borders. A repeatable centre does not guarantee repeatable boundaries (notes 8.2).' },
        { type: 'misconception', wrong: 'A winner-take-all map shows that each spot of cortex controls one body part.', right: 'Each spot is coloured by its strongest response only. Other movements may activate it too, and one M1 neuron can influence several muscles.' },
      ],
      conceptQuiz: [
        {
          id: 'map-1',
          prompt: 'Which method records the magnetic fields produced by neuronal currents?',
          options: [
            { text: 'fMRI', feedback: 'fMRI measures blood oxygenation changes.' },
            { text: 'MEG', feedback: 'Correct. Its strength is timing.' },
            { text: 'Navigated TMS', feedback: 'TMS stimulates with magnetic pulses and records muscle responses.' },
          ],
          correct: 1,
        },
      ],
    },
  ],

  recap: {
    terms: [
      { term: 'Mechanoreceptor', definition: 'Receptor sensitive to physical distortion; unmyelinated terminal with mechanosensitive channels.' },
      { term: 'Receptive field', definition: 'Skin area where stimulation changes one afferent\'s firing. Small: Meissner, Merkel. Large: Pacinian, Ruffini.' },
      { term: 'Adaptation', definition: 'Response declines during a held stimulus. Rapid: Meissner, Pacinian. Slow: Merkel, Ruffini.' },
      { term: 'Submodalities', definition: 'Merkel pressure and edges; Meissner flutter, about $50\\,\\text{Hz}$; Pacinian vibration, $200$ to $300\\,\\text{Hz}$; Ruffini stretch.' },
      { term: 'Pacinian capsule', definition: 'Layers slip during a held press, so it responds at onset and offset; stripped, the response is prolonged.' },
      { term: 'Two-point discrimination', definition: 'Varies 20-fold; best at the fingertip: dense receptors, small fields (Merkel), more cortex.' },
      { term: 'Afferent classes', definition: 'A-alpha I, muscle proprioceptors; A-beta II, touch; A-delta III, pain, temperature; C IV, unmyelinated, pain, temperature, itch.' },
      { term: 'Dorsal root ganglion', definition: 'Cell bodies of primary afferents; axons enter through the dorsal root.' },
      { term: 'Spinal segments', definition: 'C1 to C8, T1 to T12, L1 to L5, S1 to S5. Sensory in through dorsal roots, motor out through ventral roots.' },
      { term: 'Dermatome', definition: 'Skin supplied by the dorsal roots of one segment; neighbours overlap.' },
      { term: 'DCML pathway', definition: 'Touch, vibration, position: dorsal column (same side) to dorsal column nuclei, crosses in the medulla, medial lemniscus, VP thalamus, S1.' },
      { term: 'Trigeminal touch pathway', definition: 'Face: trigeminal nerve (V) at the pons, principal sensory trigeminal nucleus, crosses, medial VP, S1.' },
      { term: 'Spinothalamic pathway', definition: 'Pain, temperature: synapse in the dorsal horn, crosses at once, spinothalamic tract, VP and intralaminar thalamus.' },
      { term: 'Hemisection', definition: 'Below the cut: touch and vibration lost on the same side, pain and temperature on the opposite side.' },
      { term: 'S1', definition: 'Area 3b, postcentral gyrus: dense VP input, thalamic input to layer IV, columns, contralateral.' },
      { term: 'Somatotopy', definition: 'Ordered body map; legs medial, face lateral; not continuous (hand between head and face); size follows density and use.' },
      { term: 'Map plasticity', definition: 'Removed digit: neighbours take over its cortex. Trained digits: their representation expands.' },
      { term: 'Posterior parietal cortex', definition: 'Integrates information and turns it into action; area 5 somatic, area 7 visual input.' },
      { term: 'Nociception and pain', definition: 'Nociception: signalling harm by nociceptors (free endings, C and A-delta, polymodal). Pain: the perception.' },
      { term: 'Hyperalgesia', definition: 'Enhanced pain sensitivity; the inflammatory soup raises nociceptor excitability.' },
      { term: 'Gate theory', definition: 'A-beta excites an inhibitory interneuron that inhibits the dorsal horn projection neuron; C fibres inhibit it.' },
      { term: 'PAG', definition: 'Midbrain; to raphe nuclei (serotonin) to dorsal horn. Stimulation: profound analgesia.' },
      { term: 'Endorphins', definition: 'Endogenous opioids; less glutamate release, postsynaptic hyperpolarization.' },
      { term: 'TRP channels', definition: 'One per thermoreceptor; TRPM8 cool, menthol; TRPV1 above $43\\,^{\\circ}\\text{C}$, capsaicin. Thermoreceptors adapt.' },
      { term: 'Agonist, antagonist', definition: 'Prime mover; opposing muscle. Synergist works with the agonist; fixator steadies its base.' },
      { term: 'Motor unit', definition: 'One alpha motor neuron and all its fibres. Pool: all motor neurons of one muscle.' },
      { term: 'Rate coding', definition: 'Faster firing summates twitches up to a smooth contraction.' },
      { term: 'Size principle', definition: 'Henneman: small, low-threshold units first; slow, then FR, then FF. Spikes are all or none.' },
      { term: 'Inputs to alpha motor neurons', definition: 'Spindle afferents, upper motor neurons, spinal interneurons (largest).' },
      { term: 'Muscle spindle', definition: 'In parallel; Ia; length. Stretch reflex: Ia excites alpha motor neurons of the same muscle, one synapse.' },
      { term: 'Alpha-gamma coactivation', definition: 'Gamma contracts intrafusal ends so the spindle stays taut while the muscle shortens.' },
      { term: 'Golgi tendon organ', definition: 'In series; Ib; tension. Ib inhibitory interneuron inhibits the same muscle.' },
      { term: 'Feedback, feedforward', definition: 'Correct from the sensed state; prepare from predictions and exteroception.' },
      { term: 'Motor hierarchy', definition: 'Strategy: association cortex, basal ganglia. Tactics: motor cortex, cerebellum. Execution: brain stem, spinal cord.' },
      { term: 'Descending tracts', definition: 'Lateral (corticospinal, rubrospinal): distal, voluntary. Ventromedial (vestibulospinal, tectospinal, reticulospinal): posture.' },
      { term: 'Motor cortex', definition: 'Area 4 (M1, precentral, Penfield) and area 6 (PMA lateral, SMA medial); prefrontal and parietal feed area 6.' },
      { term: 'Basal ganglia loop', definition: 'Cortex, striatum, GPi, VLo, SMA. Direct: disinhibits thalamus. Indirect (GPe, STN): suppresses. D1 and D2 both favour movement.' },
      { term: 'Cerebellar loop', definition: 'Cortex, pontine nuclei, lateral cerebellum, VLc, M1: direction, timing, force, learning. Damage: ataxia.' },
      { term: 'Motor mapping', definition: 'fMRI blood oxygenation; MEG magnetic fields; nTMS motor-evoked potentials; direct and white matter stimulation in surgery.' },
    ],
  },

  lectureQuiz: [
    // ---------------------------------------------------------------- easy
    {
      id: 'q01',
      difficulty: 'easy',
      type: 'mc',
      prompt: 'Which Brodmann area is generally defined as the primary somatosensory cortex (S1)?',
      options: [
        { text: 'Area 3b', feedback: 'Correct. Dense VP input, purely somatosensory responses.' },
        { text: 'Area 3a', feedback: 'Area 3a deals mainly with body position.' },
        { text: 'Area 4', feedback: 'Area 4 is the primary motor cortex, in front of the central sulcus.' },
        { text: 'Area 5', feedback: 'Area 5 is posterior parietal cortex.' },
      ],
      correct: 0,
      modelAnswer: [
        'Somatosensory cortex lies on the postcentral gyrus: areas 3a, 3b, 1 and 2 (slide 19).',
        'Area 3b receives dense VP input, responds to somatosensory stimuli, loses sensation when lesioned and evokes sensation when stimulated.',
        'So area 3b is S1. Area 4 is M1, area 5 posterior parietal cortex.',
      ],
    },
    {
      id: 'q02',
      difficulty: 'easy',
      type: 'label',
      prompt: 'Identify the six structures indicated in the figure of a spinal cord segment.',
      hotspots: hotspots('spinal-roots', 566 / 228, 'Cross section of a spinal cord segment with its roots, six numbered markers.', SPINAL_ROOT_REGIONS),
      wordBank: ['Dorsal root', 'Medial lemniscus', 'Gray matter', 'Spinal nerve', 'White matter', 'Spinothalamic tract', 'Ventral root', 'Dorsal root ganglion'],
      points: 1,
      modelAnswer: [
        '1 is the gray matter, the inner butterfly of cell bodies; 2 the white matter of axon tracts around it.',
        '3 is the dorsal root, carrying sensory axons in; 4 the dorsal root ganglion with their cell bodies.',
        '5 is the ventral root, carrying motor axons out; 6 the spinal nerve, where both roots join.',
        'The medial lemniscus is in the brain stem and the spinothalamic tract is a tract within the white matter, not a labelled part here.',
      ],
    },
    {
      id: 'q03',
      difficulty: 'easy',
      type: 'fillBlank',
      prompt: 'Fill in the blanks.',
      text: 'The area of skin supplied by the left and right dorsal roots of one spinal segment is called a ___. Sensory axons enter the spinal cord through the ___ roots, and lower motor neuron axons leave through the ___ roots.',
      blanks: [
        { accept: ['dermatome', 'dermatomes'] },
        { accept: ['dorsal', 'posterior', 'dorsal root', 'dorsal roots'] },
        { accept: ['ventral', 'anterior', 'ventral root', 'ventral roots'] },
      ],
      points: 1,
      modelAnswer: [
        'The skin of one segment\'s dorsal roots is its dermatome (slide 16).',
        'Afferents enter through the dorsal roots, with their cell bodies in the dorsal root ganglia (slide 13).',
        'Lower motor neuron axons leave through the ventral roots; the two roots join in a mixed spinal nerve (slide 39, HW3 3A.3).',
      ],
    },
    {
      id: 'q04',
      difficulty: 'easy',
      type: 'groupItems',
      prompt: 'Sort the structures into the level of the motor control hierarchy they belong to.',
      groups: [{ label: 'Strategy' }, { label: 'Tactics' }, { label: 'Execution' }],
      items: [
        { text: 'Motor cortex', group: 'Tactics' },
        { text: 'Spinal cord', group: 'Execution' },
        { text: 'Basal ganglia', group: 'Strategy' },
        { text: 'Cerebellum', group: 'Tactics' },
        { text: 'Association areas of neocortex', group: 'Strategy' },
        { text: 'Brain stem motor nuclei', group: 'Execution' },
      ],
      modelAnswer: [
        'Strategy, the goal and the plan: association areas of neocortex and the basal ganglia.',
        'Tactics, the sequence and timing of contractions: motor cortex and cerebellum.',
        'Execution, activating the motor neuron pools and adjusting posture: brain stem motor nuclei and spinal cord (slide 44, Table 14.1).',
      ],
    },

    // -------------------------------------------------------------- medium
    {
      id: 'q05',
      difficulty: 'medium',
      type: 'matchPairs',
      prompt: 'Match each skin receptor to its adaptation and the stimulus it signals best. One description is left over.',
      rightTitle: 'Adaptation and submodality',
      leftTitle: 'Receptors',
      right: [
        { id: 'pacinian', text: 'Rapidly adapting; high-frequency vibration, best at $200$ to $300\\,\\text{Hz}$' },
        { id: 'ruffini', text: 'Slowly adapting; stretch of the skin' },
        { id: 'heat', text: 'Rapidly adapting; painful heat above $43\\,^{\\circ}\\text{C}$' },
        { id: 'merkel', text: 'Slowly adapting; sustained pressure and fine detail such as edges' },
        { id: 'meissner', text: 'Rapidly adapting; skin motion and flutter, best near $50\\,\\text{Hz}$' },
      ],
      left: [
        { text: 'Merkel\'s disk', answer: 'merkel', explanation: 'Small field in the epidermis; keeps firing while contact lasts.' },
        { text: 'Meissner\'s corpuscle', answer: 'meissner', explanation: 'Small field in the dermal ridges; reports change and low-frequency vibration.' },
        { text: 'Pacinian corpuscle', answer: 'pacinian', explanation: 'Large field deep in the dermis; the capsule passes only change.' },
        { text: 'Ruffini\'s ending', answer: 'ruffini', explanation: 'Large field deep in the dermis; sustained response to stretch.' },
      ],
      modelAnswer: [
        'Slowly adapting receptors are Merkel (small field: pressure, edges) and Ruffini (large field: stretch).',
        'Rapidly adapting receptors are Meissner (small field: flutter, about $50\\,\\text{Hz}$) and Pacinian (large field: vibration, $200$ to $300\\,\\text{Hz}$).',
        'Painful heat is signalled by nociceptors, free nerve endings with TRPV1, not by an encapsulated mechanoreceptor: the spare.',
      ],
    },
    {
      id: 'q06',
      difficulty: 'medium',
      type: 'classify',
      prompt: 'For each ascending pathway, give where it crosses the midline, what it mainly carries, and where it ends in cortex.',
      categories: [
        'Medulla',
        'Spinal cord, at the level of entry',
        'Pons',
        'Touch, vibration and position sense',
        'Pain and temperature',
        'Touch from the face',
        'S1, through the VP thalamus',
        'S1 and wider cortex, through VP and intralaminar thalamus',
      ],
      categoriesTitle: 'Choices',
      rowHeader: 'Pathway',
      columns: ['Crosses in', 'Carries mainly', 'Ends in'],
      items: [
        { text: 'Dorsal column-medial lemniscal', answers: ['Medulla', 'Touch, vibration and position sense', 'S1, through the VP thalamus'], explanation: 'Up the same-side dorsal column, crosses after the dorsal column nuclei.' },
        { text: 'Spinothalamic', answers: ['Spinal cord, at the level of entry', 'Pain and temperature', 'S1 and wider cortex, through VP and intralaminar thalamus'], explanation: 'Crosses at once after the dorsal horn synapse; the intralaminar relay spreads widely.' },
        { text: 'Trigeminal touch', answers: ['Pons', 'Touch from the face', 'S1, through the VP thalamus'], explanation: 'Enters at the pons, synapses in the principal sensory nucleus, crosses, medial VP.' },
      ],
      points: 1,
      modelAnswer: [
        'Dorsal column-medial lemniscal: touch, vibration and position; first synapse in the dorsal column nuclei, crossing in the medulla, then medial lemniscus, VP thalamus, S1 (slide 17).',
        'Spinothalamic: pain and temperature; synapse in the dorsal horn, crossing at once in the spinal cord, then VP and intralaminar thalamus, S1 and other cortical areas (slide 27).',
        'Trigeminal touch: facial touch through cranial nerve V at the pons; principal sensory trigeminal nucleus, crossing in the brain stem, medial VP, face area of S1 (slide 18).',
      ],
    },
    {
      id: 'q07',
      difficulty: 'medium',
      type: 'inlineChoice',
      prompt: 'Circle the right answer.',
      sentences: [
        {
          text: 'Touch from the right index finger enters the spinal cord through a ___ root, ascends in the ___ dorsal column, crosses the midline in the ___ and reaches S1 in the ___ hemisphere.',
          choices: [
            { options: ['dorsal', 'ventral'], answer: 0 },
            { options: ['left', 'right'], answer: 1 },
            { options: ['medulla', 'spinal cord', 'thalamus'], answer: 0 },
            { options: ['right', 'left'], answer: 1 },
          ],
          explanation: 'Same side in the cord; the second-order axons cross after the dorsal column nuclei.',
        },
        {
          text: 'A muscle spindle lies ___ with the extrafusal fibres and mainly signals muscle ___.',
          choices: [
            { options: ['in series', 'in parallel'], answer: 1 },
            { options: ['length', 'tension'], answer: 0 },
          ],
          explanation: 'Alongside the fibres, so it is stretched when the muscle lengthens.',
        },
        {
          text: 'A Golgi tendon organ lies ___ with the muscle fibres, signals ___, and its Ib afferent excites an ___ interneuron.',
          choices: [
            { options: ['in series', 'in parallel'], answer: 0 },
            { options: ['length', 'tension', 'temperature'], answer: 1 },
            { options: ['excitatory', 'inhibitory'], answer: 1 },
          ],
          explanation: 'Between the fibres and the tendon; the Ib interneuron inhibits the same muscle.',
        },
        {
          text: 'Touch from the right cheek reaches the brain stem through the ___ nerve rather than a spinal root.',
          choices: [
            { options: ['vestibular', 'trigeminal', 'spinal accessory'], answer: 1 },
          ],
          explanation: 'Cranial nerve V, entering at the pons (HW3 2A.2).',
        },
      ],
      modelAnswer: [
        'Touch afferents enter through the dorsal root and ascend in the ipsilateral (right) dorsal column; the pathway crosses in the medulla, so left S1 receives the right finger (HW3 2A.1).',
        'The spindle is in parallel and signals length; the tendon organ is in series and signals tension (HW3 3A.1).',
        'The tendon organ\'s Ib axon excites an inhibitory interneuron, which inhibits the alpha motor neurons of the same muscle.',
        'Facial touch travels in the trigeminal nerve (V) to the pons, not in a spinal root.',
      ],
    },
    {
      id: 'q08',
      difficulty: 'medium',
      type: 'trueFalse',
      prompt: 'Determine whether each statement is true or false. Correct every false statement in one line.',
      statements: [
        { text: 'Rubbing the skin around a bruise can reduce pain, because A-beta input excites an inhibitory interneuron in the dorsal horn.', answer: true, justification: 'Gate theory: the interneuron inhibits the projection neuron.' },
        { text: 'Electrical stimulation of the periaqueductal gray causes intense pain, because the PAG excites nociceptive neurons in the dorsal horn.', answer: false, correction: 'PAG stimulation causes profound analgesia: through the raphe nuclei it depresses nociceptive dorsal horn neurons.' },
        { text: 'After weeks of training with the same two fingertips, their representation in S1 expands.', answer: true, justification: 'Map plasticity with increased use (slide 23).' },
        { text: 'The size of a body part\'s representation in S1 is set by the physical size of that body part.', answer: false, correction: 'It follows receptor density and use: lips and fingers get far more cortex than the larger trunk.' },
      ],
      points: 1,
      modelAnswer: [
        'a) True. A-beta fibres excite the inhibitory interneuron that gates the projection neuron.',
        'b) False. The PAG drives the raphe nuclei, which suppress nociceptive transmission in the dorsal horn: analgesia.',
        'c) True. Trained digits expand their territory, as in the monkey experiments of slide 23.',
        'd) False. Representation size reflects the density and importance of the input, not body size (HW3 2B.3).',
      ],
    },
    {
      id: 'q09',
      difficulty: 'medium',
      type: 'multiSelect',
      prompt: 'A probe presses into the skin, stays still for several seconds, and is then removed. Which statements are correct?',
      options: [
        { text: 'An intact Pacinian afferent fires at the onset of the indentation and again when the probe is removed.', correct: true, feedback: 'Onset and offset responses: the capsule passes change.' },
        { text: 'An intact Pacinian afferent keeps firing steadily for as long as the probe is held in place.', correct: false, feedback: 'The capsule layers slip and the terminal is no longer deformed: it falls silent.' },
        { text: 'A Merkel afferent keeps firing during the held indentation, because it adapts only slowly.', correct: true, feedback: 'Slowly adapting: sustained firing while contact lasts.' },
        { text: 'Stripping the capsule leaves the Pacinian ending unable to respond to any indentation.', correct: false, feedback: 'The bare ending still responds, with a much more prolonged response.' },
      ],
      modelAnswer: [
        'The intact Pacinian corpuscle responds to change: a burst at the press and another at the release, silence in between (slide 11).',
        'The Merkel afferent is slowly adapting and keeps firing throughout the hold.',
        'So Pacinian silence during the hold does not mean the probe has gone; only the offset burst marks removal (HW3 2B.2).',
        'Without its capsule the ending still transduces, but adapts slowly: the capsule makes it rapidly adapting.',
      ],
    },
    {
      id: 'q10',
      difficulty: 'medium',
      type: 'order',
      prompt: 'An unexpected weight lands on a tray held with the elbow flexed. Put the steps of the shortest stretch reflex pathway in order.',
      items: [
        'The added weight stretches the elbow flexor and its muscle spindles',
        'Mechanosensitive channels in the spindle endings open and the Ia afferents fire faster',
        'Ia axons enter through the dorsal root and excite alpha motor neurons of the same muscle',
        'The alpha motor neurons fire faster and their axons leave through the ventral root',
        'Extrafusal fibres of the flexor contract and pull the elbow back',
      ],
      correctOrder: [0, 1, 2, 3, 4],
      points: 1,
      modelAnswer: [
        'Stretch of the muscle stretches the spindles, which lie in parallel with the extrafusal fibres.',
        'The Ia endings depolarize as mechanosensitive channels open, and Ia firing rises.',
        'In the spinal cord each Ia axon makes an excitatory synapse directly on alpha motor neurons of the same muscle: one synapse, monosynaptic.',
        'The alpha motor neurons fire faster and the flexor contracts, opposing the stretch (HW3 3A.2).',
      ],
    },
    {
      id: 'q11',
      difficulty: 'medium',
      type: 'clinicalCase',
      scenario: 'A stab wound cuts the left half of the spinal cord at the level of T10. Sensation is tested below the lesion on both sides of the body.',
      prompt: 'Which pattern of sensory loss do you expect below the lesion?',
      options: [
        { text: 'Touch and vibration lost on the left; pain and temperature lost on the right', feedback: 'Correct. Touch has not yet crossed; pain crossed at entry.' },
        { text: 'Touch and vibration lost on the right; pain and temperature lost on the left', feedback: 'That swaps the two pathways\' crossings.' },
        { text: 'Touch, vibration, pain and temperature all lost on the left only', feedback: 'Pain from the left crossed to the right below the cut and survives.' },
        { text: 'Pain and temperature lost on both sides; touch and vibration spared', feedback: 'Only one half of the cord is cut, and it carries touch from the left.' },
      ],
      correct: 0,
      modelAnswer: [
        'Key finding: one half of the cord is cut, on the left.',
        'Touch and vibration ascend in the dorsal column on the same side and cross only in the medulla, above the lesion: the left dorsal column carries the left body.',
        'Pain and temperature cross in the cord at the level of entry and ascend on the opposite side: the left spinothalamic tract carries the right body.',
        'So below T10: touch and vibration lost on the left, pain and temperature lost on the right (slide 27, Figure 12.31).',
      ],
    },
    {
      id: 'q12',
      difficulty: 'medium',
      type: 'classify',
      prompt: 'Each patient has damage to one structure. Classify each finding as most likely due to the Basal ganglia / Cerebellum / Lateral corticospinal tract / Ventromedial pathways.',
      categories: ['Basal ganglia', 'Cerebellum', 'Lateral corticospinal tract', 'Ventromedial pathways'],
      items: [
        { text: 'Cannot move the fingers independently and grasps with all fingers at once, yet sits and stands with normal posture.', answer: 'Lateral corticospinal tract', explanation: 'Lateral pathways control fractionated distal movement (p. 487).' },
        { text: 'In the finger-to-nose test the finger overshoots, and shoulder, elbow and wrist move one after another.', answer: 'Cerebellum', explanation: 'Dysmetria and decomposition: ataxia.' },
        { text: 'Moves little and slowly, has great difficulty starting a movement, and the hand trembles at rest.', answer: 'Basal ganglia', explanation: 'Hypokinesia, as in Parkinson\'s disease.' },
        { text: 'Struggles to keep the head steady and the body upright, while finger movements stay precise.', answer: 'Ventromedial pathways', explanation: 'Vestibulospinal and reticulospinal tracts maintain posture.' },
        { text: 'A tremor appears only during a reach toward a target, and errors grow as each one is corrected.', answer: 'Cerebellum', explanation: 'Intention tremor, part of ataxia.' },
        { text: 'Rapid, irregular, involuntary flicking movements of the limbs and face.', answer: 'Basal ganglia', explanation: 'Chorea, as in Huntington\'s disease.' },
      ],
      points: 1,
      modelAnswer: [
        'The lateral corticospinal tract serves voluntary, independent movement of distal muscles; posture is spared after its loss.',
        'The ventromedial pathways (vestibulospinal, reticulospinal) serve posture and head stability.',
        'The cerebellum coordinates direction, timing and force: its loss gives dysmetria, decomposition and intention tremor.',
        'The basal ganglia loop selects and starts movements: too little output from the direct pathway gives scarce, slow movement with rest tremor; loss of its neurons in Huntington\'s disease gives chorea.',
      ],
    },

    // ---------------------------------------------------------------- hard
    {
      id: 'q13',
      difficulty: 'hard',
      type: 'interpret',
      prompt: 'The figure shows single twitches (a) and force during repeated $40\\,\\text{Hz}$ stimulation (b) for three types of motor unit. A student holds a light tray for minutes, then must briefly lift far more. Which reading of the figure fits the size principle?',
      figure: {
        type: 'widget',
        name: 'image-hotspots',
        props: hotspots('mu-types', 963 / 945, 'Twitch force over 300 ms for three motor unit types, and force over minutes of repeated stimulation.', [], { quiz: false }),
        fallbackAlt: 'Left: three twitches, a tall fast red one (fast fatigable), a medium blue one (fast fatigue-resistant) and a small green one (slow). Right: under repeated stimulation the red unit\'s force collapses within a minute, the blue declines over many minutes, the green stays flat for an hour.',
      },
      options: [
        { text: 'Slow units carry the long, light hold: small twitches but no fatigue; fast fatigable units join last for the brief, strong lift.', feedback: 'Correct. Smallest and most enduring first, largest and most tiring last.' },
        { text: 'Fast fatigable units carry the long, light hold because their twitch is largest; slow units join last for the strong lift.', feedback: 'The largest units are recruited last, and they fatigue within a minute.' },
        { text: 'All three types are recruited together at every force, and the brain grades force only by changing their firing rate.', feedback: 'Recruitment is ordered by size; rate coding is added on top.' },
        { text: 'Fast fatigue-resistant units carry the long hold because their force stays flat through an hour of repeated stimulation.', feedback: 'In panel (b) only the slow unit stays flat; the FR unit declines.' },
      ],
      correct: 0,
      modelAnswer: [
        'Panel (a): the slow unit\'s twitch is small, the fast fatigable unit\'s largest.',
        'Panel (b): the slow unit keeps its force for an hour, the fast fatigue-resistant one declines slowly, the fast fatigable one collapses within a minute.',
        'The size principle recruits small, low-threshold units first: the slow units, which never tire, carry a long, light hold.',
        'Larger units are added as more force is needed; the fast fatigable units come in last, for brief maximal efforts such as the sudden lift.',
      ],
    },
    {
      id: 'q14',
      difficulty: 'hard',
      type: 'multiSelect',
      prompt: 'After the weight lands, the student raises flexor force and lifts the tray back up, shortening the flexor. Which statements are correct?',
      options: [
        { text: 'Force rises partly because larger, higher-threshold motor units are recruited after the small ones.', correct: true, feedback: 'Recruitment by size.' },
        { text: 'Force rises partly because each active motor neuron fires faster, so its twitches summate.', correct: true, feedback: 'Rate coding.' },
        { text: 'Force rises partly because each motor neuron action potential grows larger in amplitude.', correct: false, feedback: 'Action potentials are all or none: their size does not grade force.' },
        { text: 'Gamma motor neurons fire with the alpha ones, keeping the spindles taut while the flexor shortens.', correct: true, feedback: 'Alpha-gamma coactivation keeps the spindles on the air.' },
      ],
      modelAnswer: [
        'Force is graded in two ways: recruitment of more units, small to large (size principle), and faster firing of active units, so twitches summate (HW3 3B.1).',
        'Bigger action potentials are not one of them: spikes are all or none.',
        'As the flexor shortens, alpha activity alone would let the spindles go slack and silence the Ia afferents.',
        'Gamma motor neurons, activated together with the alpha ones, contract the intrafusal ends and keep the spindles reporting length (HW3 3B.2).',
      ],
    },
    {
      id: 'q15',
      difficulty: 'hard',
      type: 'clinicalCase',
      scenario: 'A 66-year-old moves slowly, has great difficulty starting to walk, and has a tremor of the hand at rest. Imaging shows loss of dopamine neurons in the substantia nigra pars compacta.',
      prompt: 'Using the loop of slide 48, which chain explains the poverty of movement?',
      options: [
        { text: 'Less D1 excitation weakens the direct pathway and less D2 inhibition strengthens the indirect one, so GPi inhibits the thalamus more and SMA gets less drive.', feedback: 'Correct. Both changes raise GPi output: hypokinesia.' },
        { text: 'Less D1 excitation weakens the direct pathway and less D2 inhibition weakens the indirect one, so GPi inhibits the thalamus less and SMA gets more drive.', feedback: 'Losing D2 inhibition releases the indirect pathway; it does not weaken it.' },
        { text: 'Loss of dopamine removes the cerebellar input to VLc, so the motor cortex loses its timing signal and every movement overshoots its target.', feedback: 'That describes cerebellar ataxia, a different loop and a different relay.' },
        { text: 'Loss of dopamine silences the layer V corticospinal neurons directly, so the spinal motor neurons receive no descending command at all.', feedback: 'Dopamine here acts on the striatum; the corticospinal neurons are intact.' },
      ],
      correct: 0,
      modelAnswer: [
        'Key finding: scarce, slow movement after loss of nigral dopamine.',
        'Normally dopamine excites direct-pathway striatal neurons through D1 and inhibits indirect-pathway neurons through D2; both favour movement.',
        'Without it the direct pathway inhibits GPi less, and the released indirect pathway (GPe inhibited more, STN freed) drives GPi harder.',
        'GPi, which tonically inhibits VLo, inhibits it even more; the SMA gets too little drive, and willed movements are hard to start and slow: Parkinson\'s disease.',
      ],
    },
    {
      id: 'q16',
      difficulty: 'hard',
      type: 'trueFalse',
      prompt: 'Determine whether each statement is true or false. Correct every false statement in one line.',
      statements: [
        { text: 'fMRI maps the motor cortex through activity-related changes in blood oxygenation, so it measures neuronal activity only indirectly.', answer: true, justification: 'BOLD reflects haemodynamic changes that follow activity.' },
        { text: 'Navigated TMS maps the motor cortex by recording the BOLD signal while the person moves each finger in turn.', answer: false, correction: 'Navigated TMS stimulates cortex through the scalp and records motor-evoked potentials in the muscles.' },
        { text: 'A lesion of the right medial lemniscus in the brain stem, above the medullary crossing, removes vibration sense from the right side of the body.', answer: false, correction: 'Above the crossing the right medial lemniscus carries the left body, so vibration is lost on the left.' },
        { text: 'Cutting a single dorsal root does not abolish sensation in its dermatome, because neighbouring roots supply overlapping skin.', answer: true, justification: 'Three adjacent roots must be cut to lose a dermatome entirely.' },
      ],
      points: 1,
      modelAnswer: [
        'a) True. fMRI detects blood oxygenation changes, an indirect measure of population activity.',
        'b) False. nTMS is stimulation, not imaging: magnetic pulses induce currents in cortex and the muscle responses (MEPs) are recorded; navigation tracks the coil on the MRI.',
        'c) False. Touch and vibration cross in the medulla, so above it each medial lemniscus carries the opposite side of the body: a right lesion costs the left side.',
        'd) True. Dermatomes overlap, so one cut root leaves residual sensation.',
      ],
    },
  ],
};
