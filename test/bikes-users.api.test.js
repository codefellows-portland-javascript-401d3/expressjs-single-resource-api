const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);
const mongoose = require('mongoose');
const connection = require('../lib/mongoose-setup');
const app = require('../lib/app');

describe(`bikes-users`, () => {

  before(done => {
    mongoose.connect('mongodb://localhost/user', () => {
      connection.db.dropDatabase( () => {
        done();
      });
    });
  });

  const request = chai.request(app);
  let user;
  let bike;

  it(`adds user to the db`, done => {
    request
      .post(`/users`)
      .send({name: `Arielle`})
      .then(res => {
        user = res.body;
        assert.equal(res.status, 200);
        assert.ok(user._id);
        done();
      })
      .catch(done);
  });

  it(`adds bike to the db`, done => {
    request
      .post(`/bikes`)
      .send({make: `Pake`, model: `RumRunner`})
      .then(res => {
        bike = res.body;
        assert.equal(res.status, 200);
        assert.equal(res.body.make, `Pake`);
        assert.equal(res.body.model, `RumRunner`);
        done();
      })
      .catch(done);
  });

  it(`adds a bike to a user`, done => {
    request
      .put(`/users/${user._id}/bikes/${bike._id}`)
      .then(res => {
        let newUser = res.body;
        assert.deepEqual(newUser._id, user._id);
        assert.deepEqual(newUser.bikesId[0], bike._id);
        done();
      })
      .catch(done);
  });

  it(`deletes a bike to a user`, done => {
    request
      .delete(`/users/${user._id}/bikes/${bike._id}`)
      .then(res => {
        let newUser = res.body;
        assert.deepEqual(newUser._id, user._id);
        assert.deepEqual(newUser.bikesId[0], undefined);
        done();
      })
      .catch(done);
  });

  

});