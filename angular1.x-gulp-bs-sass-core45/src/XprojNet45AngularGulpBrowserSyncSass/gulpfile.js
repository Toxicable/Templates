var gulp        = require('gulp');
var sass        = require('gulp-sass');
var gulpif      = require('gulp-if');
var uglify      = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var modRewrite  = require('connect-modrewrite');

var isProd = false;
var input = './app/';
var output = './wwwroot/';

gulp.task('js', function () {
    return gulp.src(input + '**/*js')
        .pipe(gulpif(isProd, uglify()))
        .pipe(gulp.dest(output));

});
gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});


gulp.task('html', function () {
    return gulp.src(input + '**/*.html')
        .pipe(gulp.dest(output));
});
gulp.task('html-watch', ['html'], function (done) {
    browserSync.reload();
    done();
});


gulp.task('sass', function () {
    return gulp.src(input + '**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(output));
    //.pipe(browserSync.stream());
});
gulp.task('sass-watch', ['sass'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('serve', ['js', 'html', 'sass'], function () {

    browserSync.init({
        server: {
            baseDir: output
        },
        middleware: [
                modRewrite([
                    '!\\.\\w+$ /index.html [L]'
                ])
    ]
    });

    gulp.watch(input + "**/*.js", ['js-watch']);
    gulp.watch(input + "**/*.html", ['html-watch']);
    gulp.watch(input + "**/*.scss", ['sass-watch']);
});

gulp.task('serve-prod', function () {
    isProd = true;
    gulp.start('serve');
});

gulp.task('build', ['js', 'html', 'sass'], function () {
    browserSync.reload();
});
gulp.task('build-prod', function () {
    isProd = true;
    gulp.start('build');
});