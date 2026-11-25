import { renderCodeVisualCard } from './codeVisualCard.js';
import { createOralSimulator } from './oralSimulator.js';
// Reusable topic study components. Mounted only by an opt-in course entry.
import { el, paragraphs } from './dom.js';
import { renderBlocks, renderSiteNav } from './render.js';
import { renderConceptQuiz } from './conceptQuiz.js';
import { getPracticeState, savePracticeState, storageAvailable } from './progress.js';
import { watchMath, typesetInline } from './math.js';
import { feedbackAvailability } from './rubricFeedback.js';

function aiNotice() {
  return el('aside', { class: 'notice', 'aria-label': 'AI review availability' },
    `AI review unavailable. ${feedbackAvailability.reason} Answers stay in this browser and rubric review works offline.`);
}

function storageNotice() {
  return !storageAvailable() ? el('p', { class: 'notice' }, 'Storage is unavailable. Practice still works, but drafts and attempts will not survive reload.') : null;
}

export function renderSources(refs = [], formatSource = String) {
  return el('p', { class: 'muted study-sources' }, `Sources: ${refs.map(formatSource).join('; ')}`);
}

export function renderResponse(question, { lectureId, formatSource }) {
  const key = `study:${lectureId}:${question.id}`;
  const stored = getPracticeState(key);
  const state = { text: '', criteria: {}, history: [], ...stored };
  state.history = Array.isArray(state.history) ? state.history.filter((attempt) =>
    typeof attempt?.text === 'string' && Number.isFinite(attempt.at) && Array.isArray(attempt.met)) : [];
  if (!state.criteria || typeof state.criteria !== 'object' || Array.isArray(state.criteria)) state.criteria = {};
  const inputId = `response-${lectureId}-${question.id}`;
  const text = el('textarea', { id: inputId, class: 'essay-input', rows: 5, maxlength: 12000, 'aria-describedby': `${inputId}-status` });
  text.value = typeof state.text === 'string' ? state.text : '';
  const status = el('p', { id: `${inputId}-status`, role: 'status', class: 'muted' });
  const history = el('details', { class: 'reveal study-history' }, [el('summary', {}, 'Previous saved attempts')]);
  const historyList = el('div'); history.append(historyList);
  const persist = () => {
    state.text = text.value;
    const ok = savePracticeState(key, state);
    status.textContent = ok ? 'Saved in this browser.' : 'Storage unavailable. Keep a copy of your answer before leaving.';
    return ok;
  };
  function showHistory() {
    historyList.replaceChildren(...state.history.slice().reverse().map((attempt) => el('article', { class: 'block' }, [
      el('p', {}, `${new Date(attempt.at).toLocaleString()} · ${question.rubric.filter((c) => attempt.met.includes(c.id)).length} of ${question.rubric.length} self-reported criteria.`),
      el('pre', { class: 'study-answer' }, attempt.text),
      el('ul', {}, question.rubric.filter((c) => attempt.met.includes(c.id)).map((c) => el('li', {}, c.text))),
    ])));
    if (!state.history.length) historyList.append(el('p', {}, 'No saved attempts yet.'));
  }
  const boxes = question.rubric.map((criterion) => {
    const box = el('input', { type: 'checkbox', checked: state.criteria[criterion.id] === true, 'aria-describedby': `${criterion.id}-equivalent`, onChange: () => {
      state.criteria[criterion.id] = box.checked; persist();
    } });
    return el('div', { class: 'study-criterion' }, [el('label', {}, [box, ' ', criterion.text]),
      el('p', { id: `${criterion.id}-equivalent`, class: 'muted' }, `Acceptable equivalent: ${criterion.accept}`)]);
  });
  text.addEventListener('input', () => {
    const reviewCleared = Object.values(state.criteria).includes(true);
    if (reviewCleared) {
      state.criteria = {};
      boxes.forEach((row) => { row.querySelector('input').checked = false; });
    }
    delete state.reviewedText;
    const saved = persist();
    if (reviewCleared) status.textContent += ' Checklist cleared for the revised draft.';
    if (saved && !reviewCleared) status.textContent = 'Draft saved in this browser.';
  });
  const rubric = el('details', { class: 'reveal study-rubric' }, [
    el('summary', {}, 'Optional model answer and self-review'),
    el('p', { class: 'notice' }, 'Self-assessment only. Equivalent correct wording is welcome. Sketches are compared manually, never automatically graded.'),
    el('h4', {}, 'Model answer'), paragraphs(question.modelAnswer),
    el('h4', {}, 'Criteria'), el('p', {}, 'Check each criterion your current draft meets. Editing the draft clears the checklist.'), boxes,
    el('h4', {}, 'Common pitfalls'), el('ul', {}, question.pitfalls.map((s) => el('li', {}, s))),
  ]);
  const save = el('button', { type: 'button', class: 'btn', onClick: () => {
    if (!text.value.trim()) { status.textContent = 'Write an answer before recording an attempt, or use the optional model for self-study.'; text.focus(); return; }
    const met = question.rubric.filter((c) => state.criteria[c.id] === true).map((c) => c.id);
    // Explicit actions archive snapshots; reloads and autosaves never add attempts.
    state.history.push({ at: Date.now(), text: text.value, met });
    if (persist()) status.textContent = `Attempt saved with ${met.length} of ${question.rubric.length} self-reported criteria.`;
    else status.textContent = 'Attempt kept on this page. Storage unavailable. Keep a copy before leaving.';
    showHistory();
  } }, 'Save self-review attempt');
  showHistory();
  if (state.history.length) status.textContent = `${state.history.length} saved attempt(s). You can revise your draft.`;
  return el('article', { class: 'question study-response', id: question.id }, [
    el('p', { class: 'badge' }, question.kind === 'code' ? 'Code understanding' : 'Written explanation'),
    el('h3', {}, question.title), paragraphs(question.prompt),
    question.code ? el('figure', { class: 'study-code' }, [el('figcaption', {}, question.codeContext), el('pre', { tabindex: 0 }, el('code', {}, question.code))]) : null,
    renderSources(question.sources, formatSource),
    el('label', { for: inputId }, question.kind === 'code' ? 'Your code explanation' : 'Your answer or text description of your sketch'), text, status,
    rubric, el('div', { class: 'btn-row' }, [save]), history,
  ]);
}

export function renderTopicLecture(content, root, { formatSource }) {
  root.classList.add('topic-study');
  const toc = el('nav', { 'aria-label': 'Lecture contents', class: 'study-nav' }, el('ol', {}, [
    ...content.sections.map((s) => el('li', {}, el('a', { href: `#${s.id}` }, s.title))),
    el('li', {}, el('a', { href: '#final-written' }, 'Final written practice')),
  ]));
  function practice(questions, label) {
    const responses = questions.map((question) => renderResponse(question, { lectureId: content.meta.id, formatSource }));
    if (!content.compactPractice || !responses.length) return responses;
    return el('details', { class: 'reveal' }, [el('summary', {}, label), responses]);
  }
  const sections = content.sections.map((section) => el('section', { class: 'section study-unit', id: section.id }, [
    el('h2', {}, section.title),
    el('p', { class: 'muted' }, section.priority), renderSources(section.sources, formatSource),
    el('div', { class: 'study-theory' }, renderBlocks(section.blocks)),
    renderConceptQuiz(section.conceptQuiz, { lectureId: content.meta.id, sectionTitle: section.title, bestGuess: true }),
    ...(section.codeVisualCards || []).map((card) => renderCodeVisualCard(card, { lectureId: content.meta.id, formatSource })),
    practice(section.codeUnderstanding || [], 'Optional notebook code explanations'),
  ]));
  root.replaceChildren(el('div', { class: 'page-inner' }, [
    renderSiteNav(content.meta.id), el('header', { class: 'page-header' }, [el('p', { class: 'kicker' }, `Lecture ${content.meta.number}`), el('h1', {}, content.meta.title), paragraphs(content.intro)]),
    storageNotice(),
    toc, ...sections,
    el('section', { class: 'section', id: 'final-written' }, [el('h2', {}, 'Final written practice'), el('p', {}, 'Explain your reasoning in your own words. Aim for about five minutes per prompt. You can use the optional model and checklist at any time.'),
      practice(content.finalWritten, 'Open optional written prompts'),
    ]),
    aiNotice(),
    el('footer', { class: 'site-credits' }, 'Original text and code-only learning aids. Private source files and notebook outputs are not included. Source citations identify local study material, not public downloads.'),
  ]));
  for (const section of content.sections) {
    for (const q of section.conceptQuiz) root.querySelector(`[aria-labelledby="cq-${q.id}"]`)?.append(renderSources(q.sources, formatSource));
  }
  root.querySelectorAll('.table-wrap, .math-display').forEach((node) => {
    node.tabIndex = 0;
    node.setAttribute('aria-label', 'Scrollable equation or comparison, use arrow keys if needed');
  });
  typesetInline(root);
  watchMath(root);
}

export function renderOralPractice(content, root, { formatSource }) {
  root.classList.add('topic-study');
  const legacyPractice = () => el('details', { class: 'reveal' }, [
    el('summary', {}, 'Original untimed practice and saved responses'),
    ...content.sessions.map((session) => el('details', { id: session.id, class: 'reveal study-session' }, [
      el('summary', {}, session.title),
      el('p', {}, session.scenario),
      ...session.questions.map((question) => renderResponse(question, { lectureId: content.meta.id, formatSource })),
    ])),
  ]);
  root.replaceChildren(el('div', { class: 'page-inner' }, [
    renderSiteNav(content.meta.id),
    el('header', { class: 'page-header' }, [el('h1', {}, content.meta.title),
      el('p', {}, 'Draw a dataset and problem. Prepare for 10 minutes on paper, then answer five one-point questions in a 10-minute interview. The oral exam counts for 30% of the course grade.'),
      el('p', { class: 'notice' }, 'Arrive at your scheduled time in U261 (OP room). Bring paper and pen. During real preparation, use neither notes nor screens.'),
      renderSources([{ source: 'oral', pages: '23–24' }], formatSource),
    ]),
    storageNotice(),
    createOralSimulator(content.cases, formatSource, legacyPractice),
  ]));
  typesetInline(root);
  watchMath(root);
}
