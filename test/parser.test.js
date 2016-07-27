const parser = require('../lib/parser')();
const assert = require( 'chai' ).assert;
const EventEmitter = require('events');

describe('parser middleware', ()=>{

  it('parses incoming data', ()=>{

    let nextCalled = false;
    const req = new EventEmitter();
    const next = () => {
      nextCalled = true;
    };

    const obj = {noteBody: 'this is a test note'};

    parser(req, null, next);

    req.emit('data', JSON.stringify(obj));
    req.emit('end');

    assert.ok(nextCalled, true);
    assert.deepEqual(req.body, obj);

  });

});
