const bodyparser = require('../bodyparser');
const Episode = require('../models/episode');

const express = require( 'express' );
const router = express.Router();

module.exports = router

.get('', (req,res,next) => {
  Episode.find()
  .then( data => res.send(data) )
  .catch( next );
})

.get('/:id', (req,res,next) => {
  Episode.findById(req.params.id)
  .then( episode => res.send(episode) )
  .catch( next );
})

.post('', bodyparser, (req,res,next) => {
  new Episode(req.body).save()
  .then( episode => res.send(episode) )
  .catch( next );
})

.put('/:id', bodyparser, (req,res,next) => {
  Episode.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then( episode => res.send(episode) )
  .catch( next );
})

.delete('/:id', (req,res,next) => {
  Episode.findByIdAndRemove(req.params.id)
  .then( data => res.send(data) )
  .catch( next );
});