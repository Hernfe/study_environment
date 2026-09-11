// Concept quizzes: 1 to 4 easy multiple-choice questions inside a
// concept block. One line of feedback per option, retry allowed.
// The multiple-choice body is also used by lectureQuiz.js.

import { el, paragraphs } from './dom.js';
import { recordConceptResult } from './progress.js';

// Builds the options list plus check/feedback for one multiple-choice
// question. Returns { root, reset } and calls onCheck({ correct, index })
// once per check.
export function createMcBody(question, { onCheck, allowRetry = false } = {}) {
  let selected = null;
  let locked = false;
  const buttons = [];

  const feedback = el('div', { class: 'feedback', role: 'status', 'aria-live': 'polite', hidden: true });

  const list = el(
    'ul',
    { class: 'options' },
    question.options.map((option, index) => {
      const button = el(
        'button',
        {
          type: 'button',
          class: 'option',
          'aria-pressed': 'false',
          onClick: () => select(index),
        },
        option.text
      );
      buttons.push(button);
      return el('li', {}, button);
    })
  );

  const checkButton = el('button', { type: 'button', class: 'btn btn-primary', disabled: true, onClick: check }, 'Check');
  const retryButton = el('button', { type: 'button', class: 'btn', hidden: true, onClick: reset }, 'Try again');
  const row = el('div', { class: 'btn-row' }, [checkButton, retryButton]);

  function select(index) {
    if (locked) return;
    selected = index;
    buttons.forEach((b, i) => {
      b.classList.toggle('is-selected', i === index);
      b.setAttribute('aria-pressed', i === index ? 'true' : 'false');
    });
    checkButton.disabled = false;
  }

  function check() {
    if (selected === null || locked) return;
    locked = true;
    const correct = selected === question.correct;
    buttons.forEach((b, i) => {
      b.disabled = true;
      if (i === question.correct) b.classList.add('is-correct');
      if (i === selected && !correct) b.classList.add('is-incorrect');
      if (i === selected || i === question.correct) {
        const line = question.options[i].feedback;
        if (line) b.appendChild(el('span', { class: 'option-feedback' }, line));
      }
    });
    feedback.hidden = false;
    feedback.className = 'feedback ' + (correct ? 'is-correct' : 'is-incorrect');
    feedback.replaceChildren(
      el('strong', {}, correct ? 'Correct.' : 'Not quite.'),
      ' ',
      correct ? 'Well remembered.' : 'The correct option is marked. Read both feedback lines.'
    );
    checkButton.hidden = true;
    if (allowRetry) retryButton.hidden = false;
    if (onCheck) onCheck({ correct, index: selected });
  }

  function reset() {
    selected = null;
    locked = false;
    buttons.forEach((b) => {
      b.disabled = false;
      b.className = 'option';
      b.setAttribute('aria-pressed', 'false');
      const line = b.querySelector('.option-feedback');
      if (line) line.remove();
    });
    feedback.hidden = true;
    checkButton.hidden = false;
    checkButton.disabled = true;
    retryButton.hidden = true;
    buttons[0]?.focus();
  }

  const root = el('div', { class: 'mc-body' }, [list, feedback, row]);
  return { root, reset, isLocked: () => locked };
}

export function renderConceptQuiz(questions, { lectureId, sectionTitle } = {}) {
  if (!questions || questions.length === 0) return null;
  const container = el('div', { class: 'concept-quiz' }, [
    el('h3', {}, 'Check yourself'),
  ]);
  questions.forEach((question, index) => {
    const card = el('article', { class: 'question', 'aria-labelledby': `cq-${question.id}` }, [
      el('div', { class: 'question-head' }, [
        el('span', { class: 'badge badge-easy' }, 'Easy'),
        el('span', {}, `Question ${index + 1} of ${questions.length}`),
        sectionTitle ? el('span', { class: 'visually-hidden' }, sectionTitle) : null,
      ]),
      el('div', { class: 'question-prompt', id: `cq-${question.id}` }, paragraphs(question.prompt)),
    ]);
    const body = createMcBody(question, {
      allowRetry: true,
      onCheck: ({ correct }) => {
        if (lectureId) recordConceptResult(lectureId, question.id, correct);
      },
    });
    card.appendChild(body.root);
    container.appendChild(card);
  });
  return container;
}
