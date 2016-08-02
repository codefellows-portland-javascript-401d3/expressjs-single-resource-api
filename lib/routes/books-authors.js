const express = require('express');
const Book = require('../models/book');
const Author = require('../models/author');
const router = express.Router();

module.exports = router

  .put('', (request, response, next) => {
    Book.findById(request.params.bookId)
      .then(book => {
        if (!book) throw new Error (`book id "${request.params.bookId}" could not be found`);
        return book.setAuthor(request.params.id);
      })
      .then(book => response.send(book))
      .catch( () => {
        next('there was an issue adding the authorId to the book');
      });
  })

  .delete('null/books/:bookId', (request, response, next) => {
    Book.findById(request.params.bookId)
      .then(book => {
        if (!book) throw new Error (`book id "${request.params.bookId}" could not be found`);
        return book.removeAuthor(request.params.bookId);
      })
      .then(book => response.send(book))
      .catch( () => {
        next('there was an issue removing the authorId to the book');
      });
  })

  .get('/:id/countBooks', (request, response, next) => {
    Author.exists(request.params.id)
      .then(exists => {
        if (!exists) throw new Error('this author does not exist');
      })
      .then( () => {
        Book.find({authorId: request.params.id}).select('title pubYear numPages rating complete method')
          .count()
          .then(count => {
            response.json(count);
          })
          .catch( () => {
            next('there was an issue getting the total number of books');
          });
      });
  })

  .get('/:id/books', (request, response, next) => {
    Author.exists(request.params.id)
      .then(exists => {
        if (!exists) throw new Error('this author does not exist');
      })
      .then( () => {
        Book.find({authorId:request.params.id}).select('title pubYear numPages rating complete method')
          .lean()
          .then(books => {
            response.json(books);
          })
          .catch(next);
      })
      .catch( () => {
        next(`there was an issue retrieving the books for author "${request.params.id}"`);
      });
  });
