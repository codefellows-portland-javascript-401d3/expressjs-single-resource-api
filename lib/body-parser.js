
module.exports = function bodyParser(opts) {
  return function(req, res, next) {
    try {
      if (opts) res.opts = 'example optional key';
      let content = '';
      req.on('data', d => content += d);
      req.on('end', () => {
        req.body = JSON.parse(content);
        next();
      });
    }
    catch(err) {
      next(err); //Does this work? Where exactly does this pass the error to?
    }
  };
};
