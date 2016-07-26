const book = require('../data/books');

const db = {};

db.fetchAll = function (title, callback) {
  if (book[title]) {
    callback(null, book[title]);
  }
  else {
    callback('we could not find the book with that title');
  }
};

db.fetchItem = function (field, id, callback) {
  const title = book[field];
  if (title) {
    if (title[id - 1]) {
      callback(null, title[id - 1]);
    }
    else {
      callback('we could not find that book');
    }
  }
};

db.add = function (title, item, callback) {
  book[title].push(item);
  callback(null, 'added it!');
};

db.delete = function (title, item, callback) {
  const index = book[title].indexOf(item);
  book[title].splice(index,1);
  callback(null, 'deleted it!');
};

db.update = function (title, id, item, incoming, callback) {
  const index = book[title].indexOf(item);
  book[title].splice(index,1,incoming);
  callback(null, 'updated it!');
};

module.exports = db;
