const express = require('express');
const app = module.exports = express();

const ensureAuth = require('./auth/ensureAuth')();
const ensureRole = require('./auth/ensureRole');

const notes = require('./routes/notes');
const authors = require('./routes/authors');
const auth = require('./routes/auth');
const admin = require('./routes/admin');

app.use('/api/auth', auth);
app.use('/api/admin', ensureAuth, ensureRole('admin'), admin);

app.use('/api/notes', ensureAuth, notes);
app.use('/api/authors', ensureAuth, authors);

// eslint-disable-next-line
app.use((error, req, res, next)=>{
  res.status(400).json(error);
});

module.exports = app;
