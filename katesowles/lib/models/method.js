const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const method = new Schema({
  readByMethod : {
    type : String
  }
});

module.exports = mongoose.model('Method', method);
