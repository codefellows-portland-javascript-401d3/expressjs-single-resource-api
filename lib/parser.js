module.exports = function () {

  return function parser(req, res, next) {
    let body = '';
    req.on('data', d => body += d);
    req.on('end', ()=>{
      let item = null;
      try {
        item = JSON.parse(body);
      } catch(error) {
        return next('Invalid JSON');
      }
      req.body = item;
      next();
    });
  };

};
