const table = (label, rowAxis, columns, rows) => ({ label, rowAxis, columns, rows });
const samples = ['S1', 'S2', 'S3', 'S4'];

export function svdReconstruction(_, { k }) {
  // Orthogonal feature rows are the score rows in this basis (U = I).
  const features = [[-3, -3, 3, 3], [-1, 1, -1, 1]];
  const scores = features.slice(0, k);
  const restored = features.map((row, i) => scores[i] ?? row.map(() => 0));
  const energy = (matrix) => matrix.flat().reduce((sum, value) => sum + value ** 2, 0);
  const retained = 100 * energy(scores) / energy(features);
  const rows = (matrix, name) => matrix.map((row, i) => [`${name} ${i + 1}`, ...row]);
  return {
    summary: `2 × 4 centred features → ${k} × 4 scores → 2 × 4 reconstructed features. ${retained}% of total variance retained.`,
    tables: [
      table('Centred input', 'Feature', samples, rows(features, 'Feature')),
      table('Output scores', 'Direction', samples, rows(scores, 'PC')),
      table('Reconstruction', 'Feature', samples, rows(restored, 'Feature')),
    ],
  };
}

export function pearsonShapes(_, { pattern }) {
  const x = [-2, -1, 1, 2];
  const y = x.map((value) => pattern === 'line' ? value : value ** 2);
  const center = (values) => {
    const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
    return values.map((value) => value - mean);
  };
  const dx = center(x);
  const dy = center(y);
  const dot = (a, b) => a.reduce((sum, value, i) => sum + value * b[i], 0);
  const r = dot(dx, dy) / Math.sqrt(dot(dx, dx) * dot(dy, dy));
  return {
    summary: `Two length-4 vectors → Pearson r = ${r.toFixed(2)} (unitless).`,
    charts: [{
      title: 'Paired input samples', x: 'Feature x (a.u.)', y: 'Feature y (a.u.)',
      xDomain: [-3, 3], yDomain: [-3, 5], series: [{ marks: 'dots', points: x.map((value, i) => [value, y[i]]) }],
    }],
  };
}

export function linearDemixing(_, { demix }) {
  const recordings = [[-1, -1], [-1, 0], [-1, 1], [1, 1], [1, 0], [1, -1]]
    .map(([a, b]) => [a + b, 2 * a - b]);
  const numerators = demix ? [[1, 1], [2, -1]] : [[1, 0], [0, 1]];
  const denominator = demix ? 3 : 1;
  const w = numerators.map((row) => row.map((value) => value / denominator));
  const output = recordings.map(([a, b]) => w.map(([first, second]) => first * a + second * b));
  return {
    summary: 'Six time samples × two sensors → six time samples × two component values. Amplitudes are in arbitrary units.',
    tables: [
      table('Sensor mixtures', 'Time index', ['Sensor 1', 'Sensor 2'], recordings.map((row, i) => [i, ...row])),
      table(demix ? 'W rows · inverse of toy mixing' : 'W rows · identity', 'Component', ['Sensor 1 weight', 'Sensor 2 weight'],
        numerators.map((row, i) => [i + 1, ...row.map((value) => demix ? `${value}/3` : value)])),
      table('Output of multiplication', 'Time index', ['Component 1', 'Component 2'], output.map((row, i) => [i, ...row])),
    ],
  };
}

export function embeddingLayout(_, { layout }) {
  const positions = [[1, 3], [layout ? 8 : 4, 2], [layout ? 4 : 8, 4]];
  return {
    summary: 'For n samples × p original features, the shown call returns n × 2 embedding coordinates. Each pair in these sketches stays close while the group spacing changes.',
    charts: [{
      title: 'Schematic embedding coordinates', x: 'Embedding 1 (unitless)', y: 'Embedding 2 (unitless)',
      equalAspect: true, xDomain: [0, 10], yDomain: [0, 6],
      series: positions.map(([x, y], i) => ({
        marks: 'dots', secondary: i !== 0, points: [[x, y], [x + .35, y + .35]],
      })),
    }],
    tables: [table('Pair centres', 'Pair', ['Embedding 1', 'Embedding 2'],
      positions.map(([x, y], i) => ['ABC'[i], x + .175, y + .175]))],
  };
}

export function treeVote(_, { lastVote }) {
  const votes = ['A', 'B', 'B', 'A', lastVote];
  const countA = votes.filter((vote) => vote === 'A').length;
  const countB = votes.length - countA;
  return {
    summary: `Five tree labels → one predicted label for this sample: class ${countA > countB ? 'A' : 'B'}.`,
    tables: [
      table('Input votes', 'Tree', ['Hard class label'], votes.map((vote, i) => [i + 1, vote])),
      table('Output counts', 'Class', ['Votes'], [['A', countA], ['B', countB]]),
    ],
  };
}

export function cameraShift(_, { shifted }) {
  const rows = [0, 1, 0, 1].map((shape, i) => {
    const camera = shifted ? 1 - shape : shape;
    const logit = shape + 2 * camera - 1.5;
    return [i + 1, shape, camera, shape, logit, Number(logit >= 0)];
  });
  const correct = rows.filter((row) => row[3] === row[5]).length;
  return {
    summary: `4 images × 2 cues → 4 binary predictions. ${correct} of 4 toy labels match.`,
    tables: [table('Fixed weights, different camera cues', 'Image',
      ['Shape', 'Camera', 'Truth', 'Logit', 'Output'], rows)],
  };
}
