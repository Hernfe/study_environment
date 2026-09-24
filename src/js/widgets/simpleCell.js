// Simple-cell builder. Three LGN ON-center fields converge on one layer
// IVC neuron. A light bar on a dark ground is rotated and shifted; each
// LGN cell's rate comes from its own center-surround balance, the simple
// cell sums the three and fires only above a threshold. The tuning curve
// on the right is recomputed for every orientation at the current bar
// position. A second layout scatters the three fields, which removes
// the orientation preference.
//
// props: {
//   axis: 0,                       // alignment of the three fields, degrees from vertical
//   threshold, gain,               // simple cell: rate = gain * (sum of LGN rates - threshold)
//   initial: { theta, offset, layout },
//   labels: { theta, offset, layout, aligned, scattered, lgn, simple, tuning, orientation, rate, spikes, preferred, explain: { strong, weak, none } },
// }

import { el } from '../dom.js';
import { svgIn, radioRow, sliderRow, readout, spikeTrain, ringSamples, scaleLinear, d3line, rangeAxisBottom, rangeAxisLeft, fmt0, MUTED, ACCENT, INK, BORDER, FONT, nextId } from './d3util.js';

const W = 620;
const H = 330;
const PATCH = 250;
const PX = 12;
const PY = 36;
const RC = 0.13;
const RS = 0.3;
const BAR = 0.26;
const LGN_BASE = 10;
const LGN_GAIN = 32;
const SW = 0.85;
const CENTER_PTS = ringSamples(0, RC, 6, 24);
const SURROUND_PTS = ringSamples(RC, RS, 10, 48);
const LIGHT = '#f2efe4';
const DARK = '#23242a';

function positions(layout, axis) {
  if (layout === 'scattered') return [[-0.2, 0.22], [0.26, 0.08], [-0.05, -0.3]];
  const a = (axis * Math.PI) / 180;
  const u = [-Math.sin(a), Math.cos(a)];
  return [-0.36, 0, 0.36].map((k) => [k * u[0], k * u[1]]);
}

function lit(theta, offset, x, y) {
  const a = (theta * Math.PI) / 180;
  const n = [Math.cos(a), Math.sin(a)];
  return Math.abs(x * n[0] + y * n[1] - offset) <= BAR / 2 ? 1 : -1;
}

function lgnRate(theta, offset, [fx, fy]) {
  const mean = (pts) => pts.reduce((s, [x, y]) => s + lit(theta, offset, fx + x, fy + y), 0) / pts.length;
  const drive = mean(CENTER_PTS) - SW * mean(SURROUND_PTS);
  return Math.max(0, LGN_BASE + LGN_GAIN * drive);
}

function model(props, state) {
  const fields = positions(state.layout, props.axis ?? 0);
  const rates = fields.map((f) => lgnRate(state.theta, state.offset, f));
  const sum = rates.reduce((a, b) => a + b, 0);
  const simple = Math.max(0, Math.min(100, (props.gain ?? 0.9) * (sum - (props.threshold ?? 60))));
  return { fields, rates, simple };
}

function draw(container, props) {
  const L = props.labels || {};
  const svg = svgIn(container, W, H);
  const half = PATCH / 2;
  const cx = PX + half;
  const cy = PY + half;
  const toX = (v) => cx + v * half;
  const toY = (v) => cy - v * half;
  const clipId = nextId('scclip');
  svg.append('clipPath').attr('id', clipId).append('rect').attr('x', PX).attr('y', PY).attr('width', PATCH).attr('height', PATCH);
  const patch = svg.append('g').attr('clip-path', `url(#${clipId})`);
  patch.append('rect').attr('x', PX).attr('y', PY).attr('width', PATCH).attr('height', PATCH).attr('fill', DARK);
  const bar = patch.append('rect').attr('fill', LIGHT).attr('opacity', 0.92);
  svg.append('rect').attr('x', PX).attr('y', PY).attr('width', PATCH).attr('height', PATCH).attr('fill', 'none').attr('stroke', BORDER);
  const fieldG = svg.append('g');
  svg.append('text').attr('x', PX).attr('y', PY - 10).attr('fill', MUTED).attr('font-size', FONT - 1).text(L.patch || '');

  // Rasters: three LGN cells (muted) and the simple cell (ink).
  const TX = PX + PATCH + 44;
  const TW = W - TX - 64;
  const rowsY = [PY + 10, PY + 36, PY + 62, PY + 104];
  const rows = rowsY.map((y, i) => {
    const g = svg.append('g');
    const colour = i < 3 ? MUTED : INK;
    g.append('text').attr('x', TX - 8).attr('y', y).attr('dy', '0.35em').attr('text-anchor', 'end').attr('fill', colour).attr('font-size', FONT - 1).text(i < 3 ? `${i + 1}` : '');
    g.append('line').attr('x1', TX).attr('x2', TX + TW).attr('y1', y).attr('y2', y).attr('stroke', colour);
    const rate = g.append('text').attr('x', TX + TW + 6).attr('y', y).attr('dy', '0.35em').attr('fill', colour).attr('font-size', FONT - 1).attr('font-variant-numeric', 'tabular-nums');
    return { y, colour, g: g.append('g'), rate, h: i < 3 ? 8 : 13 };
  });
  svg.append('text').attr('x', TX).attr('y', rowsY[0] - 16).attr('fill', MUTED).attr('font-size', FONT - 1).text(L.lgn || '');
  svg.append('text').attr('x', TX).attr('y', rowsY[3] - 20).attr('fill', INK).attr('font-size', FONT - 1).text(L.simple || '');

  // Tuning curve.
  const T = { x0: TX, x1: TX + TW + 30, y0: H - 30, y1: PY + 150 };
  const tx = scaleLinear().domain([0, 180]).range([T.x0, T.x1]);
  const ty = scaleLinear().domain([0, 100]).range([T.y0, T.y1]);
  const tg = svg.append('g');
  rangeAxisBottom(tg, tx, [0, 90, 180], T.y0 + 4, (v) => `${v}°`);
  rangeAxisLeft(tg, ty, [0, 100], T.x0 - 4, (v) => String(v));
  svg.append('text').attr('x', T.x0).attr('y', T.y1 - 10).attr('fill', MUTED).attr('font-size', FONT - 1).text(L.tuning || '');
  const curve = tg.append('path').attr('fill', 'none').attr('stroke', MUTED).attr('stroke-width', 1.5);
  const now = tg.append('circle').attr('r', 4.5).attr('fill', ACCENT);
  const nowLine = tg.append('line').attr('stroke', ACCENT).attr('stroke-dasharray', '3 3');

  function update(state) {
    const a = (state.theta * Math.PI) / 180;
    const n = [Math.cos(a), Math.sin(a)];
    const centre = [n[0] * state.offset, n[1] * state.offset];
    bar.attr('x', toX(centre[0]) - (BAR / 2) * half).attr('y', toY(centre[1]) - 2 * half)
      .attr('width', BAR * half).attr('height', 4 * half)
      .attr('transform', `rotate(${-state.theta},${toX(centre[0])},${toY(centre[1])})`);

    const m = model(props, state);
    const f = fieldG.selectAll('g.field').data(m.fields).join((enter) => {
      const g = enter.append('g').attr('class', 'field');
      g.append('circle').attr('class', 'sur').attr('fill', 'none').attr('stroke', '#8a8f99').attr('stroke-width', 1.2).attr('stroke-dasharray', '4 3');
      g.append('circle').attr('class', 'cen').attr('fill', 'none').attr('stroke-width', 2);
      g.append('text').attr('class', 'num').attr('text-anchor', 'middle').attr('dy', '0.35em').attr('font-size', FONT - 1).attr('fill', '#8a8f99');
      return g;
    });
    f.select('.sur').attr('cx', (d) => toX(d[0])).attr('cy', (d) => toY(d[1])).attr('r', RS * half);
    f.select('.cen').attr('cx', (d) => toX(d[0])).attr('cy', (d) => toY(d[1])).attr('r', RC * half)
      .attr('stroke', (d, i) => (m.rates[i] > 25 ? ACCENT : '#8a8f99'));
    f.select('.num').attr('x', (d) => toX(d[0]) + (RS + 0.05) * half).attr('y', (d) => toY(d[1])).text((d, i) => `${i + 1}`);

    [...m.rates, m.simple].forEach((r, i) => {
      const row = rows[i];
      row.g.selectAll('line').data(spikeTrain(r)).join('line')
        .attr('x1', (t) => TX + t * TW).attr('x2', (t) => TX + t * TW)
        .attr('y1', row.y - row.h).attr('y2', row.y + row.h)
        .attr('stroke', i < 3 ? MUTED : INK).attr('stroke-width', i < 3 ? 1 : 1.3);
      row.rate.text(`${fmt0(r)}`);
    });

    const pts = [];
    for (let th = 0; th <= 180; th += 5) pts.push([th, model(props, { ...state, theta: th }).simple]);
    curve.attr('d', d3line().x((d) => tx(d[0])).y((d) => ty(d[1]))(pts));
    const th = ((state.theta % 180) + 180) % 180;
    now.attr('cx', tx(th)).attr('cy', ty(m.simple));
    nowLine.attr('x1', tx(th)).attr('x2', tx(th)).attr('y1', T.y0).attr('y2', ty(m.simple));
    const best = pts.reduce((b, p) => (p[1] > b[1] ? p : b), pts[0]);
    return { ...m, best: best[1] > 1 ? best[0] : null };
  }
  return { update };
}

const DEFAULT = { theta: 0, offset: 0, layout: 'aligned' };

export const simpleCell = {
  fallback(props) {
    const holder = document.createElement('div');
    draw(holder, props).update({ ...DEFAULT, ...(props.initial || {}) });
    return holder.innerHTML;
  },

  mount(container, props) {
    const L = props.labels || {};
    const state = { ...DEFAULT, ...(props.initial || {}) };
    const plot = el('div', { class: 'plot' });
    const c = draw(plot, props);
    const info = readout([[L.lgnRates || 'LGN cells'], [L.simpleRate || 'Simple cell'], [L.preferred || 'Preferred orientation']]);
    const thetaRow = sliderRow(L.theta || 'Bar orientation', { min: 0, max: 175, step: 5, value: state.theta, unit: '°', fmt: (v) => String(v) }, (v) => { state.theta = v; refresh(); });
    const offsetRow = sliderRow(L.offset || 'Bar position', { min: -0.8, max: 0.8, step: 0.05, value: state.offset, fmt: (v) => v.toFixed(2) }, (v) => { state.offset = v; refresh(); });
    const layoutRow = radioRow(L.layout || 'LGN fields', nextId('sc'), [
      { value: 'aligned', label: L.aligned || 'aligned in a row' },
      { value: 'scattered', label: L.scattered || 'scattered' },
    ], state.layout, (v) => { state.layout = v; refresh(); });

    function refresh() {
      const m = c.update(state);
      info.set(0, el('strong', {}, m.rates.map((r) => fmt0(r)).join(', ') + ` ${L.spikes || 'spikes/s'}`));
      const ex = L.explain || {};
      const note = m.simple > 40 ? ex.strong : m.simple > 2 ? ex.weak : ex.none;
      info.set(1, [el('strong', {}, `${fmt0(m.simple)} ${L.spikes || 'spikes/s'}`), el('span', { class: 'demo-note' }, ` ${note || ''}`)]);
      info.set(2, el('strong', {}, m.best === null ? (L.nonePreferred || 'none at this position') : `${m.best}° ${L.fromVertical || 'from vertical'}`));
    }

    container.replaceChildren(plot, el('div', { class: 'widget-controls' }, [layoutRow, thetaRow, offsetRow]), info.node);
    refresh();
  },
};
