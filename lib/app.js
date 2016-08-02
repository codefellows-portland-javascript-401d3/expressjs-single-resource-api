const errorhandler = require('./errorhandler');
const express = require('express');
const app = express();
const series = require('./routes/series');
const episodes = require('./routes/episodes');
const characters = require('./routes/characters');

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
  removeEpisode: 'DELETE /api/episodes/:id',
  characterList: 'GET /api/characters',
  specificCharacter: 'GET /api/characters/:id',
  addCharacter: 'POST /api/characters',
  updateCharacter: 'PUT /api/characters/:id',
  removeCharacter: 'DELETE /api/characters/:id'
};

app.get('/api', (req,res) => res.json(endpoints) );

app.use('/api/series', series);
app.use('/api/episodes', episodes);
app.use('/api/characters', characters);

app.use(errorhandler);

module.exports = app;
