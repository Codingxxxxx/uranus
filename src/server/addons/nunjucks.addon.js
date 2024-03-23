const nunjucks = require('nunjucks');
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
  environment.addGlobal('viteDevScript', () => {
    return `<script type="module" src="http://localhost:${AppConfig.PORT}/@vite/client"></script>`;
  });
}

module.exports = {
  initNunjucks
};