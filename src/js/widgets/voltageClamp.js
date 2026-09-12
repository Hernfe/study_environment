// Voltage clamp demo. A command step from the holding potential to a
// chosen voltage; the membrane current shows an early inward and a
// delayed outward component. Checkboxes remove the Na+ current (TTX)
// or the K+ current (TEA) so the two can be separated.
//
// props: {
//   labels: { command, ttx, tea, early, late, inward, outward, time, current, voltage, hold },
// }

import { el } from '../dom.js';
import { simulateVoltageClamp, HH } from './hhModel.js';
import { svgIn, rangeAxisBottom, rangeAxisLeft, refLine, sliderRow, checkRow, readout, scaleLinear, d3line, fmt0, MUTED, ACCENT, INK, FONT } from './d3util.js';

const W = 680;
const H1 = 90;
const H2 = 250;
const M = { top: 14, right: 120, bottom: 30, left: 56 };
const TOTAL = 8;
const START = 1;
const DURATION = 6;
const HOLD = -65;

function draw(container, L) {
  const H = H1 + H2;
  const svg = svgIn(container, W, H);
  const x = scaleLinear().domain([0, TOTAL]).range([M.left, W - M.right]);
  const yv = scaleLinear().domain([-80, 60]).range([H1 - 6, M.top]);
  const yi = scaleLinear().domain([-1600, 2000]).range([H - M.bottom, H1 + 10]);
  const g = svg.append('g');

  rangeAxisLeft(g, yv, [-65, 0, 50], M.left, (v) => String(v), 'mV');
  const vPath = g.append('path').attr('fill', 'none').attr('stroke', INK).attr('stroke-width', 1.5);
  const vLabel = g.append('text').attr('fill', MUTED).attr('font-size', FONT - 1);

  rangeAxisLeft(g, yi, [-1500, 0, 1500], M.left, (v) => String(v), 'uA/cm2');
  rangeAxisBottom(g, x, [0, 2, 4, 6, 8], H - M.bottom, (v) => String(v), 'ms');
  refLine(g, x(0), x(TOTAL), yi(0), '0');
  const iNaPath = g.append('path').attr('fill', 'none').attr('stroke', MUTED).attr('stroke-width', 1).attr('stroke-dasharray', '3 3');
  const iKPath = g.append('path').attr('fill', 'none').attr('stroke', MUTED).attr('stroke-width', 1).attr('stroke-dasharray', '3 3');
  const iPath = g.append('path').attr('fill', 'none').attr('stroke', ACCENT).attr('stroke-width', 2);
  const earlyLabel = g.append('text').attr('fill', INK).attr('font-size', FONT - 1);
  const lateLabel = g.append('text').attr('fill', INK).attr('font-size', FONT - 1);
  const lineV = d3line().x((d) => x(d.t)).y((d) => yv(d.v));
  const lineI = (key) => d3line().x((d) => x(d.t)).y((d) => yi(Math.max(-1600, Math.min(2000, d[key]))));

  function update({ command, ttx, tea }) {
    const s = simulateVoltageClamp({ hold: HOLD, command, start: START, duration: DURATION, total: TOTAL });
    for (const d of s) {
      d.iTotal = (ttx ? 0 : d.iNa) + (tea ? 0 : d.iK);
    }
    vPath.attr('d', lineV(s));
    vLabel.attr('x', x(START + DURATION / 2)).attr('y', yv(command) + (command > HOLD ? -6 : 14)).attr('text-anchor', 'middle').text(`${fmt0(command)} mV`);
    iNaPath.attr('d', lineI('iNa')(s)).attr('opacity', ttx || tea ? 0 : 1);
    iKPath.attr('d', lineI('iK')(s)).attr('opacity', ttx || tea ? 0 : 1);
    iPath.attr('d', lineI('iTotal')(s));
    // Early component: the extreme of INa during the step. Late: IK at the end of the step.
    const inStep = s.filter((d) => d.t >= START && d.t < START + DURATION);
    const early = inStep.reduce((a, b) => (Math.abs(b.iNa) > Math.abs(a.iNa) ? b : a));
    const late = inStep[inStep.length - 1];
    const earlyVal = ttx ? 0 : early.iNa;
    const lateVal = tea ? 0 : late.iK;
    earlyLabel.attr('x', x(early.t) + 6).attr('y', yi(Math.max(-1600, Math.min(2000, ttx ? 0 : early.iTotal))) + (earlyVal < 0 ? 14 : -6)).text(ttx ? '' : L.early || 'early');
    lateLabel.attr('x', x(late.t) + 6).attr('y', yi(Math.max(-1600, Math.min(2000, late.iTotal))) + 4).text(tea ? '' : L.late || 'late');
    return { early: earlyVal, late: lateVal, earlyT: early.t };
  }
  return { update };
}

export const voltageClamp = {
  fallback(props) {
    const holder = document.createElement('div');
    draw(holder, props.labels || {}).update({ command: 0, ttx: false, tea: false });
    return holder.innerHTML;
  },

  mount(container, props) {
    const L = props.labels || {};
    const state = { command: 0, ttx: false, tea: false };
    const plot = el('div', { class: 'plot' });
    const c = draw(plot, L);
    const info = readout([[L.early || 'Early current'], [L.late || 'Late current']]);
    const dir = (v) => (v < 0 ? L.inward || 'inward' : v > 0 ? L.outward || 'outward' : '');
    function refresh() {
      const r = c.update(state);
      info.set(0, [el('strong', {}, `${fmt0(r.early)} uA/cm2`), el('span', { class: 'demo-note' }, ` ${dir(r.early)}${r.early === 0 ? '' : `, peak at ${(r.earlyT - START).toFixed(2)} ms after the step`}`)]);
      info.set(1, [el('strong', {}, `${fmt0(r.late)} uA/cm2`), el('span', { class: 'demo-note' }, ` ${dir(r.late)}`)]);
    }
    const slider = sliderRow(L.command || 'Command voltage', { min: -60, max: 60, step: 5, value: 0, unit: 'mV' }, (v) => { state.command = v; refresh(); });
    const ttx = checkRow(L.ttx || 'Block Na+ channels', false, (v) => { state.ttx = v; refresh(); });
    const tea = checkRow(L.tea || 'Block K+ channels', false, (v) => { state.tea = v; refresh(); });
    container.replaceChildren(plot, el('div', { class: 'widget-controls' }, [slider, el('div', { class: 'widget-radios' }, [ttx, tea])]), info.node);
    refresh();
  },
};
