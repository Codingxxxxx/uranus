const { AppConfig } = require('../const');
const express = require('express');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../../../public');

/**
 * Serve static assets
 * @param {import('express').Application} app
 */
function configureAsset(app) {
  app.use(
    '/',
    express.static(
      PUBLIC_DIR,
      {
        cacheControl: true,
        setHeaders: (res, url) => {
          const parsedUrl = path.parse(url);
          const isStaticAsset = parsedUrl.ext === 'js' || parsedUrl.ext === 'css';
          if (!isStaticAsset) return;

          const devCacheControl = 'public, max-age=0, must-revalidate'; // prevent cache on development
          const prodCacheControl = 'public, max-age=5184000, immutable'; // for cache bursting, cache for 60 days
          const isDev = AppConfig.NODE_ENV === 'development';
          res.set('Cache-Control', isDev ? devCacheControl : prodCacheControl);
        }
      }
    )
  );
}

module.exports = configureAsset;