const express = require('express');
const bodyParser = require('body-parser').json();
const Book = require('../models/book');
const router = express.Router();

module.exports = router
  .get('/', (request, response, next) => {
    const query = {};
    if (request.query.title) query.title = request.query.title;
    Book.find(query)
      .then(books => response.send(books))
      .catch(next);
  })
  .get('/:id', (request,response, next) => {
    Book.findById(request.params.id)
      .then(book => response.send(book))
      .catch(next);
  })
  .delete('/:id', (request, response, next) => {
    Book.removeById(request.params.id)
      .then(deleted => response.send(deleted))
      .catch(next);
  })
  .post('/', bodyParser, (request, response, next) => {
    new Book(request.body).save()
    .then(saved => response.send(saved))
    .catch(next);
  })
  .put('.:id', bodyParser, (request, response, next) => {
    Book.findByIdAndUpdate(request.params.id, request.body)
      .then(saved => response.send(saved))
      .catch(next);
  });
