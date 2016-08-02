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

function setBike(user, currentId, newId) {
  return Bike.exists(currentId)
    .then(bike => {
      if (!bike) throw new Error(`Bike ${bikeId} does not exist`); 
    })
    .then(() => {
      user.bikeId = newId;
      return user.save({new: true});
    });
};

user.methods.addBike = function(bikeId) {
  return setBike(this, bikeId, bikeId);
};

module.exports = mongoose.model('User', user);