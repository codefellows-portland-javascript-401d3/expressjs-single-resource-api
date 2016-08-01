const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const series = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Series', series);
