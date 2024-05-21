const { SchemaTypes } = require('mongoose');
const { CollectionName } = require('../const').Mongo;

const baseModel = {
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  createdBy: {
    type: SchemaTypes.ObjectId,
    ref: CollectionName.User
  },
  deletedAt: {
    type: Date
  },
  deletedBy: {
    type: SchemaTypes.ObjectId,
    ref: CollectionName.User
  },
  lastUpdateBy: {
    type: SchemaTypes.ObjectId,
    ref: CollectionName.User
  }
};

module.exports = { baseModel };