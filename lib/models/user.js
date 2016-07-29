const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const user = new Schema({
  username: {
    type: String,
    required: true
  },

  email: {
    type: String,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address.'],
    required: true
  }
});

module.exports = mongoose.model('User', user);
