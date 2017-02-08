'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');

var paths = {
  sass: ['./public/stylesheets/*.scss']
};

gulp.task('sass', function() {
  gulp
    .src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/stylesheets'))
});

gulp.task('watch', function() {
  var done = function(evt) {
    console.log('File ' + evt.path + ' was ' + evt.type + ', running tasks...');
  };
  gulp.watch(paths.sass, ['sass'])
});

gulp.task('default', ['sass', 'watch']);
