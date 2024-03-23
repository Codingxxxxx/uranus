/**
 * Control header cache-control for request html
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function cacheHTML(req, res, next) {
  const cacheControl = 'public, max-age=0, must-revalidate';
  res.set('Cache-Control', cacheControl);
  next();
}

module.exports = cacheHTML;