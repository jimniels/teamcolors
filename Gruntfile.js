module.exports = function(grunt) {
    
    // Configure paths to assets
    var path = {
        all: 'assets',
        scripts: {
            src: 'src/scripts',
            build: 'assets/scripts'
        },
        styles: {
            src: 'src/css',
            build: 'assets/styles'
        },
        img: {
            src: 'src/img',
            build: 'assets/img'
        },
        data: {
            src: 'src/data',
            build: 'assets/data'
        },
        hbs: 'src/handlebars'
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        path: path,

        // Regular tasks
        clean: {
            options: {
                //'no-write': true
            },
            build: ['<%= path.all %>'],
            css: ['<%= path.styles.build %>'],
            scripts: ['<%= path.scripts.build %>'],
            data: ['<%= path.data.build %>']
        },

        compass: {
            build: { 
                options: {
                    sassDir: '<%= path.styles.src %>',
                    cssDir: '<%= path.styles.build %>',
                    imagesDir: '<%= path.img.build %>',
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
            build: {
                src: ['<%= path.scripts.src %>/**/*.js'],
                dest: '<%= path.scripts.build %>/scripts.js',
            }
        },

        uglify: {
            build: {
                files: {
                    '<%= path.scripts.build %>/scripts.min.js' : 
                    ['<%= path.scripts.build %>/scripts.js']
                }
            }
        },

        'merge-json': {
            build: {
                src: '<%= path.data.src %>/*',
                dest: '<%= path.data.build %>/team-colors.json'
            }
        },

        'compile-handlebars': {
            build: {
                template: '<%= path.hbs %>/index.hbs',
                templateData: '<%= path.data.build %>/team-colors-colorfied.json',
                output: '*.html',
                helpers: '<%= path.hbs %>/helpers/*.js',
                partials: '<%= path.hbs %>/partials/*.hbs'
            }
        },

        jshint: {
            build: [
                '<%= path.scripts.src %>/*.js', 
                '<%= path.data.src %>/*.json'
            ]
        },

        svgmin: {
            options: {
                // have to do this
                // https://github.com/svg/svgo/issues/352
                plugins: [{mergePaths: false}]
            },
            build: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= path.img.src %>/',
                        src: ['**/*.svg'],
                        dest: '<%= path.img.build %>/',
                        ext: '.min.svg'
                    }
                ]
            }
        },

        // Watch Tasks
        watch: {
            grunt: { 
                files: ['Gruntfile.js'],
                tasks: ['default']
            },
            data: {
                files: ['<%= path.data.src %>/*.json'],
                tasks: ['jshint', 'merge-json', 'colorify'] 
            },
            scripts: {
                files: ['<%= path.scripts.src %>/*.js'],
                tasks: ['clean:scripts', 'jshint', 'concat', 'uglify']
            },
            colorify: {
                files: ['src/grunt-tasks/colorify/**/*'],
                tasks: ['colorify']
            },
            handlebars: {
                files: [
                    '<%= path.hbs %>/**/*', 
                    '<%= path.data.build %>/team-colors-colorfied.json'
                ],
                tasks: ['compile-handlebars']
            },
            compass: {
                files: ['<%= path.styles.src %>/*'],
                tasks: ['clean:css', 'compass']
            },
            svgmin: {
                files: ['<%= path.img.src %>/**/*'],
                tasks: ['svgmin']
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
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadTasks('src/grunt-tasks/colorify');
    
    // Default task(s).
    grunt.registerTask('default', [
        'clean:build',
        'jshint',
        'concat',
        'uglify',
        'merge-json',
        'colorify',
        'compile-handlebars', 
        'svgmin',
        'compass',
        'watch'
    ]);
};