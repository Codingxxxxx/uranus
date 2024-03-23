const fileUpload = require('express-fileupload');

/**
 * Enable file upload for server
 * @param {import('express').Application} app Express
 */
function initFileUpload(app) {
  app.use(fileUpload());
};

module.exports = {
  initFileUpload
};