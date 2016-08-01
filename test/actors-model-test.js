const Actor = require('../lib/models/actors-model');
const assert = require('chai').assert;
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//replica dateParser for testing
function dateParser (obj) {
  const today = new Date();
  const birthDate = new Date(obj.DOB);
  const age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  obj.age = age;
};

describe('actor', () => {
  it('requires a name', done => {
    const actor = new Actor({DOB: '1950-05-05', movies: []});
    actor.validate()
    .then(() => {
      done('why no error here?');
    })
    .catch(() => {
      done();
    });
  });

  it('requires DOB before current date', done => {
    const actor = new Actor({name: 'Bill Murray', DOB: '2017-05-05', movies: []});
    actor.validate()
    .then(() => {
      done('should have been an error here');
    })
    .catch(() => {
      done();
    });
  });

  it('adds age based on DOB', done => {
    const actor = new Actor({name: 'Bill Murray', DOB: '1950-05-05', movies: []});
    dateParser(actor);
    actor.validate()
    .then(() => {
      assert.equal(actor.age, 66);
      done();
    })
    .catch(() => {
      done('should not get here.');
    });
  });

  //need to come back to this one

  // it('defaults to true for active', done => {
  //   const actor = new Actor({name: 'Bill Murray', DOB: '1950-05-05', movies: []});
  //   actor.validate()
  //   .then(() => {
  //     console.log(actor.active);
  //     assert.equal(actor.active, true);
  //     done();
  //   })
  //   .catch(() => {
  //     done('should not get here');
  //   });
  // });

});
