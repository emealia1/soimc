module.exports = function(grunt) {
    grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: [
					'js/raw/*.js'
				],
				dest: 'js/<%= pkg.name %>.js'
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
				base: '',
				user: {
					name: 'Kyle Kinnaman',
					email: 'kyle.kinnaman@ksuwdc.com'
				}
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
				src: '<%= concat.dist.dest %>',
				dest: 'js/soimc.min.js'
			}
		}, watch: {
			css: {
				files: ['css/raw/*.css'],
				tasks: ['concat', 'cssmin', 'gh-pages'],
				options: {
					livereload: true,
					spawn: false
				}
			},
			js: {
				files: ['js/raw/*.js'],
				tasks: ['concat', 'uglify', 'gh-pages'],
				options: {
					livereload: true,
					spawn: false
				}
			}
		}
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-gh-pages');
	grunt.loadNpmTasks('grunt-styleguide');
	grunt.registerTask('default', ['imagemin', 'concat', 'uglify', 'cssmin', 'gh-pages']);
};
