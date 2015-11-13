'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
// var babel = require('gulp-babel');
var shell = require('gulp-shell');

var paths = {
  scripts: ['client/app/**/*.js'],
  es6scripts: [''],
  html: ['client/index.html'],
  // styles: ['client/styles/style.css'],
  test: ['client/test/**/*.js']
};

gulp.task('build', function() {
  return gulp.src(paths.scripts)
    .pipe(concat('all.js'))
    .pipe(jshint())
    .pipe(uglify())
    .pipe(gulp.dest('client/dist/'));
});

// gulp.task('babel', function() {
// 	return gulp.src(paths.es6scripts)
// 	.pipe(babel({
//       presets: ['es2015']
//   }))
//   .pipe(gulp.dest('client/app/'));
// });

gulp.task('docker-deploy', shell.task([
  'echo hello',
  'echo world'
]))

gulp.task('default', ['build']);

gulp.task('deploy', ['build','docker-deploy']);