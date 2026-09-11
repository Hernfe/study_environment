// Generic "change a variable, watch the curve move" widget.
// props: {
//   xLabel, yLabel, xMin, xMax, yMin, yMax,
//   params: [{ key, label, min, max, step, value, unit }],
//   compute: (x, params) => y,          // params is { key: value }
//   readout?: (params) => string,       // one-line summary under the plot
//   samples?: number                    // default 120
// }
// Controls are native range inputs, so the widget is keyboard operable.

import { el } from '../dom.js';

const W = 420;
const H = 260;
const M = { top: 16, right: 16, bottom: 44, left: 56 };

function scaleX(props, x) {
  return M.left + ((x - props.xMin) / (props.xMax - props.xMin)) * (W - M.left - M.right);
}

function scaleY(props, y) {
  return H - M.bottom - ((y - props.yMin) / (props.yMax - props.yMin)) * (H - M.top - M.bottom);
}

function currentValues(props, overrides = {}) {
  const values = {};
  for (const p of props.params || []) values[p.key] = overrides[p.key] ?? p.value;
  return values;
}

function pathFor(props, values) {
  const n = props.samples || 120;
  const points = [];
  for (let i = 0; i <= n; i += 1) {
    const x = props.xMin + ((props.xMax - props.xMin) * i) / n;
    const y = props.compute(x, values);
    if (!Number.isFinite(y)) continue;
    const cy = Math.min(Math.max(y, props.yMin), props.yMax);
    points.push(`${scaleX(props, x).toFixed(1)},${scaleY(props, cy).toFixed(1)}`);
  }
  return points.length ? 'M' + points.join(' L') : '';
}

function ticks(min, max, count = 4) {
  const out = [];
  for (let i = 0; i <= count; i += 1) out.push(min + ((max - min) * i) / count);
  return out;
}

function fmt(v) {
  return Number.isInteger(v) ? String(v) : v.toFixed(Math.abs(v) < 10 ? 2 : 1);
}

export function svgMarkup(props, values) {
  const xTicks = ticks(props.xMin, props.xMax);
  const yTicks = ticks(props.yMin, props.yMax);
  const zeroY = props.yMin < 0 && props.yMax > 0 ? scaleY(props, 0) : null;
  return `
<svg viewBox="0 0 ${W} ${H}" width="100%" style="max-width:${W}px" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" font-family="inherit" font-size="12">
  <g stroke="var(--c-border)" stroke-width="1">
    ${xTicks.map((t) => `<line x1="${scaleX(props, t)}" y1="${M.top}" x2="${scaleX(props, t)}" y2="${H - M.bottom}" />`).join('')}
    ${yTicks.map((t) => `<line x1="${M.left}" y1="${scaleY(props, t)}" x2="${W - M.right}" y2="${scaleY(props, t)}" />`).join('')}
  </g>
  ${zeroY !== null ? `<line x1="${M.left}" y1="${zeroY}" x2="${W - M.right}" y2="${zeroY}" stroke="var(--c-text-muted)" stroke-width="1" stroke-dasharray="4 3" />` : ''}
  <g fill="var(--c-text-muted)" text-anchor="middle">
    ${xTicks.map((t) => `<text x="${scaleX(props, t)}" y="${H - M.bottom + 16}">${fmt(t)}</text>`).join('')}
    <text x="${(M.left + W - M.right) / 2}" y="${H - 8}">${props.xLabel || ''}</text>
  </g>
  <g fill="var(--c-text-muted)" text-anchor="end">
    ${yTicks.map((t) => `<text x="${M.left - 8}" y="${scaleY(props, t) + 4}">${fmt(t)}</text>`).join('')}
  </g>
  <text fill="var(--c-text-muted)" text-anchor="middle" transform="translate(14 ${(M.top + H - M.bottom) / 2}) rotate(-90)">${props.yLabel || ''}</text>
  <path class="plot-line" d="${pathFor(props, values)}" fill="none" stroke="var(--c-accent)" stroke-width="2.5" stroke-linejoin="round" />
</svg>`;
}

export const sliderPlot = {
  fallback(props) {
    return svgMarkup(props, currentValues(props));
  },

  mount(container, props) {
    const values = currentValues(props);
    const plot = el('div', { class: 'plot', html: svgMarkup(props, values) });
    const readout = el('p', { class: 'muted', 'aria-live': 'polite' });

    function update() {
      const path = plot.querySelector('.plot-line');
      if (path) path.setAttribute('d', pathFor(props, values));
      readout.textContent = typeof props.readout === 'function' ? props.readout(values) : '';
    }

    const controls = el(
      'div',
      { class: 'widget-controls' },
      (props.params || []).map((p) => {
        const output = el('output', {}, `${fmt(p.value)} ${p.unit || ''}`);
        const input = el('input', {
          type: 'range',
          min: p.min,
          max: p.max,
          step: p.step || 1,
          value: p.value,
          'aria-label': p.label,
          onInput: (event) => {
            values[p.key] = Number(event.target.value);
            output.textContent = `${fmt(values[p.key])} ${p.unit || ''}`;
            update();
          },
        });
        return el('label', {}, [el('span', {}, p.label), input, output]);
      })
    );

    container.replaceChildren(plot, readout, controls);
    update();
  },
};
