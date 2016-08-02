const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema ({
  username : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  roles : [String]
});


userSchema.methods.generateHash = password => {
  return this.password = bcrypt.hashSync(password, 8);
};

userSchema.methods.compareHash = password => {
  return bcrypt.compareSync(password, this.password);
}

userSchema.methods.
