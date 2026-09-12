// Shared drawing helpers for the quantitative demos: d3 scales and
// range-frame axes in the site's figure style (docs/DESIGN.md, 6.1 rule
// 7): axes span only the data, two or three ticks, no gridlines, muted
// scaffolding, one accent colour on the focal mark, direct labels.

import { select, scaleLinear, scaleLog, axisBottom, axisLeft, line as d3line, format } from 'd3';
import { el } from '../dom.js';

export const FONT = 12;
export const MUTED = 'var(--c-text-muted)';
export const BORDER = 'var(--c-border)';
export const ACCENT = 'var(--c-accent)';
export const INK = 'currentColor';

export { scaleLinear, scaleLog, d3line, format };

// Create a responsive <svg> element inside `container`.
export function svgIn(container, w, h, extra = {}) {
  const svg = select(container).append('svg')
    .attr('viewBox', `0 0 ${w} ${h}`)
    .attr('width', '100%')
    .attr('font-family', 'inherit')
    .attr('font-size', FONT)
    .attr('aria-hidden', 'true')
    .attr('style', `max-width:${w}px;display:block;overflow:visible`);
  for (const [k, v] of Object.entries(extra)) svg.attr(k, v);
  return svg;
}

// Range-frame axis: the domain line spans only [min, max] of the data
// and shows the given ticks, in muted ink.
export function rangeAxisBottom(g, x, ticks, y, fmt = format('~g'), unit = '') {
  const ax = axisBottom(x).tickValues(ticks).tickSize(3).tickFormat(fmt);
  const node = g.append('g').attr('transform', `translate(0,${y})`).call(ax);
  const [a, b] = [ticks[0], ticks[ticks.length - 1]];
  node.select('.domain').attr('d', `M${x(a)},0H${x(b)}`).attr('stroke', BORDER);
  node.selectAll('.tick line').attr('stroke', BORDER);
  node.selectAll('.tick text').attr('fill', MUTED).attr('font-size', FONT - 1);
  if (unit) node.append('text').attr('x', x(b) + 22).attr('y', 3).attr('dy', '0.35em').attr('fill', MUTED).attr('font-size', FONT - 1).text(unit);
  return node;
}

export function rangeAxisLeft(g, y, ticks, x, fmt = format('~g'), unit = '') {
  const ax = axisLeft(y).tickValues(ticks).tickSize(3).tickFormat(fmt);
  const node = g.append('g').attr('transform', `translate(${x},0)`).call(ax);
  const [a, b] = [ticks[0], ticks[ticks.length - 1]];
  node.select('.domain').attr('d', `M0,${y(a)}V${y(b)}`).attr('stroke', BORDER);
  node.selectAll('.tick line').attr('stroke', BORDER);
  node.selectAll('.tick text').attr('fill', MUTED).attr('font-size', FONT - 1);
  if (unit) node.append('text').attr('x', 0).attr('y', y(b) - 8).attr('text-anchor', 'end').attr('fill', MUTED).attr('font-size', FONT - 1).text(unit);
  return node;
}

// A labelled horizontal reference line (dashed, muted) with its label
// at the right end.
export function refLine(g, x0, x1, y, label, opts = {}) {
  g.append('line').attr('x1', x0).attr('x2', x1).attr('y1', y).attr('y2', y).attr('stroke', opts.stroke || BORDER).attr('stroke-dasharray', opts.dash || '3 3');
  if (label) g.append('text').attr('x', x1 + 6).attr('y', y + (opts.dy || 0)).attr('dy', '0.35em').attr('fill', opts.fill || MUTED).attr('font-size', FONT - 1).text(label);
}

// Controls: a range slider row with a live output, keyboard operable.
export function sliderRow(label, { min, max, step, value, unit = '', fmt = (v) => String(v) }, onInput) {
  const output = el('output', {}, `${fmt(value)} ${unit}`.trim());
  const input = el('input', {
    type: 'range', min, max, step, value, 'aria-label': label,
    onInput: (event) => {
      const v = Number(event.target.value);
      output.textContent = `${fmt(v)} ${unit}`.trim();
      onInput(v);
    },
  });
  const row = el('label', {}, [el('span', {}, label), input, output]);
  row.setValue = (v) => { input.value = String(v); output.textContent = `${fmt(v)} ${unit}`.trim(); };
  return row;
}

export function radioRow(legend, name, options, value, onChange) {
  const set = el('fieldset', { class: 'widget-radios' }, [
    el('legend', { class: 'widget-legend' }, legend),
    ...options.map((o) => el('label', { class: 'widget-radio' }, [
      el('input', { type: 'radio', name, value: o.value, checked: o.value === value, onChange: () => onChange(o.value) }),
      el('span', {}, o.label),
    ])),
  ]);
  return set;
}

export function checkRow(label, checked, onChange) {
  return el('label', { class: 'widget-radio' }, [
    el('input', { type: 'checkbox', checked, onChange: (e) => onChange(e.target.checked) }),
    el('span', {}, label),
  ]);
}

// Text with a halo of the card surface so it stays readable over lines.
export function halo(sel) {
  return sel.attr('paint-order', 'stroke').attr('stroke', 'var(--c-surface)').attr('stroke-width', 3).attr('stroke-linejoin', 'round');
}

// Read-out lines under a demo: a definition list of label -> value.
export function readout(items) {
  const dl = el('dl', { class: 'demo-readout' });
  const cells = items.map(([label]) => {
    const dd = el('dd', {});
    dl.append(el('dt', {}, label), dd);
    return dd;
  });
  return { node: dl, set: (i, value) => { cells[i].replaceChildren(...(Array.isArray(value) ? value : [value])); } };
}

// Monospace equation lines (the worked calculation).
export function mathLines(lines) {
  return el('pre', { class: 'demo-math' }, lines.join('\n'));
}

let uid = 0;
export function nextId(prefix = 'w') {
  uid += 1;
  return `${prefix}${uid}`;
}

export const fmt1 = format('.1f');
export const fmt0 = format('.0f');
export const fmt2 = format('.2f');
