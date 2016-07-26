const app = require('./lib/server');
// const routes = require('./lib/routes');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server up on ' + port);
});
