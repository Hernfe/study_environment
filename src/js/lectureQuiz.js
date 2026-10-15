// Lecture quiz: renders every question type, the reveal button with the
// step-by-step model answer, and the score card. renderQuestion is also
// used by review.js, so each card is self-contained.

import { el, paragraphs, shuffle, escapeHtml, seededOrder } from './dom.js';
import { createMcBody } from './conceptQuiz.js';
import { renderVisual, renderVisualBody, renderVideo } from './visuals.js';
import { renderTex, stripMath } from './math.js';
import { quizView, buildFigure, rove } from './widgets/imageHotspots.js';
import { recordQuestionResult } from './progress.js';
import { normaliseBank, renderBank, bankSelect, linkPickers } from './wordBank.js';

const DIFFICULTY_LABEL = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };

function badge(difficulty) {
  const key = DIFFICULTY_LABEL[difficulty] ? difficulty : 'easy';
  return el('span', { class: `badge badge-${key}` }, DIFFICULTY_LABEL[key]);
}

// Points, as on the mini-exam (docs/exam-format.md): a question with one
// answer is worth 1 point, each sub-item of a multi-part question 0.25.
// `points` overrides a single-answer total, or for a multi-part question
// the total split over its sub-items. `itemPoints` overrides the value
// of each sub-item: a number for all of them, or an array with one entry
// per sub-item in scoring order. A sub-item that is an object (a
// statement, blank, region, option, item, pair, part) may carry its own
// `points`, which wins over both; the rest share what is left of
// `points`. Essays and self-scored interprets are worth their mark
// scheme.
const DEFAULT_POINTS = 1;
const DEFAULT_ITEM_POINTS = 0.25;
// Mini Exam 2, Problem 1: each circled inline choice is worth 0.1.
const TYPE_ITEM_POINTS = { inlineChoice: 0.1 };
// Types added after Mini Exams 3 and 4, where every problem is worth
// exactly 1 point: the default is that total, split over the sub-items.
const TYPE_TOTAL_POINTS = { matchPairs: 1, groupItems: 1, diagramAnnotate: 1 };

// Each sub-item's own `points` (or undefined), in scoring order. The
// order is the order bodies report their `results` in.
function subItemWeights(question) {
  const own = (list) => (list || []).map((x) => (x && typeof x === 'object' ? x.points : undefined));
  switch (question.type) {
    case 'classify':
      if (!question.columns) return own(question.items);
      // A row's `points` is the value of each of its cells.
      return (question.items || []).flatMap((item) => question.columns.map(() => item?.points));
    case 'inlineChoice': return (question.sentences || []).flatMap((s) => own(s.choices));
    case 'multiSelect': return own(question.options);
    case 'order': return (question.items || []).map(() => undefined);
    case 'fillBlank': return own(question.blanks);
    case 'label': return own(question.hotspots?.regions || question.regions);
    case 'trueFalse': return question.statements ? own(question.statements) : [];
    case 'matchPairs': return own(question.left);
    case 'groupItems': return own(question.items);
    // Two sub-items per part: the site, then the affected regions. A
    // part's `points` is split evenly between them.
    case 'diagramAnnotate':
      return (question.parts || []).flatMap((p) => (p?.points === undefined ? [undefined, undefined] : [p.points / 2, p.points / 2]));
    default: return [];
  }
}

const round3 = (value) => Math.round(value * 1000) / 1000;

// { total, per, items, weights, shown }: `per` is the common sub-item
// value, or null when the weights differ or there are no sub-items;
// `weights` has one entry per sub-item; `shown` is what the points badge
// lists (per part for diagramAnnotate).
export function questionPoints(question) {
  const scheme = question.markScheme || [];
  if (question.type === 'essay' || (question.type === 'interpret' && !question.options && scheme.length)) {
    return { total: question.points || scheme.reduce((sum, m) => sum + m.points, 0), per: null, items: 0, weights: [], shown: [] };
  }
  const explicit = subItemWeights(question);
  const items = explicit.length;
  if (items > 0) {
    const listed = Array.isArray(question.itemPoints) ? question.itemPoints : [];
    const given = explicit.map((w, i) => w ?? listed[i]);
    const open = given.filter((w) => w === undefined).length;
    const fixed = given.reduce((sum, w) => sum + (w ?? 0), 0);
    const total = question.points ?? TYPE_TOTAL_POINTS[question.type];
    let per;
    if (typeof question.itemPoints === 'number') per = question.itemPoints;
    else if (total !== undefined) per = open ? Math.max(0, total - fixed) / open : 0;
    else per = TYPE_ITEM_POINTS[question.type] ?? DEFAULT_ITEM_POINTS;
    const weights = given.map((w) => w ?? per);
    const uniform = weights.every((w) => Math.abs(w - weights[0]) < 1e-9);
    const shown = question.type === 'diagramAnnotate'
      ? (question.parts || []).map((_, i) => weights[2 * i] + weights[2 * i + 1])
      : weights;
    return { total: round3(weights.reduce((a, b) => a + b, 0)), per: uniform ? weights[0] : null, items, weights, shown };
  }
  return { total: question.points ?? DEFAULT_POINTS, per: null, items: 0, weights: [], shown: [] };
}

export function formatPoints(value) {
  return String(round3(value));
}

// "1 point, 4 × 0.25", "1 point, 0.3 + 0.3 + 0.4" or, for many unequal
// sub-items, "1 point, 2 × 0.2 + 6 × 0.1".
function pointsBadge(question) {
  const { total, shown } = questionPoints(question);
  const unit = total === 1 ? 'point' : 'points';
  let split = '';
  if (shown.length) {
    const values = shown.map(formatPoints);
    if (values.every((v) => v === values[0])) split = `${values.length} × ${values[0]}`;
    else if (values.length <= 4) split = values.join(' + ');
    else {
      const counts = new Map();
      values.forEach((v) => counts.set(v, (counts.get(v) || 0) + 1));
      split = [...counts].map(([v, n]) => `${n} × ${v}`).join(' + ');
    }
  }
  return el('span', { class: 'badge badge-points' }, split ? `${formatPoints(total)} ${unit}, ${split}` : `${formatPoints(total)} ${unit}`);
}

// A sub-item's value beside it, as the paper prints "(0.3 points)".
// Shown only when the sub-items of a question are not all worth the same.
function pointsTag(ctx, index) {
  const points = ctx?.points;
  if (!points || points.per !== null || points.shown[index] === undefined) return null;
  return el('span', { class: 'pts-tag' }, `(${formatPoints(points.shown[index])})`);
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

// Paragraphs with a point tag at the end of the last one.
function tagged(text, tag) {
  const frag = paragraphs(text);
  if (!tag) return frag;
  const last = frag.lastElementChild || frag.lastChild;
  if (last && last.nodeType === 1) last.append(' ', tag);
  else frag.append(' ', tag);
  return frag;
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
      onResult: ({ right, total, results }) => {
        if (done) return;
        done = true;
        stage.querySelectorAll('select, button').forEach((n) => { n.disabled = true; });
        report({ correct: right === total, score: right, max: total, results: results.map((r) => r.ok) });
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
    const results = question.regions.map((region, i) => selects[i].value === region.label);
    const right = results.filter(Boolean).length;
    question.regions.forEach((region, i) => {
      const ok = results[i];
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
    report({ correct, score: right, max: question.regions.length, results });
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
    const results = order.map((itemIndex, position) => itemIndex === correctOrder[position]);
    const right = results.filter(Boolean).length;
    results.forEach((ok, position) => list.children[position].classList.add(ok ? 'is-correct' : 'is-incorrect'));
    const correct = right === order.length;
    setFeedback(feedback, correct, correct ? 'The sequence is right.' : `${right} of ${order.length} positions right. The model answer explains why each step follows the last.`);
    checkButton.disabled = true;
    report({ correct, score: right, max: order.length, results });
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
function trueFalseBody(question, report, ctx) {
  if (question.statements) return trueFalseStatementsBody(question, report, ctx);
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
function trueFalseStatementsBody(question, report, ctx) {
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
        el('div', { class: 'tf-text' }, tagged(statement.text, pointsTag(ctx, i))),
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
    const results = rows.map((row, i) => row.choice === question.statements[i].answer);
    const right = results.filter(Boolean).length;
    rows.forEach((row, i) => {
      const statement = question.statements[i];
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
    report({ correct, score: right, max: rows.length, results });
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
    const results = inputs.map((input, i) => matches(input.value, question.blanks?.[i]?.accept || []));
    const right = results.filter(Boolean).length;
    const lines = inputs.map((input, i) => {
      const accepted = question.blanks?.[i]?.accept || [];
      const ok = results[i];
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
    report({ correct, score: right, max: inputs.length, results });
  }

  if (bank) linkPickers(inputs, bank, bankNode);
  return el('div', { class: 'fill' }, [sentence, bankNode, answers, feedback, el('div', { class: 'btn-row' }, [checkButton])]);
}

// Classify: several items share one set of categories; each item gets
// one category, scored per item. Covers the exam's cell-type
// classification, area-to-lobe matching and directional-term
// completion. An item whose text holds ___ gets its picker inline.
// Categories may be used any number of times.
function classifyBody(question, report, ctx) {
  if (question.columns) return classifyTableBody(question, report);
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
          ? el('p', { class: 'classify-text' }, [parts[0], select, parts.slice(1).join('___'), pointsTag(ctx, i)])
          : el('div', { class: 'classify-text' }, tagged(item.text, pointsTag(ctx, i))),
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
    const results = question.items.map((item, i) => selects[i].value === item.answer);
    const right = results.filter(Boolean).length;
    question.items.forEach((item, i) => {
      const ok = results[i];
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
    report({ correct, score: right, max: selects.length, results });
  }

  return el('div', { class: 'classify' }, [bankNode, list, feedback, el('div', { class: 'btn-row' }, [checkButton])]);
}

// Classify as a table, as on Mini Exam 2 (Problem 9, ion movement per
// phase): each item is a row, each entry of `columns` a column, and
// every cell takes one of the shared categories. Scored per cell.
function classifyTableBody(question, report) {
  const bank = normaliseBank(question.categories, { reusable: true });
  const bankNode = renderBank(bank, { title: question.categoriesTitle || 'Categories' });
  const columns = question.columns;
  const cells = [];
  const rows = question.items.map((item, r) => {
    const row = { item, selects: [], notes: [] };
    const tds = columns.map((column, c) => {
      const select = bankSelect(bank, {
        class: 'classify-select',
        'aria-label': `${stripMath(item.text)}, ${stripMath(column)}`,
        onChange: update,
      });
      const note = el('span', { class: 'ct-answer', hidden: true });
      row.selects.push(select);
      row.notes.push(note);
      cells.push({ select, answer: item.answers?.[c], note });
      // The column head repeated in the cell, shown only when the table
      // stacks on narrow screens.
      return el('td', {}, [el('span', { class: 'ct-col-label', 'aria-hidden': 'true' }, column), select, note]);
    });
    row.explain = el('tr', { class: 'ct-explain', hidden: true }, [
      el('td', { colspan: columns.length + 1 }, [el('span', { class: 'num' }, `${LETTERS[r]}) `), item.explanation || '']),
    ]);
    row.node = el('tr', {}, [el('th', { scope: 'row' }, [el('span', { class: 'num' }, `${LETTERS[r]}) `), item.text]), ...tds]);
    return row;
  });
  const table = el('div', { class: 'classify-table-wrap' }, [
    el('table', { class: 'classify-table' }, [
      el('thead', {}, [el('tr', {}, [
        el('th', { scope: 'col' }, question.rowHeader || ''),
        ...columns.map((column) => el('th', { scope: 'col' }, column)),
      ])]),
      el('tbody', {}, rows.flatMap((row) => [row.node, row.explain])),
    ]),
  ]);
  const feedback = feedbackBanner();
  const checkButton = el('button', { type: 'button', class: 'btn btn-primary', disabled: true, onClick: check }, 'Check');
  let done = false;

  function update() {
    checkButton.disabled = done || !cells.every((c) => c.select.value);
  }
  function check() {
    if (done || !cells.every((c) => c.select.value)) return;
    done = true;
    const results = cells.map((cell) => cell.select.value === cell.answer);
    const right = results.filter(Boolean).length;
    cells.forEach((cell, i) => {
      const ok = results[i];
      cell.select.classList.add(ok ? 'is-correct' : 'is-incorrect');
      cell.select.disabled = true;
      if (!ok) {
        cell.note.hidden = false;
        cell.note.textContent = `Answer: ${cell.answer}`;
      }
    });
    rows.forEach((row) => { if (row.item.explanation) row.explain.hidden = false; });
    checkButton.disabled = true;
    const correct = right === cells.length;
    setFeedback(feedback, correct, correct
      ? 'Every cell is right.'
      : `${right} of ${cells.length} cells right. The answer is under each wrong cell, the reason under each row.`);
    report({ correct, score: right, max: cells.length, results });
  }

  return el('div', { class: 'classify' }, [bankNode, table, feedback, el('div', { class: 'btn-row' }, [checkButton])]);
}

// Inline choice, as on Mini Exam 2 (Problem 1, "circle the right
// answer"): sentences with two to four choices embedded where their
// text holds ___. Options stay in authored order, as printed on the
// paper. Scored per choice (0.1 each by default).
function inlineChoiceBody(question, report) {
  const groups = [];
  const rows = question.sentences.map((sentence, s) => {
    const parts = String(sentence.text).split('___');
    const text = el('p', { class: 'ic-text' });
    parts.forEach((part, k) => {
      text.append(part);
      if (k === parts.length - 1) return;
      const choice = sentence.choices?.[k] || { options: [] };
      const group = { choice, picked: null, buttons: [] };
      group.buttons = choice.options.map((option, i) =>
        el('button', { type: 'button', class: 'ic-option', 'aria-pressed': 'false', onClick: () => pick(group, i) }, option)
      );
      const inner = [];
      group.buttons.forEach((b, i) => {
        if (i) inner.push(el('span', { class: 'ic-sep', 'aria-hidden': 'true' }, ' / '));
        inner.push(b);
      });
      text.append(el('span', { class: 'ic-group', role: 'group', 'aria-label': `Sentence ${LETTERS[s]}, choice ${k + 1}` }, [
        el('span', { 'aria-hidden': 'true' }, '('), ...inner, el('span', { 'aria-hidden': 'true' }, ')'),
      ]));
      groups.push(group);
    });
    const explanation = el('p', { class: 'label-explanation', hidden: true });
    return { sentence, explanation, node: el('li', {}, [el('span', { class: 'num' }, `${LETTERS[s]})`), el('div', {}, [text, explanation])]) };
  });
  const feedback = feedbackBanner();
  const checkButton = el('button', { type: 'button', class: 'btn btn-primary', disabled: true, onClick: check }, 'Check');
  let done = false;

  function pick(group, index) {
    if (done) return;
    group.picked = index;
    group.buttons.forEach((b, i) => {
      b.classList.toggle('is-selected', i === index);
      b.setAttribute('aria-pressed', i === index ? 'true' : 'false');
    });
    checkButton.disabled = !groups.every((g) => g.picked !== null);
  }
  function check() {
    if (done || !groups.every((g) => g.picked !== null)) return;
    done = true;
    const results = groups.map((group) => group.picked === group.choice.answer);
    const right = results.filter(Boolean).length;
    groups.forEach((group) => {
      group.buttons.forEach((b, i) => {
        b.disabled = true;
        b.classList.remove('is-selected');
        if (i === group.choice.answer) b.classList.add('is-correct');
        else if (i === group.picked) b.classList.add('is-incorrect');
      });
    });
    rows.forEach((row) => {
      if (!row.sentence.explanation) return;
      row.explanation.hidden = false;
      row.explanation.textContent = row.sentence.explanation;
    });
    checkButton.disabled = true;
    const correct = right === groups.length;
    setFeedback(feedback, correct, correct
      ? 'Every choice is right.'
      : `${right} of ${groups.length} choices right. The right option is marked in each bracket.`);
    report({ correct, score: right, max: groups.length, results });
  }

  return el('div', { class: 'inline-choice' }, [
    el('ol', { class: 'item-list' }, rows.map((r) => r.node)),
    feedback,
    el('div', { class: 'btn-row' }, [checkButton]),
  ]);
}

// Multiple select, as on Mini Exam 2 (Problems 5 to 8, "which
// statements are correct?"): any number of the options may be correct
// and the count is not shown. Scored per option: an option is right
// when it is ticked and correct, or left blank and incorrect. Options
// are shuffled with the same stable seed as mc.
function multiSelectBody(question, report, { seed } = {}) {
  const order = seededOrder(question.options.length, seed ?? question.id);
  const rows = [];
  const list = el('ul', { class: 'options ms-options' }, order.map((index) => {
    const option = question.options[index];
    const id = `${question.id}-ms-${index}`;
    const box = el('input', { type: 'checkbox', id, onChange: update });
    const verdict = el('span', { class: 'option-feedback', hidden: true });
    const label = el('label', { class: 'option ms-option', for: id }, [box, el('span', { class: 'ms-text' }, [option.text, verdict])]);
    rows.push({ option, index, box, label, verdict });
    return el('li', {}, label);
  }));
  const feedback = feedbackBanner();
  const checkButton = el('button', { type: 'button', class: 'btn btn-primary', disabled: true, onClick: check }, 'Check');
  let done = false;

  function update() {
    rows.forEach((r) => r.label.classList.toggle('is-selected', r.box.checked));
    checkButton.disabled = done || !rows.some((r) => r.box.checked);
  }
  function check() {
    if (done || !rows.some((r) => r.box.checked)) return;
    done = true;
    const results = new Array(question.options.length).fill(false);
    let right = 0;
    rows.forEach((r) => {
      const truth = r.option.correct === true;
      const ok = r.box.checked === truth;
      results[r.index] = ok;
      if (ok) right += 1;
      r.box.disabled = true;
      r.label.classList.remove('is-selected');
      r.label.classList.add(ok ? 'is-correct' : 'is-incorrect');
      r.verdict.hidden = false;
      r.verdict.replaceChildren(
        el('span', { class: 'block-tag' }, truth ? 'Correct statement. ' : 'Incorrect statement. '),
        r.option.feedback || ''
      );
    });
    checkButton.disabled = true;
    const correct = right === rows.length;
    setFeedback(feedback, correct, correct
      ? 'Every statement judged right.'
      : `${right} of ${rows.length} statements judged right. Each one now says whether it is correct and why.`);
    report({ correct, score: right, max: rows.length, results });
  }

  return el('div', { class: 'multi-select' }, [
    el('p', { class: 'muted ms-hint' }, 'Tick every correct statement.'),
    list,
    feedback,
    el('div', { class: 'btn-row' }, [checkButton]),
  ]);
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

// Match pairs, as on Mini Exam 4 (Problem 7, stimulation conditions to
// spike-response patterns, both as pictures; Problems 1 and 10,
// functions to rods or cones and descriptions to cell types) and Mini
// Exam 3 (Problem 1, terms to descriptions). `right` holds the targets,
// lettered A, B, C in authored order; each entry of `left` is numbered
// and gets a picker of those letters. Either side may be text or
// figures. Each target answers one item unless `reusable` is set.
// Scored per left item.
function matchPairsBody(question, report, ctx) {
  const left = question.left || [];
  const right = question.right || [];
  const reusable = question.reusable === true;
  const letter = (i) => LETTERS[i].toUpperCase();
  const index = new Map(right.map((r, i) => [r.id, i]));
  const name = (id) => {
    const i = index.get(id);
    if (i === undefined) return id;
    return right[i].text ? `${letter(i)}: ${stripMath(right[i].text)}` : letter(i);
  };
  const gallery = (list) => list.some((x) => x.figure);
  const card = (item, key, extra = []) => el('li', { class: 'mp-card' }, [
    el('span', { class: 'mp-key' }, key),
    item.figure ? renderVisual(item.figure) : null,
    item.text ? el('div', { class: 'mp-text' }, paragraphs(item.text)) : null,
    ...extra,
  ]);

  const targets = right.map((r, i) => card(r, letter(i)));
  const targetBox = el('div', { class: 'mp-targets-wrap' }, [
    el('p', { class: 'block-kicker' }, question.rightTitle || 'Choices'),
    el('ol', { class: `mp-targets ${gallery(right) ? 'mp-gallery' : 'mp-list'}` }, targets),
    el('p', { class: 'bank-rule muted' }, reusable ? 'Each may be used more than once.' : 'Each is used at most once.'),
  ]);

  const selects = [];
  const notes = [];
  const items = left.map((item, i) => {
    const select = el('select', { class: 'classify-select mp-select', 'aria-label': `Match for item ${i + 1}`, onChange: update }, [
      el('option', { value: '' }, 'Choose'),
      ...right.map((r) => el('option', { value: r.id }, name(r.id))),
    ]);
    const note = el('p', { class: 'label-explanation', hidden: true });
    selects.push(select);
    notes.push(note);
    return card(item, String(i + 1), [el('div', { class: 'mp-pick' }, [select, pointsTag(ctx, i)]), note]);
  });
  const itemBox = el('div', { class: 'mp-items-wrap' }, [
    question.leftTitle ? el('p', { class: 'block-kicker' }, question.leftTitle) : null,
    el('ol', { class: `mp-items ${gallery(left) ? 'mp-gallery' : 'mp-list'}` }, items),
  ]);

  const feedback = feedbackBanner();
  const checkButton = el('button', { type: 'button', class: 'btn btn-primary', disabled: true, onClick: check }, 'Check');
  let done = false;

  function update() {
    const used = new Set(selects.map((s) => s.value).filter(Boolean));
    targets.forEach((t, i) => t.classList.toggle('is-used', !reusable && used.has(right[i].id)));
    checkButton.disabled = done || !selects.every((s) => s.value);
  }
  function check() {
    if (done || !selects.every((s) => s.value)) return;
    done = true;
    const results = left.map((item, i) => selects[i].value === item.answer);
    results.forEach((ok, i) => {
      selects[i].classList.add(ok ? 'is-correct' : 'is-incorrect');
      selects[i].disabled = true;
      items[i].classList.add(ok ? 'is-correct' : 'is-incorrect');
      const line = (ok ? '' : `Answer: ${name(left[i].answer)}. `) + (left[i].explanation || '');
      if (line) {
        notes[i].hidden = false;
        notes[i].textContent = line;
      }
    });
    targets.forEach((t) => t.classList.remove('is-used'));
    const right_ = results.filter(Boolean).length;
    checkButton.disabled = true;
    const correct = right_ === results.length;
    setFeedback(feedback, correct, correct
      ? 'Every pair is right.'
      : `${right_} of ${results.length} pairs right. The answer is under each wrong one.`);
    report({ correct, score: right_, max: results.length, results });
  }

  if (!reusable) linkPickers(selects, right.map((r) => ({ text: r.id, reusable: false })), null);
  return el('div', { class: 'match-pairs' }, [targetBox, itemBox, feedback, el('div', { class: 'btn-row' }, [checkButton])]);
}

// Group items, as on Mini Exam 3 (Problem 7: sort eight
// neurotransmitters into inhibitory, excitatory or both, glutamate and
// GABA worth 0.2, the rest 0.1). Two or three named groups; each item
// gets one group from a row of buttons and appears in that group's bin
// as it is placed. Scored per item; `points` on an item weights it.
function groupItemsBody(question, report, ctx) {
  const groups = (question.groups || []).map((g) => (typeof g === 'string' ? { label: g } : g));
  const binLists = groups.map(() => el('ul', { class: 'gi-bin-items' }));
  const bins = el('div', { class: 'gi-bins' }, groups.map((g, k) => el('div', { class: 'gi-bin' }, [
    el('p', { class: 'block-kicker' }, g.label),
    g.description ? el('p', { class: 'gi-bin-note muted' }, g.description) : null,
    binLists[k],
  ])));

  let done = false;
  const rows = (question.items || []).map((item, i) => {
    const row = { item, choice: null };
    row.buttons = groups.map((g, k) =>
      el('button', { type: 'button', class: 'option gi-option', 'aria-pressed': 'false', onClick: () => pick(row, k) }, g.label)
    );
    row.note = el('p', { class: 'label-explanation', hidden: true });
    row.node = el('li', {}, [
      el('span', { class: 'num' }, `${LETTERS[i]})`),
      el('div', {}, [
        el('div', { class: 'gi-text' }, tagged(item.text, pointsTag(ctx, i))),
        el('div', { class: 'gi-options', role: 'group', 'aria-label': `Group for item ${LETTERS[i]}` }, row.buttons),
        row.note,
      ]),
    ]);
    return row;
  });
  const feedback = feedbackBanner();
  const checkButton = el('button', { type: 'button', class: 'btn btn-primary', disabled: true, onClick: check }, 'Check');

  // The bins show where each item has been put, as chips.
  function drawBins(results) {
    binLists.forEach((list, k) => list.replaceChildren(...rows
      .map((row, i) => ({ row, i }))
      .filter(({ row }) => row.choice === k)
      .map(({ row, i }) => el('li', { class: `gi-chip${results ? (results[i] ? ' is-correct' : ' is-incorrect') : ''}` }, [
        el('span', { class: 'num' }, `${LETTERS[i]})`),
        ' ',
        paragraphs(row.item.text).textContent,
      ]))));
  }
  function pick(row, k) {
    if (done) return;
    row.choice = k;
    row.buttons.forEach((b, j) => {
      b.classList.toggle('is-selected', j === k);
      b.setAttribute('aria-pressed', j === k ? 'true' : 'false');
    });
    drawBins();
    checkButton.disabled = !rows.every((r) => r.choice !== null);
  }
  function check() {
    if (done || !rows.every((r) => r.choice !== null)) return;
    done = true;
    const results = rows.map((row) => groups[row.choice].label === row.item.group);
    rows.forEach((row, i) => {
      row.buttons.forEach((b, k) => {
        b.disabled = true;
        b.classList.remove('is-selected');
        if (groups[k].label === row.item.group) b.classList.add('is-correct');
        else if (k === row.choice) b.classList.add('is-incorrect');
      });
      const line = (results[i] ? '' : `Answer: ${row.item.group}. `) + (row.item.explanation || '');
      if (line) {
        row.note.hidden = false;
        row.note.textContent = line;
      }
    });
    drawBins(results);
    checkButton.disabled = true;
    const right = results.filter(Boolean).length;
    const correct = right === results.length;
    setFeedback(feedback, correct, correct
      ? 'Every item is in the right group.'
      : `${right} of ${results.length} items in the right group. The answer is under each wrong one.`);
    report({ correct, score: right, max: results.length, results });
  }

  return el('div', { class: 'group-items' }, [
    bins,
    el('ol', { class: 'item-list gi-items' }, rows.map((r) => r.node)),
    feedback,
    el('div', { class: 'btn-row' }, [checkButton]),
  ]);
}

// Diagram annotate, as on Mini Exam 4 (Problem 2: mark each lesion on the
// visual pathway diagram, then shade the part of the visual field it
// costs). Each part has two stages: pick the site on the `site` hotspot
// figure (numbered markers, labels hidden), then pick every affected
// region, on the `affected.figure` hotspot figure or from
// `affected.options`. Stage two opens once a site is picked. Scored per
// stage, so a part is two sub-items worth half its points each.
function diagramAnnotateBody(question, report, ctx) {
  const affected = question.affected || {};
  const choices = affected.figure ? affected.figure.regions || [] : affected.options || [];
  const labelOf = new Map(choices.map((c) => [c.id, c.label ?? c.text]));
  const siteRegions = question.site?.regions || [];
  const siteLabel = new Map(siteRegions.map((r) => [r.id, r.label]));
  const multiple = affected.multiple ?? (Boolean(affected.figure) || (question.parts || []).some((p) => (p.affected || []).length !== 1));
  let done = false;

  function keys(event, i, markers) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') { event.preventDefault(); rove(markers, i, 1, event); }
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') { event.preventDefault(); rove(markers, i, -1, event); }
  }

  const parts = (question.parts || []).map((part, k) => {
    const state = { part, site: null, picked: new Set() };

    // Stage 1: the site.
    const siteFig = buildFigure(question.site, {
      onPick: (id) => pickSite(id),
      onKey: (event, i) => keys(event, i, siteFig.markers),
    });
    siteFig.markers.forEach((m, id) => {
      m.setAttribute('aria-pressed', 'false');
      m.setAttribute('aria-label', `Site ${[...siteFig.markers.keys()].indexOf(id) + 1}`);
    });
    const siteRead = el('p', { class: 'da-readout muted', 'aria-live': 'polite' }, 'No site marked yet.');
    function pickSite(id) {
      if (done) return;
      state.site = id;
      siteRegions.forEach((r, i) => {
        siteFig.setState(r.id, r.id === id ? 'active' : null);
        siteFig.markers.get(r.id).setAttribute('aria-pressed', r.id === id ? 'true' : 'false');
        if (r.id === id) siteRead.textContent = `Site marked: ${i + 1}.`;
      });
      unlock();
      update();
    }

    // Stage 2: the affected regions.
    const inputs = new Map();
    const optionList = el('ul', { class: 'da-options' }, choices.map((c, i) => {
      const id = `${question.id}-p${k}-${c.id}`;
      const input = el('input', {
        type: multiple ? 'checkbox' : 'radio',
        name: `${question.id}-p${k}`,
        id,
        disabled: true,
        onChange: () => toggle(c.id, input.checked),
      });
      inputs.set(c.id, input);
      return el('li', {}, el('label', { for: id, class: 'da-option' }, [
        input,
        affected.figure ? el('span', { class: 'hotspots-num' }, String(i + 1)) : null,
        el('span', {}, c.label ?? c.text),
      ]));
    }));
    let fieldFig = null;
    if (affected.figure) {
      fieldFig = buildFigure({ ...affected.figure, showShapes: affected.figure.showShapes ?? true }, {
        onPick: (id) => { if (!inputs.get(id).disabled) toggle(id, !state.picked.has(id)); },
        onKey: (event, i) => keys(event, i, fieldFig.markers),
      });
      fieldFig.markers.forEach((m, id) => m.setAttribute('aria-label', labelOf.get(id) || id));
      // Regions drawn in SVG markup (data-region="<id>") can be clicked too.
      fieldFig.figure.addEventListener('click', (event) => {
        const node = event.target.closest?.('.hotspots-figure [data-region]');
        const id = node?.dataset.region;
        if (id && inputs.has(id) && !inputs.get(id).disabled) toggle(id, !state.picked.has(id));
      });
    }
    // A region drawn in the figure's own SVG is shaded there; otherwise
    // the overlay shape is filled.
    const drawn = new Set(fieldFig
      ? [...fieldFig.figure.querySelectorAll('.hotspots-figure > svg:not(.hotspots-overlay) [data-region]')].map((n) => n.dataset.region)
      : []);
    function shade(id, cls, on) {
      fieldFig?.figure.querySelectorAll(`[data-region="${id}"]`).forEach((n) => {
        if (n.classList.contains('hotspot-shape') && drawn.has(id)) return;
        n.classList.toggle(cls, on);
      });
    }
    function toggle(id, on) {
      if (done) return;
      if (!multiple) {
        state.picked.forEach((other) => { shade(other, 'is-chosen', false); inputs.get(other).checked = false; });
        state.picked.clear();
      }
      if (on) state.picked.add(id); else state.picked.delete(id);
      inputs.get(id).checked = on;
      shade(id, 'is-chosen', on);
      update();
    }
    const stage2 = el('div', { class: 'da-stage is-locked' }, [
      el('p', { class: 'block-kicker' }, question.affectedLabel || (multiple ? '2. Pick every affected region' : '2. Pick the result')),
      fieldFig ? el('div', { class: 'hotspots is-stack da-figure' }, [fieldFig.figure]) : null,
      optionList,
      el('p', { class: 'da-hint muted' }, 'Mark the site first.'),
    ]);
    function unlock() {
      stage2.classList.remove('is-locked');
      inputs.forEach((input) => { input.disabled = false; });
    }

    const note = el('div', { class: 'da-result', hidden: true });
    state.check = () => {
      const want = new Set(part.affected || []);
      const siteOk = state.site === part.site;
      const setOk = want.size === state.picked.size && [...want].every((id) => state.picked.has(id));
      siteRegions.forEach((r) => {
        siteFig.setState(r.id, r.id === part.site ? 'correct' : r.id === state.site ? 'incorrect' : null);
      });
      siteFig.markers.forEach((m) => { m.disabled = true; });
      choices.forEach((c) => {
        const chosen = state.picked.has(c.id);
        const needed = want.has(c.id);
        const cls = chosen && needed ? 'is-correct' : chosen ? 'is-incorrect' : needed ? 'is-missed' : null;
        shade(c.id, 'is-chosen', false);
        ['is-correct', 'is-incorrect', 'is-missed'].forEach((x) => shade(c.id, x, x === cls));
        const input = inputs.get(c.id);
        input.disabled = true;
        input.closest('label').classList.toggle('is-correct', cls === 'is-correct');
        input.closest('label').classList.toggle('is-incorrect', cls === 'is-incorrect' || cls === 'is-missed');
      });
      fieldFig?.markers.forEach((m) => { m.disabled = true; });
      const lines = [
        siteOk ? 'Site: right.' : `Site: ${siteLabel.get(part.site) || part.site}.`,
        setOk ? 'Affected: right.' : `Affected: ${[...want].map((id) => labelOf.get(id) || id).join('; ') || 'nothing'}.`,
        part.explanation || '',
      ].filter(Boolean);
      note.hidden = false;
      note.replaceChildren(...lines.map((line) => el('p', {}, line)));
      return [siteOk, setOk];
    };
    state.ready = () => state.site !== null && state.picked.size > 0;
    state.node = el('li', { class: 'da-part' }, [
      el('p', { class: 'da-part-title' }, [el('span', { class: 'num' }, `${LETTERS[k]})`), ' ', part.text, ' ', pointsTag(ctx, k)]),
      el('div', { class: 'da-stages' }, [
        el('div', { class: 'da-stage' }, [
          el('p', { class: 'block-kicker' }, question.siteLabel || '1. Mark the site'),
          el('div', { class: 'hotspots is-stack da-figure' }, [siteFig.figure]),
          siteRead,
        ]),
        stage2,
      ]),
      note,
    ]);
    return state;
  });

  const feedback = feedbackBanner();
  const checkButton = el('button', { type: 'button', class: 'btn btn-primary', disabled: true, onClick: check }, 'Check');
  function update() {
    checkButton.disabled = done || !parts.every((p) => p.ready());
  }
  function check() {
    if (done || !parts.every((p) => p.ready())) return;
    done = true;
    const results = parts.flatMap((p) => p.check());
    const right = results.filter(Boolean).length;
    checkButton.disabled = true;
    const correct = right === results.length;
    setFeedback(feedback, correct, correct
      ? 'Every site and every affected region is right.'
      : `${right} of ${results.length} stages right. Each part says what it should have been.`);
    report({ correct, score: right, max: results.length, results });
  }

  return el('div', { class: 'diagram-annotate' }, [
    el('ol', { class: 'da-parts' }, parts.map((p) => p.node)),
    feedback,
    el('div', { class: 'btn-row' }, [checkButton]),
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
  inlineChoice: inlineChoiceBody,
  multiSelect: multiSelectBody,
  matchPairs: matchPairsBody,
  groupItems: groupItemsBody,
  diagramAnnotate: diagramAnnotateBody,
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

  // Multi-part bodies report `results`, one boolean per sub-item in
  // scoring order, each worth its weight. The others report in their own
  // units (1 or 0, or mark-scheme points), scaled to the question's points.
  const points = questionPoints(question);
  let reported = false;
  function report(raw) {
    if (reported) return;
    reported = true;
    let score;
    if (Array.isArray(raw.results) && points.weights.length === raw.results.length) {
      score = raw.results.reduce((sum, ok, i) => sum + (ok ? points.weights[i] : 0), 0);
    } else {
      score = raw.max ? raw.score * (points.total / raw.max) : 0;
    }
    const result = { correct: raw.correct, score: round3(score), max: points.total };
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
  // A figure to read while answering (the membrane picture of a table
  // classify). Interpret and label draw their own.
  if (question.figure && question.type !== 'interpret' && question.type !== 'label') card.appendChild(renderVisual(question.figure));
  card.appendChild(build(question, report, { seed: `${lectureId}:${question.id}`, points }));
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
    inlineChoice: 'Circle the right answer',
    multiSelect: 'Select all correct',
    matchPairs: 'Match the pairs',
    groupItems: 'Sort into groups',
    diagramAnnotate: 'Mark the diagram',
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
    el('p', { class: 'muted' }, `${total} questions worth ${formatPoints(questions.reduce((sum, q) => sum + questionPoints(q).total, 0))} points, easy first, then medium, then hard. Points follow the mini-exam: 1 per single answer, 0.25 per sub-item, 0.1 per inline choice, unless a question is weighted as on the paper. Answer before you reveal.`),
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
