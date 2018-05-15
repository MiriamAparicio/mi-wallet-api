'use strict';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const accountSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: ObjectId,
    ref: 'User'
  },
  balance: {
    type: Number,
    default: 0
  }
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;