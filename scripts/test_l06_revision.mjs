import { assertPhaseIsolation } from './revision_test_isolation.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import c from '../src/content/nbe-e4120/L06.js';
const text=fs.readFileSync('.codex-revision/L06-before.js','utf8');
// Preserve import.meta asset resolution by evaluating the original as a data snapshot.
const old=JSON.parse(text.slice(text.indexOf('const content = ')+16,text.lastIndexOf('\n};')+2).replace(/new URL\('[^']+', import.meta.url\).href/g,'"asset"'));
const clean=x=>JSON.parse(JSON.stringify(x).replace(/"file:[^"]+"/g,'"asset"'));
assert.deepEqual(clean(c.lectureQuiz.map(({practice,...q})=>q)),old.lectureQuiz);
assert.deepEqual(clean(c.mockExams),old.mockExams);
assert.deepEqual(clean(c.sections.map(({blocks,...s})=>({...s,blocks:blocks.filter(b=>b.type!=='text')}))),old.sections.map(({blocks,...s})=>({...s,blocks:blocks.filter(b=>b.type!=='text')})));
assert.equal(c.sections.length,22);
for(const s of c.sections){
 const b=s.blocks[0];assert.equal(b.type,'text');assert.equal(b.body.length,2);
 assert.ok(b.body.join(' ').split(/\s+/).length>=40,s.id);
}
const baseline=JSON.parse(fs.readFileSync('.codex-revision/L06-file-baseline.json'));
assertPhaseIsolation(baseline, 6);
console.log('PASS: L06 question payloads, answers, formulas, figures, sources, section order and mocks unchanged; unrelated source/docs files byte-identical; 22 two-paragraph theory blocks.');
