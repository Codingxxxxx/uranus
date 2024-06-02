const { TagModel } = require('./../models');

/**
 * Batch insert tag to db
 * @param {Object[]} tags
 * @param {string} tags.tagName
 * @param {string} tags.slug
 * @param {string} tags.createdBy
 * @returns {Promise<Object[]>}
 */
function create(tags) {
  return TagModel.create(tags);
}

/**
 * Get a tag by tag name
 * @param {string} tagName 
 * @returns {Promise<Object>}
 */
function getTagByName(tagName) {
  return TagModel.findOne({ tagName: new RegExp(`^${tagName}$`, 'i') }).lean();
}

/**
 * Get tag pagination
 * @param {number} limit 
 * @param {number} offset 
 * @returns {Promise<Object>}
 */
function getPagination(limit, offset) {
  return TagModel.paginate({}, {
    limit,
    offset,
    lean: true,
    populate: 'createdBy'
  });
}

const TagRepository = {
  create,
  getTagByName,
  getPagination
};

module.exports = {
  TagRepository
};