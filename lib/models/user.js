const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const bcrypt = require(`bcryptjs`);

const user = new Schema({
  
  name: {
    type: String,
    required: true
  },
  bikesId: [{
    type: Schema.Types.ObjectId,
    ref: `User`
  }],
  password: {
    type: String,
  }
});

user.methods.newHash = function(password) {
  return this.password = bcrypt.hashSync(password, 8);
};

user.methods.compareHash = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', user);