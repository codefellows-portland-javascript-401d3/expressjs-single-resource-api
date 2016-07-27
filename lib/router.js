const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('./database');
const parser = require('./bodyParser')();

module.export = router

  .get('/', (request, response) => {
    response.sendFile(path.normalize(__dirname + '/../data/books.json'));
  })

  .get('/:title', (request, response, next) => {
    db.fetchAll(request.params.title, (err, result) => {
      if (err) {
        next(err);
        // response.status(400).json(err);
        // console.log('app.get fetchAll');
      }
      else {
        response.status(200).json(result);
      }
    });
  })

  .get('/:title/:id', (request, response, next) => {
    db.fetchItem(request.params.title, request.params.id, (err, result) => {
      if (err) {
        next(err);
        // console.log('app.get fetchItem');
        // return response.status(400).json(err);
      }
      else return response.status(200).json(result);
    });
  })

  .post('/:title', parser, (request, response) => {
    db.add(request.params.title, request.body, (err, result) => {
      response.status(200).json(result);
    });
    // let body = '';
    // request.on('data', book => body += book);
    // request.on('end', () => {
    //   let item = null;
    //   try {
    //     item = JSON.parse(body);
    //   }
    //   catch (err) {
    //     console.log('app.post');
    //     return response.status(400).json('invalid JSON');
    //   }
    //   db.add(request.params.title, item, (err, result) => {
    //     response.status(200).json(result);
    //   });
    // });
  })

  .delete('/:title/:id', parser, (request, response, next) => {
    db.fetchItem(request.params.title, request.params.id, (err, result) => {
      if (err) {
        next(err);
        // console.log('app.delete');
        // return response.status(400).json(err);
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
    // let body = '';
    // request.on('data', book => body += book);
    // request.on('end', () => {
    //   let incoming;
    //   try {
    //     incoming = JSON.parse(body);
    //   }
    //   catch (err) {
    //     console.log('app.put');
    //     return response.status(400).json('invalid JSON');
    //   }
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
    // });
  });
