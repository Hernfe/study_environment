import assert from 'node:assert/strict';
import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import current from '../src/content/nbe-e4120/L04.js';
const url=pathToFileURL('/work/src/content/nbe-e4120/L04.js').href;
const previous=fs.readFileSync('/work/.codex-revision/L04-before.js','utf8')
 .replace("'./equation-sheet.js'",JSON.stringify(new URL('./equation-sheet.js',url).href))
 .replaceAll('import.meta.url',JSON.stringify(url));
const {default:before}=await import(`data:text/javascript;base64,${Buffer.from(previous).toString('base64')}`);
const extras=['L04-direct-tau','L04-direct-total-length','L04-direct-conductance','L04-direct-endpoint','L04-direct-annulus','L04-direct-return-resistance'];
assert.equal(current.sections.length,23);
assert.equal(current.lectureQuiz.length,53);
assert.deepEqual(current.lectureQuiz.filter(q=>q.practice==='extra').map(q=>q.id),extras);
const normalized=structuredClone(current);
for(const q of normalized.lectureQuiz)delete q.practice;
for(let i=0;i<normalized.sections.length;i++) {
 const s=current.sections[i];
 assert.equal(s.blocks[0].type,'text',s.id);
 const text=s.blocks[0].body;
 assert.equal(text.length,2,s.id);
 const words=text.join(' ').split(/\s+/).length;
 assert.ok(words>=40&&words<=115,`${s.id}: ${words} words`);
 assert.match(text.join(' '),/PDF page|Exercise 4 pages/,s.id);
 assert.ok(current.lectureQuiz.some(q=>q.sectionId===s.id&&!q.practice),s.id);
 normalized.sections[i].blocks[0]=before.sections[i].blocks[0];
}
// Entire old object must match after removing exactly the permitted revisions.
assert.deepEqual(normalized,before);
for(const id of ['L04-direct-input-infinite','L04-direct-input-semi','L04-input-inference','L04-load-chain','L04-direct-sealed','L04-direct-open','L04-boundary-design','L04-endpoint-conflict','L04-geometry-chain','L04-spatial-signed-sum','L04-temporal-read','L04-spatial-read','L04-distance-read','L04-return-interpret','L04-return-design'])
 assert.ok(current.lectureQuiz.some(q=>q.id===id&&!q.practice),id);
console.log('PASS: L04 23 source-cited theory blocks; 47 core/6 optional; every section has core practice; all boundary/method/Exercise4 workflows core. All IDs, numerical answers, metadata, figures, citations, order, inline tools and mocks exactly preserved.');
