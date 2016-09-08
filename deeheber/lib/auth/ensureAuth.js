const tokenChecker = require('./token');

module.exports = function getEnsureAuth(){
  return function(req, res, next){
    const token = req.headers.token;

    if(!token){
      return next({code: 400, error: 'No token provided'});
    }

    tokenChecker.verify(token)
      .then(user =>{
        req.user = user;
        next();
      })
      .catch(()=>{
        return next({code: 403, error: 'Invalid token'});
      });
  };
};
