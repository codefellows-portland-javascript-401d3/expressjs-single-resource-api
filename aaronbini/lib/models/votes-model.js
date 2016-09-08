const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Vote = new Schema ({
  vote: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  movie: {
    type: Schema.Types.ObjectId,
    ref: 'Movie'
  }
});

module.exports = mongoose.model('Vote', Vote);
