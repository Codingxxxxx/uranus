module.exports = {
  injectAdminData: require('./admin.middleware').injectData,
  cacheHTML: require('./html-cache.middleware')
};