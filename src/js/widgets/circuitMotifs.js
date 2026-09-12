// Circuit motif picker. Radios choose a motif; the drawing shows the
// cells and connections (triangle = excitatory pyramidal cell, circle =
// inhibitory interneuron, arrowhead = excitatory synapse, filled dot =
// inhibitory synapse), the selected motif's connections in the accent
// colour. Descriptions come from props.
//
// props: {
//   motifs: [{ key, label, body, steps: [..], cells: [{ id, kind: 'E'|'I', label, x, y }],
//              links: [{ from, to, type: 'exc'|'inh', input?: true }] }],
//   labels: { motif, legend },
// }

import { el } from '../dom.js';
import { svgIn, radioRow, readout, MUTED, ACCENT, INK, FONT, nextId } from './d3util.js';

const W = 560;
const H = 260;

function cellShape(g, cell) {
  const node = g.append('g').attr('transform', `translate(${cell.x},${cell.y})`);
  if (cell.kind === 'E') node.append('path').attr('d', 'M0,-24 L24,18 L-24,18 Z').attr('fill', 'var(--c-surface)').attr('stroke', INK).attr('stroke-width', 1.5);
  else node.append('circle').attr('r', 20).attr('fill', 'var(--c-surface)').attr('stroke', INK).attr('stroke-width', 1.5);
  node.append('text').attr('y', cell.kind === 'E' ? 12 : 4).attr('text-anchor', 'middle').attr('fill', INK).attr('font-size', FONT - 1).attr('font-weight', 600).text(cell.label);
  return node;
}

function endpoint(from, to, r) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const d = Math.hypot(dx, dy) || 1;
  return { x: to.x - (dx / d) * r, y: to.y - (dy / d) * r, ux: dx / d, uy: dy / d };
}

function draw(container, motif) {
  const svg = svgIn(container, W, H);
  const g = svg.append('g');
  const byId = Object.fromEntries(motif.cells.map((c) => [c.id, c]));
  for (const link of motif.links) {
    const to = byId[link.to];
    const from = link.input ? { x: to.x - 170, y: to.y } : byId[link.from];
    const e = endpoint(from, to, to.kind === 'E' ? 36 : 27);
    const color = link.focus ? ACCENT : INK;
    g.append('line').attr('x1', link.input ? from.x + 30 : from.x).attr('y1', from.y).attr('x2', e.x).attr('y2', e.y).attr('stroke', color).attr('stroke-width', link.focus ? 2.5 : 1.5);
    if (link.type === 'exc') {
      g.append('path').attr('d', `M${e.x},${e.y} l${-e.ux * 10 - e.uy * 5},${-e.uy * 10 + e.ux * 5} L${e.x - e.ux * 10 + e.uy * 5},${e.y - e.uy * 10 - e.ux * 5} Z`).attr('fill', color);
    } else {
      g.append('circle').attr('cx', e.x).attr('cy', e.y).attr('r', 6).attr('fill', color);
    }
    if (link.input && link.label) g.append('text').attr('x', from.x + 30).attr('y', from.y - 8).attr('fill', MUTED).attr('font-size', FONT - 1).text(link.label);
  }
  for (const cell of motif.cells) cellShape(g, cell);
  if (motif.note) g.append('text').attr('x', W - 8).attr('y', H - 8).attr('text-anchor', 'end').attr('fill', MUTED).attr('font-size', FONT - 1).text(motif.note);
  return svg.node();
}

export const circuitMotifs = {
  fallback(props) {
    const holder = document.createElement('div');
    draw(holder, props.motifs[0]);
    return holder.innerHTML;
  },

  mount(container, props) {
    const L = props.labels || {};
    const plot = el('div', { class: 'plot' });
    const info = readout([[L.motif || 'Motif'], [L.sequence || 'What happens']]);
    function show(key) {
      const motif = props.motifs.find((m) => m.key === key);
      plot.replaceChildren();
      draw(plot, motif);
      info.set(0, [el('strong', {}, motif.label), el('span', { class: 'demo-note' }, ` ${motif.body || ''}`)]);
      info.set(1, [el('ol', { class: 'demo-steps' }, (motif.steps || []).map((s) => el('li', {}, s)))]);
    }
    const radios = radioRow(L.motif || 'Motif', nextId('motif'), props.motifs.map((m) => ({ value: m.key, label: m.label })), props.motifs[0].key, show);
    const legend = el('p', { class: 'demo-note demo-legend' }, L.legend || '');
    container.replaceChildren(plot, legend, el('div', { class: 'widget-controls' }, [radios]), info.node);
    show(props.motifs[0].key);
  },
};
