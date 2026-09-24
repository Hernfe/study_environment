// Image with hotspot regions. Each region has a small anchor dot on the
// structure, a 1 px leader and a numbered badge in a gutter outside the
// picture, so the badge never covers what it labels. Hover, tap or arrow
// through the badges to read about each region; a list beside the image
// (below it on narrow screens) offers the same regions as buttons. Quiz
// mode hides the labels and asks the learner to assign them.
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
//     mx, my,                                 // optional anchor point (default: centre or line start)
//     side: 'left' | 'right' | 'top' | 'bottom' | 'inline',
//                                             // which gutter takes the badge (default: the
//                                             // nearest); 'inline' keeps the badge on the
//                                             // picture, its edge touching the anchor
//     bx, by,                                 // inline only: badge centre in %, for a picture
//                                             // with clear space near the anchor
//     dir: 'up-right',                        // inline only: side of the anchor the badge sits on
//   }],
//   gutter: 'sides' | 'ends' | 'all' | 'auto', // left/right gutters, top/bottom, all four,
//                                             // or auto: ends for strips wider than 2.2:1
//   quiz: true,                               // offer quiz mode (default true)
//   layout: 'side' | 'stack',                 // list beside (default) or below the picture
//   showShapes: false,                        // draw every region outline at rest (planes, bands)
//   intro: 'Hover or tap a marker ...',
//   labelPool: ['Extra distractor label'],    // optional extra labels for quiz mode
// }

import { el } from '../dom.js';
import { renderBank, linkPickers } from '../wordBank.js';

let counter = 0;

const BADGE = 18;        // badge diameter in the gutter, px
const BADGE_NARROW = 16; // inline badge diameter, px
const DOT = 5;           // anchor dot diameter, px
const GAP = 4;           // minimum space between neighbouring badges, px

function anchorPos(region) {
  if (region.mx !== undefined) return [region.mx, region.my];
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

const DIRS = {
  up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0],
  'up-left': [-0.7071, -0.7071], 'up-right': [0.7071, -0.7071],
  'down-left': [-0.7071, 0.7071], 'down-right': [0.7071, 0.7071],
};

function usesEnds(aspect, gutter) {
  return gutter === 'ends' || (gutter !== 'sides' && aspect > 2.2);
}

// Which gutter a region's badge goes to when the content does not say.
function autoSide(region, aspect, gutter) {
  const [ax, ay] = anchorPos(region);
  if (usesEnds(aspect, gutter)) return ay <= 50 ? 'top' : 'bottom';
  return ax <= 50 ? 'left' : 'right';
}

// Spread badge centres along one gutter so none overlap, staying inside
// [min, max]. Values are px along the gutter axis.
function spread(items, min, max, size) {
  items.sort((a, b) => a.want - b.want);
  const step = size + GAP;
  let pos = items.map((it) => it.want);
  for (let i = 1; i < pos.length; i += 1) pos[i] = Math.max(pos[i], pos[i - 1] + step);
  const over = pos.length ? pos[pos.length - 1] - max : 0;
  if (over > 0) {
    pos = pos.map((p) => p - over);
    for (let i = pos.length - 2; i >= 0; i -= 1) pos[i] = Math.min(pos[i], pos[i + 1] - step);
  }
  const under = pos.length ? min - pos[0] : 0;
  if (under > 0) pos = pos.map((p) => p + under);
  items.forEach((it, i) => { it.pos = pos[i]; });
}

// The picture plus overlay. Returns { figure, markers, setState } where
// figure is the stage (picture plus gutters) and
// setState(id, 'active' | 'correct' | 'incorrect' | null) restyles one region.
export function buildFigure(props, { numbered = true, onEnter, onLeave, onPick, onKey } = {}) {
  const uid = `hs${(counter += 1)}`;
  const aspect = props.aspect || 1;
  const gutter = props.gutter || 'auto';
  const gutterClass = gutter === 'all' ? 'gutter-all' : usesEnds(aspect, gutter) ? 'gutter-ends' : 'gutter-sides';
  // Tall pictures are capped at 28rem high; the width follows so the
  // percentage overlay stays aligned. The stage adds the gutters.
  const stage = el('div', { class: `hotspots-stage ${gutterClass}${props.svg ? ' is-svg' : ''}`, style: `max-width: calc(28rem * ${aspect} + 2 * var(--gx))` });
  const figure = el('div', { class: 'hotspots-figure', style: `aspect-ratio: ${aspect}` });
  if (props.svg) {
    figure.classList.add('is-svg');
    figure.innerHTML = props.svg;
  } else {
    figure.appendChild(el('img', { src: props.src, alt: props.alt || '', loading: 'lazy', decoding: 'async' }));
  }
  const overlay = svgEl('svg', { class: `hotspots-overlay${props.showShapes ? ' is-shown' : ''}`, viewBox: '0 0 100 100', preserveAspectRatio: 'none', 'aria-hidden': 'true' });
  for (const region of props.regions) overlay.appendChild(shapeNode(region));
  figure.appendChild(overlay);

  const anchors = new Map();
  for (const region of props.regions) {
    const [ax, ay] = anchorPos(region);
    const anchor = el('span', { class: 'hotspot-anchor', 'data-region': region.id, style: `left:${ax}%; top:${ay}%`, 'aria-hidden': 'true' });
    anchors.set(region.id, anchor);
    figure.appendChild(anchor);
  }

  const leaders = svgEl('svg', { class: 'hotspots-leaders', 'aria-hidden': 'true' });
  const leaderOf = new Map();
  for (const region of props.regions) {
    const line = svgEl('line', { class: 'hotspot-leader', 'data-region': region.id });
    leaderOf.set(region.id, line);
    leaders.appendChild(line);
  }

  const markers = new Map();
  props.regions.forEach((region, i) => {
    const marker = el('button', {
      type: 'button',
      class: 'hotspot-marker',
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
  });

  stage.append(figure, leaders, ...markers.values());

  // Place badges and leaders in px. Runs whenever the stage is resized.
  function layout() {
    const sr = stage.getBoundingClientRect();
    const fr = figure.getBoundingClientRect();
    if (!sr.width || !fr.width) return;
    const fx = fr.left - sr.left;
    const fy = fr.top - sr.top;
    const cs = getComputedStyle(stage);
    const wide = parseFloat(cs.paddingLeft) > 0 || parseFloat(cs.paddingTop) > 0;
    stage.classList.toggle('is-inline', !wide);
    leaders.setAttribute('viewBox', `0 0 ${sr.width} ${sr.height}`);
    leaders.setAttribute('width', String(sr.width));
    leaders.setAttribute('height', String(sr.height));

    const size = wide ? BADGE : BADGE_NARROW;
    const r = size / 2;
    const touch = r + DOT / 2 + 1; // badge centre to anchor when the edge touches the dot
    const groups = { left: [], right: [], top: [], bottom: [] };
    const placed = [];

    for (const region of props.regions) {
      const [apx, apy] = anchorPos(region);
      const ax = fx + (apx / 100) * fr.width;
      const ay = fy + (apy / 100) * fr.height;
      let side = region.side || autoSide(region, aspect, gutter);
      const item = { region, ax, ay, bx: ax, by: ay, leader: true };
      if (side === 'inline' && region.bx !== undefined) {
        item.bx = fx + (region.bx / 100) * fr.width;
        item.by = fy + (region.by / 100) * fr.height;
        item.leader = false;
      } else if (side === 'inline' || !wide) {
        // Inline, or the gutter has collapsed: the badge sits on the
        // picture with its edge touching the anchor dot, never on it.
        const dirName = side === 'inline' ? region.dir || 'up-right' : { left: 'left', right: 'right', top: 'up', bottom: 'down' }[side];
        const [dx, dy] = DIRS[dirName];
        item.bx = ax + dx * touch;
        item.by = ay + dy * touch;
        item.leader = false;
        side = 'inline';
      }
      if (side === 'inline') {
        item.dx = item.bx - ax;
        item.dy = item.by - ay;
        placed.push(item);
      } else {
        item.want = side === 'left' || side === 'right' ? ay : ax;
        groups[side].push(item);
      }
    }

    for (const side of ['left', 'right']) {
      const g = groups[side];
      spread(g, fy + r, fy + fr.height - r, size);
      const cx = side === 'left' ? fx / 2 : fx + fr.width + (sr.width - fx - fr.width) / 2;
      for (const it of g) { it.bx = cx; it.by = it.pos; placed.push(it); }
    }
    for (const side of ['top', 'bottom']) {
      const g = groups[side];
      spread(g, fx + r, fx + fr.width - r, size);
      const cy = side === 'top' ? fy / 2 : fy + fr.height + (sr.height - fy - fr.height) / 2;
      for (const it of g) { it.bx = it.pos; it.by = cy; placed.push(it); }
    }

    // Inline badges: push overlapping neighbours further out along their
    // own offset direction, then keep every badge inside the picture.
    const inline = placed.filter((it) => !it.leader);
    for (let pass = 0; pass < 4; pass += 1) {
      for (let i = 0; i < inline.length; i += 1) {
        for (let j = i + 1; j < inline.length; j += 1) {
          const a = inline[i];
          const b = inline[j];
          const d = Math.hypot(a.bx - b.bx, a.by - b.by);
          const need = size + 2 - d;
          if (need <= 0) continue;
          const len = Math.hypot(b.dx, b.dy) || 1;
          b.bx += (b.dx / len) * need;
          b.by += (b.dy / len) * need;
        }
      }
    }
    for (const it of inline) {
      it.bx = Math.min(Math.max(it.bx, fx + r), fx + fr.width - r);
      it.by = Math.min(Math.max(it.by, fy + r), fy + fr.height - r);
    }

    for (const it of placed) {
      const marker = markers.get(it.region.id);
      marker.style.left = `${it.bx}px`;
      marker.style.top = `${it.by}px`;
      marker.classList.toggle('is-inline', !it.leader);
      const line = leaderOf.get(it.region.id);
      if (it.leader) {
        // The leader runs from the anchor to the badge edge.
        const dx = it.bx - it.ax;
        const dy = it.by - it.ay;
        const len = Math.hypot(dx, dy) || 1;
        line.setAttribute('x1', it.ax.toFixed(1));
        line.setAttribute('y1', it.ay.toFixed(1));
        line.setAttribute('x2', (it.bx - (dx / len) * (r + 1)).toFixed(1));
        line.setAttribute('y2', (it.by - (dy / len) * (r + 1)).toFixed(1));
        line.style.display = '';
      } else {
        line.style.display = 'none';
      }
    }
  }

  // Observe the border box, not the content box: the stage's max-width is
  // calc(28rem * aspect + 2 * var(--gx)), so for a picture tall enough to hit
  // the 28rem cap the content box is the same width with and without gutters.
  // A content-box observer never fires when the gutters collapse at 48rem, and
  // the badges keep the wide-screen gutter positions, which on a tall figure
  // land outside the page. The window listener covers the same media-query
  // flip when the observed box happens not to change at all.
  if ('ResizeObserver' in window) {
    new ResizeObserver(() => layout()).observe(stage, { box: 'border-box' });
  }
  window.addEventListener('resize', layout);
  queueMicrotask(layout);

  function setState(id, state) {
    const nodes = [markers.get(id), overlay.querySelector(`[data-region="${id}"]`), anchors.get(id), leaderOf.get(id)];
    for (const node of nodes) {
      if (!node) continue;
      node.classList.remove('is-active', 'is-correct', 'is-incorrect');
      if (state) node.classList.add(`is-${state}`);
    }
    stage.classList.toggle('has-active', Boolean(stage.querySelector('.hotspot-marker.is-active')));
  }

  return { figure: stage, markers, setState, uid, layout };
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
// wordBank (optional, from normaliseBank): the closed list the student
// picks from, shown beside the figure; once-only entries are enforced.
export function quizView(container, props, { onResult, checkLabel = 'Check labels', wordBank = null } = {}) {
  const { figure, setState } = buildFigure(props, {
    onEnter: (id) => setState(id, results.has(id) ? (results.get(id) ? 'correct' : 'incorrect') : 'active'),
    onLeave: (id) => setState(id, results.has(id) ? (results.get(id) ? 'correct' : 'incorrect') : null),
    onKey: (event, i) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') { event.preventDefault(); rove(markersOf(figure), i, 1, event); }
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') { event.preventDefault(); rove(markersOf(figure), i, -1, event); }
    },
  });
  const results = new Map();
  const pool = wordBank
    ? wordBank.map((e) => e.text)
    : shuffle([...new Set([...props.regions.map((r) => r.label), ...(props.labelPool || [])])]);
  const bankNode = wordBank ? renderBank(wordBank) : null;
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

  container.replaceChildren(figure, el('div', { class: 'hotspots-side' }, [bankNode, list, summary, el('div', { class: 'btn-row' }, [check])]));
  if (wordBank) linkPickers(selects, wordBank, bankNode);
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
