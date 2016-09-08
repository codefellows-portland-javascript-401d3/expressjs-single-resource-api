module.exports = function getConfirmRole(role) {
  return function ensureRole(request, response, next) {
    if (request.user.roles.indexOf(role) !== -1) {
      next();
    }
    else {
      return next({code: 403, error: 'You don\'t have permission to view this page.'});
    }
  };
};
