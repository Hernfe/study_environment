// Two ascending pathways side by side (L06, slides 17 and 27; Figure
// 12.31): touch and vibration up the dorsal column-medial lemniscal
// pathway, pain and temperature up the spinothalamic pathway, from one
// side of the body to S1. The crossing of each is marked. A lesion
// option cuts the drawing; the read-out says which sense is lost on
// which side of the body below the cut.
//
// Schematic, not to scale: cortex, VP thalamus, medulla and one stretch
// of spinal cord, with the stimulus entering below the lesion level.
// Right is the patient's right.
//
// props: {
//   initial: { side: 'right', show: 'both', lesion: 'none' },
//   lesions: [{ key: 'none' | 'hemi-right' | 'dc-right' | 'ml-left', label }],
//   labels: { side, left, right, show, touch, pain, both, lesion,
//             cortex, s1Left, s1Right, thalamus, medulla, cord, midline,
//             bodyLeft, bodyRight, dcml, stt, crossMedulla, crossCord,
//             touchRow, painRow, intact, lost, leftBody, rightBody, cut },
// }

import { el } from '../dom.js';
import { svgIn, radioRow, readout, halo, nextId, MUTED, ACCENT, INK, BORDER, FONT } from './d3util.js';

const W = 640;
const H = 440;
const MID = 320;

const LESIONS = {
  'hemi-right': { x0: 320, x1: 374, y0: 314, y1: 328 },
  'dc-right': { x0: 324, x1: 346, y0: 314, y1: 328 },
  'ml-left': { x0: 274, x1: 294, y0: 166, y1: 184 },
};

// Paths for a stimulus on the patient's right; mirrored for the left.
const PATHS = {
  dcml: [
    [[478, 396], [370, 396], [336, 396], [336, 228]],
    [[336, 228], [306, 214], [290, 192], [266, 146]],
    [[262, 138], [196, 62]],
  ],
  stt: [
    [[478, 396], [370, 396], [354, 396]],
    [[354, 396], [302, 384], [284, 374], [284, 252], [276, 200], [254, 150]],
    [[250, 140], [176, 66]],
  ],
};
const SYNAPSES = { dcml: [[336, 228], [264, 142]], stt: [[354, 396], [252, 145]] };
const mirror = (pts) => pts.map(([x, y]) => [2 * MID - x, y]);

function cutIndex(polyline, box) {
  // First sampled point of the polyline inside the lesion box, as
  // [segment index, fraction], or null.
  for (let s = 0; s < polyline.length - 1; s += 1) {
    const [x0, y0] = polyline[s];
    const [x1, y1] = polyline[s + 1];
    const n = Math.ceil(Math.hypot(x1 - x0, y1 - y0));
    for (let k = 0; k <= n; k += 1) {
      const f = k / n;
      const x = x0 + (x1 - x0) * f;
      const y = y0 + (y1 - y0) * f;
      if (x >= box.x0 && x <= box.x1 && y >= box.y0 && y <= box.y1) return { s, f, x, y };
    }
  }
  return null;
}

export function pathwayLost(pathway, side, lesion) {
  const box = LESIONS[lesion];
  if (!box) return false;
  const neurons = side === 'right' ? PATHS[pathway] : PATHS[pathway].map(mirror);
  return neurons.some((n) => cutIndex(n, box));
}

function draw(container, props) {
  const L = props.labels || {};
  const svg = svgIn(container, W, H);
  const g = svg.append('g');
  const id = nextId('path');
  svg.append('defs').append('marker').attr('id', `${id}-arrow`).attr('viewBox', '0 0 8 8').attr('refX', 7).attr('refY', 4)
    .attr('markerWidth', 6).attr('markerHeight', 6).attr('orient', 'auto').append('path').attr('d', 'M0,0L8,4L0,8Z').attr('fill', 'context-stroke');

  // Scaffolding, muted.
  const box = (x, y, w, h, label, anchor = 'middle', lx = x + w / 2, ly = y + h / 2) => {
    g.append('rect').attr('x', x).attr('y', y).attr('width', w).attr('height', h).attr('rx', 6).attr('fill', 'none').attr('stroke', BORDER).attr('stroke-width', 1.2);
    if (label) g.append('text').attr('x', lx).attr('y', ly).attr('dy', '0.35em').attr('text-anchor', anchor).attr('font-size', FONT - 1).attr('fill', MUTED).text(label);
  };
  box(110, 30, 156, 44, L.s1Left || 'Left S1');
  box(374, 30, 156, 44, L.s1Right || 'Right S1');
  box(214, 120, 74, 40, '');
  box(352, 120, 74, 40, '');
  g.append('text').attr('x', MID).attr('y', 140).attr('dy', '0.35em').attr('text-anchor', 'middle').attr('font-size', FONT - 1).attr('fill', MUTED).text(L.thalamus || 'VP thalamus');
  box(250, 200, 140, 50, '');
  g.append('text').attr('x', 244).attr('y', 225).attr('dy', '0.35em').attr('text-anchor', 'end').attr('font-size', FONT - 1).attr('fill', MUTED).text(L.medulla || 'Medulla');
  box(268, 262, 104, 156, '');
  g.append('text').attr('x', 262).attr('y', 300).attr('dy', '0.35em').attr('text-anchor', 'end').attr('font-size', FONT - 1).attr('fill', MUTED).text(L.cord || 'Spinal cord');
  g.append('line').attr('x1', MID).attr('x2', MID).attr('y1', 16).attr('y2', 426).attr('stroke', BORDER).attr('stroke-dasharray', '3 4');
  g.append('text').attr('x', MID).attr('y', 436).attr('text-anchor', 'middle').attr('font-size', FONT - 2).attr('fill', MUTED).text(L.midline || 'midline');
  g.append('text').attr('x', 16).attr('y', 396).attr('dy', '0.35em').attr('font-size', FONT - 1).attr('fill', MUTED).text(L.bodyLeft || 'Left body');
  g.append('text').attr('x', W - 16).attr('y', 396).attr('dy', '0.35em').attr('text-anchor', 'end').attr('font-size', FONT - 1).attr('fill', MUTED).text(L.bodyRight || 'Right body');

  const lesionLayer = g.append('g');
  const paths = g.append('g');
  const labels = g.append('g');

  function update({ side, show, lesion }) {
    lesionLayer.selectAll('*').remove();
    paths.selectAll('*').remove();
    labels.selectAll('*').remove();
    const cut = LESIONS[lesion];
    if (cut) {
      lesionLayer.append('rect').attr('x', cut.x0).attr('y', cut.y0).attr('width', cut.x1 - cut.x0).attr('height', cut.y1 - cut.y0)
        .attr('fill', 'var(--c-incorrect)').attr('opacity', 0.85);
      halo(lesionLayer.append('text').attr('x', cut.x1 + 6).attr('y', (cut.y0 + cut.y1) / 2).attr('dy', '0.35em').attr('font-size', FONT - 1).attr('fill', 'var(--c-incorrect)').text(L.cut || 'Lesion'));
    }
    const which = show === 'both' ? ['dcml', 'stt'] : [show === 'touch' ? 'dcml' : 'stt'];
    for (const key of which) {
      const colour = key === 'dcml' ? ACCENT : INK;
      const dash = key === 'dcml' ? null : '6 3';
      const neurons = side === 'right' ? PATHS[key] : PATHS[key].map(mirror);
      let broken = false;
      neurons.forEach((n) => {
        const c = cut ? cutIndex(n, cut) : null;
        const draw1 = (pts, faded) => paths.append('path').attr('d', `M${pts.map((p) => p.map((v) => v.toFixed(1)).join(',')).join('L')}`)
          .attr('fill', 'none').attr('stroke', colour).attr('stroke-width', faded ? 1 : 2).attr('stroke-dasharray', faded ? '2 4' : dash)
          .attr('opacity', faded ? 0.5 : 1);
        if (broken) { draw1(n, true); return; }
        if (c) {
          const before = [...n.slice(0, c.s + 1), [c.x, c.y]];
          const after = [[c.x, c.y], ...n.slice(c.s + 1)];
          draw1(before, false);
          draw1(after, true);
          broken = true;
        } else {
          draw1(n, false).attr('marker-end', n === neurons[neurons.length - 1] ? `url(#${id}-arrow)` : null);
        }
      });
      for (const [sx, sy] of side === 'right' ? SYNAPSES[key] : mirror(SYNAPSES[key])) {
        paths.append('circle').attr('cx', sx).attr('cy', sy).attr('r', 3.5).attr('fill', broken ? 'var(--c-surface)' : colour).attr('stroke', colour);
      }
      // Crossing marks and direct labels.
      const sgn = side === 'right' ? 1 : -1;
      if (key === 'dcml') {
        halo(labels.append('text').attr('x', MID + sgn * 4).attr('y', 196).attr('text-anchor', side === 'right' ? 'start' : 'end').attr('font-size', FONT - 2).attr('fill', ACCENT).text(L.crossMedulla || 'crosses in the medulla'));
        halo(labels.append('text').attr('x', MID + sgn * 22).attr('y', 286).attr('text-anchor', side === 'right' ? 'start' : 'end').attr('font-size', FONT - 2).attr('fill', ACCENT).attr('font-weight', 600).text(L.dcml || 'Dorsal column'));
      } else {
        halo(labels.append('text').attr('x', MID).attr('y', 410).attr('text-anchor', 'middle').attr('font-size', FONT - 2).attr('fill', INK).text(L.crossCord || 'crosses at once'));
        halo(labels.append('text').attr('x', MID - sgn * 40).attr('y', 344).attr('text-anchor', side === 'right' ? 'end' : 'start').attr('font-size', FONT - 2).attr('fill', INK).attr('font-weight', 600).text(L.stt || 'Spinothalamic'));
      }
    }
  }
  return { update };
}

export const pathwayTracer = {
  fallback(props) {
    const holder = document.createElement('div');
    draw(holder, props).update({ side: 'right', show: 'both', lesion: 'none' });
    return holder.innerHTML;
  },

  mount(container, props) {
    const L = props.labels || {};
    const init = props.initial || {};
    const state = { side: init.side || 'right', show: init.show || 'both', lesion: init.lesion || 'none' };
    const plot = el('div', { class: 'plot' });
    const c = draw(plot, props);
    const info = readout([[L.leftBody || 'Left side of the body'], [L.rightBody || 'Right side of the body']]);
    function refresh() {
      c.update(state);
      for (const [i, side] of [[0, 'left'], [1, 'right']]) {
        const touch = pathwayLost('dcml', side, state.lesion);
        const pain = pathwayLost('stt', side, state.lesion);
        info.set(i, `${L.touchRow || 'Touch, vibration, position'}: ${touch ? L.lost || 'lost' : L.intact || 'intact'}; ${L.painRow || 'pain, temperature'}: ${pain ? L.lost || 'lost' : L.intact || 'intact'}`);
      }
    }
    const lesions = props.lesions || [{ key: 'none', label: 'None' }];
    container.replaceChildren(
      plot,
      el('div', { class: 'widget-controls' }, [
        radioRow(L.side || 'Stimulus on the', nextId('side'), [{ value: 'left', label: L.left || 'left' }, { value: 'right', label: L.right || 'right' }], state.side, (v) => { state.side = v; refresh(); }),
        radioRow(L.show || 'Trace', nextId('show'), [{ value: 'touch', label: L.touch || 'Touch' }, { value: 'pain', label: L.pain || 'Pain and temperature' }, { value: 'both', label: L.both || 'Both' }], state.show, (v) => { state.show = v; refresh(); }),
        radioRow(L.lesion || 'Lesion', nextId('les'), lesions.map((l) => ({ value: l.key, label: l.label })), state.lesion, (v) => { state.lesion = v; refresh(); }),
      ]),
      info.node,
    );
    refresh();
  },
};
