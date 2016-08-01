const express = require('express');
const router = express.Router();
const parser = require('../body-parser')();
const Movie = require('../models/movies-model');
const User = require('../models/actors-model');

router
  .post('/:movie/vote/:vote', (req, res, next) => {
    const movieId = req.params.movie;
    const vote = req.params.vote;
    const userId = req.user.id;

    Promise.all([
      Movie.count({_id: movieId}),
      Movie.findById(movieId),
      User.findById(userId)
    ])
    .then(([movieCount, movie, user]) => {
      if (movieCount !== 1) throw new Error({status: 400, message: 'Movie Not Found.'});
      movie.votes.push(vote);
      user.votes.push([{movieId, vote}]);
      user.save();
      return movie.save();
    })
    .then(saved => {
      res.send(saved);
    })
    .catch(next);
  });

module.exports = router;
