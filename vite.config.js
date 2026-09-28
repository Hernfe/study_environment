import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('./src', import.meta.url));

// One entry per page: the hub, then per course its home and one line
// per lecture shell (src/courses/<slug>/lectures/L0X/index.html).
// Content itself lives in src/content/<slug>/.
const pages = {
  hub: 'index.html',
  'nbe-e4210': 'courses/nbe-e4210/index.html',
  'nbe-e4210-L00': 'courses/nbe-e4210/lectures/L00/index.html',
  'nbe-e4210-L01': 'courses/nbe-e4210/lectures/L01/index.html',
  'nbe-e4210-L02': 'courses/nbe-e4210/lectures/L02/index.html',
  'nbe-e4210-L03': 'courses/nbe-e4210/lectures/L03/index.html',
  'nbe-e4210-L04': 'courses/nbe-e4210/lectures/L04/index.html',
};

export default defineConfig({
  root,
  publicDir: resolve(root, '../public'),
  appType: 'mpa',
  build: {
    outDir: resolve(root, '../dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: Object.fromEntries(
        Object.entries(pages).map(([name, file]) => [name, resolve(root, file)])
      ),
    },
  },
  server: {
    open: false,
  },
});
