const jwt = require(`jsonwebtoken`);
const sekrit = process.env.APP_SECRET || `hello`;

module.exports = {
  sign(user) {
    return new Promise((resolve, reject) => {
      const payload = {
        id: user.id,
        roles: user.roles
      };
      jwt.sign(payload, sekrit, null, (err, token) => {
        if(err) return reject(err);
        return resolve(token);
      });
    });
  },

  verify(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, sekrit, (err, payload) => {
        if(err) return reject(err);
        return resolve(payload);
      });
    });
  }
};