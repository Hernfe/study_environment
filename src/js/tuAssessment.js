import '../styles/index.css';
import '../styles/tuAssessment.css';
import { el, seededOrder } from './dom.js';
import { courseHref, lectureHref } from './course.js';
import { getPracticeState, savePracticeState, storageAvailable } from './progress.js';
import { renderSiteNav } from './render.js';
import { diagnostic, mocks } from '../content/tu-e4350/assessments.js';

const id = new URLSearchParams(location.search).get('form') ?? mocks[0].id;
const assessment = [...mocks, diagnostic].find((form) => form.id === id);
const mount = document.getElementById('app');

function render(form) {
  const key = `assessment:${form.id}`;
  const saved = getPracticeState(key);
  const state = {
    choices: { ...saved.choices },
    drafts: { ...saved.drafts },
    criteria: { ...saved.criteria },
    submitted: saved.submitted === true,
  };
  const practice = form === diagnostic;
  const written = practice ? [] : [...form.cases, form.team];
  const title = practice ? diagnostic.title : `Mock ${mocks.indexOf(form) + 1} · ${form.title}`;
  const notice = el('p', { class: 'notice', role: 'status', hidden: storageAvailable() },
    'Browser storage is unavailable. Work may be lost when you leave the page.');
  const persist = () => {
    if (!savePracticeState(key, state)) notice.hidden = false;
  };
  const feedback = el('div');
  const summary = el('h2', { tabindex: '-1', id: 'assessment-result' }, 'Results');
  const score = el('p', { role: 'status' });
  const paper = el('form', { class: 'tu-assessment' });
  const review = el('section', { class: 'tu-assessment', 'aria-labelledby': 'assessment-result', hidden: true }, [summary, score, feedback]);

  const multipleChoice = form.questions.map(({ id, options, prompt }, index) => {
    const order = seededOrder(options.length, id);
    return el('fieldset', { class: 'question' }, [
      el('legend', {}, `${index + 1}. ${prompt}`),
      order.map((choice) => el('label', { class: 'tu-choice' }, [
        el('input', {
          type: 'radio', name: id,
          checked: state.choices[id] === choice,
          onChange: () => {
            state.choices[id] = choice;
            persist();
          },
        }),
        options[choice],
      ])),
    ]);
  });

  const responses = written.map(({ id, prompt }, index) => {
    const team = id === 'team';
    const inputId = `response-${id}`;
    const draft = el('textarea', {
      id: inputId, rows: 4,
      placeholder: team ? '[Actual activity and log or interview reference] [Observed result] [What the evidence showed]' : null,
      onInput: (event) => {
        state.drafts[id] = event.target.value;
        persist();
      },
    });
    draft.value = typeof state.drafts[id] === 'string' ? state.drafts[id] : '';
    return el('article', { class: 'question' }, [
      el('h3', {}, team ? 'Your team’s evidence · 2 points' : `Scenario ${index + 1} · 3 points`),
      el('label', { for: inputId }, prompt),
      draft,
    ]);
  });

  function updateScore(mcScore) {
    const marked = written.reduce((total, task) =>
      total + task.rubric.filter((_, index) => state.criteria[`${task.id}:${index}`] === true).length, 0);
    score.textContent = practice
      ? `MCQs ${mcScore}/16.`
      : `MCQs ${mcScore}/16. Written self-marking ${marked}/14. Practice total ${mcScore + marked}/30.`;
  }

  function showResults(focus = false) {
    for (const fieldset of multipleChoice) fieldset.disabled = true;
    for (const input of paper.querySelectorAll('textarea')) input.readOnly = true;
    submit.hidden = true;

    const mcScore = form.questions.filter((question) => state.choices[question.id] === question.correct).length;
    feedback.replaceChildren(
      el('h3', {}, 'Multiple-choice answer key'),
      el('ol', {}, form.questions.map((question) => {
        const selected = question.options[state.choices[question.id]];
        const outcome = state.choices[question.id] === question.correct ? 'Correct' : selected ? 'Incorrect' : 'Unanswered';
        return el('li', { class: 'block' }, [
          el('p', {}, `${outcome} · ${question.prompt}`),
          selected ? el('p', {}, `Your choice · ${selected}`) : null,
          el('p', {}, `Correct choice · ${question.options[question.correct]}`),
          el('p', {}, question.explanation),
          citation(question),
        ]);
      })),
      practice ? null : el('h3', {}, 'Written self-marking'),
      practice ? null : el('p', {}, 'Compare your submitted response or paper answer with each criterion. Award one point for each criterion you met.'),
      ...written.map((task, index) => el('fieldset', { class: 'question' }, [
        el('legend', {}, task.id === 'team' ? 'Your team’s evidence' : `Scenario ${index + 1}`),
        task.rubric.map((text, criterion) => {
          const criterionId = `${task.id}:${criterion}`;
          return el('label', { class: 'tu-choice' }, [
            el('input', {
              type: 'checkbox', checked: state.criteria[criterionId] === true,
              onChange: (event) => {
                state.criteria[criterionId] = event.target.checked;
                persist();
                updateScore(mcScore);
              },
            }),
            `1 point · ${text}`,
          ]);
        }),
        citation(task),
      ])),
    );
    updateScore(mcScore);
    review.hidden = false;
    if (focus) summary.focus();
  }

  const submit = el('button', { type: 'submit', class: 'btn btn-primary' }, 'Submit and show answer key');
  paper.addEventListener('submit', (event) => {
    event.preventDefault();
    if (state.submitted) return;
    state.submitted = true;
    persist();
    showResults(true);
  });
  paper.append(
    el('h2', {}, 'Multiple choice · 16 points'),
    ...multipleChoice,
  );
  if (!practice) {
    paper.append(
      el('h2', {}, 'Short responses · 14 points'),
      el('p', {}, 'Write 3–4 sentences for each scenario. For the team question, use your actual Client Engagement Log or interview notes. You can write on paper and leave these fields blank. Typed drafts stay in this browser.'),
      ...responses,
    );
  }
  paper.append(el('div', { class: 'btn-row' }, submit));
  if (state.submitted) showResults();

  return [
    renderSiteNav(),
    el('header', { class: 'page-header' }, [
      el('h1', {}, title),
      el('p', {}, practice ? 'Optional · 16 concept-application questions.'
        : '45-minute practice · Provisional format · 16 MCQs, four short scenarios and one team-evidence prompt.'),
      el('p', {}, 'Covers Weeks 1–10. Week 11 is in scope for both sittings and Week 12 is added for the alternate sitting. Neither week’s source slides are available here.'),
      el('p', { class: 'muted' }, 'You can submit with blanks. Submission locks your answers and opens the answer key.'),
    ]),
    notice, paper, review,
    el('p', {}, el('a', { href: courseHref() }, 'Back to course')),
  ];
}

function citation({ week, pages }) {
  return el('p', { class: 'muted' }, [
    el('a', { href: lectureHref(`L${String(week).padStart(2, '0')}`) }, `Week ${week}`),
    ` PDF, ${/^\d+$/.test(pages) ? 'p.' : 'pp.'} ${pages}`,
  ]);
}

mount.replaceChildren(el('div', { class: 'page-inner' }, assessment ? render(assessment) : [
  renderSiteNav(),
  el('h1', {}, 'Practice quiz unavailable'),
  el('a', { href: courseHref() }, 'Back to course'),
]));
