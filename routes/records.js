const express = require('express');
const router = express.Router();

const Record = require('../models/record');

router.get('/', (req, res, next) => {

  Record.find({})
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {

  Record.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

module.exports = router;