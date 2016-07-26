const db = require('../lib/db');
const books = require('../data').books;
const assert = require('chai').assert;

const category = 'books';
const id = '2';

function expectedError() {
  throw new Error(JSON.stringify('Resource not found'));
}

describe('database', ()=>{
  it('gets all books', done=>{
    db.fetchAll(category, (error, result)=>{
      if (error) return done(error);
      assert.equal(result.length, 4);
      done();
    });
  });

  it('gets book 2', done=>{
    db.fetchItem(category, id, (error, result)=>{
      if (error) return done(error);
      assert.deepEqual(result, books[1]);
      done();
    });
  });

  it('errors when trying to get a book that doesn\'t exist in the data)', done=>{

    db.fetchItem(category, 55, (error)=>{
      assert.throws(expectedError, error);
      done();
    });
  });

  it('errors when trying to get a video (videos don\'t exist in the data)', done=>{

    db.fetchItem('video', id, (error)=>{
      assert.throws(expectedError, error);
      done();
    });
  });

  it('posts an item to books', done=>{

    const item = { 'noteBody': 'testing this out'};

    db.add(category, item, (error)=>{
      if (error) return done(error);
      assert.equal(books.length, 5);
      done();
    });
  });

  it('updates book 2', done=>{

    const item = books[1];
    const receivedData = { 'title': 'update to book 2'};

    db.update(category, id, item, receivedData,  (error, result)=>{
      if (error) return done(error);
      assert.equal(result, 'Success');
      done();
    });
  });

  it('deletes book 2', done=>{

    db.delete(category, id, (error)=>{
      if (error) return done(error);
      assert.equal(books.length, 4);
      done();
    });
  });
});
