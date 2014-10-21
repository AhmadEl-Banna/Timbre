'use strict';

var cssmin = require('gulp-cssmin'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    linker = require('gulp-linker'),
    livereload = require('gulp-livereload'),
    path = require('path'),
    rename = require('gulp-rename'),
    rimraf = require('gulp-rimraf'),
    watch = require('gulp-watch');

var EXPRESS_PORT = 4000;
var APP_DIR = 'famous-angular/';
var server = livereload();


// LINTERS
/*--------------------------------------------------------------*/
gulp.task('lint', ['lint:js']);

gulp.task('lint:js', function() {
    return gulp.src(['Gulpfile.js', 'famous-angular/app.js', 'famous-angular/scripts/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});
/*--------------------------------------------------------------*/
// [END] LINTERS


// WATCHERS
/*--------------------------------------------------------------*/
gulp.task('watch', ['watch:js', 'watch:style']);

gulp.task('watch:js', function() {
    gulp.watch(['Gulpfile.js'], ['lint:js']);
});

gulp.task('watch:style', function() {
    gulp.watch(APP_DIR + 'styles/**/*.less', ['compile:styles']);
});
/*--------------------------------------------------------------*/
//[END] WATCHERS


// COMPILERS
/*--------------------------------------------------------------*/
gulp.task('compile', ['compile:styles']);

gulp.task('compile:styles', ['clean:styles'], function () {
    gulp.src(APP_DIR + 'styles/less/app.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(APP_DIR + '/styles/'));
});
/*--------------------------------------------------------------*/
//[END] COMPILERS


// CLEANERS
/*--------------------------------------------------------------*/
gulp.task('clean', ['clean:styles']);

//NOT WORKING
gulp.task('clean:styles', function() {
    return gulp.src(APP_DIR + 'styles/app.min.css', { read: false })
        .pipe(rimraf());
});
/*--------------------------------------------------------------*/
//[END] CLEANERS

gulp.task('linker', function() {
    gulp.src(APP_DIR + 'index.html')
        // Link the JavaScript
        .pipe(linker({
            scripts: [APP_DIR + 'scripts/**/*.js' ],
            startTag: '<!--SCRIPTS-->',
            endTag: '<!--SCRIPTS END-->',
            fileTmpl: '<script type="text/javascript" src="%s"></script>',
            appRoot: APP_DIR
        }))
        .pipe(gulp.dest(APP_DIR));
});

gulp.task('serve', function() {
    var express = require('express'),
        app = express();

    app.use(require('connect-livereload')());
    app.use(express.static(APP_DIR));

    app.get('*', function(req, res) {
        res.sendFile(__dirname + '/' + APP_DIR + 'index.html');
    });

    app.listen(EXPRESS_PORT);

    require('opn')('http://localhost:4000');

    gutil.log('Server running at ', gutil.colors.cyan('http://localhost:'+EXPRESS_PORT+'/'));
});

// Main watch task for development
gulp.task('dev', ['lint', 'compile'], function() {
    function reloadPage(file) {
        server.changed(file.path);
    }

    gulp.watch([APP_DIR + 'styles/**/*.less'], [])
        .on('change', reloadPage);

    gulp.watch([APP_DIR + 'scripts/**/*', APP_DIR + 'scripts/*.js'], ['linker'])
        .on('change', reloadPage);

    gulp.watch([APP_DIR + 'views/**/*'])
        .on('change', reloadPage);

    gulp.watch([APP_DIR + 'index.html'])
        .on('change', reloadPage);

    gulp.start('serve');
});

gulp.task('default', ['dev'], function() {});
