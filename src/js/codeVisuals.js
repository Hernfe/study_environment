import { cameraShift, embeddingLayout, linearDemixing, pearsonShapes, svdReconstruction, treeVote } from './advancedCodeVisuals.js';
import { hierarchyView, kmeansView, pcaView, renderCodePlot, spectralView, tTestView, uncertaintyView } from './codeVisualPlots.js';
import { el } from './dom.js';

export function meanAcrossBins(data, bins) {
  return data[0][0].map((_, trial) => data.map((neuron) =>
    neuron.slice(0, bins).reduce((sum, bin) => sum + bin[trial], 0) / bins));
}

function meanTimeView({ data, unit }, { bins = data[0].length } = {}) {
  const trials = data[0][0].map((_, i) => `Trial ${i + 1}`);
  const neurons = data.map((_, i) => `Neuron ${i + 1}`);
  return {
    summary: `Input shape ${neurons.length} × ${bins} × ${trials.length} (neuron × time bin × trial). Output shape ${trials.length} × ${neurons.length} (trial × neuron).`,
    tables: [
      ...data.map((neuron, i) => ({
        label: `Input · ${neurons[i]} slice (${unit})`, columns: trials, rowAxis: 'Time bin',
        rows: neuron.slice(0, bins).map((row, j) => [`Bin ${j + 1}`, ...row]),
      })),
      {
        label: `Output · X (${unit})`, columns: neurons, rowAxis: 'Trial',
        rows: meanAcrossBins(data, bins).map((row, i) => [trials[i], ...row]),
      },
    ],
  };
}

export function trialPermutationView({ trials }, { order }) {
  const columns = ['Neuron 1', 'Neuron 2', 'Direction'];
  return {
    summary: 'X remains 5 × 2 (trial × neuron). y remains a vector with 5 direction codes.',
    tables: [
      { label: 'Original order', rowAxis: 'Trial', columns, rows: trials },
      { label: 'Shuffled together', rowAxis: 'Trial', columns, rows: order.map((index) => trials[index]) },
    ],
  };
}

export function trialScalingView({ train, validation }, { pooled }) {
  const fitRows = pooled ? [...train, ...validation] : train;
  const mean = fitRows.reduce((sum, value) => sum + value, 0) / fitRows.length;
  const sd = Math.sqrt(fitRows.reduce((sum, value) => sum + (value - mean) ** 2, 0) / fitRows.length);
  const scaled = (rows) => rows.map((value, index) => [index + 1, value, (value - mean) / (sd + 1e-10)]);
  const columns = ['Rate (a.u.)', 'Scaled'];
  return {
    summary: `Fit on ${fitRows.length} trials. Mean ${number.format(mean)} and SD ${number.format(sd)} (arbitrary rate units). Both matrices keep their 2 × 1 shape.`,
    tables: [
      { label: 'Training rows', rowAxis: 'Trial', columns, rows: scaled(train) },
      { label: 'Validation rows', rowAxis: 'Trial', columns, rows: scaled(validation) },
    ],
  };
}

export function classificationScoresView({ truth, predictions }, { predictions: selected }) {
  const scores = {};
  const tables = Object.entries(predictions[selected]).map(([set, predicted]) => {
    scores[set] = 100 * truth.filter((value, index) => value === predicted[index]).length / truth.length;
    return {
      label: set === 'train' ? 'Training predictions' : 'Validation predictions',
      rowAxis: 'Trial in split', columns: ['True direction', 'Predicted direction'],
      rows: truth.map((value, index) => [index + 1, value, predicted[index]]),
    };
  });
  return {
    summary: `Accuracy is ${scores.train}% on training and ${scores.validation}% on validation. Gap ${scores.train - scores.validation} percentage points. Each prediction vector has 4 class labels.`,
    tables,
  };
}

const views = new Map([
  ['mean-time', meanTimeView],
  ['trial-permutation', trialPermutationView],
  ['trial-scaling', trialScalingView],
  ['classification-scores', classificationScoresView],
  ['uncertainty', uncertaintyView],
  ['two-sample-t', tTestView],
  ['fourier-signal', spectralView],
  ['pca-geometry', pcaView],
  ['lloyd-steps', kmeansView],
  ['single-linkage', hierarchyView],
  ['svd-reconstruction', svdReconstruction],
  ['pearson-shapes', pearsonShapes],
  ['linear-demixing', linearDemixing],
  ['embedding-layout', embeddingLayout],
  ['tree-vote', treeVote],
  ['camera-shift', cameraShift],
  ['schematic', ({ data }) => data],
]);

const number = new Intl.NumberFormat('en', { maximumFractionDigits: 2 });
function renderTable({ label, rowAxis, columns, rows }) {
  return el('table', {}, [
    el('caption', {}, label),
    el('thead', {}, el('tr', {}, [rowAxis, ...columns].map((text) => el('th', { scope: 'col' }, text)))),
    el('tbody', {}, rows.map(([row, ...values]) => el('tr', {}, [
      el('th', { scope: 'row' }, row),
      values.map((value) => el('td', {}, typeof value === 'number' ? number.format(value) : value)),
    ]))),
  ]);
}

export function renderCodeVisual(visual, id) {
  const renderView = views.get(visual.kind);
  const caption = el('figcaption', { id: `${id}-caption` }, visual.caption);
  const summary = el('p', { role: 'status', 'aria-atomic': 'true' });
  const tables = el('div', { class: 'code-visual-tables' });
  const plots = el('div', { class: 'code-visual-plots' });
  const values = Object.fromEntries((visual.controls || []).map(({ id, initial }) => [id, initial]));
  function update() {
    const view = renderView(visual, values);
    summary.textContent = view.summary;
    tables.replaceChildren(...(view.tables || []).map(renderTable));
    plots.replaceChildren(...(view.charts || []).map(renderCodePlot));
  }
  const controls = (visual.controls || []).map((control) => {
    const options = control.options;
    const select = el('select', { id: `${id}-${control.id}` }, options.map(({ label }, index) =>
      el('option', { value: index }, label)));
    select.value = String(options.findIndex(({ value }) => value === control.initial));
    select.addEventListener('change', () => {
      values[control.id] = options[Number(select.value)].value;
      update();
    });
    return el('label', {}, [control.label, ' ', select]);
  });
  update();
  return el('figure', { class: 'code-visual-view', 'aria-labelledby': caption.id }, [
    caption, el('p', { class: 'muted' }, visual.alt),
    controls.length ? el('div', { class: 'code-visual-controls' }, controls) : null,
    summary, tables, plots,
  ]);
}
