const express = require(`express`);
const path = require(`path`);
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

app.post(`/notes`, (req, res) => {
  form.parse(req, (err, fields, files) => {   
    console.log(fields); 
      storage.add(fields, fields => {
        res.send(fields);
      });
});


















module.exports = app;