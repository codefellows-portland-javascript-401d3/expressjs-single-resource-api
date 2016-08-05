const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const author = new Schema({
  name : {
    type : String
  },
  countryOfOrigin : {
    type : String
  },
  website : {
    type : String
  }
});

module.exports = mongoose.model('Author', author);
