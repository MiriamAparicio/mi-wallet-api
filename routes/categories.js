'use strict';

const express = require('express');
const router = express.Router();

const categories = require('../config/categories');

router.get('/', (req, res, next) => {
  res.json(categories);
});

module.exports = router;