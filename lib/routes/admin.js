const router = require('express').Router();
const User = require('../models/user');

module.exports = router

  //list all users
  .get('/users', (req, res, next)=>{
    User.find()
    .select('_id username roles')
      .then(users => res.send(users))
      .catch(next);
  });
