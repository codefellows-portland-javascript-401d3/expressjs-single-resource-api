const express = require('express');
const querystring = require('querystring'); //Is this currently necessary? Does Express cover this?
const app = express();

const Store = require('./store');

const myStore = new Store;

//Display all records on a homepage call.
app.get('/', (req, res) => {
  res.send('Hello World');
});

//If user POSTS to an ID with data, replace the existing record at that ID
app.post('/api/:id', (req, res) => {
  res.send('hello' + req.params.id);
  console.log(req.query.data);
});

//If user GETs an ID, display that record.
app.get('/api/:id', (req, res) => {

});



module.exports = app;
