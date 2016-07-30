module.exports = function(req,res,next) {
  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });
  req.on('end', () => {
    try {
      req.body = JSON.parse(body);
    } catch (err) {
      let error = {};
      error.status = 400;
      error.message = 'problem parsing json: ' + body;
      next(error);
    }
    next();
  });
  req.on('error', err => {
    console.log('Error:',err);
    let error = {};
    error.status = 500;
    error.message = 'problem receiving request';
    next(error);
  });
};
