module.exports = function getEnsureRole(role){

  return function ensureRole(req, res, next){

    if(req.user.roles.indexOf(role) !== -1){
      next();
    } else {
      return next({code: 403, error: 'You don\'t have permission to view this page.'});
    }
  };
};
