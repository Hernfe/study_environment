import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { parseHTML } from 'linkedom';
const {document,window}=parseHTML('<!doctype html><html><body data-course="nbe-e4120"></body></html>');
globalThis.document=document;globalThis.window=window;
const records=new Map();
window.localStorage={getItem:k=>records.get(k)??null,setItem:(k,v)=>records.set(k,v),removeItem:k=>records.delete(k)};
const {renderConceptQuiz,createMcBody}=await import('../src/js/conceptQuiz.js');
const {renderSectionPractice}=await import('../src/js/extraPractice.js');
const {getLectureProgress}=await import('../src/js/progress.js');
const {seededOrder}=await import('../src/js/dom.js');
const hash=x=>crypto.createHash('sha256').update(JSON.stringify(x)).digest('hex');
const baseline=JSON.parse(fs.readFileSync('.codex-progression/framework/content-before.json'));
const distribution=[0,0,0,0];let mocks=0,core=0,optional=0,concepts=0;
for(const old of baseline){
 const {default:c}=await import(`../src/content/nbe-e4120/${old.id}.js`);
 assert.equal(hash(c),old.contentHash,`${old.id} content changed`);
 assert.deepEqual(c.mockExams.map(m=>({id:m.id,hash:hash(m)})),old.mocks);
 mocks+=c.mockExams.length;core+=old.core;optional+=old.optional.length;
 for(const s of c.sections){
  assert.ok(s.blocks[0].type==='text');assert.ok(s.conceptQuiz.length);
  for(const q of s.conceptQuiz){
   assert.ok(q.options.every(o=>o.feedback?.trim()));
   distribution[seededOrder(q.options.length,`${c.meta.id}:${q.id}`).indexOf(q.correct)]++;
   const node=renderConceptQuiz([q],{lectureId:c.meta.id,bestGuess:true});
   assert.equal(node.querySelectorAll('.option-feedback,details').length,0);
   const before=[...node.querySelectorAll('.option')].map(b=>b.textContent);
   const correct=node.querySelectorAll('.option')[seededOrder(q.options.length,`${c.meta.id}:${q.id}`).indexOf(q.correct)];
   correct.click();node.querySelector('.btn-primary').click();
   assert.equal(node.querySelectorAll('.option-feedback').length,q.options.length);
   assert.equal(getLectureProgress(c.meta.id).concept[q.id].attempts,1);
   const restored=renderConceptQuiz([q],{lectureId:c.meta.id,bestGuess:true});
   assert.deepEqual([...restored.querySelectorAll('.option')].map(b=>b.firstChild.textContent),before);
   assert.equal(restored.querySelectorAll('.is-correct').length,2);
   assert.equal(getLectureProgress(c.meta.id).concept[q.id].attempts,1);
   restored.querySelector('.btn:not(.btn-primary)').click();
   assert.equal(restored.querySelectorAll('.option-feedback,details').length,0);
   concepts++;
  }
 }
}
assert.equal(mocks,27);assert.equal(core,609);assert.equal(optional,80);assert.equal(concepts,239);
// Per-section stable partition, numeric easy follows MCQ, optional stays closed and last.
const qs=[{id:'hard',difficulty:'hard'},{id:'numeric',type:'calc',difficulty:'easy'},{id:'medium',difficulty:'medium'},{id:'mc',type:'mc',difficulty:'easy'},{id:'extra',type:'mc',difficulty:'easy',practice:'extra'}];
const saved=JSON.stringify(qs);
const draw=q=>{const n=document.createElement('article');n.id=q.id;return n;};
for(let i=0;i<2;i++){
 const host=document.createElement('div');host.append(...renderSectionPractice(qs,draw));
 assert.deepEqual([...host.querySelectorAll(':scope > article')].map(n=>n.id),['mc','numeric','medium','hard']);
 assert.equal(host.lastElementChild.tagName,'DETAILS');assert.ok(!host.lastElementChild.hasAttribute('open'));
 assert.ok(!host.querySelector('article').hasAttribute('disabled'));
}
assert.equal(JSON.stringify(qs),saved);
// Wrong-answer explanation, authored index correctness, retry and deterministic reconstruction.
const q={id:'synthetic',prompt:'Choose',correct:1,options:[{text:'First option',feedback:'Misconception one'},{text:'Other option',feedback:'Concept explanation'},{text:'Third option',feedback:'Misconception two'}],hints:[{body:'ANSWER CLUE'},{body:'MORE CLUE'}],modelAnswer:['MODEL CLUE']};
let result;const body=createMcBody(q,{seed:'L01:synthetic',showAllFeedback:true,onCheck:r=>result=r});
assert.ok(!body.root.textContent.includes('Misconception'));
body.root.querySelectorAll('.option')[seededOrder(3,'L01:synthetic').indexOf(0)].click();body.root.querySelector('.btn-primary').click();
assert.deepEqual(result,{correct:false,index:0});assert.equal(body.root.querySelectorAll('.option-feedback').length,3);
const fresh=renderConceptQuiz([q],{lectureId:'fixture',bestGuess:true});
assert.ok(!fresh.textContent.includes('CLUE'));fresh.querySelector('.option').click();fresh.querySelector('.btn-primary').click();assert.ok(fresh.textContent.includes('CLUE'));
// Existing course behavior and progress namespace remain unchanged.
document.body.dataset.course='nbe-e4210';
const old=renderConceptQuiz([q],{lectureId:'fixture'});assert.ok(old.textContent.includes('CLUE'));assert.ok(!old.textContent.includes('best guess'));
assert.equal(getLectureProgress('L01').concept['cells-check'],undefined);
const host=document.createElement('div');host.append(...renderSectionPractice(qs,draw));
assert.deepEqual([...host.querySelectorAll(':scope > article')].map(n=>n.id),['numeric','mc','extra','medium','hard']);assert.equal(host.querySelector('details'),null);
// Compatibility with historical version-1 records and unrelated saved drafts.
document.body.dataset.course='nbe-e4120';
const historical={version:1,questions:{oldBank:{attempts:2,correct:1,lastResult:'missed',score:1,max:3}},concept:{synthetic:{attempts:4,correct:2,hints:[2],custom:'preserve'}},lastQuizAt:123};
records.set('nbe:nbe-e4120:progress:historical',JSON.stringify(historical));
records.set('nbe:nbe-e4120:practice:mock:historical:a',JSON.stringify({answers:{0:'written draft'},submitted:false}));
records.set('nbe:nbe-e4120:practice:drill:existing',JSON.stringify({hints:[1]}));
const history=renderConceptQuiz([q],{lectureId:'historical',bestGuess:true});
assert.equal(getLectureProgress('historical').concept.synthetic.attempts,4);
history.querySelector('.option').click();history.querySelector('.btn-primary').click();
const updated=getLectureProgress('historical');assert.equal(updated.concept.synthetic.attempts,5);assert.equal(updated.concept.synthetic.custom,'preserve');assert.deepEqual(updated.concept.synthetic.hints,[2]);assert.deepEqual(updated.questions,historical.questions);assert.equal(updated.lastQuizAt,123);
renderConceptQuiz([q],{lectureId:'historical',bestGuess:true});assert.equal(getLectureProgress('historical').concept.synthetic.attempts,5);
assert.equal(records.get('nbe:nbe-e4120:practice:mock:historical:a'),JSON.stringify({answers:{0:'written draft'},submitted:false}));
assert.equal(records.get('nbe:nbe-e4120:practice:drill:existing'),JSON.stringify({hints:[1]}));
// Storage failure and invalid restored indices must not prevent practice.
document.body.dataset.course='nbe-e4120';window.localStorage={getItem(){throw Error('blocked')},setItem(){throw Error('blocked')}};
assert.doesNotThrow(()=>renderConceptQuiz([q],{lectureId:'blocked',bestGuess:true}));
assert.doesNotThrow(()=>createMcBody(q).restore(400));
console.log(JSON.stringify({pass:true,concepts,core,optional,mocks,displayedCorrectPositions:distribution}));
