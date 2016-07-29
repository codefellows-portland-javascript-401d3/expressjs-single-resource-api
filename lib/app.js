const express = require(`express`);
const people = require(`./routes/people`);
const bikes = require(`./routes/bikes`);
const url = require(`url`);
const path = require(`path`);


const app = express();


app.use(`/notes`, people);
app.use(`/bikes`, bikes);

app.get(`/`, (req, res, next) => {
  const indexHtml = path.resolve( __dirname + `/../public/index.html` );
  res.sendFile(indexHtml);
});

app.use((err, req, res, next) => {
  res.status(err.code || 500)
    .json({error: err.error || err.message || err});
});


module.exports = app;