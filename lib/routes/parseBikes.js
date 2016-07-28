module.exports = function parseForm(req, res, next) {
  let body = '';
  req.on('data', data => {
    body += data;  
  });
  req.on('end', () => {
    body = JSON.stringify(body);
    let bodyArr = body.split(`&`);
    let make = bodyArr[0].slice(6, bodyArr[0].length); 
    let model = bodyArr[1].slice(6, bodyArr[1].length -1);
    body = {
      make: make,
      model: model
    };
    try {
      req.body = body;
    } catch(err) {
      next(err);
    }
    next();
  });
};
  