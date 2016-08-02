module.exports = function parseIt () {
  return function bodyParser (req, res, next) {
    let body = '';
    req.on('data', (data) => {
      body += data;
    });
    req.on('end', () => {
      console.log(req.user);
      console.log(body);
      if (body.length === 0) {
        next({status: 400, message: 'No data provided.'});
      } else {
        try {
          req.body = JSON.parse(body);
          next();
        } catch (err) {
          next({status: 400, message: 'Invalid JSON'});
        }
      }
    });
  };
};
