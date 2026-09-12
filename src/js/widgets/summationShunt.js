// Summation and shunting demo. A passive membrane (leak to -65 mV)
// receives excitatory synaptic conductance pulses. Controls: how many
// synapses fire together (spatial summation), how many times one
// synapse fires and at what interval (temporal summation), and a
// chloride conductance near rest that shunts the EPSP. The soma
// voltage is integrated with a simple RC model, so the numbers are
// consistent with I = g (Vm - E).
//
// props: {
//   threshold: -55,
//   labels: { synapses, pulses, interval, shunt, peak, threshold, reached, notReached, time, vm },
// }

import { el } from '../dom.js';
import { svgIn, rangeAxisBottom, rangeAxisLeft, refLine, sliderRow, checkRow, readout, scaleLinear, d3line, fmt1, MUTED, ACCENT, INK, FONT } from './d3util.js';

const W = 640;
const H = 280;
const M = { top: 16, right: 90, bottom: 30, left: 56 };
const TOTAL = 60;      // ms
const DT = 0.05;
const EL = -65;
const ECL = -65;
const ESYN = 0;
const GL = 1;          // leak conductance, relative units
const GSYN = 0.25;     // peak conductance of one synapse
const GCL = 4;         // shunt conductance when the inhibitory synapse is open
const C = 10;          // membrane time constant = C / GL = 10 ms

function simulate({ synapses, pulses, interval, shunt }) {
  const times = [];
  for (let k = 0; k < pulses; k += 1) times.push(5 + k * interval);
  const out = [];
  let v = EL;
  for (let t = 0; t <= TOTAL + 1e-9; t += DT) {
    let gs = 0;
    for (const t0 of times) {
      const dt = t - t0;
      if (dt >= 0) gs += GSYN * synapses * (dt / 1.5) * Math.exp(1 - dt / 1.5); // alpha function, peak at 1.5 ms
    }
    const gcl = shunt && t >= 3 ? GCL : 0;
    const dv = (-GL * (v - EL) - gs * (v - ESYN) - gcl * (v - ECL)) / C;
    out.push({ t, v, gs, gcl });
    v += dv * DT;
  }
  return out;
}

function draw(container, props) {
  const L = props.labels || {};
  const thr = props.threshold ?? -55;
  const svg = svgIn(container, W, H);
  const x = scaleLinear().domain([0, TOTAL]).range([M.left, W - M.right]);
  const y = scaleLinear().domain([-70, -40]).range([H - M.bottom, M.top]);
  const g = svg.append('g');
  rangeAxisLeft(g, y, [-65, -55, -45], M.left, (v) => String(v), 'mV');
  rangeAxisBottom(g, x, [0, 20, 40, 60], H - M.bottom, (v) => String(v), 'ms');
  refLine(g, x(0), x(TOTAL), y(EL), `${L.rest || 'rest'} ${EL}`, { dy: 7 });
  refLine(g, x(0), x(TOTAL), y(thr), `${L.threshold || 'threshold'} ${thr}`, { dy: -7 });
  const shade = g.append('rect').attr('fill', MUTED).attr('opacity', 0.08);
  const path = g.append('path').attr('fill', 'none').attr('stroke', ACCENT).attr('stroke-width', 2);
  const ref = g.append('path').attr('fill', 'none').attr('stroke', MUTED).attr('stroke-width', 1.5).attr('stroke-dasharray', '4 3');
  const peakDot = g.append('circle').attr('r', 4).attr('fill', ACCENT);
  const peakText = g.append('text').attr('fill', INK).attr('font-weight', 600).attr('font-size', FONT);
  const shuntText = g.append('text').attr('fill', MUTED).attr('font-size', FONT - 2);

  function update(state) {
    const s = simulate(state);
    path.attr('d', d3line().x((d) => x(d.t)).y((d) => y(Math.max(-70, Math.min(-40, d.v))))(s));
    if (state.shunt) {
      const s0 = simulate({ ...state, shunt: false });
      ref.attr('d', d3line().x((d) => x(d.t)).y((d) => y(Math.max(-70, Math.min(-40, d.v))))(s0)).attr('opacity', 1);
      shade.attr('x', x(3)).attr('y', M.top).attr('width', x(TOTAL) - x(3)).attr('height', H - M.bottom - M.top);
      shuntText.attr('x', x(3) + 4).attr('y', M.top + 10).text(L.shuntOn || '');
    } else {
      ref.attr('opacity', 0);
      shade.attr('width', 0);
      shuntText.text('');
    }
    const peak = s.reduce((a, b) => (b.v > a.v ? b : a));
    peakDot.attr('cx', x(peak.t)).attr('cy', y(Math.min(-40, peak.v)));
    peakText.attr('x', x(peak.t) + 8).attr('y', y(Math.min(-40, peak.v)) - 6).text(`${fmt1(peak.v)} mV`);
    return { peak: peak.v, reached: peak.v >= thr };
  }
  return { update };
}

export const summationShunt = {
  fallback(props) {
    const holder = document.createElement('div');
    draw(holder, props).update({ synapses: 1, pulses: 1, interval: 10, shunt: false });
    return holder.innerHTML;
  },

  mount(container, props) {
    const L = props.labels || {};
    const state = { synapses: 1, pulses: 1, interval: 10, shunt: false };
    const plot = el('div', { class: 'plot' });
    const c = draw(plot, props);
    const info = readout([[L.peak || 'Peak depolarization'], [L.threshold || 'Threshold']]);
    function refresh() {
      const r = c.update(state);
      info.set(0, [el('strong', {}, `${fmt1(r.peak)} mV`), el('span', { class: 'demo-note' }, ` (${fmt1(r.peak - EL)} mV ${L.aboveRest || 'above rest'})`)]);
      info.set(1, [el('strong', {}, r.reached ? L.reached || 'reached' : L.notReached || 'not reached'), el('span', { class: 'demo-note' }, ` ${r.reached ? L.reachedNote || '' : L.notReachedNote || ''}`)]);
    }
    const s1 = sliderRow(L.synapses || 'Synapses active together', { min: 1, max: 6, step: 1, value: 1 }, (v) => { state.synapses = v; refresh(); });
    const s2 = sliderRow(L.pulses || 'Spikes at each synapse', { min: 1, max: 4, step: 1, value: 1 }, (v) => { state.pulses = v; refresh(); });
    const s3 = sliderRow(L.interval || 'Interval between spikes', { min: 2, max: 30, step: 1, value: 10, unit: 'ms' }, (v) => { state.interval = v; refresh(); });
    const chk = checkRow(L.shunt || 'Open Cl- channels near the soma (ECl = -65 mV)', false, (v) => { state.shunt = v; refresh(); });
    container.replaceChildren(plot, el('div', { class: 'widget-controls' }, [s1, s2, s3, el('div', { class: 'widget-radios' }, [chk])]), info.node);
    refresh();
  },
};
