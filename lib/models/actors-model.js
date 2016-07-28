const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Actor = new Schema({
  name: {
    type: String,
    required: true
  },
  DOB: {
    type: Date,
    // max: [Date(Date.now()), 'You cannot add an actor born after ({MAX}), because no one has been born in the future.'],
    required: true
  },
  movies: {
    type: Array
  },
  awards: {
    type: Array
  }
} );

//makes testing cumbersome so I removed this for now
// {
//   timestamps: true
// }
