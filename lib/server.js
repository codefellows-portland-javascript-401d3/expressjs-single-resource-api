const express = require('express');
const Store = require('./store');
const bodyParser = require('./body-parser')(true);
const store = new Store;
const app = express();
const content = '';

//Display all records on a homepage call.
app.get('/', (req, res, next) => {
  res.send(store.readAll())
  // .catch(next);
});

//If user GETs an ID, display that record.
app.get('/api/:id', (req, res, next) => {
  res.send(store.readId(req.params.id))
  // .catch(next);
});

//If user POSTs to api, create a new record and assign it an ID
app.post('/api/', bodyParser, (req, res, next) => {
  res.send(store.create(req.body))
  // .catch(next);
});

//If user PUTs to an ID with data, replace the existing record at that ID
app.put('/api/:id', bodyParser, (req, res, next) => {
  res.send(store.update(req.params.id, req.body))
  // .catch(next);
});

//If user DELETEs an ID, remove that record.
app.delete('/api/:id', (req, res, next) => {
  res.send(store.delete(req.params.id))
  // .catch(next);
});

//Handle Errors
// app.use((err, req, res, next) => {
//   // console.log('Error Handler Called');
//   res.status(500);
//   res.send('error', { error: err });
// });

module.exports = app;
