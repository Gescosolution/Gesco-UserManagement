// Controlador para funcionalidades de autenticación de usuarios
//--------------------------------------------------------------------

// **Autor:** Abel Josué Francisco Agra
// **Versión:** _0.1_

// El presente controlador incluye diversas funcionalidades que permiten asociar
// realizar el inicio y cierre de sesión en el sistema Gesco. Este Inicio de Sesión se realiza
// interactuando con un servidor Redis definido (y que puede extenderse a cualquier servidor
// centralizado de seguridad y credenciales instalado en alguna institución).

// Al iniciar sesión, se identifica, según los datos registrados en el servidor Redis, el cargo
// y la oficina a la que pertenece el usuario en la jerarquia de la empresa.

// La presente librería constituye un proyecto para la asignatura de Cloud Computing (CC),
// en el marco del Máster en Ingeniería Informática de la Universidad de Granada 2015-2016

// Cargar módulo de _Redis_
var redis = require('redis');

// Cargar módulo de Criptografia
var MD5 = require('crypto-js/md5');

// Cargar módulo de _MySQL_
var mysql = require('mysql');

/**
 * Controlador para las funcionalidades de iniciar/cerrar sesión
 */
module.exports.controller = function(app) {

	// Procesar solicitudes de tipo GET a la página de inicio del sistema
	app.get('/', function(req, res, next) {
  
  		// La pagina de inicio se encuentra en el directorio 'auth' de las vistas ('views')
		res.render('auth/auth', { title: 'GESCO - Iniciar Sesión' });
      
	});
  
  	// Para procesar solicitudes de cierre de sesión
	app.post('/close', function(req, res, next) {
	
		// Eliminar los datos de la sesión actual
		req.session.destroy();
		
		// Volver a página de inicio del sistema
		res.render('auth/auth', { title: 'GESCO - Iniciar Sesión', notificacion: 'Ha cerrado la sesión correctamente!' });
	});
  
	// Procesar solicitud de tipo Inicio de Sesión (acción '/login' en el formulario)
	app.post('/login', function(req, res, next) {
  
  		// Obtener valores de campos de texto del formulario
  		var username = req.body.username;
  		var password = req.body.password;
  
  		// Verificar que los campos ingresados no sean vacíos
		if((username === null || username.trim().length < 1) ||
		   (password === null || password.trim().length < 1)){
		
			res.render('auth/auth', { title: 'GESCO - Iniciar Sesión', error: 'El nombre de usuario y/o la contraseña NO pueden ser vacíos(as)' });
		
		} else {
		
			// Configurar conexion a servidor Redis
			// Incluida portabilidad con OpenShift
			redis_host = process.env.OPENSHIFT_REDIS_HOST || '127.0.0.1';
			redis_port = process.env.OPENSHIFT_REDIS_PORT || '6379';
			redis_passw = process.env.REDIS_PASSWORD || '';
			
			redis_url = "redis://:"+redis_passw+"@"+redis_host+":"+redis_port;
			
			// Crear cliente para acceder al servidor Redis
			redis_client = redis.createClient(redis_url, {});

			// Conectar a base de datos "2"
			redis_client.select(2, function(err) {
				if(err){
					console.log("[ERR] Error al iniciar cliente Redis y conectarse a base de datos especificada");
					console.log(err);
				} else {
				
					md5_password = MD5(password).toString();
						
					redis_client.hgetall(username, function(err, usuario_redis){
									
						redis_client.quit();
									
						if(usuario_redis === null || (typeof usuario_redis === 'undefined')){
						
							// La combinación de usuario/contraseña es incorrecta (no existe en servidor Redis)
    						res.render('auth/auth', { title: 'GESCO - Iniciar Sesión', error: 'La combinación de nombre de usuario y contraseña es incorrecta' });
						
						} else {

							if(usuario_redis.password === md5_password){
      							
      							// Buscar en base de datos rol Gesco correspondiente a cargo del usuario
      							// Incluida portabilidad con Openshift
      							var mysql_host = process.env.OPENSHIFT_MYSQL_DB_HOST || '127.0.0.1';
      							var mysql_port = process.env.OPENSHIFT_MYSQL_DB_PORT || '3306';
      							var mysql_database = "GESCO_USERMANAGEMENT";
      							var mysql_username = process.env.OPENSHIFT_MYSQL_DB_USERNAME || '';
      							var mysql_password = process.env.OPENSHIFT_MYSQL_DB_PASSWORD || '';
      							
      							// Definir conexión MySQL
      							var mysql_conn = mysql.createConnection({
      											 	host: mysql_host,
      											 	port: mysql_port,
      											 	database: mysql_database,
  													user     : mysql_username,
  													password : mysql_password
								});
 
 								// Conectar a base de datos MySQL
								mysql_conn.connect(function(err) {
  
  									if (err) {
  									
    									console.log("[ERR] Error al iniciar cliente MySQL y conectarse a base de datos especificada");
										console.log(err);
  									
  									} else {
  									
  										// Ejecutar consulta para determinar rol del usuario en ele sistema
  										mysql_conn.query('SELECT ROL_GESCO FROM ROL WHERE CARGO = ?', [usuario_redis.cargo], function (error, results, fields) {
  											
  											mysql_conn.end();
  											
  											if (err) {
  									
    											console.log("[ERR] Error al ejecutar consulta MySQL para seleccionar Rol del usuario");
												console.log(err);
  									
  											} else {  

												// Si el cargo del usuario se encuentra definido en la plataforma
												if(results !== null && results.length > 0){
      												
      												// Almacenar variables de sesion
      												req.session.username = username;
      												req.session.rol = results[0].rol_gesco;
      												req.session.oficina = usuario_redis.oficina;
      						
      												// Permitir acceso del usuario al sistema
      												res.render('general/main', { title: 'GESCO - Sistema de Gestión y Administración de Proyectos', username: req.session.username, rol: req.session.rol, oficina: req.session.oficina });
	
												} else {
												
													// El cargo del usuario en la empresa no concuerda un rol válido en el sistema
    												res.render('auth/auth', { title: 'GESCO - Iniciar Sesión', error: 'El cargo del usuario en la empresa no concuerda con ningún rol en la plataforma GESCO' });
													
												}
											}
										});
  									}
 
								});
								
							} else {
							
								// La combinación de usuario/contraseña es incorrecta (no existe en servidor Redis)
    							res.render('auth/auth', { title: 'GESCO - Iniciar Sesión', error: 'La combinación de nombre de usuario y contraseña es incorrecta' });
						
							}
						}
						
					});
						
				}
			});
			
		}
			
	});

};