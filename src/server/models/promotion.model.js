const { Schema, model, SchemaTypes } = require('mongoose');
const { baseModel } = require('./base-schema.model');
const { CollectionName, PromotionStatus, PromotionType } = require('../const').Mongo;

const schema = new Schema(
  {
    promotionName: {
      type: String,
      required: true,
      maxLegnth: 50,
      unique: true
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(PromotionStatus),
      default: PromotionStatus.Active
    },
    discountType: {
      type: String,
      required: true,
      enum: Object.values(PromotionType),
      default: PromotionType.Cash
    },
    discountRate: {
      type: SchemaTypes.Decimal128,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    expireAt: {
      type: Date,
      required: true
    },
    applyToAllProduct: {
      type: Boolean,
      required: true
    },
    whitelistProducts: [
      {
        productId: {
          type: SchemaTypes.ObjectId,
          required: true,
          ref: CollectionName.Product
        }
      }
    ],
    ...baseModel
  },
  {
    collection: CollectionName.Promotion
  }
);

const PromotionModel = model(CollectionName.Promotion, schema);

module.exports = { PromotionModel };