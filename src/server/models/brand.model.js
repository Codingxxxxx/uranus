const { Schema, model } = require('mongoose');
const { baseModel } = require('./base-schema.model');
const { CollectionName } = require('../const').Mongo;

const schema = new Schema(
  {
    brandName: {
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
    brandImage: {
      fileUrl: {
        type: String
      },
      filename: {
        type: String
      },
      mimetype: {
        type: String
      },
      size: {
        type: Number
      }
    },
    ...baseModel
  },
  {
    collection: CollectionName.Brand
  }
);

schema.plugin(require('mongoose-paginate-v2'));
schema.plugin(require('mongoose-aggregate-paginate-v2'));

const BrandModel = model(CollectionName.Brand, schema);

module.exports = { BrandModel };