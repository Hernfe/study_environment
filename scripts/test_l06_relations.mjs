import assert from 'node:assert/strict';
import {evaluateRelation as e,parseQuantity,checkQuantity} from '../src/js/numeric.js';
import c from '../src/content/nbe-e4120/L06.js';
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-11*Math.max(Math.abs(a),Math.abs(b),1e-20),`${a} != ${b}`);
close(e('gateSteady',{alpha:30,beta:10}),.75);
close(e('gateDerivative',{alpha:30,beta:10,y:.75}),0);
for(const initial of [0,.2,.9,1])for(const steady of [0,.3,1]){
 close(e('gateRelax',{y0:initial,steady,time:0,tau:.02}),initial);
 close(e('gateRelax',{y0:initial,steady,time:100,tau:.02}),steady);
}
const a=20*Math.exp(.2),b=30*Math.exp(-.6),factor=Math.exp(.4);
close(e('gateSteady',{alpha:a,beta:b}),e('gateSteady',{alpha:a*factor,beta:b*factor}));
close(e('gatePower',{y:.6,count:3}),.216);
for(const [r,p] of [['gateSteady',{alpha:0,beta:0}],['gateDerivative',{alpha:-1,beta:1,y:.5}],['gateRelax',{y0:1.1,steady:.5,time:1,tau:1}],['gateRelax',{y0:0,steady:1,time:-1,tau:1}],['gatePower',{y:.5,count:2.5}],['exponentialRate',{base:-1,exponent:0}]])assert.throws(()=>e(r,p));
const p={permeability:1e-8,z:1,f:96485,r:8.314,temperature:293,inside:100,outside:20};
for(const v of [-100,-.1,-1e-12,0,1e-12,.1,100])assert.ok(Number.isFinite(e('ghkCurrent',{...p,v})));
close(e('ghkCurrent',{...p,v:0}),1e-8*96485*80);
const rev=p.r*p.temperature/p.f*Math.log(p.outside/p.inside);
assert.ok(Math.abs(e('ghkCurrent',{...p,v:rev}))<1e-14);
close(parseQuantity('0.03 1/ms','1/s').value,30);
assert.ok(parseQuantity('30 ms','1/s').error);
let n=0;
function walk(x){if(!x||typeof x!=='object')return;
 if(x.verification){const a=e(x.verification.relation,x.verification.inputs)/(x.verification.displayScale||1);assert.ok(Math.abs(a-(x.value??x.wrongValue))<=x.tolerance+1e-12*Math.abs(a));if(x.value!==undefined){assert.ok(checkQuantity(String(x.value)+(x.unit?' '+x.unit:''),x).correct);if(x.value!==0)assert.equal(checkQuantity('0',x).correct,false);}n++;}
 for(const [k,v] of Object.entries(x))if(k!=='verification')walk(v);
}walk(c);
console.log(`L06 relations: gating balance/limits, barrier-rate scaling, particle rule, rate units, invalid domains, GHK zero/reversal/extreme voltages PASS. ${n} authored values recomputed; nonzero answers reject zero PASS.`);
