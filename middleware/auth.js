const jwt = require('jsonwebtoken');
const config = require('config');
// MIDDLEWARE FUNCTION
module.exports = function async(req, res, next) {
  //  GET TOKEN FROM HEADER WHICH WAS SENT TO HEADER
  const token = req.header('x-auth-token');
  //CHECK TOKEN
  if (!token) {
    return res.status(401).json({msg: 'No token , authorization denied'});
  }
  //   VERIFY TOKEN
  try {
    const decoded_token = jwt.verify(token, config.get('jwtTokenSecret'));
    req.user = decoded_token.user; //req.user is a variable which can be used inside any route where this middleware is used
    //to exit middleware
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).send('Token is not valid');
  }
};
