// Programa de Pruebas (con aserciones y _mocha_) para submódulo de gestión de Usuarios y Empleados en Gesco
//----------------------------------------------------------------------------------------------------------

// **Autor:** Abel Josué Francisco Agra
// **Versión:** _0.1_

// El presente programa permite ejecutar algunas funcionalidades asociadas a la autenticación en el 
// sistema Gesco, registro de empleados y gestión de usuarios, utilizando el módulo de aserciones 
// de _node.js_ y _mocha_

// Las pruebas incluidas se aplican, principalmente, sobre la implementación de los controladores del 
// proyecto

// El presente programa constituye un proyecto para la asignatura de Cloud Computing (CC),
// en el marco del Máster en Ingeniería Informática de la Universidad de Granada

// Cargar modulos para definir aserciones/pruebas
var assert = require('assert');
var should = require('should');
var request = require('supertest');

// Cargar aplicación principal
var app = require('../app.js');

/*****************************************************************/
/* Autenticación 												 */
/* 																 */
/* Funcionalidades para el inicio de sesión y cierre de sesión.  */
/*****************************************************************/

// Cargar módulo de _redis_ (interacción _Redis_ y _node.js_)
var redis = require('redis');

// Cargar módulo de _crypto-js/md5_ (encriptar cadenas de caracteres en formato _MD5_)
var MD5 = require('crypto-js/md5');

// Cargar módulo de _mysql_ (interacción _MySQL_ y _node.js_)
var mysql = require('mysql');

// Cargar funcionalidades del controlador de autenticación Gesco
var auth = require('../controllers/authController.js');

// Grupo de pruebas sobre carga de librerías y módulos de autenticación
describe('Auth_Carga_Tests', function(){

	// Verifica que se haya cargado correctamente el módulo de interacción
	// de node.js con el servidor Redis
	describe('Auth_Carga_Redis', function(){
		it('Cargando módulo redis...', function(){
			assert(redis, "Carga de Módulo Exitosa!!!");
		});

	});
	
	// Verifica que se haya cargado correctamente el módulo de encriptación
	// de cadenas de caracteres MD5
	describe('Auth_Carga_Crypto-MD5', function(){
		it('Cargando módulo crypto-js/md5...', function(){
			assert(MD5, "Carga de Módulo Exitosa!!!");
		});

	});
	
	// Verifica que se haya cargado correctamente el módulo de interacción
	// de node.js con el servidor MySQL
	describe('Auth_Carga_MySQL', function(){
		it('Cargando módulo mysql...', function(){
			assert(mysql, "Carga de Módulo Exitosa!!!");
		});

	});

	// Verifica que se haya cargado correctamente el controlador con 
	// las funcionalidades de autenticación
	describe('Auth_Carga_Controlador', function(){
		it('Cargando controlador (funcionalidad) de autenticación...', function(){
			assert(auth, "Carga de Controlador Exitosa!!!");
		});

	});
});

// Grupo de pruebas sobre funcionalidades de autenticación
describe('Auth_Func_Tests', function(){

	// Prueba de presentación inicial del sistema
	describe('Presentacion_Pagina_Inicio', function(){
		it('Presentando Página Inicial Gesco...', function(done){
    		request(app)
      		.get('/')
      		.expect(200)
      		.end(function(err, res){
      			if (err) {
            		return done(err);
          		}
      			res.text.should.match(/<h4 class="form-signin-heading">Introduzca Usuario y Contraseña/);
      			done();
      		});
		});
	});
	
	// Prueba de ingreso vacío de username
	describe('Ingresar_Username_Vacio', function(){
		it('Ingresando Username en blanco...', function(done){
    		request(app)
      		.post('/login')
      		.send({ username: "", password: "password" })
      		.expect(200)
      		.end(function(err, res){
      			if (err) {
            		return done(err);
          		}
      			res.text.should.match(/<span class="error">El nombre de usuario/);
      			res.text.should.match(/NO pueden ser/);
      			done();
      		});
		});
	});
	
	// Prueba de ingreso vacío de password
	describe('Ingresar_Password_Vacio', function(){
		it('Ingresando Contraseña en blanco...', function(done){
    		request(app)
      		.post('/login')
      		.send({ username: "username", password: null })
      		.expect(200)
      		.end(function(err, res){
      			if (err) {
            		return done(err);
          		}
      			res.text.should.match(/<span class="error">El nombre de usuario/);
      			res.text.should.match(/NO pueden ser/);
      			done();
      		});
		});
	});
	
	// Prueba de ingreso vacío de username y password
	describe('Ingresar_Username_Password_Vacio', function(){
		it('Ingresando Username y Password en blanco...', function(done){
    		request(app)
      		.post('/login')
      		.send({ username: "  ", password: null})
      		.expect(200)
      		.end(function(err, res){
      			if (err) {
            		return done(err);
          		}
      			res.text.should.match(/<span class="error">El nombre de usuario/);
      			res.text.should.match(/NO pueden ser/);
      			done();
      		});
		});
	});
	
	// Prueba de ingreso de combinacion incorrecta de username/password
	describe('Ingresar_Username_Password_Incorrectos', function(){
		it('Ingresando Combinación de Username y Password incorrecta/inválida...', function(done){
    		request(app)
      		.post('/login')
      		.send({username: "usuario1", password: "usuario2"})
      		.expect(200)
      		.end(function(err, res){
      			if (err) {
            		return done(err);
          		}
      			res.text.should.match(/<span class="error">La combinaci/);
      			res.text.should.match(/n de nombre de usuario y/);
      			res.text.should.match(/es incorrecta/);
      			done();
      		});
		});
	});
	
	// Prueba de ingreso de usuario correcto pero con un rol invalido en la plataforma
	describe('Ingresar_Rol_Incorrecto', function(){
		it('Ingresando usuario con Cargo/Rol inválido...', function(done){
    		request(app)
      		.post('/login')
      		.send({username: "usuario8", password: "usuario8"})
      		.expect(200)
      		.end(function(err, res){
      			if (err) {
            		return done(err);
          		}
      			res.text.should.match(/<span class="error">El cargo del usuario en la empresa no concuerda con/);
      			res.text.should.match(/rol en la plataforma GESCO/);
      			done();
      		});
		});
	});
	
	// Prueba de ingreso de combinacion correcta de username/password
	describe('Ingresar_Username_Password_Correctos', function(){
		it('Ingresando Combinación de Username y Password correcta/válida...', function(done){
    		request(app)
      		.post('/login')
      		.send({username: "usuario1", password: "usuario1"})
      		.expect(200)
      		.end(function(err, res){
      			if (err) {
            		return done(err);
          		}
      			res.text.should.match(/<h3>GESCO - Bienvenido 'usuario1', su rol es 'Lider', y su oficina es 'Oficina1'/);
      			done();
      		});
		});
	});
	
	// Prueba de cierre de sesión
	describe('Cerrar_Sesion', function(){
		it('Cerrando Sesión actual en el sistema...', function(done){
    		request(app)
      		.post('/close')
      		.expect(200)
      		.end(function(err, res){
      			if (err) {
            		return done(err);
          		}
      			res.text.should.match(/<span class="ok">Ha cerrado la sesi/);
      			res.text.should.match(/n correctamente!/);
      			done();
      		});
		});
	});
	
});