const data = require('../data');

const db = {};

db.fetchAll = function(category, callback){
  if(data[category]){
    callback(null, data[category]);
  } else {
    callback('Resource not found');
  }
};

db.fetchItem = function(resource, id, callback){
  const category = data[resource];

  if(category){
    if(category[id-1]){
      callback(null, category[id-1]);
    } else {
      callback('Resource not found');
    }
  } else {
    callback('Resource not found');
  }
};

db.add = function(category, item, callback){
  data[category].push(item);
  callback(null, 'Success');
};

db.delete = function(category, item, callback){
  const index = data[category].indexOf(item);
  data[category].splice(index, 1);
  callback(null, 'Success');
};

db.update = function(category, id, item, receivedData, callback){
  const index = data[category].indexOf(item);
  data[category].splice(index, 1, receivedData);
  callback(null, 'Success');
};

module.exports = db;
