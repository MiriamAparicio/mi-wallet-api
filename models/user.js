'use strict';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  useremail: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  balance: {
    type: Number
  }
}, {
    timestamps: true
  });

const User = mongoose.model('User', userSchema);

module.exports = User;