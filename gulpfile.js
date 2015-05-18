var gulp = require('gulp'),
    gutil = require('gulp-util'),
    compass = require('gulp-compass'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    del = require('del'),
    jsoncombine = require("gulp-jsoncombine"),
    handlebars = require('gulp-compile-handlebars'),
    requireDir = require('require-dir'),
    path = require("path"),
    svgmin = require('gulp-svgmin');

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
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest('assets/styles/'));
});

/*
    Lint
    Lint our JS using JShint
    Use notify as reporter - https://github.com/mikaelbr/gulp-notify#as-jshint-reporter
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
    Concat and minify scripts
*/
gulp.task('scripts', ['clean:scripts', 'lint:scripts'], function() {
    return gulp.src('src/scripts/**/*')
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(rename('scripts.min.js'))
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
        .pipe(jsoncombine("team-colors.json",function(data){
            for (var league in data) {
                var i = 0,
                    missing = [],
                    mode = '';
                if (data.hasOwnProperty(league)) {
                    data[league].forEach(function(team){
                        // No HEX but RBG
                        if(!team.colors.hex && team.colors.rgb) {
                            team.colors.hex = [];
                            team.colors.rgb.forEach(function(color){
                                team.colors.hex.push( rgbTohex(color) );
                            });
                            missing.push( team.team + ' ' + team.colors.hex );
                            i++;
                            mode = 'HEX';
                        }
                        // No RGB but HEX 
                        else if(!team.colors.rgb && team.colors.hex) {
                            team.colors.rgb = [];
                            team.colors.hex.forEach(function(color){
                                team.colors.rgb.push( hexToRgb(color) );
                            });
                            missing.push( team.team + ' ' + team.colors.rgb );
                            i++;
                            mode = 'RGB';
                        }
                    });
                }
                // Log it
                if(i > 0){
                    // Log league
                    gutil.log('  ' + league.toUpperCase() + ' added ' + i + ' ' + mode + ' colors');
                    // Log individual teams & added colors
                    // for (var i = 0; i < missing.length; i++) {
                    //     console.log('      '+missing[i]);
                    // };
                }
            }
            return new Buffer(JSON.stringify(data));
        }))
        .pipe(gulp.dest("assets/data"));
});

/*
    Default Tasks
*/
gulp.task('default', function() {
    gulp.start( 
        'scripts',
        'styles',
        'templates',
        'svgs'
    )
});

/*
    Watch Tasks
*/
gulp.task('watch', function() {
 
    // Styles
    gulp.watch('src/styles/*.scss', ['styles']);
 
    // Scripts
    gulp.watch('src/scripts/*.js', ['scripts']);

    // Templates/Data
    gulp.watch(['src/data/*.json', 'src/handlebars/**/*'], ['templates']);

    // SVGs
    gulp.watch('assets/img/**/*.svg', ['svgs']);
});



/*
    Helper Functions
*/
function rgbTohex(rgb){    
    // Split RGB str into individual pieces and convert to int
    var rgb = rgb.split(' '),
        r = parseInt(rgb[0]),
        g = parseInt(rgb[1]),
        b = parseInt(rgb[2]);
    // Convert RGB to HEX
    // http://stackoverflow.com/questions/1133770/how-do-i-convert-a-string-into-an-integer-in-javascript
    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    // Returns '34ef25'
    return componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
        parseInt(result[1], 16) + ' ' + 
        parseInt(result[2], 16) + ' ' +
        parseInt(result[3], 16)
    : null;
}