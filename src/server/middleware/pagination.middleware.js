/**
 * Control header cache-control for request html
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
module.exports = async function(req, res, next) {
  try {
    const paginationParams = {
      draw: req.query.draw,
      limit: Math.min(Number(req.query.length || 0), 250),
      offset: Number(req.query.start)
    };
    req.paginationParams = paginationParams;
    next();
  } catch (error) {
    next(error);
  }
};