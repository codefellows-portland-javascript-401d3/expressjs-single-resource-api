
  
module.exports = function parseForm(req, res, next) {
  let body = '';
  req.on('data', data => {
    body += data;  
  });
  req.on('end', () => {
    body = JSON.stringify(body);
    name = body.slice(6, body.length - 1);
    let submitData = {name: name};
    try {
      req.body = submitData;
    } catch(err) {
      next(err);
    }
    next();
  });
};
  