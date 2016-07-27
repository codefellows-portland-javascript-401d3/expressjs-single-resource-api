const app = require('./lib/app');
const http = require('http');

const portNum = 3000; // '= process.env.PORT || 3000;' ?

const server = http.createServer(app);

server.listen(portNum, () => {
  console.log(`to open server, load 'localhost:${portNum}' in a browser window`, server.address());
});
