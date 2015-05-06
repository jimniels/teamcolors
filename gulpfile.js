var gulp = require('gulp'),
    compass = require('gulp-compass');
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify');

gulp.task('compass', function() {
    return gulp.src('assets/css/src/styles.scss')
        .pipe(compass({
            css: 'assets/css/build',
            sass: 'assets/css/src',
            image: 'assets/img/build'
            //style: 'compressed'
        }))
        .pipe(gulp.dest('assets/css/build'));
});

gulp.task('scripts', function() {
    return gulp.src('assets/js/src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('js.js'))
        .pipe(gulp.dest('assets/js/build/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/build/'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('default', function() {
    gulp.start('compass', 'scripts')
});

gulp.task('watch', function() {
 
  // Watch styles
  gulp.watch('assets/css/src/*.scss', ['compass']);
 
});