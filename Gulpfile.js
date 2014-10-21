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

var NG_PORT = 4000;
var FAMOUS_PORT = 4001;

var NG_DIR = 'famous-angular/';
var FAMOUS_DIR = 'famous/';
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
    gulp.watch(NG_DIR + 'styles/**/*.less', ['compile:styles']);
});
/*--------------------------------------------------------------*/
//[END] WATCHERS


// COMPILERS
/*--------------------------------------------------------------*/
gulp.task('compile', ['compile:styles']);

gulp.task('compile:styles', ['clean:styles'], function () {
    gulp.src(NG_DIR + 'styles/less/app.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(NG_DIR + '/styles/'));
});
/*--------------------------------------------------------------*/
//[END] COMPILERS


// CLEANERS
/*--------------------------------------------------------------*/
gulp.task('clean', ['clean:styles']);

//NOT WORKING
gulp.task('clean:styles', function() {
    return gulp.src(NG_DIR + 'styles/app.min.css', { read: false })
        .pipe(rimraf());
});
/*--------------------------------------------------------------*/
//[END] CLEANERS


//  SERVER CONFIGS
/*--------------------------------------------------------------*/
gulp.task('serve:ngfamous', function() {
    var express = require('express'),
        app = express();

    app.use(require('connect-livereload')());
    app.use(express.static(NG_DIR));

    app.get('*', function(req, res) {
        res.sendFile(__dirname + '/' + NG_DIR + 'index.html');
    });

    app.listen(NG_PORT);

    require('opn')('http://localhost:' + NG_PORT);

    gutil.log('Server running at ', gutil.colors.cyan('http://localhost:'+ NG_PORT +'/'));
});

gulp.task('serve:famous', function() {
    var express = require('express'),
        app = express();

    app.use(require('connect-livereload')());
    app.use(express.static(FAMOUS_DIR));

    app.get('*', function(req, res) {
        res.sendFile(__dirname + '/' + FAMOUS_DIR + 'index.html');
    });

    app.listen(FAMOUS_PORT);

    require('opn')('http://localhost:' + FAMOUS_PORT);

    gutil.log('Server running at ', gutil.colors.cyan('http://localhost:'+ FAMOUS_PORT +'/'));
});
/*--------------------------------------------------------------*/
//[END] SERVER CONFIGS


gulp.task('linker', function() {
    gulp.src(NG_DIR + 'index.html')
        // Link the JavaScript
        .pipe(linker({
            scripts: [NG_DIR + 'scripts/**/*.js' ],
            startTag: '<!--SCRIPTS-->',
            endTag: '<!--SCRIPTS END-->',
            fileTmpl: '<script type="text/javascript" src="%s"></script>',
            appRoot: NG_DIR
        }))
        .pipe(gulp.dest(NG_DIR));
});


//
/*--------------------------------------------------------------*/
gulp.task('dev', ['lint', 'compile'], function() {
    function reloadPage(file) {
        server.changed(file.path);
    }

    gulp.watch([NG_DIR + 'styles/**/*.less'], [])
        .on('change', reloadPage);

    gulp.watch([NG_DIR + 'scripts/**/*', NG_DIR + 'scripts/*.js'], ['linker'])
        .on('change', reloadPage);

    gulp.watch([NG_DIR + 'views/**/*'])
        .on('change', reloadPage);

    gulp.watch([NG_DIR + 'index.html'])
        .on('change', reloadPage);

    gulp.start('serve:ngfamous');
});

gulp.task('default', ['dev'], function() {});
