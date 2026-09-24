// Lecture 3: synaptic transmission and neurotransmitter systems.
// Scope: docs/scope/L03.md. Every section and question traces to a line
// in that file. Figures are slide crops in src/assets/figures/L03
// (sources in CREDITS.md) shown through the image-hotspots widget, plus
// six d3 demos (synapse timeline, chemical versus electrical synapse,
// driving force, summation and shunting, circuit motifs, AMPA versus
// NMDA).

const fig = (name) => new URL(`../assets/figures/L03/${name}.webp`, import.meta.url).href;

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

const SYNAPSE_REGIONS = [
  { id: 'terminal', label: 'Axon terminal (presynaptic element)', body: 'The swollen end of the axon. It holds the vesicles, the mitochondria that power release, and the active zones.', x: 52, y: 42, w: 36, h: 44, mx: 52, my: 36, side: 'left' },
  { id: 'vesicles', label: 'Synaptic vesicles', body: 'About $50\\,\\text{nm}$ across, filled with transmitter. Dozens per terminal, clustered near the active zones.', x: 46, y: 58, w: 12, h: 10, mx: 42, my: 60, side: 'left' },
  { id: 'granules', label: 'Secretory granules', body: 'Larger, about $100\\,\\text{nm}$, with a dense protein core. They store peptide transmitters and release them away from the active zones.', x: 35, y: 55, w: 6, h: 8, mx: 34, my: 56, side: 'left' },
  { id: 'mitochondria', label: 'Mitochondria', body: 'Supply the ATP for transmitter synthesis, vesicle loading and the pumps that restore the ion gradients.', x: 53, y: 40, w: 12, h: 12, mx: 55, my: 36, side: 'top' },
  { id: 'active-zone', label: 'Active zone', body: 'The presynaptic membrane specialisation where docked vesicles fuse. The voltage-gated $\\text{Ca}^{2+}$ channels sit here.', shape: 'rect', x: 48, y: 63, w: 22, h: 4, mx: 57, my: 63, side: 'right' },
  { id: 'cleft', label: 'Synaptic cleft', body: 'The 20 to $50\\,\\text{nm}$ gap, ten times the gap at a gap junction, filled with extracellular protein that glues the two membranes together.', shape: 'line', x: 32, y: 66.5, x2: 62, y2: 66.5, mx: 34, my: 66.5, side: 'left' },
  { id: 'psd', label: 'Postsynaptic density with receptors', body: 'The thick protein layer under the postsynaptic membrane. The transmitter receptors are embedded here.', shape: 'rect', x: 48, y: 70, w: 22, h: 6, mx: 60, my: 71, side: 'right' },
];

const EM_REGIONS = [
  { id: 'terminal', label: 'Presynaptic terminal', body: 'The large profile filling the upper two thirds of the picture, packed with vesicles.', x: 30, y: 45, w: 18, h: 20, mx: 26, my: 45, side: 'left' },
  { id: 'mitochondria', label: 'Mitochondria', body: 'The dark, striped ovals. Several sit in one terminal.', x: 56, y: 20, w: 14, h: 18, mx: 60, my: 14, side: 'top' },
  { id: 'vesicles', label: 'Synaptic vesicles', body: 'The many small circles, each about $50\\,\\text{nm}$ across.', x: 62, y: 58, w: 12, h: 12, mx: 66, my: 58, side: 'right' },
  { id: 'active-zone', label: 'Active zone', body: 'The dark, thickened stretch of presynaptic membrane facing the postsynaptic cell, with vesicles clustered against it.', shape: 'rect', x: 55, y: 89, w: 30, h: 4, mx: 68, my: 89, side: 'right' },
  { id: 'cleft', label: 'Synaptic cleft', body: 'The thin pale gap between the two dark membranes.', shape: 'line', x: 20, y: 93, x2: 60, y2: 93, mx: 24, my: 93, side: 'left' },
  { id: 'post', label: 'Postsynaptic cell', body: 'Below the cleft, with its own dark postsynaptic density.', shape: 'rect', x: 40, y: 97, w: 40, h: 6, mx: 44, my: 98, side: 'bottom' },
];

const GAP_REGIONS = [
  { id: 'cell1', label: 'Cell 1 cytoplasm', body: 'The upper cell. Its membrane is the top bilayer.', shape: 'rect', x: 45, y: 12, w: 40, h: 10, mx: 45, my: 12, side: 'top' },
  { id: 'cluster', label: 'Gap junction (many channels)', body: 'The green cluster: a gap junction is a plaque of many channels.', x: 28, y: 29, w: 28, h: 26, mx: 20, my: 28, side: 'left' },
  { id: 'channel', label: 'Gap junction channel', body: 'One channel in side view: two connexons meeting end to end. Its pore is 1 to $2\\,\\text{nm}$ wide, enough for ions and small molecules.', shape: 'rect', x: 33, y: 70, w: 16, h: 40, mx: 33, my: 88, side: 'bottom' },
  { id: 'gap', label: '3.5 nm gap', body: 'The two membranes are only about $3.5\\,\\text{nm}$ apart, ten times closer than at a chemical synapse.', x: 9, y: 64, w: 8, h: 12, mx: 9, my: 64, side: 'left' },
  { id: 'connexon', label: 'Connexon (six connexins)', body: 'A half-channel made of six connexin subunits. Each cell contributes one connexon.', x: 75, y: 70, w: 10, h: 26, mx: 75, my: 70, side: 'right' },
  { id: 'full', label: 'Two connexons make one channel', body: 'The connexon of cell 1 meets the connexon of cell 2 across the gap.', x: 84, y: 50, w: 12, h: 60, mx: 84, my: 35, side: 'right' },
  { id: 'ions', label: 'Ions and small molecules pass', body: 'Current flows directly from cytoplasm to cytoplasm, in both directions.', x: 26, y: 94, w: 6, h: 10, mx: 26, my: 96, side: 'bottom' },
];

const TARGETING_REGIONS = [
  { id: 'spine', label: '(a) One terminal on a dendritic spine', body: 'An axospinous synapse: the commonest arrangement on pyramidal cells.', x: 31, y: 28, w: 14, h: 22, mx: 31, my: 26, side: 'left' },
  { id: 'two', label: '(b) Two terminals from one axon on a soma', body: 'One axon branches and makes two contacts on the same cell body.', shape: 'rect', x: 66, y: 32, w: 40, h: 20, mx: 76, my: 30, side: 'top' },
  { id: 'wrap', label: '(c) A large terminal surrounding a soma', body: 'One giant terminal wraps the postsynaptic cell body and carries many active zones.', x: 28, y: 72, w: 42, h: 42, mx: 14, my: 72, side: 'left' },
  { id: 'multi', label: '(d) One terminal on several spines', body: 'One large terminal contacts many dendritic spines at once.', x: 74, y: 72, w: 36, h: 36, mx: 90, my: 80, side: 'right' },
  { id: 'active', label: 'Active zones', body: 'The black bars on the presynaptic side. A bigger synapse has more of them.', shape: 'rect', x: 46, y: 75, w: 5, h: 5, mx: 46, my: 75, side: 'bottom' },
];

const SYNTHESIS_REGIONS = [
  { id: 'nucleus', label: 'Nucleus', body: 'The genes for the peptide precursor and for the synthesizing enzymes are read here.', x: 8, y: 50, w: 12, h: 60, mx: 6, my: 50, side: 'left' },
  { id: 'er', label: 'Rough ER: precursor peptide made', body: 'Step 1 of the peptide route. Ribosomes on the rough ER make a precursor peptide.', x: 22, y: 50, w: 12, h: 60, mx: 24, my: 46, side: 'top' },
  { id: 'golgi', label: 'Golgi apparatus: precursor split', body: 'Step 2. The precursor is cut into the active peptide and packed into secretory granules that bud off.', x: 34, y: 50, w: 12, h: 60, mx: 34, my: 50, side: 'bottom' },
  { id: 'granule', label: 'Secretory granule', body: 'Step 3. The loaded granule leaves the Golgi.', x: 42, y: 50, w: 5, h: 14, mx: 42, my: 50, side: 'top' },
  { id: 'transport', label: 'Axonal transport of granules', body: 'Step 4. Kinesin carries the granules along microtubules to the terminal (anterograde transport).', shape: 'line', x: 47, y: 52, x2: 72, y2: 52, mx: 58, my: 52, side: 'bottom' },
  { id: 'vesicles', label: 'Synaptic vesicles in the terminal', body: 'Amines and amino acids are made here: enzymes convert precursors in the cytosol and transporter proteins load the vesicles.', x: 88, y: 50, w: 16, h: 70, mx: 92, my: 30, side: 'right' },
];

const CYCLE_REGIONS = [
  { id: 'loaded', label: 'Loaded vesicle', body: 'A synaptic vesicle filled with transmitter, docked at the active zone.', x: 26, y: 48, w: 14, h: 24, mx: 26, my: 40, side: 'top' },
  { id: 'ca', label: 'Voltage-gated calcium channel', body: 'The action potential opens it. $\\text{Ca}^{2+}$ floods in down a huge gradient ($0.0002\\,\\text{mM}$ inside).', x: 35, y: 66, w: 5, h: 10, mx: 35, my: 68, side: 'bottom' },
  { id: 'fusion', label: 'Exocytosis', body: 'The vesicle membrane fuses with the presynaptic membrane and the contents spill into the cleft.', x: 49, y: 58, w: 14, h: 22, mx: 49, my: 50, side: 'top' },
  { id: 'recycle', label: 'Recycling by endocytosis', body: 'The vesicle membrane is taken back and refilled with transmitter.', x: 67, y: 38, w: 14, h: 24, mx: 67, my: 28, side: 'top' },
  { id: 'active', label: 'Active zone', body: 'The grey band: the release site where docked vesicles wait.', shape: 'rect', x: 62, y: 62, w: 20, h: 5, mx: 70, my: 62, side: 'right' },
  { id: 'cleft', label: 'Synaptic cleft', body: 'Released transmitter diffuses across it.', shape: 'line', x: 20, y: 70, x2: 45, y2: 70, mx: 22, my: 70, side: 'left' },
  { id: 'molecules', label: 'Transmitter molecules', body: 'In the cleft on their way to the postsynaptic receptors.', x: 50, y: 69, w: 12, h: 5, mx: 54, my: 70, side: 'bottom' },
];

const SNARE_REGIONS = [
  { id: 'vesicle', label: 'Vesicle', body: 'Filled with transmitter (the small spheres).', x: 16, y: 12, w: 20, h: 22, mx: 16, my: 6, side: 'top' },
  { id: 'vsnare', label: 'v-SNARE', body: 'The SNARE protein anchored in the vesicle membrane (green).', x: 10, y: 34, w: 6, h: 10, mx: 10, my: 34, side: 'left' },
  { id: 'tsnare', label: 't-SNAREs', body: 'The SNARE proteins of the target membrane (red and purple). They bind the v-SNARE and dock the vesicle.', x: 11, y: 70, w: 10, h: 18, mx: 8, my: 72, side: 'left' },
  { id: 'synaptotagmin', label: 'Synaptotagmin', body: 'The vesicle protein that senses $\\text{Ca}^{2+}$ (blue). $\\text{Ca}^{2+}$ binding triggers fusion.', x: 5, y: 26, w: 6, h: 8, mx: 4, my: 24, side: 'left' },
  { id: 'channel', label: 'Calcium channel', body: 'Right next to the docked vesicle, so the local $\\text{Ca}^{2+}$ rise is fast and large.', x: 29, y: 82, w: 5, h: 12, mx: 29, my: 90, side: 'bottom' },
  { id: 'ca-entry', label: 'Ca²⁺ enters', body: 'The middle panel: $\\text{Ca}^{2+}$ (red dots) pours in and binds synaptotagmin; the SNAREs are zipped and the membranes are pulled together.', x: 60, y: 62, w: 10, h: 14, mx: 62, my: 66, side: 'bottom' },
  { id: 'pore', label: 'Fusion pore', body: 'The right panel: the membranes have merged and transmitter escapes through the pore into the cleft.', x: 85, y: 82, w: 10, h: 16, mx: 85, my: 92, side: 'bottom' },
];

const GPCR_REGIONS = [
  { id: 'receptor', label: 'G-protein-coupled receptor', body: 'Binds the transmitter on the outside; activates a G-protein on the inside. The receptor is not a channel.', x: 10, y: 34, w: 12, h: 26, mx: 10, my: 26, side: 'top' },
  { id: 'gprotein', label: 'G-protein', body: 'Activated by the receptor. Swaps GDP for GTP and moves along the inner face of the membrane to an effector.', x: 25, y: 52, w: 14, h: 14, mx: 25, my: 60, side: 'bottom' },
  { id: 'channel', label: 'G-protein-gated ion channel (shortcut pathway)', body: 'Effector type 1: the G-protein opens a separate ion channel directly. Fastest metabotropic route, 30 to $100\\,\\text{ms}$.', x: 38, y: 32, w: 10, h: 28, mx: 38, my: 26, side: 'top' },
  { id: 'enzyme', label: 'Enzyme (second messenger cascade)', body: 'Effector type 2: the G-protein activates an enzyme such as adenylyl cyclase.', x: 87, y: 50, w: 8, h: 14, mx: 87, my: 42, side: 'top' },
  { id: 'messengers', label: 'Second messengers', body: 'Small molecules such as cAMP made by the enzyme; they diffuse away and regulate other proteins. Slower, amplified, longer-lasting.', shape: 'rect', x: 92, y: 80, w: 12, h: 12, mx: 92, my: 86, side: 'bottom' },
];

const GABAA_REGIONS = [
  { id: 'gaba', label: 'GABA binding site', body: 'GABA (the green ball) binds at the top of the channel and opens the $\\text{Cl}^-$ pore.', x: 49, y: 30, w: 8, h: 8, mx: 49, my: 28, side: 'top' },
  { id: 'benzo', label: 'Benzodiazepine site', body: 'A separate site. Benzodiazepines such as diazepam do little alone but make the openings more frequent when GABA is present.', x: 43, y: 34, w: 6, h: 7, mx: 42, my: 33, side: 'left' },
  { id: 'barb', label: 'Barbiturate site', body: 'Barbiturates make each opening last longer when GABA is present.', x: 57, y: 34, w: 6, h: 7, mx: 58, my: 33, side: 'right' },
  { id: 'ethanol', label: 'Ethanol site', body: 'Ethanol enhances some GABA-A receptors; the effect depends on the subunit composition.', x: 38, y: 37, w: 5, h: 7, mx: 37, my: 38, side: 'left' },
  { id: 'steroid', label: 'Neurosteroid site', body: 'Molecules derived from steroid hormones; some enhance and some suppress the receptor.', x: 62, y: 38, w: 5, h: 7, mx: 63, my: 39, side: 'right' },
  { id: 'pore', label: 'Cl⁻ pore', body: 'The channel is selective for $\\text{Cl}^-$. Opening it pulls $V_m$ toward $E_{\\text{Cl}}$, about $-65\\,\\text{mV}$.', shape: 'rect', x: 49, y: 62, w: 6, h: 20, mx: 49, my: 66, side: 'bottom' },
];

const TYPES_REGIONS = [
  { id: 'large-basket', label: 'Large basket cell', body: 'Axon (teal) spreads sideways to wrap the somata and proximal dendrites of nearby pyramidal cells. Usually PV, fast spiking.', x: 16, y: 36, w: 26, h: 50, mx: 8, my: 30, side: 'left' },
  { id: 'chandelier', label: 'Chandelier cell', body: 'Axon (magenta) ends in vertical candle-like cartridges on the axon initial segments of pyramidal cells. PV, fast spiking.', x: 44, y: 42, w: 16, h: 60, mx: 44, my: 12, side: 'top' },
  { id: 'martinotti', label: 'Martinotti cell', body: 'Soma deep, axon (magenta) climbs to layer 1 and targets the dendritic tufts. SST group.', x: 61, y: 50, w: 14, h: 84, mx: 61, my: 88, side: 'bottom' },
  { id: 'double-bouquet', label: 'Double-bouquet cell', body: 'A narrow vertical bundle of descending axon (blue). 5HT3aR group.', x: 73, y: 45, w: 10, h: 60, mx: 74, my: 68, side: 'bottom' },
  { id: 'bipolar', label: 'Bipolar cell', body: 'Two dendritic trunks in a narrow vertical field. Often VIP.', x: 85, y: 28, w: 8, h: 40, mx: 85, my: 10, side: 'top' },
  { id: 'bitufted', label: 'Bitufted cell', body: 'Tufts of dendrites above and below the soma.', x: 94, y: 42, w: 8, h: 60, mx: 94, my: 76, side: 'right' },
  { id: 'neurogliaform', label: 'Neurogliaform cell', body: 'Small, dense, spider-like axon (light blue). Releases GABA diffusely (volume transmission).', x: 32, y: 80, w: 8, h: 18, mx: 32, my: 92, side: 'bottom' },
];

const TARGETS_REGIONS = [
  { id: 'tuft', label: 'Tuft dendrite-targeting (Martinotti)', body: 'Magenta axon reaching the apical tuft in layer 1.', x: 18, y: 18, w: 26, h: 16, mx: 12, my: 16, side: 'left' },
  { id: 'distal', label: 'Distal dendrite-targeting', body: 'Blue cell contacting the apical dendrite some way from the soma.', x: 43, y: 38, w: 10, h: 26, mx: 43, my: 30, side: 'top' },
  { id: 'volume', label: 'Volume transmission (neurogliaform)', body: 'Light blue cell releasing GABA into the space around it rather than at point synapses.', x: 83, y: 20, w: 12, h: 18, mx: 88, my: 14, side: 'right' },
  { id: 'axon', label: 'Axon-targeting (chandelier)', body: 'Magenta cell whose cartridges sit on the axon initial segment, the spike-initiation zone. Veto right over the output.', x: 38, y: 80, w: 24, h: 24, mx: 30, my: 88, side: 'left' },
  { id: 'soma', label: 'Soma and proximal dendrite-targeting (basket)', body: 'Teal cell on the cell body and nearby dendrites. Also well placed to control firing.', x: 72, y: 60, w: 26, h: 28, mx: 90, my: 62, side: 'right' },
  { id: 'pyramidal', label: 'Pyramidal cell', body: 'The grey triangle with its apical dendrite going up and its axon going down. The coloured dots are the inhibitory contacts.', x: 51, y: 60, w: 8, h: 8, mx: 51, my: 62, side: 'bottom' },
];

const NE_REGIONS = [
  { id: 'receptor', label: '1 NE binds the beta receptor', body: 'Norepinephrine (the small ball) binds the beta-adrenergic receptor (green), which activates a G-protein.', x: 15, y: 30, w: 12, h: 26, mx: 17, my: 26, side: 'top' },
  { id: 'gprotein', label: 'G-protein (Gs)', body: 'The stimulatory G-protein. Its alpha subunit swaps GDP for GTP and moves to the enzyme.', x: 33, y: 50, w: 14, h: 14, mx: 33, my: 58, side: 'bottom' },
  { id: 'cyclase', label: '2 Adenylyl cyclase', body: 'The effector enzyme, activated by Gs.', x: 58, y: 48, w: 10, h: 14, mx: 58, my: 47, side: 'top' },
  { id: 'camp', label: '3 ATP to cAMP', body: 'Adenylyl cyclase converts ATP into the second messenger cAMP, which diffuses through the cytosol.', shape: 'rect', x: 58, y: 68, w: 22, h: 10, mx: 52, my: 74, side: 'bottom' },
  { id: 'kinase', label: '4 Protein kinase A', body: 'cAMP activates protein kinase A, which transfers phosphate from ATP to target proteins.', shape: 'rect', x: 80, y: 68, w: 10, h: 12, mx: 80, my: 73, side: 'bottom' },
  { id: 'channel', label: '5 K⁺ channel phosphorylated and closed', body: 'PKA phosphorylates a dendritic $\\text{K}^+$ channel, which closes. Lower $g_{\\text{K}}$ raises the membrane resistance and the length constant.', x: 82, y: 35, w: 12, h: 24, mx: 82, my: 22, side: 'top' },
];

// ---------------------------------------------------------------------

export default {
  meta: {
    id: 'L03',
    number: 3,
    title: 'Synaptic transmission and neurotransmitter systems',
    chapters: [5, 6],
    pages: [
      { chapter: 5, from: 111, to: 140 },
      { chapter: 6, from: 144, to: 177 },
    ],
    lectureDate: '2026-09-11',
    examDate: '2026-10-02',
  },

  objectives: [
    'Trace chemical synaptic transmission from an action potential reaching the axon terminal through $\\text{Ca}^{2+}$-dependent release, receptor activation, and transmitter removal.',
    'Compare chemical and electrical synapses in terms of structure, signal transfer, speed, and direction of transmission.',
    'Predict the direction and relative magnitude of a postsynaptic current from ion selectivity, membrane potential, channel conductance, and reversal potential.',
    'Explain spatial and temporal summation, how dendritic properties affect signal spread, and how shunting inhibition reduces excitation.',
    'Compare AMPA, NMDA, GABA-A, and GABA-B receptor responses, including ion flow, voltage dependence, and the role of G proteins.',
    'Interpret the excitatory and inhibitory connections in the lecture\'s example circuits, and trace G protein signaling using the norepinephrine beta receptor.',
  ],

  prerequisites: [
    { text: 'Membrane potential, equilibrium potential, driving force and conductance.', lectureId: 'L02', sectionId: 'gradients' },
    { text: 'The action potential waveform and what the $\\text{Na}^+$ and $\\text{K}^+$ channels do in each phase.', lectureId: 'L02', sectionId: 'waveform' },
    { text: 'Where the spike starts, and how it propagates one way with a refractory membrane behind it.', lectureId: 'L02', sectionId: 'conduction' },
    { text: 'Soma, dendrites, dendritic spines, axon and axon terminal.', lectureId: 'L01', sectionId: 'prototypical-neuron' },
    { text: 'Axonal transport by kinesin along microtubules.', lectureId: 'L01', sectionId: 'axonal-transport' },
  ],

  sections: [
    // 1 -----------------------------------------------------------------
    {
      id: 'recap',
      title: 'Recap: the action potential reaches the terminal',
      keyTerms: ['spike-initiation zone', 'saltatory conduction', 'voltage-gated calcium channel'],
      blocks: [
        { type: 'text', body: 'Lecture 2 in a nutshell, as the slides replay it: where the spike starts, how it travels, and what it does when it arrives.' },
        { type: 'steps', title: 'From spike to release', steps: [
          { title: 'Start.', body: 'The spike-initiation zone has a high density of voltage-gated $\\text{Na}^+$ channels: the axon hillock in a central neuron, the sensory ending in a sensory neuron.' },
          { title: 'Waveform.', body: 'Rapid $\\text{Na}^+$ channel opening gives the rising phase; $\\text{Na}^+$ inactivation and delayed $\\text{K}^+$ opening repolarize; continued $\\text{K}^+$ current gives the undershoot. Equilibrium potentials: $E_{\\text{K}} = -80$, $E_{\\text{Na}} = +62$, $E_{\\text{Ca}} = +123$, $E_{\\text{Cl}} = -65\\,\\text{mV}$.' },
          { title: 'Travel.', body: 'Local current depolarizes the membrane ahead to threshold; the spike is regenerated patch by patch, or node to node under myelin (saltatory conduction). The refractory membrane behind keeps it going one way.' },
          { title: 'Arrival.', body: 'The spike depolarizes the terminal, opens voltage-gated calcium channels, and $\\text{Ca}^{2+}$ entry triggers vesicle fusion and release. That is where this lecture begins.' },
        ] },
        { type: 'whyItMatters', body: 'Everything below is what happens in the roughly one millisecond between $\\text{Ca}^{2+}$ entering the terminal and the next cell responding.' },
      ],
      conceptQuiz: [
        {
          id: 'recap-1',
          prompt: 'What does the arriving action potential do at the terminal?',
          options: [
            { text: 'Opens transmitter-gated channels on the terminal membrane', feedback: 'Transmitter-gated channels are on the postsynaptic side.' },
            { text: 'Depolarizes it and opens voltage-gated $\\text{Ca}^{2+}$ channels', feedback: 'Correct. $\\text{Ca}^{2+}$ entry is the release signal.' },
            { text: 'Drives transmitter across the cleft with an ion pump', feedback: 'Transmitter leaves by exocytosis and diffuses; nothing pumps it across.' },
          ],
          correct: 1,
        },
      ],
    },

    // 2 -----------------------------------------------------------------
    {
      id: 'synapse-anatomy',
      title: 'Synapse anatomy and chemical transmission',
      keyTerms: ['synapse', 'presynaptic', 'postsynaptic', 'axodendritic', 'axosomatic', 'axoaxonic', 'dendrodendritic', 'synaptic cleft', 'synaptic vesicle', 'secretory granule', 'active zone', 'postsynaptic density', 'exocytosis'],
      blocks: [
        { type: 'definition', term: 'Synapse', body: 'The specialised junction where a neuron communicates with another neuron, a muscle cell or a gland cell. The presynaptic cell sends, the postsynaptic cell receives; information normally flows one way.' },
        {
          type: 'compare',
          title: 'Naming a synapse by its target',
          columns: ['Presynaptic', 'Postsynaptic'],
          rows: [
            { label: 'Axodendritic (the stereotype)', cells: ['Axon', 'Dendrite (shaft or spine)'] },
            { label: 'Axosomatic', cells: ['Axon', 'Soma'] },
            { label: 'Axoaxonic', cells: ['Axon', 'Another axon'] },
            { label: 'Dendrodendritic', cells: ['Dendrite', 'Dendrite (in some specialised neurons)'] },
          ],
        },
        figureBlock(
          hotspots('synapse-types', 813 / 362, 'Four small drawings of two neurons with the synapse boxed: axon to dendrite, axon to soma, dendrite to dendrite, axon to axon.', [
            { id: 'ad', label: 'Axon to dendrite', body: 'The stereotypical arrangement.', shape: 'rect', x: 12, y: 60, w: 22, h: 70, mx: 16, my: 71, side: 'top' },
            { id: 'as', label: 'Axon to soma', body: 'Axosomatic.', shape: 'rect', x: 37, y: 60, w: 22, h: 70, mx: 37, my: 75, side: 'top' },
            { id: 'aa', label: 'Axon to axon', body: 'Axoaxonic.', shape: 'rect', x: 62, y: 60, w: 22, h: 70, mx: 57, my: 71, side: 'top' },
            { id: 'dd', label: 'Dendrite to dendrite', body: 'Dendrodendritic.', shape: 'rect', x: 87, y: 60, w: 22, h: 70, mx: 88, my: 51, side: 'top' },
          ], { quiz: false, gutter: 'ends', layout: 'stack' }),
          'The four arrangements from the slide. The printed headers name them, so this figure has no quiz mode.',
          'Four panels side by side, each with two small neurons and a boxed contact point, headed axo-dendritic, axo-somatic, dendro-dendritic and axo-axonic.'
        ),
        figureBlock(
          hotspots('chemical-synapse', 928 / 651, 'A cut-open axon terminal on a dendrite: vesicles, secretory granules, mitochondria, active zone, cleft and postsynaptic density.', SYNAPSE_REGIONS, { gutter: 'all' }),
          'The components of a chemical synapse (textbook Figure 5.4). The terminal is cut open to show the vesicles and mitochondria; the dotted band below the cleft is the postsynaptic density.',
          'A bulb-shaped axon terminal sits on a pink dendrite. Inside the terminal are two mitochondria and a heap of blue vesicles; small dark granules sit near the edges. A thin gap separates it from the dendrite, where a dotted band marks the receptors.'
        ),
        figureBlock(
          hotspots('synapse-em', 573 / 389, 'Electron micrograph of a synapse: a terminal full of vesicles and mitochondria above a postsynaptic cell, with a dark active zone between.', EM_REGIONS, { gutter: 'all' }),
          'The same structures in an electron micrograph (textbook Figure 5.5 a). Vesicles cluster against the dark active zone.',
          'A grey electron micrograph. A large profile with striped mitochondria and hundreds of small circles occupies the top; a dark thickened membrane runs along its lower edge above a thin pale gap and the cell below.'
        ),
        { type: 'keyNumber', items: [
          { value: '20 to $50\\,\\text{nm}$', label: 'width of the synaptic cleft, ten times the gap at a gap junction' },
          { value: '$50\\,\\text{nm}$', label: 'diameter of a synaptic vesicle; secretory granules are about $100\\,\\text{nm}$' },
        ] },
        { type: 'steps', title: 'Chemical transmission in one breath', steps: [
          'The action potential depolarizes the terminal and opens voltage-gated $\\text{Ca}^{2+}$ channels at the active zones.',
          '$\\text{Ca}^{2+}$ enters and triggers synaptic vesicles to fuse with the presynaptic membrane: exocytosis.',
          'Transmitter diffuses across the cleft and binds receptors in the postsynaptic density.',
          'Some receptors are transmitter-gated ion channels that open at once; others activate G-proteins. The receptor type decides the response.',
        ] },
      ],
      conceptQuiz: [
        {
          id: 'anatomy-1',
          prompt: 'Where are the transmitter receptors?',
          options: [
            { text: 'In the active zone', feedback: 'The active zone is presynaptic, where vesicles fuse.' },
            { text: 'Inside the synaptic vesicles', feedback: 'Vesicles hold transmitter, not receptors.' },
            { text: 'In the postsynaptic density', feedback: 'Correct. The protein-rich layer under the postsynaptic membrane.' },
          ],
          correct: 2,
        },
        {
          id: 'anatomy-2',
          prompt: 'An axon terminal contacts the cell body of another neuron. The synapse is',
          options: [
            { text: 'Axodendritic', feedback: 'That would be on a dendrite.' },
            { text: 'Axosomatic', feedback: 'Correct. Axon onto soma.' },
            { text: 'Axoaxonic', feedback: 'That would be on another axon.' },
          ],
          correct: 1,
        },
        {
          id: 'anatomy-3',
          prompt: 'Which organelle in the terminal stores peptide transmitters?',
          options: [
            { text: 'Secretory granules, the large dense-core ones', feedback: 'Correct. About $100\\,\\text{nm}$ across, released away from the active zones.' },
            { text: 'Synaptic vesicles, the small clear ones', feedback: 'These hold the amino acid and amine transmitters.' },
            { text: 'Mitochondria, the organelles that make ATP', feedback: 'Mitochondria supply energy; they store no transmitter.' },
          ],
          correct: 0,
        },
      ],
    },

    // 3 -----------------------------------------------------------------
    {
      id: 'electrical',
      title: 'Electrical synapses and gap junctions',
      keyTerms: ['electrical synapse', 'gap junction', 'connexin', 'connexon', 'electrically coupled', 'electrical PSP', 'synchronization'],
      blocks: [
        { type: 'definition', term: 'Gap junction', body: 'A cluster of channels that join the cytoplasm of two cells directly. Six connexin proteins make a connexon; two connexons, one from each cell, make a gap junction channel; many channels make a gap junction. The membranes are only about $3.5\\,\\text{nm}$ apart.' },
        figureBlock(
          hotspots('gap-junction', 1091 / 412, 'Two membranes joined by a plaque of gap junction channels, with one channel in side view and, on the right, one connexon and one full channel.', GAP_REGIONS, { gutter: 'all', layout: 'stack' }),
          'A gap junction (textbook Figure 5.1 b and c). Ions and small molecules pass through the 1 to $2\\,\\text{nm}$ pore in both directions.',
          'Two stacked bilayers with a cluster of green channels bridging them; one channel is shown in cross section with an arrow through it. On the right, a single half-channel and a complete two-part channel.'
        ),
        { type: 'steps', title: 'What an electrical synapse does (slide 11)', steps: [
          'An action potential in cell 1 (the presynaptic source) drives a small ionic current through the junction into cell 2 (the postsynaptic target).',
          'Cell 2 shows an electrical PSP: about $1\\,\\text{mV}$, from -65 to $-64\\,\\text{mV}$, followed by a brief dip below rest. Mind the y scale: it is tiny next to the spike.',
          'One electrical PSP rarely fires the cell, but a neuron has many electrical synapses and simultaneous PSPs sum.',
          'Most gap junctions pass current equally well both ways: transmission is bidirectional and cells are electrically coupled.',
        ] },
        figureBlock(
          hotspots('electrical-psp', 1022 / 472, 'Left: an electron micrograph and a drawing of two dendrites joined by a gap junction. Right: the action potential in cell 1 above the 1 mV electrical PSP in cell 2.', [
            { id: 'em', label: 'Gap junction between two dendrites', body: 'The electron micrograph shows the two membranes running side by side.', x: 14, y: 50, w: 22, h: 80, mx: 14, my: 8, side: 'top' },
            { id: 'spike', label: 'Action potential in cell 1', body: 'A full spike of about $100\\,\\text{mV}$.', x: 72, y: 24, w: 30, h: 36, mx: 72, my: 6, side: 'top' },
            { id: 'psp', label: 'Electrical PSP in cell 2', body: 'About $1\\,\\text{mV}$, then a small dip below rest. Note the scale: -63 to $-65\\,\\text{mV}$.', x: 72, y: 74, w: 30, h: 36, mx: 72, my: 94, side: 'bottom' },
          ], { quiz: false, gutter: 'ends', layout: 'stack' }),
          'Electrical synapses (textbook Figure 5.2). The response in the coupled cell is a hundred times smaller than the spike that caused it.',
          'A micrograph and drawing of two touching dendrites, then two traces: a large spike in cell 1 and, below, a 1 mV bump in cell 2 on a scale from −65 to −63 mV.'
        ),
        demoBlock('synapse-compare', {
          types: {
            chemical: { label: 'Chemical synapse', delay: 0.5, amplitude: 4, tauRise: 0.4, tauDecay: 3, bidirectional: false, body: 'Release, diffusion and binding add a delay of about 0.5 to $1\\,\\text{ms}$. One way only.', responseNote: 'an EPSP of a few millivolts', noneNote: 'the postsynaptic cell has no vesicles facing the presynaptic one, so nothing comes back' },
            electrical: { label: 'Electrical synapse', delay: 0.05, amplitude: 1, tauRise: 0.2, tauDecay: 1, undershoot: 0.4, bidirectional: true, body: 'Current flows straight through the gap junction with almost no delay. Both directions.', responseNote: 'an electrical PSP of about $1\\,\\text{mV}$ with a small dip after it' },
          },
          labels: { type: 'Synapse', stimulate: 'Stimulate', cell1: 'cell 1', cell2: 'cell 2', vm: 'Vₘ of', delay: 'delay', response: 'Response in the other cell', none: 'no response', direction: 'Direction', oneWay: 'one way, presynaptic to postsynaptic', bothWays: 'both ways', after: 'after' },
        },
        'Chemical versus electrical synapse. Fire a spike in one cell and read the other. Switch the type to compare delay and size; stimulate cell 2 to test the direction. Values are illustrative.',
        'Two traces on a shared time axis: a spike in the stimulated cell above, the response in the other cell below, with the delay marked. Radios choose chemical or electrical and which cell fires.'),
        { type: 'example', title: 'Function: synchronization (slides 12 and 13)', body: 'Neurons of the inferior olive oscillate and fire occasional spikes. With gap junctions (cells 1 and 2 in Figure 5.3) their oscillations and spikes line up; without them (cells 3 and 4, connexin36 deleted) each cell still oscillates and fires, but out of step. Coupling coordinates activity; it is not needed to generate it.' },
        figureBlock(
          hotspots('synchrony', 1074 / 764, 'Four voltage traces over five seconds: two coupled cells with aligned oscillations and spikes, two uncoupled cells with independent ones.', [
            { id: 'with', label: 'With gap junctions', body: 'Cells 1 and 2: spikes and oscillations coincide. Spike synchrony and phase synchrony.', shape: 'rect', x: 40, y: 24, w: 74, h: 40, mx: 40, my: 4, side: 'top' },
            { id: 'without', label: 'Without gap junctions', body: 'Cells 3 and 4 still oscillate and fire, but with no coordination.', shape: 'rect', x: 40, y: 72, w: 74, h: 40, mx: 40, my: 95, side: 'bottom' },
          ], { quiz: false, gutter: 'ends', layout: 'stack' }),
          'Electrical synapses can synchronize activity (textbook Figure 5.3, Long et al. 2002).',
          'Four traces. The top two rise and fall together and spike at the same moments. The bottom two have similar waves and spikes, but at unrelated times.'
        ),
        {
          type: 'compare',
          title: 'Electrical versus chemical synapse',
          columns: ['Electrical', 'Chemical'],
          rows: [
            { label: 'Structure', cells: ['Gap junction channels, $3.5\\,\\text{nm}$ gap', 'Vesicles, active zone, 20 to $50\\,\\text{nm}$ cleft, receptors'] },
            { label: 'Signal route', cells: ['Ionic current straight through', 'Transmitter released, diffuses, binds receptors'] },
            { label: 'Delay', cells: ['Almost none', 'About 0.5 to $1\\,\\text{ms}$ or more'] },
            { label: 'Direction', cells: ['Usually both ways', 'One way'] },
            { label: 'Response', cells: ['Small electrical PSP, fixed sign', 'EPSP or IPSP, fast or slow, modulated at many steps'] },
            { label: 'Typical role', cells: ['Synchrony, escape reflexes, development', 'Almost all signalling in the mature brain'] },
          ],
        },
      ],
      conceptQuiz: [
        {
          id: 'electrical-1',
          prompt: 'How many connexin subunits are in one gap junction channel?',
          options: [
            { text: 'Six: one connexon of six connexins', feedback: 'One connexon is only half a channel.' },
            { text: 'Two: one connexin from each cell', feedback: 'Each cell contributes a whole connexon of six connexins.' },
            { text: 'Twelve: two connexons of six connexins', feedback: 'Correct. One connexon from each cell.' },
          ],
          correct: 2,
        },
        {
          id: 'electrical-2',
          prompt: 'What did deleting connexin36 do to the inferior olive neurons?',
          options: [
            { text: 'They stopped oscillating, but still fired single spikes', feedback: 'The oscillations are intrinsic to each cell and continued.' },
            { text: 'They still oscillated and fired, but lost their synchrony', feedback: 'Correct. Coupling coordinates activity, it does not create it.' },
            { text: 'They fired faster, but kept their oscillations in step', feedback: 'Firing rate was not the change; the timing across cells was.' },
          ],
          correct: 1,
        },
        {
          id: 'electrical-3',
          prompt: 'The postsynaptic potential at one electrical synapse in the mammalian brain is typically',
          options: [
            { text: 'About $1\\,\\text{mV}$ or less', feedback: 'Correct. Many must sum to fire the cell.' },
            { text: 'About $20\\,\\text{mV}$ or more', feedback: 'Far too large; look at the y scale on the slide.' },
            { text: 'A full action potential', feedback: 'Only at very large electrical synapses such as in crayfish escape circuits.' },
          ],
          correct: 0,
        },
      ],
    },

    // 4 -----------------------------------------------------------------
    {
      id: 'targeting',
      title: 'Synaptic targeting and convergence',
      keyTerms: ['axospinous', 'convergence', 'synaptic integration', 'asymmetric synapse', 'symmetric synapse'],
      blocks: [
        { type: 'text', body: 'Where a terminal lands, and how big it is, shapes what it can do to the postsynaptic cell.' },
        figureBlock(
          hotspots('targeting', 682 / 726, 'Four drawings of terminals on their targets: one on a spine, two on a soma, one wrapping a soma, and one contacting several spines.', TARGETING_REGIONS, { gutter: 'all' }),
          'Synaptic arrangements (textbook Figure 5.7). The black bars are active zones: the larger synapses have more of them.',
          'Top left: a small terminal on a dendritic spine. Top right: one axon splitting into two terminals on a cell body. Bottom left: a huge terminal wrapping most of a soma with many black release sites. Bottom right: one large terminal touching several spines.'
        ),
        { type: 'definition', term: 'Convergence', body: 'Many inputs reach one neuron. Most CNS neurons receive thousands of synapses. Synaptic integration is how the neuron combines their electrical and chemical effects into one output: its action potentials.' },
        { type: 'whyItMatters', body: 'The effect of an excitatory synapse on firing depends on its distance from the spike-initiation zone and on the dendritic membrane. In a passive dendrite the voltage change shrinks with distance because current leaks out on the way.' },
        { type: 'detail', title: 'Asymmetric and symmetric synapses', body: 'In electron micrographs, asymmetric synapses (Gray\'s type I) have a much thicker postsynaptic density and are usually excitatory (glutamate). Symmetric synapses (type II) have similar densities on both sides and are usually inhibitory (GABA, glycine). These are structural clues; the response is decided by the receptor.' },
      ],
      conceptQuiz: [
        {
          id: 'targeting-1',
          prompt: 'A terminal that contacts a dendritic spine forms',
          options: [
            { text: 'A dendrodendritic synapse, as the spine is part of a dendrite', feedback: 'The presynaptic side here is an axon, so it is not dendrodendritic.' },
            { text: 'An axosomatic synapse, as spines sit close to the cell body', feedback: 'Spines grow from dendrites; axosomatic means on the soma.' },
            { text: 'An axospinous synapse, one kind of axodendritic synapse', feedback: 'Correct. Axon onto a spine of a dendrite.' },
          ],
          correct: 2,
        },
        {
          id: 'targeting-2',
          prompt: 'What does the number of active zones in a terminal tell you?',
          options: [
            { text: 'How many release sites it has; larger synapses have more', feedback: 'Correct. Figure 5.7 draws them as black bars.' },
            { text: 'Which transmitter it releases; each has its own zone type', feedback: 'Active zones look alike whatever the transmitter.' },
            { text: 'Whether it is excitatory; inhibitory synapses have none', feedback: 'Inhibitory terminals release transmitter at active zones too.' },
          ],
          correct: 0,
        },
      ],
    },

    // 5 -----------------------------------------------------------------
    {
      id: 'spines',
      title: 'Dendritic spines',
      keyTerms: ['dendritic spine', 'spine apparatus', 'ultrastructure', 'serial-section electron microscopy'],
      blocks: [
        { type: 'definition', term: 'Dendritic spine', body: 'A small projection from a dendrite that receives synaptic input, usually a head on a narrow neck. Cajal drew them from Golgi-stained cortex over a century ago (Yuste 2015, slide 18).' },
        figureBlock(
          hotspots('spine-em', 890 / 423, 'Coloured electron micrograph: a yellow dendrite with a spine, a green axon full of vesicles making a synapse on the spine, and blue glia around them.', [
            { id: 'dendrite', label: 'Dendrite', body: 'Yellow. Contains a mitochondrion.', x: 18, y: 55, w: 24, h: 30, mx: 18, my: 55 },
            { id: 'spine', label: 'Spine', body: 'The narrow neck and head projecting from the dendrite toward the axon.', x: 52, y: 62, w: 20, h: 18, mx: 52, my: 62 },
            { id: 'apparatus', label: 'Spine apparatus', body: 'A membrane organelle inside the spine.', x: 60, y: 48, w: 12, h: 12, mx: 60, my: 44, side: 'top' },
            { id: 'psd', label: 'PSD', body: 'The red postsynaptic density at the head of the spine, facing the axon.', x: 74, y: 40, w: 6, h: 18, mx: 74, my: 40 },
            { id: 'axon', label: 'Axon with vesicles', body: 'Green. The presynaptic bouton, full of vesicles.', x: 86, y: 40, w: 16, h: 30, mx: 86, my: 40 },
            { id: 'glia', label: 'Glia', body: 'Blue. Astrocyte processes wrap the synapse.', x: 50, y: 20, w: 14, h: 20, mx: 50, my: 14, side: 'top' },
          ], { quiz: false, gutter: 'all', layout: 'stack' }),
          'Spine ultrastructure (slide 19, Harris). Labels are printed on the picture, so the quiz is off. The scale bar is 1 micron.',
          'A grey electron micrograph with coloured overlays: a yellow dendrite on the left sends a thin spine to the right, where a red density meets a green axon packed with vesicles; two blue glial profiles sit above and below.'
        ),
        { type: 'whyItMatters', body: 'A spine may keep chemical reactions close to the activated synapse, and its shape changes with the kind and amount of synaptic activity.' },
        figureBlock(
          hotspots('em-3d', 832 / 495, 'A three-dimensional reconstruction of a dendrite from serial electron microscopy, with synapses in red and organelles in colour.', [
            { id: 'shaft', label: 'Dendritic shaft', body: 'The trunk, with organelles (orange, green, purple) inside it.', shape: 'rect', x: 50, y: 40, w: 60, h: 24, mx: 30, my: 30, side: 'top' },
            { id: 'spines', label: 'Spines', body: 'The pale projections in every direction.', x: 20, y: 70, w: 20, h: 30, mx: 12, my: 74, side: 'left' },
            { id: 'synapses', label: 'Synapses (red)', body: 'The red patches mark the synaptic contacts, mostly on spine heads.', x: 88, y: 66, w: 8, h: 10, mx: 90, my: 70, side: 'right' },
          ], { quiz: false, gutter: 'all', layout: 'stack' }),
          '3D electron microscopy (slide 20). Serial sections are stacked into a model that shows every contact, but not how strong any of them is.',
          'A pale, knobbly dendrite reconstructed in three dimensions with dozens of spines, red patches on their tips, and coloured organelles running along the trunk.'
        ),
        { type: 'misconception', wrong: 'A reconstruction shows how strong a synapse is.', right: 'It shows anatomical contacts. The size of the synaptic response also depends on how much transmitter is released and how many receptors are there, and is measured with an electrode.' },
      ],
      conceptQuiz: [
        {
          id: 'spines-1',
          prompt: 'What is the postsynaptic density of a spine?',
          options: [
            { text: 'The cluster of vesicles packed inside the presynaptic bouton', feedback: 'Vesicles are presynaptic.' },
            { text: 'The protein-rich region holding the transmitter receptors', feedback: 'Correct. It faces the active zone across the cleft.' },
            { text: 'The number of spines along one micrometre of dendrite', feedback: 'That is a spine density, a different thing.' },
          ],
          correct: 1,
        },
        {
          id: 'spines-2',
          prompt: 'What can serial-section electron microscopy tell you that a single micrograph cannot?',
          options: [
            { text: 'The size of the EPSP that each reconstructed synapse produces', feedback: 'That needs an electrical recording.' },
            { text: 'Which transmitter each reconstructed terminal releases', feedback: 'Structure alone does not name the transmitter.' },
            { text: 'The 3D shape of dendrites and spines and where contacts sit', feedback: 'Correct. Stacked sections give the whole geometry.' },
          ],
          correct: 2,
        },
      ],
    },

    // 6 -----------------------------------------------------------------
    {
      id: 'transmitters',
      title: 'Transmitter identification, synthesis and transport',
      keyTerms: ['neurotransmitter', 'amino acid transmitters', 'amine transmitters', 'peptide transmitters', 'transporter protein', 'anterograde transport', 'kinesin'],
      blocks: [
        { type: 'steps', title: 'Three criteria for a transmitter', steps: [
          'The presynaptic neuron synthesizes and stores the molecule.',
          'Its terminal releases the molecule when stimulated.',
          'Applying the molecule experimentally mimics the response to release from the neuron.',
        ] },
        {
          type: 'compare',
          title: 'The major transmitters (Table 5.1)',
          columns: ['Members', 'Made and packed'],
          rows: [
            { label: 'Amino acids', cells: ['GABA, glutamate, glycine', 'In the terminal, loaded into synaptic vesicles by transporters'] },
            { label: 'Amines', cells: ['Dopamine, epinephrine, histamine, norepinephrine, serotonin (and, grouped with them on the slide, acetylcholine, which is not an amine)', 'In the terminal, as above'] },
            { label: 'Peptides', cells: ['Cholecystokinin, dynorphin, enkephalins, NAAG, neuropeptide Y, somatostatin, substance P, TRH, VIP', 'In the soma as precursors, packed in secretory granules, transported to the terminal'] },
          ],
        },
        figureBlock(
          hotspots('synthesis', 1382 / 453, 'A neuron from nucleus to terminal: rough ER, Golgi, a granule budding off, granules travelling down the axon, and vesicles in the terminal.', SYNTHESIS_REGIONS, { gutter: 'all', layout: 'stack' }),
          'Synthesis and storage (textbook Figure 5.11 a). Peptides take the numbered route from rough ER to Golgi to granule to axon; amines and amino acids are made in the terminal.',
          'A long cell: a blue nucleus on the left, purple stacks of rough ER, a yellow Golgi, red-cored granules moving right along an axon, and a terminal on the right full of yellow vesicles.'
        ),
        figureBlock(
          hotspots('synthesis-inset', 325 / 356, 'The terminal route: a precursor molecule is converted by a synthesizing enzyme, and a transporter protein loads the transmitter into a vesicle.', [
            { id: 'enzyme', label: 'Synthesizing enzyme', body: 'Made in the soma, shipped to the terminal. Converts the precursor into transmitter in the cytosol.', x: 50, y: 25, w: 60, h: 20, mx: 50, my: 22, side: 'top' },
            { id: 'transporter', label: 'Transporter protein', body: 'In the vesicle membrane. Pumps the transmitter into the vesicle.', x: 50, y: 60, w: 60, h: 14, mx: 50, my: 60, side: 'right' },
            { id: 'vesicle', label: 'Loaded synaptic vesicle', body: 'Stored until $\\text{Ca}^{2+}$ arrives.', x: 50, y: 84, w: 34, h: 28, mx: 50, my: 90, side: 'bottom' },
          ], { quiz: false, gutter: 'all' }),
          'Amine and amino acid transmitters (Figure 5.11 b): two steps, both in the terminal.',
          'A small diagram: precursor molecule, arrow labelled synthesizing enzyme, neurotransmitter molecule, arrow labelled transporter protein, and a round vesicle full of dots.'
        ),
        { type: 'definition', term: 'Anterograde transport', body: 'Loaded granules and the enzymes for the terminal ride kinesin along microtubules toward the axon terminal, at the cost of ATP (Figure 2.18). Retrograde transport carries material back to the soma.' },
        { type: 'misconception', wrong: 'The chemical family of a transmitter tells you its effect.', right: 'The receptor decides. ACh slows the heart through a G-protein-coupled receptor that opens $\\text{K}^+$ channels, and excites skeletal muscle through a $\\text{Na}^+$-permeable transmitter-gated channel.' },
      ],
      conceptQuiz: [
        {
          id: 'transmitters-1',
          prompt: 'Where are peptide transmitters synthesized?',
          options: [
            { text: 'In the soma, on the rough ER, then cut in the Golgi', feedback: 'Correct. They travel to the terminal in secretory granules.' },
            { text: 'In the terminal cytosol, by enzymes shipped from the soma', feedback: 'That is where amines and amino acids are made.' },
            { text: 'Inside the synaptic vesicle, from precursors pumped in', feedback: 'Vesicles are loaded by transporters; they do not synthesize.' },
          ],
          correct: 0,
        },
        {
          id: 'transmitters-2',
          prompt: 'Which of these is an amino acid transmitter?',
          options: [
            { text: 'Dopamine', feedback: 'An amine.' },
            { text: 'Substance P', feedback: 'A peptide.' },
            { text: 'Glutamate', feedback: 'Correct, with GABA and glycine.' },
            { text: 'Acetylcholine', feedback: 'Grouped with the amines on the slide, although it is not one.' },
          ],
          correct: 2,
        },
      ],
    },

    // 7 -----------------------------------------------------------------
    {
      id: 'release',
      title: 'Calcium-dependent release and vesicle fusion',
      keyTerms: ['exocytosis', 'endocytosis', 'SNARE', 'synaptotagmin', 'fusion pore', 'quantum', 'docked'],
      blocks: [
        figureBlock(
          hotspots('vesicle-cycle', 1049 / 583, 'A terminal above a cleft: a loaded vesicle, a Ca²⁺ channel with Ca²⁺ entering, a vesicle fusing and spilling transmitter, and a recycled vesicle.', CYCLE_REGIONS, { gutter: 'all' }),
          'Release by exocytosis and recycling (textbook Figure 5.12). Numbers follow the cycle.',
          'A tan terminal with a grey active zone along its base. A full vesicle sits at the left, a channel with a red arrow below it, a vesicle merged with the membrane in the middle leaking dots into the gap, and an emptier vesicle at the top right.'
        ),
        { type: 'steps', title: 'From spike to release', steps: [
          { title: '$\\text{Ca}^{2+}$ channels open.', body: 'The spike depolarizes the terminal; voltage-gated $\\text{Ca}^{2+}$ channels at the active zone open. The driving force on $\\text{Ca}^{2+}$ is huge because cytosolic $\\text{Ca}^{2+}$ is only $0.0002\\,\\text{mM}$.' },
          { title: 'A local $\\text{Ca}^{2+}$ microdomain forms.', body: 'Next to the open channels $\\text{Ca}^{2+}$ rises above about $0.01\\,\\text{mM}$. The vesicles that respond fastest are those already docked there.' },
          { title: 'Synaptotagmin senses $\\text{Ca}^{2+}$.', body: 'The vesicle protein binds $\\text{Ca}^{2+}$ and triggers fusion of the SNARE-docked vesicle. A fusion pore opens and widens until the vesicle membrane is part of the presynaptic membrane.' },
          { title: 'Recycle.', body: 'Endocytosis retrieves the membrane; the vesicle is refilled. Under prolonged firing a reserve pool held on the cytoskeleton is mobilised, also by $\\text{Ca}^{2+}$.' },
        ] },
        figureBlock(
          hotspots('snare', 1357 / 360, 'Three panels: a docked vesicle held by SNAREs beside a calcium channel; Ca²⁺ entering and binding synaptotagmin; the vesicle fused and releasing.', SNARE_REGIONS, { gutter: 'all', layout: 'stack' }),
          'How to SNARE a vesicle (textbook Box 5.3). v-SNAREs on the vesicle bind t-SNAREs on the terminal membrane; synaptotagmin is the $\\text{Ca}^{2+}$ sensor.',
          'Left: a vesicle hangs above a membrane, tethered by green and blue proteins to red and purple proteins; a pink channel sits in the membrane. Middle: red Ca²⁺ dots pour in and the proteins are zipped together. Right: the vesicle has opened into the membrane and dots stream out.'
        ),
        { type: 'keyNumber', items: [
          { value: '$0.2\\,\\text{ms}$', label: 'from $\\text{Ca}^{2+}$ influx to exocytosis in the squid giant synapse; about $60\\,\\mu\\text{s}$ in mammals at body temperature' },
          { value: '1 quantum', label: 'the transmitter in one vesicle. A CNS synapse often releases one per spike (an EPSP of tenths of a millivolt); the neuromuscular junction about 200 ($40\\,\\text{mV}$)' },
        ] },
        demoBlock('synapse-timeline', {
          steps: [
            { key: 'arrival', label: 'Action potential arrives', body: 'The spike reaches the terminal and depolarizes its membrane.', time: 0 },
            { key: 'calcium', label: '$\\text{Ca}^{2+}$ enters', body: 'Voltage-gated $\\text{Ca}^{2+}$ channels at the active zone open; $\\text{Ca}^{2+}$ floods the microdomain around the docked vesicles.', time: 0.1, timeNote: 'the channels open within the falling phase of the spike' },
            { key: 'fusion', label: 'Synaptotagmin triggers SNARE-mediated fusion', body: '$\\text{Ca}^{2+}$ binds synaptotagmin; the zipped SNAREs pull the membranes together and a fusion pore opens.', time: 0.2, timeNote: 'about 60 microseconds after $\\text{Ca}^{2+}$ entry in a mammal at body temperature' },
            { key: 'release', label: 'Release and diffusion', body: 'The vesicle contents, one quantum, spill into the cleft and diffuse the 20 to $50\\,\\text{nm}$ to the other side.', time: 0.3 },
            { key: 'binding', label: 'Receptor binding', body: 'Transmitter binds receptors in the postsynaptic density. A transmitter-gated channel opens within microseconds; the postsynaptic current begins.', time: 0.5, timeNote: 'the synaptic delay from spike to response is about 0.5 to $1\\,\\text{ms}$' },
            { key: 'removal', label: 'Removal', body: 'Transmitter is cleared by diffusion, reuptake into the terminal or glia, or enzymatic breakdown (AChE at the neuromuscular junction), and the vesicle membrane is recycled by endocytosis.', time: 2, timeNote: 'a few milliseconds; the synapse is ready for the next spike' },
          ],
          labels: { scrub: 'Step', step: 'Event', delay: 'Time since arrival', terminal: 'presynaptic terminal', cleft: 'cleft', postsynaptic: 'postsynaptic membrane', removal: 'removal' },
        },
        'Synapse timeline. Step through one round of transmission at a schematic synapse; the counter shows the time since the spike arrived. Times are typical values from the textbook, not measurements of one synapse.',
        'A schematic terminal above a cleft and a postsynaptic membrane with three receptors. As the step slider moves, the Ca²⁺ channels fill, vesicles are highlighted, one fuses and dots cross to the receptors, then fade.'),
        { type: 'example', title: 'Yeast and a billion years', body: 'The same SNARE machinery drives secretion in yeast. Membrane fusion is a general cellular problem, and the proteins have been conserved for more than a billion years; the synapse adds fast, precise $\\text{Ca}^{2+}$ control. Botulinum toxins cut specific SNAREs and so block release at the neuromuscular junction.' },
        { type: 'detail', title: 'Peptide release', body: 'Secretory granules also release by $\\text{Ca}^{2+}$-dependent exocytosis, but away from the active zones. $\\text{Ca}^{2+}$ has to build up through the whole terminal, which takes high-frequency trains of spikes, and release is slow, $50\\,\\text{ms}$ or more.' },
      ],
      conceptQuiz: [
        {
          id: 'release-1',
          prompt: 'Which protein is the $\\text{Ca}^{2+}$ sensor for fast release?',
          options: [
            { text: 'The t-SNAREs, on the target membrane', feedback: 'SNAREs dock the vesicle; they do not sense $\\text{Ca}^{2+}$.' },
            { text: 'Synaptotagmin, on the vesicle membrane', feedback: 'Correct. $\\text{Ca}^{2+}$ binding to it triggers fusion.' },
            { text: 'The v-SNARE, on the vesicle membrane', feedback: 'It binds the t-SNAREs to dock the vesicle; it is not the sensor.' },
          ],
          correct: 1,
        },
        {
          id: 'release-2',
          prompt: 'Why can release happen within a fraction of a millisecond of $\\text{Ca}^{2+}$ entry?',
          options: [
            { text: '$\\text{Ca}^{2+}$ spreads through the whole terminal within microseconds', feedback: 'It does not; only the microdomain near the channels rises quickly.' },
            { text: 'Vesicles are filled and docked only when the spike arrives', feedback: 'They are made, loaded and docked in advance.' },
            { text: 'The channels sit next to vesicles already docked at the active zone', feedback: 'Correct. The local $\\text{Ca}^{2+}$ rise is fast and large.' },
          ],
          correct: 2,
        },
        {
          id: 'release-3',
          prompt: 'What is a quantum of transmitter?',
          options: [
            { text: 'The transmitter in one synaptic vesicle', feedback: 'Correct. An EPSP is a whole-number multiple of it.' },
            { text: 'A single molecule of transmitter', feedback: 'A vesicle holds several thousand molecules.' },
            { text: 'The transmitter released per second', feedback: 'It is a packet, not a rate.' },
          ],
          correct: 0,
        },
      ],
    },

    // 8 -----------------------------------------------------------------
    {
      id: 'receptors',
      title: 'Postsynaptic receptor mechanisms and signal termination',
      keyTerms: ['transmitter-gated ion channel', 'ionotropic receptor', 'G-protein-coupled receptor', 'metabotropic receptor', 'second messenger', 'reuptake', 'acetylcholinesterase', 'autoreceptor'],
      blocks: [
        { type: 'text', body: 'Over a hundred receptors exist, but they come in two kinds: those that are channels and those that work through G-proteins.' },
        figureBlock(
          hotspots('ionotropic', 495 / 788, 'Side and top views of an ACh-gated channel: five subunits around a central pore that crosses the membrane.', [
            { id: 'side', label: 'Side view', body: 'The receptor spans the bilayer. Transmitter binds on the outside.', x: 50, y: 28, w: 60, h: 40, mx: 50, my: 8, side: 'top' },
            { id: 'top', label: 'Top view: five subunits, one pore', body: 'A slight twist of the subunits opens the pore within microseconds.', x: 50, y: 78, w: 60, h: 36, mx: 50, my: 96, side: 'bottom' },
          ], { quiz: false, gutter: 'ends', layout: 'stack' }),
          'A transmitter-gated ion channel (textbook Figure 5.14): the ACh receptor of the neuromuscular junction.',
          'Top: a brown five-lobed protein standing in a membrane of orange lipid heads with the cytoplasm below. Bottom: the same seen from above, five rounded subunits around a small central hole.'
        ),
        {
          type: 'compare',
          title: 'Two kinds of receptor',
          columns: ['Transmitter-gated ion channel (ionotropic)', 'G-protein-coupled receptor (metabotropic)'],
          rows: [
            { label: 'Structure', cells: ['Four or five subunits around a pore', 'One polypeptide with seven membrane-spanning helices; no pore'] },
            { label: 'Mechanism', cells: ['Transmitter binds, subunits twist, pore opens', 'Transmitter binds, G-protein activated, effector = a separate channel or an enzyme making second messengers'] },
            { label: 'Speed', cells: ['Microseconds to open; response in milliseconds', 'Tens of milliseconds to seconds'] },
            { label: 'Effect', cells: ['EPSP if the pore passes $\\text{Na}^+$ (ACh, glutamate); IPSP if it passes $\\text{Cl}^-$ (GABA, glycine)', 'Slower, longer, more diverse: modulation of channels and metabolism'] },
          ],
        },
        figureBlock(
          hotspots('gpcr-types', 1320 / 429, 'Two panels: a receptor activating a G-protein that opens an ion channel; a receptor activating a G-protein that switches on an enzyme making second messengers.', GPCR_REGIONS, { gutter: 'all', layout: 'stack' }),
          'Transmitter actions at G-protein-coupled receptors (textbook Figure 5.17). Left: the shortcut pathway to an ion channel. Right: an enzyme and second messengers.',
          'Two blue membrane panels. In each a green receptor holds a red transmitter and points an arrow at a purple G-protein. Left, a second arrow leads to a pink channel; right, to a teal enzyme and a box for second messengers.'
        ),
        { type: 'steps', title: 'Signal termination', steps: [
          'Diffusion out of the cleft.',
          'Reuptake by transporter proteins into the presynaptic terminal (then reloaded or degraded) or into glia. Most amino acid and amine transmitters go this way.',
          'Enzymatic destruction in the cleft: acetylcholinesterase (AChE) cleaves ACh at the neuromuscular junction.',
          'If transmitter is not removed, the receptors desensitize and close despite its presence, which is how nerve gases that block AChE stop transmission.',
        ] },
        { type: 'detail', title: 'Autoreceptors and neuropharmacology', body: ['Receptors on the presynaptic terminal that sense its own transmitter are autoreceptors; usually G-protein-coupled, they reduce release and synthesis when transmitter builds up, a safety valve.', 'Every step, synthesis, loading, exocytosis, binding, reuptake and degradation, is chemical and can be targeted by drugs. Receptor antagonists such as curare block the transmitter; agonists such as nicotine mimic it.'] },
      ],
      conceptQuiz: [
        {
          id: 'receptors-1',
          prompt: 'What makes a receptor ionotropic?',
          options: [
            { text: 'The receptor activates a G-protein that opens a channel', feedback: 'That is a metabotropic receptor.' },
            { text: 'The receptor itself is an ion channel opened by transmitter', feedback: 'Correct. Transmitter binding opens its own pore.' },
            { text: 'The receptor pumps ions across the membrane using ATP', feedback: 'Receptors do not pump.' },
          ],
          correct: 1,
        },
        {
          id: 'receptors-2',
          prompt: 'How is acetylcholine removed at the neuromuscular junction?',
          options: [
            { text: 'Reuptake into the terminal as intact ACh', feedback: 'ACh is cleaved first; choline is taken up.' },
            { text: 'It stays bound; the receptors desensitize', feedback: 'Desensitization is what happens when removal fails.' },
            { text: 'Acetylcholinesterase in the cleft cleaves it', feedback: 'Correct.' },
          ],
          correct: 2,
        },
      ],
    },

    // 9 -----------------------------------------------------------------
    {
      id: 'epsp-ipsp',
      title: 'EPSPs, IPSPs and the reversal potential',
      keyTerms: ['EPSP', 'IPSP', 'reversal potential', 'driving force', 'I-V plot'],
      blocks: [
        { type: 'definition', term: 'EPSP', body: 'Excitatory postsynaptic potential: a brief depolarization from about $-65\\,\\text{mV}$ that brings the membrane toward threshold. On the slide, transmitter opens channels and $\\text{Na}^+$ enters ($E_{\\text{Na}} = +62\\,\\text{mV}$).' },
        { type: 'definition', term: 'IPSP', body: 'Inhibitory postsynaptic potential: a brief hyperpolarization. On the slide, transmitter opens $\\text{Cl}^-$ channels and $\\text{Cl}^-$ enters, pulling $V_m$ toward $E_{\\text{Cl}} = -65\\,\\text{mV}$. Inward negative charge is the same as outward positive current.' },
        figureBlock(
          hotspots('psp-generation', 1208 / 684, 'Four panels: Na⁺ entering through transmitter-gated channels with an EPSP trace; Cl⁻ entering through transmitter-gated channels with an IPSP trace.', [
            { id: 'na', label: 'Na⁺ enters', body: 'Transmitter-gated channels open; $\\text{Na}^+$ flows in down its electrochemical gradient.', x: 22, y: 25, w: 40, h: 40, mx: 8, my: 25, side: 'left' },
            { id: 'epsp', label: 'EPSP', body: '$V_m$ rises a few millivolts from $-65\\,\\text{mV}$ and decays over several milliseconds.', x: 74, y: 25, w: 40, h: 40, mx: 92, my: 25, side: 'right' },
            { id: 'cl', label: 'Cl⁻ enters', body: 'Transmitter-gated $\\text{Cl}^-$ channels open; $\\text{Cl}^-$ flows in because $V_m$ is above $E_{\\text{Cl}}$.', x: 22, y: 75, w: 40, h: 40, mx: 8, my: 75, side: 'left' },
            { id: 'ipsp', label: 'IPSP', body: '$V_m$ dips toward $E_{\\text{Cl}}$ and recovers.', x: 74, y: 75, w: 40, h: 40, mx: 92, my: 75, side: 'right' },
          ], { quiz: false, gutter: 'sides' }),
          'EPSP and IPSP generation (textbook Figures 5.15 and 5.16, slides 27 and 28). Same time scale: milliseconds after the presynaptic spike.',
          'Top row: three channels in a membrane with red arrows carrying Na⁺ downward, and a trace rising from −65 mV to a rounded peak. Bottom row: the same channels with blue arrows carrying Cl⁻ inward, and a trace dipping below −65 mV.'
        ),
        { type: 'math', title: 'Synaptic current', items: [
          { tex: 'I_{\\text{syn}} = g_{\\text{syn}}\\,(V_m - E_{\\text{rev}})', label: '$g_{\\text{syn}}$ comes from the open transmitter-gated channels; $E_{\\text{rev}}$ is the reversal potential, where the current changes direction. Zero at $E_{\\text{rev}}$, however many channels are open.' },
        ], note: 'A channel permeable to both $\\text{Na}^+$ and $\\text{K}^+$ (ACh, AMPA) reverses near $0\\,\\text{mV}$. At $-65\\,\\text{mV}$ the driving force is $-65\\,\\text{mV}$: inward current, EPSP.' },
        demoBlock('driving-force', {
          threshold: -55,
          channels: [
            { key: 'mixed', label: '$\\text{Na}^+$ and $\\text{K}^+$ (ACh, AMPA)', erev: 0, body: 'Equally permeable to $\\text{Na}^+$ and $\\text{K}^+$, so $E_{\\text{rev}}$ is about $0\\,\\text{mV}$, far above threshold.' },
            { key: 'na', label: '$\\text{Na}^+$ only', erev: 62, body: '$E_{\\text{rev}} = E_{\\text{Na}} = +62\\,\\text{mV}$. Strongly excitatory.' },
            { key: 'cl', label: '$\\text{Cl}^-$ (GABA-A, glycine)', erev: -65, body: '$E_{\\text{rev}} = E_{\\text{Cl}} = -65\\,\\text{mV}$, at rest and below threshold. Inhibitory.' },
            { key: 'k', label: '$\\text{K}^+$ only (GABA-B via G-protein)', erev: -80, body: '$E_{\\text{rev}} = E_{\\text{K}} = -80\\,\\text{mV}$. Inhibitory: outward $\\text{K}^+$ current at any $V_m$ above -80.' },
          ],
          labels: { channel: 'Channel selectivity', vm: 'Membrane potential', current: 'Current', currentUnit: 'pA', inward: 'inward (cations in), depolarising', outward: 'outward, hyperpolarising', none: 'zero', drivingForce: 'Driving force', reversal: 'Eᵣₑᵥ', threshold: 'threshold', vmAxis: 'Vₘ (mV)', traceTitle: 'change in Vₘ', effect: 'Synapse', epsp: 'EPSP', ipsp: 'IPSP', noChange: 'no voltage change', epspWeak: 'small depolarisation, toward Eᵣₑᵥ', ipspToward: 'repolarisation toward Eᵣₑᵥ', excitatory: 'excitatory: $E_{\\text{rev}}$ above threshold', inhibitory: 'inhibitory: $E_{\\text{rev}}$ at or below threshold', epspNote: 'The current takes $V_m$ toward $E_{\\text{rev}}$, past threshold if enough channels open.', ipspNote: 'The current takes $V_m$ down toward $E_{\\text{rev}}$, away from threshold.', noneNote: '$V_m$ is at $E_{\\text{rev}}$, so no net current, but the open channels still raise the conductance (shunting).', epspWeakNote: 'Below $E_{\\text{rev}}$ the current is inward, but it can only bring $V_m$ up to $E_{\\text{rev}}$, which is below threshold. Still inhibitory in effect.', ipspTowardNote: 'Above $E_{\\text{rev}}$ the mixed channel carries outward current, which pulls $V_m$ back down toward $0\\,\\text{mV}$.' },
        },
        'Driving force explorer. Choose the channel and drag $V_m$. Left: the I-V line for that channel with the current at $V_m$ marked. Right: the resulting change in $V_m$. Excitatory or inhibitory depends on where $E_{\\text{rev}}$ sits relative to threshold, not on the ion alone.',
        'A straight I-V line crossing zero at the reversal potential, with a dot at the chosen membrane potential and a dashed threshold line; beside it a small trace showing an upward or downward postsynaptic potential.'),
        { type: 'misconception', wrong: 'Inhibition always means hyperpolarization.', right: 'Inhibition means making a spike less likely. If $V_m$ already equals $E_{\\text{Cl}}$, opening $\\text{Cl}^-$ channels causes no IPSP, but the extra conductance still shunts excitation. Inhibitory $\\text{K}^+$ channels pull toward $E_{\\text{K}}$.' },
        { type: 'detail', title: 'Reversal potential and the I-V plot (Box 5.4)', body: 'Measuring the synaptic current at several clamped voltages gives an I-V plot. The voltage where the current crosses zero is the reversal potential, which tells you which ions the channel passes. A transmitter is excitatory if it drives $V_m$ toward a value above spike threshold and inhibitory if it drives $V_m$ toward a value below threshold.' },
      ],
      conceptQuiz: [
        {
          id: 'psp-1',
          prompt: 'A transmitter opens channels with a reversal potential of $0\\,\\text{mV}$ in a cell at $-65\\,\\text{mV}$. The current is',
          options: [
            { text: 'Inward, producing an EPSP', feedback: 'Correct. $I = g\\,(V_m - E_{\\text{rev}})$ is negative: cations enter.' },
            { text: 'Outward, producing an IPSP', feedback: 'Outward current would need $V_m$ above $E_{\\text{rev}}$.' },
            { text: 'Zero, as the channel is mixed', feedback: 'Zero only at $E_{\\text{rev}}$ itself.' },
          ],
          correct: 0,
        },
        {
          id: 'psp-2',
          prompt: 'In the slide example $E_{\\text{Cl}}$ is $-65\\,\\text{mV}$ and the cell rests at $-65\\,\\text{mV}$. GABA opens the $\\text{Cl}^-$ channels. What happens to $V_m$?',
          options: [
            { text: 'A large hyperpolarization, as $\\text{Cl}^-$ rushes into the cell', feedback: 'There is no driving force on $\\text{Cl}^-$ at $E_{\\text{Cl}}$.' },
            { text: 'No visible change, but the extra conductance shunts EPSPs', feedback: 'Correct. No driving force, still inhibitory.' },
            { text: 'A small depolarization, as $\\text{Cl}^-$ flows out of the cell', feedback: '$V_m$ cannot move away from $E_{\\text{rev}}$ because of that channel.' },
          ],
          correct: 1,
        },
      ],
    },

    // 10 ----------------------------------------------------------------
    {
      id: 'recording',
      title: 'Recording transmitter-gated channels',
      keyTerms: ['patch-clamp recording', 'single-channel current'],
      blocks: [
        { type: 'definition', term: 'Patch clamp on a transmitter-gated channel', body: 'A pipette sealed to a small patch of membrane, clamped at a fixed voltage, with transmitter applied. Each downward step is inward current through one open channel; the step height is the single-channel current, the step length the open time.' },
        figureBlock(
          hotspots('patch-transmitter', 1601 / 615, 'The patch-clamp cartoon from lecture 2 above a current trace with downward steps while transmitter is applied.', [
            { id: 'patch', label: 'The patch-clamp set-up', body: 'The same method as for the voltage-gated $\\text{Na}^+$ channel in lecture 2, but now transmitter, not voltage, opens the channel.', shape: 'rect', x: 15, y: 12, w: 30, h: 22, mx: 15, my: 4, side: 'top' },
            { id: 'closed', label: 'Channels closed', body: 'Baseline: no current.', x: 46, y: 60, w: 10, h: 8, mx: 42, my: 60, side: 'left' },
            { id: 'open', label: 'Channels open', body: 'A downward step of inward current. Steps have similar heights but varied timing and length.', x: 48, y: 76, w: 10, h: 10, mx: 48, my: 78, side: 'left' },
            { id: 'transmitter', label: 'Transmitter applied', body: 'The arrow marks the period of application. The channels flip open and shut for as long as transmitter is present.', shape: 'line', x: 44, y: 96, x2: 84, y2: 96, mx: 84, my: 96, side: 'right' },
          ], { quiz: false, gutter: 'all', layout: 'stack' }),
          'A patch-clamp recording from a transmitter-gated ion channel (textbook Figure 5.18; Neher and Sakmann).',
          'A noisy horizontal trace with several rectangular downward dips of equal depth, an arrow underneath labelled with the application of transmitter, and a 20 ms scale bar.'
        ),
        { type: 'whyItMatters', body: 'The synaptic current is the sum of many such channels. When $V_m$ is free to move, that inward current is what depolarizes the membrane and makes the EPSP; the clamped trace shows the current, not the EPSP.' },
        { type: 'detail', title: 'Not all transmitter-gated channels are $\\text{Na}^+$ channels', body: 'The slide title says $\\text{Na}^+$ channel, but transmitter-gated channels are less selective than voltage-gated ones: the ACh channel passes both $\\text{Na}^+$ and $\\text{K}^+$, which is why its reversal potential is near $0\\,\\text{mV}$ rather than at $E_{\\text{Na}}$.' },
      ],
      conceptQuiz: [
        {
          id: 'recording-1',
          prompt: 'In the trace, what does the height of each downward step measure?',
          options: [
            { text: 'The membrane potential of the patch', feedback: '$V_m$ is clamped; the trace is current.' },
            { text: 'The amplitude of the resulting EPSP', feedback: 'No EPSP can form while $V_m$ is clamped.' },
            { text: 'The current through one open channel', feedback: 'Correct. Divided by the driving force it gives the conductance.' },
          ],
          correct: 2,
        },
      ],
    },

    // 11 ----------------------------------------------------------------
    {
      id: 'summation',
      title: 'Spatial and temporal summation',
      keyTerms: ['synaptic integration', 'spatial summation', 'temporal summation'],
      blocks: [
        { type: 'definition', term: 'Synaptic integration', body: 'The process by which multiple synaptic potentials combine in one postsynaptic neuron. EPSP summation is its simplest form.' },
        figureBlock(
          hotspots('summation', 1436 / 640, 'Three panels: one presynaptic axon and one EPSP; three axons active together and a larger EPSP; one axon firing three times and a staircase EPSP.', [
            { id: 'single', label: 'One EPSP', body: 'A single presynaptic spike gives a small EPSP.', shape: 'rect', x: 17, y: 50, w: 30, h: 90, mx: 17, my: 6, side: 'top' },
            { id: 'spatial', label: 'Spatial summation', body: 'EPSPs from different synapses at the same time add up.', shape: 'rect', x: 50, y: 50, w: 30, h: 90, mx: 50, my: 6, side: 'top' },
            { id: 'temporal', label: 'Temporal summation', body: 'EPSPs from the same synapse in quick succession, within about 1 to $15\\,\\text{ms}$, add up.', shape: 'rect', x: 90, y: 50, w: 16, h: 90, mx: 90, my: 6, side: 'top' },
          ], { quiz: false, gutter: 'ends', layout: 'stack' }),
          'EPSP summation (textbook Figure 5.19). The recording electrode is in the soma each time.',
          'Three neurons with a recording pipette and one or more presynaptic axons above; under each a voltage trace. The first shows a small bump, the second a bump twice the size, the third three bumps climbing on each other.'
        ),
        {
          type: 'compare',
          title: 'Two ways to sum',
          columns: ['Inputs', 'Timing'],
          rows: [
            { label: 'Spatial summation', cells: ['Several different synapses', 'Active at the same time'] },
            { label: 'Temporal summation', cells: ['The same synapse', 'Fires again before the last EPSP has decayed (1 to $15\\,\\text{ms}$)'] },
          ],
        },
        { type: 'whyItMatters', body: 'The neuromuscular junction is fail-safe: one spike releases about 200 quanta and a $40\\,\\text{mV}$ EPSP. A CNS synapse releases about one quantum, a few tenths of a millivolt, so many EPSPs must sum before the spike-initiation zone reaches threshold. That is what makes a neuron a computer rather than a relay.' },
      ],
      conceptQuiz: [
        {
          id: 'summation-1',
          prompt: 'Two EPSPs from the same synapse $5\\,\\text{ms}$ apart add together. This is',
          options: [
            { text: 'Spatial summation', feedback: 'Spatial summation is across different synapses at the same time.' },
            { text: 'Temporal summation', feedback: 'Correct. The same synapse fires again before its EPSP has decayed.' },
            { text: 'Shunting inhibition', feedback: 'Shunting reduces EPSPs; it does not add them.' },
          ],
          correct: 1,
        },
        {
          id: 'summation-2',
          prompt: 'A summed EPSP of $8\\,\\text{mV}$ in the dendrite fails to fire the cell. Why might that be?',
          options: [
            { text: 'It did not reach threshold at the spike-initiation zone', feedback: 'Correct. Only the potential at the axon hillock counts.' },
            { text: 'Summed EPSPs never fire a cell; only single large ones do', feedback: 'Summation is exactly how most CNS neurons reach threshold.' },
            { text: 'The dendrite is refractory after the first EPSP it received', feedback: 'EPSPs are graded and leave no refractory period.' },
          ],
          correct: 0,
        },
      ],
    },

    // 12 ----------------------------------------------------------------
    {
      id: 'dendrites',
      title: 'Dendritic spread and shunting inhibition',
      keyTerms: ['passive cable', 'length constant', 'internal resistance', 'membrane resistance', 'shunting inhibition'],
      blocks: [
        { type: 'definition', term: 'The passive cable', body: 'Treat a dendrite as a leaky hose. Synaptic current flows down the inside and leaks out across the membrane, so the depolarization shrinks with distance from the synapse.' },
        figureBlock(
          hotspots('cable', 887 / 772, 'A dendritic cable with a current-injecting pipette and two recording pipettes, and a plot of depolarization against distance falling to 37 percent at one length constant.', [
            { id: 'inject', label: 'Current injected', body: 'A steady depolarization at the origin.', x: 36, y: 47, w: 8, h: 16, mx: 36, my: 40, side: 'left' },
            { id: 'near', label: 'Recorded nearby', body: 'A large voltage step.', x: 56, y: 22, w: 22, h: 24, mx: 56, my: 12, side: 'top' },
            { id: 'far', label: 'Recorded farther away', body: 'A smaller voltage step: current has leaked out across the membrane on the way.', x: 90, y: 22, w: 18, h: 24, mx: 90, my: 12, side: 'top' },
            { id: 'lambda', label: 'Length constant λ', body: 'The distance over which the depolarization falls to 37 percent of its value at the origin.', x: 62, y: 84, w: 8, h: 8, mx: 62, my: 84, side: 'right' },
          ], { quiz: false, gutter: 'all' }),
          'Decreasing depolarization along a long dendritic cable (textbook Figure 5.20).',
          'Above: a horizontal tube with a pipette injecting current in the middle and arrows leaking out through its wall; two small voltage traces, one large and one small. Below: a curve peaking at 100 percent under the pipette and falling to 37 percent at a distance marked λ.'
        ),
        { type: 'math', title: 'Length constant', items: [
          { tex: 'V_x = \\frac{V_0}{e^{x/\\lambda}}', label: '$V_0$ is the depolarization at the origin, $x$ the distance, $\\lambda$ the length constant.' },
          { tex: 'x = \\lambda:\\quad V_x = 0.37\\,V_0', label: 'One length constant from the origin, the depolarization has fallen to 37 percent.' },
        ], note: '$\\lambda$ rises with membrane resistance $r_m$ (fewer open channels, less leak) and falls with internal resistance $r_i$ (thin dendrite). $r_i$ is fixed by the dendrite; $r_m$ changes moment to moment with what other synapses are doing, so $\\lambda$ is not constant.' },
        { type: 'whyItMatters', body: 'Dendrites are not purely passive: many carry voltage-gated $\\text{Na}^+$, $\\text{Ca}^{2+}$ and $\\text{K}^+$ channels that amplify distant EPSPs on their way to the soma, and in some cells let a somatic spike travel back into the dendrites. Effects go both ways.' },
        figureBlock(
          hotspots('shunting', 780 / 803, 'Two drawings of a dendrite with an excitatory synapse far out and an inhibitory synapse near the soma; with the inhibitory synapse inactive the somatic EPSP is present, with it active the somatic EPSP is gone.', [
            { id: 'exc', label: 'Excitatory synapse (active)', body: 'Inward current enters the dendrite here and spreads toward the soma.', x: 18, y: 12, w: 10, h: 18, mx: 18, my: 8, side: 'top' },
            { id: 'inh-off', label: 'Inhibitory synapse, inactive', body: 'Top: the current reaches the soma and an EPSP is recorded there.', x: 56, y: 12, w: 8, h: 16, mx: 56, my: 6, side: 'top' },
            { id: 'inh-on', label: 'Inhibitory synapse, active', body: 'Bottom: its open $\\text{Cl}^-$ channels shunt the current out of the dendrite, so the dendritic EPSP is still there but the somatic EPSP is gone.', x: 56, y: 62, w: 8, h: 16, mx: 56, my: 58, side: 'right' },
            { id: 'soma', label: 'Soma and axon hillock', body: 'The only potential that matters for firing.', x: 88, y: 22, w: 24, h: 30, mx: 96, my: 26, side: 'right' },
          ], { quiz: false, gutter: 'all' }),
          'Shunting inhibition (textbook Figure 5.21). The inhibitory synapse sits between the excitatory input and the soma.',
          'Two versions of one drawing: a long dendrite with a glowing excitatory contact at its far end and an inhibitory contact near a blue soma. In the upper version both recording traces show an EPSP; in the lower one the inhibitory contact glows and the somatic trace is flat.'
        ),
        { type: 'steps', title: 'How shunting works', steps: [
          '$E_{\\text{Cl}}$ sits near the resting potential and below threshold. Opening $\\text{Cl}^-$ channels adds conductance and lowers membrane resistance, without much voltage change on its own.',
          'When excitation depolarizes that stretch of dendrite above $E_{\\text{Cl}}$, $\\text{Cl}^-$ enters and opposes the depolarization.',
          'The current leaks out before it reaches the soma: the EPSP is visible in the dendrite but suppressed at the soma.',
          'Passively conducted EPSPs and IPSPs compete along the depolarization-hyperpolarization axis, but the potential at the axon hillock is all that counts. Inhibitory synapses on the soma and hillock, from fast-spiking PV basket cells, therefore hold a veto.',
        ] },
        demoBlock('summation-shunt', {
          threshold: -55,
          labels: { synapses: 'Synapses active together', pulses: 'Spikes at each synapse', interval: 'Interval between spikes', shunt: 'Open $\\text{Cl}^-$ channels near the soma, at $E_{\\text{Cl}}$ of $-65\\,\\text{mV}$', peak: 'Peak somatic potential', threshold: 'Threshold', reached: 'reached', notReached: 'not reached', reachedNote: 'the neuron fires', notReachedNote: 'no spike', rest: 'rest', aboveRest: 'above rest', shuntOn: 'Cl⁻ conductance open' },
        },
        'Summation and shunting. Add synapses (spatial summation) or spikes at one synapse (temporal summation) and watch the somatic potential approach the threshold line. Then open a $\\text{Cl}^-$ conductance at $E_{\\text{Cl}}$: the dashed line shows what the EPSP would have been. A simple passive model.',
        'A voltage trace above a dashed resting line and a dashed threshold line. Sliders set the number of synapses, the number of spikes and their interval; a checkbox opens a chloride conductance, which shades the plot and shrinks the trace relative to a dashed reference.'),
      ],
      conceptQuiz: [
        {
          id: 'dendrites-1',
          prompt: 'What does a length constant of $1\\,\\text{mm}$ mean?',
          options: [
            { text: 'A steady depolarization has fallen to half its origin value $1\\,\\text{mm}$ away', feedback: 'Half is the wrong fraction; at one $\\lambda$ it is 37 percent.' },
            { text: 'A steady depolarization has decayed to zero by $1\\,\\text{mm}$ away', feedback: 'It is reduced to 37 percent, not gone.' },
            { text: 'A steady depolarization has fallen to 37 percent of its origin value $1\\,\\text{mm}$ away', feedback: 'Correct. $V_x = V_0\\,e^{-x/\\lambda}$, and $e^{-1} = 0.37$.' },
          ],
          correct: 2,
        },
        {
          id: 'dendrites-2',
          prompt: 'Opening more channels in the dendritic membrane',
          options: [
            { text: 'Raises membrane resistance and lengthens the length constant', feedback: 'More open channels mean less membrane resistance.' },
            { text: 'Lowers membrane resistance and shortens the length constant', feedback: 'Correct. More leak, less reach.' },
            { text: 'Lowers internal resistance and lengthens the length constant', feedback: 'Internal resistance depends on diameter and cytoplasm, not on channels.' },
          ],
          correct: 1,
        },
        {
          id: 'dendrites-3',
          prompt: 'Which inhibitory synapse location gives the strongest control over firing?',
          options: [
            { text: 'On the soma or near the axon hillock', feedback: 'Correct. Between every input and the spike-initiation zone.' },
            { text: 'On the distal tips of the dendrites', feedback: 'That only affects the inputs beyond it.' },
            { text: 'On the terminals of the input axons', feedback: 'An axoaxonic synapse changes release from that axon, not this cell\'s firing directly.' },
          ],
          correct: 0,
        },
      ],
    },

    // 13 ----------------------------------------------------------------
    {
      id: 'systems',
      title: 'Organizing transmitter systems',
      keyTerms: ['transmitter system', 'glutamate', 'GABA', 'AMPA receptor', 'NMDA receptor', 'kainate receptor', 'GABA-A receptor', 'agonist'],
      blocks: [
        { type: 'definition', term: 'A transmitter system', body: 'The transmitter, its receptors, and the machinery around them (slide 34): transmitter-synthesizing enzymes, synaptic vesicle transporters, reuptake transporters, degradative enzymes, transmitter-gated ion channels, G-protein-coupled receptors, G-proteins, G-protein-gated ion channels and second messenger cascades.' },
        { type: 'whyItMatters', body: 'One synapse runs this whole network of molecular machinery at once, achieving several computational and functional roles, regulation and plasticity.' },
        figureBlock(
          hotspots('glutamate-receptors', 1293 / 742, 'Glutamate above three receptor channels in a membrane: AMPA, NMDA and kainate, each with its agonist named.', [
            { id: 'glu', label: 'Glutamate activates all three', body: 'The transmitter for most fast excitation in the brain.', x: 50, y: 10, w: 16, h: 10, mx: 50, my: 6, side: 'top' },
            { id: 'ampa', label: 'AMPA receptor', body: 'Named after its selective agonist AMPA. Passes $\\text{Na}^+$ and $\\text{K}^+$; fast EPSP.', x: 18, y: 60, w: 18, h: 40, mx: 12, my: 62, side: 'left' },
            { id: 'nmda', label: 'NMDA receptor', body: 'Named after NMDA. Passes $\\text{Na}^+$, $\\text{K}^+$ and $\\text{Ca}^{2+}$; blocked by $\\text{Mg}^{2+}$ at rest.', x: 50, y: 60, w: 18, h: 40, mx: 50, my: 92, side: 'bottom' },
            { id: 'kainate', label: 'Kainate receptor', body: 'Named after kainate. Present pre- and postsynaptically; role less clear.', x: 82, y: 60, w: 18, h: 40, mx: 90, my: 62, side: 'right' },
          ], { quiz: false, gutter: 'all', layout: 'stack' }),
          'Glutamate-gated channels (slide 35). The three subtypes carry the names of the drugs that activate them selectively.',
          'Three channel proteins, blue, pink and tan, standing in a membrane, each with an arrow from the word glutamate at the top and a second arrow from its own agonist name.'
        ),
        {
          type: 'compare',
          title: 'The fast systems of the CNS',
          columns: ['Transmitter', 'Receptor channel', 'Ions', 'Effect'],
          rows: [
            { label: 'Fast excitation', cells: ['Glutamate', 'AMPA (and NMDA, kainate)', '$\\text{Na}^+$ in, $\\text{K}^+$ out; net inward at negative $V_m$', 'Rapid EPSP'] },
            { label: 'Fast inhibition', cells: ['GABA (glycine for most of the rest)', 'GABA-A', '$\\text{Cl}^-$', 'IPSP when $V_m$ is above $E_{\\text{Cl}}$; shunting either way'] },
          ],
        },
        figureBlock(
          hotspots('gabaa', 676 / 716, 'A GABA-gated chloride channel in a membrane with GABA above it and four modulatory drug molecules pointing at separate sites.', GABAA_REGIONS, { gutter: 'all' }),
          'The GABA-A receptor (textbook Figure 6.22). GABA opens it; benzodiazepines, barbiturates, ethanol and neurosteroids bind their own sites and change how it responds to GABA.',
          'A green two-lobed channel spanning a membrane, with a Cl⁻ pore down its middle. A green ball drops onto its top; a red block, a yellow wedge, a brown diamond and a purple oval each point an arrow at a different notch on the channel.'
        ),
        { type: 'example', title: 'Why the modulatory sites matter', body: ['Too much inhibition and consciousness is lost; too little and seizures follow. With GABA present, benzodiazepines (diazepam) increase the frequency of channel openings and barbiturates (phenobarbital) their duration: more $\\text{Cl}^-$ current, stronger IPSPs.', 'Ethanol acts on GABA-A receptors of particular subunit make-up, which is why it enhances inhibition in some regions but not others.'] },
      ],
      conceptQuiz: [
        {
          id: 'systems-1',
          prompt: 'Why do AMPA channels depolarize the cell although they pass $\\text{K}^+$ as well as $\\text{Na}^+$?',
          options: [
            { text: 'At negative $V_m$ they close to $\\text{K}^+$ and pass only $\\text{Na}^+$ inward', feedback: 'They pass both ions at every voltage.' },
            { text: 'At negative $V_m$ the pump returns the $\\text{K}^+$ that leaves the cell', feedback: 'Pumps are far too slow to matter on this time scale.' },
            { text: 'At negative $V_m$ more $\\text{Na}^+$ enters than $\\text{K}^+$ leaves: net inward current', feedback: 'Correct. The reversal potential is near $0\\,\\text{mV}$.' },
          ],
          correct: 2,
        },
        {
          id: 'systems-2',
          prompt: 'What do benzodiazepines do at the GABA-A receptor?',
          options: [
            { text: 'Bind the GABA site and open the channel without any GABA', feedback: 'Alone they do very little.' },
            { text: 'Bind their own site and make each opening last longer', feedback: 'That is the barbiturate effect.' },
            { text: 'Bind their own site and make openings more frequent with GABA', feedback: 'Correct. More $\\text{Cl}^-$ current per GABA release.' },
            { text: 'Bind inside the pore and block the flow of $\\text{Cl}^-$ ions', feedback: 'That would reduce inhibition; they enhance it.' },
          ],
          correct: 2,
        },
      ],
    },

    // 14 ----------------------------------------------------------------
    {
      id: 'circuits',
      title: 'Pyramidal neurons and inhibitory circuit motifs',
      keyTerms: ['pyramidal neuron', 'interneuron', 'feedforward inhibition', 'feedback inhibition', 'disinhibition', 'basket cell', 'chandelier cell', 'Martinotti cell'],
      blocks: [
        { type: 'definition', term: 'Pyramidal neurons excite', body: 'They release glutamate at their terminals onto other pyramidal cells and onto interneurons. Their spiny dendrites receive glutamate through AMPA, NMDA and kainate channels, and their long axons leave for other regions.' },
        { type: 'definition', term: 'Interneurons inhibit', body: 'They release GABA at their terminals. Through GABA-A receptors the rise in $\\text{Cl}^-$ conductance can silence a target even with little hyperpolarization. Where the synapse lands decides its power: basket cells on the soma and proximal dendrites, chandelier cells on the axon initial segment, Martinotti cells on the dendritic tufts.' },
        demoBlock('circuit-motifs', {
          motifs: [
            {
              key: 'feedforward', label: 'Feedforward inhibition', body: 'An incoming pathway excites a pyramidal cell and, in parallel, an interneuron that inhibits the same pyramidal cell.',
              steps: ['The input fires the interneuron and the pyramidal cell at about the same time.', 'The interneuron\'s IPSP arrives one synapse later and cuts the pyramidal cell\'s EPSP short.', 'Result: a narrow window for integration and a limit on how strongly the input can drive the output.'],
              cells: [{ id: 'E', kind: 'E', label: 'E', x: 400, y: 90 }, { id: 'I', kind: 'I', label: 'PV', x: 300, y: 200 }],
              links: [{ to: 'E', type: 'exc', input: true, label: 'input pathway' }, { to: 'I', type: 'exc', input: true }, { from: 'I', to: 'E', type: 'inh', focus: true }],
            },
            {
              key: 'feedback', label: 'Feedback inhibition', body: 'Local pyramidal-cell activity recruits interneurons that inhibit the local pyramidal-cell network, including the cells that drove them.',
              steps: ['The pyramidal cell fires and excites a nearby interneuron.', 'The interneuron inhibits the pyramidal cell (and its neighbours).', 'Result: activity regulates itself, keeping excitation and inhibition in balance.'],
              cells: [{ id: 'E', kind: 'E', label: 'E', x: 300, y: 100 }, { id: 'I', kind: 'I', label: 'PV', x: 460, y: 200 }],
              links: [{ to: 'E', type: 'exc', input: true, label: 'input' }, { from: 'E', to: 'I', type: 'exc', focus: true }, { from: 'I', to: 'E', type: 'inh', focus: true }],
            },
            {
              key: 'disinhibition', label: 'Disinhibition', body: 'One interneuron inhibits another, so the second interneuron\'s targets are released from inhibition. On slide 48, VIP cells inhibit SOM cells, which otherwise inhibit pyramidal dendrites.',
              steps: ['A VIP interneuron fires and inhibits an SOM (Martinotti) interneuron.', 'The SOM cell stops inhibiting the pyramidal dendrites.', 'Result: the pyramidal cell becomes more responsive to its excitatory inputs. Two inhibitory steps make a net excitation.'],
              cells: [{ id: 'V', kind: 'I', label: 'VIP', x: 160, y: 80 }, { id: 'S', kind: 'I', label: 'SOM', x: 330, y: 80 }, { id: 'E', kind: 'E', label: 'E', x: 460, y: 200 }],
              links: [{ from: 'V', to: 'S', type: 'inh', focus: true }, { from: 'S', to: 'E', type: 'inh' }, { to: 'E', type: 'exc', input: true, label: 'input' }],
              note: '',
            },
          ],
          labels: { motif: 'Motif', sequence: 'What happens', legend: 'Triangle: excitatory pyramidal cell. Circle: GABA interneuron (PV, SOM, VIP). Arrowhead: excitatory synapse. Filled dot: inhibitory synapse. The motif\'s own connections are drawn in blue.' },
        },
        'Circuit motif picker. Three ways interneurons are wired into cortical circuits (Tremblay et al. 2016; the wiring of slide 48).',
        'A small wiring diagram of a triangle and one or two circles joined by lines ending in arrowheads or dots, with radios that switch between feedforward inhibition, feedback inhibition and disinhibition.'),
        { type: 'whyItMatters', body: 'Neural circuits depend on a balance between excitation and inhibition. Less inhibition or more excitation tips a network into hyperexcitability: exaggerated startle when glycine inhibition fails, seizures when GABA inhibition fails.' },
      ],
      conceptQuiz: [
        {
          id: 'circuits-1',
          prompt: 'An incoming axon excites both a pyramidal cell and a PV interneuron that inhibits that pyramidal cell. The motif is',
          options: [
            { text: 'Feedback inhibition', feedback: 'Feedback would be driven by the pyramidal cell itself.' },
            { text: 'Disinhibition', feedback: 'Disinhibition needs an interneuron inhibiting another interneuron.' },
            { text: 'Feedforward inhibition', feedback: 'Correct. The inhibition is driven by the input, not by the pyramidal cell.' },
          ],
          correct: 2,
        },
        {
          id: 'circuits-2',
          prompt: 'Which transmitter do cortical interneurons release?',
          options: [
            { text: 'Glutamate, acting on AMPA and NMDA receptors', feedback: 'Glutamate is released by pyramidal neurons.' },
            { text: 'GABA, acting on GABA-A and GABA-B receptors', feedback: 'Correct. They inhibit.' },
            { text: 'Glycine, acting on its own $\\text{Cl}^-$ channels', feedback: 'Glycine handles some inhibition elsewhere; cortical interneurons use GABA.' },
          ],
          correct: 1,
        },
      ],
    },

    // 15 ----------------------------------------------------------------
    {
      id: 'nmda',
      title: 'NMDA receptors and AMPA-NMDA timing',
      keyTerms: ['magnesium block', 'coincidence detection', 'GABA-B receptor'],
      blocks: [
        { type: 'text', body: 'The NMDA receptor is the special snowflake among the glutamate channels: it is gated by transmitter and by voltage, and it lets $\\text{Ca}^{2+}$ in.' },
        figureBlock(
          hotspots('nmda', 463 / 540, 'Two NMDA receptors: at −65 mV glutamate is bound but a Mg²⁺ ion plugs the pore; at −30 mV the Mg²⁺ has left and Na⁺ and Ca²⁺ enter while K⁺ leaves.', [
            { id: 'blocked', label: '−65 mV: glutamate bound, pore blocked by Mg²⁺', body: 'The channel is open but a $\\text{Mg}^{2+}$ ion sits in the pore and little current passes.', x: 25, y: 45, w: 34, h: 50, mx: 25, my: 14, side: 'top' },
            { id: 'open', label: '−30 mV: depolarization expels Mg²⁺', body: '$\\text{Na}^+$ and $\\text{Ca}^{2+}$ enter, $\\text{K}^+$ leaves. Net inward current and $\\text{Ca}^{2+}$ signalling.', x: 75, y: 45, w: 34, h: 50, mx: 75, my: 14, side: 'top' },
          ], { quiz: false, gutter: 'ends', layout: 'stack' }),
          'Inward current through the NMDA-gated channel (textbook Figure 6.21).',
          'Two pink channels side by side in a membrane. Left, labelled −65 mV: a green glutamate ball on top and a small grey Mg²⁺ ball stuck in the pore. Right, labelled −30 mV: the Mg²⁺ ball is outside, red arrows carry Na⁺ and Ca²⁺ in and K⁺ out.'
        ),
        { type: 'steps', title: 'Coincidence detection', steps: [
          'Glutamate binds the NMDA receptor and the pore opens, but at negative resting potentials $\\text{Mg}^{2+}$ is drawn into the pore and blocks it: the magnesium block.',
          'Depolarization, usually from AMPA receptors at the same and neighbouring synapses, pops the $\\text{Mg}^{2+}$ out.',
          'With both conditions met, $\\text{Na}^+$ and $\\text{Ca}^{2+}$ enter and $\\text{K}^+$ leaves: inward current plus a $\\text{Ca}^{2+}$ signal.',
          'The entering $\\text{Ca}^{2+}$ activates enzymes and can change channels and gene expression: lasting change in the postsynaptic neuron, the basis of memory in Chapter 25.',
        ] },
        demoBlock('ampa-nmda', {
          labels: { vm: 'Membrane potential', glutamate: 'Glutamate bound', ampa: 'AMPA', nmda: 'NMDA', block: '$\\text{Mg}^{2+}$ block', mg: 'Mg²⁺', currentUnit: 'pA', open: 'open, ions pass', blocked: 'open but blocked by Mg²⁺', closed: 'closed', outside: 'outside', inside: 'inside', ampaTime: 'AMPA: fast, a few ms', nmdaTime: 'NMDA: slow, tens to hundreds of ms', blockedPct: 'of NMDA channels blocked', ampaNote: 'linear I-V, reversal near $0\\,\\text{mV}$', nmdaNote: 'the same reversal potential, but the current collapses at negative $V_m$ because of the block', blockNote: 'near rest most channels are plugged; glutamate alone gives little NMDA current', unblockNote: 'depolarization has cleared the pore; $\\text{Ca}^{2+}$ enters with $\\text{Na}^+$' },
        },
        'AMPA versus NMDA. Drag $V_m$: the AMPA current is a straight line through $0\\,\\text{mV}$; the NMDA current is tiny near rest and grows as depolarization relieves the $\\text{Mg}^{2+}$ block (Jahr and Stevens form). The pore cartoon shows where the $\\text{Mg}^{2+}$ is; the lower traces show the fast AMPA and slow NMDA time courses (slide 42).',
        'Two I-V curves through the origin, one straight and one that flattens toward zero at negative voltages, with dots at the chosen voltage; a cartoon pore with a magnesium ion in or out; and two current time courses, one brief and one long.'),
        { type: 'compare', title: 'Four receptors compared', columns: ['Mechanism', 'Ions', 'Speed', 'Function'], rows: [
          { label: 'AMPA', cells: ['Glutamate-gated channel', '$\\text{Na}^+$ in, $\\text{K}^+$ out', 'Fast, ms', 'Fast EPSP; provides the depolarization that unblocks NMDA'] },
          { label: 'NMDA', cells: ['Glutamate-gated channel, $\\text{Mg}^{2+}$ block removed by depolarization', '$\\text{Na}^+$ in, $\\text{K}^+$ out, $\\text{Ca}^{2+}$ in', 'Slow, tens to hundreds of ms', 'Coincidence detector; $\\text{Ca}^{2+}$ signal for lasting change'] },
          { label: 'GABA-A', cells: ['GABA-gated channel', '$\\text{Cl}^-$', 'Fast', 'Fast IPSP, shunting inhibition; drug sites'] },
          { label: 'GABA-B', cells: ['G-protein-coupled; G-protein opens $\\text{K}^+$ channels (shortcut pathway)', '$\\text{K}^+$ out', 'Slower, tens of ms and longer', 'Slow, prolonged inhibition toward $E_{\\text{K}}$'] },
        ] },
        { type: 'detail', title: 'Excitotoxicity (Box 6.4)', body: 'Too much glutamate kills neurons. When energy fails (stroke, cardiac arrest), membranes depolarize, $\\text{Ca}^{2+}$ leaks in, glutamate is released, and NMDA receptors become the main route for a lethal $\\text{Ca}^{2+}$ load that activates enzymes which digest the cell. NMDA antagonists are therefore of clinical interest.' },
      ],
      conceptQuiz: [
        {
          id: 'nmda-1',
          prompt: 'Glutamate is applied to a neuron held at $-65\\,\\text{mV}$ in normal $\\text{Mg}^{2+}$. Why is the NMDA current small?',
          options: [
            { text: 'Glutamate does not bind NMDA receptors', feedback: 'It binds; the pore opens but is blocked.' },
            { text: '$\\text{Mg}^{2+}$ plugs the open pore at negative potentials', feedback: 'Correct. Depolarization is needed to relieve the block.' },
            { text: 'NMDA receptors are only on the presynaptic side', feedback: 'They are postsynaptic, next to AMPA receptors.' },
          ],
          correct: 1,
        },
        {
          id: 'nmda-2',
          prompt: 'Which receptor works through a G-protein?',
          options: [
            { text: 'GABA-A', feedback: 'GABA-A is itself a $\\text{Cl}^-$ channel.' },
            { text: 'AMPA', feedback: 'AMPA is a glutamate-gated channel.' },
            { text: 'GABA-B', feedback: 'Correct. Its G-protein opens $\\text{K}^+$ channels.' },
          ],
          correct: 2,
        },
        {
          id: 'nmda-3',
          prompt: 'What does $\\text{Ca}^{2+}$ entering through NMDA channels do that $\\text{Na}^+$ entering through AMPA channels does not?',
          options: [
            { text: 'Acts as a second messenger, changing enzymes, channels and genes', feedback: 'Correct. The basis of lasting change.' },
            { text: 'Carries most of the fast EPSP current at the glutamate synapse', feedback: 'The fast EPSP is mostly AMPA current, carried by $\\text{Na}^+$.' },
            { text: 'Blocks the pore so that the NMDA current stays small at rest', feedback: 'That is $\\text{Mg}^{2+}$, not $\\text{Ca}^{2+}$.' },
          ],
          correct: 0,
        },
      ],
    },

    // 16 ----------------------------------------------------------------
    {
      id: 'interneurons',
      title: 'Interneuron diversity',
      keyTerms: ['GABAergic', 'parvalbumin', 'somatostatin', '5HT3aR', 'VIP', 'fast spiking', 'Petilla terminology'],
      blocks: [
        { type: 'keyNumber', items: [{ value: '20 to 30 percent', label: 'of cortical neurons are inhibitory interneurons (Sultan and Shi 2018), first described by Cajal as short-axon cells' }] },
        { type: 'steps', title: 'Three ways to classify an interneuron (slide 47)', steps: [
          { title: 'Morphology and connectivity,', body: 'sometimes including the layer the cell sits in. But morphology does not define function or electrical and molecular properties.' },
          { title: 'Electrical diversity,', body: 'which arises from both active properties (the combination of ion channels) and passive ones (the shape of the cell).' },
          { title: 'Expression', body: 'of $\\text{Ca}^{2+}$-binding proteins (parvalbumin, calbindin, calretinin), neuropeptides (SST, VIP) and receptors (5HT3aR).' },
        ] },
        figureBlock(
          hotspots('interneuron-types', 1024 / 482, 'Drawings of eight cortical interneuron classes with their dendrites in black and axons in colour.', TYPES_REGIONS, { gutter: 'all', layout: 'stack', labelPool: ['Small basket cell', 'Pyramidal cell'] }),
          'Morphological classes (Sultan and Shi 2018, slide 44 a). Dendrites black, axons coloured. The small basket cell (bottom left) is the eighth class.',
          'Eight ink drawings of neurons on a cream panel: a large star-shaped cell with teal axon branches, a small version of it, a tiny cell with a dense light blue axon, a cell with a candelabra of magenta axon, a deep cell whose magenta axon climbs to a tuft at the top, and three narrow vertical cells with blue or black processes.'
        ),
        figureBlock(
          hotspots('interneuron-targets', 576 / 482, 'A pyramidal cell drawn as a triangle with five interneurons contacting different parts of it: the tuft, the distal dendrite, the soma, the axon, and the space around it.', TARGETS_REGIONS, { gutter: 'all' }),
          'Where each class lands on the pyramidal cell (Sultan and Shi 2018, slide 44 d). The coloured dots on the pyramidal cell mark the contacts.',
          'A grey triangle with a vertical dendrite above and axon below. Five drawn interneurons surround it, their coloured axons ending as dots on the tuft, the upper dendrite, the cell body, the axon, or spread in a cloud.'
        ),
        {
          type: 'compare',
          title: 'Three groups account for nearly all neocortical GABAergic interneurons (Rudy et al. 2011, slide 45)',
          columns: ['Share', 'Marker', 'Includes', 'Firing'],
          rows: [
            { label: 'PV', cells: ['About 40 percent', 'The $\\text{Ca}^{2+}$-binding protein parvalbumin', 'Basket cells, chandelier cells', 'Fast spiking (FS)'] },
            { label: 'SST', cells: ['About 30 percent', 'The neuropeptide somatostatin (SOM in the diagrams)', 'Martinotti cells and others', 'Low-threshold spiking and bursting among them'] },
            { label: '5HT3aR', cells: ['About 30 percent', 'The ionotropic serotonin receptor 5HT3a', 'VIP cells (vasoactive intestinal peptide) and non-VIP cells such as neurogliaform (reelin) cells', 'Irregular and late spiking among them'] },
          ],
        },
        figureBlock(
          hotspots('interneuron-markers', 1312 / 424, 'Panels from Sultan and Shi: overlapping marker sets, five firing patterns, the PV, SOM and VIP wiring diagram, and gap-junction pairs.', [
            { id: 'markers', label: 'Marker overlap', body: 'PV, SOM, and the 5HTR-3A group (VIP, CCK, CR, reelin, NPY, nNOS) partly overlap: a label from one measurement does not fix the others.', shape: 'rect', x: 22, y: 50, w: 40, h: 90, mx: 22, my: 6, side: 'top' },
            { id: 'firing', label: 'Firing patterns', body: 'FS fast spiking, LS late spiking, IS irregular spiking, LTS low-threshold spiking, BST bursting: responses to a current step.', shape: 'rect', x: 50, y: 50, w: 12, h: 90, mx: 50, my: 6, side: 'top' },
            { id: 'wiring', label: 'Chemical wiring', body: 'PV inhibits E and PV; SOM inhibits E, PV and VIP; VIP inhibits SOM.', shape: 'rect', x: 67, y: 50, w: 16, h: 90, mx: 67, my: 6, side: 'top' },
            { id: 'coupling', label: 'Electrical coupling', body: 'Gap junctions join interneurons of the same firing class: FS-FS, LTS-LTS, IS-IS, BST-BST, LS-LS.', shape: 'rect', x: 90, y: 50, w: 16, h: 90, mx: 90, my: 6, side: 'top' },
          ], { quiz: false, gutter: 'ends', layout: 'stack' }),
          'Markers, firing patterns and connections (Sultan and Shi 2018, slide 46 b, c, e, f).',
          'Left: overlapping coloured blocks labelled PV, SOM, VIP, CCK, CR, reelin, NPY and nNOS. Middle: five small spike trains labelled FS, LS, IS, LTS, BST. Right: circles labelled PV, SOM, VIP and triangles labelled E joined by lines ending in dots, and pairs of same-coloured circles joined by resistor symbols.'
        ),
        { type: 'misconception', wrong: 'PV cell, basket cell and fast-spiking cell are three names for the same thing.', right: 'They describe a molecular, an anatomical and an electrical feature. The sets overlap heavily but are not identical, which is why the Petilla terminology keeps them separate.' },
      ],
      conceptQuiz: [
        {
          id: 'interneurons-1',
          prompt: 'Which group contains the chandelier cells that target the axon initial segment?',
          options: [
            { text: 'SST, the somatostatin group, some low-threshold spiking', feedback: 'SST includes Martinotti cells, which target dendritic tufts.' },
            { text: 'PV, the parvalbumin group, mostly fast spiking', feedback: 'Correct. Basket and chandelier cells.' },
            { text: '5HT3aR, the serotonin receptor group, some irregular spiking', feedback: 'That group includes VIP and neurogliaform cells.' },
          ],
          correct: 1,
        },
        {
          id: 'interneurons-2',
          prompt: 'What does SST stand for on the slides?',
          options: [
            { text: 'Serotonin, the transmitter of 5HT3aR', feedback: 'Serotonin is the ligand of the 5HT3aR group marker.' },
            { text: 'Substance P, a neuropeptide marker', feedback: 'Substance P is a peptide transmitter, not the SST marker.' },
            { text: 'Somatostatin, a neuropeptide marker', feedback: 'Correct. SOM in the diagrams.' },
            { text: 'A $\\text{Ca}^{2+}$-binding protein marker', feedback: 'Parvalbumin, calbindin and calretinin are the $\\text{Ca}^{2+}$-binding proteins.' },
          ],
          correct: 2,
        },
        {
          id: 'interneurons-3',
          prompt: 'A Martinotti cell inhibits',
          options: [
            { text: 'The axon initial segment of pyramidal cells', feedback: 'That is the chandelier cell.' },
            { text: 'The dendritic tufts of pyramidal cells', feedback: 'Correct. Its axon climbs to layer 1.' },
            { text: 'The soma and proximal dendrites of pyramidal cells', feedback: 'That is the basket cell.' },
          ],
          correct: 1,
        },
      ],
    },

    // 17 ----------------------------------------------------------------
    {
      id: 'coupling',
      title: 'Electrical coupling among interneurons',
      keyTerms: ['electrical coupling'],
      blocks: [
        { type: 'text', body: 'Slide 48 takes us out of the rabbit hole with two small diagrams: who inhibits whom, and who is electrically coupled to whom.' },
        figureBlock(
          hotspots('circuit-motifs', 621 / 524, 'Left: PV, SOM and VIP interneurons and E cells with inhibitory connections. Right: five pairs of same-type interneurons joined by gap junctions.', [
            { id: 'pv', label: 'PV inhibits E and PV', body: 'Fast-spiking PV cells inhibit pyramidal cells (feedforward and feedback inhibition) and each other.', shape: 'rect', x: 24, y: 22, w: 40, h: 34, mx: 24, my: 4, side: 'top' },
            { id: 'som', label: 'SOM inhibits E, PV and VIP', body: 'SOM (Martinotti) cells inhibit pyramidal dendrites and both other interneuron types.', shape: 'rect', x: 24, y: 58, w: 40, h: 30, mx: 6, my: 58, side: 'left' },
            { id: 'vip', label: 'VIP inhibits SOM: disinhibition', body: 'VIP cells preferentially inhibit SOM cells, which releases the pyramidal cells from SOM inhibition.', shape: 'rect', x: 24, y: 88, w: 40, h: 12, mx: 24, my: 96, side: 'bottom' },
            { id: 'gap', label: 'Gap junctions between like cells', body: 'FS with FS, LTS with LTS, IS with IS, BST with BST, LS with LS. Coupling synchronizes each class.', shape: 'rect', x: 75, y: 55, w: 30, h: 80, mx: 92, my: 30, side: 'right' },
          ], { quiz: false, gutter: 'all' }),
          'Chemical wiring and electrical coupling of cortical interneurons (Sultan and Shi 2018, slide 48). E marks excitatory neurons; black dots are inhibitory chemical synapses; resistor symbols are gap junctions.',
          'Left panel: coloured circles PV, SOM and VIP with lines ending in black dots on grey E triangles and on each other. Right panel: five vertical pairs of coloured circles, each pair joined by a zigzag symbol.'
        ),
        {
          type: 'compare',
          title: 'Two networks in one',
          columns: ['Chemical (GABA)', 'Electrical (gap junctions)'],
          rows: [
            { label: 'Who connects to whom', cells: ['PV to E and PV; SOM to E, PV, VIP; VIP to SOM', 'Same class to same class: FS-FS, LTS-LTS, IS-IS, BST-BST, LS-LS'] },
            { label: 'Effect', cells: ['Inhibition and disinhibition of specific targets', 'Synchrony within a class, as in the inferior olive example'] },
          ],
        },
      ],
      conceptQuiz: [
        {
          id: 'coupling-1',
          prompt: 'On slide 48, which cells are joined by gap junctions?',
          options: [
            { text: 'PV interneurons with the pyramidal cells they inhibit', feedback: 'PV cells inhibit pyramidal cells chemically.' },
            { text: 'Interneurons of the same firing type, such as FS with FS', feedback: 'Correct. Coupling synchronizes each class.' },
            { text: 'VIP interneurons with the SOM interneurons they inhibit', feedback: 'VIP inhibits SOM through GABA synapses, not gap junctions.' },
          ],
          correct: 1,
        },
      ],
    },

    // 18 ----------------------------------------------------------------
    {
      id: 'pharmacology',
      title: 'Receptor pharmacology and metabotropic signalling',
      keyTerms: ['agonist', 'antagonist', 'nicotinic receptor', 'muscarinic receptor', 'G-protein', 'adenylyl cyclase', 'cAMP', 'protein kinase A', 'phosphorylation', 'protein phosphatase', 'divergence', 'convergence', 'modulation'],
      blocks: [
        { type: 'definition', term: 'Agonist and antagonist', body: 'An agonist binds and activates a receptor, mimicking the transmitter. An antagonist binds and blocks the transmitter\'s action. Drugs that act differently at different receptors are how receptor subtypes were told apart.' },
        {
          type: 'compare',
          title: 'Table 6.1: transmitters, receptors and their pharmacology (slide 50)',
          columns: ['Receptor subtype', 'Agonist', 'Antagonist'],
          rows: [
            { label: 'Acetylcholine', cells: ['Nicotinic; muscarinic', 'Nicotine; muscarine', 'Curare; atropine'] },
            { label: 'Norepinephrine', cells: ['Alpha; beta', 'Phenylephrine; isoproterenol', 'Phenoxybenzamine; propranolol'] },
            { label: 'Glutamate', cells: ['AMPA; NMDA', 'AMPA; NMDA', 'CNQX; AP5'] },
            { label: 'GABA', cells: ['GABA-A; GABA-B', 'Muscimol; baclofen', 'Bicuculline; phaclofen'] },
            { label: 'ATP', cells: ['P2X', 'ATP', 'Suramin'] },
            { label: 'Adenosine', cells: ['A type', 'Adenosine', 'Caffeine'] },
          ],
        },
        { type: 'detail', title: 'G-protein-coupled receptor families (Table 6.2, slide 51)', body: ['Muscarinic M1 to M5, metabotropic glutamate receptors mGluR1 to 8, GABA-B1 and B2, many serotonin subtypes, dopamine D1 to D5, alpha-1, alpha-2 and beta-1 to 3 adrenergic, opioid mu, delta and kappa, cannabinoid CB1 and CB2, P2Y and adenosine A1 to A3.', 'About 800 genes in all. Adenosine is not packaged in vesicles, so the book does not count it as a classical transmitter.'] },
        { type: 'steps', title: 'How a G-protein-coupled receptor works', steps: [
          'The receptor is one polypeptide with seven membrane-spanning helices: transmitter site outside, G-protein site inside.',
          'The G-protein has alpha, beta and gamma subunits and holds GDP at rest. When a receptor with transmitter bound bumps into it, the alpha subunit swaps GDP for GTP.',
          'Alpha-GTP and the beta-gamma complex separate and each can act on effector proteins: Gs stimulates, Gi inhibits.',
          'Effector 1, the shortcut pathway: a G-protein-gated ion channel, within 30 to $100\\,\\text{ms}$, membrane-delimited (muscarinic receptors in the heart; GABA-B).',
          'Effector 2, a second messenger cascade: an enzyme such as adenylyl cyclase makes cAMP, which activates kinases that phosphorylate proteins. Slower, longer-lasting, amplified: one receptor can reach 10 to 20 G-proteins, each making many cAMP.',
          'The alpha subunit switches itself off by hydrolysing GTP to GDP and rejoins beta-gamma. Protein phosphatases remove the phosphates the kinases added.',
        ] },
        figureBlock(
          hotspots('ne-cascade', 960 / 539, 'A membrane with a beta receptor binding norepinephrine, a G-protein, adenylyl cyclase, an ATP burst, cAMP, a protein kinase box and a potassium channel, with steps numbered 1 to 5.', NE_REGIONS, { gutter: 'all', layout: 'stack' }),
          'Modulation by the NE beta receptor (textbook Figure 5.22, slide 53). Follow the numbers from the receptor to the $\\text{K}^+$ channel.',
          'From left to right in a blue membrane panel: a green receptor with a red ball, arrow 1 to a purple G-protein, arrow 2 to a teal enzyme, a starburst ATP and a cAMP capsule under arrow 3, arrow 4 to a yellow box, and arrow 5 up to a pink channel.'
        ),
        { type: 'steps', title: 'The beta-receptor cascade, step by step', steps: [
          'NE binds the beta receptor and activates the stimulatory G-protein Gs.',
          'Gs activates the membrane enzyme adenylyl cyclase.',
          'Adenylyl cyclase converts ATP into the second messenger cAMP.',
          'cAMP activates protein kinase A (PKA).',
          'PKA phosphorylates a type of $\\text{K}^+$ channel in the dendritic membrane, which closes.',
          'Consequence: lower $\\text{K}^+$ conductance, higher membrane resistance, longer length constant. Distant or weak EPSPs now reach the spike-initiation zone. NE itself barely changes $V_m$; it modulates the response to other inputs, and the effect outlasts the NE because of the biochemical intermediaries.',
        ] },
        {
          type: 'compare',
          title: 'Divergence and convergence',
          columns: ['Meaning', 'Example'],
          rows: [
            { label: 'Divergence', cells: ['One transmitter activates several receptor subtypes and effector systems', 'NE on beta receptors activates Gs and raises cAMP; on alpha-2 receptors activates Gi and suppresses adenylyl cyclase'] },
            { label: 'Convergence', cells: ['Several transmitters, each with its own receptor, act on one effector', 'Different receptors feeding the same G-protein, enzyme or channel'] },
          ],
        },
        { type: 'whyItMatters', body: 'Transmitter-gated channels carry the fast, specific information; G-protein-coupled receptors change how effective that information is. Modulation is slow, amplified, regulable, and can last a lifetime of memories.' },
      ],
      conceptQuiz: [
        {
          id: 'pharm-1',
          prompt: 'Curare paralyses muscle because it',
          options: [
            { text: 'Blocks ACh at muscarinic receptors, as an antagonist', feedback: 'That is atropine; skeletal muscle uses nicotinic receptors.' },
            { text: 'Activates nicotinic receptors, as an agonist', feedback: 'That is nicotine.' },
            { text: 'Blocks acetylcholinesterase, so ACh stays in the cleft', feedback: 'That is what nerve gases do.' },
            { text: 'Blocks ACh at nicotinic receptors, as an antagonist', feedback: 'Correct.' },
          ],
          correct: 3,
        },
        {
          id: 'pharm-2',
          prompt: 'What is the second messenger in the NE beta-receptor cascade?',
          options: [
            { text: 'Gs, the G-protein activated by the receptor', feedback: 'The G-protein links receptor and enzyme; it is not a messenger molecule.' },
            { text: 'cAMP, made from ATP by adenylyl cyclase', feedback: 'Correct.' },
            { text: 'PKA, the kinase that phosphorylates the channel', feedback: 'PKA is the enzyme that cAMP activates.' },
          ],
          correct: 1,
        },
        {
          id: 'pharm-3',
          prompt: 'Closing dendritic $\\text{K}^+$ channels makes the neuron more excitable because',
          options: [
            { text: 'Membrane resistance falls and the cell depolarizes to threshold alone', feedback: 'Closing channels raises resistance, and NE alone changes $V_m$ little.' },
            { text: 'Internal resistance falls, so current flows more easily to the hillock', feedback: 'Internal resistance is set by the dendrite, not by its membrane channels.' },
            { text: 'Membrane resistance and length constant rise, so distant EPSPs reach the hillock', feedback: 'Correct.' },
          ],
          correct: 2,
        },
      ],
    },
  ],

  recap: {
    terms: [
      { term: 'Synapse', definition: 'Junction from presynaptic to postsynaptic cell. Axodendritic (stereotype), axosomatic, axoaxonic, dendrodendritic; axospinous on a spine.' },
      { term: 'Chemical synapse, presynaptic', definition: 'Terminal with vesicles ($50\\,\\text{nm}$), secretory granules ($100\\,\\text{nm}$, peptides), mitochondria and active zones.' },
      { term: 'Chemical synapse, postsynaptic', definition: 'Cleft 20 to $50\\,\\text{nm}$, then the postsynaptic density holding the receptors.' },
      { term: 'Gap junction', definition: '6 connexins = connexon; 2 connexons = channel; many channels = gap junction.' },
      { term: 'Gap junction dimensions', definition: 'Membranes $3.5\\,\\text{nm}$ apart, pore 1 to $2\\,\\text{nm}$. Ions and small molecules pass both ways.' },
      { term: 'Electrical synapse', definition: 'Direct current, no delay, bidirectional, PSP about $1\\,\\text{mV}$; fail-safe if large. Synchronizes oscillations (inferior olive, connexin36).' },
      { term: 'Chemical synapse', definition: 'Release, diffusion, binding: delay 0.5 to $1\\,\\text{ms}$, one way, EPSP or IPSP, modulated at every step.' },
      { term: 'Targeting', definition: 'One terminal on a spine; two on one soma; one wrapping a soma; one on many spines.' },
      { term: 'Reading a synapse', definition: 'Bigger synapses have more active zones. Asymmetric (type I) usually excitatory, symmetric (type II) usually inhibitory.' },
      { term: 'Convergence', definition: 'Thousands of inputs on one neuron; synaptic integration turns them into spikes.' },
      { term: 'Dendritic spine', definition: 'Head on a neck; receives synaptic input; PSD and spine apparatus; shape changes with activity.' },
      { term: 'Serial-section EM', definition: 'Reconstructs a dendrite in 3D: it shows where the contacts are, not how strong they are.' },
      { term: 'Transmitter criteria', definition: 'Synthesized and stored presynaptically; released on stimulation; applied molecule mimics the response.' },
      { term: 'Amino acid and amine transmitters', definition: 'Amino acids: GABA, glutamate, glycine. Amines: DA, epinephrine, histamine, NE, 5-HT, with ACh grouped in.' },
      { term: 'Peptide transmitters', definition: 'CCK, dynorphin, enkephalins, NAAG, NPY, somatostatin, substance P, TRH, VIP.' },
      { term: 'Peptide synthesis', definition: 'Precursor on the rough ER, Golgi splits and packs it into granules, kinesin carries them to the terminal.' },
      { term: 'Amine and amino acid synthesis', definition: 'Enzymes in the terminal cytosol make them; transporter proteins load them into the vesicles.' },
      { term: 'Release trigger', definition: 'The spike opens voltage-gated $\\text{Ca}^{2+}$ channels at the active zone; a $\\text{Ca}^{2+}$ microdomain forms beside docked vesicles.' },
      { term: 'Fusion machinery', definition: 'Synaptotagmin senses $\\text{Ca}^{2+}$; SNAREs (v on the vesicle, t on the target) fuse it; a fusion pore opens.' },
      { term: 'Release speed and recycling', definition: 'Exocytosis within $0.2\\,\\text{ms}$ ($60\\,\\mu\\text{s}$ in mammals); endocytosis recycles. Botulinum toxin cuts SNAREs.' },
      { term: 'Quantum', definition: 'Contents of one vesicle. CNS synapse about 1 per spike (tenths of a mV); NMJ about 200 ($40\\,\\text{mV}$).' },
      { term: 'Ionotropic receptor', definition: 'Transmitter-gated channel of 4 or 5 subunits, opens in microseconds. $\\text{Na}^+$: EPSP (ACh, glutamate). $\\text{Cl}^-$: IPSP (GABA, glycine).' },
      { term: 'Metabotropic receptor', definition: 'G-protein-coupled, 7 helices. Effector: a G-protein-gated channel (shortcut, 30 to $100\\,\\text{ms}$) or a second-messenger enzyme.' },
      { term: 'Why metabotropic differs', definition: 'Slower, longer-lasting, more diverse and amplified: one receptor drives 10 to 20 G-proteins.' },
      { term: 'Removal', definition: 'Diffusion; reuptake by transporters into terminal or glia; enzymatic destruction (AChE at NMJ). Otherwise desensitization.' },
      { term: 'Reversal potential', definition: '$V_m$ where the channel current changes direction, read off the I-V plot. Mixed $\\text{Na}^+/\\text{K}^+$ channel: about $0\\,\\text{mV}$.' },
      { term: 'Excitatory or inhibitory', definition: 'Excitatory if $E_{\\text{rev}}$ lies above threshold, inhibitory if it lies below.' },
      { term: 'EPSP / IPSP', definition: 'Brief depolarization toward threshold / brief hyperpolarization. Inhibition does not need hyperpolarization: at $E_{\\text{Cl}}$ the conductance alone shunts.' },
      { term: 'Summation', definition: 'Spatial: different synapses at the same time. Temporal: the same synapse within 1 to $15\\,\\text{ms}$.' },
      { term: 'Length constant', definition: 'Distance over which a steady depolarization falls to 37 percent. Rises with membrane resistance, falls with internal resistance.' },
      { term: 'Active dendrites', definition: 'Voltage-gated channels in dendrites amplify distant EPSPs, and signals travel from the soma back into the dendrites.' },
      { term: 'Shunting inhibition', definition: '$\\text{Cl}^-$ channels at $E_{\\text{Cl}}$ near rest lower membrane resistance; $\\text{Cl}^-$ entry opposes the depolarization, so the somatic EPSP shrinks.' },
      { term: 'Where inhibition lands', definition: 'The potential at the axon hillock is all that counts, so PV basket and chandelier cells hold the veto.' },
      { term: 'AMPA and kainate receptors', definition: 'Glutamate-gated channels passing $\\text{Na}^+$ and $\\text{K}^+$; net inward current at rest, so a fast EPSP. Named after agonists.' },
      { term: 'NMDA receptor', definition: 'Passes $\\text{Na}^+$, $\\text{K}^+$ and $\\text{Ca}^{2+}$. $\\text{Mg}^{2+}$ blocks the pore until depolarization removes it. Slow; coincidence detector.' },
      { term: 'GABA receptors', definition: 'GABA-A: $\\text{Cl}^-$ channel, fast IPSP; sites for benzodiazepines (frequency), barbiturates (duration), ethanol, neurosteroids. GABA-B: G-protein opens $\\text{K}^+$ channels, slow.' },
      { term: 'Pyramidal cells', definition: 'They excite: glutamate, spiny dendrites, long axons to other regions.' },
      { term: 'Interneurons', definition: 'GABA, 20 to 30 percent of cortical neurons. Basket to soma, chandelier to axon initial segment, Martinotti to tufts.' },
      { term: 'Feedforward and feedback inhibition', definition: 'Feedforward: the input excites E and an interneuron that inhibits E. Feedback: E recruits interneurons that inhibit E.' },
      { term: 'Disinhibition', definition: 'VIP inhibits SOM, which frees E: two inhibitory synapses in series come out as excitation.' },
      { term: 'Excitation-inhibition balance', definition: 'Too much inhibition and consciousness is lost, too little and seizures follow.' },
      { term: 'Interneuron groups (Rudy)', definition: 'PV about 40 percent (basket, chandelier, fast spiking), SST about 30 percent (Martinotti), 5HT3aR about 30 percent (VIP, neurogliaform).' },
      { term: 'Firing patterns and coupling', definition: 'FS, LTS, IS, BST, LS. Gap junctions couple interneurons within one firing class.' },
      { term: 'Pharmacology: ACh and NE', definition: 'ACh nicotinic (nicotine / curare), muscarinic (muscarine / atropine). NE alpha (phenylephrine / phenoxybenzamine), beta (isoproterenol / propranolol).' },
      { term: 'Pharmacology: glutamate and GABA', definition: 'AMPA (AMPA / CNQX), NMDA (NMDA / AP5). GABA-A (muscimol / bicuculline), GABA-B (baclofen / phaclofen).' },
      { term: 'Pharmacology: ATP and adenosine', definition: 'ATP P2X (ATP / suramin). Adenosine A type (adenosine / caffeine).' },
      { term: 'G-protein cycle', definition: 'Alpha, beta, gamma; GDP at rest. A bound receptor swaps GDP for GTP; alpha-GTP and beta-gamma act on effectors.' },
      { term: 'Gs, Gi and the reset', definition: 'Gs stimulates, Gi inhibits. Alpha hydrolyses GTP and rejoins. Kinases phosphorylate; phosphatases reverse it.' },
      { term: 'NE beta cascade', definition: 'NE binds the beta receptor and Gs; adenylyl cyclase; ATP to cAMP; protein kinase A; a $\\text{K}^+$ channel closes.' },
      { term: 'What the cascade does', definition: 'Higher membrane resistance and length constant, so the cell is more excitable; the effect outlasts NE. Alpha-2 uses Gi.' },
      { term: 'Divergence / convergence', definition: 'One transmitter, many receptor subtypes and effectors / many transmitters onto one effector.' },
    ],
    equations: [
      {
        name: 'Synaptic current',
        tex: 'I_{\\text{syn}} = g_{\\text{syn}}\\,(V_m - E_{\\text{rev}})',
        note: 'Zero at the reversal potential. Inward (negative) below $E_{\\text{rev}}$ for a cation channel: EPSP. Mixed $\\text{Na}^+/\\text{K}^+$ channel: $E_{\\text{rev}}$ about $0\\,\\text{mV}$.',
      },
      {
        name: 'Passive cable',
        tex: 'V_x = \\frac{V_0}{e^{x/\\lambda}}, \\qquad x = \\lambda:\\; V_x = 0.37\\,V_0',
        note: '$\\lambda$ grows with membrane resistance $r_m$ and shrinks with internal resistance $r_i$.',
      },
      {
        name: 'Gap junction arithmetic',
        tex: '6\\ \\text{connexins} = 1\\ \\text{connexon}, \\qquad 2\\ \\text{connexons} = 1\\ \\text{channel}',
        note: 'Many channels make one gap junction.',
      },
    ],
  },

  lectureQuiz: [
    // Easy ---------------------------------------------------------------
    {
      id: 'q01',
      difficulty: 'easy',
      type: 'mc',
      prompt: 'What is a connexon?',
      options: [
        { text: 'A half-channel of six connexins, contributed by one cell', feedback: 'Correct. Two connexons, one from each cell, make a gap junction channel.' },
        { text: 'A full channel of twelve connexins, shared by two cells', feedback: 'That is a gap junction channel: two connexons.' },
        { text: 'A single connexin protein spanning both membranes', feedback: 'One connexin spans one membrane; six of them make a connexon.' },
        { text: 'A plaque of many channels joining the two cells', feedback: 'That is the gap junction itself.' },
      ],
      correct: 0,
      modelAnswer: [
        'Six connexin subunits assemble into a connexon, a half-channel in one cell\'s membrane.',
        'A connexon from each cell meets across the $3.5\\,\\text{nm}$ gap to form one gap junction channel, and many channels make a gap junction.',
      ],
    },
    {
      id: 'q04',
      difficulty: 'easy',
      type: 'fillBlank',
      prompt: 'Fill in the blanks.',
      text: 'Most fast excitation in the brain is mediated by ___. Most fast inhibition is mediated by ___, and glycine mediates most of the rest.',
      blanks: [
        { accept: ['glutamate', 'glutamic acid', 'Glu'] },
        { accept: ['GABA', 'gamma-aminobutyric acid', 'gamma aminobutyric acid', 'γ-aminobutyric acid'] },
      ],
      modelAnswer: [
        'Glutamate acting on AMPA (and NMDA, kainate) channels gives most fast EPSPs.',
        'GABA acting on GABA-A $\\text{Cl}^-$ channels gives most fast IPSPs; glycine mediates most of the rest.',
      ],
    },
    {
      id: 'q05',
      difficulty: 'easy',
      type: 'trueFalse',
      prompt: 'True or false: atropine blocks acetylcholine at nicotinic receptors, which is why it paralyses skeletal muscle.',
      answer: false,
      justification: 'Atropine is the muscarinic antagonist. Curare blocks ACh at the nicotinic receptors of skeletal muscle.',
      modelAnswer: [
        'False. Nicotinic receptors: agonist nicotine, antagonist curare. Muscarinic receptors: agonist muscarine, antagonist atropine.',
        'Skeletal muscle uses nicotinic receptors, so curare, not atropine, paralyses it.',
        'Drugs with different actions at the two receptors are what defined the subtypes.',
      ],
    },

    // Medium -------------------------------------------------------------
    {
      id: 'q06',
      difficulty: 'medium',
      type: 'order',
      prompt: 'Put the events of chemical transmission in order.',
      items: [
        'Transmitter is removed by diffusion, reuptake or enzymatic breakdown',
        'The action potential depolarizes the presynaptic terminal',
        'Synaptotagmin binds $\\text{Ca}^{2+}$',
        '$\\text{Ca}^{2+}$ enters through voltage-gated $\\text{Ca}^{2+}$ channels',
        'Transmitter binds postsynaptic receptors and activates them',
        'SNARE-mediated fusion releases transmitter into the cleft',
      ],
      correctOrder: [1, 3, 2, 5, 4, 0],
      modelAnswer: [
        'Presynaptic depolarization is what opens the voltage-gated $\\text{Ca}^{2+}$ channels.',
        '$\\text{Ca}^{2+}$ entry raises the local concentration at the active zone.',
        'Synaptotagmin, the vesicle\'s $\\text{Ca}^{2+}$ sensor, is activated.',
        'It triggers SNARE-mediated fusion and transmitter enters the cleft.',
        'Transmitter diffuses across and activates the receptors.',
        'Removal by diffusion, uptake into neurons or glia, or enzymatic breakdown ends the signal.',
      ],
    },
    {
      id: 'q07',
      difficulty: 'medium',
      type: 'label',
      prompt: 'Label the numbered parts of the chemical synapse.',
      hotspots: { src: fig('chemical-synapse'), alt: 'A cut-open axon terminal on a dendrite.', aspect: 928 / 651, regions: SYNAPSE_REGIONS, gutter: 'all', layout: 'stack', labelPool: ['Gap junction', 'Axon hillock'] },
      modelAnswer: [
        'The axon terminal is the presynaptic element, cut open here.',
        'Synaptic vesicles ($50\\,\\text{nm}$) hold amino acid and amine transmitters; secretory granules ($100\\,\\text{nm}$, dense core) hold peptides.',
        'Mitochondria supply ATP.',
        'The active zone is where docked vesicles fuse; the cleft is the 20 to $50\\,\\text{nm}$ gap; the postsynaptic density holds the receptors.',
      ],
    },
    {
      id: 'q08',
      difficulty: 'medium',
      type: 'mc',
      prompt: 'A pyramidal cell fires and excites a nearby PV interneuron, which then inhibits that same pyramidal cell and its neighbours. Which motif is this?',
      options: [
        { text: 'Feedforward inhibition', feedback: 'Feedforward inhibition is driven by the incoming pathway, not by the pyramidal cell.' },
        { text: 'Disinhibition', feedback: 'Disinhibition needs an interneuron inhibiting another interneuron.' },
        { text: 'Electrical coupling', feedback: 'These are chemical GABA synapses.' },
        { text: 'Feedback inhibition', feedback: 'Correct. The pyramidal cell recruits its own inhibition.' },
      ],
      correct: 3,
      modelAnswer: [
        'Feedforward: an input excites E and an interneuron that inhibits E.',
        'Feedback: local E activity recruits interneurons that inhibit the local E network, as here.',
        'Disinhibition: one interneuron (VIP) inhibits another (SOM), releasing the SOM targets.',
      ],
    },
    {
      id: 'q14',
      difficulty: 'medium',
      type: 'order',
      prompt: 'Put the steps of the norepinephrine beta-receptor cascade in order, ending with the effect on excitability.',
      items: [
        'Protein kinase A phosphorylates a dendritic $\\text{K}^+$ channel, which closes',
        'NE binds the beta receptor and activates the G-protein Gs',
        'cAMP activates protein kinase A',
        'Membrane resistance and the length constant rise, so distant EPSPs reach the spike-initiation zone',
        'Gs activates adenylyl cyclase',
        'Adenylyl cyclase converts ATP into cAMP',
      ],
      correctOrder: [1, 4, 5, 2, 0, 3],
      modelAnswer: [
        'Norepinephrine binds the beta-adrenergic receptor, which activates the stimulatory G-protein Gs.',
        'Gs activates the membrane enzyme adenylyl cyclase.',
        'Adenylyl cyclase converts ATP into the second messenger cAMP.',
        'cAMP activates protein kinase A.',
        'PKA transfers phosphate from ATP to a type of dendritic $\\text{K}^+$ channel, which closes and lowers $g_{\\text{K}}$.',
        'Lower $\\text{K}^+$ conductance means higher membrane resistance and a longer length constant, so weak or distant excitatory inputs now depolarize the spike-initiation zone: the cell is more excitable although NE alone barely changed $V_m$. Phosphatases later reverse the phosphorylation.',
      ],
    },
    {
      id: 'q16',
      difficulty: 'medium',
      type: 'trueFalse',
      prompt: 'True or false: in a neuron resting at $E_{\\text{Cl}}$, opening $\\text{Cl}^-$ channels on the dendrite cannot inhibit it, because no net $\\text{Cl}^-$ current flows.',
      answer: false,
      justification: 'The open channels lower membrane resistance. Once an EPSP lifts $V_m$ above $E_{\\text{Cl}}$, $\\text{Cl}^-$ enters and shunts it.',
      modelAnswer: [
        'False. A mixed $\\text{Na}^+/\\text{K}^+$ channel with $E_{\\text{rev}}$ near $0\\,\\text{mV}$ carries net inward current at $-65\\,\\text{mV}$: more $\\text{Na}^+$ enters than $\\text{K}^+$ leaves, and the membrane depolarizes toward $0\\,\\text{mV}$. That is the EPSP.',
        '$\\text{Cl}^-$ channels with $E_{\\text{Cl}}$ at rest have no driving force, so opening them alone changes $V_m$ little and no IPSP is seen. But they add conductance and lower the membrane resistance.',
        'As soon as the EPSP lifts $V_m$ above $E_{\\text{Cl}}$, $\\text{Cl}^-$ flows in and pulls it back, and the depolarizing current leaks out before it reaches the soma. The somatic EPSP is smaller: shunting inhibition, inhibition without hyperpolarization.',
      ],
    },
    {
      id: 'q18',
      difficulty: 'medium',
      type: 'clinicalCase',
      scenario: 'A patient who ate food contaminated with botulinum toxin develops a flaccid paralysis. In a biopsy of the muscle, action potentials still reach the motor axon terminals and $\\text{Ca}^{2+}$ still enters them. The terminals are packed with docked vesicles full of acetylcholine, and the muscle still contracts when acetylcholine is applied to it. Yet almost no acetylcholine is released.',
      prompt: 'Which step of transmission has the toxin broken?',
      options: [
        { text: 'SNARE-mediated fusion of docked vesicles with the membrane', feedback: 'Correct. Every step before and after fusion still works.' },
        { text: 'Opening of voltage-gated $\\text{Ca}^{2+}$ channels at the active zone', feedback: '$\\text{Ca}^{2+}$ still enters the terminals, so the channels open.' },
        { text: 'Loading of acetylcholine into vesicles by transporter proteins', feedback: 'The docked vesicles are full, so loading works.' },
        { text: 'Binding of acetylcholine to nicotinic receptors on the muscle', feedback: 'Applied acetylcholine still contracts the muscle, so the receptors work.' },
      ],
      correct: 0,
      modelAnswer: [
        'Key finding: the spike arrives and $\\text{Ca}^{2+}$ enters, the vesicles are loaded and docked, and the muscle responds to applied acetylcholine, yet nothing is released.',
        'Normally $\\text{Ca}^{2+}$ binds synaptotagmin, and the zipped v-SNARE and t-SNAREs pull the vesicle into the membrane so a fusion pore opens.',
        'Every step before and after fusion works, so the broken link is fusion itself.',
        'Answer: SNARE-mediated fusion. Botulinum toxins are enzymes that destroy specific SNARE proteins, so docked vesicles cannot fuse and release is blocked at the neuromuscular junction.',
      ],
    },

    // Hard ---------------------------------------------------------------
    {
      id: 'q17',
      difficulty: 'hard',
      type: 'calc',
      prompt: 'GABA opens $\\text{Cl}^-$ channels with a total conductance of $2\\,\\text{nS}$ while excitatory input holds the postsynaptic membrane at $-40\\,\\text{mV}$. $E_{\\text{Cl}} = -65\\,\\text{mV}$. Calculate the synaptic current in pA (outward positive) and say which way it moves $V_m$.',
      given: [
        { symbol: '$g_{\\text{Cl}}$', value: 2, unit: 'nS' },
        { symbol: '$V_m$', value: -40, unit: 'mV' },
        { symbol: '$E_{\\text{Cl}}$', value: -65, unit: 'mV' },
      ],
      answer: { value: 50, tolerance: 1, unit: 'pA' },
      steps: [
        { text: 'Write the synaptic current equation.', tex: 'I = g\\,(V_m - E_{\\text{rev}})' },
        { text: 'Substitute, with $E_{\\text{rev}} = E_{\\text{Cl}}$.', tex: 'I = 2\\,\\text{nS} \\times \\big(-40 - (-65)\\big)\\,\\text{mV}' },
        { text: 'Driving force.', tex: 'V_m - E_{\\text{Cl}} = +25\\,\\text{mV}' },
        { text: 'Multiply (nS times mV gives pA).', tex: 'I = 2 \\times 25 = +50\\,\\text{pA}' },
      ],
      modelAnswer: [
        '$I = +50\\,\\text{pA}$. Positive means outward: $\\text{Cl}^-$ entering the cell is equivalent to positive charge leaving.',
        '$V_m$ moves down toward $E_{\\text{Cl}} = -65\\,\\text{mV}$, away from threshold: an IPSP.',
        'Had $V_m$ been at $-65\\,\\text{mV}$ the current would be zero and the inhibition purely shunting.',
      ],
    },
    {
      id: 'q13',
      difficulty: 'hard',
      type: 'clinicalCase',
      scenario: 'Bicuculline, a GABA-A antagonist, is applied to a cortical slice. A distal excitatory synapse that previously gave only a small somatic EPSP now gives a much larger one, and the slice starts to fire synchronised bursts.',
      prompt: 'Which mechanism explains both observations?',
      options: [
        { text: 'Lost GABA-A shunting near the soma and lost feedforward and feedback inhibition', feedback: 'Correct. Both effects follow from removing the GABA-A $\\text{Cl}^-$ conductance.' },
        { text: 'Blocked GABA-B receptors, so the slow $\\text{K}^+$ inhibition toward $E_{\\text{K}}$ is lost', feedback: 'Bicuculline is the GABA-A antagonist; phaclofen blocks GABA-B.' },
        { text: 'More glutamate release, as the terminals lose their GABA-A autoreceptors', feedback: 'Release is unchanged; the postsynaptic shunt is what is lost.' },
        { text: 'Faster interneuron firing, as their own GABA-A input is blocked as well', feedback: 'Even if interneurons fire more, their GABA-A synapses on the pyramidal cell are blocked.' },
      ],
      correct: 0,
      modelAnswer: [
        'Key findings: a distal EPSP grows at the soma, and the network starts bursting, after GABA-A receptors are blocked.',
        'GABA-A receptors are $\\text{Cl}^-$ channels. Normally their conductance between the dendrite and the soma shunts dendritic EPSPs on their way to the hillock.',
        'Blocking them removes the shunt, so the same distal input gives a larger somatic EPSP (a longer effective length constant).',
        'Interneurons normally limit pyramidal firing through feedforward and feedback inhibition. Without GABA-A transmission the balance tips to excitation and the network fires synchronised, seizure-like bursts: too little inhibition.',
      ],
    },
    {
      id: 'q19',
      difficulty: 'hard',
      type: 'clinicalCase',
      scenario: 'Two drugs are tested on cortical neurons. Drug X does nothing on its own, but when GABA is released it makes each fast IPSP larger. Drug Y slowly hyperpolarizes the neurons toward $-80\\,\\text{mV}$ even when no GABA is released, and phaclofen abolishes its effect.',
      prompt: 'Which receptor does drug Y act on, and how does that receptor inhibit?',
      options: [
        { text: 'GABA-A, as an agonist; the receptor opens its own $\\text{Cl}^-$ pore', feedback: 'GABA-A drives $V_m$ toward $E_{\\text{Cl}}$, about $-65\\,\\text{mV}$, quickly, and phaclofen does not block it.' },
        { text: 'GABA-A, at the benzodiazepine site; openings become more frequent', feedback: 'That describes drug X: no effect alone, larger IPSPs when GABA is released.' },
        { text: 'GABA-B, as an antagonist; a G-protein closes $\\text{K}^+$ channels', feedback: 'An antagonist would have no effect without GABA, and closing $\\text{K}^+$ channels depolarizes.' },
        { text: 'GABA-B, as an agonist; a G-protein opens $\\text{K}^+$ channels', feedback: 'Correct. Slow inhibition toward $E_{\\text{K}}$, blocked by the GABA-B antagonist phaclofen.' },
      ],
      correct: 3,
      modelAnswer: [
        'Key findings: drug Y acts without GABA release, slowly, toward $-80\\,\\text{mV}$, and phaclofen blocks it.',
        '$-80\\,\\text{mV}$ is $E_{\\text{K}}$, so $\\text{K}^+$ channels are opening. A slow onset points to a G-protein, not a transmitter-gated channel. Phaclofen is the GABA-B antagonist in Table 6.1.',
        'GABA-B receptors are G-protein-coupled: the G-protein opens $\\text{K}^+$ channels directly (the shortcut pathway), giving slow, long-lasting inhibition toward $E_{\\text{K}}$.',
        'Answer: drug Y is a GABA-B agonist, such as baclofen. Drug X behaves like a benzodiazepine at the GABA-A receptor: it only enhances the response to released GABA.',
      ],
    },
    {
      id: 'q20',
      difficulty: 'hard',
      type: 'clinicalCase',
      scenario: 'Glutamate is released onto a neuron in normal extracellular $\\text{Mg}^{2+}$. With the neuron held at $-65\\,\\text{mV}$, release gives a fast inward current that AP5 does not change. At $-30\\,\\text{mV}$ the same release gives the fast current plus a slow, long-lasting one, and AP5 removes only the slow part.',
      prompt: 'Name the receptor that carries the slow current.',
      accept: ['NMDA receptor', 'NMDA receptors', 'NMDA', 'NMDA-type glutamate receptor', 'N-methyl-D-aspartate receptor'],
      answerLabel: 'Receptor:',
      modelAnswer: [
        'Key findings: the slow current appears only at $-30\\,\\text{mV}$, and AP5 removes it.',
        'AP5 is the NMDA receptor antagonist in Table 6.1. The fast current it leaves untouched is the AMPA current (blocked by CNQX), present at both voltages.',
        'At $-65\\,\\text{mV}$ glutamate binds the NMDA receptor, but $\\text{Mg}^{2+}$ plugs the open pore, so little current flows. Depolarization to $-30\\,\\text{mV}$ expels the $\\text{Mg}^{2+}$, and $\\text{Na}^+$ and $\\text{Ca}^{2+}$ enter.',
        'Answer: the NMDA receptor. Its current is slow, lasting tens to hundreds of ms, and needs glutamate plus depolarization at once: a coincidence detector whose $\\text{Ca}^{2+}$ entry can drive lasting change.',
      ],
    },
    {
      id: 'q15',
      difficulty: 'hard',
      type: 'mc',
      prompt: 'Two excitatory synapses each produce a $4\\,\\text{mV}$ EPSP at the soma of a neuron with threshold $10\\,\\text{mV}$ above rest. They fire together and the neuron does not spike; the same two fire together while a VIP interneuron is active and the neuron does spike. Which explanation fits the circuit on slide 48?',
      options: [
        { text: 'VIP cells excited the pyramidal cell directly and added a third EPSP to the sum', feedback: 'VIP cells are GABAergic; they inhibit.' },
        { text: 'VIP cells were coupled to the pyramidal cell by gap junctions and passed current', feedback: 'Gap junctions on the slide join interneurons of the same class, not VIP cells to pyramidal cells.' },
        { text: 'VIP cells made the two inputs fire in quick succession, so they summed in time', feedback: 'Both times the inputs fired together; what changed was the inhibition.' },
        { text: 'VIP cells inhibited SOM cells, which stopped shunting the pyramidal dendrites', feedback: 'Correct. Disinhibition raised the effective EPSP size.' },
      ],
      correct: 3,
      modelAnswer: [
        'Two $4\\,\\text{mV}$ EPSPs summing spatially give at most $8\\,\\text{mV}$, below the $10\\,\\text{mV}$ threshold, and any tonic SOM inhibition on the dendrites shunts them further.',
        'VIP interneurons preferentially inhibit SOM interneurons. When VIP is active, SOM stops inhibiting the pyramidal dendrites: disinhibition. The membrane resistance and length constant of the dendrites rise, the EPSPs arrive at the hillock larger, and their sum now crosses threshold.',
        'The net effect of two inhibitory synapses in series is excitation of the pyramidal cell.',
      ],
    },
    {
      id: 'q11',
      difficulty: 'hard',
      type: 'essay',
      prompt: 'Compare chemical and electrical synapses in structure, signal route, delay and direction, and explain why chemical transmission, unlike electrical, can be modulated. Give two points in the chemical pathway where modulation acts.',
      points: 6,
      markScheme: [
        { points: 1, text: 'Structure: electrical synapse = gap junction channels (connexons of six connexins, $3.5\\,\\text{nm}$ gap) joining the cytoplasms; chemical synapse = vesicles, active zone, 20 to $50\\,\\text{nm}$ cleft, postsynaptic receptors.' },
        { points: 1, text: 'Signal route: electrical passes ionic current directly; chemical converts the spike into $\\text{Ca}^{2+}$ entry, transmitter release, diffusion, receptor binding and back into an electrical response.' },
        { points: 1, text: 'Delay: electrical almost none; chemical about 0.5 to $1\\,\\text{ms}$ because of the intervening steps.' },
        { points: 1, text: 'Direction: most electrical synapses are bidirectional (cells electrically coupled); chemical synapses transmit only from presynaptic to postsynaptic cell.' },
        { points: 1, text: 'Why modulation is possible: every chemical step is a protein or reaction that can be changed (release probability, receptor number and type, G-protein cascades), whereas a gap junction just passes current of fixed sign and small size.' },
        { points: 1, text: 'Two concrete modulation points, for example autoreceptors reducing release, drugs at GABA-A modulatory sites, or the NE beta-receptor cascade closing $\\text{K}^+$ channels and lengthening the dendritic length constant.' },
      ],
      modelAnswer: [
        'An electrical synapse is a gap junction: plaques of channels, each made of two connexons of six connexins, spanning a $3.5\\,\\text{nm}$ gap and joining the two cytoplasms. A chemical synapse has a presynaptic terminal with vesicles and active zones, a 20 to $50\\,\\text{nm}$ cleft, and a postsynaptic density with receptors.',
        'At the electrical synapse ionic current from the spike in cell 1 flows straight into cell 2 and produces a small electrical PSP of about $1\\,\\text{mV}$. At the chemical synapse the spike opens $\\text{Ca}^{2+}$ channels, $\\text{Ca}^{2+}$ triggers SNARE-mediated exocytosis, transmitter diffuses across the cleft and binds receptors, which open channels or activate G-proteins.',
        'Those steps cost time: chemical transmission has a synaptic delay of roughly 0.5 to $1\\,\\text{ms}$, the electrical synapse almost none.',
        'Most gap junctions pass current equally both ways, so coupled cells influence each other. Chemical transmission is one-way, from the terminal with vesicles to the cell with receptors.',
        'Because each chemical step is a molecular process, each can be regulated: how much transmitter is released, how it is removed, which receptor is present, and what the receptor does. A gap junction offers no such handle beyond how many channels are open.',
        'Examples: presynaptic autoreceptors act through G-proteins to reduce release when transmitter builds up; benzodiazepines and barbiturates enhance the GABA-A response at their own sites; and norepinephrine at beta receptors raises cAMP, activates PKA, closes dendritic $\\text{K}^+$ channels and so makes distant EPSPs more effective, an effect that outlasts the transmitter.',
      ],
    },
  ],
};
