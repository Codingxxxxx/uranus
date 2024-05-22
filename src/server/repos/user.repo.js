const { UserModel } = require('../models');

/**
 * Get a user by username
 * @param {*} username Username to query
 */
function getUserByUsername(username) {
  return UserModel
    .findOne(
      {
        username: new RegExp(`^${username}$`, 'i')
      }
    )
    .lean();
}

/**
 * Create a user
 * @param {Object} user
 * @param {string} user.firstname
 * @param {string} user.lastname
 * @param {string} user.username
 * @param {string} user.role
 * @param {string} user.password
 * @returns {Promise<Object>}
 */
function createUser(user) {
  return UserModel
    .create(
      {
        firstname: user.firstname.trim(),
        lastname: user.lastname.trim(),
        username: user.username.trim(),
        role: user.role,
        password: user.password,
        salt: user.salt
      }
    );
}

const UserRepository = {
  getUserByUsername,
  createUser
};

module.exports = {
  UserRepository
};