const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('chai').assert;
chai.use(chaiHttp);

const connection = require('../lib/setup-mongoose');
const app = require('../lib/app');


describe('api e2e', ()=>{

  before(done => {
    connection.on('open', () => {
      connection.db.dropDatabase(done);
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
          assert.deepEqual(res.body, note1);
          done();
        })
        .catch(done);
    });

    it('gets notes marked important', done=>{
      request.get('/api/notes?important=true')
        .then(res=>{
          assert.equal(res.body.length, 1);
          done();
        })
        .catch(done);
    });

    const update = {title: 'New Note 1', body: 'stuff', important: false};

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

    const user1 = {
      username: 'username_1',
      email: 'testUser@aol.com'
    };

    it('adds user 1', done=>{
      request.post('/api/users')
        .send(user1)
        .then(res =>{
          const user = res.body;
          assert.ok(user._id);
          user1.__v = 0;
          user1._id = user._id;
          done();
        })
        .catch(done);
    });

    it('gets all user profiles', done=>{
      request.get('/api/users')
        .then(res => {
          assert.include(res.body, user1);
          done();
        })
        .catch(done);
    });

    it('gets user 1 by id', done=>{
      request.get(`/api/users/${user1._id}`)
        .then(res =>{
          const user = res.body;
          assert.deepEqual(user, user1);
          done();
        })
        .catch(done);
    });

    const update = {username: 'newUser1', email: 'user1@gmail.com'};

    it('updates user 1', done=>{
      request.put(`/api/users/${user1._id}`)
        .send(update)
        .then(res =>{
          assert.equal(res.body, 'User profile updated');
          done();
        })
        .catch(done);
    });

    it('deletes user 1', done=>{
      request.delete(`/api/users/${user1._id}`)
        .then(res =>{
          assert.equal(res.body, 'User deleted');
          done();
        })
        .catch(done);
    });

  });

  after(done=> connection.close(done));
});
