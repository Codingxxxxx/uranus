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

const CategoryRepository = {
  create,
  getCategoryByName
};

module.exports = {
  CategoryRepository
};