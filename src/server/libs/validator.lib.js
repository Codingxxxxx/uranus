const Ajv = require('ajv');
const ajv = new Ajv({ allError: true });
require('ajv-formats')(ajv);
const {
  UserCreationSchema,
  UserLoginSchema,
  BrandCreationSchema,
  TagCreationSchema
} = require('../schemas');

const Validator = {
  validateUserCreation: ajv.compile(UserCreationSchema),
  validateUserLogin: ajv.compile(UserLoginSchema),
  validateBrandCreation: ajv.compile(BrandCreationSchema),
  validateTagCreation: ajv.compile(TagCreationSchema)
};

module.exports = {
  Validator
};