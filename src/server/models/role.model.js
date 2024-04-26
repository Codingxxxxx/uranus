const { Schema, model } = require('mongoose');
const { CollectionName } = require('../const').Mongo;

const schema = new Schema(
  {
    roleName: {
      type: String,
      required: true,
      maxLegnth: 25,
      unique: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    collection: CollectionName.Role
  }
);

const RoleModel = model(CollectionName.Role, schema);

module.exports = { RoleModel };