const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Book = new Schema({
  title: {
    type: String,
required: true
  },
  author: {
    type: String,
required: true
  },
  pubDate: {
    type: String, //Does Mongo support Date as a type?
required: true
  },

});

module.exports = mongoose.model('Book', book);
//Not completely sure about that second param.
