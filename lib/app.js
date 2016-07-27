const express = require('express');
const app = express();
const bodyparser = require('./bodyparser');

const userStore = require('./models/user');

// // Bonus points to implement
// const publicPath = path.resolve( __dirname, '../public' );
// app.use( express.static( publicPath ) );
// app.set( 'view engine', 'pug' );

// app.get('/', (req,res) => {
//   const indexHtml = path.resolve( __dirname, '../index.html' );
//   res.sendFile( indexHtml );
// });

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
app.get('/api/users', (req, res) => {
  userStore.getAll()
  .then( data => res.json(data) )
  .catch( err => res.status(500).send({error: err}) );
});

app.get('/api/users/:id', (req, res) => {
  userStore.get(req.params.id)
  .then( result => {
    if(result.msg === 'fail') throw `The id ${req.params.id} does not exist`;
    res.send(result);
  })
  .catch( err => res.status(500).json({error: err.msg}) );
});

app.post('/api/users', bodyparser, (req,res) => {
  userStore.add(req.body)
  .then( user => res.json(user) )
  .catch( err => res.status(500).send({error: err}) );
});

app.put('/api/users/:id', bodyparser, (req,res) => {
  let id = req.params.id;
  userStore.update(id, req.body)
  .then( user => res.json(user) )
  .catch( err => res.status(500).send({error: err}) );
});

app.delete('/api/users/:id', (req,res) => {
  let id = req.params.id;
  userStore.delete(id)
  .then( data => res.json(data) )
  .catch( err => res.status(500).send({error: err}) );
});

module.exports = app;
