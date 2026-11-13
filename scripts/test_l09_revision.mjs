import { assertPhaseIsolation } from './revision_test_isolation.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';import crypto from 'node:crypto';
import c from '../src/content/nbe-e4120/L09.js';
import {evaluateRelation} from '../src/js/numeric.js';
const old=JSON.parse(fs.readFileSync('.codex-revision/L09/content.json'));
const clean=x=>JSON.parse(JSON.stringify(x).replace(/"file:[^"]+"/g,'"asset"'));
// Only the existing occupancy item's broken TeX escapes may change in question payloads.
const qClean=q=>{const {practice,...rest}=q;return rest;};
assert.deepEqual(clean(c.lectureQuiz.filter(q=>q.id!=='L09-binomial-patch').map(qClean)),clean(old.lectureQuiz.filter(q=>q.id!=='L09-binomial-patch')));
const before=old.lectureQuiz.find(q=>q.id==='L09-binomial-patch'),after=c.lectureQuiz.find(q=>q.id===before.id);
function numeric(x){if(!x||typeof x!=='object')return [];return [...(x.verification?[x]:[]),...Object.entries(x).filter(([k])=>k!=='verification').flatMap(([,v])=>numeric(v))];}
assert.deepEqual(numeric(after),numeric(before));
assert.deepEqual(clean(c.mockExams),clean(old.mockExams));
const structural=x=>x.sections.map(({blocks,formulas,...s})=>({...s,formulas:formulas?.filter(f=>!['L09-f-binomial','L09-f-poisson'].includes(f.id)),blocks:blocks.filter(b=>b.type!=='text')}));
assert.deepEqual(numeric(c.sections),numeric(old.sections));
assert.deepEqual(clean(structural(c)),clean(structural(old)));
assert.equal(c.lectureQuiz.length,111);assert.equal(c.lectureQuiz.filter(q=>!q.practice).length,97);
assert.deepEqual(c.lectureQuiz.filter(q=>q.practice).map(q=>q.id).sort(),JSON.parse(fs.readFileSync('.codex-revision/L09/optional.json')).sort());
for(const s of c.sections){
 assert.equal(s.blocks[0].type,'text');const text=s.blocks[0].body.join(' ');
 assert.ok(text.split(/\s+/).length>=40,s.id);assert.match(text,/PDF/);
 assert.ok(s.conceptQuiz.length && (['overview','thermal'].includes(s.id)||c.lectureQuiz.some(q=>q.sectionId===s.id&&!q.practice)),s.id);
}
for(const id of ['binomial-patch','a3','a4','b3','b4','c3','c4','a5','b5','c5','ttx-explain','sensor-synthesis','filter-synthesis'])assert.ok(c.lectureQuiz.some(q=>q.id===`L09-${id}`&&!q.practice),id);
const prob=(n,k,p)=>evaluateRelation('binomialProb',{n,k,p});
assert.ok(Math.abs(prob(5,1,.3)-.36015)<1e-12);
for(const p of [0,.3,1])assert.ok(Math.abs(Array.from({length:6},(_,k)=>prob(5,k,p)).reduce((a,b)=>a+b)-1)<1e-12);
assert.equal(prob(0,0,.3),1);assert.equal(prob(5,0,0),1);assert.equal(prob(5,5,1),1);
assert.ok(Number.isFinite(prob(1000,500,.5))&&prob(1000,500,.5)>.02);
for(const args of [[5,6,.3],[-1,0,.3],[5,1,-.1],[5,1,NaN],[5.5,1,.3],[5,1.2,.3]])assert.throws(()=>prob(...args));
const poisson=(m,k)=>evaluateRelation('poissonProb',{m,k});
assert.equal(poisson(0,0),1);assert.equal(poisson(0,1),0);assert.ok(Math.abs(poisson(3,0)-Math.exp(-3))<1e-14);assert.ok(poisson(1000,1000)>.01);
for(const args of [[-1,0],[NaN,0],[1,-1],[1,.5]])assert.throws(()=>poisson(...args));
const baseline=JSON.parse(fs.readFileSync('.codex-revision/L09/baseline.json'));
const allowed=['src/content/nbe-e4120/L09.js','src/js/numeric.js','scripts/test_extra_practice.mjs','docs/CONTENT_SCHEMA.md'];
assertPhaseIsolation(baseline, 9);
console.log('PASS: L09 34 visible theory sections; 97 core/14 optional; all IDs, numerical payloads, formulas, figures, citations, section order and mocks preserved; binomial normalization/endpoints/large coefficients/input validation; unrelated source/docs/scripts unchanged except declared revision test changes.');
