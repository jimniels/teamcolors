/*
    Dependencies
*/
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    del = require('del'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    sourcemaps = require('gulp-sourcemaps'),
    
    compass = require('gulp-compass'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),

    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    
    handlebars = require('gulp-compile-handlebars'),
    path = require("path"),
    svgmin = require('gulp-svgmin')

    normalizeJSON = require('./utils/normalizeJSON');



/*
    Clean
    scripts, styles, and templates (i.e. data)
*/
gulp.task('clean:scripts', function (cb) {
    del('assets/scripts/**/*', cb);
});
gulp.task('clean:styles', function (cb) {
    del('assets/styles/**/*', cb);
});
gulp.task('clean:templates', function (cb) {
    del(['assets/data/**/*', 'index.html'], cb);
});

/*
    Styles
    Convert our Sass to CSS using compass
*/
gulp.task('styles', ['clean:styles'], function() {
    return gulp.src('src/styles/styles.scss')
        .pipe(compass({
            css: 'assets/styles',
            sass: 'src/styles',
            image: 'assets/img',
            style: 'compressed'
        }))
        .pipe(gulp.dest('assets/styles/'));
});

/*
    Lint
    Lint our JS using JShint
*/
gulp.task('lint:scripts', function(){
    return gulp
        .src('src/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
});
gulp.task('lint:data', function(){
    return gulp
        .src('src/data/*.json')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
});

/*
    Scripts
    User browserify to build js files
*/
/*
var b = browserify({
    entries: './src/scripts/scripts.js',
    debug: true
});
gulp.task('scriptz', ['clean:scripts', 'lint:scripts'], function () {
  return b.bundle()
    .pipe(source('scripts.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
      .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./assets/scripts/'));
});

gulp.task('scriptz:prod', ['clean:scripts', 'lint:scripts'], function () {
  return b.bundle()
    .pipe(source('scripts.min.js'))
    .pipe(gulp.dest('./assets/scripts/'));
});
*/

gulp.task('scripts', ['clean:scripts', 'lint:scripts'], function() {
    return gulp.src('src/scripts/**/*')
        //.pipe(concat('scripts.js'))
        //.pipe(uglify())
        //.pipe(rename('scripts.min.js'))
        .pipe(gulp.dest('assets/scripts/'));
});
gulp.task('scripts:prod', ['clean:scripts', 'lint:scripts'], function() {
    return gulp.src('src/scripts/**/*')
        .pipe(uglify())
        .pipe(gulp.dest('assets/scripts/'));
});

/*
    SVGs
    Minify any .svg files in `assets/`
*/
gulp.task('svgs', function() {
    return gulp.src('assets/img/**/*.svg')
        .pipe(svgmin({
            plugins: [{mergePaths: false}]
        }))
        .pipe(gulp.dest('assets/img'));
});

/*
    Templates
    Dependant on 'colorify' which creates the data
    we use for the handelbars template
*/
gulp.task('templates', ['clean:templates', 'data'], function () {
    // gotta do this so the file isn't cached on require
    // http://stackoverflow.com/questions/13108936/nodejs-require-returns-same-old-file-when-requiring-a-second-time-after-the-file
    var filename = path.resolve('./assets/data/team-colors.json');
    delete require.cache[filename];
    var templateData = require('./assets/data/team-colors.json'),
        options = {
            ignorePartials: true,
            batch : ['src/handlebars/partials'],
            helpers : {
                toUpperCase: require('./src/handlebars/helpers/toUpperCase.js'),
                getBgColor: require('./src/handlebars/helpers/getBgColor.js'),
                convertToId: require('./src/handlebars/helpers/convertToId.js'),
                debug: require('./src/handlebars/helpers/debug.js')
            }
        }
    return gulp
        .src('src/handlebars/index.hbs')
        .pipe(handlebars(templateData, options))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./'));
});

/*
    Data
    Dependant on 'lint:data' which makes sure our json is corrent
    All teams should have AT LEAST an RGB or HEX value
    For teams that don't have both, we convert them
*/
gulp.task('data', ['lint:data'], function(){
    return gulp.src("src/data/*.json")
        .pipe( normalizeJSON() )
        .pipe(gulp.dest("assets/data"));
});


/*
    Watch Tasks
*/
gulp.task('watch', function() {
 
    // Styles
    gulp.watch('src/styles/*.scss', ['styles']);
 
    // Scripts
    gulp.watch('src/scripts/**/*', ['scripts']);

    // Templates/Data
    gulp.watch(['src/data/*.json', 'src/handlebars/**/*'], ['templates']);
});

/*
    Default Tasks
*/
var sharedTasks = [
    'styles',
    'templates'
];

gulp.task('default', sharedTasks.concat([
    'scripts',
    'watch'
]));

gulp.task('prod', sharedTasks.concat([
    'svgs',
    'scripts:prod'
]));