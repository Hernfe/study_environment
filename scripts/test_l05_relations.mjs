import assert from 'node:assert/strict';
import {evaluateRelation as E,checkQuantity} from '../src/js/numeric.js';
import c from '../src/content/nbe-e4120/L05.js';
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-11*Math.max(Math.abs(a),Math.abs(b),1e-300),`${a} != ${b}`);
const p={diameter:3e-6,ri:1.2,rm:1.6};
const g=E('rallConductance',p),d=E('rallDiameter',{diameters:[1e-6,2e-6,3e-6]});
close(E('rallConductance',{...p,diameter:d}),[1e-6,2e-6,3e-6].reduce((a,diameter)=>a+E('rallConductance',{...p,diameter}),0));
for(const length of [.00001,.2,1,10,1000]){
 close(E('rallConductance',{...p,length})*E('sealedResistance',{resistance:1/g,length}),1);
 close(E('rallConductance',{...p,length}),g*Math.tanh(length));
 if(length<10)assert.ok(Math.abs(E('sealedLength',{fraction:1/Math.cosh(length)})-length)<1e-12); // inverse near unity is ill-conditioned in binary64
}
assert.equal(Math.abs(E('passiveDecay',{v:-.004,time:1000,tau:.01})),0);
close(E('sealedLength',{fraction:1e-200}),Math.log(2)-Math.log(1e-200));
close(E('pathLength',{segments:[{length:.0002,lambda:.001},{length:.0003,lambda:.0005}]}),.8);
close(E('passiveDecay',{v:-.004,time:.02,tau:.01}),-.004*Math.exp(-2));
close(E('resistanceRetune',{resistance:2,old:.08,new:.16}),.5);
for(const [r,bad] of [['rallDiameter',{diameters:[]}],['rallDiameter',{diameters:[-1]}],['sealedLength',{fraction:0}],['sealedLength',{fraction:1.1}],['rallConductance',{...p,length:0}],['sealedResistance',{resistance:1,length:0}],['pathLength',{segments:[{length:1,lambda:0}]}]])assert.throws(()=>E(r,bad));
let answers=0;
function walk(x){if(!x||typeof x!=='object')return;if(x.verification&&'value'in x){const v=x.verification;close(E(v.relation,v.inputs)/(v.displayScale||1),x.value);assert.ok(checkQuantity(String(x.value)+' '+x.unit,x).correct);if(x.value!==0)assert.equal(checkQuantity('0',x).correct,false);answers++;}for(const v of Object.values(x))walk(v);}
walk(c);console.log(`L05 relations: conductance additivity/reciprocity, short/long sealed limits, inverse attenuation, paths, decay, resistance retuning and invalid domains PASS. ${answers} authored answers recomputed; supported units and nonzero rejection PASS.`);
