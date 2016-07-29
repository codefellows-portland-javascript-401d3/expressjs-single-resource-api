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

  const sample = "name: Arielle";
  let sample2 = {};

  it(`gets all`, done => {
    request
      .get(`/notes`)
      .then(res => {
        assert.deepEqual(res.body, []);
        done();
      })
      .catch(done);
  });


  it(`adds user to the db`, done => {
    request
      .post(`/notes`)
      .send(`name: Arielle`)
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
      .get(`/notes/${sample2._id}`)
      .then(res => {
        let user = res.body;
        assert.deepEqual(user._id, sample2._id);
        done();
      })
      .catch(done);
  });

  it(`changes a user's name`, done => {
    request
      .put(`/notes/${sample2._id}`)
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
      .del(`/notes/${sample2._id}`)
      .then(res => {
        let user = res.body;
        assert.equal(sample2._id, user._id);
        done();
      })
      .catch(done);
  });


});