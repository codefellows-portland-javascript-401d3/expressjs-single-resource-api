module.exports = function(err,req,res,next) {
  if (err) {
    res.status(err.status || 400);
    res.json(err);
    if(next) next(err);
  } else {
    if(next) next();
  }
};