'use strict';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const recordSchema = new Schema({
    category: String,
    date: Date,
    amount: Number,
    type: String
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;