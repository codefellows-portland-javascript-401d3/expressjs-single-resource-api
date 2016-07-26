const express = require(`express`);
const formidable = require('formidable');
const path = require(`path`);
const url = require(`url`);
const Store = require(`./store`);
const store = new Store();
const app = express();



app.get(`/`, (req, res) => {
  const indexHtml = path.resolve( __dirname, '../public/index.html' );
  res.sendFile(indexHtml);
});

app.get(`/notes`, (req, res) => {
  store.get(data => {
    res.send(data);
  });
});

app.get(`/notes/:id`, (req, res) => {
  store.getId(req.params.id, data => {
    console.log(data);
    res.send(data);
  });
});

app.post(`/notes`, (req, res) => {
  let form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {   
    store.add(fields, (id, data) => {
      res.send(data);
    }); 
  });
});

app.delete(`/notes`, (req, res) => {
  let pathname = url.parse(req.url).pathname;
  let length = pathname.lenth;
  pathname = pathname.slice(7, length);
  store.del(pathname, data => {
    res.send(data);
  });
});

app.put(`/notes/:id`, (req, res) => {
  let form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    store.put(req.params.id, fields, data => {
      res.send(data);
    });
  });
});
















module.exports = app;