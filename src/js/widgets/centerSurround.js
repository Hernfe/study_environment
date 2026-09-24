// Center-surround receptive field explorer. A light spot, a dark spot or
// a light-dark edge is moved and resized over an ON-center or OFF-center
// ganglion cell field, and the spike train updates.
//
// Model: luminance is +1 (light) or -1 (dark). The drive is the mean
// luminance over the center minus a slightly smaller weight times the
// mean over the surround; an OFF-center cell takes the negative. A light
// spot sits on a dark ground, a dark spot on a light ground (as in the
// textbook figure), and the edge is dark on its left. Uniform light and
// uniform dark both leave the cell near its maintained rate.
//
// props: {
//   base, gain, max,                  // spikes/s: maintained rate, gain, ceiling
//   surroundWeight,                   // 0.85: surround slightly weaker than center
//   presets: [{ label, state: { cell, stim, x, y, d } }],
//   labels: { cell, on, off, stim, lightSpot, darkSpot, edge, x, y, d, edgeAt,
//             presets, center, surround, lightPct, darkPct, rate, spikes,
//             uniform, stimulus, explain: { up, down, same }, plus, minus, time },
// }

import { el } from '../dom.js';
import { svgIn, radioRow, sliderRow, readout, spikeTrain, ringSamples, fmt0, MUTED, ACCENT, INK, BORDER, FONT, nextId } from './d3util.js';

const W = 620;
const H = 290;
const PATCH = 250;          // patch side in px
const PX = 12;              // patch left
const PY = 24;              // patch top
const RC = 0.32;            // center radius, fraction of half-patch
const RS = 0.8;             // surround outer radius
const LIGHT = '#f2efe4';
const DARK = '#23242a';

// Fixed sample points over the center disk and the surround ring, so
// the coverage fractions are stable and cheap to recompute.
const CENTER_PTS = ringSamples(0, RC, 10, 36);
const SURROUND_PTS = ringSamples(RC, RS, 16, 72);

function luminance(state, px, py) {
  if (state.stim === 'edge') return px < state.x ? -1 : 1;
  const inside = (px - state.x) ** 2 + (py - state.y) ** 2 <= (state.d / 2) ** 2;
  if (state.stim === 'lightSpot') return inside ? 1 : -1;
  return inside ? -1 : 1;
}

function coverage(state) {
  const mean = (pts) => pts.reduce((s, [x, y]) => s + luminance(state, x, y), 0) / pts.length;
  const dark = (pts) => pts.filter(([x, y]) => luminance(state, x, y) < 0).length / pts.length;
  return { c: mean(CENTER_PTS), s: mean(SURROUND_PTS), cDark: dark(CENTER_PTS), sDark: dark(SURROUND_PTS) };
}

function rateFor(props, state, cov) {
  const w = props.surroundWeight ?? 0.85;
  const drive = (state.cell === 'on' ? 1 : -1) * (cov.c - w * cov.s);
  return Math.max(0, Math.min(props.max ?? 100, (props.base ?? 15) + (props.gain ?? 35) * drive));
}

// The ground alone (no spot, or the whole field on one side of the edge).
function uniformState(state) {
  if (state.stim === 'edge') return { ...state, x: 2 };
  return { ...state, d: 0 };
}

function draw(container, props) {
  const L = props.labels || {};
  const svg = svgIn(container, W, H);
  const half = PATCH / 2;
  const cx = PX + half;
  const cy = PY + half;
  const toPx = (v) => cx + v * half;
  const toPy = (v) => cy + v * half;
  const clipId = nextId('csclip');
  svg.append('clipPath').attr('id', clipId).append('rect').attr('x', PX).attr('y', PY).attr('width', PATCH).attr('height', PATCH);

  const patch = svg.append('g').attr('clip-path', `url(#${clipId})`);
  const ground = patch.append('rect').attr('x', PX).attr('y', PY).attr('width', PATCH).attr('height', PATCH);
  const spot = patch.append('circle');
  const edgeRect = patch.append('rect').attr('y', PY).attr('height', PATCH).attr('fill', DARK);
  svg.append('rect').attr('x', PX).attr('y', PY).attr('width', PATCH).attr('height', PATCH).attr('fill', 'none').attr('stroke', BORDER);

  const ringOuter = svg.append('circle').attr('cx', cx).attr('cy', cy).attr('r', RS * half).attr('fill', 'none').attr('stroke', '#8a8f99').attr('stroke-width', 1.5).attr('stroke-dasharray', '5 4');
  const ringInner = svg.append('circle').attr('cx', cx).attr('cy', cy).attr('r', RC * half).attr('fill', 'none').attr('stroke', ACCENT).attr('stroke-width', 2);
  const signC = svg.append('text').attr('x', cx).attr('y', cy).attr('dy', '0.35em').attr('text-anchor', 'middle').attr('font-size', 18).attr('font-weight', 600).attr('fill', '#8a8f99');
  const signS = svg.append('text').attr('x', cx).attr('y', cy - (RC + RS) / 2 * half).attr('dy', '0.35em').attr('text-anchor', 'middle').attr('font-size', 18).attr('font-weight', 600).attr('fill', '#8a8f99');
  svg.append('text').attr('x', PX).attr('y', PY - 8).attr('fill', MUTED).attr('font-size', FONT - 1).text(L.patch || '');

  // Spike trains: the ground alone (muted) and with the stimulus (ink).
  const TX = PX + PATCH + 40;
  const TW = W - TX - 20;
  const rows = [
    { key: 'uniform', y: PY + 70, colour: MUTED },
    { key: 'stimulus', y: PY + 170, colour: INK },
  ];
  const trains = rows.map((row) => {
    const g = svg.append('g');
    const title = g.append('text').attr('x', TX).attr('y', row.y - 34).attr('fill', row.key === 'stimulus' ? INK : MUTED).attr('font-size', FONT);
    const rateText = g.append('text').attr('x', TX + TW).attr('y', row.y - 34).attr('text-anchor', 'end').attr('fill', row.key === 'stimulus' ? INK : MUTED).attr('font-size', FONT).attr('font-variant-numeric', 'tabular-nums');
    g.append('line').attr('x1', TX).attr('x2', TX + TW).attr('y1', row.y).attr('y2', row.y).attr('stroke', row.colour).attr('stroke-width', 1);
    const ticks = g.append('g');
    return { ...row, title, rateText, ticks };
  });
  svg.append('text').attr('x', TX).attr('y', PY + 206).attr('fill', MUTED).attr('font-size', FONT - 1).text(L.time || '');

  function update(state) {
    const lightSpot = state.stim === 'lightSpot';
    ground.attr('fill', state.stim === 'lightSpot' ? DARK : LIGHT);
    if (state.stim === 'edge') {
      spot.attr('r', 0);
      const ex = Math.max(PX, Math.min(PX + PATCH, toPx(state.x)));
      edgeRect.attr('x', PX).attr('width', ex - PX);
    } else {
      edgeRect.attr('width', 0);
      spot.attr('cx', toPx(state.x)).attr('cy', toPy(state.y)).attr('r', (state.d / 2) * half).attr('fill', lightSpot ? LIGHT : DARK);
    }
    signC.text(state.cell === 'on' ? '+' : '−');
    signS.text(state.cell === 'on' ? '−' : '+');
    ringInner.attr('stroke', ACCENT);
    ringOuter.attr('stroke', '#8a8f99');

    const cov = coverage(state);
    const rate = rateFor(props, state, cov);
    const covU = coverage(uniformState(state));
    const rateU = rateFor(props, uniformState(state), covU);
    const tx = (t) => TX + t * TW;
    [[trains[0], rateU, L.uniform], [trains[1], rate, L.stimulus]].forEach(([tr, r, label]) => {
      tr.title.text(label || '');
      tr.rateText.text(`${fmt0(r)} ${L.spikes || 'spikes/s'}`);
      tr.ticks.selectAll('line').data(spikeTrain(r)).join('line')
        .attr('x1', (t) => tx(t)).attr('x2', (t) => tx(t))
        .attr('y1', tr.y - 14).attr('y2', tr.y + 14)
        .attr('stroke', tr.colour).attr('stroke-width', 1.2);
    });
    return { cov, rate, rateU };
  }

  // Pointer: drag on the patch to move the spot or the edge.
  function pointerTo(event) {
    const pt = svg.node().createSVGPoint();
    pt.x = event.clientX;
    pt.y = event.clientY;
    const p = pt.matrixTransform(svg.node().getScreenCTM().inverse());
    return [(p.x - cx) / half, (p.y - cy) / half];
  }
  const hit = svg.append('rect').attr('x', PX).attr('y', PY).attr('width', PATCH).attr('height', PATCH).attr('fill', 'transparent').style('cursor', 'crosshair').style('touch-action', 'none');

  return { update, hit, pointerTo };
}

const DEFAULT = { cell: 'off', stim: 'darkSpot', x: 0, y: 0, d: 0.64 };
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const round = (v) => Math.round(v * 20) / 20;

export const centerSurround = {
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
    const info = readout([[L.center || 'Center'], [L.surround || 'Surround'], [L.rate || 'Firing']]);
    const name = nextId('cs');
    const pct = (f) => `${fmt0(f * 100)}%`;

    const xRow = sliderRow(L.x || 'Horizontal position', { min: -1.2, max: 1.2, step: 0.05, value: state.x, fmt: (v) => v.toFixed(2) }, (v) => { state.x = v; refresh(); });
    const yRow = sliderRow(L.y || 'Vertical position', { min: -1, max: 1, step: 0.05, value: state.y, fmt: (v) => v.toFixed(2) }, (v) => { state.y = v; refresh(); });
    const dRow = sliderRow(L.d || 'Spot diameter', { min: 0.1, max: 2, step: 0.05, value: state.d, fmt: (v) => v.toFixed(2) }, (v) => { state.d = v; refresh(); });
    const cellRow = radioRow(L.cell || 'Cell', `${name}-c`, [{ value: 'on', label: L.on || 'ON-center' }, { value: 'off', label: L.off || 'OFF-center' }], state.cell, (v) => { state.cell = v; refresh(); });
    const stimRow = radioRow(L.stim || 'Stimulus', `${name}-s`, [
      { value: 'lightSpot', label: L.lightSpot || 'light spot' },
      { value: 'darkSpot', label: L.darkSpot || 'dark spot' },
      { value: 'edge', label: L.edge || 'light-dark edge' },
    ], state.stim, (v) => { state.stim = v; if (v === 'edge') { state.y = 0; } refresh(); });

    function syncControls() {
      xRow.setValue(state.x);
      yRow.setValue(state.y);
      dRow.setValue(state.d);
      for (const input of cellRow.querySelectorAll('input')) input.checked = input.value === state.cell;
      for (const input of stimRow.querySelectorAll('input')) input.checked = input.value === state.stim;
    }

    function refresh() {
      const edge = state.stim === 'edge';
      yRow.hidden = edge;
      dRow.hidden = edge;
      xRow.querySelector('span').textContent = edge ? (L.edgeAt || 'Edge position') : (L.x || 'Horizontal position');
      const { cov, rate, rateU } = c.update(state);
      info.set(0, [el('strong', {}, `${pct(cov.cDark)} ${L.darkPct || 'dark'}`), el('span', { class: 'demo-note' }, `, ${pct(1 - cov.cDark)} ${L.lightPct || 'light'}`)]);
      info.set(1, [el('strong', {}, `${pct(cov.sDark)} ${L.darkPct || 'dark'}`), el('span', { class: 'demo-note' }, `, ${pct(1 - cov.sDark)} ${L.lightPct || 'light'}`)]);
      const ex = L.explain || {};
      const note = rate > rateU + 8 ? ex.up : rate < rateU - 5 ? ex.down : ex.same;
      info.set(2, [el('strong', {}, `${fmt0(rate)} ${L.spikes || 'spikes/s'}`), el('span', { class: 'demo-note' }, ` ${note || ''}`)]);
    }

    let dragging = false;
    const move = (event) => {
      const [x, y] = c.pointerTo(event);
      state.x = round(clamp(x, -1.2, 1.2));
      if (state.stim !== 'edge') state.y = round(clamp(y, -1, 1));
      syncControls();
      refresh();
    };
    c.hit.on('pointerdown', (event) => { dragging = true; event.target.setPointerCapture?.(event.pointerId); move(event); })
      .on('pointermove', (event) => { if (dragging) move(event); })
      .on('pointerup pointercancel', () => { dragging = false; });

    const presetRow = (props.presets || []).length
      ? el('div', { class: 'btn-row demo-presets' }, [
        el('span', { class: 'widget-legend' }, L.presets || 'Try'),
        ...props.presets.map((p) => el('button', { type: 'button', class: 'btn btn-small', onClick: () => { Object.assign(state, p.state); syncControls(); refresh(); } }, p.label)),
      ])
      : null;

    container.replaceChildren(...[plot, el('div', { class: 'widget-controls' }, [cellRow, stimRow, xRow, yRow, dRow]), presetRow, info.node].filter(Boolean));
    refresh();
  },
};
