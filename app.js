var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Para cargar dinamicamente los archivos de controladores
var fs = require('fs');

// Para generar cadenas de caracteres aleatorias
var randomstring = require('randomstring');

// Para manejo de sesiones en Express
var session = require('express-session');

var app = express();

// Activar sesion de express
var random_str = randomstring.generate();
app.use(cookieParser());
app.use(session({secret: random_str,resave: true, saveUninitialized: true}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Incluir dinamicamente Rutas (Controladores)
fs.readdirSync('./controllers').forEach(function (file) {

	if(file.substr(-3) == '.js') {
    	routes = require('./controllers/' + file);
      	routes.controller(app);
  	}
  	
});

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
    res.render('general/error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('general/error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
