var gulp = require('gulp'),
    handlebars = require('gulp-compile-handlebars');

gulp.task('handlebars', function () {
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