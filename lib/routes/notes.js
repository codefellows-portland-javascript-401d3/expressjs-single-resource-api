const express = require('express');
const parser = require('../parser')();
const Note = require('../models/note');
const router = express.Router();

module.exports = router

  .get('/', (req, res, next)=>{
    const important = req.query.important;
    if(important === 'true'){
      //return important notes
      Note.find({'important': true}).select({title: 1, body: 1})
        .then(important => res.send(important))
        .catch(()=>{
          next('Error getting important notes');
        });
    } else if((Object.keys(req.query).length === 0)){
      //no query so return all notes
      Note.find()
        .then(note => res.send(note))
        .catch(()=>{
          next('Error getting notes.');
        });
    } else{
      next('Invalid URL query');
    }
  })

  .get('/:id', (req, res, next)=>{
    Note.findById(req.params.id)
      .then(note => res.send(note))
      .catch(()=>{
        next('Error locating note');
      });
  })

  .post('/', parser, (req, res, next)=>{
    new Note(req.body).save()
      .then(saved => res.send(saved))
      .catch(()=>{
        next('Error saving note.');
      });
  })

  .delete('/:id', (req, res, next)=> {
    Note.findByIdAndRemove(req.params.id)
      .then(() => res.json('Note deleted'))
      .catch(()=>{
        next('Error deleting note.');
      });
  })

  .put('/:id', parser, (req, res, next)=>{
    Note.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
      .then(() => res.json('Note updated'))
      .catch(()=>{
        next('Error updating note.');
      });

  });
