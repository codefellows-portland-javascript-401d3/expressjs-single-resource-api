const jwt = require('jsonwebtoken');
const secret = process.env.secret || 'mySuperSecret';

module.exports = function getAuth() {
  return function auth(req, res, next) {

    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          next({status: 403, message: 'Authentication failed. Token invalid.'});
        } else {
          //If authentication passes, save to request for use in other routes.
          req.decoded = decoded;
          next();
        }
      });
    } else {
      //We're here if no token was passed to a protected route.
      next({status: 400, message: 'No token passed.'});
    }
  };
};
