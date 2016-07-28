const errorhandler = require('./errorhandler');
const express = require('express');
const app = express();
const bodyparser = require('./bodyparser');
const User = require('./models/user');

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

app.get('/api/users', (req,res,next) => {
  User.find()
  .then( data => res.send(data) )
  .catch( next );
});

app.get('/api/users/:id', (req,res,next) => {
  User.findById(req.params.id)
  .then( user => res.send(user) )
  .catch( next );
});

app.post('/api/users', bodyparser, (req,res,next) => {
  new User(req.body).save()
  .then( user => res.send(user) )
  .catch( next );
});

app.put('/api/users/:id', bodyparser, (req,res,next) => {
  User.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then( user => res.send(user) )
  .catch( next );
});

app.delete('/api/users/:id', (req,res,next) => {
  User.findByIdAndRemove(req.params.id)
  .then( data => res.send(data) )
  .catch( next );
});

app.use(errorhandler);

module.exports = app;
