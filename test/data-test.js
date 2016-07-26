const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const DataStore = require('../lib/models/data-store');

const store = new DataStore();

describe('data storage module', () => {

  it('gets all stored items', (done) => {
    store.getAll()
      .then((movies) => {
        assert.deepEqual('Movies successfully retrieved.', movies.message);
        done();
      }).catch(err => console.log(err));
  });

  it('gets one stored item', (done) => {
    store.getOne(0)
      .then((movie) => {
        assert.deepEqual('Movie successfully retrieved.', movie.message);
        done();
      }).catch(err => console.log(err));
  });

  it('errors when the GET request yields no item', (done) => {
    store.getOne(1)
      .then(movie => movie)
      .catch((err) => {
        assert.deepEqual('Movie not found.', err.message);
        done();
      });
  });

  it('adds a new item', (done) => {
    store.addMovie({title: 'The Godfather', year: 1973})
      .then((movie) => {
        assert.isOk(store.movies.length === 2);
        assert.deepEqual('Movie successfully added.', movie.message);
        done();
      }).catch(err => console.log(err));
  });

  it('replaces an item with a new item', (done) => {
    store.changeMovie(1, {title: 'The Catfather', year: 2016})
      .then((movie) => {
        assert.isOk(store.movies.length === 2);
        assert.deepEqual('Movie successfully updated.', movie.message);
        done();
      });
  });

  it('errors when the PUT request item to replace is not found', (done) => {
    store.changeMovie(5, {title: 'Raising Arizona', year: 1987})
      .then(movie => movie)
      .catch((err) => {
        assert.deepEqual('Movie not found.', err.message);
        done();
      });
  });

  it('deletes an item', (done) => {
    store.deleteMovie(2)
      .then((movie) => {
        assert.isOk(store.movies.length === 2);
        assert.deepEqual('Movie successfully deleted.', movie.message);
        done();
      });
  });

  it('errors when the DELETE request item to be deleted is not found', (done) => {
    store.deleteMovie(7)
      .then(movie => movie)
      .catch((err) => {
        assert.deepEqual('Movie not found.', err.message);
        done();
      });
  });

});
