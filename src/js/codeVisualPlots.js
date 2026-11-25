import { axisBottom, axisLeft, line, scaleLinear, select } from 'd3';

const format = (value) => Number(value.toFixed(3));
const mean = (values) => values.reduce((sum, value) => sum + value, 0) / values.length;
const squares = (values) => values.reduce((sum, value) => sum + (value - mean(values)) ** 2, 0);
const dots = (points) => ({ points, marks: 'dots' });
const trace = (points, secondary = false) => ({ points, marks: 'line', secondary });
const stems = (points) => ({ points, marks: 'stems' });
const whisker = (x, center, radius, secondary) => [
  trace([[x, center - radius], [x, center + radius]], secondary),
  ...[-1, 1].map((sign) => trace([[x - .07, center + sign * radius], [x + .07, center + sign * radius]], secondary)),
];
const pressure = (series) => ({
  x: '', y: 'Pressure (mm Hg)', xDomain: [.55, 2.45], yDomain: [104, 152],
  series,
});

export function uncertaintyView({ data }, { n }) {
  const values = Array.from({ length: n }, (_, i) => data[i % data.length]);
  const center = mean(values);
  const sd = Math.sqrt(squares(values) / values.length);
  const sem = sd / Math.sqrt(values.length);
  const chart = pressure([
    dots(values.map((value, i) => [.7 + .6 * i / (n - 1), value])),
    ...whisker(1.8, center, sd, true), ...whisker(2.2, center, sem),
    dots([[1.8, center], [2.2, center]]),
  ]);
  return {
    summary: `Input ${n} pressures. Output mean ${format(center)}, SD ${format(sd)} and SEM ${format(sem)} mm Hg.`,
    charts: [{ ...chart, title: 'Measurements and mean ± error', xTicks: [[1, 'Sample'], [1.8, 'SD'], [2.2, 'SEM']] }],
  };
}

export function tTestView({ data }, { shift }) {
  const a = data;
  const b = a.map((value) => value + shift);
  const df = a.length + b.length - 2;
  const se = Math.sqrt((squares(a) + squares(b)) / df * (1 / a.length + 1 / b.length));
  const t = (mean(a) - mean(b)) / se;
  // Four observations per group give six degrees of freedom. Integrate the
  // two Student-t tails using s = |t| / sqrt(t² + 6).
  const s = Math.abs(t) / Math.sqrt(t ** 2 + df);
  const p = 1 - 15 / 8 * (s - 2 * s ** 3 / 3 + s ** 5 / 5);
  return {
    summary: `Input two length-${a.length} vectors. Mean difference (A − B) ${format(-shift)} mm Hg. Output t = ${format(t)}, two-sided p = ${format(p)}.`,
    charts: [{ ...pressure([dots([...a.map((y) => [1, y]), ...b.map((y) => [2, y])])]),
      title: 'Measurements in two groups', xTicks: [[1, 'Group A'], [2, 'Group B']] }],
  };
}

export function spectralView({ data: { fs, low, high } }, { frequency = high, cutoff }) {
  const tau = 2 * Math.PI;
  const input = Array.from({ length: fs }, (_, i) => Math.sin(tau * low * i / fs) + .5 * Math.sin(tau * frequency * i / fs));
  const bins = Array.from({ length: fs / 2 + 1 }, (_, k) => input.reduce(([re, im], value, i) => {
    const phase = tau * k * i / fs;
    return [re + value * Math.cos(phase), im - value * Math.sin(phase)];
  }, [0, 0]));
  const waveform = (title, signal) => ({
    title, x: 'Time (s)', y: 'Amplitude (a.u.)', xDomain: [0, 1], yDomain: [-1.6, 1.6],
    series: [trace(signal.map((value, i) => [i / fs, value]))],
  });
  const charts = [waveform('Input waveform', input)];
  if (cutoff === undefined) {
    charts.push({
      title: 'Fourier magnitude', x: 'Frequency (Hz)', y: 'DFT magnitude (a.u.)',
      xDomain: [0, fs / 2], yDomain: [0, fs / 2],
      series: [stems(bins.map(([re, im], k) => [k, Math.hypot(re, im)]))],
    });
    return { summary: `${fs} samples at ${fs} Hz → ${bins.length} nonnegative-frequency magnitudes. Peak frequencies are ${low} and ${frequency} Hz.`, charts };
  }
  const output = input.map((_, i) => bins.reduce((sum, [re, im], k) => {
    if (k > cutoff) return sum;
    const phase = tau * k * i / fs;
    const weight = k === 0 || k === fs / 2 ? 1 : 2;
    return sum + weight * (re * Math.cos(phase) - im * Math.sin(phase)) / fs;
  }, 0));
  charts.push(waveform('Reconstructed waveform', output));
  return { summary: `${fs} samples at ${fs} Hz → ${output.length} filtered samples. Retained tone${cutoff >= high ? `s at ${low} and ${high}` : ` at ${low}`} Hz.`, charts };
}

export function pcaView({ data }, { offset, components }) {
  const [meanX, meanY] = [0, 1].map((axis) => mean(data.map((point) => point[axis])));
  const centered = data.map(([x, y]) => [x - meanX, y - meanY]);
  const featurePlot = (title, points) => ({
    title, equalAspect: true, x: 'Feature 1 (µV)', y: 'Feature 2 (µV)', xDomain: [-8, 8], yDomain: [-8, 8], series: [dots(points)],
  });
  if (offset !== undefined) {
    return {
      summary: `Input and output are both 2 × ${data.length} (feature × waveform). Feature 2 mean ${format(meanY + offset)} → 0 µV.`,
      charts: [featurePlot('Before centering', data.map(([x, y]) => [x, y + offset])), featurePlot('After centering', centered)],
    };
  }
  const xx = mean(centered.map(([x]) => x * x));
  const yy = mean(centered.map(([, y]) => y * y));
  const xy = mean(centered.map(([x, y]) => x * y));
  const angle = Math.atan2(2 * xy, xx - yy) / 2;
  const a = Math.cos(angle);
  const b = Math.sin(angle);
  const scores = centered.map(([x, y]) => [a * x + b * y, -b * x + a * y]);
  const retained = components === 2 ? 100 : 100 * mean(scores.map(([x]) => x * x)) / (xx + yy);
  const input = featurePlot('Centered waveforms and PC directions', centered);
  input.series.push(trace([[-4 * a, -4 * b], [4 * a, 4 * b]]));
  if (components === 2) input.series.push(trace([[4 * b, -4 * a], [-4 * b, 4 * a]], true));
  return {
    summary: `2 × ${data.length} features → ${components} × ${data.length} scores (component × waveform). Cumulative explained variance ${format(retained)}%.`,
    charts: [input, {
      title: 'Projected scores', equalAspect: true, x: 'PC1 score (µV)', y: components === 2 ? 'PC2 score (µV)' : '',
      xDomain: [-5, 5], yDomain: [-5, 5],
      series: [dots(components === 2 ? scores : scores.map(([x]) => [x, 0]))],
    }],
  };
}

export function kmeansView({ data }, { k, step }) {
  const assign = (centers) => data.map((point) => {
    const distance = ([x, y]) => (x - point[0]) ** 2 + (y - point[1]) ** 2;
    return centers.reduce((best, center, i) => distance(center) < distance(centers[best]) ? i : best, 0);
  });
  let centers = data.slice(0, k);
  for (let i = 0; i < step; i++) {
    const labels = assign(centers);
    centers = centers.map((center, j) => {
      const group = data.filter((_, index) => labels[index] === j);
      return group.length ? center.map((_, axis) => mean(group.map((point) => point[axis]))) : center;
    });
  }
  const labels = assign(centers);
  const loss = data.reduce((sum, [x, y], i) => sum + (x - centers[labels[i]][0]) ** 2 + (y - centers[labels[i]][1]) ** 2, 0);
  return {
    summary: `${data.length} × 2 (waveform × feature) → ${k} × 2 centers and ${labels.length} labels. Sum of squared distances ${format(loss)} µV². Cluster sizes: ${centers.map((_, j) => labels.filter((label) => label === j).length).join(', ')}.`,
    charts: [{
      title: 'Assignments and centroid positions', equalAspect: true, x: 'Feature 1 (µV)', y: 'Feature 2 (µV)', xDomain: [-1, 11], yDomain: [-1, 9],
      series: [
        ...data.map((point, i) => trace([point, centers[labels[i]]], true)),
        dots(data), { points: centers, marks: 'centers' },
      ],
    }],
  };
}

export function hierarchyView({ data }, { height }) {
  // In one dimension, single linkage merges at the sorted adjacent gaps.
  const merges = data.slice(1).map((value, i) => ({ i, gap: value - data[i] })).sort((a, b) => a.gap - b.gap);
  const groups = data.map((_, i) => ({ first: i, last: i, x: i, y: 0 }));
  const branches = merges.map(({ i, gap }) => {
    const left = groups.findIndex((group) => group.last === i);
    const [a, b] = groups.slice(left, left + 2);
    groups.splice(left, 2, { first: a.first, last: b.last, x: (a.x + b.x) / 2, y: gap });
    return trace([[a.x, a.y], [a.x, gap], [b.x, gap], [b.x, b.y]]);
  });
  const clusterCount = data.length - merges.filter(({ gap }) => gap <= height).length;
  return {
    summary: `Input ${data.length} × 1 (sample × feature). The hierarchy has ${merges.length} merges. Cutting at ${height} µV returns ${data.length} labels in ${clusterCount} cluster${clusterCount === 1 ? '' : 's'}.`,
    charts: [{
      title: 'Single-linkage dendrogram', x: 'Samples (feature values in µV)', y: 'Merge distance (µV)',
      xDomain: [-.25, data.length - .75], yDomain: [0, 7],
      xTicks: data.map((value, i) => [i, value]), series: [...branches, trace([[-.25, height], [data.length - .75, height]], true)],
    }],
  };
}

export function renderCodePlot({ title, x, y, xDomain, yDomain, xTicks, equalAspect, series }) {
  const svg = select(document.createElementNS('http://www.w3.org/2000/svg', 'svg'))
    .attr('viewBox', '0 0 320 205').attr('role', 'img').attr('aria-label', [title, x, y].filter(Boolean).join('. '))
    .attr('class', 'code-visual-plot');
  const span = equalAspect ? 123 * (xDomain[1] - xDomain[0]) / (yDomain[1] - yDomain[0]) : 238;
  const xStart = 181 - span / 2;
  const sx = scaleLinear(xDomain, [xStart, xStart + span]);
  const sy = scaleLinear(yDomain, [150, 27]);
  const bottom = axisBottom(sx).ticks(4);
  const left = axisLeft(sy).ticks(4);
  if (xTicks) {
    const labels = new Map(xTicks);
    bottom.tickValues(xTicks.map(([value]) => value)).tickFormat((value) => labels.get(value));
  }
  const xAxisY = y || !equalAspect ? 150 : sy(0);
  svg.append('g').attr('transform', `translate(0,${xAxisY})`).call(bottom);
  if (y) svg.append('g').attr('transform', `translate(${xStart},0)`).call(left);
  svg.append('text').attr('x', 181).attr('y', 16).attr('class', 'plot-title').text(title);
  svg.append('text').attr('x', 181).attr('y', xAxisY + 39).text(x);
  if (y) svg.append('text').attr('transform', `translate(${xStart - 44},88) rotate(-90)`).text(y);
  for (const { points, marks, secondary } of series) {
    const group = svg.append('g').attr('class', secondary ? 'plot-secondary' : 'plot-primary');
    if (marks === 'line') {
      group.append('path').attr('d', line().x((p) => sx(p[0])).y((p) => sy(p[1]))(points));
    } else if (marks === 'stems') {
      group.selectAll('line').data(points).join('line').attr('x1', (p) => sx(p[0])).attr('x2', (p) => sx(p[0]))
        .attr('y1', sy(0)).attr('y2', (p) => sy(p[1]));
    } else {
      group.selectAll('circle').data(points).join('circle').attr('cx', (p) => sx(p[0])).attr('cy', (p) => sy(p[1]))
        .attr('r', marks === 'centers' ? 6 : 3).attr('class', marks === 'centers' ? 'plot-center' : 'plot-dot');
    }
  }
  return svg.node();
}
