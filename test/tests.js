const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const app = require('../lib/server');

chai.use(chaiHttp);

describe('HTTP server api', function() {

  const request = chai.request(app);
  //
  // it('is able to create books', function(done) {
  //   request
  //   .post('/api/books')
  //   .send({title: 'Crowds and Power', author: 'Elias Carnetti', pubYear: 1984})
  //   .end((err) => {
  //     if (err) return done(err);
  //     request
  //     .post('/api/books')
  //     .send({title: 'The True Believer', author: 'Eric Hoffer', pubYear: 2010})
  //     .end((err, res) => {
  //       if (err) return done(err);
  //       assert.deepEqual(JSON.parse(res.text), {id:2,data:{data:'barfoobaz'}});
  //       done();
  //     });
  //   });
  // });
  //
  // it('is able to get all records', function(done) {
  //   request
  //   .get('/')
  //   .end((err, res) => {
  //     if (err) return done(err);
  //     // console.log(JSON.parse(res.text));
  //     assert.deepEqual(JSON.parse(res.text), [ { id: 1, data: { data: 'foobarbaz' } }, { id: 2, data: { data:'barfoobaz' } } ]);
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
  //     assert.deepEqual(JSON.parse(res.text), { id: 2, data: { data:'barfoobaz' } });
  //     done();
  //   });
  // });
  //
  // it('is able to update a record', function(done) {
  //   request
  //   .put('/api/1/')
  //   .send({data: 'kerfuffle'})
  //   .end((err, res) => {
  //     if (err) return done(err);
  //     assert.deepEqual(JSON.parse(res.text), { id: 1, data: {data: 'kerfuffle' }});
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
  //     assert.deepEqual(JSON.parse(res.text), [{'id':2, data: { data: 'barfoobaz'}}]);
  //     done();
  //   });
  // });

  describe('handler unit tests', function() {
    //Is there a way to do this test more directly on bodyParser. I couldn't figure out a method except building a Dummy Event Emitter.
    it('bodyParser parses JSON', () => {
      request
      .post('/api/')
      .send({foo: 'bar'})
      .end((err, res) => {
        assert.deepEqual(JSON.parse(res.text), [{'id':3, data: { foo: 'bar'}}]);
        done();
      });
    });

    it('errorhandler fires on junk requests', (done) => {
      request
      .get('/nonsense')
      .end((err, res) => {
        // console.log(res.body);
        // console.log(err);
        console.log(res.status);
        // console.log('What Happened: ', err);
        done();
      });
    });
  });
});
