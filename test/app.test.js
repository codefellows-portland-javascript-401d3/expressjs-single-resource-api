const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('chai').assert;
const app = require('../lib/app');
const data = require('../data');

chai.use(chaiHttp);

describe('app', ()=>{

  const request = chai.request(app);

  it('gets all notes', done=>{
    request.get('/api/notes')
      .end((error, response)=>{
        if(error)return done(error);
        assert.equal(response.text, JSON.stringify(data.notes));
        done();
      });
  });

  it('gets note 1', done=>{
    request.get('/api/notes/1')
      .end((error, response)=>{
        if(error)return done(error);
        assert.equal(response.text, JSON.stringify(data.notes[0]));
        done();
      });
  });

  it('errors on a note id that is not a number', done=>{
    request.get('/api/notes/foo')
      .end((error)=>{
        assert.equal(error.status, 400);
        done();
      });
  });

  it('errors on a note that does not exist', done=>{
    request.get('/api/notes/400')
      .end((error)=>{
        assert.equal(error.status, 400);
        done();
      });
  });

});
