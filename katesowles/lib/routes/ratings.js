const express = require('express');
const parser = require('body-parser').json();
const Rating = require('../models/rating');
const router = express.Router();

module.exports = router
  .get('/', (request, response, next) => {
    Rating.find()
      .then(rating => response.send(rating))
      .catch( () => {
        next('error getting rating');
      });
  })
  .get('/:id', (request,response, next) => {
    Rating.findById(request.params.id)
      .then(rating => response.send(rating))
      .catch( () => {
        next('error finding that specific rating');
      });
  })
  .delete('/:id', (request, response, next) => {
    Rating.findByIdAndRemove(request.params.id)
      .then(deleted => response.send(deleted))
      .catch( (err) => {
        next('error deleting the rating', err);
      });
  })
  .post('/', parser, (request, response, next) => {
    new Rating(request.body).save()
      .then(saved => response.send(saved))
      .catch( () => {
        next('error saving the rating');
      });
  })
  .put('/:id', parser, (request, response, next) => {
    Rating.findByIdAndUpdate(request.params.id, request.body)
      .then(saved => response.send(saved))
      .catch( () => {
        next('error updating the rating');
      });
  });
