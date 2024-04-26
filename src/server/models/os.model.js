const { Schema, model } = require('mongoose');
const { baseModel } = require('./base-schema.model');
const { CollectionName } = require('../const').Mongo;

const schema = new Schema(
  {
    osName: {
      type: String,
      required: true,
      maxLegnth: 25,
      unique: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    ...baseModel
  },
  {
    collection: CollectionName.OS
  }
);

const OSModel = model(CollectionName.OS, schema);

module.exports = { OSModel };