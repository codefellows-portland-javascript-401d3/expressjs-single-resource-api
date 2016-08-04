const chai = require('chai');
const mongoose = require('mongoose');
const chaiHTTP = require('chai-http');
const assert = chai.assert;
chai.use(chaiHTTP);
if (!process.env.TRAVIS) require('dotenv').config();

//Starts up the db connection
const connection = require('../lib/mongoose-setup');
const app = require('../lib/server');

describe('API', () => {

  before(done => {
    const drop = () => connection.db.dropDatabase(done);
    if (connection.readyState === 1) drop();
    else connection.on('open', drop);
  });

  let aToken = '';
  let bToken = '';

  const request = chai.request(app);

  function badRequest(url, send, error, done) {
    request
      .post(url)
      .send(send)
      .then(res => done('status should not be 200'))
      .catch(res => {
        assert.equal(res.status, 400);
        assert.equal(res.response.body.error, error);
        done();
      })
      .catch(done);
  }

  describe('User Management and Authentication >', () => {

    describe('User Model >', () => {
      it('creates admin user', (done) => {
        request
          .post('/users/signup')
          .send(alexander = {name: 'Alexander Hemptlerest', password: 'Napoleon', admin: true})
          .then((res) => {
            assert.ok(aToken = res.body.token);
            // console.log(aToken + 'YELLING LOUDLY');
          })
          .then(done, done);
      });

      it('creates non-admin user', (done) => {
        request
          .post('/users/signup')
          .send({name: 'Brisby Hemptlerest', password: 'Waterloo', admin: false})
          .then((res) => {
            assert.ok(bToken = res.body.token);
            // console.log(bToken + 'YELLING LOUDLY');
          })
          .then(done, done);
      });

      it('signup requires name', (done) => {
        badRequest('/users/signup', {password: 'nonsense'}, 'Username and password must both be supplied.', done);
      });

      it('signup requires password', (done) => {
        badRequest('/users/signup', {name: 'nonsense'}, 'Username and password must both be supplied.', done);
      });

      // Passes, but produces weird behavior.
      it('can\'t reuse username', (done) => {
        badRequest('/users/signup', alexander, 'Username Alexander Hemptlerest in use.', done);
      });
    });

    describe('User Authentication >', () => {
      it('returns 400 on no token', (done) => {
        request
          .get('/books/')
          .then(res => done('Received status 200.'))
          .catch(res => {
            assert.equal(res.status, 400);
            assert.equal(res.response.body.error, 'No token passed.');
            done();
          })
          .catch(done);
      });

      it('returns 403 on bad token', (done) => {
        request
          .get('/books/')
          .set('x-access-token', 'poorly formed token')
          .then(res => done('Received status 200.'))
          .catch(res => {
            assert.equal(res.status, 403);
            assert.equal(res.response.body.error, 'Authentication failed. Token invalid.');
            done();
          })
          .catch(done);
      });

      it('valid token', (done) => {
        request
          .get('/books/')
          .set('x-access-token', aToken)
          .then(res => assert.ok(res.body))
          .then(done, done);
      });

      it('signin', done => {
        request
          .post('/users/signin')
          .send(alexander)
          .then(res => {
            // assert.equal(res.body.token, aToken)
            assert.equal(res.res.body.message, 'Token Issued!'); //Why doesn't the route for errors work?
          })
          .then(done, done);
      });

      it('signin requires username', done => {
        badRequest('/users/signin', {password: 'abc'}, 'Username and password must both be supplied.', done);
      });

      it('signin requires password', done => {
        badRequest('/users/signin', {name: 'abc'}, 'Username and password must both be supplied.', done);
      });

      //Does something weird.
      it('signin name/pass can\'t be invalid', done => {
        badRequest('/users/signin', {name: 'Feeb', password: 'abc'}, 'Username or password incorrect.', done);
      });
    });
  });

  let westBranch = {name: 'The West Branch' , books: []};

  describe('Building Model >', () => {
    it('get all', (done) => {
      request
      .get('/buildings/')
      .set('x-access-token', aToken)
      .then(res => assert.deepEqual(res.body, []))
      .then(done, done);
    });

    it('post new', (done) => {
      request
      .post('/buildings')
      .set('x-access-token', aToken)
      .send(westBranch)
      .then(res => {
        assert.ok(res.body._id);
        westBranch = res.body;
        done();
      })
      .catch(done);
    });

    it('get by id', (done) => {
      request
      .get(`/buildings/${westBranch._id}`)
      .set('x-access-token', aToken)
      .then(res => assert.deepEqual(res.body, westBranch))
      .then(done, done);
    });

    it('get all (non-empty)', (done) => {
      request
      .get('/buildings/')
      .set('x-access-token', aToken)
      .then(res => assert.deepEqual(res.body, [westBranch]))
      .then(done, done);
    });

    it('delete by id fails (if !admin)', (done) => {
      request
      .delete(`/buildings/${westBranch._id}`)
      .set('x-access-token', bToken)
      .then(res => done('Should not succeed'))
      .catch(res => {
        assert.equal(res.status, 403);
        assert.equal(res.response.body.error, 'User lacks admin permissions.');
        done();
      })
      .catch(done);
    });

    it('delete by id (if admin)', (done) => {
      request
      .delete(`/buildings/${westBranch._id}`)
      .set('x-access-token', aToken)
      .then(res => {
        assert.deepEqual(res.body, westBranch);
      })
      .then(done, done);
    });
  });

  let firstBook = {title: 'My First Book', author: 'Swelbert Gentry', pubYear: 1996, BuildingId: westBranch._id};

  describe('Book Model >', () => {
    it('get all', (done) => {
      request
      .get('/books')
      .set('x-access-token', aToken)
      .then(res => assert.deepEqual(res.body, []))
      .then(done, done);
    });

    it('post new', (done) => {
      request
      .post('/books')
      .set('x-access-token', aToken)
      .send(firstBook)
      .then(res => {
        assert.ok(res.body._id);
        firstBook = res.body;
        done();
      })
      .catch(done);
    });

    it('get by id', (done) => {
      request
      .get(`/books/${firstBook._id}`)
      .set('x-access-token', aToken)
      .then(res => {
        assert.deepEqual(res.body, firstBook);
        //This get populates the building/branch, so we need to update.
        firstBook = res.body;
      })
      .then(done, done);
    });

    it('get all (non-empty)', (done) => {
      request
      .get('/books/')
      .set('x-access-token', aToken)
      .then(res => assert.deepEqual(res.body, [firstBook]))
      .then(done, done);
    });

    it('delete by id fails (if !admin)', (done) => {
      request
      .delete(`/books/${firstBook._id}`)
      .set('x-access-token', bToken)
      .then(res => done('Should not succeed'))
      .catch(res => {
        assert.equal(res.status, 403);
        assert.equal(res.response.body.error, 'User lacks admin permissions.');
        done();
      })
      .catch(done);
    });

    it('delete by id (if admin)', (done) => {
      request
      .delete(`/books/${firstBook._id}`)
      .set('x-access-token', aToken)
      .then(res => {
        assert.deepEqual(res.body, firstBook);
      })
      .then(done, done);
    });
  });

  after('remove mongoose model', () => {
    delete mongoose.connection.models['User'];
    delete mongoose.connection.models['Book'];
    delete mongoose.connection.models['Building'];

    mongoose.connection.close();
  });
});

// it('test', (done) => {
//  done();
// });
