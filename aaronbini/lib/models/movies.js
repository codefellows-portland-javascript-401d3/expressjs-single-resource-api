const Store = require('./data-store');

const Movies = new Store();

Movies.add({title: 'Ghost Busters', year: 1984})
  .then((movie) => {
  }).catch((err) => {
  });

module.exports = Movies;
