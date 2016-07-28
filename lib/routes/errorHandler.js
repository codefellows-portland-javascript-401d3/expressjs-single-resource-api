function errorHandler (err, req, res, next) {
  console.log('got to the error handler');
  console.log(err.errors.year.message);
  res.status(err.status || 500).send({status: err.status || 500, error: err.error || err.message || err});
};

module.exports = errorHandler;
