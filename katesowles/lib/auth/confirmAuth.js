const confirmToken = require('./confirmToken');

module.exports = function getConfirmAuth() {
  return function (request, response, next) {
    const token = request.headers.token;

    if (!token) {
      return next({code:400, error: 'Cannot confirm token'});
    }

    confirmToken.verify(token)
      .then(user => {
        request.user = user;
        next();
      })
      .catch(() => {
        return next({code:403, error: 'Token is invalid'});
      });
  };
};
