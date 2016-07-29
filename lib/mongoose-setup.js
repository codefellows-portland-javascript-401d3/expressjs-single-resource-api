const mongoose = require( 'mongoose' );
const debug = require( 'debug' )( 'myapp.dbconnect' );

// we need a URI that points to our database
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/user'; 

mongoose.Promise = Promise;
mongoose.connect( dbURI ); 

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {  
  debug( 'Mongoose default connection open to ' + dbURI );
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  debug( 'Mongoose default connection error: ' + err );
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  debug( 'Mongoose default connection disconnected' ); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    debug( 'Mongoose default connection disconnected through app termination' ); 
    process.exit(0); 
  }); 
});

module.exports = mongoose.connection;