require('dotenv').config();
const app = require('./lib/server');

const port = process.env.port || 8080;

app.listen(port, () => {
  console.log('Server up on ' + port + '.');
});
