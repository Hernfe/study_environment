// Static SVG figures for Lecture 1 that stay hand-drawn: only the
// axonal transport diagram, which no slide or asset library provides.
// Drawn to the figure style spec in docs/DESIGN.md.

import { wrap } from './svg-util.js';

// Anterograde and retrograde transport along a microtubule.
//
// The picture carries no text. Like the d3 figures it returns
// { svg, aspect, regions } so it is shown through the image-hotspots
// widget, which draws the numbered badges in the gutters and holds the
// names in its list (docs/DESIGN.md 6.1 rule 3 and 6.3). Names and
// bodies come from the content file, so this module holds no lecture
// text. Five labelled elements, uniform 1.5 px currentColor strokes, no
// colour of its own: the accent belongs to the widget's marks, and a
// region is invisible until it is hovered, focused or pinned (rule 4).
//
// The viewBox is cropped to the artwork, so region percentages below are
// measured from its top left corner, not from the drawing origin.
const VIEW = { x: 20, y: 60, w: 474, h: 100 };

export function axonalTransportFigure(regionText) {
  const parts = [];
  const stroke = 'stroke="currentColor" stroke-width="1.5"';
  const arrow = 'stroke="currentColor" stroke-width="1.5" marker-end="url(#at-arrow)"';
  // Soma with nucleus.
  parts.push(`<circle cx="70" cy="110" r="42" fill="none" ${stroke} />`);
  parts.push(`<circle cx="70" cy="110" r="13" fill="none" ${stroke} />`);
  // Axon and terminal.
  parts.push(`<path d="M110,94 L430,94 M110,126 L430,126" fill="none" ${stroke} />`);
  parts.push(`<path d="M430,94 C466,90 484,102 484,110 C484,118 466,130 430,126" fill="none" ${stroke} />`);
  // Microtubule.
  parts.push(`<rect x="126" y="107" width="300" height="6" rx="1.5" fill="none" ${stroke} />`);
  // Anterograde: vesicle on kinesin, above the microtubule, moving right.
  parts.push(`<path d="M204,107 L207,100 M212,107 L215,100" ${stroke} />`);
  parts.push(`<circle cx="211" cy="92" r="8" fill="var(--c-surface)" ${stroke} />`);
  parts.push(`<line x1="224" y1="92" x2="258" y2="92" ${arrow} />`);
  // Retrograde: vesicle on dynein, below the microtubule, moving left.
  parts.push(`<path d="M340,113 L337,120 M348,113 L345,120" ${stroke} />`);
  parts.push(`<circle cx="344" cy="128" r="8" fill="var(--c-surface)" ${stroke} />`);
  parts.push(`<line x1="331" y1="128" x2="297" y2="128" ${arrow} />`);
  const defs =
    '<defs><marker id="at-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">' +
    '<path d="M0,0 L10,5 L0,10 Z" fill="currentColor" /></marker></defs>';

  const px = (x) => ((x - VIEW.x) / VIEW.w) * 100;
  const py = (y) => ((y - VIEW.y) / VIEW.h) * 100;
  const T = regionText || {};
  const region = (id, extra) => ({ id, label: T[id]?.label || id, body: T[id]?.body || '', ...extra });
  const regions = [
    region('soma', { x: px(70), y: py(110), w: px(112) - px(28), h: py(152) - py(68), side: 'bottom', mx: px(70), my: py(140) }),
    region('microtubule', { shape: 'line', x: px(126), y: py(110), x2: px(426), y2: py(110), mx: px(200), my: py(110), side: 'bottom' }),
    region('anterograde', { x: px(211), y: py(92), w: px(219) - px(203), h: py(100) - py(84), side: 'top' }),
    region('retrograde', { x: px(344), y: py(128), w: px(352) - px(336), h: py(136) - py(120), side: 'bottom' }),
    region('terminal', { x: px(457), y: py(110), w: px(484) - px(430), h: py(130) - py(90), side: 'top' }),
  ];

  const svg = wrap(VIEW.w, VIEW.h, defs + parts.join('\n'), { viewBox: `${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`, maxWidth: 560 });
  return { svg, aspect: VIEW.w / VIEW.h, regions };
}

// Registry-compatible wrapper (a static svg visual, no regions).
export const axonalTransport = () => axonalTransportFigure().svg;
