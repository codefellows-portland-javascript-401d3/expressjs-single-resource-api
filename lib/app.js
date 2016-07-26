const express = require('express');
const app = module.exports = express();
const db = require('./db');

app.get('/:category', (req, res) =>{
  db.fetchAll(req.params.category, (error, result)=>{
    if(error){
      res.status(400).json(error);
    } else {
      res.status(200).json(result);
    }
  });
});

app.get('/:category/:id', (req, res)=>{
  db.fetchItem(req.params.category, req.params.id, (error, result)=>{
    if(error){
      res.status(400).json(error);
    } else {
      res.status(200).json(result);
    }
  });
});

app.post('/:category', (req, res)=>{
  let body = '';
  req.on('data', d => body += d);
  req.on('end', ()=>{
    let item = null;
    try {
      item = JSON.parse(body);
    } catch(error) {
      return res.status(400).json('Invalid JSON');
    }
    db.add(req.params.category, item, (error, result)=>{
      res.status(200).json(result);
    });
  });
});

app.delete('/:category/:id', (req, res)=>{
  db.fetchItem(req.params.category, req.params.id, (error, result)=>{
    if(error){
      res.status(400).json(error);
    } else {
      const item = result;
      db.delete(req.params.category, item, (error, data)=>{
        res.status(200).json(data);
      });
    }
  });
});

app.put('/:category/:id', (req, res)=>{
  let body = '';
  req.on('data', d => body += d);
  req.on('end', ()=>{
    let receivedData = null;
    try {
      receivedData = JSON.parse(body);
    } catch(error) {
      return res.status(400).json('Invalid JSON');
    }
    //see if the item exists
    db.fetchItem(req.params.category, req.params.id, (error, result)=>{
      if(error){
        res.status(400).json(error);
      } else {
        const item = result;
        db.update(req.params.category, req.params.id, item, receivedData, (error, data)=>{
          res.status(200).json(data);
        });
      }
    });
  });
});
