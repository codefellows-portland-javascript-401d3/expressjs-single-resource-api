const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Episode = require('./episode');

const character = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  appearances: [{
    summary: String,
    chapter: String,
    episode: {
      type: Schema.Types.ObjectId,
      ref: 'Episode'
    }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Character', character);
