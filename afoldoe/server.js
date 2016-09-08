const app = require(`./lib/app`);
const http = require(`http`);
const port = process.env.PORT || 3000;
require(`./lib/mongoose-setup`);

const server = http.createServer(app);

server.listen(port, () => {
  console.log('server is running at ', server.address());
});



module.exports = server;