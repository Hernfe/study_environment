// Lecture 5: the auditory system (chapter 11).
// Scope: docs/scope/nbe-e4210/L05.md. No TA notes exist for this lecture:
// scope comes from the slides, the page ranges the slides and HW3 state
// (pp. 370-386 lectured, 386-388 outer hair cells, 389-393 coding and the
// central pathway, 399-403 auditory cortex; HW3 narrows chapter 11 to pp.
// 373-386 and 391-393), and the TA's exclusions: sound localization, the
// vestibular system and all boxes are not examined. Slides 22 to 39 are a
// TA addendum, in scope but not lectured; sections built on them say so.
// Figures are slide crops in src/assets/figures/nbe-e4210/L05 (sources in
// CREDITS.md) through the image-hotspots widget, and four d3 demos
// (travelling wave, hair cell stepper, compression versus rarefaction,
// phase locking with the volley).

const fig = (name) => new URL(`../../assets/figures/nbe-e4210/L05/${name}.webp`, import.meta.url).href;

function hotspots(name, aspect, alt, regions, extra = {}) {
  return { src: fig(name), alt, aspect, regions, ...extra };
}

function figureBlock(props, caption, fallbackAlt) {
  return { type: 'figure', visual: { type: 'widget', name: 'image-hotspots', props, caption, fallbackAlt } };
}

function demoBlock(name, props, caption, fallbackAlt) {
  return { type: 'figure', visual: { type: 'widget', name, props, caption, fallbackAlt } };
}

const ADDENDUM = 'Added by the TA after the lecture (slides 22 to 39): in scope, but not lectured.';

// ---------------------------------------------------------------------
// Region sets. Coordinates are percentages of each image.

// Figure 11.3, labels painted out. The seven structures of HW3 Figure 1.
const EAR_REGIONS = [
  { id: 'pinna', label: 'Pinna', body: 'The visible outer ear, cartilage covered by skin. A funnel that collects sound.', x: 9, y: 45, w: 10, h: 30, mx: 7, my: 40, side: 'left' },
  { id: 'canal', label: 'Auditory canal', body: 'About $2.5\\,\\text{cm}$ long; carries sound from the pinna to the tympanic membrane.', x: 35, y: 57, w: 18, h: 8, side: 'left' },
  { id: 'tm', label: 'Tympanic membrane', body: 'The eardrum. Vibrates with the air pressure changes of sound.', x: 58.5, y: 61, w: 4, h: 10, side: 'inline', dir: 'down-left' },
  { id: 'ossicles', label: 'Ossicles', body: 'Malleus, incus and stapes. Transmit the eardrum movement to the oval window and amplify the pressure.', x: 61, y: 49, w: 5, h: 8, side: 'inline', dir: 'up-left' },
  { id: 'oval', label: 'Oval window', body: 'The membrane-covered hole into the cochlea, driven by the stapes footplate.', x: 69.5, y: 55.5, w: 3, h: 3, side: 'inline', dir: 'up-right' },
  { id: 'cochlea', label: 'Cochlea', body: 'The fluid-filled spiral of the inner ear that turns sound into neural signals.', x: 78, y: 60, w: 9, h: 11, side: 'right' },
  { id: 'nerve', label: 'Auditory-vestibular nerve', body: 'Cranial nerve VIII. Its auditory branch carries the spiral ganglion axons to the brain stem.', x: 85, y: 57.5, w: 4, h: 6, side: 'right' },
];

// Figure 11.6, labels printed on the slide.
const MIDDLE_REGIONS = [
  { id: 'ossicles', label: 'Ossicles', body: 'Malleus on the eardrum, incus in the middle, stapes on the oval window. A lever chain.', x: 38, y: 44, w: 8, h: 10, side: 'left' },
  { id: 'tensor', label: 'Tensor tympani muscle', body: 'Anchored to bone, attached to the malleus. Contracts in the acoustic reflex.', x: 46.7, y: 54, w: 6, h: 5, side: 'left' },
  { id: 'stapedius', label: 'Stapedius muscle', body: 'Attached to the stapes. Contracts in the acoustic reflex and stiffens the chain.', x: 53.3, y: 62, w: 4, h: 6, side: 'bottom' },
  { id: 'tm', label: 'Tympanic membrane', body: 'Large surface; its force is passed on to the much smaller oval window.', x: 36, y: 62, w: 5, h: 12, side: 'left' },
  { id: 'oval', label: 'Oval window', body: 'Under the stapes footplate. Pushed in and out like a piston.', x: 58.7, y: 51, w: 4, h: 4, side: 'right' },
  { id: 'round', label: 'Round window', body: 'Bulges out when the oval window is pushed in: the cochlear fluid cannot be compressed.', x: 60.3, y: 60.2, w: 3, h: 3, side: 'right' },
  { id: 'cochlea', label: 'Cochlea', body: 'Fluid-filled. The ossicles exist because air-borne sound would mostly be reflected from it.', x: 75, y: 61, w: 10, h: 12, side: 'right' },
];

// Figure 11.8, labels printed on the slide.
const UNCOILED_REGIONS = [
  { id: 'base', label: 'Base', body: 'Next to the windows. The basilar membrane is narrow and stiff here: high frequencies.', x: 42, y: 40, w: 6, h: 6, side: 'top' },
  { id: 'apex', label: 'Apex', body: 'The far end. The basilar membrane is wide and floppy: low frequencies.', x: 79, y: 37, w: 6, h: 6, side: 'top' },
  { id: 'stapes', label: 'Stapes', body: 'Its footplate moves in and out at the oval window.', x: 23, y: 68, w: 8, h: 8, side: 'left' },
  { id: 'oval', label: 'Oval window', body: 'Opens into the scala vestibuli.', x: 38, y: 54, w: 4, h: 4, side: 'left' },
  { id: 'round', label: 'Round window', body: 'Opens into the scala tympani; bulges opposite to the oval window.', x: 36, y: 77, w: 4, h: 5, side: 'bottom' },
  { id: 'bm', label: 'Basilar membrane', body: 'The narrow blue band. Widens from base to apex, though the cochlea itself narrows.', x: 58, y: 60, w: 18, h: 6, side: 'bottom' },
  { id: 'helicotrema', label: 'Helicotrema', body: 'The hole at the apex joining the scala vestibuli and the scala tympani.', x: 85, y: 41, w: 3, h: 4, side: 'right' },
];

// Figure 11.7 cross section, labels painted out.
const SCALAE_REGIONS = [
  { id: 'sv', label: 'Scala vestibuli', body: 'Upper chamber, filled with perilymph: $\\text{Na}^+$ rich, $\\text{K}^+$ poor. Starts at the oval window.', x: 54, y: 31, w: 30, h: 22, side: 'right' },
  { id: 'sm', label: 'Scala media', body: 'The cochlear duct, filled with endolymph: $\\text{K}^+$ rich, $\\text{Na}^+$ poor, about $80\\,\\text{mV}$ positive.', x: 30, y: 45, w: 12, h: 8, side: 'left' },
  { id: 'st', label: 'Scala tympani', body: 'Lower chamber, perilymph again. Ends at the round window.', x: 54, y: 77, w: 30, h: 12, side: 'right' },
  { id: 'reissner', label: 'Reissner\'s membrane', body: 'Separates the scala vestibuli from the scala media. Very flexible.', x: 26, y: 33, w: 6, h: 5, side: 'left' },
  { id: 'stria', label: 'Stria vascularis', body: 'Lines one wall of the scala media. Secretes $\\text{K}^+$ into the endolymph and absorbs $\\text{Na}^+$.', x: 11.5, y: 53, w: 6, h: 18, side: 'left' },
  { id: 'corti', label: 'Organ of Corti', body: 'The receptor organ: hair cells sitting on the basilar membrane under the tectorial membrane.', x: 36, y: 60, w: 10, h: 6, side: 'bottom' },
  { id: 'bm', label: 'Basilar membrane', body: 'Separates the scala media from the scala tympani and carries the organ of Corti.', x: 40, y: 65.5, w: 16, h: 3, mx: 44, my: 65, side: 'bottom' },
];

// Slide 18 drawing of the organ of Corti, label boxes cropped off.
const CORTI_REGIONS = [
  { id: 'tectorial', label: 'Tectorial membrane', body: 'A gelatinous sheet over the hair cells. The outer hair cell stereocilia end in it.', x: 55, y: 12, w: 40, h: 12, mx: 42, my: 8, side: 'top' },
  { id: 'stereocilia', label: 'Stereocilia', body: 'Rigid hairs in a staircase. Bending them toward the tallest opens the transduction channels.', x: 29, y: 18, w: 6, h: 10, mx: 29, my: 17, side: 'left' },
  { id: 'ohc', label: 'Outer hair cells', body: 'Three rows, about $12{,}000$. The active amplifier.', x: 39.5, y: 35, w: 22, h: 18, mx: 39.5, my: 35, side: 'left' },
  { id: 'ihc', label: 'Inner hair cell', body: 'One row, about $3500$. The main sensory output: about 95 percent of auditory nerve fibres.', x: 70, y: 48, w: 6, h: 16, mx: 70, my: 50, side: 'right' },
  { id: 'fibres', label: 'Auditory nerve fibres', body: 'Neurites of spiral ganglion neurons, the first cells to fire action potentials.', x: 85, y: 69, w: 20, h: 4, mx: 88, my: 69.5, side: 'right' },
  { id: 'bm', label: 'Basilar membrane', body: 'The moving floor. Hair cells ride on it as it vibrates.', x: 50, y: 70, w: 100, h: 3, mx: 15, my: 70, side: 'left' },
  { id: 'endolymph', label: 'Endolymph', body: 'The scala media fluid bathing the stereocilia: $\\text{K}^+$ rich and positive.', x: 12, y: 15, w: 14, h: 10, mx: 12, my: 15, side: 'left' },
];

// Figure 11.15, labels printed.
const TRANSDUCTION_REGIONS = [
  { id: 'channel', label: 'Mechanically gated channel', body: 'At the tip of each shorter stereocilium. Opens when its tip link is stretched.', x: 6, y: 10, w: 5, h: 5, side: 'left' },
  { id: 'tiplink', label: 'Tip link', body: 'A filament from the channel to the side of the taller neighbour.', x: 10, y: 37, w: 6, h: 6, side: 'left' },
  { id: 'endolymph', label: 'Endolymph', body: 'Bathes the stereocilia. $\\text{K}^+$ rich, so $\\text{K}^+$ flows in through open channels.', x: 72, y: 12, w: 10, h: 5, side: 'right' },
  { id: 'ca', label: 'Voltage-gated calcium channel', body: 'Opens as the cell depolarizes; $\\text{Ca}^{2+}$ entry triggers release.', x: 77, y: 31, w: 5, h: 4, side: 'right' },
  { id: 'vesicles', label: 'Vesicles with glutamate', body: 'Fuse when $\\text{Ca}^{2+}$ enters, releasing glutamate onto the neurite.', x: 72, y: 42, w: 10, h: 8, side: 'right' },
  { id: 'neurite', label: 'Spiral ganglion neurite', body: 'The postsynaptic afferent. Fires action potentials when glutamate arrives.', x: 75, y: 54, w: 6, h: 6, side: 'right' },
];

// Figure 11.13 a and b, labels printed.
const SHEAR_REGIONS = [
  { id: 'tect', label: 'Tectorial membrane', body: 'Pivots differently from the basilar membrane, so the two slide past each other.', x: 13, y: 22, w: 8, h: 8, side: 'top' },
  { id: 'bm-a', label: 'Basilar membrane at rest', body: 'Hair cells held between the basilar membrane and the reticular lamina.', x: 15, y: 62, w: 14, h: 4, side: 'bottom' },
  { id: 'bm-b', label: 'Basilar membrane deflected up', body: 'The reticular lamina moves up and inward; the stereocilia bend outward and the cell depolarizes.', x: 75, y: 68, w: 14, h: 4, side: 'bottom' },
  { id: 'bend', label: 'Stereocilia bending out', body: 'The shear between the membranes bends the hair bundle.', x: 83, y: 26, w: 6, h: 8, side: 'top' },
];

// Figure 11.17 a and b, labels printed.
const OHC_REGIONS = [
  { id: 'expanded', label: 'Motor proteins expanded', body: 'At rest or hyperpolarized the cell is long.', x: 25, y: 64, w: 10, h: 18, side: 'bottom' },
  { id: 'compressed', label: 'Motor proteins compressed', body: 'Depolarized by $\\text{K}^+$ entry, prestin shortens the cell.', x: 58, y: 64, w: 10, h: 18, side: 'bottom' },
  { id: 'k', label: 'Potassium entry', body: 'Bending the stereocilia opens the channels; $\\text{K}^+$ enters and depolarizes.', x: 61, y: 26, w: 5, h: 8, side: 'top' },
];

// Figure 11.16, labels printed.
const INNERVATION_REGIONS = [
  { id: 'ohc', label: 'Outer hair cells', body: 'Many cells converge on one spiral ganglion neuron.', x: 22, y: 34, w: 30, h: 15, side: 'left' },
  { id: 'ihc', label: 'Inner hair cell', body: 'One cell feeds about ten spiral ganglion neurons.', x: 55, y: 45, w: 10, h: 12, side: 'right' },
  { id: 'sg', label: 'Spiral ganglion cells', body: 'More than 95 percent of them carry inner hair cell output.', x: 55, y: 70, w: 20, h: 8, side: 'right' },
];

// Slide 32 spiral ganglion in the modiolus, labels printed.
const GANGLION_REGIONS = [
  { id: 'duct', label: 'Cochlear duct', body: 'The scala media, cut in each turn of the spiral.', x: 56, y: 12, w: 6, h: 6, side: 'right' },
  { id: 'sg', label: 'Spiral ganglion', body: 'Cell bodies of the bipolar afferent neurons, in the bony core of the cochlea.', x: 55, y: 40, w: 6, h: 10, side: 'right' },
  { id: 'nerve', label: 'Cochlear nerve', body: 'The axons leave through the internal auditory meatus.', x: 50, y: 85, w: 8, h: 8, side: 'bottom' },
];

// Figure 11.20, labels printed.
const LABELLED_REGIONS = [
  { id: 'hc', label: 'Hair cells along the membrane', body: 'Each sits at one place, so it is driven best by one frequency.', x: 18, y: 30, w: 10, h: 25, side: 'left' },
  { id: 'fibres', label: 'Auditory nerve fibres', body: 'Each fibre carries one place, and so one characteristic frequency: a labelled line.', x: 40, y: 47, w: 22, h: 30, side: 'bottom' },
  { id: 'cn', label: 'Cochlear nucleus', body: 'The fibres arrive in order: characteristic frequency increases from anterior to posterior.', x: 80, y: 50, w: 25, h: 60, side: 'right' },
];

// Figure 11.18, labels printed.
const PATHWAY_REGIONS = [
  { id: 'sg', label: 'Spiral ganglion', body: 'Bipolar afferents from the hair cells.', x: 4.5, y: 94, w: 12, h: 7, side: 'left' },
  { id: 'cn', label: 'Cochlear nuclei', body: 'Dorsal and ventral, in the medulla. Input from the ipsilateral ear only.', x: 4.5, y: 76, w: 12, h: 7, side: 'left' },
  { id: 'so', label: 'Superior olive', body: 'Receives both cochlear nuclei: the first binaural stage.', x: 4.5, y: 65, w: 12, h: 7, side: 'left' },
  { id: 'ic', label: 'Inferior colliculus', body: 'Reached through the lateral lemniscus. All ascending pathways converge here.', x: 4.5, y: 44, w: 12, h: 7, side: 'left' },
  { id: 'mgn', label: 'MGN', body: 'Medial geniculate nucleus of the thalamus, the auditory relay.', x: 4.5, y: 31, w: 12, h: 7, side: 'left' },
  { id: 'ac', label: 'Auditory cortex', body: 'A1 on the superior temporal lobe, reached through the acoustic radiation.', x: 4.5, y: 20, w: 12, h: 7, side: 'left' },
];

// Figure 11.27, labels printed.
const A1_REGIONS = [
  { id: 'a1', label: 'Primary auditory cortex', body: 'A1, Brodmann area 41, on the superior temporal lobe.', x: 23, y: 48, w: 6, h: 6, side: 'left' },
  { id: 'map', label: 'Tonotopic map', body: 'Isofrequency bands: low frequencies rostral and lateral, high caudal and medial.', x: 67, y: 26, w: 26, h: 20, side: 'right' },
  { id: 'a2', label: 'Secondary auditory cortex', body: 'Surrounds A1. More complex, more abstract responses.', x: 22, y: 54, w: 10, h: 6, side: 'bottom' },
];

// Slide 14 spiral, labels printed.
const SPIRAL_REGIONS = [
  { id: 'base', label: 'Base: high frequencies', body: 'The basal turn responds best up to $20\\,\\text{kHz}$.', x: 9, y: 64, w: 8, h: 10, side: 'left' },
  { id: 'apex', label: 'Apex: low frequencies', body: 'The innermost turn, down to about $100\\,\\text{Hz}$ on this map.', x: 57, y: 36, w: 6, h: 8, side: 'right' },
];

// ---------------------------------------------------------------------
// Demo props. Every word in the demos comes from here.

const WAVE = {
  initial: 1000,
  marks: [500, 1000, 2000, 4000, 8000, 16000],
  labels: {
    frequency: 'Frequency', phase: 'Moment in the cycle', base: 'Base (oval window)', apex: 'Apex (helicotrema)',
    displacement: 'Displacement', width: 'Width', stiffness: 'Stiffness',
    narrow: 'narrow', wide: 'about 5 times wider', stiff: 'about 100 times stiffer', floppy: 'floppy',
    peak: 'Peak', place: 'Best frequency', peakAt: 'Peak of the wave', fromBase: '% of the way from base to apex',
    relWidth: 'Membrane width at the peak', relStiffness: 'Membrane stiffness at the peak', baseWord: 'the base',
  },
};

const STEPPER = {
  steps: [
    { label: 'At rest.', body: 'The bundle stands straight. The tip links are under slight tension, so a few MET channels flicker open.' },
    { label: 'The bundle bends toward the tallest stereocilium.', body: 'Shear between the basilar and tectorial membranes pushes the hairs; they pivot at their base as one unit.' },
    { label: 'The tip links stretch.', body: 'Each link runs from the tip of a shorter stereocilium to the side of its taller neighbour, so bending this way pulls on it.' },
    { label: 'The MET channels open.', body: 'The pull opens the mechanically gated channels at the stereocilia tips.' },
    { label: 'K⁺ enters from the endolymph and the cell depolarizes.', body: 'Endolymph is K⁺ rich and about 80 mV positive, and the cell is about 125 mV more negative: K⁺ rushes in, fast and passive.' },
    { label: 'Voltage-gated Ca²⁺ channels open.', body: 'Ca²⁺ enters at the base of the cell.' },
    { label: 'Glutamate is released and the afferent fires.', body: 'The spiral ganglion neurite fires action potentials. The hair cell itself only has a graded receptor potential.' },
  ],
  labels: {
    scrub: 'Step', step: 'Step',
    endolymph: 'Endolymph (scala media)', endoPotential: 'K⁺ about 150 mM, about +80 mV',
    perilymph: 'Perilymph', periPotential: 'K⁺ about 7 mM, 0 mV reference',
    cellRest: 'Resting', cellDepol: 'Depolarized',
    tipLink: 'Tip link stretched', caChannel: 'Ca²⁺ channel', neurite: 'Spiral ganglion neurite',
    spikes: 'Action potentials', tallest: 'Toward the tallest',
  },
};

const PRESSURE = {
  labels: {
    pressure: 'Air pressure', membrane: 'Basilar membrane', potential: 'Receptor potential',
    compression: 'compression', rarefaction: 'rarefaction', up: 'up', down: 'down',
    depol: 'depolarized', hyperpol: 'hyperpolarized', phase: 'Moment in the cycle',
    jumpCompression: 'Compression peak', jumpRarefaction: 'Rarefaction peak',
    bundle: 'Hair bundle', open: 'MET channels open', closed: 'MET channels closed', partly: 'Some channels open',
  },
  rowLabels: ['Basilar membrane', 'Shear on the bundle', 'Tip links', 'MET channels', 'Hair cell'],
  states: {
    compression: ['Moves down', 'Pushes the bundle away from the tallest stereocilium', 'Slacken', 'Close', 'Hyperpolarizes'],
    rarefaction: ['Moves up', 'Bends the bundle toward the tallest stereocilium', 'Stretch', 'Open', 'Depolarizes'],
    between: ['Passing through rest', 'Small', 'At resting tension', 'A few open', 'Near rest'],
  },
};

const PHASE = {
  initial: 400, fibres: 6, refractory: 1.0, probability: 0.6, jitter: 80,
  labels: {
    frequency: 'Frequency', sound: 'Sound', fibre: 'Fibre', pooled: 'All six', histogram: 'Phase of pooled spikes',
    phaseAxis: 'phase in the cycle', cycles: 'cycles', period: 'Period of one cycle', single: 'One fibre fires on',
    ofCycles: 'of cycles', volley: 'Cycles marked by at least one fibre', locking: 'Phase locking',
    strong: 'Strong', weak: 'Weak', none: 'Lost', vs: 'vector strength',
  },
};

export default {
  meta: {
    id: 'L05',
    number: 5,
    title: 'The auditory system',
    chapters: [11],
    pages: [
      { chapter: 11, from: 370, to: 393 },
      { chapter: 11, from: 399, to: 403 },
    ],
    lectureDate: '2026-09-30',
    examDate: '2026-10-23',
  },

  objectives: [
    'Describe sound as compression and rarefaction of air, and relate frequency to pitch and amplitude to loudness.',
    'Name the structures of the outer, middle and inner ear and follow sound from air to bone to fluid to membrane to hair cell.',
    'Explain why the middle ear is needed (impedance matching) and what the acoustic reflex does and cannot do.',
    'Explain how the basilar membrane works as a frequency analyzer and define tonotopy.',
    'Describe the organ of Corti and the transduction chain in a hair cell, including why $\\text{K}^+$ entry depolarizes it.',
    'Contrast inner and outer hair cells, and explain the cochlear amplifier and what a cochlear implant can and cannot restore.',
    'Explain how frequency is coded by place and by timing, including phase locking and the volley principle, and how loudness is coded.',
    'Trace the central auditory pathway to A1 and explain what cortical damage reveals.',
  ],

  prerequisites: [
    { text: 'Equilibrium potentials: why ions move in or out, and the Nernst equation.', lectureId: 'L02', sectionId: 'resting-potential' },
    { text: 'Graded potentials versus action potentials, and the refractory period.', lectureId: 'L02', sectionId: 'initiation' },
    { text: 'Calcium-triggered transmitter release and glutamate.', lectureId: 'L03', sectionId: 'release' },
    { text: 'Receptive fields, retinotopy and the thalamic relay in vision, the model the auditory system is compared with.', lectureId: 'L04', sectionId: 'retinotopy' },
  ],

  sections: [
    // 1 -----------------------------------------------------------------
    {
      id: 'sound',
      title: 'What sound is',
      keyTerms: ['compression', 'rarefaction', 'frequency', 'intensity', 'phase'],
      blocks: [
        { type: 'text', body: 'Sound is an audible variation in air pressure. A vibrating object pushes air together and pulls it apart, and the pattern travels at about $343\\,\\text{m/s}$.' },
        figureBlock(
          hotspots('sound-wave', 1291 / 606, 'Bands of crowded and sparse air molecules above a sine wave of air pressure.', [], { quiz: false, layout: 'stack' }),
          'Compression and rarefaction (slide 4). Crowded molecules are compression, sparse ones rarefaction; the graph below is pressure.',
          'A strip of dots with three dense bands, and under it a sine wave with the amplitude and the wavelength marked.'
        ),
        { type: 'compare', title: 'Three properties of a pure tone', columns: ['What it is', 'What we hear'], rows: [
          { label: 'Frequency', cells: ['Cycles per second, in hertz ($\\text{Hz}$)', 'Pitch'] },
          { label: 'Intensity (amplitude)', cells: ['Pressure difference between peak and trough', 'Loudness, in decibels'] },
          { label: 'Phase', cells: ['Where in its cycle the wave is at a given moment', 'Used by timing codes'] },
        ] },
        { type: 'definition', term: 'Compression and rarefaction', body: 'Compression is a patch of air pushed denser than average, rarefaction a patch pulled thinner. One cycle runs from one compression to the next.' },
        { type: 'keyNumber', items: [
          { value: '$20\\,\\text{Hz}$ to $20\\,\\text{kHz}$', label: 'audible range, shrinking at the high end with age and noise' },
          { value: 'about $10^{12}$', label: 'ratio of the loudest safe to the faintest audible intensity' },
        ] },
      ],
      conceptQuiz: [
        {
          id: 'sound-1',
          prompt: 'Two tones have the same frequency, but one has a larger amplitude. How do they differ to a listener?',
          options: [
            { text: 'The larger one sounds louder at the same pitch', feedback: 'Correct. Amplitude sets intensity, heard as loudness.' },
            { text: 'The larger one sounds higher at the same loudness', feedback: 'Pitch follows frequency, which is the same here.' },
            { text: 'The larger one has a longer distance per cycle', feedback: 'The wavelength depends on frequency, which is unchanged.' },
          ],
          correct: 0,
        },
      ],
    },

    // 2 -----------------------------------------------------------------
    {
      id: 'ear-anatomy',
      title: 'Ear anatomy and the path of sound',
      keyTerms: ['pinna', 'auditory canal', 'tympanic membrane', 'ossicles', 'oval window', 'cochlea', 'outer ear', 'middle ear', 'inner ear'],
      blocks: [
        { type: 'text', body: 'The slide asks for what each part does, not only its name. The ear has three divisions, set by two membranes.' },
        figureBlock(
          hotspots('ear', 1011 / 809, 'The outer, middle and inner ear with seven numbered markers.', EAR_REGIONS),
          'The outer, middle and inner ear (Figure 11.3, slide 6). These are the seven structures of HW3 Figure 1.',
          'Cross section of the ear: the pinna on the left, the canal running right to the blue eardrum, the tiny ossicles, and the snail-shaped cochlea with its nerve on the right.'
        ),
        { type: 'compare', title: 'Three divisions', columns: ['Structures', 'Medium'], rows: [
          { label: 'Outer ear', cells: ['Pinna, auditory canal, up to the tympanic membrane', 'Air'] },
          { label: 'Middle ear', cells: ['Tympanic membrane and the three ossicles', 'Air-filled cavity, bone'] },
          { label: 'Inner ear', cells: ['Cochlea, medial to the oval window', 'Fluid'] },
        ] },
        { type: 'steps', title: 'The path of sound (slides 6 and 28)', steps: [
          { title: 'Air:', body: 'the outer ear collects sound and the tympanic membrane vibrates.' },
          { title: 'Bone:', body: 'the ossicles transmit and amplify the force.' },
          { title: 'Fluid:', body: 'the stapes drives the oval window and moves the cochlear fluid.' },
          { title: 'Membrane:', body: 'the fluid motion moves the basilar membrane.' },
          { title: 'Hair cell:', body: 'the moving membrane bends stereocilia, and the hair cells signal to the auditory nerve.' },
        ] },
        { type: 'whyItMatters', body: 'Each transition changes the medium: air, bone, fluid, membrane, cell. Most of the physiology in this lecture is about getting energy across those boundaries without losing it.' },
        { type: 'detail', title: 'Compared with vision', body: 'Both systems run receptors, then early integration (retina; brain stem nuclei), then a thalamic relay (LGN; MGN), then sensory cortex. Hearing has more brain stem stages before the thalamus.' },
      ],
      conceptQuiz: [
        {
          id: 'ear-1',
          prompt: 'Which structure divides the outer ear from the middle ear?',
          options: [
            { text: 'The oval window membrane', feedback: 'The oval window divides the middle ear from the inner ear.' },
            { text: 'The pinna and its cartilage', feedback: 'The pinna is the start of the outer ear, not its end.' },
            { text: 'The tympanic membrane', feedback: 'Correct. Everything from the pinna to the eardrum is outer ear.' },
            { text: 'The basilar membrane', feedback: 'That lies inside the cochlea, in the inner ear.' },
          ],
          correct: 2,
        },
      ],
    },

    // 3 -----------------------------------------------------------------
    {
      id: 'middle-ear',
      title: 'The middle ear and acoustic impedance',
      keyTerms: ['acoustic impedance', 'malleus', 'incus', 'stapes', 'Eustachian tube'],
      blocks: [
        { type: 'definition', term: 'Acoustic impedance', body: 'The tendency of a medium to oppose sound propagation. Air < fluid < solid.' },
        { type: 'steps', title: 'Why the ear needs ossicles (slide 7)', steps: [
          'Sound passing from a low to a high impedance medium loses energy: most of it is reflected.',
          'The cochlea is filled with fluid. Air-borne sound striking the oval window directly would be almost all reflected; only about 0.1 percent would get in.',
          'The ossicles convert large, weak movements of the eardrum into small, strong movements of the oval window.',
          'Pressure is force per area, so the pressure at the oval window rises about 20-fold: enough to move the fluid.',
        ] },
        { type: 'math', title: 'Pressure', items: [
          { tex: 'P = \\frac{F}{A}', label: 'More force (lever action of the ossicles) on a much smaller area (stapes footplate versus tympanic membrane) gives about $20\\times$ the pressure.' },
        ] },
        figureBlock(
          hotspots('middle-ear', 915 / 849, 'The middle ear with the ossicles, the two muscles and both windows.', MIDDLE_REGIONS, { quiz: false }),
          'The middle and inner ear (Figure 11.6, slide 8). Labels as on the slide.',
          'Close-up of the middle ear: the blue eardrum on the left, the yellow ossicle chain across the cavity to the oval window, two small muscles, and the coiled cochlea on the right.'
        ),
        { type: 'compare', title: 'The three ossicles', columns: ['Attached to', 'Named after'], rows: [
          { label: 'Malleus', cells: ['Tympanic membrane', 'Hammer'] },
          { label: 'Incus', cells: ['Malleus and stapes', 'Anvil'] },
          { label: 'Stapes', cells: ['Oval window, by its footplate', 'Stirrup'] },
        ] },
        { type: 'detail', title: 'The Eustachian tube (slide 9)', body: 'Links the middle ear to the nasal cavity. A valve keeps it shut; yawning or swallowing opens it and equalizes the pressure on both sides of the eardrum, which is why ears pop on a climbing plane.' },
      ],
      conceptQuiz: [
        {
          id: 'middle-1',
          prompt: 'Why would hearing be poor if sound reached the oval window directly through air?',
          options: [
            { text: 'Air-borne sound would mostly be reflected by the fluid behind the window', feedback: 'Correct. Fluid has a higher impedance than air.' },
            { text: 'Air-borne sound would mostly be absorbed by the bone around the window', feedback: 'The loss is reflection at the air-fluid boundary, not absorption.' },
            { text: 'Air-borne sound would reach the round window first and cancel itself', feedback: 'The round window only relieves pressure; it does not cancel sound.' },
          ],
          correct: 0,
        },
      ],
    },

    // 4 -----------------------------------------------------------------
    {
      id: 'acoustic-reflex',
      title: 'The acoustic reflex',
      keyTerms: ['acoustic reflex', 'tensor tympani', 'stapedius'],
      blocks: [
        { type: 'definition', term: 'Acoustic reflex', body: 'Loud sound makes the tensor tympani (on the malleus) and the stapedius (on the stapes) contract. The ossicle chain stiffens and less sound reaches the cochlea. The textbook calls it the attenuation reflex.' },
        { type: 'compare', title: 'What it does and its limits (slide 8)', columns: ['Detail'], rows: [
          { label: 'Attenuates', cells: ['More at low than at high frequencies'] },
          { label: 'Function 1', cells: ['Prevents damage from loud sound'] },
          { label: 'Function 2', cells: ['Adapts the ear to low-frequency noise, so speech stays easier to hear'] },
          { label: 'Caveat 1', cells: ['The muscles tire: sustained loud noise still damages'] },
          { label: 'Caveat 2', cells: ['Slow: $50$ to $100\\,\\text{ms}$ after the sound, so a sudden bang gets through'] },
        ] },
        { type: 'misconception', wrong: 'The acoustic reflex protects against any loud sound.', right: 'It arrives $50$ to $100\\,\\text{ms}$ late and fatigues, so an explosion or a long concert can still damage the cochlea.' },
      ],
      conceptQuiz: [
        {
          id: 'reflex-1',
          prompt: 'A gunshot damages a hunter\'s cochlea even though the acoustic reflex is intact. Why?',
          options: [
            { text: 'The reflex only acts on high frequencies, and a gunshot is low', feedback: 'It is the reverse: the reflex attenuates low frequencies more.' },
            { text: 'The reflex starts $50$ to $100\\,\\text{ms}$ after the sound has arrived', feedback: 'Correct. A sudden sound does its damage before the muscles contract.' },
            { text: 'The reflex works only when the person is speaking aloud', feedback: 'It is triggered by loud sound in general.' },
          ],
          correct: 1,
        },
      ],
    },

    // 5 -----------------------------------------------------------------
    {
      id: 'cochlea',
      title: 'The cochlea: scalae, fluids and windows',
      keyTerms: ['scala vestibuli', 'scala media', 'scala tympani', 'perilymph', 'endolymph', 'endocochlear potential', 'basilar membrane', 'helicotrema', 'round window'],
      blocks: [
        { type: 'text', body: 'The cochlea is a bony tube about $32\\,\\text{mm}$ long, coiled two and a half times. In cross section it holds three fluid-filled chambers.' },
        figureBlock(
          hotspots('scalae', 541 / 545, 'Cross section of one turn of the cochlea with numbered markers on its chambers and membranes.', SCALAE_REGIONS),
          'The three scalae (Figure 11.7, slide 12).',
          'A rounded cross section with a large upper chamber and a lower chamber separated by a diagonal membrane and a small triangle, the scala media, holding the green stria vascularis and the yellow organ of Corti.'
        ),
        { type: 'compare', title: 'Two fluids (slides 13 and 19)', columns: ['Perilymph', 'Endolymph'], rows: [
          { label: 'Where', cells: ['Scala vestibuli and scala tympani', 'Scala media'] },
          { label: '$\\text{K}^+$', cells: ['Low, about $7\\,\\text{mM}$', 'High, about $150\\,\\text{mM}$'] },
          { label: '$\\text{Na}^+$', cells: ['High, about $140\\,\\text{mM}$', 'Low, about $1\\,\\text{mM}$'] },
          { label: 'Like', cells: ['Cerebrospinal fluid', 'The inside of a cell'] },
          { label: 'Potential', cells: ['Reference', 'About $+80\\,\\text{mV}$: the endocochlear potential'] },
        ] },
        { type: 'definition', term: 'Stria vascularis', body: 'The tissue lining one wall of the scala media. It secretes $\\text{K}^+$ into the endolymph and absorbs $\\text{Na}^+$, setting up the endocochlear potential.' },
        figureBlock(
          hotspots('cochlea-uncoiled', 1090 / 515, 'The cochlea uncoiled, from the stapes at the base to the helicotrema at the apex.', UNCOILED_REGIONS, { quiz: false }),
          'The cochlea uncoiled (Figure 11.8, slide 10). The basilar membrane widens toward the apex while the cochlea narrows.',
          'A long tapering tube with the stapes and two windows at the wide left end, a striped blue membrane running its length, and a hole at the tip.'
        ),
        { type: 'steps', title: 'The round window (slide 11)', steps: [
          'The cochlear fluid cannot be compressed, and it sits in bone.',
          'When the stapes pushes the oval window in, the pressure runs along the scala vestibuli and back down the scala tympani.',
          'The round window membrane bulges out to make room; when the stapes pulls back, it bulges in.',
          'Without it the fluid could not move, and neither could the basilar membrane.',
        ] },
      ],
      conceptQuiz: [
        {
          id: 'cochlea-1',
          prompt: 'Which fluid bathes the stereocilia, and what is unusual about it?',
          options: [
            { text: 'Perilymph, which is rich in potassium like the cytoplasm', feedback: 'Perilymph is potassium poor, like cerebrospinal fluid.' },
            { text: 'Endolymph, which is rich in potassium and electrically positive', feedback: 'Correct. About $150\\,\\text{mM}$ potassium and $+80\\,\\text{mV}$.' },
            { text: 'Endolymph, which is rich in sodium and electrically negative', feedback: 'Endolymph is sodium poor and positive.' },
            { text: 'Perilymph, which is rich in calcium and electrically positive', feedback: 'Perilymph is the reference fluid, not the positive one.' },
          ],
          correct: 1,
        },
      ],
    },

    // 6 -----------------------------------------------------------------
    {
      id: 'tonotopy',
      title: 'The cochlea as a frequency analyzer',
      keyTerms: ['travelling wave', 'place code', 'tonotopy'],
      blocks: [
        { type: 'text', body: 'The slide calls the cochlea a mechanical frequency analyzer. The basilar membrane does the analysis, because its width and stiffness change along its length.' },
        { type: 'compare', title: 'Two ends of the basilar membrane (slide 14)', columns: ['Base', 'Apex'], rows: [
          { label: 'Width', cells: ['Narrow', 'About 5 times wider'] },
          { label: 'Stiffness', cells: ['About 100 times stiffer', 'Floppy'] },
          { label: 'Best frequency', cells: ['High', 'Low'] },
        ] },
        { type: 'steps', title: 'The travelling wave (slide 16)', steps: [
          'The stapes pushes and pulls the perilymph like a piston.',
          'The basilar membrane bends near the base, starting a wave that travels toward the apex.',
          'A high frequency vibrates the stiff base strongly and dies out early.',
          'A low frequency travels all the way to the floppy apex before it dies out.',
          'So each place along the membrane is deformed most by one frequency: a place code.',
        ] },
        demoBlock('traveling-wave', WAVE,
          'Travelling wave explorer. Move the frequency and watch the peak move along the membrane. The place map is a standard approximation of the human cochlea (Greenwood), for illustration; the course only states the direction.',
          'An uncoiled basilar membrane from base to apex. A wave grows from the left and peaks at a place set by the frequency slider; below it the membrane widens toward the apex and a shaded band fades from stiff to floppy.'
        ),
        figureBlock(
          hotspots('traveling-wave', 1042 / 328, 'A travelling wave on the basilar membrane, peaking about halfway at 3000 Hz.', [], { quiz: false, layout: 'stack' }),
          'A travelling wave at $3000\\,\\text{Hz}$ (Figure 11.9). The movement ends abruptly about halfway between base and apex.',
          'An uncoiled cochlea with arrows of fluid flow and a wavy black line on the basilar membrane that grows and then stops halfway along.'
        ),
        { type: 'definition', term: 'Tonotopy', body: 'Systematic organization of sound frequency within an auditory structure, analogous to retinotopy in vision. Tonotopic maps exist on the basilar membrane, in each auditory relay nucleus, in the MGN and in auditory cortex.' },
        figureBlock(
          hotspots('tonotopy-spiral', 981 / 719, 'The cochlear spiral with the best frequency marked along it, from 20,000 Hz at the base to 100 Hz at the apex.', SPIRAL_REGIONS, { quiz: false }),
          'Best frequency along the coiled cochlea (slide 14).',
          'A grey spiral with numbers along it: 20 000 at the outer start, falling through 5000, 1000 and 500 to 100 at the centre.'
        ),
        { type: 'link', title: 'Video recommended by the TA', href: 'https://youtu.be/aBZPPOm0_pA', label: 'Auditory system overview (YouTube)', body: 'Optional. It follows the book but does not cover everything: it leaves out the volley principle, and it covers sound localization, which is not examined.' },
      ],
      conceptQuiz: [
        {
          id: 'tonotopy-1',
          prompt: 'Why does a high-frequency tone peak near the base of the basilar membrane?',
          options: [
            { text: 'The base is narrow and stiff, so it vibrates with fast frequencies', feedback: 'Correct. The wave spends its energy there and dies out early.' },
            { text: 'The base is wide and floppy, so it vibrates with fast frequencies', feedback: 'The apex is the wide, floppy end; it suits low frequencies.' },
            { text: 'The base is closest to the brain, so it reports fast frequencies', feedback: 'The place code comes from mechanics, not distance to the brain.' },
          ],
          correct: 0,
        },
        {
          id: 'tonotopy-2',
          prompt: 'Where else besides the basilar membrane is there a tonotopic map?',
          options: [
            { text: 'Only in the auditory nerve, which loses it at the brain stem', feedback: 'The map is kept all the way to cortex.' },
            { text: 'In the cochlear nuclei, the MGN and auditory cortex', feedback: 'Correct. Tonotopy is kept from cochlea to A1.' },
            { text: 'Only in auditory cortex, which builds it from scratch', feedback: 'Cortex inherits the map from the cochlea through the relays.' },
          ],
          correct: 1,
        },
      ],
    },

    // 7 -----------------------------------------------------------------
    {
      id: 'organ-of-corti',
      title: 'The organ of Corti',
      keyTerms: ['organ of Corti', 'hair cell', 'stereocilia', 'tectorial membrane', 'reticular lamina', 'inner hair cells', 'outer hair cells', 'spiral ganglion'],
      blocks: [
        { type: 'text', body: 'Where mechanics meets electricity: the receptor cells sit on the moving basilar membrane, under the tectorial membrane.' },
        figureBlock(
          hotspots('corti', 919 / 522, 'The organ of Corti with three outer hair cells, one inner hair cell and the membranes, with numbered markers.', CORTI_REGIONS),
          'The organ of Corti (slide 18). Label boxes removed for the quiz.',
          'A colour drawing: a peach tectorial membrane arching over three purple outer hair cells on the left and one inner hair cell on the right, green nerve fibres running along the pink basilar membrane at the bottom.'
        ),
        { type: 'compare', title: 'What the slide says (slide 17)', columns: ['Role'], rows: [
          { label: 'Inner hair cells', cells: ['The main sensory output'] },
          { label: 'Outer hair cells', cells: ['An active mechanical amplifier'] },
          { label: 'Stereocilia', cells: ['Bend relative to the tectorial membrane'] },
          { label: 'Hair cells', cells: ['Do not fire action potentials'] },
        ] },
        { type: 'definition', term: 'Hair cell', body: 'A specialized epithelial cell, not a neuron: no axon, no action potentials. It has 10 to 300 stereocilia on top and a graded receptor potential.' },
        { type: 'definition', term: 'Spiral ganglion', body: 'Bipolar neurons in the modiolus, the bony core of the cochlea. They receive the hair cells\' synapses and their axons form the auditory nerve, part of cranial nerve VIII.' },
        { type: 'detail', title: 'Numbers', body: 'Inner hair cells: one row, about $3500$ on the slide ($4500$ in the book). Outer hair cells: three rows, about $12{,}000$. Hair cells, rods of Corti and supporting cells sit between the basilar membrane and the reticular lamina.' },
      ],
      conceptQuiz: [
        {
          id: 'corti-1',
          prompt: 'Which cells are the first in the auditory pathway to fire action potentials?',
          options: [
            { text: 'The inner hair cells of the organ of Corti', feedback: 'Hair cells have only a graded receptor potential.' },
            { text: 'The neurons of the spiral ganglion', feedback: 'Correct. Their axons form the auditory nerve.' },
            { text: 'The outer hair cells of the organ of Corti', feedback: 'Outer hair cells change length; they do not fire.' },
            { text: 'The neurons of the cochlear nuclei', feedback: 'They fire, but the spiral ganglion neurons fire first.' },
          ],
          correct: 1,
        },
      ],
    },

    // 8 -----------------------------------------------------------------
    {
      id: 'transduction',
      title: 'Hair cell transduction: the potassium story',
      keyTerms: ['tip link', 'mechanically gated channel', 'MET channel', 'receptor potential'],
      blocks: [
        { type: 'steps', title: 'From a bent hair to a nerve signal (slide 19)', steps: [
          'Deflection toward the tallest stereocilium stretches the tip links.',
          'Mechanically gated (MET) channels at the stereocilia tips open.',
          '$\\text{K}^+$ enters from the $\\text{K}^+$-rich endolymph and the hair cell depolarizes.',
          'Voltage-gated $\\text{Ca}^{2+}$ channels open.',
          'Glutamate release excites the spiral ganglion afferents.',
        ] },
        demoBlock('hair-cell-stepper', STEPPER,
          'Hair cell transduction, step by step (after Figure 11.15). Schematic.',
          'A hair cell under a band of endolymph. Three stereocilia in a staircase tilt toward the tallest, a tip link turns taut, potassium enters, the cell fills with colour as it depolarizes, calcium enters at its base and a nerve ending below shows spikes.'
        ),
        { type: 'steps', title: 'Why $\\text{K}^+$ entry depolarizes (slide 19)', steps: [
          { title: 'Unusual fluid:', body: 'endolymph is $\\text{K}^+$ rich and about $80\\,\\text{mV}$ more positive than perilymph.' },
          { title: 'Large gradient:', body: 'the cell inside is about $125\\,\\text{mV}$ more negative than the endolymph, so $\\text{K}^+$ rushes in. Fast, which helps hair cells keep up with high frequencies.' },
          { title: 'Passive:', body: '$\\text{K}^+$ follows its gradient in at the top and out at the base into $\\text{K}^+$-poor perilymph. No pump and no ATP is needed to recycle it.' },
        ] },
        { type: 'misconception', wrong: 'Opening $\\text{K}^+$ channels always hyperpolarizes a cell.', right: 'In most neurons it does, since $E_{\\text{K}}$ is near $-80\\,\\text{mV}$. At the hair cell top the endolymph sets $E_{\\text{K}}$ near $0\\,\\text{mV}$, so $\\text{K}^+$ flows in and depolarizes.' },
        figureBlock(
          hotspots('transduction', 877 / 1077, 'Stereocilia with tip links and channels, and a hair cell releasing transmitter onto a spiral ganglion neurite.', TRANSDUCTION_REGIONS, { quiz: false }),
          'Depolarization of a hair cell (Figure 11.15, slide 19). Labels as on the slide.',
          'Left: three pairs of stereocilia with a tip link and a channel, open when bent one way and closed when bent the other. Right: an inner hair cell with potassium entering at the top and calcium entering at the base next to vesicles over a nerve ending.'
        ),
        { type: 'detail', title: 'How small a movement', body: 'The receptor potential saturates when the stereocilia tips move about $20\\,\\text{nm}$; the faintest audible sound moves them about $0.3\\,\\text{nm}$, the diameter of a large atom. At low frequencies the receptor potential follows the sound wave cycle by cycle.' },
      ],
      conceptQuiz: [
        {
          id: 'transduction-1',
          prompt: 'What directly opens the transduction channels at the stereocilia tips?',
          options: [
            { text: 'Glutamate released from neighbouring hair cells', feedback: 'Glutamate is the output of the hair cell, not the trigger.' },
            { text: 'Depolarization spreading up from the cell body', feedback: 'The channels are mechanically gated, not voltage gated.' },
            { text: 'Tension in the tip links as the bundle bends', feedback: 'Correct. Bending toward the tallest stretches the links.' },
          ],
          correct: 2,
        },
        {
          id: 'transduction-2',
          prompt: 'Why does the hair cell need no ATP-driven pump to clear the potassium it takes in?',
          options: [
            { text: 'Potassium leaves at the base into potassium-poor perilymph, down its gradient', feedback: 'Correct. Both steps are passive.' },
            { text: 'Potassium is turned into glutamate inside the cell and released', feedback: 'Ions are not converted into transmitter.' },
            { text: 'Potassium leaves at the top again through the same open channels', feedback: 'At the top the gradient drives it in, not out.' },
          ],
          correct: 0,
        },
      ],
    },

    // 9 -----------------------------------------------------------------
    {
      id: 'shear',
      title: 'Compression, rarefaction and shear',
      keyTerms: ['shear'],
      blocks: [
        { type: 'compare', title: 'The slide\'s convention (slide 20)', columns: ['Compression', 'Rarefaction'], rows: [
          { label: 'Basilar membrane', cells: ['Moves down', 'Moves up'] },
          { label: 'Shear on the tip links', cells: ['Pushes, links slacken', 'Pulls, links stretch'] },
          { label: 'MET channels', cells: ['Close', 'Open'] },
          { label: 'Hair cell', cells: ['Hyperpolarizes', 'Depolarizes'] },
        ] },
        demoBlock('compression-rarefaction', PRESSURE,
          'Compression versus rarefaction through one cycle, using the slide\'s convention. Schematic: the receptor potential is larger in the depolarizing direction, as in Figure 11.14.',
          'Three aligned traces, air pressure, basilar membrane position and receptor potential, with a cursor; on the right a hair bundle that tilts and shows its channels open or closed.'
        ),
        figureBlock(
          hotspots('shear', 1558 / 497, 'The organ of Corti at rest and with the basilar membrane deflected up, the stereocilia bending outward.', SHEAR_REGIONS, { quiz: false, layout: 'stack' }),
          'Bending of the stereocilia when the basilar membrane moves up (Figure 11.13, slide 20).',
          'Two drawings side by side. Left: hair cells between the basilar membrane and an overhanging tectorial membrane. Right: the floor tilted up and the hairs bent outward, with red arrows.'
        ),
        { type: 'definition', term: 'Shear', body: 'Sliding of one surface sideways relative to another. The basilar and tectorial membranes pivot about different points, so as the basilar membrane moves they slide past each other and bend the stereocilia.' },
        { type: 'misconception', title: 'Added by the TA (slide 22)', wrong: 'Hair cells respond because the two membranes move closer together.', right: 'They respond to relative sliding, shear. Moving two plates toward each other only narrows the gap; sliding one sideways bends whatever joins them.' },
      ],
      conceptQuiz: [
        {
          id: 'shear-1',
          prompt: 'On the slide\'s convention, what happens to a hair cell during the rarefaction phase of a sound?',
          options: [
            { text: 'The basilar membrane moves up, MET channels open and the cell depolarizes', feedback: 'Correct. The tip links are pulled.' },
            { text: 'The basilar membrane moves down, MET channels open and the cell depolarizes', feedback: 'Downward motion goes with compression and closing channels.' },
            { text: 'The basilar membrane moves up, MET channels close and the cell hyperpolarizes', feedback: 'Upward motion pulls the links and opens the channels.' },
          ],
          correct: 0,
        },
      ],
    },

    // 10 ----------------------------------------------------------------
    {
      id: 'outer-hair-cells',
      title: 'Outer hair cells and prestin',
      keyTerms: ['electromotility', 'prestin', 'cochlear amplifier', 'efferent'],
      blocks: [
        { type: 'text', body: ADDENDUM + ' Pages 386 to 388.' },
        { type: 'text', body: 'Outer hair cells are about three times as numerous as inner hair cells, yet they are not the main encoders of sound. They change the mechanics instead.' },
        { type: 'definition', term: 'Electromotility', body: 'Outer hair cells change length with their membrane potential. The motor is prestin, packed in the cell membrane. Depolarization shortens the cell; hyperpolarization lengthens it. Fast, and driven by voltage, not ATP.' },
        figureBlock(
          hotspots('ohc-motor', 825 / 287, 'An outer hair cell, long with expanded motor proteins and short with compressed ones after potassium entry.', OHC_REGIONS, { quiz: false, layout: 'stack' }),
          'Amplification by outer hair cells (Figure 11.17 a and b, slide 24).',
          'Two panels of one outer hair cell between the tectorial and basilar membranes: tall at rest, shorter after potassium enters through bent stereocilia.'
        ),
        { type: 'steps', title: 'Both directions amplify (slide 25)', steps: [
          { title: 'Depolarization:', body: '$\\text{K}^+$ enters through MET channels, prestin shortens the cell, and the force, timed with the vibration, reinforces basilar membrane motion.' },
          { title: 'Hyperpolarization:', body: 'MET channels close, the cell lengthens, and the force in the opposite direction reinforces the opposite phase of the motion.' },
          { title: 'Like pushing a swing:', body: 'energy can be added in both halves of the cycle if the timing is right.' },
          { title: 'Result:', body: 'more basilar membrane motion, more shear on the inner hair cells, a bigger auditory nerve response.' },
        ] },
        { type: 'keyNumber', items: [
          { value: 'about $100\\times$', label: 'smaller peak basilar membrane movement without the cochlear amplifier' },
          { value: 'over $100\\times$', label: 'less sensitive hearing in mice lacking prestin' },
        ] },
        { type: 'compare', title: 'Two kinds of control (slides 24 and 26)', columns: ['Source', 'Effect'], rows: [
          { label: 'Receptor potential', cells: ['The cell\'s own MET current, cycle by cycle', 'Drives each contraction'] },
          { label: 'Efferent input', cells: ['Brain stem (medial olivocochlear system), acetylcholine', 'Hyperpolarizes, lengthens: modulates the gain'] },
        ] },
        { type: 'misconception', wrong: 'Amplification works by pulling the basilar membrane closer to the tectorial membrane.', right: 'It works because timed length changes put energy into the vibration, increasing the shear that stimulates inner hair cells (slide 25).' },
        { type: 'detail', title: 'Evidence from drugs', body: 'Furosemide reduces hair cell transduction and shrinks the basilar membrane response. Antibiotics such as kanamycin destroy mostly outer hair cells, yet inner hair cells become less sensitive and the patient goes deaf: the loss of the amplifier.' },
      ],
      conceptQuiz: [
        {
          id: 'ohc-1',
          prompt: 'What does an outer hair cell do when it depolarizes?',
          options: [
            { text: 'It fires an action potential along the auditory nerve', feedback: 'Hair cells do not fire action potentials.' },
            { text: 'It shortens, because prestin responds to the voltage', feedback: 'Correct. Hyperpolarization lengthens it again.' },
            { text: 'It lengthens, because prestin uses ATP to expand', feedback: 'Depolarization shortens it, and prestin does not use ATP.' },
          ],
          correct: 1,
        },
      ],
    },

    // 11 ----------------------------------------------------------------
    {
      id: 'ihc-ohc',
      title: 'Inner versus outer hair cells',
      keyTerms: [],
      blocks: [
        { type: 'text', body: ADDENDUM },
        { type: 'text', body: 'One reports the sound. The other improves the instrument (slide 27).' },
        { type: 'compare', title: 'Inner and outer hair cells', columns: ['Inner hair cells', 'Outer hair cells'], rows: [
          { label: 'Number', cells: ['One row, fewer', 'Three rows, about 3 times as many'] },
          { label: 'Job', cells: ['Convert basilar membrane motion into neural output', 'Electromotility boosts local basilar membrane motion'] },
          { label: 'Afferents', cells: ['About 95 percent of auditory nerve fibres', 'About 5 percent'] },
          { label: 'Wiring', cells: ['One cell to several (about 10) spiral ganglion neurons', 'Several cells to one spiral ganglion neuron'] },
          { label: 'Efferent input', cells: ['Little', 'Strong'] },
          { label: 'Effect of loss', cells: ['Major hearing loss: the signal is gone', 'Loss of sensitivity and sharp frequency tuning'] },
        ] },
        figureBlock(
          hotspots('innervation', 457 / 401, 'Three outer hair cells sharing one fibre and one inner hair cell with many fibres.', INNERVATION_REGIONS, { quiz: false }),
          'Innervation of hair cells by spiral ganglion neurons (Figure 11.16, slide 24).',
          'Three outer hair cells on the left whose thin fibres join into one, and one inner hair cell on the right with a dense fan of many fibres running down to the spiral ganglion.'
        ),
      ],
      conceptQuiz: [
        {
          id: 'ihc-ohc-1',
          prompt: 'Most of the information the brain receives about sound comes from which cells?',
          options: [
            { text: 'Outer hair cells, because there are three times as many', feedback: 'Number does not decide it: few fibres carry their signal.' },
            { text: 'Inner hair cells, which supply about 95 percent of the afferents', feedback: 'Correct.' },
            { text: 'Efferent neurons, which report the state of the cochlea', feedback: 'Efferents carry signals toward the cochlea, not from it.' },
          ],
          correct: 1,
        },
      ],
    },

    // 12 ----------------------------------------------------------------
    {
      id: 'implant',
      title: 'Cochlear implants',
      keyTerms: ['cochlear implant'],
      blocks: [
        { type: 'text', body: ADDENDUM },
        { type: 'text', body: 'What if the hair cells fail but the auditory nerve still works (slide 29)?' },
        { type: 'steps', title: 'How an implant works', steps: [
          'A microphone captures the sound.',
          'A processor splits it into frequency bands.',
          'An electrode array in the cochlea stimulates the nerve fibres at different places.',
          'Base electrodes are heard as high pitch, apex electrodes as low: the device exploits tonotopy.',
        ] },
        { type: 'misconception', wrong: 'A cochlear implant is a tiny loudspeaker in the ear.', right: 'It is a neural interface. It bypasses the hair cells and stimulates the auditory nerve directly, rather than recreating normal hair cell mechanics.' },
        { type: 'whyItMatters', body: 'An implant only works if the auditory nerve is intact, and it gives as many frequency channels as electrode sites, not the fine tuning that outer hair cells give.' },
      ],
      conceptQuiz: [
        {
          id: 'implant-1',
          prompt: 'What must still work for a cochlear implant to help?',
          options: [
            { text: 'The hair cells of the organ of Corti', feedback: 'The implant replaces them; they may be lost.' },
            { text: 'The ossicles of the middle ear', feedback: 'The implant does not use the middle ear.' },
            { text: 'The fibres of the auditory nerve', feedback: 'Correct. The implant stimulates them directly.' },
          ],
          correct: 2,
        },
      ],
    },

    // 13 ----------------------------------------------------------------
    {
      id: 'phase-locking',
      title: 'Phase locking',
      keyTerms: ['phase locking'],
      blocks: [
        { type: 'text', body: ADDENDUM },
        { type: 'definition', term: 'Phase locking', body: 'An auditory nerve fibre firing at the same phase of the sound wave on the cycles it fires: always at the peaks, say, or at some other fixed point. The hair cell receptor potential follows the wave, so the fibre can too.' },
        figureBlock(
          hotspots('phase-lock', 471 / 338, 'Sound pressure and the hair cell receptor potential following it in time.', [], { quiz: false, layout: 'stack' }),
          'The receptor potential follows the sound (slide 31). Vertical lines mark the same phase in every cycle.',
          'Two stacked sine traces with the same rhythm: sound pressure above and the hair cell receptor potential below.'
        ),
        { type: 'keyNumber', items: [
          { value: 'up to about $3\\,\\text{kHz}$', label: 'phase locking, as the slide puts it (the book says up to about $5\\,\\text{kHz}$)' },
        ], note: 'Above it, the spike timing jitter is as large as one cycle, so spikes fall at random phases.' },
        { type: 'misconception', wrong: 'A phase-locked fibre fires on every cycle.', right: 'It may fire on only some cycles, for example a quarter of them at $1\\,\\text{kHz}$, but when it fires it does so at the same phase.' },
      ],
      conceptQuiz: [
        {
          id: 'phase-1',
          prompt: 'Why is phase locking lost at high frequencies?',
          options: [
            { text: 'The hair cells stop releasing glutamate above a few kilohertz', feedback: 'Release continues; the timing is the problem.' },
            { text: 'Spike timing varies about as much as one cycle of the wave lasts', feedback: 'Correct. The phase becomes random.' },
            { text: 'High frequencies never reach the place of the basilar membrane', feedback: 'They do, near the base.' },
          ],
          correct: 1,
        },
      ],
    },

    // 14 ----------------------------------------------------------------
    {
      id: 'spiral-ganglion',
      title: 'Spiral ganglion neurons: types I and II',
      keyTerms: ['type I', 'type II'],
      blocks: [
        { type: 'text', body: ADDENDUM },
        figureBlock(
          hotspots('spiral-ganglion', 730 / 493, 'The spiral ganglion in the core of the cochlea, its axons forming the cochlear nerve.', GANGLION_REGIONS, { quiz: false }),
          'Spiral ganglion neurons in the modiolus (slide 32).',
          'A cut-open cochlea in blue with the organ of Corti in each turn and yellow nerve fibres from each turn gathering in the centre into the cochlear nerve.'
        ),
        { type: 'compare', title: 'Two afferent types (slide 32)', columns: ['Type I', 'Type II'], rows: [
          { label: 'Share', cells: ['About 90 to 95 percent', 'About 5 to 10 percent'] },
          { label: 'Fibre', cells: ['Myelinated, bipolar', 'Thin, unmyelinated'] },
          { label: 'Contacts', cells: ['One inner hair cell each; each IHC feeds several', 'Many outer hair cells each'] },
          { label: 'Carries', cells: ['Intensity, frequency and timing: most of what the brain hears', 'Mainly intense sounds; may signal damage. Role still under investigation'] },
        ] },
      ],
      conceptQuiz: [
        {
          id: 'sg-1',
          prompt: 'Which description fits a type I spiral ganglion neuron?',
          options: [
            { text: 'Myelinated, contacting one inner hair cell', feedback: 'Correct.' },
            { text: 'Unmyelinated, contacting many outer hair cells', feedback: 'That is a type II neuron.' },
            { text: 'Myelinated, contacting many outer hair cells', feedback: 'Type I neurons contact inner hair cells.' },
          ],
          correct: 0,
        },
      ],
    },

    // 15 ----------------------------------------------------------------
    {
      id: 'labelled-line',
      title: 'Labelled lines and characteristic frequency',
      keyTerms: ['labelled line', 'characteristic frequency'],
      blocks: [
        { type: 'text', body: ADDENDUM },
        { type: 'definition', term: 'Labelled line', body: 'Each auditory nerve fibre comes from one place on the basilar membrane, so its activity means one frequency band. Which fibres fire tells the brain which frequencies are present.' },
        figureBlock(
          hotspots('labelled-line', 863 / 496, 'Hair cells at three places along the basilar membrane sending fibres to ordered bands in the cochlear nucleus.', LABELLED_REGIONS, { quiz: false }),
          'Tonotopic maps on the basilar membrane and in the cochlear nucleus (Figure 11.20, slide 33).',
          'An uncoiled cochlea with hair cells at 1, 4 and 16 kHz, each sending a fibre through the spiral ganglion to its own band in an oval cochlear nucleus.'
        ),
        { type: 'definition', term: 'Characteristic frequency', body: 'The frequency that needs the least intensity to drive a neuron (slide 34). The book describes it as the frequency of the greatest response. Each fibre is frequency-tuned around it.' },
        figureBlock(
          hotspots('tuning', 527 / 568, 'Firing rate against frequency for one auditory nerve fibre at a low and a high intensity.', [], { quiz: false, layout: 'stack' }),
          'Tuning of one auditory nerve fibre (Figure 11.19, slide 34).',
          'A graph of spikes per second against frequency from 500 to 3000 Hz, with a purple low-intensity curve and a taller, broader red high-intensity curve, both peaking at 1500 Hz.'
        ),
        { type: 'steps', title: 'Reading the tuning curve', steps: [
          'Both curves peak at the same frequency: the characteristic frequency, here about $1500\\,\\text{Hz}$.',
          'A louder sound raises the rate at every frequency.',
          'A louder sound also widens the range of frequencies that drive the fibre, because more of the membrane moves.',
        ] },
        { type: 'text', body: 'Tuning reflects the cochlear mechanics and the hair cell coupling. Higher stages combine frequency with timing, intensity and context; tonotopy is kept from cochlea to brain stem to MGN to A1.' },
      ],
      conceptQuiz: [
        {
          id: 'll-1',
          prompt: 'A fibre fires only for tones near $4\\,\\text{kHz}$. What does that tell you about it?',
          options: [
            { text: 'It contacts hair cells at the place tuned to $4\\,\\text{kHz}$', feedback: 'Correct. Its place on the membrane labels its line.' },
            { text: 'It fires $4000$ spikes per second whatever the tone', feedback: 'No fibre fires that fast; it is tuned by place.' },
            { text: 'It contacts hair cells at the apex of the cochlea', feedback: '$4\\,\\text{kHz}$ is high-mid, nearer the base than the apex.' },
          ],
          correct: 0,
        },
      ],
    },

    // 16 ----------------------------------------------------------------
    {
      id: 'pathway',
      title: 'The central auditory pathway',
      keyTerms: ['cochlear nuclei', 'superior olive', 'lateral lemniscus', 'inferior colliculus', 'medial geniculate nucleus', 'MGN', 'A1'],
      blocks: [
        { type: 'text', body: ADDENDUM + ' Homework reading, pages 389 to 393.' },
        { type: 'steps', title: 'One main route (slide 35)', steps: [
          { title: 'Spiral ganglion', body: 'axons in the auditory nerve.' },
          { title: 'Cochlear nuclei', body: '(dorsal and ventral, in the medulla): input from the ipsilateral ear only.' },
          { title: 'Superior olive:', body: 'the first major binaural comparison; input from both cochlear nuclei.' },
          { title: 'Lateral lemniscus to the inferior colliculus', body: 'of the midbrain, where all ascending pathways converge.' },
          { title: 'Medial geniculate nucleus (MGN)', body: 'of the thalamus.' },
          { title: 'Primary auditory cortex (A1)', body: 'in the temporal lobe.' },
        ] },
        figureBlock(
          hotspots('pathway', 1053 / 1074, 'The auditory pathway as a flow chart and through brain stem sections.', PATHWAY_REGIONS, { quiz: false }),
          'Auditory pathways (Figure 11.18, slide 35). Only the connections from one side are drawn.',
          'Left: a column of coloured boxes from spiral ganglion up to auditory cortex. Middle: red lines from the cochlea through brain stem cross sections to both auditory cortices.'
        ),
        { type: 'whyItMatters', title: 'Clinical consequence', body: 'Unlike vision, hearing becomes bilateral very early. Every nucleus above the cochlear nuclei receives both ears, so a one-sided central lesion rarely causes deafness in one ear. Only damage to one cochlear nucleus or auditory nerve does.' },
        { type: 'detail', title: 'Feedback', body: 'The pathway is not one-way. Brain stem neurons send efferents to the outer hair cells, and auditory cortex sends axons back to the MGN and the inferior colliculus.' },
      ],
      conceptQuiz: [
        {
          id: 'pathway-1',
          prompt: 'Where is input from the two ears first compared?',
          options: [
            { text: 'In the superior olive', feedback: 'Correct. Its cells receive both cochlear nuclei.' },
            { text: 'In the cochlear nuclei', feedback: 'Each cochlear nucleus hears only its own ear.' },
            { text: 'In primary auditory cortex', feedback: 'Cortex is binaural, but the comparison starts much earlier.' },
          ],
          correct: 0,
        },
      ],
    },

    // 17 ----------------------------------------------------------------
    {
      id: 'loudness',
      title: 'How loudness is encoded',
      keyTerms: ['rate code', 'population code'],
      blocks: [
        { type: 'text', body: ADDENDUM },
        { type: 'compare', title: 'Two codes for intensity (slide 36)', columns: ['Rate code', 'Population code'], rows: [
          { label: 'Chain', cells: ['Stronger sound, larger receptor potential, higher spike rate', 'Stronger sound spreads basilar membrane motion, recruits more fibres'] },
          { label: 'Limit', cells: ['Saturates', 'Widens each fibre\'s response range'] },
        ] },
        { type: 'misconception', wrong: 'Loudness is represented by a dedicated volume neuron.', right: 'It is distributed: the firing rates and the number of active fibres together correlate with perceived loudness.' },
      ],
      conceptQuiz: [
        {
          id: 'loudness-1',
          prompt: 'A tone gets louder at the same frequency. What happens in the auditory nerve?',
          options: [
            { text: 'Fibres fire faster and more fibres become active', feedback: 'Correct. Rate and population both rise.' },
            { text: 'The same fibres fire at the same rate but in sync', feedback: 'Intensity raises rate and recruits fibres.' },
            { text: 'Fibres with a higher characteristic frequency take over', feedback: 'Recruitment spreads around the place, it does not jump.' },
          ],
          correct: 0,
        },
      ],
    },

    // 18 ----------------------------------------------------------------
    {
      id: 'frequency-codes',
      title: 'Two codes for frequency and the volley principle',
      keyTerms: ['volley principle'],
      blocks: [
        { type: 'text', body: ADDENDUM + ' Place tells you where; timing tells you when (slide 37).' },
        { type: 'compare', title: 'Place and timing', columns: ['Place (tonotopy)', 'Timing (phase locking)'], rows: [
          { label: 'Signal', cells: ['Which place on the basilar membrane peaks', 'At what phase of each cycle spikes occur'] },
          { label: 'Works for', cells: ['The whole spectrum; the only code at high frequencies', 'Mainly lower frequencies, up to about $3\\,\\text{kHz}$'] },
        ] },
        { type: 'definition', term: 'Volley principle', body: 'A single fibre cannot fire on every cycle of a fast tone, but a group of phase-locked fibres can, each taking some cycles. Their pooled spikes mark every cycle, so the population signals the frequency.' },
        demoBlock('phase-locking', PHASE,
          'Phase locking and the volley. Six model fibres, each with a refractory period of $1\\,\\text{ms}$ and a fixed timing jitter. Illustrative, not fitted to data.',
          'A sine wave over ten cycles, six rows of spike ticks below it and a pooled row, with a histogram of spike phase on the right. At low frequency the ticks line up under the troughs and the histogram has one peak; at high frequency they scatter and it is flat.'
        ),
        { type: 'steps', title: 'Why tonotopy alone is not enough (p. 392)', steps: [
          'Tonotopic maps have no neurons with a characteristic frequency below about $200\\,\\text{Hz}$, so a $50\\,\\text{Hz}$ and a $200\\,\\text{Hz}$ tone peak at almost the same place.',
          'The place of the peak also shifts with intensity, not only frequency.',
          'Timing adds an independent cue: the interval between phase-locked spikes.',
        ] },
        { type: 'compare', title: 'Which code at which frequency (p. 393)', columns: ['Code'], rows: [
          { label: 'Very low', cells: ['Phase locking'] },
          { label: 'Intermediate', cells: ['Phase locking with the volley, and tonotopy'] },
          { label: 'High', cells: ['Tonotopy alone'] },
        ] },
      ],
      conceptQuiz: [
        {
          id: 'codes-1',
          prompt: 'How can the auditory nerve mark every cycle of a $2\\,\\text{kHz}$ tone if each fibre is refractory for about $1\\,\\text{ms}$?',
          options: [
            { text: 'Several fibres fire on different cycles at the same phase', feedback: 'Correct. That is the volley principle.' },
            { text: 'Each fibre shortens its refractory period below one cycle', feedback: 'The refractory period does not adapt that way.' },
            { text: 'The place code takes over and timing is no longer used', feedback: 'At $2\\,\\text{kHz}$ both codes still work.' },
          ],
          correct: 0,
        },
      ],
    },

    // 19 ----------------------------------------------------------------
    {
      id: 'auditory-cortex',
      title: 'Auditory cortex',
      keyTerms: ['primary auditory cortex', 'acoustic radiation', 'isofrequency bands'],
      blocks: [
        { type: 'text', body: ADDENDUM + ' Homework reading, pages 399 to 403. Tonotopy survives, but the code gets richer (slide 38).' },
        figureBlock(
          hotspots('a1', 614 / 341, 'The brain with primary and secondary auditory cortex on the temporal lobe, and an inset of the tonotopic map.', A1_REGIONS, { quiz: false }),
          'Primary auditory cortex (Figure 11.27, slide 38). The inset numbers are characteristic frequencies.',
          'A lateral view of the brain with a small purple patch on the upper temporal lobe and a green surround; an inset shows the patch striped from 500 Hz to 16 000 Hz.'
        ),
        { type: 'steps', title: 'From the MGN to A1', steps: [
          'MGN axons project through the internal capsule in the acoustic radiation.',
          'They end in layer IV of A1, Brodmann area 41 on the superior temporal lobe.',
          'A1 is tonotopic: isofrequency bands, low frequencies rostral and lateral, high frequencies caudal and medial, with columns of similar characteristic frequency.',
        ] },
        { type: 'compare', title: 'What cortical neurons respond to', columns: ['Detail'], rows: [
          { label: 'A1', cells: ['Sharp frequency tuning; some intensity tuning; clicks, noise bursts, frequency sweeps, vocalizations; transient or sustained'] },
          { label: 'Secondary areas', cells: ['More complex sounds, more abstract representations; some not tonotopic'] },
          { label: 'Wernicke\'s area', cells: ['Its loss spares the sensation of sound but impairs understanding of speech'] },
        ] },
      ],
      conceptQuiz: [
        {
          id: 'a1-1',
          prompt: 'Where is primary auditory cortex?',
          options: [
            { text: 'On the superior temporal lobe', feedback: 'Correct. Brodmann area 41.' },
            { text: 'On the occipital pole', feedback: 'That is primary visual cortex.' },
            { text: 'In the medial geniculate nucleus', feedback: 'The MGN is the thalamic relay before cortex.' },
          ],
          correct: 0,
        },
      ],
    },

    // 20 ----------------------------------------------------------------
    {
      id: 'cortical-damage',
      title: 'What cortical damage reveals',
      keyTerms: [],
      blocks: [
        { type: 'text', body: ADDENDUM + ' Damage tells us that hearing a sound and understanding a sound are different problems (slide 39).' },
        { type: 'compare', title: 'Lesions of auditory cortex', columns: ['Result'], rows: [
          { label: 'Bilateral', cells: ['Severe loss of conscious hearing; ablation causes deafness'] },
          { label: 'Unilateral', cells: ['Detection, frequency and intensity discrimination near normal; sound localization impaired'] },
          { label: 'Specialized networks', cells: ['Damage can impair speech, music or sound-object recognition'] },
        ] },
        { type: 'whyItMatters', title: 'Compared with vision', body: 'A unilateral V1 lesion blinds a whole hemifield. A unilateral A1 lesion leaves hearing in both ears, because both ears project to both hemispheres.' },
        { type: 'example', body: 'Central auditory disorders can occur with an intact cochlea. Peripheral hearing asks whether energy reached the receptor; central hearing asks what the pattern means.' },
      ],
      conceptQuiz: [
        {
          id: 'damage-1',
          prompt: 'After a stroke destroys the left primary auditory cortex only, what is most likely?',
          options: [
            { text: 'Deafness in the right ear, as a V1 lesion blinds a hemifield', feedback: 'Both ears reach both hemispheres, so neither ear goes deaf.' },
            { text: 'Near-normal detection, but poorer localization of sounds', feedback: 'Correct. This is the usual unilateral result.' },
            { text: 'Loss of all hearing, since A1 is the only route to awareness', feedback: 'That needs bilateral damage.' },
          ],
          correct: 1,
        },
      ],
    },
  ],

  recap: {
    terms: [
      { term: 'Sound', definition: 'Compression and rarefaction of air. Frequency ($\\text{Hz}$) is pitch, amplitude is loudness. Audible $20\\,\\text{Hz}$ to $20\\,\\text{kHz}$.' },
      { term: 'Outer, middle, inner ear', definition: 'Pinna and canal; tympanic membrane and ossicles; cochlea medial to the oval window.' },
      { term: 'Path of sound', definition: 'Air, bone, fluid, membrane, hair cell.' },
      { term: 'Acoustic impedance', definition: 'Opposition to sound. Air < fluid < solid. Ossicles raise oval window pressure about $20\\times$ (lever plus small area).' },
      { term: 'Acoustic reflex', definition: 'Tensor tympani and stapedius stiffen the chain. Low frequencies more. Protects, adapts to noise; tires; $50$ to $100\\,\\text{ms}$ late.' },
      { term: 'Scalae', definition: 'Vestibuli and tympani: perilymph ($\\text{Na}^+$ rich). Media: endolymph ($\\text{K}^+$ rich, $+80\\,\\text{mV}$), made by the stria vascularis.' },
      { term: 'Round window', definition: 'Bulges opposite to the oval window, so the incompressible fluid can move.' },
      { term: 'Basilar membrane', definition: 'Base narrow and stiff: high frequencies. Apex about 5 times wider, about 100 times floppier: low. Travelling wave, place code.' },
      { term: 'Tonotopy', definition: 'Ordered map of frequency. Basilar membrane, relay nuclei, MGN, A1.' },
      { term: 'Hair cells', definition: 'Not neurons: graded receptor potential, no action potentials. IHC: output. OHC: amplifier.' },
      { term: 'Transduction', definition: 'Bend toward tallest, tip links stretch, MET channels open, $\\text{K}^+$ in, depolarize, $\\text{Ca}^{2+}$ in, glutamate, spiral ganglion fires.' },
      { term: '$\\text{K}^+$ story', definition: 'Cell about $125\\,\\text{mV}$ below endolymph: $\\text{K}^+$ in, fast and passive; out at the base to perilymph. No pump needed.' },
      { term: 'Compression and rarefaction (slide 20)', definition: 'Compression: membrane down, links slack, channels close, hyperpolarize. Rarefaction: up, stretch, open, depolarize.' },
      { term: 'Shear', definition: 'Basilar and tectorial membranes slide past each other and bend the stereocilia.' },
      { term: 'Prestin, electromotility', definition: 'OHC depolarized shortens, hyperpolarized lengthens; voltage driven, no ATP. Both directions add energy: cochlear amplifier (about $100\\times$).' },
      { term: 'Efferents to OHCs', definition: 'Brain stem, acetylcholine, hyperpolarize: modulate the amplifier, do not drive each cycle.' },
      { term: 'IHC versus OHC', definition: 'IHC: about 95 percent of afferents, one IHC to about 10 fibres. OHC: 3 times more cells, several to one fibre, strong efferents.' },
      { term: 'Cochlear implant', definition: 'Microphone, band splitting, electrodes along the cochlea. Needs an intact nerve. Exploits tonotopy; a neural interface.' },
      { term: 'Spiral ganglion types', definition: 'Type I: about 90 to 95 percent, myelinated, one IHC each. Type II: unmyelinated, many OHCs, intense sounds.' },
      { term: 'Characteristic frequency', definition: 'Frequency needing the least intensity to drive a fibre. Louder: higher rate, wider range.' },
      { term: 'Labelled line', definition: 'Each fibre stands for one place, so one frequency band.' },
      { term: 'Central pathway', definition: 'Spiral ganglion, cochlear nuclei (ipsilateral), superior olive (first binaural), lateral lemniscus, inferior colliculus, MGN, A1.' },
      { term: 'Loudness', definition: 'Rate code (saturates) plus population code (recruitment). No volume neuron.' },
      { term: 'Phase locking', definition: 'Spikes at a fixed phase of the wave, not on every cycle. Up to about $3\\,\\text{kHz}$ (book: $5\\,\\text{kHz}$).' },
      { term: 'Volley principle', definition: 'Phase-locked fibres taking turns mark every cycle together.' },
      { term: 'Frequency codes', definition: 'Low: timing. Intermediate: both. High: place alone.' },
      { term: 'A1', definition: 'Superior temporal lobe, area 41, via the acoustic radiation; isofrequency bands, low rostral and lateral.' },
      { term: 'Cortical lesions', definition: 'Bilateral: deafness. Unilateral: hearing kept, localization impaired. Hearing is not understanding.' },
    ],
    equations: [
      { name: 'Pressure', tex: 'P = \\frac{F}{A}', note: 'The ossicles raise $F$ and the footplate has a small $A$: about $20\\times$ the pressure at the oval window.' },
    ],
  },

  lectureQuiz: [
    // Easy ----------------------------------------------------------------
    {
      id: 'q01',
      difficulty: 'easy',
      type: 'groupItems',
      prompt: 'Sort each structure into the part of the ear it belongs to.',
      points: 1,
      groups: [{ label: 'Outer ear' }, { label: 'Middle ear' }, { label: 'Inner ear' }],
      items: [
        { text: 'Pinna', group: 'Outer ear' },
        { text: 'Malleus', group: 'Middle ear' },
        { text: 'Organ of Corti', group: 'Inner ear' },
        { text: 'Auditory canal', group: 'Outer ear' },
        { text: 'Tympanic membrane', group: 'Middle ear', explanation: 'The book counts the tympanic membrane and the ossicles as the middle ear.' },
        { text: 'Basilar membrane', group: 'Inner ear' },
        { text: 'Stapes', group: 'Middle ear' },
        { text: 'Cochlea', group: 'Inner ear' },
      ],
      modelAnswer: [
        'Outer ear: from the pinna to the tympanic membrane, so the pinna and the auditory canal.',
        'Middle ear: the tympanic membrane and the ossicles, here the malleus and the stapes.',
        'Inner ear: everything medial to the oval window: the cochlea, the basilar membrane and the organ of Corti on it.',
      ],
    },
    {
      id: 'q02',
      difficulty: 'easy',
      type: 'mc',
      prompt: 'Which membrane inside the cochlea vibrates most at a place that depends on the sound frequency?',
      options: [
        { text: 'Reissner\'s membrane', feedback: 'It separates the scala vestibuli from the scala media but does not carry the place code.' },
        { text: 'Tectorial membrane', feedback: 'It covers the hair cells; the travelling wave runs along the membrane below them.' },
        { text: 'Basilar membrane', feedback: 'Correct. Its width and stiffness change along its length.' },
        { text: 'Tympanic membrane', feedback: 'That is the eardrum, outside the cochlea.' },
      ],
      correct: 2,
      modelAnswer: [
        'The basilar membrane is narrow and stiff at the base and wide and floppy at the apex.',
        'A travelling wave peaks at the base for high frequencies and near the apex for low ones.',
        'This place code is the basis of tonotopy (HW3 Exercise 1A).',
      ],
    },
    {
      id: 'q03',
      difficulty: 'easy',
      type: 'label',
      prompt: 'Identify the seven structures indicated in the figure.',
      points: 1,
      hotspots: hotspots('ear', 1011 / 809, 'The outer, middle and inner ear with seven numbered markers.', EAR_REGIONS),
      wordBank: ['Cochlea', 'Round window', 'Ossicles', 'Pinna', 'Auditory-vestibular nerve', 'Eustachian tube', 'Tympanic membrane', 'Oval window', 'Auditory canal'],
      modelAnswer: [
        'Outer ear: 1 pinna, 2 auditory canal.',
        'Middle ear: 3 tympanic membrane, 4 ossicles.',
        'Inner ear: 5 oval window under the stapes, 6 cochlea, 7 auditory-vestibular nerve leaving it.',
        'The round window and the Eustachian tube are not marked in this figure.',
      ],
    },
    {
      id: 'q04',
      difficulty: 'easy',
      type: 'fillBlank',
      prompt: 'Fill in the blanks.',
      points: 1,
      text: 'Endolymph fills the scala ___. Perilymph fills the scala vestibuli and the scala ___.',
      blanks: [
        { accept: ['media', 'scala media', 'cochlear duct'] },
        { accept: ['tympani', 'scala tympani'] },
      ],
      modelAnswer: [
        'The scala media, or cochlear duct, holds endolymph: $\\text{K}^+$ rich and positive.',
        'The scala vestibuli and the scala tympani hold perilymph, which is like cerebrospinal fluid.',
      ],
    },

    // Medium --------------------------------------------------------------
    {
      id: 'q05',
      difficulty: 'medium',
      type: 'inlineChoice',
      prompt: 'Circle the right answer: the potassium story of the hair cell.',
      points: 1,
      sentences: [
        {
          text: 'Endolymph is rich in ___ and is about ___ more positive than perilymph.',
          choices: [
            { options: ['$\\text{Na}^+$', '$\\text{K}^+$'], answer: 1 },
            { options: ['$125\\,\\text{mV}$', '$80\\,\\text{mV}$', '$40\\,\\text{mV}$'], answer: 1 },
          ],
          explanation: 'The stria vascularis secretes $\\text{K}^+$ into the endolymph: the endocochlear potential.',
        },
        {
          text: 'When the MET channels open, $\\text{K}^+$ flows ___ the hair cell, which ___.',
          choices: [
            { options: ['into', 'out of'], answer: 0 },
            { options: ['depolarizes', 'hyperpolarizes'], answer: 0 },
          ],
        },
        {
          text: 'This $\\text{K}^+$ movement is ___, so recycling it needs ___.',
          choices: [
            { options: ['active', 'passive'], answer: 1 },
            { options: ['ATP', 'no pump'], answer: 1 },
          ],
          explanation: '$\\text{K}^+$ enters down its gradient at the top and leaves at the base into $\\text{K}^+$-poor perilymph.',
        },
        {
          text: 'The depolarization opens voltage-gated ___ channels, which trigger the release of ___.',
          choices: [
            { options: ['$\\text{K}^+$', '$\\text{Na}^+$', '$\\text{Ca}^{2+}$'], answer: 2 },
            { options: ['acetylcholine', 'glutamate', 'GABA'], answer: 1 },
          ],
        },
        {
          text: 'The ___ has a graded receptor potential, while the ___ fires action potentials.',
          choices: [
            { options: ['hair cell', 'spiral ganglion neuron'], answer: 0 },
            { options: ['hair cell', 'spiral ganglion neuron'], answer: 1 },
          ],
          explanation: 'HW3 Exercise 1B: hair cells are not neurons.',
        },
      ],
      modelAnswer: [
        'Endolymph: $\\text{K}^+$ rich, about $80\\,\\text{mV}$ positive.',
        '$\\text{K}^+$ flows into the cell through the open MET channels, and the cell depolarizes.',
        'The flow is passive, so no pump or ATP is needed to recycle the $\\text{K}^+$.',
        'Voltage-gated $\\text{Ca}^{2+}$ channels open and glutamate is released.',
        'The hair cell has a graded receptor potential; the spiral ganglion neuron fires.',
      ],
    },
    {
      id: 'q06',
      difficulty: 'medium',
      type: 'order',
      prompt: 'Rank the events from a sound in the air to auditory nerve firing (1 = first, 6 = last).',
      points: 1,
      items: [
        'Shear between the basilar and tectorial membranes bends the stereocilia',
        'Air pressure waves vibrate the tympanic membrane',
        'The basilar membrane flexes in a travelling wave',
        'The ossicles move the stapes footplate at the oval window',
        'The hair cell depolarizes and releases glutamate onto spiral ganglion neurites',
        'The stapes pushes on the perilymph of the scala vestibuli',
      ],
      correctOrder: [1, 3, 5, 2, 0, 4],
      modelAnswer: [
        'Air: the sound wave vibrates the tympanic membrane.',
        'Bone: the ossicles carry the movement to the stapes at the oval window.',
        'Fluid: the stapes moves the perilymph of the scala vestibuli.',
        'Membrane: the basilar membrane flexes in a travelling wave.',
        'Hair cell: shear bends the stereocilia, the cell depolarizes and releases glutamate, and the spiral ganglion neuron fires.',
      ],
    },
    {
      id: 'q07',
      difficulty: 'medium',
      type: 'matchPairs',
      prompt: 'Match each property to the hair cell type it describes.',
      points: 1,
      reusable: true,
      rightTitle: 'Hair cell type',
      right: [
        { id: 'ihc', text: 'Inner hair cells' },
        { id: 'ohc', text: 'Outer hair cells' },
      ],
      left: [
        { text: 'Supply about 95 percent of auditory nerve afferents', answer: 'ihc' },
        { text: 'Receive strong efferent input from the brain stem', answer: 'ohc' },
        { text: 'Contain prestin and change length with membrane potential', answer: 'ohc' },
        { text: 'One cell feeds about ten spiral ganglion neurons', answer: 'ihc' },
        { text: 'Several cells converge onto one spiral ganglion neuron', answer: 'ohc' },
        { text: 'Convert basilar membrane motion into the main neural output', answer: 'ihc' },
      ],
      modelAnswer: [
        'Inner hair cells report the sound: about 95 percent of afferents, each cell feeding about ten fibres, the main output.',
        'Outer hair cells improve the instrument: prestin electromotility, strong efferent input, several cells per fibre.',
      ],
    },
    {
      id: 'q08',
      difficulty: 'medium',
      type: 'trueFalse',
      prompt: 'Determine whether each statement is true or false. Correct every false statement in one line.',
      points: 1,
      statements: [
        { text: 'The basilar membrane is narrow and stiff at the base, so high frequencies peak there.', answer: true, justification: 'The base is about 100 times stiffer; the wave for a high tone dies out there.' },
        { text: 'The acoustic reflex attenuates high frequencies more than low frequencies.', answer: false, correction: 'It attenuates low frequencies more than high ones.' },
        { text: 'The ossicles raise the pressure at the oval window mainly because the stapes footplate is larger than the tympanic membrane.', answer: false, correction: 'The footplate is much smaller than the tympanic membrane, which concentrates the force.' },
        { text: 'Tonotopic maps exist in the cochlear nuclei, the MGN and primary auditory cortex.', answer: true, justification: 'Tonotopy is preserved from the cochlea to A1.' },
      ],
      modelAnswer: [
        'a) True.',
        'b) False: the reflex suppresses low frequencies more, which helps hear speech in low-frequency noise.',
        'c) False: pressure is force over area; the small footplate and the lever action give about $20\\times$ the pressure.',
        'd) True.',
      ],
    },
    {
      id: 'q09',
      difficulty: 'medium',
      type: 'multiSelect',
      prompt: 'Which statements about the central auditory pathway are correct?',
      points: 1,
      options: [
        { text: 'Each cochlear nucleus receives input from the ear on its own side only.', correct: true, feedback: 'Correct. All later nuclei receive both ears.' },
        { text: 'The superior olive is the first stage that compares input from the two ears.', correct: true, feedback: 'Correct. It receives both cochlear nuclei.' },
        { text: 'The MGN projects to primary auditory cortex in the occipital lobe.', correct: false, feedback: 'A1 is on the superior temporal lobe.' },
        { text: 'A lesion of one MGN causes complete deafness in the opposite ear.', correct: false, feedback: 'Above the cochlear nuclei both ears are represented on each side.' },
      ],
      modelAnswer: [
        'Cochlear nuclei: ipsilateral ear only.',
        'Superior olive: first binaural comparison.',
        'MGN to A1 in the temporal lobe, through the acoustic radiation.',
        'Because hearing is bilateral above the cochlear nuclei, a one-sided central lesion rarely causes deafness in one ear.',
      ],
    },
    {
      id: 'q10',
      difficulty: 'medium',
      type: 'classify',
      prompt: 'Using the convention of slide 20, fill in the table for the two phases of a sound wave.',
      points: 1,
      categories: ['Moves up', 'Moves down', 'Open', 'Close', 'Depolarizes', 'Hyperpolarizes'],
      categoriesTitle: 'Choices',
      rowHeader: 'Phase',
      columns: ['Basilar membrane', 'MET channels', 'Hair cell'],
      items: [
        { text: 'Compression', answers: ['Moves down', 'Close', 'Hyperpolarizes'], explanation: 'Shear pushes the tip links, which slacken.' },
        { text: 'Rarefaction', answers: ['Moves up', 'Open', 'Depolarizes'], explanation: 'Shear pulls the tip links, which stretch.' },
      ],
      modelAnswer: [
        'Compression moves the basilar membrane down; the shear pushes the tip links, MET channels close and the hair cell hyperpolarizes.',
        'Rarefaction moves it up; the shear pulls the tip links, MET channels open and the hair cell depolarizes.',
        'Either way the cell responds to the shear between the basilar and tectorial membranes, not to the membranes approaching each other.',
      ],
    },

    // Hard ----------------------------------------------------------------
    {
      id: 'q11',
      difficulty: 'hard',
      type: 'classify',
      prompt: 'For each finding, classify which code for frequency it relies on: Place code / Timing code / Both.',
      points: 1,
      categories: ['Place code', 'Timing code', 'Both'],
      items: [
        { text: 'A $16\\,\\text{kHz}$ tone is identified by which auditory nerve fibres are active.', answer: 'Place code', explanation: 'Far above the phase-locking limit: tonotopy alone.' },
        { text: 'A $50\\,\\text{Hz}$ and a $200\\,\\text{Hz}$ tone peak at almost the same place, yet they are told apart.', answer: 'Timing code', explanation: 'No characteristic frequencies below about $200\\,\\text{Hz}$; spike intervals differ.' },
        { text: 'Six fibres, each firing on some cycles at the same phase, together mark every cycle of a tone.', answer: 'Timing code', explanation: 'The volley principle.' },
        { text: 'A $1\\,\\text{kHz}$ tone excites fibres at one place, and they fire at a fixed phase of each cycle.', answer: 'Both', explanation: 'Intermediate frequencies use place and timing.' },
        { text: 'A cochlear implant electrode near the base of the cochlea evokes a high-pitched sound.', answer: 'Place code', explanation: 'The implant exploits tonotopy.' },
        { text: 'The interval between a fibre\'s spikes is a whole number of sound periods.', answer: 'Timing code', explanation: 'Phase-locked spikes skip cycles but keep the phase.' },
      ],
      modelAnswer: [
        'Place code: which fibres, and so which place on the basilar membrane, are active. The only code at high frequencies, and what an implant uses.',
        'Timing code: phase locking, alone or pooled in a volley. The only code below about $200\\,\\text{Hz}$ and useful up to about $3\\,\\text{kHz}$.',
        'At intermediate frequencies both are available.',
      ],
    },
    {
      id: 'q12',
      difficulty: 'hard',
      type: 'trueFalse',
      prompt: 'Determine whether each statement about outer hair cells is true or false. Correct every false statement in one line.',
      points: 1,
      statements: [
        { text: 'Outer hair cells amplify mainly by pulling the basilar membrane closer to the tectorial membrane.', answer: false, correction: 'Timed length changes add energy to the vibration and increase the shear on inner hair cells.' },
        { text: 'Both shortening and lengthening of an outer hair cell can reinforce basilar membrane motion if correctly timed.', answer: true, justification: 'Like pushing a swing in both halves of the cycle.' },
        { text: 'Efferent acetylcholine drives each outer hair cell contraction cycle by cycle.', answer: false, correction: 'The cell\'s own receptor potential drives each contraction; efferents only modulate the gain.' },
        { text: 'Prestin uses ATP to change the cell length on each cycle.', answer: false, correction: 'Prestin is driven by membrane potential and does not use ATP.' },
      ],
      modelAnswer: [
        'a) False: amplification is energy put into the vibration, not narrowing the gap (slide 25).',
        'b) True.',
        'c) False: efferents hyperpolarize and modulate; the local receptor potential drives the contractions (slide 26).',
        'd) False: prestin is a voltage-driven motor, fast enough for high frequencies.',
      ],
    },
    {
      id: 'q13',
      difficulty: 'hard',
      type: 'clinicalCase',
      scenario: 'A patient has lost almost all hair cells in both cochleas after treatment with an ototoxic drug. Imaging and testing show that both auditory nerves are intact. The patient receives a cochlear implant with electrodes along the cochlea.',
      prompt: 'Which statement best describes what the implant can and cannot restore?',
      options: [
        { text: 'It can convey frequency by stimulating fibres at different places, but not the fine tuning that outer hair cells add', feedback: 'Correct. It exploits tonotopy as a neural interface, with no cochlear amplifier.' },
        { text: 'It can restore normal hearing, because it vibrates the basilar membrane like a small loudspeaker in the cochlea', feedback: 'An implant does not move the membrane; it stimulates the nerve.' },
        { text: 'It can restore only low frequencies, because electrodes stimulate the nerve only at the apex of the cochlea', feedback: 'Electrodes run along the cochlea; base electrodes give high pitch.' },
        { text: 'It would work just as well if the auditory nerves were destroyed, since it drives auditory cortex directly', feedback: 'It needs the nerve: it stimulates the fibres in the cochlea.' },
      ],
      correct: 0,
      modelAnswer: [
        'Key finding: hair cells gone, auditory nerve intact.',
        'Normally hair cells transduce, and outer hair cells sharpen tuning and boost sensitivity.',
        'The implant splits sound into bands and stimulates fibres at different places, using the tonotopy of the nerve: base high, apex low.',
        'It cannot restore hair cell mechanics: there is no cochlear amplifier, and frequency resolution is limited by the electrode sites.',
        'It would fail without the auditory nerve, which it drives directly.',
      ],
    },
    {
      id: 'q14',
      difficulty: 'hard',
      type: 'clinicalCase',
      scenario: 'After high doses of the antibiotic kanamycin, a patient\'s hearing thresholds rise across a range of frequencies. In comparable cases the outer hair cells are destroyed while the inner hair cells survive.',
      prompt: 'Name the lost mechanism that best explains why the surviving inner hair cells now respond poorly to quiet sounds.',
      accept: ['cochlear amplifier', 'the cochlear amplifier', 'amplification by outer hair cells', 'outer hair cell amplification', 'electromotility', 'outer hair cell electromotility', 'prestin electromotility', 'prestin'],
      answerLabel: 'Mechanism:',
      modelAnswer: [
        'Key finding: inner hair cells, the output cells, survive, yet sensitivity is lost.',
        'Normally outer hair cells change length with their receptor potential (prestin) and amplify basilar membrane motion about 100-fold.',
        'Without them the basilar membrane moves less, the shear on the inner hair cells is smaller, and quiet sounds no longer drive them.',
        'The lost mechanism is the cochlear amplifier.',
      ],
    },
    {
      id: 'q15',
      difficulty: 'hard',
      type: 'multiSelect',
      prompt: 'A $2\\,\\text{kHz}$ tone is played. Assume each auditory nerve fibre is refractory for about $1\\,\\text{ms}$ after a spike. Which statements are correct?',
      points: 1,
      options: [
        { text: 'A single fibre cannot fire on every cycle of this tone.', correct: true, feedback: 'One cycle lasts $0.5\\,\\text{ms}$, shorter than the refractory period.' },
        { text: 'A fibre can still be phase locked on the cycles it does fire.', correct: true, feedback: 'Locking needs a fixed phase, not a spike on every cycle.' },
        { text: 'A group of fibres taking turns can mark every cycle together.', correct: true, feedback: 'That is the volley principle.' },
        { text: 'At this frequency the brain must rely on the place code alone.', correct: false, feedback: 'Below about $3\\,\\text{kHz}$ timing still works alongside place.' },
      ],
      modelAnswer: [
        'Period: $1/2000\\,\\text{s} = 0.5\\,\\text{ms}$, shorter than the refractory period, so one fibre fires at most every other cycle.',
        'Phase locking only requires that spikes fall at the same phase.',
        'Pooled across fibres, spikes mark every cycle: the volley principle.',
        '$2\\,\\text{kHz}$ is below the course\'s phase-locking limit, so both place and timing are available.',
      ],
    },
    {
      id: 'q16',
      difficulty: 'hard',
      type: 'interpret',
      prompt: 'The figure shows one auditory nerve fibre\'s firing rate against tone frequency, at a low and at a high intensity. Which reading is correct?',
      figure: {
        type: 'widget',
        name: 'image-hotspots',
        props: hotspots('tuning', 527 / 568, 'Firing rate against frequency for one fibre at two intensities.', [], { quiz: false, layout: 'stack' }),
        caption: 'Tuning of an auditory nerve fibre (Figure 11.19).',
        fallbackAlt: 'Two tuning curves from 500 to 3000 Hz, both peaking at 1500 Hz; the high-intensity curve is taller and broader.',
      },
      options: [
        { text: 'The CF is about $1.5\\,\\text{kHz}$; a louder tone raises the rate and widens the range of frequencies that drive it', feedback: 'Correct. Rate code plus wider recruitment.' },
        { text: 'The CF is about $1.5\\,\\text{kHz}$; a louder tone raises the rate but leaves the range of effective frequencies unchanged', feedback: 'The high-intensity curve is broader as well as taller.' },
        { text: 'The CF is about $3\\,\\text{kHz}$, where the fibre needs the most intensity, and a louder tone lowers the rate there', feedback: 'The CF needs the least intensity, and louder tones raise the rate.' },
        { text: 'The CF moves from $1.5\\,\\text{kHz}$ to $2.5\\,\\text{kHz}$ as the tone gets louder, so this fibre codes loudness by place', feedback: 'Both curves peak at the same frequency.' },
      ],
      correct: 0,
      modelAnswer: [
        'Both curves peak at about $1500\\,\\text{Hz}$: the characteristic frequency.',
        'At high intensity the peak rate is higher: the rate code for loudness.',
        'The high-intensity curve is also broader: more of the membrane moves and more frequencies drive the fibre, which recruits more fibres across the population.',
      ],
    },
  ],
};
