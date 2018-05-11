const express = require('express');
const router = express.Router();

const Record = require('../models/record');

router.get('/latest', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.status(401).json({ code: 'unauthorized' });
  }
  Record.find({ owner: req.session.currentUser._id })
  // @todo sort and limit
    .populate('account')
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.status(401).json({ code: 'unauthorized' });
  }

  Record.findById(req.params.id)
    .then((result) => {
      if (!result.owner.equals(req.session.currentUser._id)) {
        return res.status(401).json({ code: 'unauthorized' });
      }
      res.json(result);
    })
    .catch(next);
});

router.post('/', (req, res, next) =>  {
  if (!req.session.currentUser) {
    return res.status(401).json({ code: 'unauthorized' });
  }
  Account.findById(req.body.account)
    .then((result) => {
      if (!result.owner.equals(req.session.currentUser._id)) {
        return res.status(401).json({ code: 'unauthorized' });
      }
      //@ todo 
      // const record = new Record(req.body)
      // record.owner = req.session.currentUser._id
      const newRecord = new Record(req.body);
      record.owner = req.session.currentUser._id;
    });

})

module.exports = router;