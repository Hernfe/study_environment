import '../styles/index.css';
import '../styles/topicStudy.css';
import { el } from './dom.js';
import { courseInfo, lectureHref } from './course.js';
import { courseRegistry, loadLectureContent } from './content.js';
import { renderSiteNav } from './render.js';
import { renderOralPractice, renderTopicLecture } from './studyUnits.js';
import { sourceLabel, sources } from '../content/nbe-e4070/sources.js';

const root = document.getElementById('app');
const course = courseInfo();
const { registry = [] } = courseRegistry() || {};
const lectureId = document.body.dataset.lecture;
const entry = registry.find((e) => e.id === lectureId);
function pending() {
  root.replaceChildren(el('div', { class: 'page-inner' }, [renderSiteNav(lectureId), el('h1', {}, entry?.title || 'Unknown lecture'),
    el('p', { class: 'notice' }, entry?.pending || 'Source material has been audited. This lecture is not built yet; L01 is available.'),
    el('a', { href: lectureHref('L01') }, 'Study lecture 01'),
  ]));
}
if (lectureId) {
  if (!entry?.built) pending();
  else loadLectureContent(lectureId).then((content) => {
    if (content?.learningMode === 'topic-study') renderTopicLecture(content, root, { formatSource: sourceLabel });
    else if (content?.learningMode === 'oral-practice') renderOralPractice(content, root, { formatSource: sourceLabel });
    else pending();
  }).catch((error) => { console.error(error); pending(); });
} else {
  root.replaceChildren(el('div', { class: 'page-inner' }, [renderSiteNav(),
    el('header', { class: 'page-header' }, [el('p', { class: 'kicker' }, course.code), el('h1', {}, course.title), el('p', {}, course.summary)]),
    el('p', { class: 'notice' }, 'Assessment: quizzes 20%, exercises 50%, oral exam 30%. The oral has 10 minutes of individual preparation and a 10-minute interview with five one-point questions. See the L08 simulator for practice and room instructions. Sources: L01 PDF pp. 6–8 and L08 PDF p. 23.'),
    el('h2', {}, 'Course map'),
    el('ol', { class: 'course-map' }, registry.map((e) => el('li', {}, el('article', { class: `course-card ${e.built ? 'status-built' : 'status-pending'}` }, [
      el('span', { class: 'num' }, e.id), el('p', { class: 'title' }, el('a', { href: lectureHref(e.id) }, e.title)),
      el('p', { class: 'status' }, e.description || (e.built ? 'Theory, easy MCQs, code understanding and saved written self-review.' : (e.pending || 'Module pending. Supplied source audited.'))),
    ])))),
    el('h2', {}, 'Source availability'), el('ul', {}, Object.values(sources).map((s) => el('li', {}, `${s.file}: ${s.status}`))),
    el('p', {}, 'Datasets and notebook image folders are missing. Saved notebook outputs are not newly verified results.'),
    el('p', { class: 'notice' }, 'AI review unavailable. No AI endpoint is configured. Written practice uses local drafts, model answers and self-review checklists.'),
  ]));
}
