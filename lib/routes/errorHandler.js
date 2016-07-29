function errorHandler (err, req, res, next) {
  console.log('got to the error handler');
  // console.log(err);
  // console.log(err.errors.DOB.message);
  res.status(err.status || 500).send({status: err.status || 500, error: err.message || err.error || err});
};

module.exports = errorHandler;
