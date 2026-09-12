// Nernst calculator. Sliders for the concentration inside and outside
// (log-spaced), the charge z and the temperature; a live equilibrium
// potential, the worked equation underneath, and a small plot of E
// against the concentration ratio with the current point marked.
//
// props: {
//   ions: [{ key, label, z, inside, outside }],   // presets, mM
//   defaultIon: 'K',
//   temperature: 37,
//   labels: { ion, inside, outside, valence, temperature, result, ratio, potential, presetNote },
// }

import { el } from '../dom.js';
import { svgIn, rangeAxisBottom, rangeAxisLeft, refLine, sliderRow, radioRow, mathLines, scaleLinear, scaleLog, d3line, fmt1, MUTED, ACCENT, FONT, nextId } from './d3util.js';

const RT_F = 0.198420; // 2.303 R / F in mV per kelvin

function slope(tempC, z) {
  return (RT_F * (tempC + 273.15)) / z;
}

function nernst(state) {
  return slope(state.temp, state.z) * Math.log10(state.outside / state.inside);
}

function fmtConc(v) {
  if (v >= 10) return v.toFixed(0);
  if (v >= 1) return v.toFixed(1);
  if (v >= 0.01) return v.toFixed(2);
  return v.toPrecision(2);
}

const W = 440;
const H = 230;
const M = { top: 18, right: 90, bottom: 40, left: 52 };

function chart(container, state) {
  const svg = svgIn(container, W, H);
  const x = scaleLog().domain([0.001, 1000]).range([M.left, W - M.right]);
  const y = scaleLinear().domain([-200, 200]).range([H - M.bottom, M.top]);
  const g = svg.append('g');
  rangeAxisBottom(g, x, [0.001, 0.01, 0.1, 1, 10, 100, 1000], H - M.bottom, (v) => (v >= 1 ? String(v) : String(v)), '');
  g.append('text').attr('x', (M.left + W - M.right) / 2).attr('y', H - 6).attr('text-anchor', 'middle').attr('fill', MUTED).attr('font-size', FONT - 1).text(state.labels.ratio);
  rangeAxisLeft(g, y, [-200, -100, 0, 100, 200], M.left, (v) => String(v), 'mV');
  refLine(g, M.left, W - M.right, y(0), '');
  const lineG = g.append('path').attr('fill', 'none').attr('stroke', MUTED).attr('stroke-width', 1.5);
  const dot = g.append('circle').attr('r', 4.5).attr('fill', ACCENT);
  const label = g.append('text').attr('fill', 'currentColor').attr('font-weight', 600).attr('font-size', FONT);
  const lineFn = d3line().x((d) => x(d[0])).y((d) => y(d[1]));

  function update(s) {
    const k = slope(s.temp, s.z);
    const pts = [];
    for (let e = -3; e <= 3.0001; e += 0.25) {
      const r = 10 ** e;
      const v = k * e;
      if (v >= -200 && v <= 200) pts.push([r, v]);
    }
    lineG.attr('d', lineFn(pts));
    const r = s.outside / s.inside;
    const e = nernst(s);
    const rc = Math.min(1000, Math.max(0.001, r));
    const ec = Math.min(200, Math.max(-200, e));
    dot.attr('cx', x(rc)).attr('cy', y(ec));
    label.attr('x', x(rc) + 9).attr('y', y(ec)).attr('dy', '0.35em').text(`${fmt1(e)} mV`);
  }
  update(state);
  return { update, node: svg.node() };
}

function lines(s) {
  const k = slope(s.temp, s.z);
  const ratio = s.outside / s.inside;
  const lg = Math.log10(ratio);
  return [
    'E_ion = 2.303 (R T / z F) * log10([ion]out / [ion]in)',
    `2.303 R T / F = ${RT_F.toFixed(4)} mV/K * ${(s.temp + 273.15).toFixed(2)} K = ${(k * s.z).toFixed(2)} mV`,
    `E = (${(k * s.z).toFixed(2)} mV / ${s.z}) * log10(${fmtConc(s.outside)} / ${fmtConc(s.inside)})`,
    `log10(${ratio >= 0.001 && ratio <= 1000 ? ratio.toPrecision(3) : ratio.toExponential(2)}) = ${lg.toFixed(3)}`,
    `E = ${fmt1(k)} mV * ${lg.toFixed(3)} = ${fmt1(k * lg)} mV`,
  ];
}

function initial(props) {
  const ion = (props.ions || []).find((i) => i.key === props.defaultIon) || props.ions?.[0] || { z: 1, inside: 100, outside: 5 };
  return { ion: ion.key, z: ion.z, inside: ion.inside, outside: ion.outside, temp: props.temperature ?? 37, labels: props.labels || {} };
}

export const nernstCalc = {
  fallback(props) {
    const s = initial(props);
    const holder = document.createElement('div');
    chart(holder, s);
    return holder.innerHTML;
  },

  mount(container, props) {
    const s = initial(props);
    const L = s.labels;
    const plotHolder = el('div', { class: 'plot' });
    const c = chart(plotHolder, s);
    const result = el('p', { class: 'demo-result', 'aria-live': 'polite' });
    const math = el('div', { class: 'demo-math-wrap' });

    function refresh() {
      c.update(s);
      const e = nernst(s);
      result.replaceChildren(el('span', { class: 'demo-result-label' }, `${L.result || 'E'} `), el('strong', {}, `${fmt1(e)} mV`));
      math.replaceChildren(mathLines(lines(s)));
    }

    const logSlider = (label, key) => sliderRow(label, {
      min: -4, max: 2.5, step: 0.01, value: Math.log10(s[key]), unit: 'mM', fmt: (v) => fmtConc(10 ** v),
    }, (v) => { s[key] = 10 ** v; refresh(); });
    const inside = logSlider(L.inside || 'Inside', 'inside');
    const outside = logSlider(L.outside || 'Outside', 'outside');
    const temp = sliderRow(L.temperature || 'Temperature', { min: 0, max: 40, step: 1, value: s.temp, unit: 'C' }, (v) => { s.temp = v; refresh(); });
    const name = nextId('nernst');
    const zRow = radioRow(L.valence || 'Charge z', `${name}-z`, [
      { value: -2, label: '-2' }, { value: -1, label: '-1' }, { value: 1, label: '+1' }, { value: 2, label: '+2' },
    ], s.z, (v) => { s.z = Number(v); refresh(); });
    const presets = radioRow(L.ion || 'Ion', `${name}-ion`, (props.ions || []).map((i) => ({ value: i.key, label: i.label })), s.ion, (key) => {
      const ion = props.ions.find((i) => i.key === key);
      s.ion = key; s.z = ion.z; s.inside = ion.inside; s.outside = ion.outside;
      inside.setValue(Math.log10(s.inside));
      outside.setValue(Math.log10(s.outside));
      zRow.querySelectorAll('input').forEach((r) => { r.checked = Number(r.value) === s.z; });
      refresh();
    });

    const controls = el('div', { class: 'widget-controls' }, [presets, inside, outside, zRow, temp]);
    container.replaceChildren(plotHolder, result, math, controls);
    refresh();
  },
};
