const express = require('express');
const app = module.exports = express();
const db = require('./database');

app.use(express.static(__dirname + '/data'));

app.get('/:title', (request, response) => {
  db.fetchAll(request.params.title, (err, result) => {
    if (err) {
      response.status(400).json(err);
    }
    else {
      response.status(200).json(result);
    }
  });
});

app.get('/:title/:id', (request, response) => {
  db.fetchItem(request.params.title, request.params.id, (err, result) => {
    if (err) return response.status(400).json(err);
    else return response.status(200).json(result);
  });
});

app.post('/:title', (request, response) => {
  let body = '';
  request.on('data', book => body += book);
  request.on('end', () => {
    let item = null;
    try {
      item = JSON.parse(body);
    }
    catch (err) {
      return response.status(400).json('invalid JSON');
    }
    db.add(request.params.title, item, (err, result) => {
      response.status(200).json(result);
    });
  });
});

app.delete('/:title/:id', (request, response) => {
  db.fetchItem(request.params.title, request.params.id, (err, result) => {
    if (err) return response.status(400).json(err);
    else {
      const item = result;
      db.delete(request.params.title, item, (err, data) => {
        response.status(200).json(data);
      });
    }
  });
});

app.put('/:title/:id', (request, response) => {
  let body = '';
  request.on('data', book => body += book);
  request.on('end', () => {
    let incoming;
    try {
      incoming = JSON.parse(body);
    }
    catch (err) {
      return response.status(400).json('invalid JSON');
    }
    db.fetchItem(request.params.title, request.params.id, (err, result) => {
      if (err) return response.status(400).json(err);
      else {
        const item = result;
        db.update(request.params.title, request.params.id, item, incoming, (err, data) => {
          response.status(200).json(data);
        });
      }
    });
  });
});
