const tokenCheck = require(`./token`);

module.exports = function validateAuth(req, res, next) {
  let token = req.headers.token;

  if(!token) return next({code: 400, error: `No token provided.`});

  tokenCheck.verify(token)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(() => {
      return next({
        code: 403,
        error: `Invalid token.`
      });
    });
};