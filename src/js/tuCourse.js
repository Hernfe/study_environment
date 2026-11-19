import '../styles/index.css';
import { el } from './dom.js';
import { typesetInline } from './math.js';
import { courseHref, courseInfo, lectureHref } from './course.js';
import { loadLectureContent } from './content.js';
import { createMcBody } from './conceptQuiz.js';
import { getPracticeState, savePracticeState, storageAvailable } from './progress.js';
import { renderSiteNav } from './render.js';
import { quizContract, registry } from '../content/tu-e4350/registry.js';

import { mocks, diagnostic } from '../content/tu-e4350/assessments.js';

const app = document.getElementById('app');
const lectureId = document.body.dataset.lecture;
const builtWeeks = registry.filter((week) => week.built);
const memory = new Map();

function resultKey(id, question) {
  return `required:${id}:${question.id}`;
}

function checkedChoice(id, question) {
  const key = resultKey(id, question);
  const index = memory.get(key) ?? getPracticeState(key).checkedChoice;
  return Number.isInteger(index) && index >= 0 && index < question.options.length ? index : null;
}

function progress(content) {
  const { meta, lectureQuiz } = content;
  const choices = lectureQuiz.map((question) => checkedChoice(meta.id, question));
  return {
    total: lectureQuiz.length,
    checked: choices.filter((index) => index !== null).length,
    right: choices.filter((index, i) => index === lectureQuiz[i].correct).length,
  };
}

function source(number, pages) {
  const prefix = /^\d+$/.test(pages) ? 'p.' : 'pp.';
  return el('p', { class: 'muted' }, `Week ${number} PDF, ${prefix} ${pages}`);
}

function storageNotice() {
  const notice = el('p', { class: 'notice', role: 'status', hidden: storageAvailable() },
    'Browser storage is unavailable. Practice works on this page, and checked answers may be lost when you leave.');
  return notice;
}

async function renderHome() {
  const contents = await Promise.all(builtWeeks.map((week) => loadLectureContent(week.id)));
  const summaries = new Map(contents.map((content) => [content.meta.id, progress(content)]));
  const complete = [...summaries.values()].filter(({ checked, total }) => checked === total).length;
  const next = builtWeeks.find(({ id }) => {
    const { checked, total } = summaries.get(id);
    return checked < total;
  });
  const course = courseInfo();
  return [
    renderSiteNav(),
    el('header', { class: 'page-header' }, [
      el('p', { class: 'kicker' }, course.code),
      el('h1', {}, course.title),
      el('p', {}, course.summary),
    ]),
    storageNotice(),
    el('section', { class: 'block', 'aria-labelledby': 'study-flow' }, [
      el('h2', { id: 'study-flow' }, 'Study by week'),
      el('p', {}, 'Read Must know, check the required questions, then move to the next week. Open Brief context when you want more detail. Plan for 3–5 minutes of reading and 8–12 minutes total per week.'),
      el('p', {}, `${complete} of ${builtWeeks.length} available weeks practised. Progress is based on checked answers.`),
      next
        ? el('a', { class: 'btn btn-primary', href: lectureHref(next.id) }, `${complete || summaries.get(next.id).checked ? 'Continue' : 'Start'} Week ${next.number}`)
        : el('a', { class: 'btn', href: '#week-map' }, 'Revisit weeks'),
    ]),
    el('section', { class: 'block', 'aria-labelledby': 'quiz-contract' }, [
      el('h2', { id: 'quiz-contract' }, 'Final course quiz'),
      el('ul', {}, quizContract.sittings.map((sitting) => el('li', {}, sitting))),
      el('p', {}, quizContract.conditions),
      el('p', {}, quizContract.format),
      el('p', {}, quizContract.scope),
      el('p', { class: 'muted' }, quizContract.source),
    ]),
    el('section', { class: 'block', 'aria-labelledby': 'practice-quizzes' }, [
      el('h2', { id: 'practice-quizzes' }, 'Practice quizzes'),
      el('p', {}, 'Three 45-minute mocks for Weeks 1–10 in the provisional quiz format. Week 11 source slides are unavailable for both sittings. Week 12 source slides are also unavailable for the alternate sitting.'),
      el('ul', {}, mocks.map((mock, index) => el('li', {}, el('a', {
        href: `${courseHref()}practice/?form=${mock.id}`,
      }, `Mock ${index + 1} · ${mock.title}`)))),
      el('details', { class: 'block-detail' }, [
        el('summary', {}, 'Optional quick diagnostic'),
        el('p', {}, el('a', { href: `${courseHref()}practice/?form=${diagnostic.id}` }, 'Start 16-question diagnostic')),
      ]),
    ]),
    el('section', { 'aria-labelledby': 'week-map' }, [
      el('h2', { id: 'week-map' }, 'Week map'),
      el('p', { class: 'muted' }, 'Weeks 1–6 use the supplied teaching slides and learning outcomes for provisional review. Weeks 7–10 follow the designated Exam essentials.'),
      el('ol', { class: 'course-map' }, registry.map((week) => {
        const status = summaries.get(week.id);
        const title = status ? el('a', { href: lectureHref(week.id) }, week.title) : week.title;
        return el('li', {}, el('article', { class: `course-card hub-card status-${week.built ? 'built' : 'pending'}` }, [
          el('p', { class: 'code' }, `Week ${week.number}`),
          el('p', { class: 'title' }, title),
          el('p', { class: 'details' }, status
            ? `${status.checked} of ${status.total} checked · ${status.right} correct`
            : week.sourceAvailable ? 'Slides audited · Lesson pending' : 'Source slides unavailable'),
        ]));
      })),
    ]),
  ];
}

function readingCard(number, { title, pages, paragraphs }) {
  return typesetInline(el('article', { class: 'block' }, [
    el('h3', {}, title),
    paragraphs.map((paragraph) => el('p', {}, paragraph)),
    source(number, pages),
  ]));
}

function renderWeek(content) {
  const { meta, cards, recap, context, lectureQuiz } = content;
  const notice = storageNotice();
  const score = el('p', { role: 'status' });
  const update = () => {
    const { total, checked, right } = progress(content);
    score.textContent = `${checked} of ${total} checked · ${right} correct`;
  };
  update();

  const questions = lectureQuiz.map((question, index) => {
    let restoring = true;
    const body = createMcBody(question, {
      allowRetry: true,
      showAllFeedback: true,
      seed: `${meta.id}:${question.id}`,
      onCheck: ({ index: choice }) => {
        if (restoring) return;
        const key = resultKey(meta.id, question);
        memory.set(key, choice);
        if (!savePracticeState(key, { checkedChoice: choice })) notice.hidden = false;
        update();
      },
    });
    body.restore(checkedChoice(meta.id, question));
    restoring = false;
    return el('article', { class: 'question', 'aria-labelledby': question.id }, [
      el('div', { class: 'question-head' }, [
        el('span', { class: `badge badge-${question.difficulty}` }, question.difficulty),
        el('span', {}, `Question ${index + 1} of ${lectureQuiz.length}`),
      ]),
      el('h3', { id: question.id, class: 'question-prompt' }, question.prompt),
      body.root,
      source(meta.number, question.pages),
    ]);
  });

  const previous = builtWeeks.findLast((week) => week.number < meta.number);
  const next = builtWeeks.find((week) => week.number > meta.number);
  return [
    renderSiteNav(`Week ${meta.number}`),
    el('header', { class: 'page-header' }, [
      el('p', { class: 'kicker' }, `Week ${meta.number}`),
      el('h1', {}, meta.title),
      el('p', { class: 'muted' }, 'Estimated 3–5 min reading · 8–12 min with required practice'),
      el('nav', { class: 'btn-row', 'aria-label': 'Week sections' }, [
        el('a', { href: '#must-know' }, 'Must know'),
        el('a', { href: '#required' }, 'Required practice'),
        el('a', { href: '#brief-context', onClick: () => {
          document.getElementById('brief-context').open = true;
        } }, 'Brief context'),
      ]),
    ]),
    notice,
    el('section', { 'aria-labelledby': 'must-know' }, [
      el('h2', { id: 'must-know' }, 'Must know'),
      el('p', { class: 'muted' }, meta.number >= 7
        ? 'Based on the designated Exam essentials.'
        : 'Provisional review priorities from the supplied teaching slides.'),
      cards.map((card) => readingCard(meta.number, card)),
      readingCard(meta.number, recap),
    ]),
    el('section', { 'aria-labelledby': 'required' }, [
      el('h2', { id: 'required' }, 'Required practice'),
      el('p', {}, 'Choose one answer per question and select Check to see the explanation. Progress counts checked questions. You can retry at any time.'),
      score,
      questions,
    ]),
    el('details', { id: 'brief-context', class: 'block block-detail' }, [
      el('summary', {}, 'Brief context · Optional'),
      readingCard(meta.number, context),
    ]),
    el('nav', { class: 'btn-row', 'aria-label': 'Weeks' }, [
      previous ? el('a', { class: 'btn', href: lectureHref(previous.id) }, `Previous · Week ${previous.number}`) : null,
      next ? el('a', { class: 'btn btn-primary', href: lectureHref(next.id) }, `Next · Week ${next.number}`) : el('a', { class: 'btn btn-primary', href: courseHref() }, 'Back to week map'),
    ]),
  ];
}

async function render() {
  const content = lectureId ? await loadLectureContent(lectureId) : null;
  app.replaceChildren(el('div', { class: 'page-inner' }, content ? renderWeek(content) : await renderHome()));
}

render();
