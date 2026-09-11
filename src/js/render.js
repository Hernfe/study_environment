// Renders one lecture content object (see docs/CONTENT_SCHEMA.md) into
// the shell. Contains no lecture-specific text.

import { el, paragraphs, formatDate, daysUntil } from './dom.js';
import { renderVisual } from './visuals.js';
import { renderConceptQuiz } from './conceptQuiz.js';
import { renderLectureQuiz } from './lectureQuiz.js';
import { storageAvailable } from './progress.js';

const BASE = import.meta.env.BASE_URL || '/';
const CREDITS_URL = 'https://github.com/Hernfe/Study_Environment/blob/main/CREDITS.md';

export function renderSiteNav(current) {
  return el('nav', { class: 'site-nav', 'aria-label': 'Site' }, [
    el('a', { href: BASE }, 'NBE-E4210 study'),
    current ? el('span', {}, current) : null,
  ]);
}

// Wrap the first occurrence of each key term in <dfn>. Works on text
// nodes only, whole words, case-insensitive, and skips terms already
// inside a <dfn>.
export function markKeyTerms(root, keyTerms = []) {
  for (const term of keyTerms) {
    if (!term) continue;
    if ([...root.querySelectorAll('dfn')].some((d) => d.textContent.trim().toLowerCase() === term.toLowerCase())) continue;
    const pattern = new RegExp(`(^|[^A-Za-z0-9])(${escapeRegExp(term)})(?=$|[^A-Za-z0-9])`, 'i');
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => (node.parentElement.closest('dfn, code, pre, a') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
    });
    let node = walker.nextNode();
    while (node) {
      const match = pattern.exec(node.nodeValue);
      if (match) {
        const start = match.index + match[1].length;
        const end = start + match[2].length;
        const after = node.splitText(end);
        const middle = node.splitText(start);
        const dfn = el('dfn', {}, middle.nodeValue);
        middle.replaceWith(dfn);
        void after;
        break;
      }
      node = walker.nextNode();
    }
  }
  return root;
}

// Small credits line at the bottom of every page. CREDITS.md lists each
// figure asset with its source and licence.
export function renderCredits() {
  return el('footer', { class: 'site-credits' }, [
    el('p', {}, [
      'Figures are drawn for this site or adapted from open sources. See ',
      el('a', { href: CREDITS_URL, rel: 'noopener' }, 'figure credits'),
      ' for sources and licences.',
    ]),
  ]);
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function renderHeader(meta) {
  const days = daysUntil(meta.examDate);
  const examText = meta.examDate
    ? `Mini-exam ${formatDate(meta.examDate)}` + (days === null ? '' : days > 0 ? ` (in ${days} days)` : days === 0 ? ' (today)' : ' (past)')
    : null;
  const pages = (meta.pages || []).map((p) => `ch ${p.chapter} pp. ${p.from}-${p.to}`).join(', ');
  return el('header', { class: 'page-header' }, [
    el('p', { class: 'kicker' }, `Lecture ${meta.number}`),
    el('h1', {}, meta.title),
    el('ul', { class: 'meta' }, [
      meta.chapters?.length ? el('li', {}, `Chapters ${meta.chapters.join(', ')}`) : null,
      pages ? el('li', {}, pages) : null,
      meta.lectureDate ? el('li', {}, `Lecture ${formatDate(meta.lectureDate)}`) : null,
      examText ? el('li', {}, examText) : null,
    ]),
  ]);
}

function renderToc(content) {
  const items = [
    ...content.sections.map((s) => ({ id: s.id, title: s.title })),
    { id: 'recap', title: 'Recap card' },
    { id: 'lecture-quiz', title: 'Lecture quiz' },
  ];
  const nav = el('nav', { class: 'toc', 'aria-label': 'Contents' }, [
    el('p', { class: 'toc-title' }, 'Contents'),
    el('ol', {}, items.map((item) => el('li', {}, el('a', { href: `#${item.id}` }, item.title)))),
  ]);
  return nav;
}

function trackCurrentSection(toc) {
  if (!('IntersectionObserver' in window)) return;
  const links = new Map([...toc.querySelectorAll('a')].map((a) => [a.getAttribute('href').slice(1), a]));
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (!visible.length) return;
      links.forEach((a) => a.classList.remove('is-current'));
      links.get(visible[0].target.id)?.classList.add('is-current');
    },
    { rootMargin: '-10% 0px -70% 0px' }
  );
  links.forEach((_, id) => {
    const target = document.getElementById(id);
    if (target) observer.observe(target);
  });
}

function renderObjectives(objectives) {
  if (!objectives?.length) return null;
  return el('section', { class: 'objectives', 'aria-labelledby': 'objectives-title' }, [
    el('h2', { id: 'objectives-title' }, 'After this lecture you should be able to'),
    el('ul', {}, objectives.map((o) => el('li', {}, o))),
  ]);
}

function renderPrerequisites(prerequisites) {
  if (!prerequisites?.length) return null;
  return el('section', { class: 'prerequisites', 'aria-labelledby': 'prereq-title' }, [
    el('h2', { id: 'prereq-title' }, 'You should already know'),
    el('ul', {}, prerequisites.map((p) => {
      const item = typeof p === 'string' ? { text: p } : p;
      if (item.lectureId) {
        const href = `${BASE}lectures/${item.lectureId}/` + (item.sectionId ? `#${item.sectionId}` : '');
        return el('li', {}, [item.text, ' ', el('a', { href }, `(${item.lectureId})`)]);
      }
      return el('li', {}, item.text);
    })),
  ]);
}

function renderSection(section, lectureId) {
  const body = el('div', { class: 'concept-body' }, paragraphs(section.body));
  markKeyTerms(body, section.keyTerms);
  return el('section', { class: 'section', id: section.id, 'aria-labelledby': `${section.id}-title` }, [
    el('h2', { id: `${section.id}-title` }, section.title),
    body,
    renderVisual(section.visual),
    renderConceptQuiz(section.conceptQuiz, { lectureId, sectionTitle: section.title }),
  ]);
}

function renderRecap(recap) {
  if (!recap) return null;
  return el('section', { class: 'recap', id: 'recap', 'aria-labelledby': 'recap-title' }, [
    el('h2', { id: 'recap-title' }, 'Recap card'),
    el('p', { class: 'muted' }, 'Key terms and equations, ready to copy onto the cheat sheet.'),
    recap.terms?.length
      ? el('dl', {}, recap.terms.flatMap((t) => [el('dt', {}, t.term), el('dd', {}, t.definition)]))
      : null,
    recap.equations?.length
      ? el('div', { class: 'equations' }, [
          el('h3', {}, 'Equations'),
          ...recap.equations.map((eq) =>
            el('div', { class: 'equation' }, [
              el('p', { class: 'name' }, eq.name),
              el('pre', {}, eq.expression),
              eq.note ? el('p', { class: 'note' }, eq.note) : null,
            ])
          ),
        ])
      : null,
  ]);
}

// Entry point. root is the element inside the shell that receives the page.
export function renderLecture(content, root) {
  const lectureId = content.meta.id;
  document.title = `L${content.meta.number} ${content.meta.title} | NBE-E4210 study`;

  const toc = renderToc(content);
  const inner = el('div', { class: 'page-inner' }, [
    renderSiteNav(`Lecture ${content.meta.number}`),
    renderHeader(content.meta),
    storageAvailable() ? null : el('p', { class: 'notice' }, 'Storage is unavailable in this browser, so quiz results will not be remembered.'),
    renderObjectives(content.objectives),
    renderPrerequisites(content.prerequisites),
    el('div', { class: 'toc-inline' }, [toc.cloneNode(true)]),
    ...content.sections.map((section) => renderSection(section, lectureId)),
    renderRecap(content.recap),
    renderLectureQuiz(content.lectureQuiz || [], { lectureId }),
    renderCredits(),
  ]);

  root.className = 'page has-toc';
  root.replaceChildren(toc, inner);
  trackCurrentSection(toc);
}

// Shown when a shell exists but its content file does not.
export function renderMissing(lectureId, root) {
  root.className = 'page';
  root.replaceChildren(
    el('div', { class: 'page-inner' }, [
      renderSiteNav(lectureId),
      el('h1', {}, `${lectureId} is not built yet`),
      el('p', {}, 'The content file for this lecture does not exist. See docs/CONTENT_SCHEMA.md for how to add one.'),
      el('p', {}, el('a', { href: BASE }, 'Back to the course map')),
    ])
  );
}
