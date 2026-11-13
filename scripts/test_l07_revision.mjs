import { assertPhaseIsolation } from './revision_test_isolation.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import c from '../src/content/nbe-e4120/L07.js';
const text=fs.readFileSync('.codex-revision/L07/before.js','utf8');
const original=text.replace(/import .*equation-sheet.*;/, 'const equationSheet = {};').replace(/new URL\('[^']+', import.meta.url\).href/g, '"asset"');
const {default:old}=await import('data:text/javascript;base64,'+Buffer.from(original).toString('base64'));
// One audited prose correction: do not equate empirical HH fits with the barrier model.
assert.equal(c.sections.find(s=>s.id==='fit').formulas.find(f=>f.id==='L07-f-availability-open').reads,'Availability has opposite voltage polarity to activation. These barrier rates and the later empirical squid laws are distinct fitted descriptions.');
old.sections.find(s=>s.id==='fit').formulas.find(f=>f.id==='L07-f-availability-open').reads=c.sections.find(s=>s.id==='fit').formulas.find(f=>f.id==='L07-f-availability-open').reads;
const clean=x=>JSON.parse(JSON.stringify(x).replace(/"file:[^"]+"/g,'"asset"'));
assert.deepEqual(clean(c.lectureQuiz.map(({practice,...q})=>q)),old.lectureQuiz);
assert.deepEqual(clean(c.mockExams),old.mockExams);
assert.deepEqual(clean(c.sections.map(({blocks,...s})=>({...s,blocks:blocks.filter(b=>b.type!=='text')}))),old.sections.map(({blocks,...s})=>({...s,blocks:blocks.filter(b=>b.type!=='text')})));
assert.deepEqual(c.lectureQuiz.filter(q=>q.practice==='extra').map(q=>q.id),JSON.parse(fs.readFileSync('.codex-revision/L07/optional.json')));
assert.equal(c.lectureQuiz.filter(q=>!q.practice).length,87);
assert.equal(c.sections.length,30);
for(const s of c.sections){
 assert.equal(s.blocks[0].type,'text');assert.equal(s.blocks[0].body.length,2);
 const prose=s.blocks[0].body.join(' ');assert.ok(prose.split(/\s+/).length>=40,s.id);assert.match(prose,/PDF/,s.id);
 assert.ok(s.conceptQuiz.length && (s.id==='overview'||c.lectureQuiz.some(q=>q.sectionId===s.id&&!q.practice)),s.id);
}
for(const id of ['experimental-design','subtract-driving','clamp-jump','infer-root-rates','recover-population','transient-sodium','singular-rate','sketch','group-synthesis'])assert.ok(c.lectureQuiz.some(q=>q.id===`L07-${id}`&&!q.practice),id);
const baseline=JSON.parse(fs.readFileSync('.codex-revision/L07/baseline.json'));
assertPhaseIsolation(baseline, 7);
console.log('PASS: 30 visible theory blocks, 87 core/11 extra; all original question payloads, numbers, formula equations (one explanation corrected), figures, citations, order, mocks preserved. Unrelated source/docs files byte-identical.');
