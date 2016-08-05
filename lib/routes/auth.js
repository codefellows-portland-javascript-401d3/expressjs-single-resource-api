const router = require('express').Router();
const jsonParser = require('body-parser').json();
const User = require('../models/user');
const token = require('../auth/token');

router.post ('/signup', jsonParser, (request, response, next) => {
  // rquest.body will have username nad password
  const {username, password} = request.body;
  // is the esame as :
  // const username = request.body.username;
  //const password = request.body.password;

  // we have a reference, so we're removing the plain text version
  delete request.body.password;

  User.find({username})
    .count()
    .then(count => {
      // check if username exists
      if (count > 0) /* or = 1 */ throw {code:400, error: `username ${username} already exists`};

      // create user object, hash password and saved
      const user = new User(request.body);
      user.generateHash(password);
      return user.save();
    })
    //return a token user can use for subsequent requests
    .then(user => response.send({token:'banana'}))
    .catch(next);
});

router .post('/signin', jsonParser, (request, response, next) => {
  // request.body will have username and password
  // find User by username
  // ensure User exists
  // return a token
});

module.exports = router;
