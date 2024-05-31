const { populate } = require('dotenv');
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

/**
 * Get user pagination
 * @param {number} limit 
 * @param {number} offset 
 * @returns {Promise<object>}
 */
function getPagination(limit, offset) {
  return UserModel.paginate({}, {
    limit,
    offset,
    populate: 'role createdBy',
    lean: true
  });
}

const UserRepository = {
  createUser,
  getUserByUsername,
  getPagination
};

module.exports = {
  UserRepository
};