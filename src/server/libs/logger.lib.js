const winston = require('winston');
require('winston-daily-rotate-file');

const customFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const adminLogger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm A' }),
    customFormat
  ),
  transports: [
    new winston.transports.DailyRotateFile({
      level: 'error',
      filename: 'logs/admin/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '60d'
    }),
    new winston.transports.DailyRotateFile({
      level: 'debug',
      filename: 'logs/admin/debug-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '60d'
    })
  ]
});

/**
 * format log message
 * @param {Object} request
 * @param {string} request.requestId
 * @param {string} request.url
 * @param {string} request.method
 * @param {object} request.requestBody
 * @param {object} request.query
 * @param {object} request.params
 * @param {object} request.files
 * @param {string} request.error
 * @returns {string}
 */
function formatLogMessage(request) {
  const message = `
    #################################################
    requestId: {requestId}
    URL: {url}
    Method: {method}
    RequestBody: {requestBody}
    QueryString: {query}
    Params: {params}
    Files: {files}
  `;

  const normalizedMessage = message
    .split('\n')
    .map(str => str.trim())
    .join('\n');

  return normalizedMessage
    .replace('{requestId}', request.requestId)
    .replace('{url}', request.url)
    .replace('{method}', request.method)
    .replace('{requestBody}', JSON.stringify(request.requestBody || {}, null, 2))
    .replace('{query}', JSON.stringify(request.query || {}, null, 2))
    .replace('{params}', JSON.stringify(request.params || {}, null, 2))
    .replace('{files}', JSON.stringify(request.files || {}, null, 2));
}

/**
 * 
 * @param {object} options 
 * @param {string} options.requestId
 * @param {Error} options.error
 * @returns {string}
 */
function formatErrorMessage(options) {
  const errMessage = `
    #################################################
    requestId: {requestId}
    name: {name}
    message: {message}
    stack: {stack}
  `;

  return errMessage
    .split('\n')
    .map(str => str.trim())
    .join('\n')
    .replace('{requestId}', options.requestId)
    .replace('{name}', options.error.name)
    .replace('{message}', options.error.message)
    .replace('{stack}', options.error.stack);
}

module.exports = {
  adminLogger,
  formatLogMessage,
  formatErrorMessage
};