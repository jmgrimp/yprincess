
module.exports = {
	src: {
		root: 'src',
		mainSass: 'src/styles/main.styles.scss',
		sass: 'src/components/**/styles/**/*.scss',
		js: 'src/components/**/*.js',
		jsx: 'src/components/**/*.jsx',
		libs: 'src/libs',
		assets: 'src/assets/**/*.*',
		indexfile: 'src/index.html',
		entry: 'src/app.js'
	},
	dev: {
		root: 'dev',
		css: 'dev/css',
		js: 'dev/js',
		libs: 'dev/js/libs',
		assets: 'dev/assets',
		buildfile: 'build.js',
	},
	build: {
		root: 'admin',
		css: 'admin/css',
		js: 'admin/js',
		assets: 'admin/assets',
		buildfile: 'build.min.js',
	},
	bower: 'bower_components'
};