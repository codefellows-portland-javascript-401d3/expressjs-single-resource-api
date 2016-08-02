const express = require('express');
const router = express.Router();
const parser = require('body-parser').json();
// const parser = require('../body-parser')();
const Movie = require('../models/movies-model');
const User = require('../models/users-model');

router
  .get('/:movie/vote', (req, res, next) => {
    const movieId = req.params.movie;
    Movie.findById(movieId)
    .then(movie => {
      const voteTotal = movie.votes.reduce((prev, curr) => {
        return prev + curr;
      }, 0);
      const voteAvg = voteTotal / movie.votes.length;
      res.send({avg: voteAvg});
    })
    .catch(next);
  })
  .post('/:movie/vote/:vote', parser, (req, res, next) => {
    const movieId = req.params.movie;
    const vote = req.params.vote;
    const userId = req.user.id;

    Promise.all([
      Movie.count({_id: movieId}),
      Movie.findById(movieId),
      User.findById({_id: userId})
    ])
    .then(([movieCount, movie, user]) => {
      if (movieCount !== 1) throw new Error({status: 400, message: 'Movie Not Found.'});
      movie.votes.push(vote);
      user.votes.push({movie: movieId, vote: vote});
      user.save();
      return movie.save();
    })
    .then(saved => {
      res.send(saved);
    })
    .catch(next);
  });

module.exports = router;
