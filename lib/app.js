const express = require('express');
const app = express();
const path = require('path');
const errorHandler = require('./routes/errorHandler');
const notFound = require('./routes/notFound');
const movieRoutes = require('./routes/movie-routes');

app.set('view engine', 'pug');

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.get('/views', (req, res) => {
  res.render('test', {title: 'Jaded Pug', message: req.query.name});
});

app.use('/movies', movieRoutes);

app.use(errorHandler);
app.use(notFound);

module.exports = app;
