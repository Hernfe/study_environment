import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('./src', import.meta.url));

// One entry per page. Add a line here for every new lecture shell
// (src/lectures/L0X/index.html). Content itself lives in src/content/.
const pages = {
  main: 'index.html',
  L00: 'lectures/L00/index.html',
  L01: 'lectures/L01/index.html',
  L02: 'lectures/L02/index.html',
  L03: 'lectures/L03/index.html',
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
