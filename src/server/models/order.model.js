const { SchemaTypes, Schema, model } = require('mongoose');
const { CollectionName } = require('../const/mongo.const');

const schema = new Schema(
  {
    items: [
      {
        productId: {
          type: SchemaTypes.ObjectId,
          ref: CollectionName.Product,
          required: true
        },
        specId: {
          type: SchemaTypes.ObjectId,
          required: true
        },
        price: {
          type: SchemaTypes.Decimal128,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        promotion: {
          promotionId: {
            type: SchemaTypes.ObjectId,
            ref: CollectionName.Promotion
          },
          promotionName: {
            type: String
          },
          discountType: {
            type: String
          },
          discountRate: {
            type: SchemaTypes.Decimal128
          }
        },
        subTotal: {
          type: SchemaTypes.Decimal128,
          required: true
        },
        grandTotal: {
          type: SchemaTypes.Decimal128,
          required: true
        }
      }
    ],
    customerId: {
      type: SchemaTypes.ObjectId
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now
    }
  },
  {
    collection: CollectionName.Order
  }
);

const OrderModel = model(CollectionName.Order, schema);

module.exports = { OrderModel };