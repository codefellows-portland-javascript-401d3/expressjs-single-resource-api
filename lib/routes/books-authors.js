const express = require('express');
const Book = require('../models/book');
const Author = require('../models/author');
const router = express.Router();

module.exports = router

  // returns all book titles by authorId
  // eslint-disable-next-line
  .get('/:author', (request, response, next) => {
    Book.find({author: request.params.author})
      .select('title')
      .lean()
      .then( (books) => {
        const bookTitles = books.map( book => book.title );
        request.params.id = request.params.author;
        return Author.find({_id: request.params.id})
          .select('name')
          .exec( (err, author) => {
            const first = author[0].name.split(', ')[1];
            const last = author[0].name.split(', ')[0];
            const results = {
              authorName : first + last,
              bookTitles
            };
            response.json(results);
          });
      });
      // .catch( (err) => {
      //   next(`we had trouble retrieving the books: ${err}`);
      // });
  })

  // removes any author from the specific book
  .delete('/removeAuthor/:id', (request, response, next) => {
    Book.findById(request.params.id)
      .then(book => {
        if (!book) throw new Error(`bookId ${request.params.id} does not exist`);
        else {
          book.author = null;
          book.save();
          response.send(book);
        }
      })
      .then(book => response.send(book))
      .catch( (err) => {
        next(`there was an issue removing the authorId from that book: ${err}`);
      });
  })

  // adds a specific method to the specific book
  .put('/updateAuthor/:id/:author', (request, response, next) => {
    Book.findById(request.params.id)
      .then(book => {
        if (!book) throw new Error(`bookId ${request.params.id} does not exist`);
        else {
          var author = Author.find(request.params.author);
          if (author != null) {
            book.author = request.params.author;
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
