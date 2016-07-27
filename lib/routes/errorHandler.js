function errorHandler (err, req, res, next) {
  console.log('got to the error handler');
  res.status(500).send({status: 500, error: err.error || err.message || err});
};

module.exports = errorHandler;
