const express = require('express');
const Book = require('../models/book');
const Rating = require('../models/rating');
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
  .get('/:rating', (request, response, next) => {
    Book.find({rating: request.params.rating})
      .select('title')
      .lean()
      .then( (books) => {
        const bookTitles = books.map( book => book.title );
        request.params.id = request.params.rating;
        Rating.find({_id: request.params.id})
          .select('star')
          .exec( (err, rating) => {
            const results = {
              starRating : rating[0].star,
              bookTitles
            };
            response.json(results);
          });

      })
      .catch( (err) => {
        next(`we had trouble retrieving the books: ${err}`);
      });
  });
