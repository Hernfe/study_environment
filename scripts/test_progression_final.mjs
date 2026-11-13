// Final integration audit. Requires the preserved local progression snapshots.
// Verifies original payloads rather than phase completion marks. Writes local QA evidence only.
import fs from 'node:fs';import assert from 'node:assert/strict';import crypto from 'node:crypto';import {pathToFileURL} from 'node:url';
import {fullCourseMocks} from '/work/src/content/nbe-e4120/final-mocks.js';import {seededOrder} from '/work/src/js/dom.js';
const out='/work/.codex-progression/audit-current/';const baseline=JSON.parse(fs.readFileSync('/work/.codex-progression/framework/content-before.json'));const hash=x=>crypto.createHash('sha256').update(JSON.stringify(x)).digest('hex');const rows=[],mockRows=[],inventory=[];let allPrompts=new Map(),duplicates=[];
for(let i=1;i<=9;i++){
 const id=`L0${i}`,file=`/work/src/content/nbe-e4120/${id}.js`;const c=(await import(file)).default;
 const oldFile=`/work/.codex-progression/${id}/${id}.before.js`;
 let text=fs.readFileSync(oldFile,'utf8').replace("'./equation-sheet.js'",JSON.stringify('file:///work/src/content/nbe-e4120/equation-sheet.js')).replaceAll('import.meta.url',JSON.stringify(pathToFileURL(file).href));
 const old=(await import('data:text/javascript;base64,'+Buffer.from(text).toString('base64'))).default;
 assert.equal(hash(old),baseline[i-1].contentHash,`${id} original baseline hash`);
 for(const key of Object.keys(old).filter(k=>k!=='sections'))assert.deepEqual(c[key],old[key],`${id} preserved ${key}`);
 assert.deepEqual(c.lectureQuiz,old.lectureQuiz,`${id} complete bank bytes`);
 const revision=JSON.parse(fs.readFileSync('/work/.codex-revision/final-audit/mock-manifest.json')).find(r=>r.lecture===id);
 assert.equal(hash(c.mockExams),revision.sha256,`${id} conservative-revision whole-mock bytes`);
 assert.deepEqual(c.mockExams,old.mockExams,`${id} complete original mocks`);
 assert.deepEqual(c.sections.map(s=>({...s,conceptQuiz:undefined})),old.sections.map(s=>({...s,conceptQuiz:undefined})),`${id} section order/theory/formulas/figures`);
 const authored=[0,0,0],shown=[0,0,0];let added=0,reused=0;
 c.sections.forEach((s,j)=>{assert.ok(s.conceptQuiz.length>=2&&s.conceptQuiz.length<=4);const seen=new Set();for(const q of s.conceptQuiz){assert.ok(!seen.has(q.prompt));seen.add(q.prompt);assert.ok(q.options.every(o=>o.feedback?.length>15));assert.ok(!c.lectureQuiz.some(b=>b.prompt===q.prompt));if(q.progressionAdded){added++;assert.equal(q.difficulty,'easy');assert.equal(q.type,'mc');assert.ok(q.source);}else{reused++;const orig=old.sections[j].conceptQuiz.find(o=>o.id===q.id);assert.ok(orig);assert.equal(q.correct,orig.correct);}
 authored[q.correct]++;shown[seededOrder(q.options.length,`${id}:${q.id}`).indexOf(q.correct)]++;
 inventory.push(`${id}/${s.id} | ${q.source||'reused: section source'} | ${q.prompt}\n${q.options.map((o,k)=>`${k===q.correct?'*':'-'} ${o.text} :: ${o.feedback}`).join('\n')}`);
 }});
 for(const m of c.mockExams){mockRows.push({lecture:id,id:m.id,before:hash(old.mockExams.find(o=>o.id===m.id)),after:hash(m),bytes:Buffer.byteLength(JSON.stringify(m))});for(const q of m.questions){const key=q.prompt.replace(/\s+/g,' ').trim();if(allPrompts.has(key))duplicates.push([allPrompts.get(key),`${m.id}/${q.id}`]);allPrompts.set(key,`${m.id}/${q.id}`);}}
 rows.push({id,sections:c.sections.length,reused,added,starters:added+reused,core:c.lectureQuiz.filter(q=>q.practice!=='extra').length,optional:c.lectureQuiz.filter(q=>q.practice==='extra').length,authored,shown,formulas:c.sections.reduce((n,s)=>n+(s.formulas?.length||0),0)});
}
for(const m of fullCourseMocks)for(const q of m.questions){const key=q.prompt.replace(/\s+/g,' ').trim();assert.ok(!allPrompts.has(key),q.id+' duplicate');allPrompts.set(key,q.id);}
fs.writeFileSync(out+'content-audit.json',JSON.stringify({rows,mockRows,existingMockDuplicatePrompts:duplicates,fullMocks:fullCourseMocks.map(m=>({id:m.id,questions:m.questions.map(q=>({id:q.id,role:q.role,source:q.source,prompt:q.prompt}))}))},null,2));fs.writeFileSync(out+'starter-review.txt',inventory.join('\n\n'));
console.log(JSON.stringify({rows,oldMocks:mockRows.length,totalMocks:mockRows.length+fullCourseMocks.length,existingMockDuplicatePrompts:duplicates},null,2));
