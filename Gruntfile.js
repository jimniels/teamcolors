module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        compass: {
            dist: { 
                options: {
                    basePath: 'assets/css',
                    sassDir: 'src',
                    cssDir: 'build',
                    imagesDir: '../img/build',
                    outputStyle: 'compressed',
                    relativeAssets: true,
                    force: true
                }
            },
        },

        'compile-handlebars': {
            allStatic: {
                template: 'assets/templates/*.hbs',
                templateData: 'assets/data/nba.json',
                output: '*.html',
                helpers: 'assets/templates/helpers/*.js',
                partials: 'assets/templates/partials/*.hbs'
            }
        },

        jshint: {
            all: ['assets/scripts/src/js.js']
        },

        watch: {
            grunt: { 
                files: ['Gruntfile.js'],
                tasks: ['default']
            },
            handlebars: {
                files: ['assets/templates/**/*', 'assets/data/*.json'],
                tasks: ['compile-handlebars']
            },
            compass: {
                files: ['assets/css/src/*'],
                tasks: ['compass']
            },
            jshint: {
                files: ['assets/scripts/src/js.js'],
                tasks: ['jshint']
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-compile-handlebars');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task(s).
    grunt.registerTask('default', [
        'compass', 
        'compile-handlebars', 
        'jshint', 
        'watch'
    ]);

};