import { el } from './dom.js';
import { renderConceptQuiz } from './conceptQuiz.js';
import { getPracticeState, savePracticeState } from './progress.js';
import { renderCodeVisual } from './codeVisuals.js';

// Match strings and comments before numbers or keywords to avoid highlighting
// tokens inside them. All parts go into text nodes.
const pythonTokens = /("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|#[^\n]*|\b(?:import|from|as|for|in|if|else|def|return|None|True|False)\b|\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b)/g;

function highlightedPython(text) {
  return text.split(pythonTokens).map((part, index) => index % 2 === 0 ? part :
    el('span', { class: /^['"#]/.test(part) ? 'code-literal' : 'code-token' }, part));
}

export function matchesCodeBlank(value, field) {
  const normalize = (text) => field.trim === false ? text : text.trim();
  return field.accepted.some((answer) => normalize(value) === normalize(answer));
}

function renderCodeBlank(blank, lectureId) {
  const key = `code-blank:${lectureId}:${blank.id}`;
  const stored = getPracticeState(key);
  const inputs = new Map(blank.fields.map((field) => [field.id, el('input', {
    type: 'text', 'aria-label': field.label, autocomplete: 'off', autocapitalize: 'off',
    spellcheck: 'false', required: true, maxlength: 80, size: 8,
  })]));
  const feedback = el('div', { class: 'feedback', role: 'status', 'aria-atomic': 'true' });
  const check = el('button', { type: 'submit', class: 'btn btn-primary' }, 'Check code');
  const retry = el('button', { type: 'button', class: 'btn', hidden: true }, 'Try code again');
  const entries = [...inputs.values()];
  function showAnswers() {
    const results = blank.fields.map((field) => matchesCodeBlank(inputs.get(field.id).value, field));
    feedback.replaceChildren(
      el('p', {}, results.every(Boolean) ? 'All blanks correct.' : 'Review the blanks below.'),
      el('ul', {}, blank.fields.map((field, index) => el('li', {}, [
        `${field.label} · ${results[index] ? 'Correct' : 'Needs revision'}. Expected `,
        el('code', {}, field.accepted[0]), `. ${field.explanation}`,
        !results[index] && field.commonErrors ? ` ${field.commonErrors}` : '',
      ]))),
      el('p', {}, blank.expectedOutput),
    );
    entries.forEach((input) => { input.readOnly = true; });
    check.hidden = true;
    retry.hidden = false;
  }
  const form = el('form', { onSubmit: (event) => {
    event.preventDefault();
    if (check.hidden || entries.some((input) => !input.value.trim())) return;
    savePracticeState(key, { values: Object.fromEntries([...inputs].map(([id, input]) => [id, input.value])) });
    showAnswers();
    retry.focus();
  } }, [
    el('p', {}, blank.prompt),
    el('div', { class: 'code-blank-template' }, el('code', {},
      blank.template.split(/\{([\w-]+)\}/g).map((part, index) =>
        index % 2 ? inputs.get(part) : highlightedPython(part)))),
    el('div', { class: 'btn-row' }, [check, retry]), feedback,
  ]);
  retry.addEventListener('click', () => {
    savePracticeState(key, {});
    entries.forEach((input) => { input.value = ''; input.readOnly = false; });
    feedback.replaceChildren();
    check.hidden = false;
    retry.hidden = true;
    entries[0].focus();
  });
  if ([...inputs.keys()].every((id) => typeof stored.values?.[id] === 'string' && stored.values[id].trim())) {
    for (const [id, input] of inputs) input.value = stored.values[id];
    showAnswers();
  }
  return el('details', { class: 'reveal', open: check.hidden }, [
    el('summary', {}, 'Optional fill-in-code practice'), form,
  ]);
}

export function renderCodeVisualCard(card, { lectureId, formatSource }) {
  const { id, title, snippet, visual, mcq, blank, optional } = card;
  const contents = [
    el('figure', { class: 'study-code' }, [
      el('figcaption', { id: `${id}-source` }, [
        `Python · ${snippet.provenance} · ${snippet.sources.map(formatSource).join(' · ')}`,
        el('p', { class: 'muted' }, snippet.context),
      ]),
      el('pre', { tabindex: 0, 'aria-labelledby': `${id}-source` },
        el('code', {}, highlightedPython(snippet.text))),
    ]),
    renderCodeVisual(visual, id),
    renderConceptQuiz([mcq], { lectureId, sectionTitle: title, bestGuess: true, codeCard: true }),
    blank ? renderCodeBlank(blank, lectureId) : null,
  ];
  return optional
    ? el('details', { id, class: 'reveal code-visual-card' }, [el('summary', {}, title), contents])
    : el('article', { id, class: 'code-visual-card', 'aria-labelledby': `${id}-title` }, [
      el('h3', { id: `${id}-title` }, title), contents,
    ]);
}
