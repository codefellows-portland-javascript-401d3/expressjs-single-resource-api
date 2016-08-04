function notFound (req, res) {
  console.log('got to the not-found handler');
  res.status(404).send({error: `${req.url} does not exist`, status: 404});
};

module.exports = notFound;
