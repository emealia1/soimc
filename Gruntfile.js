module.exports = function(grunt) {
    grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			dist: {
				src: [
					'js/carousel.js',
					'js/fastclick.js',
					'js/main.js',
					'js/polyfill.js'
				],
				dest: 'js/soimc.js'
			}
		}, cssmin: {
			minify: {
				expand: true,
				cwd: 'css/raw/',
				src: ['*.css', '!*.min.css'],
				dest: 'css/',
				ext: '.min.css'
			}
		}, 'gh-pages': {
			options: {
			  base: ''
			},
			src: ['**']
		}, imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'images/raw/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'images/'
				}]
			}
		}, styleguide: {
			options: {
			},
			your_target: {
				options: {
				},
				files: {
				}
			}
		},uglify: {
			build: {
				src: 'js/soimc.js',
				dest: 'js/soimc.min.js'
			}
		}, watch: {
			scripts: {
				files: ['js/*.js'],
				tasks: ['concat', 'uglify'],
				options: {
					spawn: false
				}
			}
		}
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-gh-pages');
	grunt.loadNpmTasks('grunt-styleguide');
	grunt.registerTask('default', ['imagemin', 'concat', 'uglify', 'cssmin', 'styleguide', 'gh-pages']);
};
