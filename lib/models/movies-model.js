const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Movie = new Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  year: {
    type: Date,
    // min: [Date('1890-01-01'), 'There were no movies created before ({MIN}).'],
    // max: [Date('2016-12-30'), 'You cannot add a move created after ({MAX}), that would be in the future.'],
    required: true
  },
  actors: {
    type: Array
  },
  awards: {
    type: Array
  }
} );

//makes testing difficult so I removed
// {
//   timestamps: true
// }

module.exports = mongoose.model('Movie', Movie);
