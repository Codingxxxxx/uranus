const { AppConfig } = require('../const');

/**
 * Inject app environment to template
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function injectData(req, res, next) {
  try {
    res.locals = res.locals || {};
    res.locals.$AppConfig = {
      NODE_ENV: AppConfig.NODE_ENV,
      APP_NAME: AppConfig.APP_NAME
    };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  injectData
};