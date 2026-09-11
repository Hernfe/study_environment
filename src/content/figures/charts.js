// Quantitative figures for Lecture 1, drawn with d3 scales and axes.
// Numbers are read off the lecture slides (Herculano-Houzel for neuron
// counts; DiLuca and Olesen 2014 for disorders).
//
// Style: sorted dot plots as small multiples, one panel per measure,
// each on its own range-framed axis. Values are written next to the
// dots, so there are no gridlines and few ticks. One accent colour marks
// the row the text discusses; everything else is muted. Each figure
// returns { svg, aspect, regions } so it can be shown through the
// image-hotspots widget with the same region machinery as the pictures.

import { create, scaleLinear, axisBottom, format, max } from 'd3';

const FONT = 12;
const ROW = 22;

function panel(root, spec) {
  // spec: { x, y, width, title, unit, rows: [{ label, value, accent, rank }], fmt, showLabels, rankWidth }
  // rank: a small muted number before the row, the row's position when
  // the panel's own measure sorts the list. rankWidth reserves room for it.
  const rankW = spec.rankWidth || 0;
  const labelW = (spec.showLabels ? spec.labelWidth : 0) + rankW;
  const inner = spec.width - labelW - 44;
  const x = scaleLinear().domain([0, max(spec.rows, (r) => r.value)]).nice().range([0, inner]);
  const g = root.append('g').attr('transform', `translate(${spec.x + labelW},${spec.y})`);

  g.append('text').attr('x', 0).attr('y', -22).attr('font-weight', 600).attr('fill', 'currentColor').text(spec.title);
  g.append('text').attr('x', 0).attr('y', -8).attr('fill', 'var(--c-text-muted)').attr('font-size', FONT - 1).text(spec.unit);

  const rows = g.selectAll('g.row').data(spec.rows).join('g').attr('class', 'row').attr('transform', (d, i) => `translate(0,${i * ROW + ROW / 2})`);
  if (spec.showLabels) {
    rows.append('text').attr('x', -8).attr('dy', '0.35em').attr('text-anchor', 'end').attr('fill', (d) => (d.accent ? 'currentColor' : 'var(--c-text-muted)')).attr('font-weight', (d) => (d.accent ? 600 : 400)).text((d) => d.label);
  }
  if (rankW) {
    rows.append('text').attr('x', -labelW).attr('dy', '0.35em').attr('fill', 'var(--c-text-muted)').attr('font-size', FONT - 2).attr('font-variant-numeric', 'tabular-nums').text((d) => (d.rank === undefined ? '' : String(d.rank)));
  }
  rows.append('line').attr('x1', 0).attr('x2', (d) => x(d.value)).attr('stroke', (d) => (d.accent ? 'var(--c-accent)' : 'var(--c-border)')).attr('stroke-width', 1.5);
  rows.append('circle').attr('cx', (d) => x(d.value)).attr('r', 4).attr('fill', (d) => (d.accent ? 'var(--c-accent)' : 'var(--c-text-muted)'));
  rows.append('text').attr('x', (d) => x(d.value) + 8).attr('dy', '0.35em').attr('fill', (d) => (d.accent ? 'currentColor' : 'var(--c-text-muted)')).attr('font-weight', (d) => (d.accent ? 600 : 400)).text((d) => spec.fmt(d.value));
  rows.append('title').text((d) => `${d.label}: ${spec.fmt(d.value)} ${spec.unit}`);

  // Range frame: the axis spans only the data, with two ticks.
  const h = spec.rows.length * ROW;
  const axis = axisBottom(x).tickValues([0, x.domain()[1]]).tickSize(3).tickFormat(spec.fmt);
  const ax = g.append('g').attr('transform', `translate(0,${h + 4})`).call(axis);
  ax.select('.domain').attr('stroke', 'var(--c-border)');
  ax.selectAll('.tick line').attr('stroke', 'var(--c-border)');
  ax.selectAll('.tick text').attr('fill', 'var(--c-text-muted)').attr('font-size', FONT - 1);

  return { x, gx: spec.x + labelW, gy: spec.y };
}

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

// Whole brain versus cerebral cortex neuron counts by species.
const SPECIES = [
  { label: 'Elephant', brain: 251, cortex: 5.6 },
  { label: 'Human', brain: 86, cortex: 16.3, accent: true },
  { label: 'Gorilla', brain: 33, cortex: 9.1 },
  { label: 'Chimpanzee', brain: 22, cortex: 6 },
  { label: 'Rhesus monkey', brain: 6, cortex: 1.7 },
  { label: 'Marmoset', brain: 0.634, cortex: 0.245 },
];

export function neuronCountsFigure() {
  const W = 620;
  const H = 40 + SPECIES.length * ROW + 30;
  const svg = create('svg');
  const fmt = (v) => (v === 0 ? '0' : v >= 10 ? format('.0f')(v) : v >= 1 ? format('.1f')(v) : format('.2f')(v));
  const byBrain = [...SPECIES].sort((a, b) => b.brain - a.brain).map((s) => ({ label: s.label, value: s.brain, accent: s.accent }));
  const byCortex = [...SPECIES].sort((a, b) => b.cortex - a.cortex).map((s) => ({ label: s.label, value: s.cortex, accent: s.accent }));
  const left = panel(svg, { x: 8, y: 40, width: 280, labelWidth: 96, showLabels: true, title: 'Neurons in the whole brain', unit: 'billions', rows: byBrain, fmt });
  const right = panel(svg, { x: 320, y: 40, width: 300, labelWidth: 96, showLabels: true, title: 'Neurons in the cerebral cortex', unit: 'billions', rows: byCortex, fmt });

  // Regions in percent of the viewBox, for the hotspot overlay.
  const region = (p, rows, label, id, body) => {
    const i = rows.findIndex((r) => r.label === label);
    const cx = p.gx + p.x(rows[i].value);
    const cy = p.gy + i * ROW + ROW / 2;
    return { id, label: rows[i].label + (p === left ? ', whole brain' : ', cortex'), body, shape: 'ellipse', x: (cx / W) * 100, y: (cy / H) * 100, w: 5, h: (ROW / H) * 100 + 2, side: 'inline', bx: ((cx + 46) / W) * 100, by: (cy / H) * 100 };
  };
  const regions = [
    region(left, byBrain, 'Elephant', 'elephant-brain', 'About 251 billion neurons on the slide. Nearly all of them are in the cerebellum.'),
    region(left, byBrain, 'Human', 'human-brain', 'About 86 billion neurons forming about 100 trillion connections.'),
    region(right, byCortex, 'Human', 'human-cortex', 'About 16.3 billion cortical neurons, the most of any species on the slide.'),
    region(right, byCortex, 'Elephant', 'elephant-cortex', 'Only about 5.6 billion cortical neurons, a third of the human count. Whole-brain and cortex counts rank the species differently.'),
  ];
  return { svg: toMarkup(svg, W, H), aspect: W / H, regions };
}

// Brain disorders in Europe, 2010 data: people affected, cost per person, total cost.
const DISORDERS = [
  { label: 'Anxiety disorders', people: 61.3, perPerson: 1076, total: 65995 },
  { label: 'Migraine', people: 49.9, perPerson: 370, total: 18463 },
  { label: 'Mood disorders', people: 33.3, perPerson: 3406, total: 113405 },
  { label: 'Addiction', people: 15.5, perPerson: 4227, total: 65684 },
  { label: 'Dementia', people: 6.3, perPerson: 16584, total: 105163, accent: true },
  { label: 'Psychotic disorders', people: 5.0, perPerson: 5805, total: 29007 },
  { label: 'Epilepsy', people: 2.6, perPerson: 5221, total: 13800 },
  { label: 'Stroke', people: 1.3, perPerson: 21000, total: 26641 },
  { label: 'Traumatic brain injury', people: 1.2, perPerson: 4209, total: 5085 },
  { label: "Parkinson's disease", people: 1.2, perPerson: 11153, total: 13933 },
  { label: 'Multiple sclerosis', people: 0.54, perPerson: 26974, total: 14559 },
  { label: 'Brain tumour', people: 0.24, perPerson: 21590, total: 5174 },
];

export function disorderBurdenFigure() {
  const W = 700;
  const H = 40 + DISORDERS.length * ROW + 30;
  const svg = create('svg');
  const k = (v) => (v >= 1000 ? `${format('.0f')(v / 1000)}k` : format('.0f')(v));
  // One shared row order, by total cost, across all three panels. Each
  // panel prints a small rank for its own measure, so the reader can
  // see that the three measures rank the disorders differently.
  const order = [...DISORDERS].sort((a, b) => b.total - a.total);
  const rankBy = (key) => new Map([...DISORDERS].sort((a, b) => b[key] - a[key]).map((d, i) => [d.label, i + 1]));
  const rows = (key) => {
    const ranks = rankBy(key);
    return order.map((d) => ({ label: d.label, value: d[key], accent: d.accent, rank: ranks.get(d.label) }));
  };
  const p1 = panel(svg, { x: 8, y: 40, width: 300, labelWidth: 134, rankWidth: 18, showLabels: true, title: 'People affected', unit: 'million', rows: rows('people'), fmt: (v) => (v === 0 ? '0' : v >= 10 ? format('.0f')(v) : format('.1f')(v)) });
  const p2 = panel(svg, { x: 320, y: 40, width: 180, labelWidth: 0, rankWidth: 18, showLabels: false, title: 'Cost per person', unit: 'euro per year', rows: rows('perPerson'), fmt: k });
  const p3 = panel(svg, { x: 510, y: 40, width: 180, labelWidth: 0, rankWidth: 18, showLabels: false, title: 'Total cost', unit: 'million euro per year', rows: rows('total'), fmt: k });

  const region = (p, key, label, id, body) => {
    const i = order.findIndex((d) => d.label === label);
    const cx = p.gx + p.x(order[i][key]);
    const cy = p.gy + i * ROW + ROW / 2;
    return { id, label: `${label}: ${{ people: 'people affected', perPerson: 'cost per person', total: 'total cost' }[key]}`, body, shape: 'ellipse', x: (cx / W) * 100, y: (cy / H) * 100, w: 4, h: (ROW / H) * 100 + 2, side: 'inline', bx: ((cx + 48) / W) * 100, by: (cy / H) * 100 };
  };
  const regions = [
    region(p3, 'total', 'Mood disorders', 'mood-total', 'The largest total cost, about 113 billion euro a year: many people times a moderate cost each.'),
    region(p3, 'total', 'Dementia', 'dementia-total', 'Second largest total, about 105 billion euro: about 6 million people times a high cost per person. Fifth by people affected.'),
    region(p1, 'people', 'Anxiety disorders', 'anxiety-people', 'About 61 million people, the most common group, but only third by total cost because the cost per person is low, about 1000 euro a year.'),
    region(p2, 'perPerson', 'Multiple sclerosis', 'ms-cost', 'About 27 000 euro per person per year, the highest on the slide, but only about half a million people, so it ranks eighth by total cost.'),
  ];
  return { svg: toMarkup(svg, W, H), aspect: W / H, regions };
}

// Registry-compatible wrappers (static svg visuals).
export const neuronCounts = () => neuronCountsFigure().svg;
export const disorderBurden = () => disorderBurdenFigure().svg;
