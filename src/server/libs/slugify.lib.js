const slg = require('slugify');

/**
 * Convert normal text to slug
 * @param {string} text
 * @returns {string}
 */
function slugify(text) {
  return slg(text, { lower: true });
}

const Slug = {
  slugify
};

module.exports = {
  Slug
};