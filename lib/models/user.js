const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const user = new Schema({
  
  name: {
    type: String,
    required: true
  },
  bikesId: [{
    type: Schema.Types.ObjectId,
    ref: `User`
  }]
});


module.exports = mongoose.model('User', user);