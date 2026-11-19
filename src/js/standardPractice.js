// The policy is opt-in so a lecture can migrate its exam coverage before
// changing which questions students see during regular practice.
export function standardPracticeQuestions(questions = [], policy, { inline = false } = {}) {
  if (policy !== 'mc-only') return questions;
  return questions.filter((question) => {
    const { type, options, correct } = question;
    return (type === 'mc' || (inline && type === undefined))
      && Array.isArray(options) && options.length >= 2 && options.length <= 4
      && Number.isInteger(correct) && correct >= 0 && correct < options.length
      && options.every((option) => typeof option?.text === 'string' && option.text.trim()
        && typeof option.feedback === 'string' && option.feedback.trim());
  });
}
