const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const note = new Schema({
  title: {
    type: String
  },
  body: {
    type: String,
    required: true
  },
  important: {
    type: Boolean,
    default: false
  }
},
  {
    timestamps: true
  });

module.exports = mongoose.model('Note', note);
