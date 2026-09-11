// Bar-table figures for Lecture 1. Numbers are read off the lecture
// slides (DiLuca and Olesen 2014 for disorders; Herculano-Houzel for
// neuron counts). Single series per column, so no legend is needed.

import { barTable, wrap, text } from './svg-util.js';

// Slide: cost of brain disorders in Europe, 2010 data.
const DISORDERS = [
  ['Brain tumour', 0.24, 21590, 5174],
  ['Multiple sclerosis', 0.54, 26974, 14559],
  ["Parkinson's disease", 1.2, 11153, 13933],
  ['Traumatic brain injury', 1.2, 4209, 5085],
  ['Stroke', 1.3, 21000, 26641],
  ['Epilepsy', 2.6, 5221, 13800],
  ['Psychotic disorders', 5.0, 5805, 29007],
  ['Dementia', 6.3, 16584, 105163],
  ['Addiction', 15.5, 4227, 65684],
  ['Mood disorders', 33.3, 3406, 113405],
  ['Migraine', 49.9, 370, 18463],
  ['Anxiety disorders', 61.3, 1076, 65995],
];

const thousands = (v) => (v >= 1000 ? `${(v / 1000).toFixed(v >= 10000 ? 0 : 1)}k` : String(v));

export function disorderBurden() {
  const t = barTable({
    rows: DISORDERS.map(([label, a, b, c]) => ({ label, values: [a, b, c] })),
    columns: [
      { title: 'People affected', unit: 'million', fmt: (v) => String(v) },
      { title: 'Cost per person', unit: 'EUR per year', fmt: thousands },
      { title: 'Total cost', unit: 'million EUR per year', fmt: thousands },
    ],
    labelWidth: 132,
    colWidth: 118,
    colGap: 14,
    rowHeight: 20,
    valueRoom: 36,
  });
  return wrap(t.w, t.h, t.markup);
}

// Slide: brain neurons and cerebral cortex neurons by species (billions).
const SPECIES = [
  ['Elephant', 251, 5.6],
  ['Human', 86, 16.3],
  ['Gorilla', 33, 9.1],
  ['Chimpanzee', 22, 6],
  ['Rhesus monkey', 6, 1.7],
  ['Marmoset', 0.634, 0.245],
];

export function neuronCounts() {
  const t = barTable({
    rows: SPECIES.map(([label, a, b]) => ({ label, values: [a, b] })),
    columns: [
      { title: 'Neurons in the brain', unit: 'billions (slide figure)', fmt: (v) => String(v) },
      { title: 'Neurons in the cerebral cortex', unit: 'billions', fmt: (v) => String(v) },
    ],
    labelWidth: 110,
    colWidth: 160,
    colGap: 30,
    rowHeight: 24,
    valueRoom: 40,
  });
  return wrap(t.w, t.h, t.markup);
}

// Slide: scales of the brain. Two ladders, structure and function.
const SPATIAL = [
  ['metres', 'Body'],
  ['centimetres', 'Whole brain'],
  ['millimetres', 'Brain regions'],
  ['', 'Microcircuits'],
  ['micrometres', 'Cells'],
  ['', 'Synapses'],
  ['', 'Chromosomes'],
  ['nanometres', 'Proteins'],
];
const TEMPORAL = [
  ['years', 'Development and aging'],
  ['days', 'Behaviour'],
  ['hours', 'Learning'],
  ['minutes', 'Synaptic plasticity'],
  ['seconds', 'Metabolism'],
  ['milliseconds', 'Action potential'],
  ['microseconds', 'Vesicle release'],
  ['picoseconds', 'Molecular dynamics'],
];

export function scalesLadder() {
  const step = 26;
  const top = 40;
  const parts = [];
  const ladder = (x, title, unitsTitle, rows) => {
    parts.push(text(x + 70, 16, title, { weight: 600, size: 12, halo: false }));
    parts.push(text(x + 70, 30, unitsTitle, { size: 10, fill: 'var(--c-text-muted)', halo: false }));
    parts.push(`<line x1="${x + 70}" y1="${top}" x2="${x + 70}" y2="${top + (rows.length - 1) * step + 8}" stroke="var(--c-border)" stroke-width="2" />`);
    rows.forEach(([unit, label], i) => {
      const y = top + i * step + 8;
      parts.push(`<circle cx="${x + 70}" cy="${y - 4}" r="4" fill="var(--c-accent)" />`);
      parts.push(text(x + 60, y, unit, { anchor: 'end', size: 10, fill: 'var(--c-text-muted)', halo: false }));
      parts.push(text(x + 82, y, label, { anchor: 'start', size: 11, halo: false }));
    });
  };
  ladder(10, 'Structure', 'spatial scale', SPATIAL);
  ladder(260, 'Function', 'time scale', TEMPORAL);
  parts.push(text(250, 262, 'Top: large and slow. Bottom: small and fast.', { size: 10, fill: 'var(--c-text-muted)', halo: false }));
  return wrap(500, 270, parts.join('\n'));
}
