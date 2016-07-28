const Note = require( '../lib/models/note' );
const assert = require( 'chai' ).assert;

describe('note model', ()=>{

  it('errors when note.body is empty', done=>{
    const note = new Note();
    note.validate(err=>{
      if(!err) done('body required error');
      else done();
    });
  });

  it('note defaults to not important', done=>{
    const note = new Note({ title: 'testing', body: 'content here'});
    note.validate(()=>{
      assert.equal(note.important, false);
      done();
    });
  });

});
