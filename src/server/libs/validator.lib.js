const Ajv = require('ajv');
const ajv = new Ajv({ allError: true });
require('ajv-formats')(ajv);
const {
  UserCreationSchema,
  UserLoginSchema,
  BrandCreationSchema,
  TagCreationSchema,
  CategoryCreationSchema
} = require('../schemas');

const Validator = {
  validateUserCreation: ajv.compile(UserCreationSchema),
  validateUserLogin: ajv.compile(UserLoginSchema),
  validateBrandCreation: ajv.compile(BrandCreationSchema),
  validateTagCreation: ajv.compile(TagCreationSchema),
  validateCategoryCreation: ajv.compile(CategoryCreationSchema)
};

module.exports = {
  Validator
};