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
      filename: 'logs/app-%DATE%.error.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '60d'
    }),
    new winston.transports.DailyRotateFile({
      level: 'debug',
      filename: 'logs/app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '60d'
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  adminLogger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

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
  let message = `
    #################################################
    requestId: {requestId}
    URL: {url}
    Method: {method}
    RequestBody: {requestBody}
    QueryString: {query}
    Params: {params}
    Files: {files}
  `;

  if (request.error) message += '\nError: {error}\n';
  const normalizedMessage = message
    .split('\n')
    .map(str => str.trim())
    .join('\n');
  console.info(JSON.stringify(request.requestBody || {}, null, 2));
  return normalizedMessage
    .replace('{requestId', request.requestId)
    .replace('{url}', request.url)
    .replace('{method}', request.method)
    .replace('{requestBody}', JSON.stringify(request.requestBody || {}, null, 2))
    .replace('{query}', JSON.stringify(request.query || {}, null, 2))
    .replace('{params}', JSON.stringify(request.params || {}, null, 2))
    .replace('{files}', JSON.stringify(request.files || {}, null, 2));
}

module.exports = {
  adminLogger,
  formatLogMessage
};