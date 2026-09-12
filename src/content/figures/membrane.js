// Static quantitative figures for Lecture 2, drawn with d3 from the
// same Hodgkin-Huxley model the demos use. Each returns { svg, aspect,
// regions } for the image-hotspots widget.

import { create, scaleLinear, line as d3line } from 'd3';
import { simulateCurrentClamp, HH } from '../../js/widgets/hhModel.js';

const FONT = 12;
const THRESHOLD = -55;

function toMarkup(svg, w, h) {
  const node = svg.node();
  node.setAttribute('viewBox', `0 0 ${w} ${h}`);
  node.setAttribute('width', '100%');
  node.setAttribute('font-family', 'inherit');
  node.setAttribute('font-size', String(FONT));
  node.setAttribute('aria-hidden', 'true');
  node.setAttribute('style', `max-width:${w}px;display:block`);
  return node.outerHTML;
}

// The action potential waveform with reference lines only. Phase names
// come from the regions, so the picture itself carries no labels.
export function apWaveformFigure(regionText) {
  const W = 520;
  const H = 300;
  const M = { top: 16, right: 60, bottom: 34, left: 50 };
  const TOTAL = 8;
  const s = simulateCurrentClamp({ total: TOTAL });
  const svg = create('svg');
  const x = scaleLinear().domain([0, TOTAL]).range([M.left, W - M.right]);
  const y = scaleLinear().domain([-90, 50]).range([H - M.bottom, M.top]);
  const g = svg.append('g');
  const ref = (v, label) => {
    g.append('line').attr('x1', x(0)).attr('x2', x(TOTAL)).attr('y1', y(v)).attr('y2', y(v)).attr('stroke', 'var(--c-border)').attr('stroke-dasharray', '3 3');
    g.append('text').attr('x', x(TOTAL) + 6).attr('y', y(v)).attr('dy', '0.35em').attr('fill', 'var(--c-text-muted)').attr('font-size', FONT - 1).text(label);
  };
  ref(0, '0 mV');
  ref(HH.rest, `${HH.rest} mV`);
  // Axes as range frames.
  const yTicks = [-80, -40, 0, 40];
  g.append('line').attr('x1', M.left).attr('x2', M.left).attr('y1', y(yTicks[0])).attr('y2', y(yTicks[yTicks.length - 1])).attr('stroke', 'var(--c-border)');
  for (const v of yTicks) {
    g.append('line').attr('x1', M.left - 3).attr('x2', M.left).attr('y1', y(v)).attr('y2', y(v)).attr('stroke', 'var(--c-border)');
    g.append('text').attr('x', M.left - 6).attr('y', y(v)).attr('dy', '0.35em').attr('text-anchor', 'end').attr('fill', 'var(--c-text-muted)').attr('font-size', FONT - 1).text(v);
  }
  g.append('text').attr('x', M.left).attr('y', M.top - 4).attr('text-anchor', 'end').attr('fill', 'var(--c-text-muted)').attr('font-size', FONT - 1).text('mV');
  const xTicks = [0, 2, 4, 6, 8];
  const ay = H - M.bottom + 6;
  g.append('line').attr('x1', x(0)).attr('x2', x(TOTAL)).attr('y1', ay).attr('y2', ay).attr('stroke', 'var(--c-border)');
  for (const v of xTicks) {
    g.append('line').attr('x1', x(v)).attr('x2', x(v)).attr('y1', ay).attr('y2', ay + 3).attr('stroke', 'var(--c-border)');
    g.append('text').attr('x', x(v)).attr('y', ay + 15).attr('text-anchor', 'middle').attr('fill', 'var(--c-text-muted)').attr('font-size', FONT - 1).text(v);
  }
  g.append('text').attr('x', x(TOTAL) + 6).attr('y', ay + 3).attr('dy', '0.35em').attr('fill', 'var(--c-text-muted)').attr('font-size', FONT - 1).text('ms');
  g.append('path').attr('d', d3line().x((d) => x(d.t)).y((d) => y(d.v))(s)).attr('fill', 'none').attr('stroke', 'currentColor').attr('stroke-width', 1.5);

  // Landmarks for the regions.
  const thr = s.find((d) => d.t > 0.8 && d.v >= THRESHOLD);
  const peak = s.reduce((a, b) => (b.v > a.v ? b : a));
  const back = s.find((d) => d.t > peak.t && d.v <= HH.rest);
  const after = s.filter((d) => d.t > back.t);
  const trough = after.reduce((a, b) => (b.v < a.v ? b : a));
  const mid = (a, b) => s[Math.round(((a.t + b.t) / 2) / 0.02)];
  const rise = mid(thr, peak);
  const fall = mid(peak, back);
  const px = (d) => (x(d.t) / W) * 100;
  const py = (d) => (y(d.v) / H) * 100;
  const T = regionText || {};
  const region = (id, d, shape, extra = {}) => ({ id, label: T[id]?.label || id, body: T[id]?.body || '', shape, ...extra, mx: px(d), my: py(d) });
  const regions = [
    region('rest', s[10], 'rect', { x: px(s[20]), y: py(s[20]), w: 10, h: 6, side: 'left' }),
    region('threshold', thr, 'ellipse', { x: px(thr), y: py(thr), w: 5, h: 8, side: 'left' }),
    region('rising', rise, 'line', { x: px(thr), y: py(thr), x2: px(peak) - 1, y2: py(peak) + 2, side: 'top' }),
    region('overshoot', peak, 'rect', { x: px(peak), y: (py(peak) + (y(0) / H) * 100) / 2, w: 10, h: (y(0) / H) * 100 - py(peak), side: 'top' }),
    region('falling', fall, 'line', { x: px(peak) + 1, y: py(peak) + 2, x2: px(back), y2: py(back), side: 'top' }),
    region('undershoot', trough, 'rect', { x: px(trough) + 6, y: py(trough), w: 22, h: 6, side: 'bottom' }),
  ];
  return { svg: toMarkup(svg, W, H), aspect: W / H, regions };
}
