const { Schema, model, SchemaTypes } = require('mongoose');
const { baseModel } = require('./base-schema.model');
const { CollectionName, TransactionStatus } = require('../const').Mongo;

const schema = new Schema(
  {
    orderId: {
      type: SchemaTypes.ObjectId,
      ref: CollectionName.Order,
      required: true
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(TransactionStatus),
      default: TransactionStatus.Pending
    },
    ...baseModel
  },
  {
    collection: CollectionName
  }
);

const TransactionModel = model(CollectionName.Transaction, schema);

module.exports = { TransactionModel };

