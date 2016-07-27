const express = require('express');
const Store = require('./store');
const bodyParser = require('./body-parser')(true);
const store = new Store;
const app = express();
const content = '';

// app.use((req, res, next) => {
//   console.log('TEST');
// });

//Display all records on a homepage call.
app.get('/', (req, res, next) => {
  store.readAll()
  .then(result => res.send(result))
  .catch(next);
});

//If user GETs an ID, display that record.
app.get('/api/:id', (req, res, next) => {
  store.readId(req.params.id)
  .then(result => res.send(result))
  .catch(next);
});

//If user POSTs to api, create a new record and assign it an ID
app.post('/api/', bodyParser, (req, res, next) => {
  store.create(req.body)
  .then(result => res.send(result))
  .catch(next);
});

//If user PUTs to an ID with data, replace the existing record at that ID
app.put('/api/:id', bodyParser, (req, res, next) => {
  store.update(req.params.id, req.body)
  .then(result => res.send(result))
  .catch(next);
});

//If user DELETEs an ID, remove that record.
app.delete('/api/:id', (req, res, next) => {
  store.delete(req.params.id)
  .then(result => res.send(result))
  .catch(next);
});

// Handle Errors
app.use((err, req, res, next) => {
  console.log('Error Handler Called');
  res.status(500);
  res.send({ error: err });
});

module.exports = app;
