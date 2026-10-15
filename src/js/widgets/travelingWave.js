// Travelling wave and tonotopy explorer. A frequency slider moves the
// peak of basilar membrane displacement along an uncoiled cochlea, base
// on the left, apex on the right. Under the wave, the membrane is drawn
// to scale in width (about 5 times wider at the apex) with a stiffness
// band (about 100 times stiffer at the base), the two gradients that set
// where each frequency peaks (Bear p. 379).
//
// Model: the place map is the Greenwood function for the human cochlea,
// f = 165.4 (10^(2.1 x) - 0.88) with x the distance from the apex as a
// fraction of the length, an illustrative standard approximation (not
// course material). The wave is a snapshot: an envelope that grows
// slowly from the base, peaks at the place for the frequency, and stops
// abruptly beyond it, with the wavelength shortening toward the peak.
// No animation: a phase slider shifts the snapshot instead.
//
// props: {
//   initial: 1000,                          // Hz
//   labels: { frequency, phase, base, apex, displacement, width, stiffness,
//             narrow, wide, stiff, floppy, peak, place, relWidth, relStiffness,
//             pct, fromBase },
//   marks: [500, 1000, 2000, 4000, 8000, 16000],  // CF ticks along the membrane
// }

import { el } from '../dom.js';
import { svgIn, sliderRow, readout, scaleLinear, MUTED, ACCENT, INK, BORDER, FONT, halo, nextId } from './d3util.js';

const W = 640;
const H = 300;
const X0 = 50;
const X1 = 600;
const F_MIN = 20;
const F_MAX = 20000;

// Distance from the base (0) to the apex (1) where f peaks.
export function placeFromBase(f) {
  const fromApex = Math.log10(f / 165.4 + 0.88) / 2.1;
  return Math.min(1, Math.max(0, 1 - fromApex));
}

function envelope(p, peak) {
  if (p <= peak) return 0.08 + 0.92 * Math.pow(p / Math.max(peak, 1e-3), 2.2);
  return Math.exp(-Math.pow((p - peak) / 0.035, 2));
}

// Phase grows faster near the peak, so the waves bunch up there.
function phaseAt(p, peak) {
  const q = Math.min(p, peak + 0.06) / Math.max(peak, 0.02);
  return 2 * Math.PI * 3.2 * Math.pow(q, 2);
}

const logF = (v) => Math.round(F_MIN * Math.pow(F_MAX / F_MIN, v / 1000));
const sliderOf = (f) => Math.round(1000 * Math.log(f / F_MIN) / Math.log(F_MAX / F_MIN));
// Two significant figures: 1000 Hz, 3.1 kHz, 16 kHz.
const fmtHz = (f) => { const r = Number(f.toPrecision(2)); return r >= 1000 ? `${r / 1000} kHz` : `${r} Hz`; };

function draw(container, props) {
  const L = props.labels || {};
  const svg = svgIn(container, W, H);
  const x = scaleLinear().domain([0, 1]).range([X0, X1]);
  const yMid = 90;
  const amp = 52;

  svg.append('text').attr('x', X0).attr('y', 18).attr('fill', MUTED).text(L.base || 'Base');
  svg.append('text').attr('x', X1).attr('y', 18).attr('text-anchor', 'end').attr('fill', MUTED).text(L.apex || 'Apex');
  svg.append('text').attr('x', X0 - 8).attr('y', yMid).attr('text-anchor', 'end').attr('dy', '0.35em').attr('fill', MUTED).attr('font-size', FONT - 1).text(L.displacement || '');
  svg.append('line').attr('x1', X0).attr('x2', X1).attr('y1', yMid).attr('y2', yMid).attr('stroke', BORDER);
  const envUp = svg.append('path').attr('fill', 'none').attr('stroke', MUTED).attr('stroke-dasharray', '3 3');
  const envDown = svg.append('path').attr('fill', 'none').attr('stroke', MUTED).attr('stroke-dasharray', '3 3');
  const wave = svg.append('path').attr('fill', 'none').attr('stroke', ACCENT).attr('stroke-width', 2);
  const peakLine = svg.append('line').attr('y1', yMid - amp - 8).attr('y2', 236).attr('stroke', ACCENT).attr('stroke-dasharray', '2 3');
  const peakLabel = halo(svg.append('text').attr('y', yMid - amp - 14).attr('text-anchor', 'middle').attr('fill', ACCENT).attr('font-weight', 600));

  // The membrane to scale: narrow at the base, about 5 times wider at
  // the apex, drawn as a band whose height follows the width.
  const yBand = 176;
  const wAt = (p) => 6 + 24 * p;
  const band = Array.from({ length: 51 }, (_, i) => i / 50);
  svg.append('path')
    .attr('d', `M${band.map((p) => `${x(p)},${yBand - wAt(p) / 2}`).join('L')}L${band.slice().reverse().map((p) => `${x(p)},${yBand + wAt(p) / 2}`).join('L')}Z`)
    .attr('fill', 'var(--c-accent-soft)').attr('stroke', INK).attr('stroke-width', 1);
  svg.append('text').attr('x', X0 - 8).attr('y', yBand).attr('text-anchor', 'end').attr('dy', '0.35em').attr('fill', MUTED).attr('font-size', FONT - 1).text(L.width || 'Width');
  svg.append('text').attr('x', X0 + 4).attr('y', yBand - 14).attr('fill', MUTED).attr('font-size', FONT - 1).text(L.narrow || '');
  svg.append('text').attr('x', X1 - 4).attr('y', yBand - 20).attr('text-anchor', 'end').attr('fill', MUTED).attr('font-size', FONT - 1).text(L.wide || '');

  // Stiffness: a band that fades from dark (stiff) to light (floppy), on
  // a log scale, since it drops about 100-fold.
  const yStiff = 214;
  const gradId = nextId('stiff');
  const grad = svg.append('defs').append('linearGradient').attr('id', gradId);
  grad.append('stop').attr('offset', '0%').attr('stop-color', INK).attr('stop-opacity', 0.75);
  grad.append('stop').attr('offset', '100%').attr('stop-color', INK).attr('stop-opacity', 0.04);
  svg.append('rect').attr('x', X0).attr('y', yStiff - 7).attr('width', X1 - X0).attr('height', 14).attr('fill', `url(#${gradId})`).attr('stroke', BORDER);
  svg.append('text').attr('x', X0 - 8).attr('y', yStiff).attr('text-anchor', 'end').attr('dy', '0.35em').attr('fill', MUTED).attr('font-size', FONT - 1).text(L.stiffness || 'Stiffness');
  svg.append('text').attr('x', X0 + 4).attr('y', yStiff + 22).attr('fill', MUTED).attr('font-size', FONT - 1).text(L.stiff || '');
  svg.append('text').attr('x', X1 - 4).attr('y', yStiff + 22).attr('text-anchor', 'end').attr('fill', MUTED).attr('font-size', FONT - 1).text(L.floppy || '');

  // Characteristic-frequency ticks along the membrane (Figure 11.10c).
  const yTicks = 262;
  for (const f of props.marks || []) {
    const px = x(placeFromBase(f));
    svg.append('line').attr('x1', px).attr('x2', px).attr('y1', yTicks - 6).attr('y2', yTicks).attr('stroke', MUTED);
    svg.append('text').attr('x', px).attr('y', yTicks + 13).attr('text-anchor', 'middle').attr('fill', MUTED).attr('font-size', FONT - 1).text(fmtHz(f));
  }
  svg.append('line').attr('x1', X0).attr('x2', X1).attr('y1', yTicks).attr('y2', yTicks).attr('stroke', BORDER);
  svg.append('text').attr('x', X0 - 8).attr('y', yTicks).attr('text-anchor', 'end').attr('dy', '0.35em').attr('fill', MUTED).attr('font-size', FONT - 1).text(L.place || '');

  function update(f, phase) {
    const peak = placeFromBase(f);
    const pts = Array.from({ length: 401 }, (_, i) => i / 400);
    const y = (p) => yMid - amp * envelope(p, peak) * Math.sin(phaseAt(p, peak) - phase);
    wave.attr('d', `M${pts.map((p) => `${x(p).toFixed(1)},${y(p).toFixed(1)}`).join('L')}`);
    envUp.attr('d', `M${pts.map((p) => `${x(p).toFixed(1)},${(yMid - amp * envelope(p, peak)).toFixed(1)}`).join('L')}`);
    envDown.attr('d', `M${pts.map((p) => `${x(p).toFixed(1)},${(yMid + amp * envelope(p, peak)).toFixed(1)}`).join('L')}`);
    peakLine.attr('x1', x(peak)).attr('x2', x(peak));
    peakLabel.attr('x', Math.min(X1 - 30, Math.max(X0 + 30, x(peak)))).text(L.peak || 'Peak');
    return peak;
  }
  return { update };
}

export const travelingWave = {
  fallback(props) {
    const holder = document.createElement('div');
    draw(holder, props).update(props.initial || 1000, 0);
    return holder.innerHTML;
  },

  mount(container, props) {
    const L = props.labels || {};
    const plot = el('div', { class: 'plot' });
    const c = draw(plot, props);
    let f = props.initial || 1000;
    let phase = 0;
    const info = readout([[L.peakAt || 'Peak'], [L.relWidth || 'Width at the peak'], [L.relStiffness || 'Stiffness at the peak']]);
    function refresh() {
      const p = c.update(f, phase);
      info.set(0, `${Math.round(p * 100)} ${L.fromBase || '% of the way from base to apex'}`);
      info.set(1, `${(1 + 4 * p).toFixed(1)} × ${L.baseWord || 'the base'}`);
      const stiff = Math.pow(100, -p);
      info.set(2, stiff >= 0.1 ? `${stiff.toFixed(2)} × ${L.baseWord || 'the base'}` : `1/${Math.round(1 / stiff)} × ${L.baseWord || 'the base'}`);
    }
    const freq = sliderRow(L.frequency || 'Frequency', { min: 0, max: 1000, step: 1, value: sliderOf(f), fmt: (v) => fmtHz(logF(v)) }, (v) => { f = logF(v); refresh(); });
    const ph = sliderRow(L.phase || 'Moment in the cycle', { min: 0, max: 360, step: 15, value: 0, unit: '°' }, (v) => { phase = (v * Math.PI) / 180; refresh(); });
    container.replaceChildren(plot, el('div', { class: 'widget-controls' }, [freq, ph]), info.node);
    refresh();
  },
};
