const Ajv = require('ajv');
const ajv = new Ajv({ allError: true });
require('ajv-formats')(ajv);
const {
  UserCreationSchema,
  UserLoginSchema,
  BrandCreationSchema
} = require('../schemas');

const Validator = {
  validateUserCreation: ajv.compile(UserCreationSchema),
  validateUserLogin: ajv.compile(UserLoginSchema),
  validateBrandCreation: ajv.compile(BrandCreationSchema)
};

module.exports = {
  Validator
};