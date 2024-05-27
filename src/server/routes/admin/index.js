/**
 * @type {Array<import('express').IRouter>}
 */
module.exports = [
  require('./home/home.route'),
  require('./user.route'),
  require('./auth.route'),
  require('./brand.route'),
  require('./file-upload.route')
];