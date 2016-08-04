const express = require('express');
const Book = require('../models/book');
const Method = require('../models/method');
const router = express.Router();

module.exports = router

  // returns all books
  .get('/', (request, response, next) => {
    Book.find()
      .then(book => response.send(book))
      .catch( (err) => {
        next(`we had trouble retrieving the books: ${err}`);
      });
  })

  // returns all book titles by methodId
  .get('/:method', (request, response, next) => {
    Book.find({method: request.params.method})
      .select('title')
      .lean()
      .then( (books) => {
        const bookTitles = books.map( book => book.title );
        request.params.id = request.params.method;
        Method.find({_id: request.params.id})
          .select('readByMethod')
          .exec( (err, method) => {
            const results = {
              readByMethod : method[0].readByMethod,
              bookTitles
            };
            response.json(results);
          });

      })
      .catch( (err) => {
        next(`we had trouble retrieving the books: ${err}`);
      });
  });
