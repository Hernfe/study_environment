// Disabled-by-default boundary for future authenticated formative feedback.
// No fetch, API key, endpoint, provider or production adapter is supplied.
export const feedbackAvailability = Object.freeze({ available: false, reason: 'Secure review service is not configured.' });
export async function reviewWithAdapter({ question, answer }, adapter) {
  if (typeof adapter !== 'function') return { available: false, reason: feedbackAvailability.reason };
  if (typeof answer !== 'string' || new TextEncoder().encode(answer).length > 12000) throw new Error('Answer must be text, at most 12000 bytes.');
  if (!question?.rubric?.length || !answer.trim()) throw new Error('A nonempty answer and rubric are required.');
  // Only the public rubric and untrusted answer are passed, never private source files.
  const result = await adapter({ rubric: question.rubric.map(({ id, text, accept }) => ({ id, text, accept })), answer });
  if (!Array.isArray(result?.items) || result.items.length !== question.rubric.length) throw new Error('Incomplete review.');
  const ids = new Set(question.rubric.map((c) => c.id));
  for (const item of result.items) {
    if (!ids.delete(item.id) || !['correct', 'missing', 'incorrect'].includes(item.status) || typeof item.nextStep !== 'string' || item.nextStep.length > 1000) throw new Error('Invalid review item.');
  }
  return { available: true, formativeOnly: true, items: result.items.map(({ id, status, nextStep }) => ({ id, status, nextStep })) };
}
