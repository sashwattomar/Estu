const express = require('express');
const router = express.Router();
//CREATING A DOCUMENT REQUIRES THE USE OF MODEL THUS IMPORTING USERS MODEL
const UserModel = require('../../model/User');
// FOR ACESSING USERS GRAVATAR
const gravatar = require('gravatar');
// ENCRYPT PASSWORD
const bcrypt = require('bcryptjs');
//FOR GENERATING JSON WEB TOKEN
const jwt = require('jsonwebtoken');
//FOR ACESSING JWT SECRET
const config = require('config');
const {check, validationResult} = require('express-validator');
// const normalize = require('normalize-url');
router.post(
  '/',
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({min: 6}),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    // DESTRUCTURING FROM THE USER USER.BODY
    const {name, email, password} = req.body;
    try {
      // SEE IF USER EXISTS
      let user = await UserModel.findOne({email});
      // IF USER allredy EXIST
      if (user) {
        return res.status(400).json({error: {msg: 'User allredy exists'}});
      }
      // IF USER DOES NOT EXIST =>

      //GET USER GRAVATAR
      const avatar = gravatar.url(email, {
        s: '200', // size of avatar
        r: 'pg',
        d: 'mm', //default avatar
      });
      //CREATE A NEW USER TO BE SAVED IN DATABASE BUT NOT YET SAVED
      user = new UserModel({
        name,
        email,
        avatar,
        password, // yet not encrypted
      });
      //ENCRYPT PASSWORD
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      //SAVING INSTANCE OR SAVING DOCUMENT
      await user.save(); //a  promise will be returned

      //GENERATING AND RETURN JSONWEBTOKEN WHICH IS  SENT TO HEADER
      const payload = {
        // this is used in auth.js for decoding
        user: {
          id: user._id, // this user is same waht declared above
        },
      };
      jwt.sign(
        payload,
        config.get('jwtTokenSecret'),
        {expiresIn: 36000}, // this is in mil second
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({token}); // token returned to client
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);
module.exports = router;
