const { Schema, model } = require('mongoose');
const { baseModel } = require('./base-schema.model');
const { CollectionName } = require('../const').Mongo;

const schema = new Schema(
  {
    categoryName: {
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
    collection: CollectionName.Category
  }
);

schema.plugin(require('mongoose-paginate-v2'));
schema.plugin(require('mongoose-aggregate-paginate-v2'));

const CategoryModel = model(CollectionName.Category, schema);

module.exports = { CategoryModel };