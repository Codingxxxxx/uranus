const nunjucks = require('nunjucks');
const path = require('path');
const { AppConfig } = require('../const');

/**
 * Initialize tmepalte enigne
 * @param {import('express').Application} app Express app
 */
function initNunjucks(app) {
  nunjucks.installJinjaCompat();
  const environment = nunjucks.configure('views', {
    express: app,
    noCache: AppConfig.NODE_ENV === 'development',
    throwOnUndefined: AppConfig.NODE_ENV === 'development',
    dev: AppConfig.NODE_ENV === 'development'
  });

  addGlobal(environment);
}

/**
 * @param {import('nunjucks').Environment} environment
 */
function addGlobal(environment) {
  environment
    .addGlobal('viteDevScript', () => {
      return `<script type="module" src="http://localhost:${AppConfig.PORT}/@vite/client"></script>`;
    })
    .addGlobal('script', (assetPath, isAdminScript = true, hasCss = false) => {
      const unescapeFunc = environment.getFilter('safe');
      const parsedUrl = path.parse(assetPath);
      let dir = parsedUrl.dir;
      // if asset path doesn't start with slash then add slash
      if (!dir.startsWith('/')) dir = path.join('/', dir);
      const normalizedPath = path.join(dir, parsedUrl.base);
      const assetPaths = [];

      if (AppConfig.NODE_ENV === 'development') {
        assetPaths.push(`<script src="${normalizedPath}" type="module"></script>`);
      }

      return unescapeFunc(assetPaths.join('\n'));
    });
}

module.exports = {
  initNunjucks
};