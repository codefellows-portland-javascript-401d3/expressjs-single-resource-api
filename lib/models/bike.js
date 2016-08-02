const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const bike = new Schema({
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
  }
});

module.exports = mongoose.model('Bike', bike);