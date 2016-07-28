const express = require('express');
const router = express.Router();
const parser = require('./body-parser')();
const Actor = require('../models/actors-model');

router.get('/', (req, res, next) => {
  const query = {};
  if (req.query.category) query.category = req.query.category;
  console.log(query);
  Actor.find(query).then((movies) => {
    res.send(movies);
  }).catch(next);
})
.get('/:id', (req, res, next) => {
  Actor.findById(req.params.id).then((movie) => {
    res.send(movie);
  }).catch(next);
})
.post('/', parser, (req, res, next) => {
  new Actor(req.body).save()
    .then((saved) => {
      res.send(saved);
    }).catch(next);
})
.put('/:id', parser, (req, res, next) => {
  Actor.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((changed) => {
    res.send(changed);
  }).catch(next);
})
.delete('/:id', (req, res, next) => {
  Actor.remove({_id: req.params.id}).then((movie) => {
    res.send(movie);
  }).catch(next);
});

router.get('/oldActors', (req, res, next) => {
  //use mongoose aggregator here
  Actor.aggregate({$match: {year: {$lte: new Date('1986-07-26')}}})
  .then((aggregate) => {
    res.send(aggregate);
  })
  .catch(next);
});

module.exports = router;
