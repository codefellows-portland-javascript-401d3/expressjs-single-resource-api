const bodyparser = require('../bodyparser');
const Series = require('../models/series');
const Episode = require('../models/episode');

const express = require( 'express' );
const router = express.Router();

module.exports = router

.get('', (req,res,next) => {
  Series.find()
  .lean()
  .select('name description type')
  .then( data => {
    // At this point 'data' is an array of Series objects with no Episode info.
    return Promise.all(
      // Now start building a new array based
      data.map( series => {
        // Find the episodes that are related to each series
        return Episode.find({'series': series._id})
          .then( episodeArr => {
            // Then attach the array of related episodes to each series object.
            series.episodes = episodeArr;
            series.episodeCount = episodeArr.length;
            return series;
          });
      })
    );
  })
  .then ( data => res.send(data) )
  .catch( next );
})

.get('/:id', (req,res,next) => {
  Series.findById(req.params.id)
  .lean()
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
  .lean()
  .then( series => res.send(series) )
  .catch( next );
})

.delete('/:id', (req,res,next) => {
  Series.findByIdAndRemove(req.params.id)
  .lean()
  .then( data => {
    if(!data) return Promise.reject(data);
    res.send(data);
  })
  .catch( next );
});