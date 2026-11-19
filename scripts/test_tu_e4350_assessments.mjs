import assert from 'node:assert/strict';
import { diagnostic, mocks } from '../src/content/tu-e4350/assessments.js';
import { registry } from '../src/content/tu-e4350/registry.js';

const weeks = registry.filter(({ built }) => built).map(({ number }) => number);
const pageLimits = [95, 71, 46, 142, 50, 37, 52, 53, 56, 64];
const prompts = new Set();
const mockKeys = ['1021021021121021', '0210210210212012', '1021021021021201', '0120120120120120'];

function checkSource({ week, pages }) {
  assert(weeks.includes(week));
  for (const page of pages.split(', ')) {
    assert.match(page, /^\d+(–\d+)?$/);
    const [first, last = first] = page.split('–').map(Number);
    assert(first >= 1 && last >= first && last <= pageLimits[week - 1]);
  }
}

assert.equal(mocks.length, 3);
assert.equal(new Set([...mocks, diagnostic].map(({ id }) => id)).size, 4);
for (const [index, form] of [...mocks, diagnostic].entries()) {
  assert.equal(form.questions.length, 16);
  assert.equal(new Set(form.questions.map(({ id }) => id)).size, 16);
  assert.equal(form.questions.map(({ correct }) => correct).join(''), mockKeys[index], form.id);
  for (const week of weeks) {
    const count = form.questions.filter((item) => item.week === week).length;
    assert(count >= 1 && count <= 2, `${form.id}, W${week}: ${count}`);
  }
  for (const question of form.questions) {
    checkSource(question);
    assert.equal(question.options.length, 3);
    assert.equal(new Set(question.options.map((choice) => choice.trim().toLowerCase())).size, 3);
    assert(question.options.every((choice) => choice.trim()));
    assert(question.options[question.correct] && question.explanation.trim());
    assert(!prompts.has(question.prompt), question.prompt);
    prompts.add(question.prompt);
  }
  if (form === diagnostic) {
    assert.equal(form.cases, undefined);
    assert.equal(form.team, undefined);
    continue;
  }
  assert.equal(form.cases.length, 4);
  assert.equal(new Set(form.cases.map(({ week }) => week)).size, 4);
  assert.equal(new Set([...form.cases, form.team].map(({ id }) => id)).size, 5);
  for (const task of [...form.cases, form.team]) {
    checkSource(task);
    assert.equal(task.rubric.length, task === form.team ? 2 : 3);
    assert.equal(new Set(task.rubric).size, task.rubric.length);
    assert(task.rubric.every((criterion) => criterion.trim()));
    assert(!prompts.has(task.prompt), task.prompt);
    prompts.add(task.prompt);
  }
  assert.equal(form.questions.length + form.cases.flatMap(({ rubric }) => rubric).length + form.team.rubric.length, 30);
}
console.log('PASS 3 distinct 30-point mocks and optional diagnostic, balanced weeks, answer keys, IDs, sources and rubrics');
