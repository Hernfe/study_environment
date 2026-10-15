// Phase locking and the volley principle. A frequency slider sets a
// pure tone; the plot shows ten cycles of it, the spikes of six auditory
// nerve fibres below it, all their spikes pooled on one row, and on the
// right a histogram of the phase at which the pooled spikes fall.
//
// Model (illustrative, not fitted): on each cycle a fibre that is out of
// its refractory period fires with a fixed probability, at the same
// phase of the cycle plus a timing jitter of fixed size in
// microseconds. A single fibre therefore cannot fire on every cycle once
// the period is shorter than its refractory period, but the six together
// still mark almost every cycle: the volley. As the period shrinks
// toward the size of the jitter, the spike phase spreads over the whole
// cycle and locking is lost. With the default jitter of 80 µs the
// vector strength falls through about 0.3 near 3 kHz, the course's
// limit (slide 31; Bear gives about 5 kHz). Random numbers are seeded by
// fibre and cycle, so the raster is stable while the slider moves.
//
// props: {
//   initial: 400, fibres: 6, refractory: 1.0 (ms), probability: 0.6,
//   jitter: 80 (µs),
//   labels: { frequency, sound, fibre, pooled, histogram, phaseAxis,
//             period, single, volley, locking, strong, weak, none, cycles },
// }

import { el } from '../dom.js';
import { svgIn, sliderRow, readout, scaleLinear, MUTED, ACCENT, INK, BORDER, FONT } from './d3util.js';

const W = 660;
const H = 300;
const RX0 = 90;
const RX1 = 470;
const CYCLES = 10;
const F_MIN = 100;
const F_MAX = 8000;

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gauss(r) {
  const u = Math.max(r(), 1e-9);
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * r());
}

// Spike times (ms) of fibre n over `cycles` cycles of a tone of f Hz.
export function fibreSpikes(n, f, cycles, { refractory = 1.0, probability = 0.6, jitter = 80 } = {}) {
  const period = 1000 / f;
  const out = [];
  let last = -Infinity;
  for (let k = 0; k < cycles; k += 1) {
    const r = rng(n * 7919 + k * 104729 + 17);
    const t = (k + 0.5) * period + (gauss(r) * jitter) / 1000;
    if (t - last >= refractory && r() < probability) {
      out.push(t);
      last = t;
    }
  }
  return out;
}

export function vectorStrength(f, jitterUs) {
  const w = 2 * Math.PI * f * (jitterUs / 1e6);
  return Math.exp(-(w * w) / 2);
}

const logF = (v) => Math.round(F_MIN * Math.pow(F_MAX / F_MIN, v / 1000));
const sliderOf = (f) => Math.round(1000 * Math.log(f / F_MIN) / Math.log(F_MAX / F_MIN));
// Two significant figures: 1000 Hz, 3.1 kHz, 16 kHz.
const fmtHz = (f) => { const r = Number(f.toPrecision(2)); return r >= 1000 ? `${r / 1000} kHz` : `${r} Hz`; };

function draw(container, props) {
  const L = props.labels || {};
  const n = props.fibres || 6;
  const opts = { refractory: props.refractory ?? 1.0, probability: props.probability ?? 0.6, jitter: props.jitter ?? 80 };
  const svg = svgIn(container, W, H);
  const rowH = 22;
  const ySound = 36;
  const yFibre = (i) => 82 + i * rowH;
  const yPool = yFibre(n) + 14;

  svg.append('text').attr('x', RX0 - 10).attr('y', ySound).attr('dy', '0.35em').attr('text-anchor', 'end').attr('fill', INK).attr('font-size', FONT - 1).text(L.sound || 'Sound');
  const wave = svg.append('path').attr('fill', 'none').attr('stroke', INK).attr('stroke-width', 1.3);
  const guides = svg.append('g');
  for (let i = 0; i < n; i += 1) {
    svg.append('line').attr('x1', RX0).attr('x2', RX1).attr('y1', yFibre(i) + 8).attr('y2', yFibre(i) + 8).attr('stroke', BORDER);
    svg.append('text').attr('x', RX0 - 10).attr('y', yFibre(i)).attr('dy', '0.35em').attr('text-anchor', 'end').attr('fill', MUTED).attr('font-size', FONT - 2).text(`${L.fibre || 'Fibre'} ${i + 1}`);
  }
  svg.append('line').attr('x1', RX0).attr('x2', RX1).attr('y1', yPool + 10).attr('y2', yPool + 10).attr('stroke', BORDER);
  svg.append('text').attr('x', RX0 - 10).attr('y', yPool).attr('dy', '0.35em').attr('text-anchor', 'end').attr('fill', INK).attr('font-size', FONT - 1).attr('font-weight', 600).text(L.pooled || 'All fibres');
  const raster = svg.append('g');
  const timeLabel = svg.append('text').attr('x', RX1).attr('y', yPool + 30).attr('text-anchor', 'end').attr('fill', MUTED).attr('font-size', FONT - 2);

  // Phase histogram of the pooled spikes over many cycles.
  const HX0 = 512;
  const HX1 = 640;
  const HY1 = yPool + 10;
  const HY0 = 70;
  svg.append('text').attr('x', (HX0 + HX1) / 2).attr('y', HY0 - 14).attr('text-anchor', 'middle').attr('fill', INK).attr('font-size', FONT - 1).text(L.histogram || 'Spike phase');
  svg.append('line').attr('x1', HX0).attr('x2', HX1).attr('y1', HY1).attr('y2', HY1).attr('stroke', BORDER);
  svg.append('text').attr('x', HX0).attr('y', HY1 + 14).attr('fill', MUTED).attr('font-size', FONT - 2).text('0°');
  svg.append('text').attr('x', HX1).attr('y', HY1 + 14).attr('text-anchor', 'end').attr('fill', MUTED).attr('font-size', FONT - 2).text('360°');
  svg.append('text').attr('x', (HX0 + HX1) / 2).attr('y', HY1 + 28).attr('text-anchor', 'middle').attr('fill', MUTED).attr('font-size', FONT - 2).text(L.phaseAxis || '');
  const bars = svg.append('g');

  function update(f) {
    const period = 1000 / f;
    const span = CYCLES * period;
    const x = scaleLinear().domain([0, span]).range([RX0, RX1]);
    const pts = Array.from({ length: 401 }, (_, i) => (i / 400) * span);
    // Spikes fall at mid-cycle, where the wave is at its trough.
    wave.attr('d', `M${pts.map((t) => `${x(t).toFixed(1)},${(ySound - 18 * Math.cos((2 * Math.PI * t) / period)).toFixed(1)}`).join('L')}`);
    guides.selectAll('*').remove();
    for (let k = 0; k < CYCLES; k += 1) {
      guides.append('line').attr('x1', x((k + 0.5) * period)).attr('x2', x((k + 0.5) * period)).attr('y1', ySound + 20).attr('y2', yPool + 10).attr('stroke', BORDER).attr('stroke-dasharray', '1 4');
    }
    raster.selectAll('*').remove();
    const pooled = [];
    for (let i = 0; i < n; i += 1) {
      for (const t of fibreSpikes(i, f, CYCLES, opts)) {
        if (t < 0 || t > span) continue;
        pooled.push(t);
        raster.append('line').attr('x1', x(t)).attr('x2', x(t)).attr('y1', yFibre(i) - 6).attr('y2', yFibre(i) + 8).attr('stroke', INK).attr('stroke-width', 1.5);
      }
    }
    for (const t of pooled) raster.append('line').attr('x1', x(t)).attr('x2', x(t)).attr('y1', yPool - 8).attr('y2', yPool + 10).attr('stroke', ACCENT).attr('stroke-width', 1.5);
    timeLabel.text(`${CYCLES} ${L.cycles || 'cycles'} = ${span >= 10 ? span.toFixed(0) : span.toFixed(1)} ms`);

    // Histogram from 400 cycles.
    const bins = new Array(12).fill(0);
    for (let i = 0; i < n; i += 1) {
      for (const t of fibreSpikes(i, f, 400, opts)) {
        const ph = (((t / period) % 1) + 1) % 1;
        bins[Math.min(11, Math.floor(ph * 12))] += 1;
      }
    }
    const max = Math.max(1, ...bins);
    const bw = (HX1 - HX0) / 12;
    bars.selectAll('*').remove();
    bins.forEach((b, k) => {
      const h = ((HY1 - HY0) * b) / max;
      bars.append('rect').attr('x', HX0 + k * bw + 1).attr('width', bw - 2).attr('y', HY1 - h).attr('height', h).attr('fill', ACCENT).attr('opacity', 0.75);
    });

    // Read-out numbers.
    let single = 0;
    for (let i = 0; i < n; i += 1) single += fibreSpikes(i, f, 400, opts).length;
    single /= n * 400;
    let covered = 0;
    const all = Array.from({ length: n }, (_, i) => fibreSpikes(i, f, 400, opts));
    for (let k = 0; k < 400; k += 1) {
      if (all.some((s) => s.some((t) => Math.floor(t / period) === k))) covered += 1;
    }
    return { period, single, volley: covered / 400, vs: vectorStrength(f, opts.jitter) };
  }
  return { update };
}

export const phaseLocking = {
  fallback(props) {
    const holder = document.createElement('div');
    draw(holder, props).update(props.initial || 400);
    return holder.innerHTML;
  },

  mount(container, props) {
    const L = props.labels || {};
    const plot = el('div', { class: 'plot' });
    const c = draw(plot, props);
    let f = props.initial || 400;
    const info = readout([[L.period || 'Period'], [L.single || 'One fibre fires on'], [L.volley || 'Cycles marked by the population'], [L.locking || 'Phase locking']]);
    function refresh() {
      const r = c.update(f);
      info.set(0, `${r.period >= 1 ? r.period.toFixed(2) : r.period.toFixed(3)} ms`);
      info.set(1, `${Math.round(r.single * 100)} % ${L.ofCycles || 'of cycles'}`);
      info.set(2, `${Math.round(r.volley * 100)} %`);
      const word = r.vs > 0.6 ? L.strong : r.vs > 0.25 ? L.weak : L.none;
      info.set(3, `${word || ''} (${L.vs || 'vector strength'} ${r.vs.toFixed(2)})`);
    }
    const slider = sliderRow(L.frequency || 'Frequency', { min: 0, max: 1000, step: 1, value: sliderOf(f), fmt: (v) => fmtHz(logF(v)) }, (v) => { f = logF(v); refresh(); });
    container.replaceChildren(plot, el('div', { class: 'widget-controls' }, [slider]), info.node);
    refresh();
  },
};
