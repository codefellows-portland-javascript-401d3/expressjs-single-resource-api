const express = require( 'express' );
const mongoose = require('mongoose');
const bodyParser = require( '../body-parser' );
const Book = require( '../models/book' );
const Building = require( '../models/building' );

const router = express.Router();

module.exports = router
  //Get all
  .get('/', (req, res, next) => {
      Book.find()
          .then(result => res.send(result))
          .catch(next);
  })
  //Get one
  .get('/:id', (req, res, next) => {
      Book.findById(req.params.id)
      .then(result => res.send(result))
      .catch(next);
  })
  //create new document
  .post('/', bodyParser, (req, res, next) => {
      new Book (req.body).save()
      .then((result) => {
        if (result.buildingId) {
          Building.findById(result.buildingId)
          .then((building) => {
            building.books.push(result._id);
            building.save();
          });
        }
        return result;
      })
      .then(result => res.send(result))
      .catch(next);
  })
  //Update a document
  .put('/:id', bodyParser, (req, res, next) => {
    //Homebrewed implementation is commented out. Class work code looks better.
    // const conditions = {_id: req.params.id},
    // update = req.body;
    //   Book.update(conditions, update, null)
    //   .then()
      Book.findByIdAndUpdate(req.params.id, req.body)
      .then(result => res.send(result))
      .catch(next);
  })
  //Delete a document
  .delete('/:id', (req, res, next) => {
      //Homebrewed version below, as before. But findanddelete is just more efficient. Where are those functions in the docs? I can't find them.
      // Book.findById(req.params.id).remove()
      Book.removeById(req.params.id)
      .then(result => res.send(result))
      .catch(next);
  })
  //Something non-CRUD: Destroy old books.
  .get('/cull-old', (req, res, next) => {
    let query = Book.find({pubYear: {$lte: req.body.pubYear}});
    let promise = query.exec();
    promise.remove()
    .then(result => res.send(result))
    .catch(next);
  });
