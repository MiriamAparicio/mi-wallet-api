const express = require('express');
const router = express.Router();
const pubsub = require('pubsub-js');

const Record = require('../models/record');
const Account = require('../models/account');

router.get('/', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.status(401).json({ code: 'unauthorized' });
  }
  Record.find({ owner: req.session.currentUser._id })
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

router.get('/latest', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.status(401).json({ code: 'unauthorized' });
  }
  Record.find({ owner: req.session.currentUser._id })
    .sort({date: -1})
    .limit(5)
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
  const category = req.body.category;
  const amount = req.body.amount;
  const date = req.body.date;
  const type = req.body.type.toLowerCase();

  Account.find({$and:[{name: req.body.account},{owner: req.session.currentUser}]})
    .then((result) => {
      const account = result[0]._id;
      const owner = req.session.currentUser._id;
      const newRecord = new Record ({
        owner,
        account,
        category,
        date,
        amount,
        type
      });

      newRecord.save()
        .then((result) => {
          res.status(201).json(newRecord);
        })
        .then(() => {
          pubsub.publish("record.new", newRecord);
        })
        .catch(next);
    });

})

module.exports = router;