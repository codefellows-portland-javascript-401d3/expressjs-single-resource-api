const express = require('express');
const app = module.exports = express();
const logger = require('morgan')('dev');
const books = require('./routes/books');
const debug = require('debug')('myapp.app');

app.use(logger);

app.use('/api/books', books);

app.use((err, request, response, next) => {
  debug(err);
  response.status(err.code || 500)
  .send({
    error: err.error || err.message || err
  });
});

app.use( (request, response) => {
  response.status(404)
  .send({
    error: `${request.method} ${request.url} does not exist'`
  });
});

module.exports = app;
