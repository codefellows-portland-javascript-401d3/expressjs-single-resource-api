const http = require('http');
const app = require('./lib/app');
const port = process.env.PORT || 3000;
require('./lib/setup-mongoose');

const server = http.createServer(app);

server.listen(port, () => {
  console.log('Server is running at ', server.address());
});

module.exports = server;
