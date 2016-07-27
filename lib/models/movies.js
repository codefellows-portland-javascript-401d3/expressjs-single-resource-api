const Store = require('./data-store');

const Movies = new Store();

Movies.add({title: 'Ghost Busters', year: 1984})
  .then((movie) => {
    console.log(movie.message);
  }).catch((err) => {
    console.log(err.message);
  });

module.exports = Movies;
