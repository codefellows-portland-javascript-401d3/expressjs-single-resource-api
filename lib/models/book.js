const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const book = new Schema({
  title : {
    type : String
  },
  author : {
    type : String
  },
  pubYear : {
    type : Number
  },
  numPages : {
    type : Number,
    // min : [0, 'a book can\'t have this few pages, try again']
  },
  rating : {
    type : String,
    // default : null,
    // min : 0,
    // max : 5
  },
  complete : {
    type : Boolean,
    // default : false
  },
  method : {
    type : String
  }
});

module.exports = mongoose.model('Book', book);
