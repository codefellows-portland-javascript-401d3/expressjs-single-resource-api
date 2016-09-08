
const Users = require( '../lib/models/user' );
const assert = require( 'chai' ).assert;

describe(`User Schema`, () => {
  
  it(`requires a name`, done => {
    const users = new Users();
    users.validate(err => {
      if(!err) done(`Should have been an error from lack of name`);
      else done();
    });
  });

});