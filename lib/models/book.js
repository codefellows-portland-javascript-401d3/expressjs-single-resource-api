const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var d = new Date();
var thisYear = d.getFullYear();

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
required: true,
     max: [thisYear, 'Cannot be from the future']
  },
  buildingId: {
    type: Schema.Types.ObjectId,
    ref: 'Building'
  }
});

module.exports = mongoose.model('Book', book);
