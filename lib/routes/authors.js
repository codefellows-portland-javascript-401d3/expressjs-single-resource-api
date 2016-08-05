const express = require('express');
const parser = require('../bodyParser')();
const Author = require('../models/author');
const router = express.Router();

module.exports = router
  .get('/', (request, response, next) => {
    Author.find()
      .then(author => response.send(author))
      .catch( () => {
        next('error getting authors');
      });
  })
  .get('/:id', (request,response, next) => {
    Author.findById(request.params.id)
      .then(author => response.send(author))
      .catch( () => {
        next('error finding that specific author');
      });
  })
  .delete('/:id', (request, response, next) => {
    Author.findByIdAndRemove(request.params.id)
      .then(deleted => response.send(deleted))
      .catch( (err) => {
        next('error deleting the author', err);
      });
  })
  .post('/', parser, (request, response, next) => {
    new Author(request.body).save()
      .then(saved => response.send(saved))
      .catch( () => {
        next('error saving the author');
      });
  })
  .put('/:id', parser, (request, response, next) => {
    Author.findByIdAndUpdate(request.params.id, request.body)
      .then(saved => response.send(saved))
      .catch( () => {
        next('error updating the author');
      });
  });
