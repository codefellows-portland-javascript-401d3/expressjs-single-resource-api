const express = require('express');
const parser = require('../bodyParser')();
const Method = require('../models/method');
const router = express.Router();

module.exports = router
  .get('/', (request, response, next) => {
    Method.find()
      .then(method => response.send(method))
      .catch( () => {
        next('error getting method');
      });
  })
  .get('/:id', (request,response, next) => {
    Method.findById(request.params.id)
      .then(method => response.send(method))
      .catch( () => {
        next('error finding that specific method');
      });
  })
  .delete('/:id', (request, response, next) => {
    Method.findByIdAndRemove(request.params.id)
      .then(deleted => response.send(deleted))
      .catch( (err) => {
        next('error deleting the method', err);
      });
  })
  .post('/', parser, (request, response, next) => {
    new Method(request.body).save()
      .then(saved => response.send(saved))
      .catch( () => {
        next('error saving the method');
      });
  })
  .put('/:id', parser, (request, response, next) => {
    Method.findByIdAndUpdate(request.params.id, request.body)
      .then(saved => response.send(saved))
      .catch( () => {
        next('error updating the method');
      });
  });
