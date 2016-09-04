const express = require('express');
const app = module.exports = express();

const books = require('./routes/books');
const authors = require('./routes/authors');
const methods = require('./routes/methods');
const ratings = require('./routes/ratings');
const booksByAuthor = require('./routes/books-authors');
const booksByMethod = require('./routes/books-methods');
const booksByRating = require('./routes/books-ratings');
const confirmAuth = require('./auth/confirmAuth')();
const confirmRole = require('./auth/confirmRole');
const auth = require('./routes/auth');
const admin = require('./routes/admin');

app.use('/api/auth', auth);
app.use('/api/admin', confirmAuth, confirmRole('admin'), admin);
app.use('/api/books', confirmAuth, books);
app.use('/api/authors', confirmAuth, authors);
app.use('/api/methods', confirmAuth, methods);
app.use('/api/ratings', confirmAuth, ratings);
app.use('/api/booksByAuthor', confirmAuth, booksByAuthor);
app.use('/api/booksByMethod', confirmAuth, booksByMethod);
app.use('/api/booksByRating', confirmAuth, booksByRating);

//eslint-disable-next-line
app.use((err, request, response, next) => {
  response.status(400).json(err);
});

module.exports = app;
