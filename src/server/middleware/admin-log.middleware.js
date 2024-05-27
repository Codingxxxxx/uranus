const { Logger } = require('../libs');
const { AppConfig } = require('../const');
const { adminLogger } = Logger;

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
    const requestBody = AppConfig.isDev ? req.body : sanitizeFields(req.body, excludeFields);
    const message = `
      #################################################
      requestId: ${requestId}
      URL: ${req.originalUrl}
      Method: ${req.method}
      RequestBody: ${JSON.stringify(requestBody || {}, null, 2)}
      QueryString: ${JSON.stringify(req.query || {}, null, 2)}
      Params: ${JSON.stringify(req.params || {}, null, 2)}
      Files: ${JSON.stringify(req.files || {}, null, 2)}
    `;
    const normalizedMessage = message
      .split('\n')
      .map(str => str.trim())
      .join('\n');
    adminLogger.debug(normalizedMessage);
    next();
  } catch (error) {
    next(error);
  }
};