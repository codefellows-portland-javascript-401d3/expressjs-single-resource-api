const router = require('express').Router();
const User = require('../models/user');

module.exports = router

  .get('/users', (request, response, next) => {
    User.find()
    .select('_id username roles')
      .then(users => response.send(users))
      .catch(next)
  });
