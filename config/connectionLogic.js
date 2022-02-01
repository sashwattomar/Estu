const mongoose = require('mongoose'); // library to use functions
const config = require('config');
const db = config.get('mongoURI'); // getting item from default.json

// to use this function in server.js write makeConnection() , after requiring the file
const makeConnection = async () => {
  try {
    //CONNECTING API WITH DATABASE
    await mongoose.connect(db, {useNewUrlParser: true}); // useNewUrlPaser is just to prevent mongodb warning
    console.log('mongodb connection successful');
  } catch (err) {
    console.error(err.message);
    //EXIT PROCESS WITH FAILURE
    process.exit(1);
  }
};
module.exports = makeConnection;
