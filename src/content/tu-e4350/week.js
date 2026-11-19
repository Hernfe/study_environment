import { registry } from './registry.js';

export function card(title, pages, ...paragraphs) {
  return { title, pages, paragraphs };
}

export function mc(id, difficulty, pages, prompt, correct, alternatives) {
  const options = alternatives.map(([text, feedback]) => ({ text, feedback }));
  return {
    id, type: 'mc', difficulty, pages, prompt, correct, options,
    modelAnswer: [options[correct].feedback],
  };
}

export function week(number, cards, recap, context, lectureQuiz) {
  const entry = registry[number - 1];
  return { meta: { ...entry }, cards, recap, context, lectureQuiz };
}
