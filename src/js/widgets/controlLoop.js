// Control loop for movement (L06, slides 42 and 43): the spinal feedback
// loop, and the brain's feedforward controller on top of it, as a block
// diagram whose parts can be removed. Below it, the HW3 tray: a weight
// lands on a tray held with the elbow flexed, and the plot shows how far
// the elbow is pushed open over the next two seconds, with the intact
// loop drawn muted for comparison.
//
// Model (illustrative, not fitted): the forearm is a mass on a weak
// passive spring. A step load arrives at 0.5 s. The stretch reflex adds
// force in proportion to the stretch 25 ms earlier (sensor and
// proprioceptive input both needed). In brain mode the feedforward
// controller slowly raises the command until the droop is gone, using
// proprioception 120 ms late, or, without proprioceptive input, vision
// 250 ms late and weaker; with only the spindle lost, joint and tendon
// receptors still report position but more coarsely. If the weight is
// expected, the feedforward controller adds the needed force as the
// weight lands. The numbers only show the qualitative effect of each
// removal.
//
// props: {
//   mode: 'spinal' | 'brain',
//   scenarios: [{ key: 'unexpected' | 'expected', label }],   // brain mode
//   parts: [{ key: 'sensor' | 'input' | 'ff' | 'extero', label, effect }],
//   labels: { remove, scenario, blocks: { desired, reference, error, controller,
//             actuator, environment, proprioception, sensor, inputProcessing,
//             feedback, ff, eye, exteroception, filtering },
//             plotTitle, axisY, axisX, weight, intact, current, peak, droop,
//             breaks, nothing, unit },
// }

import { el } from '../dom.js';
import { svgIn, scaleLinear, rangeAxisBottom, rangeAxisLeft, readout, checkRow, radioRow, halo, nextId, MUTED, ACCENT, INK, BORDER, FONT } from './d3util.js';

const DT = 0.0005;
const T_END = 2.5;
const T_LOAD = 0.5;

export function simulateArm({ mode = 'brain', scenario = 'unexpected', sensor = true, input = true, ff = true, extero = true } = {}) {
  const L = 100;
  const m = 0.03;
  const k0 = 5;
  const b = 0.5;
  const kr = 20;
  const kd = 0.25;
  const dR = 0.025;
  const n = Math.round(T_END / DT);
  const x = new Float64Array(n + 1);
  const v = new Float64Array(n + 1);
  const reflex = sensor && input;
  const brain = mode === 'brain' && ff;
  const dB = input ? 0.12 : 0.25;
  const ki = input ? (sensor ? 30 : 6) : (extero ? 4 : 0);
  const anticipate = brain && scenario === 'expected';
  const lag = (arr, i, d) => arr[Math.max(0, i - Math.round(d / DT))];
  let integral = 0;
  for (let i = 0; i < n; i += 1) {
    const t = i * DT;
    let force = 0;
    if (reflex) force += kr * lag(x, i, dR) + kd * lag(v, i, dR);
    if (brain && ki > 0) {
      integral += ki * lag(x, i, dB) * DT;
      force += integral;
    }
    if (anticipate) {
      const s = Math.min(1, Math.max(0, (t - (T_LOAD - 0.02)) / 0.04));
      force += L * s * s * (3 - 2 * s);
    }
    const load = t >= T_LOAD ? L : 0;
    const a = (load - k0 * x[i] - b * v[i] - force) / m;
    v[i + 1] = v[i] + a * DT;
    x[i + 1] = Math.min(45, Math.max(-10, x[i] + v[i + 1] * DT));
  }
  // Downsample to 5 ms for drawing.
  const step = Math.round(0.005 / DT);
  const pts = [];
  for (let i = 0; i <= n; i += step) pts.push([i * DT, x[i]]);
  return pts;
}

const BOX = { w: 124, h: 40 };

function layout(mode) {
  const top = mode === 'brain' ? 12 : -76;
  const y = (v) => v + top;
  return {
    height: mode === 'brain' ? 312 : 214,
    blocks: {
      ff: { x: 20, y: y(18), w: 132, h: 46, part: 'ff', brain: true },
      inputTop: { x: 232, y: y(22), part: 'extero', brain: true },
      eye: { x: 404, y: y(22), part: 'extero', brain: true },
      controller: { x: 232, y: y(116) },
      actuator: { x: 404, y: y(116) },
      sensor: { x: 404, y: y(222), part: 'sensor' },
      inputBottom: { x: 232, y: y(222), part: 'input' },
    },
    comparator: { cx: 86, cy: y(136) },
    env: { cx: 610, cy: y(136) },
    y,
  };
}

function drawDiagram(container, props) {
  const L = props.labels || {};
  const B = L.blocks || {};
  const mode = props.mode || 'spinal';
  const lay = layout(mode);
  const svg = svgIn(container, 670, lay.height);
  const id = nextId('loop');
  const defs = svg.append('defs');
  for (const [key, colour] of [['ink', INK], ['off', BORDER]]) {
    defs.append('marker').attr('id', `${id}-${key}`).attr('viewBox', '0 0 8 8').attr('refX', 7).attr('refY', 4)
      .attr('markerWidth', 7).attr('markerHeight', 7).attr('orient', 'auto-start-reverse')
      .append('path').attr('d', 'M0,0L8,4L0,8Z').attr('fill', colour);
  }
  const g = svg.append('g');
  const y = lay.y;

  // Edges: [points, part that disables it, label, label position]
  const edges = [
    { pts: [[86, y(mode === 'brain' ? 64 : 100)], [86, y(124)]], label: B.reference || 'Reference signal', lx: 94, ly: y(mode === 'brain' ? 92 : 112), part: mode === 'brain' ? 'ff' : null, anchor: 'start' },
    { pts: [[98, y(136)], [232, y(136)]], label: B.error || 'Error signal', lx: 165, ly: y(128), anchor: 'middle' },
    { pts: [[356, y(136)], [404, y(136)]] },
    { pts: [[528, y(130)], [578, y(130)]] },
    { pts: [[578, y(142)], [528, y(142)]] },
    { pts: [[466, y(156)], [466, y(222)]], label: B.proprioception || 'Proprioception', lx: 474, ly: y(192), part: 'input', anchor: 'start' },
    { pts: [[404, y(242)], [356, y(242)]], part: 'sensor' },
    { pts: [[232, y(242)], [86, y(242)], [86, y(148)]], label: B.feedback || 'Feedback signal', lx: 150, ly: y(234), part: 'input', anchor: 'middle' },
  ];
  if (mode === 'brain') {
    edges.push(
      { pts: [[610, y(112)], [610, y(42)], [528, y(42)]], label: B.exteroception || 'Exteroception', lx: 618, ly: y(78), part: 'extero', anchor: 'start' },
      { pts: [[404, y(42)], [356, y(42)]], part: 'extero' },
      { pts: [[232, y(42)], [152, y(42)]], part: 'extero' },
    );
  }
  const edgeSel = edges.map((e) => {
    const path = g.append('path').attr('d', `M${e.pts.map((p) => p.join(',')).join('L')}`).attr('fill', 'none').attr('stroke-width', 1.4);
    const text = e.label ? halo(g.append('text').attr('x', e.lx).attr('y', e.ly).attr('text-anchor', e.anchor).attr('font-size', FONT - 1).text(e.label)) : null;
    return { e, path, text };
  });

  // Comparator.
  g.append('circle').attr('cx', 86).attr('cy', y(136)).attr('r', 12).attr('fill', 'var(--c-surface)').attr('stroke', INK).attr('stroke-width', 1.4);
  g.append('text').attr('x', 74).attr('y', y(118)).attr('text-anchor', 'end').attr('font-size', FONT).attr('fill', INK).text('+');
  g.append('text').attr('x', 74).attr('y', y(160)).attr('text-anchor', 'end').attr('font-size', FONT).attr('fill', INK).text('−');
  if (mode !== 'brain') {
    g.append('text').attr('x', 86).attr('y', y(94)).attr('text-anchor', 'middle').attr('font-size', FONT - 1).attr('fill', MUTED).text(B.desired || 'Desired state');
  }

  // Environment.
  g.append('ellipse').attr('cx', 610).attr('cy', y(136)).attr('rx', 40).attr('ry', 24).attr('fill', 'var(--c-surface)').attr('stroke', INK).attr('stroke-width', 1.4);
  g.append('text').attr('x', 610).attr('y', y(136)).attr('dy', '0.35em').attr('text-anchor', 'middle').attr('font-size', FONT - 1).attr('fill', INK).text(B.environment || 'Environment');

  // Filtering and amplification frame around the processing column.
  g.append('rect').attr('x', 222).attr('y', y(mode === 'brain' ? 10 : 106)).attr('width', 144).attr('height', mode === 'brain' ? 272 : 176)
    .attr('fill', 'none').attr('stroke', BORDER).attr('stroke-dasharray', '2 3');
  g.append('text').attr('x', 294).attr('y', y(mode === 'brain' ? 4 : 100)).attr('text-anchor', 'middle').attr('font-size', FONT - 2).attr('fill', MUTED).text(B.filtering || 'Filtering and amplification');

  const names = {
    ff: [B.ff || 'Feedforward controller', B.ffSub || '(with memory)'],
    inputTop: [B.inputProcessing || 'Input processing'],
    eye: [B.eye || 'Sensor', B.eyeSub || '(eye)'],
    controller: [B.controller || 'Controller'],
    actuator: [B.actuator || 'Actuator', B.actuatorSub || '(muscle)'],
    sensor: [B.sensor || 'Sensor', B.sensorSub || '(muscle spindle)'],
    inputBottom: [B.inputProcessing || 'Input processing'],
  };
  const blockSel = {};
  for (const [key, blk] of Object.entries(lay.blocks)) {
    if (blk.brain && mode !== 'brain') continue;
    const w = blk.w || BOX.w;
    const h = blk.h || BOX.h;
    const grp = g.append('g');
    const rect = grp.append('rect').attr('x', blk.x).attr('y', blk.y).attr('width', w).attr('height', h).attr('rx', 3).attr('stroke-width', 1.4);
    const lines = names[key];
    const t = grp.append('text').attr('x', blk.x + w / 2).attr('y', blk.y + h / 2 - (lines.length - 1) * 7).attr('text-anchor', 'middle').attr('font-size', FONT - 1);
    lines.forEach((line, i) => t.append('tspan').attr('x', blk.x + w / 2).attr('dy', i === 0 ? '0.35em' : '1.15em').text(line));
    const cross = grp.append('path').attr('d', `M${blk.x + 6},${blk.y + 6}L${blk.x + w - 6},${blk.y + h - 6}M${blk.x + w - 6},${blk.y + 6}L${blk.x + 6},${blk.y + h - 6}`)
      .attr('stroke', 'var(--c-incorrect)').attr('stroke-width', 1.5).attr('opacity', 0);
    blockSel[key] = { blk, rect, text: t, cross };
  }

  function update(removed) {
    for (const { blk, rect, text, cross } of Object.values(blockSel)) {
      const off = blk.part && removed.has(blk.part);
      rect.attr('fill', off ? 'transparent' : 'var(--c-surface)').attr('stroke', off ? BORDER : INK).attr('stroke-dasharray', off ? '4 3' : null);
      text.attr('fill', off ? MUTED : INK);
      cross.attr('opacity', off ? 0.8 : 0);
    }
    for (const { e, path, text } of edgeSel) {
      const off = e.part && removed.has(e.part);
      path.attr('stroke', off ? BORDER : INK).attr('stroke-dasharray', off ? '4 3' : null)
        .attr('marker-end', `url(#${id}-${off ? 'off' : 'ink'})`);
      if (text) text.attr('fill', off ? MUTED : INK);
    }
  }
  return { update };
}

function drawPlot(container, props) {
  const L = props.labels || {};
  const W = 670;
  const H = 210;
  const X0 = 60;
  const X1 = 600;
  const Y0 = 24;
  const Y1 = 168;
  const svg = svgIn(container, W, H);
  const x = scaleLinear().domain([0, T_END]).range([X0, X1]);
  const y = scaleLinear().domain([-5, 25]).range([Y1, Y0]);
  const g = svg.append('g');
  rangeAxisBottom(g, x, [0, 0.5, 1, 1.5, 2, 2.5], Y1 + 6, (v) => v, L.axisX || 's');
  rangeAxisLeft(g, y, [0, 10, 20], X0 - 6, (v) => v, L.axisY || 'Elbow opened (°)');
  g.append('line').attr('x1', x(0)).attr('x2', x(T_END)).attr('y1', y(0)).attr('y2', y(0)).attr('stroke', BORDER);
  g.append('line').attr('x1', x(T_LOAD)).attr('x2', x(T_LOAD)).attr('y1', Y0).attr('y2', Y1).attr('stroke', BORDER).attr('stroke-dasharray', '2 3');
  g.append('text').attr('x', x(T_LOAD) + 4).attr('y', Y0 + 2).attr('font-size', FONT - 1).attr('fill', MUTED).text(L.weight || 'Weight lands');
  const ref = g.append('path').attr('fill', 'none').attr('stroke', MUTED).attr('stroke-width', 1.2).attr('stroke-dasharray', '4 3');
  const cur = g.append('path').attr('fill', 'none').attr('stroke', ACCENT).attr('stroke-width', 1.8);
  const refLabel = halo(g.append('text').attr('font-size', FONT - 1).attr('fill', MUTED));
  const curLabel = halo(g.append('text').attr('font-size', FONT - 1).attr('fill', ACCENT).attr('font-weight', 600));
  const line = (pts) => `M${pts.map(([t, v]) => `${x(t).toFixed(1)},${y(Math.max(-5, Math.min(25, v))).toFixed(1)}`).join('L')}`;

  function update(intact, current, same) {
    ref.attr('d', line(intact)).attr('opacity', same ? 0 : 1);
    cur.attr('d', line(current));
    const end = (pts) => pts[pts.length - 1][1];
    const ye = (v) => y(Math.max(-5, Math.min(25, v)));
    let yc = ye(end(current));
    let yr = ye(end(intact));
    if (Math.abs(yc - yr) < 14) { if (yc <= yr) { yc -= 7; yr += 7; } else { yc += 7; yr -= 7; } }
    curLabel.attr('x', X1 + 6).attr('y', yc).attr('dy', '0.35em').text(L.current || 'Now');
    refLabel.attr('x', X1 + 6).attr('y', yr).attr('dy', '0.35em').text(same ? '' : (L.intact || 'Intact'));
  }
  return { update };
}

function summary(pts) {
  const after = pts.filter(([t]) => t >= T_LOAD);
  const peak = Math.max(...after.map(([, v]) => v));
  const droop = after.find(([t]) => t >= 2.0)?.[1] ?? after[after.length - 1][1];
  return { peak: Math.max(0, peak), droop };
}

export const controlLoop = {
  fallback(props) {
    const holder = document.createElement('div');
    drawDiagram(holder, props).update(new Set());
    return holder.innerHTML;
  },

  mount(container, props) {
    const L = props.labels || {};
    const mode = props.mode || 'spinal';
    const parts = (props.parts || []).filter((p) => mode === 'brain' || (p.key !== 'ff' && p.key !== 'extero'));
    const scenarios = mode === 'brain' ? props.scenarios || [] : [];
    const removed = new Set();
    let scenario = scenarios[0]?.key || 'unexpected';

    const diagramHolder = el('div', { class: 'plot' });
    const plotHolder = el('div', { class: 'plot' });
    const diagram = drawDiagram(diagramHolder, props);
    const plot = drawPlot(plotHolder, props);
    const info = readout([[L.peak || 'Largest opening'], [L.droop || 'Still open at 2 s'], [L.breaks || 'What breaks']]);
    const plotTitle = el('p', { class: 'demo-legend demo-note' }, L.plotTitle || 'The tray');

    function refresh() {
      diagram.update(removed);
      const config = { mode, scenario, sensor: !removed.has('sensor'), input: !removed.has('input'), ff: !removed.has('ff'), extero: !removed.has('extero') };
      const current = simulateArm(config);
      const intact = simulateArm({ mode, scenario });
      plot.update(intact, current, removed.size === 0);
      const s = summary(current);
      const unit = L.unit || '°';
      info.set(0, `${s.peak.toFixed(0)}${unit}`);
      info.set(1, `${Math.abs(s.droop) < 0.5 ? '0' : s.droop.toFixed(0)}${unit}`);
      const notes = parts.filter((p) => removed.has(p.key)).map((p) => el('span', {}, p.effect));
      info.set(2, notes.length ? notes.flatMap((n, i) => (i ? [el('br'), n] : [n])) : (scenario === 'expected' ? (L.nothingExpected || L.nothing || '') : (L.nothing || '')));
    }

    const controls = [
      el('fieldset', { class: 'widget-radios' }, [
        el('legend', { class: 'widget-legend' }, L.remove || 'Remove a part'),
        ...parts.map((p) => checkRow(p.label, false, (on) => { if (on) removed.add(p.key); else removed.delete(p.key); refresh(); })),
      ]),
    ];
    if (scenarios.length > 1) {
      controls.unshift(radioRow(L.scenario || 'The weight is', nextId('scen'), scenarios.map((s) => ({ value: s.key, label: s.label })), scenario, (v) => { scenario = v; refresh(); }));
    }
    container.replaceChildren(diagramHolder, el('div', { class: 'widget-controls' }, controls), plotTitle, plotHolder, info.node);
    refresh();
  },
};
