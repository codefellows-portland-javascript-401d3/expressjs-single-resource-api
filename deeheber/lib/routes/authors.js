const express = require('express');
const parser = require('../parser')();
const Author = require('../models/author');
const Note = require('../models/note');
const authorNotes = require('./author-notes');
const router = express.Router();

module.exports = router

  .get('/', (req, res, next)=>{
    Author.find()
      .then(author => res.send(author))
      .catch(()=>{
        next('Error getting authors.');
      });
  })

  .get('/:id', (req, res, next)=>{
    Author.findById(req.params.id)
      .then(author => res.send(author))
      .catch(()=>{
        next('Invalid author id.');
      });
  })

  .post('/', parser, (req, res, next)=>{
    new Author(req.body).save()
      .then(saved => res.send(saved))
      .catch(()=>{
        next('Error saving author.');
      });
  })

  .delete('/:id', (req, res, next)=> {
    Author.exists(req.params.id)
      .then(exists =>{
        if(!exists) throw new Error('Author does not exist');
        return Note.find({ authorId: req.params.id });
      })
      .then(notes=>{
        notes.forEach(note=>{
          note.authorId = undefined;
          note.save();
        });
      })
      .then(()=>{
        return Author.findByIdAndRemove(req.params.id);
      })
      .then(deleted => res.send(deleted))
      .catch(()=>{
        next('Error deleting author.');
      });
  })

  .put('/:id', parser, (req, res, next)=>{
    Author.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
      .then(updated => res.send(updated))
      .catch(()=>{
        next('Error updating author profile.');
      });
  })

  .use(authorNotes);
