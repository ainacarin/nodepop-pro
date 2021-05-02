
const jwt = require('jsonwebtoken');

const User = require('../models/User');

class AuthController {
    async post(req, res, next) {
        try {
          console.log(req.body);
          const { email, password } = req.body;
          console.log(email, password);
    
          const userDb = await User.findOne({ email: email });
          console.log(userDb);
    
          if (!userDb || !await userDb.comparePassword(password)) {  
            const error = new Error('invalid credentials');
            error.status = 401;
            next(error);
            return;
          }
    
          jwt.sign({ _id: userDb.id }, '20+(gokuvegeta)dragon-ball+21', { expiresIn: '2h'}, (error, jwtToken) => {
            if(error) {
                next(error);
                return;
              }
              res.json({ token: jwtToken });
          });
          
          // devolverlo al cliente
    
        } catch (error) {
          next(error);
        }
      }

};

// create instance
module.exports = new AuthController();