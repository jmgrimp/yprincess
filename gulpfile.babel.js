var gulp = require('gulp');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var streamify = require('gulp-streamify');
var gulpwatch = require('gulp-watch');



var notify = require("gulp-notify") ;
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var path = require('./gulp-paths');


var bower = require('./gulptasks/bower');
var browserify = require('./gulptasks/browserify');
var eslint = require('./gulptasks/eslint');
var webServer = require('./gulptasks/webserver');
var processSass = require('./gulptasks/sass');
var compileSass = require('./gulptasks/compileSass');
var create = require('./gulptasks/create');
var initSite = require('./gulptasks/initialize');


gulp.task('bower', bower);
gulp.task('webserver', webServer);
gulp.task('browserify', ['eslint'], browserify);
gulp.task('eslint', eslint);
gulp.task('sass', processSass);
gulp.task('generateSass', compileSass);
gulp.task( 'create', create );
gulp.task( 'initSite', initSite );


gulp.task('moveassets', function() {
	gulp.src(path.src.indexfile)
		.pipe(gulp.dest(path.dev.root));
	gulp.src(path.src.assets)
		.pipe(gulp.dest(path.dev.assets));
});

// Initialize the app into DEV directory....

gulp.task('initialize', [
	'moveassets',
	'bower',
	'buildsass',
	'browserify'
]);

gulp.task('buildsass', [
	'generateSass',
	'sass'
]);

gulp.task('watch', function(){
	gulpwatch(path.src.sass, function() {
		gulp.start('buildsass');
	});
	gulpwatch([path.src.assets, path.src.indexfile], function() {
		gulp.start('moveassets');
	});
	gulpwatch([path.src.entry,path.src.js,path.src.jsx], function() {
		gulp.start('browserify');
	});
});


