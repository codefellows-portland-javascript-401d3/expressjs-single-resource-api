const express = require('express');
const Note = require('../models/note');
const Author = require('../models/author');
const router = express.Router();

module.exports = router

  //updates or adds an author id to a note
  .put('/:id/notes/:noteId', (req, res, next)=>{
    Note.findById(req.params.noteId)
      .then(note => {
        if(!note) throw new Error(`note id ${req.params.noteId} does not exist`);
        return note.setAuthor(req.params.id);
      })
      .then(note => res.send(note))
      .catch(()=>{
        next('Error adding authorId to note');
      });
  })

  //remove author id from a note
  .delete('/null/notes/:noteId', (req, res, next)=>{
    Note.findById(req.params.noteId)
      .then(note => {
        if(!note) throw new Error(`note id ${req.params.noteId} does not exist`);
        return note.removeAuthor(req.params.noteId);
      })
      .then(note => res.send(note))
      .catch(()=>{
        next('Error removing authorId from note');
      });
  })

  //counts the number of notes by a specific author
  .get('/:id/countNotes', (req,res, next)=>{
    Author.exists(req.params.id)
      .then(exists =>{
        if(!exists) throw new Error('Author does not exist');
      })
      .then(()=>{
        return Note.find({ authorId: req.params.id })
          .select('title body')
          .count()
          .then(count => {
            res.json(count);
          });
      })
      .catch(()=>{
        next(`Error retrieving note count for author ${req.params.id}`);
      });
  })

  //lists notes by a specific author
  .get('/:id/notes', (req,res, next)=>{
    Author.exists(req.params.id)
      .then(exists =>{
        if(!exists) throw new Error('Author does not exist');
      })
      .then(() => {
        return Note.find({ authorId: req.params.id })
          .select('title body')
          .lean()
          .then(notes =>{
            res.send(notes);
          });
      })
      .catch(()=>{
        next(`Error retrieving notes for author ${req.params.id}`);
      });
  });
