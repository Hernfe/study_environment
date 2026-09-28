// The course a page belongs to, and the URLs inside it. Every course
// home and lecture shell carries <body data-course="<slug>">; the hub
// has none. Course metadata lives in src/content/courses.js.

import { courses } from '../content/courses.js';

const BASE = import.meta.env.BASE_URL || '/';

export function currentCourse() {
  return (typeof document !== 'undefined' && document.body?.dataset.course) || null;
}

export function courseInfo(slug = currentCourse()) {
  return courses.find((c) => c.slug === slug) || null;
}

export function hubHref() {
  return BASE;
}

export function courseHref(slug = currentCourse()) {
  return `${BASE}courses/${slug}/`;
}

export function lectureHref(lectureId, slug = currentCourse()) {
  return `${courseHref(slug)}lectures/${lectureId}/`;
}
