// Lecture quiz: renders every question type, the reveal button with the
// step-by-step model answer, and the score card. renderQuestion is also
// used by review.js, so each card is self-contained.

import { el, paragraphs, shuffle, escapeHtml } from './dom.js';
import { createMcBody } from './conceptQuiz.js';
import { renderVisualBody } from './visuals.js';
import { recordQuestionResult } from './progress.js';

const DIFFICULTY_LABEL = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };

function badge(difficulty) {
  const key = DIFFICULTY_LABEL[difficulty] ? difficulty : 'easy';
  return el('span', { class: `badge badge-${key}` }, DIFFICULTY_LABEL[key]);
}

function feedbackBanner() {
  return el('div', { class: 'feedback', role: 'status', 'aria-live': 'polite', hidden: true });
}

function setFeedback(node, correct, text) {
  node.hidden = false;
  node.className = 'feedback ' + (correct === null ? 'is-neutral' : correct ? 'is-correct' : 'is-incorrect');
  node.replaceChildren(el('strong', {}, correct === null ? 'Noted.' : correct ? 'Correct.' : 'Not quite.'), ' ', text);
}

// The reveal: a <details> with the model answer as numbered steps.
function renderReveal(question) {
  let steps = question.modelAnswer;
  if ((!steps || steps.length === 0) && question.type === 'calc') {
    steps = (question.steps || []).map((s) => (s.math ? { text: s.text, math: s.math } : s.text));
  }
  if (!steps || steps.length === 0) return null;
  return el('details', { class: 'reveal' }, [
    el('summary', {}, 'Show model answer'),
    el('div', { class: 'reveal-body' }, [
      el(
        'ol',
        { class: 'steps' },
        steps.map((step) =>
          typeof step === 'string'
            ? el('li', {}, paragraphs(step))
            : el('li', {}, [step.text, step.math ? el('code', { class: 'math' }, step.math) : null])
        )
      ),
    ]),
  ]);
}

/* Type bodies. Each returns a node and calls report({ correct, score, max }) once. */

function mcBody(question, report) {
  const body = createMcBody(question, {
    allowRetry: false,
    onCheck: ({ correct }) => report({ correct, score: correct ? 1 : 0, max: 1 }),
  });
  return body.root;
}

function essayBody(question, report) {
  const max = question.points || (question.markScheme || []).reduce((s, m) => s + m.points, 0);
  const textarea = el('textarea', {
    class: 'essay-input',
    'aria-label': 'Your answer (not saved)',
    placeholder: `Write your answer here (${max} points). It is not saved; the point is to retrieve before you look.`,
  });
  const feedback = feedbackBanner();
  const scoreLine = el('p', { class: 'self-score' });
  const checkboxes = [];

  const scheme = el(
    'ol',
    { class: 'mark-scheme', hidden: true },
    (question.markScheme || []).map((item, i) => {
      const box = el('input', { type: 'checkbox', id: `${question.id}-ms-${i}`, onChange: update });
      checkboxes.push({ box, points: item.points });
      return el('li', {}, [
        box,
        el('span', { class: 'pts' }, `${item.points} pt`),
        el('label', { for: `${question.id}-ms-${i}` }, item.text),
      ]);
    })
  );

  let reported = false;
  function total() {
    return checkboxes.reduce((s, c) => s + (c.box.checked ? c.points : 0), 0);
  }
  function update() {
    scoreLine.textContent = `Self-score: ${total()} / ${max}`;
  }
  const revealButton = el('button', { type: 'button', class: 'btn btn-primary', onClick: () => {
    scheme.hidden = false;
    revealButton.hidden = true;
    doneButton.hidden = false;
    update();
    checkboxes[0]?.box.focus();
  } }, 'Show mark scheme');
  const doneButton = el('button', { type: 'button', class: 'btn', hidden: true, onClick: () => {
    if (reported) return;
    reported = true;
    const score = total();
    const correct = score >= max;
    checkboxes.forEach((c) => { c.box.disabled = true; });
    doneButton.disabled = true;
    setFeedback(feedback, correct, correct ? `Full marks, ${score} of ${max}.` : `${score} of ${max}. This question will come back in review.`);
    report({ correct, score, max });
  } }, 'Record my score');

  return el('div', { class: 'essay' }, [
    textarea,
    el('p', { class: 'muted' }, `Worth ${max} points. Tick each point you earned, then record the score.`),
    scheme,
    scoreLine,
    feedback,
    el('div', { class: 'btn-row' }, [revealButton, doneButton]),
  ]);
}

function labelBody(question, report) {
  const figureWrap = el('div', { class: 'label-figure', role: 'img', 'aria-label': question.figure?.fallbackAlt || '' }, [
    renderVisualBody(question.figure),
  ]);
  const markers = question.regions.map((region, i) =>
    el('span', { class: 'label-marker', style: `left:${region.x}%; top:${region.y}%`, 'aria-hidden': 'true' }, String(i + 1))
  );
  markers.forEach((m) => figureWrap.appendChild(m));

  const pool = question.labels || question.regions.map((r) => r.label);
  const selects = [];
  const picker = el(
    'ol',
    { class: 'label-picker' },
    question.regions.map((region, i) => {
      const select = el('select', { 'aria-label': `Label for marker ${i + 1}`, onChange: updateCheck }, [
        el('option', { value: '' }, 'Choose a label'),
        ...pool.map((label) => el('option', { value: label }, label)),
      ]);
      selects.push(select);
      const explanation = el('p', { class: 'label-explanation', hidden: true });
      return el('li', {}, [el('span', { class: 'num' }, `${i + 1}.`), el('div', {}, [select, explanation])]);
    })
  );

  const feedback = feedbackBanner();
  const checkButton = el('button', { type: 'button', class: 'btn btn-primary', disabled: true, onClick: check }, 'Check');

  function updateCheck() {
    checkButton.disabled = !selects.every((s) => s.value);
  }

  let done = false;
  function check() {
    if (done) return;
    done = true;
    let right = 0;
    question.regions.forEach((region, i) => {
      const ok = selects[i].value === region.label;
      if (ok) right += 1;
      selects[i].classList.add(ok ? 'is-correct' : 'is-incorrect');
      selects[i].disabled = true;
      markers[i].classList.add(ok ? 'is-correct' : 'is-incorrect');
      const explanation = selects[i].nextElementSibling;
      explanation.hidden = false;
      explanation.textContent = (ok ? '' : `Correct label: ${region.label}. `) + (region.explanation || '');
    });
    const correct = right === question.regions.length;
    setFeedback(feedback, correct, `${right} of ${question.regions.length} labels right. Read the explanation under each one.`);
    checkButton.disabled = true;
    report({ correct, score: right, max: question.regions.length });
  }

  return el('div', { class: 'label' }, [figureWrap, picker, feedback, el('div', { class: 'btn-row' }, [checkButton])]);
}

function orderBody(question, report) {
  const correctOrder = question.correctOrder || question.items.map((_, i) => i);
  // Shuffle until the shown order differs from the answer (when possible).
  let order = shuffle(question.items.map((_, i) => i));
  if (question.items.length > 1) {
    let guard = 0;
    while (order.every((v, i) => v === correctOrder[i]) && guard < 10) {
      order = shuffle(order);
      guard += 1;
    }
  }

  const list = el('ol', { class: 'order-list', 'aria-label': 'Events to put in order' });
  const feedback = feedbackBanner();
  let done = false;

  function move(position, delta) {
    const target = position + delta;
    if (target < 0 || target >= order.length) return;
    [order[position], order[target]] = [order[target], order[position]];
    draw();
    list.children[target]?.querySelector(delta < 0 ? '.up' : '.down')?.focus();
  }

  function draw() {
    list.replaceChildren(
      ...order.map((itemIndex, position) =>
        el('li', {}, [
          el('span', { class: 'visually-hidden' }, `Position ${position + 1}.`),
          el('span', {}, question.items[itemIndex]),
          el('span', { class: 'order-moves' }, [
            el('button', { type: 'button', class: 'up', 'aria-label': 'Move up', disabled: done || position === 0, onClick: () => move(position, -1) }, '↑'),
            el('button', { type: 'button', class: 'down', 'aria-label': 'Move down', disabled: done || position === order.length - 1, onClick: () => move(position, 1) }, '↓'),
          ]),
        ])
      )
    );
  }
  draw();

  const checkButton = el('button', { type: 'button', class: 'btn btn-primary', onClick: () => {
    if (done) return;
    done = true;
    draw();
    let right = 0;
    order.forEach((itemIndex, position) => {
      const ok = itemIndex === correctOrder[position];
      if (ok) right += 1;
      list.children[position].classList.add(ok ? 'is-correct' : 'is-incorrect');
    });
    const correct = right === order.length;
    setFeedback(feedback, correct, correct ? 'The sequence is right.' : `${right} of ${order.length} positions right. The model answer explains why each step follows the last.`);
    checkButton.disabled = true;
    report({ correct, score: right, max: order.length });
  } }, 'Check order');

  return el('div', { class: 'order' }, [list, feedback, el('div', { class: 'btn-row' }, [checkButton])]);
}

function calcBody(question, report) {
  const given = question.given && question.given.length
    ? el('div', { class: 'calc-given' }, [
        el('p', { class: 'muted' }, 'Given'),
        el('dl', {}, question.given.flatMap((g) => [
          el('dt', {}, g.symbol),
          el('dd', {}, `${g.value} ${g.unit || ''}${g.note ? ' (' + g.note + ')' : ''}`.trim()),
        ])),
      ])
    : null;

  const input = el('input', { type: 'text', inputmode: 'decimal', class: 'calc-input', id: `${question.id}-answer` });
  const unit = el('span', { class: 'mono' }, question.answer.unit || '');
  const feedback = feedbackBanner();
  let done = false;

  const checkButton = el('button', { type: 'button', class: 'btn btn-primary', onClick: check }, 'Check answer');
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { event.preventDefault(); check(); }
  });

  function check() {
    if (done) return;
    const value = Number(String(input.value).replace(',', '.').trim());
    if (input.value.trim() === '' || Number.isNaN(value)) {
      setFeedback(feedback, null, 'Enter a number first.');
      return;
    }
    done = true;
    const tolerance = question.answer.tolerance ?? 0;
    const correct = Math.abs(value - question.answer.value) <= tolerance;
    input.classList.add(correct ? 'is-correct' : 'is-incorrect');
    input.disabled = true;
    checkButton.disabled = true;
    setFeedback(feedback, correct, correct
      ? `${question.answer.value} ${question.answer.unit || ''} is right.`
      : `The answer is ${question.answer.value} ${question.answer.unit || ''}. Open the model answer and follow the steps.`);
    report({ correct, score: correct ? 1 : 0, max: 1 });
  }

  return el('div', { class: 'calc' }, [
    given,
    el('div', { class: 'calc-answer' }, [el('label', { for: `${question.id}-answer` }, 'Answer:'), input, unit]),
    feedback,
    el('div', { class: 'btn-row' }, [checkButton]),
  ]);
}

const BODIES = { mc: mcBody, essay: essayBody, label: labelBody, order: orderBody, calc: calcBody };

// Renders one question card. options: { lectureId, index, total, source, onResult }
// source (optional) is shown in the head, used by review to name the lecture.
export function renderQuestion(question, { lectureId, index, total, source, onResult } = {}) {
  const head = el('div', { class: 'question-head' }, [
    badge(question.difficulty),
    el('span', { class: 'badge badge-neutral' }, typeLabel(question.type)),
    index !== undefined ? el('span', {}, `Question ${index + 1}${total ? ' of ' + total : ''}`) : null,
    source ? el('span', {}, source) : null,
  ]);
  const card = el('article', { class: 'question', 'aria-labelledby': `q-${lectureId}-${question.id}` }, [
    head,
    el('div', { class: 'question-prompt', id: `q-${lectureId}-${question.id}` }, paragraphs(question.prompt)),
  ]);

  let reported = false;
  function report(result) {
    if (reported) return;
    reported = true;
    if (lectureId) recordQuestionResult(lectureId, question.id, result);
    if (onResult) onResult({ question, lectureId, ...result });
  }

  const build = BODIES[question.type];
  if (!build) {
    card.appendChild(el('p', { class: 'notice' }, `Unknown question type "${escapeHtml(question.type)}".`));
    return card;
  }
  card.appendChild(build(question, report));
  const reveal = renderReveal(question);
  if (reveal) card.appendChild(reveal);
  return card;
}

function typeLabel(type) {
  return { mc: 'Multiple choice', essay: 'Essay', label: 'Label the figure', order: 'Order the events', calc: 'Calculation' }[type] || type;
}

export function renderLectureQuiz(questions, { lectureId } = {}) {
  const results = new Map();
  const total = questions.length;

  const scoreCard = el('div', { class: 'score-card', hidden: true });
  function updateScore() {
    const answered = results.size;
    const correct = [...results.values()].filter((r) => r.correct).length;
    scoreCard.hidden = false;
    scoreCard.replaceChildren(
      el('p', { class: 'muted' }, 'Lecture quiz'),
      el('p', { class: 'big' }, `${correct} of ${answered} right`),
      el('div', { class: 'progress-bar', role: 'progressbar', 'aria-valuemin': 0, 'aria-valuemax': total, 'aria-valuenow': answered }, [
        el('span', { style: `width:${(answered / total) * 100}%` }),
      ]),
      el('p', { class: 'muted' }, answered < total
        ? `${answered} of ${total} answered. Missed questions come back first in cumulative review on the home page.`
        : 'All answered. Missed questions come back first in cumulative review on the home page.')
    );
  }

  const container = el('section', { class: 'lecture-quiz', id: 'lecture-quiz', 'aria-labelledby': 'lecture-quiz-title' }, [
    el('h2', { id: 'lecture-quiz-title' }, 'Lecture quiz'),
    el('p', { class: 'muted' }, `${total} questions, easy first, then medium, then hard. Answer before you reveal.`),
    ...questions.map((question, index) =>
      renderQuestion(question, {
        lectureId,
        index,
        total,
        onResult: (result) => { results.set(question.id, result); updateScore(); },
      })
    ),
    scoreCard,
  ]);
  return container;
}
