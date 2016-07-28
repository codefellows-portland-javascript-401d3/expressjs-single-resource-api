const mongoose = require('mongoose');
const debug = require('debug')('myapp.dbconnect');

const dbURI = process.env.MONGODB_URI || 'mongodb:localhost/books';

mongoose.promise = Promise;
mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
  debug('mongoose default connection open to ' + dbURI);
});

mongoose.connection.on('error', (err) => {
  debug('mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
  debug('mongoose default connection disconnected');
});

process.on('SIGINT', () => {
  mongoose.connnection.close( () => {
    debug('mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

module.exports = mongoose.connection;
