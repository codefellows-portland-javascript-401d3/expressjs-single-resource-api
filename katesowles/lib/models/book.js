const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const book = new Schema({
  title : {
    type : String
  },
  author : {
    type : String,
    ref : 'Author'
  },
  pubYear : {
    type : Number
  },
  numPages : {
    type : Number
  },
  rating : {
    type : String,
    ref : 'Rating'
  },
  complete : {
    type : Boolean
  },
  method : {
    type : String,
    ref : 'Method'
  }
});

module.exports = mongoose.model('Book', book);
