// Chemical versus electrical synapse. Two cells, a spike in one, the
// response in the other on a shared time axis. Radios pick the synapse
// type and which cell is stimulated, so the reader sees the delay,
// the size of the response and whether it goes both ways.
//
// props: {
//   types: { chemical: { label, delay, amplitude, bidirectional: false, body }, electrical: { ... } },
//   labels: { type, stimulate, cell1, cell2, delay, response, none, direction, oneWay, bothWays },
// }

import { el } from '../dom.js';
import { svgIn, rangeAxisBottom, rangeAxisLeft, radioRow, readout, scaleLinear, d3line, fmt1, MUTED, ACCENT, INK, FONT, nextId } from './d3util.js';

const W = 620;
const H = 300;
const M = { top: 16, right: 60, bottom: 30, left: 60 };
const TOTAL = 6;
const REST = -65;

function spike(t, t0) {
  if (t < t0) return REST;
  const dt = t - t0;
  return REST + 105 * Math.exp(-((dt - 0.6) ** 2) / 0.08) - 8 * Math.exp(-((dt - 1.4) ** 2) / 0.3);
}

// Difference-of-exponentials PSP normalised to its peak.
function psp(t, t0, amp, tauRise, tauDecay) {
  if (t < t0) return 0;
  const dt = t - t0;
  const k = (1 - Math.exp(-dt / tauRise)) * Math.exp(-dt / tauDecay);
  const tp = ((tauRise * tauDecay) / (tauDecay - tauRise)) * Math.log(tauDecay / tauRise);
  const peak = (1 - Math.exp(-tp / tauRise)) * Math.exp(-tp / tauDecay);
  return (amp * k) / peak;
}

function draw(container, props) {
  const L = props.labels || {};
  const svg = svgIn(container, W, H);
  const x = scaleLinear().domain([0, TOTAL]).range([M.left, W - M.right]);
  const yTop = scaleLinear().domain([-80, 50]).range([H / 2 - 16, M.top]);
  const yBot = scaleLinear().domain([-68, -58]).range([H - M.bottom, H / 2 + 12]);
  const g = svg.append('g');
  rangeAxisLeft(g, yTop, [-65, 0, 40], M.left, (v) => String(v), 'mV');
  let botAxis = null;
  rangeAxisBottom(g, x, [0, 2, 4, 6], H - M.bottom, (v) => String(v), 'ms');
  const restLine = g.append('line').attr('x1', x(0)).attr('x2', x(TOTAL)).attr('stroke', 'var(--c-border)').attr('stroke-dasharray', '3 3');
  const t1 = g.append('text').attr('x', x(TOTAL)).attr('y', M.top + 2).attr('text-anchor', 'end').attr('fill', MUTED).attr('font-size', FONT - 1);
  const t2 = g.append('text').attr('x', x(TOTAL)).attr('y', H / 2 + 24).attr('text-anchor', 'end').attr('fill', MUTED).attr('font-size', FONT - 1);
  const pathTop = g.append('path').attr('fill', 'none').attr('stroke', INK).attr('stroke-width', 1.5);
  const pathBot = g.append('path').attr('fill', 'none').attr('stroke', ACCENT).attr('stroke-width', 2);
  const delayLine = g.append('line').attr('stroke', MUTED).attr('stroke-dasharray', '3 3');
  const delayLine2 = g.append('line').attr('stroke', MUTED).attr('stroke-dasharray', '3 3');
  const delayText = g.append('text').attr('fill', INK).attr('font-size', FONT - 1);
  const noneText = g.append('text').attr('fill', MUTED).attr('font-size', FONT - 1);

  function update({ type, from }) {
    const spec = props.types[type];
    // The lower panel keeps a scale that fits the response, so a 1 mV
    // electrical PSP and a several-mV EPSP are both readable; the tick
    // labels say which scale is in force.
    const top = spec.amplitude <= 2 ? -58 : -55;
    yBot.domain([-68, top]);
    if (botAxis) botAxis.remove();
    botAxis = rangeAxisLeft(g, yBot, spec.amplitude <= 2 ? [-65, -60] : [-65, -60, -55], M.left, (v) => String(v), 'mV');
    restLine.attr('y1', yBot(REST)).attr('y2', yBot(REST));
    const source = from === 'cell1' ? L.cell1 : L.cell2;
    const target = from === 'cell1' ? L.cell2 : L.cell1;
    t1.text(`${L.vm || 'Vm'} ${source}`);
    t2.text(`${L.vm || 'Vm'} ${target}`);
    const t0 = 1;
    const pts = [];
    for (let t = 0; t <= TOTAL; t += 0.01) pts.push([t, spike(t, t0)]);
    pathTop.attr('d', d3line().x((d) => x(d[0])).y((d) => yTop(d[1]))(pts));
    const works = from === 'cell1' || spec.bidirectional;
    const tr = t0 + 0.6 + spec.delay;
    const rpts = [];
    for (let t = 0; t <= TOTAL; t += 0.01) {
      let v = REST;
      if (works) {
        v = REST + psp(t, tr, spec.amplitude, spec.tauRise || 0.3, spec.tauDecay || 2) - (spec.undershoot ? psp(t, tr + 0.6, spec.undershoot, 0.4, 1.2) : 0);
      }
      rpts.push([t, v]);
    }
    pathBot.attr('d', d3line().x((d) => x(d[0])).y((d) => yBot(Math.max(-68, Math.min(top, d[1]))))(rpts));
    delayLine.attr('x1', x(t0 + 0.6)).attr('x2', x(t0 + 0.6)).attr('y1', yTop(40)).attr('y2', H - M.bottom).attr('opacity', works ? 1 : 0.4);
    delayLine2.attr('x1', x(tr)).attr('x2', x(tr)).attr('y1', H / 2 + 8).attr('y2', H - M.bottom).attr('opacity', works ? 1 : 0);
    delayText.attr('x', x(tr) + 6).attr('y', H / 2 + 36).text(works ? `${L.delay || 'delay'} ${fmt1(spec.delay)} ms` : '');
    noneText.attr('x', x(3)).attr('y', yBot(-62)).text(works ? '' : L.none || '');
    return { works, spec };
  }
  return { update };
}

export const synapseCompare = {
  fallback(props) {
    const holder = document.createElement('div');
    draw(holder, props).update({ type: 'chemical', from: 'cell1' });
    return holder.innerHTML;
  },

  mount(container, props) {
    const L = props.labels || {};
    const state = { type: 'chemical', from: 'cell1' };
    const plot = el('div', { class: 'plot' });
    const c = draw(plot, props);
    const info = readout([[L.type || 'Synapse'], [L.response || 'Response'], [L.direction || 'Direction']]);
    function refresh() {
      const { works, spec } = c.update(state);
      info.set(0, [el('strong', {}, spec.label), el('span', { class: 'demo-note' }, ` ${spec.body || ''}`)]);
      info.set(1, [el('strong', {}, works ? `${fmt1(spec.amplitude)} mV ${L.after || 'after'} ${fmt1(spec.delay)} ms` : L.none || 'none'), el('span', { class: 'demo-note' }, works ? ` ${spec.responseNote || ''}` : ` ${spec.noneNote || ''}`)]);
      info.set(2, [el('strong', {}, spec.bidirectional ? L.bothWays || 'both ways' : L.oneWay || 'one way')]);
    }
    const name = nextId('syn');
    const typeRow = radioRow(L.type || 'Synapse', `${name}-t`, Object.entries(props.types).map(([k, v]) => ({ value: k, label: v.label })), 'chemical', (v) => { state.type = v; refresh(); });
    const fromRow = radioRow(L.stimulate || 'Stimulate', `${name}-f`, [{ value: 'cell1', label: L.cell1 }, { value: 'cell2', label: L.cell2 }], 'cell1', (v) => { state.from = v; refresh(); });
    container.replaceChildren(plot, el('div', { class: 'widget-controls' }, [typeRow, fromRow]), info.node);
    refresh();
  },
};
