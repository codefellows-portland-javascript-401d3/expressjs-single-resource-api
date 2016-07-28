const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Book = require('./book');

//I think modeling buildings as containing certain books seems right.
//Especially since a book cannot be in two buildings at once

const building = new Schema({
  name: {
    type: String,
    required: true
  },
  books: {
    type: [Schema.Types.ObjectId],
    ref: 'Book'
  }
});

module.exports = mongoose.model('Building', building);
