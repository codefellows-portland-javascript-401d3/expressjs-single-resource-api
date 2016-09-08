const Bike = require('../lib/models/bike');
const assert = require( 'chai' ).assert;

describe(`Bike Schema`, () => {
  
  it(`requires a make`, done => {
    const bike = new Bike({});
    bike.validate(err => {
      if(!err) done(`Should have been an error from lack of make`);
      else done();
    });
  });

  

});