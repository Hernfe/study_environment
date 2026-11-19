import { el } from './dom.js';
import { currentCourse } from './course.js';

// Keep the opt-in contract confined to this course. Questions stay in the
// original bank so saved IDs, verification and review records remain valid.
export function isExtraPractice(question) {
  return currentCourse() === 'nbe-e4120' && question.practice === 'extra';
}

export function renderSectionPractice(questions, renderQuestion, optionalInline = [], renderInline) {
  const tiers = (items, heading = 'h3') => ['easy', 'medium', 'hard'].flatMap((tier) => {
    const group = items.filter((q) => q.difficulty === tier);
    // Stable partition; do not mutate canonical arrays or change saved IDs.
    if (currentCourse() === 'nbe-e4120' && tier === 'easy') {
      group.sort((a, b) => Number(b.type === 'mc') - Number(a.type === 'mc'));
    }
    return group.length ? [el(heading, {}, `${tier[0].toUpperCase()}${tier.slice(1)} practice`), ...group.map(renderQuestion)] : [];
  });
  const core = questions.filter((q) => !isExtraPractice(q));
  const extra = questions.filter(isExtraPractice);
  if (!extra.length && !optionalInline.length) return tiers(core);
  return [
    core.length ? el('h3', {}, `Core practice (${core.length})`) : null,
    ...tiers(core, 'h4'),
    el('details', { class: 'extra-practice reveal' }, [
      el('summary', {}, `Extra practice (${extra.length + optionalInline.length}, optional)`),
      renderInline?.(optionalInline),
      ...tiers(extra, 'h4'),
    ]),
  ];
}
