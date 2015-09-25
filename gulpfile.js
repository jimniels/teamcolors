/*
  Dependencies
*/
var gulp            = require('gulp');
var del             = require('del');
var sass            = require('gulp-sass');
var rename          = require('gulp-rename');
var uglify          = require('gulp-uglify');
var svgmin          = require('gulp-svgmin');
var reactRender     = require('gulp-render-react');
var source          = require('vinyl-source-stream');
var buffer          = require('vinyl-buffer');
var gutil           = require('gulp-util');
var babelify        = require('babelify');
var browserify      = require('browserify');
var eslint          = require('gulp-eslint');
var normalizeJSON   = require('./src/scripts/utils/normalizeJSON');
var argv            = require('yargs').argv;

/*
  Clean
  Clean the output of our scripts, styles, and templates/data
*/
gulp.task('clean:scripts', function (cb) {
  del('assets/scripts/**/*', cb);
});
gulp.task('clean:styles', function (cb) {
  del('assets/styles/**/*', cb);
});
gulp.task('clean:data', function (cb) {
  del(['assets/data/**/*'], cb);
});

/*
  Styles
  Convert using sass
*/
gulp.task('styles', ['clean:styles'], function() {
  return gulp.src('src/styles/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('assets/styles'));
});

/*
  Lint
  Lint our javascript and data
*/
gulp.task('lint:scripts', function(){
  return gulp.src('src/scripts/**/*')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
gulp.task('lint:data', function(){
  return gulp.src('src/data/*.json')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

/*
  Scripts
  Concat and uglify scripts
  Dependant on data being prepped first
*/
gulp.task('scripts', ['clean:scripts', 'lint:scripts', 'data'], function () {

  var b = browserify({
    entries: 'src/scripts/entry.jsx',
    debug: true,
    extensions: ['.jsx'],
    // defining transforms here will avoid crashing your stream
    transform: ['babelify']
  });

  if(argv.prod){
    return b.bundle()
      .pipe(source('entry.js'))
      .on('error', gutil.log)
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest('assets/scripts'));
  } else {
    return b.bundle()
      .pipe(source('entry.js'))
      .on('error', gutil.log)
      .pipe(gulp.dest('assets/scripts'));
  }
});


/*
  Data
  Dependant on 'lint:data' which makes sure our json is corrent
  All teams should have AT LEAST an RGB or HEX value
  For teams that don't have both, we convert them in normalizeJSON
*/
gulp.task('data', ['lint:data', 'clean:data'], function(){
  return gulp.src('src/data/*.json')
    .pipe( normalizeJSON() )
    .pipe(gulp.dest('assets/data'));
});

/*
  SVGs
  Minify any .svg files in `assets/`
  Usually this rarely needs to be run,
  as it will replace all SVGs under version control
*/
gulp.task('svgs', function() {
  return gulp.src('assets/img/**/*.svg')
    .pipe(svgmin({
      plugins: [{mergePaths: false}]
    }))
    .pipe(gulp.dest('assets/img'));
});

/*
Watch Tasks
*/
gulp.task('watch', function() {

  // Styles
  gulp.watch('src/styles/*.scss', ['styles']);

  // Scripts
  gulp.watch('src/scripts/**/*', ['scripts']);

  // Data
  gulp.watch('src/data/*', ['data']);
});

/*
  Render Static HTML
  Renders a plain HTML version of the page for non-JS users
*/
gulp.task('render-static-html', ['data'], function(){
  var teamColors = require('./assets/data/team-colors.json');
  return gulp.src('src/scripts/components/StaticHTML.jsx', { read: false })
  .pipe(reactRender({
    type: 'markup',
    props: {
      teams: teamColors.teams
    }
  }))
  .pipe(rename('static.html'))
  .pipe(gulp.dest('./'));
});

/*
Default Task
*/
console.log(argv.prod);
if(argv.prod) {
  gulp.task('default', [
    'styles',
    'scripts',
    'render-static-html'
  ]);
}
else {
  gulp.task('default', [
    'styles',
    'scripts',
    'render-static-html',
    'watch'
  ]);
}
