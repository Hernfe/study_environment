// Synapse timeline. A step slider walks through chemical transmission
// at a schematic synapse: action potential arrival, Ca2+ entry, SNARE
// fusion, release and diffusion, receptor binding, removal. A delay
// counter shows the time since the spike reached the terminal. The
// drawing is schematic (d3 shapes); every word comes from props.
//
// props: {
//   steps: [{ key, label, body, time }],   // time in ms since arrival
//   labels: { step, delay, terminal, cleft, postsynaptic },
// }

import { el } from '../dom.js';
import { svgIn, sliderRow, readout, MUTED, ACCENT, INK, BORDER, FONT } from './d3util.js';

const W = 560;
const H = 300;

function draw(container, props) {
  const L = props.labels || {};
  const svg = svgIn(container, W, H);
  const g = svg.append('g');
  // Presynaptic terminal (rounded bulb), cleft, postsynaptic membrane.
  g.append('path').attr('d', 'M170,20 C120,20 90,80 90,140 C90,190 130,205 200,205 L360,205 C430,205 470,190 470,140 C470,80 440,20 390,20 Z').attr('fill', 'none').attr('stroke', INK).attr('stroke-width', 1.5);
  g.append('line').attr('x1', 60).attr('x2', 500).attr('y1', 240).attr('y2', 240).attr('stroke', INK).attr('stroke-width', 1.5);
  g.append('text').attr('x', 280).attr('y', 62).attr('text-anchor', 'middle').attr('fill', MUTED).attr('font-size', FONT - 1).text(L.terminal || '');
  g.append('text').attr('x', 505).attr('y', 226).attr('fill', MUTED).attr('font-size', FONT - 1).text(L.cleft || '');
  g.append('text').attr('x', 100).attr('y', 270).attr('fill', MUTED).attr('font-size', FONT - 1).text(L.postsynaptic || '');

  // Action potential marker travelling down the axon (top).
  const ap = g.append('path').attr('d', 'M0,0 l6,-22 l6,22').attr('fill', 'none').attr('stroke', ACCENT).attr('stroke-width', 2);
  // Voltage-gated Ca2+ channels at the active zone.
  const ca = [220, 340].map((x) => g.append('rect').attr('x', x - 6).attr('y', 196).attr('width', 12).attr('height', 16).attr('rx', 2).attr('fill', 'var(--c-surface)').attr('stroke', INK).attr('stroke-width', 1.2));
  const caIons = g.append('g');
  // Vesicles: three docked, one reserve.
  const vesicles = [[250, 165], [280, 172], [310, 165], [270, 110]].map(([x, y]) => g.append('circle').attr('cx', x).attr('cy', y).attr('r', 14).attr('fill', 'none').attr('stroke', INK).attr('stroke-width', 1.2));
  const fusing = g.append('path').attr('fill', 'none').attr('stroke', ACCENT).attr('stroke-width', 2);
  const cloud = g.append('g');
  // Receptors on the postsynaptic membrane.
  const receptors = [240, 280, 320].map((x) => g.append('rect').attr('x', x - 7).attr('y', 232).attr('width', 14).attr('height', 18).attr('rx', 3).attr('fill', 'var(--c-surface)').attr('stroke', INK).attr('stroke-width', 1.2));
  const removal = g.append('g');
  const snare = g.append('g');

  function update(i) {
    const stage = Math.max(0, Math.min(5, i));
    ap.attr('transform', `translate(${stage === 0 ? 300 : 268},${stage === 0 ? 30 : 40})`).attr('opacity', stage <= 1 ? 1 : 0.25);
    ca.forEach((r) => r.attr('fill', stage >= 1 && stage <= 3 ? ACCENT : 'var(--c-surface)'));
    caIons.selectAll('*').remove();
    if (stage >= 1 && stage <= 3) {
      [[220, 180], [232, 172], [340, 180], [328, 172], [226, 160]].forEach(([x, y]) => caIons.append('circle').attr('cx', x).attr('cy', y).attr('r', 2.5).attr('fill', ACCENT));
    }
    snare.selectAll('*').remove();
    vesicles.forEach((v, k) => v.attr('stroke', k < 3 && stage >= 2 && stage <= 3 ? ACCENT : INK).attr('opacity', k === 1 && stage >= 3 ? 0 : 1));
    if (stage >= 2 && stage <= 3) {
      [[250, 179], [310, 179]].forEach(([x, y]) => snare.append('path').attr('d', `M${x - 8},${y} q8,14 16,0`).attr('fill', 'none').attr('stroke', ACCENT).attr('stroke-width', 1.5));
    }
    fusing.attr('d', stage >= 3 ? 'M266,190 C270,205 274,212 280,212 C286,212 290,205 294,190' : '').attr('opacity', stage === 3 ? 1 : 0.3);
    cloud.selectAll('*').remove();
    if (stage >= 3 && stage <= 5) {
      const pts = stage === 3 ? [[280, 216], [276, 222], [284, 222]] : stage === 4 ? [[252, 226], [262, 220], [280, 224], [298, 220], [310, 227], [270, 232], [292, 232]] : [[230, 214], [340, 216], [280, 218]];
      pts.forEach(([x, y]) => cloud.append('circle').attr('cx', x).attr('cy', y).attr('r', 2.5).attr('fill', stage === 5 ? MUTED : ACCENT));
    }
    receptors.forEach((r) => r.attr('fill', stage === 4 ? ACCENT : 'var(--c-surface)'));
    removal.selectAll('*').remove();
    if (stage === 5) {
      removal.append('path').attr('d', 'M230,214 l-18,-16').attr('stroke', MUTED).attr('stroke-width', 1.5).attr('marker-end', 'none');
      removal.append('path').attr('d', 'M340,216 l20,-16').attr('stroke', MUTED).attr('stroke-width', 1.5);
      removal.append('text').attr('x', 372).attr('y', 200).attr('fill', MUTED).attr('font-size', FONT - 2).text(L.removal || '');
    }
    return stage;
  }
  return { update };
}

export const synapseTimeline = {
  fallback(props) {
    const holder = document.createElement('div');
    draw(holder, props).update(2);
    return holder.innerHTML;
  },

  mount(container, props) {
    const L = props.labels || {};
    const steps = props.steps || [];
    const plot = el('div', { class: 'plot' });
    const c = draw(plot, props);
    const info = readout([[L.step || 'Step'], [L.delay || 'Time since arrival']]);
    function refresh(i) {
      const stage = c.update(i);
      const s = steps[stage] || {};
      info.set(0, [el('strong', {}, s.label || ''), el('span', { class: 'demo-note' }, ` ${s.body || ''}`)]);
      info.set(1, [el('strong', {}, s.time === undefined ? '' : `${s.time} ms`), el('span', { class: 'demo-note' }, s.timeNote ? ` ${s.timeNote}` : '')]);
    }
    const slider = sliderRow(L.scrub || 'Step', { min: 0, max: Math.max(0, steps.length - 1), step: 1, value: 0, fmt: (v) => `${v + 1} / ${steps.length}` }, refresh);
    container.replaceChildren(plot, el('div', { class: 'widget-controls' }, [slider]), info.node);
    refresh(0);
  },
};
