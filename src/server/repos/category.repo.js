const { CategoryModel } = require('../models');

/**
 * Batch insert categories
 * @param {Object[]} categories
 * @param {string} categories.categoryName
 * @param {string} categories.slug
 * @param {string} categories.createdBy
 * @returns {Promise<Object[]>}
 */
function create(categories) {
  return CategoryModel.create(categories);
}

/**
 * Get a category by name
 * @param {string} categoryName 
 * @returns {Promise<Object>}
 */
function getCategoryByName(categoryName) {
  return CategoryModel.findOne({ categoryName: new RegExp(`^${categoryName}$`, 'i') }).lean();
}

/**
 * Get category pagination
 * @param {number} limit 
 * @param {number} offset 
 * @returns {Promise<Object[]>}
 */
function getPagination(limit, offset) {
  return CategoryModel.paginate({}, {
    lean: true,
    populate: 'createdBy',
    limit,
    offset
  });
}

const CategoryRepository = {
  create,
  getCategoryByName,
  getPagination
};

module.exports = {
  CategoryRepository
};