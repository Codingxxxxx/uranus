const RedisStore = require('connect-redis').default;
const session = require('express-session');
const { createClient } = require('redis');
const { AppConfig } = require('../const');

// Initialize client.
const redisClient = createClient();
redisClient.connect().catch(console.error);

// Initialize store.
const redisStore = new RedisStore({
  client: redisClient,
  prefix: 'uranus:'
});

/**
 * Setup session
 * @param {import('express').Application} app
 */
function configSession(app) {
  app.use(
    session({
      store: redisStore,
      resave: false, // required: force lightweight session keep alive (touch)
      saveUninitialized: false, // recommended: only save session when data exists
      secret: AppConfig.SESSION_SECRET
    })
  );
}

module.exports = configSession;