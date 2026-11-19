import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('./src', import.meta.url));

// One entry per page: the hub, then per course its home and one line
// per lecture shell (src/courses/<slug>/lectures/L0X/index.html).
// Content itself lives in src/content/<slug>/.
const pages = {
  hub: 'index.html',
  'nbe-e4070': 'courses/nbe-e4070/index.html',
  'nbe-e4070-L01': 'courses/nbe-e4070/lectures/L01/index.html',
  'nbe-e4070-L02': 'courses/nbe-e4070/lectures/L02/index.html',
  'nbe-e4070-L03': 'courses/nbe-e4070/lectures/L03/index.html',
  'nbe-e4070-L04': 'courses/nbe-e4070/lectures/L04/index.html',
  'nbe-e4070-L05': 'courses/nbe-e4070/lectures/L05/index.html',
  'nbe-e4070-L06': 'courses/nbe-e4070/lectures/L06/index.html',
  'nbe-e4070-L07': 'courses/nbe-e4070/lectures/L07/index.html',
  'nbe-e4070-L08': 'courses/nbe-e4070/lectures/L08/index.html',

  'nbe-e4120-L10': 'courses/nbe-e4120/lectures/L10/index.html',
  'nbe-e4120-L09': 'courses/nbe-e4120/lectures/L09/index.html',
  'nbe-e4120-L03': 'courses/nbe-e4120/lectures/L03/index.html',
  'nbe-e4120-L08': 'courses/nbe-e4120/lectures/L08/index.html',
  'nbe-e4120-L07': 'courses/nbe-e4120/lectures/L07/index.html',
  'nbe-e4120-L06': 'courses/nbe-e4120/lectures/L06/index.html',
  'nbe-e4120-L05': 'courses/nbe-e4120/lectures/L05/index.html',
  'nbe-e4120-L04': 'courses/nbe-e4120/lectures/L04/index.html',
  'nbe-e4120-L02': 'courses/nbe-e4120/lectures/L02/index.html',
  'nbe-e4120-L01': 'courses/nbe-e4120/lectures/L01/index.html',
  'nbe-e4120': 'courses/nbe-e4120/index.html',
  'nbe-e4210': 'courses/nbe-e4210/index.html',
  'nbe-e4210-L00': 'courses/nbe-e4210/lectures/L00/index.html',
  'nbe-e4210-L01': 'courses/nbe-e4210/lectures/L01/index.html',
  'nbe-e4210-L02': 'courses/nbe-e4210/lectures/L02/index.html',
  'nbe-e4210-L03': 'courses/nbe-e4210/lectures/L03/index.html',
  'nbe-e4210-L04': 'courses/nbe-e4210/lectures/L04/index.html',
  'nbe-e4210-L05': 'courses/nbe-e4210/lectures/L05/index.html',
  'nbe-e4210-L06': 'courses/nbe-e4210/lectures/L06/index.html',
  'nbe-e4210-L07': 'courses/nbe-e4210/lectures/L07/index.html',
  'nbe-e4210-L08': 'courses/nbe-e4210/lectures/L08/index.html',
  'nbe-e4210-L09': 'courses/nbe-e4210/lectures/L09/index.html',
  'nbe-e4210-L10': 'courses/nbe-e4210/lectures/L10/index.html',
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
    // Container-mounted edits do not reliably emit filesystem events.
    watch: { usePolling: true, interval: 500 },
  },
});
