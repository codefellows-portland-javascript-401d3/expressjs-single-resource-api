const errorhandler = require('./errorhandler');
const express = require('express');
const app = express();
const series = require('./routes/series');
const episodes = require('./routes/episodes');

const endpoints = {
  seriesList: 'GET /api/series',
  specificSeries: 'GET /api/series/:id',
  addSeries: 'POST /api/series',
  updateSeries: 'PUT /api/series/:id',
  removeSeries: 'DELETE /api/series/:id',
  episodeList: 'GET /api/episodes',
  specificEpisode: 'GET /api/episodes/:id',
  addEpisode: 'POST /api/episodes',
  updateEpisode: 'PUT /api/episodes/:id',
  removeEpisode: 'DELETE /api/episodes/:id'
};

app.get('/api', (req,res) => res.json(endpoints) );

app.use('/api/series', series);
app.use('/api/episodes', episodes);

app.use(errorhandler);

module.exports = app;
