// Phase snapshots precede later authorized E4120 lecture revisions. Keep
// immutable-file checks while validating each phase's own content separately.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const revisedTests = [5, 6, 7, 8, 9].map(n => `scripts/test_l0${n}_revision.mjs`);
export function assertPhaseIsolation(baseline, phase) {
  const permitted = new Set([
    ...Array.from({length:10-phase}, (_,i)=>`src/content/nbe-e4120/L0${phase+i}.js`),
    // L09's repaired occupancy tools are verified by its preservation suite.
    'src/js/numeric.js', 'docs/CONTENT_SCHEMA.md',
    'scripts/test_extra_practice.mjs', ...revisedTests,
  ]);
  for (const [path, hash] of Object.entries(baseline)) {
    if (!permitted.has(path)) assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path)).digest('hex'), hash, path);
  }
}
