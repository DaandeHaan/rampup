const jwt = require('jsonwebtoken');
const authService = require('../services/authService');
const accountService = require('../services/accountService');

const userAuthDTO = require('../dtos/Auth/userAuthDTO');
const ErrorException = require("../ErrorException");

module.exports = function authenticateToken(req, res, next) {
    const token = req.cookies.token;

    if (token == null) throw new ErrorException(401, 'Unauthorized');
    
    jwt.verify(token, process.env.JWT_KEY, async (err, user) => {
      if (err) 
        throw new ErrorException(401, 'Invalid token');

      // TODO: add refresh token logic so we use getAccountById for every call
      // Search for better solutions
      req.user = new userAuthDTO(await accountService.getAccountById(user.accountID));

      res.cookie('token', authService.generateToken(req.user), {
        httpOnly: true,
        maxAge: 60 * 60 * 1000
      })

      next();
    });
  };
