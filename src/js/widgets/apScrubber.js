// Action potential scrubber. A Hodgkin-Huxley spike with a time slider:
// the cursor shows the phase, the state of the voltage-gated Na+ and
// K+ channels, the two conductances and which refractory period
// applies. All names and explanations come from props.
//
// props: {
//   phases: { rest, threshold, rising, overshoot, falling, undershoot, return: { label, body } },
//   naStates: { closed, open, inactivated, recovering: { label, body } },
//   kStates: { closed, open: { label, body } },
//   refractory: { absolute, relative, none: { label, body } },
//   labels: { time, vm, gNa, gK, phase, na, k, refractory, threshold, rest, conductance },
// }

import { el } from '../dom.js';
import { simulateCurrentClamp, HH } from './hhModel.js';
import { svgIn, rangeAxisBottom, rangeAxisLeft, refLine, sliderRow, readout, halo, scaleLinear, d3line, fmt1, MUTED, ACCENT, INK, FONT } from './d3util.js';

const THRESHOLD = -55;
const W = 680;
const H1 = 240;
const H2 = 140;
const M = { top: 16, right: 80, bottom: 30, left: 50 };
const TOTAL = 8;

let cache = null;
function samples() {
  if (!cache) {
    const s = simulateCurrentClamp({ total: TOTAL });
    cache = annotate(s);
  }
  return cache;
}

// Mark every sample with phase, channel states and refractory period.
function annotate(s) {
  const stimStart = 0.8;
  const thr = s.find((d) => d.t > stimStart && d.v >= THRESHOLD);
  const peak = s.reduce((a, b) => (b.v > a.v ? b : a));
  const backAtRest = s.find((d) => d.t > peak.t && d.v <= HH.rest);
  const after = s.filter((d) => backAtRest && d.t > backAtRest.t);
  const trough = after.length ? after.reduce((a, b) => (b.v < a.v ? b : a)) : null;
  const recovered = trough ? s.find((d) => d.t > trough.t && d.v >= HH.rest - 5) : null;
  const absEnd = s.find((d) => thr && d.t > peak.t && d.v < -50 && d.h > 0.15);
  const relEnd = s.find((d) => absEnd && d.t > absEnd.t && d.h > 0.55 && d.n ** 4 < 0.02);
  for (const d of s) {
    let phase = 'rest';
    if (d.t >= stimStart && (!thr || d.t < thr.t)) phase = 'threshold';
    else if (thr && d.t >= thr.t && d.t < peak.t) phase = d.v >= 0 ? 'overshoot' : 'rising';
    else if (d.t >= peak.t && backAtRest && d.t < backAtRest.t) phase = d.v >= 0 ? 'overshoot' : 'falling';
    else if (backAtRest && d.t >= backAtRest.t && (!recovered || d.t < recovered.t)) phase = 'undershoot';
    else if (recovered && d.t >= recovered.t) phase = 'return';
    d.phase = phase;
    const open = d.m ** 3 * d.h;
    if (open > 0.03) d.na = 'open';
    else if (d.h < 0.3) d.na = 'inactivated';
    else if (d.h < 0.55 && thr && d.t > peak.t) d.na = 'recovering';
    else d.na = 'closed';
    d.k = d.n ** 4 > 0.12 ? 'open' : 'closed';
    if (thr && d.t >= thr.t && (!absEnd || d.t < absEnd.t)) d.ref = 'absolute';
    else if (absEnd && d.t >= absEnd.t && (!relEnd || d.t < relEnd.t)) d.ref = 'relative';
    else d.ref = 'none';
  }
  return s;
}

function draw(container, L) {
  const s = samples();
  const H = H1 + H2;
  const svg = svgIn(container, W, H);
  const x = scaleLinear().domain([0, TOTAL]).range([M.left, W - M.right]);
  const yv = scaleLinear().domain([-90, 50]).range([H1 - M.bottom, M.top]);
  const gmax = Math.max(...s.map((d) => Math.max(d.gNa, d.gK)));
  const yg = scaleLinear().domain([0, gmax]).range([H - M.bottom, H1 + 8]);
  const g = svg.append('g');

  // Voltage panel: reference lines for rest, threshold and 0 mV, then the trace.
  refLine(g, x(0), x(TOTAL), yv(0), '0 mV');
  refLine(g, x(0), x(TOTAL), yv(THRESHOLD), `${L.threshold || 'threshold'} ${THRESHOLD}`, { dy: -7 });
  refLine(g, x(0), x(TOTAL), yv(HH.rest), `${L.rest || 'rest'} ${HH.rest}`, { dy: 7 });
  rangeAxisLeft(g, yv, [-80, -40, 0, 40], M.left, (v) => String(v), 'mV');
  g.append('path').attr('d', d3line().x((d) => x(d.t)).y((d) => yv(d.v))(s)).attr('fill', 'none').attr('stroke', INK).attr('stroke-width', 1.5);

  // Conductance panel: two lines, labelled at their peaks.
  rangeAxisLeft(g, yg, [0, Math.round(gmax)], M.left, (v) => String(v), 'mS/cm2');
  rangeAxisBottom(g, x, [0, 2, 4, 6, 8], H - M.bottom, (v) => String(v), 'ms');
  const lineNa = d3line().x((d) => x(d.t)).y((d) => yg(d.gNa));
  const lineK = d3line().x((d) => x(d.t)).y((d) => yg(d.gK));
  g.append('path').attr('d', lineNa(s)).attr('fill', 'none').attr('stroke', INK).attr('stroke-width', 1.5);
  g.append('path').attr('d', lineK(s)).attr('fill', 'none').attr('stroke', MUTED).attr('stroke-width', 1.5).attr('stroke-dasharray', '4 2');
  const pNa = s.reduce((a, b) => (b.gNa > a.gNa ? b : a));
  const pK = s.reduce((a, b) => (b.gK > a.gK ? b : a));
  g.append('text').attr('x', x(pNa.t) - 6).attr('y', yg(pNa.gNa) - 4).attr('text-anchor', 'end').attr('fill', INK).attr('font-size', FONT - 1).text(L.gNa || 'gNa');
  g.append('text').attr('x', x(pK.t) + 8).attr('y', yg(pK.gK) - 4).attr('fill', MUTED).attr('font-size', FONT - 1).text(L.gK || 'gK');

  // Cursor.
  const cursor = g.append('g');
  cursor.append('line').attr('y1', M.top).attr('y2', H - M.bottom).attr('stroke', ACCENT).attr('stroke-width', 1);
  const dotV = cursor.append('circle').attr('r', 4.5).attr('fill', ACCENT);
  const dotNa = cursor.append('circle').attr('r', 3.5).attr('fill', ACCENT);
  const dotK = cursor.append('circle').attr('r', 3.5).attr('fill', 'none').attr('stroke', ACCENT).attr('stroke-width', 1.5);
  const vText = halo(cursor.append('text').attr('fill', INK).attr('font-weight', 600).attr('font-size', FONT));

  function update(t) {
    const i = Math.min(s.length - 1, Math.round((t / TOTAL) * (s.length - 1)));
    const d = s[i];
    cursor.attr('transform', `translate(${x(d.t)},0)`);
    dotV.attr('cy', yv(d.v));
    dotNa.attr('cy', yg(d.gNa));
    dotK.attr('cy', yg(d.gK));
    const left = d.t > TOTAL * 0.7;
    vText.attr('x', left ? -10 : 10).attr('text-anchor', left ? 'end' : 'start').attr('y', yv(d.v) - 10).text(`${fmt1(d.v)} mV`);
    return d;
  }
  return { update };
}

export const apScrubber = {
  fallback(props) {
    const holder = document.createElement('div');
    const c = draw(holder, props.labels || {});
    c.update(1.6);
    return holder.innerHTML;
  },

  mount(container, props) {
    const L = props.labels || {};
    const plot = el('div', { class: 'plot' });
    const c = draw(plot, L);
    const info = readout([[L.phase || 'Phase'], [L.na || 'Na+ channels'], [L.k || 'K+ channels'], [L.conductance || 'Conductances'], [L.refractory || 'Refractory period']]);
    const entry = (map, key) => {
      const item = (map || {})[key] || { label: key, body: '' };
      return [el('strong', {}, item.label), item.body ? el('span', { class: 'demo-note' }, ` ${item.body}`) : null].filter(Boolean);
    };
    function refresh(t) {
      const d = c.update(t);
      info.set(0, entry(props.phases, d.phase));
      info.set(1, entry(props.naStates, d.na));
      info.set(2, entry(props.kStates, d.k));
      info.set(3, [el('span', {}, `${L.gNa || 'gNa'} ${fmt1(d.gNa)}, ${L.gK || 'gK'} ${fmt1(d.gK)} mS/cm2`)]);
      info.set(4, entry(props.refractory, d.ref));
    }
    const slider = sliderRow(L.time || 'Time', { min: 0, max: TOTAL, step: 0.02, value: 1.6, unit: 'ms', fmt: (v) => v.toFixed(2) }, refresh);
    container.replaceChildren(plot, el('div', { class: 'widget-controls' }, [slider]), info.node);
    refresh(1.6);
  },
};
