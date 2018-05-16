'use strict';
var express = require('express');

const pubsub = require('pubsub-js');

const User = require('../models/user');
const Record = require('../models/record');
const Account = require('../models/account');

class UpdateUserBalance {

  constructor () {}

  exec (userId) {
    Account.find({ owner: userId })
      .then((accounts) => {
        let userBalance = 0;
        for (let i = 0; i < accounts.length; i++) {
          userBalance += accounts[i].balance;
        }
        return User.update({_id: userId}, { $set: { balance: userBalance } });
      })
      .catch((err) => console.error('UpdateUserBalance::exec()', userId, err));
  }
}

module.exports = UpdateUserBalance;