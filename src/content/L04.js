// Lecture 4: the eye and the central visual system.
// Scope: docs/scope/L04.md, rebuilt against the TA notes
// (source/notes/lecture_4_english.pdf). Every section traces to a slide
// figure or its caption; depth comes from the textbook pages the notes
// cite, listed in the scope file. Figures are slide crops in
// src/assets/figures/L04 (sources in CREDITS.md) shown through the
// image-hotspots widget, two d3 figures (figures/vision.js) and three d3
// demos (center-surround explorer, hemifield tracer, simple-cell builder).

import { rodConeFigure, hierarchyFigure } from './figures/vision.js';

const fig = (name) => new URL(`../assets/figures/L04/${name}.webp`, import.meta.url).href;

function hotspots(name, aspect, alt, regions, extra = {}) {
  return { src: fig(name), alt, aspect, regions, ...extra };
}

function figureBlock(props, caption, fallbackAlt) {
  return { type: 'figure', visual: { type: 'widget', name: 'image-hotspots', props, caption, fallbackAlt } };
}

function demoBlock(name, props, caption, fallbackAlt) {
  return { type: 'figure', visual: { type: 'widget', name, props, caption, fallbackAlt } };
}

function chart(figure, alt, extra = {}) {
  return { svg: figure.svg, alt, aspect: figure.aspect, regions: figure.regions, quiz: false, layout: 'stack', ...extra };
}

const ROD_CONE = rodConeFigure();
const HIERARCHY = hierarchyFigure();

// ---------------------------------------------------------------------
// Region sets. Coordinates are percentages of each image.

const GROSS_REGIONS = [
  { id: 'pupil', label: 'Pupil', body: 'The opening that lets light into the eye. It looks black because the pigments at the back of the eye absorb the light.', x: 50, y: 20.5, w: 6, h: 5, side: 'right' },
  { id: 'iris', label: 'Iris', body: 'The coloured ring round the pupil. Two muscles in it make the pupil smaller or larger.', x: 57, y: 23, w: 8, h: 8, mx: 57, my: 24, side: 'right' },
  { id: 'sclera', label: 'Sclera', body: 'The white of the eye: the tough outer wall of the eyeball, continuous with the cornea at the front.', x: 66, y: 22, w: 6, h: 6, side: 'right' },
  { id: 'conjunctiva', label: 'Conjunctiva', body: 'A membrane that folds back from the inside of the eyelids and attaches to the sclera.', x: 30, y: 57, w: 6, h: 6, side: 'left' },
  { id: 'cornea', label: 'Cornea', body: 'The glassy transparent front surface over the pupil and iris. It does most of the focusing.', x: 21, y: 76, w: 5, h: 10, side: 'left' },
  { id: 'muscles', label: 'Extraocular muscles', body: 'Three pairs of muscles inserted into the sclera. They rotate the eye in its orbit.', x: 55, y: 74, w: 18, h: 8, side: 'right' },
  { id: 'nerve', label: 'Optic nerve', body: 'Carries the ganglion cell axons from the back of the eye to the base of the brain.', x: 82, y: 74, w: 12, h: 6, side: 'right' },
];

const SECTION_REGIONS = [
  { id: 'cornea', label: 'Cornea', body: 'Light passes from air into the watery cornea here, so this surface bends light the most: most of the refractive power of the eye.', x: 21, y: 48, w: 4, h: 20, side: 'left' },
  { id: 'iris', label: 'Iris', body: 'Sets the size of the pupil and so the amount of light allowed in.', x: 27.5, y: 36, w: 3, h: 12, side: 'left' },
  { id: 'lens', label: 'Lens', body: 'Transparent and elastic. Its shape changes to adjust the focus for near and far objects (accommodation).', x: 38, y: 44, w: 8, h: 24, side: 'left' },
  { id: 'ciliary', label: 'Ciliary muscle', body: 'A ring of muscle holding the lens by the zonule fibers. Contracting it lets the lens round up for near vision.', x: 33, y: 63, w: 5, h: 6, side: 'left' },
  { id: 'retina', label: 'Retina', body: 'The light-sensitive sheet of neurons that wraps round the inside of the back of the eye.', x: 62, y: 10.5, w: 8, h: 4, side: 'right' },
  { id: 'fovea', label: 'Fovea', body: 'A small pit at the centre of the retina, where the arrow of light lands. Highest acuity.', x: 78.5, y: 43, w: 3, h: 6, side: 'right' },
  { id: 'nerve', label: 'Optic nerve', body: 'Ganglion cell axons leave the eye here, at the optic disk, which has no photoreceptors.', x: 90, y: 55, w: 14, h: 8, side: 'right' },
];

const LAYER_REGIONS = [
  { id: 'gcl', label: 'Ganglion cell layer', body: 'Innermost layer, first in the path of light. Holds the ganglion cell bodies; their axons run along the surface to the optic disk.', shape: 'rect', x: 50, y: 17, w: 100, h: 24, mx: 95, my: 17, side: 'right' },
  { id: 'ipl', label: 'Inner plexiform layer', body: 'Synapses between bipolar cells, amacrine cells and ganglion cells.', shape: 'rect', x: 50, y: 32, w: 100, h: 6, mx: 95, my: 32, side: 'right' },
  { id: 'inl', label: 'Inner nuclear layer', body: 'Cell bodies of the bipolar, horizontal and amacrine cells.', shape: 'rect', x: 50, y: 44, w: 100, h: 16, mx: 95, my: 44, side: 'right' },
  { id: 'opl', label: 'Outer plexiform layer', body: 'Synapses of the photoreceptors onto bipolar and horizontal cells.', shape: 'rect', x: 50, y: 55, w: 100, h: 4, mx: 95, my: 55, side: 'right' },
  { id: 'onl', label: 'Outer nuclear layer', body: 'Cell bodies of the rods and cones.', shape: 'rect', x: 50, y: 69, w: 100, h: 22, mx: 95, my: 69, side: 'right' },
  { id: 'os', label: 'Layer of photoreceptor outer segments', body: 'The light-sensitive part of the rods and cones, stacked with photopigment disks. Last layer light reaches.', shape: 'rect', x: 50, y: 88, w: 100, h: 14, mx: 95, my: 88, side: 'right' },
  { id: 'pe', label: 'Pigmented epithelium', body: 'Below the outer segments. Maintains the photoreceptors and absorbs stray light so the image is not blurred.', shape: 'rect', x: 50, y: 98, w: 100, h: 4, mx: 95, my: 98, side: 'right' },
];

const FOVEA_REGIONS = [
  { id: 'pit', label: 'Foveal pit', body: 'The retina is thinnest here. Light reaches the photoreceptors without passing through the other layers.', x: 46, y: 26, w: 16, h: 18, side: 'right' },
  { id: 'gcl', label: 'Ganglion cell layer (displaced)', body: 'Pushed aside to the rim of the pit, so it does not scatter light over the foveal cones.', x: 10, y: 34, w: 14, h: 8, side: 'left' },
  { id: 'inl', label: 'Inner nuclear layer (displaced)', body: 'Also moved laterally away from the centre of the fovea.', x: 8, y: 50, w: 12, h: 8, side: 'left' },
  { id: 'onl', label: 'Outer nuclear layer', body: 'Photoreceptor cell bodies, continuous under the pit.', x: 94, y: 66, w: 6, h: 10, side: 'right' },
  { id: 'cones', label: 'Cones', body: 'The central fovea holds cones only, densely packed.', x: 47, y: 85, w: 10, h: 10, side: 'left' },
  { id: 'rods', label: 'Rods', body: 'Appear away from the centre of the fovea and dominate further out.', x: 88, y: 88, w: 6, h: 8, side: 'right' },
];

const CIRCUIT_REGIONS = [
  { id: 'photo', label: 'Photoreceptors', body: 'Rods and cones: the only light-sensitive cells (rule 1). They hyperpolarize in light and release less glutamate.', x: 43, y: 83, w: 8, h: 18, side: 'left' },
  { id: 'horizontal', label: 'Horizontal cell', body: 'Takes input from photoreceptors and spreads laterally in the outer plexiform layer to neighbouring bipolar cells and photoreceptors.', x: 65, y: 48, w: 8, h: 7, side: 'right' },
  { id: 'bipolar', label: 'Bipolar cell', body: 'The direct path: photoreceptor to bipolar cell to ganglion cell. Graded potentials, no spikes.', x: 43, y: 43, w: 8, h: 7, side: 'left' },
  { id: 'amacrine', label: 'Amacrine cell', body: 'Takes input from bipolar cells and spreads laterally in the inner plexiform layer to ganglion, bipolar and other amacrine cells.', x: 65, y: 36, w: 8, h: 7, side: 'right' },
  { id: 'ganglion', label: 'Ganglion cell', body: 'The only output cell (rule 2) and the only retinal neuron that fires action potentials (rule 3).', x: 43, y: 24, w: 8, h: 7, side: 'left' },
  { id: 'axons', label: 'Ganglion cell axons', body: 'Leave the eye as the optic nerve and project to the forebrain.', x: 32, y: 14, w: 10, h: 4, side: 'left' },
];

const SPOT_REGIONS = [
  { id: 'center', label: 'Receptive field center', body: 'The inner circle. For an OFF-center cell, dark here raises the firing rate.', x: 25.7, y: 28, w: 8, h: 14, side: 'top' },
  { id: 'surround', label: 'Receptive field surround', body: 'The ring round the center. Its effect is always opposite to that of the center.', x: 18.5, y: 28, w: 4, h: 10, side: 'top' },
  { id: 'spot', label: 'Dark spot on the center only', body: 'Panel (b): the whole center is dark and the surround is still light.', x: 56, y: 29, w: 8, h: 12, side: 'top' },
  { id: 'big', label: 'Dark spot over center and surround', body: 'Panel (c): the spot is enlarged to cover the surround too.', x: 86, y: 22, w: 10, h: 12, side: 'top' },
  { id: 'base', label: 'Maintained firing', body: 'Output (a): uniform light, a few spikes. Ganglion cells fire all the time.', x: 25.7, y: 88, w: 16, h: 10, mx: 35, my: 88, side: 'inline', dir: 'right' },
  { id: 'barrage', label: 'Barrage of action potentials', body: 'Output (b): darkness in the center with light in the surround gives the strongest response.', x: 55, y: 88, w: 18, h: 10, mx: 64, my: 88, side: 'inline', dir: 'right' },
  { id: 'reduced', label: 'Response greatly reduced', body: 'Output (c): the dark surround cancels most of the center response.', x: 85, y: 88, w: 16, h: 10, mx: 94, my: 88, side: 'inline', dir: 'right' },
];

const RETINOFUGAL_REGIONS = [
  { id: 'eye', label: 'Eye', body: 'The ganglion cells of each retina send their axons out of the eye at the optic disk.', x: 63, y: 9, w: 12, h: 10, side: 'right' },
  { id: 'nerve', label: 'Optic nerve', body: 'First part of the retinofugal projection. Carries the axons of one eye only.', x: 58, y: 21, w: 4, h: 8, side: 'right' },
  { id: 'chiasm', label: 'Optic chiasm', body: 'The X where the two nerves meet. Axons from the nasal retinas cross here (partial decussation).', x: 48, y: 30.5, w: 8, h: 5, side: 'right' },
  { id: 'stalk', label: 'Stalk of the pituitary gland', body: 'Sits just behind the chiasm, so an enlarged pituitary presses on the crossing fibres.', x: 47.5, y: 34.5, w: 4, h: 3, side: 'left' },
  { id: 'tract', label: 'Optic tract', body: 'After the chiasm. Each tract carries both eyes, but only the opposite half of the visual field.', x: 40, y: 37, w: 6, h: 6, side: 'left' },
  { id: 'stem', label: 'Cut surface of the brain stem', body: 'The midbrain seen from below. The tracts run past it to the LGN of the thalamus.', x: 50, y: 50, w: 14, h: 12, side: 'left' },
];

const HEMIFIELD_REGIONS = [
  { id: 'left', label: 'Left visual hemifield', body: 'Everything left of a vertical line through the fixation point. Seen by the left nasal and the right temporal retina.', x: 12, y: 55, w: 10, h: 12, side: 'left' },
  { id: 'right', label: 'Right visual hemifield', body: 'Everything right of fixation. Seen by the left temporal and the right nasal retina.', x: 90, y: 30, w: 8, h: 12, side: 'right' },
  { id: 'binocular', label: 'Binocular visual field', body: 'The central part seen by both eyes at once. Large in humans, whose eyes face forward.', x: 52, y: 48, w: 16, h: 10, side: 'right' },
  { id: 'fixation', label: 'Fixation point', body: 'Where the eyes look. The vertical line through it splits the field into two hemifields.', x: 43, y: 37.5, w: 3, h: 4, side: 'left' },
  { id: 'nerve', label: 'Left optic nerve', body: 'Carries everything the left eye sees, from both hemifields.', x: 57, y: 80, w: 6, h: 5, side: 'left' },
  { id: 'chiasm', label: 'Optic chiasm', body: 'Nasal fibres cross, so each tract collects one hemifield from both eyes.', x: 72, y: 84, w: 6, h: 6, side: 'right' },
  { id: 'tract', label: 'Left optic tract', body: 'Carries the right visual hemifield from both eyes to the left LGN.', x: 67, y: 92, w: 5, h: 6, side: 'left' },
];

const LGN_REGIONS = [
  { id: 'right-lgn', label: 'Right LGN', body: 'Receives the left visual field. Left eye (contralateral) to layers 1, 4, 6; right eye (ipsilateral) to 2, 3, 5.', x: 54, y: 22, w: 10, h: 14, side: 'left' },
  { id: 'left-lgn', label: 'Left LGN', body: 'Receives the right visual field. Right eye to layers 1, 4, 6; left eye to 2, 3, 5.', x: 76, y: 13, w: 10, h: 16, side: 'right' },
  { id: 'crossing', label: 'Crossing at the optic chiasm', body: 'Nasal fibres cross to the other side; temporal fibres stay on their own side.', x: 66, y: 35, w: 8, h: 6, side: 'left' },
  { id: 'rt', label: 'Right temporal retina', body: 'Sees the left visual field. Stays uncrossed, so it goes to the right LGN (ipsilateral layers).', x: 61, y: 53, w: 5, h: 8, side: 'left' },
  { id: 'rn', label: 'Right nasal retina', body: 'Sees the right visual field. Crosses to the left LGN (contralateral layers).', x: 69, y: 53, w: 5, h: 8, side: 'right' },
  { id: 'ln', label: 'Left nasal retina', body: 'Sees the left visual field. Crosses to the right LGN.', x: 84, y: 42, w: 5, h: 8, side: 'right' },
  { id: 'lt', label: 'Left temporal retina', body: 'Sees the right visual field. Stays on the left, to the left LGN.', x: 91, y: 42, w: 5, h: 8, side: 'right' },
];

const OD_REGIONS = [
  { id: 'left-col', label: 'Left eye ocular dominance column', body: 'A band through the thickness of V1 whose neurons respond more to the left eye.', shape: 'rect', x: 24, y: 50, w: 26, h: 90, mx: 24, my: 5, side: 'left' },
  { id: 'right-col', label: 'Right eye ocular dominance column', body: 'The neighbouring band, dominated by the right eye. Left and right bands alternate.', shape: 'rect', x: 51, y: 50, w: 26, h: 90, mx: 51, my: 5, side: 'right' },
  { id: 'iii', label: 'Layer III', body: 'Receives axons from layer IVC of both eyes: here the two eyes first mix.', shape: 'rect', x: 38, y: 40, w: 70, h: 12, mx: 71, my: 40, side: 'right' },
  { id: 'ivc', label: 'Layer IVC', body: 'LGN input arrives here. Each IVC neuron is driven by one eye only (monocular).', shape: 'rect', x: 38, y: 60, w: 70, h: 7, mx: 71, my: 60, side: 'right' },
  { id: 'vi', label: 'Layer VI', body: 'Above or below an eye patch in IVC, deep neurons are dominated by the same eye.', shape: 'rect', x: 38, y: 75, w: 70, h: 8, mx: 71, my: 75, side: 'right' },
  { id: 'input', label: 'Left eye input from the LGN', body: 'An LGN axon serving the left eye branches only inside its own patch of IVC.', x: 24, y: 85, w: 3, h: 12, side: 'left' },
  { id: 'binocular', label: 'Binocular layer III neuron', body: 'The purple cells on a column border get roughly equal input from the two eyes.', x: 37.5, y: 39.5, w: 6, h: 8, side: 'left' },
];

const CORTEX_REGIONS = [
  { id: 'i', label: 'Layer I', body: 'Just under the pia, almost no neurons: axons and dendrites of cells in deeper layers.', shape: 'rect', x: 30, y: 5, w: 44, h: 5, mx: 12, my: 5, side: 'left' },
  { id: 'stellate', label: 'Spiny stellate cells in IVC', body: 'Small spiny neurons that receive the LGN input and send it up, mainly to IVB and III. Local axons only.', x: 36, y: 57, w: 8, h: 6, side: 'left' },
  { id: 'iii-out', label: 'Layer III output: other cortical areas', body: 'Corticocortical output. Layers II, III and IVB send axons to other cortical areas.', x: 75, y: 19, w: 4, h: 6, side: 'right' },
  { id: 'ivb-out', label: 'Layer IVB output: other cortical areas', body: 'Also corticocortical, for example to area MT (V5).', x: 78, y: 35, w: 4, h: 6, side: 'right' },
  { id: 'ivc-in', label: 'Layer IVC: input from the thalamus', body: 'Most LGN axons end here (thalamocortical input). IVC alpha gets magnocellular, IVC beta parvocellular input.', shape: 'rect', x: 80, y: 47, w: 28, h: 8, mx: 92, my: 47, side: 'right' },
  { id: 'v-out', label: 'Layer V output: pons and superior colliculus', body: 'Widespread subcortical output through the white matter.', x: 84, y: 52, w: 4, h: 6, side: 'right' },
  { id: 'vi-out', label: 'Layer VI output: LGN', body: 'Corticothalamic feedback, specific to the LGN: the source of most LGN excitatory synapses.', x: 91, y: 66, w: 4, h: 6, side: 'right' },
];

const AREA_REGIONS = [
  { id: 'v1', label: 'V1', body: 'Striate cortex at the back of the occipital lobe. Sends information on to more than two dozen extrastriate areas.', x: 86, y: 42, w: 14, h: 30, side: 'right' },
  { id: 'v2', label: 'V2', body: 'The band just in front of V1. Both streams pass through it.', x: 74, y: 38, w: 4, h: 12, side: 'right' },
  { id: 'mt', label: 'MT (V5)', body: 'Dorsal stream. Almost every cell is direction selective: motion processing.', x: 65, y: 52, w: 4, h: 6, side: 'left' },
  { id: 'mst', label: 'MST', body: 'Dorsal stream beyond MT: cells for linear, radial and circular motion.', x: 61.5, y: 46, w: 3, h: 6, side: 'inline', dir: 'up-left' },
  { id: 'v4', label: 'V4', body: 'Ventral stream. Larger fields than V1; many cells selective for both orientation and colour: shape and colour.', x: 73, y: 66, w: 10, h: 10, side: 'right' },
  { id: 'it', label: 'IT', body: 'Inferior temporal cortex, far end of the ventral stream. Complex shapes and faces; links to memory.', x: 58, y: 80, w: 20, h: 14, side: 'left' },
];

// ---------------------------------------------------------------------
// Demo props. The engines hold no lecture text; it all comes from here.

const CENTER_SURROUND = {
  base: 15,
  gain: 35,
  max: 100,
  surroundWeight: 0.85,
  initial: { cell: 'off', stim: 'darkSpot', x: 0, y: 0, d: 0.64 },
  presets: [
    { label: 'Figure 9.27 (b): dark spot on the center', state: { cell: 'off', stim: 'darkSpot', x: 0, y: 0, d: 0.64 } },
    { label: '(c): spot over center and surround', state: { cell: 'off', stim: 'darkSpot', x: 0, y: 0, d: 1.9 } },
    { label: 'Figure 9.28 (b): edge in the surround', state: { cell: 'off', stim: 'edge', x: -0.5, y: 0 } },
    { label: '(c): edge past the center', state: { cell: 'off', stim: 'edge', x: 0.45, y: 0 } },
    { label: 'ON-center, light spot', state: { cell: 'on', stim: 'lightSpot', x: 0, y: 0, d: 0.64 } },
  ],
  labels: {
    patch: 'Patch of retina: drag to move the stimulus',
    cell: 'Ganglion cell', on: 'ON-center', off: 'OFF-center',
    stim: 'Stimulus', lightSpot: 'light spot', darkSpot: 'dark spot', edge: 'light-dark edge',
    x: 'Horizontal position', y: 'Vertical position', d: 'Spot diameter', edgeAt: 'Edge position (dark to its left)',
    presets: 'Try',
    center: 'Center', surround: 'Surround', darkPct: 'dark', lightPct: 'light',
    rate: 'Firing rate', spikes: 'spikes/s',
    uniform: 'Ground alone', stimulus: 'With this stimulus',
    time: 'One second of firing',
    explain: {
      up: 'Above the maintained rate: the center gets its preferred contrast and the surround does not cancel it.',
      down: 'Below the maintained rate: the surround gets the contrast the center prefers and inhibits the cell.',
      same: 'Near the maintained rate: center and surround cancel, or the stimulus misses the field.',
    },
  },
};

const TRACER = {
  initial: { az: 30, el: 20, lesion: 'none' },
  lesions: [
    { key: 'none', label: 'none' },
    { key: 'nerve-L', label: 'left optic nerve' },
    { key: 'chiasm', label: 'optic chiasm, midline' },
    { key: 'tract-L', label: 'left optic tract' },
    { key: 'v1-L', label: 'left V1' },
    { key: 'v1-L-spare', label: 'left V1, occipital pole spared' },
  ],
  labels: {
    leftEyeField: 'Left eye field', rightEyeField: 'Right eye field',
    leftField: 'left', rightField: 'right',
    leftEye: 'Left eye', rightEye: 'Right eye',
    leftLgn: 'left LGN', rightLgn: 'right LGN', leftV1: 'left V1', rightV1: 'right V1',
    leftTract: 'left optic tract', rightTract: 'right optic tract',
    chiasm: 'chiasm', pole: 'pole',
    upperBank: 'above calcarine', lowerBank: 'below calcarine', onCalcarine: 'along the calcarine fissure',
    lesion: 'Lesion', az: 'Point: left to right', el: 'Point: down to up',
    point: 'Point', cortex: 'Cortex', seen: 'Seen by',
    left: 'left', right: 'right', onMeridian: 'on the vertical midline',
    above: 'above', below: 'below', onHorizontal: 'level with',
    pointTemplate: '{az}° {side}, {el}° {vert} fixation',
    leftHemifield: '(left visual hemifield)', rightHemifield: '(right visual hemifield)',
    nasal: 'nasal', temporal: 'temporal',
    crosses: 'crosses at the chiasm', stays: 'stays on its side at the chiasm',
    eyeTemplate: '{half} retina, {cross}, {tract}, {lgn} layers {layers}',
    blocked: 'The lesion cuts this path.',
    outside: 'Outside the field of this eye (the nose blocks it).',
    meridian: 'On the vertical midline: move the point left or right.',
    cortexTemplate: '{v1}, {bank}, {part} part of the map',
    central: 'central (magnified)', peripheral: 'peripheral',
    seenTemplate: '{eyes}', and: ' and ', notSeen: 'Neither eye: this point is blind.',
  },
};

const SIMPLE = {
  axis: 0,
  threshold: 60,
  gain: 0.9,
  initial: { theta: 0, offset: 0, layout: 'aligned' },
  labels: {
    patch: 'Light bar over three LGN ON-center fields',
    lgn: 'LGN cells 1 to 3', simple: 'Layer IVC simple cell',
    tuning: 'Simple cell rate at every bar orientation (spikes/s)',
    theta: 'Bar orientation from vertical', offset: 'Bar position across the row',
    layout: 'LGN fields', aligned: 'aligned in a row', scattered: 'scattered',
    lgnRates: 'LGN cells', simpleRate: 'Simple cell', preferred: 'Preferred orientation',
    spikes: 'spikes/s', fromVertical: 'from vertical', nonePreferred: 'none at this bar position',
    explain: {
      strong: 'The bar lies along the row and covers all three centers: the summed input clears the threshold.',
      weak: 'Only part of the row is lit: the input barely clears the threshold.',
      none: 'At most one center is lit: the summed input stays below threshold.',
    },
  },
};

// ---------------------------------------------------------------------

export default {
  meta: {
    id: 'L04',
    number: 4,
    title: 'The eye and the central visual system',
    chapters: [9, 10],
    pages: [
      { chapter: 9, from: 296, to: 327 },
      { chapter: 10, from: 332, to: 363 },
      { chapter: 7, from: 190, to: 190 },
    ],
    lectureDate: '2026-09-23',
    examDate: '2026-10-09',
  },

  objectives: [
    'Name the structures of the eye and explain how the cornea and the lens form an image on the retina, including accommodation.',
    'Use the terms visual field, visual angle and receptive field correctly.',
    'Name the layers of the retina in order from where light enters, and explain the fovea and the distribution of rods and cones.',
    'State the three rules of the retinal microcircuit and explain how ON and OFF center-surround receptive fields arise and why they emphasise edges.',
    'Trace the retinofugal projection from each hemiretina through the chiasm, tract, LGN layers and optic radiation to V1, and predict the field loss after a lesion anywhere along it.',
    'Describe retinotopy, ocular dominance columns, the laminar projection rules of V1, orientation selectivity and the simple cell.',
    'Describe the dorsal and ventral streams and how complexity, latency and receptive field size rise up the hierarchy, and how fMRI finds face areas in humans.',
    'Compare what anatomical tracing, single-cell recording, lesions and fMRI each reveal about the visual pathways.',
  ],

  prerequisites: [
    { text: 'Graded potentials versus action potentials: only a spike travels far without decay.', lectureId: 'L02', sectionId: 'initiation' },
    { text: 'Glutamate acting on ionotropic and on G-protein-coupled (metabotropic) receptors.', lectureId: 'L03', sectionId: 'receptors' },
    { text: 'Excitatory and inhibitory synaptic potentials and how they sum.', lectureId: 'L03', sectionId: 'summation' },
    { text: 'The occipital lobe, the thalamus and the layered cerebral cortex.', lectureId: 'L01', sectionId: 'cytoarchitecture' },
  ],

  sections: [
    // 1 -----------------------------------------------------------------
    {
      id: 'eye-structure',
      title: 'The eye: gross anatomy and cross section',
      keyTerms: ['pupil', 'iris', 'cornea', 'sclera', 'lens', 'retina', 'fovea', 'optic disk'],
      blocks: [
        { type: 'text', body: 'The eye is an organ for detecting, localizing and analysing light. The slides show it from the outside and in cross section.' },
        figureBlock(
          hotspots('eye-gross', 548 / 699, 'The human eye from the front and from the side, with numbered markers.', GROSS_REGIONS),
          'Gross anatomy of the human eye (textbook Figure 9.4). Top: from the front. Bottom: from the side, with the muscles that rotate it.',
          'Two drawings. Top: an eye seen from the front with pupil, iris and the white sclera. Bottom: a side view of the eyeball with the clear cornea at the front, a red muscle on the side and the optic nerve leaving the back.'
        ),
        figureBlock(
          hotspots('eye-section', 725 / 571, 'The eye in cross section with numbered markers on its main structures.', SECTION_REGIONS),
          'The eye in cross section (Figure 9.6). Front structures regulate how much light enters and bend it onto the retina, which wraps round the inside of the eye.',
          'Horizontal cross section of an eyeball. A yellow arrow of light enters from the left through the cornea and lens and ends on the fovea at the back. The optic nerve leaves on the right.'
        ),
        { type: 'compare', title: 'Two fluids, one on each side of the lens', columns: ['Where', 'What it does'], rows: [
          { label: 'Aqueous humor', cells: ['Between cornea and lens', 'Watery; nourishes the cornea, which has no blood vessels'] },
          { label: 'Vitreous humor', cells: ['Between lens and retina', 'Jelly-like; keeps the eyeball spherical'] },
        ] },
        { type: 'definition', term: 'Optic disk', body: 'Where the ganglion cell axons leave the retina and the blood vessels enter. No photoreceptors, so it is blind: the blind spot.' },
        { type: 'example', title: 'Homework: Box 9.1, the blind regions of your eye', body: 'Close one eye, fixate a cross and move a dot sideways until it vanishes: its image has landed on the optic disk. Retinal blood vessels also cast shadows. We never notice either gap because the visual cortex fills it in.' },
        { type: 'detail', title: 'Pupil size and depth of focus', body: 'Muscles in the iris set the pupil size. Bright light constricts the pupil. A smaller pupil also shrinks the blur of objects outside the current focus, so a wider range of distances looks sharp: a larger depth of focus, as with a small camera aperture.' },
      ],
      conceptQuiz: [
        {
          id: 'eye-structure-1',
          prompt: 'Why is there a blind spot in each eye?',
          options: [
            { text: 'The optic disk has no photoreceptors', feedback: 'Correct. The axons leave and the vessels enter there, leaving no room for rods or cones.' },
            { text: 'The fovea has no rods in its center', feedback: 'True, but the fovea still has cones and sees well in daylight.' },
            { text: 'The lens casts a shadow on the retina', feedback: 'The lens is transparent; it focuses light rather than blocking it.' },
            { text: 'The macula lacks large blood vessels', feedback: 'That helps central vision; it does not make a blind region.' },
          ],
          correct: 0,
        },
        {
          id: 'eye-structure-2',
          prompt: 'Which structure does most of the refraction of light in the eye?',
          options: [
            { text: 'The lens', feedback: 'The lens adds the adjustable part, but less power than the cornea.' },
            { text: 'The cornea', feedback: 'Correct. Light passes from air into water there, so it bends the most.' },
            { text: 'The vitreous', feedback: 'The vitreous humor keeps the eye round; it refracts little.' },
            { text: 'The iris', feedback: 'The iris sets the pupil size; it does not bend light.' },
          ],
          correct: 1,
        },
      ],
    },

    // 2 -----------------------------------------------------------------
    {
      id: 'accommodation',
      title: 'Image formation and accommodation: active sensing',
      keyTerms: ['refraction', 'accommodation', 'zonule fibers', 'ciliary muscle', 'active sensing'],
      blocks: [
        { type: 'text', body: 'The eye focuses light by refraction. The cornea gives a fixed amount; the lens adds a variable amount by changing its shape.' },
        figureBlock(
          hotspots('accommodation', 1050 / 515, 'Two eyes focusing: on a far point with a flat lens and on a near point with a fat lens.', [
            { id: 'far', label: 'Far point, flat lens', body: 'Rays from a distant point arrive nearly parallel and need little refraction.', shape: 'rect', x: 50, y: 22, w: 96, h: 40, mx: 70, my: 22, side: 'left' },
            { id: 'near', label: 'Near point, fat lens', body: 'Rays from a near point diverge and need more refraction, so the lens rounds up.', shape: 'rect', x: 65, y: 76, w: 66, h: 40, mx: 70, my: 78, side: 'right' },
            { id: 'zoom', label: 'Lens and zonules, close up', body: 'The right-hand panels: thin lens under tension (top), thick lens with slack zonule fibers (bottom).', shape: 'rect', x: 92, y: 50, w: 16, h: 96, mx: 92, my: 20, side: 'right' },
          ], { quiz: false }),
          'Accommodation by the lens (Figure 9.8). (a) Far point: ciliary muscle relaxed, zonule fibers stretched, lens flat. (b) Near point: ciliary muscle contracted, zonules slack, lens rounder.',
          'Two grey panels. Top: yellow rays from a far point converge through a thin lens onto the retina. Bottom: rays from a near point converge through a thicker lens. Close-ups of the lens sit on the right.'
        ),
        { type: 'steps', title: 'Focusing on something near', steps: [
          'Rays from a near point diverge, so they need more refraction than rays from a distant point.',
          'The ciliary muscle contracts; the ring it forms gets smaller.',
          'Tension in the zonule fibers falls.',
          'The elastic lens rounds up, its surfaces curve more and it refracts more.',
          'The image of the near object lands sharply on the retina.',
        ] },
        { type: 'misconception', wrong: 'Contracting the ciliary muscle pulls the lens flat.', right: 'Contracting the ciliary muscle slackens the zonule fibers and the lens rounds up. Relaxing it stretches the zonules and flattens the lens for far vision.' },
        { type: 'whyItMatters', title: 'Active sensing (slide 7)', body: 'The eye is not a passive camera: muscles rotate it (extraocular muscles) and focus it (ciliary muscle). The brain chooses where to look and what to bring into focus.' },
        { type: 'detail', title: 'Accommodation and age', body: 'An infant can focus just beyond its nose; many middle-aged adults cannot focus closer than arm length, because the lens loses its elasticity.' },
      ],
      conceptQuiz: [
        {
          id: 'accommodation-1',
          prompt: 'You look up from your phone to a distant mountain. What does the ciliary muscle do?',
          options: [
            { text: 'It contracts, the zonules stretch and the lens flattens', feedback: 'Contraction slackens the zonules; it is the near-vision setting.' },
            { text: 'It relaxes, the zonules stretch and the lens flattens', feedback: 'Correct. Far vision needs little refraction, so the lens is pulled thin.' },
            { text: 'It relaxes, the zonules go slack and the lens rounds up', feedback: 'Relaxing the muscle stretches the zonules; the lens flattens.' },
            { text: 'It contracts, the zonules go slack and the lens rounds up', feedback: 'That is the setting for the phone, not the mountain.' },
          ],
          correct: 1,
        },
      ],
    },

    // 3 -----------------------------------------------------------------
    {
      id: 'visual-field',
      title: 'Visual field and visual angle',
      keyTerms: ['visual field', 'visual angle', 'visual acuity'],
      blocks: [
        { type: 'text', body: 'Two terms that every visual neuroscience paper uses in its Methods section (slide 9).' },
        { type: 'definition', term: 'Visual field', body: 'The total amount of space that the retina can view when the eye is fixated straight ahead.' },
        { type: 'definition', term: 'Visual angle', body: 'The angle an object subtends at the eye. It depends on size and distance: the same object subtends a larger angle when it is closer. Sizes and distances on the retina are given in degrees of visual angle.' },
        figureBlock(
          hotspots('visual-field', 480 / 378, 'The visual field of the right eye seen from above, with a pencil imaged on the retina.', [
            { id: 'temporal', label: 'Temporal side, nearly 100°', body: 'The field reaches nearly $100^{\\circ}$ toward the temple.', x: 88, y: 30, w: 10, h: 20, side: 'right' },
            { id: 'nasal', label: 'Nasal side, about 60°', body: 'Only about $60^{\\circ}$ toward the nose, which blocks the view.', x: 12, y: 45, w: 10, h: 16, side: 'left' },
            { id: 'image', label: 'Image reversed on the retina', body: 'The pencil tip on the left lands on the right side of the retina: left and right (and up and down) are reversed.', x: 42, y: 90, w: 20, h: 8, side: 'left' },
          ], { quiz: false }),
          'The visual field for one eye (Figure 9.9). The image of the pencil is left-right reversed on the retina.',
          'A right eye at the bottom looks up into a cream-coloured fan that spans 150 degrees. A pencil lies across the fan; dotted lines from its ends cross in the eye and land reversed on the retina.'
        ),
        figureBlock(
          hotspots('visual-angle', 504 / 560, 'The moon subtends half a degree of visual angle and makes a 140 micrometre image on the retina.', [
            { id: 'moon', label: 'Moon, 0.5° of visual angle', body: 'The moon spans about $0.5^{\\circ}$.', x: 80, y: 10, w: 10, h: 10, mx: 75, my: 18, side: 'left' },
            { id: 'retina', label: '140 µm on the retina', body: 'That half degree covers about $140\\,\\mu\\text{m}$ of retina.', x: 20, y: 88, w: 8, h: 8, side: 'left' },
          ], { quiz: false }),
          'Visual angle (Figure 9.10). Distances across the retina can be expressed as degrees of visual angle.',
          'Two yellow lines from the edges of the moon converge through the eye and spread onto a small stretch of retina labelled 140 micrometres.'
        ),
        { type: 'keyNumber', items: [
          { value: '$0.5^{\\circ}$', label: 'the moon' },
          { value: '$1.5^{\\circ}$', label: 'your thumb at arm length' },
          { value: '$10^{\\circ}$', label: 'your fist at arm length' },
          { value: '$\\approx 3.5^{\\circ}$', label: 'per millimetre of retina' },
        ] },
        { type: 'detail', title: 'Visual acuity', body: 'Acuity is the ability to tell two nearby points apart. It depends mainly on how closely the photoreceptors are packed and how precisely the eye refracts; it is highest at the fovea. One degree is 60 minutes of arc. With 20/20 vision you recognize a letter spanning $5$ minutes of arc, about $0.083^{\\circ}$, from 20 feet.' },
      ],
      conceptQuiz: [
        {
          id: 'visual-field-1',
          prompt: 'Why does the visual field of one eye reach further to the temporal side than to the nasal side?',
          options: [
            { text: 'The nasal retina contains no photoreceptors', feedback: 'The nasal retina sees perfectly well; it views the temporal field.' },
            { text: 'The fovea sits on the temporal side of the eye', feedback: 'The fovea is the centre of the retina, the reference point for both sides.' },
            { text: 'The nose blocks the view on the nasal side', feedback: 'Correct. About $100^{\\circ}$ temporally but only about $60^{\\circ}$ nasally.' },
            { text: 'The lens bends light only toward the temple', feedback: 'The lens bends rays from every direction toward the retina.' },
          ],
          correct: 2,
        },
      ],
    },

    // 4 -----------------------------------------------------------------
    {
      id: 'retina-layers',
      title: 'Retinal layers and the fovea',
      keyTerms: ['ganglion cell layer', 'inner plexiform layer', 'inner nuclear layer', 'outer plexiform layer', 'outer nuclear layer', 'pigmented epithelium'],
      blocks: [
        { type: 'text', body: 'The retina is a laminar sheet. It looks inside out: light must pass through the ganglion cells and bipolar cells before it reaches the photoreceptors at the back.' },
        figureBlock(
          hotspots('retina-layers', 396 / 623, 'A column of retina with the vitreous side at the top and the pigmented epithelium at the bottom, with seven numbered layers.', LAYER_REGIONS, { showShapes: false }),
          'The laminar organization of the retina (Figure 9.12). Light enters from the top (the vitreous side) and meets the photoreceptors last.',
          'A tall slab of retina. At the top, yellow ganglion cells; below them a band of fine branches; then orange bipolar cells with a green amacrine and a red horizontal cell; another band of branches; then blue rods and cones with their striped outer segments resting on a pale pigmented layer.'
        ),
        { type: 'steps', title: 'The layers from where light enters', steps: [
          { title: 'Ganglion cell layer:', body: 'ganglion cell bodies, innermost.' },
          { title: 'Inner plexiform layer:', body: 'bipolar, amacrine and ganglion cell synapses.' },
          { title: 'Inner nuclear layer:', body: 'bipolar, horizontal and amacrine cell bodies.' },
          { title: 'Outer plexiform layer:', body: 'photoreceptor synapses onto bipolar and horizontal cells.' },
          { title: 'Outer nuclear layer:', body: 'rod and cone cell bodies.' },
          { title: 'Photoreceptor outer segments:', body: 'the light-sensitive part.' },
          { title: 'Pigmented epithelium:', body: 'maintains the photoreceptors, absorbs stray light.' },
        ] },
        { type: 'misconception', wrong: 'The outer layers are the ones nearest the front of the eye.', right: 'Layers are named from the middle of the eyeball. The photoreceptors are outermost, although they are furthest from the front and deepest in the head.' },
        figureBlock(
          hotspots('fovea', 743 / 386, 'A block of retina with a pit in its centre where the upper layers are pushed aside.', FOVEA_REGIONS),
          'The fovea in cross section (Figure 9.16). The ganglion cell layer and the inner nuclear layer are displaced laterally so light strikes the foveal photoreceptors directly.',
          'A 3D block of retina. In the middle the yellow and orange upper layers dip into a deep pit; under the pit the blue photoreceptor layer continues, packed with cones.'
        ),
        { type: 'whyItMatters', body: 'Clearing the cells that would scatter light is one of the specializations that make the fovea the place of highest acuity. We move our eyes to put anything important onto it.' },
      ],
      conceptQuiz: [
        {
          id: 'retina-layers-1',
          prompt: 'Which layer does light reach first after crossing the vitreous humor?',
          options: [
            { text: 'Outer nuclear layer', feedback: 'That holds the photoreceptor bodies, near the back.' },
            { text: 'Pigmented epithelium', feedback: 'That is the very last layer, behind the outer segments.' },
            { text: 'Inner nuclear layer', feedback: 'Light reaches it second, after the ganglion cells and the inner plexiform layer.' },
            { text: 'Ganglion cell layer', feedback: 'Correct. The retina is inside out: output cells first, photoreceptors last.' },
          ],
          correct: 3,
        },
        {
          id: 'retina-layers-2',
          prompt: 'What is special about the retina at the fovea?',
          options: [
            { text: 'The upper layers are pushed aside', feedback: 'Correct. Light reaches the cones without passing through other cells.' },
            { text: 'The photoreceptors face the lens', feedback: 'The photoreceptors face the back of the eye everywhere, fovea included.' },
            { text: 'The retina is thickest at this point', feedback: 'It is thinnest; that is what makes the pit.' },
            { text: 'Rods are packed most densely there', feedback: 'The central fovea has no rods at all, only cones.' },
          ],
          correct: 0,
        },
      ],
    },

    // 5 -----------------------------------------------------------------
    {
      id: 'rods-cones',
      title: 'Rod and cone distribution across the retina',
      keyTerms: ['rods', 'cones', 'convergence', 'scotopic', 'photopic'],
      blocks: [
        { type: 'text', body: 'The retina is not uniform. Cones crowd the fovea; rods are absent there and dominate the periphery (slide 12).' },
        figureBlock(
          chart(ROD_CONE, 'Photoreceptor density across the retina: a narrow cone peak at the fovea, rods peaking about 20 degrees out, a gap at the blind spot.', { gutter: 'ends' }),
          'Rods and cones across the retina, traced from the slide (Figure 9.15a). The slide gives no numbers, so density is relative to the peak.',
          'Line chart. Horizontal axis: distance from the fovea, temporal retina to the left, nasal to the right. The cone line is flat and low except for a tall narrow spike at zero. The rod line is zero at the fovea, rises to peaks about 20 degrees on each side, falls toward the edges, and drops to zero in a shaded band marked blind spot on the nasal side.'
        ),
        figureBlock(
          hotspots('convergence', 539 / 527, 'Photoreceptors converging on ganglion cells in peripheral and central retina.', [
            { id: 'peripheral', label: 'Peripheral retina: many to one', body: 'Many photoreceptors, mostly rods, feed one ganglion cell. Weak signals add up: good for dim light, poor resolution.', shape: 'rect', x: 17, y: 60, w: 30, h: 70, mx: 17, my: 30, side: 'left' },
            { id: 'central', label: 'Central retina: few to one', body: 'Few photoreceptors (one cone at the very centre) per ganglion cell: fine detail.', shape: 'rect', x: 50, y: 60, w: 14, h: 70, mx: 50, my: 30, side: 'right' },
          ], { quiz: false }),
          'Convergence in peripheral and central retina (Figure 9.15b). Labels as on the slide.',
          'Three columns of retinal wiring. Left and right: six photoreceptors converge through bipolar cells onto one ganglion cell. Middle: one cone to one bipolar cell to one ganglion cell.'
        ),
        { type: 'compare', title: 'Rods and cones', columns: ['Rods', 'Cones'], rows: [
          { label: 'Where', cells: ['Periphery, none in the central fovea', 'Concentrated in the fovea'] },
          { label: 'Number per retina', cells: ['About 92 million', 'About 5 million'] },
          { label: 'Sensitivity', cells: ['Over 1000 times more sensitive', 'Need daylight'] },
          { label: 'Light level', cells: ['Scotopic (night)', 'Photopic (day)'] },
          { label: 'Colour', cells: ['No colour vision', 'Three types: colour vision'] },
          { label: 'Convergence', cells: ['Many rods per ganglion cell', 'Few, down to one, per ganglion cell'] },
        ] },
        { type: 'example', title: 'The faint star', body: 'At night, fixate a bright star and find a faint one in the corner of your eye. Look straight at it and it disappears: its image now falls on the rod-free fovea. Look slightly away and it comes back.' },
      ],
      conceptQuiz: [
        {
          id: 'rods-cones-1',
          prompt: 'Why is central vision blind in very dim (scotopic) light?',
          options: [
            { text: 'The central fovea has rods only, and rods saturate at night', feedback: 'Reversed: the central fovea has no rods.' },
            { text: 'The central fovea has cones only, and cones need daylight', feedback: 'Correct. Rods, which work in dim light, are absent from the central fovea.' },
            { text: 'The optic disk sits at the centre of the retina', feedback: 'The optic disk lies on the nasal side, not at the centre.' },
            { text: 'Foveal cones converge heavily onto one ganglion cell', feedback: 'The fovea has the least convergence; heavy convergence is peripheral.' },
          ],
          correct: 1,
        },
      ],
    },

    // 6 -----------------------------------------------------------------
    {
      id: 'microcircuit',
      title: 'The retinal microcircuit and its three rules',
      keyTerms: ['photoreceptor', 'bipolar cell', 'ganglion cell', 'horizontal cell', 'amacrine cell'],
      blocks: [
        { type: 'text', body: 'Five cell types. The direct path runs photoreceptor to bipolar cell to ganglion cell; horizontal and amacrine cells modify it sideways.' },
        figureBlock(
          hotspots('microcircuit', 488 / 648, 'The basic retinal circuit: two columns of photoreceptor, bipolar and ganglion cells, joined sideways by a horizontal and an amacrine cell.', CIRCUIT_REGIONS),
          'The basic system of retinal information processing (Figure 9.11). Horizontal and amacrine cells modify bipolar and ganglion cell responses through lateral connections.',
          'Two vertical chains: blue photoreceptors at the bottom, orange bipolar cells, yellow ganglion cells at the top whose axons run off to the left. A pink horizontal cell links the chains at the photoreceptor level and a green amacrine cell at the ganglion level.'
        ),
        { type: 'steps', title: 'Three rules to remember (slide 13)', steps: [
          { title: 'Only rods and cones sense light.', body: 'Every other retinal cell is influenced by light only through direct and indirect synaptic input from the photoreceptors.' },
          { title: 'Ganglion cells are the only output.', body: 'No other retinal cell sends an axon through the optic nerve.' },
          { title: 'Ganglion cells are the only retinal neurons that fire action potentials.', body: 'All the others depolarize or hyperpolarize, and release transmitter at a rate proportional to their membrane potential.' },
        ] },
        { type: 'whyItMatters', body: 'Rule 3 follows from distance. Graded potentials fade within a short distance, which is enough inside the thin retina; only spikes can carry the signal down the optic nerve to the brain.' },
        { type: 'detail', title: 'Exceptions the notes mention', body: 'Rule 1: a rare type of ganglion cell, the intrinsically photosensitive retinal ganglion cell (ipRGC), contains melanopsin and depolarizes to light. It projects to the hypothalamus and helps set circadian rhythms, not pattern vision. Rule 3: the notes add that some amacrine cells spike too. In the exam, use the rules as the slide states them.' },
        { type: 'misconception', title: 'Slide 14: "Mechanistic understanding? Nope."', wrong: 'Knowing the parts of the eye explains vision, as a list of parts explains a phone camera.', right: 'A parts list says what is there, not what it computes. The camera analogy holds for image formation only: about 100 million photoreceptors feed only about 1 million ganglion cell axons, so the retina must select what to send.' },
        { type: 'steps', title: 'What the retina does that a camera sensor does not', steps: [
          'Adapts its sensitivity to the current light level.',
          'Splits the signal into ON and OFF pathways for local brightening and darkening.',
          'Compares each spot with its neighbours (center-surround), which emphasizes edges.',
          'Sends some signals as brief bursts and others as sustained firing.',
        ] },
      ],
      conceptQuiz: [
        {
          id: 'microcircuit-1',
          prompt: 'Which retinal cell fires action potentials?',
          options: [
            { text: 'Bipolar cell', feedback: 'Bipolar cells use graded potentials only.' },
            { text: 'Horizontal cell', feedback: 'Horizontal cells use graded potentials and spread laterally.' },
            { text: 'Ganglion cell', feedback: 'Correct. It is the only retinal neuron that spikes, and the only output.' },
            { text: 'Photoreceptor', feedback: 'Photoreceptors hyperpolarize in light but do not spike.' },
          ],
          correct: 2,
        },
        {
          id: 'microcircuit-2',
          prompt: 'In which layer do horizontal cells make their lateral connections?',
          options: [
            { text: 'Inner plexiform layer', feedback: 'That is where amacrine cells spread sideways.' },
            { text: 'Ganglion cell layer', feedback: 'That layer holds cell bodies of ganglion cells.' },
            { text: 'Outer nuclear layer', feedback: 'That layer holds photoreceptor cell bodies, not synapses.' },
            { text: 'Outer plexiform layer', feedback: 'Correct. They take photoreceptor input there and act on nearby bipolar cells and photoreceptors.' },
          ],
          correct: 3,
        },
      ],
    },

    // 7 -----------------------------------------------------------------
    {
      id: 'receptive-field',
      title: 'Receptive fields: a general concept',
      keyTerms: ['receptive field'],
      blocks: [
        { type: 'definition', term: 'Receptive field', body: 'The region of the sensory surface (retina, visual field, skin) in which a stimulus changes the firing of a neuron. Outside it, stimuli have no effect.' },
        { type: 'compare', title: 'Two terms that are easy to mix up', columns: ['Visual field', 'Receptive field'], rows: [
          { label: 'Belongs to', cells: ['The whole eye', 'One neuron'] },
          { label: 'What it is', cells: ['All of space seen with gaze fixed', 'The part of that space where a stimulus changes the activity of the neuron'] },
        ] },
        figureBlock(
          hotspots('receptive-field', 882 / 818, 'Mapping receptive fields: on the retina, in the visual field and on the skin.', [
            { id: 'retina', label: '(a) On the retina', body: 'Record from a ganglion cell axon in the optic nerve and move a small light over the retina. The patch that changes the firing is the receptive field.', x: 22, y: 16, w: 30, h: 24, mx: 21, my: 16, side: 'left' },
            { id: 'field', label: '(b) In the visual field', body: 'The optics map each retinal patch to a place in visual space, so the same field can be drawn on a screen in front of the eye.', x: 69, y: 11, w: 24, h: 12, mx: 81, my: 9, side: 'right' },
            { id: 'skin', label: '(c) On the skin', body: 'The same idea for touch: the patch of skin whose touch makes a sensory axon fire.', x: 25, y: 72, w: 30, h: 24, mx: 26, my: 67.5, side: 'inline', dir: 'up' },
          ], { quiz: false }),
          'The receptive field (Figure 9.25). The term works for any neuron in any sensory system.',
          'Three drawings. An eye with an electrode on the optic nerve and a flashlight pointing a spot on the retina; the same eye with the spot projected onto a screen in front; a hand with a pin touching a fingertip while an electrode records from a nerve in the wrist.'
        ),
        figureBlock(
          hotspots('cnn-field', 1401 / 737, 'Three grids stacked like network layers; a unit in layer 3 sees a patch of layer 2, which sees a bigger patch of layer 1.', [
            { id: 'l3', label: 'One unit in layer 3', body: 'Its receptive field is a small patch of layer 2.', x: 83, y: 52, w: 4, h: 8, side: 'right' },
            { id: 'l1', label: 'Its field in layer 1', body: 'Through layer 2 it depends on a much larger patch of layer 1: fields grow with depth.', shape: 'rect', x: 17, y: 50, w: 30, h: 60, mx: 10, my: 40, side: 'left' },
          ], { quiz: false }),
          'Receptive field in convolutional networks (slide 16). The same term, and the same growth of field size with each stage, as in the visual pathway.',
          'Three square grids in a row labelled layer 1, 2 and 3. Dashed lines link one red cell in layer 3 to a 3 by 3 patch in layer 2, and that patch to a larger 5 by 5 patch in layer 1.'
        ),
        { type: 'steps', title: 'Describing a receptive field', steps: [
          'Record spikes, or the membrane potential of a retinal neuron that does not spike, while a small spot is flashed at many positions.',
          'Note where the field is and how large, in degrees of visual angle.',
          'Note whether each stimulus raises or lowers the activity from baseline, and for how long.',
          'Vary other features, such as bar orientation, to find the one that gives the strongest response.',
        ] },
        { type: 'text', body: 'A response map shows what drives a neuron. It does not by itself show the wiring that produces the map.' },
        { type: 'whyItMatters', body: 'Receptive fields change shape and grow as you go deeper: spots in the retina, bars in V1, faces in temporal cortex. Most of this lecture is a tour of how they change.' },
      ],
      conceptQuiz: [
        {
          id: 'receptive-field-1',
          prompt: 'How is the receptive field of a retinal ganglion cell found?',
          options: [
            { text: 'Record its spikes while moving a small spot of light over the retina', feedback: 'Correct. The spots that change the firing rate outline the field.' },
            { text: 'Stain the cell and measure the full spread of its dendrites', feedback: 'Anatomy hints at the size, but the field is defined by responses to light.' },
            { text: 'Stimulate the cell electrically and see where the eye then points', feedback: 'That would map a motor effect, not what makes the cell respond.' },
            { text: 'Flash the whole retina uniformly and record the total response', feedback: 'A uniform flash covers everything, so it cannot outline a region.' },
          ],
          correct: 0,
        },
        {
          id: 'receptive-field-2',
          prompt: 'What is the difference between the visual field and a receptive field?',
          options: [
            { text: 'The visual field belongs to the eye, a receptive field to one neuron', feedback: 'Correct. A receptive field is a small part of the visual field.' },
            { text: 'The visual field is on the retina, a receptive field is out in space', feedback: 'Both can be drawn in space or on the retina; the optics map one onto the other.' },
            { text: 'The visual field is for one neuron, a receptive field for the whole eye', feedback: 'Reversed: the eye has one visual field, each neuron its own receptive field.' },
            { text: 'The visual field is binocular, a receptive field is always monocular', feedback: 'Binocular V1 neurons have a receptive field in each eye.' },
          ],
          correct: 0,
        },
      ],
    },

    // 8 -----------------------------------------------------------------
    {
      id: 'bipolar',
      title: 'ON and OFF bipolar cells',
      keyTerms: ['ON bipolar cell', 'OFF bipolar cell', 'receptive field center', 'receptive field surround', 'center-surround'],
      blocks: [
        { type: 'text', body: 'Photoreceptors release glutamate. They are depolarized in the dark and hyperpolarize in light, so light means less glutamate.' },
        figureBlock(
          hotspots('bipolar', 1384 / 736, 'Bipolar cell receptive field: center photoreceptors wired directly, surround photoreceptors through horizontal cells.', [
            { id: 'center', label: 'Receptive field center', body: 'The cluster of photoreceptors (blue) that contact the bipolar cell directly.', x: 17, y: 30, w: 8, h: 20, side: 'left' },
            { id: 'surround', label: 'Receptive field surround', body: 'The ring of photoreceptors (red) that act through horizontal cells.', x: 24, y: 30, w: 6, h: 14, side: 'left' },
            { id: 'direct', label: '(b) Direct pathway', body: 'Light in the center: photoreceptor hyperpolarized, ON bipolar cell depolarized.', x: 55, y: 60, w: 10, h: 60, mx: 55, my: 30, side: 'right' },
            { id: 'indirect', label: '(c) Indirect pathway', body: 'Light in the surround: surround photoreceptors and horizontal cell hyperpolarized, the same ON bipolar cell hyperpolarized.', x: 85, y: 60, w: 20, h: 60, mx: 77.5, my: 65, side: 'inline', dir: 'left' },
          ], { quiz: false }),
          'Direct and indirect pathways from photoreceptors to bipolar cells (Figure 9.26). The effect of light on the surround is always opposite to its effect on the center.',
          'Left: a block of photoreceptors, blue in the middle and red around, converging onto a horizontal cell and a bipolar cell. Middle: a beam of light on one center photoreceptor and a depolarized bipolar cell. Right: light on the red surround photoreceptors, a hyperpolarized horizontal cell and a hyperpolarized bipolar cell.'
        ),
        { type: 'compare', title: 'Two bipolar cells, one transmitter', columns: ['OFF bipolar cell', 'ON bipolar cell'], rows: [
          { label: 'Glutamate receptor', cells: ['Ionotropic (glutamate-gated channel)', 'mGluR6, metabotropic (G protein)'] },
          { label: 'Effect of glutamate', cells: ['Opens cation channels: depolarizes', 'Closes cation channels: hyperpolarizes'] },
          { label: 'Light in the center', cells: ['Less glutamate: hyperpolarizes', 'Less glutamate: depolarizes'] },
          { label: 'Sign at the synapse', cells: ['Kept', 'Inverted'] },
        ] },
        { type: 'steps', title: 'Why the surround opposes the center', steps: [
          'Light on the surround hyperpolarizes the surround photoreceptors.',
          'They drive the horizontal cells, which also hyperpolarize.',
          'Horizontal cell hyperpolarization counteracts the effect of light on the center photoreceptor: it depolarizes it.',
          'So light in the surround acts on the bipolar cell like darkness in the center: an antagonistic center-surround receptive field.',
        ] },
        { type: 'misconception', wrong: 'The two response diagrams on slide 17 show an ON and an OFF bipolar cell.', right: 'They show one ON bipolar cell under two conditions: light in the center depolarizes it, light in the surround hyperpolarizes it. The ON and OFF split begins at this first synapse.' },
        { type: 'detail', title: 'Sizes', body: 'Bipolar cell fields range from a fraction of a degree in the central retina to several degrees in the periphery. The center is one photoreceptor in the central fovea and thousands in the periphery.' },
      ],
      conceptQuiz: [
        {
          id: 'bipolar-1',
          prompt: 'Light falls on the center of an ON bipolar cell field. What happens?',
          options: [
            { text: 'More glutamate, and the ON bipolar cell depolarizes', feedback: 'Light hyperpolarizes photoreceptors, so they release less glutamate.' },
            { text: 'Less glutamate, and the ON bipolar cell depolarizes', feedback: 'Correct. Its metabotropic receptors invert the sign.' },
            { text: 'Less glutamate, and the ON bipolar cell hyperpolarizes', feedback: 'That is the OFF bipolar cell, with ionotropic receptors.' },
            { text: 'More glutamate, and the ON bipolar cell hyperpolarizes', feedback: 'Both halves are reversed.' },
          ],
          correct: 1,
        },
      ],
    },

    // 9 -----------------------------------------------------------------
    {
      id: 'ganglion',
      title: 'ON-center and OFF-center ganglion cells',
      keyTerms: ['ON-center ganglion cell', 'OFF-center ganglion cell'],
      blocks: [
        { type: 'text', body: 'ON-center and OFF-center ganglion cells get their input from the corresponding type of bipolar cell, so they inherit its center-surround field.' },
        { type: 'compare', title: 'The two ganglion cell types', columns: ['ON-center', 'OFF-center'], rows: [
          { label: 'Small light spot on the center', cells: ['Depolarized: a barrage of spikes', 'Fewer spikes'] },
          { label: 'Small dark spot on the center', cells: ['Fewer spikes', 'More spikes'] },
          { label: 'Input from', cells: ['ON bipolar cells', 'OFF bipolar cells'] },
        ] },
        { type: 'definition', term: 'Maintained firing', body: 'Ganglion cells fire continuously, with or without light (slide 18, recordings from Troy and Shou 2002). Light raises or lowers that rate, so both increases and decreases carry information.' },
        { type: 'whyItMatters', body: 'Because the cell is already firing, a fall in rate is a signal too. Most ganglion cells respond to differences in light within their field, not to the overall light level.' },
        { type: 'misconception', wrong: 'ON cells respond while the light is on and OFF cells respond when it goes off.', right: 'ON and OFF name the direction of light change that excites the center. Turning off a light in the center is a decrease, so it excites an OFF-center cell. How long a response lasts is a separate property: some cells fire a brief burst, others keep firing while the stimulus stays.' },
      ],
      conceptQuiz: [
        {
          id: 'ganglion-1',
          prompt: 'A small light spot falls on the center of an OFF-center ganglion cell. What does it do?',
          options: [
            { text: 'Fires a barrage well above its maintained rate', feedback: 'That is the ON-center response to a light spot.' },
            { text: 'Stays silent until the light is switched on', feedback: 'Ganglion cells fire continuously, even in darkness.' },
            { text: 'Fires fewer spikes than its maintained rate', feedback: 'Correct. It fires more when a dark spot covers the center.' },
            { text: 'Keeps exactly its maintained rate throughout', feedback: 'The center is affected, so the rate changes.' },
          ],
          correct: 2,
        },
      ],
    },

    // 10 ----------------------------------------------------------------
    {
      id: 'center-surround',
      title: 'Center-surround responses to spots and to edges',
      keyTerms: ['center-surround receptive field', 'edge enhancement', 'contrast'],
      blocks: [
        { type: 'text', body: 'The surround cancels the center. A ganglion cell therefore reports how light differs inside its field, not how bright the field is.' },
        figureBlock(
          hotspots('cs-spot', 1387 / 387, 'An OFF-center receptive field under uniform light, a dark spot on the center, and a dark spot over center and surround, with the spike output under each.', SPOT_REGIONS, { gutter: 'ends' }),
          'A center-surround ganglion cell receptive field (Figure 9.27). (a, b) An OFF-center cell fires a barrage when a dark spot is imaged on its center. (c) Enlarged to the surround, the response is greatly reduced.',
          'Three tilted patches of retina with a ring and an inner circle. The second has a black spot filling the inner circle; the third a black disk covering both. Below: a few spikes, a dense barrage, and a few more spikes.'
        ),
        figureBlock(
          hotspots('cs-edge', 1600 / 372, 'A light-dark edge crossing an OFF-center field in four steps, with the output under each.', [
            { id: 'a', label: '(a) Uniform light', body: 'Center and surround cancel: a low maintained rate.', x: 21, y: 88, w: 12, h: 10, mx: 28.5, my: 95, side: 'inline', dir: 'right' },
            { id: 'b', label: '(b) Dark in the surround only', body: 'The surround gets its preferred stimulus (dark, for an OFF-center cell) and inhibits: firing drops below baseline.', x: 42, y: 88, w: 12, h: 10, mx: 50.5, my: 95, side: 'inline', dir: 'right' },
            { id: 'c', label: '(c) Dark covers the center', body: 'Full excitation from the center, only partial inhibition from the surround: the strongest response.', x: 63, y: 88, w: 12, h: 10, mx: 73, my: 95, side: 'inline', dir: 'right' },
            { id: 'd', label: '(d) Uniform dark', body: 'Center and surround cancel again: close to the rate in uniform light.', x: 84, y: 88, w: 12, h: 10, mx: 94.5, my: 95, side: 'inline', dir: 'right' },
          ], { quiz: false, gutter: 'ends' }),
          'Responses to a light-dark edge crossing an OFF-center field (Figure 9.28). The response depends on the fraction of center and surround filled by light and by dark.',
          'Four patches of retina. The dark region grows from the left: none, part of the surround, the center and most of the surround, the whole patch. Outputs: a few spikes, none, a dense barrage, a few spikes.'
        ),
        demoBlock('center-surround', CENTER_SURROUND,
          'Move a spot or an edge over an ON-center or OFF-center field and read the spike train. Drag on the patch or use the sliders. The model is center drive minus a slightly weaker surround drive; values are illustrative.',
          'A square patch of retina with a receptive field drawn as an inner circle and a dashed outer ring, and a spot or edge on it. On the right two spike trains: the ground alone and with the stimulus.'),
        { type: 'steps', title: 'From single cells to an edge (Figure 9.28 across the population)', steps: [
          'Take all the OFF-center cells whose fields lie along a stationary light-dark edge.',
          'Cells centered on the light side, with part of the surround in the dark, are inhibited.',
          'Cells centered on the dark side, with part of the surround in the light, are excited most.',
          'Cells far from the edge, in uniform light or uniform dark, sit near their maintained rate.',
          'So the output peaks and dips exactly at the edge: the contrast is emphasized, not the absolute light level.',
        ] },
        { type: 'misconception', wrong: 'Uniform light over the whole field silences a ganglion cell.', right: 'Center and surround largely cancel, so the response is weak, but the cell keeps its maintained firing. The OFF-center cell of Figure 9.28 fires at a low rate in uniform light and in uniform dark.' },
        { type: 'detail', title: 'An illusion that follows (Figure 9.29)', body: 'Two identical grey squares look different on a light and on a dark background. An ON-center field on the square with the light background gets more surround inhibition, so it fires less, which may be why that square looks darker.' },
      ],
      conceptQuiz: [
        {
          id: 'center-surround-1',
          prompt: 'Why does uniform light over the whole receptive field give only a weak response?',
          options: [
            { text: 'Photoreceptors stop releasing glutamate completely', feedback: 'Release falls in light but the key is the center-surround cancellation.' },
            { text: 'Ganglion cells respond only to moving stimuli', feedback: 'They respond to stationary spots and edges too.' },
            { text: 'Uniform light never reaches the photoreceptors', feedback: 'It reaches them; the circuit balances center against surround.' },
            { text: 'The surround cancels most of the center response', feedback: 'Correct. Center and surround are antagonistic.' },
          ],
          correct: 3,
        },
        {
          id: 'center-surround-2',
          prompt: 'A light-dark edge sits across a population of OFF-center cells. Which cells fire most?',
          options: [
            { text: 'Cells whose centers lie just on the dark side', feedback: 'Correct. Full center excitation, only partial surround inhibition.' },
            { text: 'Cells whose centers lie just on the light side', feedback: 'Those are inhibited: the dark part of their surround works against them.' },
            { text: 'Cells whose fields lie deep in the dark region', feedback: 'Uniform dark over center and surround cancels out.' },
            { text: 'Cells whose fields lie deep in the light region', feedback: 'Uniform light cancels too, leaving the maintained rate.' },
          ],
          correct: 0,
        },
      ],
    },

    // 11 ----------------------------------------------------------------
    {
      id: 'retinofugal',
      title: 'The retinofugal projection and the visual hemifields',
      keyTerms: ['retinofugal projection', 'optic nerve', 'optic chiasm', 'optic tract', 'decussation', 'visual hemifield', 'binocular visual field'],
      blocks: [
        { type: 'definition', term: 'Retinofugal projection', body: 'The pathway leaving the retina (-fugal, "fleeing"): optic nerve, optic chiasm, optic tract, in that order.' },
        figureBlock(
          hotspots('retinofugal', 640 / 734, 'The base of the brain with the eyes, optic nerves, optic chiasm and optic tracts.', RETINOFUGAL_REGIONS),
          'The retinofugal projection (Figure 10.2). View of the base of the brain.',
          'The underside of a brain with two eyeballs at the top. Their optic nerves run back and meet in an X, the chiasm, and split again into two optic tracts that curve round the cut brain stem.'
        ),
        { type: 'definition', term: 'Partial decussation', body: 'At the chiasm only the axons from the nasal retinas cross to the other side. Temporal retinal axons stay on their own side.' },
        figureBlock(
          hotspots('hemifields', 959 / 751, 'The left and right visual hemifields, the two eyes, and the optic nerves, chiasm and tracts.', HEMIFIELD_REGIONS),
          'Right and left visual hemifields (Figure 10.3). Ganglion cells in both retinas that respond to the right hemifield project into the left optic tract, and vice versa.',
          'A red left hemifield and a blue right hemifield overlap in front of the eyes around a fixation point. Lines from both halves converge on the two eyes. From the eyes, the optic nerves meet at the chiasm, and the left tract runs off blue, the right tract red.'
        ),
        { type: 'steps', title: 'Rule of thumb', steps: [
          'The left hemifield is imaged on the left nasal retina and the right temporal retina.',
          'The left nasal fibres cross at the chiasm; the right temporal fibres do not.',
          'Both end up in the right optic tract.',
          'So the right hemisphere sees the left visual hemifield, and the left hemisphere the right.',
        ] },
        demoBlock('hemifield-tracer', TRACER,
          'Click a point in either eye field chart (or use the sliders) and follow it to V1. Pick a lesion to see what each eye loses. Schematic, not to scale.',
          'Two oval field charts, left eye and right eye, each split into a red left half and a blue right half. Below, a horizontal view of both eyes, the optic nerves meeting at the chiasm, the tracts to the left and right LGN, and V1 blocks at the back. The chosen point is traced in colour.'),
        { type: 'text', body: 'To predict the field loss after a lesion, trace the retinal axons that pass the damaged point. The table follows from Figure 10.3 on slide 23; the slides do not state it.' },
        { type: 'compare', title: 'Lesion logic (complete cuts)', columns: ['Fibres cut', 'Field loss'], rows: [
          { label: 'Left optic nerve', cells: ['Everything from the left eye', 'Left eye blind; with both eyes open only the far-left strip seen by the left eye alone is lost'] },
          { label: 'Chiasm, midline', cells: ['Crossing nasal fibres of both eyes', 'Both temporal (outer) fields lost: bitemporal hemianopia, "tunnel vision"'] },
          { label: 'Left optic tract', cells: ['Right hemifield from both eyes', 'Right visual field lost in each eye'] },
        ] },
        { type: 'example', title: 'Predator versus prey (slide 23)', body: 'Forward-facing eyes, as in humans and predators, give a large binocular field (about $140^{\\circ}$ on the slide) for depth. Prey animals with eyes on the sides see almost all round, with only a small zone seen by both eyes.' },
        figureBlock(
          hotspots('binocular-fields', 1117 / 520, 'Two fields of view from above: a human with forward-facing eyes and a prey animal with eyes on the sides.', [
            { id: 'human-binocular', label: 'Binocular zone, forward-facing eyes', body: 'Seen by both eyes at once: about $140^{\\circ}$ in front of a human. The overlap gives depth.', x: 28, y: 30, w: 24, h: 14, side: 'top' },
            { id: 'human-monocular', label: 'Monocular crescent', body: 'Seen by one eye only, at the edge of each side of the field (about $30^{\\circ}$).', x: 15, y: 48, w: 10, h: 12, mx: 18, my: 50, side: 'left' },
            { id: 'human-blind', label: 'Blind area', body: 'Behind the head, seen by neither eye. The cost of forward-facing eyes.', x: 27, y: 68, w: 26, h: 18, mx: 15, my: 68, side: 'bottom' },
            { id: 'prey-binocular', label: 'Binocular zone, eyes on the sides', body: 'Only a narrow wedge in front is seen by both eyes.', x: 78, y: 22, w: 6, h: 18, mx: 78, my: 24, side: 'top' },
            { id: 'prey-total', label: 'Total field, eyes on the sides', body: 'Almost all round the animal, so an approaching predator is seen from nearly any direction.', x: 92, y: 62, w: 6, h: 16, side: 'right' },
          ], { quiz: false }),
          'Binocular fields (slide 23). Left: forward-facing human eyes give a wide binocular zone and a blind area behind. Right: a prey animal with eyes on the sides sees almost all round, but only a narrow wedge with both eyes.',
          'Two circles seen from above. Left: a human head with a large purple binocular zone in front, pale blue monocular crescents at the sides, and a dark blind area behind. Right: a long-eared animal in a large circle, with only a narrow purple wedge in front seen by both eyes.'
        ),
        { type: 'detail', title: 'Other targets of the optic tract', body: 'Most tract axons go to the LGN. About 10 percent reach the superior colliculus, which turns the eyes and head toward a stimulus. Others reach the pretectum, which sets pupil size, and, from the ipRGCs, the suprachiasmatic nucleus of the hypothalamus, which keeps circadian rhythms in step with day and night.' },
      ],
      conceptQuiz: [
        {
          id: 'retinofugal-1',
          prompt: 'Which retinal axons cross at the optic chiasm?',
          options: [
            { text: 'Axons from the temporal half of each retina', feedback: 'Temporal axons stay on their own side.' },
            { text: 'Axons from the nasal half of each retina', feedback: 'Correct. They view the temporal field, so each tract gets one hemifield.' },
            { text: 'Axons from the whole retina of each eye', feedback: 'The decussation is partial; a full crossing would give each hemisphere one eye.' },
            { text: 'Axons from the fovea of each retina only', feedback: 'The split is nasal versus temporal, on both sides of the fovea.' },
          ],
          correct: 1,
        },
        {
          id: 'retinofugal-2',
          prompt: 'Which hemisphere receives information about the right visual hemifield?',
          options: [
            { text: 'The right hemisphere, from both eyes', feedback: 'Each hemisphere sees the opposite hemifield.' },
            { text: 'The left hemisphere, from the right eye only', feedback: 'The left eye temporal retina sends the right hemifield to the left side too.' },
            { text: 'The left hemisphere, from both eyes', feedback: 'Correct. Left temporal and right nasal fibres meet in the left tract.' },
            { text: 'Both hemispheres, from the right eye only', feedback: 'The chiasm sorts by hemifield, not by eye.' },
          ],
          correct: 2,
        },
      ],
    },

    // 12 ----------------------------------------------------------------
    {
      id: 'lgn',
      title: 'The LGN, its layers and the M, P and K pathways',
      keyTerms: ['lateral geniculate nucleus', 'optic radiation', 'magnocellular', 'parvocellular', 'koniocellular', 'M-type', 'P-type'],
      blocks: [
        { type: 'text', body: 'Most optic tract axons end in the lateral geniculate nucleus (LGN) of the dorsal thalamus. LGN axons form the optic radiation to primary visual cortex (slide 24).' },
        figureBlock(
          hotspots('visual-pathway', 1601 / 692, 'The retinogeniculocortical pathway from the side and in a horizontal section.', [
            { id: 'lgn', label: 'LGN', body: 'The thalamic relay between the optic tract and the cortex.', x: 72, y: 60, w: 5, h: 6, side: 'right' },
            { id: 'radiation', label: 'Optic radiation', body: 'LGN axons fanning back to the occipital lobe.', x: 80, y: 70, w: 8, h: 10, side: 'right' },
            { id: 'v1', label: 'Primary visual cortex', body: 'At the occipital pole. Lesions anywhere on this pathway cause blindness in part of the field, so it mediates conscious perception.', x: 76, y: 88, w: 12, h: 12, side: 'right' },
          ], { quiz: false, gutter: 'all' }),
          'The visual pathway that mediates conscious visual perception (Figure 10.4). (a) Side view with the retinogeniculocortical pathway in blue. (b) Horizontal section through the same pathway.',
          'Left: a head in profile with the pathway drawn in blue from the eye to the back of the brain. Right: the two hemifields above a horizontal brain section, red and blue pathways running from the eyes through the LGN to the occipital cortex.'
        ),
        figureBlock(
          hotspots('lgn-nissl', 313 / 372, 'A Nissl-stained section of the macaque LGN showing six curved layers numbered from the bottom.', [
            { id: 'magno', label: 'Layers 1 and 2: magnocellular', body: 'The two ventral layers with larger cells.', x: 62, y: 70, w: 20, h: 20, side: 'right' },
            { id: 'parvo', label: 'Layers 3 to 6: parvocellular', body: 'The four dorsal layers with smaller cells.', x: 40, y: 30, w: 30, h: 30, side: 'left' },
          ], { quiz: false }),
          'The LGN of the macaque monkey (Figure 10.7), stained for cell bodies. Six principal layers, numbered from ventral (1) to dorsal (6).',
          'A purple-stained slice shaped like a bent knee, with six curved bands of cells separated by pale gaps; numbers 1 to 6 run from the bottom band to the top.'
        ),
        figureBlock(
          hotspots('lgn-inputs', 703 / 577, 'The two LGNs with their six layers and the four hemiretinas that feed them.', LGN_REGIONS),
          'Retinal inputs to the LGN layers (Figure 10.8). Each LGN is excited by light in the contralateral visual field, through either eye.',
          'A small brain with the two eyes; an arrow leads to an enlarged scheme. Two circles for the retinas, split into temporal and nasal halves, send coloured bundles that cross or stay and end in the layered right and left LGN.'
        ),
        { type: 'compare', title: 'Which eye feeds which layer', columns: ['Layers', 'Eye'], rows: [
          { label: 'Contralateral eye', cells: ['1, 4, 6', 'The eye on the opposite side'] },
          { label: 'Ipsilateral eye', cells: ['2, 3, 5', 'The eye on the same side'] },
          { label: 'Koniocellular K1 to K6', cells: ['Ventral to each principal layer', 'Same eye as the layer above'] },
        ] },
        figureBlock(
          hotspots('mp-cells', 342 / 416, 'A small P-type and a larger M-type ganglion cell from the same retinal location.', [
            { id: 'p', label: '(a) P-type ganglion cell', body: 'Small cell, small dendritic field.', x: 42, y: 17, w: 30, h: 24, side: 'right' },
            { id: 'm', label: '(b) M-type ganglion cell', body: 'Much larger dendritic field at the same retinal location.', x: 47, y: 65, w: 56, h: 50, side: 'right' },
          ], { quiz: false }),
          'M-type and P-type ganglion cells in the macaque retina (Figure 9.30). Scale bar $50\\,\\mu\\text{m}$.',
          'Two drawings of ganglion cells with branching dendrites: a small one above, a much larger one below.'
        ),
        { type: 'compare', title: 'Three parallel pathways', columns: ['M (magno)', 'P (parvo)', 'K (konio)'], rows: [
          { label: 'Ganglion cell type', cells: ['M-type, about 5 percent', 'P-type, about 90 percent', 'nonM-nonP, about 5 percent'] },
          { label: 'LGN layers', cells: ['1 and 2 (ventral)', '3 to 6 (dorsal)', 'K1 to K6, ventral to each layer'] },
          { label: 'Receptive field', cells: ['Large', 'Small', 'Center-surround'] },
          { label: 'Response', cells: ['Transient burst; low-contrast sensitive; fast axons', 'Sustained; many colour opponent', 'Light-dark or colour opponent'] },
          { label: 'Target in V1', cells: ['Layer IVC alpha', 'Layer IVC beta', 'Layers I and III'] },
        ] },
        figureBlock(
          hotspots('lgn-organization', 1010 / 487, 'Table of ganglion cell inputs to the LGN layers and a stained LGN with principal and koniocellular layers marked.', [
            { id: 'table', label: '(a) Inputs by layer', body: 'Eye and ganglion cell type for every LGN layer.', shape: 'rect', x: 35, y: 50, w: 70, h: 95, mx: 19, my: 26, side: 'left' },
            { id: 'k', label: '(b) Koniocellular layers', body: 'Thin pink layers K1 to K6, one below each principal layer.', x: 87, y: 55, w: 10, h: 14, side: 'right' },
          ], { quiz: false }),
          'The organization of the LGN (Figure 10.9). (a) Ganglion cell inputs to the layers. (b) A thin koniocellular layer lies ventral to each principal layer.',
          'Left: a table matching eye and ganglion cell type to LGN layers and cell types. Right: a stained LGN coloured brown for P layers, green for M layers and pink for the thin K layers.'
        ),
        { type: 'misconception', wrong: 'Each LGN serves one eye.', right: 'Each LGN receives both eyes, in separate layers, but represents only the opposite (contralateral) visual hemifield.' },
        { type: 'misconception', title: 'Slide 27: "LGN is a relay station??"', wrong: 'LGN receptive fields are almost identical to those of their ganglion cells, so the LGN just passes the signal on.', right: 'About 80 percent of the excitatory synapses on LGN neurons come from V1, and brain stem inputs tied to alertness change how strongly LGN neurons respond. The LGN relays, but not passively. One hypothesis: V1 feedback turns down signals from unattended parts of the field.' },
        { type: 'detail', title: 'Inside the LGN', body: 'Each LGN holds a retinotopic map. LGN neurons are driven mainly by one eye, and ON-center and OFF-center cells are intermixed in all layers. Magnocellular cells behave like M ganglion cells, parvocellular like P cells.' },
      ],
      conceptQuiz: [
        {
          id: 'lgn-1',
          prompt: 'Which LGN layers receive input from M-type ganglion cells?',
          options: [
            { text: 'Layers 3 to 6', feedback: 'Those are the parvocellular layers, fed by P-type cells.' },
            { text: 'Layers 1, 4, 6', feedback: 'Those are the layers of the contralateral eye, of both types.' },
            { text: 'Layers K1 to K6', feedback: 'The koniocellular layers get the nonM-nonP cells.' },
            { text: 'Layers 1 and 2', feedback: 'Correct. The two ventral, magnocellular layers.' },
          ],
          correct: 3,
        },
        {
          id: 'lgn-2',
          prompt: 'Where does most of the excitatory input to LGN neurons come from?',
          options: [
            { text: 'Primary visual cortex (feedback)', feedback: 'Correct. About 80 percent, from V1 layer VI.' },
            { text: 'Retinal ganglion cells of one eye', feedback: 'They drive the receptive field but supply only a minority of synapses.' },
            { text: 'The superior colliculus directly', feedback: 'The colliculus is a separate retinal target, not the main LGN input.' },
            { text: 'The opposite LGN across the midline', feedback: 'The two LGNs are not the main source of input to each other.' },
          ],
          correct: 0,
        },
      ],
    },

    // 13 ----------------------------------------------------------------
    {
      id: 'retinotopy',
      title: 'Retinotopy and the projection to V1',
      keyTerms: ['primary visual cortex', 'striate cortex', 'area 17', 'calcarine fissure', 'retinotopy', 'cortical magnification'],
      blocks: [
        { type: 'definition', term: 'Primary visual cortex', body: 'V1, also area 17 or striate cortex. In the occipital lobe, mostly on the medial surface around the calcarine fissure.' },
        figureBlock(
          hotspots('v1-location', 589 / 854, 'Human brain, lateral and medial views, with area 17 shaded at the occipital pole and along the calcarine fissure.', [
            { id: 'lateral', label: 'Area 17 at the occipital pole', body: 'Only a small part shows on the lateral surface.', x: 88, y: 30, w: 6, h: 8, side: 'right' },
            { id: 'calcarine', label: 'Calcarine fissure', body: 'Most of V1 lies in the banks of this fissure on the medial surface.', x: 88, y: 75, w: 10, h: 12, side: 'right' },
          ], { quiz: false }),
          'Primary visual cortex in the human brain (Figure 10.10). Top: lateral view. Bottom: medial view.',
          'Two drawings of a human brain. A green band marks area 17 at the back: a small patch on the lateral view and a long strip along the calcarine fissure on the medial view.'
        ),
        { type: 'definition', term: 'Retinotopy', body: 'Neighbouring cells in the retina feed neighbouring places in the target, so the 2D retina is mapped onto the LGN and onto V1.' },
        figureBlock(
          hotspots('retinotopy-a', 472 / 508, 'Three stacked sheets: retina, LGN and striate cortex, with neighbouring points connected to neighbouring points.', [
            { id: 'order', label: 'Neighbours stay neighbours', body: 'Three nearby retinal points connect to three nearby LGN points and on to three nearby points in layer IVC.', x: 30, y: 50, w: 40, h: 80, mx: 30, my: 30, side: 'left' },
          ], { quiz: false }),
          'The retinotopic map (Figure 10.11a). Neighbouring locations on the retina project to neighbouring locations in the LGN, and on to V1.',
          'Three green slabs, stacked: retina at the bottom, LGN in the middle, striate cortex layer IVC on top. Three vertical lines link matching points through all three.'
        ),
        figureBlock(
          hotspots('retinotopy', 792 / 694, 'A woman viewed by an observer; numbered points in the visual field map onto the retina, the LGN and the striate cortex, where the central points take most space.', [
            { id: 'field', label: 'Points 1 to 9 in the visual field', body: 'Nine points across the view, from the left edge to the raised hand.', x: 38, y: 7, w: 50, h: 10, mx: 2.5, my: 15, side: 'inline', dir: 'down' },
            { id: 'retina', label: 'Retinal image', body: 'Reversed and inverted in the eye.', x: 26, y: 26, w: 6, h: 6, side: 'left' },
            { id: 'lgn', label: 'Left LGN', body: 'The map is kept in the LGN.', x: 35, y: 46, w: 4, h: 4, side: 'left' },
            { id: 'v1', label: 'Striate cortex', body: 'The face near the centre of gaze takes up most of the map; the periphery gets a thin strip.', x: 70, y: 83, w: 30, h: 20, side: 'right' },
          ], { quiz: false }),
          'The retinotopic map in the striate cortex (Figure 10.11b). The lower part of V1 represents the upper visual field and the upper part the lower field. The map is distorted, with more tissue for the central field.',
          'An observer looks at a woman; a yellow triangle of view is numbered 1 to 9. Lines lead through the eyes and optic tracts to a horizontal brain section, where the striate cortex shows a distorted copy of the woman with her face enlarged.'
        ),
        { type: 'steps', title: 'Three points about the map', steps: [
          { title: 'Cortical magnification.', body: 'The central few degrees of the field take far more V1 tissue than an equal area of periphery, because far more ganglion cells serve the fovea. In humans the centre maps near the occipital pole, the periphery further forward along the calcarine fissure.' },
          { title: 'Upside down.', body: 'Upper visual field below the calcarine fissure, lower field above it. Left field in the right V1.' },
          { title: 'No picture.', body: 'A point of light activates a broad population with a peak at the matching place. Perception reads patterns of activity, not a snapshot.' },
        ] },
        { type: 'whyItMatters', body: 'Retinotopy lets a neurologist read the location of a lesion from the shape of a field defect. Similar maps exist in the superior colliculus, the LGN and other visual areas.' },
      ],
      conceptQuiz: [
        {
          id: 'retinotopy-1',
          prompt: 'Why does the fovea take up a large share of V1 though it is a tiny part of the retina?',
          options: [
            { text: 'Foveal cones are larger than cones anywhere else', feedback: 'Foveal cones are small and tightly packed.' },
            { text: 'Far more ganglion cells serve the fovea than the periphery', feedback: 'Correct. The cortical map follows the density of ganglion cells.' },
            { text: 'Rods in the fovea need extra cortex for dim light', feedback: 'The central fovea has no rods.' },
            { text: 'The optic disk sends its fibres only to the pole', feedback: 'All axons leave at the optic disk; that says nothing about map size.' },
          ],
          correct: 1,
        },
      ],
    },

    // 14 ----------------------------------------------------------------
    {
      id: 'ocular-dominance',
      title: 'Ocular dominance columns',
      keyTerms: ['ocular dominance column', 'transneuronal autoradiography', 'binocular'],
      blocks: [
        { type: 'text', body: 'Left eye and right eye LGN inputs do not mix when they reach V1. Hubel and Wiesel showed this in the 1970s.' },
        figureBlock(
          hotspots('autoradiography', 705 / 541, 'Radioactive proline injected into one eye travels to the LGN and on to the striate cortex, in five numbered steps.', [
            { id: 'inject', label: '1 Injection into one eye', body: 'Radioactive proline is injected into one eye.', x: 17, y: 88, w: 8, h: 8, side: 'left' },
            { id: 'uptake', label: '2 Taken up by ganglion cells', body: 'Retinal ganglion cells take up the proline and build it into proteins.', x: 33, y: 88, w: 12, h: 8, side: 'bottom' },
            { id: 'transport', label: '3 Transported to the LGN', body: 'The labelled proteins travel down the ganglion cell axons to the LGN.', x: 35, y: 60, w: 8, h: 12, side: 'left' },
            { id: 'lgn', label: '4 Taken up by LGN neurons', body: 'Some label spills from the retinal terminals and enters only the LGN neurons of that eye, in its own layers.', x: 68, y: 30, w: 8, h: 8, side: 'right' },
            { id: 'cortex', label: '5 Carried to the cortex', body: 'Those LGN neurons carry the label to their terminals in layer IVC of the striate cortex.', x: 77, y: 2, w: 20, h: 4, mx: 87.5, my: 2.5, side: 'right' },
          ], { quiz: false, gutter: 'all' }),
          'Transneuronal autoradiography (Figure 10.15): (1) injection, (2) uptake by ganglion cells, (3) transport to the LGN, (4) uptake by LGN neurons, (5) transport to the striate cortex, then autoradiography.',
          'A syringe injects an eye; arrows carry the label up the optic nerve into the layered LGN, where labelled cells in alternate layers send arrows up to the cortex.'
        ),
        figureBlock(
          hotspots('od-stripes', 382 / 517, 'Ocular dominance columns in layer IV: patches in cross section and stripes from above.', [
            { id: 'patches', label: 'Patches about 0.5 mm wide', body: 'Cut perpendicular to the surface, one eye input forms patches about $0.5\\,\\text{mm}$ wide in layer IV.', x: 50, y: 28, w: 60, h: 8, side: 'right' },
            { id: 'stripes', label: 'Zebra stripes from above', body: 'Cut parallel to layer IV, the labelled eye appears as bright stripes alternating with the unlabelled eye.', x: 50, y: 75, w: 80, h: 40, side: 'right' },
          ], { quiz: false }),
          'Ocular dominance columns in layer IV (Figure 10.16). (a) Peeled layers: one eye input shaded blue. (b) Autoradiograph of layer IV seen from above.',
          'Top: a block of cortex with the upper layers peeled back, showing blue stripes in layer IV. Bottom: a black and white photo with wavy bright stripes.'
        ),
        figureBlock(
          hotspots('od-human', 574 / 496, 'Human occipital cortex with dark stripes of ocular dominance on its surface.', [
            { id: 'stripes', label: 'Stripes in human V1', body: 'The same alternating bands, revealed in a human brain after loss of input from one eye.', x: 55, y: 64, w: 50, h: 20, side: 'right' },
          ], { quiz: false }),
          'Ocular dominance stripes in the human visual cortex (slide 30). Scale bar 1 cm.',
          'Photograph of the surface of a human occipital lobe with black zebra-like stripes along the calcarine region.'
        ),
        figureBlock(
          hotspots('od-mixing', 624 / 554, 'Layer IVC receives separate left and right eye inputs; layer III above mixes them, forming alternating columns.', OD_REGIONS),
          'The mixing of information from the two eyes (Figure 10.17). Axons from layer IVC project up to layer III, where most neurons get input from both eyes, dominated by one.',
          'A layered block. Two input axons, left and right eye, branch in layer IVC. Arrows go up from each branch to circles in layer III: blue above the left eye input, red above the right, purple where they meet. Dotted lines mark the column borders.'
        ),
        { type: 'steps', title: 'From monocular to binocular', steps: [
          'LGN neurons of each eye end in separate patches of layer IVC; IVC neurons are monocular.',
          'IVC stellate cells project radially up to layers IVB and III.',
          'Here, for the first time, left and right eye information mixes: most neurons are binocular.',
          'Above a left eye patch, neurons are dominated by the left eye; radial wiring carries this through the depth of the cortex.',
          'The result: alternating bands of left and right dominance through the full thickness, the ocular dominance columns.',
        ] },
        { type: 'misconception', wrong: 'An ocular dominance column is a pathway for one eye only.', right: 'Only layer IVC is monocular. Most neurons in layers II, III, V and VI are binocular: either eye drives them, one usually more strongly. Eye preference is measured by recording while stimulating each eye separately.' },
        { type: 'whyItMatters', body: 'Binocular neurons have two receptive fields, one per eye, looking at the same point in space. Without them we could not merge the two images or see depth well enough to thread a needle.' },
      ],
      conceptQuiz: [
        {
          id: 'ocular-dominance-1',
          prompt: 'Where do inputs from the two eyes first converge on single neurons?',
          options: [
            { text: 'The LGN, where the two eyes share each layer', feedback: 'Each LGN layer gets one eye only.' },
            { text: 'Layer IVC of V1, where the LGN axons end', feedback: 'IVC keeps the eyes in separate patches.' },
            { text: 'Layers above IVC in V1, such as layer III', feedback: 'Correct. LGN and IVC neurons are still monocular.' },
            { text: 'The optic chiasm, where the fibres cross', feedback: 'Fibres cross there but do not synapse.' },
          ],
          correct: 2,
        },
      ],
    },

    // 15 ----------------------------------------------------------------
    {
      id: 'cortical-layers',
      title: 'The six-layered neocortex: basic projection rules',
      keyTerms: ['thalamocortical', 'corticocortical', 'corticothalamic', 'spiny stellate cell', 'pyramidal cell'],
      blocks: [
        { type: 'text', body: 'V1 has about six layers (really at least nine: IV splits into IVA, IVB, IVC alpha and IVC beta). Each layer has its own inputs and outputs.' },
        figureBlock(
          hotspots('cortex-layers', 1011 / 620, 'The layers of V1 with pyramidal and stellate cells on the left, and the output of each layer on the right.', CORTEX_REGIONS),
          'Cells and outputs of the striate cortex (Figures 10.13 and 10.18). Pyramidal cells in III, IVB, V and VI; spiny stellate cells in IVC. Arrows show where each layer sends its axons.',
          'Left: a blue striped column with roman numerals I to VI and black neurons, tall pyramidal cells in several layers and small star-shaped cells in IVC. Right: the same layers with arrows leaving from III, IVB, V and VI down into the white matter.'
        ),
        { type: 'compare', title: 'Projection rules (slide 32)', columns: ['Connection', 'Goes to or comes from'], rows: [
          { label: 'Layer IV', cells: ['Input (thalamocortical)', 'From the thalamus: LGN axons end mainly in IVC'] },
          { label: 'Layer III', cells: ['Output (corticocortical)', 'To other cortical areas'] },
          { label: 'Layer V', cells: ['Widespread white matter output', 'To the superior colliculus and pons'] },
          { label: 'Layer VI', cells: ['Specific corticothalamic feedback', 'Back to the LGN'] },
        ] },
        { type: 'definition', term: 'Spiny stellate and pyramidal cells', body: 'Spiny stellate cells sit in IVC and make local connections. Pyramidal cells, with one apical dendrite toward the pia, send the axons that leave the cortex.' },
        { type: 'detail', title: 'Streams inside V1', body: 'Magnocellular LGN input goes to IVC alpha, which projects to IVB. Parvocellular input goes to IVC beta, which projects to III. Koniocellular axons end in layers I and III. Layer I has almost no neurons.' },
        { type: 'detail', title: 'Radial and horizontal connections', body: 'Radial connections run across the layers and keep one retinotopic location aligned through the depth. Some layer III pyramidal axons also branch sideways within layer III. Pyramidal axons give off local branches, and inhibitory neurons connect locally in every layer.' },
      ],
      conceptQuiz: [
        {
          id: 'cortical-layers-1',
          prompt: 'Which V1 layer sends the feedback projection to the LGN?',
          options: [
            { text: 'Layer V', feedback: 'Layer V projects to the superior colliculus and pons.' },
            { text: 'Layer III', feedback: 'Layer III sends axons to other cortical areas.' },
            { text: 'Layer IV', feedback: 'Layer IV receives the thalamic input.' },
            { text: 'Layer VI', feedback: 'Correct. Specific corticothalamic feedback.' },
          ],
          correct: 3,
        },
      ],
    },

    // 16 ----------------------------------------------------------------
    {
      id: 'orientation',
      title: 'Orientation selectivity and the simple cell',
      keyTerms: ['orientation selectivity', 'orientation tuning curve', 'simple cell', 'complex cell', 'direction selectivity', 'orientation column'],
      blocks: [
        { type: 'text', body: 'In V1, features emerge: from point-like ON and OFF center fields to fields for orientations and contours (slide 33).' },
        figureBlock(
          hotspots('orientation', 1019 / 913, 'Recording from a V1 neuron while bars of light at different orientations cross its receptive field.', [
            { id: 'setup', label: '(a) The recording', body: 'A microelectrode in striate cortex records spikes while a bar of light is shown in the receptive field on a screen.', x: 25, y: 45, w: 40, h: 40, side: 'left' },
            { id: 'best', label: 'Best: 45° counterclockwise from vertical', body: 'The bar tilted $45^{\\circ}$ to the left gives the strongest discharge.', x: 74, y: 52, w: 10, h: 10, side: 'right' },
            { id: 'worst', label: 'Perpendicular bar: no response', body: 'The bar at right angles to the best one gives almost nothing.', x: 74, y: 12, w: 10, h: 10, side: 'right' },
          ], { quiz: false }),
          'Orientation selectivity (Figure 10.20). Light bars of various orientations elicit very different responses. The optimal orientation for this neuron is $45^{\\circ}$ counterclockwise from vertical.',
          'Left: a monkey brain section with an electrode in the striate cortex and a screen showing a tilted yellow bar. Right: six bars at different angles over a square receptive field, each with its spike train: the tilted-left bar gives a dense burst, the opposite tilt gives none.'
        ),
        { type: 'definition', term: 'Orientation selectivity', body: 'The strongest response to a bar at one orientation, much weaker to the perpendicular one. Many V1 neurons show it, while many layer IVC neurons keep center-surround fields. The preferred angle can be anything round the clock.' },
        { type: 'definition', term: 'Orientation tuning curve', body: 'Firing rate plotted against bar angle. Its peak is the preferred orientation; its width says how sharply the cell is tuned.' },
        { type: 'detail', title: 'Slide 34: the video "Cortical neurons V1"', body: 'The clip is not available on this site. According to the TA notes it shows light bars at different angles and positions, maps the ON and OFF regions of a field, and sweeps light-dark edges across it. At about 500 seconds it shows a hypercomplex cell, an old term for end stopping: a bar longer than the excitatory region gives less firing. No question here depends on the clip.' },
        figureBlock(
          hotspots('simple-cell', 1419 / 382, 'A simple cell: responses to bars at three positions and a wiring scheme of three LGN cells feeding one layer IVC neuron.', [
            { id: 'on', label: 'Middle bar: ON response', body: 'The bar in the middle of the field gives spikes while the light is on.', x: 22, y: 50, w: 10, h: 12, side: 'left' },
            { id: 'off', label: 'Flanking bars: OFF responses', body: 'Bars on either side give spikes when the light goes off: antagonistic flanks.', x: 22, y: 20, w: 10, h: 12, side: 'left' },
            { id: 'lgn', label: 'Three aligned LGN fields', body: 'Center-surround fields lying in a row.', x: 75, y: 35, w: 40, h: 25, side: 'right' },
            { id: 'ivc', label: 'Layer IVC alpha neuron', body: 'Receives convergent input from the three LGN neurons.', x: 75, y: 92, w: 4, h: 8, side: 'right' },
          ], { quiz: false, gutter: 'all' }),
          'A simple cell receptive field (Figure 10.23). (a) The response can be ON or OFF depending on where the bar lies. (b) Such a field might be built from convergent inputs of three LGN neurons with aligned center-surround fields.',
          'Left: a tilted rectangle with three yellow bars, and three spike trains: dense spikes at light onset for the middle bar, spikes at light offset for the outer bars. Right: an orange patch with three overlapping circles marked ON inside and OFF outside, and three purple LGN cells converging on one orange cortical neuron.'
        ),
        demoBlock('simple-cell', SIMPLE,
          'Rotate and shift the light bar. Each LGN cell fires according to its own center-surround balance; the simple cell sums them and fires only above a threshold. Scatter the fields to see the orientation preference vanish. Values are illustrative.',
          'A dark square with three ON-center fields in a vertical row and a light bar across them. Right: three small LGN spike trains, the simple cell spike train, and a tuning curve of simple cell rate against bar orientation with the current angle marked.'),
        { type: 'steps', title: 'How three dots make a line (Hubel and Wiesel)', steps: [
          'Three LGN ON-center cells have fields lying in a row.',
          'A bar along the row covers all three centers: all three fire and the sum clears the threshold.',
          'A bar across the row covers one center and falls on the surrounds of the others: the sum stays low.',
          'The simple cell therefore has an elongated ON region flanked by OFF regions, and prefers one orientation.',
        ] },
        { type: 'compare', title: 'Three kinds of receptive field', columns: ['Ganglion or LGN cell', 'Simple cell', 'Complex cell'], rows: [
          { label: 'Shape', cells: ['Roughly circular center and surround', 'Elongated ON and OFF regions side by side', 'No separate ON and OFF regions'] },
          { label: 'Orientation', cells: ['Any orientation works about equally', 'Prefers one orientation', 'Prefers one orientation'] },
          { label: 'Bar position', cells: ['Matters: center or surround', 'Matters: ON region or OFF flank', 'Responds to on and off across the field'] },
        ] },
        { type: 'definition', term: 'Direction selectivity', body: 'A stronger response to a bar moving one way than to the same bar moving the opposite way. Some simple and complex cells show it. Orientation is the angle of the bar; direction is the way it moves.' },
        { type: 'detail', title: 'Orientation columns', body: 'Moving an electrode straight down, the preferred orientation stays the same through all layers: an orientation column. Across the surface it shifts, about $180^{\\circ}$ per millimetre.' },
      ],
      conceptQuiz: [
        {
          id: 'orientation-1',
          prompt: 'What defines a simple cell?',
          options: [
            { text: 'Separate ON and OFF regions side by side in an elongated field', feedback: 'Correct. The arrangement makes it orientation selective.' },
            { text: 'A circular center and surround exactly like an LGN neuron', feedback: 'That describes LGN and many layer IVC cells, not simple cells.' },
            { text: 'ON and OFF responses anywhere in its field to a well-placed bar', feedback: 'That describes a complex cell.' },
            { text: 'Selective responses to faces seen from any direction or distance', feedback: 'Face cells live far up the ventral stream, in IT.' },
          ],
          correct: 0,
        },
      ],
    },

    // 17 ----------------------------------------------------------------
    {
      id: 'streams',
      title: 'Beyond V1: the extrastriate hierarchy and two streams',
      keyTerms: ['extrastriate', 'dorsal stream', 'ventral stream', 'MT', 'V4', 'IT'],
      blocks: [
        { type: 'text', body: 'V1 feeds more than two dozen extrastriate areas. They seem to fall into two large streams (slide 36).' },
        figureBlock(
          hotspots('streams', 733 / 436, 'Macaque brain with the dorsal stream arrow toward the parietal lobe and the ventral stream arrow toward the temporal lobe.', [
            { id: 'dorsal', label: 'Dorsal stream', body: 'From V1 up toward the parietal lobe: visual motion and the visual control of action.', x: 55, y: 30, w: 10, h: 10, side: 'right' },
            { id: 'ventral', label: 'Ventral stream', body: 'From V1 down toward the temporal lobe: perception and recognition of objects.', x: 50, y: 70, w: 10, h: 10, side: 'right' },
          ], { quiz: false }),
          'Dorsal and ventral visual processing streams in the macaque (Figure 10.27a).',
          'A monkey brain in side view, the back shaded blue. From V1 at the back, one arrow curves up and forward, the other down and forward into the temporal lobe.'
        ),
        figureBlock(
          hotspots('extrastriate', 651 / 413, 'Macaque brain with extrastriate areas coloured and numbered.', AREA_REGIONS),
          'Extrastriate visual areas in the macaque (Figure 10.27b). Part of the brain is cut away to show areas hidden in sulci.',
          'A monkey brain with the occipital lobe in yellow (V1), a thin band in front of it (V2), small blue and green patches in a sulcus (MST and MT), a magenta patch below (V4) and an orange strip along the bottom of the temporal lobe (IT).'
        ),
        figureBlock(
          hotspots('stream-flow', 775 / 328, 'Flow diagram: V1 to V2 to V3; MT to MST to other dorsal areas; V4 to IT to other ventral areas.', [
            { id: 'mt', label: 'MT', body: 'Receives from V1, V2 and V3. Linked both ways with V4.', x: 65, y: 24, w: 6, h: 10, mx: 65, my: 19, side: 'top' },
            { id: 'v4', label: 'V4', body: 'Receives from V2 and V3; projects to IT.', x: 65, y: 67, w: 6, h: 10, mx: 65, my: 72, side: 'bottom' },
          ], { quiz: false }),
          'The flow of information in the dorsal and ventral streams (Figure 10.27c).',
          'Boxes and arrows. V1 to V2 to V3. From these, arrows to MT and V4. MT to MST to other dorsal areas; V4 to IT to other ventral areas; MT and V4 linked both ways.'
        ),
        { type: 'compare', title: 'Two streams', columns: ['Dorsal stream', 'Ventral stream'], rows: [
          { label: 'Route', cells: ['V1 toward the parietal lobe', 'V1 toward the temporal lobe'] },
          { label: 'Key areas', cells: ['MT (V5), MST', 'V4, IT'] },
          { label: 'Function', cells: ['Motion, visual control of action', 'Perception, object recognition'] },
          { label: 'Typical cells', cells: ['MT: one direction of motion. MST: straight, expanding, contracting or rotating motion', 'V4: colour and edge orientation. IT: complex shapes and faces'] },
          { label: 'Loss in humans', cells: ['Motion blindness after damage near MT', 'Achromatopsia; prosopagnosia (faces)'] },
        ] },
        figureBlock(
          hotspots('wiring', 851 / 1201, 'A dense wiring diagram of about 30 visual areas from retinal ganglion cells at the bottom to hippocampus at the top.', [
            { id: 'rgc', label: 'M and P from the retina', body: 'At the bottom: M and P ganglion cells (RGC), then LGN, V1, V2.', x: 45, y: 95, w: 30, h: 6, side: 'left' },
            { id: 'top', label: 'Hippocampus at the top', body: 'Visual information eventually reaches memory structures (ER, HC).', x: 79, y: 1, w: 8, h: 3, side: 'right' },
          ], { quiz: false }),
          'Slide 37, "But...": the real wiring of the macaque visual system. Many areas, many connections in both directions.',
          'A tall diagram of coloured boxes for visual areas stacked in levels, joined by a dense web of black and pink lines.'
        ),
        { type: 'misconception', wrong: 'Vision is a simple two-lane conveyor belt: V1 to MT for motion, V1 to IT for objects.', right: 'The streams are a useful simplification. MT gets input from V1 directly and through V2 and V3, and MT and V4 connect both ways. The area numbers do not mean every signal passes every area in order.' },
        figureBlock(
          hotspots('human-areas', 767 / 969, 'Human brain, medial and lateral views, with visual areas coloured.', [
            { id: 'early', label: 'Early areas: V1, V2, V3, V3A, V4', body: 'On the medial occipital surface, shifted medially compared with the monkey. All retinotopic.', x: 80, y: 20, w: 20, h: 20, side: 'right' },
            { id: 'faces', label: 'Face and object recognition areas', body: 'On the underside of the temporal lobe. Not retinotopic.', x: 48, y: 30, w: 20, h: 8, side: 'left' },
            { id: 'v5', label: 'V5 (motion)', body: 'On the lateral surface. The human equivalent of MT.', x: 57, y: 68, w: 8, h: 6, side: 'right' },
          ], { quiz: false }),
          'Visual areas in the human brain (Figure 10.28). (a) Medial view. (b) Lateral view with V5.',
          'Two human brains. Top, medial view: coloured bands V1, V2, V3, V3A, V4 at the back and a blue region along the bottom labelled face and object recognition areas. Bottom, lateral view: a pink spot labelled V5 (motion).'
        ),
      ],
      conceptQuiz: [
        {
          id: 'streams-1',
          prompt: 'After a stroke a patient sees the world as snapshots: coffee seems frozen, then suddenly overflows. Where is the damage?',
          options: [
            { text: 'Inferior temporal cortex, in the ventral stream', feedback: 'IT damage affects object and face recognition.' },
            { text: 'Extrastriate cortex near MT, in the dorsal stream', feedback: 'Correct. MT neurons are almost all direction selective.' },
            { text: 'The koniocellular layers of both LGNs together', feedback: 'LGN damage would cause blindness in part of the field.' },
            { text: 'Area V4, in the ventral stream toward the temporal lobe', feedback: 'V4 damage affects colour and shape.' },
          ],
          correct: 1,
        },
      ],
    },

    // 18 ----------------------------------------------------------------
    {
      id: 'principles',
      title: 'Organizational principles: complexity, latency, receptive field size',
      keyTerms: ['invariance', 'latency'],
      blocks: [
        { type: 'text', body: 'Going up the ventral stream from V1 to anterior IT, three things rise together (slide 39).' },
        figureBlock(
          chart(HIERARCHY, 'Latency and receptive field size ranges for V1, V2, V4, PIT and AIT.'),
          'Values from the slide. Latency climbs by about $10\\,\\text{ms}$ per stage; receptive field size (log scale) grows from about a degree in V1 to up to $70^{\\circ}$ in AIT. PIT and AIT are the posterior and anterior parts of IT.',
          'Two small panels sharing rows V1, V2, V4, PIT, AIT. Latency: 40 to 60, 50 to 70, 60 to 80, 70 to 90, 80 to 100 ms. Receptive field size: 0.5 to 1.5, 0.5 to 4, 1 to 20, 2 to 25, 2.5 to 70 degrees. A column of best stimuli: oriented bars, contours, shapes, object parts, whole objects and faces.'
        ),
        figureBlock(
          hotspots('hierarchy', 851 / 468, 'The slide diagram: stimulus icons at each level from V1 to AIT with bottom-up, top-down and lateral arrows.', [
            { id: 'arrows', label: 'Bottom-up, top-down, lateral', body: 'Information flows up, but also back down and sideways between neighbours.', x: 20, y: 48, w: 14, h: 20, mx: 24, my: 53, side: 'inline', dir: 'down' },
            { id: 'invariance', label: 'Invariance and plasticity rise', body: 'Higher cells respond to an object wherever and however large it appears, and their tuning is more changeable with experience.', x: 5, y: 50, w: 8, h: 90, mx: 10.5, my: 30, side: 'inline', dir: 'right' },
            { id: 'top', label: 'Higher polymodal areas', body: 'Above AIT: medial temporal lobe (MTL) and prefrontal cortex (PFC).', x: 40, y: 2, w: 32, h: 4, mx: 56, my: 2.5, side: 'inline', dir: 'right' },
          ], { quiz: false }),
          'Organizational principles (slide 39). From simple features at V1 to objects at AIT.',
          'A pyramid of circles with icons: small bars and dots at the bottom (V1), curves and textures in the middle, a hand and shapes higher, and a monkey face, flower, jug, puma and balloons at the top (AIT). Arrows labelled bottom-up, top-down and lateral.'
        ),
        { type: 'steps', title: 'The hierarchy in one line each', steps: [
          { title: 'Complexity rises:', body: 'spots in the retina, bars in V1, contours in V2, shapes in V4, objects and faces in IT.' },
          { title: 'Latency rises:', body: 'about $40\\text{-}60\\,\\text{ms}$ in V1 to $80\\text{-}100\\,\\text{ms}$ in AIT, since each stage adds synapses.' },
          { title: 'Receptive field size rises:', body: 'from $0.5\\text{-}1.5^{\\circ}$ in V1 to as much as $70^{\\circ}$ in AIT, bringing invariance to position and size.' },
        ] },
        { type: 'definition', term: 'Invariance (tolerance)', body: 'Keeping the information about what an object is when its image on the retina changes, for example in position or size.' },
        { type: 'misconception', wrong: 'At the top sits a "grandmother cell" that fires for one person only.', right: 'The closest are face-selective IT neurons, and even they respond to more than one face and to some other stimuli. A preference is not an exclusive function. Perception rests on patterns across many neurons and areas.' },
      ],
      conceptQuiz: [
        {
          id: 'principles-1',
          prompt: 'Compared with V1, how do neurons in anterior IT differ?',
          options: [
            { text: 'Smaller fields, longer latency, more complex stimuli', feedback: 'Fields grow, up to about $70^{\\circ}$ in AIT.' },
            { text: 'Larger fields, shorter latency, more complex stimuli', feedback: 'Every stage adds delay: $80\\text{-}100\\,\\text{ms}$ in AIT.' },
            { text: 'Larger fields, longer latency, more complex stimuli', feedback: 'Correct. All three rise up the hierarchy.' },
            { text: 'Larger fields, longer latency, simpler stimuli', feedback: 'IT cells prefer complex shapes and faces.' },
          ],
          correct: 2,
        },
      ],
    },

    // 19 ----------------------------------------------------------------
    {
      id: 'fmri',
      title: 'fMRI as a tool: face areas in the human brain',
      keyTerms: ['fMRI', 'BOLD signal', 'fusiform face area', 'occipital face area', 'prosopagnosia'],
      blocks: [
        { type: 'text', body: 'Single neurons are recorded in monkeys. In humans, functional MRI finds the areas that correspond, by comparing brain activity across stimuli.' },
        { type: 'definition', term: 'BOLD signal', body: 'The blood-oxygen-level-dependent signal that fMRI measures. Active neurons draw more blood and oxygen, which changes the ratio of oxygenated to deoxygenated hemoglobin. It is an indirect, regional measure: one voxel of a few cubic millimetres holds many thousands of cells, and the blood response is delayed and spread over seconds.' },
        figureBlock(
          hotspots('faces', 970 / 373, 'fMRI: a horizontal slice through the temporal lobes with face-selective areas highlighted.', [
            { id: 'ffa', label: 'FFA: fusiform face area', body: 'On the fusiform gyrus. Responds more to faces than to other objects, usually more on the right.', x: 72, y: 49, w: 6, h: 12, side: 'inline', dir: 'right' },
            { id: 'ofa', label: 'OFA: occipital face area', body: 'Further back, also face selective.', x: 71, y: 70, w: 8, h: 18, mx: 72, my: 68, side: 'inline', dir: 'right' },
            { id: 'afp2', label: 'AFP2: anterior face patch 2', body: 'Further forward in the temporal lobe.', x: 72, y: 25, w: 4, h: 8, side: 'inline', dir: 'down-right' },
          ], { quiz: false }),
          'Human brain activity elicited by pictures of faces (Figure 10.29). (a) The fusiform face area responds more to faces than to non-faces. (b) Newer methods reveal several face-selective areas: OFA, FFA, AFP2.',
          'Left: a sagittal MRI with lines marking a horizontal slice, and that slice with red and yellow blobs in both temporal lobes. Right: a horizontal MRI slice with yellow patches labelled AFP2, FFA and OFA on each side.'
        ),
        { type: 'steps', title: 'How the face areas were found', steps: [
          'Scan people while they look at faces, then while they look at other objects.',
          'Subtract: find voxels that respond significantly more to faces.',
          'A consistent spot appears on the fusiform gyrus: the fusiform face area.',
          'Test it against other explanations; later methods reveal about half a dozen face patches.',
        ] },
        { type: 'whyItMatters', body: 'Face-selective neurons in monkey IT and face areas in human fMRI point to the same system. Damage there can cause prosopagnosia: difficulty recognizing faces while vision is otherwise normal.' },
        { type: 'misconception', wrong: 'A region with a stronger BOLD response to faces is made of neurons that respond only to faces.', right: 'It shows a regional preference for faces under the tested conditions. BOLD is not a spike recording, so it cannot show that every neuron is face selective or that the region works alone.' },
        { type: 'compare', title: 'Four methods, four kinds of evidence', columns: ['What it shows', 'Example in this lecture'], rows: [
          { label: 'Anatomical tracing', cells: ['Where axons go', 'Proline from one eye marks its LGN terminals in V1'] },
          { label: 'Single-cell recording', cells: ['What one neuron responds to', 'Receptive fields, orientation, face cells in monkey IT'] },
          { label: 'Lesion', cells: ['Whether a structure is needed', 'Field loss after a cut; prosopagnosia'] },
          { label: 'fMRI', cells: ['Which human regions prefer a stimulus', 'FFA responds more to faces than to objects'] },
        ] },
        { type: 'text', body: 'A claim about what an area does is strongest when several of these methods agree.' },
      ],
      conceptQuiz: [
        {
          id: 'fmri-1',
          prompt: 'How does fMRI identify the fusiform face area?',
          options: [
            { text: 'By recording single neurons in the human fusiform gyrus', feedback: 'fMRI measures blood-flow related signals, not single cells.' },
            { text: 'By finding the area with the most activity during any vision', feedback: 'It needs a comparison between stimulus classes.' },
            { text: 'By staining the tissue for cells with face-shaped dendrites', feedback: 'fMRI works in living people, without staining.' },
            { text: 'By contrasting activity for faces with activity for other objects', feedback: 'Correct. The area is defined by a stronger response to faces.' },
          ],
          correct: 3,
        },
        {
          id: 'fmri-2',
          prompt: 'What does the BOLD signal measured by fMRI reflect?',
          options: [
            { text: 'The spikes of single neurons in each voxel', feedback: 'fMRI cannot resolve single neurons or single spikes.' },
            { text: 'Blood oxygenation changes that follow activity', feedback: 'Correct. An indirect, regional and slow measure.' },
            { text: 'Uptake of a radioactive glucose tracer', feedback: 'That is PET with 2-deoxyglucose, not fMRI.' },
            { text: 'The direction of axons between two areas', feedback: 'Axon routes come from anatomical tracing.' },
          ],
          correct: 1,
        },
      ],
    },
  ],

  recap: {
    terms: [
      { term: 'Cornea and lens', definition: 'Cornea: most refraction, fixed. Lens: adjustable refraction.' },
      { term: 'Accommodation', definition: 'Near: ciliary muscle contracts, zonules slack, lens rounds. Far: relaxes, lens flat.' },
      { term: 'Active sensing', definition: 'Muscles rotate (extraocular) and focus (ciliary) the eye.' },
      { term: 'Optic disk', definition: 'Axon exit, no photoreceptors: the blind spot. Brain fills it in.' },
      { term: 'Visual field', definition: 'Space seen with the eye fixated ahead: about $100^{\\circ}$ temporal, $60^{\\circ}$ nasal.' },
      { term: 'Visual angle', definition: 'Size in degrees at the eye. Moon $0.5^{\\circ}$; $1\\,\\text{mm}$ of retina about $3.5^{\\circ}$.' },
      { term: 'Retinal layers', definition: 'From light entry: GCL, IPL, INL, OPL, ONL, outer segments, pigmented epithelium.' },
      { term: 'Fovea', definition: 'Pit where upper layers are pushed aside; cones only; highest acuity.' },
      { term: 'Rods and cones', definition: 'Rods: periphery, dim light, high convergence. Cones: fovea, daylight, colour.' },
      { term: 'Three retinal rules', definition: 'Only rods and cones sense light; ganglion cells are the only output and only spike.' },
      { term: 'Receptive field', definition: 'Region of the sensory surface where a stimulus changes the firing.' },
      { term: 'ON and OFF bipolar', definition: 'Light cuts glutamate. OFF (ionotropic) hyperpolarizes; ON (mGluR6, metabotropic) depolarizes.' },
      { term: 'Center-surround', definition: 'Surround via horizontal cells opposes the center; uniform light nearly cancels.' },
      { term: 'ON and OFF-center ganglion', definition: 'Fire continuously; ON up for light center, OFF up for dark center. Uniform light: weak, not silent.' },
      { term: 'Edge enhancement', definition: 'Cells straddling an edge fire most or least: contrast, not level, is signalled.' },
      { term: 'Retinofugal projection', definition: 'Optic nerve, chiasm (nasal fibres cross), optic tract.' },
      { term: 'Visual hemifields', definition: 'Left hemifield to the right hemisphere through both eyes, and vice versa.' },
      { term: 'Lesions', definition: 'Nerve: one eye blind. Chiasm: bitemporal. Tract or V1: opposite hemifield.' },
      { term: 'LGN layers', definition: 'Both eyes, opposite hemifield. Contralateral eye 1, 4, 6; ipsilateral 2, 3, 5. M 1-2, P 3-6, K ventral.' },
      { term: 'M, P and K pathways', definition: 'M: large fields, transient. P: small, sustained, colour. K: nonM-nonP.' },
      { term: 'LGN not only a relay', definition: '80 percent of excitatory synapses from V1 plus brain stem modulation.' },
      { term: 'Retinotopy', definition: 'Neighbours map to neighbours; upper field below calcarine.' },
      { term: 'Cortical magnification', definition: 'Central few degrees take most of V1, at the occipital pole in humans.' },
      { term: 'Ocular dominance columns', definition: 'Alternating left and right eye bands; IVC monocular, layer III binocular.' },
      { term: 'V1 layer rules', definition: 'IV thalamic input; III to cortex; V to colliculus and pons; VI to LGN.' },
      { term: 'Orientation selectivity', definition: 'Best response to one bar angle; perpendicular bars give little.' },
      { term: 'Simple cell', definition: 'Elongated ON and OFF regions; built from aligned LGN fields.' },
      { term: 'Complex cell', definition: 'Prefers an orientation; no separate ON and OFF regions.' },
      { term: 'Direction selectivity', definition: 'Stronger response to one direction of motion. Orientation is angle, direction is movement.' },
      { term: 'Dorsal stream', definition: 'V1 to parietal, via MT and MST: motion and action.' },
      { term: 'Ventral stream', definition: 'V1 to temporal, via V4 and IT: objects, colour, faces.' },
      { term: 'Hierarchy', definition: 'Up the ventral stream: complexity, latency ($40\\text{-}100\\,\\text{ms}$) and field size rise.' },
      { term: 'Invariance', definition: 'Object identity kept despite changes in retinal position or size.' },
      { term: 'BOLD fMRI', definition: 'Blood-oxygenation signal: indirect, regional, slow. Not single neurons.' },
      { term: 'Face areas (fMRI)', definition: 'Faces minus objects: FFA, OFA, AFP2. Damage: prosopagnosia.' },
    ],
  },

  lectureQuiz: [
    // Easy ----------------------------------------------------------------
    {
      id: 'q22',
      difficulty: 'easy',
      type: 'trueFalse',
      prompt: 'True or false: M-type ganglion cells project to the parvocellular layers 3 to 6 of the LGN.',
      answer: false,
      justification: 'M-type cells project to the magnocellular layers 1 and 2; the parvocellular layers 3 to 6 get P-type input.',
      modelAnswer: [
        'False. M-type ganglion cells end in the two ventral, magnocellular layers, 1 and 2, which have large cells.',
        'P-type ganglion cells, about 90 percent of the total, end in the four dorsal, parvocellular layers, 3 to 6.',
        'NonM-nonP cells end in the thin koniocellular layers, one ventral to each principal layer.',
      ],
    },
    {
      id: 'q02',
      difficulty: 'easy',
      type: 'label',
      prompt: 'Identify the seven layers of the retina indicated in the figure. Light enters from the top.',
      hotspots: { src: fig('retina-layers'), alt: 'A column of retina with seven numbered layers, light entering from the top.', aspect: 396 / 623, regions: LAYER_REGIONS },
      wordBank: ['Outer plexiform layer', 'Pigmented epithelium', 'Ganglion cell layer', 'Outer nuclear layer', 'Layer of photoreceptor outer segments', 'Inner nuclear layer', 'Inner plexiform layer'],
      modelAnswer: [
        'From where light enters: 1 ganglion cell layer, 2 inner plexiform layer, 3 inner nuclear layer, 4 outer plexiform layer.',
        'Then 5 outer nuclear layer, 6 layer of photoreceptor outer segments, 7 pigmented epithelium.',
        'Nuclear layers hold cell bodies; plexiform layers hold synapses. Light meets the photoreceptors last.',
      ],
    },
    {
      id: 'q03',
      difficulty: 'easy',
      type: 'label',
      prompt: 'Identify the six structures indicated on this view of the base of the brain.',
      hotspots: { src: fig('retinofugal'), alt: 'The base of the brain with the eyes, optic nerves, chiasm and tracts, with numbered markers.', aspect: 640 / 734, regions: RETINOFUGAL_REGIONS },
      wordBank: ['Optic tract', 'Lateral geniculate nucleus', 'Eye', 'Cut surface of the brain stem', 'Optic chiasm', 'Optic radiation', 'Stalk of the pituitary gland', 'Optic nerve'],
      modelAnswer: [
        'The eye sends ganglion cell axons out at the optic disk into the optic nerve.',
        'The two optic nerves meet at the optic chiasm, just in front of the stalk of the pituitary gland; nasal fibres cross there.',
        'Behind the chiasm the fibres continue as the optic tracts, which run past the cut brain stem toward the LGN.',
      ],
    },

    // Medium --------------------------------------------------------------
    {
      id: 'q16',
      difficulty: 'medium',
      type: 'classify',
      prompt: 'For each statement, classify it as describing primarily a Photoreceptor / Bipolar cell / Horizontal cell / Amacrine cell / Ganglion cell.',
      categories: ['Photoreceptor', 'Bipolar cell', 'Horizontal cell', 'Amacrine cell', 'Ganglion cell'],
      items: [
        { text: 'It hyperpolarizes when its outer segment absorbs light, so it releases less glutamate.', answer: 'Photoreceptor', explanation: 'Rods and cones are depolarized in the dark and hyperpolarize in light.' },
        { text: 'An electrode on the optic nerve records its action potentials.', answer: 'Ganglion cell', explanation: 'Ganglion cells are the only output and the only retinal neurons that spike (slide 13).' },
        { text: 'It takes input from photoreceptors and spreads sideways in the outer plexiform layer, building the antagonistic surround.', answer: 'Horizontal cell', explanation: 'The indirect pathway of Figure 9.26 runs through horizontal cells.' },
        { text: 'Whether light in its center depolarizes or hyperpolarizes it depends on which glutamate receptor it carries.', answer: 'Bipolar cell', explanation: 'mGluR6 makes an ON bipolar cell; ionotropic receptors make an OFF bipolar cell.' },
        { text: 'It takes input mainly from bipolar cells and modifies nearby ganglion cells through lateral connections in the inner plexiform layer.', answer: 'Amacrine cell', explanation: 'Amacrine cells are the lateral cells of the inner plexiform layer.' },
        { text: 'A rare subtype contains melanopsin, depolarizes to light and signals to the hypothalamus.', answer: 'Ganglion cell', explanation: 'The ipRGCs, which help set circadian rhythms.' },
      ],
      modelAnswer: [
        'a) Photoreceptor: light hyperpolarizes rods and cones and cuts their glutamate release.',
        'b) Ganglion cell: its axons form the optic nerve, and it is the only retinal cell that fires action potentials.',
        'c) Horizontal cell: photoreceptor input, lateral spread in the outer plexiform layer, the source of the surround.',
        'd) Bipolar cell: the receptor type (ionotropic or mGluR6) sets OFF or ON.',
        'e) Amacrine cell: bipolar input, lateral action on ganglion, bipolar and amacrine cells in the inner plexiform layer.',
        'f) Ganglion cell: the intrinsically photosensitive ganglion cells (ipRGCs).',
      ],
    },
    {
      id: 'q17',
      difficulty: 'medium',
      type: 'classify',
      prompt: 'For each finding, classify it as pointing primarily to the Dorsal stream / Ventral stream.',
      categories: ['Dorsal stream', 'Ventral stream'],
      items: [
        { text: 'Almost every neuron in an area fires most for motion in one direction.', answer: 'Dorsal stream', explanation: 'Area MT (V5).' },
        { text: 'Many neurons in an area are selective for both colour and the orientation of edges.', answer: 'Ventral stream', explanation: 'Area V4.' },
        { text: 'Some neurons respond especially strongly to faces, though not only to faces.', answer: 'Ventral stream', explanation: 'Inferior temporal cortex (IT).' },
        { text: 'Neurons respond to patterns that expand, contract or rotate around a point.', answer: 'Dorsal stream', explanation: 'Area MST, beyond MT.' },
        { text: 'After bilateral damage, a patient sees pouring coffee as a series of frozen snapshots.', answer: 'Dorsal stream', explanation: 'Motion blindness after damage near MT.' },
        { text: 'After damage, vision stays sharp but familiar faces are hard to recognize.', answer: 'Ventral stream', explanation: 'Prosopagnosia: ventral temporal cortex.' },
      ],
      modelAnswer: [
        'The dorsal stream runs from V1 toward the parietal lobe through MT and MST: motion and the visual control of action.',
        'The ventral stream runs from V1 toward the temporal lobe through V4 and IT: colour, shape and object recognition.',
        'a) MT, d) MST and e) motion blindness point to the dorsal stream.',
        'b) V4, c) IT face cells and f) prosopagnosia point to the ventral stream.',
      ],
    },
    {
      id: 'q05',
      difficulty: 'medium',
      type: 'order',
      prompt: 'A small spot of light falls on the center of an ON-center ganglion cell field. Arrange the events in order (1 = first).',
      items: [
        'The ON bipolar cell depolarizes and releases more transmitter in the inner plexiform layer',
        'Light passes through the ganglion cell and inner nuclear layers',
        'The ganglion cell fires more action potentials along the optic nerve',
        'Photopigment in the outer segments absorbs light and the photoreceptor hyperpolarizes',
        'The photoreceptor releases less glutamate in the outer plexiform layer',
      ],
      correctOrder: [1, 3, 4, 0, 2],
      modelAnswer: [
        'Light first crosses the inner retina, which is nearly transparent, because the retina is inside out.',
        'The photopigment in the outer segments absorbs it and the photoreceptor hyperpolarizes.',
        'Hyperpolarized, it releases less glutamate onto the bipolar cells in the outer plexiform layer.',
        'The ON bipolar cell, whose metabotropic receptors are hyperpolarizing, is released from that effect and depolarizes; it releases more transmitter onto the ganglion cell.',
        'The ON-center ganglion cell raises its firing rate and the spikes travel down the optic nerve.',
      ],
    },
    {
      id: 'q19',
      difficulty: 'medium',
      type: 'trueFalse',
      prompt: 'Determine whether each statement is true or false. Correct each false statement in one line.',
      statements: [
        { text: 'Light hyperpolarizes rods and cones and reduces their glutamate release.', answer: true, justification: 'Photoreceptors are depolarized in the dark and hyperpolarize in light.' },
        { text: 'With more light on the center and the surround unchanged, OFF bipolar cells depolarize because their ionotropic receptors invert the sign.', answer: false, correction: 'OFF bipolar cells hyperpolarize; their ionotropic receptors keep the sign. ON bipolar cells (mGluR6) invert it.' },
        { text: 'Each LGN receives input from both eyes but represents only the contralateral visual hemifield.', answer: true, justification: 'The eyes stay in separate layers; the hemifield is set by the chiasm.' },
        { text: 'Because LGN receptive fields are almost identical to those of their ganglion cells, the LGN is a passive relay.', answer: false, correction: 'Most excitatory LGN synapses come from V1, and brain stem inputs change LGN responses: it is not passive.' },
        { text: 'A complete cut of the right optic tract removes the left visual hemifield in both eyes.', answer: true, justification: 'The right tract carries the left nasal and right temporal fibres, which see the left hemifield.' },
        { text: 'A region with a stronger BOLD response to faces than to objects consists of neurons that respond only to faces.', answer: false, correction: 'BOLD shows a regional preference only; it is an indirect signal and cannot show that every neuron is face selective.' },
      ],
      modelAnswer: [
        'a) True. Light closes channels in the outer segment, the photoreceptor hyperpolarizes and releases less glutamate.',
        'b) False. OFF bipolar cells follow the photoreceptor and hyperpolarize in light. ON bipolar cells, with mGluR6, depolarize.',
        'c) True. Contralateral eye to layers 1, 4, 6, ipsilateral to 2, 3, 5, but both carry the opposite hemifield.',
        'd) False. About 80 percent of excitatory LGN synapses come from V1, and alertness-related brain stem input modulates the LGN.',
        'e) True. Left hemifield: left nasal fibres cross, right temporal fibres stay, both run in the right tract.',
        'f) False. BOLD is a regional blood-oxygenation signal, not a spike recording.',
      ],
    },
    {
      id: 'q20',
      difficulty: 'medium',
      type: 'fillBlank',
      prompt: 'Trace the left visual hemifield from the eyes to V1. Complete the statements with terms from the word bank.',
      text: 'Within the binocular field, the left visual hemifield is imaged on the left ___ retina and the right ___ retina. The left nasal axons cross at the ___ and join the uncrossed right temporal axons in the ___. They relay in the right LGN and reach the right V1 through the ___.',
      blanks: [
        { accept: ['nasal'] },
        { accept: ['temporal'] },
        { accept: ['optic chiasm'] },
        { accept: ['right optic tract'] },
        { accept: ['optic radiation'] },
      ],
      wordBank: ['optic radiation', 'left optic tract', 'temporal', 'optic nerve', 'right optic tract', 'nasal', 'superior colliculus', 'optic chiasm'],
      modelAnswer: [
        'The image is reversed on the retina, so the left hemifield falls on the right side of each retina: the left nasal and the right temporal retina.',
        'Nasal axons cross at the optic chiasm; temporal axons do not.',
        'So both sets meet in the right optic tract, relay in the right LGN, and reach right V1 through the optic radiation.',
        'The far-left edge of the field, seen by the left eye alone, takes the left nasal route.',
      ],
    },
    {
      id: 'q18',
      difficulty: 'medium',
      type: 'classify',
      prompt: 'For each receptive field description, classify the cell as a Center-surround cell / Simple cell / Complex cell.',
      categories: ['Center-surround cell', 'Simple cell', 'Complex cell'],
      items: [
        { text: 'A roughly circular center with an antagonistic surround; a bar at any orientation drives it about equally.', answer: 'Center-surround cell', explanation: 'Retinal ganglion cells and LGN neurons.' },
        { text: 'Elongated ON and OFF regions lie side by side; shifting a bar sideways turns an ON response into an OFF response.', answer: 'Simple cell', explanation: 'Figure 10.23 (a).' },
        { text: 'It prefers one orientation and gives ON and OFF responses to a bar anywhere in its field.', answer: 'Complex cell', explanation: 'No separate ON and OFF regions.' },
        { text: 'It is proposed to be built from three LGN cells whose centers lie in a row.', answer: 'Simple cell', explanation: 'Figure 10.23 (b), the Hubel and Wiesel model.' },
        { text: 'It is found in many layer IVC neurons of monkey V1, where the LGN axons end.', answer: 'Center-surround cell', explanation: 'Many IVC neurons keep LGN-like fields.' },
        { text: 'It is proposed to be built from several simple cells that share the same preferred orientation.', answer: 'Complex cell', explanation: 'The model is still debated.' },
      ],
      modelAnswer: [
        'Center-surround: a round center and an opposing surround, as in retinal ganglion cells, LGN neurons and many layer IVC neurons. Orientation does not matter.',
        'Simple cell: separate, elongated ON and OFF regions, so both orientation and position matter.',
        'Complex cell: prefers an orientation but has no separate ON and OFF regions, so it responds across positions in its field.',
        'a) and e) center-surround; b) and d) simple; c) and f) complex.',
      ],
    },
    {
      id: 'q08',
      difficulty: 'medium',
      type: 'interpret',
      prompt: 'The figure shows a light-dark edge moving across an OFF-center ganglion cell field. Why does the cell stop firing in panel (b)?',
      figure: {
        type: 'widget',
        name: 'image-hotspots',
        props: hotspots('cs-edge', 1600 / 372, 'A light-dark edge crossing an OFF-center field in four steps, with the output under each.', [], { quiz: false }),
        fallbackAlt: 'Four patches: no dark, dark in part of the surround, dark over the center and most of the surround, all dark. Outputs: a few spikes, none, a barrage, a few spikes.',
      },
      options: [
        { text: 'Dark fills part of the center while the surround stays light, so the center inhibits', feedback: 'In (b) the edge has not reached the center yet.' },
        { text: 'Dark fills part of the surround while the center stays light, so the surround inhibits', feedback: 'Correct. For an OFF-center cell, dark in the surround hyperpolarizes it.' },
        { text: 'Dark fills the whole field while the edge moves on, so center and surround cancel', feedback: 'That is panel (d), which gives a low but maintained rate.' },
        { text: 'Light fills the whole field while the edge stops, so the cell adapts to silence', feedback: 'Part of the surround is dark in (b); the drop is surround inhibition.' },
      ],
      correct: 1,
      modelAnswer: [
        'For an OFF-center cell, dark in the center depolarizes it and dark in the surround hyperpolarizes it.',
        'In (b) the dark edge covers part of the surround but none of the center, which is still light.',
        'So there is surround inhibition and no center excitation: the rate falls below the maintained rate, here to zero.',
        'In (c) darkness covers the whole center with only part of the surround, so excitation wins and the cell fires a barrage.',
      ],
    },

    // Hard ----------------------------------------------------------------
    {
      id: 'q21',
      difficulty: 'hard',
      type: 'classify',
      prompt: 'A stationary light-dark edge, dark on the left, lies across a row of ganglion cells. For each cell, classify its firing as Above the maintained rate / Near the maintained rate / Below the maintained rate.',
      categories: ['Above the maintained rate', 'Near the maintained rate', 'Below the maintained rate'],
      items: [
        { text: 'An OFF-center cell whose whole field lies in the light region.', answer: 'Near the maintained rate', explanation: 'Uniform light: center and surround cancel.' },
        { text: 'An OFF-center cell whose center is just on the light side, with part of its surround in the dark.', answer: 'Below the maintained rate', explanation: 'Dark in the surround inhibits, and the center gets no dark.' },
        { text: 'An OFF-center cell whose center is just on the dark side, with part of its surround in the light.', answer: 'Above the maintained rate', explanation: 'Full center excitation, only partial surround inhibition.' },
        { text: 'An OFF-center cell whose whole field lies in the dark region.', answer: 'Near the maintained rate', explanation: 'Uniform dark: center and surround cancel again.' },
        { text: 'An ON-center cell whose center is just on the light side, with part of its surround in the dark.', answer: 'Above the maintained rate', explanation: 'A light center against a partly dark surround is its preferred pattern.' },
        { text: 'An ON-center cell whose center is just on the dark side, with part of its surround in the light.', answer: 'Below the maintained rate', explanation: 'No light in the center, and light in the surround inhibits.' },
      ],
      modelAnswer: [
        'Rule for an OFF-center cell: dark in the center raises firing, dark in the surround lowers it; an ON-center cell is the mirror image.',
        'The surround acts through horizontal cells and always opposes the center, so uniform light or uniform dark nearly cancels: cells far from the edge stay near their maintained rate.',
        'Next to the edge the balance breaks. The cell whose center gets its preferred contrast while only part of the surround gets the opposite fires most; the cell whose surround gets the center\'s preferred contrast is pushed below its maintained rate.',
        'Across the row the output peaks on one side of the edge and dips on the other: the retina signals contrast at edges, not the absolute light level.',
      ],
    },
    {
      id: 'q09',
      difficulty: 'hard',
      type: 'mc',
      prompt: 'Radioactive proline is injected into the left eye of a monkey. Two weeks later, which pattern appears in layer IVC of the left V1?',
      options: [
        { text: 'Label spread evenly through layer IVC because both eyes are mixed', feedback: 'IVC keeps the eyes separate; mixing starts above it.' },
        { text: 'No label at all in the left V1 because the left eye projects only to the right', feedback: 'The left temporal retina projects to the left side, uncrossed.' },
        { text: 'Labelled patches about 0.5 mm wide alternating with unlabelled patches', feedback: 'Correct. The left eye patches of the ocular dominance columns.' },
        { text: 'Label confined to layer VI because that layer connects to the LGN', feedback: 'Layer VI sends feedback to the LGN; the LGN input ends in IVC.' },
      ],
      correct: 2,
      modelAnswer: [
        'The label is taken up by left eye ganglion cells and transported to the LGN on both sides (nasal fibres cross, temporal fibres do not).',
        'In the left LGN it reaches the layers of the ipsilateral eye (2, 3, 5) and spills into those LGN neurons.',
        'They carry it to their terminals in layer IVC, where each eye owns separate patches about $0.5\\,\\text{mm}$ wide.',
        'Autoradiography therefore shows bright patches alternating with dark ones: zebra stripes from above.',
      ],
    },
    {
      id: 'q11',
      difficulty: 'hard',
      type: 'clinicalCase',
      scenario: 'A 45-year-old man has had headaches for months and keeps bumping into people on both sides. Field testing finds that each eye has lost the outer (temporal) half of its visual field. Central vision is sharp. MRI shows a mass growing up from the pituitary.',
      prompt: 'Where is the lesion?',
      options: [
        { text: 'The optic chiasm, pressed at the midline', feedback: 'Correct. The crossing nasal fibres of both eyes are damaged.' },
        { text: 'The right optic tract, behind the chiasm', feedback: 'A tract lesion removes one hemifield in both eyes, not both outer halves.' },
        { text: 'The left optic nerve, in front of the chiasm', feedback: 'That would blind the left eye and spare the right eye completely.' },
        { text: 'Both primary visual cortices, at the pole', feedback: 'That would take central vision first, and the pituitary is far away.' },
      ],
      correct: 0,
      modelAnswer: [
        'Key finding: both temporal fields lost, one in each eye: bitemporal hemianopia.',
        'Each temporal field is imaged on the nasal retina of that eye.',
        'Nasal fibres of both eyes cross, and they cross only at the optic chiasm, which lies just above the stalk of the pituitary.',
        'A pituitary mass pressing on the middle of the chiasm cuts exactly these crossing fibres: the lesion is at the chiasm.',
      ],
    },
    {
      id: 'q13',
      difficulty: 'hard',
      type: 'clinicalCase',
      scenario: 'A cyclist is hit in the left orbit. Covering the right eye, she sees nothing with the left eye. With both eyes open she still sees almost the whole field and only notices a missing strip at the far left.',
      prompt: 'Where is the damage, and why is only the far left strip missing with both eyes open?',
      options: [
        { text: 'Left optic tract; the right eye still covers the whole right hemifield', feedback: 'A tract lesion blinds the right hemifield in both eyes, not the left eye.' },
        { text: 'Optic chiasm; the right eye still covers the left and the central field', feedback: 'A chiasm lesion affects both eyes, not one.' },
        { text: 'Left optic nerve; the right eye still covers all but the left monocular edge', feedback: 'Correct. Only the far left crescent is seen by the left eye alone.' },
        { text: 'Left V1; the right eye still covers the left hemifield of the scene', feedback: 'Cortical damage never blinds one eye alone.' },
      ],
      correct: 2,
      modelAnswer: [
        'Key finding: the left eye is completely blind, the right eye is normal.',
        'Everything the left eye sees travels in the left optic nerve, before any fibres cross.',
        'Behind the chiasm every structure carries both eyes, so a single lesion there cannot blind one eye only: the damage is the left optic nerve.',
        'The right eye sees about $100^{\\circ}$ to the right and $60^{\\circ}$ to the left, so with both eyes open only the far left monocular crescent is lost.',
      ],
    },
    {
      id: 'q14',
      difficulty: 'hard',
      type: 'clinicalCase',
      scenario: 'After a stroke in the left occipital lobe, a man is blind in the right half of the visual field of both eyes, except for a small island around the fixation point, a few degrees across, where he still sees normally.',
      prompt: 'Which description best explains the pattern?',
      options: [
        { text: 'Left optic tract is damaged except for the foveal fibres, which run in a separate central bundle', feedback: 'The course never describes a separate foveal tract; and the stroke is occipital.' },
        { text: 'Right V1 is damaged except at the occipital pole, where the magnified central field is mapped', feedback: 'The right V1 serves the left hemifield.' },
        { text: 'Left LGN is damaged except for the magnocellular layers, which carry the central visual field', feedback: 'Magnocellular layers carry M-cell input from the whole field, not the centre.' },
        { text: 'Left V1 is damaged except at the occipital pole, where the magnified central field is mapped', feedback: 'Correct. The pole holds the large foveal representation and was spared.' },
      ],
      correct: 3,
      modelAnswer: [
        'Key finding: right hemifield lost in both eyes (homonymous), with the central few degrees spared.',
        'Both eyes send the right hemifield to the left hemisphere, so a left-sided lesion behind the chiasm is needed; the stroke is occipital, so left V1.',
        'Retinotopy: V1 maps the central field at the occipital pole, and that representation is magnified: a few central degrees take a large area.',
        'If the damaged area spares the pole, the central island of the right field still has working cortex, so it is still seen.',
      ],
    },
  ],
};
