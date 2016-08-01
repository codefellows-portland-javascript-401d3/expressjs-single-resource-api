const express = require('express');
const Store = require('./models/store');
const bodyParser = require('./body-parser')(true);
const app = express();
const books = require('./routes/books');
const buildings = require('./routes/buildings');

require('./mongoose-setup');

app.use('/api/buildings', buildings);
app.use('/api/books', books);

// Handle Errors
app.use((err, req, res, next) => {
  console.log('Error Handler Called');
  res.status(500);
  res.send({ error: err });
});

module.exports = app;
