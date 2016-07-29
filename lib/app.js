const express = require('express');
const app = module.exports = express();
const notes = require('./routes/notes');
const users = require('./routes/users');

//routes
app.use('/api/notes', notes);
app.use('/api/users', users);

//error handling
app.use((error, req, res, next)=>{
  res.status(400).json(error);
});

module.exports = app;
