// Goldman-Hodgkin-Katz explorer. Permeability sliders for K+, Na+ and
// Cl- move the membrane potential along a voltage axis between the
// equilibrium potentials, with the worked equation underneath.
//
// props: {
//   ions: [{ key, label, z (+1 or -1), inside, outside, perm }],  // mM, relative permeability
//   temperature: 37,
//   presets: [{ key, label, perms: { K: 40, Na: 1, Cl: 0 } }],
//   labels: { permeability, result, preset, equilibrium },
// }

import { el } from '../dom.js';
import { svgIn, rangeAxisBottom, sliderRow, radioRow, mathLines, scaleLinear, fmt1, MUTED, ACCENT, INK, FONT, nextId } from './d3util.js';

const RT_F = 0.198420;

function slope(tempC) {
  return RT_F * (tempC + 273.15);
}

function eIon(ion, temp) {
  return (slope(temp) / ion.z) * Math.log10(ion.outside / ion.inside);
}

// Cations: out over in. Anions: in over out.
function ghk(ions, perms, temp) {
  let num = 0;
  let den = 0;
  for (const ion of ions) {
    const p = perms[ion.key] || 0;
    if (ion.z > 0) { num += p * ion.outside; den += p * ion.inside; } else { num += p * ion.inside; den += p * ion.outside; }
  }
  if (num <= 0 || den <= 0) return { vm: NaN, num, den };
  return { vm: slope(temp) * Math.log10(num / den), num, den };
}

const W = 460;
const H = 150;
const M = { left: 24, right: 24 };

function chart(container, ions, temp, labels) {
  const svg = svgIn(container, W, H);
  const x = scaleLinear().domain([-100, 80]).range([M.left, W - M.right]);
  const g = svg.append('g');
  const axisY = 100;
  rangeAxisBottom(g, x, [-100, -50, 0, 50], axisY, (v) => String(v), '');
  g.append('text').attr('x', x(80) + 6).attr('y', axisY + 3).attr('dy', '0.35em').attr('fill', MUTED).attr('font-size', FONT - 1).text('mV');
  // Equilibrium potentials above the axis; labels of near neighbours
  // are staggered so they do not collide.
  const es = ions.map((ion) => ({ ion, e: eIon(ion, temp) })).sort((a, b) => a.e - b.e);
  let lastX = -Infinity;
  let level = 0;
  for (const { ion, e } of es) {
    level = x(e) - lastX < 60 ? 1 - level : 0;
    lastX = x(e);
    const top = axisY - 26 - level * 16;
    g.append('line').attr('x1', x(e)).attr('x2', x(e)).attr('y1', top).attr('y2', axisY).attr('stroke', MUTED);
    g.append('text').attr('x', x(e)).attr('y', top - 6).attr('text-anchor', 'middle').attr('fill', MUTED).attr('font-size', FONT - 1).text(`E${ion.key} ${fmt1(e)}`);
  }
  // Vm marker below the axis.
  const marker = g.append('g');
  marker.append('path').attr('d', 'M0,0 L-6,12 L6,12 Z').attr('fill', ACCENT);
  const text = marker.append('text').attr('y', 26).attr('text-anchor', 'middle').attr('fill', INK).attr('font-weight', 600).attr('font-size', FONT);
  const title = g.append('text').attr('x', M.left).attr('y', 14).attr('fill', MUTED).attr('font-size', FONT - 1).text(labels.equilibrium || '');

  function update(vm) {
    if (!Number.isFinite(vm)) { marker.attr('opacity', 0); return; }
    marker.attr('opacity', 1).attr('transform', `translate(${x(Math.max(-100, Math.min(80, vm)))},${axisY + 2})`);
    text.text(`Vm ${fmt1(vm)} mV`);
  }
  void title;
  return { update };
}

function lines(ions, perms, temp) {
  const k = slope(temp);
  const numTerms = [];
  const denTerms = [];
  const numVals = [];
  const denVals = [];
  for (const ion of ions) {
    const p = perms[ion.key] || 0;
    const o = ion.z > 0 ? ion.outside : ion.inside;
    const i = ion.z > 0 ? ion.inside : ion.outside;
    numTerms.push(`P${ion.key}[${ion.key}]${ion.z > 0 ? 'o' : 'i'}`);
    denTerms.push(`P${ion.key}[${ion.key}]${ion.z > 0 ? 'i' : 'o'}`);
    numVals.push(`${p}*${o}`);
    denVals.push(`${p}*${i}`);
  }
  const r = ghk(ions, perms, temp);
  const out = [
    `Vm = ${k.toFixed(2)} mV * log10( (${numTerms.join(' + ')}) / (${denTerms.join(' + ')}) )`,
    `numerator   = ${numVals.join(' + ')} = ${r.num.toFixed(1)}`,
    `denominator = ${denVals.join(' + ')} = ${r.den.toFixed(1)}`,
  ];
  if (Number.isFinite(r.vm)) out.push(`Vm = ${k.toFixed(2)} * log10(${(r.num / r.den).toPrecision(4)}) = ${k.toFixed(2)} * ${Math.log10(r.num / r.den).toFixed(3)} = ${fmt1(r.vm)} mV`);
  else out.push('Vm undefined: at least one permeability must be above zero');
  return out;
}

export const ghkExplorer = {
  fallback(props) {
    const holder = document.createElement('div');
    const perms = Object.fromEntries(props.ions.map((i) => [i.key, i.perm]));
    const c = chart(holder, props.ions, props.temperature ?? 37, props.labels || {});
    c.update(ghk(props.ions, perms, props.temperature ?? 37).vm);
    return holder.innerHTML;
  },

  mount(container, props) {
    const temp = props.temperature ?? 37;
    const L = props.labels || {};
    const perms = Object.fromEntries(props.ions.map((i) => [i.key, i.perm]));
    const plotHolder = el('div', { class: 'plot' });
    const c = chart(plotHolder, props.ions, temp, L);
    const result = el('p', { class: 'demo-result', 'aria-live': 'polite' });
    const math = el('div', { class: 'demo-math-wrap' });

    function refresh() {
      const r = ghk(props.ions, perms, temp);
      c.update(r.vm);
      result.replaceChildren(el('span', { class: 'demo-result-label' }, `${L.result || 'Vm'} `), el('strong', {}, Number.isFinite(r.vm) ? `${fmt1(r.vm)} mV` : '?'));
      math.replaceChildren(mathLines(lines(props.ions, perms, temp)));
    }

    const sliders = props.ions.map((ion) => sliderRow(`${L.permeability || 'Permeability'} P${ion.key} (${ion.label})`, { min: 0, max: ion.max ?? 100, step: ion.step ?? 1, value: ion.perm }, (v) => { perms[ion.key] = v; refresh(); }));
    const name = nextId('ghk');
    const presetRow = props.presets?.length
      ? radioRow(L.preset || 'Preset', name, props.presets.map((p) => ({ value: p.key, label: p.label })), props.presets[0].key, (key) => {
        const p = props.presets.find((q) => q.key === key);
        props.ions.forEach((ion, i) => { perms[ion.key] = p.perms[ion.key] ?? 0; sliders[i].setValue(perms[ion.key]); });
        refresh();
      })
      : null;

    container.replaceChildren(plotHolder, result, math, el('div', { class: 'widget-controls' }, [presetRow, ...sliders]));
    refresh();
  },
};
