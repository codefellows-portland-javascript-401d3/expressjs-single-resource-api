const chai = require( 'chai' );
const chaiHttp = require( 'chai-http' );
const assert = chai.assert;
chai.use( chaiHttp );
const mongoose = require('mongoose');
const connection = require( '../lib/mongoose-setup' );
const app = require( '../lib/app' );

describe(`users`, () => {

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

  it(`gets all`, done => {
    request
      .get(`/users`)
      .set(`token`, returnedToken.token)
      .then(res => {
        assert.deepEqual(res.body.length, 1);
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
        const user = res.body;
        assert.equal(res.status, 200);
        assert.ok(user._id);
        sample2 = user;
        done();
      })
      .catch(done);
  });

  it(`gets a user by id`, done => {
    request 
      .get(`/users/${sample2._id}`)
      .set(`token`, returnedToken.token)
      .then(res => {
        let user = res.body;
        assert.deepEqual(user._id, sample2._id);
        done();
      })
      .catch(done);
  });

  it(`changes a user's name`, done => {
    request
      .put(`/users/${sample2._id}`)
      .set(`token`, returnedToken.token)
      .send(`name: Brian`)
      .then(res => {
        let user = res.body;
        assert.deepEqual(user._id, sample2._id);
        assert.deepEqual(user.__v, 0);
        done();
      })
      .catch(done);
  });

  it(`delets a user by id`, done => {
    request
      .del(`/users/${sample2._id}`)
      .set(`token`, returnedToken.token)
      .then(res => {
        let user = res.body;
        assert.equal(sample2._id, user._id);
        done();
      })
      .catch(done);
  });


});