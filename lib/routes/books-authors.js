const express = require('express');
const Book = require('../models/book');
// const Author = require('../models/author');
const router = express.Router();

module.exports = router
  // gillian flynn : 57a0e6555342b8d7209592d2
  // wild : 57a109ea9c349041249588d2
  // dark places : 57a10a1d9c349041249588d4

  // returns all books
  .get('/', (request, response, next) => {
    Book.find()
      .then(book => response.send(book))
      .catch( (err) => {
        next(`we had trouble retrieving the books: ${err}`);
      });
  })

  // returns all book titles by authorId
  .get('/matches/:author', (request, response, next) => {
    Book.find()
      .then( (books) => {
        var array = [];
        for (var i = 0; i < books.length; i++) {
          if (books[i].author == request.params.author) {
            array.push(books[i].title);
          }
        }
        response.send(array);
      })
      .catch( (err) => {
        next(`we had trouble retrieving the books: ${err}`);
      });
  });
