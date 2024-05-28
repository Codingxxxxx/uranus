/**
 * Get user id from session
 * @param {import('express').Request} request
 * @returns {string}
 */
function getUserId(request) {
  return request.session.userData._id;
}

const SessionHandler = {
  getUserId
};

module.exports = {
  SessionHandler
};