const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const Book = require('./book'); //Necessary?

const building = new Schema({
  name: {
    type: String,
    required: true
  },
  books: [{
    type: Schema.Types.ObjectId,
    ref: 'Book'
  }]
});

module.exports = mongoose.model('Building', building);
