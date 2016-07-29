const User = require( '../lib/models/user' );
const assert = require( 'chai' ).assert;

describe('user model', ()=>{

  it('errors on invalid email', done=>{
    const user = new User({username: 'deeheber', email: 'address'});
    user.validate(err=>{
      //console.log(err.errors.email);
      if(!err) done('invalid email entered and error not thrown');
      else done();
    });
  });

  it('errors when no username is entered', done=>{
    const user = new User();
    user.validate(err=>{
      if(!err) done('error not thrown when username isn\'t entered');
      else done();
    });
  });

  it('creates a user', done=>{
    const user = new User({username: 'New user', email: 'hi@hello.com'});
    assert.equal(user.username, 'New user');
    assert.equal(user.email, 'hi@hello.com');
    done();
  });

});
