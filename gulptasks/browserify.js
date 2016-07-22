var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var browserify = require('browserify');
var reactify = require('reactify');
var babelify = require('babelify');
var streamify = require('gulp-streamify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');

var path = require('../gulp-paths');


module.exports = function() {
	gutil.log('-------- Running Browserify --------');

	browserify({
		entries: [path.src.entry],
		transform: [babelify, reactify],
		})
		.bundle()
		.pipe(source(path.dev.buildfile))
		.pipe(rename(
			{
	            prefix: 'bundled.',
	            extname: '.js'
        	}
        ))
		.pipe(gulp.dest(path.dev.js))
			.on('end', function(){
				gutil.log('-------- Browserify Complete --------');
		});

};