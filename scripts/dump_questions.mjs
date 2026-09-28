// Prints every lecture content file as JSON for scripts/lint_questions.py.
// Content files build some figures at import time with d3, so a small
// DOM (linkedom) stands in for the browser. Functions are dropped.
//
// Output is keyed <course>/<lecture id>, e.g. nbe-e4210/L03.
//
// Usage: node scripts/dump_questions.mjs [nbe-e4210 | nbe-e4210/L03 | L03 ...]
//        (default: every src/content/<course>/L*.js)

import { readdirSync, statSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { join } from 'node:path';
import { parseHTML } from 'linkedom';

const { window, document } = parseHTML('<!doctype html><html><head></head><body></body></html>');
globalThis.window = window;
globalThis.document = document;
for (const key of ['Node', 'NodeFilter', 'Element', 'HTMLElement', 'SVGElement', 'DOMParser', 'navigator']) {
  if (window[key] && !(key in globalThis)) globalThis[key] = window[key];
}

const dir = fileURLToPath(new URL('../src/content/', import.meta.url));
const wanted = process.argv.slice(2);
// A request names a course, a course/lecture pair, or a bare lecture id
// (matching that lecture in every course).
const matches = (course, file) => !wanted.length || wanted.some((w) => {
  const [c, id] = w.includes('/') ? w.split('/') : /^L\d/.test(w) ? [null, w] : [w, null];
  return (!c || c === course) && (!id || file === `${id}.js` || file.startsWith(`${id}-`));
});
const files = readdirSync(dir)
  .filter((c) => statSync(join(dir, c)).isDirectory())
  .flatMap((course) => readdirSync(join(dir, course))
    .filter((f) => /^L\d+.*\.js$/.test(f) && matches(course, f))
    .map((f) => `${course}/${f}`))
  .sort();

// Figure props hold SVG markup and region geometry the lint never reads.
// Label questions keep only their region labels and label pool, which
// the word-bank check compares against the bank.
function replacer(key, value) {
  if (typeof value === 'function') return undefined;
  if (typeof value === 'string' && value.trimStart().startsWith('<svg')) return '[svg]';
  if (key === 'props' && value && typeof value === 'object') return { dropped: true };
  if (key === 'hotspots' && value && typeof value === 'object') {
    return { regions: value.regions, labelPool: value.labelPool };
  }
  if (key === 'regions' && Array.isArray(value)) return value.map((r) => ({ label: r?.label }));
  if (key === 'regions' && value && typeof value === 'object') return { dropped: true };
  return value;
}

const out = {};
for (const file of files) {
  try {
    const mod = await import(pathToFileURL(join(dir, file)).href);
    const content = mod.default;
    const course = file.split('/')[0];
    out[content?.meta?.id ? `${course}/${content.meta.id}` : file] = { file: `src/content/${file}`, content };
  } catch (error) {
    out[file] = { file: `src/content/${file}`, error: String(error?.stack || error) };
  }
}
process.stdout.write(JSON.stringify(out, replacer));
