const jwt = require('jsonwebtoken');
const secret = process.env.APP_SECRET || 'secret';

module.exports = {
  sign(user) {
    return new Promise((resolve, reject) => {
      //payload is data we want stored in token
      //this is "transparent" but it cannot be modified without ruining token
      const payload = {
        id: user.id,
        roles: user.roles
      };

      //make the token using payload and the secret
      jwt.sign(payload, secret, null, (err, token) => {
        if (err) return reject(err);
        resolve(token);
      });
    });
  },

  verify(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, payload) => {
        if (err) return reject(err);
        resolve(payload);
      });
    });
  }

};
