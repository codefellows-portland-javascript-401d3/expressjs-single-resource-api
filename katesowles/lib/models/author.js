const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const author = new Schema({
  name : {
    type : String,
    required : true
  },
  countryOfOrigin : {
    type : String,
    required : true
  },
  website : {
    type : String,
    required : true
  }
});

module.exports = mongoose.model('Author', author);
