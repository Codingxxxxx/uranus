module.exports = {
  Slug: require('./slugify.lib').Slug,
  Validator: require('./validator.lib').Validator,
  Auth: require('./auth.lib').Auth,
  Logger: require('./logger.lib'),
  FileUtil: require('./file.lib'),
  FileHandler: require('./s3.lib')
};