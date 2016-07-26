const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const req = chai.request(server);

describe('express routes and http verbs testing', () => {
  it('serves up homepage', (done) => {
    req.get('/')
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.text).to.have.string('Simple Movie Storage');
        done();
      });
  });

  it('GETS all movies', (done) => {
    req.get('/movies')
      .end((err, res) => {
        if (err) return done(err);
        assert.deepEqual('application/json; charset=utf-8', res.headers['content-type']);
        expect(res).to.have.status(200);
        assert.deepEqual('{"message":"Movie successfully retrieved.","movies":[{"title":"Ghost Busters","year":1984,"id":0}]}', res.text);
        done();
      });
  });

  it('GETS one movie', (done) => {
    req.get('/movies/Ghost_Busters')
      .end((err, res) => {
        if (err) return done(err);
        assert.deepEqual('application/json; charset=utf-8', res.headers['content-type']);
        expect(res).to.have.status(200);
        assert.deepEqual('{"message":"Movie successfully retrieved.","movies":[{"title":"Ghost Busters","year":1984,"id":0}]}', res.text);
        done();
      });
  });

  it('POSTS a movie', (done) => {
    req.post('/movies')
      .send({title: 'A Few Good Men', year: 1990})
      .end((err, res) => {
        if (err) return done(err);
        assert.deepEqual('application/json; charset=utf-8', res.headers['content-type']);
        expect(res).to.have.status(200);
        expect(res.text).to.have.string('Movie successfully added.');
        done();
      });
  });

  it('replaces one movie with PUT', (done) => {
    req.put('/movies/A_Few_Good_Men')
      .send({title: 'Test Movie', 'year': 1986})
      .end((err, res) => {
        if (err) return done(err);
        assert.deepEqual('application/json; charset=utf-8', res.headers['content-type']);
        expect(res).to.have.status(200);
        expect(res.text).to.have.string('Movie successfully updated.');
        done();
      });
  });

  it('DELETES a movie', (done) => {
    req.delete('/movies/Test_Movie')
      .end((err, res) => {
        if (err) return done(err);
        assert.deepEqual('application/json; charset=utf-8', res.headers['content-type']);
        expect(res).to.have.status(200);
        expect(res.text).to.have.string('Movie successfully deleted.');
        done();
      });
  });

  it('404s on bad route', (done) => {
    req.get('/failing')
      .end(function (err, res) {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('404s on unsupported HTTP verb', (done) => {
    req.patch('/movies')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.text).to.have.string('Cannot PATCH /movies');
        done();
      });
  });

});
