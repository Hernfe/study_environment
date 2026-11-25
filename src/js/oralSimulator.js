import { sources } from '../content/nbe-e4070/sources.js';
import { lectureHref } from './course.js';
import { el } from './dom.js';
import { getPracticeState, savePracticeState } from './progress.js';
import { questionLabels } from '../content/nbe-e4070/oralCases.js';

const duration = 10 * 60 * 1000;
const storageKey = 'oral:L08:v2';
const marks = ['0', '0.5', '1'];
const criteria = [
  'Explain the relevant operation, axes or return values and their role in the task.',
  'Choose and justify a method that fits the dataset and goal. Credit defensible alternatives.',
  'Give a short definition, input and output shapes, a labelled sketch and a limitation.',
  'Identify the issue and explain why your remedy or diagnostic addresses it.',
  'Read the output accurately and explain a relevant uncertainty, error or limit.',
];

export function createOralSimulator(cases, formatSource, legacyPractice) {
  const stored = getPracticeState(storageKey);
  const state = { active: stored.active, history: stored.history };
  state.history = Array.isArray(state.history) ? state.history : [];
  const caseById = (id) => cases.find((item) => item.id === id);
  const validAttempt = (attempt) => caseById(attempt?.caseId) &&
    Number.isFinite(attempt.deadline) && ['prep', 'interview', 'review'].includes(attempt.phase) &&
    Array.isArray(attempt.notes) && Array.isArray(attempt.marks);
  if (!validAttempt(state.active)) state.active = null;
  state.history = state.history.filter(validAttempt);
  let selection = state.active?.caseId || '';
  let ticker;
  const panel = el('div');
  const status = el('p', { role: 'status', class: 'muted' });
  const root = el('div', { class: 'oral-simulator' }, [panel, status]);
  const button = (label, onClick) => el('button', { type: 'button', class: 'btn', onClick }, label);

  function persist() {
    const saved = savePracticeState(storageKey, state);
    status.textContent = saved ? 'Saved in this browser.' : 'Storage unavailable. This session is kept on this page until you leave.';
    return saved;
  }

  function show(moveFocus = false) {
    clearInterval(ticker);
    const attempt = state.active;
    if (!attempt) panel.replaceChildren(renderPicker());
    else {
      const item = caseById(attempt.caseId);
      const heading = el('h2', { tabindex: -1 }, item.title);
      panel.replaceChildren(heading, el('p', {}, item.scenario));
      if (attempt.phase === 'prep') renderPrep(attempt);
      if (attempt.phase === 'interview') renderInterview(attempt, item);
      if (attempt.phase === 'review') renderReview(attempt, item);
    }
    if (moveFocus) (panel.querySelector('[data-current-question]') || panel.querySelector('h2')).focus();
  }

  function begin(caseId) {
    selection = caseId;
    state.active = { caseId, phase: 'prep', deadline: Date.now() + duration, notes: [], marks: [], questionIndex: 0 };
    persist();
    show(true);
  }

  function renderPicker() {
    const picker = el('select', { id: 'oral-case' }, [
      el('option', { value: '' }, 'Random case'),
      ...cases.map((item) => el('option', { value: item.id, selected: selection === item.id }, item.title)),
    ]);
    return el('div', {}, [
      el('h2', { tabindex: -1 }, 'Choose a case'),
      el('label', { for: 'oral-case' }, 'Dataset case '), picker,
      el('div', { class: 'btn-row' }, button('Start paper preparation', () =>
        begin(picker.value || cases[Math.floor(Math.random() * cases.length)].id))),
      el('details', { class: 'reveal' }, [
        el('summary', {}, 'Explain any method in 60 seconds'),
        el('ol', {}, [
          el('li', {}, 'Define the method in one or two sentences.'),
          el('li', {}, 'Name input and output shapes and what each axis represents.'),
          el('li', {}, 'Sketch the data or output and label the axes.'),
          el('li', {}, 'State a limitation and explain what a failed result would mean.'),
        ]),
        el('p', {}, 'Equations are optional. Based on the L08 recap, PDF p. 24.'),
      ]),
      el('h2', {}, 'Attempt history'),
      state.history.length ? el('ol', {}, state.history.slice().reverse().map((attempt) =>
        el('li', {}, button(`${caseById(attempt.caseId).title} · ${new Date(attempt.submittedAt).toLocaleString()} · ${score(attempt)} / 5`, () => {
          state.active = attempt;
          persist();
          show(true);
        })))) : el('p', {}, 'No timed attempts yet.'),
      legacyPractice(),
    ]);
  }

  function renderTimer(attempt, label, expired, onExpiry) {
    const timer = el('p', { role: 'timer', class: 'oral-timer' });
    const expiry = el('p', { role: 'status' });
    panel.append(timer, expiry);
    const tick = () => {
      const seconds = Math.max(0, Math.ceil((attempt.deadline - Date.now()) / 1000));
      const display = `${label} · ${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
      if (timer.textContent !== display) timer.textContent = display;
      if (!seconds) {
        expiry.textContent = expired;
        onExpiry?.();
        clearInterval(ticker);
      }
    };
    ticker = setInterval(tick, 250);
    tick();
  }

  function renderPrep(attempt) {
    panel.append(el('p', {}, 'Prepare on paper. In the real room, use paper and pen without notes or screens.'));
    renderTimer(attempt, 'Preparation', 'Preparation time is up. Start the interview when ready.');
    panel.append(button('Start interview', () => {
      attempt.phase = 'interview';
      attempt.deadline = Date.now() + duration;
      persist();
      show(true);
    }));
  }

  function renderCode(item) {
    return el('figure', { class: 'study-code' }, [
      el('figcaption', {}, [formatSource(item.codeSource), item.codeContext ? ` · ${item.codeContext}` : ' · Notebook excerpt']),
      el('pre', { tabindex: 0 }, el('code', {}, item.code)),
    ]);
  }

  function renderInterview(attempt, item) {
    panel.append(el('p', {}, 'Answer aloud and sketch on paper. Typed notes are optional.'));
    const question = el('article', { class: 'question oral-question' });
    renderTimer(attempt, 'Interview', 'Interview time is up. Submit when ready to review.', () => {
      const notes = question.querySelector('textarea');
      if (notes) notes.readOnly = true;
    });
    panel.append(question);
    const showQuestion = (focus = false) => {
      const index = attempt.questionIndex ?? 0;
      const heading = el('h3', { tabindex: -1, 'data-current-question': '' },
        `${index + 1} of 5 · ${questionLabels[index]} · 1 point`);
      const notes = el('textarea', { id: 'oral-notes', class: 'essay-input', rows: 4, maxlength: 12000 });
      notes.value = attempt.notes[index] || '';
      notes.readOnly = Date.now() >= attempt.deadline;
      notes.addEventListener('input', () => {
        if (Date.now() >= attempt.deadline) {
          notes.value = attempt.notes[index] || '';
          notes.readOnly = true;
          return;
        }
        attempt.notes[index] = notes.value;
        persist();
      });
      const navigate = (step) => { attempt.questionIndex = index + step; persist(); showQuestion(true); };
      const submit = button('Submit interview', () => {
        attempt.phase = 'review';
        attempt.submittedAt = Date.now();
        state.history.push(attempt);
        persist();
        show(true);
      });
      question.replaceChildren(...[heading, el('p', {}, item.prompts[index]),
        index === 0 ? renderCode(item) : null,
        index === 4 ? renderOutput(item.output) : null,
        el('label', { for: notes.id }, 'Optional notes'), notes,
        el('div', { class: 'btn-row' }, [
          index > 0 ? button('Previous question', () => navigate(-1)) : null,
          index < 4 ? button('Next question', () => navigate(1)) : null,
          submit,
        ]),
      ].filter(Boolean));
      if (focus) heading.focus();
    };
    showQuestion();
  }

  function renderOutput(output) {
    return el('div', { class: 'oral-output', tabindex: 0, 'aria-label': 'Illustrative output table' },
      el('table', {}, [
        el('caption', {}, 'Illustrative output'),
        el('thead', {}, el('tr', {}, output.columns.map((column) => el('th', { scope: 'col' }, column)))),
        el('tbody', {}, output.rows.map((row) => el('tr', {}, row.map((value) => el('td', {}, value))))),
      ]));
  }

  function score(attempt) {
    return criteria.reduce((total, _, index) => total + (marks.includes(attempt.marks[index]) ? Number(attempt.marks[index]) : 0), 0);
  }

  function renderReview(attempt, item) {
    const total = el('p', { role: 'status' });
    const updateTotal = () => { total.textContent = `Self-score · ${score(attempt)} / 5`; };
    updateTotal();
    panel.append(el('h3', {}, 'Review and self-score'),
      el('p', {}, 'Use 0 for missing or incorrect, 0.5 for a sound but incomplete response, and 1 for meeting the criterion.'),
      total,
      ...questionLabels.map((label, index) => {
        const mark = el('select', { id: `oral-mark-${index}` }, marks.map((value) =>
          el('option', { value, selected: (attempt.marks[index] || '0') === value }, value)));
        mark.addEventListener('change', () => {
          attempt.marks[index] = mark.value;
          persist();
          updateTotal();
        });
        return el('article', { class: 'question oral-rubric' }, [
          el('h4', {}, `${index + 1}. ${label} · 1 point`),
          el('p', {}, item.prompts[index]),
          index === 0 ? renderCode(item) : null,
          index === 4 ? renderOutput(item.output) : null,
          attempt.notes[index] ? el('pre', { class: 'study-answer' }, attempt.notes[index]) : null,
          el('p', {}, criteria[index]),
          el('p', {}, item.rubricFocus[index]),
          el('p', {}, `Model answer. ${item.answers[index]}`),
          el('label', { for: mark.id }, `Points for ${label.toLowerCase()} `), mark,
        ]);
      }),
      el('h4', {}, 'Sources and related study pages'),
      el('ul', { class: 'study-sources' }, [item.codeSource, ...item.sources].map((ref) => {
        const { studyLecture, studySection } = sources[ref.source];
        return el('li', {}, [
          formatSource(ref), studyLecture === 'L08' ? null : ' · ',
          studyLecture === 'L08' ? null : el('a', {
            href: lectureHref(studyLecture) + (studySection ? `#${studySection}` : ''),
          }, `Review ${studyLecture}`),
        ]);
      })),
      el('div', { class: 'btn-row' }, [
        button('Replay this case', () => begin(item.id)),
        button('Choose another case or view history', () => { state.active = null; persist(); show(true); }),
      ]));
  }

  // On reload the active review and its history entry are separate JSON objects.
  if (state.active?.phase === 'review') {
    state.active = state.history.find((attempt) => attempt.caseId === state.active.caseId &&
      attempt.submittedAt === state.active.submittedAt) || null;
  }
  show();
  return root;
}
