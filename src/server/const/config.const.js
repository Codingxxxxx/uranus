const {
  APP_NAME,
  NODE_ENV,
  PORT,
  HOST,
  MONGO_URI,
  SESSION_SECRET,
  PBKDF2_KEYLEN,
  PBKDF2_ITERATION,
  PBKDF2_DIGEST
} = process.env;

const AppConfig = {
  APP_NAME,
  NODE_ENV,
  PORT,
  HOST,
  MONGO_URI,
  SESSION_SECRET,
  PBKDF2_KEYLEN: Number(PBKDF2_KEYLEN),
  PBKDF2_ITERATION: Number(PBKDF2_ITERATION),
  PBKDF2_DIGEST,
  isDev: NODE_ENV !== 'production'
};

module.exports = {
  AppConfig
};