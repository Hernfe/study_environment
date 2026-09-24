// Quantitative figures for Lecture 4, drawn with d3 scales and axes.
//
// rodConeFigure: photoreceptor density across the retina, traced from
// the slide (textbook Figure 9.15a). The slide gives no density values,
// so the y axis is relative (0 to the peak) and the curves keep only the
// shape: a narrow cone peak at the fovea, no rods there, rods peaking
// about 20 degrees out, and nothing at the blind spot.
//
// hierarchyFigure: the latency and receptive-field-size columns of the
// "Organizational principles" slide as two small multiples sharing one
// row order (up the ventral stream), ranges drawn as segments with the
// values written at their ends. Size uses a log scale because it spans
// more than two decades.
//
// Both return { svg, aspect, regions } for the image-hotspots widget.

import { create, scaleLinear, scaleLog, line, curveMonotoneX, axisBottom, axisLeft } from 'd3';

const FONT = 12;
const MUTED = 'var(--c-text-muted)';
const BORDER = 'var(--c-border)';
const ACCENT = 'var(--c-accent)';

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

function styleAxis(g) {
  g.select('.domain').attr('stroke', BORDER);
  g.selectAll('.tick line').attr('stroke', BORDER);
  g.selectAll('.tick text').attr('fill', MUTED).attr('font-size', FONT - 1);
  return g;
}

// Eccentricity in degrees: negative = temporal retina, positive = nasal.
const RODS = [[-70, 0.42], [-60, 0.47], [-50, 0.52], [-40, 0.62], [-30, 0.72], [-22, 0.8], [-16, 0.9], [-12, 0.96], [-9, 0.9], [-6, 0.62], [-3, 0.25], [0, 0], [3, 0.3], [6, 0.7], [9, 0.93], [12, 0.9]];
const RODS_NASAL = [[18, 0.82], [21, 0.97], [25, 1], [30, 0.95], [40, 0.82], [50, 0.72], [60, 0.62], [70, 0.5], [80, 0.42], [90, 0.38]];
const CONES = [[-70, 0.02], [-40, 0.025], [-20, 0.03], [-10, 0.05], [-6, 0.1], [-3, 0.3], [-1.5, 0.72], [0, 1.02], [1.5, 0.72], [3, 0.3], [6, 0.1], [10, 0.05], [12.5, 0.04]];
const CONES_NASAL = [[18, 0.03], [30, 0.025], [60, 0.02], [90, 0.02]];
const BLIND = [13, 17];

export function rodConeFigure() {
  const W = 620;
  const H = 300;
  const M = { top: 34, right: 56, bottom: 46, left: 52 };
  const x = scaleLinear().domain([-70, 90]).range([M.left, W - M.right]);
  const y = scaleLinear().domain([0, 1.05]).range([H - M.bottom, M.top]);
  const svg = create('svg');
  const g = svg.append('g');

  g.append('rect').attr('x', x(BLIND[0])).attr('width', x(BLIND[1]) - x(BLIND[0])).attr('y', M.top - 6).attr('height', H - M.bottom - M.top + 6).attr('fill', BORDER).attr('opacity', 0.6);
  g.append('text').attr('x', x((BLIND[0] + BLIND[1]) / 2)).attr('y', M.top - 12).attr('text-anchor', 'middle').attr('fill', MUTED).attr('font-size', FONT - 1).text('Blind spot');
  g.append('text').attr('x', x(0)).attr('y', M.top - 12).attr('text-anchor', 'middle').attr('fill', MUTED).attr('font-size', FONT - 1).text('Fovea');

  const path = line().x((d) => x(d[0])).y((d) => y(d[1])).curve(curveMonotoneX);
  for (const part of [RODS, RODS_NASAL]) g.append('path').attr('d', path(part)).attr('fill', 'none').attr('stroke', 'currentColor').attr('stroke-width', 1.5);
  for (const part of [CONES, CONES_NASAL]) g.append('path').attr('d', path(part)).attr('fill', 'none').attr('stroke', ACCENT).attr('stroke-width', 2);

  g.append('text').attr('x', x(-62)).attr('y', y(0.5) - 12).attr('fill', 'currentColor').attr('font-weight', 600).text('Rods');
  g.append('text').attr('x', x(-40)).attr('y', y(0.025) - 8).attr('fill', ACCENT).attr('font-weight', 600).text('Cones');

  const ax = g.append('g').attr('transform', `translate(0,${H - M.bottom + 6})`).call(axisBottom(x).tickValues([-60, -30, 0, 30, 60, 90]).tickSize(3).tickFormat((v) => `${Math.abs(v)}°`));
  styleAxis(ax);
  g.append('text').attr('x', x(-70)).attr('y', H - 8).attr('fill', MUTED).attr('font-size', FONT - 1).text('← temporal retina');
  g.append('text').attr('x', x(90)).attr('y', H - 8).attr('text-anchor', 'end').attr('fill', MUTED).attr('font-size', FONT - 1).text('nasal retina →');
  g.append('text').attr('x', x(0)).attr('y', H - 8).attr('text-anchor', 'middle').attr('fill', MUTED).attr('font-size', FONT - 1).text('distance from the fovea');
  const ay = g.append('g').attr('transform', `translate(${M.left - 6},0)`).call(axisLeft(y).tickValues([0, 1]).tickSize(3).tickFormat((v) => (v ? 'peak' : '0')));
  styleAxis(ay);
  g.append('text').attr('x', M.left - 6).attr('y', M.top - 12).attr('text-anchor', 'end').attr('fill', MUTED).attr('font-size', FONT - 1).text('per mm²');

  const pct = (px, py) => ({ x: (px / W) * 100, y: (py / H) * 100 });
  const r = (id, label, body, dx, dy, extra = {}) => {
    const p = pct(x(dx), y(dy));
    return { id, label, body, shape: 'ellipse', x: p.x, y: p.y, w: 4, h: 7, side: 'inline', dir: 'up-right', ...extra };
  };
  const regions = [
    r('fovea', 'Fovea: cones only', 'Cone density peaks sharply in the central fovea and there are no rods at all. Highest acuity, colour, daylight only.', 0, 1.02, { dir: 'left' }),
    r('rod-peak', 'Rod peak, about 20 degrees out', 'Rods are densest in a ring around the fovea, roughly $20^{\\circ}$ away, then thin out toward the periphery.', 25, 1),
    r('blind', 'Blind spot (optic disk)', 'On the nasal side, where the ganglion cell axons leave the eye. No rods, no cones: the brain fills the gap in.', 15, 0.5, { shape: 'rect', w: 3, h: 60 }),
    r('periphery', 'Periphery: rods far outnumber cones', 'Cones fall to a low level beyond about $10^{\\circ}$; rods dominate. Good for dim light, poor for detail and colour.', -60, 0.47, { dir: 'down-right' }),
  ];
  return { svg: toMarkup(svg, W, H), aspect: W / H, regions };
}

// Organizational principles slide (latency and receptive field size).
const AREAS = [
  { area: 'V1', stim: 'oriented bars, edges', lat: [40, 60], rf: [0.5, 1.5] },
  { area: 'V2', stim: 'contours, curves', lat: [50, 70], rf: [0.5, 4] },
  { area: 'V4', stim: 'shapes, textures', lat: [60, 80], rf: [1, 20] },
  { area: 'PIT', stim: 'object parts', lat: [70, 90], rf: [2, 25] },
  { area: 'AIT', stim: 'whole objects, faces', lat: [80, 100], rf: [2.5, 70] },
];

export function hierarchyFigure() {
  const W = 640;
  const ROW = 34;
  const TOP = 50;
  const H = TOP + AREAS.length * ROW + 36;
  const svg = create('svg');
  const g = svg.append('g');
  const LAB = 170;
  const P1 = { x0: LAB + 20, x1: LAB + 210 };
  const P2 = { x0: LAB + 250, x1: W - 64 };   // room for the widest end label, 2.5-70°
  const lx = scaleLinear().domain([40, 100]).range([P1.x0, P1.x1]);
  const sx = scaleLog().domain([0.5, 70]).range([P2.x0, P2.x1]);

  g.append('text').attr('x', 0).attr('y', TOP - 28).attr('font-weight', 600).attr('fill', 'currentColor').text('Area');
  g.append('text').attr('x', 36).attr('y', TOP - 28).attr('fill', MUTED).attr('font-size', FONT - 1).text('best stimulus (complexity)');
  g.append('text').attr('x', P1.x0).attr('y', TOP - 28).attr('font-weight', 600).attr('fill', 'currentColor').text('Latency');
  g.append('text').attr('x', P1.x0).attr('y', TOP - 14).attr('fill', MUTED).attr('font-size', FONT - 1).text('ms after the stimulus');
  g.append('text').attr('x', P2.x0).attr('y', TOP - 28).attr('font-weight', 600).attr('fill', 'currentColor').text('Receptive field size');
  g.append('text').attr('x', P2.x0).attr('y', TOP - 14).attr('fill', MUTED).attr('font-size', FONT - 1).text('degrees of visual angle, log scale');

  const rows = g.selectAll('g.row').data(AREAS).join('g').attr('class', 'row').attr('transform', (d, i) => `translate(0,${TOP + i * ROW + ROW / 2})`);
  rows.append('text').attr('x', 0).attr('dy', '0.35em').attr('font-weight', 600).attr('fill', 'currentColor').text((d) => d.area);
  rows.append('text').attr('x', 36).attr('dy', '0.35em').attr('fill', MUTED).attr('font-size', FONT - 1).text((d) => d.stim);
  const focal = (d) => d.area === 'AIT';
  const seg = (sel, scale, key, fmt) => {
    sel.append('line').attr('x1', (d) => scale(d[key][0])).attr('x2', (d) => scale(d[key][1])).attr('stroke', (d) => (focal(d) ? ACCENT : MUTED)).attr('stroke-width', 2);
    sel.append('circle').attr('cx', (d) => scale(d[key][0])).attr('r', 3.5).attr('fill', (d) => (focal(d) ? ACCENT : MUTED));
    sel.append('circle').attr('cx', (d) => scale(d[key][1])).attr('r', 3.5).attr('fill', (d) => (focal(d) ? ACCENT : MUTED));
    sel.append('text').attr('x', (d) => scale(d[key][1]) + 7).attr('dy', '0.35em').attr('fill', (d) => (focal(d) ? 'currentColor' : MUTED)).attr('font-size', FONT - 1).attr('font-variant-numeric', 'tabular-nums').text((d) => fmt(d[key]));
  };
  seg(rows, lx, 'lat', (v) => `${v[0]}-${v[1]}`);
  seg(rows, sx, 'rf', (v) => `${v[0]}-${v[1]}°`);

  const base = TOP + AREAS.length * ROW + 6;
  styleAxis(g.append('g').attr('transform', `translate(0,${base})`).call(axisBottom(lx).tickValues([40, 100]).tickSize(3)));
  styleAxis(g.append('g').attr('transform', `translate(0,${base})`).call(axisBottom(sx).tickValues([0.5, 5, 70]).tickSize(3).tickFormat((v) => `${v}°`)));

  const rowY = (i) => ((TOP + i * ROW + ROW / 2) / H) * 100;
  const pctX = (px) => (px / W) * 100;
  const regions = [
    { id: 'v1-lat', label: 'V1 latency, 40 to 60 ms', body: 'The first cortical stage responds within about $50\\,\\text{ms}$ of the stimulus.', x: pctX(lx(50)), y: rowY(0), w: 12, h: 8, side: 'inline', bx: pctX(lx(60) + 44), by: rowY(0) - 6 },
    { id: 'ait-lat', label: 'AIT latency, 80 to 100 ms', body: 'Each stage adds roughly $10\\,\\text{ms}$, so the top of the ventral stream answers about $40\\,\\text{ms}$ after V1.', x: pctX(lx(90)), y: rowY(4), w: 12, h: 8, side: 'inline', bx: pctX(lx(100) + 44), by: rowY(4) - 6 },
    { id: 'v1-rf', label: 'V1 fields, 0.5 to 1.5 degrees', body: 'Small fields: each V1 neuron looks at a small patch of the visual field.', x: pctX(sx(0.9)), y: rowY(0), w: 8, h: 8, side: 'inline', bx: pctX(sx(1.5) + 50), by: rowY(0) - 6 },
    { id: 'ait-rf', label: 'AIT fields, up to 70 degrees', body: 'Up to $70^{\\circ}$ across. Fields cover much of the visual field, so the response survives changes in position and size (invariance).', x: pctX(sx(15)), y: rowY(4), w: 20, h: 8, side: 'inline', bx: pctX(sx(70) + 50), by: rowY(4) - 6 },
  ];
  return { svg: toMarkup(svg, W, H), aspect: W / H, regions };
}
