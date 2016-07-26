const express = require('express');
const app = express();
const path = require('path');
const Movies = require('../lib/models/movies');


app.set('view engine', 'pug');

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.get('/views', (req, res) => {
  res.render('test', {title: 'Jaded Pug', message: req.query.name});
});

app.get('/movies', (req, res) => {
  Movies.getAll().then((movies) => {
    res.send(movies);
  }).catch((err) => {
    res.send(err);
  });
});

//helper function for removing underscores from req.params.title string
function removeUnderscores(str) {
  return str.replace(/_/g, ' ');
}

app.get('/movies/:title', (req, res) => {
  const title = removeUnderscores(req.params.title);
  Movies.getOne(title).then((movie) => {
    res.send(movie);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.get('movies/*', (req, res) => {
  res.status(404).send({message: 'Not Found.'});
});

app.post('/movies', (req, res) => {
  let body = '';
  req.on('data', d => body += d);
  req.on('end', () => {
    if (!body) {
      res.status(400).send({error: 'No data provided.'});
    } else {
      const movie = JSON.parse(body);
      Movies.addMovie(movie).then((saved) => {
        res.send(saved);
      }).catch((err) => {
        res.status(400).send(err);
      });
    }
  });
});

app.put('/movies/:title', (req, res) => {
  const title = removeUnderscores(req.params.title);
  let body = '';
  req.on('data', d => body += d);
  req.on('end', () => {
    if (!body) {
      res.status(400).send({error: 'No data provided.'});
    } else {
      const movie = JSON.parse(body);
      console.log(title);
      Movies.changeMovie(title, movie).then((changed) => {
        res.send(changed);
      }).catch((err) => {
        res.status(400).send(err);
      });
    }
  });
});

app.delete('/movies/:title', (req, res) => {
  const title = removeUnderscores(req.params.title);
  Movies.deleteMovie(title).then((movie) => {
    res.send(movie);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

module.exports = app;
