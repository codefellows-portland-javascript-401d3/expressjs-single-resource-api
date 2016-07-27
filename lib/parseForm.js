const formidable = require('formidable');
  
module.exports = function parseForm(req, res, next) {
  return new Promise((resolve, reject) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if(fields === "") {
        reject({error: `No match for a name change`});
      } else {
        resolve(fields);
        next();
      }
    });  
  });
};
  