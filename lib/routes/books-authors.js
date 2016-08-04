const express = require('express');
const Book = require('../models/book');
const Author = require('../models/author');
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

  // returns all book titles by authorId
  .get('/:author', (request, response, next) => {
    Book.find({author: request.params.author})
      .select('title')
      .lean()
      .then( (books) => {
        const bookTitles = books.map( book => book.title );
        request.params.id = request.params.author;
        Author.find({_id: request.params.id})
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

      })
      .catch( (err) => {
        next(`we had trouble retrieving the books: ${err}`);
      });
  });
