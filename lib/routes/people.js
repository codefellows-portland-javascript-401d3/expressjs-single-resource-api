const express = require( 'express' );
const router = express.Router();
const formidable = require('formidable');
const parseForm = require('../parseForm');
const Store = require(`../store`);
const store = new Store();

module.exports = router 

  .get(`/`, (req, res, next) => {
    store.get()
      .then(data => res.send(data))
      .catch(err => next);
  })

  .get(`/:id`, (req, res, next) => {
    store.getId(req.params.id)
      .then(data => res.send(data))
      .catch(next);
  })

  .post(`/`, (req, res, next) => {
    parseForm(req, res, next)
      .then(object => {
        store.add(object)
          .then(data => res.send(data))
          .catch(next);
      });
  })

  .put(`/:id`, (req, res, next) => {
    parseForm(req, res, next)
      .then(object => {
        store.put(req.params.id, object)
          .then(data => res.send(data))
          .catch(next);
      });
  })

  .delete(`/:id`, (req, res, next) => {
    store.del(req.params.id)
      .then(data => res.send(data))
      .catch(err => next);
  });