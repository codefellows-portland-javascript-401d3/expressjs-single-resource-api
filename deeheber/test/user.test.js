const User = require('../lib/models/user');
const assert = require( 'chai' ).assert;

describe('user model', ()=>{

  it('requires username', done=>{
    const user = new User();
    user.validate(err=>{
      if(!err) done('error not thrown when username isn\'t entered');
      else done();
    });
  });

  it('requires password', done=>{
    const user = new User();
    user.validate(err=>{
      if(!err) done('error not thrown when password isn\'t entered');
      else done();
    });
  });

  it('creates a new user', done=>{
    const user = new User({username: 'New user', password: '123'});
    assert.equal(user.username, 'New user');
    assert.equal(user.password, '123');
    done();
  });

});
