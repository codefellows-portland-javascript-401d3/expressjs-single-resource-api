const chai = require(`chai`);
const assert = chai.assert;
const parseForm = require(`../lib/routes/parseForm`);
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}



describe(`it tests parseForm middleware`, (done) => {
  it(`tests that the form is parsed properly`, (done) => {
    const req = new MyEmitter();
    const next = () => {
    };
    const data = "name=Arielle";
    parseForm(req, null, next);
    req.emit('data', data);
    req.emit(`end`);
    assert.deepEqual(req.body, {name: `Arielle`});
    done();
  });
});