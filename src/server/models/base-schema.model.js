const { SchemaTypes } = require('mongoose');
const { MongoCollection } = require('../const');

const baseModel = {
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  createdBy: {
    type: SchemaTypes.ObjectId,
    ref: MongoCollection.User
  },
  deletedAt: {
    type: Date
  },
  deletedBy: {
    type: SchemaTypes.ObjectId,
    ref: MongoCollection.User
  },
  lastUpdateBy: {
    type: SchemaTypes.ObjectId,
    ref: MongoCollection.User
  }
};

module.exports = { baseModel };