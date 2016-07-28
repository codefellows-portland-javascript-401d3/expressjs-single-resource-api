const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const book = new Schema({
  title: {
    type: String,
required: true
  },
  author: {
    type: String,
required: true
  },
  pubYear: {
    type: String || Number, //Does Mongo support Date as a type?
required: true
  },

});

//Is it better to store methods here or do them in routes?

module.exports = mongoose.model('Book', book);
