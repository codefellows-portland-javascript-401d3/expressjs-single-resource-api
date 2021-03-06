const express = require( 'express' );
const router = express.Router();
const bodyParser = require(`body-parser`).json();
const Bike = require( '../models/bike' );

module.exports = router 

  .get(`/`, (req, res, next) => {
    Bike.find({})
      .then(data => res.send(data))
      .catch(next);
  })

  .get(`/number`, (req, res, next) => {
    Bike.find({})
      .then(data => {
        let dataLength = data.length;
        let msg = {msg: `${dataLength} total bikes saved`};
        res.send(msg);
      })
      .catch(next);
  })

  .get(`/:id`, (req, res, next) => {
    Bike.findById(req.params.id)
      .then(user => {
        res.send(user); 
      })
      .catch(next);
  })

  .post(`/`, bodyParser, (req, res, next) => {  
    new Bike(req.body).save()
      .then(data => {
        res.send(data);
      })  
      .catch(next);
  })

  .put(`/:id`, bodyParser, (req, res, next) => {
    Bike.findByIdAndUpdate(req.params.id, req.body, 
    {new: true, runValidators: true})
      .then(changed => res.send(changed))
      .catch(next);
  })

  .delete(`/:id`, (req, res, next) => {
    Bike.findByIdAndRemove(req.params.id)
      .then(removed => res.send(removed))
      .catch(next);
  });