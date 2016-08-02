const express = require('express');
const app = module.exports = express();
const notes = require('./routes/notes');
const authors = require('./routes/authors');
const auth = require('./routes/auth');

app.use('/api/auth', auth);
app.use('/api/notes', notes);
app.use('/api/authors', authors);

// eslint-disable-next-line
app.use((error, req, res, next)=>{
  res.status(400).json(error);
});

module.exports = app;
