// gulp
var gulp = require('gulp');

// plugins
var react = require('gulp-react');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// tasks

// react
gulp.task('react', function() {
   return gulp.src('./assets/js/template.jsx')
    .pipe(react())
    .pipe(gulp.dest('./assets/js/dist'))
    .pipe(reload({stream: true}));
});

// sass
gulp.task('sass', function() {
    return gulp.src('./assets/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./assets/css'))
        .pipe(reload({stream: true}));
});

// watchers
gulp.task('watch', function() {
    gulp.watch(['./assets/js/template.jsx'], ['react']);
    gulp.watch(['./assets/scss/*', './assets/scss/modules/*/*'], ['sass']);
    gulp.watch('*.html').on('change', reload);
});

// browser sync
gulp.task('serve', function() {
    browserSync({
        server: "./"
    });
});


gulp.task('default', ['react', 'sass', 'watch', 'serve']);