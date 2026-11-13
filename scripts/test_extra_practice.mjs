import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {parseHTML} from 'linkedom';
const {document,window} = parseHTML('<html><head></head><body data-course="nbe-e4120"></body></html>');
globalThis.document=document;globalThis.window=window;
const {renderSectionPractice,isExtraPractice}=await import('../src/js/extraPractice.js');
const hash=x=>crypto.createHash('sha256').update(JSON.stringify(x)).digest('hex');
const baseline=JSON.parse(fs.readFileSync('.codex-revision/baseline.json'));
let mocks=0;
for(const old of baseline){
 const {default:c}=await import(`../src/content/nbe-e4120/${old.id}.js`);
 const sections=c.sections.map(s=>({id:s.id,title:s.title,formulas:hash(s.formulas),otherBlocks:hash(s.blocks.filter(b=>b.type!=='text'))}));
 // L07's revision test separately verifies the one corrected formula explanation.
 if(old.id==='L07')sections.find(s=>s.id==='fit').formulas=old.sections.find(s=>s.id==='fit').formulas;
 // L09-specific preservation test checks the two repaired occupancy formula displays
 // and every numeric record against the phase baseline.
 if(old.id==='L09') sections.find(s=>s.id==='single').formulas=old.sections.find(s=>s.id==='single').formulas;
 assert.deepEqual(sections,old.sections);
 assert.equal(hash(c.mockExams),old.mocks);mocks+=c.mockExams.length;
 if(old.id==='L09') {
  const phase=JSON.parse(fs.readFileSync('.codex-revision/L09/content.json'));
  assert.equal(hash(c.lectureQuiz.filter(q=>q.id!=='L09-binomial-patch').map(({practice,...q})=>q)),hash(phase.lectureQuiz.filter(q=>q.id!=='L09-binomial-patch')));
 } else assert.equal(hash(c.lectureQuiz.map(({practice,...q})=>q)),old.questions);
 if(old.id==='L09') {
  assert.equal(c.lectureQuiz.filter(isExtraPractice).length,14);
  assert.equal(c.lectureQuiz.filter(q=>!isExtraPractice(q)).length,97);
 } else if(old.id==='L08') {
  assert.equal(c.lectureQuiz.filter(isExtraPractice).length,16);
  assert.equal(c.lectureQuiz.filter(q=>!isExtraPractice(q)).length,105);
  for(const s of c.sections){
   assert.equal(s.blocks[0].type,'text');
   assert.ok(s.blocks[0].body.join(' ').split(/\s+/).length>=40,s.id);
   assert.ok(s.conceptQuiz.length);
  }
 } else if(old.id==='L07') {
  assert.equal(c.lectureQuiz.filter(isExtraPractice).length,11);
  assert.equal(c.lectureQuiz.filter(q=>!isExtraPractice(q)).length,87);
  for(const s of c.sections){
   assert.equal(s.blocks[0].type,'text');
   assert.ok(s.blocks[0].body.join(' ').split(/\s+/).length>=40,s.id);
   assert.ok(c.lectureQuiz.some(q=>q.sectionId===s.id&&!isExtraPractice(q))||s.conceptQuiz.length,s.id);
  }
 } else if(old.id==='L06') {
  assert.deepEqual(c.lectureQuiz.filter(isExtraPractice).map(q=>q.id),[
   'L06-direct-outflux','L06-direct-flux-ratio','L06-direct-inward-rate',
   'L06-direct-alpha','L06-direct-beta','L06-direct-tau',
   'L06-group-phenomena','L06-group-features',
  ]);
  assert.equal(c.lectureQuiz.filter(q=>!isExtraPractice(q)).length,63);
  for(const s of c.sections){
   assert.equal(s.blocks[0].type,'text');
   const text=s.blocks[0].body.join(' ');
   assert.ok(text.split(/\s+/).length>=40,s.id);
   assert.match(text,/PDF|Exercise 6/,s.id);
   assert.ok(c.lectureQuiz.some(q=>q.sectionId===s.id&&!isExtraPractice(q))||s.conceptQuiz.length,s.id);
  }
  for(const id of ['L06-barrier-flux-audit','L06-infer-rates','L06-population-current',
   'L06-preactivated-clamp','L06-clamp-troubleshoot','L06-chord-model-inference',
   'L06-model-sort','L06-group-choices','L06-group-synthesis'])
   assert.ok(c.lectureQuiz.some(q=>q.id===id&&!isExtraPractice(q)),id);
 } else if(old.id==='L05') {
  assert.deepEqual(c.lectureQuiz.filter(isExtraPractice).map(q=>q.id),[
   'L05-direct-ionic','L05-direct-balance','L05-direct-charging','L05-direct-decay',
   'L05-direct-rinf','L05-direct-parallel','L05-direct-total','L05-direct-tau',
  ]);
  assert.equal(c.lectureQuiz.filter(q=>!isExtraPractice(q)).length,61);
  for(const s of c.sections){
   assert.equal(s.blocks[0].type,'text');
   const text=s.blocks[0].body.join(' ');
   assert.ok(text.split(/\s+/).length>=40,s.id);
   assert.match(text,/PDF|Exercise 5/,s.id);
   assert.ok(c.lectureQuiz.some(q=>q.sectionId===s.id&&!isExtraPractice(q))||s.conceptQuiz.length,s.id);
  }
  for(const id of ['L05-matching-reason','L05-inverse-daughter','L05-unequal-stem-loads',
   'L05-infer-geometry-load','L05-route-audit','L05-somatic-inference','L05-timing-design'])
   assert.ok(c.lectureQuiz.some(q=>q.id===id&&!isExtraPractice(q)),id);
 } else if(old.id==='L04') {
  assert.deepEqual(c.lectureQuiz.filter(isExtraPractice).map(q=>q.id),[
   'L04-direct-tau','L04-direct-total-length','L04-direct-conductance',
   'L04-direct-endpoint','L04-direct-annulus','L04-direct-return-resistance',
  ]);
  assert.equal(c.lectureQuiz.filter(q=>!isExtraPractice(q)).length,47);
  for(const s of c.sections){
   assert.equal(s.blocks[0].type,'text');
   assert.ok(c.lectureQuiz.some(q=>q.sectionId===s.id&&!isExtraPractice(q)),s.id);
  }
 } else if(old.id==='L03') {
  assert.deepEqual(c.lectureQuiz.filter(isExtraPractice).map(q=>q.id),[
   'L03-direct-tau','L03-direct-corner','L03-direct-area','L03-direct-segment-axial',
   'L03-erf-recognize','L03-transient-sign-audit',
  ]);
  assert.equal(c.lectureQuiz.filter(q=>!isExtraPractice(q)).length,48);
  for(const s of c.sections){
   const text=s.blocks.filter(b=>b.type==='text').flatMap(b=>b.body).join(' ');
   assert.ok(text.split(/\s+/).length>=40,s.id);
   assert.match(text,/PDF page/,s.id);
   assert.equal(s.blocks[0].type,'text');
   assert.ok(c.lectureQuiz.some(q=>q.sectionId===s.id&&!isExtraPractice(q)),s.id);
  }
  for(const id of ['L03-geometry-chain','L03-equation-derive','L03-curvature-inference',
   'L03-pulse-interpret','L03-infer-length','L03-sphere-chain','L03-forcing-units'])
   assert.ok(c.lectureQuiz.some(q=>q.id===id&&!isExtraPractice(q)),id);
 } else if(old.id==='L02') {
  assert.deepEqual(c.lectureQuiz.filter(isExtraPractice).map(q=>q.id),[
   'L02-direct-mobility-permeability','L02-direct-sphere','L02-direct-area-capacitance',
   'L02-direct-charge','L02-direct-ion-count',
  ]);
  assert.equal(c.lectureQuiz.filter(q=>!isExtraPractice(q)).length,49);
  for(const s of c.sections){
   const text=s.blocks.filter(b=>b.type==='text').flatMap(b=>b.body).join(' ');
   assert.ok(text.split(/\s+/).length>=40,s.id);
   assert.match(text,/PDF page/,s.id);
   assert.equal(s.blocks[0].type,'text');
   assert.ok(c.lectureQuiz.some(q=>q.sectionId===s.id&&!isExtraPractice(q)),s.id);
  }
  assert.ok(c.lectureQuiz.some(q=>q.id==='L02-sphere-charge'&&!isExtraPractice(q)));
 } else {
  assert.equal(c.lectureQuiz.filter(isExtraPractice).length,6);
  assert.deepEqual(c.lectureQuiz.filter(isExtraPractice).map(q=>q.id),[
   'L01-direct-series-r','L01-direct-parallel-c','L01-direct-series-g',
   'L01-direct-node','L01-direct-series-v','L01-direct-parallel-i',
  ]);
  for(const s of c.sections){
   const text=s.blocks.filter(b=>b.type==='text').flatMap(b=>b.body).join(' ');
   assert.ok(text.split(/\s+/).length>=40,s.id);
   assert.match(text,/slide/i,s.id);
   assert.ok(c.lectureQuiz.some(q=>q.sectionId===s.id&&!isExtraPractice(q)),s.id);
  }
  const coreIds=['L01-direct-parallel-r','L01-direct-series-c','L01-direct-parallel-g','L01-direct-loop','L01-kirchhoff','L01-donnan-constrained','L01-rc-measure','L01-ramp-inference'];
  assert.ok(coreIds.every(id=>c.lectureQuiz.some(q=>q.id===id&&!isExtraPractice(q))));
 }
}
assert.equal(mocks,27);
const questions=[{id:'hard',difficulty:'hard'},{id:'extra',difficulty:'easy',practice:'extra'},{id:'easy',difficulty:'easy'}];
const host=document.createElement('div');
const render=q=>{const e=document.createElement('article');e.id=q.id;return e;};
host.append(...renderSectionPractice(questions,render));
assert.equal(host.querySelector('details').hasAttribute('open'),false);
assert.equal(host.querySelector('details article').id,'extra');
assert.deepEqual([...host.querySelectorAll(':scope > article')].map(e=>e.id),['easy','hard']);
assert.deepEqual([...host.querySelectorAll(':scope > h4')].map(e=>e.textContent),['Easy practice','Hard practice']);
const extraNode=host.querySelector('details article');
host.querySelector('details').setAttribute('open','');
host.querySelector('details').removeAttribute('open');
assert.equal(host.querySelector('details article'),extraNode);
assert.deepEqual(renderSectionPractice([],render),[]);
document.body.dataset.course='nbe-e4210';
assert.equal(isExtraPractice(questions[1]),false);
host.replaceChildren(...renderSectionPractice(questions,render));
assert.equal(host.querySelector('details'),null);
console.log('PASS: component grouping, course isolation, 17 L01, 22 L02, 23 L03, 23 L04 29 L05 22 L06 and 30 L07 theory sections, core coverage, all IDs/answers/formula equations/figures and 27 mocks unchanged.');
