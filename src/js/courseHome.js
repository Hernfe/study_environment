// Course home (src/courses/<slug>/index.html): course map from the
// course's registry plus the course's own review. The course comes from
// <body data-course>; its header text from src/content/courses.js.
// Contains no course-specific text.

import '../styles/index.css';
import { el, formatDate, daysUntil } from './dom.js';
import { courseInfo, currentCourse, lectureHref } from './course.js';
import { courseRegistry } from './content.js';
import { getLectureSummary, storageAvailable } from './progress.js';
import { renderReview } from './review.js';
import { renderSiteNav, renderCredits } from './render.js';

const course = courseInfo();
const { registry = [], exampleLecture = null } = courseRegistry() || {};
const lectures = import.meta.env.DEV && exampleLecture ? [...registry, exampleLecture] : registry;

function examLabel(examDate) {
  if (!examDate) return 'No mini-exam';
  const days = daysUntil(examDate);
  const when = days > 1 ? `in ${days} days` : days === 1 ? 'tomorrow' : days === 0 ? 'today' : 'past';
  return `Mini-exam ${formatDate(examDate)} (${when})`;
}

function courseCard(entry) {
  const href = lectureHref(entry.id);
  const summary = entry.built ? getLectureSummary(entry.id) : null;
  let statusText = 'Not yet built';
  if (entry.built) {
    statusText = summary && summary.answered
      ? `Built. Quiz: ${Math.round(summary.score * 100) / 100} of ${Math.round(summary.max * 100) / 100} points on ${summary.answered} answered, ${summary.missed} to review.`
      : 'Built. Not attempted yet.';
  }
  return el('li', {}, [
    el('article', { class: `course-card ${entry.built ? 'status-built' : 'status-pending'}` }, [
      el('span', { class: 'num', 'aria-label': `Lecture ${entry.number}` }, `L${entry.number}`),
      el('p', { class: 'title' }, entry.built ? el('a', { href }, entry.title) : entry.title),
      el('p', { class: 'details' }, [
        entry.chapters?.length ? el('span', {}, `Chapters ${entry.chapters.join(', ')}`) : null,
        entry.lectureDate ? el('span', {}, `Lecture ${formatDate(entry.lectureDate)}`) : null,
        el('span', {}, examLabel(entry.examDate)),
      ]),
      el('p', { class: 'status' }, statusText),
    ]),
  ]);
}

function nextExam() {
  const upcoming = registry
    .filter((e) => e.examDate && daysUntil(e.examDate) >= 0)
    .sort((a, b) => a.examDate.localeCompare(b.examDate))[0];
  if (!upcoming) return null;
  return el('p', { class: 'notice' }, `Next mini-exam: ${formatDate(upcoming.examDate)} on lecture ${upcoming.number}, ${upcoming.title}.`);
}

function render() {
  const root = document.getElementById('app');
  if (!course) {
    root.replaceChildren(el('div', { class: 'page-inner' }, [renderSiteNav(), el('p', { class: 'notice' }, `Unknown course "${currentCourse()}". Add it to src/content/courses.js.`)]));
    return;
  }
  const review = el('section', { class: 'review', id: 'review', 'aria-labelledby': 'review-title' });
  renderReview(review, lectures);

  root.className = 'page';
  root.replaceChildren(
    el('div', { class: 'page-inner' }, [
      renderSiteNav(),
      el('header', { class: 'page-header' }, [
        el('p', { class: 'kicker' }, `${course.code}, ${course.term.toLowerCase()}`),
        el('h1', {}, course.title),
        course.summary ? el('p', { class: 'muted' }, course.summary) : null,
      ]),
      storageAvailable() ? null : el('p', { class: 'notice' }, 'Storage is unavailable in this browser, so quiz results will not be remembered.'),
      nextExam(),
      el('h2', { id: 'course-map-title' }, 'Course map'),
      el('ol', { class: 'course-map', 'aria-labelledby': 'course-map-title' }, lectures.map(courseCard)),
      review,
      renderCredits(),
    ])
  );
}

render();
