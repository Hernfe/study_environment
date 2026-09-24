// Small DOM helpers shared by the renderer and quiz modules.

// el('button', { class: 'btn', onClick: fn, 'aria-pressed': 'false' }, ['Text', node])
export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value === null || value === undefined || value === false) continue;
    if (key === 'class') {
      node.className = value;
    } else if (key === 'html') {
      node.innerHTML = value;
    } else if (key === 'dataset') {
      Object.assign(node.dataset, value);
    } else if (key.startsWith('on') && typeof value === 'function') {
      node.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (value === true) {
      node.setAttribute(key, '');
    } else {
      node.setAttribute(key, String(value));
    }
  }
  append(node, children);
  return node;
}

export function append(parent, children) {
  const list = Array.isArray(children) ? children : [children];
  for (const child of list) {
    if (child === null || child === undefined || child === false) continue;
    if (Array.isArray(child)) {
      append(parent, child);
    } else if (typeof child === 'string' || typeof child === 'number') {
      parent.appendChild(document.createTextNode(String(child)));
    } else {
      parent.appendChild(child);
    }
  }
  return parent;
}

// Parse an HTML string into a fragment.
export function fragment(htmlString) {
  const template = document.createElement('template');
  template.innerHTML = htmlString.trim();
  return template.content;
}

export function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Content prompts and paragraphs may be plain text or HTML. Plain text
// is anything that does not start with a tag.
export function isHtml(text) {
  return typeof text === 'string' && /^\s*</.test(text);
}

export function paragraphs(body) {
  if (typeof body === 'string') return fragment(isHtml(body) ? body : `<p>${escapeHtml(body)}</p>`);
  const frag = document.createDocumentFragment();
  for (const item of body || []) {
    if (isHtml(item)) frag.appendChild(fragment(item));
    else frag.appendChild(el('p', {}, item));
  }
  return frag;
}

// Fisher-Yates, returns a new array.
export function shuffle(items) {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Stable permutation of 0..n-1 for a seed string (FNV-1a hash into a
// mulberry32 generator, then Fisher-Yates). The same seed always gives
// the same order. scripts/lint_questions.py mirrors this exactly to
// report the positions students see; change both together.
export function seededOrder(n, seed) {
  let h = 0x811c9dc5;
  for (const ch of String(seed)) {
    h ^= ch.codePointAt(0);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  let state = h;
  const random = () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const out = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// '2026-09-18' -> '18.9.2026' (Finnish short form used on the slides).
export function formatDate(iso, { year = false } = {}) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  return year ? `${d}.${m}.${y}` : `${d}.${m}.`;
}

export function daysUntil(iso, now = new Date()) {
  if (!iso) return null;
  const [y, m, d] = iso.split('-').map(Number);
  const target = new Date(y, m - 1, d);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((target - today) / 86400000);
}
