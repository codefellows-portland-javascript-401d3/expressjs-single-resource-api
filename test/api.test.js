const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('chai').assert;
chai.use(chaiHttp);

const connection = require('../lib/setup-mongoose');
const app = require('../lib/app');


describe('api e2e', ()=>{

  before(done => {

    const name = 'notes';
    connection.on('open', () => {
      connection.db
      .listCollections({ name })
      .next( (err, collinfo) => {
        if (!collinfo) return done();
        connection.db.dropCollection(name, done);
      });
    });
  });

  const request = chai.request(app);

  describe('note api', ()=>{
    const note1 = {
      title: 'note1',
      body: 'note 1 body',
      important: true
    };


    it('adds note1', done=>{
      request.post('/api/notes')
        .send(note1)
        .then(res =>{
          const note = res.body;
          assert.ok(note._id);
          note1.__v = 0;
          note1._id = note._id;
          done();
        })
        .catch(done);
    });

    it('gets all notes', done=>{
      request.get('/api/notes')
        .then(res => {
          //can't guess the id Mongo will assign
          //making sure note1 contents are in the response body
          assert.include(res.body, note1);
          done();
        })
        .catch(done);
    });

    it('gets note 1 by id', done=>{
      request.get(`/api/notes/${note1._id}`)
        .then(res =>{
          const note = res.body;
          assert.deepEqual(note, note1);
          done();
        })
        .catch(done);
    });

    const update = { title: 'New Note 1', body: 'stuff', important: false };

    it('updates note 1', done=>{
      request.put(`/api/notes/${note1._id}`)
        .send(update)
        .then(res =>{
          assert.equal(res.body, 'Note updated');
          done();
        })
        .catch(done);
    });

    it('deletes note 1', done=>{
      request.delete(`/api/notes/${note1._id}`)
        .then(res =>{
          assert.equal(res.body, 'Note deleted');
          done();
        })
        .catch(done);
    });
  });

  describe('user api', ()=>{

    it('test user test', done=>{
      assert(1, 1);
      done();
    });
    
  });

  after(done => connection.close(done));
});
