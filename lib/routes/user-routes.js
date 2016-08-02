const router = require('express').Router();
const parser = require('../body-parser')();
const User = require('../models/users-model');

//user admin route: the user that has role admin will be able to access the below routes
//that user will be able to change another user's role and also delete another user

//only they will be able to access the below routes, as they require passage through
//ensureAuth and ensureRole middleware to make it here

router
  .get('/all', (req, res, next) => {
    User.find()
      .select('-__v')
      .lean()
      .populate('votes.movie', 'title')
      .then(users => {
        res.send(users);
      })
      .catch(next);
  })
  .get('/me', parser, (req, res, next) => {
    User.findById(req.user.id)
      .select('-__v')
      .lean()
      .then(user => {
        res.send(user);
      })
      .catch(next);
  })
  .post('/:userId/roles/:role', (req, res, next) => {
    /* add logic for adding a role to a user */
  })
  .delete('/:userId/roles/:role', (req, res, next) => {
    /* add logic for deleting a role from a user */
  })
  .delete('/:userId', (req, res, next) => {
    /* add logic for deleting a user */
  });

module.exports = router;
