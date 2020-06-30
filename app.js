require('./db');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/indexx');
var users = require('./routes/users');
var read = require('./routes/read');
// var rTest = require('./routes/requiretest');

var app = express();
// view engine setup
// console.log(path.join(__dirname, 'views'));//C:\Users\Administrator\test\test1\views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Allow router to access db
// app.use(function(req,res,next){
//     req.db = db;  //db = monk('localhost:27017/test1');
//     next();
// });

// var admin = express();

// admin.on('mount', function (parent) {
//   console.log('Admin Mounted');
//   // console.log(parent); // refers to the parent app
// });

// admin.get('/', function (req, res) {
//   res.send('Admin Homepage');
// });
// app.use('/admin', admin);

app.use('/', routes);
app.use('/users', users);
app.use('/read', read);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// app.listen(3001, function () {
//   console.log('Example app listening on port 3001!');
// });
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      errorCode: err.status
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log("middleware loaded");
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    errorCode: err.status
  });
});


module.exports = app;
