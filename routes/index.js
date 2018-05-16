const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.json({ welcome: 'MiWallet API' });
});

module.exports = router;
