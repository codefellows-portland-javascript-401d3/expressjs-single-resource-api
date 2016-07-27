const chai = require('chai');
const assert = chai.assert;
const parser = require('../lib/routes/body-parser')();
const EventEmitter = require('events');

describe('body parser', () => {



  it('parses valid json and calls next', () => {
    const emitter = new EventEmitter();
    const next = () => {
    };
    parser(emitter, null, next);
    const obj = JSON.stringify({ title: 'Ghost Busters', year: 1984});
    emitter.emit('data', obj);
    emitter.emit('end');
    assert.deepEqual('{"title":"Ghost Busters","year":1984}', JSON.stringify(emitter.body));

  });

  it('returns err message when no body is provided and calls next', () => {
    const emitter = new EventEmitter();
    const next = (message) => {
      assert.deepEqual({status: 400, message: 'No data provided.'}, message);
    };
    parser(emitter, null, next);
    const obj = '';
    emitter.emit('data', obj);
    emitter.emit('end');
    assert.ok(emitter.body === undefined);

  });

  it('returns err message when body is not valid JSON', () => {
    const emitter = new EventEmitter();
    const next = (message) => {
      assert.deepEqual({status: 400, message: 'Invalid JSON'}, message);
    };
    parser(emitter, null, next);
    const obj = { title: 'Ghost Busters', year: 1984};
    emitter.emit('data', obj);
    emitter.emit('end');
    assert.ok(emitter.body === undefined);
  });

});
