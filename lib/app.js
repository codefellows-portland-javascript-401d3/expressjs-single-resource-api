const errorhandler = require('./errorhandler');
const express = require('express');
const app = express();
const series = require('./routes/series');
const episodes = require('./routes/episodes');
const characters = require('./routes/characters');
const path = require( 'path' );
const publicPath = path.resolve( __dirname, '../public' );
const indexHtml = path.resolve( __dirname, '../index.html' );

module.exports = app
.use(express.static(publicPath))
.get('/', (req,res) => res.sendFile(indexHtml))
.get('/api', (req,res) => res.json(endpoints))
.use('/api/series', series)
.use('/api/episodes', episodes)
.use('/api/characters', characters)
.use(errorhandler);

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
