(function () {
   'use strict';

module.exports = function(grunt) {

	// Configuraci—n de actividades o tareas recurrentes en el proyecto
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
  		// Concatenar archivos JS
		concat: {
  			options: {
  				// Definir una cadena de caracteres a colocar entre cada archivo de la lista concatenada
    			separator: ';'
  			},
  			dist: {
    			// Los archivos a concatenar
    			src: ['app.js','controllers/*.js','lib/*.js'],
    			// La ubicaci—n del archivo JS resultante (concatenado)
    			dest: 'dist/<%= pkg.name %>.js'
  			}
		},
		// Minimizar archivos JS
		uglify: {
  			options: {
  				// El 'banner' es colocado al principio del archivo resultante
    			banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
  			},
  			dist: {
    			files: {
      				'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
    			}
  			}
		},
		// Analizar sint‡cticamente el c—digo JS
		jshint: {
  			// Definir los archivos a los que aplicar el an‡lisis
  			all: ['Gruntfile.js','app.js','controllers/*.js','lib/*.js','test/**/*.js']
		},
		// Aplicar acciones cuando algunos archivos cambien
		watch: {
  			files: ['<%= jshint.files %>'],
  			tasks: ['jshint']
		},
    	mochaTest: {
      		test: {
        		options: {
          			reporter: 'spec' 
        		},
        		src: ['test/**/*.js']
      		}
    	},
  		docco: {
			debug: {
	  			src: ['app.js','controllers/*.js','lib/*.js','test/**/*.js'],
	  			options: {
		  			output: 'docs/'
	  			}
  			}
		}
	
	});

	// Carga el plugins de grunt para ejecutar tareas adicionales
	grunt.loadNpmTasks('grunt-docco');
	grunt.loadNpmTasks('grunt-auto-install');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-mocha-test');

	// Tarea 'install': instalar dependencias del proyecto
	grunt.registerTask('install', ['auto_install']);
	
	// Tarea 'doc': generar la documentaci—n del c—digo
	grunt.registerTask('doc', ['docco']);
	
	// Tarea 'concat': concatenar archivos JS
	grunt.registerTask('unify', ['concat']);
	
	// Tarea 'minify': minimizar archivos JS
	grunt.registerTask('minify', ['uglify']);
	
	// Tarea 'check': analizar sint‡cticamente archivos JS
	grunt.registerTask('check', ['jshint']);
	
	// Tarea 'watch': supervisar cambios en archivos JS
	grunt.registerTask('verify', ['watch']);
	
	// Tarea 'test': aplicar pruebas unitarias definidas
	grunt.registerTask('test', ['mochaTest']);
	
	// Tarea por omisi—n: ejecutar en orden todas las actividades definidas
	grunt.registerTask('default', ['auto_install', 'docco', 'concat', 'minify', 'check', 'test']);

};

}());