const express = require(`express`);
const Bike = require(`../models/bike`);
const User = require(`../models/user`);
const router = express.Router();

module.exports = router 

  .put(`/:id/bikes/:bikeId`, (req, res, next) => {
    Promise.all([
      User.findById(req.params.id),
      Bike.findById(req.params.bikeId)
    ])
    .then(results => {
      let user = results[0];
      let bike = results[1];
      if(!user) throw new Error(`User ID ${req.params.id} not found`);
      if(!bike) throw new Error(`Bike ID ${req.params.bikeId} not found`);
      user.bikesId.push(bike._id);
      return user.save();  
    })
    .then(saved => {
      res.send(saved);
      next();
    })
    .catch(next);
  })

  .delete(`/:id/bikes/:bikeId`, (req, res, next) => {
    User.findById(req.params.id)
     .then(result => {
       let user = result;
       if(!user) throw new Error(`User ID ${req.params.id} not found`);
       if (user.bikesId.indexOf(req.params.bikeId) === -1) throw new Error(`Bike ID ${req.params.bikeId} not found`);
       let index = user.bikesId.indexOf(req.params.bikeId);
       user.bikesId.splice(index, 1);
       return user.save();
     })
     .then(saved => {
       res.send(saved);
       next();
     })
     .catch(next);
  });

  





;