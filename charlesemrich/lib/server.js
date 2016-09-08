const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

//Models
const User = require('./models/user'); //Only /setup uses this atm.

//Routes
const users = require('./routes/users');
const books = require('./routes/books');
const buildings = require('./routes/buildings');

//Configure the server
require('./mongoose-setup');

//Use the body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//use morgan to log requests in the console
// app.use(morgan('dev'));

//Routing
app.use('/users', users);
app.use('/books', books);
app.use('/buildings', buildings);

//Create sample User
//Probably migrate this to user routes?
app.get('/setup', (req, res) => {
  var john = new User({
    name: 'John Smith',
    password: 'secret',
    admin: true
  });

  john.save()
  .then(() => {
    res.json({ success: true});
  })
  .catch((err) => {
    if (err) throw err;
  });
});

app.use((err, req, res, next) => {
  // console.log(err);
  res.status(err.status || 500).send({error: err.message || err});
});

module.exports = app;
