// Resolves a content `visual` ({ type, name, props, caption, fallbackAlt })
// into a <figure>. Static SVGs come from src/content/figures/index.js,
// widgets from src/js/widgets/index.js. A widget renders its static
// fallback first and only then mounts the interactive version, so a
// mount failure still leaves a picture.

import { el, fragment } from './dom.js';
import { figures } from '../content/figures/index.js';
import { widgets } from './widgets/index.js';

function svgFragment(markup) {
  return fragment(markup);
}

// Returns the inner element that holds the picture (without caption).
// Used by label questions, which overlay markers on it.
export function renderVisualBody(visual) {
  const body = el('div', { class: 'visual-body' });
  if (!visual) return body;

  if (visual.type === 'svg') {
    const markup = visual.markup || (figures[visual.name] ? figures[visual.name](visual.props || {}) : null);
    if (markup) body.appendChild(svgFragment(markup));
    else body.appendChild(el('p', { class: 'notice' }, `Figure "${visual.name}" is not registered.`));
    return body;
  }

  if (visual.type === 'widget') {
    const widget = widgets[visual.name];
    if (!widget) {
      body.appendChild(el('p', { class: 'notice' }, `Widget "${visual.name}" is not registered.`));
      return body;
    }
    const props = visual.props || {};
    if (typeof widget.fallback === 'function') {
      try {
        body.appendChild(svgFragment(widget.fallback(props)));
      } catch {
        // fall through to mount
      }
    }
    try {
      const mountPoint = el('div', { class: 'widget' });
      widget.mount(mountPoint, props);
      body.replaceChildren(mountPoint);
    } catch (error) {
      console.error(`Widget "${visual.name}" failed to mount; showing fallback.`, error);
    }
    return body;
  }

  body.appendChild(el('p', { class: 'notice' }, `Unknown visual type "${visual.type}".`));
  return body;
}

export function renderVisual(visual) {
  if (!visual) return null;
  const figure = el('figure', { class: 'figure', role: 'img', 'aria-label': visual.fallbackAlt || visual.caption || '' }, [
    renderVisualBody(visual),
  ]);
  if (visual.caption) figure.appendChild(el('figcaption', { class: 'figure-caption' }, visual.caption));
  return figure;
}

// A lecture clip: native controls (keyboard operable), a poster frame
// so the figure is a still picture until played and when JS or the
// codec fails, and optional caption tracks. See docs/CONTENT_SCHEMA.md,
// "Videos".
export function renderVideo(video) {
  if (!video) return null;
  const sources = video.sources || [{ src: video.src, type: video.type || typeFor(video.src) }];
  const player = el('video', {
    class: 'video-player',
    controls: true,
    preload: 'none',
    playsinline: true,
    poster: video.poster,
    width: video.width,
    height: video.height,
    'aria-label': video.fallbackAlt || video.caption || 'Lecture clip',
  }, [
    ...sources.map((s) => el('source', { src: s.src, type: s.type })),
    ...(video.tracks || []).map((t) => el('track', { src: t.src, kind: t.kind || 'captions', srclang: t.srclang || 'en', label: t.label || 'English', default: t.default })),
    video.poster
      ? el('img', { src: video.poster, alt: video.fallbackAlt || '' })
      : el('p', {}, video.fallbackAlt || ''),
  ]);
  const figure = el('figure', { class: 'figure figure-video' }, [el('div', { class: 'visual-body' }, [player])]);
  if (video.caption) figure.appendChild(el('figcaption', { class: 'figure-caption' }, video.caption));
  return figure;
}

function typeFor(src = '') {
  if (/\.webm(\?|$)/i.test(src)) return 'video/webm';
  if (/\.mp4(\?|$)|\.m4v(\?|$)/i.test(src)) return 'video/mp4';
  return undefined;
}
