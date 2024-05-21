const { SchemaTypes, model, Schema } = require('mongoose');
const { baseModel } = require('./base-schema.model');
const { CollectionName } = require('../const').Mongo;

const schema = new Schema(
  {
    productName: {
      type: String,
      required: true,
      maxLength: 10
    },
    specs: [
      {
        cpu: {
          type: String,
          required: true
        },
        display: {
          type: String,
          required: true
        },
        ram: {
          type: String,
          required: true
        },
        storage: {
          type: String,
          required: true
        },
        graphicCard: {
          type: String,
          required: true
        },
        colorChoices: [
          {
            price: {
              type: SchemaTypes.Decimal128,
              required: true,
              default: 0
            },
            color: {
              type: SchemaTypes.ObjectId,
              ref: CollectionName.Color
            },
            quantity: {
              type: Number,
              required: true,
              default: 0
            },
            pictures: [
              {
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
              }
            ]
          }
        ]
      }
    ],
    osChoices: [
      {
        type: SchemaTypes.ObjectId,
        ref: CollectionName.OS
      }
    ],
    slug: {
      type: String,
      required: true,
      unique: true
    },
    tags: [
      {
        type: SchemaTypes.ObjectId,
        ref: CollectionName.PCTag
      }
    ],
    stockIn: [
      {
        specId: {
          type: SchemaTypes.ObjectId,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        remark: {
          type: String
        },
        ...baseModel
      }
    ],
    stockOut: [
      {
        specId: {
          type: SchemaTypes.ObjectId,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        remark: {
          type: String
        },
        ...baseModel
      }
    ],
    description: {
      type: String,
      maxLegnth: 200
    },
    weight: {
      type: String
    },
    ...baseModel
  },
  {
    collection: CollectionName.Product
  }
);

const ProductModel = model(CollectionName.Product, schema);

module.exports = { ProductModel };