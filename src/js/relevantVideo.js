import { el } from './dom.js';

export function renderRelevantVideo({ videoId, title, topic, channel }) {
  if (!/^[\w-]{11}$/.test(videoId || '')) return null;

  const player = el('div');
  const watch = el('button', {
    type: 'button',
    class: 'btn',
    'aria-expanded': 'false',
    onClick: () => {
      const open = watch.getAttribute('aria-expanded') === 'true';
      watch.setAttribute('aria-expanded', String(!open));
      watch.textContent = open ? 'Watch clip' : 'Hide clip';
      if (open) {
        player.replaceChildren();
      } else {
        player.append(el('iframe', {
          src: `https://www.youtube-nocookie.com/embed/${videoId}`,
          title: `${title} · ${channel}`,
          loading: 'lazy',
          referrerpolicy: 'strict-origin-when-cross-origin',
          allowfullscreen: true,
        }));
      }
    },
  }, 'Watch clip');
  return el('aside', { class: 'block relevant-video', 'aria-label': `Optional video: ${title}` }, [
    el('p', { class: 'block-title' }, title),
    el('p', {}, topic),
    el('p', { class: 'muted' }, `${channel} · Optional video`),
    watch,
    el('p', {}, el('a', {
      href: `https://www.youtube.com/watch?v=${videoId}`,
      target: '_blank',
      rel: 'noopener noreferrer',
    }, 'Open on YouTube')),
    player,
  ]);
}
