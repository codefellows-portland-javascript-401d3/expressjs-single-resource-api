const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || 'beastie';

module.exports = {
  sign(user) {
    return new Promise((resolve, reject) => {
      const payload = {
        id : user.id,
        roles : user.roles,
      };
      jwt.sign(payload, secret, null, (err, token) => {
        if (err) return reject(err);
        resolve(token);
      });
    });
  },

  verify(token) {
    console.log('inside confirm token verify');  // gets here
    return new Promise(function (resolve, reject) {
      console.log('token', token);
      console.log('secret', secret);
      jwt.verify(token, secret, (err, payload) => {
        if (err) {
          console.log('err');
          return reject(err);
        }
        resolve(payload);
      });
    });
  }
};
