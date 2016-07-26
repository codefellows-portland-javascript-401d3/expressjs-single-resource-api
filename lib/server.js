const express = require('express');
const Store = require('./store');
const store = new Store;
// const querystring = require('querystring'); //Is this currently necessary? Does Express cover this?
const app = express();

//Display all records on a homepage call.
app.get('/', (req, res) => {
  res.send(store.readAll());
});

//If user GETs an ID, display that record.
app.get('/api/:id', (req, res) => {
  res.send(store.readId(req.params.id));
});

//If user POSTs to api, create a new record and assign it an ID
app.post('/api/', (req, res) => {
  res.send(store.create(req.query.data));
});

//If user PUTs to an ID with data, replace the existing record at that ID
app.put('/api/:id', (req, res) => {
  res.send(store.update(req.params.id, req.params.data));
});

//If user DELETEs an ID, remove that record.
app.delete('/api/:id', (req, res) => {
  res.send(store.delete(req.params.id));
});

module.exports = app;
