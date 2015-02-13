var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var routes = require('./routes/index');
var users = require('./routes/users');
var socket = require('./routes/socket');

var app = express();
var userHash = {};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/users', users);
app.use('/', socket);


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


var server = require('http').createServer(app);
// .listen(3000);
// var io = require('socket.io').listen(server);
server.listen(3000);
var io = require('socket.io').listen(server, { origins: '*:*' });

// io.set('origins', 'http://172.16.0.2:3000');

// console.log(19);
io.on('connection', function(skt){

	// skt.emit('publish', {value: "string"});
	// skt.emit('connect', {value: "conect"});
	console.log(skt.handshake.address);

	skt.on('broad', function(data) {
		console.log('broadcasting');
		// skt.broadcast.emit('br_recive', {value: 'broad data'});
		skt.broadcast.emit('br_recive', {value: data.value});
		skt.emit('br_recive', {value: data.value});
		// skt.emit('br_recive', {value: 'broad data'});
	});

	skt.on('connected', function() {
		console.log('connected');
		skt.emit('publish', {value: "string"});
	});

	skt.on('disconnect', function(){
		console.log("disconnected");
	});

});

// io.sockets.on('connection', function(skt) {
// 	skt.on('connected', function(name) {
// 		var msg = name + "さんが入室されました";
// 		userHash[skt.id] = name;
// 		io.sockets.emit("publish", {value: msg});
// 	});
//
//
// 	skt.on("disconnect", function () {
//     if (userHash[skt.id]) {
//       var msg = userHash[skt.id] + "が退出しました";
//       delete userHash[skt.id];
//       io.sockets.emit("publish", {value: msg});
//     }
//   });
// });

