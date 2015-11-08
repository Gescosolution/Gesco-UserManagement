// Controlador para funcionalidades de autenticación de usuarios
//--------------------------------------------------------------------

// **Autor:** Abel Josué Francisco Agra
// **Versión:** _0.1_

// El presente controlador incluye diversas funcionalidades que permiten asociar
// realizar el inicio y cierre de sesión en el sistema Gesco. Este Inicio de Sesión se realiza
// interactuando con un servidor LDAP definido (y que puede extenderse a cualquier servidor
// centralizado de seguridad y credenciales instalado en alguna institución).

// Al iniciar sesión, se identifica, según los datos registrados en el servidor LDAP, el cargo
// y la oficina a la que pertenece el usuario en la jerarquia de la empresa.

// La presente librería constituye un proyecto para la asignatura de Cloud Computing (CC),
// en el marco del Máster en Ingeniería Informática de la Universidad de Granada 2015-2016

// Librería para conectar _nodejs_ con _OpenLDAP_
var ldap = require('ldapjs');

/**
 * Controlador para las funcionalidades de iniciar/cerrar sesión
 */
module.exports.controller = function(app) {

	// Procesar solicitudes de tipo GET a la página de inicio del sistema
	app.get('/', function(req, res, next) {
  
  		// La pagina de inicio se encuentra en el directorio 'auth' de las vistas ('views')
		res.render('auth/auth', { title: 'GESCO - Iniciar Sesión' })
      
	});
  
  	// Para procesar solicitudes de cierre de sesión
	app.post('/close', function(req, res, next) {
	
		// Eliminar los datos de la sesión actual
		req.session.destroy();
		
		// Volver a página de inicio del sistema
		res.render('auth/auth', { title: 'GESCO - Iniciar Sesión', notificacion: 'Ha cerrado la sesión correctamente!' })
	});
  
	// Procesar solicitud de tipo Inicio de Sesión (acción '/login' en el formulario)
	app.post('/login', function(req, res, next) {
  
  		// Obtener valores de campos de texto del formulario
  		var username = req.body.username;
  		var password = req.body.password;
  
  		// Verificar que los campos ingresados no sean vacíos
		if((username == null || username.trim().length < 1) ||
		   (password == null || password.trim().legth < 1)){
		
			res.render('auth/auth', { title: 'GESCO - Iniciar Sesión', error: 'El nombre de usuario y/o la contraseña NO pueden ser vacíos(as)' })
		
		} else {
		
			// Definir conexión con servidor LDAP
			var ldap_options = { url: 'ldap://127.0.0.1:3389/dc=localhost' };
			var ldap_conn = ldap.createClient(ldap_options);
			
			// Buscar usuario que solicita el inicio de sesión
			var filter_search = "&(objectClass=person)(sn="+username+")(userpassword="+password+")";
						
			var ldap_search_options = {
  				filter: filter_search,
  				scope: 'sub',
  				attributes: ['dn']
			};
			
			// Establecer conexión con servidor LDAP
			ldap_conn.bind('','', function (err) {
						
				if(err){
					console.log("[ERR] Error al autenticar con el servidor LDAP");
					console.log(err);
				} else {
				
					// Ejecutar búsqueda de usuario en LDAP
  					ldap_conn.search('dc=localhost', ldap_search_options, function (err, search) {
  					  						
  					  	var hayResult = false;
  					  	
  					  	// Si se ha encontrado alguna coincidencia en la búsqueda
    					search.on('searchEntry', function (entry) {
      				
      						hayResult = true;
      						
      						var user = entry.object;
      						
      						// Obtener oficina a partir de identificador distinguido del usuario en el LDAP
      						var user_dn_elems = user.dn.split(",");
      						var ofic_dn_elems = user_dn_elems[1].split("=");
      						
      						var oficina = ofic_dn_elems[1];
      						
      						// Buscar Rol del usuario encontrado
      						filter_search = "&(objectClass=organizationalRole)(roleOccupant="+user.dn+")";
						
							var ldap_search_options = {
  								filter: filter_search,
  								scope: 'sub',
  								attributes: ['cn']
							};
      						
  							ldap_conn.search('dc=localhost', ldap_search_options, function (err, search) {
  					  						
  					  			// Al encontrar el rol correspondiente
    							search.on('searchEntry', function (entry) {
      								var rol = entry.object.cn;
      						
      								// Almacenar variables de sesion
      								req.session.username = username;
      								req.session.rol = rol;
      								req.session.oficina = oficina;
      						
      								// Permitir acceso del usuario al sistema
      								res.render('general/main', { title: 'GESCO - Sistema de Gestión y Administración de Proyectos', username: req.session.username, rol: req.session.rol, oficina: req.session.oficina })
      							})
      						})
      						
    					});
    					
    					// La búsqueda no dió un resultado concreto
  						search.on('searchReference', function(referral) {
    						res.render('auth/auth', { title: 'GESCO - Iniciar Sesión', error: 'Error en el sistema. Intente más tarde.' })
  						});
  						
  						// Ocurrió un error al ejecutar la búsqueda
  						search.on('error', function(err) {
    						res.render('auth/auth', { title: 'GESCO - Iniciar Sesión', error: 'Error en el sistema. Intente más tarde.' })
  						});
  						
  						// Terminó la búsqueda en el LDAP
  						search.on('end', function(result) {
  							// Si no se encontraron resultados
  							if(!hayResult){
  							
  								// La combinación de usuario/contraseña es incorrecta (no existe en servidor LDAP)
    							res.render('auth/auth', { title: 'GESCO - Iniciar Sesión', error: 'La combinación de nombre de usuario y contraseña es incorrecta' })
    						}
  						});
  					});
  				}
			});
								
      	}
	});

}
