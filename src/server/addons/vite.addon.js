const vite = require('vite');

async function initViteDev(app) {
  // integrate vite
  const { middlewares } = await vite.createServer({
    server: {
      middlewareMode: 'ssr'
    }
  });

  app.use(middlewares);
}

module.exports = {
  initViteDev
};