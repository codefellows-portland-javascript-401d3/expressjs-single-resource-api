const express = require('express');
const router = express.Router();
const parser = require('../body-parser')();
const Movie = require('../models/movies-model');
const Actor = require('../models/actors-model');

router
  .put('/:actor/movies/:movie', (req, res, next) => {
    const actorId = req.params.actor;
    const movieId = req.params.movie;
    //need to dry up this code, because it is basically equivalent to this put method in movies route
    Promise.all([
      Movie.count({_id: movieId}),
      Actor.findById(actorId),
      Movie.findById(movieId)
    ])
    .then(([movieCount, actor, movie]) => {
      if (movieCount !== 1) throw new Error({status: 400, message: 'That movie does not exist in the database.'});
      movie.actors.push(actorId);
      movie.save();
      actor.movies.push(movieId);
      return actor.save();
    })
    .then((saved) => {
      res.send(saved);
    })
    .catch(next);
  });

module.exports = router;
