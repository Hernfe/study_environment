// Static SVG figures for Lecture 1 that stay hand-drawn: only the
// axonal transport diagram, which no slide or asset library provides.
// Drawn to the figure style spec in docs/DESIGN.md.

import { text, wrap } from './svg-util.js';

// Anterograde and retrograde transport along a microtubule.
export function axonalTransport() {
  // Style spec (docs/DESIGN.md, Figures): six labelled elements, labels
  // outside the drawing with short leader lines, uniform 1.5 px strokes,
  // colour only on the two moving vesicles.
  const parts = [];
  const stroke = 'stroke="currentColor" stroke-width="1.5"';
  const leader = 'stroke="var(--c-text-muted)" stroke-width="1"';
  const label = (x, y, t, anchor = 'middle') => text(x, y, t, { size: 11, anchor, halo: false });
  // Soma with nucleus.
  parts.push(`<circle cx="70" cy="110" r="42" fill="none" ${stroke} />`);
  parts.push(`<circle cx="70" cy="110" r="13" fill="none" ${stroke} />`);
  parts.push(`<line x1="70" y1="152" x2="70" y2="170" ${leader} />`);
  parts.push(label(70, 184, 'soma'));
  // Axon and terminal.
  parts.push(`<path d="M110,94 L430,94 M110,126 L430,126" fill="none" ${stroke} />`);
  parts.push(`<path d="M430,94 C466,90 484,102 484,110 C484,118 466,130 430,126" fill="none" ${stroke} />`);
  parts.push(`<line x1="460" y1="128" x2="460" y2="170" ${leader} />`);
  parts.push(label(460, 184, 'axon terminal'));
  // Microtubule.
  parts.push(`<rect x="126" y="107" width="300" height="6" rx="1.5" fill="none" ${stroke} />`);
  parts.push(`<line x1="170" y1="113" x2="170" y2="170" ${leader} />`);
  parts.push(label(170, 184, 'microtubule'));
  // Anterograde: vesicle on kinesin, above the microtubule, moving right.
  parts.push(`<path d="M204,107 L207,100 M212,107 L215,100" stroke="var(--c-accent)" stroke-width="1.5" />`);
  parts.push(`<circle cx="211" cy="92" r="8" fill="var(--c-accent-soft)" stroke="var(--c-accent)" stroke-width="1.5" />`);
  parts.push(`<line x1="224" y1="92" x2="258" y2="92" stroke="var(--c-accent)" stroke-width="1.5" marker-end="url(#at-arrow)" />`);
  parts.push(`<line x1="211" y1="84" x2="211" y2="50" ${leader} />`);
  parts.push(label(211, 44, 'anterograde: kinesin, soma to terminal'));
  // Retrograde: vesicle on dynein, below the microtubule, moving left.
  parts.push(`<path d="M340,113 L337,120 M348,113 L345,120" stroke="var(--c-accent)" stroke-width="1.5" />`);
  parts.push(`<circle cx="344" cy="128" r="8" fill="var(--c-accent-soft)" stroke="var(--c-accent)" stroke-width="1.5" />`);
  parts.push(`<line x1="331" y1="128" x2="297" y2="128" stroke="var(--c-accent)" stroke-width="1.5" marker-end="url(#at-arrow)" />`);
  parts.push(`<line x1="344" y1="136" x2="344" y2="150" ${leader} />`);
  parts.push(label(344, 164, 'retrograde: dynein, terminal to soma'));
  const defs = `<defs><marker id="at-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="var(--c-accent)" /></marker></defs>`;
  return wrap(520, 196, defs + parts.join('\n'));
}
