const express = require('express');
const Book = require('../models/book');
const Rating = require('../models/rating');
const router = express.Router();

module.exports = router

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
  })

  // removes any rating from the specific book
  .delete('/removeRating/:id', (request, response, next) => {
    Book.findById(request.params.id)
      .then(book => {
        if (!book) throw new Error(`bookId ${request.params.id} does not exist`);
        else {
          book.rating = null;
          book.save();
          response.send(book);
        }
      })
      .then(book => response.send(book))
      .catch( () => {
        next('there was an issue removing the ratingId from that book');
      });
  })

  // adds a specific rating to the specific book
  .put('/updateRating/:id/:rating', (request, response, next) => {
    Book.findById(request.params.id)
      .then(book => {
        if (!book) throw new Error(`bookId ${request.params.id} does not exist`);
        else {
          var rating = Rating.find(request.params.rating);
          if (rating != null) {
            book.rating = request.params.rating;
            book.save();
            response.send(book);
          }
          else {
            throw new Error('that ratingId doesn\'t exist, try again.');
          }
        }
      })
      .catch( (err) => {
        next(`there was an issue adding the ratingId to that book: ${err}`);
      });
  });
