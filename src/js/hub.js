// The hub (src/index.html): one card per course from
// src/content/courses.js, and nothing else. No cross-course review, no
// aggregated deadlines; everything else lives inside the course.

import '../styles/index.css';
import { el } from './dom.js';
import { courses } from '../content/courses.js';
import { courseHref } from './course.js';
import { courseRegistry } from './content.js';
import { renderCredits } from './render.js';

const STATUS = { active: 'Running now', upcoming: 'Upcoming', archived: 'Archived' };

function hubCard(course) {
  const registry = courseRegistry(course.slug)?.registry || [];
  const built = registry.filter((l) => l.built).length;
  const href = courseHref(course.slug);
  return el('li', {}, [
    el('article', { class: `course-card hub-card status-${course.status === 'active' ? 'built' : 'pending'}` }, [
      el('p', { class: 'code' }, course.code),
      el('p', { class: 'title' }, el('a', { href }, course.title)),
      el('p', { class: 'details' }, [
        el('span', {}, course.term),
        el('span', {}, STATUS[course.status] || course.status),
        el('span', {}, registry.length ? `${built} of ${registry.length} lectures built` : 'No lectures yet'),
      ]),
    ]),
  ]);
}

function render() {
  const root = document.getElementById('app');
  root.className = 'page';
  root.replaceChildren(
    el('div', { class: 'page-inner' }, [
      el('header', { class: 'page-header' }, [
        el('h1', {}, 'Study hub'),
        el('p', { class: 'muted' }, 'Choose a course.'),
      ]),
      el('ol', { class: 'course-map', 'aria-label': 'Courses' }, courses.map(hubCard)),
      renderCredits(),
    ])
  );
}

render();
