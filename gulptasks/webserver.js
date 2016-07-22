var gulp = require('gulp');
var server = require('gulp-server-livereload');

var path = require('../gulp-paths');

function runServer () {
	return gulp.src(path.dev.root)
		.pipe(server({
			livereload: true,
			open: path.dev.root
		}));
};


module.exports = runServer;