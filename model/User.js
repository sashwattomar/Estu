//This is for user registration
const mongoose = require('mongoose');

// using schema function of mongoose to create a schema for mongodb
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, //NOTE
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    // avatar depending on email
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
// CREATING USER MODEL FOR REGISTER.JS
const User = mongoose.model('user', UserSchema); //user is termed as model name and UserSchema is schema name
module.exports = User;
