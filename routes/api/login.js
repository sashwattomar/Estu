const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../model/User');
const UserModel = require('../../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');

//@route  Get api/auth
//@ desc  Test Route
//@acess  Public
//NOTE: the slash here corresponds to api/auth hence api/auth/xyz  ===  /xyz
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});
//@route  Post api/auth
//@ desc  Test Route
//@acess  Public
//NOTE: the slash here corresponds to api/auth hence api/auth/xyz  ===  /xyz
router.post(
  '/',
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;
    //SEE IF USER EXISTS
    try {
      let user = await UserModel.findOne({email});
      if (!user) {
        return res.status(400).json({error: [{msg: 'Invalid credentials'}]});
      }
      // IF USER IS FOUND
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({error: [{msg: 'Invalid credentials'}]});
      }
      // RETURN JSON WEB TOKEN

      // token consist of algo (pre defined),payload & secret (both user defined),callback
      const payload = {
        // payload is what we wish to send in token and it's written in object format
        user: {
          id: user.id, // id has id of current user
        },
      };
      //generating token
      jwt.sign(
        payload, // payload passed
        config.get('jwtTokenSecret'), //secret passed
        {expiresIn: 3600}, //optional and delas with expiration of token, change it to 3600 ie an hour
        (err, token) => {
          //callback
          if (err) throw err;
          res.json({token});
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);
module.exports = router;
