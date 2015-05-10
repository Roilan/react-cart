// gulp
var gulp = require('gulp');

// plugins
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var babelify = require('babelify');


var path = {
    ALL: ['./dist/src/js/*.js', './dist/src/scss/*.scss'],
    JS: ['./dist/src/js/*.js'],
    SASS: ['./dist/src/scss/*.scss'],

    MINIFIED_OUT: 'build.min.js',

    DEST_SRC: 'dist/',
    DEST_BUILD: 'dist/build',
    DEST: 'dist',

    JS_OUT: './dist/build/js',
    JS_FILE_OUT: 'build.js',

    SASS_OUT: './dist/build/css',

    ENTRY_POINT: './dist/src/js/App.js'
};

// sass
gulp.task('sass', function() {
    return gulp.src(path.SASS)
        .pipe(sass())
        .pipe(gulp.dest(path.SASS_OUT))
        .pipe(reload({stream: true}));
});

// watchers
gulp.task('watch', function() {
    gulp.watch([path.SASS], ['sass']);
    gulp.watch('*.html').on('change', reload);


    var watcher = watchify(browserify({
        entries: [path.ENTRY_POINT],
        transform: [reactify],
        debug: true,
        cache: {}, packageCache: {}, fullPaths: true
    }));

    return watcher.on('update', function() {
      watcher.bundle()
        .pipe(source(path.JS_FILE_OUT))
        .pipe(gulp.dest(path.JS_OUT))
        .pipe(reload({stream: true}))
        console.log('Updated');
    })
        .transform(babelify)
        .bundle()
        .pipe(source(path.JS_FILE_OUT))
        .pipe(gulp.dest(path.JS_OUT));
});

// browser sync
gulp.task('serve', function() {
    browserSync({
        server: "./"
    });
});

// 'transform'
gulp.task('default', ['sass', 'watch', 'serve']);