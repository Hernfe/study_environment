import assert from 'node:assert/strict';
import {evaluateRelation as e,checkQuantity} from '../src/js/numeric.js';
import c from '../src/content/nbe-e4120/L07.js';
const near=(a,b)=>assert.ok(Math.abs(a-b)<=1e-10*Math.max(Math.abs(a),Math.abs(b),1e-20),`${a} != ${b}`);
near(e('hhRate',{gate:'an',voltage:.01}),100);
near(e('hhRate',{gate:'am',voltage:.025}),1000);
for(const [gate,v] of [['an',.01],['am',.025]])for(const delta of [-1e-12,1e-12])near(e('hhRate',{gate,voltage:v+delta}),e('hhRate',{gate,voltage:v}));
for(const voltage of [-.05,0,.015,.06])for(const gate of ['an','bn','am','bm','ah','bh'])assert.ok(e('hhRate',{gate,voltage})>0);
assert.throws(()=>e('hhRate',{gate:'bad',voltage:0}));assert.throws(()=>e('hhRate',{gate:'an',voltage:NaN}));
near(e('hhRate',{gate:'bn',voltage:0}),125);near(e('hhRate',{gate:'bm',voltage:0}),4000);near(e('hhRate',{gate:'ah',voltage:0}),70);
let records=0;
function walk(x){if(!x||typeof x!=='object')return;if(x.verification){const v=e(x.verification.relation,x.verification.inputs)/(x.verification.displayScale||1);assert.ok(Math.abs(v-(x.value??x.wrongValue))<=(x.tolerance||0)+1e-12*Math.abs(v));if(x.value!==undefined){assert.ok(checkQuantity(String(x.value)+' '+x.unit,x).correct);if(x.value!==0)assert.equal(checkQuantity('0',x).correct,false);}records++;}for(const [k,v]of Object.entries(x))if(k!=='verification')walk(v);}
walk(c);console.log(`L07 relations: six empirical rates, rest-relative origin, per-ms conversion, removable singularities and invalid inputs PASS. ${records} authored values recomputed; nonzero answers reject zero PASS.`);
