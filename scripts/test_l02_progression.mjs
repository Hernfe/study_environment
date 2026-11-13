// L02-only expansion acceptance; compares the captured dirty working tree, never HEAD.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {pathToFileURL} from 'node:url';
import {parseHTML} from 'linkedom';
import {seededOrder} from '../src/js/dom.js';
import c from '../src/content/nbe-e4120/L02.js';
const root='/work/';
let text=fs.readFileSync('.codex-progression/L02/L02.before.js','utf8')
 .replace("'./equation-sheet.js'",JSON.stringify(pathToFileURL(root+'src/content/nbe-e4120/equation-sheet.js').href))
 .replaceAll('import.meta.url',JSON.stringify(pathToFileURL(root+'src/content/nbe-e4120/L02.js').href));
const {default:old}=await import('data:text/javascript;base64,'+Buffer.from(text).toString('base64'));
const hash=x=>crypto.createHash('sha256').update(JSON.stringify(x)).digest('hex');
const prior=JSON.parse(fs.readFileSync('.codex-progression/framework/content-before.json'));
assert.equal(hash(old),prior[1].contentHash,'No prior interrupted content expansion');
for(const key of Object.keys(old).filter(k=>k!=='sections'))assert.deepEqual(c[key],old[key],key);
assert.equal(c.sections.length,22);
const {document,window}=parseHTML('<html><body data-course="nbe-e4120"></body></html>');
globalThis.document=document;globalThis.window=window;
const storage=new Map();window.localStorage={getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)};
const {renderConceptQuiz}=await import('../src/js/conceptQuiz.js');
const {getLectureProgress}=await import('../src/js/progress.js');
const {renderSectionPractice}=await import('../src/js/extraPractice.js');
const oldPrompts=new Set();
function collect(x){if(!x||typeof x!=='object')return;if(typeof x.prompt==='string')oldPrompts.add(x.prompt);for(const v of Object.values(x))collect(v);}
collect(old);
let added=0,reused=0;const authored=[0,0,0],displayed=[0,0,0],ids=new Set(),prompts=new Set();const rows=[];
const edits=new Set(c.sections.map(s=>s.id));
for(let i=0;i<c.sections.length;i++){
 const s=c.sections[i],before=old.sections[i];
 assert.deepEqual({...s,conceptQuiz:undefined},{...before,conceptQuiz:undefined});
 assert.ok(s.conceptQuiz.length>=2&&s.conceptQuiz.length<=4);
 const existing=s.conceptQuiz[0];assert.equal(existing.id,before.conceptQuiz[0].id);assert.equal(existing.correct,before.conceptQuiz[0].correct);reused++;
 if(!edits.has(s.id))assert.deepEqual(existing,before.conceptQuiz[0]);
 else { const strip=q=>({...q,options:q.options.map(({feedback,...o})=>['action-potential','iv'].includes(s.id)?{...o,text:undefined}:o)}); assert.deepEqual(strip(existing),strip(before.conceptQuiz[0])); }
 for(const q of s.conceptQuiz){
  assert.ok(!ids.has(q.id));ids.add(q.id);assert.ok(!prompts.has(q.prompt));prompts.add(q.prompt);
  assert.ok(q.options.every(o=>o.feedback.length>15));assert.equal(new Set(q.options.map(o=>o.text)).size,q.options.length);
  if(q.progressionAdded){assert.ok(!oldPrompts.has(q.prompt),'New prompt duplicates existing practice or mock');assert.equal(q.difficulty,'easy');assert.equal(q.type,'mc');assert.match(q.source,/L02 PDF/);added++;}
  authored[q.correct]++;const order=seededOrder(q.options.length,`L02:${q.id}`);displayed[order.indexOf(q.correct)]++;
  // Every new and reused question: no clue disclosures, wrong feedback, retry,
  // correct result and restored authored index without duplicate attempts.
  const node=renderConceptQuiz([q],{lectureId:'L02',bestGuess:true});
  assert.equal(node.querySelectorAll('.option-feedback,details').length,0);
  const wrong=(q.correct+1)%q.options.length;
  node.querySelectorAll('.option')[order.indexOf(wrong)].click();node.querySelector('.btn-primary').click();
  assert.equal(node.querySelectorAll('.option-feedback').length,q.options.length);
  assert.equal(getLectureProgress('L02').concept[q.id].correct,0);
  const restore=renderConceptQuiz([q],{lectureId:'L02',bestGuess:true});
  assert.equal(restore.querySelectorAll('.option-feedback').length,q.options.length);
  assert.equal(getLectureProgress('L02').concept[q.id].attempts,1);
  restore.querySelector('.btn:not(.btn-primary)').click();
  assert.equal(restore.querySelectorAll('.option-feedback,details').length,0);
  restore.querySelectorAll('.option')[order.indexOf(q.correct)].click();restore.querySelector('.btn-primary').click();
  assert.equal(getLectureProgress('L02').concept[q.id].attempts,2);
  assert.equal(getLectureProgress('L02').concept[q.id].correct,1);
  const correctRestored=renderConceptQuiz([q],{lectureId:'L02',bestGuess:true});
  assert.equal(correctRestored.querySelectorAll('.option.is-correct').length,1);
  assert.equal(getLectureProgress('L02').concept[q.id].attempts,2);
 }
 // Existing core bank independently progresses through easy, medium, hard;
 // optional remains a closed final panel. No bank relabelling or duplication.
 const qs=c.lectureQuiz.filter(q=>q.sectionId===s.id),draw=q=>{const n=document.createElement('article');n.id=q.id;return n;};
 const host=document.createElement('div');host.append(...renderSectionPractice(qs,draw));
 const mounted=[...host.querySelectorAll(':scope > article')].map(n=>c.lectureQuiz.find(q=>q.id===n.id));
 const tiers=mounted.map(q=>['easy','medium','hard'].indexOf(q.difficulty));assert.deepEqual(tiers,[...tiers].sort());
 assert.ok([...host.querySelectorAll('details')].every(n=>!n.hasAttribute('open')));
 rows.push({section:s.id,reused:1,added:s.conceptQuiz.length-1,total:s.conceptQuiz.length});
}
assert.equal(added,22);assert.equal(reused,22);
let core=0,optional=0,mocks=0;
for(const prev of prior){
 const {default:lecture}=await import(`../src/content/nbe-e4120/${prev.id}.js`);
 if(!['L01','L02'].includes(prev.id))assert.equal(hash(lecture),prev.contentHash,prev.id);
 assert.deepEqual(lecture.mockExams.map(m=>({id:m.id,hash:hash(m)})),prev.mocks);
 assert.deepEqual(lecture.lectureQuiz.filter(q=>q.practice==='extra').map(q=>q.id),prev.optional);
 core+=lecture.lectureQuiz.filter(q=>q.practice!=='extra').length;optional+=prev.optional.length;mocks+=lecture.mockExams.length;
}
assert.deepEqual([core,optional,mocks],[609,80,27]);
// Existing old concept record remains addressable; no migration or pruning.
assert.ok(getLectureProgress('L02').concept['L02-equilibrium-check']);assert.ok(getLectureProgress('L02').concept['L02-equilibrium-starter']);
const result={pass:true,sections:rows,added,reused,total:added+reused,authored,displayed,core,optional,mocks};
fs.writeFileSync('.codex-progression/L02/content-results.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));
