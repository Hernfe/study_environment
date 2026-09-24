// Lecture quiz: renders every question type, the reveal button with the
// step-by-step model answer, and the score card. renderQuestion is also
// used by review.js, so each card is self-contained.

import { el, paragraphs, shuffle, escapeHtml } from './dom.js';
import { createMcBody } from './conceptQuiz.js';
import { renderVisual, renderVisualBody, renderVideo } from './visuals.js';
import { renderTex, stripMath } from './math.js';
import { quizView } from './widgets/imageHotspots.js';
import { recordQuestionResult } from './progress.js';
import { normaliseBank, renderBank, bankSelect, linkPickers } from './wordBank.js';

const DIFFICULTY_LABEL = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };

function badge(difficulty) {
  const key = DIFFICULTY_LABEL[difficulty] ? difficulty : 'easy';
  return el('span', { class: `badge badge-${key}` }, DIFFICULTY_LABEL[key]);
}

// Points, as on the mini-exam (docs/exam-format.md): a question with one
// answer is worth 1 point, each sub-item of a multi-part question 0.25.
// `points` overrides a single-answer total; `itemPoints` overrides the
// value of each sub-item. Essays and self-scored interprets are worth
// their mark scheme.
const DEFAULT_POINTS = 1;
const DEFAULT_ITEM_POINTS = 0.25;

function subItems(question) {
  switch (question.type) {
    case 'classify': return (question.items || []).length;
    case 'order': return (question.items || []).length;
    case 'fillBlank': return (question.blanks || []).length;
    case 'label': return (question.hotspots?.regions || question.regions || []).length;
    case 'trueFalse': return question.statements ? question.statements.length : 0;
    default: return 0;
  }
}

export function questionPoints(question) {
  const scheme = question.markScheme || [];
  if (question.type === 'essay' || (question.type === 'interpret' && !question.options && scheme.length)) {
    return { total: question.points || scheme.reduce((sum, m) => sum + m.points, 0), per: null, items: 0 };
  }
  const items = subItems(question);
  if (items > 0) {
    const per = question.itemPoints ?? (question.points ? question.points / items : DEFAULT_ITEM_POINTS);
    return { total: per * items, per, items };
  }
  return { total: question.points ?? DEFAULT_POINTS, per: null, items: 0 };
}

export function formatPoints(value) {
  return String(Math.round(value * 100) / 100);
}

function pointsBadge(question) {
  const { total, per, items } = questionPoints(question);
  const unit = total === 1 ? 'point' : 'points';
  const text = per === null
    ? `${formatPoints(total)} ${unit}`
    : `${formatPoints(total)} ${unit}, ${items} × ${formatPoints(per)}`;
  return el('span', { class: 'badge badge-points' }, text);
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
    steps = (question.steps || []).map((s) => (s.math || s.tex ? s : s.text));
  }
  if (!steps || steps.length === 0) return null;
  return el('details', { class: 'reveal' }, [
    el('summary', {}, question.type === 'clinicalCase' ? 'Show the reasoning' : 'Show model answer'),
    el('div', { class: 'reveal-body' }, [
      el(
        'ol',
        { class: 'steps' },
        steps.map((step) =>
          typeof step === 'string'
            ? el('li', {}, paragraphs(step))
            : el('li', {}, [
                step.text,
                step.tex ? renderTex(step.tex, { display: true }) : null,
                !step.tex && step.math ? el('code', { class: 'math' }, step.math) : null,
              ])
        )
      ),
    ]),
  ]);
}

/* Type bodies. Each returns a node and calls report({ correct, score, max }) once. */

function mcBody(question, report, { seed } = {}) {
  const body = createMcBody(question, {
    allowRetry: false,
    seed,
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
  const bank = question.wordBank ? normaliseBank(question.wordBank) : null;
  // New style: the same hotspot regions as the study figure, in quiz mode.
  if (question.hotspots) {
    const stage = el('div', { class: 'hotspots is-quiz' });
    let done = false;
    quizView(stage, question.hotspots, {
      wordBank: bank,
      checkLabel: 'Check',
      onResult: ({ right, total }) => {
        if (done) return;
        done = true;
        stage.querySelectorAll('select, button').forEach((n) => { n.disabled = true; });
        report({ correct: right === total, score: right, max: total });
      },
    });
    return el('div', { class: 'label' }, [stage]);
  }
  const figureWrap = el('div', { class: 'label-figure', role: 'img', 'aria-label': question.figure?.fallbackAlt || '' }, [
    renderVisualBody(question.figure),
  ]);
  const markers = question.regions.map((region, i) =>
    el('span', { class: 'label-marker', style: `left:${region.x}%; top:${region.y}%`, 'aria-hidden': 'true' }, String(i + 1))
  );
  markers.forEach((m) => figureWrap.appendChild(m));

  const pool = bank || normaliseBank(question.labels || question.regions.map((r) => r.label));
  const bankNode = bank ? renderBank(bank) : null;
  const selects = [];
  const picker = el(
    'ol',
    { class: 'label-picker' },
    question.regions.map((region, i) => {
      const select = bankSelect(pool, { 'aria-label': `Label for marker ${i + 1}`, onChange: updateCheck }, 'Choose a label');
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

  if (bank) linkPickers(selects, bank, bankNode);
  return el('div', { class: 'label' }, [figureWrap, bankNode, picker, feedback, el('div', { class: 'btn-row' }, [checkButton])]);
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

// True or false. The student picks a side and writes a one-line
// justification before checking; the authored justification is then
// shown under theirs.
function trueFalseBody(question, report) {
  if (question.statements) return trueFalseStatementsBody(question, report);
  let choice = null;
  let done = false;
  const buttons = [true, false].map((value) =>
    el('button', { type: 'button', class: 'option tf-option', 'aria-pressed': 'false', onClick: () => pick(value) }, value ? 'True' : 'False')
  );
  const inputId = `${question.id}-why`;
  const input = el('input', { type: 'text', class: 'tf-why', id: inputId, autocomplete: 'off', onInput: update });
  const feedback = feedbackBanner();
  const why = el('p', { class: 'tf-justification', hidden: true });
  const checkButton = el('button', { type: 'button', class: 'btn btn-primary', disabled: true, onClick: check }, 'Check');
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { event.preventDefault(); check(); }
  });

  function pick(value) {
    if (done) return;
    choice = value;
    buttons.forEach((b, i) => {
      const on = (i === 0) === value;
      b.classList.toggle('is-selected', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    update();
  }
  function update() {
    checkButton.disabled = done || choice === null || !input.value.trim();
  }
  function check() {
    if (done || choice === null || !input.value.trim()) return;
    done = true;
    const correct = choice === question.answer;
    buttons.forEach((b, i) => {
      b.disabled = true;
      const value = i === 0;
      if (value === question.answer) b.classList.add('is-correct');
      else if (value === choice) b.classList.add('is-incorrect');
    });
    input.disabled = true;
    checkButton.disabled = true;
    why.hidden = false;
    why.replaceChildren(el('span', { class: 'block-tag' }, question.answer ? 'Why: ' : 'Correction: '), question.justification || '');
    setFeedback(feedback, correct, correct
      ? 'Compare your reason with the one below; the reason is what the exam marks.'
      : `The statement is ${question.answer ? 'true' : 'false'}. Read the reason below.`);
    report({ correct, score: correct ? 1 : 0, max: 1 });
  }

  return el('div', { class: 'tf' }, [
    el('div', { class: 'tf-options', role: 'group', 'aria-label': 'True or false' }, buttons),
    el('div', { class: 'tf-why-row' }, [el('label', { for: inputId }, 'Why, or the correction if false, in one line:'), input]),
    why,
    feedback,
    el('div', { class: 'btn-row' }, [checkButton]),
  ]);
}

const LETTERS = 'abcdefghijklmnopqrstuvwxyz';

// True or false, several statements, as on the mini-exam: pick True or
// False for each; a statement marked False needs a one-line correction
// before Check is enabled. Scored per statement. The authored
// correction is then shown under every false statement, the authored
// reason (if any) under true ones.
function trueFalseStatementsBody(question, report) {
  let done = false;
  const rows = question.statements.map((statement, i) => {
    const row = { choice: null };
    row.buttons = [true, false].map((value) =>
      el('button', { type: 'button', class: 'option tf-option', 'aria-pressed': 'false', onClick: () => pick(row, value) }, value ? 'True' : 'False')
    );
    const inputId = `${question.id}-fix-${i}`;
    row.input = el('input', { type: 'text', class: 'tf-why', id: inputId, autocomplete: 'off', onInput: update });
    row.fixRow = el('div', { class: 'tf-why-row', hidden: true }, [el('label', { for: inputId }, 'Correction, in one line:'), row.input]);
    row.why = el('p', { class: 'tf-justification', hidden: true });
    row.node = el('li', {}, [
      el('span', { class: 'num' }, `${LETTERS[i]})`),
      el('div', {}, [
        el('div', { class: 'tf-text' }, paragraphs(statement.text)),
        el('div', { class: 'tf-options', role: 'group', 'aria-label': `Statement ${LETTERS[i]}, true or false` }, row.buttons),
        row.fixRow,
        row.why,
      ]),
    ]);
    return row;
  });
  const feedback = feedbackBanner();
  const checkButton = el('button', { type: 'button', class: 'btn btn-primary', disabled: true, onClick: check }, 'Check');

  function pick(row, value) {
    if (done) return;
    row.choice = value;
    row.buttons.forEach((b, i) => {
      const on = (i === 0) === value;
      b.classList.toggle('is-selected', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    row.fixRow.hidden = value !== false;
    update();
  }
  function ready() {
    return rows.every((r) => r.choice === true || (r.choice === false && r.input.value.trim()));
  }
  function update() {
    checkButton.disabled = done || !ready();
  }
  function check() {
    if (done || !ready()) return;
    done = true;
    let right = 0;
    rows.forEach((row, i) => {
      const statement = question.statements[i];
      const ok = row.choice === statement.answer;
      if (ok) right += 1;
      row.buttons.forEach((b, k) => {
        b.disabled = true;
        const value = k === 0;
        if (value === statement.answer) b.classList.add('is-correct');
        else if (value === row.choice) b.classList.add('is-incorrect');
      });
      row.input.disabled = true;
      const line = statement.answer ? statement.justification : statement.correction;
      if (line) {
        row.why.hidden = false;
        row.why.replaceChildren(el('span', { class: 'block-tag' }, statement.answer ? 'Why: ' : 'Correction: '), line);
      }
    });
    checkButton.disabled = true;
    const correct = right === rows.length;
    setFeedback(feedback, correct, correct
      ? 'Every statement is right. Compare your corrections with the ones shown.'
      : `${right} of ${rows.length} statements right. Read the correction under each false one.`);
    report({ correct, score: right, max: rows.length });
  }

  return el('div', { class: 'tf tf-multi' }, [
    el('ol', { class: 'item-list' }, rows.map((r) => r.node)),
    feedback,
    el('div', { class: 'btn-row' }, [checkButton]),
  ]);
}

// Normalises a typed answer: case, spacing, dash forms and trailing
// punctuation do not matter. Everything else must match a variant.
function normaliseAnswer(text) {
  return stripMath(String(text))
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[‐-―−]/g, '-')
    .replace(/\s*-\s*/g, '-')
    .replace(/[.,;:!?]+$/, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function matches(value, accepted = []) {
  const typed = normaliseAnswer(value);
  return typed !== '' && accepted.some((a) => normaliseAnswer(a) === typed);
}

// Fill in the blank. `text` holds one ___ per entry in `blanks`; each
// blank lists its accepted variants.
// With `wordBank`, every blank is a select holding the bank instead of
// a text input.
function fillBlankBody(question, report) {
  const bank = question.wordBank ? normaliseBank(question.wordBank) : null;
  const bankNode = bank ? renderBank(bank) : null;
  const segments = String(question.text || '').split('___');
  const inputs = [];
  const sentence = el('p', { class: 'fill-text' });
  segments.forEach((segment, i) => {
    sentence.append(segment);
    if (i === segments.length - 1) return;
    if (bank) {
      const select = bankSelect(bank, { class: 'fill-input fill-select', 'aria-label': `Blank ${i + 1}`, onChange: update });
      inputs.push(select);
      sentence.append(select);
      return;
    }
    const accepted = question.blanks?.[i]?.accept || [''];
    const input = el('input', {
      type: 'text',
      class: 'fill-input',
      autocomplete: 'off',
      spellcheck: 'false',
      'aria-label': `Blank ${i + 1}`,
      size: Math.max(8, Math.min(24, Math.max(...accepted.map((a) => stripMath(a).length)) + 2)),
      onInput: update,
    });
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') { event.preventDefault(); check(); }
    });
    inputs.push(input);
    sentence.append(input);
  });
  const answers = el('ul', { class: 'fill-answers', hidden: true });
  const feedback = feedbackBanner();
  const checkButton = el('button', { type: 'button', class: 'btn btn-primary', disabled: true, onClick: check }, 'Check');
  let done = false;

  function update() {
    checkButton.disabled = done || !inputs.every((i) => i.value.trim());
  }
  function check() {
    if (done || !inputs.every((i) => i.value.trim())) return;
    done = true;
    let right = 0;
    const lines = inputs.map((input, i) => {
      const accepted = question.blanks?.[i]?.accept || [];
      const ok = matches(input.value, accepted);
      if (ok) right += 1;
      input.classList.add(ok ? 'is-correct' : 'is-incorrect');
      input.disabled = true;
      return el('li', {}, [
        inputs.length > 1 ? `Blank ${i + 1}: ` : 'Expected: ',
        accepted[0] || '',
        accepted.length > 1 ? el('span', { class: 'muted' }, ` (also accepted: ${accepted.slice(1).join(', ')})`) : null,
      ]);
    });
    answers.replaceChildren(...lines);
    answers.hidden = false;
    checkButton.disabled = true;
    const correct = right === inputs.length;
    setFeedback(feedback, correct, correct
      ? 'Every blank matches.'
      : `${right} of ${inputs.length} blanks match. The expected answers are listed below.`);
    report({ correct, score: right, max: inputs.length });
  }

  if (bank) linkPickers(inputs, bank, bankNode);
  return el('div', { class: 'fill' }, [sentence, bankNode, answers, feedback, el('div', { class: 'btn-row' }, [checkButton])]);
}

// Classify: several items share one set of categories; each item gets
// one category, scored per item. Covers the exam's cell-type
// classification, area-to-lobe matching and directional-term
// completion. An item whose text holds ___ gets its picker inline.
// Categories may be used any number of times.
function classifyBody(question, report) {
  const bank = normaliseBank(question.categories, { reusable: true });
  const bankNode = renderBank(bank, { title: question.categoriesTitle || 'Categories' });
  const selects = [];
  const explanations = [];
  const list = el('ol', { class: 'item-list' }, question.items.map((item, i) => {
    const select = bankSelect(bank, { class: 'classify-select', 'aria-label': `Category for item ${LETTERS[i]}`, onChange: update });
    selects.push(select);
    const explanation = el('p', { class: 'label-explanation', hidden: true });
    explanations.push(explanation);
    const parts = String(item.text).split('___');
    const inline = parts.length > 1;
    return el('li', {}, [
      el('span', { class: 'num' }, `${LETTERS[i]})`),
      el('div', {}, [
        inline
          ? el('p', { class: 'classify-text' }, [parts[0], select, parts.slice(1).join('___')])
          : el('div', { class: 'classify-text' }, paragraphs(item.text)),
        inline ? null : el('div', { class: 'classify-pick' }, [select]),
        explanation,
      ]),
    ]);
  }));
  const feedback = feedbackBanner();
  const checkButton = el('button', { type: 'button', class: 'btn btn-primary', disabled: true, onClick: check }, 'Check');
  let done = false;

  function update() {
    checkButton.disabled = done || !selects.every((s) => s.value);
  }
  function check() {
    if (done || !selects.every((s) => s.value)) return;
    done = true;
    let right = 0;
    question.items.forEach((item, i) => {
      const ok = selects[i].value === item.answer;
      if (ok) right += 1;
      selects[i].classList.add(ok ? 'is-correct' : 'is-incorrect');
      selects[i].disabled = true;
      explanations[i].hidden = false;
      explanations[i].textContent = (ok ? '' : `Answer: ${item.answer}. `) + (item.explanation || '');
    });
    checkButton.disabled = true;
    const correct = right === selects.length;
    setFeedback(feedback, correct, correct
      ? 'Every item is in the right category.'
      : `${right} of ${selects.length} right. The answer and the reason are under each item.`);
    report({ correct, score: right, max: selects.length });
  }

  return el('div', { class: 'classify' }, [bankNode, list, feedback, el('div', { class: 'btn-row' }, [checkButton])]);
}

// Clinical case: a scenario, then pick (options) or name (accept) the
// structure, mechanism or lesion. The reveal walks the reasoning.
// The scenario itself is drawn above the prompt by renderQuestion.
function clinicalCaseBody(question, report, ctx) {
  if (question.options) {
    return el('div', { class: 'case' }, [mcBody(question, report, ctx)]);
  }
  const inputId = `${question.id}-case`;
  const input = el('input', { type: 'text', class: 'case-input', id: inputId, autocomplete: 'off', spellcheck: 'false', onInput: () => { checkButton.disabled = done || !input.value.trim(); } });
  const feedback = feedbackBanner();
  const checkButton = el('button', { type: 'button', class: 'btn btn-primary', disabled: true, onClick: check }, 'Check');
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { event.preventDefault(); check(); }
  });
  let done = false;
  function check() {
    if (done || !input.value.trim()) return;
    done = true;
    const correct = matches(input.value, question.accept);
    input.classList.add(correct ? 'is-correct' : 'is-incorrect');
    input.disabled = true;
    checkButton.disabled = true;
    setFeedback(feedback, correct, correct
      ? 'Now check the reasoning, not just the name.'
      : `Expected: ${question.accept?.[0] || ''}. Open the reasoning and follow it step by step.`);
    report({ correct, score: correct ? 1 : 0, max: 1 });
  }
  return el('div', { class: 'case' }, [
    el('div', { class: 'calc-answer' }, [el('label', { for: inputId }, question.answerLabel || 'Your answer:'), input]),
    feedback,
    el('div', { class: 'btn-row' }, [checkButton]),
  ]);
}

// Interpret: read a figure, recording or clip, then answer. Auto-scored
// with `options`, self-scored with `markScheme`.
function interpretBody(question, report, ctx) {
  return el('div', { class: 'interpret' }, [
    question.figure ? renderVisual(question.figure) : null,
    question.options ? mcBody(question, report, ctx) : essayBody(question, report),
  ]);
}

const BODIES = {
  mc: mcBody,
  essay: essayBody,
  label: labelBody,
  order: orderBody,
  calc: calcBody,
  trueFalse: trueFalseBody,
  fillBlank: fillBlankBody,
  clinicalCase: clinicalCaseBody,
  interpret: interpretBody,
  classify: classifyBody,
};

// Renders one question card. options: { lectureId, index, total, source, onResult }
// source (optional) is shown in the head, used by review to name the lecture.
export function renderQuestion(question, { lectureId, index, total, source, onResult } = {}) {
  const head = el('div', { class: 'question-head' }, [
    badge(question.difficulty),
    el('span', { class: 'badge badge-neutral' }, typeLabel(question.type)),
    pointsBadge(question),
    question.beyondExam ? el('span', { class: 'badge badge-neutral' }, 'Beyond the exam') : null,
    index !== undefined ? el('span', {}, `Question ${index + 1}${total ? ' of ' + total : ''}`) : null,
    source ? el('span', {}, source) : null,
  ]);
  const card = el('article', { class: 'question', 'aria-labelledby': `q-${lectureId}-${question.id}` }, [
    head,
    question.scenario
      ? el('div', { class: 'case-scenario' }, [el('p', { class: 'block-kicker' }, 'Case'), el('div', {}, paragraphs(question.scenario))])
      : null,
    el('div', { class: 'question-prompt', id: `q-${lectureId}-${question.id}` }, paragraphs(question.prompt)),
    question.beyondExam
      ? el('p', { class: 'beyond-note muted' }, 'Beyond the mini-exam format, which has no essays. For understanding only.')
      : null,
  ]);

  // Bodies report in their own units (sub-items right, 1 or 0, or
  // mark-scheme points); scale to the question's points.
  const points = questionPoints(question);
  let reported = false;
  function report(raw) {
    if (reported) return;
    reported = true;
    const scale = raw.max ? points.total / raw.max : 0;
    const result = { correct: raw.correct, score: raw.score * scale, max: points.total };
    if (lectureId) recordQuestionResult(lectureId, question.id, result);
    if (onResult) onResult({ question, lectureId, ...result });
  }

  const build = BODIES[question.type];
  if (!build) {
    card.appendChild(el('p', { class: 'notice' }, `Unknown question type "${escapeHtml(question.type)}".`));
    return card;
  }
  // Any question may carry a clip it depends on, so it still works in
  // review, away from its section.
  if (question.video) card.appendChild(renderVideo(question.video));
  card.appendChild(build(question, report, { seed: `${lectureId}:${question.id}` }));
  const reveal = renderReveal(question);
  if (reveal) card.appendChild(reveal);
  return card;
}

function typeLabel(type) {
  return {
    mc: 'Multiple choice',
    essay: 'Essay',
    label: 'Label the figure',
    order: 'Order the events',
    calc: 'Calculation',
    trueFalse: 'True or false',
    fillBlank: 'Fill in the blank',
    clinicalCase: 'Clinical case',
    interpret: 'Interpret',
    classify: 'Classify',
  }[type] || type;
}

export function renderLectureQuiz(questions, { lectureId } = {}) {
  const results = new Map();
  const total = questions.length;

  const scoreCard = el('div', { class: 'score-card', hidden: true });
  function updateScore() {
    const answered = results.size;
    const correct = [...results.values()].filter((r) => r.correct).length;
    const score = [...results.values()].reduce((sum, r) => sum + r.score, 0);
    const max = [...results.values()].reduce((sum, r) => sum + r.max, 0);
    scoreCard.hidden = false;
    scoreCard.replaceChildren(
      el('p', { class: 'muted' }, 'Lecture quiz'),
      el('p', { class: 'big' }, `${correct} of ${answered} right`),
      el('p', {}, `${formatPoints(score)} of ${formatPoints(max)} points on the answered questions.`),
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
    el('p', { class: 'muted' }, `${total} questions worth ${formatPoints(questions.reduce((sum, q) => sum + questionPoints(q).total, 0))} points, easy first, then medium, then hard. Points follow the mini-exam: 1 per single answer, 0.25 per sub-item. Answer before you reveal.`),
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
