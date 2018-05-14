'use strict';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const recordSchema = new Schema({
    owner: {
        type: ObjectId,
        ref: 'Owner'
    },    
    account: {
        type: ObjectId,
        ref: 'Account'
    },
    category: String,
    date: Date,
    amount: Number,
    type: String
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;