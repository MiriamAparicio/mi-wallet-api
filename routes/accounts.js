const express = require('express');
const router = express.Router();

const Account = require('../models/account');
const Record = require('../models/record');
const User = require('../models/user');

router.get('/', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.status(401).json({ code: 'unauthorized' });
  }
  Account.find({ owner: req.session.currentUser._id })
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.status(401).json({ code: 'unauthorized' });
  }
  Account.findById(req.params.id)
    .then((result) => {
      // @todo authorization - check result.owner.equals(req.session.currentUser._id) > 401
      if (!result.owner.equals(req.session.currentUser._id)) {
        return res.status(401).json({ code: 'unauthorized' });
      }      
      res.json(result);
    })
    .catch(next);
});

router.get('/:id/records', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.status(401).json({ code: 'unauthorized' });
  }
  Record.find({ account: req.params.id, owner: req.session.currentUser._id })
    // @todo sort by latest
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.status(401).json({ code: 'unauthorized' });
  }

  const name = req.body.name;

  if (!name) {
    return res.status(422).json({ code: 'validation' });
  }

  Account.findOne({ name: name })
    .then((accountExist) => {
      if (result) {
        return res.status(422).json({ code: 'account-exist' });
      }

      const owner = req.session.currentUser._id;
      const newAccount = new Account({
        name,
        owner
      });

      newAccount.save()
        .then((result) => {
          res.status(201).json(result);
        })
        .catch(next);
    });
});


module.exports = router;
