const Movie = require('../lib/models/movies-model');
const assert = require('chai').assert;
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

describe('movie', () => {
  it('requires a title', done => {
    const movie = new Movie({year: '1990-06-06', category: 'Drama', gross: 4000000});
    movie.validate().then(() => {
      done('why no error here?');
    }).catch((err) => {
      done();
    });
  });

  it('requires date in certain range', done => {
    const movie = new Movie({title: 'A Few Good Men', year: '1889-06-06', category: 'Drama', gross: 4000000});
    movie.validate().then(() => {
      done('why no error here?');
    }).catch(err => {
      done();
    });
  });

  it('defaults to true for color', done => {
    const movie = new Movie({title: 'A Few Good Men', year: '1990-06-06', category: 'Drama', gross: 4000000});
    movie.validate().then(() => {
      assert.equal(movie.color, true);
      done();
    }).catch((err) => {
      done(err);
    });
  });
});
