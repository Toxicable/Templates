var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var env = 'dev'

// process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src('./app/**/*js')
        //.pipe(browserify())
        //.pipe(uglify())
        .pipe(gulp.dest('./wwwroot/'));
});
// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});



// process HTML files and return the stream.
gulp.task('html', function () {
    return gulp.src('./app/**/*.html')
        .pipe(gulp.dest('./wwwroot/'));
});

gulp.task('html-watch', ['html'], function (done) {
    browserSync.reload();
    done();
});


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src("./app/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./wwwroot/"))
        .pipe(browserSync.stream());
});


// use default task to launch Browsersync and watch JS files
gulp.task('serve', ['js', 'html', 'sass'], function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./wwwroot"
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch("./app/**/*.js", ['js-watch']);
    gulp.watch("./app/**/*.html", ['html-watch']);
    gulp.watch("./app/**/*.scss", [ 'sass']);
});

gulp.task('serve-prod', ['serve'], function () {
    env = 'prod'
});

gulp.task('manualRefreash', ['js', 'html', 'sass'], function () {
    browserSync.reload();
});