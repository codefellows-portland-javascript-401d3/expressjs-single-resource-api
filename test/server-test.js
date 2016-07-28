const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const chaiHttp = require('chai-http');
const server = require('../server');
chai.use(chaiHttp);

const connection = require('../lib/setup-mongoose');
const app = require('../lib/app');

describe('express routes and http verbs testing', () => {
  it('serves up homepage', (done) => {
    req.get('/')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.have.string('Simple Movie Storage');
        done();
      })
      .catch(done);
  });

  // before( done => {
  //   const name = 'movies';
  //   connection.on('open', () => {
  //     connection.db
  //     .listCollections({name})
  //     .next((err, info) => {
  //       if (!info) return done();
  //       connection.db.dropCollection(name, done);
  //     });
  //   });
  // });

  const req = chai.request(server);

  const testMovie = {title: 'A Few Good Men', year: '1990-06-06', category: 'Drama'};
  const testMovie2 = {title: 'Test Movie', 'year': '1986-05-05', category: 'Adventure'};

  it('POSTS a movie', (done) => {
    req.post('/movies')
      .send(testMovie)
      .then((res) => {
        assert.ok(res.body._id);
        testMovie.__v = 0;
        testMovie._id = res.body._id;
        console.log(testMovie._id);
        testMovie.actors = [];
        testMovie.awards = [];
        testMovie.year = res.body.year;
        done();
      })
      .catch(done);
  });

  it('GETS one movie', (done) => {
    req.get(`/movies/${testMovie._id}`)
      .then((res) => {
        assert.deepEqual(res.body, testMovie);
        done();
      })
      .catch(done);
  });

  it('GETS all after a post', (done) => {
    req.get('/movies')
      .then((res) => {
        assert.deepEqual(res.body, [testMovie]);
        done();
      })
      .catch(done);
  });

  it('replaces one movie with PUT', (done) => {
    req.put(`/movies/${testMovie._id}`)
      .send(testMovie2)
      .then((res) => {
        testMovie2.__v = 0;
        testMovie2._id = res.body._id;
        testMovie2.actors = [];
        testMovie2.awards = [];
        testMovie2.year = res.body.year;
        assert.deepEqual(res.body, testMovie2);
        done();
      }).catch(done);
  });

  it('DELETES a movie', (done) => {
    req.delete(`/movies/${testMovie2._id}`)
      .then((res) => {
        assert.deepEqual(res.body, { ok: 1, n: 1 });
        done();
      })
      .catch(done);
  });

  it('404s on bad route', (done) => {
    req.get('/movies/failing/wrong')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('404s on unsupported HTTP verb', (done) => {
    req.patch('/movies')
    .end((err, res) => {
      expect(res).to.have.status(404);
      done();
    });
  });

});
