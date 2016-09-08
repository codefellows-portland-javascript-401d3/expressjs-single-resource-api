const express = require( 'express' );
const router = express.Router();
const User = require( '../models/user' );
const bikesUsers = require(`./bikes-users`);
const bodyParser = require(`body-parser`).json();

module.exports = router 

  .get(`/`, (req, res, next) => {
    User.find({})
      .then(data => res.send(data))
      .catch(err => next);
  })

  .get(`/:id`, (req, res, next) => {
    User.findById(req.params.id)
      .then(user => {
        res.send(user); 
      })
      .catch(next);
  })

  .post(`/`, bodyParser, (req, res, next) => {  
    new User(req.body).save()
      .then(data => {
        res.send(data);
      })  
      .catch(next);
  })

  .put(`/:id`, bodyParser, (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body, 
    {new: true, runValidators: true})
      .then(changed => res.send(changed))
      .catch(next);
  })

  .delete(`/:id`, (req, res, next) => {
    User.findByIdAndRemove(req.params.id)
      .then(removed => res.send(removed))
      .catch(next);
  })
  
  .use(bikesUsers);

  