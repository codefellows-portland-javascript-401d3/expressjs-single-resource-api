const bodyparser = require('../bodyparser');
const Series = require('../models/series');

const express = require( 'express' );
const router = express.Router();

module.exports = router

.get('', (req,res,next) => {
  Series.find()
  .then( data => res.send(data) )
  .catch( next );
})

.get('/:id', (req,res,next) => {
  Series.findById(req.params.id)
  .then( series => res.send(series) )
  .catch( next );
})

.post('', bodyparser, (req,res,next) => {
  new Series(req.body).save()
  .then( series => res.send(series) )
  .catch( next );
})

.put('/:id', bodyparser, (req,res,next) => {
  Series.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then( series => res.send(series) )
  .catch( next );
})

.delete('/:id', (req,res,next) => {
  Series.findByIdAndRemove(req.params.id)
  .then( data => res.send(data) )
  .catch( next );
});