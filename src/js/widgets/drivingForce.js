// Driving force explorer. Pick the channel's selectivity (which sets
// the reversal potential) and set Vm; the I-V line shows the synaptic
// current at that voltage, and a small trace shows whether the
// resulting potential is an EPSP, an IPSP or nothing. Excitatory means
// the reversal potential lies above threshold; inhibitory, below.
//
// props: {
//   channels: [{ key, label, erev, body }],
//   threshold: -55,
//   labels: { channel, vm, current, inward, outward, none, effect, epsp, ipsp, noChange, drivingForce, reversal },
// }

import { el } from '../dom.js';
import { svgIn, rangeAxisBottom, rangeAxisLeft, refLine, sliderRow, radioRow, readout, halo, scaleLinear, d3line, fmt0, fmt1, MUTED, ACCENT, INK, FONT, nextId } from './d3util.js';

const W = 640;
const H = 280;
const M = { top: 16, right: 30, bottom: 34, left: 56 };
const G = 1; // conductance, arbitrary units (nS)

function draw(container, props) {
  const L = props.labels || {};
  const thr = props.threshold ?? -55;
  const svg = svgIn(container, W, H);
  const g = svg.append('g');
  // Left: I-V plot. Right: PSP trace.
  const xl = scaleLinear().domain([-100, 80]).range([M.left, W * 0.58]);
  const yl = scaleLinear().domain([-160, 160]).range([H - M.bottom, M.top]);
  rangeAxisBottom(g, xl, [-100, -50, 0, 50], H - M.bottom, (v) => String(v), 'mV');
  rangeAxisLeft(g, yl, [-150, 0, 150], M.left, (v) => String(v), L.currentUnit || 'pA');
  refLine(g, xl(-100), xl(80), yl(0), '');
  g.append('line').attr('x1', xl(thr)).attr('x2', xl(thr)).attr('y1', yl(160)).attr('y2', yl(-160)).attr('stroke', MUTED).attr('stroke-dasharray', '2 3');
  g.append('text').attr('x', xl(thr)).attr('y', yl(160) - 4).attr('text-anchor', 'middle').attr('fill', MUTED).attr('font-size', FONT - 2).text(L.threshold || 'threshold');
  const ivLine = g.append('path').attr('fill', 'none').attr('stroke', INK).attr('stroke-width', 1.5);
  const erevDot = g.append('circle').attr('r', 3.5).attr('fill', 'none').attr('stroke', MUTED).attr('stroke-width', 1.5);
  const erevText = g.append('text').attr('fill', MUTED).attr('font-size', FONT - 1);
  const dot = g.append('circle').attr('r', 5).attr('fill', ACCENT);
  const dfLine = g.append('line').attr('stroke', ACCENT).attr('stroke-width', 1).attr('stroke-dasharray', '3 2');
  const dotText = halo(g.append('text').attr('fill', INK).attr('font-weight', 600).attr('font-size', FONT));
  g.append('text').attr('x', xl(-10)).attr('y', H - 4).attr('text-anchor', 'middle').attr('fill', MUTED).attr('font-size', FONT - 1).text(L.vmAxis || 'Vm');

  const xr = scaleLinear().domain([0, 20]).range([W * 0.68, W - M.right]);
  const yr = scaleLinear().domain([-30, 30]).range([H - M.bottom, M.top + 20]);
  rangeAxisBottom(g, xr, [0, 10, 20], H - M.bottom, (v) => String(v), 'ms');
  const restLine = g.append('line').attr('x1', xr(0)).attr('x2', xr(20)).attr('stroke', MUTED).attr('stroke-dasharray', '3 3');
  const restText = g.append('text').attr('fill', MUTED).attr('font-size', FONT - 2);
  const trace = g.append('path').attr('fill', 'none').attr('stroke', ACCENT).attr('stroke-width', 2);
  const traceTitle = g.append('text').attr('x', xr(0)).attr('y', M.top + 6).attr('fill', MUTED).attr('font-size', FONT - 1).text(L.traceTitle || '');
  const effectText = g.append('text').attr('x', xr(10)).attr('y', M.top + 22).attr('text-anchor', 'middle').attr('fill', INK).attr('font-weight', 600).attr('font-size', FONT);

  function update({ vm, channel }) {
    const erev = channel.erev;
    const i = G * (vm - erev);
    ivLine.attr('d', d3line().x((d) => xl(d)).y((d) => yl(Math.max(-160, Math.min(160, G * (d - erev)))))([-100, 80]));
    erevDot.attr('cx', xl(erev)).attr('cy', yl(0));
    erevText.attr('x', xl(erev)).attr('y', yl(0) + 16).attr('text-anchor', 'middle').text(`${L.reversal || 'E_rev'} ${fmt0(erev)}`);
    const ic = Math.max(-160, Math.min(160, i));
    dot.attr('cx', xl(vm)).attr('cy', yl(ic));
    dfLine.attr('x1', xl(vm)).attr('x2', xl(vm)).attr('y1', yl(0)).attr('y2', yl(ic));
    dotText.attr('x', xl(vm) + (vm > 30 ? -8 : 8)).attr('text-anchor', vm > 30 ? 'end' : 'start').attr('y', yl(ic) + (ic >= 0 ? -10 : 16)).text(`${fmt0(i)} ${L.currentUnit || 'pA'}`);
    // PSP trace: change in Vm proportional to minus the current (inward = depolarising), clipped.
    const amp = Math.max(-30, Math.min(30, -i * 0.2));
    const pts = [];
    for (let t = 0; t <= 20; t += 0.1) {
      const dt = t - 2;
      const k = dt < 0 ? 0 : (1 - Math.exp(-dt / 0.8)) * Math.exp(-dt / 5);
      pts.push([t, amp * k * 1.55]);
    }
    trace.attr('d', d3line().x((d) => xr(d[0])).y((d) => yr(Math.max(-30, Math.min(30, d[1]))))(pts));
    restLine.attr('y1', yr(0)).attr('y2', yr(0));
    restText.attr('x', xr(20)).attr('y', yr(0) - 6).attr('text-anchor', 'end').text(`${fmt0(vm)} mV`);
    let effect = 'none';
    if (Math.abs(i) < 0.5) effect = 'none';
    else if (erev > (props.threshold ?? -55)) effect = i < 0 ? 'epsp' : 'ipsp-toward';
    else effect = i < 0 ? 'epsp-weak' : 'ipsp';
    effectText.text({ epsp: L.epsp || 'EPSP', ipsp: L.ipsp || 'IPSP', none: L.noChange || 'no change', 'epsp-weak': L.epspWeak || 'depolarising, but toward a sub-threshold value', 'ipsp-toward': L.ipspToward || 'repolarising toward E_rev' }[effect]);
    return { i, erev, effect };
  }
  return { update };
}

export const drivingForce = {
  fallback(props) {
    const holder = document.createElement('div');
    draw(holder, props).update({ vm: -65, channel: props.channels[0] });
    return holder.innerHTML;
  },

  mount(container, props) {
    const L = props.labels || {};
    const state = { vm: -65, channel: props.channels[0] };
    const plot = el('div', { class: 'plot' });
    const c = draw(plot, props);
    const info = readout([[L.channel || 'Channel'], [L.drivingForce || 'Driving force'], [L.current || 'Current'], [L.effect || 'Effect']]);
    function refresh() {
      const r = c.update(state);
      const df = state.vm - r.erev;
      info.set(0, [el('strong', {}, state.channel.label), el('span', { class: 'demo-note' }, ` ${state.channel.body || ''}`)]);
      info.set(1, [el('strong', {}, `Vm - E_rev = ${fmt0(state.vm)} - (${fmt0(r.erev)}) = ${fmt0(df)} mV`)]);
      info.set(2, [el('strong', {}, `I = g (Vm - E_rev) = ${fmt1(r.i)} ${L.currentUnit || 'pA'}`), el('span', { class: 'demo-note' }, ` ${r.i < -0.5 ? L.inward || 'inward' : r.i > 0.5 ? L.outward || 'outward' : L.none || 'none'}`)]);
      const eff = { epsp: L.epspNote, ipsp: L.ipspNote, none: L.noneNote, 'epsp-weak': L.epspWeakNote, 'ipsp-toward': L.ipspTowardNote }[r.effect];
      info.set(3, [el('strong', {}, r.erev > (props.threshold ?? -55) ? L.excitatory || 'excitatory synapse' : L.inhibitory || 'inhibitory synapse'), el('span', { class: 'demo-note' }, eff ? ` ${eff}` : '')]);
    }
    const slider = sliderRow(L.vm || 'Membrane potential', { min: -100, max: 60, step: 1, value: -65, unit: 'mV' }, (v) => { state.vm = v; refresh(); });
    const radios = radioRow(L.channel || 'Channel', nextId('df'), props.channels.map((ch) => ({ value: ch.key, label: ch.label })), props.channels[0].key, (k) => { state.channel = props.channels.find((ch) => ch.key === k); refresh(); });
    container.replaceChildren(plot, el('div', { class: 'widget-controls' }, [radios, slider]), info.node);
    refresh();
  },
};
