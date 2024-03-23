const { defineConfig } = require('vite');
const path = require('path');

const BASE_ADMIN_PATH = 'src/client/front';

const adminScripts = [];

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
    outDir: 'dist/front'
  }
});