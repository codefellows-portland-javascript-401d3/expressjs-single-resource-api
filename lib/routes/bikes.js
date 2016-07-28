const express = require( 'express' );
const router = express.Router();
const parseBikes = require(`./parseBikes`);
const Bike = require( '../models/bikes' );

module.exports = router 

  .get(`/`, (req, res, next) => {
    Bike.find({})
      .then(data => res.send(data))
      .catch(err => next);
  })

  .get(`/:id`, (req, res, next) => {
    Bike.findById(req.params.id)
      .then(user => {
        res.send(user); 
      })
      .catch(next);
  })

  .post(`/`, parseForm, (req, res, next) => {  
    new Bike(req.body).save()
      .then(data => {
        res.send(data);
      })  
      .catch(next);
  })

  // .put(`/:id`, parseForm, (req, res, next) => {
  //   store.put(req.params.id, req.body)
  //     .then(data => res.send(data))
  //     .catch(next);
  // })

  .delete(`/:id`, (req, res, next) => {
    Bike.removeById(req.params.id)
      .then(removed => res.send(removed))
      .catch(next);
  });
