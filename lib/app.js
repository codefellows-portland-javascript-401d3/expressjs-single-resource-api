const express = require('express');
const app = module.exports = express();
const books = require('./routes/books');
const authors = require('./routes/authors');

app.use('/api/books', books);
app.use('/api/authors', authors);

app.use((err, request, response, next) => {
  response.status(400).json(err);
});

module.exports = app;
