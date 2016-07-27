const express = require('express');
const Store = require('./store');
const bodyParser = require('./body-parser')(true);
const store = new Store;
const app = express();
const content = '';

//Display all records on a homepage call.
app.get('/', (req, res) => {
  res.send(store.readAll());
});

//If user GETs an ID, display that record.
app.get('/api/:id', (req, res) => {
  res.send(store.readId(req.params.id));
});

//If user POSTs to api, create a new record and assign it an ID
app.post('/api/', bodyParser, (req, res) => {
  res.send(store.create(req.body));
});

//If user PUTs to an ID with data, replace the existing record at that ID
app.put('/api/:id', bodyParser, (req, res) => {
  res.send(store.update(req.params.id, req.body));
});

//If user DELETEs an ID, remove that record.
app.delete('/api/:id', (req, res) => {
  res.send(store.delete(req.params.id));
});

//Handle Errors
app.use((err, req, res, next) => {
  res.status(500);
  res.render('error', { error: err });
});

module.exports = app;
