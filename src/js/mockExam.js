import { el, paragraphs } from './dom.js';
import { formatPoints, renderQuestion } from './lectureQuiz.js';
import { getPracticeState, savePracticeState } from './progress.js';
import { renderVisual, renderVideo } from './visuals.js';
import { renderTex } from './math.js';
import { renderFormulaReference } from './quantitative.js';

const attemptKey = (lectureId, exam) =>
  `mock:${lectureId}:${exam.id}${exam.revision ? `:v${exam.revision}` : ''}`;

function workedModelLine(line) {
  if (!/^\$[^$]+\$$/.test(line)) return paragraphs(line);
  const equation = renderTex(line.slice(1, -1), { display: true });
  equation.tabIndex = 0;
  equation.setAttribute('role', 'group');
  equation.setAttribute('aria-label', 'Worked equation, scroll horizontally with arrow keys');
  return equation;
}

// Attempt answers are separate from the practice bank. During an exam no
// answer/check/reveal components are mounted; submission is irreversible for
// this attempt. Starting a new attempt is an explicit action.
export function renderMockExams(exams, { lectureId, reference, cumulative = false, previous = [] } = {}) {
  const root = el('section', { class: 'section mock-exams', id: 'mock-exams' }, [el('h2', {}, cumulative ? 'Full-course mock exams' : 'Practice mock exams')]);
  for (const exam of exams || []) {
    const key = attemptKey(lectureId, exam);
    const paper = exam.format === 'paper';
    let state = getPracticeState(key);
    const body = el('div', cumulative ? { id: exam.id, class: 'final-mock' } : {});
    const persist = () => savePracticeState(key, state);
    const render = () => {
      body.replaceChildren();
      const intro = el('div', {}, [el('h3', {}, exam.title), paragraphs(exam.coverage), el('p', { class: 'muted' }, paper ? exam.instructions || `${exam.questions.length} problems, one point each. Allow one hour and one handwritten A4 sheet. Mark your responses after submitting.` : 'Five practice questions. A calculator is allowed. Rubrics are practice criteria, not official exam weights.')]);
      if (reference && !paper) intro.append(renderFormulaReference(reference.map((eq) => eq.replace(/^\$|\$$/g, '')), 'Official provided equation sheet. A calculator is allowed.'));
      body.append(intro);
      if (cumulative) {
        body.append(el('p', { class: 'notice' }, 'Practice marking: 10 points per question, 50 total, equally weighted by this site. Written/sketch work is self-reviewed. Calculations earn 6 points across independently checked stages plus 4 self-reviewed method points. After submission, enter your numeric results in the stage fields to check them. Corrected practice results can be revised. These are not official exam weights.'));
        if (state.history?.length) body.append(el('details', {}, [el('summary', {}, `${state.history.length} saved previous attempts`), ...state.history.map((attempt) => el('details', {}, [el('summary', {}, `${new Date(attempt.submittedAt).toLocaleString()}: ${attempt.mark ?? 0} / 50 practice points`), ...exam.questions.map((q, k) => el('div', {}, [el('h4', {}, `Question ${k + 1}`), paragraphs(attempt.answers?.[k] || 'No response saved.')]))]))]));
      }
      if (!state.mode) {
        const modes = [['exam', 'Start real-exam practice']];
        if (!paper) modes.push(['practice', 'Start with hints and checks']);
        for (const [mode, label] of modes) {
          body.append(el('button', { type: 'button', class: 'btn', onClick: () => { state = { ...(cumulative ? { history: state.history || [] } : {}), mode, submitted: false, answers: {}, review: {}, started: Date.now() }; persist(); render(); } }, label));
        }
        return;
      }
      body.append(el('p', { role: 'status' }, state.submitted ? 'Submitted. Review your answers below.' : state.mode === 'exam' ? 'Attempt in progress. Hints, checks and answers are withheld until submission.' : 'Practice mode. Hints and checks are available.'));
      exam.questions.forEach((question, i) => {
        const answer = el('textarea', { 'aria-label': `${exam.title}, question ${i + 1} response`, class: 'essay-input', readonly: state.submitted });
        answer.value = state.answers[i] || '';
        answer.addEventListener('input', () => { state.answers[i] = answer.value; persist(); });
        const renderChoices = (labels, key, title) => el('div', { role: 'group', 'aria-label': title },
          labels.map((label, index) => el('label', { class: 'quantity-field' }, [
            el('input', { type: 'radio', name: `${exam.id}-${exam.revision || 0}-${key}`,
              checked: state.answers[key] === String(index), disabled: state.submitted,
              onChange: () => { state.answers[key] = String(index); persist(); },
            }), label,
          ])));
        const result = (key, correct) => el('p', { class: 'muted' },
          state.answers[key] === String(correct) ? 'Correct' : state.answers[key] === undefined ? 'Unanswered' : 'Incorrect');
        const choices = paper && question.choices && renderChoices(question.choices, i, `Question ${i + 1} choices`);
        const statements = paper && question.statements?.map((statement, j) => {
          const key = `${i}:${j}`;
          return el('li', {}, [
            paragraphs(statement.text),
            renderChoices(['True', 'False'], key, statement.text),
            state.submitted ? result(key, statement.correct ? 0 : 1) : null,
            state.submitted ? paragraphs(question.markScheme[j].text) : null,
          ]);
        });
        const directions = statements ? 'Mark each statement true or false.'
          : choices ? 'Select one answer.' : 'Record your response or write it on paper.';
        const card = el('article', { class: 'question' }, [el('h4', {}, `Question ${i + 1}${paper ? ' (1 point)' : ''}`), paragraphs(question.prompt), cumulative && question.source ? el('p', { class: 'muted' }, `Source: ${question.source}`) : null, question.figure ? renderVisual(question.figure) : null, question.video ? renderVideo(question.video) : null, el('p', { class: 'muted' }, paper ? directions : 'Write all parts and working here; make any requested sketch on paper.'), statements ? el('ol', {}, statements) : choices || answer]);
        body.append(card);
        if (statements) return;
        if (choices && state.submitted) {
          card.append(result(i, question.correct), paragraphs(question.markScheme.map(criterion => criterion.text)));
        } else if (paper && state.submitted) {
          state.review ||= {};
          const checked = state.review[i] || [];
          const criteria = question.markScheme.map(({ points, text }, j) => {
            const input = el('input', { type: 'checkbox', checked: checked.includes(j) });
            input.addEventListener('change', () => {
              state.review[i] = criteria.flatMap(({ input }, index) => input.checked ? [index] : []);
              persist();
              updateSummary();
            });
            return { input, node: el('label', { class: 'quantity-field' }, [input, `${formatPoints(points)} pt · ${text}`]) };
          });
          card.append(el('details', {}, [
            el('summary', {}, 'Answer key and self-marking'),
            ...criteria.map(({ node }) => node),
          ]));
        } else if (!paper && (state.submitted || state.mode === 'practice')) {
          const reviewCard = renderQuestion({ ...question, id: `${exam.id}-${question.id}` }, { lectureId: `${lectureId}-mocks-${state.started}`, initialResponse: state.answers[i], recordResult: false, onHint: (level) => {
            state.hints ||= {}; state.hints[i] = [...new Set([...(state.hints[i] || []), level])]; persist();
          }, onResult: (result) => {
            state.review[i] = { correct: result.correct, score: result.score, max: result.max, kind: ['written', 'derive', 'predict', 'essay'].includes(question.type) || (question.type === 'interpret' && !question.options) ? 'self' : 'automatic' };
            persist(); updateSummary();
          } });
          body.append(reviewCard);
          if (cumulative && question.stages) {
            state.methods ||= {};
            const checks = (question.methodCriteria || []).map((criterion, k) => {
              const input = el('input', { type: 'checkbox', checked: state.methods[i]?.[k] || false });
              input.addEventListener('change', () => { state.methods[i] = checks.map((x) => x.input.checked); persist(); refreshNumeric(); });
              return { input, node: el('label', { class: 'quantity-field' }, [input, criterion.text]) };
            });
            body.append(el('details', {}, [el('summary', {}, `Question ${i + 1}: full worked model and method checklist`), question.modelAnswer.map(workedModelLine), ...checks.map((x) => x.node)]));
            function refreshNumeric() {
              const saved = getPracticeState(`${lectureId}-mocks-${state.started}:${exam.id}-${question.id}`);
              const correct = question.stages.filter((_, k) => saved[k]?.checked === true).length;
              const method = (state.methods[i] || []).filter(Boolean).length;
              state.review[i] = { kind: 'automatic', correct: correct === question.stages.length, score: 6 * correct / question.stages.length + method, max: 10, stages: correct, method };
              persist(); updateSummary();
            }
            reviewCard.addEventListener('click', refreshNumeric);
            reviewCard.addEventListener('input', refreshNumeric);
          }
        }
      });
      const status = el('p', { role: 'status' });
      if (!state.submitted) body.append(el('button', { type: 'button', class: 'btn btn-primary', onClick: () => {
        const empty = paper ? [] : exam.questions.map((_, i) => i).filter((i) => !state.answers[i]?.trim());
        if (empty.length) { status.textContent = `Still unanswered: ${empty.map((i) => i + 1).join(', ')}. Write an answer or explicitly enter “No answer” before submitting.`; return; }
        state.submitted = true; state.submittedAt = Date.now(); persist(); render();
      } }, 'Submit attempt'));
      else body.append(el('button', { type: 'button', class: 'btn', onClick: () => { state = cumulative ? { history: [...(state.history || []), { ...state, history: undefined }] } : {}; persist(); render(); } }, 'Start a new attempt'));
      body.append(status);
      const summary = el('p', { class: 'notice', role: 'status' });
      body.append(summary);
      function updateSummary() {
        if (paper) {
          const score = exam.questions.reduce((total, q, i) => {
            if (q.statements) {
              return q.statements.reduce((subtotal, statement, j) => {
                const correct = state.answers[`${i}:${j}`] === (statement.correct ? '0' : '1');
                return subtotal + (correct ? q.markScheme[j].points : 0);
              }, total);
            }
            if (q.choices) return total + Number(state.answers[i] === String(q.correct));
            return (state.review?.[i] || []).reduce((subtotal, j) => subtotal + q.markScheme[j].points, total);
          }, 0);
          summary.textContent = state.submitted ? `${exam.revision ? 'Practice score' : 'Self-marked score'} ${formatPoints(score)} / ${exam.questions.length}` : '';
          return;
        }
        const values = Object.values(state.review || {});
        const automatic = values.filter((v) => v.kind === 'automatic');
        const self = values.filter((v) => v.kind === 'self');
        if (cumulative) {
          const rows = exam.questions.map((q, i) => {
            const result = state.review?.[i];
            const score = result ? 10 * result.score / result.max : 0;
            return { score, text: `Q${i + 1}: ${score.toFixed(2)} / 10 (${result ? result.kind === 'self' ? 'self-reviewed' : 'checked stages + self-reviewed method' : 'not reviewed'})` };
          });
          state.mark = Math.round(rows.reduce((sum, row) => sum + row.score, 0) * 100) / 100;
          summary.textContent = `Practice mark: ${state.mark} / 50. ${rows.map((r) => r.text).join('; ')}. Unreviewed work receives zero pending review. Written and method credit is self-assessed.`;
          persist();
          return;
        }
        summary.textContent = `${automatic.length} automatically checked questions (${automatic.filter((v) => v.correct).length} fully correct); ${self.length} self-reviewed written questions. Typed answers alone receive no automatic credit.`;
      }
      updateSummary();
    };
    render(); root.append(body);
  }
  const saved = previous.filter(exam => getPracticeState(attemptKey(lectureId, exam)).mode);
  if (saved.length) {
    const archive = renderMockExams(saved, { lectureId });
    archive.removeAttribute('id');
    root.append(el('details', { class: 'reveal' }, [el('summary', {}, 'Saved attempts on earlier papers'), archive]));
  }
  return root;
}
