const express = require('express');
const router = express.Router();
const parser = require('./body-parser')();
const Movies = require('../models/movies');

router.get('/', (req, res, next) => {
  Movies.getAll().then((movies) => {
    res.send(movies);
    next();
  }).catch(next);
})
.get('/:id', (req, res, next) => {
  Movies.getOne(req.params.id).then((movie) => {
    res.send(movie);
    next();
  }).catch(next);
})
.post('/', parser, (req, res, next) => {
  Movies.add(req.body).then((saved) => {
    res.send(saved);
    next();
  }).catch(next);
})
.put('/:id', parser, (req, res, next) => {
  Movies.change(req.params.id, req.body).then((changed) => {
    res.send(changed);
    next();
  }).catch(next);
})
.delete('/:id', (req, res, next) => {
  Movies.delete(req.params.id).then((movie) => {
    res.send(movie);
    next();
  }).catch(next);
});

module.exports = router;
