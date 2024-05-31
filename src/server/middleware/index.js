module.exports = {
  injectAdminData: require('./admin.middleware').injectData,
  cacheHTML: require('./html-cache.middleware'),
  checkAdminAuth: require('./admin-auth.middleware').checkAdminAuth,
  adminLog: require('./admin-log.middleware'),
  handleError500: require('./handle-500.middleware'),
  paginationNormalizer: require('./pagination.middleware')
};