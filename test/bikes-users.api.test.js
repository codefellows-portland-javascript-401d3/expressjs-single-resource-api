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
  let sample1 = {name: `Marcus`, password: `password`};
  let sample2 = {};
  let token = /eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9/;
  let returnedToken;
  let user;
  let bike;

  it(`tests signup for a user`, done => {
    request
      .post(`/auth/signup`)
      .send(sample1)
      .then(res => {
        returnedToken = res.body;
        assert.isObject(res.body);
        assert.match(returnedToken.token, token);
        done();
      })
      .catch(done);
  });

  it(`tests signing in for a user`, done => {
    request
      .post(`/auth/signin`)
      .send({name: `Marcus`, password: `password`})
      .then(res => {
        returnedToken = res.body;
        assert.isObject(res.body);
        assert.match(returnedToken.token, token);
        done();
      })
      .catch(done);
  });

  it(`adds user to the db`, done => {
    request
      .post(`/users`)
      .set(`token`, returnedToken.token)
      .send({name: `Arielle`, password: `password`})
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
      .set(`token`, returnedToken.token)
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
      .set(`token`, returnedToken.token)
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
      .set(`token`, returnedToken.token)
      .then(res => {
        let newUser = res.body;
        assert.deepEqual(newUser._id, user._id);
        assert.deepEqual(newUser.bikesId[0], undefined);
        done();
      })
      .catch(done);
  });

});