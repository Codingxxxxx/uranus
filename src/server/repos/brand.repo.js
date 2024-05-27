const { BrandModel } = require('../models');

/**
 * Insert brand to db
 * @param {Object} brand 
 * @param {string} brand.brandName
 * @param {string} brand.slug
 * @param {Object} brand.brandImage
 * @param {string} brand.brandImage.fileUrl
 * @param {string} brand.brandImage.filename
 * @param {number} brand.brandImage.size
 * @param {string} brand.brandImage.mimetype
 * @returns 
 */
function createBrand(brand) {
  return BrandModel.create({
    brandName: brand.brandName.trim(),
    slug: brand.slug,
    brandImage: {
      fileUrl: brand.brandImage.fileUrl,
      filename: brand.brandImage.filename,
      size: brand.brandImage.size,
      mimetype: brand.brandImage.mimetype
    }
  });
}

/**
 * Get a brand by brand name
 * @param {string} brandName 
 * @returns {Promise<Object>}
 */
function getBrandByBrandName(brandName) {
  return BrandModel
    .findOne({ brandName: new RegExp(`^${brandName}$`) })
    .lean();
}

const BrandRepository = {
  createBrand,
  getBrandByBrandName
};

module.exports = {
  BrandRepository
};