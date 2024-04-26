const { Schema, model } = require('mongoose');
const { baseModel } = require('./base-schema.model');
const { CollectionName } = require('../const').Mongo;

const schema = new Schema(
  {
    colorName: {
      type: String,
      required: true,
      maxLegnth: 25,
      unique: true
    },
    hex: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    ...baseModel
  },
  {
    collection: CollectionName.Color
  }
);

const ColorModel = model(CollectionName.Color, schema);

module.exports = { ColorModel };