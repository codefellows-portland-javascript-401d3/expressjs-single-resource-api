const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const app = require('../lib/app');

chai.use(chaiHttp);

describe('this app\'s api', () => {

  const request = chai.request(app);

  let testUser = { name: 'test-user3', security: 'low' };
  let testUser2 = { name: 'test-user4', security: 'low' };

  it('returns 404 for bad path', done => {
    request
      .get('/badpath')
      .end((err, res) => {
        assert.ok(err);
        assert.equal(res.statusCode, 404);
        done();
      });
  });

  it('returns endpoint list on api root route', done => {
    request
      .get('/api')
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.statusCode, 200);
        assert.include(res.header['content-type'], 'application/json');
        assert.include(res.text, 'GET /api/users');
        done();
      });
  });

  describe('/POST method saves data', () => {

    it('/POST method completes successfully', done => {
      request
        .post('/api/users')
        .send(testUser)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.statusCode, 200);
          assert.include(res.header['content-type'], 'application/json');
          let result = JSON.parse(res.text);
          testUser.id = result.id; // the only change to the data
          assert.equal(result.name, testUser.name);
          done();
        });
    });

    it('/GET on user id returns user data', done => {
      request
        .get(`/api/users/${testUser.id}`)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.statusCode, 200);
          assert.include(res.header['content-type'], 'application/json');
          let result = JSON.parse(res.text);
          assert.deepEqual(result, testUser);
          testUser = result;
          done();
        });
    });

  });

  describe('/PUT method updates data already in storage', () => {

    it('/PUT method completes successfully', done => {
      testUser.name = 'test-put';
      request
        .put(`/api/users/${testUser.id}`)
        .send(testUser)
        .end((err, res) => {
          if (err) return done(err);
          let result = JSON.parse(res.text);
          assert.equal(res.statusCode, 200);
          assert.include(res.header['content-type'], 'application/json');
          assert.equal(result.name, testUser.name);
          done();
        });
    });

    it('/GET on recently updated user returns correct changes', done => {
      request
        .get(`/api/users/${testUser.id}`)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.statusCode, 200);
          assert.include(res.header['content-type'], 'application/json');
          let result = JSON.parse(res.text);
          assert.equal(result.name, testUser.name, res.text);
          done();
        });
    });

  });

  describe('/DELETE method removes data permenently', () => {

    it('/DELETE method removes user', done => {
      request
        .delete(`/api/users/${testUser.id}`)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.statusCode, 200);
          assert.include(res.header['content-type'], 'application/json');
          let result = JSON.parse(res.text);
          assert.deepEqual(result, testUser);
          done();
        });
    });

    it('/GET on recently deleted user returns fail status', done => {
      request
        .get(`/api/users/${testUser.id}`)
        .end((err, res) => {
          // error is intended
          assert.equal(res.statusCode, 500);
          done();
        });
    });

  });

  describe('/GET on root returns list', () => {

    before( done => {
      request
        .post('/api/users')
        .send(testUser)
        .end((err, res) => {
          if (err) return done(err);
          let result = JSON.parse(res.text);
          testUser = result;
          request
            .post('/api/users')
            .send(testUser2)
            .end((err, res) => {
              if (err) return done(err);
              let result = JSON.parse(res.text);
              testUser2 = result;
              done();
            });
        });
    });

    it('/GET on root route returns all', done => {
      request
        .get('/api/users')
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.statusCode, 200);
          assert.include(res.header['content-type'], 'application/json');
          let result = JSON.parse(res.text);
          assert.isAbove(result.length, 1);
          done();
        });
    });
  });

  // cleanup
  after( done => {
    request
      .delete(`/api/users/${testUser.id}`)
      .end( err => {
        if (err) done(err);
        request
          .delete(`/api/users/${testUser2.id}`)
          .end( err => {
            if (err) done(err);
            done();
          });
      });
  });

});
