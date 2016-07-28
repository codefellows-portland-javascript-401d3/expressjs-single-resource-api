const app = require('./lib/app');
require( './lib/mongoose-setup' );

const port = process.env.PORT || 3000;

app.listen(port);

console.log('Server running on', port);

// const debug = require( 'debug' )( 'myapp.server' );
// const server = http.createServer( app );
// server.listen( port, () => {
// 	debug( 'server running at', server.address() );
// });