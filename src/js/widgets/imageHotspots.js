// Image with hotspot regions. Hover, tap or arrow through numbered
// markers to read about each region; a list beside the image (below it
// on narrow screens) offers the same regions as buttons. Quiz mode
// hides the labels and asks the learner to assign them.
//
// Coordinates are percentages of the image, so one set of regions works
// at every size and can be reused by label-the-figure questions.
//
// props: {
//   src: '/assets/figures/L01/lobes.webp',   // or svg: '<svg ...>' markup
//   alt: 'Lateral view of the brain ...',
//   aspect: 936 / 454,                        // width / height of the image
//   regions: [{
//     id, label, body,
//     shape: 'rect' | 'ellipse' | 'line',     // default 'ellipse'
//     x, y, w, h,                             // rect/ellipse: centre and size in %
//     x2, y2,                                 // line: end point (x, y is the start)
//     mx, my,                                 // optional marker position (default: centre or line start)
//   }],
//   quiz: true,                               // offer quiz mode (default true)
//   layout: 'side' | 'stack',                 // list beside (default) or below the picture
//   showShapes: false,                        // draw every region outline at rest (planes, bands)
//   intro: 'Hover or tap a marker ...',
//   labelPool: ['Extra distractor label'],    // optional extra labels for quiz mode
// }

import { el } from '../dom.js';

let counter = 0;

function markerPos(region) {
  if (region.mx !== undefined) return [region.mx, region.my];
  if (region.shape === 'line') return [region.x, region.y];
  return [region.x, region.y];
}

function shapeNode(region) {
  const common = { class: 'hotspot-shape', 'data-region': region.id, 'vector-effect': 'non-scaling-stroke' };
  if (region.shape === 'line') {
    return svgEl('line', { ...common, x1: region.x, y1: region.y, x2: region.x2, y2: region.y2 });
  }
  if (region.shape === 'rect') {
    return svgEl('rect', { ...common, x: region.x - region.w / 2, y: region.y - region.h / 2, width: region.w, height: region.h, rx: 1 });
  }
  return svgEl('ellipse', { ...common, cx: region.x, cy: region.y, rx: region.w / 2, ry: region.h / 2 });
}

function svgEl(tag, attrs) {
  const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
  return node;
}

// The picture plus overlay. Returns { figure, markers, setState } where
// setState(id, 'active' | 'correct' | 'incorrect' | null) restyles one marker.
export function buildFigure(props, { numbered = true, onEnter, onLeave, onPick, onKey } = {}) {
  const uid = `hs${(counter += 1)}`;
  // Tall pictures are capped at 28rem high; the width follows so the
  // percentage overlay stays aligned.
  const figure = el('div', { class: 'hotspots-figure', style: props.aspect ? `aspect-ratio: ${props.aspect}; max-width: calc(28rem * ${props.aspect})` : '' });
  if (props.svg) {
    figure.classList.add('is-svg');
    figure.innerHTML = props.svg;
  } else {
    figure.appendChild(el('img', { src: props.src, alt: props.alt || '', loading: 'lazy', decoding: 'async' }));
  }
  const overlay = svgEl('svg', { class: `hotspots-overlay${props.showShapes ? ' is-shown' : ''}`, viewBox: '0 0 100 100', preserveAspectRatio: 'none', 'aria-hidden': 'true' });
  for (const region of props.regions) overlay.appendChild(shapeNode(region));
  figure.appendChild(overlay);

  const markers = new Map();
  props.regions.forEach((region, i) => {
    const [mx, my] = markerPos(region);
    const marker = el('button', {
      type: 'button',
      class: 'hotspot-marker',
      style: `left:${mx}%; top:${my}%`,
      'data-region': region.id,
      'aria-label': numbered ? `Marker ${i + 1}` : region.label,
      tabindex: i === 0 ? '0' : '-1',
      onMouseenter: () => onEnter?.(region.id),
      onMouseleave: () => onLeave?.(region.id),
      onFocus: () => onEnter?.(region.id),
      onBlur: () => onLeave?.(region.id),
      onClick: () => onPick?.(region.id),
      onKeydown: (event) => onKey?.(event, i),
    }, numbered ? String(i + 1) : '');
    markers.set(region.id, marker);
    figure.appendChild(marker);
  });

  function setState(id, state) {
    const marker = markers.get(id);
    const shape = overlay.querySelector(`[data-region="${id}"]`);
    for (const node of [marker, shape]) {
      if (!node) continue;
      node.classList.remove('is-active', 'is-correct', 'is-incorrect');
      if (state) node.classList.add(`is-${state}`);
    }
  }

  return { figure, markers, setState, uid };
}

// Roving tabindex across the markers: arrows move, Home/End jump.
function rove(markers, from, delta, event) {
  const list = [...markers.values()];
  let next = from + delta;
  if (event.key === 'Home') next = 0;
  if (event.key === 'End') next = list.length - 1;
  next = (next + list.length) % list.length;
  list.forEach((m, i) => m.setAttribute('tabindex', i === next ? '0' : '-1'));
  list[next].focus();
}

export function studyView(container, props) {
  let pinned = null;
  let hovered = null;
  const bodies = new Map();
  const items = new Map();

  const { figure, markers, setState } = buildFigure(props, {
    onEnter: (id) => { hovered = id; refresh(); },
    onLeave: () => { hovered = null; refresh(); },
    onPick: (id) => pin(pinned === id ? null : id),
    onKey: (event, i) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') { event.preventDefault(); rove(markers, i, 1, event); }
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') { event.preventDefault(); rove(markers, i, -1, event); }
      else if (event.key === 'Home' || event.key === 'End') { event.preventDefault(); rove(markers, i, 0, event); }
    },
  });

  const list = el('ol', { class: 'hotspots-list' }, props.regions.map((region, i) => {
    const body = el('p', { class: 'hotspots-body', hidden: true }, region.body || '');
    const button = el('button', {
      type: 'button',
      class: 'hotspots-item',
      'aria-expanded': 'false',
      'data-region': region.id,
      onMouseenter: () => { hovered = region.id; refresh(); },
      onMouseleave: () => { hovered = null; refresh(); },
      onFocus: () => { hovered = region.id; refresh(); },
      onBlur: () => { hovered = null; refresh(); },
      onClick: () => pin(pinned === region.id ? null : region.id),
    }, [el('span', { class: 'hotspots-num' }, String(i + 1)), el('span', {}, region.label)]);
    bodies.set(region.id, body);
    items.set(region.id, button);
    return el('li', {}, [button, body]);
  }));

  const intro = el('p', { class: 'hotspots-intro' }, props.intro || 'Hover, tap or use the arrow keys on a marker to read about it.');

  function refresh() {
    const current = hovered || pinned;
    for (const region of props.regions) {
      const isCurrent = region.id === current;
      setState(region.id, isCurrent ? 'active' : null);
      items.get(region.id).classList.toggle('is-active', isCurrent);
      items.get(region.id).setAttribute('aria-expanded', String(region.id === pinned));
      bodies.get(region.id).hidden = region.id !== pinned;
    }
  }

  function pin(id) {
    pinned = id;
    refresh();
  }

  container.replaceChildren(figure, el('div', { class: 'hotspots-side' }, [intro, list]));
  refresh();
}

function shuffle(list) {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Quiz mode: numbered markers, one select per number, check button.
// Used by the widget's quiz toggle and by label-the-figure questions.
// onResult({ right, total, results: [{ id, ok }] }) fires on check.
export function quizView(container, props, { onResult, checkLabel = 'Check labels' } = {}) {
  const { figure, setState } = buildFigure(props, {
    onEnter: (id) => setState(id, results.has(id) ? (results.get(id) ? 'correct' : 'incorrect') : 'active'),
    onLeave: (id) => setState(id, results.has(id) ? (results.get(id) ? 'correct' : 'incorrect') : null),
    onKey: (event, i) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') { event.preventDefault(); rove(markersOf(figure), i, 1, event); }
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') { event.preventDefault(); rove(markersOf(figure), i, -1, event); }
    },
  });
  const results = new Map();
  const pool = shuffle([...new Set([...props.regions.map((r) => r.label), ...(props.labelPool || [])])]);
  const selects = [];
  const feedbacks = [];

  const list = el('ol', { class: 'hotspots-list hotspots-quiz-list' }, props.regions.map((region, i) => {
    const select = el('select', { 'aria-label': `Label for marker ${i + 1}` }, [
      el('option', { value: '' }, 'Choose a label'),
      ...pool.map((label) => el('option', { value: label }, label)),
    ]);
    const feedback = el('p', { class: 'hotspots-body hotspots-feedback', hidden: true });
    selects.push(select);
    feedbacks.push(feedback);
    return el('li', {}, [el('div', { class: 'hotspots-quiz-row' }, [el('span', { class: 'hotspots-num' }, String(i + 1)), select]), feedback]);
  }));

  const summary = el('p', { class: 'feedback', hidden: true, 'aria-live': 'polite' });
  const check = el('button', { type: 'button', class: 'btn btn-primary' }, checkLabel);

  check.addEventListener('click', () => {
    let right = 0;
    const out = [];
    props.regions.forEach((region, i) => {
      const ok = selects[i].value === region.label;
      results.set(region.id, ok);
      if (ok) right += 1;
      setState(region.id, ok ? 'correct' : 'incorrect');
      selects[i].classList.toggle('is-correct', ok);
      selects[i].classList.toggle('is-incorrect', !ok);
      feedbacks[i].hidden = false;
      feedbacks[i].textContent = (ok ? 'Correct. ' : `Correct label: ${region.label}. `) + (region.body || '');
      out.push({ id: region.id, ok });
    });
    summary.hidden = false;
    summary.className = `feedback ${right === props.regions.length ? 'is-correct' : 'is-incorrect'}`;
    summary.textContent = `${right} of ${props.regions.length} labels right.`;
    onResult?.({ right, total: props.regions.length, results: out });
  });

  container.replaceChildren(figure, el('div', { class: 'hotspots-side' }, [list, summary, el('div', { class: 'btn-row' }, [check])]));
}

function markersOf(figure) {
  return new Map([...figure.querySelectorAll('.hotspot-marker')].map((m) => [m.dataset.region, m]));
}

export const imageHotspots = {
  // Static fallback: the picture alone with a numbered caption list.
  fallback(props) {
    if (props.svg) return props.svg;
    return `<img src="${props.src}" alt="${(props.alt || '').replace(/"/g, '&quot;')}" style="width:100%;height:auto;display:block">`;
  },

  mount(container, props) {
    const stage = el('div', { class: `hotspots${props.layout === 'stack' ? ' is-stack' : ''}` });
    let mode = 'study';
    const toggle = el('button', { type: 'button', class: 'btn btn-secondary hotspots-toggle', 'aria-pressed': 'false' }, 'Quiz me');

    function render() {
      stage.classList.toggle('is-quiz', mode === 'quiz');
      toggle.setAttribute('aria-pressed', String(mode === 'quiz'));
      toggle.textContent = mode === 'quiz' ? 'Back to labels' : 'Quiz me';
      if (mode === 'quiz') quizView(stage, props);
      else studyView(stage, props);
    }

    toggle.addEventListener('click', () => {
      mode = mode === 'quiz' ? 'study' : 'quiz';
      render();
    });

    container.replaceChildren(...[stage, props.quiz === false ? null : el('div', { class: 'widget-controls hotspots-controls' }, [toggle])].filter(Boolean));
    render();
  },
};
