var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var routes = require('./routes/index');
var chat = require('./routes/chat');
var enter = require('./routes/enter');
var create = require('./routes/create');
var public_enter = require('./routes/public_enter')


var app = express();
var userHash = {};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/', chat);
app.use('/', enter);
app.use('/', create);
app.use('/', public_enter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
		});
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;




var server = require('http').createServer(app).listen(process.env.PORT || 3000);
var io = require('socket.io').listen(server);

// if you want validate CORS
// io.set('origins', 'http://172.16.0.2:3000');

var socket = require('./my_modules/socket');

//mulicasting logic
socket.socketing(io);

