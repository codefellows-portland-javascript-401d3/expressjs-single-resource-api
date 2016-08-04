const express = require('express');
const router = express.Router();
const parser = require('body-parser').json();
const Movie = require('../models/movies-model');
const Actor = require('../models/actors-model');

router
  .put('/:movie/actors/:actor', (req, res, next) => {
    const movieId = req.params.movie;
    const actorId = req.params.actor;
    //need to dry up this code, because it is basically equivalent to this put method in actors route
    Promise.all([
      Actor.count({_id: actorId}),
      Actor.findById(actorId),
      Movie.findById(movieId)
    ]).then(([actorCount, actor, movie]) => {
      if (actorCount !== 1) throw new Error({status: 400, message: 'That actor does not exist.'});
      actor.movies.push(movieId);
      actor.save();
      movie.actors.push(actorId);
      return movie.save();
    })
    .then((saved) => {
      res.send(saved);
    })
    .catch(next);
  });

module.exports = router;
