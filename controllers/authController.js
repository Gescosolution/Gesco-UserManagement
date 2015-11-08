var ldap = require('ldapjs');

/**
 * Controlador para la pagina de iniciar sesión
 */
module.exports.controller = function(app) {

	// Página de Inicio
	app.get('/', function(req, res, next) {
  
		res.render('auth/auth', { title: 'GESCO - Iniciar Sesión' })
      
	});
  
  	// Cerrar Sesión
	app.post('/close', function(req, res, next) {
		req.session.destroy();
		
		res.render('auth/auth', { title: 'GESCO - Iniciar Sesión', notificacion: 'Ha cerrado la sesión correctamente!' })
	});
  
	// Iniciar Sesión
	app.post('/login', function(req, res, next) {
  
  		var username = req.body.username;
  		var password = req.body.password;
  
		if((username == null || username.trim().length < 1) ||
		   (password == null || password.trim().legth < 1)){
		
			res.render('auth/auth', { title: 'GESCO - Iniciar Sesión', error: 'El nombre de usuario y/o la contraseña NO pueden ser vacíos(as)' })
		
		} else {
		
			var ldap_options = { url: 'ldap://127.0.0.1:3389/dc=localhost' };
			var ldap_conn = ldap.createClient(ldap_options);
			
			// Buscar usuario
			var filter_search = "&(objectClass=person)(sn="+username+")(userpassword="+password+")";
						
			var ldap_search_options = {
  				filter: filter_search,
  				scope: 'sub',
  				attributes: ['dn']
			};
			
			ldap_conn.bind('','', function (err) {
						
				if(err){
					console.log("[ERR] Error al autenticar con el servidor LDAP");
					console.log(err);
				} else {
  					ldap_conn.search('dc=localhost', ldap_search_options, function (err, search) {
  					  						
  					  	var hayResult = false;
  					  	
    					search.on('searchEntry', function (entry) {
      				
      						hayResult = true;
      						
      						var user = entry.object;
      						
      						var user_dn_elems = user.dn.split(",");
      						var ofic_dn_elems = user_dn_elems[1].split("=");
      						
      						var oficina = ofic_dn_elems[1];
      						
      						// Buscar Rol en empresa
      						filter_search = "&(objectClass=organizationalRole)(roleOccupant="+user.dn+")";
						
							var ldap_search_options = {
  								filter: filter_search,
  								scope: 'sub',
  								attributes: ['cn']
							};
      						
  							ldap_conn.search('dc=localhost', ldap_search_options, function (err, search) {
  					  						
    							search.on('searchEntry', function (entry) {
      								var rol = entry.object.cn;
      						
      								// Almacenar variables de sesion
      								req.session.username = username;
      								req.session.rol = rol;
      								req.session.oficina = oficina;
      						
      								res.render('general/main', { title: 'GESCO - Sistema de Gestión y Administración de Proyectos', username: req.session.username, rol: req.session.rol, oficina: req.session.oficina })
      							})
      						})
      						
    					});
    					
  						search.on('searchReference', function(referral) {
    						res.render('auth/auth', { title: 'GESCO - Iniciar Sesión', error: 'Error en el sistema. Intente más tarde.' })
  						});
  						
  						search.on('error', function(err) {
    						res.render('auth/auth', { title: 'GESCO - Iniciar Sesión', error: 'Error en el sistema. Intente más tarde.' })
  						});
  						
  						search.on('end', function(result) {
  							if(!hayResult){
    							res.render('auth/auth', { title: 'GESCO - Iniciar Sesión', error: 'La combinación de nombre de usuario y contraseña es incorrecta' })
    						}
  						});
  					});
  				}
			});
								
      	}
	});

}
