const express = require('express');
const app = express();
const path = require('path');

const errorHandler = require('./errorHandler');
const notFound = require('./notFound');

const ensureAuth = require('./auth/ensureAuth')();
const ensureRole = require('./auth/ensureRole');

const authenticate = require('./routes/auth-routes');
const movieRoutes = require('./routes/movie-routes');
const actorRoutes = require('./routes/actor-routes');
const me = require('./routes/me-routes');
const users = require('./routes/user-routes');

app.set('view engine', 'pug');

const publicPath = path.resolve(__dirname, '../public');

app.use(express.static(publicPath));

app.get('/views', (req, res) => {
  res.render('test', {title: 'Jaded Pug', message: req.query.name});
});

app.use('/auth', authenticate);

app.use('/movies', ensureAuth, movieRoutes);

app.use('/actors', ensureAuth, actorRoutes);

app.use('/users', ensureAuth, me);

app.use('/users', ensureAuth, ensureRole('admin'), users);

app.use(errorHandler);

app.use(notFound);

module.exports = app;
