import assert from 'node:assert/strict';
import {evaluateRelation, checkQuantity} from '../src/js/numeric.js';
const close=(a,b,t=1e-10)=>assert.ok(Math.abs(a-b)<t,`${a} vs ${b}`);
const ghk={shortcut:.058,pk:1,pna:0,pcl:0,ko:10,ki:100,nao:150,nai:10,cli:5,clo:120};
close(evaluateRelation('ghkVoltage',ghk),-.058);
close(evaluateRelation('ghkVoltage',{...ghk,pk:10}),-.058);
close(evaluateRelation('weightedVoltage',{gk:2,gna:2,gcl:0,ek:-.08,ena:.04,ecl:0}),-.02);
close(evaluateRelation('nernstRatio',{delta:.058,shortcut:.058}),10);
close(evaluateRelation('sphereArea',{radius:1}),4*Math.PI);
const p={permeability:1e-8,z:1,f:96485,r:8.314,temperature:293,v:0,inside:120,outside:10};
const zero=evaluateRelation('ghkCurrent',p);
close(zero,.1061335);
close(evaluateRelation('ghkCurrent',{...p,v:1e-12}),zero,1e-9);
close(evaluateRelation('ghkCurrent',{...p,v:-1e-12}),zero,1e-9);
const v=.02,c=25;
close(evaluateRelation('ghkCurrent',{...p,v,inside:c,outside:c}),p.permeability*p.f*p.f/(p.r*p.temperature)*v*c);
assert.equal(checkQuantity('0.0004 cm/s',{value:4e-6,unit:'m/s',tolerance:1e-12}).correct,true);
assert.ok(checkQuantity('4 um',{value:4e-6,unit:'m/s',tolerance:1e-12}).error);
console.log('L02 relations: single-ion GHK limit, weight invariance, weighted voltage, reversal ratio, sphere, zero-voltage continuity, equal-concentration linearity and permeability dimensions PASS.');
const content=(await import('../src/content/nbe-e4120/L02.js')).default;
for(const q of content.lectureQuiz)for(const s of q.stages||[])for(const f of s.fields||[]) {
 if(f.answer.value!==0)assert.equal(checkQuantity('0',f.answer).correct,false,`${q.id}: zero accepted for ${f.label}`);
}
console.log('All nonzero L02 substitution operands reject zero PASS.');
