const confirmToken = require('./confirmToken');

module.exports = function getConfirmAuth() {
  return function (request, response, next) {
    const token = request.headers['postman-token'];
    // const token = request.headers.token;  // cannot confirm token this way

    if (!token) {
      return next({code:400, error: 'Cannot confirm token'});
    }

    else {
      console.log('inside confirmAuth else'); // gets here
      console.log('confirm - token', token);  // has token
      confirmToken.verify(token)  // isn't getting back out of here
        .then(user => {
          console.log('here');
          console.log('user', user);
          request.user = user;
          next();
        })
        .catch(() => {
          return next({code:403, error: 'Token is invalid'});
        });
    }

  };
};
