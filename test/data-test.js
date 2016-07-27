const chai = require('chai');
const assert = chai.assert;
const DataStore = require('../lib/models/data-store');

const store = new DataStore();

describe('data storage module', () => {
  before((done) => {
    store.add({title: 'Ghost Busters', year: 1984})
    .then((movie) => {
      assert.isOk(store.items.length === 1);
      assert.equal('Item successfully added.', movie.message);
      done();
    }).catch(done);
  });

  it('gets all stored items', (done) => {
    store.getAll()
      .then((movies) => {
        assert.equal('Items successfully retrieved.', movies.message);
        done();
      }).catch(done);
  });

  it('gets one stored item', (done) => {
    store.getOne(0)
      .then((movie) => {
        assert.equal('Item successfully retrieved.', movie.message);
        done();
      }).catch(done);
  });

  it('errors when the GET request yields no item', (done) => {
    store.getOne(1)
      .then(movie => movie)
      .catch((err) => {
        assert.equal('Item not found.', err.message);
        done();
      });
  });

  it('adds a new item', (done) => {
    store.add({title: 'The Godfather', year: 1973})
      .then((movie) => {
        assert.isOk(store.items.length === 2);
        assert.equal('Item successfully added.', movie.message);
        done();
      }).catch(done);
  });

  it('replaces an item with a new item', (done) => {
    store.change(1, {title: 'The Catfather', year: 2016})
      .then((movie) => {
        assert.isOk(store.items.length === 2);
        assert.equal('Item successfully updated.', movie.message);
        done();
      });
  });

  it('errors when the PUT request item to replace is not found', (done) => {
    store.change(5, {title: 'Raising Arizona', year: 1987})
      .then(movie => movie)
      .catch((err) => {
        assert.equal('Item not found.', err.message);
        done();
      });
  });

  it('deletes an item', (done) => {
    store.delete(1)
      .then((movie) => {
        assert.isOk(store.items.length === 1);
        assert.equal('Item successfully deleted.', movie.message);
        done();
      }).catch(done);
  });

  it('errors when the DELETE request item to be deleted is not found', (done) => {
    store.delete(7)
      .then(movie => movie)
      .catch((err) => {
        assert.equal('Item not found.', err.message);
        done();
      });
  });

});
