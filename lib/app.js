const express = require('express');
const app = module.exports = express();
const books = require('./routes/books');
const authors = require('./routes/authors');
const methods = require('./routes/methods');
const ratings = require('./routes/ratings');

// app.use('/auth');
app.use('/api/books', books);
app.use('/api/authors', authors);
app.use('/api/methods', methods);
app.use('/api/ratings', ratings);

app.use((err, request, response, next) => {
  response.status(400).json(err);
});

module.exports = app;
