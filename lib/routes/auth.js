// kate
// test

const router = require('express').Router();
const parser = require('body-parser').json();
const User = require('../models/user');
const token = require('../auth/confirmToken');

module.exports = router
  .post ('/signup', parser, (request, response, next) => {
    // request.body will have username nad password
    // is the same as : const {username, password} = request.body;
    const { username, password } = request.body;

    // we have a reference, so we're removing the plain text version of the password
    delete request.body.password;

    User.find({username})
      .count()
      .then(count => {
        // check if username exists
        if (count > 0) /* or = 1 */ throw {code:400, error: `username ${username} already exists`};

        // create user object, hash password and saved
        const user = new User(request.body);
        user.generateHash(password);
        console.log('user', user);
        return user.save();
      })
      //return a token user can use for subsequent requests
      .then(user => token.sign(user))
      .then(token => response.send({token}))
      .catch(next);
  })

  .post('/signin', parser, (request, response, next) => {
    // request.body will have username and password
    const { username, password } = request.body;
    // removing plain text version of pword
    delete request.body.password;

    // find User by username
    User.findOne({username})
      .then(user => {
        // ensure User exists
        if (!user || !user.compareHash(password)) {
          throw {code: 403, error: 'Invalid username of password'};
        }

        return token.sign(user);
      })
      .then(token => response.send({token}))
      .catch(next);
  });
