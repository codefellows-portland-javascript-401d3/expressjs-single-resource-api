const app = require('./lib/app');
const http = require('http');
const debug = require('debug')('myapp.server');
require('./lib/setup-mongoose');

const portNum = process.env.PORT || 3000;

const server = http.createServer(app);
server.listen(portNum, () => {
  debug(`to open server, load 'localhost:${portNum}' in a browser window. server running at `, server.address());
});
