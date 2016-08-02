const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const connection = require('../lib/setup-mongoose');

const app = require('../lib/app');

describe('Movies API', () => {

  const req = chai.request(app);

  const testMovie = {title: 'A Few Good Men', year: '1990-06-06', category: 'Drama', gross: 4000000};
  const testMovie2 = {title: 'Test Movie', 'year': '1986-05-05', category: 'Adventure', gross: 3000000};

  const testActor = {name: 'Bill Murray', DOB: '1950-05-05', movies: []};
  const testActor2 = {name: 'Meryl Streep', DOB: '1955-05-05', movies: []};

  let token = '';

  before(done => {
    req.post('/auth/signup')
      .send({username: 'a', password: 'abc123'})
      .then(res => assert.ok(token = res.body.token))
      .then(done, done).catch(done);
  });

  it('serves up homepage', (done) => {
    req.get('/')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.have.string('Simple Movie Storage');
        done();
      })
      .catch(done);
  });

  it('POSTS a movie', (done) => {
    req.post('/movies')
      .set({token})
      .send(testMovie)
      .then((res) => {
        assert.ok(res.body._id);
        testMovie._id = res.body._id;
        testMovie.actors = [];
        testMovie.awards = [];
        testMovie.votes = [];
        testMovie.year = res.body.year;
        done();
      })
      .catch(done);
  });

  it('aggregates gross of movies in storage', (done) => {
    req.get('/movies/gross')
      .set({token})
      .then(res => {
        assert.deepEqual(res.body, {grossTotal: 4000000});
        done();
      })
      .catch(done);
  });

  it('GETS one movie', (done) => {
    req.get(`/movies/${testMovie._id}`)
      .set({token})
      .then((res) => {
        assert.deepEqual(res.body, testMovie);
        done();
      })
      .catch(done);
  });

  it('GETS all after a post', (done) => {
    req.get('/movies')
      .set({token})
      .then((res) => {
        assert.deepEqual(res.body, [testMovie]);
        done();
      })
      .catch(done);
  });

  it('replaces one movie with PUT', (done) => {
    req.put(`/movies/${testMovie._id}`)
      .set({token})
      .send(testMovie2)
      .then((res) => {
        testMovie2._id = res.body._id;
        testMovie2.actors = [];
        testMovie2.awards = [];
        testMovie2.votes = [];
        testMovie2.year = res.body.year;
        assert.deepEqual(res.body, testMovie2);
        done();
      }).catch(done);
  });

  it('POSTS an actor', (done) => {
    req.post('/actors')
      .set({token})
      .send(testActor)
      .then((res) => {
        assert.ok(res.body._id);
        testActor._id = res.body._id;
        testActor.movies = res.body.movies;
        testActor.awards = [];
        testActor.age = res.body.age;
        done();
      })
      .catch(done);
  });

  it('adds a movie reference to an actor', (done) => {
    req.put(`/actors/${testActor._id}/movies/${testMovie._id}`)
      .set({token})
      .then((res) => {
        assert.ok(res.body.movies.length > 0);
        done();
      })
      .catch(done);
  });

  it('also adds actor reference to a movie', (done) => {
    req.get(`/movies/${testMovie._id}`)
      .set({token})
      .then((res) => {
        assert.ok(res.body.actors.length > 0);
        done();
      })
      .catch(done);
  });

  it('DELETES a movie', (done) => {
    req.delete(`/movies/${testMovie2._id}`)
      .set({token})
      .then((res) => {
        assert.deepEqual(res.body, { ok: 1, n: 1 });
        done();
      })
      .catch(done);
  });

  it('removes reference to the movie in actors movie array after movie is deleted', (done) => {
    req.get(`/actors/${testActor._id}`)
      .set({token})
      .then((res) => {
        assert.ok(res.body.movies.length == 0);
        done();
      })
      .catch(done);
  });

  it('404s on bad route', (done) => {
    req.get('/movies/failing/wrong')
      .set({token})
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('404s on unsupported HTTP verb', (done) => {
    req.patch('/movies')
    .set({token})
    .end((err, res) => {
      expect(res).to.have.status(404);
      done();
    });
  });

//actor tests below

  it('aggregates number of movies all actors have appeared in', (done) => {
    req.get('/actors/totalMovies')
      .set({token})
      .then(res => {
        assert.deepEqual(res.body, {totalMovies: 0});
        done();
      })
      .catch(done);
  });

  it('GETS one actor', (done) => {
    req.get(`/actors/${testActor._id}`)
      .set({token})
      .then((res) => {
        assert.ok(res.body);
        done();
      })
      .catch(done);
  });

  it('GETS all after a post', (done) => {
    req.get('/actors')
      .set({token})
      .then((res) => {
        assert.ok(res.body);
        done();
      })
      .catch(done);
  });

  it('replaces one actor with PUT', (done) => {
    req.put(`/actors/${testActor._id}`)
      .set({token})
      .send(testActor2)
      .then((res) => {
        testActor2._id = res.body._id;
        testActor2.movies = [];
        testActor2.awards = [];
        testActor2.age = res.body.age;
        res.body.DOB = testActor2.DOB;
        assert.deepEqual(res.body, testActor2);
        done();
      }).catch(done);
  });

  it('DELETES an actor', (done) => {
    req.delete(`/actors/${testActor2._id}`)
      .set({token})
      .then((res) => {
        assert.deepEqual(res.body, { ok: 1, n: 1 });
        done();
      })
      .catch(done);
  });

  after((done) => {
    console.log('dropping db');
    connection.db.dropDatabase();
    console.log('connection closed');
    connection.close(done);
  });

});
