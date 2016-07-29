const express = require('express');
const parser = require('../parser')();
const User = require('../models/user');
const router = express.Router();

module.exports = router

  .get('/', (req, res, next)=>{
    User.find()
      .then(user => res.send(user))
      .catch(()=>{
        next('Error getting users.');
      });
  })

  .get('/:id', (req, res, next)=>{
    User.findById(req.params.id)
      .then(user => res.send(user))
      .catch(()=>{
        next('Invalid user id.');
      });
  })

  .post('/', parser, (req, res, next)=>{
    new User(req.body).save()
      .then(saved => res.send(saved))
      .catch(()=>{
        next('Error saving user profile.');
      });
  })

  .delete('/:id', (req, res, next)=> {
    User.findByIdAndRemove(req.params.id)
      .then(() => res.json('User deleted'))
      .catch(()=>{
        next('Error deleting user profile.');
      });
  })

  .put('/:id', parser, (req, res, next)=>{
    User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
      .then(() => res.json('User profile updated'))
      .catch(()=>{
        next('Error updating user profile.');
      });

  });
