module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {   
		    dist: {
		        src: [
		        	'js/twitterFetcher.js',
		            "js/lib/iscroll-probe.js", // All JS in the libs folder
		        	'scrollmagic/minified/plugins/animation.gsap.min.js',
		        	'js/*.js',
		        
		        ],
		        dest: 'js/build/production.js',
		    }
		},
		uglify: {
		    build: {
		        src: 'js/build/production.js',
		        dest: 'js/build/production.min.js'
		    }
		},
		watch: {
			scripts: {
				options: {
			        livereload: true,
			    },
		        files: [
		        	'css/*.css',
		        	'index.html',
		        	'js/*.js',
		            'js/libs/*.js', // All JS in the libs folder
		            'js/libs/greensock/*.js',
		            'js/libs/greensock/easing/*.js',
		            'js/libs/greensock/plugins/*.js',
		            'js/libs/greensock/utils/*.js'],
		        tasks: ['concat', 'uglify'],
		        options: {
		            spawn: false,
		        },
		    } 
		}
    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify', 'watch']);

};