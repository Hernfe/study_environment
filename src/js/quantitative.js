import { el, paragraphs } from './dom.js';
import { getPracticeState, savePracticeState } from './progress.js';
import { renderTex } from './math.js';
import { checkQuantity, evaluateRelation } from './numeric.js';

const button = (text, action) => el('button', { type: 'button', class: 'btn', onClick: action }, text);
const disclosure = (title, body) => el('details', { class: 'reveal' }, [el('summary', {}, title), el('div', { class: 'reveal-body' }, body)]);

// A complete equation is a display block, not an unbreakable prose span.
// Keep ordinary mixed text/inline maths on the established paragraph path.
function workedAnswerBlocks(answer) {
  return (Array.isArray(answer) ? answer : [answer]).flatMap((line) => {
    const match = typeof line === 'string' && line.trim().match(/^\$([^$]+)\$$/);
    if (!match) return paragraphs(line);
    const equation = renderTex(match[1], { display: true });
    equation.tabIndex = 0;
    equation.setAttribute('role', 'group');
    equation.setAttribute('aria-label', 'Worked equation');
    return [equation];
  });
}

export function renderFormulaReference(equations, note) {
  if (!equations?.length) return null;
  const details = disclosure('Provided exam equation sheet', [
    note ? el('p', { class: 'muted' }, note) : null,
    el('p', { class: 'muted' }, 'Long equations scroll horizontally. Focus an equation and use the arrow keys.'),
    ...equations.map((tex, i) => {
      const equation = renderTex(tex, { display: true });
      equation.tabIndex = 0;
      equation.setAttribute('role', 'group');
      equation.setAttribute('aria-label', `Equation ${i + 1}`);
      return equation;
    }),
  ]);
  details.classList.add('formula-reference');
  return details;
}

export function renderHints(hints = [], onHint = () => {}) {
  return el('div', { class: 'progressive-hints' }, hints.map((hint, i) => {
    const details = disclosure(`Hint ${i + 1}`, paragraphs(hint.body ?? hint));
    details.addEventListener('toggle', () => { if (details.open) onHint(i + 1); });
    return details;
  }));
}

// Each structured field has its own quantity and unit. A substitution is
// entered as operands rather than compared with an exact expression string.
export function renderCheckedStages(question, report, { onHint = () => {}, restore = {}, save = () => {} } = {}) {
  const stages = question.stages || [];
  const state = structuredClone(restore);
  const statuses = [];
  let firstWrong = Boolean(state.firstWrong);
  // A restored completion has already reported. Rechecking unchanged work must
  // not overwrite its hint-assisted/missed review result after a reload.
  let reported = stages.length > 0 && stages.every((_, i) => state[i]?.checked === true);
  const root = el('div', { class: 'checked-stages' });
  stages.forEach((stage, i) => {
    const answers = stage.fields || (stage.answer ? [{ label: 'Result', answer: stage.answer }] : []);
    const fields = answers.map((field, k) => {
      const input = el('input', { type: 'text', inputmode: 'decimal', 'aria-label': `${stage.title}: ${field.label}`, value: state[i]?.values?.[k] || '' });
      input.addEventListener('input', () => {
        reported = false;
        statuses[i] = false;
        state[i] = { values: fields.map((f) => f.input.value), checked: false };
        save(state);
      });
      return { input, field };
    });
    const selected = el('select', { 'aria-label': stage.title }, [el('option', { value: '' }, 'Choose a relation'), ...(stage.choices || []).map((c, k) => el('option', { value: k }, c.label))]);
    if (state[i]?.choice !== undefined) selected.value = state[i].choice;
    selected.addEventListener('change', () => { reported = false; statuses[i] = false; state[i] = { choice: selected.value, checked: false }; save(state); });
    const solution = stage.modelAnswer ? disclosure('Show this stage solution', workedAnswerBlocks(stage.modelAnswer)) : null;
    if (solution) solution.hidden = !state[i]?.attempted;
    const feedback = el('p', { role: 'status', class: 'feedback', hidden: true });
    const check = () => {
      const results = stage.choices ? [{ correct: selected.value !== '' && Number(selected.value) === stage.correct }] : fields.map(({ input, field }) => checkQuantity(input.value, field.answer));
      const valid = stage.choices ? selected.value !== '' : !results.some((r) => r.error);
      const ok = valid && results.length > 0 && results.every((r) => r.correct);
      if (valid && !ok) { firstWrong = true; state.firstWrong = true; }
      statuses[i] = ok;
      state[i] = { values: fields.map((f) => f.input.value), choice: selected.value, checked: ok, attempted: valid };
      if (solution && valid) solution.hidden = false;
      save(state);
      feedback.hidden = false;
      feedback.className = `feedback ${ok ? 'is-correct' : 'is-incorrect'}`;
      const value = results[0]?.value;
      const error = (stage.commonErrors || []).find((e) => Number.isFinite(value) && Math.abs(value - e.wrongValue) <= (e.tolerance ?? stage.answer?.tolerance ?? 0));
      feedback.textContent = ok ? `Correct. ${stage.feedback || 'Continue to the next stage.'}` : results.find((r) => r.error)?.error || error?.why || stage.error || 'Not quite. Check the relation, sign and units, then retry.';
      if (statuses.every(Boolean) && statuses.length === stages.length && !reported) {
        reported = true;
        report({ correct: !firstWrong, score: firstWrong ? 0 : 1, max: 1 });
      }
    };
    statuses[i] = state[i]?.checked === true;
    const section = el('fieldset', { class: 'calculation-stage' }, [
      el('legend', {}, `${i + 1}. ${stage.title}`),
      stage.prompt ? paragraphs(stage.prompt) : null,
      stage.tex ? renderTex(stage.tex, { display: true }) : null,
      stage.choices ? selected : fields.map(({ input, field }) => el('label', { class: 'quantity-field' }, [field.label, ' ', input, ' ', field.answer.unit || ''])),
      button('Check stage', check), feedback,
      solution,
    ]);
    fields.forEach(({ input }) => input.addEventListener('keydown', (event) => { if (event.key === 'Enter') { event.preventDefault(); check(); } }));
    root.append(section);
  });
  if (!stages.length) root.append(el('p', { class: 'notice' }, 'No checked stages authored.'));
  return root;
}

export function renderWritten(question, report, { restore = {}, save = () => {} } = {}) {
  const text = el('textarea', { class: 'essay-input', 'aria-label': 'Your written answer', placeholder: 'Write your answer before opening the model. Sketch on paper when requested.' });
  text.value = restore.text || '';
  const saved = () => save({ text: text.value, reviewed: boxes.map((b) => b.checked) });
  text.addEventListener('input', saved);
  const boxes = (question.markScheme || []).map((item, i) => el('input', { type: 'checkbox', checked: restore.reviewed?.[i], onChange: saved }));
  const status = el('p', { role: 'status' });
  const criteria = disclosure('Model answer and self-review criteria', [
    el('div', {}, workedAnswerBlocks(question.modelAnswer)),
    el('p', { class: 'muted' }, 'Self-assessment only. The site does not evaluate the meaning of your writing.'),
    ...(question.markScheme || []).map((item, i) => el('label', { class: 'quantity-field' }, [boxes[i], item.text])),
    button('Record self-review', () => {
      if (!text.value.trim()) { status.textContent = 'Write an answer first.'; return; }
      const earned = boxes.filter((b) => b.checked).length;
      status.textContent = `Self-reviewed: ${earned} of ${boxes.length} practice criteria met.`;
      report({ correct: earned === boxes.length, score: earned, max: boxes.length, selfReviewed: true });
      saved();
    }),
  ]);
  criteria.querySelector('summary').addEventListener('click', (event) => {
    if (!text.value.trim()) {
      event.preventDefault();
      status.textContent = 'Write an answer before opening the model.';
      text.focus();
    }
  });
  return el('div', { class: 'written-practice' }, [text, status, criteria]);
}

// A caller may place drills after its easy concept checks without rebuilding them.
export function renderFormula(formula, { drills, includeDrill = true } = {}) {
  const panel = el('div', { class: 'symbol-description', role: 'status' }, 'Focus or tap a symbol to read its meaning.');
  let inlineTargets = [];
  const targets = formula.symbols.map((symbol, i) => {
    const show = () => {
      targets.forEach((target, j) => target.classList.toggle('is-active', i === j));
      inlineTargets.forEach((target) => target.classList.toggle('is-active', Number(target.dataset.symbol) === i));
      panel.replaceChildren(...[el('p', {}, symbol.name), el('p', {}, `Unit: ${symbol.unit || 'dimensionless'}`), paragraphs(symbol.meaning), symbol.convention ? paragraphs(symbol.convention) : null].filter(Boolean));
    };
    return el('button', { type: 'button', class: 'formula-symbol', 'aria-label': symbol.name, onFocus: show, onClick: show, onMouseenter: show, onKeydown: (e) => {
      const offset = ['ArrowRight', 'ArrowDown'].includes(e.key) ? 1 : ['ArrowLeft', 'ArrowUp'].includes(e.key) ? -1 : 0;
      if (offset) { e.preventDefault(); targets[(i + offset + targets.length) % targets.length].focus(); }
    } }, renderTex(symbol.tex));
  });
  const live = el('div');
  if (formula.interactive) {
    const spec = formula.interactive;
    const values = { ...spec.constants };
    const output = el('p', { role: 'status' });
    const equation = el('div');
    const update = () => {
      const value = evaluateRelation(spec.relation, values);
      output.textContent = `${spec.outputLabel}: ${Number.isFinite(value) ? value.toPrecision(4) : 'Outside formula domain'} ${spec.unit || ''}`;
      const substitutions = spec.substitution
        ? spec.substitution.replace(/\{\{([A-Za-z]+)\}\}/g, (_, key) => String(values[key]))
        : (spec.inputs || []).map((p) => `${p.symbolTex || p.key}=${values[p.key]}`).join(',\\quad ');
      equation.replaceChildren(renderTex(substitutions, { display: true }));
    };
    spec.inputs.forEach((p) => {
      values[p.key] = p.value;
      const readout = el('span', {}, `${p.value} ${p.unit || ''}`);
      const input = el('input', { type: 'range', min: p.min, max: p.max, step: p.step, value: p.value, 'aria-label': p.label, onInput: (e) => { values[p.key] = Number(e.target.value); readout.textContent = `${e.target.value} ${p.unit || ''}`; update(); } });
      live.append(el('label', { class: 'quantity-field' }, [p.label, input, readout]));
    });
    live.append(output, equation); update();
  }
  const inlineEquation = formula.interactiveTex ? renderTex(formula.interactiveTex, { display: true, symbolClasses: true }) : null;
  if (inlineEquation) {
    inlineEquation.classList.add('interactive-equation');
    inlineEquation.querySelector('.katex-html')?.removeAttribute('aria-hidden');
    inlineEquation.querySelector('.katex-mathml')?.setAttribute('aria-hidden', 'true');
    inlineTargets = [...inlineEquation.querySelectorAll('[class*=formula-term-]')];
    inlineTargets.forEach((target, index) => {
      const i = Number(target.className.match(/formula-term-(\d+)/)[1]);
      target.dataset.symbol = i; target.tabIndex = 0; target.setAttribute('role', 'button'); target.setAttribute('aria-label', formula.symbols[i].name);
      const show = () => targets[i].click();
      target.addEventListener('focus', show); target.addEventListener('mouseenter', show); target.addEventListener('click', show);
      target.addEventListener('keydown', (event) => {
        const direction = ['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : ['ArrowLeft', 'ArrowUp'].includes(event.key) ? -1 : 0;
        if (direction) { event.preventDefault(); inlineTargets[(index + direction + inlineTargets.length) % inlineTargets.length].focus(); }
        if (['Enter', ' '].includes(event.key)) { event.preventDefault(); show(); }
      });
    });
  }
  const expression = inlineEquation || (formula.tokens
    ? el('div', { class: 'formula-symbols formula-expression', 'aria-label': formula.name }, formula.tokens.map((token) => token.symbol !== undefined ? targets[token.symbol] : renderTex(token.tex)))
    : el('div', {}, [renderTex(formula.tex, { display: true }), el('div', { class: 'formula-symbols', 'aria-label': 'Formula symbols' }, targets)]));
  const drillNode = includeDrill && formula.drill ? renderFormulaDrill(formula) : null;
  if (drills && drillNode) {
    drillNode.dataset.formula = formula.id;
    drillNode.querySelector('h4').textContent = `${formula.name}: single-step drill`;
    drills.push(drillNode);
  }
  return el('div', { class: 'block formula-explorer', id: formula.id }, [
    el('h3', {}, formula.name), expression, panel,
    paragraphs(formula.reads), el('p', { class: 'muted' }, formula.assumes),
    ...(formula.variants || []).map((v) => el('div', {}, [renderTex(v.tex, { display: true }), paragraphs(v.note)])), live,
    drills ? null : drillNode,
  ]);
}

function renderFormulaDrill(formula) {
  const drill = formula.drill;
  const input = el('input', { type: 'text', inputmode: 'decimal', 'aria-label': `${formula.name} drill answer` });
  const feedback = el('p', { role: 'status' });
  let attempts = 0;
  const solution = disclosure('Show drill solution', [renderTex(drill.tex, { display: true }), workedAnswerBlocks(drill.modelAnswer)]);
  const check = () => {
    const result = checkQuantity(input.value, drill.answer);
    if (result.error) { feedback.textContent = result.error; return; }
    attempts += 1;
    feedback.textContent = result.correct ? 'Correct. Open the solution to compare the substitution.' : drill.error;
    if (result.correct || attempts >= 2) solution.open = true;
  };
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); check(); } });
  return el('div', { class: 'formula-drill' }, [el('h4', {}, 'Single-step drill'), paragraphs(drill.prompt), renderHints(drill.hints, (level) => { const key = `drill:${formula.id}`; const state = getPracticeState(key); savePracticeState(key, { ...state, hints: [...new Set([...(state.hints || []), level])] }); }), input, ` ${drill.answer.unit || ''} `, button('Check drill', check), feedback, solution]);
}
