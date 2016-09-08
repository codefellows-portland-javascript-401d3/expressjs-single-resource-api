const mongoose = require('mongoose');

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/books';

mongoose.Promise = Promise;
mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
  console.log('mongoose default connection open to ' + dbURI);
});

mongoose.connection.on('error', (err) => {
  console.log('mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
  console.log('mongoose default connection disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close( () => {
    console.log('mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

module.exports = mongoose.connection;
