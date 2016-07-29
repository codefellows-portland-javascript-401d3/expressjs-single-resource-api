const chai = require(`chai`);
const assert = chai.assert;
const parseBikes = require(`../lib/routes/parseBikes`);
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}



describe(`it tests parseBike middleware`, (done) => {
  it(`tests that the form is parsed properly`, (done) => {
    const req = new MyEmitter();
    const next = () => {
    };
    const data = `make=Pake&model=RumRunner`;
    parseBikes(req, null, next);
    req.emit('data', data);
    req.emit(`end`);
    assert.deepEqual(req.body, {make: `Pake`, model: `RumRunner`});
    done();
  });
});