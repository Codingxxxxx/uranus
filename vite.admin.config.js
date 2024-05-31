import { defineConfig } from 'vite';
import path from 'path';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';

const BASE_ADMIN_PATH = 'src/client/admin/script';

const adminScripts = [
  'core/main.js',
  'core/page-loading.js',
  'user/create-user.js',
  'auth/login.js',
  'brand/create-brand.js',
  'brand/list.js'
];

export default defineConfig({
  build: {
    // generate .vite/manifest.json in outDir
    manifest: true,
    rollupOptions: {
      // overwrite default .html entry
      input: adminScripts.map(sourcePath => path.join(BASE_ADMIN_PATH, sourcePath))
    },
    modulePreload: {
      polyfill: true
    },
    outDir: 'dist/admin'
  },
  optimizeDeps: {
    include: ['jquery', 'jquery-validation']
  },
  plugins: [
    chunkSplitPlugin()
  ]
});