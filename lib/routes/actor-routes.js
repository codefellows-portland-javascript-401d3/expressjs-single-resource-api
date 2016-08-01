const express = require('express');
const router = express.Router();
const parser = require('./body-parser')();
const dateParser = require('./date-parser')();
const Actor = require('../models/actors-model');
const Movie = require('../models/movies-model');
const actorMovieRoutes = require('./actor-movie-routes');

router.get('/totalMovies', (req, res, next) => {
  //will modify this to incorporate Mongoose aggregator at some point
  Actor.find().then((actors) => {
    const totalMovies = actors.reduce((prev, curr) => {
      return prev + curr.movies.length;
    }, 0);
    res.send({totalMovies});
  }).catch(next);
})
.get('/', (req, res, next) => {
  Actor.find(req.query)
  .lean()
  .select('-__v -active -createdAt -updatedAt -DOB')
  .populate({
    path: 'movies',
    select: 'title category'
  })
  .then((actors) => {
    res.send(actors);
  }).catch(next);
})
.get('/:id', (req, res, next) => {
  Actor.findById(req.params.id)
  .lean()
  .select('-__v -active -createdAt -updatedAt -DOB')
  .populate({
    path: 'movies',
    select: 'title category'
  })
  .then((actor) => {
    res.send(actor);
  }).catch(next);
})
.post('/', parser, dateParser, (req, res, next) => {
  new Actor(req.body).save()
    .then((saved) => {
      res.send(saved);
    }).catch(next);
})
.put('/:id', parser, (req, res, next) => {
  Actor.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
  .lean()
  .select('-__v -active -createdAt -updatedAt -DOB')
  .then((changed) => {
    res.send(changed);
  }).catch(next);
})
.delete('/:id', (req, res, next) => {
  Promise.all([
    Movie.update({}, {$pull: { actors: req.params.id}}, {multi: true}),
    Actor.remove({_id: req.params.id})
  ])
  .then(([movieMessage, actorMessage]) => {
    res.send(actorMessage);
  })
  .catch(next);
});

router.use(actorMovieRoutes);

module.exports = router;
