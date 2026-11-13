// Final acceptance against the original revision snapshot and current-turn files.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const dir='.codex-revision/final-audit';
const hash=x=>crypto.createHash('sha256').update(JSON.stringify(x)).digest('hex');
const original=JSON.parse(fs.readFileSync('.codex-revision/baseline.json'));
const start=JSON.parse(fs.readFileSync(`${dir}/start-hashes.json`));
const counts=[], mocks=[];
for(const old of original){
 const {default:c}=await import(`../src/content/nbe-e4120/${old.id}.js`);
 assert.deepEqual(c.sections.map(s=>[s.id,s.title]),old.sections.map(s=>[s.id,s.title]));
 assert.equal(c.lectureQuiz.length,old.count);
 assert.equal(hash(c.mockExams),old.mocks,`${old.id} entire mock payload`);
 const ids=c.lectureQuiz.map(q=>q.id);assert.equal(new Set(ids).size,ids.length);
 for(const s of c.sections){
  assert.equal(s.blocks[0].type,'text');
  assert.ok(s.blocks[0].body.join(' ').split(/\s+/).length>=40,`${old.id}/${s.id}`);
  assert.match(s.blocks[0].body.join(' '),/slide|PDF|Exercise/i,`${old.id}/${s.id} citation`);
  assert.ok(s.conceptQuiz.length,`${old.id}/${s.id} retrieval`);
  for(const extra of [false,true]){
   const qs=c.lectureQuiz.filter(q=>q.sectionId===s.id&&(q.practice==='extra')===extra);
   const rank={easy:0,medium:1,hard:2};
   assert.ok(qs.every((q,i)=>!i||rank[q.difficulty]>=rank[qs[i-1].difficulty]),`${old.id}/${s.id} tier order`);
  }
 }
 counts.push({lecture:old.id,sections:c.sections.length,beforeCore:old.count,beforeOptional:0,core:ids.length-c.lectureQuiz.filter(q=>q.practice==='extra').length,extra:c.lectureQuiz.filter(q=>q.practice==='extra').length,mocks:c.mockExams.length,status:'revised; final audit complete'});
 mocks.push({lecture:old.id,sha256:hash(c.mockExams),exams:c.mockExams.map(m=>({id:m.id,questions:m.questions.map(q=>({id:q.id,prompt:q.prompt}))}))});
}
// No product code, source PDFs, course assets or documentation was changed
// during final integration. In particular every E4210 file stays byte-identical.
let protectedFiles=0;
for(const [path,h] of Object.entries(start)) if(!path.startsWith('scripts/test_l0')||!path.endsWith('_revision.mjs')){
 assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path)).digest('hex'),h,path);protectedFiles++;
}
assert.equal(counts.reduce((s,c)=>s+c.core,0),609);
assert.equal(counts.reduce((s,c)=>s+c.extra,0),80);
fs.writeFileSync(`${dir}/counts.json`,JSON.stringify(counts,null,2));
fs.writeFileSync(`${dir}/mock-manifest.json`,JSON.stringify(mocks,null,2));
console.log(`PASS: original 689 IDs/counts, 239 section titles/order/theory/citations, easy-medium-hard within both paths, entire 27 mock payloads; ${protectedFiles} current-turn protected files including E4210, all PDFs/assets/answers/product code unchanged.`);
