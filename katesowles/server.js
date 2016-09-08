const app = require('./lib/app');
const http = require('http');
const portNum = process.env.PORT || 3000;
require('./lib/mongooseSetup');


const server = http.createServer(app);
server.listen(portNum, () => {
  console.log(`server is running at 'localhost:${portNum}'`);
});
