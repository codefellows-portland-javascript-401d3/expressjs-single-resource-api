const errorhandler = require('./errorhandler');
const express = require('express');
const app = express();
const bodyparser = require('./bodyparser');
const userStore = require('./models/user');

const endpoints = {
  userList: 'GET /api/users',
  specificUser: 'GET /api/users/:id',
  addUser: 'POST /api/users',
  updateUser: 'PUT /api/users/:id',
  removeUser: 'DELETE /api/users/:id'
};

app.get('/api', (req,res) => {
  res.json(endpoints);
});

// JSON request handler
app.get('/api/users', (req, res, next) => {
  userStore.getAll()
  .then( data => res.json(data) )
  .catch( next );
});

app.get('/api/users/:id', (req, res, next) => {
  userStore.get(req.params.id)
  .then( user => res.json(user) )
  .catch( next );
});

app.post('/api/users', bodyparser, (req,res, next) => {
  userStore.add(req.body)
  .then( user => res.json(user) )
  .catch( next );
});

app.put('/api/users/:id', bodyparser, (req,res, next) => {
  let id = req.params.id;
  userStore.update(id, req.body)
  .then( user => res.json(user) )
  .catch( next );
});

app.delete('/api/users/:id', (req,res, next) => {
  let id = req.params.id;
  userStore.delete(id)
  .then( data => res.json(data) )
  .catch( next );
});

app.use(errorhandler);

module.exports = app;
