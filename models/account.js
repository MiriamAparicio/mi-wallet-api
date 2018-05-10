'use strict';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const accountSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  // records: [{
  //   category: String,
  //   date: Date,
  //   amount: Number,
  //   type: String
  // }],
  owner: {
    type: ObjectId,
    ref: 'User'
  }
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;