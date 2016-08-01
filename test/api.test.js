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
          //updating what's stored in note1
          note1.title = 'New Note 1';
          note1.body = 'stuff';
          note1.important = false;
          assert.include(res.body, note1);
          done();
        })
        .catch(done);
    });

    it('deletes note 1', done=>{
      request.delete(`/api/notes/${note1._id}`)
        .then(res =>{
          assert.include(res.body, note1);
          done();
        })
        .catch(done);
    });
  });

  describe('author api', ()=>{

    const author1 = {
      name: 'authorname_1',
      email: 'testAuthor@aol.com'
    };

    it('adds author 1', done=>{
      request.post('/api/authors')
        .send(author1)
        .then(res =>{
          const author = res.body;
          assert.ok(author._id);
          author1.__v = 0;
          author1._id = author._id;
          done();
        })
        .catch(done);
    });

    it('gets all author profiles', done=>{
      request.get('/api/authors')
        .then(res => {
          assert.include(res.body, author1);
          done();
        })
        .catch(done);
    });

    it('gets author 1 by id', done=>{
      request.get(`/api/authors/${author1._id}`)
        .then(res =>{
          const author = res.body;
          assert.deepEqual(author, author1);
          done();
        })
        .catch(done);
    });

    const update = {name: 'newAuthor1', email: 'author1@gmail.com'};

    it('updates author 1', done=>{
      request.put(`/api/authors/${author1._id}`)
        .send(update)
        .then(res =>{
          author1.name = 'newAuthor1';
          author1.email = 'author1@gmail.com';
          assert.include(res.body, author1);
          done();
        })
        .catch(done);
    });

    it('deletes author 1', done=>{
      request.delete(`/api/authors/${author1._id}`)
        .then(res =>{
          assert.include(res.body, author1);
          done();
        })
        .catch(done);
    });


  });

  describe('note/author relationship api', ()=>{
    //db is cleared out at this point, so adding more test data
    const note2 = {
      title: 'note2',
      body: 'note 2 body'
    };

    const author2 = {
      name: 'Author 2',
      email: 'email@testing.com'
    };

    it('adds note2', done=>{
      request.post('/api/notes')
        .send(note2)
        .then(res =>{
          const note = res.body;
          assert.ok(note._id);
          note2.__v = 0;
          note2._id = note._id;
          done();
        })
        .catch(done);
    });

    it('adds author2', done=>{
      request.post('/api/authors')
        .send(author2)
        .then(res =>{
          const author = res.body;
          assert.ok(author._id);
          author2.__v = 0;
          author2._id = author._id;
          done();
        })
        .catch(done);
    });

    it('author2 wrote note2', done=>{
      request.put(`/api/authors/${author2._id}/notes/${note2._id}`)
        .send()
        .then(res =>{
          note2.authorId = author2._id;
          note2.important = false;
          const note = res.body;
          assert.deepEqual(note, note2);
          done();
        })
        .catch(done);
    });

    it('gets count of how many notes author2 wrote', done=>{
      request.get(`/api/authors/${author2._id}/countNotes`)
      .then(res=>{
        assert.equal(res.body, 1);
        done();
      })
      .catch(done);
    });

    it('gets title and body of notes written by author2', done=>{
      request.get(`/api/authors/${author2._id}/notes`)
      .then(res=>{
        const note = res.body[0];
        assert.equal(note.title, note2.title);
        assert.equal(note.body, note2.body);
        done();
      })
      .catch(done);
    });

    it('removes author2 id from note2', done=>{
      request.delete(`/api/authors/null/notes/${note2._id}`)
        .then(res =>{
          delete note2['authorId'];
          const note = res.body;
          assert.equal(note.authorId, note2.authorId);
          done();
        })
        .catch(done);
    });

  });

  after(done=> connection.close(done));
});
