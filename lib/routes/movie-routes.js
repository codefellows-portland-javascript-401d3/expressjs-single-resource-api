const express = require('express');
const router = express.Router();
const parser = require('./body-parser')();
const Movie = require('../models/movies-model');

router.get('/gross', (req, res, next) => {
  //get total gross for all movies
  //will try to modify this to use Mongoose aggregation later
  Movie.find().then((movies) => {
    const grossTotal = movies.reduce((prev, curr) => {
      return prev + curr.gross;
    }, 0);
    res.send({grossTotal});
  }).catch(next);
})
.get('/', (req, res, next) => {
  const query = {};
  if (req.query.category) query.category = req.query.category;
  Movie.find(query).then((movies) => {
    res.send(movies);
  }).catch(next);
})
.get('/:id', (req, res, next) => {
  Movie.findById(req.params.id).then((movie) => {
    res.send(movie);
  }).catch(next);
})
.post('/', parser, (req, res, next) => {
  new Movie(req.body).save()
    .then((saved) => {
      res.send(saved);
    }).catch(next);
})
.put('/:id', parser, (req, res, next) => {
  Movie.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true}).then((changed) => {
    res.send(changed);
  }).catch(next);
})
.delete('/:id', (req, res, next) => {
  Movie.remove({_id: req.params.id}).then((message) => {
    res.send(message);
  }).catch(next);
});

module.exports = router;
