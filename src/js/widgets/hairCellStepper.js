// Hair cell transduction stepper. A step slider walks through Figure
// 11.15: the stereocilia bend toward the tallest one, the tip link
// stretches, the mechanically gated (MET) channel opens, K+ enters from
// the endolymph, the cell depolarizes, voltage-gated Ca2+ channels open,
// glutamate is released and the spiral ganglion neurite fires. The
// endolymph and perilymph potentials and the cell's state are shown
// throughout. The drawing is schematic (d3 shapes); every word and every
// number comes from props.
//
// props: {
//   steps: [{ label, body }],              // 7 steps, rest first
//   labels: { step, endolymph, perilymph, endoPotential, periPotential,
//             cell, cellRest, cellDepol, tipLink, met, caChannel, vesicles,
//             neurite, spikes, tallest, state, scrub },
// }

import { el } from '../dom.js';
import { svgIn, sliderRow, readout, MUTED, ACCENT, INK, BORDER, FONT, halo } from './d3util.js';

const W = 600;
const H = 360;
const K = '#b4541a';     // K+ ions, a warm ink distinct from the accent
const CA = ACCENT;

function draw(container, props) {
  const L = props.labels || {};
  const svg = svgIn(container, W, H);

  // Fluids: endolymph above the reticular lamina, perilymph below.
  svg.append('rect').attr('x', 0).attr('y', 0).attr('width', W).attr('height', 120).attr('fill', ACCENT).attr('opacity', 0.07);
  svg.append('line').attr('x1', 0).attr('x2', W).attr('y1', 120).attr('y2', 120).attr('stroke', INK).attr('stroke-width', 1.5);
  halo(svg.append('text').attr('x', 10).attr('y', 20).attr('fill', INK).attr('font-weight', 600).text(L.endolymph || 'Endolymph'));
  svg.append('text').attr('x', 10).attr('y', 38).attr('fill', MUTED).attr('font-size', FONT - 1).text(L.endoPotential || '');
  halo(svg.append('text').attr('x', 10).attr('y', 140).attr('fill', INK).attr('font-weight', 600).text(L.perilymph || 'Perilymph'));
  svg.append('text').attr('x', 10).attr('y', 158).attr('fill', MUTED).attr('font-size', FONT - 1).text(L.periPotential || '');

  // Cell body below the lamina.
  const body = svg.append('path')
    .attr('d', 'M230,120 L230,250 C230,300 270,318 300,318 C330,318 370,300 370,250 L370,120')
    .attr('stroke', INK).attr('stroke-width', 1.5);
  const cellText = halo(svg.append('text').attr('x', 300).attr('y', 196).attr('text-anchor', 'middle').attr('font-weight', 600));

  // Three stereocilia in a staircase, pivoting at their base.
  const cilia = [
    { x: 268, h: 52 },
    { x: 300, h: 72 },
    { x: 332, h: 92 },
  ];
  const ciliaG = svg.append('g');
  const ciliaNodes = cilia.map((c) => ciliaG.append('rect').attr('x', c.x - 6).attr('width', 12).attr('rx', 6).attr('fill', 'var(--c-surface)').attr('stroke', INK).attr('stroke-width', 1.3));
  const tipLinks = [0, 1].map(() => svg.append('line').attr('stroke-width', 2));
  const channels = [0, 1].map(() => svg.append('rect').attr('width', 10).attr('height', 8).attr('rx', 2).attr('stroke', INK).attr('stroke-width', 1));
  const arrow = svg.append('g');
  const tipText = svg.append('text').attr('fill', MUTED).attr('font-size', FONT - 1);
  const ions = svg.append('g');

  // Base: Ca2+ channel, vesicles, synapse onto the neurite.
  const caCh = svg.append('rect').attr('x', 252).attr('y', 266).attr('width', 12).attr('height', 16).attr('rx', 2).attr('stroke', INK).attr('stroke-width', 1.2);
  svg.append('text').attr('x', 220).attr('y', 270).attr('text-anchor', 'end').attr('fill', MUTED).attr('font-size', FONT - 1).text(L.caChannel || '');
  const vesicles = [[290, 292], [312, 296], [301, 276]].map(([cx, cy]) => svg.append('circle').attr('cx', cx).attr('cy', cy).attr('r', 7).attr('fill', 'none').attr('stroke', INK).attr('stroke-width', 1.2));
  const release = svg.append('g');
  svg.append('path').attr('d', 'M300,326 C300,336 290,342 280,348 L180,348').attr('fill', 'none').attr('stroke', INK).attr('stroke-width', 2);
  svg.append('text').attr('x', 175).attr('y', 352).attr('text-anchor', 'end').attr('fill', MUTED).attr('font-size', FONT - 1).text(L.neurite || '');
  const spikes = svg.append('g');

  // Text marks on the right.
  svg.append('text').attr('x', 384).attr('y', 30).attr('fill', MUTED).attr('font-size', FONT - 1).text(L.tallest || '');

  function update(stage) {
    const tilt = stage >= 1 ? 16 : 0;   // degrees toward the tallest
    const stretched = stage >= 2;
    const open = stage >= 3;
    const depol = stage >= 4;
    cilia.forEach((c, i) => {
      ciliaNodes[i].attr('y', 120 - c.h).attr('height', c.h).attr('transform', `rotate(${tilt},${c.x},120)`);
    });
    // Tip link from the top of each shorter stereocilium to the side of
    // its taller neighbour; the channel sits at the lower end.
    const tip = (i, frac) => {
      const c = cilia[i];
      const a = (tilt * Math.PI) / 180;
      const len = c.h * frac;
      return [c.x + len * Math.sin(a), 120 - len * Math.cos(a)];
    };
    [0, 1].forEach((i) => {
      const [x1, y1] = tip(i, 1);
      const [x2, y2] = tip(i + 1, stretched ? 0.86 : 0.9);
      tipLinks[i].attr('x1', x1).attr('y1', y1).attr('x2', x2).attr('y2', y2)
        .attr('stroke', stretched ? ACCENT : MUTED).attr('stroke-dasharray', stretched ? null : '2 2');
      channels[i].attr('x', x1 - 5).attr('y', y1 - 2).attr('transform', `rotate(${tilt},${x1},${y1})`)
        .attr('fill', open ? K : 'var(--c-surface)');
    });
    arrow.selectAll('*').remove();
    if (stage >= 1) {
      arrow.append('path').attr('d', 'M268,8 L360,8').attr('stroke', ACCENT).attr('stroke-width', 2);
      arrow.append('path').attr('d', 'M352,3 L362,8 L352,13').attr('fill', 'none').attr('stroke', ACCENT).attr('stroke-width', 2);
    }
    tipText.attr('x', 384).attr('y', 50).text(stretched ? (L.tipLink || '') : '');
    ions.selectAll('*').remove();
    if (open) {
      [[262, 60], [292, 46], [272, 92], [300, 104], [286, 140], [310, 168]].forEach(([cx, cy], k) => {
        if (stage === 3 && k > 1) return;
        ions.append('text').attr('x', cx).attr('y', cy).attr('fill', K).attr('font-size', FONT - 1).attr('font-weight', 600).text('K+');
      });
    }
    body.attr('fill', depol ? 'var(--c-accent-soft)' : 'var(--c-surface)');
    cellText.text(depol ? (L.cellDepol || '') : (L.cellRest || '')).attr('fill', depol ? ACCENT : MUTED);
    caCh.attr('fill', stage >= 5 ? CA : 'var(--c-surface)');
    release.selectAll('*').remove();
    if (stage >= 5) {
      [[262, 258], [270, 252], [276, 262]].forEach(([cx, cy]) => release.append('circle').attr('cx', cx).attr('cy', cy).attr('r', 2.5).attr('fill', CA));
    }
    vesicles.forEach((v, k) => v.attr('stroke', stage >= 6 ? ACCENT : INK).attr('opacity', stage >= 6 && k === 0 ? 0.25 : 1));
    if (stage >= 6) {
      [[296, 324], [304, 322], [300, 330]].forEach(([cx, cy]) => release.append('circle').attr('cx', cx).attr('cy', cy).attr('r', 2).attr('fill', ACCENT));
    }
    spikes.selectAll('*').remove();
    if (stage >= 6) {
      [206, 218, 226, 238, 246].forEach((sx) => spikes.append('line').attr('x1', sx).attr('x2', sx).attr('y1', 336).attr('y2', 348).attr('stroke', ACCENT).attr('stroke-width', 1.5));
      spikes.append('text').attr('x', 206).attr('y', 330).attr('fill', ACCENT).attr('font-size', FONT - 1).text(L.spikes || '');
    }
  }
  return { update };
}

export const hairCellStepper = {
  fallback(props) {
    const holder = document.createElement('div');
    draw(holder, props).update(4);
    return holder.innerHTML;
  },

  mount(container, props) {
    const L = props.labels || {};
    const steps = props.steps || [];
    const plot = el('div', { class: 'plot' });
    const c = draw(plot, props);
    const info = readout([[L.step || 'Step']]);
    function refresh(i) {
      c.update(i);
      const s = steps[i] || {};
      info.set(0, [el('strong', {}, s.label || ''), el('span', { class: 'demo-note' }, ` ${s.body || ''}`)]);
    }
    const slider = sliderRow(L.scrub || 'Step', { min: 0, max: Math.max(0, steps.length - 1), step: 1, value: 0, fmt: (v) => `${v + 1} / ${steps.length}` }, refresh);
    container.replaceChildren(plot, el('div', { class: 'widget-controls' }, [slider]), info.node);
    refresh(0);
  },
};
