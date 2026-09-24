// Prints every lecture content file as JSON for scripts/lint_questions.py.
// Content files build some figures at import time with d3, so a small
// DOM (linkedom) stands in for the browser. Functions are dropped.
//
// Usage: node scripts/dump_questions.mjs [L03 ...]   (default: every src/content/L*.js)

import { readdirSync } from 'node:fs';
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
const files = readdirSync(dir)
  .filter((f) => /^L\d+.*\.js$/.test(f))
  .filter((f) => !wanted.length || wanted.some((id) => f === `${id}.js` || f.startsWith(`${id}-`)))
  .sort();

// Figure props hold SVG markup and region geometry the lint never reads.
function replacer(key, value) {
  if (typeof value === 'function') return undefined;
  if (typeof value === 'string' && value.trimStart().startsWith('<svg')) return '[svg]';
  if ((key === 'props' || key === 'hotspots' || key === 'regions') && value && typeof value === 'object') return { dropped: true };
  return value;
}

const out = {};
for (const file of files) {
  try {
    const mod = await import(pathToFileURL(join(dir, file)).href);
    const content = mod.default;
    out[content?.meta?.id || file] = { file: `src/content/${file}`, content };
  } catch (error) {
    out[file] = { file: `src/content/${file}`, error: String(error?.stack || error) };
  }
}
process.stdout.write(JSON.stringify(out, replacer));
