'use strict';

module.exports = function(grunt) {

	// Configuraci—n del proyecto
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		auto_install: {
    		local: {},
    		subdir: {
      			options: {
        			cwd: 'subdir',
        			stdout: true,
        			stderr: true,
        			failOnError: true,
        			bower: false,
        			npm: '--production'
      			}
    		}
  		},
  		docco: {
			debug: {
	  			src: ['app.js','controllers/*.js','test/*.js'],
	  			options: {
		  			output: 'docs/'
	  			}
  			}
		}
	
	});

	// Carga el plugins de grunt para ejecutar tareas adicionales
	grunt.loadNpmTasks('grunt-docco');
	grunt.loadNpmTasks('grunt-auto-install');

	// Tarea 'install': instalar dependencias del proyecto
	grunt.registerTask('install', ['auto_install']);
	
	// Tarea 'doc': generar la documentaci—n del c—digo
	grunt.registerTask('doc', ['docco']);
	
	// Tarea por omisi—n: instalar dependencias y generar documentaci—n
	grunt.registerTask('default', ['auto_install', 'docco']);

};