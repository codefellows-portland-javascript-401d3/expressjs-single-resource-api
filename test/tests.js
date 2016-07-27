const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const app = require('../lib/server');

chai.use(chaiHttp);

describe('HTTP server api', function(done) {

  const request = chai.request(app);

  it('is able to create records', function(done) {
    request
    .post('/api/')
    .send({data: 'foobarbaz'})
    .end((err) => {
      if (err) return done(err);
      request
      .post('/api/')
      .send({data: 'barfoobaz'})
      .end((err, res) => {
        if (err) return done(err);
        assert.deepEqual(JSON.parse(res.text), {id:2,data:{data:'barfoobaz'}});
        done();
      });
    });
  });

  // it('is able to get all records', function(done) {
  //   request
  //   .get('/')
  //   .end((err, res) => {
  //     if (err) return done(err);
  //     assert.deepEqual(JSON.parse(res.text), [ { id: 1, data: 'foobarbaz' }, { id: 2, data: 'barfoobaz' } ]);
  //     done();
  //   });
  // });
  //
  // it('is able to get a specific record', function(done) {
  //   request
  //   .get('/api/2')
  //   .end((err, res) => {
  //     if (err) return done(err);
  //     // console.log((res));
  //     assert.deepEqual(JSON.parse(res.text), { id: 2, data: 'barfoobaz' });
  //     done();
  //   });
  // });
  //
  // it('is able to update a record', function(done) {
  //   request
  //   .put('/api/1/?data=kerfuffle')
  //   .end((err, res) => {
  //     if (err) return done(err);
  //     assert.deepEqual(JSON.parse(res.text), { id: 1, data: 'kerfuffle' });
  //     done();
  //   });
  // });
  //
  // it('is able to delete a record', function(done) {
  //   request
  //   .delete('/api/2')
  //   .end((err, res) => {
  //     if (err) return done(err);
  //     // console.log(res.text);
  //     assert.deepEqual(JSON.parse(res.text), [{'id':2, data:'barfoobaz'}]);
  //     done();
  //   });
  // });
});
