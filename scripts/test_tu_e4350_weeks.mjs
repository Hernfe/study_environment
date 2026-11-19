import assert from 'node:assert/strict';
import { registry } from '../src/content/tu-e4350/registry.js';

const ids = new Set();
assert.deepEqual(registry.filter((week) => !week.sourceAvailable).map((week) => week.number), [11, 12]);
const pageCounts = [95, 71, 46, 142, 50, 37, 52, 53, 56, 64];

for (const entry of registry.filter((week) => week.built)) {
  const { default: week } = await import(`../src/content/tu-e4350/${entry.id}.js`);
  assert.deepEqual(week.meta, entry);
  assert.ok(week.cards.length >= 3 && week.cards.length <= 5);
  const words = [...week.cards, week.recap].flatMap((card) => [card.title, ...card.paragraphs])
    .join(' ').split(/\s+/).length;
  assert.ok(words >= 250 && words <= 450);
  const quiz = week.lectureQuiz;
  assert.ok(quiz.length >= 6 && quiz.length <= 10);
  const tiers = ['easy', 'medium', 'hard'];
  const ranks = quiz.map((item) => tiers.indexOf(item.difficulty));
  assert.deepEqual(ranks, [...ranks].sort());
  assert.ok(ranks.every((rank) => rank >= 0));
  for (const item of [...week.cards, week.recap, week.context, ...quiz]) {
    assert.match(item.pages, /^\d+(?:–\d+)?(?:, \d+(?:–\d+)?)*$/);
    const pages = item.pages.match(/\d+/g).map(Number);
    assert.ok(pages.every((page) => page > 0 && page <= pageCounts[entry.number - 1]));
  }
  for (const item of quiz) {
    assert.equal(item.type, 'mc');
    assert.match(item.id, new RegExp(`^w${entry.id.slice(1)}-`));
    assert.ok(!ids.has(item.id), item.id);
    ids.add(item.id);
    assert.ok(item.options.length >= 2 && item.options.length <= 4);
    assert.equal(new Set(item.options.map((option) => option.text.trim())).size, item.options.length);
    assert.ok(item.options.every((option) => option.text.trim() && option.feedback.trim()));
    assert.ok(Number.isInteger(item.correct) && item.options[item.correct]);
  }
  if (entry.number === 4) {
    const [price, direct, months, acquisition] = [100, 60, 6, 300];
    const gap = (price - direct) * months - acquisition;
    const item = quiz.find((question) => question.id === 'w04-unit');
    assert.equal(gap, -60);
    assert.match(item.options[item.correct].feedback, /€240, which falls €60 short/);
  }
  console.log(`PASS ${entry.id}, ${words} core words, ${quiz.length} required MCQs`);
}
