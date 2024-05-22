const Ajv = require('ajv');
const ajv = new Ajv({ allError: true });
require('ajv-formats')(ajv);
const {
  UserCreationSchema
} = require('../schemas');

const Validator = {
  validateUserCreation: ajv.compile(UserCreationSchema)
};

module.exports = {
  Validator
};