const router = require('express').Router();
const parser = require('../body-parser')();
const User = require('../models/users-model');

//allow users to get their own user information, including movies they've voted on
router
  .get('/me', parser, (req, res, next) => {
    User.findById(req.user.id)
      .select('-__v')
      .lean()
      .then(user => {
        res.send(user);
      })
      .catch(next);
  });

module.exports = router;
