module.exports = function(req,res,next) {
  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });
  req.on('end', () => {
    req.body = JSON.parse(body);
    next();
  });
  req.on('error', err => {
    console.error(err.stack);
    err.status = 500;
    err.message = 'Parse error';
    next(err);
  });
};