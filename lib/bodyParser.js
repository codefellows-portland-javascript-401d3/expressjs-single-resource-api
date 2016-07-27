module.exports = function () {
  return function parser (request, response, next) {
    let body = '';
    request.on('data', book => body += book);
    request.on('end', () => {
      let item = null;
      try {
        item = JSON.parse(body);
      }
      catch (err) {
        return next ('invalid JSON');
      }
      request.body = item;
      next();
    });
  };
};
