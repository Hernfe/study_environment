// Adaptation of skin mechanoreceptors (L06, slide 11 and HW3 2B.2): a
// probe presses into the skin, is held, and is lifted. Three afferents
// are drawn on one time axis: a Pacinian afferent with its capsule, the
// same ending with the capsule stripped away, and a Merkel afferent.
// Each row shows the receptor potential (thin line) and the spikes it
// triggers (ticks). Sliders set how long the probe is held and how deep.
//
// Model (illustrative, not fitted): the intact Pacinian ending responds
// to the rate of change of indentation (the capsule passes change and
// filters out steady pressure), so it fires at the onset and the
// offset. Stripped, it follows the indentation itself and the response
// decays slowly (Figure 12.5b). The Merkel ending follows the
// indentation with a partial decay to a sustained level: slowly
// adapting. Spike rate grows with the receptor potential above a
// threshold; spikes come from a deterministic integrator, so the raster
// is stable while sliders move.
//
// props: {
//   initial: { hold: 1.2, depth: 0.7 },
//   rows: [{ key: 'pacinian' | 'stripped' | 'merkel', label, sub }],
//   labels: { hold, depth, shallow, deep, probe, time, onset, during, removal,
//             spikes, rapid, slow, adaptation, note },
// }

import { el } from '../dom.js';
import { svgIn, sliderRow, readout, scaleLinear, rangeAxisBottom, halo, MUTED, ACCENT, INK, BORDER, FONT } from './d3util.js';

const W = 670;
const T_END = 3.0;
const T_ON = 0.4;
const DT = 0.001;

function indentation(t, hold, depth) {
  const ramp = 0.02;
  const off = T_ON + hold;
  if (t < T_ON || t > off + ramp) return 0;
  if (t < T_ON + ramp) return (depth * (t - T_ON)) / ramp;
  if (t <= off) return depth;
  return depth * (1 - (t - off) / ramp);
}

// Receptor potential of one afferent type, arbitrary units 0..1.
export function receptorPotential(kind, hold, depth) {
  const n = Math.round(T_END / DT);
  const out = new Float64Array(n);
  let hp = 0;
  let prev = 0;
  let decay = 0;
  for (let i = 0; i < n; i += 1) {
    const t = i * DT;
    const s = indentation(t, hold, depth);
    const ds = (s - prev) / DT;
    prev = s;
    if (kind === 'pacinian') {
      // Rectified rate of change, smoothed with a 12 ms time constant.
      const drive = Math.min(1.4, Math.abs(ds) * 0.03);
      hp += (drive - hp) * (DT / 0.012);
      out[i] = hp;
    } else if (kind === 'stripped') {
      // Follows the indentation; decays with a 0.9 s time constant.
      if (s > 0) decay = t - T_ON; else decay = 0;
      out[i] = s * Math.exp(-decay / 0.9);
    } else {
      // Merkel: partial decay to a sustained level.
      if (s > 0) decay = t - T_ON; else decay = 0;
      out[i] = s * (0.5 + 0.5 * Math.exp(-decay / 0.25));
    }
  }
  return out;
}

export function spikesFrom(r, { threshold = 0.12, gain = 260, max = 220 } = {}) {
  const out = [];
  let phase = 0.5;
  for (let i = 0; i < r.length; i += 1) {
    const rate = Math.min(max, Math.max(0, (r[i] - threshold) * gain));
    phase += rate * DT;
    if (phase >= 1) {
      phase -= 1;
      out.push(i * DT);
    }
  }
  return out;
}

function draw(container, props) {
  const L = props.labels || {};
  const rows = props.rows || [];
  const rowH = 64;
  const X0 = 150;
  const X1 = 640;
  const yProbe = 30;
  const yRow = (k) => 86 + k * rowH;
  const H = yRow(rows.length) + 20;
  const svg = svgIn(container, W, H);
  const x = scaleLinear().domain([0, T_END]).range([X0, X1]);
  const g = svg.append('g');
  g.append('text').attr('x', X0 - 12).attr('y', yProbe).attr('dy', '0.35em').attr('text-anchor', 'end').attr('font-size', FONT - 1).attr('fill', INK).text(L.probe || 'Probe');
  const probe = g.append('path').attr('fill', 'none').attr('stroke', INK).attr('stroke-width', 1.5);
  const marks = g.append('g');
  const rowSel = rows.map((row, k) => {
    const y0 = yRow(k);
    g.append('text').attr('x', X0 - 12).attr('y', y0 - 6).attr('text-anchor', 'end').attr('font-size', FONT - 1).attr('fill', INK).text(row.label);
    if (row.sub) g.append('text').attr('x', X0 - 12).attr('y', y0 + 9).attr('text-anchor', 'end').attr('font-size', FONT - 2).attr('fill', MUTED).text(row.sub);
    g.append('line').attr('x1', X0).attr('x2', X1).attr('y1', y0 + 18).attr('y2', y0 + 18).attr('stroke', BORDER);
    return {
      row,
      pot: g.append('path').attr('fill', 'none').attr('stroke', MUTED).attr('stroke-width', 1),
      ticks: g.append('g'),
      y0,
    };
  });
  rangeAxisBottom(g, x, [0, 1, 2, 3], H - 16, (v) => v, L.time || 's');

  function update(hold, depth) {
    const pts = [];
    for (let t = 0; t <= T_END + 1e-9; t += 0.005) pts.push([x(t), yProbe + 12 - 26 * indentation(t, hold, depth)]);
    probe.attr('d', `M${pts.map((p) => p.map((v) => v.toFixed(1)).join(',')).join('L')}`);
    marks.selectAll('*').remove();
    for (const t of [T_ON, T_ON + hold]) {
      marks.append('line').attr('x1', x(t)).attr('x2', x(t)).attr('y1', yProbe + 16).attr('y2', H - 22).attr('stroke', BORDER).attr('stroke-dasharray', '1 4');
    }
    halo(marks.append('text').attr('x', (x(T_ON) + x(T_ON + hold)) / 2).attr('y', yProbe - 18).attr('text-anchor', 'middle').attr('font-size', FONT - 2).attr('fill', MUTED).text(L.held || 'held'));
    const counts = [];
    for (const rs of rowSel) {
      const r = receptorPotential(rs.row.key, hold, depth);
      const p = [];
      for (let i = 0; i < r.length; i += 5) p.push(`${x(i * DT).toFixed(1)},${(rs.y0 + 16 - 26 * Math.min(1.2, r[i])).toFixed(1)}`);
      rs.pot.attr('d', `M${p.join('L')}`);
      const spikes = spikesFrom(r);
      rs.ticks.selectAll('*').remove();
      for (const t of spikes) rs.ticks.append('line').attr('x1', x(t)).attr('x2', x(t)).attr('y1', rs.y0 - 12).attr('y2', rs.y0 + 18).attr('stroke', ACCENT).attr('stroke-width', 1.3);
      const off = T_ON + hold;
      counts.push({
        row: rs.row,
        onset: spikes.filter((t) => t >= T_ON && t < T_ON + 0.15).length,
        during: spikes.filter((t) => t >= T_ON + 0.15 && t < off).length,
        removal: spikes.filter((t) => t >= off && t < off + 0.2).length,
      });
    }
    return counts;
  }
  return { update };
}

export const adaptationDemo = {
  fallback(props) {
    const holder = document.createElement('div');
    const init = props.initial || {};
    draw(holder, props).update(init.hold ?? 1.2, init.depth ?? 0.7);
    return holder.innerHTML;
  },

  mount(container, props) {
    const L = props.labels || {};
    const init = props.initial || {};
    let hold = init.hold ?? 1.2;
    let depth = init.depth ?? 0.7;
    const plot = el('div', { class: 'plot' });
    const c = draw(plot, props);
    const rows = props.rows || [];
    const info = readout(rows.map((r) => [r.label + (r.sub ? ` (${r.sub})` : '')]));
    function refresh() {
      const counts = c.update(hold, depth);
      counts.forEach((k, i) => {
        info.set(i, `${L.onset || 'onset'} ${k.onset}, ${L.during || 'held'} ${k.during}, ${L.removal || 'removal'} ${k.removal} ${L.spikes || 'spikes'}`);
      });
    }
    const holdRow = sliderRow(L.hold || 'Probe held for', { min: 0.3, max: 2.2, step: 0.1, value: hold, unit: 's', fmt: (v) => v.toFixed(1) }, (v) => { hold = v; refresh(); });
    const depthRow = sliderRow(L.depth || 'Indentation depth', { min: 0.3, max: 1, step: 0.05, value: depth, fmt: (v) => (v < 0.5 ? L.shallow || 'shallow' : v < 0.8 ? L.medium || 'medium' : L.deep || 'deep') }, (v) => { depth = v; refresh(); });
    const note = L.note ? el('p', { class: 'demo-legend' }, L.note) : null;
    container.replaceChildren(plot, el('div', { class: 'widget-controls' }, [holdRow, depthRow]), info.node, note);
    refresh();
  },
};
