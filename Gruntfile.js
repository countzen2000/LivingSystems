module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {   
		    dist: {
		        src: [
		        	'js/*.js',
		            'js/libs/*.js', // All JS in the libs folder
		            'js/libs/greensock/*.js',
		            'js/libs/greensock/easing/*.js',
		            'js/libs/greensock/plugins/*.js',
		            'js/libs/greensock/utils/*.js',
		        ],
		        dest: 'js/build/production.js',
		    }
		},
		uglify: {
		    build: {
		        src: 'js/build/production.js',
		        dest: 'js/build/production.min.js'
		    }
		}
    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify']);

};