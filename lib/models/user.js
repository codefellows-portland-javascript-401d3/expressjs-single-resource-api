const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

var user = new Schema ({
  usevarme : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  roles : [String]
});


user.methods.generateHash = password => {
  return this.password = bcrypt.hashSync(password, 8);
};

user.methods.compareHash = password => {
  console.log('start compareHash');
  console.log('this', this);
  console.log('compare hash', bcrypt.compareSync(password, this.password));
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', user);
