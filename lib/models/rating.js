const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rating = new Schema({
  star : {
    type : String
  }
});

module.exports = mongoose.model('Rating', rating);
