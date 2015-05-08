module.exports = function(grunt) {
    
    // Configure paths to assets
    var config = {
        all: 'assets',
        js: {
            src: 'src/js',
            build: 'assets/js'
        },
        css: {
            src: 'src/css',
            build: 'assets/css'
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
        config: config,

        // Regular tasks
        clean: {
            options: {
                //'no-write': true
            },
            build: ['<%= config.all %>'],
            css: ['<%= config.css.build %>'],
            js: ['<%= config.js.build %>'],
            data: ['<%= config.data.build %>']
        },

        compass: {
            build: { 
                options: {
                    sassDir: '<%= config.css.src %>',
                    cssDir: '<%= config.css.build %>',
                    imagesDir: '<%= config.img.build %>',
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
                src: ['<%= config.js.src %>/*'],
                dest: '<%= config.js.build %>/scripts.js',
            }
        },

        uglify: {
            build: {
                files: {
                    '<%= config.js.build %>/scripts.min.js' : 
                    ['<%= config.js.build %>/scripts.js']
                }
            }
        },

        'merge-json': {
            build: {
                src: '<%= config.data.src %>/*',
                dest: '<%= config.data.build %>/team-colors.json'
            }
        },

        'compile-handlebars': {
            build: {
                template: '<%= config.hbs %>/index.hbs',
                templateData: '<%= config.data.build %>/team-colors-colorfied.json',
                output: '*.html',
                helpers: '<%= config.hbs %>/helpers/*.js',
                partials: '<%= config.hbs %>/partials/*.hbs'
            }
        },

        jshint: {
            build: [
                '<%= config.js.src %>/js.js', 
                '<%= config.data.src %>/*'
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
                        cwd: '<%= config.img.src %>/',
                        src: ['**/*.svg'],
                        dest: '<%= config.img.build %>/',
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
            jshint: {
                files: [
                    '<%= config.js.src %>/js.js',
                    '<%= config.data.src %>/*'
                ],
                tasks: ['jshint', 'merge-json', 'colorify']
            },
            scripts: {
                files: ['<%= config.js.src %>/*'],
                tasks: ['clean:js', 'jshint', 'concat', 'uglify']
            },
            colorify: {
                files: ['src/grunt-tasks/colorify/**/*'],
                tasks: ['colorify']
            },
            handlebars: {
                files: [
                    '<%= config.hbs %>/**/*', 
                    '<%= config.data.build %>/team-colors-colorfied.json'
                ],
                tasks: ['compile-handlebars']
            },
            compass: {
                files: ['<%= config.css.src %>/*'],
                tasks: ['clean:css', 'compass']
            },
            svgmin: {
                files: ['<%= config.img.src %>/**/*'],
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
        'clean',
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