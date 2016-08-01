/* eslint-disable indent */
/* linter is giving me weird indent errors on the setAuthor method */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Author = require('./author');

const note = new Schema({
  title: {
    type: String
  },
  body: {
    type: String,
    required: true
  },
  important: {
    type: Boolean,
    default: false
  },
  authorId: {
    type: String,
    ref: 'Author'
  }
});

note.methods.setAuthor = function(authorId){
  return Author.exists(authorId)
		.then(exists => {
      if(!exists) throw new Error(`author id ${authorId} does not exist`);
		})
		.then(() => {
      this.authorId = authorId;
      return this.save();
		});
};

note.methods.removeAuthor = function(){
  this.authorId = undefined;
  return this.save();
};

module.exports = mongoose.model('Note', note);
