// Lecture 2: the neuronal membrane at rest and the action potential.
// Scope: docs/scope/L02.md. Every section and question traces to a line
// in that file. Figures are slide crops in src/assets/figures/L02
// (sources in CREDITS.md) shown through the image-hotspots widget, plus
// five d3 demos (Nernst, GHK, action potential, voltage clamp,
// conduction) and one d3 waveform figure.

import { apWaveformFigure } from './figures/membrane.js';

const fig = (name) => new URL(`../assets/figures/L02/${name}.webp`, import.meta.url).href;

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

const BILAYER_REGIONS = [
  { id: 'outside', label: 'Extracellular fluid', body: 'Salty water outside the cell. Na+, Cl- and Ca2+ are more concentrated here.', shape: 'rect', x: 30, y: 8, w: 50, h: 10, mx: 30, my: 8 },
  { id: 'heads', label: 'Polar heads', body: 'Phosphate-containing heads. Hydrophilic, so they face the water on both sides.', shape: 'rect', x: 30, y: 28, w: 54, h: 20, mx: 14, my: 24 },
  { id: 'tails', label: 'Nonpolar tails', body: 'Hydrocarbon chains. Hydrophobic, so they hide inside the bilayer and block water-soluble ions.', shape: 'rect', x: 30, y: 57, w: 54, h: 26, mx: 14, my: 60 },
  { id: 'inside', label: 'Cytosol', body: 'The fluid inside the cell. K+ is concentrated here, with large anions that cannot leave.', shape: 'rect', x: 30, y: 92, w: 50, h: 10, mx: 30, my: 92 },
  { id: 'head-zoom', label: 'One phospholipid head', body: 'Space-filling model. The phosphate group carries charge, which is why the head loves water.', x: 79, y: 7, w: 8, h: 12, mx: 79, my: 7 },
  { id: 'tail-zoom', label: 'One hydrocarbon tail', body: 'Carbon and hydrogen only, no charge. Two tails per phospholipid.', x: 78, y: 32, w: 7, h: 24, mx: 78, my: 32 },
];

const CHANNEL_REGIONS = [
  { id: 'extracellular', label: 'Extracellular fluid', body: 'The mouth of the pore opens here.', shape: 'rect', x: 40, y: 8, w: 30, h: 8, mx: 40, my: 8, side: 'left' },
  { id: 'subunit', label: 'Polypeptide subunit', body: 'One of five subunits. Four to six similar proteins assemble around a central pore.', x: 58, y: 28, w: 16, h: 18, mx: 60, my: 28 },
  { id: 'pore', label: 'Central pore', body: 'The water-filled path between the subunits. Its diameter and the R groups lining it set the ion selectivity.', x: 42, y: 52, w: 12, h: 22, mx: 40, my: 55, side: 'left' },
  { id: 'hydrophobic', label: 'Hydrophobic surface', body: 'The shaded band sits inside the bilayer among the lipid tails. Nonpolar R groups face the lipid.', shape: 'rect', x: 40, y: 66, w: 40, h: 10, mx: 26, my: 70, side: 'left' },
  { id: 'bilayer', label: 'Phospholipid bilayer', body: 'Heads outward, tails inward, about 5 nm thick.', shape: 'rect', x: 82, y: 76, w: 24, h: 24, mx: 84, my: 82 },
  { id: 'cytosol', label: 'Cytosol', body: 'The inner mouth of the pore.', shape: 'rect', x: 40, y: 93, w: 30, h: 8, mx: 40, my: 93, side: 'left' },
];

const MEASURE_REGIONS = [
  { id: 'microelectrode', label: 'Microelectrode', body: 'A fine glass tube filled with salt solution. Its tip, about 0.5 um across, is inside the cell.', shape: 'line', x: 41, y: 50, x2: 58, y2: 32, mx: 52, my: 39 },
  { id: 'ground', label: 'Ground', body: 'A wire in the extracellular fluid, defined as 0 mV.', x: 63, y: 36, w: 6, h: 6, mx: 63, my: 37 },
  { id: 'voltmeter', label: 'Voltmeter', body: 'Reads the potential difference between the electrode tip and ground: about -65 mV at rest.', shape: 'rect', x: 86, y: 27, w: 22, h: 12, mx: 86, my: 33 },
  { id: 'soma', label: 'Soma', body: 'The electrode has penetrated the membrane of the cell body.', x: 36, y: 57, w: 10, h: 10, mx: 33, my: 58, side: 'left' },
  { id: 'negative', label: 'Inside: negative charge', body: 'Excess negative charge lines the inner face of the membrane.', shape: 'rect', x: 69, y: 88, w: 8, h: 22, mx: 69, my: 88, side: 'bottom' },
  { id: 'positive', label: 'Outside: positive charge', body: 'Excess positive charge lines the outer face. The bulk fluid on both sides stays neutral.', shape: 'rect', x: 87, y: 88, w: 8, h: 22, mx: 87, my: 88, side: 'bottom' },
  { id: 'membrane', label: 'Membrane', body: 'The bilayer between the two charge layers. Storing separated charge this way is membrane capacitance.', shape: 'rect', x: 78, y: 88, w: 6, h: 22, mx: 78, my: 78, side: 'right' },
];

const KEQ_REGIONS = [
  { id: 'a', label: '(a) Impermeable membrane', body: 'K+ is 20 times more concentrated inside, but no ion can cross, so both sides stay neutral and Vm = 0 mV.', shape: 'rect', x: 17, y: 55, w: 30, h: 80, mx: 17, my: 20, side: 'top' },
  { id: 'b', label: '(b) K+ channel inserted', body: 'K+ leaves down its concentration gradient. The anion A- stays behind, so the inside starts to go negative.', x: 50, y: 42, w: 10, h: 12, mx: 50, my: 42, side: 'top' },
  { id: 'c', label: '(c) Equilibrium', body: 'The negative inside now pulls K+ back as hard as diffusion pushes it out. No net K+ current: Vm = EK, about -80 mV.', shape: 'rect', x: 83, y: 55, w: 30, h: 80, mx: 84, my: 20, side: 'top' },
  { id: 'layers', label: 'Charge at the membrane', body: 'The separated charge sits in thin layers on the two membrane faces, not spread through the fluid.', shape: 'rect', x: 84, y: 60, w: 10, h: 70, mx: 82, my: 80, side: 'bottom' },
];

const PUMP_REGIONS = [
  { id: 'pump', label: 'Sodium-potassium pump', body: 'A membrane enzyme that breaks down ATP and exchanges internal Na+ for external K+.', x: 24, y: 48, w: 30, h: 46, mx: 12, my: 35, side: 'left' },
  { id: 'na', label: 'Na+ out', body: 'Three Na+ bind inside and are pushed out against their concentration gradient.', shape: 'rect', x: 23, y: 55, w: 8, h: 30, mx: 20, my: 62, side: 'left' },
  { id: 'k', label: 'K+ in', body: 'Two K+ bind outside and are carried in. Each cycle moves one net positive charge out.', shape: 'rect', x: 31, y: 48, w: 8, h: 26, mx: 31, my: 42, side: 'top' },
  { id: 'atp', label: 'ATP to ADP', body: 'The chemical energy of ATP drives the pump. The pumps use up to 70 percent of the ATP in the brain.', x: 47, y: 72, w: 10, h: 12, mx: 47, my: 72, side: 'bottom' },
  { id: 'membrane', label: 'Membrane', body: 'The pump spans the bilayer. Most of the membrane still has no path for ions.', shape: 'rect', x: 92, y: 48, w: 8, h: 14, mx: 95, my: 48 },
  { id: 'cytosol', label: 'Cytosol', body: 'Below the membrane. Ends up with high K+ and low Na+.', shape: 'rect', x: 60, y: 92, w: 20, h: 8, mx: 60, my: 92, side: 'bottom' },
];

const RECORDING_REGIONS = [
  { id: 'intracellular', label: 'Intracellular electrode', body: 'Impales the neuron. Measures the membrane potential relative to ground: a spike of about 100 mV.', shape: 'line', x: 24, y: 58, x2: 34, y2: 38, mx: 30, my: 44, side: 'left' },
  { id: 'extracellular', label: 'Extracellular electrode', body: 'Sits next to the membrane. Records the currents of a passing spike as a brief alternating voltage of tens of microvolts.', shape: 'line', x: 26, y: 66, x2: 38, y2: 66, mx: 33, my: 67, side: 'left' },
  { id: 'amplifier', label: 'Amplifier and ground', body: 'Compares the electrode with a wire in the bath (ground) and boosts the difference.', x: 41, y: 26, w: 8, h: 12, mx: 41, my: 26, side: 'top' },
  { id: 'mv', label: 'Intracellular trace', body: 'Vertical scale in millivolts: from about -65 mV up past 0 mV and back.', shape: 'rect', x: 73, y: 28, w: 22, h: 34, mx: 72, my: 20, side: 'top' },
  { id: 'uv', label: 'Extracellular trace', body: 'Vertical scale in microvolts, a thousand times smaller, and biphasic: positive then negative.', shape: 'rect', x: 73, y: 76, w: 22, h: 34, mx: 72, my: 90, side: 'bottom' },
];

const INJECT_REGIONS = [
  { id: 'stimulating', label: 'Stimulating electrode', body: 'Injects positive charge into the axon hillock. The experimenter sets its direction, strength and duration.', shape: 'line', x: 9, y: 41, x2: 18, y2: 63, mx: 12, my: 48, side: 'left' },
  { id: 'recording', label: 'Recording electrode', body: 'Measures the membrane potential relative to ground while the current flows.', shape: 'line', x: 31, y: 36, x2: 23, y2: 63, mx: 28, my: 46, side: 'top' },
  { id: 'current', label: 'Injected current', body: 'The top trace: zero, then a step of steady depolarizing current.', shape: 'rect', x: 86, y: 14, w: 22, h: 6, mx: 78, my: 14, side: 'top' },
  { id: 'rest', label: 'Resting potential', body: 'The bottom trace sits at -65 mV until the current starts.', shape: 'rect', x: 66, y: 80, w: 14, h: 5, mx: 66, my: 80, side: 'bottom' },
  { id: 'spikes', label: 'Train of action potentials', body: 'Once the membrane is depolarized past threshold, it fires spike after spike for as long as the current lasts.', shape: 'rect', x: 88, y: 60, w: 22, h: 30, mx: 88, my: 50, side: 'right' },
];

const SODIUM_CHANNEL_REGIONS = [
  { id: 'domain', label: 'One domain: helices S1 to S6', body: 'The channel is a single polypeptide with four such domains (I to IV). Each domain has six membrane-spanning alpha helices.', shape: 'rect', x: 40, y: 34, w: 74, h: 26, mx: 8, my: 34, side: 'left' },
  { id: 's4', label: 'S4: the voltage sensor', body: 'A helix with positively charged amino acids spaced along it. Depolarization pushes it and twists the protein.', shape: 'rect', x: 41, y: 36, w: 8, h: 24, mx: 41, my: 40, side: 'left' },
  { id: 'pore-loop', label: 'Pore loop', body: 'The red hairpin between S5 and S6. Four pore loops, one per domain, line the narrowest part of the pore.', x: 63, y: 30, w: 10, h: 24, mx: 63, my: 30 },
  { id: 'filter', label: 'Selectivity filter', body: 'Built from the four pore loops. Lets partially hydrated Na+ through about twelve times more readily than K+.', x: 57, y: 72, w: 10, h: 10, mx: 60, my: 72 },
  { id: 'sensors', label: 'Voltage sensors in the assembled channel', body: 'The charged S4 helices of the four domains sit in the membrane around the pore.', shape: 'rect', x: 48, y: 84, w: 4, h: 12, mx: 48, my: 85, side: 'left' },
  { id: 'gate', label: 'Gate', body: 'The part that opens or closes the pore. The filter chooses the ion; the gate decides whether anything passes.', x: 62, y: 93, w: 14, h: 6, mx: 62, my: 94, side: 'right' },
  { id: 'assembled', label: 'Assembled channel', body: 'The four domains clump together with the pore between them. Closed at rest, open at about -40 mV.', x: 20, y: 80, w: 22, h: 30, mx: 18, my: 90, side: 'left' },
];

const GATING_REGIONS = [
  { id: 'closed', label: 'Closed pore at rest', body: 'At -65 mV the pore is shut. The S4 sensors sit low in the membrane.', x: 22, y: 45, w: 20, h: 36, mx: 18, my: 55, side: 'left' },
  { id: 'sensor-rest', label: 'Voltage sensor at rest', body: 'Positive charges on S4 are held toward the negative inside.', shape: 'rect', x: 12.5, y: 55, w: 4, h: 24, mx: 12.5, my: 55, side: 'left' },
  { id: 'sensor-moved', label: 'Voltage sensor moved', body: 'Depolarization to -40 mV pushes S4 outward; the arrows show the movement.', shape: 'rect', x: 64.5, y: 42, w: 4, h: 24, mx: 64.5, my: 42, side: 'top' },
  { id: 'open', label: 'Open pore', body: 'The twist of the sensors opens the gate and Na+ can pass down its electrochemical gradient.', x: 72, y: 60, w: 12, h: 30, mx: 72, my: 68, side: 'right' },
  { id: 'step', label: 'Depolarization -65 to -40 mV', body: 'The voltage change that opens the channel. The pore does not care where the change came from.', shape: 'line', x: 28, y: 90, x2: 64, y2: 90, mx: 46, my: 90, side: 'bottom' },
];

const PATCH_REGIONS = [
  { id: 'pipette', label: 'Patch pipette', body: 'A fire-polished glass pipette, tip 1 to 5 um, lowered onto the membrane.', shape: 'line', x: 8, y: 6, x2: 12.5, y2: 32, mx: 10, my: 18, side: 'left' },
  { id: 'neuron', label: 'Neuron', body: 'The recording is made from a tiny patch of the cell membrane, not the whole cell.', x: 14, y: 40, w: 8, h: 14, mx: 14, my: 40, side: 'left' },
  { id: 'seal', label: 'Gigaohm seal', body: 'Suction pulls the membrane into the tip and forms a seal of about 10^9 ohm. Ions can then only pass through the channels in the patch.', x: 43, y: 79, w: 6, h: 8, mx: 43, my: 79, side: 'bottom' },
  { id: 'tip', label: 'Pipette tip', body: 'The patch under the tip may hold only one channel. It can be torn away from the cell and clamped at any voltage.', shape: 'line', x: 47, y: 42, x2: 52, y2: 65, mx: 49, my: 50, side: 'top' },
  { id: 'closed', label: 'Sodium channel, closed', body: 'At -65 mV the channel is shut and no current flows.', x: 67, y: 63, w: 6, h: 8, mx: 67, my: 63, side: 'top' },
  { id: 'open', label: 'Sodium channel, open', body: 'A step to -40 mV opens it and Na+ flows in as a discrete current step.', x: 89, y: 63, w: 6, h: 8, mx: 89, my: 63, side: 'top' },
  { id: 'flow', label: 'Na+ entering', body: 'The arrow marks the inward current through the single open channel.', shape: 'line', x: 89, y: 48, x2: 89.5, y2: 72, mx: 89.5, my: 72, side: 'bottom' },
];

const RECORD_REGIONS = [
  { id: 'step', label: 'Voltage step', body: 'The patch is clamped at -65 mV, stepped to -40 mV for 5 ms, then returned.', shape: 'rect', x: 60, y: 17, w: 76, h: 12, mx: 45, my: 13, side: 'top' },
  { id: 'closed', label: 'Channel closed', body: 'Flat trace at -65 mV: no current through the channel.', shape: 'rect', x: 22, y: 33, w: 8, h: 6, mx: 22, my: 33, side: 'left' },
  { id: 'open', label: 'Channel open', body: 'A downward step of inward current, shortly after the depolarization, lasting less than 1 ms. The step height is the single-channel current.', x: 29, y: 41, w: 6, h: 8, mx: 29, my: 42, side: 'left' },
  { id: 'inactivated', label: 'Inactivated', body: 'The channel closes again although the membrane is still at -40 mV, and stays shut for the rest of the step.', shape: 'rect', x: 62, y: 34, w: 46, h: 6, mx: 62, my: 34, side: 'top' },
  { id: 'variable', label: 'Three channels, three delays', body: 'Each trace is a different channel. They open after slightly different delays because opening is probabilistic.', shape: 'line', x: 29, y: 40, x2: 37, y2: 74, mx: 38, my: 60, side: 'left' },
  { id: 'deinactivate', label: 'Return to -65 mV', body: 'Only when the voltage goes back down can the channel deinactivate and become available again.', x: 87, y: 20, w: 6, h: 10, mx: 87, my: 22, side: 'right' },
];

const MODEL_REGIONS = [
  { id: 'closed', label: '1 Closed', body: 'At rest. The pore is shut, the inactivation ball hangs free.', x: 15, y: 50, w: 16, h: 50, mx: 15, my: 42, side: 'left' },
  { id: 'open', label: '2 Open', body: 'Depolarization opens the gate. Na+ enters (arrow) for at most about 1 ms.', x: 39, y: 50, w: 16, h: 50, mx: 36, my: 42, side: 'top' },
  { id: 'ball', label: 'Inactivation particle', body: 'A globular part of the protein on a chain. It swings up and plugs the open pore.', x: 62, y: 58, w: 8, h: 14, mx: 62, my: 58, side: 'bottom' },
  { id: 'inactivated', label: '3 Inactivated', body: 'The pore is plugged. No current, even though the membrane is still depolarized.', x: 63, y: 40, w: 16, h: 30, mx: 66, my: 32, side: 'top' },
  { id: 'deinactivated', label: '4 Deinactivation', body: 'When the membrane repolarizes the ball swings away and the gate closes: the channel is available again.', x: 86, y: 50, w: 16, h: 50, mx: 86, my: 42, side: 'right' },
];

const INITIATION_REGIONS = [
  { id: 'dendrites', label: 'Dendrites', body: 'Receive synaptic input. Few voltage-gated Na+ channels, so they integrate rather than fire.', x: 33, y: 22, w: 26, h: 40, mx: 33, my: 15, side: 'top' },
  { id: 'soma', label: 'Soma', body: 'Sums the dendritic depolarization and passes it to the hillock.', x: 32, y: 57, w: 10, h: 12, mx: 27, my: 56, side: 'left' },
  { id: 'hillock', label: 'Spike-initiation zone: axon hillock', body: 'Red: the membrane with a high density of voltage-gated Na+ channels. Lowest threshold in the cell, so the spike starts here.', x: 33, y: 67, w: 6, h: 8, mx: 32, my: 67, side: 'left' },
  { id: 'axon', label: 'Axon', body: 'Also rich in Na+ channels along its whole length, so the spike regenerates as it travels toward the terminals.', shape: 'line', x: 33, y: 78, x2: 26, y2: 95, mx: 30, my: 88, side: 'left' },
  { id: 'sensory-ending', label: 'Spike-initiation zone: sensory nerve ending', body: 'In a primary sensory neuron the spike starts at the peripheral ending, where the receptor potential depolarizes the membrane.', x: 62, y: 78, w: 10, h: 6, mx: 62, my: 79, side: 'bottom' },
  { id: 'sensory-soma', label: 'Sensory neuron soma', body: 'Sits to one side of the axon and does not lie on the path of the spike.', x: 82, y: 60, w: 8, h: 12, mx: 82, my: 56, side: 'top' },
  { id: 'to-cns', label: 'Direction of travel', body: 'The arrows show the normal direction: from the ending toward the central nervous system.', shape: 'line', x: 90, y: 81, x2: 96, y2: 81, mx: 93, my: 82, side: 'right' },
];

const MYELIN_REGIONS = [
  { id: 'hillock', label: 'Axon hillock', body: 'Where the axon leaves the soma; the spike-initiation zone.', x: 6, y: 66, w: 8, h: 12, mx: 6, my: 66, side: 'left' },
  { id: 'myelin', label: 'Myelin sheath', body: 'Many layers of glial membrane wrapped round a segment of axon. Insulates it and stops current leaking out.', x: 28, y: 82, w: 14, h: 14, mx: 28, my: 82, side: 'bottom' },
  { id: 'node', label: 'Node of Ranvier', body: 'The bare gap between two sheaths, 0.2 to 2.0 mm apart. Voltage-gated Na+ channels are concentrated here.', x: 35, y: 83, w: 3, h: 6, mx: 35, my: 83, side: 'top' },
  { id: 'internode', label: 'Internode', body: 'The insulated stretch between two nodes. Current spreads along the inside of the axon here without regenerating.', shape: 'line', x: 35, y: 88, x2: 52, y2: 88, mx: 44, my: 90, side: 'bottom' },
  { id: 'node2', label: 'Next node', body: 'Where the spike is regenerated next. The impulse skips from node to node: saltatory conduction.', x: 52, y: 83, w: 3, h: 6, mx: 52, my: 83, side: 'top' },
  { id: 'terminals', label: 'Axon terminals', body: 'The spike arrives here and triggers transmitter release.', x: 86, y: 18, w: 22, h: 30, mx: 88, my: 14, side: 'right' },
];

const AP_TEXT = {
  rest: { label: 'Resting potential', body: 'About -65 mV before the stimulus. gK is much larger than gNa.' },
  threshold: { label: 'Threshold', body: 'The critical depolarization, about -55 mV here, at which enough voltage-gated Na+ channels open for Na+ permeability to win.' },
  rising: { label: 'Rising phase', body: 'Na+ rushes in through the open channels and Vm shoots toward ENa.' },
  overshoot: { label: 'Overshoot', body: 'The peak above 0 mV. Vm approaches ENa but never reaches it.' },
  falling: { label: 'Falling phase', body: 'Na+ channels inactivate and the delayed K+ channels open. K+ leaves and Vm heads back toward EK.' },
  undershoot: { label: 'Undershoot', body: 'The extra K+ conductance holds Vm below rest, near EK, until the voltage-gated K+ channels close.' },
};
const AP_WAVEFORM = apWaveformFigure(AP_TEXT);

// ---------------------------------------------------------------------

export default {
  meta: {
    id: 'L02',
    number: 2,
    title: 'The neuronal membrane at rest and the action potential',
    chapters: [3, 4],
    pages: [
      { chapter: 3, from: 57, to: 78 },
      { chapter: 4, from: 83, to: 105 },
    ],
    lectureDate: '2026-09-09',
    examDate: '2026-09-25',
  },

  objectives: [
    'Explain how the phospholipid bilayer, ion channels, and ion pumps make neuronal electrical signaling possible.',
    'Predict the direction and relative magnitude of an ionic current from the membrane potential, the ion\'s equilibrium potential, and the channel conductance.',
    'Explain the different questions answered by the Nernst equation and the Goldman-Hodgkin-Katz equation.',
    'Explain the action potential waveform in terms of Na+ and K+ channel activity and the resulting ionic currents.',
    'Compare membrane-potential recording with an intracellular microelectrode, voltage-clamp recording, and single-channel patch-clamp recording in terms of what each method measures and controls.',
    'Explain how local currents, the absolute and relative refractory periods, axon diameter, and myelin affect action potential propagation.',
  ],

  prerequisites: [
    { text: 'The main parts of a neuron: soma, dendrites, axon, axon hillock, axon terminal.', lectureId: 'L01', sectionId: 'prototypical-neuron' },
    { text: 'The difference between intracellular fluid (cytosol) and extracellular fluid.' },
    { text: 'The sign of an ion\'s charge: Na+, K+ and Ca2+ are cations, Cl- is an anion.' },
    { text: 'Myelin, oligodendroglia, Schwann cells and nodes of Ranvier from the glia section.', lectureId: 'L01', sectionId: 'glia' },
  ],

  sections: [
    // 1 -----------------------------------------------------------------
    {
      id: 'membrane',
      title: 'Membrane and protein foundations',
      keyTerms: ['membrane potential', 'phospholipid bilayer', 'hydrophilic', 'hydrophobic', 'peptide bond', 'primary structure', 'secondary structure', 'tertiary structure', 'quaternary structure'],
      blocks: [
        { type: 'text', body: 'Brain tissue is water, ions (Na+, K+, Ca2+, Cl-), lipids and proteins. The membrane potential comes from how these four are arranged.' },
        { type: 'definition', term: 'Membrane potential', body: 'The voltage between the inside and the outside of the cell. At rest the inside of a neuron is negative, about -65 mV. This is the resting membrane potential.' },
        { type: 'definition', term: 'Phospholipid bilayer', body: 'Each phospholipid has a polar head with phosphate (hydrophilic) and two nonpolar hydrocarbon tails (hydrophobic). In water they form a double layer with the tails hidden inside. It blocks water-soluble ions.' },
        figureBlock(
          hotspots('bilayer', 1183 / 600, 'Cross section of the phospholipid bilayer with the outside of the cell above and the inside below, and a molecular zoom of the heads and tails.', BILAYER_REGIONS, { gutter: 'sides' }),
          'The bilayer from the slide (textbook Figure 3.3). Heads face the water on both sides, tails meet in the middle. The box marks the zoomed part.',
          'Left: a cross section of a membrane, two rows of round heads with tails pointing inward, outside of the cell above and inside below. Right: a molecular zoom showing charged heads and long hydrocarbon tails.'
        ),
        { type: 'steps', title: 'From gene to membrane protein', steps: [
          'Ribosomes join amino acids with peptide bonds into a polypeptide. There are 20 amino acids; their R groups differ and are hydrophilic or hydrophobic.',
          'Free ribosomes make cytosolic proteins. Ribosomes on the rough ER make membrane proteins, which the Golgi apparatus sorts and sends to the axon or dendrites.',
          'The chain folds. Primary structure is the sequence; secondary structure is local folds such as the alpha helix; tertiary structure is the 3D shape of one chain; quaternary structure is several chains (subunits) joined.',
          'In a membrane protein the nonpolar regions sit in the lipid and the polar regions face the water or line a water-filled pore. Shape decides function.',
        ] },
        { type: 'whyItMatters', body: 'A change of a single amino acid in a channel can change its selectivity or gating and disrupt neuronal signaling. Mitochondria supply the ATP that the pumps below need.' },
      ],
      conceptQuiz: [
        {
          id: 'membrane-1',
          prompt: 'Why can an ion not simply diffuse through the phospholipid bilayer?',
          options: [
            { text: 'The hydrocarbon tails in the middle are hydrophobic and repel charged, water-soluble particles', feedback: 'Correct. Ions stay in water; the bilayer core has none.' },
            { text: 'The polar heads carry the same charge as every ion', feedback: 'Heads are polar, but they face the water; it is the nonpolar core that blocks ions.' },
            { text: 'The membrane is too thick', feedback: 'It is only about 5 nm thick. Thickness is not the barrier.' },
          ],
          correct: 0,
        },
        {
          id: 'membrane-2',
          prompt: 'Which level of protein structure is the alpha helix?',
          options: [
            { text: 'Primary', feedback: 'Primary structure is the amino acid sequence.' },
            { text: 'Secondary', feedback: 'Correct. A local coil of the chain.' },
            { text: 'Quaternary', feedback: 'Quaternary structure is several chains joined into one protein.' },
          ],
          correct: 1,
        },
        {
          id: 'membrane-3',
          prompt: 'Where are membrane proteins made?',
          options: [
            { text: 'On ribosomes attached to the rough ER', feedback: 'Correct. Free ribosomes make cytosolic proteins instead.' },
            { text: 'In the axon terminal', feedback: 'The terminal has no ribosomes; most proteins reach it by axonal transport.' },
            { text: 'In the Golgi apparatus', feedback: 'The Golgi sorts and ships finished proteins; it does not make them.' },
          ],
          correct: 0,
        },
      ],
    },

    // 2 -----------------------------------------------------------------
    {
      id: 'channels',
      title: 'Ion channels as gated pores',
      keyTerms: ['ion channel', 'ion selectivity', 'gating', 'selectivity filter', 'gate', 'hydration shell', 'ion pump'],
      blocks: [
        { type: 'definition', term: 'Ion channel', body: 'A membrane protein that forms a water-filled pore. Typically four to six similar subunits assemble around a central pore. When open, selected ions cross down their electrochemical gradient.' },
        figureBlock(
          hotspots('ion-channel', 663 / 752, 'A membrane ion channel with five polypeptide subunits around a central pore, crossing the phospholipid bilayer.', CHANNEL_REGIONS),
          'A membrane ion channel from the slide (textbook Figure 3.7). Five subunits form the pore; the shaded band is the hydrophobic surface that sits in the bilayer.',
          'A five-subunit channel protein embedded in a tilted bilayer. Extracellular fluid above, cytosol below; a pore runs through the middle of the protein.'
        ),
        {
          type: 'compare',
          title: 'Two properties of a channel',
          columns: ['What it decides', 'What sets it'],
          rows: [
            { label: 'Ion selectivity (selectivity filter)', cells: ['Which ion can pass', 'The diameter of the pore and the R groups lining it; how much of the hydration shell the ion must shed'] },
            { label: 'Gating (gate)', cells: ['Whether the pore is open or closed', 'The local environment: membrane voltage for a voltage-gated channel, a transmitter for a ligand-gated one'] },
          ],
        },
        { type: 'definition', term: 'Hydration shell', body: 'In water each ion is wrapped in oriented water molecules. Crossing the oily bilayer would mean losing that shell, which costs too much energy. A channel offers a water-filled path instead.' },
        { type: 'definition', term: 'Ion pump', body: 'A different kind of membrane protein. It uses the energy of ATP to move ions against their concentration gradients. Channels let ions flow; pumps build the gradients.' },
        { type: 'misconception', wrong: 'An open channel means ions are moving through it.', right: 'A channel is a bridge, not a push. Net movement also needs a force: a concentration gradient, an electrical field, or both.' },
      ],
      conceptQuiz: [
        {
          id: 'channels-1',
          prompt: 'Which part of a channel decides whether the pore is open?',
          options: [
            { text: 'The gate', feedback: 'Correct. The filter chooses the ion; the gate opens and closes.' },
            { text: 'The selectivity filter', feedback: 'The filter decides which ion fits, not whether the pore is open.' },
            { text: 'The hydration shell', feedback: 'That belongs to the ion, not the channel.' },
          ],
          correct: 0,
        },
        {
          id: 'channels-2',
          prompt: 'What is the main difference between an ion channel and an ion pump?',
          options: [
            { text: 'Channels let ions flow down their gradients; pumps use ATP to move them against their gradients', feedback: 'Correct.' },
            { text: 'Pumps are selective, channels are not', feedback: 'Channels are highly selective too.' },
            { text: 'Channels use ATP, pumps do not', feedback: 'The other way round.' },
          ],
          correct: 0,
        },
      ],
    },

    // 3 -----------------------------------------------------------------
    {
      id: 'gradients',
      title: 'Electrochemical gradients and ionic current',
      keyTerms: ['diffusion', 'concentration gradient', 'electrical current', 'voltage', 'conductance', 'resistance', 'Ohm\'s law', 'electrochemical gradient', 'driving force'],
      blocks: [
        { type: 'text', body: 'Two forces move ions through channels: diffusion and electricity. Together they form the electrochemical gradient.' },
        { type: 'definition', term: 'Diffusion', body: 'Random thermal motion spreads dissolved particles out, so there is net movement from high to low concentration, down the concentration gradient. Concentration c = n / V (moles per litre; 1 mM is 0.001 mol per litre).' },
        { type: 'definition', term: 'Electrical current', body: 'Ions are charged, so an electrical field moves them: cations toward the cathode, anions toward the anode. Current I (amperes) is defined as positive in the direction of cation movement.' },
        {
          type: 'compare',
          title: 'Two ways to drive an ion across a membrane',
          columns: ['Force', 'Needs'],
          rows: [
            { label: 'Diffusion', cells: ['A concentration difference', 'Channels permeable to the ion and a concentration gradient'] },
            { label: 'Electrical field', cells: ['A voltage across the membrane', 'Channels permeable to the ion (conductance) and a potential difference'] },
          ],
        },
        { type: 'definition', term: 'Ohm\'s law', body: 'I = g V. Voltage V (volts) is the force on a charge; conductance g (siemens) is how easily charge moves, the inverse of resistance R (ohms). With no open channels g = 0 and no current flows however large the voltage.' },
        { type: 'equation', title: 'Current carried by one ion', items: [
          { expression: 'I_ion = g_ion * (Vm - E_ion)', label: 'Ohm\'s law for a membrane. g_ion grows with the number of open channels; Vm - E_ion is the driving force.' },
        ], note: 'The current is zero when no channels are open (g = 0) or when Vm equals the ion\'s equilibrium potential (driving force zero). Current flows in the direction that takes Vm toward E_ion.' },
        { type: 'whyItMatters', body: 'Concentration and electrical forces can push an ion the same way or opposite ways. Where they exactly cancel is the ion\'s equilibrium potential, the subject of the next section.' },
      ],
      conceptQuiz: [
        {
          id: 'gradients-1',
          prompt: 'NaCl is at the same concentration on both sides of a pure lipid bilayer and a battery puts a large voltage across it. What current flows?',
          options: [
            { text: 'None, because there are no channels, so the conductance is zero', feedback: 'Correct. I = g V with g = 0.' },
            { text: 'A large current, because the voltage is large', feedback: 'Voltage alone is not enough; the ions need a path.' },
            { text: 'A small current by diffusion', feedback: 'Concentrations are equal, so diffusion gives no net movement either.' },
          ],
          correct: 0,
        },
        {
          id: 'gradients-2',
          prompt: 'What is the driving force on an ion?',
          options: [
            { text: 'Vm minus the ion\'s equilibrium potential', feedback: 'Correct. Zero at E_ion.' },
            { text: 'The number of open channels', feedback: 'That sets the conductance, not the force.' },
            { text: 'The concentration inside the cell', feedback: 'Concentrations enter through E_ion, but the force is the difference from Vm.' },
          ],
          correct: 0,
        },
      ],
    },

    // 4 -----------------------------------------------------------------
    {
      id: 'resting-potential',
      title: 'Resting membrane potential and the Nernst equation',
      keyTerms: ['microelectrode', 'equilibrium potential', 'membrane capacitance', 'Nernst equation'],
      blocks: [
        { type: 'definition', term: 'Measuring Vm', body: 'A microelectrode, a glass tube with a 0.5 um tip filled with salt solution, is pushed into the cell. A voltmeter reads its potential against a wire in the bath (ground, 0 mV). A typical neuron reads about -65 mV: the inside is 65 mV more negative than the outside.' },
        figureBlock(
          hotspots('measure-vm', 484 / 509, 'A pyramidal neuron impaled by a microelectrode connected to a voltmeter reading -65 mV, with a zoom on the charge layers at the membrane.', MEASURE_REGIONS, { gutter: 'all' }),
          'Measuring the resting membrane potential (textbook Figure 3.11). The enlargement shows where the separated charge sits.',
          'A neuron with a microelectrode entering the soma, a ground symbol and a voltmeter reading -65 mV. Inset: the membrane with negative charges lined up inside and positive charges outside.'
        ),
        { type: 'steps', title: 'How selective permeability creates a voltage (K+ example)', steps: [
          'Start with K+ twenty times more concentrated inside, balanced by an impermeable anion A-. With no channels nothing moves and Vm = 0 mV.',
          'Insert K+ channels. K+ diffuses out down its gradient; A- is left behind, so the inside goes negative.',
          'The negative inside pulls K+ back. When the electrical pull equals the diffusional push there is no net K+ movement. This voltage is the K+ equilibrium potential, EK, about -80 mV.',
          'The same logic with Na+ (concentrated outside) gives a positive inside at equilibrium: ENa is positive.',
        ] },
        figureBlock(
          hotspots('k-equilibrium', 979 / 426, 'Three boxes: an impermeable membrane, a K+ channel letting K+ out, and the equilibrium with charge layers on the membrane.', KEQ_REGIONS, { quiz: false, layout: 'stack', gutter: 'ends' }),
          'Establishing equilibrium across a K+-permeable membrane (textbook Figure 3.12). The letter sizes show the concentrations.',
          'Three panels labelled a, b and c. In a, K+ and A- are large inside and small outside with a solid membrane. In b a channel lets K+ cross to the right. In c minus signs line the inside face and plus signs the outside face, with arrows both ways through the channel.'
        ),
        { type: 'steps', title: 'Four points from the K+ example (slide 16)', steps: [
          { title: 'Tiny concentration change, large voltage.', body: 'Taking a 50 um cell from 0 to -80 mV moves so little K+ that 100 mM becomes 99.99999 mM.' },
          { title: 'Charge sits at the membrane surfaces.', body: 'The bilayer is under 5 nm thick, so opposite charges attract across it and line its two faces; the bulk fluid stays neutral. The membrane stores charge: it is a capacitor (membrane capacitance).' },
          { title: 'Rate proportional to driving force.', body: 'Ions cross at a rate proportional to Vm - E_ion. At E_ion the net flux is zero.' },
          { title: 'E_ion can be calculated.', body: 'From the concentration ratio, the charge and the temperature, with the Nernst equation.' },
        ] },
        { type: 'equation', title: 'The Nernst equation', items: [
          { expression: 'E_ion = 2.303 (R T / z F) * log10([ion]o / [ion]i)', label: 'R gas constant, T absolute temperature, z charge of the ion, F Faraday\'s constant, o outside, i inside' },
          { expression: 'E_ion = (61.54 mV / z) * log10([ion]o / [ion]i)', label: 'at 37 C; so 61.54 mV per tenfold ratio for K+, Na+ and Cl-, and 30.77 mV for Ca2+' },
        ], note: 'Worked on the slide: [K+]o / [K+]i = 1 / 20, log10(1 / 20) = -1.3, EK = 61.54 mV x (-1.3) = -80 mV.' },
        demoBlock('nernst-calc', {
          ions: [
            { key: 'K', label: 'K+', z: 1, inside: 100, outside: 5 },
            { key: 'Na', label: 'Na+', z: 1, inside: 15, outside: 150 },
            { key: 'Ca', label: 'Ca2+', z: 2, inside: 0.0002, outside: 2 },
            { key: 'Cl', label: 'Cl-', z: -1, inside: 13, outside: 150 },
          ],
          defaultIon: 'K',
          temperature: 37,
          labels: { ion: 'Ion (textbook values)', inside: 'Concentration inside', outside: 'Concentration outside', valence: 'Charge z', temperature: 'Temperature', result: 'Equilibrium potential', ratio: 'concentration ratio, outside : inside' },
        },
        'Nernst calculator. Pick an ion or set the concentrations, charge and temperature yourself. The plot shows E against the ratio (log scale) for the chosen charge; the equation is worked underneath.',
        'A calculator with sliders for inside and outside concentration, charge and temperature, a plot of equilibrium potential against concentration ratio with the current value marked, and the worked equation.'),
        { type: 'definition', term: 'What Nernst does not contain', body: 'There is no permeability term. E_ion exists even when the ion\'s channels are closed: it is the membrane potential that would just balance the ion\'s concentration gradient, so that no net current of that ion would flow if the membrane were permeable to it.' },
        { type: 'detail', title: 'Why T and z appear', body: ['More thermal energy means stronger diffusion, so a larger voltage is needed to balance it: E is proportional to T.', 'A doubly charged ion feels twice the electrical force, so half the voltage balances the same gradient: E is inversely proportional to z. Hence 30.77 mV per decade for Ca2+.'] },
      ],
      conceptQuiz: [
        {
          id: 'resting-1',
          prompt: 'A neuron reads -65 mV. What does that mean?',
          options: [
            { text: 'The inside is 65 mV more negative than the extracellular reference', feedback: 'Correct. Ground outside is 0 mV by convention.' },
            { text: 'The outside is 65 mV more negative than the inside', feedback: 'The sign refers to the inside relative to the outside.' },
            { text: 'The cytosol as a whole carries 65 mV worth of excess negative charge', feedback: 'The bulk cytosol stays electrically neutral. The charge that makes Vm is a thin layer pressed against the membrane.' },
          ],
          correct: 0,
        },
        {
          id: 'resting-2',
          prompt: 'K+ is 20 times more concentrated inside and the membrane is permeable only to K+. What stops K+ from leaving until the concentrations are equal?',
          options: [
            { text: 'The inside becomes negative and pulls K+ back; at EK the two forces balance', feedback: 'Correct. Only a minuscule amount of K+ has to leave to get there.' },
            { text: 'The channels close when enough K+ has left', feedback: 'The channels stay open; the electrical force does the balancing.' },
            { text: 'The pump returns each K+ that leaves', feedback: 'Pumps maintain gradients over minutes; equilibrium here is reached in milliseconds without them.' },
          ],
          correct: 0,
        },
        {
          id: 'resting-3',
          prompt: 'Which quantity is not needed to calculate an equilibrium potential with the Nernst equation?',
          options: [
            { text: 'The membrane permeability to the ion', feedback: 'Correct. Nernst has no permeability term.' },
            { text: 'The temperature', feedback: 'T is in the equation.' },
            { text: 'The charge of the ion', feedback: 'z is in the equation.' },
            { text: 'The concentration ratio', feedback: 'That is the heart of the equation.' },
          ],
          correct: 0,
        },
      ],
    },

    // 5 -----------------------------------------------------------------
    {
      id: 'ions-pumps',
      title: 'Key neuronal ions and pumps',
      keyTerms: ['sodium-potassium pump', 'calcium pump', 'depolarization'],
      blocks: [
        {
          type: 'compare',
          title: 'Approximate concentrations across a neuronal membrane (textbook Figure 3.15, at 37 C)',
          columns: ['Outside (mM)', 'Inside (mM)', 'Ratio out : in', 'E_ion'],
          rows: [
            { label: 'K+', cells: ['5', '100', '1 : 20', '-80 mV'] },
            { label: 'Na+', cells: ['150', '15', '10 : 1', '+62 mV'] },
            { label: 'Ca2+', cells: ['2', '0.0002', '10,000 : 1', '+123 mV'] },
            { label: 'Cl-', cells: ['150', '13', '11.5 : 1', '-65 mV'] },
          ],
        },
        { type: 'whyItMatters', body: 'K+ is concentrated inside; Na+, Ca2+ and Cl- outside. E_ion is the potential the membrane would sit at if it were permeable only to that ion. At rest the membrane is mostly permeable to K+, so Vm is close to EK. ECl is near rest, so opening Cl- channels changes Vm little but holds it steady.' },
        { type: 'definition', term: 'Sodium-potassium pump', body: 'An enzyme that breaks down ATP and, per cycle, moves three Na+ out and two K+ in, both against their gradients. It keeps K+ high inside and Na+ high outside and uses up to 70 percent of the brain\'s ATP.' },
        figureBlock(
          hotspots('pump', 908 / 511, 'Two sodium-potassium pumps in the membrane, one binding Na+ inside and K+ outside, with ATP being split to ADP.', PUMP_REGIONS, { gutter: 'all' }),
          'The sodium-potassium pump (textbook Figure 3.16). Arrows: Na+ up and out, K+ down and in, at the cost of ATP.',
          'Two green pump proteins spanning a bilayer. Red arrows carry Na+ from the cytosol out and K+ from the extracellular fluid in; an ATP star and an ADP label sit below the left pump.'
        ),
        { type: 'example', title: 'Why the pump matters', body: 'Without ion pumps the resting membrane potential would not exist and the brain would not function (the quote on the slide). The pump also moves one net positive charge out per cycle, a small direct contribution to Vm, but its main job is the gradients.' },
        { type: 'definition', term: 'Calcium pump', body: 'Actively moves Ca2+ out of the cytosol. Together with calcium-binding proteins and organelles that sequester Ca2+, it keeps free cytosolic Ca2+ at only 0.0002 mM.' },
        { type: 'misconception', wrong: 'The sodium-potassium pump makes the action potential.', right: 'The fast voltage changes come from Na+ and K+ moving through channels down their gradients. The pump works slowly in the background, like a bilge pump, to restore the gradients over time.' },
        { type: 'detail', title: 'Assigned reading (pp. 73-78): potassium channels and external K+', body: [
          'Most potassium channels have four subunits arranged like the staves of a barrel. A pore loop in each subunit lines the selectivity filter. The Shaker fly and scorpion toxin led to the filter\'s sequence; MacKinnon solved the channel\'s atomic structure (Nobel Prize 2003). In Weaver mice one amino acid in a pore loop is mutated, Na+ leaks through and the cerebellar neurons lose their negative potential.',
          'Because the resting membrane is mostly permeable to K+, Vm is very sensitive to [K+]o: raising it tenfold, from 5 to 50 mM, moves Vm from -65 to -17 mV, a depolarization (Vm going less negative). The blood-brain barrier and astrocytes (potassium spatial buffering) keep [K+]o low in the brain; muscle and heart are not protected, which is why intravenous KCl stops the heart.',
        ] },
      ],
      conceptQuiz: [
        {
          id: 'ions-1',
          prompt: 'Which ion is more concentrated inside the neuron than outside?',
          options: [
            { text: 'K+', feedback: 'Correct. About 100 mM inside, 5 mM outside.' },
            { text: 'Na+', feedback: 'Na+ is ten times more concentrated outside.' },
            { text: 'Cl-', feedback: 'Cl- is more concentrated outside.' },
            { text: 'Ca2+', feedback: 'Ca2+ is 10,000 times more concentrated outside.' },
          ],
          correct: 0,
        },
        {
          id: 'ions-2',
          prompt: 'Per cycle, the sodium-potassium pump moves',
          options: [
            { text: '3 Na+ out and 2 K+ in', feedback: 'Correct. One net positive charge leaves.' },
            { text: '2 Na+ out and 3 K+ in', feedback: 'The numbers are the other way round.' },
            { text: '3 Na+ in and 2 K+ out', feedback: 'That would run the gradients down, not build them.' },
          ],
          correct: 0,
        },
        {
          id: 'ions-3',
          prompt: 'Extracellular K+ is raised from 5 to 50 mM. What happens to the resting potential?',
          options: [
            { text: 'It depolarizes strongly, because the resting membrane is mostly permeable to K+ and EK moves toward 0', feedback: 'Correct. About -65 to -17 mV in the textbook calculation.' },
            { text: 'It hyperpolarizes, because more positive ions are outside', feedback: 'A smaller K+ gradient means a less negative EK, so Vm goes up, not down.' },
            { text: 'Nothing, because the pump removes the extra K+', feedback: 'The pump cannot keep up, and the change in EK is immediate.' },
          ],
          correct: 0,
        },
      ],
    },

    // 6 -----------------------------------------------------------------
    {
      id: 'ghk',
      title: 'The Goldman-Hodgkin-Katz equation',
      keyTerms: ['Goldman-Hodgkin-Katz equation', 'permeability', 'relative permeability'],
      blocks: [
        { type: 'text', body: 'Real membranes are permeable to several ions at once. The Goldman-Hodgkin-Katz (GHK) voltage equation adds permeability to the Nernst idea and predicts Vm from all of them.' },
        { type: 'equation', title: 'GHK for K+, Na+ and Cl- (the form on the slides)', items: [
          { expression: 'Vm = (R T / F) * ln( (PNa[Na]o + PK[K]o + PCl[Cl]i) / (PNa[Na]i + PK[K]i + PCl[Cl]o) )', label: 'P is the permeability of each ion. Cations: outside on top. Anions such as Cl-: inside on top, because of the negative charge.' },
          { expression: 'Vm = 61.54 mV * log10( (PK[K]o + PNa[Na]o) / (PK[K]i + PNa[Na]i) )', label: 'the textbook version at 37 C with K+ and Na+ only' },
        ], note: 'With one permeant ion the equation collapses to Nernst: the permeabilities cancel. It is Nernst-like with one term per permeant ion.' },
        { type: 'example', title: 'Worked on the slide (textbook Box 3.3)', body: 'Resting PK is 40 times PNa. Vm = 61.54 mV log10( (40 x 5 + 1 x 150) / (40 x 100 + 1 x 15) ) = 61.54 mV log10(350 / 4015) = -65 mV. Permeable only to K+, Vm would be EK = -80 mV; the small Na+ leak pulls it up to -65 mV.' },
        demoBlock('ghk-explorer', {
          ions: [
            { key: 'K', label: 'K+', z: 1, inside: 100, outside: 5, perm: 40, max: 100, step: 1 },
            { key: 'Na', label: 'Na+', z: 1, inside: 15, outside: 150, perm: 1, max: 100, step: 1 },
            { key: 'Cl', label: 'Cl-', z: -1, inside: 13, outside: 150, perm: 0, max: 100, step: 1 },
          ],
          temperature: 37,
          presets: [
            { key: 'rest', label: 'Rest (40 : 1 : 0)', perms: { K: 40, Na: 1, Cl: 0 } },
            { key: 'rising', label: 'Rising phase (Na+ dominates)', perms: { K: 1, Na: 100, Cl: 0 } },
            { key: 'falling', label: 'Falling phase (K+ only)', perms: { K: 100, Na: 0, Cl: 0 } },
            { key: 'cl', label: 'Cl- channels open too', perms: { K: 40, Na: 1, Cl: 40 } },
          ],
          labels: { permeability: 'Relative permeability', result: 'Membrane potential', preset: 'Preset', equilibrium: 'Equilibrium potentials (textbook concentrations, 37 C)' },
        },
        'GHK explorer. Move the permeabilities and watch Vm slide between EK and ENa; the ion with the largest permeability wins. The presets follow the action potential.',
        'A voltage axis from -100 to +80 mV with EK, ECl and ENa marked above it and a triangle below showing Vm, plus sliders for the permeability of K+, Na+ and Cl- and the worked equation.'),
        {
          type: 'compare',
          title: 'Nernst versus GHK',
          columns: ['Nernst equation', 'GHK equation'],
          rows: [
            { label: 'Question it answers', cells: ['What is the equilibrium potential of one ion?', 'What is Vm when several ions are permeant?'] },
            { label: 'Inputs', cells: ['Concentrations of that ion, z, T', 'Concentrations and relative permeabilities of every permeant ion, T'] },
            { label: 'Permeability', cells: ['Not needed', 'The weight of each ion'] },
            { label: 'Result', cells: ['One E_ion per ion', 'One Vm between the E_ion values, nearest the most permeant ion'] },
          ],
        },
        { type: 'whyItMatters', body: 'Raise an ion\'s permeability and Vm moves toward that ion\'s equilibrium potential. More PNa depolarizes toward ENa; more PK moves Vm toward EK. That single rule explains the action potential.' },
        { type: 'detail', title: 'Conductance versus permeability', body: 'The action potential graphs use conductance g, the capacity of the open channels to carry current (I = g x driving force). GHK uses permeability P, how readily an ion crosses the membrane. Both rise when more channels open; P sets an ion\'s weight in Vm, g sets how much current it carries.' },
      ],
      conceptQuiz: [
        {
          id: 'ghk-1',
          prompt: 'Why is the resting potential -65 mV and not EK, -80 mV?',
          options: [
            { text: 'The resting membrane also has a small Na+ permeability, which pulls Vm toward ENa', feedback: 'Correct. PK : PNa is about 40 : 1.' },
            { text: 'The pump adds 15 mV', feedback: 'The pump\'s direct contribution is small; the Na+ leak is the main reason.' },
            { text: 'EK is really -65 mV', feedback: 'With 5 and 100 mM, EK is -80 mV by the Nernst equation.' },
          ],
          correct: 0,
        },
        {
          id: 'ghk-2',
          prompt: 'PNa suddenly becomes much larger than PK. Where does Vm go?',
          options: [
            { text: 'Toward ENa, about +62 mV', feedback: 'Correct. The most permeant ion dominates.' },
            { text: 'Toward EK, about -80 mV', feedback: 'That happens when K+ dominates.' },
            { text: 'It stays at rest; permeability does not affect Vm', feedback: 'Permeability is exactly what GHK weights the ions by.' },
          ],
          correct: 0,
        },
        {
          id: 'ghk-3',
          prompt: 'In the GHK equation the Cl- concentrations appear the other way round from Na+ and K+. Why?',
          options: [
            { text: 'Cl- carries a negative charge, so its inside concentration goes in the numerator', feedback: 'Correct. Anions are flipped.' },
            { text: 'Cl- is more concentrated outside', feedback: 'So is Na+, and Na+ is not flipped.' },
            { text: 'A printing convention with no physical meaning', feedback: 'It follows from the sign of the charge.' },
          ],
          correct: 0,
        },
      ],
    },

    // 7 -----------------------------------------------------------------
    {
      id: 'waveform',
      title: 'Action potential waveform and intracellular recording',
      keyTerms: ['action potential', 'rising phase', 'overshoot', 'falling phase', 'undershoot', 'excitable membrane', 'intracellular recording', 'extracellular recording'],
      blocks: [
        { type: 'definition', term: 'Action potential', body: 'A brief, regenerative reversal of the membrane potential, about 2 ms long, that travels along the axon without losing size. Cells that can generate it have an excitable membrane. Information is coded in the frequency and pattern of spikes, not their size.' },
        figureBlock(
          hotspots('recording', 1258 / 784, 'Intracellular and extracellular recording of an action potential: two electrodes on a neuron and two oscilloscope screens.', RECORDING_REGIONS, { gutter: 'all' }),
          'Intracellular versus extracellular recording (textbook Box 4.1). Note the scales: millivolts inside, microvolts outside.',
          'A neuron with one electrode inside the soma and one just outside, each through an amplifier to an oscilloscope. The top screen shows a 100 mV spike, the bottom a biphasic wave of tens of microvolts.'
        ),
        {
          type: 'compare',
          title: 'Two ways to record',
          columns: ['Intracellular', 'Extracellular'],
          rows: [
            { label: 'Electrode', cells: ['Microelectrode inside the cell', 'Wire or pipette next to the membrane'] },
            { label: 'Measures', cells: ['Vm relative to ground; the full waveform', 'The currents of a passing spike as a small alternating voltage'] },
            { label: 'Size', cells: ['About 100 mV', 'Tens of microvolts'] },
          ],
        },
        { type: 'detail', title: 'Modern electrodes', body: 'The slide also shows a silicon probe: a 70 um shank with many recording sites, a headstage and a flexible cable. It records extracellular spikes from many neurons at once.' },
        {
          type: 'figure',
          visual: {
            type: 'widget',
            name: 'image-hotspots',
            props: { svg: AP_WAVEFORM.svg, alt: 'An action potential trace with the resting level and 0 mV marked.', aspect: AP_WAVEFORM.aspect, regions: AP_WAVEFORM.regions, gutter: 'all', layout: 'stack', intro: 'Hover, tap or use the arrow keys to name each part of the waveform.' },
            caption: 'The parts of an action potential (textbook Figure 4.1), drawn from the same model that runs the demos below. Rest, threshold, rising phase, overshoot, falling phase, undershoot.',
            fallbackAlt: 'A line at -65 mV rises steeply past 0 mV to about +40 mV at 1.7 ms, falls below the resting level to about -76 mV at 3 ms, then slowly returns.',
          },
        },
        { type: 'steps', title: 'Reading the waveform', steps: [
          { title: 'Resting potential:', body: 'about -65 mV.' },
          { title: 'Threshold:', body: 'the critical depolarization (a generator potential from stretch-gated or transmitter-gated channels, or injected current) that must be reached to trigger the spike.' },
          { title: 'Rising phase:', body: 'rapid depolarization.' },
          { title: 'Overshoot:', body: 'the inside goes positive, the peak above 0 mV.' },
          { title: 'Falling phase:', body: 'rapid repolarization back past rest.' },
          { title: 'Undershoot:', body: 'a brief hyperpolarization below rest, then a slow return.' },
        ] },
        { type: 'example', title: 'Homework wording', body: 'HW1 exercise 4 calls the phases threshold, depolarization, overshoot, repolarization and hyperpolarization. Depolarization is the rising phase, repolarization the falling phase, hyperpolarization the undershoot.' },
      ],
      conceptQuiz: [
        {
          id: 'waveform-1',
          prompt: 'Which part of the action potential is the overshoot?',
          options: [
            { text: 'The part where the inside is positive, above 0 mV', feedback: 'Correct.' },
            { text: 'The dip below the resting potential', feedback: 'That is the undershoot.' },
            { text: 'The steep rise from threshold', feedback: 'That is the rising phase.' },
          ],
          correct: 0,
        },
        {
          id: 'waveform-2',
          prompt: 'An extracellular electrode records',
          options: [
            { text: 'A brief biphasic voltage of tens of microvolts, caused by the spike\'s currents', feedback: 'Correct. A thousand times smaller than the intracellular spike.' },
            { text: 'The membrane potential of about -65 mV', feedback: 'Only an electrode inside the cell sees Vm.' },
            { text: 'Nothing, because it is outside the cell', feedback: 'The currents of the spike flow through the extracellular fluid past the electrode.' },
          ],
          correct: 0,
        },
      ],
    },

    // 8 -----------------------------------------------------------------
    {
      id: 'threshold',
      title: 'Threshold, all-or-none firing and rate coding',
      keyTerms: ['threshold', 'all-or-none', 'firing frequency', 'absolute refractory period', 'relative refractory period'],
      blocks: [
        { type: 'definition', term: 'Making a neuron fire', body: 'Two electrodes impale the axon hillock: one injects positive current, one records Vm against ground. The experimenter controls the direction, strength and duration of the current and watches the voltage.' },
        figureBlock(
          hotspots('inject-current', 1403 / 571, 'A neuron with a stimulating and a recording electrode in the axon hillock, beside traces of injected current and membrane potential with a train of spikes.', INJECT_REGIONS, { gutter: 'all', layout: 'stack' }),
          'Injecting positive charge into a neuron (textbook Figure 4.2). A steady current above threshold gives a train of action potentials.',
          'Left: a neuron with two electrodes entering the axon hillock. Right: a top trace stepping from 0 to a steady current, and a bottom trace at -65 mV that starts firing repeated spikes when the current begins.'
        ),
        { type: 'steps', title: 'What happens as the current grows (slide 30)', steps: [
          'A small current depolarizes the membrane a little, below threshold: no action potential.',
          'A current that depolarizes to threshold gives a full-size action potential. Below threshold nothing, above it the whole spike: all-or-none.',
          'A larger current does not make the spikes taller. It makes the first spike come sooner and raises the firing frequency.',
        ] },
        { type: 'keyNumber', title: 'Rate coding', items: [
          { value: '1 to 50 Hz', label: 'firing frequency as the depolarizing current increases; stimulus intensity is coded in the rate' },
          { value: '1000 Hz', label: 'maximum firing frequency: once a spike starts, no other can start for about 1 ms, the absolute refractory period' },
        ], note: 'For several milliseconds after that, the relative refractory period, more current than usual is needed to reach threshold.' },
        { type: 'misconception', wrong: 'A stronger stimulus gives a bigger action potential.', right: 'The action potential is a binary, discrete event with a fixed size. Strength is coded in when the spikes occur and how many there are per second.' },
      ],
      conceptQuiz: [
        {
          id: 'threshold-1',
          prompt: 'The injected current is doubled while staying above threshold. What changes?',
          options: [
            { text: 'The firing frequency rises; each spike keeps its size', feedback: 'Correct. Rate coding.' },
            { text: 'Each action potential becomes twice as tall', feedback: 'Spikes are all-or-none; their size is fixed.' },
            { text: 'Nothing, because the neuron was already firing', feedback: 'The rate rises with current up to the refractory limit.' },
          ],
          correct: 0,
        },
        {
          id: 'threshold-2',
          prompt: 'What limits the maximum firing frequency to about 1000 Hz?',
          options: [
            { text: 'The absolute refractory period of about 1 ms', feedback: 'Correct.' },
            { text: 'The speed of the sodium-potassium pump', feedback: 'The pump is far too slow to matter spike by spike.' },
            { text: 'The length of the axon', feedback: 'Length affects travel time, not how often spikes can start.' },
          ],
          correct: 0,
        },
      ],
    },

    // 9 -----------------------------------------------------------------
    {
      id: 'conductances',
      title: 'Conductances during the action potential',
      keyTerms: ['sodium conductance', 'potassium conductance'],
      blocks: [
        { type: 'text', body: 'The idealized neuron has pumps, K+ channels and Na+ channels, with EK = -80 mV and ENa = +62 mV. Flipping which conductance dominates flips the membrane potential.' },
        { type: 'steps', title: 'Flipping Vm by changing relative permeability (textbook Figure 4.6)', steps: [
          { title: 'Rest: gK much larger than gNa.', body: 'K+ sets Vm, which sits at EK. The driving force on Na+ is huge (-80 - 62 = -142 mV) but gNa is near zero, so no Na+ current.' },
          { title: 'Na+ channels open: gNa much larger than gK.', body: 'Na+ rushes in down its gradient and Vm shoots toward ENa. This is the rising phase.' },
          { title: 'Na+ channels close, gK dominates again.', body: 'Vm is now positive, so the driving force on K+ is large. K+ leaves and Vm returns toward EK: the falling phase.' },
          { title: 'Rest restored.', body: 'Vm = EK again. In GHK terms, the relative permeabilities went K, then Na, then K.' },
        ] },
        demoBlock('ap-scrubber', {
          phases: {
            rest: { label: 'Resting potential', body: 'gK dominates. Na+ channels closed but available.' },
            threshold: { label: 'Approaching threshold', body: 'The stimulus depolarizes the membrane. Enough Na+ channels open at about -55 mV for Na+ to take over.' },
            rising: { label: 'Rising phase', body: 'Regenerative: Na+ entry depolarizes, which opens more Na+ channels, which lets in more Na+.' },
            overshoot: { label: 'Overshoot', body: 'Vm is positive and heading toward ENa, but never reaches it because Na+ channels are already inactivating and K+ channels opening.' },
            falling: { label: 'Falling phase', body: 'Na+ channels inactivated, K+ channels open. Outward K+ current repolarizes the membrane.' },
            undershoot: { label: 'Undershoot', body: 'Voltage-gated K+ channels are still open, so gK is above its resting value and Vm sits closer to EK than at rest.' },
            return: { label: 'Return to rest', body: 'The voltage-gated K+ channels close and Vm relaxes back to the resting level.' },
          },
          naStates: {
            closed: { label: 'Closed (available)', body: 'Can open on depolarization.' },
            open: { label: 'Open', body: 'Inward Na+ current. Each channel stays open for less than 1 ms.' },
            inactivated: { label: 'Inactivated', body: 'Plugged. Cannot reopen until the membrane repolarizes.' },
            recovering: { label: 'Deinactivating', body: 'The membrane is negative again and channels are becoming available one by one.' },
          },
          kStates: {
            closed: { label: 'Closed', body: 'Only the resting K+ leak carries current.' },
            open: { label: 'Open', body: 'The delayed rectifier opened about 1 ms after threshold and carries outward K+ current.' },
          },
          refractory: {
            absolute: { label: 'Absolute', body: 'Na+ channels inactivated: no second spike is possible at any stimulus strength.' },
            relative: { label: 'Relative', body: 'Some Na+ channels still recovering and gK still raised: a stronger stimulus than usual is needed.' },
            none: { label: 'None', body: 'The membrane is fully excitable.' },
          },
          labels: { time: 'Time', gNa: 'gNa', gK: 'gK', phase: 'Phase', na: 'Na+ channels', k: 'K+ channels', refractory: 'Refractory period', threshold: 'threshold', rest: 'rest', conductance: 'Conductances' },
        },
        'Action potential scrubber. Drag the time slider. Top: membrane potential. Bottom: gNa (solid) and gK (dashed) from the Hodgkin-Huxley model. The panel names the phase, the channel states and the refractory period at the cursor.',
        'A spike trace with a movable cursor, two conductance traces beneath it, and a read-out of the phase, sodium channel state, potassium channel state and refractory period at the cursor.'),
        { type: 'whyItMatters', body: 'gNa rises fast and falls fast; gK rises later and lasts longer. Those two time courses are the whole shape of the spike, and the voltage clamp is how they were measured.' },
      ],
      conceptQuiz: [
        {
          id: 'conductances-1',
          prompt: 'At rest the driving force on Na+ is about -142 mV, yet almost no Na+ enters. Why?',
          options: [
            { text: 'gNa is nearly zero because the voltage-gated Na+ channels are closed', feedback: 'Correct. I = g x driving force, and g is tiny.' },
            { text: 'Na+ is at its equilibrium potential', feedback: 'ENa is +62 mV, far from rest.' },
            { text: 'The pump removes Na+ as fast as it enters', feedback: 'The pump is not what stops the current; the closed channels are.' },
          ],
          correct: 0,
        },
        {
          id: 'conductances-2',
          prompt: 'During the falling phase Vm returns toward EK because',
          options: [
            { text: 'gK is now much larger than gNa, so K+ leaving the cell sets Vm', feedback: 'Correct.' },
            { text: 'Na+ is pumped back out', feedback: 'Pumping is far too slow for the falling phase.' },
            { text: 'Cl- rushes in', feedback: 'Cl- plays no part in the textbook action potential.' },
          ],
          correct: 0,
        },
      ],
    },

    // 10 ----------------------------------------------------------------
    {
      id: 'voltage-clamp',
      title: 'Voltage clamp and the Hodgkin-Huxley model',
      keyTerms: ['voltage clamp', 'Hodgkin-Huxley model', 'tetrodotoxin'],
      blocks: [
        { type: 'definition', term: 'Voltage clamp', body: 'Invented by Kenneth C. Cole. A feedback circuit holds the membrane potential at any value the experimenter chooses and measures the current it must inject to keep it there, which equals the current crossing the membrane. Without the clamp, current and voltage change together and cannot be separated.' },
        { type: 'steps', title: 'Hodgkin and Huxley, Cambridge, around 1950, squid giant axon', steps: [
          'Clamp the axon at a series of voltages and record the membrane current at each.',
          'A depolarizing step gives an early, brief inward current and a later, sustained outward current.',
          'Separate them: remove Na+ from the bath or block Na+ channels with tetrodotoxin (TTX, from the puffer fish) and the early inward current disappears; block the K+ channels and the delayed outward current disappears.',
          'Conclude: the rising phase is a transient increase in gNa with Na+ influx; the falling phase is an increase in gK with K+ efflux. Hodgkin and Huxley shared the 1963 Nobel Prize with John Eccles.',
        ] },
        demoBlock('voltage-clamp', {
          labels: { command: 'Command voltage during the step', ttx: 'Block Na+ channels (TTX)', tea: 'Block K+ channels (TEA)', early: 'Early current', late: 'Late current', inward: 'inward', outward: 'outward' },
        },
        'Voltage clamp demo. The membrane is held at -65 mV and stepped to the command voltage for 6 ms. Total current in blue; the separate Na+ and K+ currents dotted. Block one channel type to isolate the other, and step to +50 mV to see the early current lose its driving force.',
        'A voltage step from -65 mV to 0 mV and, below it, a current trace that dips inward soon after the step and then rises to a sustained outward level. Checkboxes remove the sodium or potassium component.'),
        { type: 'definition', term: 'Hodgkin-Huxley model (1952)', body: 'A set of equations describing how gNa and gK depend on voltage and time. It proposed Na+ gates that are activated by depolarization, inactivated at positive potentials and deinactivated only after the membrane returns to a negative value, more than 20 years before the channel proteins were seen.' },
        { type: 'whyItMatters', body: 'The clamp turned a phenomenon (the spike) into a mechanism (two conductances with different timing). Everything in the next three sections is what those conductances are made of.' },
      ],
      conceptQuiz: [
        {
          id: 'clamp-1',
          prompt: 'What does a voltage clamp control, and what does it measure?',
          options: [
            { text: 'It controls Vm and measures the membrane current', feedback: 'Correct.' },
            { text: 'It controls the current and measures Vm', feedback: 'That is current injection with an intracellular electrode.' },
            { text: 'It controls the ion concentrations', feedback: 'Concentrations are changed separately by ion substitution.' },
          ],
          correct: 0,
        },
        {
          id: 'clamp-2',
          prompt: 'After a depolarizing step the early inward current vanishes when TTX is applied. What carried it?',
          options: [
            { text: 'Na+ entering through voltage-gated Na+ channels', feedback: 'Correct. TTX plugs the Na+ pore.' },
            { text: 'K+ leaving through voltage-gated K+ channels', feedback: 'K+ carries the delayed outward current, unaffected by TTX.' },
            { text: 'Cl- entering', feedback: 'Cl- is not part of the clamped currents on the slides.' },
          ],
          correct: 0,
        },
      ],
    },

    // 11 ----------------------------------------------------------------
    {
      id: 'channel-structure',
      title: 'Channel structure and voltage sensing',
      keyTerms: ['voltage-gated sodium channel', 'pore loop', 'voltage sensor', 'S4'],
      blocks: [
        { type: 'definition', term: 'Voltage-gated sodium channel', body: 'One long polypeptide folded into four similar domains, I to IV. Each domain has six membrane-spanning alpha helices, S1 to S6. The four domains clump together and the pore forms between them.' },
        figureBlock(
          hotspots('sodium-channel', 543 / 684, 'One domain of the sodium channel with helices S1 to S6, the S4 helix marked with plus signs and a red pore loop, above a drawing of the assembled channel in the membrane.', SODIUM_CHANNEL_REGIONS, { gutter: 'sides' }),
          'The voltage-gated sodium channel (textbook Figure 4.7 b and c). Top: one domain. Bottom: the assembled channel with its selectivity filter, voltage sensors and gate.',
          'Top: six coiled helices in a row, the fourth shaded purple with four plus signs, a red hairpin loop between the fifth and sixth. Bottom: a blue channel protein in a bilayer with red loops at its mouth, two charged rods in its walls and a flap at its base.'
        ),
        {
          type: 'compare',
          title: 'Three working parts',
          columns: ['Made of', 'Job'],
          rows: [
            { label: 'Selectivity filter', cells: ['The pore loops between S5 and S6 of each domain', 'Lets Na+ through about 12 times more readily than K+. A partially hydrated Na+ (0.5 nm with its water) fits; hydrated K+ does not.'] },
            { label: 'Voltage sensor', cells: ['S4, with positively charged amino acids spaced along the helix', 'Depolarization pushes S4 and twists the protein, which opens the gate. Closed at -65 mV, open at -40 mV.'] },
            { label: 'Gate', cells: ['The part of the protein that occludes the pore', 'Opens or closes the path. The filter picks the ion; the gate says when.'] },
          ],
        },
        figureBlock(
          hotspots('channel-gating', 486 / 233, 'The sodium channel closed at -65 mV on the left and open at -40 mV on the right, with the S4 sensors moved outward.', GATING_REGIONS, { gutter: 'all', layout: 'stack' }),
          'A model of gating (textbook Figure 4.8). Depolarization from -65 to -40 mV moves the charged S4 helices and opens the pore.',
          'Two channels in a bilayer. Left, closed: a solid protein with two charged rods low in the membrane. Right, open: a central channel and the rods moved up, with arrows. An arrow between them reads -65 mV to -40 mV.'
        ),
        { type: 'detail', title: 'Voltage-gated potassium channels', body: 'Built from four separate subunits with a pore loop each. They also open on depolarization but only after about 1 ms, and they stay open while the membrane is depolarized. Hodgkin and Huxley called this conductance the delayed rectifier because it resets the membrane.' },
      ],
      conceptQuiz: [
        {
          id: 'structure-1',
          prompt: 'Which helix senses the membrane voltage?',
          options: [
            { text: 'S4, which carries positively charged residues', feedback: 'Correct. Depolarization moves it.' },
            { text: 'S6, which lines the pore', feedback: 'S5 and S6 flank the pore loop; S4 is the sensor.' },
            { text: 'The pore loop', feedback: 'The pore loop is the selectivity filter.' },
          ],
          correct: 0,
        },
        {
          id: 'structure-2',
          prompt: 'Why does K+ not pass the sodium channel\'s filter although it is a similar cation?',
          options: [
            { text: 'With its remaining water K+ is too large for the filter, while partially hydrated Na+ fits', feedback: 'Correct. Selectivity depends on the ion plus its water.' },
            { text: 'K+ is repelled by the positive charges on S4', feedback: 'S4 is the voltage sensor, not the filter.' },
            { text: 'K+ is negatively charged', feedback: 'K+ is a cation.' },
          ],
          correct: 0,
        },
      ],
    },

    // 12 ----------------------------------------------------------------
    {
      id: 'patch-clamp',
      title: 'Patch clamp',
      keyTerms: ['patch clamp', 'gigaohm seal', 'single-channel current', 'unitary conductance'],
      blocks: [
        { type: 'definition', term: 'Patch clamp', body: 'Developed by Sakmann and Neher (Nobel Prize 1991). A glass pipette with a 1 to 5 um tip is pressed onto the membrane and gentle suction forms a gigaohm seal. The patch under the tip, holding one or a few channels, can be torn off and voltage-clamped.' },
        figureBlock(
          hotspots('patch-clamp', 1255 / 540, 'A pipette on a neuron, a zoom of the pipette tip sealed to the membrane over one sodium channel, and the channel closed and open.', PATCH_REGIONS, { gutter: 'all', layout: 'stack' }),
          'The patch-clamp method (textbook Box 4.3). A tight seal leaves the ions in the pipette only one path: through the channel in the patch.',
          'Left: a pipette touching a neuron. Right: three zooms of a pipette tip on a bump of membrane; the membrane holds one blue channel, closed in the middle panel and open with an arrow of Na+ in the right panel.'
        ),
        { type: 'steps', title: 'Reading a single-channel record', steps: [
          'Closed: no current, a flat trace.',
          'Open: a discrete step of current. Its amplitude is the single-channel current; dividing it by the driving force (Vm - E_ion) gives the channel\'s conductance, which is the same at every opening (unitary).',
          'The duration of the step is how long the channel stayed open. Over a million ions can pass per second.',
          'Openings happen at unpredictable times. Repeating the same step many times gives the probability that the channel is open at that voltage.',
        ] },
        figureBlock(
          hotspots('channel-record', 864 / 593, 'A voltage step from -65 to -40 mV and three single-channel current traces, each with one brief downward opening.', RECORD_REGIONS, { quiz: false, gutter: 'sides' }),
          'Three sodium channels answering the same step (textbook Figure 4.10 a and b). Each opens once, briefly, then inactivates until the voltage returns.',
          'Top: a rectangular voltage step lasting 5 ms. Below: three noisy current traces, each with one short downward deflection shortly after the step begins, then flat.'
        ),
        {
          type: 'compare',
          title: 'Three methods compared',
          columns: ['Controls', 'Measures'],
          rows: [
            { label: 'Intracellular recording with current injection', cells: ['The injected current', 'Vm: graded responses, threshold, spike timing, firing rate'] },
            { label: 'Voltage clamp', cells: ['Vm of the whole membrane', 'The total membrane current, hence how conductance changes with voltage and time'] },
            { label: 'Single-channel patch clamp', cells: ['Vm of a tiny patch', 'Current through one channel: unitary conductance, open time, open probability'] },
          ],
        },
        { type: 'detail', title: 'From one channel to the whole current', body: 'The summed current of a population of channels is the single-channel current times the number of channels times their probability of being open. Thousands of Na+ channels per square micrometre act together to make the current that shapes the spike.' },
      ],
      conceptQuiz: [
        {
          id: 'patch-1',
          prompt: 'What does the amplitude of a single-channel current step tell you?',
          options: [
            { text: 'The current through one open channel, hence its conductance at that driving force', feedback: 'Correct.' },
            { text: 'How many channels are in the patch', feedback: 'Steps of the same size come from one channel; more channels give stacked steps.' },
            { text: 'The membrane potential of the cell', feedback: 'The voltage is set by the clamp, not read from the step.' },
          ],
          correct: 0,
        },
        {
          id: 'patch-2',
          prompt: 'Why is the gigaohm seal essential?',
          options: [
            { text: 'It stops ions leaking between the pipette and the membrane, so the recorded current comes only through the channels in the patch', feedback: 'Correct. It also cuts the noise.' },
            { text: 'It keeps the cell alive', feedback: 'The seal is about electrical isolation, not survival.' },
            { text: 'It opens the channels', feedback: 'Voltage steps open them; the seal only isolates them.' },
          ],
          correct: 0,
        },
      ],
    },

    // 13 ----------------------------------------------------------------
    {
      id: 'channel-states',
      title: 'Sodium channel states and refractoriness',
      keyTerms: ['inactivation', 'deinactivation', 'refractory period'],
      blocks: [
        { type: 'steps', title: 'Four stages of the voltage-gated Na+ channel (slide 36)', steps: [
          { title: 'Closed.', body: 'At rest, but available to open.' },
          { title: 'Opening at depolarization.', body: 'With little and slightly variable delay; open for at most about 1 ms.' },
          { title: 'Inactivation.', body: 'The channel shuts although the membrane is still depolarized, and stays shut.' },
          { title: 'Deinactivation.', body: 'Only when the membrane returns to a negative potential does the channel recover and become closed-but-available again.' },
        ] },
        figureBlock(
          hotspots('channel-model', 878 / 343, 'Four drawings of a sodium channel in the membrane: closed, open with Na+ entering, inactivated with a ball plugging the pore, and deinactivating.', MODEL_REGIONS, { gutter: 'all', layout: 'stack' }),
          'The ball-and-chain model (textbook Figure 4.10 c). A globular part of the protein swings up to plug the open pore; repolarization lets it swing away and the gate close.',
          'Four blue channels side by side in a bilayer. The first is closed with a pink ball hanging below on a chain; the second is open with a red arrow of Na+ passing through; the third has the ball lodged in the pore; the fourth is closed with the ball free again.'
        ),
        {
          type: 'compare',
          title: 'Molecular basis of the action potential (slide 37)',
          columns: ['What the channels are doing'],
          rows: [
            { label: 'Threshold', cells: ['Enough voltage-gated Na+ channels open that the membrane\'s relative permeability favours Na+ over K+.'] },
            { label: 'Rising phase', cells: ['Large driving force on Na+; Na+ rushes in through the open channels.'] },
            { label: 'Overshoot', cells: ['Permeability greatly favours Na+, so Vm approaches ENa, above 0 mV.'] },
            { label: 'Falling phase', cells: ['Na+ channels inactivate and voltage-gated K+ channels finally open (triggered about 1 ms earlier). K+ rushes out.'] },
            { label: 'Undershoot', cells: ['Open voltage-gated K+ channels add to the resting K+ permeability; with almost no Na+ permeability Vm goes toward EK.'] },
            { label: 'Absolute refractory period', cells: ['Na+ channels are inactivated; no spike can be generated until repolarization deinactivates them.'] },
            { label: 'Relative refractory period', cells: ['Vm stays hyperpolarized until the K+ channels close, so more depolarizing current is needed to reach threshold.'] },
          ],
        },
        { type: 'example', title: 'Homework scenario (HW1 exercise 3 and 4F)', body: 'Neuron A: voltage-gated Na+ channels cannot open. Resting Vm is normal (it depends on the K+ leak and the pumps), but no action potential can be generated; the defect shows immediately. Neuron B: high [K+]o depolarizes the resting potential at once and can inactivate Na+ channels. Neuron C: pumps blocked, gradients fade slowly, so rest and spiking fail progressively over time.' },
        { type: 'detail', title: 'Channelopathy', body: 'A single amino acid change in one sodium channel gene slows inactivation, prolongs the spike and causes generalized epilepsy with febrile seizures in infants. Local anaesthetics such as lidocaine block spikes by binding inside the open Na+ pore.' },
      ],
      conceptQuiz: [
        {
          id: 'states-1',
          prompt: 'The membrane is held depolarized. Why does the Na+ current stop after about 1 ms?',
          options: [
            { text: 'The channels inactivate: part of the protein plugs the pore', feedback: 'Correct. They stay shut until the membrane repolarizes.' },
            { text: 'Na+ runs out outside the cell', feedback: 'Concentrations barely change during a spike.' },
            { text: 'The voltage sensors return to rest', feedback: 'The membrane is still depolarized, so the sensors stay moved; inactivation is a separate step.' },
          ],
          correct: 0,
        },
        {
          id: 'states-2',
          prompt: 'What must happen before an inactivated Na+ channel can open again?',
          options: [
            { text: 'The membrane must return to a negative potential', feedback: 'Correct. Deinactivation needs repolarization.' },
            { text: 'A stronger depolarization', feedback: 'More depolarization keeps it inactivated.' },
            { text: 'ATP must be spent', feedback: 'Gating is driven by voltage, not ATP.' },
          ],
          correct: 0,
        },
        {
          id: 'states-3',
          prompt: 'During the relative refractory period a spike can be fired, but only with a stronger stimulus. Why?',
          options: [
            { text: 'Some Na+ channels are still recovering and the open K+ channels hold Vm further from threshold', feedback: 'Correct.' },
            { text: 'All Na+ channels are inactivated', feedback: 'That is the absolute refractory period, when no stimulus works.' },
            { text: 'The pump has changed the concentrations', feedback: 'Concentrations are unchanged; the channel states are what matter.' },
          ],
          correct: 0,
        },
      ],
    },

    // 14 ----------------------------------------------------------------
    {
      id: 'initiation',
      title: 'Spike initiation zones',
      keyTerms: ['spike-initiation zone', 'axon hillock', 'axon initial segment'],
      blocks: [
        { type: 'definition', term: 'Spike-initiation zone', body: 'The membrane where action potentials are normally generated. It converts graded depolarization into all-or-none spikes. In many central neurons it is the axon initial segment at the axon hillock, which has the highest density of voltage-gated Na+ channels and therefore the lowest threshold.' },
        figureBlock(
          hotspots('spike-initiation', 695 / 512, 'A pyramidal cell and a sensory neuron with the axonal membrane coloured red; arrows show the direction of propagation.', INITIATION_REGIONS, { gutter: 'all' }),
          'The spike-initiation zone (textbook Figure 4.16). Red membrane has a high density of voltage-gated sodium channels. Left, a cortical pyramidal cell; right, a primary sensory neuron.',
          'Left: a pyramidal neuron whose axon, starting at the hillock below the soma, is drawn red with arrows pointing away from the cell. Right: a sensory neuron with a round soma to the side of a long red axon; arrows point from the left ending toward the right.'
        ),
        {
          type: 'compare',
          title: 'Where the spike starts',
          columns: ['Input that depolarizes', 'Spike-initiation zone', 'Spikes travel'],
          rows: [
            { label: 'Cortical pyramidal cell', cells: ['Synaptic input on dendrites and soma', 'Axon hillock (initial segment)', 'Down the axon to the terminals'] },
            { label: 'Primary sensory neuron', cells: ['A receptor potential at the sensory ending', 'The sensory nerve ending', 'Along the sensory axon toward the CNS'] },
          ],
        },
        { type: 'whyItMatters', body: 'Dendrites and soma have few voltage-gated Na+ channels, so they receive and integrate. The axon has many, so it generates and conducts. The protein content of the membrane, not the shape, sets the job of each part.' },
      ],
      conceptQuiz: [
        {
          id: 'initiation-1',
          prompt: 'Why does the spike start at the axon hillock rather than in a dendrite?',
          options: [
            { text: 'The hillock has the highest density of voltage-gated Na+ channels, so its threshold is lowest', feedback: 'Correct.' },
            { text: 'The hillock is closest to the nucleus', feedback: 'Distance to the nucleus has nothing to do with excitability.' },
            { text: 'Dendrites have no membrane potential', feedback: 'They do; they simply lack the channels to fire.' },
          ],
          correct: 0,
        },
        {
          id: 'initiation-2',
          prompt: 'In a primary sensory neuron the action potential begins',
          options: [
            { text: 'At the sensory nerve ending, when the receptor potential reaches threshold', feedback: 'Correct.' },
            { text: 'At the soma', feedback: 'The soma sits beside the axon and is not on the path.' },
            { text: 'In the spinal cord', feedback: 'The spike travels toward the CNS; it starts at the periphery.' },
          ],
          correct: 0,
        },
      ],
    },

    // 15 ----------------------------------------------------------------
    {
      id: 'conduction',
      title: 'Regenerative conduction',
      keyTerms: ['conduction', 'local current', 'orthodromic', 'antidromic'],
      blocks: [
        { type: 'steps', title: 'How the spike moves along the axon (textbook Figure 4.13)', steps: [
          'At the active patch Na+ enters and makes the inside locally positive.',
          'This positive charge spreads along the inside of the axon as a local current and depolarizes the membrane just ahead.',
          'When that membrane reaches threshold its own Na+ channels open and regenerate a full-size action potential there.',
          'Repeat, patch after patch, to the terminal. Like a burning fuse: each segment ignites the next, so the signal never fades.',
        ] },
        { type: 'keyNumber', items: [
          { value: '10 m/s', label: 'a typical conduction velocity' },
          { value: '2 cm', label: 'of axon occupied by one 2 ms spike at that speed (10 m/s x 0.002 s)' },
        ] },
        { type: 'definition', term: 'Why it goes one way', body: 'Charge spreads in both directions, but the membrane just behind the spike is refractory: its Na+ channels are inactivated. Only the membrane ahead can fire. Normal conduction from soma to terminal is orthodromic; a spike started experimentally at the far end and running backward is antidromic.' },
        { type: 'example', title: 'Homework scenario (HW1 exercise 2C)', body: 'Stimulate a resting axon in the middle of its length and a spike travels in both directions, because the membrane on both sides is excitable and neither side is refractory. In intact tissue transmission is still one-way, because spikes start at the initiation zone and synapses pass the signal only from presynaptic terminal to postsynaptic cell.' },
      ],
      conceptQuiz: [
        {
          id: 'conduction-1',
          prompt: 'What keeps the action potential from turning back on itself?',
          options: [
            { text: 'The membrane behind it is refractory because its Na+ channels are inactivated', feedback: 'Correct.' },
            { text: 'The local current only flows forward', feedback: 'Charge spreads both ways; the refractory membrane behind cannot respond.' },
            { text: 'The myelin behind it blocks the current', feedback: 'Unmyelinated axons also conduct one way.' },
          ],
          correct: 0,
        },
        {
          id: 'conduction-2',
          prompt: 'Why does the spike keep its full size all the way down the axon?',
          options: [
            { text: 'It is regenerated at each patch by that patch\'s own Na+ channels', feedback: 'Correct. It is not a passively spreading signal.' },
            { text: 'The axon is a good insulated wire', feedback: 'It is a poor one; passive signals leak away within millimetres.' },
            { text: 'The soma keeps injecting current', feedback: 'The soma has nothing to do with it once the spike is on its way.' },
          ],
          correct: 0,
        },
      ],
    },

    // 16 ----------------------------------------------------------------
    {
      id: 'myelin',
      title: 'Axon diameter and myelin',
      keyTerms: ['conduction velocity', 'myelin', 'node of Ranvier', 'saltatory conduction'],
      blocks: [
        { type: 'text', body: 'Conduction velocity depends on how far the local current spreads ahead of the spike. Two things control that: the diameter of the axon and its insulation.' },
        {
          type: 'compare',
          title: 'Two paths for the current (the leaky hose)',
          columns: ['Narrow, leaky axon', 'Wide or insulated axon'],
          rows: [
            { label: 'Down the inside', cells: ['High resistance, little current', 'Low resistance (wide) or nothing leaks (myelin): most current'] },
            { label: 'Out across the membrane', cells: ['Many open pores: most current leaks', 'Few pores or a myelin wrap: little leaks'] },
            { label: 'Result', cells: ['Depolarizes only a short stretch ahead: slow', 'Depolarizes far ahead: fast'] },
          ],
        },
        { type: 'definition', term: 'Myelin and nodes of Ranvier', body: 'Myelin is many layers of glial membrane (Schwann cells in the PNS, oligodendroglia in the CNS) wrapped round the axon. It insulates the internodes. At the nodes of Ranvier, 0.2 to 2.0 mm apart, the membrane is bare and packed with voltage-gated Na+ channels. The spike is regenerated only at the nodes and skips between them: saltatory conduction.' },
        figureBlock(
          hotspots('myelinated-axon', 678 / 417, 'A myelinated axon leaving the soma, with blue myelin segments separated by bare nodes, ending in branched terminals.', MYELIN_REGIONS, { gutter: 'all' }),
          'A myelinated axon (NIH BioArt). The sheath segments are the internodes; the gaps between them are the nodes of Ranvier where the spike is regenerated.',
          'A yellow neuron on the left sends an axon to the right. The axon carries a row of blue oval myelin sheaths with small gaps between them and ends in a cluster of branches at the top right.'
        ),
        demoBlock('conduction-demo', {
          length: 30,
          maxTime: 20,
          axons: [
            { key: 'thin', label: 'Thin unmyelinated axon', sub: '0.5 mm per ms', thickness: 6, velocity: 0.5 },
            { key: 'thick', label: 'Thick unmyelinated axon', sub: '1.5 mm per ms', thickness: 14, velocity: 1.5 },
            { key: 'myelinated', label: 'Myelinated axon', sub: '6 mm per ms, nodes 2 mm apart', thickness: 8, velocity: 6, internode: 2 },
          ],
          labels: { time: 'Time after the stimulus', stimulate: 'Stimulate', end: 'at the left end', middle: 'in the middle', front: 'front at', after: 'after', arrived: 'arrived at' },
        },
        'Conduction demo. Drag the time slider: the blue segment is the active membrane, the grey tail behind it is refractory. The thick axon is faster than the thin one; the myelinated axon jumps node to node (saltatory conduction). Stimulate in the middle and the spike runs both ways. Velocities are illustrative.',
        'Three horizontal axons of different thickness with a time slider. On each, an accent-coloured segment marks the active membrane and a grey segment behind it the refractory membrane; the third axon has myelin segments and the marker sits on a node.'),
        { type: 'example', title: 'Demyelination (textbook Box 4.5)', body: 'In multiple sclerosis and Guillain-Barre syndrome the myelin is attacked. Current leaks out of the bare internodes, so the next node reaches threshold late or not at all: conduction slows or fails, which shows up as slowed responses to a checkerboard stimulus or to a nerve shock.' },
        { type: 'detail', title: 'Small axons and local anaesthetics', body: 'The squid giant axon is 1 mm across, which is why Hodgkin and Huxley could work on it. Small axons need more depolarization to reach threshold, have less safety margin, and are blocked first by local anaesthetics such as lidocaine, which binds inside the open Na+ pore (Box 4.4). Fortunately the small fibres are the ones that carry pain.' },
      ],
      conceptQuiz: [
        {
          id: 'myelin-1',
          prompt: 'Why does a wider axon conduct faster?',
          options: [
            { text: 'Lower resistance to current along the inside, so the depolarization reaches farther ahead', feedback: 'Correct.' },
            { text: 'It has more myelin', feedback: 'Diameter and myelin are separate factors.' },
            { text: 'Its action potentials are larger', feedback: 'Spike size is about the same; speed is about how far the current spreads.' },
          ],
          correct: 0,
        },
        {
          id: 'myelin-2',
          prompt: 'Where along a myelinated axon are the voltage-gated Na+ channels concentrated?',
          options: [
            { text: 'At the nodes of Ranvier', feedback: 'Correct. The spike is regenerated there.' },
            { text: 'Under the myelin', feedback: 'The internode is insulated; current passes along the inside, not across.' },
            { text: 'Evenly along the whole axon', feedback: 'That describes an unmyelinated axon.' },
          ],
          correct: 0,
        },
        {
          id: 'myelin-3',
          prompt: 'Loss of myelin slows conduction because',
          options: [
            { text: 'Current leaks out of the bare internode, so the next node takes longer to reach threshold', feedback: 'Correct, and if too much leaks the spike fails.' },
            { text: 'The nodes disappear', feedback: 'The nodes stay; the insulation between them is lost.' },
            { text: 'The axon becomes thinner', feedback: 'Diameter is unchanged; the leak is the problem.' },
          ],
          correct: 0,
        },
      ],
    },
  ],

  recap: {
    terms: [
      { term: 'Membrane potential Vm', definition: 'Voltage inside minus outside. Rest about -65 mV. Measured with a microelectrode against ground (0 mV).' },
      { term: 'Phospholipid bilayer', definition: 'Polar phosphate heads out, nonpolar hydrocarbon tails in. Blocks water-soluble ions. About 5 nm.' },
      { term: 'Protein structure', definition: '20 amino acids, peptide bonds. Primary sequence, secondary alpha helix, tertiary 3D fold, quaternary subunits. Hydrophobic parts in lipid, hydrophilic parts in water or lining the pore.' },
      { term: 'Ion channel', definition: '4 to 6 subunits round a water-filled pore. Selectivity filter (which ion) and gate (open or closed).' },
      { term: 'Ion pump', definition: 'Uses ATP to move ions against their gradients. Builds the gradients that channels use.' },
      { term: 'Diffusion', definition: 'Net movement down a concentration gradient. Needs channels plus a gradient. c = n / V.' },
      { term: 'Electrical current', definition: 'Ions moved by a field. Positive in the direction of cation movement. Needs channels plus a voltage.' },
      { term: 'Ohm\'s law', definition: 'I = g V. Conductance g (siemens) = 1 / resistance R (ohms).' },
      { term: 'Driving force', definition: 'Vm - E_ion. Current I_ion = g_ion (Vm - E_ion), zero at E_ion or when g = 0.' },
      { term: 'Equilibrium potential E_ion', definition: 'Vm at which diffusion and electrical force on one ion balance: no net current. Nernst. Exists whether or not channels are open.' },
      { term: 'Membrane capacitance', definition: 'Separated charge sits in thin layers on the two membrane faces; bulk fluid neutral. Tiny ion movement, large voltage.' },
      { term: 'Ion table (37 C)', definition: 'K+ 5 out / 100 in, EK -80. Na+ 150 / 15, ENa +62. Ca2+ 2 / 0.0002, ECa +123. Cl- 150 / 13, ECl -65 (mM, mV).' },
      { term: 'Sodium-potassium pump', definition: 'ATP; 3 Na+ out, 2 K+ in per cycle; up to 70 percent of brain ATP. Maintains gradients; small direct effect on Vm. Does not make the spike.' },
      { term: 'Calcium pump', definition: 'Plus binding proteins and organelles keep cytosolic Ca2+ at 0.0002 mM.' },
      { term: 'Resting permeability', definition: 'PK about 40 times PNa, so Vm near EK; Na+ leak pulls it from -80 to -65 mV. Vm very sensitive to [K+]o (5 to 50 mM: -65 to -17 mV).' },
      { term: 'GHK equation', definition: 'Vm from concentrations and relative permeabilities of all permeant ions. Anions flipped. Raise P of an ion and Vm moves toward its E.' },
      { term: 'Conductance vs permeability', definition: 'g: capacity of open channels to carry current. P: how readily an ion crosses; weights the ion in GHK.' },
      { term: 'Action potential', definition: 'About 2 ms. Rest, threshold, rising phase, overshoot (above 0 mV), falling phase, undershoot, return. Fixed size, regenerated along the axon.' },
      { term: 'Recording', definition: 'Intracellular: Vm, about 100 mV spike. Extracellular: biphasic, tens of uV. Two electrodes at the hillock: inject current, record Vm.' },
      { term: 'Threshold, all-or-none', definition: 'Below threshold nothing; above it a full spike. Stronger current: earlier first spike, higher rate, not taller spikes.' },
      { term: 'Rate coding', definition: 'Firing frequency rises with depolarizing current (1 Hz to 50 Hz and more). Max about 1000 Hz.' },
      { term: 'Refractory periods', definition: 'Absolute (about 1 ms): Na+ channels inactivated, no spike possible. Relative (several ms): some Na+ channels recovering, gK raised, stronger stimulus needed.' },
      { term: 'Conductance sequence', definition: 'Rest gK >> gNa (Vm at EK). Rising gNa >> gK (toward ENa). Falling gK >> gNa (back to EK). gNa fast up, fast down; gK delayed about 1 ms, lasts longer.' },
      { term: 'Voltage clamp', definition: 'Cole. Holds Vm, measures membrane current. Hodgkin and Huxley about 1950, squid axon: early inward Na+ current, delayed outward K+ current. Model 1952. Nobel 1963 (with Eccles).' },
      { term: 'TTX', definition: 'Tetrodotoxin, puffer fish. Blocks the Na+ pore from outside; abolishes Na+-dependent spikes.' },
      { term: 'Voltage-gated Na+ channel', definition: 'One polypeptide, 4 domains x 6 helices S1-S6. S4 = voltage sensor (+ charges). Pore loops = selectivity filter (Na+ 12x over K+; hydrated Na+ 0.5 nm fits). Gate opens at about -40 mV.' },
      { term: 'Voltage-gated K+ channel', definition: '4 separate subunits, pore loop each. Opens about 1 ms after depolarization, stays open while depolarized. Delayed rectifier.' },
      { term: 'Patch clamp', definition: 'Sakmann and Neher (Nobel 1991). Pipette 1-5 um, gigaohm seal, one channel. Step amplitude = single-channel current (conductance = I / driving force); duration = open time; repeats give open probability.' },
      { term: 'Na+ channel stages', definition: '1 closed, 2 open at depolarization (little delay, up to 1 ms), 3 inactivated (ball plugs pore), 4 deinactivated at repolarization. Population current = single current x number x open probability.' },
      { term: 'Spike-initiation zone', definition: 'Highest Na+ channel density, lowest threshold. Pyramidal cell: axon hillock (initial segment). Sensory neuron: sensory nerve ending. Dendrites and soma integrate, axon fires.' },
      { term: 'Conduction', definition: 'Na+ entry, local current depolarizes membrane ahead to threshold, regenerated patch by patch (fuse). One way because the membrane behind is refractory. Orthodromic soma to terminal; antidromic backward (experimental). Mid-axon stimulus: both ways.' },
      { term: 'Velocity', definition: 'Typical 10 m/s; 2 ms spike occupies 2 cm. Faster with larger diameter (less internal resistance) and with myelin (less leak).' },
      { term: 'Myelin, nodes', definition: 'Glial wrap (Schwann PNS, oligodendroglia CNS). Nodes of Ranvier 0.2-2 mm apart with concentrated Na+ channels. Saltatory conduction node to node. Demyelination (MS, Guillain-Barre) slows or blocks.' },
    ],
    equations: [
      {
        name: 'Ionic current',
        expression: 'I_ion = g_ion * (Vm - E_ion)',
        note: 'Ohm\'s law for one ion. g grows with open channels; Vm - E_ion is the driving force.',
      },
      {
        name: 'Nernst equation',
        expression: 'E_ion = 2.303 (R T / z F) * log10([ion]o / [ion]i)\nat 37 C: E_ion = (61.54 mV / z) * log10([ion]o / [ion]i)\n(30.77 mV for Ca2+)',
        note: 'Equilibrium potential of one ion. No permeability term. Example: 1/20 gives log = -1.3, EK = -80 mV.',
      },
      {
        name: 'Goldman-Hodgkin-Katz equation',
        expression: 'Vm = 61.54 mV * log10( (PK[K]o + PNa[Na]o + PCl[Cl]i) / (PK[K]i + PNa[Na]i + PCl[Cl]o) )\nPK:PNa = 40:1 -> 61.54 * log10(350 / 4015) = -65 mV',
        note: 'Vm from several permeant ions weighted by permeability. Anions flipped. Slides write it with RT/F ln.',
      },
      {
        name: 'Conduction length',
        expression: 'length = velocity * duration = 10 m/s * 0.002 s = 0.02 m = 2 cm',
        note: 'How much axon one spike occupies.',
      },
    ],
  },

  lectureQuiz: [
    // Easy ---------------------------------------------------------------
    {
      id: 'q01',
      difficulty: 'easy',
      type: 'mc',
      prompt: 'A microelectrode records a membrane potential of -65 mV. What does the number mean?',
      options: [
        { text: 'The inside of the cell is 65 mV more negative than the extracellular reference', feedback: 'Correct. Ground in the bath is defined as 0 mV.' },
        { text: 'The outside is 65 mV more negative than the inside', feedback: 'The sign is for the inside relative to the outside.' },
        { text: 'The potassium equilibrium potential is -65 mV', feedback: 'EK is about -80 mV; -65 mV is the resting Vm, which is close to EK but not equal.' },
        { text: 'The cytosol as a whole holds 65 mV worth of extra negative charge', feedback: 'The bulk cytosol is electrically neutral. Only a thin layer of charge at the membrane surfaces makes the voltage.' },
      ],
      correct: 0,
      modelAnswer: [
        'Membrane potential is the voltage across the membrane, measured between an electrode inside the cell and a wire in the extracellular fluid.',
        'The wire (ground) is defined as 0 mV, so -65 mV means the inside is 65 mV more negative than the outside.',
      ],
    },
    {
      id: 'q02',
      difficulty: 'easy',
      type: 'mc',
      prompt: 'Which ion is more concentrated inside the neuron than outside?',
      options: [
        { text: 'K+', feedback: 'Correct. About 100 mM inside and 5 mM outside.' },
        { text: 'Na+', feedback: 'Na+ is about ten times more concentrated outside.' },
        { text: 'Cl-', feedback: 'Cl- is about 11.5 times more concentrated outside.' },
        { text: 'Ca2+', feedback: 'Ca2+ is 10,000 times more concentrated outside.' },
      ],
      correct: 0,
      modelAnswer: [
        'The sodium-potassium pump concentrates K+ inside (100 mM against 5 mM outside) and Na+ outside (150 mM against 15 mM inside).',
        'Ca2+ and Cl- are also more concentrated outside.',
      ],
    },
    {
      id: 'q03',
      difficulty: 'easy',
      type: 'mc',
      prompt: 'Which part of an ion channel determines which ion can pass?',
      options: [
        { text: 'The selectivity filter formed by the pore loops', feedback: 'Correct.' },
        { text: 'The gate', feedback: 'The gate decides whether the pore is open, not which ion fits.' },
        { text: 'The S4 helix', feedback: 'S4 is the voltage sensor.' },
        { text: 'The hydrophobic surface', feedback: 'That anchors the protein in the bilayer.' },
      ],
      correct: 0,
      modelAnswer: [
        'The selectivity filter is the narrow part of the pore lined by the pore loops.',
        'Its dimensions and chemistry, together with how much water the ion must shed, decide which ion passes. The gate separately decides whether the pore is open.',
      ],
    },
    {
      id: 'q04',
      difficulty: 'easy',
      type: 'mc',
      prompt: 'What does the sodium-potassium pump do in one cycle?',
      options: [
        { text: 'Uses ATP to move 3 Na+ out and 2 K+ in, against their gradients', feedback: 'Correct.' },
        { text: 'Lets Na+ in and K+ out down their gradients', feedback: 'That is what channels do during the spike, not the pump.' },
        { text: 'Moves 2 Na+ out and 3 K+ in', feedback: 'The numbers are the other way round.' },
        { text: 'Generates the rising phase of the action potential', feedback: 'A common misconception. The pump is far too slow; channels make the spike.' },
      ],
      correct: 0,
      modelAnswer: [
        'The pump is an enzyme that breaks down ATP and exchanges internal Na+ for external K+, three Na+ out and two K+ in per cycle.',
        'It keeps Na+ high outside and K+ high inside, the gradients that the channels then use. It removes one net positive charge per cycle, a small direct effect on Vm.',
      ],
    },
    {
      id: 'q05',
      difficulty: 'easy',
      type: 'mc',
      prompt: 'A neuron is firing at 10 Hz in response to injected current. The current is increased. What happens?',
      options: [
        { text: 'The firing frequency increases; each action potential keeps the same size', feedback: 'Correct. All-or-none spikes, rate coding.' },
        { text: 'Each action potential becomes taller', feedback: 'Spike size is fixed once threshold is reached.' },
        { text: 'The action potentials become longer', feedback: 'Duration is set by the channels, about 2 ms.' },
        { text: 'Nothing changes', feedback: 'The rate rises with current up to the refractory limit.' },
      ],
      correct: 0,
      modelAnswer: [
        'An individual action potential is all-or-none: above threshold it has a fixed amplitude and duration.',
        'A larger depolarizing current makes the first spike come sooner and raises the firing frequency. Stimulus strength is coded in rate, up to about 1000 Hz set by the absolute refractory period.',
      ],
    },

    // Medium -------------------------------------------------------------
    {
      id: 'q06',
      difficulty: 'medium',
      type: 'label',
      prompt: 'Label the numbered parts of the action potential waveform.',
      hotspots: { svg: AP_WAVEFORM.svg, alt: 'An action potential trace with the resting level and 0 mV marked.', aspect: AP_WAVEFORM.aspect, regions: AP_WAVEFORM.regions, gutter: 'all', layout: 'stack', labelPool: ['Absolute refractory period', 'Equilibrium potential'] },
      modelAnswer: [
        'Resting potential: about -65 mV before the stimulus.',
        'Threshold: the depolarization at which enough Na+ channels open for Na+ permeability to win, about -55 mV.',
        'Rising phase: Na+ influx, Vm shoots toward ENa.',
        'Overshoot: the peak above 0 mV, near but below ENa.',
        'Falling phase: Na+ channels inactivate, K+ channels open, K+ efflux repolarizes.',
        'Undershoot: extra gK holds Vm below rest until the K+ channels close.',
      ],
    },
    {
      id: 'q07',
      difficulty: 'medium',
      type: 'order',
      prompt: 'Put the events of one action potential in order, starting from rest.',
      items: [
        'Voltage-gated K+ channels open and K+ leaves; the membrane repolarizes',
        'Depolarization reaches threshold and voltage-gated Na+ channels open',
        'Na+ channels inactivate',
        'Na+ influx drives Vm toward ENa; the overshoot',
        'Vm undershoots toward EK until the K+ channels close',
        'Na+ channels deinactivate as the membrane returns to a negative potential',
      ],
      correctOrder: [1, 3, 2, 0, 4, 5],
      modelAnswer: [
        'Threshold is the point where enough Na+ channels open for Na+ permeability to dominate.',
        'Open Na+ channels let Na+ in; the depolarization opens more channels, so Vm runs toward ENa and overshoots 0 mV.',
        'After about 1 ms each open Na+ channel inactivates, which stops the inward current.',
        'The K+ channels, triggered about 1 ms earlier, are now open; K+ leaves and Vm falls back.',
        'While they stay open gK is above rest, so Vm undershoots toward EK.',
        'Only once the membrane is negative again do the Na+ channels deinactivate and become available for the next spike.',
      ],
    },
    {
      id: 'q08',
      difficulty: 'medium',
      type: 'mc',
      prompt: 'Which statement correctly matches a method with what it controls and measures?',
      options: [
        { text: 'Voltage clamp holds Vm constant and measures the current crossing the membrane', feedback: 'Correct.' },
        { text: 'Voltage clamp injects a fixed current and measures the resulting Vm', feedback: 'That is intracellular recording with current injection.' },
        { text: 'Patch clamp measures the summed current of all channels in the cell', feedback: 'The patch holds one or a few channels; the whole-membrane current is what the voltage clamp of an axon measures.' },
        { text: 'Intracellular recording measures the current through a single channel', feedback: 'That is single-channel patch clamp.' },
      ],
      correct: 0,
      modelAnswer: [
        'Intracellular recording with a stimulating electrode controls the injected current and measures Vm: graded responses, threshold, spike timing and rate.',
        'Voltage clamp controls Vm and measures the current needed to hold it, which equals the membrane current; from this the conductance changes are deduced.',
        'Single-channel patch clamp controls Vm of a tiny patch and measures the current through one channel: unitary conductance, open time and open probability.',
      ],
    },
    {
      id: 'q09',
      difficulty: 'medium',
      type: 'essay',
      prompt: 'An axon is voltage clamped at -65 mV and stepped to 0 mV. Describe the current that is recorded and explain what produces the early and the late component.',
      points: 3,
      markScheme: [
        { points: 1, text: 'Describes the record: an early, brief inward current followed by a delayed, sustained outward current.' },
        { points: 1, text: 'Attributes the early inward current to rapid activation of voltage-gated Na+ channels and Na+ influx, which then stops because the channels inactivate.' },
        { points: 1, text: 'Attributes the delayed outward current to voltage-gated K+ channels that open more slowly and stay open, carrying K+ out (TTX removes the first, a K+ channel blocker the second).' },
      ],
      modelAnswer: [
        'The step depolarizes the membrane, and the clamp records first a brief inward current and then a larger, slower outward current that lasts as long as the step.',
        'The early inward current is Na+ entering through voltage-gated Na+ channels, which open almost at once; it fades within a millisecond because the channels inactivate.',
        'The delayed outward current is K+ leaving through voltage-gated K+ channels, which open about 1 ms after the step and stay open while the membrane is depolarized.',
        'Blocking Na+ channels with TTX leaves only the outward current; blocking K+ channels leaves only the inward one, which is how the two were separated.',
      ],
    },
    {
      id: 'q10',
      difficulty: 'hard',
      type: 'calc',
      prompt: 'A neuron has [K+]in = 100 mM and [K+]out = 5 mM at 37 C. A researcher raises extracellular K+ to 20 mM; the inside does not change during the short experiment. Calculate EK after the change (the value before is -80 mV).',
      given: [
        { symbol: '[K+]in', value: 100, unit: 'mM' },
        { symbol: '[K+]out', value: 20, unit: 'mM' },
        { symbol: 'T', value: 37, unit: 'C' },
        { symbol: 'z', value: 1, unit: '' },
      ],
      answer: { value: -43, tolerance: 1.5, unit: 'mV' },
      steps: [
        { text: 'Write the Nernst equation at 37 C.', math: 'EK = (61.54 mV / z) * log10([K+]out / [K+]in)' },
        { text: 'Substitute the new concentrations.', math: 'EK = 61.54 * log10(20 / 100) = 61.54 * log10(0.2)' },
        { text: 'Evaluate the logarithm.', math: 'log10(0.2) = -0.699' },
        { text: 'Multiply.', math: 'EK = 61.54 * (-0.699) = -43.0 mV' },
        { text: 'Compare with before.', math: 'before: 61.54 * log10(5 / 100) = 61.54 * (-1.301) = -80.1 mV' },
      ],
      modelAnswer: [
        'EK rises from about -80 mV to about -43 mV. The K+ gradient is smaller, so a smaller voltage balances it.',
        'Because the resting membrane is mostly permeable to K+, the resting potential follows EK and depolarizes by roughly 30 mV, without needing another equation.',
      ],
    },

    // Hard ---------------------------------------------------------------
    {
      id: 'q11',
      difficulty: 'hard',
      type: 'calc',
      prompt: 'Use the textbook concentrations ([K+]o 5, [K+]i 100, [Na+]o 150, [Na+]i 15 mM, 37 C). At rest PK : PNa = 40 : 1 gives Vm = -65 mV. During the rising phase the ratio flips to PK : PNa = 1 : 20. Predict Vm with the Goldman equation.',
      given: [
        { symbol: 'PK', value: 1, unit: '' },
        { symbol: 'PNa', value: 20, unit: '' },
        { symbol: '[K+]o / [K+]i', value: '5 / 100', unit: 'mM' },
        { symbol: '[Na+]o / [Na+]i', value: '150 / 15', unit: 'mM' },
      ],
      answer: { value: 54, tolerance: 2, unit: 'mV' },
      steps: [
        { text: 'Write the Goldman equation for K+ and Na+ at 37 C.', math: 'Vm = 61.54 mV * log10( (PK[K]o + PNa[Na]o) / (PK[K]i + PNa[Na]i) )' },
        { text: 'Substitute.', math: 'Vm = 61.54 * log10( (1*5 + 20*150) / (1*100 + 20*15) )' },
        { text: 'Evaluate numerator and denominator.', math: '(5 + 3000) / (100 + 300) = 3005 / 400 = 7.51' },
        { text: 'Take the logarithm and multiply.', math: 'log10(7.51) = 0.876;  Vm = 61.54 * 0.876 = +53.9 mV' },
        { text: 'Check against the limits.', math: 'EK = -80 mV, ENa = +62 mV: Vm sits near ENa because Na+ now dominates' },
      ],
      modelAnswer: [
        'Vm jumps from -65 mV to about +54 mV. When PNa exceeds PK the Na+ terms dominate both sums, so Vm moves close to ENa (+62 mV) without reaching it.',
        'This is the rising phase and overshoot in one calculation: flipping the relative permeability flips the membrane potential.',
      ],
    },
    {
      id: 'q12',
      difficulty: 'hard',
      type: 'mc',
      prompt: 'During the falling phase Vm = -20 mV, EK = -80 mV and gK = 2 mS per cm2. Predict the K+ current.',
      options: [
        { text: 'IK = 2 x (-20 - (-80)) = +120 uA per cm2, an outward current that drives Vm toward EK', feedback: 'Correct. Positive means outward for a cation; the current takes Vm toward EK.' },
        { text: 'IK = 2 x (-80 - (-20)) = -120 uA per cm2, an inward current', feedback: 'The driving force is Vm - EK, not EK - Vm. K+ flows out of a depolarized cell.' },
        { text: 'Zero, because K+ is at equilibrium', feedback: 'Vm is 60 mV away from EK; the driving force is large.' },
        { text: 'IK = 2 x (-20) = -40 uA per cm2, an inward current', feedback: 'The driving force is measured from EK, not from 0 mV.' },
      ],
      correct: 0,
      modelAnswer: [
        'I_ion = g_ion (Vm - E_ion). Driving force = -20 - (-80) = +60 mV.',
        'IK = 2 mS/cm2 x 60 mV = 120 uA/cm2. The positive sign means outward: K+ leaves the cell, which moves Vm toward EK, exactly what repolarization needs.',
        'The same channels at rest (Vm = -65) would carry only 2 x 15 = 30 uA/cm2, and at EK nothing.',
      ],
    },
    {
      id: 'q13',
      difficulty: 'hard',
      type: 'essay',
      prompt: 'Explain why the resting membrane potential sits close to, but not at, the potassium equilibrium potential. In your answer state what question the Nernst equation answers and what different question the Goldman-Hodgkin-Katz equation answers, and show with the textbook numbers how each is used.',
      points: 6,
      markScheme: [
        { points: 1, text: 'States that the resting membrane is much more permeable to K+ than to any other ion, so K+ has the strongest influence and Vm lies near EK.' },
        { points: 1, text: 'Explains the gap: a small resting Na+ permeability (a steady Na+ leak) pulls Vm from EK (-80 mV) up toward ENa, giving about -65 mV.' },
        { points: 1, text: 'Nernst: calculates the equilibrium potential of one ion from its concentration ratio, charge and temperature; contains no permeability term.' },
        { points: 1, text: 'Shows the Nernst calculation for K+: 61.54 mV x log10(5 / 100) = -80 mV.' },
        { points: 1, text: 'GHK: estimates Vm from the concentrations and relative permeabilities of several ions, each weighted by its permeability, cations out over in and anions reversed. Shows the calculation with PK : PNa = 40 : 1: 61.54 x log10(350 / 4015) = -65 mV.' },
        { points: 1, text: 'Predicts the consequence: raising PNa moves Vm toward ENa (the rising phase), raising PK moves it back toward EK.' },
      ],
      modelAnswer: [
        'At rest the membrane has many open K+ channels and very few open Na+ channels, so its permeability to K+ is about 40 times its permeability to Na+. The most permeant ion has the strongest hold on Vm, so Vm lies close to EK.',
        'It does not reach EK because the small Na+ permeability lets a steady trickle of Na+ in. That leak pulls Vm from -80 mV toward ENa, to about -65 mV. (Other permeant ions such as Cl- add small shifts.)',
        'The Nernst equation answers one question: at what voltage would one ion be at equilibrium, given its concentrations, its charge and the temperature? It has no permeability term, so E_ion exists even for an ion whose channels are shut.',
        'For K+: EK = (61.54 mV / 1) x log10(5 / 100) = 61.54 x (-1.3) = -80 mV.',
        'The GHK equation answers a different question: what is the actual membrane potential when several ions are permeant? Each ion enters weighted by its permeability, cations with the outside concentration on top and anions the other way round.',
        'With PK : PNa = 40 : 1, Vm = 61.54 x log10((40 x 5 + 1 x 150) / (40 x 100 + 1 x 15)) = 61.54 x log10(350 / 4015) = -65 mV, the observed value. If PNa rose, the Na+ terms would grow and Vm would move toward +62 mV.',
      ],
    },
    {
      id: 'q14',
      difficulty: 'hard',
      type: 'essay',
      prompt: 'Explain how local currents, the absolute and relative refractory periods, axon diameter and myelin together determine how fast an action potential travels and in which direction. Finish by predicting what happens to conduction in a demyelinated axon.',
      points: 6,
      markScheme: [
        { points: 1, text: 'Local currents: Na+ entry at the active patch spreads positive charge along the inside of the axon and depolarizes the membrane ahead to threshold, where the spike is regenerated (so it keeps its size).' },
        { points: 1, text: 'Direction: charge spreads both ways, but the membrane just behind is in its absolute refractory period (Na+ channels inactivated) and cannot fire, so the spike moves forward only; the relative refractory period means the trailing membrane needs a stronger stimulus, which further prevents reversal.' },
        { points: 1, text: 'Diameter: a wider axon has lower internal resistance, so the local current spreads farther ahead and brings distant membrane to threshold sooner; conduction velocity rises with diameter.' },
        { points: 1, text: 'Myelin: the glial wrap insulates the internode so current does not leak out; the depolarization reaches the next node faster and farther.' },
        { points: 1, text: 'Nodes of Ranvier: voltage-gated Na+ channels are concentrated at the nodes, so the spike is regenerated only there and jumps node to node (saltatory conduction).' },
        { points: 1, text: 'Prediction: after demyelination current leaks out of the bare internode, the next node reaches threshold late or not at all, so conduction slows or fails, as in multiple sclerosis.' },
      ],
      modelAnswer: [
        'When a patch of axon fires, Na+ enters and makes the inside locally positive. This charge spreads along the inside as a local current and depolarizes the neighbouring membrane; when that reaches threshold its own Na+ channels open and regenerate a full-size spike, so the signal is renewed patch by patch instead of fading.',
        'The local current spreads in both directions, but the membrane just behind the spike is absolutely refractory because its Na+ channels are inactivated, and during the relative refractory period that follows it would need a much stronger stimulus. Only the membrane ahead can fire, so the spike travels one way, normally from soma to terminals.',
        'Speed depends on how far ahead the local current reaches. In a wider axon the resistance along the inside is lower, so more current flows forward instead of leaking out, distant membrane reaches threshold sooner and velocity rises with diameter (the squid giant axon is the extreme case).',
        'Myelin achieves the same without a fat axon. The sheath insulates the internodes, so almost no current leaks across the membrane and the depolarization spreads quickly to the next node.',
        'Voltage-gated Na+ channels are concentrated at the nodes of Ranvier, 0.2 to 2 mm apart, so the spike is regenerated only at the nodes and skips between them: saltatory conduction, much faster than the continuous conduction of an unmyelinated axon.',
        'If the myelin is lost, current leaks out through the bare internode. The next node is depolarized more slowly and may never reach threshold, so conduction slows or fails altogether. That is the basis of the slowed visual and nerve responses in multiple sclerosis and Guillain-Barre syndrome.',
      ],
    },
    {
      id: 'q15',
      difficulty: 'hard',
      type: 'mc',
      prompt: 'Three neurons are altered. A: voltage-gated Na+ channels cannot open, gradients normal. B: extracellular K+ greatly increased, channels normal. C: sodium-potassium pumps blocked. Which neuron shows a problem immediately, and which one gets progressively worse with time?',
      options: [
        { text: 'A and B fail immediately (A cannot fire, B is depolarized at once); C worsens gradually as the gradients run down', feedback: 'Correct. Channel and concentration changes act at once; loss of the pump shows only as the gradients dissipate.' },
        { text: 'C fails immediately because the pump makes the action potential; A and B worsen slowly', feedback: 'The pump does not make the spike. Its loss only matters once the gradients have run down.' },
        { text: 'Only A has a problem; B and C are unaffected because their channels work', feedback: 'B is depolarized straight away because EK has moved, and C loses its gradients over time.' },
        { text: 'All three fail immediately in the same way', feedback: 'A keeps a normal resting potential; C is initially normal and declines with time.' },
      ],
      correct: 0,
      modelAnswer: [
        'Neuron A: the resting potential depends on the K+ leak and the pump, not on voltage-gated Na+ channels, so rest is normal, but without Na+ channel opening no action potential can be generated. The defect is in spike generation and appears immediately.',
        'Neuron B: raising [K+]o moves EK toward 0 mV; because the resting membrane is mostly permeable to K+, Vm depolarizes at once. The sustained depolarization also inactivates Na+ channels, so both rest and firing are affected immediately.',
        'Neuron C: the pump only maintains the gradients over time. Right after the block the concentrations are still normal, so both rest and spikes are normal; as Na+ and K+ gradients dissipate over minutes to hours, the resting potential decays and spikes become smaller and then fail. Both are affected, progressively.',
      ],
    },
  ],
};
