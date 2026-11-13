// Independent SI recomputation of cumulative exam answers. Included in check_calcs.py.
import assert from 'node:assert/strict';
import {checkQuantity} from '../src/js/numeric.js';
import {fullCourseMocks as exams} from '../src/content/nbe-e4120/final-mocks.js';
assert.equal(exams.length,5);
for(const e of exams) { assert.equal(e.questions.length,5); assert.deepEqual(e.questions.map(q=>q.role),['concepts','explanation','calculation','calculation','methods']); }
const log10=x=>Math.log(x)/Math.LN10;
const E1=.058*log10(9/144),E2=.058*log10(18/144);
const lambda=.00066/Math.log(12/4),d=(Math.pow(1.1e-6,1.5)+Math.pow(1.7e-6,1.5))**(2/3);
// 16000 ohm cm² = 1.6 ohm m²; 100 ohm cm = 1 ohm m.
const lp=Math.sqrt(1.6*(d/2)/(2*1));const y=.7+(.1-.7)*Math.exp(-.004/.004);
const tau=-.008/Math.log(1-.0045/.009),R=.009/60e-12,C=tau/R;
const pn=120*.09*.343/(2*6);
const expected=[
 [E1*1e3,E2*1e3,(E2-E1)*1e3,7e-9*(-.060-E2)*1e12],
 [lambda*1e3,.012*Math.exp(-.0011/lambda)*1e3,2*lambda/.015],
 [d*1e6,lp*1e6,240e-6/lp],
 [.7/4,.3/4,y,32e-9*y**4*1e9,32e-9*y**4*.025*1e12],
 [R/1e6,tau*1e3,C*1e12,60e-12/C,1/(2*Math.PI*tau)],
 [18e-12*(-.04-.01)*1e12,5*.3,5*.3*18e-12*(-.04-.01)*1e12,pn],
 [6+.04*145+.2*8,130+.04*12+.2*115,13.4/153.48,.058*log10(13.4/153.48)*1e3,.058*log10(25/154.44)*1e3],
 [.4*Math.sqrt(3),10,120*Math.pow(3,-1.5),50e-12*120e6*Math.pow(3,-1.5)*1e3,Math.sqrt(3)],
 [-90e-12/(-.025-.035)*1e9,-330e-12/(-.025-.035)*1e9,-.006/Math.log((-241.709+330)/(-90+330))*1e3,5.5e-9*(-.005-.035)*1e12],
 [80*.5**3*.4,25*.6**4,80*.5**3*.4*(-30-50),25*.6**4*(-30+80),2*(-30+60),-320+162+60,(30e-12-(-98e-12))/20e-12]
];
let values=0;
const numeric=exams.flatMap(e=>e.questions.filter(q=>q.stages));
numeric.forEach((q,i)=>q.stages.forEach((s,j)=>{const v=expected[i][j];assert.equal(checkQuantity(String(s.answer.value),s.answer).correct,true,`Supported units ${q.id} ${s.title}`);assert.ok(Math.abs(s.answer.value-v)<Math.max(1e-9,Math.abs(v)*1e-9),`${q.id} ${s.title}`);values++;
 const final=s.modelAnswer[0].match(/=\s*(-?\d+(?:\.\d+)?)\\?[, $]/g)?.at(-1)?.match(/-?\d+(?:\.\d+)?/)[0];
 if(final)assert.ok(Math.abs(Number(final)-v)<=Math.max(s.answer.tolerance,1e-5),`Worked final ${q.id}: ${final} vs ${v}`);
}));
console.log(`Cumulative calculation check: ${values} independently verified values, 0 failures.`);
