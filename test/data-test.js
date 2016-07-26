const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const DataStore = require('../lib/models/data-store');

const store = new DataStore();

describe('data storage module', () => {

  it('gets all stored items', (done) => {
    store.getAll().then((movies) => {
      assert.deepEqual('Movies successfully retrieved.', movies.message);
      done();
    });
  });

  it('gets one stored item', (done) => {
    store.getOne('Ghost Busters').then((movie) => {
      assert.deepEqual('Movie successfully retrieved.', movie.message);
      done();
    });
  });

  it('errors when the GET request yields no item', (done) => {
    store.movies.splice(0,1);
    store.getOne({title: 'Ghost Busters'}).catch((err) => {
      assert.isOk(store.movies.length === 0);
      assert.deepEqual('Sorry that movie is not in the database.', err.message);
      done();
    });
  });

  it('adds a new item', (done) => {
    store.addMovie({title: 'The Godfather', year: 1973}).then((movie) => {
      assert.isOk(store.movies.length === 1);
      assert.deepEqual('Movie successfully added.', movie.message);
      done();
    });
  });

  it('errors when user tries to add item already in database', (done) => {
    store.addMovie({title: 'The Godfather', year: 1973}).catch((err) => {
      assert.deepEqual('That movie is already in the database.', err.message);
      done();
    });
  });

  it('replaces an item with a new item', (done) => {
    store.changeMovie('The Godfather', {title: 'The Catfather', year: 2016})
      .then((movie) => {
        assert.isOk(store.movies.length === 1);
        assert.deepEqual('Movie successfully updated.', movie.message);
        done();
      }).catch((err) => {
        console.log(err);
      });
  });

  it('errors when the PUT request item to replace is not found', (done) => {
    store.changeMovie('The Godfather', {title: 'Raising Arizona', year: 1987}).catch((err) => {
      assert.deepEqual('Movie not found.', err.message);
      done();
    });
  });

  it('deletes an item', (done) => {
    store.deleteMovie('The Catfather').then((movie) => {
      assert.isOk(store.movies.length === 0);
      assert.deepEqual('Movie successfully deleted.', movie.message);
      done();
    }).catch((err)=> {
      console.log(err);
    });
  });

  it('errors when the DELETE request item to be deleted is not found', (done) => {
    store.deleteMovie({title: 'The Catfather'}).catch((err) => {
      assert.deepEqual('Movie not found.', err.message);
      done();
    });
  });

});
