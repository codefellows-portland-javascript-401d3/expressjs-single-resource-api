const express = require( 'express' );
const mongoose = require('mongoose');
const bodyParser = require( 'body-parser' );
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const User = require('../models/user');
const authenticate = require('../auth/authenticate')();

const router = express.Router();

module.exports = router

  .get('/', authenticate, (req, res, next) => {
    User.find({})
    .then((users) => {res.json(users);})
    .catch(next);
  })

  .post('/signup', (req, res, next) => {
    const {name, password} = req.body; //How does this work?
    delete req.body.password;

    if (name == null || password == null) {
      return next({status: 400, message: 'Username and password must both be supplied.'});
    }

    //Check if User already exists.
    User.find({name})
    .count()
    .then((count) => { //Classwork used count. Why can't I omit count and use if(user)?
      if (count > 0) return next({status: 400, message: `Username ${name} in use.`});

      const user = new User(req.body);
      user.password = bcrypt.hashSync(password, salt);
      return user.save();
    })
    .then((user) => {
      let token = jwt.sign(user, process.env.secret);
      res.json({success: true, message: 'Token Issued!', user, token});
    })
    .catch(next);
  })

  .post('/signin', (req, res, next) => {
    const {name, password} = req.body; //How does this work?
    delete req.body.password;

    if (name == null || password == null) {
      return next({status: 400, message: 'Username and password must both be supplied.'});
    }

    User.findOne({name})
    .then((user) => {
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return next({staus: 400, message: 'Username or password incorrect.'});
      }
      return user;
    })
    .then((user) => {
      let token = jwt.sign(user, process.env.secret);
      res.json({success: true, message: 'Token Issued!', user, token});
    })
    .catch(next);
  });

  // .post('/requestToken', (req, res, next) => {
  //   User.findOne({name: req.body.name})
  //   .then((user) => {
  //     if (!user) {
  //
  //       next({status: 403, message: 'Authentication failed. No such user.'});
  //     } else if (user) {
  //       if (user.password != req.body.password) {
  //
  //         next({status: 403, message: 'Authentication failed. Wrong password.'});
  //       } else {
  //         //We're here if the user exists and password is correct.
  //         //So, let's make a token.
  //         let token = jwt.sign(user, process.env.secret);
  //         res.json({success: true, message: 'Token Issued!', token});
  //       }
  //     }
  //   })
  //   .catch(next);
  // });
