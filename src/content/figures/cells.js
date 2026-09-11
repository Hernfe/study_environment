// Static figures for Lecture 1: cortical layers (V1 versus V2), the
// steps of chemical synaptic transmission, axonal transport, the glial
// cell types, and what three stains reveal.

import { esc, text, wrap } from './svg-util.js';

// Deterministic pseudo-random dots so the figure is identical on every render.
function dots(x, y, w, h, n, seed, r = 1.6, fill = 'var(--c-accent)') {
  let s = seed;
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const out = [];
  for (let i = 0; i < n; i += 1) {
    out.push(`<circle cx="${(x + rnd() * w).toFixed(1)}" cy="${(y + rnd() * h).toFixed(1)}" r="${r}" fill="${fill}" />`);
  }
  return out.join('');
}

// Cytoarchitecture: six layers, V1 with a thick, subdivided layer 4.
export function corticalLayers() {
  const columns = [
    { x: 70, title: 'Primary visual cortex (V1)', v1: true },
    { x: 270, title: 'Secondary visual cortex (V2)', v1: false },
  ];
  const layers = [
    { name: 'I', h: 26, density: 6 },
    { name: 'II', h: 22, density: 40 },
    { name: 'III', h: 40, density: 34 },
    { name: 'IV', h: 0, density: 0 },
    { name: 'V', h: 34, density: 24 },
    { name: 'VI', h: 34, density: 30 },
  ];
  const parts = [];
  parts.push(text(40, 32, 'Layer', { anchor: 'end', size: 10, fill: 'var(--c-text-muted)', halo: false }));
  columns.forEach((c, ci) => {
    parts.push(text(c.x + 70, 20, c.title, { size: 11, weight: 600, halo: false }));
    let y = 40;
    layers.forEach((l, li) => {
      let h = l.h;
      if (l.name === 'IV') h = c.v1 ? 70 : 26;
      parts.push(`<rect x="${c.x}" y="${y}" width="140" height="${h}" fill="var(--c-surface)" stroke="var(--c-border)" />`);
      if (l.name === 'IV') {
        if (c.v1) {
          parts.push(dots(c.x + 4, y + 2, 132, 18, 60, 7 + li, 1.4));
          parts.push(`<rect x="${c.x}" y="${y + 22}" width="140" height="14" fill="var(--c-accent-soft)" />`);
          parts.push(dots(c.x + 4, y + 24, 132, 10, 10, 11, 1.4));
          parts.push(dots(c.x + 4, y + 40, 132, 28, 130, 13, 1.4));
          parts.push(text(c.x + 146, y + 12, '4A', { anchor: 'start', size: 9, fill: 'var(--c-text-muted)', halo: false }));
          parts.push(text(c.x + 146, y + 32, '4B (Gennari)', { anchor: 'start', size: 9, fill: 'var(--c-text-muted)', halo: false }));
          parts.push(text(c.x + 146, y + 58, '4C', { anchor: 'start', size: 9, fill: 'var(--c-text-muted)', halo: false }));
        } else {
          parts.push(dots(c.x + 4, y + 2, 132, h - 4, 48, 17, 1.4));
        }
      } else {
        parts.push(dots(c.x + 4, y + 2, 132, h - 4, l.density, 3 * li + ci, l.name === 'V' ? 2.2 : 1.6));
      }
      if (ci === 0) parts.push(text(40, y + h / 2 + 4, l.name, { anchor: 'end', size: 11, halo: false }));
      y += h;
    });
    parts.push(text(c.x + 70, y + 16, 'white matter', { size: 10, fill: 'var(--c-text-muted)', halo: false }));
  });
  parts.push(text(250, 308, 'Nissl-stained cell bodies. Layer 4 is thick and subdivided in V1, thin in V2.', { size: 10, fill: 'var(--c-text-muted)', halo: false }));
  return wrap(500, 316, parts.join('\n'));
}

// Chemical synaptic transmission in five numbered steps.
export function synapseSteps() {
  const parts = [];
  const stroke = 'stroke="currentColor" stroke-width="2"';
  // Axon coming in from the left, terminal bulb.
  parts.push(`<path d="M20,110 L120,110" fill="none" ${stroke} />`);
  parts.push(`<path d="M20,130 L120,130" fill="none" ${stroke} />`);
  parts.push(`<path d="M120,110 C170,60 290,60 300,120 C302,150 280,175 250,180 L180,182 C140,182 122,160 120,130 Z" fill="var(--c-bg)" ${stroke} />`);
  // Mitochondrion.
  parts.push(`<ellipse cx="190" cy="100" rx="26" ry="11" fill="var(--c-surface)" ${stroke} />`);
  parts.push(`<path d="M172,100 C178,92 184,108 190,100 C196,92 202,108 208,100" fill="none" stroke="currentColor" stroke-width="1" />`);
  // Vesicles.
  const vesicles = [
    [200, 140],
    [222, 150],
    [246, 148],
    [212, 162],
    [236, 166],
    [262, 160],
  ];
  vesicles.forEach(([x, y]) => parts.push(`<circle cx="${x}" cy="${y}" r="8" fill="var(--c-accent-soft)" ${stroke} />`));
  // Vesicle fusing at the active zone.
  parts.push(`<path d="M228,180 C228,172 244,172 244,180" fill="var(--c-accent-soft)" ${stroke} />`);
  // Calcium channel in the terminal membrane.
  parts.push(`<rect x="272" y="170" width="6" height="14" fill="var(--c-accent)" />`);
  parts.push(`<rect x="284" y="170" width="6" height="14" fill="var(--c-accent)" />`);
  parts.push(text(281, 200, 'Ca2+', { size: 10, halo: false }));
  parts.push(`<path d="M281,196 L281,186" stroke="var(--c-accent)" stroke-width="1.5" marker-end="url(#ss-arrow)" />`);
  // Cleft and postsynaptic membrane.
  parts.push(`<path d="M140,200 L330,200" fill="none" ${stroke} />`);
  parts.push(`<rect x="140" y="200" width="190" height="34" fill="var(--c-bg)" stroke="none" />`);
  parts.push(`<path d="M140,234 L330,234" fill="none" ${stroke} />`);
  // Receptors.
  [200, 236, 270].forEach((x) => {
    parts.push(`<rect x="${x - 6}" y="196" width="5" height="12" fill="var(--c-accent)" />`);
    parts.push(`<rect x="${x + 1}" y="196" width="5" height="12" fill="var(--c-accent)" />`);
  });
  // Transmitter molecules in the cleft.
  [[232, 190], [240, 194], [226, 194], [236, 186]].forEach(([x, y]) => parts.push(`<circle cx="${x}" cy="${y}" r="2" fill="currentColor" />`));

  // Step markers.
  const step = (n, x, y, label, anchor = 'start') => {
    parts.push(`<circle cx="${x}" cy="${y}" r="9" fill="var(--c-accent)" />`);
    parts.push(text(x, y + 4, String(n), { size: 11, fill: 'var(--c-bg)', halo: false }));
    parts.push(text(anchor === 'start' ? x + 14 : x - 14, y + 4, label, { anchor, size: 11 }));
  };
  step(1, 30, 40, 'Action potential arrives at the terminal');
  step(2, 330, 160, 'Voltage-gated Ca2+ channels open, Ca2+ enters');
  step(3, 330, 122, 'Vesicles fuse and release neurotransmitter');
  step(4, 330, 216, 'Transmitter crosses the synaptic cleft');
  step(5, 330, 250, 'Binds receptors: postsynaptic response');
  parts.push(text(60, 152, 'presynaptic axon terminal', { anchor: 'start', size: 10, fill: 'var(--c-text-muted)' }));
  parts.push(text(150, 252, 'postsynaptic dendrite', { anchor: 'start', size: 10, fill: 'var(--c-text-muted)' }));
  parts.push(text(148, 222, 'synaptic cleft', { anchor: 'start', size: 10, fill: 'var(--c-text-muted)' }));
  parts.push(text(190, 82, 'mitochondrion', { size: 9, fill: 'var(--c-text-muted)' }));
  parts.push(text(232, 128, 'synaptic vesicles', { size: 9, fill: 'var(--c-text-muted)' }));

  const defs = `<defs><marker id="ss-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="var(--c-accent)" /></marker></defs>`;
  return wrap(600, 270, defs + parts.join('\n'));
}

// Anterograde and retrograde transport along a microtubule.
export function axonalTransport() {
  const parts = [];
  const stroke = 'stroke="currentColor" stroke-width="2"';
  parts.push(`<circle cx="70" cy="120" r="48" fill="var(--c-bg)" ${stroke} />`);
  parts.push(`<circle cx="70" cy="120" r="16" fill="var(--c-surface)" ${stroke} />`);
  parts.push(text(70, 184, 'soma', { size: 11 }));
  parts.push(text(70, 124, 'nucleus', { size: 9, fill: 'var(--c-text-muted)', halo: false }));
  // Axon.
  parts.push(`<path d="M116,100 L430,100" fill="none" ${stroke} />`);
  parts.push(`<path d="M116,140 L430,140" fill="none" ${stroke} />`);
  // Terminal.
  parts.push(`<path d="M430,100 C470,96 490,110 490,120 C490,130 470,144 430,140 Z" fill="var(--c-accent-soft)" ${stroke} />`);
  parts.push(text(460, 164, 'axon terminal', { size: 11 }));
  // Microtubule.
  parts.push(`<rect x="130" y="116" width="296" height="8" rx="2" fill="var(--c-surface)" stroke="currentColor" stroke-width="1.5" />`);
  for (let x = 136; x < 424; x += 12) parts.push(`<line x1="${x}" y1="116" x2="${x}" y2="124" stroke="var(--c-border)" stroke-width="1" />`);
  parts.push(text(180, 170, 'microtubule', { size: 10, fill: 'var(--c-text-muted)' }));
  parts.push(`<line x1="180" y1="160" x2="180" y2="126" stroke="var(--c-text-muted)" stroke-width="1" />`);
  // Anterograde vesicle with kinesin (above the microtubule, moving right).
  parts.push(`<path d="M200,116 L204,108 M208,116 L212,108" stroke="var(--c-accent)" stroke-width="2" />`);
  parts.push(`<circle cx="208" cy="98" r="9" fill="var(--c-accent-soft)" ${stroke} />`);
  parts.push(`<line x1="222" y1="86" x2="262" y2="86" stroke="var(--c-accent)" stroke-width="2" marker-end="url(#at-arrow)" />`);
  parts.push(text(240, 76, 'anterograde, kinesin', { size: 10 }));
  // Retrograde vesicle with dynein (below the microtubule, moving left).
  parts.push(`<path d="M340,124 L336,132 M348,124 L344,132" stroke="var(--c-accent)" stroke-width="2" />`);
  parts.push(`<circle cx="340" cy="142" r="9" fill="var(--c-accent-soft)" ${stroke} />`);
  parts.push(`<line x1="326" y1="156" x2="286" y2="156" stroke="var(--c-accent)" stroke-width="2" marker-end="url(#at-arrow)" />`);
  parts.push(text(306, 172, 'retrograde, dynein', { size: 10 }));
  parts.push(text(300, 30, 'Proteins are made in the soma (ribosomes). The axon has none.', { size: 11 }));
  parts.push(text(300, 46, 'Vesicles walk along microtubules using ATP.', { size: 11, fill: 'var(--c-text-muted)' }));
  const defs = `<defs><marker id="at-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="var(--c-accent)" /></marker></defs>`;
  return wrap(520, 200, defs + parts.join('\n'));
}

// Glial cell drawings used by the comparison card.
function astrocyteDrawing(x, y, scale = 1) {
  const arms = [];
  for (let i = 0; i < 9; i += 1) {
    const a = (i / 9) * Math.PI * 2;
    const ex = x + Math.cos(a) * 42 * scale;
    const ey = y + Math.sin(a) * 42 * scale;
    const mx = x + Math.cos(a + 0.35) * 22 * scale;
    const my = y + Math.sin(a + 0.35) * 22 * scale;
    arms.push(`<path d="M${x},${y} Q${mx},${my} ${ex},${ey}" fill="none" stroke="currentColor" stroke-width="${3 * scale}" stroke-linecap="round" />`);
    arms.push(`<path d="M${ex},${ey} l${Math.cos(a - 0.5) * 10 * scale},${Math.sin(a - 0.5) * 10 * scale}" fill="none" stroke="currentColor" stroke-width="${2 * scale}" stroke-linecap="round" />`);
  }
  return arms.join('') + `<circle cx="${x}" cy="${y}" r="${12 * scale}" fill="var(--c-accent-soft)" stroke="currentColor" stroke-width="2" />`;
}

function myelinatedAxon(x, y, len, segments, cellBody, single) {
  const parts = [];
  parts.push(`<path d="M${x},${y} L${x + len},${y}" stroke="currentColor" stroke-width="3" />`);
  const segLen = len / segments;
  for (let i = 0; i < segments; i += 1) {
    const sx = x + i * segLen + 4;
    parts.push(`<rect x="${sx}" y="${y - 9}" width="${segLen - 8}" height="18" rx="6" fill="var(--c-accent-soft)" stroke="currentColor" stroke-width="2" />`);
  }
  if (cellBody) {
    const [cx, cy] = cellBody;
    parts.push(`<circle cx="${cx}" cy="${cy}" r="10" fill="var(--c-surface)" stroke="currentColor" stroke-width="2" />`);
    if (single) {
      parts.push(`<path d="M${cx},${cy + 10} L${cx},${y - 9}" stroke="currentColor" stroke-width="2" />`);
    }
  }
  return parts.join('');
}

export function astrocyteFigure() {
  const parts = [astrocyteDrawing(120, 90)];
  // Synapse enveloped by an astrocyte process, and a capillary.
  parts.push(`<path d="M200,40 L230,60" stroke="currentColor" stroke-width="3" stroke-linecap="round" />`);
  parts.push(`<circle cx="236" cy="66" r="9" fill="var(--c-accent-soft)" stroke="currentColor" stroke-width="2" />`);
  parts.push(`<path d="M228,80 L250,80" stroke="currentColor" stroke-width="3" />`);
  parts.push(`<path d="M222,60 C214,72 218,88 232,92" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />`);
  parts.push(`<path d="M252,62 C260,72 258,88 246,92" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />`);
  parts.push(text(240, 112, 'wraps synapses', { size: 10, fill: 'var(--c-text-muted)' }));
  parts.push(`<rect x="200" y="130" width="80" height="14" rx="7" fill="var(--c-surface)" stroke="currentColor" stroke-width="2" />`);
  parts.push(`<path d="M158,120 L200,137" stroke="currentColor" stroke-width="3" stroke-linecap="round" />`);
  parts.push(text(240, 160, 'end-feet on blood vessels', { size: 10, fill: 'var(--c-text-muted)' }));
  parts.push(text(120, 160, 'astrocyte', { size: 11 }));
  return wrap(300, 176, parts.join(''));
}

export function oligodendrocyteFigure() {
  const parts = [];
  parts.push(myelinatedAxon(20, 60, 260, 4, [150, 22], false));
  parts.push(myelinatedAxon(20, 110, 260, 4, null, false));
  parts.push(myelinatedAxon(20, 160, 260, 4, null, false));
  // Processes from one cell body to segments on several axons.
  [[80, 60], [214, 60], [80, 110], [214, 110], [147, 160]].forEach(([sx, sy]) => {
    parts.push(`<path d="M150,32 Q${(150 + sx) / 2},${(32 + sy) / 2 - 10} ${sx},${sy - 9}" fill="none" stroke="currentColor" stroke-width="1.5" />`);
  });
  parts.push(text(168, 18, 'one cell, several axons', { anchor: 'start', size: 10, fill: 'var(--c-text-muted)' }));
  parts.push(text(60, 82, 'node of Ranvier', { size: 9, fill: 'var(--c-text-muted)' }));
  parts.push(`<line x1="86" y1="72" x2="86" y2="66" stroke="var(--c-text-muted)" stroke-width="1" />`);
  return wrap(300, 176, parts.join(''));
}

export function schwannFigure() {
  const parts = [];
  parts.push(myelinatedAxon(20, 110, 260, 4, null, false));
  // Each segment has its own Schwann cell nucleus on the sheath.
  [52, 117, 182, 247].forEach((cx) => {
    parts.push(`<ellipse cx="${cx}" cy="103" rx="8" ry="4" fill="var(--c-surface)" stroke="currentColor" stroke-width="1.5" />`);
  });
  parts.push(text(150, 60, 'one Schwann cell per segment of one axon', { size: 10, fill: 'var(--c-text-muted)' }));
  parts.push(text(150, 150, 'peripheral nerve axon', { size: 11 }));
  return wrap(300, 176, parts.join(''));
}

export function microgliaFigure() {
  const parts = [];
  const x = 120;
  const y = 90;
  for (let i = 0; i < 7; i += 1) {
    const a = (i / 7) * Math.PI * 2 + 0.3;
    const ex = x + Math.cos(a) * 40;
    const ey = y + Math.sin(a) * 40;
    parts.push(`<path d="M${x},${y} L${ex},${ey}" stroke="currentColor" stroke-width="2" stroke-linecap="round" />`);
    parts.push(`<path d="M${ex},${ey} l${Math.cos(a + 0.9) * 12},${Math.sin(a + 0.9) * 12} M${ex},${ey} l${Math.cos(a - 0.9) * 12},${Math.sin(a - 0.9) * 12}" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />`);
  }
  parts.push(`<ellipse cx="${x}" cy="${y}" rx="12" ry="8" fill="var(--c-accent-soft)" stroke="currentColor" stroke-width="2" />`);
  // Debris being engulfed.
  parts.push(`<circle cx="225" cy="70" r="6" fill="var(--c-border)" />`);
  parts.push(`<circle cx="240" cy="92" r="4" fill="var(--c-border)" />`);
  parts.push(`<path d="M200,78 C212,62 232,60 244,74" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="3 3" />`);
  parts.push(text(232, 118, 'engulfs debris', { size: 10, fill: 'var(--c-text-muted)' }));
  parts.push(text(120, 160, 'microglial cell', { size: 11 }));
  return wrap(300, 176, parts.join(''));
}

export function gliaOverview() {
  const inner = (svg) => svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  return wrap(
    620,
    380,
    `<g transform="translate(0 0)">${inner(astrocyteFigure())}</g>` +
      `<g transform="translate(310 0)">${inner(oligodendrocyteFigure())}</g>` +
      `<g transform="translate(0 190)">${inner(schwannFigure())}</g>` +
      `<g transform="translate(310 190)">${inner(microgliaFigure())}</g>`
  );
}

// The same patch of cortex seen with three methods.
function neuronOutline(x, y, s, stroke, fill) {
  const d = [
    `M${x},${y - 8 * s} L${x - 7 * s},${y + 6 * s} L${x + 7 * s},${y + 6 * s} Z`,
  ];
  return `<path d="${d.join(' ')}" fill="${fill}" stroke="${stroke}" stroke-width="${1.2 * s}" stroke-linejoin="round" />`;
}

function golgiNeuron(x, y, s) {
  const parts = [];
  parts.push(neuronOutline(x, y, s, 'currentColor', 'currentColor'));
  parts.push(`<path d="M${x},${y - 8 * s} L${x},${y - 46 * s} M${x},${y - 30 * s} l${-14 * s},${-12 * s} M${x},${y - 30 * s} l${14 * s},${-10 * s} M${x},${y - 46 * s} l${-10 * s},${-10 * s} M${x},${y - 46 * s} l${9 * s},${-11 * s}" fill="none" stroke="currentColor" stroke-width="${1.6 * s}" stroke-linecap="round" />`);
  parts.push(`<path d="M${x - 7 * s},${y + 2 * s} l${-16 * s},${4 * s} M${x + 7 * s},${y + 2 * s} l${16 * s},${5 * s}" fill="none" stroke="currentColor" stroke-width="${1.4 * s}" stroke-linecap="round" />`);
  parts.push(`<path d="M${x},${y + 6 * s} L${x + 2 * s},${y + 50 * s}" fill="none" stroke="currentColor" stroke-width="${1.2 * s}" />`);
  return parts.join('');
}

export function stainPanel(kind) {
  const parts = [];
  parts.push(`<rect x="0" y="0" width="200" height="176" rx="6" fill="var(--c-surface)" stroke="var(--c-border)" />`);
  if (kind === 'nissl') {
    // Every cell body, neurons as triangles, glia as small round nuclei.
    const cells = [
      [40, 40, 1], [95, 30, 1.2], [150, 48, 0.9], [60, 90, 1.3], [120, 84, 1], [170, 100, 1.1],
      [35, 140, 1], [90, 130, 1.2], [140, 146, 1], [180, 150, 0.8],
    ];
    cells.forEach(([x, y, s]) => parts.push(neuronOutline(x, y, s * 1.4, 'var(--c-accent)', 'var(--c-accent-soft)')));
    const glia = [[70, 60], [130, 40], [30, 110], [110, 110], [160, 130], [80, 160], [185, 70], [20, 60]];
    glia.forEach(([x, y]) => parts.push(`<circle cx="${x}" cy="${y}" r="3.5" fill="var(--c-accent)" />`));
    parts.push(text(100, 170, 'all cell bodies, no processes', { size: 9, fill: 'var(--c-text-muted)', halo: false }));
  } else if (kind === 'golgi') {
    parts.push(golgiNeuron(60, 80, 1));
    parts.push(golgiNeuron(140, 110, 0.9));
    // Faint unstained neighbours.
    [[100, 40], [170, 50], [30, 140], [110, 150]].forEach(([x, y]) => parts.push(neuronOutline(x, y, 1.2, 'var(--c-border)', 'none')));
    parts.push(text(100, 170, 'a few whole neurons, dendrites and axon', { size: 9, fill: 'var(--c-text-muted)', halo: false }));
  } else {
    // Electron microscope: membranes and a synapse with a cleft.
    parts.push(`<path d="M10,60 C50,40 90,40 120,60 C150,80 190,80 195,60" fill="none" stroke="currentColor" stroke-width="2" />`);
    parts.push(`<path d="M10,72 C50,52 90,52 120,72 C150,92 190,92 195,72" fill="none" stroke="currentColor" stroke-width="2" />`);
    parts.push(`<path d="M10,90 C50,110 90,110 120,90 C150,70 190,70 195,90" fill="none" stroke="currentColor" stroke-width="2" />`);
    parts.push(`<path d="M10,102 C50,122 90,122 120,102 C150,82 190,82 195,102" fill="none" stroke="currentColor" stroke-width="2" />`);
    [[40, 30], [60, 24], [80, 34], [50, 46], [96, 46]].forEach(([x, y]) => parts.push(`<circle cx="${x}" cy="${y}" r="5" fill="none" stroke="currentColor" stroke-width="1.5" />`));
    parts.push(`<rect x="30" y="100" width="90" height="4" fill="currentColor" opacity="0.8" />`);
    parts.push(text(100, 18, 'presynaptic terminal, vesicles', { size: 9, fill: 'var(--c-text-muted)', halo: false }));
    parts.push(text(148, 82, 'cleft, 20 nm', { size: 9, fill: 'var(--c-text-muted)', anchor: 'start', halo: false }));
    parts.push(text(100, 140, 'two separate membranes', { size: 9, fill: 'var(--c-text-muted)', halo: false }));
    parts.push(text(100, 170, 'membranes and synapses at 0.1 nm resolution', { size: 9, fill: 'var(--c-text-muted)', halo: false }));
  }
  return wrap(200, 176, parts.join(''), { maxWidth: 260 });
}

export function stainTriptych() {
  const inner = (svg) => svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  const label = (x, t) => text(x + 100, 194, t, { size: 11, weight: 600, halo: false });
  return wrap(
    640,
    200,
    `<g>${inner(stainPanel('nissl'))}</g><g transform="translate(220 0)">${inner(stainPanel('golgi'))}</g><g transform="translate(440 0)">${inner(stainPanel('em'))}</g>` +
      label(0, 'Nissl stain') +
      label(220, 'Golgi stain') +
      label(440, 'Electron microscope')
  );
}
