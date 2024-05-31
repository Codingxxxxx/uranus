const { Schema, model, SchemaTypes } = require('mongoose');
const { CollectionName, UserStatus } = require('../const').Mongo;
const { baseModel } = require('./base-schema.model');

const schema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      maxLength: 50
    },
    lastname: {
      type: String,
      required: true,
      maxLength: 50
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minLegnth: 5,
      maxLength: 15
    },
    password: {
      type: String,
      required: true
    },
    salt: {
      type: String,
      required: true,
      unique: true
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(UserStatus),
      default: UserStatus.Active
    },
    role: {
      type: SchemaTypes.ObjectId,
      ref: CollectionName.Role,
      required: true
    },
    avatar: {
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
    lastLogin: {
      type: Date
    },
    ...baseModel
  },
  {
    collection: CollectionName.User
  }
);

schema.plugin(require('mongoose-paginate-v2'));
schema.plugin(require('mongoose-aggregate-paginate-v2'));

const UserModel = model(CollectionName.User, schema);

module.exports = { UserModel };