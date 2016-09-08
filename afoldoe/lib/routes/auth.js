const router = require(`express`).Router();
const bodyParser = require(`body-parser`).json();
const User = require(`../models/user`);
const token = require(`../auth/token`);


router

  .post(`/signup`, bodyParser, (req, res, next) => {
    const {name, password} = req.body;    
    delete req.body.password;

    User.find({name})
      .count()
      .then(count => {
        if(count > 0) throw {
          code: 400,
          error: `User ${name} already exists.`
        };
        const user = new User(req.body);
        user.newHash(password);
        return user.save();
      })
       .then(user => {
         return token.sign(user);
       })
       .then(token => {
         res.send({token});
       })
      .catch(next);
  })
  
  .post(`/signin`, bodyParser, (req, res, next) => {
    const {name, password} = req.body;
    delete req.body.password;
    
    User.findOne({name})
      .then(user => {
        if(!user || !user.compareHash(password)) throw {
          code: 400, error: `The username or password is invalid.`
        };
        return token.sign(user);
      })
       .then(token => {
         res.send({token});
       })
       .catch(next);  
  });

module.exports = router;



