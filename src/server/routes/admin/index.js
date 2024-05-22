/**
 * @type {Array<import('express').IRouter>}
 */
module.exports = [
  require('./home/home.route'),
  require('./user.route')
];