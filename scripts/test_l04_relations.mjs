import assert from 'node:assert/strict';
import {evaluateRelation as E,checkQuantity} from '../src/js/numeric.js';
const near=(a,b,t=1e-10)=>assert.ok(Math.abs(a-b)<=t*Math.max(1e-300,Math.abs(b)),`${a} != ${b}`);
for(const length of [1e-8,.1,1,3,1000])for(const x of [0,length/3,length]){
 const base={v:.01,length,x,load:0};
 near(E('finiteCable',{...base,load:1}),.01*Math.exp(-x));
 near(E('finiteCable',{...base,mode:'open',x:length}),0);
 near(E('finiteCable',{...base,x:0}),.01);
 near(E('endpointCable',{v0:.01,ve:-.002,length,x:0}),.01);
 near(E('endpointCable',{v0:.01,ve:-.002,length,x:length}),-.002);
 if(length<100) {
  near(E('finiteCable',base),.01*Math.cosh(length-x)/Math.cosh(length));
  near(E('finiteCable',{...base,mode:'open'}),.01*Math.sinh(length-x)/Math.sinh(length));
 }
}
for(const load of [0,.2,1,2,50]) {
 const p={v:.01,length:1.3,x:1.3,load};const h=1e-5;
 const slope=(E('finiteCable',p)-E('finiteCable',{...p,x:p.x-h}))/h;
 assert.ok(Math.abs(slope+load*E('finiteCable',p))<1e-7,'Terminal current condition fails');
}
assert.throws(()=>E('finiteCable',{v:1,length:0,x:0,load:0}));
assert.throws(()=>E('finiteCable',{v:1,length:1,x:2,load:0}));
assert.throws(()=>E('finiteCable',{v:1,length:1,x:.5,load:-1}));
near(E('passiveSpeed',{lambda:.001,tau:.02}),.1);
near(E('passivePosition',{lambda:.001,tau:.02,time:.03}),.0025);
near(E('powerRatio',{a:4,b:1,power:-1.5}),.125);
near(E('annulus',{radius:40e-9,shell:4e-9}),Math.PI*336e-18);
near(E('annulus',{radius:1,shell:1e-12}),Math.PI*1e-12*(2+1e-12));
for(const [input,a] of [['100 um/ms',{value:.1,unit:'m/s',tolerance:1e-9}],['12 kΩ·cm²',{value:1.2,unit:'ohm*m2',tolerance:1e-8}],['150 Ω·cm',{value:1.5,unit:'ohm*m',tolerance:1e-8}]])assert.equal(checkQuantity(input,a).correct,true);
assert.ok(checkQuantity('1 mV',{value:.1,unit:'m/s',tolerance:1e-9}).error);
console.log('L04 relations: finite boundary identities, matched/long/short limits, terminal current, invalid domains, speed, contour, geometry, radius powers and equivalent units PASS.');
// Extreme but valid inputs must not lose the open-limit result to cancellation.
near(E('finiteCable',{v:1,length:1e-12,x:.5e-12,load:1e30}),.5,1e-9);
near(E('infiniteCable',{current:1e-10,ri:2e11,lambda:.0005,x:-.0005}),.005/Math.E);
const {default:content}=await import('../src/content/nbe-e4120/L04.js');let operands=0;
function visit(x){if(!x||typeof x!=='object')return;if('value'in x&&'tolerance'in x&&'unit'in x){assert.ok(!checkQuantity(String(x.value),x).error,`Unsupported authored unit ${x.unit}`);if(x.value!==0)assert.equal(checkQuantity('0',x).correct,false,'Nonzero substitution must reject zero');operands++;}for(const v of Object.values(x))visit(v)}visit(content);
console.log(`L04 authored numeric integration: ${operands} supported answer units; every nonzero operand rejects zero; near-open short-cable stability PASS.`);
