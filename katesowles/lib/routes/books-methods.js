const express = require('express');
const Book = require('../models/book');
const Method = require('../models/method');
const router = express.Router();

module.exports = router

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
  })

  // removes any method from the specific book
  .delete('/removeMethod/:id', (request, response, next) => {
    Book.findById(request.params.id)
      .then(book => {
        if (!book) throw new Error(`bookId ${request.params.id} does not exist`);
        else {
          book.method = null;
          book.save();
          response.send(book);
        }
      })
      .then(book => response.send(book))
      .catch( (err) => {
        next(`there was an issue removing the methodId from that book: ${err}`);
      });
  })

  // adds a specific method to the specific book
  .put('/updateMethod/:id/:method', (request, response, next) => {
    Book.findById(request.params.id)
      .then(book => {
        if (!book) throw new Error(`bookId ${request.params.id} does not exist`);
        else {
          var method = Method.find(request.params.method);
          if (method != null) {
            book.method = request.params.method;
            book.save();
            response.send(book);
          }
          else {
            throw new Error('that methodId doesn\'t exist, try again.');
          }
        }
      })
      .catch( (err) => {
        next(`there was an issue adding the methodId to that book: ${err}`);
      });
  });
