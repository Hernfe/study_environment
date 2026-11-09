import assert from 'node:assert/strict';
import c from '../src/content/nbe-e4120/L09.js';
import {evaluateRelation,checkQuantity,parseQuantity} from '../src/js/numeric.js';
for(const [text,unit] of [['2 mV/ms','A/F'],['2 pA/pF','V/s'],['2 A/F','mV/ms'],['2 V/s','pA/pF']])assert.ok(checkQuantity(text,{value:2,unit,tolerance:1e-12}).correct,text);
assert.ok(parseQuantity('1e308 Gohm','ohm').error);
assert.ok(Number.isFinite(parseQuantity('1e308 Gohm','Gohm').value));
let n=0;function walk(x){if(!x||typeof x!=='object')return;if(x.verification){const a=x.value??x.wrongValue, b=evaluateRelation(x.verification.relation,x.verification.inputs)/(x.verification.displayScale||1);assert.ok(Math.abs(a-b)<=Math.max(Math.abs(a),1e-100)*1e-10);if(x.value!==undefined){assert.ok(checkQuantity(`${x.value} ${x.unit}`,x).correct);if(x.value)assert.equal(checkQuantity('0',x).correct,false);}n++;}for(const[k,v]of Object.entries(x))if(k!=='verification')walk(v);}walk(c);
assert.equal(c.sections.length,34);assert.equal(c.mockExams.length,3);
for(const s of c.sections){assert.ok(s.source);assert.ok(s.conceptQuiz.length);if(s.id!=='overview')assert.ok(c.lectureQuiz.some(q=>q.sectionId===s.id));}
assert.ok(c.lectureQuiz.every(q=>q.source&&q.hints.length===2));
console.log(`L09 relations PASS: ${n} authored numeric records; signed unitary/population currents, charge, occupancy, all mock stages, zero rejection, equivalent voltage-slope units and conversion overflow.`);
