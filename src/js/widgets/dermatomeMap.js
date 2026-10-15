// Dermatome map (L06, slides 15 and 16): pick a spinal segment and its
// skin area lights up on Figure 12.12, front and back. The regions are
// traced from the figure's own boundary lines by scripts/trace_dermatomes.py,
// and only where the figure labels them; where the figure points at a
// spot without drawing a boundary (the hands, the back of the foot) a
// ring marks the spot instead. "Whole group" lights every segment of
// the chosen segment's group (cervical, thoracic, lumbar, sacral).
//
// props: {
//   src, alt, aspect, size: { width, height }, paths: { C2: 'M..Z', ... },
//   points: { C6: [[x, y], ...] },
//   groups: [{ key: 'C', label: 'Cervical', segments: ['C2', ...] }],
//   initial: 'T10',
//   notes: { T10: 'The band at the level of the navel.' },
//   labels: { choose, whole, segment, group, where, overlap, spot },
// }

import { el } from '../dom.js';
import { nextId } from './d3util.js';

const SVG_NS = 'http://www.w3.org/2000/svg';
// The picture is always on white, so the overlay uses the fixed picture
// blue of the hotspot anchors, not the theme accent.
const PICTURE_BLUE = '#2856c9';

function svgEl(name, attrs = {}) {
  const node = document.createElementNS(SVG_NS, name);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  return node;
}

function buildFigure(props) {
  const { width, height } = props.size;
  const svg = svgEl('svg', { viewBox: `0 0 ${width} ${height}`, width: '100%', role: 'img', 'aria-label': props.alt || '' });
  svg.style.display = 'block';
  svg.style.maxWidth = '640px';
  svg.style.marginInline = 'auto';
  svg.append(svgEl('image', { href: props.src, x: 0, y: 0, width, height }));
  const layer = svgEl('g');
  svg.append(layer);
  return { svg, layer };
}

export const dermatomeMap = {
  fallback(props) {
    return `<img src="${props.src}" alt="${(props.alt || '').replace(/"/g, '&quot;')}" style="width:100%;max-width:640px;display:block;margin:auto">`;
  },

  mount(container, props) {
    const L = props.labels || {};
    const groups = props.groups || [];
    const segments = groups.flatMap((g) => g.segments);
    const groupOf = (seg) => groups.find((g) => g.segments.includes(seg));
    let current = props.initial || segments[0];
    let whole = false;

    const { svg, layer } = buildFigure(props);
    const stage = el('div', { class: 'dermatome-stage' });
    stage.append(svg);

    const buttons = new Map();
    const pick = (seg, focus = false) => {
      current = seg;
      refresh();
      if (focus) buttons.get(seg)?.focus();
    };
    const onKey = (event) => {
      const i = segments.indexOf(current);
      let j = null;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') j = Math.min(segments.length - 1, i + 1);
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') j = Math.max(0, i - 1);
      if (event.key === 'Home') j = 0;
      if (event.key === 'End') j = segments.length - 1;
      if (j !== null) { event.preventDefault(); pick(segments[j], true); }
    };
    const rows = groups.map((g) => el('div', { class: 'dermatome-group' }, [
      el('span', { class: 'dermatome-group-label' }, g.label),
      el('div', { class: 'dermatome-buttons', role: 'group', 'aria-label': g.label }, g.segments.map((seg) => {
        const b = el('button', { type: 'button', class: 'dermatome-btn', 'aria-pressed': 'false', onClick: () => pick(seg), onKeydown: onKey }, seg);
        buttons.set(seg, b);
        return b;
      })),
    ]));
    const wholeBox = el('label', { class: 'widget-radio' }, [
      el('input', { type: 'checkbox', onChange: (e) => { whole = e.target.checked; refresh(); } }),
      el('span', {}, L.whole || 'Light the whole group'),
    ]);
    const live = el('p', { class: 'demo-result', 'aria-live': 'polite' });
    const note = el('p', { class: 'demo-legend' });

    function refresh() {
      const g = groupOf(current);
      const lit = whole && g ? g.segments : [current];
      layer.replaceChildren();
      for (const seg of lit) {
        const d = props.paths?.[seg];
        if (d) {
          layer.append(svgEl('path', {
            d, fill: PICTURE_BLUE, 'fill-opacity': seg === current ? 0.55 : 0.3,
            stroke: PICTURE_BLUE, 'stroke-width': 3, 'stroke-linejoin': 'round',
          }));
        }
        for (const [x, y] of props.points?.[seg] || []) {
          layer.append(svgEl('circle', { cx: x, cy: y, r: 16, fill: 'none', stroke: '#ffffff', 'stroke-width': 7 }));
          layer.append(svgEl('circle', { cx: x, cy: y, r: 16, fill: 'none', stroke: PICTURE_BLUE, 'stroke-width': 4 }));
        }
      }
      for (const [seg, b] of buttons) {
        const on = seg === current;
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
        b.tabIndex = on ? 0 : -1;
        b.classList.toggle('is-lit', whole && lit.includes(seg) && !on);
      }
      const where = props.notes?.[current];
      live.replaceChildren(
        el('strong', {}, current), ' ',
        el('span', { class: 'demo-result-label' }, `${g ? g.label : ''}${whole ? ` (${L.wholeShort || 'whole group lit'})` : ''}`),
      );
      note.textContent = [where, (props.points?.[current] || []).length ? L.spot : ''].filter(Boolean).join(' ');
    }

    const id = nextId('derm');
    container.replaceChildren(
      stage,
      el('div', { class: 'widget-controls', id }, [
        el('div', { class: 'dermatome-picker' }, [el('span', { class: 'widget-legend' }, L.choose || 'Spinal segment'), ...rows]),
        wholeBox,
      ]),
      live,
      note,
      L.overlap ? el('p', { class: 'demo-legend demo-note' }, L.overlap) : null,
    );
    refresh();
  },
};
