module.exports = function () {
  return function dateParser (req, res, next) {
    if (!req.body.DOB) {
      next({status: 400, message: 'No DOB provided.'});
    } else {
      const today = new Date();
      const birthDate = new Date(req.body.DOB);
      const age = today.getFullYear() - birthDate.getFullYear();
      const month = today.getMonth() - birthDate.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      req.body.age = age;
    }
    next();
  };
};
