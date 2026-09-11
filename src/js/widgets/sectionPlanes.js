// Section-planes explorer. Pick a plane and see it drawn on a lateral
// view and a dorsal view of the brain, with the directional terms
// around each view. A plane parallel to a view covers the whole view,
// which is the point: you only see a plane as a line when you look
// along it. Plane names and explanations come from props.
//
// props: {
//   planes: [{ key: 'coronal' | 'sagittal' | 'horizontal', label, info }],
//   defaultPlane?: key,
//   directions?: { anterior, posterior, dorsal, ventral, lateral, medial }  // label text
//   chooseLabel?: string,
// }

import { el } from '../dom.js';

let counter = 0;

const DEFAULT_DIRECTIONS = {
  anterior: 'Anterior',
  posterior: 'Posterior',
  dorsal: 'Dorsal (superior)',
  ventral: 'Ventral (inferior)',
  lateral: 'Lateral',
  medial: 'Medial',
};

const LATERAL_OUTLINE =
  'M30,95 C30,55 70,25 130,24 C190,23 240,32 265,62 C282,84 282,118 266,140 C255,155 235,160 215,156 ' +
  'C200,160 185,164 170,164 C135,166 100,168 75,158 C55,150 45,135 50,124 C36,118 30,108 30,95 Z';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

function label(x, y, content, anchor = 'middle') {
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="11" fill="var(--c-text-muted)">${esc(content)}</text>`;
}

function planeOnLateral(plane) {
  if (plane === 'coronal') return `<path d="M158,24 L152,176" stroke="var(--c-accent)" stroke-width="10" stroke-linecap="round" opacity="0.7" />`;
  if (plane === 'horizontal') return `<path d="M20,95 L292,95" stroke="var(--c-accent)" stroke-width="10" stroke-linecap="round" opacity="0.7" />`;
  return `<path d="${LATERAL_OUTLINE}" fill="var(--c-accent)" opacity="0.35" />`;
}

function planeOnDorsal(plane) {
  if (plane === 'coronal') return `<path d="M40,100 L180,100" stroke="var(--c-accent)" stroke-width="10" stroke-linecap="round" opacity="0.7" />`;
  if (plane === 'sagittal') return `<path d="M110,14 L110,186" stroke="var(--c-accent)" stroke-width="10" stroke-linecap="round" opacity="0.7" />`;
  return `<ellipse cx="110" cy="100" rx="62" ry="80" fill="var(--c-accent)" opacity="0.35" />`;
}

export function svgMarkup(plane, dirs) {
  const d = { ...DEFAULT_DIRECTIONS, ...(dirs || {}) };
  return `
<svg viewBox="0 0 660 275" width="100%" style="max-width:660px" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" font-family="inherit">
  <g transform="translate(10 30)">
    ${label(205, -12, 'Lateral view')}
    <g transform="translate(55 0)">
      <path d="M205,150 C208,175 210,195 214,215 L236,215 C232,195 230,175 230,152 Z" fill="var(--c-bg)" stroke="currentColor" stroke-width="1.5" />
      <path d="M225,160 C240,145 280,145 292,162 C300,175 292,190 275,195 C255,200 235,196 226,185 C220,178 220,168 225,160 Z" fill="var(--c-bg)" stroke="currentColor" stroke-width="1.5" />
      <path d="${LATERAL_OUTLINE}" fill="var(--c-bg)" stroke="currentColor" stroke-width="2" />
      <path d="M160,28 C156,60 150,90 143,120" fill="none" stroke="currentColor" stroke-width="1.5" />
      <path d="M55,122 C100,116 145,112 195,98" fill="none" stroke="currentColor" stroke-width="1.5" />
      ${planeOnLateral(plane)}
    </g>
    ${label(0, 100, d.anterior, 'start')}
    ${label(410, 100, d.posterior, 'end')}
    ${label(205, 8, d.dorsal)}
    ${label(205, 236, d.ventral)}
  </g>
  <g transform="translate(430 30)">
    ${label(110, -12, 'Dorsal view')}
    <path d="M88,172 C92,190 128,190 132,172 Z" fill="var(--c-bg)" stroke="currentColor" stroke-width="1.5" />
    <ellipse cx="110" cy="100" rx="62" ry="80" fill="var(--c-bg)" stroke="currentColor" stroke-width="2" />
    <path d="M110,22 L110,178" stroke="currentColor" stroke-width="1.5" />
    <path d="M66,96 C80,94 94,94 108,98" fill="none" stroke="currentColor" stroke-width="1" opacity="0.6" />
    <path d="M154,96 C140,94 126,94 112,98" fill="none" stroke="currentColor" stroke-width="1" opacity="0.6" />
    ${planeOnDorsal(plane)}
    ${label(110, 10, d.anterior)}
    ${label(110, 200, d.posterior)}
    ${label(0, 104, d.lateral, 'start')}
    ${label(220, 104, d.lateral, 'end')}
    ${label(110, 218, d.medial + ' (midline)')}
  </g>
</svg>`;
}

export const sectionPlanes = {
  fallback(props) {
    return svgMarkup(props.defaultPlane || props.planes?.[0]?.key || 'coronal', props.directions);
  },

  mount(container, props) {
    const planes = props.planes || [];
    const uid = `sp${(counter += 1)}`;
    let current = props.defaultPlane || planes[0]?.key || 'coronal';

    const picture = el('div', { class: 'plane-figure' });
    const heading = el('p', { class: 'widget-info-title' });
    const body = el('p', { class: 'widget-info-body' });
    const panel = el('div', { class: 'widget-info', 'aria-live': 'polite' }, [heading, body]);

    function render() {
      const plane = planes.find((p) => p.key === current) || planes[0];
      picture.innerHTML = svgMarkup(current, props.directions);
      heading.textContent = plane?.label || '';
      body.textContent = plane?.info || '';
    }

    const radios = el('fieldset', { class: 'widget-radios' }, [
      el('legend', { class: 'visually-hidden' }, props.chooseLabel || 'Plane'),
      el('span', { class: 'widget-legend' }, props.chooseLabel || 'Plane'),
      planes.map((p) =>
        el('label', { class: 'widget-radio' }, [
          el('input', {
            type: 'radio',
            name: `${uid}-plane`,
            value: p.key,
            checked: p.key === current,
            onChange: () => {
              current = p.key;
              render();
            },
          }),
          el('span', {}, p.label),
        ])
      ),
    ]);

    container.replaceChildren(picture, panel, el('div', { class: 'widget-controls' }, radios));
    render();
  },
};
