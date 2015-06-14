/* browserify needs in gulp require
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    sourcemaps = require('gulp-sourcemaps'), */
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