const express = require('express');
// const path = require('path');
const app = module.exports = express();
const router = require('./router');
// const db = require('./database');
// const html = require('./index');

// app.use(express.static(__dirname + '/../data'));
// app.use(express.static(__dirname + '/../'));  // points back to root

app.use('/api', router);

app.use((err, request, response) => {
  response.status(400).json(err);
  // next(err);
});

module.exports = app;
