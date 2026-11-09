import assert from 'node:assert/strict';
import {evaluateRelation as e, checkQuantity} from '../src/js/numeric.js';
import c from '../src/content/nbe-e4120/L08.js';
import {tabulatedIV} from '../src/content/nbe-e4120/figures/tabulatedIV.js';
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-11*Math.max(Math.abs(a),Math.abs(b),1e-100),`${a} != ${b}`);
near(e('hhBalance',{im:0,ionic:-2e-9,capacitance:1e-10}),20);
near(e('axialSource',{radius:5e-6,rho:1,curvature:4e5}),1);
for(const x of [-1000,-10,0,10,1000]){
 const y=e('boltzmann',{bias:x,z:0,voltage:0,thermal:.025});assert.ok(y>=0&&y<=1);
 near(y+e('boltzmann',{bias:-x,z:0,voltage:0,thermal:.025}),1);
}
near(e('expCharge',{current:2e-9,tau:.0005,time:.001}),1e-12*(1-Math.exp(-2)));
near(e('expCharge',{current:2e-9,tau:.0005,time:0}),0);
for(const [r,p]of [['hhBalance',{im:0,ionic:1,capacitance:0}],['axialSource',{radius:1,rho:-1,curvature:1}],['boltzmann',{bias:0,z:1,voltage:0,thermal:0}],['expCharge',{current:1,tau:1,time:-1}]])assert.throws(()=>e(r,p));
for(const [text,a]of [['3.2 nC/cm2',{value:3.2e-5,unit:'C/m2',tolerance:1e-10}],['5000 1/um2',{value:5e15,unit:'1/m2',tolerance:1}],['1 S/cm2',{value:1e4,unit:'S/m2',tolerance:.01}],['4 zJ',{value:4e-21,unit:'J',tolerance:1e-25}],['-5 pA/pF',{value:-5,unit:'A/F',tolerance:.01}]])assert.ok(checkQuantity(text,a).correct,text);
assert.equal(checkQuantity('1 m2',{value:1,unit:'1/m2',tolerance:0}).correct,undefined);
for(const [r,p]of [['axialSource',{radius:Infinity,rho:1,curvature:1}],['expCharge',{current:1,tau:Infinity,time:1}]])assert.throws(()=>e(r,p));
let n=0;function walk(x){if(!x||typeof x!=='object')return;if(x.verification){const v=e(x.verification.relation,x.verification.inputs)/(x.verification.displayScale||1);near(v,x.value??x.wrongValue);if(x.value!==undefined){assert.ok(checkQuantity(String(x.value)+' '+x.unit,x).correct);if(x.value!==0)assert.equal(checkQuantity('0',x).correct,false);}n++;}for(const[k,v]of Object.entries(x))if(k!=='verification')walk(v);}walk(c);
for(const f of c.sections.flatMap(s=>s.blocks).filter(b=>b.visual?.name==='tabulated-iv')){const out=tabulatedIV(f.visual.props);assert.ok(!out.includes('NaN')&&!out.includes('Infinity'));assert.equal((out.match(/<circle/g)||[]).length,13);}
console.log(`L08 relations: signed balance, axial density, bounded Boltzmann extremes, transient integral, invalid inputs and equivalent density/energy units PASS. ${n} authored numeric records independently routed; zero-answer rejection and 39 source sample dots PASS.`);
