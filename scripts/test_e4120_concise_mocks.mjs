import assert from 'node:assert/strict';
import { fullCourseMocks, registry } from '../src/content/nbe-e4120/registry.js';
import { standardPracticeQuestions } from '../src/js/standardPractice.js';

const roles = ['concepts', 'explanation', 'calculation', 'calculation', 'methods'];
const types = ['written', 'written', 'multiStepCalc', 'multiStepCalc', 'written'];
const examIds = new Set();
const prompts = new Map();
const regularPrompts = new Set();
const calculationScenarios = new Set();
const normalize = (prompt) => prompt.trim().toLowerCase().replace(/\s+/g, ' ');

function checkPapers(papers, count) {
  assert.equal(papers.length, count);
  const ids = new Set();
  for (const { id, questions } of papers) {
    assert.ok(!examIds.has(id), id);
    examIds.add(id);
    assert.deepEqual(questions.map((question) => question.role), roles, id);
    assert.deepEqual(questions.map((question) => question.type), types, id);
    for (const question of questions) {
      const label = `${id} / ${question.id}`;
      assert.ok(!ids.has(question.id), label);
      ids.add(question.id);
      const prompt = normalize(question.prompt);
      assert.ok(prompt && !prompts.has(prompt), `${label} duplicates ${prompts.get(prompt)}`);
      prompts.set(prompt, label);
      assert.ok(question.modelAnswer.length, label);
      if (question.type === 'written') assert.ok(question.markScheme.length, label);
      else {
        assert.ok(question.stages.some((stage) => stage.answer || stage.fields?.length), label);
        const scenario = prompt.replace(/\d+(?:\.\d+)*/g, '#');
        assert.ok(!calculationScenarios.has(scenario), label);
        calculationScenarios.add(scenario);
      }
    }
  }
  return ids;
}

const available = registry.filter((lecture) => lecture.built);
assert.equal(available.length, 10);
assert.equal(available.at(-1).id, 'L10');
for (const { id } of available) {
  const { default: lecture } = await import(`../src/content/nbe-e4120/${id}.js`);
  assert.equal(lecture.standardPractice, 'mc-only');
  const mockIds = checkPapers(lecture.mockExams, 3);
  const inline = lecture.sections.flatMap((section) => section.conceptQuiz || []);
  const bank = [...lecture.lectureQuiz];
  const regularIds = [...bank, ...inline].map((question) => question.id);
  assert.equal(new Set(regularIds).size, regularIds.length, id);
  assert.ok(regularIds.every((questionId) => !mockIds.has(questionId)), id);
  for (const retiredId of lecture.retiredPracticeIds || []) assert.ok(mockIds.has(retiredId));
  assert.equal(standardPracticeQuestions(inline, 'mc-only', { inline: true }).length, inline.length);
  const bankMCQs = standardPracticeQuestions(bank, 'mc-only');
  assert.equal(bankMCQs.length, bank.filter((q) => q.type === 'mc').length);
  for (const question of [...inline, ...bankMCQs]) {
    const prompt = normalize(question.prompt);
    assert.ok(prompt && !regularPrompts.has(prompt), `${id} / ${question.id}`);
    regularPrompts.add(prompt);
  }
}
checkPapers(fullCourseMocks, 5);
for (const paper of fullCourseMocks) {
  assert.match(paper.coverage, /L01–L10/);
  assert.match(paper.questions[0].source, /\bL10\b/);
}
console.log(`30 lecture and 5 cumulative papers, ${prompts.size} unique mock prompts, ${calculationScenarios.size} distinct calculation scenarios and ${regularPrompts.size} unique regular prompts.`);
