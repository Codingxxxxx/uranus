const { Schema, model } = require('mongoose');
const { baseModel } = require('./base-schema.model');
const { CollectionName } = require('../const').Mongo;

const schema = new Schema(
  {
    tagName: {
      type: String,
      required: true,
      maxlength: 25,
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
    collection: CollectionName.PCTag
  }
);

const PCTagModel = model(CollectionName.PCTag, schema);

module.exports = { PCTagModel };