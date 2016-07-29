const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const earliest = new Date('1890-01-01');
const latest = new Date();

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
    min: [earliest, 'There were no movies created before ({MIN}).'],
    max: [latest, 'You cannot add a movie created after ({MAX}), that would be in the future.'],
    required: true
  },
  gross: {
    type: Number,
    required: true
  },
  color: {
    type: Boolean,
    default: true
  },
  actors: {
    type: Array
  },
  awards: {
    type: Array
  }
} );

//makes testing difficult so I temporarily removed
// {
//   timestamps: true
// }

module.exports = mongoose.model('Movie', Movie);
