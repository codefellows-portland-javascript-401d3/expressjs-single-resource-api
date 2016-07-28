const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('./database');
const parser = require('./bodyParser')();

module.exports = router

  .get('/', (request, response) => {
    console.log('here');
    // response.sendFile(path.normalize(__dirname + '/../data/books.json'));
    response.sendFile(path.normalize(__dirname + '/../index.html'));
    console.log('there');
  })

  .get('/:title', (request, response, next) => {
    db.fetchAll(request.params.title, (err, result) => {
      if (err) {
        next(err);
      }
      else return response.status(200).json(result);
    });
  })

  .get('/:title/:id', (request, response, next) => {
    db.fetchItem(request.params.title, request.params.id, (err, result) => {
      if (err) {
        next(err);
      }
      else return response.status(200).json(result);
    });
  })

  .post('/:title', parser, (request, response) => {
    db.add(request.params.title, request.body, (err, result) => {
      response.status(200).json(result);
    });
  })

  .delete('/:title/:id', parser, (request, response, next) => {
    db.fetchItem(request.params.title, request.params.id, (err, result) => {
      if (err) {
        next(err);
      }
      else {
        const item = result;
        db.delete(request.params.title, item, (err, data) => {
          response.status(200).json(data);
        });
      }
    });
  })

  .put('/:title/:id', parser, (request, response, next) => {
    db.fetchItem(request.params.title, request.params.id, (err, result) => {
      if (err) {
        next(err);
      }
      else {
        const item = result;
        db.update(request.params.title, request.params.id, item, request.body, (err, data) => {
          response.status(200).json(data);
        });
      }
    });
  });
