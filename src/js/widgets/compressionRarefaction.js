// Compression versus rarefaction. A slider moves through one cycle of a
// pure tone; three aligned traces show the air pressure at the ear,
// the basilar membrane displacement and the hair cell receptor
// potential, and a hair bundle on the right shows the shear, the tip
// links and the MET channel at that moment. Two buttons jump to the
// compression and rarefaction peaks.
//
// Convention: the course's slide 20. Compression moves the basilar
// membrane down, the tip links slacken, MET channels close and the cell
// hyperpolarizes; rarefaction moves it up, the tip links stretch, the
// channels open and the cell depolarizes (Bear Figure 11.13: membrane
// up, stereocilia bend outward, depolarization). The receptor potential
// is an asymmetric saturating function of displacement, larger in the
// depolarizing direction, as in Figure 11.14a; schematic, no units.
//
// props: {
//   labels: { pressure, membrane, potential, phase, compression,
//             rarefaction, up, down, depol, hyperpol, jumpCompression,
//             jumpRarefaction, bundle, open, closed, partly, stretched, slack },
//   states: { compression: [rows], rarefaction: [rows], between: [rows] },
//   rowLabels: ['Basilar membrane', 'Shear on the bundle', 'Tip links', 'MET channels', 'Hair cell'],
// }

import { el } from '../dom.js';
import { svgIn, sliderRow, readout, scaleLinear, MUTED, ACCENT, INK, BORDER, FONT, halo } from './d3util.js';

const W = 640;
const H = 300;
const PX0 = 120;
const PX1 = 420;
const ROWS = [50, 140, 230];
const AMP = 32;

export const pressureAt = (deg) => Math.cos((deg * Math.PI) / 180);
export const membraneAt = (deg) => -pressureAt(deg);
export function potentialAt(deg) {
  const d = membraneAt(deg);
  return d >= 0 ? 1 - Math.exp(-2.4 * d) : -0.35 * (1 - Math.exp(2.4 * d));
}

function draw(container, props) {
  const L = props.labels || {};
  const svg = svgIn(container, W, H);
  const x = scaleLinear().domain([0, 720]).range([PX0, PX1]);
  const degs = Array.from({ length: 145 }, (_, i) => i * 5);
  const traces = [
    { f: pressureAt, label: L.pressure, top: L.compression, bottom: L.rarefaction },
    { f: membraneAt, label: L.membrane, top: L.up, bottom: L.down },
    { f: (d) => potentialAt(d) / 0.92, label: L.potential, top: L.depol, bottom: L.hyperpol },
  ];
  const dots = [];
  traces.forEach((t, i) => {
    const y0 = ROWS[i];
    svg.append('line').attr('x1', PX0).attr('x2', PX1).attr('y1', y0).attr('y2', y0).attr('stroke', BORDER).attr('stroke-dasharray', '3 3');
    svg.append('path').attr('d', `M${degs.map((d) => `${x(d).toFixed(1)},${(y0 - AMP * t.f(d)).toFixed(1)}`).join('L')}`).attr('fill', 'none').attr('stroke', INK).attr('stroke-width', 1.5);
    svg.append('text').attr('x', PX0 - 10).attr('y', y0).attr('dy', '0.35em').attr('text-anchor', 'end').attr('fill', INK).attr('font-size', FONT - 1).text(t.label || '');
    svg.append('text').attr('x', PX1 + 6).attr('y', y0 - AMP).attr('dy', '0.35em').attr('fill', MUTED).attr('font-size', FONT - 2).text(t.top || '');
    svg.append('text').attr('x', PX1 + 6).attr('y', y0 + AMP).attr('dy', '0.35em').attr('fill', MUTED).attr('font-size', FONT - 2).text(t.bottom || '');
    dots.push(svg.append('circle').attr('r', 5).attr('fill', ACCENT));
  });
  const cursor = svg.append('line').attr('y1', 10).attr('y2', 270).attr('stroke', ACCENT).attr('stroke-dasharray', '2 3');

  // Hair bundle: three stereocilia on a cell top, a tip link between the
  // tips, and the MET channel at the lower tip.
  const bx = 562;
  const by = 200;
  svg.append('text').attr('x', bx).attr('y', 20).attr('text-anchor', 'middle').attr('fill', MUTED).attr('font-size', FONT - 1).text(L.bundle || '');
  svg.append('path').attr('d', `M${bx - 50},${by} L${bx + 50},${by} L${bx + 50},${by + 60} L${bx - 50},${by + 60} Z`).attr('fill', 'var(--c-surface)').attr('stroke', INK);
  const bodyFill = svg.append('rect').attr('x', bx - 49).attr('y', by + 1).attr('width', 98).attr('height', 58).attr('fill', ACCENT).attr('opacity', 0);
  const ciliaDef = [{ dx: -28, h: 70 }, { dx: 0, h: 100 }, { dx: 28, h: 130 }];
  const cilia = ciliaDef.map(() => svg.append('rect').attr('width', 12).attr('rx', 6).attr('fill', 'var(--c-surface)').attr('stroke', INK).attr('stroke-width', 1.3));
  const links = [0, 1].map(() => svg.append('line').attr('stroke-width', 2));
  const chans = [0, 1].map(() => svg.append('rect').attr('width', 10).attr('height', 7).attr('rx', 2).attr('stroke', INK));
  const chanText = halo(svg.append('text').attr('x', bx).attr('y', by + 84).attr('text-anchor', 'middle').attr('font-size', FONT - 1).attr('font-weight', 600));

  function update(deg) {
    const p = pressureAt(deg);
    const d = membraneAt(deg);
    const v = potentialAt(deg);
    traces.forEach((t, i) => dots[i].attr('cx', x(deg)).attr('cy', ROWS[i] - AMP * t.f(deg)));
    cursor.attr('x1', x(deg)).attr('x2', x(deg));
    const tilt = 18 * d;   // toward the tallest when the membrane is up
    ciliaDef.forEach((c, i) => {
      const cx = bx + c.dx;
      cilia[i].attr('x', cx - 6).attr('y', by - c.h).attr('height', c.h).attr('transform', `rotate(${tilt},${cx},${by})`);
    });
    const a = (tilt * Math.PI) / 180;
    const at = (i, frac) => [bx + ciliaDef[i].dx + ciliaDef[i].h * frac * Math.sin(a), by - ciliaDef[i].h * frac * Math.cos(a)];
    const openness = Math.max(0, Math.min(1, 0.15 + 0.85 * (v > 0 ? v : v / 0.35 * 0.15)));
    [0, 1].forEach((i) => {
      const [x1, y1] = at(i, 1);
      const [x2, y2] = at(i + 1, 0.84 - 0.06 * d);
      links[i].attr('x1', x1).attr('y1', y1).attr('x2', x2).attr('y2', y2).attr('stroke', d > 0.2 ? ACCENT : MUTED).attr('stroke-dasharray', d < -0.2 ? '2 2' : null);
      chans[i].attr('x', x1 - 5).attr('y', y1 - 2).attr('transform', `rotate(${tilt},${x1},${y1})`).attr('fill', '#b4541a').attr('fill-opacity', openness);
    });
    bodyFill.attr('opacity', Math.max(0, v) * 0.35);
    const state = d > 0.2 ? 'open' : d < -0.2 ? 'closed' : 'partly';
    chanText.text(L[state] || '').attr('fill', state === 'open' ? ACCENT : MUTED);
    return p > 0.2 ? 'compression' : p < -0.2 ? 'rarefaction' : 'between';
  }
  return { update };
}

export const compressionRarefaction = {
  fallback(props) {
    const holder = document.createElement('div');
    draw(holder, props).update(180);
    return holder.innerHTML;
  },

  mount(container, props) {
    const L = props.labels || {};
    const rowLabels = props.rowLabels || [];
    const plot = el('div', { class: 'plot' });
    const c = draw(plot, props);
    const info = readout(rowLabels.map((r) => [r]));
    let deg = 180;
    function refresh() {
      const state = c.update(deg);
      (props.states?.[state] || []).forEach((text, i) => info.set(i, text));
      slider.setValue(deg);
    }
    const slider = sliderRow(L.phase || 'Moment in the cycle', { min: 0, max: 720, step: 15, value: deg, unit: '°' }, (v) => { deg = v; refresh(); });
    const jumpC = el('button', { type: 'button', class: 'btn btn-secondary', onClick: () => { deg = 360; refresh(); } }, L.jumpCompression || 'Compression peak');
    const jumpR = el('button', { type: 'button', class: 'btn btn-secondary', onClick: () => { deg = 180; refresh(); } }, L.jumpRarefaction || 'Rarefaction peak');
    container.replaceChildren(plot, el('div', { class: 'widget-controls' }, [slider, el('div', { class: 'btn-row' }, [jumpC, jumpR])]), info.node);
    refresh();
  },
};
