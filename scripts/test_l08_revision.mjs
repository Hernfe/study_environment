import { assertPhaseIsolation } from './revision_test_isolation.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';import crypto from 'node:crypto';
import c from '../src/content/nbe-e4120/L08.js';
const old=JSON.parse(fs.readFileSync('.codex-revision/L08/content.json'));
const clean=x=>JSON.parse(JSON.stringify(x).replace(/"file:[^"]+"/g,'"asset"'));
assert.deepEqual(clean(c.lectureQuiz.map(({practice,...q})=>q)),clean(old.lectureQuiz));
assert.deepEqual(clean(c.mockExams),clean(old.mockExams));
const structural=x=>x.sections.map(({blocks,...s})=>({...s,blocks:blocks.filter(b=>b.type!=='text')}));
assert.deepEqual(clean(structural(c)),clean(structural(old)));
assert.equal(c.lectureQuiz.filter(q=>!q.practice).length,105);
assert.equal(c.lectureQuiz.filter(q=>q.practice==='extra').length,16);
assert.deepEqual(c.lectureQuiz.filter(q=>q.practice).map(q=>q.id).sort(),JSON.parse(fs.readFileSync('.codex-revision/L08/optional.json')).sort());
assert.equal(c.sections.length,39);
for(const s of c.sections){
 assert.equal(s.blocks[0].type,'text');assert.equal(s.blocks[0].body.length,2);
 assert.equal(s.blocks[0].body[0],old.sections.find(x=>x.id===s.id).blocks[0].body);
 assert.ok(s.blocks[0].body.join(' ').split(/\s+/).length>=40,s.id);
 assert.ok(s.blocks[0].body[1].includes('PDF'),s.id);
 assert.ok(s.conceptQuiz.length && (s.id==='overview'||c.lectureQuiz.some(q=>q.sectionId===s.id&&!q.practice)),s.id);
}
for(const id of ['ionic-balance','charge-area','sensor-density','insulation-audit','fiber-design','source-table-audit','source-k-audit','source-charge-audit','methods-design','saltatory-evidence','sensor-audit','slow-stimulus'])assert.ok(c.lectureQuiz.some(q=>q.id===`L08-${id}`&&!q.practice),id);
const baseline=JSON.parse(fs.readFileSync('.codex-revision/L08/baseline.json'));
assertPhaseIsolation(baseline, 8);
console.log('PASS: 39 theory sections; 105 core/16 optional; all question payloads, formulas, figures, section order, citations, numeric answers and mocks preserved. Unrelated source/docs/scripts byte-identical, allowing later authorized E4120 revisions.');
