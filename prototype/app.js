const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

//const mongoose = require('./api/mongodb');
const apiRoutes = require ('./api/routes/api_routes');



//Logging middleware
app.use(morgan('dev'));
//Bodyparser Middleware
//TODO evtl Middleware für formdata
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

//Add CORS header to every request
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization');
  //Add headers for OPTIONS requests
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    return res.status(200).json({})
  }
  //Call next middleware
  next();
})

//Set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

//Routes for handling requests
app.use('/api', apiRoutes);

//Catch all requests that dont match the routes
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
})

//Middleware gets called when anything produces an error
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app;
