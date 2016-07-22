var gulp = require('gulp');
var bower = require('gulp-bower');
var bowerfiles = require('main-bower-files');
var gulpFilter = require('gulp-filter');

var path = require('../gulp-paths');


function runBower() {
	var filterJS = gulpFilter('**/*.js');
	return gulp.src(bowerfiles({
			overrides: {
				jquery: {
					main: ['./dist/jquery.min.js']
				}
		    }
		}))
		.pipe(filterJS)
		.pipe( gulp.dest(path.dev.libs) );
};


module.exports = runBower;