'use strict';
var express = require('express');

const pubsub = require('pubsub-js');

const Record = require('../models/record');
const Account = require('../models/account');

class UpdateAccountBalance {

  constructor (){}

  exec (accountId) {

    Record.find({ account: accountId })
      .then((records) => {
        let accountBalance = 0;
        for (let i = 0; i < records.length; i++) {
          if (records[i].type === "expense") {
            accountBalance -= records[i].amount;
          } else {
            accountBalance += records[i].amount;
          }
        }
        return Account.findOneAndUpdate({_id: accountId},{ $set: { balance: accountBalance}})
          .then((account) => {
            pubsub.publish("account.update", account);
          });
      })
      .catch((err) => console.error('UpdateAccountBalance::exec()', accountId, err));
  }
}

module.exports = UpdateAccountBalance;