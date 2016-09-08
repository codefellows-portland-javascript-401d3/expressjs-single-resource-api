const express = require(`express`);
const app = express();
const url = require(`url`);
const path = require(`path`);
const logger = require(`morgan`)(`dev`);

const users = require(`./routes/users`);
const bikes = require(`./routes/bikes`);
const auth = require(`./routes/auth`);

const validAuth = require(`./auth/valid-auth`);

app.use(logger);

app.use(`/auth`, auth);
app.use(`/users`, validAuth, users);
app.use(`/bikes`, validAuth, bikes);

app.get(`/`, (req, res, next) => {
  const indexHtml = path.resolve( __dirname + `/../public/index.html` );
  res.sendFile(indexHtml);
});

app.use((err, req, res, next) => {
  res.status(err.code || 500)
    .json({error: err.error || err.message || err});
});


module.exports = app;