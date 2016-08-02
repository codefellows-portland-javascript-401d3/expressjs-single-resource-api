const express = require('express');
const Book = require('../models/book');
const Rating = require('../models/rating');
const router = express.Router();

module.exports = router

  .put('', (request, response, next) => {
    Book.findById(request.params.bookId)
      .then(book => {
        if (!book) throw new Error (`book id "${request.params.bookId}" could not be found`);
        return book.setMethod(request.params.id);
      })
      .then(book => response.send(book))
      .catch( () => {
        next('there was an issue adding the ratingId to the book');
      });
  })

  .delete('null/books/:bookId', (request, response, next) => {
    Book.findById(request.params.bookId)
      .then(book => {
        if (!book) throw new Error (`book id "${request.params.bookId}" could not be found`);
        return book.removeRating(request.params.bookId);
      })
      .then(book => response.send(book))
      .catch( () => {
        next('there was an issue removing the ratingId to the book');
      });
  })

  .get('/:id/countBooks', (request, response, next) => {
    Rating.exists(request.params.id)
      .then(exists => {
        if (!exists) throw new Error('this rating does not exist');
      })
      .then( () => {
        Book.find({ratingId: request.params.id}).select('star')
          .count()
          .then(count => {
            response.json(count);
          })
          .catch( () => {
            next('there was an issue getting the total number of books read by this rating');
          });
      });
  })

  .get('/:id/books', (request, response, next) => {
    Rating.exists(request.params.id)
      .then(exists => {
        if (!exists) throw new Error('this rating does not exist');
      })
      .then( () => {
        Book.find({ratingId:request.params.id}).select('star')
          .lean()
          .then(books => {
            response.json(books);
          })
          .catch(next);
      })
      .catch( () => {
        next(`there was an issue retrieving the books for rating "${request.params.id}"`);
      });
  });
