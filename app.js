// Programa principal de Submódulo de Gestión de Usuarios/Empleados de Gesco
//--------------------------------------------------------------------------

// **Autor:** Abel Josué Francisco Agra
// **Versión:** _1.0_

// Programa inicial para ejecutar el submódulo de administración de datos de usuarios
// y empleados de la aplicación Gesco.

// Carga todos los módulos y librerías requeridas en la implementación de la aplicación, así
// como la configuración inicial y general del sistema.

// El presente programa constituye un parte de un proyecto para la asignatura de Cloud Computing (CC),
// en el marco del Máster en Ingeniería Informática de la Universidad de Granada 2015-1016

// Incluir módulos requeridos
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

// Activar manejo de sesión en express
var random_str = randomstring.generate();
app.use(cookieParser());
app.use(session({secret: random_str,resave: true, saveUninitialized: true}));

// Configuración del motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

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

// Identificar error 404 y re-dirigir al manejador de errores
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Manejadores de errores

// Desarrollo
// Imprime completamente cadena de errores
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('general/error', {
      message: err.message,
      error: err
    });
  });
}

// Producción
// La cadena de errores no se muestra al usuario
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('general/error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
