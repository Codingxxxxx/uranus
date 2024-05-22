const { RoleModel } = require('../models');

/**
 * Insert roles to db
 * @param {Object[]} roles roles data
 * @param {string} roles[].roleName
 * @param {string} roles[].slug
 * @returns {Promise<any[]}
 */
function createRoles(roles) {
  return RoleModel.create(roles);
}

/**
 * Get all roles data
 * @returns {Promise<Object[]>}
 */
function getAll() {
  return RoleModel.find().lean();
}

const RoleRepository = {
  createRoles,
  getAll
};

module.exports = {
  RoleRepository
};