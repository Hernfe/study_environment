// A prototypical multipolar neuron. Dendrites at the left, soma in the
// middle, axon to the right ending in terminals on a target dendrite.
// props.labels toggles the text so the same drawing serves a label
// question. Every part carries data-region so the neuron-parts widget
// can make it clickable.

const W = 480;
const H = 300;

export const NEURON_REGIONS = [
  { key: 'dendrites', label: 'Dendrites', at: [60, 40] },
  { key: 'soma', label: 'Soma (cell body)', at: [150, 200] },
  { key: 'nucleus', label: 'Nucleus', at: [150, 80] },
  { key: 'axon-hillock', label: 'Axon hillock', at: [262, 190] },
  { key: 'axon', label: 'Axon', at: [300, 105] },
  { key: 'axon-collateral', label: 'Axon collateral', at: [330, 250] },
  { key: 'axon-terminal', label: 'Axon terminal', at: [400, 74] },
  { key: 'synapse', label: 'Synapse', at: [420, 215] },
];

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

function text(x, y, content, anchor = 'middle') {
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="12" fill="currentColor" paint-order="stroke" stroke="var(--c-surface)" stroke-width="3" stroke-linejoin="round">${esc(content)}</text>`;
}

export function neuron(props = {}) {
  const labels = props.labels !== false;
  const stroke = 'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';

  // Dendrite trunks and branches, drawn as one group so hover covers all.
  const dendrites = [
    'M132,102 C110,80 90,60 70,30',
    'M70,30 C60,20 50,18 40,14',
    'M70,30 C75,18 80,12 84,4',
    'M90,60 C75,58 60,58 45,62',
    'M110,80 C120,60 128,40 132,20',
    'M140,98 C150,70 158,50 170,30',
    'M170,30 C180,22 190,18 204,16',
    'M158,50 C170,52 182,48 196,44',
    'M126,140 C100,150 80,160 55,178',
    'M80,160 C70,172 62,186 58,204',
    'M118,150 C105,175 95,195 88,220',
  ];

  const parts = [];

  // Target dendrite the terminals contact (postsynaptic cell).
  parts.push(`<path d="M400,262 C430,235 450,200 470,150" fill="none" ${stroke} opacity="0.5" />`);
  parts.push(`<path d="M400,262 C410,275 425,280 445,290" fill="none" ${stroke} opacity="0.5" />`);

  // Dendrites.
  parts.push(
    `<g data-region="dendrites" class="map-region map-line" fill="none" ${stroke}>` +
      dendrites.map((d) => `<path d="${d}" />`).join('') +
      `<path d="M132,102 L140,98 L126,140 L118,150 Z" fill="var(--c-bg)" stroke="none" pointer-events="all" /></g>`
  );

  // Axon, collateral and terminals (drawn before the soma so the hillock overlaps).
  parts.push(`<path data-region="axon" class="map-region map-line" d="M212,150 C260,140 300,120 340,120 C370,120 385,120 400,118" fill="none" ${stroke} />`);
  parts.push(`<path data-region="axon-collateral" class="map-region map-line" d="M300,122 C315,150 320,190 330,225" fill="none" ${stroke} />`);
  parts.push(
    `<g data-region="axon-terminal" class="map-region">` +
      `<path d="M400,118 C412,116 420,108 430,100" fill="none" ${stroke} />` +
      `<path d="M400,118 C412,122 420,135 428,150" fill="none" ${stroke} />` +
      `<ellipse cx="436" cy="96" rx="12" ry="9" fill="var(--c-accent-soft)" ${stroke} />` +
      `<ellipse cx="433" cy="156" rx="12" ry="9" fill="var(--c-accent-soft)" ${stroke} />` +
      `<circle cx="433" cy="94" r="1.6" fill="currentColor" /><circle cx="439" cy="98" r="1.6" fill="currentColor" /><circle cx="436" cy="92" r="1.6" fill="currentColor" />` +
      `<circle cx="430" cy="154" r="1.6" fill="currentColor" /><circle cx="436" cy="158" r="1.6" fill="currentColor" /><circle cx="433" cy="152" r="1.6" fill="currentColor" />` +
      `</g>`
  );
  parts.push(
    `<g data-region="synapse" class="map-region">` +
      `<ellipse cx="333" cy="232" rx="10" ry="8" fill="var(--c-accent-soft)" ${stroke} />` +
      `<circle cx="331" cy="231" r="1.6" fill="currentColor" /><circle cx="336" cy="234" r="1.6" fill="currentColor" />` +
      `<path d="M322,244 C332,242 342,242 352,244" fill="none" ${stroke} />` +
      `<rect x="318" y="238" width="36" height="12" fill="transparent" stroke="none" />` +
      `</g>`
  );

  // Soma, hillock and nucleus.
  parts.push(`<path data-region="axon-hillock" class="map-region" d="M186,132 C200,138 208,146 216,150 C208,154 200,160 186,166 Z" fill="var(--c-accent-soft)" ${stroke} />`);
  parts.push(`<path data-region="soma" class="map-region" d="M150,90 C175,90 195,110 195,132 C195,160 175,178 150,178 C122,178 108,158 108,132 C108,108 125,90 150,90 Z" fill="var(--c-bg)" ${stroke} />`);
  parts.push(`<circle data-region="nucleus" class="map-region" cx="150" cy="134" r="16" fill="var(--c-surface)" ${stroke} />`);
  parts.push(`<circle cx="146" cy="130" r="4" fill="currentColor" opacity="0.5" pointer-events="none" />`);

  if (labels) {
    for (const r of NEURON_REGIONS) parts.push(text(r.at[0], r.at[1], r.label));
    parts.push(text(240, 285, 'Direction of information flow', 'start'));
    parts.push(`<line x1="130" y1="281" x2="230" y2="281" stroke="var(--c-text-muted)" stroke-width="1.5" marker-end="url(#neuron-arrow)" />`);
  }

  return `
<svg viewBox="0 0 ${W} ${H}" width="100%" style="max-width:${W}px" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" font-family="inherit">
  <defs>
    <marker id="neuron-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="var(--c-text-muted)" /></marker>
  </defs>
  ${parts.join('\n  ')}
</svg>`;
}
