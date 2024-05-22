const excludRoutes = [
  '/login',
  '/logout'
];

/**
 * Inject app environment to template
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function checkAdminAuth(req, res, next) {
  try {
    const isExclueRoute = excludRoutes.some((url) => url.toLowerCase() === req.url);
    const canAccess = isExclueRoute || req.session.userData;
    if (!canAccess) return res.redirect('/admin/login');
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  checkAdminAuth
};