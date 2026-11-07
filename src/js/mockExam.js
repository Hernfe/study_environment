import { el, paragraphs } from './dom.js';
import { renderQuestion } from './lectureQuiz.js';
import { getPracticeState, savePracticeState } from './progress.js';
import { renderVisual, renderVideo } from './visuals.js';

// Attempt answers are separate from the practice bank. During an exam no
// answer/check/reveal components are mounted; submission is irreversible for
// this attempt. Starting a new attempt is an explicit action.
export function renderMockExams(exams, { lectureId, reference } = {}) {
  const root = el('section', { class: 'section mock-exams', id: 'mock-exams' }, [el('h2', {}, 'Practice mock exams')]);
  for (const exam of exams || []) {
    const key = `mock:${lectureId}:${exam.id}`;
    let state = getPracticeState(key);
    const body = el('div');
    const persist = () => savePracticeState(key, state);
    const render = () => {
      body.replaceChildren();
      const intro = el('div', {}, [el('h3', {}, exam.title), paragraphs(exam.coverage), el('p', { class: 'muted' }, 'Five practice questions. A calculator is allowed. Rubrics are practice criteria, not official exam weights.')]);
      if (reference) intro.append(el('details', { class: 'reveal' }, [el('summary', {}, 'Provided equation sheet'), ...reference.map((eq) => el('div', {}, paragraphs(eq)))]));
      body.append(intro);
      if (!state.mode) {
        for (const [mode, label] of [['exam', 'Start real-exam practice'], ['practice', 'Start with hints and checks']]) {
          body.append(el('button', { type: 'button', class: 'btn', onClick: () => { state = { mode, submitted: false, answers: {}, review: {}, started: Date.now() }; persist(); render(); } }, label));
        }
        return;
      }
      body.append(el('p', { role: 'status' }, state.submitted ? 'Submitted. Review your answers below.' : state.mode === 'exam' ? 'Attempt in progress. Hints, checks and answers are withheld until submission.' : 'Practice mode. Hints and checks are available.'));
      exam.questions.forEach((question, i) => {
        const answer = el('textarea', { 'aria-label': `${exam.title}, question ${i + 1} response`, class: 'essay-input', readonly: state.submitted });
        answer.value = state.answers[i] || '';
        answer.addEventListener('input', () => { state.answers[i] = answer.value; persist(); });
        body.append(el('article', { class: 'question' }, [el('h4', {}, `Question ${i + 1}`), paragraphs(question.prompt), question.figure ? renderVisual(question.figure) : null, question.video ? renderVideo(question.video) : null, el('p', { class: 'muted' }, 'Write all parts and working here; make any requested sketch on paper.'), answer]));
        if (state.submitted || state.mode === 'practice') {
          body.append(renderQuestion({ ...question, id: `${exam.id}-${question.id}` }, { lectureId: `${lectureId}-mocks-${state.started}`, initialResponse: state.answers[i], recordResult: false, onHint: (level) => {
            state.hints ||= {}; state.hints[i] = [...new Set([...(state.hints[i] || []), level])]; persist();
          }, onResult: (result) => {
            state.review[i] = { correct: result.correct, score: result.score, max: result.max, kind: ['written', 'derive', 'predict', 'essay'].includes(question.type) || (question.type === 'interpret' && !question.options) ? 'self' : 'automatic' };
            persist(); updateSummary();
          } }));
        }
      });
      const status = el('p', { role: 'status' });
      if (!state.submitted) body.append(el('button', { type: 'button', class: 'btn btn-primary', onClick: () => {
        const empty = exam.questions.map((_, i) => i).filter((i) => !state.answers[i]?.trim());
        if (empty.length) { status.textContent = `Still unanswered: ${empty.map((i) => i + 1).join(', ')}. Write an answer or explicitly enter “No answer” before submitting.`; return; }
        state.submitted = true; state.submittedAt = Date.now(); persist(); render();
      } }, 'Submit attempt'));
      else body.append(el('button', { type: 'button', class: 'btn', onClick: () => { state = {}; persist(); render(); } }, 'Start a new attempt'));
      body.append(status);
      const summary = el('p', { class: 'notice', role: 'status' });
      body.append(summary);
      function updateSummary() {
        const values = Object.values(state.review || {});
        const automatic = values.filter((v) => v.kind === 'automatic');
        const self = values.filter((v) => v.kind === 'self');
        summary.textContent = `${automatic.length} automatically checked questions (${automatic.filter((v) => v.correct).length} fully correct); ${self.length} self-reviewed written questions. Typed answers alone receive no automatic credit.`;
      }
      updateSummary();
    };
    render(); root.append(body);
  }
  return root;
}
