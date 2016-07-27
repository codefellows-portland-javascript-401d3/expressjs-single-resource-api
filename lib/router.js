const express = require( 'express' );
const db = require('./db');
const parser = require('./parser')();
const router = express.Router();

module.exports = router

  .get('/:category', (req, res, next) =>{
    db.fetchAll(req.params.category, (error, result)=>{
      if(error){
        next(error);
      } else {
        res.status(200).json(result);
      }
    });
  })

  .get('/:category/:id', (req, res, next)=>{
    db.fetchItem(req.params.category, req.params.id, (error, result)=>{
      if(error){
        next(error);
      } else {
        res.status(200).json(result);
      }
    });
  })

  .post('/:category', parser, (req, res)=>{
    db.add(req.params.category, req.body, (error, result)=>{
      res.status(200).json(result);
    });
  })

  .put('/:category/:id', parser, (req, res, next)=>{
      //see if the item exists
    db.fetchItem(req.params.category, req.params.id, (error, result)=>{
      if(error){
        next(error);
      } else {
        const item = result;
        db.update(req.params.category, req.params.id, item, req.body, (error, data)=>{
          res.status(200).json(data);
        });
      }
    });
  })

  .delete('/:category/:id', (req, res, next)=>{
    db.fetchItem(req.params.category, req.params.id, (error, result)=>{
      if(error){
        next(error);
      } else {
        const item = result;
        db.delete(req.params.category, item, (error, data)=>{
          res.status(200).json(data);
        });
      }
    });
  });
