const Actor = require('../lib/models/actors-model');
const assert = require('chai').assert;
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

describe('actor', () => {
  it('requires a name', done => {
    const actor = new Actor({DOB: '1950-05-05', age: 66, movies: ['test1', 'test2', 'test3']});
    actor.validate(err => {
      if (!err) done('why no error here?');
      else done();
    });
  });

  it('requires DOB before current date', done => {
    const actor = new Actor({name: 'Bill Murray', age: 66, DOB: '2017-05-05', movies: ['test1', 'test2', 'test3']});
    actor.validate(err => {
      if (!err) done('should have been an error here');
      else done();
    });
  });

  it('defaults to true for color', done => {
    const actor = new Actor({name: 'Bill Murray', age: 66, DOB: '1950-05-05', movies: ['test1', 'test2', 'test3']});
    actor.validate(() => {
      assert.equal(actor.active, true);
      done();
    });
  });
});
