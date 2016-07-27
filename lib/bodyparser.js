module.exports = function(req,res,next) {
  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });
  req.on('end', () => {
    req.body = JSON.parse(body);
    next();
  });
};