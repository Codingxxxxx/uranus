const { Logger } = require('../libs');
const { adminLogger, formatLogMessage, formatErrorMessage } = Logger;

/**
 * Handle error 500
 * @param {import('express').ErrorRequestHandler} error
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
module.exports = async function(error, req, res, next) {
  try {
    const isAdminPath = req.url.toLowerCase().startsWith('/admin');
    if (isAdminPath) {
      adminLogger.error(
        formatErrorMessage({
          requestId: req.requestId,
          error
        })
      );
    } else {
      /*
      adminLogger.error(
        formatLogMessage({
          requestId: req.requestId,
          url: req.originalUrl,
          method: req.method,
          params: req.params,
          query: req.query,
          requestBody: req.body,
          files: req.files,
          error
        })
      );
      */
    }
    if (req.xhr) return res.status(500).send();
    res.status(500).render('common/error/500.html');
  } catch (error) {
    next(error);
  }
};