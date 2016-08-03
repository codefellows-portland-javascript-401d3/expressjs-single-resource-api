const express = require('express');
const router = express.Router();
const parser = require('body-parser').json();
const Movie = require('../models/movies-model');
const Actor = require('../models/actors-model');
const movieVoteRoutes = require('./movie-vote-routes');
const movieActorRoutes = require('./movie-actor-routes');

router.get('/gross', (req, res, next) => {


  //Change this to aggregate votes for each movie and send back average
  //should be two routes, one for vote avg. by movie, one for vote avg. for all movies


  //get total gross for all movies
  //will try to modify this to use Mongoose aggregation later
  Movie.find().then((movies) => {
    const grossTotal = movies.reduce((prev, curr) => {
      return prev + curr.gross;
    }, 0);
    res.send({grossTotal});
  }).catch(next);
})
.get('/', (req, res, next) => {
  Movie.find(req.query)
  .lean()
  .select('-__v -color -updatedAt -createdAt')
  .populate({
    path: 'actors',
    select: 'name age'
  })
  .then((movies) => {
    res.send(movies);
  }).catch(next);
})
.get('/:id', (req, res, next) => {
  Movie.findById(req.params.id)
  .lean()
  .select('-__v -color -updatedAt -createdAt')
  .populate({
    path: 'actors',
    select: 'name age'
  })
  .then((movie) => {
    res.send(movie);
  }).catch(next);
})
.post('/', parser, (req, res, next) => {
  new Movie(req.body).save()
    .then((saved) => {
      res.send(saved);
    }).catch(next);
})
.put('/:id', parser, (req, res, next) => {
  Movie.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
  .lean()
  .select('-__v -color -updatedAt -createdAt')
  .then((changed) => {
    res.send(changed);
  }).catch(next);
})
.delete('/:id', (req, res, next) => {
  Promise.all([
    Actor.update({}, {$pull: { movies: req.params.id}}, {multi: true}),
    Movie.remove({_id: req.params.id})
  ])
  .then(([actorMessage, movieMessage]) => {
    res.send(movieMessage);
  })
  .catch(next);
});

router.use(movieVoteRoutes);
router.use(movieActorRoutes);

module.exports = router;
