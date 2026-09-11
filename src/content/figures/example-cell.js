// Example static figure used by L00-example.js: a schematic cell with a
// membrane, one channel and one pump. props.labels (default true)
// toggles the text labels so the same drawing serves a label question.

export function exampleCell(props = {}) {
  const labels = props.labels !== false;
  const text = (x, y, content, anchor = 'middle') =>
    labels ? `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="currentColor" font-size="13">${content}</text>` : '';
  return `
<svg viewBox="0 0 400 240" width="100%" style="max-width:400px" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" font-family="inherit">
  <rect x="60" y="30" width="280" height="180" rx="40" fill="var(--c-accent-soft)" stroke="currentColor" stroke-width="3" />
  <circle cx="200" cy="120" r="34" fill="var(--c-surface)" stroke="currentColor" stroke-width="2" />
  ${text(200, 125, 'nucleus')}
  <!-- channel in the top membrane -->
  <rect x="120" y="18" width="10" height="26" fill="var(--c-surface)" stroke="currentColor" stroke-width="2" />
  <rect x="142" y="18" width="10" height="26" fill="var(--c-surface)" stroke="currentColor" stroke-width="2" />
  <line x1="136" y1="0" x2="136" y2="60" stroke="var(--c-accent)" stroke-width="2" stroke-dasharray="3 3" />
  <polygon points="131,58 141,58 136,66" fill="var(--c-accent)" />
  ${text(136, 84, 'channel')}
  <!-- pump in the right membrane -->
  <rect x="326" y="100" width="28" height="40" rx="6" fill="var(--c-surface)" stroke="currentColor" stroke-width="2" />
  <line x1="300" y1="112" x2="380" y2="112" stroke="var(--c-accent)" stroke-width="2" />
  <polygon points="378,107 388,112 378,117" fill="var(--c-accent)" />
  <line x1="380" y1="128" x2="300" y2="128" stroke="var(--c-accent)" stroke-width="2" />
  <polygon points="302,123 292,128 302,133" fill="var(--c-accent)" />
  ${text(340, 160, 'pump')}
  <!-- membrane label -->
  ${text(60, 230, 'membrane', 'start')}
  ${text(200, 60, 'inside')}
  ${text(200, 16, 'outside')}
</svg>`;
}
