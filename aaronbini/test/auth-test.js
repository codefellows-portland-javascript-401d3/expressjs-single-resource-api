const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const connection = require('../lib/setup-mongoose');

const app = require('../lib/app');

describe('authentication testing', () => {
  const req = chai.request(app);

  describe('unauthorized', () => {

    it('400s with no token provided', done => {
      req
        .get('/movies')
        .then(res => done('why is this status 200? should have been 400'))
        .catch(res => {
          assert.equal(res.response.body.status, 400);
          assert.equal(res.response.body.error, 'No token provided.');
          done();
        })
        .catch(done);
    });

    it('403s with bad token', done => {
      req
        .get('/movies')
        .set('token', 'bad token')
        .then(res => done('why is this status 200? should have been 403'))
        .catch(res => {
          assert.equal(res.status, 403);
          assert.equal(res.response.body.error, 'invalid token');
          done();
        })
        .catch(done);
    });

  });

  const user1 = {
    username: 'Aaron',
    password: 'abc123',
    roles: ['admin']
  };

  const user2 = {
    username: 'Jeremy',
    password: 'abc123',
    roles: []
  };

  describe('user level management', () => {

    //function to re-use for testing bad requests
    //it errors with non-Error and passes if bad request reaches catch block
    function badRequest(url, send, error, done) {
      req
        .post(url)
        .send(send)
        .then(res => done('should be erroring here'))
        .catch(res => {
          assert.equal(res.status, 400);
          assert.equal(res.response.body.error, error);
          done();
        })
        .catch(done);
    }

    it('signup requires username', done => {
      badRequest('/auth/signup', {password: 'abc123'}, 'username and password must be supplied', done);
    });

    it('signup requires password', done => {
      badRequest('/auth/signup', {username: 'ellen'}, 'username and password must be supplied', done);
    });

    let token1 = '';
    let token2 = '';

    //this is breaking travis test
    it('adds user when proper info is sent', done => {
      req
        .post('/auth/signup')
        .send(user2)
        .then(res => {
          token2 = res.body.token;
          assert.ok(res.body.token);
        })
        .then(done, done);
    });

    it('errors if same username is used again for signup', done => {
      badRequest('/auth/signup', user2, 'username Jeremy already exists.', done);
    });

    it('allows signed up user to access API', done => {
      req
        .get('/movies')
        .set({token: token2})
        .then(res => assert.ok(res.body))
        .then(done, done);
    });

    it('does not allow non-user to access API', done => {
      req
        .get('/movies')
        .set({token: 'bad'})
        .then(res => done('should be an error'))
        .catch(res => {
          assert.equal(res.status, 403);
          assert.equal(res.response.body.error, 'invalid token');
          done();
        })
        .catch(done);

    });

    it('signs in user that has signed up', done => {
      req
        .post('/auth/signin')
        .send(user2)
        .then(res => assert.equal(res.body.token, token2))
        .then(done, done);
    });

    it('errors when username is not provided at signin', done => {
      badRequest('/auth/signin', {password: 'abc123'}, 'username and password must be supplied', done);
    });

    it('errors when password is not provided at signin', done => {
      badRequest('/auth/signin', {username: 'Jeremy'}, 'username and password must be supplied', done);
    });

    it('will not allow user that has not signed up to sign in', done => {
      badRequest('/auth/signin', {username: 'Bob', password: 'abc123'}, 'invalid username or password.', done);
    });

    it('adds admin user successfully', done => {
      req
        .post('/auth/signup')
        .send(user1)
        .then(res => {
          assert.ok(token1 = res.body.token);
        })
        .then(done, done);
    });

    //ensureRole testing

    it('will not allow non-admin user to hit user routes', done => {
      req
        .get('/users/all')
        .set({token: token2})
        .then(res => done('should be error'))
        .catch(res => {
          assert.equal(res.response.body.error, 'not authorized');
          assert.equal(res.status, 403);
          done();
        })
        .catch(done);

    });

    it('allows admin user to hit user routes', done => {
      req
        .get('/users/all')
        .set({token: token1})
        .then(res => {
          assert.equal(res.status, 200);
          done();
        })
        .catch(done);
    });

  });

  after((done) => {
    console.log('dropping db');
    connection.db.dropDatabase();
    done();
  });

});
