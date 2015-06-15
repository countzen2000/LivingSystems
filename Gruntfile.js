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
		imagemin: {
			dynamic: {
		        files: [{
		            expand: true,
		            cwd: 'resources/images/',
		            src: ['**/*.{png,jpg,gif}'],
		            dest: 'build/resources/images/'
		        },{
		        	expand: true,
		            cwd: 'sub/resources/images/',
		            src: ['**/*.{png,jpg,gif, jpeg}'],
		            dest: 'sub/build/resources/images/'
		        }]
		    }
		},
		/*cssmin: {
			  target: {
			    files: [{
			      expand: true,
			      cwd: 'release/css',
			      src: ['*.css', '!*.min.css'],
			      dest: 'release/css',
			      ext: '.min.css'
			    }]
			  }
			},*/
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
		            'js/libs/greensock/utils/*.js',
		            'sub/resources/images/*',
		            'resources/images/*'],
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
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify', 'imagemin', 'watch']);

};