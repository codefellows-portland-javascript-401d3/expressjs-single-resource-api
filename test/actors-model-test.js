const Actor = require('../lib/models/actors-model');
const assert = require('chai').assert;
const mongoose = require('mongoose');
const dateParser = require('../lib/routes/date-parser')();

mongoose.Promise = global.Promise;

describe('actor', () => {
  it('requires a name', done => {
    const actor = {};
    function next () {
      console.log('next');
    }
    actor.body = new Actor({DOB: '1950-05-05', movies: []});
    actor.body.validate()
    .then(() => {
      done('why no error here?');
    })
    .catch(() => {
      done();
    });
  });

  it('requires DOB before current date', done => {
    const actor = {};
    function next () {
      console.log('next');
    }
    actor.body = new Actor({name: 'Bill Murray', DOB: '2017-05-05', movies: []});
    dateParser(actor, null, next);
    actor.body.validate()
    .then(() => {
      done('should have been an error here');
    })
    .catch(() => {
      done();
    });
  });

  it('adds age based on DOB', done => {
    const actor = {};
    function next () {
      console.log('next');
    }
    actor.body = new Actor({name: 'Bill Murray', DOB: '1950-05-05'});
    dateParser(actor, null, next);
    actor.body.validate()
    .then(() => {
      assert.equal(actor.body.age, 66);
      done();
    })
    .catch((err) => {
      done(err);
    });
  });

  it('defaults to true for active', done => {
    const actor = {};
    function next () {
      console.log('next');
    }
    actor.body = new Actor({name: 'Bill Murray', DOB: '1950-05-05'});
    dateParser(actor, null, next);
    actor.body.validate()
    .then(() => {
      assert.deepEqual(actor.body.active, true);
      done();
    })
    .catch((err) => {
      done(err);
    });
  });

});
