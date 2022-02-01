// Express code
const express = require('express'); // this server is an  express server
const app = express();
//Applying CORS
//using CORS
const cors = require('cors');
app.use(cors());
// CONNECTING API AND DATABASE
const makeConnection = require('./config/connectionLogic');
makeConnection();
//INIT MIDDLEWARE FOR RECEVING DATA IN REQ.BODY
app.use(express.json({extended: false}));
app.use(express.static('public'));
//DEFINING ROUTES
app.use('/api/login', require('./routes/api/login')); // Requiring the auth route using api/auth as th end point
app.use('/api/register', require('./routes/api/register'));
app.use('/api/profile', require('./routes/api/profile'));

// Creating a port to acess this server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(` server running on ${PORT} `);
});
