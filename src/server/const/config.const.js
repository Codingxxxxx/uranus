const {
  APP_NAME,
  NODE_ENV,
  PORT,
  HOST,
  MONGO_URI,
  SESSION_SECRET
} = process.env;

const AppConfig = {
  APP_NAME,
  NODE_ENV,
  PORT,
  HOST,
  MONGO_URI,
  SESSION_SECRET
};

module.exports = {
  AppConfig
};