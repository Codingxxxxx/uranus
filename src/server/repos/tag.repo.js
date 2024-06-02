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

const TagRepository = {
  create,
  getTagByName
};

module.exports = {
  TagRepository
};