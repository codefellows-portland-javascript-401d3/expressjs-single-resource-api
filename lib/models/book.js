const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const book = new Schema({
  title : {
    type : String
  },
  author : {
    type : Schema.ObjectId
  },
  pubYear : {
    type : Number
  },
  numPages : {
    type : Number
  },
  ratingId : {
    type : Schema.ObjectId
  },
  complete : {
    type : Boolean
  },
  methodId : {
    type : Schema.ObjectId
  }
});

module.exports = mongoose.model('Book', book);
