const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const now = new Date();

const Actor = new Schema({
  name: {
    type: String,
    required: true
  },
  DOB: {
    type: Date,
    max: [now, 'You cannot add an actor born after ({MAX}), because that would be in the future.'],
    required: true
  },
  age: {
    type: Number,
    required: true,
  },
  active: {
    type: Boolean,
    default: true
  },
  movies: [{
    type: Schema.Types.ObjectId,
    ref: 'Movie'
  }],
  awards: {
    type: Array
  }
}, {
  timestamps: true
} );

module.exports = mongoose.model('Actor', Actor);
