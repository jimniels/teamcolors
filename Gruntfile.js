module.exports = function(grunt) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        // Regular tasks
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

        concat: {
            options: {
                separator: ';\n',
            },
            dist: {
                src: ['assets/js/src/*'],
                dest: 'assets/js/build/js-concat.js',
            }
        },

        uglify: {
            js: {
                files: {
                    'assets/js/build/js-min.js' : ['assets/js/build/js-concat.js']
                }
            }
        },

        'merge-json': {
            teamColors: {
                src: 'assets/data/src/*',
                dest: 'assets/data/build/team-colors.json'
            }
        },

        'compile-handlebars': {
            allStatic: {
                template: 'assets/templates/index.hbs',
                templateData: 'assets/data/build/team-colors-colorfied.json',
                output: '*.html',
                helpers: 'assets/templates/helpers/*.js',
                partials: 'assets/templates/partials/*.hbs'
            }
        },

        jshint: {
            all: [
                'assets/js/src/js.js', 
                'assets/data/src/*'
            ]
        },

        // Watch Tasks
        watch: {
            grunt: { 
                files: ['Gruntfile.js'],
                tasks: ['default']
            },
            jshint: {
                files: [
                    'assets/js/src/js.js',
                    'assets/data/src/*'
                ],
                tasks: ['jshint', 'merge-json', 'colorify']
            },
            scripts: {
                files: ['assets/js/src/*'],
                tasks: ['jshint', 'concat', 'uglify']
            },
            colorify: {
                files: ['assets/grunt-tasks/colorify/**/*'],
                tasks: ['colorify']
            },
            handlebars: {
                files: [
                    'assets/templates/**/*', 
                    'assets/data/build/team-colors-colorfied.json'
                ],
                tasks: ['compile-handlebars']
            },
            compass: {
                files: ['assets/css/src/*'],
                tasks: ['compass']
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-compile-handlebars');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-merge-json');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadTasks('assets/grunt-tasks/colorify');
    
    // Default task(s).
    grunt.registerTask('default', [
        'jshint',
        'concat',
        'uglify',
        'merge-json',
        'colorify',
        'compile-handlebars', 
        'compass', 
        'watch'
    ]);
};