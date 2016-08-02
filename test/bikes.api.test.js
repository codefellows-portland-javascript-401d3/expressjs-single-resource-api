const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);
const mongoose = require('mongoose');
const connection = require('../lib/mongoose-setup');
const app = require('../lib/app');

describe(`bikes`, () => {

  before(done => {
    mongoose.connect('mongodb://localhost/user', () => {
      connection.db.dropDatabase( () => {
        done();
      });
    });
  });

  const request = chai.request(app);
  let sample2 = {};

  it(`gets all`, done => {
    request
      .get(`/bikes`)
      .then(res => {
        assert.deepEqual(res.body, []);
        assert.equal(res.status, 200);
        done();
      })
      .catch(done);
  });

  it(`adds bike to the db`, done => {
    request
      .post(`/bikes`)
      .send({make: `Pake`, model: `RumRunner`})
      .then(res => {
        const bike = res.body;
        sample2 = bike;
        assert.equal(res.status, 200);
        assert.equal(res.body.make, `Pake`);
        assert.equal(res.body.model, `RumRunner`);
        done();
      })
      .catch(done);
  });

  it(`it gets the number of bikes in the db`, done => {
    request
      .get(`/bikes/number`)
      .then(res => {
        assert.deepEqual(res.body, {msg: `1 total bikes saved`});
        done();
      })
      .catch(done);
  });

  it(`gets a user by id`, done => {
    request 
      .get(`/bikes/${sample2._id}`)
      .then(res => {
        let bike = res.body;
        assert.deepEqual(bike._id, sample2._id);
        assert.deepEqual(bike, sample2);
        done();
      })
      .catch(done);
  });

  it(`changes a bikes info name`, done => {
    request
      .put(`/bikes/${sample2._id}`)
      .send({make: `Specialized`, model: `RumRunner`})
      .then(res => {
        let bike = res.body;
        assert.deepEqual(bike.make, `Specialized`);
        assert.deepEqual(bike._id, sample2._id);
        assert.equal(bike.__v, 0);
        done();
      })
      .catch(done);
  });

  it(`delets a user by id`, done => {
    request
      .del(`/bikes/${sample2._id}`)
      .then(res => {
        let user = res.body;
        assert.equal(sample2._id, user._id);
        done();
      })
      .catch(done);
  });

});