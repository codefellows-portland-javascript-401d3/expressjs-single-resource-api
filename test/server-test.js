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
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.have.string('Simple Movie Storage');
        done();
      })
      .catch(done);
  });

  it('GETS all movies', (done) => {
    req.get('/movies')
      .then((res) => {
        assert.equal('application/json; charset=utf-8', res.headers['content-type']);
        expect(res).to.have.status(200);
        expect(res.text).to.have.string('Items successfully retrieved.');
        done();
      })
      .catch(done);
  });

  it('GETS one movie', (done) => {
    req.get('/movies/0')
      .then((res) => {
        assert.equal('application/json; charset=utf-8', res.headers['content-type']);
        expect(res).to.have.status(200);
        expect(res.text).to.have.string('Item successfully retrieved.');
        done();
      })
      .catch(done);
  });

  it('POSTS a movie', (done) => {
    req.post('/movies')
      .send({title: 'A Few Good Men', year: 1990})
      .then((res) => {
        assert.equal('application/json; charset=utf-8', res.headers['content-type']);
        expect(res).to.have.status(200);
        expect(res.text).to.have.string('Item successfully added.');
        done();
      })
      .catch(done);
  });

  it('replaces one movie with PUT', (done) => {
    req.put('/movies/1')
      .send({title: 'Test Movie', 'year': 1986})
      .then((res) => {
        assert.equal('application/json; charset=utf-8', res.headers['content-type']);
        expect(res).to.have.status(200);
        expect(res.text).to.have.string('Item successfully updated.');
        done();
      }).catch(done);
  });

  it('DELETES a movie', (done) => {
    req.delete('/movies/0')
      .then((res) => {
        assert.equal('application/json; charset=utf-8', res.headers['content-type']);
        expect(res).to.have.status(200);
        expect(res.text).to.have.string('Item successfully deleted.');
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
