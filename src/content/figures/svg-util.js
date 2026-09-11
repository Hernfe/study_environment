// Helpers shared by the static figures. Colours come from the CSS
// tokens so every figure follows the theme.

export function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

export function text(x, y, content, opts = {}) {
  const size = opts.size || 12;
  const anchor = opts.anchor || 'middle';
  const fill = opts.fill || 'currentColor';
  const weight = opts.weight ? ` font-weight="${opts.weight}"` : '';
  const halo = opts.halo === false ? '' : ' paint-order="stroke" stroke="var(--c-surface)" stroke-width="3" stroke-linejoin="round"';
  const extra = opts.extra || '';
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" fill="${fill}"${weight}${halo} ${extra}>${esc(content)}</text>`;
}

export function wrap(w, h, inner, opts = {}) {
  const max = opts.maxWidth || w;
  return `
<svg viewBox="0 0 ${w} ${h}" width="100%" style="max-width:${max}px" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" font-family="inherit">
  ${inner}
</svg>`;
}

// A horizontal bar with a rounded data end and a square baseline end.
export function hbar(x, y, length, height, fill = 'var(--c-accent)') {
  const r = Math.min(4, height / 2, Math.max(length, 0));
  if (length <= 0) return '';
  return `<path d="M${x},${y} H${x + length - r} A${r},${r} 0 0 1 ${x + length},${y + r} V${y + height - r} A${r},${r} 0 0 1 ${x + length - r},${y + height} H${x} Z" fill="${fill}" />`;
}

// Table of bars: one row per item, one bar column per measure, each
// column on its own scale with the value written after the bar.
// spec: { rows: [{ label, values: [n] }], columns: [{ title, unit, fmt }], labelWidth, colWidth, rowHeight }
export function barTable(spec) {
  const labelWidth = spec.labelWidth || 120;
  const colWidth = spec.colWidth || 110;
  const rowHeight = spec.rowHeight || 20;
  const gap = spec.colGap || 24;
  const top = 34;
  const barH = Math.round(rowHeight * 0.55);
  const parts = [];
  const cols = spec.columns;
  const maxes = cols.map((c, i) => Math.max(...spec.rows.map((r) => r.values[i])));
  const valueRoom = spec.valueRoom || 40;
  const barRoom = colWidth - valueRoom;

  cols.forEach((c, i) => {
    const x = labelWidth + i * (colWidth + gap);
    parts.push(text(x, 14, c.title, { anchor: 'start', size: 11, weight: 600, halo: false }));
    if (c.unit) parts.push(text(x, 27, c.unit, { anchor: 'start', size: 10, fill: 'var(--c-text-muted)', halo: false }));
    parts.push(`<line x1="${x}" y1="${top}" x2="${x}" y2="${top + spec.rows.length * rowHeight}" stroke="var(--c-border)" stroke-width="1" />`);
  });

  spec.rows.forEach((row, r) => {
    const y = top + r * rowHeight;
    parts.push(text(labelWidth - 8, y + rowHeight / 2 + 4, row.label, { anchor: 'end', size: 11, halo: false }));
    cols.forEach((c, i) => {
      const x = labelWidth + i * (colWidth + gap);
      const v = row.values[i];
      const len = maxes[i] > 0 ? (v / maxes[i]) * barRoom : 0;
      parts.push(
        `<g><title>${esc(row.label)}: ${esc(c.fmt ? c.fmt(v) : v)} ${esc(c.unit || '')}</title>` +
          hbar(x, y + (rowHeight - barH) / 2, Math.max(len, 1.5), barH) +
          `</g>`
      );
      parts.push(text(x + Math.max(len, 1.5) + 5, y + rowHeight / 2 + 4, c.fmt ? c.fmt(v) : String(v), { anchor: 'start', size: 10, fill: 'var(--c-text-muted)', halo: false }));
    });
  });

  const w = labelWidth + cols.length * colWidth + (cols.length - 1) * gap + 8;
  const h = top + spec.rows.length * rowHeight + 8;
  return { markup: parts.join('\n'), w, h };
}
