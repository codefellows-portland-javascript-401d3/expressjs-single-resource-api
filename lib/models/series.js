const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const seriesSchema = new Schema({
  name: String,
  description: String,
  type: String
}, { timestamps: true });

module.exports = mongoose.model('Series', seriesSchema);
