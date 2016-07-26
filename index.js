const server = require('./lib/server');

const portNum = 3000;

server.listen(portNum, () => {
  console.log('server has started on ', server.address());
});
