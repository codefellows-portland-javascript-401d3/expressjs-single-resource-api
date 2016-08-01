module.exports = function() {
  return function parser(request, response, next) {
    let body = '';
    request.on('data', d => body += d);
    request.on('end', () => {
      let item = null;
      try {
        item = JSON.parse(body);
      }
      catch (err) {
        return next ('invalid JSON');
      }
      request.body = item;
      next();
    });
  };
};

// function json () {
//   return function parser (request, response, next) {
//     let body = '';
//     request.on('data', book => body += book);
//     request.on('end', () => {
//       let item = null;
//       try {
//         item = JSON.parse(body);
//       }
//       catch (err) {
//         return next ('invalid JSON');
//       }
//       request.body = item;
//       next();
//     });
//   };
// }
//
// exports.json = json;
//
// // no way to check this one for a match...
