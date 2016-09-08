const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const author = new Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address.'],
    required: true
  }
});

author.statics.exists = function(id) {
  return this
		.findById(id)
		.count()
		.then(count => count === 1);
};

module.exports = mongoose.model('Author', author);
