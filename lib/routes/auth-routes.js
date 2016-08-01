const router = require('express').Router();
const bodyParser = require('../body-parser');
const User = require('../models/users-model');
const token = require('../auth/token');

router.post('/signup', bodyParser, (req, res, next) => {
  const {username, password} = req.body;
  //remove from body, generally good practice
  delete req.body.password;

  User.find({username})
    .count()
    .then( count => {
      if (count > 0) throw {code: 400, error: `username ${username} already exists.`};

      const user = new User(req.body);
      user.generateHash(password);
      return user.save();
    })
    //create token for subsequent requests
    .then( user => {
      token.sign(user);
    })
    //send token back as the response
    .then(token => {
      res.send({token});
    })
    .catch(next);
});

router.post('/signin', bodyParser, (req, res, next) => {
  const {username, password} = req.body;
  //same as above, remove from body
  delete req.body.password;

  User.findOne({username})
    .then( user => {
      if (!user || !user.compareHash(password)) {
        throw {code: 400, error: 'invalid username or password.'};
      }
      return token.sign(user);
    })
    .then(token => {
      res.send({token});
    })
    .catch(next);
});
