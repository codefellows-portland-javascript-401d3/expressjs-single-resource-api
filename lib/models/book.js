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
    min : [0, 'too few pages, try again']
  },
  rating : {
    type : Number,
    default: null,
    min : 0,
    max : 5
  },
  complete : {
    type : Boolean,
    default: false
  },
  method : {
    type : String
  }
});

module.exports = mongoose.model('Book', book);
