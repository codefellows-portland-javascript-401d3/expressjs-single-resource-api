const express = require( 'express' );
const mongoose = require('mongoose');
const bodyParser = require( '../body-parser' );
const Book = require( '../models/book' ); //Will I need this? Test!
const Building = require( '../models/building' );
const router = express.Router();

module.exports = router
  //Get all Buildings
  .get('/', (req, res, next) => {
    Building.find()
    .then(result => res.send(result))
    .catch(next);
  })
  //Get all Buildings and populate books into them.
  .get('/with-contents/:building', (req, res, next) => {
    Building.findOne({name: req.params.building})
    .populate('books').lean() //Anytime you're doing a get, this will be OK.
    .then(result => res.send(result))
    .catch(err);
  });
