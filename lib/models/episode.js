const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const episodeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  medium: {
    type: String,
    default: ''
  },
  length: {
    type: Number,
    min: 0
  },
  airDate: Date  
}, { timestamps: true });

module.exports = mongoose.model('Episode', episodeSchema);
