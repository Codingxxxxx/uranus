const { Logger } = require('../libs');
const { AppConfig } = require('../const');
const { adminLogger, formatLogMessage } = Logger;

const excludeFields = ['password'];

/**
 * Remove specific fields from request body
 * @param {Object} requestBody
 * @param {string[]} excludeFields
 */
function sanitizeFields(requestBody, excludeFields) {
  const fields = { ...requestBody };
  for (const field of excludeFields) {
    delete fields[field];
  }
  return fields;
}

/**
 * Logging middleware for admin
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
module.exports = async function(req, res, next) {
  try {
    const requestId = Number(Date.now() * Math.random() * 100)
      .toString()
      .substring(0, 6);
    req.requestId = requestId;
    // remove sensitive fields from log in prod
    const requestBody = AppConfig.isDev ? sanitizeFields(req.body, excludeFields) : req.body;
    const message = formatLogMessage({
      url: req.url,
      method: req.method,
      params: req.params,
      query: req.query,
      requestBody,
      requestId
    });
    adminLogger.debug(message);
    next();
  } catch (error) {
    next(error);
  }
};