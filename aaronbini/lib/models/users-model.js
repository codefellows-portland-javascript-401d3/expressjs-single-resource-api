const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const voteSchema = require('./votes-model');
const Movie = require('./movies-model');

const userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  roles: [String],
  votes: [voteSchema.schema]
});

userSchema.methods.generateHash = function (password) {
  return this.password = bcrypt.hashSync(password, 8);
};

userSchema.methods.compareHash = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User',userSchema);

// {type: Schema.Types.ObjectId, ref: 'Movie'},
// {type: Number, min: 1, max: 10}
