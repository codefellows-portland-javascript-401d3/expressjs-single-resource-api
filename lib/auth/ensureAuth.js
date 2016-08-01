const tokenChecker = require('./token');

module.exports = function getEnsureAuth() {
  return function ensureAuth (req, res, next) {
    const token = req.headers.token;

    //no token was provided
    if (!token) {
      return next({
        code: 400,
        message: 'No token provided.'
      });
    }

    tokenChecker.verify(token)
      .then(user => {
        //token is valid, assign payload to req
        //so subsequent routes have user id and roles information
        req.user = user;

        /*if we want or need more detail from db*/
        // User.findById(user.id)
        //   .then(user => {
        //     //check existence
        //     if(!user) {/**/}
        //     req.user = {
        //       /* add extra details here */
        //     };
        //   });

      })
      .catch(() => {
        return next({code: 403, error: 'invalid token'});
      });

  };
};
