const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const episodeSchema = new Schema({
  title: String,
  medium: String,
  length: Number,
  airDate: Date  
}, { timestamps: true });

module.exports = mongoose.model('Episode', episodeSchema);
