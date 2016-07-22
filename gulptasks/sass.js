require('es6-promise').polyfill();

var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require("gulp-notify") ;
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

var path = require('../gulp-paths');


module.exports = function () {
	gulp.src(path.src.mainSass)
		.pipe(
			sass({
				includePaths:
					[
						path.bower+ '/bootstrap-sass/assets/stylesheets',
						path.bower + '/fontawesome/scss'
					]
			})

			.on('error', notify.onError(function (error) {
					return 'Error: ' + error.message;
				})))
		.pipe( postcss([ autoprefixer({ browsers: ['last 3 version'] }) ]) )
		.pipe(gulp.dest(path.dev.css))
			.on('end', function(){
					gutil.log('-------- SASS Step Complete --------');
			});	
};
