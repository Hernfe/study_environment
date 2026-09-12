// Conduction demo. Three axons side by side (thin unmyelinated, thick
// unmyelinated, myelinated); a time slider moves the action potential
// along each one. The myelinated axon jumps from node to node. A radio
// picks where the axon is stimulated (one end or the middle), which
// shows that an axon conducts both ways from the point of stimulation.
//
// props: {
//   length: 30,                       // mm
//   maxTime: 20,                      // ms
//   axons: [{ key, label, thickness (px), velocity (mm per ms), internode?: mm }],
//   labels: { time, stimulate, end, middle, distance, front, arrived, refractory, active, node },
// }

import { el } from '../dom.js';
import { svgIn, rangeAxisBottom, sliderRow, radioRow, readout, scaleLinear, fmt1, MUTED, ACCENT, INK, BORDER, FONT, nextId } from './d3util.js';

const W = 680;
const ROW = 64;
const M = { left: 16, right: 24, top: 10, bottom: 32 };
const LABEL_W = 180;
const SPIKE_MS = 2;   // length of membrane engaged by one spike, in ms of travel
const REFR_MS = 5;    // refractory tail behind it, in ms of travel

function draw(container, props) {
  const L = props.labels || {};
  const axons = props.axons || [];
  const length = props.length || 30;
  const H = M.top + axons.length * ROW + M.bottom;
  const svg = svgIn(container, W, H);
  const x = scaleLinear().domain([0, length]).range([M.left + LABEL_W, W - M.right]);
  const g = svg.append('g');
  rangeAxisBottom(g, x, [0, length / 2, length], H - M.bottom + 8, (v) => String(v), 'mm');

  const rows = axons.map((a, i) => {
    const cy = M.top + i * ROW + ROW / 2;
    const row = g.append('g');
    row.append('text').attr('x', M.left).attr('y', cy - 12).attr('fill', INK).attr('font-size', FONT).attr('font-weight', 600).text(a.label);
    row.append('text').attr('x', M.left).attr('y', cy + 4).attr('fill', MUTED).attr('font-size', FONT - 1).text(a.sub || '');
    // The axon: a bar of the given thickness; refractory and active
    // segments are drawn over it.
    row.append('rect').attr('x', x(0)).attr('y', cy - a.thickness / 2).attr('width', x(length) - x(0)).attr('height', a.thickness).attr('fill', BORDER).attr('rx', a.thickness / 2);
    const refr = [row.append('rect').attr('fill', MUTED).attr('opacity', 0.5), row.append('rect').attr('fill', MUTED).attr('opacity', 0.5)];
    const active = [row.append('rect').attr('fill', ACCENT), row.append('rect').attr('fill', ACCENT)];
    let nodes = null;
    if (a.internode) {
      // Myelin: thick segments with gaps at the nodes.
      const n = Math.floor(length / a.internode);
      nodes = [];
      for (let k = 0; k <= n; k += 1) {
        const start = k * a.internode;
        const end = Math.min(length, start + a.internode);
        if (k < n) row.append('rect').attr('x', x(start) + 3).attr('y', cy - a.thickness / 2 - 4).attr('width', x(end) - x(start) - 6).attr('height', a.thickness + 8).attr('fill', 'none').attr('stroke', MUTED).attr('stroke-width', 1.5).attr('rx', 4);
        nodes.push(row.append('circle').attr('cx', x(start)).attr('cy', cy).attr('r', 4).attr('fill', 'var(--c-surface)').attr('stroke', MUTED).attr('stroke-width', 1.5));
      }
    }
    const marker = [row.append('circle').attr('r', 5).attr('fill', ACCENT).attr('cy', cy), row.append('circle').attr('r', 5).attr('fill', ACCENT).attr('cy', cy)];
    const text = row.append('text').attr('y', cy - a.thickness / 2 - (a.internode ? 12 : 8)).attr('fill', INK).attr('font-size', FONT - 1).attr('text-anchor', 'middle');
    return { a, cy, refr, active, marker, nodes, text };
  });

  function place(rect, a, cy, from, to) {
    if (to <= from) { rect.attr('width', 0); return; }
    rect.attr('x', x(from)).attr('y', cy - a.thickness / 2).attr('width', x(to) - x(from)).attr('height', a.thickness);
  }

  function update({ t, origin }) {
    return rows.map(({ a, cy, refr, active, marker, nodes, text }) => {
      const start = origin === 'middle' ? length / 2 : 0;
      const dist = a.velocity * t;
      const fronts = origin === 'middle' ? [start + dist, start - dist] : [start + dist, null];
      const span = a.velocity * SPIKE_MS;
      const tail = a.velocity * REFR_MS;
      if (nodes) nodes.forEach((n) => n.attr('fill', 'var(--c-surface)'));
      let frontPos = null;
      fronts.forEach((f, k) => {
        if (f === null) { marker[k].attr('opacity', 0); place(active[k], a, cy, 0, 0); place(refr[k], a, cy, 0, 0); return; }
        const dir = k === 0 ? 1 : -1;
        let fp = f;
        if (nodes) fp = start + dir * Math.floor(Math.abs(f - start) / a.internode) * a.internode;
        const inside = fp >= 0 && fp <= length && t > 0;
        marker[k].attr('opacity', inside ? 1 : 0).attr('cx', x(Math.max(0, Math.min(length, fp))));
        const lo = dir > 0 ? f - span : f;
        const hi = dir > 0 ? f : f + span;
        const rlo = dir > 0 ? f - span - tail : f + span;
        const rhi = dir > 0 ? f - span : f + span + tail;
        if (nodes) {
          // Saltatory: only the nodes are active or refractory; the
          // internodes carry current without regenerating.
          place(active[k], a, cy, 0, 0);
          place(refr[k], a, cy, 0, 0);
          if (t > 0) nodes.forEach((n, j) => {
            const pos = j * a.internode;
            const behindStart = dir > 0 ? pos >= start : pos <= start;
            if (!behindStart) return;
            if (pos >= lo && pos <= hi) n.attr('fill', ACCENT);
            else if (pos >= rlo && pos <= rhi) n.attr('fill', MUTED);
          });
        } else {
          place(active[k], a, cy, Math.max(0, Math.min(length, lo)), Math.max(0, Math.min(length, hi)));
          place(refr[k], a, cy, Math.max(0, Math.min(length, rlo)), Math.max(0, Math.min(length, rhi)));
        }
        if (t === 0) { marker[k].attr('opacity', 0); place(active[k], a, cy, 0, 0); place(refr[k], a, cy, 0, 0); }
        if (k === 0) frontPos = fp;
      });
      const arrived = origin === 'middle' ? dist >= length / 2 : dist >= length;
      const shown = Math.min(length, Math.max(0, frontPos ?? 0));
      text.attr('x', x(shown)).text(t === 0 ? '' : arrived ? `${L.arrived || 'arrived'} ${fmt1(origin === 'middle' ? (length / 2) / a.velocity : length / a.velocity)} ms` : `${fmt1(shown)} mm`);
      return { key: a.key, dist, arrived };
    });
  }
  return { update };
}

export const conductionDemo = {
  fallback(props) {
    const holder = document.createElement('div');
    draw(holder, props).update({ t: 4, origin: 'end' });
    return holder.innerHTML;
  },

  mount(container, props) {
    const L = props.labels || {};
    const state = { t: 4, origin: 'end' };
    const plot = el('div', { class: 'plot' });
    const c = draw(plot, props);
    const info = readout(props.axons.map((a) => [a.label]));
    function refresh() {
      const r = c.update(state);
      r.forEach((row, i) => {
        const a = props.axons[i];
        const covered = Math.min(state.origin === 'middle' ? (props.length || 30) / 2 : props.length || 30, row.dist);
        info.set(i, [el('strong', {}, `${a.velocity} mm/ms`), el('span', { class: 'demo-note' }, ` ${L.front || 'front'} ${fmt1(covered)} mm ${L.after || 'after'} ${fmt1(state.t)} ms`)]);
      });
    }
    const slider = sliderRow(L.time || 'Time', { min: 0, max: props.maxTime || 20, step: 0.1, value: state.t, unit: 'ms', fmt: (v) => v.toFixed(1) }, (v) => { state.t = v; refresh(); });
    const origin = radioRow(L.stimulate || 'Stimulate', nextId('cond'), [{ value: 'end', label: L.end || 'at one end' }, { value: 'middle', label: L.middle || 'in the middle' }], 'end', (v) => { state.origin = v; refresh(); });
    container.replaceChildren(plot, el('div', { class: 'widget-controls' }, [slider, origin]), info.node);
    refresh();
  },
};
