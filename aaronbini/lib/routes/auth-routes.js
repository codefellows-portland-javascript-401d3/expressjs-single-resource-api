const router = require('express').Router();
const bodyParser = require('body-parser').json();
const User = require('../models/users-model');
const token = require('../auth/token');

router.post('/signup', bodyParser, (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    throw {status: 400, error: 'username and password must be supplied'};
  }
  const {username, password, roles} = req.body;
  //remove from body, generally good practice
  delete req.body.password;

  User.find({username})
    .count()
    .then( count => {
      if (count > 0) throw {status: 400, error: `username ${username} already exists.`};

      const user = new User(req.body);
      user.generateHash(password);
      return user.save();
    })
    //create token for subsequent requests
    .then( user => {
      return token.sign(user);
    })
    //send token back as the response
    .then(token => {
      res.send({token});
    })
    .catch(next);
});

router.post('/signin', bodyParser, (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    throw {status: 400, error: 'username and password must be supplied'};
  }
  const {username, password} = req.body;
  console.log(req.body);
  //same as above, remove from body
  delete req.body.password;

  User.findOne({username})
    .then( user => {
      if (!user || !user.compareHash(password)) {
        throw {status: 400, error: 'invalid username or password.'};
      }
      return token.sign(user);
    })
    .then(token => {
      res.send({token});
    })
    .catch(next);
});

module.exports = router;
