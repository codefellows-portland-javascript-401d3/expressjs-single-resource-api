const express = require('express');
const Book = require('../models/book');
const Method = require('../models/method');
const router = express.Router();

module.exports = router
  .get('/', (request, response, next) => {
    Book.find()
      .then(book => response.send(book))
      .catch( (err) => {
        next(`we had trouble retrieving the books: ${err}`);
      });
  })
  .put('', (request, response, next) => {
    Book.findById(request.params.bookId)
      .then(book => {
        if (!book) throw new Error (`book id "${request.params.bookId}" could not be found`);
        return book.setMethod(request.params.id);
      })
      .then(book => response.send(book))
      .catch( () => {
        next('there was an issue adding the methodId to the book');
      });
  })

  .delete('null/books/:bookId', (request, response, next) => {
    Book.findById(request.params.bookId)
      .then(book => {
        if (!book) throw new Error (`book id "${request.params.bookId}" could not be found`);
        return book.removeMethod(request.params.bookId);
      })
      .then(book => response.send(book))
      .catch( () => {
        next('there was an issue removing the authorId to the book');
      });
  })

  .get('/:id/countBooks', (request, response, next) => {
    Method.exists(request.params.id)
      .then(exists => {
        if (!exists) throw new Error('this method does not exist');
      })
      .then( () => {
        Book.find({methodId: request.params.id}).select('readByMethod')
          .count()
          .then(count => {
            response.json(count);
          })
          .catch( () => {
            next('there was an issue getting the total number of books read by this method');
          });
      });
  })

  .get('/:id/books', (request, response, next) => {
    Method.exists(request.params.id)
      .then(exists => {
        if (!exists) throw new Error('this method does not exist');
      })
      .then( () => {
        Book.find({methodId:request.params.id}).select('readByMethod')
          .lean()
          .then(books => {
            response.json(books);
          })
          .catch(next);
      })
      .catch( () => {
        next(`there was an issue retrieving the books for method "${request.params.id}"`);
      });
  });
