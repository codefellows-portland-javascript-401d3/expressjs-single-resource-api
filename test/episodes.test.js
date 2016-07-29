const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const app = require('../lib/app');
require( '../lib/mongoose-setup' );

chai.use(chaiHttp);

describe('episode endpoints', () => {

  const request = chai.request(app);

  let testEpisode = { title: 'test-episode2', length: 42 };
  let testEpisode1 = { title: 'test-episode3', length: 43 };
  let testEpisode2 = { title: 'test-episode4', length: 44 };
  let testBadEpisode = { title: '', length: 45 };

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
        assert.include(res.text, 'GET /api/episodes');
        done();
      });
  });

  it('/POST method completes successfully', done => {
    request
      .post('/api/episodes')
      .send(testEpisode1)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.statusCode, 200);
        assert.include(res.header['content-type'], 'application/json');
        let result = JSON.parse(res.text);
        assert.equal(result.title, testEpisode1.title);
        assert.equal(result.type, testEpisode1.type);
        testEpisode1 = result;
        done();
      });
  });

  it('/POST validates title property', done => {
    request
      .post('/api/episodes')
      .send(testBadEpisode)
      .end((err, res) => {
        if (!err) return done(res);
        assert.equal(res.statusCode, 400);
        assert.include(res.header['content-type'], 'application/json');
        let result = JSON.parse(res.text);
        assert.equal(result.type, testBadEpisode.type);
        done();
      });
  });

  it('/GET on episode id returns episode data', done => {
    request
      .get(`/api/episodes/${testEpisode1._id}`)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.statusCode, 200);
        assert.include(res.header['content-type'], 'application/json');
        let result = JSON.parse(res.text);
        assert.deepEqual(result, testEpisode1);
        done();
      });
  });    

  it('/POST method gives error with bad json in request', done => {
    request
      .post('/api/episodes')
      .send('{"invalid"}')
      .end( (err,res) => {
        if(err) {
          let error = JSON.parse(err.response.text);
          assert.equal(error.status, 400);
          assert.include(error.message, 'problem parsing');
          return done();
        } else {
          return done(res);
        }
      });
  });

  it('/PUT method completes successfully', done => {
    testEpisode.title = 'test-put';
    const putUrl = `/api/episodes/${testEpisode._id}`;
    request
      .put(putUrl)
      .send(testEpisode)
      .end((err, res) => {
        if (err) return done(err);
        let result = JSON.parse(res.text);
        assert.equal(res.statusCode, 200);
        assert.include(res.header['content-type'], 'application/json');
        assert.equal(result.title, testEpisode.title, JSON.stringify(result));
        done();
      });
  });

  it('/GET on recently updated episode returns correct changes', done => {
    request
      .get(`/api/episodes/${testEpisode._id}`)
      .end((err, res) => {

        if (err) return done(err);
        assert.equal(res.statusCode, 200);
        assert.include(res.header['content-type'], 'application/json');
        let result = JSON.parse(res.text);
        assert.equal(result.title, testEpisode.title, res.text);
        done();
      });
  });

  it('/DELETE method removes episode', done => {
    request
      .delete(`/api/episodes/${testEpisode._id}`)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.statusCode, 200);
        assert.include(res.header['content-type'], 'application/json');
        let result = JSON.parse(res.text);
        assert.deepEqual(result, testEpisode);
        done();
      });
  });

  it('/GET on recently deleted episode returns no data', done => {
    request
      .get(`/api/episodes/${testEpisode._id}`)
      .end((err, res) => {
        assert.equal(res.header['content-length'], 0);
        done();
      });
  });

  before( done => {
    request
      .post('/api/episodes')
      .send(testEpisode)
      .end((err, res) => {
        if (err) return done(err);
        let result = JSON.parse(res.text);
        testEpisode = result;
        request
          .post('/api/episodes')
          .send(testEpisode2)
          .end((err, res) => {
            if (err) return done(err);
            let result = JSON.parse(res.text);
            testEpisode2 = result;
            done();
          });
      });
  });

  //   it('/GET on root route returns all', done => {
  //     request
  //       .get('/api/episodes')
  //       .end((err, res) => {
  //         if (err) return done(err);
  //         assert.equal(res.statusCode, 200);
  //         assert.include(res.header['content-type'], 'application/json');
  //         let result = JSON.parse(res.text);
  //         assert.isAbove(result.length, 1);
  //         done();
  //       });
  //   });
  // });

  // cleanup
  after( done => {
    request
      .delete(`/api/episodes/${testEpisode._id}`)
      .end( err => {
        if (err) done(err);
        request
          .delete(`/api/episodes/${testEpisode2._id}`)
          .end( err => {
            if (err) done(err);
            done(); 
          });
      });
  });

});
