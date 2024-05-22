const Ajv = require('ajv');
const ajv = new Ajv({ allError: true });
require('ajv-formats')(ajv);
const {
  UserCreationSchema,
  UserLoginSchema
} = require('../schemas');

const Validator = {
  validateUserCreation: ajv.compile(UserCreationSchema),
  validateUserLogin: ajv.compile(UserLoginSchema)
};

module.exports = {
  Validator
};