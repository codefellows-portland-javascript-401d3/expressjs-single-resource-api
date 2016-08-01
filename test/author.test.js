const Author = require( '../lib/models/author' );
const assert = require( 'chai' ).assert;

describe('author model', ()=>{

  it('errors on invalid email', done=>{
    const author = new Author({name: 'deeheber', email: 'address'});
    author.validate(err=>{
      //console.log(err.errors.email);
      if(!err) done('invalid email entered and error not thrown');
      else done();
    });
  });

  it('errors when name field is blank', done=>{
    const author = new Author();
    author.validate(err=>{
      if(!err) done('error not thrown when name isn\'t entered');
      else done();
    });
  });

  it('creates an author', done=>{
    const author = new Author({name: 'New author', email: 'hi@hello.com'});
    assert.equal(author.name, 'New author');
    assert.equal(author.email, 'hi@hello.com');
    done();
  });

});
