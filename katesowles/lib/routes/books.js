const express = require('express');
const parser = require('body-parser').json();
const Book = require('../models/book');
const router = express.Router();

module.exports = router
  .get('/', (request, response, next) => {
    Book.find()
      .then(book => response.send(book))
      .catch( (err) => {
        next('error getting books: ', err);
      });
  })

  .get('/:id', (request,response, next) => {
    Book.findById(request.params.id)
      .populate({path: 'author', select: 'name countryOfOrigin website'})
      .lean()
      .then(book => response.send(book))
      .catch( (err) => {
        next('error finding that specific book: ', err);
      });
  })

  .post('/', parser, (request, response, next) => {
    new Book(request.body).save()
      .then(saved => response.send(saved))
      .catch( () => {
        next('error saving the book');
      });
  })

  .delete('/:id', (request, response, next) => {
    Book.findByIdAndRemove(request.params.id)
      .then(deleted => response.send(deleted))
      .catch( (err) => {
        next('error deleting the author', err);
      });
  })

  .put('/:id', parser, (request, response, next) => {
    Book.findByIdAndUpdate(request.params.id, request.body)
      .then(saved => response.send(saved))
      .catch( (err) => {
        next('error updating the book: ', err);
      });
  });
