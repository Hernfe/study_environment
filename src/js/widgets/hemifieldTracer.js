// Hemifield-to-cortex tracer. Pick a point in the visual field (click
// either eye's field chart, or use the sliders) and the path lights up:
// retinal half, optic nerve, crossing or not at the chiasm, optic tract,
// LGN layers, and the place in V1. A lesion choice cuts the path and
// shades what each eye can no longer see.
//
// Geometry is a schematic horizontal view, anterior up, the person's left
// on the left. Each eye sees about 100 degrees temporally and 60 nasally.
// Nasal retinal fibres cross at the chiasm. The contralateral eye feeds
// LGN layers 1, 4 and 6, the ipsilateral eye layers 2, 3 and 5. The upper
// field maps below the calcarine fissure; the centre of the field takes
// a magnified share of V1 at the occipital pole.
//
// props: {
//   lesions: [{ key: 'none' | 'nerve-L' | 'chiasm' | 'tract-L' | 'v1-L' | 'v1-L-spare', label }],
//   initial: { az, el, lesion },
//   labels: { ...words and sentence templates with {placeholders}, see the content file },
// }

import { el } from '../dom.js';
import { svgIn, radioRow, sliderRow, readout, MUTED, ACCENT, INK, BORDER, FONT, nextId, halo } from './d3util.js';

const W = 620;
const H = 560;
const S = 1.15;                         // px per degree in the field charts
const CHART = { L: { x: 160, y: 100 }, R: { x: 460, y: 100 } };
const EYE = { L: { x: 262, y: 262 }, R: { x: 358, y: 262 } };
const ER = 26;
const FIELD_H = 205;                    // the field charts sit above this line
const STACKED_VIEW = `35 5 250 ${2 * FIELD_H - 30}`;
const COMPACT_BELOW = 480;              // px of plot width: stack the charts
const CHIASM = { x: 310, y: 340 };
const LGN = { L: { x: 236, y: 410 }, R: { x: 384, y: 410 } };
const V1 = { L: { x0: 150, x1: 292 }, R: { x0: 328, x1: 470 }, top: 470, mid: 500, bottom: 530 };
const RED = '#d9534f';
const BLUE = '#2f7fc1';
const DARK = '#2b2d33';

// Field of one eye: an ellipse from 100 deg temporal to 60 deg nasal, 60 up and down.
function inField(eye, az, el) {
  const c = eye === 'L' ? -20 : 20;
  return ((az - c) / 80) ** 2 + (el / 60) ** 2 <= 1;
}

// Does the lesion blind this eye to this point?
function blind(lesion, eye, az, el) {
  const ecc = Math.hypot(az, el);
  switch (lesion) {
    case 'nerve-L': return eye === 'L';
    case 'chiasm': return (eye === 'L' && az < 0) || (eye === 'R' && az > 0);
    case 'tract-L':
    case 'v1-L': return az > 0;
    case 'v1-L-spare': return az > 0 && ecc > 5;
    default: return false;
  }
}

function route(eye, az) {
  // Which hemisphere, whether the fibres cross, which LGN layers.
  const hemi = az > 0 ? 'L' : 'R';
  const crosses = eye !== hemi;
  const nasal = crosses;
  const layers = crosses ? [1, 4, 6] : [2, 3, 5];
  return { hemi, crosses, nasal, layers };
}

// Where along the path the lesion sits: the index of the first path point
// beyond the cut (points: retina, back of eye, chiasm entry, tract start,
// LGN, V1).
function cutIndex(lesion) {
  return { 'nerve-L': 2, chiasm: 3, 'tract-L': 4, 'v1-L': 5, 'v1-L-spare': 5 }[lesion] ?? -1;
}

function v1Point(hemi, az, el) {
  const ecc = Math.min(100, Math.hypot(az, el));
  const f = Math.log(1 + ecc) / Math.log(101);
  const x = hemi === 'L' ? V1.L.x1 - f * (V1.L.x1 - V1.L.x0) : V1.R.x0 + f * (V1.R.x1 - V1.R.x0);
  const y = V1.mid + Math.sign(el) * Math.min(1, Math.abs(el) / 60) * (V1.bottom - V1.mid - 4);
  return { x, y };
}

function fill(template, vars) {
  return String(template || '').replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
}

function draw(container, props) {
  const L = props.labels || {};
  // Two pictures: the field charts, which take the clicks, and the anatomy.
  // On a narrow screen the charts stack (setCompact) so both stay whole and
  // legible; the anatomy scrolls sideways like the other demo plots.
  const fieldSvg = svgIn(container, W, FIELD_H, { class: 'tracer-fields' });
  const fdefs = fieldSvg.append('defs');
  const svg = svgIn(container, W, H - FIELD_H).attr('viewBox', `0 ${FIELD_H} ${W} ${H - FIELD_H}`);
  const defs = svg.append('defs');
  const hatchId = nextId('hatch');
  const hatch = defs.append('pattern').attr('id', hatchId).attr('width', 6).attr('height', 6).attr('patternUnits', 'userSpaceOnUse').attr('patternTransform', 'rotate(45)');
  hatch.append('rect').attr('width', 6).attr('height', 6).attr('fill', DARK).attr('opacity', 0.55);
  hatch.append('line').attr('x1', 0).attr('y1', 0).attr('x2', 0).attr('y2', 6).attr('stroke', '#fff').attr('stroke-width', 1.2).attr('opacity', 0.5);

  // Field charts --------------------------------------------------------
  const charts = {};
  for (const eye of ['L', 'R']) {
    const c = CHART[eye];
    const g = fieldSvg.append('g');
    const clipId = nextId('fclip');
    const cc = eye === 'L' ? -20 : 20;
    fdefs.append('clipPath').attr('id', clipId).append('ellipse').attr('cx', c.x + cc * S).attr('cy', c.y).attr('rx', 80 * S).attr('ry', 60 * S);
    const inner = g.append('g').attr('clip-path', `url(#${clipId})`);
    inner.append('rect').attr('x', c.x - 100 * S).attr('y', c.y - 60 * S).attr('width', 100 * S).attr('height', 120 * S).attr('fill', RED).attr('opacity', 0.16);
    inner.append('rect').attr('x', c.x).attr('y', c.y - 60 * S).attr('width', 100 * S).attr('height', 120 * S).attr('fill', BLUE).attr('opacity', 0.16);
    const blindLayer = inner.append('g');
    g.append('ellipse').attr('cx', c.x + cc * S).attr('cy', c.y).attr('rx', 80 * S).attr('ry', 60 * S).attr('fill', 'none').attr('stroke', MUTED);
    g.append('line').attr('x1', c.x).attr('x2', c.x).attr('y1', c.y - 64 * S).attr('y2', c.y + 64 * S).attr('stroke', MUTED).attr('stroke-dasharray', '3 3');
    g.append('line').attr('x1', c.x - 100 * S).attr('x2', c.x + 100 * S).attr('y1', c.y).attr('y2', c.y).attr('stroke', BORDER);
    g.append('path').attr('d', `M${c.x - 5},${c.y}H${c.x + 5}M${c.x},${c.y - 5}V${c.y + 5}`).attr('stroke', INK).attr('stroke-width', 1.5);
    g.append('text').attr('x', c.x).attr('y', c.y - 60 * S - 10).attr('text-anchor', 'middle').attr('fill', INK).attr('font-size', FONT).attr('font-weight', 600).text(eye === 'L' ? L.leftEyeField : L.rightEyeField);
    g.append('text').attr('x', c.x - 100 * S).attr('y', c.y + 60 * S + 14).attr('fill', MUTED).attr('font-size', FONT - 1).text(L.leftField || '');
    g.append('text').attr('x', c.x + 100 * S).attr('y', c.y + 60 * S + 14).attr('text-anchor', 'end').attr('fill', MUTED).attr('font-size', FONT - 1).text(L.rightField || '');
    const marker = g.append('circle').attr('r', 5).attr('fill', 'none').attr('stroke', ACCENT).attr('stroke-width', 2.5);
    const hit = g.append('rect').attr('x', c.x - 100 * S).attr('y', c.y - 60 * S).attr('width', 200 * S).attr('height', 120 * S).attr('fill', 'transparent').style('cursor', 'crosshair');
    charts[eye] = { c, g, blindLayer, marker, hit };
  }

  // Anatomy -------------------------------------------------------------
  const anat = svg.append('g');
  const faint = (d) => anat.append('path').attr('d', d).attr('fill', 'none').attr('stroke', BORDER).attr('stroke-width', 6).attr('stroke-linecap', 'round');
  for (const eye of ['L', 'R']) {
    const e = EYE[eye];
    faint(`M${e.x},${e.y + ER}L${CHIASM.x + (eye === 'L' ? -8 : 8)},${CHIASM.y - 6}`);
    faint(`M${CHIASM.x + (eye === 'L' ? -8 : 8)},${CHIASM.y + 6}L${LGN[eye].x},${LGN[eye].y}`);
    faint(`M${LGN[eye].x},${LGN[eye].y}C${LGN[eye].x + (eye === 'L' ? -40 : 40)},${LGN[eye].y + 30} ${(V1[eye].x0 + V1[eye].x1) / 2},${V1.top - 30} ${(V1[eye].x0 + V1[eye].x1) / 2},${V1.top}`);
  }
  anat.append('circle').attr('cx', CHIASM.x).attr('cy', CHIASM.y).attr('r', 9).attr('fill', 'var(--c-surface)').attr('stroke', MUTED);
  for (const eye of ['L', 'R']) {
    const e = EYE[eye];
    anat.append('circle').attr('cx', e.x).attr('cy', e.y).attr('r', ER).attr('fill', 'var(--c-surface)').attr('stroke', MUTED);
    // Retina: the back half; temporal and nasal halves coloured by the hemifield they see.
    const arc = (a0, a1) => {
      const p = (a) => [e.x + ER * Math.cos(a), e.y + ER * Math.sin(a)];
      const [x0, y0] = p(a0);
      const [x1, y1] = p(a1);
      return `M${x0},${y0}A${ER},${ER} 0 0 1 ${x1},${y1}`;
    };
    // Angles in radians, SVG y down: 0 = right, PI/2 = back (down).
    // The left half of each retina sees the right hemifield (blue), the right half the left (red).
    anat.append('path').attr('d', arc(Math.PI / 2, Math.PI * 0.98)).attr('fill', 'none').attr('stroke', BLUE).attr('stroke-width', 4).attr('opacity', 0.8);
    anat.append('path').attr('d', arc(0.02 * Math.PI, Math.PI / 2)).attr('fill', 'none').attr('stroke', RED).attr('stroke-width', 4).attr('opacity', 0.8);
    anat.append('text').attr('x', e.x + (eye === 'L' ? -ER - 6 : ER + 6)).attr('y', e.y).attr('dy', '0.35em').attr('text-anchor', eye === 'L' ? 'end' : 'start').attr('fill', MUTED).attr('font-size', FONT - 1).text(eye === 'L' ? L.leftEye : L.rightEye);
  }
  const lgnLayers = {};
  for (const hemi of ['L', 'R']) {
    const p = LGN[hemi];
    lgnLayers[hemi] = [1, 2, 3, 4, 5, 6].map((n) => anat.append('path')
      .attr('d', `M${p.x - 16},${p.y + 14 - n * 4}q16,-10 32,0`)
      .attr('fill', 'none').attr('stroke', MUTED).attr('stroke-width', 2.2));
    anat.append('text').attr('x', p.x + (hemi === 'L' ? -24 : 24)).attr('y', p.y - 2).attr('text-anchor', hemi === 'L' ? 'end' : 'start').attr('fill', MUTED).attr('font-size', FONT - 1).text(hemi === 'L' ? L.leftLgn : L.rightLgn);
  }
  const v1Blocks = {};
  for (const hemi of ['L', 'R']) {
    const v = V1[hemi];
    anat.append('rect').attr('x', v.x0).attr('y', V1.top).attr('width', v.x1 - v.x0).attr('height', V1.bottom - V1.top).attr('fill', 'var(--c-surface)').attr('stroke', MUTED);
    anat.append('line').attr('x1', v.x0).attr('x2', v.x1).attr('y1', V1.mid).attr('y2', V1.mid).attr('stroke', MUTED).attr('stroke-dasharray', '4 3');
    v1Blocks[hemi] = anat.append('rect').attr('y', V1.top).attr('height', V1.bottom - V1.top).attr('fill', `url(#${hatchId})`).attr('opacity', 0);
    anat.append('text').attr('x', (v.x0 + v.x1) / 2).attr('y', V1.bottom + 16).attr('text-anchor', 'middle').attr('fill', MUTED).attr('font-size', FONT - 1).text(hemi === 'L' ? L.leftV1 : L.rightV1);
    const poleX = hemi === 'L' ? v.x1 : v.x0;
    anat.append('text').attr('x', poleX + (hemi === 'L' ? -3 : 3)).attr('y', V1.top - 5).attr('text-anchor', hemi === 'L' ? 'end' : 'start').attr('fill', MUTED).attr('font-size', FONT - 2).text(L.pole || '');
  }
  anat.append('text').attr('x', V1.L.x0 - 6).attr('y', (V1.top + V1.mid) / 2).attr('dy', '0.35em').attr('text-anchor', 'end').attr('fill', MUTED).attr('font-size', FONT - 2).text(L.upperBank || '');
  anat.append('text').attr('x', V1.L.x0 - 6).attr('y', (V1.mid + V1.bottom) / 2).attr('dy', '0.35em').attr('text-anchor', 'end').attr('fill', MUTED).attr('font-size', FONT - 2).text(L.lowerBank || '');
  halo(anat.append('text').attr('x', CHIASM.x + 14).attr('y', CHIASM.y + 4).attr('fill', MUTED).attr('font-size', FONT - 1).text(L.chiasm || ''));

  const pathLayer = svg.append('g');
  const lesionLayer = svg.append('g');

  function update(state) {
    const { az, el, lesion } = state;
    // Field charts: blind cells and the marker.
    for (const eye of ['L', 'R']) {
      const ch = charts[eye];
      const cells = [];
      for (let a = -100; a < 100; a += 2.5) {
        for (let e = -60; e < 60; e += 2.5) {
          if (blind(lesion, eye, a + 1.25, e + 1.25)) cells.push([a, e]);
        }
      }
      ch.blindLayer.selectAll('rect').data(cells).join('rect')
        .attr('x', (d) => ch.c.x + d[0] * S).attr('y', (d) => ch.c.y - (d[1] + 2.5) * S)
        .attr('width', 2.5 * S + 0.3).attr('height', 2.5 * S + 0.3).attr('fill', DARK).attr('opacity', 0.62);
      const vis = inField(eye, az, el);
      ch.marker.attr('cx', ch.c.x + az * S).attr('cy', ch.c.y - el * S).attr('opacity', vis ? 1 : 0.3)
        .attr('stroke', vis && !blind(lesion, eye, az, el) ? ACCENT : MUTED);
    }

    // Paths through the anatomy.
    pathLayer.selectAll('*').remove();
    lesionLayer.selectAll('*').remove();
    const rad = (az * Math.PI) / 180;
    const eyesOut = {};
    for (const eye of ['L', 'R']) {
      if (!inField(eye, az, el) || Math.abs(az) < 0.1) { eyesOut[eye] = null; continue; }
      const r = route(eye, az);
      const e = EYE[eye];
      const ret = [e.x - ER * Math.sin(rad), e.y + ER * Math.cos(rad)];
      const nerveEnd = [CHIASM.x + (eye === 'L' ? -8 : 8), CHIASM.y - 6];
      const tractStart = [CHIASM.x + (r.hemi === 'L' ? -8 : 8), CHIASM.y + 6];
      const lg = [LGN[r.hemi].x, LGN[r.hemi].y];
      const v = v1Point(r.hemi, az, el);
      const pts = [ret, [e.x, e.y + ER], nerveEnd, tractStart, lg, [v.x, v.y]];
      const cut = blind(lesion, eye, az, el) ? cutIndex(lesion) : -1;
      const seg = (from, to) => pts.slice(from, to + 1).map((p, i) => `${i ? 'L' : 'M'}${p[0]},${p[1]}`).join('');
      const colour = r.hemi === 'L' ? BLUE : RED;
      if (cut < 0) {
        pathLayer.append('path').attr('d', seg(0, pts.length - 1)).attr('fill', 'none').attr('stroke', colour).attr('stroke-width', 3).attr('stroke-linejoin', 'round');
      } else {
        pathLayer.append('path').attr('d', seg(0, cut - 1)).attr('fill', 'none').attr('stroke', colour).attr('stroke-width', 3).attr('stroke-linejoin', 'round');
        pathLayer.append('path').attr('d', seg(cut - 1, pts.length - 1)).attr('fill', 'none').attr('stroke', MUTED).attr('stroke-width', 1.5).attr('stroke-dasharray', '4 3');
      }
      pathLayer.append('circle').attr('cx', ret[0]).attr('cy', ret[1]).attr('r', 4).attr('fill', colour);
      if (cut < 0) pathLayer.append('circle').attr('cx', v.x).attr('cy', v.y).attr('r', 4).attr('fill', ACCENT);
      eyesOut[eye] = { ...r, blocked: cut >= 0, v };
      // LGN layers lit for this eye.
      lgnLayers[r.hemi].forEach((p, i) => { if (r.layers.includes(i + 1)) p.attr('stroke', colour); });
    }
    for (const hemi of ['L', 'R']) {
      const lit = new Set();
      for (const eye of ['L', 'R']) if (eyesOut[eye] && eyesOut[eye].hemi === hemi) eyesOut[eye].layers.forEach((n) => lit.add(n));
      lgnLayers[hemi].forEach((p, i) => { if (!lit.has(i + 1)) p.attr('stroke', MUTED); });
    }

    // Lesion marks.
    const cross = (x, y) => lesionLayer.append('path').attr('d', `M${x - 7},${y - 7}L${x + 7},${y + 7}M${x - 7},${y + 7}L${x + 7},${y - 7}`).attr('stroke', INK).attr('stroke-width', 3);
    v1Blocks.L.attr('opacity', 0);
    v1Blocks.R.attr('opacity', 0);
    if (lesion === 'nerve-L') cross((EYE.L.x + CHIASM.x - 8) / 2, (EYE.L.y + ER + CHIASM.y - 6) / 2);
    if (lesion === 'chiasm') cross(CHIASM.x, CHIASM.y);
    if (lesion === 'tract-L') cross((CHIASM.x - 8 + LGN.L.x) / 2, (CHIASM.y + 6 + LGN.L.y) / 2);
    if (lesion === 'v1-L') v1Blocks.L.attr('x', V1.L.x0).attr('width', V1.L.x1 - V1.L.x0).attr('opacity', 1);
    if (lesion === 'v1-L-spare') {
      const spare = (Math.log(6) / Math.log(101)) * (V1.L.x1 - V1.L.x0);
      v1Blocks.L.attr('x', V1.L.x0).attr('width', V1.L.x1 - V1.L.x0 - spare).attr('opacity', 1);
    }
    return eyesOut;
  }

  function pointerTo(event, eye) {
    const pt = svg.node().createSVGPoint();
    pt.x = event.clientX;
    pt.y = event.clientY;
    const p = pt.matrixTransform(charts[eye].g.node().getScreenCTM().inverse());
    return [(p.x - CHART[eye].x) / S, -(p.y - CHART[eye].y) / S];
  }

  // Side by side, or the right eye's chart moved under the left one.
  function setCompact(on) {
    fieldSvg.classed('is-compact', on)
      .attr('viewBox', on ? STACKED_VIEW : `0 0 ${W} ${FIELD_H}`)
      .style('max-width', on ? '380px' : `${W}px`)
      .style('margin-inline', on ? 'auto' : null);
    charts.R.g.attr('transform', on ? `translate(${CHART.L.x - CHART.R.x},${FIELD_H - 15})` : null);
  }

  return { update, charts, pointerTo, setCompact };
}

const DEFAULT = { az: 30, el: 20, lesion: 'none' };
const snap = (v, lo, hi) => Math.max(lo, Math.min(hi, Math.round(v / 5) * 5));

export const hemifieldTracer = {
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
    const info = readout([[L.point || 'Point'], [L.leftEye || 'Left eye'], [L.rightEye || 'Right eye'], [L.cortex || 'Cortex'], [L.seen || 'Seen']]);
    const name = nextId('hf');

    const azRow = sliderRow(L.az || 'Left to right', { min: -95, max: 95, step: 5, value: state.az, unit: '°', fmt: (v) => String(v) }, (v) => { state.az = v; refresh(); });
    const elRow = sliderRow(L.el || 'Down to up', { min: -55, max: 55, step: 5, value: state.el, unit: '°', fmt: (v) => String(v) }, (v) => { state.el = v; refresh(); });
    const lesionRow = radioRow(L.lesion || 'Lesion', `${name}-l`, (props.lesions || [{ key: 'none', label: 'none' }]).map((l) => ({ value: l.key, label: l.label })), state.lesion, (v) => { state.lesion = v; refresh(); });

    function eyeLine(eye, out) {
      if (!out) {
        if (Math.abs(state.az) < 0.1) return el('span', { class: 'demo-note' }, L.meridian || '');
        return el('span', { class: 'demo-note' }, L.outside || '');
      }
      const parts = {
        half: out.nasal ? L.nasal : L.temporal,
        cross: out.crosses ? L.crosses : L.stays,
        tract: out.hemi === 'L' ? L.leftTract : L.rightTract,
        lgn: out.hemi === 'L' ? L.leftLgn : L.rightLgn,
        layers: out.layers.join(', '),
      };
      return [el('strong', {}, fill(L.eyeTemplate, parts)), out.blocked ? el('span', { class: 'demo-note' }, ` ${L.blocked || ''}`) : ''];
    }

    function refresh() {
      const out = c.update(state);
      const side = state.az < 0 ? L.left : state.az > 0 ? L.right : L.onMeridian;
      const vert = state.el > 0 ? L.above : state.el < 0 ? L.below : L.onHorizontal;
      info.set(0, [el('strong', {}, fill(L.pointTemplate, { az: Math.abs(state.az), side, el: Math.abs(state.el), vert })), el('span', { class: 'demo-note' }, ` ${state.az < 0 ? L.leftHemifield : state.az > 0 ? L.rightHemifield : ''}`)]);
      info.set(1, eyeLine('L', out.L));
      info.set(2, eyeLine('R', out.R));
      const any = out.L || out.R;
      if (any) {
        const ecc = Math.hypot(state.az, state.el);
        info.set(3, el('strong', {}, fill(L.cortexTemplate, {
          v1: any.hemi === 'L' ? L.leftV1 : L.rightV1,
          bank: state.el > 0 ? L.lowerBank : state.el < 0 ? L.upperBank : L.onCalcarine,
          part: ecc <= 10 ? L.central : L.peripheral,
        })));
      } else {
        info.set(3, '');
      }
      const seenL = out.L && !out.L.blocked;
      const seenR = out.R && !out.R.blocked;
      info.set(4, el('strong', {}, seenL || seenR ? fill(L.seenTemplate, { eyes: [seenL ? L.leftEye : '', seenR ? L.rightEye : ''].filter(Boolean).join(L.and || ' and ') }) : L.notSeen || ''));
    }

    for (const eye of ['L', 'R']) {
      c.charts[eye].hit.on('click', (event) => {
        const [az, elev] = c.pointerTo(event, eye);
        state.az = snap(az, -95, 95);
        state.el = snap(elev, -55, 55);
        azRow.setValue(state.az);
        elRow.setValue(state.el);
        refresh();
      });
    }

    container.replaceChildren(plot, el('div', { class: 'widget-controls' }, [lesionRow, azRow, elRow]), info.node);
    const fit = () => c.setCompact(plot.clientWidth > 0 && plot.clientWidth < COMPACT_BELOW);
    fit();
    if ('ResizeObserver' in window) new ResizeObserver(fit).observe(plot);
    refresh();
  },
};
