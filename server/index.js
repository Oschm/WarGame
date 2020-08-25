var express = require('express');
var bodyParser  = require('body-parser');
require('dotenv').config()
var app = express();
var isProduction = process.env.NODE_ENV === "development" ? false : true;


const listenerPort = process.env.PORT;
app.listen(listenerPort);
console.log("Listening under Port: " + listenerPort);


// middleware
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());

app.use(require('./routes'));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error(`Route ${req.route} Not Implemented`);
    err.status = 404;
    next(err);
  });

  /// error handlers

  // development error handler
  // will print stacktrace
  if (!isProduction) {
    app.use(function(err, req, res, next) {
      console.log(err.stack);

      res.status(err.status || 500);

      res.json({'errors': {
        message: err.message,
        error: err
      }});
    });
  }