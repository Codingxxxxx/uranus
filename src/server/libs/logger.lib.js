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

module.exports = {
  adminLogger
};