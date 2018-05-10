const express = require('express');
const router = express.Router();

const Account = require('../models/account');

router.get('/', (req, res, next) => {

  Account.find({})
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {

  Account.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

module.exports = router;

